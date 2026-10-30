#!/usr/bin/env python3
"""Stage topic-specific licensed photos. Nothing is published or accepted automatically.

Usage: python3 scripts/stage-regional-guide-photos.py --plan path/to/plan.json
Each pool must define an explicit query, required text patterns and slot names.
"""
import argparse
import concurrent.futures
import hashlib
import io
import json
import math
import re
import time
import unicodedata
import urllib.parse
import urllib.request
from pathlib import Path
from PIL import Image, ImageDraw, ImageOps
from guide_photo_origins import origin_photo_id, live_origins

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--plan', required=True)
parser.add_argument('--batch', default='', help='Separate review bundle; preserves previous decisions and evidence')
args = parser.parse_args()
plan = json.loads(Path(args.plan).read_text())
city = plan['city']
OUT = ROOT/'docs/qualidade-imagens-2026-10-30'/('regional-'+city+('-'+args.batch if args.batch else ''))
OUT.mkdir(parents=True, exist_ok=True)
if (OUT/'applied.json').exists() and json.loads((OUT/'applied.json').read_text()).get('applied',0):
 raise SystemExit('This review bundle contains applied photos. Use a new --batch to preserve its evidence.')
STAGE = Path('/tmp/2go-regional-photo-review')/city
STAGE.mkdir(parents=True, exist_ok=True)
manifest = json.loads((ROOT/'docs/curadoria-2026-10-29/sources.json').read_text())
inventory = json.loads((ROOT/'docs/qualidade-imagens-2026-10-30/inventory.json').read_text())['slots']
slot_info = {r['slot']: r for r in inventory if r['city']==city}
UA='2GOTravelGuideBot/1.0 (https://github.com/ronilsonbatista/2go-travel-web-app; editorial curation)'

def norm(s):
 return ''.join(c for c in unicodedata.normalize('NFKD',s).lower() if not unicodedata.combining(c)).replace('_',' ')
def family(s):
 s=re.sub(r'\b(cropped|crop|zuschnitt|beschnitten|recadre|recadrage|recortada|recortado|recorte|aligned|edit\d*|copie\s*\d*[a-z]*|copy)\b','',norm(s))
 return ''.join(c for c in s if c.isalnum())
used_titles={norm(urllib.parse.unquote(v.get('title',''))) for v in manifest.values()}
used_families={family(urllib.parse.unquote(v.get('title',''))) for v in manifest.values()}
used_origins=set(live_origins(manifest).values())
used_hashes={r.get('sha256') for r in inventory}
used_hashes.update(v['assetSha256'] for v in manifest.values() if v.get('assetSha256'))
rejection_index = ROOT/'docs/qualidade-imagens-2026-10-30/regional-rejections.json'
rejected_titles = {norm(urllib.parse.unquote(row['title'])) for row in json.loads(rejection_index.read_text()) if row.get('title')} if rejection_index.exists() else set()
reservation_path = ROOT/'docs/qualidade-imagens-2026-10-30/candidate-reservations.json'
reservations = json.loads(reservation_path.read_text()) if reservation_path.exists() else {}
reserved_families = {family(value['title']):value['key'] for value in reservations.values()}
reserved_origins = {value['originPhotoId']:value['key'] for value in reservations.values() if value.get('originPhotoId')}
def get(url):
 for attempt in range(3):
  try:
   req=urllib.request.Request(url,headers={'User-Agent':UA})
   return urllib.request.urlopen(req,timeout=45).read()
  except Exception:
   if attempt==2:raise
   time.sleep(2*(attempt+1))
def search(item):
 name,pool=item
 cache=OUT/('pool-'+name+'.json')
 if cache.exists():return name,json.loads(cache.read_text())
 params={'action':'query','generator':'search','gsrsearch':pool['query']+' filetype:bitmap',
  'gsrnamespace':6,'gsrlimit':pool.get('limit',50),'prop':'imageinfo','iiprop':'url|size|mime|extmetadata','iiurlwidth':2400,'format':'json'}
 data=json.loads(get('https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode(params)))
 if data.get('error'):raise ValueError(data['error'])
 cache.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
 return name,data
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
 results=dict(pool.map(search,plan['pools'].items()))
queue=[]
for name,pool in plan['pools'].items():
 candidates=[]
 pages=results[name].get('query',{}).get('pages',{}).values()
 preferred=pool.get('preferredTitles',[])
 def rank(page):
  return (preferred.index(page['title']) if page['title'] in preferred else len(preferred), page.get('index',999))
 for p in sorted(pages,key=rank):
  info=p.get('imageinfo',[{}])[0];meta=info.get('extmetadata',{})
  text=norm(p['title']+' '+re.sub('<[^>]+>','',meta.get('ImageDescription',{}).get('value',''))+' '+meta.get('Categories',{}).get('value',''))
  creator=norm(re.sub('<[^>]+>','',meta.get('Artist',{}).get('value','')))
  if re.search(r'ai.generated|generative.ai|midjourney|dall.?e|stable.diffusion|adobe.firefly|computer.generated|3d.render|ai.upscal',text+' '+creator,re.I):continue
  if info.get('mime') not in ['image/jpeg','image/png']:continue
  minimum=pool.get('minimumLongEdge',1600)
  if minimum<1024:raise ValueError('Explicit image quality floor cannot be below 1024px')
  if max(info.get('width',0),info.get('height',0))<minimum:continue
  ratio=info.get('width',0)/max(info.get('height',1),1)
  if not pool.get('minRatio',0.65)<=ratio<=pool.get('maxRatio',3.6):continue
  if not all(re.search(pattern,text,re.I) for pattern in pool['required']):continue
  # Scanned postcards can have large dimensions and modern upload dates.
  # Inspect capture/publication metadata rather than treating pixel count as photographic quality.
  if not pool.get('allowHistoricalSource'):
   if re.search(r'\b(postcards?|stereographs?|stereoscopic|lithographs?|engravings?|cartes postales|ansichtskarten|photochrome prints)\b',text,re.I):continue
   capture=norm(re.sub('<[^>]+>','',meta.get('DateTimeOriginal',{}).get('value','')))
   if re.search(r'\b(?:1[0-8]\d{2}|19[0-8]\d)\b',capture):continue
  if pool.get('requiredTitle') and not re.search(pool['requiredTitle'],norm(p['title']),re.I):continue
  if norm(p['title']) in rejected_titles and p['title'] not in pool.get('reconsiderRejectedTitles',[]):continue
  if plan.get('center'):
   lat=meta.get('GPSLatitude',{}).get('value');lon=meta.get('GPSLongitude',{}).get('value')
   if lat is not None and lon is not None:
    try:
     a,b,radius=pool.get('center',plan['center']);c,d=float(lat),float(lon)
     hav=math.sin(math.radians(c-a)/2)**2+math.cos(math.radians(a))*math.cos(math.radians(c))*math.sin(math.radians(d-b)/2)**2
     km=6371*2*math.atan2(math.sqrt(hav),math.sqrt(max(0,1-hav)))
     if km>radius:continue
    except (ValueError,TypeError):continue
   else:
    if pool.get('locationPatterns') and not any(re.search(pattern,text,re.I) for pattern in pool['locationPatterns']):continue
    if pool.get('countryPattern') and not re.search(pool['countryPattern'],text,re.I):continue
  if re.search(r'\b(map|mapa|mapas|karte|karten|carte|cartes|planimetria|plan|drawing|illustration|painting|postcard|diagram|poster|engraving|logo|screenshot|montage|collage|strip.photo)\b|food.?bank|diner|apple.?watch|taj.?mahal',norm(p['title']),re.I):continue
  if pool.get('reject') and re.search(pool['reject'],text,re.I):continue
  if not meta.get('Artist',{}).get('value'):continue
  if not re.fullmatch(r'CC BY(?:-SA)? (?:1.0|2.0|2.5|3.0|4.0)|CC0|Public domain',meta.get('LicenseShortName',{}).get('value','').strip(),re.I):continue
  candidates.append((p,info))
 for slot in pool['slots']:
  row=slot_info[slot];current=manifest[row['key']]
  if 'placeholder' not in current.get('source',''):continue
  selected=None
  for p,info in candidates:
   if norm(p['title']) in used_titles or family(p['title']) in used_families:continue
   origin=origin_photo_id(info)
   if origin and (origin in used_origins or reserved_origins.get(origin,row['key'])!=row['key']):continue
   owner=reservations.get(norm(p['title']),{}).get('key')
   if owner and owner!=row['key']:continue
   family_owner=reserved_families.get(family(p['title']))
   if family_owner and family_owner!=row['key']:continue
   selected=(p,info);used_titles.add(norm(p['title']));used_families.add(family(p['title']));break
  if not selected:
   queue.append({'key':row['key'],'slot':slot,'topic':row['topic'],'status':'no-candidate','pool':name});continue
  p,info=selected
  reservations[norm(p['title'])]={'title':p['title'],'key':row['key'],'batch':args.batch or 'default'}
  origin=origin_photo_id(info)
  if origin:
   used_origins.add(origin);reserved_origins[origin]=row['key']
   reservations[norm(p['title'])]['originPhotoId']=origin
  reserved_families[family(p['title'])]=row['key']
  queue.append({'key':row['key'],'slot':slot,'topic':row['topic'],'path':row['src'],'pool':name,
    'status':'selected-unreviewed','title':p['title'],'imageinfo':info,'minimumLongEdge':pool.get('minimumLongEdge',1600)})
# Run staging processes sequentially. Reservations avoid cross-city collisions while
# candidates await review; the applier still validates the live manifest authoritatively.
reservation_path.write_text(json.dumps(reservations,ensure_ascii=False,indent=2)+'\n')
def download(row):
 if row['status']!='selected-unreviewed':return row
 try:
  info=row['imageinfo'];url=info.get('thumburl') or info['url']
  if info['width']<=2400:url=info['url']
  file=STAGE/(row['slot']+'.jpg')
  with Image.open(io.BytesIO(get(url))) as source:
   im=ImageOps.exif_transpose(source).convert('RGB');im.thumbnail((2400,2400),Image.Resampling.LANCZOS)
   if max(im.size)<row['minimumLongEdge']:raise ValueError('Downloaded asset below explicit quality floor')
   im.save(file,'JPEG',quality=85,optimize=True)
   row.update(file=str(file),dimensions=list(im.size),downloadUrl=url)
  row.update(status='pending-visual-review',sha256=hashlib.sha256(file.read_bytes()).hexdigest())
  if row['sha256'] in used_hashes:row['status']='duplicate-binary-rejected'
 except Exception as exc:row.update(status='download-error',error=str(exc))
 return row
review=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
 for row in pool.map(download,queue):
  review.append(row);print(row['key'],row['status'],flush=True)
  (OUT/'review.json').write_text(json.dumps(review,ensure_ascii=False,indent=2)+'\n')
selected=[r for r in review if r['status']=='pending-visual-review']
for start in range(0,len(selected),24):
 part=selected[start:start+24];sheet=Image.new('RGB',(1600,((len(part)+3)//4)*250),'white');draw=ImageDraw.Draw(sheet)
 for n,row in enumerate(part):
  x,y=n%4*400,n//4*250
  with Image.open(row['file']) as im:sheet.paste(ImageOps.contain(im,(394,210)),(x,y))
  draw.text((x+2,y+212),row['slot']+' | '+row['topic'][:40],fill='black')
  draw.text((x+2,y+228),row['title'][:60],fill='black')
 sheet.save(OUT/f'review-{start//24+1}.jpg',quality=90)
print('Staged:',len(selected),'of',len(queue),'; not applied; no visual acceptance inferred.')

#!/usr/bin/env python3
"""Stage Commons candidates for manual inspection; never changes live assets or acceptance."""
import concurrent.futures
import io
import json
import re
import urllib.parse
import urllib.request
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT/'docs/qualidade-imagens-2026-10-30'
STAGE = OUT/'candidates'
STAGE.mkdir(exist_ok=True)
sources = json.loads((ROOT/'docs/curadoria-2026-10-29/sources.json').read_text())
rows = json.loads((OUT/'inventory.json').read_text())['slots']
used = {s.get('title') for s in sources.values()}
queries = {
 'rio-de-janeiro': 'Rio de Janeiro skyline', 'buenos-aires': 'Buenos Aires skyline',
 'salvador': 'Salvador Bahia city panorama', 'amsterdam': 'Amsterdam canal panorama',
 'cancun': 'Cancun hotel zone panorama', 'miami': 'Miami skyline',
 'gramado': 'Gramado Brazil city', 'santiago': 'Santiago Chile skyline',
 'maceio': 'Maceio Ponta Verde beach', 'florianopolis': 'Florianopolis Hercilio Luz bridge',
 'bariloche': 'Bariloche Nahuel Huapi city', 'londres': 'London Thames skyline',
 'dubai': 'Dubai skyline',
}
UA = '2GOTravelGuideBot/1.0 (https://github.com/ronilsonbatista/2go-travel-web-app; editorial curation)'
def get(url):
 return urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent':UA}),timeout=45).read()
def search(city):
 p={'action':'query','generator':'search','gsrsearch':queries[city]+' filetype:bitmap','gsrnamespace':6,
    'gsrlimit':30,'prop':'imageinfo','iiprop':'url|size|extmetadata','iiurlwidth':2400,'format':'json'}
 return city,json.loads(get('https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode(p)))
targets=[r for r in rows if 'prominent-below-1600' in r['flags'] and 'placeholder' not in r['flags']]
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
 searches=dict(pool.map(search, sorted({r['city'] for r in targets})))
report=[]
for row in targets:
 candidates=[]
 for page in searches[row['city']].get('query',{}).get('pages',{}).values():
  info=page.get('imageinfo',[{}])[0];meta=info.get('extmetadata',{})
  description=re.sub('<[^>]+>','',meta.get('ImageDescription',{}).get('value',''))
  if page['title'] in used or max(info.get('width',0),info.get('height',0))<1600:continue
  if info.get('width',0)/max(info.get('height',1),1)<1.3:continue
  if not re.search(r'CC BY|CC0|Public domain',meta.get('LicenseShortName',{}).get('value',''),re.I):continue
  if re.search(r'map\b|plan\b|painting|postcard|drawing|montage|collage|coat of arms|flag\b|diner|food.?bank|panorama 360',page['title']+' '+description,re.I):continue
  if info.get('mime','image/jpeg') not in ['image/jpeg','image/png']:continue
  candidates.append((page,info))
 if not candidates:
  report.append({'key':row['key'],'status':'no-candidate'});continue
 page,info=candidates[0];used.add(page['title'])
 try:
  data=get(info.get('thumburl') or info['url'])
  file=STAGE/(row['key'].replace('/','--')+'.jpg')
  with Image.open(io.BytesIO(data)) as im:
   im=ImageOps.exif_transpose(im).convert('RGB');im.thumbnail((2400,2400),Image.Resampling.LANCZOS)
   if max(im.size)<1600:raise ValueError('download smaller than 1600')
   im.save(file,'JPEG',quality=85,optimize=True);dimensions=list(im.size)
  report.append({'key':row['key'],'path':row['src'],'topic':row['topic'],'status':'pending-visual-review',
    'file':str(file.relative_to(ROOT)),'title':page['title'],'imageinfo':info,'dimensions':dimensions})
 except Exception as exc:report.append({'key':row['key'],'status':'error','error':str(exc)})
 print(row['key'],report[-1]['status'],flush=True)
 (OUT/'prominent-candidates.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
selected=[r for r in report if r['status']=='pending-visual-review']
sheet=Image.new('RGB',(1500,((len(selected)+3)//4)*235),'white');d=ImageDraw.Draw(sheet)
for n,row in enumerate(selected):
 x,y=n%4*375,n//4*235
 with Image.open(ROOT/row['file']) as im:sheet.paste(ImageOps.contain(im,(369,205)),(x,y))
 d.text((x+2,y+207),row['key'],fill='black')
 d.text((x+2,y+221),row['title'][:55],fill='black')
sheet.save(OUT/'prominent-candidates-review.jpg',quality=90)

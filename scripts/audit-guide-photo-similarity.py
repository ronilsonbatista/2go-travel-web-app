#!/usr/bin/env python3
# Optional full photo comparison; requires Pillow. Run npm run audit:guide-images first.
from pathlib import Path
from PIL import Image
import urllib.request,json,hashlib,io,concurrent.futures
r=Path(__file__).resolve().parents[1];slots=json.load(open(r/'docs/curadoria-2026-10-29/slot-map.json'));tmp=Path('/tmp/2go-external-photos');tmp.mkdir(exist_ok=True)
def data(slot):
 src=slot['src'];key=slot['city']+'/'+slot['slot']
 if src.startswith('/'):
  file=r/'public'/src.lstrip('/');return key,file,hashlib.sha256(file.read_bytes()).hexdigest()
 req=urllib.request.Request(src,headers={'User-Agent':'2GOTravelEditorial/1.0'});raw=urllib.request.urlopen(req,timeout=30).read();file=tmp/(hashlib.sha256(src.encode()).hexdigest()+'.jpg');Image.open(io.BytesIO(raw)).convert('RGB').save(file,quality=95);return key,file,hashlib.sha256(raw).hexdigest()
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:files=list(pool.map(data,slots))
hashes=[];seen={};duplicates=[]
for key,file,sha in files:
 if sha in seen:duplicates.append([seen[sha],key])
 seen[sha]=key;im=Image.open(file);g=im.convert('L').resize((9,8));px=list(g.tobytes());h=0
 for y in range(8):
  for x in range(8):h=(h<<1)|(px[y*9+x]>px[y*9+x+1])
 hashes.append((key,h,im.width/im.height))
pairs=[]
for i,(a,ha,ra) in enumerate(hashes):
 for b,hb,rb in hashes[i+1:]:
  distance=(ha^hb).bit_count()
  if distance<=5 and abs(ra/rb-1)<.2:pairs.append({'a':a,'b':b,'distance':distance})
report={'photos':len(files),'distinctByteHashes':len(seen),'duplicateBytes':duplicates,'perceptualCandidatePairs':pairs,'method':'SHA-256 of local and fetched remote bytes; 64-bit dHash, threshold <=5, aspect-ratio difference <20%'}
(r/'docs/curadoria-2026-10-29/site-wide-photo-audit.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))

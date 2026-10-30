#!/usr/bin/env python3
"""Apply only explicit human/agent visual decisions, with source/hash safeguards."""
import argparse
import hashlib
import html
import json
import re
import shutil
import unicodedata
import urllib.parse
from pathlib import Path
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]
p=argparse.ArgumentParser()
p.add_argument('--review',required=True)
p.add_argument('--decisions',required=True)
args=p.parse_args()
review_path=Path(args.review)
rows=json.loads(review_path.read_text())
decisions=json.loads(Path(args.decisions).read_text())
mf=ROOT/'docs/curadoria-2026-10-29/sources.json'
manifest=json.loads(mf.read_text())
def norm(value):
 return ''.join(c for c in unicodedata.normalize('NFKD',value).lower() if not unicodedata.combining(c)).replace('_',' ')
def family(value):
 value=re.sub(r'\b(cropped|crop|aligned|edit\d*|copie\s*\d*[a-z]*|copy)\b','',norm(urllib.parse.unquote(value)))
 return ''.join(c for c in value if c.isalnum())
existing_titles={norm(urllib.parse.unquote(v.get('title',''))) for v in manifest.values() if 'placeholder' not in v.get('source','')}
existing_families={family(v.get('title','')) for v in manifest.values() if 'placeholder' not in v.get('source','')}
inventory=json.loads((ROOT/'docs/qualidade-imagens-2026-10-30/inventory.json').read_text())['slots']
existing_hashes={r.get('sha256') for r in inventory if 'placeholder' not in r.get('flags',[])}
existing_hashes.update(v['assetSha256'] for v in manifest.values() if v.get('assetSha256'))
prepared=[]
for row in rows:
 decision=decisions.get(row['key'],{})
 if decision.get('decision')!='accepted':continue
 if len(decision.get('notes',''))<30:raise ValueError('Missing actual visual review notes: '+row['key'])
 if row['status']!='pending-visual-review':raise ValueError('Candidate not available: '+row['key'])
 old=manifest[row['key']]
 if 'placeholder' not in old.get('source',''):
  if old.get('title')==row['title']:continue
  raise ValueError('Refusing to overwrite a non-placeholder: '+row['key'])
 if row['path']!=old['path']:raise ValueError('Explicit slot path changed')
 staged=Path(row['file']);digest=hashlib.sha256(staged.read_bytes()).hexdigest()
 if digest!=row['sha256']:raise ValueError('Photo changed since review: '+row['key'])
 if digest in existing_hashes:raise ValueError('Duplicate binary: '+row['key'])
 title=norm(row['title']);fam=family(row['title'])
 if title in existing_titles or fam in existing_families:raise ValueError('Repeated source/family: '+row['title'])
 meta=row['imageinfo']['extmetadata'];license=meta.get('LicenseShortName',{}).get('value','').strip()
 if not re.fullmatch(r'CC BY(?:-SA)? (?:1.0|2.0|2.5|3.0|4.0)|CC0|Public domain',license,re.I):raise ValueError('Unapproved license: '+license)
 author=html.unescape(re.sub('<[^>]+>','',meta.get('Artist',{}).get('value',''))).strip()
 if not author:raise ValueError('Missing author')
 with Image.open(staged) as im:
  im.verify()
 with Image.open(staged) as im:
  dimensions=list(im.size)
  if max(dimensions)<1600:raise ValueError('Image is not HQ')
 source='https://commons.wikimedia.org/wiki/'+urllib.parse.quote(row['title'].replace(' ','_'),safe=':')
 new={'city':old['city'],'slot':old['slot'],'path':old['path'],'topic':row['topic'],
  'source':source,'title':row['title'],'author':author,'license':license,
  'licenseUrl':meta.get('LicenseUrl',{}).get('value',''),
  'description':html.unescape(re.sub('<[^>]+>','',meta.get('ImageDescription',{}).get('value',''))),
  'categories':html.unescape(meta.get('Categories',{}).get('value','')),
  'date':html.unescape(re.sub('<[^>]+>','',meta.get('DateTimeOriginal',{}).get('value',''))),
  'downloadUrl':row['downloadUrl'],'originalUrl':row['imageinfo']['url'],
  'assetDimensions':dimensions,'originalDimensions':[row['imageinfo']['width'],row['imageinfo']['height']],
  'visualReview':'accepted','reviewedAt':'2026-10-30','reviewNotes':decision['notes'],'assetSha256':digest}
 for field,key in [('latitude','GPSLatitude'),('longitude','GPSLongitude')]:
  try:new[field]=float(meta[key]['value'])
  except (KeyError,ValueError,TypeError):pass
 prepared.append((row,staged,new))
 existing_hashes.add(digest);existing_titles.add(title);existing_families.add(fam)
# All checks precede the first write. Existing editorial strings are untouched.
for row,staged,new in prepared:
 target=ROOT/'public'/row['path'].lstrip('/')
 temp=target.with_suffix('.reviewed.tmp');shutil.copyfile(staged,temp);temp.replace(target)
 manifest[row['key']]=new
mf.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
remaining=sum('placeholder' in v.get('source','') for v in manifest.values())
log_path=review_path.parent/'applied.json'
previous=json.loads(log_path.read_text()) if log_path.exists() else {}
applied_keys=sorted(set(previous.get('keys',[])) | {row['key'] for row,_,_ in prepared})
log={'applied':len(applied_keys),'appliedThisRun':len(prepared),'placeholdersRemaining':remaining,'keys':applied_keys}
log_path.write_text(json.dumps(log,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(log,ensure_ascii=False,indent=2))

#!/usr/bin/env python3
"""Restore higher resolution of the SAME Commons photo; never choose a fuzzy replacement.
Requires inventory-guide-image-quality.py. Does not certify visual acceptance.
"""
import concurrent.futures
import io
import json
import time
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT/'docs/qualidade-imagens-2026-10-30'
MANIFEST = ROOT/'docs/curadoria-2026-10-29/sources.json'
sources = json.loads(MANIFEST.read_text())
inventory = json.loads((OUT/'inventory.json').read_text())['slots']
UA = '2GOTravelGuideBot/1.0 (https://github.com/ronilsonbatista/2go-travel-web-app; editorial curation)'

def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    return urllib.request.urlopen(req, timeout=45).read()

def upgrade(row):
    record = {'key': row['key'], 'before': [row['width'], row['height']], 'source': row['source']}
    try:
        params = {'action': 'query', 'titles': row['title'], 'prop': 'imageinfo',
                  'iiprop': 'url|size', 'iiurlwidth': 2400, 'format': 'json'}
        data = json.loads(get('https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode(params)))
        pages = list(data.get('query', {}).get('pages', {}).values())
        if not pages or not pages[0].get('imageinfo'):
            return dict(record, status='source-not-found')
        info = pages[0].get('imageinfo', [{}])[0]
        if max(info.get('width', 0), info.get('height', 0)) < 1600:
            return dict(record, status='original-too-small')
        url = info.get('thumburl') or info['url']
        # Avoid enlarging an original smaller than the requested thumbnail.
        if info.get('width', 0) <= 2400:
            url = info['url']
        raw = get(url)
        with Image.open(io.BytesIO(raw)) as source:
            im = ImageOps.exif_transpose(source).convert('RGB')
            im.thumbnail((2400, 2400), Image.Resampling.LANCZOS)
            if max(im.size) < 1600:
                return dict(record, status='download-too-small', actual=list(im.size))
            file = ROOT/'public'/row['src'].lstrip('/')
            temp = file.with_suffix('.quality.tmp')
            im.save(temp, 'JPEG', quality=85, optimize=True)
            temp.replace(file)
            return dict(record, status='upgraded', after=list(im.size), downloadUrl=url,
                        originalDimensions=[info['width'], info['height']])
    except Exception as exc:
        return dict(record, status='error', error=str(exc))

targets = [r for r in inventory if 'prominent-below-1600' in r['flags']
           and 'placeholder' not in r['flags'] and r.get('source', '').startswith('https://commons.wikimedia.org/wiki/File:')]
results = []
with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
    for result in pool.map(upgrade, targets):
        results.append(result)
        print(result['key'], result['status'], flush=True)
        (OUT/'resolution-upgrades.json').write_text(json.dumps(results, ensure_ascii=False, indent=2)+'\n')
for result in results:
    if result['status'] == 'upgraded':
        sources[result['key']]['downloadUrl'] = result['downloadUrl']
        sources[result['key']]['assetDimensions'] = result['after']
        sources[result['key']]['resolutionUpdatedAt'] = '2026-10-30'
MANIFEST.write_text(json.dumps(sources, ensure_ascii=False, indent=2)+'\n')

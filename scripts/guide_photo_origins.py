#!/usr/bin/env python3
"""Resolve proven external photo IDs without treating filenames as evidence.

An external ID is an additional duplicate check, never a substitute for source,
filename family or binary checks. Preserved source records remain untouched.
"""
import argparse
import html
import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DIRECTORY = ROOT / 'docs/qualidade-imagens-2026-10-30'
INDEX = DIRECTORY / 'source-origins.json'

def origin_photo_id(info):
    metadata = info.get('extmetadata', {})
    credit = html.unescape(metadata.get('Credit', {}).get('value', ''))
    ids = set(re.findall(r'(?:https?:)?//(?:www\.)?flickr\.com/photos/[^/\s"<>]+/(\d+)', credit, re.I))
    ids.update(re.findall(r'(?:https?:)?//(?:www\.)?flickr\.com/photo\.gne\?[^"<>\s]*\bid=(\d+)', credit, re.I))
    return 'flickr:' + next(iter(ids)) if len(ids) == 1 else None

def live_origins(manifest):
    index = json.loads(INDEX.read_text()) if INDEX.exists() else {}
    return {key: row['originPhotoId'] for key, row in index.items()
            if key in manifest and row.get('source') == manifest[key].get('source') and row.get('originPhotoId')}

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--fetch-missing', action='store_true')
    args = parser.parse_args()
    manifest = json.loads((ROOT / 'docs/curadoria-2026-10-29/sources.json').read_text())
    infos = {}
    # Local review bundles preserve the actual Commons response for applied photos.
    for review in sorted(DIRECTORY.glob('regional-*/review.json')):
        for row in json.loads(review.read_text()):
            if row.get('imageinfo'):
                infos[row['title'].replace('_', ' ')] = row['imageinfo']
    cache = DIRECTORY / 'origin-metadata-cache.json'
    if cache.exists():
        infos.update(json.loads(cache.read_text()))
    titles = {urllib.parse.unquote(v.get('title', '')).replace('_', ' ')
              for v in manifest.values() if 'placeholder' not in v.get('source', '') and 'commons.wikimedia.org/wiki/File:' in v.get('source', '')}
    missing = sorted(t for t in titles if t and t not in infos)
    if args.fetch_missing:
        for offset in range(0, len(missing), 40):
            params = {'action':'query', 'titles':'|'.join(missing[offset:offset+40]),
                      'prop':'imageinfo', 'iiprop':'url|extmetadata', 'redirects':1, 'format':'json'}
            request = urllib.request.Request('https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(params),
                headers={'User-Agent':'2GOTravelGuideBot/1.0 (https://github.com/ronilsonbatista/2go-travel-web-app; editorial curation)'})
            for attempt in range(3):
                try:
                    data = json.loads(urllib.request.urlopen(request, timeout=45).read())
                    if data.get('error'): raise ValueError(data['error'])
                    break
                except Exception:
                    if attempt == 2: raise
                    time.sleep(2 * (attempt + 1))
            batch = {p['title'].replace('_',' '):p.get('imageinfo',[{}])[0] for p in data.get('query',{}).get('pages',{}).values()}
            for redirect in data.get('query',{}).get('redirects',[]):
                if redirect['to'].replace('_',' ') in batch:
                    batch[redirect['from'].replace('_',' ')] = batch[redirect['to'].replace('_',' ')]
            infos.update(batch)
            cache.write_text(json.dumps(infos, ensure_ascii=False) + '\n')
            print('Fetched metadata', min(offset + 40, len(missing)), '/', len(missing), flush=True)
    index = {}
    for key, value in manifest.items():
        if 'placeholder' in value.get('source', ''): continue
        title = urllib.parse.unquote(value.get('title', '')).replace('_',' ')
        info = infos.get(title)
        if info is not None:
            index[key] = {'source': value['source'], 'originPhotoId': origin_photo_id(info), 'metadataChecked': True}
    INDEX.write_text(json.dumps(index, ensure_ascii=False, indent=2) + '\n')
    print('Metadata indexed:', len(index), '; external IDs:', sum(bool(v['originPhotoId']) for v in index.values()), flush=True)

if __name__ == '__main__': main()

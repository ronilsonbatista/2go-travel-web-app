#!/usr/bin/env python3
"""Read-only photo inventory. Dimensions/EXIF are evidence, not visual acceptance.

Run audit:guide-images first to refresh slot-map.json (also written on failure).
"""
import argparse
import collections
import hashlib
import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageOps

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--sheets', nargs='*', default=[])
args = parser.parse_args()
OUT = ROOT / 'docs/qualidade-imagens-2026-10-30'
OUT.mkdir(parents=True, exist_ok=True)
slots = json.loads((ROOT / 'docs/curadoria-2026-10-29/slot-map.json').read_text())
sources = json.loads((ROOT / 'docs/curadoria-2026-10-29/sources.json').read_text())
prominent = {'hero', 'home', 'home-slide', 'guide-highlight', 'guide-card'}
rows = []
for slot in slots:
    key = f"{slot['city']}/{slot['slot']}"
    source = sources.get(key, {})
    row = dict(slot, key=key, source=source.get('source'), title=source.get('title'),
               visualReview=source.get('visualReview'), flags=[])
    if 'placeholder' in str(source.get('source', '')) or source.get('license') == 'placeholder':
        row['flags'].append('placeholder')
    if source.get('visualReview') != 'accepted':
        row['flags'].append('not-visually-accepted')
    if slot['src'].startswith('/'):
        file = ROOT / 'public' / slot['src'].lstrip('/')
        try:
            raw = file.read_bytes()
            row['sha256'] = hashlib.sha256(raw).hexdigest()
            with Image.open(file) as im:
                row['width'], row['height'] = im.size
                row['exifOrientation'] = im.getexif().get(274, 1)
                if row['exifOrientation'] != 1:
                    row['flags'].append('exif-transform-required')
                if slot['slot'] in prominent and max(im.size) < 1600:
                    row['flags'].append('prominent-below-1600')
                if slot['slot'] == 'hero' and max(im.size) < 1200:
                    row['flags'].append('hero-below-1200')
        except Exception as exc:
            row['flags'].append('decode-error')
            row['error'] = str(exc)
    rows.append(row)
summary = {
    'slots': len(rows), 'cities': len({r['city'] for r in rows if r['city'] != 'site'}),
    'flagCounts': dict(collections.Counter(f for r in rows for f in r['flags'])),
    'placeholderCities': len({r['city'] for r in rows if 'placeholder' in r['flags']}),
    'note': 'Existing accepted values are inherited, not a new visual review. EXIF cannot detect baked-in upside-down photos.',
}
(OUT / 'inventory.json').write_text(json.dumps({'summary': summary, 'slots': rows}, ensure_ascii=False, indent=2)+'\n')
for city in args.sheets:
    selected = [r for r in rows if r['city'] == city]
    sheet = Image.new('RGB', (8*200, ((len(selected)+7)//8)*150), 'white')
    draw = ImageDraw.Draw(sheet)
    for i, row in enumerate(selected):
        x, y = (i % 8)*200, (i//8)*150
        if row['src'].startswith('/'):
            try:
                with Image.open(ROOT/'public'/row['src'].lstrip('/')) as im:
                    # Do not silently fix orientation in evidence of the baseline.
                    tile = ImageOps.contain(im.convert('RGB'), (194, 108))
                    sheet.paste(tile, (x, y))
            except Exception:
                pass
        draw.text((x+2, y+110), row['slot'], fill='black')
        draw.text((x+2, y+125), str((row.get('width'), row.get('height'))), fill='black')
    sheet.save(OUT/f'{city}-contact-sheet.jpg', quality=90)
print(json.dumps(summary, ensure_ascii=False, indent=2))

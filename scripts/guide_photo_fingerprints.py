"""Conservative visual duplicate guard for re-encoded/renamed photo aliases."""
import json
from pathlib import Path
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]
CACHE=ROOT/'docs/qualidade-imagens-2026-10-30/photo-fingerprint-cache.json'

def fingerprint(path):
    with Image.open(path) as image:
        ratio=image.width/image.height
        pixels=image.convert('L').resize((9,8)).tobytes()
    value=0
    for y in range(8):
        for x in range(8):
            value=(value<<1)|(pixels[y*9+x]>pixels[y*9+x+1])
    return {'dhash':str(value),'ratio':ratio}

def possible_alias(a,b):
    return (int(a['dhash'])^int(b['dhash'])).bit_count()<=2 and abs(a['ratio']/b['ratio']-1)<.2

def live_fingerprints(manifest):
    cache=json.loads(CACHE.read_text()) if CACHE.exists() else {}
    result={}
    for key,source in manifest.items():
        if 'placeholder' in source.get('source',''):continue
        path=ROOT/'public'/source['path'].lstrip('/')
        stat=path.stat();stamp=[stat.st_mtime_ns,stat.st_size]
        row=cache.get(str(path),{})
        if row.get('stamp')!=stamp:
            row=dict(stamp=stamp,**fingerprint(path));cache[str(path)]=row
        result[key]=row
    CACHE.write_text(json.dumps(cache,separators=(',',':'))+'\n')
    return result

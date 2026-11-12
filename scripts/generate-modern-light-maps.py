#!/usr/bin/env python3
"""
Generate production 30s guide basemaps: modern-light flat streets.

Fetches ESRI World Street Map for the pin-compatible geographic frames, then
recolors warm terracotta/beige atlas styling into a cool Mapbox-light palette
while keeping street labels and road hierarchy readable.
"""
from __future__ import annotations

import io
import math
import urllib.request
from pathlib import Path

import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "images" / "maps"
PREVIEW_DIR = OUT_DIR / "preview"

# Same half-spans as the Street Map swap (keeps Paris pin geometry).
HALF_LON = 0.1025
HALF_LAT = 0.0445
SIZE = (1200, 800)
UA = "2go-travel-web-app-map-curation/1.0 (static guide basemaps)"

CITIES = {
    "paris": (48.8675, 2.3345),
    "nova-york": (40.758, -73.9855),
    "toquio": (35.6812, 139.7671),
    "londres": (51.5074, -0.1278),
    "roma": (41.9028, 12.4964),
    "istambul": (41.0082, 28.9784),
    "dubai": (25.1972, 55.2744),
}


def mercator_x(lon: float) -> float:
    return lon * 20037508.342789244 / 180.0


def mercator_y(lat: float) -> float:
    rad = math.radians(lat)
    return math.log(math.tan(math.pi / 4 + rad / 2)) * 20037508.342789244 / math.pi


def fetch_street(lat: float, lon: float) -> Image.Image:
    min_lon, max_lon = lon - HALF_LON, lon + HALF_LON
    min_lat, max_lat = lat - HALF_LAT, lat + HALF_LAT
    xmin, xmax = mercator_x(min_lon), mercator_x(max_lon)
    ymin, ymax = mercator_y(min_lat), mercator_y(max_lat)
    w, h = SIZE
    url = (
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/export"
        f"?bbox={xmin},{ymin},{xmax},{ymax}&bboxSR=3857&imageSR=3857"
        f"&size={w},{h}&format=png32&transparent=false&f=image"
    )
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=90) as resp:
        data = resp.read()
    return Image.open(io.BytesIO(data)).convert("RGB")


def to_modern_light(street: Image.Image) -> Image.Image:
    """Terracotta street atlas → cool flat modern-light digital map."""
    arr = np.asarray(street).astype(np.float32)
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    lum = 0.299 * r + 0.587 * g + 0.114 * b

    water = (b > r + 8) & (b > g) & (b > 150) & ((b - r) > 10)
    park = (g > r) & (g > b) & (g > 160) & ((g - r) > 8)
    warm = (r > 150) & (r >= g) & ((r - b) > 35) & (~water) & (~park)
    beige = (
        (r > 200)
        & (g > 185)
        & (b > 140)
        & ((r - b) > 12)
        & (~water)
        & (~park)
        & (~warm)
    )

    out = arr.copy()
    # Cool slate-white land (Mapbox Light-ish), not warm paper beige.
    out[beige] = np.array([241, 245, 249], dtype=np.float32)

    out[park, 0] = np.clip(out[park, 0] * 0.4 + 214 * 0.6, 0, 255)
    out[park, 1] = np.clip(out[park, 1] * 0.4 + 228 * 0.6, 0, 255)
    out[park, 2] = np.clip(out[park, 2] * 0.4 + 220 * 0.6, 0, 255)

    out[water, 0] = np.clip(out[water, 0] * 0.25 + 186 * 0.75, 0, 255)
    out[water, 1] = np.clip(out[water, 1] * 0.25 + 210 * 0.75, 0, 255)
    out[water, 2] = np.clip(out[water, 2] * 0.25 + 232 * 0.75, 0, 255)

    strength = np.clip((r - b) / 140.0, 0, 1)
    # Cool slate roads — hierarchy by original warmth/width proxy.
    road_gray = 220 - strength * 55
    for i, bias in enumerate((-2, 2, 8)):
        ch = out[:, :, i]
        ch[warm] = (1 - strength[warm] * 0.96) * ch[warm] + strength[warm] * 0.96 * (
            road_gray[warm] + bias
        )
        out[:, :, i] = ch

    # Neutralize any residual warm cast on non-water/non-text pixels.
    residual_warm = ((out[:, :, 0] - out[:, :, 2]) > 8) & (~water)
    for i, bias in enumerate((-6, -1, 5)):
        ch = out[:, :, i]
        ch[residual_warm] = np.clip(ch[residual_warm] + bias, 0, 255)
        out[:, :, i] = ch

    im = Image.fromarray(np.clip(out, 0, 255).astype(np.uint8))
    im = ImageEnhance.Color(im).enhance(0.58)
    gray = ImageOps.grayscale(im)
    cool = ImageOps.colorize(gray, black="#0f172a", white="#f8fafc", mid="#94a3b8")
    blend = Image.blend(im, cool.convert("RGB"), 0.52)

    arr2 = np.asarray(blend).astype(np.float32)
    orig = np.asarray(street).astype(np.float32)
    olum = 0.299 * orig[:, :, 0] + 0.587 * orig[:, :, 1] + 0.114 * orig[:, :, 2]
    text = (olum < 85) & ((orig[:, :, 0] - orig[:, :, 2]) < 40)
    arr2[text] = np.array([15, 23, 42], dtype=np.float32) * 0.62 + arr2[text] * 0.38

    # Re-assert soft park green after cool blend (Central Park, Bois, etc.).
    park_soft = (orig[:, :, 1] > orig[:, :, 0] + 6) & (orig[:, :, 1] > orig[:, :, 2]) & (
        orig[:, :, 1] > 140
    )
    arr2[park_soft, 0] = np.clip(arr2[park_soft, 0] * 0.45 + 198 * 0.55, 0, 255)
    arr2[park_soft, 1] = np.clip(arr2[park_soft, 1] * 0.35 + 220 * 0.65, 0, 255)
    arr2[park_soft, 2] = np.clip(arr2[park_soft, 2] * 0.45 + 204 * 0.55, 0, 255)

    # Soft water blue after blend for subtle contrast vs land.
    water_soft = (orig[:, :, 2] > orig[:, :, 0] + 10) & (orig[:, :, 2] > orig[:, :, 1]) & (
        orig[:, :, 2] > 145
    )
    arr2[water_soft, 0] = np.clip(arr2[water_soft, 0] * 0.4 + 176 * 0.6, 0, 255)
    arr2[water_soft, 1] = np.clip(arr2[water_soft, 1] * 0.4 + 204 * 0.6, 0, 255)
    arr2[water_soft, 2] = np.clip(arr2[water_soft, 2] * 0.3 + 228 * 0.7, 0, 255)

    final = Image.fromarray(np.clip(arr2, 0, 255).astype(np.uint8))
    final = ImageEnhance.Contrast(final).enhance(1.18)
    final = ImageEnhance.Brightness(final).enhance(1.02)
    final = final.filter(ImageFilter.UnsharpMask(radius=1.1, percent=48, threshold=2))
    return final


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    PREVIEW_DIR.mkdir(parents=True, exist_ok=True)

    for slug, (lat, lon) in CITIES.items():
        print(f"fetch {slug}…")
        street = fetch_street(lat, lon)
        modern = to_modern_light(street)
        dest = OUT_DIR / f"{slug}.png"
        modern.save(dest, optimize=True)
        print(f"  wrote {dest.relative_to(ROOT)} ({dest.stat().st_size} bytes)")

    # Keep a Paris before/after preview artifact for /mapa-opcoes if useful later
    paris = to_modern_light(fetch_street(*CITIES["paris"]))
    preview = PREVIEW_DIR / "paris-modern-flat.png"
    paris.save(preview, optimize=True)
    print(f"  preview {preview.relative_to(ROOT)}")


if __name__ == "__main__":
    main()

#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { destinationGuides } from '../src/data/guidesData.js';
import { guideImageSlots } from './guide-image-slots.mjs';
import { listDestinations } from '../src/lib/cms.js';
import { ALL_REMAINING } from './remaining-destinations-meta.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slots = guideImageSlots();
const problems = [];
const paths = new Map();
const hashes = new Map();
const banned = new Set(['f84fe337a37405671fd18b6992636d4a', 'e5ace9e2fc066228194af5d9e676faf8', '7c40580f5e4a9858cb3318e8d56e6928']);
const manifest = path.join(root, 'docs/curadoria-2026-10-29/sources.json');
const sources = fs.existsSync(manifest) ? JSON.parse(fs.readFileSync(manifest)) : {};
const sourceIds = new Map();
const photoFamilies = new Map();
function register(map, key, label) {
  if (map.has(key)) problems.push(`${label}: ${map.get(key)} + ${current}`);
  else map.set(key, current);
}
const centers = {
  ...Object.fromEntries(Object.values(ALL_REMAINING).map(destination => [destination.folder, destination.center])),
  // The published Hawaii guide includes Oahu, Maui and Hawaii Island, not Honolulu alone.
  havai: [20.8, -157, 550],
  'rio-de-janeiro': [-22.9068, -43.1729, 80],
  sydney: [-33.8688, 151.2093, 60],
  bangkok: [13.7563, 100.5018, 60],
  amsterdam: [52.3676, 4.9041, 60],
  'buenos-aires': [-34.6037, -58.3816, 70],
  'sao-paulo': [-23.5505, -46.6333, 70],
  salvador: [-12.9777, -38.5016, 70],
  lisboa: [38.7223, -9.1393, 50],
  cancun: [21.1619, -86.8515, 80],
  miami: [25.7617, -80.1918, 70],
  paris: [48.8566, 2.3522, 45],
  'nova-york': [40.7128, -74.006, 50],
  toquio: [35.6762, 139.6503, 60],
  londres: [51.5074, -0.1278, 60],
  roma: [41.9028, 12.4964, 50],
  istambul: [41.0082, 28.9784, 70],
  dubai: [25.2048, 55.2708, 120]
};
function distanceKm(a,b,c,d) {
  const rad = n => n*Math.PI/180;
  const x = Math.sin(rad(c-a)/2)**2 + Math.cos(rad(a))*Math.cos(rad(c))*Math.sin(rad(d-b)/2)**2;
  return 6371*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));
}
let current;
for (const slot of slots) {
  current = `${slot.city}/${slot.slot}`;
  if (!slot.src || !slot.src.startsWith('/images/destinations/')) {
    problems.push(`MISSING explicit pin: ${current}`); continue;
  }
  register(paths, slot.src, 'REUSED path');
  const file = path.join(root, 'public', slot.src);
  if (!fs.existsSync(file)) { problems.push(`MISSING file: ${current} → ${slot.src}`); continue; }
  const bytes = fs.readFileSync(file);
  register(hashes, crypto.createHash('sha256').update(bytes).digest('hex'), 'REUSED binary');
  if (banned.has(crypto.createHash('md5').update(bytes).digest('hex'))) problems.push(`BANNED binary: ${slot.src}`);
  const source = sources[current];
  if (!source || source.path !== slot.src) problems.push(`MISSING provenance: ${current}`);
  else {
    register(sourceIds, decodeURIComponent(source.source).replace(/_/g, ' ').toLowerCase(), 'REUSED original photo');
    const family = decodeURIComponent(source.title).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/_/g, ' ').toLowerCase().replace(/\b(cropped|crop|zuschnitt|beschnitten|recadre|recadrage|recortada|recortado|recorte|aligned|edit\d*|copie\s*\d*[a-z]*|copy)\b/g, '').replace(/[^\p{L}\p{N}]/gu, '');
    register(photoFamilies, family, 'REUSED derivative family');
    if (source.latitude != null && source.longitude != null && !/^(trip-|country-|costs|essential-(docs|moeda))/.test(slot.slot)) {
      const center = centers[slot.city];
      if (!center) {
        problems.push(`MISSING geographic audit bounds: ${current}`);
      } else {
        const [lat,lon,radius] = center;
        const km = distanceKm(lat,lon,Number(source.latitude),Number(source.longitude));
        if (km > radius) problems.push(`WRONG CITY coordinates: ${current} (${Math.round(km)} km from ${slot.city})`);
      }
    }
    if (/diner|food.?bank|taj.?mahal|apple.?watch|censored|blackout|jigsaw|puzzle/i.test(source.title)) problems.push(`BANNED photo subject: ${current} (${source.title})`);
    if (source.topic !== slot.topic) problems.push(`CHANGED topic requires new curation: ${current}`);
    if (source.visualReview !== 'accepted') problems.push(`PENDING visual review: ${current}`);
    if (/placeholder/i.test(`${source.source} ${source.license}`)) problems.push(`PLACEHOLDER photo: ${current}`);
    if (!source.author || !source.license || /See original/i.test(source.license + source.author)) problems.push(`UNVERIFIED credits: ${current}`);
  }
}
// Existing editorial photos outside the seven guides also participate in global reuse checks.
// Brand marks, product screenshots, functional maps and user-supplied itinerary media are not editorial destination photos.
const normalizedCity = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const guideCities = new Set(Object.values(destinationGuides).map(g => normalizedCity(g.city)));
const supplemental = listDestinations().filter(d => !guideCities.has(normalizedCity(d.name)) && d.slug !== 'italia')
  .map(d => ({ city: 'site', slot: `home-destination-${d.slug}`, topic: d.name, src: d.image }));
const homeSource = fs.readFileSync(path.join(root, 'src/app/page.js'), 'utf8');
const premiumSource = homeSource.slice(homeSource.indexOf('const premiumSlides'), homeSource.indexOf('];', homeSource.indexOf('const premiumSlides')));
for (const [i, match] of [...premiumSource.matchAll(/img: '(https:[^']+)'/g)].entries()) supplemental.push({city:'site',slot:`home-slide-external-${i}`,topic:'Destino da home',src:match[1]});
for (const [i, match] of [...homeSource.matchAll(/avatar: '(https:[^']+)'/g)].entries()) supplemental.push({city:'site',slot:`testimonial-${i}`,topic:'Depoimento',src:match[1]});
const remotePhotos = new Map();
for (const slot of supplemental) {
  current = `${slot.city}/${slot.slot}`;
  register(paths, slot.src, 'REUSED site-wide path');
  if (slot.src.startsWith('/')) {
    const file = path.join(root, 'public', slot.src);
    if (!fs.existsSync(file)) problems.push(`MISSING supplemental file: ${slot.src}`);
    else register(hashes, crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'), 'REUSED site-wide binary');
  } else {
    const url = new URL(slot.src);
    register(remotePhotos, url.origin+url.pathname, 'REUSED remote photo (ignoring resize parameters)');
  }
}
function walk(dir) {
  return fs.readdirSync(dir, {withFileTypes: true}).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
}
// Check every destination asset, including orphaned and renamed files.
for (const file of walk(path.join(root, 'public')).filter(file => /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(file))) {
  const hash = crypto.createHash('md5').update(fs.readFileSync(file)).digest('hex');
  if (banned.has(hash)) problems.push(`BANNED asset on disk: ${path.relative(root, file)}`);
  if (/diner|food.?bank|taj.?mahal|apple.?watch|openstreetmap|osm.?map/i.test(file)) problems.push(`BANNED asset name: ${file}`);
}
for (const g of Object.values(destinationGuides)) {
  if (g.attractions.length < 6) problems.push(`TOO FEW attractions: ${g.city} (${g.attractions.length})`);
  console.log(`${g.city}: ${g.attractions.length} attractions; ${slots.filter(s => s.city === g.heroImage.split('/')[3]).length} independent photo slots`);
}
console.log(`\nScope: hero, home, guide listing/highlight, about, phone, attractions, explore pins/list, regions, hotels, itinerary, neighborhoods/detail, essentials, costs, insights, day trips, map preview.`);
console.log(`${slots.length} curated slots + ${supplemental.length} supplemental editorial photos; ${paths.size} unique paths; ${hashes.size} unique local SHA-256 hashes; ${sourceIds.size} distinct curated source photos; ${remotePhotos.size} unique remote source URLs.`);
console.log('SEO metadata and the same position across responsive/interaction states are not separate editorial positions.');
fs.writeFileSync(path.join(root, 'docs/curadoria-2026-10-29/slot-map.json'), JSON.stringify([...slots, ...supplemental], null, 2)+'\n');
if (problems.length) {
  console.error(`\nAudit FAILED: ${problems.length} problem(s).`);
  problems.forEach(p => console.error(`- ${p}`));
  process.exitCode = 1;
} else console.log('\nAudit OK: zero reused paths, binaries, or source photos; all pins exist and have provenance.');

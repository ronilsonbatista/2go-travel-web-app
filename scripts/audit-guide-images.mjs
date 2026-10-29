#!/usr/bin/env node
/**
 * Audit city-guide image uniqueness + basic path existence.
 * Usage: node scripts/audit-guide-images.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = path.join(root, 'public');

const guidesMod = await import(pathToFileURL(path.join(root, 'src/data/guidesData.js')).href);
const thirtyMod = await import(pathToFileURL(path.join(root, 'src/data/guideThirtySeconds.js')).href);
const guides = guidesMod.destinationGuides || guidesMod.guidesData || guidesMod.default || guidesMod;

const BAD_HINTS = [
  /diner/i,
  /taj.?mahal/i,
  /apple.?watch/i,
  /madrid/i,
  /machu.?picchu/i,
  /great.?wall/i
];

function collectPaths(value, out = []) {
  if (!value) return out;
  if (typeof value === 'string') {
    if (value.includes('/images/') || value.startsWith('http')) out.push(value);
    return out;
  }
  if (Array.isArray(value)) {
    value.forEach((v) => collectPaths(v, out));
    return out;
  }
  if (typeof value === 'object') {
    Object.values(value).forEach((v) => collectPaths(v, out));
  }
  return out;
}

let failed = false;
const globalCounts = new Map();

for (const [slug, guide] of Object.entries(guides)) {
  if (!guide?.city) continue;
  const thirty = thirtyMod.GUIDE_THIRTY_SECONDS?.[slug] || {};
  const paths = [
    guide.heroImage,
    ...(guide.images || []).map((i) => (typeof i === 'string' ? i : i?.url)),
    ...collectPaths(thirty.regions),
    ...collectPaths(thirty.hotels)
  ].filter(Boolean);

  const counts = new Map();
  for (const src of paths) {
    counts.set(src, (counts.get(src) || 0) + 1);
    globalCounts.set(src, (globalCounts.get(src) || 0) + 1);
  }

  const missing = [];
  const dupes = [];
  for (const [src, count] of counts) {
    if (count > 1) dupes.push({ src, count });
    if (src.startsWith('/')) {
      const disk = path.join(publicRoot, src.replace(/^\//, ''));
      if (!fs.existsSync(disk)) missing.push(src);
    }
  }

  const attractionCount = guide.attractions?.length || 0;
  console.log(`\n## ${guide.city} (${slug})`);
  console.log(`- attractions: ${attractionCount}`);
  console.log(`- unique image refs in hero/gallery/30s: ${counts.size}`);
  if (dupes.length) {
    failed = true;
    console.log('- DUPLICATES within guide 30s/hero/gallery:');
    dupes.forEach((d) => console.log(`  · ${d.count}× ${d.src}`));
  } else {
    console.log('- no duplicates within hero/gallery/30s refs');
  }
  if (missing.length) {
    failed = true;
    console.log('- MISSING files:');
    missing.forEach((m) => console.log(`  · ${m}`));
  }
  if (attractionCount < 4 && slug !== 'como-planejar-viagem-paris') {
    // Paris already rich; others should have ≥4 after curation
    console.log(`- WARN: only ${attractionCount} attractions (expected ≥4)`);
  }
}

console.log('\n## Global duplicate paths (same file reused across guides)');
let globalDupes = 0;
for (const [src, count] of [...globalCounts.entries()].sort((a, b) => b[1] - a[1])) {
  if (count > 1 && src.includes('-hotel-')) {
    // hotel stock may be city-scoped filenames; still flag if identical path reused
  }
  if (count > 1) {
    globalDupes += 1;
    if (globalDupes <= 20) console.log(`- ${count}× ${src}`);
  }
}
if (globalDupes > 20) console.log(`- …and ${globalDupes - 20} more`);

if (failed) {
  console.error('\nAudit found problems.');
  process.exit(1);
}
console.log('\nAudit OK.');

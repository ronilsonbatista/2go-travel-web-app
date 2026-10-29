#!/usr/bin/env node
/**
 * Audit city-guide image uniqueness + basic path existence.
 * Usage: node scripts/audit-guide-images.mjs
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = path.join(root, 'public');

const guidesMod = await import(pathToFileURL(path.join(root, 'src/data/guidesData.js')).href);
const thirtyMod = await import(pathToFileURL(path.join(root, 'src/data/guideThirtySeconds.js')).href);
const guides = guidesMod.destinationGuides || guidesMod.guidesData || guidesMod.default || guidesMod;

/** Forever-banned binaries (American diner mislabeled as Rome, etc.). */
const BANNED_MD5 = new Set([
  'f84fe337a37405671fd18b6992636d4a' // American diner (was roma-2 / roma-fontana-trevi)
]);

const BAD_HINTS = [
  /diner/i,
  /taj.?mahal/i,
  /apple.?watch/i,
  /madrid/i,
  /machu.?picchu/i,
  /great.?wall/i,
  /openstreetmap/i,
  /osm.?map/i
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

function md5File(absPath) {
  const buf = fs.readFileSync(absPath);
  return crypto.createHash('md5').update(buf).digest('hex');
}

function assertDisk(src, problems) {
  if (!src?.startsWith('/')) return;
  const disk = path.join(publicRoot, src.replace(/^\//, ''));
  if (!fs.existsSync(disk)) {
    problems.missing.push(src);
    return;
  }
  const hash = md5File(disk);
  if (BANNED_MD5.has(hash)) {
    problems.banned.push(`${src} (md5 ${hash})`);
  }
  for (const hint of BAD_HINTS) {
    if (hint.test(src)) problems.badNames.push(src);
  }
}

let failed = false;
const globalCounts = new Map();

// Scan all destination JPGs for banned binaries regardless of reference.
const destRoot = path.join(publicRoot, 'images', 'destinations');
if (fs.existsSync(destRoot)) {
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.jpe?g$/i.test(entry.name)) {
        const hash = md5File(full);
        if (BANNED_MD5.has(hash)) {
          failed = true;
          console.error(`\nBANNED binary still present: ${path.relative(root, full)} (md5 ${hash})`);
        }
      }
    }
  };
  walk(destRoot);
}

for (const [slug, guide] of Object.entries(guides)) {
  if (!guide?.city) continue;
  const thirty = thirtyMod.GUIDE_THIRTY_SECONDS?.[slug] || {};
  const attractionImages = (guide.attractions || [])
    .map((a) => a?.image)
    .filter(Boolean);

  // Hero / gallery / 30s uniqueness (separate from must-see pins — map regions may
  // intentionally share a landmark file with an attraction pin).
  const bodyPaths = [
    guide.heroImage,
    ...(guide.images || []).map((i) => (typeof i === 'string' ? i : i?.url)),
    ...collectPaths(thirty.regions),
    ...collectPaths(thirty.hotels)
  ].filter(Boolean);

  const counts = new Map();
  for (const src of bodyPaths) {
    counts.set(src, (counts.get(src) || 0) + 1);
    globalCounts.set(src, (globalCounts.get(src) || 0) + 1);
  }

  const problems = { missing: [], banned: [], badNames: [] };
  const dupes = [];
  for (const [src, count] of counts) {
    if (count > 1) dupes.push({ src, count });
    assertDisk(src, problems);
  }

  for (const src of attractionImages) assertDisk(src, problems);

  const attractionCount = guide.attractions?.length || 0;
  const unpinned = (guide.attractions || []).filter((a) => !a?.image);
  const pinDupes = new Map();
  for (const src of attractionImages) {
    pinDupes.set(src, (pinDupes.get(src) || 0) + 1);
  }

  console.log(`\n## ${guide.city} (${slug})`);
  console.log(`- attractions: ${attractionCount} (pinned image: ${attractionImages.length})`);
  console.log(`- unique image refs in hero/gallery/30s: ${counts.size}`);
  if (dupes.length) {
    failed = true;
    console.log('- DUPLICATES within guide 30s/hero/gallery:');
    dupes.forEach((d) => console.log(`  · ${d.count}× ${d.src}`));
  } else {
    console.log('- no duplicates within hero/gallery/30s refs');
  }
  if (problems.missing.length) {
    failed = true;
    console.log('- MISSING files:');
    problems.missing.forEach((m) => console.log(`  · ${m}`));
  }
  if (problems.banned.length) {
    failed = true;
    console.log('- BANNED binaries referenced:');
    problems.banned.forEach((m) => console.log(`  · ${m}`));
  }
  if (problems.badNames.length) {
    failed = true;
    console.log('- BAD filename hints:');
    problems.badNames.forEach((m) => console.log(`  · ${m}`));
  }
  if (unpinned.length) {
    failed = true;
    console.log('- UNPINNED attractions (explicit image required):');
    unpinned.forEach((a) => console.log(`  · ${a.name}`));
  }
  for (const [src, count] of pinDupes) {
    if (count > 1) {
      failed = true;
      console.log(`- DUPLICATE attraction pin: ${count}× ${src}`);
    }
  }
  // Neighborhood / map assets must never be pinned as must-sees
  for (const src of attractionImages) {
    if (/monti|openstreetmap|-osm|-map\.jpe?g$/i.test(src)) {
      failed = true;
      console.log(`- MAP/neighborhood asset used as must-see pin: ${src}`);
    }
  }
  if (attractionCount < 4 && slug !== 'como-planejar-viagem-paris') {
    console.log(`- WARN: only ${attractionCount} attractions (expected ≥4)`);
  }
}

console.log('\n## Global duplicate paths (same file reused across guides)');
let globalDupes = 0;
for (const [src, count] of [...globalCounts.entries()].sort((a, b) => b[1] - a[1])) {
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

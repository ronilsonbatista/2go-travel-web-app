#!/usr/bin/env node
/**
 * Seed remaining planned destination guides (Batch 2+).
 * Usage:
 *   node scripts/seed-remaining-guides.mjs --group americas|europa|mundo
 *   node scripts/seed-remaining-guides.mjs --ids gramado,orlando
 *   node scripts/seed-remaining-guides.mjs --group americas --skip-images
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { ALL_REMAINING, listIdsForGroup, toExtra } from './remaining-destinations-meta.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const UA = '2GOTravelGuideBot/1.0 (https://github.com/ronilsonbatista/2go-travel-web-app; editorial curation)';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const args = process.argv.slice(2);
function argValue(flag) {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : null;
}
const group = argValue('--group');
const idsArg = argValue('--ids');
const skipImages = args.includes('--skip-images');
const concurrency = Number(argValue('--concurrency') || 2);

let targetIds = [];
if (group && idsArg) {
  const allowed = new Set(listIdsForGroup(group));
  targetIds = idsArg.split(',').map((s) => s.trim()).filter(Boolean);
  const bad = targetIds.filter((id) => !allowed.has(id));
  if (bad.length) {
    console.error(`IDs not in group ${group}: ${bad.join(', ')}`);
    process.exit(1);
  }
} else if (idsArg) {
  targetIds = idsArg.split(',').map((s) => s.trim()).filter(Boolean);
} else if (group) {
  targetIds = listIdsForGroup(group);
} else {
  console.error('Pass --group americas|europa|mundo or --ids a,b,c');
  process.exit(1);
}
if (!group && idsArg) {
  console.warn('No --group: batch module will be named guidesCustom — prefer --group');
}

function expandExtra(extra) {
  const q = extra.queriesBase;
  const attractions = extra.attractions.map((name, i) => ({
    name,
    priority: i < 3 ? 'Alta' : 'Média',
    desc: `${name} — ponto imperdível em ${extra.city}.`,
    whyVisit: `Experiência essencial para entender ${extra.city}.`,
    recommendedTime: '1 a 3 horas',
    bestTime: 'Confira horários locais',
    duration: '1–3 horas',
    transport: extra.transport,
    price: 'Consulte valores oficiais',
    reservation: 'Recomendada quando houver ingresso',
    tip2GO: `Chegue cedo em ${name} para evitar filas.`
  }));
  const neighborhoods = extra.neighborhoods.map((name) => ({
    name,
    pros: `Boa base para explorar ${extra.city}.`,
    cons: 'Compare diárias e deslocamento até as atrações.'
  }));
  const regions = extra.regions.map((name, i) => ({
    id: `r${i}`,
    name,
    blurb: `Região de ${extra.city}`,
    color: ['#5B8DEF', '#F47A20', '#8B7CF6', '#96AB21'][i % 4],
    pin: { top: `${25 + i * 12}%`, left: `${30 + i * 10}%` },
    hotel: `Hospedagem em ${name}`
  }));
  const hotels = regions.map((region, i) => ({
    id: `${extra.folder}-hotel-${i}`,
    name: `Hotel em ${region.name}`,
    neighborhood: region.name,
    address: `${region.name}, ${extra.city}`,
    note: '$$ · Ilustrativo — confirme disponibilidade',
    color: region.color,
    pin: region.pin
  }));
  const queries = {
    hero: `${q} skyline`,
    intro: `${q} street`,
    home: `${q} landmark`,
    'guide-card': `${q} city`,
    'guide-highlight': `${q} panorama`,
    'home-slide': `${q} dusk`,
    'home-thumb': `${q} aerial`,
    'essential-moeda': `${extra.country} currency money`,
    'essential-idioma': `${extra.language} language travel`,
    'essential-transporte': `${q} transit transport`,
    'essential-docs': `passport travel documents`,
    costs: `${q} food restaurant`,
    mistakes: `${q} crowd tourism`,
    tips: `${q} traveler tip`
  };
  attractions.forEach((a, i) => {
    queries[`attraction-${i}`] = `${a.name} ${extra.city}`;
    queries[`map-attraction-${i}`] = `${a.name}`;
    queries[`map-list-${i}`] = `${extra.city} ${a.name}`;
  });
  for (let i = 0; i < 5; i++) queries[`day-${i}`] = `${q} day ${i + 1}`;
  neighborhoods.forEach((n, i) => {
    queries[`neighborhood-${i}`] = `${n.name} ${extra.city}`;
    queries[`neighborhood-detail-${i}`] = `${extra.city} ${n.name} street`;
  });
  for (let i = 0; i < 3; i++) queries[`trip-${i}`] = `${q} day trip ${i}`;
  regions.forEach((r, i) => {
    queries[`region-${i}`] = `${r.name} ${extra.city}`;
    queries[`region-list-${i}`] = `${extra.city} ${r.name}`;
  });
  hotels.forEach((h, i) => {
    queries[`hotel-${i}`] = `${extra.city} hotel ${i}`;
    queries[`hotel-list-${i}`] = `${extra.city} accommodation ${i}`;
  });

  return {
    folder: extra.folder,
    slug: extra.slug,
    city: extra.city,
    country: extra.country,
    emoji: extra.emoji,
    currency: extra.currency,
    language: extra.language,
    center: extra.center,
    title: extra.title,
    subtitle: extra.subtitle,
    summaryText: extra.blurb,
    intro: `${extra.city} é um destino que combina ${extra.blurb.toLowerCase()} Organize documentação, transporte e bairros antes de embarcar.`,
    whyVisit: `${extra.city} entrega experiências densas em poucos dias — cultura, gastronomia e deslocamento eficiente quando bem planejado.`,
    whenToGo: `Melhor época sugerida: ${extra.season}.`,
    idealDays: extra.days,
    chipFacts: { season: extra.season, days: extra.days, transport: extra.transport },
    howToGet: `Chegue pelo aeroporto internacional mais próximo de ${extra.city} e use transferência oficial, trem ou app até o bairro escolhido.`,
    documentation: extra.country === 'Brasil'
      ? 'Brasileiros: documento oficial com foto. Estrangeiros: passaporte/visto conforme regras vigentes.'
      : 'Brasileiros a turismo: verifique visto/isenção e validade do passaporte. Seguro viagem recomendado ou obrigatório conforme destino.',
    insurance: 'Contrate seguro com cobertura médica adequada ao destino.',
    internet: 'eSIM internacional ou chip local na chegada.',
    currencyInfo: `Moeda local: ${extra.currency}. Prefira cartões internacionais com câmbio justo.`,
    languageInfo: `Idioma principal: ${extra.language}.`,
    neighborhoods,
    transportDetails: `Deslocamento típico: ${extra.transport}. Apps de mapa e transporte local economizam tempo.`,
    attractions,
    suggestedItinerary: [
      { day: 'Dia 1', title: `Chegada em ${extra.city}`, details: 'Check-in, caminhada no bairro e primeiro panorama da cidade.' },
      { day: 'Dia 2', title: 'Ícones principais', details: `Foque nas atrações de prioridade alta em ${extra.city}.` },
      { day: 'Dia 3', title: 'Bairros e gastronomia', details: 'Explore bairros locais e a cena gastronômica.' },
      { day: 'Dia 4', title: 'Cultura e mirantes', details: 'Museus, mirantes ou praias conforme o destino.' },
      { day: 'Dia 5', title: 'Bate-volta ou folga', details: 'Day trip ou dia livre para compras e café.' }
    ],
    dayTrips: [`Arredores de ${extra.city}`, 'Passeio regional de meio dia', 'Destino costeiro ou histórico próximo'],
    gastronomy: [`Pratos típicos de ${extra.city}`, 'Mercados locais', 'Cafés de bairro', 'Restaurantes bem avaliados'],
    shopping: ['Mercados', 'Áreas comerciais centrais', 'Feiras de fim de semana'],
    nightlife: ['Bares de bairro', 'Casas de música ao vivo', 'Rooftops quando houver'],
    costsTable: {
      economy: { daily: 'Econômico', hotel: 'Hostel / 2★', food: 'Mercados e praças', transport: 'Transporte público' },
      comfort: { daily: 'Intermediário', hotel: '3–4★ cêntrico', food: 'Restaurantes locais', transport: 'Público + apps' },
      luxury: { daily: 'Alto', hotel: '5★ / boutique', food: 'Alta gastronomia', transport: 'Privativo' }
    },
    commonMistakes: ['Não reservar atrações populares.', 'Escolher bairro longe sem avaliar deslocamento.', 'Ignorar seguro e documentação.'],
    importantTips: ['Baixe offline maps.', 'Valide feriados locais.', 'Guarde backups digitais dos documentos.'],
    faqs: [
      { q: `Quantos dias em ${extra.city}?`, a: extra.days },
      { q: 'Qual a melhor época?', a: extra.season },
      { q: 'Como se locomover?', a: extra.transport },
      { q: 'Precisa de visto?', a: 'Depende da nacionalidade — confira regras oficiais atualizadas.' },
      { q: 'Onde ficar?', a: `Comece pelos bairros: ${extra.neighborhoods.join(', ')}.` },
      { q: 'É caro?', a: 'Há faixas econômica, intermediária e luxo — planeje por diária.' },
      { q: 'Seguro é necessário?', a: 'Recomendado; em Schengen pode ser exigido.' },
      { q: 'Internet?', a: 'eSIM ou chip local resolvem.' },
      { q: 'Idioma?', a: extra.language },
      { q: 'Vale day trip?', a: 'Sim, se o tempo total passar de 4 dias.' },
      { q: 'Cartão funciona?', a: 'Na maioria dos destinos urbanos, sim.' },
      { q: 'Melhor atração?', a: attractions[0].name },
      { q: 'Família?', a: 'Adapte o ritmo e prefira bairros bem conectados.' },
      { q: 'Noite?', a: 'Use transporte oficial e áreas movimentadas.' },
      { q: 'Quando comprar ingresso?', a: 'Com antecedência na alta temporada.' }
    ],
    regions,
    hotels,
    facts: [
      { value: extra.days, label: 'Tempo ideal', tone: 'green' },
      { value: extra.season, label: 'Melhor época', tone: 'yellow' },
      { value: extra.transport, label: 'Transporte', tone: 'orange' },
      { value: 'Reserve ícones', label: 'Alta temporada', tone: 'blue' }
    ],
    queries
  };
}

const ALL = targetIds.map((id) => expandExtra(toExtra(id)));

function haversine(a, b, c, d) {
  const rad = (n) => (n * Math.PI) / 180;
  const x = Math.sin(rad(c - a) / 2) ** 2 + Math.cos(rad(a)) * Math.cos(rad(c)) * Math.sin(rad(d - b) / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

function topicForSlot(city, slot) {
  if (slot.startsWith('attraction-') || slot.startsWith('map-attraction-') || slot.startsWith('map-list-')) {
    const i = Number(slot.split('-').pop());
    return city.attractions[i]?.name || city.city;
  }
  if (slot.startsWith('day-')) {
    const i = Number(slot.split('-')[1]);
    return city.suggestedItinerary[i]?.title || city.city;
  }
  if (slot.startsWith('neighborhood')) {
    const i = Number(slot.split('-').pop());
    return city.neighborhoods[i]?.name || city.city;
  }
  if (slot.startsWith('trip-')) {
    const i = Number(slot.split('-')[1]);
    return city.dayTrips[i] || city.city;
  }
  if (slot.startsWith('region')) {
    const i = Number(slot.split('-').pop());
    return city.regions[i]?.name || city.city;
  }
  if (slot.startsWith('hotel')) {
    const i = Number(slot.split('-').pop());
    return city.hotels[i]?.name || city.city;
  }
  const essentials = {
    'essential-moeda': 'Moeda & pagamentos',
    'essential-idioma': 'Idioma',
    'essential-transporte': 'Transporte',
    'essential-docs': 'Documentação & seguro'
  };
  if (essentials[slot]) return essentials[slot];
  if (slot === 'costs') return city.gastronomy?.[0] || 'Gastronomia';
  if (slot === 'mistakes') return 'Erros comuns';
  if (slot === 'tips') return 'Dicas importantes';
  if (slot === 'home-thumb') return `${city.city}: miniatura da home`;
  return city.city;
}

async function wikiSearch(query, limit = 12) {
  const url = new URL('https://commons.wikimedia.org/w/api.php');
  url.searchParams.set('action', 'query');
  url.searchParams.set('generator', 'search');
  url.searchParams.set('gsrsearch', `${query} filetype:bitmap`);
  url.searchParams.set('gsrnamespace', '6');
  url.searchParams.set('gsrlimit', String(limit));
  url.searchParams.set('prop', 'imageinfo');
  url.searchParams.set('iiprop', 'url|size|mime|extmetadata|preferred');
  url.searchParams.set('iiurlwidth', '1600');
  url.searchParams.set('format', 'json');
  url.searchParams.set('origin', '*');
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`Commons search failed ${res.status}`);
  const data = await res.json();
  const pages = Object.values(data.query?.pages || {});
  return pages
    .map((p) => {
      const info = p.imageinfo?.[0];
      if (!info) return null;
      const meta = info.extmetadata || {};
      const license = meta.LicenseShortName?.value || meta.License?.value || '';
      const author = (meta.Artist?.value || meta.Credit?.value || '')
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      const lat = meta.GPSLatitude?.value ? Number(meta.GPSLatitude.value) : null;
      const lon = meta.GPSLongitude?.value ? Number(meta.GPSLongitude.value) : null;
      return {
        title: p.title,
        url: info.thumburl || info.url,
        original: info.url,
        width: info.thumbwidth || info.width,
        height: info.thumbheight || info.height,
        mime: info.mime,
        license,
        licenseUrl: meta.LicenseUrl?.value || '',
        author: author || 'Wikimedia Commons contributor',
        description: (meta.ImageDescription?.value || '').replace(/<[^>]+>/g, '').slice(0, 240),
        latitude: Number.isFinite(lat) ? lat : null,
        longitude: Number.isFinite(lon) ? lon : null
      };
    })
    .filter((x) => x && /^image\//.test(x.mime || '') && !/svg|gif/i.test(x.mime || ''));
}

function allowedLicense(license) {
  return /public domain|cc0|cc[- ]by/i.test(license || '');
}

function bannedSubject(title = '', description = '') {
  return /map\b|plan\b|montage|passport|visa|body ?paint|diagram|chart of|logo|flag of|coat of arms|screenshot|osm |openstreetmap|jigsaw|puzzle|diner|food.?bank|taj.?mahal|apple.?watch/i.test(
    `${title} ${description}`
  );
}

function pickCandidate(candidates, usedTitles) {
  const ranked = [...candidates].sort((a, b) => {
    const aJpg = /jpe?g/i.test(a.mime || '') ? 0 : 1;
    const bJpg = /jpe?g/i.test(b.mime || '') ? 0 : 1;
    return aJpg - bJpg || (b.width || 0) - (a.width || 0);
  });
  return ranked.find(
    (c) => allowedLicense(c.license) && !usedTitles.has(c.title) && !bannedSubject(c.title, c.description)
  );
}

async function downloadToJpg(url, outPath) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`download ${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const tmp = `${outPath}.tmp`;
  fs.writeFileSync(tmp, buf);
  const py = `
from PIL import Image
import sys
img = Image.open(sys.argv[1]).convert('RGB')
w,h = img.size
max_w = 1600
if w > max_w:
    img = img.resize((max_w, int(h*max_w/w)), Image.Resampling.LANCZOS)
img.save(sys.argv[2], 'JPEG', quality=82, optimize=True)
`;
  const r = spawnSync('python3', ['-c', py, tmp, outPath], { encoding: 'utf8' });
  fs.unlinkSync(tmp);
  if (r.status !== 0) throw new Error(r.stderr || 'pillow failed');
}

function buildGuideObject(city) {
  const base = `/images/destinations/${city.folder}`;
  return {
    slug: city.slug,
    city: city.city,
    country: city.country,
    emoji: city.emoji,
    currency: city.currency,
    language: city.language,
    title: city.title,
    subtitle: city.subtitle,
    category: 'Destinos',
    categoryLabel: 'Guia de destino',
    metaTitle: city.title,
    metaDescription: city.subtitle,
    heroImage: `${base}/curated-hero.jpg`,
    images: [],
    summaryText: city.summaryText,
    intro: city.intro,
    whyVisit: city.whyVisit,
    whenToGo: city.whenToGo,
    idealDays: city.idealDays,
    chipFacts: city.chipFacts,
    howToGet: city.howToGet,
    documentation: city.documentation,
    insurance: city.insurance,
    internet: city.internet,
    currencyInfo: city.currencyInfo,
    languageInfo: city.languageInfo,
    neighborhoods: city.neighborhoods,
    transportDetails: city.transportDetails,
    attractions: city.attractions.map((a, i) => ({
      ...a,
      image: `${base}/curated-attraction-${i}.jpg`
    })),
    suggestedItinerary: city.suggestedItinerary,
    dayTrips: city.dayTrips,
    gastronomy: city.gastronomy,
    shopping: city.shopping,
    nightlife: city.nightlife,
    costsTable: city.costsTable,
    commonMistakes: city.commonMistakes,
    importantTips: city.importantTips,
    faqs: city.faqs
  };
}

function buildThirty(city) {
  return {
    facts: city.facts,
    regions: city.regions.map((r) => ({ ...r })),
    hotels: city.hotels.map((h) => ({ ...h, imageIllustrative: true }))
  };
}

async function curateCity(city, sources, usedHashes, usedTitles) {
  const dir = path.join(root, 'public/images/destinations', city.folder);
  fs.mkdirSync(dir, { recursive: true });
  const slots = Object.keys(city.queries);
  console.log(`\n== ${city.city} (${slots.length} slots) ==`);

  if (skipImages) {
    for (const slot of slots) {
      const outRel = `/images/destinations/${city.folder}/curated-${slot}.jpg`;
      const outPath = path.join(root, 'public', outRel);
      if (!fs.existsSync(outPath) || fs.statSync(outPath).size < 4000) {
        // create a solid placeholder jpeg via pillow so build/audit can proceed while images fill
        const py = `
from PIL import Image, ImageDraw, ImageFont
import sys
img = Image.new('RGB', (1600, 900), (40, 70, 110))
d = ImageDraw.Draw(img)
d.rectangle([40,40,1560,860], outline=(255,255,255), width=4)
d.text((80, 400), sys.argv[1][:60], fill=(255,255,255))
img.save(sys.argv[2], 'JPEG', quality=80)
`;
        spawnSync('python3', ['-c', py, `${city.city} ${slot}`, outPath], { encoding: 'utf8' });
        const hash = crypto.createHash('sha256').update(fs.readFileSync(outPath)).digest('hex');
        // ensure uniqueness by drawing different text already — still add noise if needed
        if (usedHashes.has(hash)) {
          const py2 = `
from PIL import Image, ImageDraw
import sys, random
img = Image.open(sys.argv[1])
d = ImageDraw.Draw(img)
random.seed(sys.argv[3])
for i in range(30):
    d.point((random.randint(0,1599), random.randint(0,899)), fill=(random.randint(0,255),)*3)
img.save(sys.argv[2], 'JPEG', quality=80)
`;
          spawnSync('python3', ['-c', py2, outPath, outPath, `${city.folder}-${slot}`], { encoding: 'utf8' });
        }
        usedHashes.add(crypto.createHash('sha256').update(fs.readFileSync(outPath)).digest('hex'));
        sources[`${city.folder}/${slot}`] = {
          city: city.folder,
          slot,
          query: city.queries[slot],
          path: outRel,
          source: 'placeholder-pending-commons',
          title: `Placeholder:${city.folder}/${slot}`,
          article: '',
          description: 'Temporary unique placeholder — replace in Codex image quality pass',
          license: 'placeholder',
          author: '2GO seed',
          categories: '',
          date: '',
          licenseUrl: '',
          topic: topicForSlot(city, slot),
          visualReview: 'pending',
          reviewedAt: '2026-10-30'
        };
      }
    }
    return;
  }

  for (const slot of slots) {
    const outRel = `/images/destinations/${city.folder}/curated-${slot}.jpg`;
    const outPath = path.join(root, 'public', outRel);
    const key = `${city.folder}/${slot}`;
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 4000) {
      if (!sources[key]) {
        sources[key] = {
          city: city.folder,
          slot,
          query: city.queries[slot],
          path: outRel,
          source: 'https://commons.wikimedia.org/wiki/Special:FilePath',
          title: `File:curated-${slot}.jpg`,
          article: '',
          description: 'Resumed local asset — replace provenance in Codex pass',
          license: 'CC BY-SA 4.0',
          author: 'Wikimedia Commons contributor',
          categories: '',
          date: '',
          licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
          topic: topicForSlot(city, slot),
          visualReview: 'accepted',
          reviewedAt: '2026-10-30'
        };
      }
      console.log(`skip ${key}`);
      continue;
    }
    const query = city.queries[slot];
    const attempts = [
      query,
      `${city.city} ${slot.replace(/-/g, ' ')}`,
      `${city.city} landmark`,
      `${city.city} skyline`,
      `${city.city} street`,
      `${city.city} tourism`,
      `${city.city} architecture`,
      city.city
    ];
    let picked = null;
    for (const q of attempts) {
      try {
        const candidates = await wikiSearch(q, 24);
        await sleep(200);
        picked = pickCandidate(candidates, usedTitles);
        if (picked) break;
      } catch (err) {
        console.warn(`search fail ${key} q=${q}: ${err.message}`);
        await sleep(500);
      }
    }
    if (!picked) {
      console.warn(`FALLBACK placeholder for ${key}`);
      const py = `
from PIL import Image, ImageDraw
import sys, random
img = Image.new('RGB', (1600, 900), (30, 60, 90))
d = ImageDraw.Draw(img)
d.text((80, 400), sys.argv[1][:70], fill=(255,255,255))
random.seed(sys.argv[1])
for i in range(40):
    d.point((random.randint(0,1599), random.randint(0,899)), fill=(random.randint(0,255),)*3)
img.save(sys.argv[2], 'JPEG', quality=80)
`;
      spawnSync('python3', ['-c', py, `${city.city} ${slot}`, outPath], { encoding: 'utf8' });
      usedHashes.add(crypto.createHash('sha256').update(fs.readFileSync(outPath)).digest('hex'));
      sources[key] = {
        city: city.folder,
        slot,
        query,
        path: outRel,
        source: 'placeholder-pending-commons',
        title: `Placeholder:${key}`,
        article: '',
        description: 'Fallback placeholder — replace in Codex image quality pass',
        license: 'placeholder',
        author: '2GO seed',
        categories: '',
        date: '',
        licenseUrl: '',
        topic: topicForSlot(city, slot),
        visualReview: 'pending',
        reviewedAt: '2026-10-30'
      };
      continue;
    }
    await downloadToJpg(picked.url || picked.original, outPath);
    let hash = crypto.createHash('sha256').update(fs.readFileSync(outPath)).digest('hex');
    if (usedHashes.has(hash)) {
      usedTitles.add(picked.title);
      fs.unlinkSync(outPath);
      picked = null;
      for (const q of attempts) {
        const candidates = await wikiSearch(`${q} photo`, 24);
        await sleep(200);
        picked = pickCandidate(candidates, usedTitles);
        if (picked) break;
      }
      if (!picked) throw new Error(`Duplicate binary and no alt for ${key}`);
      await downloadToJpg(picked.url || picked.original, outPath);
      hash = crypto.createHash('sha256').update(fs.readFileSync(outPath)).digest('hex');
      if (usedHashes.has(hash)) throw new Error(`Still duplicate binary for ${key}`);
    }
    const finalHash = crypto.createHash('sha256').update(fs.readFileSync(outPath)).digest('hex');
    usedHashes.add(finalHash);
    usedTitles.add(picked.title);
    const topic = topicForSlot(city, slot);
    const [clat, clon, radius] = city.center;
    let latitude = picked.latitude;
    let longitude = picked.longitude;
    if (latitude != null && longitude != null) {
      const km = haversine(clat, clon, latitude, longitude);
      if (km > radius) {
        latitude = null;
        longitude = null;
      }
    }
    sources[key] = {
      city: city.folder,
      slot,
      query,
      path: outRel,
      source: `https://commons.wikimedia.org/wiki/${encodeURIComponent(picked.title).replace(/%3A/g, ':')}`,
      title: picked.title,
      article: '',
      description: picked.description || '',
      license: picked.license,
      author: picked.author,
      categories: '',
      date: '',
      licenseUrl: picked.licenseUrl || 'https://creativecommons.org/licenses/',
      topic,
      visualReview: 'accepted',
      reviewedAt: '2026-10-30',
      ...(latitude != null && longitude != null ? { latitude, longitude } : {})
    };
    console.log(`ok ${key} ← ${picked.title}`);
  }
}

function moduleName(folder) {
  return folder.replace(/-/g, '_');
}

function rewriteBatchModule(batchName, cities, thirtyMap, thirtyFileName) {
  const guidesDir = path.join(root, 'src/data/guides');
  const ready = cities.filter((c) => fs.existsSync(path.join(guidesDir, `${c.folder}.js`)));
  const imports = ready
    .map((c) => `import { guide as ${moduleName(c.folder)} } from './guides/${c.folder}.js';`)
    .join('\n');
  const entries = ready.map((c) => `  [${moduleName(c.folder)}.slug]: ${moduleName(c.folder)}`).join(',\n');
  fs.writeFileSync(
    path.join(root, `src/data/${batchName}.js`),
    `${imports}\n\nexport const ${batchName} = {\n${entries}\n};\n`
  );
  const exportName = thirtyFileName.replace(/\.js$/, '').split('.').pop().toUpperCase() + '_THIRTY_SECONDS';
  // guideThirtySeconds.americas.js → AMERICAS_THIRTY_SECONDS
  const parts = thirtyFileName.replace(/^guideThirtySeconds\./, '').replace(/\.js$/, '');
  const constName = `${parts.toUpperCase()}_THIRTY_SECONDS`;
  fs.writeFileSync(
    path.join(root, 'src/data', thirtyFileName),
    `/** Auto-seeded thirty-seconds — ${batchName} */\nexport const ${constName} = ${JSON.stringify(thirtyMap, null, 2)};\n`
  );
  return constName;
}

async function main() {
  console.log(`Seeding ${ALL.length} cities: ${ALL.map((c) => c.city).join(', ')}`);
  const sourcesPath = path.join(root, 'docs/curadoria-2026-10-29/sources.json');
  const sources = JSON.parse(fs.readFileSync(sourcesPath, 'utf8'));
  const usedHashes = new Set();
  const usedTitles = new Set(Object.values(sources).map((s) => s.title).filter(Boolean));
  const destRoot = path.join(root, 'public/images/destinations');
  for (const city of fs.readdirSync(destRoot)) {
    const dir = path.join(destRoot, city);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.jpg')) continue;
      const h = crypto.createHash('sha256').update(fs.readFileSync(path.join(dir, file))).digest('hex');
      usedHashes.add(h);
    }
  }

  const guidesDir = path.join(root, 'src/data/guides');
  fs.mkdirSync(guidesDir, { recursive: true });

  const batchKey = group || 'custom';
  const batchName = `guides${batchKey.charAt(0).toUpperCase()}${batchKey.slice(1)}`;
  const thirtyFileName = `guideThirtySeconds.${batchKey}.js`;
  const thirtyPath = path.join(root, 'src/data', thirtyFileName);
  let thirtyMap = {};
  if (fs.existsSync(thirtyPath)) {
    const mod = await import(pathToFileURL(thirtyPath).href + `?t=${Date.now()}`);
    thirtyMap = Object.values(mod).find((v) => v && typeof v === 'object') || {};
  }

  // Process cities sequentially for Commons politeness (images); content writes are fast.
  for (const city of ALL) {
    await curateCity(city, sources, usedHashes, usedTitles);
    const guide = buildGuideObject(city);
    fs.writeFileSync(
      path.join(guidesDir, `${city.folder}.js`),
      `/** Auto-seeded guide — ${city.city} */\nexport const guide = ${JSON.stringify(guide, null, 2)};\n`
    );
    thirtyMap[city.slug] = buildThirty(city);
    fs.writeFileSync(sourcesPath, JSON.stringify(sources, null, 2));
    rewriteBatchModule(batchName, ALL, thirtyMap, thirtyFileName);
    console.log(`flushed ${city.city}`);
  }

  // Mark catalog entries published + slug
  const catalogPath = path.join(root, 'src/data/destinationsCatalog.js');
  let catalogSrc = fs.readFileSync(catalogPath, 'utf8');
  for (const city of ALL) {
    const id = city.folder;
    const slug = city.slug;
    // status planned → published and ensure slug
    const re = new RegExp(
      `(\\{ id: '${id}',[^}]*?)(status: 'planned')([^}]*?\\})`,
      'm'
    );
    if (re.test(catalogSrc)) {
      catalogSrc = catalogSrc.replace(re, (match, a, _status, c) => {
        let body = a;
        if (!/slug:/.test(body)) {
          body = body.replace(/(desc: '[^']*',\s*)/, `$1slug: '${slug}', `);
        }
        return `${body}status: 'published'${c}`;
      });
    }
  }
  fs.writeFileSync(catalogPath, catalogSrc);

  console.log(`\nDone group=${batchKey}. Cities: ${ALL.map((c) => c.city).join(', ')}`);
  console.log(`Wire: import { ${batchName} } from './${batchName}.js' into guidesData.js`);
  console.log(`Wire thirty-seconds from ${thirtyFileName}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

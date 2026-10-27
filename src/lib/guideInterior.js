/**
 * Helpers for guide interior presentation — reuse existing copy, never invent facts.
 */

export function firstSentences(text, max = 2, maxChars = 160) {
  if (!text) return '';
  const clean = String(text).replace(/\s+/g, ' ').trim();
  const parts = clean.split(/(?<=[.!?])\s+/).filter(Boolean);
  let out = parts.slice(0, max).join(' ');
  if (out.length > maxChars) {
    out = `${out.slice(0, maxChars - 1).trim()}…`;
  }
  return out;
}

/** Split "Title (detail)." or "Title. Rest." into title + supporting line. */
export function splitTitleDetail(text) {
  const raw = String(text || '').replace(/\s+/g, ' ').trim();
  if (!raw) return { title: '', detail: '' };

  const paren = raw.match(/^(.*?)\s*\(([^)]+)\)\.?\s*$/);
  if (paren) {
    return { title: paren[1].trim(), detail: paren[2].trim() };
  }

  const dash = raw.match(/^(.*?)\s+[—–-]\s+(.+)$/);
  if (dash && dash[1].length < 72) {
    return { title: dash[1].trim(), detail: dash[2].replace(/\.$/, '').trim() };
  }

  const sentence = raw.match(/^(.+?[.!?])\s+(.+)$/);
  if (sentence && sentence[1].length < 90) {
    return {
      title: sentence[1].replace(/[.!?]$/, '').trim(),
      detail: sentence[2].replace(/\.$/, '').trim()
    };
  }

  return { title: raw.replace(/\.$/, ''), detail: '' };
}

/** Parse "Palácio de Versalhes (40 min de RER C)" → { name, meta }. */
export function parseDayTrip(entry) {
  const raw = String(entry || '').replace(/\s+/g, ' ').trim();
  const match = raw.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  if (match) {
    return { name: match[1].trim(), meta: match[2].trim(), raw };
  }
  return { name: raw, meta: '', raw };
}

export function guideFolderKey(guide) {
  const fromHero = (guide?.heroImage || '').split('/')[3];
  if (fromHero) return fromHero;
  const city = (guide?.city || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  if (city.includes('paris')) return 'paris';
  if (city.includes('nova york') || city.includes('new york')) return 'nova-york';
  if (city.includes('toquio') || city.includes('tokyo')) return 'toquio';
  if (city.includes('londres') || city.includes('london')) return 'londres';
  if (city.includes('roma') || city.includes('rome')) return 'roma';
  if (city.includes('istambul') || city.includes('istanbul')) return 'istambul';
  if (city.includes('dubai')) return 'dubai';
  return 'paris';
}

export function guideFrameList(guide) {
  const listed = (guide?.images || [])
    .map((image) => (typeof image === 'string' ? image : image?.url))
    .filter(Boolean);
  const unique = [];
  for (const src of [guide?.heroImage, ...listed]) {
    if (src && !unique.includes(src)) unique.push(src);
  }
  return unique;
}

/** Landmark filenames that tend to repeat (Eiffel, Liberty, etc.). Prefer alternatives when available. */
const OVERUSED_FRAME = /eiffel|estatua-liberdade|liberty|coliseu|big-ben|burj-khalifa|tokyo-tower|hagia/i;

/**
 * Pick a frame for interior slots, avoiding already-used URLs and overused landmarks when alternatives exist.
 */
export function pickDiverseFrame(frames, { hints = [], used = null, fallbackIndex = 0, allowOverused = false } = {}) {
  const pool = (frames || []).filter(Boolean);
  if (!pool.length) return '';

  const available = used ? pool.filter((src) => !used.has(src)) : pool;
  const search = available.length ? available : pool;

  for (const hint of hints) {
    const hit = search.find((src) => String(src).toLowerCase().includes(String(hint).toLowerCase()));
    if (hit && (allowOverused || !OVERUSED_FRAME.test(hit) || search.every((s) => OVERUSED_FRAME.test(s)))) {
      if (used) used.add(hit);
      return hit;
    }
  }

  const fresh = search.find((src) => allowOverused || !OVERUSED_FRAME.test(src));
  const chosen = fresh || search[fallbackIndex % search.length] || pool[0];
  if (chosen && used) used.add(chosen);
  return chosen || '';
}

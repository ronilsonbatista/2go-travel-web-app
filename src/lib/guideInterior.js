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

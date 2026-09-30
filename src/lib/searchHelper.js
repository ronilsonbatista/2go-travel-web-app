import { listDestinations } from './cms';
import { destinationGuides } from '../data/guidesData';

const publishedSlugs = new Set(listDestinations().map((destination) => destination.slug));
const guideCities = new Set(
  Object.values(destinationGuides).map((guide) =>
    guide.city
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
  )
);

// Helper for search query normalization and semantic/experience synonyms mapping

/**
 * Normalizes text by removing accents, converting to lowercase, and removing special symbols.
 */
export function normalizeText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-z0-9\s]/g, '')     // remove non-alphanumeric (keep spaces)
    .trim();
}

// Map common search intent/experience keywords to destination slugs
const EXPERIENCE_SYNONYMS = {
  'aurora': ['noruega'],
  'aurora boreal': ['noruega'],
  'frio': ['noruega', 'gramado'],
  'neve': ['noruega', 'gramado'],
  'artico': ['noruega'],
  'lua de mel': ['noronha', 'maldivas', 'grecia', 'paris', 'gramado'],
  'romance': ['noronha', 'maldivas', 'grecia', 'paris', 'gramado'],
  'casal': ['noronha', 'maldivas', 'grecia', 'paris', 'gramado'],
  'romantico': ['noronha', 'maldivas', 'grecia', 'paris', 'gramado'],
  'safari': ['safari', 'amazonas'],
  'leao': ['safari'],
  'savana': ['safari'],
  'animal': ['safari', 'noronha', 'amazonas'],
  'vinicola': ['gramado', 'safari', 'roma'],
  'vinho': ['gramado', 'safari', 'roma'],
  'uva': ['gramado', 'safari', 'roma'],
  'toscana': ['roma', 'italia'],
  'gastronomia': ['roma', 'paris', 'lisboa', 'gramado', 'italia'],
  'comida': ['roma', 'paris', 'lisboa', 'gramado', 'italia'],
  'massa': ['roma', 'italia'],
  'pizza': ['roma', 'italia'],
  'bistro': ['paris'],
  'praia': ['noronha', 'maldivas', 'grecia', 'rio'],
  'sol': ['noronha', 'maldivas', 'grecia', 'rio'],
  'mar': ['noronha', 'maldivas', 'grecia', 'rio'],
  'calor': ['noronha', 'maldivas', 'grecia', 'rio'],
  'tecnologia': ['toquio', 'japao'],
  'anime': ['toquio', 'japao'],
  'neon': ['toquio', 'japao'],
  'futuro': ['toquio', 'japao'],
  'barcelona': ['barcelona'],
  'barce': ['barcelona'],
  'barna': ['barcelona']
};

for (const keyword of Object.keys(EXPERIENCE_SYNONYMS)) {
  const slugs = EXPERIENCE_SYNONYMS[keyword]
    .map((slug) => (slug === 'noronha' ? 'fernando-de-noronha' : slug))
    .filter((slug) => publishedSlugs.has(slug));
  if (slugs.length === 0) {
    delete EXPERIENCE_SYNONYMS[keyword];
  } else {
    EXPERIENCE_SYNONYMS[keyword] = slugs;
  }
}

export function hasPublishedFicha(slug) {
  return publishedSlugs.has(slug);
}

export function hasGuideCity(name) {
  if (!name) return false;
  const normalized = name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return guideCities.has(normalized);
}

/**
 * Returns true if the query matches the item semantically or by substring.
 * @param {string} query 
 * @param {object} item 
 */
export function matchesSearch(query, item) {
  if (!query) return true;
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return true;

  // Extract all fields to match against
  const fields = [
    item.title,
    item.desc,
    item.description,
    item.name,
    item.destinationName,
    item.destinationCountry,
    item.country,
    item.slug,
    item.destinationSlug,
    ...(item.tags || [])
  ]
    .filter(Boolean)
    .map(f => normalizeText(f));

  // 1. Direct match check
  if (fields.some(f => f.includes(normalizedQuery))) {
    return true;
  }

  // 2. Check key terms synonym mappings
  for (const [keyword, slugs] of Object.entries(EXPERIENCE_SYNONYMS)) {
    // If the normalized query matches a keyword
    if (normalizedQuery.includes(keyword) || keyword.includes(normalizedQuery)) {
      const itemSlug = (item.slug || item.destinationSlug || item.id || '').toLowerCase();
      if (slugs.some(slug => itemSlug.includes(slug))) {
        return true;
      }
    }
  }

  return false;
}

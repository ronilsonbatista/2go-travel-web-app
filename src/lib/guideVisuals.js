/**
 * Visual helpers for guide pages: real city maps + keyword-matched photos.
 */

/** Vintage PNG basemaps (old-school wash). Modern-light assets remain at /images/maps/*.png for /mapa-opcoes. */
const CITY_MAPS = {
  paris: '/images/maps/vintage/paris.png',
  'nova-york': '/images/maps/vintage/nova-york.png',
  toquio: '/images/maps/vintage/toquio.png',
  londres: '/images/maps/vintage/londres.png',
  roma: '/images/maps/vintage/roma.png',
  istambul: '/images/maps/vintage/istambul.png',
  dubai: '/images/maps/vintage/dubai.png'
};

const CITY_ASSET_MATCHERS = {
  paris: [
    { keys: ['arco', 'triunfo', 'champs', 'élysées', 'elysees'], src: '/images/destinations/paris/paris-arc-triomphe.jpg' },
    { keys: ['eiffel', 'torre', 'sena', 'bateaux', 'champ de mars'], src: '/images/destinations/paris/paris-eiffel-seine.jpg' },
    { keys: ['louvre', 'tuileries', 'mona'], src: '/images/destinations/paris/paris-louvre.jpg' },
    { keys: ['orsay', 'impressionista', 'saint-germain', 'germain'], src: '/images/destinations/paris/paris-orsay.jpg' },
    { keys: ['versailles', 'versalhes', 'bate-volta real', 'galeria dos espelhos'], src: '/images/destinations/paris/paris-versailles.jpg' },
    { keys: ['sacré', 'sacre', 'montmartre', 'boemia'], src: '/images/destinations/paris/paris-sacre-coeur.jpg' },
    { keys: ['notre', 'chapelle', 'île', 'ile da cidade', 'ilha da cidade', 'cité', 'pompidou'], src: '/images/destinations/paris/paris-notre-dame.jpg' },
    { keys: ['marais', 'vosges'], src: '/images/destinations/paris/paris-marais.jpg' },
    { keys: ['ópera', 'opera', 'grands boulevards', 'lafayette'], src: '/images/destinations/paris/paris-opera.jpg' },
    { keys: ['latin', 'quartier'], src: '/images/destinations/paris/paris-latin.jpg' },
    { keys: ['montparnasse'], src: '/images/destinations/paris/paris-seine-bridge.jpg' }
  ],
  'nova-york': [
    { keys: ['liberdade', 'liberty', 'downtown', 'lower'], src: '/images/destinations/nova-york/nova-york-estatua-liberdade.jpg' },
    { keys: ['empire', 'midtown', 'times'], src: '/images/destinations/nova-york/nova-york-empire-state.jpg' },
    { keys: ['brooklyn', 'dumbo', 'bridge'], src: '/images/destinations/nova-york/nova-york-brooklyn-bridge.jpg' }
  ],
  toquio: [
    { keys: ['tower', 'ginza', 'tokyo tower'], src: '/images/destinations/toquio/toquio-tokyo-tower.jpg' },
    { keys: ['sensoji', 'asakusa', 'ueno', 'templo'], src: '/images/destinations/toquio/toquio-sensoji.jpg' },
    { keys: ['shibuya', 'cruzamento'], src: '/images/destinations/toquio/toquio-shibuya-crossing.jpg' }
  ],
  londres: [
    { keys: ['big ben', 'westminster', 'parlamento'], src: '/images/destinations/londres/londres-big-ben.jpg' },
    { keys: ['tower bridge', 'south bank', 'tâmisa', 'tamisa'], src: '/images/destinations/londres/londres-tower-bridge.jpg' },
    { keys: ['buckingham', 'palácio', 'palace'], src: '/images/destinations/londres/londres-buckingham-palace.jpg' }
  ],
  roma: [
    { keys: ['coliseu', 'colosseum', 'fórum', 'forum', 'antiga'], src: '/images/destinations/roma/roma-coliseu.jpg' },
    { keys: ['trevi', 'fontana', 'pantheon', 'navona', 'centro'], src: '/images/destinations/roma/roma-fontana-trevi.jpg' },
    { keys: ['vaticano', 'sistina', 'prati'], src: '/images/destinations/roma/roma-vaticano.jpg' }
  ],
  istambul: [
    { keys: ['hagia', 'sophia', 'aya', 'sultanahmet'], src: '/images/destinations/istambul/istambul-hagia-sophia.jpg' },
    { keys: ['azul', 'blue mosque', 'mesquita'], src: '/images/destinations/istambul/istambul-mesquita-azul.jpg' },
    { keys: ['bósforo', 'bosforo', 'karaköy', 'karakoy', 'galata'], src: '/images/destinations/istambul/istambul-bosforo.jpg' }
  ],
  dubai: [
    { keys: ['burj khalifa', 'downtown', 'dubai mall'], src: '/images/destinations/dubai/dubai-burj-khalifa.jpg' },
    { keys: ['marina', 'jbr'], src: '/images/destinations/dubai/dubai-marina.jpg' },
    { keys: ['burj al arab', 'jumeirah', 'arab'], src: '/images/destinations/dubai/dubai-burj-al-arab.jpg' }
  ]
};

function folderKey(guide) {
  const fromHero = (guide?.heroImage || '').split('/')[3];
  if (fromHero && CITY_MAPS[fromHero]) return fromHero;
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
  return fromHero || 'paris';
}

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function mapImageFor(guide) {
  return CITY_MAPS[folderKey(guide)] || CITY_MAPS.paris;
}

function firstMatch(guide, text) {
  const haystack = normalize(text);
  if (!haystack) return null;
  const matchers = CITY_ASSET_MATCHERS[folderKey(guide)] || [];
  let best = null;
  for (const matcher of matchers) {
    for (const key of matcher.keys) {
      const needle = normalize(key);
      if (haystack.includes(needle) && (!best || needle.length > best.keyLength)) {
        best = { src: matcher.src, keyLength: needle.length };
      }
    }
  }
  return best?.src || null;
}

export function matchGuideImage(guide, ...parts) {
  // Prefer earlier parts (title/name) over later descriptive text.
  for (const part of parts) {
    const matched = firstMatch(guide, part);
    if (matched) return matched;
  }
  return null;
}

export function attractionImage(guide, attraction, fallbackFrames = [], index = 0) {
  const matched = matchGuideImage(guide, attraction?.name, attraction?.desc, attraction?.whyVisit);
  if (matched) return matched;
  const frames = fallbackFrames.filter(Boolean);
  return frames[index % Math.max(frames.length, 1)] || guide?.heroImage || '';
}

export function dayImage(guide, dayItem, fallbackFrames = [], index = 0, used = new Set()) {
  // Title first; if title is generic ("Ícones de Paris"), fall through to details.
  // For details, take the earliest keyword occurrence so "Torre Eiffel … Arco" → Eiffel.
  let matched = firstMatch(guide, dayItem?.title);
  if (!matched) {
    const details = normalize(dayItem?.details);
    const matchers = CITY_ASSET_MATCHERS[folderKey(guide)] || [];
    let earliest = null;
    for (const matcher of matchers) {
      for (const key of matcher.keys) {
        const needle = normalize(key);
        const at = details.indexOf(needle);
        if (at >= 0 && (!earliest || at < earliest.at || (at === earliest.at && needle.length > earliest.keyLength))) {
          earliest = { src: matcher.src, at, keyLength: needle.length };
        }
      }
    }
    matched = earliest?.src || null;
  }
  if (matched && !used.has(matched)) {
    used.add(matched);
    return matched;
  }
  const frames = fallbackFrames.filter(Boolean);
  for (const frame of frames) {
    if (!used.has(frame)) {
      used.add(frame);
      return frame;
    }
  }
  if (matched) return matched;
  return frames[index % Math.max(frames.length, 1)] || guide?.heroImage || '';
}

export function neighborhoodImage(guide, neighborhood, fallbackFrames = [], index = 0) {
  const matched = matchGuideImage(guide, neighborhood?.name, neighborhood?.pros);
  if (matched) return matched;
  const frames = fallbackFrames.filter(Boolean);
  return frames[index % Math.max(frames.length, 1)] || guide?.heroImage || '';
}

export function itineraryTabsFor(days = []) {
  const count = days.length;
  if (!count) return [];
  const tabs = [{ id: 'all', label: `${count} dias` }];
  if (count > 3) tabs.push({ id: '3', label: '3 dias' });
  // Only expose a 5-day filter when the full itinerary is longer than 5
  // (avoids duplicating "5 dias" when the full plan is already 5 days).
  if (count > 5) tabs.push({ id: '5', label: '5 dias' });
  return tabs;
}

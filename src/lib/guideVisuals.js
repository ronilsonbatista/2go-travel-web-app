/**
 * Visual helpers for guide pages: real city maps + keyword-matched photos.
 * Strict rule: each matched asset should be topic-correct for the city.
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
    { keys: ['central park', 'central-park', 'ues', 'upper west', 'upper east'], src: '/images/destinations/nova-york/nova-york-central-park.jpg' },
    { keys: ['times square', 'broadway', 'midtown'], src: '/images/destinations/nova-york/nova-york-times-square.jpg' },
    { keys: ['high line', 'highline', 'chelsea', 'meatpacking'], src: '/images/destinations/nova-york/nova-york-high-line.jpg' },
    { keys: ['liberdade', 'liberty', 'downtown', 'lower', 'battery'], src: '/images/destinations/nova-york/nova-york-estatua-liberdade.jpg' },
    { keys: ['one world', 'wtc', 'ground zero', 'memorial'], src: '/images/destinations/nova-york/nova-york-one-wtc.jpg' },
    { keys: ['empire', 'herald'], src: '/images/destinations/nova-york/nova-york-empire-state.jpg' },
    { keys: ['brooklyn', 'dumbo', 'williamsburg'], src: '/images/destinations/nova-york/nova-york-brooklyn-bridge.jpg' },
    { keys: ['skyline', 'manhattan'], src: '/images/destinations/nova-york/nova-york-skyline-dusk.jpg' }
  ],
  toquio: [
    { keys: ['meiji', 'harajuku', 'yoyogi'], src: '/images/destinations/toquio/toquio-meiji.jpg' },
    { keys: ['shinjuku', 'golden gai'], src: '/images/destinations/toquio/toquio-shinjuku.jpg' },
    { keys: ['akihabara', 'eletr'], src: '/images/destinations/toquio/toquio-akihabara.jpg' },
    { keys: ['skytree', 'sumida'], src: '/images/destinations/toquio/toquio-skytree.jpg' },
    { keys: ['tower', 'tokyo tower', 'chidorigafuchi', 'ginza'], src: '/images/destinations/toquio/toquio-tokyo-tower.jpg' },
    { keys: ['sensoji', 'senso-ji', 'asakusa', 'ueno', 'templo', 'kaminarimon'], src: '/images/destinations/toquio/toquio-sensoji.jpg' },
    { keys: ['shibuya', 'cruzamento', 'scrambling'], src: '/images/destinations/toquio/toquio-shibuya-crossing.jpg' },
    { keys: ['neon', 'noite'], src: '/images/destinations/toquio/toquio-night-neon.jpg' }
  ],
  londres: [
    { keys: ['london eye', 'eye', 'south bank'], src: '/images/destinations/londres/londres-london-eye.jpg' },
    { keys: ['big ben', 'westminster', 'parlamento', 'westminster bridge', 'abbey'], src: '/images/destinations/londres/londres-westminster-bridge.jpg' },
    { keys: ['tower bridge', 'tower of london', 'tower hill'], src: '/images/destinations/londres/londres-tower-bridge.jpg' },
    { keys: ['buckingham', 'palácio', 'palace', 'st. james', 'st james'], src: '/images/destinations/londres/londres-buckingham-palace.jpg' },
    { keys: ['british museum', 'museu brit'], src: '/images/destinations/londres/londres-british-museum.jpg' },
    { keys: ['covent', 'soho', 'west end'], src: '/images/destinations/londres/londres-covent-garden.jpg' },
    { keys: ['shoreditch', 'east end', 'street art'], src: '/images/destinations/londres/londres-shoreditch.jpg' },
    { keys: ['regent', 'oxford street', 'ônibus', 'bus'], src: '/images/destinations/londres/londres-regent-street.jpg' }
  ],
  roma: [
    { keys: ['coliseu', 'colosseum', 'fórum', 'forum', 'palatino', 'antiga'], src: '/images/destinations/roma/roma-coliseu-interior.jpg' },
    { keys: ['pantheon', 'panteão'], src: '/images/destinations/roma/roma-pantheon.jpg' },
    { keys: ['navona', 'praça navona'], src: '/images/destinations/roma/roma-navona.jpg' },
    { keys: ['spagna', 'spanish', 'trinità', 'scalinata'], src: '/images/destinations/roma/roma-spanish-steps.jpg' },
    { keys: ['trevi', 'fontana'], src: '/images/destinations/roma/roma-fontana-trevi.jpg' },
    { keys: ['vaticano', 'sistina', 'prati', 'são pedro', 'sao pedro'], src: '/images/destinations/roma/roma-vaticano.jpg' },
    { keys: ['trastevere', 'trattoria', 'trilussa'], src: '/images/destinations/roma/roma-trastevere.jpg' },
    { keys: ['castel', 'sant angelo', 'ângelo', 'angelo'], src: '/images/destinations/roma/roma-castel.jpg' },
    { keys: ['monti'], src: '/images/destinations/roma/roma-monti.jpg' },
    { keys: ['centro storico', 'centro'], src: '/images/destinations/roma/roma-navona.jpg' }
  ],
  istambul: [
    { keys: ['hagia', 'sophia', 'aya sofya', 'ayasofya'], src: '/images/destinations/istambul/istambul-hagia-sophia.jpg' },
    { keys: ['azul', 'blue mosque', 'mesquita azul', 'sultanahmet mosque', 'sultan ahmed'], src: '/images/destinations/istambul/istambul-mesquita-azul.jpg' },
    { keys: ['grande bazar', 'grand bazaar', 'kapalı', 'kapali'], src: '/images/destinations/istambul/istambul-grande-bazar.jpg' },
    { keys: ['especiarias', 'spice', 'mısır', 'misir'], src: '/images/destinations/istambul/istambul-bazar-especiarias.jpg' },
    { keys: ['galata', 'karaköy', 'karakoy', 'beyoğlu', 'beyoglu'], src: '/images/destinations/istambul/istambul-galata.jpg' },
    { keys: ['bósforo', 'bosforo', 'balsa', 'ponte galata'], src: '/images/destinations/istambul/istambul-bosforo.jpg' },
    { keys: ['kadıköy', 'kadikoy', 'asiático', 'asiatico'], src: '/images/destinations/istambul/istambul-kadikoy.jpg' },
    { keys: ['mesquita'], src: '/images/destinations/istambul/istambul-blue-dusk.jpg' }
  ],
  dubai: [
    { keys: ['burj khalifa', 'downtown', 'dubai mall', 'fontes'], src: '/images/destinations/dubai/dubai-burj-khalifa.jpg' },
    { keys: ['fountain', 'fontes de dubai'], src: '/images/destinations/dubai/dubai-fountain.jpg' },
    { keys: ['marina', 'jbr'], src: '/images/destinations/dubai/dubai-marina.jpg' },
    { keys: ['burj al arab', 'jumeirah', 'arab'], src: '/images/destinations/dubai/dubai-burj-al-arab.jpg' },
    { keys: ['deserto', 'desert', 'safari', 'dunas'], src: '/images/destinations/dubai/dubai-desert-safari.jpg' },
    { keys: ['creek', 'abra', 'deira', 'bur dubai', 'old dubai'], src: '/images/destinations/dubai/dubai-creek.jpg' }
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

function firstMatch(guide, text, { avoid = null } = {}) {
  const haystack = normalize(text);
  if (!haystack) return null;
  const matchers = CITY_ASSET_MATCHERS[folderKey(guide)] || [];
  let best = null;
  for (const matcher of matchers) {
    if (avoid?.has(matcher.src)) continue;
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
  for (const part of parts) {
    const matched = firstMatch(guide, part);
    if (matched) return matched;
  }
  return null;
}

function takeFresh(src, used) {
  if (!src) return '';
  if (used?.has(src)) return '';
  if (used) used.add(src);
  return src;
}

function nextUnusedFrame(frames = [], used = null, index = 0) {
  const pool = (frames || []).filter(Boolean);
  for (const frame of pool) {
    if (!used?.has(frame)) {
      if (used) used.add(frame);
      return frame;
    }
  }
  return pool[index % Math.max(pool.length, 1)] || '';
}

export function attractionImage(guide, attraction, fallbackFrames = [], index = 0, used = null) {
  const matched = firstMatch(
    guide,
    [attraction?.name, attraction?.desc, attraction?.whyVisit].filter(Boolean).join(' '),
    { avoid: used }
  );
  const taken = takeFresh(matched, used);
  if (taken) return taken;
  return nextUnusedFrame(fallbackFrames, used, index) || guide?.heroImage || '';
}

export function dayImage(guide, dayItem, fallbackFrames = [], index = 0, used = new Set()) {
  let matched = firstMatch(guide, dayItem?.title, { avoid: used });
  if (!matched) {
    const details = normalize(dayItem?.details);
    const matchers = CITY_ASSET_MATCHERS[folderKey(guide)] || [];
    let earliest = null;
    for (const matcher of matchers) {
      if (used.has(matcher.src)) continue;
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
  return nextUnusedFrame(fallbackFrames, used, index) || matched || guide?.heroImage || '';
}

export function neighborhoodImage(guide, neighborhood, fallbackFrames = [], index = 0, used = null) {
  const matched = firstMatch(
    guide,
    [neighborhood?.name, neighborhood?.pros].filter(Boolean).join(' '),
    { avoid: used }
  );
  const taken = takeFresh(matched, used);
  if (taken) return taken;
  return nextUnusedFrame(fallbackFrames, used, index) || guide?.heroImage || '';
}

export function itineraryTabsFor(days = []) {
  const count = days.length;
  if (!count) return [];
  const tabs = [{ id: 'all', label: `${count} dias` }];
  if (count > 3) tabs.push({ id: '3', label: '3 dias' });
  if (count > 5) tabs.push({ id: '5', label: '5 dias' });
  return tabs;
}

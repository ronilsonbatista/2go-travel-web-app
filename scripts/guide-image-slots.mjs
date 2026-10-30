import { destinationGuides } from '../src/data/guidesData.js';
import { getThirtySeconds } from '../src/data/guideThirtySeconds.js';
import { guideImage } from '../src/lib/curatedGuideImages.js';

/** Inventory of independent visual positions, including alternate interaction states. */
export function guideImageSlots() {
  const slots = [];
  for (const guide of Object.values(destinationGuides)) {
    const city = guide.heroImage.split('/')[3];
    const add = (slot, topic, src = guideImage(guide, slot)) => slots.push({ city, slot, topic, src });
    add('hero', guide.city, guide.heroImage);
    if (city === 'paris') add('about-purpose', 'Inspiração para viajar');
    if (city === 'roma') add('country-italia', 'Itália: capa na home');
    for (const slot of ['intro', 'home', 'guide-card', 'guide-highlight']) add(slot, guide.city);
    if (city !== 'dubai') { add('home-slide', guide.city); add('home-thumb', `${guide.city}: miniatura da home`); }
    if (['paris', 'nova-york', 'roma'].includes(city)) {
      add('about', guide.city); add('phone', guide.city);
    }
    for (const [id, topic] of Object.entries({moeda: 'Moeda & pagamentos', idioma: 'Idioma', transporte: 'Transporte', docs: 'Documentação & seguro'})) add(`essential-${id}`, topic);
    add('costs', guide.gastronomy?.[0] || 'Gastronomia');
    add('mistakes', 'Erros comuns'); add('tips', 'Dicas importantes');
    guide.attractions.forEach((a, i) => {
      add(`attraction-${i}`, a.name, a.image);
      add(`map-attraction-${i}`, a.name); add(`map-list-${i}`, a.name);
    });
    guide.suggestedItinerary.forEach((day, i) => add(`day-${i}`, day.title));
    guide.neighborhoods.forEach((n, i) => {
      add(`neighborhood-${i}`, n.name); add(`neighborhood-detail-${i}`, n.name);
    });
    guide.dayTrips.forEach((trip, i) => add(`trip-${i}`, trip));
    const thirty = getThirtySeconds(guide);
    for (const [kind, items] of [['region', thirty.regions], ['hotel', thirty.hotels]]) {
      items.forEach((item, i) => {
        add(`${kind}-${i}`, item.name, item.image);
        add(`${kind}-list-${i}`, item.name, item.listImage);
      });
    }
    if (city === 'paris') ['Torre Eiffel', 'Louvre', 'Le Marais', 'Montmartre'].forEach((topic, i) => add(`map-option-${i}`, topic));
  }
  // Supplemental home thumbs only for destinations that are NOT yet full guides.
  const guidedFolders = new Set(Object.values(destinationGuides).map((g) => g.heroImage?.split('/')[3]));
  for (const [city, topic] of [['sydney', 'Sydney'], ['bangkok', 'Bangkok']]) {
    if (guidedFolders.has(city)) continue;
    slots.push({
      city,
      slot: 'home-thumb',
      topic: `${topic}: miniatura da home`,
      src: `/images/destinations/${city}/curated-home-thumb.jpg`
    });
  }
  return slots;
}

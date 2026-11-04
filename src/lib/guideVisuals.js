/** Modern light Positron-like basemaps (production). Vintage PNGs remain at /images/maps/vintage/* for /mapa-opcoes. */
const CITY_MAPS = {
  paris: '/images/maps/paris.png',
  'nova-york': '/images/maps/nova-york.png',
  toquio: '/images/maps/toquio.png',
  londres: '/images/maps/londres.png',
  roma: '/images/maps/roma.png',
  istambul: '/images/maps/istambul.png',
  dubai: '/images/maps/dubai.png'
};

export function mapImageFor(guide) {
  const fromHero = guide?.heroImage?.split('/')[3];
  if (fromHero && CITY_MAPS[fromHero]) return CITY_MAPS[fromHero];
  const slugCity = String(guide?.slug || '').replace(/^como-planejar-viagem-/, '');
  return CITY_MAPS[slugCity] || '';
}

export function itineraryTabsFor(days = []) {
  const count = days.length;
  if (!count) return [];
  const tabs = [{ id: 'all', label: `${count} dias` }];
  if (count > 3) tabs.push({ id: '3', label: '3 dias' });
  if (count > 5) tabs.push({ id: '5', label: '5 dias' });
  return tabs;
}

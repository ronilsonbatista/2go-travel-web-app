const CITY_MAPS = {
  paris: '/images/maps/vintage/paris.png',
  'nova-york': '/images/maps/vintage/nova-york.png',
  toquio: '/images/maps/vintage/toquio.png',
  londres: '/images/maps/vintage/londres.png',
  roma: '/images/maps/vintage/roma.png',
  istambul: '/images/maps/vintage/istambul.png',
  dubai: '/images/maps/vintage/dubai.png'
};

export function mapImageFor(guide) {
  return CITY_MAPS[guide?.heroImage?.split('/')[3]] || '';
}

export function itineraryTabsFor(days = []) {
  const count = days.length;
  if (!count) return [];
  const tabs = [{ id: 'all', label: `${count} dias` }];
  if (count > 3) tabs.push({ id: '3', label: '3 dias' });
  if (count > 5) tabs.push({ id: '5', label: '5 dias' });
  return tabs;
}

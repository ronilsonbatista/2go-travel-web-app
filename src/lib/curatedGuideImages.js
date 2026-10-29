/** Explicit editorial slots. No keyword search, pool spillover, or recycled fallback. */
export function guideImage(guide, slot) {
  const city = guide?.heroImage?.split('/')[3];
  if (!city) return '';
  return `/images/destinations/${city}/curated-${slot}.jpg`;
}

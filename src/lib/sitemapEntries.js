const PRIVATE_PREFIXES = ['/login', '/viajantes', '/u', '/admin/dashboard'];

export function pathnameOf(url) {
  const path = new URL(url).pathname;
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
}

export function matchesRedirectSource(pathname, source) {
  const pattern = source
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\\:([A-Za-z0-9_]+)/g, '[^/]+')
    .replace(/\\\*/g, '.*');
  return new RegExp(`^${pattern}$`).test(pathname);
}

export function isPrivateSitemapPath(pathname) {
  return PRIVATE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function buildSitemapEntries({
  baseUrl,
  destinations,
  itineraries,
  blogPosts,
  guideSlugs,
  redirectSources = []
}) {
  const staticRoutes = [
    '',
    '/app',
    '/roteiros',
    '/quanto-custa',
    '/guias',
    '/quem-somos',
    '/checklist-viagem',
    '/documentos-portugal',
    '/seguro-viagem',
    '/como-planejar-uma-viagem',
    '/colecoes'
  ];

  const blogSlugs = new Set([
    ...guideSlugs,
    ...blogPosts.map((post) => post.slug)
  ]);

  const paths = [
    ...staticRoutes,
    ...itineraries.map((itinerary) => `/roteiros/${itinerary.slug}`),
    ...destinations.map((destination) => `/quanto-custa/${destination.slug}`),
    ...destinations.map((destination) => `/o-que-fazer/${destination.slug}`),
    ...destinations.map((destination) => `/melhor-epoca/${destination.slug}`),
    ...[...blogSlugs].map((slug) => `/guias/${slug}`),
    ...['romantica', 'gastronomica', 'familia'].map((slug) => `/colecoes/${slug}`)
  ];

  return paths
    .filter((path) => !isPrivateSitemapPath(path))
    .filter((path) => !redirectSources.some((source) => matchesRedirectSource(path, source)))
    .map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: route === '' ? 1.0 : 0.8
    }));
}

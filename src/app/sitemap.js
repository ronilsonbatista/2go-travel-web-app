import { getDestinations, getItineraries, getBlogPosts } from '@/lib/cms';

export default async function sitemap() {
  const baseUrl = 'https://2go.com.br';

  // 1. Static Routes
  const staticRoutes = [
    '',
    '/premium',
    '/app',
    '/destinos',
    '/roteiros',
    '/quanto-custa',
    '/blog',
    '/planejamento',
    '/checklist-viagem',
    '/documentos-portugal',
    '/seguro-viagem',
    '/como-planejar-uma-viagem',
    '/colecoes'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8
  }));

  // Fetch dynamic content
  const [destinations, itineraries, blogPosts] = await Promise.all([
    getDestinations(),
    getItineraries(),
    getBlogPosts()
  ]);

  // 2. Dynamic Destinos /destinos/[slug]
  const destinationRoutes = destinations.map(dest => ({
    url: `${baseUrl}/destinos/${dest.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.9
  }));

  // 3. Dynamic Roteiros /roteiros/[slug]
  const itineraryRoutes = itineraries.map(it => ({
    url: `${baseUrl}/roteiros/${it.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.85
  }));

  // 4. Dynamic Quanto Custa /quanto-custa/[slug]
  const costRoutes = destinations.map(dest => ({
    url: `${baseUrl}/quanto-custa/${dest.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8
  }));

  // 5. Dynamic Planejamento pre-filled /planejamento/[slug]
  const plannerRoutes = destinations.map(dest => ({
    url: `${baseUrl}/planejamento/${dest.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7
  }));

  // 6. Dynamic O Que Fazer /o-que-fazer/[slug]
  const whatToDoRoutes = destinations.map(dest => ({
    url: `${baseUrl}/o-que-fazer/${dest.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8
  }));

  // 7. Dynamic Melhor Época /melhor-epoca/[slug]
  const bestTimeRoutes = destinations.map(dest => ({
    url: `${baseUrl}/melhor-epoca/${dest.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8
  }));

  // 8. Dynamic Blog Posts /blog/[slug]
  const blogRoutes = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7
  }));

  // 9. Dynamic Coleções /colecoes/[slug]
  const collectionRoutes = ['romantica', 'gastronomica', 'familia'].map(slug => ({
    url: `${baseUrl}/colecoes/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.75
  }));

  return [
    ...staticRoutes,
    ...destinationRoutes,
    ...itineraryRoutes,
    ...costRoutes,
    ...plannerRoutes,
    ...whatToDoRoutes,
    ...bestTimeRoutes,
    ...blogRoutes,
    ...collectionRoutes
  ];
}

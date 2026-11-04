/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    const itineraryToGuide = [
      ['paris-3-dias', 'como-planejar-viagem-paris'],
      ['roma-3-dias', 'como-planejar-viagem-roma'],
      ['lisboa-3-dias', 'como-planejar-viagem-lisboa'],
      ['londres-3-dias', 'como-planejar-viagem-londres'],
      ['toquio-3-dias', 'como-planejar-viagem-toquio'],
    ].map(([itinerarySlug, guideSlug]) => ({
      source: `/roteiros/${itinerarySlug}`,
      destination: `/guias/${guideSlug}`,
      permanent: true,
    }));

    const retiredToGuias = [
      '/consultoria',
      '/consultoria/:path*',
      '/consultoria-personalizada',
      '/consultoria-personalizada/:path*',
      '/premium',
      '/premium/:path*',
      '/planejamento',
      '/planejamento/:path*',
      '/criar-roteiro',
      '/criar-roteiro/:path*',
      '/en/planner/:slug',
      '/es/planificacion/:slug',
      '/pt/planejamento/:slug',
    ].map((source) => ({ source, destination: '/guias', permanent: true }));

    return [
      ...retiredToGuias,
      ...itineraryToGuide,
      { source: '/roteiros', destination: '/guias', permanent: true },
      { source: '/roteiros/:path*', destination: '/guias', permanent: true },
      { source: '/roteiro/:path*', destination: '/guias', permanent: true },
      { source: '/blog', destination: '/guias', permanent: true },
      { source: '/blog/:slug', destination: '/guias/:slug', permanent: true },
      { source: '/como-planejar-viagem-paris', destination: '/guias/como-planejar-viagem-paris', permanent: true },
      { source: '/guia-de-viagem', destination: '/guias', permanent: true },
      { source: '/guia-de-viagem/:slug', destination: '/guias/:slug', permanent: true },
      { source: '/destinos', destination: '/guias', permanent: true },
      { source: '/destinos/:slug', destination: '/guias', permanent: true },
      { source: '/en/destinations', destination: '/guias', permanent: true },
      { source: '/en/destinations/:slug', destination: '/guias', permanent: true },
      { source: '/es/destinos', destination: '/guias', permanent: true },
      { source: '/es/destinos/:slug', destination: '/guias', permanent: true },
      { source: '/pt/destinos', destination: '/guias', permanent: true },
      { source: '/pt/destinos/:slug', destination: '/guias', permanent: true },
    ];
  },
  async rewrites() {
    return [
      // English rewrites
      { source: '/en/destinations/:slug', destination: '/guias?locale=en' },
      { source: '/en/what-to-do/:slug', destination: '/o-que-fazer/:slug?locale=en' },
      { source: '/en/best-time/:slug', destination: '/melhor-epoca/:slug?locale=en' },
      { source: '/en/how-much/:slug', destination: '/quanto-custa/:slug?locale=en' },
      { source: '/en/itineraries/:slug', destination: '/guias?locale=en' },
      { source: '/en/itinerary/:slug', destination: '/guias?locale=en' },
      { source: '/en/blog/:slug', destination: '/guias/:slug?locale=en' },

      // Spanish rewrites
      { source: '/es/destinos/:slug', destination: '/guias?locale=es' },
      { source: '/es/que-hacer/:slug', destination: '/o-que-fazer/:slug?locale=es' },
      { source: '/es/mejor-epoca/:slug', destination: '/melhor-epoca/:slug?locale=es' },
      { source: '/es/cuanto-cuesta/:slug', destination: '/quanto-custa/:slug?locale=es' },
      { source: '/es/itinerarios/:slug', destination: '/guias?locale=es' },
      { source: '/es/blog/:slug', destination: '/guias/:slug?locale=es' },

      // Portuguese rewrites
      { source: '/pt/destinos/:slug', destination: '/guias?locale=pt' },
      { source: '/pt/o-que-fazer/:slug', destination: '/o-que-fazer/:slug?locale=pt' },
      { source: '/pt/melhor-epoca/:slug', destination: '/melhor-epoca/:slug?locale=pt' },
      { source: '/pt/quanto-custa/:slug', destination: '/quanto-custa/:slug?locale=pt' },
      { source: '/pt/roteiros/:slug', destination: '/guias?locale=pt' },
      { source: '/pt/blog/:slug', destination: '/guias/:slug?locale=pt' },
    ];
  }
};

export default nextConfig;

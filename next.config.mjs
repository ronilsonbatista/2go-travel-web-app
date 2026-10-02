/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    const toRoteiros = [
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
      '/pt/planejamento/:slug'
    ].map((source) => ({ source, destination: '/roteiros', statusCode: 301 }));

    return [
      ...toRoteiros,
      { source: '/blog', destination: '/guias', statusCode: 301 },
      { source: '/blog/:slug', destination: '/guias/:slug', statusCode: 301 },
      { source: '/como-planejar-viagem-paris', destination: '/guias/como-planejar-viagem-paris', statusCode: 301 },
      { source: '/guia-de-viagem', destination: '/guias', statusCode: 301 },
      { source: '/guia-de-viagem/:slug', destination: '/guias/:slug', statusCode: 301 },
      { source: '/destinos', destination: '/roteiros', permanent: true },
      { source: '/destinos/:slug', destination: '/roteiros?search=:slug', permanent: true },
      { source: '/en/destinations', destination: '/roteiros', permanent: true },
      { source: '/en/destinations/:slug', destination: '/roteiros?search=:slug', permanent: true },
      { source: '/es/destinos', destination: '/roteiros', permanent: true },
      { source: '/es/destinos/:slug', destination: '/roteiros?search=:slug', permanent: true },
      { source: '/pt/destinos', destination: '/roteiros', permanent: true },
      { source: '/pt/destinos/:slug', destination: '/roteiros?search=:slug', permanent: true }
    ];
  },
  async rewrites() {
    return [
      // English rewrites
      { source: '/en/destinations/:slug', destination: '/roteiros?search=:slug&locale=en' },
      { source: '/en/what-to-do/:slug', destination: '/o-que-fazer/:slug?locale=en' },
      { source: '/en/best-time/:slug', destination: '/melhor-epoca/:slug?locale=en' },
      { source: '/en/how-much/:slug', destination: '/quanto-custa/:slug?locale=en' },
      { source: '/en/itineraries/:slug', destination: '/roteiros/:slug?locale=en' },
      { source: '/en/itinerary/:slug', destination: '/roteiros/:slug?locale=en' },
      { source: '/en/blog/:slug', destination: '/guias/:slug?locale=en' },

      // Spanish rewrites
      { source: '/es/destinos/:slug', destination: '/roteiros?search=:slug&locale=es' },
      { source: '/es/que-hacer/:slug', destination: '/o-que-fazer/:slug?locale=es' },
      { source: '/es/mejor-epoca/:slug', destination: '/melhor-epoca/:slug?locale=es' },
      { source: '/es/cuanto-cuesta/:slug', destination: '/quanto-custa/:slug?locale=es' },
      { source: '/es/itinerarios/:slug', destination: '/roteiros/:slug?locale=es' },
      { source: '/es/blog/:slug', destination: '/guias/:slug?locale=es' },

      // Portuguese rewrites
      { source: '/pt/destinos/:slug', destination: '/roteiros?search=:slug&locale=pt' },
      { source: '/pt/o-que-fazer/:slug', destination: '/o-que-fazer/:slug?locale=pt' },
      { source: '/pt/melhor-epoca/:slug', destination: '/melhor-epoca/:slug?locale=pt' },
      { source: '/pt/quanto-custa/:slug', destination: '/quanto-custa/:slug?locale=pt' },
      { source: '/pt/roteiros/:slug', destination: '/roteiros/:slug?locale=pt' },
      { source: '/pt/blog/:slug', destination: '/guias/:slug?locale=pt' },
    ];
  }
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
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
      { source: '/en/planner/:slug', destination: '/planejamento/:slug?locale=en' },
      { source: '/en/blog/:slug', destination: '/blog/:slug?locale=en' },

      // Spanish rewrites
      { source: '/es/destinos/:slug', destination: '/roteiros?search=:slug&locale=es' },
      { source: '/es/que-hacer/:slug', destination: '/o-que-fazer/:slug?locale=es' },
      { source: '/es/mejor-epoca/:slug', destination: '/melhor-epoca/:slug?locale=es' },
      { source: '/es/cuanto-cuesta/:slug', destination: '/quanto-custa/:slug?locale=es' },
      { source: '/es/itinerarios/:slug', destination: '/roteiros/:slug?locale=es' },
      { source: '/es/planificacion/:slug', destination: '/planejamento/:slug?locale=es' },
      { source: '/es/blog/:slug', destination: '/blog/:slug?locale=es' },

      // Portuguese rewrites
      { source: '/pt/destinos/:slug', destination: '/roteiros?search=:slug&locale=pt' },
      { source: '/pt/o-que-fazer/:slug', destination: '/o-que-fazer/:slug?locale=pt' },
      { source: '/pt/melhor-epoca/:slug', destination: '/melhor-epoca/:slug?locale=pt' },
      { source: '/pt/quanto-custa/:slug', destination: '/quanto-custa/:slug?locale=pt' },
      { source: '/pt/roteiros/:slug', destination: '/roteiros/:slug?locale=pt' },
      { source: '/pt/planejamento/:slug', destination: '/planejamento/:slug?locale=pt' },
      { source: '/pt/blog/:slug', destination: '/blog/:slug?locale=pt' },
    ];
  }
};

export default nextConfig;

import { SITE_URL } from '@/lib/site';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/_next/',
        '/api/',
        '/planejamento?*', // Prevent query parameters indexing
        '/private/'
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

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
    sitemap: 'https://2go.com.br/sitemap.xml',
  };
}

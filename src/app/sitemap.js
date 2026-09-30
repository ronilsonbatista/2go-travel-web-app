import { getDestinations, getItineraries, getBlogPosts } from '@/lib/cms';
import { destinationGuides } from '@/data/guidesData';
import { buildSitemapEntries } from '@/lib/sitemapEntries';
import nextConfig from '../../next.config.mjs';

export default async function sitemap() {
  const [destinations, itineraries, blogPosts] = await Promise.all([
    getDestinations(),
    getItineraries(),
    getBlogPosts()
  ]);

  const redirectSources = (await nextConfig.redirects()).map((redirect) => redirect.source);

  return buildSitemapEntries({
    baseUrl: 'https://2go.com.br',
    destinations,
    itineraries,
    blogPosts,
    guideSlugs: Object.keys(destinationGuides),
    redirectSources
  });
}

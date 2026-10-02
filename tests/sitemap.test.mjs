import test from 'node:test';
import assert from 'node:assert/strict';
import nextConfig from '../next.config.mjs';
import { listDestinations, listItineraries, listBlogPosts } from '../src/lib/cms.js';
import { destinationGuides } from '../src/data/guidesData.js';
import {
  buildSitemapEntries,
  pathnameOf,
  isPrivateSitemapPath,
  matchesRedirectSource
} from '../src/lib/sitemapEntries.js';
import { SITE_URL } from '../src/lib/site.js';

const PRIVATE_PATHS = [
  '/login',
  '/viajantes',
  '/viajantes/perfil',
  '/u',
  '/u/ronilson/paris-3-dias',
  '/admin/dashboard'
];

test('sitemap omits redirects and private routes', async () => {
  const redirectSources = (await nextConfig.redirects()).map((redirect) => redirect.source);
  const entries = buildSitemapEntries({
    baseUrl: SITE_URL,
    destinations: listDestinations(),
    itineraries: listItineraries(),
    blogPosts: listBlogPosts(),
    guideSlugs: Object.keys(destinationGuides),
    redirectSources
  });
  const paths = entries.map((entry) => pathnameOf(entry.url));

  for (const path of paths) {
    assert.equal(isPrivateSitemapPath(path), false, path);
    for (const source of redirectSources) {
      assert.equal(matchesRedirectSource(path, source), false, `${path} matches ${source}`);
    }
  }

  for (const blocked of PRIVATE_PATHS) {
    assert.equal(paths.includes(blocked), false, blocked);
  }

  assert.ok(entries.every((entry) => entry.url === SITE_URL || entry.url.startsWith(`${SITE_URL}/`)));
  assert.equal(entries.some((entry) => /2go\.com\.br|2go-site\.vercel\.app|2go-travel-react\.vercel\.app/.test(entry.url)), false);
  assert.equal(paths.filter((path) => path === '/blog/como-planejar-viagem-paris').length, 1);
  for (const retired of ['/planejamento', '/premium', '/consultoria', '/consultoria-personalizada', '/criar-roteiro']) {
    assert.equal(paths.includes(retired), false, retired);
    assert.equal(paths.some((path) => path.startsWith(`${retired}/`)), false, retired);
  }
  assert.equal(paths.some((path) => path.startsWith('/en/') || path.startsWith('/es/') || path.startsWith('/pt/')), false);
});

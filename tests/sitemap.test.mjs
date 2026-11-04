import test from 'node:test';
import assert from 'node:assert/strict';
import nextConfig from '../next.config.mjs';
import { listDestinations, listItineraries, listBlogPosts } from '../src/lib/cms.js';
import { publicGuideSlugs } from '../src/data/destinationsCatalog.js';
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
    guideSlugs: publicGuideSlugs(),
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
  assert.equal(paths.filter((path) => path === '/guias/como-planejar-viagem-paris').length, 1);
  assert.equal(paths.includes('/guias/como-planejar-viagem-sydney'), false);
  assert.equal(publicGuideSlugs().length, 14);
  assert.equal(paths.includes('/blog'), false);
  assert.equal(paths.some((path) => path.startsWith('/blog/')), false);
  assert.equal(paths.includes('/roteiros'), false);
  assert.equal(paths.some((path) => path.startsWith('/roteiros/')), false);
  for (const retired of ['/planejamento', '/premium', '/consultoria', '/consultoria-personalizada', '/criar-roteiro', '/roteiros']) {
    assert.equal(paths.includes(retired), false, retired);
    assert.equal(paths.some((path) => path.startsWith(`${retired}/`)), false, retired);
  }
  assert.equal(paths.some((path) => path.startsWith('/en/') || path.startsWith('/es/') || path.startsWith('/pt/')), false);
});

test('legacy roteiros URLs redirect to guias', async () => {
  const redirects = await nextConfig.redirects();
  const bySource = Object.fromEntries(redirects.map((r) => [r.source, r]));

  assert.equal(bySource['/roteiros']?.destination, '/guias');
  assert.equal(bySource['/roteiros/:path*']?.destination, '/guias');
  assert.equal(bySource['/roteiros/paris-3-dias']?.destination, '/guias/como-planejar-viagem-paris');
  assert.equal(bySource['/roteiros/toquio-3-dias']?.destination, '/guias/como-planejar-viagem-toquio');
  assert.equal(bySource['/destinos']?.destination, '/guias');
  assert.equal(bySource['/criar-roteiro']?.destination, '/guias');
});

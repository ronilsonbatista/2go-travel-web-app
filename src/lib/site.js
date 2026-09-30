export const SITE_URL = 'https://2go-travel-web-app.vercel.app';

export function absoluteSiteUrl(path = '') {
  if (!path) return SITE_URL;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

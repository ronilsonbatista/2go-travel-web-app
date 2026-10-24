/**
 * Store / landing download destinations.
 * Set via env — never invent App Store / Play / landing URLs.
 *
 * NEXT_PUBLIC_APP_STORE_URL
 * NEXT_PUBLIC_PLAY_STORE_URL
 * NEXT_PUBLIC_APP_LANDING_URL  (QR + generic fallback when a store URL is unset)
 */

function trimUrl(value) {
  const raw = String(value || '').trim();
  if (!raw) return null;
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
    return parsed.toString().replace(/\/$/, '') === raw.replace(/\/$/, '')
      ? raw
      : parsed.toString();
  } catch {
    return null;
  }
}

export function getAppStoreUrl() {
  return trimUrl(process.env.NEXT_PUBLIC_APP_STORE_URL);
}

export function getPlayStoreUrl() {
  return trimUrl(process.env.NEXT_PUBLIC_PLAY_STORE_URL);
}

export function getAppLandingUrl() {
  return trimUrl(process.env.NEXT_PUBLIC_APP_LANDING_URL);
}

/** Prefer landing, else first available store URL — for QR / generic links. */
export function getPreferredDownloadUrl() {
  return getAppLandingUrl() || getAppStoreUrl() || getPlayStoreUrl() || null;
}

export function getDownloadLinks() {
  return {
    appStore: getAppStoreUrl(),
    playStore: getPlayStoreUrl(),
    landing: getAppLandingUrl(),
    preferred: getPreferredDownloadUrl(),
    available: Boolean(getPreferredDownloadUrl())
  };
}

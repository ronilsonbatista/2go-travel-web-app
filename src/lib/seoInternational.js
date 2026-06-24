// 2GO Travel International SEO (Hreflang, Canonical and Alternates) utility
// Automatically constructs Next.js metadata structures supporting localized routing segments.

const DOMAIN = 'https://2go.com.br';

const routeTranslations = {
  destinos: {
    pt: '/destinos',
    en: '/en/destinations',
    es: '/es/destinos'
  },
  'o-que-fazer': {
    pt: '/o-que-fazer',
    en: '/en/what-to-do',
    es: '/es/que-hacer'
  },
  'melhor-epoca': {
    pt: '/melhor-epoca',
    en: '/en/best-time',
    es: '/es/mejor-epoca'
  },
  'quanto-custa': {
    pt: '/quanto-custa',
    en: '/en/how-much',
    es: '/es/cuanto-cuesta'
  },
  roteiros: {
    pt: '/roteiros',
    en: '/en/itineraries',
    es: '/es/itinerarios'
  },
  planejamento: {
    pt: '/planejamento',
    en: '/en/planner',
    es: '/es/planificacion'
  },
  blog: {
    pt: '/blog',
    en: '/en/blog',
    es: '/es/blog'
  }
};

export function getInternationalSEO(pathType, slug) {
  const trans = routeTranslations[pathType];
  
  // Fallback if the path type is not translated
  if (!trans) {
    return {
      canonical: `${DOMAIN}/${pathType}/${slug}`,
      languages: {
        'x-default': `${DOMAIN}/${pathType}/${slug}`,
        'pt-BR': `${DOMAIN}/pt/${pathType}/${slug}`,
        'en-US': `${DOMAIN}/en/${pathType}/${slug}`,
        'es-ES': `${DOMAIN}/es/${pathType}/${slug}`
      }
    };
  }

  const slugSuffix = slug ? `/${slug}` : '';

  return {
    canonical: `${DOMAIN}${trans.pt}${slugSuffix}`,
    languages: {
      'x-default': `${DOMAIN}${trans.pt}${slugSuffix}`, // PT default
      'pt-BR': `${DOMAIN}${trans.pt}${slugSuffix}`,
      'en-US': `${DOMAIN}${trans.en}${slugSuffix}`,
      'es-ES': `${DOMAIN}${trans.es}${slugSuffix}`
    }
  };
}

// Generate static alternate metadata object for root page or static paths
export function getStaticSEO(path) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  return {
    canonical: `${DOMAIN}${cleanPath}`,
    languages: {
      'x-default': `${DOMAIN}${cleanPath}`,
      'pt-BR': `${DOMAIN}${cleanPath}`,
      'en-US': `${DOMAIN}/en${cleanPath}`,
      'es-ES': `${DOMAIN}/es${cleanPath}`
    }
  };
}

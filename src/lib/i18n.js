// 2GO Travel Internationalization (i18n) Manager
// Translation dictionaries for PT, EN, and ES UI keys and content overrides.

const uiTranslations = {
  pt: {
    exclusive_vip: 'SERVIÇO EXCLUSIVO VIP',
    recommended_partners: 'PARCEIROS CREDENCIADOS',
    generate_my_itinerary: 'Gerar meu roteiro',
    download_app: 'Baixar Aplicativo 📲',
    tourist_attractions: 'Pontos Turísticos Imperdíveis',
    local_tips: 'Dicas Locais dos Especialistas',
    why_insurance: 'Por que o seguro é obrigatório?',
    compare_policies: 'Comparar Apólices',
    about_traveler: 'SOBRE O VIAJANTE',
    save_to_my_app: 'Salvar no Meu App',
    how_much_title: 'Quanto Custa Viajar para',
    best_time_title: 'Melhor Época para Viajar para',
    what_to_do_title: 'O que fazer em',
    similar_destinations: 'Destinos Semelhantes Recomendados',
    similar_destinations_desc: 'Quem planejou viagens para este local também gostou de conhecer estes destinos:',
    download_pdf_guide: 'Baixar Guia PDF Completo'
  },
  en: {
    exclusive_vip: 'EXCLUSIVE VIP SERVICE',
    recommended_partners: 'RECOMMENDED PARTNERS',
    generate_my_itinerary: 'Generate my itinerary',
    download_app: 'Download App 📲',
    tourist_attractions: 'Must-See Tourist Attractions',
    local_tips: 'Local Expert Tips',
    why_insurance: 'Why is travel insurance mandatory?',
    compare_policies: 'Compare Policies',
    about_traveler: 'ABOUT THE TRAVELER',
    save_to_my_app: 'Save to My App',
    how_much_title: 'How Much Does It Cost to Travel to',
    best_time_title: 'Best Time to Visit',
    what_to_do_title: 'Things to Do in',
    similar_destinations: 'Recommended Similar Destinations',
    similar_destinations_desc: 'Travelers who planned trips here also enjoyed exploring these destinations:',
    download_pdf_guide: 'Download Complete PDF Guide'
  },
  es: {
    exclusive_vip: 'SERVICIO EXCLUSIVO VIP',
    recommended_partners: 'SOCIOS RECOMENDADOS',
    generate_my_itinerary: 'Generar mi itinerario',
    download_app: 'Descargar Aplicación 📲',
    tourist_attractions: 'Atracciones Turísticas Imperdibles',
    local_tips: 'Consejos de Expertos Locales',
    why_insurance: '¿Por qué es obligatorio el seguro?',
    compare_policies: 'Comparar Pólizas',
    about_traveler: 'SOBRE EL VIAJERO',
    save_to_my_app: 'Guardar en Mi App',
    how_much_title: 'Cuánto Cuesta Viajar a',
    best_time_title: 'Mejor Época para Viajar a',
    what_to_do_title: 'Qué hacer en',
    similar_destinations: 'Destinos Similares Recomendados',
    similar_destinations_desc: 'Los viajeros que planearon viajes aquí también disfrutaron explorando estos destinos:',
    download_pdf_guide: 'Descargar Guía PDF Completa'
  }
};

const destinationTranslations = {
  paris: {
    en: {
      name: 'Paris',
      country: 'France',
      desc: 'Discover Paris, the city of light and fashion. Explore the Eiffel Tower, Louvre Museum, cruise the Seine, and experience local bistros.'
    },
    es: {
      name: 'París',
      country: 'Francia',
      desc: 'Descubre París, la ciudad de la luz y la moda. Explora la Torre Eiffel, el Museo del Louvre, pasea por el Sena y vive los mejores bistrós.'
    }
  },
  roma: {
    en: {
      name: 'Rome',
      country: 'Italy',
      desc: 'Rome is a live history museum. Walk through the Colosseum, Roman Forum, and enjoy the authentic Italian gastronomy.'
    },
    es: {
      name: 'Roma',
      country: 'Italia',
      desc: 'Roma es un museo de historia viviente. Camina por el Coliseo, el Foro Romano y disfruta de la auténtica gastronomía italiana.'
    }
  },
  lisboa: {
    en: {
      name: 'Lisbon',
      country: 'Portugal',
      desc: 'Experience Lisbon, the city of seven hills. Beautiful coastal views, pastel de nata, traditional tramways, and rich historical heritage.'
    },
    es: {
      name: 'Lisboa',
      country: 'Portugal',
      desc: 'Experimenta Lisboa, la ciudad de las siete colinas. Hermosas vistas costeras, pasteles de nata, tranvías tradicionales y rica historia.'
    }
  }
};

// Translates UI keys
export function translate(key, locale = 'pt') {
  const normLocale = (locale || 'pt').toLowerCase();
  const dict = uiTranslations[normLocale] || uiTranslations.pt;
  return dict[key] || uiTranslations.pt[key] || key;
}

// Translates dynamic destination database entries
export function translateDestination(destination, locale = 'pt') {
  if (!destination) return null;
  const normLocale = (locale || 'pt').toLowerCase();
  if (normLocale === 'pt') return destination;

  const destTranslations = destinationTranslations[destination.slug];
  if (destTranslations && destTranslations[normLocale]) {
    return {
      ...destination,
      name: destTranslations[normLocale].name || destination.name,
      country: destTranslations[normLocale].country || destination.country,
      desc: destTranslations[normLocale].desc || destination.desc
    };
  }

  // Fallback: simple default translation modifications for other slugs
  if (normLocale === 'en') {
    return {
      ...destination,
      desc: `${destination.desc} (English translation is pending CMS synchronization)`
    };
  } else if (normLocale === 'es') {
    return {
      ...destination,
      desc: `${destination.desc} (Traducción al español pendiente de sincronización del CMS)`
    };
  }

  return destination;
}

// Translates itineraries
export function translateItinerary(itinerary, locale = 'pt') {
  if (!itinerary) return null;
  const normLocale = (locale || 'pt').toLowerCase();
  if (normLocale === 'pt') return itinerary;

  // Simple localized description translations
  if (normLocale === 'en') {
    return {
      ...itinerary,
      title: itinerary.title.replace('Roteiro de', 'Itinerary of').replace('Dias', 'Days').replace('em', 'in'),
      desc: `${itinerary.desc} (Translated details will be synced on the mobile app)`
    };
  } else if (normLocale === 'es') {
    return {
      ...itinerary,
      title: itinerary.title.replace('Roteiro de', 'Itinerario de').replace('Dias', 'Días').replace('em', 'en'),
      desc: `${itinerary.desc} (Detalles traducidos sincronizados en tu aplicación)`
    };
  }

  return itinerary;
}

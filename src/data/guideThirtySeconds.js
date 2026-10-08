/**
 * City-specific “{City} em 30 segundos” content for the creative guide layout.
 * Falls back to sensible defaults derived from guide fields when a slug is missing.
 */

const REGION_COLORS = ['#5B8DEF', '#F47A20', '#8B7CF6', '#96AB21', '#0F766E', '#B45309'];

const PARIS_IMG = {
  eiffel: '/images/destinations/paris/paris-eiffel-seine.jpg',
  louvre: '/images/destinations/paris/paris-louvre.jpg',
  notre: '/images/destinations/paris/paris-notre-dame.jpg',
  a: '/images/destinations/paris/paris-1.jpg',
  b: '/images/destinations/paris/paris-2.jpg',
  c: '/images/destinations/paris/paris-3.jpg'
};

const NY_IMG = {
  liberty: '/images/destinations/nova-york/nova-york-estatua-liberdade.jpg',
  empire: '/images/destinations/nova-york/nova-york-empire-state.jpg',
  brooklyn: '/images/destinations/nova-york/nova-york-brooklyn-bridge.jpg',
  a: '/images/destinations/nova-york/nova-york-1.jpg',
  b: '/images/destinations/nova-york/nova-york-2.jpg',
  c: '/images/destinations/nova-york/nova-york-3.jpg'
};

const TOKYO_IMG = {
  tower: '/images/destinations/toquio/toquio-tokyo-tower.jpg',
  sensoji: '/images/destinations/toquio/toquio-sensoji.jpg',
  shibuya: '/images/destinations/toquio/toquio-shibuya-crossing.jpg',
  a: '/images/destinations/toquio/toquio-1.jpg',
  b: '/images/destinations/toquio/toquio-2.jpg',
  c: '/images/destinations/toquio/toquio-3.jpg'
};

const LONDON_IMG = {
  ben: '/images/destinations/londres/londres-big-ben.jpg',
  bridge: '/images/destinations/londres/londres-tower-bridge.jpg',
  buck: '/images/destinations/londres/londres-buckingham-palace.jpg',
  a: '/images/destinations/londres/londres-1.jpg',
  b: '/images/destinations/londres/londres-2.jpg',
  c: '/images/destinations/londres/londres-3.jpg'
};

const ROMA_IMG = {
  coliseu: '/images/destinations/roma/roma-coliseu.jpg',
  trevi: '/images/destinations/roma/roma-fontana-trevi.jpg',
  vaticano: '/images/destinations/roma/roma-vaticano.jpg',
  a: '/images/destinations/roma/roma-1.jpg',
  b: '/images/destinations/roma/roma-2.jpg',
  c: '/images/destinations/roma/roma-3.jpg'
};

const IST_IMG = {
  hagia: '/images/destinations/istambul/istambul-hagia-sophia.jpg',
  azul: '/images/destinations/istambul/istambul-mesquita-azul.jpg',
  bosforo: '/images/destinations/istambul/istambul-bosforo.jpg',
  a: '/images/destinations/istambul/istambul-1.jpg',
  b: '/images/destinations/istambul/istambul-2.jpg',
  c: '/images/destinations/istambul/istambul-3.jpg'
};

const DUBAI_IMG = {
  burj: '/images/destinations/dubai/dubai-burj-khalifa.jpg',
  marina: '/images/destinations/dubai/dubai-marina.jpg',
  arab: '/images/destinations/dubai/dubai-burj-al-arab.jpg',
  a: '/images/destinations/dubai/dubai-1.jpg',
  b: '/images/destinations/dubai/dubai-2.jpg',
  c: '/images/destinations/dubai/dubai-3.jpg'
};

export const GUIDE_THIRTY_SECONDS = {
  'como-planejar-viagem-paris': {
    facts: [
      { value: '5 – 7 dias', label: 'Tempo ideal', tone: 'green' },
      { value: '€ 80 – 150', label: 'Por dia (média)', tone: 'yellow' },
      { value: 'Metrô fácil', label: 'Rápido e eficiente', tone: 'orange' },
      { value: 'Reservas antecipadas', label: 'Para as principais atrações', tone: 'blue' }
    ],
    regions: [
      {
        id: 'eiffel',
        name: 'Torre Eiffel e Champs-Élysées',
        blurb: 'Ícones de Paris',
        color: '#5B8DEF',
        image: PARIS_IMG.eiffel,
        pin: { top: '58%', left: '22%' },
        hotel: 'Hotéis boutique perto do Champ de Mars'
      },
      {
        id: 'louvre',
        name: 'Centro Histórico e Louvre',
        blurb: 'Cultura e história',
        color: '#F47A20',
        image: PARIS_IMG.louvre,
        pin: { top: '48%', left: '48%' },
        hotel: 'Hotéis clássicos em Saint-Germain e Opéra'
      },
      {
        id: 'marais',
        name: 'Le Marais',
        blurb: 'Charme e vida local',
        color: '#8B7CF6',
        image: PARIS_IMG.a,
        pin: { top: '42%', left: '62%' },
        hotel: 'Apartamentos charmosos no 3º e 4º'
      },
      {
        id: 'montmartre',
        name: 'Montmartre',
        blurb: 'Arte e vista incrível',
        color: '#96AB21',
        image: PARIS_IMG.b,
        pin: { top: '22%', left: '55%' },
        hotel: 'Pousadas com vista no Sacré-Cœur'
      }
    ]
  },

  'como-planejar-viagem-nova-york': {
    facts: [
      { value: '6 – 8 dias', label: 'Tempo ideal', tone: 'green' },
      { value: '$ 120 – 280', label: 'Por dia (média)', tone: 'yellow' },
      { value: 'Metrô 24h', label: 'OMNY por aproximação', tone: 'orange' },
      { value: 'Broadway & mirantes', label: 'Reserve com antecedência', tone: 'blue' }
    ],
    regions: [
      {
        id: 'midtown',
        name: 'Midtown & Times Square',
        blurb: 'Ícones e Broadway',
        color: '#5B8DEF',
        image: NY_IMG.empire,
        pin: { top: '42%', left: '48%' },
        hotel: 'Hotéis práticos perto da Times Square'
      },
      {
        id: 'downtown',
        name: 'Lower Manhattan',
        blurb: 'Skyline e história',
        color: '#F47A20',
        image: NY_IMG.liberty,
        pin: { top: '68%', left: '40%' },
        hotel: 'Financial District com vista do porto'
      },
      {
        id: 'central-park',
        name: 'Central Park & UES',
        blurb: 'Verde e museus',
        color: '#96AB21',
        image: NY_IMG.a,
        pin: { top: '28%', left: '52%' },
        hotel: 'Upper West Side perto do parque'
      },
      {
        id: 'brooklyn',
        name: 'Brooklyn & DUMBO',
        blurb: 'Vistas e vibe local',
        color: '#8B7CF6',
        image: NY_IMG.brooklyn,
        pin: { top: '72%', left: '68%' },
        hotel: 'Williamsburg e DUMBO com skyline'
      }
    ]
  },

  'como-planejar-viagem-toquio': {
    facts: [
      { value: '6 – 7 dias', label: 'Tempo ideal', tone: 'green' },
      { value: '¥ 15–35 mil', label: 'Por dia (média)', tone: 'yellow' },
      { value: 'Suica / JR', label: 'Trem pontual e fácil', tone: 'orange' },
      { value: 'Restaurantes top', label: 'Reserve omakase', tone: 'blue' }
    ],
    regions: [
      {
        id: 'shinjuku',
        name: 'Shinjuku',
        blurb: 'Noite e conexões',
        color: '#5B8DEF',
        image: TOKYO_IMG.a,
        pin: { top: '40%', left: '30%' },
        hotel: 'Business hotels na estação Shinjuku'
      },
      {
        id: 'shibuya',
        name: 'Shibuya',
        blurb: 'Cruzamento e pop',
        color: '#F47A20',
        image: TOKYO_IMG.shibuya,
        pin: { top: '58%', left: '38%' },
        hotel: 'Hotéis modernos perto do scrambling'
      },
      {
        id: 'asakusa',
        name: 'Asakusa & Ueno',
        blurb: 'Templos e tradição',
        color: '#96AB21',
        image: TOKYO_IMG.sensoji,
        pin: { top: '32%', left: '68%' },
        hotel: 'Ryokans e hotéis em Asakusa'
      },
      {
        id: 'ginza',
        name: 'Ginza & Tokyo Tower',
        blurb: 'Elegância e vista',
        color: '#8B7CF6',
        image: TOKYO_IMG.tower,
        pin: { top: '52%', left: '55%' },
        hotel: 'Hotéis de luxo em Ginza'
      }
    ]
  },

  'como-planejar-viagem-londres': {
    facts: [
      { value: '5 – 7 dias', label: 'Tempo ideal', tone: 'green' },
      { value: '£ 90 – 180', label: 'Por dia (média)', tone: 'yellow' },
      { value: 'Tube + Oyster', label: 'Contactless em tudo', tone: 'orange' },
      { value: 'Shows & museus', label: 'Reserve West End', tone: 'blue' }
    ],
    regions: [
      {
        id: 'westminster',
        name: 'Westminster & Big Ben',
        blurb: 'Ícones reais',
        color: '#5B8DEF',
        image: LONDON_IMG.ben,
        pin: { top: '55%', left: '42%' },
        hotel: 'Hotéis perto de Westminster'
      },
      {
        id: 'southbank',
        name: 'South Bank & Tower Bridge',
        blurb: 'Rio e skyline',
        color: '#F47A20',
        image: LONDON_IMG.bridge,
        pin: { top: '62%', left: '62%' },
        hotel: 'Hotéis com vista do Tâmisa'
      },
      {
        id: 'buckingham',
        name: 'Buckingham & Parks',
        blurb: 'Palácio e verde',
        color: '#96AB21',
        image: LONDON_IMG.buck,
        pin: { top: '48%', left: '30%' },
        hotel: 'Belgravia e Hyde Park'
      },
      {
        id: 'city',
        name: 'City & East End',
        blurb: 'História e street food',
        color: '#8B7CF6',
        image: LONDON_IMG.a,
        pin: { top: '38%', left: '58%' },
        hotel: 'Shoreditch e Clerkenwell'
      }
    ]
  },

  'como-planejar-viagem-roma': {
    facts: [
      { value: '4 – 5 dias', label: 'Tempo ideal', tone: 'green' },
      { value: '€ 65 – 160', label: 'Por dia (média)', tone: 'yellow' },
      { value: 'A pé + metrô', label: 'Centro compacto', tone: 'orange' },
      { value: 'Coliseu & Vaticano', label: 'Ingresso com hora marcada', tone: 'blue' }
    ],
    regions: [
      {
        id: 'antiga',
        name: 'Roma Antiga',
        blurb: 'Coliseu e Fórum',
        color: '#F47A20',
        image: ROMA_IMG.coliseu,
        pin: { top: '58%', left: '58%' },
        hotel: 'Monti, a poucos passos do Coliseu'
      },
      {
        id: 'vaticano',
        name: 'Vaticano',
        blurb: 'Capela e praça',
        color: '#5B8DEF',
        image: ROMA_IMG.vaticano,
        pin: { top: '40%', left: '22%' },
        hotel: 'Prati, prático para o Vaticano'
      },
      {
        id: 'centro',
        name: 'Centro Storico',
        blurb: 'Fontana e praças',
        color: '#8B7CF6',
        image: ROMA_IMG.trevi,
        pin: { top: '45%', left: '48%' },
        hotel: 'Piazza Navona e Pantheon'
      },
      {
        id: 'trastevere',
        name: 'Trastevere',
        blurb: 'Noite e trattorias',
        color: '#96AB21',
        image: ROMA_IMG.a,
        pin: { top: '68%', left: '38%' },
        hotel: 'Trastevere para jantares a pé'
      }
    ]
  },

  'como-planejar-viagem-istambul': {
    facts: [
      { value: '5 – 6 dias', label: 'Tempo ideal', tone: 'green' },
      { value: '₺ acessível', label: 'Ótimo custo-benefício', tone: 'yellow' },
      { value: 'Istanbulkart', label: 'Metrô, bondinho e ferry', tone: 'orange' },
      { value: 'Mesquitas & palácios', label: 'Chegue cedo', tone: 'blue' }
    ],
    regions: [
      {
        id: 'sultanahmet',
        name: 'Sultanahmet',
        blurb: 'Hagia Sophia e Azul',
        color: '#5B8DEF',
        image: IST_IMG.hagia,
        pin: { top: '55%', left: '55%' },
        hotel: 'Hotéis históricos em Sultanahmet'
      },
      {
        id: 'azul',
        name: 'Mesquita Azul & Hipódromo',
        blurb: 'Ícones otomanos',
        color: '#F47A20',
        image: IST_IMG.azul,
        pin: { top: '62%', left: '48%' },
        hotel: 'Pousadas com terraço perto da Azul'
      },
      {
        id: 'bosforo',
        name: 'Bósforo & Karaköy',
        blurb: 'Travessia e vista',
        color: '#0F766E',
        image: IST_IMG.bosforo,
        pin: { top: '38%', left: '40%' },
        hotel: 'Karaköy e Galata com vista do estreito'
      },
      {
        id: 'bazaar',
        name: 'Grande Bazar',
        blurb: 'Mercados e especiarias',
        color: '#8B7CF6',
        image: IST_IMG.a,
        pin: { top: '48%', left: '62%' },
        hotel: 'Beyazıt e Eminönü'
      }
    ]
  },

  'como-planejar-viagem-dubai': {
    facts: [
      { value: '4 – 6 dias', label: 'Tempo ideal', tone: 'green' },
      { value: 'AED 400–800', label: 'Por dia (média)', tone: 'yellow' },
      { value: 'Metrô + táxi', label: 'Ar-condicionado e fácil', tone: 'orange' },
      { value: 'Burj & deserto', label: 'Reserve mirantes', tone: 'blue' }
    ],
    regions: [
      {
        id: 'downtown',
        name: 'Downtown & Burj Khalifa',
        blurb: 'Ícone e Dubai Mall',
        color: '#5B8DEF',
        image: DUBAI_IMG.burj,
        pin: { top: '48%', left: '48%' },
        hotel: 'Downtown com vista do Burj'
      },
      {
        id: 'marina',
        name: 'Dubai Marina',
        blurb: 'Skyline e promenade',
        color: '#0F766E',
        image: DUBAI_IMG.marina,
        pin: { top: '62%', left: '28%' },
        hotel: 'Marina e JBR com praia'
      },
      {
        id: 'arab',
        name: 'Jumeirah & Burj Al Arab',
        blurb: 'Praia e luxo',
        color: '#F47A20',
        image: DUBAI_IMG.arab,
        pin: { top: '58%', left: '38%' },
        hotel: 'Resorts em Jumeirah Beach'
      },
      {
        id: 'old',
        name: 'Old Dubai',
        blurb: 'Souks e abra',
        color: '#8B7CF6',
        image: DUBAI_IMG.a,
        pin: { top: '32%', left: '55%' },
        hotel: 'Al Fahidi e Creek'
      }
    ]
  }
};

function shortIdealDays(text) {
  if (!text) return '5 – 7 dias';
  const match = String(text).match(/(\d+)\s*a\s*(\d+)\s*dias?/i);
  if (match) return `${match[1]} – ${match[2]} dias`;
  const single = String(text).match(/(\d+)\s*dias?/i);
  if (single) return `${single[1]} dias`;
  return String(text).slice(0, 18);
}

function shortDailyCost(guide) {
  const raw = guide?.costsTable?.economy?.daily || guide?.costsTable?.comfort?.daily;
  if (!raw) return 'Consulte o guia';
  const compact = String(raw)
    .replace(/\s+/g, ' ')
    .replace(/por dia.*/i, '')
    .trim();
  return compact.length > 18 ? `${compact.slice(0, 16)}…` : compact;
}

function shortTransport(guide) {
  const t = String(guide?.transportDetails || '').toLowerCase();
  if (t.includes('metrô') || t.includes('metro')) return 'Metrô fácil';
  if (t.includes('trem') || t.includes('jr') || t.includes('tube')) return 'Trem fácil';
  if (t.includes('a pé')) return 'A pé + local';
  return 'Transporte local';
}

function framesFromGuide(guide) {
  const listed = (guide.images || [])
    .map((image) => (typeof image === 'string' ? image : image?.url))
    .filter(Boolean);
  return [guide.heroImage, ...listed].filter(Boolean);
}

function buildFromGuide(guide) {
  const frames = framesFromGuide(guide);
  const neighborhoods = guide.neighborhoods || [];
  const attractions = guide.attractions || [];

  const regions = (neighborhoods.length ? neighborhoods : attractions)
    .slice(0, 4)
    .map((item, index) => {
      const name = item.name || `Região ${index + 1}`;
      const blurb =
        item.pros?.split(',')[0]?.trim() ||
        item.whyVisit ||
        item.desc ||
        'Destaque do destino';
      return {
        id: `region-${index}`,
        name: name.length > 36 ? `${name.slice(0, 34)}…` : name,
        blurb: blurb.length > 28 ? `${blurb.slice(0, 26)}…` : blurb,
        color: REGION_COLORS[index % REGION_COLORS.length],
        image: frames[index % Math.max(frames.length, 1)] || guide.heroImage,
        pin: [
          { top: '58%', left: '28%' },
          { top: '42%', left: '52%' },
          { top: '30%', left: '40%' },
          { top: '65%', left: '62%' }
        ][index],
        hotel: `Hospedagem recomendada em ${name.split('(')[0].trim()}`
      };
    });

  while (regions.length < 4 && frames.length) {
    const index = regions.length;
    regions.push({
      id: `extra-${index}`,
      name: guide.city,
      blurb: 'Destaque do guia',
      color: REGION_COLORS[index % REGION_COLORS.length],
      image: frames[index % frames.length],
      pin: { top: `${35 + index * 10}%`, left: `${30 + index * 12}%` },
      hotel: `Melhores bairros de ${guide.city}`
    });
  }

  return {
    facts: [
      { value: shortIdealDays(guide.idealDays), label: 'Tempo ideal', tone: 'green' },
      { value: shortDailyCost(guide), label: 'Por dia (média)', tone: 'yellow' },
      { value: shortTransport(guide), label: 'Rápido e eficiente', tone: 'orange' },
      {
        value: 'Reservas antecipadas',
        label: 'Para as principais atrações',
        tone: 'blue'
      }
    ],
    regions
  };
}

export function getThirtySeconds(guide) {
  if (!guide) {
    return { facts: [], regions: [] };
  }
  return GUIDE_THIRTY_SECONDS[guide.slug] || buildFromGuide(guide);
}

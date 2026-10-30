import { guideImage } from '../lib/curatedGuideImages.js';
import { BATCH1_THIRTY_SECONDS } from './guideThirtySeconds.batch1.js';
/**
 * City-specific “{City} em 30 segundos” content for the creative guide layout.
 * Every published slot is explicit; unknown guides return empty map content.
 */

export const GUIDE_THIRTY_SECONDS = {
  ...BATCH1_THIRTY_SECONDS,
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
        image: '/images/destinations/paris/curated-region-0.jpg',
        pin: { top: '58%', left: '22%' },
        hotel: 'Hotéis boutique perto do Champ de Mars'
      },
      {
        id: 'louvre',
        name: 'Centro Histórico e Louvre',
        blurb: 'Cultura e história',
        color: '#F47A20',
        image: '/images/destinations/paris/curated-region-1.jpg',
        pin: { top: '48%', left: '48%' },
        hotel: 'Hotéis clássicos em Saint-Germain e Opéra'
      },
      {
        id: 'marais',
        name: 'Le Marais',
        blurb: 'Charme e vida local',
        color: '#8B7CF6',
        image: '/images/destinations/paris/curated-region-2.jpg',
        pin: { top: '42%', left: '62%' },
        hotel: 'Apartamentos charmosos no 3º e 4º'
      },
      {
        id: 'montmartre',
        name: 'Montmartre',
        blurb: 'Arte e vista incrível',
        color: '#96AB21',
        image: '/images/destinations/paris/curated-region-3.jpg',
        pin: { top: '22%', left: '55%' },
        hotel: 'Pousadas com vista no Sacré-Cœur'
      }
    ],
    hotels: [
      {
        id: 'paris-hotel-eiffel',
        name: 'Hôtel du Champ de Mars',
        neighborhood: '7º · Champ de Mars',
        address: '7 rue du Champ de Mars, 75007 Paris',
        note: '€€ · Boutique a pé da Torre Eiffel',
        image: '/images/destinations/paris/curated-hotel-0.jpg',
        imageIllustrative: true,
        color: '#5B8DEF',
        pin: { top: '60%', left: '20%' }
      },
      {
        id: 'paris-hotel-louvre',
        name: 'Hôtel Brighton',
        neighborhood: '1º · Tuileries / Louvre',
        address: '218 rue de Rivoli, 75001 Paris',
        note: '€€€ · Clássico de frente aos Jardins',
        image: '/images/destinations/paris/curated-hotel-1.jpg',
        imageIllustrative: true,
        color: '#F47A20',
        pin: { top: '50%', left: '46%' }
      },
      {
        id: 'paris-hotel-marais',
        name: 'Hôtel Jeanne d’Arc',
        neighborhood: '4º · Le Marais',
        address: '3 rue de Jarente, 75004 Paris',
        note: '€€ · Charme no coração do Marais',
        image: '/images/destinations/paris/curated-hotel-2.jpg',
        imageIllustrative: true,
        color: '#8B7CF6',
        pin: { top: '44%', left: '64%' }
      },
      {
        id: 'paris-hotel-montmartre',
        name: 'Timhotel Montmartre',
        neighborhood: '18º · Montmartre',
        address: '11 rue Ravignan, 75018 Paris',
        note: '€€ · Place Émile Goudeau, perto do Sacré-Cœur',
        image: '/images/destinations/paris/curated-hotel-3.jpg',
        imageIllustrative: true,
        color: '#96AB21',
        pin: { top: '20%', left: '57%' }
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
        image: '/images/destinations/nova-york/curated-region-0.jpg',
        pin: { top: '42%', left: '48%' },
        hotel: 'Hotéis práticos perto da Times Square'
      },
      {
        id: 'downtown',
        name: 'Lower Manhattan',
        blurb: 'Skyline e história',
        color: '#F47A20',
        image: '/images/destinations/nova-york/curated-region-1.jpg',
        pin: { top: '68%', left: '40%' },
        hotel: 'Financial District com vista do porto'
      },
      {
        id: 'central-park',
        name: 'Central Park & UES',
        blurb: 'Verde e museus',
        color: '#96AB21',
        image: '/images/destinations/nova-york/curated-region-2.jpg',
        pin: { top: '28%', left: '52%' },
        hotel: 'Upper West Side perto do parque'
      },
      {
        id: 'brooklyn',
        name: 'Brooklyn & DUMBO',
        blurb: 'Vistas e vibe local',
        color: '#8B7CF6',
        image: '/images/destinations/nova-york/curated-region-3.jpg',
        pin: { top: '72%', left: '68%' },
        hotel: 'Williamsburg e DUMBO com skyline'
      }
    ],
    hotels: [
      {
        id: 'ny-hotel-midtown',
        name: 'Pod Times Square',
        neighborhood: 'Midtown · Times Square',
        address: '400 W 42nd St, New York, NY',
        note: '$ · Prático perto da Broadway',
        image: '/images/destinations/nova-york/curated-hotel-0.jpg',
        imageIllustrative: true,
        color: '#5B8DEF',
        pin: { top: '44%', left: '46%' }
      },
      {
        id: 'ny-hotel-downtown',
        name: 'Conrad New York Downtown',
        neighborhood: 'Battery Park City',
        address: '102 N End Ave, New York, NY',
        note: '$$$ · Vista do porto e Battery',
        image: '/images/destinations/nova-york/curated-hotel-1.jpg',
        imageIllustrative: true,
        color: '#F47A20',
        pin: { top: '70%', left: '38%' }
      },
      {
        id: 'ny-hotel-park',
        name: 'The Lucerne',
        neighborhood: 'Upper West Side',
        address: '201 W 79th St, New York, NY',
        note: '$$ · Clássico perto do Central Park',
        image: '/images/destinations/nova-york/curated-hotel-2.jpg',
        imageIllustrative: true,
        color: '#96AB21',
        pin: { top: '26%', left: '50%' }
      },
      {
        id: 'ny-hotel-brooklyn',
        name: '1 Hotel Brooklyn Bridge',
        neighborhood: 'DUMBO',
        address: '60 Furman St, Brooklyn, NY',
        note: '$$$ · Skyline e promenade',
        image: '/images/destinations/nova-york/curated-hotel-3.jpg',
        imageIllustrative: true,
        color: '#8B7CF6',
        pin: { top: '74%', left: '70%' }
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
        image: '/images/destinations/toquio/curated-region-0.jpg',
        pin: { top: '40%', left: '30%' },
        hotel: 'Business hotels na estação Shinjuku'
      },
      {
        id: 'shibuya',
        name: 'Shibuya',
        blurb: 'Cruzamento e pop',
        color: '#F47A20',
        image: '/images/destinations/toquio/curated-region-1.jpg',
        pin: { top: '58%', left: '38%' },
        hotel: 'Hotéis modernos perto do scrambling'
      },
      {
        id: 'asakusa',
        name: 'Asakusa & Ueno',
        blurb: 'Templos e tradição',
        color: '#96AB21',
        image: '/images/destinations/toquio/curated-region-2.jpg',
        pin: { top: '32%', left: '68%' },
        hotel: 'Ryokans e hotéis em Asakusa'
      },
      {
        id: 'ginza',
        name: 'Ginza & Tokyo Tower',
        blurb: 'Elegância e vista',
        color: '#8B7CF6',
        image: '/images/destinations/toquio/curated-region-3.jpg',
        pin: { top: '52%', left: '55%' },
        hotel: 'Hotéis de luxo em Ginza'
      }
    ],
    hotels: [
      {
        id: 'tokyo-hotel-shinjuku',
        name: 'Hotel Gracery Shinjuku',
        neighborhood: 'Shinjuku',
        address: '1-19-1 Kabukicho, Shinjuku, Tokyo',
        note: '¥¥ · Ícone Godzilla na estação',
        image: '/images/destinations/toquio/curated-hotel-0.jpg',
        imageIllustrative: true,
        color: '#5B8DEF',
        pin: { top: '38%', left: '28%' }
      },
      {
        id: 'tokyo-hotel-shibuya',
        name: 'Shibuya Stream Excel Hotel Tokyu',
        neighborhood: 'Shibuya',
        address: '3-21-3 Shibuya, Tokyo',
        note: '¥¥¥ · Moderno no scrambling',
        image: '/images/destinations/toquio/curated-hotel-1.jpg',
        imageIllustrative: true,
        color: '#F47A20',
        pin: { top: '60%', left: '36%' }
      },
      {
        id: 'tokyo-hotel-asakusa',
        name: 'Wired Hotel Asakusa',
        neighborhood: 'Asakusa',
        address: '2-16-2 Asakusa, Taito, Tokyo',
        note: '¥¥ · Design perto do Sensō-ji',
        image: '/images/destinations/toquio/curated-hotel-2.jpg',
        imageIllustrative: true,
        color: '#96AB21',
        pin: { top: '30%', left: '70%' }
      },
      {
        id: 'tokyo-hotel-ginza',
        name: 'Mitsui Garden Hotel Ginza',
        neighborhood: 'Ginza',
        address: '8-13-1 Ginza, Chuo, Tokyo',
        note: '¥¥¥ · Base elegante em Ginza',
        image: '/images/destinations/toquio/curated-hotel-3.jpg',
        imageIllustrative: true,
        color: '#8B7CF6',
        pin: { top: '54%', left: '57%' }
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
        image: '/images/destinations/londres/curated-region-0.jpg',
        pin: { top: '55%', left: '42%' },
        hotel: 'Hotéis perto de Westminster'
      },
      {
        id: 'southbank',
        name: 'South Bank & Tower Bridge',
        blurb: 'Rio e skyline',
        color: '#F47A20',
        image: '/images/destinations/londres/curated-region-1.jpg',
        pin: { top: '62%', left: '62%' },
        hotel: 'Hotéis com vista do Tâmisa'
      },
      {
        id: 'buckingham',
        name: 'Buckingham & Parks',
        blurb: 'Palácio e verde',
        color: '#96AB21',
        image: '/images/destinations/londres/curated-region-2.jpg',
        pin: { top: '48%', left: '30%' },
        hotel: 'Belgravia e Hyde Park'
      },
      {
        id: 'city',
        name: 'City & East End',
        blurb: 'História e street food',
        color: '#8B7CF6',
        image: '/images/destinations/londres/curated-region-3.jpg',
        pin: { top: '38%', left: '58%' },
        hotel: 'Shoreditch e Clerkenwell'
      }
    ],
    hotels: [
      {
        id: 'london-hotel-westminster',
        name: 'Park Plaza Westminster Bridge',
        neighborhood: 'South Bank · Westminster',
        address: '200 Westminster Bridge Rd, London',
        note: '££ · Vista do Big Ben',
        image: '/images/destinations/londres/curated-hotel-0.jpg',
        imageIllustrative: true,
        color: '#5B8DEF',
        pin: { top: '57%', left: '40%' }
      },
      {
        id: 'london-hotel-southbank',
        name: 'CitizenM Tower of London',
        neighborhood: 'Tower Hill',
        address: '40 Trinity Square, London',
        note: '££ · Design perto da Tower Bridge',
        image: '/images/destinations/londres/curated-hotel-1.jpg',
        imageIllustrative: true,
        color: '#F47A20',
        pin: { top: '64%', left: '64%' }
      },
      {
        id: 'london-hotel-buckingham',
        name: 'The Rubens at the Palace',
        neighborhood: 'Victoria · Buckingham',
        address: '39 Buckingham Palace Rd, London',
        note: '£££ · Frente ao palácio',
        image: '/images/destinations/londres/curated-hotel-2.jpg',
        imageIllustrative: true,
        color: '#96AB21',
        pin: { top: '46%', left: '28%' }
      },
      {
        id: 'london-hotel-shoreditch',
        name: 'The Hoxton Shoreditch',
        neighborhood: 'Shoreditch',
        address: '81 Great Eastern St, London',
        note: '££ · Street food e nightlife',
        image: '/images/destinations/londres/curated-hotel-3.jpg',
        imageIllustrative: true,
        color: '#8B7CF6',
        pin: { top: '36%', left: '60%' }
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
        image: '/images/destinations/roma/curated-region-0.jpg',
        pin: { top: '58%', left: '58%' },
        hotel: 'Monti, a poucos passos do Coliseu'
      },
      {
        id: 'vaticano',
        name: 'Vaticano',
        blurb: 'Capela e praça',
        color: '#5B8DEF',
        image: '/images/destinations/roma/curated-region-1.jpg',
        pin: { top: '40%', left: '22%' },
        hotel: 'Prati, prático para o Vaticano'
      },
      {
        id: 'centro',
        name: 'Centro Storico',
        blurb: 'Fontana e praças',
        color: '#8B7CF6',
        image: '/images/destinations/roma/curated-region-2.jpg',
        pin: { top: '45%', left: '48%' },
        hotel: 'Piazza Navona e Pantheon'
      },
      {
        id: 'trastevere',
        name: 'Trastevere',
        blurb: 'Noite e trattorias',
        color: '#96AB21',
        image: '/images/destinations/roma/curated-region-3.jpg',
        pin: { top: '68%', left: '38%' },
        hotel: 'Trastevere para jantares a pé'
      }
    ],
    hotels: [
      {
        id: 'roma-hotel-palazzo-dama',
        name: 'Hotel Palazzo Dama',
        neighborhood: 'Flaminio · Piazza del Popolo',
        address: 'Lungotevere Arnaldo da Brescia 2, 00196 Roma',
        note: '€€€ · Boutique no Tibre, perto da Piazza del Popolo',
        image: '/images/destinations/roma/curated-hotel-0.jpg',
        imageIllustrative: true,
        color: '#B45309',
        pin: { top: '28%', left: '44%' }
      },
      {
        id: 'roma-hotel-coliseu',
        name: 'Hotel Forum',
        neighborhood: 'Monti · Coliseu',
        address: 'Via Tor de’ Conti 25, 00184 Roma',
        note: '€€€ · Terraço com vista do Fórum e Coliseu',
        image: '/images/destinations/roma/curated-hotel-1.jpg',
        imageIllustrative: true,
        color: '#F47A20',
        pin: { top: '60%', left: '60%' }
      },
      {
        id: 'roma-hotel-vaticano',
        name: 'Hotel dei Mellini',
        neighborhood: 'Prati',
        address: 'Via Muzio Clementi 81, 00193 Roma',
        note: '€€ · Entre Piazza del Popolo e o Vaticano',
        image: '/images/destinations/roma/curated-hotel-2.jpg',
        imageIllustrative: true,
        color: '#5B8DEF',
        pin: { top: '36%', left: '24%' }
      },
      {
        id: 'roma-hotel-centro',
        name: 'Hotel Pantheon',
        neighborhood: 'Centro Storico',
        address: 'Via dei Pastini 131, 00186 Roma',
        note: '€€€ · A passos do Pantheon e da Fontana di Trevi',
        image: '/images/destinations/roma/curated-hotel-3.jpg',
        imageIllustrative: true,
        color: '#8B7CF6',
        pin: { top: '47%', left: '50%' }
      },
      {
        id: 'roma-hotel-trastevere',
        name: 'Hotel Santa Maria',
        neighborhood: 'Trastevere',
        address: 'Vicolo del Piede 2, 00153 Roma',
        note: '€€ · Pátio e trattorias a pé da Santa Maria',
        image: '/images/destinations/roma/curated-hotel-4.jpg',
        imageIllustrative: true,
        color: '#96AB21',
        pin: { top: '70%', left: '36%' }
      }
    ]
  },

  'como-planejar-viagem-istambul': {
    facts: [
      { value: '4 – 5 dias', label: 'Tempo ideal', tone: 'green' },
      { value: '₺ 1.500 – 2.500', label: 'Por dia (média)', tone: 'yellow' },
      { value: 'Istanbulkart', label: 'Metrô, bondinho e ferry', tone: 'orange' },
      { value: 'Mesquitas & palácios', label: 'Chegue cedo', tone: 'blue' }
    ],
    regions: [
      {
        id: 'sultanahmet',
        name: 'Sultanahmet',
        blurb: 'Hagia Sophia e Azul',
        color: '#5B8DEF',
        image: '/images/destinations/istambul/curated-region-0.jpg',
        pin: { top: '55%', left: '55%' },
        hotel: 'Hotéis históricos em Sultanahmet'
      },
      {
        id: 'azul',
        name: 'Mesquita Azul & Hipódromo',
        blurb: 'Ícones otomanos',
        color: '#F47A20',
        image: '/images/destinations/istambul/curated-region-1.jpg',
        pin: { top: '62%', left: '48%' },
        hotel: 'Pousadas com terraço perto da Azul'
      },
      {
        id: 'bosforo',
        name: 'Bósforo & Karaköy',
        blurb: 'Travessia e vista',
        color: '#0F766E',
        image: '/images/destinations/istambul/curated-region-2.jpg',
        pin: { top: '38%', left: '40%' },
        hotel: 'Karaköy e Galata com vista do estreito'
      },
      {
        id: 'bazaar',
        name: 'Grande Bazar',
        blurb: 'Mercados e especiarias',
        color: '#8B7CF6',
        image: '/images/destinations/istambul/curated-region-3.jpg',
        pin: { top: '48%', left: '62%' },
        hotel: 'Beyazıt e Eminönü'
      }
    ],
    hotels: [
      {
        id: 'ist-hotel-sultanahmet',
        name: 'Hotel Ibrahim Pasha',
        neighborhood: 'Sultanahmet',
        address: 'Terzihane Sokak 7, Sultanahmet, Istanbul',
        note: '₺₺ · Boutique perto da Hagia Sophia',
        image: '/images/destinations/istambul/curated-hotel-0.jpg',
        imageIllustrative: true,
        color: '#5B8DEF',
        pin: { top: '52%', left: '58%' }
      },
      {
        id: 'ist-hotel-azul',
        name: 'Sultanahmet Palace Hotel',
        neighborhood: 'Mesquita Azul',
        address: 'Torun Sokak 19, Sultanahmet, Istanbul',
        note: '₺₺ · Terraço com vista otomana',
        image: '/images/destinations/istambul/curated-hotel-1.jpg',
        imageIllustrative: true,
        color: '#F47A20',
        pin: { top: '66%', left: '46%' }
      },
      {
        id: 'ist-hotel-bosforo',
        name: 'Tomtom Suites',
        neighborhood: 'Karaköy / Galata',
        address: 'Boğazkesen Cad. 18, Beyoğlu, Istanbul',
        note: '₺₺₺ · Vista do Bósforo',
        image: '/images/destinations/istambul/curated-hotel-2.jpg',
        imageIllustrative: true,
        color: '#0F766E',
        pin: { top: '36%', left: '38%' }
      },
      {
        id: 'ist-hotel-bazaar',
        name: 'Sirkeci Mansion',
        neighborhood: 'Sirkeci · Grande Bazar',
        address: 'Taya Hatun Cad. 5, Sirkeci, Istanbul',
        note: '₺₺ · Perto de Beyazıt e Eminönü',
        image: '/images/destinations/istambul/curated-hotel-3.jpg',
        imageIllustrative: true,
        color: '#8B7CF6',
        pin: { top: '48%', left: '66%' }
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
        image: '/images/destinations/dubai/curated-region-0.jpg',
        pin: { top: '48%', left: '48%' },
        hotel: 'Downtown com vista do Burj'
      },
      {
        id: 'marina',
        name: 'Dubai Marina',
        blurb: 'Skyline e promenade',
        color: '#0F766E',
        image: '/images/destinations/dubai/curated-region-1.jpg',
        pin: { top: '62%', left: '28%' },
        hotel: 'Marina e JBR com praia'
      },
      {
        id: 'arab',
        name: 'Jumeirah & Burj Al Arab',
        blurb: 'Praia e luxo',
        color: '#F47A20',
        image: '/images/destinations/dubai/curated-region-2.jpg',
        pin: { top: '58%', left: '38%' },
        hotel: 'Resorts em Jumeirah Beach'
      },
      {
        id: 'old',
        name: 'Old Dubai',
        blurb: 'Souks e abra',
        color: '#8B7CF6',
        image: '/images/destinations/dubai/curated-region-3.jpg',
        pin: { top: '32%', left: '55%' },
        hotel: 'Al Fahidi e Creek'
      }
    ],
    hotels: [
      {
        id: 'dubai-hotel-downtown',
        name: 'Address Downtown',
        neighborhood: 'Downtown Dubai',
        address: 'Mohammed Bin Rashid Blvd, Downtown Dubai',
        note: 'AED $$$ · Vista do Burj Khalifa',
        image: '/images/destinations/dubai/curated-hotel-0.jpg',
        imageIllustrative: true,
        color: '#5B8DEF',
        pin: { top: '46%', left: '50%' }
      },
      {
        id: 'dubai-hotel-marina',
        name: 'Rove Dubai Marina',
        neighborhood: 'Dubai Marina',
        address: 'Al Seba Street, Dubai Marina',
        note: 'AED $$ · Promenade e JBR',
        image: '/images/destinations/dubai/curated-hotel-1.jpg',
        imageIllustrative: true,
        color: '#0F766E',
        pin: { top: '64%', left: '26%' }
      },
      {
        id: 'dubai-hotel-jumeirah',
        name: 'Jumeirah Beach Hotel',
        neighborhood: 'Jumeirah Beach',
        address: 'Jumeirah Beach Rd, Dubai',
        note: 'AED $$$ · Praia perto do Burj Al Arab',
        image: '/images/destinations/dubai/curated-hotel-2.jpg',
        imageIllustrative: true,
        color: '#F47A20',
        pin: { top: '56%', left: '36%' }
      },
      {
        id: 'dubai-hotel-old',
        name: 'XVA Art Hotel',
        neighborhood: 'Al Fahidi · Old Dubai',
        address: 'Al Fahidi Historical Neighbourhood, Dubai',
        note: 'AED $$ · Al Fahidi e Creek',
        image: '/images/destinations/dubai/curated-hotel-3.jpg',
        imageIllustrative: true,
        color: '#8B7CF6',
        pin: { top: '30%', left: '57%' }
      }
    ]
  }
};

export function getThirtySeconds(guide) {
  const entry = GUIDE_THIRTY_SECONDS[guide?.slug];
  if (!entry) return { facts: [], regions: [], hotels: [] };
  return {
    ...entry,
    regions: entry.regions.map((region, i) => ({ ...region,
      image: guideImage(guide, `region-${i}`),
      listImage: guideImage(guide, `region-list-${i}`)
    })),
    hotels: entry.hotels.map((hotel, i) => ({ ...hotel,
      image: guideImage(guide, `hotel-${i}`),
      listImage: guideImage(guide, `hotel-list-${i}`)
    }))
  };
}

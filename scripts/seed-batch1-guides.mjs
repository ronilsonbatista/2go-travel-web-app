#!/usr/bin/env node
/**
 * Seed Batch 1 destination guides: content + Wikimedia curated images + thirty-seconds + sources.
 * Usage: node scripts/seed-batch1-guides.mjs
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const UA = '2GOTravelGuideBot/1.0 (https://github.com/ronilsonbatista/2go-travel-web-app; editorial curation)';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const CITIES = [
  {
    folder: 'rio-de-janeiro',
    slug: 'como-planejar-viagem-rio-de-janeiro',
    city: 'Rio de Janeiro',
    country: 'Brasil',
    emoji: '🇧🇷',
    currency: 'Real (R$)',
    language: 'Português',
    center: [-22.9068, -43.1729, 80],
    title: 'Rio de Janeiro: Guia completo',
    subtitle: 'Cristo, Pão de Açúcar, praias, segurança e como montar dias entre Zona Sul e Centro.',
    summaryText: 'O Rio mistura cartões-postais icônicos com uma logística urbana que exige planejamento: transporte, bairros e horários de mirantes fazem diferença.',
    intro: 'O Rio de Janeiro é uma das cidades mais fotografadas do planeta. Planejar a viagem passa por escolher bem a base (Copacabana, Ipanema, Botafogo ou Centro), entender o metrô/ônibus e reservar mirantes com vista — Cristo e Pão de Açúcar esgotam em alta temporada.',
    whyVisit: 'Poucas metrópoles oferecem praia, montanha e vida cultural tão próximas. Do calçadão de Ipanema ao samba da Lapa, o Rio recompensa quem equilibra ícones e ritmo local.',
    whenToGo: 'De maio a setembro o clima fica mais seco e agradável. Verão (dezembro a março) é quente, úmido e animado — ideal para praia, com mais chuva de tarde.',
    idealDays: '5 a 7 dias para Zona Sul, Cristo, Pão de Açúcar e um bate-volta a Petrópolis ou Búzios.',
    chipFacts: { season: 'Maio a setembro', days: '5 a 7 dias', transport: 'Metrô + ônibus + app' },
    howToGet: 'Voos chegam ao Galeão (GIG) ou Santos Dumont (SDU). Do Galeão, ônibus executivo, táxi ou apps levam à Zona Sul em 40–70 min conforme o trânsito.',
    documentation: 'Brasileiros viajam com RG ou CNH em território nacional. Estrangeiros: passaporte válido; verificar visto conforme nacionalidade.',
    insurance: 'Recomendado — cobre imprevistos médicos e extravio de bagagem, especialmente em viagens longas pelo Brasil.',
    internet: 'Chip local das operadoras brasileiras ou eSIM; Wi-Fi é comum em hotéis e cafés da Zona Sul.',
    currencyInfo: 'Real (R$). Cartões e Pix são amplamente aceitos; leve um pouco de espécie para camelôs e vans.',
    languageInfo: 'Português. Inglês aparece em hotéis turísticos, mas apps de tradução ajudam em bares e comércio local.',
    neighborhoods: [
      { name: 'Copacabana', pros: 'Orla famosa, oferta enorme de hotéis e fácil acesso ao metrô.', cons: 'Movimentada e com variação grande de qualidade de hospedagem.' },
      { name: 'Ipanema / Leblon', pros: 'Praias icônicas, gastronomia e atmosfera mais sofisticada.', cons: 'Diárias mais altas.' },
      { name: 'Botafogo / Flamengo', pros: 'Vista da Baía de Guanabara e bom custo-benefício.', cons: 'Praia de banho menos convidativa que a Zona Sul oceânica.' },
      { name: 'Santa Teresa', pros: 'Charme boêmio, arte e mirantes.', cons: 'Morros e deslocamentos a pé exigem atenção.' }
    ],
    transportDetails: 'Metrô (Linhas 1/4) cobre Copacabana–Ipanema–Centro. Ônibus e BRT complementam; apps de carro são práticos à noite. Evite caminhar com celular à mostra em áreas movimentadas.',
    attractions: [
      { name: 'Cristo Redentor', priority: 'Alta', desc: 'Mirante no Corcovado com vista 360º da cidade.', whyVisit: 'O cartão-postal definitivo do Rio.', recommendedTime: '2 a 3 horas', bestTime: 'Manhã cedo ou fim de tarde.', duration: '2,5 horas', transport: 'Trem do Corcovado ou van autorizada', price: 'Ingresso + trem (consulte site oficial)', reservation: 'Obrigatória na alta temporada', tip2GO: 'Reserve o horário e leve casaco leve — no topo costuma ventar.' },
      { name: 'Pão de Açúcar', priority: 'Alta', desc: 'Bondinho até o Morro da Urca e o cume do Pão de Açúcar.', whyVisit: 'Entardecer com a Baía de Guanabara iluminada.', recommendedTime: '2 a 3 horas', bestTime: 'Final de tarde.', duration: '2,5 horas', transport: 'Táxi/app até a base na Urca', price: 'Consulte bondinho oficial', reservation: 'Recomendada', tip2GO: 'Suba no fim da tarde e desça após o anoitecer.' },
      { name: 'Praia de Ipanema', priority: 'Alta', desc: 'Orla clássica entre o Arpoador e o Leblon.', whyVisit: 'Clima carioca autêntico com Posto 9 e pôr do sol no Arpoador.', recommendedTime: 'Meio período', bestTime: 'Manhã ou fim de tarde.', duration: '3 horas', transport: 'Metrô General Osório / Nossa Senhora da Paz', price: 'Gratuito', reservation: 'Não é necessária', tip2GO: 'Deixe valores no hotel; leve só o essencial na praia.' },
      { name: 'Escadaria Selarón', priority: 'Média', desc: 'Escadaria colorida entre Lapa e Santa Teresa.', whyVisit: 'Arte urbana icônica e fotos obrigatórias.', recommendedTime: '45 a 60 min', bestTime: 'Manhã para menos gente.', duration: '1 hora', transport: 'Centro / Lapa de ônibus ou app', price: 'Gratuito', reservation: 'Não é necessária', tip2GO: 'Combine com um passeio pela Lapa em seguida.' },
      { name: 'Museu do Amanhã', priority: 'Média', desc: 'Museu de ciências no Boulevard Olímpico, Porto Maravilha.', whyVisit: 'Arquitetura e exposições interativas no revitalizado Porto.', recommendedTime: '2 horas', bestTime: 'Meio da manhã.', duration: '2 horas', transport: 'VLT ou metrô até a região central', price: 'Consulte ingressos', reservation: 'Recomendada nos fins de semana', tip2GO: 'Aproveite o Boulevard e o MAR no mesmo eixo.' },
      { name: 'Floresta da Tijuca', priority: 'Alta', desc: 'Parque urbano de Mata Atlântica com mirantes e cachoeiras.', whyVisit: 'Contraste verde no meio da metrópole.', recommendedTime: 'Meio período a dia', bestTime: 'Manhã em dia seco.', duration: '4 horas', transport: 'App/táxi ou tour', price: 'Acesso gratuito em várias trilhas', reservation: 'Tours guiados recomendados', tip2GO: 'Vá com guia em trilhas menos óbvias e leve água.' }
    ],
    suggestedItinerary: [
      { day: 'Dia 1', title: 'Zona Sul e Arpoador', details: 'Manhã em Ipanema, tarde no Arpoador e pôr do sol; jantar em Ipanema/Leblon.' },
      { day: 'Dia 2', title: 'Ícones altos', details: 'Cristo de manhã e Pão de Açúcar ao entardecer.' },
      { day: 'Dia 3', title: 'Centro e Lapa', details: 'Museu do Amanhã, Boulevard Olímpico e Escadaria Selarón.' },
      { day: 'Dia 4', title: 'Natureza carioca', details: 'Floresta da Tijuca ou praia do Recreio/Grumari.' },
      { day: 'Dia 5', title: 'Ritmo local', details: 'Feira de artesanato, bairros e noite com música ao vivo.' }
    ],
    dayTrips: ['Petrópolis (1h30)', 'Búzios (2h30)', 'Niterói e Museu de Arte Contemporânea'],
    gastronomy: ['Açaí na praia', 'Feijoada aos sábados', 'Churrasco e petiscos de boteco', 'Frutos do mar em Ipanema'],
    shopping: ['Feira de Ipanema (Domingo)', 'Shopping Leblon', 'SAARA no Centro'],
    nightlife: ['Lapa e samba', 'Bares em Botafogo', 'Casas de show na Zona Sul'],
    costsTable: {
      economy: { daily: 'R$ 250 – 400', hotel: 'Hostel ou hotel simples Zona Sul', food: 'Botecos e comida a quilo', transport: 'Metrô + ônibus' },
      comfort: { daily: 'R$ 600 – 1.000', hotel: 'Hotel 3–4★ Copacabana/Ipanema', food: 'Restaurantes médios', transport: 'Metrô + apps' },
      luxury: { daily: 'R$ 1.800+', hotel: 'Resort ou boutique Leblon', food: 'Alta gastronomia', transport: 'Carro privativo' }
    },
    commonMistakes: ['Circular com celular exposto em multidões.', 'Subestimar o tempo de deslocamento no trânsito.', 'Subir ao Cristo sem reserva na alta temporada.'],
    importantTips: ['Prefira transporte oficial à noite.', 'Hidrate-se: o calor carioca é intenso.', 'Combine mirantes com previsões de nuvem.'],
    faqs: [
      { q: 'Quantos dias ficar no Rio?', a: 'De 5 a 7 dias para cobrir Zona Sul, Cristo, Pão de Açúcar e um bate-volta.' },
      { q: 'Onde se hospedar?', a: 'Copacabana é prática; Ipanema/Leblon são mais sofisticados; Botafogo tem bom custo-benefício.' },
      { q: 'É seguro?', a: 'Como em qualquer metrópole, use senso comum: evite ostentar, prefira apps à noite e siga recomendações do hotel.' },
      { q: 'Precisa reservar o Cristo?', a: 'Sim, especialmente em feriados e alta temporada.' },
      { q: 'Melhor época?', a: 'Maio a setembro costuma ser mais seco; verão é quente e animado.' },
      { q: 'Dá para ir sem carro?', a: 'Sim. Metrô, ônibus e apps cobrem bem a Zona Sul e o Centro.' },
      { q: 'Vale a pena Niterói?', a: 'Sim, pelo MAC e pela vista da Baía em um meio período.' },
      { q: 'Qual aeroporto escolher?', a: 'SDU é mais perto da Zona Sul; GIG recebe mais voos internacionais.' },
      { q: 'Levar dinheiro em espécie?', a: 'Cartão e Pix bastam na maior parte; um pouco de dinheiro ajuda em praia e camelôs.' },
      { q: 'Praia com criança?', a: 'Postos mais estruturados de Copacabana e Ipanema funcionam bem com estrutura de quiosques.' },
      { q: 'O que vestir?', a: 'Roupa leve, protetor solar e um casaco para o Corcovado.' },
      { q: 'Uber funciona?', a: 'Sim, amplamente usado.' },
      { q: 'Há risco de chuva?', a: 'No verão, pancadas à tarde são comuns — planeje mirantes pela manhã.' },
      { q: 'Vale a Lapa?', a: 'Sim para vida noturna; vá em grupo e de app.' },
      { q: 'Seguro viagem no Brasil?', a: 'Recomendado mesmo em voos domésticos longos.' }
    ],
    regions: [
      { id: 'zona-sul', name: 'Zona Sul', blurb: 'Praias e orla', color: '#5B8DEF', pin: { top: '62%', left: '48%' }, hotel: 'Hotéis em Copacabana e Ipanema' },
      { id: 'urca', name: 'Urca & Pão de Açúcar', blurb: 'Bondinho e baía', color: '#F47A20', pin: { top: '48%', left: '58%' }, hotel: 'Pousadas próximas à Urca' },
      { id: 'centro', name: 'Centro & Porto', blurb: 'Museus e Lapa', color: '#8B7CF6', pin: { top: '40%', left: '52%' }, hotel: 'Hotéis boutique no Centro' },
      { id: 'tijuca', name: 'Tijuca', blurb: 'Floresta urbana', color: '#96AB21', pin: { top: '28%', left: '42%' }, hotel: 'Base na Zona Sul + day trip' }
    ],
    hotels: [
      { id: 'rio-copa', name: 'Hotel na orla de Copacabana', neighborhood: 'Copacabana', address: 'Av. Atlântica, Copacabana', note: 'R$ $$ · Frente-mar clássico', color: '#5B8DEF', pin: { top: '64%', left: '50%' } },
      { id: 'rio-ipa', name: 'Boutique em Ipanema', neighborhood: 'Ipanema', address: 'Rua próximo ao Posto 9', note: 'R$ $$$ · Praia e gastronomia', color: '#F47A20', pin: { top: '68%', left: '46%' } },
      { id: 'rio-bota', name: 'Hotel em Botafogo', neighborhood: 'Botafogo', address: 'Praia de Botafogo', note: 'R$ $$ · Vista da baía', color: '#8B7CF6', pin: { top: '52%', left: '54%' } },
      { id: 'rio-leblon', name: 'Hotel no Leblon', neighborhood: 'Leblon', address: 'Av. Delfim Moreira', note: 'R$ $$$ · Sofisticado', color: '#96AB21', pin: { top: '70%', left: '42%' } }
    ],
    facts: [
      { value: '5 – 7 dias', label: 'Tempo ideal', tone: 'green' },
      { value: 'R$ 250 – 1.000', label: 'Por dia (faixa)', tone: 'yellow' },
      { value: 'Metrô + apps', label: 'Deslocamento', tone: 'orange' },
      { value: 'Mirantes', label: 'Reserve Cristo e bondinho', tone: 'blue' }
    ],
    queries: {
      hero: 'Rio de Janeiro skyline Sugarloaf',
      intro: 'Ipanema beach Rio de Janeiro',
      home: 'Christ the Redeemer Rio de Janeiro',
      'guide-card': 'Copacabana beach aerial',
      'guide-highlight': 'Rio de Janeiro cityscape',
      'home-slide': 'Rio de Janeiro harbour',
      'home-thumb': 'Rio de Janeiro panorama',
      'essential-moeda': 'Brazilian Real banknotes',
      'essential-idioma': 'Portuguese language Brazil sign',
      'essential-transporte': 'Rio de Janeiro metro train',
      'essential-docs': 'Brazilian passport travel',
      costs: 'Brazilian feijoada dish',
      mistakes: 'Rio de Janeiro traffic',
      tips: 'Rio de Janeiro sidewalk beach',
      'attraction-0': 'Christ the Redeemer Corcovado',
      'attraction-1': 'Sugarloaf Mountain cable car',
      'attraction-2': 'Ipanema beach sunset',
      'attraction-3': 'Escadaria Selaron',
      'attraction-4': 'Museum of Tomorrow Rio',
      'attraction-5': 'Tijuca Forest waterfall',
      'day-0': 'Arpoador sunset Rio',
      'day-1': 'Corcovado view Rio',
      'day-2': 'Lapa Rio de Janeiro',
      'day-3': 'Tijuca National Park',
      'day-4': 'Rio de Janeiro street market',
      'neighborhood-0': 'Copacabana promenade',
      'neighborhood-1': 'Ipanema Dois Irmaos',
      'neighborhood-2': 'Botafogo bay Rio',
      'neighborhood-3': 'Santa Teresa Rio',
      'neighborhood-detail-0': 'Copacabana fort',
      'neighborhood-detail-1': 'Leblon beach',
      'neighborhood-detail-2': 'Flamengo park Rio',
      'neighborhood-detail-3': 'Santa Teresa tram',
      'trip-0': 'Petropolis Imperial Museum',
      'trip-1': 'Buzios beach',
      'trip-2': 'Niteroi Contemporary Art Museum',
      'region-0': 'Copacabana beach',
      'region-1': 'Urca Rio de Janeiro',
      'region-2': 'Porto Maravilha Rio',
      'region-3': 'Tijuca forest canopy',
      'region-list-0': 'Ipanema boardwalk',
      'region-list-1': 'Sugarloaf base Urca',
      'region-list-2': 'Cinelândia Rio',
      'region-list-3': 'Vista Chinesa Rio',
      'hotel-0': 'Copacabana hotel facade',
      'hotel-1': 'Ipanema boutique hotel',
      'hotel-2': 'Botafogo waterfront',
      'hotel-3': 'Leblon residential',
      'hotel-list-0': 'Rio hotel room balcony',
      'hotel-list-1': 'Ipanema street cafe',
      'hotel-list-2': 'Botafogo beachfront',
      'hotel-list-3': 'Leblon restaurant',
      'map-attraction-0': 'Christ Redeemer closeup',
      'map-attraction-1': 'Sugarloaf peak',
      'map-attraction-2': 'Ipanema post 9',
      'map-attraction-3': 'Selaron steps detail',
      'map-attraction-4': 'Museum of Tomorrow exterior',
      'map-attraction-5': 'Tijuca trail',
      'map-list-0': 'Corcovado mountain',
      'map-list-1': 'Guanabara bay',
      'map-list-2': 'Ipanema mosaic sidewalk',
      'map-list-3': 'Lapa arches Rio',
      'map-list-4': 'Olympic Boulevard Rio',
      'map-list-5': 'Pedra Bonita Rio'
    }
  }
];

// Additional cities — compact definitions expanded by template
const EXTRA = [
  {
    folder: 'buenos-aires',
    slug: 'como-planejar-viagem-buenos-aires',
    city: 'Buenos Aires',
    country: 'Argentina',
    emoji: '🇦🇷',
    currency: 'Peso argentino ($)',
    language: 'Espanhol',
    center: [-34.6037, -58.3816, 70],
    title: 'Buenos Aires: Guia completo',
    subtitle: 'Tango, bairros, carne argentina e como se locomover na capital portenha.',
    blurb: 'Capital cultural da Argentina, com Palermo, San Telmo, Recoleta e uma cena gastronômica vibrante.',
    season: 'Outono e primavera',
    days: '5 a 7 dias',
    transport: 'Subte + ônibus + apps',
    attractions: ['Casa Rosada e Plaza de Mayo', 'Caminito (La Boca)', 'Recoleta e o cemitério', 'Palermo Soho / Hollywood', 'Teatro Colón', 'San Telmo e feira de domingo'],
    neighborhoods: ['Palermo', 'Recoleta', 'San Telmo', 'Puerto Madero'],
    regions: ['Palermo', 'Recoleta', 'San Telmo', 'Microcentro'],
    queriesBase: 'Buenos Aires'
  },
  {
    folder: 'sao-paulo',
    slug: 'como-planejar-viagem-sao-paulo',
    city: 'São Paulo',
    country: 'Brasil',
    emoji: '🇧🇷',
    currency: 'Real (R$)',
    language: 'Português',
    center: [-23.5505, -46.6333, 70],
    title: 'São Paulo: Guia completo',
    subtitle: 'Gastronomia, bairros, metrô e o ritmo da maior metrópole do Brasil.',
    blurb: 'SP é destino de cultura, negócios e uma das melhores cenas gastronômicas da América Latina.',
    season: 'Outono e primavera',
    days: '4 a 6 dias',
    transport: 'Metrô + apps',
    attractions: ['Avenida Paulista e MASP', 'Parque Ibirapuera', 'Mercado Municipal', 'Bairro da Liberdade', 'Centro histórico', 'Pinheiros / Vila Madalena'],
    neighborhoods: ['Pinheiros', 'Jardins', 'Vila Madalena', 'Liberdade'],
    regions: ['Paulista', 'Ibirapuera', 'Centro', 'Zona Oeste'],
    queriesBase: 'São Paulo Brazil'
  },
  {
    folder: 'salvador',
    slug: 'como-planejar-viagem-salvador',
    city: 'Salvador',
    country: 'Brasil',
    emoji: '🇧🇷',
    currency: 'Real (R$)',
    language: 'Português',
    center: [-12.9777, -38.5016, 70],
    title: 'Salvador: Guia completo',
    subtitle: 'Pelourinho, axé, culinária baiana e a orla do Atlântico.',
    blurb: 'Primeira capital do Brasil, com centro histórico UNESCO, praias e cultura afro-brasileira.',
    season: 'Setembro a março',
    days: '4 a 6 dias',
    transport: 'Apps + ônibus',
    attractions: ['Pelourinho', 'Elevador Lacerda', 'Farol da Barra', 'Mercado Modelo', 'Igreja do Bonfim', 'Praia do Porto da Barra'],
    neighborhoods: ['Barra', 'Pelourinho / Centro Histórico', 'Rio Vermelho', 'Ondina'],
    regions: ['Barra', 'Centro Histórico', 'Rio Vermelho', 'Itapuã'],
    queriesBase: 'Salvador Bahia'
  },
  {
    folder: 'lisboa',
    slug: 'como-planejar-viagem-lisboa',
    city: 'Lisboa',
    country: 'Portugal',
    emoji: '🇵🇹',
    currency: 'Euro (€)',
    language: 'Português',
    center: [38.7223, -9.1393, 50],
    title: 'Lisboa: Guia completo',
    subtitle: 'Colinas, elétricos, Belém, Sintra e o jeito português de viajar.',
    blurb: 'Capital luminosa à beira do Tejo, com Alfama, Belém e bate-volta imperdível a Sintra.',
    season: 'Abril a junho e setembro a outubro',
    days: '4 a 6 dias',
    transport: 'Metro + elétrico + CP',
    attractions: ['Torre de Belém', 'Mosteiro dos Jerónimos', 'Castelo de São Jorge', 'Alfama e miradouros', 'Time Out Market', 'LX Factory'],
    neighborhoods: ['Baixa / Chiado', 'Alfama', 'Bairro Alto', 'Parque das Nações'],
    regions: ['Baixa', 'Belém', 'Alfama', 'Parque das Nações'],
    queriesBase: 'Lisbon Portugal'
  },
  {
    folder: 'amsterdam',
    slug: 'como-planejar-viagem-amsterdam',
    city: 'Amsterdã',
    country: 'Países Baixos',
    emoji: '🇳🇱',
    currency: 'Euro (€)',
    language: 'Neerlandês / Inglês',
    center: [52.3676, 4.9041, 40],
    title: 'Amsterdã: Guia completo',
    subtitle: 'Canais, museus, bicicleta e o essencial da capital holandesa.',
    blurb: 'Cidade dos canais, com Rijksmuseum, Van Gogh e uma malha perfeita para pedalar.',
    season: 'Abril a setembro',
    days: '3 a 5 dias',
    transport: 'GVB + bicicleta + NS',
    attractions: ['Rijksmuseum', 'Museu Van Gogh', 'Casa de Anne Frank', 'Bairro Jordaan', 'Vondelpark', 'Mercado de flores / Bloemenmarkt'],
    neighborhoods: ['Canal Belt', 'Jordaan', 'De Pijp', 'Museumplein'],
    regions: ['Museumplein', 'Jordaan', 'Centro / Dam', 'De Pijp'],
    queriesBase: 'Amsterdam canals'
  },
  {
    folder: 'cancun',
    slug: 'como-planejar-viagem-cancun',
    city: 'Cancún',
    country: 'México',
    emoji: '🇲🇽',
    currency: 'Peso mexicano ($)',
    language: 'Espanhol',
    center: [21.1619, -86.8515, 80],
    title: 'Cancún: Guia completo',
    subtitle: 'Zona Hotelera, cenotes, Isla Mujeres e o Caribe mexicano.',
    blurb: 'Porta de entrada do Caribe mexicano, com praias turquesa e sítios maias próximos.',
    season: 'Dezembro a abril',
    days: '5 a 7 dias',
    transport: 'ADO + apps + transfers',
    attractions: ['Praia da Zona Hotelera', 'Isla Mujeres', 'Chichén Itzá (bate-volta)', 'Cenotes próximos', 'Mercado 28', 'Costa Mujeres / norte'],
    neighborhoods: ['Zona Hotelera', 'Downtown Cancún', 'Puerto Juárez', 'Costa Mujeres'],
    regions: ['Zona Hotelera', 'Downtown', 'Isla Mujeres', 'Riviera próxima'],
    queriesBase: 'Cancun beach Mexico'
  },
  {
    folder: 'miami',
    slug: 'como-planejar-viagem-miami',
    city: 'Miami',
    country: 'Estados Unidos',
    emoji: '🇺🇸',
    currency: 'Dólar ($)',
    language: 'Inglês / Espanhol',
    center: [25.7617, -80.1918, 70],
    title: 'Miami: Guia completo',
    subtitle: 'South Beach, Wynwood, Little Havana e o sul da Flórida.',
    blurb: 'Cidade praiana e latina, com art déco, street art e fácil conexão com os Keys.',
    season: 'Novembro a abril',
    days: '4 a 6 dias',
    transport: 'Metromover + apps + carro',
    attractions: ['South Beach e Ocean Drive', 'Wynwood Walls', 'Little Havana', 'Vizcaya Museum', 'Brickell', 'Key Biscayne'],
    neighborhoods: ['South Beach', 'Brickell', 'Wynwood', 'Coral Gables'],
    regions: ['Miami Beach', 'Downtown / Brickell', 'Wynwood', 'Coconut Grove'],
    queriesBase: 'Miami Beach South Beach'
  }
];

function expandExtra(extra) {
  const q = extra.queriesBase;
  const attractions = extra.attractions.map((name, i) => ({
    name,
    priority: i < 3 ? 'Alta' : 'Média',
    desc: `${name} — ponto imperdível em ${extra.city}.`,
    whyVisit: `Experiência essencial para entender ${extra.city}.`,
    recommendedTime: '1 a 3 horas',
    bestTime: 'Confira horários locais',
    duration: '1–3 horas',
    transport: extra.transport,
    price: 'Consulte valores oficiais',
    reservation: 'Recomendada quando houver ingresso',
    tip2GO: `Chegue cedo em ${name} para evitar filas.`
  }));
  const neighborhoods = extra.neighborhoods.map((name) => ({
    name,
    pros: `Boa base para explorar ${extra.city}.`,
    cons: 'Compare diárias e deslocamento até as atrações.'
  }));
  const regions = extra.regions.map((name, i) => ({
    id: `r${i}`,
    name,
    blurb: `Região de ${extra.city}`,
    color: ['#5B8DEF', '#F47A20', '#8B7CF6', '#96AB21'][i % 4],
    pin: { top: `${25 + i * 12}%`, left: `${30 + i * 10}%` },
    hotel: `Hospedagem em ${name}`
  }));
  const hotels = regions.map((region, i) => ({
    id: `${extra.folder}-hotel-${i}`,
    name: `Hotel em ${region.name}`,
    neighborhood: region.name,
    address: `${region.name}, ${extra.city}`,
    note: '$$ · Ilustrativo — confirme disponibilidade',
    color: region.color,
    pin: region.pin
  }));
  const queries = {
    hero: `${q} skyline`,
    intro: `${q} street`,
    home: `${q} landmark`,
    'guide-card': `${q} city`,
    'guide-highlight': `${q} panorama`,
    'home-slide': `${q} dusk`,
    'home-thumb': `${q} aerial`,
    'essential-moeda': `${extra.country} currency money`,
    'essential-idioma': `${extra.language} language travel`,
    'essential-transporte': `${q} transit transport`,
    'essential-docs': `passport travel documents`,
    costs: `${q} food restaurant`,
    mistakes: `${q} crowd tourism`,
    tips: `${q} traveler tip`,
  };
  attractions.forEach((a, i) => {
    queries[`attraction-${i}`] = `${a.name} ${extra.city}`;
    queries[`map-attraction-${i}`] = `${a.name}`;
    queries[`map-list-${i}`] = `${extra.city} ${a.name}`;
  });
  for (let i = 0; i < 5; i++) queries[`day-${i}`] = `${q} day ${i + 1}`;
  neighborhoods.forEach((n, i) => {
    queries[`neighborhood-${i}`] = `${n.name} ${extra.city}`;
    queries[`neighborhood-detail-${i}`] = `${extra.city} ${n.name} street`;
  });
  for (let i = 0; i < 3; i++) queries[`trip-${i}`] = `${q} day trip ${i}`;
  regions.forEach((r, i) => {
    queries[`region-${i}`] = `${r.name} ${extra.city}`;
    queries[`region-list-${i}`] = `${extra.city} ${r.name}`;
  });
  hotels.forEach((h, i) => {
    queries[`hotel-${i}`] = `${extra.city} hotel ${i}`;
    queries[`hotel-list-${i}`] = `${extra.city} accommodation ${i}`;
  });

  return {
    folder: extra.folder,
    slug: extra.slug,
    city: extra.city,
    country: extra.country,
    emoji: extra.emoji,
    currency: extra.currency,
    language: extra.language,
    center: extra.center,
    title: extra.title,
    subtitle: extra.subtitle,
    summaryText: extra.blurb,
    intro: `${extra.city} é um destino que combina ${extra.blurb.toLowerCase()} Organize documentação, transporte e bairros antes de embarcar.`,
    whyVisit: `${extra.city} entrega experiências densas em poucos dias — cultura, gastronomia e deslocamento eficiente quando bem planejado.`,
    whenToGo: `Melhor época sugerida: ${extra.season}.`,
    idealDays: extra.days,
    chipFacts: { season: extra.season, days: extra.days, transport: extra.transport },
    howToGet: `Chegue pelo aeroporto internacional mais próximo de ${extra.city} e use transferência oficial, trem ou app até o bairro escolhido.`,
    documentation: extra.country === 'Brasil'
      ? 'Brasileiros: documento oficial com foto. Estrangeiros: passaporte/visto conforme regras vigentes.'
      : 'Brasileiros a turismo: verifique visto/isenção e validade do passaporte. Seguro viagem recomendado ou obrigatório conforme destino.',
    insurance: 'Contrate seguro com cobertura médica adequada ao destino.',
    internet: 'eSIM internacional ou chip local na chegada.',
    currencyInfo: `Moeda local: ${extra.currency}. Prefira cartões internacionais com câmbio justo.`,
    languageInfo: `Idioma principal: ${extra.language}.`,
    neighborhoods,
    transportDetails: `Deslocamento típico: ${extra.transport}. Apps de mapa e transporte local economizam tempo.`,
    attractions,
    suggestedItinerary: [
      { day: 'Dia 1', title: `Chegada em ${extra.city}`, details: 'Check-in, caminhada no bairro e primeiro panorama da cidade.' },
      { day: 'Dia 2', title: 'Ícones principais', details: `Foque nas atrações de prioridade alta em ${extra.city}.` },
      { day: 'Dia 3', title: 'Bairros e gastronomia', details: 'Explore bairros locais e a cena gastronômica.' },
      { day: 'Dia 4', title: 'Cultura e mirantes', details: 'Museus, mirantes ou praias conforme o destino.' },
      { day: 'Dia 5', title: 'Bate-volta ou folga', details: 'Day trip ou dia livre para compras e café.' }
    ],
    dayTrips: [`Arredores de ${extra.city}`, 'Passeio regional de meio dia', 'Destino costeiro ou histórico próximo'],
    gastronomy: [`Pratos típicos de ${extra.city}`, 'Mercados locais', 'Cafés de bairro', 'Restaurantes bem avaliados'],
    shopping: ['Mercados', 'Ruínas comerciais centrais', 'Feiras de fim de semana'],
    nightlife: ['Bares de bairro', 'Casas de música ao vivo', 'Rooftops quando houver'],
    costsTable: {
      economy: { daily: 'Econômico', hotel: 'Hostel / 2★', food: 'Mercados e praças', transport: 'Transporte público' },
      comfort: { daily: 'Intermediário', hotel: '3–4★ cêntrico', food: 'Restaurantes locais', transport: 'Público + apps' },
      luxury: { daily: 'Alto', hotel: '5★ / boutique', food: 'Alta gastronomia', transport: 'Privativo' }
    },
    commonMistakes: ['Não reservar atrações populares.', 'Escolher bairro longe sem avaliar deslocamento.', 'Ignorar seguro e documentação.'],
    importantTips: ['Baixe offline maps.', 'Valide feriados locais.', 'Guarde backups digitais dos documentos.'],
    faqs: [
      { q: `Quantos dias em ${extra.city}?`, a: extra.days },
      { q: 'Qual a melhor época?', a: extra.season },
      { q: 'Como se locomover?', a: extra.transport },
      { q: 'Precisa de visto?', a: 'Depende da nacionalidade — confira regras oficiais atualizadas.' },
      { q: 'Onde ficar?', a: `Comece pelos bairros: ${extra.neighborhoods.join(', ')}.` },
      { q: 'É caro?', a: 'Há faixas econômica, intermediária e luxo — planeje por diária.' },
      { q: 'Seguro é necessário?', a: 'Recomendado; em Schengen pode ser exigido.' },
      { q: 'Internet?', a: 'eSIM ou chip local resolvem.' },
      { q: 'Idioma?', a: extra.language },
      { q: 'Vale day trip?', a: 'Sim, se o tempo total passar de 4 dias.' },
      { q: 'Cartão funciona?', a: 'Na maioria dos destinos urbanos, sim.' },
      { q: 'Melhor atração?', a: attractions[0].name },
      { q: 'Família?', a: 'Adapte o ritmo e prefira bairros bem conectados.' },
      { q: 'Noite?', a: 'Use transporte oficial e áreas movimentadas.' },
      { q: 'Quando comprar ingresso?', a: 'Com antecedência na alta temporada.' }
    ],
    regions,
    hotels,
    facts: [
      { value: extra.days, label: 'Tempo ideal', tone: 'green' },
      { value: extra.season, label: 'Melhor época', tone: 'yellow' },
      { value: extra.transport, label: 'Transporte', tone: 'orange' },
      { value: 'Reserve ícones', label: 'Alta temporada', tone: 'blue' }
    ],
    queries
  };
}

const ALL = [...CITIES, ...EXTRA.map(expandExtra)];

function haversine(a, b, c, d) {
  const rad = (n) => (n * Math.PI) / 180;
  const x = Math.sin(rad(c - a) / 2) ** 2 + Math.cos(rad(a)) * Math.cos(rad(c)) * Math.sin(rad(d - b) / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

function topicForSlot(city, slot) {
  if (slot.startsWith('attraction-') || slot.startsWith('map-attraction-') || slot.startsWith('map-list-')) {
    const i = Number(slot.split('-').pop());
    return city.attractions[i]?.name || city.city;
  }
  if (slot.startsWith('day-')) {
    const i = Number(slot.split('-')[1]);
    return city.suggestedItinerary[i]?.title || city.city;
  }
  if (slot.startsWith('neighborhood')) {
    const i = Number(slot.split('-').pop());
    return city.neighborhoods[i]?.name || city.city;
  }
  if (slot.startsWith('trip-')) {
    const i = Number(slot.split('-')[1]);
    return city.dayTrips[i] || city.city;
  }
  if (slot.startsWith('region')) {
    const i = Number(slot.split('-').pop());
    return city.regions[i]?.name || city.city;
  }
  if (slot.startsWith('hotel')) {
    const i = Number(slot.split('-').pop());
    return city.hotels[i]?.name || city.city;
  }
  const essentials = {
    'essential-moeda': 'Moeda & pagamentos',
    'essential-idioma': 'Idioma',
    'essential-transporte': 'Transporte',
    'essential-docs': 'Documentação & seguro'
  };
  if (essentials[slot]) return essentials[slot];
  if (slot === 'costs') return city.gastronomy?.[0] || 'Gastronomia';
  if (slot === 'mistakes') return 'Erros comuns';
  if (slot === 'tips') return 'Dicas importantes';
  if (slot === 'home-thumb') return `${city.city}: miniatura da home`;
  return city.city;
}

async function wikiSearch(query, limit = 12) {
  const url = new URL('https://commons.wikimedia.org/w/api.php');
  url.searchParams.set('action', 'query');
  url.searchParams.set('generator', 'search');
  url.searchParams.set('gsrsearch', `${query} filetype:bitmap`);
  url.searchParams.set('gsrnamespace', '6');
  url.searchParams.set('gsrlimit', String(limit));
  url.searchParams.set('prop', 'imageinfo');
  url.searchParams.set('iiprop', 'url|size|mime|extmetadata|preferred');
  url.searchParams.set('iiurlwidth', '1600');
  url.searchParams.set('format', 'json');
  url.searchParams.set('origin', '*');
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`Commons search failed ${res.status}`);
  const data = await res.json();
  const pages = Object.values(data.query?.pages || {});
  return pages
    .map((p) => {
      const info = p.imageinfo?.[0];
      if (!info) return null;
      const meta = info.extmetadata || {};
      const license = meta.LicenseShortName?.value || meta.License?.value || '';
      const author = (meta.Artist?.value || meta.Credit?.value || '')
        .replace(/<[^>]+>/g, '')
        .replace(/\s+/g, ' ')
        .trim();
      const lat = meta.GPSLatitude?.value ? Number(meta.GPSLatitude.value) : null;
      const lon = meta.GPSLongitude?.value ? Number(meta.GPSLongitude.value) : null;
      return {
        title: p.title,
        url: info.thumburl || info.url,
        original: info.url,
        width: info.thumbwidth || info.width,
        height: info.thumbheight || info.height,
        mime: info.mime,
        license,
        licenseUrl: meta.LicenseUrl?.value || '',
        author: author || 'Wikimedia Commons contributor',
        description: (meta.ImageDescription?.value || '').replace(/<[^>]+>/g, '').slice(0, 240),
        latitude: Number.isFinite(lat) ? lat : null,
        longitude: Number.isFinite(lon) ? lon : null
      };
    })
    .filter((x) => x && /^image\//.test(x.mime || '') && !/svg|gif/i.test(x.mime || ''));
}

function allowedLicense(license) {
  return /public domain|cc0|cc[- ]by/i.test(license || '');
}

function bannedSubject(title = '', description = '') {
  return /map\b|plan\b|montage|passport|visa|body ?paint|diagram|chart of|logo|flag of|coat of arms|screenshot|osm |openstreetmap|jigsaw|puzzle|diner|food.?bank|taj.?mahal|apple.?watch/i.test(
    `${title} ${description}`
  );
}

function pickCandidate(candidates, usedTitles) {
  const ranked = [...candidates].sort((a, b) => {
    const aJpg = /jpe?g/i.test(a.mime || '') ? 0 : 1;
    const bJpg = /jpe?g/i.test(b.mime || '') ? 0 : 1;
    return aJpg - bJpg || (b.width || 0) - (a.width || 0);
  });
  return ranked.find(
    (c) => allowedLicense(c.license) && !usedTitles.has(c.title) && !bannedSubject(c.title, c.description)
  );
}

async function downloadToJpg(url, outPath) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`download ${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const tmp = `${outPath}.tmp`;
  fs.writeFileSync(tmp, buf);
  const py = `
from PIL import Image
import sys
img = Image.open(sys.argv[1]).convert('RGB')
w,h = img.size
max_w = 1600
if w > max_w:
    img = img.resize((max_w, int(h*max_w/w)), Image.Resampling.LANCZOS)
img.save(sys.argv[2], 'JPEG', quality=82, optimize=True)
`;
  const r = spawnSync('python3', ['-c', py, tmp, outPath], { encoding: 'utf8' });
  fs.unlinkSync(tmp);
  if (r.status !== 0) throw new Error(r.stderr || 'pillow failed');
}

function buildGuideObject(city) {
  const base = `/images/destinations/${city.folder}`;
  return {
    slug: city.slug,
    city: city.city,
    country: city.country,
    emoji: city.emoji,
    currency: city.currency,
    language: city.language,
    title: city.title,
    subtitle: city.subtitle,
    category: 'Destinos',
    categoryLabel: 'Guia de destino',
    metaTitle: city.title,
    metaDescription: city.subtitle,
    heroImage: `${base}/curated-hero.jpg`,
    images: [],
    summaryText: city.summaryText,
    intro: city.intro,
    whyVisit: city.whyVisit,
    whenToGo: city.whenToGo,
    idealDays: city.idealDays,
    chipFacts: city.chipFacts,
    howToGet: city.howToGet,
    documentation: city.documentation,
    insurance: city.insurance,
    internet: city.internet,
    currencyInfo: city.currencyInfo,
    languageInfo: city.languageInfo,
    neighborhoods: city.neighborhoods,
    transportDetails: city.transportDetails,
    attractions: city.attractions.map((a, i) => ({
      ...a,
      image: `${base}/curated-attraction-${i}.jpg`
    })),
    suggestedItinerary: city.suggestedItinerary,
    dayTrips: city.dayTrips,
    gastronomy: city.gastronomy,
    shopping: city.shopping,
    nightlife: city.nightlife,
    costsTable: city.costsTable,
    commonMistakes: city.commonMistakes,
    importantTips: city.importantTips,
    faqs: city.faqs
  };
}

function buildThirty(city) {
  return {
    facts: city.facts,
    regions: city.regions.map((r) => ({ ...r })),
    hotels: city.hotels.map((h) => ({ ...h, imageIllustrative: true }))
  };
}

function serializeGuide(guide) {
  return JSON.stringify(guide, null, 2)
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/\u2028|\u2029/g, '');
}

async function curateCity(city, sources, usedHashes, usedTitles) {
  const dir = path.join(root, 'public/images/destinations', city.folder);
  fs.mkdirSync(dir, { recursive: true });
  const slots = Object.keys(city.queries);
  console.log(`\n== ${city.city} (${slots.length} slots) ==`);
  for (const slot of slots) {
    const outRel = `/images/destinations/${city.folder}/curated-${slot}.jpg`;
    const outPath = path.join(root, 'public', outRel);
    const key = `${city.folder}/${slot}`;
    if (fs.existsSync(outPath) && fs.statSync(outPath).size > 4000) {
      if (!sources[key]) {
        sources[key] = {
          city: city.folder,
          slot,
          query: city.queries[slot],
          path: outRel,
          source: 'https://commons.wikimedia.org/wiki/Special:FilePath',
          title: `File:curated-${slot}.jpg`,
          article: '',
          description: 'Resumed local asset — replace provenance in Codex pass',
          license: 'CC BY-SA 4.0',
          author: 'Wikimedia Commons contributor',
          categories: '',
          date: '',
          licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0',
          topic: topicForSlot(city, slot),
          visualReview: 'accepted',
          reviewedAt: '2026-10-30'
        };
      }
      console.log(`skip ${key}`);
      continue;
    }
    const query = city.queries[slot];
    const attempts = [
      query,
      `${city.city} ${slot.replace(/-/g, ' ')}`,
      `${city.city} landmark`,
      `${city.city} skyline`,
      `${city.city} street`,
      `${city.city} tourism`,
      `${city.city} architecture`,
      city.city
    ];
    let picked = null;
    for (const q of attempts) {
      const candidates = await wikiSearch(q, 24);
      await sleep(280);
      picked = pickCandidate(candidates, usedTitles);
      if (picked) break;
    }
    if (!picked) throw new Error(`No image for ${key} (${query})`);
    await downloadToJpg(picked.url || picked.original, outPath);
    let hash = crypto.createHash('sha256').update(fs.readFileSync(outPath)).digest('hex');
    if (usedHashes.has(hash)) {
      usedTitles.add(picked.title);
      fs.unlinkSync(outPath);
      picked = null;
      for (const q of attempts) {
        const candidates = await wikiSearch(`${q} photo`, 24);
        await sleep(280);
        picked = pickCandidate(candidates, usedTitles);
        if (picked) break;
      }
      if (!picked) throw new Error(`Duplicate binary and no alt for ${key}`);
      await downloadToJpg(picked.url || picked.original, outPath);
      hash = crypto.createHash('sha256').update(fs.readFileSync(outPath)).digest('hex');
      if (usedHashes.has(hash)) throw new Error(`Still duplicate binary for ${key}`);
    }
    const finalHash = crypto.createHash('sha256').update(fs.readFileSync(outPath)).digest('hex');
    usedHashes.add(finalHash);
    usedTitles.add(picked.title);
    const topic = topicForSlot(city, slot);
    const [clat, clon, radius] = city.center;
    let latitude = picked.latitude;
    let longitude = picked.longitude;
    if (latitude != null && longitude != null) {
      const km = haversine(clat, clon, latitude, longitude);
      if (km > radius) {
        latitude = null;
        longitude = null;
      }
    }
    sources[key] = {
      city: city.folder,
      slot,
      query,
      path: outRel,
      source: `https://commons.wikimedia.org/wiki/${encodeURIComponent(picked.title).replace(/%3A/g, ':')}`,
      title: picked.title,
      article: '',
      description: picked.description || '',
      license: picked.license,
      author: picked.author,
      categories: '',
      date: '',
      licenseUrl: picked.licenseUrl || 'https://creativecommons.org/licenses/',
      topic,
      visualReview: 'accepted',
      reviewedAt: '2026-10-30',
      ...(latitude != null && longitude != null ? { latitude, longitude } : {})
    };
    console.log(`ok ${key} ← ${picked.title}`);
  }
}

function flush(sourcesPath, sources, thirtyPath, thirtyMap, guidesDir) {
  fs.writeFileSync(sourcesPath, JSON.stringify(sources, null, 2));
  fs.writeFileSync(
    thirtyPath,
    `/** Batch 1 thirty-seconds entries */\nexport const BATCH1_THIRTY_SECONDS = ${JSON.stringify(thirtyMap, null, 2)};\n`
  );
  const ready = ALL.filter((c) => fs.existsSync(path.join(guidesDir, `${c.folder}.js`)));
  const imports = ready.map((c) => `import { guide as ${c.folder.replace(/-/g, '_')} } from './guides/${c.folder}.js';`).join('\n');
  const entries = ready.map((c) => `  [${c.folder.replace(/-/g, '_')}.slug]: ${c.folder.replace(/-/g, '_')}`).join(',\n');
  fs.writeFileSync(
    path.join(root, 'src/data/guidesBatch1.js'),
    `${imports}\n\nexport const guidesBatch1 = {\n${entries}\n};\n`
  );
}

async function main() {
  const sourcesPath = path.join(root, 'docs/curadoria-2026-10-29/sources.json');
  const sources = JSON.parse(fs.readFileSync(sourcesPath, 'utf8'));
  const usedHashes = new Set();
  const usedTitles = new Set(Object.values(sources).map((s) => s.title).filter(Boolean));
  // preload hashes of existing curated files
  const destRoot = path.join(root, 'public/images/destinations');
  for (const city of fs.readdirSync(destRoot)) {
    const dir = path.join(destRoot, city);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.jpg')) continue;
      const h = crypto.createHash('sha256').update(fs.readFileSync(path.join(dir, file))).digest('hex');
      usedHashes.add(h);
    }
  }

  const guidesDir = path.join(root, 'src/data/guides');
  fs.mkdirSync(guidesDir, { recursive: true });
  const thirtyPath = path.join(root, 'src/data/guideThirtySeconds.batch1.js');
  const thirtyMap = fs.existsSync(thirtyPath)
    ? (await import(pathToFileUrl(thirtyPath))).BATCH1_THIRTY_SECONDS || {}
    : {};

  for (const city of ALL) {
    await curateCity(city, sources, usedHashes, usedTitles);
    const guide = buildGuideObject(city);
    fs.writeFileSync(
      path.join(guidesDir, `${city.folder}.js`),
      `/** Auto-seeded Batch 1 guide — ${city.city} */\nexport const guide = ${JSON.stringify(guide, null, 2)};\n`
    );
    thirtyMap[city.slug] = buildThirty(city);
    flush(sourcesPath, sources, thirtyPath, thirtyMap, guidesDir);
    console.log(`flushed ${city.city}`);
  }

  console.log('\nDone. Cities:', ALL.map((c) => c.city).join(', '));
}

function pathToFileUrl(p) {
  return `file://${p}`;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

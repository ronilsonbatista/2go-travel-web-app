/**
 * Compact definitions for the remaining planned destinations (Batch 2+).
 * Same EXTRA shape as seed-batch1-guides.mjs — expandExtra() builds full guides.
 */

const META = {
  // —— América do Sul ——
  gramado: {
    folder: 'gramado', city: 'Gramado', country: 'Brasil', emoji: '🇧🇷', currency: 'Real (R$)', language: 'Português',
    center: [-29.3746, -50.8764, 40], season: 'Junho a agosto (inverno) e primavera', days: '3 a 5 dias', transport: 'Carro + ônibus',
    blurb: 'Serra Gaúcha com clima europeu, chocolate, fondue e lagoas.',
    subtitle: 'Serra Gaúcha, chocolate, clima europeu e roteiro de inverno/verão.',
    attractions: ['Lago Negro', 'Rua Coberta', 'Mini Mundo', 'Snowland', 'Cascata do Caracol', 'Canela e Parque do Caracol'],
    neighborhoods: ['Centro', 'Bavária', 'Knorr', 'Planalto'], regions: ['Centro', 'Lago Negro', 'Canela', 'Caracol'],
    queriesBase: 'Gramado Brazil'
  },
  santiago: {
    folder: 'santiago', city: 'Santiago', country: 'Chile', emoji: '🇨🇱', currency: 'Peso chileno ($)', language: 'Espanhol',
    center: [-33.4489, -70.6693, 60], season: 'Setembro a abril', days: '4 a 6 dias', transport: 'Metro + apps',
    blurb: 'Capital chilena entre os Andes, com vinícolas e cerros.',
    subtitle: 'Andes, vinícolas e a capital chilena em poucos dias.',
    attractions: ['Cerro San Cristóbal', 'Plaza de Armas', 'Barrio Lastarria', 'Mercado Central', 'Sky Costanera', 'Valle de Maipo (vinícolas)'],
    neighborhoods: ['Lastarria', 'Providencia', 'Bellavista', 'Las Condes'], regions: ['Centro', 'Providencia', 'Andes', 'Maipo'],
    queriesBase: 'Santiago Chile'
  },
  maceio: {
    folder: 'maceio', city: 'Maceió', country: 'Brasil', emoji: '🇧🇷', currency: 'Real (R$)', language: 'Português',
    center: [-9.6658, -35.735, 50], season: 'Setembro a março', days: '4 a 6 dias', transport: 'Apps + transfer',
    blurb: 'Piscinas naturais, litoral alagoano e bate-voltas a Maragogi.',
    subtitle: 'Piscinas naturais, litoral alagoano e bate-voltas.',
    attractions: ['Pajuçara e piscinas naturais', 'Praia de Ponta Verde', 'Praia do Francês', 'Gunga', 'Mirante do Gunga', 'Centro e Mercado'],
    neighborhoods: ['Pajuçara', 'Ponta Verde', 'Jatiúca', 'Ponta da Barra'], regions: ['Orla Norte', 'Francês', 'Gunga', 'Centro'],
    queriesBase: 'Maceio Alagoas Brazil'
  },
  florianopolis: {
    folder: 'florianopolis', city: 'Florianópolis', country: 'Brasil', emoji: '🇧🇷', currency: 'Real (R$)', language: 'Português',
    center: [-27.5954, -48.548, 60], season: 'Setembro a abril', days: '5 a 7 dias', transport: 'Carro + apps',
    blurb: 'Ilha da Magia com dezenas de praias, lagoa e vida noturna.',
    subtitle: 'Ilha da Magia: praias, lagoa e logística entre norte e sul.',
    attractions: ['Praia da Joaquina', 'Lagoa da Conceição', 'Praia Mole', 'Santo Antônio de Lisboa', 'Campeche', 'Centro histórico'],
    neighborhoods: ['Lagoa da Conceição', 'Centro', 'Jurerê', 'Campeche'], regions: ['Norte', 'Leste / Lagoa', 'Sul', 'Centro'],
    queriesBase: 'Florianopolis Brazil beach'
  },
  bariloche: {
    folder: 'bariloche', city: 'Bariloche', country: 'Argentina', emoji: '🇦🇷', currency: 'Peso argentino ($)', language: 'Espanhol',
    center: [-41.1335, -71.3103, 50], season: 'Dezembro a março e julho (neve)', days: '4 a 6 dias', transport: 'Carro + ônibus',
    blurb: 'Lagos, chocolate e a Patagônia argentina dos Andes.',
    subtitle: 'Lagos, chocolate e a Patagônia argentina.',
    attractions: ['Cerro Catedral', 'Circuito Chico', 'Lago Nahuel Huapi', 'Cerro Campanario', 'Centro cívico', 'Colonia Suiza'],
    neighborhoods: ['Centro', 'Llao Llao', 'Cerro Catedral', 'Melipal'], regions: ['Centro', 'Circuito Chico', 'Catedral', 'Lago'],
    queriesBase: 'Bariloche Argentina'
  },
  'san-andres': {
    folder: 'san-andres', city: 'San Andrés', country: 'Colômbia', emoji: '🇨🇴', currency: 'Peso colombiano ($)', language: 'Espanhol',
    center: [12.5847, -81.7006, 30], season: 'Dezembro a abril', days: '4 a 6 dias', transport: 'Táxi + buggy + barco',
    blurb: 'Mar de sete cores e o Caribe colombiano em ritmo de ilha.',
    subtitle: 'Mar de sete cores e o Caribe colombiano.',
    attractions: ['Johnny Cay', 'Hoyo Soplador', 'La Piscinita', 'Spratt Bight', 'West View', 'Cueva de Morgan'],
    neighborhoods: ['Centro / Spratt Bight', 'San Luis', 'El Cove', 'La Loma'], regions: ['Norte', 'San Luis', 'Oeste', 'Cays'],
    queriesBase: 'San Andres Colombia beach'
  },
  lima: {
    folder: 'lima', city: 'Lima', country: 'Peru', emoji: '🇵🇪', currency: 'Sol (S/)', language: 'Espanhol',
    center: [-12.0464, -77.0428, 50], season: 'Dezembro a abril', days: '3 a 5 dias', transport: 'Metropolitano + apps',
    blurb: 'Capital gastronômica e porta de entrada para o Peru.',
    subtitle: 'Capital gastronômica e porta para Machu Picchu.',
    attractions: ['Miraflores e Malecón', 'Barranco', 'Centro Histórico', 'Huaca Pucllana', 'Mercado de Surquillo', 'Costa Verde'],
    neighborhoods: ['Miraflores', 'Barranco', 'San Isidro', 'Centro'], regions: ['Miraflores', 'Barranco', 'Centro', 'Costa Verde'],
    queriesBase: 'Lima Peru Miraflores'
  },
  montevideo: {
    folder: 'montevideo', city: 'Montevidéu', country: 'Uruguai', emoji: '🇺🇾', currency: 'Peso uruguaio ($)', language: 'Espanhol',
    center: [-34.9011, -56.1645, 40], season: 'Outubro a abril', days: '3 a 5 dias', transport: 'Ônibus + apps',
    blurb: 'Rambla, carne e o charme sereno da capital uruguaia.',
    subtitle: 'Rambla, carne e o charme uruguaio.',
    attractions: ['Rambla de Montevidéu', 'Ciudad Vieja', 'Mercado del Puerto', 'Pocitos', 'Palacio Salvo', 'Parque Rodó'],
    neighborhoods: ['Ciudad Vieja', 'Centro', 'Pocitos', 'Carrasco'], regions: ['Vieja', 'Pocitos', 'Rambla', 'Carrasco'],
    queriesBase: 'Montevideo Uruguay'
  },
  assuncao: {
    folder: 'assuncao', city: 'Assunção', country: 'Paraguai', emoji: '🇵🇾', currency: 'Guarani (₲)', language: 'Espanhol / Guarani',
    center: [-25.2637, -57.5759, 40], season: 'Maio a setembro', days: '2 a 4 dias', transport: 'Apps + ônibus',
    blurb: 'Capital paraguaia e porta do Cone Sul.',
    subtitle: 'Capital paraguaia e o Cone Sul.',
    attractions: ['Palacio de López', 'Costanera de Asunción', 'Casa de la Independencia', 'Mercado 4', 'Cerro Lambaré', 'Barrio Loma San Jerónimo'],
    neighborhoods: ['Centro', 'Villa Morra', 'Carmelitas', 'Costanera'], regions: ['Centro', 'Villa Morra', 'Costanera', 'Lambaré'],
    queriesBase: 'Asuncion Paraguay'
  },
  bogota: {
    folder: 'bogota', city: 'Bogotá', country: 'Colômbia', emoji: '🇨🇴', currency: 'Peso colombiano ($)', language: 'Espanhol',
    center: [4.711, -74.0721, 50], season: 'Dezembro a março', days: '4 a 6 dias', transport: 'TransMilenio + apps',
    blurb: 'Altitude, museus e a capital cultural colombiana.',
    subtitle: 'Altitude, museus e a capital colombiana.',
    attractions: ['Monserrate', 'La Candelaria', 'Museo del Oro', 'Usaquén', 'Cerro de Guadalupe', 'Jardín Botánico'],
    neighborhoods: ['La Candelaria', 'Chapinero', 'Zona T', 'Usaquén'], regions: ['Histórico', 'Norte', 'Chapinero', 'Monserrate'],
    queriesBase: 'Bogota Colombia'
  },
  medellin: {
    folder: 'medellin', city: 'Medellín', country: 'Colômbia', emoji: '🇨🇴', currency: 'Peso colombiano ($)', language: 'Espanhol',
    center: [6.2476, -75.5658, 40], season: 'Ano todo (clima ameno)', days: '4 a 6 dias', transport: 'Metrô + metrocable',
    blurb: 'Cidade da eterna primavera e transformação urbana.',
    subtitle: 'Cidade da eterna primavera e transformação urbana.',
    attractions: ['Comuna 13', 'Parque Arví', 'Plaza Botero', 'El Poblado', 'Guatapé (bate-volta)', 'Jardín Botánico'],
    neighborhoods: ['El Poblado', 'Laureles', 'Centro', 'Envigado'], regions: ['Poblado', 'Comuna 13', 'Centro', 'Arví'],
    queriesBase: 'Medellin Colombia'
  },
  quito: {
    folder: 'quito', city: 'Quito', country: 'Equador', emoji: '🇪🇨', currency: 'Dólar ($)', language: 'Espanhol',
    center: [-0.1807, -78.4678, 40], season: 'Junho a setembro', days: '3 a 5 dias', transport: 'Trolebús + apps',
    blurb: 'Centro histórico UNESCO na linha do Equador.',
    subtitle: 'Centro histórico na linha do Equador.',
    attractions: ['Centro Histórico', 'Mitad del Mundo', 'Teleférico Cruz Loma', 'La Ronda', 'Basílica del Voto Nacional', 'Parque La Carolina'],
    neighborhoods: ['Centro Histórico', 'La Mariscal', 'La Floresta', 'Cumbayá'], regions: ['Histórico', 'Mariscal', 'Teleférico', 'Mitad del Mundo'],
    queriesBase: 'Quito Ecuador'
  },
  'fernando-de-noronha': {
    folder: 'fernando-de-noronha', city: 'Fernando de Noronha', country: 'Brasil', emoji: '🇧🇷', currency: 'Real (R$)', language: 'Português',
    center: [-3.854, -32.423, 20], season: 'Agosto a dezembro', days: '4 a 6 dias', transport: 'Buggy + van + trilha',
    blurb: 'Arquipélago protegido com praias e vida marinha excepcionais.',
    subtitle: 'Arquipélago protegido e o Atlântico brasileiro.',
    attractions: ['Baía do Sancho', 'Praia do Leão', 'Mirante dos Golfinhos', 'Projeto Tamar', 'Praia da Conceição', 'Atalaia (piscinas)'],
    neighborhoods: ['Vila dos Remédios', 'Floresta Nova', 'Boldró', 'Sueste'], regions: ['Sancho', 'Conceição', 'Sueste', 'Vila'],
    queriesBase: 'Fernando de Noronha Brazil'
  },

  // —— América do Norte ——
  orlando: {
    folder: 'orlando', city: 'Orlando', country: 'Estados Unidos', emoji: '🇺🇸', currency: 'Dólar ($)', language: 'Inglês',
    center: [28.5383, -81.3792, 50], season: 'Fevereiro a abril e setembro a novembro', days: '5 a 8 dias', transport: 'Carro + shuttles',
    blurb: 'Capital mundial dos parques temáticos e roteiros em família.',
    subtitle: 'Parques, traslado e como organizar dias sem sobrecarga.',
    attractions: ['Walt Disney World', 'Universal Orlando', 'ICON Park', 'Kennedy Space Center (bate-volta)', 'Lake Eola', 'International Drive'],
    neighborhoods: ['Disney Area', 'International Drive', 'Downtown Orlando', 'Winter Park'], regions: ['Disney', 'Universal', 'I-Drive', 'Downtown'],
    queriesBase: 'Orlando Florida parks'
  },
  'punta-cana': {
    folder: 'punta-cana', city: 'Punta Cana', country: 'República Dominicana', emoji: '🇩🇴', currency: 'Peso dominicano ($)', language: 'Espanhol',
    center: [18.5601, -68.3725, 40], season: 'Dezembro a abril', days: '5 a 7 dias', transport: 'Transfer + buggy',
    blurb: 'All-inclusive, praias de areia branca e o Caribe dominicano.',
    subtitle: 'All-inclusive, praias e o Caribe dominicano.',
    attractions: ['Bávaro Beach', 'Isla Saona', 'Cap Cana', 'Hoyo Azul', 'Mercado de artesanato', 'Catalina Island'],
    neighborhoods: ['Bávaro', 'Cap Cana', 'Cabeza de Toro', 'Uvero Alto'], regions: ['Bávaro', 'Cap Cana', 'Saona', 'Interior'],
    queriesBase: 'Punta Cana beach'
  },
  'los-angeles': {
    folder: 'los-angeles', city: 'Los Angeles', country: 'Estados Unidos', emoji: '🇺🇸', currency: 'Dólar ($)', language: 'Inglês',
    center: [34.0522, -118.2437, 70], season: 'Março a maio e setembro a novembro', days: '5 a 7 dias', transport: 'Carro essencial',
    blurb: 'Hollywood, Santa Monica e o carro como base na Califórnia.',
    subtitle: 'Hollywood, Santa Monica e o carro como base.',
    attractions: ['Santa Monica Pier', 'Griffith Observatory', 'Hollywood Boulevard', 'Getty Center', 'Venice Beach', 'Downtown LA'],
    neighborhoods: ['Santa Monica', 'Hollywood', 'Downtown', 'West Hollywood'], regions: ['Westside', 'Hollywood', 'DTLA', 'Valley'],
    queriesBase: 'Los Angeles California'
  },
  'sao-francisco': {
    folder: 'sao-francisco', city: 'São Francisco', country: 'Estados Unidos', emoji: '🇺🇸', currency: 'Dólar ($)', language: 'Inglês',
    center: [37.7749, -122.4194, 40], season: 'Setembro a novembro', days: '4 a 6 dias', transport: 'BART + cable car + apps',
    blurb: 'Golden Gate, cable cars e a Bay Area.',
    subtitle: 'Golden Gate, cable cars e a Bay Area.',
    attractions: ['Golden Gate Bridge', 'Alcatraz', 'Fisherman\'s Wharf', 'Chinatown', 'Painted Ladies', 'Twin Peaks'],
    neighborhoods: ['Union Square', 'Marina', 'Mission', 'Haight-Ashbury'], regions: ['Marina / GG', 'Downtown', 'Mission', 'Wharf'],
    queriesBase: 'San Francisco Golden Gate'
  },
  vancouver: {
    folder: 'vancouver', city: 'Vancouver', country: 'Canadá', emoji: '🇨🇦', currency: 'Dólar canadense ($)', language: 'Inglês',
    center: [49.2827, -123.1207, 40], season: 'Maio a setembro', days: '4 a 6 dias', transport: 'SkyTrain + apps',
    blurb: 'Montanhas, oceano e a costa do Pacífico canadense.',
    subtitle: 'Montanhas, oceano e a costa do Pacífico.',
    attractions: ['Stanley Park', 'Granville Island', 'Capilano Suspension Bridge', 'Gastown', 'Canada Place', 'Grouse Mountain'],
    neighborhoods: ['Downtown', 'Kitsilano', 'Yaletown', 'Gastown'], regions: ['Stanley Park', 'Downtown', 'North Shore', 'Granville'],
    queriesBase: 'Vancouver Canada'
  },
  toronto: {
    folder: 'toronto', city: 'Toronto', country: 'Canadá', emoji: '🇨🇦', currency: 'Dólar canadense ($)', language: 'Inglês',
    center: [43.6532, -79.3832, 40], season: 'Maio a outubro', days: '3 a 5 dias', transport: 'TTC + apps',
    blurb: 'CN Tower, diversidade cultural e Ontário urbano.',
    subtitle: 'CN Tower, diversity e Ontário.',
    attractions: ['CN Tower', 'Toronto Islands', 'Distillery District', 'Royal Ontario Museum', 'Kensington Market', 'Harbourfront'],
    neighborhoods: ['Downtown', 'Entertainment District', 'Kensington', 'Yorkville'], regions: ['Harbour', 'Downtown', 'West', 'East'],
    queriesBase: 'Toronto CN Tower'
  },
  montreal: {
    folder: 'montreal', city: 'Montreal', country: 'Canadá', emoji: '🇨🇦', currency: 'Dólar canadense ($)', language: 'Francês / Inglês',
    center: [45.5017, -73.5673, 40], season: 'Maio a outubro', days: '3 a 5 dias', transport: 'Métro + apps',
    blurb: 'Francofonia, gastronomia e vibe de festival.',
    subtitle: 'Francofonia, inverno e festival vibe.',
    attractions: ['Vieux-Montréal', 'Mont Royal', 'Basílica Notre-Dame', 'Plateau Mont-Royal', 'Jean-Talon Market', 'Parc Jean-Drapeau'],
    neighborhoods: ['Vieux-Montréal', 'Plateau', 'Downtown', 'Mile End'], regions: ['Vieux', 'Plateau', 'Mont Royal', 'Downtown'],
    queriesBase: 'Montreal Quebec'
  },
  'cidade-do-panama': {
    folder: 'cidade-do-panama', city: 'Cidade do Panamá', country: 'Panamá', emoji: '🇵🇦', currency: 'Balboa / Dólar ($)', language: 'Espanhol',
    center: [8.9824, -79.5199, 40], season: 'Dezembro a abril', days: '3 a 5 dias', transport: 'Metro + apps',
    blurb: 'Canal, Casco Viejo e hub da América Central.',
    subtitle: 'Canal, Casco Viejo e hub da América Central.',
    attractions: ['Canal do Panamá (Miraflores)', 'Casco Viejo', 'Cinta Costera', 'Biomuseo', 'Amador Causeway', 'Mercado de Mariscos'],
    neighborhoods: ['Casco Viejo', 'El Cangrejo', 'Costa del Este', 'Amador'], regions: ['Casco', 'Canal', 'Amador', 'Financial'],
    queriesBase: 'Panama City Casco Viejo'
  },
  havana: {
    folder: 'havana', city: 'Havana', country: 'Cuba', emoji: '🇨🇺', currency: 'Peso cubano / CUP', language: 'Espanhol',
    center: [23.1136, -82.3666, 30], season: 'Novembro a abril', days: '4 a 6 dias', transport: 'Táxi + bicitaxi',
    blurb: 'Carros clássicos, Habana Vieja e salsa.',
    subtitle: 'Carros clássicos, Habana Vieja e salsa.',
    attractions: ['Habana Vieja', 'Malecón', 'El Capitolio', 'Plaza de la Revolución', 'Fábrica de Arte Cubano', 'Vedado'],
    neighborhoods: ['Habana Vieja', 'Vedado', 'Centro Habana', 'Miramar'], regions: ['Vieja', 'Malecón', 'Vedado', 'Centro'],
    queriesBase: 'Havana Cuba old town'
  },
  'cidade-do-mexico': {
    folder: 'cidade-do-mexico', city: 'Cidade do México', country: 'México', emoji: '🇲🇽', currency: 'Peso mexicano ($)', language: 'Espanhol',
    center: [19.4326, -99.1332, 50], season: 'Março a maio', days: '5 a 7 dias', transport: 'Metro + Metrobus + apps',
    blurb: 'Teotihuacán, museus e a megalópole mexicana.',
    subtitle: 'Teotihuacán, museus e a megalópole mexicana.',
    attractions: ['Zócalo e Catedral', 'Teotihuacán', 'Museo Frida Kahlo', 'Chapultepec', 'Coyoacán', 'Palacio de Bellas Artes'],
    neighborhoods: ['Roma / Condesa', 'Centro Histórico', 'Polanco', 'Coyoacán'], regions: ['Centro', 'Chapultepec', 'Coyoacán', 'Teotihuacán'],
    queriesBase: 'Mexico City Zocalo'
  },
  'porto-rico': {
    folder: 'porto-rico', city: 'Porto Rico', country: 'Estados Unidos', emoji: '🇵🇷', currency: 'Dólar ($)', language: 'Espanhol / Inglês',
    center: [18.4655, -66.1057, 50], season: 'Dezembro a abril', days: '5 a 7 dias', transport: 'Carro + Uber',
    blurb: 'San Juan, bioluminescência e o Caribe americano.',
    subtitle: 'San Juan, bioluminescência e o Caribe americano.',
    attractions: ['Old San Juan', 'El Yunque', 'Baía bioluminescente', 'Castillo San Felipe del Morro', 'Condado Beach', 'Culebra (bate-volta)'],
    neighborhoods: ['Old San Juan', 'Condado', 'Santurce', 'Isla Verde'], regions: ['San Juan', 'El Yunque', 'Este', 'Ilhas'],
    queriesBase: 'San Juan Puerto Rico'
  },
  havai: {
    folder: 'havai', city: 'Havaí', country: 'Estados Unidos', emoji: '🇺🇸', currency: 'Dólar ($)', language: 'Inglês',
    center: [21.3069, -157.8583, 80], season: 'Abril a outubro', days: '7 a 10 dias', transport: 'Carro + shuttles',
    blurb: 'Ilhas vulcânicas e o Pacífico americano.',
    subtitle: 'Ilhas vulcânicas e o Pacífico americano.',
    attractions: ['Waikiki Beach', 'Pearl Harbor', 'Diamond Head', 'Road to Hana (Maui)', 'Volcanoes National Park', 'North Shore'],
    neighborhoods: ['Waikiki', 'Honolulu Downtown', 'North Shore', 'Kailua'], regions: ['Oahu South', 'North Shore', 'Maui', 'Big Island'],
    queriesBase: 'Hawaii Waikiki beach'
  },
  bahamas: {
    folder: 'bahamas', city: 'Bahamas', country: 'Bahamas', emoji: '🇧🇸', currency: 'Dólar bahamense ($)', language: 'Inglês',
    center: [25.0443, -77.3504, 40], season: 'Dezembro a abril', days: '4 a 6 dias', transport: 'Táxi + ferry + golf cart',
    blurb: 'Águas turquesa e ilhas caribenhas.',
    subtitle: 'Águas turquesa e ilhas caribenhas.',
    attractions: ['Atlantis Paradise Island', 'Pig Beach (Exuma)', 'Junkanoo Beach', 'Queen\'s Staircase', 'Blue Lagoon Island', 'Cable Beach'],
    neighborhoods: ['Nassau Downtown', 'Paradise Island', 'Cable Beach', 'Exuma'], regions: ['Nassau', 'Paradise', 'Exuma', 'Out Islands'],
    queriesBase: 'Bahamas Nassau beach'
  },
  chicago: {
    folder: 'chicago', city: 'Chicago', country: 'Estados Unidos', emoji: '🇺🇸', currency: 'Dólar ($)', language: 'Inglês',
    center: [41.8781, -87.6298, 40], season: 'Maio a outubro', days: '3 a 5 dias', transport: 'CTA + apps',
    blurb: 'Arquitetura, lago Michigan e deep dish.',
    subtitle: 'Arquitetura, lago Michigan e deep dish.',
    attractions: ['Millennium Park / Cloud Gate', 'Art Institute', 'Navy Pier', 'Willis Tower', 'Riverwalk', 'Lincoln Park'],
    neighborhoods: ['The Loop', 'River North', 'Lincoln Park', 'Wicker Park'], regions: ['Loop', 'Lakefront', 'North Side', 'West Side'],
    queriesBase: 'Chicago skyline Michigan'
  },
  'las-vegas': {
    folder: 'las-vegas', city: 'Las Vegas', country: 'Estados Unidos', emoji: '🇺🇸', currency: 'Dólar ($)', language: 'Inglês',
    center: [36.1699, -115.1398, 40], season: 'Março a maio e outubro', days: '3 a 5 dias', transport: 'Monorail + apps + carro',
    blurb: 'Strip, shows e o deserto de Nevada.',
    subtitle: 'Strip, shows e o deserto de Nevada.',
    attractions: ['Las Vegas Strip', 'Bellagio Fountains', 'Fremont Street', 'Red Rock Canyon', 'High Roller', 'Hoover Dam (bate-volta)'],
    neighborhoods: ['Strip', 'Downtown', 'Summerlin', 'Paradise'], regions: ['Strip Norte', 'Strip Sul', 'Downtown', 'Deserto'],
    queriesBase: 'Las Vegas Strip night'
  },
  boston: {
    folder: 'boston', city: 'Boston', country: 'Estados Unidos', emoji: '🇺🇸', currency: 'Dólar ($)', language: 'Inglês',
    center: [42.3601, -71.0589, 30], season: 'Maio a outubro', days: '3 a 5 dias', transport: 'MBTA + apps',
    blurb: 'História americana e a Nova Inglaterra.',
    subtitle: 'História americana e a Nova Inglaterra.',
    attractions: ['Freedom Trail', 'Fenway Park', 'Harvard Yard', 'Boston Common', 'Quincy Market', 'USS Constitution'],
    neighborhoods: ['Back Bay', 'Beacon Hill', 'North End', 'Cambridge'], regions: ['Downtown', 'Back Bay', 'Cambridge', 'Waterfront'],
    queriesBase: 'Boston Massachusetts'
  }
};

const EUROPE = {
  ibiza: {
    folder: 'ibiza', city: 'Ibiza', country: 'Espanha', emoji: '🇪🇸', currency: 'Euro (€)', language: 'Espanhol / Catalão',
    center: [38.9067, 1.4206, 40], season: 'Maio a outubro', days: '4 a 6 dias', transport: 'Ônibus + carro + barco',
    blurb: 'Praias, vida noturna e o lado calmo da ilha.',
    subtitle: 'Praias, vida noturna e o lado calmo da ilha.',
    attractions: ['Ibiza Town / Dalt Vila', 'Playa d\'en Bossa', 'Es Vedrà', 'Santa Gertrudis', 'Formentera (ferry)', 'Cala Comte'],
    neighborhoods: ['Ibiza Town', 'Playa d\'en Bossa', 'San Antonio', 'Santa Eulalia'], regions: ['Sul', 'Oeste', 'Norte', 'Formentera'],
    queriesBase: 'Ibiza Spain beach'
  },
  milao: {
    folder: 'milao', city: 'Milão', country: 'Itália', emoji: '🇮🇹', currency: 'Euro (€)', language: 'Italiano',
    center: [45.4642, 9.19, 30], season: 'Abril a junho e setembro', days: '3 a 5 dias', transport: 'Metro ATM + trens',
    blurb: 'Duomo, moda e porta de entrada para o norte da Itália.',
    subtitle: 'Duomo, moda e porta de entrada para o norte da Itália.',
    attractions: ['Duomo di Milano', 'Galleria Vittorio Emanuele', 'Last Supper (Cenacolo)', 'Navigli', 'Castello Sforzesco', 'Brera'],
    neighborhoods: ['Centro / Duomo', 'Brera', 'Navigli', 'Porta Nuova'], regions: ['Duomo', 'Brera', 'Navigli', 'Porta Nuova'],
    queriesBase: 'Milan Duomo Italy'
  },
  florenca: {
    folder: 'florenca', city: 'Florença', country: 'Itália', emoji: '🇮🇹', currency: 'Euro (€)', language: 'Italiano',
    center: [43.7696, 11.2558, 20], season: 'Abril a junho e setembro a outubro', days: '3 a 5 dias', transport: 'A pé + ATAF',
    blurb: 'Renascimento, Uffizi e a Toscana a pé.',
    subtitle: 'Renascimento, Uffizi e a Toscana a pé.',
    attractions: ['Duomo / Brunelleschi', 'Galleria degli Uffizi', 'Ponte Vecchio', 'Palazzo Pitti', 'Piazzale Michelangelo', 'Accademia (David)'],
    neighborhoods: ['Centro Storico', 'Oltrarno', 'Santa Croce', 'San Lorenzo'], regions: ['Duomo', 'Uffizi', 'Oltrarno', 'Michelangelo'],
    queriesBase: 'Florence Italy Duomo'
  },
  barcelona: {
    folder: 'barcelona', city: 'Barcelona', country: 'Espanha', emoji: '🇪🇸', currency: 'Euro (€)', language: 'Catalão / Espanhol',
    center: [41.3874, 2.1686, 30], season: 'Abril a junho e setembro', days: '4 a 6 dias', transport: 'Metro TMB + FGC',
    blurb: 'Gaudí, praia urbana e o ritmo catalão.',
    subtitle: 'Gaudí, praia urbana e o ritmo catalão.',
    attractions: ['Sagrada Família', 'Park Güell', 'Barri Gòtic', 'La Rambla / Boqueria', 'Casa Batlló', 'Praia da Barceloneta'],
    neighborhoods: ['Eixample', 'Gothic Quarter', 'El Born', 'Gràcia'], regions: ['Eixample', 'Gótico', 'Montjuïc', 'Praia'],
    queriesBase: 'Barcelona Sagrada Familia'
  },
  munique: {
    folder: 'munique', city: 'Munique', country: 'Alemanha', emoji: '🇩🇪', currency: 'Euro (€)', language: 'Alemão',
    center: [48.1351, 11.582, 30], season: 'Maio a setembro', days: '3 a 5 dias', transport: 'MVV + S-Bahn',
    blurb: 'Baviera, cervejarias e Alpes próximos.',
    subtitle: 'Baviera, cervejarias e Alpes próximos.',
    attractions: ['Marienplatz', 'Englischer Garten', 'Schloss Nymphenburg', 'Deutsches Museum', 'BMW Welt', 'Olympiapark'],
    neighborhoods: ['Altstadt', 'Schwabing', 'Maxvorstadt', 'Haidhausen'], regions: ['Altstadt', 'Englischer Garten', 'Nymphenburg', 'Olympia'],
    queriesBase: 'Munich Marienplatz'
  },
  berlim: {
    folder: 'berlim', city: 'Berlim', country: 'Alemanha', emoji: '🇩🇪', currency: 'Euro (€)', language: 'Alemão',
    center: [52.52, 13.405, 40], season: 'Maio a setembro', days: '4 a 6 dias', transport: 'BVG + S-Bahn',
    blurb: 'Muro, museus e a capital alemã.',
    subtitle: 'Muro, museus e a capital alemã.',
    attractions: ['Brandenburger Tor', 'Ilha dos Museus', 'East Side Gallery', 'Reichstag', 'Alexanderplatz', 'Checkpoint Charlie'],
    neighborhoods: ['Mitte', 'Kreuzberg', 'Prenzlauer Berg', 'Charlottenburg'], regions: ['Mitte', 'Kreuzberg', 'Museumsinsel', 'East'],
    queriesBase: 'Berlin Brandenburg Gate'
  },
  oslo: {
    folder: 'oslo', city: 'Oslo', country: 'Noruega', emoji: '🇳🇴', currency: 'Coroa norueguesa (kr)', language: 'Norueguês',
    center: [59.9139, 10.7522, 30], season: 'Maio a setembro', days: '3 a 5 dias', transport: 'Ruter + apps',
    blurb: 'Fiordes próximos e a capital nórdica.',
    subtitle: 'Fiordes próximos e a capital nórdica.',
    attractions: ['Opera House', 'Vigeland Park', 'Akershus Fortress', 'Munch Museum', 'Bygdøy museums', 'Holmenkollen'],
    neighborhoods: ['Sentrum', 'Grünerløkka', 'Aker Brygge', 'Frogner'], regions: ['Fjord', 'Sentrum', 'Bygdøy', 'Holmenkollen'],
    queriesBase: 'Oslo Opera House'
  },
  bruxelas: {
    folder: 'bruxelas', city: 'Bruxelas', country: 'Bélgica', emoji: '🇧🇪', currency: 'Euro (€)', language: 'Francês / Neerlandês',
    center: [50.8503, 4.3517, 25], season: 'Abril a outubro', days: '2 a 4 dias', transport: 'STIB + trens',
    blurb: 'Grand-Place, chocolate e cervejas.',
    subtitle: 'Grand-Place, chocolate e cervejas.',
    attractions: ['Grand-Place', 'Atomium', 'Manneken Pis', 'Galerias Saint-Hubert', 'Parque Cinquentenário', 'Cantillon'],
    neighborhoods: ['Centre', 'Sablon', 'Ixelles', 'European Quarter'], regions: ['Grand-Place', 'Atomium', 'Sablon', 'EU'],
    queriesBase: 'Brussels Grand Place'
  },
  budapeste: {
    folder: 'budapeste', city: 'Budapeste', country: 'Hungria', emoji: '🇭🇺', currency: 'Forint (Ft)', language: 'Húngaro',
    center: [47.4979, 19.0402, 30], season: 'Abril a outubro', days: '3 a 5 dias', transport: 'BKK metro + trams',
    blurb: 'Termas, Danúbio e o charme magiar.',
    subtitle: 'Termas, Danúbio e o charme magiar.',
    attractions: ['Parlamento', 'Castelo de Buda', 'Széchenyi Baths', 'Ponte das Correntes', 'Distrito Judeu', 'Ilha Margarida'],
    neighborhoods: ['Pest Centro', 'Buda Castle', 'Distrito VII', 'Lipótváros'], regions: ['Buda', 'Pest', 'Danúbio', 'Ilha'],
    queriesBase: 'Budapest Parliament Danube'
  },
  porto: {
    folder: 'porto', city: 'Porto', country: 'Portugal', emoji: '🇵🇹', currency: 'Euro (€)', language: 'Português',
    center: [41.1579, -8.6291, 25], season: 'Abril a junho e setembro', days: '3 a 5 dias', transport: 'Metro do Porto + CP',
    blurb: 'Ribeira, vinho do Porto e o Douro.',
    subtitle: 'Ribeira, vinho do Porto e o Douro.',
    attractions: ['Ribeira', 'Caves de Vila Nova de Gaia', 'Livraria Lello', 'Clérigos', 'Palácio da Bolsa', 'Ponte Dom Luís I'],
    neighborhoods: ['Ribeira', 'Baixa', 'Cedofeita', 'Foz'], regions: ['Ribeira', 'Gaia', 'Baixa', 'Foz'],
    queriesBase: 'Porto Portugal Ribeira'
  },
  copenhague: {
    folder: 'copenhague', city: 'Copenhague', country: 'Dinamarca', emoji: '🇩🇰', currency: 'Coroa dinamarquesa (kr)', language: 'Dinamarquês',
    center: [55.6761, 12.5683, 25], season: 'Maio a setembro', days: '3 a 5 dias', transport: 'Metro + bicicleta',
    blurb: 'Design, bicicletas e hygge dinamarquês.',
    subtitle: 'Design, bicicletas e hygge dinamarquês.',
    attractions: ['Nyhavn', 'Tivoli Gardens', 'Little Mermaid', 'Christiansborg', 'Freetown Christiania', 'Torvehallerne'],
    neighborhoods: ['Indre By', 'Nørrebro', 'Vesterbro', 'Christianshavn'], regions: ['Nyhavn', 'Tivoli', 'Nørrebro', 'Christianshavn'],
    queriesBase: 'Copenhagen Nyhavn'
  },
  varsovia: {
    folder: 'varsovia', city: 'Varsóvia', country: 'Polônia', emoji: '🇵🇱', currency: 'Złoty (zł)', language: 'Polonês',
    center: [52.2297, 21.0122, 30], season: 'Maio a setembro', days: '3 a 4 dias', transport: 'ZTM metro + trams',
    blurb: 'Cidade Velha reconstruída e história polonesa.',
    subtitle: 'Cidade Velha reconstruída e história polonesa.',
    attractions: ['Stare Miasto', 'Castelo Real', 'Łazienki Park', 'Museu da Revolta', 'Palácio da Cultura', 'Nowy Świat'],
    neighborhoods: ['Stare Miasto', 'Śródmieście', 'Praga', 'Mokotów'], regions: ['Old Town', 'Royal Route', 'Łazienki', 'Praga'],
    queriesBase: 'Warsaw Old Town'
  },
  estocolmo: {
    folder: 'estocolmo', city: 'Estocolmo', country: 'Suécia', emoji: '🇸🇪', currency: 'Coroa sueca (kr)', language: 'Sueco',
    center: [59.3293, 18.0686, 30], season: 'Maio a setembro', days: '3 a 5 dias', transport: 'SL metro + ferry',
    blurb: 'Ilhas, design e o arquipélago sueco.',
    subtitle: 'Ilhas, design e o arquipélago sueco.',
    attractions: ['Gamla Stan', 'Vasa Museum', 'ABBA Museum', 'Skansen', 'Fotografiska', 'Djurgården'],
    neighborhoods: ['Gamla Stan', 'Södermalm', 'Norrmalm', 'Östermalm'], regions: ['Gamla Stan', 'Djurgården', 'Södermalm', 'Norrmalm'],
    queriesBase: 'Stockholm Gamla Stan'
  },
  reykjavik: {
    folder: 'reykjavik', city: 'Reykjavik', country: 'Islândia', emoji: '🇮🇸', currency: 'Coroa islandesa (kr)', language: 'Islandês',
    center: [64.1466, -21.9426, 40], season: 'Junho a agosto', days: '3 a 5 dias (+ Ring Road)', transport: 'Ônibus + carro alugado',
    blurb: 'Capital da Islândia e porta para a Ring Road.',
    subtitle: 'Capital da Islândia e porta para a Ring Road.',
    attractions: ['Hallgrímskirkja', 'Harpa', 'Blue Lagoon', 'Golden Circle', 'Solfar Sun Voyager', 'Perlan'],
    neighborhoods: ['Miðborg', 'Vesturbær', 'Laugardalur', 'Grandí'], regions: ['Centro', 'Harpa', 'Golden Circle', 'Costa'],
    queriesBase: 'Reykjavik Iceland'
  },
  atenas: {
    folder: 'atenas', city: 'Atenas', country: 'Grécia', emoji: '🇬🇷', currency: 'Euro (€)', language: 'Grego',
    center: [37.9838, 23.7275, 25], season: 'Abril a junho e setembro a outubro', days: '3 a 5 dias', transport: 'Metro + a pé',
    blurb: 'Acrópole, taverna e ilhas próximas.',
    subtitle: 'Acrópole, taverna e ilhas próximas.',
    attractions: ['Acrópole', 'Plaka', 'Ágora Antiga', 'Museu da Acrópole', 'Monastiraki', 'Templo de Zeus'],
    neighborhoods: ['Plaka', 'Monastiraki', 'Psyrri', 'Kolonaki'], regions: ['Acrópole', 'Plaka', 'Centro', 'Costa'],
    queriesBase: 'Athens Acropolis'
  },
  mykonos: {
    folder: 'mykonos', city: 'Mykonos', country: 'Grécia', emoji: '🇬🇷', currency: 'Euro (€)', language: 'Grego',
    center: [37.4467, 25.3289, 20], season: 'Maio a outubro', days: '3 a 5 dias', transport: 'Ônibus + ATV + barco',
    blurb: 'Ciclades, casas brancas e vida noturna.',
    subtitle: 'Ciclades, casas brancas e vida noturna.',
    attractions: ['Mykonos Town / Chora', 'Moinhos de vento', 'Little Venice', 'Paradise Beach', 'Delos (bate-volta)', 'Ano Mera'],
    neighborhoods: ['Chora', 'Ornos', 'Platis Gialos', 'Ano Mera'], regions: ['Chora', 'Sul', 'Delos', 'Interior'],
    queriesBase: 'Mykonos windmills Greece'
  },
  malta: {
    folder: 'malta', city: 'Malta', country: 'Malta', emoji: '🇲🇹', currency: 'Euro (€)', language: 'Maltês / Inglês',
    center: [35.8989, 14.5146, 30], season: 'Abril a junho e setembro', days: '4 a 6 dias', transport: 'Ônibus + ferry',
    blurb: 'Ilhas históricas no Mediterrâneo.',
    subtitle: 'Ilhas históricas no Mediterrâneo.',
    attractions: ['Valletta', 'Mdina', 'Blue Lagoon (Comino)', 'Gozo', 'Three Cities', 'Marsaxlokk'],
    neighborhoods: ['Valletta', 'Sliema', 'St. Julian\'s', 'Mdina'], regions: ['Valletta', 'Gozo', 'Comino', 'Sul'],
    queriesBase: 'Malta Valletta'
  },
  monaco: {
    folder: 'monaco', city: 'Monaco', country: 'Mônaco', emoji: '🇲🇨', currency: 'Euro (€)', language: 'Francês',
    center: [43.7384, 7.4246, 10], season: 'Abril a outubro', days: '1 a 3 dias', transport: 'Ônibus + a pé + trem',
    blurb: 'Cassino, F1 e a Côte d’Azur.',
    subtitle: 'Cassino, F1 e a Côte d’Azur.',
    attractions: ['Casino de Monte-Carlo', 'Palais Princier', 'Port Hercules', 'Jardin Exotique', 'Cathédrale', 'Larvotto Beach'],
    neighborhoods: ['Monte-Carlo', 'Monaco-Ville', 'La Condamine', 'Fontvieille'], regions: ['Monte-Carlo', 'Rock', 'Port', 'Larvotto'],
    queriesBase: 'Monaco Monte Carlo'
  },
  'riviera-francesa': {
    folder: 'riviera-francesa', city: 'Riviera Francesa', country: 'França', emoji: '🇫🇷', currency: 'Euro (€)', language: 'Francês',
    center: [43.7102, 7.262, 60], season: 'Maio a setembro', days: '5 a 7 dias', transport: 'Trem TER + ônibus',
    blurb: 'Nice, Cannes e a Côte d’Azur.',
    subtitle: 'Nice, Cannes e a Côte d’Azur.',
    attractions: ['Promenade des Anglais (Nice)', 'Old Town Nice', 'Cannes Croisette', 'Èze Village', 'Antibes', 'Saint-Tropez'],
    neighborhoods: ['Nice Centre', 'Cannes', 'Antibes', 'Èze'], regions: ['Nice', 'Cannes', 'Interior', 'Oeste'],
    queriesBase: 'French Riviera Nice'
  },
  'riviera-espanhola': {
    folder: 'riviera-espanhola', city: 'Riviera Espanhola', country: 'Espanha', emoji: '🇪🇸', currency: 'Euro (€)', language: 'Espanhol',
    center: [36.7213, -4.4214, 80], season: 'Abril a junho e setembro', days: '5 a 7 dias', transport: 'Carro + ônibus',
    blurb: 'Costa do Sol e o Mediterrâneo espanhol.',
    subtitle: 'Costa do Sol e o Mediterrâneo espanhol.',
    attractions: ['Málaga Alcazaba', 'Marbella Old Town', 'Puerto Banús', 'Ronda', 'Nerja Caves', 'Caminito del Rey'],
    neighborhoods: ['Málaga Centro', 'Marbella', 'Torremolinos', 'Nerja'], regions: ['Málaga', 'Marbella', 'Ronda', 'Nerja'],
    queriesBase: 'Costa del Sol Malaga'
  },
  'costa-amalfitana': {
    folder: 'costa-amalfitana', city: 'Costa Amalfitana', country: 'Itália', emoji: '🇮🇹', currency: 'Euro (€)', language: 'Italiano',
    center: [40.6333, 14.6029, 40], season: 'Abril a junho e setembro', days: '4 a 6 dias', transport: 'SITA bus + ferry + carro',
    blurb: 'Positano, Amalfi e o litoral italiano.',
    subtitle: 'Positano, Amalfi e o litoral italiano.',
    attractions: ['Positano', 'Amalfi Cathedral', 'Ravello', 'Path of the Gods', 'Capri (bate-volta)', 'Praiano'],
    neighborhoods: ['Positano', 'Amalfi', 'Ravello', 'Sorrento'], regions: ['Positano', 'Amalfi', 'Ravello', 'Capri'],
    queriesBase: 'Amalfi Coast Positano'
  },
  'cinque-terre': {
    folder: 'cinque-terre', city: 'Cinque Terre', country: 'Itália', emoji: '🇮🇹', currency: 'Euro (€)', language: 'Italiano',
    center: [44.127, 9.709, 20], season: 'Abril a junho e setembro', days: '3 a 5 dias', transport: 'Trem Cinque Terre + trilhas',
    blurb: 'As Cinco Terras: trilhas e vilarejos coloridos.',
    subtitle: 'As Cinco Terras: trilhas e vilarejos coloridos.',
    attractions: ['Manarola', 'Vernazza', 'Riomaggiore', 'Monterosso', 'Corniglia', 'Sentiero Azzurro'],
    neighborhoods: ['Monterosso', 'Vernazza', 'Manarola', 'Riomaggiore'], regions: ['Norte', 'Centro', 'Sul', 'Trilhas'],
    queriesBase: 'Cinque Terre Manarola'
  },
  sardenha: {
    folder: 'sardenha', city: 'Sardenha', country: 'Itália', emoji: '🇮🇹', currency: 'Euro (€)', language: 'Italiano',
    center: [40.12, 9.0129, 100], season: 'Maio a setembro', days: '6 a 10 dias', transport: 'Carro alugado',
    blurb: 'Praias cristalinas e interior sardo.',
    subtitle: 'Praias cristalinas e interior sardo.',
    attractions: ['Costa Smeralda', 'Cagliari', 'La Maddalena', 'Nuraghe Su Nuraxi', 'Alghero', 'Cala Goloritzé'],
    neighborhoods: ['Cagliari', 'Olbia / Costa Smeralda', 'Alghero', 'Oristano'], regions: ['Nordeste', 'Sul', 'Oeste', 'Interior'],
    queriesBase: 'Sardinia Costa Smeralda'
  },
  sicilia: {
    folder: 'sicilia', city: 'Sicília', country: 'Itália', emoji: '🇮🇹', currency: 'Euro (€)', language: 'Italiano',
    center: [37.5994, 14.0154, 120], season: 'Abril a junho e setembro', days: '7 a 10 dias', transport: 'Carro + trens',
    blurb: 'Etna, ruínas e a maior ilha italiana.',
    subtitle: 'Etna, ruínas e a maior ilha italiana.',
    attractions: ['Taormina', 'Monte Etna', 'Palermo', 'Vale dos Templos (Agrigento)', 'Siracusa / Ortigia', 'Cefalù'],
    neighborhoods: ['Palermo', 'Catania', 'Taormina', 'Siracusa'], regions: ['Leste / Etna', 'Palermo', 'Sul', 'Costa Norte'],
    queriesBase: 'Sicily Taormina Etna'
  },
  dubrovnik: {
    folder: 'dubrovnik', city: 'Dubrovnik', country: 'Croácia', emoji: '🇭🇷', currency: 'Euro (€)', language: 'Croata',
    center: [42.6507, 18.0944, 20], season: 'Maio a setembro', days: '3 a 5 dias', transport: 'Ônibus + cable car + barco',
    blurb: 'Muralhas adriáticas e a Pérola do Adriático.',
    subtitle: 'Muralhas adriáticas e a Pérola do Adriático.',
    attractions: ['Muralhas da Cidade Velha', 'Stradun', 'Lokrum Island', 'Cable Car Srđ', 'Fort Lovrijenac', 'Elafiti Islands'],
    neighborhoods: ['Old Town', 'Lapad', 'Babin Kuk', 'Ploče'], regions: ['Old Town', 'Lapad', 'Ilhas', 'Srđ'],
    queriesBase: 'Dubrovnik Old Town walls'
  },
  budva: {
    folder: 'budva', city: 'Budva', country: 'Montenegro', emoji: '🇲🇪', currency: 'Euro (€)', language: 'Montenegrino',
    center: [42.2864, 18.84, 25], season: 'Maio a setembro', days: '3 a 5 dias', transport: 'Ônibus + barco',
    blurb: 'Riviera montenegrina e cidade antiga.',
    subtitle: 'Riviera montenegrina e cidade antiga.',
    attractions: ['Budva Old Town', 'Sveti Stefan', 'Mogren Beach', 'Kotor (bate-volta)', 'Jaz Beach', 'Duklja ruins'],
    neighborhoods: ['Old Town', 'Becici', 'Sveti Stefan', 'Jaz'], regions: ['Budva', 'Sveti Stefan', 'Kotor', 'Praias'],
    queriesBase: 'Budva Montenegro Old Town'
  },
  zurique: {
    folder: 'zurique', city: 'Zurique', country: 'Suíça', emoji: '🇨🇭', currency: 'Franco suíço (CHF)', language: 'Alemão',
    center: [47.3769, 8.5417, 25], season: 'Maio a setembro', days: '2 a 4 dias', transport: 'VBZ + SBB',
    blurb: 'Lagos, trens e a porta da Suíça.',
    subtitle: 'Lagos, trens e a porta da Suíça.',
    attractions: ['Old Town / Niederdorf', 'Lake Zurich', 'Bahnhofstrasse', 'Uetliberg', 'Kunsthaus', 'Lindt Home of Chocolate'],
    neighborhoods: ['Altstadt', 'Kreis 4', 'Seefeld', 'Oerlikon'], regions: ['Altstadt', 'Lago', 'Uetliberg', 'West'],
    queriesBase: 'Zurich Lake Switzerland'
  },
  genebra: {
    folder: 'genebra', city: 'Genebra', country: 'Suíça', emoji: '🇨🇭', currency: 'Franco suíço (CHF)', language: 'Francês',
    center: [46.2044, 6.1432, 25], season: 'Maio a setembro', days: '2 a 4 dias', transport: 'TPG + SBB',
    blurb: 'Lago Léman e organizações internacionais.',
    subtitle: 'Lago Léman e organizações internacionais.',
    attractions: ['Jet d\'Eau', 'Old Town', 'CERN', 'United Nations', 'Jardin Anglais', 'Carouge'],
    neighborhoods: ['Old Town', 'Eaux-Vives', 'Plainpalais', 'Carouge'], regions: ['Lago', 'Old Town', 'ONU', 'Carouge'],
    queriesBase: 'Geneva Jet d Eau'
  },
  'interior-suica': {
    folder: 'interior-suica', city: 'Interior da Suíça', country: 'Suíça', emoji: '🇨🇭', currency: 'Franco suíço (CHF)', language: 'Alemão / Francês / Italiano',
    center: [46.8182, 8.2275, 100], season: 'Junho a setembro (verão) / dezembro a março (inverno)', days: '5 a 8 dias', transport: 'SBB + teleféricos',
    blurb: 'Alpes, vilarejos e trilhas suíças.',
    subtitle: 'Alpes, vilarejos e trilhas suíças.',
    attractions: ['Interlaken', 'Jungfraujoch', 'Zermatt / Matterhorn', 'Lucerne', 'Grindelwald', 'Lake Lucerne'],
    neighborhoods: ['Interlaken', 'Zermatt', 'Lucerne', 'Grindelwald'], regions: ['Bernese Oberland', 'Valais', 'Lucerne', 'Alpes'],
    queriesBase: 'Swiss Alps Matterhorn'
  },
  andorra: {
    folder: 'andorra', city: 'Andorra', country: 'Andorra', emoji: '🇦🇩', currency: 'Euro (€)', language: 'Catalão',
    center: [42.5063, 1.5218, 30], season: 'Dezembro a março (esquí) / junho a setembro', days: '3 a 5 dias', transport: 'Ônibus + carro',
    blurb: 'Esqui e compras nos Pirineus.',
    subtitle: 'Esqui e compras nos Pirineus.',
    attractions: ['Andorra la Vella', 'Grandvalira', 'Caldea', 'Casa de la Vall', 'Ordino', 'Naturland'],
    neighborhoods: ['Andorra la Vella', 'Escaldes-Engordany', 'La Massana', 'Ordino'], regions: ['Capital', 'Grandvalira', 'Norte', 'Sul'],
    queriesBase: 'Andorra la Vella mountains'
  },
  edimburgo: {
    folder: 'edimburgo', city: 'Edimburgo', country: 'Reino Unido', emoji: '🇬🇧', currency: 'Libra (£)', language: 'Inglês',
    center: [55.9533, -3.1883, 25], season: 'Maio a setembro', days: '3 a 5 dias', transport: 'Lothian Buses + a pé',
    blurb: 'Castelo, Royal Mile e a Escócia.',
    subtitle: 'Castelo, Royal Mile e a Escócia.',
    attractions: ['Edinburgh Castle', 'Royal Mile', 'Arthur\'s Seat', 'Holyrood Palace', 'Calton Hill', 'Dean Village'],
    neighborhoods: ['Old Town', 'New Town', 'Leith', 'Stockbridge'], regions: ['Castle', 'Royal Mile', 'Arthur\'s Seat', 'New Town'],
    queriesBase: 'Edinburgh Castle Scotland'
  },
  glasgow: {
    folder: 'glasgow', city: 'Glasgow', country: 'Reino Unido', emoji: '🇬🇧', currency: 'Libra (£)', language: 'Inglês',
    center: [55.8642, -4.2518, 25], season: 'Maio a setembro', days: '2 a 4 dias', transport: 'Subway + ônibus',
    blurb: 'Arte, música e o oeste escocês.',
    subtitle: 'Arte, música e o oeste escocês.',
    attractions: ['Kelvingrove Museum', 'Cathedral', 'Merchant City', 'Riverside Museum', 'Ashton Lane', 'Necropolis'],
    neighborhoods: ['City Centre', 'West End', 'Merchant City', 'East End'], regions: ['Centre', 'West End', 'Riverside', 'East'],
    queriesBase: 'Glasgow Scotland'
  },
  bucareste: {
    folder: 'bucareste', city: 'Bucareste', country: 'Romênia', emoji: '🇷🇴', currency: 'Leu (RON)', language: 'Romeno',
    center: [44.4268, 26.1025, 30], season: 'Abril a outubro', days: '2 a 4 dias', transport: 'Metro + STB',
    blurb: 'Capital romena e porta para a Transilvânia.',
    subtitle: 'Capital romena e porta para a Transilvânia.',
    attractions: ['Palace of the Parliament', 'Old Town Lipscani', 'Atheneum', 'Herăstrău Park', 'Village Museum', 'Revolution Square'],
    neighborhoods: ['Old Town', 'Universitate', 'Floreasca', 'Cotroceni'], regions: ['Old Town', 'Parliament', 'North Parks', 'Centre'],
    queriesBase: 'Bucharest Old Town'
  },
  sofia: {
    folder: 'sofia', city: 'Sófia', country: 'Bulgária', emoji: '🇧🇬', currency: 'Lev (BGN)', language: 'Búlgaro',
    center: [42.6977, 23.3219, 25], season: 'Abril a outubro', days: '2 a 4 dias', transport: 'Metro + ônibus',
    blurb: 'Capital búlgara e os Bálcãs.',
    subtitle: 'Capital búlgara e os Bálcãs.',
    attractions: ['Alexander Nevsky Cathedral', 'Vitosha Boulevard', 'Boyana Church', 'National Palace of Culture', 'Serdica ruins', 'Vitosha Mountain'],
    neighborhoods: ['Centre', 'Lozenets', 'Studentski', 'Boyana'], regions: ['Centre', 'Vitosha', 'Boyana', 'South'],
    queriesBase: 'Sofia Alexander Nevsky'
  },
  dusseldorf: {
    folder: 'dusseldorf', city: 'Düsseldorf', country: 'Alemanha', emoji: '🇩🇪', currency: 'Euro (€)', language: 'Alemão',
    center: [51.2277, 6.7735, 25], season: 'Maio a setembro', days: '2 a 4 dias', transport: 'Rheinbahn + apps',
    blurb: 'Reno, design e o oeste alemão.',
    subtitle: 'Reno, design e o oeste alemão.',
    attractions: ['Altstadt', 'Königsallee', 'Rheinturm', 'MedienHafen', 'Schloss Benrath', 'Rhine promenade'],
    neighborhoods: ['Altstadt', 'Carlstadt', 'MedienHafen', 'Oberkassel'], regions: ['Altstadt', 'Königsallee', 'Hafen', 'Reno'],
    queriesBase: 'Dusseldorf Rhine Altstadt'
  },
  moscou: {
    folder: 'moscou', city: 'Moscou', country: 'Rússia', emoji: '🇷🇺', currency: 'Rublo (₽)', language: 'Russo',
    center: [55.7558, 37.6173, 40], season: 'Maio a setembro', days: '4 a 6 dias', transport: 'Metro + apps',
    blurb: 'Kremlin, metrô e a capital russa.',
    subtitle: 'Kremlin, metrô e a capital russa.',
    attractions: ['Red Square', 'Kremlin', 'St. Basil\'s Cathedral', 'Bolshoi Theatre', 'Gorky Park', 'VDNKh'],
    neighborhoods: ['Kitay-gorod', 'Arbat', 'Patriarshiye', 'Zamoskvorechye'], regions: ['Kremlin', 'Arbat', 'Park', 'North'],
    queriesBase: 'Moscow Red Square'
  },
  'sao-petersburgo': {
    folder: 'sao-petersburgo', city: 'São Petersburgo', country: 'Rússia', emoji: '🇷🇺', currency: 'Rublo (₽)', language: 'Russo',
    center: [59.9311, 30.3609, 40], season: 'Maio a setembro (noites brancas)', days: '4 a 6 dias', transport: 'Metro + barcos',
    blurb: 'Ermitage, canais e noites brancas.',
    subtitle: 'Ermitage, canais e noites brancas.',
    attractions: ['Hermitage Museum', 'Church of the Savior on Spilled Blood', 'Peterhof', 'Nevsky Prospekt', 'Peter and Paul Fortress', 'Catherine Palace'],
    neighborhoods: ['Central', 'Vasilyevsky Island', 'Petrograd Side', 'Admiralteysky'], regions: ['Hermitage', 'Nevsky', 'Peterhof', 'Canais'],
    queriesBase: 'Saint Petersburg Hermitage'
  },
  santorini: {
    folder: 'santorini', city: 'Santorini', country: 'Grécia', emoji: '🇬🇷', currency: 'Euro (€)', language: 'Grego',
    center: [36.3932, 25.4615, 20], season: 'Abril a junho e setembro', days: '3 a 5 dias', transport: 'Ônibus + ATV + barco',
    blurb: 'Caldeira, pôr do sol e as Ciclades.',
    subtitle: 'Caldeira, pôr do sol e as Ciclades.',
    attractions: ['Oia sunset', 'Fira', 'Red Beach', 'Ancient Akrotiri', 'Amoudi Bay', 'Pyrgos'],
    neighborhoods: ['Oia', 'Fira', 'Imerovigli', 'Perissa'], regions: ['Oia', 'Fira', 'Sul', 'Caldeira'],
    queriesBase: 'Santorini Oia sunset'
  }
};

const MUNDO = {
  // Ásia
  sydney: {
    folder: 'sydney', city: 'Sydney', country: 'Austrália', emoji: '🇦🇺', currency: 'Dólar australiano ($)', language: 'Inglês',
    center: [-33.8688, 151.2093, 40], season: 'Setembro a novembro e março a maio', days: '5 a 7 dias', transport: 'Opal + ferry + apps',
    blurb: 'Opera House, harbour e o ritmo da costa australiana.',
    subtitle: 'Opera House, harbour e o ritmo da costa australiana.',
    attractions: ['Sydney Opera House', 'Harbour Bridge', 'Bondi Beach', 'The Rocks', 'Taronga Zoo', 'Manly Ferry'],
    neighborhoods: ['Circular Quay', 'Bondi', 'Surry Hills', 'Manly'], regions: ['Harbour', 'Eastern Beaches', 'Inner West', 'North'],
    queriesBase: 'Sydney Opera House'
  },
  bangkok: {
    folder: 'bangkok', city: 'Bangkok', country: 'Tailândia', emoji: '🇹🇭', currency: 'Baht (฿)', language: 'Tailandês',
    center: [13.7563, 100.5018, 40], season: 'Novembro a fevereiro', days: '4 a 6 dias', transport: 'BTS + MRT + river boat',
    blurb: 'Templos, street food e como circular na capital tailandesa.',
    subtitle: 'Templos, street food e como circular na capital tailandesa.',
    attractions: ['Grand Palace', 'Wat Arun', 'Chatuchak Market', 'Khao San Road', 'Jim Thompson House', 'Chao Phraya river'],
    neighborhoods: ['Rattanakosin', 'Sukhumvit', 'Silom', 'Riverside'], regions: ['Old City', 'Sukhumvit', 'Riverside', 'Chatuchak'],
    queriesBase: 'Bangkok Grand Palace'
  },
  'hong-kong': {
    folder: 'hong-kong', city: 'Hong Kong', country: 'China', emoji: '🇭🇰', currency: 'Dólar de HK ($)', language: 'Cantonês / Inglês',
    center: [22.3193, 114.1694, 40], season: 'Outubro a dezembro', days: '4 a 6 dias', transport: 'MTR + Star Ferry',
    blurb: 'Skyline, dim sum e ilhas ao redor.',
    subtitle: 'Skyline, dim sum e ilhas ao redor.',
    attractions: ['Victoria Peak', 'Star Ferry', 'Temple Street Night Market', 'Big Buddha (Lantau)', 'Central / IFC', 'Stanley Market'],
    neighborhoods: ['Central', 'Tsim Sha Tsui', 'Wan Chai', 'Lantau'], regions: ['HK Island', 'Kowloon', 'Lantau', 'Harbour'],
    queriesBase: 'Hong Kong Victoria Harbour'
  },
  macau: {
    folder: 'macau', city: 'Macau', country: 'China', emoji: '🇲🇴', currency: 'Pataca (MOP)', language: 'Cantonês / Português',
    center: [22.1987, 113.5439, 20], season: 'Outubro a dezembro', days: '2 a 3 dias', transport: 'Ônibus + ferry',
    blurb: 'Herança portuguesa, cassinos e day trip de HK.',
    subtitle: 'Herança portuguesa, cassinos e day trip de HK.',
    attractions: ['Ruínas de São Paulo', 'Senado Square', 'Cotai Strip', 'A-Ma Temple', 'Macau Tower', 'Taipa Village'],
    neighborhoods: ['Peninsula', 'Taipa', 'Cotai', 'Coloane'], regions: ['Histórico', 'Cotai', 'Taipa', 'Coloane'],
    queriesBase: 'Macau Ruins of St Paul'
  },
  'kuala-lumpur': {
    folder: 'kuala-lumpur', city: 'Kuala Lumpur', country: 'Malásia', emoji: '🇲🇾', currency: 'Ringgit (RM)', language: 'Malaio',
    center: [3.139, 101.6869, 30], season: 'Maio a julho e dezembro', days: '3 a 5 dias', transport: 'LRT + MRT + Monorail',
    blurb: 'Petronas, street food e o hub malaio.',
    subtitle: 'Petronas, street food e o hub malaio.',
    attractions: ['Petronas Towers', 'Batu Caves', 'Merdeka Square', 'Jalan Alor', 'KL Tower', 'Islamic Arts Museum'],
    neighborhoods: ['KLCC', 'Bukit Bintang', 'Chinatown', 'Bangsar'], regions: ['KLCC', 'Heritage', 'Batu Caves', 'Food streets'],
    queriesBase: 'Kuala Lumpur Petronas'
  },
  singapura: {
    folder: 'singapura', city: 'Singapura', country: 'Singapura', emoji: '🇸🇬', currency: 'Dólar de Singapura ($)', language: 'Inglês / Mandarim / Malaio',
    center: [1.3521, 103.8198, 25], season: 'Fevereiro a abril', days: '3 a 5 dias', transport: 'MRT + ônibus',
    blurb: 'Marina Bay, hawker centers e a cidade-estado.',
    subtitle: 'Marina Bay, hawker centers e a cidade-estado.',
    attractions: ['Marina Bay Sands', 'Gardens by the Bay', 'Sentosa', 'Chinatown', 'Orchard Road', 'Hawker centers'],
    neighborhoods: ['Marina Bay', 'Chinatown', 'Little India', 'Orchard'], regions: ['Marina', 'Sentosa', 'Heritage', 'Orchard'],
    queriesBase: 'Singapore Marina Bay'
  },
  seul: {
    folder: 'seul', city: 'Seul', country: 'Coreia do Sul', emoji: '🇰🇷', currency: 'Won (₩)', language: 'Coreano',
    center: [37.5665, 126.978, 40], season: 'Abril a junho e setembro a outubro', days: '5 a 7 dias', transport: 'Metro + apps',
    blurb: 'Palácios, K-culture e metrô impecável.',
    subtitle: 'Palácios, K-culture e metrô impecável.',
    attractions: ['Gyeongbokgung', 'Bukchon Hanok Village', 'Myeongdong', 'Hongdae', 'N Seoul Tower', 'Dongdaemun'],
    neighborhoods: ['Jongno', 'Gangnam', 'Hongdae', 'Itaewon'], regions: ['Palaces', 'Gangnam', 'Hongdae', 'Namsan'],
    queriesBase: 'Seoul Gyeongbokgung'
  },
  pequim: {
    folder: 'pequim', city: 'Pequim', country: 'China', emoji: '🇨🇳', currency: 'Yuan (¥)', language: 'Mandarim',
    center: [39.9042, 116.4074, 50], season: 'Abril a maio e setembro a outubro', days: '5 a 7 dias', transport: 'Metro + apps',
    blurb: 'Cidade Proibida, Muralha e hutongs.',
    subtitle: 'Cidade Proibida, Muralha e hutongs.',
    attractions: ['Forbidden City', 'Great Wall (Mutianyu)', 'Temple of Heaven', 'Summer Palace', 'Tiananmen Square', 'Hutongs'],
    neighborhoods: ['Dongcheng', 'Chaoyang', 'Haidian', 'Xicheng'], regions: ['Forbidden City', 'Wall', 'Summer Palace', 'Hutongs'],
    queriesBase: 'Beijing Forbidden City'
  },
  quioto: {
    folder: 'quioto', city: 'Quioto', country: 'Japão', emoji: '🇯🇵', currency: 'Iene (¥)', language: 'Japonês',
    center: [35.0116, 135.7681, 30], season: 'Março a maio e outubro a novembro', days: '4 a 6 dias', transport: 'Ônibus + metro + bicicleta',
    blurb: 'Templos, gueixas e o Japão clássico.',
    subtitle: 'Templos, gueixas e o Japão clássico.',
    attractions: ['Fushimi Inari', 'Kiyomizu-dera', 'Arashiyama Bamboo Grove', 'Gion', 'Kinkaku-ji', 'Nishiki Market'],
    neighborhoods: ['Gion', 'Higashiyama', 'Arashiyama', 'Central'], regions: ['Higashiyama', 'Arashiyama', 'North temples', 'Gion'],
    queriesBase: 'Kyoto Fushimi Inari'
  },
  'chiang-mai': {
    folder: 'chiang-mai', city: 'Chiang Mai', country: 'Tailândia', emoji: '🇹🇭', currency: 'Baht (฿)', language: 'Tailandês',
    center: [18.7883, 98.9853, 30], season: 'Novembro a fevereiro', days: '4 a 6 dias', transport: 'Songthaew + scooter + apps',
    blurb: 'Templos do norte e natureza ao redor.',
    subtitle: 'Templos do norte e natureza ao redor.',
    attractions: ['Doi Suthep', 'Old City temples', 'Night Bazaar', 'Elephant Nature Park', 'Sunday Walking Street', 'Nimmanhaemin'],
    neighborhoods: ['Old City', 'Nimman', 'Riverside', 'Santitham'], regions: ['Old City', 'Doi Suthep', 'Nimman', 'Nature'],
    queriesBase: 'Chiang Mai Doi Suthep'
  },
  hangzhou: {
    folder: 'hangzhou', city: 'Hangzhou', country: 'China', emoji: '🇨🇳', currency: 'Yuan (¥)', language: 'Mandarim',
    center: [30.2741, 120.1551, 30], season: 'Março a maio e setembro a novembro', days: '3 a 5 dias', transport: 'Metro + bicicleta + barco',
    blurb: 'Lago Oeste e o charme do leste chinês.',
    subtitle: 'Lago Oeste e o charme do leste chinês.',
    attractions: ['West Lake', 'Lingyin Temple', 'Leifeng Pagoda', 'Longjing Tea Fields', 'Qinghefang Street', 'Xixi Wetland'],
    neighborhoods: ['West Lake', 'Hubin', 'Xihu District', 'Binjiang'], regions: ['West Lake', 'Temples', 'Tea hills', 'Wetland'],
    queriesBase: 'Hangzhou West Lake'
  },
  // Oriente Médio
  meca: {
    folder: 'meca', city: 'Meca', country: 'Arábia Saudita', emoji: '🇸🇦', currency: 'Riyal (SAR)', language: 'Árabe',
    center: [21.3891, 39.8579, 20], season: 'Fora do Hajj (verifique calendário islâmico)', days: '3 a 7 dias (peregrinação)', transport: 'Ônibus + apps oficiais',
    blurb: 'Planejamento especial para a cidade sagrada.',
    subtitle: 'Planejamento especial para a cidade sagrada.',
    attractions: ['Masjid al-Haram', 'Kaaba', 'Abraj Al-Bait', 'Jabal al-Nour', 'Mount Arafat', 'Mina'],
    neighborhoods: ['Central Haram', 'Aziziyah', 'Al Misfalah', 'Ibrahim Al Khalil'], regions: ['Haram', 'Abraj', 'Arafat', 'Mina'],
    queriesBase: 'Mecca Masjid al-Haram'
  },
  antalya: {
    folder: 'antalya', city: 'Antalya', country: 'Turquia', emoji: '🇹🇷', currency: 'Lira turca (₺)', language: 'Turco',
    center: [36.8969, 30.7133, 40], season: 'Abril a junho e setembro a outubro', days: '5 a 7 dias', transport: 'Tram + apps + carro',
    blurb: 'Costa turquesa, ruínas e resorts.',
    subtitle: 'Costa turquesa, ruínas e resorts.',
    attractions: ['Kaleiçi Old Town', 'Düden Waterfalls', 'Aspendos', 'Karaalioglu Park', 'Konyaaltı Beach', 'Termessos'],
    neighborhoods: ['Kaleiçi', 'Lara', 'Konyaaltı', 'Muratpaşa'], regions: ['Old Town', 'Lara', 'Konyaaltı', 'Ruínas'],
    queriesBase: 'Antalya Kaleici'
  },
  jerusalem: {
    folder: 'jerusalem', city: 'Jerusalém', country: 'Israel', emoji: '🇮🇱', currency: 'Shekel (₪)', language: 'Hebraico / Árabe',
    center: [31.7683, 35.2137, 20], season: 'Março a maio e setembro a novembro', days: '3 a 5 dias', transport: 'Light Rail + a pé',
    blurb: 'Cidade Antiga e camadas de história.',
    subtitle: 'Cidade Antiga e camadas de história.',
    attractions: ['Western Wall', 'Church of the Holy Sepulchre', 'Dome of the Rock view', 'Mahane Yehuda', 'Mount of Olives', 'Israel Museum'],
    neighborhoods: ['Old City', 'West Jerusalem', 'East Jerusalem', 'Rehavia'], regions: ['Old City', 'Mount of Olives', 'West', 'Museums'],
    queriesBase: 'Jerusalem Old City'
  },
  'tel-aviv': {
    folder: 'tel-aviv', city: 'Tel Aviv', country: 'Israel', emoji: '🇮🇱', currency: 'Shekel (₪)', language: 'Hebraico',
    center: [32.0853, 34.7818, 20], season: 'Março a maio e outubro a novembro', days: '3 a 5 dias', transport: 'Dan bus + apps + bicicleta',
    blurb: 'Praia, bauhaus e vida noturna.',
    subtitle: 'Praia, bauhaus e vida noturna.',
    attractions: ['Tel Aviv Beach', 'Old Jaffa', 'Carmel Market', 'Bauhaus White City', 'Neve Tzedek', 'Rothschild Boulevard'],
    neighborhoods: ['City Center', 'Florentin', 'Neve Tzedek', 'Jaffa'], regions: ['Beach', 'Jaffa', 'White City', 'Markets'],
    queriesBase: 'Tel Aviv beach Jaffa'
  },
  'abu-dhabi': {
    folder: 'abu-dhabi', city: 'Abu Dhabi', country: 'Emirados Árabes Unidos', emoji: '🇦🇪', currency: 'Dirham (AED)', language: 'Árabe / Inglês',
    center: [24.4539, 54.3773, 40], season: 'Novembro a março', days: '3 a 5 dias', transport: 'Apps + ônibus',
    blurb: 'Sheikh Zayed, Louvre Abu Dhabi e a capital dos EAU.',
    subtitle: 'Sheikh Zayed, Louvre Abu Dhabi e a capital dos EAU.',
    attractions: ['Sheikh Zayed Grand Mosque', 'Louvre Abu Dhabi', 'Qasr Al Watan', 'Yas Island', 'Corniche', 'Emirates Palace area'],
    neighborhoods: ['Corniche', 'Al Maryah', 'Yas Island', 'Saadiyat'], regions: ['Mosque', 'Saadiyat', 'Yas', 'Corniche'],
    queriesBase: 'Abu Dhabi Sheikh Zayed Mosque'
  },
  capadocia: {
    folder: 'capadocia', city: 'Capadócia', country: 'Turquia', emoji: '🇹🇷', currency: 'Lira turca (₺)', language: 'Turco',
    center: [38.6431, 34.8289, 40], season: 'Abril a junho e setembro a outubro', days: '3 a 5 dias', transport: 'Shuttle + ATV + balão',
    blurb: 'Balões, chimneys e o interior turco.',
    subtitle: 'Balões, chimneys e o interior turco.',
    attractions: ['Göreme Open-Air Museum', 'Hot air balloons', 'Uçhisar Castle', 'Underground cities', 'Love Valley', 'Pasabag'],
    neighborhoods: ['Göreme', 'Ürgüp', 'Uçhisar', 'Avanos'], regions: ['Göreme', 'Valleys', 'Uçhisar', 'Underground'],
    queriesBase: 'Cappadocia balloons Goreme'
  },
  // África
  cairo: {
    folder: 'cairo', city: 'Cairo', country: 'Egito', emoji: '🇪🇬', currency: 'Libra egípcia (E£)', language: 'Árabe',
    center: [30.0444, 31.2357, 40], season: 'Outubro a abril', days: '4 a 6 dias', transport: 'Metro + apps + Nile boat',
    blurb: 'Pirâmides, Museu Egípcio e o Nilo.',
    subtitle: 'Pirâmides, Museu Egípcio e o Nilo.',
    attractions: ['Giza Pyramids', 'Sphinx', 'Egyptian Museum / GEM', 'Khan el-Khalili', 'Citadel', 'Nile felucca'],
    neighborhoods: ['Zamalek', 'Downtown', 'Giza', 'Islamic Cairo'], regions: ['Giza', 'Islamic Cairo', 'Nile', 'Downtown'],
    queriesBase: 'Cairo Giza Pyramids'
  },
  'cidade-do-cabo': {
    folder: 'cidade-do-cabo', city: 'Cidade do Cabo', country: 'África do Sul', emoji: '🇿🇦', currency: 'Rand (R)', language: 'Inglês / Africâner',
    center: [-33.9249, 18.4241, 40], season: 'Novembro a março', days: '5 a 7 dias', transport: 'Carro + Uber + MyCiTi',
    blurb: 'Table Mountain, vinícolas e a ponta da África.',
    subtitle: 'Table Mountain, vinícolas e a ponta da África.',
    attractions: ['Table Mountain', 'Cape Point', 'V&A Waterfront', 'Bo-Kaap', 'Stellenbosch wine', 'Boulders Beach'],
    neighborhoods: ['City Bowl', 'Waterfront', 'Camps Bay', 'Bo-Kaap'], regions: ['Table Mountain', 'Peninsula', 'Winelands', 'Atlantic'],
    queriesBase: 'Cape Town Table Mountain'
  },
  joanesburgo: {
    folder: 'joanesburgo', city: 'Joanesburgo', country: 'África do Sul', emoji: '🇿🇦', currency: 'Rand (R)', language: 'Inglês / Zulu',
    center: [-26.2041, 28.0473, 40], season: 'Março a maio e setembro a novembro', days: '3 a 5 dias', transport: 'Uber + Gautrain',
    blurb: 'História, Soweto e porta para safáris.',
    subtitle: 'História, Soweto e porta para safáris.',
    attractions: ['Apartheid Museum', 'Soweto / Vilakazi Street', 'Constitution Hill', 'Maboneng', 'Gold Reef City', 'Cradle of Humankind'],
    neighborhoods: ['Sandton', 'Maboneng', 'Melville', 'Soweto'], regions: ['Sandton', 'Soweto', 'Inner City', 'Cradle'],
    queriesBase: 'Johannesburg Soweto'
  },
  marraquexe: {
    folder: 'marraquexe', city: 'Marraquexe', country: 'Marrocos', emoji: '🇲🇦', currency: 'Dirham (MAD)', language: 'Árabe / Francês',
    center: [31.6295, -7.9811, 30], season: 'Março a maio e setembro a novembro', days: '3 a 5 dias', transport: 'Táxi + a pé + bus',
    blurb: 'Medina, souks e o Atlas próximo.',
    subtitle: 'Medina, souks e o Atlas próximo.',
    attractions: ['Jemaa el-Fnaa', 'Bahia Palace', 'Majorelle Garden', 'Koutoubia', 'Souks', 'Atlas day trip'],
    neighborhoods: ['Medina', 'Gueliz', 'Hivernage', 'Palmeraie'], regions: ['Medina', 'Gardens', 'Gueliz', 'Atlas'],
    queriesBase: 'Marrakech Jemaa el-Fnaa'
  },
  casablanca: {
    folder: 'casablanca', city: 'Casablanca', country: 'Marrocos', emoji: '🇲🇦', currency: 'Dirham (MAD)', language: 'Árabe / Francês',
    center: [33.5731, -7.5898, 30], season: 'Março a junho e setembro a novembro', days: '2 a 3 dias', transport: 'Tram + táxi',
    blurb: 'Hassan II e a costa atlântica marroquina.',
    subtitle: 'Hassan II e a costa atlântica marroquina.',
    attractions: ['Hassan II Mosque', 'Corniche', 'Old Medina', 'Rick\'s Café', 'Quartier Habous', 'Morocco Mall'],
    neighborhoods: ['Corniche', 'Centre Ville', 'Maarif', 'Ain Diab'], regions: ['Mosque', 'Corniche', 'Medina', 'Maarif'],
    queriesBase: 'Casablanca Hassan II Mosque'
  },
  lagos: {
    folder: 'lagos', city: 'Lagos', country: 'Nigéria', emoji: '🇳🇬', currency: 'Naira (₦)', language: 'Inglês',
    center: [6.5244, 3.3792, 40], season: 'Novembro a março', days: '3 a 5 dias', transport: 'Apps + ferry + BRT',
    blurb: 'Megalópole nigeriana e a costa oeste africana.',
    subtitle: 'Megalópole nigeriana e a costa oeste africana.',
    attractions: ['Lekki Conservation Centre', 'Nike Art Gallery', 'Tarkwa Bay', 'National Museum', 'Victoria Island', 'Freedom Park'],
    neighborhoods: ['Victoria Island', 'Ikoyi', 'Lekki', 'Yaba'], regions: ['Island', 'Lekki', 'Mainland', 'Bay'],
    queriesBase: 'Lagos Nigeria Victoria Island'
  },
  // Oceania
  melbourne: {
    folder: 'melbourne', city: 'Melbourne', country: 'Austrália', emoji: '🇦🇺', currency: 'Dólar australiano ($)', language: 'Inglês',
    center: [-37.8136, 144.9631, 30], season: 'Março a maio e setembro a novembro', days: '4 a 6 dias', transport: 'Tram + train + apps',
    blurb: 'Cafés, laneways e a costa de Victoria.',
    subtitle: 'Cafés, laneways e a costa de Victoria.',
    attractions: ['Federation Square', 'Great Ocean Road (bate-volta)', 'Queen Victoria Market', 'St Kilda', 'Laneways / street art', 'Royal Botanic Gardens'],
    neighborhoods: ['CBD', 'Fitzroy', 'St Kilda', 'South Yarra'], regions: ['CBD', 'Inner North', 'Bay', 'Gardens'],
    queriesBase: 'Melbourne Federation Square'
  },
  auckland: {
    folder: 'auckland', city: 'Auckland', country: 'Nova Zelândia', emoji: '🇳🇿', currency: 'Dólar neozelandês ($)', language: 'Inglês / Māori',
    center: [-36.8485, 174.7633, 40], season: 'Dezembro a março', days: '3 a 5 dias', transport: 'AT Hop + ferry + carro',
    blurb: 'Porta de entrada para a Nova Zelândia.',
    subtitle: 'Porta de entrada para a Nova Zelândia.',
    attractions: ['Sky Tower', 'Waiheke Island', 'Auckland Domain', 'Viaduct Harbour', 'Rangitoto', 'Piha Beach'],
    neighborhoods: ['CBD', 'Ponsonby', 'Parnell', 'Devonport'], regions: ['Harbour', 'Waiheke', 'West Coast', 'CBD'],
    queriesBase: 'Auckland Sky Tower'
  }
};

export const REGION_GROUPS = {
  americas: {
    label: 'Américas',
    ids: Object.keys(META)
  },
  europa: {
    label: 'Europa',
    ids: Object.keys(EUROPE)
  },
  mundo: {
    label: 'Ásia / Oriente Médio / África / Oceania',
    ids: Object.keys(MUNDO)
  }
};

export const ALL_REMAINING = { ...META, ...EUROPE, ...MUNDO };

export function toExtra(id) {
  const m = ALL_REMAINING[id];
  if (!m) throw new Error(`Unknown destination id: ${id}`);
  return {
    ...m,
    slug: `como-planejar-viagem-${m.folder}`,
    title: `${m.city}: Guia completo`
  };
}

export function listIdsForGroup(group) {
  const g = REGION_GROUPS[group];
  if (!g) throw new Error(`Unknown group ${group}. Use: ${Object.keys(REGION_GROUPS).join(', ')}`);
  return g.ids;
}

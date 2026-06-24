// 2GO Travel Headless CMS Layer Mock (Sanity/Contentful/Supabase Ready)

const destinations = {
  paris: {
    name: 'Paris',
    slug: 'paris',
    country: 'França',
    emoji: '🇫🇷',
    description: 'A capital da luz, arte, bistrôs tradicionais e passeios românticos à beira do Rio Sena.',
    longDescription: 'Paris é uma das maiores metrópoles do mundo e um epicentro global de cultura, moda, gastronomia e história. Das ruelas medievais de Montmartre aos bulevares elegantes desenhados por Haussmann, a cidade oferece uma fusão única entre charme clássico e inovação cosmopolita.',
    image: '/assets/paris.png',
    bestTime: 'Primavera (Abril a Junho) e Outono (Setembro a Novembro)',
    visaRequired: 'Isento por até 90 dias (Espaço Schengen)',
    currency: 'Euro (€)',
    language: 'Francês',
    weatherInfo: 'Clima temperado. Verões amenos (15°C a 25°C) e invernos frios (3°C a 8°C).',
    clima: 'Paris possui quatro estações bem definidas. A primavera (abril a junho) apresenta temperaturas agradáveis de 12°C a 20°C e florescimento dos jardins. O verão (julho e agosto) pode registrar picos quentes perto de 30°C. O outono é charmoso e fresco, enquanto o inverno é úmido, cinzento e com médias de 4°C, exigindo bons casacos.',
    mapImg: '/assets/paris.png',
    localTips: [
      'Compre ingressos para o Louvre e Torre Eiffel com pelo menos 1 mês de antecedência.',
      'Evite comer em restaurantes vizinhos diretos dos monumentos turísticos; ande 3 quadras para encontrar bistrôs reais.',
      'Use o aplicativo Citymapper para planejar suas rotas de metrô em tempo real.'
    ],
    restaurants: [
      { name: 'Le Comptoir du Relais', type: 'Bistrô Francês Tradicional', priceRange: '$$$', desc: 'Localizado em Saint-Germain, oferece pratos franceses autênticos com ingredientes locais frescos sob curadoria do chef Yves Camdeborde.' },
      { name: 'Angelina', type: 'Café & Confeitaria', priceRange: '$$', desc: 'Famoso mundialmente por seu chocolate quente denso e o lendário doce Mont-Blanc.' },
      { name: 'Bouillon Pigalle', type: 'Cozinha Popular Francesa', priceRange: '$', desc: 'Pratos clássicos servidos de forma rápida, deliciosa e extremamente acessível.' }
    ],
    faqs: [
      { q: 'Qual a melhor época para visitar Paris?', a: 'Os melhores meses são de abril a junho (primavera) e setembro a outubro (outono), quando o clima está ameno e os jardins estão deslumbrantes.' },
      { q: 'Paris exige visto para brasileiros?', a: 'Não. Brasileiros não precisam de visto para turismo por até 90 dias, mas é obrigatório apresentar passaporte com validade mínima de 3 meses, seguro viagem e comprovante financeiro.' },
      { q: 'Como funciona o transporte público em Paris?', a: 'O metrô de Paris é um dos melhores do mundo. Recomendamos comprar o passe recarregável Navigo Easy ou passes semanais Navigo Decouverte para economizar.' }
    ],
    attractions: [
      { title: 'Torre Eiffel', desc: 'O monumento pago mais visitado do mundo, inaugurado em 1889 para a Exposição Universal.', rating: '4.8★', hours: '09:30 - 23:45' },
      { title: 'Museu do Louvre', desc: 'O maior museu de arte do mundo, lar da Mona Lisa e da Vênus de Milo.', rating: '4.7★', hours: '09:00 - 18:00 (Fechado às terças)' },
      { title: 'Catedral de Notre-Dame', desc: 'Uma obra-prima da arquitetura gótica francesa, localizada na Île de la Cité.', rating: '4.8★', hours: 'Visita externa' },
      { title: 'Arco do Triunfo & Champs-Élysées', desc: 'Monumento histórico com vista panorâmica para a avenida mais famosa de Paris.', rating: '4.6★', hours: '10:00 - 23:00' }
    ],
    costs: {
      economy: { daily: 70, meal: 20, ticket: 15, transport: 5, hotel: 30 },
      comfort: { daily: 160, meal: 45, ticket: 30, transport: 10, hotel: 75 },
      luxury: { daily: 450, meal: 120, ticket: 60, transport: 50, hotel: 220 }
    }
  },
  roma: {
    name: 'Roma',
    slug: 'roma',
    country: 'Itália',
    emoji: '🇮🇹',
    description: 'Um museu a céu aberto combinando vestígios do Império Romano com a melhor culinária do mundo.',
    longDescription: 'Roma, a Cidade Eterna, conta com quase três milênios de história documentada. Ruínas monumentais como o Coliseu e o Fórum Romano erguem-se no coração da cidade moderna, cercadas por fontes barrocas, palácios renascentistas e a vibrante cultura da massa fresca e do gelato.',
    image: '/assets/greece.png',
    bestTime: 'Abril a Junho e Setembro a Outubro',
    visaRequired: 'Isento por até 90 dias',
    currency: 'Euro (€)',
    language: 'Italiano',
    weatherInfo: 'Clima mediterrâneo. Verões quentes e secos (22°C a 32°C) e invernos úmidos e frescos (5°C a 13°C).',
    clima: 'Roma possui verões intensos e quentes (julho e agosto) onde as temperaturas passam dos 30°C e as ruelas ficam lotadas. A primavera (abril a junho) e o outono (setembro e outubro) são ideais, com dias claros e médias amenas de 17°C a 24°C, propícias para caminhadas históricas.',
    mapImg: '/assets/greece.png',
    localTips: [
      'Reserve as visitas ao Coliseu e Museus do Vaticano com no mínimo 3 semanas de antecedência.',
      'Sempre carregue uma garrafa d\'água vazia; Roma possui centenas de fontes históricas ("nasoni") com água potável e gelada gratuita.',
      'Não peça cappuccino após as 11h da manhã; para os italianos, café com leite é estritamente uma bebida matinal.'
    ],
    restaurants: [
      { name: 'Da Enzo al 29', type: 'Trattoria Romana Clássica', priceRange: '$$', desc: 'Pequena trattoria no Trastevere famosa por servir a melhor carbonara e alcachofras fritas de Roma.' },
      { name: 'Frigidarium', type: 'Gelateria Artesanal', priceRange: '$', desc: 'Gelatos cremosos com calda de chocolate quente que endurece formando uma casca crocante.' },
      { name: 'Armando al Pantheon', type: 'Cozinha Histórica Romana', priceRange: '$$$', desc: 'Localizado a poucos passos do Pantheon, oferece receitas romanas tradicionais refinadas desde 1961.' }
    ],
    faqs: [
      { q: 'Preciso comprar ingressos para o Coliseu com antecedência?', a: 'Sim. Os ingressos para o Coliseu, Fórum Romano e Vaticano esgotam com semanas de antecedência. É altamente recomendado reservar passeios fura-fila online.' },
      { q: 'O que comer de típico em Roma?', a: 'Não deixe de experimentar os quatro clássicos da massa romana: Carbonara, Cacio e Pepe, Amatriciana e Gricia, acompanhados de vinho da casa.' }
    ],
    attractions: [
      { title: 'Coliseu', desc: 'O maior anfiteatro do mundo clássico, palco de lutas de gladiadores.', rating: '4.9★', hours: '08:30 - 19:00' },
      { title: 'Fontana di Trevi', desc: 'A fonte barroca mais famosa do mundo, onde visitantes jogam moedas para garantir o retorno.', rating: '4.7★', hours: 'Acesso livre (24h)' },
      { title: 'Pantheon', desc: 'O templo romano mais bem preservado do mundo, famoso por sua cúpula de concreto não armado.', rating: '4.8★', hours: '09:00 - 19:00' },
      { title: 'Museus do Vaticano & Capela Sistina', desc: 'Coleções artísticas papais e os afrescos lendários pintados por Michelangelo.', rating: '4.8★', hours: '08:00 - 19:00 (Fechado aos domingos)' }
    ],
    costs: {
      economy: { daily: 60, meal: 18, ticket: 12, transport: 3, hotel: 27 },
      comfort: { daily: 140, meal: 38, ticket: 25, transport: 7, hotel: 70 },
      luxury: { daily: 380, meal: 100, ticket: 50, transport: 40, hotel: 190 }
    }
  },
  lisboa: {
    name: 'Lisboa',
    slug: 'lisboa',
    country: 'Portugal',
    emoji: '🇵🇹',
    description: 'Sete colinas de azulejos históricos, bondes amarelos, pastéis de nata e brisa do Rio Tejo.',
    longDescription: 'Lisboa é uma das cidades mais antigas da Europa Ocidental, banhada pelo sol e colorida por seus azulejos tradicionais. A capital de Portugal mescla o charme nostálgico do fado no bairro de Alfama com a modernidade tecnológica do Parque das Nações.',
    image: '/assets/norway.png',
    bestTime: 'Março a Maio e Setembro a Novembro',
    visaRequired: 'Isento por até 90 dias',
    currency: 'Euro (€)',
    language: 'Português',
    weatherInfo: 'Clima temperado mediterrâneo. Verões quentes e ensolarados e invernos chuvosos e suaves.',
    clima: 'Lisboa goza de um dos climas mais amenos da Europa, com mais de 300 dias de sol por ano. Os invernos são suaves, com mínimas de 9°C, enquanto os verões são quentes e secos, variando de 18°C a 29°C, sempre refrescados pela brisa do Rio Tejo.',
    mapImg: '/assets/norway.png',
    localTips: [
      'Para andar no famoso Elétrico 28 sem filas monumentais, embarque nas primeiras horas da manhã ou no início da noite.',
      'Compre o cartão Navegante nas estações de metrô para economizar nos custos de transporte diário.',
      'Sintam-se à vontade para pedir o "menu do dia" nos almoços das tascas típicas para comer pratos fartos por valores baixíssimos.'
    ],
    restaurants: [
      { name: 'Cervejaria Ramiro', type: 'Marisqueira Portuguesa', priceRange: '$$$', desc: 'O templo dos frutos do mar em Lisboa. Espere filas, mas delicie-se com camarões gigantes, sapateira e o clássico prego de carne no final.' },
      { name: 'Pastéis de Belém', type: 'Confeitaria Histórica', priceRange: '$', desc: 'Fábrica original que produz a receita secreta e exclusiva dos pastéis de nata originais desde 1837.' },
      { name: 'Taberna da Rua das Flores', type: 'Petiscos Portugueses Modernos', priceRange: '$$', desc: 'Pequeno restaurante intimista que serve pratos portugueses reimaginados em formato de partilha.' }
    ],
    faqs: [
      { q: 'Lisboa é uma cidade cara?', a: 'Lisboa é uma das capitais mais baratas da Europa Ocidental, com alimentação, transporte e hospedagem com excelente custo-benefício em comparação a Paris e Londres.' },
      { q: 'Como ir de Lisboa para Sintra?', a: 'Há trens diretos saindo da estação do Rossio no centro de Lisboa a cada 20 minutos. O trajeto dura cerca de 40 minutos e custa menos de €3.' }
    ],
    attractions: [
      { title: 'Torre de Belém', desc: 'Monumento icônico às margens do Rio Tejo, símbolo da era dos Descobrimentos.', rating: '4.7★', hours: '10:00 - 17:30 (Fechado às segundas)' },
      { title: 'Castelo de São Jorge', desc: 'Fortaleza medieval no topo da colina mais alta de Lisboa com vista panorâmica.', rating: '4.6★', hours: '09:00 - 21:00' },
      { title: 'Mosteiro dos Jerónimos', desc: 'Um dos principais exemplos do estilo gótico manuelino em Portugal.', rating: '4.8★', hours: '10:00 - 18:00 (Fechado às segundas)' },
      { title: 'Bairro de Alfama', desc: 'O bairro mais antigo e tradicional de Lisboa, famoso pelas casas de Fado.', rating: '4.7★', hours: 'Acesso livre (24h)' }
    ],
    costs: {
      economy: { daily: 55, meal: 15, ticket: 10, transport: 3, hotel: 27 },
      comfort: { daily: 120, meal: 32, ticket: 20, transport: 6, hotel: 62 },
      luxury: { daily: 320, meal: 85, ticket: 40, transport: 35, hotel: 160 }
    }
  },
  londres: {
    name: 'Londres',
    slug: 'londres',
    country: 'Reino Unido',
    emoji: '🇬🇧',
    description: 'Uma metrópole fascinante unindo tradição monárquica, museus gratuitos e pubs seculares.',
    longDescription: 'Londres é uma metrópole global pulsante, rica em marcos históricos e atrações de renome mundial. Ela funde séculos de história régia representada pelo Palácio de Buckingham com uma vanguarda artística de classe internacional no Soho e no Covent Garden.',
    image: '/assets/paris.png',
    bestTime: 'Maio a Setembro',
    visaRequired: 'Isento por até 180 dias',
    currency: 'Libra Esterlina (£)',
    language: 'Inglês',
    weatherInfo: 'Clima temperado oceânico. Muitas nuvens e chuvas leves frequentes. Temperaturas médias de 12°C a 22°C no verão.',
    clima: 'Conhecida por sua garoa constante, Londres na verdade chove menos em volume que Paris ou Roma, mas os dias são frequentemente nublados. O verão (junho a agosto) é a melhor época, com dias longos de sol (até 22h) e médias de 18°C a 24°C.',
    mapImg: '/assets/paris.png',
    localTips: [
      'Não compre passagens de metrô avulsas; basta aproximar seu cartão de crédito por aproximação (Contactless) nas catracas para pagar a tarifa mais barata.',
      'Aproveite a gratuidade dos grandes museus públicos, mas agende o horário gratuito de entrada nos sites oficiais para evitar filas.',
      'Para uma vista incrível e gratuita do horizonte de Londres, agende o acesso ao jardim suspenso Sky Garden com duas semanas de antecedência.'
    ],
    restaurants: [
      { name: 'Dishoom', type: 'Cozinha Anglo-Indiana', priceRange: '$$', desc: 'Uma homenagem aos cafés iranianos de Bombaim. O café da manhã com naan de bacon e o clássico House Black Daal são lendários.' },
      { name: 'The Churchill Arms', type: 'Pub Histórico & Tailandês', priceRange: '$$', desc: 'Famoso por sua fachada inteiramente coberta de flores e sua decoração interior repleta de relíquias reais, servindo comida tailandesa de qualidade.' },
      { name: 'Rules', type: 'Cozinha Britânica Tradicional', priceRange: '$$$$', desc: 'Fundado em 1798, é o restaurante mais antigo de Londres, especializado em carnes de caça assadas e tortas tradicionais.' }
    ],
    faqs: [
      { q: 'Os museus em Londres são gratuitos?', a: 'Sim! A maioria dos grandes museus de Londres (British Museum, National Gallery, Natural History Museum, Science Museum e Tate Modern) têm entrada 100% gratuita.' },
      { q: 'Preciso de visto para visitar Londres?', a: 'Brasileiros a turismo não precisam de visto para estadias de até 6 meses. No entanto, é obrigatório passar pelo controle de imigração na chegada.' }
    ],
    attractions: [
      { title: 'Big Ben & Palácio de Westminster', desc: 'O relógio mais icônico do mundo e o parlamento britânico às margens do Tâmisa.', rating: '4.8★', hours: 'Visita externa' },
      { title: 'London Eye', desc: 'Roda-gigante moderna que oferece uma das melhores vistas aéreas de Londres.', rating: '4.6★', hours: '10:00 - 20:30' },
      { title: 'Museu Britânico', desc: 'Reúne milhões de obras documentando a história e cultura da humanidade.', rating: '4.7★', hours: '10:00 - 17:00' },
      { title: 'Tower Bridge', desc: 'Ponte levadiça histórica com suas torres góticas icônicas.', rating: '4.8★', hours: '09:30 - 18:00' }
    ],
    costs: {
      economy: { daily: 80, meal: 22, ticket: 10, transport: 8, hotel: 40 },
      comfort: { daily: 190, meal: 50, ticket: 25, transport: 15, hotel: 100 },
      luxury: { daily: 520, meal: 140, ticket: 60, transport: 60, hotel: 260 }
    }
  },
  toquio: {
    name: 'Tóquio',
    slug: 'toquio',
    country: 'Japão',
    emoji: '🇯🇵',
    description: 'O contraste surreal entre luzes de neon de arranha-céus futuristas e templos budistas silenciosos.',
    longDescription: 'Tóquio, a capital do Japão, é a área metropolitana mais populosa do mundo. Ela encapsula um contraste hipnotizante entre a tecnologia de ponta e os costumes ancestrais, onde arranha-céus cobertos de telas digitais em Shibuya dividem espaço com jardins de bonsai e casas de chá centenárias.',
    image: '/assets/japan.png',
    bestTime: 'Primavera (Março a Maio - Cerejeiras) e Outono (Setembro a Novembro)',
    visaRequired: 'Isento por até 90 dias',
    currency: 'Iene (¥)',
    language: 'Japonês',
    weatherInfo: 'Clima temperado. Verões quentes e úmidos (24°C a 30°C) e invernos frios e secos (2°C a 10°C).',
    clima: 'Tóquio oferece climas agradáveis na primavera (abril/maio), época da floração das cerejeiras (sakura), e no outono (outubro/novembro) com as cores do momiji. O verão (julho/agosto) é extremamente abafado e úmido, com médias de 28°C, enquanto o inverno é ensolarado mas frio, com médias de 5°C.',
    mapImg: '/assets/japan.png',
    localTips: [
      'Alugue um dispositivo Pocket Wi-Fi ou compre um e-SIM logo no aeroporto; ter internet estável é crucial para usar o Google Maps nas estações gigantes de Tóquio.',
      'Sempre tenha algumas moedas de iene em espécie. Embora moderno, o Japão ainda é um país que valoriza muito o dinheiro físico.',
      'Não jogue lixo na rua. Tóquio quase não possui lixeiras públicas (os cidadãos levam seu lixo para casa), mas é uma das cidades mais limpas do planeta.'
    ],
    restaurants: [
      { name: 'Ichiran Shibuya', type: 'Ramen Tonkotsu', priceRange: '$', desc: 'Famoso por seus boxes individuais de degustação onde você customiza cada detalhe do caldo de porco tradicional japonês.' },
      { name: 'Sukiyabashi Jiro', type: 'Sushi Premium Michelin', priceRange: '$$$$', desc: 'Um dos balcões de sushi mais famosos e exclusivos do mundo, sob o comando do mestre lendário Jiro Ono.' },
      { name: 'Gyukatsu Motomura Shinjuku', type: 'Carne Empanada frita na pedra', priceRange: '$$', desc: 'Filet mignon empanado malpassado que você finaliza grelhando em uma mini chapa de pedra quente na sua mesa.' }
    ],
    faqs: [
      { q: 'Como comprar o passe de metrô em Tóquio?', a: 'Recomendamos comprar o cartão digital recarregável Suica ou Pasmo diretamente no Apple Wallet ou baixar passes especiais de 72 horas do Tokyo Metro para turistas.' },
      { q: 'Japão exige visto para brasileiros?', a: 'Atualmente, portadores de passaportes brasileiros comuns com chip eletrônico estão isentos de visto para estadias de turismo de até 90 dias.' }
    ],
    attractions: [
      { title: 'Shibuya Crossing & Shibuya Sky', desc: 'O cruzamento mais movimentado do mundo e seu observatório panorâmico incrível.', rating: '4.8★', hours: '10:00 - 22:30' },
      { title: 'Templo Senso-ji', desc: 'O templo budista mais antigo e icônico de Tóquio, localizado no bairro histórico de Asakusa.', rating: '4.7★', hours: '06:00 - 17:00' },
      { title: 'Meiji Jingu', desc: 'Santuário xintoísta silencioso cercado por uma floresta urbana massiva no coração de Harajuku.', rating: '4.8★', hours: '05:00 - 18:00' },
      { title: 'Akihabara', desc: 'O famoso bairro otaku e polo de lojas de eletrônicos e luzes neon.', rating: '4.5★', hours: 'Acesso livre (lojas das 10h às 21h)' }
    ],
    costs: {
      economy: { daily: 65, meal: 18, ticket: 10, transport: 5, hotel: 32 },
      comfort: { daily: 150, meal: 40, ticket: 20, transport: 10, hotel: 80 },
      luxury: { daily: 410, meal: 110, ticket: 45, transport: 45, hotel: 210 }
    }
  },
  santorini: {
    name: 'Santorini',
    slug: 'santorini',
    country: 'Grécia',
    emoji: '🇬🇷',
    description: 'Ilha grega icônica famosa por suas casas caiadas de branco, cúpulas azuis e o pôr do sol mais espetacular do Mar Egeu.',
    longDescription: 'Santorini é uma das jóias do Mar Egeu, famosa por sua caldeira vulcânica e vilas no topo das falésias como Oia e Fira. Suas ruas de pedra, vinhedos locais e praias vulcânicas (pretas e vermelhas) fazem dela um dos destinos românticos mais cobiçados do mundo.',
    image: '/assets/greece.png',
    bestTime: 'Maio a Outubro',
    visaRequired: 'Isento por até 90 dias (Espaço Schengen)',
    currency: 'Euro (€)',
    language: 'Grego',
    weatherInfo: 'Clima mediterrâneo. Verões quentes e secos (24°C a 31°C) e invernos suaves.',
    clima: 'Santorini possui verões ensolarados e quentes (julho/agosto) com vento fresco constante ("meltemi"). A melhor época é nas estações intermediárias (maio/junho e setembro/outubro), com clima excelente para banhos de sol e tarifas de hotéis mais amigáveis.',
    mapImg: '/assets/greece.png',
    localTips: [
      'Assista ao pôr do sol em Oia, mas chegue pelo menos 2 horas antes do anoitecer para garantir um bom lugar nas ruínas do castelo.',
      'Alugue uma quadriciclo ou scooter para se locomover com liberdade e facilidade pelas ruelas estreitas e praias distantes da ilha.',
      'Visite uma vinícola local para degustar o clássico vinho branco Assyrtiko, cujas uvas são cultivadas deitadas no chão de cinza vulcânica.'
    ],
    restaurants: [
      { name: 'Metaxi Mas', type: 'Taverna Cretense Tradicional', priceRange: '$$', desc: 'Considerado um dos melhores restaurantes da ilha, escondido em Pyrgos. Oferece queijo feta assado com mel e excelentes carnes grelhadas.' },
      { name: 'Amoudi Fish Tavern', type: 'Frutos do Mar Frescos', priceRange: '$$$', desc: 'Localizado no pitoresco porto de Amoudi, na base da falésia de Oia, onde o polvo grelhado é servido à beira d\'água.' },
      { name: 'Lolita\'s Gelato', type: 'Gelatos Artesanais', priceRange: '$', desc: 'Parada obrigatória em Oia para saborear gelatos artesanais com pistache grego genuíno.' }
    ],
    faqs: [
      { q: 'Como ir do porto de Santorini para Fira?', a: 'Você pode subir a falésia de teleférico, de ônibus público ou contratando transfers particulares. Evite usar os burros de carga por questões de bem-estar animal.' },
      { q: 'Santorini exige visto para turismo?', a: 'Não. Brasileiros não precisam de visto para turismo por até 90 dias por fazer parte da zona Schengen.' }
    ],
    attractions: [
      { title: 'Vila de Oia', desc: 'As icônicas casinhas brancas com cúpulas azuis e a rua principal de mármore.', rating: '4.9★', hours: 'Livre acesso' },
      { title: 'Caldeira Vulcânica', desc: 'Passeio de barco pelas águas profundas do vulcão ativo e suas fontes termais.', rating: '4.7★', hours: 'Passeios de barco (4h a 6h)' },
      { title: 'Red Beach', desc: 'Praia exótica emoldurada por gigantescas falésias de rochas vermelhas vulcânicas.', rating: '4.4★', hours: 'Livre acesso' },
      { title: 'Sítio Arqueológico de Akrotiri', desc: 'Cidade da civilização minoica preservada sob cinzas vulcânicas de 1613 a.C.', rating: '4.6★', hours: '08:30 - 15:30 (Fechado às terças)' }
    ],
    costs: {
      economy: { daily: 75, meal: 22, ticket: 15, transport: 10, hotel: 35 },
      comfort: { daily: 180, meal: 50, ticket: 35, transport: 25, hotel: 90 },
      luxury: { daily: 600, meal: 150, ticket: 80, transport: 80, hotel: 350 }
    }
  },
  noruega: {
    name: 'Noruega',
    slug: 'noruega',
    country: 'Noruega',
    emoji: '🇳🇴',
    description: 'Montanhas dramáticas, fjords profundos escavados por geleiras e a dança mágica da Aurora Boreal.',
    longDescription: 'A Noruega é um dos países mais belos do norte europeu, combinando a cultura viking, design escandinavo moderno em Oslo e as paisagens mais intocadas do planeta, como as ilhas Lofoten e os fjords ocidentais.',
    image: '/assets/norway.png',
    bestTime: 'Junho a Agosto (Sol da Meia-Noite) ou Dezembro a Março (Aurora Boreal)',
    visaRequired: 'Isento por até 90 dias',
    currency: 'Coroa Norueguesa (NOK)',
    language: 'Norueguês',
    weatherInfo: 'Clima polar/temperado. Verões amenos (12°C a 20°C) e invernos severos (-6°C a 1°C).',
    clima: 'A Noruega possui verões suaves com até 20 horas de luz diária no sul e sol da meia-noite contínuo no norte. Os invernos são frios, escuros e repletos de neve, propiciando atividades de esqui e caçadas à Aurora Boreal de setembro a março.',
    mapImg: '/assets/norway.png',
    localTips: [
      'A Noruega é quase 100% digitalizada; dinheiro em espécie é raramente aceito. Cartões e Apple Pay cobrem tudo.',
      'Compre comidas nos supermercados (como Meny ou Rema 1000) e faça piqueniques para evitar os preços altíssimos dos restaurantes noruegueses.',
      'Faça a viagem de trem de Oslo a Bergen (Bergen Line), considerada uma das ferrovias mais cênicas do mundo.'
    ],
    restaurants: [
      { name: 'Maaemo', type: 'Alta Gastronomia Nórdica', priceRange: '$$$$', desc: 'Restaurante três estrelas Michelin em Oslo focado em ingredientes sazonais ecológicos e sabores nórdicos brutos.' },
      { name: 'Fiskeriet Youngstorget', type: 'Marisqueira & Fish & Chips', priceRange: '$$', desc: 'Mercado de peixes charmoso que também serve um fantástico guisado de peixes cremoso tradicional (Fiskesuppe).' },
      { name: 'Kaffistova', type: 'Cozinha Caseira Norueguesa', priceRange: '$', desc: 'Local tradicional em Oslo que serve almôndegas de carne com purê de batata e geleia de mirtilo desde 1901.' }
    ],
    faqs: [
      { q: 'Onde ver a Aurora Boreal na Noruega?', a: 'A melhor região é o norte do país, na cidade de Tromsø ou nas Ilhas Lofoten, de meados de setembro a março, em noites escuras e limpas.' },
      { q: 'Noruega faz parte da União Europeia?', a: 'Não. A Noruega faz parte do Espaço Schengen de imigração livre e do EEE, mas mantém sua própria moeda (Coroa) e leis comerciais independentes.' }
    ],
    attractions: [
      { title: 'Geirangerfjord', desc: 'O fjord mais espetacular da Noruega, cercado de cachoeiras selvagens e paredões de rocha.', rating: '4.9★', hours: 'Passeios de balsa' },
      { title: 'Tromsø', desc: 'A capital do Ártico, excelente hub para caçar auroras e andar de trenó de Huskies.', rating: '4.7★', hours: 'Livre acesso' },
      { title: 'Catedral de Nidaros', desc: 'Catedral gótica histórica em Trondheim, local de sepultamento de São Olavo.', rating: '4.6★', hours: '09:00 - 16:00' },
      { title: 'Ilhas Lofoten', desc: 'Vilarejos de pescadores com cabanas vermelhas de madeira sob picos de montanhas dramáticos.', rating: '4.8★', hours: 'Livre acesso' }
    ],
    costs: {
      economy: { daily: 90, meal: 25, ticket: 15, transport: 12, hotel: 45 },
      comfort: { daily: 220, meal: 60, ticket: 35, transport: 25, hotel: 120 },
      luxury: { daily: 650, meal: 160, ticket: 75, transport: 80, hotel: 330 }
    }
  },
  capadocia: {
    name: 'Capadócia',
    slug: 'capadocia',
    country: 'Turquia',
    emoji: '🇹🇷',
    description: 'Vales surreais de formações rochosas ("Chaminés de Fada"), hotéis em cavernas e centenas de balões cobrindo o céu no amanhecer.',
    longDescription: 'A Capadócia é uma região histórica na Anatólia Central famosa por sua paisagem lunar única, vales profundos esculpidos pela erosão e antigas cidades subterrâneas esculpidas na rocha vulcânica por cristãos refugiados.',
    image: '/assets/turkey.png',
    bestTime: 'Abril a Junho e Setembro a Outubro',
    visaRequired: 'Isento por até 90 dias',
    currency: 'Lira Turca (TRY)',
    language: 'Turco',
    weatherInfo: 'Clima continental. Verões quentes e secos e invernos frios com neve frequente.',
    clima: 'A Capadócia tem invernos gelados com neve (dezembro a fevereiro), deixando os vales brancos e mágicos, e verões quentes (julho/agosto). A melhor época para voar de balão são os meses de primavera (abril/maio) e outono (setembro/outubro), quando os ventos estão calmos.',
    mapImg: '/assets/turkey.png',
    localTips: [
      'Agende o voo de balão para a sua primeira manhã livre na região; se o voo for cancelado devido ao vento, você tem as manhãs seguintes de reserva.',
      'Hospede-se em um autêntico "Cave Hotel" (hotel esculpido nas cavernas de rocha) em Göreme ou Uchisar para uma experiência única de imersão.',
      'Alugue um carro ou contrate o "Roteiro Vermelho" ou "Roteiro Verde" privativos para desbravar os vales distantes e museus a céu aberto.'
    ],
    restaurants: [
      { name: 'Dibek Traditional Cookery', type: 'Cozinha Turca Caseira', priceRange: '$$', desc: 'Famoso por servir o "Testi Kebab", um guisado de carne assado lentamente dentro de potes de argila selados que são quebrados na sua mesa.' },
      { name: 'Seten Anatolian Restaurant', type: 'Gastronomia da Anatólia', priceRange: '$$$', desc: 'Localizado no topo de uma colina com terraço maravilhoso em Göreme, oferece pratos tradicionais e uma excelente carta de vinhos locais da Capadócia.' },
      { name: 'Nazar Börek Cafe', type: 'Petiscos Turcos & Börek', priceRange: '$', desc: 'Um local simples e acolhedor servindo deliciosos pães folhados com queijo e espinafre ao lado do tradicional chá turco.' }
    ],
    faqs: [
      { q: 'Quanto custa um voo de balão na Capadócia?', a: 'Os valores flutuam por temporada, custando de €120 a €280 por pessoa. Recomendamos agendar com empresas credenciadas pela aviação civil turca.' },
      { q: 'Quantos dias são necessários na Capadócia?', a: 'Recomendamos de 2 a 3 noites inteiras na região para cobrir os principais vales, as cidades subterrâneas e garantir a chance de voar de balão.' }
    ],
    attractions: [
      { title: 'Museu a Céu Aberto de Göreme', desc: 'Complexo de igrejas e monastérios cristãos medievais inteiramente escavados na rocha e decorados com afrescos.', rating: '4.8★', hours: '08:00 - 17:00' },
      { title: 'Voo de Balão ao Amanhecer', desc: 'A experiência inesquecível de flutuar ao lado de até 150 balões no nascer do sol sobre as Chaminés de Fada.', rating: '4.9★', hours: '05:00 - 08:00 (A depender do clima)' },
      { title: 'Cidade Subterrânea de Derinkuyu', desc: 'Cidade histórica com 8 níveis abaixo da terra capaz de abrigar até 20.000 pessoas.', rating: '4.7★', hours: '08:00 - 17:00' },
      { title: 'Castelo de Uchisar', desc: 'O ponto mais alto da Capadócia, uma gigantesca fortaleza de pedra natural com vista panorâmica.', rating: '4.7★', hours: '08:00 - 18:30' }
    ],
    costs: {
      economy: { daily: 40, meal: 10, ticket: 10, transport: 5, hotel: 18 },
      comfort: { daily: 90, meal: 25, ticket: 20, transport: 15, hotel: 45 },
      luxury: { daily: 300, meal: 70, ticket: 45, transport: 40, hotel: 155 }
    }
  },
  gramado: {
    name: 'Gramado',
    slug: 'gramado',
    country: 'Brasil',
    emoji: '🇧🇷',
    description: 'Arquitetura enxaimel, chocolates artesanais e ruas floridas de hortênsias na Serra Gaúcha.',
    longDescription: 'Gramado é o principal destino turístico de inverno do Brasil, colonizado por alemães e italianos. A cidade da Serra Gaúcha oferece uma atmosfera europeia única, rica gastronomia de fondues e parques temáticos sofisticados.',
    image: '/assets/gramado.png',
    bestTime: 'Junho a Agosto (Inverno) e Novembro a Janeiro (Natal Luz)',
    visaRequired: 'Isento para brasileiros',
    currency: 'Real (R$)',
    language: 'Português',
    weatherInfo: 'Clima subtropical de altitude. Invernos frios (2°C a 12°C) e verões amenos (16°C a 26°C).',
    clima: 'Gramado é um dos poucos lugares do Brasil onde o inverno é rigoroso, com geadas frequentes e temperaturas por vezes negativas. O outono (abril/maio) colore as ruas com folhas avermelhadas, e o final do ano apresenta o espetáculo do Natal Luz sob temperaturas mais quentes.',
    mapImg: '/assets/gramado.png',
    localTips: [
      'Se for jantar sequência de fondue, pesquise e agende previamente; muitas casas oferecem transporte gratuito de ida e volta do seu hotel.',
      'Alugue um carro se quiser visitar as vinícolas do Vale dos Vinhedos em Bento Gonçalves, que fica a 1h30 de distância.',
      'Caminhe pela Rua Coberta nos fins de tarde para tomar um chocolate quente artesanal ao som de apresentações locais.'
    ],
    restaurants: [
      { name: 'Belle du Valais', type: 'Sequência de Fondue Suíço', priceRange: '$$$$', desc: 'Considerado o melhor restaurante de fondue da serra, com ambiente requintado à luz de velas e serviço impecável.' },
      { name: 'Café Colonial Bela Vista', type: 'Café Colonial Tradicional', priceRange: '$$$', desc: 'Mais de 80 variedades de tortas, pães, carnes e doces servidos na sua mesa de forma farta desde 1972.' },
      { name: 'Pastasciutta', type: 'Cantina Italiana Farta', priceRange: '$$', desc: 'Massas frescas tradicionais e molhos caseiros servidos em porções fartas com o legítimo sotaque da colonização italiana.' }
    ],
    faqs: [
      { q: 'Quando acontece o Natal Luz de Gramado?', a: 'O Natal Luz geralmente ocorre do final de outubro até meados de janeiro, trazendo decorações urbanas, desfiles de natal e apresentações de fogos e luzes no lago.' },
      { q: 'Como chegar em Gramado?', a: 'O aeroporto mais próximo com voos frequentes é o Aeroporto de Porto Alegre (POA), localizado a 115 km de distância. O trajeto de carro ou ônibus leva cerca de 2 horas.' }
    ],
    attractions: [
      { title: 'Lago Negro', desc: 'Lago artificial cercado de pinheiros trazidos da Floresta Negra da Alemanha, ideal para passeios de pedalinho.', rating: '4.7★', hours: '06:00 - 21:00' },
      { title: 'Mini Mundo', desc: 'Parque temático ao ar livre contendo réplicas em miniatura fiéis de edifícios e ferrovias globais.', rating: '4.6★', hours: '09:00 - 17:00' },
      { title: 'Rua Coberta', desc: 'Rua comercial de pedestres coberta de trepadeiras, repleta de bistrôs, cafeterias e lojas de malhas.', rating: '4.5★', hours: 'Livre acesso' },
      { title: 'Snowland', desc: 'O primeiro parque de neve indoor das Américas, com esqui, snowboard e patinação.', rating: '4.4★', hours: '10:00 - 17:00' }
    ],
    costs: {
      economy: { daily: 120, meal: 35, ticket: 40, transport: 15, hotel: 90 },
      comfort: { daily: 280, meal: 75, ticket: 80, transport: 30, hotel: 220 },
      luxury: { daily: 800, meal: 180, ticket: 150, transport: 120, hotel: 650 }
    }
  },
  'fernando-de-noronha': {
    name: 'Fernando de Noronha',
    slug: 'fernando-de-noronha',
    country: 'Brasil',
    emoji: '🇧🇷',
    description: 'Mergulho de cilindro em águas cristalinas repletas de golfinhos, tartarugas e tubarões no arquipélago mais preservado do país.',
    longDescription: 'Fernando de Noronha é um parque nacional marinho protegido pela UNESCO. Com limite diário de visitantes e praias eleitas entre as mais bonitas do mundo (como Sancho e Porcos), é o topo do ecoturismo e sofisticação pé na areia do Brasil.',
    image: '/assets/noronha.png',
    bestTime: 'Setembro a Outubro (Mar calmo/visibilidade) ou Dezembro a Fevereiro (Surfe)',
    visaRequired: 'Isento para brasileiros',
    currency: 'Real (R$)',
    language: 'Português',
    weatherInfo: 'Clima tropical. Sempre quente (25°C a 30°C). Estação chuvosa de Março a Julho.',
    clima: 'Noronha é quente o ano todo. A estação seca vai de agosto a fevereiro, excelente para passeios. O mês de setembro apresenta o mar mais calmo ("mar de almirante"), ideal para mergulho livre. De dezembro a fevereiro chegam grandes ondas atraindo surfistas de todo o mundo.',
    mapImg: '/assets/noronha.png',
    localTips: [
      'Pague a Taxa de Preservação Ambiental (TPA) online no site oficial do governo do estado de Pernambuco antes de embarcar para evitar filas gigantescas no aeroporto.',
      'Adquira o ingresso do Parque Nacional Marinho logo na sua chegada para liberar o acesso à Baía do Sancho e Baía do Sueste.',
      'Reserve o passeio de barco e o aluguel do buggy com antecedência; o arquipélago tem frota limitada.'
    ],
    restaurants: [
      { name: 'Festival Gastronômico da Pousada do Zé Maria', type: 'Banquete de Frutos do Mar', priceRange: '$$$$', desc: 'Famoso banquete servido nas quartas e sábados, onde dezenas de pratos de peixes frescos, paellas e sobremesas são apresentados pelo próprio Zé Maria.' },
      { name: 'Restaurante Xica da Silva', type: 'Cozinha Nordestina Contemporânea', priceRange: '$$$', desc: 'Local acolhedor na Vila dos Remédios, famoso pelo Peixe na Folha de Bananeira com molho de camarão.' },
      { name: 'Bar do Meio', type: 'Gastrobar de Praia', priceRange: '$$$$', desc: 'Localizado no istmo entre a Praia do Meio e a Praia da Conceição. O melhor pôr do sol do arquipélago com DJs e drinks premium.' }
    ],
    faqs: [
      { q: 'Noronha exige taxas extras de visitantes?', a: 'Sim. Há duas taxas obrigatórias: a TPA (Taxa de Preservação Ambiental cobrada por dia de permanência) e o Ingresso do Parque Nacional Marinho (válido por 10 dias).' },
      { q: 'Como se locomover na ilha?', a: 'A melhor forma é alugar um buggy. Como alternativa, a ilha possui uma única linha de ônibus público que cruza a rodovia BR-363 a cada 30 minutos e táxis tabelados.' }
    ],
    attractions: [
      { title: 'Baía do Sancho', desc: 'Eleita múltiplas vezes a praia mais bonita do mundo, acessada por escadarias em fendas na falésia de pedra.', rating: '4.9★', hours: '08:00 - 18:30' },
      { title: 'Baía dos Porcos', desc: 'Piscina natural de águas verdes cristalinas protegida por paredões vulcânicos e com vista para o Morro Dois Irmãos.', rating: '4.8★', hours: 'Acesso livre' },
      { title: 'Mergulho de Cilindro na Ilha da Rata', desc: 'Mergulho guiado em pontos históricos com excelente visibilidade subaquática (até 30 metros).', rating: '4.9★', hours: 'Saídas sob agendamento' },
      { title: 'Forte de Nossa Senhora dos Remédios', desc: 'Ruína militar histórica com o pôr do sol e nascer da lua mais fotogênicos da ilha.', rating: '4.7★', hours: '08:00 - 19:30' }
    ],
    costs: {
      economy: { daily: 160, meal: 50, ticket: 45, transport: 15, hotel: 120 },
      comfort: { daily: 380, meal: 110, ticket: 80, transport: 50, hotel: 350 },
      luxury: { daily: 1200, meal: 280, ticket: 150, transport: 200, hotel: 1100 }
    }
  },
  italia: {
    name: 'Itália',
    slug: 'italia',
    country: 'Europa',
    emoji: '🇮🇹',
    description: 'A pátria da arte renascentista, vinhos da Toscana, canais de Veneza e ruínas milenares.',
    longDescription: 'A Itália abriga o maior número de Patrimônios Mundiais da UNESCO no mundo. Roteiros integrados pelo país conectam o romantismo flutuante de Veneza, as galerias de arte de Florença, vinhedos medievais na Toscana e o caos charmoso e histórico de Roma.',
    image: '/assets/greece.png',
    bestTime: 'Abril a Junho e Setembro a Outubro',
    visaRequired: 'Isento por até 90 dias',
    currency: 'Euro (€)',
    language: 'Italiano',
    weatherInfo: 'Clima temperado no norte e mediterrâneo quente no sul.',
    clima: 'A Itália apresenta excelente clima de primavera (abril a junho), com campos floridos e cidades históricas agradáveis. O outono traz as colheitas de uvas na Toscana. O verão (julho e agosto) é abafado e com cidades cheias, enquanto o inverno atrai esquiadores nos Alpes.',
    mapImg: '/assets/greece.png',
    localTips: [
      'Viaje de trem rápido (Frecciarossa ou Italo) entre as grandes capitais; as conexões são baratas, confortáveis e ligam o centro das cidades.',
      'Valide sempre seu bilhete de trem físico nas maquininhas amarelas na plataforma antes de embarcar para evitar multas severas.',
      'Dê preferência para sorveterias que guardam o sorvete em potes de metal tampados ("pozzetti"); os gelatos expostos em montanhas coloridas costumam ter conservantes e corantes artificiais.'
    ],
    restaurants: [
      { name: 'Osteria Francescana', type: 'Alta Gastronomia Italiana', priceRange: '$$$$', desc: 'Restaurante em Modena eleito duas vezes o melhor do mundo, sob o comando do genial chef Massimo Bottura.' },
      { name: 'All\'Antico Vinaio', type: 'Sanduicheria Histórica', priceRange: '$', desc: 'Pequeno balcão em Florença que serve a melhor schiacciata (pão típico) recheada com frios toscanos finos.' },
      { name: 'Pizzeria da Michele', type: 'Pizzaria Napolitana Genuína', priceRange: '$', desc: 'Pizzaria histórica em Nápoles que serve apenas dois sabores clássicos: Margherita e Marinara, desde 1870.' }
    ],
    faqs: [
      { q: 'Como funciona o imposto de turismo na Itália?', a: 'Quase todas as cidades italianas cobram uma taxa de estadia por noite ("tassa di soggiorno"), paga em espécie diretamente no balcão do hotel, variando de €2 a €7 dependendo da categoria da hospedagem.' },
      { q: 'Qual a voltagem das tomadas na Itália?', a: 'A voltagem padrão é 230V com tomadas de três pinos alinhados do tipo L e C. Carregue adaptadores universais.' }
    ],
    attractions: [
      { title: 'Coliseu de Roma', desc: 'O anfiteatro mestre do império clássico romano no centro da cidade.', rating: '4.9★', hours: '08:30 - 19:00' },
      { title: 'Galeria Uffizi em Florença', desc: 'O museu de arte renascentista mais importante do mundo, contendo o Nascimento de Vênus de Botticelli.', rating: '4.8★', hours: '08:15 - 18:30 (Fechado às segundas)' },
      { title: 'Canais de Veneza', desc: 'Passeio de gôndola romântico pelo Grand Canal sob a icônica Ponte de Rialto.', rating: '4.7★', hours: 'Acesso livre' },
      { title: 'Costa Amalfitana', desc: 'Estrada costeira deslumbrante que liga vilas coloridas cravadas em desfiladeiros sobre o mar azul.', rating: '4.8★', hours: 'Livre acesso' }
    ],
    costs: {
      economy: { daily: 65, meal: 18, ticket: 15, transport: 10, hotel: 30 },
      comfort: { daily: 150, meal: 40, ticket: 30, transport: 20, hotel: 75 },
      luxury: { daily: 450, meal: 120, ticket: 70, transport: 60, hotel: 230 }
    }
  },
  japao: {
    name: 'Japão',
    slug: 'japao',
    country: 'Ásia',
    emoji: '🇯🇵',
    description: 'Templos budistas cercados por florestas de bambu, trens-bala rápidos e o cume místico do Monte Fuji.',
    longDescription: 'O Japão mescla tecnologia ultra moderna com tradições seculares de hospitalidade (omotenashi). Um roteiro pelo arquipélago conecta a Tóquio futurista com Quioto, o coração cultural japonês com seus santuários dourados e gueixas.',
    image: '/assets/japan.png',
    bestTime: 'Março a Maio (Sakura) e Setembro a Novembro (Momiji)',
    visaRequired: 'Isento por até 90 dias',
    currency: 'Iene (¥)',
    language: 'Japonês',
    weatherInfo: 'Clima temperado, com quatro estações muito bem definidas.',
    clima: 'A primavera (março a maio) e o outono (setembro a novembro) são as épocas de pico, oferecendo o visual das flores de cerejeira e as folhas vermelhas de maple em clima ameno. O inverno é propício para esqui em Hokkaido, e o verão apresenta festivais e queima de fogos sob forte calor.',
    mapImg: '/assets/japan.png',
    localTips: [
      'Compre o Japan Rail Pass (JR Pass) com antecedência se planejar cruzar múltiplas províncias de Shinkansen (trem-bala).',
      'Faça o envio de malas grandes via serviço de entrega de bagagens (Ta-Q-Bin) entre hotéis para viajar leve nos trens públicos.',
      'Siga a etiqueta local: não fale ao telefone no metrô e não ande na rua comendo alimentos avulsos.'
    ],
    restaurants: [
      { name: 'Kobe Plaisir', type: 'Chapa Teppanyaki de Wagyu', priceRange: '$$$$', desc: 'Especializado na autêntica e macia carne de boi de Kobe (Kobe Beef), grelhada na chapa na sua frente.' },
      { name: 'Gyoza Hohei Quioto', type: 'Taberna de Gyoza Izakaya', priceRange: '$', desc: 'Pequeno restaurante no bairro de Gion famoso por suas porções crocantes de guiozas de gengibre.' },
      { name: 'Chao Chao Gyoza Umeda', type: 'Guiozas Artesanais Fritas', priceRange: '$', desc: 'Local dinâmico em Osaka com dezenas de variações de recheios e tamanhos de guiozas caseiras.' }
    ],
    faqs: [
      { q: 'Qual a voltagem e plugues de tomada no Japão?', a: 'A voltagem é de 100V (plugues planos de dois pinos chatos do Tipo A, iguais aos antigos do Brasil e dos EUA).' },
      { q: 'É costume dar gorjetas no Japão?', a: 'Não. Gorjetas não são aceitas em hipótese alguma no Japão e podem ser vistas como ofensa. O excelente serviço já está incluído no preço.' }
    ],
    attractions: [
      { title: 'Monte Fuji (Kawaguchiko)', desc: 'O cume nevado mais famoso do Japão refletido nos lagos da província de Yamanashi.', rating: '4.9★', hours: 'Livre acesso' },
      { title: 'Santuário Fushimi Inari-Taisha', desc: 'O icônico caminho nas colinas de Quioto coberto por mais de 10.000 portais Torii vermelhos.', rating: '4.9★', hours: 'Acesso livre (24h)' },
      { title: 'Parque de Nara', desc: 'Parque histórico onde centenas de cervos sagrados circulam livremente interagindo com visitantes.', rating: '4.8★', hours: 'Livre acesso' },
      { title: 'Templo Kinkaku-ji', desc: 'O deslumbrante Pavilhão Dourado de Quioto, inteiramente folheado a ouro à beira de um lago zen.', rating: '4.8★', hours: '09:00 - 17:00' }
    ],
    costs: {
      economy: { daily: 70, meal: 18, ticket: 15, transport: 7, hotel: 30 },
      comfort: { daily: 160, meal: 42, ticket: 25, transport: 12, hotel: 81 },
      luxury: { daily: 430, meal: 120, ticket: 50, transport: 50, hotel: 210 }
    }
  }
};

const itineraries = {
  'paris-3-dias': {
    slug: 'paris-3-dias',
    destinationSlug: 'paris',
    title: 'Roteiro Paris 3 dias: O Clássico Essencial',
    desc: 'Um guia focado para aproveitar o melhor de Paris em um fim de semana prolongado, cobrindo os monumentos mais importantes e bairros imperdíveis.',
    duration: 3,
    days: [
      {
        day: 'Dia 1',
        title: 'Do Louvre à Torre Eiffel',
        events: [
          { time: '09:00', title: 'Visita matinal guiada no Museu do Louvre' },
          { time: '13:00', title: 'Almoço no Jardin des Tuileries' },
          { time: '15:30', title: 'Passeio pela Champs-Élysées até o Arco do Triunfo' },
          { time: '18:30', title: 'Pôr do sol nos Jardins do Trocadéro' },
          { time: '20:00', title: 'Jantar próximo à Torre Eiffel' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Catedral de Notre-Dame & Quartier Latin',
        events: [
          { time: '09:30', title: 'Caminhada pela Île de la Cité e arredores da Catedral de Notre-Dame' },
          { time: '11:00', title: 'Livraria Shakespeare and Company' },
          { time: '13:00', title: 'Almoço tradicional francês no Quartier Latin' },
          { time: '15:00', title: 'Passeio relaxante pelos Jardins de Luxemburgo' },
          { time: '19:30', title: 'Concerto de música clássica ou jantar em Saint-Germain-des-Prés' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'O Charme de Montmartre',
        events: [
          { time: '09:00', title: 'Visita à basílica de Sacré-Cœur e exploração de Montmartre' },
          { time: '12:30', title: 'Almoço na romântica Place du Tertre' },
          { time: '15:00', title: 'Caminhada artística visitando murais e cafés de artistas históricos' },
          { time: '18:00', title: 'Cruzeiro com áudio guia pelo Rio Sena' },
          { time: '20:30', title: 'Jantar de encerramento em um bistrô autêntico' }
        ]
      }
    ]
  },
  'paris-5-dias': {
    slug: 'paris-5-dias',
    destinationSlug: 'paris',
    title: 'Roteiro Paris 5 dias: Imersão e Bate-Volta',
    desc: 'O roteiro ideal para quem visita Paris pela primeira vez com tempo suficiente para desbravar a cidade sem pressa e fazer um bate-volta a Versalhes.',
    duration: 5,
    days: [
      {
        day: 'Dia 1',
        title: 'Do Louvre à Torre Eiffel',
        events: [
          { time: '09:00', title: 'Visita matinal no Museu do Louvre' },
          { time: '13:00', title: 'Almoço no Jardin des Tuileries' },
          { time: '15:30', title: 'Arco do Triunfo e caminhada pela Champs-Élysées' },
          { time: '20:00', title: 'Jantar próximo à Torre Eiffel' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Notre-Dame & Quartier Latin',
        events: [
          { time: '09:30', title: 'Caminhada pela Île de la Cité e Catedral de Notre-Dame' },
          { time: '13:00', title: 'Almoço tradicional francês no Quartier Latin' },
          { time: '15:00', title: 'Passeio relaxante pelos Jardins de Luxemburgo' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'Palácio de Versalhes',
        events: [
          { time: '08:30', title: 'Trem RER C em direção ao Palácio de Versalhes' },
          { time: '09:30', title: 'Entrada no Palácio e passeio pelos luxuosos aposentos reais' },
          { time: '13:00', title: 'Almoço nos jardins de Versalhes' },
          { time: '14:30', title: 'Visita aos palácios do Trianon e domínio de Maria Antonieta' },
          { time: '18:00', title: 'Retorno a Paris e jantar livre' }
        ]
      },
      {
        day: 'Dia 4',
        title: 'O Charme de Montmartre',
        events: [
          { time: '09:00', title: 'Visita à basílica de Sacré-Cœur e ruas de Montmartre' },
          { time: '15:00', title: 'Visita ao Museu de Orsay (Impressionistas)' },
          { time: '18:00', title: 'Cruzeiro pelo Rio Sena no entardecer' }
        ]
      },
      {
        day: 'Dia 5',
        title: 'Le Marais & Pompidou',
        events: [
          { time: '10:00', title: 'Exploração do vibrante bairro histórico Le Marais' },
          { time: '13:00', title: 'Almoço de falafel na icônica Rue des Rosiers' },
          { time: '15:00', title: 'Visita ao museu de arte moderna Centro Pompidou' },
          { time: '20:30', title: 'Jantar de despedida elegante em Saint-Germain-des-Prés' }
        ]
      }
    ]
  },
  'paris-7-dias': {
    slug: 'paris-7-dias',
    destinationSlug: 'paris',
    title: 'Roteiro Paris 7 dias: Imersão Completa e Cultura',
    desc: 'Uma semana inteira em Paris para viver como um parisiense, conhecer museus secundários fascinantes e fazer bate-voltas a Versalhes e Giverny.',
    duration: 7,
    days: [
      {
        day: 'Dia 1',
        title: 'Louvre à Torre Eiffel',
        events: [
          { time: '09:00', title: 'Visita ao Museu do Louvre' },
          { time: '15:30', title: 'Champs-Élysées e Arco do Triunfo' },
          { time: '20:00', title: 'Jantar na Torre Eiffel' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Île de la Cité & Notre-Dame',
        events: [
          { time: '09:30', title: 'Notre-Dame e Saint-Chapelle' },
          { time: '13:00', title: 'Almoço no Quartier Latin' },
          { time: '15:00', title: 'Passeio nos Jardins de Luxemburgo' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'Palácio de Versalhes',
        events: [
          { time: '08:30', title: 'Visita guiada no Palácio de Versalhes' },
          { time: '14:00', title: 'Caminhada nos Jardins Reais e Grand Trianon' }
        ]
      },
      {
        day: 'Dia 4',
        title: 'Montmartre Artístico',
        events: [
          { time: '09:00', title: 'Basílica de Sacré-Cœur e Place du Tertre' },
          { time: '15:00', title: 'Museu de Orsay' },
          { time: '18:00', title: 'Cruzeiro pelo Rio Sena' }
        ]
      },
      {
        day: 'Dia 5',
        title: 'Le Marais & Centro Pompidou',
        events: [
          { time: '10:00', title: 'Visita ao museu Picasso e caminhada no Marais' },
          { time: '15:00', title: 'Coleções de arte moderna do Pompidou' }
        ]
      },
      {
        day: 'Dia 6',
        title: 'Bate-Volta a Giverny (Jardins de Monet)',
        events: [
          { time: '08:00', title: 'Trem saindo de Gare Saint-Lazare para Vernon/Giverny' },
          { time: '10:00', title: 'Visita à Casa e Jardins do pintor Claude Monet' },
          { time: '16:00', title: 'Retorno a Paris e compras na Galeries Lafayette' }
        ]
      },
      {
        day: 'Dia 7',
        title: 'Catacumbas & Saint-Germain-des-Prés',
        events: [
          { time: '09:30', title: 'Tour pelas Catacumbas de Paris' },
          { time: '14:00', title: 'Café histórico nas mesas do Café de Flore' },
          { time: '20:00', title: 'Jantar refinado de despedida' }
        ]
      }
    ]
  },
  'roma-3-dias': {
    slug: 'roma-3-dias',
    destinationSlug: 'roma',
    title: 'Roteiro Roma 3 dias: A Cidade Eterna',
    desc: 'Explore o Coliseu, Vaticano e as fontes e praças mais marcantes do centro histórico em uma rota altamente otimizada.',
    duration: 3,
    days: [
      {
        day: 'Dia 1',
        title: 'Roma Antiga & Ruínas Imperiais',
        events: [
          { time: '09:00', title: 'Visita guiada no Coliseu (Fura-fila)' },
          { time: '11:30', title: 'Caminhada pelo Fórum Romano e Palatino' },
          { time: '13:30', title: 'Almoço tradicional em um bistrô perto da Piazza Venezia' },
          { time: '15:30', title: 'Piazza del Campidoglio e Monumento Vittoriano' },
          { time: '20:00', title: 'Jantar de massas romanas no Trastevere' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Vaticano & Castelo de Santo Ângelo',
        events: [
          { time: '08:30', title: 'Museus do Vaticano e Capela Sistina (Acesso antecipado)' },
          { time: '12:00', title: 'Visita à Basílica de São Pedro (Cúpula com vista panorâmica)' },
          { time: '14:00', title: 'Almoço perto da Piazza Navona' },
          { time: '16:00', title: 'Caminhada pelas margens do Tibre até o Castelo de Santo Ângelo' },
          { time: '19:30', title: 'Jantar sofisticado no centro histórico de Roma' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'Fontes & Praças Barrocas',
        events: [
          { time: '09:30', title: 'Piazza del Popolo e caminhada pela Via del Corso' },
          { time: '11:00', title: 'Visita ao magnífico Pantheon' },
          { time: '13:00', title: 'Almoço gourmet na Piazza Navona' },
          { time: '15:30', title: 'Jogar moedas na Fontana di Trevi' },
          { time: '18:00', title: 'Assistir ao entardecer na Escadaria da Piazza di Spagna' }
        ]
      }
    ]
  },
  'lisboa-3-dias': {
    slug: 'lisboa-3-dias',
    destinationSlug: 'lisboa',
    title: 'Roteiro Lisboa 3 dias: Histórico e Belém',
    desc: 'O roteiro ideal para explorar as sete colinas, provar os pastéis de nata originais de Belém e se encantar com o fado tradicional.',
    duration: 3,
    days: [
      {
        day: 'Dia 1',
        title: 'Alfama & Centro Histórico',
        events: [
          { time: '09:00', title: 'Caminhada a pé pela Praça do Comércio e Baixa Pombalina' },
          { time: '11:00', title: 'Subir a colina no histórico Elétrico 28' },
          { time: '13:00', title: 'Almoço tradicional em Alfama' },
          { time: '15:00', title: 'Visita ao Castelo de São Jorge (Vista de 360°)' },
          { time: '20:30', title: 'Jantar harmonizado ao som de Fado em uma Tasca típica' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Belém & Era dos Descobrimentos',
        events: [
          { time: '09:30', title: 'Trem ou elétrico em direção a Belém' },
          { time: '10:00', title: 'Visita ao Mosteiro dos Jerónimos' },
          { time: '12:00', title: 'Degustação dos Pastéis de Belém originais' },
          { time: '13:30', title: 'Almoço à beira do Rio Tejo' },
          { time: '15:00', title: 'Padrão dos Descobrimentos e subida à Torre de Belém' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'Chiado, Bairro Alto & LX Factory',
        events: [
          { time: '10:00', title: 'Exploração cultural pelo Chiado e Livraria Bertrand' },
          { time: '12:30', title: 'Almoço no Mercado da Ribeira (Time Out Market)' },
          { time: '15:00', title: 'Tarde alternativa de artes e design na LX Factory' },
          { time: '19:00', title: 'Assistir ao pôr do sol no Miradouro de Santa Catarina' }
        ]
      }
    ]
  },
  'londres-4-dias': {
    slug: 'londres-4-dias',
    destinationSlug: 'londres',
    title: 'Roteiro Londres 4 dias: O Melhor da Realeza',
    desc: 'Um roteiro abrangente ligando a pompa real dos palácios com a riqueza cultural de museus gratuitos e bairros modernos.',
    duration: 4,
    days: [
      {
        day: 'Dia 1',
        title: 'Marcos de Westminster',
        events: [
          { time: '09:30', title: 'Palácio de Buckingham (Troca da Guarda)' },
          { time: '11:30', title: 'Caminhada pelo St James\'s Park até Westminster Abbey' },
          { time: '13:30', title: 'Almoço tradicional em um Pub inglês' },
          { time: '15:30', title: 'Passeio na London Eye (Vista espetacular do Big Ben)' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'A Torre e as Pontes',
        events: [
          { time: '09:00', title: 'Visita à histórica Torre de Londres e Jóias da Coroa' },
          { time: '12:00', title: 'Caminhada panorâmica pela Tower Bridge' },
          { time: '13:30', title: 'Almoço gastronômico no Borough Market' },
          { time: '15:30', title: 'Museu de arte contemporânea Tate Modern' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'Cultura, Museus & Soho',
        events: [
          { time: '09:30', title: 'Visita guiada no British Museum (Múmias e Pedra de Roseta)' },
          { time: '13:00', title: 'Almoço em Covent Garden' },
          { time: '15:00', title: 'Caminhada pelas ruas coloridas de Neal\'s Yard e lojas do Soho' },
          { time: '20:00', title: 'Assistir a um Musical da Broadway no West End londrino' }
        ]
      },
      {
        day: 'Dia 4',
        title: 'Kensington & Notting Hill',
        events: [
          { time: '10:00', title: 'Passeio pelo bairro elegante de Kensington e Hyde Park' },
          { time: '12:30', title: 'Almoço em Notting Hill' },
          { time: '14:30', title: 'Explorar as lojinhas e antiguidades no Portobello Road Market' }
        ]
      }
    ]
  },
  'toquio-7-dias': {
    slug: 'toquio-7-dias',
    destinationSlug: 'toquio',
    title: 'Roteiro Tóquio 7 dias: Tecnologia & Templos',
    desc: 'O roteiro definitivo de 1 semana para desbravar todos os distritos futuristas e bairros tradicionais de Tóquio.',
    duration: 7,
    days: [
      {
        day: 'Dia 1',
        title: 'Asakusa Histórico',
        events: [
          { time: '09:00', title: 'Visita ao Templo Senso-ji e rua comercial Nakamise' },
          { time: '13:00', title: 'Almoço de tempura em restaurante centenário' },
          { time: '15:30', title: 'Vista panorâmica do topo da Tokyo Skytree' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Shibuya Futurista',
        events: [
          { time: '10:00', title: 'Caminhada pela Meiji Dori e compras em Harajuku' },
          { time: '13:00', title: 'Almoço de sushi de esteira (Kura Sushi)' },
          { time: '15:30', title: 'Atravessar o Shibuya Crossing e subir ao Shibuya Sky no pôr do sol' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'Hakone & Monte Fuji',
        events: [
          { time: '08:00', title: 'Trem expresso Romancecar para Hakone' },
          { time: '10:30', title: 'Navegação em barco pirata no Lago Ashi com vista do Monte Fuji' },
          { time: '15:00', title: 'Banhos termais em um Onsen tradicional' }
        ]
      },
      {
        day: 'Dia 4',
        title: 'Eletrônicos & Otaku em Akihabara',
        events: [
          { time: '10:00', title: 'Visita ao Jardim Imperial do Palácio Real' },
          { time: '13:00', title: 'Almoço de Katsudon' },
          { time: '15:00', title: 'Explorar as megalojas de eletrônicos e arcades de Akihabara' }
        ]
      },
      {
        day: 'Dia 5',
        title: 'Shinjuku à Noite',
        events: [
          { time: '11:00', title: 'Parque Shinjuku Gyoen (Jardins tradicionais)' },
          { time: '16:00', title: 'Mirante gratuito no Edifício do Governo Metropolitano' },
          { time: '20:00', title: 'Jantar de espetinhos (Yakitori) nos becos de Omoide Yokocho' }
        ]
      },
      {
        day: 'Dia 6',
        title: 'Arte Digital no teamLab',
        events: [
          { time: '09:30', title: 'Visita à exposição imersiva teamLab Planets em Toyosu' },
          { time: '13:00', title: 'Almoço de peixe fresco no mercado Tsukiji Outer Market' },
          { time: '15:30', title: 'Passeio pela ilha artificial futurista de Odaiba' }
        ]
      },
      {
        day: 'Dia 7',
        title: 'Ueno & Despedida',
        events: [
          { time: '10:00', title: 'Parque de Ueno e seus museus nacionais' },
          { time: '13:30', title: 'Almoço na rua comercial Ameyoko' },
          { time: '17:00', title: 'Compras de lembranças e doces exóticos no Ginza' }
        ]
      }
    ]
  },
  'japao-10-dias': {
    slug: 'japao-10-dias',
    destinationSlug: 'japao',
    title: 'Roteiro Japão 10 dias: Tóquio, Quioto e Monte Fuji',
    desc: 'Descubra as principais faces do Japão, do futurismo eletrizante de Tóquio à tradição milenar dos templos de Quioto e Nara, com paradas no Monte Fuji.',
    duration: 10,
    days: [
      {
        day: 'Dia 1',
        title: 'Chegada em Tóquio',
        events: [
          { time: '15:00', title: 'Check-in no hotel em Shinjuku' },
          { time: '18:00', title: 'Caminhada pelas ruas iluminadas por neons' },
          { time: '20:00', title: 'Jantar clássico de Yakitori' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Tóquio Clássica: Asakusa e Skytree',
        events: [
          { time: '09:00', title: 'Templo Senso-ji e compras de doces típicos' },
          { time: '15:00', title: 'Subir ao topo do observatório da Tokyo Skytree' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'Tóquio Jovem: Harajuku & Shibuya Crossing',
        events: [
          { time: '10:00', title: 'Passeio pelo Santuário Meiji Jingu' },
          { time: '14:00', title: 'Rua Takeshita e lojas de Harajuku' },
          { time: '17:30', title: 'Pôr do sol no observatório Shibuya Sky' }
        ]
      },
      {
        day: 'Dia 4',
        title: 'Arte Digital no teamLab Planets & Odaiba',
        events: [
          { time: '09:30', title: 'Exposição de arte imersiva teamLab em Toyosu' },
          { time: '14:00', title: 'Passeio pela orla da ilha de Odaiba e vista da Estátua da Liberdade' }
        ]
      },
      {
        day: 'Dia 5',
        title: 'Trem-Bala para Hakone (Vista do Monte Fuji)',
        events: [
          { time: '08:30', title: 'Viagem de trem para Hakone' },
          { time: '11:00', title: 'Cruzeiro no Lago Ashi com vista do Monte Fuji' },
          { time: '16:00', title: 'Hospedagem em Ryokan tradicional com banhos Onsen' }
        ]
      },
      {
        day: 'Dia 6',
        title: 'Quioto: Santuário de Ouro & Floresta de Bambu',
        events: [
          { time: '09:00', title: 'Trem-bala para Quioto' },
          { time: '11:30', title: 'Visita ao magnífico pavilhão Kinkaku-ji' },
          { time: '15:00', title: 'Caminhada pela Floresta de Bambu de Arashiyama' }
        ]
      },
      {
        day: 'Dia 7',
        title: 'Quioto: Portais Torii de Fushimi Inari',
        events: [
          { time: '08:00', title: 'Caminhada matinal sob os milhares de Torii de Fushimi Inari' },
          { time: '14:00', title: 'Visita ao templo Kiyomizu-dera com vista da cidade' }
        ]
      },
      {
        day: 'Dia 8',
        title: 'Bate-Volta a Nara',
        events: [
          { time: '09:00', title: 'Trem local para Nara' },
          { time: '10:00', title: 'Interação com os cervos sagrados no Parque de Nara' },
          { time: '12:00', title: 'Visita ao templo do Grande Buda Todai-ji' }
        ]
      },
      {
        day: 'Dia 9',
        title: 'Osaka: Comida de rua em Dotonbori',
        events: [
          { time: '10:00', title: 'Deslocamento de Quioto para Osaka' },
          { time: '13:00', title: 'Visita ao Castelo de Osaka' },
          { time: '18:00', title: 'Jantar degustando Takoyaki e Okonomiyaki em Dotonbori' }
        ]
      },
      {
        day: 'Dia 10',
        title: 'Retorno de Osaka para Tóquio & Despedida',
        events: [
          { time: '10:00', title: 'Trem-bala de volta para Tóquio' },
          { time: '14:00', title: 'Últimas compras de souvenirs em Ginza' },
          { time: '18:00', title: 'Jantar de despedida de Sushi Premium' }
        ]
      }
    ]
  },
  'italia-15-dias': {
    slug: 'italia-15-dias',
    destinationSlug: 'italia',
    title: 'Roteiro Itália Clássica 15 dias: Roma, Florença, Veneza e Costa Amalfitana',
    desc: 'A grande viagem dos seus sonhos pela Itália, cobrindo o melhor da história de Roma, o renascimento em Florença, os canais de Veneza e o sol da Costa Amalfitana.',
    duration: 15,
    days: [
      {
        day: 'Dia 1',
        title: 'Chegada em Roma',
        events: [
          { time: '14:00', title: 'Check-in no hotel no centro histórico' },
          { time: '17:00', title: 'Passeio a pé pela Piazza Navona e Pantheon' },
          { time: '20:00', title: 'Jantar de massas romanas no Trastevere' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Roma: Coliseu & Ruínas Imperiais',
        events: [
          { time: '09:00', title: 'Tour guiado no Coliseu, Fórum Romano e Palatino' },
          { time: '16:00', title: 'Caminhada pela Via del Corso e Fontana di Trevi' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'Vaticano: Museus e Capela Sistina',
        events: [
          { time: '08:30', title: 'Visita aos Museus do Vaticano e Capela Sistina' },
          { time: '14:00', title: 'Entrada na Basílica de São Pedro e subida à Cúpula' }
        ]
      },
      {
        day: 'Dia 4',
        title: 'Roma para Nápoles & Pompéia',
        events: [
          { time: '08:00', title: 'Trem de alta velocidade de Roma para Nápoles' },
          { time: '11:00', title: 'Passeio arqueológico pelas ruínas preservadas de Pompéia' },
          { time: '18:00', title: 'Retorno a Nápoles e degustação da autêntica Pizza Napolitana' }
        ]
      },
      {
        day: 'Dia 5',
        title: 'Costa Amalfitana: Chegada em Positano',
        events: [
          { time: '09:00', title: 'Deslocamento de Nápoles para Positano' },
          { time: '14:00', title: 'Passeio a pé pelas ladeiras de lojinhas de limoncello e praia' }
        ]
      },
      {
        day: 'Dia 6',
        title: 'Costa Amalfitana: Cruzeiro a Capri',
        events: [
          { time: '09:00', title: 'Charter de barco diurno para a Ilha de Capri' },
          { time: '14:00', title: 'Visita guiada e subida de teleférico em Anacapri' }
        ]
      },
      {
        day: 'Dia 7',
        title: 'Costa Amalfitana: Bate-volta a Amalfi e Ravello',
        events: [
          { time: '10:00', title: 'Ônibus ou balsa local para a cidade de Amalfi' },
          { time: '15:00', title: 'Visita às vilas de Ravello com vistas espetaculares das falésias' }
        ]
      },
      {
        day: 'Dia 8',
        title: 'Costa Amalfitana para Florença',
        events: [
          { time: '08:00', title: 'Viagem de trem rápido para a Toscana (Florença)' },
          { time: '14:30', title: 'Visita à Galeria da Academia (Estátua de Davi de Michelangelo)' }
        ]
      },
      {
        day: 'Dia 9',
        title: 'Florença: Galeria Uffizi & Ponte Vecchio',
        events: [
          { time: '09:00', title: 'Visita guiada ao museu Galeria Uffizi' },
          { time: '15:00', title: 'Caminhada pela Catedral Duomo e Ponte Vecchio' }
        ]
      },
      {
        day: 'Dia 10',
        title: 'Toscana: Pisa & San Gimignano',
        events: [
          { time: '08:30', title: 'Bate-volta de trem a Pisa (Torre de Pisa)' },
          { time: '14:00', title: 'Caminhada medieval na cidade das torres San Gimignano' }
        ]
      },
      {
        day: 'Dia 11',
        title: 'Florença para Veneza',
        events: [
          { time: '09:30', title: 'Trem rápido de Florença para Veneza Santa Lucia' },
          { time: '14:00', title: 'Passeio de Vaporetto pelo Grand Canal' },
          { time: '17:00', title: 'Passeio guiado na Praça e Basílica de São Marcos' }
        ]
      },
      {
        day: 'Dia 12',
        title: 'Veneza: Gôndola e Labirinto de Canais',
        events: [
          { time: '10:00', title: 'Passeio tradicional de gôndola pelos canais' },
          { time: '15:00', title: 'Caminhada pela Ponte Rialto e lojas de máscaras artesanais' }
        ]
      },
      {
        day: 'Dia 13',
        title: 'Veneza: Bate-volta a Murano & Burano',
        events: [
          { time: '09:30', title: 'Balsa local para as ilhas de vidro de Murano e casas coloridas de Burano' },
          { time: '16:00', title: 'Jantar romântico de frutos do mar à beira de um canal calmo' }
        ]
      },
      {
        day: 'Dia 14',
        title: 'Veneza de volta a Roma',
        events: [
          { time: '09:00', title: 'Trem rápido cruzando a península de Veneza para Roma' },
          { time: '15:00', title: 'Últimas compras de couros e produtos gourmet italianos' },
          { time: '20:30', title: 'Banquete de encerramento da viagem' }
        ]
      },
      {
        day: 'Dia 15',
        title: 'Roma & Voo de Retorno',
        events: [
          { time: '09:00', title: 'Café da manhã no hotel e transfer para o aeroporto Fiumicino' }
        ]
      }
    ]
  }
};

const blogPosts = [
  {
    title: 'Como Planejar uma Viagem para Paris Sem Estresse',
    slug: 'como-planejar-viagem-paris',
    excerpt: 'Descubra os passos essenciais para organizar sua mala, escolher o melhor transporte e evitar golpes comuns na Cidade Luz.',
    content: 'Planejar uma viagem para Paris pode parecer intimidador, mas com as ferramentas certas tudo fica simples. Neste artigo, explicamos detalhadamente como funciona o metrô, quais aplicativos baixar, como economizar nas refeições fora dos pontos turísticos óbvios e como garantir seus ingressos para atrações concorridas como a Torre Eiffel e o Museu do Louvre com antecedência.',
    readTime: '5 min',
    date: '12 Junho 2026',
    category: 'Planejamento',
    image: '/assets/paris.png'
  },
  {
    title: 'O Guia Definitivo de Massas Romanas Tradicionais',
    slug: 'guia-massas-romanas-tradicionais',
    excerpt: 'Entenda a diferença entre Carbonara, Cacio e Pepe, Amatriciana e Gricia e onde comer as versões autênticas em Roma.',
    content: 'Se você vai a Roma, precisa entender a culinária local. A capital italiana possui quatro massas icônicas que servem de base para a gastronomia do Lácio. A famosa Carbonara, a cremosa Cacio e Pepe com queijo Pecorino Romano e pimenta do reino, a saborosa Amatriciana com molho de tomate e guanciale, e a rústica Gricia. Explicamos a história de cada prato e as melhores trattorias no bairro de Trastevere para degustá-los.',
    readTime: '4 min',
    date: '15 Junho 2026',
    category: 'Experiências',
    image: '/assets/greece.png'
  },
  {
    title: 'Lisboa Econômica: Como Aproveitar Gastando Pouco',
    slug: 'lisboa-economica-gastando-pouco',
    excerpt: 'Conheça mirantes gratuitos, passes de elétricos baratos e restaurantes locais deliciosos em Portugal.',
    content: 'Portugal é um dos destinos mais amigáveis para o bolso do turista brasileiro na Europa. Lisboa oferece dezenas de atrações e mirantes totalmente gratuitos (como os Miradouros da Senhora do Monte e Santa Luzia), além de uma malha de elétricos históricos de custo baixo. Damos as melhores dicas para se locomover usando o bilhete Viva Viagem e onde saborear pastéis de nata fresquinhos sem pagar o preço inflacionado de rotas puramente comerciais.',
    readTime: '6 min',
    date: '20 Junho 2026',
    category: 'Economia',
    image: '/assets/norway.png'
  },
  {
    title: '5 Curiosidades que você precisa saber sobre a Capadócia',
    slug: '5-curiosidades-sobre-a-capadocia',
    excerpt: 'Da história de suas cidades subterrâneas ao segredo do clima que permite os balões voarem.',
    content: 'A Capadócia é uma das paisagens mais fascinantes e misteriosas da Terra. Neste artigo cobrimos curiosidades históricas como o fato de possuir dezenas de cidades inteiramente subterrâneas esculpidas na rocha, o segredo das formações rochosas chamadas de Chaminés de Fada e como funciona a calibração de vento dos pilotos de balões de ar quente.',
    readTime: '5 min',
    date: '22 Junho 2026',
    category: 'Curiosidades',
    image: '/assets/turkey.png'
  },
  {
    title: 'Gramado no Inverno: O que fazer na época mais fria do ano',
    slug: 'gramado-no-inverno-o-que-fazer',
    excerpt: 'Aproveite fondues maravilhosos, trilhas de hortênsias e parques de neve na Serra Gaúcha.',
    content: 'O inverno em Gramado é inesquecível. Analisamos todas as principais atrações abertas de junho a agosto, dicas para reservar as famosas sequências de fondue suíço sem pagar taxas de agência, passeios de pedalinho no Lago Negro cercado de araucárias e o roteiro ideal de 3 dias para curtir com a família.',
    readTime: '5 min',
    date: '23 Junho 2026',
    category: 'Destinos',
    image: '/assets/gramado.png'
  }
];

// Async CMS Interface Mock functions for dynamic server fetching simulation

export async function getDestinations() {
  return Object.values(destinations);
}

export async function getDestinationBySlug(slug) {
  return destinations[slug] || null;
}

export async function getItineraries() {
  return Object.values(itineraries);
}

export async function getItineraryBySlug(slug) {
  return itineraries[slug] || null;
}

export async function getItinerariesForDestination(destSlug) {
  return Object.values(itineraries).filter(it => it.destinationSlug === destSlug);
}

export async function getBlogPosts() {
  return blogPosts;
}

export async function getBlogPostBySlug(slug) {
  return blogPosts.find(post => post.slug === slug) || null;
}

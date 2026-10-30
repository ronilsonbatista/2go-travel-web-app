// Master Data for 2GO Travel Destination Guides with 100% Original, Deep Content

export const destinationGuides = {
  'como-planejar-viagem-paris': {
    slug: 'como-planejar-viagem-paris',
    city: 'Paris',
    country: 'França',
    emoji: '🇫🇷',
    currency: 'Euro (€)',
    language: 'Francês',
    title: 'Paris: Guia completo',
    subtitle: 'Tudo o que você precisa saber sobre documentos, transporte de metrô, melhores arrondissements, custos diários e reservas antecipadas.',
    category: 'Destinos',
    categoryLabel: 'Guia de destino',
    metaTitle: 'Paris: Guia completo',
    metaDescription: 'Guia completo e definitivo para planejar sua viagem para Paris. Saiba sobre vistos, seguro viagem, passagens de metrô, bairros e atrações.',
    // Distinct from Torre Eiffel must-see pin (paris-eiffel-seine.jpg).
    heroImage: '/images/destinations/paris/curated-hero.jpg',
        images: [],
    summaryText: 'Paris é uma das capitais mais visitadas do planeta. Planejar a viagem exige entender a distribuição por arrondissements, a malha de metrô, as regras do Espaço Schengen e o agendamento de ingressos fura-fila.',
    intro: 'Paris é uma metrópole vibrante que combina monumentos históricos seculares, galerias de arte renomadas mundialmente e a mais prestigiada cultura gastronômica. Organizar uma viagem para a Cidade Luz exige estratégia para otimizar os dias, evitar filas extensas e circular com facilidade entre os distritos.',
    whyVisit: 'Paris oferece uma densidade cultural incomparável: em poucas quadras você caminha dos jardins reais dos Tuileries até os bistrôs históricos de Saint-Germain, admirando a arquitetura haussmanniana e acervos artísticos da humanidade no Louvre e Musée d\'Orsay.',
    whenToGo: 'A primavera (abril a junho) e o outono (setembro a novembro) são as épocas ideais, apresentando temperaturas amenas entre 12°C e 22°C e belos cenários floridos ou avermelhados nos parques. O verão (julho/agosto) é bastante movimentado e quente, enquanto o inverno (dezembro a fevereiro) é frio e cinzento, porém perfeito para museus e preços mais baixos.',
    idealDays: '5 a 7 dias é o período recomendado para cobrir os principais monumentos sem correria e realizar ao menos um bate-volta a Versalhes.',
    chipFacts: {
      season: 'Primavera e outono',
      days: '5 a 7 dias',
      transport: 'Metrô RATP com Navigo Easy'
    },
    howToGet: 'A maioria dos voos internacionais chega pelo Aeroporto Charles de Gaulle (CDG) ou Orly (ORY). O trem RER B conecta o aeroporto CDG ao centro de Paris (estações Gare du Nord, Châtelet e Saint-Michel) em 35 minutos. O táxi oficial possui tarifa fixa tabelada para o centro de Paris (€ 56 a € 65).',
    documentation: 'Brasileiros não precisam de visto prévio para viagens a turismo de até 90 dias no Espaço Schengen. Requisitos obrigatórios na imigração: passaporte válido por no mínimo 3 meses após a saída planejada, seguro viagem com cobertura de ao menos € 30.000, comprovantes de hospedagem e recursos financeiros (€ 65 a € 120 por dia).',
    insurance: 'O seguro viagem com cobertura de despesas médicas de no mínimo € 30.000 é item obrigatório exigido pelas autoridades do Espaço Schengen. Deve ser contratado antes do embarque.',
    internet: 'A forma mais prática é adquirir um eSIM internacional antes de viajar ou comprar um chip físico local (Orange Holiday ou SFR) logo na chegada ao aeroporto CDG, oferecendo dados 5G rápidos em toda a Europa.',
    currencyInfo: 'A moeda oficial é o Euro (€). Cartões de débito internacionais (como Nomad, Wise e Revolut) são aceitos em 99% dos locais, mas é recomendável manter € 30 em espécie para compras pequenas em feiras de rua.',
    languageInfo: 'O idioma oficial é o francês. Em áreas turísticas, hotéis e restaurantes, o inglês é amplamente compreendido. Cumprimentar com um "Bonjour" (bom dia) ou "Bonsoir" (boa noite) abre portas e gera um atendimento muito mais simpático.',
    
    neighborhoods: [
      { name: 'Le Marais (3º e 4º arrondissements)', pros: 'Localização centralíssima, atmosfera vibrante, boutiques elegantes e vasta oferta de bistrôs.', cons: 'Preços de hospedagem mais elevados e ruas movimentadas nos fins de semana.' },
      { name: 'Saint-Germain-des-Prés (6º arrondissement)', pros: 'Bairro nobre, elegante, perto dos Jardins de Luxemburgo e cafés históricos.', cons: 'Valores de diária entre os mais caros da cidade.' },
      { name: 'Opéra / Grands Boulevards (9º arrondissement)', pros: 'Conexão excelente de metrô, perto das Galerias Lafayette e opções variadas de hotéis.', cons: 'Tráfego intenso de veículos durante o dia.' },
      { name: 'Montparnasse (14º arrondissement)', pros: 'Excelente relação custo-benefício, ambiente residencial seguro e ótimos crepes.', cons: 'Exige 15 a 20 minutos de metrô para chegar ao miolo do Rio Sena.' },
      { name: 'Quartier Latin (5º arrondissement)', pros: 'Atmosfera universitária jovem, livrarias históricas e opções acessíveis de refeição.', cons: 'Algumas ruas perto do Boulevard Saint-Michel podem ser barulhentas.' }
    ],

    transportDetails: 'Metrô RATP com Navigo Easy ou Navigo Découverte. O metrô de Paris conta com 16 linhas que cobrem cada canto da cidade; o cartão recarregável Navigo Easy ou o passe semanal Navigo Découverte (que requer foto 3x4) são bem mais econômicos do que bilhetes avulsos em papel. Táxis oficiais e apps como Uber funcionam bem, porém o trânsito no centro pode ser lento nos horários de pico.',

    attractions: [
      {
        name: 'Torre Eiffel',
        image: '/images/destinations/paris/curated-attraction-0.jpg',
        priority: 'Alta',
        desc: 'O monumento pago mais visitado do mundo, inaugurado em 1889 para a Exposição Universal com 330 metros de altura.',
        whyVisit: 'Símbolo máximo de Paris com vista panorâmica em 360 graus inesquecível de toda a cidade.',
        recommendedTime: '2 a 3 horas',
        bestTime: 'Ao entardecer para contemplar o pôr do sol e o espetáculo das luzes piscando.',
        duration: '2,5 horas',
        transport: 'Metrô Linha 6 (Estação Bir-Hakeim) ou RER C (Estação Champ de Mars - Tour Eiffel)',
        price: '€ 18,10 (escadas até o 2º andar) a € 28,30 (elevador até o topo)',
        reservation: 'Obrigatória com 60 dias de antecedência no site oficial',
        tip2GO: 'Suba pelo elevador ao entardecer e assista ao acendimento das 20.000 lâmpadas que piscam nos primeiros 5 minutos de cada hora da noite.'
      },
      {
        name: 'Museu do Louvre',
        image: '/images/destinations/paris/curated-attraction-1.jpg',
        priority: 'Alta',
        desc: 'O maior museu de arte do planeta, abrigando mais de 35.000 obras incluindo a Mona Lisa, a Vênus de Milo e a Vitória de Samotrácia.',
        whyVisit: 'Acervo cultural incomparável reunindo artefatos do Egito antigo, Grécia, Roma e pintura renascentista.',
        recommendedTime: '3 a 5 horas',
        bestTime: 'Primeiro horário da manhã (09h00) ou nas aberturas noturnas de quarta e sexta-feira.',
        duration: '4 horas',
        transport: 'Metrô Linhas 1 ou 7 (Estação Palais Royal - Musée du Louvre)',
        price: '€ 22,00 (Entrada com horário marcado)',
        reservation: 'Obrigatória antecipadamente online',
        tip2GO: 'Entre pelo acesso subterrâneo do centro comercial Carrousel du Louvre para evitar a fila da pirâmide de vidro.'
      },
      {
        name: 'Arco do Triunfo & Champs-Élysées',
        image: '/images/destinations/paris/curated-attraction-2.jpg',
        priority: 'Média',
        desc: 'Monumento neoclássico encomendado por Napoleão Bonaparte em 1806 para celebrar as vitórias do exército francês.',
        whyVisit: 'O terraço no topo oferece a vista mais bonita da Torre Eiffel e do traçado das 12 avenidas que convergem na praça.',
        recommendedTime: '1,5 a 2 horas',
        bestTime: 'Fim de tarde para ver as luzes da Champs-Élysées acenderem.',
        duration: '1,5 hora',
        transport: 'Metrô Linhas 1, 2, 6 ou RER A (Estação Charles de Gaulle - Étoile)',
        price: '€ 13,00 (Acesso à avenida é gratuito; valor para subir ao terraço)',
        reservation: 'Recomendada no site oficial',
        tip2GO: 'Use a passagem subterrânea para cruzar a rotatória movimentada; jamais tente atravessar a rua por cima.'
      },
      {
        name: 'Basílica de Sacré-Cœur e Montmartre',
        image: '/images/destinations/paris/curated-attraction-3.jpg',
        priority: 'Alta',
        desc: 'Templo de mármore branco situado no topo da colina de Montmartre, o histórico bairro dos pintores boêmios.',
        whyVisit: 'Combina vista espetacular da cidade com ruelas charmosas, a Place du Tertre e o Muro do Eu Te Amo.',
        recommendedTime: '3 a 4 horas',
        bestTime: 'Início da manhã para tranquilidade ou pôr do sol na escadaria.',
        duration: '3 horas',
        transport: 'Metrô Linha 2 (Estação Anvers) ou Linha 12 (Estação Abbesses)',
        price: 'Gratuito para entrar na nave da basílica (€ 8 para subir à cúpula)',
        reservation: 'Não é necessária',
        tip2GO: 'Pegue o funicular de Montmartre usando um bilhete comum de metrô para evitar subir os 222 degraus a pé.'
      },
      {"name": "Notre-Dame de Paris", "image": "/images/destinations/paris/curated-attraction-4.jpg", "desc": "Catedral histórica na Île de la Cité.", "whyVisit": "Explore a arquitetura gótica e o centro histórico de Paris.", "duration": "1–2 horas", "recommendedTime": "1–2 horas", "priority": "Média", "price": "Consulte os ingressos oficiais", "bestTime": "Confira os horários de visita", "reservation": "Consulte a atração"},
      {"name": "Musée d’Orsay", "image": "/images/destinations/paris/curated-attraction-5.jpg", "desc": "Museu de arte instalado na antiga estação de Orsay.", "whyVisit": "Veja obras impressionistas em um edifício histórico.", "duration": "1–2 horas", "recommendedTime": "1–2 horas", "priority": "Média", "price": "Consulte os ingressos oficiais", "bestTime": "Confira os horários de visita", "reservation": "Consulte a atração"}
    ],

    suggestedItinerary: [
      { day: 'Dia 1', title: 'Ícones de Paris', details: 'Manhã na Torre Eiffel, passeio de barco no Rio Sena (Bateaux-Mouches) e caminhada ao entardecer no Arco do Triunfo.' },
      { day: 'Dia 2', title: 'Arte e História', details: 'Manhã inteira no Museu do Louvre, almoço nos Jardins dos Tuileries e tarde na Place Vendôme e Ópera Garnier.' },
      { day: 'Dia 3', title: 'Boemia e Arte Impressionista', details: 'Manhã no Musée d\'Orsay, caminhada pelo bairro de Saint-Germain-des-Prés e fim de tarde em Montmartre e Sacré-Cœur.' },
      { day: 'Dia 4', title: 'Bate-Volta Real', details: 'Dia inteiro dedicado ao Palácio de Versalhes (Jardins e Galeria dos Espelhos), retornando no fim do dia para jantar no Le Marais.' },
      { day: 'Dia 5', title: 'Cultura e Ilha da Cidade', details: 'Manhã na Sainte-Chapelle e Île de la Cité, tarde no Centro Pompidou e compras nas Galeries Lafayette.' }
    ],

    dayTrips: [
      'Palácio de Versalhes (40 min de RER C)',
      'Disneyland Paris (45 min de RER A)',
      'Jardins de Monet em Giverny (1h de trem + ônibus)',
      'Castelos do Vale do Loire (1h a 2h de trem TGV)'
    ],

    gastronomy: [
      'Croissant e Pain au Chocolat em padarias artesanais',
      'Crepes doces e galettes de trigo sarraceno',
      'Sopa de Cebola Francesa (Soupe à l\'Oignon)',
      'Boeuf Bourguignon e Confit de Pato',
      'Macarons de patisseries renomadas (Pierre Hermé / Ladurée)'
    ],

    shopping: [
      'Galeries Lafayette & Printemps Haussmann',
      'Boutiques independentes no Le Marais',
      'Livrarias históricas no Quartier Latin (Shakespeare and Company)',
      'Feiras de antiguidades de Saint-Ouen'
    ],

    nightlife: [
      'Espetáculos de cabarés históricos (Moulin Rouge / Le Lido)',
      'Bares de vinho artesanal e jazzeiras no Quartier Latin',
      'Cocktail bars speakeasy no Le Marais e Bastille'
    ],

    costsTable: {
      economy: { daily: '€ 70 - € 100', hotel: 'Hostel ou hotel 2 estrelas (€ 50-80)', food: 'Bistrôs rápidos e boulangeries (€ 20-30)', transport: 'Metrô (Passe Navigo)' },
      comfort: { daily: '€ 180 - € 260', hotel: 'Hotel boutique 3 ou 4 estrelas (€ 120-180)', food: 'Almoço e jantar em bistrôs tradicionais (€ 50-80)', transport: 'Metrô + pontual Uber' },
      luxury: { daily: '€ 500+', hotel: 'Hotéis 5 estrelas ou Palácios (€ 450+)', food: 'Restaurantes estrelados Michelin (€ 150+)', transport: 'Traslados privados' }
    },

    commonMistakes: [
      'Não reservar o Louvre e a Torre Eiffel com antecedência (filas de até 3 horas).',
      'Comprar bilhetes individuais de metrô em vez de utilizar o cartão Navigo Easy.',
      'Pegar táxis não oficiais no aeroporto sem conferir a tabela fixa de preços.',
      'Tentar visitar o Louvre inteiro em poucas horas sem roteiro definido.'
    ],

    importantTips: [
      'Sempre cumprimente os atendentes locais com "Bonjour" antes de fazer pedidos.',
      'Guarde seus pertences com atenção em locais movimentados como o metrô e a Torre Eiffel.',
      'Valide sempre seu bilhete de metrô nas catracas para evitar multas de fiscalização.',
      'A água da torneira ("carafe d\'eau") em restaurantes é potável e totalmente gratuita.'
    ],

    faqs: [
      { q: 'É preciso visto para Paris?', a: 'Brasileiros não precisam de visto para estadias a turismo de até 90 dias no Espaço Schengen.' },
      { q: 'Qual a melhor época para viajar?', a: 'Primavera (abril a junho) e outono (setembro a novembro), com clima ameno e menos lotação.' },
      { q: 'Quantos dias ficar em Paris?', a: 'Recomendamos entre 5 e 7 dias para ver os principais pontos com calma e fazer um bate-volta.' },
      { q: 'O seguro viagem é obrigatório?', a: 'Sim, o Espaço Schengen exige seguro com cobertura médica mínima de € 30.000.' },
      { q: 'Como ir do aeroporto CDG ao centro?', a: 'O trem RER B leva cerca de 35 minutos (€ 11,80) e táxis oficiais têm tarifa fixa de € 56 a € 65.' },
      { q: 'O metrô é fácil de usar?', a: 'Muito fácil. São 16 linhas integradas com sinalização clara em todas as estações.' },
      { q: 'Precisa reservar atrações antes?', a: 'Sim! Atrações como Louvre, Torre Eiffel e Sainte-Chapelle exigem reserva prévia online.' },
      { q: 'Qual moeda levar?', a: 'Euro (€). Cartões internacionais de débito (Wise, Nomad) são aceitos em quase 100% dos lugares.' },
      { q: 'É preciso falar francês?', a: 'Não é obrigatório, mas aprender palavras básicas como Bonjour e Merci facilita bastante.' },
      { q: 'Onde se hospedar barato?', a: 'Bairros como Montparnasse (14º), Bastille (11º) e 15º arrondissement têm ótimos preços.' },
      { q: 'A água é potável?', a: 'Sim, a água da torneira é excelente. Peça "carafe d\'eau" em restaurantes sem pagar nada.' },
      { q: 'Vale a pena o Paris Museum Pass?', a: 'Vale a pena se você pretende visitar 4 ou mais museus inclusos em um curto período.' },
      { q: 'Como evitar furtos?', a: 'Mantenha mochilas para a frente no metrô e não aceite "presentes" de estranhos na rua.' },
      { q: 'Quanto custa um almoço médio?', a: 'Um menu de almoço com entrada e prato principal em bistrôs custa entre € 16 e € 24.' },
      { q: 'Uber funciona bem em Paris?', a: 'Sim, funciona perfeitamente, mas o metrô é quase sempre mais rápido devido ao trânsito.' }
    ]
  },

  'como-planejar-viagem-nova-york': {
    slug: 'como-planejar-viagem-nova-york',
    city: 'Nova York',
    country: 'Estados Unidos',
    emoji: '🇺🇸',
    currency: 'Dólar ($)',
    language: 'Inglês',
    title: 'Nova York: Guia completo',
    subtitle: 'Passaporte, visto americano, transporte OMNY 24h, melhores bairros de Manhattan e custos diários.',
    category: 'Destinos',
    categoryLabel: 'Guia de destino',
    metaTitle: 'Nova York: Guia completo',
    metaDescription: 'Guia completo para planejar sua viagem a Nova York. Saiba sobre vistos, metrô OMNY, hospedagem e atrações de Manhattan.',
    // Chelsea hero — skyline stays on the 30s map; Liberty keeps an exclusive must-see pin.
    heroImage: '/images/destinations/nova-york/curated-hero.jpg',
            images: [],
    summaryText: 'Nova York é a capital cultural dos Estados Unidos. Planejar exige vistos em dia, entender a divisão de Manhattan e usar o sistema de transporte OMNY.',
    intro: 'Nova York é uma metrópole vibrante, famosa por seus arranha-céus icônicos, espetáculos da Broadway e bairros cheios de personalidade. Uma viagem inesquecível para a Big Apple exige um bom planejamento de deslocamento e orçamento.',
    whyVisit: 'Diversidade cultural sem igual, gastronomia do mundo todo, museus globais (como MoMA e Met) e parques lendários como o Central Park. A cidade recompensa quem combina ícones de Midtown com caminhadas no Brooklyn e no Lower Manhattan.',
    whenToGo: 'Outono (setembro a novembro) e Primavera (abril a junho) oferecem clima ideal. O inverno é mágico para festas de fim de ano, porém muito frio.',
    idealDays: '6 a 8 dias para vivenciar o essencial de Manhattan e dar uma escapada ao Brooklyn.',
    chipFacts: {
      season: 'Outono e primavera',
      days: '6 a 8 dias',
      transport: 'Metrô 24h com OMNY'
    },
    howToGet: 'Voos chegam aos aeroportos JFK, Newark (EWR) ou LaGuardia (LGA). Do JFK, o AirTrain conecta ao metrô na estação Jamaica por cerca de $ 11,25.',
    documentation: 'Exige visto americano de turismo (B1/B2) válido ou autorização ESTA para quem tem passaporte de país elegível.',
    insurance: 'Altamente recomendado. Os custos de atendimento médico nos EUA estão entre os mais altos do planeta.',
    internet: 'Recomendamos adquirir um eSIM internacional antes do embarque para ter internet ilimitada logo ao pousar.',
    currencyInfo: 'Dólar Americano ($). Cartões de débito internacionais (Nomad, Wise) são amplamente aceitos; quase tudo funciona por aproximação.',
    languageInfo: 'Inglês é o idioma principal. O espanhol é amplamente falado por grande parte dos trabalhadores da cidade.',
    
    neighborhoods: [
      { name: 'Midtown Manhattan', pros: 'Perto da Times Square, Broadway e principais atrações.', cons: 'Movimentado e barulhento.' },
      { name: 'Lower Manhattan / Financial District', pros: 'Tranquilo à noite, perto do Memorial do 11 de Setembro.', cons: 'Comércio fecha mais cedo.' },
      { name: 'Chelsea & Meatpacking District', pros: 'Bairro descolado, perto do High Line e Chelsea Market.', cons: 'Hospedagem em geral mais cara.' },
      { name: 'Upper West Side', pros: 'Residencial, arborizado, perto do Central Park.', cons: 'Menos vida noturna agitada.' },
      { name: 'Williamsburg (Brooklyn)', pros: 'Atmosfera hipster, cafés excelentes e vistas de Manhattan.', cons: 'Exige deslocamento de metrô.' }
    ],

    transportDetails: 'Metrô 24h com pagamento OMNY. O metrô de Nova York funciona o dia inteiro; o sistema OMNY permite pagar aproximando cartão de débito ou celular na catraca, com limite semanal automático de $ 34,00.',

    attractions: [
      {
        name: 'Empire State Building',
        image: '/images/destinations/nova-york/curated-attraction-0.jpg',
        imagePosition: '50% 10%',
        priority: 'Alta',
        desc: 'O arranha-céu mais famoso do mundo no coração de Midtown.',
        whyVisit: 'Mirante clássico do 86º andar com vista de 360 graus.',
        recommendedTime: '2 horas',
        bestTime: 'Primeiro horário da manhã ou final da noite.',
        duration: '2 horas',
        transport: 'Metrô linhas B, D, F, M, N, Q, R (Estação 34 St - Herald Sq)',
        price: 'A partir de $ 44.00',
        reservation: 'Recomendada online',
        tip2GO: 'Reserve o ingresso no topo para o horário das 08h00 para fotografar sem multidões.'
      },
      {
        name: 'Central Park',
        image: '/images/destinations/nova-york/curated-attraction-1.jpg',
        priority: 'Alta',
        desc: 'O pulmão verde no meio dos arranha-céus de Manhattan.',
        whyVisit: 'Área imensa para caminhadas, passeios de bicicleta e piqueniques.',
        recommendedTime: '3 a 4 horas',
        bestTime: 'Manhã ensolarada.',
        duration: '3 horas',
        transport: 'Várias estações de metrô ao longo do parque (59 St, 72 St, 81 St)',
        price: 'Gratuito',
        reservation: 'Não é necessária',
        tip2GO: 'Alugue uma bicicleta perto de Columbus Circle para percorrer o circuito completo do parque.'
      },
      {
        name: 'Times Square & Broadway',
        image: '/images/destinations/nova-york/curated-attraction-2.jpg',
        priority: 'Alta',
        desc: 'O cruzamento mais famoso do mundo, com painéis LED e teatros da Broadway.',
        whyVisit: 'Energia noturna única e espetáculos de classe mundial.',
        recommendedTime: '2 horas (+ show)',
        bestTime: 'Anoitecer para as luzes e horário do show.',
        duration: '2 horas',
        transport: 'Metrô 42 St - Times Square',
        price: 'Gratuito para circular; shows à parte',
        reservation: 'Shows com antecedência',
        tip2GO: 'Compre ingressos TKTS no dia para descontos de última hora em alguns musicais.'
      },
      {
        name: 'Estátua da Liberdade & Battery',
        image: '/images/destinations/nova-york/curated-attraction-3.jpg',
        imagePosition: '50% 0%',
        priority: 'Alta',
        desc: 'O ícone de Lower Manhattan e o porto de Nova York.',
        whyVisit: 'Símbolo histórico com skyline de fundo e ferry até Liberty Island.',
        recommendedTime: '3 a 4 horas',
        bestTime: 'Primeira balsa da manhã.',
        duration: '3,5 horas',
        transport: 'Ferry em Battery Park (reserve com Statue City Cruises)',
        price: 'A partir de $ 24,50 (ferry + pedestal)',
        reservation: 'Obrigatória online',
        tip2GO: 'Reserve a opção com acesso ao pedestal com semanas de antecedência.'
      },
      {
        name: 'Brooklyn Bridge & DUMBO',
        image: '/images/destinations/nova-york/curated-attraction-4.jpg',
        priority: 'Média',
        desc: 'Caminhada clássica sobre o East River até as ruas de cobblestone de DUMBO.',
        whyVisit: 'Vista icônica de Manhattan e cafés com skyline.',
        recommendedTime: '2 a 3 horas',
        bestTime: 'Manhã cedo para evitar multidões na ponte.',
        duration: '2,5 horas',
        transport: 'Metrô Brooklyn Bridge - City Hall ou High St',
        price: 'Gratuito',
        reservation: 'Não é necessária',
        tip2GO: 'Fotografe a ponte a partir do Washington Street em DUMBO.'
      },
      {
        name: 'High Line & Chelsea',
        image: '/images/destinations/nova-york/curated-attraction-5.jpg',
        priority: 'Média',
        desc: 'Parque elevado sobre antigos trilhos, com arte e vistas de Midtown West.',
        whyVisit: 'Passeio urbano diferente, conectando Meatpacking a Hudson Yards.',
        recommendedTime: '1,5 a 2 horas',
        bestTime: 'Final de tarde.',
        duration: '2 horas',
        transport: 'Metrô 14 St - 8 Av ou 34 St - Hudson Yards',
        price: 'Gratuito',
        reservation: 'Não é necessária',
        tip2GO: 'Desça no Chelsea Market no meio do percurso para um lanche rápido.'
      }
    ],

    suggestedItinerary: [
      { day: 'Dia 1', title: 'Midtown & Times Square', details: 'Times Square, Bryant Park, Grand Central Terminal e Empire State.' },
      { day: 'Dia 2', title: 'Central Park & Museus', details: 'Central Park pela manhã, The Met ou MoMA à tarde.' },
      { day: 'Dia 3', title: 'Downtown & Liberdade', details: 'Battery Park, ferry da Estátua da Liberdade e One World Observatory.' },
      { day: 'Dia 4', title: 'Brooklyn & DUMBO', details: 'Caminhada na Brooklyn Bridge, DUMBO e pôr do sol em Brooklyn Heights.' },
      { day: 'Dia 5', title: 'High Line & Chelsea', details: 'High Line, Chelsea Market e Hudson Yards.' }
    ],

    dayTrips: ['Washington D.C. (3h de trem Acela)', 'Filadélfia (1h30 de trem)'],
    gastronomy: ['Pizza em fatias (Dollar Slice)', 'Bagels com cream cheese e salmon', 'Burgers artesanais'],
    shopping: ['Fifth Avenue', 'SoHo', 'Woodbury Common Premium Outlets'],
    nightlife: ['Show na Broadway', 'Bares de jazz no Greenwich Village', 'Rooftops em Midtown'],

    costsTable: {
      economy: { daily: '$ 120 - $ 160', hotel: 'Hotel em Queens/Brooklyn ou Hostel ($ 90-130)', food: 'Fast casual e fatias de pizza ($ 30-40)', transport: 'Metrô OMNY' },
      comfort: { daily: '$ 280 - $ 420', hotel: 'Hotel 3-4 estrelas em Manhattan ($ 200-320)', food: 'Restaurantes casuais ($ 70-100)', transport: 'Metrô + Uber' },
      luxury: { daily: '$ 800+', hotel: 'Hotéis de luxo ($ 600+)', food: 'Restaurantes conceituados ($ 200+)', transport: 'Táxi / Carro privado' }
    },

    commonMistakes: ['Tentar pegar táxi em horário de pico.', 'Não comprar ingressos para a Broadway antes.'],
    importantTips: ['Dorsas de gorjeta nos EUA são de 18% a 22% em restaurantes.', 'Use o OMNY por aproximação.'],

    faqs: [
      { q: 'Precisa de visto para Nova York?', a: 'Sim, o visto americano B1/B2 ou ESTA é obrigatório.' },
      { q: 'Qual a melhor época para ir?', a: 'Maio a Junho e Setembro a Outubro oferecem clima agradável.' },
      { q: 'Quantos dias são ideais?', a: 'Recomendamos de 6 a 8 dias.' },
      { q: 'Como pagar o metrô?', a: 'Aproxime seu cartão de débito por aproximação ou celular no leitor OMNY.' },
      { q: 'Gorjeta é obrigatória?', a: 'Sim, é culturalmente esperada de 18% a 20% em restaurantes.' },
      { q: 'O seguro viagem é obrigatório?', a: 'Não é exigência legal, mas é altamente recomendado pelos custos médicos dos EUA.' },
      { q: 'Como ir do aeroporto JFK?', a: 'O AirTrain conecta ao metrô em Jamaica Station.' },
      { q: 'Onde se hospedar barato?', a: 'Long Island City (Queens) tem tarifas bem menores que Manhattan.' },
      { q: 'Nova York é segura?', a: 'Sim, é uma das grandes cidades mais seguras dos EUA, mas cuide de seus pertences.' },
      { q: 'O que comer em Nova York?', a: 'Não deixe de provar bagels frescos, fatias de pizza e pastrami no Katz\'s.' },
      { q: 'Broadway precisa reservar?', a: 'Sim, para os shows populares compre com antecedência.' },
      { q: 'Qual mirante escolher?', a: 'Summit One Vanderbilt e Top of the Rock oferecem as melhores vistas.' },
      { q: 'Como ter internet?', a: 'Compre um eSIM internacional antes de viajar.' },
      { q: 'Dólar em espécie ainda é usado?', a: 'Pouco. Quase 100% das lojas aceitam cartão por aproximação.' },
      { q: 'Vale a pena ir ao Brooklyn?', a: 'Com certeza! Williamsburg e DUMBO oferecem ótimas experiências.' }
    ]
  },

  'como-planejar-viagem-toquio': {
    slug: 'como-planejar-viagem-toquio',
    city: 'Tóquio',
    country: 'Japão',
    emoji: '🇯🇵',
    currency: 'Iene (¥)',
    language: 'Japonês',
    title: 'Tóquio: Guia completo',
    subtitle: 'Isenção de visto para brasileiros, cartão IC Suica, transporte pontual e bairros como Shinjuku e Shibuya.',
    category: 'Destinos',
    categoryLabel: 'Guia de destino',
    metaTitle: 'Tóquio: Guia completo',
    metaDescription: 'Guia completo para viajar a Tóquio. Saiba sobre isenção de visto, transporte IC Suica, onde ficar e roteiro em Tóquio.',
    heroImage: '/images/destinations/toquio/curated-hero.jpg',
            images: [],
    summaryText: 'Tóquio mescla tradição milenar e tecnologia de ponta com um sistema de transporte impecável.',
    intro: 'Tóquio é uma metrópole surpreendente pela organização, segurança absoluta e riqueza gastronômica. Viajar para o Japão ficou ainda mais fácil com a isenção de visto para brasileiros.',
    whyVisit: 'Gastronomia excepcional, templos históricos preservados e cultura pop única no mundo. Em poucos dias você mescla Shibuya, templos de Asakusa e mirantes da Tokyo Tower.',
    whenToGo: 'Primavera (março a maio, época das cerejeiras) e Outono (setembro a novembro) são perfeitos.',
    idealDays: '6 a 7 dias para explorar os diversos distritos urbanos.',
    chipFacts: {
      season: 'Primavera e outono',
      days: '6 a 7 dias',
      transport: 'Metrô e JR com Suica/Pasmo'
    },
    howToGet: 'Voos chegam pelos aeroportos de Narita (NRT) ou Haneda (HND). Haneda fica bem mais perto do centro.',
    documentation: 'Brasileiros com passaporte comum estão isentos de visto para estadias de até 90 dias.',
    insurance: 'Recomendado contratar seguro viagem internacional com cobertura médica e extravio de bagagem.',
    internet: 'Alugue um Pocket Wi-Fi no aeroporto ou ative um eSIM antes do embarque para ter dados na chegada.',
    currencyInfo: 'Iene (¥). Embora os cartões sejam bem aceitos, dinheiro em espécie ainda é usado em pequenos estabelecimentos.',
    languageInfo: 'Japonês. O Google Tradutor e sinalizações em inglês ajudam bastante no metrô e em áreas turísticas.',

    neighborhoods: [
      { name: 'Shinjuku', pros: 'Vida noturna vibrante, conexão de trens imbatível.', cons: 'Estação imensa e movimentada.' },
      { name: 'Shibuya', pros: 'Jovem, moderno, perto do famoso cruzamento.', cons: 'Preços de diárias mais altos.' },
      { name: 'Ginza', pros: 'Bairro elegante, lojas de luxo, tranquilo.', cons: 'Opções gastronômicas sofisticadas e caras.' },
      { name: 'Asakusa', pros: 'Tradicional, perto do templo Senso-ji, mais em conta.', cons: 'Mais distante da zona oeste.' }
    ],

    transportDetails: 'Metrô e JR com Suica ou Pasmo. O metrô e as linhas da JR (incluindo a Yamanote Line) cobrem toda a cidade; adicione o cartão IC Suica ou Pasmo na Apple Wallet para pagar por aproximação.',

    attractions: [
      {
        name: 'Templo Senso-ji (Asakusa)',
        image: '/images/destinations/toquio/curated-attraction-0.jpg',
        priority: 'Alta',
        desc: 'O templo budista mais antigo de Tóquio.',
        whyVisit: 'Atmosfera histórica incrível com a rua de comércio tradicional Nakamise.',
        recommendedTime: '2 horas',
        bestTime: 'Manhã bem cedo.',
        duration: '2 horas',
        transport: 'Estação Asakusa (Linha Ginza)',
        price: 'Gratuito',
        reservation: 'Não é necessária',
        tip2GO: 'Chegue às 08h00 para fotografar o portão Kaminarimon sem multidões.'
      },
      {
        name: 'Cruzamento de Shibuya',
        image: '/images/destinations/toquio/curated-attraction-1.jpg',
        priority: 'Alta',
        desc: 'O scrambling crossing mais fotografado do Japão.',
        whyVisit: 'Energia urbana pop e mirante do Magasa / Shibuya Sky.',
        recommendedTime: '1,5 a 2 horas',
        bestTime: 'Entardecer e noite.',
        duration: '2 horas',
        transport: 'Estação Shibuya (JR Yamanote / Linha Ginza)',
        price: 'Gratuito na rua; mirantes à parte',
        reservation: 'Shibuya Sky com antecedência',
        tip2GO: 'Suba ao Shibuya Sky ao pôr do sol para ver o cruzamento do alto.'
      },
      {
        name: 'Shinjuku & Golden Gai',
        image: '/images/destinations/toquio/curated-attraction-2.jpg',
        priority: 'Alta',
        desc: 'Arranha-céus, neon e vielas de bares minúsculos.',
        whyVisit: 'Vida noturna lendária e mirante gratuito do Governo Metropolitano.',
        recommendedTime: '3 horas',
        bestTime: 'Noite.',
        duration: '3 horas',
        transport: 'Estação Shinjuku',
        price: 'Mirante gratuito; drinks à parte',
        reservation: 'Não é necessária',
        tip2GO: 'Reserve o estômago para um izakaya antes de explorar o Golden Gai.'
      },
      {
        name: 'Santuário Meiji (Harajuku)',
        image: '/images/destinations/toquio/curated-attraction-3.jpg',
        priority: 'Média',
        desc: 'Floresta sagrada no meio da cidade, com torii monumentais.',
        whyVisit: 'Contraste sereno com Takeshita Street ao lado.',
        recommendedTime: '1,5 a 2 horas',
        bestTime: 'Manhã.',
        duration: '2 horas',
        transport: 'Estação Harajuku (JR Yamanote)',
        price: 'Gratuito',
        reservation: 'Não é necessária',
        tip2GO: 'Combine com um café em Omotesando depois da visita.'
      },
      {
        name: 'Tokyo Skytree',
        image: '/images/destinations/toquio/curated-attraction-4.jpg',
        priority: 'Média',
        desc: 'A torre de observação mais alta do Japão, em Sumida.',
        whyVisit: 'Vista de 360º da metrópole e do Monte Fuji em dias limpos.',
        recommendedTime: '2 horas',
        bestTime: 'Entardecer.',
        duration: '2 horas',
        transport: 'Estação Tokyo Skytree / Oshiage',
        price: 'A partir de ¥ 2.100',
        reservation: 'Recomendada online',
        tip2GO: 'Compre o bilhete com horário marcado para evitar filas no deck principal.'
      },
      {"name": "Tokyo Tower", "image": "/images/destinations/toquio/curated-attraction-5.jpg", "desc": "Torre de observação em Minato.", "whyVisit": "Contemple a paisagem urbana de Tóquio.", "duration": "1–2 horas", "recommendedTime": "1–2 horas", "priority": "Média", "price": "Consulte os ingressos oficiais", "bestTime": "Confira os horários de visita", "reservation": "Consulte a atração"}
    ],

    suggestedItinerary: [
      { day: 'Dia 1', title: 'Asakusa & Ueno', details: 'Templo Senso-ji, parque de Ueno e Akihabara à noite.' },
      { day: 'Dia 2', title: 'Shibuya & Harajuku', details: 'Cruzamento de Shibuya, Meiji Jingu e compras em Omotesando.' },
      { day: 'Dia 3', title: 'Shinjuku noturno', details: 'Mirante do Governo Metropolitano, Omoide Yokocho e Golden Gai.' },
      { day: 'Dia 4', title: 'Sumida & Skytree', details: 'Tokyo Skytree e passeio pelo rio Sumida.' }
    ],

    dayTrips: ['Monte Fuji & Hakone (2h de trem)', 'Nikko (2h de trem)'],
    gastronomy: ['Ramen autêntico', 'Sushi no mercado de Tsukiji', 'Tonkatsu e Yakitori'],
    shopping: ['Akihabara', 'Ginza', 'Shibuya 109'],
    nightlife: ['Golden Gai em Shinjuku', 'Izakayas tradicionais'],

    costsTable: {
      economy: { daily: '¥ 10.000 - 15.000', hotel: 'Hotel cápsula ou business hotel (¥ 7.000)', food: 'Ramen e conveniências (¥ 3.000)', transport: 'Metrô' },
      comfort: { daily: '¥ 25.000 - 35.000', hotel: 'Hotel 3-4 estrelas (¥ 18.000)', food: 'Restaurantes tradicionais (¥ 8.000)', transport: 'Metrô + trem' },
      luxury: { daily: '¥ 70.000+', hotel: 'Hotéis 5 estrelas (¥ 50.000+)', food: 'Omakase renomados (¥ 20.000+)', transport: 'Táxis' }
    },

    commonMistakes: ['Falar alto no metrô (é visto como falta de educação).', 'Não levar dinheiro em espécie.'],
    importantTips: ['Carregue o lixo com você (há poucas lixeiras públicas).', 'Baixe o app do Suica no celular.'],

    faqs: [
      { q: 'Brasileiros precisam de visto para o Japão?', a: 'Não! Houve isenção para estadias de até 90 dias.' },
      { q: 'Qual a melhor época para ver cerejeiras?', a: 'Entre o final de março e início de abril.' },
      { q: 'Quantos dias ficar em Tóquio?', a: 'Ao menos 6 a 7 dias.' },
      { q: 'Como pagar o transporte público?', a: 'Utilize o cartão de transporte Suica ou Pasmo no celular.' },
      { q: 'Precisa dar gorjeta?', a: 'Não! Gorjetas não fazem parte da cultura japonesa e podem ser recusadas.' },
      { q: 'Tóquio é uma cidade cara?', a: 'Com a desvalorização do iene, o Japão está muito acessível para turistas.' },
      { q: 'Onde se hospedar?', a: 'Shinjuku e Shibuya são as regiões mais práticas.' },
      { q: 'Como funciona a internet?', a: 'Alugue um Pocket Wi-Fi ou compre eSIM.' },
      { q: 'Tóquio é segura?', a: 'É uma das cidades mais seguras do mundo.' },
      { q: 'O JR Pass vale a pena em Tóquio?', a: 'Para circular apenas em Tóquio não vale a pena; use cartão Suica.' },
      { q: 'Como pedir comida sem saber japonês?', a: 'Muitos restaurantes têm totens com fotos ou menus em inglês.' },
      { q: 'As lojas aceitam cartão?', a: 'Sim, mas lojas pequenas exigem notas de iene em espécie.' },
      { q: 'Onde ver o Monte Fuji?', a: 'Em dias limpos, do mirante do Governo Metropolitano ou em bate-volta a Hakone.' },
      { q: 'Qual o melhor aeroporto: Narita ou Haneda?', a: 'Haneda é mais próximo e conveniente.' },
      { q: 'É fácil achar lixeiras?', a: 'Não, guarde seu lixo na mochila até voltar ao hotel.' }
    ]
  },

  'como-planejar-viagem-londres': {
    slug: 'como-planejar-viagem-londres',
    city: 'Londres',
    country: 'Reino Unido',
    emoji: '🇬🇧',
    currency: 'Libra Esterlina (£)',
    language: 'Inglês',
    title: 'Londres: Guia completo',
    subtitle: 'Autorização ETA, transporte de metrô Underground, atrações gratuitas e museus épicos.',
    category: 'Destinos',
    categoryLabel: 'Guia de destino',
    metaTitle: 'Londres: Guia completo',
    metaDescription: 'Guia completo para planejar sua viagem a Londres. Saiba sobre ETA, Oyster/contactless, museus gratuitos e bairros.',
    heroImage: '/images/destinations/londres/curated-hero.jpg',
            images: [],
    summaryText: 'Londres combina realeza, museus de classe mundial e parques imensos com transporte excelente.',
    intro: 'Londres é uma metrópole multicultural com história em cada esquina. A cidade oferece uma vasta gama de museus públicos com entrada gratuita.',
    whyVisit: 'Museus gratuitos incríveis (British Museum, Natural History), teatros do West End e parques reais. Em poucos dias você combina Westminster, South Bank e um bate-volta clássico.',
    whenToGo: 'De maio a setembro o clima é mais ameno e os dias são longos. No inverno, museus e teatros compensam os dias mais curtos.',
    idealDays: '5 a 7 dias para cobrir Westminster, museus e um bate-volta.',
    chipFacts: {
      season: 'Maio a setembro',
      days: '5 a 7 dias',
      transport: 'Tube e ônibus contactless'
    },
    howToGet: 'Aeroportos de Heathrow (LHR) e Gatwick (LGW). A linha de metrô Elizabeth Line conecta Heathrow ao centro rapidamente.',
    documentation: 'Exige a autorização prévia de viagem ETA (Electronic Travel Authorization) para brasileiros.',
    insurance: 'Altamente recomendado: atendimento privado para turistas pode sair caro fora do NHS.',
    internet: 'Ative um eSIM antes de sair do aeroporto ou compre chip local da Three / EE na chegada.',
    currencyInfo: 'Libra Esterlina (£). O uso de cartão por aproximação é universal; dinheiro vivo quase não é necessário.',
    languageInfo: 'Inglês é o idioma oficial; sinalização e atendimento turístico são claros em toda a cidade.',

    neighborhoods: [
      { name: 'Covent Garden & Soho', pros: 'Coração cultural, restaurantes e teatros a pé.', cons: 'Hospedagem cara.' },
      { name: 'Kensington & Chelsea', pros: 'Elegante, perto dos grandes museus.', cons: 'Tarifas elevadas.' },
      { name: 'Southwark & Bankside', pros: 'Perto da Tower Bridge e Borough Market.', cons: 'Menos residencial.' }
    ],

    transportDetails: 'Tube e ônibus com contactless e Daily Cap. O Underground e os ônibus usam cartão de débito por aproximação nas catracas, com limite de tarifa diária (Daily Cap).',

    attractions: [
      {
        name: 'Big Ben & Palácio de Westminster',
        image: '/images/destinations/londres/curated-attraction-0.jpg',
        priority: 'Alta',
        desc: 'O ícone máximo britânico às margens do Rio Tâmisa.',
        whyVisit: 'Cartão postal mundial com arquitetura neogótica impressionante.',
        recommendedTime: '1 hora',
        bestTime: 'Blue hour.',
        duration: '1 hora',
        transport: 'Estação Westminster',
        price: 'Gratuito por fora',
        reservation: 'Não necessária para fotos',
        tip2GO: 'Atravesse a Westminster Bridge para a melhor foto com o Big Ben ao fundo.'
      },
      {
        name: 'London Eye',
        image: '/images/destinations/londres/curated-attraction-1.jpg',
        priority: 'Alta',
        desc: 'A roda-gigante na South Bank com vista do Tâmisa e de Westminster.',
        whyVisit: 'Panorama clássico de Londres em cabines fechadas.',
        recommendedTime: '1,5 hora',
        bestTime: 'Entardecer.',
        duration: '1,5 hora',
        transport: 'Estação Waterloo ou Westminster',
        price: 'A partir de £ 32',
        reservation: 'Recomendada online',
        tip2GO: 'Combine com uma caminhada na South Bank até o Borough Market.'
      },
      {
        name: 'Tower Bridge',
        image: '/images/destinations/londres/curated-attraction-2.jpg',
        priority: 'Alta',
        desc: 'A ponte neogótica mais fotografada de Londres.',
        whyVisit: 'Passarelas superiores e vista do Tower of London.',
        recommendedTime: '1,5 a 2 horas',
        bestTime: 'Manhã ou blue hour.',
        duration: '2 horas',
        transport: 'Estação Tower Hill',
        price: 'Exterior gratuito; exhibition à parte',
        reservation: 'Exhibition online',
        tip2GO: 'Fotografe a ponte a partir do Potters Fields Park, no lado sul.'
      },
      {
        name: 'Palácio de Buckingham',
        image: '/images/destinations/londres/curated-attraction-3.jpg',
        priority: 'Média',
        desc: 'Residência oficial da monarquia, com Changing of the Guard.',
        whyVisit: 'Cerimônia da guarda e St. James’s Park ao lado.',
        recommendedTime: '1,5 hora',
        bestTime: 'Horário da troca da guarda (verifique a agenda).',
        duration: '1,5 hora',
        transport: 'Estação Green Park ou Victoria',
        price: 'Exterior gratuito',
        reservation: 'Não necessária para o exterior',
        tip2GO: 'Chegue 45 minutos antes da cerimônia para garantir um bom ângulo.'
      },
      {
        name: 'British Museum',
        image: '/images/destinations/londres/curated-attraction-4.jpg',
        priority: 'Alta',
        desc: 'Um dos maiores museus do mundo, com entrada gratuita.',
        whyVisit: 'Pedra de Roseta, mármores do Partenon e Grande Corte.',
        recommendedTime: '3 horas',
        bestTime: 'Abertura.',
        duration: '3 horas',
        transport: 'Estação Russell Square ou Tottenham Court Road',
        price: 'Gratuito (doações opcionais)',
        reservation: 'Timed entry recomendado',
        tip2GO: 'Reserve o horário gratuito online e foque em 2 ou 3 alas.'
      },
      {"name": "Covent Garden", "image": "/images/destinations/londres/curated-attraction-5.jpg", "desc": "Mercado histórico e bairro de teatros.", "whyVisit": "Caminhe pelo mercado e pelas ruas do West End.", "duration": "1–2 horas", "recommendedTime": "1–2 horas", "priority": "Média", "price": "Consulte os ingressos oficiais", "bestTime": "Confira os horários de visita", "reservation": "Consulte a atração"}
    ],

    suggestedItinerary: [
      { day: 'Dia 1', title: 'Westminster & London Eye', details: 'Big Ben, Westminster Abbey, St. James’s Park e London Eye.' },
      { day: 'Dia 2', title: 'Tower Bridge & City', details: 'Tower of London, Tower Bridge e caminhada na South Bank.' },
      { day: 'Dia 3', title: 'Museus & West End', details: 'British Museum de manhã e musical no West End à noite.' },
      { day: 'Dia 4', title: 'Buckingham & Parks', details: 'Palácio de Buckingham, Hyde Park e compras em Oxford Street.' }
    ],

    dayTrips: ['Castelo de Windsor (1h de trem)', 'Oxford ou Cambridge (1h de trem)'],
    gastronomy: ['Fish and Chips em pubs tradicionais', 'Chá da tarde elegante', 'Borough Market'],
    shopping: ['Oxford Street', 'Regent Street', 'Harrods'],
    nightlife: ['Musicais do West End', 'Pubs centenários'],

    costsTable: {
      economy: { daily: '£ 80 - £ 110', hotel: 'Hostel ou hotel Z Hotel (£ 70)', food: 'Pratos de supermercados e mercados (£ 25)', transport: 'Metrô Contactless' },
      comfort: { daily: '£ 180 - £ 280', hotel: 'Hotel 3-4 estrelas (£ 150)', food: 'Pubs e restaurantes casuais (£ 60)', transport: 'Metrô' },
      luxury: { daily: '£ 550+', hotel: 'Hotéis 5 estrelas (£ 400+)', food: 'Restaurantes premiados (£ 150+)', transport: 'Táxi preto / Uber' }
    },

    commonMistakes: ['Comprar bilhetes individuais em papel no metrô em vez de aproximar o cartão.'],
    importantTips: ['Fique à direita nas escadas rolantes do metrô para dar passagem.'],

    faqs: [
      { q: 'Brasileiros precisam de visto para Londres?', a: 'Precisa emitir a autorização ETA antes da viagem.' },
      { q: 'Qual a moeda de Londres?', a: 'Libra Esterlina (£).' },
      { q: 'Quantos dias ficar?', a: 'Entre 5 e 7 dias.' },
      { q: 'Os museus são gratuitos?', a: 'Sim! Museus como o British Museum e Natural History Museum têm entrada gratuita.' },
      { q: 'Como pagar o metrô?', a: 'Basta encostar seu cartão de débito por aproximação na catraca.' },
      { q: 'O que é o Daily Cap?', a: 'É o valor máximo cobrado no dia no metrô. Após atingi-lo, as demais viagens saem de graça.' },
      { q: 'Londres chove muito?', a: 'Chove com frequência mas em forma de garoa fina. Leve um guardas-chuva.' },
      { q: 'Onde se hospedar?', a: 'Covent Garden e Kensington são ótimas regiões.' },
      { q: 'Como ir de Heathrow ao centro?', a: 'A Elizabeth Line é rápida e confortável.' },
      { q: 'O seguro viagem é obrigatório?', a: 'Não é exigência oficial de imigração, mas é fundamental.' },
      { q: 'Vale a pena andar nos ônibus vermelhos?', a: 'Sim! Pegue a fila do segundo andar para passear pela cidade.' },
      { q: 'Precisa de dinheiro vivo?', a: 'Praticamente não. Londres é uma cidade quase 100% cashless.' },
      { q: 'Onde comer barato?', a: 'Borough Market e combos "Meal Deal" de supermercados como Boots e Tesco.' },
      { q: 'Qual o melhor parque?', a: 'Hyde Park e Regent\'s Park.' },
      { q: 'Como ver a troca da guarda?', a: 'No Palácio de Buckingham por volta das 11h em dias selecionados.' }
    ]
  },

  'como-planejar-viagem-roma': {
    slug: 'como-planejar-viagem-roma',
    city: 'Roma',
    country: 'Itália',
    emoji: '🇮🇹',
    currency: 'Euro (€)',
    language: 'Italiano',
    title: 'Roma: Guia completo',
    subtitle: 'Coliseu, Vaticano, hospedagem no Centro Storico, passagens de metrô e culinária romana.',
    category: 'Destinos',
    categoryLabel: 'Guia de destino',
    metaTitle: 'Roma: Guia completo',
    metaDescription: 'Guia completo para sua viagem a Roma. Descubra os segredos do Coliseu, Vaticano, bairros e transporte.',
    heroImage: '/images/destinations/roma/curated-hero.jpg',
            images: [],
    summaryText: 'Roma é um museu a céu aberto com milênios de história, fontes barrocas e gastronomia inigualável.',
    intro: 'Roma encanta por preservar ruínas romanas ao lado de praças barrocas animadas e trattorias acolhedoras.',
    whyVisit: 'Coliseu, Vaticano, Fontana di Trevi e as autênticas massas romanas (Carbonara, Cacio e Pepe). Reserve ingressos com hora marcada para evitar filas longas nos ícones principais.',
    whenToGo: 'Abril a maio e setembro a outubro oferecem clima ameno e menos calor extremo do que o verão romano.',
    idealDays: '4 a 5 dias para Coliseu, Vaticano e centro histórico sem correria.',
    chipFacts: {
      season: 'Abril–maio e set–out',
      days: '4 a 5 dias',
      transport: 'A pé no centro + metrô A/B'
    },
    howToGet: 'Aeroporto Fiumicino (FCO). O trem Leonardo Express leva 32 minutos até a estação Roma Termini.',
    documentation: 'Sem visto prévio para até 90 dias no Espaço Schengen. Seguro viagem com € 30.000 de cobertura é obrigatório.',
    insurance: 'Obrigatório no Espaço Schengen: cobertura médica mínima de € 30.000, contratada antes do embarque.',
    internet: 'Ative um eSIM antes de pousar ou compre SIM card italiano (TIM/Vodafone) na chegada.',
    currencyInfo: 'Euro (€). Cartões são amplamente aceitos; mantenha um pouco de dinheiro para cafés e gelaterias menores.',
    languageInfo: 'Italiano; inglês em zonas turísticas. Um “Buongiorno” ajuda no atendimento.',

    neighborhoods: [
      { name: 'Centro Storico', pros: 'Perto da Piazza Navona e Pantheon.', cons: 'Tarifas elevadas.' },
      { name: 'Trastevere', pros: 'Bairro boêmio, cheio de vida noturna e ótimas trattorias.', cons: 'Sem metrô direto.' },
      { name: 'Monti', pros: 'Coladinho no Coliseu, charmoso e jovem.', cons: 'Ladeiras e paralelepípedos.' }
    ],

    transportDetails: 'A pé no centro + metrô A/B. Roma é ideal para ser explorada caminhando; o metrô possui duas linhas principais (A e B) que se cruzam na estação Termini.',

    attractions: [
      {
        name: 'Coliseu & Fórum Romano',
        image: '/images/destinations/roma/curated-attraction-0.jpg',
        priority: 'Alta',
        desc: 'O anfiteatro romano lendário e o centro político da Roma antiga.',
        whyVisit: 'Uma viagem no tempo pela arquitetura do Império Romano.',
        recommendedTime: '3 horas',
        bestTime: 'Manhã bem cedo.',
        duration: '3 horas',
        transport: 'Metrô Linha B (Estação Colosseo)',
        price: '€ 18,00',
        reservation: 'Obrigatória antecipadamente online',
        tip2GO: 'Compre o ingresso combinado que inclui Coliseu, Fórum Romano e Palatino.'
      },
      {
        name: 'Vaticano & Capela Sistina',
        image: '/images/destinations/roma/curated-attraction-1.jpg',
        priority: 'Alta',
        desc: 'Museus do Vaticano, Capela Sistina e Praça de São Pedro.',
        whyVisit: 'Acervo renascentista e a cúpula de Michelangelo.',
        recommendedTime: '4 horas',
        bestTime: 'Primeiro horário da manhã.',
        duration: '4 horas',
        transport: 'Metrô Linha A (Ottaviano / Cipro)',
        price: 'A partir de € 20',
        reservation: 'Obrigatória online',
        tip2GO: 'Reserve o horário mais cedo e vá direto à Capela Sistina antes das multidões.'
      },
      {
        name: 'Fontana di Trevi',
        image: '/images/destinations/roma/curated-attraction-2.jpg',
        priority: 'Alta',
        desc: 'A fonte barroca mais famosa do mundo no Centro Storico.',
        whyVisit: 'Cartão postal romano — chegue cedo para ver sem filas densas.',
        recommendedTime: '45 minutos',
        bestTime: 'Antes das 8h ou após as 22h.',
        duration: '45 minutos',
        transport: 'A pé a partir da Fontana di Trevi / Barberini',
        price: 'Gratuito',
        reservation: 'Não é necessária',
        tip2GO: 'Combine com Pantheon e Piazza Navona no mesmo circuito a pé.'
      },
      {
        name: 'Pantheon',
        image: '/images/destinations/roma/curated-attraction-3.jpg',
        priority: 'Alta',
        desc: 'Templo romano com a maior cúpula de concreto não reforçado do mundo.',
        whyVisit: 'Arquitetura perfeita e óculus aberto ao céu.',
        recommendedTime: '1 hora',
        bestTime: 'Manhã.',
        duration: '1 hora',
        transport: 'A pé no Centro Storico',
        price: 'Ingresso com reserva online',
        reservation: 'Recomendada',
        tip2GO: 'Observe o óculus por alguns minutos — a luz muda o espaço o tempo todo.'
      },
      {
        name: 'Piazza Navona',
        image: '/images/destinations/roma/curated-attraction-4.jpg',
        priority: 'Média',
        desc: 'Praça barroca no formato do estádio de Domiziano, com a Fontana dei Quattro Fiumi.',
        whyVisit: 'Ambiente vibrante, cafés e arte de rua.',
        recommendedTime: '1 hora',
        bestTime: 'Final de tarde.',
        duration: '1 hora',
        transport: 'A pé no Centro Storico',
        price: 'Gratuito',
        reservation: 'Não é necessária',
        tip2GO: 'Sente-se num café lateral e observe a praça antes de seguir para Trastevere.'
      },
      {
        name: 'Trastevere',
        image: '/images/destinations/roma/curated-attraction-5.jpg',
        priority: 'Média',
        desc: 'Bairro boêmio do outro lado do Tibre, com vielas e trattorias.',
        whyVisit: 'Noite romana autêntica e Santa Maria in Trastevere.',
        recommendedTime: '2 a 3 horas',
        bestTime: 'Noite.',
        duration: '2,5 horas',
        transport: 'A pé pela Isola Tiberina ou bonde 8',
        price: 'Gratuito para circular',
        reservation: 'Jantar com reserva',
        tip2GO: 'Reserve trattoria com antecedência — as melhores lotam rápido.'
      }
    ],

    suggestedItinerary: [
      { day: 'Dia 1', title: 'Roma Antiga', details: 'Coliseu, Fórum Romano, Palatino e Piazza Venezia.' },
      { day: 'Dia 2', title: 'Vaticano', details: 'Museus do Vaticano, Capela Sistina e Praça de São Pedro.' },
      { day: 'Dia 3', title: 'Centro Storico', details: 'Fontana di Trevi, Pantheon, Piazza Navona e Piazza di Spagna.' },
      { day: 'Dia 4', title: 'Trastevere & Tibre', details: 'Manhã no Janículo e noite gastronômica em Trastevere.' }
    ],

    dayTrips: ['Florença (1h30 de trem frecciarossa)', 'Tivoli (1h de ônibus/trem)'],
    gastronomy: ['Pasta Carbonara autêntica', 'Cacio e Pepe', 'Gelato artesanal'],
    shopping: ['Via del Corso', 'Via Condotti'],
    nightlife: ['Bares na Piazza Trilussa em Trastevere'],

    costsTable: {
      economy: { daily: '€ 65 - € 95', hotel: 'Pensão ou hotel simples (€ 60)', food: 'Pizza ao corte e tratoria informal (€ 25)', transport: 'A pé / Metrô' },
      comfort: { daily: '€ 160 - € 240', hotel: 'Hotel 3-4 estrelas no centro (€ 130)', food: 'Trattorias e jantares completos (€ 60)', transport: 'Caminhada + metrô' },
      luxury: { daily: '€ 450+', hotel: 'Hotéis históricos 5 estrelas (€ 350+)', food: 'Restaurantes de luxo (€ 120+)', transport: 'Táxis' }
    },

    commonMistakes: ['Deixar para comprar ingressos do Vaticano e Coliseu na hora.'],
    importantTips: ['Beba água das fontes públicas "nasoni" espalhadas pela cidade (é fresca e potável).'],

    faqs: [
      { q: 'Precisa de visto para Roma?', a: 'Não para estadias de até 90 dias no Espaço Schengen.' },
      { q: 'O seguro viagem é obrigatório?', a: 'Sim, o seguro com cobertura mínima de € 30.000 é exigido.' },
      { q: 'Quantos dias em Roma?', a: 'Entre 4 e 5 dias.' },
      { q: 'Coliseu precisa agendar?', a: 'Sim, ingresso com hora marcada é obrigatório.' },
      { q: 'Como ir do aeroporto Fiumicino ao centro?', a: 'O trem Leonardo Express para Roma Termini é a melhor opção.' },
      { q: 'É fácil andar a pé em Roma?', a: 'Sim, as principais atrações ficam relativamente próximas.' },
      { q: 'Onde comer a melhor massa?', a: 'Em trattorias tradicionais em Trastevere e Testaccio.' },
      { q: 'A água da rua é potável?', a: 'Sim! As fontes "nasoni" fornecem água potável geladinha.' },
      { q: 'Como visitar o Vaticano?', a: 'Reserve o ingresso dos Museus do Vaticano e Capela Sistina online.' },
      { q: 'Qual a melhor época para visitar?', a: 'Primavera (abril-maio) e Outono (setembro-outubro).' },
      { q: 'Coperto é gorjeta?', a: 'Não, o "coperto" é a taxa de pão e serviço de mesa cobrada na conta.' },
      { q: 'Roma é segura?', a: 'Sim, mas fique atento a trombadinhas perto de atrações e metrô.' },
      { q: 'Qual passe de transporte usar?', a: 'Bilhetes individuais de € 1,50 ou passe de 24h/48h.' },
      { q: 'Onde fica a Fontana di Trevi?', a: 'No centro histórico. Chegue bem cedo para vê-la sem multidões.' },
      { q: 'Joguei uma moeda na fonte, o que significa?', a: 'Diz a tradição que garante seu retorno a Roma!' }
    ]
  },

  'como-planejar-viagem-istambul': {
    slug: 'como-planejar-viagem-istambul',
    city: 'Istambul',
    country: 'Turquia',
    emoji: '🇹🇷',
    currency: 'Lira Turca (₺)',
    language: 'Turco',
    title: 'Istambul: Guia completo',
    subtitle: 'Mesquitas seculares, travessia do Bósforo, cartão Istanbulkart e mercados tradicionais.',
    category: 'Destinos',
    categoryLabel: 'Guia de destino',
    metaTitle: 'Istambul: Guia completo',
    metaDescription: 'Guia completo para viajar a Istambul. Saiba sobre mesquitas, transporte Istanbulkart, passeios no Bósforo e mercados.',
    // Distinct from Hagia Sophia must-see pin.
    heroImage: '/images/destinations/istambul/curated-hero.jpg',
            images: [],
    summaryText: 'Istambul é a única metrópole do mundo situada entre dois continentes (Europa e Ásia).',
    intro: 'Istambul fascina pela fusão da arquitetura otomana e bizantina com uma cena cultural vibrante.',
    whyVisit: 'Hagia Sophia, Mesquita Azul, passeio de balsa pelo Bósforo e os aromas do Grande Bazar. A cidade recompensa quem cruza Europa e Ásia no mesmo dia.',
    whenToGo: 'Primavera (abril-maio) e outono (setembro-outubro) trazem temperaturas agradáveis e menos umidade.',
    idealDays: '4 a 5 dias para Sultanahmet, Bósforo e um dia no lado asiático.',
    chipFacts: {
      season: 'Primavera e outono',
      days: '4 a 5 dias',
      transport: 'Istanbulkart em metrô e balsas'
    },
    howToGet: 'Novo Aeroporto de Istambul (IST) ou Sabiha Gökçen (SAW). O ônibus Havaist conecta ao centro.',
    documentation: 'Brasileiros não precisam de visto para viagens a turismo de até 90 dias.',
    insurance: 'Recomendado contratar seguro viagem internacional com cobertura médica e extravio.',
    internet: 'Ative um eSIM antes de pousar ou compre SIM card da Turkcell na chegada.',
    currencyInfo: 'Lira Turca (₺). Cartões funcionam bem; leve um pouco de dinheiro para bazares e chá nas ruas.',
    languageInfo: 'Turco. O inglês é bem aceito em zonas turísticas e hotéis.',

    neighborhoods: [
      { name: 'Sultanahmet', pros: 'Perto da Hagia Sophia e Mesquita Azul.', cons: 'Turístico e quieto à noite.' },
      { name: 'Karaköy & Galata', pros: 'Moderno, jovem, ótimos cafés e perto da Torre de Galata.', cons: 'Ruas íngremes.' },
      { name: 'Kadıköy (Lado Asiático)', pros: 'Autêntico, gastronômico e mais barato.', cons: 'Exige travessia de balsa.' }
    ],

    transportDetails: 'Istanbulkart em metrô, bonde T1 e balsas. O cartão permite usar bondes elétricos, metrôs e balsas entre os continentes com uma única recarga.',

    attractions: [
      {
        name: 'Hagia Sophia',
        image: '/images/destinations/istambul/curated-attraction-0.jpg',
        priority: 'Alta',
        desc: 'Obra-prima arquitetônica construída como catedral no século VI e convertida em mesquita.',
        whyVisit: 'Cúpula monumental imensa e mosaicos históricos extraordinários.',
        recommendedTime: '2 horas',
        bestTime: 'Entre os horários de oração.',
        duration: '2 horas',
        transport: 'Bonde elétrico T1 (Estação Sultanahmet)',
        price: '€ 25,00 para visitantes estrangeiros',
        reservation: 'Ingresso no local',
        tip2GO: 'Mulheres devem cobrir os cabelos com lenço e todos devem tirar os sapatos para entrar.'
      },
      {
        name: 'Mesquita Azul',
        image: '/images/destinations/istambul/curated-attraction-1.jpg',
        priority: 'Alta',
        desc: 'Mesquita Sultan Ahmed com seis minaretes e azulejos de İznik.',
        whyVisit: 'Interior deslumbrante frente à Hagia Sophia.',
        recommendedTime: '1,5 hora',
        bestTime: 'Fora dos horários de oração.',
        duration: '1,5 hora',
        transport: 'Bonde T1 (Sultanahmet)',
        price: 'Gratuito',
        reservation: 'Não é necessária',
        tip2GO: 'Vista ombros e joelhos cobertos; lenços são emprestados na entrada.'
      },
      {
        name: 'Grande Bazar',
        image: '/images/destinations/istambul/curated-attraction-2.jpg',
        priority: 'Alta',
        desc: 'Um dos mercados cobertos mais antigos e extensos do mundo.',
        whyVisit: 'Labirinto de lojas de tapetes, cerâmica e especiarias.',
        recommendedTime: '2 horas',
        bestTime: 'Manhã em dia de semana.',
        duration: '2 horas',
        transport: 'Bonde T1 (Beyazıt) ou metrô Vezneciler',
        price: 'Gratuito para entrar',
        reservation: 'Não é necessária',
        tip2GO: 'Pechinche com bom humor — faz parte da experiência.'
      },
      {
        name: 'Torre de Galata & Karaköy',
        image: '/images/destinations/istambul/curated-attraction-3.jpg',
        priority: 'Média',
        desc: 'Torre medieval com vista do Chifre de Ouro e cafés em Karaköy.',
        whyVisit: 'Skyline clássico de Istambul e vida jovem do lado europeu.',
        recommendedTime: '2 horas',
        bestTime: 'Final de tarde.',
        duration: '2 horas',
        transport: 'Metrô / funicular Tünel ou caminhada por Karaköy',
        price: 'Mirante pago; entorno gratuito',
        reservation: 'Mirante online em alta temporada',
        tip2GO: 'Suba a torre e depois desça a pé até o porto de Karaköy.'
      },
      {
        name: 'Passeio de balsa no Bósforo',
        image: '/images/destinations/istambul/curated-attraction-4.jpg',
        priority: 'Alta',
        desc: 'Travessia pública entre Europa e Ásia com vista de palácios e mesquitas.',
        whyVisit: 'A forma mais bonita (e barata) de entender a geografia da cidade.',
        recommendedTime: '1,5 a 2 horas',
        bestTime: 'Pôr do sol.',
        duration: '2 horas',
        transport: 'Embarque em Eminönü ou Karaköy com Istanbulkart',
        price: 'Tarifa comum de balsa',
        reservation: 'Não é necessária',
        tip2GO: 'Pegue a balsa pública em vez do cruzeiro turístico caro.'
      },
      {
        name: 'Kadıköy (lado asiático)',
        image: '/images/destinations/istambul/curated-attraction-5.jpg',
        priority: 'Média',
        desc: 'Mercado gastronômico e rua Moda no lado asiático.',
        whyVisit: 'Istambul local, sem o preço de Sultanahmet.',
        recommendedTime: '3 horas',
        bestTime: 'Tarde e início da noite.',
        duration: '3 horas',
        transport: 'Balsa para Kadıköy',
        price: 'Tarifa de balsa',
        reservation: 'Não é necessária',
        tip2GO: 'Explore o mercado de rua e termine com chá à beira-mar em Moda.'
      }
    ],

    suggestedItinerary: [
      { day: 'Dia 1', title: 'Sultanahmet Histórico', details: 'Hagia Sophia, Mesquita Azul e Cisterna da Basílica.' },
      { day: 'Dia 2', title: 'Bazares & Bósforo', details: 'Grande Bazar, Bazar de Especiarias e balsa no Bósforo.' },
      { day: 'Dia 3', title: 'Galata & Karaköy', details: 'Torre de Galata, cafés em Karaköy e rooftops em Beyoğlu.' },
      { day: 'Dia 4', title: 'Lado Asiático', details: 'Dia em Kadıköy e Moda, voltando de balsa ao pôr do sol.' }
    ],

    dayTrips: ['Ilhas dos Príncipes (1h30 de balsa)', 'Capadócia (voo interno de 1h)'],
    gastronomy: ['Kebab tradicional', 'Baklava', 'Chá turco (Çay) e café turco'],
    shopping: ['Grande Bazar', 'Bazar de Especiarias'],
    nightlife: ['Bares de rooftop em Beyoğlu'],

    costsTable: {
      economy: { daily: '₺ 1.500 - 2.500', hotel: 'Hotel simples em Sultanahmet (₺ 1.200)', food: 'Street food e kebabs (₺ 500)', transport: 'Istanbulkart' },
      comfort: { daily: '₺ 4.000 - 7.000', hotel: 'Hotel 4 estrelas em Galata (₺ 3.500)', food: 'Restaurantes com vista (₺ 1.500)', transport: 'Bonde + balsa' },
      luxury: { daily: '₺ 15.000+', hotel: 'Hotéis 5 estrelas no Bósforo (₺ 12.000+)', food: 'Jantares sofisticados (₺ 3.000+)', transport: 'Carro privado' }
    },

    commonMistakes: ['Entrar nas mesquitas em horários de oração com roupas inadequadas.'],
    importantTips: ['Sempre use o cartão Istanbulkart para usar as balsas públicas.'],

    faqs: [
      { q: 'Brasileiros precisam de visto para a Turquia?', a: 'Não para estadias a turismo de até 90 dias.' },
      { q: 'Qual a melhor época para visitar Istambul?', a: 'Primavera e outono têm temperaturas perfeitas.' },
      { q: 'Quantos dias ficar?', a: 'De 4 a 5 dias.' },
      { q: 'Como ir do lado Europeu para o Asiático?', a: 'De balsa pública usando o cartão Istanbulkart (passeio lindo!).' },
      { q: 'Mulheres precisam usar véu na rua?', a: 'Não na rua, apenas ao entrar nas mesquitas.' },
      { q: 'O que vestir nas mesquitas?', a: 'Ombros e joelhos cobertos. Mulheres cobrem o cabelo com lenço.' },
      { q: 'Istambul é segura?', a: 'Sim, é muito acolhedora e segura para turistas.' },
      { q: 'Qual a moeda da Turquia?', a: 'Lira Turca (₺).' },
      { q: 'Vale a pena pechinchar no Grande Bazar?', a: 'Sim! Negociar preços faz parte da cultura do bazar.' },
      { q: 'Onde se hospedar?', a: 'Karaköy para jovens e Sultanahmet para quem quer foco histórico.' },
      { q: 'Como ir do aeroporto IST ao centro?', a: 'Os ônibus da Havaist são confortáveis e diretos.' },
      { q: 'Precisa dar gorjeta?', a: 'Gorjetas de 5% a 10% em restaurantes são apreciadas.' },
      { q: 'O café turco é diferente?', a: 'Sim, é forte, não filtrado e preparado em panela de cobre (Cezve).' },
      { q: 'Vale a pena fazer cruzeiro no Bósforo?', a: 'Imperdível! Pegue a balsa pública em Eminönü.' },
      { q: 'O seguro viagem é obrigatório?', a: 'Não é obrigatório por lei, mas é altamente recomendável.' }
    ]
  },

  'como-planejar-viagem-dubai': {
    slug: 'como-planejar-viagem-dubai',
    city: 'Dubai',
    country: 'Emirados Árabes Unidos',
    emoji: '🇦🇪',
    currency: 'Dirham (AED)',
    language: 'Árabe',
    title: 'Dubai: Guia completo',
    subtitle: 'Burj Khalifa, safari no deserto, cartão Nol Card, hotéis de luxo e passeios imperdíveis.',
    category: 'Destinos',
    categoryLabel: 'Guia de destino',
    metaTitle: 'Dubai: Guia completo',
    metaDescription: 'Guia completo para planejar sua viagem a Dubai. Saiba sobre visto gratuito, Burj Khalifa, praias e safari no deserto.',
    // Distinct from Burj Khalifa must-see pin.
    heroImage: '/images/destinations/dubai/curated-hero.jpg',
            images: [],
    summaryText: 'Dubai é o centro mundial da arquitetura futurista, compras de luxo e atrações audaciosas.',
    intro: 'Dubai impressiona com seus arranha-céus arrojados, ilhas artificiais e infraestrutura impecável no deserto.',
    whyVisit: 'Burj Khalifa (o prédio mais alto do mundo), Dubai Mall, safari nas dunas e praias de água morna. Combine Downtown, Marina e um dia de deserto sem perder o ritmo.',
    whenToGo: 'Novembro a Março (inverno local, com temperaturas ideais de 20°C a 28°C). Evite o verão (junho-agosto) devido ao calor extremo de 45°C.',
    idealDays: '4 a 6 dias para Downtown, Marina e um safari.',
    chipFacts: {
      season: 'Novembro a março',
      days: '4 a 6 dias',
      transport: 'Metrô + Nol Card'
    },
    howToGet: 'Aeroporto Internacional de Dubai (DXB). O metrô de Dubai conecta os terminais T1 e T3 diretamente a Downtown e Marina.',
    documentation: 'Brasileiros recebem visto gratuito de turismo no desembarque para estadias de até 90 dias.',
    insurance: 'Recomendado contratar seguro viagem internacional.',
    internet: 'eSIM ou SIM card gratuito concedido pela imigração na chegada.',
    currencyInfo: 'Dirham dos Emirados (AED). Cartões internacionais são aceitos em todo lugar; gorjetas em restaurantes ficam em torno de 10%.',
    languageInfo: 'Árabe é o idioma oficial, mas o inglês é a língua falada por 95% da população.',

    neighborhoods: [
      { name: 'Downtown Dubai', pros: 'Perto do Burj Khalifa e Dubai Mall.', cons: 'Hospedagem mais cara.' },
      { name: 'Dubai Marina & JBR', pros: 'Perto da praia, calçadão animado, ótima vida noturna.', cons: 'Distante do aeroporto.' },
      { name: 'Deira & Bur Dubai', pros: 'Histórico, mercados de ouro e especiarias, hotéis econômicos.', cons: 'Menos futurista.' }
    ],

    transportDetails: 'Metrô + Nol Card (Silver). O metrô de Dubai é futurista e climatizado; adquira o cartão nas estações para pagar a tarifa integrada.',

    attractions: [
      {
        name: 'Burj Khalifa',
        image: '/images/destinations/dubai/curated-attraction-0.jpg',
        priority: 'Alta',
        desc: 'O arranha-céu mais alto do planeta com 828 metros de altura e 163 andares.',
        whyVisit: 'Mirantes nos andares 124, 125 e 148 com vista deslumbrante de todo o deserto e oceano.',
        recommendedTime: '2 horas',
        bestTime: 'Fim de tarde (16h30 - 18h00).',
        duration: '2 horas',
        transport: 'Metrô Red Line (Estação Burj Khalifa / Dubai Mall)',
        price: 'A partir de AED 179',
        reservation: 'Obrigatória antecipadamente online',
        tip2GO: 'Combine a visita com o espetáculo gratuito das Fontes de Dubai no lago do Dubai Mall.'
      },
      {
        name: 'Fontes de Dubai & Dubai Mall',
        image: '/images/destinations/dubai/curated-attraction-1.jpg',
        priority: 'Alta',
        desc: 'Espetáculo de água, luz e música aos pés do Burj Khalifa.',
        whyVisit: 'Show gratuito e o shopping com aquário e vista do lago.',
        recommendedTime: '2 a 3 horas',
        bestTime: 'Após o pôr do sol.',
        duration: '2,5 horas',
        transport: 'Metrô Burj Khalifa / Dubai Mall',
        price: 'Show gratuito',
        reservation: 'Não é necessária',
        tip2GO: 'Chegue 20 minutos antes e fique na margem sul do lago para o melhor ângulo.'
      },
      {
        name: 'Dubai Marina & JBR',
        image: '/images/destinations/dubai/curated-attraction-2.jpg',
        priority: 'Alta',
        desc: 'Canal com iates, calçadão e a praia de Jumeirah Beach Residence.',
        whyVisit: 'Passeio à beira-mar e skyline iluminada à noite.',
        recommendedTime: '3 horas',
        bestTime: 'Final de tarde e noite.',
        duration: '3 horas',
        transport: 'Metrô DMCC / JLT + trânsito curto',
        price: 'Gratuito para circular',
        reservation: 'Não é necessária',
        tip2GO: 'Faça o The Walk em JBR e termine com um abra no Marina Walk.'
      },
      {
        name: 'Burj Al Arab & Jumeirah',
        image: '/images/destinations/dubai/curated-attraction-3.jpg',
        imagePosition: '50% 20%',
        priority: 'Média',
        desc: 'O hotel em forma de vela e a praia de Jumeirah.',
        whyVisit: 'Cartão postal de Dubai — fotos a partir da praia pública ao lado.',
        recommendedTime: '1,5 hora',
        bestTime: 'Pôr do sol.',
        duration: '1,5 hora',
        transport: 'Táxi / Uber até Madinat Jumeirah ou praia de Umm Suqeim',
        price: 'Exterior gratuito',
        reservation: 'Afternoon tea no hotel é caro e exige dress code',
        tip2GO: 'Fotografe da praia pública — não é preciso entrar no hotel.'
      },
      {
        name: 'Safari no deserto',
        image: '/images/destinations/dubai/curated-attraction-4.jpg',
        priority: 'Alta',
        desc: 'Dune bashing, pôr do sol nas dunas e jantar beduíno.',
        whyVisit: 'Contraste perfeito com o skyline futurista.',
        recommendedTime: '6 horas (meio período)',
        bestTime: 'Saídas no fim da tarde.',
        duration: '6 horas',
        transport: 'Transfer do hotel incluso nos pacotes',
        price: 'A partir de AED 200',
        reservation: 'Obrigatória',
        tip2GO: 'Escolha operador com seguro e evite os pacotes ultra-baratos sem reviews.'
      },
      {
        name: 'Dubai Creek (Old Dubai)',
        image: '/images/destinations/dubai/curated-attraction-5.jpg',
        priority: 'Média',
        desc: 'Creek histórico com abras, souks de ouro e especiarias.',
        whyVisit: 'O Dubai anterior aos arranha-céus.',
        recommendedTime: '2 a 3 horas',
        bestTime: 'Final de tarde.',
        duration: '2,5 horas',
        transport: 'Metrô Al Ghubaiba / Al Ras',
        price: 'Abra barato; souks gratuitos',
        reservation: 'Não é necessária',
        tip2GO: 'Cruze o Creek de abra e explore o Spice Souk a pé.'
      }
    ],

    suggestedItinerary: [
      { day: 'Dia 1', title: 'Downtown Futurista', details: 'Dubai Mall, mirante do Burj Khalifa e show das fontes dançantes.' },
      { day: 'Dia 2', title: 'Marina & JBR', details: 'Dubai Marina Walk, praia de JBR e pôr do sol na orla.' },
      { day: 'Dia 3', title: 'Deserto', details: 'Safari com dune bashing e jantar beduíno ao pôr do sol.' },
      { day: 'Dia 4', title: 'Old Dubai & Jumeirah', details: 'Dubai Creek de manhã e fotos do Burj Al Arab à tarde.' }
    ],

    dayTrips: ['Abu Dhabi (1h30 de carro / ônibus para ver a Grande Mesquita Sheikh Zayed)'],
    gastronomy: ['Culinária libanesa e emiratense', 'Restaurantes gastronômicos internacionais'],
    shopping: ['Dubai Mall', 'Mall of the Emirates'],
    nightlife: ['Beach clubs em Palm Jumeirah', 'Rooftops em Dubai Marina'],

    costsTable: {
      economy: { daily: 'AED 350 - 500', hotel: 'Hotel em Deira ou Barsha (AED 250)', food: 'Alimentação casual em praças (AED 80)', transport: 'Metrô Nol Card' },
      comfort: { daily: 'AED 800 - 1.400', hotel: 'Hotel 4 estrelas em Marina/Downtown (AED 700)', food: 'Restaurantes charmosos (AED 250)', transport: 'Metrô + Uber' },
      luxury: { daily: 'AED 3.000+', hotel: 'Hotéis 5 estrelas / Resort na Palm (AED 2.500+)', food: 'Jantares de alta gastronomia (AED 800+)', transport: 'Carro privado' }
    },

    commonMistakes: ['Viajar no verão (julho/agosto) sem saber do calor extremo de 45°C.'],
    importantTips: ['Respeite os costumes locais ao visitar prédios governamentais.'],

    faqs: [
      { q: 'Brasileiros precisam de visto para Dubai?', a: 'Não! O visto de até 90 dias é gratuito na chegada ao aeroporto.' },
      { q: 'Qual a melhor época para ir a Dubai?', a: 'De novembro a março, quando o clima está agradável.' },
      { q: 'É muito quente em Dubai?', a: 'No verão (junho a setembro) passa dos 40°C. No inverno é bem agradável (25°C).' },
      { q: 'Quantos dias ficar?', a: 'De 4 a 6 dias.' },
      { q: 'Mulheres precisam cobrir a cabeça?', a: 'Não nas ruas ou hotéis, apenas se visitarem mesquitas.' },
      { q: 'É permitido beber álcool em Dubai?', a: 'Sim, em bares, restaurantes e clubes de hotéis licenciados.' },
      { q: 'Como se locomover?', a: 'De metrô (com o cartão Nol Card) ou usando táxis/Careem/Uber.' },
      { q: 'Burj Khalifa precisa agendar?', a: 'Sim, ingressos na hora são muito mais caros e esgotam rápido.' },
      { q: 'Qual a moeda de Dubai?', a: 'Dirham dos Emirados (AED).' },
      { q: 'Dubai é uma cidade cara?', a: 'Tem fama de luxo, mas há opções econômicas de hospedagem em Deira e transporte barato.' },
      { q: 'Vale a pena ir a Abu Dhabi?', a: 'Com certeza! Fica a 1h30 e tem a incrível Mesquita Sheikh Zayed.' },
      { q: 'O seguro viagem é obrigatório?', a: 'Recomendadíssimo para cobrir eventuais despesas médicas.' },
      { q: 'O que vestir na praia?', a: 'Trajes de banho normais são aceitos nas praias públicas e beach clubs.' },
      { q: 'Dão chip grátis na imigração?', a: 'Sim, os agentes costumam entregar um SIM card da du com dados de boas-vindas.' },
      { q: 'Como é o Safari no Deserto?', a: 'É um passeio imperdível com dunas 4x4, jantar beduíno e pôr do sol.' }
    ]
  }
};

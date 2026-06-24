// 2GO Travel Programmatic Content Scale Generator
// Generates structured destinations, cost guides, FAQs, and itineraries in bulk for SEO scaling.

export function generateDestination(city, country, category = 'Culture') {
  const slug = city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '-');
  
  const emojis = {
    França: '🇫🇷', Itália: '🇮🇹', Portugal: '🇵🇹', Japão: '🇯🇵', Grécia: '🇬🇷', 
    Espanha: '🇪🇸', Alemanha: '🇩🇪', Brasil: '🇧🇷', Noruega: '🇳🇴', Turquia: '🇹🇷'
  };

  const emoji = emojis[country] || '✈️';

  return {
    slug,
    name: city,
    country,
    emoji,
    category,
    rating: (4.5 + Math.random() * 0.5).toFixed(1),
    image: `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80`,
    desc: `${city} é um destino fascinante e repleto de atrações marcantes em ${country}. Planeje sua estadia ideal.`,
    currency: 'EUR',
    exchangeRate: 'R$ 6,10',
    climate: {
      bestMonths: 'Maio a Setembro',
      rainySeason: 'Novembro a Fevereiro',
      tempSummer: '26°C',
      tempWinter: '8°C'
    },
    costs: {
      budget: { hotel: 'R$ 350', food: 'R$ 120', transport: 'R$ 40' },
      comfort: { hotel: 'R$ 750', food: 'R$ 220', transport: 'R$ 90' },
      luxury: { hotel: 'R$ 1.900', food: 'R$ 550', transport: 'R$ 350' }
    },
    attractions: [
      { title: `Centro Histórico de ${city}`, desc: 'Caminhe pelas ruas medievais e absorva a arquitetura de época.', hours: '09:00 - 18:00', rating: '4.8★' },
      { title: `Mirante Panorâmico Central`, desc: 'A melhor vista panorâmica da cidade para fotografias ao entardecer.', hours: '08:00 - 20:00', rating: '4.7★' }
    ],
    faqs: [
      { q: `Qual a melhor época para ir a ${city}?`, a: `A melhor época é de maio a setembro, quando as temperaturas estão agradáveis e há menor índice de chuvas.` },
      { q: `Quantos dias ficar em ${city}?`, a: `Recomendamos ficar pelo menos de 3 a 5 dias para absorver os principais marcos históricos sem pressa.` }
    ]
  };
}

export function generateItinerary(city, duration, profile = 'Classic') {
  const destSlug = city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '-');
  
  const days = Array.from({ length: duration }, (_, i) => {
    const dNum = i + 1;
    return {
      day: `Dia ${dNum}`,
      title: `Marcos e Atrações - Dia ${dNum}`,
      events: [
        { time: '09:00', title: `Exploração Histórica - ${city}`, desc: 'Inicie cedo para aproveitar as belezas arquitetônicas.' },
        { time: '13:00', title: 'Almoço Gastronômico Recomendado', desc: 'Experimente a culinária autêntica do destino.' },
        { time: '15:30', title: 'Visita Cultural a Museu ou Galeria', desc: 'Mergulhe no acervo cultural e histórico do local.' },
        { time: '20:00', title: 'Jantar Romântico e Passeio Noturno', desc: 'Aproveite a atmosfera iluminada ao fim do dia.' }
      ]
    };
  });

  return {
    slug: `${destSlug}-${duration}-dias`,
    title: `Roteiro Completo de ${duration} Dias em ${city}`,
    desc: `O planejamento perfeito e inteligente para você aproveitar o melhor de ${city} no estilo ${profile}.`,
    duration,
    destinationSlug: destSlug,
    days
  };
}

export function bulkGenerateData(citiesList) {
  const db = { destinations: [], itineraries: [] };
  
  citiesList.forEach(({ city, country, category, durations }) => {
    // Generate destination
    const dest = generateDestination(city, country, category);
    db.destinations.push(dest);

    // Generate multiple duration itineraries
    durations.forEach(dur => {
      const itin = generateItinerary(city, dur);
      db.itineraries.push(itin);
    });
  });

  return db;
}

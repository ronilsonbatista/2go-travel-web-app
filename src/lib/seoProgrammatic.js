import { getDestinationBySlug, getItinerariesForDestination } from './cms';

// Maps programmatic patterns to structured metadata and search intent filters
export async function resolveProgrammaticItinerary(slug) {
  if (!slug) return null;

  // Patterns expected: [destinationSlug]-(3|5|7)-dias OR [destinationSlug]-(casal|familia|luxo)
  const parts = slug.split('-');
  if (parts.length < 2) return null;

  // The last part or last two parts indicate the variation
  // e.g. "paris-casal" -> dest = "paris", style = "casal"
  // e.g. "paris-3-dias" -> dest = "paris", duration = 3
  let destinationSlug = '';
  let duration = null;
  let style = null; // 'casal' | 'familia' | 'luxo'

  if (parts[parts.length - 1] === 'dias' && !isNaN(parts[parts.length - 2])) {
    duration = parseInt(parts[parts.length - 2], 10);
    destinationSlug = parts.slice(0, parts.length - 2).join('-');
  } else {
    const lastPart = parts[parts.length - 1];
    if (['casal', 'familia', 'luxo'].includes(lastPart)) {
      style = lastPart;
      destinationSlug = parts.slice(0, parts.length - 1).join('-');
    } else {
      // Fallback
      destinationSlug = parts.join('-');
    }
  }

  const destination = await getDestinationBySlug(destinationSlug);
  if (!destination) return null;

  // Fetch base itineraries for this destination
  const itineraries = await getItinerariesForDestination(destinationSlug);
  
  // Try to find the closest match or use fallback
  let selectedItinerary = itineraries[0];
  if (duration) {
    selectedItinerary = itineraries.find(it => it.duration === duration) || itineraries[0];
  } else if (style) {
    // If style is casal, look for itineraries containing casal/romantico or default to 5 days
    if (style === 'casal') {
      selectedItinerary = itineraries.find(it => it.slug.includes('casal') || it.slug.includes('romantico') || it.duration === 5) || itineraries[0];
    } else if (style === 'luxo') {
      selectedItinerary = itineraries.find(it => it.slug.includes('luxo') || it.duration === 7) || itineraries[0];
    } else if (style === 'familia') {
      selectedItinerary = itineraries.find(it => it.slug.includes('familia') || it.duration === 5 || it.duration === 7) || itineraries[0];
    }
  }

  if (!selectedItinerary) return null;

  // Generate dynamic, intent-optimized search title and descriptions
  let seoTitle = '';
  let seoDescription = '';
  let heading = '';
  let introduction = '';

  if (duration) {
    seoTitle = `Roteiro Completo de ${duration} Dias em ${destination.name} | Planejamento Diário | 2GO Travel`;
    seoDescription = `Confira a programação dia a dia para uma viagem de ${duration} dias em ${destination.name} (${destination.country}). Atrações imperdíveis, custos e deslocamentos sugeridos.`;
    heading = `Roteiro de ${duration} Dias em ${destination.name}`;
    introduction = `Este é o planejamento inteligente ideal para otimizar sua visita de ${duration} dias a ${destination.name}. Mapeamos as melhores atrações próximas para reduzir tempo de deslocamento.`;
  } else if (style) {
    const styleLabels = {
      casal: 'Romântico (Casais)',
      familia: 'em Família (Crianças & Lazer)',
      luxo: 'de Luxo (Alta Gastronomia & Conforto)'
    };
    seoTitle = `Roteiro ${styleLabels[style] || style} em ${destination.name} | Rota Inteligente | 2GO Travel`;
    seoDescription = `Dicas de viagem e roteiro sob medida com estilo ${styleLabels[style] || style} em ${destination.name}. Conheça restaurantes recomendados, atrações e hotéis parceiros.`;
    heading = `Roteiro ${styleLabels[style] || style} em ${destination.name}`;
    introduction = `Preparamos um guia focado no estilo ${styleLabels[style] || style} para sua estadia em ${destination.name}. A curadoria inclui atrações ideais e recomendações de alto padrão.`;
  } else {
    seoTitle = `Roteiro Especial de Viagem para ${destination.name} | 2GO Travel`;
    seoDescription = `Confira nosso planejamento diário e dicas locais para viajar para ${destination.name}.`;
    heading = `Guia Especial de Rota para ${destination.name}`;
    introduction = `Aproveite esta curadoria inteligente contendo a melhor rota e roteiros estruturados para ${destination.name}.`;
  }

  // Clone itinerary and inject custom programmatic values
  return {
    ...selectedItinerary,
    title: heading,
    desc: introduction,
    seoTitle,
    seoDescription,
    destination,
    programmaticStyle: style,
    programmaticDuration: duration
  };
}

// Pre-generated variants for SSG
export function getProgrammaticStaticPaths() {
  const commonDestinations = ['paris', 'roma', 'lisboa', 'londres', 'toquio'];
  const variants = [];
  
  commonDestinations.forEach(dest => {
    variants.push(`${dest}-3-dias`);
    variants.push(`${dest}-5-dias`);
    variants.push(`${dest}-7-dias`);
    variants.push(`${dest}-casal`);
    variants.push(`${dest}-familia`);
    variants.push(`${dest}-luxo`);
  });

  return variants.map(slug => ({ slug }));
}

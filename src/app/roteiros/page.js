import React from 'react';
import { getItineraries, getDestinations } from '@/lib/cms';
import RoteirosClient from '@/components/RoteirosClient';

export const metadata = {
  title: 'Roteiros de Viagem Personalizados e Otimizados | 2GO Roteiros',
  description: 'Veja exemplos de roteiros no site. Timeline, mapa e ajustes ficam no aplicativo 2GO.',
  openGraph: {
    title: 'Roteiros de Viagem Personalizados e Otimizados | 2GO Roteiros',
    description: 'Veja exemplos de roteiros no site. Timeline, mapa e ajustes ficam no aplicativo 2GO.',
    type: 'website',
  }
};

export default async function RoteirosPage({ searchParams }) {
  const resolvedSearch = await searchParams;
  const rawSearch = resolvedSearch?.search;
  const initialSearch = Array.isArray(rawSearch) ? rawSearch[0] || '' : rawSearch || '';
  const [itineraries, destinations] = await Promise.all([
    getItineraries(),
    getDestinations()
  ]);

  // Map destination details (image, country) onto itineraries for rich UI display
  const richItineraries = itineraries.map(itinerary => {
    const destination = destinations.find(d => d.slug === itinerary.destinationSlug);
    return {
      ...itinerary,
      destinationName: destination ? destination.name : '',
      destinationCountry: destination ? destination.country : '',
      destinationImage: destination ? destination.image : '',
      destinationEmoji: destination ? destination.emoji : '',
      destinationCurrency: destination ? destination.currency : 'EUR',
      destinationSlug: destination ? destination.slug : (itinerary.destinationSlug || '')
    };
  });

  return (
    <RoteirosClient itineraries={richItineraries} initialSearch={initialSearch} />
  );
}

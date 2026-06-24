import React from 'react';
import { getItineraries, getDestinations } from '@/lib/cms';
import RoteirosClient from '@/components/RoteirosClient';

export const metadata = {
  title: 'Roteiros de Viagem Personalizados e Otimizados | 2GO Travel',
  description: 'Explore nossos roteiros de viagem prontos e detalhados para Paris, Roma, Lisboa, Londres e Tóquio. Economize tempo com planejamentos completos.',
  openGraph: {
    title: 'Roteiros de Viagem Personalizados e Otimizados | 2GO Travel',
    description: 'Explore nossos roteiros de viagem prontos e detalhados para Paris, Roma, Lisboa, Londres e Tóquio. Economize tempo com planejamentos completos.',
    type: 'website',
  }
};

export default async function RoteirosPage() {
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
      destinationEmoji: destination ? destination.emoji : ''
    };
  });

  return (
    <RoteirosClient itineraries={richItineraries} />
  );
}

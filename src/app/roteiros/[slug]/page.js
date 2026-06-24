import React from 'react';
import { notFound } from 'next/navigation';
import { getItineraryBySlug, getItineraries, getDestinationBySlug } from '@/lib/cms';
import ItineraryClient from '@/components/ItineraryClient';

// 1. Dynamic metadata generation for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const itinerary = await getItineraryBySlug(slug);
  if (!itinerary) {
    return {
      title: 'Roteiro Não Encontrado | 2GO Travel',
      description: 'O roteiro de viagem solicitado não está disponível.'
    };
  }

  const destination = await getDestinationBySlug(itinerary.destinationSlug);
  const destName = destination ? destination.name : '';

  const title = `${itinerary.title} | Roteiro de ${itinerary.duration} Dias | 2GO Travel`;
  const description = `${itinerary.desc} Confira a programação dia a dia completa para aproveitar o melhor de ${destName}.`;

  const ogImage = destination ? destination.image : '';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 800,
          height: 600,
          alt: itinerary.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
    }
  };
}

// 2. SSG: generate static parameters for all itineraries at build time
export async function generateStaticParams() {
  const itineraries = await getItineraries();
  return itineraries.map(it => ({
    slug: it.slug
  }));
}

// 3. Server Component Page entry
export default async function ItineraryPage({ params }) {
  const { slug } = await params;
  const itinerary = await getItineraryBySlug(slug);
  if (!itinerary) {
    notFound();
  }

  const destination = await getDestinationBySlug(itinerary.destinationSlug);

  return (
    <ItineraryClient 
      itinerary={itinerary} 
      destination={destination} 
    />
  );
}

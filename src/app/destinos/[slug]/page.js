import React from 'react';
import { notFound } from 'next/navigation';
import { getDestinationBySlug, getDestinations, getItinerariesForDestination } from '@/lib/cms';
import DestinationClient from '@/components/DestinationClient';
import { getInternationalSEO } from '@/lib/seoInternational';
import { translateDestination, translateItinerary } from '@/lib/i18n';

// 1. Dynamic metadata generation for International SEO
export async function generateMetadata({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const locale = resolvedSearchParams?.locale || 'pt';

  let dest = await getDestinationBySlug(slug);
  if (!dest) {
    return {
      title: 'Destino Não Encontrado | 2GO Travel',
      description: 'O destino solicitado não está disponível em nossa base de guias.'
    };
  }

  // Localize metadata fields
  dest = translateDestination(dest, locale);

  let title = `${dest.name} | Guia de Viagem Completo e Roteiros | 2GO Travel`;
  let description = `Planeje sua viagem para ${dest.name} (${dest.country}). Saiba o que fazer, quanto custa viajar, melhor época e veja roteiros de ${dest.name} prontos.`;

  if (locale === 'en') {
    title = `${dest.name} Travel Guide & Complete Itineraries | 2GO Travel`;
    description = `Plan your trip to ${dest.name} (${dest.country}). Find things to do, costs, best time to visit, and read custom itineraries.`;
  } else if (locale === 'es') {
    title = `Guía de Viaje de ${dest.name} y Itinerarios Completos | 2GO Travel`;
    description = `Planea tu viaje a ${dest.name} (${dest.country}). Qué hacer, presupuestos de viaje, mejor época y itinerarios recomendados.`;
  }

  return {
    title,
    description,
    alternates: getInternationalSEO('destinos', slug),
    openGraph: {
      title,
      description,
      images: [
        {
          url: dest.image,
          width: 800,
          height: 600,
          alt: dest.name
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [dest.image]
    }
  };
}

// 2. SSG: static paths pre-generation during build time
export async function generateStaticParams() {
  const destinations = await getDestinations();
  return destinations.map(dest => ({
    slug: dest.slug
  }));
}

// 3. Server Component Page entry (localized data parsing)
export default async function DestinationPage({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const locale = resolvedSearchParams?.locale || 'pt';

  let [destination, itineraries] = await Promise.all([
    getDestinationBySlug(slug),
    getItinerariesForDestination(slug)
  ]);

  if (!destination) {
    notFound();
  }

  // Dynamic server-side translations
  destination = translateDestination(destination, locale);
  itineraries = itineraries.map(it => translateItinerary(it, locale));

  return (
    <DestinationClient 
      destination={destination} 
      itineraries={itineraries} 
      locale={locale}
    />
  );
}

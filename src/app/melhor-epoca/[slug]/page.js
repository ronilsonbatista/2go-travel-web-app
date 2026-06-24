import React from 'react';
import { notFound } from 'next/navigation';
import { getDestinationBySlug, getDestinations } from '@/lib/cms';
import BestTimeClient from '@/components/BestTimeClient';

// 1. Dynamic Metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dest = await getDestinationBySlug(slug);
  
  if (!dest) {
    return {
      title: 'Melhor Época Para Viajar | Clima e Estações | 2GO Travel',
      description: 'Descubra a melhor época para visitar seus destinos favoritos.'
    };
  }

  const title = `Melhor Época para Viajar para ${dest.name} | Clima por Mês | 2GO Travel`;
  const description = `Planeje sua viagem para ${dest.name} (${dest.country}). Saiba a melhor temporada, temperaturas médias por mês, épocas de chuvas e dicas locais.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: dest.image,
          width: 800,
          height: 600,
          alt: `Clima e melhor época para visitar ${dest.name}`
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

// 2. SSG: generate static parameters for all destinations
export async function generateStaticParams() {
  const destinations = await getDestinations();
  return destinations.map(dest => ({
    slug: dest.slug
  }));
}

// 3. Server Page entry
export default async function BestTimePage({ params }) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  return (
    <BestTimeClient destination={destination} />
  );
}

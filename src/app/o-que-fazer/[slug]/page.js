import React from 'react';
import { notFound } from 'next/navigation';
import { getDestinationBySlug, getDestinations } from '@/lib/cms';
import WhatToDoClient from '@/components/WhatToDoClient';

// 1. Dynamic Metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dest = await getDestinationBySlug(slug);
  
  if (!dest) {
    return {
      title: 'O Que Fazer | Guia de Atrações | 2GO Travel',
      description: 'Descubra os melhores pontos turísticos e atividades para suas próximas viagens.'
    };
  }

  const title = `O Que Fazer em ${dest.name} | Atrações e Guia Local | 2GO Travel`;
  const description = `Descubra as principais atrações turísticas, locais históricos, atividades e o que fazer em ${dest.name} (${dest.country}). Planeje seus passeios.`;

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
          alt: `Guia de o que fazer em ${dest.name}`
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
export default async function WhatToDoPage({ params }) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  return (
    <WhatToDoClient destination={destination} />
  );
}

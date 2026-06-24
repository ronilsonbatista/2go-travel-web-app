import React from 'react';
import { notFound } from 'next/navigation';
import { getDestinationBySlug, getDestinations } from '@/lib/cms';
import PlannerClient from '@/components/PlannerClient';

// 1. Dynamic Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dest = await getDestinationBySlug(slug);
  if (!dest) {
    return {
      title: 'Planejador de Roteiros | 2GO Travel',
      description: 'Crie seu roteiro de viagem personalizado.'
    };
  }

  const title = `Montar Roteiro Personalizado para ${dest.name} | 2GO Travel`;
  const description = `Planeje sua viagem para ${dest.name} em segundos. Defina seu estilo de viagem, duração e orçamento e gere o roteiro ideal para ${dest.name}.`;

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
          alt: `Planejar viagem para ${dest.name}`
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

// 2. SSG static params pre-generation during build time
export async function generateStaticParams() {
  const destinations = await getDestinations();
  return destinations.map(dest => ({
    slug: dest.slug
  }));
}

// 3. Server Component Page entry
export default async function PreloadedPlannerPage({ params }) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  return (
    <PlannerClient 
      preselectedDestinationSlug={slug}
    />
  );
}

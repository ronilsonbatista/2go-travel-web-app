import React from 'react';
import { notFound } from 'next/navigation';
import { resolveProgrammaticItinerary, getProgrammaticStaticPaths } from '@/lib/seoProgrammatic';
import ItineraryClient from '@/components/ItineraryClient';

// 1. Dynamic metadata generation for Programmatic SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await resolveProgrammaticItinerary(slug);
  
  if (!data) {
    return {
      title: 'Roteiro de Viagem Personalizado | 2GO Travel',
      description: 'Planeje sua rota e explore destinos do mundo com nosso gerador inteligente.'
    };
  }

  return {
    title: data.seoTitle,
    description: data.seoDescription,
    openGraph: {
      title: data.seoTitle,
      description: data.seoDescription,
      images: [
        {
          url: data.destination?.image || '',
          width: 800,
          height: 600,
          alt: data.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: data.seoTitle,
      description: data.seoDescription,
      images: [data.destination?.image || '']
    }
  };
}

// 2. SSG: static paths pre-generation during build time
export async function generateStaticParams() {
  return getProgrammaticStaticPaths();
}

// 3. Server Component entry
export default async function ProgrammaticItineraryPage({ params }) {
  const { slug } = await params;
  const data = await resolveProgrammaticItinerary(slug);

  if (!data) {
    notFound();
  }

  return (
    <ItineraryClient 
      itinerary={data} 
      destination={data.destination} 
    />
  );
}

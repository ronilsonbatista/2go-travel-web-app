import React from 'react';
import { notFound } from 'next/navigation';
import { getDestinationBySlug, getDestinations } from '@/lib/cms';
import CostClient from '@/components/CostClient';

// 1. Dynamic Metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const dest = await getDestinationBySlug(slug);
  if (!dest) {
    return {
      title: 'Custos Não Encontrados | 2GO Travel',
      description: 'O destino solicitado não está disponível em nossa base de custos.'
    };
  }

  const title = `Quanto Custa Viajar para ${dest.name} | Tabela de Gastos | 2GO Travel`;
  const description = `Calcule o orçamento diário da sua viagem para ${dest.name}. Preços médios de hotéis, alimentação, passeios e transportes para mochileiros, conforto ou luxo.`;

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
          alt: `Orçamento para viajar para ${dest.name}`
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
export default async function CostPage({ params }) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);

  if (!destination) {
    notFound();
  }

  return (
    <CostClient 
      destination={destination}
    />
  );
}

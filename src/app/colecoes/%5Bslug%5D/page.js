"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Landmark, MapPin, Sparkles, ChevronRight, Clock, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppDownloadModal from '@/components/AppDownloadModal';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getDestinationBySlug } from '@/lib/cms';
import { trackPageView } from '@/lib/analytics';

const mockCollections = {
  romantica: {
    title: 'Viagens Românticas para Casais',
    desc: 'Selecionamos os destinos mais charmosos do mundo com foco em jantares intimistas, vistas espetaculares e momentos inesquecíveis a dois.',
    emoji: '💕',
    destinationsSlugs: ['santorini', 'paris', 'capadocia']
  },
  gastronomica: {
    title: 'Viagens Gastronômicas Singulares',
    desc: 'Recomendado para amantes do bom comer e beber. Roteiros desenhados ao redor de pratos clássicos, bistrôs autorais e tours de vinhos.',
    emoji: '🍷',
    destinationsSlugs: ['roma', 'paris', 'toquio']
  },
  familia: {
    title: 'Viagens em Família Inesquecíveis',
    desc: 'Encontre destinos com infraestrutura confortável, passeios divertidos para crianças e belezas naturais para relaxar com quem você ama.',
    emoji: '👨‍👩‍👧‍👦',
    destinationsSlugs: ['noruega', 'gramado', 'fernando-de-noronha']
  }
};

export default function ColecaoDetail({ params }) {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [collection, setCollection] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [slugStr, setSlugStr] = useState('');

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      const slug = resolved.slug || 'romantica';
      setSlugStr(slug);
      
      const foundCol = mockCollections[slug.toLowerCase()] || mockCollections.romantica;
      setCollection(foundCol);
      trackPageView('collection_detail', slug);

      // Load destination details from CMS
      const results = await Promise.all(
        foundCol.destinationsSlugs.map(s => getDestinationBySlug(s))
      );
      setDestinations(results.filter(Boolean));
    };
    resolveParams();
  }, [params]);

  if (!collection) return null;

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-5xl text-left">
          
          <Breadcrumbs items={[
            { name: 'Coleções', url: '/colecoes' },
            { name: collection.title, url: `/colecoes/${slugStr}` }
          ]} />

          {/* Back button */}
          <div className="my-4">
            <Link 
              href="/colecoes"
              className="text-xs font-semibold text-text-muted hover:text-brand-navy transition-colors inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar para Coleções
            </Link>
          </div>

          {/* Header */}
          <header className="my-8">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3.5 py-1.5 rounded-full w-fit">
              COLEÇÃO ESPECIAL {collection.emoji}
            </span>
            <h1 className="font-headers text-3.5xl sm:text-5xl font-extrabold text-brand-navy mt-4 mb-4 tracking-tight leading-tight">
              {collection.title}
            </h1>
            <p className="text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
              {collection.desc}
            </p>
          </header>

          {/* Destinos list in Collection */}
          <div className="flex flex-col gap-6 mt-8">
            {destinations.map((dest) => (
              <div 
                key={dest.slug}
                className="group bg-white border border-border-gray p-6 rounded-[28px] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row items-center gap-6 text-left"
              >
                {/* Visual Image */}
                <div className="h-44 w-full md:w-64 shrink-0 rounded-2xl overflow-hidden bg-bg-light relative">
                  <img 
                    src={dest.image} 
                    alt={dest.name} 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <span className="absolute bottom-3 left-3 bg-brand-navy/60 backdrop-blur-xs text-white text-[10px] font-extrabold px-3 py-1 rounded-md shadow-xs">
                    {dest.emoji} {dest.name.toUpperCase()}
                  </span>
                </div>

                {/* Destination info */}
                <div className="flex-grow flex flex-col justify-between h-full gap-4 text-left w-full">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-text-muted font-bold tracking-wider uppercase">{dest.country}</span>
                      <span className="text-[9px] bg-brand-orange/10 text-brand-orange px-2.5 py-0.5 rounded-md font-bold flex items-center gap-1 shadow-xs">
                        <Star className="w-3 h-3 text-brand-orange fill-brand-orange" /> {dest.rating || '4.8'}
                      </span>
                    </div>
                    <h3 className="font-headers text-lg font-bold text-brand-navy mt-2 group-hover:text-brand-orange transition-colors">
                      Conhecer {dest.name}
                    </h3>
                    <p className="text-xs text-text-muted mt-2 leading-relaxed max-w-xl">
                      Descubra a melhor época para viajar para {dest.name}, além de planilhas financeiras com orçamentos detalhados para estadias de lazer.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2.5 pt-4 border-t border-border-gray/30 w-full justify-start">
                    <Link
                      href={`/destinos/${dest.slug}`}
                      className="bg-brand-navy hover:bg-brand-orange text-white text-[10px] font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                    >
                      Acessar Guia do Destino <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/o-que-fazer/${dest.slug}`}
                      className="btn btn-outline border-border-gray text-brand-navy hover:bg-bg-light hover:border-brand-navy/20 py-2 px-3.5 text-[10px] font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      Ver Atrações de Lazer
                    </Link>
                    <Link
                      href={`/planejamento/${dest.slug}`}
                      className="btn btn-outline border-brand-orange/20 text-brand-orange hover:bg-brand-orange/5 py-2 px-3.5 text-[10px] font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" /> Planejar Roteiro
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer onOpenDownload={() => setIsDownloadOpen(true)} />
      
      <AppDownloadModal 
        isOpen={isDownloadOpen} 
        onClose={() => setIsDownloadOpen(false)} 
      />
    </div>
  );
}

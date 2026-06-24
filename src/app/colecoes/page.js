"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Compass, Star, ArrowRight, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppDownloadModal from '@/components/AppDownloadModal';
import Breadcrumbs from '@/components/Breadcrumbs';
import { trackPageView } from '@/lib/analytics';

const mockCollections = [
  {
    slug: 'romantica',
    title: 'Melhores Viagens Românticas',
    desc: 'Destinos charmosos, pores do sol inesquecíveis e experiências exclusivas desenhadas para casais celebrarem momentos especiais.',
    icon: '💕',
    destinations: ['Santorini', 'Paris', 'Capadócia'],
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
    count: 3
  },
  {
    slug: 'gastronomica',
    title: 'Melhores Viagens Gastronômicas',
    desc: 'Para os apaixonados por culinária autêntica. De mercados locais a bistrôs com estrelas Michelin e massas tradicionais.',
    icon: '🍷',
    destinations: ['Roma', 'Paris', 'Japão'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    count: 3
  },
  {
    slug: 'familia',
    title: 'Melhores Viagens em Família',
    desc: 'Rotas seguras, dinâmicas e cheias de passeios lúdicos e natureza exuberante que divertem viajantes de todas as idades.',
    icon: '👨‍👩‍👧‍👦',
    destinations: ['Noruega', 'Gramado', 'Fernando de Noronha'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    count: 3
  }
];

export default function Colecoes() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  useEffect(() => {
    trackPageView('collections_index');
  }, []);

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-5xl text-left">
          
          <Breadcrumbs items={[{ name: 'Coleções', url: '/colecoes' }]} />

          {/* Header */}
          <header className="my-8">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3 py-1.5 rounded-full w-fit">
              CURADORIA AUTORAL
            </span>
            <h1 className="font-headers text-3.5xl sm:text-5xl font-extrabold text-brand-navy mt-4 mb-4 tracking-tight leading-tight">
              Coleções de Viagem 2GO
            </h1>
            <p className="text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
              Explore nossos destinos agrupados por temas e estilos de viagem. Planejados sob medida para combinar com o seu momento de vida.
            </p>
          </header>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            {mockCollections.map((col) => (
              <div
                key={col.slug}
                className="group bg-white border border-border-gray rounded-[28px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Visual Image */}
                  <div className="h-48 overflow-hidden relative bg-bg-light">
                    <img 
                      src={col.image} 
                      alt={col.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs text-brand-navy text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs">
                      {col.icon} {col.count} Destinos
                    </div>
                  </div>

                  {/* Body details */}
                  <div className="p-6 text-left">
                    <h3 className="font-headers text-base sm:text-lg font-bold text-brand-navy group-hover:text-brand-orange transition-colors">
                      {col.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-2 leading-relaxed">
                      {col.desc}
                    </p>

                    {/* Tags preview */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {col.destinations.map((d, dIdx) => (
                        <span key={dIdx} className="bg-bg-light text-[9px] font-bold text-brand-navy px-2.5 py-1 rounded-md">
                          📍 {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-border-gray/30 mt-4">
                  <Link
                    href={`/colecoes/${col.slug}`}
                    className="text-xs font-bold text-brand-navy hover:text-brand-orange transition-colors flex items-center justify-between group/link pt-4"
                  >
                    <span>Explorar Coleção</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
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

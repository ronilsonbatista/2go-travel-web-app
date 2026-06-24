"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Globe, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppDownloadModal from '@/components/AppDownloadModal';
import { getDestinations } from '@/lib/cms';

export default function Destinos() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [destList, setDestList] = useState([]);

  useEffect(() => {
    getDestinations().then(data => setDestList(data));
  }, []);

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-5xl text-left">
          
          <Breadcrumbs items={[{ name: 'Destinos', url: '/destinos' }]} />

          {/* Page Title Header */}
          <header className="my-8">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3 py-1.5 rounded-full w-fit">
              DIRETÓRIO INTERNACIONAL
            </span>
            <h1 className="font-headers text-3.5xl sm:text-5xl font-extrabold text-brand-navy mt-4 mb-4 tracking-tight">
              Explore nossos destinos curados
            </h1>
            <p className="text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
              Descubra guias completos, roteiros de viagem e estimativas de custos detalhadas para planejar sua próxima experiência de alto padrão.
            </p>
          </header>

          {/* Destinations Grid list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {destList.map((dest) => (
              <div 
                key={dest.slug}
                className="group bg-white border border-border-gray rounded-[24px] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden relative bg-bg-light">
                  <img 
                    src={dest.image} 
                    alt={dest.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-3.5 py-1.5 rounded-xl text-xs font-bold text-brand-navy flex items-center gap-1">
                    <span>{dest.emoji}</span>
                    <span>{dest.country}</span>
                  </div>
                </div>

                {/* Info and links */}
                <div className="p-6 flex flex-col justify-between flex-grow gap-4">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-headers text-lg font-bold text-brand-navy group-hover:text-brand-orange transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                      {dest.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 pt-2 border-t border-border-gray/30">
                    <Link 
                      href={`/destinos/${dest.slug}`}
                      className="text-xs font-bold text-brand-navy hover:text-brand-orange transition-colors flex items-center justify-between py-1 group/link"
                    >
                      <span>Ver Guia Completo</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                    <Link 
                      href={`/quanto-custa/${dest.slug}`}
                      className="text-xs font-semibold text-text-muted hover:text-brand-orange transition-colors flex items-center justify-between py-1"
                    >
                      <span>Quanto custa viajar?</span>
                      <span className="text-[10px] text-brand-green bg-brand-green/10 px-2 py-0.5 rounded font-bold">{dest.currency}</span>
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

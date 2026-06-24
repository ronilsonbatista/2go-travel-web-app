"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, MapPin, Sparkles } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import AppDownloadModal from './AppDownloadModal';

export default function RoteirosClient({ itineraries = [] }) {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState('todos');

  // Extract unique destinations that have itineraries
  const destFilters = ['todos', ...new Set(itineraries.map(it => it.destinationName).filter(Boolean))];

  const filteredItineraries = selectedDest === 'todos'
    ? itineraries
    : itineraries.filter(it => it.destinationName === selectedDest);

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-5xl text-left">
          
          <Breadcrumbs items={[{ name: 'Roteiros', url: '/roteiros' }]} />

          {/* Header */}
          <header className="my-8">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3 py-1.5 rounded-full w-fit">
              ROTEIROS DE CURADORIA
            </span>
            <h1 className="font-headers text-3.5xl sm:text-5xl font-extrabold text-brand-navy mt-4 mb-4 tracking-tight">
              Planejamentos Completos de Viagem
            </h1>
            <p className="text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
              Explore roteiros dia a dia otimizados por nossos especialistas. Roteiros estruturados com as melhores rotas, passeios clássicos e locais secretos para otimizar o seu tempo.
            </p>
          </header>

          {/* Destination Filters (App Tab Bar Style) */}
          {destFilters.length > 2 && (
            <div className="flex flex-wrap gap-2 my-8">
              {destFilters.map((dest) => (
                <button
                  key={dest}
                  onClick={() => setSelectedDest(dest)}
                  className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer border shrink-0 ${
                    selectedDest === dest
                      ? 'bg-brand-navy border-brand-navy text-white shadow-sm'
                      : 'bg-white border-border-gray text-text-muted hover:border-brand-navy/30 hover:text-brand-navy'
                  }`}
                >
                  {dest === 'todos' ? 'Todos os Destinos' : dest}
                </button>
              ))}
            </div>
          )}

          {/* Itineraries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            {filteredItineraries.map((itinerary) => (
              <div 
                key={itinerary.slug}
                className="group bg-white border border-border-gray rounded-[28px] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Header Image Area */}
                <div className="h-56 overflow-hidden relative bg-bg-light">
                  {itinerary.destinationImage ? (
                    <img 
                      src={itinerary.destinationImage} 
                      alt={itinerary.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-brand-navy/10 flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-brand-orange/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  
                  {/* Floating Tags */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="bg-white/95 backdrop-blur-xs px-3 py-1 rounded-xl text-[11px] font-bold text-brand-navy flex items-center gap-1 shadow-sm">
                      <span>{itinerary.destinationEmoji}</span>
                      <span>{itinerary.destinationName}</span>
                    </div>
                    <div className="bg-brand-orange text-white px-3 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 shadow-sm">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{itinerary.duration} {itinerary.duration === 1 ? 'dia' : 'dias'}</span>
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-grow gap-4 text-left">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-headers text-lg md:text-xl font-bold text-brand-navy group-hover:text-brand-orange transition-colors leading-tight">
                      {itinerary.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-3">
                      {itinerary.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border-gray/30 flex items-center justify-between">
                    <span className="text-[11px] text-text-muted font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                      <span>{itinerary.destinationName}, {itinerary.destinationCountry}</span>
                    </span>
                    <Link 
                      href={`/roteiros/${itinerary.slug}`}
                      className="bg-[#96AB21] hover:bg-[#85981D] text-[#081B6B] font-extrabold px-5 py-2.5 rounded-xl transition-all shadow-sm hover:scale-[1.01] active:scale-95 text-xs flex items-center gap-1.5 cursor-pointer border border-[#96AB21]/10 animate-fade-in"
                    >
                      <span>Ver Roteiro</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItineraries.length === 0 && (
            <div className="bg-white border border-border-gray rounded-[28px] p-12 text-center my-10 flex flex-col items-center">
              <Sparkles className="w-12 h-12 text-brand-orange/30 mb-4" />
              <h3 className="font-headers text-lg font-bold text-brand-navy">Nenhum roteiro encontrado</h3>
              <p className="text-xs text-text-muted mt-2 max-w-sm">No momento não temos roteiros cadastrados para esse filtro de destino.</p>
            </div>
          )}

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

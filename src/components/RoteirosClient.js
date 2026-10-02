"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, MapPin, Sparkles, Search } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import AppDownloadModal from './AppDownloadModal';
import { matchesSearch } from '@/lib/searchHelper';

export default function RoteirosClient({ itineraries = [], initialSearch = '' }) {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // Keep the field in sync when the URL search changes (continent chips, etc.)
  useEffect(() => {
    setSearchQuery(initialSearch || '');
  }, [initialSearch]);

  // Filter chips
  const destFilters = ['Todos', 'Paris', 'Roma', 'Lisboa', 'Londres', 'Japão', 'Itália', 'Praia', 'Romance', 'Família', 'Aventura'];

  const filteredItineraries = itineraries.filter(it => {
    // 1. Filter by chip
    if (selectedDest !== 'Todos') {
      const filterLower = selectedDest.toLowerCase();
      // If it's a destination filter:
      const matchDest = 
        (it.destinationName && it.destinationName.toLowerCase() === filterLower) || 
        (it.destinationCountry && it.destinationCountry.toLowerCase() === filterLower);
      
      // If it's a style filter:
      const matchStyle = 
        (it.style && it.style.toLowerCase().includes(filterLower)) ||
        (it.title && it.title.toLowerCase().includes(filterLower)) ||
        (it.desc && it.desc.toLowerCase().includes(filterLower));
        
      if (!matchDest && !matchStyle) {
        return false;
      }
    }
    // 2. Filter by search query
    if (searchQuery.trim() !== '') {
      return matchesSearch(searchQuery, it);
    }
    return true;
  });

  // Extract matching destinations for direct Planning CTA
  const matchingDests = [];
  if (searchQuery.trim() !== '') {
    const seen = new Set();
    itineraries.forEach(it => {
      if (matchesSearch(searchQuery, {
        destinationName: it.destinationName,
        destinationCountry: it.destinationCountry,
        destinationSlug: it.destinationSlug,
        slug: it.destinationSlug,
        tags: it.tags || []
      })) {
        if (!seen.has(it.destinationSlug)) {
          seen.add(it.destinationSlug);
          matchingDests.push({
            name: it.destinationName,
            country: it.destinationCountry,
            emoji: it.destinationEmoji,
            slug: it.destinationSlug
          });
        }
      }
    });
  }

  const displayDestName = searchQuery.trim() 
    ? searchQuery.trim().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
    : '';

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1440px] w-full text-left min-w-0">
          
          <Breadcrumbs items={[{ name: 'Roteiros', url: '/roteiros' }]} />

          {/* Header */}
          <header className="mt-6 mb-4">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-wide px-3 py-1.5 rounded-full w-fit">
              Exemplos de roteiros
            </span>
            <h1 className="font-headers text-3xl sm:text-5xl font-extrabold text-brand-navy mt-4 mb-4 tracking-tight break-words">
              Seus roteiros ganham vida no app
            </h1>
            <p className="text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
              Estes exemplos são uma prévia. Planejamento, timeline, mapa e ajustes ficam no aplicativo.
            </p>
            <button
              type="button"
              onClick={() => setIsDownloadOpen(true)}
              className="mt-5 inline-flex items-center justify-center bg-brand-navy hover:bg-brand-navy/90 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl"
            >
              Baixar o App
            </button>
          </header>

          <section className="my-8 bg-white border border-border-gray rounded-[28px] p-5 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <p className="text-[11px] font-extrabold tracking-wide text-brand-orange">Prints do aplicativo</p>
                <h2 className="font-headers text-2xl sm:text-3xl font-extrabold text-brand-navy mt-2">
                  Da próxima viagem ao dia a dia
                </h2>
                <p className="text-sm text-text-muted mt-3 leading-relaxed max-w-md">
                  A home mostra a viagem que vem. O roteiro abre o dia, o horário e o mapa. Você ajusta tudo no app.
                </p>
              </div>
              <div className="flex items-end justify-center gap-3 sm:gap-5">
                <img
                  src="/assets/app-home-gustavo.webp"
                  alt="Tela inicial do app 2GO com a próxima viagem"
                  width={390}
                  height={1474}
                  className="h-[280px] sm:h-[420px] w-auto rounded-[24px] border border-border-gray shadow-md object-cover object-top bg-white"
                />
                <img
                  src="/assets/app-roteiro-roma.webp"
                  alt="Timeline do roteiro de Roma no app 2GO"
                  width={202}
                  height={856}
                  className="h-[280px] sm:h-[420px] w-auto rounded-[24px] border border-border-gray shadow-md object-cover object-top bg-white"
                />
              </div>
            </div>
          </section>

          {/* Search Bar Input */}
          <div className="my-4 relative w-full min-w-0">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-text-muted/60" />
            </div>
            <input
              type="text"
              placeholder="Busque por países, cidades, estilos ou experiências (ex: 'Paris', 'Itália', 'Romance')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-border-gray pl-12 pr-6 py-4 rounded-xl text-sm sm:text-base font-semibold text-brand-navy placeholder:text-text-muted/50 focus:outline-none focus:border-brand-navy transition-all shadow-xs"
            />
          </div>

          {/* Autocomplete / Found destinations suggestions panel */}
          {matchingDests.length > 0 && (
            <div className="mb-8 p-5 bg-[#FAF9F6] border border-brand-navy/5 rounded-2xl animate-fade-in text-left flex flex-col gap-3 shadow-sm">
              <span className="text-[11px] font-black text-brand-orange tracking-wide block">
                Destinos encontrados
              </span>
              <p className="text-xs text-text-muted">
                A prévia fica nesta página. O dia a dia desses destinos fica no aplicativo.
              </p>
              <div className="flex flex-wrap gap-3">
                {matchingDests.map((dest) => (
                  <button
                    key={dest.slug}
                    type="button"
                    onClick={() => setIsDownloadOpen(true)}
                    className="inline-flex items-center gap-2 bg-white border border-border-gray hover:border-[#96AB21] hover:bg-[#96AB21]/5 text-xs font-bold text-brand-navy px-4.5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    <span>{dest.emoji}</span>
                    <span>Baixar o App para {dest.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Destination Filters (App Tab Bar Style) */}
          {destFilters.length > 2 && (
            <div className="flex flex-wrap gap-2 mt-4 mb-3">
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
                  {dest === 'Todos' ? 'Todos os Destinos' : dest}
                </button>
              ))}
            </div>
          )}

          {/* Itineraries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-3">
            {filteredItineraries.map((itinerary) => (
              <div 
                key={itinerary.slug}
                className="group bg-white border border-border-gray rounded-[28px] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Header Image Area wrapped in Link */}
                <Link 
                  href={`/roteiros/${itinerary.slug}`}
                  className="h-56 overflow-hidden relative bg-bg-light block cursor-pointer"
                >
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
                </Link>

                {/* Details Section */}
                <div className="p-6 md:p-8 flex flex-col justify-between flex-grow gap-5 text-left">
                  <div className="flex flex-col gap-2">
                    <Link href={`/roteiros/${itinerary.slug}`}>
                      <h3 className="font-headers text-lg md:text-xl font-bold text-brand-navy group-hover:text-brand-orange transition-colors leading-tight cursor-pointer">
                        {itinerary.title}
                      </h3>
                    </Link>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-3">
                      {itinerary.desc}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2.5 pt-4 border-t border-border-gray/30 mt-auto">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-text-muted font-medium flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                        <span>{itinerary.destinationName}, {itinerary.destinationCountry}</span>
                      </span>
                      <Link 
                        href={`/roteiros/${itinerary.slug}`}
                        className="bg-[#96AB21] hover:bg-[#85981D] text-[#081B6B] font-extrabold px-5 py-2.5 rounded-xl transition-all shadow-sm hover:scale-[1.01] active:scale-95 text-xs flex items-center gap-1.5 cursor-pointer border border-[#96AB21]/10"
                      >
                        <span>Ver Roteiro</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>

                    <Link 
                      href={`/quanto-custa/${itinerary.destinationSlug}`}
                      className="text-xs font-semibold text-text-muted hover:text-brand-orange transition-colors flex items-center justify-between py-1 cursor-pointer"
                    >
                      <span>Quanto custa viajar?</span>
                      <span className="text-[11px] text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-md font-bold">
                        {itinerary.destinationCurrency || 'EUR'}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItineraries.length === 0 && (
            <div className="bg-white border border-border-gray rounded-[28px] p-8 sm:p-12 text-center my-10 flex flex-col items-center max-w-xl mx-auto shadow-sm animate-fade-in-up">
              <Sparkles className="w-12 h-12 text-brand-orange/30 mb-5 animate-pulse" />
              <h3 className="font-headers text-xl sm:text-2xl font-bold text-brand-navy">Ainda não temos esse exemplo no site.</h3>
              <p className="text-xs sm:text-sm text-text-muted mt-3 leading-relaxed max-w-md">O aplicativo monta o dia a dia quando o destino entra na sua viagem.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full items-center justify-center">
                <button
                  type="button"
                  onClick={() => setIsDownloadOpen(true)}
                  className="bg-[#96AB21] hover:bg-[#85981D] text-brand-navy font-extrabold px-6 py-3.5 rounded-xl transition-all shadow-sm hover:scale-[1.01] active:scale-95 text-xs flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto"
                >
                  <span>Baixar o App{displayDestName ? ` e ver ${displayDestName}` : ''}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDest('Todos');
                  }}
                  className="bg-transparent border border-border-gray hover:border-brand-navy/30 text-brand-navy font-bold px-6 py-3.5 rounded-xl transition-all hover:scale-[1.01] active:scale-95 text-xs flex items-center justify-center cursor-pointer w-full sm:w-auto"
                >
                  Ver destinos populares
                </button>
              </div>
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

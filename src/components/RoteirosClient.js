"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, MapPin, Sparkles, Search } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import AppDownloadModal from './AppDownloadModal';

export default function RoteirosClient({ itineraries = [] }) {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [selectedContinent, setSelectedContinent] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Read URL search parameter on client mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const search = params.get('search') || '';
      if (search) {
        setSearchQuery(search);
      }
    }
  }, []);

  // Helper to map country to continent
  const getContinentOfCountry = (country) => {
    if (!country) return 'Outros';
    const c = country.toLowerCase();
    if (['frança', 'itália', 'portugal', 'grécia', 'franca', 'italia', 'gricia', 'grecia'].includes(c)) return 'Europa';
    if (['japão', 'japao', 'tailândia', 'china'].includes(c)) return 'Ásia';
    if (['brasil', 'argentina', 'colômbia', 'colombia'].includes(c)) return 'América do Sul';
    return 'Outros';
  };

  const getContinentIcon = (continent) => {
    switch (continent) {
      case 'Europa':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        );
      case 'Ásia':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0">
            <path d="M12 2v20M17 5H7M19 9H5M21 13H3" />
          </svg>
        );
      case 'América do Sul':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0">
            <path d="M12 2c-3.5 0-7 2-7 7s3.5 11 7 13c3.5-2 7-8 7-13s-3.5-7-7-7z" />
            <circle cx="12" cy="9" r="3" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          </svg>
        );
    }
  };

  // Extract unique continents that have itineraries
  const continentFilters = ['todos', ...new Set(itineraries.map(it => getContinentOfCountry(it.destinationCountry)).filter(Boolean))];

  const filteredItineraries = itineraries.filter(it => {
    // 1. Filter by continent
    if (selectedContinent !== 'todos' && getContinentOfCountry(it.destinationCountry) !== selectedContinent) {
      return false;
    }
    // 2. Filter by search query (expanded search logic)
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      
      let countriesForContinent = [];
      if (query === 'europa') {
        countriesForContinent = ['frança', 'itália', 'portugal', 'grécia', 'espanha', 'inglaterra', 'alemanha'];
      } else if (query === 'ásia' || query === 'asia') {
        countriesForContinent = ['japão', 'tailândia', 'china', 'índia', 'indonésia'];
      } else if (query === 'américa do sul' || query === 'america do sul' || query === 'américa' || query === 'america') {
        countriesForContinent = ['brasil', 'argentina', 'chile', 'colômbia', 'peru'];
      }
      
      const matchesContinent = countriesForContinent.includes(it.destinationCountry.toLowerCase());
      const matchesTags = it.tags && it.tags.some(tag => tag.toLowerCase().includes(query));
      
      return (
        it.title.toLowerCase().includes(query) ||
        it.desc.toLowerCase().includes(query) ||
        it.destinationName.toLowerCase().includes(query) ||
        it.destinationCountry.toLowerCase().includes(query) ||
        matchesContinent ||
        matchesTags ||
        (it.style && it.style.toLowerCase().includes(query))
      );
    }
    return true;
  });

  // Extract matching destinations for direct Planning CTA
  const matchingDests = [];
  if (searchQuery.trim() !== '') {
    const query = searchQuery.toLowerCase().trim();
    const seen = new Set();
    itineraries.forEach(it => {
      if (
        it.destinationName && 
        (it.destinationName.toLowerCase().includes(query) || 
         it.destinationCountry.toLowerCase().includes(query))
      ) {
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
        <div className="container mx-auto px-6 max-w-5xl text-left">
          
          <Breadcrumbs items={[{ name: 'Roteiros', url: '/roteiros' }]} />

          {/* Header */}
          <header className="my-8">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3 py-1.5 rounded-full w-fit">
              Roteiros de consultoria
            </span>
            <h1 className="font-headers text-3.5xl sm:text-5xl font-extrabold text-brand-navy mt-4 mb-4 tracking-tight">
              Planejamentos Completos de Viagem
            </h1>
            <p className="text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
              Explore roteiros dia a dia otimizados por nossos consultores. Roteiros estruturados com as melhores rotas, passeios clássicos e locais secretos para otimizar o seu tempo.
            </p>
          </header>

          {/* Search Bar Input */}
          <div className="my-6 relative w-full">
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
              <span className="text-[11px] font-black text-brand-orange uppercase tracking-wider block">
                Destinos Encontrados
              </span>
              <p className="text-xs text-text-muted">
                Deseja criar um roteiro personalizado do seu jeito para um destes destinos? Clique para iniciar o planejador:
              </p>
              <div className="flex flex-wrap gap-3">
                {matchingDests.map((dest) => (
                  <Link
                    key={dest.slug}
                    href={`/planejamento?dest=${encodeURIComponent(dest.name)}`}
                    className="inline-flex items-center gap-2 bg-white border border-border-gray hover:border-[#96AB21] hover:bg-[#96AB21]/5 text-xs font-bold text-brand-navy px-4.5 py-2.5 rounded-xl transition-all shadow-xs group/link cursor-pointer hover:scale-[1.01] active:scale-95 animate-fade-in"
                  >
                    <span>{dest.emoji}</span>
                    <span>Planejar viagem para {dest.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#96AB21] transform group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Continent Filters (App Tab Bar Style with SVGs) */}
          {continentFilters.length > 2 && (
            <div className="flex flex-wrap gap-2.5 my-8">
              {continentFilters.map((cont) => (
                <button
                  key={cont}
                  onClick={() => setSelectedContinent(cont)}
                  className={`px-4.5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer border shrink-0 flex items-center gap-1.5 ${
                    selectedContinent === cont
                      ? 'bg-brand-navy border-brand-navy text-white shadow-sm'
                      : 'bg-white border-border-gray text-text-muted hover:border-brand-navy/30 hover:text-brand-navy'
                  }`}
                >
                  {cont !== 'todos' && getContinentIcon(cont)}
                  <span>{cont === 'todos' ? 'Todos os continentes' : cont}</span>
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
              <h3 className="font-headers text-xl sm:text-2xl font-bold text-brand-navy">Ainda não temos esse roteiro pronto.</h3>
              <p className="text-xs sm:text-sm text-text-muted mt-3 leading-relaxed max-w-md">Mas a 2GO pode montar um roteiro personalizado para esse destino em poucos passos.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full items-center justify-center">
                <Link
                  href={`/planejamento?dest=${encodeURIComponent(searchQuery.trim())}`}
                  className="bg-[#96AB21] hover:bg-[#85981D] text-brand-navy font-extrabold px-6 py-3.5 rounded-xl transition-all shadow-sm hover:scale-[1.01] active:scale-95 text-xs flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto"
                >
                  <span>Planejar minha viagem para {displayDestName}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedContinent('todos');
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

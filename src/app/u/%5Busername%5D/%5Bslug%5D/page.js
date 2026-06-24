"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Compass, Clock, MapPin, Sparkles, User, ArrowLeft, Heart, CheckCircle, Share2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppDownloadModal from '@/components/AppDownloadModal';
import AffiliateDeals from '@/components/AffiliateDeals';
import { getItineraryBySlug, getDestinationBySlug } from '@/lib/cms';
import { trackPageView, trackEvent } from '@/lib/analytics';
import confetti from 'canvas-confetti';

export default function SharedItinerary({ params }) {
  const router = useRouter();
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  
  // Dynamic parameters
  const [username, setUsername] = useState('viajante');
  const [itinerary, setItinerary] = useState(null);
  const [destination, setDestination] = useState(null);
  
  // Custom states
  const [saved, setSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      const uName = resolved.username || 'ronilson';
      const itSlug = resolved.slug || 'paris-5-dias';
      
      setUsername(uName);
      trackPageView('shared_user_itinerary', `${uName}/${itSlug}`);
      
      // Load itinerary from CMS (using fallback if user-customised isn't in database)
      const foundItin = await getItineraryBySlug(itSlug) || await getItineraryBySlug('paris-5-dias');
      setItinerary(foundItin);
      
      if (foundItin) {
        const foundDest = await getDestinationBySlug(foundItin.destinationSlug);
        setDestination(foundDest);
      }
    };
    resolveParams();
  }, [params]);

  const handleSaveToMyAccount = () => {
    if (!itinerary) return;

    if (typeof window !== 'undefined') {
      const favItins = JSON.parse(localStorage.getItem('fav_itineraries') || '[]');
      if (!favItins.includes(itinerary.slug)) {
        favItins.push(itinerary.slug);
        localStorage.setItem('fav_itineraries', JSON.stringify(favItins));
      }
      
      setSaved(true);
      
      // Fire celebration confetti
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });

      trackEvent('save_shared_itinerary', { 
        creator: username, 
        itinerary_slug: itinerary.slug 
      });
    }
  };

  const handleShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
      trackEvent('share_shared_itinerary_link', { itinerary_slug: itinerary?.slug });
    }
  };

  if (!itinerary) return null;

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl text-left">
          
          {/* Back button */}
          <div className="my-4">
            <Link 
              href={`/viajantes/${username}`}
              className="text-xs font-semibold text-text-muted hover:text-brand-navy transition-colors inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Ver outros roteiros de @{username}
            </Link>
          </div>

          {/* Shared Header Card */}
          <header className="bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] shadow-xs flex flex-col gap-5 mb-8 text-left">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex flex-col gap-2">
                <span className="bg-brand-orange/10 text-brand-orange text-[9px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit uppercase">
                  Roteiro de Viajante 🗺️
                </span>
                <h1 className="font-headers text-2.5xl sm:text-4.5xl font-extrabold text-brand-navy mt-1 tracking-tight leading-tight">
                  {itinerary.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted font-bold mt-1">
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-brand-orange" /> Compartilhado por @{username}</span>
                  <span>•</span>
                  <span>⏱️ {itinerary.duration} Dias</span>
                  {destination && (
                    <>
                      <span>•</span>
                      <span>📍 {destination.name}, {destination.country}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 w-full sm:w-auto shrink-0 self-start sm:self-center">
                <button
                  onClick={handleShareLink}
                  className="btn btn-outline border-border-gray text-brand-navy hover:bg-bg-light hover:border-brand-navy/20 py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer flex-grow sm:flex-grow-0"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? 'Copiado!' : 'Copiar Link'}</span>
                </button>
                
                {saved ? (
                  <div className="bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 shadow-xs flex-grow sm:flex-grow-0 select-none">
                    <CheckCircle className="w-4 h-4" />
                    <span>Salvo em Roteiros!</span>
                  </div>
                ) : (
                  <button
                    onClick={handleSaveToMyAccount}
                    className="btn btn-primary py-2.5 px-4 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm hover:scale-[1.01] active:scale-95 transition-all flex-grow sm:flex-grow-0"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>Salvar no Meu App</span>
                  </button>
                )}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-text-muted leading-relaxed border-t border-border-gray/50 pt-4 mt-2">
              {itinerary.desc}
            </p>
          </header>

          {/* Content Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Timeline details */}
            <div className="lg:col-span-8 flex flex-col gap-6 w-full text-left">
              <h3 className="font-headers text-lg font-bold text-brand-navy px-1">
                Programação da Rota
              </h3>

              <div className="flex flex-col gap-5">
                {itinerary.days && itinerary.days.map((day, idx) => (
                  <div 
                    key={idx}
                    className="bg-white border border-border-gray p-6 rounded-[24px] shadow-xs text-left"
                  >
                    <div className="flex justify-between items-center mb-4 border-b border-border-gray/30 pb-3">
                      <span className="bg-brand-orange text-white text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-md">
                        {day.day}
                      </span>
                      <h4 className="font-headers text-xs sm:text-sm font-bold text-brand-navy flex-grow pl-3 text-left leading-normal">
                        {day.title}
                      </h4>
                    </div>

                    <div className="flex flex-col gap-4 pl-1">
                      {day.events && day.events.map((evt, eIdx) => (
                        <div key={eIdx} className="flex gap-4 items-start text-left">
                          <span className="font-mono text-[10px] font-bold text-brand-navy w-10 shrink-0 text-right">{evt.time}</span>
                          <span className="w-2 h-2 rounded-full bg-brand-orange mt-1 shrink-0"></span>
                          <div className="flex flex-col gap-0.5">
                            <h5 className="font-headers text-xs font-bold text-brand-navy">{evt.title}</h5>
                            <p className="text-[10px] text-text-muted leading-relaxed">{evt.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar deals & syncing */}
            <div className="lg:col-span-4 flex flex-col gap-6 w-full text-left">
              
              {/* Creator Promo card */}
              <div className="bg-brand-navy text-white p-6 rounded-[24px] shadow-sm flex flex-col gap-3">
                <span className="text-[8.5px] font-extrabold text-brand-orange uppercase tracking-wider">SOBRE O VIAJANTE</span>
                <h4 className="font-headers font-bold text-white text-sm leading-tight">Criado por @{username}</h4>
                <p className="text-[11px] text-white/70 leading-relaxed">
                  Confira outros roteiros e coleções públicas criados por este viajante em seu perfil oficial da comunidade 2GO.
                </p>
                <Link 
                  href={`/viajantes/${username}`}
                  className="btn btn-secondary py-2.5 text-xs justify-center font-bold text-center w-full bg-brand-orange text-white hover:bg-white hover:text-brand-navy transition-all mt-2"
                >
                  Ver Perfil de @{username}
                </Link>
              </div>

              {/* Destination links */}
              {destination && (
                <div className="bg-white border border-border-gray p-6 rounded-[24px] shadow-sm flex flex-col gap-3">
                  <span className="text-[8.5px] font-extrabold text-brand-orange uppercase tracking-wider">GUIA COMPLETO</span>
                  <h4 className="font-headers font-bold text-brand-navy text-sm leading-tight">Explore mais de {destination.name}</h4>
                  <p className="text-[11px] text-text-muted leading-relaxed">
                    Acesse o guia oficial da cidade contendo dicas de clima, o que fazer, custos detalhados e tabelas financeiras.
                  </p>
                  <Link 
                    href={`/destinos/${destination.slug}`}
                    className="btn btn-outline py-2.5 text-xs text-center justify-center font-bold mt-2"
                  >
                    Acessar Guia Oficial
                  </Link>
                </div>
              )}

            </div>

          </div>

          {/* Dynamic Affiliate offers at the bottom */}
          {destination && (
            <div className="mt-12 w-full">
              <AffiliateDeals destination={destination} />
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

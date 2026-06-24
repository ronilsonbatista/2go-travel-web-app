"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Calendar, Clock, DollarSign, Languages, Info, ArrowRight, ShieldAlert, Sparkles, CloudRain, Utensils, Map, ChevronRight } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import AppDownloadModal from './AppDownloadModal';
import LeadMagnetBox from './LeadMagnetBox';
import NewsletterBox from './NewsletterBox';
import AffiliateDeals from './AffiliateDeals';
import JsonLd from './JsonLd';
import { getDestinationSchema, getFAQSchema } from '@/lib/schema';
import { trackPageView } from '@/lib/analytics';
import RecommendationEngine from './RecommendationEngine';

export default function DestinationClient({ destination, itineraries }) {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    trackPageView('destination', destination.slug);
  }, [destination.slug]);

  if (!destination) return null;

  // Generate schemas
  const destinationSchema = getDestinationSchema(destination);
  const faqSchema = getFAQSchema(destination.faqs);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      {/* Inject schemas to page head */}
      <JsonLd schema={destinationSchema} />
      <JsonLd schema={faqSchema} />

      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-5xl text-left">
          
          <Breadcrumbs items={[
            { name: 'Destinos', url: '/destinos' },
            { name: destination.name, url: `/destinos/${destination.slug}` }
          ]} />

          {/* Hero Banner Header Card */}
          <div className="relative rounded-[28px] overflow-hidden bg-brand-navy text-white p-8 md:p-12 my-6 shadow-lg min-h-[300px] flex flex-col justify-end">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-[0.22] pointer-events-none select-none animate-[pulse_6s_infinite_alternate]"
              style={{ backgroundImage: `url(${destination.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-transparent pointer-events-none" />

            <div className="relative z-10 max-w-2xl">
              <span className="bg-brand-orange text-white text-[10px] font-extrabold tracking-widest px-3.5 py-1.5 rounded-full w-fit">
                GUIA OFICIAL 2GO
              </span>
              <h1 className="font-headers text-4xl sm:text-6xl font-extrabold mt-4 mb-4 tracking-tight">
                {destination.name}
              </h1>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                {destination.longDescription}
              </p>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <Link 
              href={`/melhor-epoca/${destination.slug}`}
              className="bg-white p-4 rounded-2xl border border-border-gray shadow-sm flex items-center gap-3 hover:border-brand-orange/30 transition-all group"
            >
              <Calendar className="w-5 h-5 text-brand-orange shrink-0 group-hover:scale-105 transition-transform" />
              <div>
                <span className="text-[9px] text-text-muted font-bold block uppercase tracking-wide">Melhor Época</span>
                <span className="text-xs font-bold text-brand-navy truncate block max-w-[130px] group-hover:text-brand-orange transition-colors">{destination.bestTime}</span>
              </div>
            </Link>
            <div className="bg-white p-4 rounded-2xl border border-border-gray shadow-sm flex items-center gap-3">
              <Info className="w-5 h-5 text-brand-green shrink-0" />
              <div>
                <span className="text-[9px] text-text-muted font-bold block uppercase tracking-wide">Visto Turismo</span>
                <span className="text-xs font-bold text-brand-navy truncate block max-w-[130px]">{destination.visaRequired}</span>
              </div>
            </div>
            <Link 
              href={`/quanto-custa/${destination.slug}`}
              className="bg-white p-4 rounded-2xl border border-border-gray shadow-sm flex items-center gap-3 hover:border-brand-green/30 transition-all group"
            >
              <DollarSign className="w-5 h-5 text-brand-green shrink-0 group-hover:scale-105 transition-transform" />
              <div>
                <span className="text-[9px] text-text-muted font-bold block uppercase tracking-wide">Moeda</span>
                <span className="text-xs font-bold text-brand-navy truncate block max-w-[130px] group-hover:text-brand-green transition-colors">{destination.currency}</span>
              </div>
            </Link>
            <div className="bg-white p-4 rounded-2xl border border-border-gray shadow-sm flex items-center gap-3">
              <Languages className="w-5 h-5 text-brand-navy shrink-0" />
              <div>
                <span className="text-[9px] text-text-muted font-bold block uppercase tracking-wide">Idioma</span>
                <span className="text-xs font-bold text-brand-navy truncate block max-w-[130px]">{destination.language}</span>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side: Guide and details */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              
              {/* Attractions section */}
              <section className="bg-white border border-border-gray p-6 sm:p-8 rounded-[24px] shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-headers text-lg sm:text-xl font-bold text-brand-navy">
                    Atrações imperdíveis em {destination.name}
                  </h2>
                  <Link 
                    href={`/o-que-fazer/${destination.slug}`}
                    className="text-xs font-bold text-brand-orange hover:underline flex items-center gap-1"
                  >
                    <span>Ver Tudo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                
                <div className="flex flex-col gap-4">
                  {destination.attractions.slice(0, 3).map((att, i) => (
                    <div 
                      key={i}
                      className="p-4 rounded-xl border border-border-gray bg-bg-light/40 flex justify-between items-start gap-4"
                    >
                      <div>
                        <h4 className="font-headers text-sm font-bold text-brand-navy text-left">{att.title}</h4>
                        <p className="text-xs text-text-muted leading-relaxed mt-1 text-left">{att.desc}</p>
                      </div>
                      <span className="text-[10px] font-bold text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded shrink-0">
                        {att.rating}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-border-gray/30 text-center">
                  <Link 
                    href={`/o-que-fazer/${destination.slug}`}
                    className="btn btn-outline py-2.5 px-4 text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    <span>Guia Completo "O Que Fazer"</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </section>

              {/* Climate section */}
              {destination.clima && (
                <section className="bg-white border border-border-gray p-6 sm:p-8 rounded-[24px] shadow-sm text-left flex flex-col gap-4">
                  <h2 className="font-headers text-lg sm:text-xl font-bold text-brand-navy flex items-center gap-2">
                    <CloudRain className="w-5 h-5 text-brand-orange shrink-0" />
                    <span>Clima & Melhor Época para Viajar</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-text-main leading-relaxed">
                    {destination.clima}
                  </p>
                  <Link 
                    href={`/melhor-epoca/${destination.slug}`}
                    className="text-xs font-bold text-brand-orange hover:underline flex items-center gap-1 mt-1"
                  >
                    <span>Ver tabela de clima e temperaturas por mês</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </section>
              )}

              {/* Restaurants section */}
              {destination.restaurants && destination.restaurants.length > 0 && (
                <section className="bg-white border border-border-gray p-6 sm:p-8 rounded-[24px] shadow-sm">
                  <h2 className="font-headers text-lg sm:text-xl font-bold text-brand-navy mb-6 flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-brand-orange shrink-0" />
                    <span>Onde Comer: Gastronomia Recomendada</span>
                  </h2>
                  <div className="flex flex-col gap-4">
                    {destination.restaurants.map((rest, i) => (
                      <div 
                        key={i}
                        className="p-4 rounded-xl border border-border-gray/70 bg-bg-light/20 flex flex-col sm:flex-row justify-between items-start gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-headers text-sm font-bold text-brand-navy">{rest.name}</h4>
                            <span className="text-[9px] font-extrabold text-brand-green bg-brand-green/10 px-2 py-0.5 rounded">{rest.type}</span>
                          </div>
                          <p className="text-xs text-text-muted mt-1.5 leading-relaxed">{rest.desc}</p>
                        </div>
                        <span className="text-xs font-bold text-brand-orange font-headers shrink-0 bg-white border border-border-gray px-2.5 py-1 rounded-lg">
                          {rest.priceRange}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Map block */}
              <section className="bg-white border border-border-gray p-6 sm:p-8 rounded-[24px] shadow-sm flex flex-col gap-4">
                <h2 className="font-headers text-lg sm:text-xl font-bold text-brand-navy flex items-center gap-2">
                  <Map className="w-5 h-5 text-brand-orange shrink-0" />
                  <span>Mapa de Passeios de {destination.name}</span>
                </h2>
                <div className="h-56 w-full rounded-2xl overflow-hidden border border-border-gray bg-bg-light relative flex items-center justify-center">
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-[0.2]"
                    style={{ backgroundImage: `url(${destination.image})` }}
                  />
                  <div className="relative z-10 bg-white/90 backdrop-blur-xs p-4 rounded-xl border border-border-gray shadow-md text-center max-w-[240px]">
                    <MapPin className="w-6 h-6 text-brand-orange mx-auto mb-1 animate-bounce" />
                    <h4 className="font-headers text-xs font-bold text-brand-navy">Mapa Interativo no App</h4>
                    <p className="text-[9px] text-text-muted mt-0.5">Navegue com rotas offline e GPS ativo direto no aplicativo 2GO.</p>
                    <button 
                      onClick={() => setIsDownloadOpen(true)}
                      className="btn btn-primary py-2 px-4 text-[9px] font-bold mt-2 cursor-pointer w-full justify-center"
                    >
                      Acessar no Celular
                    </button>
                  </div>
                </div>
              </section>

              {/* Lead Magnet PDF Box */}
              <LeadMagnetBox 
                destinationName={destination.name} 
                destinationSlug={destination.slug} 
              />

              {/* FAQs section */}
              {destination.faqs && destination.faqs.length > 0 && (
                <section className="bg-white border border-border-gray p-6 sm:p-8 rounded-[24px] shadow-sm">
                  <h2 className="font-headers text-lg sm:text-xl font-bold text-brand-navy mb-6">
                    Dúvidas frequentes de viajantes
                  </h2>
                  
                  <div className="flex flex-col gap-3">
                    {destination.faqs.map((faq, i) => (
                      <div 
                        key={i}
                        className="border border-border-gray rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFaq(i)}
                          className="w-full p-4 font-headers text-xs sm:text-sm font-bold text-brand-navy text-left flex justify-between items-center bg-bg-light/30 hover:bg-bg-light transition-colors cursor-pointer"
                        >
                          <span>{faq.q}</span>
                          <ChevronRight className={`w-4 h-4 text-brand-orange shrink-0 transform transition-transform ${
                            openFaqIndex === i ? 'rotate-90' : ''
                          }`} />
                        </button>
                        {openFaqIndex === i && (
                          <div className="p-4 text-xs sm:text-sm text-text-muted leading-relaxed border-t border-border-gray text-left bg-white">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>

            {/* Right side: CTAs and Roteiros */}
            <div className="lg:col-span-4 flex flex-col gap-6 w-full">
              
              {/* Cost Calculator promo Card */}
              <div className="bg-gradient-to-br from-brand-orange/5 to-white border border-brand-orange/15 p-6 rounded-[24px] shadow-sm text-left flex flex-col gap-3">
                <span className="text-[8.5px] font-extrabold text-brand-orange uppercase tracking-wider">CUSTO DA VIAGEM</span>
                <h4 className="font-headers font-bold text-brand-navy text-base leading-tight">Quanto custa viajar para {destination.name}?</h4>
                <p className="text-xs text-text-muted leading-relaxed">Veja estimativas diárias para mochileiros, orçamento confortável ou luxo e planeje suas finanças.</p>
                <Link 
                  href={`/quanto-custa/${destination.slug}`}
                  className="btn btn-secondary py-2.5 text-xs text-center justify-center font-bold mt-2"
                >
                  Ver Calculadora de Gastos
                </Link>
              </div>

              {/* Suggested itineraries */}
              <div className="bg-white border border-border-gray p-6 rounded-[24px] shadow-sm text-left">
                <h4 className="font-headers font-bold text-brand-navy text-sm border-b border-border-gray pb-3 mb-4">
                  Roteiros Prontos Curados
                </h4>
                
                {itineraries.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {itineraries.map((it) => (
                      <Link 
                        key={it.slug}
                        href={`/roteiros/${it.slug}`}
                        className="group p-3 rounded-xl border border-border-gray hover:border-brand-navy/30 transition-all flex justify-between items-center gap-4"
                      >
                        <div className="truncate">
                          <span className="text-[9px] font-bold text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded uppercase">
                            {it.duration} Dias
                          </span>
                          <span className="font-headers text-xs font-bold text-brand-navy block truncate mt-1 group-hover:text-brand-orange transition-colors">
                            {it.title.replace(`Roteiro ${destination.name}`, '').replace(':', '').trim() || it.title}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-border-gray shrink-0 group-hover:text-brand-orange transition-colors group-hover:translate-x-0.5" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-text-muted">Nenhum roteiro disponível no momento.</p>
                )}
              </div>

              {/* Start Planner pre-filled */}
              <div className="bg-brand-navy text-white p-6 rounded-[24px] shadow-sm text-left flex flex-col gap-4">
                <Sparkles className="w-8 h-8 text-brand-orange animate-pulse" />
                <div>
                  <h4 className="font-headers font-bold text-sm">Crie seu roteiro sob medida</h4>
                  <p className="text-[11px] text-white/70 mt-1 leading-normal">Nosso planejador inteligente pode criar uma viagem sob medida para {destination.name} baseada no seu orçamento exato e companhia de viagem.</p>
                </div>
                <Link 
                  href={`/planejamento/${destination.slug}`}
                  className="btn btn-secondary py-3 text-xs justify-center font-bold text-center w-full bg-brand-orange text-white hover:bg-white hover:text-brand-navy hover:scale-[1.01] active:scale-95 transition-all"
                >
                  Criar Roteiro Personalizado
                </Link>
              </div>

            </div>

          </div>

          {/* Affiliate Deals Section */}
          <div className="mt-12 w-full">
            <AffiliateDeals destination={destination} />
          </div>

          {/* Recommendation Engine Section */}
          <div className="mt-12 w-full">
            <RecommendationEngine currentDestination={destination} />
          </div>

          {/* Newsletter Box at the bottom of page */}
          <div className="mt-12 w-full">
            <NewsletterBox destinationName={destination.name} />
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

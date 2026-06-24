"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, MapPin, Sparkles, Map, Info, Star, ChevronRight } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import AppDownloadModal from './AppDownloadModal';
import LeadMagnetBox from './LeadMagnetBox';
import AffiliateDeals from './AffiliateDeals';
import JsonLd from './JsonLd';
import { getFAQSchema } from '@/lib/schema';
import { trackPageView } from '@/lib/analytics';

export default function WhatToDoClient({ destination }) {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    trackPageView('what_to_do', destination.slug);
  }, [destination.slug]);

  if (!destination) return null;

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqSchema = getFAQSchema(destination.faqs);

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />
      
      {/* Inject local FAQ schema */}
      {faqSchema && <JsonLd schema={faqSchema} />}

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-5xl text-left">
          
          <Breadcrumbs items={[
            { name: 'Destinos', url: '/destinos' },
            { name: destination.name, url: `/destinos/${destination.slug}` },
            { name: 'O Que Fazer', url: `/o-que-fazer/${destination.slug}` }
          ]} />

          {/* Page Title Block */}
          <header className="my-8">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3.5 py-1.5 rounded-full w-fit">
              GUIA DE ATRAÇÕES
            </span>
            <h1 className="font-headers text-3.5xl sm:text-5xl font-extrabold text-brand-navy mt-4 mb-4 tracking-tight leading-tight">
              O que fazer em {destination.name}: Guia Local
            </h1>
            <p className="text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
              Explore os principais pontos turísticos, horários de funcionamento, dicas secretas e planeje suas rotas de passeios em {destination.name}.
            </p>
          </header>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-8">
            
            {/* Left Column - Attractions, tips and map */}
            <div className="lg:col-span-8 flex flex-col gap-8 w-full">
              
              {/* Top Attractions section */}
              <section className="bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] shadow-sm flex flex-col gap-6">
                <h2 className="font-headers text-lg sm:text-xl font-extrabold text-brand-navy flex items-center gap-2">
                  <Star className="w-5 h-5 text-brand-orange shrink-0 fill-current" />
                  <span>Pontos Turísticos Imperdíveis</span>
                </h2>

                <div className="flex flex-col gap-5">
                  {destination.attractions && destination.attractions.map((att, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-2xl border border-border-gray/70 bg-bg-light/20 flex flex-col sm:flex-row justify-between items-start gap-4 hover:border-brand-navy/20 transition-all duration-300"
                    >
                      <div className="flex flex-col gap-1.5">
                        <h3 className="font-headers text-sm sm:text-base font-bold text-brand-navy">
                          {idx + 1}. {att.title}
                        </h3>
                        <p className="text-xs text-text-muted leading-relaxed">
                          {att.desc}
                        </p>
                        {att.hours && (
                          <span className="text-[10px] text-text-muted font-semibold flex items-center gap-1.5 mt-2">
                            <Clock className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                            <span>Horário sugerido: {att.hours}</span>
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-brand-orange bg-brand-orange/10 px-3 py-1.5 rounded-lg shrink-0">
                        {att.rating || '4.8★'}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Local tips */}
              {destination.localTips && destination.localTips.length > 0 && (
                <section className="bg-brand-orange/5 border border-brand-orange/10 p-6 sm:p-8 rounded-[28px] shadow-sm flex flex-col gap-4 text-left">
                  <h2 className="font-headers text-lg font-bold text-brand-orange flex items-center gap-2">
                    <Info className="w-5 h-5 shrink-0" />
                    <span>Dicas Locais dos Especialistas</span>
                  </h2>
                  <ul className="flex flex-col gap-3 list-none m-0 p-0 text-xs sm:text-sm text-brand-navy/85 leading-relaxed">
                    {destination.localTips.map((tip, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start">
                        <span className="w-2.5 h-2.5 rounded-full bg-brand-orange mt-1.5 shrink-0"></span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Mock Map view container */}
              <section className="bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] shadow-sm flex flex-col gap-4">
                <h2 className="font-headers text-lg sm:text-xl font-extrabold text-brand-navy flex items-center gap-2">
                  <Map className="w-5 h-5 text-brand-orange shrink-0" />
                  <span>Mapa de Rotas de {destination.name}</span>
                </h2>
                <p className="text-xs text-text-muted leading-relaxed">
                  Veja a localização geográfica aproximada e o agrupamento das principais atrações da cidade para otimizar suas caminhadas diárias.
                </p>

                {/* Map Mock container */}
                <div className="h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-border-gray bg-bg-light relative flex items-center justify-center">
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-[0.25] filter grayscale"
                    style={{ backgroundImage: `url(${destination.image})` }}
                  />
                  <div className="absolute inset-0 bg-brand-navy/5"></div>
                  
                  {/* Mock Map Indicators */}
                  <div className="relative z-10 bg-white/90 backdrop-blur-md border border-border-gray p-5 rounded-2xl shadow-xl text-center max-w-[280px]">
                    <MapPin className="w-8 h-8 text-brand-orange mx-auto mb-2 animate-bounce" />
                    <h4 className="font-headers text-xs font-bold text-brand-navy">Visualizador de Mapas 2GO</h4>
                    <p className="text-[10px] text-text-muted mt-1 leading-normal">
                      Importe o roteiro no aplicativo 2GO para navegar com rotas offline e GPS ativo no seu celular.
                    </p>
                    <button 
                      onClick={() => setIsDownloadOpen(true)}
                      className="btn btn-primary py-2 px-4 text-[10px] font-bold mt-3 cursor-pointer w-full justify-center"
                    >
                      Ver no Celular
                    </button>
                  </div>
                </div>
              </section>

              {/* Affiliate Deals Section */}
              <div className="my-4">
                <AffiliateDeals destination={destination} />
              </div>

              {/* Lead Magnet Guia PDF */}
              <LeadMagnetBox 
                destinationName={destination.name} 
                destinationSlug={destination.slug} 
              />

              {/* Local FAQs accordion */}
              {destination.faqs && destination.faqs.length > 0 && (
                <section className="bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] shadow-sm flex flex-col gap-6">
                  <h2 className="font-headers text-lg sm:text-xl font-extrabold text-brand-navy">
                    Dúvidas sobre {destination.name}
                  </h2>
                  <div className="flex flex-col gap-3">
                    {destination.faqs.map((faq, i) => (
                      <div 
                        key={i}
                        className="border border-border-gray rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFaq(i)}
                          className="w-full p-4 font-headers text-xs sm:text-sm font-bold text-brand-navy text-left flex justify-between items-center bg-bg-light/20 hover:bg-bg-light transition-colors cursor-pointer"
                        >
                          <span>{faq.q}</span>
                          <ChevronRight className={`w-4 h-4 text-brand-orange shrink-0 transform transition-transform ${
                            openFaqIndex === i ? 'rotate-90' : ''
                          }`} />
                        </button>
                        {openFaqIndex === i && (
                          <div className="p-4 text-xs sm:text-sm text-text-muted leading-relaxed border-t border-border-gray bg-white text-left">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>

            {/* Right Column - CTAs Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-6 w-full text-left">
              
              {/* Planner promo */}
              <div className="bg-brand-navy text-white p-6 rounded-[24px] shadow-sm flex flex-col gap-4">
                <Sparkles className="w-8 h-8 text-brand-orange animate-pulse" />
                <div>
                  <h4 className="font-headers font-bold text-sm">Gostou das atrações?</h4>
                  <p className="text-[11px] text-white/70 mt-1 leading-normal">
                    Deixe que a 2GO crie uma programação diária inteligente para você em segundos, organizando os tempos de deslocamento e visitas.
                  </p>
                </div>
                <Link 
                  href={`/planejamento/${destination.slug}`}
                  className="btn btn-secondary py-3 text-xs justify-center font-bold text-center w-full bg-brand-orange text-white hover:bg-white hover:text-brand-navy transition-all"
                >
                  Gerar Roteiro Grátis
                </Link>
              </div>

              {/* Consulting promo */}
              <div className="bg-white border border-border-gray p-6 rounded-[24px] shadow-sm flex flex-col gap-3">
                <span className="text-[8.5px] font-extrabold text-brand-orange uppercase tracking-wider">CURADORIA HUMANA</span>
                <h4 className="font-headers font-bold text-brand-navy text-sm leading-tight">Quer suporte de especialistas?</h4>
                <p className="text-[11px] text-text-muted leading-relaxed">Conecte-se com um consultor local premium da 2GO para criar um roteiro 100% sob medida e fechar reservas.</p>
                <Link 
                  href="/premium"
                  className="btn btn-outline py-2.5 text-xs text-center justify-center font-bold mt-2"
                >
                  Falar com Consultor
                </Link>
              </div>

            </div>

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

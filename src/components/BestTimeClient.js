"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, CloudRain, Sun, Thermometer, Info, ChevronRight, Sparkles } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import AppDownloadModal from './AppDownloadModal';
import LeadMagnetBox from './LeadMagnetBox';
import JsonLd from './JsonLd';
import { getFAQSchema } from '@/lib/schema';
import { trackPageView } from '@/lib/analytics';

// Month seasonal data simulator for visual aesthetics
const europeSeasons = [
  { month: 'Jan', temp: '5°C', status: 'Frio / Baixa Temp', color: 'bg-blue-100 text-blue-700' },
  { month: 'Fev', temp: '6°C', status: 'Frio / Baixa Temp', color: 'bg-blue-100 text-blue-700' },
  { month: 'Mar', temp: '10°C', status: 'Ameno / Média Temp', color: 'bg-orange-100 text-orange-700' },
  { month: 'Abr', temp: '15°C', status: 'Excelente / Média Temp', color: 'bg-green-100 text-green-700 font-bold border border-green-200' },
  { month: 'Mai', temp: '19°C', status: 'Excelente / Média Temp', color: 'bg-green-100 text-green-700 font-bold border border-green-200' },
  { month: 'Jun', temp: '23°C', status: 'Quente / Alta Temp', color: 'bg-red-100 text-red-700' },
  { month: 'Jul', temp: '26°C', status: 'Quente / Alta Temp', color: 'bg-red-100 text-red-700' },
  { month: 'Ago', temp: '26°C', status: 'Quente / Alta Temp', color: 'bg-red-100 text-red-700' },
  { month: 'Set', temp: '21°C', status: 'Excelente / Média Temp', color: 'bg-green-100 text-green-700 font-bold border border-green-200' },
  { month: 'Out', temp: '16°C', status: 'Excelente / Média Temp', color: 'bg-green-100 text-green-700 font-bold border border-green-200' },
  { month: 'Nov', temp: '10°C', status: 'Ameno / Média Temp', color: 'bg-orange-100 text-orange-700' },
  { month: 'Dez', temp: '6°C', status: 'Frio / Média Temp', color: 'bg-blue-100 text-blue-700' }
];

const brazilSeasons = [
  { month: 'Jan', temp: '28°C', status: 'Quente / Alta Temp', color: 'bg-red-100 text-red-700' },
  { month: 'Fev', temp: '28°C', status: 'Quente / Alta Temp', color: 'bg-red-100 text-red-700' },
  { month: 'Mar', temp: '26°C', status: 'Ameno / Média Temp', color: 'bg-orange-100 text-orange-700' },
  { month: 'Abr', temp: '23°C', status: 'Excelente / Média Temp', color: 'bg-green-100 text-green-700 font-bold border border-green-200' },
  { month: 'Mai', temp: '19°C', status: 'Excelente / Média Temp', color: 'bg-green-100 text-green-700 font-bold border border-green-200' },
  { month: 'Jun', temp: '15°C', status: 'Frio / Média Temp', color: 'bg-blue-100 text-blue-700' },
  { month: 'Jul', temp: '14°C', status: 'Frio / Alta Temp', color: 'bg-blue-100 text-blue-700 font-bold border border-blue-200' },
  { month: 'Ago', temp: '15°C', status: 'Frio / Alta Temp', color: 'bg-blue-100 text-blue-700 font-bold border border-blue-200' },
  { month: 'Set', temp: '18°C', status: 'Ameno / Média Temp', color: 'bg-orange-100 text-orange-700' },
  { month: 'Out', temp: '21°C', status: 'Excelente / Média Temp', color: 'bg-green-100 text-green-700 font-bold border border-green-200' },
  { month: 'Nov', temp: '23°C', status: 'Excelente / Alta Temp', color: 'bg-red-100 text-red-700' },
  { month: 'Dez', temp: '26°C', status: 'Excelente / Alta Temp', color: 'bg-red-100 text-red-700' }
];

export default function BestTimeClient({ destination }) {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    trackPageView('best_time', destination.slug);
  }, [destination.slug]);

  if (!destination) return null;

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const isBrazil = destination.country === 'Brasil';
  const seasonsData = isBrazil ? brazilSeasons : europeSeasons;

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
            { name: 'Melhor Época', url: `/melhor-epoca/${destination.slug}` }
          ]} />

          {/* Title Header */}
          <header className="my-8">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3 py-1.5 rounded-full w-fit">
              PLANEJAMENTO CLIMÁTICO
            </span>
            <h1 className="font-headers text-3.5xl sm:text-5xl font-extrabold text-brand-navy mt-4 mb-4 tracking-tight leading-tight">
              Melhor época para viajar para {destination.name}
            </h1>
            <p className="text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
              Descubra quando ir para {destination.name}, temperaturas médias mensais, períodos de chuva e dicas sobre alta e baixa temporada.
            </p>
          </header>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-8">
            
            {/* Left Column: Climate Info */}
            <div className="lg:col-span-8 flex flex-col gap-8 w-full">
              
              {/* Climate description */}
              <section className="bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] shadow-sm flex flex-col gap-4 text-left">
                <h2 className="font-headers text-lg sm:text-xl font-extrabold text-brand-navy flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-brand-orange shrink-0" />
                  <span>Resumo do Clima local</span>
                </h2>
                <p className="text-xs sm:text-sm text-text-main leading-relaxed">
                  {destination.clima || `${destination.name} possui um clima característico de sua região (${destination.country}). ${destination.weatherInfo}`}
                </p>
                <div className="bg-bg-light border border-border-gray p-4 rounded-xl flex items-start gap-3 mt-2">
                  <Info className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                  <p className="text-[11px] text-text-muted leading-relaxed">
                    <strong>Dica de Planejamento:</strong> Se você busca economizar, prefira viajar nos meses de "ombro" (estações intermediárias), que combinam clima excelente e tarifas aéreas e hoteleiras até 40% mais baratas.
                  </p>
                </div>
              </section>

              {/* Monthly season calendar chart */}
              <section className="bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] shadow-sm flex flex-col gap-4 text-left">
                <h2 className="font-headers text-lg sm:text-xl font-extrabold text-brand-navy flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-brand-orange shrink-0" />
                  <span>Tabela de Estações e Temperaturas por Mês</span>
                </h2>
                <p className="text-xs text-text-muted leading-relaxed">
                  Confira as médias históricas aproximadas de temperatura e o status de fluxo de turistas (temporada) por mês.
                </p>

                {/* Calendar Grid */}
                <div className="flex flex-col gap-2 mt-4">
                  {seasonsData.map((m, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between border-b border-border-gray/40 pb-2.5 last:border-b-0"
                    >
                      <span className="font-headers text-xs sm:text-sm font-bold text-brand-navy w-16">{m.month}</span>
                      <span className="text-xs text-text-main font-semibold flex items-center gap-1">
                        <Sun className="w-3.5 h-3.5 text-brand-orange" />
                        <span>{m.temp}</span>
                      </span>
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${m.color}`}>
                        {m.status}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* PDF Guide Lead Magnet */}
              <LeadMagnetBox 
                destinationName={destination.name}
                destinationSlug={destination.slug}
              />

              {/* FAQ Accordion */}
              {destination.faqs && destination.faqs.length > 0 && (
                <section className="bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] shadow-sm flex flex-col gap-6">
                  <h2 className="font-headers text-lg sm:text-xl font-extrabold text-brand-navy">
                    Dúvidas sobre o Clima & Viagens
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

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-6 w-full text-left">
              
              {/* Planner promo */}
              <div className="bg-brand-navy text-white p-6 rounded-[24px] shadow-sm flex flex-col gap-4">
                <Sparkles className="w-8 h-8 text-brand-orange animate-pulse" />
                <div>
                  <h4 className="font-headers font-bold text-sm">Gostou das dicas?</h4>
                  <p className="text-[11px] text-white/70 mt-1 leading-normal">
                    Selecione a data da sua viagem no nosso planejador e receba um roteiro personalizado que se adapta ao clima da época.
                  </p>
                </div>
                <Link 
                  href={`/planejamento/${destination.slug}`}
                  className="btn btn-secondary py-3 text-xs justify-center font-bold text-center w-full bg-brand-orange text-white hover:bg-white hover:text-brand-navy transition-all"
                >
                  Criar Roteiro Inteligente
                </Link>
              </div>

              {/* Support consulting */}
              <div className="bg-white border border-border-gray p-6 rounded-[24px] shadow-sm flex flex-col gap-3">
                <span className="text-[8.5px] font-extrabold text-brand-orange uppercase tracking-wider font-headers">SUPORTE EXCLUSIVO</span>
                <h4 className="font-headers font-bold text-brand-navy text-sm leading-tight">Deseja uma viagem perfeita?</h4>
                <p className="text-[11px] text-text-muted leading-relaxed">Conecte-se com um especialista local da 2GO para planejar a sua viagem sob medida considerando a melhor época climática.</p>
                <Link 
                  href="/premium"
                  className="btn btn-outline py-2.5 text-xs text-center justify-center font-bold mt-2"
                >
                  Falar com Especialista
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

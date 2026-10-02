"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Star, 
  Sparkles,
  Info,
  ShieldCheck,
  FileText,
  Utensils,
  Hotel,
  Compass,
  Globe,
  Coins,
  Plane,
  Wifi,
  ShoppingBag,
  Moon,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Check,
  X
} from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppDownloadModal from '@/components/AppDownloadModal';
import NewsletterBox from '@/components/NewsletterBox';

export default function GuideArticleClient({ guide }) {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('introducao');
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  const sectionsList = [
    { id: 'introducao', label: '1. Introdução' },
    { id: 'por-que-visitar', label: '2. Por que Visitar' },
    { id: 'quando-ir', label: '3. Quando Ir' },
    { id: 'quantos-dias', label: '4. Quantos Dias Ficar' },
    { id: 'como-chegar', label: '5. Como Chegar' },
    { id: 'documentacao', label: '6. Documentação & Vistos' },
    { id: 'seguro-viagem', label: '7. Seguro Viagem' },
    { id: 'internet', label: '8. Internet & Conectividade' },
    { id: 'moeda-idioma', label: '9. Moeda & Idioma' },
    { id: 'onde-ficar', label: '10. Onde Ficar (Regiões)' },
    { id: 'transporte', label: '11. Como se Locomover' },
    { id: 'atracoes', label: '12. Principais Atrações' },
    { id: 'roteiro-sugerido', label: '13. Roteiro Sugerido' },
    { id: 'bate-volta', label: '14. Passeios Bate-Volta' },
    { id: 'gastronomia', label: '15. Onde Comer' },
    { id: 'compras-noite', label: '16. Compras & Vida Noturna' },
    { id: 'custos', label: '17. Custos Médios' },
    { id: 'erros-dicas', label: '18. Erros & Dicas' },
    { id: 'resumo-rapido', label: '19. Resumo Rápido' },
    { id: 'faq', label: '20. Perguntas Frequentes (FAQ)' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      for (const item of sectionsList) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const toggleFaq = (idx) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  if (!guide) return null;

  return (
    <div className="w-full bg-white min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header solid onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1440px] w-full text-left">
          
          {/* Breadcrumb & Return Link */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <Breadcrumbs 
              items={[
                { name: 'Blog', url: '/blog' },
                { name: guide.title, url: `/blog/${guide.slug}` }
              ]} 
            />
            <Link 
              href="/blog" 
              className="text-xs font-bold text-brand-orange hover:underline flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Blog
            </Link>
          </div>

          <header className="my-6 max-w-4xl text-left">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3 py-1.5 rounded-full font-headers uppercase">
                Destino
              </span>
              <span className="bg-brand-navy/10 text-brand-navy text-[10px] font-extrabold tracking-widest px-3 py-1.5 rounded-full font-headers uppercase">
                Guia oficial 2GO
              </span>
            </div>

            <h1 className="font-headers text-3xl sm:text-4.5xl md:text-5.5xl font-extrabold text-brand-navy mb-4 tracking-tight leading-tight">
              {guide.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-text-muted leading-relaxed max-w-3xl font-body">
              {guide.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsDownloadOpen(true)}
                className="inline-flex items-center justify-center bg-brand-navy hover:bg-brand-navy/90 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-sm transition-all"
              >
                Baixar o App
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              <span className="inline-flex items-center gap-2 bg-[#F4F6F9] text-brand-navy text-xs font-semibold px-4 py-2 rounded-full">
                <Coins className="w-3.5 h-3.5 text-brand-orange" />
                Moeda
                <span className="font-extrabold">{guide.currency}</span>
              </span>
              <span className="inline-flex items-center gap-2 bg-[#F4F6F9] text-brand-navy text-xs font-semibold px-4 py-2 rounded-full">
                <Globe className="w-3.5 h-3.5 text-brand-navy" />
                Idioma
                <span className="font-extrabold">{guide.language}</span>
              </span>
            </div>
          </header>

          <div className="w-full h-72 sm:h-96 md:h-[480px] rounded-[32px] overflow-hidden my-8 shadow-md relative bg-bg-light">
            <img
              src={guide.heroImage}
              alt={guide.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* MAIN GRID: Sidebar TOC (Left/Right) + Content Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Sticky Table of Contents (Desktop Sidebar) */}
            <aside className="hidden lg:block lg:col-span-3 sticky top-28 bg-white border border-border-gray/80 p-6 rounded-[24px] shadow-xs max-h-[82vh] overflow-y-auto scrollbar-hide">
              <h3 className="font-headers text-xs font-extrabold text-brand-navy uppercase tracking-wider mb-4 pb-2 border-b border-border-gray/40">
                Sumário do Guia
              </h3>
              <nav className="flex flex-col gap-1.5 text-xs font-semibold">
                {sectionsList.map(sec => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => scrollToSection(e, sec.id)}
                    className={`py-1.5 px-3 rounded-lg transition-all text-left block truncate ${
                      activeSection === sec.id 
                        ? 'bg-brand-orange/10 text-brand-orange font-bold' 
                        : 'text-text-muted hover:text-brand-navy hover:bg-bg-light/60'
                    }`}
                  >
                    {sec.label}
                  </a>
                ))}
              </nav>

              {/* Sidebar Contextual CTA */}
              <div className="mt-6 pt-4 border-t border-border-gray/40 text-left">
                <span className="text-[10px] font-extrabold text-brand-orange uppercase block mb-1">
                  No aplicativo
                </span>
                <p className="text-xs text-brand-navy font-bold mb-3 leading-snug">
                  A timeline, o mapa e os ajustes de {guide.city} ficam no app.
                </p>
                <button
                  type="button"
                  onClick={() => setIsDownloadOpen(true)}
                  className="bg-brand-navy hover:bg-brand-navy/90 text-white font-extrabold text-xs py-2.5 px-4 rounded-xl w-full flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <span>Baixar o App</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </aside>

            {/* Main Content Column */}
            <div className="lg:col-span-9 space-y-12 text-left font-body">

              {/* 1. Introdução */}
              <section id="introducao" className="bg-white border border-border-gray/80 p-6 sm:p-8 rounded-[28px] shadow-xs">
                <h2 className="font-headers text-2xl font-extrabold text-brand-navy mb-4">
                  1. Introdução a {guide.city}
                </h2>
                <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                  {guide.intro}
                </p>
              </section>

              {/* 2. Por que Visitar */}
              <section id="por-que-visitar" className="bg-white border border-border-gray/80 p-6 sm:p-8 rounded-[28px] shadow-xs">
                <h2 className="font-headers text-2xl font-extrabold text-brand-navy mb-4">
                  2. Por que Visitar {guide.city}?
                </h2>
                <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                  {guide.whyVisit}
                </p>
              </section>

              {/* 3. Quando Ir */}
              <section id="quando-ir" className="bg-white border border-border-gray/80 p-6 sm:p-8 rounded-[28px] shadow-xs">
                <h2 className="font-headers text-2xl font-extrabold text-brand-navy mb-4">
                  3. Quando Ir (Clima e Estações)
                </h2>
                <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                  {guide.whenToGo}
                </p>
              </section>

              {/* 4. Quantos Dias Ficar */}
              <section id="quantos-dias" className="bg-white border border-border-gray/80 p-6 sm:p-8 rounded-[28px] shadow-xs">
                <h2 className="font-headers text-2xl font-extrabold text-brand-navy mb-4">
                  4. Quantos Dias Ficar em {guide.city}?
                </h2>
                <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                  {guide.idealDays}
                </p>
              </section>

              {/* 5. Como Chegar */}
              <section id="como-chegar" className="bg-white border border-border-gray/80 p-6 sm:p-8 rounded-[28px] shadow-xs">
                <h2 className="font-headers text-2xl font-extrabold text-brand-navy mb-4">
                  5. Como Chegar e Deslocamento dos Aeroportos
                </h2>
                <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                  {guide.howToGet}
                </p>
              </section>

              {/* 6. Documentação & Vistos */}
              <section id="documentacao" className="bg-white border border-border-gray/80 p-6 sm:p-8 rounded-[28px] shadow-xs">
                <h2 className="font-headers text-2xl font-extrabold text-brand-navy mb-4">
                  6. Documentação Obrigatória &amp; Vistos
                </h2>
                <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                  {guide.documentation}
                </p>
              </section>

              {/* 7. Seguro Viagem */}
              <section id="seguro-viagem" className="bg-white border border-border-gray/80 p-6 sm:p-8 rounded-[28px] shadow-xs">
                <h2 className="font-headers text-2xl font-extrabold text-brand-navy mb-4">
                  7. Seguro Viagem
                </h2>
                <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                  {guide.insurance}
                </p>
              </section>

              {/* 8. Internet & Conectividade */}
              <section id="internet" className="bg-white border border-border-gray/80 p-6 sm:p-8 rounded-[28px] shadow-xs">
                <h2 className="font-headers text-2xl font-extrabold text-brand-navy mb-4">
                  8. Internet &amp; eSIM no Destino
                </h2>
                <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                  {guide.internet}
                </p>
              </section>

              {/* 9. Moeda & Idioma */}
              <section id="moeda-idioma" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-border-gray/80 p-6 rounded-[24px] shadow-xs">
                  <h3 className="font-headers text-xl font-extrabold text-brand-navy mb-3 flex items-center gap-2">
                    <Coins className="w-5 h-5 text-brand-orange" /> Moeda &amp; Pagamentos
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {guide.currencyInfo}
                  </p>
                </div>
                <div className="bg-white border border-border-gray/80 p-6 rounded-[24px] shadow-xs">
                  <h3 className="font-headers text-xl font-extrabold text-brand-navy mb-3 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-brand-navy" /> Idioma &amp; Atendimento
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {guide.languageInfo}
                  </p>
                </div>
              </section>

              {/* 10. Onde Ficar (Análise Completa de Regiões) */}
              <section id="onde-ficar" className="scroll-mt-28">
                <h2 className="font-headers text-2xl sm:text-3xl font-extrabold text-brand-navy mb-6">
                  10. Onde se Hospedar em {guide.city}: Melhores Bairros
                </h2>
                <div className="space-y-4">
                  {guide.neighborhoods.map((n, idx) => (
                    <div key={idx} className="bg-white border border-border-gray/80 p-6 rounded-[24px] shadow-xs">
                      <h3 className="font-headers text-lg font-extrabold text-brand-navy mb-3">
                        {n.name}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                        <div className="bg-green-50/60 border border-green-200/80 p-3.5 rounded-xl">
                          <span className="font-bold text-green-900 flex items-center gap-1.5 mb-1">
                            <Check className="w-4 h-4 text-green-600 shrink-0" /> Vantagens:
                          </span>
                          <p className="text-green-800 leading-relaxed">{n.pros}</p>
                        </div>
                        <div className="bg-amber-50/60 border border-amber-200/80 p-3.5 rounded-xl">
                          <span className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                            <X className="w-4 h-4 text-amber-600 shrink-0" /> Desvantagens:
                          </span>
                          <p className="text-amber-800 leading-relaxed">{n.cons}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 11. Como se Locomover */}
              <section id="transporte" className="bg-white border border-border-gray/80 p-6 sm:p-8 rounded-[28px] shadow-xs">
                <h2 className="font-headers text-2xl font-extrabold text-brand-navy mb-4">
                  11. Como se Locomover em {guide.city}
                </h2>
                <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                  {guide.transportDetails}
                </p>
              </section>

              {/* 12. Principais Atrações */}
              <section id="atracoes" className="scroll-mt-28">
                <h2 className="font-headers text-2xl sm:text-3xl font-extrabold text-brand-navy mb-6">
                  12. Principais Atrações Imperdíveis
                </h2>

                <div className="space-y-6">
                  {guide.attractions.map((att, idx) => (
                    <div key={idx} className="bg-white border border-border-gray/80 rounded-[28px] p-6 sm:p-8 shadow-xs text-left">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                        <h3 className="font-headers text-xl font-extrabold text-brand-navy">
                          {att.name}
                        </h3>
                        <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                          Prioridade {att.priority}
                        </span>
                      </div>

                      <p className="text-sm text-text-muted mb-3 leading-relaxed">
                        {att.desc}
                      </p>

                      <div className="bg-bg-light/80 p-4 rounded-xl mb-4 border border-border-gray/50">
                        <span className="text-xs font-bold text-brand-navy uppercase block mb-1">
                          Por que visitar:
                        </span>
                        <p className="text-xs text-text-muted leading-relaxed">
                          {att.whyVisit}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-semibold text-text-muted mb-4">
                        <div className="bg-white p-3 rounded-xl border border-border-gray/60">
                          <span className="block text-[10px] text-text-muted/70 uppercase">Preço:</span>
                          <span className="text-brand-navy font-bold">{att.price}</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-border-gray/60">
                          <span className="block text-[10px] text-text-muted/70 uppercase">Duração recomendada:</span>
                          <span className="text-brand-navy font-bold">{att.duration}</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-border-gray/60">
                          <span className="block text-[10px] text-text-muted/70 uppercase">Horário ideal:</span>
                          <span className="text-brand-navy font-bold">{att.bestTime}</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-border-gray/60">
                          <span className="block text-[10px] text-text-muted/70 uppercase">Reserva prévia:</span>
                          <span className="text-brand-orange font-extrabold">{att.reservation}</span>
                        </div>
                      </div>

                      <div className="bg-brand-orange/5 border border-brand-orange/20 p-3.5 rounded-xl flex items-start gap-2.5 text-xs">
                        <Sparkles className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                        <div>
                          <span className="font-extrabold text-brand-orange uppercase block mb-0.5">Dica da 2GO:</span>
                          <span className="text-brand-navy leading-relaxed">{att.tip2GO}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 13. Roteiro Sugerido */}
              <section id="roteiro-sugerido" className="bg-white border border-border-gray/80 p-6 sm:p-8 rounded-[28px] shadow-xs">
                <h2 className="font-headers text-2xl font-extrabold text-brand-navy mb-6">
                  13. Roteiro Sugerido Dia a Dia em {guide.city}
                </h2>
                <div className="space-y-4">
                  {guide.suggestedItinerary.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-bg-light/60 border border-border-gray/60">
                      <span className="text-xs font-extrabold text-brand-orange uppercase tracking-wider block mb-1">
                        {item.day}: {item.title}
                      </span>
                      <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                        {item.details}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 14. Passeios Bate-Volta */}
              <section id="bate-volta" className="bg-white border border-border-gray/80 p-6 sm:p-8 rounded-[28px] shadow-xs">
                <h2 className="font-headers text-2xl font-extrabold text-brand-navy mb-4">
                  14. Passeios Bate-Volta Recomendados
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {guide.dayTrips.map((trip, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-border-gray/60 bg-white text-xs font-semibold text-brand-navy flex items-center gap-2">
                      <Compass className="w-4 h-4 text-brand-orange shrink-0" />
                      <span>{trip}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* 15. Gastronomia */}
              <section id="gastronomia" className="bg-white border border-border-gray/80 p-6 sm:p-8 rounded-[28px] shadow-xs">
                <h2 className="font-headers text-2xl font-extrabold text-brand-navy mb-4">
                  15. Gastronomia &amp; O que Comer
                </h2>
                <div className="flex flex-wrap gap-2">
                  {guide.gastronomy.map((item, idx) => (
                    <span key={idx} className="bg-bg-light border border-border-gray/60 text-brand-navy text-xs font-bold px-3.5 py-2 rounded-xl">
                      🍽️ {item}
                    </span>
                  ))}
                </div>
              </section>

              {/* 16. Compras & Vida Noturna */}
              <section id="compras-noite" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-border-gray/80 p-6 rounded-[24px] shadow-xs">
                  <h3 className="font-headers text-xl font-extrabold text-brand-navy mb-3 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-brand-orange" /> Onde Fazer Compras
                  </h3>
                  <ul className="space-y-2 text-xs text-text-muted">
                    {guide.shopping.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white border border-border-gray/80 p-6 rounded-[24px] shadow-xs">
                  <h3 className="font-headers text-xl font-extrabold text-brand-navy mb-3 flex items-center gap-2">
                    <Moon className="w-5 h-5 text-brand-navy" /> Vida Noturna
                  </h3>
                  <ul className="space-y-2 text-xs text-text-muted">
                    {guide.nightlife.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-navy shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* 17. Custos Médios */}
              <section id="custos" className="scroll-mt-28">
                <h2 className="font-headers text-2xl sm:text-3xl font-extrabold text-brand-navy mb-6">
                  17. Tabela de Custos Médios em {guide.city}
                </h2>

                <div className="overflow-x-auto bg-white border border-border-gray/80 rounded-[28px] shadow-xs">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-bg-light border-b border-border-gray/60 font-headers text-brand-navy">
                        <th className="p-4 font-extrabold">Perfil</th>
                        <th className="p-4 font-extrabold">Orçamento Diário</th>
                        <th className="p-4 font-extrabold">Hospedagem</th>
                        <th className="p-4 font-extrabold">Alimentação</th>
                        <th className="p-4 font-extrabold">Transporte</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-gray/40 text-text-muted font-body">
                      <tr>
                        <td className="p-4 font-extrabold text-brand-navy">Econômico</td>
                        <td className="p-4 font-bold text-brand-orange">{guide.costsTable.economy.daily}</td>
                        <td className="p-4">{guide.costsTable.economy.hotel}</td>
                        <td className="p-4">{guide.costsTable.economy.food}</td>
                        <td className="p-4">{guide.costsTable.economy.transport}</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-extrabold text-brand-navy">Intermediário</td>
                        <td className="p-4 font-bold text-brand-orange">{guide.costsTable.comfort.daily}</td>
                        <td className="p-4">{guide.costsTable.comfort.hotel}</td>
                        <td className="p-4">{guide.costsTable.comfort.food}</td>
                        <td className="p-4">{guide.costsTable.comfort.transport}</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-extrabold text-brand-navy">Luxo</td>
                        <td className="p-4 font-bold text-brand-orange">{guide.costsTable.luxury.daily}</td>
                        <td className="p-4">{guide.costsTable.luxury.hotel}</td>
                        <td className="p-4">{guide.costsTable.luxury.food}</td>
                        <td className="p-4">{guide.costsTable.luxury.transport}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 18. Erros & Dicas */}
              <section id="erros-dicas" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-border-gray/80 p-6 rounded-[24px] shadow-xs">
                  <h3 className="font-headers text-lg font-extrabold text-brand-navy mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-brand-orange" /> Erros Mais Comuns
                  </h3>
                  <ul className="space-y-3 text-xs text-text-muted">
                    {guide.commonMistakes.map((err, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-brand-orange font-bold">•</span>
                        <span>{err}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white border border-border-gray/80 p-6 rounded-[24px] shadow-xs">
                  <h3 className="font-headers text-lg font-extrabold text-brand-navy mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-brand-navy" /> Dicas Importantes
                  </h3>
                  <ul className="space-y-3 text-xs text-text-muted">
                    {guide.importantTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-brand-navy font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* 19. Resumo Rápido */}
              <section id="resumo-rapido" className="bg-white border border-border-gray/80 p-6 sm:p-8 rounded-[28px] shadow-xs">
                <h2 className="font-headers text-xl sm:text-2xl font-extrabold text-brand-navy mb-3">
                  19. Resumo Rápido para Salvar
                </h2>
                <p className="text-sm text-text-muted leading-relaxed font-body">
                  {guide.summaryText}
                </p>
              </section>

              {/* 20. FAQ (Aprox. 15 Perguntas Frequentes por Destino) */}
              <section id="faq" className="scroll-mt-28">
                <h2 className="font-headers text-2xl sm:text-3xl font-extrabold text-brand-navy mb-6 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-brand-orange" /> 20. Perguntas Frequentes sobre {guide.city} (FAQ)
                </h2>

                <div className="space-y-3">
                  {guide.faqs.map((faq, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white border border-border-gray/80 rounded-2xl overflow-hidden shadow-2xs transition-all"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 text-left flex justify-between items-center gap-4 cursor-pointer hover:bg-bg-light/50 transition-colors"
                      >
                        <span className="font-headers text-xs sm:text-sm font-extrabold text-brand-navy">
                          {faq.q}
                        </span>
                        {openFaqIdx === idx ? (
                          <ChevronUp className="w-4 h-4 text-brand-orange shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-text-muted shrink-0" />
                        )}
                      </button>
                      
                      {openFaqIdx === idx && (
                        <div className="p-4 pt-0 text-xs sm:text-sm text-text-muted leading-relaxed font-body border-t border-border-gray/40 bg-bg-light/30">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* CONTEXTUAL CTA */}
              <div className="bg-brand-navy text-white rounded-[32px] p-8 sm:p-12 text-center shadow-md my-12">
                <span className="text-[10px] font-extrabold text-brand-orange uppercase tracking-widest block mb-2 font-headers">
                  Leve {guide.city} no app
                </span>
                <h3 className="font-headers text-2xl sm:text-3.5xl font-extrabold mb-4 leading-tight">
                  O dia a dia fica no aplicativo
                </h3>
                <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto mb-6 leading-relaxed font-body">
                  Este guia é a prévia. Timeline, mapa e ajustes da viagem para {guide.city} você acompanha no app.
                </p>
                <button
                  type="button"
                  onClick={() => setIsDownloadOpen(true)}
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white font-extrabold text-sm py-4 px-8 rounded-2xl inline-flex items-center gap-2 transition-all shadow-sm hover:scale-[1.02] cursor-pointer"
                >
                  <span>Baixar o App</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>

          {/* Newsletter Box */}
          <div className="mt-16 w-full">
            <NewsletterBox destinationName={guide.city} />
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

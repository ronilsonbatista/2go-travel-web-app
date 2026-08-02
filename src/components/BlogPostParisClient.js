"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Check, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Smartphone, 
  Star, 
  ChevronRight,
  Sparkles,
  Info,
  ShieldCheck,
  FileText,
  Utensils,
  Hotel,
  Compass
} from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppDownloadModal from '@/components/AppDownloadModal';
import NewsletterBox from '@/components/NewsletterBox';

export default function BlogPostParisClient() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('resumo');

  // Track active section on scroll for sidebar TOC
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'resumo', 'atracoes', 'quanto-tempo', 'melhor-epoca', 
        'hospedagem', 'transporte', 'custos', 'restaurantes', 
        'documentacao', 'erros-comuns'
      ];
      
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
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

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1440px] w-full text-left">
          
          {/* Breadcrumb & Back Link */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <Breadcrumbs 
              items={[
                { name: 'Blog', url: '/blog' },
                { name: 'Como planejar uma viagem para Paris...', url: '/blog/como-planejar-viagem-paris' }
              ]} 
            />
            <Link 
              href="/blog" 
              className="text-xs font-bold text-brand-orange hover:underline flex items-center gap-1.5 shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao blog
            </Link>
          </div>

          {/* Article Header (Matches Reference Layout) */}
          <header className="my-6 max-w-4xl text-left">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3 py-1.5 rounded-full w-fit font-headers uppercase">
              PLANEJAMENTO
            </span>
            
            <h1 className="font-headers text-3xl sm:text-4.5xl md:text-5xl font-extrabold text-brand-navy mt-4 mb-4 tracking-tight leading-tight">
              Como planejar uma viagem para Paris sem estresse
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-text-muted leading-relaxed max-w-3xl mb-6">
              Descubra os passos essenciais para organizar sua viagem, escolher onde ficar, entender o metrô e evitar os erros mais comuns em Paris.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted border-t border-b border-border-gray/50 py-3.5">
              <span className="font-semibold text-brand-navy">📅 12 Junho 2026</span>
              <span>•</span>
              <span className="flex items-center gap-1 font-semibold text-brand-navy">
                <Clock className="w-3.5 h-3.5 text-brand-orange" /> 12 min de leitura
              </span>
              <span>•</span>
              <span className="font-semibold text-brand-navy">📍 Moeda: Euro (€)</span>
              <span>•</span>
              <span className="font-semibold text-brand-navy">🗣️ Idioma: Francês</span>
            </div>
          </header>

          {/* Main 2-Column Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-8">
            
            {/* LEFT COLUMN: Full PDF Article Content */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              
              {/* Main Cover Image */}
              <div className="rounded-[28px] overflow-hidden border border-border-gray/80 shadow-sm relative h-72 sm:h-96 md:h-[440px] bg-bg-light">
                <img 
                  src="/assets/paris.png" 
                  alt="Vista noturna da Torre Eiffel e do Rio Sena em Paris" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* INTRODUÇÃO */}
              <section className="bg-white border border-border-gray/80 p-6 sm:p-8 rounded-[28px] shadow-xs text-left">
                <h2 className="font-headers text-xl sm:text-2xl font-bold text-brand-navy mb-4">
                  Introdução
                </h2>
                <div className="flex flex-col gap-4 text-xs sm:text-sm text-text-muted leading-relaxed font-body">
                  <p>
                    Paris está entre os destinos mais desejados do mundo, mas também pode ser uma das viagens mais desafiadoras para quem vai pela primeira vez.
                  </p>
                  <p>
                    Entre escolher a melhor região para se hospedar, entender o metrô, reservar atrações concorridas e organizar os dias da viagem, é comum gastar dezenas de horas pesquisando.
                  </p>
                  <p>
                    Neste guia você encontrará tudo o que precisa para viajar com tranquilidade e ainda descobrirá como criar um roteiro totalmente personalizado utilizando o aplicativo da 2GO.
                  </p>
                </div>
              </section>

              {/* PARIS EM RESUMO (Interactive TOC Box) */}
              <section id="resumo" className="bg-brand-navy/5 border border-brand-navy/15 p-6 sm:p-8 rounded-[28px] text-left scroll-mt-28">
                <span className="text-[10px] font-extrabold text-brand-orange uppercase tracking-widest block font-headers mb-1">
                  ÍNDICE DO GUIA
                </span>
                <h2 className="font-headers text-xl sm:text-2xl font-bold text-brand-navy mb-4">
                  Paris em resumo
                </h2>
                <p className="text-xs text-text-muted mb-4">Clique nos itens abaixo para navegar direto para cada seção do guia:</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { label: '🏛️ Atrações imperdíveis', id: 'atracoes' },
                    { label: '⏱️ Tempo recomendado', id: 'quanto-tempo' },
                    { label: '🌤️ Melhor época', id: 'melhor-epoca' },
                    { label: '✈️ Onde se hospedar', id: 'hospedagem' },
                    { label: '🚇 Transporte em Paris', id: 'transporte' },
                    { label: '💶 Faixa média de gastos', id: 'custos' },
                    { label: '🍴 Restaurantes recomendados', id: 'restaurantes' },
                    { label: '📑 Documentação necessária', id: 'documentacao' },
                    { label: '⚠️ Erros comuns a evitar', id: 'erros-comuns' }
                  ].map((link) => (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={(e) => scrollToSection(e, link.id)}
                      className="p-3 bg-white border border-border-gray/70 hover:border-brand-orange hover:text-brand-orange rounded-xl text-xs font-bold text-brand-navy transition-all flex items-center justify-between shadow-2xs"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-orange" />
                    </a>
                  ))}
                </div>
              </section>

              {/* LUGARES IMPERDÍVEIS EM PARIS */}
              <section id="atracoes" className="bg-white border border-border-gray/80 p-6 sm:p-8 rounded-[28px] shadow-xs text-left scroll-mt-28">
                <span className="text-[10px] font-extrabold text-brand-orange uppercase tracking-widest block font-headers mb-1">
                  MONUMENTOS E MUSEUS
                </span>
                <h2 className="font-headers text-xl sm:text-2.5xl font-bold text-brand-navy mb-2">
                  Lugares imperdíveis em Paris
                </h2>
                <p className="text-xs sm:text-sm text-text-muted mb-8 leading-relaxed">
                  Paris abriga alguns dos monumentos e museus mais famosos do mundo. Se esta é sua primeira visita, estas atrações merecem estar no topo da lista.
                </p>

                {/* List of 8 Attractions */}
                <div className="flex flex-col gap-8">
                  
                  {/* 1. Torre Eiffel */}
                  <div className="border border-border-gray/80 rounded-2xl p-5 sm:p-6 bg-bg-light/20 flex flex-col gap-4">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-headers text-lg font-bold text-brand-navy flex items-center gap-2">
                          <span>🗼 Torre Eiffel</span>
                        </h3>
                        <span className="text-xs font-bold text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded-md">★ ★ ★ ★ ★ Imperdível</span>
                      </div>
                      <p className="text-xs text-text-muted mt-2 leading-relaxed">
                        O principal cartão-postal de Paris e uma das atrações mais visitadas do mundo. Além da vista panorâmica, a torre ganha um espetáculo de luzes durante a noite.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-border-gray/60 text-xs">
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">💰 PREÇO</span> <span className="font-bold text-brand-navy">A partir de € 23</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">⏱️ TEMPO</span> <span className="font-bold text-brand-navy">2 a 3 horas</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">📍 DISTÂNCIA</span> <span className="font-bold text-brand-navy">20 min de metrô</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">🚇 ESTAÇÃO</span> <span className="font-bold text-brand-navy">Bir-Hakeim (L6)</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">📅 MELHOR DIA</span> <span className="font-bold text-brand-navy">Segunda a quinta</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">🕒 HORÁRIO</span> <span className="font-bold text-brand-navy">Fim de tarde / Noite</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">👥 IDEAL PARA</span> <span className="font-bold text-brand-navy">Casais • Famílias</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">🎫 RESERVA</span> <span className="font-bold text-brand-orange">Altamente recomendada</span></div>
                    </div>
                  </div>

                  {/* 2. Museu do Louvre */}
                  <div className="border border-border-gray/80 rounded-2xl p-5 sm:p-6 bg-bg-light/20 flex flex-col gap-4">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-headers text-lg font-bold text-brand-navy flex items-center gap-2">
                          <span>🖼️ Museu do Louvre</span>
                        </h3>
                        <span className="text-xs font-bold text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded-md">★ ★ ★ ★ ★ Imperdível</span>
                      </div>
                      <p className="text-xs text-text-muted mt-2 leading-relaxed">
                        O maior museu de arte do mundo reúne milhares de obras, incluindo a famosa Mona Lisa.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-border-gray/60 text-xs">
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">💰 PREÇO</span> <span className="font-bold text-brand-navy">Cerca de € 22</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">⏱️ TEMPO</span> <span className="font-bold text-brand-navy">3 a 5 horas</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">📍 DISTÂNCIA</span> <span className="font-bold text-brand-navy">Centro histórico</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">🚇 ESTAÇÃO</span> <span className="font-bold text-brand-navy">Palais Royal – Louvre</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">📅 MELHOR DIA</span> <span className="font-bold text-brand-navy">Quarta ou sexta</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">🕒 HORÁRIO</span> <span className="font-bold text-brand-navy">Abertura ou após 15h</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">👥 IDEAL PARA</span> <span className="font-bold text-brand-navy">Amantes de arte • Casais</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">🎫 RESERVA</span> <span className="font-bold text-brand-orange">Altamente recomendada</span></div>
                    </div>
                  </div>

                  {/* 3. Arco do Triunfo */}
                  <div className="border border-border-gray/80 rounded-2xl p-5 sm:p-6 bg-bg-light/20 flex flex-col gap-4">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-headers text-lg font-bold text-brand-navy flex items-center gap-2">
                          <span>🏛️ Arco do Triunfo</span>
                        </h3>
                        <span className="text-xs font-bold text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded-md">★ ★ ★ ★ ☆ Imperdível</span>
                      </div>
                      <p className="text-xs text-text-muted mt-2 leading-relaxed">
                        Monumento construído em homenagem às vitórias de Napoleão, com um dos mirantes mais bonitos da cidade.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-border-gray/60 text-xs">
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">💰 PREÇO</span> <span className="font-bold text-brand-navy">Cerca de € 16</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">⏱️ TEMPO</span> <span className="font-bold text-brand-navy">1 a 2 horas</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">📍 DISTÂNCIA</span> <span className="font-bold text-brand-navy">15 min de metrô</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">🚇 ESTAÇÃO</span> <span className="font-bold text-brand-navy">Charles de Gaulle – Étoile</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">📅 MELHOR DIA</span> <span className="font-bold text-brand-navy">Segunda a quinta</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">🕒 HORÁRIO</span> <span className="font-bold text-brand-navy">Final da tarde</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">👥 IDEAL PARA</span> <span className="font-bold text-brand-navy">Primeira viagem</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">🎫 RESERVA</span> <span className="font-bold text-brand-navy">Sim</span></div>
                    </div>
                  </div>

                  {/* 4. Catedral de Notre-Dame */}
                  <div className="border border-border-gray/80 rounded-2xl p-5 sm:p-6 bg-bg-light/20 flex flex-col gap-4">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-headers text-lg font-bold text-brand-navy flex items-center gap-2">
                          <span>⛪ Catedral de Notre-Dame</span>
                        </h3>
                        <span className="text-xs font-bold text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded-md">★ ★ ★ ★ ★ Imperdível</span>
                      </div>
                      <p className="text-xs text-text-muted mt-2 leading-relaxed">
                        Uma das obras-primas da arquitetura gótica e um dos monumentos históricos mais importantes da França.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-border-gray/60 text-xs">
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">💰 PREÇO</span> <span className="font-bold text-brand-green">Entrada gratuita</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">⏱️ TEMPO</span> <span className="font-bold text-brand-navy">1 hora</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">📍 DISTÂNCIA</span> <span className="font-bold text-brand-navy">Île de la Cité</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">🚇 ESTAÇÃO</span> <span className="font-bold text-brand-navy">Cité (Linha 4)</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">📅 MELHOR DIA</span> <span className="font-bold text-brand-navy">Terça a quinta</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">🕒 HORÁRIO</span> <span className="font-bold text-brand-navy">Pela manhã</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">👥 IDEAL PARA</span> <span className="font-bold text-brand-navy">História • Arquitetura</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">🎫 RESERVA</span> <span className="font-bold text-brand-navy">Recomendada</span></div>
                    </div>
                  </div>

                  {/* 5. Basílica de Sacré-Cœur e Montmartre */}
                  <div className="border border-border-gray/80 rounded-2xl p-5 sm:p-6 bg-bg-light/20 flex flex-col gap-4">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-headers text-lg font-bold text-brand-navy flex items-center gap-2">
                          <span>🎨 Basílica de Sacré-Cœur e Montmartre</span>
                        </h3>
                        <span className="text-xs font-bold text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded-md">★ ★ ★ ★ ★ Imperdível</span>
                      </div>
                      <p className="text-xs text-text-muted mt-2 leading-relaxed">
                        A combinação perfeita entre história, arte e uma das vistas mais bonitas de Paris.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-border-gray/60 text-xs">
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">💰 PREÇO</span> <span className="font-bold text-brand-green">Basílica gratuita</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">⏱️ TEMPO</span> <span className="font-bold text-brand-navy">2 a 4 horas</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">📍 DISTÂNCIA</span> <span className="font-bold text-brand-navy">25 min de metrô</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">🚇 ESTAÇÃO</span> <span className="font-bold text-brand-navy">Anvers (Linha 2)</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">📅 MELHOR DIA</span> <span className="font-bold text-brand-navy">Dias úteis</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">🕒 HORÁRIO</span> <span className="font-bold text-brand-navy">Final da tarde</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">👥 IDEAL PARA</span> <span className="font-bold text-brand-navy">Casais • Fotografia</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">🎫 RESERVA</span> <span className="font-bold text-text-muted">Não necessária</span></div>
                    </div>
                  </div>

                  {/* 6. Cruzeiro pelo Rio Sena */}
                  <div className="border border-border-gray/80 rounded-2xl p-5 sm:p-6 bg-bg-light/20 flex flex-col gap-4">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-headers text-lg font-bold text-brand-navy flex items-center gap-2">
                          <span>🛥️ Cruzeiro pelo Rio Sena</span>
                        </h3>
                        <span className="text-xs font-bold text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded-md">★ ★ ★ ★ ★ Imperdível</span>
                      </div>
                      <p className="text-xs text-text-muted mt-2 leading-relaxed">
                        Uma forma única de conhecer Paris navegando pelos principais monumentos da cidade.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-border-gray/60 text-xs">
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">💰 PREÇO</span> <span className="font-bold text-brand-navy">A partir de € 18</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">⏱️ TEMPO</span> <span className="font-bold text-brand-navy">1 hora</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">📍 DISTÂNCIA</span> <span className="font-bold text-brand-navy">Próximo à Torre Eiffel</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">🚇 ESTAÇÃO</span> <span className="font-bold text-brand-navy">Bir-Hakeim</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">📅 MELHOR DIA</span> <span className="font-bold text-brand-navy">Qualquer dia</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">🕒 HORÁRIO</span> <span className="font-bold text-brand-navy">Pôr do sol / Noite</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">👥 IDEAL PARA</span> <span className="font-bold text-brand-navy">Casais • Famílias</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">🎫 RESERVA</span> <span className="font-bold text-brand-navy">Recomendada</span></div>
                    </div>
                  </div>

                  {/* 7. Jardim de Luxemburgo */}
                  <div className="border border-border-gray/80 rounded-2xl p-5 sm:p-6 bg-bg-light/20 flex flex-col gap-4">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-headers text-lg font-bold text-brand-navy flex items-center gap-2">
                          <span>🌳 Jardim de Luxemburgo</span>
                        </h3>
                        <span className="text-xs font-bold text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded-md">★ ★ ★ ★ ☆ Imperdível</span>
                      </div>
                      <p className="text-xs text-text-muted mt-2 leading-relaxed">
                        Um dos parques mais elegantes de Paris, perfeito para descansar entre um passeio e outro.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-border-gray/60 text-xs">
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">💰 PREÇO</span> <span className="font-bold text-brand-green">Gratuito</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">⏱️ TEMPO</span> <span className="font-bold text-brand-navy">1 a 2 horas</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">📍 DISTÂNCIA</span> <span className="font-bold text-brand-navy">10 min de metrô</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">🚇 ESTAÇÃO</span> <span className="font-bold text-brand-navy">Luxembourg (RER B)</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">📅 MELHOR DIA</span> <span className="font-bold text-brand-navy">Qualquer dia</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">🕒 HORÁRIO</span> <span className="font-bold text-brand-navy">Manhã ou fim de tarde</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">👥 IDEAL PARA</span> <span className="font-bold text-brand-navy">Famílias • Relaxar</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">🎫 RESERVA</span> <span className="font-bold text-text-muted">Não necessária</span></div>
                    </div>
                  </div>

                  {/* 8. Palácio de Versailles */}
                  <div className="border border-border-gray/80 rounded-2xl p-5 sm:p-6 bg-bg-light/20 flex flex-col gap-4">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-headers text-lg font-bold text-brand-navy flex items-center gap-2">
                          <span>👑 Palácio de Versailles</span>
                        </h3>
                        <span className="text-xs font-bold text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded-md">★ ★ ★ ★ ★ Imperdível</span>
                      </div>
                      <p className="text-xs text-text-muted mt-2 leading-relaxed">
                        Antiga residência da monarquia francesa, famoso por seus salões luxuosos e jardins monumentais. É um dos bate-voltas mais procurados saindo de Paris.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-border-gray/60 text-xs">
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">💰 PREÇO</span> <span className="font-bold text-brand-navy">A partir de € 21</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">⏱️ TEMPO</span> <span className="font-bold text-brand-navy">Meio dia ou dia inteiro</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">📍 DISTÂNCIA</span> <span className="font-bold text-brand-navy">40 a 60 min de RER</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">🚇 ESTAÇÃO</span> <span className="font-bold text-brand-navy">Versailles Château Rive Gauche</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">📅 MELHOR DIA</span> <span className="font-bold text-brand-navy">Terça a quinta</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">🕒 HORÁRIO</span> <span className="font-bold text-brand-navy">Logo na abertura</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">👥 IDEAL PARA</span> <span className="font-bold text-brand-navy">História • Famílias</span></div>
                      <div><span className="text-[10px] font-bold text-text-muted block uppercase font-headers">🎫 RESERVA</span> <span className="font-bold text-brand-orange">Sim, obrigatória</span></div>
                    </div>
                  </div>

                </div>

                <div className="mt-8 bg-brand-navy/5 border border-brand-navy/15 p-4 rounded-2xl text-xs text-brand-navy flex items-center gap-3">
                  <span className="text-lg">💡</span>
                  <div>
                    <strong className="font-headers font-bold text-xs uppercase tracking-wider text-brand-orange block">Dica da 2GO</strong>
                    <p className="text-text-muted mt-0.5">Se for sua primeira vez em Paris, distribua as atrações por região para economizar tempo no metrô.</p>
                  </div>
                </div>
              </section>

              {/* QUANTOS DIAS FICAR EM PARIS? */}
              <section id="quanto-tempo" className="bg-white border border-border-gray/80 p-6 sm:p-8 rounded-[28px] shadow-xs text-left scroll-mt-28">
                <span className="text-[10px] font-extrabold text-brand-orange uppercase tracking-widest block font-headers mb-1">
                  PLANEJAMENTO DE DURAÇÃO
                </span>
                <h2 className="font-headers text-xl sm:text-2.5xl font-bold text-brand-navy mb-3">
                  Quantos dias ficar em Paris?
                </h2>
                <p className="text-xs sm:text-sm text-text-muted mb-6 leading-relaxed">
                  A quantidade ideal de dias em Paris depende do seu estilo de viagem e dos seus interesses. A cidade oferece atrações suficientes para semanas de exploração, mas é possível ter uma excelente experiência mesmo em uma viagem mais curta.
                </p>

                <div className="flex flex-col gap-6">
                  
                  {/* 3 dias */}
                  <div className="border border-border-gray/70 p-5 rounded-2xl bg-bg-light/30">
                    <h3 className="font-headers text-base sm:text-lg font-bold text-brand-navy mb-2">3 dias</h3>
                    <p className="text-xs text-text-muted mb-3">Ideal para quem está fazendo um roteiro pela Europa e deseja conhecer os principais cartões-postais.</p>
                    
                    <span className="text-[10px] font-bold text-brand-navy uppercase tracking-wider block font-headers mb-1">Você conseguirá visitar:</span>
                    <ul className="text-xs text-text-muted flex flex-col gap-1 list-disc pl-4 mb-4">
                      <li>Torre Eiffel</li>
                      <li>Museu do Louvre</li>
                      <li>Arco do Triunfo</li>
                      <li>Champs-Élysées</li>
                      <li>Barco pelo Rio Sena</li>
                    </ul>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-3 border-t border-border-gray/40">
                      <div><strong className="text-brand-green font-headers block mb-1">✓ Vantagens</strong> Menor custo; perfeito para um primeiro contato com a cidade.</div>
                      <div><strong className="text-brand-orange font-headers block mb-1">✕ Desvantagens</strong> Ritmo intenso; pouco tempo para explorar bairros menos turísticos.</div>
                    </div>
                  </div>

                  {/* 5 dias */}
                  <div className="border-2 border-brand-orange/30 p-5 rounded-2xl bg-brand-orange/5 relative">
                    <span className="absolute -top-3 right-4 bg-brand-orange text-white text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full font-headers">OPÇÃO MAIS EQUILIBRADA</span>
                    <h3 className="font-headers text-base sm:text-lg font-bold text-brand-navy mb-2">5 dias</h3>
                    <p className="text-xs text-text-muted mb-3">A opção mais equilibrada para a maioria dos viajantes. Além das atrações principais, será possível conhecer bairros tradicionais, visitar museus com calma e aproveitar cafés sem pressa.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-3 border-t border-border-gray/40">
                      <div><strong className="text-brand-green font-headers block mb-1">✓ Vantagens</strong> Excelente custo-benefício; permite aproveitar Paris sem correria.</div>
                      <div><strong className="text-brand-orange font-headers block mb-1">✕ Desvantagens</strong> Talvez seja necessário deixar algumas atrações secundárias para uma próxima viagem.</div>
                    </div>
                  </div>

                  {/* 7 dias ou mais */}
                  <div className="border border-border-gray/70 p-5 rounded-2xl bg-bg-light/30">
                    <h3 className="font-headers text-base sm:text-lg font-bold text-brand-navy mb-2">7 dias ou mais</h3>
                    <p className="text-xs text-text-muted mb-3">Ideal para quem deseja conhecer Paris profundamente ou realizar passeios próximos, como o Palácio de Versailles ou a Disneyland Paris.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-3 border-t border-border-gray/40">
                      <div><strong className="text-brand-green font-headers block mb-1">✓ Vantagens</strong> Viagem tranquila; tempo para explorar bairros menos conhecidos; excelente para amantes de arte e gastronomia.</div>
                      <div><strong className="text-brand-orange font-headers block mb-1">✕ Desvantagens</strong> Maior investimento em hospedagem e alimentação.</div>
                    </div>
                  </div>

                </div>

                {/* APP MOCKUP CARD REAL INTERFACE */}
                <div className="mt-8 bg-brand-navy text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 shadow-md border border-brand-navy">
                  <div className="flex-grow text-left">
                    <span className="text-[9px] font-extrabold text-brand-orange uppercase tracking-widest block font-headers mb-1">DICA 2GO</span>
                    <h4 className="font-headers text-base font-bold mb-1">Sua viagem organizada no app</h4>
                    <p className="text-xs text-white/80 leading-relaxed">
                      No aplicativo você informa a quantidade de dias disponível e a 2GO organiza automaticamente todo o roteiro personalizado e separado por dia e horário.
                    </p>
                  </div>
                  
                  {/* Real UI Mockup Box */}
                  <div className="bg-white text-brand-navy rounded-xl p-3 text-[10px] w-full sm:w-56 shrink-0 shadow-sm border border-border-gray/30 text-left">
                    <div className="flex justify-between items-center border-b border-border-gray/30 pb-1.5 mb-2 font-headers">
                      <span className="font-bold text-brand-orange">DIA 1 • PARIS</span>
                      <span className="font-extrabold text-[9px] bg-brand-navy/10 text-brand-navy px-1.5 py-0.5 rounded">09:00 - 18:00</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 font-semibold"><span>09:00</span> <span>🗼 Torre Eiffel</span></div>
                      <div className="flex items-center gap-1.5 font-semibold"><span>13:00</span> <span>🍴 Almoço no Le Marais</span></div>
                      <div className="flex items-center gap-1.5 font-semibold"><span>15:30</span> <span>🖼️ Museu do Louvre</span></div>
                    </div>
                  </div>
                </div>

                {/* Content CTA */}
                <div className="mt-6 bg-gradient-to-r from-brand-orange/10 to-brand-orange/5 border border-brand-orange/20 p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="font-headers text-xs font-bold text-brand-navy">Informe quantos dias você terá e receba um roteiro organizado por dia e horário no aplicativo da 2GO.</span>
                  </div>
                  <Link href="/planejamento?destino=paris&step=2" className="btn btn-primary text-xs font-bold py-2.5 px-5 shrink-0 justify-center w-full sm:w-auto">
                    Criar roteiro para Paris
                  </Link>
                </div>
              </section>

              {/* MELHOR ÉPOCA PARA VISITART PARIS */}
              <section id="melhor-epoca" className="bg-white border border-border-gray/80 p-6 sm:p-8 rounded-[28px] shadow-xs text-left scroll-mt-28">
                <span className="text-[10px] font-extrabold text-brand-orange uppercase tracking-widest block font-headers mb-1">
                  CLIMA E TEMPORADAS
                </span>
                <h2 className="font-headers text-xl sm:text-2.5xl font-bold text-brand-navy mb-3">
                  Melhor época para visitar Paris
                </h2>
                <p className="text-xs sm:text-sm text-text-muted mb-6 leading-relaxed">
                  Paris pode ser visitada durante todo o ano, mas cada estação oferece uma experiência diferente.
                </p>

                {/* Season Table */}
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-bg-light border-b border-border-gray/70 text-brand-navy font-headers">
                        <th className="p-3 font-bold">Estação</th>
                        <th className="p-3 font-bold">Meses</th>
                        <th className="p-3 font-bold">Características</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-gray/50 font-body">
                      <tr>
                        <td className="p-3 font-bold text-brand-navy">Primavera 🌸</td>
                        <td className="p-3">Março a Maio</td>
                        <td className="p-3 text-text-muted">Clima agradável, jardins floridos e dias mais longos.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-brand-navy">Verão ☀️</td>
                        <td className="p-3">Junho a Agosto</td>
                        <td className="p-3 text-text-muted">Dias quentes, cidade movimentada e alta temporada.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-brand-navy">Outono 🍂</td>
                        <td className="p-3">Setembro a Novembro</td>
                        <td className="p-3 text-text-muted">Temperaturas amenas e menos turistas.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-brand-navy">Inverno ❄️</td>
                        <td className="p-3">Dezembro a Fevereiro</td>
                        <td className="p-3 text-text-muted">Frio intenso, decoração natalina e preços mais atrativos em alguns períodos.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-brand-orange/10 border border-brand-orange/20 p-4 rounded-2xl mb-6">
                  <span className="text-xs font-bold text-brand-orange font-headers block mb-1">Nossa recomendação</span>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Os melhores meses para visitar Paris costumam ser <strong>abril, maio, setembro e outubro</strong>. Nesses períodos você encontrará temperaturas agradáveis, filas menores e uma cidade especialmente bonita para caminhar.
                  </p>
                </div>

                <h3 className="font-headers text-base font-bold text-brand-navy mb-3">Principais eventos</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-bg-light/40 border border-border-gray/50 p-3 rounded-xl"><strong>Janeiro:</strong> Paris Fashion Week (Moda Masculina)</div>
                  <div className="bg-bg-light/40 border border-border-gray/50 p-3 rounded-xl"><strong>Abril:</strong> Maratona de Paris</div>
                  <div className="bg-bg-light/40 border border-border-gray/50 p-3 rounded-xl"><strong>Junho:</strong> Festa da Música (Fête de la Musique)</div>
                  <div className="bg-bg-light/40 border border-border-gray/50 p-3 rounded-xl"><strong>Julho:</strong> Desfile do Dia da Bastilha (14 de julho)</div>
                  <div className="bg-bg-light/40 border border-border-gray/50 p-3 rounded-xl"><strong>Setembro:</strong> Jornadas Europeias do Patrimônio</div>
                  <div className="bg-bg-light/40 border border-border-gray/50 p-3 rounded-xl"><strong>Dezembro:</strong> Mercados de Natal e iluminação especial</div>
                </div>
              </section>

              {/* ONDE SE HOSPEDAR EM PARIS */}
              <section id="hospedagem" className="bg-white border border-border-gray/80 p-6 sm:p-8 rounded-[28px] shadow-xs text-left scroll-mt-28">
                <span className="text-[10px] font-extrabold text-brand-navy uppercase tracking-widest block font-headers mb-1">
                  BAIRROS E ACOMODAÇÃO
                </span>
                <h2 className="font-headers text-xl sm:text-2.5xl font-bold text-brand-navy mb-3">
                  Onde se hospedar em Paris
                </h2>
                <p className="text-xs sm:text-sm text-text-muted mb-6 leading-relaxed">
                  Escolher bem a região da hospedagem faz toda a diferença na experiência da viagem.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Le Marais */}
                  <div className="border border-border-gray/70 p-5 rounded-2xl bg-bg-light/20 flex flex-col justify-between">
                    <div>
                      <h3 className="font-headers text-base font-bold text-brand-navy mb-1">Le Marais</h3>
                      <p className="text-xs text-text-muted mb-3">Um dos bairros mais charmosos e vivos de Paris.</p>
                      <span className="text-[10px] font-bold text-brand-orange uppercase block font-headers mb-1">Ideal para:</span>
                      <p className="text-xs text-brand-navy font-semibold mb-3">Casais • Primeira viagem • Amantes de gastronomia</p>
                    </div>
                    <div className="text-xs pt-3 border-t border-border-gray/40">
                      <strong className="text-brand-green block">✓ Vantagens:</strong> Excelente localização, ótimos restaurantes e cafés, vida noturna agradável.
                      <strong className="text-brand-orange block mt-1">✕ Desvantagens:</strong> Hotéis costumam ser mais caros.
                    </div>
                  </div>

                  {/* Saint-Germain-des-Prés */}
                  <div className="border border-border-gray/70 p-5 rounded-2xl bg-bg-light/20 flex flex-col justify-between">
                    <div>
                      <h3 className="font-headers text-base font-bold text-brand-navy mb-1">Saint-Germain-des-Prés</h3>
                      <p className="text-xs text-text-muted mb-3">Elegante, tradicional e muito bem localizado.</p>
                      <span className="text-[10px] font-bold text-brand-orange uppercase block font-headers mb-1">Ideal para:</span>
                      <p className="text-xs text-brand-navy font-semibold mb-3">Viagens românticas • Quem gosta de cultura • Caminhadas</p>
                    </div>
                    <div className="text-xs pt-3 border-t border-border-gray/40">
                      <strong className="text-brand-green block">✓ Vantagens:</strong> Próximo ao Louvre, cafés históricos, ambiente sofisticado.
                      <strong className="text-brand-orange block mt-1">✕ Desvantagens:</strong> Hospedagem acima da média.
                    </div>
                  </div>

                  {/* Quartier Latin */}
                  <div className="border border-border-gray/70 p-5 rounded-2xl bg-bg-light/20 flex flex-col justify-between">
                    <div>
                      <h3 className="font-headers text-base font-bold text-brand-navy mb-1">Quartier Latin</h3>
                      <p className="text-xs text-text-muted mb-3">Excelente custo-benefício e clima universitário.</p>
                      <span className="text-[10px] font-bold text-brand-orange uppercase block font-headers mb-1">Ideal para:</span>
                      <p className="text-xs text-brand-navy font-semibold mb-3">Estudantes • Famílias • Quem busca economia</p>
                    </div>
                    <div className="text-xs pt-3 border-t border-border-gray/40">
                      <strong className="text-brand-green block">✓ Vantagens:</strong> Boa oferta de restaurantes acessíveis, fácil acesso ao metrô.
                      <strong className="text-brand-orange block mt-1">✕ Desvantagens:</strong> Bastante movimentado em alguns períodos.
                    </div>
                  </div>

                  {/* Montmartre */}
                  <div className="border border-border-gray/70 p-5 rounded-2xl bg-bg-light/20 flex flex-col justify-between">
                    <div>
                      <h3 className="font-headers text-base font-bold text-brand-navy mb-1">Montmartre</h3>
                      <p className="text-xs text-text-muted mb-3">Um dos bairros mais icônicos e artísticos da cidade.</p>
                      <span className="text-[10px] font-bold text-brand-orange uppercase block font-headers mb-1">Ideal para:</span>
                      <p className="text-xs text-brand-navy font-semibold mb-3">Fotógrafos • Artistas • Casais</p>
                    </div>
                    <div className="text-xs pt-3 border-t border-border-gray/40">
                      <strong className="text-brand-green block">✓ Vantagens:</strong> Vista incrível, clima boêmio, próximo à Sacré-Cœur.
                      <strong className="text-brand-orange block mt-1">✕ Desvantagens:</strong> Muitas ladeiras e distância maior de algumas atrações.
                    </div>
                  </div>

                </div>
              </section>

              {/* TRANSPORTE EM PARIS */}
              <section id="transporte" className="bg-white border border-border-gray/80 p-6 sm:p-8 rounded-[28px] shadow-xs text-left scroll-mt-28">
                <span className="text-[10px] font-extrabold text-brand-orange uppercase tracking-widest block font-headers mb-1">
                  MOBILIDADE URBANA
                </span>
                <h2 className="font-headers text-xl sm:text-2.5xl font-bold text-brand-navy mb-3">
                  Como funciona o transporte em Paris
                </h2>
                <p className="text-xs sm:text-sm text-text-muted mb-6 leading-relaxed">
                  O transporte público de Paris é considerado um dos melhores da Europa. As principais opções são: <strong>Metrô, Trem (RER), Ônibus, Bondes e Bicicletas compartilhadas</strong>.
                </p>

                <div className="flex flex-col gap-6 text-xs text-text-muted leading-relaxed">
                  
                  <div className="bg-bg-light/50 border border-border-gray/60 p-5 rounded-2xl">
                    <h3 className="font-headers text-base font-bold text-brand-navy mb-2">Como funciona o metrô de Paris?</h3>
                    <p>
                      O metrô de Paris é a forma mais prática e econômica de se locomover pela cidade. Com 16 linhas e mais de 300 estações, ele conecta os principais pontos turísticos, como a Torre Eiffel, Museu do Louvre, Arco do Triunfo e Montmartre.
                    </p>
                    <p className="mt-2">
                      Os trens circulam diariamente, geralmente das <strong>5h30 até 1h15</strong>, com funcionamento estendido até cerca de <strong>2h15 nas sextas-feiras, sábados e vésperas de feriados</strong>.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border border-border-gray/70 p-4 rounded-xl">
                      <strong className="text-brand-navy font-headers block mb-1">Quanto custa?</strong>
                      <ul className="list-disc pl-4 flex flex-col gap-1">
                        <li>Bilhete unitário (Metrô, Trem e RER): cerca de € 2,55</li>
                        <li>Bilhete para aeroportos (CDG ou Orly): cerca de € 14,00</li>
                      </ul>
                    </div>

                    <div className="border border-border-gray/70 p-4 rounded-xl">
                      <strong className="text-brand-navy font-headers block mb-1">Como comprar?</strong>
                      <p>
                        Nas máquinas de autoatendimento e guichês das estações. A opção mais prática para turistas é o <strong>Navigo Easy</strong>, um cartão recarregável, ou diretamente pelo celular via app Île-de-France Mobilités.
                      </p>
                    </div>
                  </div>

                  <div className="bg-brand-navy/5 border border-brand-navy/15 p-4 rounded-2xl text-brand-navy">
                    <strong className="font-headers font-bold text-xs uppercase tracking-wider text-brand-orange block mb-1">💡 Dica da 2GO</strong>
                    <p>Antes de embarcar, confira o sentido da linha e o destino final do trem. Essa simples verificação evita baldeações desnecessárias e ajuda a otimizar o tempo durante a viagem.</p>
                  </div>

                </div>
              </section>

              {/* QUANTO CUSTA VIAJAR PARA PARIS? */}
              <section id="custos" className="bg-white border border-border-gray/80 p-6 sm:p-8 rounded-[28px] shadow-xs text-left scroll-mt-28">
                <span className="text-[10px] font-extrabold text-brand-green uppercase tracking-widest block font-headers mb-1">
                  ESTIMATIVA DE GASTOS
                </span>
                <h2 className="font-headers text-xl sm:text-2.5xl font-bold text-brand-navy mb-3">
                  Quanto custa viajar para Paris?
                </h2>
                <p className="text-xs sm:text-sm text-text-muted mb-6 leading-relaxed">
                  Os valores abaixo representam uma estimativa para um viajante de perfil intermediário.
                </p>

                {/* Price Table */}
                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-bg-light border-b border-border-gray/70 text-brand-navy font-headers">
                        <th className="p-3 font-bold">Categoria</th>
                        <th className="p-3 font-bold">Faixa de preço</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-gray/50 font-body">
                      <tr><td className="p-3 font-semibold">Hospedagem</td><td className="p-3 text-text-muted">€120 a €250 por noite</td></tr>
                      <tr><td className="p-3 font-semibold">Alimentação</td><td className="p-3 text-text-muted">€25 a €60 por dia</td></tr>
                      <tr><td className="p-3 font-semibold">Transporte</td><td className="p-3 text-text-muted">€10 a €20 por dia</td></tr>
                      <tr><td className="p-3 font-semibold">Museus e atrações</td><td className="p-3 text-text-muted">€20 a €50 por dia</td></tr>
                      <tr><td className="p-3 font-semibold">Café</td><td className="p-3 text-text-muted">€3 a €6</td></tr>
                      <tr><td className="p-3 font-semibold">Refeição completa</td><td className="p-3 text-text-muted">€18 a €40</td></tr>
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="border border-border-gray/70 p-4 rounded-xl text-center bg-bg-light/30">
                    <span className="text-[10px] font-bold text-text-muted uppercase block font-headers">Econômico</span>
                    <span className="font-headers text-xl font-bold text-brand-navy">€120 a €180 /dia</span>
                  </div>
                  <div className="border-2 border-brand-orange/30 p-4 rounded-xl text-center bg-brand-orange/5">
                    <span className="text-[10px] font-bold text-brand-orange uppercase block font-headers">Intermediário</span>
                    <span className="font-headers text-xl font-bold text-brand-navy">€220 a €350 /dia</span>
                  </div>
                  <div className="border border-border-gray/70 p-4 rounded-xl text-center bg-bg-light/30">
                    <span className="text-[10px] font-bold text-text-muted uppercase block font-headers">Confortável</span>
                    <span className="font-headers text-xl font-bold text-brand-navy">Acima de €400 /dia</span>
                  </div>
                </div>

                {/* Content CTA */}
                <div className="bg-brand-navy text-white p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <span className="font-headers text-xs font-bold">Leve seu planejamento, horários e estimativas no celular durante a viagem.</span>
                  </div>
                  <button onClick={() => setIsDownloadOpen(true)} className="btn btn-secondary text-xs font-bold py-2.5 px-5 shrink-0 justify-center w-full sm:w-auto">
                    Baixar App 2GO
                  </button>
                </div>
              </section>

              {/* RESTAURANTES QUE VALEM A VISITA */}
              <section id="restaurantes" className="bg-white border border-border-gray/80 p-6 sm:p-8 rounded-[28px] shadow-xs text-left scroll-mt-28">
                <span className="text-[10px] font-extrabold text-brand-orange uppercase tracking-widest block font-headers mb-1">
                  RECOMENDAÇÕES GASTRONÔMICAS
                </span>
                <h2 className="font-headers text-xl sm:text-2.5xl font-bold text-brand-navy mb-6">
                  Restaurantes que valem a visita
                </h2>

                <div className="flex flex-col gap-4">
                  {[
                    { name: 'Bouillon Chartier', desc: 'Tradicional restaurante francês com excelente custo-benefício. Ideal para experimentar pratos clássicos da culinária francesa.' },
                    { name: 'Le Relais de l\'Entrecôte', desc: 'Conhecido pelo famoso filé com molho secreto e batatas fritas. Ótima opção para quem visita Paris pela primeira vez.' },
                    { name: 'Angelina Paris', desc: 'Referência em chocolates quentes densos e doces franceses elegantes. Perfeito para uma pausa durante o passeio.' },
                    { name: 'Café de Flore', desc: 'Um dos cafés mais famosos e históricos de Paris. Excelente para experimentar a autêntica atmosfera parisiense.' },
                    { name: 'L\'As du Fallafel', desc: 'Uma das opções gastronômicas mais conhecidas do bairro Le Marais. Ótima escolha para refeições rápidas e saborosas.' }
                  ].map((rest, idx) => (
                    <div key={idx} className="border border-border-gray/70 p-4 rounded-xl bg-bg-light/20">
                      <h3 className="font-headers text-sm font-bold text-brand-navy">{rest.name}</h3>
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">{rest.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* DOCUMENTAÇÃO NECESSÁRIA */}
              <section id="documentacao" className="bg-white border border-border-gray/80 p-6 sm:p-8 rounded-[28px] shadow-xs text-left scroll-mt-28">
                <span className="text-[10px] font-extrabold text-brand-navy uppercase tracking-widest block font-headers mb-1">
                  EXIGÊNCIAS DE ENTRADA
                </span>
                <h2 className="font-headers text-xl sm:text-2.5xl font-bold text-brand-navy mb-3">
                  Documentação necessária para viajar para Paris
                </h2>
                
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-xs text-amber-900 mb-6">
                  <strong>Importante:</strong> As regras de entrada em países podem mudar ao longo do tempo. Antes da viagem, confirme sempre as informações nos canais oficiais do governo francês e das autoridades competentes.
                </div>

                <div className="flex flex-col gap-6 text-xs text-text-muted leading-relaxed">
                  <div>
                    <h3 className="font-headers text-sm font-bold text-brand-navy mb-1">Passaporte</h3>
                    <p>Brasileiros precisam apresentar um passaporte válido para entrar na França. É altamente recomendável que o passaporte permaneça válido durante toda a viagem e tenha vários meses de validade remanescente.</p>
                  </div>

                  <div>
                    <h3 className="font-headers text-sm font-bold text-brand-navy mb-1">Visto & ETIAS</h3>
                    <p>Atualmente, brasileiros <strong>não precisam de visto</strong> para viagens de turismo de até 90 dias no Espaço Schengen. A União Europeia prevê a futura implementação do sistema ETIAS (Autorização Eletrônica) para viajantes isentos de visto; consulte as regras atualizadas perto da sua viagem.</p>
                  </div>

                  <div>
                    <h3 className="font-headers text-sm font-bold text-brand-navy mb-1">Seguro viagem</h3>
                    <p>Embora nem sempre seja solicitado durante a imigração, o seguro viagem pode ser exigido conforme as regras aplicáveis ao Espaço Schengen. Ele oferece proteção para atendimento médico, internações, extravio de bagagem e imprevistos.</p>
                  </div>

                  {/* Checklist Table */}
                  <div className="bg-bg-light border border-border-gray/70 p-5 rounded-2xl">
                    <strong className="font-headers text-xs font-bold text-brand-navy uppercase tracking-wider block mb-3">Checklist rápido antes do embarque</strong>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2 font-semibold text-brand-navy">✅ Passaporte válido</div>
                      <div className="flex items-center gap-2 font-semibold text-brand-navy">✅ Passagens aéreas</div>
                      <div className="flex items-center gap-2 font-semibold text-brand-navy">✅ Reservas de hospedagem</div>
                      <div className="flex items-center gap-2 font-semibold text-brand-navy">✅ Seguro viagem</div>
                      <div className="flex items-center gap-2 font-semibold text-brand-navy">✅ Comprovantes financeiros</div>
                      <div className="flex items-center gap-2 font-semibold text-brand-navy">✅ Cartões habilitados</div>
                      <div className="flex items-center gap-2 font-semibold text-brand-navy">✅ Adaptador de tomada</div>
                      <div className="flex items-center gap-2 font-semibold text-brand-navy">✅ Cópias digitais salvas</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ERROS COMUNS */}
              <section id="erros-comuns" className="bg-white border border-border-gray/80 p-6 sm:p-8 rounded-[28px] shadow-xs text-left scroll-mt-28">
                <span className="text-[10px] font-extrabold text-brand-orange uppercase tracking-widest block font-headers mb-1">
                  DICAS DE SEGURANÇA E PLANEJAMENTO
                </span>
                <h2 className="font-headers text-xl sm:text-2.5xl font-bold text-brand-navy mb-6">
                  Erros comuns que muitos turistas cometem
                </h2>

                <div className="flex flex-col gap-4">
                  {[
                    { num: '1', title: 'Comprar ingressos na hora', desc: 'Atrações como a Torre Eiffel e o Museu do Louvre costumam ter grande procura. Comprar antecipadamente evita filas e garante o horário desejado.' },
                    { num: '2', title: 'Escolher hospedagem apenas pelo preço', desc: 'Um hotel barato, mas distante das principais atrações, pode gerar mais gastos com transporte e perda considerável de tempo.' },
                    { num: '3', title: 'Tentar visitar tudo em poucos dias', desc: 'Paris merece ser explorada com calma. Um roteiro muito apertado pode tornar a viagem cansativa.' },
                    { num: '4', title: 'Ignorar os horários de funcionamento', desc: 'Alguns museus fecham em determinados dias da semana (como o Louvre às terças) ou possuem horários reduzidos.' },
                    { num: '5', title: 'Não reservar restaurantes concorridos', desc: 'Os restaurantes mais famosos costumam exigir reserva antecipada, principalmente na alta temporada.' },
                    { num: '6', title: 'Subestimar as caminhadas', desc: 'Mesmo utilizando bastante o metrô, é comum caminhar muitos quilômetros por dia. Leve calçados confortáveis.' },
                    { num: '7', title: 'Não considerar o clima', desc: 'O tempo pode mudar rapidamente. Ter um casaco leve ou guarda-chuva na mochila evita transtornos.' }
                  ].map((err) => (
                    <div key={err.num} className="border border-border-gray/70 p-4 rounded-2xl bg-bg-light/20 flex gap-4 text-left">
                      <span className="font-headers font-black text-brand-orange text-lg shrink-0 w-6">0{err.num}.</span>
                      <div>
                        <h3 className="font-headers text-sm font-bold text-brand-navy">{err.title}</h3>
                        <p className="text-xs text-text-muted mt-1 leading-relaxed">{err.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* RESUMO RÁPIDO FINAL & DISCLAIMER */}
              <section className="bg-brand-navy text-white p-6 sm:p-8 rounded-[28px] text-left shadow-md">
                <span className="text-[9px] font-extrabold text-brand-orange uppercase tracking-widest block font-headers mb-1">RESUMO RÁPIDO DE PARIS</span>
                <h3 className="font-headers text-xl font-bold mb-4">Em síntese</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-6">
                  <div>• <strong>Idioma:</strong> Francês</div>
                  <div>• <strong>Moeda:</strong> Euro (€)</div>
                  <div>• <strong>Visto:</strong> Isento até 90 dias</div>
                  <div>• <strong>Aeroportos:</strong> CDG e Orly</div>
                  <div>• <strong>Melhor época:</strong> Abr/Mai/Set/Out</div>
                  <div>• <strong>Tempo ideal:</strong> 5 a 7 dias</div>
                </div>
                <p className="text-[11px] text-white/70 border-t border-white/20 pt-3">
                  Informações atualizadas para 2026. Valores e regras podem mudar; confirme sempre nos canais oficiais antes da viagem.
                </p>
              </section>

              {/* FINAL CTA BOX */}
              <section className="bg-gradient-to-br from-brand-orange/10 via-white to-brand-orange/5 border border-brand-orange/20 p-8 sm:p-10 rounded-[32px] text-center flex flex-col items-center gap-4 shadow-sm">
                <h2 className="font-headers text-2xl sm:text-3.5xl font-extrabold text-brand-navy">
                  Pronto para conhecer Paris do seu jeito?
                </h2>
                <p className="text-xs sm:text-sm text-text-muted max-w-md leading-relaxed">
                  Crie um roteiro personalizado e leve todo o planejamento com você no aplicativo da 2GO.
                </p>
                <div className="flex gap-4 mt-2 w-full justify-center max-w-md flex-col sm:flex-row">
                  <Link href="/planejamento?destino=paris&step=2" className="btn btn-primary py-3.5 px-6 font-bold text-xs justify-center flex-1">
                    Criar roteiro
                  </Link>
                  <button 
                    onClick={() => setIsDownloadOpen(true)}
                    className="btn btn-outline py-3.5 px-6 font-bold text-xs justify-center flex-1 cursor-pointer"
                  >
                    Baixar App
                  </button>
                </div>
              </section>

            </div>

            {/* RIGHT COLUMN: STICKY SIDEBAR (Reference screenshot match) */}
            <div className="lg:col-span-4 flex flex-col gap-6 sticky top-28 text-left">
              
              {/* Card 1: Principal CTA (Exact spec text & button) */}
              <div className="bg-brand-navy text-white p-6 rounded-[28px] shadow-md flex flex-col gap-4 relative overflow-hidden">
                <span className="bg-brand-orange text-white text-[9px] font-extrabold tracking-widest px-3 py-1 rounded-full uppercase font-headers w-fit">
                  ROTEIRO SOB MEDIDA
                </span>
                <h3 className="font-headers text-lg sm:text-xl font-extrabold leading-tight">
                  Gostou das dicas?
                </h3>
                <p className="text-xs text-white/80 leading-relaxed">
                  Crie um roteiro personalizado para Paris com atrações, horários, deslocamentos e recomendações organizadas para o seu perfil.
                </p>
                <Link
                  href="/planejamento?destino=paris&step=2"
                  className="btn btn-secondary py-3 text-xs justify-center font-bold text-center w-full mt-1"
                >
                  Criar roteiro para Paris
                </Link>
              </div>

              {/* Card 2: Consultoria Premium */}
              <div className="bg-white border border-border-gray/80 p-6 rounded-[28px] shadow-xs flex flex-col gap-3">
                <span className="text-[9px] font-extrabold text-brand-orange uppercase tracking-wider font-headers block">
                  SUPORTE EXCLUSIVO
                </span>
                <h3 className="font-headers font-bold text-brand-navy text-base">
                  Quer ajuda de um especialista?
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Conte com a Consultoria Premium da 2GO para organizar um planejamento sob medida e cuidar dos detalhes da sua viagem.
                </p>
                <Link
                  href="/premium"
                  className="btn btn-outline py-3 text-xs justify-center font-bold text-center w-full mt-1"
                >
                  Falar com especialista
                </Link>
              </div>

              {/* Card 3: Sticky Table of Contents */}
              <div className="bg-white border border-border-gray/80 p-6 rounded-[28px] shadow-xs flex flex-col gap-3">
                <span className="text-[9px] font-extrabold text-brand-navy uppercase tracking-widest block font-headers">
                  📌 SUMÁRIO DO ARTIGO
                </span>
                
                <nav className="flex flex-col gap-1.5 text-xs">
                  {[
                    { label: 'Paris em resumo', id: 'resumo' },
                    { label: 'Lugares imperdíveis', id: 'atracoes' },
                    { label: 'Quantos dias ficar', id: 'quanto-tempo' },
                    { label: 'Melhor época', id: 'melhor-epoca' },
                    { label: 'Onde se hospedar', id: 'hospedagem' },
                    { label: 'Transporte em Paris', id: 'transporte' },
                    { label: 'Quanto custa viajar', id: 'custos' },
                    { label: 'Restaurantes que valem a visita', id: 'restaurantes' },
                    { label: 'Documentação necessária', id: 'documentacao' },
                    { label: 'Erros comuns a evitar', id: 'erros-comuns' }
                  ].map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => scrollToSection(e, item.id)}
                      className={`p-2 rounded-lg font-semibold transition-colors flex items-center justify-between ${
                        activeSection === item.id 
                          ? 'bg-brand-orange/10 text-brand-orange font-bold' 
                          : 'text-text-muted hover:text-brand-navy hover:bg-bg-light'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                    </a>
                  ))}
                </nav>
              </div>

              {/* Card 4: Download App */}
              <div className="bg-white border border-border-gray/80 p-6 rounded-[28px] shadow-xs flex flex-col gap-3">
                <Smartphone className="w-6 h-6 text-brand-navy" />
                <h3 className="font-headers font-bold text-brand-navy text-sm">
                  Leve no seu celular
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  Acesse seus roteiros e dicas de Paris offline no app 2GO.
                </p>
                <button
                  onClick={() => setIsDownloadOpen(true)}
                  className="btn border border-brand-navy text-brand-navy hover:bg-brand-navy/5 py-2.5 text-xs justify-center font-bold text-center w-full cursor-pointer"
                >
                  Baixar App 2GO
                </button>
              </div>

            </div>

          </div>

          {/* Newsletter Box */}
          <div className="mt-14 w-full">
            <NewsletterBox destinationName="paris" />
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

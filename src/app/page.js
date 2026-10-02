"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Compass, Sliders, Navigation } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppDownloadModal from '@/components/AppDownloadModal';
import NewsletterBox from '@/components/NewsletterBox';


function ScrollReveal({ children, className = '', delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    
    const current = domRef.current;
    if (current) {
      observer.observe(current);
    }
    
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  return (
    <div className="w-full bg-white min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header solid onOpenDownload={() => setIsDownloadOpen(true)} />
      
      <main className="flex-grow">
        <section className="bg-white pt-[88px] lg:pt-[118px] pb-16 lg:pb-24">
          <div className="container mx-auto px-4 sm:px-6 max-w-3xl w-full text-left">
            <p className="text-[11px] font-extrabold tracking-[0.18em] text-brand-orange uppercase">2GO</p>
            <h1 className="font-headers text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-brand-navy mt-3 tracking-tight leading-[1.05]">
              A sua próxima viagem, planejada em minutos.
            </h1>
            <p className="text-base sm:text-lg text-brand-navy/80 mt-4 leading-relaxed max-w-xl">
              A 2GO cria roteiros personalizados e une tecnologia, curadoria e praticidade para você viajar do seu jeito.
            </p>
            <button
              type="button"
              onClick={() => setIsDownloadOpen(true)}
              className="mt-8 bg-[#F47A20] hover:bg-[#ff8f3c] text-white font-extrabold px-8 py-3.5 rounded-xl shadow-md cursor-pointer transition-all"
            >
              Baixar o App
            </button>
            <p className="text-[11px] text-brand-navy/60 font-semibold tracking-wide mt-3">
              A prévia fica no site. O dia a dia, no aplicativo.
            </p>
          </div>
        </section>

        {/* 2. COMO FUNCIONA */}
        <section id="como-funciona" className="py-12 lg:py-28 bg-[#F4F6F9] border-b border-border-gray/50 scroll-mt-20">
          <ScrollReveal className="container mx-auto px-4 sm:px-6 max-w-6xl w-full">
            <div className="text-center max-w-[600px] mx-auto mb-14 md:mb-16">
              <span className="bg-brand-orange/10 text-brand-orange text-[12px] font-extrabold tracking-wide px-3.5 py-1.5 rounded-full w-fit">
                Máxima praticidade
              </span>
              <h2 className="font-headers text-3.5xl font-black mt-4 text-brand-navy tracking-tight">
                Do sonho ao roteiro em 3 passos
              </h2>
              <p className="text-sm text-text-muted mt-3 font-medium">
                O site mostra o destino. No aplicativo, a 2GO organiza o dia, o horário e o mapa.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto w-full">
              {/* Step 1 */}
              <div className="group relative bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] lg:rounded-[24px] shadow-sm flex flex-col items-start text-left w-full">
                <span className="font-headers text-6xl font-extrabold text-brand-orange/20 absolute top-6 right-8 leading-none select-none group-hover:scale-105 transition-transform duration-300">1</span>
                <div className="w-12 h-12 rounded-[16px] bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-6 transition-transform group-hover:rotate-6 duration-300">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-headers text-lg font-bold text-brand-navy mb-2">Planeje no App</h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-md">
                  Escolha o destino e preencha suas preferências de viagem em poucos passos.
                </p>
              </div>

              {/* Step 2 */}
              <div className="group relative bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] lg:rounded-[24px] shadow-sm flex flex-col items-start text-left w-full">
                <span className="font-headers text-6xl font-extrabold text-brand-orange/20 absolute top-6 right-8 leading-none select-none group-hover:scale-105 transition-transform duration-300">2</span>
                <div className="w-12 h-12 rounded-[16px] bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-6 transition-transform group-hover:rotate-6 duration-300">
                  <Sliders className="w-6 h-6" />
                </div>
                <h3 className="font-headers text-lg font-bold text-brand-navy mb-2">Roteiro organizado</h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-md">
                  A 2GO organiza seu roteiro por dia, horário, atrações e deslocamentos sob medida.
                </p>
              </div>

              {/* Step 3 */}
              <div className="group relative bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] lg:rounded-[24px] shadow-sm flex flex-col items-start text-left w-full">
                <span className="font-headers text-6xl font-extrabold text-brand-orange/20 absolute top-6 right-8 leading-none select-none group-hover:scale-105 transition-transform duration-300">3</span>
                <div className="w-12 h-12 rounded-[16px] bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-6 transition-transform group-hover:rotate-6 duration-300">
                  <Navigation className="w-6 h-6" />
                </div>
                <h3 className="font-headers text-lg font-bold text-brand-navy mb-2">Acompanhe no App</h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-md">
                  Edite, salve, compartilhe seu roteiro offline e receba sugestões personalizadas por destino em tempo real.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section id="quem-somos" className="scroll-mt-24 py-16 lg:py-24 bg-[#F4F6F9] border-y border-border-gray/40">
          <div className="container mx-auto px-4 sm:px-6 max-w-3xl w-full text-left">
            <p className="text-[11px] font-extrabold tracking-[0.18em] text-brand-orange uppercase">Quem somos</p>
            <h2 className="font-headers text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-navy mt-3 tracking-tight leading-[1.05]">
              Vinte abas abertas não são um plano.
            </h2>
            <p className="mt-6 text-base text-text-muted leading-relaxed">
              A 2GO começou de um hábito conhecido: mapa numa aba, museu na outra, horário de trem numa terceira, e o dia ainda sem ordem. A gente existe para fechar isso.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 max-w-3xl w-full text-left">
            <p className="text-base text-text-muted leading-relaxed">
              O site mostra o lugar. O aplicativo coloca a manhã, o deslocamento e o que ainda cabe antes do jantar. A inteligência sugere a sequência. Você muda o que não combina com o seu ritmo e leva o dia no bolso, mesmo sem sinal.
            </p>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-[#16357A] text-white">
          <div className="container mx-auto px-4 sm:px-6 max-w-3xl w-full text-left">
            <p className="text-xl sm:text-2xl font-headers font-bold leading-snug">
              Paris às nove, o próximo passo quando o metrô atrasa, o mapa quando a rua some. É isso que a gente quer na sua mão.
            </p>
          </div>
        </section>

        {/* 7. TESTIMONIALS */}
        <section id="avaliacoes" className="py-12 lg:py-28 bg-white border-b border-border-gray/50 scroll-mt-20">
          <ScrollReveal className="container mx-auto px-4 sm:px-6 max-w-6xl w-full">
            <div className="text-center max-w-[600px] mx-auto mb-10 md:mb-16">
              <span className="bg-brand-navy/10 text-brand-navy text-[12px] font-extrabold tracking-wide px-3 py-1 rounded-full w-fit">
                Depoimentos
              </span>
              <h2 className="font-headers text-3xl md:text-3.5xl font-black mt-4 text-brand-navy tracking-tight">
                Viajantes 2GO
              </h2>
              <p className="text-sm text-text-muted mt-3">
                Histórias reais de quem organizou a rota em minutos e viajou sem dor de cabeça.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
              {[
                { 
                  name: 'Amanda Martins', 
                  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80', 
                  text: 'O dia a dia ficou claro antes mesmo de embarcar.', 
                  trip: 'Noronha • Roteiro no App',
                  badgeColor: 'bg-brand-orange/10 text-brand-orange'
                },
                { 
                  name: 'Rodrigo Fonseca', 
                  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80', 
                  text: 'Sentimos que o roteiro tinha sido feito para nós.', 
                  trip: 'Tóquio • Roteiro no App',
                  badgeColor: 'bg-brand-green/10 text-brand-green'
                },
                { 
                  name: 'Luísa Cavalcanti', 
                  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80', 
                  text: 'Economizei semanas de pesquisa.', 
                  trip: 'Lisboa • Roteiro no App',
                  badgeColor: 'bg-brand-orange/10 text-brand-orange'
                }
              ].map((review, idx) => (
                <div key={idx} className="group bg-[#F7F8FA] border border-border-gray/70 p-6 sm:p-8 rounded-2xl lg:rounded-[24px] shadow-xs hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 flex flex-col text-left card-premium-hover">
                  <span className={`text-[11px] font-extrabold tracking-wide px-2.5 py-1 rounded w-fit mb-6 ${review.badgeColor}`}>Feedback verificado</span>
                  <p className="text-base italic leading-relaxed mb-6 flex-grow font-semibold text-brand-navy">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-3.5 mt-auto pt-4 border-t border-border-gray/30">
                    <img 
                      src={review.avatar} 
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover border border-brand-navy/10 transition-transform group-hover:scale-105 duration-300"
                    />
                    <div className="flex flex-col">
                      <h4 className="text-xs font-extrabold text-brand-navy">{review.name}</h4>
                      <span className="text-[12px] text-text-muted leading-none mt-1">{review.trip}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* 8. FINAL CTA (CLEAN REDESIGN) */}
        <section className="py-12 lg:py-28 bg-[#F7F8FA] relative overflow-hidden">
          <div className="absolute top-10 left-10 w-2.5 h-2.5 bg-brand-orange/40 rounded-full"></div>
          <div className="absolute bottom-20 left-1/3 w-3 h-3 bg-brand-green/30 rounded-full"></div>

          <ScrollReveal className="container mx-auto px-4 sm:px-6 max-w-6xl w-full">
            <div className="bg-[#FAF9F6] text-brand-navy p-6 md:p-16 rounded-[28px] lg:rounded-[32px] relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center gap-12 text-left shadow-lg border border-brand-navy/5">
              {/* Subtle background glow */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none select-none"></div>
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#96AB21]/10 rounded-full blur-[100px] pointer-events-none select-none"></div>

              <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 relative z-10 w-full">
                <span className="bg-brand-orange text-white text-[11px] font-extrabold tracking-widest px-2.5 py-1 rounded-full w-fit">
                  Roteiros personalizados
                </span>
                <h2 className="font-headers text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-brand-navy">
                  Seus roteiros ganham vida no app
                </h2>
                <p className="text-sm md:text-base text-text-muted leading-relaxed">
                  Veja destinos aqui. Timeline, mapa e ajustes ficam no aplicativo.
                </p>
                
                <div className="flex flex-col gap-2 mt-2 w-full sm:w-auto items-center sm:items-start">
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setIsDownloadOpen(true)}
                      className="bg-[#F47A20] hover:bg-[#ff8f3c] text-white font-extrabold px-8 py-4 rounded-xl shadow-md shadow-brand-orange/20 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.01] active:scale-95 border-none"
                    >
                      Baixar o App
                    </button>
                    <Link
                      href="/roteiros"
                      className="border border-brand-navy/30 text-brand-navy hover:bg-brand-navy/5 font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center bg-transparent"
                    >
                      Ver roteiros
                    </Link>
                  </div>
                  <p className="text-[11px] text-brand-navy/60 font-semibold tracking-wide mt-1">
                    A prévia fica no site. O dia a dia, no aplicativo.
                  </p>
                </div>
              </div>
              
              {/* iOS Clean App Mockup in Pure CSS */}
              <div className="lg:col-span-5 relative z-10 flex justify-center items-center w-full">
                <div className="w-[280px] h-[500px] bg-[#0A1128] border-[6px] border-brand-navy rounded-[42px] shadow-2xl relative flex flex-col p-2.5 ring-8 ring-brand-navy/5 select-none hover:scale-102 transition-transform duration-500">
                  {/* Dynamic Island */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4.5 bg-brand-navy rounded-full z-30 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10 absolute right-3"></div>
                  </div>

                  {/* Device Screen */}
                  <div className="bg-white h-full w-full rounded-[32px] overflow-hidden flex flex-col justify-between p-4 font-sans text-brand-navy relative shadow-inner">
                    {/* Time & Battery Status Bar */}
                    <div className="flex justify-between items-center text-[9px] font-bold text-brand-navy/40 px-2 pt-0.5">
                      <span>09:41</span>
                      <div className="flex items-center gap-1">
                        <span>📶</span>
                        <span>🔋</span>
                      </div>
                    </div>

                    {/* Screen Header */}
                    <div className="text-left mt-3 px-1">
                      <span className="text-[9px] font-extrabold text-brand-orange uppercase tracking-wider block">Meu Roteiro</span>
                      <h4 className="font-headers text-base font-extrabold text-brand-navy leading-tight mt-0.5">Noronha Completo 🏝️</h4>
                    </div>

                    {/* Day Tabs */}
                    <div className="flex gap-1 mt-3 px-1 overflow-x-auto pb-1 text-[10px] font-bold">
                      <span className="bg-brand-navy text-white px-3 py-1.5 rounded-full cursor-pointer">Dia 1</span>
                      <span className="bg-bg-light text-text-muted px-3 py-1.5 rounded-full cursor-pointer">Dia 2</span>
                      <span className="bg-bg-light text-text-muted px-3 py-1.5 rounded-full cursor-pointer">Dia 3</span>
                    </div>

                    {/* Clean Timeline (Notion/Airbnb style) */}
                    <div className="flex-grow flex flex-col gap-3.5 mt-4 text-left px-2 border-l-2 border-border-gray ml-3 relative">
                      {/* Event 1 */}
                      <div className="relative pl-4">
                        <div className="absolute top-1 left-[-23px] w-3 h-3 rounded-full bg-brand-orange border border-white shadow-xs"></div>
                        <span className="text-[9px] font-extrabold text-[#F47A20] block font-mono">09:00</span>
                        <h5 className="text-[12px] font-extrabold text-brand-navy mt-0.5 leading-tight">Passeio de Barco ⛵</h5>
                        <span className="inline-block text-[8px] bg-brand-green/10 text-brand-green font-bold px-1.5 py-0.5 rounded-md mt-0.5">Confirmado</span>
                      </div>

                      {/* Event 2 */}
                      <div className="relative pl-4">
                        <div className="absolute top-1 left-[-23px] w-3 h-3 rounded-full bg-[#96AB21] border border-white shadow-xs"></div>
                        <span className="text-[9px] font-extrabold text-[#96AB21] block font-mono">13:00</span>
                        <h5 className="text-[12px] font-extrabold text-brand-navy mt-0.5 leading-tight">Almoço no Pico 🍽️</h5>
                        <p className="text-[9px] text-text-muted mt-0.5 leading-none">Frutos do mar locais</p>
                      </div>

                      {/* Event 3 */}
                      <div className="relative pl-4">
                        <div className="absolute top-1 left-[-23px] w-3 h-3 rounded-full bg-brand-navy border border-white shadow-xs"></div>
                        <span className="text-[9px] font-extrabold text-brand-navy/60 block font-mono">16:30</span>
                        <h5 className="text-[12px] font-extrabold text-brand-navy mt-0.5 leading-tight">Pôr do Sol no Boldró 🌅</h5>
                        <span className="inline-block text-[8px] bg-brand-orange/10 text-brand-orange font-bold px-1.5 py-0.5 rounded-md mt-0.5">Imperdível</span>
                      </div>
                    </div>

                    {/* Bottom Nav Bar */}
                    <div className="border-t border-border-gray/40 pt-2 flex justify-around items-center text-[9px] font-extrabold text-brand-navy/65 mt-2 bg-white w-full">
                      <div className="flex flex-col items-center gap-0.5 text-brand-orange">
                        <span>📍</span>
                        <span>Roteiro</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <span>💬</span>
                        <span>Especialista</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <span>🗺️</span>
                        <span>Mapa</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 9. NEWSLETTER */}
        <section className="pb-20 bg-[#F7F8FA]">
          <div className="container mx-auto px-6 max-w-5xl">
            <NewsletterBox />
          </div>
        </section>
      </main>

      <Footer onOpenDownload={() => setIsDownloadOpen(true)} />
      
      <AppDownloadModal 
        isOpen={isDownloadOpen} 
        onClose={() => setIsDownloadOpen(false)} 
      />
    </div>
  );
}

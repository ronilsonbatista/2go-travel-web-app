"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarDays,
  Camera,
  Plane,
  Users,
  Utensils
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppDownloadModal from '@/components/AppDownloadModal';
import ScrollReveal from '@/components/ScrollReveal';

const PHOTOS = {
  hero: '/images/destinations/paris/paris-eiffel-seine.jpg',
  problem: '/images/destinations/nova-york/nova-york-brooklyn-bridge.jpg',
  solution: '/images/destinations/roma/roma-coliseu.jpg',
  purpose: '/assets/greece.png'
};

const UNIQUE_POINTS = [
  {
    icon: Camera,
    text: 'Os principais pontos turísticos.'
  },
  {
    icon: Utensils,
    text: 'Gastronomia, cultura e vida noturna.'
  },
  {
    icon: Users,
    text: 'Em casal ou com crianças.'
  },
  {
    icon: CalendarDays,
    text: 'Sete dias ou apenas três.'
  }
];

function SectionLabel({ children }) {
  return (
    <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-brand-orange">
      {children}
    </p>
  );
}

function TravelPhoto({ src, alt, className = '', radiusClass = 'rounded-tl-[4rem] rounded-br-[4rem] rounded-tr-3xl rounded-bl-3xl' }) {
  return (
    <div className={`relative overflow-hidden bg-bg-light shadow-lg ${radiusClass} ${className}`}>
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}

export default function QuemSomosClient() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  return (
    <div className="w-full bg-white min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy overflow-x-clip">
      <Header solid onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-28 pb-0">
        {/* Hero — QUEM SOMOS */}
        <section className="relative overflow-hidden bg-white">
          <div className="container relative z-10 mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-4 pb-16 pt-6 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8 lg:pb-24 lg:pt-10">
            <ScrollReveal className="relative z-10 text-left lg:col-span-6 min-w-0">
              <SectionLabel>Quem somos</SectionLabel>
              <h1 className="font-headers mt-4 max-w-xl text-4xl font-extrabold leading-[1.08] tracking-tight text-brand-navy sm:text-5xl lg:text-6xl">
                Quem somos
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
                A 2GO é uma plataforma de planejamento de viagens que transforma a pesquisa sobre um destino em um roteiro personalizado, organizado e feito para o seu jeito de viajar.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
                Nossa proposta é simples: facilitar a descoberta do que fazer em cada destino e transformar todas as informações necessárias para uma viagem em um único roteiro.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setIsDownloadOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-7 py-3.5 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5"
                >
                  Baixar o App
                  <ArrowRight className="h-4 w-4" />
                </button>
                <Link
                  href="/guias"
                  className="inline-flex items-center justify-center rounded-full border border-brand-navy/25 px-7 py-3.5 text-sm font-bold text-brand-navy transition-colors hover:bg-brand-navy/5"
                >
                  Ver guia
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal className="relative lg:col-span-6 min-w-0" delay={100}>
              <div
                aria-hidden
                className="pointer-events-none absolute -left-6 top-10 z-20 hidden w-[58%] lg:block"
              >
                <svg viewBox="0 0 320 120" fill="none" className="h-36 w-full text-brand-orange">
                  <path
                    d="M8 96 C 90 10, 210 10, 292 52"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="6 8"
                  />
                </svg>
                <Plane className="absolute right-0 top-8 h-5 w-5 rotate-[28deg] text-brand-navy" />
              </div>
              <TravelPhoto
                src={PHOTOS.hero}
                alt="Paris ao entardecer"
                className="aspect-[4/5] w-full max-h-[560px] sm:aspect-[5/6]"
              />
            </ScrollReveal>
          </div>
        </section>

        {/* O PROBLEMA */}
        <section className="bg-[#F7F8FA]">
          <div className="container mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8 lg:py-24">
            <ScrollReveal className="order-2 lg:order-1 lg:col-span-5 min-w-0">
              <TravelPhoto
                src={PHOTOS.problem}
                alt="Vista da cidade"
                className="aspect-[4/5] w-full max-h-[520px]"
              />
            </ScrollReveal>
            <ScrollReveal className="order-1 text-left lg:order-2 lg:col-span-7 min-w-0" delay={80}>
              <SectionLabel>O problema</SectionLabel>
              <h2 className="font-headers mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-4xl lg:text-[2.75rem]">
                Hoje, planejar uma viagem pode significar{' '}
                <span className="text-brand-orange">passar horas pesquisando.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
                Você procura artigos, assiste a vídeos, salva publicações nas redes sociais, compara preços, descobre como chegar a cada atração, pesquisa restaurantes, horários, ingressos, transporte e, depois, ainda precisa organizar tudo para que faça sentido dentro dos dias que você tem disponíveis.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* A NOSSA SOLUÇÃO */}
        <section className="bg-white">
          <div className="container mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8 lg:py-24">
            <ScrollReveal className="text-left lg:col-span-6 min-w-0">
              <SectionLabel>A nossa solução</SectionLabel>
              <h2 className="font-headers mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-4xl lg:text-[2.75rem]">
                A 2GO <span className="text-brand-orange">simplifica</span> esse processo.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
                Você informa o destino, as datas da viagem, seus interesses, orçamento e estilo de viagem. A partir disso, a plataforma organiza as informações e cria uma experiência personalizada, considerando o que realmente importa para você.
              </p>
            </ScrollReveal>
            <ScrollReveal className="lg:col-span-6 min-w-0" delay={80}>
              <TravelPhoto
                src={PHOTOS.solution}
                alt="Roma e a Fontana di Trevi"
                className="aspect-[5/4] w-full max-h-[480px]"
                radiusClass="rounded-tr-[4rem] rounded-bl-[4rem] rounded-tl-3xl rounded-br-3xl"
              />
            </ScrollReveal>
          </div>
        </section>

        {/* Porque cada viagem é única */}
        <section className="bg-[#F7F8FA]">
          <div className="container mx-auto max-w-[1440px] px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
            <ScrollReveal>
              <h2 className="font-headers text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl lg:text-5xl">
                Porque cada viagem é única.
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-text-muted sm:text-lg">
                Duas pessoas podem viajar para Nova York e querer experiências completamente diferentes.
              </p>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-text-muted sm:text-lg">
                Uma pode querer conhecer os principais pontos turísticos. Outra pode preferir gastronomia, cultura e vida noturna. Uma pode viajar em casal, outra com crianças. Uma pode ter sete dias, enquanto outra terá apenas três.
              </p>
            </ScrollReveal>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {UNIQUE_POINTS.map((point, index) => {
                const Icon = point.icon;
                return (
                  <ScrollReveal key={point.text} delay={index * 60}>
                    <div className="flex h-full flex-col items-center rounded-[28px] border border-border-gray/70 bg-white px-5 py-8 text-center shadow-sm">
                      <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                        <Icon className="h-6 w-6" strokeWidth={1.75} />
                      </span>
                      <p className="text-sm font-semibold leading-relaxed text-brand-navy">
                        {point.text}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            <ScrollReveal className="mx-auto mt-12 max-w-3xl text-left sm:text-center" delay={80}>
              <p className="font-headers text-xl font-extrabold text-brand-navy sm:text-2xl">
                Por isso, acreditamos que roteiros prontos não são suficientes.
              </p>
              <p className="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">
                A 2GO foi criada para adaptar o planejamento à realidade de cada viajante.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* NOSSO PROPÓSITO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={PHOTOS.purpose}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/35" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
          </div>

          <div className="container relative z-10 mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <ScrollReveal className="max-w-2xl text-left">
              <SectionLabel>Nosso propósito</SectionLabel>
              <h2 className="font-headers mt-4 text-4xl font-extrabold leading-tight tracking-tight text-brand-navy sm:text-5xl lg:text-6xl">
                Menos pesquisa.{' '}
                <span className="text-brand-orange">Mais viagem.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-text-muted sm:text-lg">
                Nosso objetivo é economizar o seu tempo e tornar o planejamento mais simples, organizado e eficiente.
              </p>
              <p className="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">
                Em vez de abrir dezenas de abas para descobrir o que fazer, quanto custa, como chegar, quando ir e como organizar tudo, você encontra essas informações reunidas em um roteiro pensado para a sua viagem.
              </p>
              <p className="mt-8 font-headers text-xl font-extrabold text-brand-navy sm:text-2xl">
                Porque o melhor roteiro não é aquele que tenta mostrar tudo.
              </p>
              <p className="mt-3 text-base font-semibold leading-relaxed text-brand-navy/80 sm:text-lg">
                É aquele que faz sentido para você.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => setIsDownloadOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-7 py-3.5 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5"
                >
                  Baixar o App
                  <ArrowRight className="h-4 w-4" />
                </button>
                <Link
                  href="/roteiros"
                  className="inline-flex items-center justify-center rounded-full border border-brand-navy/25 bg-white/70 px-7 py-3.5 text-sm font-bold text-brand-navy backdrop-blur-sm transition-colors hover:bg-white"
                >
                  Ver roteiros
                </Link>
              </div>

              <div className="mt-14 border-t border-brand-navy/10 pt-8">
                <p className="font-headers text-3xl font-extrabold tracking-tight text-brand-navy">2GO</p>
                <p className="mt-2 text-base font-semibold text-brand-orange sm:text-lg">
                  Seu destino. Seu tempo. Seu jeito de viajar.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer onOpenDownload={() => setIsDownloadOpen(true)} />
      <AppDownloadModal isOpen={isDownloadOpen} onClose={() => setIsDownloadOpen(false)} />
    </div>
  );
}

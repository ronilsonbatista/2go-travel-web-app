"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppDownloadModal from '@/components/AppDownloadModal';
import AppPhoneMockup from '@/components/AppPhoneMockup';
import ScrollReveal from '@/components/ScrollReveal';

export default function QuemSomosClient() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  return (
    <div className="w-full bg-white min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header solid onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-28 pb-20">
        <section className="relative overflow-hidden bg-[#F4F6F9]">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-brand-orange/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-brand-navy/10 blur-3xl"
          />

          <div className="container relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:py-24">
            <ScrollReveal className="text-left lg:col-span-7">
              <p className="text-[11px] font-extrabold tracking-[0.18em] text-brand-orange uppercase">
                Quem somos
              </p>
              <h1 className="font-headers mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight text-brand-navy sm:text-5xl lg:text-6xl">
                A 2GO é uma plataforma de planejamento de viagens
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
                que transforma a pesquisa sobre um destino em um roteiro personalizado, organizado e feito para o seu jeito de viajar.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setIsDownloadOpen(true)}
                  className="inline-flex items-center justify-center rounded-xl bg-brand-navy px-6 py-3.5 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5"
                >
                  Baixar o App
                </button>
                <Link
                  href="/guias"
                  className="inline-flex items-center justify-center rounded-xl border border-brand-navy/30 px-6 py-3.5 text-sm font-bold text-brand-navy transition-colors hover:bg-brand-navy/5"
                >
                  Ver guia
                </Link>
              </div>
            </ScrollReveal>

            <ScrollReveal className="flex justify-center lg:col-span-5" delay={120}>
              <AppPhoneMockup variant="roma" size="md" />
            </ScrollReveal>
          </div>
        </section>

        <section className="bg-white">
          <div className="container mx-auto max-w-3xl px-4 py-16 text-left sm:px-6 lg:py-20">
            <ScrollReveal>
              <h2 className="font-headers text-2xl font-extrabold text-brand-navy sm:text-3xl">
                Nossa proposta é simples
              </h2>
              <p className="mt-4 text-base leading-relaxed text-text-muted">
                Facilitar a descoberta do que fazer em cada destino e transformar todas as informações necessárias para uma viagem em um único roteiro.
              </p>
            </ScrollReveal>

            <ScrollReveal className="mt-10" delay={40}>
              <p className="text-base leading-relaxed text-text-muted">
                Hoje, planejar uma viagem pode significar passar horas pesquisando. Você procura artigos, assiste a vídeos, salva publicações nas redes sociais, compara preços, descobre como chegar a cada atração, pesquisa restaurantes, horários, ingressos, transporte e, depois, ainda precisa organizar tudo para que faça sentido dentro dos dias que você tem disponíveis.
              </p>
              <p className="mt-6 font-headers text-xl font-extrabold text-brand-navy sm:text-2xl">
                A 2GO simplifica esse processo.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="bg-[#F7F8FA]">
          <div className="container mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-20">
            <ScrollReveal className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
              <div className="text-left lg:col-span-7">
                <h2 className="font-headers text-2xl font-extrabold text-brand-navy sm:text-3xl">
                  Porque cada viagem é única.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-text-muted">
                  Você informa o destino, as datas da viagem, seus interesses, orçamento e estilo de viagem. A partir disso, a plataforma organiza as informações e cria uma experiência personalizada, considerando o que realmente importa para você.
                </p>
                <p className="mt-4 text-base leading-relaxed text-text-muted">
                  Duas pessoas podem viajar para Nova York e querer experiências completamente diferentes.
                </p>
                <p className="mt-4 text-base leading-relaxed text-text-muted">
                  Uma pode querer conhecer os principais pontos turísticos. Outra pode preferir gastronomia, cultura e vida noturna. Uma pode viajar em casal, outra com crianças. Uma pode ter sete dias, enquanto outra terá apenas três.
                </p>
                <p className="mt-6 font-headers text-lg font-extrabold text-brand-navy">
                  Por isso, acreditamos que roteiros prontos não são suficientes.
                </p>
                <p className="mt-3 text-base leading-relaxed text-text-muted">
                  A 2GO foi criada para adaptar o planejamento à realidade de cada viajante.
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-[28px] bg-brand-navy px-6 py-8 text-white shadow-lg">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-orange/30 blur-2xl"
                  />
                  <div className="relative z-10">
                    <div className="mb-6 flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-brand-orange" />
                      <span className="h-2.5 w-2.5 rounded-full bg-brand-green" />
                      <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
                    </div>
                    <p className="font-headers text-2xl font-extrabold leading-snug sm:text-3xl">
                      “Menos pesquisa. Mais viagem.”
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-white/75">
                      Nosso objetivo é economizar o seu tempo e tornar o planejamento mais simples, organizado e eficiente.
                    </p>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 text-left">
                  {[
                    'Destino, datas e interesses',
                    'Orçamento e estilo de viagem',
                    'Roteiro personalizado no app'
                  ].map((item, index) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-border-gray/70 bg-white px-4 py-3 text-sm font-semibold text-brand-navy"
                    >
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-orange/10 text-xs font-extrabold text-brand-orange">
                        {index + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="bg-white">
          <div className="container mx-auto max-w-3xl px-4 py-16 text-left sm:px-6 lg:py-20">
            <ScrollReveal>
              <p className="text-base leading-relaxed text-text-muted">
                Em vez de abrir dezenas de abas para descobrir o que fazer, quanto custa, como chegar, quando ir e como organizar tudo, você encontra essas informações reunidas em um roteiro pensado para a sua viagem.
              </p>
              <p className="mt-6 font-headers text-xl font-extrabold text-brand-navy sm:text-2xl">
                Porque o melhor roteiro não é aquele que tenta mostrar tudo.
              </p>
              <p className="mt-3 text-base font-semibold leading-relaxed text-brand-navy/80">
                É aquele que faz sentido para você.
              </p>
            </ScrollReveal>

            <ScrollReveal className="mt-12" delay={80}>
              <div className="rounded-[28px] border border-brand-navy/10 bg-[#F4F6F9] px-6 py-8 text-center sm:px-10">
                <p className="font-headers text-3xl font-extrabold tracking-tight text-brand-navy">2GO</p>
                <p className="mt-2 text-base font-semibold text-brand-orange sm:text-lg">
                  Seu destino. Seu tempo. Seu jeito de viajar.
                </p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setIsDownloadOpen(true)}
                    className="inline-flex items-center justify-center rounded-xl bg-brand-orange px-6 py-3.5 text-sm font-extrabold text-white transition-transform hover:-translate-y-0.5"
                  >
                    Baixar o App
                  </button>
                  <Link
                    href="/roteiros"
                    className="inline-flex items-center justify-center rounded-xl border border-brand-navy/30 px-6 py-3.5 text-sm font-bold text-brand-navy"
                  >
                    Ver roteiros
                  </Link>
                </div>
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

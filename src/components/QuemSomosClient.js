"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppDownloadModal from '@/components/AppDownloadModal';

export default function QuemSomosClient() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  return (
    <div className="w-full bg-white min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header solid onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-2xl w-full text-left">
          <Breadcrumbs items={[{ name: 'Quem somos', url: '/quem-somos' }]} />

          <header className="mt-10">
            <p className="text-[11px] font-extrabold tracking-[0.18em] text-brand-orange uppercase">2GO</p>
            <h1 className="font-headers text-4xl sm:text-5xl font-extrabold text-brand-navy mt-3 tracking-tight leading-[1.05]">
              Vinte abas abertas não são um plano.
            </h1>
          </header>

          <div className="mt-8 space-y-5 text-base text-text-muted leading-relaxed">
            <p>
              A 2GO começou de um hábito conhecido: mapa numa aba, museu na outra, horário de trem numa terceira, e o dia ainda sem ordem. A gente existe para fechar isso.
            </p>
            <p>
              O site mostra o lugar. O aplicativo coloca a manhã, o deslocamento e o que ainda cabe antes do jantar. A inteligência sugere a sequência. Você muda o que não combina com o seu ritmo e leva o dia no bolso, mesmo sem sinal.
            </p>
            <p className="text-brand-navy font-semibold">
              Paris às nove, o próximo passo quando o metrô atrasa, o mapa quando a rua some. É isso que a gente quer na sua mão.
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => setIsDownloadOpen(true)}
              className="inline-flex items-center justify-center bg-brand-navy text-white font-extrabold text-sm px-6 py-3.5 rounded-xl"
            >
              Baixar o App
            </button>
            <Link
              href="/roteiros"
              className="inline-flex items-center justify-center border border-brand-navy/30 text-brand-navy font-bold text-sm px-6 py-3.5 rounded-xl"
            >
              Ver roteiros
            </Link>
          </div>
        </div>
      </main>

      <Footer onOpenDownload={() => setIsDownloadOpen(true)} />
      <AppDownloadModal isOpen={isDownloadOpen} onClose={() => setIsDownloadOpen(false)} />
    </div>
  );
}

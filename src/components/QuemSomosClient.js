"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppDownloadModal from '@/components/AppDownloadModal';

export default function QuemSomosClient() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  return (
    <div className="w-full bg-white min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header solid onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-28 pb-20">
        <section className="bg-[#F4F6F9]">
          <div className="container mx-auto px-4 sm:px-6 max-w-3xl w-full text-left py-16 lg:py-24">
            <p className="text-[11px] font-extrabold tracking-[0.18em] text-brand-orange uppercase">Quem somos</p>
            <h1 className="font-headers text-4xl sm:text-5xl font-extrabold text-brand-navy mt-3 tracking-tight leading-[1.05]">
              Roteiros claros para a viagem.
            </h1>
            <div className="mt-6 space-y-4 text-base text-text-muted leading-relaxed">
              <p>
                A 2GO ajuda a planejar a viagem com roteiros claros no aplicativo. A tecnologia organiza o percurso. A curadoria escolhe o que vale o seu tempo.
              </p>
              <p>
                O site apresenta destinos, roteiros e o guia de viagem. No aplicativo, o roteiro fica útil no dia a dia: timeline, ajustes e mapa. Menos tempo perdido pesquisando. Mais tempo no destino.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setIsDownloadOpen(true)}
                className="inline-flex items-center justify-center bg-brand-navy text-white font-extrabold text-sm px-6 py-3.5 rounded-xl"
              >
                Baixar o App
              </button>
              <Link
                href="/guias"
                className="inline-flex items-center justify-center border border-brand-navy/30 text-brand-navy font-bold text-sm px-6 py-3.5 rounded-xl"
              >
                Ver guia
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenDownload={() => setIsDownloadOpen(true)} />
      <AppDownloadModal isOpen={isDownloadOpen} onClose={() => setIsDownloadOpen(false)} />
    </div>
  );
}

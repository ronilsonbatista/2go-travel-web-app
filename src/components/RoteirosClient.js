"use client";

import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import AppDownloadModal from './AppDownloadModal';
import { PhoneFrame } from './AppPhoneMockup';

function HeroPhone({ src, alt }) {
  return (
    <PhoneFrame size="md" className="max-w-[240px] sm:max-w-[280px] lg:max-w-[300px]" glowClassName="bg-[#081B6B]/20">
      <img src={src} alt={alt} className="h-full w-full object-cover object-top" />
    </PhoneFrame>
  );
}

export default function RoteirosClient() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy overflow-x-clip">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1440px] w-full text-left min-w-0">
          
          <Breadcrumbs items={[{ name: 'Roteiros', url: '/roteiros' }]} />

          {/* Header */}
          <header className="mt-6 mb-4">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-wide px-3 py-1.5 rounded-full w-fit">
              Exemplos de roteiros
            </span>
            <h1 className="font-headers text-3xl sm:text-5xl font-extrabold text-brand-navy mt-4 mb-4 tracking-tight break-words">
              Seus roteiros ganham vida no app
            </h1>
            <p className="text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
              Estes exemplos são uma prévia. Planejamento, timeline, mapa e ajustes ficam no aplicativo.
            </p>
            <button
              type="button"
              onClick={() => setIsDownloadOpen(true)}
              className="mt-5 inline-flex items-center justify-center bg-brand-navy hover:bg-brand-navy/90 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl"
            >
              Baixar o App
            </button>
          </header>

          <section className="my-8 bg-white border border-border-gray rounded-[28px] p-5 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-6 text-left">
                <p className="text-[11px] font-extrabold tracking-wide text-brand-orange">Prints do aplicativo</p>
                <h2 className="font-headers text-2xl sm:text-3xl font-extrabold text-brand-navy mt-2">
                  Da próxima viagem ao dia a dia
                </h2>
                <p className="text-sm text-text-muted mt-3 leading-relaxed max-w-md">
                  A home mostra a viagem que vem. O roteiro abre o dia, o horário e o mapa. Você ajusta tudo no app.
                </p>
              </div>
              <div className="lg:col-span-6 flex justify-center lg:justify-end py-6 lg:py-2">
                <HeroPhone
                  src="/assets/app-home-gustavo.webp"
                  alt="Tela inicial do app 2GO, com a próxima viagem para Roma"
                />
              </div>
            </div>
          </section>

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

"use client";

import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import AppDownloadModal from './AppDownloadModal';

export default function RoteirosClient() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy overflow-x-clip">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-24 pb-28 lg:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] w-full text-left min-w-0">
          
          <Breadcrumbs items={[{ name: 'Roteiros', url: '/roteiros' }]} />

          <header className="mt-6 mb-4">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-wide px-3 py-1.5 rounded-full w-fit">
              Exemplos de roteiros
            </span>
            <h1 className="font-headers text-3xl sm:text-5xl font-extrabold text-brand-navy mt-4 mb-3 tracking-tight">
              Crie seu roteiro personalizado
            </h1>
            <p className="text-sm sm:text-base text-text-muted max-w-3xl leading-relaxed">
              Planeje sua próxima viagem do seu jeito, com muito mais praticidade.
            </p>
            <button
              type="button"
              onClick={() => setIsDownloadOpen(true)}
              className="mt-5 inline-flex min-h-11 w-full sm:w-auto items-center justify-center rounded-xl bg-brand-navy px-6 py-3.5 text-sm font-extrabold text-white hover:bg-brand-navy/90"
            >
              Criar meu roteiro
            </button>
          </header>

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

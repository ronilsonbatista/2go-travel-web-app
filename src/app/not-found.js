"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, Compass, Map } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppDownloadModal from '@/components/AppDownloadModal';

export default function NotFound() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow flex items-center justify-center pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-lg text-center flex flex-col items-center justify-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-brand-orange/10 flex items-center justify-center text-brand-orange animate-bounce">
              <Map className="w-12 h-12" />
            </div>
            <span className="absolute -top-1 -right-1 text-2xl">🧭</span>
          </div>

          <div>
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3 py-1.5 rounded-full w-fit mx-auto block">
              ERRO 404: ROTA PERDIDA
            </span>
            <h1 className="font-headers text-3.5xl sm:text-4xl font-extrabold text-brand-navy mt-4 mb-2 tracking-tight">
              Página Não Encontrada
            </h1>
            <p className="text-sm text-text-muted leading-relaxed">
              O destino que você está tentando acessar não está em nosso mapa ou foi movido para uma nova coordenada.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mt-4">
            <Link 
              href="/"
              className="btn btn-primary flex-1 py-3 text-xs font-bold justify-center flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Home className="w-4 h-4" /> Ir para Início
            </Link>
            <Link 
              href="/guias"
              className="btn btn-outline flex-1 py-3 text-xs font-bold justify-center flex items-center gap-2 cursor-pointer transition-all hover:bg-brand-orange hover:text-white hover:border-brand-orange"
            >
              <Compass className="w-4 h-4" /> Ver Guias
            </Link>
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

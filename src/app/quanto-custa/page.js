"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, DollarSign } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppDownloadModal from '@/components/AppDownloadModal';
import { getDestinations } from '@/lib/cms';

export default function QuantoCusta() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [destList, setDestList] = useState([]);

  useEffect(() => {
    getDestinations().then(data => setDestList(data));
  }, []);

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-5xl text-left">
          
          <Breadcrumbs items={[{ name: 'Quanto Custa Viajar', url: '/quanto-custa' }]} />

          {/* Header */}
          <header className="my-8">
            <span className="bg-brand-green/10 text-brand-green text-[10px] font-extrabold tracking-widest px-3 py-1.5 rounded-full w-fit">
              PLANEJAMENTO FINANCEIRO
            </span>
            <h1 className="font-headers text-3.5xl sm:text-5xl font-extrabold text-brand-navy mt-4 mb-4 tracking-tight">
              Quanto custa viajar?
            </h1>
            <p className="text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
              Compare orçamentos diários detalhados para diversos perfis de viagem. Saiba quanto gastará com alimentação, transporte local, hotéis e ingressos.
            </p>
          </header>

          {/* Grid list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {destList.map((dest) => (
              <div 
                key={dest.slug}
                className="group bg-white border border-border-gray p-6 rounded-[24px] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="flex flex-col gap-4 text-left">
                  <div className="flex justify-between items-center">
                    <span className="text-3xl">{dest.emoji}</span>
                    <span className="text-[10px] text-brand-green bg-brand-green/10 px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                      {dest.currency}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headers text-lg font-bold text-brand-navy group-hover:text-brand-orange transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed line-clamp-2">
                      Estimativas de orçamento e calculadora de gastos para {dest.name}.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border-gray/30 mt-6">
                  <Link 
                    href={`/quanto-custa/${dest.slug}`}
                    className="btn btn-outline py-2.5 text-xs text-center justify-center font-bold w-full hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all flex items-center gap-1.5 group/btn"
                  >
                    <span>Calcular Gastos</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
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

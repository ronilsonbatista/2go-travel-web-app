"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, HeartPulse, HelpCircle, Compass, Sparkles, Check, DollarSign } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppDownloadModal from '@/components/AppDownloadModal';
import NewsletterBox from '@/components/NewsletterBox';
import { trackPageView, trackEvent } from '@/lib/analytics';

export default function SeguroViagem() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  useEffect(() => {
    trackPageView('seguro_viagem');
  }, []);

  const handleQuoteClick = () => {
    trackEvent('click_insurance_quote', {
      partner: '2go_insurance_partner',
      destination_group: 'schengen_global'
    });
    if (typeof window !== 'undefined') {
      alert('Redirecionando para a calculadora de cotação com nosso parceiro de seguro viagem (com cupom 2GO de 15% de desconto aplicado)!');
      window.open('https://seguro.2go.com.br/cotador-mock', '_blank');
    }
  };

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-5xl text-left">
          
          <Breadcrumbs items={[{ name: 'Seguro Viagem', url: '/seguro-viagem' }]} />

          {/* Header */}
          <header className="my-8">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3 py-1.5 rounded-full w-fit">
              SEGURANÇA DO VIAJANTE
            </span>
            <h1 className="font-headers text-3.5xl sm:text-5xl font-extrabold text-brand-navy mt-4 mb-4 tracking-tight leading-tight">
              Seguro Viagem Internacional Obrigatório
            </h1>
            <p className="text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
              Saiba como escolher a cobertura certa, quais os limites mínimos exigidos no Espaço Schengen e garanta sua viagem sem imprevistos.
            </p>
          </header>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-8">
            
            {/* Left Column: Insurance details */}
            <div className="lg:col-span-8 bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] shadow-sm flex flex-col gap-8 w-full text-left">
              
              {/* Coverage requirements */}
              <section className="flex flex-col gap-4">
                <h2 className="font-headers text-lg font-bold text-brand-navy flex items-center gap-2">
                  <ShieldCheck className="w-5.5 h-5.5 text-brand-orange shrink-0" />
                  <span>Por que o seguro é obrigatório?</span>
                </h2>
                <p className="text-xs sm:text-sm text-text-main leading-relaxed">
                  Para entrar em 26 países da Europa integrados pelo Tratado de Schengen (incluindo Portugal, França e Itália), é exigido por lei um seguro de viagem com apólice mínima de <strong>€30.000 (trinta mil euros)</strong> para cobrir despesas médicas de urgência, internação hospitalar e repatriação.
                </p>
              </section>

              {/* Recommended Coverages */}
              <section className="flex flex-col gap-4">
                <h2 className="font-headers text-lg font-bold text-brand-navy flex items-center gap-2">
                  <HeartPulse className="w-5.5 h-5.5 text-brand-orange shrink-0" />
                  <span>O que a apólice deve cobrir?</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <div className="p-4 border border-border-gray/70 rounded-xl bg-bg-light/20 flex gap-2">
                    <Check className="w-4.5 h-4.5 text-brand-green shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-headers text-xs font-bold text-brand-navy">Despesas Médicas e Hospitalares</h4>
                      <p className="text-[11px] text-text-muted mt-0.5">Cobertura para consultas, exames de emergência e cirurgias.</p>
                    </div>
                  </div>
                  <div className="p-4 border border-border-gray/70 rounded-xl bg-bg-light/20 flex gap-2">
                    <Check className="w-4.5 h-4.5 text-brand-green shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-headers text-xs font-bold text-brand-navy">Extravio de Bagagem</h4>
                      <p className="text-[11px] text-text-muted mt-0.5">Indenizações suplementares caso sua mala seja perdida pela companhia aérea.</p>
                    </div>
                  </div>
                  <div className="p-4 border border-border-gray/70 rounded-xl bg-bg-light/20 flex gap-2">
                    <Check className="w-4.5 h-4.5 text-brand-green shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-headers text-xs font-bold text-brand-navy">Repatriação Médica</h4>
                      <p className="text-[11px] text-text-muted mt-0.5">Retorno médico seguro em voo adaptado caso haja necessidade de internação no Brasil.</p>
                    </div>
                  </div>
                  <div className="p-4 border border-border-gray/70 rounded-xl bg-bg-light/20 flex gap-2">
                    <Check className="w-4.5 h-4.5 text-brand-green shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-headers text-xs font-bold text-brand-navy">Atraso ou Cancelamento de Voo</h4>
                      <p className="text-[11px] text-text-muted mt-0.5">Reembolso de gastos com hospedagem e alimentação durante atrasos severos.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Quotation CTA Banner */}
              <section className="bg-brand-orange/5 border border-brand-orange/10 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <span className="text-[9px] font-extrabold text-brand-orange uppercase tracking-wider">APROVEITE O DESCONTO 2GO</span>
                  <h3 className="font-headers text-base font-bold text-brand-navy mt-1">Cotação Imediata de Seguro Viagem</h3>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">Use o convênio exclusivo 2GO e ganhe 15% de desconto em seguradoras líderes globais (GTA, Assist Card, Universal).</p>
                </div>
                <button 
                  onClick={handleQuoteClick}
                  className="btn btn-primary py-3 px-6 text-xs font-bold shrink-0 flex items-center gap-1.5 shadow-md shadow-brand-navy/10 cursor-pointer"
                >
                  <DollarSign className="w-4 h-4" />
                  <span>Cotar com Desconto</span>
                </button>
              </section>

            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-6 w-full text-left">
              
              {/* Extra Planner promo */}
              <div className="bg-brand-navy text-white p-6 rounded-[24px] shadow-sm flex flex-col gap-4 text-left">
                <Sparkles className="w-8 h-8 text-brand-orange animate-pulse" />
                <div>
                  <h4 className="font-headers font-bold text-sm">Organize todo o roteiro</h4>
                  <p className="text-[11px] text-white/70 mt-1 leading-normal">
                    Com a segurança garantida pelo seguro, monte seu dia a dia inteligente com o gerador automático da 2GO.
                  </p>
                </div>
                <Link 
                  href="/planejamento"
                  className="btn btn-secondary py-3 text-xs justify-center font-bold text-center w-full bg-brand-orange text-white hover:bg-white hover:text-brand-navy transition-all"
                >
                  Gerar Roteiro Grátis
                </Link>
              </div>

              {/* Newsletter capture */}
              <NewsletterBox destinationName="seguro_viagem" />

            </div>

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

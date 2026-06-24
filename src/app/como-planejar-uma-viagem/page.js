"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, CheckCircle2, Sliders, DollarSign, Calendar, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppDownloadModal from '@/components/AppDownloadModal';
import NewsletterBox from '@/components/NewsletterBox';
import { trackPageView } from '@/lib/analytics';

export default function ComoPlanejarUmaViagem() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  useEffect(() => {
    trackPageView('como_planejar_viagem');
  }, []);

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-5xl text-left">
          
          <Breadcrumbs items={[{ name: 'Como Planejar Viagem', url: '/como-planejar-uma-viagem' }]} />

          {/* Header */}
          <header className="my-8">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3 py-1.5 rounded-full w-fit">
              DICAS EDITORIAIS
            </span>
            <h1 className="font-headers text-3.5xl sm:text-5xl font-extrabold text-brand-navy mt-4 mb-4 tracking-tight leading-tight">
              Como Planejar uma Viagem do Zero
            </h1>
            <p className="text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
              O passo a passo definitivo e estruturado para você organizar sua próxima viagem nacional ou internacional sem esquecer nenhum detalhe.
            </p>
          </header>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-8">
            
            {/* Left Column: Planning Guide */}
            <div className="lg:col-span-8 bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] shadow-sm flex flex-col gap-8 w-full text-left">
              
              {/* Step 1 */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-brand-navy/5 flex items-center justify-center text-brand-navy shrink-0 font-headers font-bold text-sm">
                  01
                </div>
                <div>
                  <h3 className="font-headers text-sm sm:text-base font-bold text-brand-navy">Defina o Destino & Orçamento</h3>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    O ponto de partida é alinhar seus desejos com a viabilidade financeira. Pesquise a cotação de moedas e defina se a viagem será do tipo Mochileiro, Conforto ou Luxo. 
                  </p>
                  <Link 
                    href="/quanto-custa"
                    className="text-xs font-bold text-brand-orange hover:underline mt-2 inline-block"
                  >
                    Ver estimativas de custos por destino →
                  </Link>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-brand-navy/5 flex items-center justify-center text-brand-navy shrink-0 font-headers font-bold text-sm">
                  02
                </div>
                <div>
                  <h3 className="font-headers text-sm sm:text-base font-bold text-brand-navy">Escolha a Melhor Época (Clima)</h3>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    Evite viajar na estação de chuvas severas ou furacões. O clima influencia diretamente o que vestir, o que levar e a abertura das atrações locais.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-brand-navy/5 flex items-center justify-center text-brand-navy shrink-0 font-headers font-bold text-sm">
                  03
                </div>
                <div>
                  <h3 className="font-headers text-sm sm:text-base font-bold text-brand-navy">Providencie a Documentação</h3>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    Verifique se o destino exige vistos de entrada, certificados de vacinas específicas (como febre amarela) e certifique-se de fechar o seguro viagem obrigatório.
                  </p>
                  <div className="flex gap-4 mt-2">
                    <Link 
                      href="/documentos-portugal"
                      className="text-xs font-bold text-brand-orange hover:underline"
                    >
                      Imigração em Portugal →
                    </Link>
                    <Link 
                      href="/seguro-viagem"
                      className="text-xs font-bold text-brand-orange hover:underline"
                    >
                      Dicas de Seguro Viagem →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-brand-navy/5 flex items-center justify-center text-brand-navy shrink-0 font-headers font-bold text-sm">
                  04
                </div>
                <div>
                  <h3 className="font-headers text-sm sm:text-base font-bold text-brand-navy">Estruture o Roteiro Dia a Dia</h3>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    Divida suas atividades agrupando atrações próximas para economizar transporte e evitar exaustão. Separe os passeios mais distantes ou cansativos para o meio da viagem.
                  </p>
                  <Link 
                    href="/roteiros"
                    className="text-xs font-bold text-brand-orange hover:underline mt-2 inline-block"
                  >
                    Navegar por roteiros prontos curados →
                  </Link>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-brand-navy/5 flex items-center justify-center text-brand-navy shrink-0 font-headers font-bold text-sm">
                  05
                </div>
                <div>
                  <h3 className="font-headers text-sm sm:text-base font-bold text-brand-navy">Faça as malas com o Checklist</h3>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    Use listas de conferência para evitar surpresas no aeroporto, como adaptadores de tomada esquecidos ou falta de medicamentos fundamentais.
                  </p>
                  <Link 
                    href="/checklist-viagem"
                    className="text-xs font-bold text-brand-orange hover:underline mt-2 inline-block"
                  >
                    Acessar checklist interativo gratuito →
                  </Link>
                </div>
              </div>

            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-6 w-full text-left">
              
              {/* Extra Planner promo */}
              <div className="bg-brand-navy text-white p-6 rounded-[24px] shadow-sm flex flex-col gap-4 text-left">
                <Sparkles className="w-8 h-8 text-brand-orange animate-pulse" />
                <div>
                  <h4 className="font-headers font-bold text-sm">Facilite seu Planejamento</h4>
                  <p className="text-[11px] text-white/70 mt-1 leading-normal">
                    Em vez de planejar tudo na mão, nosso assistente inteligente automatiza seu cronograma de viagem em segundos.
                  </p>
                </div>
                <Link 
                  href="/planejamento"
                  className="btn btn-secondary py-3 text-xs justify-center font-bold text-center w-full bg-brand-orange text-white hover:bg-white hover:text-brand-navy transition-all"
                >
                  Gerar Roteiro Rápido
                </Link>
              </div>

              {/* Newsletter Box */}
              <NewsletterBox destinationName="como_planejar_viagem" />

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

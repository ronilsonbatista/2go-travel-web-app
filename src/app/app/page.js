"use client";

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Smartphone, Map, CloudOff, Share2, Ticket, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppDownloadModal from '@/components/AppDownloadModal';

const appMockupImg = '/assets/app-mockup.png';

export default function AppOnboarding() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow">
        {/* Onboarding Hero */}
        <section className="container mx-auto px-6 pt-36 pb-20 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: descriptions & download options */}
            <div className="lg:col-span-7 text-left flex flex-col gap-6 animate-fade-in-up">
              <span className="bg-brand-green/10 text-brand-green text-[10px] font-extrabold tracking-widest px-4 py-1.5 rounded-full w-fit">
                LEVE SUA VIAGEM NO BOLSO
              </span>
              <h1 className="font-headers text-3.5xl sm:text-5xl md:text-6xl font-extrabold text-brand-navy tracking-tight leading-tight">
                Seu companheiro de viagem ideal.
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-text-muted leading-relaxed max-w-[540px]">
                O aplicativo 2GO organiza sua viagem off-line, traça as melhores rotas a pé com GPS ativo e reúne todas as suas reservas em um único lugar.
              </p>

              {/* Stores buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-2 max-w-md w-full">
                {/* App Store button */}
                <a 
                  href="https://app.2go.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white border border-border-gray rounded-xl px-6 py-3 transition-all hover:border-brand-navy hover:-translate-y-0.5 hover:bg-bg-light shadow-sm flex-1 text-left cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-brand-navy">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,22c-1.31,0.05-1.73,-0.75-3.23,-0.75c-1.5,0-1.97,0.73,-3.23,0.78c-1.33,0.05-2.29,-1.31-3.13,-2.52c-1.72,-2.48,-3.03,-7,-1.27,-10.06c0.88,-1.52 2.44,-2.48 4.14,-2.5c1.29,-0.02 2.5,0.87 3.29,0.87c0.79,0 2.26,-1.07 3.81,-0.91c0.65,0.03 2.47,0.26 3.64,1.98c-0.09,0.06 -2.17,1.27 -2.15,3.81c0.03,3.02 2.63,4.03 2.66,4.04c-0.02,0.07 -0.42,1.44 -1.38,2.83M15.97,4.17C16.63,3.37 17.07,2.28 16.95,1C16,1.04 14.9,1.6 14.24,2.38C13.58,3.16 13,4.27 13.15,5.53C14.21,5.61 15.26,5.02 15.97,4.17Z"/>
                  </svg>
                  <div className="flex flex-col text-xs leading-none">
                    <span className="text-[9px] text-text-muted uppercase tracking-wider mb-0.5">Disponível na</span>
                    <span className="font-headers text-sm font-semibold text-brand-navy">App Store</span>
                  </div>
                </a>

                {/* Google Play button */}
                <a 
                  href="https://app.2go.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white border border-border-gray rounded-xl px-6 py-3 transition-all hover:border-brand-navy hover:-translate-y-0.5 hover:bg-bg-light shadow-sm flex-1 text-left cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-brand-navy">
                    <path d="M3,5.27V18.73L16.55,12L3,5.27M17.87,11.33L19.86,12.33C20.35,12.58 20.35,13.29 19.86,13.54L17.87,14.54L15.55,13.38L17.87,11.33M3.55,4.15L14.77,12.63L12.45,14.67L3.55,4.15M3.55,19.72L12.45,11.2L14.77,13.24L3.55,19.72Z"/>
                  </svg>
                  <div className="flex flex-col text-xs leading-none">
                    <span className="text-[9px] text-text-muted uppercase tracking-wider mb-0.5">Disponível no</span>
                    <span className="font-headers text-sm font-semibold text-brand-navy">Google Play</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Right side: Giant QR Code + Mockup Card */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-end animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              <div className="bg-white p-6 rounded-[28px] border border-border-gray shadow-md flex flex-col items-center justify-center shrink-0 w-44 h-48 select-none text-brand-navy transition-transform duration-500 hover:scale-105">
                <div className="w-32 h-32 border border-border-gray bg-white rounded-xl flex items-center justify-center relative p-2 shadow-inner">
                  <QRCodeSVG 
                    value="https://app.2go.com.br" 
                    size={110}
                    fgColor="#081B6B"
                    level="M"
                    includeMargin={false}
                  />
                </div>
                <span className="text-[10px] font-bold text-brand-navy uppercase tracking-wider mt-3 font-headers">Escanear para Baixar</span>
              </div>

              <img 
                src={appMockupImg} 
                alt="2GO Mobile Timeline" 
                className="max-h-[380px] w-auto rounded-[24px] shadow-lg border border-border-gray rotate-2 transition-transform duration-500 hover:rotate-0 hover:scale-102"
              />
            </div>

          </div>
        </section>

        {/* App Utility Features Grid */}
        <section className="py-20 bg-white border-y border-border-gray">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center max-w-[600px] mx-auto mb-16">
              <h2 className="font-headers text-3xl font-extrabold text-brand-navy tracking-tight">
                Criado para viajantes exigentes
              </h2>
              <p className="text-sm text-text-muted mt-2">
                Descubra por que a 2GO é o cockpit definitivo da sua viagem.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="bg-bg-light/40 border border-border-gray p-8 rounded-[24px] flex items-start gap-4 text-left group hover:border-brand-orange/20 transition-all">
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0 group-hover:rotate-3 transition-all">
                  <CloudOff className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-headers font-bold text-brand-navy text-base">Acesso Offline Completo</h3>
                  <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
                    Acesse seu roteiro completo dia a dia, mapas e vouchers salvos mesmo sem chip de dados móveis ou rede no exterior.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-bg-light/40 border border-border-gray p-8 rounded-[24px] flex items-start gap-4 text-left group hover:border-brand-green/20 transition-all">
                <div className="w-12 h-12 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 group-hover:rotate-3 transition-all">
                  <Map className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-headers font-bold text-brand-navy text-base">GPS & Rotas Otimizadas</h3>
                  <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
                    Navegue pelas atrações e restaurantes com rotas organizadas e tempos de deslocamento calculados.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-bg-light/40 border border-border-gray p-8 rounded-[24px] flex items-start gap-4 text-left group hover:border-brand-navy/20 transition-all">
                <div className="w-12 h-12 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center shrink-0 group-hover:rotate-3 transition-all">
                  <Share2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-headers font-bold text-brand-navy text-base">Planejamento Colaborativo</h3>
                  <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
                    Compartilhe o roteiro com amigos ou familiares e editem juntos o cronograma e os gastos em tempo real.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="bg-bg-light/40 border border-border-gray p-8 rounded-[24px] flex items-start gap-4 text-left group hover:border-brand-orange/20 transition-all">
                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0 group-hover:rotate-3 transition-all">
                  <Ticket className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-headers font-bold text-brand-navy text-base">Carteira de Vouchers</h3>
                  <p className="text-xs sm:text-sm text-text-muted mt-1 leading-relaxed">
                    Esqueça papéis impressos. Centralize confirmações de hotéis, voos, trens e passeios em alertas contextuais no app.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenDownload={() => setIsDownloadOpen(true)} />
      
      <AppDownloadModal 
        isOpen={isDownloadOpen} 
        onClose={() => setIsDownloadOpen(false)} 
      />
    </div>
  );
}

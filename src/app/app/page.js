"use client";

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Smartphone, Map, CloudOff, Share2, Ticket, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppDownloadModal from '@/components/AppDownloadModal';
import StoreDownloadButtons from '@/components/StoreDownloadButtons';
import { getPreferredDownloadUrl } from '@/lib/appDownload';

const appMockupImg = '/assets/app-mockup.png';

export default function AppOnboarding() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const qrUrl = getPreferredDownloadUrl();

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

              <StoreDownloadButtons layout="row" className="mt-2 max-w-md w-full" buttonClassName="flex-1" />
            </div>

            {/* Right side: Giant QR Code + Mockup Card */}
            <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-8 justify-center lg:justify-end animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              <div className="bg-white p-6 rounded-[28px] border border-border-gray shadow-md flex flex-col items-center justify-center shrink-0 w-44 h-48 select-none text-brand-navy transition-transform duration-500 hover:scale-105">
                <div className="w-32 h-32 border border-border-gray bg-white rounded-xl flex items-center justify-center relative p-2 shadow-inner">
                  {qrUrl ? (
                    <QRCodeSVG
                      value={qrUrl}
                      size={110}
                      fgColor="#081B6B"
                      level="M"
                      includeMargin={false}
                    />
                  ) : (
                    <div className="px-3 text-center">
                      <p className="font-headers text-xs font-extrabold text-brand-navy">Em breve</p>
                      <p className="mt-1 text-[9px] leading-snug text-text-muted">Links das lojas ainda não configurados</p>
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-bold text-brand-navy uppercase tracking-wider mt-3 font-headers">
                  {qrUrl ? 'Escanear para Baixar' : 'Download em breve'}
                </span>
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

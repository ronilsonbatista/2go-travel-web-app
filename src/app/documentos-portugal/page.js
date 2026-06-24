"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, ShieldAlert, BadgeCheck, Landmark, Home, Plane } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppDownloadModal from '@/components/AppDownloadModal';
import LeadMagnetBox from '@/components/LeadMagnetBox';
import { trackPageView } from '@/lib/analytics';

export default function DocumentosPortugal() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  useEffect(() => {
    trackPageView('documentos_portugal');
  }, []);

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-5xl text-left">
          
          <Breadcrumbs items={[{ name: 'Documentos Portugal', url: '/documentos-portugal' }]} />

          {/* Header */}
          <header className="my-8">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3 py-1.5 rounded-full w-fit">
              IMIGRAÇÃO & FRONTEIRAS
            </span>
            <h1 className="font-headers text-3.5xl sm:text-5xl font-extrabold text-brand-navy mt-4 mb-4 tracking-tight leading-tight">
              Documentos para Entrar em Portugal
            </h1>
            <p className="text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
              Consulte a lista oficial e atualizada de documentos exigidos pela imigração portuguesa (AIMA/Schengen) para turistas brasileiros.
            </p>
          </header>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-8">
            
            {/* Left Column: Detailed Guide */}
            <div className="lg:col-span-8 bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] shadow-sm flex flex-col gap-8 w-full text-left">
              
              <div className="bg-brand-orange/5 border border-brand-orange/10 p-4 rounded-xl flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <p className="text-[11px] sm:text-xs text-brand-navy leading-relaxed">
                  <strong>Atenção:</strong> Portugal faz parte do Espaço Schengen. Toda a documentação listada abaixo deve estar em mãos no momento da imigração no aeroporto de chegada (Lisboa ou Porto), não sendo aceita apenas no celular caso a bateria acabe.
                </p>
              </div>

              {/* Document 1 */}
              <div className="flex gap-4 items-start border-b border-border-gray/50 pb-6">
                <div className="w-10 h-10 rounded-full bg-brand-navy/5 flex items-center justify-center text-brand-navy shrink-0">
                  <BadgeCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-headers text-sm sm:text-base font-bold text-brand-navy">1. Passaporte Válido</h3>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    Seu passaporte deve possuir validade de pelo menos 3 meses além da data planejada de partida do território Schengen (ex: se volta em janeiro, o passaporte deve expirar após abril).
                  </p>
                </div>
              </div>

              {/* Document 2 */}
              <div className="flex gap-4 items-start border-b border-border-gray/50 pb-6">
                <div className="w-10 h-10 rounded-full bg-brand-navy/5 flex items-center justify-center text-brand-navy shrink-0">
                  <Plane className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-headers text-sm sm:text-base font-bold text-brand-navy">2. Passagem de Ida e Volta</h3>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    Passagens aéreas físicas ou eletrônicas confirmadas que provem sua data exata de retorno ao Brasil ou saída da zona europeia antes do limite de 90 dias de turismo.
                  </p>
                </div>
              </div>

              {/* Document 3 */}
              <div className="flex gap-4 items-start border-b border-border-gray/50 pb-6">
                <div className="w-10 h-10 rounded-full bg-brand-navy/5 flex items-center justify-center text-brand-navy shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-headers text-sm sm:text-base font-bold text-brand-navy">3. Seguro Viagem Obrigatório (ou PB4)</h3>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    Seguro saúde com cobertura mínima de €30.000 para acidentes e repatriação em toda a Europa, ou o Certificado de Direito à Assistência Médica (CDAM/PB4) obtido pelo SUS no Ministério da Saúde.
                  </p>
                </div>
              </div>

              {/* Document 4 */}
              <div className="flex gap-4 items-start border-b border-border-gray/50 pb-6">
                <div className="w-10 h-10 rounded-full bg-brand-navy/5 flex items-center justify-center text-brand-navy shrink-0">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-headers text-sm sm:text-base font-bold text-brand-navy">4. Comprovante de Acomodação</h3>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    Reserva confirmada de hotel, Airbnb ou semelhante para todas as noites de estadia, ou uma Carta Convite ("Termo de Responsabilidade") assinada por um cidadão português ou residente legal permanente.
                  </p>
                </div>
              </div>

              {/* Document 5 */}
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-brand-navy/5 flex items-center justify-center text-brand-navy shrink-0">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-headers text-sm sm:text-base font-bold text-brand-navy">5. Comprovação Financeira Mínima</h3>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    Valores exigidos por lei na fronteira portuguesa:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-xs text-text-muted leading-relaxed flex flex-col gap-1">
                    <li>€75 fixos por cada entrada no país.</li>
                    <li>Adicional de €40 por dia de permanência por pessoa.</li>
                    <li>Pode ser comprovado com dinheiro vivo, saldo em cartões internacionais (Wise, Nomad) ou limites em cartões de crédito internacionais.</li>
                  </ul>
                </div>
              </div>

            </div>

            {/* Right Column: Lead Magnet Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-6 w-full text-left">
              
              {/* PDF Guide Lead Magnet */}
              <LeadMagnetBox 
                destinationName="Portugal" 
                destinationSlug="portugal" 
              />

              {/* Extra Planner promo */}
              <div className="bg-brand-navy text-white p-6 rounded-[24px] shadow-sm flex flex-col gap-4 text-left">
                <BadgeCheck className="w-8 h-8 text-brand-orange" />
                <div>
                  <h4 className="font-headers font-bold text-sm">Gere seu Roteiro para Lisboa</h4>
                  <p className="text-[11px] text-white/70 mt-1 leading-normal">
                    Além de organizar seus documentos, use nosso assistente para programar seu dia a dia na capital de Portugal gratuitamente.
                  </p>
                </div>
                <Link 
                  href="/planejamento/lisboa"
                  className="btn btn-secondary py-3 text-xs justify-center font-bold text-center w-full bg-brand-orange text-white hover:bg-white hover:text-brand-navy transition-all"
                >
                  Planejar Roteiro de Lisboa
                </Link>
              </div>

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

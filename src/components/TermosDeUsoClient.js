"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppDownloadModal from '@/components/AppDownloadModal';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function TermosDeUsoClient() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-6 max-w-4xl text-left">
          <Breadcrumbs items={[{ name: 'Termos de Uso', url: '/termos-de-uso' }]} />

          <div className="bg-white border border-border-gray p-8 sm:p-12 rounded-[28px] shadow-xs mt-6">
            <span className="bg-brand-navy/10 text-brand-navy text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full uppercase font-headers">
              DOCUMENTO LEGAL
            </span>
            <h1 className="font-headers text-2.5xl sm:text-4xl font-black text-brand-navy mt-4 mb-6">
              Termos de Uso
            </h1>
            <p className="text-xs text-text-muted mb-8">Última atualização: Agosto de 2026</p>

            <div className="flex flex-col gap-6 text-xs sm:text-sm text-text-muted leading-relaxed">
              <section className="flex flex-col gap-2">
                <h2 className="font-headers text-base sm:text-lg font-bold text-brand-navy">1. Aceitação dos Termos</h2>
                <p>
                  Ao acessar e utilizar o site e o aplicativo da 2GO Roteiros, você concorda em cumprir e estar vinculado aos presentes Termos de Uso. Caso não concorde com qualquer disposição aqui estabelecida, solicitamos que não utilize nossos serviços.
                </p>
              </section>

              <section className="flex flex-col gap-2">
                <h2 className="font-headers text-base sm:text-lg font-bold text-brand-navy">2. Descrição dos Serviços</h2>
                <p>
                  A 2GO Roteiros oferece soluções de curadoria de itinerários digitais, guias de viagem e consultoria personalizada para planejamento de viagens. Nossos itinerários têm caráter informativo e sugestivo para otimização da experiência do usuário.
                </p>
              </section>

              <section className="flex flex-col gap-2">
                <h2 className="font-headers text-base sm:text-lg font-bold text-brand-navy">3. Propriedade Intelectual</h2>
                <p>
                  Todo o conteúdo disponibilizado no site, incluindo textos, fotos, logos, gráficos e códigos de software, é de propriedade exclusiva da 2GO S.A. ou de seus licenciantes, sendo protegido pelas leis de direito autoral e propriedade intelectual.
                </p>
              </section>

              <section className="flex flex-col gap-2">
                <h2 className="font-headers text-base sm:text-lg font-bold text-brand-navy">4. Isenção de Responsabilidade</h2>
                <p>
                  A 2GO busca manter todas as informações sobre atrações, horários e custos devidamente atualizadas, contudo não se responsabiliza por alterações repentinas de horários de terceiros, condições climáticas ou alterações de tarifas por prestadores de serviços de transporte e turismo.
                </p>
              </section>

              <section className="flex flex-col gap-2">
                <h2 className="font-headers text-base sm:text-lg font-bold text-brand-navy">5. Contato</h2>
                <p>
                  Dúvidas sobre estes Termos de Uso podem ser enviadas através da nossa página de contato ou pelo suporte no aplicativo 2GO.
                </p>
              </section>
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

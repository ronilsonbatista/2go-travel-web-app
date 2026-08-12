"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppDownloadModal from '@/components/AppDownloadModal';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function PoliticaDePrivacidadeClient() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-6 max-w-4xl text-left">
          <Breadcrumbs items={[{ name: 'Política de Privacidade', url: '/politica-de-privacidade' }]} />

          <div className="bg-white border border-border-gray p-8 sm:p-12 rounded-[28px] shadow-xs mt-6">
            <span className="bg-brand-navy/10 text-brand-navy text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full uppercase font-headers">
              PRIVACIDADE E SEGURANÇA
            </span>
            <h1 className="font-headers text-2.5xl sm:text-4xl font-black text-brand-navy mt-4 mb-6">
              Política de Privacidade
            </h1>
            <p className="text-xs text-text-muted mb-8">Última atualização: Agosto de 2026</p>

            <div className="flex flex-col gap-6 text-xs sm:text-sm text-text-muted leading-relaxed">
              <section className="flex flex-col gap-2">
                <h2 className="font-headers text-base sm:text-lg font-bold text-brand-navy">1. Coleta de Informações</h2>
                <p>
                  A 2GO Roteiros preza pela privacidade dos seus usuários. Coletamos dados fornecidos voluntariamente durante a navegação, simulação de roteiros ou preenchimento de formulários de consultoria (como nome, e-mail, WhatsApp e preferências de viagem).
                </p>
              </section>

              <section className="flex flex-col gap-2">
                <h2 className="font-headers text-base sm:text-lg font-bold text-brand-navy">2. Uso dos Dados</h2>
                <p>
                  Seus dados são utilizados exclusivamente para personalizar o atendimento, estruturar seus itinerários de viagem, enviar informações relevantes de suporte e aprimorar a experiência no nosso aplicativo.
                </p>
              </section>

              <section className="flex flex-col gap-2">
                <h2 className="font-headers text-base sm:text-lg font-bold text-brand-navy">3. Compartilhamento de Dados</h2>
                <p>
                  Não vendemos nem comercializamos dados de usuários a terceiros. As informações de consultoria são acessadas unicamente pela equipe autorizada da 2GO para a prestação do atendimento solicitado.
                </p>
              </section>

              <section className="flex flex-col gap-2">
                <h2 className="font-headers text-base sm:text-lg font-bold text-brand-navy">4. Segurança das Informações</h2>
                <p>
                  Adotamos medidas técnicas de segurança e criptografia padrão da indústria para garantir que seus dados permaneçam em um ambiente seguro e protegido contra acessos não autorizados.
                </p>
              </section>

              <section className="flex flex-col gap-2">
                <h2 className="font-headers text-base sm:text-lg font-bold text-brand-navy">5. Direitos do Usuário (LGPD)</h2>
                <p>
                  De acordo com a Lei Geral de Proteção de Dados (LGPD), você possui o direito de solicitar a confirmação, acesso, correção ou exclusão definitiva dos seus dados pessoais a qualquer momento.
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

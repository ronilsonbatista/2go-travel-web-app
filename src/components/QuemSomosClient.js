"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppDownloadModal from '@/components/AppDownloadModal';

export default function QuemSomosClient() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  return (
    <div className="w-full bg-white min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header solid onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl w-full text-left">
          <Breadcrumbs items={[{ name: 'Quem somos', url: '/quem-somos' }]} />

          <header className="mt-8 mb-10">
            <p className="text-[11px] font-extrabold tracking-widest text-brand-orange uppercase">2GO</p>
            <h1 className="font-headers text-3xl sm:text-5xl font-extrabold text-brand-navy mt-3 tracking-tight leading-tight">
              A viagem fica mais leve quando o plano cabe no bolso.
            </h1>
            <p className="text-base sm:text-lg text-text-muted mt-4 leading-relaxed">
              A 2GO junta guias de destino e roteiros com IA em um aplicativo. O site mostra para onde ir. O app organiza o dia, o horário e o mapa.
            </p>
          </header>

          <section className="space-y-4 text-sm sm:text-base text-text-muted leading-relaxed">
            <p>
              Antes de embarcar, a pesquisa vira uma pilha de abas. A gente nasceu para encurtar isso: uma prévia clara no site e o roteiro vivo no aplicativo, no ritmo de quem viaja.
            </p>
            <p>
              Não prometemos uma viagem pronta sem você. A inteligência sugere a ordem do dia. Você ajusta, salva e leva offline.
            </p>
          </section>

          <ul className="mt-10 divide-y divide-border-gray/70 border-y border-border-gray/70">
            {[
              ['Clareza', 'Custo, bairro e o que ver, sem letra miúda.'],
              ['Seu ritmo', 'O dia a dia respeita o tempo e o estilo da viagem.'],
              ['No app', 'Timeline, mapa e mudanças ficam com você durante a viagem.']
            ].map(([title, desc]) => (
              <li key={title} className="py-5">
                <h2 className="font-headers text-lg font-extrabold text-brand-navy">{title}</h2>
                <p className="text-sm text-text-muted mt-1">{desc}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => setIsDownloadOpen(true)}
              className="inline-flex items-center justify-center bg-brand-navy text-white font-extrabold text-sm px-6 py-3.5 rounded-xl"
            >
              Baixar o App
            </button>
            <Link
              href="/roteiros"
              className="inline-flex items-center justify-center border border-brand-navy text-brand-navy font-bold text-sm px-6 py-3.5 rounded-xl"
            >
              Ver roteiros
            </Link>
          </div>
        </div>
      </main>

      <Footer onOpenDownload={() => setIsDownloadOpen(true)} />
      <AppDownloadModal isOpen={isDownloadOpen} onClose={() => setIsDownloadOpen(false)} />
    </div>
  );
}

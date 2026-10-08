"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppDownloadModal from '@/components/AppDownloadModal';
import AppPhoneMockup from '@/components/AppPhoneMockup';
import { destinationGuides } from '@/data/guidesData';

function coverOf(article) {
  const image = article.images?.[0];
  if (!image) return '';
  return image.url || image;
}

function normalize(value) {
  return (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

const articles = [
  {
    id: 'paris-guia',
    tag: 'Destino',
    city: 'Paris',
    country: 'França',
    title: 'Como planejar uma viagem para Paris: guia completo',
    desc: 'Documentos, transporte, hospedagem, orçamento e o que ver antes de montar o dia a dia.',
    images: destinationGuides['como-planejar-viagem-paris'].images,
    url: '/guias/como-planejar-viagem-paris'
  },
  {
    id: 'ny-guia',
    tag: 'Destino',
    city: 'Nova York',
    country: 'Estados Unidos',
    title: 'Como planejar uma viagem para Nova York: guia completo',
    desc: 'Visto, transporte, bairros e o que cabe numa primeira visita à cidade.',
    images: destinationGuides['como-planejar-viagem-nova-york'].images,
    url: '/guias/como-planejar-viagem-nova-york'
  },
  {
    id: 'toquio-guia',
    tag: 'Destino',
    city: 'Tóquio',
    country: 'Japão',
    title: 'Como planejar uma viagem para Tóquio: guia completo',
    desc: 'Trem, bairros e o ritmo da cidade, sem transformar o guia num formulário.',
    images: destinationGuides['como-planejar-viagem-toquio'].images,
    url: '/guias/como-planejar-viagem-toquio'
  },
  {
    id: 'londres-guia',
    tag: 'Destino',
    city: 'Londres',
    country: 'Reino Unido',
    title: 'Como planejar uma viagem para Londres: guia completo',
    desc: 'ETA, Tube, atrações e uma ideia real de custo antes de embarcar.',
    images: destinationGuides['como-planejar-viagem-londres'].images,
    url: '/guias/como-planejar-viagem-londres'
  },
  {
    id: 'roma-guia',
    tag: 'Destino',
    city: 'Roma',
    country: 'Itália',
    title: 'Como planejar uma viagem para Roma: guia completo',
    desc: 'Coliseu, Vaticano, onde ficar e como não perder o dia em fila.',
    images: destinationGuides['como-planejar-viagem-roma'].images,
    url: '/guias/como-planejar-viagem-roma'
  },
  {
    id: 'istambul-guia',
    tag: 'Destino',
    city: 'Istambul',
    country: 'Turquia',
    title: 'Como planejar uma viagem para Istambul: guia completo',
    desc: 'Bósforo, bairros e o que separar entre o lado europeu e o asiático.',
    images: destinationGuides['como-planejar-viagem-istambul'].images,
    url: '/guias/como-planejar-viagem-istambul'
  },
  {
    id: 'dubai-guia',
    tag: 'Destino',
    city: 'Dubai',
    country: 'Emirados Árabes Unidos',
    title: 'Como planejar uma viagem para Dubai: guia completo',
    desc: 'Visto, calor, Burj Khalifa e o que realmente pesa no orçamento.',
    images: destinationGuides['como-planejar-viagem-dubai'].images,
    url: '/guias/como-planejar-viagem-dubai'
  },
  {
    id: 'custos-paris',
    tag: 'Orçamento',
    city: 'Paris',
    country: 'França',
    title: 'Quanto custa viajar para Paris em 2026?',
    desc: 'Hospedagem, refeição, transporte e ingresso, por perfil de viagem.',
    images: [{ url: '/assets/paris.png', alt: 'Paris' }],
    url: '/quanto-custa/paris'
  },
  {
    id: 'custos-roma',
    tag: 'Orçamento',
    city: 'Roma',
    country: 'Itália',
    title: 'Quanto custa viajar para Roma?',
    desc: 'Uma estimativa diária para Coliseu, Vaticano e os bairros centrais.',
    images: [{ url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80', alt: 'Roma' }],
    url: '/quanto-custa/roma'
  },
  {
    id: 'custos-lisboa',
    tag: 'Orçamento',
    city: 'Lisboa',
    country: 'Portugal',
    title: 'Lisboa econômica: quanto guardar por dia',
    desc: 'Mirantes, transporte e comida sem transformar o dia num cálculo.',
    images: [{ url: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80', alt: 'Lisboa' }],
    url: '/quanto-custa/lisboa'
  }
];

export default function GuiasIndex() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    const query = normalize(searchQuery.trim());
    if (!query) return articles;
    return articles.filter((article) =>
      [article.city, article.country, article.title, article.desc, article.tag]
        .some((field) => normalize(field).includes(query))
    );
  }, [searchQuery]);

  const featured = filtered[0];
  const grid = filtered.slice(1);

  return (
    <div className="w-full bg-white min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header solid onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1100px] w-full text-left">
          <Breadcrumbs items={[{ name: 'Guia de Viagem', url: '/guias' }]} />

          <header className="mt-8 mb-10 max-w-3xl">
            <p className="text-[11px] font-extrabold tracking-[0.18em] text-brand-orange uppercase">2GO</p>
            <h1 className="font-headers text-4xl sm:text-5xl font-extrabold text-brand-navy mt-3 tracking-tight leading-[1.05]">
              Guia de Viagem
            </h1>
            <p className="text-base sm:text-lg text-text-muted mt-4 leading-relaxed max-w-2xl">
              O que ver, quanto guardar e como o lugar funciona. O dia a dia fica no aplicativo.
            </p>
          </header>

          <div className="relative mb-10 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Busque por cidade ou tema…"
              className="w-full bg-[#F7F8FA] border border-border-gray/80 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-brand-navy placeholder:text-text-muted/70 focus:outline-none focus:border-brand-navy"
            />
          </div>

          {featured ? (
            <Link href={featured.url} className="group grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 items-center">
              <div className="md:col-span-7 h-64 sm:h-80 rounded-[28px] overflow-hidden bg-bg-light">
                <img src={coverOf(featured)} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </div>
              <div className="md:col-span-5">
                <p className="text-[11px] font-extrabold tracking-widest text-brand-orange uppercase">{featured.tag}</p>
                <h2 className="font-headers text-2xl sm:text-3xl font-extrabold text-brand-navy mt-2 leading-tight group-hover:text-brand-orange transition-colors">
                  {featured.title}
                </h2>
                <p className="text-sm text-text-muted mt-3 leading-relaxed">{featured.desc}</p>
                <p className="text-xs font-bold text-brand-navy mt-4">{featured.city}, {featured.country}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-brand-navy mt-5">
                  Ler mais <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ) : (
            <p className="text-sm text-text-muted mb-12">Nenhum texto com esse termo. Tente Paris, Roma ou orçamento.</p>
          )}

          {grid.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {grid.map((article) => (
                <Link key={article.id} href={article.url} className="group flex flex-col">
                  <div className="h-44 rounded-[22px] overflow-hidden bg-bg-light">
                    <img src={coverOf(article)} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <p className="text-[11px] font-extrabold tracking-widest text-brand-orange uppercase mt-4">{article.tag}</p>
                  <p className="text-xs font-semibold text-brand-navy mt-1">{article.city}</p>
                  <h3 className="font-headers text-lg font-extrabold text-brand-navy mt-1 leading-snug group-hover:text-brand-orange transition-colors">
                    {article.title}
                  </h3>
                </Link>
              ))}
            </div>
          )}

          <section className="mt-16 bg-[#F7F8FA] rounded-[28px] p-6 sm:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center overflow-hidden">
            <div className="md:col-span-6">
              <p className="text-[11px] font-extrabold tracking-widest text-brand-orange uppercase">No aplicativo</p>
              <h2 className="font-headers text-2xl sm:text-3xl font-extrabold text-brand-navy mt-2">O guia fica aqui. O dia a dia, no app.</h2>
              <p className="text-sm text-text-muted mt-2 leading-relaxed max-w-md">
                Timeline, mapa e o ajuste de última hora — no mesmo formato do aplicativo 2GO.
              </p>
              <button
                type="button"
                onClick={() => setIsDownloadOpen(true)}
                className="mt-5 inline-flex items-center justify-center bg-brand-navy text-white font-extrabold text-sm px-5 py-3 rounded-xl transition-transform hover:-translate-y-0.5"
              >
                Baixar o App
              </button>
            </div>
            <div className="md:col-span-6 relative flex justify-center md:justify-end py-4">
              <div className="absolute right-8 top-2 hidden sm:block scale-[0.78] opacity-70 rotate-6 origin-bottom">
                <AppPhoneMockup variant="roma" size="sm" glow={false} />
              </div>
              <div className="relative z-10 -rotate-2">
                <AppPhoneMockup variant="paris" size="md" />
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer onOpenDownload={() => setIsDownloadOpen(true)} />
      <AppDownloadModal isOpen={isDownloadOpen} onClose={() => setIsDownloadOpen(false)} />
    </div>
  );
}

"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  ChevronRight,
  Compass,
  Flame,
  Globe2,
  Heart,
  Landmark,
  MapPin,
  Mountain,
  Search,
  Star
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppDownloadModal from '@/components/AppDownloadModal';
import ScrollReveal from '@/components/ScrollReveal';
import { destinationGuides } from '@/data/guidesData';

function coverOf(guide) {
  return guide.heroImage || guide.images?.[0]?.url || guide.images?.[0] || '';
}

function normalize(value) {
  return (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

const DESTINATIONS = [
  {
    id: 'paris',
    city: 'Paris',
    country: 'França',
    region: 'Europa',
    badge: { label: 'Mais acessado', tone: 'orange', icon: Flame },
    desc: 'Documentos, transporte, hospedagem, orçamento e o que ver antes de montar o dia a dia.',
    guide: destinationGuides['como-planejar-viagem-paris'],
    url: '/guias/como-planejar-viagem-paris'
  },
  {
    id: 'roma',
    city: 'Roma',
    country: 'Itália',
    region: 'Europa',
    badge: { label: 'Clássico', tone: 'amber', icon: Star },
    desc: 'Coliseu, Vaticano, onde ficar e como não perder o dia em fila.',
    guide: destinationGuides['como-planejar-viagem-roma'],
    url: '/guias/como-planejar-viagem-roma'
  },
  {
    id: 'nova-york',
    city: 'Nova York',
    country: 'Estados Unidos',
    region: 'América do Norte',
    badge: { label: 'Favorito da comunidade', tone: 'rose', icon: Heart },
    desc: 'Visto, transporte, bairros e o que cabe numa primeira visita à cidade.',
    guide: destinationGuides['como-planejar-viagem-nova-york'],
    url: '/guias/como-planejar-viagem-nova-york'
  },
  {
    id: 'londres',
    city: 'Londres',
    country: 'Reino Unido',
    region: 'Europa',
    badge: { label: 'Clássico', tone: 'amber', icon: Star },
    desc: 'ETA, Tube, atrações e uma ideia real de custo antes de embarcar.',
    guide: destinationGuides['como-planejar-viagem-londres'],
    url: '/guias/como-planejar-viagem-londres'
  },
  {
    id: 'toquio',
    city: 'Tóquio',
    country: 'Japão',
    region: 'Ásia',
    badge: { label: 'Mais acessado', tone: 'orange', icon: Flame },
    desc: 'Trem, bairros e o ritmo da cidade, sem transformar o guia num formulário.',
    guide: destinationGuides['como-planejar-viagem-toquio'],
    url: '/guias/como-planejar-viagem-toquio'
  },
  {
    id: 'istambul',
    city: 'Istambul',
    country: 'Turquia',
    region: 'Oriente Médio',
    badge: { label: 'Favorito da comunidade', tone: 'rose', icon: Heart },
    desc: 'Bósforo, bairros e o que separar entre o lado europeu e o asiático.',
    guide: destinationGuides['como-planejar-viagem-istambul'],
    url: '/guias/como-planejar-viagem-istambul'
  },
  {
    id: 'dubai',
    city: 'Dubai',
    country: 'Emirados Árabes Unidos',
    region: 'Oriente Médio',
    badge: { label: 'Clássico', tone: 'amber', icon: Star },
    desc: 'Visto, calor, Burj Khalifa e o que realmente pesa no orçamento.',
    guide: destinationGuides['como-planejar-viagem-dubai'],
    url: '/guias/como-planejar-viagem-dubai'
  }
];

const REGIONS = [
  {
    id: 'europa',
    label: 'Europa',
    detail: 'Paris, Roma, Londres e o clássico do continente.',
    icon: Landmark,
    match: 'Europa'
  },
  {
    id: 'america-norte',
    label: 'América do Norte',
    detail: 'Nova York e o ritmo das grandes cidades.',
    icon: Building2,
    match: 'América do Norte'
  },
  {
    id: 'asia',
    label: 'Ásia',
    detail: 'Tóquio e o planejamento do dia a dia no Oriente.',
    icon: Compass,
    match: 'Ásia'
  },
  {
    id: 'oriente-medio',
    label: 'Oriente Médio',
    detail: 'Istambul, Dubai e destinos entre continentes.',
    icon: Mountain,
    match: 'Oriente Médio'
  },
  {
    id: 'todos',
    label: 'Todos os destinos',
    detail: 'Veja o catálogo completo de guias 2GO.',
    icon: Globe2,
    match: null
  }
];

const BADGE_TONES = {
  orange: 'bg-brand-orange text-white',
  amber: 'bg-amber-500 text-white',
  rose: 'bg-[#E11D48] text-white'
};

export default function GuiasIndex() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState(null);

  const filtered = useMemo(() => {
    const query = normalize(searchQuery.trim());
    return DESTINATIONS.filter((destination) => {
      const matchesRegion = !activeRegion || destination.region === activeRegion;
      if (!matchesRegion) return false;
      if (!query) return true;
      return [destination.city, destination.country, destination.desc, destination.guide?.title]
        .some((field) => normalize(field).includes(query));
    });
  }, [searchQuery, activeRegion]);

  const scrollToDestinos = () => {
    const el = document.getElementById('destinos-destaque');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="w-full bg-white min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy overflow-x-clip">
      <Header solid onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 text-left min-w-0">
          <Breadcrumbs items={[{ name: 'Guia de Viagem', url: '/guias' }]} />

          {/* Hero */}
          <section className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <ScrollReveal className="lg:col-span-5 min-w-0">
              <p className="text-[11px] font-extrabold tracking-[0.18em] text-brand-orange uppercase">2GO</p>
              <h1 className="font-headers mt-3 text-4xl font-extrabold leading-[1.05] tracking-tight text-brand-navy sm:text-5xl lg:text-6xl">
                Guia de Viagem
              </h1>
              <p className="mt-4 max-w-md text-base leading-relaxed text-text-muted sm:text-lg">
                O que ver, quanto guardar e como o lugar funciona. O dia a dia fica no aplicativo.
              </p>
              <div className="relative mt-8 max-w-lg">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Busque por cidade ou tema…"
                  className="w-full rounded-full border border-border-gray/80 bg-[#F7F8FA] py-3.5 pl-11 pr-4 text-sm text-brand-navy placeholder:text-text-muted/70 focus:border-brand-navy focus:outline-none"
                />
              </div>
            </ScrollReveal>

            <ScrollReveal className="relative lg:col-span-7 min-w-0" delay={80}>
              <div className="overflow-hidden rounded-[32px] bg-bg-light shadow-md">
                <img
                  src="/assets/greece.png"
                  alt="Destino em destaque"
                  className="aspect-[16/11] w-full object-cover sm:aspect-[16/10]"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 max-w-sm rounded-2xl border border-white/70 bg-white/95 p-4 shadow-lg backdrop-blur-sm sm:bottom-6 sm:left-6 sm:right-auto">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-headers text-sm font-extrabold text-brand-navy">Santorini</p>
                    <p className="mt-1 text-xs leading-relaxed text-text-muted">
                      Guias completos para os destinos mais incríveis do mundo.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </section>

          {/* Destinos em destaque */}
          <section id="destinos-destaque" className="mt-16 scroll-mt-28 sm:mt-20">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="font-headers text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
                Destinos em destaque
              </h2>
              <button
                type="button"
                onClick={() => {
                  setActiveRegion(null);
                  setSearchQuery('');
                  scrollToDestinos();
                }}
                className="inline-flex items-center gap-1 text-sm font-extrabold text-brand-orange transition-colors hover:text-brand-navy"
              >
                Ver todos
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {filtered.length === 0 ? (
              <p className="rounded-[24px] border border-border-gray/70 bg-[#F7F8FA] px-5 py-8 text-sm text-text-muted">
                Nenhum destino com esse termo. Tente Paris, Roma ou Tóquio.
              </p>
            ) : (
              <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-3 custom-scrollbar-hide sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 xl:grid-cols-5">
                {filtered.map((destination, index) => {
                  const BadgeIcon = destination.badge.icon;
                  return (
                    <ScrollReveal
                      key={destination.id}
                      delay={index * 40}
                      className="w-[min(240px,78vw)] shrink-0 sm:w-auto"
                    >
                      <Link
                        href={destination.url}
                        className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-border-gray/70 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
                      >
                        <div className="relative h-40 overflow-hidden bg-bg-light">
                          <img
                            src={coverOf(destination.guide)}
                            alt=""
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                          <span
                            className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-extrabold ${BADGE_TONES[destination.badge.tone]}`}
                          >
                            <BadgeIcon className="h-3 w-3" />
                            {destination.badge.label}
                          </span>
                        </div>
                        <div className="flex flex-1 flex-col p-4 text-left">
                          <h3 className="font-headers text-lg font-extrabold text-brand-navy group-hover:text-brand-orange transition-colors">
                            {destination.city}
                          </h3>
                          <p className="mt-0.5 text-xs font-semibold text-text-muted">{destination.country}</p>
                          <p className="mt-3 text-xs leading-relaxed text-text-muted line-clamp-3">
                            {destination.desc}
                          </p>
                          <p className="mt-auto pt-4 text-xs font-extrabold text-brand-navy">
                            {destination.city}: Guia completo
                          </p>
                        </div>
                      </Link>
                    </ScrollReveal>
                  );
                })}
              </div>
            )}
          </section>

          {/* Explore por região */}
          <section className="mt-16 sm:mt-20">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="font-headers text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
                Explore por região
              </h2>
              <button
                type="button"
                onClick={() => {
                  setActiveRegion(null);
                  scrollToDestinos();
                }}
                className="inline-flex items-center gap-1 text-sm font-extrabold text-brand-orange transition-colors hover:text-brand-navy"
              >
                Ver todas
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 custom-scrollbar-hide sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3 xl:grid-cols-5">
              {REGIONS.map((region, index) => {
                const Icon = region.icon;
                const selected = activeRegion === region.match || (!activeRegion && region.match === null);
                return (
                  <ScrollReveal key={region.id} delay={index * 40} className="w-[min(280px,85vw)] shrink-0 sm:w-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveRegion(region.match);
                        scrollToDestinos();
                      }}
                      className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
                        selected
                          ? 'border-brand-navy/30 bg-brand-navy/[0.03]'
                          : 'border-border-gray/70 bg-white'
                      }`}
                    >
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-headers text-sm font-extrabold text-brand-navy">
                          {region.label}
                        </span>
                        <span className="mt-0.5 block text-[11px] leading-snug text-text-muted">
                          {region.detail}
                        </span>
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-brand-navy/50" />
                    </button>
                  </ScrollReveal>
                );
              })}
            </div>
          </section>
        </div>
      </main>

      <Footer onOpenDownload={() => setIsDownloadOpen(true)} />
      <AppDownloadModal isOpen={isDownloadOpen} onClose={() => setIsDownloadOpen(false)} />
    </div>
  );
}

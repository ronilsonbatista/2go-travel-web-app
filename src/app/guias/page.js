'use client';

import { guideImage } from '@/lib/curatedGuideImages';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  Compass,
  Globe2,
  Landmark,
  Mountain,
  Search,
  Waves
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppDownloadModal from '@/components/AppDownloadModal';
import ScrollReveal from '@/components/ScrollReveal';
import GuiasHeroHighlight from '@/components/GuiasHeroHighlight';
import {
  BADGE_TONES,
  getFeaturedDestinations,
  GUIAS_DESTINATIONS
} from '@/lib/guiasDestinations';

function coverOf(guide) {
  return guideImage(guide, 'guide-card');
}

const FEATURED = getFeaturedDestinations();
const CATALOG_TOTAL = GUIAS_DESTINATIONS.length;
const regionsWithVisible = new Set(GUIAS_DESTINATIONS.map((destination) => destination.region));

const REGIONS = [
  { id: 'europa', label: 'Europa', detail: 'Capitais clássicas e costa europeia.', icon: Landmark, match: 'Europa' },
  { id: 'america-sul', label: 'América do Sul', detail: 'Brasil, Cone Sul e Andes.', icon: Waves, match: 'América do Sul' },
  { id: 'america-norte', label: 'América do Norte', detail: 'EUA, México e Caribe.', icon: Building2, match: 'América do Norte' },
  { id: 'asia', label: 'Ásia', detail: 'Oriente, metrôs e street food.', icon: Compass, match: 'Ásia' },
  { id: 'oriente-medio', label: 'Oriente Médio', detail: 'Entre continentes e desertos.', icon: Mountain, match: 'Oriente Médio' },
  { id: 'todos', label: 'Todos os destinos', detail: 'Catálogo completo com filtros.', icon: Globe2, match: null }
].filter((region) => region.match == null || regionsWithVisible.has(region.match));

export default function GuiasIndex() {
  const router = useRouter();
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const carouselRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const goToCatalog = (params = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) query.set(key, value);
    });
    const qs = query.toString();
    router.push(qs ? `/guias/destinos?${qs}` : '/guias/destinos');
  };

  const scrollCarousel = (direction) => {
    const el = carouselRef.current;
    if (!el) return;
    const amount = Math.min(320, el.clientWidth * 0.8);
    el.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (!el || paused || FEATURED.length < 2) return undefined;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return undefined;

    const id = setInterval(() => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 8) return;
      if (el.scrollLeft >= maxScroll - 12) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: Math.min(300, el.clientWidth * 0.75), behavior: 'smooth' });
      }
    }, 4200);

    return () => clearInterval(id);
  }, [paused]);

  return (
    <div className="w-full bg-white min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy overflow-x-clip">
      <Header solid onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-28 pb-32 lg:pb-20">
        <div className="container mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 text-left min-w-0">
          <Breadcrumbs items={[{ name: 'Guia de Viagem', url: '/guias' }]} />

          <section className="mt-8 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <ScrollReveal className="lg:col-span-5 min-w-0">
              <p className="text-[11px] font-extrabold tracking-[0.18em] text-brand-orange uppercase">2GO</p>
              <h1 className="font-headers mt-3 text-[clamp(1.85rem,5.5vw,3.75rem)] font-extrabold leading-[1.08] tracking-tight text-brand-navy">
                Tudo o que você precisa saber antes de viajar.
              </h1>
              <p className="mt-4 max-w-md text-base leading-relaxed text-text-muted sm:text-lg">
                O que conhecer, quanto gastar e como se locomover. Encontre as informações essenciais para planejar sua viagem em um só lugar.
              </p>
              <div className="relative mt-8 max-w-lg">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      const q = searchQuery.trim();
                      goToCatalog(q ? { q } : {});
                    }
                  }}
                  placeholder="Busque por cidade, país ou tema…"
                  className="w-full rounded-full border border-border-gray/80 bg-[#F7F8FA] py-3.5 pl-11 pr-4 text-sm text-brand-navy placeholder:text-text-muted/70 focus:border-brand-navy focus:outline-none"
                />
              </div>
              <Link
                href="/guias/destinos"
                className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-extrabold text-brand-orange hover:text-brand-navy"
              >
                Ver todos os {CATALOG_TOTAL} destinos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </ScrollReveal>

            <ScrollReveal className="relative lg:col-span-7 min-w-0" delay={80}>
              <GuiasHeroHighlight destinations={FEATURED} />
            </ScrollReveal>
          </section>

          <section id="explore-regiao" className="mt-14 scroll-mt-28 sm:mt-16">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="font-headers text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
                Explore por região
              </h2>
              <Link
                href="/guias/destinos"
                className="inline-flex items-center gap-1 text-sm font-extrabold text-brand-orange transition-colors hover:text-brand-navy"
              >
                Ver todas
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 custom-scrollbar-hide sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3 xl:grid-cols-6">
              {REGIONS.map((region, index) => {
                const Icon = region.icon;
                return (
                  <ScrollReveal key={region.id} delay={index * 40} className="w-[min(280px,85vw)] shrink-0 sm:w-auto">
                    <Link
                      href={region.match ? `/guias/destinos?regiao=${encodeURIComponent(region.match)}` : '/guias/destinos'}
                      className="flex w-full items-center gap-3 rounded-2xl border border-border-gray/70 bg-white px-4 py-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-navy/30 hover:shadow-md"
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
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </section>

          <section id="destinos-destaque" className="mt-16 scroll-mt-28 sm:mt-20">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="font-headers text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
                Destinos em destaque
              </h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Anterior"
                  onClick={() => scrollCarousel(-1)}
                  className="inline-flex h-11 w-11 min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full border border-border-gray/80 text-brand-navy transition-colors hover:border-brand-orange hover:text-brand-orange"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Próximo"
                  onClick={() => scrollCarousel(1)}
                  className="inline-flex h-11 w-11 min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full border border-border-gray/80 text-brand-navy transition-colors hover:border-brand-orange hover:text-brand-orange"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <Link
                  href="/guias/destinos"
                  className="ml-1 inline-flex min-h-11 items-center gap-1 px-1 text-sm font-extrabold text-brand-orange transition-colors hover:text-brand-navy"
                >
                  Ver todos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {FEATURED.length === 0 ? (
              <p className="rounded-[24px] border border-border-gray/70 bg-[#F7F8FA] px-5 py-8 text-sm text-text-muted">
                Nenhum destaque publicado no momento. Veja o catálogo completo.
              </p>
            ) : (
              <>
                <div
                  ref={carouselRef}
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                  onFocusCapture={() => setPaused(true)}
                  onBlurCapture={() => setPaused(false)}
                  className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4 custom-scrollbar-hide snap-x snap-mandatory sm:mx-0 sm:px-0"
                >
                  {FEATURED.map((destination) => {
                    const BadgeIcon = destination.badge.icon;
                    return (
                      <Link
                        key={destination.id}
                        href={destination.url}
                        className="group relative h-80 w-[min(18rem,78vw)] shrink-0 snap-start overflow-hidden rounded-[24px] border border-border-gray/70 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-md sm:h-96 sm:w-72"
                      >
                        <img
                          src={coverOf(destination.guide)}
                          alt={destination.city}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                        <span
                          className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-extrabold ${BADGE_TONES[destination.badge.tone]}`}
                        >
                          <BadgeIcon className="h-3 w-3" />
                          {destination.badge.label}
                        </span>
                        <div className="absolute bottom-5 left-5 right-5 text-left text-white">
                          <p className="text-[10px] font-extrabold tracking-wide text-brand-orange uppercase">
                            Guia de Viagem
                          </p>
                          <h3 className="font-headers mt-1 text-base font-extrabold text-white transition-colors group-hover:text-brand-orange sm:text-lg">
                            {destination.city}, {destination.country}
                          </h3>
                          <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-white/80">
                            {destination.desc}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {FEATURED.map((destination, index) => {
                    const BadgeIcon = destination.badge.icon;
                    return (
                      <ScrollReveal key={`grid-${destination.id}`} delay={index * 30}>
                        <Link
                          href={destination.url}
                          className="group relative block aspect-[3/4] overflow-hidden rounded-[20px] border border-border-gray/70 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                        >
                          <img
                            src={coverOf(destination.guide)}
                            alt={destination.city}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                          <span
                            className={`absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-extrabold ${BADGE_TONES[destination.badge.tone]}`}
                          >
                            <BadgeIcon className="h-2.5 w-2.5" />
                            {destination.badge.label}
                          </span>
                          <div className="absolute bottom-3 left-3 right-3 text-white">
                            <h3 className="font-headers text-sm font-extrabold leading-tight transition-colors group-hover:text-brand-orange sm:text-base">
                              {destination.city}
                            </h3>
                            <p className="mt-0.5 text-[11px] text-white/75">{destination.country}</p>
                          </div>
                        </Link>
                      </ScrollReveal>
                    );
                  })}
                </div>
              </>
            )}
          </section>

          <section className="mt-16 sm:mt-20">
            <div className="flex flex-col items-start justify-between gap-4 rounded-[28px] border border-border-gray/70 bg-[#F7F8FA] px-5 py-6 sm:flex-row sm:items-center sm:px-8 sm:py-7">
              <div>
                <p className="font-headers text-lg font-extrabold text-brand-navy sm:text-xl">
                  {CATALOG_TOTAL} destinos no catálogo
                </p>
                <p className="mt-1 text-sm text-text-muted">
                  Filtre por região, país ou estilo de viagem.
                </p>
              </div>
              <Link
                href="/guias/destinos"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand-orange px-6 text-sm font-extrabold text-white transition-colors hover:bg-brand-navy"
              >
                Ver todos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer onOpenDownload={() => setIsDownloadOpen(true)} />
      <AppDownloadModal isOpen={isDownloadOpen} onClose={() => setIsDownloadOpen(false)} />
    </div>
  );
}

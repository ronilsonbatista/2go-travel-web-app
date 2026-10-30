"use client";

import { guideImage } from '@/lib/curatedGuideImages';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  ChevronLeft,
  ChevronRight,
  Compass,
  Flame,
  Globe2,
  Heart,
  Landmark,
  MapPin,
  Mountain,
  Search,
  Star,
  Waves,
  X
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppDownloadModal from '@/components/AppDownloadModal';
import ScrollReveal from '@/components/ScrollReveal';
import GuiasHeroHighlight from '@/components/GuiasHeroHighlight';
import { destinationGuides } from '@/data/guidesData';
import {
  DESTINATIONS_CATALOG,
  REGION_OPTIONS,
  TAG_OPTIONS,
  normalizeDestinationKey
} from '@/data/destinationsCatalog';

function coverOf(guide) {
  return guideImage(guide, 'guide-card');
}

function normalize(value) {
  return (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

const BADGE_BY_ID = {
  paris: { label: 'Mais acessado', tone: 'orange', icon: Flame },
  roma: { label: 'Clássico', tone: 'amber', icon: Star },
  'nova-york': { label: 'Favorito da comunidade', tone: 'rose', icon: Heart },
  londres: { label: 'Clássico', tone: 'amber', icon: Star },
  toquio: { label: 'Mais acessado', tone: 'orange', icon: Flame },
  istambul: { label: 'Favorito da comunidade', tone: 'rose', icon: Heart },
  dubai: { label: 'Clássico', tone: 'amber', icon: Star }
};

const DESTINATIONS = DESTINATIONS_CATALOG.map((entry) => {
  const guide = entry.slug ? destinationGuides[entry.slug] : null;
  const published = entry.status === 'published' && Boolean(guide);
  return {
    ...entry,
    guide,
    published,
    url: published ? `/guias/${entry.slug}` : null,
    badge: BADGE_BY_ID[entry.id] || (published
      ? { label: 'Guia completo', tone: 'amber', icon: Star }
      : { label: 'Em breve', tone: 'slate', icon: MapPin })
  };
});

const FEATURED = DESTINATIONS.filter((d) => d.published);

const REGIONS = [
  { id: 'europa', label: 'Europa', detail: 'Capitais clássicas e costa europeia.', icon: Landmark, match: 'Europa' },
  { id: 'america-sul', label: 'América do Sul', detail: 'Brasil, Cone Sul e Andes.', icon: Waves, match: 'América do Sul' },
  { id: 'america-norte', label: 'América do Norte', detail: 'EUA, México e Caribe.', icon: Building2, match: 'América do Norte' },
  { id: 'asia', label: 'Ásia', detail: 'Oriente, metrôs e street food.', icon: Compass, match: 'Ásia' },
  { id: 'oriente-medio', label: 'Oriente Médio', detail: 'Entre continentes e desertos.', icon: Mountain, match: 'Oriente Médio' },
  { id: 'todos', label: 'Todos os destinos', detail: 'Catálogo completo com filtros.', icon: Globe2, match: null }
];

const BADGE_TONES = {
  orange: 'bg-brand-orange text-white',
  amber: 'bg-amber-500 text-white',
  rose: 'bg-[#E11D48] text-white',
  slate: 'bg-slate-700/90 text-white'
};

export default function GuiasIndex() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRegion, setActiveRegion] = useState(null);
  const [activeCountry, setActiveCountry] = useState(null);
  const [activeTags, setActiveTags] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all'); // all | published | planned
  const carouselRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const countriesInScope = useMemo(() => {
    const base = activeRegion
      ? DESTINATIONS.filter((d) => d.region === activeRegion)
      : DESTINATIONS;
    return [...new Set(base.map((d) => d.country))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
  }, [activeRegion]);

  const filtered = useMemo(() => {
    const query = normalize(searchQuery.trim());
    return DESTINATIONS.filter((destination) => {
      if (activeRegion && destination.region !== activeRegion) return false;
      if (activeCountry && destination.country !== activeCountry) return false;
      if (statusFilter === 'published' && !destination.published) return false;
      if (statusFilter === 'planned' && destination.published) return false;
      if (activeTags.length && !activeTags.every((tag) => destination.tags.includes(tag))) return false;
      if (!query) return true;
      const haystack = [
        destination.city,
        destination.country,
        destination.region,
        destination.desc,
        destination.guide?.title,
        ...(destination.tags || [])
      ];
      return haystack.some((field) => normalize(field).includes(query));
    });
  }, [searchQuery, activeRegion, activeCountry, activeTags, statusFilter]);

  const featuredCarousel = useMemo(() => {
    if (!activeRegion && !searchQuery.trim() && !activeCountry && !activeTags.length && statusFilter === 'all') {
      return FEATURED;
    }
    return filtered.filter((d) => d.published);
  }, [activeRegion, searchQuery, activeCountry, activeTags, statusFilter, filtered]);

  const publishedCount = filtered.filter((d) => d.published).length;
  const plannedCount = filtered.length - publishedCount;

  const scrollToDestinos = () => {
    document.getElementById('destinos-destaque')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToCatalog = () => {
    document.getElementById('todos-destinos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollCarousel = (direction) => {
    const el = carouselRef.current;
    if (!el) return;
    const amount = Math.min(320, el.clientWidth * 0.8);
    el.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  const toggleTag = (tagId) => {
    setActiveTags((current) =>
      current.includes(tagId) ? current.filter((t) => t !== tagId) : [...current, tagId]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setActiveRegion(null);
    setActiveCountry(null);
    setActiveTags([]);
    setStatusFilter('all');
  };

  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    Boolean(activeRegion) ||
    Boolean(activeCountry) ||
    activeTags.length > 0 ||
    statusFilter !== 'all';

  useEffect(() => {
    const el = carouselRef.current;
    if (!el || paused || featuredCarousel.length < 2) return undefined;
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
  }, [featuredCarousel.length, paused]);

  useEffect(() => {
    if (activeCountry && !countriesInScope.includes(activeCountry)) {
      setActiveCountry(null);
    }
  }, [activeCountry, countriesInScope]);

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
                    if (event.key === 'Enter') scrollToCatalog();
                  }}
                  placeholder="Busque por cidade, país ou tema…"
                  className="w-full rounded-full border border-border-gray/80 bg-[#F7F8FA] py-3.5 pl-11 pr-4 text-sm text-brand-navy placeholder:text-text-muted/70 focus:border-brand-navy focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={scrollToCatalog}
                className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-extrabold text-brand-orange hover:text-brand-navy"
              >
                Ver todos os {DESTINATIONS.length} destinos
                <ArrowRight className="h-4 w-4" />
              </button>
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
              <button
                type="button"
                onClick={() => {
                  setActiveRegion(null);
                  scrollToCatalog();
                }}
                className="inline-flex items-center gap-1 text-sm font-extrabold text-brand-orange transition-colors hover:text-brand-navy"
              >
                Ver todas
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 custom-scrollbar-hide sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3 xl:grid-cols-6">
              {REGIONS.map((region, index) => {
                const Icon = region.icon;
                const selected = activeRegion === region.match || (!activeRegion && region.match === null);
                return (
                  <ScrollReveal key={region.id} delay={index * 40} className="w-[min(280px,85vw)] shrink-0 sm:w-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveRegion(region.match);
                        scrollToCatalog();
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
                <button
                  type="button"
                  onClick={scrollToCatalog}
                  className="ml-1 inline-flex min-h-11 items-center gap-1 px-1 text-sm font-extrabold text-brand-orange transition-colors hover:text-brand-navy"
                >
                  Ver todos
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {featuredCarousel.length === 0 ? (
              <p className="rounded-[24px] border border-border-gray/70 bg-[#F7F8FA] px-5 py-8 text-sm text-text-muted">
                Nenhum guia publicado com esse filtro. Ajuste a busca ou veja o catálogo completo abaixo.
              </p>
            ) : (
              <div
                ref={carouselRef}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onFocusCapture={() => setPaused(true)}
                onBlurCapture={() => setPaused(false)}
                className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4 custom-scrollbar-hide snap-x snap-mandatory sm:mx-0 sm:px-0"
              >
                {featuredCarousel.map((destination) => {
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
            )}
          </section>

          {/* Full catalog — scale-friendly filters + dense listing */}
          <section id="todos-destinos" className="mt-16 scroll-mt-28 sm:mt-20">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-headers text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
                  Todos os destinos
                </h2>
                <p className="mt-2 text-sm text-text-muted">
                  {filtered.length} resultado{filtered.length === 1 ? '' : 's'}
                  {publishedCount ? ` · ${publishedCount} com guia` : ''}
                  {plannedCount ? ` · ${plannedCount} em breve` : ''}
                </p>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex min-h-11 items-center gap-1 self-start text-sm font-extrabold text-brand-navy/70 hover:text-brand-orange"
                >
                  <X className="h-4 w-4" />
                  Limpar filtros
                </button>
              )}
            </div>

            <div className="rounded-[28px] border border-border-gray/70 bg-[#F7F8FA] p-4 sm:p-6">
              <div className="relative max-w-xl">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Filtrar por cidade, país, tag…"
                  className="w-full rounded-full border border-border-gray/80 bg-white py-3 pl-11 pr-4 text-sm text-brand-navy placeholder:text-text-muted/70 focus:border-brand-navy focus:outline-none"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="mr-1 self-center text-[11px] font-extrabold uppercase tracking-wide text-text-muted">
                  Região
                </span>
                <FilterChip
                  active={!activeRegion}
                  onClick={() => setActiveRegion(null)}
                  label="Todas"
                />
                {REGION_OPTIONS.map((region) => (
                  <FilterChip
                    key={region.id}
                    active={activeRegion === region.id}
                    onClick={() => setActiveRegion(region.id)}
                    label={region.label}
                  />
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="mr-1 self-center text-[11px] font-extrabold uppercase tracking-wide text-text-muted">
                  País
                </span>
                <FilterChip
                  active={!activeCountry}
                  onClick={() => setActiveCountry(null)}
                  label="Todos"
                />
                {countriesInScope.slice(0, 18).map((country) => (
                  <FilterChip
                    key={country}
                    active={activeCountry === country}
                    onClick={() => setActiveCountry(country === activeCountry ? null : country)}
                    label={country}
                  />
                ))}
                {countriesInScope.length > 18 && (
                  <span className="self-center text-[11px] text-text-muted">
                    +{countriesInScope.length - 18} — refine pela busca
                  </span>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="mr-1 self-center text-[11px] font-extrabold uppercase tracking-wide text-text-muted">
                  Tags
                </span>
                {TAG_OPTIONS.map((tag) => (
                  <FilterChip
                    key={tag.id}
                    active={activeTags.includes(tag.id)}
                    onClick={() => toggleTag(tag.id)}
                    label={tag.label}
                  />
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="mr-1 self-center text-[11px] font-extrabold uppercase tracking-wide text-text-muted">
                  Status
                </span>
                <FilterChip active={statusFilter === 'all'} onClick={() => setStatusFilter('all')} label="Todos" />
                <FilterChip
                  active={statusFilter === 'published'}
                  onClick={() => setStatusFilter('published')}
                  label="Com guia"
                />
                <FilterChip
                  active={statusFilter === 'planned'}
                  onClick={() => setStatusFilter('planned')}
                  label="Em breve"
                />
              </div>
            </div>

            {filtered.length === 0 ? (
              <p className="mt-6 rounded-[24px] border border-border-gray/70 bg-white px-5 py-8 text-sm text-text-muted">
                Nenhum destino com esses filtros. Tente “praia”, “Brasil” ou “Europa”.
              </p>
            ) : (
              <ul className="mt-6 divide-y divide-border-gray/60 overflow-hidden rounded-[28px] border border-border-gray/70 bg-white">
                {filtered.map((destination) => {
                  const BadgeIcon = destination.badge.icon;
                  const rowKey = normalizeDestinationKey(destination.city);
                  const content = (
                    <>
                      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl bg-[#EEF1F6] sm:h-24 sm:w-36">
                        {destination.published ? (
                          <img
                            src={coverOf(destination.guide)}
                            alt=""
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-brand-navy/30">
                            <MapPin className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-headers text-base font-extrabold text-brand-navy sm:text-lg">
                            {destination.city}
                          </h3>
                          <span className="text-sm text-text-muted">{destination.country}</span>
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-extrabold ${BADGE_TONES[destination.badge.tone]}`}
                          >
                            <BadgeIcon className="h-3 w-3" />
                            {destination.badge.label}
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-2 text-sm leading-snug text-text-muted">
                          {destination.desc}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          <span className="rounded-full bg-[#F7F8FA] px-2 py-0.5 text-[10px] font-bold text-brand-navy/70">
                            {destination.region}
                          </span>
                          {destination.tags.slice(0, 4).map((tag) => (
                            <span
                              key={`${rowKey}-${tag}`}
                              className="rounded-full bg-[#F7F8FA] px-2 py-0.5 text-[10px] font-bold text-brand-navy/70"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="hidden shrink-0 text-sm font-extrabold text-brand-orange sm:inline-flex sm:items-center sm:gap-1">
                        {destination.published ? 'Abrir guia' : 'Em breve'}
                        {destination.published && <ArrowRight className="h-4 w-4" />}
                      </span>
                    </>
                  );

                  return (
                    <li key={destination.id}>
                      {destination.published ? (
                        <Link
                          href={destination.url}
                          className="group flex items-center gap-4 px-4 py-4 transition-colors hover:bg-[#F7F8FA] sm:gap-5 sm:px-5"
                        >
                          {content}
                        </Link>
                      ) : (
                        <div className="flex items-center gap-4 px-4 py-4 opacity-80 sm:gap-5 sm:px-5">
                          {content}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>
      </main>

      <Footer onOpenDownload={() => setIsDownloadOpen(true)} />
      <AppDownloadModal isOpen={isDownloadOpen} onClose={() => setIsDownloadOpen(false)} />
    </div>
  );
}

function FilterChip({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-9 rounded-full border px-3 py-1.5 text-xs font-extrabold transition-colors ${
        active
          ? 'border-brand-navy bg-brand-navy text-white'
          : 'border-border-gray/80 bg-white text-brand-navy hover:border-brand-orange hover:text-brand-orange'
      }`}
    >
      {label}
    </button>
  );
}

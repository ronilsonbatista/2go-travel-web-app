'use client';

import { guideImage } from '@/lib/curatedGuideImages';
import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, ChevronDown, MapPin, Search, SlidersHorizontal, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppDownloadModal from '@/components/AppDownloadModal';
import CountryCombobox from '@/components/CountryCombobox';
import {
  REGION_OPTIONS as ALL_REGION_OPTIONS,
  TAG_OPTIONS as ALL_TAG_OPTIONS,
  normalizeDestinationKey
} from '@/data/destinationsCatalog';
import {
  BADGE_TONES,
  GUIAS_DESTINATIONS,
  normalizeSearch
} from '@/lib/guiasDestinations';

const REGION_OPTIONS = ALL_REGION_OPTIONS.filter((region) =>
  GUIAS_DESTINATIONS.some((destination) => destination.region === region.id)
);

const TAG_OPTIONS = ALL_TAG_OPTIONS.filter((tag) =>
  GUIAS_DESTINATIONS.some((destination) => destination.tags?.includes(tag.id))
);

function coverOf(guide) {
  return guideImage(guide, 'guide-card');
}

const QUICK_SUGGESTIONS = [
  { label: 'Praia', params: { q: 'praia' } },
  { label: 'Brasil', params: { q: 'Brasil' } },
  { label: 'Família', params: { tag: 'familia' } },
  { label: 'Europa', params: { regiao: 'Europa' } }
];

const STATUS_OPTIONS = [
  { id: 'all', label: 'Todos' },
  { id: 'published', label: 'Com guia' },
  { id: 'planned', label: 'Em breve' }
];

function parseTags(raw) {
  if (!raw) return [];
  return raw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
}

function FilterChip({ active, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-9 shrink-0 rounded-full border px-3 py-1.5 text-xs font-extrabold transition-colors ${
        active
          ? 'border-brand-navy bg-brand-navy text-white'
          : 'border-border-gray/80 bg-white text-brand-navy hover:border-brand-orange hover:text-brand-orange'
      }`}
    >
      {label}
    </button>
  );
}

function ActiveChip({ label, onRemove }) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-brand-navy/20 bg-brand-navy/[0.04] px-3 py-1.5 text-xs font-extrabold text-brand-navy"
    >
      {label}
      <X className="h-3.5 w-3.5" />
    </button>
  );
}

function GuiasDestinosCatalog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [tagsOpen, setTagsOpen] = useState(false);

  const urlQuery = searchParams.get('q') || '';
  const activeRegion = searchParams.get('regiao') || null;
  const activeCountry = searchParams.get('pais') || null;
  const activeTags = useMemo(() => parseTags(searchParams.get('tag')), [searchParams]);
  const statusFilter = searchParams.get('status') || 'all';
  // Local draft while typing; null means "follow URL".
  const [draftQuery, setDraftQuery] = useState(null);
  const searchQuery = draftQuery ?? urlQuery;

  const updateParams = useCallback(
    (patch, { replace = true } = {}) => {
      const next = new URLSearchParams(searchParams.toString());
      Object.entries(patch).forEach(([key, value]) => {
        if (value == null || value === '' || (Array.isArray(value) && value.length === 0) || value === 'all') {
          next.delete(key);
        } else if (Array.isArray(value)) {
          next.set(key, value.join(','));
        } else {
          next.set(key, String(value));
        }
      });
      const qs = next.toString();
      const href = qs ? `${pathname}?${qs}` : pathname;
      if (replace) router.replace(href, { scroll: false });
      else router.push(href, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  useEffect(() => {
    if (draftQuery == null) return undefined;
    const trimmed = draftQuery.trim();
    if (trimmed === urlQuery.trim()) return undefined;
    const id = setTimeout(() => {
      updateParams({ q: trimmed || null });
    }, 250);
    return () => clearTimeout(id);
  }, [draftQuery, urlQuery, updateParams]);

  const countriesInScope = useMemo(() => {
    const base = activeRegion
      ? GUIAS_DESTINATIONS.filter((d) => d.region === activeRegion)
      : GUIAS_DESTINATIONS;
    return [...new Set(base.map((d) => d.country))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
  }, [activeRegion]);

  useEffect(() => {
    if (activeCountry && !countriesInScope.includes(activeCountry)) {
      updateParams({ pais: null });
    }
  }, [activeCountry, countriesInScope, updateParams]);

  const filtered = useMemo(() => {
    const query = normalizeSearch(searchQuery.trim());
    return GUIAS_DESTINATIONS.filter((destination) => {
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
      return haystack.some((field) => normalizeSearch(field).includes(query));
    });
  }, [searchQuery, activeRegion, activeCountry, activeTags, statusFilter]);

  const publishedCount = filtered.filter((d) => d.published).length;
  const plannedCount = filtered.length - publishedCount;

  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    Boolean(activeRegion) ||
    Boolean(activeCountry) ||
    activeTags.length > 0 ||
    statusFilter !== 'all';

  const clearFilters = () => {
    setDraftQuery(null);
    updateParams({ q: null, regiao: null, pais: null, tag: null, status: null });
  };

  const toggleTag = (tagId) => {
    const next = activeTags.includes(tagId)
      ? activeTags.filter((t) => t !== tagId)
      : [...activeTags, tagId];
    updateParams({ tag: next });
  };

  const tagLabel = (id) => TAG_OPTIONS.find((t) => t.id === id)?.label || id;

  // Draft state for mobile sheet (apply on confirm) — seeded when sheet opens
  const [draftCountry, setDraftCountry] = useState(null);
  const [draftTags, setDraftTags] = useState([]);
  const [draftStatus, setDraftStatus] = useState('all');

  const openSheet = () => {
    setDraftCountry(activeCountry);
    setDraftTags(activeTags);
    setDraftStatus(statusFilter);
    setSheetOpen(true);
  };

  useEffect(() => {
    if (!sheetOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [sheetOpen]);

  const applySheet = () => {
    updateParams({
      pais: draftCountry,
      tag: draftTags,
      status: draftStatus
    });
    setSheetOpen(false);
  };

  return (
    <div className="w-full bg-white min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy overflow-x-clip">
      <Header solid onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-28 pb-32 lg:pb-20">
        <div className="container mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 text-left min-w-0">
          <Breadcrumbs
            items={[
              { name: 'Guia de Viagem', url: '/guias' },
              { name: 'Todos os destinos', url: '/guias/destinos' }
            ]}
          />

          <div className="mt-8 mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-headers text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold tracking-tight text-brand-navy">
                Todos os destinos
              </h1>
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
                Limpar tudo
              </button>
            )}
          </div>

          {/* Sticky filter bar */}
          <div className="sticky top-20 z-30 -mx-4 border-y border-border-gray/60 bg-white/95 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-[28px] sm:border sm:px-5 sm:py-4">
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <div className="relative min-w-0 flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setDraftQuery(event.target.value)}
                    placeholder="Buscar cidade, país ou tema…"
                    className="w-full rounded-full border border-border-gray/80 bg-[#F7F8FA] py-3 pl-11 pr-4 text-sm text-brand-navy placeholder:text-text-muted/70 focus:border-brand-navy focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={openSheet}
                  className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-border-gray/80 bg-white px-4 text-sm font-extrabold text-brand-navy lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtros
                  {(activeCountry || activeTags.length > 0 || statusFilter !== 'all') && (
                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-orange px-1.5 text-[10px] text-white">
                      {(activeCountry ? 1 : 0) + activeTags.length + (statusFilter !== 'all' ? 1 : 0)}
                    </span>
                  )}
                </button>
              </div>

              {!searchQuery.trim() && (
                <div className="flex flex-wrap gap-2">
                  <span className="self-center text-[11px] font-extrabold uppercase tracking-wide text-text-muted">
                    Sugestões
                  </span>
                  {QUICK_SUGGESTIONS.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        const nextQ = item.params.q ?? null;
                        setDraftQuery(nextQ);
                        updateParams({ q: null, regiao: null, pais: null, tag: null, status: null, ...item.params });
                      }}
                      className="min-h-9 rounded-full border border-dashed border-border-gray/80 bg-white px-3 py-1.5 text-xs font-bold text-brand-navy/80 hover:border-brand-orange hover:text-brand-orange"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}

              <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-0.5 custom-scrollbar-hide">
                <FilterChip
                  active={!activeRegion}
                  onClick={() => updateParams({ regiao: null, pais: null })}
                  label="Todas"
                />
                {REGION_OPTIONS.map((region) => (
                  <FilterChip
                    key={region.id}
                    active={activeRegion === region.id}
                    onClick={() =>
                      updateParams({
                        regiao: activeRegion === region.id ? null : region.id,
                        pais: null
                      })
                    }
                    label={region.label}
                  />
                ))}
              </div>

              {/* Desktop secondary filters */}
              <div className="hidden gap-4 lg:flex lg:items-start">
                <div className="w-[280px] shrink-0">
                  <p className="mb-1.5 text-[11px] font-extrabold uppercase tracking-wide text-text-muted">
                    País
                  </p>
                  <CountryCombobox
                    countries={countriesInScope}
                    value={activeCountry}
                    onChange={(country) => updateParams({ pais: country })}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => setTagsOpen((v) => !v)}
                    className="mb-1.5 inline-flex min-h-8 items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wide text-text-muted hover:text-brand-navy"
                    aria-expanded={tagsOpen}
                  >
                    Estilo de viagem
                    {activeTags.length > 0 ? ` · ${activeTags.length}` : ''}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${tagsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {tagsOpen && (
                    <div className="flex flex-wrap gap-2">
                      {TAG_OPTIONS.map((tag) => (
                        <FilterChip
                          key={tag.id}
                          active={activeTags.includes(tag.id)}
                          onClick={() => toggleTag(tag.id)}
                          label={tag.label}
                        />
                      ))}
                    </div>
                  )}
                </div>

                <div className="shrink-0">
                  <p className="mb-1.5 text-[11px] font-extrabold uppercase tracking-wide text-text-muted">
                    Status
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {STATUS_OPTIONS.map((option) => (
                      <FilterChip
                        key={option.id}
                        active={statusFilter === option.id}
                        onClick={() => updateParams({ status: option.id })}
                        label={option.label}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchQuery.trim() ? (
                <ActiveChip
                  label={`Busca: ${searchQuery.trim()}`}
                  onRemove={() => {
                    setDraftQuery(null);
                    updateParams({ q: null });
                  }}
                />
              ) : null}
              {activeRegion ? (
                <ActiveChip label={`Região: ${activeRegion}`} onRemove={() => updateParams({ regiao: null, pais: null })} />
              ) : null}
              {activeCountry ? (
                <ActiveChip label={`País: ${activeCountry}`} onRemove={() => updateParams({ pais: null })} />
              ) : null}
              {activeTags.map((tag) => (
                <ActiveChip
                  key={tag}
                  label={`Tag: ${tagLabel(tag)}`}
                  onRemove={() => updateParams({ tag: activeTags.filter((t) => t !== tag) })}
                />
              ))}
              {statusFilter !== 'all' ? (
                <ActiveChip
                  label={`Status: ${STATUS_OPTIONS.find((s) => s.id === statusFilter)?.label || statusFilter}`}
                  onRemove={() => updateParams({ status: null })}
                />
              ) : null}
            </div>
          )}

          {filtered.length === 0 ? (
            <p className="mt-6 rounded-[24px] border border-border-gray/70 bg-white px-5 py-8 text-sm text-text-muted">
              Nenhum destino com esses filtros. Tente “Praia”, “Brasil” ou “Europa”.
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
                        <h2 className="font-headers text-base font-extrabold text-brand-navy sm:text-lg">
                          {destination.city}
                        </h2>
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
                        className="group flex min-h-[72px] items-center gap-4 px-4 py-4 transition-colors hover:bg-[#F7F8FA] sm:gap-5 sm:px-5"
                      >
                        {content}
                      </Link>
                    ) : (
                      <div className="flex min-h-[72px] items-center gap-4 px-4 py-4 opacity-80 sm:gap-5 sm:px-5">
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>

      {/* Mobile bottom sheet */}
      {sheetOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filtros">
          <button
            type="button"
            aria-label="Fechar filtros"
            className="absolute inset-0 bg-black/40"
            onClick={() => setSheetOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-auto rounded-t-[28px] bg-white shadow-xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-border-gray/60 bg-white px-5 py-4">
              <h2 className="font-headers text-lg font-extrabold text-brand-navy">Filtros</h2>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-navy hover:bg-[#F7F8FA]"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6 px-5 py-5">
              <div>
                <p className="mb-2 text-[11px] font-extrabold uppercase tracking-wide text-text-muted">País</p>
                <CountryCombobox
                  countries={countriesInScope}
                  value={draftCountry}
                  onChange={setDraftCountry}
                />
              </div>

              <div>
                <p className="mb-2 text-[11px] font-extrabold uppercase tracking-wide text-text-muted">
                  Estilo de viagem{draftTags.length ? ` · ${draftTags.length}` : ''}
                </p>
                <div className="flex flex-wrap gap-2">
                  {TAG_OPTIONS.map((tag) => (
                    <FilterChip
                      key={tag.id}
                      active={draftTags.includes(tag.id)}
                      onClick={() =>
                        setDraftTags((current) =>
                          current.includes(tag.id)
                            ? current.filter((t) => t !== tag.id)
                            : [...current, tag.id]
                        )
                      }
                      label={tag.label}
                    />
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-[11px] font-extrabold uppercase tracking-wide text-text-muted">Status</p>
                <div className="flex flex-wrap gap-2">
                  {STATUS_OPTIONS.map((option) => (
                    <FilterChip
                      key={option.id}
                      active={draftStatus === option.id}
                      onClick={() => setDraftStatus(option.id)}
                      label={option.label}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 flex gap-3 border-t border-border-gray/60 bg-white px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <button
                type="button"
                onClick={() => {
                  setDraftCountry(null);
                  setDraftTags([]);
                  setDraftStatus('all');
                }}
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-border-gray/80 text-sm font-extrabold text-brand-navy"
              >
                Limpar
              </button>
              <button
                type="button"
                onClick={applySheet}
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-brand-orange text-sm font-extrabold text-white hover:bg-brand-navy"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <Footer onOpenDownload={() => setIsDownloadOpen(true)} />
      <AppDownloadModal isOpen={isDownloadOpen} onClose={() => setIsDownloadOpen(false)} />
    </div>
  );
}

export default function GuiasDestinosPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-white text-sm text-text-muted">
          Carregando destinos…
        </div>
      }
    >
      <GuiasDestinosCatalog />
    </Suspense>
  );
}

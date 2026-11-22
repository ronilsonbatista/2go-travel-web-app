'use client';

import { guideImage } from '@/lib/curatedGuideImages';
import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowRight, MapPin, Search, X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppDownloadModal from '@/components/AppDownloadModal';
import {
  REGION_OPTIONS as ALL_REGION_OPTIONS,
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

function coverOf(guide) {
  return guideImage(guide, 'guide-card');
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

function GuiasDestinosCatalog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  const urlQuery = searchParams.get('q') || '';
  const activeRegion = searchParams.get('regiao') || null;
  const [draftQuery, setDraftQuery] = useState(null);
  const searchQuery = draftQuery ?? urlQuery;

  const updateParams = useCallback(
    (patch, { replace = true } = {}) => {
      const next = new URLSearchParams(searchParams.toString());
      Object.entries(patch).forEach(([key, value]) => {
        if (value == null || value === '') {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
      });
      // Drop legacy multi-facet params from older URLs.
      ['pais', 'tag', 'status'].forEach((key) => next.delete(key));
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

  const filtered = useMemo(() => {
    const query = normalizeSearch(searchQuery.trim());
    return GUIAS_DESTINATIONS.filter((destination) => {
      if (activeRegion && destination.region !== activeRegion) return false;
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
  }, [searchQuery, activeRegion]);

  const publishedCount = filtered.filter((d) => d.published).length;
  const hasActiveFilters = Boolean(searchQuery.trim()) || Boolean(activeRegion);

  const clearFilters = () => {
    setDraftQuery(null);
    updateParams({ q: null, regiao: null });
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
                {filtered.length} destino{filtered.length === 1 ? '' : 's'}
                {publishedCount ? ` · ${publishedCount} com guia` : ''}
              </p>
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex min-h-11 items-center gap-1 self-start text-sm font-extrabold text-brand-navy/70 hover:text-brand-orange"
              >
                <X className="h-4 w-4" />
                Limpar
              </button>
            )}
          </div>

          <div className="rounded-[24px] border border-border-gray/70 bg-[#F7F8FA] p-4 sm:p-5">
            <div className="relative max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setDraftQuery(event.target.value)}
                placeholder="Buscar cidade ou país…"
                className="w-full rounded-full border border-border-gray/80 bg-white py-3 pl-11 pr-4 text-sm text-brand-navy placeholder:text-text-muted/70 focus:border-brand-navy focus:outline-none"
              />
            </div>

            {REGION_OPTIONS.length > 1 ? (
              <div className="mt-3 -mx-1 flex gap-2 overflow-x-auto px-1 pb-0.5 custom-scrollbar-hide">
                <FilterChip
                  active={!activeRegion}
                  onClick={() => updateParams({ regiao: null })}
                  label="Todas"
                />
                {REGION_OPTIONS.map((region) => (
                  <FilterChip
                    key={region.id}
                    active={activeRegion === region.id}
                    onClick={() =>
                      updateParams({
                        regiao: activeRegion === region.id ? null : region.id
                      })
                    }
                    label={region.label}
                  />
                ))}
              </div>
            ) : null}
          </div>

          {filtered.length === 0 ? (
            <p className="mt-6 rounded-[24px] border border-border-gray/70 bg-white px-5 py-8 text-sm text-text-muted">
              Nenhum destino com essa busca. Tente o nome da cidade ou do país.
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
                        {destination.tags.slice(0, 3).map((tag) => (
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
                      {destination.published ? 'Ver destino' : 'Em breve'}
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

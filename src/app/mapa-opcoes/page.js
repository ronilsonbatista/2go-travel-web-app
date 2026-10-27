'use client';

/**
 * Dev / review preview: Paris 30s map style options.
 * Query: ?style=atual-slate|modern-light|dark-slate|soft-pastel|high-contrast|satellite-lite
 * Screenshots only — not linked from nav.
 */

import React, { useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Hotel } from 'lucide-react';

const ORIG_PINS = [
  {
    id: 'eiffel',
    name: 'Torre Eiffel e Champs-Élysées',
    blurb: 'Ícones de Paris',
    color: '#5B8DEF',
    image: '/images/destinations/paris/paris-eiffel-seine.jpg',
    pin: { top: '58%', left: '22%' }
  },
  {
    id: 'louvre',
    name: 'Centro Histórico e Louvre',
    blurb: 'Cultura e história',
    color: '#F47A20',
    image: '/images/destinations/paris/paris-louvre.jpg',
    pin: { top: '48%', left: '48%' }
  },
  {
    id: 'marais',
    name: 'Le Marais',
    blurb: 'Charme e vida local',
    color: '#8B7CF6',
    image: '/images/destinations/paris/paris-marais.jpg',
    pin: { top: '42%', left: '62%' }
  },
  {
    id: 'montmartre',
    name: 'Montmartre',
    blurb: 'Arte e vista incrível',
    color: '#96AB21',
    image: '/images/destinations/paris/paris-sacre-coeur.jpg',
    pin: { top: '22%', left: '55%' }
  }
];

/** Geographic % for stitched free-tile basemaps (same Paris bbox). */
const GEO_PINS = [
  { ...ORIG_PINS[0], pin: { top: '68.1%', left: '26.5%' } },
  { ...ORIG_PINS[1], pin: { top: '64.7%', left: '59.7%' } },
  { ...ORIG_PINS[2], pin: { top: '69.5%', left: '78.6%' } },
  { ...ORIG_PINS[3], pin: { top: '23.9%', left: '63.9%' } }
];

export const MAP_STYLE_OPTIONS = [
  {
    id: 'atual-slate',
    name: 'Atual slate (produção)',
    short: 'atual-slate',
    description: 'CSS cool slate-blue atual sobre o PNG vintage — referência de produção.',
    mapSrc: '/images/maps/paris.png',
    pins: ORIG_PINS,
    productionLike: true,
    cssTheme: 'atual-slate'
  },
  {
    id: 'modern-light',
    name: 'Modern light (Positron-like)',
    short: 'modern-light',
    description: 'Base cinza-clara tipo Carto Positron (ESRI Light Gray) com wash leve.',
    mapSrc: '/images/maps/preview/paris-positron-like.png',
    pins: GEO_PINS,
    productionLike: false,
    cssTheme: 'modern-light'
  },
  {
    id: 'dark-slate',
    name: 'Dark slate',
    short: 'dark-slate',
    description: 'Mapa escuro frio; ruas legíveis sob pins claros.',
    mapSrc: '/images/maps/preview/paris-dark-slate.png',
    pins: GEO_PINS,
    productionLike: false,
    cssTheme: 'dark-slate'
  },
  {
    id: 'soft-pastel',
    name: 'Soft pastel',
    short: 'soft-pastel',
    description: 'Leitura suave rosada/lilás sobre o mapa ilustrado, menos “tech”.',
    mapSrc: '/images/maps/preview/paris-soft-pastel.png',
    pins: ORIG_PINS,
    productionLike: false,
    cssTheme: 'soft-pastel'
  },
  {
    id: 'high-contrast',
    name: 'High-contrast streets',
    short: 'high-contrast',
    description: 'OSM com contraste alto — ruas e quarteirões bem definidos (estilo Voyager-ish).',
    mapSrc: '/images/maps/preview/paris-high-contrast.png',
    pins: GEO_PINS,
    productionLike: false,
    cssTheme: 'high-contrast'
  },
  {
    id: 'satellite-lite',
    name: 'Satellite-lite',
    short: 'satellite-lite',
    description: 'Imagem de satélite ESRI suavizada + véu claro para pins (tiles gratuitos).',
    mapSrc: '/images/maps/preview/paris-satellite-lite.png',
    pins: GEO_PINS,
    productionLike: false,
    cssTheme: 'satellite-lite'
  }
];

function MapPreview({ option, activeId = 'eiffel' }) {
  return (
    <div
      className="guide-city-map relative h-full min-h-[420px] w-full overflow-hidden rounded-[22px] border border-slate-200/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:min-h-[520px]"
      data-map-theme={option.cssTheme}
    >
      <img
        src={option.mapSrc}
        alt=""
        className="guide-city-map__img absolute inset-0 h-full w-full object-cover"
      />
      <div className="guide-city-map__wash absolute inset-0" />
      <div className="guide-city-map__grid absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-slate-900/10" />

      {option.pins.map((pin) => {
        const active = pin.id === activeId;
        return (
          <div
            key={pin.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              top: pin.pin.top,
              left: pin.pin.left,
              zIndex: active ? 30 : 10
            }}
          >
            {active ? (
              <div className="flex max-w-[210px] items-center gap-2 rounded-xl bg-white p-1.5 pr-2.5 text-left shadow-[0_8px_24px_rgba(8,27,107,0.18)] ring-2 ring-brand-orange/70">
                <span
                  className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-bg-light"
                  style={{ boxShadow: `inset 0 0 0 2px ${pin.color}55` }}
                >
                  <img src={pin.image} alt="" className="h-full w-full object-cover" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-extrabold leading-tight text-brand-navy">
                    {pin.name}
                  </span>
                  <span className="mt-0.5 block truncate text-[10px] font-medium text-text-muted">
                    {pin.blurb}
                  </span>
                </span>
              </div>
            ) : (
              <div
                className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white ring-2 ring-white"
                style={{ boxShadow: `0 6px 16px rgba(8,27,107,0.2), 0 0 0 2px ${pin.color}` }}
              >
                <span className="h-8 w-8 overflow-hidden rounded-full bg-bg-light">
                  <img src={pin.image} alt="" className="h-full w-full object-cover" />
                </span>
                <span
                  className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-white"
                  style={{ backgroundColor: pin.color }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function PreviewInner() {
  const params = useSearchParams();
  const styleId = params.get('style') || 'atual-slate';
  const shot = params.get('shot') === '1';
  const option =
    MAP_STYLE_OPTIONS.find((o) => o.id === styleId) || MAP_STYLE_OPTIONS[0];

  const chrome = useMemo(
    () => ({
      title: 'Paris em 30 segundos',
      facts: [
        { value: '5 – 7 dias', label: 'Tempo ideal' },
        { value: '€ 80 – 150', label: 'Por dia (média)' },
        { value: 'Metrô fácil', label: 'Rápido e eficiente' },
        { value: 'Reservas antecipadas', label: 'Para as principais atrações' }
      ]
    }),
    []
  );

  if (shot) {
    return (
      <main className="min-h-screen bg-[#F4F6F9] p-6">
        <div className="mx-auto max-w-5xl">
          <MapPreview option={option} />
          <p className="sr-only">{option.name}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F6F9] px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-brand-orange">
            Preview · mapa 30s
          </p>
          <h1 className="mt-1 font-headers text-2xl font-extrabold text-brand-navy">
            Opções de estilo do mapa — Paris
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-text-muted">
            Mesma região e pins. Carto CDN bloqueado neste ambiente; Positron/Voyager
            aproximados via ESRI Light / OSM high-contrast. Sem Place IDs.
          </p>
        </header>

        <div className="mb-5 flex flex-wrap gap-2">
          {MAP_STYLE_OPTIONS.map((opt) => (
            <a
              key={opt.id}
              href={`/mapa-opcoes?style=${opt.id}`}
              className={`rounded-full px-3.5 py-2 text-xs font-extrabold transition ${
                opt.id === option.id
                  ? 'bg-brand-navy text-white'
                  : 'bg-white text-text-muted ring-1 ring-border-gray hover:text-brand-navy'
              }`}
            >
              {opt.name}
              {opt.productionLike ? ' ★' : ''}
            </a>
          ))}
        </div>

        <section className="rounded-[28px] border border-border-gray/80 bg-white p-5 shadow-md sm:p-7">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-headers text-base font-bold text-brand-navy sm:text-lg">
              {chrome.title}
            </h2>
            <p className="text-xs font-semibold text-text-muted">
              Estilo: <span className="text-brand-navy">{option.name}</span>
              {option.productionLike ? ' · produção atual' : ''}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {chrome.facts.map((f) => (
              <div
                key={f.label}
                className="rounded-[18px] border border-border-gray/70 bg-[#FAFBFC] px-3 py-3"
              >
                <p className="font-headers text-[13px] font-extrabold text-brand-navy">{f.value}</p>
                <p className="mt-1 text-[10px] text-text-muted">{f.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
            <div className="lg:col-span-8 xl:col-span-9">
              <MapPreview option={option} />
            </div>
            <aside className="lg:col-span-4 xl:col-span-3">
              <div className="mb-3 flex items-center gap-2">
                <Hotel className="h-4 w-4 text-brand-orange" />
                <h3 className="font-headers text-sm font-extrabold text-brand-navy">Explore o mapa</h3>
              </div>
              <ul className="space-y-2.5">
                {option.pins.map((pin, idx) => (
                  <li
                    key={pin.id}
                    className={`flex items-center gap-2.5 rounded-2xl border px-2.5 py-2 ${
                      idx === 0
                        ? 'border-brand-navy/15 bg-brand-navy/[0.04]'
                        : 'border-border-gray/70 bg-white'
                    }`}
                  >
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: pin.color }} />
                    <span className="h-9 w-9 overflow-hidden rounded-lg">
                      <img src={pin.image} alt="" className="h-full w-full object-cover" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[12px] font-extrabold text-brand-navy">{pin.name}</span>
                      <span className="block text-[10px] text-text-muted">{pin.blurb}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[11px] leading-relaxed text-text-muted">{option.description}</p>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function MapaOpcoesPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#F4F6F9] p-8">Carregando…</main>}>
      <PreviewInner />
    </Suspense>
  );
}

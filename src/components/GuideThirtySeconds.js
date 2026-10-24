"use client";

import React, { useMemo, useState } from 'react';
import {
  CalendarDays,
  ChevronRight,
  Coins,
  Hotel,
  MapPinned,
  Ticket,
  TrainFront
} from 'lucide-react';
import { getThirtySeconds } from '@/data/guideThirtySeconds';
import { attractionImage, mapImageFor } from '@/lib/guideVisuals';

const FACT_ICONS = {
  green: CalendarDays,
  yellow: Coins,
  orange: TrainFront,
  blue: Ticket
};

const FACT_TONE = {
  green: 'bg-[#E8F2C8] text-[#6B7F14]',
  yellow: 'bg-[#FFF3C4] text-[#B45309]',
  orange: 'bg-[#FFE4CC] text-[#C45A12]',
  blue: 'bg-[#DCE8FF] text-[#2F6FED]'
};

const TABS = [
  { id: 'map', label: 'Mapa por regiões' },
  { id: 'attractions', label: 'Principais atrações' },
  { id: 'hotels', label: 'Hotéis recomendados' }
];

const MIN_PIN_GAP = 14;

function parsePercent(value, fallback) {
  const n = parseFloat(String(value ?? '').replace('%', ''));
  return Number.isFinite(n) ? n : fallback;
}

/** Nudge overlapping pins apart so labels/markers stay readable. */
function declutterPins(pins) {
  const placed = pins.map((pin, index) => ({
    ...pin,
    _top: parsePercent(pin.pin?.top, 40 + index * 8),
    _left: parsePercent(pin.pin?.left, 40 + index * 8)
  }));

  for (let pass = 0; pass < 4; pass += 1) {
    for (let i = 0; i < placed.length; i += 1) {
      for (let j = i + 1; j < placed.length; j += 1) {
        const a = placed[i];
        const b = placed[j];
        const dy = b._top - a._top;
        const dx = b._left - a._left;
        const dist = Math.hypot(dx, dy) || 0.01;
        if (dist >= MIN_PIN_GAP) continue;
        const push = (MIN_PIN_GAP - dist) / 2;
        const ux = dx / dist;
        const uy = dy / dist;
        a._left = Math.min(88, Math.max(12, a._left - ux * push));
        a._top = Math.min(88, Math.max(12, a._top - uy * push));
        b._left = Math.min(88, Math.max(12, b._left + ux * push));
        b._top = Math.min(88, Math.max(12, b._top + uy * push));
      }
    }
  }

  return placed.map(({ _top, _left, ...pin }) => ({
    ...pin,
    pin: { top: `${_top.toFixed(1)}%`, left: `${_left.toFixed(1)}%` }
  }));
}

function CityMapCanvas({ mapSrc, pins, activeId, onSelect, mode }) {
  const laidOut = useMemo(() => declutterPins(pins), [pins]);

  return (
    <div className="relative h-full min-h-[300px] w-full overflow-hidden rounded-[22px] border border-border-gray/60 bg-[#dfe7f0]">
      <img
        src={mapSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(11,18,32,0.18)_100%)]" />

      {laidOut.map((pin) => {
        const active = pin.id === activeId;
        const subtitle =
          mode === 'hotels'
            ? pin.neighborhood || pin.note || pin.blurb
            : pin.blurb;
        return (
          <div
            key={pin.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              top: pin.pin?.top || '40%',
              left: pin.pin?.left || '40%',
              zIndex: active ? 30 : 10
            }}
          >
            {active ? (
              <button
                type="button"
                onClick={() => onSelect(pin.id)}
                aria-pressed="true"
                className="group flex max-w-[min(168px,42vw)] items-center gap-2 rounded-xl bg-white p-1.5 pr-2.5 text-left shadow-[0_8px_24px_rgba(8,27,107,0.18)] ring-2 ring-brand-orange/70 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 sm:max-w-[210px]"
              >
                <span
                  className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-bg-light"
                  style={{ boxShadow: `inset 0 0 0 2px ${pin.color}55` }}
                >
                  <img src={pin.image} alt="" className="h-full w-full object-cover" />
                  {mode === 'hotels' ? (
                    <span className="absolute inset-x-0 bottom-0 flex justify-center bg-brand-navy/80 py-0.5">
                      <Hotel className="h-2.5 w-2.5 text-white" />
                    </span>
                  ) : null}
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-extrabold leading-tight text-brand-navy [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden">
                    {pin.name}
                  </span>
                  <span className="mt-0.5 block truncate text-[10px] font-medium text-text-muted">
                    {subtitle}
                  </span>
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onSelect(pin.id)}
                aria-label={pin.name}
                aria-pressed="false"
                className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_6px_16px_rgba(8,27,107,0.2)] ring-2 ring-white transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105 sm:h-11 sm:w-11"
                style={{ boxShadow: `0 6px 16px rgba(8,27,107,0.2), 0 0 0 2px ${pin.color}` }}
              >
                <span className="h-8 w-8 overflow-hidden rounded-full bg-bg-light">
                  <img src={pin.image} alt="" className="h-full w-full object-cover" />
                </span>
                {mode === 'hotels' ? (
                  <span className="absolute -bottom-0.5 -right-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-navy text-white shadow-sm">
                    <Hotel className="h-2.5 w-2.5" />
                  </span>
                ) : (
                  <span
                    className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-white"
                    style={{ backgroundColor: pin.color }}
                  />
                )}
                <span className="pointer-events-none absolute left-1/2 top-[calc(100%+6px)] z-20 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-brand-navy px-2 py-1 text-[10px] font-bold text-white shadow-md group-hover:block group-focus-visible:block">
                  {pin.name}
                </span>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function GuideThirtySeconds({ guide }) {
  const data = useMemo(() => getThirtySeconds(guide), [guide]);
  const mapSrc = useMemo(() => mapImageFor(guide), [guide]);
  const [tab, setTab] = useState('map');
  const [activeRegion, setActiveRegion] = useState(data.regions[0]?.id || null);

  const attractionPins = useMemo(() => {
    const items = (guide?.attractions || []).slice(0, 4);
    if (!items.length) return data.regions;
    return items.map((att, index) => {
      const region = data.regions[index % Math.max(data.regions.length, 1)];
      return {
        id: `att-${index}`,
        name: att.name,
        blurb: att.duration || att.recommendedTime || '2–3 h',
        color: region?.color || '#5B8DEF',
        image: attractionImage(guide, att, [region?.image, guide.heroImage], index),
        pin: region?.pin || { top: `${30 + index * 12}%`, left: `${28 + index * 14}%` },
        hotel: region?.hotel
      };
    });
  }, [guide, data.regions]);

  const hotelPins = useMemo(() => {
    if (data.hotels?.length) return data.hotels;
    return (data.regions || []).map((region, index) => ({
      id: `hotel-region-${index}`,
      name: region.hotel || `Hospedagem em ${region.name}`,
      neighborhood: region.name,
      note: region.blurb,
      image: region.image,
      imageIllustrative: true,
      color: region.color,
      pin: region.pin
    }));
  }, [data.hotels, data.regions]);

  const pins =
    tab === 'attractions' ? attractionPins : tab === 'hotels' ? hotelPins : data.regions;
  const activeId =
    pins.some((pin) => pin.id === activeRegion) ? activeRegion : pins[0]?.id || null;

  if (!guide || !data.facts.length) return null;

  return (
    <section
      id="em-30-segundos"
      className="scroll-mt-28 overflow-hidden rounded-[28px] border border-border-gray/80 bg-white p-5 pb-16 shadow-md sm:p-7 lg:pb-7"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="font-headers text-left text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
          {guide.city} em 30 segundos
        </h2>
        <div
          role="tablist"
          aria-label={`Explorar ${guide.city}`}
          className="-mx-1 flex max-w-full gap-2 overflow-x-auto px-1 pb-1 custom-scrollbar-hide sm:flex-wrap sm:overflow-visible"
        >
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              onClick={() => setTab(item.id)}
              className={`min-h-11 shrink-0 rounded-full px-3.5 py-2 text-[11px] font-extrabold transition-all sm:text-xs ${
                tab === item.id
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'bg-bg-light text-text-muted hover:text-brand-navy'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
        <div className="grid grid-cols-2 gap-3 lg:col-span-3">
          {data.facts.map((fact) => {
            const Icon = FACT_ICONS[fact.tone] || MapPinned;
            return (
              <div
                key={fact.label}
                className="rounded-[20px] border border-border-gray/70 bg-[#FAFBFC] p-3.5 text-left transition-transform duration-300 hover:-translate-y-0.5"
              >
                <span
                  className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${FACT_TONE[fact.tone]}`}
                >
                  <Icon className="h-5 w-5" strokeWidth={2.25} />
                </span>
                <p className="font-headers text-sm font-extrabold leading-tight text-brand-navy sm:text-[15px]">
                  {fact.value}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-text-muted">{fact.label}</p>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-6">
          <CityMapCanvas
            mapSrc={mapSrc}
            pins={pins}
            activeId={activeId}
            onSelect={setActiveRegion}
            mode={tab}
          />
        </div>

        <aside className="text-left lg:col-span-3">
          <div className="mb-3 flex items-center gap-2">
            {tab === 'hotels' ? (
              <Hotel className="h-4 w-4 text-brand-orange" />
            ) : (
              <MapPinned className="h-4 w-4 text-brand-orange" />
            )}
            <h3 className="font-headers text-sm font-extrabold text-brand-navy">
              {tab === 'hotels' ? 'Hotéis sugeridos' : 'Explore o mapa'}
            </h3>
          </div>
          <ul className="space-y-2.5">
            {pins.map((pin) => {
              const active = pin.id === activeId;
              if (tab === 'hotels') {
                const showIllustrative = pin.imageIllustrative !== false;
                return (
                  <li key={pin.id}>
                    <button
                      type="button"
                      onClick={() => setActiveRegion(pin.id)}
                      aria-pressed={active}
                      className={`flex w-full min-h-11 items-stretch gap-3 rounded-2xl border p-2 text-left transition-all ${
                        active
                          ? 'border-brand-navy/20 bg-brand-navy/[0.04] shadow-sm'
                          : 'border-border-gray/70 bg-white hover:border-brand-navy/10 hover:bg-bg-light/60'
                      }`}
                    >
                      <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-bg-light">
                        <img src={pin.image} alt="" className="h-full w-full object-cover" />
                        <span className="absolute left-1.5 top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-navy/90 text-white shadow-sm">
                          <Hotel className="h-3 w-3" />
                        </span>
                        {showIllustrative ? (
                          <span className="absolute inset-x-0 bottom-0 bg-black/65 px-1 py-0.5 text-center text-[8px] font-bold uppercase tracking-wide text-white">
                            Imagem ilustrativa
                          </span>
                        ) : null}
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col justify-center py-0.5">
                        <span className="block font-headers text-[13px] font-extrabold leading-snug text-brand-navy [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden">
                          {pin.name}
                        </span>
                        <span className="mt-1 inline-flex w-fit max-w-full items-center truncate rounded-full bg-brand-orange/10 px-2 py-0.5 text-[10px] font-bold text-brand-orange">
                          {pin.neighborhood || pin.blurb}
                        </span>
                        <span className="mt-1.5 line-clamp-2 text-[11px] leading-snug text-text-muted">
                          {pin.note || pin.hotel || pin.blurb}
                        </span>
                        {pin.address ? (
                          <span className="mt-1 line-clamp-1 text-[10px] text-text-muted/80">
                            {pin.address}
                          </span>
                        ) : null}
                      </span>
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 self-center text-text-muted" />
                    </button>
                  </li>
                );
              }

              return (
                <li key={pin.id}>
                  <button
                    type="button"
                    onClick={() => setActiveRegion(pin.id)}
                    aria-pressed={active}
                    className={`flex w-full min-h-11 items-center gap-2.5 rounded-2xl border px-2.5 py-2 text-left transition-all ${
                      active
                        ? 'border-brand-navy/15 bg-brand-navy/[0.04] shadow-sm'
                        : 'border-border-gray/70 bg-white hover:border-brand-navy/10 hover:bg-bg-light/60'
                    }`}
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: pin.color }}
                    />
                    <span className="h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-bg-light">
                      <img src={pin.image} alt="" className="h-full w-full object-cover" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[12px] font-extrabold text-brand-navy">
                        {pin.name}
                      </span>
                      <span className="mt-0.5 block truncate text-[10px] text-text-muted">
                        {pin.blurb}
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-text-muted" />
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    </section>
  );
}

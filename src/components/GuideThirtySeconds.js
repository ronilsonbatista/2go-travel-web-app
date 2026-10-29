"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
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
/** Keep active label bubbles inside the clipped map frame. */
const PIN_EDGE_MIN = 18;
const PIN_EDGE_MAX = 82;
/** Must match `--guide-map-zoom` in globals.css — optical zoom enlarges baked map labels. */
const MAP_LABEL_ZOOM = 1.48;

function parsePercent(value, fallback) {
  const n = parseFloat(String(value ?? '').replace('%', ''));
  return Number.isFinite(n) ? n : fallback;
}

/** Keep pins locked to map features after CSS center-zoom on the PNG. */
function zoomPinPercent(value, fallback) {
  const raw = parsePercent(value, fallback);
  return 50 + (raw - 50) * MAP_LABEL_ZOOM;
}

function clampPinPercent(value) {
  return Math.min(PIN_EDGE_MAX, Math.max(PIN_EDGE_MIN, value));
}

/** Flip/center label so wide bubbles stay inside overflow:hidden map. */
function labelAlign(leftPct, topPct) {
  const x =
    leftPct <= PIN_EDGE_MIN + 4 ? 'start' : leftPct >= PIN_EDGE_MAX - 4 ? 'end' : 'center';
  const y =
    topPct <= PIN_EDGE_MIN + 6 ? 'start' : topPct >= PIN_EDGE_MAX - 6 ? 'end' : 'center';
  return { x, y };
}

/** Nudge overlapping pins apart so labels/markers stay readable. */
function declutterPins(pins) {
  const placed = pins.map((pin, index) => ({
    ...pin,
    _top: zoomPinPercent(pin.pin?.top, 40 + index * 8),
    _left: zoomPinPercent(pin.pin?.left, 40 + index * 8)
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
        a._left = clampPinPercent(a._left - ux * push);
        a._top = clampPinPercent(a._top - uy * push);
        b._left = clampPinPercent(b._left + ux * push);
        b._top = clampPinPercent(b._top + uy * push);
      }
    }
  }

  return placed.map(({ _top, _left, ...pin }) => {
    const top = clampPinPercent(_top);
    const left = clampPinPercent(_left);
    return {
      ...pin,
      pin: { top: `${top.toFixed(1)}%`, left: `${left.toFixed(1)}%` },
      _align: labelAlign(left, top)
    };
  });
}

function CityMapCanvas({ mapSrc, pins, activeId, onSelect, mode, animate = true }) {
  const laidOut = useMemo(() => declutterPins(pins), [pins]);

  return (
    <div className="guide-city-map relative h-full min-h-[300px] w-full overflow-hidden rounded-[20px] border border-slate-200/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:rounded-[22px] sm:min-h-[340px] lg:min-h-[380px]">
      <img
        src={mapSrc}
        alt=""
        className="guide-city-map__img absolute inset-0 h-full w-full object-cover"
      />
      <div
        className={`guide-city-map__wash absolute inset-0 ${animate ? 'guide-enter-fade' : ''}`}
        style={animate ? { animationDelay: '60ms' } : undefined}
      />
      <div className="guide-city-map__grid absolute inset-0" />
      <div
        className={`absolute inset-0 bg-gradient-to-t from-slate-900/15 via-transparent to-slate-900/8 ${animate ? 'guide-enter-fade' : ''}`}
        style={animate ? { animationDelay: '120ms' } : undefined}
      />

      {laidOut.map((pin, index) => {
        const active = pin.id === activeId;
        const subtitle =
          mode === 'hotels'
            ? pin.neighborhood || pin.note || pin.blurb
            : pin.blurb;
        const align = pin._align || { x: 'center', y: 'center' };
        const xClass =
          align.x === 'start' ? 'translate-x-0' : align.x === 'end' ? '-translate-x-full' : '-translate-x-1/2';
        const yClass =
          align.y === 'start' ? 'translate-y-0' : align.y === 'end' ? '-translate-y-full' : '-translate-y-1/2';
        const tipOrigin =
          align.x === 'start'
            ? 'left-0 translate-x-0'
            : align.x === 'end'
              ? 'right-0 translate-x-0'
              : 'left-1/2 -translate-x-1/2';
        return (
          <div
            key={pin.id}
            className={`absolute ${xClass} ${yClass} ${animate ? 'guide-enter' : ''}`}
            style={{
              top: pin.pin?.top || '40%',
              left: pin.pin?.left || '40%',
              zIndex: active ? 30 : 10,
              ...(animate ? { animationDelay: `${180 + index * 70}ms` } : {})
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
                  <span className="mt-0.5 block truncate text-[10px] font-medium text-slate-600">
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
                className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0_6px_16px_rgba(8,27,107,0.2)] ring-2 ring-white transition-transform duration-300 hover:-translate-y-0.5 hover:scale-105"
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
                <span
                  className={`pointer-events-none absolute top-[calc(100%+6px)] z-20 hidden max-w-[140px] truncate rounded-md bg-brand-navy px-2 py-1 text-[10px] font-bold text-white shadow-md group-hover:block group-focus-visible:block ${tipOrigin}`}
                >
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
  const tabListRef = useRef(null);

  useEffect(() => {
    const list = tabListRef.current;
    if (!list) return;
    const activeTab = list.querySelector('[role="tab"][aria-selected="true"]');
    activeTab?.scrollIntoView({ inline: 'nearest', block: 'nearest', behavior: 'smooth' });
  }, [tab]);

  const attractionPins = useMemo(() => {
    const items = (guide?.attractions || []).slice(0, 6);
    if (!items.length) return data.regions;
    const used = new Set(
      (data.regions || []).map((region) => region.image).filter(Boolean)
    );
    if (guide?.heroImage) used.add(guide.heroImage);
    return items.map((att, index) => {
      const region = data.regions[index % Math.max(data.regions.length, 1)];
      const pinOffsets = [
        { top: '32%', left: '28%' },
        { top: '48%', left: '52%' },
        { top: '62%', left: '38%' },
        { top: '40%', left: '68%' },
        { top: '70%', left: '58%' },
        { top: '25%', left: '45%' }
      ];
      return {
        id: `att-${index}`,
        name: att.name,
        blurb: att.duration || att.recommendedTime || '2–3 h',
        color: region?.color || '#5B8DEF',
        image: attractionImage(
          guide,
          att,
          [region?.image, guide.heroImage].filter(Boolean),
          index,
          used
        ),
        pin: pinOffsets[index] || region?.pin || { top: `${28 + index * 10}%`, left: `${26 + index * 12}%` },
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
      className="scroll-mt-28 overflow-hidden rounded-[22px] border border-border-gray/70 bg-white p-4 pb-24 shadow-md sm:rounded-[26px] sm:p-5 sm:pb-24 lg:p-6 lg:pb-6"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="font-headers text-left text-base font-bold tracking-tight text-brand-navy sm:text-lg">
          {guide.city} em 30 segundos
        </h2>
        <div className="relative min-w-0 max-w-full sm:overflow-visible">
          <div
            ref={tabListRef}
            role="tablist"
            aria-label={`Explorar ${guide.city}`}
            className="-mx-1 flex max-w-full gap-2 overflow-x-auto scroll-pl-1 scroll-pr-8 px-1 pb-1 pr-8 custom-scrollbar-hide sm:flex-wrap sm:overflow-visible sm:pr-1 sm:scroll-pr-1"
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
                    : 'bg-bg-light text-slate-600 hover:text-brand-navy'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white from-35% via-white/85 to-transparent sm:hidden"
            aria-hidden
          />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:mt-6 lg:grid-cols-12 lg:gap-5">
        <div className="grid grid-cols-2 items-stretch gap-2.5 sm:gap-3 lg:col-span-3">
          {data.facts.map((fact, index) => {
            const Icon = FACT_ICONS[fact.tone] || MapPinned;
            return (
              <div
                key={fact.label}
                className="guide-enter flex min-h-[110px] flex-col rounded-[18px] border border-border-gray/70 bg-[#FAFBFC] p-3 text-left transition-transform duration-300 hover:-translate-y-0.5 sm:min-h-[118px] sm:rounded-[20px] sm:p-3.5"
                style={{ animationDelay: `${60 + index * 55}ms` }}
              >
                <span
                  className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${FACT_TONE[fact.tone]}`}
                >
                  <Icon className="h-5 w-5" strokeWidth={2.25} />
                </span>
                <p className="font-headers text-sm font-extrabold leading-tight text-brand-navy sm:text-[15px]">
                  {fact.value}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-slate-600">{fact.label}</p>
              </div>
            );
          })}
        </div>

        <div className="min-w-0 lg:col-span-6">
          <CityMapCanvas
            mapSrc={mapSrc}
            pins={pins}
            activeId={activeId}
            onSelect={setActiveRegion}
            mode={tab}
          />
        </div>

        <aside className="min-w-0 text-left lg:col-span-3">
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
          <ul className="space-y-2.5 pb-6 lg:pb-0">
            {pins.map((pin, index) => {
              const active = pin.id === activeId;
              if (tab === 'hotels') {
                const showIllustrative = pin.imageIllustrative !== false;
                return (
                  <li key={pin.id} className="guide-enter" style={{ animationDelay: `${220 + index * 55}ms` }}>
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
                        <span className="mt-1.5 line-clamp-2 text-[11px] leading-snug text-slate-600">
                          {pin.note || pin.hotel || pin.blurb}
                        </span>
                        {pin.address ? (
                          <span className="mt-1 line-clamp-2 text-[10px] leading-snug text-slate-600">
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
                <li key={pin.id} className="guide-enter" style={{ animationDelay: `${220 + index * 55}ms` }}>
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
                      <span className="block text-[12px] font-extrabold leading-snug text-brand-navy [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden">
                        {pin.name}
                      </span>
                      <span className="mt-0.5 block text-[10px] leading-snug text-text-muted [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden">
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

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

function CityMapCanvas({ mapSrc, pins, activeId, onSelect, mode }) {
  return (
    <div className="relative h-full min-h-[300px] w-full overflow-hidden rounded-[22px] border border-border-gray/60 bg-[#dfe7f0]">
      <img
        src={mapSrc}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(11,18,32,0.18)_100%)]" />

      {pins.map((pin) => {
        const active = pin.id === activeId;
        return (
          <div
            key={pin.id}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{
              top: pin.pin?.top || '40%',
              left: pin.pin?.left || '40%'
            }}
          >
            <button
              type="button"
              onClick={() => onSelect(pin.id)}
              className={`group flex max-w-[200px] items-center gap-2 rounded-xl bg-white/95 p-1.5 pr-2.5 text-left shadow-md backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 ${
                active ? 'ring-2 ring-brand-orange/70' : 'ring-1 ring-black/5'
              }`}
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
                <span className="block truncate text-[11px] font-extrabold leading-tight text-brand-navy">
                  {pin.name}
                </span>
                <span className="mt-0.5 block truncate text-[10px] text-text-muted">
                  {mode === 'hotels' ? pin.hotel || pin.blurb : pin.blurb}
                </span>
              </span>
            </button>
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

  const pins = tab === 'attractions' ? attractionPins : data.regions;
  const activeId =
    pins.some((pin) => pin.id === activeRegion) ? activeRegion : pins[0]?.id || null;

  if (!guide || !data.facts.length) return null;

  return (
    <section
      id="em-30-segundos"
      className="overflow-hidden rounded-[28px] border border-border-gray/80 bg-white p-5 shadow-md sm:p-7 scroll-mt-28"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="font-headers text-left text-2xl font-extrabold tracking-tight text-brand-navy sm:text-3xl">
          {guide.city} em 30 segundos
        </h2>
        <div className="flex flex-wrap gap-2">
          {TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`rounded-full px-3.5 py-1.5 text-[11px] font-extrabold transition-all sm:text-xs ${
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
            <MapPinned className="h-4 w-4 text-brand-orange" />
            <h3 className="font-headers text-sm font-extrabold text-brand-navy">
              {tab === 'hotels' ? 'Explore hospedagem' : 'Explore o mapa'}
            </h3>
          </div>
          <ul className="space-y-2">
            {pins.map((pin) => {
              const active = pin.id === activeId;
              return (
                <li key={pin.id}>
                  <button
                    type="button"
                    onClick={() => setActiveRegion(pin.id)}
                    className={`flex w-full items-center gap-2.5 rounded-2xl border px-2.5 py-2 text-left transition-all ${
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
                        {tab === 'hotels' ? pin.hotel || pin.blurb : pin.blurb}
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

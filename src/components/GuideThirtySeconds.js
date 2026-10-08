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

function CityMapCanvas({ regions, activeId, onSelect }) {
  return (
    <div className="relative h-full min-h-[280px] w-full overflow-hidden rounded-[22px] bg-[#E8EEF6]">
      {/* Soft abstract city map — color blobs + streets */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 640 420"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="mapWash" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F4F7FB" />
            <stop offset="100%" stopColor="#E2EAF4" />
          </linearGradient>
          <filter id="softBlob" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>
        <rect width="640" height="420" fill="url(#mapWash)" />

        {/* River / boulevard */}
        <path
          d="M-20 260 C120 210, 220 300, 340 250 S520 160, 680 210"
          fill="none"
          stroke="#C5D6EA"
          strokeWidth="28"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M40 -10 C180 80, 240 140, 300 220 S420 340, 520 440"
          fill="none"
          stroke="#D5E0ED"
          strokeWidth="10"
          opacity="0.7"
        />
        <path
          d="M120 40 H560 M80 140 H600 M60 220 H580 M100 300 H540 M140 360 H500"
          fill="none"
          stroke="#D7E2EF"
          strokeWidth="3"
          opacity="0.8"
        />

        {/* Region color washes */}
        {regions[0] && (
          <ellipse cx="170" cy="250" rx="110" ry="90" fill={regions[0].color} opacity="0.22" filter="url(#softBlob)" />
        )}
        {regions[1] && (
          <ellipse cx="330" cy="200" rx="100" ry="85" fill={regions[1].color} opacity="0.2" filter="url(#softBlob)" />
        )}
        {regions[2] && (
          <ellipse cx="430" cy="170" rx="95" ry="80" fill={regions[2].color} opacity="0.2" filter="url(#softBlob)" />
        )}
        {regions[3] && (
          <ellipse cx="360" cy="95" rx="90" ry="70" fill={regions[3].color} opacity="0.2" filter="url(#softBlob)" />
        )}

        {/* Block grid suggestion */}
        {[160, 240, 320, 400, 480].map((x) =>
          [80, 150, 220, 290].map((y) => (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width="28"
              height="18"
              rx="3"
              fill="#FFFFFF"
              opacity="0.35"
            />
          ))
        )}
      </svg>

      {/* Callout pins */}
      {regions.map((region) => {
        const active = region.id === activeId;
        return (
          <button
            key={region.id}
            type="button"
            onClick={() => onSelect(region.id)}
            className={`absolute z-10 flex max-w-[180px] items-center gap-2 rounded-xl bg-white/95 p-1.5 pr-2.5 text-left shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 ${
              active ? 'scale-[1.03] ring-2 ring-brand-navy/20' : 'opacity-95'
            }`}
            style={{
              top: region.pin?.top || '40%',
              left: region.pin?.left || '40%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <span
              className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-bg-light"
              style={{ boxShadow: `inset 0 0 0 2px ${region.color}33` }}
            >
              <img src={region.image} alt="" className="h-full w-full object-cover" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[11px] font-extrabold leading-tight text-brand-navy">
                {region.name}
              </span>
              <span className="mt-0.5 block truncate text-[10px] text-text-muted">{region.blurb}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function AttractionsPanel({ guide, regions }) {
  const items = (guide.attractions || []).slice(0, 4);
  const list = items.length
    ? items.map((att, index) => ({
        title: att.name,
        meta: att.duration || att.recommendedTime || '2–3 h',
        image: regions[index % regions.length]?.image || guide.heroImage
      }))
    : regions.map((region) => ({
        title: region.name,
        meta: region.blurb,
        image: region.image
      }));

  return (
    <div className="grid h-full min-h-[280px] grid-cols-1 gap-3 sm:grid-cols-2">
      {list.map((item) => (
        <article
          key={item.title}
          className="relative overflow-hidden rounded-[18px] border border-border-gray/70 bg-white shadow-sm"
        >
          <img src={item.image} alt="" className="h-28 w-full object-cover sm:h-full sm:min-h-[120px]" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent p-3 text-left text-white">
            <h4 className="text-xs font-extrabold leading-tight">{item.title}</h4>
            <p className="mt-0.5 text-[10px] text-white/80">{item.meta}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function HotelsPanel({ regions }) {
  return (
    <div className="flex h-full min-h-[280px] flex-col gap-3">
      {regions.map((region) => (
        <div
          key={region.id}
          className="flex items-center gap-3 rounded-[18px] border border-border-gray/70 bg-white p-3 text-left shadow-sm"
        >
          <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
            <img src={region.image} alt="" className="h-full w-full object-cover" />
            <span
              className="absolute left-1.5 top-1.5 h-2.5 w-2.5 rounded-full border border-white"
              style={{ backgroundColor: region.color }}
            />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-extrabold text-brand-navy">{region.name}</p>
            <p className="mt-0.5 flex items-start gap-1.5 text-[11px] leading-snug text-text-muted">
              <Hotel className="mt-0.5 h-3 w-3 shrink-0 text-brand-orange" />
              <span>{region.hotel}</span>
            </p>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-text-muted" />
        </div>
      ))}
    </div>
  );
}

export default function GuideThirtySeconds({ guide }) {
  const data = useMemo(() => getThirtySeconds(guide), [guide]);
  const [tab, setTab] = useState('map');
  const [activeRegion, setActiveRegion] = useState(data.regions[0]?.id || null);

  if (!guide || !data.facts.length) return null;

  return (
    <section
      id="introducao"
      className="overflow-hidden rounded-[28px] border border-border-gray/80 bg-white p-5 shadow-md sm:p-7"
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
        {/* Left facts 2x2 */}
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

        {/* Center map / panels */}
        <div className="lg:col-span-6">
          {tab === 'map' && (
            <CityMapCanvas
              regions={data.regions}
              activeId={activeRegion}
              onSelect={setActiveRegion}
            />
          )}
          {tab === 'attractions' && <AttractionsPanel guide={guide} regions={data.regions} />}
          {tab === 'hotels' && <HotelsPanel regions={data.regions} />}
        </div>

        {/* Right explore list */}
        <aside className="text-left lg:col-span-3">
          <div className="mb-3 flex items-center gap-2">
            <MapPinned className="h-4 w-4 text-brand-orange" />
            <h3 className="font-headers text-sm font-extrabold text-brand-navy">Explore o mapa</h3>
          </div>
          <ul className="space-y-2">
            {data.regions.map((region) => {
              const active = region.id === activeRegion;
              return (
                <li key={region.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveRegion(region.id);
                      setTab('map');
                    }}
                    className={`flex w-full items-center gap-2.5 rounded-2xl border px-2.5 py-2 text-left transition-all ${
                      active
                        ? 'border-brand-navy/15 bg-brand-navy/[0.04] shadow-sm'
                        : 'border-border-gray/70 bg-white hover:border-brand-navy/10 hover:bg-bg-light/60'
                    }`}
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: region.color }}
                    />
                    <span className="h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-bg-light">
                      <img src={region.image} alt="" className="h-full w-full object-cover" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[12px] font-extrabold text-brand-navy">
                        {region.name}
                      </span>
                      <span className="mt-0.5 block truncate text-[10px] text-text-muted">
                        {region.blurb}
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

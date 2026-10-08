"use client";

import React from 'react';

const VARIANTS = {
  noronha: {
    label: 'Meu Roteiro',
    title: 'Noronha Completo',
    days: ['Dia 1', 'Dia 2', 'Dia 3'],
    activeDay: 0,
    events: [
      {
        time: '09:00',
        title: 'Passeio de Barco',
        meta: 'Confirmado',
        metaTone: 'green',
        dot: 'orange'
      },
      {
        time: '13:00',
        title: 'Almoço no Pico',
        meta: 'Frutos do mar locais',
        metaTone: 'muted',
        dot: 'green'
      },
      {
        time: '16:30',
        title: 'Pôr do Sol no Boldró',
        meta: 'Imperdível',
        metaTone: 'orange',
        dot: 'navy'
      }
    ]
  },
  roma: {
    label: 'Meu Roteiro',
    title: 'Roma Clássica',
    days: ['Dia 1', 'Dia 2', 'Dia 3'],
    activeDay: 0,
    heroImage: '/images/destinations/roma/roma-coliseu.jpg',
    events: [
      {
        time: '08:30',
        title: 'Coliseu & Fórum',
        meta: 'Ingresso reservado',
        metaTone: 'green',
        dot: 'orange'
      },
      {
        time: '13:00',
        title: 'Trastevere',
        meta: 'Almoço local',
        metaTone: 'muted',
        dot: 'green'
      },
      {
        time: '17:00',
        title: 'Fontana di Trevi',
        meta: 'Imperdível',
        metaTone: 'orange',
        dot: 'navy'
      }
    ]
  },
  paris: {
    label: 'Meu Roteiro',
    title: 'Paris em 5 dias',
    days: ['Dia 1', 'Dia 2', 'Dia 3'],
    activeDay: 0,
    heroImage: '/images/destinations/paris/paris-eiffel-seine.jpg',
    events: [
      {
        time: '09:00',
        title: 'Torre Eiffel',
        meta: 'Confirmado',
        metaTone: 'green',
        dot: 'orange'
      },
      {
        time: '14:00',
        title: 'Louvre',
        meta: 'Entrada marcada',
        metaTone: 'muted',
        dot: 'green'
      },
      {
        time: '18:30',
        title: 'Passeio no Sena',
        meta: 'Imperdível',
        metaTone: 'orange',
        dot: 'navy'
      }
    ]
  }
};

const DOT = {
  orange: 'bg-brand-orange',
  green: 'bg-brand-green',
  navy: 'bg-brand-navy'
};

const META = {
  green: 'bg-brand-green/10 text-brand-green',
  orange: 'bg-brand-orange/10 text-brand-orange',
  muted: 'text-text-muted'
};

const SIZE_CLASS = {
  sm: 'w-full max-w-[180px]',
  md: 'w-full max-w-[240px] sm:max-w-[280px]',
  lg: 'w-full max-w-[250px] sm:max-w-[300px] lg:max-w-[320px]'
};

/**
 * Realistic iPhone chassis — shared by AppPhoneMockup and image-based frames.
 */
export function PhoneFrame({
  children,
  size = 'md',
  className = '',
  glow = true,
  glowClassName = 'bg-brand-orange/20'
}) {
  return (
    <div className={`relative mx-auto select-none ${SIZE_CLASS[size] || SIZE_CLASS.md} ${className}`}>
      {glow && (
        <div
          aria-hidden
          className={`pointer-events-none absolute -bottom-7 left-1/2 h-14 w-[70%] -translate-x-1/2 rounded-full blur-2xl ${glowClassName}`}
        />
      )}

      {/* Soft contact / depth shadow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[8%] -bottom-3 h-6 rounded-[50%] bg-black/25 blur-xl"
      />

      {/* Side buttons — titanium, flush to chassis */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-[2px] top-[16.5%] z-20 h-[18px] w-[2.5px] rounded-l-full bg-gradient-to-b from-[#6b7078] via-[#3a3e46] to-[#1c1f24] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-[2px] top-[23%] z-20 h-[34px] w-[2.5px] rounded-l-full bg-gradient-to-b from-[#6b7078] via-[#3a3e46] to-[#1c1f24] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-[2px] top-[33%] z-20 h-[34px] w-[2.5px] rounded-l-full bg-gradient-to-b from-[#6b7078] via-[#3a3e46] to-[#1c1f24] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[2px] top-[27%] z-20 h-[52px] w-[2.5px] rounded-r-full bg-gradient-to-b from-[#7a808a] via-[#3a3e46] to-[#1c1f24] shadow-[inset_0_1px_0_rgba(255,255,255,0.22)]"
      />

      {/* Outer titanium rim */}
      <div
        className="relative rounded-[2.65rem] p-[1px] transition-transform duration-500 ease-out hover:-translate-y-1"
        style={{
          background:
            'linear-gradient(145deg, #9aa0a8 0%, #3d424a 18%, #1a1d22 45%, #5c636e 72%, #1a1d22 100%)',
          boxShadow:
            '0 32px 56px -12px rgba(0,0,0,0.38), 0 14px 24px -10px rgba(8,27,107,0.18), inset 0 1px 0 rgba(255,255,255,0.28)'
        }}
      >
        {/* Matte black chassis */}
        <div
          className="relative rounded-[2.58rem] p-[7px] sm:p-[8px]"
          style={{
            background: 'linear-gradient(180deg, #1c1f24 0%, #0a0b0d 55%, #121418 100%)',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)'
          }}
        >
          {/* Screen glass */}
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[2.1rem] bg-black">
            {/* Glass edge ring */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-30 rounded-[2.1rem]"
              style={{
                boxShadow:
                  'inset 0 0 0 1px rgba(255,255,255,0.12), inset 0 0 0 2px rgba(0,0,0,0.35)'
              }}
            />
            {/* Specular glaze (subtle) */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[38%] bg-gradient-to-r from-white/[0.07] to-transparent"
            />

            {/* Dynamic Island */}
            <div className="pointer-events-none absolute left-1/2 top-[11px] z-40 flex h-[22px] w-[92px] -translate-x-1/2 items-center justify-center rounded-full bg-black shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_2px_6px_rgba(0,0,0,0.45)] sm:h-[24px] sm:w-[98px]">
              <span
                aria-hidden
                className="absolute right-[14px] h-[7px] w-[7px] rounded-full bg-[#0f1520] shadow-[inset_0_0_0_1px_rgba(80,120,180,0.35)]"
              />
              <span
                aria-hidden
                className="absolute right-[16px] h-[2.5px] w-[2.5px] rounded-full bg-[#1e3a5f]/80"
              />
            </div>

            {/* Screen content */}
            <div className="absolute inset-0 overflow-hidden rounded-[2.1rem] bg-white text-brand-navy">
              {children}
            </div>

            {/* Home indicator */}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-[6px] left-1/2 z-40 h-[4px] w-[34%] -translate-x-1/2 rounded-full bg-black/35"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function AppScreen({ data }) {
  return (
    <>
      {data.heroImage ? (
        <div className="relative h-[28%] overflow-hidden">
          <img src={data.heroImage} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="absolute bottom-2 left-3 right-3 text-left">
            <span className="text-[8px] font-extrabold uppercase tracking-wider text-white/80">
              {data.label}
            </span>
            <p className="font-headers text-[13px] font-extrabold leading-tight text-white">
              {data.title}
            </p>
          </div>
        </div>
      ) : (
        <div className="px-3.5 pt-10 text-left">
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-brand-orange">
            {data.label}
          </span>
          <h4 className="font-headers mt-0.5 text-[15px] font-extrabold leading-tight text-brand-navy">
            {data.title}
          </h4>
        </div>
      )}

      <div
        className={`flex gap-1 overflow-x-auto px-3 pb-1 text-[10px] font-bold ${
          data.heroImage ? 'mt-2.5' : 'mt-3'
        }`}
      >
        {data.days.map((day, index) => (
          <span
            key={day}
            className={`shrink-0 rounded-full px-2.5 py-1 ${
              index === data.activeDay
                ? 'bg-brand-navy text-white'
                : 'bg-bg-light text-text-muted'
            }`}
          >
            {day}
          </span>
        ))}
      </div>

      <div className="relative ml-4 mr-3 mt-3 flex flex-col gap-3 border-l-2 border-border-gray pl-4 text-left">
        {data.events.map((event) => (
          <div key={`${event.time}-${event.title}`} className="relative">
            <div
              className={`absolute top-1 left-[-23px] h-3 w-3 rounded-full border border-white shadow-xs ${DOT[event.dot]}`}
            />
            <span className="block font-mono text-[9px] font-extrabold text-brand-orange">
              {event.time}
            </span>
            <h5 className="mt-0.5 text-[12px] font-extrabold leading-tight text-brand-navy">
              {event.title}
            </h5>
            {event.metaTone === 'muted' ? (
              <p className="mt-0.5 text-[9px] leading-none text-text-muted">{event.meta}</p>
            ) : (
              <span
                className={`mt-0.5 inline-block rounded-md px-1.5 py-0.5 text-[8px] font-bold ${META[event.metaTone]}`}
              >
                {event.meta}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-around border-t border-border-gray/50 bg-white/95 px-2 pb-3.5 pt-2 text-[9px] font-extrabold text-brand-navy/55 backdrop-blur-sm">
        <span className="flex flex-col items-center gap-0.5 text-brand-orange">
          <span aria-hidden>📍</span>
          Roteiro
        </span>
        <span className="flex flex-col items-center gap-0.5">
          <span aria-hidden>💬</span>
          Especialista
        </span>
        <span className="flex flex-col items-center gap-0.5">
          <span aria-hidden>🗺️</span>
          Mapa
        </span>
      </div>
    </>
  );
}

export default function AppPhoneMockup({
  variant = 'noronha',
  size = 'md',
  className = '',
  glow = true
}) {
  const data = VARIANTS[variant] || VARIANTS.noronha;

  return (
    <PhoneFrame size={size} className={className} glow={glow}>
      <AppScreen data={data} />
    </PhoneFrame>
  );
}

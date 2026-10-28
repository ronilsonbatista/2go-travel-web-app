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
  },
  'nova-york': {
    label: 'Meu Roteiro',
    title: 'NYC em 6 dias',
    days: ['Dia 1', 'Dia 2', 'Dia 3'],
    activeDay: 0,
    heroImage: '/images/destinations/nova-york/nova-york-empire-state.jpg',
    events: [
      {
        time: '09:00',
        title: 'Times Square',
        meta: 'Confirmado',
        metaTone: 'green',
        dot: 'orange'
      },
      {
        time: '14:00',
        title: 'Central Park',
        meta: 'Passeio livre',
        metaTone: 'muted',
        dot: 'green'
      },
      {
        time: '19:30',
        title: 'Broadway',
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
  sm: 'w-full max-w-[152px]',
  md: 'w-full max-w-[190px] sm:max-w-[220px]',
  lg: 'w-full max-w-[210px] sm:max-w-[250px] lg:max-w-[270px]'
};

/**
 * Realistic iPhone chassis — shared by AppPhoneMockup and image-based frames.
 * Rounder corners, tighter scale, Dynamic Island + status-bar chrome.
 */
export function PhoneFrame({
  children,
  size = 'md',
  className = '',
  glow = true,
  glowClassName = 'bg-brand-orange/20',
  showStatusBar = false
}) {
  return (
    <div className={`relative mx-auto select-none ${SIZE_CLASS[size] || SIZE_CLASS.md} ${className}`}>
      {glow && (
        <div
          aria-hidden
          className={`pointer-events-none absolute -bottom-6 left-1/2 h-12 w-[65%] -translate-x-1/2 rounded-full blur-2xl ${glowClassName}`}
        />
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[12%] -bottom-2 h-4 rounded-[50%] bg-black/18 blur-lg"
      />

      {/* Side buttons */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-[2px] top-[15.5%] z-20 h-[16px] w-[2.5px] rounded-l-full bg-gradient-to-b from-[#7a8088] via-[#3a3e46] to-[#1c1f24] shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-[2px] top-[22%] z-20 h-[30px] w-[2.5px] rounded-l-full bg-gradient-to-b from-[#7a8088] via-[#3a3e46] to-[#1c1f24] shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-[2px] top-[31.5%] z-20 h-[30px] w-[2.5px] rounded-l-full bg-gradient-to-b from-[#7a8088] via-[#3a3e46] to-[#1c1f24] shadow-[inset_0_1px_0_rgba(255,255,255,0.28)]"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[2px] top-[26%] z-20 h-[48px] w-[2.5px] rounded-r-full bg-gradient-to-b from-[#8a9098] via-[#3a3e46] to-[#1c1f24] shadow-[inset_0_1px_0_rgba(255,255,255,0.24)]"
      />

      {/* Outer titanium rim — rounder, more natural iPhone silhouette */}
      <div
        className="relative rounded-[2.9rem] p-[1px] transition-transform duration-500 ease-out hover:-translate-y-1"
        style={{
          background:
            'linear-gradient(145deg, #a8aeb6 0%, #4a5058 18%, #1a1d22 45%, #6a717c 72%, #1a1d22 100%)',
          boxShadow:
            '0 22px 40px -12px rgba(0,0,0,0.38), 0 10px 18px -8px rgba(8,27,107,0.14), inset 0 1px 0 rgba(255,255,255,0.32)'
        }}
      >
        <div
          className="relative rounded-[2.82rem] p-[5px] sm:p-[6px]"
          style={{
            background: 'linear-gradient(180deg, #1c1f24 0%, #0a0b0d 55%, #121418 100%)',
            boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.07)'
          }}
        >
          {/* Screen — single clipped surface, opaque fill */}
          <div
            className="relative aspect-[9/19.5] overflow-hidden rounded-[2.35rem] bg-white isolate"
            style={{
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)'
            }}
          >
            {/* Dynamic Island */}
            <div className="pointer-events-none absolute left-1/2 top-[9px] z-40 flex h-[21px] w-[82px] -translate-x-1/2 items-center justify-center rounded-full bg-black sm:h-[23px] sm:w-[90px]">
              <span
                aria-hidden
                className="absolute right-[12px] h-[6.5px] w-[6.5px] rounded-full bg-[#0f1520] shadow-[inset_0_0_0_1px_rgba(80,120,180,0.35)]"
              />
              <span
                aria-hidden
                className="absolute right-[14px] h-[2.5px] w-[2.5px] rounded-full bg-[#1e3a5f]/80"
              />
            </div>

            {showStatusBar && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 z-30 flex h-[34px] items-center justify-between px-[18px] pt-[2px] text-[10px] font-semibold tracking-tight text-brand-navy/90"
              >
                <span className="min-w-[34px]">9:41</span>
                <span className="flex items-center gap-[3px]">
                  <svg viewBox="0 0 17 12" className="h-[9px] w-[13px] fill-current" aria-hidden>
                    <rect x="0" y="7" width="3" height="5" rx="0.6" />
                    <rect x="4.5" y="5" width="3" height="7" rx="0.6" />
                    <rect x="9" y="2.5" width="3" height="9.5" rx="0.6" />
                    <rect x="13.5" y="0" width="3" height="12" rx="0.6" opacity="0.35" />
                  </svg>
                  <svg viewBox="0 0 25 12" className="h-[9px] w-[20px] fill-current" aria-hidden>
                    <rect x="0" y="1" width="21" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.2" />
                    <rect x="1.6" y="2.6" width="14" height="6.8" rx="1.2" />
                    <rect x="22" y="3.5" width="2.2" height="5" rx="0.6" opacity="0.45" />
                  </svg>
                </span>
              </div>
            )}

            {/* Screen content — clipped hard to screen radius */}
            <div className="absolute inset-0 overflow-hidden rounded-[2.35rem] bg-white text-brand-navy [transform:translateZ(0)]">
              {children}
            </div>

            {/* Thin edge ring */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-30 rounded-[2.35rem]"
              style={{
                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.26)'
              }}
            />

            {/* Home indicator */}
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-[6px] left-1/2 z-40 h-[3.5px] w-[30%] -translate-x-1/2 rounded-full bg-[#1E293B]/5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function NavIcon({ children, active = false }) {
  return (
    <span className={`flex flex-col items-center gap-0.5 ${active ? 'text-brand-orange' : 'text-brand-navy/45'}`}>
      <span aria-hidden className="flex h-4 w-4 items-center justify-center">
        {children}
      </span>
    </span>
  );
}

function AppScreen({ data }) {
  return (
    <div className="absolute inset-0 flex flex-col bg-white">
      {data.heroImage ? (
        <div className="relative h-[27%] shrink-0 overflow-hidden bg-brand-navy">
          <img
            src={data.heroImage}
            alt=""
            className="h-full w-full object-cover object-center"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
          <div className="absolute bottom-2.5 left-3 right-3 text-left">
            <span className="text-[8px] font-extrabold uppercase tracking-[0.14em] text-white/85">
              {data.label}
            </span>
            <p className="font-headers text-[13px] font-extrabold leading-tight text-white">
              {data.title}
            </p>
          </div>
        </div>
      ) : (
        <div className="shrink-0 px-3.5 pb-1 pt-10 text-left">
          <span className="text-[9px] font-extrabold uppercase tracking-wider text-brand-orange">
            {data.label}
          </span>
          <h4 className="font-headers mt-0.5 text-[15px] font-extrabold leading-tight text-brand-navy">
            {data.title}
          </h4>
        </div>
      )}

      <div
        className={`flex shrink-0 gap-1 overflow-x-auto px-3 pb-1 text-[10px] font-bold ${
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

      <div className="relative ml-4 mr-3 mt-3 min-h-0 flex-1 overflow-hidden">
        <div className="flex flex-col gap-3.5 border-l-2 border-border-gray pl-4 text-left">
          {data.events.map((event) => (
            <div key={`${event.time}-${event.title}`} className="relative">
              <div
                className={`absolute top-1 left-[-23px] h-3 w-3 rounded-full border-2 border-white shadow-sm ${DOT[event.dot]}`}
              />
              <span className="block font-mono text-[9px] font-extrabold tracking-tight text-brand-orange">
                {event.time}
              </span>
              <h5 className="mt-0.5 text-[12px] font-extrabold leading-tight text-brand-navy">
                {event.title}
              </h5>
              {event.metaTone === 'muted' ? (
                <p className="mt-0.5 text-[9px] leading-none text-text-muted">{event.meta}</p>
              ) : (
                <span
                  className={`mt-1 inline-block rounded-md px-1.5 py-0.5 text-[8px] font-bold ${META[event.metaTone]}`}
                >
                  {event.meta}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Opaque bottom nav — no blur/transparency that reads as gray artifacts */}
      <div className="relative z-10 shrink-0 border-t border-border-gray bg-white px-2 pb-[18px] pt-2">
        <div className="flex items-end justify-around text-[9px] font-extrabold">
          <span className="flex flex-col items-center gap-0.5 text-brand-orange">
            <NavIcon active>
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current" aria-hidden>
                <path d="M8 1.6 2.2 6.3V14h4.1v-3.4h3.4V14h4.1V6.3L8 1.6Z" />
              </svg>
            </NavIcon>
            Roteiro
          </span>
          <span className="flex flex-col items-center gap-0.5 text-brand-navy/45">
            <NavIcon>
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current" aria-hidden>
                <path d="M2.2 3.2h11.6v7.4H9.1L8 12.8l-1.1-2.2H2.2V3.2Z" />
              </svg>
            </NavIcon>
            Especialista
          </span>
          <span className="flex flex-col items-center gap-0.5 text-brand-navy/45">
            <NavIcon>
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 fill-current" aria-hidden>
                <path d="M8 1.8c-2.7 0-4.9 2-4.9 4.5 0 3.3 4.2 7.5 4.9 7.5s4.9-4.2 4.9-7.5C12.9 3.8 10.7 1.8 8 1.8Zm0 6.1A1.6 1.6 0 1 1 8 4.7a1.6 1.6 0 0 1 0 3.2Z" />
              </svg>
            </NavIcon>
            Mapa
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Image screen inside PhoneFrame — crops tall screenshots cleanly, opaque fill.
 */
export function PhoneScreenImage({ src, alt = '' }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0b1220]">
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover object-top"
        draggable={false}
      />
    </div>
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
    <PhoneFrame size={size} className={className} glow={glow} showStatusBar>
      <AppScreen data={data} />
    </PhoneFrame>
  );
}

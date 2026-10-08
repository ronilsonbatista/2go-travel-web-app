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

export default function AppPhoneMockup({
  variant = 'noronha',
  size = 'md',
  className = '',
  glow = true
}) {
  const data = VARIANTS[variant] || VARIANTS.noronha;
  const sizes = {
    sm: 'w-[200px]',
    md: 'w-[260px] sm:w-[280px]',
    lg: 'w-[280px] sm:w-[320px]'
  };

  return (
    <div className={`relative mx-auto ${sizes[size] || sizes.md} ${className}`}>
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-6 left-1/2 h-12 w-[78%] -translate-x-1/2 rounded-full bg-brand-orange/25 blur-2xl"
        />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[3px] top-[18%] h-7 w-[3px] rounded-l-sm bg-gradient-to-b from-[#c5cad3] to-[#5c6370]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[3px] top-[27%] h-11 w-[3px] rounded-l-sm bg-gradient-to-b from-[#c5cad3] to-[#5c6370]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[3px] top-[26%] h-16 w-[3px] rounded-r-sm bg-gradient-to-b from-[#e8ebf0] to-[#6a7180]"
      />

      <div className="relative rounded-[2.55rem] bg-gradient-to-br from-[#d7dbe3] via-[#8b909b] to-[#2a2e36] p-[1.5px] shadow-[0_28px_50px_rgba(8,27,107,0.22),0_10px_18px_rgba(0,0,0,0.16)] transition-transform duration-500 ease-out hover:-translate-y-1">
        <div className="rounded-[2.45rem] bg-gradient-to-b from-[#2a2f3a] to-[#0e1116] p-[10px]">
          <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.85rem] bg-white text-brand-navy shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16)]">
            <div className="pointer-events-none absolute left-1/2 top-2.5 z-20 h-[22px] w-[88px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]" />

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
              <div className="px-3.5 pt-9 text-left">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-brand-orange">
                  {data.label}
                </span>
                <h4 className="font-headers mt-0.5 text-[15px] font-extrabold leading-tight text-brand-navy">
                  {data.title}
                </h4>
              </div>
            )}

            <div className={`flex gap-1 overflow-x-auto px-3 pb-1 text-[10px] font-bold ${data.heroImage ? 'mt-2.5' : 'mt-3'}`}>
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

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-around border-t border-border-gray/50 bg-white/95 px-2 py-2 text-[9px] font-extrabold text-brand-navy/55 backdrop-blur-sm">
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
          </div>
        </div>
      </div>
    </div>
  );
}

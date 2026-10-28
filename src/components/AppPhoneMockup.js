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
  sm: 'w-full max-w-[168px]',
  md: 'w-full max-w-[200px] sm:max-w-[228px]',
  lg: 'w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[280px]'
};

/**
 * Rem radii tuned for ~168–228px phones (≈ iPhone continuous curve).
 * Avoid % / cqi here: % stretches on 9:19.5, and cqi inside clip-path is flaky.
 */
const PHONE_RADIUS = {
  // Continuous iPhone curve: screen ≈ device − bezel pad
  device: '2.85rem',
  bezel: '2.72rem',
  screen: '2.5rem'
};

function screenMaskStyle(radius = PHONE_RADIUS.screen) {
  return {
    borderRadius: radius,
    overflow: 'hidden',
    // Compositor layer + clip-path: reliable clip for <img> inside rounded glass.
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden',
    clipPath: `inset(0 round ${radius})`,
    WebkitClipPath: `inset(0 round ${radius})`
  };
}

/**
 * Realistic iPhone chassis — shared by AppPhoneMockup and image-based frames.
 * Hard-clips screen content so square screenshots never peek past the bezel.
 */
export function PhoneFrame({
  children,
  size = 'md',
  className = '',
  glow = true,
  glowClassName = 'bg-brand-orange/20',
  showStatusBar = false,
  showIsland = true
}) {
  return (
    <div
      className={`relative mx-auto select-none ${SIZE_CLASS[size] || SIZE_CLASS.md} ${className}`}
      style={{ ['--phone-screen-radius']: PHONE_RADIUS.screen }}
    >
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

      {/* Hover shell — outside the clipped screen so transforms never break overflow. */}
      <div className="relative transition-transform duration-500 ease-out hover:-translate-y-1">
        <div
          className="relative p-px"
          style={{
            borderRadius: PHONE_RADIUS.device,
            background:
              'linear-gradient(145deg, #c0c5cc 0%, #4a5058 18%, #1a1d22 45%, #6a717c 72%, #1a1d22 100%)',
            boxShadow:
              '0 22px 40px -12px rgba(0,0,0,0.38), 0 10px 18px -8px rgba(8,27,107,0.14), inset 0 1px 0 rgba(255,255,255,0.35)'
          }}
        >
          <div
            className="relative p-[3.5px] sm:p-[4.5px]"
            style={{
              borderRadius: PHONE_RADIUS.bezel,
              background: 'linear-gradient(180deg, #1c1f24 0%, #0a0b0d 55%, #121418 100%)',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.07)'
            }}
          >
            {/* Screen glass — the only clip surface for app content */}
            <div
              className="relative aspect-[9/19.5] bg-black"
              style={{
                ...screenMaskStyle(PHONE_RADIUS.screen),
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)'
              }}
            >
              {/* No bg here — AppScreen paints white; PhoneScreenImage paints the photo.
                  A white parent under alpha-rounded screenshots caused square corner peeks. */}
              <div
                className="absolute inset-0 text-brand-navy"
                style={screenMaskStyle(PHONE_RADIUS.screen)}
              >
                {children}
              </div>

              {showIsland && (
                <div className="pointer-events-none absolute left-1/2 top-[7px] z-40 flex h-[18px] w-[72px] -translate-x-1/2 items-center justify-center rounded-full bg-black sm:top-[8px] sm:h-[21px] sm:w-[82px]">
                  <span
                    aria-hidden
                    className="absolute right-[10px] h-[5.5px] w-[5.5px] rounded-full bg-[#0f1520] shadow-[inset_0_0_0_1px_rgba(80,120,180,0.35)]"
                  />
                  <span
                    aria-hidden
                    className="absolute right-[12px] h-[2px] w-[2px] rounded-full bg-[#1e3a5f]/80"
                  />
                </div>
              )}

              {showStatusBar && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 z-30 flex h-[32px] items-center justify-between px-[14px] pt-px text-[10px] font-semibold tracking-tight text-brand-navy/90 sm:px-[16px]"
                >
                  <span className="min-w-[32px]">9:41</span>
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

              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-30"
                style={{
                  borderRadius: PHONE_RADIUS.screen,
                  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.35)'
                }}
              />

              <div
                aria-hidden
                className="pointer-events-none absolute bottom-[5px] left-1/2 z-40 h-[3px] w-[28%] -translate-x-1/2 rounded-full bg-black/40 sm:bottom-[6px]"
              />
            </div>
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
 * Image screen inside PhoneFrame.
 * Assets are pre-cropped to ~9:19.5 — cover fill, no stretch, hard-clipped to glass.
 */
export function PhoneScreenImage({
  src,
  alt = '',
  objectPosition = 'center top'
}) {
  const radius = 'var(--phone-screen-radius, 2.5rem)';

  return (
    <div className="absolute inset-0 bg-black" style={screenMaskStyle(radius)}>
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="pointer-events-none absolute inset-0 block h-full w-full max-w-none select-none"
        style={{
          objectFit: 'cover',
          objectPosition,
          // Explicit radius on the replaced element — some engines clip <img> poorly otherwise
          borderRadius: radius,
          clipPath: `inset(0 round ${radius})`,
          WebkitClipPath: `inset(0 round ${radius})`
        }}
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
    <PhoneFrame size={size} className={className} glow={glow} showStatusBar showIsland>
      <AppScreen data={data} />
    </PhoneFrame>
  );
}

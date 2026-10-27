"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

/**
 * Visual highlight carousel for /guias hero — destinations with published guides only.
 * Distinct from the horizontal “Destinos em destaque” strip below.
 */
export default function GuiasHeroHighlight({ destinations = [] }) {
  const slides = destinations.filter((d) => d?.url && d?.guide);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);

  const count = slides.length;
  const active = count ? slides[((index % count) + count) % count] : null;

  const goTo = useCallback(
    (next) => {
      if (!count) return;
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  const step = useCallback(
    (delta) => {
      goTo(index + delta);
    },
    [goTo, index]
  );

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (count < 2 || paused || reduceMotion) return undefined;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, 4800);
    return () => clearInterval(id);
  }, [count, paused, reduceMotion]);

  useEffect(() => {
    setIndex(0);
  }, [count]);

  if (!active) return null;

  const onTouchStart = (event) => {
    const touch = event.touches?.[0];
    if (!touch) return;
    touchStartX.current = touch.clientX;
    touchDeltaX.current = 0;
    setPaused(true);
  };

  const onTouchMove = (event) => {
    if (touchStartX.current == null) return;
    const touch = event.touches?.[0];
    if (!touch) return;
    touchDeltaX.current = touch.clientX - touchStartX.current;
  };

  const onTouchEnd = () => {
    const delta = touchDeltaX.current;
    touchStartX.current = null;
    touchDeltaX.current = 0;
    if (Math.abs(delta) > 48) {
      step(delta < 0 ? 1 : -1);
    }
    setPaused(false);
  };

  return (
    <div
      className="relative min-w-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className="relative overflow-hidden rounded-[32px] bg-bg-light shadow-md"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
      >
        <Link
          href={active.url}
          className="group relative block aspect-[16/11] w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 sm:aspect-[16/10]"
          aria-label={`Abrir guia de ${active.city}`}
        >
          {slides.map((slide, slideIndex) => {
            const src =
              slide.guide?.heroImage ||
              slide.guide?.images?.[0]?.url ||
              slide.guide?.images?.[0] ||
              '';
            const isActive = slideIndex === ((index % count) + count) % count;
            return (
              <img
                key={slide.id}
                src={src}
                alt=""
                aria-hidden={!isActive}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
                  isActive ? 'opacity-100' : 'opacity-0'
                } ${reduceMotion ? 'duration-0' : ''}`}
              />
            );
          })}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/10" />
          <div className="absolute bottom-4 left-4 right-4 max-w-sm rounded-2xl border border-white/70 bg-white/95 p-4 shadow-lg backdrop-blur-sm sm:bottom-6 sm:left-6 sm:right-auto">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
                <MapPin className="h-4 w-4" />
              </span>
              <div className="min-w-0 text-left">
                <p className="font-headers text-sm font-extrabold text-brand-navy transition-colors group-hover:text-brand-orange">
                  {active.city}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-text-muted">{active.country}</p>
              </div>
            </div>
          </div>
        </Link>

        {count > 1 ? (
          <>
            <button
              type="button"
              aria-label="Destino anterior"
              onClick={() => step(-1)}
              className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/85 text-brand-navy shadow-sm backdrop-blur-sm transition-colors hover:border-brand-orange hover:text-brand-orange sm:left-4"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Próximo destino"
              onClick={() => step(1)}
              className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/85 text-brand-navy shadow-sm backdrop-blur-sm transition-colors hover:border-brand-orange hover:text-brand-orange sm:right-4"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        ) : null}
      </div>

      {count > 1 ? (
        <div className="mt-3 flex items-center justify-center gap-1" role="tablist" aria-label="Destinos do destaque">
          {slides.map((slide, slideIndex) => {
            const selected = slideIndex === ((index % count) + count) % count;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={slide.city}
                onClick={() => goTo(slideIndex)}
                className="inline-flex h-11 min-w-11 items-center justify-center"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all ${
                    selected ? 'w-6 bg-brand-orange' : 'w-2.5 bg-brand-navy/20'
                  }`}
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

'use client';

import React, { useMemo } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  MapPin
} from 'lucide-react';
import { dayImage } from '@/lib/guideVisuals';
import {
  guideFrameList,
  parseDayTrip,
  pickDiverseFrame,
  splitTitleDetail
} from '@/lib/guideInterior';

function dayTripThumb(guide, frames, trip, idx, used) {
  const probe = { day: '', title: trip.name, details: trip.meta || trip.raw };
  return dayImage(guide, probe, frames, idx, used);
}

export default function GuideInsightsTrio({ guide, frames: framesProp, usedSeed = [] }) {
  const frames = framesProp?.length ? framesProp : guideFrameList(guide);

  const { mistakes, tips, trips, mistakesPhoto, tipsPhoto, tripThumbs } = useMemo(() => {
    if (!guide) {
      return {
        mistakes: [],
        tips: [],
        trips: [],
        mistakesPhoto: '',
        tipsPhoto: '',
        tripThumbs: []
      };
    }
    const used = new Set(usedSeed);
    const nextMistakes = (guide.commonMistakes || []).map((item) => splitTitleDetail(item));
    const nextTips = guide.importantTips || [];
    const nextTrips = (guide.dayTrips || []).map(parseDayTrip);
    const usedThumbs = new Set(used);
    const photoMistakes = pickDiverseFrame(frames, {
      hints: ['louvre', 'notre', 'orsay', 'opera', 'pantheon', 'navona', 'covent', 'shinjuku', 'galata', 'creek', 'chelsea', 'alley'],
      used,
      fallbackIndex: 1
    });
    const photoTips = pickDiverseFrame(frames, {
      hints: ['sacre', 'montmartre', 'seine-bridge', 'marais', 'latin', 'trastevere', 'meiji', 'high-line', 'shoreditch', 'kadikoy', 'desert', 'local-shop'],
      used,
      fallbackIndex: 3
    });
    const thumbs = nextTrips.map((trip, idx) => dayTripThumb(guide, frames, trip, idx, usedThumbs));
    return {
      mistakes: nextMistakes,
      tips: nextTips,
      trips: nextTrips,
      mistakesPhoto: photoMistakes,
      tipsPhoto: photoTips,
      tripThumbs: thumbs
    };
  }, [guide, frames, usedSeed]);

  const hasMistakes = mistakes.length > 0;
  const hasTips = tips.length > 0;
  const hasTrips = trips.length > 0;
  if (!guide || (!hasMistakes && !hasTips && !hasTrips)) return null;

  return (
    <section className="text-left">
      <div className="guide-insights-grid">
        {hasMistakes ? (
          <article className="guide-insight-card guide-insight-card-with-photo overflow-hidden rounded-[22px] border border-[#E4E9F0] bg-white shadow-[0_2px_10px_rgba(8,27,107,0.04)]">
            <div className="guide-insight-copy p-5 md:p-6">
              <h3 className="font-headers flex items-center gap-2 text-base font-extrabold text-brand-navy sm:text-lg">
                <AlertTriangle className="h-5 w-5 text-brand-orange" aria-hidden />
                Erros comuns
              </h3>
              <ol className="mt-5 space-y-3.5">
                {mistakes.map((item, idx) => (
                  <li key={`${item.title}-${idx}`} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-orange text-[12px] font-extrabold text-white">
                      {idx + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-extrabold leading-snug text-brand-navy">
                        {item.title}
                      </span>
                      {item.detail ? (
                        <span className="mt-0.5 block text-[12.5px] leading-relaxed text-text-muted">
                          {item.detail}
                        </span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            {mistakesPhoto ? (
              <div className="guide-insight-photo relative" aria-hidden>
                <img src={mistakesPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            ) : null}
          </article>
        ) : null}

        {hasTips ? (
          <article className="guide-insight-card guide-insight-card-with-photo overflow-hidden rounded-[22px] border border-[#E4E9F0] bg-white shadow-[0_2px_10px_rgba(8,27,107,0.04)]">
            <div className="guide-insight-copy p-5 md:p-6">
              <h3 className="font-headers flex items-center gap-2 text-base font-extrabold text-brand-navy sm:text-lg">
                <Lightbulb className="h-5 w-5 text-brand-green" aria-hidden />
                Dicas importantes
              </h3>
              <ul className="mt-5 space-y-3">
                {tips.map((tip) => (
                  <li
                    key={tip}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-text-muted"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-green"
                      aria-hidden
                    />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            {tipsPhoto ? (
              <div className="guide-insight-photo relative" aria-hidden>
                <img src={tipsPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            ) : null}
          </article>
        ) : null}

        {hasTrips ? (
          <article className="guide-insight-card rounded-[22px] border border-[#E4E9F0] bg-white p-5 shadow-[0_2px_10px_rgba(8,27,107,0.04)] md:p-6">
            <h3 className="font-headers flex items-center gap-2 text-base font-extrabold text-brand-navy sm:text-lg">
              <MapPin className="h-5 w-5 text-[#2F6FED]" aria-hidden />
              Bate-volta imperdíveis
            </h3>
            <ul className="mt-5 divide-y divide-border-gray/70">
              {trips.map((trip, idx) => {
                const thumb = tripThumbs[idx];
                return (
                  <li key={trip.raw}>
                    <div className="flex min-h-14 items-center gap-3 py-3 first:pt-0 last:pb-0">
                      <span className="h-12 w-14 shrink-0 overflow-hidden rounded-xl bg-bg-light">
                        {thumb ? (
                          <img src={thumb} alt="" className="h-full w-full object-cover" />
                        ) : null}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-extrabold leading-snug text-brand-navy">
                          {trip.name}
                        </span>
                        {trip.meta ? (
                          <span className="mt-0.5 block text-[12px] text-text-muted">
                            {trip.meta}
                          </span>
                        ) : null}
                      </span>
                      <ChevronRight className="h-5 w-5 shrink-0 text-brand-orange" aria-hidden />
                    </div>
                  </li>
                );
              })}
            </ul>
          </article>
        ) : null}
      </div>
    </section>
  );
}

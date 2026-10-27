'use client';

import React, { useId, useState } from 'react';
import { ChevronRight, Coins, FileCheck2, Globe, Plane } from 'lucide-react';
import { firstSentences, guideFolderKey, guideFrameList } from '@/lib/guideInterior';

const CARD_DEFS = [
  {
    id: 'moeda',
    title: 'Moeda & pagamentos',
    Icon: Coins,
    fields: ['currencyInfo'],
    imageHints: ['opera', 'marais', '1']
  },
  {
    id: 'idioma',
    title: 'Idioma',
    Icon: Globe,
    fields: ['languageInfo'],
    imageHints: ['montmartre', 'latin', '2']
  },
  {
    id: 'locomocao',
    title: 'Como chegar e se locomover',
    Icon: Plane,
    fields: ['howToGet', 'transportDetails'],
    imageHints: ['seine', 'bridge', 'arc', '3'],
    sectionId: 'locomocao'
  },
  {
    id: 'docs',
    title: 'Documentação & seguro',
    Icon: FileCheck2,
    fields: ['documentation', 'insurance'],
    imageHints: ['notre', 'orsay', 'saint']
  }
];

function pickCardImage(guide, frames, hints, fallbackIndex) {
  const folder = guideFolderKey(guide);
  const pool = frames.length
    ? frames
    : [`/images/destinations/${folder}/${folder}-1.jpg`, guide?.heroImage].filter(Boolean);

  for (const hint of hints) {
    const hit = pool.find((src) => String(src).toLowerCase().includes(hint));
    if (hit) return hit;
  }
  return pool[fallbackIndex % pool.length] || guide?.heroImage || '';
}

function cardBody(guide, fields) {
  return fields
    .map((key) => guide?.[key])
    .filter(Boolean)
    .join(' ');
}

export default function GuideEssentialInfo({ guide, frames: framesProp }) {
  const baseId = useId();
  const [openId, setOpenId] = useState(null);
  const frames = framesProp?.length ? framesProp : guideFrameList(guide);

  if (!guide) return null;

  const cards = CARD_DEFS.map((def, idx) => {
    const full = cardBody(guide, def.fields);
    if (!full) return null;
    return {
      ...def,
      full,
      summary: firstSentences(full, 2, 148),
      image: pickCardImage(guide, frames, def.imageHints, idx + 1)
    };
  }).filter(Boolean);

  if (!cards.length) return null;

  return (
    <section id="praticos" className="scroll-mt-28 text-left">
      <div className="mb-6 max-w-3xl">
        <h2 className="font-headers text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
          Informações essenciais
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-text-muted sm:text-base">
          O básico para chegar, se comunicar e se organizar em {guide.city} — sem enrolação.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.Icon;
          const open = openId === card.id;
          const panelId = `${baseId}-${card.id}`;
          const expandable = card.full.length > card.summary.length + 8;

          return (
            <article
              key={card.id}
              id={card.sectionId}
              className={`group relative overflow-hidden rounded-[22px] border border-border-gray/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-orange/35 hover:shadow-md ${
                card.sectionId ? 'scroll-mt-28' : ''
              }`}
            >
              <div className="flex h-full min-h-[168px]">
                <div className="flex min-w-0 flex-1 flex-col p-4 pr-2 sm:p-5 sm:pr-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-brand-orange text-brand-orange">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={2.15} />
                  </span>
                  <h3 className="font-headers mt-3 text-[15px] font-extrabold leading-snug text-brand-navy sm:text-base">
                    {card.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-text-muted">
                    {open ? card.full : card.summary}
                  </p>
                  {expandable ? (
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenId(open ? null : card.id)}
                      className="mt-3 inline-flex min-h-11 w-fit items-center gap-1 text-brand-orange transition-transform hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/40"
                    >
                      <ChevronRight
                        className={`h-5 w-5 transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
                      />
                      <span className="sr-only">
                        {open ? 'Recolher' : 'Expandir'} {card.title}
                      </span>
                    </button>
                  ) : (
                    <span className="mt-3 inline-flex text-brand-orange" aria-hidden>
                      <ChevronRight className="h-5 w-5 opacity-70" />
                    </span>
                  )}
                  <div id={panelId} hidden={!open} className="sr-only">
                    {card.full}
                  </div>
                </div>
                <div className="relative w-[38%] min-w-[96px] max-w-[128px] shrink-0 self-stretch py-3 pr-3">
                  <div className="guide-essential-photo relative h-full min-h-[140px] overflow-hidden rounded-[18px] bg-bg-light shadow-sm">
                    {card.image ? (
                      <img
                        src={card.image}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {guide.internet ? (
        <div className="mt-4 rounded-2xl border border-dashed border-border-gray bg-[#F7F8FA]/80 px-4 py-3 text-sm leading-relaxed text-text-muted sm:px-5">
          <span className="font-extrabold text-brand-navy">Internet & conectividade: </span>
          {guide.internet}
        </div>
      ) : null}
    </section>
  );
}

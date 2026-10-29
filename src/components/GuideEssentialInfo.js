'use client';

import { guideImage } from '@/lib/curatedGuideImages';
import React, { useId, useMemo, useState } from 'react';
import { Coins, FileCheck2, Globe, Plane } from 'lucide-react';
import { firstSentences } from '@/lib/guideInterior';

/** Dedicated topic cards — never recycle must-see / day frames when these exist. */
const ESSENTIAL_SUFFIX = {
  moeda: 'moeda',
  idioma: 'idioma',
  locomocao: 'transporte',
  docs: 'docs'
};

const CARD_DEFS = [
  {
    id: 'moeda',
    title: 'Moeda & pagamentos',
    Icon: Coins,
    fields: ['currencyInfo'],
  },
  {
    id: 'idioma',
    title: 'Idioma',
    Icon: Globe,
    fields: ['languageInfo'],
  },
  {
    id: 'locomocao',
    title: 'Como chegar e se locomover',
    Icon: Plane,
    fields: ['howToGet', 'transportDetails'],
    sectionId: 'locomocao'
  },
  {
    id: 'docs',
    title: 'Documentação & seguro',
    Icon: FileCheck2,
    fields: ['documentation', 'insurance'],
  }
];

function cardBody(guide, fields) {
  return fields
    .map((key) => guide?.[key])
    .filter(Boolean)
    .join(' ');
}

export default function GuideEssentialInfo({ guide }) {
  const baseId = useId();
  const [openId, setOpenId] = useState(null);

  const cards = useMemo(() => {
    if (!guide) return [];
    return CARD_DEFS.map((def) => {
      const full = cardBody(guide, def.fields);
      if (!full) return null;
      const image = guideImage(guide, `essential-${ESSENTIAL_SUFFIX[def.id]}`);
      return {
        ...def,
        full,
        summary: firstSentences(full, 2, 130),
        image
      };
    }).filter(Boolean);
  }, [guide]);

  if (!guide || !cards.length) return null;

  return (
    <section id="praticos" className="scroll-mt-28 text-left">
      <div className="mb-5 max-w-3xl sm:mb-6">
        <h2 className="font-headers text-2xl font-extrabold tracking-tight text-brand-navy sm:text-[1.65rem]">
          Informações essenciais
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          O básico para chegar, se comunicar e se organizar em {guide.city} — sem enrolação.
        </p>
      </div>

      <div className="guide-essentials-grid">
        {cards.map((card) => {
          const Icon = card.Icon;
          const open = openId === card.id;
          const panelId = `${baseId}-${card.id}`;
          const expandable = card.full.length > card.summary.length + 8;

          return (
            <article
              key={card.id}
              id={card.sectionId}
              className={`guide-essential-card group relative flex overflow-hidden rounded-[20px] border border-[#E4E9F0] bg-white shadow-[0_2px_10px_rgba(8,27,107,0.04)] transition-transform duration-300 hover:-translate-y-0.5 ${
                card.sectionId ? 'scroll-mt-28' : ''
              }`}
            >
              {expandable ? (
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenId(open ? null : card.id)}
                  className="flex min-w-0 flex-1 flex-col p-4 pr-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-orange/40 md:p-5 md:pr-3"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-brand-orange text-brand-orange">
                    <Icon className="h-[17px] w-[17px]" strokeWidth={2.2} aria-hidden />
                  </span>
                  <h3 className="font-headers mt-3 text-[15px] font-extrabold leading-snug text-brand-navy">
                    {card.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-text-muted">
                    {open ? card.full : card.summary}
                  </p>
                  <span className="sr-only">
                    {open ? 'Mostrar menos' : 'Expandir'} {card.title}
                  </span>
                </button>
              ) : (
                <div className="flex min-w-0 flex-1 flex-col p-4 pr-3 md:p-5 md:pr-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border-[1.5px] border-brand-orange text-brand-orange">
                    <Icon className="h-[17px] w-[17px]" strokeWidth={2.2} aria-hidden />
                  </span>
                  <h3 className="font-headers mt-3 text-[15px] font-extrabold leading-snug text-brand-navy">
                    {card.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-text-muted">
                    {card.summary}
                  </p>
                </div>
              )}
              <div id={panelId} hidden={!open} className="sr-only">
                {card.full}
              </div>
              <div className="guide-essential-photo-wrap relative w-[38%] max-w-[120px] shrink-0 self-stretch">
                {card.image ? (
                  <img
                    src={card.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-bg-light" />
                )}
              </div>
            </article>
          );
        })}
      </div>

      {guide.internet ? (
        <div className="mt-4 rounded-2xl border border-dashed border-border-gray bg-[#F7F8FA]/80 px-4 py-3 text-sm leading-relaxed text-text-muted md:px-5">
          <span className="font-extrabold text-brand-navy">Internet & conectividade: </span>
          {guide.internet}
        </div>
      ) : null}
    </section>
  );
}

'use client';

import React from 'react';
import { BedDouble, Bus, Lightbulb, UtensilsCrossed } from 'lucide-react';
import { guideFolderKey, guideFrameList } from '@/lib/guideInterior';

const TIERS = [
  { key: 'economy', label: 'Econômico' },
  { key: 'comfort', label: 'Intermediário' },
  { key: 'luxury', label: 'Luxo' }
];

function atmosphericImage(guide, frames) {
  const folder = guideFolderKey(guide);
  const preferred = [
    ...frames.filter((src) => /eiffel|seine|saint|marais|cafe|orsay/i.test(src)),
    ...frames,
    guide?.heroImage,
    `/images/destinations/${folder}/${folder}-1.jpg`
  ].filter(Boolean);
  return preferred[0] || '';
}

function atmosphericCaption(guide) {
  const food = guide?.gastronomy?.[0];
  if (food) {
    let short = String(food).replace(/\s+/g, ' ').trim();
    // Keep caption short so it stays inside the organic image mask.
    if (short.length > 40) short = `${short.slice(0, 38).trim()}…`;
    if (short.length > 8) return short;
  }
  return `Sabores de ${guide?.city || 'destino'}`;
}

export default function GuideAverageCosts({ guide, frames: framesProp }) {
  if (!guide?.costsTable) return null;

  const frames = framesProp?.length ? framesProp : guideFrameList(guide);
  const image = atmosphericImage(guide, frames);
  const caption = atmosphericCaption(guide);

  const tiers = TIERS.map((tier) => {
    const row = guide.costsTable[tier.key];
    if (!row?.daily) return null;
    return { ...tier, ...row };
  }).filter(Boolean);

  if (!tiers.length) return null;

  return (
    <section id="custos" className="scroll-mt-28 text-left">
      <div className="mb-5 max-w-3xl">
        <h2 className="font-headers text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl">
          Custos médios em {guide.city}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-text-muted sm:text-base">
          Três perfis de orçamento diário com base no que já está mapeado neste guia.
        </p>
      </div>

      <div className="mb-6 inline-flex max-w-xl items-start gap-2.5 rounded-2xl border border-brand-orange/25 bg-[#FFF7F0] px-4 py-3 text-sm leading-relaxed text-brand-navy/85">
        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" aria-hidden />
        <p>
          Valores médios aproximados — variam conforme temporada, bairro e estilo de viagem.
        </p>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-7">
          {tiers.map((tier) => (
            <article
              key={tier.key}
              className="flex flex-col rounded-[22px] border border-border-gray/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-orange/30 hover:shadow-md"
            >
              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand-navy/55">
                {tier.label}
              </p>
              <p className="font-headers mt-2 text-2xl font-extrabold leading-none text-brand-orange sm:text-[1.65rem]">
                {tier.daily}
                <span className="ml-1 text-sm font-bold text-brand-orange/80">/ dia</span>
              </p>
              <ul className="mt-5 space-y-3 text-[13px] leading-snug text-text-muted">
                <li className="flex items-start gap-2.5">
                  <BedDouble className="mt-0.5 h-4 w-4 shrink-0 text-brand-navy/70" aria-hidden />
                  <span>
                    <span className="font-extrabold text-brand-navy">Hospedagem</span>
                    <span className="mt-0.5 block">{tier.hotel}</span>
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <UtensilsCrossed className="mt-0.5 h-4 w-4 shrink-0 text-brand-navy/70" aria-hidden />
                  <span>
                    <span className="font-extrabold text-brand-navy">Alimentação</span>
                    <span className="mt-0.5 block">{tier.food}</span>
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Bus className="mt-0.5 h-4 w-4 shrink-0 text-brand-navy/70" aria-hidden />
                  <span>
                    <span className="font-extrabold text-brand-navy">Transporte</span>
                    <span className="mt-0.5 block">{tier.transport}</span>
                  </span>
                </li>
              </ul>
            </article>
          ))}
        </div>

        <div className="relative min-h-[280px] lg:col-span-5 lg:min-h-[340px]">
          <figure className="guide-cost-blob relative h-full min-h-[280px] overflow-hidden bg-bg-light shadow-md lg:absolute lg:inset-0 lg:min-h-0">
            {image ? (
              <img
                src={image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/65 via-brand-navy/10 to-transparent" />
            <figcaption className="guide-cost-caption absolute bottom-[14%] left-[18%] right-[14%] text-left text-[15px] font-semibold leading-snug text-white sm:text-base">
              {caption}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

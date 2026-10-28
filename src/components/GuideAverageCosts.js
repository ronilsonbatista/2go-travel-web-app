'use client';

import React, { useMemo } from 'react';
import { BedDouble, Bus, Lightbulb, UtensilsCrossed, Wallet } from 'lucide-react';
import { guideFolderKey, guideFrameList, pickDiverseFrame } from '@/lib/guideInterior';

const TIERS = [
  {
    key: 'economy',
    label: 'Econômico',
    accent: 'border-[#D8E4C8] bg-[#F4F7EC]',
    iconBg: 'bg-[#96AB21]/15 text-[#6F8218]'
  },
  {
    key: 'comfort',
    label: 'Intermediário',
    accent: 'border-[#F5D4B8] bg-[#FFF6ED]',
    iconBg: 'bg-brand-orange/15 text-brand-orange'
  },
  {
    key: 'luxury',
    label: 'Luxo',
    accent: 'border-[#C9D2F0] bg-[#F3F5FC]',
    iconBg: 'bg-brand-navy/10 text-brand-navy'
  }
];

function atmosphericCaption(guide) {
  const food = guide?.gastronomy?.[0];
  if (food) {
    let short = String(food).replace(/\s+/g, ' ').trim();
    if (short.length > 48) short = `${short.slice(0, 46).trim()}…`;
    if (short.length > 8) return short;
  }
  return `Sabores de ${guide?.city || 'destino'}`;
}

export default function GuideAverageCosts({ guide, frames: framesProp, usedSeed = [] }) {
  const frames = framesProp?.length ? framesProp : guideFrameList(guide);
  const folder = guideFolderKey(guide);
  const image = useMemo(() => {
    if (!guide?.costsTable) return '';
    const used = new Set(usedSeed);
    return (
      pickDiverseFrame(frames, {
        hints: ['marais', 'orsay', 'latin', 'saint', 'cafe', 'opera', '1', '2'],
        used,
        fallbackIndex: 2
      }) ||
      `/images/destinations/${folder}/${folder}-1.jpg` ||
      guide?.heroImage ||
      ''
    );
  }, [guide, frames, folder, usedSeed]);

  if (!guide?.costsTable) return null;

  const caption = atmosphericCaption(guide);

  const tiers = TIERS.map((tier) => {
    const row = guide.costsTable[tier.key];
    if (!row?.daily) return null;
    return { ...tier, ...row };
  }).filter(Boolean);

  if (!tiers.length) return null;

  return (
    <section id="custos" className="scroll-mt-28 text-left">
      <div className="rounded-[28px] border border-[#EDE6DC] bg-[#FBF7F1] p-5 md:p-7 lg:p-8">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand-orange">
              Forma da viagem
            </p>
            <h2 className="font-headers mt-1.5 text-2xl font-extrabold tracking-tight text-brand-navy sm:text-[1.65rem]">
              Custos médios em {guide.city}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Três perfis de orçamento diário com base no que já está mapeado neste guia.
            </p>
          </div>
          <div className="inline-flex max-w-md items-start gap-2.5 rounded-2xl border border-brand-orange/25 bg-white/90 px-4 py-3 text-sm leading-relaxed text-brand-navy/85">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" aria-hidden />
            <p>Valores médios aproximados — variam conforme temporada, bairro e estilo de viagem.</p>
          </div>
        </div>

        <div className="guide-costs-layout">
          <div className="guide-costs-tiers">
            {tiers.map((tier) => (
              <article
                key={tier.key}
                className={`flex flex-col rounded-[20px] border p-4 shadow-sm md:p-5 ${tier.accent}`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${tier.iconBg}`}
                  >
                    <Wallet className="h-4 w-4" aria-hidden />
                  </span>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-brand-navy/70">
                    {tier.label}
                  </p>
                </div>
                <p className="font-headers mt-3 text-[1.4rem] font-extrabold leading-none text-brand-orange md:text-[1.5rem]">
                  {tier.daily}
                  <span className="ml-1 text-sm font-bold text-brand-orange/80">/ dia</span>
                </p>
                <ul className="mt-4 space-y-3 text-[12.5px] leading-snug text-text-muted">
                  <li className="flex items-start gap-2.5">
                    <BedDouble className="mt-0.5 h-4 w-4 shrink-0 text-brand-navy/65" aria-hidden />
                    <span>
                      <span className="font-extrabold text-brand-navy">Hospedagem</span>
                      <span className="mt-0.5 block">{tier.hotel}</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <UtensilsCrossed
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-navy/65"
                      aria-hidden
                    />
                    <span>
                      <span className="font-extrabold text-brand-navy">Alimentação</span>
                      <span className="mt-0.5 block">{tier.food}</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Bus className="mt-0.5 h-4 w-4 shrink-0 text-brand-navy/65" aria-hidden />
                    <span>
                      <span className="font-extrabold text-brand-navy">Transporte</span>
                      <span className="mt-0.5 block">{tier.transport}</span>
                    </span>
                  </li>
                </ul>
              </article>
            ))}
          </div>

          <figure className="guide-cost-photo relative min-h-[220px] bg-bg-light shadow-sm md:min-h-[260px] lg:min-h-full">
            {image ? (
              <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/75 via-brand-navy/10 to-transparent" />
            <figcaption className="guide-cost-caption absolute bottom-4 left-4 right-4 text-left text-sm font-semibold leading-snug text-white md:text-[15px]">
              {caption}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

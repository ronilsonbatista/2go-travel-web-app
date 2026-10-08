"use client";

import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Compass,
  Coins,
  Globe,
  HelpCircle,
  Hotel,
  MapPin,
  ShoppingBag,
  Wallet,
  X,
  AlertTriangle,
  Info
} from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppDownloadModal from '@/components/AppDownloadModal';
import NewsletterBox from '@/components/NewsletterBox';
import AppPhoneMockup from '@/components/AppPhoneMockup';
import GuideThirtySeconds from '@/components/GuideThirtySeconds';
import ScrollReveal from '@/components/ScrollReveal';

const LOCAL_FRAMES = {
  paris: [
    '/images/destinations/paris/paris-eiffel-seine.jpg',
    '/images/destinations/paris/paris-louvre.jpg',
    '/images/destinations/paris/paris-notre-dame.jpg',
    '/images/destinations/paris/paris-1.jpg',
    '/images/destinations/paris/paris-2.jpg',
    '/images/destinations/paris/paris-3.jpg'
  ],
  'nova-york': [
    '/images/destinations/nova-york/nova-york-estatua-liberdade.jpg',
    '/images/destinations/nova-york/nova-york-empire-state.jpg',
    '/images/destinations/nova-york/nova-york-brooklyn-bridge.jpg',
    '/images/destinations/nova-york/nova-york-1.jpg',
    '/images/destinations/nova-york/nova-york-2.jpg',
    '/images/destinations/nova-york/nova-york-3.jpg'
  ],
  toquio: [
    '/images/destinations/toquio/toquio-tokyo-tower.jpg',
    '/images/destinations/toquio/toquio-sensoji.jpg',
    '/images/destinations/toquio/toquio-shibuya-crossing.jpg',
    '/images/destinations/toquio/toquio-1.jpg',
    '/images/destinations/toquio/toquio-2.jpg',
    '/images/destinations/toquio/toquio-3.jpg'
  ],
  londres: [
    '/images/destinations/londres/londres-big-ben.jpg',
    '/images/destinations/londres/londres-tower-bridge.jpg',
    '/images/destinations/londres/londres-buckingham-palace.jpg',
    '/images/destinations/londres/londres-1.jpg',
    '/images/destinations/londres/londres-2.jpg',
    '/images/destinations/londres/londres-3.jpg'
  ],
  roma: [
    '/images/destinations/roma/roma-coliseu.jpg',
    '/images/destinations/roma/roma-fontana-trevi.jpg',
    '/images/destinations/roma/roma-vaticano.jpg',
    '/images/destinations/roma/roma-1.jpg',
    '/images/destinations/roma/roma-2.jpg',
    '/images/destinations/roma/roma-3.jpg'
  ],
  istambul: [
    '/images/destinations/istambul/istambul-hagia-sophia.jpg',
    '/images/destinations/istambul/istambul-mesquita-azul.jpg',
    '/images/destinations/istambul/istambul-bosforo.jpg',
    '/images/destinations/istambul/istambul-1.jpg',
    '/images/destinations/istambul/istambul-2.jpg',
    '/images/destinations/istambul/istambul-3.jpg'
  ],
  dubai: [
    '/images/destinations/dubai/dubai-burj-khalifa.jpg',
    '/images/destinations/dubai/dubai-marina.jpg',
    '/images/destinations/dubai/dubai-burj-al-arab.jpg',
    '/images/destinations/dubai/dubai-1.jpg',
    '/images/destinations/dubai/dubai-2.jpg',
    '/images/destinations/dubai/dubai-3.jpg'
  ]
};

const DAY_ACCENTS = ['bg-brand-orange', 'bg-[#2F6FED]', 'bg-brand-green', 'bg-[#B45309]', 'bg-[#7C3AED]', 'bg-[#0F766E]'];

function framesFor(guide) {
  const listed = (guide.images || [])
    .map((image) => (typeof image === 'string' ? image : image?.url))
    .filter(Boolean);
  const folder = (guide.heroImage || '').split('/')[3];
  const unique = [];
  for (const src of [guide.heroImage, ...listed, ...(LOCAL_FRAMES[folder] || [])]) {
    if (src && !unique.includes(src)) unique.push(src);
  }
  return unique;
}

function phoneVariantFor(guide) {
  const city = (guide.city || '').toLowerCase();
  if (city.includes('roma')) return 'roma';
  if (city.includes('paris')) return 'paris';
  if (city.includes('nova york') || city.includes('new york')) return 'nova-york';
  return 'paris';
}

function shortFact(text, fallback) {
  if (!text) return fallback;
  const clean = String(text).replace(/\s+/g, ' ').trim();
  if (clean.length <= 72) return clean;
  return `${clean.slice(0, 69).trim()}…`;
}

export default function GuideArticleClient({ guide }) {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const [itineraryTab, setItineraryTab] = useState('all');
  const frames = framesFor(guide || {});

  useEffect(() => {
    setFrameIndex(0);
  }, [guide?.slug]);

  useEffect(() => {
    if (frames.length < 2) return undefined;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) return undefined;
    const total = frames.length;
    const id = setInterval(() => {
      setFrameIndex((current) => (current + 1) % total);
    }, 5200);
    return () => clearInterval(id);
  }, [guide?.slug, frames.length]);

  const quickFacts = useMemo(() => {
    if (!guide) return [];
    const daysMatch = String(guide.idealDays || '').match(/(\d+)\s*a\s*(\d+)/i);
    const daysLabel = daysMatch
      ? `${daysMatch[1]} a ${daysMatch[2]} dias`
      : shortFact(guide.idealDays, '5 a 7 dias');
    const season = shortFact(
      String(guide.whenToGo || '')
        .split(/[.;]/)[0]
        .replace(/\([^)]*\)/g, '')
        .trim(),
      'Primavera e outono'
    );
    const neighborhood = (guide.neighborhoods?.[0]?.name || 'Melhores bairros')
      .split('(')[0]
      .trim();
    const transport = shortFact(
      String(guide.transportDetails || '')
        .split(/[.;]/)[0]
        .trim(),
      'Transporte local'
    );
    return [
      {
        icon: CalendarDays,
        label: 'Melhor época',
        value: season.length > 42 ? `${season.slice(0, 40)}…` : season
      },
      {
        icon: MapPin,
        label: 'Quantos dias',
        value: daysLabel
      },
      {
        icon: Wallet,
        label: 'Quanto custa',
        value: guide.costsTable?.economy?.daily || guide.costsTable?.comfort?.daily || 'Consulte o guia'
      },
      {
        icon: Hotel,
        label: 'Onde ficar',
        value: neighborhood
      },
      {
        icon: Compass,
        label: 'Como se locomover',
        value: transport.length > 42 ? `${transport.slice(0, 40)}…` : transport
      }
    ];
  }, [guide]);

  const visibleItinerary = useMemo(() => {
    if (!guide?.suggestedItinerary) return [];
    if (itineraryTab === '3') return guide.suggestedItinerary.slice(0, 3);
    if (itineraryTab === '5') return guide.suggestedItinerary.slice(0, 5);
    return guide.suggestedItinerary;
  }, [guide, itineraryTab]);

  const toggleFaq = (idx) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  if (!guide) return null;

  return (
    <div className="w-full bg-white min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy overflow-x-clip">
      <Header solid onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pb-20">
        <section className="relative mt-[64px] h-[calc(100svh-64px)] min-h-[520px] sm:min-h-[620px] overflow-hidden bg-[#0b1220] lg:mt-[78px] lg:h-[calc(100svh-78px)]">
          {frames.map((src, index) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out ${
                index === frameIndex ? 'opacity-100 guide-ken' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/55 to-transparent" />
          <div className="relative z-10 flex h-full flex-col">
            <div className="container mx-auto w-full max-w-[1440px] px-4 pt-5 text-left sm:px-6 sm:pt-6">
              <Breadcrumbs
                variant="onDark"
                items={[
                  { name: 'Guia de Viagem', url: '/guias' },
                  { name: guide.city, url: `/guias/${guide.slug}` }
                ]}
              />
            </div>
            <div className="container mx-auto mt-auto w-full max-w-[1440px] px-4 pb-10 text-left text-white sm:px-6 sm:pb-14">
              <p className="text-[11px] font-extrabold tracking-[0.18em] text-white/70 uppercase">Guia de Viagem</p>
              <h1 className="font-headers mt-3 max-w-5xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                {guide.city}: Guia completo
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/85 sm:text-base">
                {guide.subtitle}
              </p>
              <button
                type="button"
                onClick={() => setIsDownloadOpen(true)}
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-brand-navy transition-transform hover:-translate-y-0.5"
              >
                Baixar o App
              </button>
            </div>
          </div>
        </section>

        <ScrollReveal className="container mx-auto -mt-8 relative z-20 w-full max-w-[1440px] px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {quickFacts.map((fact) => {
              const Icon = fact.icon;
              return (
                <div
                  key={fact.label}
                  className="rounded-2xl border border-border-gray/80 bg-white px-4 py-4 shadow-sm transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <div className="mb-2 flex items-center gap-2 text-brand-orange">
                    <Icon className="h-4 w-4" />
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-navy/70">
                      {fact.label}
                    </span>
                  </div>
                  <p className="text-sm font-bold leading-snug text-brand-navy">{fact.value}</p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        <div className="container mx-auto mt-14 w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <GuideThirtySeconds guide={guide} />
          </ScrollReveal>

          <ScrollReveal className="mt-10" delay={40}>
            <section id="introducao" className="text-left">
              <p className="max-w-[46rem] text-base leading-relaxed text-text-muted sm:text-lg">{guide.intro}</p>
              <p className="mt-4 max-w-[46rem] text-sm leading-relaxed text-text-muted sm:text-base">{guide.whyVisit}</p>
            </section>
          </ScrollReveal>

          <ScrollReveal className="mt-12" delay={40}>
            <section id="quando-ir" className="grid grid-cols-1 gap-4 md:grid-cols-2 text-left">
              <div className="rounded-[24px] border border-border-gray/70 bg-white p-6">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-orange">Quando ir</p>
                <h2 className="font-headers mt-2 text-2xl font-extrabold text-brand-navy">
                  Melhor época em {guide.city}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">{guide.whenToGo}</p>
              </div>
              <div className="rounded-[24px] border border-border-gray/70 bg-white p-6">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-orange">Duração</p>
                <h2 className="font-headers mt-2 text-2xl font-extrabold text-brand-navy">
                  Quantos dias ficar
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">{guide.idealDays}</p>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal className="mt-16" delay={80}>
            <section id="roteiro-sugerido">
              <div className="mb-6 flex flex-col gap-4 text-left sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-orange">Roteiro</p>
                  <h2 className="font-headers mt-2 text-3xl font-extrabold text-brand-navy">
                    Roteiro sugerido
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'all', label: `${guide.suggestedItinerary.length} dias` },
                    { id: '3', label: '3 dias' },
                    { id: '5', label: '5 dias' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setItineraryTab(tab.id)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-extrabold transition-all ${
                        itineraryTab === tab.id
                          ? 'bg-brand-navy text-white'
                          : 'bg-bg-light text-text-muted hover:text-brand-navy'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setIsDownloadOpen(true)}
                    className="rounded-full bg-brand-orange/10 px-3.5 py-1.5 text-xs font-extrabold text-brand-orange transition-colors hover:bg-brand-orange hover:text-white"
                  >
                    Personalizar no app
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {visibleItinerary.map((item, idx) => (
                  <article
                    key={`${item.day}-${item.title}`}
                    className="overflow-hidden rounded-[24px] border border-border-gray/80 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={frames[idx % Math.max(frames.length, 1)] || guide.heroImage}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                      <span className={`absolute left-3 top-3 h-2.5 w-2.5 rounded-full ${DAY_ACCENTS[idx % DAY_ACCENTS.length]}`} />
                    </div>
                    <div className="p-5 text-left">
                      <p className="text-[10px] font-extrabold uppercase tracking-wider text-brand-orange">
                        {item.day}
                      </p>
                      <h3 className="font-headers mt-1 text-lg font-extrabold text-brand-navy">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-text-muted">
                        {item.details}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal className="mt-16" delay={80}>
            <section id="atracoes">
              <div className="mb-6 text-left">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-orange">Imperdíveis</p>
                <h2 className="font-headers mt-2 text-3xl font-extrabold text-brand-navy">
                  Imperdíveis em {guide.city}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {guide.attractions.map((att, idx) => (
                  <article
                    key={att.name}
                    className="overflow-hidden rounded-[24px] border border-border-gray/80 bg-white text-left shadow-sm transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={frames[idx % Math.max(frames.length, 1)] || guide.heroImage}
                        alt={att.name}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-brand-orange">
                        Prioridade {att.priority}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-headers text-lg font-extrabold text-brand-navy">{att.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">{att.desc}</p>
                      {att.whyVisit ? (
                        <p className="mt-2 text-sm leading-relaxed text-text-muted">{att.whyVisit}</p>
                      ) : null}
                      {att.tip2GO ? (
                        <p className="mt-3 text-xs leading-relaxed text-brand-navy/80">
                          <span className="font-extrabold text-brand-orange">Dica 2GO: </span>
                          {att.tip2GO}
                        </p>
                      ) : null}
                      <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
                        <div className="rounded-xl bg-bg-light px-3 py-2">
                          <span className="block text-[10px] uppercase text-text-muted">Preço</span>
                          <span className="font-bold text-brand-navy">{att.price}</span>
                        </div>
                        <div className="rounded-xl bg-bg-light px-3 py-2">
                          <span className="block text-[10px] uppercase text-text-muted">Duração</span>
                          <span className="font-bold text-brand-navy">{att.duration}</span>
                        </div>
                        <div className="rounded-xl bg-bg-light px-3 py-2">
                          <span className="block text-[10px] uppercase text-text-muted">Melhor horário</span>
                          <span className="font-bold text-brand-navy">{att.bestTime}</span>
                        </div>
                        <div className="rounded-xl bg-bg-light px-3 py-2">
                          <span className="block text-[10px] uppercase text-text-muted">Reserva</span>
                          <span className="font-bold text-brand-orange">{att.reservation}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal className="mt-16" delay={60}>
            <section id="onde-ficar" className="text-left">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-orange">Hospedagem</p>
              <h2 className="font-headers mt-2 text-3xl font-extrabold text-brand-navy">
                Onde ficar em {guide.city}
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {guide.neighborhoods.map((n) => (
                  <div key={n.name} className="rounded-[24px] border border-border-gray/80 bg-[#F7F8FA] p-5">
                    <h3 className="font-headers text-lg font-extrabold text-brand-navy">{n.name}</h3>
                    <div className="mt-3 grid grid-cols-1 gap-3 text-xs sm:grid-cols-2">
                      <div className="rounded-xl bg-white p-3">
                        <span className="mb-1 flex items-center gap-1.5 font-bold text-green-800">
                          <Check className="h-3.5 w-3.5 text-green-600" /> Vantagens
                        </span>
                        <p className="leading-relaxed text-text-muted">{n.pros}</p>
                      </div>
                      <div className="rounded-xl bg-white p-3">
                        <span className="mb-1 flex items-center gap-1.5 font-bold text-amber-800">
                          <X className="h-3.5 w-3.5 text-amber-600" /> Atenção
                        </span>
                        <p className="leading-relaxed text-text-muted">{n.cons}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal className="mt-16" delay={60}>
            <section id="praticos" className="grid grid-cols-1 gap-4 md:grid-cols-2 text-left">
              <div className="rounded-[24px] border border-border-gray/70 bg-white p-6">
                <h3 className="font-headers flex items-center gap-2 text-xl font-extrabold text-brand-navy">
                  <Coins className="h-5 w-5 text-brand-orange" /> Moeda & pagamentos
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{guide.currencyInfo}</p>
              </div>
              <div className="rounded-[24px] border border-border-gray/70 bg-white p-6">
                <h3 className="font-headers flex items-center gap-2 text-xl font-extrabold text-brand-navy">
                  <Globe className="h-5 w-5 text-brand-navy" /> Idioma
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{guide.languageInfo}</p>
              </div>
              <div className="rounded-[24px] border border-border-gray/70 bg-white p-6 md:col-span-2">
                <h3 className="font-headers text-xl font-extrabold text-brand-navy">Como chegar e se locomover</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{guide.howToGet}</p>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{guide.transportDetails}</p>
              </div>
              <div className="rounded-[24px] border border-border-gray/70 bg-white p-6">
                <h3 className="font-headers text-xl font-extrabold text-brand-navy">Documentação & seguro</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{guide.documentation}</p>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{guide.insurance}</p>
              </div>
              <div className="rounded-[24px] border border-border-gray/70 bg-white p-6">
                <h3 className="font-headers text-xl font-extrabold text-brand-navy">Internet & conectividade</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">{guide.internet}</p>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal className="mt-16" delay={60}>
            <section id="custos" className="text-left">
              <h2 className="font-headers text-3xl font-extrabold text-brand-navy">
                Custos médios em {guide.city}
              </h2>
              <div className="mt-6 overflow-x-auto rounded-[24px] border border-border-gray/80 bg-white">
                <table className="w-full border-collapse text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-border-gray/60 bg-bg-light font-headers text-brand-navy">
                      <th className="p-4 font-extrabold">Perfil</th>
                      <th className="p-4 font-extrabold">Orçamento diário</th>
                      <th className="p-4 font-extrabold">Hospedagem</th>
                      <th className="p-4 font-extrabold">Alimentação</th>
                      <th className="p-4 font-extrabold">Transporte</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-gray/40 text-text-muted">
                    {[
                      ['Econômico', guide.costsTable.economy],
                      ['Intermediário', guide.costsTable.comfort],
                      ['Luxo', guide.costsTable.luxury]
                    ].map(([label, row]) => (
                      <tr key={label}>
                        <td className="p-4 font-extrabold text-brand-navy">{label}</td>
                        <td className="p-4 font-bold text-brand-orange">{row.daily}</td>
                        <td className="p-4">{row.hotel}</td>
                        <td className="p-4">{row.food}</td>
                        <td className="p-4">{row.transport}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal className="mt-16" delay={60}>
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 text-left">
              <div className="rounded-[24px] border border-border-gray/70 bg-white p-6">
                <h3 className="font-headers mb-4 flex items-center gap-2 text-lg font-extrabold text-brand-navy">
                  <AlertTriangle className="h-5 w-5 text-brand-orange" /> Erros comuns
                </h3>
                <ul className="space-y-3 text-sm text-text-muted">
                  {guide.commonMistakes.map((err) => (
                    <li key={err} className="flex items-start gap-2.5">
                      <span className="text-brand-orange font-bold">•</span>
                      <span>{err}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[24px] border border-border-gray/70 bg-white p-6">
                <h3 className="font-headers mb-4 flex items-center gap-2 text-lg font-extrabold text-brand-navy">
                  <Info className="h-5 w-5 text-brand-navy" /> Dicas importantes
                </h3>
                <ul className="space-y-3 text-sm text-text-muted">
                  {guide.importantTips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2.5">
                      <span className="text-brand-navy font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal className="mt-12" delay={40}>
            <section className="grid grid-cols-1 gap-4 lg:grid-cols-3 text-left">
              <div className="rounded-[24px] bg-[#F7F8FA] p-6">
                <h3 className="font-headers text-lg font-extrabold text-brand-navy">Bate-volta</h3>
                <ul className="mt-3 space-y-2.5 text-sm text-text-muted">
                  {guide.dayTrips.map((trip) => (
                    <li key={trip} className="flex items-start gap-2">
                      <Compass className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-orange" />
                      <span>{trip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[24px] bg-[#F7F8FA] p-6">
                <h3 className="font-headers text-lg font-extrabold text-brand-navy">Gastronomia</h3>
                <ul className="mt-3 space-y-2.5 text-sm text-text-muted">
                  {guide.gastronomy.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-orange" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[24px] bg-[#F7F8FA] p-6">
                <h3 className="font-headers mb-3 flex items-center gap-2 text-lg font-extrabold text-brand-navy">
                  <ShoppingBag className="h-4 w-4 text-brand-orange" /> Compras & noite
                </h3>
                <ul className="space-y-2.5 text-sm text-text-muted">
                  {[...guide.shopping, ...guide.nightlife].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-orange" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </ScrollReveal>

          {guide.summaryText ? (
            <ScrollReveal className="mt-12" delay={40}>
              <section id="resumo-rapido" className="rounded-[24px] border border-border-gray/70 bg-white p-6 text-left sm:p-8">
                <h2 className="font-headers text-2xl font-extrabold text-brand-navy">
                  Resumo rápido
                </h2>
                <p className="mt-3 max-w-4xl text-sm leading-relaxed text-text-muted sm:text-base">
                  {guide.summaryText}
                </p>
              </section>
            </ScrollReveal>
          ) : null}

          <ScrollReveal className="mt-16" delay={60}>
            <section id="faq" className="text-left">
              <h2 className="font-headers mb-6 flex items-center gap-2 text-3xl font-extrabold text-brand-navy">
                <HelpCircle className="h-6 w-6 text-brand-orange" /> Perguntas frequentes
              </h2>
              <div className="space-y-3">
                {guide.faqs.map((faq, idx) => {
                  const open = openFaqIdx === idx;
                  return (
                    <div
                      key={faq.q}
                      className="overflow-hidden rounded-2xl border border-border-gray/80 bg-white shadow-2xs"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left transition-colors hover:bg-bg-light/50"
                        aria-expanded={open}
                      >
                        <span className="font-headers text-xs font-extrabold text-brand-navy sm:text-sm">
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 text-brand-orange transition-transform duration-300 ${
                            open ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <div className={`faq-panel ${open ? 'is-open' : ''}`}>
                        <div>
                          <div className="border-t border-border-gray/40 bg-bg-light/30 px-4 pb-4 pt-3 text-xs leading-relaxed text-text-muted sm:text-sm">
                            {faq.a}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </ScrollReveal>

          <ScrollReveal className="mt-16" delay={80}>
            <div className="relative overflow-hidden rounded-[32px] bg-brand-navy px-6 py-10 text-white shadow-md sm:px-12 sm:py-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 top-0 h-64 w-64 rounded-full bg-brand-orange/20 blur-3xl"
              />
              <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
                <div className="text-left lg:col-span-7">
                  <span className="font-headers mb-2 block text-[10px] font-extrabold uppercase tracking-widest text-brand-orange">
                    Leve {guide.city} no app
                  </span>
                  <h3 className="font-headers text-2xl font-extrabold leading-tight sm:text-3xl">
                    O dia a dia fica no aplicativo
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80">
                    Este guia é a prévia. Timeline, mapa e ajustes da viagem para {guide.city} você acompanha no app.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsDownloadOpen(true)}
                    className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-2xl bg-brand-orange px-8 py-4 text-sm font-extrabold text-white shadow-sm transition-all hover:bg-brand-orange/90 hover:-translate-y-0.5"
                  >
                    <span>Baixar o App</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex justify-center lg:col-span-5 lg:justify-end min-w-0 px-2">
                  <AppPhoneMockup variant={phoneVariantFor(guide)} size="lg" />
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-16 w-full">
            <NewsletterBox destinationName={guide.city} />
          </div>
        </div>
      </main>

      <Footer onOpenDownload={() => setIsDownloadOpen(true)} />

      <AppDownloadModal
        isOpen={isDownloadOpen}
        onClose={() => setIsDownloadOpen(false)}
      />
    </div>
  );
}

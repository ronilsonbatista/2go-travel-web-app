"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, Sliders, Navigation, ArrowRight } from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppDownloadModal from '@/components/AppDownloadModal';
import NewsletterBox from '@/components/NewsletterBox';
import AppPhoneMockup from '@/components/AppPhoneMockup';
import ScrollReveal from '@/components/ScrollReveal';

import { listDestinations } from '@/lib/cms';
import { destinationGuides } from '@/data/guidesData';

function sameCity(left, right) {
  const normalize = (value) => value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return normalize(left) === normalize(right);
}

const destinations = listDestinations();
const guides = Object.values(destinationGuides);

function guideForDestination(destination) {
  return guides.find((guide) => sameCity(guide.city, destination.name)) || null;
}

const guideOnlyCities = guides.filter((guide) => !destinations.some((destination) => sameCity(destination.name, guide.city)));

const CONTINENT_BY_COUNTRY = {
  'França': 'Europa',
  'Itália': 'Europa',
  'Portugal': 'Europa',
  'Reino Unido': 'Europa',
  'Grécia': 'Europa',
  'Noruega': 'Europa',
  'Turquia': 'Europa',
  'Europa': 'Europa',
  'Japão': 'Ásia',
  'Ásia': 'Ásia',
  'Emirados Árabes Unidos': 'Ásia',
  'Brasil': 'América do Sul',
  'Estados Unidos': 'América do Norte'
};

function continentOf(country) {
  return CONTINENT_BY_COUNTRY[country] || 'Outros';
}

const featuredGuides = [
  ...destinations.map((destination) => {
    const guide = guideForDestination(destination);
    return {
      name: destination.name,
      country: destination.country,
      continent: continentOf(destination.country),
      img: guide?.heroImage || destination.image,
      phrase: guide?.subtitle || destination.description,
      link: guide ? `/guias/${guide.slug}` : '/guias'
    };
  }),
  ...guideOnlyCities.map((guide) => ({
    name: guide.city,
    country: guide.country,
    continent: continentOf(guide.country),
    img: guide.heroImage,
    phrase: guide.subtitle,
    link: `/guias/${guide.slug}`
  }))
];

const CONTINENT_FILTERS = [
  { id: 'Todos', label: 'Todos' },
  { id: 'Europa', label: '🇪🇺 Europa' },
  { id: 'Ásia', label: '⛩️ Ásia' },
  { id: 'América do Sul', label: '🌴 América do Sul' },
  { id: 'América do Norte', label: '🏔️ América do Norte' },
  { id: 'África', label: '🦁 África' },
  { id: 'Oceania', label: '🌊 Oceania' }
].filter((item) => item.id === 'Todos' || featuredGuides.some((guide) => guide.continent === item.id));

const premiumSlides = [
  {
    id: 'paris',
    name: 'Paris, França',
    country: 'França',
    emoji: '🇫🇷',
    phrase: 'Arte, gastronomia e o charme do Rio Sena.',
    desc: 'Torre Eiffel ao entardecer com o reflexo das luzes no Rio Sena e o charme eterno da capital francesa.',
    tags: ['Cultura', 'Romance'],
    img: '/images/destinations/paris/paris-eiffel-seine.jpg',
    ctaLink: '/roteiros/paris-3-dias'
  },
  {
    id: 'ny',
    name: 'Nova York, Estados Unidos',
    country: 'Estados Unidos',
    emoji: '🇺🇸',
    phrase: 'Energia, cultura e experiências em cada esquina.',
    desc: 'O Empire State Building e o skyline de Manhattan ao entardecer com luzes urbanas elegantes e atmosfera cinematográfica.',
    tags: ['Urbano', 'Cultura'],
    img: '/images/destinations/nova-york/nova-york-1.jpg',
    ctaLink: '/guias/como-planejar-viagem-nova-york'
  },
  {
    id: 'tokyo',
    name: 'Tóquio, Japão',
    country: 'Japão',
    emoji: '🇯🇵',
    phrase: 'Tradição, tecnologia e experiências únicas.',
    desc: 'A majestosa Tokyo Tower iluminada durante a blue hour em harmonia entre a tradição e a vanguarda tecnológica.',
    tags: ['Cultura', 'Tecnologia'],
    img: '/images/destinations/toquio/toquio-1.jpg',
    ctaLink: '/roteiros/toquio-3-dias'
  },
  {
    id: 'rio',
    name: 'Rio de Janeiro, Brasil',
    country: 'Brasil',
    emoji: '🇧🇷',
    phrase: 'Praias, montanhas e paisagens inesquecíveis.',
    desc: 'Pão de Açúcar ao pôr do sol em tons suaves de fim de tarde e natureza exuberante.',
    tags: ['Praias', 'Natureza'],
    img: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1400&q=85',
    ctaLink: '/roteiros?search=Rio de Janeiro'
  },
  {
    id: 'roma',
    name: 'Roma, Itália',
    country: 'Itália',
    emoji: '🇮🇹',
    phrase: 'História, arte e monumentos a céu aberto.',
    desc: 'O Coliseu ao entardecer em luz quente moderada e atmosfera histórica incomparável.',
    tags: ['História', 'Gastronomia'],
    img: '/images/destinations/roma/roma-coliseu.jpg',
    ctaLink: '/roteiros/roma-3-dias'
  },
  {
    id: 'londres',
    name: 'Londres, Reino Unido',
    country: 'Reino Unido',
    emoji: '🇬🇧',
    phrase: 'História, cultura e ícones reconhecidos no mundo inteiro.',
    desc: 'Big Ben e o Palácio de Westminster durante a blue hour com tons frios e refinados.',
    tags: ['Cultura', 'História'],
    img: '/images/destinations/londres/londres-1.jpg',
    ctaLink: '/roteiros/londres-3-dias'
  },
  {
    id: 'istanbul',
    name: 'Istambul, Turquia',
    country: 'Turquia',
    emoji: '🇹🇷',
    phrase: 'Onde Europa e Ásia se encontram.',
    desc: 'A vista do Bósforo e das mesquitas seculares ao pôr do sol em suaves tons terrosos.',
    tags: ['História', 'Cultura'],
    img: '/images/destinations/istambul/istambul-1.jpg',
    ctaLink: '/guias/como-planejar-viagem-istambul'
  },
  {
    id: 'sydney',
    name: 'Sydney, Austrália',
    country: 'Austrália',
    emoji: '🇦🇺',
    phrase: 'Praias, natureza e arquitetura icônica.',
    desc: 'A Opera House de Sydney em blue hour com o skyline noturno refletido nas águas da baía.',
    tags: ['Praias', 'Arquitetura'],
    img: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1400&q=85',
    ctaLink: '/roteiros?search=Sydney'
  },
  {
    id: 'bangkok',
    name: 'Bangkok, Tailândia',
    country: 'Tailândia',
    emoji: '🇹🇭',
    phrase: 'Templos, sabores e uma cidade cheia de vida.',
    desc: 'A silhueta inconfundível do templo Wat Arun no Rio Chao Phraya durante a luz serena do entardecer.',
    tags: ['Cultura', 'Gastronomia'],
    img: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1400&q=85',
    ctaLink: '/roteiros?search=Bangkok'
  },
  {
    id: 'amsterdam',
    name: 'Amsterdã, Países Baixos',
    country: 'Países Baixos',
    emoji: '🇳🇱',
    phrase: 'Canais, cultura e charme em cada rua.',
    desc: 'Os canais seculares ao anoitecer com luzes acolhedoras refletidas na água e arquitetura histórica.',
    tags: ['Cultura', 'Canais'],
    img: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&w=1400&q=85',
    ctaLink: '/roteiros?search=Amsterdã'
  }
];

const publishedDestinationCount = destinations.length + guideOnlyCities.length;

// Dynamic CSS filters per destination for a cinematic, elegant, lower-saturation look
const getSlideFilterClass = (id) => {
  switch (id) {
    case 'paris':
      return 'brightness-[0.84] contrast-[1.04] saturate-[0.76]';
    case 'ny':
      return 'brightness-[0.82] contrast-[1.05] saturate-[0.78]';
    case 'tokyo':
      return 'brightness-[0.83] contrast-[1.04] saturate-[0.74]';
    case 'rio':
      return 'brightness-[0.85] contrast-[1.03] saturate-[0.80]';
    case 'roma':
      return 'brightness-[0.84] contrast-[1.05] saturate-[0.76]';
    case 'londres':
      return 'brightness-[0.82] contrast-[1.05] saturate-[0.72]';
    case 'istanbul':
      return 'brightness-[0.84] contrast-[1.04] saturate-[0.78]';
    case 'sydney':
      return 'brightness-[0.83] contrast-[1.05] saturate-[0.75]';
    case 'bangkok':
      return 'brightness-[0.84] contrast-[1.04] saturate-[0.78]';
    case 'amsterdam':
      return 'brightness-[0.82] contrast-[1.06] saturate-[0.74]';
    default:
      return 'brightness-[0.83] contrast-[1.04] saturate-[0.76]';
  }
};

// Dynamic warm overlay opacity to add life to specific destinations
const getSlideWarmOverlayStyle = (id) => {
  return 'rgba(0, 0, 0, 0)';
};

// Dynamic subtle dark overlay to enhance depth and text readability
const getSlideDarkOverlayStyle = (id) => {
  return 'linear-gradient(to top, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.15) 50%, rgba(0, 0, 0, 0.02) 100%)';
};

// Dynamic subtle text shadow for Hero text readability
const getHeroTextShadow = (id) => {
  return { textShadow: '0 1px 8px rgba(0,0,0,0.15)' };
};


export default function Home() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [guideContinent, setGuideContinent] = useState('Todos');

  // Auto transition for Hero Carousel
  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % premiumSlides.length);
    }, 6000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 100 / 60, 100));
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [currentSlide]);

  const selectSlide = (idx) => {
    setCurrentSlide(idx);
    setProgress(0);
  };

  return (
    <div className="w-full bg-white min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy overflow-x-clip">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />
      
      <main className="flex-grow">
        {/* 1. NEW CINEMATIC HERO SECTION */}
        <section className="relative min-h-[60vh] lg:min-h-screen flex items-center justify-start pt-[64px] pb-12 lg:pt-[78px] lg:pb-20 overflow-hidden bg-bg-light text-brand-navy">
          {/* Parallax Background Crossfade */}
          <div className="absolute inset-0 z-0 select-none pointer-events-none">
            {premiumSlides.map((slide, idx) => (
              <div
                key={slide.id}
                className={`absolute inset-0 bg-cover bg-center transition-all duration-[1200ms] ${
                  idx === currentSlide ? 'opacity-[0.88] scale-102' : 'opacity-0 scale-100'
                } ${getSlideFilterClass(slide.id)}`}
                style={{ 
                  backgroundImage: `url(${slide.img})`,
                  transform: idx === currentSlide ? 'scale(1.05)' : 'scale(1)',
                  transition: 'opacity 1200ms ease-in-out, transform 5500ms linear'
                }}
              />
            ))}
            {/* Subtle dark overlay for image depth and text contrast */}
            <div 
              className="absolute inset-0 z-5 pointer-events-none transition-all duration-[1200ms]" 
              style={{
                backgroundImage: getSlideDarkOverlayStyle(premiumSlides[currentSlide].id)
              }}
            />
            {/* Elegant light linear overlay (Option A - Editorial Style) */}
            <div 
              className="absolute inset-0 z-10 pointer-events-none" 
              style={{
                backgroundImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0.70) 0%, rgba(255, 255, 255, 0.45) 35%, rgba(255, 255, 255, 0.15) 100%)'
              }}
            />
            
            {/* Soft backdrop blur on the left side behind the text panel */}
            <div 
              className="absolute top-0 left-0 w-full lg:w-[55%] h-full z-10 pointer-events-none"
              style={{
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
                maskImage: 'linear-gradient(90deg, black 0%, rgba(0, 0, 0, 0.6) 60%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(90deg, black 0%, rgba(0, 0, 0, 0.6) 60%, transparent 100%)'
              }}
            />
            <div 
              className="absolute inset-0 z-10 pointer-events-none animate-fade-in" 
              style={{
                backgroundImage: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.35) 100%)'
              }}
            />
            {/* Warm overlay to add life to photos */}
            <div 
              className="absolute inset-0 z-10 pointer-events-none transition-all duration-[1200ms]" 
              style={{
                backgroundColor: getSlideWarmOverlayStyle(premiumSlides[currentSlide].id)
              }}
            />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 max-w-[1440px] w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* Left text panel */}
              <div className="lg:col-span-7 flex flex-col items-center sm:items-start text-left">
                <div 
                  className="w-full max-w-3xl bg-white/26 backdrop-blur-[6px] lg:backdrop-blur-[10px] border border-white/30 lg:border-white/35 shadow-[0_15px_45px_rgba(8,27,107,0.06)] lg:shadow-[0_20px_60px_rgba(8,27,107,0.08)] p-4 sm:p-8 md:p-10 rounded-[20px] lg:rounded-[28px] flex flex-col gap-3.5 lg:gap-6 animate-fade-in-up items-center sm:items-start"
                >
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                    <span className="bg-[#F47A20] text-white text-[10px] sm:text-[12px] font-black tracking-wide px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full w-fit shadow-md shadow-[#F47A20]/15">
                      Roteiros personalizados
                    </span>
                    <span className="bg-brand-navy/5 border border-brand-navy/10 text-brand-navy text-[10px] sm:text-[12px] font-bold tracking-wide px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full w-fit flex items-center gap-1">
                      📍 {premiumSlides[currentSlide].country}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 lg:gap-2 text-center sm:text-left w-full">
                    <h1 
                      style={getHeroTextShadow(premiumSlides[currentSlide].id)} 
                      className="font-headers text-brand-navy font-extrabold text-[30px] sm:text-[46px] lg:text-[clamp(56px,6vw,88px)] leading-[1.0] lg:leading-[0.95] tracking-[-0.03em] max-w-2xl transition-all duration-500 overflow-wrap-normal"
                    >
                      {premiumSlides[currentSlide].name}
                    </h1>
                    <p 
                      style={getHeroTextShadow(premiumSlides[currentSlide].id)} 
                      className="font-headers text-brand-navy font-bold text-base sm:text-xl lg:text-[1.38rem] leading-snug tracking-tight max-w-xl hidden sm:block"
                    >
                      A sua próxima viagem, planejada em minutos.
                    </p>
                  </div>
                  
                  <p 
                    style={getHeroTextShadow(premiumSlides[currentSlide].id)} 
                    className="text-xs sm:text-base text-brand-navy/80 leading-relaxed max-w-xl line-clamp-2 sm:line-clamp-none text-center sm:text-left font-medium"
                  >
                    A 2GO cria roteiros personalizados e une tecnologia, curadoria e praticidade para você viajar do seu jeito.
                  </p>
                  
                  <div className="flex items-center mt-0.5 bg-brand-navy/5 border border-brand-navy/10 px-3.5 py-2 rounded-xl w-full max-w-full text-xs sm:text-sm">
                    <span className="text-brand-navy/85 text-sm italic font-medium break-words">"{premiumSlides[currentSlide].phrase}"</span>
                  </div>
                  
                  <div className="hidden lg:flex flex-col gap-2 mt-2 w-full sm:w-auto items-center sm:items-start">
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => setIsDownloadOpen(true)}
                        className="w-full max-w-[280px] sm:w-auto bg-[#F47A20] hover:bg-[#ff8f3c] text-white font-extrabold px-8 py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] border-none"
                      >
                        Baixar o App
                      </button>
                      <Link
                        href="/roteiros"
                        className="w-full max-w-[280px] sm:w-auto border border-brand-navy text-brand-navy hover:bg-brand-navy/5 bg-transparent font-bold px-8 py-3.5 rounded-xl transition-all inline-flex items-center justify-center"
                      >
                        Ver roteiros
                      </Link>
                    </div>
                    <p className="text-[11px] text-brand-navy/60 font-semibold tracking-wide mt-1 text-center sm:text-left">
                      A prévia fica no site. O dia a dia, no aplicativo.
                    </p>
                  </div>

                  <div className="lg:hidden mt-1">
                    <button
                      type="button"
                      onClick={() => setIsDownloadOpen(true)}
                      className="inline-flex items-center gap-1.5 text-sm font-extrabold text-brand-orange hover:text-brand-orange/80 transition-all cursor-pointer pb-1 border-b-2 border-brand-orange/20 hover:border-brand-orange"
                    >
                      <span>Baixar o App</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full max-w-md bg-brand-navy/10 h-1 rounded-full overflow-hidden mt-1">
                    <div 
                      className="bg-brand-orange h-full transition-all duration-100 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Micro Provas */}
                  <div className="hidden sm:flex flex-wrap justify-center sm:justify-start items-center gap-4 sm:gap-6 mt-2 text-xs sm:text-sm text-brand-navy/80 font-medium border-t border-brand-navy/10 pt-4 max-w-md w-full">
                    <span className="flex items-center gap-1.5">
                      <span className="text-yellow-500">★</span> 4,9 de avaliação
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-brand-orange">🌍</span> {publishedDestinationCount} destinos publicados
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-brand-green">⚡</span> Roteiros em poucos minutos
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Columns: Interactive Side Slider Previews (Apple TV Style) */}
              <div className="lg:col-span-5 flex flex-col lg:border-l lg:border-brand-navy/10 lg:pl-8 mt-6 lg:mt-0 w-full overflow-hidden">
                <span className="text-[11px] lg:text-[12px] font-black text-brand-navy/60 tracking-wide mb-2 lg:mb-3 block text-center lg:text-left">Mais destinos</span>
                
                <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible lg:overflow-y-visible gap-2 pb-4 lg:pb-0 custom-scrollbar-hide flex-nowrap lg:flex-wrap w-full px-1 lg:px-0 snap-x snap-mandatory scroll-smooth">
                  {premiumSlides.map((slide, idx) => {
                    const isSelected = idx === currentSlide;
                    return (
                      <button
                        key={slide.id}
                        onClick={() => selectSlide(idx)}
                        className={`group flex items-center gap-2.5 p-2 lg:p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer shrink-0 w-[185px] lg:w-full snap-start ${
                          isSelected 
                            ? 'bg-white/75 border-white/50 shadow-md border-l-4 border-l-[#F47A20] backdrop-blur-md pl-3 text-brand-navy font-bold' 
                            : 'bg-brand-navy/5 border-brand-navy/5 border-l-4 border-l-transparent hover:bg-brand-navy/10 text-brand-navy/70 pl-3'
                        }`}
                      >
                        <div className="w-9 h-9 lg:w-12 lg:h-12 rounded-lg overflow-hidden shrink-0 border border-brand-navy/10 relative">
                          <img src={slide.img} alt={slide.name} className="w-full h-full object-cover transition-transform group-hover:scale-[1.03]" />
                        </div>
                        <div className="min-w-0 flex-1 flex flex-col justify-center">
                          <h4 className={`text-xs lg:text-sm font-extrabold truncate ${isSelected ? 'text-brand-navy font-black' : 'text-brand-navy/80 group-hover:text-brand-navy'}`}>{slide.name}</h4>
                          <p className="text-[11px] lg:text-[13px] font-medium line-clamp-1 lg:line-clamp-2 mt-0.5 leading-snug whitespace-normal text-brand-navy/60 group-hover:text-brand-navy/80">{slide.phrase}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 2. COMO FUNCIONA */}
        <section id="como-funciona" className="py-12 lg:py-28 bg-[#F4F6F9] border-b border-border-gray/50 scroll-mt-20">
          <ScrollReveal className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] w-full">
            <div className="text-center max-w-[720px] mx-auto mb-14 md:mb-16">
              <span className="bg-brand-orange/10 text-brand-orange text-[12px] font-extrabold tracking-wide px-3.5 py-1.5 rounded-full w-fit">
                Máxima praticidade
              </span>
              <h2 className="font-headers text-3.5xl font-black mt-4 text-brand-navy tracking-tight">
                Do sonho ao roteiro em 3 passos
              </h2>
              <p className="text-sm text-text-muted mt-3 font-medium">
                O site mostra o destino. No aplicativo, a 2GO organiza o dia, o horário e o mapa.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto w-full">
              {/* Step 1 */}
              <div className="group relative bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] lg:rounded-[24px] shadow-sm flex flex-col items-start text-left w-full">
                <span className="font-headers text-6xl font-extrabold text-brand-orange/20 absolute top-6 right-8 leading-none select-none group-hover:scale-105 transition-transform duration-300">1</span>
                <div className="w-12 h-12 rounded-[16px] bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-6 transition-transform group-hover:rotate-6 duration-300">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-headers text-lg font-bold text-brand-navy mb-2">Planeje no App</h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-md">
                  Escolha o destino e preencha suas preferências de viagem em poucos passos.
                </p>
              </div>

              {/* Step 2 */}
              <div className="group relative bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] lg:rounded-[24px] shadow-sm flex flex-col items-start text-left w-full">
                <span className="font-headers text-6xl font-extrabold text-brand-orange/20 absolute top-6 right-8 leading-none select-none group-hover:scale-105 transition-transform duration-300">2</span>
                <div className="w-12 h-12 rounded-[16px] bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-6 transition-transform group-hover:rotate-6 duration-300">
                  <Sliders className="w-6 h-6" />
                </div>
                <h3 className="font-headers text-lg font-bold text-brand-navy mb-2">Roteiro organizado</h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-md">
                  A 2GO organiza seu roteiro por dia, horário, atrações e deslocamentos sob medida.
                </p>
              </div>

              {/* Step 3 */}
              <div className="group relative bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] lg:rounded-[24px] shadow-sm flex flex-col items-start text-left w-full">
                <span className="font-headers text-6xl font-extrabold text-brand-orange/20 absolute top-6 right-8 leading-none select-none group-hover:scale-105 transition-transform duration-300">3</span>
                <div className="w-12 h-12 rounded-[16px] bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-6 transition-transform group-hover:rotate-6 duration-300">
                  <Navigation className="w-6 h-6" />
                </div>
                <h3 className="font-headers text-lg font-bold text-brand-navy mb-2">Acompanhe no App</h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-md">
                  Edite, salve, compartilhe seu roteiro offline e receba sugestões personalizadas por destino em tempo real.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <section id="destinos" className="py-12 lg:py-28 bg-[#F7F8FA] border-b border-border-gray/50 relative scroll-mt-20">
          <ScrollReveal className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
              <div className="text-left max-w-3xl">
                <span className="bg-brand-orange/10 text-brand-orange text-[12px] font-extrabold tracking-wide px-3.5 py-1.5 rounded-full w-fit">
                  Destinos em destaque
                </span>
                <p className="text-sm text-text-muted mt-2">
                  Guias publicados para conhecer o destino antes de embarcar.
                </p>
              </div>
              <Link
                href="/guias"
                className="text-sm font-bold text-brand-orange hover:text-[#96AB21] flex items-center gap-1 transition-colors whitespace-nowrap cursor-pointer"
              >
                Ver todos &rarr;
              </Link>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-4 mb-4 custom-scrollbar-hide flex-nowrap border-b border-border-gray/30 min-w-0 max-w-full">
              {CONTINENT_FILTERS.map((cat) => {
                const selected = guideContinent === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setGuideContinent(cat.id)}
                    className={`px-4 sm:px-5 py-2.5 rounded-full border text-xs sm:text-sm font-extrabold shrink-0 transition-all duration-300 shadow-sm cursor-pointer ${
                      selected
                        ? 'bg-brand-navy text-white border-brand-navy'
                        : 'bg-white border-border-gray/70 text-brand-navy hover:border-[#96AB21] hover:text-[#96AB21]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 custom-scrollbar-hide snap-x snap-mandatory min-w-0 max-w-full">
              {featuredGuides
                .filter((dest) => guideContinent === 'Todos' || dest.continent === guideContinent)
                .map((dest) => (
                  <Link
                    key={`${dest.name}-${dest.country}`}
                    href={dest.link}
                    className="group relative h-96 w-[min(18rem,78vw)] sm:w-72 shrink-0 rounded-[24px] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500 ease-out border border-border-gray card-premium-hover snap-start"
                  >
                    <img
                      src={dest.img}
                      alt={dest.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 text-left text-white">
                      <p className="text-[10px] font-extrabold tracking-wide text-brand-orange uppercase">Guia de Viagem</p>
                      <h4 className="font-headers text-base font-extrabold text-white mt-1 group-hover:text-brand-orange transition-colors">
                        {dest.name}, {dest.country}
                      </h4>
                      <p className="text-[12px] text-white/80 line-clamp-2 mt-1 leading-snug">{dest.phrase}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </ScrollReveal>
        </section>

        {/* 7. TESTIMONIALS */}
        <section id="avaliacoes" className="py-12 lg:py-28 bg-white border-b border-border-gray/50 scroll-mt-20">
          <ScrollReveal className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] w-full">
            <div className="text-center max-w-[720px] mx-auto mb-10 md:mb-16">
              <span className="bg-brand-navy/10 text-brand-navy text-[12px] font-extrabold tracking-wide px-3 py-1 rounded-full w-fit">
                Depoimentos
              </span>
              <h2 className="font-headers text-3xl md:text-3.5xl font-black mt-4 text-brand-navy tracking-tight">
                Viajantes 2GO
              </h2>
              <p className="text-sm text-text-muted mt-3">
                Histórias reais de quem organizou a rota em minutos e viajou sem dor de cabeça.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1200px] mx-auto w-full">
              {[
                { 
                  name: 'Amanda Martins', 
                  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80', 
                  text: 'O dia a dia ficou claro antes mesmo de embarcar.', 
                  trip: 'Noronha • Roteiro no App',
                  badgeColor: 'bg-brand-orange/10 text-brand-orange'
                },
                { 
                  name: 'Rodrigo Fonseca', 
                  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80', 
                  text: 'Sentimos que o roteiro tinha sido feito para nós.', 
                  trip: 'Tóquio • Roteiro no App',
                  badgeColor: 'bg-brand-green/10 text-brand-green'
                },
                { 
                  name: 'Luísa Cavalcanti', 
                  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80', 
                  text: 'Economizei semanas de pesquisa.', 
                  trip: 'Lisboa • Roteiro no App',
                  badgeColor: 'bg-brand-orange/10 text-brand-orange'
                }
              ].map((review, idx) => (
                <div key={idx} className="group bg-[#F7F8FA] border border-border-gray/70 p-6 sm:p-8 rounded-2xl lg:rounded-[24px] shadow-xs hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 flex flex-col text-left card-premium-hover">
                  <span className={`text-[11px] font-extrabold tracking-wide px-2.5 py-1 rounded w-fit mb-6 ${review.badgeColor}`}>Feedback verificado</span>
                  <p className="text-base italic leading-relaxed mb-6 flex-grow font-semibold text-brand-navy">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-3.5 mt-auto pt-4 border-t border-border-gray/30">
                    <img 
                      src={review.avatar} 
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover border border-brand-navy/10 transition-transform group-hover:scale-105 duration-300"
                    />
                    <div className="flex flex-col">
                      <h4 className="text-xs font-extrabold text-brand-navy">{review.name}</h4>
                      <span className="text-[12px] text-text-muted leading-none mt-1">{review.trip}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* 8. FINAL CTA (CLEAN REDESIGN) */}
        <section className="py-12 lg:py-28 bg-[#F7F8FA] relative overflow-hidden">
          <div className="absolute top-10 left-10 w-2.5 h-2.5 bg-brand-orange/40 rounded-full"></div>
          <div className="absolute bottom-20 left-1/3 w-3 h-3 bg-brand-green/30 rounded-full"></div>

          <ScrollReveal className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] w-full">
            <div className="bg-[#FAF9F6] text-brand-navy p-6 md:p-16 rounded-[28px] lg:rounded-[32px] relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center gap-12 text-left shadow-lg border border-brand-navy/5">
              {/* Subtle background glow */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none select-none"></div>
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#96AB21]/10 rounded-full blur-[100px] pointer-events-none select-none"></div>

              <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 relative z-10 w-full">
                <span className="bg-brand-orange text-white text-[11px] font-extrabold tracking-widest px-2.5 py-1 rounded-full w-fit">
                  Roteiros personalizados
                </span>
                <h2 className="font-headers text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-brand-navy">
                  Seus roteiros ganham vida no app
                </h2>
                <p className="text-sm md:text-base text-text-muted leading-relaxed">
                  Veja destinos aqui. Timeline, mapa e ajustes ficam no aplicativo.
                </p>
                
                <div className="flex flex-col gap-2 mt-2 w-full sm:w-auto items-center sm:items-start">
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setIsDownloadOpen(true)}
                      className="bg-[#F47A20] hover:bg-[#ff8f3c] text-white font-extrabold px-8 py-4 rounded-xl shadow-md shadow-brand-orange/20 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.01] active:scale-95 border-none"
                    >
                      Baixar o App
                    </button>
                    <Link
                      href="/roteiros"
                      className="border border-brand-navy/30 text-brand-navy hover:bg-brand-navy/5 font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center bg-transparent"
                    >
                      Ver roteiros
                    </Link>
                  </div>
                  <p className="text-[11px] text-brand-navy/60 font-semibold tracking-wide mt-1">
                    A prévia fica no site. O dia a dia, no aplicativo.
                  </p>
                </div>
              </div>
              
              <div className="lg:col-span-5 relative z-10 flex justify-center items-center w-full min-w-0 py-2 sm:py-4 px-2">
                <AppPhoneMockup variant="paris" size="md" />
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 9. NEWSLETTER */}
        <section className="pb-20 bg-[#F7F8FA]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px]">
            <NewsletterBox />
          </div>
        </section>
      </main>

      <Footer onOpenDownload={() => setIsDownloadOpen(true)} />
      
      <AppDownloadModal 
        isOpen={isDownloadOpen} 
        onClose={() => setIsDownloadOpen(false)} 
      />
    </div>
  );
}

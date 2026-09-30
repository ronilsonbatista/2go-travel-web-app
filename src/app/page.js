"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Compass, 
  Sliders, 
  Navigation, 
  ArrowRight, 
  Clock, 
  Map, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Calendar,
  Check,
  MessageSquare,
  Sparkles,
  Heart,
  Plane,
  Utensils,
  Star
} from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppDownloadModal from '@/components/AppDownloadModal';
import NewsletterBox from '@/components/NewsletterBox';
import { listDestinations, listItinerariesForDestination } from '@/lib/cms';
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

const premiumSlides = destinations
  .filter((destination) => listItinerariesForDestination(destination.slug).length > 0)
  .map((destination) => {
    const guide = guideForDestination(destination);
    const itinerary = listItinerariesForDestination(destination.slug)[0];
    return {
      id: destination.slug,
      name: `${destination.name}, ${destination.country}`,
      country: destination.country,
      emoji: destination.emoji,
      phrase: destination.description,
      desc: guide?.summaryText || destination.longDescription || destination.description,
      tags: guide ? [guide.categoryLabel] : [],
      img: guide?.heroImage || destination.image,
      ctaLink: `/roteiros/${itinerary.slug}`
    };
  });

const featuredDestinations = [
  ...destinations.map((destination) => {
    const guide = guideForDestination(destination);
    const itinerary = listItinerariesForDestination(destination.slug)[0];
    return {
      name: destination.name,
      country: destination.country,
      img: guide?.heroImage || destination.image,
      phrase: destination.description,
      link: itinerary
        ? `/roteiros/${itinerary.slug}`
        : (guide ? `/blog/${guide.slug}` : `/o-que-fazer/${destination.slug}`)
    };
  }),
  ...guideOnlyCities.map((guide) => ({
    name: guide.city,
    country: guide.country,
    img: guide.heroImage,
    phrase: guide.subtitle,
    link: `/blog/${guide.slug}`
  }))
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

function ScrollReveal({ children, className = '', delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );
    
    const current = domRef.current;
    if (current) {
      observer.observe(current);
    }
    
    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const simResults = {
  'Japão': [
    { day: 'DIA 1', title: 'Tóquio Cultural', items: [
      { emoji: '⛩️', place: 'Templo Senso-ji em Asakusa', desc: 'Visita agendada para primeiras horas da manhã (evitando filas).' },
      { emoji: '🗼', place: 'Shinjuku Sky & Jantar Típico', desc: 'Jantar tradicional sugerido no beco histórico Omoide Yokocho.' }
    ]},
    { day: 'DIA 2', title: 'Monte Fuji & Hakone', items: [
      { emoji: '🗻', place: 'Lago Ashi & Vista do Monte Fuji', desc: 'Passeio de catamarã pelo lago com paradas no Tori flutuante.' }
    ]},
    { day: 'DIA 3', title: 'Kyoto Clássico', items: [
      { emoji: '🌸', place: 'Santuário de Fushimi Inari-taisha', desc: 'Caminhada sob os milhares de Torii tradicionais ladeando a floresta.' }
    ]}
  ],
  'França': [
    { day: 'DIA 1', title: 'Paris Romântico', items: [
      { emoji: '🗼', place: 'Torre Eiffel & Jardins do Trocadéro', desc: 'Subida ao topo no entardecer para ver as luzes se acenderem.' },
      { emoji: '⛵', place: 'Cruzeiro no Rio Sena', desc: 'Passeio noturno com guia histórico passando por pontes famosas.' }
    ]},
    { day: 'DIA 2', title: 'Louvre & Arte', items: [
      { emoji: '🎨', place: 'Museu do Louvre (Acesso Rápido)', desc: 'Roteiro guiado de 2h focando nas principais obras de arte.' }
    ]},
    { day: 'DIA 3', title: 'Charme de Montmartre', items: [
      { emoji: '⛪', place: 'Basílica de Sacré-Cœur', desc: 'Passeio pelas ruelas dos artistas e almoço em bistrô tradicional.' }
    ]}
  ],
  'Itália': [
    { day: 'DIA 1', title: 'Roma Antiga', items: [
      { emoji: '🏛️', place: 'Coliseu & Fórum Romano', desc: 'Entrada prioritária com guia arqueológico especializado.' },
      { emoji: '⛲', place: 'Fontana di Trevi & Panteão', desc: 'Caminhada clássica de fim de tarde para jogar a moeda.' }
    ]},
    { day: 'DIA 2', title: 'Vaticano & Museus', items: [
      { emoji: '🇻🇦', place: 'Capela Sistina & Basílica de S. Pedro', desc: 'Visita matinal sem filas e subida à cúpula para vista panorâmica.' }
    ]},
    { day: 'DIA 3', title: 'Sabores de Trastevere', items: [
      { emoji: '🍝', place: 'Jantar Gastronômico', desc: 'Degustação de massas clássicas e vinhos artesanais da região.' }
    ]}
  ],
  'Brasil': [
    { day: 'DIA 1', title: 'Baía do Sancho', items: [
      { emoji: '🐢', place: 'Praia do Sancho & Snorkel', desc: 'Mergulho guiado com tartarugas marinhas e arraias nas águas cristalinas.' },
      { emoji: '🌅', place: 'Pôr do sol no Boldró', desc: 'Mirante clássico com vista para os dois irmãos.' }
    ]},
    { day: 'DIA 2', title: 'Ilha Tour Completo', items: [
      { emoji: '🚙', place: 'Tour 4x4 por praias intocadas', desc: 'Visita guiada passando por cacimba do padre, baía dos porcos e leão.' }
    ]},
    { day: 'DIA 3', title: 'Piscinas do Atalaia', items: [
      { emoji: '🐠', place: 'Trilha do Atalaia & Flutuação', desc: 'Flutuação monitorada nas piscinas de corais com peixes tropicais.' }
    ]}
  ]
};

export default function Home() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  // Simulation states for "Veja seu roteiro tomando forma"
  const [simProgress, setSimProgress] = useState(0);
  const [simState, setSimState] = useState('idle'); // 'idle' | 'running' | 'done'
  const [visibleDays, setVisibleDays] = useState([]);
  const [simDest, setSimDest] = useState('Japão');
  const [simDays, setSimDays] = useState('3 dias');
  const [simComp, setSimComp] = useState('Casal');
  const [simSty, setSimSty] = useState('Cultura & Templos');

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

  // Run real-time simulation
  const startSimulation = () => {
    setSimState('running');
    setSimProgress(5);
    setVisibleDays([]);

    const timers = [
      setTimeout(() => setSimProgress(35), 600),
      setTimeout(() => {
        setSimProgress(65);
        setVisibleDays(prev => [...prev, 'day1']);
      }, 1500),
      setTimeout(() => {
        setSimProgress(85);
        setVisibleDays(prev => [...prev, 'day2']);
      }, 2600),
      setTimeout(() => {
        setSimProgress(100);
        setVisibleDays(prev => [...prev, 'day3']);
        setSimState('done');
      }, 3600)
    ];

    return () => timers.forEach(clearTimeout);
  };

  return (
    <div className="w-full bg-white min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
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

          <div className="container mx-auto px-4 sm:px-6 relative z-20 max-w-6xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left text panel */}
              <div className="lg:col-span-7 flex flex-col items-center sm:items-start text-left">
                <div 
                  className="w-full max-w-2xl bg-white/26 backdrop-blur-[6px] lg:backdrop-blur-[10px] border border-white/30 lg:border-white/35 shadow-[0_15px_45px_rgba(8,27,107,0.06)] lg:shadow-[0_20px_60px_rgba(8,27,107,0.08)] p-4 sm:p-8 md:p-10 rounded-[20px] lg:rounded-[28px] flex flex-col gap-3.5 lg:gap-6 animate-fade-in-up items-center sm:items-start"
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
                  
                  {/* Desktop CTA buttons */}
                  <div className="hidden lg:flex flex-col gap-2 mt-2 w-full sm:w-auto items-center sm:items-start">
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      <Link 
                        href="/planejamento"
                        className="w-full max-w-[280px] sm:w-auto bg-[#F47A20] hover:bg-[#ff8f3c] text-white font-extrabold px-8 py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] border-none"
                      >
                        Criar roteiro
                      </Link>
                      <button 
                        onClick={() => setIsDownloadOpen(true)}
                        className="w-full max-w-[280px] sm:w-auto border border-brand-navy text-brand-navy hover:bg-brand-navy/5 bg-transparent font-bold px-8 py-3.5 rounded-xl transition-all"
                      >
                        Baixar App
                      </button>
                    </div>
                    <p className="text-[11px] text-brand-navy/60 font-semibold tracking-wide mt-1 text-center sm:text-left">
                      Planeje agora e leve tudo no aplicativo.
                    </p>
                  </div>

                  {/* Mobile Discrete Link CTA */}
                  <div className="lg:hidden mt-1">
                    <Link 
                      href="/planejamento"
                      className="inline-flex items-center gap-1.5 text-sm font-extrabold text-brand-orange hover:text-brand-orange/80 transition-all cursor-pointer pb-1 border-b-2 border-brand-orange/20 hover:border-brand-orange"
                    >
                      <span>Criar roteiro</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
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
          <ScrollReveal className="container mx-auto px-4 sm:px-6 max-w-6xl w-full">
            <div className="text-center max-w-[600px] mx-auto mb-14 md:mb-16">
              <span className="bg-brand-orange/10 text-brand-orange text-[12px] font-extrabold tracking-wide px-3.5 py-1.5 rounded-full w-fit">
                Máxima praticidade
              </span>
              <h2 className="font-headers text-3.5xl font-black mt-4 text-brand-navy tracking-tight">
                Do sonho ao roteiro em 3 passos
              </h2>
              <p className="text-sm text-text-muted mt-3 font-medium">
                <span className="text-brand-orange font-bold">A tecnologia organiza. Especialistas aperfeiçoam.</span> O planejamento simplificado e as atrações organizadas unidos para criar sua próxima experiência sob medida.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto w-full">
              {/* Step 1 */}
              <Link href="/planejamento" className="group relative bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] lg:rounded-[24px] shadow-sm hover:shadow-md hover:translate-y-[-4px] hover:border-brand-orange/20 transition-all duration-300 flex flex-col items-start text-left card-premium-hover cursor-pointer w-full">
                <span className="font-headers text-6xl font-extrabold text-brand-orange/20 absolute top-6 right-8 leading-none select-none group-hover:scale-105 transition-transform duration-300">1</span>
                <div className="w-12 h-12 rounded-[16px] bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-6 transition-transform group-hover:rotate-6 duration-300">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-headers text-lg font-bold text-brand-navy mb-2">Planeje no App</h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-md">
                  Escolha o destino e preencha suas preferências de viagem em poucos passos.
                </p>
              </Link>

              {/* Step 2 */}
              <Link href="/planejamento" className="group relative bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] lg:rounded-[24px] shadow-sm hover:shadow-md hover:translate-y-[-4px] hover:border-brand-orange/20 transition-all duration-300 flex flex-col items-start text-left card-premium-hover cursor-pointer w-full">
                <span className="font-headers text-6xl font-extrabold text-brand-orange/20 absolute top-6 right-8 leading-none select-none group-hover:scale-105 transition-transform duration-300">2</span>
                <div className="w-12 h-12 rounded-[16px] bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-6 transition-transform group-hover:rotate-6 duration-300">
                  <Sliders className="w-6 h-6" />
                </div>
                <h3 className="font-headers text-lg font-bold text-brand-navy mb-2">Roteiro organizado</h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-md">
                  A 2GO organiza seu roteiro por dia, horário, atrações e deslocamentos sob medida.
                </p>
              </Link>

              {/* Step 3 */}
              <Link href="/planejamento" className="group relative bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] lg:rounded-[24px] shadow-sm hover:shadow-md hover:translate-y-[-4px] hover:border-brand-orange/20 transition-all duration-300 flex flex-col items-start text-left card-premium-hover cursor-pointer w-full">
                <span className="font-headers text-6xl font-extrabold text-brand-orange/20 absolute top-6 right-8 leading-none select-none group-hover:scale-105 transition-transform duration-300">3</span>
                <div className="w-12 h-12 rounded-[16px] bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-6 transition-transform group-hover:rotate-6 duration-300">
                  <Navigation className="w-6 h-6" />
                </div>
                <h3 className="font-headers text-lg font-bold text-brand-navy mb-2">Acompanhe no App</h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-md">
                  Edite, salve, compartilhe seu roteiro offline e receba sugestões personalizadas por destino em tempo real.
                </p>
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* 3. DESTINATIONS ROWS (Airbnb/Netflix style) */}
        <section id="destinos" className="py-12 lg:py-28 bg-[#F7F8FA] border-b border-border-gray/50 relative scroll-mt-20">
          <ScrollReveal className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
              <div className="text-left max-w-2xl">
                <span className="bg-brand-orange/10 text-brand-orange text-[12px] font-extrabold tracking-wide px-3.5 py-1.5 rounded-full w-fit">
                  Destinos em destaque
                </span>
                <p className="text-sm text-text-muted mt-2">
                  Destinos com ficha publicada. O roteiro abre só quando ele existe.
                </p>
              </div>
              <Link 
                href="/roteiros" 
                className="text-sm font-bold text-brand-orange hover:text-[#96AB21] flex items-center gap-1 transition-colors whitespace-nowrap cursor-pointer"
              >
                Ver todos &rarr;
              </Link>
            </div>

            {/* Continental categories selectors */}
            <div className="flex gap-3 overflow-x-auto pb-4 mb-4 custom-scrollbar-hide flex-nowrap border-b border-border-gray/30 min-w-0 max-w-full">
              {[
                { label: '🇪🇺 Europa', slug: '/roteiros?search=Europa' },
                { label: '⛩️ Ásia', slug: '/roteiros?search=Ásia' },
                { label: '🌴 América do Sul', slug: '/roteiros?search=América' },
                { label: '🏔️ América do Norte', slug: '/roteiros?search=América' },
                { label: '🦁 África', slug: '/roteiros?search=África' },
                { label: '🌊 Oceania', slug: '/roteiros?search=Oceania' }
              ].map((cat, i) => (
                <Link 
                  key={i} 
                  href={cat.slug} 
                  className="px-4 sm:px-5 py-2.5 rounded-full bg-white border border-border-gray/70 hover:border-[#96AB21] hover:text-[#96AB21] text-xs sm:text-sm font-extrabold text-brand-navy shrink-0 transition-all duration-300 hover:scale-[1.02] shadow-sm"
                >
                  {cat.label}
                </Link>
              ))}
            </div>

            {/* Featured destinations scrollable carousel */}
            <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 custom-scrollbar-hide snap-x snap-mandatory min-w-0 max-w-full">
              {featuredDestinations.map((dest, idx) => (
                <Link 
                  key={idx}
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
                    <h4 className="font-headers text-base font-extrabold text-white mt-1 group-hover:text-brand-orange transition-colors">
                      {dest.name}, {dest.country}
                    </h4>
                    <p className="text-[12px] text-white/80 line-clamp-2 mt-1 leading-snug">{dest.phrase}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Section visual break banner */}
            <div className="mt-8 lg:mt-12 bg-gradient-to-r from-brand-navy to-[#0c248b] rounded-[24px] p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 shadow-xl relative overflow-hidden text-left">
              <div className="absolute right-0 top-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />
              <div className="text-left flex-grow z-10 min-w-0">
                <h4 className="font-headers text-lg sm:text-2xl font-black text-white leading-snug break-words">Pare de juntar abas. Em minutos, a 2GO monta o dia a dia — e você leva no app.</h4>
              </div>
              <Link 
                href="/planejamento"
                className="bg-[#F47A20] hover:bg-[#ff8f3c] text-white font-extrabold px-6 sm:px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-brand-orange/20 hover:scale-[1.02] active:scale-98 text-sm text-center cursor-pointer shrink-0 z-10 border-none flex items-center justify-center"
              >
                Criar roteiro
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* 4. INTERACTIVE SIMULATOR */}
        <section className="py-12 lg:py-28 bg-[#F4F6F9] border-b border-border-gray/50">
          <ScrollReveal className="container mx-auto px-4 sm:px-6 max-w-5xl">
            <div className="text-center max-w-[620px] mx-auto mb-14 md:mb-16">
              <span className="bg-brand-green/10 text-brand-green text-[12px] font-extrabold tracking-wide px-3.5 py-1.5 rounded-full w-fit">
                Tecnologia exclusiva
              </span>
              <h2 className="font-headers text-3.5xl font-black mt-4 text-brand-navy tracking-tight">
                Veja seu roteiro tomando forma ⚡
              </h2>
              <p className="text-sm text-text-muted mt-3">
                Defina seu destino, preencha suas preferências e assista à estruturação inteligente de rotas.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
              {/* Input Config Panel */}
              <div className="lg:col-span-5 bg-[#F8FAFC] border border-border-gray rounded-[28px] lg:rounded-[24px] p-5 sm:p-6 flex flex-col justify-between text-left">
                <div className="flex flex-col gap-4">
                  <h4 className="font-headers text-base sm:text-lg font-bold text-brand-navy border-b border-border-gray pb-3">Parâmetros de Viagem</h4>
                  
                  <div className="flex flex-col gap-1">
                    <label htmlFor="sim-dest-select" className="text-[12px] font-bold text-text-muted uppercase tracking-wide">Destino</label>
                    <select 
                      id="sim-dest-select"
                      value={simDest}
                      onChange={(e) => {
                        setSimDest(e.target.value);
                        setSimState('idle');
                        setVisibleDays([]);
                        setSimProgress(0);
                      }}
                      className="bg-white border border-border-gray px-4 py-2.5 rounded-xl text-sm font-semibold text-brand-navy outline-none focus:border-brand-orange w-full cursor-pointer"
                    >
                      <option value="Japão">Japão 🇯🇵 (Tóquio & Kyoto)</option>
                      <option value="França">França 🇫🇷 (Paris Romântico)</option>
                      <option value="Itália">Itália 🇮🇹 (Roma Histórica)</option>
                      <option value="Brasil">Brasil 🇧🇷 (Fernando de Noronha)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="sim-days-select" className="text-[12px] font-bold text-text-muted uppercase tracking-wide">Duração</label>
                      <select
                        id="sim-days-select"
                        value={simDays}
                        onChange={(e) => {
                          setSimDays(e.target.value);
                          setSimState('idle');
                          setVisibleDays([]);
                          setSimProgress(0);
                        }}
                        className="bg-white border border-border-gray px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-brand-navy outline-none focus:border-brand-orange cursor-pointer"
                      >
                        <option value="3 dias">3 Dias 📅</option>
                        <option value="5 dias">5 Dias 📅</option>
                        <option value="7 dias">7 Dias 📅</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="sim-comp-select" className="text-[12px] font-bold text-text-muted uppercase tracking-wide">Companhia</label>
                      <select
                        id="sim-comp-select"
                        value={simComp}
                        onChange={(e) => {
                          setSimComp(e.target.value);
                          setSimState('idle');
                          setVisibleDays([]);
                          setSimProgress(0);
                        }}
                        className="bg-white border border-border-gray px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-brand-navy outline-none focus:border-brand-orange cursor-pointer"
                      >
                        <option value="Casal">Casal 👩‍❤️‍👨</option>
                        <option value="Sozinho">Sozinho 🎒</option>
                        <option value="Família">Família 👨‍👩‍👧‍👦</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="sim-style-select" className="text-[12px] font-bold text-text-muted uppercase tracking-wide">Estilo de Viagem</label>
                    <select
                      id="sim-style-select"
                      value={simSty}
                      onChange={(e) => {
                        setSimSty(e.target.value);
                        setSimState('idle');
                        setVisibleDays([]);
                        setSimProgress(0);
                      }}
                      className="bg-white border border-border-gray px-4 py-2.5 rounded-xl text-sm font-semibold text-brand-navy outline-none focus:border-brand-orange w-full cursor-pointer"
                    >
                      <option value="Cultura & Templos">Cultura & Templos 🍣</option>
                      <option value="Praia & Aventura">Praia & Aventura 🏄‍♂️</option>
                      <option value="Luxo & Conforto">Luxo & Conforto 🍷</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <Link 
                    href={`/planejamento?dest=${encodeURIComponent(simDest.toLowerCase())}`}
                    className="bg-[#F47A20] hover:bg-[#ff8f3c] text-white font-extrabold py-3.5 px-4 rounded-xl text-center shadow-md shadow-brand-orange/25 block text-sm border-none"
                  >
                    Criar meu roteiro sob medida
                  </Link>
                  <button
                    onClick={startSimulation}
                    disabled={simState === 'running'}
                    className={`w-full py-3 flex items-center justify-center gap-2 cursor-pointer transition-all rounded-xl border text-sm font-bold ${
                      simState === 'running' 
                        ? 'bg-transparent text-brand-navy/40 border-brand-navy/10 cursor-not-allowed' 
                        : 'bg-white border-brand-navy/25 text-brand-navy hover:border-brand-navy/50'
                    }`}
                  >
                    {simState === 'running' ? 'Organizando preferências...' : 'Simular criação do roteiro'}
                  </button>
                </div>
              </div>

              {/* Real-time Output Board */}
              <div className="lg:col-span-7 bg-[#F8FAFC] border border-border-gray rounded-[28px] lg:rounded-[24px] p-4 sm:p-6 flex flex-col min-h-[440px] relative overflow-hidden">
                {simState !== 'idle' && (
                  <div className="mb-6 animate-fade-in-up text-left">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-brand-navy">
                        {simProgress < 35 && '🔍 Estruturando preferências...'}
                        {simProgress >= 35 && simProgress < 65 && '🚄 Mapeando distâncias...'}
                        {simProgress >= 65 && simProgress < 85 && '🍣 Customizando rotas...'}
                        {simProgress >= 85 && simProgress < 100 && '⚙️ Finalizando cronogramas...'}
                        {simProgress === 100 && '✨ Prévia pronta. O restante fica no app.'}
                      </span>
                      <span className="text-xs font-bold text-brand-orange">{Math.round(simProgress)}%</span>
                    </div>
                    <div className="w-full bg-brand-navy/10 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-brand-orange h-full rounded-full transition-all duration-500"
                        style={{ width: `${simProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex-grow flex flex-col gap-4 overflow-y-auto pr-1">
                  {simState === 'idle' && (
                    <div className="flex-grow flex flex-col items-center justify-center text-center p-6 gap-3">
                      <Sparkles className="w-10 h-10 text-brand-orange animate-pulse" />
                      <p className="text-sm font-semibold text-brand-navy">Simulador de Rotas 2GO</p>
                      <p className="text-xs text-text-muted max-w-[280px]">Inicie a simulação ao lado para assistir à estruturação das rotas diárias da viagem de forma automatizada.</p>
                    </div>
                  )}

                  {visibleDays.includes('day1') && simResults[simDest]?.[0] && (
                    <div className="bg-white border border-border-gray rounded-xl p-4 text-left shadow-xs animate-fade-in-up">
                      <div className="flex justify-between items-center mb-3">
                        <span className="bg-brand-orange/10 text-brand-orange text-[11px] font-bold px-2 py-0.5 rounded-md">DIA 1</span>
                        <span className="text-[12px] text-text-muted font-medium">{simResults[simDest][0].title}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        {simResults[simDest][0].items.map((item, idx) => (
                          <div key={idx} className="flex gap-2.5 items-start text-xs text-brand-navy">
                            <span className="text-sm shrink-0">{item.emoji}</span>
                            <div>
                              <strong className="block font-semibold">{item.place}</strong>
                              <span className="text-[12px] text-text-muted">{item.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {visibleDays.includes('day2') && simResults[simDest]?.[1] && (
                    <div className="bg-white border border-border-gray rounded-xl p-4 text-left shadow-xs animate-fade-in-up">
                      <div className="flex justify-between items-center mb-3">
                        <span className="bg-brand-orange/10 text-brand-orange text-[11px] font-bold px-2 py-0.5 rounded-md">DIA 2</span>
                        <span className="text-[12px] text-text-muted font-medium">{simResults[simDest][1].title}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        {simResults[simDest][1].items.map((item, idx) => (
                          <div key={idx} className="flex gap-2.5 items-start text-xs text-brand-navy">
                            <span className="text-sm shrink-0">{item.emoji}</span>
                            <div>
                              <strong className="block font-semibold">{item.place}</strong>
                              <span className="text-[12px] text-text-muted">{item.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {visibleDays.includes('day3') && simResults[simDest]?.[2] && (
                    <div className="bg-white border border-border-gray rounded-xl p-4 text-left shadow-xs animate-fade-in-up">
                      <div className="flex justify-between items-center mb-3">
                        <span className="bg-brand-orange/10 text-brand-orange text-[11px] font-bold px-2 py-0.5 rounded-md">DIA 3</span>
                        <span className="text-[12px] text-text-muted font-medium">{simResults[simDest][2].title}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        {simResults[simDest][2].items.map((item, idx) => (
                          <div key={idx} className="flex gap-2.5 items-start text-xs text-brand-navy">
                            <span className="text-sm shrink-0">{item.emoji}</span>
                            <div>
                              <strong className="block font-semibold">{item.place}</strong>
                              <span className="text-[12px] text-text-muted">{item.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 6. EXPERIÊNCIA PERSONALIZADA (LIGHT BG REDESIGN) */}
        <section id="premium-custom" className="py-12 lg:py-28 bg-[#F7F8FA] border-b border-border-gray/50 relative overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none select-none"></div>

          <ScrollReveal className="container mx-auto px-4 sm:px-6 max-w-6xl w-full">
            <div className="text-center max-w-[600px] mx-auto mb-10 md:mb-16">
              <span className="bg-brand-orange/10 text-brand-orange text-[12px] font-extrabold tracking-wide px-3.5 py-1.5 rounded-full w-fit">
                Consultoria personalizada
              </span>
              <h2 className="font-headers text-3xl md:text-3.5xl font-black mt-4 text-brand-navy tracking-tight">
                Quer um toque humano no seu planejamento?
              </h2>
              <p className="text-sm text-text-muted mt-2">
                Para viagens especiais, conte com um especialista da 2GO: atendimento individual, curadoria sob medida e suporte do início ao fim.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-5xl mx-auto w-full">
              {/* Left Column Chat Mockup (WhatsApp Business/Premium Style) */}
              <div className="bg-[#E5DDD5] border border-border-gray/45 rounded-2xl overflow-hidden shadow-lg flex flex-col max-w-[420px] mx-auto w-full text-brand-navy relative min-h-[385px] font-sans">
                {/* Chat Header */}
                <div className="bg-[#075E54] text-white p-4 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80" 
                      alt="Marina Especialista" 
                      className="w-10 h-10 rounded-full object-cover border border-white/20"
                    />
                    <div className="text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-extrabold text-white tracking-tight">Marina — Especialista 2GO</span>
                        <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[7px] font-black" title="Verificado">✓</span>
                      </div>
                      <span className="text-[10px] text-white/80 block">Ativa agora</span>
                    </div>
                  </div>
                  <div className="flex gap-2.5 opacity-80 text-white text-xs">
                    <span>💬</span>
                  </div>
                </div>

                {/* Messages Container */}
                <div className="flex flex-col gap-4 p-4 flex-grow text-xs justify-end leading-relaxed overflow-y-auto min-h-[290px]">
                  {/* Message 1 */}
                  <div className="bg-white text-brand-navy rounded-[14px] rounded-tl-sm p-3.5 max-w-[85%] text-left self-start shadow-sm border border-black/5 relative after:content-[''] after:absolute after:top-0 after:left-[-6px] after:border-t-[8px] after:border-t-white after:border-l-[8px] after:border-l-transparent">
                    <p className="text-[10px] font-black text-brand-orange tracking-wide mb-1 block">Consultoria Personalizada</p>
                    Olá, Ronilson! Tudo bem? ✈️ Vi seu interesse pela Toscana em outubro. Recomendo mudarmos a visita à vinícola para as 15h em vez das 17h, pois o pôr do sol acontece mais cedo no outono. Assim você aproveita a degustação com luz solar. O que acha?
                    <span className="text-[8px] text-text-muted/70 float-right mt-1.5 ml-2">10:14</span>
                  </div>
                  {/* Message 2 */}
                  <div className="bg-[#DCF8C6] text-brand-navy rounded-[14px] rounded-tr-sm p-3.5 max-w-[85%] text-left self-end shadow-sm border border-black/5 relative after:content-[''] after:absolute after:top-0 after:right-[-6px] after:border-t-[8px] after:border-t-[#DCF8C6] after:border-r-[8px] after:border-r-transparent">
                    Nossa, excelente observação Marina! Nem me atentei a isso. Pode ajustar por favor!
                    <span className="text-[8px] text-text-muted/70 float-right mt-1.5 ml-2">10:16 ✓✓</span>
                  </div>
                  {/* Message 3 */}
                  <div className="bg-white text-brand-navy rounded-[14px] rounded-tl-sm p-3.5 max-w-[85%] text-left self-start shadow-sm border border-black/5 relative after:content-[''] after:absolute after:top-0 after:left-[-6px] after:border-t-[8px] after:border-t-white after:border-l-[8px] after:border-l-transparent">
                    Ajustado! A reserva da vinícola e os transportes locais já foram atualizados. Você pode acessar os novos vouchers diretamente no aplicativo 2GO, mesmo offline. Boa viagem! 🍷
                    <span className="text-[8px] text-text-muted/70 float-right mt-1.5 ml-2">10:17</span>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-6 text-left w-full">
                <h3 className="font-headers text-2xl md:text-3.5xl font-black leading-tight text-brand-navy">
                  Consultoria Personalizada 🤝
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-text-muted leading-relaxed">
                  Para viagens especiais e sob medida, conte com a nossa equipe de especialistas parceiros. Planejamento otimizado com a tranquilidade de ter tudo resolvido.
                </p>

                <div className="flex flex-col gap-4 mt-2">
                  <div className="flex gap-3 items-center">
                    <div className="w-6 h-6 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 text-xs font-bold">✓</div>
                    <span className="text-xs sm:text-sm font-semibold text-brand-navy">Atendimento individual com especialista</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="w-6 h-6 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 text-xs font-bold">✓</div>
                    <span className="text-xs sm:text-sm font-semibold text-brand-navy">Curadoria autoral sob medida</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="w-6 h-6 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 text-xs font-bold">✓</div>
                    <span className="text-xs sm:text-sm font-semibold text-brand-navy">Reservas e logística resolvidas</span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <div className="w-6 h-6 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 text-xs font-bold">✓</div>
                    <span className="text-xs sm:text-sm font-semibold text-brand-navy">Suporte durante toda a viagem</span>
                  </div>
                </div>

                <Link 
                  href="/consultoria-personalizada"
                  className="bg-[#F47A20] hover:bg-[#ff8f3c] text-white font-extrabold py-3.5 px-8 rounded-xl transition-all shadow-md shadow-brand-orange/20 hover:scale-[1.01] active:scale-95 text-xs inline-flex items-center gap-1.5 cursor-pointer border-none w-fit self-start"
                >
                  Falar com especialista
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 7. TESTIMONIALS */}
        <section id="avaliacoes" className="py-12 lg:py-28 bg-white border-b border-border-gray/50 scroll-mt-20">
          <ScrollReveal className="container mx-auto px-4 sm:px-6 max-w-6xl w-full">
            <div className="text-center max-w-[600px] mx-auto mb-10 md:mb-16">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
              {[
                { 
                  name: 'Amanda Martins', 
                  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80', 
                  text: 'Foi como ter uma amiga especialista cuidando de cada detalhe.', 
                  trip: 'Noronha • Consultoria Personalizada',
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

          <ScrollReveal className="container mx-auto px-4 sm:px-6 max-w-6xl w-full">
            <div className="bg-[#FAF9F6] text-brand-navy p-6 md:p-16 rounded-[28px] lg:rounded-[32px] relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center gap-12 text-left shadow-lg border border-brand-navy/5">
              {/* Subtle background glow */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none select-none"></div>
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#96AB21]/10 rounded-full blur-[100px] pointer-events-none select-none"></div>

              <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 relative z-10 w-full">
                <span className="bg-brand-orange text-white text-[11px] font-extrabold tracking-widest px-2.5 py-1 rounded-full w-fit">
                  Roteiros personalizados
                </span>
                <h2 className="font-headers text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-brand-navy">
                  Crie seu roteiro perfeito em poucos minutos
                </h2>
                <p className="text-sm md:text-base text-text-muted leading-relaxed">
                  Planeje no site e leve horários, atrações, mapas e recomendações com você no aplicativo.
                </p>
                
                <div className="flex flex-col gap-2 mt-2 w-full sm:w-auto items-center sm:items-start">
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link 
                      href="/planejamento"
                      className="bg-[#F47A20] hover:bg-[#ff8f3c] text-white font-extrabold px-8 py-4 rounded-xl shadow-md shadow-brand-orange/20 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.01] active:scale-95 border-none"
                    >
                      Criar roteiro
                    </Link>
                    <button 
                      onClick={() => setIsDownloadOpen(true)}
                      className="border border-brand-navy/30 text-brand-navy hover:bg-brand-navy/5 font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center bg-transparent"
                    >
                      Baixar App
                    </button>
                  </div>
                  <p className="text-[11px] text-brand-navy/60 font-semibold tracking-wide mt-1">
                    Planeje agora e leve tudo no aplicativo.
                  </p>
                </div>
              </div>
              
              {/* iOS Clean App Mockup in Pure CSS */}
              <div className="lg:col-span-5 relative z-10 flex justify-center items-center w-full">
                <div className="w-[280px] h-[500px] bg-[#0A1128] border-[6px] border-brand-navy rounded-[42px] shadow-2xl relative flex flex-col p-2.5 ring-8 ring-brand-navy/5 select-none hover:scale-102 transition-transform duration-500">
                  {/* Dynamic Island */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-4.5 bg-brand-navy rounded-full z-30 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10 absolute right-3"></div>
                  </div>

                  {/* Device Screen */}
                  <div className="bg-white h-full w-full rounded-[32px] overflow-hidden flex flex-col justify-between p-4 font-sans text-brand-navy relative shadow-inner">
                    {/* Time & Battery Status Bar */}
                    <div className="flex justify-between items-center text-[9px] font-bold text-brand-navy/40 px-2 pt-0.5">
                      <span>09:41</span>
                      <div className="flex items-center gap-1">
                        <span>📶</span>
                        <span>🔋</span>
                      </div>
                    </div>

                    {/* Screen Header */}
                    <div className="text-left mt-3 px-1">
                      <span className="text-[9px] font-extrabold text-brand-orange uppercase tracking-wider block">Meu Roteiro</span>
                      <h4 className="font-headers text-base font-extrabold text-brand-navy leading-tight mt-0.5">Noronha Completo 🏝️</h4>
                    </div>

                    {/* Day Tabs */}
                    <div className="flex gap-1 mt-3 px-1 overflow-x-auto pb-1 text-[10px] font-bold">
                      <span className="bg-brand-navy text-white px-3 py-1.5 rounded-full cursor-pointer">Dia 1</span>
                      <span className="bg-bg-light text-text-muted px-3 py-1.5 rounded-full cursor-pointer">Dia 2</span>
                      <span className="bg-bg-light text-text-muted px-3 py-1.5 rounded-full cursor-pointer">Dia 3</span>
                    </div>

                    {/* Clean Timeline (Notion/Airbnb style) */}
                    <div className="flex-grow flex flex-col gap-3.5 mt-4 text-left px-2 border-l-2 border-border-gray ml-3 relative">
                      {/* Event 1 */}
                      <div className="relative pl-4">
                        <div className="absolute top-1 left-[-23px] w-3 h-3 rounded-full bg-brand-orange border border-white shadow-xs"></div>
                        <span className="text-[9px] font-extrabold text-[#F47A20] block font-mono">09:00</span>
                        <h5 className="text-[12px] font-extrabold text-brand-navy mt-0.5 leading-tight">Passeio de Barco ⛵</h5>
                        <span className="inline-block text-[8px] bg-brand-green/10 text-brand-green font-bold px-1.5 py-0.5 rounded-md mt-0.5">Confirmado</span>
                      </div>

                      {/* Event 2 */}
                      <div className="relative pl-4">
                        <div className="absolute top-1 left-[-23px] w-3 h-3 rounded-full bg-[#96AB21] border border-white shadow-xs"></div>
                        <span className="text-[9px] font-extrabold text-[#96AB21] block font-mono">13:00</span>
                        <h5 className="text-[12px] font-extrabold text-brand-navy mt-0.5 leading-tight">Almoço no Pico 🍽️</h5>
                        <p className="text-[9px] text-text-muted mt-0.5 leading-none">Frutos do mar locais</p>
                      </div>

                      {/* Event 3 */}
                      <div className="relative pl-4">
                        <div className="absolute top-1 left-[-23px] w-3 h-3 rounded-full bg-brand-navy border border-white shadow-xs"></div>
                        <span className="text-[9px] font-extrabold text-brand-navy/60 block font-mono">16:30</span>
                        <h5 className="text-[12px] font-extrabold text-brand-navy mt-0.5 leading-tight">Pôr do Sol no Boldró 🌅</h5>
                        <span className="inline-block text-[8px] bg-brand-orange/10 text-brand-orange font-bold px-1.5 py-0.5 rounded-md mt-0.5">Imperdível</span>
                      </div>
                    </div>

                    {/* Bottom Nav Bar */}
                    <div className="border-t border-border-gray/40 pt-2 flex justify-around items-center text-[9px] font-extrabold text-brand-navy/65 mt-2 bg-white w-full">
                      <div className="flex flex-col items-center gap-0.5 text-brand-orange">
                        <span>📍</span>
                        <span>Roteiro</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <span>💬</span>
                        <span>Especialista</span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <span>🗺️</span>
                        <span>Mapa</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 9. NEWSLETTER */}
        <section className="pb-20 bg-[#F7F8FA]">
          <div className="container mx-auto px-6 max-w-5xl">
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

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

// Cinematic Unsplash Images for the Premium Hero Carousel & Categories
const premiumSlides = [
  {
    id: 'santorini',
    name: 'Santorini, Grécia',
    country: 'Grécia',
    emoji: '🇬🇷',
    phrase: 'Pôr do sol inesquecível sobre o Mar Egeu.',
    desc: 'Vilarejos de domos azuis sobre penhascos vulcânicos cercados por águas termais azul-turquesa.',
    tags: ['Romance', 'Praias'],
    img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    ctaLink: '/roteiros?search=Santorini'
  },
  {
    id: 'japan',
    name: 'Quioto & Tóquio, Japão',
    country: 'Japão',
    emoji: '🇯🇵',
    phrase: 'Tradição milenar e tecnologia em perfeita harmonia.',
    desc: 'Caminhe sob os portais Torii vermelhos, explore templos budistas medievais e contemple avenidas futuristas.',
    tags: ['Cultura', 'Tecnologia'],
    img: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    ctaLink: '/roteiros?search=Tóquio'
  },
  {
    id: 'norway',
    name: 'Fiordes, Noruega',
    country: 'Noruega',
    emoji: '🇳🇴',
    phrase: 'Aurora Boreal, fiordes e paisagens surreais.',
    desc: 'Navegue entre paredões de rochas gigantescas esculpidos pelo gelo e assista às luzes mágicas do norte.',
    tags: ['Natureza', 'Aventura'],
    img: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=80',
    ctaLink: '/roteiros?search=Noruega'
  },
  {
    id: 'paris',
    name: 'Paris, França',
    country: 'França',
    emoji: '🇫🇷',
    phrase: 'Arte, bistrôs tradicionais e o charme do Rio Sena.',
    desc: 'Das ruelas boêmias de Montmartre aos bulevares elegantes desenhados por Haussmann.',
    tags: ['Cultura', 'Romance'],
    img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    ctaLink: '/roteiros?search=Paris'
  },
  {
    id: 'capadocia',
    name: 'Capadócia, Turquia',
    country: 'Turquia',
    emoji: '🇹🇷',
    phrase: 'Voando sobre paisagens que parecem outro planeta.',
    desc: 'Flutue ao nascer do sol em balões coloridos sobre chaminés de fadas e cidades esculpidas na rocha.',
    tags: ['Aventura', 'Romance'],
    img: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=1200&q=80',
    ctaLink: '/roteiros?search=Capadócia'
  },
  {
    id: 'noronha',
    name: 'Fernando de Noronha, Brasil',
    country: 'Brasil',
    emoji: '🇧🇷',
    phrase: 'Um dos mares mais bonitos do planeta.',
    desc: 'Praias intocadas de águas mornas habitadas por golfinhos, tartarugas marinhas e piscinas naturais de corais.',
    tags: ['Praias', 'Natureza'],
    img: '/assets/noronha.png',
    ctaLink: '/roteiros?search=Fernando de Noronha'
  },
  {
    id: 'maldivas',
    name: 'Ilhas Maldivas',
    country: 'Maldivas',
    emoji: '🇲🇻',
    phrase: 'Bungalows sobre águas cristalinas e atóis de corais.',
    desc: 'Relaxe em praias de areia branca ultrafina, mergulhe em lagoas azul-piscina e viva o isolamento luxuoso.',
    tags: ['Romance', 'Praias'],
    img: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    ctaLink: '/roteiros?search=Maldivas'
  },
  {
    id: 'toscana',
    name: 'Toscana, Itália',
    country: 'Itália',
    emoji: '🇮🇹',
    phrase: 'Colinas douradas, vinhedos e arte renascentista.',
    desc: 'Percorra estradas ladeadas por ciprestes, visite vilas medievais de pedra e prove vinhos de classe mundial.',
    tags: ['Cultura', 'Gastronomia'],
    img: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1200&q=80',
    ctaLink: '/roteiros?search=Toscana'
  },
  {
    id: 'south_africa',
    name: 'África do Sul',
    country: 'África do Sul',
    emoji: '🇿🇦',
    phrase: 'Vida selvagem, safáris e praias da Cidade do Cabo.',
    desc: 'Encontre os Big Five em reservas naturais e aprecie a Table Mountain sob a brisa do oceano Atlântico.',
    tags: ['Aventura', 'Natureza'],
    img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    ctaLink: '/roteiros?search=África do Sul'
  },
  {
    id: 'gramado',
    name: 'Gramado, RS',
    country: 'Brasil',
    emoji: '🇧🇷',
    phrase: 'Charme europeu, hortênsias e fondue na serra.',
    desc: 'O aconchego da colonização alemã com lagos cercados de pinheiros e gastronomia farta sob a neblina fria.',
    tags: ['Romance', 'Gastronomia'],
    img: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80',
    ctaLink: '/roteiros?search=Gramado'
  }
];

// Dynamic CSS filters per destination to highlight their natural beauty
const getSlideFilterClass = (id) => {
  switch (id) {
    case 'santorini':
      return 'brightness-[1.14] contrast-[1.10] saturate-[1.20]';
    case 'norway':
      return 'brightness-[1.08] contrast-[1.12] saturate-[1.05] hue-rotate-[-3deg]';
    case 'paris':
      return 'brightness-[1.10] contrast-[1.06] saturate-[1.15] sepia-[0.06]';
    case 'capadocia':
      return 'brightness-[1.12] contrast-[1.06] saturate-[1.25] sepia-[0.10]';
    case 'noronha':
      return 'brightness-[1.14] contrast-[1.08] saturate-[1.30]';
    case 'maldivas':
      return 'brightness-[1.10] contrast-[1.22] saturate-[1.25] hue-rotate-[3deg]'; // contraste levemente maior
    case 'toscana':
      return 'brightness-[1.08] contrast-[1.08] saturate-[1.20] sepia-[0.08]';
    default:
      return 'brightness-[1.08] contrast-[1.08] saturate-[1.12]';
  }
};

// Dynamic warm overlay opacity to add life to specific destinations
const getSlideWarmOverlayStyle = (id) => {
  switch (id) {
    case 'santorini':
      return 'rgba(255, 255, 255, 0.15)'; // overlay claro
    case 'norway':
      return 'rgba(255, 255, 255, 0.20)'; // overlay claro suave
    case 'maldivas':
      return 'rgba(244, 122, 32, 0.03)';
    case 'noronha':
      return 'rgba(244, 122, 32, 0.04)';
    case 'capadocia':
      return 'rgba(244, 122, 32, 0.12)';
    case 'paris':
      return 'rgba(0, 0, 0, 0)'; // quase sem overlay
    case 'toscana':
      return 'rgba(244, 122, 32, 0.10)';
    default:
      return 'rgba(244, 122, 32, 0.08)';
  }
};

// Dynamic subtle dark overlay to enhance depth and readability
const getSlideDarkOverlayStyle = (id) => {
  switch (id) {
    case 'santorini':
      return 'linear-gradient(to top, rgba(255, 255, 255, 0.10), rgba(255, 255, 255, 0.02))'; // overlay claro
    case 'norway':
      return 'linear-gradient(to top, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.02))'; // overlay claro suave
    case 'maldivas':
      return 'linear-gradient(to top, rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.10))';
    case 'noronha':
      return 'linear-gradient(to top, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.05))'; // overlay levemente escuro no rodapé
    case 'paris':
      return 'linear-gradient(to top, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.01))'; // quase sem overlay
    default:
      return 'linear-gradient(to top, rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0.06))';
  }
};

// Dynamic subtle text shadow for Hero text readability
const getHeroTextShadow = (id) => {
  if (id === 'santorini') {
    return { textShadow: '0 2px 18px rgba(255, 255, 255, 0.85), 0 1px 4px rgba(255, 255, 255, 0.60)' };
  }
  return { textShadow: '0 2px 14px rgba(255, 255, 255, 0.55)' };
};

// Curated Editorial Itineraries Data with daily timeline summaries
const editorialItineraries = [
  {
    title: 'Paris Essencial & Clássica',
    destination: 'Paris, França 🇫🇷',
    duration: '3 Dias',
    img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    slug: 'paris-3-dias',
    summary: [
      { day: 'Dia 1', action: 'Museu do Louvre, Jardins Tuileries & Jantar na Torre Eiffel' },
      { day: 'Dia 2', action: 'Île de la Cité, Catedral Notre-Dame & Saint-Germain' },
      { day: 'Dia 3', action: 'Basílica Sacré-Cœur, ruelas de Montmartre & Cruzeiro Sena' }
    ]
  },
  {
    title: 'A Cidade Eterna e Arredores',
    destination: 'Roma, Itália 🇮🇹',
    duration: '5 Dias',
    img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80',
    slug: 'paris-5-dias', // mapped to existing route for demo
    summary: [
      { day: 'Dia 1', action: 'Coliseu, Fórum Romano & Fontana di Trevi' },
      { day: 'Dia 2', action: 'Pantheon, Piazza Navona & Jantar em Trastevere' },
      { day: 'Dia 3', action: 'Bate-volta para Museus do Vaticano & Capela Sistina' }
    ]
  },
  {
    title: 'Lisboa Histórica & Sintra',
    destination: 'Lisboa, Portugal 🇵🇹',
    duration: '3 Dias',
    img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
    slug: 'paris-7-dias', // mapped to existing route for demo
    summary: [
      { day: 'Dia 1', action: 'Torre de Belém, Pastéis de Belém & Mosteiro dos Jerónimos' },
      { day: 'Dia 2', action: 'Bonde Elétrico 28, Castelo de São Jorge & Tasca de Fado' },
      { day: 'Dia 3', action: 'Bate-volta de trem para os Palácios de Sintra' }
    ]
  }
];

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

export default function Home() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);

  // Simulation states for "Veja seu roteiro tomando forma"
  const [simProgress, setSimProgress] = useState(0);
  const [simState, setSimState] = useState('idle'); // 'idle' | 'running' | 'done'
  const [visibleDays, setVisibleDays] = useState([]);

  // Auto transition for Hero Carousel
  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % premiumSlides.length);
    }, 5500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 100 / 55, 100));
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
        <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-start pt-24 pb-20 overflow-hidden bg-bg-light text-brand-navy">
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

          <div className="container mx-auto px-6 relative z-20 max-w-6xl w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left text panel */}
              <div className="lg:col-span-7 flex flex-col items-center sm:items-start text-left">
                <div 
                  className="w-full max-w-2xl bg-white/26 backdrop-blur-[10px] border border-white/35 shadow-[0_20px_60px_rgba(8,27,107,0.08)] p-6 sm:p-8 md:p-10 rounded-[28px] flex flex-col gap-5 sm:gap-6 animate-fade-in-up items-center sm:items-start"
                >
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="bg-[#F47A20] text-white text-[11px] sm:text-[12px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full w-fit shadow-md shadow-[#F47A20]/15">
                      ROTEIROS PERSONALIZADOS
                    </span>
                    <span className="bg-brand-navy/5 border border-brand-navy/10 text-brand-navy text-[11px] sm:text-[12px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full w-fit flex items-center gap-1">
                      📍 {premiumSlides[currentSlide].name}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 text-center sm:text-left w-full">
                    <h1 
                      style={getHeroTextShadow(premiumSlides[currentSlide].id)} 
                      className="font-headers text-brand-navy font-extrabold text-[36px] sm:text-[46px] md:text-[clamp(56px,6vw,88px)] leading-[0.95] tracking-[-0.03em] max-w-2xl transition-all duration-500 overflow-wrap-normal"
                    >
                      {premiumSlides[currentSlide].name}
                    </h1>
                    <p 
                      style={getHeroTextShadow(premiumSlides[currentSlide].id)} 
                      className="font-headers text-brand-navy font-bold text-lg sm:text-xl lg:text-[1.38rem] leading-snug tracking-tight max-w-xl"
                    >
                      A sua próxima viagem, planejada em minutos.
                    </p>
                  </div>
                  
                  <p 
                    style={getHeroTextShadow(premiumSlides[currentSlide].id)} 
                    className="text-sm sm:text-base text-brand-navy/80 leading-relaxed max-w-xl line-clamp-2 text-center sm:text-left font-medium"
                  >
                    A 2GO cria roteiros personalizados e une tecnologia, curadoria e praticidade para você viajar do seu jeito.
                  </p>
                  
                  <div className="flex items-center mt-1 bg-brand-navy/5 border border-brand-navy/10 px-4 py-2.5 rounded-xl w-fit">
                    <span className="text-brand-navy/85 text-sm italic font-medium">"{premiumSlides[currentSlide].phrase}"</span>
                  </div>
                  
                  <div className="flex flex-col gap-2 mt-2 w-full sm:w-auto items-center sm:items-start">
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      <button 
                        onClick={() => setIsDownloadOpen(true)}
                        className="w-full max-w-[280px] sm:w-auto bg-[#96AB21] hover:bg-[#85981D] text-brand-navy font-extrabold px-8 py-3.5 rounded-xl shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.01] active:scale-[0.98]"
                      >
                        Baixar App
                      </button>
                      <Link 
                        href="/planejamento"
                        className="w-full max-w-[280px] sm:w-auto border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white bg-transparent font-bold px-8 py-3.5 rounded-xl transition-all flex items-center justify-center"
                      >
                        Criar Meu Roteiro
                      </Link>
                    </div>
                    <p className="text-[11px] text-brand-navy/60 font-semibold tracking-wide mt-1 text-center sm:text-left">
                      Planeje agora e leve tudo no aplicativo.
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full max-w-md bg-brand-navy/10 h-1 rounded-full overflow-hidden mt-2">
                    <div 
                      className="bg-brand-orange h-full transition-all duration-100 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Micro Provas */}
                  <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 sm:gap-6 mt-2 text-xs sm:text-sm text-brand-navy/80 font-medium border-t border-brand-navy/10 pt-4 max-w-md w-full">
                    <span className="flex items-center gap-1.5">
                      <span className="text-yellow-500">★</span> 4,9 de avaliação
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-brand-orange">🌍</span> +120 destinos
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-brand-green">⚡</span> Roteiros em poucos minutos
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Columns: Interactive Side Slider Previews (Apple TV Style) */}
              <div className="lg:col-span-5 flex flex-col lg:border-l lg:border-brand-navy/10 lg:pl-8 mt-10 lg:mt-0 w-full overflow-hidden">
                <span className="text-[12px] font-black text-brand-navy/60 tracking-wider uppercase mb-3 block text-center lg:text-left">Mais Destinos</span>
                
                <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible lg:overflow-y-visible gap-3 pb-4 lg:pb-0 custom-scrollbar-hide flex-nowrap lg:flex-wrap w-full px-1 lg:px-0">
                  {premiumSlides.map((slide, idx) => {
                    const isSelected = idx === currentSlide;
                    return (
                      <button
                        key={slide.id}
                        onClick={() => selectSlide(idx)}
                        className={`group flex items-center gap-3.5 p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer shrink-0 w-[240px] lg:w-full ${
                          isSelected 
                            ? 'bg-white/70 border-white/40 shadow-md border-l-4 border-l-[#F47A20] backdrop-blur-md pl-3.5 text-brand-navy' 
                            : 'bg-brand-navy/5 border-brand-navy/5 border-l-4 border-l-transparent hover:bg-brand-navy/10 text-brand-navy/70 pl-3.5'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-brand-navy/10 relative">
                          <img src={slide.img} alt={slide.name} className="w-full h-full object-cover transition-transform group-hover:scale-[1.03]" />
                        </div>
                        <div className="min-w-0 flex-1 flex flex-col justify-center">
                          <h4 className={`text-sm font-extrabold truncate ${isSelected ? 'text-brand-navy font-black' : 'text-brand-navy/80 group-hover:text-brand-navy'}`}>{slide.name}</h4>
                          <p className="text-[13px] font-medium line-clamp-2 mt-0.5 leading-snug whitespace-normal text-brand-navy/60 group-hover:text-brand-navy/80">{slide.phrase}</p>
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
        <section id="como-funciona" className="py-20 md:py-28 bg-bg-light border-b border-border-gray/50 scroll-mt-20">
          <ScrollReveal className="container mx-auto px-6">
            <div className="text-center max-w-[600px] mx-auto mb-14 md:mb-16">
              <span className="bg-brand-orange/10 text-brand-orange text-[12px] font-extrabold tracking-widest px-3.5 py-1.5 rounded-full w-fit">
                MÁXIMA PRATICIDADE
              </span>
              <h2 className="font-headers text-3.5xl font-black mt-4 text-brand-navy tracking-tight">
                Do sonho ao roteiro em 3 passos
              </h2>
              <p className="text-sm text-text-muted mt-3 font-medium">
                <span className="text-brand-orange font-bold">A tecnologia organiza. Especialistas aperfeiçoam.</span> O planejamento simplificado e a curadoria local unidos para criar sua próxima experiência sob medida.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto w-full">
              {/* Step 1 */}
              <div className="group relative bg-white border border-border-gray p-6 sm:p-8 rounded-[24px] shadow-sm hover:shadow-md hover:translate-y-[-4px] hover:border-brand-orange/20 transition-all duration-300 flex flex-col items-start text-left">
                <span className="font-headers text-6xl font-extrabold text-brand-orange/20 absolute top-6 right-8 leading-none select-none group-hover:scale-105 transition-transform duration-300">1</span>
                <div className="w-12 h-12 rounded-[16px] bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-6 transition-transform group-hover:rotate-6 duration-300">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="font-headers text-lg font-bold text-brand-navy mb-2">Planeje no site</h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-md">
                  Escolha o destino e preencha suas preferências de viagem em poucos passos.
                </p>
              </div>

              {/* Step 2 */}
              <div className="group relative bg-white border border-border-gray p-6 sm:p-8 rounded-[24px] shadow-sm hover:shadow-md hover:translate-y-[-4px] hover:border-brand-orange/20 transition-all duration-300 flex flex-col items-start text-left">
                <span className="font-headers text-6xl font-extrabold text-brand-orange/20 absolute top-6 right-8 leading-none select-none group-hover:scale-105 transition-transform duration-300">2</span>
                <div className="w-12 h-12 rounded-[16px] bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-6 transition-transform group-hover:rotate-6 duration-300">
                  <Sliders className="w-6 h-6" />
                </div>
                <h3 className="font-headers text-lg font-bold text-brand-navy mb-2">Leve tudo no bolso</h3>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-md">
                  Sincronize o roteiro no celular com mapas offline, horários e atrações organizados em um só lugar.
                </p>
              </div>

              {/* Step 3 */}
              <div className="group relative bg-white border border-border-gray p-6 sm:p-8 rounded-[24px] shadow-sm hover:shadow-md hover:translate-y-[-4px] hover:border-brand-orange/20 transition-all duration-300 flex flex-col items-start text-left">
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

        {/* 3. DESTINATIONS ROWS (Airbnb/Netflix style) */}
        <section id="destinos" className="py-20 md:py-28 bg-[#F7F8FA] border-b border-border-gray/50 relative scroll-mt-20">
          <ScrollReveal className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
              <div className="text-left max-w-2xl">
                <span className="bg-brand-orange/10 text-brand-orange text-[12px] font-extrabold tracking-widest px-3.5 py-1.5 rounded-full w-fit">
                  PORTAL DE VIAGENS
                </span>
                <h2 className="font-headers text-3.5xl font-black text-brand-navy mt-4 tracking-tight">
                  Destinos em destaque
                </h2>
                <p className="text-sm text-text-muted mt-2">
                  Escolha seu próximo destino e leve seu roteiro personalizado no bolso com o aplicativo da 2GO.
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
            <div className="flex gap-3 overflow-x-auto pb-6 mb-8 custom-scrollbar-hide flex-nowrap border-b border-border-gray/30">
              {[
                { label: 'Europa 🇪🇺', slug: '/roteiros?search=Europa' },
                { label: 'Ásia ⛩️', slug: '/roteiros?search=Ásia' },
                { label: 'América do Sul 🌴', slug: '/roteiros?search=América' },
                { label: 'América do Norte 🏔️', slug: '/roteiros?search=América' },
                { label: 'África 🦁', slug: '/roteiros?search=África' },
                { label: 'Oceania 🌊', slug: '/roteiros?search=Oceania' }
              ].map((cat, i) => (
                <Link 
                  key={i} 
                  href={cat.slug} 
                  className="px-5 py-2.5 rounded-full bg-white border border-border-gray/70 hover:border-[#96AB21] hover:text-[#96AB21] text-xs sm:text-sm font-extrabold text-brand-navy shrink-0 transition-all duration-300 hover:scale-[1.02] shadow-sm uppercase tracking-wider"
                >
                  {cat.label}
                </Link>
              ))}
            </div>

            {/* Featured destinations grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Paris */}
              <Link 
                href="/roteiros?search=Paris"
                className="group relative h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500 ease-out border border-border-gray"
              >
                <img 
                  src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80" 
                  alt="Paris" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-left">
                  <span className="text-[11px] font-black text-[#96AB21] bg-[#96AB21]/15 px-2 py-0.5 rounded-md uppercase tracking-wider">França 🇫🇷</span>
                  <h4 className="font-headers text-sm sm:text-base font-extrabold text-white mt-1 group-hover:text-[#96AB21] transition-colors">Paris, França</h4>
                  <p className="text-[12px] text-white/70 line-clamp-2 mt-0.5">Arte, bistrôs tradicionais e o charme do Rio Sena.</p>
                </div>
              </Link>

              {/* Roma */}
              <Link 
                href="/roteiros?search=Roma"
                className="group relative h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500 ease-out border border-border-gray"
              >
                <img 
                  src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80" 
                  alt="Roma" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-left">
                  <span className="text-[11px] font-black text-[#96AB21] bg-[#96AB21]/15 px-2 py-0.5 rounded-md uppercase tracking-wider">Itália 🇮🇹</span>
                  <h4 className="font-headers text-sm sm:text-base font-extrabold text-white mt-1 group-hover:text-[#96AB21] transition-colors">Roma, Itália</h4>
                  <p className="text-[12px] text-white/70 line-clamp-2 mt-0.5">A Cidade Eterna com ruínas históricas e gastronomia inigualável.</p>
                </div>
              </Link>

              {/* Lisboa */}
              <Link 
                href="/roteiros?search=Lisboa"
                className="group relative h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500 ease-out border border-border-gray"
              >
                <img 
                  src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80" 
                  alt="Lisboa" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-left">
                  <span className="text-[11px] font-black text-[#96AB21] bg-[#96AB21]/15 px-2 py-0.5 rounded-md uppercase tracking-wider">Portugal 🇵🇹</span>
                  <h4 className="font-headers text-sm sm:text-base font-extrabold text-white mt-1 group-hover:text-[#96AB21] transition-colors">Lisboa, Portugal</h4>
                  <p className="text-[12px] text-white/70 line-clamp-2 mt-0.5">Ruelas históricas, bondinhos amarelos e pastéis de Belém.</p>
                </div>
              </Link>
            </div>

            {/* App download trigger banner */}
            <div className="mt-12 bg-white border border-border-gray rounded-[24px] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm border-l-4 border-l-[#96AB21] text-left">
              <div className="text-left flex-grow">
                <h4 className="font-headers text-base sm:text-lg font-bold text-brand-navy">Seu roteiro sempre com você</h4>
                <p className="text-xs sm:text-sm text-text-muted mt-1">Tudo organizado no celular: mapas, horários e atrações em um só lugar. Planeje no site e acompanhe tudo pelo aplicativo da 2GO.</p>
              </div>
              <button 
                onClick={() => setIsDownloadOpen(true)}
                className="bg-[#96AB21] hover:bg-[#85981D] text-brand-navy font-extrabold px-6 py-3.5 rounded-xl transition-all shadow-sm shadow-[#96AB21]/10 hover:scale-[1.01] active:scale-95 text-xs whitespace-nowrap cursor-pointer shrink-0"
              >
                Baixar App
              </button>
            </div>
          </ScrollReveal>
        </section>

        {/* 4. INTERACTIVE SIMULATOR */}
        <section className="py-20 md:py-28 bg-white border-b border-border-gray/50">
          <ScrollReveal className="container mx-auto px-6 max-w-5xl">
            <div className="text-center max-w-[620px] mx-auto mb-14 md:mb-16">
              <span className="bg-brand-green/10 text-brand-green text-[12px] font-extrabold tracking-widest px-3.5 py-1.5 rounded-full w-fit">
                TECNOLOGIA EXCLUSIVA
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
              <div className="lg:col-span-5 bg-[#F8FAFC] border border-border-gray rounded-[24px] p-6 flex flex-col justify-between text-left">
                <div className="flex flex-col gap-4">
                  <h4 className="font-headers text-base sm:text-lg font-bold text-brand-navy border-b border-border-gray pb-3">Parâmetros de Viagem</h4>
                  
                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] font-bold text-text-muted uppercase tracking-wide">Destino</span>
                    <div className="bg-white border border-border-gray px-4 py-2.5 rounded-xl text-sm font-semibold text-brand-navy flex items-center justify-between">
                      <span>Japão 🇯🇵</span>
                      <span className="text-xs font-normal text-text-muted">Tóquio & Kyoto</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[12px] font-bold text-text-muted uppercase tracking-wide">Duração</span>
                      <div className="bg-white border border-border-gray px-4 py-2.5 rounded-xl text-sm font-semibold text-brand-navy">
                        14 dias 📅
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[12px] font-bold text-text-muted uppercase tracking-wide">Companhia</span>
                      <div className="bg-white border border-border-gray px-4 py-2.5 rounded-xl text-sm font-semibold text-brand-navy">
                        Casal 👩‍❤️‍👨
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[12px] font-bold text-text-muted uppercase tracking-wide">Estilo de Viagem</span>
                    <div className="bg-white border border-border-gray px-4 py-2.5 rounded-xl text-sm font-semibold text-brand-navy">
                      Cultura, Templos & Comida 🍣
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <button
                    onClick={startSimulation}
                    disabled={simState === 'running'}
                    className={`btn w-full py-3.5 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] rounded-xl ${
                      simState === 'running' 
                        ? 'bg-brand-navy/10 text-brand-navy/40 border-transparent cursor-not-allowed' 
                        : 'bg-brand-orange hover:bg-brand-orange/95 text-white font-extrabold shadow-md shadow-brand-orange/10'
                    }`}
                  >
                    {simState === 'running' ? 'Organizando preferências...' : 'Simular Criação do Roteiro'}
                  </button>
                  {simState === 'done' && (
                    <Link 
                      href="/planejamento"
                      className="bg-brand-navy hover:bg-brand-navy/95 text-white font-extrabold py-3.5 rounded-xl text-center shadow-md shadow-brand-navy/10 animate-fade-in-up block text-xs"
                    >
                      Criar Meu Roteiro Sob Medida
                    </Link>
                  )}
                </div>
              </div>

              {/* Real-time Output Board */}
              <div className="lg:col-span-7 bg-[#F8FAFC] border border-border-gray rounded-[24px] p-6 flex flex-col min-h-[440px] relative overflow-hidden">
                {simState !== 'idle' && (
                  <div className="mb-6 animate-fade-in-up text-left">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-brand-navy">
                        {simProgress < 35 && '🔍 Estruturando preferências...'}
                        {simProgress >= 35 && simProgress < 65 && '🚄 Mapeando distâncias...'}
                        {simProgress >= 65 && simProgress < 85 && '🍣 Customizando rotas e almoço...'}
                        {simProgress >= 85 && simProgress < 100 && '⚙️ Finalizando cronogramas...'}
                        {simProgress === 100 && '✨ Roteiro Personalizado Gerado com Sucesso!'}
                      </span>
                      <span className="text-xs font-bold text-brand-orange">{simProgress}%</span>
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

                  {visibleDays.includes('day1') && (
                    <div className="bg-white border border-border-gray rounded-xl p-4 text-left shadow-xs animate-fade-in-up">
                      <div className="flex justify-between items-center mb-3">
                        <span className="bg-brand-orange/10 text-brand-orange text-[11px] font-bold px-2 py-0.5 rounded-md">DIA 1</span>
                        <span className="text-[12px] text-text-muted font-medium">Tóquio cultural</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2.5 items-start text-xs text-brand-navy">
                          <span className="text-sm shrink-0">⛩️</span>
                          <div>
                            <strong className="block font-semibold">Templo Senso-ji em Asakusa</strong>
                            <span className="text-[12px] text-text-muted">Visita agendada para primeiras horas da manhã (evitando filas).</span>
                          </div>
                        </div>
                        <div className="flex gap-2.5 items-start text-xs text-brand-navy">
                          <span className="text-sm shrink-0">🗼</span>
                          <div>
                            <strong className="block font-semibold">Shinjuku Sky & Jantar Típico</strong>
                            <span className="text-[12px] text-text-muted">Jantar tradicional sugerido no beco histórico Omoide Yokocho.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {visibleDays.includes('day2') && (
                    <div className="bg-white border border-border-gray rounded-xl p-4 text-left shadow-xs animate-fade-in-up">
                      <div className="flex justify-between items-center mb-3">
                        <span className="bg-brand-orange/10 text-brand-orange text-[11px] font-bold px-2 py-0.5 rounded-md">DIA 2</span>
                        <span className="text-[12px] text-text-muted font-medium">Monte Fuji & Hakone</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2.5 items-start text-xs text-brand-navy">
                          <span className="text-sm shrink-0">🗻</span>
                          <div>
                            <strong className="block font-semibold">Lago Ashi & Vista do Monte Fuji</strong>
                            <span className="text-[12px] text-text-muted">Passeio de catamarã pelo lago com paradas no Tori flutuante.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {visibleDays.includes('day3') && (
                    <div className="bg-white border border-border-gray rounded-xl p-4 text-left shadow-xs animate-fade-in-up">
                      <div className="flex justify-between items-center mb-3">
                        <span className="bg-brand-orange/10 text-brand-orange text-[11px] font-bold px-2 py-0.5 rounded-md">DIA 3</span>
                        <span className="text-[12px] text-text-muted font-medium">Kyoto Clássico</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-2.5 items-start text-xs text-brand-navy">
                          <span className="text-sm shrink-0">🌸</span>
                          <div>
                            <strong className="block font-semibold">Santuário de Fushimi Inari-taisha</strong>
                            <span className="text-[12px] text-text-muted">Caminhada sob os milhares de Torii tradicionais ladeando a floresta.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>



        {/* 6. EXPERIÊNCIA PERSONALIZADA (LIGHT BG REDESIGN) */}
        <section id="premium-custom" className="py-20 md:py-28 bg-[#F7F8FA] border-b border-border-gray/50 relative overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none select-none"></div>

          <ScrollReveal className="container mx-auto px-6">
            <div className="text-center max-w-[600px] mx-auto mb-14 md:mb-16">
              <span className="bg-brand-orange/10 text-brand-orange text-[12px] font-extrabold tracking-widest px-3.5 py-1.5 rounded-full w-fit">
                TOQUE HUMANO ESPECIALIZADO
              </span>
              <h2 className="font-headers text-3.5xl font-black mt-4 text-brand-navy tracking-tight">
                Quer um toque humano no seu planejamento?
              </h2>
              <p className="text-base font-bold text-brand-orange mt-2">
                A tecnologia organiza. Especialistas aperfeiçoam.
              </p>
              <p className="text-sm text-text-muted mt-2">
                Para viagens especiais, conte com um especialista da 2GO: atendimento individual, curadoria sob medida e suporte do início ao fim.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto w-full">
              {/* Left Column Chat Mockup (WhatsApp Business/Premium Style) */}
              <div className="bg-[#E5DDD5] border border-border-gray/45 rounded-[28px] overflow-hidden shadow-lg flex flex-col max-w-[420px] mx-auto w-full text-brand-navy relative min-h-[385px] font-sans">
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
                    <p className="text-[10px] font-black text-brand-orange uppercase tracking-wider mb-1 block">Curadoria Humana 2GO</p>
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
                  Curadoria Premium 🤝
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
                    <span className="text-xs sm:text-sm font-semibold text-brand-navy">Curadoria personalizada</span>
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
                  href="/premium"
                  className="bg-[#96AB21] hover:bg-[#85981D] text-[#081B6B] font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-sm shadow-[#96AB21]/10 hover:scale-[1.01] active:scale-95 text-xs inline-flex items-center gap-1.5 cursor-pointer border border-[#96AB21]/10 w-fit self-start"
                >
                  Agendar Consultoria
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* 7. TESTIMONIALS */}
        <section id="avaliacoes" className="py-20 md:py-28 bg-white border-b border-border-gray/50 scroll-mt-20">
          <ScrollReveal className="container mx-auto px-6">
            <div className="text-center max-w-[600px] mx-auto mb-14 md:mb-16">
              <span className="bg-brand-navy/10 text-brand-navy text-[12px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit">
                DEPOIMENTOS DE VIAJANTES
              </span>
              <h2 className="font-headers text-3.5xl font-black mt-4 text-brand-navy tracking-tight">
                Histórias reais de viajantes
              </h2>
              <p className="text-sm text-text-muted mt-3">
                Histórias reais de quem organizou a rota em minutos e viajou sem dor de cabeça.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
              {[
                { 
                  name: 'Amanda Martins', 
                  initial: 'AM', 
                  text: 'Foi como ter uma amiga especialista cuidando de cada detalhe.', 
                  trip: 'Noronha • Curadoria VIP' 
                },
                { 
                  name: 'Rodrigo Fonseca', 
                  initial: 'RF', 
                  text: 'Sentimos que o roteiro tinha sido feito para nós.', 
                  trip: 'Tóquio • Roteiro Personalizado' 
                },
                { 
                  name: 'Luísa Cavalcanti', 
                  initial: 'LC', 
                  text: 'Economizei semanas de pesquisa.', 
                  trip: 'Lisboa • Roteiro Sob Medida' 
                }
              ].map((review, idx) => (
                <div key={idx} className="group bg-[#F7F8FA] border border-border-gray/70 p-6 sm:p-8 rounded-[24px] shadow-xs hover:shadow-md hover:translate-y-[-2px] transition-all duration-300 flex flex-col text-left">
                  <span className="bg-brand-green/10 text-brand-green text-[11px] font-extrabold tracking-widest px-2.5 py-1 rounded w-fit mb-6">FEEDBACK VERIFICADO</span>
                  <p className="text-base italic leading-relaxed mb-6 flex-grow font-semibold text-brand-navy">
                    "{review.text}"
                  </p>
                  <div className="flex items-center gap-3.5 mt-auto pt-4 border-t border-border-gray/30">
                    <div className="w-10 h-10 rounded-full bg-brand-navy text-white font-headers font-bold text-sm flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
                      {review.initial}
                    </div>
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
        <section className="py-20 md:py-28 bg-[#F7F8FA] relative overflow-hidden">
          <div className="absolute top-10 left-10 w-2.5 h-2.5 bg-brand-orange/40 rounded-full"></div>
          <div className="absolute bottom-20 left-1/3 w-3 h-3 bg-brand-green/30 rounded-full"></div>

          <ScrollReveal className="container mx-auto px-6">
            <div className="bg-[#FAF9F6] text-brand-navy p-8 md:p-16 rounded-[32px] relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center gap-12 text-left shadow-lg border border-brand-navy/5">
              {/* Subtle background glow */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none select-none"></div>
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#96AB21]/10 rounded-full blur-[100px] pointer-events-none select-none"></div>

              <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 relative z-10 w-full">
                <span className="bg-brand-orange text-white text-[11px] font-extrabold tracking-widest px-2.5 py-1 rounded-full w-fit">
                  INICIE SEU PLANO
                </span>
                <h2 className="font-headers text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-brand-navy">
                  Crie seu roteiro perfeito em poucos toques
                </h2>
                <p className="text-sm md:text-base text-text-muted leading-relaxed">
                  O app da 2GO organiza seu roteiro diário, otimizado e sob medida.
                </p>
                
                <div className="flex flex-col gap-2 mt-2 w-full sm:w-auto items-center sm:items-start">
                  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <button 
                      onClick={() => setIsDownloadOpen(true)}
                      className="bg-[#96AB21] hover:bg-[#85981D] text-brand-navy font-extrabold px-8 py-4 rounded-xl shadow-md shadow-[#96AB21]/10 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:scale-[1.01] active:scale-95"
                    >
                      Baixar App
                    </button>
                    <Link 
                      href="/planejamento"
                      className="border border-brand-navy/30 text-brand-navy hover:bg-brand-navy/5 font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center"
                    >
                      Criar Meu Roteiro
                    </Link>
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

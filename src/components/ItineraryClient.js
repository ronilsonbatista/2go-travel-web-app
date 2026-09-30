"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Clock, MapPin, Lock, Unlock, Sparkles, Smartphone, 
  Share2, ChevronRight, ArrowRight, Coffee, Utensils, Hotel, 
  Map, MoreVertical, Star 
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import AppDownloadModal from './AppDownloadModal';
import NewsletterBox from './NewsletterBox';
import JsonLd from './JsonLd';
import { getItinerarySchema, getFAQSchema } from '@/lib/schema';
import { trackPageView } from '@/lib/analytics';
import { absoluteSiteUrl } from '@/lib/site';

const EVENT_IMAGES = {
  louvre: 'https://images.unsplash.com/photo-1543349689-9a4d426bee87?auto=format&fit=crop&w=150&q=80',
  torre: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=150&q=80',
  tuileries: 'https://images.unsplash.com/photo-1522093007474-d86e9b92447e?auto=format&fit=crop&w=150&q=80',
  champs: 'https://images.unsplash.com/photo-1509060464153-44667396260f?auto=format&fit=crop&w=150&q=80',
  trocadero: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=150&q=80',
  coliseu: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=150&q=80',
  trevi: 'https://images.unsplash.com/photo-1529260830199-44552e00f13f?auto=format&fit=crop&w=150&q=80',
  pantheon: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=150&q=80',
  vaticano: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=150&q=80',
  belem: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=150&q=80',
  castelo: 'https://images.unsplash.com/photo-1509840841025-9088ba78a826?auto=format&fit=crop&w=150&q=80',
  alfama: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=150&q=80',
};

export default function ItineraryClient({ itinerary, destination }) {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [copied, setCopied] = useState(false);
  const [activeMenuEventIdx, setActiveMenuEventIdx] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  
  // Real-time Countdown and Tabs state
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 23, hours: 12, minutes: 24, seconds: 59 });

  // Ticker for countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Prevent hydration mismatches by reading local storage in useEffect
  useEffect(() => {
    trackPageView('itinerary', itinerary.slug);
    
    if (typeof window !== 'undefined') {
      const purchased = JSON.parse(localStorage.getItem('purchased_roteiros') || '[]');
      const unlocked = purchased.includes(itinerary.slug) || 
                       localStorage.getItem('itinerary_unlocked_all') === 'true' || 
                       localStorage.getItem(`itinerary_unlocked_${itinerary.slug}`) === 'true';
      if (unlocked) {
        setIsUnlocked(true);
      }
    }
  }, [itinerary.slug]);

  // Click outside listener for action dropdown
  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveMenuEventIdx(null);
    };
    if (activeMenuEventIdx !== null) {
      window.addEventListener('click', handleOutsideClick);
    }
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [activeMenuEventIdx]);

  if (!itinerary) return null;

  const handleUnlock = () => {
    if (typeof window !== 'undefined') {
      const purchased = JSON.parse(localStorage.getItem('purchased_roteiros') || '[]');
      if (!purchased.includes(itinerary.slug)) {
        purchased.push(itinerary.slug);
        localStorage.setItem('purchased_roteiros', JSON.stringify(purchased));
      }
      localStorage.setItem(`itinerary_unlocked_${itinerary.slug}`, 'true');
    }
    setIsUnlocked(true);
    
    // Trigger festive confetti
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#081B6B', '#F47A20', '#96AB21']
    });
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Three dots menu helpers (Fase 5.4)
  const handleCopyEventLink = (title) => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}${window.location.pathname}?event=${encodeURIComponent(title)}`;
      navigator.clipboard.writeText(url);
      showToast('Link da atração copiado!');
    }
  };

  const handleSaveEvent = (title) => {
    showToast(`✓ "${title}" salvo nos favoritos!`);
  };

  const handleReportEvent = (title) => {
    showToast('Obrigado! Enviado para revisão.');
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Generate dynamic date labels starting from today
  const getDayLabel = (dIdx) => {
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + dIdx);
    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const dayName = weekdays[baseDate.getDay()];
    const dayNum = String(baseDate.getDate()).padStart(2, '0');
    const monthNum = String(baseDate.getMonth() + 1).padStart(2, '0');
    return `${dayName} ${dayNum}/${monthNum}`;
  };

  // Map icons and metadata dynamically based on event keywords
  const getEventMeta = (title) => {
    const t = title.toLowerCase();
    let rating = '4.6★';
    let price = 'Grátis';
    
    if (t.includes('louvre')) { rating = '4.7★'; price = '€22'; }
    else if (t.includes('eiffel') || t.includes('torre')) { rating = '4.8★'; price = '€28'; }
    else if (t.includes('coliseu')) { rating = '4.9★'; price = '€18'; }
    else if (t.includes('trevi')) { rating = '4.7★'; price = 'Grátis'; }
    else if (t.includes('pantheon') || t.includes('panteão')) { rating = '4.8★'; price = '€5'; }
    else if (t.includes('vaticano')) { rating = '4.8★'; price = '€25'; }
    else if (t.includes('belém') || t.includes('jerónimos')) { rating = '4.8★'; price = '€10'; }
    else if (t.includes('castelo')) { rating = '4.6★'; price = '€15'; }
    else if (t.includes('almoço') || t.includes('jantar') || t.includes('restaurante')) { rating = '4.5★'; price = '$$'; }
    
    return { rating, price };
  };

  // Renders a countdown digit block
  const renderDigits = (num) => {
    const digits = String(num).padStart(2, '0').split('');
    return digits.map((digit, idx) => (
      <span 
        key={idx} 
        className="inline-block bg-[#E13B22] text-white text-xs sm:text-sm font-black px-1.5 py-1 rounded-[6px] mx-[1px] shadow-sm font-mono min-w-[20px] text-center"
      >
        {digit}
      </span>
    ));
  };

  // Renders transit notes between events
  const renderTransitInfo = (idx) => {
    const transits = [
      'Deslocamento: 1,2 KM (16 minutos)',
      'Deslocamento: 400m (5 minutos)',
      'Deslocamento: 1,5 KM (18 minutos)',
      'Deslocamento: 300m (3 minutos)',
      'Deslocamento: 2,0 KM (24 minutos)'
    ];
    const transitText = transits[idx % transits.length];
    return (
      <div className="pl-[78px] text-[10px] text-text-muted font-bold text-left py-1 animate-fade-in flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-border-gray" />
        <span>{transitText}</span>
      </div>
    );
  };

  // Action menu dropdown UI
  const renderActionDropdown = (event, eIdx) => {
    if (activeMenuEventIdx !== eIdx) return null;

    return (
      <div className="absolute right-0 mt-6 w-44 bg-white border border-border-gray rounded-xl shadow-lg z-50 py-1.5 animate-fade-in text-xs font-semibold text-brand-navy text-left">
        <button
          onClick={() => {
            const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.title + ' ' + destName)}`;
            window.open(url, '_blank');
            setActiveMenuEventIdx(null);
          }}
          className="w-full px-4 py-2 hover:bg-bg-light hover:text-brand-orange text-left flex items-center gap-2 cursor-pointer"
        >
          📍 Abrir no Mapa
        </button>
        <button
          onClick={() => {
            handleSaveEvent(event.title);
            setActiveMenuEventIdx(null);
          }}
          className="w-full px-4 py-2 hover:bg-bg-light hover:text-brand-orange text-left flex items-center gap-2 cursor-pointer"
        >
          ⭐ Salvar Atração
        </button>
        <button
          onClick={() => {
            handleCopyEventLink(event.title);
            setActiveMenuEventIdx(null);
          }}
          className="w-full px-4 py-2 hover:bg-bg-light hover:text-brand-orange text-left flex items-center gap-2 cursor-pointer"
        >
          🔗 Compartilhar
        </button>
        <button
          onClick={() => {
            handleReportEvent(event.title);
            setActiveMenuEventIdx(null);
          }}
          className="w-full px-4 py-2 hover:bg-bg-light hover:text-red-500 text-left flex items-center gap-2 cursor-pointer border-t border-border-gray/50 mt-1 pt-1.5"
        >
          ⚠️ Reportar Info
        </button>
      </div>
    );
  };

  // Renders the specific card style based on keyword detection
  const renderEventCard = (event, eIdx) => {
    const title = event.title;
    const desc = event.desc || '';
    const t = title.toLowerCase();
    
    const isAccomodation = t.includes('hospedagem') || t.includes('hotel') || t.includes('pousada') || t.includes('check-in');
    const isBreakfast = t.includes('café') || t.includes('boulangerie');
    const isMeal = t.includes('almoço') || t.includes('jantar') || t.includes('restaurante') || t.includes('bistrô') || t.includes('comer') || t.includes('gastronomia');
    
    let icon = <MapPin className="w-4 h-4 text-brand-orange" />;
    if (isAccomodation) icon = <Hotel className="w-4 h-4 text-brand-green" />;
    else if (isBreakfast) icon = <Coffee className="w-4 h-4 text-brand-orange" />;
    else if (isMeal) icon = <Utensils className="w-4 h-4 text-brand-orange" />;

    let imgUrl = null;
    Object.keys(EVENT_IMAGES).forEach(key => {
      if (t.includes(key)) {
        imgUrl = EVENT_IMAGES[key];
      }
    });

    if (isAccomodation || isBreakfast || isMeal) {
      // Note-style card (Simple, clean layout)
      return (
        <div className="flex-grow min-w-0 bg-white border border-border-gray/70 rounded-2xl p-3 sm:p-4 shadow-sm flex items-center justify-between gap-3 relative">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-bg-light flex items-center justify-center shrink-0">
              {icon}
            </div>
            <div className="text-left min-w-0">
              <h4 className="font-headers text-xs sm:text-sm font-bold text-brand-navy break-words">{title}</h4>
              <p className="text-[10px] text-text-muted mt-0.5 break-words">{desc || (isBreakfast ? 'Ver recomendações' : isAccomodation ? 'Para otimizar o deslocamento' : 'Horário livre para refeição')}</p>
            </div>
          </div>
          <div className="relative shrink-0">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setActiveMenuEventIdx(activeMenuEventIdx === eIdx ? null : eIdx);
              }}
              className="text-text-muted hover:text-brand-navy p-1 cursor-pointer"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            {renderActionDropdown(event, eIdx)}
          </div>
        </div>
      );
    } else {
      // Attraction-style card (With thumbnail and rating)
      const { rating, price } = getEventMeta(title);
      const thumb = imgUrl || (destination ? destination.image : 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=150&q=80');
      
      return (
        <div className="flex-grow min-w-0 bg-white border border-border-gray/70 rounded-2xl overflow-hidden shadow-sm flex hover:border-brand-orange/30 transition-all duration-300">
          <div className="w-16 sm:w-28 h-24 sm:h-28 shrink-0 relative bg-bg-light border-r border-border-gray/30">
            <img src={thumb} alt={title} className="w-full h-full object-cover" />
          </div>
          <div className="p-3 sm:p-4 flex flex-col justify-between flex-grow min-w-0 text-left relative">
            <div>
              <div className="flex justify-between items-start gap-2 pr-6">
                <h4 className="font-headers text-xs sm:text-sm font-bold text-brand-navy leading-snug line-clamp-2">
                  {title}
                </h4>
                <div className="flex items-center gap-0.5 text-[9px] font-bold text-brand-orange bg-brand-orange/10 px-1.5 py-0.5 rounded shrink-0">
                  <Star className="w-2.5 h-2.5 fill-brand-orange text-brand-orange" />
                  <span>{rating.replace('★', '')}</span>
                </div>
              </div>
              <p className="text-[10px] text-text-muted mt-1 line-clamp-1 leading-relaxed">
                {desc || 'Ponto de interesse sugerido por curadores locais.'}
              </p>
            </div>
            
            <div className="absolute right-3 top-3">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMenuEventIdx(activeMenuEventIdx === eIdx ? null : eIdx);
                }}
                className="text-text-muted hover:text-brand-navy p-1 cursor-pointer"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              {renderActionDropdown(event, eIdx)}
            </div>

            <div className="flex justify-between items-center mt-2 border-t border-border-gray/30 pt-2">
              <span className="text-[9px] font-black tracking-wide text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-md">
                {price}
              </span>
              <span className="text-[9px] font-bold text-text-muted">
                Duração: 1.5h
              </span>
            </div>
          </div>
        </div>
      );
    }
  };

  const destName = destination ? destination.name : '';

  // Generate Schemas
  const itinerarySchema = getItinerarySchema(itinerary, destName);
  const faqSchema = destination && destination.faqs ? getFAQSchema(destination.faqs) : null;

  // Floating map click deep link/modal handler (Fase 5.2)
  const handleMapClick = () => {
    if (!isUnlocked) {
      setIsCheckoutOpen(true);
      return;
    }

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      const appUrl = `twogo://itinerary/${itinerary.slug}`;
      const start = Date.now();
      window.location.href = appUrl;
      
      setTimeout(() => {
        if (Date.now() - start < 1500) {
          setIsMapModalOpen(true);
        }
      }, 1000);
    } else {
      setIsMapModalOpen(true);
    }
  };

  const MapModal = () => {
    if (!isMapModalOpen) return null;

    const mapSearchQuery = encodeURIComponent(destName + ' turismo');
    const browserMapUrl = `https://www.google.com/maps/search/?api=1&query=${mapSearchQuery}`;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
        <div className="bg-white border border-border-gray rounded-[28px] max-w-md w-full p-6 text-center shadow-lg relative animate-scale-up">
          <button
            onClick={() => setIsMapModalOpen(false)}
            className="absolute top-4 right-4 text-text-muted hover:text-brand-navy p-1 text-sm font-bold cursor-pointer"
          >
            ✕
          </button>
          
          <span className="bg-brand-orange/10 text-brand-orange text-[9px] font-extrabold tracking-wide px-3 py-1 rounded-full font-headers">
            Mapa interativo
          </span>
          
          <h3 className="font-headers text-lg font-bold text-brand-navy mt-4">
            Mapa de {destName}
          </h3>
          <p className="text-xs text-text-muted mt-2 mb-6">
            Acesse as rotas completas do seu roteiro otimizadas por satélite.
          </p>

          <div className="w-full h-44 rounded-2xl bg-bg-light border border-border-gray overflow-hidden relative mb-6 shadow-xs">
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70"></div>
            <svg className="w-full h-full text-brand-navy" viewBox="0 0 200 100">
              <path d="M20,80 Q60,20 100,50 T180,30" fill="none" stroke="#F47A20" strokeWidth="3" strokeDasharray="5,5" />
              <circle cx="20" cy="80" r="6" fill="#081B6B" />
              <circle cx="100" cy="50" r="6" fill="#081B6B" />
              <circle cx="180" cy="30" r="6" fill="#081B6B" />
            </svg>
            <div className="absolute bottom-2 right-2 bg-brand-navy text-white text-[9px] font-bold px-2 py-0.5 rounded font-headers">
              Visualização de Rota
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <a
              href={browserMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary justify-center text-xs py-3 cursor-pointer"
            >
              Ver no Google Maps
            </a>
            
            <div className="border-t border-border-gray/50 my-2 pt-3">
              <span className="text-[9px] font-extrabold text-brand-navy tracking-wide block mb-2 font-headers">Sincronizar com o celular</span>
              <div className="p-2 bg-white border border-border-gray rounded-xl w-24 h-24 mx-auto flex items-center justify-center shadow-xs">
                <QRCodeSVG 
                  value={typeof window !== 'undefined' ? window.location.href : absoluteSiteUrl(`/roteiros/${itinerary.slug}`)} 
                  size={80}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy pb-36 lg:pb-24">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      {/* JSON-LD Schemas */}
      <JsonLd schema={itinerarySchema} />
      {faqSchema && <JsonLd schema={faqSchema} />}

      {/* Toast popup */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-brand-navy text-white text-xs font-bold px-5 py-3 rounded-xl shadow-lg z-50 animate-bounce">
          {toastMessage}
        </div>
      )}

      <main className="flex-grow pt-32">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1440px] w-full mt-6 min-w-0">
          <Breadcrumbs />

          {/* Roteiro Hero Section */}
          <div className="bg-white border border-border-gray rounded-[28px] p-4 sm:p-8 shadow-xs mb-8 mt-4 text-left flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-brand-orange/10 text-brand-orange text-[9px] font-extrabold tracking-wide px-2.5 py-1 rounded-md font-headers">
                  Prévia do roteiro
                </span>
                <span className="bg-brand-navy/10 text-brand-navy text-[9px] font-extrabold tracking-wide px-2.5 py-1 rounded-md font-headers">
                  Curadoria 2GO
                </span>
              </div>
              <h1 className="font-headers text-2xl sm:text-3.5xl font-black text-brand-navy mt-3 leading-tight break-words">
                {itinerary.title}
              </h1>
              <p className="text-xs sm:text-sm text-text-muted mt-2 max-w-[620px] leading-relaxed">
                {itinerary.desc}
              </p>
            </div>

            <div className="flex gap-2.5 w-full md:w-auto shrink-0 justify-end">
              <button 
                onClick={handleCopyLink}
                className="btn btn-outline py-2.5 px-4 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer justify-center flex-1 sm:flex-initial"
              >
                <Share2 className="w-3.5 h-3.5 text-brand-orange" />
                <span>{copied ? 'Copiado!' : 'Compartilhar'}</span>
              </button>
              
              <button 
                onClick={() => setIsDownloadOpen(true)}
                className="btn btn-primary py-2.5 px-4 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer justify-center flex-1 sm:flex-initial"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Baixar o App</span>
              </button>
            </div>
          </div>

          {/* Day 1 Badge */}
          <div className="flex items-center gap-2 mb-6 text-left">
            <span className="px-5 py-2.5 rounded-full text-xs font-extrabold bg-brand-navy text-white shadow-sm border border-brand-navy">
              Dia 1 • Prévia da Programação
            </span>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Active Day 1 timeline */}
            <div className="lg:col-span-8 flex flex-col gap-6 w-full">
              
              {/* Day 1 timeline card */}
              <div className="bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] shadow-sm relative">
                
                {/* Timeline Header */}
                <div className="flex justify-between items-start gap-3 border-b border-border-gray/50 pb-4 mb-6 text-left">
                  <div className="min-w-0">
                    <span className="text-[9px] font-black text-brand-orange tracking-wide font-headers">Programação do dia 1</span>
                    <h3 className="font-headers text-base sm:text-lg font-bold text-brand-navy mt-1">
                      {itinerary.days && itinerary.days[0] ? itinerary.days[0].title : 'Chegada e primeiras atrações'}
                    </h3>
                  </div>
                  <span className="text-[10px] font-black text-brand-navy bg-brand-navy/10 px-3 py-1 rounded-full tracking-wide font-headers shrink-0">
                    Dia 1
                  </span>
                </div>

                {/* Real Timeline for Day 1 */}
                <div className="flex flex-col gap-4 relative">
                  {/* Timeline vertical bar */}
                  <div className="absolute left-[65px] top-3 bottom-3 w-0.5 bg-brand-navy z-0"></div>

                  {itinerary.days && itinerary.days[0] && itinerary.days[0].events.map((event, eIdx) => (
                    <div key={eIdx} className="flex flex-col gap-2">
                      <div className="flex gap-3 sm:gap-4 items-start relative z-10 min-w-0">
                        {/* Time */}
                        <span className="text-xs font-bold text-brand-navy w-12 shrink-0 py-2.5 text-right font-headers font-mono">
                          {event.time}
                        </span>
                        
                        {/* Timeline indicator node */}
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-brand-navy bg-white mt-3 shrink-0 shadow-sm animate-fade-in"></div>
                        
                        {/* Render Rich Event Card */}
                        {renderEventCard(event, eIdx)}
                      </div>
                      
                      {/* Render Transit Info between events */}
                      {eIdx < itinerary.days[0].events.length - 1 && renderTransitInfo(eIdx)}
                    </div>
                  ))}
                </div>
              </div>

              {/* App CTA replacing days 2+ */}
              <div className="bg-gradient-to-br from-brand-navy via-[#0A2288] to-brand-navy text-white border border-brand-navy/20 p-8 sm:p-10 rounded-[28px] text-center flex flex-col items-center gap-5 shadow-lg relative overflow-hidden">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-brand-orange border border-white/20 mb-1">
                  <Smartphone className="w-7 h-7" />
                </div>
                <h3 className="font-headers text-xl sm:text-2xl font-black leading-tight text-white">
                  Crie seu roteiro personalizado no app
                </h3>
                <p className="text-xs sm:text-sm text-white/80 max-w-lg leading-relaxed">
                  Baixe o aplicativo da 2GO para gerar todos os dias, editar sua programação e acompanhar o roteiro durante a viagem.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mt-2">
                  <button 
                    onClick={() => setIsDownloadOpen(true)}
                    className="btn bg-brand-orange hover:bg-brand-orange/95 text-white font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-md text-xs flex items-center justify-center gap-2 cursor-pointer border border-brand-orange/20 font-headers w-full"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Baixar o App</span>
                  </button>
                  <Link 
                    href={`/planejamento?destino=${itinerary.destinationSlug}`}
                    className="btn border border-white/30 text-white bg-white/10 hover:bg-white/20 py-3.5 px-6 rounded-xl transition-all text-xs flex items-center justify-center gap-2 cursor-pointer font-headers w-full"
                  >
                    <span>Criar roteiro</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-6 w-full text-left">
              
              {/* QR Code offline sync card */}
              <div className="bg-white border border-border-gray p-6 rounded-[24px] shadow-sm flex flex-col gap-4 text-left">
                <span className="text-[9px] font-extrabold text-brand-orange tracking-wide flex items-center gap-1 font-headers">
                  <Smartphone className="w-3.5 h-3.5" /> Levar na viagem
                </span>
                <h4 className="font-headers font-bold text-brand-navy text-sm leading-tight">
                  Acesse no aplicativo
                </h4>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  Escaneie o QR Code abaixo para baixar o app 2GO e acessar seu roteiro completo offline.
                </p>
                
                {/* QR Code */}
                <div className="p-3 bg-bg-light border border-border-gray/50 rounded-xl w-fit mx-auto flex items-center justify-center shadow-xs">
                  <QRCodeSVG 
                    value={typeof window !== 'undefined' ? window.location.href : absoluteSiteUrl(`/roteiros/${itinerary.slug}`)} 
                    size={120}
                  />
                </div>
              </div>

              {/* Dicas locais */}
              <div className="bg-white border border-border-gray p-6 rounded-[24px] shadow-sm flex flex-col gap-3">
                <span className="text-[9px] font-extrabold text-brand-orange tracking-wide block font-headers">Dicas do curador</span>
                <h4 className="font-headers font-bold text-brand-navy text-sm leading-tight">Como aproveitar {destName || 'seu destino'}</h4>
                <ul className="text-[11px] text-text-muted flex flex-col gap-2.5 list-none p-0 m-0 text-left">
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-orange font-bold shrink-0">•</span>
                    <span>Evite horários de pico nas atrações mais famosas visitando-as no início da manhã ou fim de tarde.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-orange font-bold shrink-0">•</span>
                    <span>Reserve restaurantes gourmet com pelo menos 2 a 3 dias de antecedência para garantir mesa.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <span className="text-brand-orange font-bold shrink-0">•</span>
                    <span>Use calçados confortáveis; a curadoria foi pensada para otimizar caminhadas cênicas.</span>
                  </li>
                </ul>
              </div>

              {/* Roteiros Relacionados */}
              <div className="bg-white border border-border-gray p-6 rounded-[24px] shadow-sm flex flex-col gap-3">
                <span className="text-[9px] font-extrabold text-brand-navy tracking-wide block font-headers">Roteiros recomendados</span>
                <h4 className="font-headers font-bold text-brand-navy text-sm leading-tight font-bold">Mais roteiros no app</h4>
                <div className="flex flex-col gap-3 mt-1 text-left">
                  {[
                    { title: `Roteiro completo de ${destName || 'Destino'} no App`, duration: 'Personalizável' },
                    { title: `Guia Gastronômico de ${destName || 'Destino'}`, duration: '3 a 7 Dias' }
                  ].map((related, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 rounded-xl border border-border-gray/70 hover:border-brand-orange/30 transition-all text-xs">
                      <div>
                        <span className="font-bold text-brand-navy block leading-tight">{related.title}</span>
                        <span className="text-[10px] text-text-muted mt-1 block">Duração: {related.duration}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-brand-orange shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Newsletter Box at the base of the page */}
          <div className="mt-12 w-full">
            <NewsletterBox destinationName={destination ? destination.name : ''} />
          </div>

        </div>
      </main>

      {/* Floating Mapa Button */}
      <div className="fixed bottom-24 lg:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[calc(100%-2rem)]">
        <button 
          onClick={handleMapClick}
          className="bg-brand-navy hover:bg-brand-navy/95 text-white font-bold px-5 sm:px-6 py-3 rounded-full flex items-center gap-1.5 shadow-lg shadow-brand-navy/20 cursor-pointer transition-all hover:scale-105 active:scale-95 text-xs tracking-wide font-headers"
        >
          <Map className="w-4 h-4 text-brand-orange shrink-0" />
          <span>Abrir mapa no app</span>
        </button>
      </div>

      <Footer onOpenDownload={() => setIsDownloadOpen(true)} />

      <AppDownloadModal 
        isOpen={isDownloadOpen} 
        onClose={() => setIsDownloadOpen(false)} 
      />

      <MapModal />
    </div>
  );
}

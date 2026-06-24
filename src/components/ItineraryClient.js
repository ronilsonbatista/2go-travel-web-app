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
import LeadWallModal from './LeadWallModal';
import NewsletterBox from './NewsletterBox';
import AffiliateDeals from './AffiliateDeals';
import JsonLd from './JsonLd';
import { getItinerarySchema, getFAQSchema } from '@/lib/schema';
import { trackPageView } from '@/lib/analytics';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [copied, setCopied] = useState(false);
  
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
      const unlocked = localStorage.getItem('itinerary_unlocked_all') === 'true' || 
                       localStorage.getItem(`itinerary_unlocked_${itinerary.slug}`) === 'true';
      if (unlocked) {
        setIsUnlocked(true);
      }
    }
  }, [itinerary.slug]);

  if (!itinerary) return null;

  const handleUnlock = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`itinerary_unlocked_${itinerary.slug}`, 'true');
      localStorage.setItem('itinerary_unlocked_all', 'true');
    }
    setIsUnlocked(true);
    
    // Trigger festive confetti
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
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

  // Renders the specific card style based on keyword detection
  const renderEventCard = (event) => {
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
        <div className="flex-grow bg-white border border-border-gray/70 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-bg-light flex items-center justify-center shrink-0">
              {icon}
            </div>
            <div className="text-left">
              <h4 className="font-headers text-xs sm:text-sm font-bold text-brand-navy">{title}</h4>
              <p className="text-[10px] text-text-muted mt-0.5">{desc || (isBreakfast ? 'Ver recomendações' : isAccomodation ? 'Para otimizar o deslocamento' : 'Horário livre para refeição')}</p>
            </div>
          </div>
          <button className="text-text-muted hover:text-brand-navy p-1 cursor-pointer">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      );
    } else {
      // Attraction-style card (With thumbnail and rating)
      const { rating, price } = getEventMeta(title);
      const thumb = imgUrl || (destination ? destination.image : 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=150&q=80');
      
      return (
        <div className="flex-grow bg-white border border-border-gray/70 rounded-2xl overflow-hidden shadow-sm flex hover:border-brand-orange/30 transition-all duration-300">
          <div className="w-24 sm:w-28 h-24 sm:h-28 shrink-0 relative bg-bg-light border-r border-border-gray/30">
            <img src={thumb} alt={title} className="w-full h-full object-cover" />
          </div>
          <div className="p-3 sm:p-4 flex flex-col justify-between flex-grow text-left">
            <div>
              <div className="flex justify-between items-start gap-2">
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
            <div className="flex justify-between items-center mt-2 border-t border-border-gray/30 pt-2">
              <span className="text-[9px] font-black uppercase tracking-wider text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-md">
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

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy pb-24">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />
      
      <JsonLd schema={itinerarySchema} />
      {faqSchema && <JsonLd schema={faqSchema} />}

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-5xl text-left">
          
          <Breadcrumbs items={[
            { name: 'Roteiros', url: '/roteiros' },
            { name: itinerary.title, url: `/roteiros/${itinerary.slug}` }
          ]} />

          {/* Cover Header Banner Card (App Mockup Style) */}
          <div className="relative rounded-[28px] overflow-hidden bg-brand-navy text-white p-6 sm:p-8 my-4 shadow-md min-h-[220px] flex flex-col justify-between">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-[0.4] pointer-events-none select-none"
              style={{ backgroundImage: `url(${destination ? destination.image : ''})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/95 via-brand-navy/40 to-transparent pointer-events-none" />

            {/* Top Bar with back button and options */}
            <div className="relative z-10 flex justify-between items-center w-full">
              <Link 
                href="/roteiros"
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-navy hover:scale-105 transition-all shadow-sm"
              >
                <ArrowLeft className="w-4.5 h-4.5" />
              </Link>
              <div className="flex gap-2">
                <button 
                  onClick={handleCopyLink}
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-xs flex items-center justify-center text-white transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Bottom Details with Title and duration */}
            <div className="relative z-10 flex justify-between items-end w-full mt-12">
              <div className="text-left">
                <span className="bg-brand-orange text-white text-[9px] font-extrabold tracking-widest px-2.5 py-1 rounded-full w-fit">
                  {destination ? destination.country.toUpperCase() : 'ROTEIRO'}
                </span>
                <h1 className="font-headers text-2.5xl sm:text-4xl font-extrabold mt-2 tracking-tight text-white leading-tight">
                  {destination ? destination.name : itinerary.title}
                </h1>
              </div>
              <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl">
                {itinerary.duration} {itinerary.duration === 1 ? 'Dia' : 'Dias'}
              </span>
            </div>
          </div>

          {/* App Promotional Offer Banner */}
          {!isUnlocked && (
            <div 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#121829] text-white rounded-2xl p-4 mb-4 shadow-sm flex items-center justify-between gap-4 cursor-pointer hover:bg-black/90 transition-all border border-white/5"
            >
              <div className="flex items-center gap-3 text-left">
                <div className="w-9 h-9 rounded-xl bg-[#96AB21] text-brand-navy flex items-center justify-center shrink-0 shadow-md shadow-[#96AB21]/20 animate-pulse">
                  <Unlock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-headers text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                    <span>Acesso Imediato</span>
                    <span className="bg-brand-orange text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">OFFER</span>
                  </h4>
                  <p className="text-[10px] text-white/70 mt-0.5 leading-normal">
                    Tenha acesso a todos os dias de roteiro por apenas <strong className="text-[#96AB21]">R$ 18,99</strong>
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-white/50 shrink-0" />
            </div>
          )}

          {/* Countdown timer card */}
          {!isUnlocked && (
            <div className="bg-white border border-border-gray p-4 rounded-2xl shadow-xs mb-8 flex flex-row items-center justify-between gap-4 text-left">
              <span className="text-[10px] font-extrabold text-brand-navy uppercase tracking-wider">
                Faltam apenas
              </span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {renderDigits(timeLeft.days)}
                  <span className="text-[8px] font-extrabold text-text-muted uppercase ml-1">dias</span>
                </div>
                <div className="flex items-center gap-0.5">
                  {renderDigits(timeLeft.hours)}
                  <span className="text-[8px] font-extrabold text-text-muted uppercase ml-1">horas</span>
                </div>
                <div className="flex items-center gap-0.5">
                  {renderDigits(timeLeft.minutes)}
                  <span className="text-[8px] font-extrabold text-text-muted uppercase ml-1">minutos</span>
                </div>
              </div>
            </div>
          )}

          {/* Day selection tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 custom-scrollbar-hide -mx-6 px-6">
            {itinerary.days.map((day, dIdx) => {
              const isActive = activeDayIndex === dIdx;
              const isLocked = dIdx > 0 && !isUnlocked;
              const dayLabel = getDayLabel(dIdx);
              
              return (
                <button
                  key={dIdx}
                  onClick={() => {
                    if (isLocked) {
                      setIsModalOpen(true);
                    } else {
                      setActiveDayIndex(dIdx);
                    }
                  }}
                  className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer border shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-brand-navy border-brand-navy text-white shadow-sm'
                      : 'bg-white border-border-gray text-text-muted hover:border-brand-navy/30 hover:text-brand-navy'
                  }`}
                >
                  <span>{dayLabel}</span>
                  {isLocked && <Lock className="w-3 h-3 text-brand-orange/80 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Active Day timeline */}
            <div className="lg:col-span-8 flex flex-col gap-6 w-full">
              
              {/* Active day's timeline card */}
              <div className="bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] shadow-sm relative">
                
                {/* Timeline Header */}
                <div className="flex justify-between items-center border-b border-border-gray/50 pb-4 mb-6 text-left">
                  <div>
                    <span className="text-[9px] font-black text-brand-orange uppercase tracking-wider">PROGRAMAÇÃO ATIVA</span>
                    <h3 className="font-headers text-base sm:text-lg font-bold text-brand-navy mt-1">
                      {isUnlocked || activeDayIndex === 0 
                        ? itinerary.days[activeDayIndex].title 
                        : 'Programação de Dia Completo Oculta'}
                    </h3>
                  </div>
                  <span className="text-[10px] font-black text-brand-navy bg-brand-navy/10 px-3 py-1 rounded-full uppercase tracking-wider">
                    {itinerary.days[activeDayIndex].day}
                  </span>
                </div>

                {/* Timeline content */}
                {activeDayIndex > 0 && !isUnlocked ? (
                  // Locked placeholder state
                  <div className="relative py-6">
                    {/* Blurred mockup events */}
                    <div className="flex flex-col gap-6 select-none blur-md pointer-events-none pr-8">
                      <div className="flex gap-4 items-start">
                        <span className="text-xs font-bold text-text-muted w-12 shrink-0 font-headers text-right">09:00</span>
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-border-gray bg-white mt-3 shrink-0"></div>
                        <div className="h-14 bg-bg-light rounded w-full"></div>
                      </div>
                      <div className="flex gap-4 items-start">
                        <span className="text-xs font-bold text-text-muted w-12 shrink-0 font-headers text-right">13:00</span>
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-border-gray bg-white mt-3 shrink-0"></div>
                        <div className="h-14 bg-bg-light rounded w-full"></div>
                      </div>
                    </div>
                    {/* Lock Overlay */}
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex flex-col items-center justify-center text-center p-4">
                      <div className="w-12 h-12 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-3">
                        <Lock className="w-5 h-5 animate-pulse" />
                      </div>
                      <h4 className="font-headers text-sm font-bold text-brand-navy mb-1">Roteiro Completo Bloqueado</h4>
                      <p className="text-[11px] text-text-muted mb-4 max-w-[280px] leading-normal">
                        Revele as atrações detalhadas, cafés sugeridos e rotas completas dos dias restantes gratuitamente.
                      </p>
                      <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#96AB21] hover:bg-[#85981D] text-brand-navy font-extrabold py-2.5 px-6 text-xs flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#96AB21]/20 hover:scale-[1.01] active:scale-95 transition-all rounded-xl"
                      >
                        <span>Liberar Roteiro Completo</span>
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  // Real Timeline
                  <div className="flex flex-col gap-4 relative">
                    {/* Timeline vertical bar */}
                    <div className="absolute left-[65px] top-3 bottom-3 w-0.5 bg-brand-navy z-0"></div>

                    {itinerary.days[activeDayIndex].events.map((event, eIdx) => (
                      <div key={eIdx} className="flex flex-col gap-2">
                        <div className="flex gap-4 items-start relative z-10">
                          {/* Time */}
                          <span className="text-xs font-bold text-brand-navy w-12 shrink-0 py-2.5 text-right font-headers font-mono">
                            {event.time}
                          </span>
                          
                          {/* Timeline indicator node */}
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-brand-navy bg-white mt-3 shrink-0 shadow-sm animate-fade-in"></div>
                          
                          {/* Render Rich Event Card */}
                          {renderEventCard(event)}
                        </div>
                        
                        {/* Render Transit Info between events */}
                        {eIdx < itinerary.days[activeDayIndex].events.length - 1 && renderTransitInfo(eIdx)}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Custom Planner CTA at the bottom */}
              <div className="bg-gradient-to-br from-brand-orange/5 to-white border border-brand-orange/15 p-6 sm:p-8 rounded-[28px] text-center flex flex-col items-center gap-4 mt-6">
                <h3 className="font-headers text-base sm:text-lg font-bold text-brand-navy leading-tight">
                  Gostou deste roteiro? Crie um roteiro totalmente personalizado.
                </h3>
                <p className="text-xs text-text-muted max-w-md leading-relaxed">
                  Nosso assistente inteligente pode estruturar uma programação única baseada no seu orçamento exato, dias livres e estilo de viagem.
                </p>
                <Link 
                  href={`/planejamento/${itinerary.destinationSlug}`}
                  className="bg-[#96AB21] hover:bg-[#85981D] text-[#081B6B] font-extrabold py-3 px-6 rounded-xl transition-all shadow-md shadow-[#96AB21]/10 hover:scale-[1.01] active:scale-95 text-xs flex items-center gap-1.5 cursor-pointer border border-[#96AB21]/10"
                >
                  <span>Gerar meu roteiro</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-6 w-full text-left">
              
              {/* QR Code offline sync card */}
              <div className="bg-white border border-border-gray p-6 rounded-[24px] shadow-sm flex flex-col gap-4 text-left">
                {isUnlocked ? (
                  <>
                    <span className="text-[9px] font-extrabold text-brand-orange uppercase tracking-wider flex items-center gap-1">
                      <Smartphone className="w-3.5 h-3.5" /> LEVAR NA VIAGEM
                    </span>
                    <h4 className="font-headers font-bold text-brand-navy text-sm leading-tight">
                      Leve o roteiro com você
                    </h4>
                    <p className="text-[11px] text-text-muted leading-relaxed">
                      Escaneie o QR Code abaixo para abrir este roteiro em tempo real e offline no seu app 2GO.
                    </p>
                    
                    {/* QR Code */}
                    <div className="p-3 bg-bg-light border border-border-gray/50 rounded-xl w-fit mx-auto flex items-center justify-center shadow-xs">
                      <QRCodeSVG 
                        value={typeof window !== 'undefined' ? window.location.href : `https://2go.com.br/roteiros/${itinerary.slug}`} 
                        size={120}
                        bgColor="#ffffff"
                        fgColor="#081B6B"
                        level="H"
                      />
                    </div>

                    <button
                      onClick={handleCopyLink}
                      className="btn btn-outline py-2.5 text-xs font-bold w-full justify-center flex items-center gap-1.5 cursor-pointer mt-1"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{copied ? 'Copiado!' : 'Copiar Link do Roteiro'}</span>
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-[9px] font-extrabold text-text-muted uppercase tracking-wider flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" /> LEVAR NA VIAGEM
                    </span>
                    <h4 className="font-headers font-bold text-brand-navy text-sm leading-tight opacity-75">
                      Exportação Bloqueada
                    </h4>
                    <p className="text-[11px] text-text-muted leading-relaxed">
                      Desbloqueie o roteiro completo para gerar o QR Code de sincronização offline no seu celular.
                    </p>
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="bg-[#96AB21] hover:bg-[#85981D] text-brand-navy font-extrabold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-[#96AB21]/20 hover:scale-[1.01] active:scale-95 text-xs flex items-center gap-1.5 cursor-pointer border border-[#96AB21]/10 w-full justify-center"
                    >
                      <Unlock className="w-3.5 h-3.5" />
                      <span>Liberar Acesso Offline</span>
                    </button>
                  </>
                )}
              </div>

              {/* Consulting Promo card */}
              <div className="bg-brand-navy text-white p-6 rounded-[24px] shadow-sm flex flex-col gap-3">
                <span className="text-[8.5px] font-extrabold text-brand-orange uppercase tracking-wider">SUPORTE EXCLUSIVO</span>
                <h4 className="font-headers font-bold text-white text-sm leading-tight">Deseja curadoria personalizada?</h4>
                <p className="text-[11px] text-white/70 leading-relaxed">Deixe que um consultor local da 2GO estruture e agende todas as suas atrações, hotéis e transportes sob medida.</p>
                <Link 
                  href="/premium"
                  className="bg-[#96AB21] hover:bg-[#85981D] text-brand-navy font-extrabold py-3 text-xs justify-center flex items-center gap-1.5 transition-all mt-2 rounded-xl"
                >
                  Falar com Especialista
                </Link>
              </div>

              {/* Local FAQs list in sidebar */}
              {destination && destination.faqs && destination.faqs.length > 0 && (
                <div className="bg-white border border-border-gray p-6 rounded-[24px] shadow-sm flex flex-col gap-4">
                  <h4 className="font-headers font-bold text-brand-navy text-sm">
                    Dúvidas sobre {destination.name}
                  </h4>
                  <div className="flex flex-col gap-2">
                    {destination.faqs.slice(0, 3).map((faq, i) => (
                      <div 
                        key={i}
                        className="border border-border-gray rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFaq(i)}
                          className="w-full p-3 font-headers text-[11px] font-bold text-brand-navy text-left flex justify-between items-center bg-bg-light/20 hover:bg-bg-light transition-colors"
                        >
                          <span className="line-clamp-2">{faq.q}</span>
                          <ChevronRight className={`w-3.5 h-3.5 text-brand-orange shrink-0 transform transition-transform ${
                            openFaqIndex === i ? 'rotate-90' : ''
                          }`} />
                        </button>
                        {openFaqIndex === i && (
                          <div className="p-3 text-[11px] text-text-muted leading-relaxed border-t border-border-gray bg-white">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Affiliate Deals Section */}
          <div className="mt-12 w-full">
            <AffiliateDeals destination={destination} />
          </div>

          {/* Newsletter Box at the base of the page */}
          <div className="mt-12 w-full">
            <NewsletterBox destinationName={destination ? destination.name : ''} />
          </div>

        </div>
      </main>

      {/* Floating Mapa Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <button 
          onClick={() => setIsDownloadOpen(true)}
          className="bg-brand-navy hover:bg-brand-navy/95 text-white font-bold px-6 py-3 rounded-full flex items-center gap-1.5 shadow-lg shadow-brand-navy/20 cursor-pointer transition-all hover:scale-105 active:scale-95 text-xs uppercase tracking-wider"
        >
          <Map className="w-4 h-4 text-brand-orange shrink-0" />
          <span>Mapa</span>
        </button>
      </div>

      <Footer onOpenDownload={() => setIsDownloadOpen(true)} />

      <AppDownloadModal 
        isOpen={isDownloadOpen} 
        onClose={() => setIsDownloadOpen(false)} 
      />

      <LeadWallModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUnlock={handleUnlock}
        destinationName={destName}
      />
    </div>
  );
}

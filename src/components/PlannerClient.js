"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Smartphone, 
  ShieldAlert, 
  Lock, 
  Calendar, 
  Compass, 
  Sliders, 
  Navigation,
  Star,
  MapPin,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppDownloadModal from '@/components/AppDownloadModal';
import { matchesSearch } from '@/lib/searchHelper';

import { listDestinations, listItinerariesForDestination } from '@/lib/cms';
import { destinationGuides } from '@/data/guidesData';

const destinations = listDestinations();
const guides = Object.values(destinationGuides);

function guideForDestination(destination) {
  const city = destination.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return guides.find((guide) => guide.city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') === city) || null;
}

const destinationChoices = destinations.map((destination) => {
  const guide = guideForDestination(destination);
  const itinerary = listItinerariesForDestination(destination.slug)[0] || null;
  return {
    id: destination.slug,
    label: `${destination.name}, ${destination.country}`,
    icon: destination.emoji || '✈️',
    name: destination.name,
    desc: destination.description,
    img: guide?.heroImage || destination.image,
    tags: [destination.name, destination.country, destination.slug, ...(guide ? [guide.city, guide.country] : [])],
    itinerary
  };
});

const guideOnlyChoices = guides
  .filter((guide) => !destinations.some((destination) => guideForDestination(destination)?.slug === guide.slug))
  .map((guide) => ({
    id: guide.slug,
    label: `${guide.city}, ${guide.country}`,
    icon: guide.emoji || '✈️',
    name: guide.city,
    desc: guide.subtitle,
    img: guide.heroImage,
    tags: [guide.city, guide.country, guide.slug],
    itinerary: null,
    href: `/blog/${guide.slug}`
  }));

const popularDestinations = destinationChoices.filter((choice) => choice.itinerary).slice(0, 6);
const experienceTags = [
  { id: 'roma', label: '🍝 Gastronomia' },
  { id: 'paris', label: '🎨 Cultura' },
  { id: 'lisboa', label: '🌊 Litoral' },
  { id: 'londres', label: '🏛️ História' },
  { id: 'toquio', label: '🌃 Cidade' }
].filter((tag) => destinationChoices.some((choice) => choice.id === tag.id && choice.itinerary));

export default function PlannerClient({ preselectedDestinationSlug }) {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(true);
  const [step, setStep] = useState(preselectedDestinationSlug ? 1 : 0);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [showResults, setShowResults] = useState(false);

  // States for Wizard Questionnaire (Fase 3.4)
  const [destination, setDestination] = useState(preselectedDestinationSlug || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [noExactDates, setNoExactDates] = useState(false);
  const [approximateMonth, setApproximateMonth] = useState('');
  const [travelers, setTravelers] = useState('');
  const [hasKidsOrSeniors, setHasKidsOrSeniors] = useState('');
  const [budget, setBudget] = useState('');
  const [pace, setPace] = useState('');
  const [style, setStyle] = useState('');
  const [interests, setInterests] = useState([]);
  const [diet, setDiet] = useState('nenhuma');
  const [restrictions, setRestrictions] = useState('');

  const selectDestinationAndAdvance = (destId) => {
    if (!destinationChoices.some((choice) => choice.id === destId)) return;
    setDestination(destId);
    setStep(1);
  };

  // Reset steps if preselected value changes
  useEffect(() => {
    if (preselectedDestinationSlug) {
      setDestination(preselectedDestinationSlug);
      setStep(1);
    }
  }, [preselectedDestinationSlug]);

  // Parse search parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlDestino = params.get('destino') || '';
      const urlStep = params.get('step') || '';
      
      if (urlDestino) {
        const destSlug = urlDestino.toLowerCase().trim();
        if (!destinationChoices.some((choice) => choice.id === destSlug)) return;
        setDestination(destSlug);
        setSearchQuery(urlDestino);
        
        if (urlStep) {
          setStep(parseInt(urlStep, 10) - 1);
        } else {
          setStep(1);
        }
      }
    }
  }, []);

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      triggerLoadingSequence();
    }
  };

  const handlePrev = () => {
    if (step > (preselectedDestinationSlug ? 1 : 0)) {
      setStep(step - 1);
    } else if (preselectedDestinationSlug && step === 1) {
      setStep(0);
    }
  };

  const triggerLoadingSequence = () => {
    setLoading(true);
    const statuses = [
      'Analisando perfil de viajante...',
      'Mapeando melhores rotas locais...',
      'Buscando atrações gastronômicas exclusivas...',
      'Otimizando horários e conexões...',
      'Criando roteiro sob medida...'
    ];

    let currentIdx = 0;
    setLoadingText(statuses[0]);

    const interval = setInterval(() => {
      currentIdx++;
      if (currentIdx < statuses.length) {
        setLoadingText(statuses[currentIdx]);
      } else {
        clearInterval(interval);
        setLoading(false);
        setShowResults(true);
      }
    }, 600);
  };

  const handleReset = () => {
    setStep(preselectedDestinationSlug ? 1 : 0);
    setDestination(preselectedDestinationSlug || '');
    setStyle('');
    setStartDate('');
    setEndDate('');
    setNoExactDates(false);
    setApproximateMonth('');
    setTravelers('');
    setHasKidsOrSeniors('');
    setBudget('');
    setPace('');
    setInterests([]);
    setDiet('nenhuma');
    setRestrictions('');
    setShowResults(false);
    setIsUnlocked(false);
  };

  const handleUnlockSuccess = () => {
    setIsUnlocked(true);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#081B6B', '#F47A20', '#96AB21']
    });
  };

  const isNextDisabled = () => {
    if (step === 0) return !destination;
    if (step === 1) return !noExactDates ? (!startDate || !endDate) : !approximateMonth;
    if (step === 2) return !travelers || !hasKidsOrSeniors;
    if (step === 3) return !budget || !pace;
    if (step === 4) return !style || interests.length === 0;
    if (step === 5) return false;
    return true;
  };

  // Calculate dynamic travel days count
  const getTravelDaysCount = () => {
    if (!startDate || !endDate || noExactDates) return 3; // Default fallback
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return Math.max(1, Math.min(30, diffDays));
  };

  const selectedChoice = destinationChoices.find((choice) => choice.id === destination) || null;
  const publishedItinerary = selectedChoice?.itinerary || null;
  const targetDaysCount = getTravelDaysCount();
  const activeItinerary = publishedItinerary && selectedChoice
    ? {
        name: selectedChoice.name,
        title: publishedItinerary.title,
        desc: publishedItinerary.desc,
        image: selectedChoice.img,
        days: publishedItinerary.days || []
      }
    : null;
  const finalDays = activeItinerary ? activeItinerary.days.slice(0, targetDaysCount) : [];

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow">
        {/* Planner Hero Header */}
        <section className="container mx-auto px-6 pt-36 pb-8 text-center max-w-3xl">
          <span className="bg-brand-navy/10 text-brand-navy text-[10px] font-extrabold tracking-widest px-3 py-1.5 rounded-full w-fit mx-auto">
            ALGORITMO DE CURADORIA
          </span>
          <h1 className="font-headers text-3.5xl sm:text-5xl md:text-6xl font-extrabold text-brand-navy mt-6 mb-6 leading-tight">
            Planeje sua jornada.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-text-muted max-w-[600px] mx-auto leading-relaxed">
            {preselectedDestinationSlug ? `Crie seu roteiro ideal para ${activeItinerary?.name || destination} em segundos.` : 'Escolha suas preferências e deixe nossa tecnologia criar o roteiro personalizado perfeito em segundos.'}
          </p>
        </section>

        {/* Wizard Form and Results */}
        <section className="py-8 bg-bg-light">
          <div className="container mx-auto px-6 max-w-[1440px] w-full">
            
            {/* 1. Step-by-step Wizard Form */}
            {!loading && !showResults && (
              <div className="bg-white border border-border-gray p-6 md:p-10 rounded-[28px] shadow-sm min-h-[420px] max-w-3xl mx-auto flex flex-col justify-between text-left">
                
                {/* Step 0: Destination */}
                {step === 0 && (
                  <div className="animate-fade-in-up">
                    <span className="bg-brand-navy/10 text-brand-navy text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit">
                      PASSO 1 DE 6
                    </span>
                    <h2 className="font-headers text-2xl md:text-3xl font-bold mt-4 text-brand-navy">
                      Para onde você vai viajar?
                    </h2>
                    <p className="text-xs text-text-muted mt-2">Busque por país, cidade ou tipo de experiência.</p>
                    
                    {/* Search Input */}
                    <div className="mt-5 relative">
                      <input
                        type="text"
                        placeholder="Pesquise por 'Itália', 'Lua de Mel', 'Aurora Boreal', 'Gramado'..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-border-gray px-5 py-3.5 rounded-xl text-base font-semibold text-brand-navy placeholder:text-text-muted/50 focus:outline-none focus:border-brand-navy focus:bg-white transition-all shadow-xs"
                      />
                    </div>

                    {/* Pre-search tags (Destinos Populares & Experiências) */}
                    {searchQuery === '' && (
                      <div className="mt-6">
                        <span className="text-xs font-bold text-brand-navy uppercase tracking-wider block mb-3">
                          🔥 Destinos Populares
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                          {popularDestinations.map(dest => (
                            <button
                              key={dest.id}
                              type="button"
                              onClick={() => selectDestinationAndAdvance(dest.id)}
                              className="relative h-28 rounded-2xl overflow-hidden group shadow-sm hover:shadow-md cursor-pointer text-left focus:outline-none transition-all hover:scale-[1.02]"
                            >
                              <img 
                                src={dest.img} 
                                alt={dest.label}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                              <span className="absolute bottom-3 left-3 text-xs sm:text-sm font-bold text-white leading-none">
                                {dest.icon} {dest.label}
                              </span>
                            </button>
                          ))}
                        </div>

                        <span className="text-xs font-bold text-brand-navy uppercase tracking-wider block mb-3">
                          ✨ Experiências &amp; Sugestões Sazonais
                        </span>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {experienceTags.map(tag => (
                            <button
                              key={tag.label}
                              type="button"
                              onClick={() => selectDestinationAndAdvance(tag.id)}
                              className="px-4 py-2 rounded-full border border-border-gray hover:border-brand-orange text-xs font-semibold text-brand-navy bg-white transition-all cursor-pointer hover:scale-[1.02] shadow-xs"
                            >
                              {tag.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {searchQuery !== '' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        {[...destinationChoices, ...guideOnlyChoices].filter(opt => {
                          return matchesSearch(searchQuery, opt);
                        }).map(opt => (
                          opt.href ? (
                            <Link
                              key={opt.id}
                              href={opt.href}
                              className="text-left p-4 rounded-[20px] border border-border-gray hover:border-brand-navy/30 transition-all duration-300 cursor-pointer flex items-center gap-4 bg-white"
                            >
                              <span className="text-3xl shrink-0">{opt.icon}</span>
                              <div>
                                <h4 className="font-headers text-sm font-bold text-brand-navy">{opt.label}</h4>
                                <p className="text-[11px] text-text-muted mt-0.5">{opt.desc}</p>
                                <p className="text-[10px] font-bold text-brand-orange mt-1">Guia publicado, sem roteiro</p>
                              </div>
                            </Link>
                          ) : (
                          <button 
                            key={opt.id}
                            type="button"
                            onClick={() => selectDestinationAndAdvance(opt.id)}
                            className={`text-left p-4 rounded-[20px] border transition-all duration-300 cursor-pointer flex items-center gap-4 bg-white ${
                              destination === opt.id 
                                ? 'border-brand-navy bg-brand-navy/5 shadow-xs' 
                                : 'border-border-gray hover:border-brand-navy/30'
                            }`}
                          >
                            <span className="text-3xl shrink-0">{opt.icon}</span>
                            <div>
                              <h4 className="font-headers text-sm font-bold text-brand-navy">{opt.label}</h4>
                              <p className="text-[11px] text-text-muted mt-0.5">{opt.desc}</p>
                              {!opt.itinerary && (
                                <p className="text-[10px] font-bold text-text-muted mt-1">Sem roteiro publicado</p>
                              )}
                            </div>
                          </button>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Step 1: Dates & Month Selector */}
                {step === 1 && (
                  <div className="animate-fade-in-up">
                    <span className="bg-brand-navy/10 text-brand-navy text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit">
                      PASSO 2 DE 6
                    </span>
                    <h2 className="font-headers text-2xl md:text-3xl font-bold mt-4 text-brand-navy">
                      Quando você pretende viajar?
                    </h2>
                    <p className="text-xs text-text-muted mt-2">Selecione as datas exatas ou escolha um mês aproximado.</p>
                    
                    {/* Toggle for exact dates */}
                    <div className="mt-6 flex items-center gap-2.5 bg-bg-light border border-border-gray p-4 rounded-xl w-fit">
                      <input 
                        type="checkbox" 
                        id="no-exact-dates"
                        checked={noExactDates}
                        onChange={(e) => {
                          setNoExactDates(e.target.checked);
                          if (e.target.checked) {
                            setStartDate('');
                            setEndDate('');
                          } else {
                            setApproximateMonth('');
                          }
                        }}
                        className="w-4 h-4 rounded text-brand-orange focus:ring-brand-orange"
                      />
                      <label htmlFor="no-exact-dates" className="text-xs font-bold text-brand-navy cursor-pointer">
                        Ainda não tenho datas exatas
                      </label>
                    </div>

                    {!noExactDates ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        <div className="flex flex-col gap-1.5 text-left">
                          <label htmlFor="start-date" className="text-[10px] font-bold text-brand-navy uppercase tracking-wider">
                            Data de Ida
                          </label>
                          <input 
                            type="date"
                            id="start-date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border-gray bg-[#F8FAFC] text-brand-navy font-semibold focus:outline-none focus:border-brand-navy text-xs"
                            required
                          />
                        </div>
                        <div className="flex flex-col gap-1.5 text-left">
                          <label htmlFor="end-date" className="text-[10px] font-bold text-brand-navy uppercase tracking-wider">
                            Data de Volta
                          </label>
                          <input 
                            type="date"
                            id="end-date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-border-gray bg-[#F8FAFC] text-brand-navy font-semibold focus:outline-none focus:border-brand-navy text-xs"
                            required
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 mt-6">
                        {[
                          'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                          'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
                        ].map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setApproximateMonth(m)}
                            className={`py-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                              approximateMonth === m 
                                ? 'bg-brand-navy border-brand-navy text-white shadow-xs' 
                                : 'bg-white border-border-gray text-text-muted hover:border-brand-navy/40 hover:text-brand-navy'
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Step 2: Travelers Party */}
                {step === 2 && (
                  <div className="animate-fade-in-up">
                    <span className="bg-brand-navy/10 text-brand-navy text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit">
                      PASSO 3 DE 6
                    </span>
                    <h2 className="font-headers text-2xl md:text-3xl font-bold mt-4 text-brand-navy">
                      Quem vai viajar com você?
                    </h2>
                    <p className="text-xs text-text-muted mt-2">Escolha a companhia e indique se há necessidades especiais.</p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                      {[
                        { id: 'solo', label: 'Viajar Solo 👤', desc: 'Aventura própria.' },
                        { id: 'casal', label: 'Em Casal 👩‍❤️‍👨', desc: 'Roteiro romântico.' },
                        { id: 'familia', label: 'Em Família 👨‍👩‍👧‍👦', desc: 'Foco no lazer.' },
                        { id: 'grupo', label: 'Com Amigos 👥', desc: 'Diversão em grupo.' }
                      ].map(opt => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setTravelers(opt.id)}
                          className={`text-left p-4 rounded-[20px] border transition-all cursor-pointer flex flex-col gap-1 bg-white ${
                            travelers === opt.id 
                              ? 'border-brand-navy bg-brand-navy/5 shadow-xs' 
                              : 'border-border-gray hover:border-brand-navy/30'
                          }`}
                        >
                          <span className="text-xs font-bold text-brand-navy leading-none">{opt.label}</span>
                          <span className="text-[9px] text-text-muted mt-1 leading-none">{opt.desc}</span>
                        </button>
                      ))}
                    </div>

                    <h3 className="text-xs font-headers text-brand-navy/80 font-bold mt-8 mb-3 uppercase tracking-wider">Necessidades Especiais</h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {[
                        { id: 'não', label: 'Sem Crianças ou Idosos ✈️', desc: 'Ritmo normal.' },
                        { id: 'sim', label: 'Viajando com Crianças/Idosos 👶👵', desc: 'Ritmo leve e acessível.' }
                      ].map(opt => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setHasKidsOrSeniors(opt.id)}
                          className={`text-left p-4 rounded-[20px] border transition-all cursor-pointer flex-1 flex flex-col gap-1 bg-white ${
                            hasKidsOrSeniors === opt.id 
                              ? 'border-brand-navy bg-brand-navy/5 shadow-xs' 
                              : 'border-border-gray hover:border-brand-navy/30'
                          }`}
                        >
                          <span className="text-xs font-bold text-brand-navy leading-none">{opt.label}</span>
                          <span className="text-[9px] text-text-muted mt-1 leading-none">{opt.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Budget & Pace */}
                {step === 3 && (
                  <div className="animate-fade-in-up">
                    <span className="bg-brand-navy/10 text-brand-navy text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit">
                      PASSO 4 DE 6
                    </span>
                    <h2 className="font-headers text-2xl md:text-3xl font-bold mt-4 text-brand-navy">
                      Orçamento e Ritmo da Viagem
                    </h2>
                    <p className="text-xs text-text-muted mt-2">Escolha como prefere gastar e o ritmo ideal de deslocamento.</p>

                    <h3 className="text-xs font-headers text-brand-navy/80 font-bold mt-6 mb-3 uppercase tracking-wider">Perfil Financeiro</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { id: 'economy', label: 'Econômico/Mochileiro 🎒', desc: 'Atrações baratas e hostels.' },
                        { id: 'comfort', label: 'Padrão Confortável 🧳', desc: 'Hospedagem 3/4★ e ótimos bistrôs.' },
                        { id: 'luxury', label: 'Alto Luxo Premium 👑', desc: 'Hotéis 5★ e restaurantes Michelin.' }
                      ].map(opt => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setBudget(opt.id)}
                          className={`text-left p-4 rounded-[20px] border transition-all cursor-pointer flex flex-col gap-1 bg-white ${
                            budget === opt.id 
                              ? 'border-brand-navy bg-brand-navy/5 shadow-xs' 
                              : 'border-border-gray hover:border-brand-navy/30'
                          }`}
                        >
                          <span className="text-xs font-bold text-brand-navy leading-none">{opt.label}</span>
                          <span className="text-[9px] text-text-muted mt-1 leading-none">{opt.desc}</span>
                        </button>
                      ))}
                    </div>

                    <h3 className="text-xs font-headers text-brand-navy/80 font-bold mt-8 mb-3 uppercase tracking-wider">Ritmo Diário</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { id: 'lento', label: 'Lento e Relaxado 🐌', desc: 'Poucas atrações, com tempo de descanso.' },
                        { id: 'moderado', label: 'Moderado Equilibrado 🚶‍♂️', desc: 'Exploração ideal, sem correrias extremas.' },
                        { id: 'acelerado', label: 'Acelerado e Intenso 🏃‍♂️', desc: 'Ver o máximo possível por dia.' }
                      ].map(opt => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setPace(opt.id)}
                          className={`text-left p-4 rounded-[20px] border transition-all cursor-pointer flex flex-col gap-1 bg-white ${
                            pace === opt.id 
                              ? 'border-brand-navy bg-brand-navy/5 shadow-xs' 
                              : 'border-border-gray hover:border-brand-navy/30'
                          }`}
                        >
                          <span className="text-xs font-bold text-brand-navy leading-none">{opt.label}</span>
                          <span className="text-[9px] text-text-muted mt-1 leading-none">{opt.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Estilo & Interesses */}
                {step === 4 && (
                  <div className="animate-fade-in-up">
                    <span className="bg-brand-navy/10 text-brand-navy text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit">
                      PASSO 5 DE 6
                    </span>
                    <h2 className="font-headers text-2xl md:text-3xl font-bold mt-4 text-brand-navy">
                      Estilo e Interesses
                    </h2>
                    <p className="text-xs text-text-muted mt-2">Indique suas atividades preferidas para a curadoria local.</p>

                    <h3 className="text-xs font-headers text-brand-navy/80 font-bold mt-6 mb-3 uppercase tracking-wider">Estilo Principal</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { id: 'aventura', label: '🧗 Aventura & Natureza' },
                        { id: 'cultura', label: '🏛️ História & Cultura' },
                        { id: 'natureza', label: '🌿 Relax & Bem-Estar' },
                        { id: 'gastronomia', label: '🍽️ Alta Gastronomia' }
                      ].map(opt => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setStyle(opt.id)}
                          className={`text-left p-4 rounded-[20px] border transition-all cursor-pointer flex flex-col justify-center bg-white ${
                            style === opt.id 
                              ? 'border-brand-navy bg-brand-navy/5 shadow-xs font-bold text-brand-navy' 
                              : 'border-border-gray hover:border-brand-navy/30 text-text-muted'
                          }`}
                        >
                          <span className="text-xs font-bold leading-none">{opt.label}</span>
                        </button>
                      ))}
                    </div>

                    <h3 className="text-xs font-headers text-brand-navy/80 font-bold mt-8 mb-3 uppercase tracking-wider">Áreas de Interesse (Selecione múltiplos)</h3>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Museus & Galerias', 'Praias & Litoral', 'Cachoeiras & Trilhas',
                        'Restaurantes Premium', 'Compras & Outlets', 'Vida Noturna & Baladas',
                        'Arquitetura Histórica', 'Parques de Diversão', 'Fotografia & Paisagens'
                      ].map(tag => {
                        const isSelected = interests.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => {
                              if (isSelected) {
                                setInterests(interests.filter(i => i !== tag));
                              } else {
                                setInterests([...interests, tag]);
                              }
                            }}
                            className={`px-3.5 py-2 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
                              isSelected 
                                ? 'bg-brand-navy border-brand-navy text-white shadow-xs' 
                                : 'bg-white border-border-gray text-text-muted hover:border-brand-navy/40'
                            }`}
                          >
                            {tag}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Step 5: Alimentação & Restrições */}
                {step === 5 && (
                  <div className="animate-fade-in-up">
                    <span className="bg-brand-navy/10 text-brand-navy text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit">
                      PASSO 6 DE 6
                    </span>
                    <h2 className="font-headers text-2xl md:text-3xl font-bold mt-4 text-brand-navy">
                      Alimentação e Restrições
                    </h2>
                    <p className="text-xs text-text-muted mt-2">Personalize a filtragem de restaurantes e locais para comer.</p>

                    <h3 className="text-xs font-headers text-brand-navy/80 font-bold mt-6 mb-3 uppercase tracking-wider">Preferência Alimentar</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { id: 'nenhuma', label: 'Sem Restrições 🥩' },
                        { id: 'vegetariano', label: 'Vegetariano 🥗' },
                        { id: 'vegano', label: 'Vegano 🌱' },
                        { id: 'gluten-free', label: 'Sem Glúten 🌾' }
                      ].map(opt => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setDiet(opt.id)}
                          className={`text-left p-4 rounded-[20px] border transition-all cursor-pointer flex flex-col justify-center bg-white ${
                            diet === opt.id 
                              ? 'border-brand-navy bg-brand-navy/5 shadow-xs font-bold text-brand-navy' 
                              : 'border-border-gray hover:border-brand-navy/30 text-text-muted'
                          }`}
                        >
                          <span className="text-xs font-bold leading-none">{opt.label}</span>
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-col gap-2 mt-8 text-left">
                      <label htmlFor="custom-restrictions" className="text-[10px] font-bold font-headers text-brand-navy uppercase tracking-wider">
                        Outras Restrições ou Preferências Específicas (Opcional)
                      </label>
                      <textarea
                        id="custom-restrictions"
                        rows="3"
                        value={restrictions}
                        onChange={(e) => setRestrictions(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-border-gray px-4 py-3 rounded-xl text-xs font-semibold text-brand-navy placeholder:text-text-muted/45 focus:outline-none focus:border-brand-navy focus:bg-white transition-all shadow-xs resize-none"
                        placeholder="Ex: Alergia severa a frutos do mar, prefiro cafés locais em vez de redes, etc."
                      />
                    </div>
                  </div>
                )}

                {/* Navigation Controls */}
                <div className="flex justify-between items-center mt-10 pt-6 border-t border-border-gray/50 w-full">
                  <button 
                    onClick={handlePrev} 
                    disabled={preselectedDestinationSlug ? step === 1 : step === 0}
                    className="btn btn-outline cursor-pointer disabled:opacity-30 disabled:pointer-events-none py-2 text-xs"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Voltar
                  </button>
                  <button 
                    onClick={handleNext} 
                    disabled={isNextDisabled()}
                    className={`btn cursor-pointer py-2 text-xs ${
                      step === 5 ? 'btn-primary' : 'btn-outline'
                    } disabled:opacity-30 disabled:pointer-events-none`}
                  >
                    {step === 5 ? 'Gerar Roteiro' : 'Avançar'} <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </button>
                </div>

              </div>
            )}

            {/* 2. Loading Sequence */}
            {loading && (
              <div className="bg-white border border-border-gray p-12 rounded-[28px] max-w-lg mx-auto shadow-sm flex flex-col items-center justify-center gap-6 py-20 text-center animate-fade-in-up">
                <div className="w-12 h-12 border-4 border-border-gray border-t-brand-orange rounded-full animate-spin"></div>
                <h3 className="font-headers text-lg md:text-xl font-bold text-brand-navy mt-2">
                  {loadingText}
                </h3>
                <p className="text-xs text-text-muted">Analisando parâmetros locais...</p>
              </div>
            )}

            {showResults && !activeItinerary && (
              <div className="bg-white border border-border-gray p-8 rounded-[28px] max-w-lg mx-auto shadow-sm text-center">
                <h2 className="font-headers text-2xl font-bold text-brand-navy">
                  Não há roteiro publicado para {selectedChoice?.name || 'este destino'}
                </h2>
                <p className="text-sm text-text-muted mt-3 leading-relaxed">
                  A cidade só aparece aqui quando tem ficha. Sem roteiro publicado, a prévia não é inventada.
                </p>
                <button
                  onClick={handleReset}
                  className="btn btn-outline cursor-pointer mt-6"
                >
                  Escolher outro destino
                </button>
              </div>
            )}

            {/* 3. Planner Results Panel */}
            {showResults && activeItinerary && (
              <div className="animate-fade-in-up max-w-[1440px] w-full mx-auto">
                {/* Results Header */}
                <div className="bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] shadow-sm mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-left">
                  <div>
                    <span className="bg-brand-orange text-white text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit">
                      PRÉVIA DO DIA 1
                    </span>
                    <h2 className="font-headers text-2xl md:text-3.5xl font-bold text-brand-navy mt-3 leading-tight font-extrabold">
                      {activeItinerary.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-text-muted mt-2 max-w-[600px] leading-relaxed">
                      {activeItinerary.desc}
                    </p>
                  </div>
                  
                  <div className="flex gap-3 w-full md:w-auto shrink-0">
                    <button 
                      onClick={() => setIsDownloadOpen(true)}
                      className="btn btn-primary justify-center shadow-sm cursor-pointer flex-1 sm:flex-initial"
                    >
                      <Smartphone className="w-4 h-4 mr-2" /> Baixar no App
                    </button>
                    <button 
                      onClick={handleReset}
                      className="btn btn-outline cursor-pointer px-4"
                      aria-label="Refazer"
                    >
                      <RotateCcw className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>

                {/* Day 1 Timeline Card */}
                <div className="bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] shadow-sm text-left relative mb-8">
                  {/* Banner Day 1 */}
                  <div className="mb-6 rounded-2xl overflow-hidden border border-border-gray/30 relative h-48 bg-brand-navy text-white shadow-xs">
                    <img 
                      src={activeItinerary.image} 
                      alt={activeItinerary.name} 
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-left">
                      <span className="bg-brand-orange text-white text-[9px] font-extrabold tracking-widest px-2.5 py-1 rounded-full uppercase font-headers">
                        PRIMEIRO DIA DE VIAGEM
                      </span>
                      <h4 className="font-headers text-lg sm:text-xl font-bold mt-1.5 leading-tight">
                        Chegada e ambientação em {activeItinerary.name || destination}
                      </h4>
                    </div>
                  </div>

                  <span className="font-headers text-xs font-bold text-brand-orange uppercase tracking-wider">
                    Dia 1 • Prévia da Programação
                  </span>
                  <h3 className="font-headers text-lg sm:text-xl font-bold text-brand-navy mt-1 mb-4">
                    {finalDays[0] ? finalDays[0].title : 'Primeiro Dia Otimizado'}
                  </h3>
                  
                  <div className="flex flex-col gap-4">
                    {finalDays[0] && finalDays[0].events.map((evt, eIdx) => {
                      let icon = <Compass className="w-4 h-4 text-brand-navy" />;
                      if (evt.title.toLowerCase().includes('check-in') || evt.title.toLowerCase().includes('hotel') || evt.title.toLowerCase().includes('pousada')) {
                        icon = <span className="text-sm">🏨</span>;
                      } else if (evt.title.toLowerCase().includes('jantar') || evt.title.toLowerCase().includes('almoço') || evt.title.toLowerCase().includes('comer') || evt.title.toLowerCase().includes('restaurante')) {
                        icon = <span className="text-sm">🍴</span>;
                      } else if (evt.title.toLowerCase().includes('transfer') || evt.title.toLowerCase().includes('voo') || evt.title.toLowerCase().includes('helicóptero') || evt.title.toLowerCase().includes('barco') || evt.title.toLowerCase().includes('buggy') || evt.title.toLowerCase().includes('táxi')) {
                        icon = <span className="text-sm">🚗</span>;
                      } else if (evt.title.toLowerCase().includes('sunset') || evt.title.toLowerCase().includes('pôr do sol') || evt.title.toLowerCase().includes('vista')) {
                        icon = <span className="text-sm">🌅</span>;
                      }

                      return (
                        <div key={eIdx} className="flex gap-4 items-start bg-bg-light/30 border border-border-gray/30 p-4 rounded-xl shadow-xs">
                          <div className="w-10 h-10 rounded-lg bg-white border border-border-gray flex items-center justify-center shrink-0 shadow-xs font-mono text-[10px] font-bold text-brand-navy">
                            {evt.time}
                          </div>
                          <div className="flex-grow">
                            <h4 className="text-xs sm:text-sm font-bold text-brand-navy flex items-center gap-1.5">
                              {icon}
                              <span>{evt.title}</span>
                            </h4>
                            <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
                              Curadoria premium otimizada para deslocamento e aproveitamento inteligente.
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 border border-brand-navy/10 bg-brand-navy/5 p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="text-left">
                      <span className="text-[10px] font-bold text-brand-navy uppercase tracking-wider block">📍 MAPA DA ROTA DO DIA</span>
                      <p className="text-[11px] text-text-muted mt-0.5 leading-relaxed">Sincronize a rota completa com GPS e deslocamentos no aplicativo 2GO.</p>
                    </div>
                    <button
                      onClick={() => setIsDownloadOpen(true)}
                      className="btn btn-outline py-2 px-4 text-xs font-bold shrink-0 cursor-pointer"
                    >
                      Abrir no app
                    </button>
                  </div>
                </div>

                {/* Main CTA after Day 1 */}
                <div className="bg-gradient-to-br from-brand-navy via-[#081B6B] to-brand-navy text-white p-8 md:p-12 rounded-[28px] text-center flex flex-col items-center gap-5 shadow-lg border border-brand-navy/30 animate-fade-in-up">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-brand-orange border border-white/20 mb-1">
                    <Smartphone className="w-7 h-7" />
                  </div>
                  <h3 className="font-headers text-xl md:text-3xl font-extrabold tracking-tight">
                    Baixar o app e acessar o roteiro completo
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 max-w-[580px] leading-relaxed">
                    No app você pode visualizar todos os dias, ajustar a rota ao seu ritmo, sincronizar vouchers e receber alertas em tempo real durante a viagem.
                  </p>
                  <div className="flex gap-4 mt-2 w-full justify-center max-w-[420px] flex-col sm:flex-row">
                    <button 
                      onClick={() => setIsDownloadOpen(true)}
                      className="btn bg-brand-orange hover:bg-brand-orange/95 text-white py-3.5 px-6 shadow-md cursor-pointer font-bold flex-1 text-center justify-center border border-brand-orange/20"
                    >
                      Baixar o App
                    </button>
                    <button 
                      onClick={handleReset}
                      className="btn border border-white/30 text-white bg-transparent py-3.5 px-6 hover:bg-white/10 hover:border-white transition-all cursor-pointer flex-1 text-center justify-center font-bold"
                    >
                      Criar Outro Roteiro
                    </button>
                  </div>
                </div>
              </div>
            )}

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

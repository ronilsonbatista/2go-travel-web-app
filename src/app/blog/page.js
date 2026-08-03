"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Search, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppDownloadModal from '@/components/AppDownloadModal';
import NewsletterBox from '@/components/NewsletterBox';
import { destinationGuides } from '@/data/guidesData';

const categories = ['Destinos', 'Custos'];

// Reusable Image Carousel Component for Cards
function CardImageCarousel({ images, title, emoji, categoryLabel }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images, isPaused]);

  const handlePrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    if (touchStart - touchEnd > 40) {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }
    if (touchStart - touchEnd < -40) {
      setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <div 
      className="relative w-full h-60 overflow-hidden bg-bg-light select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {images && images.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            idx === currentIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={img.url || img}
            alt={img.alt || title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>
      ))}

      {/* Floating Badge */}
      <span className="absolute top-3.5 left-3.5 z-20 bg-brand-orange text-white text-[9.5px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full font-headers shadow-xs flex items-center gap-1">
        <span>{emoji}</span>
        <span>{categoryLabel.toUpperCase()}</span>
      </span>

      {/* Discrete Arrows */}
      {images && images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer border border-white/20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Próximo"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 cursor-pointer border border-white/20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentIdx(idx);
                }}
                aria-label={`Ir para slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIdx
                    ? 'w-5 bg-white shadow-xs'
                    : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Master Article Database for /blog
const allArticles = [
  // 7 DESTINATION GUIDES
  {
    id: 'paris-guia',
    category: 'Destinos',
    categoryLabel: 'Guia de destino',
    city: 'Paris',
    country: 'França',
    emoji: '🇫🇷',
    title: 'Como planejar uma viagem para Paris: guia completo',
    desc: 'Descubra como organizar sua viagem para Paris com informações sobre documentos, transporte, hospedagem, orçamento e dicas essenciais.',
    images: destinationGuides['como-planejar-viagem-paris'].images,
    url: '/blog/como-planejar-viagem-paris',
    ctaText: 'Ler guia completo'
  },
  {
    id: 'ny-guia',
    category: 'Destinos',
    categoryLabel: 'Guia de destino',
    city: 'Nova York',
    country: 'Estados Unidos',
    emoji: '🇺🇸',
    title: 'Como planejar uma viagem para Nova York: guia completo',
    desc: 'Descubra como organizar sua viagem para Nova York com informações sobre visto, transporte, hospedagem, orçamento e itinerários essenciais.',
    images: destinationGuides['como-planejar-viagem-nova-york'].images,
    url: '/blog/como-planejar-viagem-nova-york',
    ctaText: 'Ler guia completo'
  },
  {
    id: 'toquio-guia',
    category: 'Destinos',
    categoryLabel: 'Guia de destino',
    city: 'Tóquio',
    country: 'Japão',
    emoji: '🇯🇵',
    title: 'Como planejar uma viagem para Tóquio: guia completo',
    desc: 'Guia completo para organizar sua viagem para Tóquio com informações sobre isenção de visto, transporte de trem, bairros e atrações.',
    images: destinationGuides['como-planejar-viagem-toquio'].images,
    url: '/blog/como-planejar-viagem-toquio',
    ctaText: 'Ler guia completo'
  },
  {
    id: 'londres-guia',
    category: 'Destinos',
    categoryLabel: 'Guia de destino',
    city: 'Londres',
    country: 'Reino Unido',
    emoji: '🇬🇧',
    title: 'Como planejar uma viagem para Londres: guia completo',
    desc: 'Planeje sua viagem para Londres com informações atualizadas sobre a nova autorização ETA, transporte no Tube, atrações e custos.',
    images: destinationGuides['como-planejar-viagem-londres'].images,
    url: '/blog/como-planejar-viagem-londres',
    ctaText: 'Ler guia completo'
  },
  {
    id: 'roma-guia',
    category: 'Destinos',
    categoryLabel: 'Guia de destino',
    city: 'Roma',
    country: 'Itália',
    emoji: '🇮🇹',
    title: 'Como planejar uma viagem para Roma: guia completo',
    desc: 'Descubra como organizar sua viagem para Roma com informações sobre ingressos do Coliseu e Vaticano, hospedagem, transporte e custos.',
    images: destinationGuides['como-planejar-viagem-roma'].images,
    url: '/blog/como-planejar-viagem-roma',
    ctaText: 'Ler guia completo'
  },
  {
    id: 'istambul-guia',
    category: 'Destinos',
    categoryLabel: 'Guia de destino',
    city: 'Istambul',
    country: 'Turquia',
    emoji: '🇹🇷',
    title: 'Como planejar uma viagem para Istambul: guia completo',
    desc: 'Organize sua viagem para Istambul na Turquia com informações sobre isenção de visto, passeios no Bósforo, feiras, hotéis e custos.',
    images: destinationGuides['como-planejar-viagem-istambul'].images,
    url: '/blog/como-planejar-viagem-istambul',
    ctaText: 'Ler guia completo'
  },
  {
    id: 'dubai-guia',
    category: 'Destinos',
    categoryLabel: 'Guia de destino',
    city: 'Dubai',
    country: 'Emirados Árabes Unidos',
    emoji: '🇦🇪',
    title: 'Como planejar uma viagem para Dubai: guia completo',
    desc: 'Saiba como planejar sua viagem para Dubai nos Emirados Árabes com informações sobre visto gratuito, Burj Khalifa, safari no deserto e custos.',
    images: destinationGuides['como-planejar-viagem-dubai'].images,
    url: '/blog/como-planejar-viagem-dubai',
    ctaText: 'Ler guia completo'
  },

  // CUSTOS CATEGORY ARTICLES
  {
    id: 'custos-paris',
    category: 'Custos',
    categoryLabel: 'Orçamento',
    city: 'Paris',
    country: 'França',
    emoji: '🇫🇷',
    title: 'Quanto custa viajar para Paris em 2026?',
    desc: 'Tabela detalhada de custos diários de hospedagem, refeições, transporte público e ingressos por perfil de viajante.',
    images: [{ url: '/assets/paris.png', alt: 'Paris' }],
    url: '/quanto-custa/paris',
    ctaText: 'Ver custos detalhados'
  },
  {
    id: 'custos-roma',
    category: 'Custos',
    categoryLabel: 'Orçamento',
    city: 'Roma',
    country: 'Itália',
    emoji: '🇮🇹',
    title: 'Quanto custa viajar para Roma?',
    desc: 'Estimativa diária de gastos para visitar o Coliseu, Vaticano, hospedagem em bairros centrais e alimentações na Itália.',
    images: [{ url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80', alt: 'Roma' }],
    url: '/quanto-custa/roma',
    ctaText: 'Ver custos detalhados'
  },
  {
    id: 'custos-lisboa',
    category: 'Custos',
    categoryLabel: 'Orçamento',
    city: 'Lisboa',
    country: 'Portugal',
    emoji: '🇵🇹',
    title: 'Lisboa econômica: quanto guardar por dia',
    desc: 'Guia de orçamento para explorar os mirantes de Lisboa, transporte público Navigo e gastronomia sem gastar muito.',
    images: [{ url: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80', alt: 'Lisboa' }],
    url: '/quanto-custa/lisboa',
    ctaText: 'Ver custos detalhados'
  }
];

export default function BlogIndex() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Destinos');
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Filter articles by active category
  const categoryArticles = allArticles.filter(art => art.category === activeCategory);

  // 2. Derive available cities automatically, sorted alphabetically
  const availableCities = Array.from(
    new Set(categoryArticles.map(art => art.city).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b, 'pt', { sensitivity: 'base' }));

  // 3. Filter articles by search query & selected city
  const filteredArticles = allArticles.filter(art => {
    if (art.category !== activeCategory) return false;
    if (selectedCity && art.city !== selectedCity) return false;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const matchCity = art.city && art.city.toLowerCase().includes(q);
      const matchCountry = art.country && art.country.toLowerCase().includes(q);
      const matchTitle = art.title && art.title.toLowerCase().includes(q);
      const matchDesc = art.desc && art.desc.toLowerCase().includes(q);
      return matchCity || matchCountry || matchTitle || matchDesc;
    }

    return true;
  });

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setSelectedCity(null);
  };

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1440px] w-full text-left">
          
          {/* 1. Breadcrumbs */}
          <Breadcrumbs items={[{ name: 'Guia de Viagem', url: '/blog' }]} />

          {/* 2. Compact Editorial Hero */}
          <header className="my-6 sm:my-8 text-center max-w-3xl mx-auto">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3.5 py-1.5 rounded-full w-fit mx-auto font-headers uppercase">
              GUIA DE VIAGEM
            </span>
            <h1 className="font-headers text-3xl sm:text-4.5xl md:text-5xl font-extrabold text-brand-navy mt-3 mb-3 tracking-tight leading-tight">
              Guia completo de viagem por destino
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-text-muted max-w-2xl mx-auto leading-relaxed">
              Encontre informações práticas, custos e conteúdos completos para planejar cada etapa da sua viagem.
            </p>
          </header>

          {/* 3. Search Input */}
          <div className="my-6 relative w-full max-w-4xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-text-muted/60" />
            </div>
            <input
              type="text"
              placeholder="Busque por cidades, países ou destinos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-border-gray pl-12 pr-6 py-4 rounded-2xl text-sm sm:text-base font-semibold text-brand-navy placeholder:text-text-muted/50 focus:outline-none focus:border-brand-navy transition-all shadow-xs"
            />
          </div>

          {/* 4. Categories Tabs (Destinos & Custos) */}
          <div className="mb-6 w-full flex justify-center border-b border-border-gray/50 pb-4">
            <div className="flex gap-2 bg-white border border-border-gray/80 p-1.5 rounded-2xl shadow-2xs">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-brand-navy text-white shadow-xs'
                      : 'text-text-muted hover:text-brand-navy hover:bg-bg-light/60'
                  }`}
                >
                  {cat === 'Destinos' && '📍 '}
                  {cat === 'Custos' && '💶 '}
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 5. City Filter Chips (Sorted Alphabetically: Todas, Dubai, Istambul, Londres, Nova York, Paris, Roma, Tóquio) */}
          {availableCities.length > 0 && (
            <div className="max-w-6xl mx-auto mb-8">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0" />
                <span className="text-xs font-bold text-brand-navy uppercase tracking-wider font-headers">
                  Filtrar por cidade:
                </span>
              </div>
              
              <div className="w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory flex gap-2 pb-2">
                <button
                  onClick={() => setSelectedCity(null)}
                  className={`snap-start px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                    !selectedCity
                      ? 'bg-brand-orange border-brand-orange text-white shadow-xs'
                      : 'bg-white border-border-gray/80 text-text-muted hover:border-brand-orange/40 hover:text-brand-navy'
                  }`}
                >
                  Todas ({categoryArticles.length})
                </button>

                {availableCities.map(city => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(selectedCity === city ? null : city)}
                    className={`snap-start px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                      selectedCity === city
                        ? 'bg-brand-orange border-brand-orange text-white shadow-xs'
                        : 'bg-white border-border-gray/80 text-text-muted hover:border-brand-orange/40 hover:text-brand-navy'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 6. Responsive Editorial Cards Grid (3 cards/row desktop >1200px, 2 cards tablet, 1 card mobile) */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {filteredArticles.map(item => (
                <article 
                  key={item.id}
                  className="group bg-white border border-border-gray/80 rounded-[28px] overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left h-full"
                >
                  {/* Image Carousel at Top */}
                  <CardImageCarousel 
                    images={item.images}
                    title={item.title}
                    emoji={item.emoji}
                    categoryLabel={item.categoryLabel}
                  />

                  {/* Card Content Below */}
                  <div className="p-6 flex flex-col justify-between flex-grow gap-5">
                    <div>
                      <span className="text-[11px] font-extrabold text-brand-orange uppercase tracking-wider block mb-2 font-headers">
                        {item.city}, {item.country}
                      </span>
                      
                      <h3 className="font-headers text-base sm:text-lg font-extrabold text-brand-navy group-hover:text-brand-orange transition-colors leading-snug line-clamp-3">
                        {item.title}
                      </h3>
                      
                      <p className="text-xs text-text-muted mt-2.5 leading-relaxed line-clamp-4 font-body">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border-gray/40 mt-auto">
                      <Link
                        href={item.url}
                        className="bg-[#96AB21] hover:bg-[#85981D] text-[#081B6B] font-extrabold px-5 py-3 rounded-xl transition-all shadow-xs hover:scale-[1.01] active:scale-95 text-xs flex items-center justify-between cursor-pointer w-full"
                      >
                        <span>{item.ctaText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="bg-white border border-border-gray/80 rounded-[28px] p-8 sm:p-12 text-center my-10 flex flex-col items-center max-w-xl mx-auto shadow-sm">
                <Sparkles className="w-12 h-12 text-brand-orange/40 mb-4 animate-pulse" />
                <h3 className="font-headers text-xl font-bold text-brand-navy">Nenhum guia encontrado</h3>
                <p className="text-xs sm:text-sm text-text-muted mt-2 leading-relaxed">
                  Não encontramos guias correspondentes à sua busca por "{searchQuery}". Tente pesquisar por outros destinos como 'Paris', 'Nova York' ou 'Tóquio'.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCity(null);
                  }}
                  className="mt-6 btn btn-outline text-xs py-2.5 px-6 font-bold cursor-pointer"
                >
                  Ver todos os guias
                </button>
              </div>
            )}
          </div>

          {/* Newsletter Box */}
          <div className="mt-16 w-full">
            <NewsletterBox destinationName="blog" />
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

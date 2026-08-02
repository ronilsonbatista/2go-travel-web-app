"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, MapPin, DollarSign, Compass } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppDownloadModal from '@/components/AppDownloadModal';
import NewsletterBox from '@/components/NewsletterBox';

// ONLY TWO CATEGORIES as requested
const categories = ['Destinos', 'Custos'];

// Only real articles/guides, tagged with city for dynamic filter derivation
const blogArticles = [
  {
    id: 'paris-guia',
    category: 'Destinos',
    city: 'Paris',
    title: 'Como planejar uma viagem para Paris: guia completo (2026)',
    desc: 'Descubra como planejar sua viagem para Paris sem estresse. Veja documentos, transporte, hospedagem, orçamento e dicas.',
    date: '12 Junho 2026',
    readTime: '12 min de leitura',
    image: '/assets/paris.png',
    url: '/blog/como-planejar-viagem-paris'
  },
  {
    id: 'custos-paris',
    category: 'Custos',
    city: 'Paris',
    title: 'Quanto custa viajar para Paris em 2026?',
    desc: 'Tabela detalhada de custos diários de hospedagem, refeições, transporte público e ingressos por perfil de viajante.',
    date: '10 Junho 2026',
    readTime: '6 min de leitura',
    image: '/assets/paris.png',
    url: '/quanto-custa/paris'
  },
  {
    id: 'custos-roma',
    category: 'Custos',
    city: 'Roma',
    title: 'Quanto custa viajar para Roma?',
    desc: 'Estimativa diária de gastos para visitar o Coliseu, Vaticano, hospedagem em bairros centrais e alimentações na Itália.',
    date: '08 Junho 2026',
    readTime: '5 min de leitura',
    image: '/assets/greece.png',
    url: '/quanto-custa/roma'
  },
  {
    id: 'custos-lisboa',
    category: 'Custos',
    city: 'Lisboa',
    title: 'Lisboa econômica: quanto guardar por dia',
    desc: 'Guia de orçamento para explorar os mirantes de Lisboa, transporte público Navigo e gastronomia sem gastar muito.',
    date: '05 Junho 2026',
    readTime: '5 min de leitura',
    image: '/assets/norway.png',
    url: '/quanto-custa/lisboa'
  }
];

export default function BlogIndex() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Destinos');
  const [selectedCity, setSelectedCity] = useState(null);

  // Articles filtered by current active category
  const categoryArticles = blogArticles.filter(art => art.category === activeCategory);

  // AUTOMATIC DYNAMIC CITY FILTER DERIVATION
  // Dynamically extracts unique cities from active category articles and sorts them alphabetically
  const availableCities = Array.from(
    new Set(categoryArticles.map(art => art.city).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b, 'pt', { sensitivity: 'base' }));

  // Final filtered list based on city selection
  const filteredArticles = categoryArticles.filter(art => {
    if (selectedCity && art.city !== selectedCity) return false;
    return true;
  });

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setSelectedCity(null); // Reset city filter on category change
  };

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1440px] w-full text-left">
          
          <Breadcrumbs items={[{ name: 'Blog', url: '/blog' }]} />

          {/* Header */}
          <header className="my-6 sm:my-8 text-center max-w-3xl mx-auto">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3 py-1.5 rounded-full w-fit mx-auto font-headers uppercase">
              EDITORIAL E DICAS
            </span>
            <h1 className="font-headers text-3xl sm:text-4.5xl md:text-5xl font-extrabold text-brand-navy mt-3 mb-3 tracking-tight">
              Blog 2GO
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-text-muted max-w-2xl mx-auto leading-relaxed">
              Conteúdos completos para planejar cada etapa da sua próxima viagem.
            </p>
          </header>

          {/* Main Category Filter Bar (Only Destinos and Custos) */}
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

          {/* DYNAMIC CITY FILTER (Automatically generated from articles in current category) */}
          {availableCities.length > 0 && (
            <div className="max-w-6xl mx-auto mb-8">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-brand-orange shrink-0" />
                <span className="text-xs font-bold text-brand-navy uppercase tracking-wider font-headers">
                  Filtrar por cidade:
                </span>
              </div>
              
              <div className="w-full overflow-x-auto scrollbar-hide snap-x snap-mandatory flex gap-2 pb-1">
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

          {/* Articles Section Grid */}
          <div className="max-w-6xl mx-auto">
            {activeCategory === 'Destinos' ? (
              /* Single/Featured Layout for Destination Guide (Paris) */
              <div className="flex flex-col gap-6">
                {filteredArticles.map(item => (
                  <article 
                    key={item.id}
                    className="group bg-white border border-border-gray/80 rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row text-left"
                  >
                    <div className="md:w-1/2 h-64 sm:h-80 md:h-auto overflow-hidden relative bg-bg-light shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                      />
                      <span className="absolute top-4 left-4 bg-brand-orange text-white text-[9px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full font-headers">
                        GUIA DE DESTINO • {item.city.toUpperCase()}
                      </span>
                    </div>

                    <div className="p-6 sm:p-8 md:w-1/2 flex flex-col justify-between gap-6">
                      <div>
                        <div className="flex items-center gap-3 text-[11px] text-text-muted font-semibold mb-3">
                          <span>{item.date}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-brand-orange" /> {item.readTime}
                          </span>
                        </div>

                        <h2 className="font-headers text-xl sm:text-2.5xl font-extrabold text-brand-navy group-hover:text-brand-orange transition-colors leading-tight mb-3">
                          {item.title}
                        </h2>

                        <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-border-gray/40">
                        <Link 
                          href={item.url}
                          className="btn btn-primary text-xs py-3 px-6 font-bold inline-flex items-center justify-between w-full"
                        >
                          <span>Ler guia completo</span>
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* Grid Layout for Custos Articles */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map(item => (
                  <article 
                    key={item.id}
                    className="group bg-white border border-border-gray/80 rounded-[24px] overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left"
                  >
                    <div className="h-44 overflow-hidden relative bg-bg-light">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 bg-brand-navy text-white text-[9px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full font-headers">
                        ORÇAMENTO • {item.city.toUpperCase()}
                      </span>
                    </div>

                    <div className="p-5 flex flex-col justify-between flex-grow gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-[10px] text-text-muted mb-2 font-semibold">
                          <span>{item.date}</span>
                          <span>•</span>
                          <span>{item.readTime}</span>
                        </div>
                        
                        <h3 className="font-headers text-base font-bold text-brand-navy group-hover:text-brand-orange transition-colors line-clamp-2 leading-snug">
                          {item.title}
                        </h3>
                        
                        <p className="text-xs text-text-muted mt-2 leading-relaxed line-clamp-2">
                          {item.desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-border-gray/40">
                        <Link
                          href={item.url}
                          className="text-xs font-bold text-brand-navy hover:text-brand-orange transition-colors flex items-center justify-between"
                        >
                          <span>Ver custos detalhados</span>
                          <ArrowRight className="w-3.5 h-3.5 text-brand-orange" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Newsletter Box */}
          <div className="mt-14 w-full">
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

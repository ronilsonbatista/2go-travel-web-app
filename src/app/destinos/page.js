"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Globe, MapPin, Search, Compass, BookOpen, HelpCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppDownloadModal from '@/components/AppDownloadModal';
import { getDestinations, getItineraries, getBlogPosts } from '@/lib/cms';

export default function Destinos() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [destList, setDestList] = useState([]);
  const [itineraryList, setItineraryList] = useState([]);
  const [blogList, setBlogList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getDestinations().then(data => setDestList(data));
    getItineraries().then(data => setItineraryList(data));
    getBlogPosts().then(data => setBlogList(data));
  }, []);

  const cleanQuery = searchQuery.toLowerCase().trim();

  // 1. Filter Destinations
  const filteredDestinations = destList.filter(dest => {
    if (!cleanQuery) return true;
    return (
      dest.name.toLowerCase().includes(cleanQuery) ||
      dest.country.toLowerCase().includes(cleanQuery) ||
      dest.description.toLowerCase().includes(cleanQuery) ||
      (dest.longDescription && dest.longDescription.toLowerCase().includes(cleanQuery))
    );
  });

  // 2. Filter Itineraries
  const filteredItineraries = itineraryList.filter(it => {
    if (!cleanQuery) return false;
    return (
      it.title.toLowerCase().includes(cleanQuery) ||
      it.desc.toLowerCase().includes(cleanQuery) ||
      it.destinationName.toLowerCase().includes(cleanQuery) ||
      it.style.toLowerCase().includes(cleanQuery)
    );
  });

  // 3. Filter Blog Posts
  const filteredBlogPosts = blogList.filter(post => {
    if (!cleanQuery) return false;
    return (
      post.title.toLowerCase().includes(cleanQuery) ||
      post.excerpt.toLowerCase().includes(cleanQuery) ||
      post.category.toLowerCase().includes(cleanQuery)
    );
  });

  const hasResults = filteredDestinations.length > 0 || filteredItineraries.length > 0 || filteredBlogPosts.length > 0;

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-5xl text-left">
          
          <Breadcrumbs items={[{ name: 'Destinos', url: '/destinos' }]} />

          {/* Page Title Header */}
          <header className="my-8">
            <span className="bg-brand-orange/10 text-brand-orange text-xs font-extrabold tracking-widest px-3.5 py-1.5 rounded-full w-fit">
              DIRETÓRIO INTERNACIONAL
            </span>
            <h1 className="font-headers text-3.5xl sm:text-5xl font-extrabold text-brand-navy mt-4 mb-4 tracking-tight">
              Explore nossos destinos curados
            </h1>
            <p className="text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
              Descubra guias completos, roteiros de viagem e estimativas de custos detalhadas para planejar sua próxima experiência de alto padrão.
            </p>
          </header>

          {/* Search Bar Input */}
          <div className="my-8 relative w-full">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-text-muted/60" />
            </div>
            <input
              type="text"
              placeholder="Busque por países, cidades, experiências ('Lua de Mel', 'Safári', 'Vinícolas') ou artigos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-border-gray pl-12 pr-6 py-4 rounded-xl text-base font-semibold text-brand-navy placeholder:text-text-muted/50 focus:outline-none focus:border-brand-navy transition-all shadow-xs"
            />
          </div>

          {/* Blank query: default grid of destinations */}
          {searchQuery === '' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {filteredDestinations.map((dest) => (
                <div 
                  key={dest.slug}
                  className="group bg-white border border-border-gray rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:translate-y-[-6px] transition-all duration-400 flex flex-col justify-between"
                >
                  {/* Image */}
                  <div className="h-52 overflow-hidden relative bg-bg-light">
                    <img 
                      src={dest.image} 
                      alt={dest.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs font-black text-brand-navy flex items-center gap-1 shadow-sm">
                      <span>{dest.emoji}</span>
                      <span>{dest.country}</span>
                    </div>
                  </div>

                  {/* Info and links */}
                  <div className="p-6 flex flex-col justify-between flex-grow gap-5">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-headers text-lg font-bold text-brand-navy group-hover:text-brand-orange transition-colors">
                        {dest.name}
                      </h3>
                      <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                        {dest.description}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2.5 pt-4 border-t border-border-gray/40">
                      <Link 
                        href={`/destinos/${dest.slug}`}
                        className="text-xs font-bold text-brand-navy hover:text-brand-orange transition-colors flex items-center justify-between py-1 group/link cursor-pointer"
                      >
                        <span>Ver Guia Completo</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                      <Link 
                        href={`/quanto-custa/${dest.slug}`}
                        className="text-xs font-semibold text-text-muted hover:text-brand-orange transition-colors flex items-center justify-between py-1 cursor-pointer"
                      >
                        <span>Quanto custa viajar?</span>
                        <span className="text-[11px] text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-md font-bold">{dest.currency}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Active query: categorized results list */}
          {searchQuery !== '' && (
            <div className="mt-8 flex flex-col gap-12 text-left">
              
              {/* 1. Destinations Section */}
              {filteredDestinations.length > 0 && (
                <div className="animate-fade-in-up">
                  <h3 className="font-headers text-lg font-bold text-brand-navy mb-5 flex items-center gap-2 border-b border-border-gray/50 pb-2">
                    <Compass className="w-5 h-5 text-brand-orange" /> Destinos & Guias ({filteredDestinations.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDestinations.map((dest) => (
                      <div 
                        key={dest.slug}
                        className="group bg-white border border-border-gray rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:translate-y-[-6px] transition-all duration-400 flex flex-col justify-between"
                      >
                        <div className="h-52 overflow-hidden relative bg-bg-light">
                          <img 
                            src={dest.image} 
                            alt={dest.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"></div>
                          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs font-black text-brand-navy flex items-center gap-1 shadow-sm">
                            <span>{dest.emoji}</span>
                            <span>{dest.country}</span>
                          </div>
                        </div>

                        <div className="p-6 flex flex-col justify-between flex-grow gap-5">
                          <div className="flex flex-col gap-2">
                            <h3 className="font-headers text-lg font-bold text-brand-navy group-hover:text-brand-orange transition-colors">
                              {dest.name}
                            </h3>
                            <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                              {dest.description}
                            </p>
                          </div>

                          <div className="flex flex-col gap-2.5 pt-4 border-t border-border-gray/40">
                            <Link 
                              href={`/destinos/${dest.slug}`}
                              className="text-xs font-bold text-brand-navy hover:text-brand-orange transition-colors flex items-center justify-between py-1 group/link cursor-pointer"
                            >
                              <span>Ver Guia Completo</span>
                              <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                            <Link 
                              href={`/quanto-custa/${dest.slug}`}
                              className="text-xs font-semibold text-text-muted hover:text-brand-orange transition-colors flex items-center justify-between py-1 cursor-pointer"
                            >
                              <span>Quanto custa viajar?</span>
                              <span className="text-[11px] text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-md font-bold">{dest.currency}</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Itineraries Section */}
              {filteredItineraries.length > 0 && (
                <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                  <h3 className="font-headers text-lg font-bold text-brand-navy mb-5 flex items-center gap-2 border-b border-border-gray/50 pb-2">
                    <MapPin className="w-5 h-5 text-brand-green" /> Roteiros Recomendados ({filteredItineraries.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredItineraries.map((it) => (
                      <div 
                        key={it.slug}
                        className="group bg-white border border-border-gray p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-[#96AB21]/20 transition-all duration-300 flex flex-col justify-between text-left"
                      >
                        <div>
                          <div className="flex justify-between items-start gap-2 mb-3">
                            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-2.5 py-1 rounded-md">
                              {it.destinationName} • {it.days}
                            </span>
                            <span className="text-[11px] text-[#96AB21] font-bold block uppercase tracking-wide">{it.style}</span>
                          </div>
                          <h4 className="font-headers text-base font-bold text-brand-navy group-hover:text-brand-orange transition-colors leading-tight">
                            {it.title}
                          </h4>
                          <p className="text-xs text-text-muted mt-2 line-clamp-2 leading-relaxed">
                            {it.desc}
                          </p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-border-gray/30 flex justify-end">
                          <Link 
                            href={`/roteiros/${it.slug}`}
                            className="text-xs font-bold text-[#96AB21] hover:text-[#85981D] flex items-center gap-1 transition-colors group/link cursor-pointer"
                          >
                            <span>Ver Roteiro Completo</span>
                            <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Blog Section */}
              {filteredBlogPosts.length > 0 && (
                <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  <h3 className="font-headers text-lg font-bold text-brand-navy mb-5 flex items-center gap-2 border-b border-border-gray/50 pb-2">
                    <BookOpen className="w-5 h-5 text-brand-navy" /> Artigos do Blog ({filteredBlogPosts.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredBlogPosts.map((post) => (
                      <div 
                        key={post.slug}
                        className="group bg-white border border-border-gray rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex items-stretch text-left"
                      >
                        <div className="w-28 sm:w-36 shrink-0 relative bg-bg-light hidden sm:block">
                          <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
                        </div>
                        <div className="p-5 flex flex-col justify-between flex-grow gap-3">
                          <div>
                            <div className="flex items-center justify-between text-[10px] font-bold text-[#F47A20] uppercase tracking-wider">
                              <span>{post.category}</span>
                              <span className="text-text-muted font-normal lowercase">{post.readTime}</span>
                            </div>
                            <h4 className="font-headers text-sm sm:text-base font-bold text-brand-navy group-hover:text-brand-orange transition-colors leading-snug mt-1.5">
                              {post.title}
                            </h4>
                            <p className="text-xs text-text-muted mt-1.5 line-clamp-2 leading-relaxed">
                              {post.excerpt}
                            </p>
                          </div>
                          <div className="pt-2 border-t border-border-gray/30 flex justify-end">
                            <Link 
                              href={`/blog/${post.slug}`}
                              className="text-xs font-bold text-brand-navy hover:text-brand-orange flex items-center gap-1 transition-colors group/link cursor-pointer"
                            >
                              <span>Ler Artigo</span>
                              <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. No Results State */}
              {!hasResults && (
                <div className="py-16 text-center max-w-md mx-auto flex flex-col items-center gap-4 bg-white border border-border-gray p-8 rounded-2xl shadow-sm animate-fade-in-up">
                  <HelpCircle className="w-12 h-12 text-brand-orange animate-bounce" />
                  <h3 className="font-headers text-lg font-bold text-brand-navy">Nenhum resultado encontrado</h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    Não encontramos destinos, roteiros ou artigos correspondentes a &ldquo;{searchQuery}&rdquo;. Experimente usar termos mais amplos ou clique em um atalho popular abaixo:
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mt-2">
                    {['Itália', 'Japão', 'Grécia', 'Safári', 'Vinícolas', 'Paris', 'Noronha'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-3.5 py-1.5 rounded-full border border-border-gray hover:border-brand-navy text-xs font-bold text-brand-navy bg-[#F8FAFC] transition-all cursor-pointer"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

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

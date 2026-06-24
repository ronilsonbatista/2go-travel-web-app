"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, LogOut, Heart, Clock, Star, Landmark, MapPin, Compass, Share2, Clipboard, Smartphone, Settings } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppDownloadModal from '@/components/AppDownloadModal';
import { getDestinationBySlug, getItineraryBySlug } from '@/lib/cms';
import { trackPageView, trackEvent } from '@/lib/analytics';

export default function Perfil() {
  const router = useRouter();
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  // Dynamic lists from CMS loaded based on localStorage slugs
  const [favoriteDestinations, setFavoriteDestinations] = useState([]);
  const [favoriteItineraries, setFavoriteItineraries] = useState([]);
  
  // Shared link copied states
  const [copiedLink, setCopiedLink] = useState('');

  useEffect(() => {
    trackPageView('user_profile_dashboard');

    if (typeof window !== 'undefined') {
      const session = localStorage.getItem('user_session');
      if (!session) {
        // Redirect to login if no session is active
        router.push('/login');
        return;
      }
      
      const parsedUser = JSON.parse(session);
      setUser(parsedUser);

      // Load favorites
      const favDestsSlugs = JSON.parse(localStorage.getItem('fav_destinations') || '["paris", "lisboa"]');
      const favItinsSlugs = JSON.parse(localStorage.getItem('fav_itineraries') || '["paris-5-dias"]');

      // Fetch matched items from CMS
      Promise.all(favDestsSlugs.map(slug => getDestinationBySlug(slug))).then(results => {
        setFavoriteDestinations(results.filter(Boolean));
      });

      Promise.all(favItinsSlugs.map(slug => getItineraryBySlug(slug))).then(results => {
        setFavoriteItineraries(results.filter(Boolean));
      });
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user_session');
      trackEvent('logout', { email: user?.email });
      router.push('/login');
    }
  };

  const handleCopyLink = (url, type) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.origin + url);
      setCopiedLink(type);
      setTimeout(() => setCopiedLink(''), 2000);
    }
  };

  if (!user) return null;

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-5xl text-left">
          
          {/* User Profile Header Block */}
          <div className="bg-white border border-border-gray p-6 sm:p-8 rounded-[32px] shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 text-left">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-navy/5 text-brand-navy flex items-center justify-center font-headers font-bold text-2xl shadow-xs select-none">
                {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h2 className="font-headers text-xl sm:text-2xl font-bold text-brand-navy">{user.name}</h2>
                <p className="text-xs text-text-muted mt-0.5">@{user.username} • Membro desde 2026</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[9px] bg-brand-orange/10 text-brand-orange px-2.5 py-1 rounded-lg font-bold">Viajante Gold 👑</span>
                  <span className="text-[9px] bg-brand-green/10 text-brand-green px-2.5 py-1 rounded-lg font-bold">Conexão Offline Sincronizada</span>
                </div>
              </div>
            </div>

            {/* Profile Action Buttons */}
            <div className="flex flex-wrap gap-2.5 shrink-0 w-full md:w-auto">
              <Link
                href={`/viajantes/${user.username}`}
                className="btn btn-outline border-border-gray text-brand-navy hover:bg-bg-light hover:border-brand-navy/20 py-2.5 px-4 text-xs font-bold w-full sm:w-auto justify-center flex items-center gap-1.5 cursor-pointer"
              >
                <User className="w-3.5 h-3.5" /> Ver Perfil Público
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-outline border-brand-orange/20 text-brand-orange hover:bg-brand-orange/5 py-2.5 px-4 text-xs font-bold w-full sm:w-auto justify-center flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" /> Sair da Conta
              </button>
            </div>
          </div>

          {/* Quick Statistics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border border-border-gray p-5 rounded-2xl shadow-xs text-center flex flex-col justify-center">
              <span className="text-[10px] text-text-muted font-bold tracking-wider uppercase">Países Visitados</span>
              <span className="font-headers text-2.5xl font-black text-brand-navy mt-1">03 🌎</span>
            </div>
            <div className="bg-white border border-border-gray p-5 rounded-2xl shadow-xs text-center flex flex-col justify-center">
              <span className="text-[10px] text-text-muted font-bold tracking-wider uppercase">Roteiros Salvos</span>
              <span className="font-headers text-2.5xl font-black text-brand-navy mt-1">{favoriteItineraries.length + favoriteDestinations.length}</span>
            </div>
            <div className="bg-white border border-border-gray p-5 rounded-2xl shadow-xs text-center flex flex-col justify-center">
              <span className="text-[10px] text-text-muted font-bold tracking-wider uppercase">Consultorias Ativas</span>
              <span className="font-headers text-2.5xl font-black text-brand-orange mt-1">01 ✉️</span>
            </div>
            <div className="bg-white border border-border-gray p-5 rounded-2xl shadow-xs text-center flex flex-col justify-center">
              <span className="text-[10px] text-text-muted font-bold tracking-wider uppercase">Downloads App</span>
              <span className="font-headers text-2.5xl font-black text-brand-green mt-1">Sincronizado</span>
            </div>
          </div>

          {/* Main Grid Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Favorites */}
            <div className="lg:col-span-8 flex flex-col gap-8 w-full text-left">
              
              {/* Favorited Itineraries */}
              <section className="bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] shadow-sm flex flex-col gap-6">
                <h3 className="font-headers text-lg font-bold text-brand-navy flex items-center gap-2">
                  <Heart className="w-5 h-5 text-brand-orange fill-brand-orange shrink-0" />
                  <span>Meus Roteiros Salvos</span>
                </h3>

                {favoriteItineraries.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {favoriteItineraries.map((it) => (
                      <div 
                        key={it.slug}
                        className="p-4 border border-border-gray/70 rounded-xl bg-bg-light/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-brand-navy/20 transition-all"
                      >
                        <div className="text-left">
                          <h4 className="font-headers text-sm font-bold text-brand-navy">{it.title}</h4>
                          <p className="text-[11px] text-text-muted mt-1 flex items-center gap-2">
                            <span>⏱️ {it.duration} {it.duration === 1 ? 'Dia' : 'Dias'}</span>
                            <span>•</span>
                            <span>📍 {it.days?.length || 0} Paradas</span>
                          </p>
                        </div>
                        
                        <div className="flex gap-2 w-full sm:w-auto justify-end">
                          <button
                            onClick={() => handleCopyLink(`/u/${user.username}/${it.slug}`, it.slug)}
                            className="btn btn-outline py-2 px-3 text-[10px] font-bold inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Share2 className="w-3 h-3 text-brand-orange" />
                            <span>{copiedLink === it.slug ? 'Copiado!' : 'Compartilhar'}</span>
                          </button>
                          <Link
                            href={`/roteiros/${it.slug}`}
                            className="bg-brand-navy hover:bg-brand-orange text-white text-[10px] font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                          >
                            Abrir Roteiro <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-text-muted flex flex-col items-center justify-center gap-2">
                    <Compass className="w-10 h-10 text-text-muted/65" />
                    <p className="text-xs">Nenhum roteiro detalhado salvo nos favoritos ainda.</p>
                    <Link href="/roteiros" className="text-xs font-bold text-brand-orange hover:underline mt-1">Explorar Roteiros Disponíveis</Link>
                  </div>
                )}
              </section>

              {/* Favorited Destinations */}
              <section className="bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] shadow-sm flex flex-col gap-6">
                <h3 className="font-headers text-lg font-bold text-brand-navy flex items-center gap-2">
                  <Star className="w-5 h-5 text-brand-orange fill-brand-orange shrink-0" />
                  <span>Cidades & Destinos Favoritos</span>
                </h3>

                {favoriteDestinations.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {favoriteDestinations.map((dest) => (
                      <div 
                        key={dest.slug}
                        className="group border border-border-gray/70 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col bg-bg-light/10"
                      >
                        <div className="h-32 overflow-hidden relative bg-bg-light">
                          <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                          <span className="absolute bottom-2.5 left-2.5 bg-black/40 text-white text-[9px] font-bold py-1 px-2.5 rounded shadow-xs flex items-center gap-1">
                            {dest.emoji} {dest.name}
                          </span>
                        </div>
                        <div className="p-4 flex items-center justify-between">
                          <span className="text-[10px] text-text-muted font-semibold">{dest.country}</span>
                          <Link
                            href={`/destinos/${dest.slug}`}
                            className="text-xs font-bold text-brand-navy hover:text-brand-orange flex items-center gap-1 transition-colors"
                          >
                            Acessar Guia <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-text-muted flex flex-col items-center justify-center gap-2">
                    <Landmark className="w-10 h-10 text-text-muted/65" />
                    <p className="text-xs">Nenhum destino salvo nos favoritos ainda.</p>
                    <Link href="/destinos" className="text-xs font-bold text-brand-orange hover:underline mt-1">Ver Guia de Destinos</Link>
                  </div>
                )}
              </section>

            </div>

            {/* Right Column: Sychronization & Community Info */}
            <div className="lg:col-span-4 flex flex-col gap-6 w-full text-left">
              
              {/* App Sychronization Card */}
              <div className="bg-brand-navy text-white p-6 rounded-[24px] shadow-sm flex flex-col gap-4 text-left">
                <Smartphone className="w-8 h-8 text-brand-orange" />
                <div>
                  <h4 className="font-headers font-bold text-sm">Leve tudo no bolso</h4>
                  <p className="text-[11px] text-white/70 mt-1 leading-normal">
                    Todos os roteiros e destinos favoritados em sua conta web são sincronizados offline no aplicativo 2GO instantaneamente.
                  </p>
                </div>
                
                {/* Simulated QR Code sync */}
                <div className="p-3 bg-white border border-border-gray/10 rounded-xl w-32 h-32 mx-auto flex items-center justify-center shadow-xs">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-brand-navy">
                    <rect width="100" height="100" fill="white" />
                    <rect x="5" y="5" width="20" height="20" fill="currentColor" />
                    <rect x="10" y="10" width="10" height="10" fill="white" />
                    <rect x="75" y="5" width="20" height="20" fill="currentColor" />
                    <rect x="80" y="10" width="10" height="10" fill="white" />
                    <rect x="5" y="75" width="20" height="20" fill="currentColor" />
                    <rect x="10" y="80" width="10" height="10" fill="white" />
                    <rect x="30" y="30" width="15" height="15" fill="currentColor" />
                    <rect x="50" y="50" width="18" height="10" fill="currentColor" />
                    <rect x="60" y="70" width="15" height="15" fill="currentColor" />
                  </svg>
                </div>

                <button
                  onClick={() => setIsDownloadOpen(true)}
                  className="btn btn-secondary py-3 text-xs justify-center font-bold text-center w-full bg-brand-orange text-white hover:bg-white hover:text-brand-navy transition-all"
                >
                  Download App 2GO
                </button>
              </div>

              {/* Public Sharing card */}
              <div className="bg-white border border-border-gray p-6 rounded-[24px] shadow-sm flex flex-col gap-3">
                <span className="text-[8.5px] font-extrabold text-brand-orange uppercase tracking-wider">COMPARTILHAMENTO</span>
                <h4 className="font-headers font-bold text-brand-navy text-sm leading-tight">Link de Viagem Público</h4>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  Envie o link do seu perfil de viajante público para amigos e familiares acompanharem suas coleções e roteiros planejados.
                </p>
                <button 
                  onClick={() => handleCopyLink(`/viajantes/${user.username}`, 'profile')}
                  className="btn btn-outline py-2.5 text-xs text-center justify-center font-bold mt-2"
                >
                  <Clipboard className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                  <span>{copiedLink === 'profile' ? 'Copiado!' : 'Copiar Meu Link Público'}</span>
                </button>
              </div>

            </div>

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

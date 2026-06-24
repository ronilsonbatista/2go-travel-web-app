"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, MapPin, Compass, Landmark, Star, Share2, ArrowRight, Heart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppDownloadModal from '@/components/AppDownloadModal';
import { trackPageView, trackEvent } from '@/lib/analytics';

const mockProfiles = {
  ronilson: {
    name: 'Ronilson Batista',
    username: 'ronilson',
    bio: 'Planejador de rotas obsessivo. Amo descobrir bistrôs escondidos em Paris e cafés históricos em Lisboa. Próxima parada: Tóquio.',
    countries: ['Brasil 🇧🇷', 'França 🇫🇷', 'Portugal 🇵🇹', 'Itália 🇮🇹'],
    stats: { countries: 4, itineraries: 3, favorites: 5 },
    sharedItineraries: [
      { slug: 'paris-casal', title: 'Paris para Casais Sem Estresse', duration: 5, desc: 'Uma rota romântica desenhada com hotéis charmosos, piquenique no Sena e restaurantes fora da rota turística.', destSlug: 'paris' },
      { slug: 'lisboa-economica', title: 'Lisboa Histórica & Econômica', duration: 3, desc: 'Como conhecer as sete colinas, comer os melhores pastéis de nata e pegar o elétrico 28 economizando muito.', destSlug: 'lisboa' }
    ],
    collections: ['Viagens Românticas', 'Viagens Gastronômicas']
  },
  maria: {
    name: 'Maria Oliveira',
    username: 'maria',
    bio: 'Viajante solo, entusiasta de culinária oriental e trilhas na natureza. Viajando pelo mundo de forma inteligente.',
    countries: ['Brasil 🇧🇷', 'Japão 🇯🇵', 'Grécia 🇬🇷'],
    stats: { countries: 3, itineraries: 2, favorites: 4 },
    sharedItineraries: [
      { slug: 'japao-14-dias', title: 'Japão Clássico: Tóquio a Kyoto', duration: 14, desc: 'Roteiro completo de 14 dias cobrindo o melhor do modernismo de Shinjuku e a tradição dos templos de Kyoto.', destSlug: 'toquio' }
    ],
    collections: ['Viagens Culturais', 'Aventura Solo']
  }
};

export default function PublicProfile({ params }) {
  const router = useRouter();
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [usernameStr, setUsernameStr] = useState('');

  // Handle dynamic params in Client Component
  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      const uName = resolvedParams.username || 'ronilson';
      setUsernameStr(uName);
      
      const found = mockProfiles[uName.toLowerCase()] || mockProfiles.ronilson;
      setProfile(found);
      trackPageView('public_profile', uName);
    };
    resolveParams();
  }, [params]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
      trackEvent('copy_profile_link', { username: usernameStr });
    }
  };

  if (!profile) return null;

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl text-left">
          
          {/* Public Profile Header Card */}
          <div className="bg-white border border-border-gray p-8 rounded-[32px] shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl pointer-events-none"></div>

            <div className="w-20 h-20 rounded-3xl bg-brand-navy text-white flex items-center justify-center font-headers font-black text-3xl shadow-md select-none shrink-0">
              {profile.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </div>

            <div className="flex-grow text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="font-headers text-2xl font-black text-brand-navy">{profile.name}</h1>
                  <span className="text-xs text-text-muted">@{profile.username} • Curador de Viagem</span>
                </div>
                <button
                  onClick={handleCopyLink}
                  className="btn btn-outline border-border-gray text-brand-navy hover:bg-bg-light hover:border-brand-navy/20 py-2 px-3 text-[10px] font-bold flex items-center gap-1.5 cursor-pointer self-center"
                >
                  <Share2 className="w-3.5 h-3.5 text-brand-orange" />
                  <span>{copiedLink ? 'Copiado!' : 'Compartilhar Perfil'}</span>
                </button>
              </div>

              <p className="text-xs text-brand-navy/80 mt-4 leading-relaxed max-w-2xl">
                {profile.bio}
              </p>

              {/* Visited countries tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {profile.countries.map((c, idx) => (
                  <span key={idx} className="bg-bg-light border border-border-gray/70 text-brand-navy text-[10px] font-bold px-3 py-1 rounded-lg">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Shared Itineraries */}
            <div className="lg:col-span-8 flex flex-col gap-6 w-full text-left">
              <h3 className="font-headers text-lg font-bold text-brand-navy px-1">
                Roteiros Públicos Compartilhados
              </h3>

              <div className="flex flex-col gap-5">
                {profile.sharedItineraries.map((it) => (
                  <div 
                    key={it.slug}
                    className="group bg-white border border-border-gray p-6 rounded-[24px] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col gap-4 text-left"
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="bg-brand-orange/10 text-brand-orange text-[9px] font-extrabold tracking-wider px-2.5 py-1 rounded-full uppercase">
                          📍 {it.destSlug.toUpperCase()}
                        </span>
                        <span className="text-[10px] text-text-muted font-bold">⏱️ {it.duration} DIAS</span>
                      </div>
                      <h4 className="font-headers text-base font-bold text-brand-navy mt-2 group-hover:text-brand-orange transition-colors">
                        {it.title}
                      </h4>
                      <p className="text-xs text-text-muted mt-2 leading-relaxed">
                        {it.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border-gray/30 mt-1">
                      <span className="text-[9px] text-text-muted font-semibold">Criado por @{profile.username}</span>
                      <Link
                        href={`/u/${profile.username}/${it.slug}`}
                        className="bg-brand-navy hover:bg-brand-orange text-white text-[10px] font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                      >
                        Abrir Roteiro Completo <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Statistics & Collections */}
            <div className="lg:col-span-4 flex flex-col gap-6 w-full text-left">
              
              {/* Profile stats */}
              <div className="bg-white border border-border-gray p-6 rounded-[24px] shadow-sm flex flex-col gap-4">
                <h4 className="font-headers font-bold text-brand-navy text-sm border-b border-border-gray/50 pb-2">Estatísticas</h4>
                <div className="flex flex-col gap-3.5 text-xs text-brand-navy">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Países Explorados</span>
                    <span className="font-bold">{profile.stats.countries}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Roteiros Criados</span>
                    <span className="font-bold">{profile.stats.itineraries}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Locais Favoritos</span>
                    <span className="font-bold">{profile.stats.favorites}</span>
                  </div>
                </div>
              </div>

              {/* Collections promotion */}
              <div className="bg-brand-navy text-white p-6 rounded-[24px] shadow-sm flex flex-col gap-4 text-left">
                <Heart className="w-8 h-8 text-brand-orange fill-brand-orange" />
                <div>
                  <h4 className="font-headers font-bold text-sm">Coleções de @{profile.username}</h4>
                  <p className="text-[11px] text-white/70 mt-1 leading-normal">
                    Descubra destinos agrupados por tema. Viagens focadas em gastronomia fina e rotas românticas inesquecíveis.
                  </p>
                </div>
                
                <div className="flex flex-col gap-2 mt-1">
                  {profile.collections.map((col, idx) => (
                    <span key={idx} className="bg-white/10 text-white border border-white/10 rounded-lg py-2 px-3 text-[10px] font-bold block">
                      📁 {col}
                    </span>
                  ))}
                </div>
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

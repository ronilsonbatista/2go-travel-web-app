"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, ArrowRight } from 'lucide-react';
import { getDestinations } from '@/lib/cms';

const DESTINATION_CATEGORIES = {
  paris: 'historic',
  roma: 'historic',
  lisboa: 'historic',
  londres: 'historic',
  toquio: 'historic',
  santorini: 'beach',
  noruega: 'nature',
  capadocia: 'nature',
  gramado: 'nature',
  'fernando-de-noronha': 'beach',
};

const CATEGORIES_LABELS = {
  historic: 'Cidades Históricas & Culturais',
  beach: 'Praias & Paraísos Tropicais',
  nature: 'Natureza, Clima & Paisagens',
};

export default function RecommendationEngine({ currentDestination }) {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    async function loadRecommendations() {
      if (!currentDestination) return;
      try {
        const allDestinations = await getDestinations();
        const currentSlug = currentDestination.slug;
        const currentCategory = DESTINATION_CATEGORIES[currentSlug] || 'historic';

        // Filter out current destination and countries or undefined items
        const otherDestinations = allDestinations.filter(d => d.slug !== currentSlug && d.slug !== 'italia' && d.slug !== 'japao');

        // Get destinations in the same category
        let related = otherDestinations.filter(d => {
          const cat = DESTINATION_CATEGORIES[d.slug] || 'historic';
          return cat === currentCategory;
        });

        // If less than 3, add others to fill
        if (related.length < 3) {
          const filledSlugs = new Set(related.map(r => r.slug));
          const rest = otherDestinations.filter(d => !filledSlugs.has(d.slug));
          related = [...related, ...rest].slice(0, 3);
        } else {
          related = related.slice(0, 3);
        }

        setRecommendations(related);
      } catch (err) {
        console.error('Failed to load recommendations:', err);
      }
    }

    loadRecommendations();
  }, [currentDestination]);

  if (!currentDestination || recommendations.length === 0) return null;

  const currentCategory = DESTINATION_CATEGORIES[currentDestination.slug] || 'historic';
  const categoryLabel = CATEGORIES_LABELS[currentCategory] || 'Destinos Semelhantes';

  return (
    <section className="bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] shadow-sm text-left">
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="text-[9px] font-extrabold text-brand-orange uppercase tracking-wider block">QUEM VIU {currentDestination.name.toUpperCase()} TAMBÉM VIU</span>
          <h2 className="font-headers text-lg sm:text-xl font-bold text-brand-navy mt-1">
            {categoryLabel}
          </h2>
        </div>
        <Compass className="w-5 h-5 text-brand-orange shrink-0 hidden sm:block animate-[spin_8s_linear_infinite]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((dest) => (
          <Link
            key={dest.slug}
            href={`/destinos/${dest.slug}`}
            className="group flex flex-col justify-between h-full bg-[#F8FAFC] border border-border-gray/50 rounded-2xl overflow-hidden hover:border-brand-orange/30 hover:bg-white hover:shadow-md transition-all duration-300"
          >
            <div>
              <div className="h-36 overflow-hidden relative bg-bg-light">
                <img 
                  src={dest.image} 
                  alt={dest.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <span className="absolute top-3 left-3 bg-brand-navy/85 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-1">
                  <span>{dest.emoji}</span>
                  <span>{dest.country}</span>
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-headers text-sm font-bold text-brand-navy group-hover:text-brand-orange transition-colors font-headers">
                  {dest.name}
                </h3>
                <p className="text-[11px] text-text-muted mt-1 leading-normal line-clamp-2">
                  {dest.description}
                </p>
              </div>
            </div>
            <div className="p-4 pt-0 border-t border-border-gray/30 mt-3 flex justify-between items-center text-[10px] font-bold text-text-muted">
              <span>{dest.bestTime ? dest.bestTime.split(' (')[0] : ''}</span>
              <span className="text-brand-orange flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                <span>Ver Guia</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

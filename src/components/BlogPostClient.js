"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Calendar, ArrowLeft, BookOpen, Sparkles } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import AppDownloadModal from './AppDownloadModal';
import NewsletterBox from './NewsletterBox';
import { trackPageView } from '@/lib/analytics';
import JsonLd from './JsonLd';

export default function BlogPostClient({ post }) {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  useEffect(() => {
    if (post) {
      trackPageView('blog_post', post.slug);
    }
  }, [post]);

  if (!post) return null;

  const getIsoDate = (dateStr) => {
    const parts = dateStr.split(' ');
    if (parts.length === 3) {
      const day = parts[0].padStart(2, '0');
      const monthName = parts[1].toLowerCase();
      const year = parts[2];
      const months = {
        janeiro: '01', fevereiro: '02', marco: '03', março: '03', abril: '04', maio: '05', junho: '06',
        julho: '07', agosto: '08', setembro: '09', outubro: '10', novembro: '11', dezembro: '12'
      };
      const month = months[monthName] || '06';
      return `${year}-${month}-${day}T08:00:00Z`;
    }
    return new Date().toISOString();
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": [
      post.image.startsWith('http') ? post.image : `https://2go-travel-react.vercel.app${post.image}`
    ],
    "datePublished": getIsoDate(post.date),
    "dateModified": getIsoDate(post.date),
    "author": {
      "@type": "Person",
      "name": "Curador Local 2GO Travel",
      "url": "https://2go-travel-react.vercel.app/blog"
    },
    "publisher": {
      "@type": "Organization",
      "name": "2GO Travel",
      "logo": {
        "@type": "ImageObject",
        "url": "https://2go-travel-react.vercel.app/logo.png"
      }
    }
  };

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <JsonLd schema={articleSchema} />
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl text-left">
          
          <Breadcrumbs items={[
            { name: 'Blog', url: '/blog' },
            { name: post.title, url: `/blog/${post.slug}` }
          ]} />

          {/* Back button */}
          <div className="my-4">
            <Link 
              href="/blog"
              className="text-xs font-semibold text-text-muted hover:text-brand-navy transition-colors inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao blog
            </Link>
          </div>

          {/* Header block */}
          <header className="mb-8">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3.5 py-1.5 rounded-full w-fit">
              {post.category.toUpperCase()}
            </span>
            <h1 className="font-headers text-3xl sm:text-5xl font-extrabold text-brand-navy mt-4 mb-4 tracking-tight leading-tight">
              {post.title}
            </h1>
            <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-3xl">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-4 text-xs text-text-muted font-semibold mt-6 pb-6 border-b border-border-gray/50">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-orange" /> {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-green" /> {post.readTime} de leitura
              </span>
            </div>
          </header>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Article Body */}
            <article className="lg:col-span-8 bg-white border border-border-gray p-8 md:p-10 rounded-[28px] shadow-sm text-left">
              {/* Image banner */}
              <div className="h-64 sm:h-80 w-full overflow-hidden rounded-[20px] mb-8 bg-bg-light border border-border-gray/30">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Body Content */}
              <div className="prose max-w-none text-xs sm:text-sm md:text-base text-text-main leading-relaxed flex flex-col gap-6">
                <p className="font-semibold text-brand-navy text-sm sm:text-base md:text-lg">
                  {post.content.split('\n\n')[0]}
                </p>
                {post.content.split('\n\n').slice(1).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </article>

            {/* Right Column: CTAs Sidebar */}
            <div className="lg:col-span-4 flex flex-col gap-6 w-full text-left">
              
              {/* Planner Promo */}
              <div className="bg-brand-navy text-white p-6 rounded-[24px] shadow-sm flex flex-col gap-4">
                <Sparkles className="w-8 h-8 text-brand-orange animate-pulse" />
                <div>
                  <h4 className="font-headers font-bold text-sm">Gostou das dicas?</h4>
                  <p className="text-[11px] text-white/70 mt-1 leading-normal">
                    Deixe que nosso algoritmo inteligente crie o roteiro ideal para sua próxima viagem em segundos, incluindo as melhores recomendações gastronômicas.
                  </p>
                </div>
                <Link 
                  href="/planejamento"
                  className="btn btn-secondary py-3 text-xs justify-center font-bold text-center w-full bg-brand-orange text-white hover:bg-white hover:text-brand-navy hover:scale-[1.01] active:scale-95 transition-all"
                >
                  Gerar Roteiro Grátis
                </Link>
              </div>

              {/* Consulting Promo */}
              <div className="bg-white border border-border-gray p-6 rounded-[24px] shadow-sm flex flex-col gap-3">
                <span className="text-[8.5px] font-extrabold text-brand-orange uppercase tracking-wider">SUPORTE EXCLUSIVO</span>
                <h4 className="font-headers font-bold text-brand-navy text-sm leading-tight">Quer curadoria humana?</h4>
                <p className="text-[11px] text-text-muted leading-relaxed">Fale com um consultor local premium da 2GO para planejar sua rota detalhada dia a dia e fechar todas as suas reservas.</p>
                <Link 
                  href="/premium"
                  className="btn btn-outline py-2.5 text-xs text-center justify-center font-bold mt-2"
                >
                  Falar com Especialista
                </Link>
              </div>

            </div>

          </div>

          {/* Newsletter Box */}
          <div className="mt-12 w-full">
            <NewsletterBox destinationName={post.title} />
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

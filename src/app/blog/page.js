"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppDownloadModal from '@/components/AppDownloadModal';
import NewsletterBox from '@/components/NewsletterBox';
import { getBlogPosts } from '@/lib/cms';

const categories = ['Todos', 'Destinos', 'Planejamento', 'Economia', 'Experiências', 'Curiosidades', 'Roteiros'];

export default function Blog() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedCat, setSelectedCat] = useState('Todos');

  useEffect(() => {
    getBlogPosts().then(data => setPosts(data));
  }, []);

  const filteredPosts = selectedCat === 'Todos'
    ? posts
    : posts.filter(post => post.category === selectedCat);

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-5xl text-left">
          
          <Breadcrumbs items={[{ name: 'Blog', url: '/blog' }]} />

          {/* Header */}
          <header className="my-8">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3 py-1.5 rounded-full w-fit">
              EDITORIAL E DICAS
            </span>
            <h1 className="font-headers text-3.5xl sm:text-5xl font-extrabold text-brand-navy mt-4 mb-4 tracking-tight">
              Blog de Viagem 2GO
            </h1>
            <p className="text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
              Dicas de especialistas, guias de bagagem, truques de milhas e tudo o que você precisa saber para planejar sua jornada de alto padrão.
            </p>
          </header>

          {/* Categories Filters */}
          <div className="flex flex-wrap gap-2 my-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                  selectedCat === cat
                    ? 'bg-brand-navy border-brand-navy text-white shadow-sm'
                    : 'bg-white border-border-gray text-text-muted hover:border-brand-navy hover:text-brand-navy'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            {filteredPosts.map((post) => (
              <article 
                key={post.slug}
                className="group bg-white border border-border-gray rounded-[28px] overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="h-56 overflow-hidden relative bg-bg-light">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  />
                  <div className="absolute top-4 left-4 bg-brand-orange text-white text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-xl">
                    {post.category}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col justify-between flex-grow gap-4 text-left">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3 text-[10px] text-text-muted font-semibold">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {post.readTime} de leitura
                      </span>
                    </div>

                    <h3 className="font-headers text-base sm:text-lg font-bold text-brand-navy group-hover:text-brand-orange transition-colors line-clamp-2 mt-1">
                      {post.title}
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border-gray/30">
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-xs font-bold text-brand-navy hover:text-brand-orange transition-colors flex items-center justify-between group/link"
                    >
                      <span>Ler Artigo Completo</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="bg-white border border-border-gray rounded-[28px] p-12 text-center my-6 flex flex-col items-center">
              <h3 className="font-headers text-lg font-bold text-brand-navy">Nenhum artigo nesta categoria</h3>
              <p className="text-xs text-text-muted mt-2">Em breve publicaremos novos materiais nesta seção.</p>
            </div>
          )}

          {/* Newsletter Box */}
          <div className="mt-12 w-full">
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

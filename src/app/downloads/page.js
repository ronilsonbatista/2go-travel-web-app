"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, CheckSquare, Download, Sparkles, Mail, User, X, CheckCircle, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppDownloadModal from '@/components/AppDownloadModal';
import Breadcrumbs from '@/components/Breadcrumbs';
import { trackPageView, trackLeadCapture, trackDownloadPDF } from '@/lib/analytics';
import { triggerLeadRecovery } from '@/lib/emailAutomation';
import confetti from 'canvas-confetti';

const downloadsList = [
  {
    id: 'ebook-paris',
    title: 'E-book: Segredos de Paris',
    desc: 'O guia de bolso definitivo contendo 20 bistrôs secretos, rotas a pé sem filas e dicas imperdíveis fora do roteiro clássico.',
    type: 'ebook',
    pages: '45 páginas',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80',
    destination: 'Paris',
    destinationSlug: 'paris'
  },
  {
    id: 'checklist-universal',
    title: 'Checklist Definitivo de Viagem',
    desc: 'Garanta que nada fique para trás. Mala de mão, mala de porão, farmacinha básica, documentos e adaptadores obrigatórios.',
    type: 'checklist',
    pages: 'Folha Única A4',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?auto=format&fit=crop&w=400&q=80',
    destination: 'Global',
    destinationSlug: 'global'
  },
  {
    id: 'guia-lisboa',
    title: 'Guia de Bolso: Lisboa Histórica',
    desc: 'Como explorar as 7 colinas a pé, escolher as melhores tascas de fado autênticas e economizar em passes de transporte.',
    type: 'guide',
    pages: '22 páginas',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80',
    destination: 'Lisboa',
    destinationSlug: 'lisboa'
  }
];

export default function DownloadsHub() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [selectedDownload, setSelectedDownload] = useState(null);
  
  // Lead Form
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    trackPageView('downloads_hub');
  }, []);

  const handleOpenForm = (dl) => {
    setSelectedDownload(dl);
    setSuccess(false);
    setFullName('');
    setEmail('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate PDF generation & lead log
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Celebration
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });

      // Analytics
      trackLeadCapture('pdf_guide', email, { guide_name: selectedDownload.title });
      trackDownloadPDF(selectedDownload.destinationSlug, selectedDownload.type);

      // LocalStorage registration
      const leadData = {
        name: fullName,
        email: email,
        destination: selectedDownload.title,
        type: 'download_hub',
        created_at: new Date().toISOString()
      };

      try {
        const localLeads = JSON.parse(localStorage.getItem('newsletter_leads') || '[]');
        localLeads.push(leadData);
        localStorage.setItem('newsletter_leads', JSON.stringify(localLeads));

        // Increment admin stats
        const stats = JSON.parse(localStorage.getItem('admin_stats') || '{"clicks":0,"revenue":0,"conversions":0}');
        stats.clicks = (stats.clicks || 0) + 1; // register click
        localStorage.setItem('admin_stats', JSON.stringify(stats));

        // Trigger welcome/recovery email automation logs
        triggerLeadRecovery(email, selectedDownload.title);
      } catch (err) {
        console.error('Error recording download log:', err);
      }
    }, 1200);
  };

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-5xl text-left">
          
          <Breadcrumbs items={[{ name: 'Downloads', url: '/downloads' }]} />

          {/* Page Header */}
          <header className="my-8">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3 py-1.5 rounded-full w-fit">
              HUB DE DOWNLOADS
            </span>
            <h1 className="font-headers text-3.5xl sm:text-5xl font-extrabold text-brand-navy mt-4 mb-4 tracking-tight leading-tight">
              Guias e Checklists de Viagem Gratuitos
            </h1>
            <p className="text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
              Baixe materiais exclusivos produzidos por nossos curadores locais para organizar sua viagem de forma inteligente e sem estresse.
            </p>
          </header>

          {/* Downloads list */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {downloadsList.map((dl) => (
              <div 
                key={dl.id}
                className="group bg-white border border-border-gray rounded-[28px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 overflow-hidden relative bg-bg-light">
                    <img src={dl.image} alt={dl.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" />
                    <span className="absolute top-4 left-4 bg-brand-navy text-white text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-xl">
                      {dl.type === 'ebook' ? 'E-book 📘' : 'Checklist 📋'}
                    </span>
                  </div>

                  <div className="p-6 text-left">
                    <span className="text-[9px] text-brand-orange font-bold uppercase tracking-wider">{dl.pages}</span>
                    <h3 className="font-headers text-base sm:text-lg font-bold text-brand-navy mt-1 group-hover:text-brand-orange transition-colors">
                      {dl.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-2 leading-relaxed">
                      {dl.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-border-gray/30 mt-4">
                  <button
                    onClick={() => handleOpenForm(dl)}
                    className="btn btn-primary w-full justify-center mt-4 py-2.5 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Grátis</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer onOpenDownload={() => setIsDownloadOpen(true)} />
      
      <AppDownloadModal 
        isOpen={isDownloadOpen} 
        onClose={() => setIsDownloadOpen(false)} 
      />

      {/* Gated Lead Capture Modal */}
      {selectedDownload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            onClick={() => setSelectedDownload(null)}
            className="absolute inset-0 bg-brand-navy/60 backdrop-blur-xs transition-opacity duration-300"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-md bg-white p-6 sm:p-8 rounded-[32px] shadow-2xl z-10 animate-fade-in-up text-left">
            <button 
              onClick={() => setSelectedDownload(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border border-border-gray flex items-center justify-center text-text-muted hover:text-brand-navy hover:bg-bg-light transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {success ? (
              <div className="py-6 flex flex-col items-center justify-center text-center gap-4 animate-fade-in-up">
                <div className="w-14 h-14 bg-brand-green text-white rounded-full flex items-center justify-center text-xl font-bold shadow-md shadow-brand-green/20">✓</div>
                <h3 className="font-headers text-xl font-black text-brand-navy">Pronto para Download!</h3>
                <p className="text-xs text-text-muted max-w-[320px] leading-relaxed">
                  Enviamos o link de download direto e uma cópia em PDF do material <strong>{selectedDownload.title}</strong> para seu e-mail. Boa viagem! ✈️
                </p>

                <a
                  href={`/assets/downloads/mock-${selectedDownload.id}.pdf`}
                  download
                  onClick={() => setSelectedDownload(null)}
                  className="btn btn-primary mt-4 py-2.5 px-6 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-[1.01] active:scale-95 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar Arquivo PDF</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="mb-2">
                  <span className="text-[8px] font-extrabold text-brand-orange uppercase tracking-wider">Acesso Imediato</span>
                  <h3 className="font-headers text-lg font-bold text-brand-navy mt-0.5">
                    Libere seu Material Gratuito
                  </h3>
                  <p className="text-[11px] text-text-muted mt-1 leading-normal">
                    Preencha seus dados de contato abaixo para iniciar o download do arquivo <strong>{selectedDownload.title}</strong>.
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-text-muted">Seu Nome</label>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nome completo" 
                    required 
                    className="w-full px-3.5 py-2 rounded-xl border border-border-gray bg-bg-light/45 text-brand-navy focus:outline-none focus:border-brand-navy text-xs"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-text-muted">E-mail de Envio</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@e-mail.com" 
                      required 
                      className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-border-gray bg-bg-light/45 text-brand-navy focus:outline-none focus:border-brand-navy text-xs"
                    />
                    <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full py-3.5 justify-center flex items-center gap-2 cursor-pointer mt-2 text-xs font-bold"
                >
                  <span>{loading ? 'Preparando PDF...' : 'Enviar e Liberar Download'}</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>

                <p className="text-[9px] text-text-muted leading-relaxed text-center">
                  Respeitamos sua privacidade. Seus dados estão seguros e você pode se desinscrever de nossos comunicados a qualquer momento.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

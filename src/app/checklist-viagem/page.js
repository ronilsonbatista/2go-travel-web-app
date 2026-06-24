"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckSquare, Square, Download, CheckCircle, Lock, ClipboardList, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppDownloadModal from '@/components/AppDownloadModal';
import { supabase } from '@/lib/supabase';
import { trackPageView, trackLeadCapture, trackDownloadPDF } from '@/lib/analytics';
import confetti from 'canvas-confetti';

const defaultChecklist = {
  documents: [
    { text: 'Passaporte válido por mais de 3 meses', checked: false },
    { text: 'Comprovante de seguro viagem obrigatório', checked: false },
    { text: 'Vouchers de hotéis e voos impressos ou no celular', checked: false },
    { text: 'Comprovantes de meios financeiros (dinheiro/cartão)', checked: false }
  ],
  packing: [
    { text: 'Adaptador de tomada universal', checked: false },
    { text: 'Carregador portátil (Power Bank) carregado', checked: false },
    { text: 'Kit básico de remédios de uso comum', checked: false },
    { text: 'Roupas adequadas à temperatura do destino', checked: false }
  ],
  apps: [
    { text: 'Aplicativo da 2GO instalado', checked: false },
    { text: 'Roteiros de viagem baixados para uso off-line', checked: false },
    { text: 'e-SIM de internet ativado no celular', checked: false }
  ]
};

export default function ChecklistViagem() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [checklist, setChecklist] = useState(defaultChecklist);
  
  // Lead capture states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    trackPageView('checklist');
  }, []);

  const toggleCheck = (category, idx) => {
    setChecklist(prev => {
      const updated = { ...prev };
      updated[category][idx].checked = !updated[category][idx].checked;
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const leadData = {
      name,
      email,
      destination: 'checklist_global',
      type: 'travel_checklist',
      created_at: new Date().toISOString()
    };

    try {
      // Save lead to Supabase
      const { error } = await supabase.from('leads').insert([leadData]);
      if (error) throw error;
    } catch (err) {
      console.error('Error saving checklist lead:', err);
      // Fallback: save to LocalStorage
      if (typeof window !== 'undefined') {
        const localLeads = JSON.parse(localStorage.getItem('checklist_leads') || '[]');
        localLeads.push(leadData);
        localStorage.setItem('checklist_leads', JSON.stringify(localLeads));
      }
    } finally {
      setLoading(false);
      setDownloaded(true);
      
      // Trigger analytics tracking
      trackLeadCapture('checklist', email);
      trackDownloadPDF('general', 'checklist');
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.8 }
      });
    }
  };

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl text-left">
          
          <Breadcrumbs items={[{ name: 'Checklist de Viagem', url: '/checklist-viagem' }]} />

          {/* Page Header */}
          <header className="my-8">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3 py-1.5 rounded-full w-fit">
              PREPARAÇÃO DE VIAGEM
            </span>
            <h1 className="font-headers text-3.5xl sm:text-5xl font-extrabold text-brand-navy mt-4 mb-4 tracking-tight leading-tight">
              Checklist Completo de Viagem
            </h1>
            <p className="text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
              Evite esquecer documentos essenciais, adaptadores ou remédios. Use nossa lista interativa para conferir sua bagagem antes de sair de casa.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
            
            {/* Left Side: Interactive Checklist */}
            <div className="lg:col-span-7 bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] shadow-sm flex flex-col gap-8 w-full">
              
              {/* Category: Documents */}
              <div className="flex flex-col gap-4">
                <h3 className="font-headers text-sm sm:text-base font-bold text-brand-navy border-b border-border-gray pb-2 flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-brand-orange shrink-0" />
                  <span>Documentação Essencial</span>
                </h3>
                <div className="flex flex-col gap-3">
                  {checklist.documents.map((item, idx) => (
                    <button 
                      key={idx}
                      onClick={() => toggleCheck('documents', idx)}
                      className="flex items-start gap-3 text-left w-full cursor-pointer hover:text-brand-orange transition-colors select-none"
                    >
                      {item.checked ? (
                        <CheckSquare className="w-4.5 h-4.5 text-brand-green shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4.5 h-4.5 text-border-gray shrink-0 mt-0.5" />
                      )}
                      <span className={`text-xs sm:text-sm font-semibold ${item.checked ? 'line-through text-text-muted' : 'text-text-main'}`}>
                        {item.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category: Packing */}
              <div className="flex flex-col gap-4">
                <h3 className="font-headers text-sm sm:text-base font-bold text-brand-navy border-b border-border-gray pb-2 flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-brand-orange shrink-0" />
                  <span>Mala & Gadgets</span>
                </h3>
                <div className="flex flex-col gap-3">
                  {checklist.packing.map((item, idx) => (
                    <button 
                      key={idx}
                      onClick={() => toggleCheck('packing', idx)}
                      className="flex items-start gap-3 text-left w-full cursor-pointer hover:text-brand-orange transition-colors select-none"
                    >
                      {item.checked ? (
                        <CheckSquare className="w-4.5 h-4.5 text-brand-green shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4.5 h-4.5 text-border-gray shrink-0 mt-0.5" />
                      )}
                      <span className={`text-xs sm:text-sm font-semibold ${item.checked ? 'line-through text-text-muted' : 'text-text-main'}`}>
                        {item.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Category: Apps */}
              <div className="flex flex-col gap-4">
                <h3 className="font-headers text-sm sm:text-base font-bold text-brand-navy border-b border-border-gray pb-2 flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-brand-orange shrink-0" />
                  <span>Tecnologia & Viagem</span>
                </h3>
                <div className="flex flex-col gap-3">
                  {checklist.apps.map((item, idx) => (
                    <button 
                      key={idx}
                      onClick={() => toggleCheck('apps', idx)}
                      className="flex items-start gap-3 text-left w-full cursor-pointer hover:text-brand-orange transition-colors select-none"
                    >
                      {item.checked ? (
                        <CheckSquare className="w-4.5 h-4.5 text-brand-green shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4.5 h-4.5 text-border-gray shrink-0 mt-0.5" />
                      )}
                      <span className={`text-xs sm:text-sm font-semibold ${item.checked ? 'line-through text-text-muted' : 'text-text-main'}`}>
                        {item.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Side: Lead Capture Form */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-white border border-border-gray rounded-[28px] p-6 sm:p-8 shadow-sm flex flex-col gap-5 text-left">
                {downloaded ? (
                  <div className="flex flex-col items-center text-center gap-4 py-4 animate-fade-in">
                    <CheckCircle className="w-10 h-10 text-brand-green" />
                    <div>
                      <h4 className="font-headers text-base font-bold text-brand-navy">Checklist Liberado!</h4>
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">
                        Muito obrigado. Clique no botão abaixo para baixar a versão completa, detalhada e impressa do checklist de viagem oficial da 2GO.
                      </p>
                    </div>
                    <a 
                      href="/assets/guide-placeholder.pdf"
                      download="Checklist_Completo_2GO.pdf"
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          alert('Iniciando o download do Checklist Completo em PDF!');
                        }
                      }}
                      className="btn btn-primary py-3 w-full justify-center flex items-center gap-2 cursor-pointer mt-2 text-xs font-bold"
                    >
                      <Download className="w-4 h-4" />
                      <span>Baixar PDF Completo</span>
                    </a>
                  </div>
                ) : (
                  <>
                    <span className="bg-brand-orange/10 text-brand-orange text-[8px] font-extrabold tracking-widest px-2.5 py-1 rounded-full w-fit">
                      CHECKLIST COMPLETO (PDF)
                    </span>
                    <div>
                      <h4 className="font-headers text-base font-bold text-brand-navy">Baixar Versão Impressa</h4>
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">
                        Preencha seus dados para receber a versão oficial impressa que inclui listas expandidas de remédios, cuidados climáticos e checklist para viagens com crianças ou pets.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
                      <div className="flex flex-col gap-2">
                        <input 
                          type="text" 
                          placeholder="Seu nome" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-2.5 border border-border-gray bg-bg-light rounded-xl text-xs text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy/15 transition-all"
                          required
                          disabled={loading}
                        />
                        <input 
                          type="email" 
                          placeholder="Seu melhor e-mail" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2.5 border border-border-gray bg-bg-light rounded-xl text-xs text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy/15 transition-all"
                          required
                          disabled={loading}
                        />
                      </div>
                      <button 
                        type="submit" 
                        disabled={loading}
                        className="btn btn-primary py-3 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-brand-navy/10 hover:scale-[1.01] active:scale-95 transition-all"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>{loading ? 'Processando...' : 'Liberar Checklist PDF'}</span>
                      </button>
                    </form>
                  </>
                )}
              </div>

              {/* Extra Planner promo */}
              <div className="bg-brand-navy text-white p-6 rounded-[24px] shadow-sm flex flex-col gap-4 mt-6 text-left">
                <Sparkles className="w-8 h-8 text-brand-orange animate-pulse" />
                <div>
                  <h4 className="font-headers font-bold text-sm">Monte sua rota completa</h4>
                  <p className="text-[11px] text-white/70 mt-1 leading-normal">
                    Além do checklist, tenha o cronograma diário completo gerado sob medida para o seu destino no app 2GO.
                  </p>
                </div>
                <Link 
                  href="/planejamento"
                  className="btn btn-secondary py-3 text-xs justify-center font-bold text-center w-full bg-brand-orange text-white hover:bg-white hover:text-brand-navy transition-all"
                >
                  Gerar Roteiro Grátis
                </Link>
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

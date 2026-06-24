"use client";

import React, { useState } from 'react';
import { Download, CheckCircle, FileText, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { trackLeadCapture, trackDownloadPDF } from '@/lib/analytics';
import confetti from 'canvas-confetti';

export default function LeadMagnetBox({ destinationName = 'Paris', destinationSlug = 'paris' }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const leadData = {
      name,
      email,
      phone,
      destination: destinationName,
      type: `pdf_guide_${destinationSlug}`,
      created_at: new Date().toISOString()
    };

    try {
      // Record lead in Supabase
      const { error } = await supabase.from('leads').insert([leadData]);
      if (error) throw error;
    } catch (err) {
      console.error('Error saving lead magnet:', err);
      // Fallback: save to LocalStorage
      if (typeof window !== 'undefined') {
        const localLeads = JSON.parse(localStorage.getItem('magnet_leads') || '[]');
        localLeads.push(leadData);
        localStorage.setItem('magnet_leads', JSON.stringify(localLeads));
      }
    } finally {
      setLoading(false);
      setDownloaded(true);
      
      // Trigger analytics events
      trackLeadCapture('pdf_guide', email, { destination: destinationName });
      trackDownloadPDF(destinationName, 'guide');
      
      // Confetti feedback
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  };

  return (
    <div className="w-full bg-white border border-border-gray rounded-[28px] p-6 sm:p-8 shadow-sm text-left flex flex-col md:flex-row gap-8 items-center justify-between">
      
      {/* PDF Visual Card Indicator */}
      <div className="flex items-center gap-4 flex-grow max-w-md w-full">
        <div className="w-16 h-20 bg-brand-orange/10 border border-brand-orange/20 rounded-xl flex flex-col items-center justify-center text-brand-orange shrink-0 relative shadow-inner">
          <FileText className="w-8 h-8" />
          <span className="text-[7.5px] font-extrabold absolute bottom-2 tracking-wider">PDF</span>
        </div>
        <div className="flex flex-col gap-1.5 text-left">
          <span className="bg-brand-orange/10 text-brand-orange text-[8px] font-extrabold tracking-widest px-2.5 py-1 rounded-full w-fit">
            MATERIAL COMPLEMENTAR
          </span>
          <h3 className="font-headers text-base sm:text-lg font-bold text-brand-navy leading-tight">
            Baixar Guia Oficial PDF de {destinationName}
          </h3>
          <p className="text-xs text-text-muted leading-relaxed">
            Consulte offline: dicas de hotéis, culinária secreta, regras de segurança e contatos locais importantes em um e-book completo.
          </p>
        </div>
      </div>

      {/* Form or download link */}
      <div className="w-full md:max-w-xs shrink-0">
        {downloaded ? (
          <div className="bg-brand-green/5 border border-brand-green/20 rounded-2xl p-4 flex flex-col items-center text-center gap-3 animate-fade-in">
            <CheckCircle className="w-8 h-8 text-brand-green" />
            <div>
              <p className="text-xs font-bold text-brand-navy">Guia Liberado com sucesso!</p>
              <p className="text-[10px] text-text-muted mt-0.5">Clique no botão abaixo para salvar o e-book.</p>
            </div>
            
            {/* Download Link */}
            <a 
              href={`/assets/guide-placeholder.pdf`}
              download={`Guia_2GO_${destinationSlug}.pdf`}
              onClick={() => {
                // Simulate simple file download alert if file not found
                if (typeof window !== 'undefined') {
                  alert(`Iniciando o download do Guia de ${destinationName} em PDF!`);
                }
              }}
              className="btn btn-primary py-2 w-full text-[11px] font-bold justify-center flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Guia PDF</span>
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
            <div className="flex flex-col gap-2">
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome" 
                className="w-full px-4 py-2 border border-border-gray bg-bg-light rounded-xl text-xs text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy/15 transition-all"
                required
                disabled={loading}
              />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu e-mail" 
                className="w-full px-4 py-2 border border-border-gray bg-bg-light rounded-xl text-xs text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy/15 transition-all"
                required
                disabled={loading}
              />
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="WhatsApp (ex: 11999999999)" 
                className="w-full px-4 py-2 border border-border-gray bg-bg-light rounded-xl text-xs text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white focus:ring-1 focus:ring-brand-navy/15 transition-all"
                required
                disabled={loading}
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="btn btn-primary py-2.5 text-xs font-bold w-full justify-center flex items-center gap-1.5 cursor-pointer shadow-md shadow-brand-navy/10 hover:scale-[1.01] active:scale-95 transition-all"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{loading ? 'Processando...' : 'Liberar Guia Grátis'}</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
}

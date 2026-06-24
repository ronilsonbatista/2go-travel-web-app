"use client";

import React, { useState } from 'react';
import { Send, CheckCircle, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { trackLeadCapture } from '@/lib/analytics';

export default function NewsletterBox({ destinationName = '' }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    const leadData = {
      email,
      name: 'Inscrição Newsletter',
      destination: destinationName || 'newsletter_global',
      type: 'newsletter',
      created_at: new Date().toISOString()
    };

    try {
      // Record lead in Supabase
      const { error } = await supabase.from('leads').insert([leadData]);
      if (error) throw error;
    } catch (err) {
      console.error('Error saving newsletter lead:', err);
      // Fallback: save to LocalStorage
      if (typeof window !== 'undefined') {
        const localLeads = JSON.parse(localStorage.getItem('newsletter_leads') || '[]');
        localLeads.push(leadData);
        localStorage.setItem('newsletter_leads', JSON.stringify(localLeads));
      }
    } finally {
      setLoading(false);
      setSubmitted(true);
      trackLeadCapture('newsletter', email, { destination: destinationName || 'global' });
    }
  };

  return (
    <div className="w-full bg-brand-navy text-white p-8 md:p-10 rounded-[32px] shadow-lg border border-brand-navy flex flex-col md:flex-row items-center justify-between gap-6 text-left relative overflow-hidden">
      {/* Decorative background details */}
      <div className="absolute right-0 top-0 w-48 h-48 bg-brand-orange/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute left-10 bottom-0 w-36 h-36 bg-brand-green/5 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex-grow max-w-xl relative z-10">
        <span className="bg-brand-orange text-white text-[9px] font-extrabold tracking-widest px-3.5 py-1 rounded-full w-fit">
          NEWSLETTER EXCLUSIVA
        </span>
        <h3 className="font-headers text-xl sm:text-2xl font-bold mt-3 mb-2 tracking-tight">
          Receba roteiros e guias inéditos no seu e-mail
        </h3>
        <p className="text-xs text-white/70 leading-relaxed max-w-md">
          Inscreva-se gratuitamente para receber curadorias de viagem mensais, comparativos de custos e dicas de especialistas locais.
        </p>
      </div>

      <div className="w-full md:w-auto min-w-[280px] sm:min-w-[360px] relative z-10">
        {submitted ? (
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/15 text-white animate-fade-in">
            <CheckCircle className="w-5 h-5 text-brand-orange shrink-0" />
            <div className="text-left">
              <p className="text-xs font-bold">Inscrição confirmada!</p>
              <p className="text-[10px] text-white/70">Prepare-se para planejar suas melhores rotas.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2 w-full">
            <div className="relative flex-grow">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail" 
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-white/20 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-white focus:bg-white/10 transition-all text-xs"
                required 
                disabled={loading}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold px-5 py-3 rounded-2xl flex items-center justify-center gap-1.5 transition-all text-xs cursor-pointer shadow-md shadow-brand-orange/15 hover:scale-[1.02] active:scale-95 shrink-0"
            >
              <span>{loading ? '...' : 'Enviar'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

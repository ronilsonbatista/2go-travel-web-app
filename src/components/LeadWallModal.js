"use client";

import React, { useState } from 'react';
import { X, Lock, Send, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function LeadWallModal({ isOpen, onClose, onUnlock, destinationName }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tripDate, setTripDate] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const leadData = {
      name,
      email,
      phone,
      trip_date: tripDate,
      destination: destinationName || 'Não especificado',
      type: 'planner_unlock',
      created_at: new Date().toISOString()
    };

    try {
      // Record lead in Supabase
      const { error } = await supabase.from('leads').insert([leadData]);

      if (error) {
        throw error;
      }
    } catch (err) {
      console.error('Error saving lead:', err);
      // Fallback: save to localStorage so it works even without active internet/DB
      if (typeof window !== 'undefined') {
        const localLeads = JSON.parse(localStorage.getItem('planner_leads') || '[]');
        localLeads.push(leadData);
        localStorage.setItem('planner_leads', JSON.stringify(localLeads));
      }
    } finally {
      setLoading(false);
      // Trigger unlock callback
      onUnlock();
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-md z-[2000] flex items-center justify-center p-4 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white border border-border-gray max-w-[480px] w-full p-8 md:p-10 rounded-[28px] text-center flex flex-col items-center shadow-2xl animate-fade-in-up">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-text-muted hover:text-brand-navy transition-colors p-1 cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Icon */}
        <div className="w-12 h-12 rounded-full bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-6">
          <Lock className="w-6 h-6 animate-pulse" />
        </div>

        <h3 className="font-headers text-xl sm:text-2xl font-bold text-brand-navy mb-2">
          Desbloqueie seu Roteiro Completo
        </h3>
        <p className="text-xs sm:text-sm text-text-muted mb-6 max-w-[340px] leading-relaxed">
          Gostou do Dia 1? Insira seus dados para revelar os dias seguintes e exportar para o seu celular gratuitamente.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left w-full">
          <div className="flex flex-col gap-1">
            <label htmlFor="modal-name" className="text-[10px] font-bold font-headers text-brand-navy uppercase tracking-wider">
              Nome Completo
            </label>
            <input 
              type="text" 
              id="modal-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border-gray bg-bg-light text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white focus:ring-2 focus:ring-brand-navy/10 transition-all text-xs"
              placeholder="Seu nome completo" 
              required 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="modal-email" className="text-[10px] font-bold font-headers text-brand-navy uppercase tracking-wider">
                E-mail
              </label>
              <input 
                type="email" 
                id="modal-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border-gray bg-bg-light text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white focus:ring-2 focus:ring-brand-navy/10 transition-all text-xs"
                placeholder="seu@email.com" 
                required 
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="modal-phone" className="text-[10px] font-bold font-headers text-brand-navy uppercase tracking-wider">
                WhatsApp
              </label>
              <input 
                type="tel" 
                id="modal-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border-gray bg-bg-light text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white focus:ring-2 focus:ring-brand-navy/10 transition-all text-xs"
                placeholder="(11) 99999-9999" 
                required 
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="modal-date" className="text-[10px] font-bold font-headers text-brand-navy uppercase tracking-wider">
              Quando pretende viajar?
            </label>
            <input 
              type="date" 
              id="modal-date"
              value={tripDate}
              onChange={(e) => setTripDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-border-gray bg-bg-light text-brand-navy focus:outline-none focus:border-brand-navy focus:bg-white focus:ring-2 focus:ring-brand-navy/10 transition-all text-xs cursor-pointer"
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary w-full mt-2 py-3 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[0_4px_12px_rgba(8,27,107,0.15)]"
          >
            {loading ? 'Processando...' : 'Revelar Roteiro Completo'} <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-4 flex items-center gap-1.5 text-[10px] text-text-muted justify-center">
          <Sparkles className="w-3 h-3 text-brand-orange" />
          <span>Roteiro otimizado liberado instantaneamente.</span>
        </div>
      </div>
    </div>
  );
}

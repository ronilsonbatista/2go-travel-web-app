"use client";

import React, { useEffect, useId, useRef, useState } from 'react';
import { X, Lock, Send, Sparkles, AlertCircle } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export default function LeadWallModal({ isOpen, onClose, onUnlock, destinationName }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tripDate, setTripDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const titleId = useId();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    previouslyFocused.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => closeRef.current?.focus(), 0);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      const list = [...focusable].filter((el) => !el.hasAttribute('disabled'));
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused.current?.focus) previouslyFocused.current.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

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
      if (!isSupabaseConfigured || !supabase) {
        throw new Error('lead_not_configured');
      }

      const { error: insertError } = await supabase.from('leads').insert([leadData]);
      if (insertError) throw insertError;

      onUnlock();
      onClose();
    } catch (err) {
      console.error('Error saving lead:', err);
      if (typeof window !== 'undefined') {
        try {
          const drafts = JSON.parse(localStorage.getItem('planner_drafts') || '[]');
          drafts.push({ ...leadData, draft: true });
          localStorage.setItem('planner_drafts', JSON.stringify(drafts));
        } catch {
          /* ignore */
        }
      }
      setError(
        err?.message === 'lead_not_configured'
          ? 'Desbloqueio temporariamente indisponível. Tente novamente mais tarde.'
          : 'Não foi possível salvar seus dados. Tente de novo.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[3000] flex animate-fade-in items-center justify-center bg-black/50 p-4 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex w-full max-w-[480px] animate-fade-in-up flex-col items-center rounded-[28px] border border-border-gray bg-white p-8 text-center shadow-2xl md:p-10"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full text-text-muted transition-colors hover:bg-bg-light hover:text-brand-navy"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange">
          <Lock className="h-6 w-6 animate-pulse" />
        </div>

        <h3 id={titleId} className="mb-2 font-headers text-xl font-bold text-brand-navy sm:text-2xl">
          Desbloqueie seu Roteiro Completo
        </h3>
        <p className="mb-6 max-w-[340px] text-xs leading-relaxed text-text-muted sm:text-sm">
          Gostou do Dia 1? Insira seus dados para revelar os dias seguintes e exportar para o seu celular gratuitamente.
        </p>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4 text-left">
          <div className="flex flex-col gap-1">
            <label htmlFor="modal-name" className="font-headers text-[10px] font-bold uppercase tracking-wider text-brand-navy">
              Nome Completo
            </label>
            <input
              type="text"
              id="modal-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-border-gray bg-bg-light px-4 py-2.5 text-xs text-brand-navy transition-all focus:border-brand-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/10"
              placeholder="Seu nome completo"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="modal-email" className="font-headers text-[10px] font-bold uppercase tracking-wider text-brand-navy">
                E-mail
              </label>
              <input
                type="email"
                id="modal-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-border-gray bg-bg-light px-4 py-2.5 text-xs text-brand-navy transition-all focus:border-brand-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/10"
                placeholder="seu@email.com"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="modal-phone" className="font-headers text-[10px] font-bold uppercase tracking-wider text-brand-navy">
                WhatsApp
              </label>
              <input
                type="tel"
                id="modal-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-border-gray bg-bg-light px-4 py-2.5 text-xs text-brand-navy transition-all focus:border-brand-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/10"
                placeholder="(11) 99999-9999"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="modal-date" className="font-headers text-[10px] font-bold uppercase tracking-wider text-brand-navy">
              Quando pretende viajar?
            </label>
            <input
              type="text"
              id="modal-date"
              value={tripDate}
              onChange={(e) => setTripDate(e.target.value)}
              className="w-full rounded-xl border border-border-gray bg-bg-light px-4 py-2.5 text-xs text-brand-navy transition-all focus:border-brand-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy/10"
              placeholder="Ex: Dezembro de 2026"
              required
            />
          </div>

          {error ? (
            <p role="alert" className="flex items-start gap-1.5 text-[11px] font-semibold leading-snug text-red-600">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary mt-2 flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 py-3 shadow-md shadow-[0_4px_12px_rgba(8,27,107,0.15)] disabled:opacity-60"
          >
            {loading ? 'Processando...' : 'Revelar Roteiro Completo'} <Send className="h-3.5 w-3.5" />
          </button>
        </form>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-text-muted">
          <Sparkles className="h-3 w-3 text-brand-orange" />
          <span>Roteiro otimizado liberado instantaneamente.</span>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from 'react';
import { Send, CheckCircle, Mail, AlertCircle } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { trackLeadCapture } from '@/lib/analytics';

export default function NewsletterBox({ destinationName = '' }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError('');

    const leadData = {
      email,
      name: 'Inscrição Newsletter',
      destination: destinationName || 'newsletter_global',
      type: 'newsletter',
      created_at: new Date().toISOString()
    };

    try {
      if (!isSupabaseConfigured || !supabase) {
        throw new Error('newsletter_not_configured');
      }

      const { error: insertError } = await supabase.from('leads').insert([leadData]);
      if (insertError) throw insertError;

      setSubmitted(true);
      trackLeadCapture('newsletter', email, { destination: destinationName || 'global' });
    } catch (err) {
      console.error('Error saving newsletter lead:', err);
      // Offline draft only — never treat as inscrição confirmada
      if (typeof window !== 'undefined') {
        try {
          const drafts = JSON.parse(localStorage.getItem('newsletter_drafts') || '[]');
          drafts.push({ ...leadData, draft: true });
          localStorage.setItem('newsletter_drafts', JSON.stringify(drafts));
        } catch {
          /* ignore storage errors */
        }
      }
      setError(
        err?.message === 'newsletter_not_configured'
          ? 'Inscrições temporariamente indisponíveis. Tente novamente mais tarde.'
          : 'Não foi possível confirmar sua inscrição. Verifique o e-mail e tente de novo.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex w-full flex-col items-center justify-between gap-6 overflow-hidden rounded-[32px] border border-brand-navy bg-brand-navy p-8 text-left text-white shadow-lg md:flex-row md:p-10">
      <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-brand-orange/10 blur-2xl" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-36 w-36 rounded-full bg-brand-green/5 blur-2xl" />

      <div className="relative z-10 max-w-xl flex-grow">
        <span className="w-fit rounded-full bg-brand-orange px-3.5 py-1 text-[9px] font-extrabold tracking-widest text-white">
          NEWSLETTER EXCLUSIVA
        </span>
        <h3 className="mb-2 mt-3 font-headers text-xl font-bold tracking-tight sm:text-2xl">
          Receba roteiros e guias inéditos no seu e-mail
        </h3>
        <p className="max-w-md text-xs leading-relaxed text-white/70">
          Inscreva-se para receber guias de destino e comparativos de custo. O planejamento do dia a dia fica no app.
        </p>
      </div>

      <div className="relative z-10 w-full min-w-[280px] md:w-auto sm:min-w-[360px]">
        {submitted ? (
          <div className="flex animate-fade-in items-center gap-2 rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur-xs">
            <CheckCircle className="h-5 w-5 shrink-0 text-brand-orange" />
            <div className="text-left">
              <p className="text-xs font-bold">Inscrição confirmada!</p>
              <p className="text-[10px] text-white/70">Prepare-se para planejar suas melhores rotas.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail"
                  className="w-full rounded-2xl border border-white/20 bg-white/5 py-3 pl-11 pr-4 text-xs text-white placeholder-white/40 transition-all focus:border-white focus:bg-white/10 focus:outline-none"
                  required
                  disabled={loading}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'newsletter-error' : undefined}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex min-h-11 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-2xl bg-brand-orange px-5 py-3 text-xs font-bold text-white shadow-md shadow-brand-orange/15 transition-all hover:scale-[1.02] hover:bg-brand-orange/90 active:scale-95 disabled:opacity-60"
              >
                <span>{loading ? '...' : 'Enviar'}</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
            {error ? (
              <p
                id="newsletter-error"
                role="alert"
                className="flex items-start gap-1.5 text-[11px] font-semibold leading-snug text-[#FFD0B5]"
              >
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {error}
              </p>
            ) : null}
          </form>
        )}
      </div>
    </div>
  );
}

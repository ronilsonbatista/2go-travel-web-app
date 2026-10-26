"use client";

import React, { useState } from 'react';
import { Download, CheckCircle, FileText, Lock, AlertCircle } from 'lucide-react';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { trackLeadCapture, trackDownloadPDF } from '@/lib/analytics';
import confetti from 'canvas-confetti';

export default function LeadMagnetBox({ destinationName = 'Paris', destinationSlug = 'paris' }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const leadData = {
      name,
      email,
      phone,
      destination: destinationName,
      type: `pdf_guide_${destinationSlug}`,
      created_at: new Date().toISOString()
    };

    try {
      if (!isSupabaseConfigured || !supabase) {
        throw new Error('lead_not_configured');
      }

      const { error: insertError } = await supabase.from('leads').insert([leadData]);
      if (insertError) throw insertError;

      setDownloaded(true);
      trackLeadCapture('pdf_guide', email, { destination: destinationName });
      trackDownloadPDF(destinationName, 'guide');
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch (err) {
      console.error('Error saving lead magnet:', err);
      if (typeof window !== 'undefined') {
        try {
          const drafts = JSON.parse(localStorage.getItem('magnet_drafts') || '[]');
          drafts.push({ ...leadData, draft: true });
          localStorage.setItem('magnet_drafts', JSON.stringify(drafts));
        } catch {
          /* ignore */
        }
      }
      setError(
        err?.message === 'lead_not_configured'
          ? 'Download temporariamente indisponível. Tente novamente mais tarde.'
          : 'Não foi possível liberar o guia. Verifique os dados e tente de novo.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-between gap-8 rounded-[28px] border border-border-gray bg-white p-6 text-left shadow-sm sm:p-8 md:flex-row">
      <div className="flex w-full max-w-md flex-grow items-center gap-4">
        <div className="relative flex h-20 w-16 shrink-0 flex-col items-center justify-center rounded-xl border border-brand-orange/20 bg-brand-orange/10 text-brand-orange shadow-inner">
          <FileText className="h-8 w-8" />
          <span className="absolute bottom-2 text-[7.5px] font-extrabold tracking-wider">PDF</span>
        </div>
        <div className="flex flex-col gap-1.5 text-left">
          <span className="w-fit rounded-full bg-brand-orange/10 px-2.5 py-1 text-[8px] font-extrabold tracking-widest text-brand-orange">
            MATERIAL COMPLEMENTAR
          </span>
          <h3 className="font-headers text-base font-bold leading-tight text-brand-navy sm:text-lg">
            Baixar Guia Oficial PDF de {destinationName}
          </h3>
          <p className="text-xs leading-relaxed text-text-muted">
            Consulte offline: dicas de hotéis, culinária secreta, regras de segurança e contatos locais importantes em um e-book completo.
          </p>
        </div>
      </div>

      <div className="w-full shrink-0 md:max-w-xs">
        {downloaded ? (
          <div className="flex animate-fade-in flex-col items-center gap-3 rounded-2xl border border-brand-green/20 bg-brand-green/5 p-4 text-center">
            <CheckCircle className="h-8 w-8 text-brand-green" />
            <div>
              <p className="text-xs font-bold text-brand-navy">Guia Liberado com sucesso!</p>
              <p className="mt-0.5 text-[10px] text-text-muted">Clique no botão abaixo para salvar o e-book.</p>
            </div>
            <a
              href={`/assets/guide-placeholder.pdf`}
              download={`Guia_2GO_${destinationSlug}.pdf`}
              className="btn btn-primary flex w-full cursor-pointer items-center justify-center gap-1.5 py-2 text-[11px] font-bold shadow-sm"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Baixar Guia PDF</span>
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="w-full rounded-xl border border-border-gray bg-bg-light px-4 py-2 text-xs text-brand-navy transition-all focus:border-brand-navy focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-navy/15"
                required
                disabled={loading}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu e-mail"
                className="w-full rounded-xl border border-border-gray bg-bg-light px-4 py-2 text-xs text-brand-navy transition-all focus:border-brand-navy focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-navy/15"
                required
                disabled={loading}
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="WhatsApp (ex: 11999999999)"
                className="w-full rounded-xl border border-border-gray bg-bg-light px-4 py-2 text-xs text-brand-navy transition-all focus:border-brand-navy focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-navy/15"
                required
                disabled={loading}
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
              className="btn btn-primary flex w-full min-h-11 cursor-pointer items-center justify-center gap-1.5 py-2.5 text-xs font-bold shadow-md shadow-brand-navy/10 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-60"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>{loading ? 'Processando...' : 'Liberar Guia Grátis'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

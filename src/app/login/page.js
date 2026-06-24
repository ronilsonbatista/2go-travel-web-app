"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ShieldCheck, ArrowRight, MessageSquare, Compass } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppDownloadModal from '@/components/AppDownloadModal';
import { trackPageView, trackEvent } from '@/lib/analytics';

export default function Login() {
  const router = useRouter();
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  
  // Form states
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: OTP Code
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    trackPageView('login');
    // If already logged in, redirect straight to profile
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user_session');
      if (user) {
        router.push('/viajantes/perfil');
      }
    }
  }, [router]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMsg('');

    // Simulate sending OTP
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      trackEvent('login_otp_sent', { email });
    }, 1000);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otpCode !== '123456' && otpCode !== '1234') {
      setErrorMsg('Código incorreto! Use o código padrão: 123456');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    // Simulate verification success
    setTimeout(() => {
      setLoading(false);
      if (typeof window !== 'undefined') {
        const username = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
        const mockUser = {
          name: fullName || 'Viajante 2GO',
          email: email,
          username: username || 'viajante',
          countriesVisited: 3,
          created_at: new Date().toISOString()
        };
        localStorage.setItem('user_session', JSON.stringify(mockUser));
        
        // Setup initial default stats if empty
        const stats = localStorage.getItem('admin_stats');
        if (!stats) {
          localStorage.setItem('admin_stats', JSON.stringify({ clicks: 4, revenue: 97, conversions: 1 }));
        }

        // Setup some default favorites if not present
        if (!localStorage.getItem('fav_destinations')) {
          localStorage.setItem('fav_destinations', JSON.stringify(['paris', 'lisboa']));
        }
        if (!localStorage.getItem('fav_itineraries')) {
          localStorage.setItem('fav_itineraries', JSON.stringify(['paris-5-dias']));
        }

        trackEvent('login_success', { email, username });
        router.push('/viajantes/perfil');
      }
    }, 1000);
  };

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow flex items-center justify-center pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-md">
          
          <div className="bg-white border border-border-gray p-8 sm:p-10 rounded-[32px] shadow-lg text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl pointer-events-none"></div>
            
            <div className="text-center mb-8">
              <span className="bg-brand-navy/5 text-brand-navy text-[9px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit mx-auto uppercase">
                Área do Viajante
              </span>
              <h1 className="font-headers text-2.5xl font-black text-brand-navy mt-4 mb-2">
                Acesse seus Roteiros
              </h1>
              <p className="text-xs text-text-muted leading-relaxed max-w-[280px] mx-auto">
                Sincronize seus favoritos, acesse guias e gerencie suas consultorias VIP em um só lugar.
              </p>
            </div>

            {errorMsg && (
              <div className="bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs p-3.5 rounded-xl mb-4 font-semibold">
                {errorMsg}
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold font-headers uppercase tracking-wider text-brand-navy">Seu Nome</label>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Como prefere ser chamado" 
                    required 
                    className="w-full px-4 py-2.5 rounded-xl border border-border-gray bg-bg-light text-brand-navy focus:outline-none focus:border-brand-navy text-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold font-headers uppercase tracking-wider text-brand-navy">E-mail</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@e-mail.com" 
                      required 
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-gray bg-bg-light text-brand-navy focus:outline-none focus:border-brand-navy text-xs"
                    />
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn btn-primary w-full py-3.5 justify-center flex items-center gap-2 cursor-pointer mt-2 hover:scale-[1.01] active:scale-95 transition-all text-xs font-bold"
                >
                  <span>{loading ? 'Enviando código...' : 'Solicitar Código de Acesso'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
                <div className="bg-bg-light p-4 rounded-xl border border-border-gray/50 flex flex-col gap-1 text-left mb-2">
                  <span className="text-[9px] text-text-muted font-bold tracking-wider uppercase">CÓDIGO DE TESTE</span>
                  <p className="text-[10px] text-brand-navy leading-normal">
                    Enviamos um código de acesso de 6 dígitos simulado para o e-mail: <strong>{email}</strong>. Use o código: <strong className="text-brand-orange">123456</strong> para logar.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-bold font-headers uppercase tracking-wider text-brand-navy">Código de Acesso</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="Ex: 123456" 
                      maxLength={6}
                      required 
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border-gray bg-bg-light text-brand-navy focus:outline-none focus:border-brand-navy text-xs font-mono tracking-widest"
                    />
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] px-1">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)} 
                    className="text-text-muted hover:text-brand-navy font-bold cursor-pointer"
                  >
                    Alterar e-mail
                  </button>
                  <button 
                    type="button" 
                    onClick={handleEmailSubmit} 
                    className="text-brand-orange hover:text-brand-orange/85 font-bold cursor-pointer"
                  >
                    Reenviar código
                  </button>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn btn-primary w-full py-3.5 justify-center flex items-center gap-2 cursor-pointer mt-2 hover:scale-[1.01] active:scale-95 transition-all text-xs font-bold"
                >
                  <span>{loading ? 'Verificando...' : 'Entrar na Conta'}</span>
                  <ShieldCheck className="w-4 h-4" />
                </button>
              </form>
            )}

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

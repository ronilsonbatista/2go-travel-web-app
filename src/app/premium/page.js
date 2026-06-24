"use client";

import React, { useState, useEffect } from 'react';
import { Shield, Award, Clock, Star, Check, ArrowRight, CreditCard, QrCode, ClipboardCheck, Sparkles, X, Smartphone, MessageSquare } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppDownloadModal from '@/components/AppDownloadModal';
import { trackPageView, trackPremiumSelect, trackPremiumCheckout } from '@/lib/analytics';
import confetti from 'canvas-confetti';

const plans = [
  {
    id: 'essencial',
    name: 'Essencial',
    price: 'R$ 97',
    period: 'por roteiro',
    desc: 'O upgrade ideal para quem quer validar suas ideias com um especialista.',
    features: [
      'Roteiro gerado por algoritmo 2GO',
      '1 revisão completa de 15 min via chat com especialista',
      'Ajustes de rotas sugeridas',
      'Acesso offline no app 2GO'
    ],
    cta: 'Escolher Essencial',
    popular: false
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 'R$ 297',
    period: 'por roteiro',
    desc: 'Curadoria autoral completa de um especialista local no seu destino.',
    features: [
      'Tudo do plano Essencial',
      'Curadoria 100% autoral e sob medida',
      'Reservas de hotéis, voos e transfers integrados',
      'Roteiro detalhado dia a dia no app',
      'Indicação de restaurantes secretos'
    ],
    cta: 'Escolher Premium',
    popular: true
  },
  {
    id: 'concierge',
    name: 'Concierge VIP',
    price: 'R$ 897',
    period: 'por roteiro',
    desc: 'O serviço definitivo com assistência 24h durante toda a sua viagem.',
    features: [
      'Tudo do plano Premium',
      'Suporte Concierge via WhatsApp 24/7 na viagem',
      'Reservas de restaurantes exclusivos',
      'Alterações de rotas ilimitadas e em tempo real',
      'Apoio em emergências e conexões perdidas'
    ],
    cta: 'Escolher Concierge VIP',
    popular: false
  }
];

export default function Premium() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null); // plan object when modal is open
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('pix'); // 'pix' | 'card'
  
  // Checkout Form inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  
  // States
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(600); // 10 minutes in seconds
  const [copiedPix, setCopiedPix] = useState(false);

  useEffect(() => {
    trackPageView('premium');
  }, []);

  // Pix Countdown Timer
  useEffect(() => {
    let timer;
    if (checkoutOpen && paymentMethod === 'pix' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [checkoutOpen, paymentMethod, countdown]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setCheckoutOpen(true);
    setSuccess(false);
    setCountdown(600);
    trackPremiumSelect(plan.name);
  };

  const handleCopyPix = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText('00020101021226850014br.gov.bcb.pix2563pix.2go.com.br/checkout/premium/payment/918391839281392813982');
      setCopiedPix(true);
      setTimeout(() => setCopiedPix(false), 2000);
    }
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate Payment Processing
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Fire celebration confetti
      confetti({
        particleCount: 180,
        spread: 90,
        origin: { y: 0.5 }
      });

      trackPremiumCheckout(selectedPlan.name, paymentMethod, 'success');

      // Record lead in Supabase/Local Leads
      const leadData = {
        name: fullName,
        email: email,
        phone: whatsapp,
        destination: 'Premium Purchase',
        budget: selectedPlan.name,
        type: 'premium_purchase',
        created_at: new Date().toISOString()
      };

      try {
        // Record sale conversion in admin stats
        const stats = JSON.parse(localStorage.getItem('admin_stats') || '{"clicks":0,"revenue":0,"conversions":0}');
        stats.conversions += 1;
        const planPriceNum = parseInt(selectedPlan.price.replace('R$ ', ''), 10);
        stats.revenue += planPriceNum;
        localStorage.setItem('admin_stats', JSON.stringify(stats));

        // Add to local premium leads
        const localLeads = JSON.parse(localStorage.getItem('premium_leads') || '[]');
        localLeads.push(leadData);
        localStorage.setItem('premium_leads', JSON.stringify(localLeads));
      } catch (err) {
        console.error('Error saving local admin stats:', err);
      }
    }, 1500);
  };

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-32 pb-20">
        
        {/* Premium Consulting Hero */}
        <section className="container mx-auto px-6 text-center max-w-4xl relative overflow-hidden mb-12">
          <div className="absolute top-10 left-10 w-44 h-44 bg-brand-orange/5 rounded-full blur-[60px] pointer-events-none select-none"></div>
          <div className="absolute bottom-10 right-10 w-44 h-44 bg-brand-green/5 rounded-full blur-[60px] pointer-events-none select-none"></div>

          <span className="bg-brand-orange text-white text-[9px] font-extrabold tracking-widest px-4 py-1.5 rounded-full w-fit mx-auto uppercase">
            Consultoria e Roteiros Premium
          </span>
          <h1 className="font-headers text-3.5xl sm:text-5xl md:text-6xl font-extrabold text-brand-navy mt-6 mb-6 leading-tight tracking-tight">
            Viaje sem estresse. Planejado por especialistas locais.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-text-muted max-w-[720px] mx-auto leading-relaxed">
            Escolha o nível de curadoria ideal para a sua jornada. Unimos inteligência em rotas com o olhar sensível de curadores reais para que você aproveite o melhor de cada destino.
          </p>
        </section>

        {/* Pricing comparison section */}
        <section className="container mx-auto px-6 max-w-5xl mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between p-8 rounded-[32px] bg-white border transition-all duration-300 ${
                  plan.popular
                    ? 'border-brand-orange shadow-md scale-102 ring-4 ring-brand-orange/5'
                    : 'border-border-gray shadow-xs hover:border-brand-navy/30'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-orange text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-xs">
                    Mais Recomendado ⭐
                  </span>
                )}

                <div className="text-left">
                  <h3 className="font-headers text-lg font-bold text-brand-navy">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="font-headers text-3xl sm:text-4xl font-extrabold text-brand-navy">{plan.price}</span>
                    <span className="text-xs text-text-muted">{plan.period}</span>
                  </div>
                  <p className="text-xs text-text-muted mt-3 leading-relaxed border-b border-border-gray/50 pb-5">
                    {plan.desc}
                  </p>

                  <ul className="flex flex-col gap-3.5 mt-6 text-left">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex gap-2.5 items-start text-xs text-brand-navy">
                        <Check className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handlePlanSelect(plan)}
                  className={`btn w-full justify-center mt-8 py-3 text-xs font-bold transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                    plan.popular
                      ? 'btn-primary bg-brand-orange text-white shadow-sm'
                      : 'btn-outline border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Brand values / How it works */}
        <section className="bg-white border-y border-border-gray py-16">
          <div className="container mx-auto px-6 max-w-5xl text-left">
            <h3 className="font-headers text-xl sm:text-2xl font-bold text-brand-navy mb-8 text-center">
              Como Funciona a sua Consultoria VIP
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0 font-headers font-bold text-sm">
                  01
                </div>
                <div>
                  <h4 className="font-headers font-bold text-brand-navy text-sm">Alinhamento de Roteiro</h4>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    Você escolhe seu plano e preenche suas preferências. Nosso especialista entra em contato imediato para validar seus interesses.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 font-headers font-bold text-sm">
                  02
                </div>
                <div>
                  <h4 className="font-headers font-bold text-brand-navy text-sm">Reservas Inteligentes</h4>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    Nossa equipe cuida dos agendamentos de hotéis parceiros, bilhetes de trem e transfers com tarifas exclusivas de afiliados.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center shrink-0 font-headers font-bold text-sm">
                  03
                </div>
                <div>
                  <h4 className="font-headers font-bold text-brand-navy text-sm">Embarque com Suporte</h4>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    Tudo é sincronizado no seu app 2GO para uso offline. Nos planos superiores, você conta com suporte via WhatsApp para imprevistos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer onOpenDownload={() => setIsDownloadOpen(true)} />
      
      <AppDownloadModal 
        isOpen={isDownloadOpen} 
        onClose={() => setIsDownloadOpen(false)} 
      />

      {/* Slide-over Checkout Drawer / Modal */}
      {checkoutOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <div 
            onClick={() => setCheckoutOpen(false)}
            className="absolute inset-0 bg-brand-navy/60 backdrop-blur-xs transition-opacity duration-300"
          />

          {/* Drawer container */}
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10 animate-slide-in-right">
            
            {/* Header */}
            <div className="p-6 border-b border-border-gray flex items-center justify-between text-left">
              <div>
                <span className="text-[8px] font-extrabold text-brand-orange uppercase tracking-wider">
                  Checkout Seguro 2GO
                </span>
                <h3 className="font-headers font-bold text-brand-navy text-base mt-1">
                  Assinatura: Plano {selectedPlan?.name}
                </h3>
              </div>
              <button 
                onClick={() => setCheckoutOpen(false)}
                className="w-8 h-8 rounded-full border border-border-gray flex items-center justify-center text-text-muted hover:text-brand-navy hover:bg-bg-light transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-grow p-6 text-left">
              {success ? (
                <div className="py-12 flex flex-col items-center justify-center text-center gap-4 animate-fade-in-up">
                  <div className="w-16 h-16 bg-brand-green text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-md shadow-brand-green/20">✓</div>
                  <h3 className="font-headers text-2.5xl font-black text-brand-navy">Pagamento Confirmado!</h3>
                  <p className="text-xs text-text-muted max-w-[340px] leading-relaxed">
                    Parabéns! Sua curadoria exclusiva para o plano <strong>{selectedPlan?.name}</strong> foi ativada. Um especialista local entrará em contato via WhatsApp no número informado nas próximas 2 horas. ✈️
                  </p>
                  
                  <div className="bg-bg-light border border-border-gray p-4 rounded-xl flex items-center gap-3 max-w-sm mt-4">
                    <Smartphone className="w-5 h-5 text-brand-navy shrink-0" />
                    <p className="text-[10px] text-brand-navy leading-normal text-left">
                      <strong>Lembrete:</strong> Baixe o app 2GO para iOS ou Android e faça login com seu e-mail para visualizar seu roteiro assim que finalizado.
                    </p>
                  </div>

                  <button 
                    onClick={() => setCheckoutOpen(false)}
                    className="btn btn-primary mt-6 py-2.5 px-6 text-xs cursor-pointer"
                  >
                    Fechar Checkout
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCheckoutSubmit} className="flex flex-col gap-5">
                  
                  {/* Selected Plan Summary Card */}
                  <div className="bg-bg-light border border-border-gray p-4 rounded-2xl flex justify-between items-center">
                    <div>
                      <h4 className="font-headers font-bold text-xs text-brand-navy">{selectedPlan?.name}</h4>
                      <p className="text-[10px] text-text-muted leading-normal mt-0.5 max-w-[240px]">{selectedPlan?.desc}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-headers text-base font-extrabold text-brand-navy">{selectedPlan?.price}</span>
                      <span className="text-[9px] text-text-muted block">Taxa única</span>
                    </div>
                  </div>

                  {/* Customer Information Section */}
                  <div className="flex flex-col gap-3">
                    <h4 className="font-headers text-xs font-bold text-brand-navy border-b border-border-gray/50 pb-1">1. Dados do Viajante</h4>
                    
                    <div className="flex flex-col gap-1">
                      <label className="text-[9px] font-bold uppercase tracking-wider text-text-muted">Nome Completo</label>
                      <input 
                        type="text" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Nome como no passaporte" 
                        required 
                        className="w-full px-3.5 py-2 rounded-xl border border-border-gray bg-bg-light/45 text-brand-navy focus:outline-none focus:border-brand-navy text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-text-muted">E-mail</label>
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seu@e-mail.com" 
                          required 
                          className="w-full px-3.5 py-2 rounded-xl border border-border-gray bg-bg-light/45 text-brand-navy focus:outline-none focus:border-brand-navy text-xs"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-text-muted">WhatsApp / Celular</label>
                        <input 
                          type="tel" 
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="(11) 99999-9999" 
                          required 
                          className="w-full px-3.5 py-2 rounded-xl border border-border-gray bg-bg-light/45 text-brand-navy focus:outline-none focus:border-brand-navy text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="flex flex-col gap-3">
                    <h4 className="font-headers text-xs font-bold text-brand-navy border-b border-border-gray/50 pb-1">2. Forma de Pagamento</h4>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('pix')}
                        className={`p-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                          paymentMethod === 'pix'
                            ? 'border-brand-navy bg-brand-navy/5 text-brand-navy font-bold shadow-xs'
                            : 'border-border-gray text-text-muted hover:bg-bg-light'
                        }`}
                      >
                        <QrCode className="w-4 h-4" />
                        <span className="text-xs">Pagar via Pix</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3 rounded-xl border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                          paymentMethod === 'card'
                            ? 'border-brand-navy bg-brand-navy/5 text-brand-navy font-bold shadow-xs'
                            : 'border-border-gray text-text-muted hover:bg-bg-light'
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                        <span className="text-xs">Cartão de Crédito</span>
                      </button>
                    </div>
                  </div>

                  {/* Payment Details Container */}
                  <div className="p-4 border border-border-gray/80 rounded-2xl bg-bg-light/20 min-h-[160px] flex flex-col justify-center">
                    
                    {paymentMethod === 'pix' ? (
                      <div className="flex flex-col items-center text-center gap-3 animate-fade-in">
                        <div className="w-32 h-32 border border-border-gray rounded-xl bg-white p-2.5 flex items-center justify-center">
                          {/* Simulated QR Code SVG */}
                          <svg viewBox="0 0 100 100" className="w-full h-full text-brand-navy">
                            <rect width="100" height="100" fill="white" />
                            <rect x="5" y="5" width="20" height="20" fill="currentColor" />
                            <rect x="10" y="10" width="10" height="10" fill="white" />
                            <rect x="75" y="5" width="20" height="20" fill="currentColor" />
                            <rect x="80" y="10" width="10" height="10" fill="white" />
                            <rect x="5" y="75" width="20" height="20" fill="currentColor" />
                            <rect x="10" y="80" width="10" height="10" fill="white" />
                            {/* Random dots to look like a QR code */}
                            <rect x="35" y="15" width="8" height="8" fill="currentColor" />
                            <rect x="50" y="30" width="12" height="6" fill="currentColor" />
                            <rect x="40" y="50" width="6" height="12" fill="currentColor" />
                            <rect x="65" y="65" width="15" height="15" fill="currentColor" />
                            <rect x="70" y="70" width="5" height="5" fill="white" />
                            <rect x="30" y="75" width="10" height="8" fill="currentColor" />
                          </svg>
                        </div>
                        
                        <div className="flex flex-col items-center gap-1.5 w-full">
                          <p className="text-[10px] text-text-muted">Expira em: <strong className="text-brand-orange font-mono">{formatTime(countdown)}</strong></p>
                          <button
                            type="button"
                            onClick={handleCopyPix}
                            className="btn btn-outline btn-xs flex items-center gap-1 px-4 py-1.5 justify-center rounded-lg border-brand-navy/35 text-brand-navy"
                          >
                            <ClipboardCheck className="w-3 h-3 text-brand-orange" />
                            <span className="text-[10px] font-bold">{copiedPix ? 'Copiado!' : 'Copiar Pix Copia e Cola'}</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-3 animate-fade-in">
                        <div className="flex flex-col gap-1">
                          <label className="text-[8.5px] font-bold uppercase tracking-wider text-text-muted">Número do Cartão</label>
                          <div className="relative">
                            <input 
                              type="text" 
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              placeholder="4000 1234 5678 9010" 
                              maxLength={19}
                              required={paymentMethod === 'card'} 
                              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-border-gray bg-white text-brand-navy focus:outline-none focus:border-brand-navy text-xs"
                            />
                            <CreditCard className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[8.5px] font-bold uppercase tracking-wider text-text-muted">Nome Impresso no Cartão</label>
                          <input 
                            type="text" 
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            placeholder="Ex: RONILSON BATISTA" 
                            required={paymentMethod === 'card'} 
                            className="w-full px-3.5 py-2 rounded-xl border border-border-gray bg-white text-brand-navy focus:outline-none focus:border-brand-navy text-xs uppercase"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1">
                            <label className="text-[8.5px] font-bold uppercase tracking-wider text-text-muted">Validade</label>
                            <input 
                              type="text" 
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="MM/AA" 
                              maxLength={5}
                              required={paymentMethod === 'card'} 
                              className="w-full px-3.5 py-2 rounded-xl border border-border-gray bg-white text-brand-navy focus:outline-none focus:border-brand-navy text-xs"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[8.5px] font-bold uppercase tracking-wider text-text-muted">Código CVV</label>
                            <input 
                              type="text" 
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              placeholder="123" 
                              maxLength={4}
                              required={paymentMethod === 'card'} 
                              className="w-full px-3.5 py-2 rounded-xl border border-border-gray bg-white text-brand-navy focus:outline-none focus:border-brand-navy text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full py-3.5 justify-center flex items-center gap-2 cursor-pointer shadow-md shadow-brand-navy/15 hover:scale-[1.01] active:scale-95 transition-all text-xs font-bold"
                  >
                    <span>{loading ? 'Processando transação...' : `Confirmar e Pagar ${selectedPlan?.price}`}</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>

                  <p className="text-[9px] text-text-muted leading-relaxed text-center px-4">
                    Ao confirmar o pagamento, você concorda com nossos termos de cancelamento e curadoria de serviços. Seus dados estão criptografados e protegidos por conexões seguras SSL.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { DollarSign, ShieldAlert, Sparkles, Plus, Minus, Hotel, Utensils, Compass, Train } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import AppDownloadModal from './AppDownloadModal';

export default function CostClient({ destination }) {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [profile, setProfile] = useState('comfort'); // 'economy' | 'comfort' | 'luxury'
  const [days, setDays] = useState(5);

  if (!destination) return null;

  const cost = destination.costs[profile];
  const totalDaily = cost.daily;
  const totalTrip = totalDaily * days;

  const handleDaysChange = (amount) => {
    const newDays = days + amount;
    if (newDays >= 1 && newDays <= 30) {
      setDays(newDays);
    }
  };

  const getProfileTitle = () => {
    if (profile === 'economy') return 'Mochileiro 🎒';
    if (profile === 'comfort') return 'Conforto 🧳';
    return 'Alto Luxo 👑';
  };

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl text-left">
          
          <Breadcrumbs items={[
            { name: 'Quanto Custa Viajar', url: '/quanto-custa' },
            { name: destination.name, url: `/quanto-custa/${destination.slug}` }
          ]} />

          {/* Header */}
          <header className="my-8">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3 py-1.5 rounded-full w-fit">
              CALCULADORA DE ORÇAMENTO
            </span>
            <h1 className="font-headers text-3.5xl sm:text-5xl font-extrabold text-brand-navy mt-4 mb-4 tracking-tight">
              Quanto custa viajar para {destination.name}?
            </h1>
            <p className="text-sm text-text-muted leading-relaxed max-w-2xl">
              Calcule seu orçamento de viagem personalizado para {destination.name}. Ajuste os dias e selecione seu nível de conforto para estimar seus custos.
            </p>
          </header>

          {/* Calculator Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-8">
            
            {/* Left Side: Parameters & Selectors */}
            <div className="lg:col-span-5 bg-white border border-border-gray p-6 rounded-[24px] shadow-sm flex flex-col justify-between text-left">
              <div className="flex flex-col gap-6">
                
                {/* 1. Profile Selectors */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-brand-navy uppercase tracking-wider">Estilo de Viagem</span>
                  <div className="flex flex-col gap-2.5">
                    {[
                      { id: 'economy', label: 'Mochileiro 🎒', desc: 'Hostels e refeições baratas' },
                      { id: 'comfort', label: 'Conforto 🧳', desc: 'Hotéis 3/4★ e bons bistrôs' },
                      { id: 'luxury', label: 'Alto Luxo 👑', desc: 'Hotéis 5★ e restaurantes estrelados' }
                    ].map(item => (
                      <button
                        key={item.id}
                        onClick={() => setProfile(item.id)}
                        className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex flex-col gap-0.5 ${
                          profile === item.id 
                            ? 'bg-brand-navy/5 border-brand-navy font-bold text-brand-navy' 
                            : 'bg-white border-border-gray hover:bg-bg-light text-text-muted'
                        }`}
                      >
                        <span className="text-xs font-bold leading-none">{item.label}</span>
                        <span className="text-[9px] font-normal text-text-muted mt-1">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Days Selector */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-brand-navy uppercase tracking-wider">Duração da Viagem</span>
                  <div className="flex items-center gap-4 bg-bg-light border border-border-gray p-2 rounded-xl justify-between w-full">
                    <button 
                      onClick={() => handleDaysChange(-1)} 
                      disabled={days <= 1}
                      className="w-10 h-10 rounded-lg bg-white border border-border-gray text-brand-navy flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-headers font-extrabold text-base text-brand-navy">
                      {days} {days === 1 ? 'Dia' : 'Dias'}
                    </span>
                    <button 
                      onClick={() => handleDaysChange(1)} 
                      disabled={days >= 30}
                      className="w-10 h-10 rounded-lg bg-white border border-border-gray text-brand-navy flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Start Planner CTA */}
              <div className="mt-8">
                <Link 
                  href={`/planejamento/${destination.slug}`}
                  className="btn btn-secondary w-full py-3.5 flex items-center justify-center gap-2 cursor-pointer font-bold text-xs shadow-md shadow-brand-orange/20"
                >
                  Gerar Roteiro Deste Perfil <Sparkles className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Side: Cost Breakdown Display */}
            <div className="lg:col-span-7 bg-[#081B6B]/05 border border-brand-navy/10 rounded-[28px] p-6 flex flex-col justify-between">
              
              {/* Calculations Result */}
              <div>
                <div className="flex justify-between items-start border-b border-brand-navy/10 pb-4 mb-6">
                  <div className="text-left">
                    <span className="text-[9px] font-extrabold text-brand-orange uppercase tracking-wider">ESTIMATIVA TOTAL ({days} dias)</span>
                    <h3 className="font-headers text-3xl font-extrabold text-brand-navy mt-1">
                      {destination.currency.replace(/\([^)]*\)/, '').trim()} {totalTrip.toLocaleString('pt-BR')}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">DIÁRIO ({getProfileTitle().split(' ')[0]})</span>
                    <h4 className="font-headers text-sm font-bold text-brand-green mt-1">
                      {destination.currency.replace(/\([^)]*\)/, '').trim()} {totalDaily} / dia
                    </h4>
                  </div>
                </div>

                {/* Cost Breakdown Rows */}
                <div className="flex flex-col gap-4">
                  {[
                    { label: 'Hospedagem (Por pessoa em quarto duplo)', cost: cost.hotel, icon: <Hotel className="w-4.5 h-4.5" />, desc: 'Hotéis curados pela 2GO' },
                    { label: 'Alimentação (Refeições & lanches diários)', cost: cost.meal, icon: <Utensils className="w-4.5 h-4.5" />, desc: 'Bistrôs e cafés recomendados' },
                    { label: 'Passeios & Ingressos (Atrações por dia)', cost: cost.ticket, icon: <Compass className="w-4.5 h-4.5" />, desc: 'Ingressos oficiais de atrações' },
                    { label: 'Transporte Local (Metrô/táxi interno)', cost: cost.transport, icon: <Train className="w-4.5 h-4.5" />, desc: 'Média de deslocamentos diários' }
                  ].map((item, idx) => (
                    <div 
                      key={idx}
                      className="bg-white border border-border-gray p-4 rounded-xl flex items-center justify-between text-left shadow-sm"
                    >
                      <div className="flex gap-3.5 items-center">
                        <div className="w-9 h-9 rounded-lg bg-bg-light border border-border-gray text-brand-navy flex items-center justify-center shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-headers text-xs font-bold text-brand-navy leading-none">{item.label}</h4>
                          <span className="text-[9px] text-text-muted mt-1 block">{item.desc}</span>
                        </div>
                      </div>
                      <span className="font-headers text-sm font-bold text-brand-navy shrink-0">
                        {destination.currency.replace(/\([^)]*\)/, '').trim()} {item.cost}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversion hook warning */}
              <div className="bg-white border border-border-gray p-4 rounded-xl flex gap-3 text-left mt-6 shadow-sm">
                <ShieldAlert className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <p className="text-[10px] text-text-muted leading-relaxed">
                  * **NOTA**: Estas estimativas são baseadas na média de custos locais de {destination.name}. No aplicativo 2GO, você poderá cadastrar suas despesas reais na moeda local e obter conversão de câmbio automática offline.
                </p>
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

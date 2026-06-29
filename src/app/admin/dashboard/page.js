"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { TrendingUp, DollarSign, Users, Award, MousePointer, Download, RotateCcw, ShieldAlert, FileText, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppDownloadModal from '@/components/AppDownloadModal';
import { trackPageView, trackEvent } from '@/lib/analytics';

export default function AdminDashboard() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [stats, setStats] = useState({
    clicks: 14,
    revenue: 394,
    conversions: 2
  });
  const [leadCount, setLeadCount] = useState(0);
  const [downloadCount, setDownloadCount] = useState(0);
  const [emailLogs, setEmailLogs] = useState([]);
  const [conversionFeed, setConversionFeed] = useState([]);

  useEffect(() => {
    trackPageView('admin_dashboard');
    loadStats();
  }, []);

  function loadStats() {
    if (typeof window !== 'undefined') {
      // 1. Load simulated stats
      const localStats = JSON.parse(localStorage.getItem('admin_stats') || '{"clicks":14,"revenue":394,"conversions":2}');
      setStats(localStats);

      // 2. Count actual leads in localStorage
      const newsletters = JSON.parse(localStorage.getItem('newsletter_leads') || '[]');
      const premiums = JSON.parse(localStorage.getItem('premium_leads') || '[]');
      const totalLeads = newsletters.length + premiums.length + 8; // base mock + actuals
      setLeadCount(totalLeads);

      // 2b. Count downloads and load email logs
      const downloads = newsletters.filter(l => l.type === 'download_hub');
      setDownloadCount(downloads.length + 5); // base mock + actuals

      const logs = JSON.parse(localStorage.getItem('email_automation_logs') || '[]');
      setEmailLogs(logs);

      // 3. Create simulated live feed
      const feed = [
        { time: 'Há 2 min', type: 'Venda', desc: `Assinatura de R$ 297 (Plano Premium) por um viajante` },
        { time: 'Há 12 min', type: 'Lead', desc: 'Inscrição de e-mail na newsletter de Paris' },
        { time: 'Há 35 min', type: 'Afiliado', desc: 'Clique em Hotel parceiro (Booking.com) (+R$ 12,50 comissão)' },
        { time: 'Há 1h', type: 'Download', desc: 'Download do aplicativo via escaneamento de QR Code' }
      ];

      // Add actual leads to feed if any exist
      premiums.slice(-2).reverse().forEach(lead => {
        feed.unshift({
          time: 'Recente',
          type: 'Venda',
          desc: `Nova consultoria VIP para ${lead.destination || 'Lisboa'} (Plano ${lead.budget || 'Premium'})`
        });
      });

      newsletters.slice(-2).reverse().forEach(lead => {
        feed.unshift({
          time: 'Recente',
          type: 'Lead',
          desc: `Inscrição na newsletter global: ${lead.email}`
        });
      });

      setConversionFeed(feed.slice(0, 5));
    }
  };

  const handleResetStats = () => {
    if (typeof window !== 'undefined') {
      const reset = { clicks: 0, revenue: 0, conversions: 0 };
      localStorage.setItem('admin_stats', JSON.stringify(reset));
      localStorage.setItem('newsletter_leads', '[]');
      localStorage.setItem('premium_leads', '[]');
      localStorage.setItem('email_automation_logs', '[]');
      setStats(reset);
      setLeadCount(0);
      setDownloadCount(0);
      setEmailLogs([]);
      setConversionFeed([
        { time: 'Agora', type: 'Sistema', desc: 'Métricas e bancos locais reiniciados com sucesso.' }
      ]);
      trackEvent('admin_dashboard_reset');
    }
  };

  // Safe percentage calculator
  const calcRate = (numerator, denominator) => {
    if (!denominator) return '0%';
    return `${((numerator / denominator) * 100).toFixed(1)}%`;
  };

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-5xl text-left">
          
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-border-gray/50 pb-5">
            <div>
              <span className="bg-brand-orange/10 text-brand-orange text-[9px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit">
                PAINEL OPERACIONAL
              </span>
              <h1 className="font-headers text-2.5xl sm:text-4xl font-black text-brand-navy mt-3">
                Dashboard de Receita 2GO
              </h1>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                Audite em tempo real a conversão de leads, cliques em afiliados de viagens, downloads e faturamento da consultoria VIP.
              </p>
            </div>

            <button
              onClick={handleResetStats}
              className="btn btn-outline border-brand-orange/20 text-brand-orange hover:bg-brand-orange/5 py-2 px-3 text-[10px] font-bold flex items-center justify-center gap-1.5 cursor-pointer self-start sm:self-center shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Resetar Métricas</span>
            </button>
          </div>

          {/* Key Metrics Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
            {/* Total Revenue card */}
            <div className="bg-white border border-border-gray p-6 rounded-2xl shadow-xs text-left relative overflow-hidden flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] text-text-muted font-bold tracking-wider uppercase">Receita Bruta</span>
                  <h3 className="font-headers text-2xl font-black text-brand-navy mt-1">
                    R$ {stats.revenue.toLocaleString('pt-BR')}
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0">
                  <DollarSign className="w-4.5 h-4.5" />
                </div>
              </div>
              <p className="text-[10px] text-brand-green font-bold mt-4">💰 Lucro bruto acumulado</p>
            </div>

            {/* Total Leads card */}
            <div className="bg-white border border-border-gray p-6 rounded-2xl shadow-xs text-left relative overflow-hidden flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] text-text-muted font-bold tracking-wider uppercase">Leads Capturados</span>
                  <h3 className="font-headers text-2xl font-black text-brand-navy mt-1">
                    {leadCount}
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-brand-orange/10 text-brand-orange flex items-center justify-center shrink-0">
                  <Users className="w-4.5 h-4.5" />
                </div>
              </div>
              <p className="text-[10px] text-brand-orange font-bold mt-4">📧 Inscrições de Leads</p>
            </div>

            {/* Downloads card */}
            <div className="bg-white border border-border-gray p-6 rounded-2xl shadow-xs text-left relative overflow-hidden flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] text-text-muted font-bold tracking-wider uppercase">Downloads Hub</span>
                  <h3 className="font-headers text-2xl font-black text-brand-navy mt-1">
                    {downloadCount}
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center shrink-0">
                  <Download className="w-4.5 h-4.5" />
                </div>
              </div>
              <p className="text-[10px] text-brand-navy font-bold mt-4">📋 E-books e Checklists</p>
            </div>

            {/* VIP Consultancies card */}
            <div className="bg-white border border-border-gray p-6 rounded-2xl shadow-xs text-left relative overflow-hidden flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] text-text-muted font-bold tracking-wider uppercase">Consultorias VIP</span>
                  <h3 className="font-headers text-2xl font-black text-brand-navy mt-1">
                    {stats.conversions}
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center shrink-0">
                  <Award className="w-4.5 h-4.5" />
                </div>
              </div>
              <p className="text-[10px] text-brand-navy font-bold mt-4">💎 Planos Vendidos</p>
            </div>

            {/* Affiliate clicks card */}
            <div className="bg-white border border-border-gray p-6 rounded-2xl shadow-xs text-left relative overflow-hidden flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] text-text-muted font-bold tracking-wider uppercase">Cliques Afiliados</span>
                  <h3 className="font-headers text-2xl font-black text-brand-navy mt-1">
                    {stats.clicks}
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0">
                  <MousePointer className="w-4.5 h-4.5" />
                </div>
              </div>
              <p className="text-[10px] text-brand-green font-bold mt-4">✈️ Hotéis e Passeios</p>
            </div>
          </div>

          {/* Conversion Funnel Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: SVG Funnel & Breakdown */}
            <div className="lg:col-span-7 bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] shadow-sm flex flex-col gap-6 text-left">
              <h3 className="font-headers text-base sm:text-lg font-bold text-brand-navy">
                Funil de Conversão CRO
              </h3>

              {/* SVG Graphic Funnel */}
              <div className="w-full bg-bg-light/20 border border-border-gray/50 rounded-2xl p-4 flex flex-col items-center">
                <svg viewBox="0 0 400 240" className="w-full max-w-sm text-brand-navy">
                  {/* Trapézio 1: Tráfego (Sessões) */}
                  <polygon points="50,20 350,20 310,70 90,70" fill="#081B6B" opacity="0.95" />
                  <text x="200" y="45" fill="white" fontStyle="normal" fontSize="10" fontWeight="bold" textAnchor="middle">1. Tráfego do Portal (100%)</text>
                  
                  {/* Trapézio 2: Leads (Conversão) */}
                  <polygon points="90,75 310,75 270,125 130,125" fill="#FF5A1F" opacity="0.95" />
                  <text x="200" y="100" fill="white" fontStyle="normal" fontSize="10" fontWeight="bold" textAnchor="middle">2. Cadastro de Leads ({calcRate(leadCount, leadCount + 200)})</text>
                  
                  {/* Trapézio 3: Roteiros / Cliques */}
                  <polygon points="130,130 270,130 240,180 160,180" fill="#0D9488" opacity="0.95" />
                  <text x="200" y="155" fill="white" fontStyle="normal" fontSize="10" fontWeight="bold" textAnchor="middle">3. Engajamento Afiliados ({calcRate(stats.clicks, leadCount + 50)})</text>
                  
                  {/* Trapézio 4: Clientes Premium */}
                  <polygon points="160,185 240,185 220,230 180,230" fill="#FACC15" opacity="0.95" />
                  <text x="200" y="210" fill="#081B6B" fontStyle="normal" fontSize="10" fontWeight="black" textAnchor="middle">4. Checkout VIP ({stats.conversions} Vendas)</text>
                </svg>
              </div>

              <div className="bg-brand-orange/5 border border-brand-orange/10 p-4 rounded-xl flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <p className="text-[11px] text-brand-navy leading-normal">
                  <strong>Simulação Ativa:</strong> Faça um pagamento fictício na página <Link href="/premium" className="font-bold underline text-brand-orange hover:text-brand-orange/80">Premium</Link> ou clique em ofertas afiliadas nas páginas de destinos para ver estas métricas subirem em tempo real.
                </p>
              </div>
            </div>

            {/* Right Column: Live Feed */}
            <div className="lg:col-span-5 bg-white border border-border-gray p-6 rounded-[24px] shadow-sm flex flex-col gap-5 text-left">
              <div className="flex justify-between items-center border-b border-border-gray/50 pb-2">
                <h4 className="font-headers font-bold text-brand-navy text-sm">Conversões Recentes</h4>
                <button
                  onClick={loadStats}
                  className="text-[10px] text-brand-orange font-bold hover:underline cursor-pointer"
                >
                  Atualizar Feed
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {conversionFeed.map((feed, idx) => (
                  <div key={idx} className="flex gap-3 items-start text-xs border-b border-border-gray/30 pb-3 last:border-0 last:pb-0">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-bold shrink-0 text-center uppercase ${
                      feed.type === 'Venda' 
                        ? 'bg-brand-green/10 text-brand-green' 
                        : feed.type === 'Lead'
                        ? 'bg-brand-orange/10 text-brand-orange'
                        : 'bg-brand-navy/10 text-brand-navy'
                    }`}>
                      {feed.type}
                    </span>
                    <div className="flex-grow">
                      <p className="text-brand-navy font-medium leading-normal">{feed.desc}</p>
                      <span className="text-[9px] text-text-muted block mt-0.5">{feed.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Email Automation Logs Row */}
          <div className="mt-8 bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] shadow-sm text-left">
            <div className="flex justify-between items-center border-b border-border-gray/50 pb-4 mb-4">
              <div>
                <h3 className="font-headers text-base sm:text-lg font-bold text-brand-navy">
                  Disparos Automáticos de E-mail (Mkt Automation)
                </h3>
                <p className="text-[10px] text-text-muted mt-0.5">
                  Simulação de réguas de relacionamento baseadas no comportamento do viajante.
                </p>
              </div>
              <span className="text-[10px] bg-brand-green/10 text-brand-green font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Simulador Ativo
              </span>
            </div>

            {emailLogs.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border-gray text-text-muted font-bold">
                      <th className="py-2.5 px-3">ID</th>
                      <th className="py-2.5 px-3">E-mail</th>
                      <th className="py-2.5 px-3">Gatilho</th>
                      <th className="py-2.5 px-3">Assunto</th>
                      <th className="py-2.5 px-3">Data/Hora</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emailLogs.map((log) => (
                      <tr key={log.id} className="border-b border-border-gray/30 hover:bg-bg-light/35 transition-colors">
                        <td className="py-3 px-3 font-mono text-[10px] text-text-muted">#{log.id}</td>
                        <td className="py-3 px-3 font-semibold text-brand-navy">{log.email}</td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-[6px] text-[9px] font-bold ${
                            log.trigger === 'welcome' 
                              ? 'bg-brand-navy/10 text-brand-navy' 
                              : log.trigger === 'lead_recovery'
                              ? 'bg-brand-orange/10 text-brand-orange'
                              : log.trigger === 'abandoned_itinerary'
                              ? 'bg-brand-orange/10 text-brand-orange'
                              : 'bg-brand-green/10 text-brand-green'
                          }`}>
                            {log.trigger.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-text-main font-medium">{log.subject}</td>
                        <td className="py-3 px-3 text-text-muted text-[10px]">
                          {new Date(log.timestamp).toLocaleString('pt-BR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-8 text-center text-xs text-text-muted flex flex-col items-center justify-center gap-2 border border-dashed border-border-gray rounded-2xl bg-bg-light/10">
                <span>Nenhum e-mail disparado nesta sessão de navegação.</span>
                <span className="text-[10px]">Efetue um download de e-book ou assine a newsletter para disparar as réguas automáticas em tempo real.</span>
              </div>
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

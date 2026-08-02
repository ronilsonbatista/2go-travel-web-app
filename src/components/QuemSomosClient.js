"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Compass, 
  MapPin, 
  Smartphone, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Mail, 
  MessageSquare, 
  ArrowRight,
  Clock,
  CheckCircle2,
  Award,
  Layers
} from 'lucide-react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppDownloadModal from '@/components/AppDownloadModal';

export default function QuemSomosClient() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => setContactSubmitted(false), 4000);
  };

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1440px] w-full text-left">
          
          <Breadcrumbs items={[{ name: 'Quem somos', url: '/quem-somos' }]} />

          {/* Hero Section */}
          <header className="my-10 text-center max-w-4xl mx-auto">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3 py-1.5 rounded-full w-fit mx-auto font-headers uppercase">
              SOBRE A 2GO
            </span>
            <h1 className="font-headers text-3xl sm:text-4.5xl md:text-5.5xl font-extrabold text-brand-navy mt-4 mb-4 tracking-tight leading-tight">
              Planejar uma viagem deveria ser tão prazeroso quanto viajar.
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
              A 2GO nasceu para transformar pesquisas, dúvidas e excesso de informações em roteiros claros, personalizados e fáceis de acompanhar.
            </p>
          </header>

          {/* Banner Hero Visual */}
          <div className="bg-brand-navy text-white rounded-[32px] p-8 sm:p-12 mb-16 shadow-md relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="max-w-xl text-left z-10">
              <span className="text-[10px] font-extrabold text-brand-orange uppercase tracking-widest font-headers block mb-2">
                NOSSA PROPÓSITO
              </span>
              <h2 className="font-headers text-2xl sm:text-3.5xl font-extrabold leading-tight mb-4">
                Sua jornada sem estresse, do primeiro clique até o retorno.
              </h2>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-body">
                Acreditamos que viajar é criar memórias inesquecíveis, e não gastar horas perdidas entre dezenas de abas abertas e rotas mal otimizadas.
              </p>
            </div>

            <div className="flex gap-4 w-full md:w-auto shrink-0 flex-col sm:flex-row z-10">
              <Link href="/planejamento" className="btn btn-secondary py-3.5 px-6 font-bold text-xs justify-center">
                Criar roteiro
              </Link>
              <button 
                onClick={() => setIsDownloadOpen(true)} 
                className="btn border border-white/30 text-white bg-transparent py-3.5 px-6 hover:bg-white/10 transition-all font-bold text-xs justify-center cursor-pointer"
              >
                Baixar App
              </button>
            </div>

            {/* Decorative background glow */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none"></div>
          </div>

          {/* Section: O que fazemos */}
          <section className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[10px] font-extrabold text-brand-orange uppercase tracking-widest font-headers block mb-1">
                SOLUÇÕES PARA VIAJANTES
              </span>
              <h2 className="font-headers text-2xl sm:text-3.5xl font-extrabold text-brand-navy">
                O que fazemos
              </h2>
              <p className="text-xs sm:text-sm text-text-muted mt-2">
                Tudo o que você precisa para viajar com tranquilidade e autonomia.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Compass className="w-6 h-6 text-brand-orange" />,
                  title: 'Roteiros personalizados',
                  desc: 'Cronogramas dia a dia desenhados sob medida para o seu orçamento, ritmo e estilo de viagem.'
                },
                {
                  icon: <MapPin className="w-6 h-6 text-brand-navy" />,
                  title: 'Organização diária',
                  desc: 'Atrações agrupadas por proximidade geográfica para você aproveitar o tempo sem ziguezague na cidade.'
                },
                {
                  icon: <Award className="w-6 h-6 text-brand-green" />,
                  title: 'Custos e orçamento',
                  desc: 'Transparência de preços diários estimando gastos de hospedagem, alimentação e transporte.'
                },
                {
                  icon: <Sparkles className="w-6 h-6 text-brand-orange" />,
                  title: 'Curadoria de experiências',
                  desc: 'Recomendações testadas de bistrôs locais, passeios imperdíveis e atrações fora da rota óbvia.'
                },
                {
                  icon: <Smartphone className="w-6 h-6 text-brand-navy" />,
                  title: 'Aplicativo offline',
                  desc: 'Acesse seus roteiros, vouchers e direções por GPS sem depender de internet no exterior.'
                },
                {
                  icon: <Users className="w-6 h-6 text-brand-green" />,
                  title: 'Consultoria Premium',
                  desc: 'Acompanhamento humano por especialistas para revisar detalhes de logística e reservas exclusivas.'
                }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-white border border-border-gray/80 p-6 sm:p-8 rounded-[28px] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 text-left"
                >
                  <div className="w-12 h-12 rounded-2xl bg-bg-light flex items-center justify-center shrink-0 border border-border-gray/50">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-headers text-base sm:text-lg font-bold text-brand-navy">
                      {item.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Nosso diferencial */}
          <section className="bg-white border border-border-gray/80 rounded-[32px] p-8 sm:p-12 mb-16 shadow-xs text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <span className="text-[10px] font-extrabold text-brand-orange uppercase tracking-widest font-headers block mb-2">
                  NOSSO DIFERENCIAL
                </span>
                <h2 className="font-headers text-2xl sm:text-4xl font-extrabold text-brand-navy leading-tight mb-4">
                  Tecnologia para organizar. Pessoas para aperfeiçoar.
                </h2>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-body mb-4">
                  Acreditamos que algoritmos modernos são imbatíveis em otimizar rotas, horários e estimativas de custos. Porém, nada substitui a intuição e o olhar de um especialista em viagens que conhece as nuances locais.
                </p>
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-body">
                  Por isso, aliamos a velocidade da tecnologia de ponta com o toque humano refinado da nossa equipe de curadores.
                </p>
              </div>

              <div className="lg:col-span-5 bg-bg-light/80 border border-border-gray/70 p-6 rounded-2xl flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                  <span className="text-xs font-bold text-brand-navy">Algoritmos inteligentes de rotas em segundos</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" />
                  <span className="text-xs font-bold text-brand-navy">Revisão por curadores locais experientes</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-navy shrink-0" />
                  <span className="text-xs font-bold text-brand-navy">Suporte dedicado na nossa Consultoria Premium</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Nossos Valores */}
          <section className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[10px] font-extrabold text-brand-navy uppercase tracking-widest font-headers block mb-1">
                COMPROMISSO
              </span>
              <h2 className="font-headers text-2xl sm:text-3.5xl font-extrabold text-brand-navy">
                Nossos valores
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { title: 'Personalização', desc: 'Cada viagem reflete as escolhas e desejos únicos do viajante.' },
                { title: 'Praticidade', desc: 'Interfaces simples e acesso 100% offline no celular.' },
                { title: 'Respeito', desc: 'Transparência de preços sem pegadinhas de cupons ocultos.' },
                { title: 'Responsabilidade', desc: 'Incentivo ao turismo consciente e roteiros viáveis.' },
                { title: 'Experiência no centro', desc: 'O viajante é sempre a prioridade de todas as decisões.' }
              ].map((val, idx) => (
                <div key={idx} className="bg-white border border-border-gray/80 p-5 rounded-2xl shadow-xs text-left">
                  <span className="text-brand-orange font-black text-lg font-headers block mb-2">0{idx + 1}.</span>
                  <h3 className="font-headers text-sm font-bold text-brand-navy mb-1">{val.title}</h3>
                  <p className="text-[11px] text-text-muted leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Contato */}
          <section id="contato" className="bg-white border border-border-gray/80 rounded-[32px] p-8 sm:p-12 mb-16 shadow-xs text-left scroll-mt-32">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-[10px] font-extrabold text-brand-orange uppercase tracking-widest font-headers block mb-1">
                  FALE CONOSCO
                </span>
                <h2 className="font-headers text-2xl sm:text-3.5xl font-extrabold text-brand-navy">
                  Entre em contato com a equipe 2GO
                </h2>
                <p className="text-xs text-text-muted mt-2">
                  Dúvidas sobre seu roteiro, suporte do aplicativo ou parcerias institucionais.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-bg-light/60 border border-border-gray/60 p-5 rounded-2xl flex items-center gap-4">
                  <Mail className="w-6 h-6 text-brand-orange shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block font-headers">E-MAIL DE ATENDIMENTO</span>
                    <a href="mailto:contato@2go.com.br" className="text-xs font-bold text-brand-navy hover:text-brand-orange">contato@2go.com.br</a>
                  </div>
                </div>

                <div className="bg-bg-light/60 border border-border-gray/60 p-5 rounded-2xl flex items-center gap-4">
                  <Clock className="w-6 h-6 text-brand-navy shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider block font-headers">HORÁRIO DE SUPORTE</span>
                    <span className="text-xs font-bold text-brand-navy">Segunda a Sexta, 09h às 18h</span>
                  </div>
                </div>
              </div>

              {/* Simple Contact Form */}
              <form onSubmit={handleContactSubmit} className="flex flex-col gap-4 bg-bg-light/30 border border-border-gray/60 p-6 rounded-2xl">
                {contactSubmitted && (
                  <div className="bg-brand-green/10 border border-brand-green text-brand-navy text-xs font-bold p-4 rounded-xl text-center">
                    ✓ Mensagem enviada com sucesso! Nossa equipe responderá em breve.
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Seu nome"
                    className="w-full bg-white border border-border-gray/80 px-4 py-3 rounded-xl text-xs font-semibold text-brand-navy focus:outline-none focus:border-brand-navy"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Seu e-mail"
                    className="w-full bg-white border border-border-gray/80 px-4 py-3 rounded-xl text-xs font-semibold text-brand-navy focus:outline-none focus:border-brand-navy"
                  />
                </div>
                <textarea
                  rows="4"
                  required
                  placeholder="Como podemos ajudar você?"
                  className="w-full bg-white border border-border-gray/80 px-4 py-3 rounded-xl text-xs font-semibold text-brand-navy focus:outline-none focus:border-brand-navy resize-none"
                ></textarea>
                <button type="submit" className="btn btn-primary py-3 text-xs font-bold justify-center self-end px-8 cursor-pointer">
                  Enviar mensagem
                </button>
              </form>
            </div>
          </section>

          {/* Final CTA */}
          <section className="bg-brand-navy text-white p-8 sm:p-12 rounded-[32px] text-center flex flex-col items-center gap-4 shadow-lg border border-brand-navy">
            <h2 className="font-headers text-2xl sm:text-3.5xl font-extrabold tracking-tight">
              Pronto para planejar sua próxima viagem?
            </h2>
            <p className="text-xs sm:text-sm text-white/80 max-w-md leading-relaxed">
              Crie seu roteiro personalizado em segundos ou baixe o aplicativo 2GO para levar no bolso.
            </p>
            <div className="flex gap-4 mt-2 w-full justify-center max-w-md flex-col sm:flex-row">
              <Link href="/planejamento" className="btn btn-secondary py-3.5 px-6 font-bold text-xs justify-center flex-1">
                Criar roteiro
              </Link>
              <button 
                onClick={() => setIsDownloadOpen(true)}
                className="btn border border-white/30 text-white bg-transparent py-3.5 px-6 hover:bg-white/10 transition-all font-bold text-xs justify-center flex-1 cursor-pointer"
              >
                Baixar App
              </button>
            </div>
          </section>

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

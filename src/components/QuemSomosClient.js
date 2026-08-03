"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AppDownloadModal from '@/components/AppDownloadModal';
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Compass, 
  CheckCircle2, 
  Users, 
  Clock, 
  Layers, 
  Cpu, 
  Eye, 
  UserCheck 
} from 'lucide-react';

export default function QuemSomosClient() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-28 pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1280px] w-full text-left">
          
          <Breadcrumbs items={[{ name: 'Quem somos', url: '/quem-somos' }]} />

          {/* 1. Hero */}
          <header className="my-10 text-center max-w-4xl mx-auto">
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold tracking-widest px-3.5 py-1.5 rounded-full w-fit mx-auto font-headers uppercase">
              INSTITUCIONAL
            </span>
            <h1 className="font-headers text-3xl sm:text-4.5xl md:text-5.5xl font-extrabold text-brand-navy mt-4 mb-4 tracking-tight leading-tight">
              Planejar uma viagem deveria ser tão prazeroso quanto viajar.
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed font-body">
              A 2GO nasceu para transformar excesso de informações, dúvidas e pesquisas em planejamentos mais claros, personalizados e fáceis de acompanhar.
            </p>
          </header>

          {/* 2. Nossa História */}
          <section className="bg-white border border-border-gray/80 rounded-[32px] p-8 sm:p-12 mb-12 shadow-xs">
            <div className="max-w-3xl mx-auto text-left">
              <span className="text-[10px] font-extrabold text-brand-orange uppercase tracking-widest font-headers block mb-2">
                NOSSA HISTÓRIA
              </span>
              <h2 className="font-headers text-2xl sm:text-3.5xl font-extrabold text-brand-navy mb-5 leading-tight">
                Simplificando o planejamento para transformar a experiência do viajante.
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-text-muted leading-relaxed font-body">
                <p>
                  A 2GO é uma empresa de tecnologia de viagens criada com um propósito claro: eliminar o estresse e a sobrecarga que costumam acompanhar o planejamento de uma viagem.
                </p>
                <p>
                  Sabemos que, antes de pisar no destino, o viajante enfrenta dezenas de abas abertas, itinerários desconexos e informações contraditórias. Nossa estrutura foi desenvolvida para organizar essas peças de forma inteligível, conectando tecnologia e curadoria em uma experiência integrada.
                </p>
                <p>
                  Seja organizando despachos de transporte, indicando atrações adequadas ao ritmo da viagem ou estimando orçamentos reais, a 2GO atua para que cada etapa do planejamento seja fluida, transparente e confiável.
                </p>
              </div>
            </div>
          </section>

          {/* 3. O que acreditamos */}
          <section className="mb-12">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-[10px] font-extrabold text-brand-orange uppercase tracking-widest font-headers block mb-1">
                PROPÓSITO &amp; VISÃO
              </span>
              <h2 className="font-headers text-2xl sm:text-3.5xl font-extrabold text-brand-navy">
                O que acreditamos
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <UserCheck className="w-6 h-6 text-brand-orange" />,
                  title: 'Perfil respeitado',
                  desc: 'Cada viagem deve respeitar o perfil, os ritmos e as preferências únicas de quem viaja.'
                },
                {
                  icon: <Cpu className="w-6 h-6 text-brand-navy" />,
                  title: 'Tecnologia que simplifica',
                  desc: 'A tecnologia existe para remover atritos e complicações, tornando o processo intuitivo.'
                },
                {
                  icon: <Eye className="w-6 h-6 text-[#96AB21]" />,
                  title: 'Informação clara',
                  desc: 'Dados sobre custos, horários e rotas devem ser apresentados de forma direta e sem letras miúdas.'
                },
                {
                  icon: <Sparkles className="w-6 h-6 text-brand-orange" />,
                  title: 'Personalização real',
                  desc: 'Evitamos roteiros genéricos pré-fabricados; o planejamento deve atender necessidades reais.'
                },
                {
                  icon: <ShieldCheck className="w-6 h-6 text-brand-navy" />,
                  title: 'Atendimento responsável',
                  desc: 'Assumimos o compromisso ético de entregar orientações seguras e suporte transparente.'
                }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-border-gray/80 rounded-[24px] p-6 text-left shadow-xs hover:border-brand-navy/30 transition-all flex flex-col gap-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-bg-light flex items-center justify-center border border-border-gray/50 shrink-0">
                    {item.icon}
                  </div>
                  <h3 className="font-headers text-base font-extrabold text-brand-navy">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Como trabalhamos */}
          <section className="bg-white border border-border-gray/80 rounded-[32px] p-8 sm:p-12 mb-12 shadow-xs">
            <div className="max-w-3xl mx-auto text-left">
              <span className="text-[10px] font-extrabold text-brand-orange uppercase tracking-widest font-headers block mb-2">
                METODOLOGIA &amp; PILARES
              </span>
              <h2 className="font-headers text-2xl sm:text-3.5xl font-extrabold text-brand-navy mb-6">
                Como trabalhamos
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Tecnologia avançada',
                    desc: 'Algoritmos inteligentes que cruzam tempos de deslocamento, distâncias e horários de funcionamento.'
                  },
                  {
                    title: 'Organização estruturada',
                    desc: 'Divisão diária por turnos e itinerários lógicos para maximizar o tempo do viajante no destino.'
                  },
                  {
                    title: 'Curadoria especializada',
                    desc: 'Seleção rigorosa de atrações, opções gastronômicas e dicas locais verificadas.'
                  },
                  {
                    title: 'Experiência do viajante',
                    desc: 'Foco contínuo no bem-estar, acessibilidade e ritmo agradável de caminhada.'
                  },
                  {
                    title: 'Suporte humano dedicado',
                    desc: 'Especialistas à disposição sempre que for necessária uma orientação individualizada.'
                  }
                ].map((pilar, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-headers text-sm font-extrabold text-brand-navy">
                        {pilar.title}
                      </h4>
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">
                        {pilar.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. Valores */}
          <section className="mb-12">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-[10px] font-extrabold text-brand-orange uppercase tracking-widest font-headers block mb-1">
                COMPROMISSO
              </span>
              <h2 className="font-headers text-2xl sm:text-3.5xl font-extrabold text-brand-navy">
                Nossos valores
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Personalização', icon: '🎯' },
                { name: 'Praticidade', icon: '⚡' },
                { name: 'Responsabilidade', icon: '🛡️' },
                { name: 'Respeito', icon: '🤝' },
                { name: 'Clareza', icon: '🔍' },
                { name: 'Experiência do cliente', icon: '⭐' }
              ].map((val, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-border-gray/80 p-5 rounded-[20px] text-center flex flex-col items-center justify-center gap-2 shadow-2xs"
                >
                  <span className="text-2xl">{val.icon}</span>
                  <span className="font-headers text-xs font-extrabold text-brand-navy leading-snug">
                    {val.name}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Fechamento Institucional (SEM BOTÃO) */}
          <footer className="bg-brand-navy text-white rounded-[32px] p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-md">
            <p className="font-headers text-lg sm:text-xl md:text-2xl font-bold max-w-2xl mx-auto leading-relaxed">
              A 2GO existe para tornar o planejamento mais simples e permitir que cada viajante aproveite melhor o destino, o tempo e a própria experiência.
            </p>
          </footer>

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

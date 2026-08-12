"use client";

import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, ShieldCheck, Compass, HeartHandshake, 
  MapPin, Calendar, Users, DollarSign, Send, Smartphone, MessageSquare
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppDownloadModal from '@/components/AppDownloadModal';

export default function ConsultoriaClient() {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form states
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [destino, setDestino] = useState('');
  const [origem, setOrigem] = useState('');
  const [datas, setDatas] = useState('');
  const [pessoas, setPessoas] = useState('2 pessoas (Casal)');
  const [estilo, setEstilo] = useState('Equilibrado (Cultura e Lazer)');
  const [orcamento, setOrcamento] = useState('Confortável');
  const [preferencias, setPreferencias] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const message = `*Solicitação de Consultoria Personalizada 2GO* ✈️\n\n` +
      `👤 *Nome:* ${nome}\n` +
      `📱 *WhatsApp:* ${whatsapp}\n` +
      `✉️ *E-mail:* ${email}\n` +
      `📍 *Destino:* ${destino}\n` +
      `🏠 *Origem:* ${origem}\n` +
      `📅 *Datas/Mês:* ${datas}\n` +
      `👥 *Viajantes:* ${pessoas}\n` +
      `🎨 *Estilo:* ${estilo}\n` +
      `💰 *Orçamento:* ${orcamento}\n` +
      (preferencias ? `✨ *Preferências:* ${preferencias}\n` : '') +
      (observacoes ? `📝 *Observações:* ${observacoes}\n` : '');

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5511999999999?text=${encoded}`;

    // Open WhatsApp in new window
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow pt-28 pb-20">
        
        {/* Hero Section */}
        <section className="container mx-auto px-6 text-center max-w-4xl relative overflow-hidden mb-16">
          <div className="absolute top-10 left-10 w-44 h-44 bg-brand-orange/5 rounded-full blur-[60px] pointer-events-none select-none"></div>
          <div className="absolute bottom-10 right-10 w-44 h-44 bg-brand-navy/5 rounded-full blur-[60px] pointer-events-none select-none"></div>

          <span className="bg-brand-orange text-white text-[10px] font-extrabold tracking-widest px-4 py-1.5 rounded-full w-fit mx-auto uppercase font-headers">
            Consultoria Personalizada
          </span>
          <h1 className="font-headers text-3xl sm:text-5xl md:text-6xl font-black text-brand-navy mt-6 mb-6 leading-tight tracking-tight">
            Sua viagem planejada sob medida por especialistas
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-text-muted max-w-[760px] mx-auto leading-relaxed">
            Unimos o poder da nossa curadoria digital com o suporte consultivo direto de especialistas reais. Receba um roteiro 100% sob medida para o seu estilo, orçamento e tempo livre.
          </p>
        </section>

        {/* Benefits & Included Services Grid */}
        <section className="container mx-auto px-6 max-w-6xl mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white border border-border-gray p-8 rounded-[28px] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-headers text-lg font-bold text-brand-navy mb-2">Para quem é?</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Para quem valoriza o seu tempo, busca experiências autênticas e quer evitar ciladas turísticas com uma logística sem falhas.
              </p>
            </div>

            <div className="bg-white border border-border-gray p-8 rounded-[28px] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-brand-green/10 text-brand-green flex items-center justify-center mb-6">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-headers text-lg font-bold text-brand-navy mb-2">O que está incluído?</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Roteiro dia a dia personalizado, indicação de hospedagens ideais, reservas de passeios e suporte direto para dúvidas.
              </p>
            </div>

            <div className="bg-white border border-border-gray p-8 rounded-[28px] shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-brand-navy/10 text-brand-navy flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-headers text-lg font-bold text-brand-navy mb-2">No seu aplicativo</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Sua consultoria é sincronizada no app 2GO, onde você acompanha a rota dia a dia com GPS offline e mapas durante a viagem.
              </p>
            </div>
          </div>
        </section>

        {/* Complete Form Section */}
        <section id="formulario" className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white border border-border-gray p-8 md:p-12 rounded-[32px] shadow-sm text-left relative">
            <div className="mb-8 border-b border-border-gray/50 pb-6">
              <span className="text-[10px] font-black text-brand-orange uppercase tracking-wider font-headers block">
                ATENDIMENTO DIRETO
              </span>
              <h2 className="font-headers text-2xl sm:text-3xl font-bold text-brand-navy mt-1">
                Solicite sua Consultoria Personalizada
              </h2>
              <p className="text-xs sm:text-sm text-text-muted mt-2">
                Preencha os detalhes da sua viagem abaixo. Após o envio, você será direcionado ao nosso atendimento no WhatsApp para conversar com um especialista.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center gap-4 animate-fade-in">
                <div className="w-16 h-16 bg-brand-green text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-md shadow-brand-green/20">
                  ✓
                </div>
                <h3 className="font-headers text-2xl font-black text-brand-navy">Solicitação Enviada!</h3>
                <p className="text-xs sm:text-sm text-text-muted max-w-md leading-relaxed">
                  Sua mensagem foi formatada e o WhatsApp foi aberto. Caso a janela não tenha aberto automaticamente, clique no botão abaixo para conversar com nosso especialista.
                </p>
                <button
                  onClick={() => handleSubmit({ preventDefault: () => {} })}
                  className="btn bg-brand-green hover:bg-brand-green/90 text-white font-extrabold py-3 px-6 text-xs flex items-center gap-2 rounded-xl cursor-pointer mt-4"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Reabrir WhatsApp</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Dados pessoais */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-brand-navy uppercase tracking-wider font-headers">
                      Nome Completo *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Seu nome completo"
                      className="w-full bg-[#F8FAFC] border border-border-gray px-4 py-3 rounded-xl text-xs font-semibold text-brand-navy focus:outline-none focus:border-brand-navy transition-all shadow-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-brand-navy uppercase tracking-wider font-headers">
                      WhatsApp *
                    </label>
                    <input 
                      type="tel" 
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="w-full bg-[#F8FAFC] border border-border-gray px-4 py-3 rounded-xl text-xs font-semibold text-brand-navy focus:outline-none focus:border-brand-navy transition-all shadow-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-brand-navy uppercase tracking-wider font-headers">
                      E-mail *
                    </label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu.email@exemplo.com"
                      className="w-full bg-[#F8FAFC] border border-border-gray px-4 py-3 rounded-xl text-xs font-semibold text-brand-navy focus:outline-none focus:border-brand-navy transition-all shadow-xs"
                    />
                  </div>
                </div>

                {/* Dados da viagem */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-brand-navy uppercase tracking-wider font-headers">
                      Destino Desejado *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={destino}
                      onChange={(e) => setDestino(e.target.value)}
                      placeholder="Ex: Paris, Itália, Japão..."
                      className="w-full bg-[#F8FAFC] border border-border-gray px-4 py-3 rounded-xl text-xs font-semibold text-brand-navy focus:outline-none focus:border-brand-navy transition-all shadow-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-brand-navy uppercase tracking-wider font-headers">
                      Cidade de Origem *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={origem}
                      onChange={(e) => setOrigem(e.target.value)}
                      placeholder="Ex: São Paulo, Rio de Janeiro..."
                      className="w-full bg-[#F8FAFC] border border-border-gray px-4 py-3 rounded-xl text-xs font-semibold text-brand-navy focus:outline-none focus:border-brand-navy transition-all shadow-xs"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-brand-navy uppercase tracking-wider font-headers">
                      Datas ou Mês Pretendido *
                    </label>
                    <input 
                      type="text" 
                      required
                      value={datas}
                      onChange={(e) => setDatas(e.target.value)}
                      placeholder="Ex: 15 a 25 de Outubro / Outubro 2026"
                      className="w-full bg-[#F8FAFC] border border-border-gray px-4 py-3 rounded-xl text-xs font-semibold text-brand-navy focus:outline-none focus:border-brand-navy transition-all shadow-xs"
                    />
                  </div>
                </div>

                {/* Perfil da viagem */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-brand-navy uppercase tracking-wider font-headers">
                      Quantidade de Pessoas
                    </label>
                    <select 
                      value={pessoas}
                      onChange={(e) => setPessoas(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-border-gray px-4 py-3 rounded-xl text-xs font-semibold text-brand-navy focus:outline-none focus:border-brand-navy transition-all shadow-xs"
                    >
                      <option value="1 pessoa (Solo)">1 pessoa (Solo)</option>
                      <option value="2 pessoas (Casal)">2 pessoas (Casal)</option>
                      <option value="Família com crianças">Família com crianças</option>
                      <option value="Grupo de amigos">Grupo de amigos</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-brand-navy uppercase tracking-wider font-headers">
                      Estilo de Viagem
                    </label>
                    <select 
                      value={estilo}
                      onChange={(e) => setEstilo(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-border-gray px-4 py-3 rounded-xl text-xs font-semibold text-brand-navy focus:outline-none focus:border-brand-navy transition-all shadow-xs"
                    >
                      <option value="Equilibrado (Cultura e Lazer)">Equilibrado (Cultura e Lazer)</option>
                      <option value="Romântico & Fim de Semana">Romântico & Fim de Semana</option>
                      <option value="Gastronômico & Vinhos">Gastronômico & Vinhos</option>
                      <option value="Aventura & Natureza">Aventura & Natureza</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-brand-navy uppercase tracking-wider font-headers">
                      Orçamento Estimado
                    </label>
                    <select 
                      value={orcamento}
                      onChange={(e) => setOrcamento(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-border-gray px-4 py-3 rounded-xl text-xs font-semibold text-brand-navy focus:outline-none focus:border-brand-navy transition-all shadow-xs"
                    >
                      <option value="Econômico">Econômico</option>
                      <option value="Confortável">Confortável</option>
                      <option value="Alto Luxo / Premium">Alto Luxo / Premium</option>
                    </select>
                  </div>
                </div>

                {/* Preferências e observações */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-brand-navy uppercase tracking-wider font-headers">
                    Preferências Principais
                  </label>
                  <input 
                    type="text" 
                    value={preferencias}
                    onChange={(e) => setPreferencias(e.target.value)}
                    placeholder="Ex: Hotéis boutique, restaurantes estrelados, passeios sem correria..."
                    className="w-full bg-[#F8FAFC] border border-border-gray px-4 py-3 rounded-xl text-xs font-semibold text-brand-navy focus:outline-none focus:border-brand-navy transition-all shadow-xs"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-brand-navy uppercase tracking-wider font-headers">
                    Observações Adicionais (Opcional)
                  </label>
                  <textarea 
                    rows="3"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                    placeholder="Conte-nos mais detalhes ou requisitos específicos sobre sua viagem..."
                    className="w-full bg-[#F8FAFC] border border-border-gray px-4 py-3 rounded-xl text-xs font-semibold text-brand-navy focus:outline-none focus:border-brand-navy transition-all shadow-xs resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn bg-brand-orange hover:bg-brand-orange/95 text-white font-extrabold py-4 px-8 rounded-xl shadow-md text-xs flex items-center justify-center gap-2 cursor-pointer transition-all uppercase tracking-wider font-headers mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Solicitação no WhatsApp</span>
                </button>
              </form>
            )}
          </div>
        </section>

      </main>

      <Footer onOpenDownload={() => setIsDownloadOpen(true)} />
      
      <AppDownloadModal 
        isOpen={isDownloadOpen} 
        onClose={() => setIsDownloadOpen(false)} 
      />
    </div>
  );
}

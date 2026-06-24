"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Smartphone, 
  ShieldAlert, 
  Lock, 
  Calendar, 
  Compass, 
  Sliders, 
  Navigation,
  Star,
  MapPin,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AppDownloadModal from '@/components/AppDownloadModal';
import LeadWallModal from '@/components/LeadWallModal';

const itineraryDatabase = {
  noronha: {
    name: 'Fernando de Noronha, PE',
    title: 'Fernando de Noronha de Alto Padrão',
    desc: 'Um mergulho na exclusividade e na beleza natural do arquipélago mais preservado do Brasil.',
    days: [
      {
        day: 'Dia 1',
        title: 'Chegada ao Paraíso & Sunset Vip',
        events: [
          { time: '14:00', title: 'Check-in na Pousada Boutique (Nannai ou Maria Bonita)' },
          { time: '16:30', title: 'Navegação Privada ao Pôr do Sol com Espumante' },
          { time: '20:30', title: 'Jantar Gourmet no Restaurante Xica da Silva' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Exploração Subaquática & Baías Icônicas',
        events: [
          { time: '08:30', title: 'Mergulho com tartarugas e tubarões na Baía do Sueste' },
          { time: '12:00', title: 'Almoço com Vista Panorâmica na Baía dos Golfinhos' },
          { time: '14:30', title: 'Trilha Privativa e Descida à Baía do Sancho (Eleita a melhor praia)' },
          { time: '19:30', title: 'Experiência Gastronômica: Festival da Zé Maria' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'Aventura Leve & Mirantes Privados',
        events: [
          { time: '09:00', title: 'Passeio de buggy off-road privativo pelas praias do Mar de Fora' },
          { time: '15:00', title: 'Trilha histórica da Fortaleza de Nossa Senhora dos Remédios' },
          { time: '18:00', title: 'Jantar de despedida no Bar do Meio (Música ao vivo e vista espetacular)' }
        ]
      }
    ]
  },
  rio: {
    name: 'Rio de Janeiro, RJ',
    title: 'Rio de Janeiro Experiência Exclusiva',
    desc: 'A essência carioca sofisticada, misturando história, natureza urbana e alta gastronomia.',
    days: [
      {
        day: 'Dia 1',
        title: 'Check-In Imperial & Orla no Ocaso',
        events: [
          { time: '13:00', title: 'Hospedagem no Copacabana Palace ou Hotel Emiliano' },
          { time: '16:00', title: 'Passeio Privativo de Helicóptero sobre o Cristo Redentor e Pão de Açúcar' },
          { time: '20:00', title: 'Jantar Harmonizado no Restaurante Michelin ORO (Chef Felipe Bronze)' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Natureza Imersiva & Arte Contemporânea',
        events: [
          { time: '09:00', title: 'Caminhada Privada com Guia pela Floresta da Tijuca até a Vista Chinesa' },
          { time: '13:00', title: 'Almoço sofisticado no Aprazível (Santa Teresa)' },
          { time: '15:30', title: 'Visita guiada exclusiva ao Museu de Arte Contemporânea (MAC Niterói)' },
          { time: '21:00', title: 'Drinks e Jazz ao vivo no moderníssimo Baretto-Londra (Ipanema)' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'Mar do Rio & Despedida Premium',
        events: [
          { time: '10:00', title: 'Charter de Iate Privado ao longo da Baía de Guanabara e Ilhas Cagarras' },
          { time: '14:30', title: 'Almoço tardio no charmoso Satyricon' },
          { time: '17:30', title: 'Relax no Spa do hotel e check-out' }
        ]
      }
    ]
  },
  veadeiros: {
    name: 'Chapada dos Veadeiros, GO',
    title: 'Chapada dos Veadeiros Mística e Luxuosa',
    desc: 'Conexão profunda com a natureza dos cristais com total conforto e bem-estar.',
    days: [
      {
        day: 'Dia 1',
        title: 'Chegada ao Cerrado & Spa Wellness',
        events: [
          { time: '14:00', title: 'Check-in no Glamping de Luxo em Alto Paraíso' },
          { time: '16:30', title: 'Terapia de som e massagem holística no Spa da pousada' },
          { time: '20:00', title: 'Jantar orgânico farm-to-table no L\'Alcofa' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Canyons de Cristal & Saltos Majestosos',
        events: [
          { time: '08:30', title: 'Trilha Premium ao Parque Nacional: Mirante do Salto e Carrossel' },
          { time: '13:00', title: 'Piquenique gourmet servido à beira das águas na cachoeira' },
          { time: '15:30', title: 'Visita ao Vale da Lua com iluminação de final de tarde' },
          { time: '20:30', title: 'Degustação de cervejas artesanais locais e jantar sofisticado' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'Cachoeira do Segredo & Conexão de Despedida',
        events: [
          { time: '09:00', title: 'Aventura 4x4 e trilha privativa até a belíssima Cachoeira do Segredo' },
          { time: '14:00', title: 'Almoço no Santo Cerrado Risoteria' },
          { time: '17:00', title: 'Transfer privado de retorno' }
        ]
      }
    ]
  },
  amazonas: {
    name: 'Manaus & Selva, AM',
    title: 'Imersão Eco-Luxo na Amazônia',
    desc: 'A grandiosidade da maior floresta tropical do mundo desbravada com sofisticação incomparável.',
    days: [
      {
        day: 'Dia 1',
        title: 'Chegada Flutuante & Encontro das Águas',
        events: [
          { time: '12:00', title: 'Transfer fluvial privado para o Mirante do Gavião Amazon Lodge' },
          { time: '15:30', title: 'Navegação de luxo para avistar o Encontro das Águas' },
          { time: '19:30', title: 'Jantar com culinária regional contemporânea assinada por Chef' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Despertar da Selva & Trilhas na Copa',
        events: [
          { time: '05:30', title: 'Canoagem matinal silenciosa para observação do nascer do sol e pássaros' },
          { time: '09:30', title: 'Trilha interpretativa de sobrevivência e botânica com guia indígena' },
          { time: '15:00', title: 'Focagem noturna de jacarés e sons da floresta em barco privativo' },
          { time: '20:30', title: 'Jantar na copa das árvores no mirante panorâmico do Lodge' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'Visita Comunitária & Ritual de Despedida',
        events: [
          { time: '09:00', title: 'Visita guiada e intercâmbio cultural em comunidade ribeirinha sustentável' },
          { time: '13:00', title: 'Almoço de peixe assado na brasa na Ilha de Anavilhanas' },
          { time: '16:00', title: 'Retorno com transfer privativo para Manaus' }
        ]
      }
    ]
  },
  gramado: {
    name: 'Gramado, RS',
    title: 'Gramado e Canela Autêntico Europeu',
    desc: 'Romantismo, névoa, chocolate artesanal e o melhor do vinho nacional na Serra Gaúcha.',
    days: [
      {
        day: 'Dia 1',
        title: 'Chegada Serrana & Alta Gastronomia',
        events: [
          { time: '14:00', title: 'Hospedagem no requintado Hotel Kurotel ou Estalagem St. Hubertus' },
          { time: '16:30', title: 'Chá da tarde colonial privativo com vista para o Lago Negro' },
          { time: '20:30', title: 'Jantar Suíço Tradicional (Fondue Premium) no Belle du Valais' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Vales Vitivinícolas & Cascata do Caracol',
        events: [
          { time: '09:00', title: 'Tour privativo pelos vinhedos do Vale dos Vinhedos com degustação VIP' },
          { time: '13:30', title: 'Almoço harmonizado na vinícola Casa Valduga' },
          { time: '16:00', title: 'Parada no mirante exclusivo da Cascata do Caracol (Canela)' },
          { time: '20:30', title: 'Jantar contemporâneo no estrelado Wood Lounge Bar' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'Chocolaterias Finas & Caminhos de Pedra',
        events: [
          { time: '10:00', title: 'Workshop privado de produção de trufas em fábrica artesanal boutique' },
          { time: '13:00', title: 'Almoço tipicamente italiano nos Caminhos de Pedra' },
          { time: '16:00', title: 'Check-out e transfer de retorno ao aeroporto de Porto Alegre' }
        ]
      }
    ]
  },
  paris: {
    name: 'Paris, França',
    title: 'Paris Clássico & Romântico',
    desc: 'Aproveite o melhor de Paris com visitas a monumentos históricos e charmosos bistrôs locais.',
    days: [
      {
        day: 'Dia 1',
        title: 'Monumentos Clássicos',
        events: [
          { time: '09:00', title: 'Visita ao Museu do Louvre' },
          { time: '13:00', title: 'Almoço no Jardin des Tuileries' },
          { time: '16:00', title: 'Subir ao topo do Arco do Triunfo' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Notre-Dame & Montmartre',
        events: [
          { time: '10:00', title: 'Caminhada artística por Montmartre e Basílica de Sacré-Cœur' },
          { time: '14:00', title: 'Almoço na Place du Tertre' },
          { time: '18:00', title: 'Cruzeiro ao pôr do sol pelo Rio Sena' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'Torre Eiffel & Jardins',
        events: [
          { time: '09:30', title: 'Visita guiada à Torre Eiffel' },
          { time: '13:00', title: 'Piquenique nos Jardins do Champ de Mars' },
          { time: '16:00', title: 'Exploração de Saint-Germain-des-Prés' }
        ]
      }
    ]
  },
  roma: {
    name: 'Roma, Itália',
    title: 'Roma a Cidade Eterna',
    desc: 'Descubra a história e os segredos arqueológicos e gastronômicos de Roma.',
    days: [
      {
        day: 'Dia 1',
        title: 'Coliseu & Império Romano',
        events: [
          { time: '09:00', title: 'Visita guiada ao Coliseu e Fórum Romano' },
          { time: '13:30', title: 'Almoço em Osteria tradicional' },
          { time: '16:00', title: 'Caminhada até a Piazza Navona' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Vaticano & Capela Sistina',
        events: [
          { time: '08:30', title: 'Museus do Vaticano e Capela Sistina' },
          { time: '12:00', title: 'Visita interna da Basílica de São Pedro' },
          { time: '15:00', title: 'Cruzar a Ponte de Santo Ângelo' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'Fontana di Trevi & Pantheon',
        events: [
          { time: '09:30', title: 'Caminhada matinal até o Pantheon' },
          { time: '12:00', title: 'Jogar moedas na Fontana di Trevi' },
          { time: '16:00', title: 'Tarde livre de compras na Via del Corso' }
        ]
      }
    ]
  },
  lisboa: {
    name: 'Lisboa, Portugal',
    title: 'Lisboa e Seus Encantos',
    desc: 'Explore o bairro de Alfama, prove pastéis de nata deliciosos e visite Belém.',
    days: [
      {
        day: 'Dia 1',
        title: 'Colinas & Elétrico 28',
        events: [
          { time: '09:30', title: 'Caminhada pela Praça do Comércio e Rossio' },
          { time: '11:00', title: 'Passeio panorâmico no Elétrico 28' },
          { time: '13:00', title: 'Almoço de bacalhau em Alfama' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Mosteiro e Torre de Belém',
        events: [
          { time: '09:30', title: 'Visita guiada no Mosteiro dos Jerónimos' },
          { time: '11:30', title: 'Provar pastéis de Belém na fábrica original' },
          { time: '14:00', title: 'Passeio de barco pelo Rio Tejo no pôr do sol' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'LX Factory & Cais do Sodré',
        events: [
          { time: '10:00', title: 'Tarde cultural na LX Factory' },
          { time: '13:30', title: 'Almoço no Mercado da Ribeira (Time Out Market)' },
          { time: '16:00', title: 'Relax no Miradouro de Santa Catarina' }
        ]
      }
    ]
  },
  londres: {
    name: 'Londres, Reino Unido',
    title: 'Londres Imperial',
    desc: 'Os marcos régios, museus gratuitos e modernidades de Londres.',
    days: [
      {
        day: 'Dia 1',
        title: 'Westminster e Big Ben',
        events: [
          { time: '09:30', title: 'Palácio de Buckingham e St. James\'s Park' },
          { time: '12:00', title: 'Westminster Abbey e fotos no Big Ben' },
          { time: '15:00', title: 'Voo panorâmico na roda gigante London Eye' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Torre de Londres e Pontes',
        events: [
          { time: '09:00', title: 'Visita guiada à histórica Torre de Londres' },
          { time: '12:30', title: 'Caminhada sobre a Tower Bridge' },
          { time: '14:00', title: 'Almoço gastronômico no Borough Market' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'Museu Britânico & Soho',
        events: [
          { time: '10:00', title: 'Visita ao British Museum' },
          { time: '13:30', title: 'Almoço e compras em Covent Garden' },
          { time: '16:00', title: 'Caminhada cultural pelas ruelas do Soho' }
        ]
      }
    ]
  },
  toquio: {
    name: 'Tóquio, Japão',
    title: 'Tóquio de Neon a Templos',
    desc: 'Explore Shibuya Crossing, templos milenares de Asakusa e robótica futurista.',
    days: [
      {
        day: 'Dia 1',
        title: 'Asakusa Clássico',
        events: [
          { time: '09:00', title: 'Templo Senso-ji e compras em Nakamise' },
          { time: '13:00', title: 'Almoço de Yakitori' },
          { time: '15:30', title: 'Vista aérea panorâmica da Tokyo Skytree' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Shibuya e Harajuku',
        events: [
          { time: '10:00', title: 'Santuário Meiji Jingu e ruelas de Harajuku' },
          { time: '13:00', title: 'Almoço de sushi em esteira rolante' },
          { time: '16:00', title: 'Cruzamento de Shibuya e pôr do sol no Shibuya Sky' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'Arte Digital e Odaiba',
        events: [
          { time: '09:30', title: 'Exposição de arte imersiva teamLab Planets' },
          { time: '13:00', title: 'Almoço de peixe fresco no Tsukiji Market' },
          { time: '15:30', title: 'Passeio pela baía futurista de Odaiba' }
        ]
      }
    ]
  },
  noruega: {
    name: 'Noruega (Fiordes & Aurora Boreal)',
    title: 'Fiordes Noruegueses & Aurora Boreal',
    desc: 'Uma expedição sob as luzes do norte e através dos fiordes mais profundos e belos do mundo.',
    days: [
      {
        day: 'Dia 1',
        title: 'Chegada a Oslo & Cultura Nórdica',
        events: [
          { time: '14:00', title: 'Check-in no The Thief Hotel (Oslo)' },
          { time: '16:00', title: 'Visita guiada ao Museu Munch e Ópera de Oslo' },
          { time: '20:00', title: 'Jantar de culinária neo-nórdica no Maaemo' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Voo para Tromsø & Caçada à Aurora Boreal',
        events: [
          { time: '09:00', title: 'Voo doméstico de Oslo para Tromsø (a capital do Ártico)' },
          { time: '14:00', title: 'Passeio pelo centro histórico e Catedral Ártica' },
          { time: '19:00', title: 'Expedição privativa de trenó para caça da Aurora Boreal' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'Navegação Silenciosa pelos Fiordes',
        events: [
          { time: '09:30', title: 'Cruzeiro híbrido elétrico pelas águas cristalinas do fiorde de Tromsø' },
          { time: '13:00', title: 'Almoço com degustação de iguarias árticas a bordo' },
          { time: '16:00', title: 'Retorno, relax em spa térmico e check-out' }
        ]
      }
    ]
  },
  maldivas: {
    name: 'Ilhas Maldivas (Oceano Índico)',
    title: 'Maldivas Exclusivo & Sob Medida',
    desc: 'O refúgio de praia perfeito em bangalôs luxuosos sobre as águas azul-turquesa cristalinas.',
    days: [
      {
        day: 'Dia 1',
        title: 'Transfer de Hidroavião & Bangalô de Luxo',
        events: [
          { time: '11:00', title: 'Transfer cênico de hidroavião para o Resort Soneva Jani' },
          { time: '14:00', title: 'Check-in no bangalô sobre as águas com tobogã privativo' },
          { time: '17:00', title: 'Sunset cocktail no bar flutuante com música ambiente' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Mergulho com Raias & Spa sobre a Água',
        events: [
          { time: '08:30', title: 'Snorkeling privado para nadar com tartarugas e arraias manta' },
          { time: '13:00', title: 'Almoço flutuante servido na piscina privativa do bangalô' },
          { time: '16:00', title: 'Massagem ayurvédica de casal no spa sobre a lagoa' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'Sandbank Privado & Jantar Sob as Estrelas',
        events: [
          { time: '10:00', title: 'Passeio de lancha rápida para piquenique gourmet em banco de areia deserto' },
          { time: '16:00', title: 'Tempo livre para stand-up paddle ou caiaque transparente' },
          { time: '19:30', title: 'Jantar privativo à luz de velas com churrasco de frutos do mar' }
        ]
      }
    ]
  },
  grecia: {
    name: 'Santorini & Atenas, Grécia',
    title: 'Grécia Clássica & Ilhas Egeias',
    desc: 'A fusão da história clássica ocidental em Atenas com a beleza cênica e romântica de Santorini.',
    days: [
      {
        day: 'Dia 1',
        title: 'Acrópole Histórica & Plaka',
        events: [
          { time: '09:00', title: 'Visita exclusiva com guia arqueológico à Acrópole e Museu' },
          { time: '13:00', title: 'Almoço grego tradicional nas ruelas charmosas de Plaka' },
          { time: '17:00', title: 'Caminhada ao topo do Monte Licabeto para vista de Atenas' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Voo para Santorini & Pôr do Sol em Oia',
        events: [
          { time: '08:00', title: 'Voo de Atenas para Santorini (ou balsa rápida classe VIP)' },
          { time: '13:00', title: 'Check-in em hotel boutique em penhasco da Caldera' },
          { time: '17:30', title: 'Degustação de vinhos locais e pôr do sol nas ruínas de Oia' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'Navegação na Caldera de Catamarã',
        events: [
          { time: '09:30', title: 'Cruzeiro privativo de catamarã pela Caldera, vulcão e fontes termais' },
          { time: '13:30', title: 'Almoço grego grelhado na hora a bordo do catamarã' },
          { time: '18:00', title: 'Retorno ao hotel e jantar com vista da Caldera iluminada' }
        ]
      }
    ]
  },
  safari: {
    name: 'Kruger Park & Cape Town, África do Sul',
    title: 'Safári de Luxo & Rota dos Vinhos',
    desc: 'A emoção dos Big Five na savana combinada ao charme cosmopolita de Cape Town e vinícolas.',
    days: [
      {
        day: 'Dia 1',
        title: 'Chegada a Cape Town & Table Mountain',
        events: [
          { time: '12:00', title: 'Check-in no The Silo Hotel (V&A Waterfront, Cape Town)' },
          { time: '15:00', title: 'Subida de teleférico à icônica Table Mountain' },
          { time: '20:00', title: 'Jantar contemporâneo africano no restaurante FYN' }
        ]
      },
      {
        day: 'Dia 2',
        title: 'Safári no Kruger Park (Big Five)',
        events: [
          { time: '06:00', title: 'Voo privado de Cape Town para a pista de pouso de Skukuza no Kruger' },
          { time: '13:00', title: 'Hospedagem no Singita Boulders Lodge à beira do rio' },
          { time: '15:30', title: 'Game Drive em veículo 4x4 aberto para avistar animais selvagens' }
        ]
      },
      {
        day: 'Dia 3',
        title: 'Safári ao Amanhecer & Stellenbosch',
        events: [
          { time: '05:30', title: 'Safári fotográfico matinal seguido de café da manhã na savana' },
          { time: '13:00', title: 'Retorno a Stellenbosch para tour privativo pelas vinícolas' },
          { time: '17:00', title: 'Transfer final e check-out' }
        ]
      }
    ]
  }
};

export default function PlannerClient({ preselectedDestinationSlug }) {
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);
  const [isLeadWallOpen, setIsLeadWallOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [step, setStep] = useState(preselectedDestinationSlug ? 1 : 0);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Selections
  const [destination, setDestination] = useState(preselectedDestinationSlug || '');
  const [style, setStyle] = useState('');
  const [duration, setDuration] = useState('');
  const [budget, setBudget] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const selectDestinationAndAdvance = (destId) => {
    setDestination(destId);
    setStep(1);
  };

  const selectStyleAndAdvance = (styleId) => {
    setStyle(styleId);
    setStep(2);
  };

  // Reset steps if preselected value changes
  useEffect(() => {
    if (preselectedDestinationSlug) {
      setDestination(preselectedDestinationSlug);
      setStep(1);
    }
  }, [preselectedDestinationSlug]);

  // Parse search parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlDestino = params.get('destino') || '';
      const urlStep = params.get('step') || '';
      
      if (urlDestino) {
        const destSlug = urlDestino.toLowerCase().trim();
        setDestination(destSlug);
        setSearchQuery(urlDestino);
        
        if (urlStep === '2' || !urlStep) {
          setStep(1); // Set to Step 1 (which is Passo 2 of 3)
        }
      }
    }
  }, []);

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      triggerLoadingSequence();
    }
  };

  const handlePrev = () => {
    if (step > (preselectedDestinationSlug ? 1 : 0)) {
      setStep(step - 1);
    } else if (preselectedDestinationSlug && step === 1) {
      // If we go back from step 1 when preselected, do nothing or allow changing destination
      setStep(0);
    }
  };

  const triggerLoadingSequence = () => {
    setLoading(true);
    const statuses = [
      'Analisando seu perfil de viajante...',
      'Mapeando melhores rotas locais...',
      'Buscando atrações gastronômicas exclusivas...',
      'Otimizando horários e conexões...',
      'Criando roteiro sob medida...'
    ];

    let currentIdx = 0;
    setLoadingText(statuses[0]);

    const interval = setInterval(() => {
      currentIdx++;
      if (currentIdx < statuses.length) {
        setLoadingText(statuses[currentIdx]);
      } else {
        clearInterval(interval);
        setLoading(false);
        setShowResults(true);
      }
    }, 600);
  };

  const handleReset = () => {
    setStep(preselectedDestinationSlug ? 1 : 0);
    setDestination(preselectedDestinationSlug || '');
    setStyle('');
    setDuration('');
    setBudget('');
    setShowResults(false);
    setIsUnlocked(false);
  };

  const handleUnlockSuccess = () => {
    setIsUnlocked(true);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#081B6B', '#F47A20', '#96AB21']
    });
  };

  const isNextDisabled = () => {
    if (step === 0) return !destination;
    if (step === 1) return !style;
    if (step === 2) return !duration || !budget;
    return true;
  };

  // Resolve active itinerary (with custom generator fallback for unknown destinations)
  let activeItinerary = itineraryDatabase[destination];
  if (!activeItinerary && destination) {
    // Capitalize destination name
    const formattedName = destination.charAt(0).toUpperCase() + destination.slice(1);
    
    // Choose style description label
    let styleText = 'Personalizado';
    if (style === 'aventura') styleText = 'Aventura & Natureza';
    else if (style === 'cultura') styleText = 'Cultural & Histórico';
    else if (style === 'natureza') styleText = 'Relax & Bem-Estar';
    else if (style === 'gastronomia') styleText = 'Gastronomia & Luxo';

    activeItinerary = {
      name: formattedName,
      title: `${formattedName}: Roteiro ${styleText}`,
      desc: `Um planejamento exclusivo feito sob medida para você explorar o melhor de ${formattedName} com foco em ${styleText.toLowerCase()}.`,
      days: [
        {
          day: 'Dia 1',
          title: 'Chegada & Ambientação local',
          events: [
            { time: '14:00', title: `Check-in em hotel boutique de alto padrão em ${formattedName}` },
            { time: '16:30', title: `Passeio guiado a pé pelos pontos mais emblemáticos de ${formattedName}` },
            { time: '20:00', title: `Jantar de boas-vindas com pratos tradicionais locais` }
          ]
        },
        {
          day: 'Dia 2',
          title: style === 'aventura' ? 'Aventura & Ação no Destino' : style === 'cultura' ? 'Arte & Imersão Cultural' : style === 'natureza' ? 'Natureza, Relax & Bem-Estar' : 'Experiências Gastronômicas Exclusivas',
          events: [
            { time: '09:00', title: style === 'aventura' ? `Trilha panorâmica ou exploração com adrenalina ao redor de ${formattedName}` : style === 'cultura' ? `Visita privativa a museus clássicos e monumentos históricos de ${formattedName}` : style === 'natureza' ? `Visita guiada a parques ecológicos, lagos ou praias relaxantes` : `Tour gourmet guiado pelos mercados locais e bairros históricos` },
            { time: '13:00', title: `Almoço gourmet especial com indicação de nossos curadores` },
            { time: '15:30', title: style === 'aventura' ? `Prática de esportes ao ar livre e rotas cênicas off-road` : style === 'cultura' ? `Visita arquitetônica exclusiva com guia local historiador` : style === 'natureza' ? `Sessão de SPA premium ou meditação ao pôr do sol` : `Degustação VIP de vinhos locais ou workshop com Chef regional` },
            { time: '20:30', title: budget === 'luxo' ? `Experiência Premium: Jantar de gala ou em restaurante estrelado Michelin em ${formattedName}` : `Jantar aconchegante em bistrô tradicional com excelente custo-benefício` }
          ]
        },
        {
          day: 'Dia 3',
          title: 'Descobertas Finais & Despedida',
          events: [
            { time: '10:00', title: `Visita a mirantes locais e compras em boutiques artesanais` },
            { time: '13:30', title: `Almoço de despedida em restaurante com vista panorâmica` },
            { time: '16:00', title: `Check-out, transfer privado e retorno` }
          ]
        }
      ]
    };
  } else if (!activeItinerary) {
    activeItinerary = itineraryDatabase.rio;
  }

  return (
    <div className="w-full bg-[#F7F8FA] min-h-screen flex flex-col justify-between selection:bg-brand-orange/20 selection:text-brand-navy">
      <Header onOpenDownload={() => setIsDownloadOpen(true)} />

      <main className="flex-grow">
        {/* Planner Hero Header */}
        <section className="container mx-auto px-6 pt-36 pb-12 text-center max-w-3xl">
          <span className="bg-brand-navy/10 text-brand-navy text-[10px] font-extrabold tracking-widest px-3 py-1.5 rounded-full w-fit mx-auto">
            ALGORITMO DE CURADORIA
          </span>
          <h1 className="font-headers text-3.5xl sm:text-5xl md:text-6xl font-extrabold text-brand-navy mt-6 mb-6 leading-tight">
            Planeje sua jornada.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-text-muted max-w-[600px] mx-auto leading-relaxed">
            {preselectedDestinationSlug ? `Crie seu roteiro ideal para ${activeItinerary.name || destination} em segundos.` : 'Escolha suas preferências e deixe nossa tecnologia criar o roteiro personalizado perfeito em segundos.'}
          </p>
        </section>

        {/* Wizard Form and Results */}
        <section className="py-12 bg-bg-light">
          <div className="container mx-auto px-6 max-w-4xl">
            
            {/* 1. Step-by-step Wizard Form */}
            {!loading && !showResults && (
              <div className="bg-white border border-border-gray p-8 md:p-12 rounded-[28px] shadow-md min-h-[420px] flex flex-col justify-between text-left">
                
                {/* Step 0: Destination */}
                {step === 0 && (
                  <div className="animate-fade-in-up">
                    <span className="bg-brand-navy/10 text-brand-navy text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit">
                      PASSO 1 DE 3
                    </span>
                    <h2 className="font-headers text-2xl md:text-3xl font-bold mt-4 text-brand-navy">
                      Para onde você vai viajar?
                    </h2>
                    <p className="text-sm text-text-muted mt-2">Busque por país, cidade ou tipo de experiência.</p>
                    
                    {/* Search Input */}
                    <div className="mt-5 relative">
                      <input
                        type="text"
                        placeholder="Pesquise por 'Itália', 'Lua de Mel', 'Aurora Boreal', 'Gramado'..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-border-gray px-5 py-3.5 rounded-xl text-base font-semibold text-brand-navy placeholder:text-text-muted/50 focus:outline-none focus:border-brand-navy focus:bg-white transition-all shadow-xs"
                      />
                    </div>

                    {/* Pre-search tags (Destinos Populares & Experiências) */}
                    {searchQuery === '' && (
                      <div className="mt-6 flex flex-col gap-4">
                        <div>
                          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider block mb-2">Destinos Populares</span>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { id: 'toquio', label: 'Japão 🇯🇵' },
                              { id: 'roma', label: 'Itália 🇮🇹' },
                              { id: 'grecia', label: 'Grécia 🇬🇷' },
                              { id: 'noruega', label: 'Noruega 🏔️' },
                              { id: 'maldivas', label: 'Maldivas 🏖️' },
                              { id: 'noronha', label: 'Noronha 🏝️' }
                            ].map(tag => (
                              <button
                                key={tag.id}
                                onClick={() => selectDestinationAndAdvance(tag.id)}
                                className="px-3.5 py-2 rounded-full border border-border-gray hover:border-brand-navy text-xs font-bold text-brand-navy bg-white transition-all cursor-pointer hover:scale-[1.02] shadow-xs"
                              >
                                {tag.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider block mb-2">Experiências & Regiões</span>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { id: 'noronha', label: '👩‍❤️‍👨 Lua de Mel' },
                              { id: 'noruega', label: '🌌 Aurora Boreal' },
                              { id: 'safari', label: '🦁 Safári' },
                              { id: 'gramado', label: '🍷 Vinícolas' },
                              { id: 'roma', label: '🍝 Gastronomia' }
                            ].map(tag => (
                              <button
                                key={tag.label}
                                onClick={() => selectDestinationAndAdvance(tag.id)}
                                className="px-3.5 py-2 rounded-full border border-border-gray hover:border-brand-orange text-xs font-semibold text-brand-navy bg-white transition-all cursor-pointer hover:scale-[1.02] shadow-xs"
                              >
                                {tag.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
                      {[
                        { id: 'paris', label: 'Paris, França', icon: '🇫🇷', desc: 'A capital da luz, museus e culinária.', tags: ['França', 'Europa', 'Romance', 'Cultura', 'Gastronomia'] },
                        { id: 'roma', label: 'Roma, Itália', icon: '🇮🇹', desc: 'História milenar e praças barrocas.', tags: ['Itália', 'Europa', 'Cultura', 'Gastronomia', 'História', 'Vinícolas'] },
                        { id: 'lisboa', label: 'Lisboa, Portugal', icon: '🇵🇹', desc: 'História, bondes e pastéis de nata.', tags: ['Portugal', 'Europa', 'Cultura', 'Litoral', 'Gastronomia'] },
                        { id: 'londres', label: 'Londres, Reino Unido', icon: '🇬🇧', desc: 'Realeza, museus grátis e pubs.', tags: ['Reino Unido', 'Inglaterra', 'Europa', 'Cultura', 'História'] },
                        { id: 'toquio', label: 'Tóquio, Japão', icon: '🇯🇵', desc: 'Arranha-céus neon e santuários.', tags: ['Japão', 'Ásia', 'Cultura', 'Tecnologia', 'Gastronomia'] },
                        { id: 'noronha', label: 'Fernando de Noronha', icon: '🏝️', desc: 'Ecoturismo exclusivo e praias.', tags: ['Brasil', 'América do Sul', 'Praia', 'Ecoturismo', 'Lua de Mel', 'Romance'] },
                        { id: 'rio', label: 'Rio de Janeiro', icon: '🏖️', desc: 'Cultura vibrante e charme carioca.', tags: ['Brasil', 'América do Sul', 'Praia', 'Cultura', 'Litoral'] },
                        { id: 'veadeiros', label: 'Chapada dos Veadeiros', icon: '✨', desc: 'Misticismo e cachoeiras de cristal.', tags: ['Brasil', 'América do Sul', 'Cachoeira', 'Ecoturismo', 'Misticismo'] },
                        { id: 'amazonas', label: 'Amazônia', icon: '🐆', desc: 'Eco-lodges e imersão profunda.', tags: ['Brasil', 'América do Sul', 'Floresta', 'Ecoturismo', 'Aventura', 'Safári'] },
                        { id: 'gramado', label: 'Serra Gaúcha', icon: '🍷', desc: 'Vinho, fondue e charme europeu.', tags: ['Brasil', 'América do Sul', 'Serra', 'Vinícolas', 'Gastronomia', 'Romance'] },
                        { id: 'noruega', label: 'Noruega', icon: '🏔️', desc: 'Fiordes, chalés de madeira e Aurora Boreal.', tags: ['Noruega', 'Europa', 'Fiordes', 'Aurora Boreal', 'Frio', 'Natureza'] },
                        { id: 'maldivas', label: 'Maldivas', icon: '🏖️', desc: 'Bangalôs sobre a água e areia branca.', tags: ['Maldivas', 'Ásia', 'Praia', 'Romance', 'Lua de Mel', 'Ilhas'] },
                        { id: 'grecia', label: 'Grécia', icon: '🇬🇷', desc: 'Santorini romântica e história em Atenas.', tags: ['Grécia', 'Europa', 'Praia', 'Romance', 'Lua de Mel', 'História'] },
                        { id: 'safari', label: 'África do Sul', icon: '🦁', desc: 'Safáris de luxo e a Rota dos Vinhos.', tags: ['África do Sul', 'África', 'Safári', 'Natureza', 'Vinícolas', 'Aventura'] }
                      ].filter(opt => {
                        if (searchQuery === '') return true;
                        const query = searchQuery.toLowerCase().trim();
                        return (
                          opt.label.toLowerCase().includes(query) ||
                          opt.desc.toLowerCase().includes(query) ||
                          opt.tags.some(tag => tag.toLowerCase().includes(query))
                        );
                      }).map(opt => (
                        <button 
                          key={opt.id}
                          onClick={() => selectDestinationAndAdvance(opt.id)}
                          className={`text-left p-4 sm:p-5 rounded-[20px] border transition-all duration-300 cursor-pointer flex flex-col gap-1.5 bg-white ${
                            destination === opt.id 
                              ? 'border-brand-navy bg-brand-navy/5 shadow-sm' 
                              : 'border-border-gray hover:border-brand-navy/30 hover:shadow-md'
                          }`}
                        >
                          <span className="text-2xl">{opt.icon}</span>
                          <h4 className="font-headers text-base font-bold text-brand-navy">{opt.label}</h4>
                          <p className="text-xs text-text-muted">{opt.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 1: Style */}
                {step === 1 && (
                  <div className="animate-fade-in-up">
                    <span className="bg-brand-navy/10 text-brand-navy text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit">
                      PASSO 2 DE 3
                    </span>
                    <h2 className="font-headers text-2xl md:text-3xl font-bold mt-4 text-brand-navy">
                      Qual é o estilo da sua viagem?
                    </h2>
                    <p className="text-xs text-text-muted mt-2">Personalize a curadoria das atividades sugeridas.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
                      {[
                        { id: 'aventura', label: 'Aventura & Ação', icon: '🧗', desc: 'Trilhas, mirantes desafiadores e esportes ao ar livre.' },
                        { id: 'cultura', label: 'Cultural & Histórico', icon: '🏛️', desc: 'Museus renomados, monumentos históricos e passeios guiados.' },
                        { id: 'natureza', label: 'Natureza & Bem-Estar', icon: '🌿', desc: 'Spas relaxantes, refúgios naturais e águas termais.' },
                        { id: 'gastronomia', label: 'Alta Gastronomia', icon: '🍽️', desc: 'Festivais gastronômicos, risoterias e jantares exclusivos.' }
                      ].map(opt => (
                        <button 
                          key={opt.id}
                          onClick={() => selectStyleAndAdvance(opt.id)}
                          className={`text-left p-6 rounded-[20px] border transition-all duration-300 cursor-pointer flex flex-col gap-2 bg-white ${
                            style === opt.id 
                              ? 'border-brand-navy bg-brand-navy/5 shadow-sm' 
                              : 'border-border-gray hover:border-brand-navy/30 hover:shadow-md'
                          }`}
                        >
                          <span className="text-3xl">{opt.icon}</span>
                          <h4 className="font-headers text-base font-bold text-brand-navy">{opt.label}</h4>
                          <p className="text-sm text-text-muted">{opt.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Duration and budget */}
                {step === 2 && (
                  <div className="animate-fade-in-up">
                    <span className="bg-brand-navy/10 text-brand-navy text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit">
                      PASSO 3 DE 3
                    </span>
                    <h2 className="font-headers text-2xl md:text-3xl font-bold mt-4 text-brand-navy">
                      Duração e Orçamento
                    </h2>
                    <p className="text-sm text-text-muted mt-2">Ajuste o período desejado e nível de conforto da viagem.</p>
                    
                    <h3 className="text-sm font-headers text-brand-navy/80 font-bold mt-6 mb-3 uppercase tracking-wider">Duração da Viagem</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { id: '3', label: 'Curta (3 Dias)', icon: '⏱️', desc: 'Foco no essencial.' },
                        { id: '5', label: 'Padrão (5 Dias)', icon: '🗓️', desc: 'Exploração ideal.' },
                        { id: '7', label: 'Imersiva (7 Dias)', icon: '✈️', desc: 'Sem pressa.' }
                      ].map(opt => (
                        <button 
                          key={opt.id}
                          onClick={() => setDuration(opt.id)}
                          className={`text-left p-5 rounded-[20px] border transition-all duration-300 cursor-pointer flex flex-col gap-1 bg-white ${
                            duration === opt.id 
                              ? 'border-brand-navy bg-brand-navy/5 shadow-sm' 
                              : 'border-border-gray hover:border-brand-navy/30 hover:shadow-md'
                          }`}
                        >
                          <span className="text-2xl">{opt.icon}</span>
                          <h4 className="font-headers text-sm font-bold text-brand-navy">{opt.label}</h4>
                          <p className="text-xs text-text-muted">{opt.desc}</p>
                        </button>
                      ))}
                    </div>

                    <h3 className="text-sm font-headers text-brand-navy/80 font-bold mt-6 mb-3 uppercase tracking-wider">Orçamento Estimado</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { id: 'moderado', label: 'Padrão Moderado', icon: '💳', desc: 'Curadoria gastronômica de ótimo custo.' },
                        { id: 'luxo', label: 'Alto Luxo Premium', icon: '👑', desc: 'Experiências vips exclusivas e iates.' }
                      ].map(opt => (
                        <button 
                          key={opt.id}
                          onClick={() => setBudget(opt.id)}
                          className={`text-left p-5 rounded-[20px] border transition-all duration-300 cursor-pointer flex flex-col gap-1 bg-white ${
                            budget === opt.id 
                              ? 'border-brand-navy bg-brand-navy/5 shadow-sm' 
                              : 'border-border-gray hover:border-brand-navy/30 hover:shadow-md'
                          }`}
                        >
                          <span className="text-2xl">{opt.icon}</span>
                          <h4 className="font-headers text-sm font-bold text-brand-navy">{opt.label}</h4>
                          <p className="text-xs text-text-muted">{opt.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation Controls */}
                <div className="flex justify-between items-center mt-12 pt-6 border-t border-border-gray w-full">
                  <button 
                    onClick={handlePrev} 
                    disabled={preselectedDestinationSlug ? step === 1 : step === 0}
                    className="btn btn-outline cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
                  </button>
                  <button 
                    onClick={handleNext} 
                    disabled={isNextDisabled()}
                    className={`btn cursor-pointer ${
                      step === 2 ? 'btn-primary' : 'btn-outline'
                    } disabled:opacity-30 disabled:pointer-events-none`}
                  >
                    {step === 2 ? 'Gerar Roteiro' : 'Avançar'} <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>

              </div>
            )}

            {/* 2. Loading Sequence */}
            {loading && (
              <div className="bg-white border border-border-gray p-12 rounded-[28px] shadow-md flex flex-col items-center justify-center gap-6 py-20 text-center animate-fade-in-up">
                <div className="w-12 h-12 border-4 border-border-gray border-t-brand-orange rounded-full animate-spin"></div>
                <h3 className="font-headers text-xl md:text-2xl font-bold text-brand-navy mt-2">
                  {loadingText}
                </h3>
                <p className="text-xs text-text-muted">Analisando parâmetros locais...</p>
              </div>
            )}

            {/* 3. Planner Results Panel */}
            {showResults && (
              <div className="animate-fade-in-up">
                {/* Results Header */}
                <div className="bg-white border border-border-gray p-6 sm:p-8 rounded-[24px] shadow-md mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-left">
                  <div>
                    <span className="bg-brand-orange text-white text-[10px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit">
                      ROTEIRO PERSONALIZADO
                    </span>
                    <h2 className="font-headers text-2xl md:text-3.5xl font-bold text-brand-navy mt-3 leading-tight">
                      {activeItinerary.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-text-muted mt-2 max-w-[500px] leading-relaxed">
                      {activeItinerary.desc}
                    </p>
                  </div>
                  
                  <div className="flex gap-3 w-full md:w-auto shrink-0">
                    <button 
                      onClick={() => setIsDownloadOpen(true)}
                      className="btn btn-primary justify-center shadow-sm cursor-pointer flex-1 sm:flex-initial"
                    >
                      <Smartphone className="w-4 h-4 mr-2" /> Salvar no App
                    </button>
                    <button 
                      onClick={handleReset}
                      className="btn btn-outline cursor-pointer px-4"
                      aria-label="Refazer"
                    >
                      <RotateCcw className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>

                {/* Conversion Hook Warning */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-brand-navy/5 border border-brand-navy/10 p-6 rounded-[20px] flex gap-4 text-left items-start">
                    <ShieldAlert className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <span className="font-headers text-xs font-bold text-brand-navy uppercase tracking-widest">
                        Utilize Offline no seu Celular
                      </span>
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">
                        Baixe o app 2GO para usar este roteiro com mapas offline ativos, GPS e controle de gastos em tempo real durante a viagem.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#FAF9F6] border border-brand-navy/10 p-6 rounded-[20px] flex gap-4 text-left items-start">
                    <span className="text-xl shrink-0 mt-0.5">🤝</span>
                    <div>
                      <span className="font-headers text-xs font-bold text-brand-orange uppercase tracking-widest block">
                        A tecnologia organiza. Especialistas aperfeiçoam.
                      </span>
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">
                        Seu roteiro foi desenhado com tecnologia de ponta. Deseja que especialistas revisem sua logística e incluam serviços vip? Ative o suporte no app.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Day-by-Day Timeline */}
                <div className="relative pl-8 flex flex-col gap-6 before:content-[''] before:absolute before:top-0 before:left-3.5 before:w-[2px] before:h-full before:bg-border-gray text-left">
                  {activeItinerary.days.map((day, idx) => {
                    const isGated = idx > 0 && !isUnlocked;

                    return (
                      <div 
                        key={idx} 
                        className={`relative bg-white border border-border-gray p-6 rounded-[20px] shadow-sm transition-all duration-300 ${
                          isGated ? 'min-h-[220px] overflow-hidden' : ''
                        }`}
                      >
                        {/* Dot */}
                        <div className="absolute top-8 left-[calc(-32px-8px)] w-6 h-6 rounded-full bg-[#F7F8FA] border-2 border-brand-navy flex items-center justify-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-brand-orange shadow-[0_2px_6px_rgba(244,122,32,0.4)]"></div>
                        </div>

                        {isGated ? (
                          /* Gated Day Cover Layer */
                          <>
                            <div className="filter blur-sm pointer-events-none select-none opacity-40">
                              <span className="font-headers text-xs font-bold text-brand-orange uppercase tracking-wider">
                                {day.day}
                              </span>
                              <h3 className="font-headers text-lg sm:text-xl font-bold text-brand-navy mt-1 mb-4">
                                {day.title}
                              </h3>
                              <ul className="flex flex-col gap-3.5 list-none m-0 p-0">
                                {day.events.map((evt, eIdx) => (
                                  <li key={eIdx} className="flex gap-4 text-xs sm:text-sm items-start">
                                    <span className="font-headers text-[10px] font-bold text-brand-navy bg-bg-light border border-border-gray px-2 py-0.5 rounded whitespace-nowrap">
                                      {evt.time}
                                    </span>
                                    <div>{evt.title}</div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {/* Locking Overlay Card */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-xs p-6 text-center z-10">
                              <Lock className="w-8 h-8 text-brand-orange mb-2 animate-[bounce_3s_infinite_ease-in-out]" />
                              <h4 className="font-headers text-sm font-extrabold text-brand-navy">Roteiro Bloqueado</h4>
                              <p className="text-[10px] text-text-muted mt-1 mb-4 max-w-[280px]">Insira seus dados para liberar todos os dias, horários e transporte off-line.</p>
                              <button 
                                onClick={() => setIsLeadWallOpen(true)} 
                                className="btn btn-secondary btn-sm shadow-md shadow-brand-orange/20 cursor-pointer text-xs"
                              >
                                Desbloquear Roteiro Completo
                              </button>
                            </div>
                          </>
                        ) : (
                          /* Unlocked / Day 1 Full Display */
                          <>
                            <span className="font-headers text-xs font-bold text-brand-orange uppercase tracking-wider">
                              {day.day}
                            </span>
                            <h3 className="font-headers text-lg sm:text-xl font-bold text-brand-navy mt-1 mb-4">
                              {day.title}
                            </h3>
                            
                            <ul className="flex flex-col gap-3.5 list-none m-0 p-0">
                              {day.events.map((evt, eIdx) => (
                                <li key={eIdx} className="flex gap-4 text-xs sm:text-sm text-text-main items-start">
                                  <span className="font-headers text-[10px] font-bold text-brand-navy bg-bg-light border border-border-gray px-2 py-0.5 rounded mt-0.5 whitespace-nowrap">
                                    {evt.time}
                                  </span>
                                  <div className="leading-relaxed mt-0.5">{evt.title}</div>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Call to Action banner */}
                {isUnlocked && (
                  <div className="bg-brand-navy text-white p-8 md:p-12 rounded-[28px] mt-12 text-center flex flex-col items-center gap-4 shadow-lg border border-brand-navy animate-fade-in-up">
                    <h3 className="font-headers text-xl md:text-3xl font-extrabold tracking-tight">
                      Sua viagem com você, em qualquer lugar 🗺️
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 max-w-[520px] leading-relaxed">
                      Agora que seu roteiro está completo, importe para o aplicativo 2GO e acesse mapas, direções por GPS e vouchers de forma 100% offline.
                    </p>
                    <div className="flex gap-4 mt-4 w-full justify-center max-w-[420px] flex-col sm:flex-row">
                      <button 
                        onClick={() => setIsDownloadOpen(true)}
                        className="btn btn-secondary py-3.5 px-6 shadow-md cursor-pointer hover:bg-white hover:text-brand-navy flex-1 text-center justify-center font-bold"
                      >
                        Sincronizar no Celular
                      </button>
                      <button 
                        onClick={handleReset}
                        className="btn border border-white/30 text-white bg-transparent py-3.5 px-6 hover:bg-white/10 hover:border-white transition-all cursor-pointer flex-1 text-center justify-center font-bold"
                      >
                        Criar Outro Roteiro
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </section>
      </main>

      <Footer onOpenDownload={() => setIsDownloadOpen(true)} />
      
      <AppDownloadModal 
        isOpen={isDownloadOpen} 
        onClose={() => setIsDownloadOpen(false)} 
      />

      <LeadWallModal 
        isOpen={isLeadWallOpen}
        onClose={() => setIsLeadWallOpen(false)}
        onUnlock={handleUnlockSuccess}
        destinationName={activeItinerary.name}
      />
    </div>
  );
}

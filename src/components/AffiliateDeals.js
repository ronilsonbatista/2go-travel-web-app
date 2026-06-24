"use client";

import React, { useState } from 'react';
import { Hotel, Compass, ShieldCheck, Car, Star, ExternalLink, ArrowRight } from 'lucide-react';
import { trackHotelClick, trackTourClick, trackInsuranceClick, trackCarClick } from '@/lib/analytics';

// Lookup table for destination-specific mock affiliate offers
const affiliateDatabase = {
  paris: {
    hotels: [
      { name: 'Hotel Regina Louvre', rating: 4.8, price: 'R$ 1.950/noite', image: 'https://images.unsplash.com/photo-1556784344-ad913c73cfc6?auto=format&fit=crop&w=400&q=80', partner: 'Booking.com', link: 'https://booking.com/partner-regina-louvre' },
      { name: 'Le Bristol Paris', rating: 4.9, price: 'R$ 4.200/noite', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80', partner: 'Hoteis.com', link: 'https://hoteis.com/partner-le-bristol' }
    ],
    tours: [
      { name: 'Acesso Prioritário à Torre Eiffel e Cúpula', duration: '2h', price: 'R$ 290', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80', partner: 'GetYourGuide', link: 'https://getyourguide.com/eiffel-priority' },
      { name: 'Cruzeiro com Jantar no Rio Sena', duration: '3h', price: 'R$ 580', image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=400&q=80', partner: 'Civitatis', link: 'https://civitatis.com/seine-dinner-cruise' }
    ]
  },
  roma: {
    hotels: [
      { name: 'Singer Palace Hotel', rating: 4.8, price: 'R$ 1.780/noite', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=80', partner: 'Booking.com', link: 'https://booking.com/singer-palace' },
      { name: 'Hotel Artemide', rating: 4.7, price: 'R$ 1.250/noite', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80', partner: 'Expedia', link: 'https://expedia.com/hotel-artemide' }
    ],
    tours: [
      { name: 'Tour Exclusivo sem Filas pelo Coliseu e Fórum Romano', duration: '3h', price: 'R$ 280', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=400&q=80', partner: 'Civitatis', link: 'https://civitatis.com/colosseum-skip-line' },
      { name: 'Ingressos do Museu do Vaticano e Capela Sistina', duration: '4h', price: 'R$ 390', image: 'https://images.unsplash.com/photo-1529260830199-4455b9c24db3?auto=format&fit=crop&w=400&q=80', partner: 'Viator', link: 'https://viator.com/vatican-museum-tour' }
    ]
  },
  lisboa: {
    hotels: [
      { name: 'Pousada de Lisboa - Praça do Comércio', rating: 4.7, price: 'R$ 1.480/noite', image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80', partner: 'Booking.com', link: 'https://booking.com/pousada-lisboa' },
      { name: 'H10 Duque de Loulé', rating: 4.6, price: 'R$ 950/noite', image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80', partner: 'Hoteis.com', link: 'https://hoteis.com/h10-duque' }
    ],
    tours: [
      { name: 'Excursão de um dia para Sintra, Regaleira e Cascais', duration: '8h', price: 'R$ 390', image: 'https://images.unsplash.com/photo-1589146995648-52277d34c26a?auto=format&fit=crop&w=400&q=80', partner: 'GetYourGuide', link: 'https://getyourguide.com/sintra-cais-day-trip' },
      { name: 'Passeio Tradicional de Veleiro ao Pôr do Sol no Tejo', duration: '2h', price: 'R$ 180', image: 'https://images.unsplash.com/photo-1509840144299-8509b31f79fc?auto=format&fit=crop&w=400&q=80', partner: 'Civitatis', link: 'https://civitatis.com/tejo-sunset-sail' }
    ]
  },
  londres: {
    hotels: [
      { name: 'The Savoy', rating: 4.9, price: 'R$ 3.500/noite', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=400&q=80', partner: 'Booking.com', link: 'https://booking.com/savoy-london' },
      { name: 'CitizenM Tower of London', rating: 4.6, price: 'R$ 1.100/noite', image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=400&q=80', partner: 'Expedia', link: 'https://expedia.com/citizenm-tower' }
    ],
    tours: [
      { name: 'Entrada na London Eye com Acesso Rápido', duration: '1h', price: 'R$ 270', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ca1ad?auto=format&fit=crop&w=400&q=80', partner: 'GetYourGuide', link: 'https://getyourguide.com/london-eye-fast' },
      { name: 'Excursão de Ônibus Temático com Chá da Tarde', duration: '1.5h', price: 'R$ 340', image: 'https://images.unsplash.com/photo-1515586838455-8f8f940d6853?auto=format&fit=crop&w=400&q=80', partner: 'Viator', link: 'https://viator.com/london-bus-tea' }
    ]
  },
  toquio: {
    hotels: [
      { name: 'Park Hyatt Tokyo', rating: 4.9, price: 'R$ 3.800/noite', image: 'https://images.unsplash.com/photo-1549294413-26f195afcbbe?auto=format&fit=crop&w=400&q=80', partner: 'Booking.com', link: 'https://booking.com/park-hyatt-tokyo' },
      { name: 'Hotel Gracery Shinjuku', rating: 4.5, price: 'R$ 980/noite', image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=400&q=80', partner: 'Hoteis.com', link: 'https://hoteis.com/gracery-shinjuku' }
    ],
    tours: [
      { name: 'Ingresso do Deck Principal da Tokyo Skytree', duration: '2h', price: 'R$ 140', image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80', partner: 'Civitatis', link: 'https://civitatis.com/tokyo-skytree' },
      { name: 'Excursão Diária ao Monte Fuji e Hakone com Almoço', duration: '10h', price: 'R$ 680', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=400&q=80', partner: 'GetYourGuide', link: 'https://getyourguide.com/fuji-hakone-trip' }
    ]
  },
  santorini: {
    hotels: [
      { name: 'Katikies Santorini', rating: 4.9, price: 'R$ 4.500/noite', image: 'https://images.unsplash.com/photo-1570183182745-d2b21ee24a35?auto=format&fit=crop&w=400&q=80', partner: 'Booking.com', link: 'https://booking.com/katikies-santorini' },
      { name: 'Grace Hotel Auberge Resorts', rating: 4.9, price: 'R$ 5.900/noite', image: 'https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=400&q=80', partner: 'Hoteis.com', link: 'https://hoteis.com/grace-hotel' }
    ],
    tours: [
      { name: 'Cruzeiro de Catamarã na Caldeira ao Pôr do Sol com Jantar', duration: '5h', price: 'R$ 720', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80', partner: 'GetYourGuide', link: 'https://getyourguide.com/santorini-catamaran' },
      { name: 'Tour Privado de Degustação de Vinhos Vulcânicos', duration: '4h', price: 'R$ 590', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80', partner: 'Civitatis', link: 'https://civitatis.com/santorini-wine-tour' }
    ]
  },
  noruega: {
    hotels: [
      { name: 'The Thief Oslo', rating: 4.8, price: 'R$ 1.980/noite', image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=400&q=80', partner: 'Booking.com', link: 'https://booking.com/the-thief-oslo' }
    ],
    tours: [
      { name: 'Cruzeiro Clássico pelos Fiordes de Oslo', duration: '2h', price: 'R$ 220', image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=400&q=80', partner: 'GetYourGuide', link: 'https://getyourguide.com/oslo-fjord-cruise' }
    ]
  },
  capadocia: {
    hotels: [
      { name: 'Museum Hotel Cappadocia', rating: 4.9, price: 'R$ 2.800/noite', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', partner: 'Booking.com', link: 'https://booking.com/museum-hotel' }
    ],
    tours: [
      { name: 'Voo de Balão ao Nascer do Sol na Capadócia', duration: '3h', price: 'R$ 980', image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=400&q=80', partner: 'Civitatis', link: 'https://civitatis.com/cappadocia-balloon' }
    ]
  },
  gramado: {
    hotels: [
      { name: 'Hotel Colline de France', rating: 5.0, price: 'R$ 1.100/noite', image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80', partner: 'Booking.com', link: 'https://booking.com/colline-de-france' }
    ],
    tours: [
      { name: 'Tour de Maria Fumaça, Epopeia Italiana e Vinícolas', duration: '8h', price: 'R$ 290', image: 'https://images.unsplash.com/photo-1516594709406-e8a17a1537e6?auto=format&fit=crop&w=400&q=80', partner: 'Civitatis', link: 'https://civitatis.com/gramado-maria-fumaca' }
    ]
  },
  'fernando-de-noronha': {
    hotels: [
      { name: 'Pousada Nannai Fernando de Noronha', rating: 4.9, price: 'R$ 3.200/noite', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80', partner: 'Booking.com', link: 'https://booking.com/nannai-noronha' }
    ],
    tours: [
      { name: 'Passeio de Barco Tradicional com Mergulho a Reboque', duration: '4h', price: 'R$ 250', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', partner: 'Civitatis', link: 'https://civitatis.com/noronha-passeio-barco' }
    ]
  }
};

const defaultAffiliateData = {
  hotels: [
    { name: 'Boutique Hotel Plaza', rating: 4.7, price: 'R$ 950/noite', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80', partner: 'Booking.com', link: 'https://booking.com/generic-boutique' },
    { name: 'Grand Palace Suites', rating: 4.6, price: 'R$ 1.350/noite', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80', partner: 'Hoteis.com', link: 'https://hoteis.com/generic-grand' }
  ],
  tours: [
    { name: 'Tour de Orientação e Principais Pontos de Interesse', duration: '3h', price: 'R$ 150', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=400&q=80', partner: 'GetYourGuide', link: 'https://getyourguide.com/generic-orientation' },
    { name: 'Passeio Gastronômico com Chef Local e Provas', duration: '2.5h', price: 'R$ 290', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=400&q=80', partner: 'Civitatis', link: 'https://civitatis.com/generic-food' }
  ]
};

export default function AffiliateDeals({ destination }) {
  const [activeTab, setActiveTab] = useState('hotels'); // 'hotels' | 'tours' | 'insurance'
  const destSlug = destination?.slug || 'generic';
  
  const currentOffers = affiliateDatabase[destSlug] || defaultAffiliateData;

  const handleHotelClick = (hotel) => {
    trackHotelClick(hotel.name, hotel.partner);
    if (typeof window !== 'undefined') {
      window.open(hotel.link, '_blank');
      // Simulate conversion record in local storage
      const stats = JSON.parse(localStorage.getItem('admin_stats') || '{"clicks":0,"revenue":0,"conversions":0}');
      stats.clicks += 1;
      stats.revenue += 12.5; // Commission estimate
      localStorage.setItem('admin_stats', JSON.stringify(stats));
    }
  };

  const handleTourClick = (tour) => {
    trackTourClick(tour.name, tour.partner);
    if (typeof window !== 'undefined') {
      window.open(tour.link, '_blank');
      // Simulate conversion record
      const stats = JSON.parse(localStorage.getItem('admin_stats') || '{"clicks":0,"revenue":0,"conversions":0}');
      stats.clicks += 1;
      stats.revenue += 8.9; 
      localStorage.setItem('admin_stats', JSON.stringify(stats));
    }
  };

  const handleInsuranceClick = (planName, partner) => {
    trackInsuranceClick(planName, partner);
    if (typeof window !== 'undefined') {
      window.open('https://segurosviagem.com.br/partner-2go', '_blank');
      const stats = JSON.parse(localStorage.getItem('admin_stats') || '{"clicks":0,"revenue":0,"conversions":0}');
      stats.clicks += 1;
      stats.revenue += 35.0; 
      localStorage.setItem('admin_stats', JSON.stringify(stats));
    }
  };

  const handleCarClick = (carType, partner) => {
    trackCarClick(carType, partner);
    if (typeof window !== 'undefined') {
      window.open('https://rentcars.com.br/partner-2go', '_blank');
      const stats = JSON.parse(localStorage.getItem('admin_stats') || '{"clicks":0,"revenue":0,"conversions":0}');
      stats.clicks += 1;
      stats.revenue += 45.0; 
      localStorage.setItem('admin_stats', JSON.stringify(stats));
    }
  };

  return (
    <div className="w-full bg-white border border-border-gray p-6 sm:p-8 rounded-[28px] shadow-sm text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-border-gray/50 pb-4">
        <div>
          <span className="bg-brand-orange/10 text-brand-orange text-[9px] font-extrabold tracking-widest px-3 py-1 rounded-full w-fit">
            PARCEIROS CREDENCIADOS
          </span>
          <h3 className="font-headers text-base sm:text-lg font-bold text-brand-navy mt-2">
            Ofertas Recomendadas para {destination?.name || 'sua Viagem'}
          </h3>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-bg-light p-1 rounded-xl gap-1 self-start sm:self-center shrink-0">
          <button
            onClick={() => setActiveTab('hotels')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'hotels'
                ? 'bg-white text-brand-navy shadow-xs'
                : 'text-text-muted hover:text-brand-navy'
            }`}
          >
            <Hotel className="w-3.5 h-3.5" /> Estadias
          </button>
          <button
            onClick={() => setActiveTab('tours')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'tours'
                ? 'bg-white text-brand-navy shadow-xs'
                : 'text-text-muted hover:text-brand-navy'
            }`}
          >
            <Compass className="w-3.5 h-3.5" /> Passeios
          </button>
          <button
            onClick={() => setActiveTab('insurance')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'insurance'
                ? 'bg-white text-brand-navy shadow-xs'
                : 'text-text-muted hover:text-brand-navy'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Seguro & Carros
          </button>
        </div>
      </div>

      {/* Tabs Content */}
      <div className="w-full">
        {activeTab === 'hotels' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentOffers.hotels.map((hotel, idx) => (
              <div 
                key={idx} 
                className="group border border-border-gray/70 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col bg-bg-light/10"
              >
                <div className="h-40 overflow-hidden relative bg-bg-light">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-brand-navy text-[9px] font-bold py-1 px-2.5 rounded-lg shadow-xs flex items-center gap-1">
                    <Star className="w-3 h-3 text-brand-orange fill-brand-orange" /> {hotel.rating}
                  </span>
                </div>
                <div className="p-4 flex flex-col justify-between flex-grow gap-3 text-left">
                  <div>
                    <span className="text-[8px] text-text-muted uppercase font-bold tracking-widest">{hotel.partner} Partner</span>
                    <h4 className="font-headers font-bold text-xs sm:text-sm text-brand-navy mt-1 group-hover:text-brand-orange transition-colors">
                      {hotel.name}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between border-t border-border-gray/30 pt-3 mt-1">
                    <span className="text-xs font-bold text-brand-navy">{hotel.price}</span>
                    <button
                      onClick={() => handleHotelClick(hotel)}
                      className="bg-brand-navy hover:bg-brand-orange text-white text-[10px] font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                    >
                      Reservar <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tours' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentOffers.tours.map((tour, idx) => (
              <div 
                key={idx} 
                className="group border border-border-gray/70 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col bg-bg-light/10"
              >
                <div className="h-40 overflow-hidden relative bg-bg-light">
                  <img src={tour.image} alt={tour.name} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                  <span className="absolute bottom-3 left-3 bg-brand-orange text-white text-[8px] font-bold tracking-widest uppercase py-1 px-2.5 rounded-md shadow-xs">
                    {tour.partner}
                  </span>
                </div>
                <div className="p-4 flex flex-col justify-between flex-grow gap-3 text-left">
                  <div>
                    <span className="text-[8px] text-text-muted font-bold tracking-wider">Duração: {tour.duration}</span>
                    <h4 className="font-headers font-bold text-xs sm:text-sm text-brand-navy mt-1 group-hover:text-brand-orange transition-colors">
                      {tour.name}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between border-t border-border-gray/30 pt-3 mt-1">
                    <div>
                      <span className="text-[8px] text-text-muted block">A partir de</span>
                      <span className="text-xs font-extrabold text-brand-navy">{tour.price}</span>
                    </div>
                    <button
                      onClick={() => handleTourClick(tour)}
                      className="bg-brand-navy hover:bg-brand-orange text-white text-[10px] font-bold px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                    >
                      Comprar <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'insurance' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-2">
            {/* Seguro Viagem Partner */}
            <div className="p-5 border border-border-gray rounded-2xl bg-gradient-to-br from-brand-orange/5 to-white flex flex-col justify-between gap-4 text-left">
              <div>
                <ShieldCheck className="w-8 h-8 text-brand-orange" />
                <h4 className="font-headers font-bold text-brand-navy text-xs sm:text-sm mt-3">Seguro Viagem Obrigatório</h4>
                <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
                  Evite imprevistos de saúde e imigração. Compare planos com cobertura Schengen de €30.000 com até 15% OFF exclusivo.
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-border-gray/30 pt-4 mt-2">
                <span className="text-[10px] text-brand-green font-bold">Cupom: 2GOVIP15</span>
                <button
                  onClick={() => handleInsuranceClick('Schengen Global Plan', 'SegurosPromo')}
                  className="bg-brand-navy hover:bg-brand-orange text-white text-[10px] font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                >
                  Comparar Apólices <ExternalLink className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>

            {/* Car Rental Partner */}
            <div className="p-5 border border-border-gray rounded-2xl bg-gradient-to-br from-brand-green/5 to-white flex flex-col justify-between gap-4 text-left">
              <div>
                <Car className="w-8 h-8 text-brand-green" />
                <h4 className="font-headers font-bold text-brand-navy text-xs sm:text-sm mt-3">Aluguel de Carros Privativos</h4>
                <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
                  Explore destinos fora da rota turística com total liberdade. Parcerias com RentCars e Discover Cars em mais de 140 países.
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-border-gray/30 pt-4 mt-2">
                <span className="text-[10px] text-brand-navy font-bold">Sem taxa de IOF</span>
                <button
                  onClick={() => handleCarClick('SUV/Sedan', 'RentCars')}
                  className="bg-brand-navy hover:bg-brand-orange text-white text-[10px] font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                >
                  Buscar Veículos <ExternalLink className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

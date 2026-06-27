"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MessageSquare, X } from 'lucide-react';
import { trackClickWhatsApp } from '@/lib/analytics';

const destinationMap = {
  'paris': { name: 'Paris', text: 'ajuda para montar seu roteiro de Paris?' },
  'roma': { name: 'Roma', text: 'ajuda para planejar sua viagem para Roma?' },
  'londres': { name: 'Londres', text: 'ajuda com seu roteiro de Londres?' },
  'lisboa': { name: 'Lisboa', text: 'ajuda para planejar sua viagem para Lisboa?' },
  'toquio': { name: 'Tóquio', text: 'ajuda para planejar sua viagem ao Japão?' },
  'japao': { name: 'Japão', text: 'ajuda para planejar sua viagem ao Japão?' },
  'santorini': { name: 'Santorini', text: 'ajuda com seu roteiro de Santorini?' },
  'noruega': { name: 'Noruega', text: 'ajuda para planejar sua viagem para a Noruega?' },
  'capadocia': { name: 'Capadócia', text: 'ajuda para planejar sua viagem para a Capadócia?' },
  'gramado': { name: 'Gramado', text: 'ajuda com seu planejamento de Gramado?' },
  'fernando-de-noronha': { name: 'Fernando de Noronha', text: 'ajuda com seu roteiro de Fernando de Noronha?' },
  'noronha': { name: 'Fernando de Noronha', text: 'ajuda com seu roteiro de Fernando de Noronha?' },
  'italia': { name: 'Itália', text: 'ajuda para planejar sua viagem para a Itália?' }
};

export default function WhatsAppFloating() {
  const pathname = usePathname();
  const [activeConfig, setActiveConfig] = useState({ name: 'global', text: 'ajuda para planejar sua próxima viagem?' });
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Determine active destination based on URL path parts
    const parts = pathname.split('/');
    let foundDest = 'global';
    let config = { name: 'global', text: 'ajuda para planejar sua próxima viagem?' };

    for (const part of parts) {
      if (destinationMap[part]) {
        foundDest = part;
        config = destinationMap[part];
        break;
      }
      // Check partial slugs (e.g. 'paris-3-dias' -> check if 'paris' is inside)
      for (const key of Object.keys(destinationMap)) {
        if (part.includes(key)) {
          foundDest = key;
          config = destinationMap[key];
          break;
        }
      }
      if (foundDest !== 'global') break;
    }

    setActiveConfig(config);

    // Show tooltip after a short delay on mount/navigation
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, [pathname]);

  const handleClick = (e) => {
    e.stopPropagation();
    trackClickWhatsApp(activeConfig.name);
    
    const formattedText = encodeURIComponent(
      `Olá! Gostaria de ${activeConfig.text.replace('?', '')} com a curadoria da 2GO.`
    );
    // Open WhatsApp link (using mock number)
    window.open(`https://api.whatsapp.com/send?phone=5511999999999&text=${formattedText}`, '_blank');
  };

  return (
    <div className="fixed bottom-28 right-4 sm:bottom-6 sm:right-6 z-[2000] flex flex-col items-end select-none">
      {/* Tooltip text bubble (hidden on mobile) */}
      {showTooltip && (
        <div className="hidden sm:flex mb-3 bg-white text-brand-navy border border-border-gray p-4 rounded-[20px] shadow-xl max-w-[250px] relative animate-fade-in-up items-start gap-2 text-left">
          <div className="flex-grow">
            <p className="text-[10px] font-bold text-brand-orange uppercase tracking-wider mb-0.5">Especialista 2GO</p>
            <p className="text-xs font-semibold leading-normal">
              Olá! Precisa de {activeConfig.text}
            </p>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-text-muted hover:text-brand-navy p-0.5 rounded cursor-pointer transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          
          {/* Arrow */}
          <div className="absolute right-5 -bottom-1.5 w-3 h-3 bg-white border-r border-b border-border-gray rotate-45"></div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={handleClick}
        className="w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer relative group"
        aria-label="Fale no WhatsApp"
      >
        {/* Animated radar rings */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping group-hover:animate-none"></span>
        
        {/* Custom SVG WhatsApp icon or MessageSquare fallback */}
        <svg 
          className="w-6 h-6 sm:w-7 sm:h-7 fill-current" 
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.114-2.905-6.989-1.874-1.875-4.355-2.907-6.992-2.908-5.443 0-9.87 4.417-9.873 9.861-.001 1.77.476 3.497 1.382 5.027l-.95 3.47 3.553-.932zm10.102-5.466c-.29-.145-1.713-.846-1.978-.942-.266-.097-.459-.144-.652.146-.193.289-.748.942-.917 1.134-.169.192-.338.217-.628.072-1.79-.899-2.944-1.599-4.123-3.613-.31-.53.31-.492.887-1.64.097-.192.048-.361-.024-.505-.072-.144-.652-1.572-.894-2.15-.236-.569-.475-.491-.652-.5l-.556-.01c-.193 0-.507.072-.772.361-.266.289-1.014.992-1.014 2.422 0 1.43 1.039 2.81 1.184 3.002.145.193 2.043 3.12 4.95 4.373.692.298 1.232.476 1.654.61.694.221 1.327.19 1.827.115.556-.084 1.713-.7 1.954-1.374.241-.674.241-1.253.169-1.373-.072-.12-.265-.193-.555-.338z"/>
        </svg>
      </button>
    </div>
  );
}

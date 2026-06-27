"use client";

import React, { useState } from 'react';
import { Apple } from 'lucide-react';
import AppDownloadModal from './AppDownloadModal';

export default function AppFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className="fixed left-1/2 -translate-x-1/2 z-[2500] w-full max-w-[260px] px-4 lg:hidden"
        style={{ bottom: 'calc(1.2rem + env(safe-area-inset-bottom, 0px))' }}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-white/95 backdrop-blur-md border border-white/50 text-brand-navy font-black py-3.5 px-6 rounded-full shadow-[0_10px_35px_rgba(8,27,107,0.12)] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer text-sm tracking-wider animate-btn-pulse"
        >
          {/* Apple Icon */}
          <Apple className="w-4 h-4 text-brand-navy fill-current" />
          
          {/* Android Icon (SVG) */}
          <svg 
            className="w-4.5 h-4.5 text-brand-navy fill-current" 
            viewBox="0 0 24 24"
          >
            <path d="M17.523 15.3l1.816 3.146a.5.5 0 0 1-.183.683c-.08.046-.17.071-.263.071a.5.5 0 0 1-.42-.227l-1.838-3.185A8.956 8.956 0 0 1 12 17a8.956 8.956 0 0 1-4.635-1.212L5.527 18.97a.5.5 0 0 1-.683.183.5.5 0 0 1-.07-.263.5.5 0 0 1 .227-.42l1.816-3.146A8.995 8.995 0 0 1 3 10h18a8.995 8.995 0 0 1-3.477 5.3zM7 7.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
          </svg>
          
          <span>Baixar App</span>
        </button>
      </div>

      <AppDownloadModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
}

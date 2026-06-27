"use client";

import React, { useState } from 'react';
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
          className="w-full bg-white/95 backdrop-blur-md border border-white/50 text-brand-navy font-black py-3.5 px-6 rounded-full shadow-[0_10px_35px_rgba(8,27,107,0.12)] flex items-center justify-center hover:scale-[1.02] active:scale-95 transition-all cursor-pointer text-sm tracking-wider animate-btn-pulse"
        >
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

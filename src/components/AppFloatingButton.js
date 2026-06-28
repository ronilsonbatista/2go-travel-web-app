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
          className="w-full bg-gradient-to-r from-[#F47A20] to-[#ff8f3c] text-white font-extrabold py-3.5 px-6 rounded-full shadow-[0_14px_35px_rgba(244,122,32,0.35)] flex items-center justify-center hover:scale-[1.02] active:scale-95 transition-all cursor-pointer text-sm tracking-widest animate-btn-pulse border-none"
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

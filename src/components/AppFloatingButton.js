"use client";

import React, { useState } from 'react';
import { Smartphone } from 'lucide-react';
import AppDownloadModal from './AppDownloadModal';
import { useUiOverlayBlocked } from './UiOverlayContext';

export default function AppFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const overlayBlocked = useUiOverlayBlocked();
  // Hide immediately on own modal open; AppDownloadModal also locks the overlay gate.
  const hidden = overlayBlocked || isOpen;

  return (
    <>
      {/* Under modal overlay (z-3000); compact bottom-right to reduce cover of cards */}
      <div
        className={`pointer-events-none fixed z-[900] lg:hidden transition-opacity duration-200 ${
          hidden ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          right: 'max(0.75rem, env(safe-area-inset-right, 0px))',
          bottom: 'calc(0.85rem + env(safe-area-inset-bottom, 0px))'
        }}
        aria-hidden={hidden}
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Baixar App"
          aria-haspopup="dialog"
          tabIndex={hidden ? -1 : 0}
          disabled={hidden}
          className="pointer-events-auto inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border-none bg-gradient-to-r from-[#F47A20] to-[#ff8f3c] px-3.5 py-2.5 text-xs font-extrabold tracking-wide text-white shadow-[0_10px_28px_rgba(244,122,32,0.4)] transition-all hover:scale-[1.03] active:scale-95 animate-btn-pulse cursor-pointer disabled:pointer-events-none disabled:hover:scale-100"
        >
          <Smartphone className="h-4 w-4 shrink-0" strokeWidth={2.4} aria-hidden />
          <span>App</span>
        </button>
      </div>

      <AppDownloadModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}

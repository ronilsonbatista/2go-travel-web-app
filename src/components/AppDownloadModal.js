"use client";

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function AppDownloadModal({ isOpen, onClose }) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white border border-border-gray max-w-[500px] w-full p-8 md:p-10 rounded-[28px] text-center flex flex-col items-center shadow-xl animate-fade-in-up">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-text-muted hover:text-brand-navy transition-colors p-1 cursor-pointer"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Logo */}
        <img 
          src="/images/Logo2GO.png" 
          alt="2GO Roteiros" 
          className="h-10 w-auto object-contain mb-4"
        />

        <h3 className="font-headers text-2xl font-bold text-brand-navy mb-2">
          Baixe o Aplicativo 2GO
        </h3>
        <p className="text-sm text-text-muted mb-8 max-w-[380px]">
          Aponte a câmera do seu celular para o QR Code abaixo para fazer o download ou utilize os botões das lojas de aplicativos.
        </p>

        {/* QR Code Graphic wrapper in minimalist brand-navy */}
        <div className="bg-bg-light p-5 rounded-2xl mb-8 border border-border-gray flex flex-col items-center justify-center w-full max-w-[240px]">
          <div className="w-36 h-36 border border-border-gray bg-white rounded-xl flex items-center justify-center relative shadow-sm p-3">
            <QRCodeSVG 
              value="https://app.2go.com.br" 
              size={120}
              fgColor="#081B6B"
              level="M"
              includeMargin={false}
            />
          </div>
          <span className="text-[10px] text-brand-navy font-bold uppercase tracking-wider mt-3">
            Escaneie para Baixar
          </span>
        </div>

        {/* Redirect buttons to https://app.2go.com.br in white & navy */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          {/* App Store button */}
          <a 
            href="https://app.2go.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white border border-border-gray rounded-xl px-5 py-2.5 transition-all hover:border-brand-navy hover:-translate-y-0.5 hover:bg-bg-light shadow-sm flex-1 text-left cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-brand-navy">
              <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,22c-1.31,0.05-1.73,-0.75-3.23,-0.75c-1.5,0-1.97,0.73,-3.23,0.78c-1.33,0.05-2.29,-1.31-3.13,-2.52c-1.72,-2.48,-3.03,-7,-1.27,-10.06c0.88,-1.52 2.44,-2.48 4.14,-2.5c1.29,-0.02 2.5,0.87 3.29,0.87c0.79,0 2.26,-1.07 3.81,-0.91c0.65,0.03 2.47,0.26 3.64,1.98c-0.09,0.06 -2.17,1.27 -2.15,3.81c0.03,3.02 2.63,4.03 2.66,4.04c-0.02,0.07 -0.42,1.44 -1.38,2.83M15.97,4.17C16.63,3.37 17.07,2.28 16.95,1C16,1.04 14.9,1.6 14.24,2.38C13.58,3.16 13,4.27 13.15,5.53C14.21,5.61 15.26,5.02 15.97,4.17Z"/>
            </svg>
            <div className="flex flex-col text-xs leading-none">
              <span className="text-[9px] text-text-muted uppercase tracking-wider mb-0.5">Baixar via</span>
              <span className="font-headers text-xs font-bold text-brand-navy">App Store</span>
            </div>
          </a>

          {/* Google Play button */}
          <a 
            href="https://app.2go.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white border border-border-gray rounded-xl px-5 py-2.5 transition-all hover:border-brand-navy hover:-translate-y-0.5 hover:bg-bg-light shadow-sm flex-1 text-left cursor-pointer"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-brand-navy">
              <path d="M3,5.27V18.73L16.55,12L3,5.27M17.87,11.33L19.86,12.33C20.35,12.58 20.35,13.29 19.86,13.54L17.87,14.54L15.55,13.38L17.87,11.33M3.55,4.15L14.77,12.63L12.45,14.67L3.55,4.15M3.55,19.72L12.45,11.2L14.77,13.24L3.55,19.72Z"/>
            </svg>
            <div className="flex flex-col text-xs leading-none">
              <span className="text-[9px] text-text-muted uppercase tracking-wider mb-0.5">Baixar via</span>
              <span className="font-headers text-xs font-bold text-brand-navy">Google Play</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

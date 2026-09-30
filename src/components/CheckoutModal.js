"use client";

import React from 'react';
import { X } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, destinationName }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-[3000] flex items-center justify-center p-4 animate-fade-in text-left"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white border border-border-gray max-w-[500px] w-full p-6 sm:p-8 rounded-[28px] flex flex-col shadow-2xl animate-fade-in-up text-brand-navy max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-text-muted hover:text-brand-navy transition-colors p-1 cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="bg-brand-green/10 text-brand-green text-[10px] font-extrabold tracking-widest px-3 py-1.5 rounded-full w-fit mb-3 block">
            PRÉVIA DO ROTEIRO
          </span>
          <h3 className="font-headers text-xl sm:text-2xl font-black">
            Roteiro de {destinationName || 'viagem'}
          </h3>
          <p className="text-xs text-text-muted mt-1 leading-relaxed">
            A prévia do dia 1 continua na página do roteiro. Este site não pede cartão nem CVV e não conclui a compra de R$ 19,90.
          </p>
        </div>

        <div className="bg-bg-light border border-border-gray p-4 rounded-2xl flex justify-between items-center mb-6">
          <div>
            <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider block">Valor de referência</span>
            <span className="font-headers text-2xl font-black text-brand-navy">R$ 19,90</span>
          </div>
          <span className="text-[10px] text-text-muted bg-white border border-border-gray px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
            Compra não concluída aqui
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="btn btn-outline w-full py-3.5 cursor-pointer font-bold text-xs"
        >
          Voltar à prévia
        </button>
      </div>
    </div>
  );
}

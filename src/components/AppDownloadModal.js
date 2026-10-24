"use client";

import React, { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import {
  getAppStoreUrl,
  getPlayStoreUrl,
  getPreferredDownloadUrl
} from '@/lib/appDownload';

export default function AppDownloadModal({ isOpen, onClose }) {
  const titleId = useId();
  const descId = useId();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const previouslyFocused = useRef(null);

  const appStore = getAppStoreUrl();
  const playStore = getPlayStoreUrl();
  const qrUrl = getPreferredDownloadUrl();
  const hasDownload = Boolean(qrUrl);

  useEffect(() => {
    if (!isOpen) return undefined;

    previouslyFocused.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      closeRef.current?.focus();
    }, 0);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      const list = [...focusable].filter((el) => !el.hasAttribute('disabled'));
      if (!list.length) return;

      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused.current && typeof previouslyFocused.current.focus === 'function') {
        previouslyFocused.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className="relative flex w-full max-w-[500px] animate-fade-in-up flex-col items-center rounded-[28px] border border-border-gray bg-white p-8 text-center shadow-xl md:p-10"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full text-text-muted transition-colors hover:bg-bg-light hover:text-brand-navy"
          aria-label="Fechar modal"
        >
          <X className="h-5 w-5" />
        </button>

        <img
          src="/images/Logo2GO.png"
          alt="2GO Roteiros"
          width={228}
          height={192}
          sizes="64px"
          className="mb-4 h-16 w-auto object-contain"
        />

        <h3 id={titleId} className="mb-2 font-headers text-2xl font-bold text-brand-navy">
          Baixe o Aplicativo 2GO
        </h3>
        <p id={descId} className="mb-8 max-w-[380px] text-sm text-text-muted">
          {hasDownload
            ? 'Aponte a câmera do seu celular para o QR Code abaixo para fazer o download ou utilize os botões das lojas de aplicativos.'
            : 'O download nas lojas estará disponível em breve. Enquanto isso, continue explorando destinos e guias no site.'}
        </p>

        <div className="mb-8 flex w-full max-w-[240px] flex-col items-center justify-center rounded-2xl border border-border-gray bg-bg-light p-5">
          {hasDownload ? (
            <>
              <div className="relative flex h-36 w-36 items-center justify-center rounded-xl border border-border-gray bg-white p-3 shadow-sm">
                <QRCodeSVG
                  value={qrUrl}
                  size={120}
                  fgColor="#081B6B"
                  level="M"
                  includeMargin={false}
                />
              </div>
              <span className="mt-3 text-[10px] font-bold uppercase tracking-wider text-brand-navy">
                Escaneie para Baixar
              </span>
            </>
          ) : (
            <div className="flex h-36 w-full flex-col items-center justify-center rounded-xl border border-dashed border-border-gray bg-white px-4 text-center">
              <p className="font-headers text-sm font-extrabold text-brand-navy">Em breve</p>
              <p className="mt-1 text-[11px] leading-snug text-text-muted">
                Links das lojas ainda não configurados.
              </p>
            </div>
          )}
        </div>

        <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
          <StoreLink
            href={appStore}
            eyebrow="Baixar via"
            title="App Store"
            iconPath="M18.71,19.5C17.88,20.74 17,21.95 15.66,22c-1.31,0.05-1.73,-0.75-3.23,-0.75c-1.5,0-1.97,0.73,-3.23,0.78c-1.33,0.05-2.29,-1.31-3.13,-2.52c-1.72,-2.48,-3.03,-7,-1.27,-10.06c0.88,-1.52 2.44,-2.48 4.14,-2.5c1.29,-0.02 2.5,0.87 3.29,0.87c0.79,0 2.26,-1.07 3.81,-0.91c0.65,0.03 2.47,0.26 3.64,1.98c-0.09,0.06 -2.17,1.27 -2.15,3.81c0.03,3.02 2.63,4.03 2.66,4.04c-0.02,0.07 -0.42,1.44 -1.38,2.83M15.97,4.17C16.63,3.37 17.07,2.28 16.95,1C16,1.04 14.9,1.6 14.24,2.38C13.58,3.16 13,4.27 13.15,5.53C14.21,5.61 15.26,5.02 15.97,4.17Z"
          />
          <StoreLink
            href={playStore}
            eyebrow="Baixar via"
            title="Google Play"
            iconPath="M3,5.27V18.73L16.55,12L3,5.27M17.87,11.33L19.86,12.33C20.35,12.58 20.35,13.29 19.86,13.54L17.87,14.54L15.55,13.38L17.87,11.33M3.55,4.15L14.77,12.63L12.45,14.67L3.55,4.15M3.55,19.72L12.45,11.2L14.77,13.24L3.55,19.72Z"
          />
        </div>
      </div>
    </div>
  );
}

function StoreLink({ href, eyebrow, title, iconPath }) {
  const className =
    'flex min-h-11 flex-1 items-center gap-3 rounded-xl border border-border-gray bg-white px-5 py-2.5 text-left shadow-sm transition-all';

  const content = (
    <>
      <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 fill-brand-navy" aria-hidden>
        <path d={iconPath} />
      </svg>
      <span className="flex flex-col text-xs leading-none">
        <span className="mb-0.5 text-[9px] uppercase tracking-wider text-text-muted">{eyebrow}</span>
        <span className="font-headers text-xs font-bold text-brand-navy">{title}</span>
        {!href ? (
          <span className="mt-1 text-[9px] font-bold uppercase tracking-wide text-brand-orange">
            Em breve
          </span>
        ) : null}
      </span>
    </>
  );

  if (!href) {
    return (
      <span className={`${className} cursor-not-allowed opacity-60`} aria-disabled="true">
        {content}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} cursor-pointer hover:-translate-y-0.5 hover:border-brand-navy hover:bg-bg-light`}
    >
      {content}
    </a>
  );
}

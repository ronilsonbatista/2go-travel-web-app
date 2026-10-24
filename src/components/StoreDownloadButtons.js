"use client";

import React from 'react';
import { getAppStoreUrl, getPlayStoreUrl } from '@/lib/appDownload';

const APP_STORE_ICON = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-brand-navy shrink-0" aria-hidden>
    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,22c-1.31,0.05-1.73,-0.75-3.23,-0.75c-1.5,0-1.97,0.73,-3.23,0.78c-1.33,0.05-2.29,-1.31-3.13,-2.52c-1.72,-2.48,-3.03,-7,-1.27,-10.06c0.88,-1.52 2.44,-2.48 4.14,-2.5c1.29,-0.02 2.5,0.87 3.29,0.87c0.79,0 2.26,-1.07 3.81,-0.91c0.65,0.03 2.47,0.26 3.64,1.98c-0.09,0.06 -2.17,1.27 -2.15,3.81c0.03,3.02 2.63,4.03 2.66,4.04c-0.02,0.07 -0.42,1.44 -1.38,2.83M15.97,4.17C16.63,3.37 17.07,2.28 16.95,1C16,1.04 14.9,1.6 14.24,2.38C13.58,3.16 13,4.27 13.15,5.53C14.21,5.61 15.26,5.02 15.97,4.17Z" />
  </svg>
);

const PLAY_STORE_ICON = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-brand-navy shrink-0" aria-hidden>
    <path d="M3,5.27V18.73L16.55,12L3,5.27M17.87,11.33L19.86,12.33C20.35,12.58 20.35,13.29 19.86,13.54L17.87,14.54L15.55,13.38L17.87,11.33M3.55,4.15L14.77,12.63L12.45,14.67L3.55,4.15M3.55,19.72L12.45,11.2L14.77,13.24L3.55,19.72Z" />
  </svg>
);

function StoreButton({ href, eyebrow, title, icon, className = '' }) {
  const base =
    'flex min-h-11 items-center gap-3 rounded-xl border border-border-gray bg-white px-5 py-2.5 text-left shadow-sm transition-all';
  if (!href) {
    return (
      <span
        className={`${base} cursor-not-allowed opacity-60 ${className}`}
        aria-disabled="true"
        title="Link da loja em breve"
      >
        {icon}
        <span className="flex flex-col text-xs leading-none">
          <span className="mb-0.5 text-[9px] uppercase tracking-wider text-text-muted">{eyebrow}</span>
          <span className="font-headers text-sm font-semibold text-brand-navy">{title}</span>
          <span className="mt-1 text-[9px] font-bold uppercase tracking-wide text-brand-orange">
            Em breve
          </span>
        </span>
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} cursor-pointer hover:-translate-y-0.5 hover:border-brand-navy hover:bg-bg-light ${className}`}
    >
      {icon}
      <span className="flex flex-col text-xs leading-none">
        <span className="mb-0.5 text-[9px] uppercase tracking-wider text-text-muted">{eyebrow}</span>
        <span className="font-headers text-sm font-semibold text-brand-navy">{title}</span>
      </span>
    </a>
  );
}

export default function StoreDownloadButtons({ className = '', buttonClassName = '', layout = 'stack' }) {
  const appStore = getAppStoreUrl();
  const playStore = getPlayStoreUrl();
  const layoutClass = layout === 'row' ? 'flex flex-col gap-3 sm:flex-row' : 'flex flex-col gap-3';

  return (
    <div className={`${layoutClass} ${className}`}>
      <StoreButton
        href={appStore}
        eyebrow="Disponível na"
        title="App Store"
        icon={APP_STORE_ICON}
        className={`w-full ${buttonClassName}`}
      />
      <StoreButton
        href={playStore}
        eyebrow="Disponível no"
        title="Google Play"
        icon={PLAY_STORE_ICON}
        className={`w-full ${buttonClassName}`}
      />
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';
import StoreDownloadButtons from './StoreDownloadButtons';

export default function Footer({ onOpenDownload }) {
  return (
    <footer className="bg-[#081B6B] text-white pt-16 sm:pt-20 pb-32 lg:pb-10 overflow-x-clip">
      <div className="container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-16">
        
        {/* Brand Information */}
        <div className="flex flex-col gap-6">
          <Link
            href="/"
            className="inline-flex items-center cursor-pointer h-14 lg:h-[68px] w-fit mb-1"
          >
            <img
              src="/images/Logo2GO.png"
              alt="2GO Roteiros"
              width={228}
              height={192}
              sizes="(min-width: 1024px) 95px, 76px"
              className="h-full w-auto object-contain brightness-0 invert opacity-95"
            />
          </Link>
          <p className="text-sm text-white/75 leading-relaxed max-w-sm">
            Destinos e guias para inspirar. O dia a dia da viagem fica no aplicativo.
          </p>
          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 w-11 min-h-11 min-w-11 rounded-full border border-white/20 text-white items-center justify-center transition-all hover:border-brand-orange hover:text-brand-orange hover:-translate-y-0.5" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 w-11 min-h-11 min-w-11 rounded-full border border-white/20 text-white items-center justify-center transition-all hover:border-brand-orange hover:text-brand-orange hover:-translate-y-0.5" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 w-11 min-h-11 min-w-11 rounded-full border border-white/20 text-white items-center justify-center transition-all hover:border-brand-orange hover:text-brand-orange hover:-translate-y-0.5" aria-label="X (Twitter)">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="font-headers text-base font-bold text-white mb-6">Empresa</h4>
          <ul className="flex flex-col gap-1 list-none m-0 p-0">
            <li>
              <Link href="/quem-somos" className="inline-flex min-h-11 items-center text-sm text-white/75 hover:text-brand-orange transition-colors cursor-pointer text-left">
                Quem somos
              </Link>
            </li>
            <li>
              <Link href="/guias" className="inline-flex min-h-11 items-center text-sm text-white/75 hover:text-brand-orange transition-colors cursor-pointer text-left">
                Guia de Viagem
              </Link>
            </li>
            <li>
              <Link href="/roteiros" className="inline-flex min-h-11 items-center text-sm text-white/75 hover:text-brand-orange transition-colors cursor-pointer text-left">
                Roteiros
              </Link>
            </li>
          </ul>
        </div>

        {/* Services Links */}
        <div>
          <h4 className="font-headers text-base font-bold text-white mb-6">Serviços</h4>
          <ul className="flex flex-col gap-1 list-none m-0 p-0">
            <li>
              <button
                type="button"
                onClick={onOpenDownload}
                className="inline-flex min-h-11 items-center text-sm text-white/75 hover:text-brand-orange transition-colors cursor-pointer text-left"
              >
                Baixar App
              </button>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-headers text-base font-bold text-white mb-2">Aplicativo 2GO</h4>
          <p className="text-sm text-white/75 leading-relaxed">
            Planeje em segundos e viaje com tranquilidade off-line.
          </p>
          <StoreDownloadButtons className="mt-2" />
        </div>

      </div>

      <div className="container mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 pt-10 border-t border-white/15 flex flex-col md:flex-row justify-between items-center text-xs text-white/60 gap-4">
        <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
          <p>&copy; 2026 2GO S.A. Todos os direitos reservados.</p>
          <span className="inline-flex items-center gap-1.5 bg-white/10 text-white font-semibold px-2.5 py-1 rounded-md text-[11px] border border-white/15">
            <Lock className="w-3 h-3 text-brand-orange" />
            Ambiente seguro
          </span>
        </div>
        <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 md:justify-end">
          <Link href="/creditos-imagens" className="inline-flex min-h-11 items-center hover:text-brand-orange transition-colors">Créditos de imagens</Link>
          <Link href="/termos-de-uso" className="inline-flex min-h-11 items-center hover:text-brand-orange transition-colors">Termos de Uso</Link>
          <span aria-hidden className="hidden sm:inline">|</span>
          <Link href="/politica-de-privacidade" className="inline-flex min-h-11 items-center hover:text-brand-orange transition-colors">Política de Privacidade</Link>
        </p>
      </div>
    </footer>
  );
}

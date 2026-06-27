import React from 'react';
import Link from 'next/link';

export default function Footer({ onOpenDownload }) {
  return (
    <footer className="bg-bg-light border-t border-border-gray pt-20 pb-28 lg:pb-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Information */}
        <div className="flex flex-col gap-6">
          <Link 
            href="/"
            className="flex items-center cursor-pointer h-[40px] lg:h-[46px] w-auto mb-2"
          >
            <img 
              src="/images/Logo2GO.png" 
              alt="2GO Roteiros" 
              className="h-full w-auto object-contain"
            />
          </Link>
          <p className="text-sm text-text-muted leading-relaxed max-w-[280px]">
            A plataforma definitiva para planejar, estruturar e vivenciar experiências de viagens personalizadas de alto padrão.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-border-gray text-brand-navy flex items-center justify-center transition-all hover:border-brand-orange hover:text-brand-orange hover:bg-brand-orange/5 hover:-translate-y-0.5" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-border-gray text-brand-navy flex items-center justify-center transition-all hover:border-brand-orange hover:text-brand-orange hover:bg-brand-orange/5 hover:-translate-y-0.5" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-border-gray text-brand-navy flex items-center justify-center transition-all hover:border-brand-orange hover:text-brand-orange hover:bg-brand-orange/5 hover:-translate-y-0.5" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="font-headers text-base font-bold text-brand-navy mb-6">Empresa</h4>
          <ul className="flex flex-col gap-3 list-none m-0 p-0">
            <li>
              <Link href="/about" className="text-sm text-text-muted hover:text-brand-orange transition-colors cursor-pointer text-left block">
                Sobre nós
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-sm text-text-muted hover:text-brand-orange transition-colors cursor-pointer text-left block">
                Blog editorial
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-text-muted hover:text-brand-orange transition-colors cursor-pointer text-left block">
                Trabalhe conosco
              </Link>
            </li>
          </ul>
        </div>

        {/* Services Links */}
        <div>
          <h4 className="font-headers text-base font-bold text-brand-navy mb-6">Serviços</h4>
          <ul className="flex flex-col gap-3 list-none m-0 p-0">
            <li>
              <Link href="/planejamento" className="text-sm text-text-muted hover:text-brand-orange transition-colors cursor-pointer text-left block">
                Gerar Roteiro
              </Link>
            </li>
            <li>
              <Link href="/roteiros" className="text-sm text-text-muted hover:text-brand-orange transition-colors cursor-pointer text-left block">
                Roteiros Curados
              </Link>
            </li>
            <li>
              <Link href="/premium" className="text-sm text-text-muted hover:text-brand-orange transition-colors cursor-pointer text-left block">
                Suporte VIP
              </Link>
            </li>
          </ul>
        </div>

        {/* App download redirects to https://app.2go.com.br */}
        <div className="flex flex-col gap-4">
          <h4 className="font-headers text-base font-bold text-brand-navy mb-2">Aplicativo 2GO</h4>
          <p className="text-sm text-text-muted leading-relaxed">
            Planeje em segundos e viaje com tranquilidade off-line.
          </p>
          
          <div className="flex flex-col gap-3 mt-2">
            {/* App Store button */}
            <a 
              href="https://app.2go.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white border border-border-gray rounded-xl px-5 py-2.5 transition-all hover:border-brand-navy hover:-translate-y-0.5 hover:bg-bg-light shadow-sm text-left w-full cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-brand-navy">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,22c-1.31,0.05-1.73,-0.75-3.23,-0.75c-1.5,0-1.97,0.73,-3.23,0.78c-1.33,0.05-2.29,-1.31-3.13,-2.52c-1.72,-2.48,-3.03,-7,-1.27,-10.06c0.88,-1.52 2.44,-2.48 4.14,-2.5c1.29,-0.02 2.5,0.87 3.29,0.87c0.79,0 2.26,-1.07 3.81,-0.91c0.65,0.03 2.47,0.26 3.64,1.98c-0.09,0.06 -2.17,1.27 -2.15,3.81c0.03,3.02 2.63,4.03 2.66,4.04c-0.02,0.07 -0.42,1.44 -1.38,2.83M15.97,4.17C16.63,3.37 17.07,2.28 16.95,1C16,1.04 14.9,1.6 14.24,2.38C13.58,3.16 13,4.27 13.15,5.53C14.21,5.61 15.26,5.02 15.97,4.17Z"/>
              </svg>
              <div className="flex flex-col text-xs leading-none">
                <span className="text-[9px] text-text-muted uppercase tracking-wider mb-0.5">Disponível na</span>
                <span className="font-headers text-sm font-semibold text-brand-navy">App Store</span>
              </div>
            </a>

            {/* Google Play button */}
            <a 
              href="https://app.2go.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white border border-border-gray rounded-xl px-5 py-2.5 transition-all hover:border-brand-navy hover:-translate-y-0.5 hover:bg-bg-light shadow-sm text-left w-full cursor-pointer"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-brand-navy">
                <path d="M3,5.27V18.73L16.55,12L3,5.27M17.87,11.33L19.86,12.33C20.35,12.58 20.35,13.29 19.86,13.54L17.87,14.54L15.55,13.38L17.87,11.33M3.55,4.15L14.77,12.63L12.45,14.67L3.55,4.15M3.55,19.72L12.45,11.2L14.77,13.24L3.55,19.72Z"/>
              </svg>
              <div className="flex flex-col text-xs leading-none">
                <span className="text-[9px] text-text-muted uppercase tracking-wider mb-0.5">Disponível no</span>
                <span className="font-headers text-sm font-semibold text-brand-navy">Google Play</span>
              </div>
            </a>
          </div>
        </div>

      </div>

      <div className="container mx-auto px-6 pt-10 border-t border-border-gray flex flex-col md:flex-row justify-between items-center text-xs text-text-muted gap-4">
        <p>&copy; 2026 2GO S.A. Todos os direitos reservados.</p>
        <p className="flex gap-4">
          <a href="#" className="hover:text-brand-orange transition-colors">Termos de Uso</a>
          <span>|</span>
          <a href="#" className="hover:text-brand-orange transition-colors">Políticas de Privacidade</a>
        </p>
      </div>
    </footer>
  );
}

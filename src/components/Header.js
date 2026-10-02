"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export default function Header({ onOpenDownload, solid = false }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Roteiros', href: '/roteiros' },
    { label: 'Guia de Viagem', href: '/guias' },
    { label: 'Quem somos', href: '/quem-somos' }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex items-center ${
          solid || isScrolled 
            ? 'h-[64px] lg:h-[78px] bg-white shadow-sm border-b border-border-gray/30' 
            : 'h-[64px] lg:h-[78px] bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-5 flex justify-between items-center w-full min-w-0 gap-3">
          {/* Official Logo — único asset (228×192); exibido maior para usar o arquivo inteiro */}
          <Link 
            href="/"
            className="flex items-center cursor-pointer shrink-0 w-auto h-11 lg:h-[60px]"
          >
            <img 
              src="/images/Logo2GO.png" 
              alt="2GO Roteiros"
              width={228}
              height={192}
              sizes="(min-width: 1024px) 72px, 52px"
              className="h-full w-auto object-contain"
            />
          </Link>

          <nav className="hidden lg:block min-w-0">
            <ul className="flex gap-3 xl:gap-5 items-center list-none m-0 p-0">
              {menuItems.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className={`font-body font-semibold text-[0.78rem] xl:text-[0.92rem] py-2 whitespace-nowrap relative cursor-pointer transition-colors ${
                      pathname === item.href || (item.href === '/guias' && pathname.startsWith('/guias'))
                        ? 'text-brand-orange' 
                        : 'text-text-muted hover:text-brand-navy'
                    } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-brand-orange after:transition-all after:duration-300 after:rounded-full after:w-0 hover:after:w-full`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Commercial CTA Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={onOpenDownload}
              className="hidden lg:inline-flex btn btn-primary btn-sm cursor-pointer"
            >
              Baixar App
            </button>
            
            {/* Mobile Hamburger Burger Icon */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-brand-navy cursor-pointer p-1"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Sidebar Drawer Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-md z-45 transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div 
          className={`fixed top-0 right-0 w-[285px] h-screen bg-white/95 backdrop-blur-2xl border-l border-border-gray/30 p-6 pt-24 flex flex-col gap-6 z-50 transition-transform duration-300 shadow-2xl ease-out overflow-y-auto ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="list-none flex flex-col gap-2.5 m-0 p-0 text-left">
            {menuItems.map((item, idx) => (
              <li key={idx} className="w-full">
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-headers text-xl font-bold text-brand-navy hover:text-brand-orange hover:translate-x-1.5 transition-all duration-300 w-full block text-left py-2 border-b border-border-gray/20"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="mt-auto flex flex-col gap-3.5 pt-4 border-t border-border-gray/30">
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenDownload();
              }}
              className="w-full bg-[#081B6B] hover:bg-[#06144f] text-white py-3.5 flex items-center justify-center cursor-pointer font-bold rounded-xl shadow-md shadow-brand-navy/10 text-sm border-none"
            >
              Baixar App
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

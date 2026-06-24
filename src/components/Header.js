"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Map } from 'lucide-react';

export default function Header({ onOpenDownload }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Shrink header on scroll
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
    { label: 'Custos', href: '/quanto-custa' },
    { label: 'Planejamento', href: '/planejamento' },
    { label: 'Blog', href: '/blog' }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 flex items-center ${
          isScrolled 
            ? 'h-[70px] bg-white/95 backdrop-blur-md border-b border-border-gray shadow-sm' 
            : 'h-20 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center w-full">
          {/* Official Logo */}
          <Link 
            href="/"
            className="flex items-center cursor-pointer h-[38px] lg:h-[48px] w-auto"
          >
            <img 
              src="/images/Logo2GO.png" 
              alt="2GO Roteiros" 
              className="h-full w-auto object-contain"
            />
          </Link>
 
          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:block">
            <ul className="flex gap-8 xl:gap-10 items-center list-none m-0 p-0">
              {menuItems.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    className={`font-body font-semibold text-[0.96rem] xl:text-[1.05rem] py-2 relative cursor-pointer transition-colors ${
                      pathname === item.href 
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
 
          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link 
              href="/premium"
              className="hidden md:inline-flex btn btn-primary btn-sm cursor-pointer"
            >
              Consultoria
            </Link>
            <button 
              onClick={onOpenDownload}
              className="inline-flex btn btn-outline btn-xs sm:btn-sm cursor-pointer"
            >
              Baixar App
            </button>
            
            {/* Hamburger Burger icon */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-brand-navy cursor-pointer p-1"
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>
 
      {/* Mobile Nav Sidebar Drawer Overlay */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div 
          className={`fixed top-0 right-0 w-[300px] h-screen bg-white/95 backdrop-blur-2xl border-l border-border-gray p-10 pt-24 flex flex-col gap-10 z-50 transition-transform duration-300 shadow-xl ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="list-none flex flex-col gap-6 m-0 p-0">
            {menuItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-headers text-xl font-bold text-left w-full cursor-pointer block text-brand-navy/70 hover:text-brand-navy"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="mt-auto flex flex-col gap-4">
            <Link 
              href="/premium"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full btn btn-primary py-3 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Map className="w-4.5 h-4.5" /> Consultoria
            </Link>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenDownload();
              }}
              className="w-full btn btn-outline py-3 cursor-pointer"
            >
              Baixar App
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import PhilosopherMenu from './PhilosopherMenu';

export default function Navbar() {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fechar o menu móvel sempre que a rota mudar
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']
  );

  const borderBottomColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.05)']
  );

  const isActive = (path: string) => pathname === path;
  const isPhilosopherActive = pathname.startsWith('/philosophers');

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'Sobre' }
  ];

  return (
    <>
      <motion.nav 
        style={isMounted ? { backgroundColor, borderBottomColor, borderBottomWidth: '1px', borderBottomStyle: 'solid' } : {}}
        className="sticky top-0 z-50 transition-colors duration-300 backdrop-blur-sm"
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 font-serif text-xl md:text-2xl font-bold tracking-widest text-primary z-50">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
            </svg>
            CAVERNA DO ESTOICO
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex space-x-10 text-sm font-medium text-neutral-300 items-center">
            <li>
              <Link href="/" className={`relative group pb-1 transition-colors ${isActive('/') ? 'text-primary' : 'hover:text-primary'}`}>
                Início
                {isActive('/') && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full"></span>}
              </Link>
            </li>
            <li className={isPhilosopherActive ? 'text-primary' : ''}>
              <PhilosopherMenu />
            </li>
            <li>
              <Link href="/blog" className={`relative group pb-1 transition-colors ${isActive('/blog') ? 'text-primary' : 'hover:text-primary'}`}>
                Blog
                {isActive('/blog') && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full"></span>}
              </Link>
            </li>
            <li>
              <Link href="/about" className={`relative group pb-1 transition-colors ${isActive('/about') ? 'text-primary' : 'hover:text-primary'}`}>
                Sobre
                {isActive('/about') && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full"></span>}
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-4 z-50">
            <button className="md:hidden text-primary hover:text-primary-hover p-2" aria-label="Menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg pt-24 px-6 md:hidden"
          >
            <ul className="flex flex-col space-y-6 text-xl font-serif text-center">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={`block py-2 ${isActive(link.href) ? 'text-primary' : 'text-neutral-300 hover:text-white'}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4 border-t border-white/10">
                <span className="text-sm uppercase tracking-widest text-neutral-500 mb-4 block">Filósofos</span>
                <div className="flex flex-col space-y-4">
                  <Link href="/philosophers/marco-aurelio" className="text-neutral-300 hover:text-white">Marco Aurélio</Link>
                  <Link href="/philosophers/seneca" className="text-neutral-300 hover:text-white">Sêneca</Link>
                  <Link href="/philosophers/epicteto" className="text-neutral-300 hover:text-white">Epicteto</Link>
                </div>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

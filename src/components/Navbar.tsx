"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Search, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  BookMarked, 
  Sparkles, 
  Scroll, 
  Library, 
  Feather,
  Compass
} from 'lucide-react';
import { useReaderState } from '@/lib/reader-store';
import SearchModal from './SearchModal';

export default function Navbar() {
  const pathname = usePathname();
  const { settings, toggleTheme, favoriteQuoteIds, savedArticleSlugs } = useReaderState();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const navLinks = [
    { href: '/', label: 'Início', icon: Compass },
    { href: '/blog', label: 'Blog & Reflexões', icon: Scroll },
    { href: '/philosophers', label: 'Filósofos', icon: Library },
    { href: '/citacoes', label: 'Citações', icon: Sparkles },
    { href: '/livros', label: 'Biblioteca & Livros', icon: BookMarked },
    { href: '/newsletter', label: 'Carta da Caverna', icon: Feather },
  ];

  const totalSaved = favoriteQuoteIds.length + savedArticleSlugs.length;

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/90 backdrop-blur-md border-b border-border shadow-md py-3' 
            : 'bg-transparent border-b border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg border border-border-accent flex items-center justify-center bg-card shadow-sm group-hover:border-primary transition-colors">
              <span className="font-serif text-primary text-lg font-bold">🏛️</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-foreground group-hover:text-primary transition-colors">
                CAVERNA DO ESTOICO
              </span>
              <span className="text-[10px] tracking-widest uppercase text-foreground-muted font-sans -mt-1 hidden sm:block">
                Refúgio de Sabedoria Clássica
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-sm font-medium text-foreground-muted">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-md transition-all duration-150 relative ${
                    active
                      ? 'text-primary font-semibold bg-primary/10'
                      : 'hover:text-foreground hover:bg-card'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-border bg-card hover:bg-card-hover hover:border-primary/40 text-foreground-muted hover:text-foreground text-xs transition-colors"
              title="Buscar na Caverna (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-primary" />
              <span className="hidden md:inline">Buscar...</span>
              <kbd className="hidden md:inline px-1.5 py-0.5 text-[10px] font-mono bg-stone-pill rounded text-foreground-muted">
                ⌘K
              </kbd>
            </button>

            {/* Personal Panel / Sanctuary */}
            <Link
              href="/perfil"
              className={`p-2 rounded-lg border border-border bg-card hover:bg-card-hover hover:border-primary/40 text-foreground-muted hover:text-foreground transition-colors relative ${
                isActive('/perfil') || isActive('/diario') ? 'text-primary border-primary/40 bg-primary/10' : ''
              }`}
              title="Área Pessoal & Diário Estoico"
            >
              <BookMarked className="w-4 h-4" />
              {totalSaved > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalSaved > 9 ? '9+' : totalSaved}
                </span>
              )}
            </Link>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-border bg-card hover:bg-card-hover hover:border-primary/40 text-foreground-muted hover:text-foreground transition-colors"
              title={settings.theme === 'dark' ? 'Alternar para Modo Mármore (Claro)' : 'Alternar para Modo Caverna (Escuro)'}
            >
              {settings.theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-stone-700" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-border bg-card text-foreground-muted hover:text-foreground transition-colors"
              aria-label="Abrir menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-border bg-background px-4 py-4 space-y-2 animate-in slide-in-from-top-4 duration-200">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active 
                      ? 'bg-primary/10 text-primary font-semibold' 
                      : 'text-foreground-muted hover:text-foreground hover:bg-card'
                  }`}
                >
                  <Icon className="w-4 h-4 text-primary shrink-0" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
            <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-foreground-muted px-2">
              <Link href="/perfil" className="hover:text-primary flex items-center gap-1.5">
                <BookMarked className="w-3.5 h-3.5" /> Meu Refúgio & Diário ({totalSaved} salvos)
              </Link>
              <button onClick={toggleTheme} className="hover:text-primary flex items-center gap-1.5">
                {settings.theme === 'dark' ? '☀️ Modo Mármore' : '🌙 Modo Caverna'}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { books } from '@/lib/data';
import { useReaderState } from '@/lib/reader-store';
import BookAffiliateCard from '@/components/BookAffiliateCard';
import { 
  BookMarked, 
  ShieldCheck, 
  Search, 
  Filter, 
  Bookmark 
} from 'lucide-react';

export default function BooksPage() {
  const [selectedBadge, setSelectedBadge] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const { readingListBookSlugs } = useReaderState();

  const badges = ['Todos', 'Iniciante', 'Prática Diária', 'Aprofundamento', 'Biografia'];

  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      const matchBadge = selectedBadge === 'Todos' || b.badge.toLowerCase().includes(selectedBadge.toLowerCase());
      const matchSearch = !searchQuery.trim() ||
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.themes.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchBadge && matchSearch;
    });
  }, [selectedBadge, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20">
          <BookMarked className="w-3.5 h-3.5" />
          A Biblioteca de Alexandria da Caverna
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground tracking-tight">
          Livros Recomendados & Curadoria
        </h1>
        <p className="text-base sm:text-lg text-foreground-muted leading-relaxed font-normal">
          Uma seleção cuidadosa das traduções mais fiéis dos clássicos e dos melhores ensaios modernos para orientar seus estudos sem desperdício de tempo.
        </p>
      </div>

      {/* Transparency & Ethical Manifesto Banner */}
      <div className="rounded-2xl border border-border-accent bg-card/85 backdrop-blur-sm p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-sm">
        <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1 flex-1 text-xs sm:text-sm text-foreground-muted leading-relaxed">
          <h3 className="font-serif font-bold text-base text-foreground">
            Nosso Compromisso com a Verdade e a Transparência
          </h3>
          <p>
            Não recomendamos livros por acordos promocionais com editoras. Cada obra desta lista é pessoalmente estudada e anotada pela nossa equipe editorial. Os links direcionam para a Amazon através do Programa de Associados. Comprando por eles, você apoia a manutenção da Caverna sem pagar um centavo a mais.
          </p>
        </div>
        {readingListBookSlugs.length > 0 && (
          <Link
            href="/perfil#estante"
            className="px-4 py-2.5 rounded-lg border border-border bg-stone-pill text-xs font-semibold text-foreground hover:border-primary shrink-0 transition-colors flex items-center gap-2"
          >
            <Bookmark className="w-4 h-4 text-primary" />
            <span>Minha Estante ({readingListBookSlugs.length})</span>
          </Link>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Badge Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs w-full sm:w-auto">
          <span className="text-foreground-muted flex items-center gap-1 shrink-0 font-medium mr-1">
            <Filter className="w-3.5 h-3.5" /> Nível:
          </span>
          {badges.map((badge) => (
            <button
              key={badge}
              onClick={() => setSelectedBadge(badge)}
              className={`px-3.5 py-1.5 rounded-full transition-colors shrink-0 ${
                selectedBadge === badge
                  ? 'bg-primary text-black font-semibold shadow-sm'
                  : 'bg-card border border-border text-foreground-muted hover:text-foreground'
              }`}
            >
              {badge}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
          <input
            type="text"
            placeholder="Buscar por livro ou autor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-foreground-muted text-xs outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Books List */}
      <div className="space-y-6">
        {filteredBooks.map((book) => (
          <BookAffiliateCard key={book.slug} book={book} />
        ))}
      </div>
    </div>
  );
}

"use client";

import React from 'react';
import { ExternalLink, Star, Bookmark } from 'lucide-react';
import { Book } from '@/lib/data';
import { useReaderState } from '@/lib/reader-store';

interface BookAffiliateCardProps {
  book: Book;
  compact?: boolean;
}

export default function BookAffiliateCard({ book, compact = false }: BookAffiliateCardProps) {
  const { isBookInReadingList, toggleReadingListBook } = useReaderState();
  const isInList = isBookInReadingList(book.slug);

  if (compact) {
    return (
      <div className="rounded-xl border border-border bg-card/80 p-4 hover:border-primary/40 transition-all flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
              {book.badge}
            </span>
            <span className="text-xs text-primary font-mono flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" /> {book.rating}
            </span>
          </div>
          <h4 className="font-serif font-bold text-base text-foreground mb-0.5">
            {book.title}
          </h4>
          <p className="text-xs text-foreground-muted mb-2">Por {book.author}</p>
          <p className="text-xs text-foreground-muted line-clamp-2 mb-3">
            {book.description}
          </p>
        </div>

        <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
          <button
            onClick={() => toggleReadingListBook(book.slug)}
            className={`p-1.5 rounded border text-xs flex items-center gap-1 transition-colors ${
              isInList 
                ? 'bg-primary/20 text-primary border-primary/40' 
                : 'border-border text-foreground-muted hover:text-foreground'
            }`}
            title={isInList ? 'Remover da minha estante' : 'Salvar para ler depois'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isInList ? 'fill-current' : ''}`} />
            <span className="text-[11px]">{isInList ? 'Na Estante' : 'Quero Ler'}</span>
          </button>

          <a
            href={book.amazonUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-black text-xs font-semibold transition-colors"
          >
            <span>Ver na Amazon</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div id={book.slug} className="scroll-mt-24 rounded-2xl border border-border bg-card/90 backdrop-blur-md p-6 sm:p-8 hover:border-primary/40 transition-all shadow-lg flex flex-col md:flex-row gap-6 items-start">
      {/* Visual Book Spine / Mockup */}
      <div className="w-full md:w-48 shrink-0 flex flex-col items-center">
        <div className="w-40 h-56 rounded-lg bg-gradient-to-br from-stone-800 via-stone-900 to-black p-4 text-stone-100 flex flex-col justify-between shadow-2xl border-l-4 border-primary relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none" />
          <div className="text-center">
            <span className="text-[9px] font-mono tracking-widest text-primary uppercase block mb-1">
              Biblioteca Clássica
            </span>
            <h5 className="font-serif font-bold text-sm text-stone-100 leading-tight">
              {book.title}
            </h5>
            <p className="text-[10px] text-stone-400 mt-1 italic">{book.author}</p>
          </div>
          <div className="text-center pt-2 border-t border-stone-800">
            <span className="text-[9px] text-stone-500 font-mono">Caverna do Estoico</span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs text-foreground-muted">
          <span className="flex items-center text-primary font-bold">
            <Star className="w-3.5 h-3.5 fill-current mr-1" />
            {book.rating}
          </span>
          <span>•</span>
          <span>{book.pages} páginas</span>
        </div>
      </div>

      {/* Book Details */}
      <div className="flex-1 space-y-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              {book.badge}
            </span>
            {book.themes.map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-stone-pill text-foreground-muted">
                {t}
              </span>
            ))}
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
            {book.title}
          </h3>
          {book.subtitle && (
            <p className="text-sm text-foreground-muted mt-0.5 font-sans">
              {book.subtitle}
            </p>
          )}
          <p className="text-xs text-primary font-medium mt-1">Por {book.author}</p>
        </div>

        <p className="text-sm text-foreground/90 leading-relaxed">
          {book.description}
        </p>

        {/* Indicação e Conexão com Estoicismo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-border text-xs">
          <div className="space-y-1">
            <span className="font-semibold text-foreground uppercase tracking-wider block">
              🎯 Para quem é indicado:
            </span>
            <p className="text-foreground-muted leading-relaxed">
              {book.targetAudience}
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-semibold text-foreground uppercase tracking-wider block">
              🏛️ Conexão com a Filosofia:
            </span>
            <p className="text-foreground-muted leading-relaxed">
              {book.connectionToStoicism}
            </p>
          </div>
        </div>

        {/* Conversion & Affiliate Action */}
        <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleReadingListBook(book.slug)}
              className={`px-3 py-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                isInList
                  ? 'bg-primary/20 text-primary border-primary/40'
                  : 'border-border text-foreground-muted hover:text-foreground hover:bg-stone-pill'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isInList ? 'fill-current' : ''}`} />
              {isInList ? 'Salvo na Minha Estante' : 'Salvar para Ler Depois'}
            </button>
          </div>

          <div className="flex flex-col sm:items-end gap-1">
            <a
              href={book.amazonUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-black hover:bg-primary-hover font-semibold text-xs transition-all shadow-md hover:shadow-lg"
            >
              <span>Conhecer o livro na Amazon</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <span className="text-[10px] text-foreground-muted italic">
              * Link de afiliado da Amazon. Preço oficial sem custos extras.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

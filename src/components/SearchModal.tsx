"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, BookOpen, Quote, User, Sparkles, ArrowRight } from 'lucide-react';
import { blogPosts, quotes, philosophers, books } from '@/lib/data';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'artigos' | 'citacoes' | 'filosofos' | 'livros'>('all');

  // Handle ESC key and Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return { articles: [], quotes: [], philosophers: [], books: [] };

    const q = query.toLowerCase().trim();

    const matchedArticles = blogPosts.filter(
      p => p.title.toLowerCase().includes(q) || 
           p.subtitle.toLowerCase().includes(q) || 
           p.excerpt.toLowerCase().includes(q) ||
           p.theme.toLowerCase().includes(q)
    );

    const matchedQuotes = quotes.filter(
      qt => qt.text.toLowerCase().includes(q) || 
            qt.author.toLowerCase().includes(q) || 
            qt.theme.toLowerCase().includes(q) ||
            qt.source.toLowerCase().includes(q)
    );

    const matchedPhilosophers = philosophers.filter(
      ph => ph.name.toLowerCase().includes(q) || 
            ph.role.toLowerCase().includes(q) || 
            ph.bio.toLowerCase().includes(q) ||
            ph.keyTeachings.some(t => t.toLowerCase().includes(q))
    );

    const matchedBooks = books.filter(
      b => b.title.toLowerCase().includes(q) || 
           b.author.toLowerCase().includes(q) || 
           b.themes.some(t => t.toLowerCase().includes(q)) ||
           b.description.toLowerCase().includes(q)
    );

    return {
      articles: matchedArticles,
      quotes: matchedQuotes,
      philosophers: matchedPhilosophers,
      books: matchedBooks
    };
  }, [query]);

  if (!isOpen) return null;

  const totalResults = 
    filteredResults.articles.length + 
    filteredResults.quotes.length + 
    filteredResults.philosophers.length + 
    filteredResults.books.length;

  const handleNavigate = (path: string) => {
    onClose();
    router.push(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/70 backdrop-blur-md transition-all">
      <div 
        className="w-full max-w-2xl bg-background border border-border-accent rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-border bg-card">
          <Search className="w-5 h-5 text-primary mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Buscar artigos, citações, filósofos, livros ou temas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-foreground placeholder:text-foreground-muted outline-none text-base font-sans"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 hover:text-primary transition-colors text-foreground-muted"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="ml-2 text-xs font-mono px-2 py-1 bg-stone-pill rounded text-foreground-muted hover:text-foreground transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 px-4 py-2 border-b border-border text-xs overflow-x-auto bg-background-alt/50">
          {(['all', 'artigos', 'citacoes', 'filosofos', 'livros'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1 rounded-full capitalize transition-colors whitespace-nowrap ${
                selectedFilter === filter 
                  ? 'bg-primary text-black font-semibold' 
                  : 'bg-stone-pill text-foreground-muted hover:text-foreground'
              }`}
            >
              {filter === 'all' ? 'Tudo' : filter}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 space-y-6 flex-1">
          {!query ? (
            <div className="py-12 text-center text-foreground-muted space-y-3">
              <Sparkles className="w-8 h-8 mx-auto text-primary/70 mb-2" />
              <p className="text-base font-serif text-foreground">Explore a sabedoria da Caverna</p>
              <p className="text-xs max-w-sm mx-auto">
                Experimente buscar por temas como <span className="text-primary cursor-pointer hover:underline" onClick={() => setQuery('ansiedade')}>"ansiedade"</span>, <span className="text-primary cursor-pointer hover:underline" onClick={() => setQuery('disciplina')}>"disciplina"</span>, filósofos como <span className="text-primary cursor-pointer hover:underline" onClick={() => setQuery('Marco Aurélio')}>"Marco Aurélio"</span> ou <span className="text-primary cursor-pointer hover:underline" onClick={() => setQuery('Sêneca')}>"Sêneca"</span>.
              </p>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-foreground-muted">
              <p className="text-base font-serif text-foreground mb-1">Nenhum ensinamento encontrado</p>
              <p className="text-xs">Tente buscar por termos mais amplos ou verificar a ortografia.</p>
            </div>
          ) : (
            <>
              {/* Philosophers */}
              {(selectedFilter === 'all' || selectedFilter === 'filosofos') && filteredResults.philosophers.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Filósofos ({filteredResults.philosophers.length})
                  </h4>
                  <div className="space-y-2">
                    {filteredResults.philosophers.map((p) => (
                      <div
                        key={p.slug}
                        onClick={() => handleNavigate(`/philosophers/${p.slug}`)}
                        className="p-3 rounded-lg border border-border bg-card hover:bg-card-hover hover:border-primary/40 cursor-pointer transition-all flex items-center justify-between group"
                      >
                        <div>
                          <span className="font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                            {p.name}
                          </span>
                          <span className="text-xs text-foreground-muted ml-2">({p.period})</span>
                          <p className="text-xs text-foreground-muted line-clamp-1 mt-0.5">{p.role}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-foreground-muted group-hover:text-primary transition-transform group-hover:translate-x-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles */}
              {(selectedFilter === 'all' || selectedFilter === 'artigos') && filteredResults.articles.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Artigos & Reflexões ({filteredResults.articles.length})
                  </h4>
                  <div className="space-y-2">
                    {filteredResults.articles.map((art) => (
                      <div
                        key={art.slug}
                        onClick={() => handleNavigate(`/blog/${art.slug}`)}
                        className="p-3 rounded-lg border border-border bg-card hover:bg-card-hover hover:border-primary/40 cursor-pointer transition-all flex items-center justify-between group"
                      >
                        <div className="pr-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                              {art.theme}
                            </span>
                            <span className="text-[11px] text-foreground-muted">{art.readTimeMinutes} min de leitura</span>
                          </div>
                          <h5 className="font-serif font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                            {art.title}
                          </h5>
                          <p className="text-xs text-foreground-muted line-clamp-1 mt-1">{art.subtitle}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-foreground-muted group-hover:text-primary shrink-0 transition-transform group-hover:translate-x-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quotes */}
              {(selectedFilter === 'all' || selectedFilter === 'citacoes') && filteredResults.quotes.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
                    <Quote className="w-3.5 h-3.5" /> Citações Verificadas ({filteredResults.quotes.length})
                  </h4>
                  <div className="space-y-2">
                    {filteredResults.quotes.map((q) => (
                      <div
                        key={q.id}
                        onClick={() => handleNavigate(`/citacoes?filtro=${encodeURIComponent(q.theme)}`)}
                        className="p-3 rounded-lg border border-border bg-card hover:bg-card-hover hover:border-primary/40 cursor-pointer transition-all group"
                      >
                        <p className="font-serif italic text-sm text-foreground mb-1.5">
                          "{q.text}"
                        </p>
                        <div className="flex items-center justify-between text-xs text-foreground-muted">
                          <span>— <strong className="text-primary font-medium">{q.author}</strong>, <span className="italic">{q.source}</span></span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-stone-pill">{q.theme}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Books */}
              {(selectedFilter === 'all' || selectedFilter === 'livros') && filteredResults.books.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Livros Recomendados ({filteredResults.books.length})
                  </h4>
                  <div className="space-y-2">
                    {filteredResults.books.map((b) => (
                      <div
                        key={b.slug}
                        onClick={() => handleNavigate(`/livros#${b.slug}`)}
                        className="p-3 rounded-lg border border-border bg-card hover:bg-card-hover hover:border-primary/40 cursor-pointer transition-all flex items-center justify-between group"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                              {b.title}
                            </span>
                            <span className="text-[10px] text-primary/80 font-mono">★ {b.rating}</span>
                          </div>
                          <p className="text-xs text-foreground-muted">Por {b.author}</p>
                        </div>
                        <span className="text-[11px] text-primary underline shrink-0 font-medium">Ver recomendação</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

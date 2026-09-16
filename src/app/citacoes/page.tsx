"use client";

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { quotes, themesList, philosophers, Quote } from '@/lib/data';
import { useReaderState } from '@/lib/reader-store';
import { 
  Sparkles, 
  Search, 
  Heart, 
  Share2, 
  Copy, 
  Check, 
  Filter, 
  User
} from 'lucide-react';
import QuoteShareModal from '@/components/QuoteShareModal';

function QuotesContent() {
  const searchParams = useSearchParams();
  const initialTheme = searchParams.get('filtro') || 'Todos';

  const [selectedTheme, setSelectedTheme] = useState(initialTheme);
  const [selectedAuthor, setSelectedAuthor] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [shareModalQuote, setShareModalQuote] = useState<Quote | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { isFavoriteQuote, toggleFavoriteQuote } = useReaderState();

  const filteredQuotes = useMemo(() => {
    return quotes.filter((q) => {
      const matchTheme = selectedTheme === 'Todos' || q.theme.toLowerCase() === selectedTheme.toLowerCase();
      const matchAuthor = selectedAuthor === 'Todos' || q.authorSlug === selectedAuthor;
      const matchSearch = !searchQuery.trim() || 
        q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.source.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTheme && matchAuthor && matchSearch;
    });
  }, [selectedTheme, selectedAuthor, searchQuery]);

  const handleCopy = (q: Quote) => {
    const text = `"${q.text}"\n— ${q.author} (${q.source})\n\n🏛️ Caverna do Estoico`;
    navigator.clipboard.writeText(text);
    setCopiedId(q.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20">
          <Sparkles className="w-3.5 h-3.5" />
          Sentenças & Citações Clássicas
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground tracking-tight">
          A Biblioteca de Citações
        </h1>
        <p className="text-base sm:text-lg text-foreground-muted leading-relaxed font-normal">
          Palavras lapidadas em mármore para carregar consigo nos momentos de incerteza, adversidade e triunfo.
        </p>
      </div>

      {/* Filter and Search Box */}
      <div className="space-y-4 max-w-4xl mx-auto bg-card/70 border border-border p-6 rounded-2xl">
        {/* Search */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted" />
          <input
            type="text"
            placeholder="Buscar por palavra-chave (ex: morte, controle, razão, tranquilidade)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground-muted text-sm outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Author Select & Theme Pills */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-2">
          {/* Author filter */}
          <div className="flex items-center gap-2 text-xs">
            <User className="w-4 h-4 text-primary shrink-0" />
            <span className="font-semibold text-foreground">Autor:</span>
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-xs outline-none focus:border-primary"
            >
              <option value="Todos">Todos os Filósofos</option>
              {philosophers.map((ph) => (
                <option key={ph.slug} value={ph.slug}>{ph.name}</option>
              ))}
            </select>
          </div>

          {/* Result counter */}
          <span className="text-xs text-foreground-muted font-mono">
            {filteredQuotes.length} de {quotes.length} sentenças encontradas
          </span>
        </div>

        {/* Theme Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs pt-2 border-t border-border">
          <span className="text-foreground-muted flex items-center gap-1 shrink-0 font-medium mr-1">
            <Filter className="w-3.5 h-3.5" /> Tema:
          </span>
          <button
            onClick={() => setSelectedTheme('Todos')}
            className={`px-3 py-1 rounded-full transition-colors shrink-0 ${
              selectedTheme === 'Todos'
                ? 'bg-primary text-black font-semibold'
                : 'bg-stone-pill text-foreground-muted hover:text-foreground'
            }`}
          >
            Todos
          </button>
          {themesList.map((th) => (
            <button
              key={th}
              onClick={() => setSelectedTheme(th)}
              className={`px-3 py-1 rounded-full transition-colors shrink-0 ${
                selectedTheme === th
                  ? 'bg-primary text-black font-semibold'
                  : 'bg-stone-pill text-foreground-muted hover:text-foreground'
              }`}
            >
              {th}
            </button>
          ))}
        </div>
      </div>

      {/* Quotes Grid */}
      {filteredQuotes.length === 0 ? (
        <div className="py-20 text-center text-foreground-muted space-y-3">
          <p className="text-lg font-serif text-foreground">Nenhuma citação encontrada</p>
          <p className="text-xs">Tente outros filtros de tema ou autor.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredQuotes.map((quote) => {
            const isFav = isFavoriteQuote(quote.id);
            const isCopied = copiedId === quote.id;

            return (
              <div
                key={quote.id}
                className="rounded-2xl border border-border bg-card/85 backdrop-blur-sm p-6 sm:p-7 hover:border-primary/50 transition-all flex flex-col justify-between shadow-md group relative"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] uppercase font-semibold tracking-wider px-2.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                      {quote.theme}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => toggleFavoriteQuote(quote.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isFav 
                            ? 'bg-rose-500/10 border-rose-500/30 text-rose-500' 
                            : 'border-border text-foreground-muted hover:text-foreground'
                        }`}
                        title={isFav ? 'Remover dos favoritos' : 'Favoritar'}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                      </button>

                      <button
                        onClick={() => setShareModalQuote(quote)}
                        className="p-1.5 rounded-lg border border-border text-foreground-muted hover:text-foreground transition-colors"
                        title="Gerar cartão para compartilhar"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleCopy(quote)}
                        className="p-1.5 rounded-lg border border-border text-foreground-muted hover:text-foreground transition-colors"
                        title="Copiar texto"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <blockquote className="font-serif text-lg sm:text-xl text-foreground font-normal leading-relaxed italic mb-4">
                    "{quote.text}"
                  </blockquote>
                </div>

                <div className="pt-4 mt-2 border-t border-border flex items-center justify-between text-xs">
                  <div>
                    <Link
                      href={`/philosophers/${quote.authorSlug}`}
                      className="font-bold text-primary hover:underline"
                    >
                      {quote.author}
                    </Link>
                    <span className="text-foreground-muted ml-1.5 italic">— {quote.source}</span>
                  </div>

                  <span className="text-[10px] text-foreground-muted font-mono">
                    #{quote.id}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Share Modal */}
      {shareModalQuote && (
        <QuoteShareModal
          quote={shareModalQuote}
          isOpen={!!shareModalQuote}
          onClose={() => setShareModalQuote(null)}
        />
      )}
    </div>
  );
}

export default function QuotesPage() {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto px-4 py-20 text-center text-foreground-muted font-serif">Carregando a biblioteca de citações...</div>}>
      <QuotesContent />
    </Suspense>
  );
}

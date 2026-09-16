"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Share2, 
  Heart, 
  History, 
  Flame, 
  Check
} from 'lucide-react';
import { dailyReflections, Quote } from '@/lib/data';
import { useReaderState } from '@/lib/reader-store';
import QuoteShareModal from './QuoteShareModal';

export default function DailyReflectionCard() {
  const { 
    isDailyActionCompleted, 
    toggleDailyActionComplete, 
    isFavoriteQuote, 
    toggleFavoriteQuote 
  } = useReaderState();

  const [shareQuote, setShareQuote] = useState<Quote | null>(null);
  const [copied, setCopied] = useState(false);

  // Today's reflection (using the first reflection or alternating by day)
  const today = dailyReflections[0];
  const isCompleted = isDailyActionCompleted(today.dateStr);
  const isFavorited = isFavoriteQuote(today.quote.id);

  const handleCopy = () => {
    const textToCopy = `"${today.quote.text}" — ${today.quote.author} (${today.quote.source})\n\nReflexão diária na Caverna do Estoico`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div id="reflexao-do-dia" className="scroll-mt-24 w-full">
      <div className="relative rounded-2xl border border-border-accent bg-card/90 backdrop-blur-md p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden transition-all duration-300">
        {/* Subtle architectural flourish */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />
        
        {/* Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="w-3.5 h-3.5" />
              Reflexão do Dia
            </span>
            <span className="text-xs text-foreground-muted font-mono">
              Hoje • {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavoriteQuote(today.quote.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isFavorited 
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-500' 
                  : 'border-border bg-stone-pill/40 text-foreground-muted hover:text-foreground'
              }`}
              title={isFavorited ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => setShareQuote(today.quote)}
              className="p-2 rounded-lg border border-border bg-stone-pill/40 text-foreground-muted hover:text-foreground transition-colors"
              title="Gerar cartão de citação"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Central Quote Block */}
        <div className="my-6 pl-4 border-l-2 border-primary/60">
          <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-foreground font-normal leading-relaxed">
            "{today.quote.text}"
          </blockquote>
          <div className="mt-3 flex items-center gap-2 text-sm text-foreground-muted">
            <Link 
              href={`/philosophers/${today.quote.authorSlug}`}
              className="font-semibold text-primary hover:underline"
            >
              {today.quote.author}
            </Link>
            <span>•</span>
            <span className="italic">{today.quote.source}</span>
          </div>
        </div>

        {/* Two-Column Deep Context & Practical Reflection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border">
          {/* Reflection */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" /> O Ensinamento Prático
            </h4>
            <p className="text-sm text-foreground/90 leading-relaxed">
              {today.reflection}
            </p>
          </div>

          {/* Historical Context */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted flex items-center gap-1.5">
              <History className="w-3.5 h-3.5" /> Contexto Histórico
            </h4>
            <p className="text-sm text-foreground-muted leading-relaxed">
              {today.historicalContext}
            </p>
          </div>
        </div>

        {/* Interactive Action of the Day */}
        <div className="mt-8 pt-6 border-t border-border/80 bg-background-alt/50 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 md:-mx-10 md:-mb-10 p-6 sm:p-8 rounded-b-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary block">
              Ação Estoica do Dia
            </span>
            <p className="text-sm sm:text-base text-foreground font-serif">
              {today.dailyAction}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => toggleDailyActionComplete(today.dateStr)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium transition-all w-full sm:w-auto ${
                isCompleted
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-primary text-black hover:bg-primary-hover font-semibold shadow-sm'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Praticado Hoje!
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" />
                  Marcar como Praticado
                </>
              )}
            </button>

            <button
              onClick={handleCopy}
              className="px-3 py-2.5 rounded-lg border border-border text-xs text-foreground-muted hover:text-foreground transition-colors shrink-0"
              title="Copiar citação para compartilhar"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : 'Copiar'}
            </button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {shareQuote && (
        <QuoteShareModal 
          quote={shareQuote} 
          isOpen={!!shareQuote} 
          onClose={() => setShareQuote(null)} 
        />
      )}
    </div>
  );
}

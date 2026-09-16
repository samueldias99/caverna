"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { newsletterEditions } from '@/lib/data';
import NewsletterCard from '@/components/NewsletterCard';
import { Calendar, Sparkles, Flame, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

export default function NewsletterPage() {
  const [expandedIssueNumber, setExpandedIssueNumber] = useState<number | null>(newsletterEditions[0].issueNumber);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-16">
      {/* Header and Signup Box */}
      <NewsletterCard />

      {/* Why subscribe section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-border">
        <div className="p-6 rounded-2xl border border-border bg-card/70 space-y-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
            <Calendar className="w-5 h-5" />
          </div>
          <h4 className="font-serif font-bold text-base text-foreground">
            Aos Domingos de Manhã
          </h4>
          <p className="text-xs text-foreground-muted leading-relaxed">
            Um ritual matinal para desacelerar a mente antes da semana começar, com calma e perspectiva.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card/70 space-y-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
            <Flame className="w-5 h-5" />
          </div>
          <h4 className="font-serif font-bold text-base text-foreground">
            Exercício Prático
          </h4>
          <p className="text-xs text-foreground-muted leading-relaxed">
            Nada de teoria vazia. Toda edição propõe uma atitude deliberada para testar sua resiliência e paciência no dia a dia.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-border bg-card/70 space-y-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5" />
          </div>
          <h4 className="font-serif font-bold text-base text-foreground">
            Sem Algoritmos ou Pressa
          </h4>
          <p className="text-xs text-foreground-muted leading-relaxed">
            Entregue diretamente na sua caixa de entrada, sem feeds infinitos ou notificações invasivas.
          </p>
        </div>
      </div>

      {/* Archive of Past Editions */}
      <div className="space-y-6 pt-8 border-t border-border">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="w-3.5 h-3.5" />
            Arquivo Aberto
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            Edições Anteriores da Carta da Caverna
          </h2>
          <p className="text-xs text-foreground-muted">
            Leia um exemplo das reflexões enviadas aos nossos leitores.
          </p>
        </div>

        <div className="space-y-4">
          {newsletterEditions.map((edition) => {
            const isExpanded = expandedIssueNumber === edition.issueNumber;
            return (
              <div
                key={edition.issueNumber}
                className="rounded-2xl border border-border bg-card/85 backdrop-blur-sm overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setExpandedIssueNumber(isExpanded ? null : edition.issueNumber)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-card-hover transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-foreground-muted">
                      <span className="font-mono text-primary font-bold">Edição #{edition.issueNumber}</span>
                      <span>•</span>
                      <span>{edition.date}</span>
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground">
                      {edition.title}
                    </h3>
                  </div>
                  <div className="shrink-0 p-2 rounded-lg border border-border text-foreground-muted">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-border/60 space-y-6 animate-in fade-in duration-200">
                    <p className="text-sm sm:text-base text-foreground/90 font-serif leading-relaxed">
                      {edition.reflection}
                    </p>

                    {/* Featured Quote */}
                    <blockquote className="pl-4 border-l-2 border-primary italic font-serif text-sm text-foreground bg-stone-pill/40 p-3 rounded-r-lg">
                      "{edition.quote.text}"
                      <footer className="text-xs text-primary font-medium mt-1 not-italic">
                        — {edition.quote.author} ({edition.quote.source})
                      </footer>
                    </blockquote>

                    {/* Practical Exercise */}
                    <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-1.5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5" /> Ação da Semana:
                      </span>
                      <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-sans">
                        {edition.exercise}
                      </p>
                    </div>

                    {/* Reading recommendation */}
                    <div className="pt-2 text-xs text-foreground-muted flex items-center justify-between border-t border-border">
                      <span>📖 Leitura recomendada: <strong className="text-foreground">{edition.readingSuggestion}</strong></span>
                      <Link href="/livros" className="text-primary hover:underline font-medium">
                        Ver na Biblioteca →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

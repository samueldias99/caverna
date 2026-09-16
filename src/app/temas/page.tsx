"use client";

import React from 'react';
import Link from 'next/link';
import { themesList, blogPosts, quotes, books } from '@/lib/data';
import { Layers, ArrowRight } from 'lucide-react';

export default function TemasPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20">
          <Layers className="w-3.5 h-3.5" />
          Índice Temático
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground tracking-tight">
          Navegação por Temas
        </h1>
        <p className="text-base sm:text-lg text-foreground-muted leading-relaxed font-normal">
          Acesse diretamente a sabedoria da Stoa conforme os desafios que você está vivenciando hoje.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {themesList.map((theme) => {
          const matchingArticles = blogPosts.filter(p => p.theme === theme);
          const matchingQuotes = quotes.filter(q => q.theme === theme);
          const matchingBooks = books.filter(b => b.themes.includes(theme));

          return (
            <div
              key={theme}
              className="rounded-2xl border border-border bg-card/85 backdrop-blur-sm p-6 sm:p-8 hover:border-primary/50 transition-all flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-2xl font-bold text-foreground">
                    {theme}
                  </h3>
                  <span className="text-xs font-mono text-primary px-2.5 py-0.5 rounded bg-primary/10 border border-primary/20">
                    {matchingArticles.length} artigos • {matchingQuotes.length} citações • {matchingBooks.length} obras
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  {matchingArticles.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-semibold text-foreground-muted tracking-wider block">
                        Artigos em destaque:
                      </span>
                      {matchingArticles.slice(0, 2).map((a) => (
                        <Link
                          key={a.slug}
                          href={`/blog/${a.slug}`}
                          className="block text-xs font-medium text-foreground hover:text-primary transition-colors truncate"
                        >
                          • {a.title}
                        </Link>
                      ))}
                    </div>
                  )}

                  {matchingQuotes.length > 0 && (
                    <div className="pt-2 border-t border-border/60">
                      <p className="text-xs font-serif italic text-foreground-muted line-clamp-2">
                        "{matchingQuotes[0].text}" — <span className="text-foreground">{matchingQuotes[0].author}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                <Link
                  href={`/citacoes?filtro=${encodeURIComponent(theme)}`}
                  className="text-foreground-muted hover:text-primary transition-colors"
                >
                  Ver citações de {theme}
                </Link>
                <Link
                  href={`/blog?tema=${encodeURIComponent(theme)}`}
                  className="font-semibold text-primary hover:underline flex items-center gap-1"
                >
                  <span>Explorar artigos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

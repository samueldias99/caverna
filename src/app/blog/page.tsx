"use client";

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { blogPosts, themesList } from '@/lib/data';
import { useReaderState } from '@/lib/reader-store';
import { 
  Scroll, 
  Search, 
  Clock, 
  ArrowRight, 
  Bookmark, 
  BookOpen, 
  Filter
} from 'lucide-react';

function BlogContent() {
  const searchParams = useSearchParams();
  const initialTheme = searchParams.get('tema') || 'Todos';

  const [selectedTheme, setSelectedTheme] = useState(initialTheme);
  const [searchQuery, setSearchQuery] = useState('');
  const { isArticleSaved, toggleSaveArticle } = useReaderState();

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchTheme = selectedTheme === 'Todos' || post.theme.toLowerCase() === selectedTheme.toLowerCase();
      const matchSearch = !searchQuery.trim() || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.theme.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTheme && matchSearch;
    });
  }, [selectedTheme, searchQuery]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20">
          <Scroll className="w-3.5 h-3.5" />
          Reflexões & Ensaios Práticos
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground tracking-tight">
          A Ágora das Ideias
        </h1>
        <p className="text-base sm:text-lg text-foreground-muted font-normal leading-relaxed">
          Textos aprofundados que transformam as ideias milenares de Marco Aurélio, Sêneca e Epicteto em bússolas diárias para a calma, o foco e a autonomia.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted" />
          <input
            type="text"
            placeholder="Buscar por temas, palavras-chave ou ensinamentos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-border bg-card text-foreground placeholder:text-foreground-muted outline-none focus:border-primary text-sm transition-colors shadow-sm"
          />
        </div>

        {/* Theme Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          <span className="text-foreground-muted flex items-center gap-1 shrink-0 font-medium mr-1">
            <Filter className="w-3.5 h-3.5" /> Temas:
          </span>
          <button
            onClick={() => setSelectedTheme('Todos')}
            className={`px-3.5 py-1.5 rounded-full transition-colors shrink-0 ${
              selectedTheme === 'Todos'
                ? 'bg-primary text-black font-semibold'
                : 'bg-card border border-border text-foreground-muted hover:text-foreground'
            }`}
          >
            Todos ({blogPosts.length})
          </button>
          {themesList.map((theme) => {
            const count = blogPosts.filter(p => p.theme === theme).length;
            if (count === 0) return null;
            return (
              <button
                key={theme}
                onClick={() => setSelectedTheme(theme)}
                className={`px-3.5 py-1.5 rounded-full transition-colors shrink-0 ${
                  selectedTheme === theme
                    ? 'bg-primary text-black font-semibold'
                    : 'bg-card border border-border text-foreground-muted hover:text-foreground hover:border-primary/40'
                }`}
              >
                {theme} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Feed */}
      {filteredPosts.length === 0 ? (
        <div className="py-20 text-center text-foreground-muted space-y-3">
          <BookOpen className="w-8 h-8 mx-auto text-primary/60" />
          <p className="text-lg font-serif text-foreground">Nenhum ensaio encontrado</p>
          <p className="text-xs">Tente selecionar outro tema ou redefinir a busca.</p>
          <button
            onClick={() => { setSelectedTheme('Todos'); setSearchQuery(''); }}
            className="text-xs text-primary underline pt-2"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => {
            const isSaved = isArticleSaved(post.slug);
            return (
              <article
                key={post.slug}
                className="rounded-2xl border border-border bg-card/85 backdrop-blur-sm p-6 hover:border-primary/50 transition-all hover:shadow-xl flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                      {post.theme}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 text-foreground-muted">
                        <Clock className="w-3 h-3" />
                        {post.readTimeMinutes} min
                      </span>
                      <button
                        onClick={() => toggleSaveArticle(post.slug)}
                        className={`p-1 rounded hover:text-primary transition-colors ${
                          isSaved ? 'text-primary' : 'text-foreground-muted'
                        }`}
                        title={isSaved ? 'Remover dos salvos' : 'Salvar para ler depois'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-xs font-serif italic text-foreground-muted">
                    {post.subtitle}
                  </p>

                  <p className="text-xs text-foreground/80 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-border flex items-center justify-between text-xs text-foreground-muted">
                  <span>{post.date}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-semibold text-primary group-hover:underline flex items-center gap-1"
                  >
                    <span>Ler ensaio</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="max-w-6xl mx-auto px-4 py-20 text-center text-foreground-muted font-serif">Carregando a biblioteca de ensaios...</div>}>
      <BlogContent />
    </Suspense>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Clock, 
  Calendar, 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  Check, 
  BookOpen, 
  ExternalLink,
  Flame,
  ArrowRight,
  Maximize2,
  Minimize2,
  Type
} from 'lucide-react';
import { BlogPost, books } from '@/lib/data';
import { useReaderState } from '@/lib/reader-store';

interface ArticleReaderViewProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export default function ArticleReaderView({ post, relatedPosts }: ArticleReaderViewProps) {
  const { isArticleSaved, toggleSaveArticle, settings, setFontSize } = useReaderState();
  const isSaved = isArticleSaved(post.slug);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isZenMode, setIsZenMode] = useState(false);

  // Recommended book for this article
  const recommendedBook = books.find(b => post.recommendedBookSlugs?.includes(b.slug)) || books[0];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    navigator.clipboard.writeText(`${post.title}\n${url}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cycleFontSize = () => {
    if (settings.fontSize === 'normal') setFontSize('large');
    else if (settings.fontSize === 'large') setFontSize('larger');
    else setFontSize('normal');
  };

  const getFontSizeClass = () => {
    switch (settings.fontSize) {
      case 'large': return 'text-lg md:text-xl leading-relaxed';
      case 'larger': return 'text-xl md:text-2xl leading-loose';
      default: return 'text-base md:text-lg leading-relaxed';
    }
  };

  return (
    <div className={`relative w-full ${isZenMode ? 'py-8' : 'py-12 md:py-16'}`}>
      {/* Sticky Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-border z-50 pointer-events-none">
        <div 
          className="h-full bg-primary transition-all duration-150 ease-out" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Navigation & Controls Bar */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-border text-xs text-foreground-muted">
          <Link 
            href="/blog" 
            className="flex items-center gap-1.5 hover:text-primary transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Blog</span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Font Size Adjuster */}
            <button
              onClick={cycleFontSize}
              className="px-2.5 py-1 rounded border border-border bg-card hover:text-foreground transition-colors flex items-center gap-1"
              title="Ajustar tamanho da fonte de leitura"
            >
              <Type className="w-3.5 h-3.5" />
              <span className="capitalize">{settings.fontSize}</span>
            </button>

            {/* Zen Mode Toggle */}
            <button
              onClick={() => setIsZenMode(!isZenMode)}
              className={`p-1.5 rounded border transition-colors ${
                isZenMode ? 'bg-primary/20 text-primary border-primary/40' : 'border-border bg-card hover:text-foreground'
              }`}
              title={isZenMode ? 'Desativar Modo Foco' : 'Ativar Modo Foco (Zen)'}
            >
              {isZenMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            {/* Bookmark */}
            <button
              onClick={() => toggleSaveArticle(post.slug)}
              className={`p-1.5 rounded border transition-colors ${
                isSaved ? 'bg-primary/20 text-primary border-primary/40' : 'border-border bg-card hover:text-foreground'
              }`}
              title={isSaved ? 'Remover dos salvos' : 'Salvar para ler depois'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            {/* Share */}
            <button
              onClick={handleShare}
              className="p-1.5 rounded border border-border bg-card hover:text-foreground transition-colors"
              title="Copiar link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Article Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
              {post.theme}
            </span>
            <span className="flex items-center gap-1 text-foreground-muted">
              <Calendar className="w-3 h-3" />
              {post.date}
            </span>
            <span className="flex items-center gap-1 text-foreground-muted">
              <Clock className="w-3 h-3" />
              {post.readTimeMinutes} min de leitura atenta
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-[1.2]">
            {post.title}
          </h1>

          <p className="font-serif text-lg sm:text-xl text-foreground-muted italic leading-relaxed">
            {post.subtitle}
          </p>

          <div className="pt-2 flex items-center gap-3 text-xs text-foreground-muted border-t border-border">
            <span>Por <strong className="text-foreground">{post.author}</strong></span>
            <span>•</span>
            <span>Revisado segundo as fontes primárias clássicas</span>
          </div>
        </header>

        {/* Article Body */}
        <article className="prose prose-stone dark:prose-invert max-w-none">
          <div className={`space-y-6 text-foreground font-serif ${getFontSizeClass()}`}>
            {post.content.split('\n\n').map((paragraph, index) => {
              // Highlight blockquotes starting with > or quotes
              if (paragraph.startsWith('—') || paragraph.startsWith('"') || paragraph.startsWith('>')) {
                return (
                  <blockquote 
                    key={index}
                    className="my-8 pl-6 border-l-2 border-primary/80 italic text-foreground font-serif bg-card/40 p-4 rounded-r-lg"
                  >
                    {paragraph}
                  </blockquote>
                );
              }
              // Section headers starting with ### or ##
              if (paragraph.startsWith('## ') || paragraph.startsWith('### ')) {
                const title = paragraph.replace(/#/g, '').trim();
                return (
                  <h3 key={index} className="font-serif text-2xl font-bold text-foreground mt-8 mb-4">
                    {title}
                  </h3>
                );
              }

              return (
                <p key={index} className="leading-relaxed font-normal">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </article>

        {/* Contextual Amazon Affiliate Book Box */}
        {recommendedBook && (
          <div className="my-12 rounded-2xl border border-border-accent bg-card/90 backdrop-blur-sm p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-wider text-primary">
                <BookOpen className="w-4 h-4" />
                Leitura Recomendada para Aprofundamento
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-stone-pill text-foreground-muted">
                Curadoria da Caverna
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="space-y-2 flex-1">
                <h4 className="font-serif text-xl font-bold text-foreground">
                  {recommendedBook.title}
                </h4>
                <p className="text-xs text-primary font-medium">Por {recommendedBook.author}</p>
                <p className="text-xs text-foreground/80 leading-relaxed">
                  {recommendedBook.description}
                </p>
                <p className="text-xs text-foreground-muted italic pt-1">
                  💡 {recommendedBook.connectionToStoicism}
                </p>
              </div>

              <div className="shrink-0 flex flex-col sm:items-end justify-between gap-3 w-full sm:w-auto">
                <a
                  href={recommendedBook.amazonUrl}
                  target="_blank"
                  rel="sponsored noopener noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-primary text-black hover:bg-primary-hover font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Conhecer na Amazon</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span className="text-[10px] text-foreground-muted italic text-center sm:text-right">
                  * Link de afiliado editorial transparente.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Practical Stoic Reflection & Exercise of the Day */}
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <Flame className="w-4 h-4" />
            <span>Exercício de Aplicação Prática</span>
          </div>
          <h4 className="font-serif text-lg font-bold text-foreground">
            Como praticar este ensinamento hoje:
          </h4>
          <p className="text-sm text-foreground/90 leading-relaxed font-sans">
            Ao longo de hoje, observe a primeira frustração que surgir. Em vez de reagir imediatamente, pause por dez segundos e pergunte a si mesmo: <em className="text-primary font-serif">"Isto é uma ameaça ao meu caráter moral, ou apenas uma preferência contrariada?"</em> Se for apenas uma preferência contrariada, solte o apego.
          </p>
          <div className="pt-3">
            <Link
              href="/diario"
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-semibold"
            >
              <span>Registrar reflexão no Diário Estoico</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Theme Pill */}
        <div className="pt-6 border-t border-border flex flex-wrap items-center gap-2 text-xs">
          <span className="text-foreground-muted">Tema principal:</span>
          <Link
            href={`/blog?tema=${encodeURIComponent(post.theme)}`}
            className="px-2.5 py-1 rounded-md bg-stone-pill text-foreground hover:text-primary transition-colors font-semibold"
          >
            #{post.theme}
          </Link>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="pt-12 border-t border-border space-y-6">
            <h3 className="font-serif text-2xl font-bold text-foreground">
              Continue sua leitura na Caverna
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/blog/${rel.slug}`}
                  className="rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                      {rel.theme}
                    </span>
                    <h5 className="font-serif font-bold text-base text-foreground group-hover:text-primary transition-colors">
                      {rel.title}
                    </h5>
                    <p className="text-xs text-foreground-muted line-clamp-2">
                      {rel.subtitle}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-foreground-muted">
                    <span>{rel.readTimeMinutes} min de leitura</span>
                    <span className="text-primary font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Ler →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

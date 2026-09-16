import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Scroll, 
  User, 
  ShieldCheck, 
  Clock
} from 'lucide-react';
import { blogPosts, philosophers, books } from '@/lib/data';
import DailyReflectionCard from '@/components/DailyReflectionCard';
import BookAffiliateCard from '@/components/BookAffiliateCard';
import NewsletterCard from '@/components/NewsletterCard';

export const dynamic = 'force-dynamic';

export default function Home() {
  // 6 Featured articles matching user prompt
  const featuredArticles = blogPosts.slice(0, 6);
  // Top 3 curated books
  const featuredBooks = books.slice(0, 3);

  return (
    <div className="flex flex-col w-full space-y-20 md:space-y-28 pb-20">
      {/* 1. HERO PRINCIPAL */}
      <section className="relative pt-12 md:pt-20 lg:pt-28 pb-12 max-w-5xl mx-auto text-center px-4">
        {/* Subtle classical aesthetic badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-card border border-border-accent text-primary shadow-sm mb-6 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <span>🏛️</span>
          <span>A Stoa Digital Contemporânea</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-foreground leading-[1.15] mb-6 drop-shadow-sm">
          Um espaço para cultivar a serenidade em meio ao caos.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-foreground-muted font-sans font-normal leading-relaxed max-w-3xl mx-auto mb-10">
          Reflexões, ensinamentos e práticas estoicas para quem deseja viver com mais clareza, disciplina e tranquilidade.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link
            href="#artigos-destaque"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-black hover:bg-primary-hover font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
          >
            <span>Começar a explorar</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="#reflexao-do-dia"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-border-accent bg-card/80 hover:bg-card text-foreground font-medium text-sm transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Reflexão do dia</span>
          </Link>
        </div>

        {/* Classical Stoic Core Virtues Pills */}
        <div className="mt-14 pt-8 border-t border-border/60 flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs text-foreground-muted uppercase tracking-widest font-mono">
          <span className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Sabedoria (Sophia)
          </span>
          <span className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Coragem (Andreia)
          </span>
          <span className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Justiça (Dikaiosyne)
          </span>
          <span className="flex items-center gap-1.5 hover:text-primary transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Temperança (Sophrosyne)
          </span>
        </div>
      </section>

      {/* 2. REFLEXÃO DO DIA */}
      <section className="max-w-4xl mx-auto w-full px-4 sm:px-6">
        <DailyReflectionCard />
      </section>

      {/* 3. CONTEÚDO EM DESTAQUE (ORGANIZADO POR TEMAS) */}
      <section id="artigos-destaque" className="scroll-mt-24 max-w-6xl mx-auto w-full px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <Scroll className="w-4 h-4" />
              <span>Ensaios & Reflexões</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Sabedoria aplicada ao cotidiano
            </h2>
            <p className="text-sm text-foreground-muted max-w-xl">
              Textos aprofundados para transformar conceitos antigos em ferramentas vivas para lidar com a ansiedade, o trabalho e as incertezas.
            </p>
          </div>

          <Link
            href="/blog"
            className="text-xs text-primary hover:text-primary-hover font-semibold flex items-center gap-1.5 self-start md:self-auto group"
          >
            <span>Ver todos os artigos</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Quick Theme Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          <Link
            href="/blog"
            className="px-3.5 py-1.5 rounded-full bg-primary text-black font-semibold shrink-0"
          >
            Todos os Temas
          </Link>
          {['Ansiedade', 'Autocontrole', 'Disciplina', 'Resiliência', 'Morte', 'Virtude', 'Relacionamentos'].map((t) => (
            <Link
              key={t}
              href={`/blog?tema=${encodeURIComponent(t)}`}
              className="px-3.5 py-1.5 rounded-full bg-card border border-border text-foreground-muted hover:text-foreground hover:border-primary/40 shrink-0 transition-colors"
            >
              {t}
            </Link>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <article
              key={article.slug}
              className="rounded-2xl border border-border bg-card/85 backdrop-blur-sm p-6 hover:border-primary/50 transition-all hover:shadow-xl flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                    {article.theme}
                  </span>
                  <span className="flex items-center gap-1 text-foreground-muted">
                    <Clock className="w-3 h-3" />
                    {article.readTimeMinutes} min
                  </span>
                </div>

                <Link href={`/blog/${article.slug}`}>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {article.title}
                  </h3>
                </Link>

                <p className="text-xs text-foreground-muted leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-border flex items-center justify-between text-xs text-foreground-muted">
                <span>{article.date}</span>
                <Link
                  href={`/blog/${article.slug}`}
                  className="font-semibold text-primary group-hover:underline flex items-center gap-1"
                >
                  <span>Ler ensaio</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. OS FILÓSOFOS DA STOA */}
      <section className="max-w-6xl mx-auto w-full px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <User className="w-4 h-4" />
              <span>A Stoa Antiga</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Os Mestres do Estoicismo
            </h2>
            <p className="text-sm text-foreground-muted max-w-xl">
              Do imperador de Roma ao escravo liberto na Grécia: conheça as vidas e os legados que moldaram séculos de serenidade.
            </p>
          </div>

          <Link
            href="/philosophers"
            className="text-xs text-primary hover:text-primary-hover font-semibold flex items-center gap-1.5 self-start md:self-auto group"
          >
            <span>Explorar todos os filósofos</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {philosophers.map((ph) => (
            <Link
              key={ph.slug}
              href={`/philosophers/${ph.slug}`}
              className="rounded-2xl border border-border bg-card/85 backdrop-blur-sm p-6 hover:border-primary/50 transition-all hover:shadow-xl flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-stone-pill border border-border-accent flex items-center justify-center text-xl font-serif text-primary shadow-inner">
                  {ph.name[0]}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {ph.name}
                  </h3>
                  <span className="text-xs text-primary/80 font-mono block mt-0.5">
                    {ph.period}
                  </span>
                  <p className="text-xs text-foreground-muted font-medium mt-1">
                    {ph.role}
                  </p>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed line-clamp-3">
                  {ph.bio}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-xs text-primary font-medium">
                <span>Ver biografia & citações</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. A BIBLIOTECA DA CAVERNA (LIVROS RECOMENDADOS & MONETIZAÇÃO ÉTICA) */}
      <section className="max-w-6xl mx-auto w-full px-4 sm:px-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <BookOpen className="w-4 h-4" />
              <span>Curadoria Editorial</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              A Biblioteca da Caverna
            </h2>
            <p className="text-sm text-foreground-muted max-w-xl">
              Livros selecionados com rigor editorial para aprofundar sua prática estoica. Sem promessas falsas; apenas sabedoria duradoura.
            </p>
          </div>

          <Link
            href="/livros"
            className="text-xs text-primary hover:text-primary-hover font-semibold flex items-center gap-1.5 self-start md:self-auto group"
          >
            <span>Ver acervo completo ({books.length} obras)</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Transparency banner */}
        <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-stone-pill/40 text-xs text-foreground-muted">
          <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
          <span>
            <strong>Transparência com o Leitor:</strong> Recomendamos exclusivamente obras que lemos e aprovamos. Nossos links utilizam o programa de afiliados da Amazon. Se você adquirir através deles, a Caverna recebe uma pequena comissão sem qualquer custo a mais para você.
          </span>
        </div>

        {/* Books List */}
        <div className="space-y-6">
          {featuredBooks.map((book) => (
            <BookAffiliateCard key={book.slug} book={book} />
          ))}
        </div>
      </section>

      {/* 6. CARTA DA CAVERNA (NEWSLETTER) */}
      <section className="max-w-4xl mx-auto w-full px-4 sm:px-6">
        <NewsletterCard />
      </section>
    </div>
  );
}

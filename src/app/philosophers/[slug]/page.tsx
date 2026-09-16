import { philosophers, quotes, blogPosts, books } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import PhilosopherQuoteGenerator from '@/components/PhilosopherQuoteGenerator';
import BookAffiliateCard from '@/components/BookAffiliateCard';
import { ArrowLeft, BookOpen, Scroll, CheckCircle2 } from 'lucide-react';

export function generateStaticParams() {
  return philosophers.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const philosopher = philosophers.find((p) => p.slug === params.slug);
  
  if (!philosopher) {
    return {
      title: 'Filósofo não encontrado — Caverna do Estoico',
    };
  }

  return {
    title: `${philosopher.name} — Biografia, Ensinamentos e Citações | Caverna do Estoico`,
    description: `${philosopher.bio} Conheça a vida, os livros recomendados e as citações clássicas de ${philosopher.name}.`,
  };
}

export default function PhilosopherPage({ params }: { params: { slug: string } }) {
  const philosopher = philosophers.find((p) => p.slug === params.slug);

  if (!philosopher) {
    notFound();
  }

  // Related quotes for this author
  const authorQuotes = quotes.filter(q => q.authorSlug === philosopher.slug);
  // Related blog posts
  const relatedArticles = blogPosts.filter(
    b => b.title.toLowerCase().includes(philosopher.name.toLowerCase()) ||
         b.content.toLowerCase().includes(philosopher.name.toLowerCase()) ||
         b.excerpt.toLowerCase().includes(philosopher.name.toLowerCase())
  );
  // Related books authored by or about him
  const authorBooks = books.filter(
    b => b.author.toLowerCase().includes(philosopher.name.toLowerCase()) ||
         b.connectionToStoicism.toLowerCase().includes(philosopher.name.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
      {/* Back button */}
      <Link 
        href="/philosophers" 
        className="inline-flex items-center gap-2 text-xs font-medium text-foreground-muted hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Voltar para todos os filósofos</span>
      </Link>

      {/* Philosopher Header */}
      <div className="space-y-4 border-b border-border pb-8">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-stone-pill border border-border-accent flex items-center justify-center text-3xl font-serif text-primary shadow-inner">
            {philosopher.name[0]}
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-primary">
              {philosopher.period} • {philosopher.role}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground">
              {philosopher.name}
            </h1>
          </div>
        </div>
        <p className="text-base sm:text-lg text-foreground-muted leading-relaxed font-normal pt-2">
          {philosopher.bio}
        </p>
      </div>

      {/* Historical Bio & Context */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Biografia & Trajetória Histórica
        </h2>
        <div className="space-y-4 text-foreground/90 font-serif leading-relaxed text-base sm:text-lg">
          {philosopher.history && philosopher.history.length > 0 ? (
            philosopher.history.map((par, i) => (
              <p key={i} className="bg-card/40 p-4 rounded-xl border border-border">
                {par}
              </p>
            ))
          ) : (
            <p className="bg-card/40 p-4 rounded-xl border border-border">
              {philosopher.bio}
            </p>
          )}
        </div>
      </section>

      {/* Key Teachings */}
      <section className="space-y-4">
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Pilares Fundamentais de Ensinamento
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {philosopher.keyTeachings.map((teach, i) => (
            <div key={i} className="p-4 rounded-xl border border-border bg-card flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-foreground">{teach}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Quotes Generator */}
      <section className="space-y-6 pt-6 border-t border-border">
        <div className="text-center space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Reflexão Guiada
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
            A Sabedoria Viva de {philosopher.name}
          </h2>
        </div>
        <PhilosopherQuoteGenerator 
          quotes={(philosopher.quotes.length > 0 ? philosopher.quotes : authorQuotes).map(q => q.text)} 
          author={philosopher.name} 
        />
      </section>

      {/* Books by or about him */}
      {authorBooks.length > 0 && (
        <section className="space-y-6 pt-8 border-t border-border">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Obras Recomendadas
            </span>
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Leia os Escritos Primários de {philosopher.name}
            </h2>
          </div>
          <div className="space-y-4">
            {authorBooks.map((book) => (
              <BookAffiliateCard key={book.slug} book={book} />
            ))}
          </div>
        </section>
      )}

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="space-y-4 pt-8 border-t border-border">
          <h2 className="font-serif text-2xl font-bold text-foreground flex items-center gap-2">
            <Scroll className="w-5 h-5 text-primary" /> Ensaios sobre {philosopher.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                    {article.theme}
                  </span>
                  <h4 className="font-serif font-bold text-base text-foreground group-hover:text-primary transition-colors mt-1">
                    {article.title}
                  </h4>
                  <p className="text-xs text-foreground-muted line-clamp-2 mt-1">
                    {article.subtitle}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-border flex items-center justify-between text-xs text-primary font-medium">
                  <span>Ler ensaio</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

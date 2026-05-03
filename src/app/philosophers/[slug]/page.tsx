import { philosophers } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import PhilosopherQuoteGenerator from '@/components/PhilosopherQuoteGenerator';

export function generateStaticParams() {
  return philosophers.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const philosopher = philosophers.find((p) => p.slug === params.slug);
  
  if (!philosopher) {
    return {
      title: 'Filósofo não encontrado | Caverna do Estoico',
    };
  }

  return {
    title: `${philosopher.name} | Caverna do Estoico`,
    description: philosopher.bio,
  };
}

export default function PhilosopherPage({ params }: { params: { slug: string } }) {
  const philosopher = philosophers.find((p) => p.slug === params.slug);

  if (!philosopher) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-12 md:py-20">
      <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 text-white tracking-tight drop-shadow-lg">
        {philosopher.name}
      </h1>
      
      <div className="space-y-6 mb-16">
        {philosopher.history?.map((paragraph, idx) => (
          <p key={idx} className="text-lg md:text-xl text-neutral-300 leading-relaxed font-light drop-shadow-md bg-black/20 p-2 rounded-lg">
            {paragraph}
          </p>
        )) || (
          <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-light drop-shadow-md">
            {philosopher.bio}
          </p>
        )}
      </div>
      
      <div className="pt-8 border-t border-white/10">
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-primary">A Sabedoria de {philosopher.name}</h2>
        <PhilosopherQuoteGenerator quotes={philosopher.quotes} author={philosopher.name} />
      </div>
    </div>
  );
}

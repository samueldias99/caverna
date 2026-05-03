import QuoteCard from '@/components/QuoteCard';
import { fetchRandomQuote } from '@/lib/api';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const initialQuote = await fetchRandomQuote();

  return (
    <div className="flex-1 flex flex-col w-full h-full">
      <div className="flex-1 flex flex-col items-center justify-center py-10 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 tracking-wide text-white drop-shadow-xl">
            Sabedoria Estóica
          </h1>
          <p className="text-neutral-300 text-lg md:text-xl font-medium tracking-wider drop-shadow-md">
            Filosofia atemporal para a vida moderna.
          </p>
        </div>
        
        <div className="w-full">
          <QuoteCard initialQuote={initialQuote} />
        </div>
      </div>

      {/* Footer Features Section matching the design */}
      <div className="mt-auto pt-16 pb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto w-full">
        
        <Link href="/philosophers" className="group flex gap-4 items-start hover:bg-white/5 p-4 rounded-xl transition-colors">
          <div className="mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
          </div>
          <div>
            <h3 className="text-white font-medium mb-1 group-hover:text-primary transition-colors">Filósofos</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">Conheça os grandes mestres do estoicismo</p>
          </div>
        </Link>

        <Link href="/blog" className="group flex gap-4 items-start hover:bg-white/5 p-4 rounded-xl transition-colors">
          <div className="mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
          </div>
          <div>
            <h3 className="text-white font-medium mb-1 group-hover:text-primary transition-colors">Blog</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">Artigos e reflexões para o dia a dia</p>
          </div>
        </Link>

        <div className="group flex gap-4 items-start p-4 rounded-xl transition-colors opacity-70 cursor-not-allowed">
          <div className="mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
          </div>
          <div>
            <h3 className="text-white font-medium mb-1">Prática Estoica</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">Exercícios e ferramentas para sua jornada</p>
          </div>
        </div>

        <div className="group flex gap-4 items-start p-4 rounded-xl transition-colors opacity-70 cursor-not-allowed">
          <div className="mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div>
            <h3 className="text-white font-medium mb-1">Comunidade</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">Conecte-se com pessoas que buscam sabedoria</p>
          </div>
        </div>

      </div>
    </div>
  );
}

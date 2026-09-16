"use client";

import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto bg-background-alt/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Concept */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="font-serif text-primary text-xl">🏛️</span>
              <span className="font-serif text-base font-bold tracking-wider text-foreground">
                CAVERNA DO ESTOICO
              </span>
            </div>
            <p className="text-xs text-foreground-muted leading-relaxed">
              Um refúgio silencioso para cultivar disciplina, serenidade, autocontrole e clareza mental através do estoicismo clássico.
            </p>
            <p className="text-xs font-serif italic text-primary/80">
              "Memento Mori. Amor Fati. Eudaimonia."
            </p>
          </div>

          {/* Col 2: Conhecimento */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">Conhecimento</h4>
            <ul className="space-y-1.5 text-xs text-foreground-muted">
              <li><Link href="/blog" className="hover:text-primary transition-colors">Artigos & Ensaios</Link></li>
              <li><Link href="/philosophers" className="hover:text-primary transition-colors">Filósofos Clássicos</Link></li>
              <li><Link href="/citacoes" className="hover:text-primary transition-colors">Biblioteca de Citações</Link></li>
              <li><Link href="/temas" className="hover:text-primary transition-colors">Navegação por Temas</Link></li>
            </ul>
          </div>

          {/* Col 3: Prática & Comunidade */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">Prática Pessoal</h4>
            <ul className="space-y-1.5 text-xs text-foreground-muted">
              <li><Link href="/diario" className="hover:text-primary transition-colors">Diário Estoico (Exame Diário)</Link></li>
              <li><Link href="/perfil" className="hover:text-primary transition-colors">Meu Refúgio & Salvos</Link></li>
              <li><Link href="/livros" className="hover:text-primary transition-colors">Curadoria de Livros</Link></li>
              <li><Link href="/newsletter" className="hover:text-primary transition-colors">Carta da Caverna (Semanal)</Link></li>
            </ul>
          </div>

          {/* Col 4: Compromisso Ético */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Ética & Transparência
            </h4>
            <p className="text-xs text-foreground-muted leading-relaxed">
              A Caverna do Estoico prioriza a pureza do conteúdo. Nossas indicações de livros utilizam links de afiliado da Amazon; recebemos uma pequena comissão caso você compre, sem qualquer acréscimo de custo para você.
            </p>
            <Link href="/sobre" className="text-xs text-primary hover:underline block pt-1">
              Conheça nosso manifesto editorial →
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs text-foreground-muted gap-4">
          <p>© {new Date().getFullYear()} Caverna do Estoico. Sabedoria clássica para uma vida serena.</p>
          <div className="flex items-center gap-4">
            <Link href="/sobre" className="hover:text-foreground">Sobre</Link>
            <span>•</span>
            <Link href="/livros" className="hover:text-foreground">Livros</Link>
            <span>•</span>
            <Link href="/newsletter" className="hover:text-foreground">Newsletter</Link>
            <span>•</span>
            <Link href="/feed.xml" className="hover:text-foreground">RSS Feed</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

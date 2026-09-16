"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { philosophers } from '@/lib/data';
import { Library, ArrowRight } from 'lucide-react';

export default function PhilosophersPage() {
  const [selectedEra, setSelectedEra] = useState<'all' | 'antiga' | 'tardia'>('all');

  const filtered = philosophers.filter((p) => {
    if (selectedEra === 'antiga') return p.period.includes('a.C.');
    if (selectedEra === 'tardia') return p.period.includes('d.C.');
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20">
          <Library className="w-3.5 h-3.5" />
          A Genealogia da Stoa
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground tracking-tight">
          Os Mestres do Estoicismo
        </h1>
        <p className="text-base sm:text-lg text-foreground-muted leading-relaxed font-normal">
          De Atenas ao Capitólio de Roma: conheça as personalidades que enfrentaram o poder supremo, o exílio e a escravidão armada unicamente pela força da razão.
        </p>
      </div>

      {/* Filter by Era */}
      <div className="flex items-center justify-center gap-2 text-xs">
        <button
          onClick={() => setSelectedEra('all')}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedEra === 'all'
              ? 'bg-primary text-black font-semibold shadow-sm'
              : 'bg-card border border-border text-foreground-muted hover:text-foreground'
          }`}
        >
          Todos os Mestres ({philosophers.length})
        </button>
        <button
          onClick={() => setSelectedEra('antiga')}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedEra === 'antiga'
              ? 'bg-primary text-black font-semibold shadow-sm'
              : 'bg-card border border-border text-foreground-muted hover:text-foreground'
          }`}
        >
          Grécia & Fundação (a.C.)
        </button>
        <button
          onClick={() => setSelectedEra('tardia')}
          className={`px-4 py-2 rounded-full transition-colors ${
            selectedEra === 'tardia'
              ? 'bg-primary text-black font-semibold shadow-sm'
              : 'bg-card border border-border text-foreground-muted hover:text-foreground'
          }`}
        >
          Roma Imperial (d.C.)
        </button>
      </div>

      {/* Grid of Philosophers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((phil) => (
          <div
            key={phil.slug}
            className="rounded-2xl border border-border bg-card/85 backdrop-blur-sm p-6 hover:border-primary/50 transition-all hover:shadow-xl flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-stone-pill border border-border-accent flex items-center justify-center text-2xl font-serif text-primary shadow-inner">
                  {phil.name[0]}
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-stone-pill text-foreground-muted">
                  {phil.period}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {phil.name}
                </h3>
                <p className="text-xs font-medium text-primary mt-0.5">
                  {phil.role}
                </p>
              </div>

              <p className="text-xs text-foreground/80 leading-relaxed line-clamp-3">
                {phil.bio}
              </p>

              {/* Key teachings preview */}
              <div className="space-y-1 pt-2 border-t border-border/70">
                <span className="text-[10px] uppercase font-semibold text-foreground-muted tracking-wider block">
                  Pilares de ensinamento:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {phil.keyTeachings.slice(0, 2).map((teach, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-stone-pill text-foreground-muted">
                      {teach}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-border flex items-center justify-between">
              <Link
                href={`/philosophers/${phil.slug}`}
                className="text-xs font-semibold text-primary group-hover:underline flex items-center gap-1.5"
              >
                <span>Explorar vida & citações</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

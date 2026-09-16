"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Feather, Check, ArrowRight, Shield } from 'lucide-react';

export default function NewsletterCard() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      const stored = localStorage.getItem('caverna_newsletter_subs') || '[]';
      const parsed = JSON.parse(stored);
      parsed.push({ email, name, date: new Date().toISOString() });
      localStorage.setItem('caverna_newsletter_subs', JSON.stringify(parsed));
    } catch (err) {
      console.error(err);
    }
    setIsSubmitted(true);
  };

  return (
    <div className="w-full rounded-2xl border border-border-accent bg-card/90 backdrop-blur-md p-6 sm:p-10 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center space-y-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20">
          <Feather className="w-3.5 h-3.5" />
          Newsletter Semanal
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
          Carta da Caverna
        </h3>

        <p className="text-sm sm:text-base text-foreground-muted leading-relaxed max-w-xl mx-auto">
          Uma reflexão filosófica semanal, uma citação contextualizada e um exercício prático de autocontrole entregues todo domingo. Sem spams, sem pressa, sem ruído.
        </p>

        {isSubmitted ? (
          <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 max-w-md mx-auto animate-in fade-in zoom-in-95 duration-200">
            <Check className="w-8 h-8 mx-auto mb-2" />
            <h4 className="font-serif font-bold text-base text-foreground mb-1">
              Bem-vindo à Caverna, {name || 'praticante'}!
            </h4>
            <p className="text-xs text-foreground-muted">
              Sua inscrição na Carta da Caverna foi confirmada. A próxima reflexão chegará no seu domingo de manhã.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 max-w-md mx-auto pt-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Seu nome (opcional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground-muted text-sm outline-none focus:border-primary transition-colors sm:w-1/3"
              />
              <input
                type="email"
                required
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground-muted text-sm outline-none focus:border-primary transition-colors flex-1"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-primary text-black hover:bg-primary-hover font-semibold text-xs transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Inscrever-se</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 text-[11px] text-foreground-muted">
              <Shield className="w-3 h-3 text-primary" />
              <span>Privacidade absoluta. Cancele a inscrição quando desejar com um clique.</span>
            </div>
          </form>
        )}

        <div className="pt-2">
          <Link href="/newsletter" className="text-xs text-primary hover:underline font-medium">
            Ler edições anteriores já publicadas →
          </Link>
        </div>
      </div>
    </div>
  );
}

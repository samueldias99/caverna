"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useReaderState } from '@/lib/reader-store';
import { 
  Feather, 
  Sun, 
  Moon, 
  Trash2, 
  Download, 
  Plus, 
  ArrowLeft,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export default function DiarioPage() {
  const { journalEntries, addJournalEntry, deleteJournalEntry } = useReaderState();

  const [activeTab, setActiveTab] = useState<'morning' | 'evening' | 'reflection'>('morning');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [mood, setMood] = useState<'sereno' | 'desafiado' | 'grato' | 'vigilante'>('sereno');
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  const prompts = {
    morning: {
      titleDefault: 'Exame Matinal: Preparação para o Dia',
      prompt: 'O que depende de mim nas próximas horas? Quais pessoas difíceis ou adversidades posso antecipar, e como responderei com serenidade sem perder meu caráter?',
      placeholder: 'Hoje começarei o dia consciente de que posso encontrar ingratos, insolentes e invejosos. Eles agem assim por ignorância do bem. Eu, porém, reconheço a virtude...',
    },
    evening: {
      titleDefault: 'Exame Noturno de Sêneca: Revisão do Dia',
      prompt: 'Qual vício hoje superei? Em que melhorei? Onde perdi o autocontrole e como posso agir com mais justiça e clareza amanhã?',
      placeholder: 'Ao deitar-me, examino minhas ações de hoje sem autopiedade nem crueldade. Na discussão da tarde, fui mais impaciente do que deveria...',
    },
    reflection: {
      titleDefault: 'Reflexão Livre & Anotações da Stoa',
      prompt: 'Qual ensinamento de Marco Aurélio, Sêneca ou Epicteto chamou sua atenção recentemente e como ele se aplica à sua vida presente?',
      placeholder: 'Anotações sobre uma passagem lida hoje...',
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    addJournalEntry({
      type: activeTab,
      title: title.trim() || prompts[activeTab].titleDefault,
      prompt: prompts[activeTab].prompt,
      content: content.trim(),
      mood,
    });

    setContent('');
    setTitle('');
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(journalEntries, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `diario-estoico-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <Link href="/perfil" className="inline-flex items-center gap-1.5 text-xs text-foreground-muted hover:text-primary transition-colors mb-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao Meu Refúgio</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground">
            Diário Estoico
          </h1>
          <p className="text-sm text-foreground-muted mt-1">
            "Todas as noites examino o meu dia inteiro e repasso tudo o que fiz e disse. Nada escondo de mim mesmo." — Sêneca
          </p>
        </div>

        {journalEntries.length > 0 && (
          <button
            onClick={handleExport}
            className="px-3.5 py-2 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:border-primary flex items-center gap-1.5 transition-colors shrink-0"
            title="Exportar meus registros para arquivo local"
          >
            <Download className="w-3.5 h-3.5 text-primary" />
            <span>Exportar Diário ({journalEntries.length})</span>
          </button>
        )}
      </div>

      {/* New Journal Entry Form */}
      <div className="rounded-2xl border border-border-accent bg-card/90 backdrop-blur-sm p-6 sm:p-8 shadow-xl space-y-6">
        {/* Mode Tabs */}
        <div className="flex border-b border-border text-xs">
          <button
            onClick={() => { setActiveTab('morning'); setTitle(''); }}
            className={`pb-3 px-4 font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'morning'
                ? 'border-primary text-primary'
                : 'border-transparent text-foreground-muted hover:text-foreground'
            }`}
          >
            <Sun className="w-4 h-4" />
            <span>Exame Matinal (Preparação)</span>
          </button>

          <button
            onClick={() => { setActiveTab('evening'); setTitle(''); }}
            className={`pb-3 px-4 font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'evening'
                ? 'border-primary text-primary'
                : 'border-transparent text-foreground-muted hover:text-foreground'
            }`}
          >
            <Moon className="w-4 h-4" />
            <span>Exame Noturno (Revisão)</span>
          </button>

          <button
            onClick={() => { setActiveTab('reflection'); setTitle(''); }}
            className={`pb-3 px-4 font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'reflection'
                ? 'border-primary text-primary'
                : 'border-transparent text-foreground-muted hover:text-foreground'
            }`}
          >
            <Feather className="w-4 h-4" />
            <span>Reflexão Livre</span>
          </button>
        </div>

        {/* Guided Prompt */}
        <div className="p-4 rounded-xl bg-stone-pill/40 border border-border space-y-1">
          <span className="text-[10px] uppercase font-bold text-primary tracking-wider flex items-center gap-1">
            <HelpCircle className="w-3 h-3" /> Pergunta Guia para Meditação:
          </span>
          <p className="text-xs sm:text-sm text-foreground/90 font-serif italic">
            "{prompts[activeTab].prompt}"
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder={prompts[activeTab].titleDefault}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground-muted text-sm outline-none focus:border-primary transition-colors font-serif"
            />
          </div>

          <div>
            <textarea
              required
              rows={6}
              placeholder={prompts[activeTab].placeholder}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground-muted text-sm outline-none focus:border-primary transition-colors font-serif leading-relaxed"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            {/* Mood selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-foreground-muted">Disposição interna:</span>
              {(['sereno', 'vigilante', 'desafiado', 'grato'] as const).map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setMood(m)}
                  className={`px-2.5 py-1 rounded-full capitalize transition-colors ${
                    mood === m
                      ? 'bg-primary text-black font-semibold'
                      : 'bg-stone-pill text-foreground-muted hover:text-foreground'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {isSavedNotice && (
                <span className="text-xs text-emerald-500 font-medium flex items-center gap-1 animate-in fade-in">
                  <CheckCircle className="w-3.5 h-3.5" /> Registro gravado!
                </span>
              )}
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-primary text-black hover:bg-primary-hover font-semibold text-xs transition-colors flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Salvar Entrada no Diário</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Historic Entries List */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-foreground flex items-center justify-between">
          <span>Suas Reflexões Registradas ({journalEntries.length})</span>
        </h2>

        {journalEntries.length === 0 ? (
          <div className="py-16 text-center text-foreground-muted border border-dashed border-border rounded-2xl p-8 space-y-2">
            <Feather className="w-8 h-8 mx-auto text-primary/60" />
            <p className="font-serif text-base text-foreground">Seu diário está em branco</p>
            <p className="text-xs">Dedique 3 minutos para registrar seu primeiro exame matinal ou noturno acima.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {journalEntries.map((entry) => (
              <div
                key={entry.id}
                className="rounded-xl border border-border bg-card/85 p-6 hover:border-primary/40 transition-all shadow-sm space-y-3 group"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 text-[10px]">
                      {entry.type === 'morning' ? 'Exame Matinal' : entry.type === 'evening' ? 'Exame Noturno' : 'Reflexão'}
                    </span>
                    <span className="text-foreground-muted">{entry.date}</span>
                    {entry.mood && (
                      <span className="px-2 py-0.5 rounded bg-stone-pill text-[10px] capitalize text-foreground-muted">
                        {entry.mood}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => deleteJournalEntry(entry.id)}
                    className="p-1.5 text-foreground-muted hover:text-rose-500 transition-colors opacity-60 group-hover:opacity-100"
                    title="Excluir este registro"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="font-serif font-bold text-lg text-foreground">
                  {entry.title}
                </h3>

                {entry.prompt && (
                  <p className="text-xs text-foreground-muted italic border-l-2 border-primary/40 pl-3">
                    {entry.prompt}
                  </p>
                )}

                <p className="text-sm text-foreground/90 font-serif leading-relaxed whitespace-pre-wrap">
                  {entry.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

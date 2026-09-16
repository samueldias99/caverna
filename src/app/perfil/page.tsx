"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useReaderState } from '@/lib/reader-store';
import { quotes, blogPosts, books, Quote } from '@/lib/data';
import { 
  Heart, 
  Bookmark, 
  BookMarked, 
  Feather, 
  Settings, 
  Sun, 
  Moon, 
  Bell, 
  LogOut, 
  LogIn, 
  Share2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import QuoteShareModal from '@/components/QuoteShareModal';

export default function PerfilPage() {
  const {
    user,
    settings,
    favoriteQuoteIds,
    savedArticleSlugs,
    readingListBookSlugs,
    completedDailyActions,
    toggleFavoriteQuote,
    toggleSaveArticle,
    toggleReadingListBook,
    toggleTheme,
    setFontSize,
    loginWithProvider,
    logout,
    requestNotificationPermission
  } = useReaderState();

  const [activeTab, setActiveTab] = useState<'favoritos' | 'artigos' | 'estante' | 'configuracoes'>('favoritos');
  const [shareQuote, setShareQuote] = useState<Quote | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Resolved entities
  const favoritedQuotes = quotes.filter(q => favoriteQuoteIds.includes(q.id));
  const savedArticles = blogPosts.filter(p => savedArticleSlugs.includes(p.slug));
  const savedBooks = books.filter(b => readingListBookSlugs.includes(b.slug));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
      {/* Header Profile Bar */}
      <div className="rounded-2xl border border-border-accent bg-card/85 backdrop-blur-sm p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-stone-pill border border-border-accent flex items-center justify-center text-3xl font-serif text-primary shadow-inner shrink-0 select-none">
            {user.name[0]}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                {user.name}
              </h1>
              {user.provider !== 'guest' && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 uppercase">
                  {user.provider}
                </span>
              )}
            </div>
            <p className="text-xs text-foreground-muted mt-1">
              Praticante da Stoa • Membro desde {user.joinedDate}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            href="/diario"
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-primary text-black hover:bg-primary-hover font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Feather className="w-3.5 h-3.5" />
            <span>Abrir Diário Estoico</span>
          </Link>

          {user.provider === 'guest' ? (
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-4 py-2.5 rounded-lg border border-border bg-stone-pill text-foreground hover:bg-stone-pill/80 text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5 text-primary" />
              <span>Entrar</span>
            </button>
          ) : (
            <button
              onClick={logout}
              className="p-2.5 rounded-lg border border-border text-foreground-muted hover:text-rose-500 transition-colors"
              title="Sair da conta"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border text-xs sm:text-sm overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('favoritos')}
          className={`pb-3 px-4 font-medium flex items-center gap-2 border-b-2 transition-colors shrink-0 ${
            activeTab === 'favoritos'
              ? 'border-primary text-primary font-semibold'
              : 'border-transparent text-foreground-muted hover:text-foreground'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Citações Guardadas ({favoritedQuotes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('artigos')}
          className={`pb-3 px-4 font-medium flex items-center gap-2 border-b-2 transition-colors shrink-0 ${
            activeTab === 'artigos'
              ? 'border-primary text-primary font-semibold'
              : 'border-transparent text-foreground-muted hover:text-foreground'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Leituras Salvas ({savedArticles.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('estante')}
          className={`pb-3 px-4 font-medium flex items-center gap-2 border-b-2 transition-colors shrink-0 ${
            activeTab === 'estante'
              ? 'border-primary text-primary font-semibold'
              : 'border-transparent text-foreground-muted hover:text-foreground'
          }`}
        >
          <BookMarked className="w-4 h-4" />
          <span>Minha Estante ({savedBooks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('configuracoes')}
          className={`pb-3 px-4 font-medium flex items-center gap-2 border-b-2 transition-colors shrink-0 ${
            activeTab === 'configuracoes'
              ? 'border-primary text-primary font-semibold'
              : 'border-transparent text-foreground-muted hover:text-foreground'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Preferências & Prática</span>
        </button>
      </div>

      {/* Tab 1: Citações Guardadas */}
      {activeTab === 'favoritos' && (
        <div className="space-y-6">
          {favoritedQuotes.length === 0 ? (
            <div className="py-16 text-center text-foreground-muted border border-dashed border-border rounded-2xl p-8 space-y-2">
              <Sparkles className="w-8 h-8 mx-auto text-primary/60" />
              <p className="font-serif text-base text-foreground">Nenhuma citação favoritada ainda</p>
              <p className="text-xs">Clique no ícone de coração em qualquer citação para guardá-la em seu refúgio.</p>
              <div className="pt-2">
                <Link href="/citacoes" className="text-xs text-primary underline">
                  Explorar a Biblioteca de Citações →
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favoritedQuotes.map((q) => (
                <div
                  key={q.id}
                  className="rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary">
                        {q.theme}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setShareQuote(q)}
                          className="text-foreground-muted hover:text-foreground"
                          title="Gerar cartão de citação"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => toggleFavoriteQuote(q.id)}
                          className="text-rose-500 hover:text-rose-600"
                          title="Remover dos favoritos"
                        >
                          <Heart className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                    </div>
                    <blockquote className="font-serif italic text-base text-foreground leading-relaxed mb-3">
                      "{q.text}"
                    </blockquote>
                  </div>

                  <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-foreground-muted">
                    <span className="font-medium text-foreground">{q.author}</span>
                    <span className="italic">{q.source}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Artigos Salvos */}
      {activeTab === 'artigos' && (
        <div className="space-y-6">
          {savedArticles.length === 0 ? (
            <div className="py-16 text-center text-foreground-muted border border-dashed border-border rounded-2xl p-8 space-y-2">
              <Bookmark className="w-8 h-8 mx-auto text-primary/60" />
              <p className="font-serif text-base text-foreground">Nenhum artigo salvo</p>
              <p className="text-xs">Guarde reflexões para ler com tranquilidade quando tiver tempo.</p>
              <div className="pt-2">
                <Link href="/blog" className="text-xs text-primary underline">
                  Explorar os Ensaios do Blog →
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {savedArticles.map((art) => (
                <div
                  key={art.slug}
                  className="rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-primary/10 text-primary">
                        {art.theme}
                      </span>
                      <span className="text-foreground-muted">{art.readTimeMinutes} min de leitura</span>
                    </div>
                    <Link href={`/blog/${art.slug}`}>
                      <h4 className="font-serif font-bold text-lg text-foreground hover:text-primary transition-colors">
                        {art.title}
                      </h4>
                    </Link>
                    <p className="text-xs text-foreground-muted line-clamp-1">{art.subtitle}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => toggleSaveArticle(art.slug)}
                      className="text-xs text-foreground-muted hover:text-rose-500"
                    >
                      Remover
                    </button>
                    <Link
                      href={`/blog/${art.slug}`}
                      className="px-4 py-2 rounded-lg bg-primary text-black hover:bg-primary-hover font-semibold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <span>Ler agora</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Minha Estante Filosófica */}
      {activeTab === 'estante' && (
        <div className="space-y-6">
          {savedBooks.length === 0 ? (
            <div className="py-16 text-center text-foreground-muted border border-dashed border-border rounded-2xl p-8 space-y-2">
              <BookMarked className="w-8 h-8 mx-auto text-primary/60" />
              <p className="font-serif text-base text-foreground">Sua estante está vazia</p>
              <p className="text-xs">Explore nossa curadoria de clássicos e guarde os títulos que deseja ler.</p>
              <div className="pt-2">
                <Link href="/livros" className="text-xs text-primary underline">
                  Ver Livros Recomendados →
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {savedBooks.map((b) => (
                <div
                  key={b.slug}
                  className="rounded-xl border border-border bg-card p-4 hover:border-primary/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-primary/10 text-primary">
                      {b.badge}
                    </span>
                    <h5 className="font-serif font-bold text-base text-foreground">
                      {b.title}
                    </h5>
                    <p className="text-xs text-foreground-muted">Por {b.author}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-border flex items-center justify-between gap-2">
                    <button
                      onClick={() => toggleReadingListBook(b.slug)}
                      className="text-xs text-foreground-muted hover:text-rose-500"
                    >
                      Remover
                    </button>
                    <a
                      href={b.amazonUrl}
                      target="_blank"
                      rel="sponsored noopener noreferrer"
                      className="text-xs text-primary hover:underline font-semibold"
                    >
                      Ver na Amazon →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Preferências & Prática */}
      {activeTab === 'configuracoes' && (
        <div className="space-y-6 max-w-2xl">
          {/* Theme setting */}
          <div className="rounded-xl border border-border bg-card p-6 flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-base text-foreground">
                Atmosfera Visual
              </h4>
              <p className="text-xs text-foreground-muted">
                Escolha entre a calma noturna da Caverna de basalto ou a claridade do Mármore antigo.
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-lg border border-border bg-stone-pill text-xs font-semibold text-foreground flex items-center gap-2 hover:border-primary transition-colors"
            >
              {settings.theme === 'dark' ? (
                <>
                  <Moon className="w-4 h-4 text-primary" />
                  <span>Modo Caverna (Escuro)</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>Modo Mármore (Claro)</span>
                </>
              )}
            </button>
          </div>

          {/* Font Size setting */}
          <div className="rounded-xl border border-border bg-card p-6 flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-base text-foreground">
                Tamanho da Fonte de Leitura
              </h4>
              <p className="text-xs text-foreground-muted">
                Ajuste para uma leitura relaxante sem fadiga ocular.
              </p>
            </div>
            <div className="flex gap-1.5">
              {(['normal', 'large', 'larger'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFontSize(s)}
                  className={`px-3 py-1.5 rounded text-xs font-medium capitalize transition-colors ${
                    settings.fontSize === s
                      ? 'bg-primary text-black font-semibold'
                      : 'border border-border text-foreground-muted hover:text-foreground'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Daily reminder notification */}
          <div className="rounded-xl border border-border bg-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-base text-foreground flex items-center gap-2">
                <Bell className="w-4 h-4 text-primary" /> Lembrete Diário de Serenidade
              </h4>
              <p className="text-xs text-foreground-muted">
                Receba uma notificação matinal discreta para lembrar da prática da dicotomia do controle.
              </p>
            </div>
            <button
              onClick={requestNotificationPermission}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                settings.dailyReminderEnabled
                  ? 'bg-emerald-600 text-white'
                  : 'bg-primary text-black hover:bg-primary-hover'
              }`}
            >
              {settings.dailyReminderEnabled ? 'Lembrete Ativado' : 'Ativar Notificação'}
            </button>
          </div>

          {/* Daily Actions tracker stats */}
          <div className="rounded-xl border border-border bg-card p-6 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-bold text-base text-foreground">
                Prática Constante das Ações Diárias
              </h4>
              <span className="text-xs font-mono text-primary font-bold">
                {completedDailyActions.length} dias praticados
              </span>
            </div>
            <p className="text-xs text-foreground-muted leading-relaxed">
              "A perfeição de caráter consiste em viver cada dia como se fosse o último, sem tumulto, sem torpor e sem fingimento." — Marco Aurélio
            </p>
          </div>
        </div>
      )}

      {/* Login modal simulation */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-background border border-border-accent rounded-2xl p-6 space-y-5 shadow-2xl">
            <div className="text-center space-y-1">
              <span className="text-2xl font-serif">🏛️</span>
              <h3 className="font-serif font-bold text-xl text-foreground">
                Entrar na Caverna do Estoico
              </h3>
              <p className="text-xs text-foreground-muted">
                Sincronize suas anotações do diário e livros salvos em qualquer dispositivo.
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => { loginWithProvider('google'); setShowLoginModal(false); }}
                className="w-full py-2.5 px-4 rounded-xl border border-border bg-card hover:bg-card-hover text-xs font-medium text-foreground flex items-center justify-center gap-2 transition-colors"
              >
                <span>Entrar com Google</span>
              </button>

              <button
                onClick={() => { loginWithProvider('apple'); setShowLoginModal(false); }}
                className="w-full py-2.5 px-4 rounded-xl border border-border bg-card hover:bg-card-hover text-xs font-medium text-foreground flex items-center justify-center gap-2 transition-colors"
              >
                <span>Entrar com Apple</span>
              </button>
            </div>

            <button
              onClick={() => setShowLoginModal(false)}
              className="w-full text-center text-xs text-foreground-muted hover:text-foreground pt-2"
            >
              Continuar como Leitor Convidado
            </button>
          </div>
        </div>
      )}

      {/* Share Quote Modal */}
      {shareQuote && (
        <QuoteShareModal
          quote={shareQuote}
          isOpen={!!shareQuote}
          onClose={() => setShareQuote(null)}
        />
      )}
    </div>
  );
}

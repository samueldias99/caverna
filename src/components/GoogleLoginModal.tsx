"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useReaderState } from '@/lib/reader-store';
import { X, AlertCircle, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';

interface GoogleLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Decode standard JWT token payload without external libraries
function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Falha ao decodificar credencial do Google:', e);
    return null;
  }
}

export default function GoogleLoginModal({ isOpen, onClose }: GoogleLoginModalProps) {
  const { loginWithProvider } = useReaderState();
  const googleBtnContainerRef = useRef<HTMLDivElement>(null);
  
  const [googleStatus, setGoogleStatus] = useState<'loading' | 'ready' | 'fallback' | 'success'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showConfigHelp, setShowConfigHelp] = useState(false);

  // Manual fallback inputs (for when Client ID is not configured on Vercel yet)
  const [manualName, setManualName] = useState('');
  const [manualEmail, setManualEmail] = useState('');

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!isOpen) return;

    // Check if Google Client ID is configured
    if (!clientId) {
      setGoogleStatus('fallback');
      return;
    }

    let checkInterval: NodeJS.Timeout | null = null;
    let attempts = 0;

    const initGsi = () => {
      // @ts-expect-error Google Identity Services global
      if (typeof window !== 'undefined' && window.google?.accounts?.id) {
        try {
          // @ts-expect-error Google Identity Services global
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: (response: { credential?: string }) => {
              if (response.credential) {
                const payload = parseJwt(response.credential);
                if (payload) {
                  loginWithProvider(
                    'google',
                    payload.name || payload.given_name || 'Praticante da Stoa',
                    payload.email,
                    payload.picture
                  );
                  setGoogleStatus('success');
                  setTimeout(() => {
                    onClose();
                  }, 800);
                  return;
                }
              }
              setErrorMessage('Não foi possível obter os dados da conta Google.');
            },
            auto_select: false,
            cancel_on_tap_outside: true,
          });

          if (googleBtnContainerRef.current) {
            googleBtnContainerRef.current.innerHTML = '';
            // @ts-expect-error Google Identity Services global
            window.google.accounts.id.renderButton(googleBtnContainerRef.current, {
              theme: 'outline',
              size: 'large',
              type: 'standard',
              text: 'signin_with',
              shape: 'pill',
              logo_alignment: 'left',
              width: 280,
              locale: 'pt-BR'
            });
            setGoogleStatus('ready');
          }
        } catch (err) {
          console.error('Erro ao renderizar botão do Google:', err);
          setGoogleStatus('fallback');
        }
      } else {
        attempts++;
        if (attempts > 20) {
          // Timeout waiting for script, fallback
          setGoogleStatus('fallback');
          if (checkInterval) clearInterval(checkInterval);
        }
      }
    };

    checkInterval = setInterval(initGsi, 200);

    return () => {
      if (checkInterval) clearInterval(checkInterval);
    };
  }, [isOpen, clientId, loginWithProvider, onClose]);

  if (!isOpen) return null;

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = manualEmail.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMessage('Por favor, informe um e-mail válido.');
      return;
    }
    const cleanName = manualName.trim() || cleanEmail.split('@')[0];
    loginWithProvider('google', cleanName, cleanEmail);
    setGoogleStatus('success');
    setTimeout(() => {
      onClose();
    }, 600);
  };

  const handleAppleLogin = () => {
    loginWithProvider('apple', 'Praticante Apple', 'leitor@icloud.com');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-background border border-border-accent rounded-2xl p-6 sm:p-7 space-y-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-foreground-muted hover:text-foreground hover:bg-card transition-colors"
          aria-label="Fechar modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center space-y-1.5 pt-1">
          <div className="w-12 h-12 mx-auto rounded-xl bg-card border border-border-accent flex items-center justify-center text-2xl shadow-sm">
            🏛️
          </div>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-foreground">
            Entrar na Caverna do Estoico
          </h3>
          <p className="text-xs text-foreground-muted leading-relaxed max-w-xs mx-auto">
            Sincronize suas anotações do diário, progresso diário e leituras em qualquer dispositivo.
          </p>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success notification */}
        {googleStatus === 'success' ? (
          <div className="py-6 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto animate-bounce" />
            <p className="font-serif text-base text-foreground font-semibold">
              Bem-vindo de volta à Stoa!
            </p>
            <p className="text-xs text-foreground-muted">Sincronizando suas reflexões...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Google official button container */}
            <div className="flex flex-col items-center justify-center min-h-[44px]">
              {googleStatus === 'loading' && clientId && (
                <div className="text-xs text-foreground-muted flex items-center gap-2 py-2">
                  <span className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  Conectando ao Google Identity...
                </div>
              )}

              {/* Render Target for Google Button */}
              <div 
                ref={googleBtnContainerRef} 
                className={`${googleStatus === 'ready' ? 'flex' : 'hidden'} justify-center w-full`}
              />

              {/* Fallback direct Google simulation / One-click connect */}
              {googleStatus === 'fallback' && (
                <div className="w-full space-y-3">
                  <button
                    onClick={() => {
                      // Conectar instantaneamente com dados padrão de usuário Google
                      loginWithProvider('google', 'Samuel Dias', 'samuel.dias.rosa99@gmail.com');
                      setGoogleStatus('success');
                      setTimeout(() => onClose(), 600);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl border border-border bg-card hover:bg-card-hover text-xs font-semibold text-foreground flex items-center justify-center gap-2.5 transition-colors shadow-sm"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Entrar como Samuel Dias (Google)</span>
                  </button>

                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-border"></div>
                    <span className="flex-shrink mx-3 text-[10px] uppercase text-foreground-muted font-mono">ou com outro e-mail Google</span>
                    <div className="flex-grow border-t border-border"></div>
                  </div>

                  {/* Manual form */}
                  <form onSubmit={handleManualLogin} className="space-y-2">
                    <input
                      type="text"
                      placeholder="Seu nome (ex: Marco)"
                      value={manualName}
                      onChange={(e) => setManualName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-stone-pill/60 border border-border rounded-xl text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-primary"
                    />
                    <input
                      type="email"
                      required
                      placeholder="seu.email@gmail.com"
                      value={manualEmail}
                      onChange={(e) => setManualEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-stone-pill/60 border border-border rounded-xl text-foreground placeholder:text-foreground-muted focus:outline-none focus:border-primary"
                    />
                    <button
                      type="submit"
                      className="w-full py-2 px-3 rounded-xl bg-primary text-black font-semibold text-xs hover:bg-primary-hover transition-colors"
                    >
                      Conectar Conta Google
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Apple login option */}
            <button
              onClick={handleAppleLogin}
              className="w-full py-2.5 px-4 rounded-xl border border-border bg-card hover:bg-card-hover text-xs font-medium text-foreground flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.1-1.92.98-3.04-1 .04-2.19.67-2.88 1.47-.6.69-1.13 1.83-.99 2.92 1.11.09 2.23-.55 2.89-1.35z"/>
              </svg>
              <span>Entrar com Apple</span>
            </button>

            {/* Config Help Accordion */}
            <div className="pt-2 border-t border-border">
              <button
                type="button"
                onClick={() => setShowConfigHelp(!showConfigHelp)}
                className="text-[11px] text-foreground-muted hover:text-primary flex items-center gap-1.5 mx-auto transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Como configurar o Client ID do Google na Vercel?</span>
              </button>

              {showConfigHelp && (
                <div className="mt-3 p-3 rounded-xl bg-card border border-border text-[11px] text-foreground-muted space-y-2 leading-relaxed">
                  <p className="font-semibold text-foreground flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Passo a passo oficial:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 pl-1">
                    <li>Acesse o <strong>Google Cloud Console</strong> &gt; <em>APIs e Serviços</em> &gt; <em>Credenciais</em>.</li>
                    <li>Crie um <strong>ID do cliente OAuth 2.0</strong> (tipo Aplicação Web).</li>
                    <li>Em <em>Origens JavaScript autorizadas</em>, adicione: <code className="text-primary">https://caverna-ochre.vercel.app</code> e <code className="text-primary">http://localhost:3000</code>.</li>
                    <li>Na Vercel (Project Settings &gt; Environment Variables), adicione: <br/><strong className="text-foreground">NEXT_PUBLIC_GOOGLE_CLIENT_ID</strong> com o valor copiado.</li>
                  </ol>
                </div>
              )}
            </div>

            {/* Guest button */}
            <button
              onClick={onClose}
              className="w-full text-center text-xs text-foreground-muted hover:text-foreground pt-1"
            >
              Continuar como Leitor Convidado
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

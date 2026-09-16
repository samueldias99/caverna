"use client";

import React, { useState, useRef } from 'react';
import { X, Copy, Check, Download, Sparkles } from 'lucide-react';
import { Quote } from '@/lib/data';

interface QuoteShareModalProps {
  quote: Quote;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteShareModal({ quote, isOpen, onClose }: QuoteShareModalProps) {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleCopyText = () => {
    const text = `"${quote.text}"\n\n— ${quote.author}, ${quote.source}\n\n🏛️ Caverna do Estoico`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // Canvas-based image snapshot generator
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background (dark basalt / marble gradient)
    const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
    gradient.addColorStop(0, '#0f0f13');
    gradient.addColorStop(1, '#050507');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1080);

    // Subtle outer border & fluted columns
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 4;
    ctx.strokeRect(60, 60, 960, 960);
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)';
    ctx.lineWidth = 1;
    ctx.strokeRect(80, 80, 920, 920);

    // Header watermark
    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 24px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '6px';
    ctx.fillText('🏛️ CAVERNA DO ESTOICO', 540, 160);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = 'italic 18px Georgia, serif';
    ctx.fillText('Memento Mori • Amor Fati', 540, 200);

    // Quote Text with text wrapping
    ctx.fillStyle = '#f4f4f5';
    ctx.font = 'normal 40px Georgia, serif';
    ctx.textAlign = 'center';

    const words = quote.text.split(' ');
    let line = '';
    const lines: string[] = [];
    const maxWidth = 800;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        lines.push(line);
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    const startY = 480 - (lines.length * 28);
    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i].trim(), 540, startY + (i * 60));
    }

    // Author & Source
    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 30px Georgia, serif';
    ctx.fillText(`— ${quote.author}`, 540, startY + (lines.length * 60) + 70);

    ctx.fillStyle = '#71717a';
    ctx.font = 'italic 22px Georgia, serif';
    ctx.fillText(quote.source, 540, startY + (lines.length * 60) + 120);

    // Theme tag
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '16px sans-serif';
    ctx.fillText(`#${quote.theme.toUpperCase()} • SABEDORIA DIÁRIA`, 540, 950);

    // Download trigger
    const link = document.createElement('a');
    link.download = `citacao-${quote.authorSlug}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-background border border-border-accent rounded-2xl shadow-2xl p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-foreground-muted hover:text-foreground rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-primary">
          <Sparkles className="w-4 h-4" />
          <span>Compartilhar Sabedoria</span>
        </div>

        {/* Visual Card Preview */}
        <div 
          ref={cardRef}
          className="rounded-xl border border-primary/30 p-8 text-center bg-stone-900 text-stone-100 shadow-inner my-4 relative overflow-hidden"
        >
          <div className="text-[11px] font-serif tracking-[0.25em] text-primary/90 uppercase mb-4">
            🏛️ Caverna do Estoico
          </div>
          <p className="font-serif text-lg sm:text-xl text-stone-100 leading-relaxed italic mb-6">
            "{quote.text}"
          </p>
          <div className="space-y-0.5">
            <h5 className="font-serif font-bold text-primary text-base">
              — {quote.author}
            </h5>
            <p className="text-xs text-stone-400 italic">
              {quote.source}
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] text-stone-500 uppercase tracking-wider">
            <span>#{quote.theme}</span>
            <span>cavernadoestoico.com</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
          <button
            onClick={handleCopyText}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-card transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                Copiado com sucesso!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copiar Texto Formatado
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-black hover:bg-primary-hover text-xs font-semibold transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            Baixar Imagem (1080x1080)
          </button>
        </div>
      </div>
    </div>
  );
}

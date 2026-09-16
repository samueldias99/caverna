"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Share2, Check } from 'lucide-react';

export interface SharedQuoteDisplayProps {
  quoteText: string;
  author: string;
  onActionClick: () => void;
  actionLabel: string;
  isLoading?: boolean;
}

export default function SharedQuoteDisplay({
  quoteText,
  author,
  onActionClick,
  actionLabel,
  isLoading = false,
}: SharedQuoteDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const text = `"${quoteText}" — ${author}\n\n🏛️ Caverna do Estoico`;
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-card/90 backdrop-blur-md border border-border-accent p-8 md:p-12 rounded-2xl shadow-2xl max-w-3xl mx-auto flex flex-col transition-all duration-300 w-full mt-6">
      <div className="min-h-[180px] flex flex-col justify-center relative text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={quoteText}
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -8 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl leading-relaxed text-foreground mb-6 tracking-wide italic">
              &quot;{quoteText}&quot;
            </blockquote>
            <p className="text-primary font-semibold tracking-widest text-sm md:text-base uppercase font-sans">
              — {author}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onActionClick}
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-black hover:bg-primary-hover font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Sparkles className="w-4 h-4" />
          <span>{actionLabel}</span>
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleShare}
          className="w-full sm:w-auto px-5 py-3 rounded-xl border border-border bg-stone-pill text-foreground hover:bg-stone-pill/80 text-xs font-medium transition-colors flex items-center justify-center gap-2"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Citação copiada!</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-primary" />
              <span>Copiar Citação</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}

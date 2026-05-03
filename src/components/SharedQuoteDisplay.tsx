"use client";

import { motion, AnimatePresence } from 'framer-motion';

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
  const handleShare = async () => {
    const text = `"${quoteText}" — ${author}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Citação Estoica',
          text: text,
        });
      } catch (e) {
        console.error('Erro ao compartilhar', e);
      }
    } else {
      navigator.clipboard.writeText(text);
      alert('Citação copiada para a área de transferência!');
    }
  };

  return (
    <div className="bg-black/30 backdrop-blur-md border border-white/10 p-8 md:p-14 rounded-2xl shadow-2xl max-w-3xl mx-auto flex flex-col transition-all duration-300 w-full mt-8 md:mt-12">
      <div className="min-h-[220px] flex flex-col justify-center relative text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={quoteText}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <blockquote className="font-serif text-2xl md:text-4xl leading-relaxed md:leading-tight text-white mb-6 md:mb-8 tracking-wide italic md:not-italic">
              &quot;{quoteText}&quot;
            </blockquote>
            <p className="text-primary font-medium tracking-widest text-lg md:text-xl uppercase">— {author}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-center items-center gap-6 relative z-10">
        <motion.button 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onActionClick}
          disabled={isLoading}
          className="flex-1 w-full sm:w-auto bg-primary/10 border border-primary/30 text-primary px-8 py-3 rounded-xl text-sm uppercase tracking-widest font-medium hover:bg-primary/20 transition-colors disabled:opacity-50 flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Refletindo...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
              {actionLabel}
            </>
          )}
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleShare}
          className="flex-1 w-full sm:w-auto bg-transparent border border-white/20 text-white px-8 py-3 rounded-xl text-sm uppercase tracking-widest font-medium hover:bg-white/5 transition-colors flex items-center justify-center gap-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          Compartilhar
        </motion.button>
      </div>
    </div>
  );
}

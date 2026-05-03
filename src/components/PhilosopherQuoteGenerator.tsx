"use client";

import { useState } from 'react';
import SharedQuoteDisplay from './SharedQuoteDisplay';

interface PhilosopherQuoteGeneratorProps {
  quotes: string[];
  author: string;
}

export default function PhilosopherQuoteGenerator({ quotes, author }: PhilosopherQuoteGeneratorProps) {
  const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * quotes.length));

  const generateNewQuote = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * quotes.length);
    } while (nextIndex === currentIndex && quotes.length > 1);
    setCurrentIndex(nextIndex);
  };

  return (
    <div className="w-full">
      <SharedQuoteDisplay 
        quoteText={quotes[currentIndex]}
        author={author}
        onActionClick={generateNewQuote}
        actionLabel="Sorteio de Citação"
        isLoading={false}
      />
    </div>
  );
}

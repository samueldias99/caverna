"use client";

import { useState } from 'react';
import { Quote } from '@/lib/data';
import SharedQuoteDisplay from './SharedQuoteDisplay';

export default function QuoteCard({ initialQuote }: { initialQuote: Quote }) {
  const [quote, setQuote] = useState<Quote>(initialQuote);
  const [loading, setLoading] = useState(false);

  const fetchNewQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/quote');
      const data = await res.json();
      setQuote(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SharedQuoteDisplay 
      quoteText={quote.text}
      author={quote.author}
      onActionClick={fetchNewQuote}
      actionLabel="Nova Citação"
      isLoading={loading}
    />
  );
}

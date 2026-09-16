import { Quote, quotes } from './data';

export const fallbackQuotes: Quote[] = quotes;

export async function fetchRandomQuote(): Promise<Quote> {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}

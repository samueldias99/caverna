import { Quote, fallbackQuotes } from './data';

export async function fetchRandomQuote(): Promise<Quote> {
  // Simulating an API call delay for realism
  await new Promise(resolve => setTimeout(resolve, 500));
  const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
  return fallbackQuotes[randomIndex];
}

import { NextResponse } from 'next/server';
import { fetchRandomQuote } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  const quote = await fetchRandomQuote();
  return NextResponse.json(quote, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}

import { blogPosts } from '@/lib/data';
import { notFound } from 'next/navigation';
import ArticleReaderView from '@/components/ArticleReaderView';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return blogPosts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return { title: 'Artigo não encontrado — Caverna do Estoico' };
  }
  return {
    title: `${post.title} — Caverna do Estoico`,
    description: post.subtitle || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.subtitle,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Related posts from same theme or others
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return <ArticleReaderView post={post} relatedPosts={relatedPosts} />;
}

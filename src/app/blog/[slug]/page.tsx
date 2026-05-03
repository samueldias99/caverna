import { blogPosts } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export function generateStaticParams() {
  return blogPosts.map((p) => ({
    slug: p.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/blog" className="text-neutral-400 hover:text-white mb-8 inline-block transition-colors">
        &larr; Voltar para o Blog
      </Link>
      <article>
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8">{post.title}</h1>
        <div className="bg-card border border-border p-8 rounded-2xl">
          <p className="text-lg leading-relaxed text-neutral-200 whitespace-pre-wrap">{post.content}</p>
        </div>
      </article>
    </div>
  );
}

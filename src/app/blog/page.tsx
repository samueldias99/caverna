"use client";

import Link from 'next/link';
import { blogPosts } from '@/lib/data';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-serif font-bold mb-12">Blog</h1>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {blogPosts.map((post) => (
          <motion.div key={post.slug} variants={itemVariants}>
            <Link href={`/blog/${post.slug}`} className="block group">
              <article className="bg-card border border-border p-8 rounded-2xl transition-all duration-300 hover:border-neutral-500 hover:shadow-lg hover:-translate-y-1">
                <h2 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors">{post.title}</h2>
                <p className="text-neutral-400 text-lg">{post.excerpt}</p>
                <div className="mt-4 text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">
                  Ler publicação &rarr;
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

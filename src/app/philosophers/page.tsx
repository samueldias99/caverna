"use client";

import Link from 'next/link';
import { philosophers } from '@/lib/data';
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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function PhilosophersPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-serif font-bold mb-12 text-center">Os Filósofos Estoicos</h1>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {philosophers.map((phil) => (
          <motion.div key={phil.slug} variants={itemVariants}>
            <Link href={`/philosophers/${phil.slug}`} className="group block h-full">
              <div className="bg-card border border-border p-8 rounded-2xl h-full transition-all duration-300 hover:border-neutral-500 hover:shadow-lg hover:-translate-y-1">
                <h2 className="text-2xl font-serif font-bold mb-4 group-hover:text-white transition-colors">{phil.name}</h2>
                <p className="text-neutral-400 line-clamp-4">{phil.bio}</p>
                <div className="mt-6 text-sm font-medium text-neutral-300 group-hover:text-white transition-colors">
                  Ler mais &rarr;
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

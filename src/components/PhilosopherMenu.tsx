"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const philosophers = [
  { name: 'Marco Aurélio', slug: 'marco-aurelio' },
  { name: 'Sêneca', slug: 'seneca' },
  { name: 'Epicteto', slug: 'epicteto' },
];

export default function PhilosopherMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button 
        className="text-neutral-300 hover:text-primary transition-colors py-2 flex items-center gap-1"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        Filósofos
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-48 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl py-2 z-50 overflow-hidden"
          >
            {philosophers.map((phil) => (
              <Link 
                key={phil.slug} 
                href={`/philosophers/${phil.slug}`}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-sm text-neutral-300 hover:text-primary hover:bg-white/10 transition-colors"
              >
                {phil.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

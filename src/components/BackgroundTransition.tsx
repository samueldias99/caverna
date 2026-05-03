"use client";

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const bgMap: Record<string, string> = {
  '/': '/bg-cave.png',
  '/philosophers/marco-aurelio': '/marcus-cave.png',
  '/philosophers/seneca': '/seneca-cave.png',
  '/philosophers/epicteto': '/epictetus-cave.png',
};

export default function BackgroundTransition() {
  const pathname = usePathname();
  
  // Default to cave if not found
  let bgImage = bgMap[pathname];
  if (!bgImage) {
    bgImage = '/bg-cave.png';
  }

  return (
    <div className="fixed inset-0 z-[-20] overflow-hidden bg-black pointer-events-none">
      <AnimatePresence initial={false}>
        <motion.div
          key={bgImage}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1.03, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <Image
            src={bgImage}
            alt="Cinematic Background"
            fill
            quality={90}
            priority
            className={`object-cover opacity-100 ${
              bgImage === '/bg-cave.png' 
                ? 'object-[80%_bottom] md:object-[80%_100%]' 
                : 'object-[center_10%] md:object-[center_15%]'
            }`}
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/90 via-transparent to-black/30 z-10 pointer-events-none" />
    </div>
  );
}

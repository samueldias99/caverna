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
  
  let bgImage = bgMap[pathname];
  if (!bgImage) {
    bgImage = '/bg-cave.png';
  }

  return (
    <div className="fixed inset-0 z-[-20] overflow-hidden pointer-events-none transition-colors duration-500">
      <AnimatePresence initial={false}>
        <motion.div
          key={bgImage}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1.02, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <Image
            src={bgImage}
            alt="Atmosfera Clássica Estoica"
            fill
            quality={85}
            priority
            referrerPolicy="no-referrer"
            className={`object-cover ${
              bgImage === '/bg-cave.png' 
                ? 'object-[80%_bottom] md:object-[80%_100%]' 
                : 'object-[center_10%] md:object-[center_15%]'
            }`}
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Dynamic overlays for dark and light modes */}
      {/* Dark mode overlay */}
      <div className="absolute inset-0 bg-background/85 dark:bg-black/75 bg-gradient-to-t from-background via-background/60 to-background/40 z-10 pointer-events-none transition-colors duration-300" />
      {/* Classical ambient grain */}
      <div className="absolute inset-0 marble-texture z-10 pointer-events-none" />
    </div>
  );
}

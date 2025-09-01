'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
  // Allow fade on route changes; AnimatePresenceProvider sets initial={false}
  // so the very first render won't animate and won't delay LCP.
  initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
      }}
      className="w-full h-full"
      style={{ position: 'static' }}
    >
      {children}
    </motion.div>
  );
}
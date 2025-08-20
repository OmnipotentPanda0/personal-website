'use client';

import { AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface AnimatePresenceProviderProps {
  children: ReactNode;
}

export default function AnimatePresenceProvider({ children }: AnimatePresenceProviderProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <div key={pathname}>
        {children}
      </div>
    </AnimatePresence>
  );
}
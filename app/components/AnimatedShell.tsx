'use client';

import { ReactNode } from 'react';
import AnimatePresenceProvider from './AnimatePresenceProvider';
import PageTransition from './PageTransition';

interface AnimatedShellProps {
  children: ReactNode;
}

export default function AnimatedShell({ children }: AnimatedShellProps) {
  return (
    <AnimatePresenceProvider>
      <PageTransition>{children}</PageTransition>
    </AnimatePresenceProvider>
  );
}

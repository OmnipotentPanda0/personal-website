import { ReactNode } from 'react';
import MainNavbar from './MainNavbar';
import dynamic from 'next/dynamic';
import PageTransition from './PageTransition';

// Lazy-load the client-only animation shell to keep pages without animations pure server components
const AnimatedShell = dynamic(() => import('./AnimatedShell'), { ssr: true });

type SelectedKey = 'Home' | 'Articles' | 'Contact';

interface PageTemplateProps {
  children: ReactNode;
  selected?: SelectedKey;
  /**
   * Enable route transition animation for the page content.
   * Turn off on heavy pages to avoid unnecessary client-side hydration.
   */
  animate?: boolean;
}

export default function PageTemplate({ children, selected, animate = true }: PageTemplateProps) {
  return (
    <div className="min-h-screen relative">
      {/* Navbar bleibt statisch - keine Animation */}
      <MainNavbar selected={selected} />
      
      {/* Nur den Content animieren, falls aktiviert */}
      {animate ? (
        <AnimatedShell>{children}</AnimatedShell>
      ) : (
        children
      )}
    </div>
  );
}

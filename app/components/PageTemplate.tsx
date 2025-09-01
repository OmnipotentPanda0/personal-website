import { ReactNode } from 'react';
import MainNavbar from './MainNavbar';
import PageTransition from './PageTransition';
import AnimatePresenceProvider from './AnimatePresenceProvider';

type SelectedKey = 'Home' | 'Projects' | 'Contact';

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
        <AnimatePresenceProvider>
          <PageTransition>
            {children}
          </PageTransition>
        </AnimatePresenceProvider>
      ) : (
        children
      )}
    </div>
  );
}

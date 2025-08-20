'use client';

import { ReactNode } from 'react';
import MainNavbar from './MainNavbar';
import PageTransition from './PageTransition';

type SelectedKey = 'Home' | 'Projects' | 'Contact';

interface PageTemplateProps {
  children: ReactNode;
  selected?: SelectedKey;
}

export default function PageTemplate({ children, selected }: PageTemplateProps) {
  return (
    <div className="min-h-screen relative">
      {/* Navbar bleibt statisch - keine Animation */}
      <MainNavbar selected={selected} />
      
      {/* Nur der Content wird animiert */}
      <PageTransition>
        {children}
      </PageTransition>
    </div>
  );
}

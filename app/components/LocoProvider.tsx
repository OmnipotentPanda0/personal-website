"use client";

import React from "react";
import 'locomotive-scroll/dist/locomotive-scroll.css';

export default function LocoProvider({ children }: { children: React.ReactNode }) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    let scroll: any;
    const init = async () => {
      if (!containerRef.current) return;
      const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      scroll = new LocomotiveScroll({
        el: containerRef.current,
        smooth: true,
  // Higher lerp = snappier, shorter animation (default ~0.1)
  lerp: 0.22,
  multiplier: 1.0,
        smartphone: { smooth: true },
        tablet: { smooth: true },
      });
    };

    init();
    return () => {
      if (scroll) {
        try { scroll.destroy(); } catch {}
      }
    };
  }, []);

  return (
    <div data-scroll-container ref={containerRef}>
      {children}
    </div>
  );
}

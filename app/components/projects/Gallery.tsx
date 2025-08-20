"use client";

import React from "react";
import Image from "next/image";

type GalleryImage = { url: string; title?: string; description?: string };

type GalleryProps = {
  images: GalleryImage[];
};

export default function Gallery({ images }: GalleryProps) {
  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const touchStart = React.useRef<{ x: number; y: number } | null>(null);
  const closeBtnRef = React.useRef<HTMLButtonElement | null>(null);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };
  const close = () => setOpen(false);
  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    // move focus to close button for accessibility
    closeBtnRef.current?.focus();
  return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onTouchStart: React.TouchEventHandler = (e) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd: React.TouchEventHandler = (e) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      dx < 0 ? next() : prev();
    }
    touchStart.current = null;
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full">
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => openAt(i)}
            className="group relative block overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={img.title || `Bild ${i + 1} öffnen`}
          >
            <div className="relative aspect-square">
              <Image
                src={img.url}
                alt={img.title || img.description || `Gallery image ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {(img.title || img.description) && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="text-xs font-medium truncate">{img.title}</div>
                {img.description && (
                  <div className="text-[10px] opacity-80 truncate">{img.description}</div>
                )}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Bildanzeige"
          onClick={close}
        >
          {/* Content area (stop propagation so backdrop closes only when outside) */}
          <div
            className="relative w-[90vw] max-w-[1400px] mx-auto px-2 md:px-4 select-none"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Close */}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={close}
              className="absolute -top-12 right-2 md:right-0 md:-top-12 text-white/90 hover:text-white focus:outline-none"
              aria-label="Schließen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 11-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </button>

            {/* Image area */}
            <div className="relative w-full h-[70vh] md:h-[75vh] rounded-lg overflow-hidden shadow-2xl bg-black/30">
              <Image
                key={index}
                src={images[index].url}
                alt={images[index].title || images[index].description || `Bild ${index + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />

              {/* Prev */}
              <button
                type="button"
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/60 text-white p-2 focus:outline-none"
                aria-label="Vorheriges Bild"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M15.78 3.97a.75.75 0 010 1.06L9.81 11l5.97 5.97a.75.75 0 11-1.06 1.06l-6.5-6.5a.75.75 0 010-1.06l6.5-6.5a.75.75 0 011.06 0z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Next */}
              <button
                type="button"
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/60 text-white p-2 focus:outline-none"
                aria-label="Nächstes Bild"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M8.22 20.03a.75.75 0 010-1.06L14.19 13 8.22 7.03a.75.75 0 111.06-1.06l6.5 6.5a.75.75 0 010 1.06l-6.5 6.5a.75.75 0 01-1.06 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Caption */}
            {(images[index].title || images[index].description) && (
              <div className="mt-3 text-white text-center">
                {images[index].title && (
                  <div className="text-sm md:text-base font-medium">{images[index].title}</div>
                )}
                {images[index].description && (
                  <div className="text-xs md:text-sm text-white/80">{images[index].description}</div>
                )}
                <div className="text-[11px] md:text-xs text-white/60 mt-1">{index + 1} / {images.length}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

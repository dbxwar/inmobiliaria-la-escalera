"use client";

import { useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface PropertyGalleryProps {
  images: { src: string; alt: string }[];
}

export function PropertyGallery({ images }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + images.length) % images.length);
    },
    [images.length]
  );

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, activeIndex, goTo]);

  // Disable scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxOpen]);

  return (
    <>
      {/* Main Gallery */}
      <div className="relative">
        {/* Main Image */}
        <div
          className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden cursor-pointer bg-[#1A2240]"
          onClick={() => openLightbox(activeIndex)}
        >
          <img
            src={images[activeIndex].src}
            alt={images[activeIndex].alt}
            className="w-full h-full object-contain"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A2240]/40 via-transparent to-transparent pointer-events-none" />
          
          {/* Navigation arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); goTo(activeIndex - 1); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white flex items-center justify-center text-[#1A2240] transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goTo(activeIndex + 1); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white flex items-center justify-center text-[#1A2240] transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight size={20} />
          </button>

          {/* Counter */}
          <span className="absolute bottom-4 right-4 bg-[#1A2240]/80 text-[#F0F4F8] text-xs px-3 py-1.5 tracking-wider">
            {activeIndex + 1} / {images.length}
          </span>
        </div>

        {/* Thumbnail Strip */}
        <div className="flex gap-2 mt-2 overflow-x-auto scrollbar-hide pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`flex-none w-20 h-14 md:w-24 md:h-16 overflow-hidden transition-all duration-200 ${
                i === activeIndex
                  ? "ring-2 ring-[#2E6DA4] opacity-100"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#1A2240]/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); goTo(activeIndex - 1); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goTo(activeIndex + 1); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image */}
          <img
            src={images[activeIndex].src}
            alt={images[activeIndex].alt}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Counter */}
          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm tracking-wider">
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Props {
  images: { src: string; alt: string }[];
}

export function PropertyPhotoGrid({ images }: Props) {
  const [active, setActive] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const goActive = useCallback(
    (dir: number) =>
      setActive((prev) => {
        const next = (prev + dir + images.length) % images.length;
        return next;
      }),
    [images.length]
  );

  // Scroll thumbnail into view when active changes
  useEffect(() => {
    const el = thumbsRef.current?.children[active] as HTMLElement | undefined;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const goLightbox = useCallback(
    (dir: number) =>
      setLightboxIndex((prev) =>
        prev === null ? null : (prev + dir + images.length) % images.length
      ),
    [images.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goLightbox(1);
      if (e.key === "ArrowLeft") goLightbox(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, goLightbox]);

  if (images.length === 0) return null;

  return (
    <>
      {/* ── Foto principal + flechas ── */}
      <div
        className="relative aspect-[4/3] overflow-hidden bg-[#1B2B4B] group"
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const diff = touchStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 40) goActive(diff > 0 ? 1 : -1);
          touchStartX.current = null;
        }}
      >
        <img
          src={images[active].src}
          alt={images[active].alt}
          className="w-full h-full object-contain cursor-zoom-in"
          onClick={() => openLightbox(active)}
        />

        {/* Flechas discretas — visibles al hover en desktop, siempre en móvil */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => goActive(-1)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/70 hover:bg-white text-[#1B2B4B] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 opacity-100"
              aria-label="Foto anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => goActive(1)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/70 hover:bg-white text-[#1B2B4B] flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 opacity-100"
              aria-label="Foto siguiente"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Contador */}
        <span className="absolute bottom-2.5 right-2.5 bg-black/55 text-white text-xs px-2 py-0.5 pointer-events-none">
          {active + 1} / {images.length}
        </span>
      </div>

      {/* ── Tira de miniaturas ── */}
      {images.length > 1 && (
        <div
          ref={thumbsRef}
          className="flex gap-1.5 mt-1.5 overflow-x-auto scrollbar-hide"
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex-none w-16 h-11 overflow-hidden transition-all ${
                i === active
                  ? "ring-2 ring-[#C9A84C] opacity-100"
                  : "opacity-50 hover:opacity-90"
              }`}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X size={20} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goLightbox(-1); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goLightbox(1); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <ChevronRight size={24} />
          </button>
          <img
            src={images[lightboxIndex].src}
            alt={images[lightboxIndex].alt}
            className="max-w-[92vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <span className="absolute bottom-14 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {lightboxIndex + 1} / {images.length}
          </span>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-[90vw] overflow-x-auto px-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                className={`flex-none w-14 h-10 overflow-hidden transition-all ${
                  i === lightboxIndex ? "ring-2 ring-[#C9A84C] opacity-100" : "opacity-50 hover:opacity-80"
                }`}
              >
                <img src={img.src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

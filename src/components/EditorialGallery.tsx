"use client";

import Image from "next/image";
import { useState } from "react";

import type { GalleryImage } from "@/lib/gallery-data";

const aspectClasses: Record<GalleryImage["aspect"], string> = {
  portrait: "aspect-[2/3]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
};

type EditorialGalleryProps = {
  items: GalleryImage[];
  compact?: boolean;
};

/**
 * Editorial grid — images are laid out in a CSS columns-based masonry.
 * Portrait images are taller and break the horizontal rhythm naturally.
 */
export function EditorialGallery({ items, compact = false }: EditorialGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const wrapperClass = compact
    ? "grid grid-cols-2 gap-0.5 min-[420px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6"
    : "columns-2 gap-0.5 md:columns-3";
  const imageSizes = compact
    ? "(max-width: 420px) 50vw, (max-width: 640px) 33vw, (max-width: 1024px) 25vw, (max-width: 1536px) 20vw, 16vw"
    : "(max-width: 768px) 50vw, 33vw";

  return (
    <>
      <div className={wrapperClass} style={compact ? undefined : { columnFill: "balance" }}>
        {items.map((item, index) => (
          <button
            key={`${item.src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`group block w-full overflow-hidden cursor-pointer ${compact ? (item.aspect === "landscape" ? "sm:col-span-2" : "") : "mb-0.5 break-inside-avoid"}`}
          >
            <div className={`relative w-full ${aspectClasses[item.aspect]}`}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes={imageSizes}
                className="object-cover transition-opacity duration-300 group-hover:opacity-75"
              />
            </div>
          </button>
        ))}
      </div>

      {activeIndex !== null ? (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-6 top-6 z-10 text-white/50 hover:text-white transition-colors text-[11px] tracking-[0.2em] uppercase"
          >
            ✕
          </button>

          <span className="absolute left-6 top-6 text-white/30 text-[11px] tracking-[0.15em]">
            {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>

          <div className="relative h-screen w-screen" onClick={(e) => e.stopPropagation()}>
            <Image
              src={items[activeIndex].src}
              alt={items[activeIndex].alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <button
            type="button"
            disabled={activeIndex === 0}
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(activeIndex - 1);
            }}
            className="absolute left-6 bottom-8 text-white/40 hover:text-white disabled:opacity-0 transition-colors text-[11px] tracking-[0.2em] uppercase"
          >
            ← Prev
          </button>
          <button
            type="button"
            disabled={activeIndex === items.length - 1}
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(activeIndex + 1);
            }}
            className="absolute right-6 bottom-8 text-white/40 hover:text-white disabled:opacity-0 transition-colors text-[11px] tracking-[0.2em] uppercase"
          >
            Next →
          </button>
        </div>
      ) : null}
    </>
  );
}

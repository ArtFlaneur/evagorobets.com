"use client";

import Image from "next/image";
import { useState } from "react";

type GalleryItem = {
  src: string;
  alt: string;
  aspect?: "portrait" | "landscape" | "square";
};

export function GalleryLightbox({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid gap-0.5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <button
            key={`${item.src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group overflow-hidden bg-[#f4f2ef]"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={1200}
              height={900}
              className="h-72 w-full object-cover transition duration-500 group-hover:scale-[1.02] opacity-90 group-hover:opacity-100"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null ? (
        <div
          className="fixed inset-0 z-30 flex items-center justify-center bg-white/95 p-4"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-8 top-8 label hover:opacity-60 transition-opacity"
          >
            Close
          </button>
          <Image
            src={items[activeIndex].src}
            alt={items[activeIndex].alt}
            width={1800}
            height={1200}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-8 flex gap-6">
            <button
              type="button"
              disabled={activeIndex === 0}
              onClick={(e) => { e.stopPropagation(); setActiveIndex(activeIndex - 1); }}
              className="label disabled:opacity-20 hover:opacity-60 transition-opacity"
            >
              ← Prev
            </button>
            <button
              type="button"
              disabled={activeIndex === items.length - 1}
              onClick={(e) => { e.stopPropagation(); setActiveIndex(activeIndex + 1); }}
              className="label disabled:opacity-20 hover:opacity-60 transition-opacity"
            >
              Next →
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

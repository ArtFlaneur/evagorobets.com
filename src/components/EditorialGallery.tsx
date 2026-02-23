"use client";

import Image from "next/image";
import { useState } from "react";

import type { GalleryImage } from "@/lib/gallery-data";

const aspectClasses: Record<GalleryImage["aspect"], string> = {
  portrait: "aspect-[2/3]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
};

/**
 * Editorial grid — images are laid out in a CSS columns-based masonry.
 * Portrait images are taller and break the horizontal rhythm naturally.
 */
export function EditorialGallery({ items }: { items: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      {/* CSS columns masonry */}
      <div
        className="columns-2 gap-0.5 md:columns-3"
        style={{ columnFill: "balance" }}
      >
        {items.map((item, index) => (
          <button
            key={`${item.src}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="group mb-0.5 block w-full overflow-hidden break-inside-avoid"
          >
            <div className={`relative w-full ${aspectClasses[item.aspect]}`}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-all duration-500 opacity-90 group-hover:opacity-100 group-hover:scale-[1.02]"
              />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {activeIndex !== null ? (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-white/97 p-4"
          style={{ backdropFilter: "blur(4px)" }}
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="label absolute right-8 top-8 hover:opacity-60 transition-opacity"
          >
            Close
          </button>

          <div
            className="relative w-full max-w-4xl"
            style={{
              aspectRatio:
                items[activeIndex].aspect === "portrait"
                  ? "2/3"
                  : items[activeIndex].aspect === "square"
                    ? "1/1"
                    : "3/2",
              maxHeight: "82vh",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={items[activeIndex].src}
              alt={items[activeIndex].alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <p className="label mt-6 opacity-50">{items[activeIndex].alt}</p>

          <div className="absolute bottom-8 flex gap-10">
            <button
              type="button"
              disabled={activeIndex === 0}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(activeIndex - 1);
              }}
              className="label disabled:opacity-20 hover:opacity-60 transition-opacity"
            >
              ← Prev
            </button>
            <span className="label opacity-30">
              {activeIndex + 1} / {items.length}
            </span>
            <button
              type="button"
              disabled={activeIndex === items.length - 1}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(activeIndex + 1);
              }}
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

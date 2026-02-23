"use client";

import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import type { GalleryImage } from "@/lib/gallery-data";

interface Props {
  images: GalleryImage[];
  name: string;
  title: string;
  locale: string;
}

export function HeroSlideshow({ images, name, title }: Props) {
  const [phase, setPhase] = useState<"intro" | "photo">("intro");
  const [current, setCurrent] = useState(0);
  const [cursorSide, setCursorSide] = useState<"left" | "right">("right");
  const [photoVisible, setPhotoVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = images.length;

  // ── Intro → photo transition ──────────────────────────────────────────

  useEffect(() => {
    // Start fading in photos slightly before intro overlay fades out
    const photoTimer = setTimeout(() => setPhotoVisible(true), 2000);
    const phaseTimer = setTimeout(() => setPhase("photo"), 2800);
    return () => {
      clearTimeout(photoTimer);
      clearTimeout(phaseTimer);
    };
  }, []);

  // ── Keyboard navigation ───────────────────────────────────────────────

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (phase !== "photo") return;
      if (e.key === "ArrowRight" || e.key === " ") {
        setCurrent((c) => (c + 1) % total);
      } else if (e.key === "ArrowLeft") {
        setCurrent((c) => (c - 1 + total) % total);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, total]);

  // ── Click / cursor tracking ───────────────────────────────────────────

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const half = (e.currentTarget as HTMLElement).offsetWidth / 2;
    setCursorSide(e.clientX < half ? "left" : "right");
  }, []);

  function handleClick() {
    if (phase !== "photo") return;
    if (cursorSide === "right") {
      setCurrent((c) => (c + 1) % total);
    } else {
      setCurrent((c) => (c - 1 + total) % total);
    }
  }

  if (total === 0) return null;

  const img = images[current];

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black select-none"
      style={{ cursor: phase === "photo" ? (cursorSide === "right" ? "e-resize" : "w-resize") : "default" }}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* Photos — rendered behind intro overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ opacity: photoVisible ? 1 : 0 }}
      >
        {images.map((img, i) => (
          <div
            key={img.src}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0 }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />
      </div>

      {/* ── Intro overlay ── */}
      <div
        className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black transition-opacity duration-1000 pointer-events-none"
        style={{ opacity: phase === "intro" ? 1 : 0 }}
      >
        <p
          className="animate-fade-up text-white text-center"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontWeight: 400,
            fontSize: "clamp(2.8rem, 7vw, 7rem)",
            letterSpacing: "-0.01em",
            lineHeight: 1,
            animationDelay: "0.2s",
          }}
        >
          {name}
        </p>
        <p
          className="animate-fade-in mt-4 text-white/50 uppercase tracking-[0.35em] text-[11px]"
          style={{ animationDelay: "0.8s", fontFamily: "var(--font-dm-sans)" }}
        >
          {title}
        </p>
      </div>

      {/* ── Photo-phase UI (counter + hint) ── */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-8 pb-8 transition-opacity duration-700 pointer-events-none"
        style={{ opacity: phase === "photo" ? 1 : 0 }}
      >
        {/* Counter */}
        <span
          className="text-white/40 tabular-nums"
          style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.15em" }}
        >
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        {/* Scroll hint */}
        <span
          className="text-white/25 uppercase"
          style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", letterSpacing: "0.2em" }}
        >
          scroll
        </span>
      </div>

      {/* ── Alt text for current photo (screenreader) ── */}
      <span className="sr-only">{img.alt}</span>
    </div>
  );
}

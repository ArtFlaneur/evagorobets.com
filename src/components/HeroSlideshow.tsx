"use client";

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
  const containerRef = useRef<HTMLDivElement>(null);

  const total = images.length;

  // ── Intro → photo transition ──────────────────────────────────────────

  useEffect(() => {
    // Overlay slides up at 2.4s, phase switches at 3.2s (after slide completes)
    const phaseTimer = setTimeout(() => setPhase("photo"), 3200);
    return () => clearTimeout(phaseTimer);
  }, []);

  // Sync phase to body data attribute so SiteHeader can read it
  useEffect(() => {
    document.body.dataset.heroPhase = phase;
    return () => { delete document.body.dataset.heroPhase; };
  }, [phase]);

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
      className="relative h-screen w-full overflow-hidden bg-white select-none"
      style={{ cursor: phase === "photo" ? (cursorSide === "right" ? "e-resize" : "w-resize") : "default" }}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* Photos — always visible behind overlay */}
      <div className="absolute inset-0">
        {images.map((img, i) => (
          <div
            key={img.src}
            className="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0, padding: "88px 80px 56px" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              style={{ maxWidth: "70%", maxHeight: "100%", objectFit: "contain", display: "block" }}
            />
          </div>
        ))}
      </div>

      {/* ── Intro overlay: black, slides up on exit ── */}
      <div
        className="absolute inset-0 z-20 bg-black pointer-events-none flex flex-col"
        style={{
          transition: "transform 0.9s cubic-bezier(0.76, 0, 0.24, 1)",
          transform: phase === "photo" ? "translateY(-100%)" : "translateY(0)",
          justifyContent: "center",
          padding: "0 10vw",
          paddingTop: "30vh",
        }}
      >
        <p
          className="text-white whitespace-nowrap"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          <span className="animate-fade-in" style={{ fontWeight: 600, animationDelay: "0.3s" }}>
            {name}
          </span>
          <span className="animate-fade-in text-white/45" style={{ fontWeight: 300, animationDelay: "1s" }}>
            {" "}— {title}
          </span>
        </p>
      </div>

      {/* ── Photo-phase UI (counter + hint) ── */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-8 pb-8 transition-opacity duration-700 pointer-events-none"
        style={{ opacity: phase === "photo" ? 1 : 0 }}
      >
        <span
          className="text-black/30 tabular-nums"
          style={{ fontFamily: "var(--font-dm-sans)", fontSize: "11px", letterSpacing: "0.15em" }}
        >
          {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <span
          className="text-black/20 uppercase"
          style={{ fontFamily: "var(--font-dm-sans)", fontSize: "10px", letterSpacing: "0.2em" }}
        >
          scroll
        </span>
      </div>

      <span className="sr-only">{img.alt}</span>
    </div>
  );
}

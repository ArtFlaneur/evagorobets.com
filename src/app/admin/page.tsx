"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { CloudinaryResource } from "@/lib/cloudinary";

// ── Gallery configuration ──────────────────────────────────────────────────

const GALLERIES = [
  { label: "Business Portraits", folder: "eva/portraits" },
  { label: "Corporate Events", folder: "eva/corporate" },
  { label: "Art & Galleries", folder: "eva/art" },
  { label: "Featured (Home)", folder: "eva/featured" },
  { label: "Portfolio", folder: "eva/portfolio" },
] as const;

// ── Cloudinary widget global type ──────────────────────────────────────────

declare global {
  interface Window {
    cloudinary?: {
      openUploadWidget: (opts: Record<string, unknown>, cb: (err: unknown, result: { event: string }) => void) => void;
    };
  }
}

// ── Component ──────────────────────────────────────────────────────────────

export default function AdminPage() {
  const router = useRouter();
  const [gallery, setGallery] = useState<(typeof GALLERIES)[number]>(GALLERIES[0]);
  const [images, setImages] = useState<CloudinaryResource[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const cloudinaryReady = !!(cloudName && uploadPreset);

  // ── Fetch images ──────────────────────────────────────────────────────

  const fetchImages = useCallback(async (folder: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/gallery?folder=${encodeURIComponent(folder)}`);
      if (res.ok) setImages(await res.json());
      else setImages([]);
    } catch {
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages(gallery.folder);
  }, [gallery, fetchImages]);

  // ── Upload widget ─────────────────────────────────────────────────────

  function openWidget() {
    if (!window.cloudinary || !cloudName || !uploadPreset) {
      alert("Cloudinary not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local");
      return;
    }

    window.cloudinary.openUploadWidget(
      {
        cloudName,
        uploadPreset,
        folder: gallery.folder,
        multiple: true,
        sources: ["local", "url", "camera"],
        showAdvancedOptions: true,
        cropping: false,
        defaultSource: "local",
        styles: {
          palette: {
            window: "#FFFFFF",
            windowBorder: "#111111",
            tabIcon: "#111111",
            menuIcons: "#555555",
            textDark: "#111111",
            textLight: "#FFFFFF",
            link: "#111111",
            action: "#111111",
            inactiveTabIcon: "#AAAAAA",
            error: "#cc0000",
            inProgress: "#111111",
            complete: "#111111",
            sourceBg: "#FAFAFA",
          },
          fonts: { default: null },
        },
      },
      (err, result) => {
        if (!err && result.event === "success") {
          fetchImages(gallery.folder);
        }
        if (!err && result.event === "close") {
          fetchImages(gallery.folder);
        }
      }
    );
  }

  // ── Delete ────────────────────────────────────────────────────────────

  async function deleteImage(publicId: string) {
    if (!confirm(`Delete "${publicId.split("/").pop()}"?`)) return;
    setDeleting(publicId);
    try {
      await fetch("/api/admin/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      });
      setImages((prev) => prev.filter((r) => r.public_id !== publicId));
    } finally {
      setDeleting(null);
    }
  }

  // ── Log out ───────────────────────────────────────────────────────────

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  // ── Render ────────────────────────────────────────────────────────────

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="hidden md:flex w-56 shrink-0 flex-col border-r border-black/[0.07] px-6 py-10">
        <p
          className="mb-10 text-[13px] tracking-[0.18em] uppercase"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 500 }}
        >
          Eva Gorobets
          <span className="block text-[10px] tracking-[0.2em] opacity-40 mt-1">Admin</span>
        </p>

        <nav className="flex flex-col gap-1">
          {GALLERIES.map((g) => (
            <button
              key={g.folder}
              onClick={() => setGallery(g)}
              className={`text-left py-2 text-[11px] tracking-[0.15em] uppercase transition-opacity ${
                gallery.folder === g.folder ? "opacity-100" : "opacity-35 hover:opacity-70"
              }`}
            >
              {g.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto">
          <button onClick={logout} className="text-[10px] tracking-[0.15em] uppercase opacity-30 hover:opacity-70 transition-opacity">
            Log out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 px-6 py-10 md:px-10">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase opacity-40 mb-1">Gallery</p>
            <h1
              className="text-3xl md:text-4xl"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
            >
              {gallery.label}
            </h1>
            <p className="text-[11px] tracking-[0.1em] opacity-30 mt-1">{gallery.folder}</p>
          </div>

          <div className="flex items-center gap-4">
            {!cloudinaryReady && (
              <p className="text-[10px] tracking-[0.1em] uppercase text-black/30">
                Cloudinary not configured
              </p>
            )}
            <button
              onClick={openWidget}
              disabled={!cloudinaryReady}
              className="btn disabled:opacity-30"
            >
              + Upload
            </button>
          </div>
        </div>

        {/* Mobile gallery switcher */}
        <div className="mb-8 flex flex-wrap gap-3 md:hidden">
          {GALLERIES.map((g) => (
            <button
              key={g.folder}
              onClick={() => setGallery(g)}
              className={`text-[10px] tracking-[0.15em] uppercase border py-2 px-3 transition-opacity ${
                gallery.folder === g.folder
                  ? "border-black/60"
                  : "border-black/15 opacity-50"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        {/* Images grid */}
        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <p className="text-[11px] tracking-[0.15em] uppercase opacity-30">Loading…</p>
          </div>
        ) : images.length === 0 ? (
          <div className="flex h-48 flex-col items-center justify-center gap-4 border border-dashed border-black/15">
            <p className="text-[11px] tracking-[0.15em] uppercase opacity-30">No images yet</p>
            <button onClick={openWidget} disabled={!cloudinaryReady} className="btn-ghost disabled:opacity-30">
              Upload first image →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-0.5 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
            {images.map((img) => (
              <div key={img.public_id} className="group relative overflow-hidden bg-black/[0.03]">
                <Image
                  src={img.secure_url}
                  alt={img.context?.custom?.alt ?? ""}
                  width={img.width}
                  height={img.height}
                  className="w-full object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <p className="px-2 text-center text-[10px] tracking-[0.05em] text-black/60 leading-tight line-clamp-2">
                    {img.public_id.split("/").pop()}
                  </p>
                  <p className="text-[10px] tracking-[0.1em] uppercase opacity-40">
                    {img.width}×{img.height}
                  </p>
                  <button
                    onClick={() => deleteImage(img.public_id)}
                    disabled={deleting === img.public_id}
                    className="text-[10px] tracking-[0.15em] uppercase text-black/50 hover:text-black transition-colors disabled:opacity-30"
                  >
                    {deleting === img.public_id ? "Deleting…" : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Count */}
        {images.length > 0 && (
          <p className="mt-6 text-[10px] tracking-[0.15em] uppercase opacity-30">
            {images.length} image{images.length !== 1 ? "s" : ""}
          </p>
        )}
      </main>
    </div>
  );
}

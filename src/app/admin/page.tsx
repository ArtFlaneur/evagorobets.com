"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { CloudinaryResource } from "@/lib/cloudinary";

function thumbUrl(url: string) {
  return url.replace("/upload/", "/upload/w_400,c_fill,q_auto,f_auto/");
}

const GALLERIES = [
  { label: "Business Portraits", folder: "eva/portraits", type: "image" as const },
  { label: "Corporate Events", folder: "eva/corporate", type: "image" as const },
  { label: "Art & Galleries", folder: "eva/art", type: "image" as const },
  { label: "About Photo", folder: "eva/about", type: "image" as const },
  { label: "Hero Slideshow", folder: "eva/featured", type: "image" as const },
  { label: "Portfolio", folder: "eva/portfolio", type: "image" as const },
  { label: "UGC Photo", folder: "eva/ugc-photo", type: "image" as const },
  { label: "UGC Gallery", folder: "eva/ugc-gallery", type: "image" as const },
  { label: "UGC Reels", folder: "eva/ugc", type: "reels" as const },
] as const;

const SOURCE_FOLDERS = ["eva/portraits", "eva/corporate", "eva/art"];

declare global {
  interface Window {
    cloudinary?: {
      openUploadWidget: (
        opts: Record<string, unknown>,
        cb: (err: unknown, result: { event: string }) => void
      ) => void;
    };
  }
}

export default function AdminPage() {
  const router = useRouter();
  const [gallery, setGallery] = useState<(typeof GALLERIES)[number]>(GALLERIES[0]);
  const isFeatured = gallery.folder === "eva/featured";
  const isReels = gallery.type === "reels";

  // regular gallery state
  const [images, setImages] = useState<CloudinaryResource[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  // reels editor state
  const [reelsText, setReelsText] = useState("");
  const [reelsLoading, setReelsLoading] = useState(false);
  const [reelsSaving, setReelsSaving] = useState(false);
  const [reelsSaved, setReelsSaved] = useState(false);

  // featured picker state
  const [sourceImages, setSourceImages] = useState<CloudinaryResource[]>([]);
  const [featuredIds, setFeaturedIds] = useState<Set<string>>(new Set());
  const [featuredOrder, setFeaturedOrder] = useState<string[]>([]);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [toggling, setToggling] = useState<Set<string>>(new Set());
  const [savingOrder, setSavingOrder] = useState(false);
  const [pickerLoading, setPickerLoading] = useState(false);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const cloudinaryReady = !!(cloudName && uploadPreset);

  const fetchImages = useCallback(async (folder: string, type: "image" | "video") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/gallery?folder=${encodeURIComponent(folder)}&type=${type}`);
      setImages(res.ok ? await res.json() : []);
    } catch {
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchFeaturedData = useCallback(async () => {
    setPickerLoading(true);
    try {
      const [idsRes, ...srcResults] = await Promise.all([
        fetch("/api/admin/featured"),
        ...SOURCE_FOLDERS.map((f) =>
          fetch(`/api/admin/gallery?folder=${encodeURIComponent(f)}`)
        ),
      ]);
      const ids: string[] = idsRes.ok ? await idsRes.json() : [];
      setFeaturedIds(new Set(ids));
      setFeaturedOrder(ids);
      const all: CloudinaryResource[] = [];
      for (const res of srcResults) {
        if (res.ok) all.push(...(await res.json()));
      }
      setSourceImages(all);
    } catch {
      setSourceImages([]);
    } finally {
      setPickerLoading(false);
    }
  }, []);

  const saveFeaturedOrder = useCallback(async (orderedIds: string[]) => {
    setSavingOrder(true);
    try {
      await fetch("/api/admin/featured", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reorder", orderedIds }),
      });
    } finally {
      setSavingOrder(false);
    }
  }, []);

  const fetchReels = useCallback(async () => {
    setReelsLoading(true);
    try {
      const res = await fetch("/api/admin/reels");
      const data = res.ok ? await res.json() : { urls: [] };
      setReelsText((data.urls ?? []).join("\n"));
    } catch {
      setReelsText("");
    } finally {
      setReelsLoading(false);
    }
  }, []);

  async function saveReels() {
    setReelsSaving(true);
    setReelsSaved(false);
    try {
      const urls = reelsText.split("\n").map((u) => u.trim()).filter(Boolean);
      const res = await fetch("/api/admin/reels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls }),
      });
      if (res.ok) {
        const data = await res.json();
        setReelsText((data.urls ?? urls).join("\n"));
        setReelsSaved(true);
      }
    } finally {
      setReelsSaving(false);
    }
  }

  useEffect(() => {
    if (isReels) fetchReels();
    else if (isFeatured) fetchFeaturedData();
    else fetchImages(gallery.folder, "image");
  }, [gallery, isFeatured, isReels, fetchImages, fetchFeaturedData, fetchReels]);

  async function toggleFeatured(publicId: string) {
    const action = featuredIds.has(publicId) ? "remove" : "add";
    setToggling((p) => new Set(p).add(publicId));
    const response = await fetch("/api/admin/featured", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId, action }),
    });
    if (!response.ok) {
      setToggling((p) => {
        const n = new Set(p);
        n.delete(publicId);
        return n;
      });
      return;
    }

    const nextSet = new Set(featuredIds);
    let nextOrder = [...featuredOrder];

    if (action === "add") {
      nextSet.add(publicId);
      if (!nextOrder.includes(publicId)) nextOrder.push(publicId);
    } else {
      nextSet.delete(publicId);
      nextOrder = nextOrder.filter((id) => id !== publicId);
    }

    setFeaturedIds(nextSet);
    setFeaturedOrder(nextOrder);

    if (action === "remove") {
      await saveFeaturedOrder(nextOrder);
    }

    setToggling((p) => {
      const n = new Set(p);
      n.delete(publicId);
      return n;
    });
  }

  async function reorderFeatured(draggedPublicId: string, targetPublicId: string) {
    if (draggedPublicId === targetPublicId) return;
    const from = featuredOrder.indexOf(draggedPublicId);
    const to = featuredOrder.indexOf(targetPublicId);
    if (from < 0 || to < 0) return;

    const next = [...featuredOrder];
    next.splice(from, 1);
    next.splice(to, 0, draggedPublicId);
    setFeaturedOrder(next);
    await saveFeaturedOrder(next);
  }

  function openWidget() {
    if (!window.cloudinary || !cloudName || !uploadPreset) {
      alert("Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET");
      return;
    }
    window.cloudinary.openUploadWidget(
      {
        cloudName,
        uploadPreset,
        folder: gallery.folder,
        multiple: true,
        resourceType: "image",
        sources: ["local", "url", "camera"],
        showAdvancedOptions: true,
        cropping: false,
        defaultSource: "local",
        styles: {
          palette: {
            window: "#FFFFFF", windowBorder: "#111111", tabIcon: "#111111",
            menuIcons: "#555555", textDark: "#111111", textLight: "#FFFFFF",
            link: "#111111", action: "#111111", inactiveTabIcon: "#AAAAAA",
            error: "#cc0000", inProgress: "#111111", complete: "#111111",
            sourceBg: "#FAFAFA",
          },
          fonts: { default: null },
        },
      },
      (err, result) => {
        if (!err && (result.event === "success" || result.event === "close")) {
          fetchImages(gallery.folder, "image");
        }
      }
    );
  }

  async function deleteImage(publicId: string) {
    if (!confirm("Delete this image?")) return;
    setDeleting(publicId);
    await fetch("/api/admin/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId, type: "image" }),
    });
    setImages((p) => p.filter((r) => r.public_id !== publicId));
    setDeleting(null);
  }

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  const sidebar = (
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
        <button
          onClick={logout}
          className="text-[10px] tracking-[0.15em] uppercase opacity-30 hover:opacity-70 transition-opacity"
        >
          Log out
        </button>
      </div>
    </aside>
  );

  // ── FEATURED PICKER ────────────────────────────────────────────────────

  if (isFeatured) {
    const imageById = new Map(sourceImages.map((img) => [img.public_id, img]));
    const featured = featuredOrder
      .map((id) => imageById.get(id))
      .filter((img): img is CloudinaryResource => Boolean(img));
    const others = sourceImages.filter((img) => !featuredIds.has(img.public_id));
    const featuredDiagnostics = featured.map((img, index) => {
      const rawOrder = img.context?.custom?.featured_order ?? "";
      const storedOrder = Number(rawOrder);
      const hasStoredOrder = Number.isFinite(storedOrder) && storedOrder > 0;
      return {
        publicId: img.public_id,
        position: index + 1,
        storedOrder: hasStoredOrder ? storedOrder : null,
        createdAt: img.created_at,
      };
    });
    const missingOrderCount = featuredDiagnostics.filter((img) => img.storedOrder === null).length;
    const duplicateOrderCount = Math.max(
      0,
      featuredDiagnostics.length - new Set(featuredDiagnostics.map((img) => img.storedOrder).filter((value): value is number => value !== null)).size - missingOrderCount
    );
    const mismatchedOrderCount = featuredDiagnostics.filter(
      (img) => img.storedOrder !== null && img.storedOrder !== img.position
    ).length;
    const chronologicalFallbackLikely = missingOrderCount > 0 || duplicateOrderCount > 0;

    async function repairFeaturedOrder() {
      await saveFeaturedOrder(featuredOrder);
      await fetchFeaturedData();
    }

    return (
      <div className="flex min-h-screen bg-white">
        {sidebar}
        <main className="flex-1 px-6 py-10 md:px-10">
          <div className="mb-8">
            <p className="text-[10px] tracking-[0.2em] uppercase opacity-40 mb-1">Gallery</p>
            <h1
              className="text-3xl md:text-4xl"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
            >
              Hero Slideshow
            </h1>
            <p className="text-[11px] tracking-[0.1em] opacity-30 mt-1">
              Select photos to show in the hero slideshow on the home page
            </p>
            <p className="text-[10px] tracking-[0.12em] opacity-30 mt-2 uppercase">
              Drag and drop to set slideshow order {savingOrder ? "(saving...)" : ""}
            </p>
          </div>

          {!pickerLoading && featured.length > 0 && (
            <section className="mb-10 border border-black/10 bg-black/[0.02] px-4 py-4 md:px-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase opacity-40">Diagnostics</p>
                  <p className="mt-2 text-sm text-black/70">
                    {chronologicalFallbackLikely
                      ? "Homepage order is likely falling back to upload chronology because featured_order metadata is missing or inconsistent."
                      : mismatchedOrderCount > 0
                        ? "Stored featured_order values exist, but they do not match the current admin order."
                        : "Stored featured_order values match the current admin order."}
                  </p>
                </div>
                <button onClick={repairFeaturedOrder} disabled={savingOrder} className="btn-ghost disabled:opacity-30 whitespace-nowrap">
                  Rewrite order metadata
                </button>
              </div>

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="border-t border-black/[0.07] pt-3">
                  <p className="text-[10px] tracking-[0.15em] uppercase opacity-40">Missing order</p>
                  <p className="mt-1 text-sm text-black/75">{missingOrderCount}</p>
                </div>
                <div className="border-t border-black/[0.07] pt-3">
                  <p className="text-[10px] tracking-[0.15em] uppercase opacity-40">Duplicate order</p>
                  <p className="mt-1 text-sm text-black/75">{duplicateOrderCount}</p>
                </div>
                <div className="border-t border-black/[0.07] pt-3">
                  <p className="text-[10px] tracking-[0.15em] uppercase opacity-40">Mismatch vs admin</p>
                  <p className="mt-1 text-sm text-black/75">{mismatchedOrderCount}</p>
                </div>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs text-black/70">
                  <thead>
                    <tr className="border-t border-black/[0.07]">
                      <th className="py-2 pr-4 font-normal uppercase tracking-[0.12em] opacity-40">Admin</th>
                      <th className="py-2 pr-4 font-normal uppercase tracking-[0.12em] opacity-40">Stored</th>
                      <th className="py-2 pr-4 font-normal uppercase tracking-[0.12em] opacity-40">Uploaded</th>
                      <th className="py-2 font-normal uppercase tracking-[0.12em] opacity-40">Public ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {featuredDiagnostics.map((img) => (
                      <tr key={img.publicId} className="border-t border-black/[0.07] align-top">
                        <td className="py-2 pr-4">{img.position}</td>
                        <td className="py-2 pr-4">{img.storedOrder ?? "missing"}</td>
                        <td className="py-2 pr-4 whitespace-nowrap">{new Date(img.createdAt).toLocaleDateString()}</td>
                        <td className="py-2 break-all opacity-60">{img.publicId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {pickerLoading ? (
            <div className="flex h-48 items-center justify-center">
              <p className="text-[11px] tracking-[0.15em] uppercase opacity-30">Loading...</p>
            </div>
          ) : sourceImages.length === 0 ? (
            <div className="flex h-48 flex-col items-center justify-center gap-2 border border-dashed border-black/15">
              <p className="text-[11px] tracking-[0.15em] uppercase opacity-30">No images yet</p>
              <p className="text-[10px] opacity-20">
                Upload to Portraits, Corporate Events or Art &amp; Galleries first
              </p>
            </div>
          ) : (
            <>
              {featured.length > 0 && (
                <section className="mb-12">
                  <p className="text-[10px] tracking-[0.2em] uppercase mb-4 opacity-50">
                    On home page &mdash; {featured.length}
                  </p>
                  <div className="grid grid-cols-2 gap-0.5 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                    {featured.map((img) => (
                      <div
                        key={img.public_id}
                        draggable={!savingOrder && !toggling.has(img.public_id)}
                        onDragStart={() => setDraggingId(img.public_id)}
                        onDragOver={(event) => {
                          event.preventDefault();
                          setDragOverId(img.public_id);
                        }}
                        onDrop={async (event) => {
                          event.preventDefault();
                          const dragged = draggingId;
                          setDragOverId(null);
                          setDraggingId(null);
                          if (!dragged) return;
                          await reorderFeatured(dragged, img.public_id);
                        }}
                        onDragEnd={() => {
                          setDragOverId(null);
                          setDraggingId(null);
                        }}
                        className={`group relative overflow-hidden ${dragOverId === img.public_id ? "ring-2 ring-black/30" : ""} ${draggingId === img.public_id ? "opacity-60" : ""}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={thumbUrl(img.secure_url)}
                          alt=""
                          loading="lazy"
                          className="w-full object-cover block"
                        />
                        <div className="absolute top-2 right-2 bg-black text-white text-[10px] px-1.5 py-0.5 leading-none">
                          #{featuredOrder.indexOf(img.public_id) + 1}
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => toggleFeatured(img.public_id)}
                            disabled={toggling.has(img.public_id)}
                            className="text-[10px] tracking-[0.15em] uppercase text-white/80 hover:text-white disabled:opacity-30 border border-white/30 px-3 py-1"
                          >
                            {toggling.has(img.public_id) ? "..." : "Remove"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {featured.length > 0 && others.length > 0 && (
                <div className="border-t border-black/[0.07] mb-12" />
              )}

              {others.length > 0 && (
                <section>
                  <p className="text-[10px] tracking-[0.2em] uppercase mb-4 opacity-30">
                    Available &mdash; hover to add
                  </p>
                  <div className="grid grid-cols-2 gap-0.5 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                    {others.map((img) => (
                      <div
                        key={img.public_id}
                        className="group relative overflow-hidden opacity-50 hover:opacity-100 transition-opacity"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={thumbUrl(img.secure_url)}
                          alt=""
                          loading="lazy"
                          className="w-full object-cover block"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => toggleFeatured(img.public_id)}
                            disabled={toggling.has(img.public_id)}
                            className="text-[10px] tracking-[0.15em] uppercase text-white/80 hover:text-white disabled:opacity-30 border border-white/30 px-3 py-1"
                          >
                            {toggling.has(img.public_id) ? "..." : "+ Feature"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </main>
      </div>
    );
  }

  // ── UGC REELS (YouTube links) ──────────────────────────────────────────

  if (isReels) {
    const previewIds = reelsText
      .split("\n")
      .map((line) => {
        try {
          const u = new URL(line.trim());
          const parts = u.pathname.split("/").filter(Boolean);
          if (u.hostname === "youtu.be") return parts[0] ?? "";
          const keyed = parts.findIndex((p) => p === "shorts" || p === "embed" || p === "v");
          if (keyed >= 0 && parts[keyed + 1]) return parts[keyed + 1];
          return u.searchParams.get("v") ?? "";
        } catch {
          return "";
        }
      })
      .filter(Boolean);

    return (
      <div className="flex min-h-screen bg-white">
        {sidebar}
        <main className="flex-1 px-6 py-10 md:px-10">
          <div className="mb-8">
            <p className="text-[10px] tracking-[0.2em] uppercase opacity-40 mb-1">Gallery</p>
            <h1 className="text-3xl md:text-4xl" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>
              UGC Reels
            </h1>
            <p className="text-[11px] tracking-[0.1em] opacity-30 mt-1">
              Paste YouTube links (Shorts, watch or youtu.be) — one per line. They appear as the vertical reels gallery on the UGC page in this order.
            </p>
          </div>

          {reelsLoading ? (
            <div className="flex h-48 items-center justify-center">
              <p className="text-[11px] tracking-[0.15em] uppercase opacity-30">Loading...</p>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <label className="text-[10px] tracking-[0.2em] uppercase opacity-40">YouTube links</label>
                <textarea
                  value={reelsText}
                  onChange={(e) => { setReelsText(e.target.value); setReelsSaved(false); }}
                  rows={12}
                  placeholder={"https://youtube.com/shorts/VIDEO_ID\nhttps://youtu.be/VIDEO_ID\nhttps://www.youtube.com/watch?v=VIDEO_ID"}
                  className="mt-3 w-full resize-y border border-black/15 bg-white p-4 font-mono text-xs leading-relaxed outline-none focus:border-black/40"
                />
                <div className="mt-4 flex items-center gap-4">
                  <button onClick={saveReels} disabled={reelsSaving} className="btn disabled:opacity-30">
                    {reelsSaving ? "Saving..." : "Save reels"}
                  </button>
                  {reelsSaved && <span className="text-[10px] tracking-[0.15em] uppercase text-black/40">Saved</span>}
                </div>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase opacity-40 mb-3">Preview — {previewIds.length}</p>
                {previewIds.length === 0 ? (
                  <div className="flex h-48 items-center justify-center border border-dashed border-black/15">
                    <p className="text-[11px] tracking-[0.15em] uppercase opacity-30">No valid links yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {previewIds.map((id, i) => (
                      <div key={`${id}-${i}`} className="relative overflow-hidden bg-black" style={{ aspectRatio: "9 / 16" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute top-1 left-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 leading-none">#{i + 1}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // ── REGULAR GALLERY ────────────────────────────────────────────────────

  return (
    <div className="flex min-h-screen bg-white">
      {sidebar}
      <main className="flex-1 px-6 py-10 md:px-10">
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
            <button onClick={openWidget} disabled={!cloudinaryReady} className="btn disabled:opacity-30">
              {"+ Upload"}
            </button>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-3 md:hidden">
          {GALLERIES.map((g) => (
            <button
              key={g.folder}
              onClick={() => setGallery(g)}
              className={`text-[10px] tracking-[0.15em] uppercase border py-2 px-3 transition-opacity ${
                gallery.folder === g.folder ? "border-black/60" : "border-black/15 opacity-50"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex h-48 items-center justify-center">
            <p className="text-[11px] tracking-[0.15em] uppercase opacity-30">Loading...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="flex h-48 flex-col items-center justify-center gap-4 border border-dashed border-black/15">
            <p className="text-[11px] tracking-[0.15em] uppercase opacity-30">No images yet</p>
            <button onClick={openWidget} disabled={!cloudinaryReady} className="btn-ghost disabled:opacity-30">
              Upload first image &rarr;
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-0.5 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
              {images.map((img) => (
                <div key={img.public_id} className="group relative overflow-hidden bg-black/[0.03]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumbUrl(img.secure_url)}
                    alt={img.context?.custom?.alt ?? ""}
                    loading="lazy"
                    className="w-full object-cover block"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <p className="text-[10px] tracking-[0.1em] uppercase text-white/50">
                      {`${img.width}×${img.height}`}
                    </p>
                    <button
                      onClick={() => deleteImage(img.public_id)}
                      disabled={deleting === img.public_id}
                      className="text-[10px] tracking-[0.15em] uppercase text-white/60 hover:text-white transition-colors disabled:opacity-30 border border-white/20 px-3 py-1"
                    >
                      {deleting === img.public_id ? "..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[10px] tracking-[0.15em] uppercase opacity-30">
              {images.length} image{images.length !== 1 ? "s" : ""}
            </p>
          </>
        )}
      </main>
    </div>
  );
}

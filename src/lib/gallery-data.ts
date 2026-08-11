export type GalleryImage = {
  src: string;
  alt: string;
  /** "portrait" = vertical 2:3, "landscape" = horizontal 3:2, "square" = 1:1 */
  aspect: "portrait" | "landscape" | "square";
};

export type UgcVideo = {
  src: string;
  poster?: string;
  title: string;
  category?: string;
  createdAt: string;
};

// ── Async helpers — Cloudinary-first, static fallback ───────────────────────
// Imported lazily so static builds work without env vars set.

async function fromCloudinary(folder: string): Promise<GalleryImage[]> {
  try {
    const { getCloudinaryImages, cloudinaryConfigured } = await import("./cloudinary");
    if (!cloudinaryConfigured()) return [];
    return await getCloudinaryImages(folder);
  } catch {
    return [];
  }
}

export async function getPortraitsGallery(): Promise<GalleryImage[]> {
  const live = await fromCloudinary("eva/portraits");
  return live.length > 0 ? live : portraitsGallery;
}

export async function getCorporateGallery(): Promise<GalleryImage[]> {
  const live = await fromCloudinary("eva/corporate");
  return live.length > 0 ? live : corporateGallery;
}

export async function getArtGallery(): Promise<GalleryImage[]> {
  const live = await fromCloudinary("eva/art");
  return live.length > 0 ? live : artGallery;
}

export async function getFeaturedGallery(): Promise<GalleryImage[]> {
  try {
    const { getCloudinaryByTag, cloudinaryConfigured, optimizeCloudinaryDeliveryUrl } = await import("./cloudinary");
    if (!cloudinaryConfigured()) return featuredGallery;
    const resources = await getCloudinaryByTag("eva_featured", 60);
    if (resources.length === 0) return featuredGallery;
    return resources.map((r) => {
      const ratio = r.width / r.height;
      const aspect: GalleryImage["aspect"] =
        ratio < 0.85 ? "portrait" : ratio > 1.15 ? "landscape" : "square";
      return {
        src: optimizeCloudinaryDeliveryUrl(r.secure_url),
        alt: r.context?.custom?.alt || "Eva Gorobets — photographer, Tokyo & Melbourne",
        aspect,
      };
    });
  } catch {
    return featuredGallery;
  }
}

export async function getPortfolioGallery(): Promise<GalleryImage[]> {
  const live = await fromCloudinary("eva/portfolio");
  return live.length > 0 ? live : portfolioGallery;
}

export async function getAboutPhotoSrc(): Promise<string | null> {
  const live = await fromCloudinary("eva/about");
  if (live.length === 0) return null;
  return live[live.length - 1].src;
}

/**
 * Portrait for the /ugc page. Returns the most recent image in the eva/ugc-photo
 * Cloudinary folder, falling back to the About photo.
 */
export async function getUgcPhotoSrc(): Promise<string | null> {
  const live = await fromCloudinary("eva/ugc-photo");
  if (live.length > 0) return live[live.length - 1].src;
  return getAboutPhotoSrc();
}

/**
 * Content photography gallery for the /ugc page (eva/ugc-gallery folder).
 * Cloudinary-first; falls back to the portfolio gallery.
 */
export async function getUgcGallery(): Promise<GalleryImage[]> {
  const live = await fromCloudinary("eva/ugc-gallery");
  return live.length > 0 ? live : portfolioGallery;
}

/**
 * Admin-managed list of YouTube reel URLs for the /ugc page. Stored as a raw
 * JSON asset in Cloudinary (eva/ugc-reels.json). Falls back to env var.
 */
export async function getUgcReelUrls(): Promise<string[]> {
  try {
    const { readCloudinaryRawText, cloudinaryConfigured } = await import("./cloudinary");
    if (cloudinaryConfigured()) {
      const raw = await readCloudinaryRawText("eva/ugc-reels.json");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed?.urls) && parsed.urls.length > 0) return parsed.urls;
      }
    }
  } catch {
    // fall through to env
  }
  const env = process.env.NEXT_PUBLIC_UGC_REELS ?? process.env.NEXT_PUBLIC_UGC_SHOWREEL_URL ?? "";
  return env.split(",").map((u) => u.trim()).filter(Boolean);
}

/**
 * Vertical UGC videos for the /ugc page. Returns Cloudinary-hosted videos in
 * the eva/ugc folder, newest first. Falls back to an empty array.
 */
export async function getUgcVideos(): Promise<UgcVideo[]> {
  try {
    const { getCloudinaryResources, cloudinaryConfigured, optimizeCloudinaryDeliveryUrl } = await import("./cloudinary");
    if (!cloudinaryConfigured()) return [];
    const resources = await getCloudinaryResources("eva/ugc", "video");
    return resources.map((r) => ({
      src: r.secure_url,
      poster: optimizeCloudinaryDeliveryUrl(r.secure_url.replace(/\.[^./]+$/, ".jpg")),
      title: r.context?.custom?.caption || r.context?.custom?.alt || r.public_id.split("/").pop() || "Untitled",
      category: r.context?.custom?.alt,
      createdAt: r.created_at,
    }));
  } catch {
    return [];
  }
}

// ── Static fallbacks ─────────────────────────────────────────────────────────
// Galleries are Cloudinary-first. When Cloudinary is not configured or a folder
// is empty, these resolve to empty arrays and the UI renders nothing rather than
// third-party stock imagery.

export const portraitsGallery: GalleryImage[] = [];

export const corporateGallery: GalleryImage[] = [];

export const artGallery: GalleryImage[] = [];

export const featuredGallery: GalleryImage[] = [];

// ── Portfolio — curated editorial edit, all genres interleaved ───────────────

export const portfolioGallery: GalleryImage[] = [];

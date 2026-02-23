import type { GalleryImage } from "@/lib/gallery-data";

// ── Types ──────────────────────────────────────────────────────────────────

export type CloudinaryResource = {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  bytes: number;
  created_at: string;
  context?: { custom?: { alt?: string; caption?: string } };
};

// ── Helpers ────────────────────────────────────────────────────────────────

function aspectFromDimensions(
  w: number,
  h: number
): GalleryImage["aspect"] {
  const ratio = w / h;
  if (ratio < 0.85) return "portrait";
  if (ratio > 1.15) return "landscape";
  return "square";
}

function basicAuth() {
  const key = process.env.CLOUDINARY_API_KEY ?? "";
  const secret = process.env.CLOUDINARY_API_SECRET ?? "";
  return "Basic " + Buffer.from(`${key}:${secret}`).toString("base64");
}

export function cloudinaryConfigured() {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

// ── Public API ─────────────────────────────────────────────────────────────

/**
 * Fetch all images in a Cloudinary folder and return as GalleryImage[].
 * Falls back to an empty array if env vars are not set.
 */
export async function getCloudinaryImages(
  folder: string,
  revalidate = 60
): Promise<GalleryImage[]> {
  if (!cloudinaryConfigured()) return [];

  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const url =
    `https://api.cloudinary.com/v1_1/${cloud}/resources/image` +
    `?prefix=${encodeURIComponent(folder + "/")}&type=upload&max_results=200&context=true`;

  let res: Response;
  try {
    res = await fetch(url, {
      headers: { Authorization: basicAuth() },
      next: { revalidate },
    });
  } catch {
    return [];
  }

  if (!res.ok) return [];

  const data = await res.json();
  const resources: CloudinaryResource[] = data.resources ?? [];

  return resources
    .sort((a, b) => a.created_at.localeCompare(b.created_at))
    .map((r) => ({
      src: r.secure_url,
      alt: r.context?.custom?.alt ?? r.public_id.split("/").pop() ?? "",
      aspect: aspectFromDimensions(r.width, r.height),
    }));
}

/**
 * Fetch raw resources (for the admin panel).
 */
export async function getCloudinaryResources(
  folder: string
): Promise<CloudinaryResource[]> {
  if (!cloudinaryConfigured()) return [];

  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const url =
    `https://api.cloudinary.com/v1_1/${cloud}/resources/image` +
    `?prefix=${encodeURIComponent(folder + "/")}&type=upload&max_results=200&context=true`;

  const res = await fetch(url, {
    headers: { Authorization: basicAuth() },
    cache: "no-store",
  });

  if (!res.ok) return [];
  const data = await res.json();
  return (data.resources ?? []) as CloudinaryResource[];
}

/**
 * Delete a single image by public_id.
 */
export async function deleteCloudinaryImage(publicId: string): Promise<boolean> {
  if (!cloudinaryConfigured()) return false;

  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const url = `https://api.cloudinary.com/v1_1/${cloud}/resources/image/upload`;

  const res = await fetch(
    url + `?public_ids%5B%5D=${encodeURIComponent(publicId)}`,
    {
      method: "DELETE",
      headers: { Authorization: basicAuth() },
    }
  );

  return res.ok;
}

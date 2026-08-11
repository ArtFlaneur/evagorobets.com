import type { GalleryImage } from "@/lib/gallery-data";

// ── Types ──────────────────────────────────────────────────────────────────

export type CloudinaryResource = {
  public_id: string;
  secure_url: string;
  resource_type?: "image" | "video";
  width: number;
  height: number;
  bytes: number;
  created_at: string;
  context?: { custom?: { alt?: string; caption?: string; featured_order?: string } };
};

export function optimizeCloudinaryDeliveryUrl(url: string): string {
  if (!url.includes("res.cloudinary.com") || !url.includes("/image/upload/")) return url;
  if (url.includes("/image/upload/f_auto,q_auto/")) return url;
  return url.replace("/image/upload/", "/image/upload/f_auto,q_auto/");
}

function featuredOrderOf(resource: CloudinaryResource): number {
  const raw = resource.context?.custom?.featured_order;
  const parsed = raw ? Number(raw) : Number.NaN;
  return Number.isFinite(parsed) ? parsed : Number.MAX_SAFE_INTEGER;
}

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
      src: optimizeCloudinaryDeliveryUrl(r.secure_url),
      alt: r.context?.custom?.alt ?? r.public_id.split("/").pop() ?? "",
      aspect: aspectFromDimensions(r.width, r.height),
    }));
}

/**
 * Fetch raw resources (for the admin panel).
 */
export async function getCloudinaryResources(
  folder: string,
  resourceType: "image" | "video" | "auto" = "image"
): Promise<CloudinaryResource[]> {
  if (!cloudinaryConfigured()) return [];

  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const types = resourceType === "auto" ? (["image", "video"] as const) : [resourceType];
  const results = await Promise.all(
    types.map(async (type) => {
      const url =
        `https://api.cloudinary.com/v1_1/${cloud}/resources/${type}` +
        `?prefix=${encodeURIComponent(folder + "/")}&type=upload&max_results=200&context=true`;
      const res = await fetch(url, {
        headers: { Authorization: basicAuth() },
        cache: "no-store",
      });
      if (!res.ok) return [];
      const data = await res.json();
      return (data.resources ?? []).map((resource: CloudinaryResource) => ({ ...resource, resource_type: type }));
    })
  );

  return results.flat().sort((a, b) => b.created_at.localeCompare(a.created_at));
}

/**
 * Fetch raw resources by tag (for featured picker).
 *
 * Pass a positive `revalidate` (seconds) to enable ISR caching for public,
 * crawlable pages so they do not hit the Cloudinary API on every request.
 * Omit it (or pass 0) for admin views that must read fresh data.
 */
export async function getCloudinaryByTag(
  tag: string,
  revalidate = 0
): Promise<CloudinaryResource[]> {
  if (!cloudinaryConfigured()) return [];

  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const url =
    `https://api.cloudinary.com/v1_1/${cloud}/resources/image/tags/${encodeURIComponent(tag)}` +
    `?max_results=200&context=true`;

  let res: Response;
  try {
    res = await fetch(url, {
      headers: { Authorization: basicAuth() },
      ...(revalidate > 0
        ? { next: { revalidate } }
        : { cache: "no-store" as const }),
    });
  } catch {
    return [];
  }

  if (!res.ok) return [];
  const data = await res.json();
  return ((data.resources ?? []) as CloudinaryResource[]).sort((a, b) => {
    const byOrder = featuredOrderOf(a) - featuredOrderOf(b);
    if (byOrder !== 0) return byOrder;
    return a.created_at.localeCompare(b.created_at);
  });
}

/**
 * Add or remove a tag on a single image.
 * action: "add" | "remove"
 */
export async function setCloudinaryTag(
  publicId: string,
  tag: string,
  action: "add" | "remove"
): Promise<boolean> {
  if (!cloudinaryConfigured()) return false;

  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const url = `https://api.cloudinary.com/v1_1/${cloud}/image/tags`;

  const body = new URLSearchParams({
    tag,
    command: action,
  });
  body.append("public_ids[]", publicId);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: basicAuth(),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  return res.ok;
}

/**
 * Add or update context fields on a single image.
 */
export async function setCloudinaryContext(
  publicId: string,
  values: Record<string, string>,
  resourceType: "image" | "video" = "image"
): Promise<boolean> {
  if (!cloudinaryConfigured()) return false;

  const entries = Object.entries(values).filter(([, value]) => value.length > 0);
  if (entries.length === 0) return true;

  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const encodedPublicId = encodeURIComponent(publicId);
  const url = `https://api.cloudinary.com/v1_1/${cloud}/resources/${resourceType}/upload/${encodedPublicId}`;

  const context = entries
    .map(([key, value]) => `${key}=${value}`)
    .join("|");

  const body = new URLSearchParams({ context });

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: basicAuth(),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  return res.ok;
}

/**
 * Delete a single image by public_id.
 */
export async function deleteCloudinaryImage(publicId: string): Promise<boolean> {
  return deleteCloudinaryResource(publicId, "image");
}

export async function deleteCloudinaryResource(
  publicId: string,
  resourceType: "image" | "video" = "image"
): Promise<boolean> {
  if (!cloudinaryConfigured()) return false;

  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const url = `https://api.cloudinary.com/v1_1/${cloud}/resources/${resourceType}/upload`;

  const res = await fetch(
    url + `?public_ids%5B%5D=${encodeURIComponent(publicId)}`,
    {
      method: "DELETE",
      headers: { Authorization: basicAuth() },
    }
  );

  return res.ok;
}

// ── Raw JSON store (for small admin-managed lists) ──────────────────────────

async function sha1Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-1", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Upload a small string of text as a raw Cloudinary asset at a fixed public_id.
 * Used to persist admin-managed lists (e.g. UGC reel links) without a database.
 */
export async function saveCloudinaryRawText(publicId: string, text: string): Promise<boolean> {
  if (!cloudinaryConfigured()) return false;

  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY ?? "";
  const apiSecret = process.env.CLOUDINARY_API_SECRET ?? "";
  const timestamp = Math.floor(Date.now() / 1000);

  // Signature is SHA1 of sorted params + api_secret.
  const paramsToSign = `invalidate=true&overwrite=true&public_id=${publicId}&timestamp=${timestamp}`;
  const signature = await sha1Hex(paramsToSign + apiSecret);

  const dataUri = `data:text/plain;base64,${Buffer.from(text, "utf8").toString("base64")}`;

  const form = new URLSearchParams({
    file: dataUri,
    public_id: publicId,
    overwrite: "true",
    invalidate: "true",
    timestamp: String(timestamp),
    api_key: apiKey,
    signature,
  });

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/raw/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
  });

  return res.ok;
}

/**
 * Read back a raw text asset previously saved with saveCloudinaryRawText.
 * Returns null if it does not exist yet.
 */
export async function readCloudinaryRawText(publicId: string): Promise<string | null> {
  if (!cloudinaryConfigured()) return null;

  const cloud = process.env.CLOUDINARY_CLOUD_NAME;

  // Look up the delivery URL via the admin API (cache-busted).
  const infoUrl = `https://api.cloudinary.com/v1_1/${cloud}/resources/raw/upload/${encodeURIComponent(publicId)}`;
  const infoRes = await fetch(infoUrl, {
    headers: { Authorization: basicAuth() },
    cache: "no-store",
  });
  if (!infoRes.ok) return null;

  const info = await infoRes.json();
  const secureUrl: string | undefined = info.secure_url;
  if (!secureUrl) return null;

  const fileRes = await fetch(`${secureUrl}?_=${Date.now()}`, { cache: "no-store" });
  if (!fileRes.ok) return null;
  return await fileRes.text();
}

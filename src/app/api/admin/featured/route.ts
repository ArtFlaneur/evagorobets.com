import { NextRequest, NextResponse } from "next/server";
import { getCloudinaryByTag, setCloudinaryContext, setCloudinaryTag } from "@/lib/cloudinary";

const TAG = "eva_featured";

// GET — returns public_ids currently tagged as featured
export async function GET() {
  const resources = await getCloudinaryByTag(TAG);
  const ids = resources.map((r) => r.public_id);
  return NextResponse.json(ids);
}

// POST — body: { publicId: string, action: "add" | "remove" }
// POST reorder — body: { action: "reorder", orderedIds: string[] }
export async function POST(req: NextRequest) {
  const { publicId, action, orderedIds } = await req.json().catch(() => ({}));

  if (action === "reorder") {
    if (!Array.isArray(orderedIds)) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }
    const ids = orderedIds.filter((id): id is string => typeof id === "string" && id.length > 0);
    const results = await Promise.all(
      ids.map((id, index) => setCloudinaryContext(id, { featured_order: String(index + 1) }))
    );
    return NextResponse.json({ ok: results.every(Boolean) });
  }

  if (!publicId || (action !== "add" && action !== "remove")) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const ok = await setCloudinaryTag(publicId, TAG, action);

  if (ok && action === "add") {
    const featured = await getCloudinaryByTag(TAG);
    const maxOrder = featured.reduce((max, image) => {
      const value = Number(image.context?.custom?.featured_order ?? "");
      return Number.isFinite(value) ? Math.max(max, value) : max;
    }, 0);
    await setCloudinaryContext(publicId, { featured_order: String(maxOrder + 1) });
  }

  return NextResponse.json({ ok });
}

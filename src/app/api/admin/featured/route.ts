import { NextRequest, NextResponse } from "next/server";
import { getCloudinaryByTag, setCloudinaryTag } from "@/lib/cloudinary";

const TAG = "eva_featured";

// GET — returns public_ids currently tagged as featured
export async function GET() {
  const resources = await getCloudinaryByTag(TAG);
  const ids = resources.map((r) => r.public_id);
  return NextResponse.json(ids);
}

// POST — body: { publicId: string, action: "add" | "remove" }
export async function POST(req: NextRequest) {
  const { publicId, action } = await req.json().catch(() => ({}));
  if (!publicId || (action !== "add" && action !== "remove")) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const ok = await setCloudinaryTag(publicId, TAG, action);
  return NextResponse.json({ ok });
}

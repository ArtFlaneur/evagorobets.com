import { NextRequest, NextResponse } from "next/server";
import {
  getCloudinaryResources,
  deleteCloudinaryImage,
} from "@/lib/cloudinary";

// GET /api/admin/gallery?folder=eva/portraits
export async function GET(req: NextRequest) {
  const folder = req.nextUrl.searchParams.get("folder") ?? "eva";
  const resources = await getCloudinaryResources(folder);
  return NextResponse.json(resources);
}

// DELETE /api/admin/gallery  body: { publicId: "eva/portraits/img123" }
export async function DELETE(req: NextRequest) {
  const { publicId } = await req.json().catch(() => ({ publicId: "" }));
  if (!publicId) {
    return NextResponse.json({ error: "Missing publicId" }, { status: 400 });
  }
  const ok = await deleteCloudinaryImage(publicId);
  return NextResponse.json({ ok });
}

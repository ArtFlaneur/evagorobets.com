import { NextRequest, NextResponse } from "next/server";
import {
  getCloudinaryResources,
  deleteCloudinaryResource,
} from "@/lib/cloudinary";

// GET /api/admin/gallery?folder=eva/portraits&type=image
export async function GET(req: NextRequest) {
  const folder = req.nextUrl.searchParams.get("folder") ?? "eva";
  const typeParam = req.nextUrl.searchParams.get("type");
  const resourceType = typeParam === "video" ? "video" : typeParam === "auto" ? "auto" : "image";
  const resources = await getCloudinaryResources(folder, resourceType);
  return NextResponse.json(resources);
}

// DELETE /api/admin/gallery  body: { publicId: "eva/portraits/img123", type?: "image" | "video" }
export async function DELETE(req: NextRequest) {
  const { publicId, type } = await req.json().catch(() => ({ publicId: "" }));
  if (!publicId) {
    return NextResponse.json({ error: "Missing publicId" }, { status: 400 });
  }
  const resourceType = type === "video" ? "video" : "image";
  const ok = await deleteCloudinaryResource(publicId, resourceType);
  return NextResponse.json({ ok });
}

import { NextRequest, NextResponse } from "next/server";
import { readCloudinaryRawText, saveCloudinaryRawText } from "@/lib/cloudinary";

const STORE_ID = "eva/ugc-reels.json";

// GET — returns the stored list of YouTube reel URLs
export async function GET() {
  const raw = await readCloudinaryRawText(STORE_ID);
  if (!raw) return NextResponse.json({ urls: [] });
  try {
    const parsed = JSON.parse(raw);
    const urls = Array.isArray(parsed?.urls) ? parsed.urls : [];
    return NextResponse.json({ urls });
  } catch {
    return NextResponse.json({ urls: [] });
  }
}

// POST — body: { urls: string[] } — replaces the whole list
export async function POST(req: NextRequest) {
  const { urls } = await req.json().catch(() => ({ urls: null }));
  if (!Array.isArray(urls)) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const clean = urls
    .filter((u): u is string => typeof u === "string")
    .map((u) => u.trim())
    .filter((u) => u.length > 0);

  const ok = await saveCloudinaryRawText(STORE_ID, JSON.stringify({ urls: clean }));
  return NextResponse.json({ ok, urls: clean });
}

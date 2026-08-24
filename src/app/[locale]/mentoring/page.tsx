import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MentoringPage } from "@/components/MentoringPage";
import { getAboutPhotoSrc } from "@/lib/gallery-data";

const title = "International Photography Practice — Mentoring for photographers working with B2B and B2G clients";
const description = "A practical mentoring programme for photographers building an international corporate, cultural and institutional practice.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["photography mentoring", "B2B photographer", "B2G photographer", "international photography practice", "corporate photography business"],
  alternates: {
    canonical: "https://evagorobets.com/en/mentoring",
    languages: { ru: "https://evagorobets.com/mentoring", en: "https://evagorobets.com/en/mentoring" },
  },
  openGraph: { title, description, url: "https://evagorobets.com/en/mentoring", locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default async function MentoringEnglishPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ sent?: string; error?: string }> }) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  const query = await searchParams;
  const status = query.sent === "1" ? "sent" : query.error === "1" ? "error" : undefined;
  const aboutPhotoSrc = await getAboutPhotoSrc();
  return <MentoringPage language="en" status={status} aboutPhotoSrc={aboutPhotoSrc} />;
}

import type { Metadata } from "next";

import { MentoringPage } from "@/components/MentoringPage";
import { getAboutPhotoSrc } from "@/lib/gallery-data";

const title = "International Photography Practice — менторинг для фотографов про B2B и B2G";
const description = "Практическая программа для фотографов, которые выходят на международный рынок. Система для работы с корпоративными, культурными и институциональными заказчиками.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["менторинг для фотографов", "B2B фотография", "B2G фотография", "международный рынок для фотографов", "фотограф корпоративные клиенты"],
  alternates: {
    canonical: "https://evagorobets.com/mentoring",
    languages: { ru: "https://evagorobets.com/mentoring", en: "https://evagorobets.com/en/mentoring" },
  },
  openGraph: { title, description, url: "https://evagorobets.com/mentoring", locale: "ru_RU", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default async function MentoringRussianPage({ searchParams }: { searchParams: Promise<{ sent?: string; error?: string }> }) {
  const query = await searchParams;
  const status = query.sent === "1" ? "sent" : query.error === "1" ? "error" : undefined;
  const aboutPhotoSrc = await getAboutPhotoSrc();
  return <MentoringPage language="ru" status={status} aboutPhotoSrc={aboutPhotoSrc} />;
}

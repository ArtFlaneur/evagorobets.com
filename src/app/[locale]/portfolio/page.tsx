import Link from "next/link";

import { EditorialGallery } from "@/components/EditorialGallery";
import { getPortfolioGallery } from "@/lib/gallery-data";

type PageProps = { params: Promise<{ locale: string }> };

const content = {
  en: {
    eyebrow: "Portfolio",
    h1: "Selected Work",
    sub: "A curated edit spanning business portraiture, corporate events and art photography — Tokyo, Melbourne and international commissions.",
    ctaH2: "Discuss a project.",
    ctaBtn: "Get in touch",
  },
  jp: {
    eyebrow: "ポートフォリオ",
    h1: "セレクテッドワーク",
    sub: "ビジネスポートレート、コーポレートイベント、アート写真にわたるキュレーテッド作品集 — 東京・メルボルン・海外での受注作品。",
    ctaH2: "プロジェクトについて相談する。",
    ctaBtn: "お問い合わせ",
  },
  ru: {
    eyebrow: "Портфолио",
    h1: "Избранные работы",
    sub: "Отобранные работы по бизнес-портретам, корпоративным мероприятиям и арт-фотографии — Токио, Мельбурн и международные заказы.",
    ctaH2: "Обсудить проект.",
    ctaBtn: "Написать",
  },
} as const;

type Locale = keyof typeof content;

export default async function PortfolioPage({ params }: PageProps) {
  const { locale } = await params;
  const t = content[(locale as Locale) in content ? (locale as Locale) : "en"];
  const portfolioGallery = await getPortfolioGallery();

  return (
    <>
      <section className="section pt-20 md:pt-32">
        <p className="label mb-6">{t.eyebrow}</p>
        <h1
          className="max-w-3xl text-[clamp(3rem,7vw,6rem)] leading-[0.95]"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
        >
          {t.h1}
        </h1>
        <p className="mt-6 max-w-lg text-sm text-black/55 leading-relaxed">{t.sub}</p>
      </section>

      <section className="section pt-0">
        <EditorialGallery items={portfolioGallery} />
      </section>

      <section className="section border-t border-black/[0.07] !py-6">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <h2
            className="text-[clamp(2rem,4.5vw,4rem)] leading-[0.95]"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
          >
            {t.ctaH2}
          </h2>
          <Link href={`/${locale}/contact-booking`} className="btn">{t.ctaBtn}</Link>
        </div>
      </section>
    </>
  );
}



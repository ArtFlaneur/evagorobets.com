import type { Metadata } from "next";
import Link from "next/link";

import { EditorialGallery } from "@/components/EditorialGallery";
import { getPortfolioGallery } from "@/lib/gallery-data";

type PageProps = { params: Promise<{ locale: string }> };
const BASE_URL = "https://evagorobets.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = "/portfolio";

  return {
    title: "Portfolio — Corporate, Portrait & Art Photography | Eva Gorobets",
    description:
      "Selected portfolio across business portraiture, corporate events and art photography in Tokyo, Melbourne and international commissions.",
    openGraph: {
      title: "Portfolio — Eva Gorobets",
      description:
        "A curated portfolio spanning portraits, corporate events and art-world photography across Tokyo, Melbourne and worldwide.",
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}${path}`,
      languages: {
        en: `${BASE_URL}/en${path}`,
        ja: `${BASE_URL}/jp${path}`,
        ru: `${BASE_URL}/ru${path}`,
      },
    },
  };
}

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

      <section className="section border-t border-black/[0.07] py-6!">
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



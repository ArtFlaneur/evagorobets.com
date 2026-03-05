import type { Metadata } from "next";
import Link from "next/link";

import { EditorialGallery } from "@/components/EditorialGallery";
import { getPortfolioGallery } from "@/lib/gallery-data";

type PageProps = { params: Promise<{ locale: string }> };
const BASE_URL = "https://evagorobets.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = "/portfolio";

  const seo = {
    en: {
      title: "Portfolio — Corporate, Portrait & Art Photography Tokyo & Melbourne | Eva Gorobets",
      description:
        "Selected portfolio across business portraiture, corporate events and art photography in Tokyo, Melbourne and international commissions.",
      ogTitle: "Portfolio — Eva Gorobets Photography",
      ogDescription:
        "A curated portfolio spanning executive portraits, corporate events and art-world photography across Tokyo, Melbourne and worldwide.",
    },
    jp: {
      title: "ポートフォリオ — 東京・メルボルン コーポレート/ポートレート/アート撮影 | Eva Gorobets",
      description:
        "東京・メルボルン・海外でのビジネスポートレート、コーポレートイベント、アート写真にわたるキュレーテッド作品集。",
      ogTitle: "ポートフォリオ — Eva Gorobets Photography",
      ogDescription:
        "エグゼクティブポートレート、コーポレートイベント、アート世界の写真作品集。東京・メルボルン・国際案件。",
    },
    ru: {
      title: "Портфолио — корпоративная, портретная и арт-фотография, Токио и Мельбурн | Eva Gorobets",
      description:
        "Избранные работы по бизнес-портретам, корпоративным мероприятиям и арт-фотографии — Токио, Мельбурн и международные заказы.",
      ogTitle: "Портфолио — Eva Gorobets Photography",
      ogDescription:
        "Отобранные работы по портретам руководителей, корпоративным событиям и арт-фотографии в Токио, Мельбурне и по всему миру.",
    },
  } as const;

  const t = seo[(locale as keyof typeof seo) in seo ? (locale as keyof typeof seo) : "en"];

  return {
    title: t.title,
    description: t.description,
    openGraph: {
      title: t.ogTitle,
      description: t.ogDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: t.ogTitle,
      description: t.ogDescription,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}${path}`,
      languages: {
        en: `${BASE_URL}/en${path}`,
        ja: `${BASE_URL}/jp${path}`,
        ru: `${BASE_URL}/ru${path}`,
        "x-default": `${BASE_URL}/en${path}`,
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



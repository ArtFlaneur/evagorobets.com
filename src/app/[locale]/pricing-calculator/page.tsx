import type { Metadata } from "next";
import Script from "next/script";

import { PricingCalculator } from "@/components/PricingCalculator";
import { CalculatorService } from "@/lib/pricing-calculator";
import { buildWebApplicationSchema } from "@/lib/schema";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ service?: string; sent?: string; error?: string }>;
};

const BASE_URL = "https://evagorobets.com";

function pickInitialService(value?: string): CalculatorService | undefined {
  if (
    value === "portrait" ||
    value === "corporate-event" ||
    value === "gallery-event" ||
    value === "artwork-documentation"
  ) {
    return value;
  }

  return undefined;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = "/pricing-calculator";
  const seo = {
    en: {
      title: "Photography Pricing Calculator Tokyo & Melbourne | Eva Gorobets",
      description:
        "See photography pricing ranges instantly for business portraits, corporate events, gallery events and artwork documentation in Japan and Australia, then send a brief in English or Japanese.",
    },
    jp: {
      title: "撮影費見積もり計算 東京・メルボルン | Eva Gorobets",
      description:
        "日本・オーストラリア向けに、ビジネスポートレート、法人イベント、ギャラリーイベント、作品撮影の概算価格レンジをその場で確認し、日本語または英語でそのまま相談できます。",
    },
  } as const;

  const active = seo[(locale as keyof typeof seo) in seo ? (locale as keyof typeof seo) : "en"];

  return {
    title: active.title,
    description: active.description,
    openGraph: {
      title: active.title,
      description: active.description,
    },
    twitter: {
      card: "summary_large_image",
      title: active.title,
      description: active.description,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}${path}`,
      languages: {
        en: `${BASE_URL}/en${path}`,
        ja: `${BASE_URL}/jp${path}`,
        "x-default": `${BASE_URL}/en${path}`,
      },
    },
  };
}

export default async function PricingCalculatorPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const query = (await searchParams) ?? {};
  const initialService = pickInitialService(query.service);
  const initialStatus = query.sent === "1" ? "sent" : query.error === "1" ? "error" : null;
  const typedLocale = locale === "jp" ? "jp" : "en";
  const calculatorSchema = buildWebApplicationSchema({
    name:
      typedLocale === "jp"
        ? "撮影費見積もり計算"
        : "Photography Pricing Calculator",
    description:
      typedLocale === "jp"
        ? "日本とオーストラリア向けに、ポートレート、法人イベント、ギャラリー案件の概算価格レンジをその場で確認できる見積もり計算。"
        : "Instant estimate calculator for portrait, corporate event and gallery photography pricing in Japan and Australia.",
    path: "/pricing-calculator",
    locale: typedLocale,
    featureList:
      typedLocale === "jp"
        ? ["価格レンジをその場で表示", "日本語と英語に対応", "日本・オーストラリア料金に対応", "見積もりからそのまま問い合わせ可能"]
        : ["Shows estimate ranges instantly", "Available in English and Japanese", "Supports Japan and Australia pricing", "Connects estimate to enquiry form"],
  });

  return (
    <>
      <PricingCalculator locale={typedLocale} initialService={initialService} initialStatus={initialStatus} />
      <Script id="pricing-calculator-schema" type="application/ld+json">
        {JSON.stringify(calculatorSchema)}
      </Script>
    </>
  );
}
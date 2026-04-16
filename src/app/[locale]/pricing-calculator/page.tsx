import type { Metadata } from "next";

import { PricingCalculator } from "@/components/PricingCalculator";
import { CalculatorService } from "@/lib/pricing-calculator";

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
        "Estimate photography pricing ranges for business portraits, corporate events, gallery events and artwork documentation in Japan and Australia.",
    },
    jp: {
      title: "撮影費見積もり計算 東京・メルボルン | Eva Gorobets",
      description:
        "日本・オーストラリア向けに、ビジネスポートレート、法人イベント、ギャラリーイベント、作品撮影の概算レンジを確認できます。",
    },
  } as const;

  const active = seo[(locale as keyof typeof seo) in seo ? (locale as keyof typeof seo) : "en"];

  return {
    title: active.title,
    description: active.description,
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

  return <PricingCalculator locale={locale === "jp" ? "jp" : "en"} initialService={initialService} initialStatus={initialStatus} />;
}
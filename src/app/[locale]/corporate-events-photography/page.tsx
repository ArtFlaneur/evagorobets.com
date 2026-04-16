import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { CurrencyOptions } from "@/components/CurrencyOptions";
import { EditorialGallery } from "@/components/EditorialGallery";
import { getCorporateGallery } from "@/lib/gallery-data";
import { buildServiceSchema } from "@/lib/schema";

type PageProps = { params: Promise<{ locale: string }> };

const BASE_URL = "https://evagorobets.com";

const eventsContent = {
  en: {
    eyebrow: "Corporate Events",
    h1: "Corporate Events Photography in Tokyo & Melbourne",
    p1: "Structured, discreet coverage for conferences, internal events, client activations, board meetings and product launches. I work from a pre-agreed timeline and shot list so you receive everything you need — without directing on the day.",
    p2: "Coverage delivered in separate sets for internal use, PR and social media. Fast turnaround as standard. Available for single-day and multi-day events in Tokyo, Melbourne and across Japan.",
    ctaBtn: "Enquire about Event Coverage",
    ctaBtnPdf: "Download Events PDF Portfolio",
    columns: [
      {
        title: "What I cover",
        items: ["Conferences & forums", "Internal team events", "Client activations", "Board meetings", "Product launches", "Annual general meetings"],
      },
      {
        title: "Process",
        items: ["Pre-event briefing call", "Timeline and shot list", "Discreet on-site coverage", "Same-day highlight option", "Post-event gallery delivery"],
      },
      {
        title: "Delivery sets",
        items: ["Internal online gallery", "Curated PR selection", "Cropped social media pack", "High-resolution print files", "Captioned press set on request"],
      },
    ],
    quote: "We worked with Eva on a large-scale public event. I especially value her high level of professionalism and disciplined execution on site.",
    by: "Sayat Boranbekov, President, PetroMining Association",
    pricingLabel: "Coverage Options",
    pricingLabels: ["Half-day coverage (up to 4 hours)", "Full-day coverage (up to 8 hours)", "Multi-day rate (per day)"],
    pricingNote: "Includes pre-event briefing, on-site coverage and structured delivery sets.",
    ctaH2: "Planning an event?",
    calcBtn: "Estimate with Calculator",
    ctaBtn2: "Request Event Coverage",
  },
  jp: {
    eyebrow: "コーポレートイベント",
    h1: "東京・メルボルンのコーポレートイベント撮影",
    p1: "会議、社内イベント、クライアントアクティベーション、取締役会、製品発表に向けた構造的で控えめな撮影。事前に合意したタイムラインとショットリストに沿って進めるため、当日の細かな指示なしで必要な素材を揃えられます。",
    p2: "納品は社内用、PR用、ソーシャルメディア用に分けて整理。迅速納品が標準です。東京、メルボルン、日本各地での単日・複数日イベントに対応しています。",
    ctaBtn: "イベント撮影のお問い合わせ",
    ctaBtnPdf: "イベントPDFポートフォリオをダウンロード",
    columns: [
      {
        title: "対応イベント",
        items: ["会議＆フォーラム", "社内チームイベント", "クライアントアクティベーション", "取締役会議", "製品発表", "株主総会"],
      },
      {
        title: "撮影の流れ",
        items: ["事前ブリーフィングコール", "タイムラインとショットリスト", "現地での目立たない撮影", "当日ハイライトオプション", "撮影後ギャラリー納品"],
      },
      {
        title: "納品セット",
        items: ["社内オンラインギャラリー", "キュレーションされたPR用セレクション", "ソーシャルメディアパック（クロップ済み）", "高解像度印刷ファイル", "リクエスト対応キャプション付きプレスセット"],
      },
    ],
    quote: "私たちは大規模な公的イベントでエヴァとご一緒しました。特に高いプロ意識と、現場での確かな規律ある対応を高く評価しています。",
    by: "Sayat Boranbekov（PetroMining Association 会長）",
    pricingLabel: "撮影プラン",
    pricingLabels: ["ハーフデイ撮影（4時間まで）", "フルデイ撮影（8時間まで）", "複数日料金（1日あたり）"],
    pricingNote: "事前ブリーフィング、現地撮影、構造化された納品セットを含みます。",
    ctaH2: "イベントをご予定ですか？",
    calcBtn: "見積もり計算を使う",
    ctaBtn2: "イベント撮影のお問い合わせ",
  },
} as const;

type Locale = keyof typeof eventsContent;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = "/corporate-events-photography";
  const seo = {
    en: {
      title: "Corporate Event Photographer Tokyo and Melbourne — Conferences, Forums & Internal Events | Eva Gorobets",
      description:
        "Structured corporate event photography in Tokyo and Melbourne. Conferences, AGMs, product launches, client receptions. Visible coverage pricing and an instant calculator for planning budgets. PR and social media delivery sets.",
      ogTitle: "Corporate Event Photographer Tokyo and Melbourne",
      ogDescription:
        "Coverage for corporate conferences, forums and internal events in Tokyo and Melbourne. Visible pricing, instant calculator, structured process, fast delivery.",
    },
    jp: {
      title: "東京・メルボルン コーポレートイベント撮影 — 会議・フォーラム・社内イベント | Eva Gorobets",
      description:
        "東京・メルボルンの法人イベント撮影。会議、株主総会、製品発表、レセプションまで対応。料金の目安を表示し、見積もり計算で予算感をすぐ確認可能。PR・SNS向け納品セットを提供。",
      ogTitle: "東京・メルボルン コーポレートイベント撮影",
      ogDescription:
        "東京・メルボルンで会議・フォーラム・社内イベントを構造化プロセスで撮影。価格表示あり、見積もり計算あり、迅速納品、3言語対応。",
    },
  } as const;
  const s = seo[(locale as keyof typeof seo) in seo ? (locale as keyof typeof seo) : "en"];
  const keywordSets: Record<string, string[]> = {
    en: ["corporate event photographer Tokyo", "conference photographer Tokyo", "corporate event photographer Melbourne", "conference photographer Melbourne", "event photographer Tokyo", "AGM photographer Tokyo", "product launch photographer Tokyo", "corporate photographer Japan", "event photographer Melbourne CBD"],
    jp: ["法人イベント 撮影 東京", "コーポレートイベント カメラマン 東京", "カンファレンス 撮影 東京", "イベント フォトグラファー 東京", "メルボルン 法人イベント 撮影"],
  };

  return {
    title: s.title,
    description: s.description,
    keywords: keywordSets[locale] ?? keywordSets.en,
    openGraph: {
      title: s.ogTitle,
      description: s.ogDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: s.ogTitle,
      description: s.ogDescription,
    },
    alternates: {
      canonical: `${BASE_URL}/${locale}${path}`,
      languages: {
        en: `${BASE_URL}/en${path}`,
        ja: `${BASE_URL}/jp${path}`,
        "x-default": `${BASE_URL}/en${path}`,
      },
    },
    other: {
      "geo.region": "JP-13",
      "geo.placename": "Tokyo",
      "geo.position": "35.6762;139.6503",
      ICBM: "35.6762, 139.6503",
    },
  };
}

const eventsFaqPerLocale = {
  en: [
    { q: "Do you cover corporate events in Melbourne?", a: "Yes — Eva is available for corporate event photography in Melbourne and Sydney, as well as Tokyo and across Japan." },
    { q: "What types of corporate events do you cover in Tokyo and Melbourne?", a: "Conferences, forums, board meetings, all-hands events, product launches, client activations and annual general meetings." },
    { q: "How are files delivered after a corporate event?", a: "Delivery sets are structured separately: an internal online gallery, a curated PR selection, a cropped social-media pack, and high-resolution print files. A captioned press set is available on request." },
    { q: "How quickly can you deliver images after a corporate event in Tokyo?", a: "A same-day highlight option is available. The full post-event gallery is delivered within a standard fast-turnaround schedule." },
    { q: "Do you handle multi-day events in Tokyo and Japan?", a: "Yes — multi-day coverage is available in Tokyo, across Japan, and in Melbourne. A per-day rate applies." },
  ],
  jp: [
    { q: "メルボルンでのコーポレートイベント撮影は可能ですか？", a: "はい — 東京および日本全国に加え、メルボルン・シドニーでもコーポレートイベント撮影に対応しています。" },
    { q: "東京・メルボルンで対応できるイベントの種類は？", a: "会議、フォーラム、取締役会、全体ミーティング、製品発表、クライアントアクティベーション、株主総会などに対応しています。" },
    { q: "イベント後のファイル納品はどのように行われますか？", a: "社内オンラインギャラリー、PR用キュレーションセット、ソーシャルメディアパック、高解像度印刷ファイルを分けて納品します。キャプション付きプレスセットはリクエスト対応です。" },
  ],
};

function buildEventsFAQSchema(items: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export default async function CorporateEventsPage({ params }: PageProps) {
  const { locale } = await params;
  const corporateGallery = await getCorporateGallery();
  const t = eventsContent[(locale as Locale) in eventsContent ? (locale as Locale) : "en"];
  const typedLocale = locale === "jp" ? "jp" : "en";

  const jpyPrices = ["from ¥125,000", "from ¥215,000", "from ¥200,000"];
  const audPrices = ["from A$1,520", "from A$2,630", "from A$2,370"];
  const serviceSchema = buildServiceSchema({
    name:
      typedLocale === "jp"
        ? "コーポレートイベント撮影"
        : "Corporate Event Photography",
    description:
      typedLocale === "jp"
        ? "東京とメルボルンでの会議、フォーラム、ローンチ、社内イベント撮影。料金目安を表示し、見積もり計算にも対応。"
        : "Corporate event coverage for conferences, launches and internal events in Tokyo and Melbourne with visible rates and an instant calculator.",
    path: "/corporate-events-photography",
    locale: typedLocale,
    serviceType: ["Conference photography", "Corporate event photography", "Forum coverage"],
    areaServed: ["Tokyo", "Melbourne", "Japan", "Australia"],
    offers: [
      {
        name: typedLocale === "jp" ? "ハーフデイ撮影" : "Half-day coverage",
        price: typedLocale === "jp" ? 125000 : 1520,
        priceCurrency: typedLocale === "jp" ? "JPY" : "AUD",
      },
      {
        name: typedLocale === "jp" ? "フルデイ撮影" : "Full-day coverage",
        price: typedLocale === "jp" ? 215000 : 2630,
        priceCurrency: typedLocale === "jp" ? "JPY" : "AUD",
      },
      {
        name: typedLocale === "jp" ? "複数日イベント" : "Multi-day coverage",
        price: typedLocale === "jp" ? 200000 : 2370,
        priceCurrency: typedLocale === "jp" ? "JPY" : "AUD",
      },
    ],
  });

  return (
    <>
      <section className="section pt-32">
        <p className="label mb-6">{t.eyebrow}</p>
        <h1 className="max-w-3xl text-[clamp(3rem,7vw,6rem)] leading-[0.95]" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>
          {t.h1}
        </h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <p className="text-sm text-black/60 leading-relaxed">{t.p1}</p>
          <p className="text-sm text-black/60 leading-relaxed">{t.p2}</p>
        </div>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href={`/${locale}/pricing-calculator?service=corporate-event`} className="btn-ghost">{t.calcBtn}</Link>
          <Link href={`/${locale}/contact-booking`} className="btn">{t.ctaBtn}</Link>
          <a href="/commission-portfolio-events.pdf" download className="btn-ghost">{t.ctaBtnPdf}</a>
        </div>
      </section>

      <section className="section pt-0">
        <EditorialGallery items={corporateGallery} />
      </section>

      <section className="section grid gap-16 border-t border-black/[0.07] md:grid-cols-3">
        {t.columns.map(({ title, items }) => (
          <div key={title}>
            <p className="label mb-8">{title}</p>
            <ul>
              {items.map((item) => (
                <li key={item} className="border-t border-black/[0.07] py-4 text-sm text-black/65">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="section border-t border-black/[0.07]">
        <blockquote className="max-w-2xl">
          <p className="text-[clamp(1.4rem,3vw,2.4rem)] leading-[1.2] text-black/80" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontStyle: "italic" }}>
            {t.quote}
          </p>
          <footer className="mt-5"><span className="label">{t.by}</span></footer>
        </blockquote>
      </section>

      <section className="section border-t border-black/[0.07]">
        <CurrencyOptions
          sectionLabel={t.pricingLabel}
          packagesJPY={t.pricingLabels.map((label, i) => ({ label, price: jpyPrices[i] }))}
          packagesAUD={t.pricingLabels.map((label, i) => ({ label, price: audPrices[i] }))}
          footerNote={t.pricingNote}
        />
      </section>

      <section className="section border-t border-black/[0.07] py-6!">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="text-[clamp(2rem,4.5vw,4rem)] leading-[0.95]" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>
            {t.ctaH2}
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={`/${locale}/pricing-calculator?service=corporate-event`} className="btn-ghost">{t.calcBtn}</Link>
            <Link href={`/${locale}/contact-booking`} className="btn">{t.ctaBtn2}</Link>
          </div>
        </div>
      </section>

      <Script id="events-faq-schema" type="application/ld+json">
        {JSON.stringify(buildEventsFAQSchema(eventsFaqPerLocale[locale as keyof typeof eventsFaqPerLocale] ?? eventsFaqPerLocale.en))}
      </Script>
      <Script id="events-service-schema" type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </Script>
    </>
  );
}

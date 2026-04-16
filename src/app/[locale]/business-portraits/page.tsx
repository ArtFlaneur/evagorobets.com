import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { CurrencyOptions } from "@/components/CurrencyOptions";
import { EditorialGallery } from "@/components/EditorialGallery";
import { getPortraitsGallery } from "@/lib/gallery-data";
import { buildServiceSchema } from "@/lib/schema";

type PageProps = { params: Promise<{ locale: string }> };

const BASE_URL = "https://evagorobets.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = "/business-portraits";
  const seo = {
    en: {
      title: "Executive Headshots & Business Portraits Tokyo & Melbourne | Eva Gorobets",
      description:
        "Professional executive headshots and leadership portraits in Tokyo and Melbourne. Studio and on-location. Visible starting prices and an instant calculator for quick budget planning. Used for websites, LinkedIn, annual reports and press.",
      ogTitle: "Executive Headshots & Business Portraits Tokyo & Melbourne",
      ogDescription:
        "Studio and on-location portrait sessions for executives, founders and leadership teams in Tokyo and Melbourne. Visible pricing, instant calculator, fast delivery, trilingual communication.",
    },
    jp: {
      title: "東京・メルボルン ビジネスポートレート & エグゼクティブヘッドショット | Eva Gorobets",
      description:
        "東京・メルボルンでのエグゼクティブヘッドショットとリーダーシップポートレート。スタジオ・ロケーション対応。開始価格を表示し、見積もり計算で予算感をすぐ確認可能。企業サイト、LinkedIn、年次報告書、プレス用途に最適。",
      ogTitle: "東京・メルボルン ビジネスポートレート & エグゼクティブヘッドショット",
      ogDescription:
        "東京・メルボルンの経営層・創業者・リーダー向けスタジオ/ロケーション撮影。価格表示あり、見積もり計算あり、迅速納品、3言語コミュニケーション。",
    },
  } as const;
  const t = seo[(locale as keyof typeof seo) in seo ? (locale as keyof typeof seo) : "en"];
  const keywordSets: Record<string, string[]> = {
    en: [
      "executive headshots Tokyo",
      "business portrait photographer Tokyo",
      "executive headshots Melbourne",
      "business portrait photographer Melbourne",
      "LinkedIn headshots Tokyo",
      "LinkedIn headshots Melbourne",
      "professional headshots Marunouchi",
      "executive portraits Tokyo",
      "corporate portraits Melbourne",
      "headshot photographer Melbourne CBD",
    ],
    jp: [
      "エグゼクティブヘッドショット 東京",
      "ビジネスポートレート 東京",
      "エグゼクティブポートレート 東京",
      "ビジネスポートレート メルボルン",
      "LinkedIn 写真 東京",
      "丸の内 ヘッドショット",
      "法人 ポートレート 東京",
    ],
  };

  return {
    title: t.title,
    description: t.description,
    keywords: keywordSets[locale] ?? keywordSets.en,
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

const content = {
  en: {
    eyebrow: "Business Portraits",
    h1: "Business Portraits & Executive Headshots",
    p1: "Professional portraits for executives, founders, consultants, artists and art managers who need a premium, credible visual identity. Sessions are designed around brand positioning, communication goals and practical usage across websites, media kits and speaking profiles.",
    p2: "Based in Tokyo and available in Melbourne and internationally. Briefing and communication available in English, Japanese and Russian. Final retouched images delivered within three to five business days.",
    sessionTypesLabel: "Session Types",
    sessionTypes: [
      { title: "Studio", text: "Controlled environment with seamless or textured backdrop. Clean, timeless results suitable for any editorial use." },
      { title: "On-location", text: "Office, co-working space, hotel or urban environment. The background reinforces the context of your work." },
      { title: "Creative Editorial", text: "Art-directed portraits for artists, curators and creative professionals. More latitude, more character." },
    ],
    processLabel: "Process",
    process: [
      ["01", "Brief", "We discuss your goals, intended use and visual direction — in EN, JP or RU."],
      ["02", "Moodboard", "I share two or three reference images as a starting point before we meet."],
      ["03", "Session", "60–90 minutes. Guided, relaxed, efficient. You do not need to know how to pose."],
      ["04", "Selection", "You receive a proof gallery and choose your favourite frames."],
      ["05", "Delivery", "Retouched web and print-ready files. Delivered within 3–5 business days."],
    ],
    testimonial: "Eva sees what others miss and captures the true essence of a person. I have commissioned her more than once and have always been very satisfied with the result.",
    testimonialBy: "Mikhail Yermolayev, Managing Partner, GAB Consulting",
    ctaH2: "Let’s create your portrait.",
    calcBtn: "Estimate with Calculator",
    ctaBtn: "Enquire for a Business Portrait",
  },
  jp: {
    eyebrow: "ビジネスポートレート",
    h1: "東京ビジネスポートレート & エグゼクティブヘッドショット",
    p1: "エグゼクティブ、創業者、コンサルタント、アーティスト、アートマネージャーなど、上質で信頼感のあるビジュアルアイデンティティを必要とする方のためのポートレート撮影。セッションはブランドポジショニング、コミュニケーション目標、ウェブサイト・メディアキット・登壇者プロフィールへの実用的な活用を中心に設計されます。",
    p2: "東京在住、メルボルンおよび海外への出張対応可。英語・日本語・ロシア語でのブリーフおよびコミュニケーションに対応。最終レタッチ済み画像は3〜5営業日以内に納品。",
    sessionTypesLabel: "セッションの種類",
    sessionTypes: [
      { title: "スタジオ", text: "シームレスまたはテクスチャー背景を使用したコントロールされた環境。あらゆる編集用途に適した、クリーンで時代を超えた仕上がり。" },
      { title: "ロケーション", text: "オフィス、コワーキングスペース、ホテル、都市環境など。背景があなたの仕事のコンテキストを強化します。" },
      { title: "クリエイティブエディトリアル", text: "アーティスト、キュレーター、クリエイティブプロフェッショナル向けのアートディレクテッドポートレート。より自由で個性的な表現。" },
    ],
    processLabel: "撮影の流れ",
    process: [
      ["01", "ブリーフ", "目的・用途・ビジュアル方向性について英語・日本語・ロシア語でお話しします。"],
      ["02", "ムードボード", "事前にリファレンス画像を2〜3点共有します。"],
      ["03", "撮影", "60〜90分。ガイド付きでリラックスした効率的な撮影。ポーズの知識は不要です。"],
      ["04", "セレクション", "プルーフギャラリーをお送りし、お好みのカットをお選びいただきます。"],
      ["05", "納品", "Web用・印刷用レタッチ済みファイル。3〜5営業日以内に納品。"],
    ],
    testimonial: "エヴァは、他の人が見落とす要素を見抜き、人物の本質を引き出して撮影してくれます。私は複数回依頼していますが、毎回とても満足しています。",
    testimonialBy: "Mikhail Yermolayev（GAB Consulting マネージングパートナー）",
    ctaH2: "あなたのポートレートを撮影しましょう。",
    calcBtn: "見積もり計算を使う",
    ctaBtn: "ビジネスポートレートのお問い合わせ",
  },
} as const;

type Locale = keyof typeof content;

const faqPerLocale = {
  en: [
    { q: "Do you offer executive headshots and business portraits in Melbourne?", a: "Yes — Eva is available for business portrait and executive headshot sessions in Melbourne, in addition to her Tokyo base. Sessions can be arranged at a studio, your office, or on location." },
    { q: "How long does a business portrait session take?", a: "A standard session runs 60–90 minutes. The session is guided and structured — you do not need to know how to pose." },
    { q: "Can you communicate in Japanese for a Tokyo portrait session?", a: "Yes — Eva works in English, Japanese and Russian. Your Japanese office manager or team can brief directly." },
    { q: "How quickly are retouched business portrait files delivered?", a: "Retouched web and print-ready files are delivered within 3–5 business days of the session." },
    { q: "Is corporate invoicing available in JPY, AUD or USD?", a: "Yes — invoicing in JPY, AUD and USD is supported. An NDA is available before briefing on request." },
  ],
  jp: [
    { q: "メルボルンでのビジネスポートレートやエグゼクティブヘッドショットは可能ですか？", a: "はい — エヴァは東京を拠点としていますが、メルボルンでのポートレートセッションにも対応しています。スタジオ、オフィス、ロケーションでの撮影が可能です。" },
    { q: "ビジネスポートレートのセッションはどのくらいかかりますか？", a: "標準的なセッションは60〜90分です。ガイド付きで進行しますので、ポーズの知識は不要です。" },
    { q: "東京のポートレートセッションで日本語でのやり取りは可能ですか？", a: "はい — エヴァは英語・日本語・ロシア語でコミュニケーションが取れます。日本語スタッフが直接ブリーフすることも可能です。" },
    { q: "レタッチ済み画像の納品までどのくらいかかりますか？", a: "Web用・印刷用レタッチ済みファイルは、撮影から3〜5営業日以内に納品されます。" },
  ],
};

function buildFAQSchema(items: Array<{ q: string; a: string }>) {
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

export default async function BusinessPortraitsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = content[(locale as Locale) in content ? (locale as Locale) : "en"];
  const portraitsGallery = await getPortraitsGallery();
  const typedLocale = locale === "jp" ? "jp" : "en";
  const serviceSchema = buildServiceSchema({
    name:
      typedLocale === "jp"
        ? "ビジネスポートレートとエグゼクティブヘッドショット"
        : "Business Portraits and Executive Headshots",
    description:
      typedLocale === "jp"
        ? "東京とメルボルンでのエグゼクティブヘッドショット、ビジネスポートレート、LinkedIn用撮影。開始価格を表示し、見積もり計算にも対応。"
        : "Executive headshots, business portraits and LinkedIn photography in Tokyo and Melbourne with visible starting prices and an instant calculator.",
    path: "/business-portraits",
    locale: typedLocale,
    serviceType: ["Executive headshots", "Business portraits", "Leadership portraits"],
    areaServed: ["Tokyo", "Melbourne", "Japan", "Australia"],
    offers: [
      {
        name: typedLocale === "jp" ? "スタジオポートレート" : "Studio portraits",
        price: typedLocale === "jp" ? 95000 : 1100,
        priceCurrency: typedLocale === "jp" ? "JPY" : "AUD",
      },
      {
        name: typedLocale === "jp" ? "ロケーションポートレート" : "On-location portraits",
        price: typedLocale === "jp" ? 68000 : 780,
        priceCurrency: typedLocale === "jp" ? "JPY" : "AUD",
      },
      {
        name: typedLocale === "jp" ? "クリエイティブエディトリアル" : "Creative editorial portraits",
        price: typedLocale === "jp" ? 130000 : 1450,
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
      </section>

      <section className="section pt-0">
        <EditorialGallery items={portraitsGallery} />
      </section>

      <section className="section grid gap-16 border-t border-black/[0.07] md:grid-cols-2">
        <div>
          <p className="label mb-8">{t.sessionTypesLabel}</p>
          <ul>
            {t.sessionTypes.map(({ title, text }) => (
              <li key={title} className="border-t border-black/[0.07] py-6">
                <span className="block text-2xl mb-2" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>{title}</span>
                <span className="text-sm text-black/55 leading-relaxed">{text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-8">{t.processLabel}</p>
          <ol>
            {t.process.map(([n, step, detail]) => (
              <li key={step} className="flex gap-6 border-t border-black/[0.07] py-7">
                <span className="w-12 shrink-0 text-[clamp(2.1rem,4vw,3.2rem)] leading-none text-black/12 select-none" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>
                  {n}
                </span>
                <div>
                  <span className="block text-xl mb-1" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>{step}</span>
                  <span className="text-sm text-black/50 leading-relaxed">{detail}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section border-t border-black/[0.07]">
        <blockquote className="max-w-2xl">
          <p className="text-[clamp(1.4rem,3vw,2.4rem)] leading-[1.2] text-black/80" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontStyle: "italic" }}>
            {t.testimonial}
          </p>
          <footer className="mt-5"><span className="label">{t.testimonialBy}</span></footer>
        </blockquote>
      </section>

      <section className="section border-t border-black/[0.07]">
        <CurrencyOptions />
      </section>

      <section className="section border-t border-black/[0.07] py-6!">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="text-[clamp(2rem,4.5vw,4rem)] leading-[0.95]" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>
            {t.ctaH2}
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={`/${locale}/pricing-calculator?service=portrait`} className="btn-ghost">{t.calcBtn}</Link>
            <Link href={`/${locale}/contact-booking`} className="btn">{t.ctaBtn}</Link>
          </div>
        </div>
      </section>

      <Script id="bp-faq-schema" type="application/ld+json">
        {JSON.stringify(buildFAQSchema(faqPerLocale[locale as keyof typeof faqPerLocale] ?? faqPerLocale.en))}
      </Script>
      <Script id="bp-service-schema" type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </Script>
    </>
  );
}

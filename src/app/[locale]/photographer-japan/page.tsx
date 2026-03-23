import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

type PageProps = { params: Promise<{ locale: string }> };

const BASE_URL = "https://evagorobets.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = "/photographer-japan";
  const seo = {
    en: {
      title: "Corporate, Portrait & Art Photographer in Japan | Eva Gorobets",
      description:
        "Corporate photographer in Japan for executive portraits, business headshots, conferences, corporate events, galleries and exhibitions. Based in Tokyo, available across Japan.",
      ogTitle: "Photographer in Japan — Corporate, Portrait & Art",
      ogDescription:
        "Tokyo-based photographer for business portraits, corporate events and art-world commissions across Japan.",
    },
    jp: {
      title: "日本で活動するコーポレート・ポートレート・アートフォトグラファー | Eva Gorobets",
      description:
        "日本国内でエグゼクティブポートレート、ビジネスヘッドショット、会議、法人イベント、ギャラリー、展覧会撮影に対応。東京拠点、日本全国で撮影可能。",
      ogTitle: "日本で活動するフォトグラファー — コーポレート・ポートレート・アート",
      ogDescription:
        "東京拠点。日本国内でビジネスポートレート、法人イベント、アート案件を撮影。",
    },
  } as const;
  const t = seo[(locale as keyof typeof seo) in seo ? (locale as keyof typeof seo) : "en"];

  return {
    title: t.title,
    description: t.description,
    keywords: [
      "corporate photographer Japan",
      "business portrait photographer Japan",
      "executive headshots Japan",
      "corporate event photographer Japan",
      "conference photographer Japan",
      "art photographer Japan",
      "art gallery photographer Japan",
      "Tokyo photographer English speaking",
    ],
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
    eyebrow: "Japan",
    h1: "Corporate, Portrait & Art Photography Across Japan",
    p1: "Eva Gorobets is a Tokyo-based photographer working with international companies, executives, galleries, artists and cultural institutions across Japan. The core areas are executive portraits, business headshots, corporate events, exhibition coverage and artwork documentation.",
    p2: "Tokyo is the main base, with projects regularly commissioned in Osaka, Kyoto and other cities by arrangement. Communication is available in English, Japanese and Russian, which makes the workflow practical for both local teams and overseas headquarters.",
    regionsLabel: "Where in Japan",
    regions: ["Tokyo", "Osaka", "Kyoto", "Japan-wide assignments by arrangement"],
    servicesLabel: "Services in Japan",
    services: [
      ["Business portraits & executive headshots", "/business-portraits"],
      ["Corporate events, conferences and launches", "/corporate-events-photography"],
      ["Photography for international companies in Tokyo", "/corporate"],
      ["Gallery openings, exhibitions and artwork documentation", "/art-galleries-photography"],
    ],
    fitLabel: "Who this page is for",
    fit: [
      "International companies with offices in Japan",
      "Executives and founders who need portraits in Tokyo",
      "Conference and event teams working across Japan",
      "Galleries, museums, artists and curators",
    ],
    faq: [
      ["Do you work only in Tokyo?", "No. Tokyo is the main base, but commissions in Osaka, Kyoto and other cities across Japan are available by arrangement."],
      ["Can an overseas team brief you in English for a shoot in Japan?", "Yes. English, Japanese and Russian communication is available, so local staff and overseas teams can work directly without translation bottlenecks."],
      ["Do you cover both corporate and art-world assignments in Japan?", "Yes. The work spans executive portraits, business headshots, conferences, corporate events, exhibition coverage, artist portraits and artwork documentation."],
      ["How do I book a session in Japan?", "Use the contact form with your city, date and project type. You will receive a reply within 24 hours."],
    ],
    ctaH2: "Planning a shoot in Japan?",
    ctaBtn: "Send a brief",
  },
  jp: {
    eyebrow: "Japan",
    h1: "日本全国でのコーポレート・ポートレート・アート撮影",
    p1: "Eva Gorobetsは東京を拠点に、国際企業、経営層、ギャラリー、アーティスト、文化機関のために日本国内で撮影を行うフォトグラファーです。エグゼクティブポートレート、ビジネスヘッドショット、法人イベント、展覧会記録、作品ドキュメンテーションを主に手がけています。",
    p2: "主な拠点は東京ですが、大阪、京都、その他の都市にも案件に応じて対応しています。英語・日本語・ロシア語でのコミュニケーションが可能なため、日本の現地チームと海外本社の両方にとって進行しやすい体制です。",
    regionsLabel: "対応エリア",
    regions: ["東京", "大阪", "京都", "その他日本国内は応相談"],
    servicesLabel: "日本で対応する撮影",
    services: [
      ["ビジネスポートレート・エグゼクティブヘッドショット", "/business-portraits"],
      ["法人イベント・会議・ローンチ撮影", "/corporate-events-photography"],
      ["東京の外資系企業向け撮影", "/corporate"],
      ["ギャラリー、展覧会、作品ドキュメンテーション", "/art-galleries-photography"],
    ],
    fitLabel: "このページに合うご依頼",
    fit: [
      "日本に拠点を持つ外資系企業",
      "東京でポートレートが必要な経営層・創業者",
      "日本国内でイベントを行う会議・運営チーム",
      "ギャラリー、美術館、アーティスト、キュレーター",
    ],
    faq: [
      ["東京以外でも撮影できますか？", "はい。東京が主拠点ですが、大阪、京都、その他の都市でも案件に応じて対応可能です。"],
      ["海外チームが英語でブリーフして、日本国内で撮影できますか？", "はい。英語・日本語・ロシア語で対応できるため、海外本社と日本側チームが直接進行できます。"],
      ["日本国内でコーポレート案件とアート案件の両方に対応していますか？", "はい。エグゼクティブポートレート、法人イベント、展示記録、アーティストポートレート、作品ドキュメンテーションまで対応しています。"],
      ["日本での撮影依頼はどうすればいいですか？", "お問い合わせフォームから都市、日程、撮影内容をお送りください。24時間以内に返信します。"],
    ],
    ctaH2: "日本での撮影をご予定ですか？",
    ctaBtn: "ブリーフを送る",
  },
} as const;

type Locale = keyof typeof content;

function buildFAQSchema(items: ReadonlyArray<readonly [string, string]>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export default async function PhotographerJapanPage({ params }: PageProps) {
  const { locale } = await params;
  const t = content[(locale as Locale) in content ? (locale as Locale) : "en"];

  return (
    <>
      <Script id="japan-faq-schema" type="application/ld+json">
        {JSON.stringify(buildFAQSchema(t.faq))}
      </Script>
      <section className="section pt-20 md:pt-32">
        <p className="label mb-6">{t.eyebrow}</p>
        <h1
          className="max-w-4xl text-[clamp(3rem,7vw,6rem)] leading-[0.95]"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
        >
          {t.h1}
        </h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <p className="text-sm text-black/60 leading-relaxed">{t.p1}</p>
          <p className="text-sm text-black/60 leading-relaxed">{t.p2}</p>
        </div>
      </section>

      <section className="section grid gap-16 border-t border-black/[0.07] md:grid-cols-2">
        <div>
          <p className="label mb-8">{t.regionsLabel}</p>
          <ul>
            {t.regions.map((item) => (
              <li key={item} className="border-t border-black/[0.07] py-4 text-sm text-black/65">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label mb-8">{t.fitLabel}</p>
          <ul>
            {t.fit.map((item) => (
              <li key={item} className="border-t border-black/[0.07] py-4 text-sm text-black/65">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section border-t border-black/[0.07]">
        <p className="label mb-10">{t.servicesLabel}</p>
        <div className="grid gap-y-0 md:grid-cols-2">
          {t.services.map(([label, href]) => (
            <article key={href} className="border-t border-black/[0.07] py-8 pr-0 md:pr-12">
              <h2
                className="text-2xl mb-3"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
              >
                {label}
              </h2>
              <Link href={`/${locale}${href}`} className="btn-ghost">
                View page
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section border-t border-black/[0.07]">
        <p className="label mb-10">FAQ</p>
        <div className="max-w-4xl">
          {t.faq.map(([question, answer]) => (
            <article key={question} className="border-t border-black/[0.07] py-7">
              <h2
                className="text-2xl mb-2"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
              >
                {question}
              </h2>
              <p className="text-sm text-black/55 leading-relaxed">{answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section border-t border-black/[0.07] py-6!">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <h2
            className="text-[clamp(2rem,4.5vw,4rem)] leading-[0.95]"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
          >
            {t.ctaH2}
          </h2>
          <Link href={`/${locale}/contact-booking`} className="btn">
            {t.ctaBtn}
          </Link>
        </div>
      </section>
    </>
  );
}
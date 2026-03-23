import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

type PageProps = { params: Promise<{ locale: string }> };

const BASE_URL = "https://evagorobets.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = "/photographer-australia";
  const seo = {
    en: {
      title: "Corporate, Portrait & Art Photographer in Australia | Eva Gorobets",
      description:
        "Corporate photographer in Australia for executive portraits, business headshots, conferences, corporate events, galleries and exhibitions. Available in Melbourne and Sydney.",
      ogTitle: "Photographer in Australia — Corporate, Portrait & Art",
      ogDescription:
        "Melbourne-focused photographer for executive portraits, corporate events and art-world commissions across Australia.",
    },
    jp: {
      title: "オーストラリアで活動するコーポレート・ポートレート・アートフォトグラファー | Eva Gorobets",
      description:
        "オーストラリアでエグゼクティブポートレート、ビジネスヘッドショット、会議、法人イベント、ギャラリー、展覧会撮影に対応。メルボルン、シドニーで活動。",
      ogTitle: "オーストラリアで活動するフォトグラファー — コーポレート・ポートレート・アート",
      ogDescription:
        "メルボルンを中心に、オーストラリアでビジネスポートレート、法人イベント、アート案件を撮影。",
    },
  } as const;
  const t = seo[(locale as keyof typeof seo) in seo ? (locale as keyof typeof seo) : "en"];

  return {
    title: t.title,
    description: t.description,
    keywords: [
      "corporate photographer Australia",
      "business portrait photographer Australia",
      "executive headshots Australia",
      "corporate event photographer Australia",
      "conference photographer Melbourne",
      "business portrait photographer Melbourne",
      "art photographer Australia",
      "gallery photographer Melbourne",
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
      "geo.region": "AU-VIC",
      "geo.placename": "Melbourne",
      "geo.position": "-37.8136;144.9631",
      ICBM: "-37.8136, 144.9631",
    },
  };
}

const content = {
  en: {
    eyebrow: "Australia",
    h1: "Corporate, Portrait & Art Photography Across Australia",
    p1: "Eva Gorobets works with Australian and international clients who need executive portraits, business headshots, corporate event coverage, exhibition photography and artwork documentation in Australia. Melbourne is the main Australian base, with Sydney and other cities available by arrangement.",
    p2: "This page is intended for clients looking for a photographer in Australia with corporate discipline, editorial quality and genuine understanding of both business and art-world contexts. The Australia and Japan work is closely connected, which is often useful for cross-border companies, galleries and cultural projects.",
    regionsLabel: "Where in Australia",
    regions: ["Melbourne", "Sydney", "Australia-wide assignments by arrangement"],
    servicesLabel: "Services in Australia",
    services: [
      ["Business portraits & executive headshots", "/business-portraits"],
      ["Corporate events, conferences and launches", "/corporate-events-photography"],
      ["Corporate photography for international teams", "/corporate"],
      ["Gallery openings, exhibitions and artwork documentation", "/art-galleries-photography"],
    ],
    fitLabel: "Who this page is for",
    fit: [
      "Executives and leadership teams in Melbourne",
      "Companies running conferences, launches and internal events",
      "Artists, galleries and cultural institutions in Australia",
      "Cross-border Australia/Japan projects needing one photographer across both contexts",
    ],
    faq: [
      ["Are you available in Melbourne?", "Yes. Melbourne is the main Australian base for portrait sessions, corporate coverage and art-world commissions."],
      ["Do you also work in Sydney?", "Yes. Sydney assignments are available by arrangement for portraits, events and art-related commissions."],
      ["Is this only for corporate work?", "No. The work in Australia includes executive portraits, business headshots, conferences, corporate events, gallery openings, artist portraits and artwork documentation."],
      ["How do Australia clients enquire?", "Send the contact form with your city, date and scope. You will receive a reply within 24 hours."],
    ],
    ctaH2: "Planning a shoot in Australia?",
    ctaBtn: "Send a brief",
  },
  jp: {
    eyebrow: "Australia",
    h1: "オーストラリア全国でのコーポレート・ポートレート・アート撮影",
    p1: "Eva Gorobetsは、オーストラリア国内でエグゼクティブポートレート、ビジネスヘッドショット、法人イベント、展覧会撮影、作品ドキュメンテーションを必要とする国内外クライアントに対応しています。主なオーストラリア拠点はメルボルンで、シドニーその他の都市も案件に応じて対応可能です。",
    p2: "このページは、オーストラリアでコーポレートの進行力、エディトリアル品質、ビジネスとアート双方の文脈理解を持つフォトグラファーを探している方のためのものです。オーストラリアと日本の両方での活動経験は、越境案件にも有利です。",
    regionsLabel: "対応エリア",
    regions: ["メルボルン", "シドニー", "その他オーストラリア国内は応相談"],
    servicesLabel: "オーストラリアで対応する撮影",
    services: [
      ["ビジネスポートレート・エグゼクティブヘッドショット", "/business-portraits"],
      ["法人イベント・会議・ローンチ撮影", "/corporate-events-photography"],
      ["国際チーム向けコーポレート撮影", "/corporate"],
      ["ギャラリー、展覧会、作品ドキュメンテーション", "/art-galleries-photography"],
    ],
    fitLabel: "このページに合うご依頼",
    fit: [
      "メルボルンの経営層・リーダーシップチーム",
      "会議、ローンチ、社内イベントを運営する企業",
      "オーストラリアのアーティスト、ギャラリー、文化機関",
      "オーストラリアと日本をまたぐ案件で一貫して依頼したいチーム",
    ],
    faq: [
      ["メルボルンでの撮影に対応していますか？", "はい。メルボルンはオーストラリアでの主要拠点で、ポートレート、イベント、アート案件に対応しています。"],
      ["シドニーでも撮影できますか？", "はい。シドニーでのポートレート、イベント、アート案件も日程調整のうえ対応可能です。"],
      ["コーポレート案件のみですか？", "いいえ。エグゼクティブポートレート、ビジネスヘッドショット、会議、法人イベント、ギャラリーオープニング、アーティストポートレート、作品ドキュメントまで対応しています。"],
      ["オーストラリアでの依頼方法は？", "お問い合わせフォームから都市、日程、撮影内容をお送りください。24時間以内に返信します。"],
    ],
    ctaH2: "オーストラリアでの撮影をご予定ですか？",
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

export default async function PhotographerAustraliaPage({ params }: PageProps) {
  const { locale } = await params;
  const t = content[(locale as Locale) in content ? (locale as Locale) : "en"];

  return (
    <>
      <Script id="australia-faq-schema" type="application/ld+json">
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
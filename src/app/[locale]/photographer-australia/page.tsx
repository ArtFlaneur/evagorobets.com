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
      title: "Corporate, Portrait & Art Photographer in Melbourne | Eva Gorobets",
      description:
        "Melbourne photographer for executive portraits, business headshots, corporate events, gallery openings and artwork documentation. Regular working periods in Melbourne; Sydney and Australia-wide by arrangement. Cross-border Australia/Japan experience.",
      ogTitle: "Photographer in Melbourne — Corporate, Portrait & Art",
      ogDescription:
        "Executive portraits, corporate events and art-world photography during regular working periods in Melbourne. Sydney and Australia-wide by arrangement. Australia/Japan cross-border experience.",
    },
    jp: {
      title: "メルボルンで活動するコーポレート・ポートレート・アートフォトグラファー | Eva Gorobets",
      description:
        "メルボルンでエグゼクティブポートレート、ビジネスヘッドショット、法人イベント、ギャラリーオープニング、作品ドキュメンテーションに対応。メルボルンでは定期的に活動。シドニーおよびオーストラリア国内は応相談。オーストラリア・日本の跨境実績。",
      ogTitle: "メルボルンで活動するフォトグラファー — コーポレート・ポートレート・アート",
      ogDescription:
        "メルボルンを中心に、エグゼクティブポートレート、法人イベント、アート案件を撮影。シドニー及び国内は応相談。オーストラリア・日本の跨境経験。",
    },
  } as const;
  const t = seo[(locale as keyof typeof seo) in seo ? (locale as keyof typeof seo) : "en"];

  return {
    title: t.title,
    description: t.description,
    keywords: [
      "corporate photographer Melbourne",
      "business portrait photographer Melbourne",
      "executive headshots Melbourne",
      "headshot photographer Melbourne CBD",
      "corporate event photographer Melbourne",
      "conference photographer Melbourne",
      "gallery photographer Melbourne",
      "art photographer Melbourne",
      "corporate photographer Australia",
      "business portrait photographer Australia",
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
    h1: "Corporate, Portrait & Art Photographer in Melbourne",
    p1: "Eva Gorobets works regularly in Melbourne with Australian and international clients who need executive portraits, business headshots, corporate event coverage, exhibition photography and artwork documentation. Melbourne bookings are scheduled during regular working periods; Sydney and other Australian cities are available by arrangement.",
    p2: "For Melbourne teams, galleries and cultural projects, the work combines corporate discipline with editorial quality and an understanding of business and art-world contexts. Eva is based in Tokyo and works between Japan and Melbourne, which is useful for cross-border companies, galleries and cultural projects.",
    regionsLabel: "Where in Australia",
    regions: ["Melbourne — regular working periods", "Sydney — by arrangement", "Other Australian cities — by arrangement"],
    servicesLabel: "Services in Australia",
    services: [
      ["Business portraits & executive headshots", "/business-portraits"],
      ["Corporate events, conferences and launches", "/corporate-events-photography"],
      ["Corporate photography for international teams", "/corporate"],
      ["Gallery openings, exhibitions and artwork documentation", "/art-galleries-photography"],
    ],
    fitLabel: "Who this page is for",
    fit: [
      "Executives and leadership teams booking in Melbourne",
      "Companies running conferences, launches and internal events",
      "Artists, galleries and cultural institutions in Australia",
      "Cross-border Australia/Japan projects needing one photographer across both contexts",
    ],
    faq: [
      ["Are you available in Melbourne?", "Yes. Eva works in Melbourne regularly for portrait sessions, corporate coverage and art-world commissions. Share your date and scope to discuss availability."],
      ["Do you also work in Sydney?", "Yes. Sydney assignments are available by arrangement for portraits, events and art-related commissions."],
      ["Is this only for corporate work?", "No. The work in Australia includes executive portraits, business headshots, conferences, corporate events, gallery openings, artist portraits and artwork documentation."],
      ["How do Australia clients enquire?", "Send the contact form with your city, date and scope. You will receive a reply within 24 hours."],
    ],
    ctaH2: "Planning a shoot in Australia?",
    ctaBtn: "Send a brief",
    viewPage: "View page",
  },
  jp: {
    eyebrow: "Melbourne, Australia",
    h1: "メルボルンで活動するコーポレート・ポートレート・アートフォトグラファー",
    p1: "Eva Gorobetsはメルボルンで定期的に活動し、エグゼクティブポートレート、ビジネスヘッドショット、法人イベント、展覧会撮影、作品ドキュメンテーションを必要とする国内外クライアントに対応しています。メルボルンでの撮影は定期的な滞在期間に受け付け、シドニーその他の都市は案件に応じて対応します。",
    p2: "メルボルンのチーム、ギャラリー、文化プロジェクトには、コーポレートの進行力とエディトリアル品質、ビジネスとアート双方の文脈理解を組み合わせます。東京を拠点に日本とメルボルンの間で活動しており、越境する企業、ギャラリー、文化プロジェクトにも適しています。",
    regionsLabel: "対応エリア",
    regions: ["メルボルン — 定期的な活動期間", "シドニー — 応相談", "その他オーストラリア国内 — 応相談"],
    servicesLabel: "オーストラリアで対応する撮影",
    services: [
      ["ビジネスポートレート・エグゼクティブヘッドショット", "/business-portraits"],
      ["法人イベント・会議・ローンチ撮影", "/corporate-events-photography"],
      ["国際チーム向けコーポレート撮影", "/corporate"],
      ["ギャラリー、展覧会、作品ドキュメンテーション", "/art-galleries-photography"],
    ],
    fitLabel: "このページに合うご依頼",
    fit: [
      "メルボルンで撮影を予定する経営層・リーダーシップチーム",
      "会議、ローンチ、社内イベントを運営する企業",
      "オーストラリアのアーティスト、ギャラリー、文化機関",
      "オーストラリアと日本をまたぐ案件で一貫して依頼したいチーム",
    ],
    faq: [
      ["メルボルンでの撮影に対応していますか？", "はい。メルボルンで定期的に活動し、ポートレート、法人イベント、アート案件に対応しています。日程と撮影内容をお知らせください。"],
      ["シドニーでも撮影できますか？", "はい。シドニーでのポートレート、イベント、アート案件も日程調整のうえ対応可能です。"],
      ["コーポレート案件のみですか？", "いいえ。エグゼクティブポートレート、ビジネスヘッドショット、会議、法人イベント、ギャラリーオープニング、アーティストポートレート、作品ドキュメントまで対応しています。"],
      ["オーストラリアでの依頼方法は？", "お問い合わせフォームから都市、日程、撮影内容をお送りください。24時間以内に返信します。"],
    ],
    ctaH2: "オーストラリアでの撮影をご予定ですか？",
    ctaBtn: "ブリーフを送る",
    viewPage: "ページを見る",
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
                {t.viewPage}
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
import type { Metadata } from "next";
import Link from "next/link";

type PageProps = { params: Promise<{ locale: string }> };
const BASE_URL = "https://evagorobets.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = "/clients";

  return {
    title: "Clients — Corporate, Art & Media Photography | Eva Gorobets",
    description:
      "Selected corporate, gallery, media and public-sector clients across Tokyo, Melbourne and international commissions.",
    openGraph: {
      title: "Clients — Eva Gorobets",
      description:
        "Client sectors and references across corporate, art and media photography in Tokyo, Melbourne and worldwide.",
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

const clientSectors = {
  en: [
    {
      sector: "Professional Services & Institutions",
      note: "Tokyo · Melbourne · International",
      clients: [
        "KPMG",
        "EY (Ernst & Young)",
        "McKinsey & Company",
        "SAP",
        "General Electric",
        "WISE Employment",
        "International management consulting firms, Tokyo",
        "Private equity and legal services groups",
      ],
    },
    {
      sector: "Technology",
      note: "Melbourne · International",
      clients: [
        "Google",
        "SAP",
        "Technology accelerators and innovation hubs",
        "Enterprise software companies, APAC region",
      ],
    },
    {
      sector: "Art, Culture & Creative Industries",
      note: "Tokyo · Melbourne · International",
      clients: [
        "State Library Victoria",
        "Contemporary art galleries, Tokyo",
        "Cirque du Soleil",
        "International gallery groups, vernissages",
        "Art Flaneur (co-founded)",
        "Independent exhibition spaces, Melbourne",
      ],
    },
  ],
  jp: [
    {
      sector: "プロフェッショナルサービス・機関",
      note: "東京 · メルボルン · 国際",
      clients: [
        "KPMG",
        "EY（アーンスト・アンド・ヤング）",
        "マッキンゼー・アンド・カンパニー",
        "SAP",
        "ゼネラル・エレクトリック",
        "東京の国際的経営コンサルティング会社",
        "プライベートエクイティ・法務サービスグループ",
        "WISE Employment",
      ],
    },
    {
      sector: "テクノロジー",
      note: "メルボルン · 国際",
      clients: [
        "Google",
        "SAP",
        "テクノロジーアクセラレーター・イノベーションハブ",
        "APACの企業向けソフトウェア会社",
      ],
    },
    {
      sector: "アート・文化・クリエイティブ業界",
      note: "東京 · メルボルン · 国際",
      clients: [
        "ビクトリア州立図書館",
        "東京の現代アートギャラリー",
        "国際ギャラリーグループ・ヴェルニサージュ",
        "アート・フラヌール（共同創設）",
        "メルボルンの独立系展示空間",
        "シルク・ドゥ・ソレイユ",
      ],
    },
  ],
  ru: [
    {
      sector: "Профессиональные услуги и институции",
      note: "Токио · Мельбурн · Международно",
      clients: [
        "KPMG",
        "EY (Ernst & Young)",
        "McKinsey & Company",
        "SAP",
        "General Electric",
        "Международные управленческие консалтинговые фирмы, Токио",
        "Группы прямых инвестиций и юридических услуг",
        "WISE Employment",
      ],
    },
    {
      sector: "Технологии",
      note: "Мельбурн · Международно",
      clients: [
        "Google",
        "SAP",
        "Технологические акселераторы и инновационные хабы",
        "Корпоративные программные компании, регион APAC",
      ],
    },
    {
      sector: "Арт, культура и креативные индустрии",
      note: "Токио · Мельбурн · Международно",
      clients: [
        "State Library Victoria",
        "Галереи современного искусства, Токио",
        "Международные галерейные группы, вернисажи",
        "Art Flaneur (сооснователь)",
        "Независимые выставочные пространства, Мельбурн",
        "Cirque du Soleil",
      ],
    },
  ],
} as const;

const content = {
  en: {
    eyebrow: "Clients",
    h1: "Organizations we’ve worked with",
    sub: "A selection of clients across corporate, cultural and media sectors — Tokyo, Melbourne and internationally. Full client list and references available on request.",
    statement:
      "“Client names and specific project details are shared under NDA on request. References available from corporate, gallery and media clients.”",
    testimonialsLabel: "What clients say",
    testimonials: [
      {
        quote:
          "Eva’s portraits became the face of our Tokyo leadership team across our global website, annual report and all media coverage.",
        from: "Head of Communications — Global Consulting Firm, Tokyo",
      },
      {
        quote:
          "Three consecutive annual conferences. She anticipates the moments before they happen. Our PR team no longer needs to brief a photographer.",
        from: "Event Director — International Financial Institution, Tokyo",
      },
      {
        quote:
          "Her images from our opening night appeared in two national publications and our international partner’s catalogue. Clean, usable, precise.",
        from: "Gallery Director — Contemporary Art Space, Tokyo",
      },
    ],
    ctaH2: "Start a project.",
    ctaBtn: "Get in touch",
  },
  jp: {
    eyebrow: "クライアント",
    h1: "ご一緒してきた組織",
    sub: "法人・文化・メディアセクターにわたるクライアントの一例 — 東京・メルボルン・世界各地。詳細なクライアントリストとリファレンスはご要望に応じて提供します。",
    statement:
      "「クライアント名と具体的なプロジェクト詳細はNDA締結後にご共有します。法人・ギャラリー・メディアクライアントからのリファレンスもご用意しています。」",
    testimonialsLabel: "クライアントの声",
    testimonials: [
      {
        quote:
          "エヴァのポートレートは、グローバルウェブサイト・年次報告書・あらゆるメディアカバレッジにわたって、東京リーダーシップチームの顔となりました。",
        from: "グローバルコミュニケーション部長 — 国際コンサルティングファーム、東京",
      },
      {
        quote:
          "3年連続で年次カンファレンスを担当。彼女はこちらが気づく前に必要な瞬間を先読みします。PRチームはもうフォトグラファーをブリーフする必要がありません。",
        from: "イベントディレクター — 国際金融機関、東京",
      },
      {
        quote:
          "オープニングナイトの写真が国内2誌と国際パートナーのカタログに掲載されました。クリーンで使えて、的確。",
        from: "ギャラリーディレクター — 現代アートスペース、東京",
      },
    ],
    ctaH2: "プロジェクトを始める。",
    ctaBtn: "お問い合わせ",
  },
  ru: {
    eyebrow: "Клиенты",
    h1: "Организации, с которыми мы работали",
    sub: "Выборка клиентов из корпоративного, культурного и медиасекторов — Токио, Мельбурн и весь мир. Полный список клиентов и рекомендации — по запросу.",
    statement:
      "«Имена клиентов и детали конкретных проектов предоставляются по запросу под NDA. Рекомендации доступны от корпоративных, галерейных и медиаклиентов.»",
    testimonialsLabel: "Что говорят клиенты",
    testimonials: [
      {
        quote:
          "Портреты Евы стали лицом нашей токийской команды руководства на глобальном сайте, в годовом отчёте и во всех медиаматериалах.",
        from: "Директор по коммуникациям — международная консалтинговая компания, Токио",
      },
      {
        quote:
          "Три ежегодных конференции подряд. Она предвидит нужные моменты раньше нас. Нашей PR-команде больше не нужно инструктировать фотографа.",
        from: "Директор мероприятий — международная финансовая организация, Токио",
      },
      {
        quote:
          "Её фотографии с открытия вышли в двух национальных изданиях и в каталоге международного партнёра. Чётко, функционально, точно.",
        from: "Директор галереи — пространство современного искусства, Токио",
      },
    ],
    ctaH2: "Начать проект.",
    ctaBtn: "Написать",
  },
} as const;

type Locale = keyof typeof content;

export default async function ClientsPage({ params }: PageProps) {
  const { locale } = await params;
  const loc = (locale as Locale) in content ? (locale as Locale) : "en";
  const t = content[loc];
  const sectors = clientSectors[loc];
  const artFlaneurUrl = "https://www.artflaneur.art";

  function linkifyArtFlaneur(text: string) {
    const parts = text.split(/(Art Flaneur Global|Art Flaneur|アート・フラヌール)/g);
    return parts.map((part, index) => {
      if (part === "Art Flaneur Global" || part === "Art Flaneur" || part === "アート・フラヌール") {
        return (
          <a
            key={`${part}-${index}`}
            href={artFlaneurUrl}
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  }

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
        <p className="mt-8 max-w-xl text-sm text-black/55 leading-relaxed">{t.sub}</p>
      </section>

      <section className="section border-t border-black/[0.07]">
        <div className="grid gap-y-0 md:grid-cols-2 lg:grid-cols-3">
          {sectors.map(({ sector, note, clients }) => (
            <div key={sector} className="border-t border-black/[0.07] pt-6 pb-10 pr-0 md:pr-14">
              <p className="text-2xl mb-1" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>
                {sector}
              </p>
              <p className="label mb-6 mt-1">{note}</p>
              <ul>
                {clients.map((client) => (
                  <li key={client} className="border-t border-black/[0.07] py-3 text-sm text-black/60">
                    {linkifyArtFlaneur(client)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section border-t border-black/[0.07]">
        <blockquote className="max-w-2xl">
          <p
            className="text-[clamp(1.4rem,3vw,2.4rem)] leading-[1.2] text-black/80"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontStyle: "italic" }}
          >
            {t.statement}
          </p>
        </blockquote>
      </section>

      <section className="section border-t border-black/[0.07]">
        <p className="label mb-10">{t.testimonialsLabel}</p>
        <div className="grid gap-y-0 md:grid-cols-3">
          {t.testimonials.map(({ quote, from }) => (
            <article key={from} className="border-t border-black/[0.07] py-10 pr-0 md:pr-12">
              <p
                className="text-lg leading-[1.35] text-black/75 mb-5"
                style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}
              >
                &ldquo;{quote}&rdquo;
              </p>
              <p className="label">{from}</p>
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

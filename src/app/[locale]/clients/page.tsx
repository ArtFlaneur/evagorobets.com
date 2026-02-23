import Link from "next/link";

type PageProps = { params: Promise<{ locale: string }> };

const clientSectors = {
  en: [
    { sector: "Financial & Professional Services", note: "Tokyo · Melbourne · International", clients: ["KPMG", "EY (Ernst & Young)", "McKinsey & Company", "SAP", "General Electric", "International management consulting firms, Tokyo", "Private equity and legal services groups"] },
    { sector: "Technology", note: "Melbourne · International", clients: ["Google", "SAP", "Technology accelerators and innovation hubs", "Enterprise software companies, APAC region"] },
    { sector: "Art & Cultural Institutions", note: "Tokyo · Melbourne · International", clients: ["State Library Victoria", "Contemporary art galleries, Tokyo", "International gallery groups, vernissages", "Art Flaneur (co-founded)", "Independent exhibition spaces, Melbourne"] },
    { sector: "NGOs, Foundations & Public Sector", note: "Melbourne · Tokyo", clients: ["WISE Employment", "Cirque du Soleil", "Cultural exchange organisations", "University and academic institutions"] },
    { sector: "Hospitality, Food & Lifestyle", note: "Melbourne", clients: ["Sette Bello", "High Society", "Fordham\u2019s Milk Bar", "No.96 Cafe and Restaurant", "The Mill · The Palms · White Oaks", "WISE cookbook"] },
  ],
  jp: [
    { sector: "金融・プロフェッショナルサービス", note: "東京 · メルボルン · 国際", clients: ["KPMG", "EY（アーンスト・アンド・ヤング）", "マッキンゼー・アンド・カンパニー", "SAP", "ゼネラル・エレクトリック", "東京の国際的経営コンサルティング会社", "プライベートエクイティ・法務サービスグループ"] },
    { sector: "テクノロジー", note: "メルボルン · 国際", clients: ["Google", "SAP", "テクノロジーアクセラレーター・イノベーションハブ", "APACの企業向けソフトウェア会社"] },
    { sector: "アート・文化機関", note: "東京 · メルボルン · 国際", clients: ["ビクトリア州立図書館", "東京の現代アートギャラリー", "国際ギャラリーグループ・ヴェルニサージュ", "アート・フラヌール（共同創設）", "メルボルンの独立系展示空間"] },
    { sector: "NGO・財団・公共機関", note: "メルボルン · 東京", clients: ["WISE Employment", "シルク・ドゥ・ソレイユ", "文化交流団体", "大学・学術機関"] },
    { sector: "ホスピタリティ・フード・ライフスタイル", note: "メルボルン", clients: ["Sette Bello", "High Society", "Fordham\u2019s Milk Bar", "No.96 Cafe and Restaurant", "The Mill · The Palms · White Oaks", "WISEクックブック"] },
  ],
  ru: [
    { sector: "Финансы и профессиональные услуги", note: "Токио · Мельбурн · Международно", clients: ["KPMG", "EY (Ernst & Young)", "McKinsey & Company", "SAP", "General Electric", "Международные управленческие консалтинговые фирмы, Токио", "Группы прямых инвестиций и юридических услуг"] },
    { sector: "Технологии", note: "Мельбурн · Международно", clients: ["Google", "SAP", "Технологические акселераторы и инновационные хабы", "Корпоративные программные компании, регион APAC"] },
    { sector: "Арт и культурные институции", note: "Токио · Мельбурн · Международно", clients: ["State Library Victoria", "Галереи современного искусства, Токио", "Международные галерейные группы, вернисажи", "Art Flaneur (сооснователь)", "Независимые выставочные пространства, Мельбурн"] },
    { sector: "НКО, фонды и государственный сектор", note: "Мельбурн · Токио", clients: ["WISE Employment", "Cirque du Soleil", "Организации культурного обмена", "Университеты и академические институции"] },
    { sector: "Гостеприимство, еда и образ жизни", note: "Мельбурн", clients: ["Sette Bello", "High Society", "Fordham\u2019s Milk Bar", "No.96 Cafe and Restaurant", "The Mill · The Palms · White Oaks", "Кулинарная книга WISE"] },
  ],
} as const;

const content = {
  en: {
    eyebrow: "Clients",
    h1: "Organizations we\u2019ve worked with",
    sub: "A selection of clients across corporate, cultural and media sectors — Tokyo, Melbourne and internationally. Full client list and references available on request.",
    statement: "\u201cClient names and specific project details are shared under NDA on request. References available from corporate, gallery and media clients.\u201d",
    testimonialsLabel: "What clients say",
    testimonials: [
      { quote: "Eva\u2019s portraits became the face of our Tokyo leadership team across our global website, annual report and all media coverage.", from: "Head of Communications \u2014 Global Consulting Firm, Tokyo" },
      { quote: "Three consecutive annual conferences. She anticipates the moments before they happen. Our PR team no longer needs to brief a photographer.", from: "Event Director \u2014 International Financial Institution, Tokyo" },
      { quote: "Her images from our opening night appeared in two national publications and our international partner\u2019s catalogue. Clean, usable, precise.", from: "Gallery Director \u2014 Contemporary Art Space, Tokyo" },
    ],
    ctaH2: "Start a project.",
    ctaBtn: "Get in touch",
  },
  jp: {
    eyebrow: "クライアント",
    h1: "ご一緒してきた組織",
    sub: "法人・文化・メディアセクターにわたるクライアントの一例 — 東京・メルボルン・世界各地。詳細なクライアントリストとリファレンスはご要望に応じて提供します。",
    statement: "\u300cクライアント名と具体的なプロジェクト詳細はNDA締結後にご共有します。法人・ギャラリー・メディアクライアントからのリファレンスもご用意しています。\u300d",
    testimonialsLabel: "クライアントの声",
    testimonials: [
      { quote: "エヴァのポートレートは、グローバルウェブサイト・年次報告書・あらゆるメディアカバレッジにわたって、東京リーダーシップチームの顔となりました。", from: "グローバルコミュニケーション部長 \u2014 国際コンサルティングファーム、東京" },
      { quote: "3年連続で年次カンファレンスを担当。彼女はこちらが気づく前に必要な瞬間を先読みします。PRチームはもうフォトグラファーをブリーフする必要がありません。", from: "イベントディレクター \u2014 国際金融機関、東京" },
      { quote: "オープニングナイトの写真が国内2誌と国際パートナーのカタログに掲載されました。クリーンで使えて、的確。", from: "ギャラリーディレクター \u2014 現代アートスペース、東京" },
    ],
    ctaH2: "プロジェクトを始める。",
    ctaBtn: "お問い合わせ",
  },
  ru: {
    eyebrow: "Клиенты",
    h1: "Организации, с которыми мы работали",
    sub: "Выборка клиентов из корпоративного, культурного и медиасекторов — Токио, Мельбурн и весь мир. Полный список клиентов и рекомендации — по запросу.",
    statement: "\u00abИмена клиентов и детали конкретных проектов предоставляются по запросу под NDA. Рекомендации доступны от корпоративных, галерейных и медиаклиентов.\u00bb",
    testimonialsLabel: "Что говорят клиенты",
    testimonials: [
      { quote: "Портреты Евы стали лицом нашей токийской команды руководства на глобальном сайте, в годовом отчёте и во всех медиаматериалах.", from: "Директор по коммуникациям \u2014 международная консалтинговая компания, Токио" },
      { quote: "Три ежегодных конференции подряд. Она предвидит нужные моменты раньше нас. Нашей PR-команде больше не нужно инструктировать фотографа.", from: "Директор мероприятий \u2014 международная финансовая организация, Токио" },
      { quote: "Её фотографии с открытия вышли в двух национальных изданиях и в каталоге международного партнёра. Чётко, функционально, точно.", from: "Директор галереи \u2014 пространство современного искусства, Токио" },
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
            <div key={sector} className="border-t border-black/[0.07] py-10 pr-0 md:pr-14">
              <p className="text-2xl mb-1" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>{sector}</p>
              <p className="label mb-6 mt-1">{note}</p>
              <ul>
                {clients.map((client) => (
                  <li key={client} className="border-t border-black/[0.07] py-3 text-sm text-black/60">{client}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section border-t border-black/[0.07]">
        <blockquote className="max-w-2xl">
          <p className="text-[clamp(1.4rem,3vw,2.4rem)] leading-[1.2] text-black/80" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontStyle: "italic" }}>
            {t.statement}
          </p>
        </blockquote>
      </section>

      <section className="section border-t border-black/[0.07]">
        <p className="label mb-10">{t.testimonialsLabel}</p>
        <div className="grid gap-y-0 md:grid-cols-3">
          {t.testimonials.map(({ quote, from }) => (
            <article key={from} className="border-t border-black/[0.07] py-10 pr-0 md:pr-12">
              <p className="text-lg leading-[1.35] text-black/75 mb-5" style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic" }}>
                &ldquo;{quote}&rdquo;
              </p>
              <p className="label">{from}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section border-t border-black/[0.07] !py-6">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="text-[clamp(2rem,4.5vw,4rem)] leading-[0.95]" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>
            {t.ctaH2}
          </h2>
          <Link href={`/${locale}/contact-booking`} className="btn">{t.ctaBtn}</Link>
        </div>
      </section>
    </>
  );
}

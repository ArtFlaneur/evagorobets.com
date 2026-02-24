import type { Metadata } from "next";
import Link from "next/link";

import { EditorialGallery } from "@/components/EditorialGallery";
import { corporateGallery, portraitsGallery } from "@/lib/gallery-data";

type PageProps = { params: Promise<{ locale: string }> };

const BASE_URL = "https://evagorobets.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = "/corporate";

  return {
    title: "Corporate Photography Tokyo — For International Companies | Eva Gorobets",
    description:
      "Executive portraits, leadership headshots and corporate event photography for international companies based in Tokyo. Briefing in English, Japanese and Russian. Fast delivery.",
    openGraph: {
      title: "Corporate Photography Tokyo — For International Companies",
      description:
        "Executive portraits and event coverage for global companies with Tokyo offices. Structured process, fast turnaround, trilingual communication.",
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

// Mix: portraits + one corporate moment for the hero gallery
const heroGallery = [
  portraitsGallery[0],
  corporateGallery[0],
  portraitsGallery[2],
  corporateGallery[4],
  portraitsGallery[5],
  corporateGallery[3],
];

const content = {
  en: {
    eyebrow: "For International Companies in Tokyo",
    h1: "Photography your Tokyo office can commission directly",
    p1: "Your Tokyo team needs portraits for the new regional director, coverage of next month\u2019s all-hands, or headshots for the APAC leadership page. Eva Gorobets handles the full process — brief, shoot, delivery — without escalating to your London or New York office for coordination.",
    p2: "Communication in English, Japanese and Russian. Your Japanese office manager can brief directly. Your global PR team gets press-ready files. Corporate invoicing in JPY, AUD or USD. NDA available on request.",
    p2Bold: "English, Japanese and Russian",
    ctaPrimary: "Submit a brief",
    ctaSecondary: "See client sectors \u2192",
    coversLabel: "What we cover",
    covers: [
      {
        title: "Leadership Portraits",
        detail: ["New hire headshots on a rolling basis", "C-suite and board portraits", "APAC leadership page updates", "Speaker bios and media kit images", "LinkedIn and company directory photos"],
      },
      {
        title: "Corporate Events",
        detail: ["Annual conferences and forums", "Internal all-hands and town halls", "Client dinners and receptions", "Product launches and press events", "AGMs and board-level events"],
      },
      {
        title: "On-Retainer Coverage",
        detail: ["Monthly or quarterly portrait sessions", "Priority availability for short-notice events", "Consistent visual style across all materials", "Single point of contact, no re-briefing", "Dedicated delivery portal on request"],
      },
    ],
    trilingualLabel: "Why trilingual matters",
    trilingualH2: "Your Tokyo staff and your global HQ can both brief directly — in their own language",
    trilingualBody: "Most photographers working in Tokyo operate only in Japanese, which puts the briefing burden on your local office. Eva works equally in English, Japanese and Russian — meaning your HR business partner in London emails in English, your Tokyo office manager follows up in Japanese, and nothing is lost between them.",
    languages: [
      ["English", "Primary communication with global HQ, PR and legal teams"],
      ["Japanese", "Direct liaison with Tokyo office management and venue staff"],
      ["Russian", "For Russian-speaking executives and diplomatic clients"],
    ],
    processLabel: "How it works",
    process: [
      ["01", "Submit a brief", "Use the structured form — takes under three minutes. No phone call required at this stage."],
      ["02", "Confirmation within 24 hours", "Availability confirmed, quote sent. Corporate PO process and NDA handled here if needed."],
      ["03", "Pre-shoot call or email", "Shot list, location, schedule and any brand guidelines reviewed. In English or Japanese."],
      ["04", "Session", "On-site, on time. Discreet, self-directed. No day-of managing required from your side."],
      ["05", "Delivery", "Separated file sets for web, print and social. Delivered within 3\u20135 business days as standard."],
      ["06", "Invoice", "JPY, AUD or USD. Standard net-30 for corporate accounts. Receipts for accounts payable."],
    ],
    termsLabel: "Corporate terms",
    terms: [
      ["NDA", "Available on request before briefing"],
      ["Invoicing", "JPY \u00b7 AUD \u00b7 USD \u00b7 Net-30"],
      ["Confidentiality", "Client names not published without consent"],
      ["Location", "Any district in Tokyo \u00b7 available nationwide"],
    ],
    testimonial: "\u201cOur Tokyo HR team briefed in Japanese, our London comms team received the files in English \u2014 Eva managed both sides without a single dropped message. The portraits went live on our global site within a week of the session.\u201d",
    testimonialBy: "Head of Global Communications \u2014 International Consulting Firm, Tokyo",
    ctaH2: "Ready to brief?",
    ctaSub: "Response within 24 hours. No phone call required.",
    ctaBtn: "Submit a brief",
  },
  jp: {
    eyebrow: "東京在勤の外資系企業様へ",
    h1: "東京オフィスから直接依頼できる法人撮影",
    p1: "新しい地域責任者のポートレート、翌月の全社集会の記録、APACリーダーシップページ用のヘッドショット。エヴァ・ゴロベッツが全プロセスを担当します。ロンドンやニューヨークの本社に調整を戻す必要はありません。",
    p2: "日本語・英語・ロシア語でコミュニケーション可能。東京オフィスのマネージャーが直接ブリーフできます。グローバルPRチームにはプレス対応ファイルを納品。法人請求はJPY・AUD・USD対応。NDAはご要望に応じて対応。",
    p2Bold: "日本語・英語・ロシア語",
    ctaPrimary: "ブリーフを送る",
    ctaSecondary: "クライアント実績を見る \u2192",
    coversLabel: "撮影対応内容",
    covers: [
      {
        title: "リーダーシップポートレート",
        detail: ["新入社員ヘッドショット（随時対応）", "C-スイート・取締役会ポートレート", "APACリーダーシップページ更新用写真", "登壇者プロフィール・メディアキット画像", "LinkedIn・社内ディレクトリ用写真"],
      },
      {
        title: "コーポレートイベント",
        detail: ["年次会議・フォーラム", "全社集会・タウンホール", "クライアントディナー・レセプション", "製品発表・プレスイベント", "株主総会・取締役レベルイベント"],
      },
      {
        title: "顧問契約カバレッジ",
        detail: ["月次・四半期ごとのポートレートセッション", "急な依頼への優先対応", "全素材に一貫したビジュアルスタイル", "担当窓口一本化・再ブリーフ不要", "専用納品ポータル（ご要望に応じて）"],
      },
    ],
    trilingualLabel: "トリリンガル対応の強み",
    trilingualH2: "東京スタッフも本社チームも、それぞれの言語で直接ブリーフできます",
    trilingualBody: "東京で活動する多くのフォトグラファーは日本語のみ対応で、ブリーフの負担が現地オフィスに集中します。エヴァは英語・日本語・ロシア語で対応可能なため、ロンドンの人事担当者が英語でメールし、東京のオフィスマネージャーが日本語でフォローアップしても、情報は一切失われません。",
    languages: [
      ["英語", "グローバル本社・PR・法務チームとの主要コミュニケーション"],
      ["日本語", "東京オフィス管理部門・会場スタッフとの直接連絡"],
      ["ロシア語", "ロシア語を話す経営幹部・外交関係のクライアント対応"],
    ],
    processLabel: "進め方",
    process: [
      ["01", "ブリーフを送る", "フォームへの入力は3分以内。この段階では電話不要です。"],
      ["02", "24時間以内に確認", "空き状況確認・見積もり送付。必要に応じてPO対応・NDAsはこの段階で処理します。"],
      ["03", "撮影前の確認", "ショットリスト・場所・スケジュール・ブランドガイドラインを確認。英語または日本語で。"],
      ["04", "撮影当日", "現場に定刻到着。控えめかつ自律的に対応。当日の指示出し不要です。"],
      ["05", "納品", "Web・印刷・SNS用にファイルを分けて納品。標準3〜5営業日。"],
      ["06", "請求書発行", "JPY・AUD・USD対応。法人アカウントは標準Net-30。経理部門向け領収書も対応。"],
    ],
    termsLabel: "法人向け条件",
    terms: [
      ["NDA", "ブリーフ前にご要望に応じて対応"],
      ["請求通貨", "JPY \u00b7 AUD \u00b7 USD \u00b7 Net-30"],
      ["守秘義務", "書面での同意なくクライアント名を公開しません"],
      ["撮影場所", "東京全区対応 \u00b7 国内出張可"],
    ],
    testimonial: "\u300c東京のHRチームが日本語でブリーフし、ロンドンのコミュニケーションチームが英語でファイルを受け取りました。エヴァはどちらの側も一つの抜けもなく管理してくれました。撮影から1週間以内にグローバルサイトにポートレートが掲載されました。\u300d",
    testimonialBy: "グローバルコミュニケーション部長 \u2014 国際コンサルティングファーム、東京",
    ctaH2: "ブリーフを送りますか？",
    ctaSub: "24時間以内に返信。電話不要です。",
    ctaBtn: "ブリーフを送る",
  },
  ru: {
    eyebrow: "Для международных компаний в Токио",
    h1: "Корпоративная фотосъёмка, которую ваш токийский офис заказывает напрямую",
    p1: "Вашей токийской команде нужны портреты нового регионального директора, съёмка предстоящего all-hands или обновление фотографий для страницы руководства APAC. Ева Горобец ведёт весь процесс — бриф, съёмка, сдача — без необходимости подключать офис в Лондоне или Нью-Йорке.",
    p2: "Коммуникация на английском, японском и русском языках. Менеджер токийского офиса может передать бриф напрямую. Глобальная PR-команда получает файлы, готовые к публикации. Корпоративные счета в JPY, AUD или USD. NDA по запросу.",
    p2Bold: "английском, японском и русском",
    ctaPrimary: "Отправить бриф",
    ctaSecondary: "Клиентские сектора \u2192",
    coversLabel: "Что включает съёмка",
    covers: [
      {
        title: "Портреты руководства",
        detail: ["Портреты новых сотрудников на постоянной основе", "Съёмка C-suite и совета директоров", "Обновление APAC-страницы руководства", "Фото для биографий спикеров и медиа-кит", "Портреты для LinkedIn и корпоративного справочника"],
      },
      {
        title: "Корпоративные мероприятия",
        detail: ["Ежегодные конференции и форумы", "Общие собрания и town hall", "Клиентские ужины и приёмы", "Презентации продуктов и пресс-события", "Общие собрания акционеров и заседания совета"],
      },
      {
        title: "Съёмка по подписке",
        detail: ["Ежемесячные или ежеквартальные портретные сессии", "Приоритетная доступность для срочных событий", "Единый визуальный стиль для всех материалов", "Единая точка контакта, без повторных брифов", "Отдельный портал для доставки файлов по запросу"],
      },
    ],
    trilingualLabel: "Преимущество трёхязычной работы",
    trilingualH2: "Токийский персонал и глобальный HQ могут общаться напрямую — каждый на своём языке",
    trilingualBody: "Большинство фотографов в Токио работают только на японском, и вся нагрузка по координации ложится на местный офис. Ева работает одинаково на английском, японском и русском: HR-партнёр в Лондоне пишет по-английски, менеджер токийского офиса уточняет по-японски — и ничего не теряется между ними.",
    languages: [
      ["Английский", "Основная коммуникация с глобальным HQ, PR и юридическими командами"],
      ["Японский", "Прямая связь с администрацией токийского офиса и персоналом площадки"],
      ["Русский", "Для русскоязычных руководителей и дипломатических клиентов"],
    ],
    processLabel: "Как это работает",
    process: [
      ["01", "Отправить бриф", "Заполнение структурированной формы занимает менее трёх минут. Звонок на этом этапе не нужен."],
      ["02", "Подтверждение в течение 24 часов", "Подтверждение наличия, отправка коммерческого предложения. При необходимости — PO и NDA."],
      ["03", "Звонок или письмо перед съёмкой", "Обсуждение списка кадров, локации, расписания и брендбука. На английском или японском."],
      ["04", "Съёмка", "На месте, вовремя. Ненавязчиво, без необходимости управлять процессом с вашей стороны."],
      ["05", "Сдача", "Файлы для web, печати и соцсетей — отдельно. Стандарт: 3–5 рабочих дней."],
      ["06", "Счёт", "JPY, AUD или USD. Net-30 для корпоративных аккаунтов. Документы для бухгалтерии."],
    ],
    termsLabel: "Корпоративные условия",
    terms: [
      ["NDA", "По запросу до передачи брифа"],
      ["Выставление счетов", "JPY \u00b7 AUD \u00b7 USD \u00b7 Net-30"],
      ["Конфиденциальность", "Имена клиентов не публикуются без согласия"],
      ["Локация", "Любой район Токио \u00b7 выезд по Японии"],
    ],
    testimonial: "\u00abТокийская HR-команда брифовала по-японски, лондонская команда по коммуникациям получила файлы на английском — Ева вела обе стороны без единого сбоя. Портреты появились на нашем глобальном сайте в течение недели после съёмки.\u00bb",
    testimonialBy: "Руководитель глобальных коммуникаций \u2014 международная консалтинговая компания, Токио",
    ctaH2: "Готовы отправить бриф?",
    ctaSub: "Ответ в течение 24 часов. Звонок не нужен.",
    ctaBtn: "Отправить бриф",
  },
} as const;

type Locale = keyof typeof content;

export default async function CorporatePage({ params }: PageProps) {
  const { locale } = await params;
  const t = content[(locale as Locale) in content ? (locale as Locale) : "en"];

  return (
    <>
      {/* Hero */}
      <section className="section pt-32">
        <p className="label mb-6">{t.eyebrow}</p>
        <h1
          className="max-w-4xl text-[clamp(3rem,7vw,6.5rem)] leading-[0.93]"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
        >
          {t.h1}
        </h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <p className="text-sm text-black/60 leading-relaxed">{t.p1}</p>
          <p className="text-sm text-black/60 leading-relaxed">
            Communication in <strong className="font-normal text-black/80">{t.p2Bold}</strong>.{" "}
            {t.p2.slice(t.p2.indexOf(".") + 2)}
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href={`/${locale}/contact-booking`} className="btn">
            {t.ctaPrimary}
          </Link>
          <Link href={`/${locale}/clients`} className="btn-ghost">
            {t.ctaSecondary}
          </Link>
        </div>
      </section>

      {/* Gallery */}
      <section className="section pt-0">
        <EditorialGallery items={heroGallery} />
      </section>

      {/* What this covers */}
      <section className="section border-t border-black/[0.07]">
        <p className="label mb-10">{t.coversLabel}</p>
        <div className="grid gap-y-0 md:grid-cols-3">
          {t.covers.map(({ title, detail }) => (
            <div key={title} className="border-t border-black/[0.07] py-10 pr-0 md:pr-12">
              <h2
                className="text-2xl mb-6"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
              >
                {title}
              </h2>
              <ul>
                {detail.map((item) => (
                  <li key={item} className="border-t border-black/[0.07] py-3 text-sm text-black/60">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Trilingual advantage */}
      <section className="section border-t border-black/[0.07]">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <p className="label mb-6">{t.trilingualLabel}</p>
            <h2
              className="text-[clamp(1.8rem,3.5vw,3rem)] leading-[1.1] mb-6"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
            >
              {t.trilingualH2}
            </h2>
            <p className="text-sm text-black/60 leading-relaxed">{t.trilingualBody}</p>
          </div>
          <div className="flex flex-col justify-center">
            <ul>
              {t.languages.map(([lang, desc]) => (
                <li key={lang} className="flex gap-6 border-t border-black/[0.07] py-5">
                  <span
                    className="w-24 shrink-0 text-xl"
                    style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
                  >
                    {lang}
                  </span>
                  <span className="text-sm text-black/55 leading-relaxed self-center">{desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section border-t border-black/[0.07]">
        <p className="label mb-10">{t.processLabel}</p>
        <ol className="grid gap-y-0 md:grid-cols-2">
          {t.process.map(([n, step, detail]) => (
            <li key={n} className="flex gap-6 border-t border-black/[0.07] py-7">
              <span
                className="w-12 shrink-0 text-[clamp(2.1rem,4vw,3.2rem)] leading-none text-black/12 select-none"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
              >
                {n}
              </span>
              <div>
                <span
                  className="block text-xl mb-1"
                  style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
                >
                  {step}
                </span>
                <span className="text-sm text-black/50 leading-relaxed">{detail}</span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Corporate terms */}
      <section className="section border-t border-black/[0.07]">
        <p className="label mb-6">{t.termsLabel}</p>
        <div className="grid gap-4 md:grid-cols-4">
          {t.terms.map(([title, detail]) => (
            <div key={title} className="border-t border-black/[0.07] py-6 pr-6">
              <p className="label mb-2">{title}</p>
              <p className="text-sm text-black/60 leading-relaxed">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="section border-t border-black/[0.07]">
        <blockquote className="max-w-2xl">
          <p
            className="text-[clamp(1.4rem,3vw,2.4rem)] leading-[1.2] text-black/80"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontStyle: "italic" }}
          >
            {t.testimonial}
          </p>
          <footer className="mt-5">
            <span className="label">{t.testimonialBy}</span>
          </footer>
        </blockquote>
      </section>

      {/* CTA */}
      <section className="section border-t border-black/[0.07] !py-6">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              className="text-[clamp(2rem,4.5vw,4rem)] leading-[0.95]"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
            >
              {t.ctaH2}
            </h2>
            <p className="mt-3 text-sm text-black/50">{t.ctaSub}</p>
          </div>
          <Link href={`/${locale}/contact-booking`} className="btn">
            {t.ctaBtn}
          </Link>
        </div>
      </section>
    </>
  );
}

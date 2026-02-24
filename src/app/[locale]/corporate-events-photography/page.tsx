import type { Metadata } from "next";
import Link from "next/link";

import { CurrencyOptions } from "@/components/CurrencyOptions";
import { EditorialGallery } from "@/components/EditorialGallery";
import { getCorporateGallery } from "@/lib/gallery-data";

type PageProps = { params: Promise<{ locale: string }> };

const BASE_URL = "https://evagorobets.com";

const eventsContent = {
  en: {
    eyebrow: "Corporate Events",
    h1: "Corporate Events Photography in Tokyo",
    p1: "Structured, discreet coverage for conferences, internal events, client activations, board meetings and product launches. I work from a pre-agreed timeline and shot list so you receive everything you need — without directing on the day.",
    p2: "Coverage delivered in separate sets for internal use, PR and social media. Fast turnaround as standard. Available for single-day and multi-day events in Tokyo and across Japan.",
    ctaBtn: "Enquire about Event Coverage",
    ctaBtnPdf: "Download Events PDF Portfolio",
    columns: [
      {
        title: "Event Types",
        items: ["Conferences & forums", "Internal team events", "Client activations", "Board meetings", "Product launches", "Annual general meetings"],
      },
      {
        title: "Process",
        items: ["Pre-event briefing call", "Timeline and shot list", "On-site discreet coverage", "Same-day highlight option", "Post-event gallery delivery"],
      },
      {
        title: "Delivery Sets",
        items: ["Internal online gallery", "Curated PR selection", "Social-media pack (cropped)", "High-resolution print files", "Captioned press set on request"],
      },
    ],
    quote: "\u201cWe worked with Eva on major public-scale events. I especially value her high professionalism and strong discipline on set.\u201d",
    by: "Sayat Boranbekov, President, PetroMining Association",
    pricingLabel: "Coverage Options",
    pricingLabels: ["Half-day coverage (up to 4 hrs)", "Full-day coverage (up to 8 hrs)", "Multi-day rate (per day)"],
    pricingNote: "Includes pre-event briefing, on-site coverage and structured delivery sets.",
    ctaH2: "Planning an event?",
    ctaBtn2: "Enquire about Event Coverage",
  },
  jp: {
    eyebrow: "コーポレートイベント",
    h1: "東京コーポレートイベント撮影",
    p1: "会議、社内イベント、クライアントアクティベーション、取締役会、製品発表会など、体系的・目立たない撮影。事前に合意したタイムラインとショットリストに沿って進めるため、当日の指示なしに必要なすべてをお届けします。",
    p2: "社内利用、PR、ソーシャルメディア用に分けて納品。迅速なターンアラウンドを標準提供。東京および日本全国での1日・複数日イベントに対応。",
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
    quote: "\u300c私たちは大規模な公的イベントでエヴァとご一緒しました。特に高いプロ意識と、現場での確かな規律ある対応を高く評価しています。\u300d",
    by: "Sayat Boranbekov（PetroMining Association 会長）",
    pricingLabel: "撮影プラン",
    pricingLabels: ["ハーフデイ撮影（4時間まで）", "フルデイ撮影（8時間まで）", "複数日料金（1日あたり）"],
    pricingNote: "事前ブリーフィング、現地撮影、構造化された納品セットを含みます。",
    ctaH2: "イベントをご予定ですか？",
    ctaBtn2: "イベント撮影のお問い合わせ",
  },
  ru: {
    eyebrow: "Корпоративные мероприятия",
    h1: "Съёмка корпоративных мероприятий в Токио",
    p1: "Структурированная, ненавязчивая съёмка конференций, внутренних мероприятий, клиентских активаций, заседаний совета директоров и запусков продуктов. Работаю по заранее согласованному расписанию и списку кадров — вы получаете всё необходимое без управления в день съёмки.",
    p2: "Материалы поставляются отдельными наборами для внутреннего использования, PR и социальных сетей. Быстрый тёрнараунд в стандартной комплектации. Доступна для однодневных и многодневных мероприятий в Токио и по всей Японии.",
    ctaBtn: "Запросить съёмку мероприятия",
    ctaBtnPdf: "Скачать PDF-портфолио мероприятий",
    columns: [
      {
        title: "Типы мероприятий",
        items: ["Конференции и форумы", "Внутренние мероприятия", "Клиентские активации", "Заседания совета директоров", "Запуски продуктов", "Годовые общие собрания"],
      },
      {
        title: "Процесс",
        items: ["Предварительный брифинг", "График и список кадров", "Ненавязчивая съёмка на месте", "Вариант с выборкой в день съёмки", "Доставка галереи после мероприятия"],
      },
      {
        title: "Наборы для сдачи",
        items: ["Внутренняя онлайн-галерея", "Отборная PR-подборка", "Пак для соцсетей (обрезанный)", "Высококачественные файлы для печати", "Набор с подписями для прессы по запросу"],
      },
    ],
    quote: "\u00abМы сотрудничали с Евгенией в рамках мероприятий государственного масштаба. Особенно хочу отметить высокий профессионализм и чёткую дисциплину в работе.\u00bb",
    by: "Саят Боранбеков, президент PetroMining Association",
    pricingLabel: "Варианты покрытия",
    pricingLabels: ["Полдня (до 4 часов)", "Полный день (до 8 часов)", "Многодневная ставка (в день)"],
    pricingNote: "Включает предварительный брифинг, съёмку на месте и структурированные наборы для сдачи.",
    ctaH2: "Планируете мероприятие?",
    ctaBtn2: "Запросить съёмку мероприятия",
  },
} as const;

type Locale = keyof typeof eventsContent;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = "/corporate-events-photography";
  const seo = {
    en: {
      title: "Corporate Event Photographer Tokyo — Conferences, Forums & Internal Events | Eva Gorobets",
      description:
        "Structured corporate event photography in Tokyo. Conferences, AGMs, product launches, client receptions. PR and social media delivery sets. Available across Japan.",
      ogTitle: "Corporate Event Photographer Tokyo",
      ogDescription:
        "Coverage for corporate conferences, forums and internal events in Tokyo. Structured process, fast delivery, trilingual communication.",
    },
    jp: {
      title: "東京コーポレートイベント撮影 — 会議・フォーラム・社内イベント | Eva Gorobets",
      description:
        "東京の法人イベント撮影。会議、株主総会、製品発表、レセプションまで対応。PR・SNS向け納品セットを提供。日本全国で撮影可能。",
      ogTitle: "東京コーポレートイベント撮影",
      ogDescription:
        "会議・フォーラム・社内イベントを構造化プロセスで撮影。迅速納品、3言語コミュニケーション。",
    },
    ru: {
      title: "Фотограф корпоративных мероприятий в Токио — конференции и внутренние события | Eva Gorobets",
      description:
        "Структурированная съёмка корпоративных мероприятий в Токио: конференции, AGMs, продуктовые запуски, клиентские приёмы. Отдельные наборы для PR и соцсетей. Работа по всей Японии.",
      ogTitle: "Фотограф корпоративных мероприятий в Токио",
      ogDescription:
        "Съёмка конференций, форумов и внутренних мероприятий в Токио. Чёткий процесс, быстрая сдача и трёхъязычная коммуникация.",
    },
  } as const;
  const s = seo[(locale as keyof typeof seo) in seo ? (locale as keyof typeof seo) : "en"];

  return {
    title: s.title,
    description: s.description,
    openGraph: {
      title: s.ogTitle,
      description: s.ogDescription,
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

export default async function CorporateEventsPage({ params }: PageProps) {
  const { locale } = await params;
  const corporateGallery = await getCorporateGallery();
  const tE = eventsContent[(locale as Locale) in eventsContent ? (locale as Locale) : "en"];

  const jpyPrices = ["from ¥155,000", "from ¥255,000", "from ¥222,000"];
  const audPrices = ["from A$1,720", "from A$2,830", "from A$2,470"];

  return (
    <>
      <section className="section pt-32">
        <p className="label mb-6">{tE.eyebrow}</p>
        <h1
          className="max-w-3xl text-[clamp(3rem,7vw,6rem)] leading-[0.95]"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
        >
          {tE.h1}
        </h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <p className="text-sm text-black/60 leading-relaxed">{tE.p1}</p>
          <p className="text-sm text-black/60 leading-relaxed">{tE.p2}</p>
        </div>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href={`/${locale}/contact-booking`} className="btn">
            {tE.ctaBtn}
          </Link>
          <a href="/commission-portfolio-events.pdf" download className="btn-ghost">
            {tE.ctaBtnPdf}
          </a>
        </div>
      </section>

      <section className="section pt-0">
        <EditorialGallery items={corporateGallery} />
      </section>

      <section className="section grid gap-16 border-t border-black/[0.07] md:grid-cols-3">
        {tE.columns.map(({ title, items }) => (
          <div key={title}>
            <p className="label mb-8">{title}</p>
            <ul>
              {items.map((item) => (
                <li key={item} className="border-t border-black/[0.07] py-4 text-sm text-black/65">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Testimonial */}
      <section className="section border-t border-black/[0.07]">
        <blockquote className="max-w-2xl">
          <p
            className="text-[clamp(1.4rem,3vw,2.4rem)] leading-[1.2] text-black/80"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontStyle: "italic" }}
          >
            {tE.quote}
          </p>
          <footer className="mt-5">
            <span className="label">{tE.by}</span>
          </footer>
        </blockquote>
      </section>

      <section className="section border-t border-black/[0.07]">
        <CurrencyOptions
          sectionLabel={tE.pricingLabel}
          packagesJPY={tE.pricingLabels.map((label, i) => ({ label, price: jpyPrices[i] }))}
          packagesAUD={tE.pricingLabels.map((label, i) => ({ label, price: audPrices[i] }))}
          footerNote={tE.pricingNote}
        />
      </section>

      <section className="section border-t border-black/[0.07] py-6!">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <h2
            className="text-[clamp(2rem,4.5vw,4rem)] leading-[0.95]"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
          >
            {tE.ctaH2}
          </h2>
          <Link href={`/${locale}/contact-booking`} className="btn">
            {tE.ctaBtn2}
          </Link>
        </div>
      </section>
    </>
  );
}

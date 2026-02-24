import type { Metadata } from "next";
import Link from "next/link";

import { CurrencyOptions } from "@/components/CurrencyOptions";
import { EditorialGallery } from "@/components/EditorialGallery";
import { getCorporateGallery } from "@/lib/gallery-data";

type PageProps = { params: Promise<{ locale: string }> };

const BASE_URL = "https://evagorobets.com";

const testimonialContent = {
  en: {
    quote:
      "\u201cWe worked with Eva on major public-scale events. I especially value her high professionalism and strong discipline on set.\u201d",
    by: "Sayat Boranbekov, President, PetroMining Association",
  },
  jp: {
    quote:
      "\u300c私たちは大規模な公的イベントでエヴァとご一緒しました。特に高いプロ意識と、現場での確かな規律ある対応を高く評価しています。\u300d",
    by: "Sayat Boranbekov（PetroMining Association 会長）",
  },
  ru: {
    quote:
      "\u00abМы сотрудничали с Евгенией в рамках мероприятий государственного масштаба. Особенно хочу отметить высокий профессионализм и чёткую дисциплину в работе.\u00bb",
    by: "Саят Боранбеков, президент PetroMining Association",
  },
} as const;

type Locale = keyof typeof testimonialContent;

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
  const t = testimonialContent[(locale as Locale) in testimonialContent ? (locale as Locale) : "en"];

  return (
    <>
      <section className="section pt-32">
        <p className="label mb-6">Corporate Events</p>
        <h1
          className="max-w-3xl text-[clamp(3rem,7vw,6rem)] leading-[0.95]"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
        >
          Corporate Events Photography in Tokyo
        </h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <p className="text-sm text-black/60 leading-relaxed">
            Structured, discreet coverage for conferences, internal events, client activations,
            board meetings and product launches. I work from a pre-agreed timeline and shot
            list so you receive everything you need — without directing on the day.
          </p>
          <p className="text-sm text-black/60 leading-relaxed">
            Coverage delivered in separate sets for internal use, PR and social media.
            Fast turnaround as standard. Available for single-day and multi-day events in
            Tokyo and across Japan.
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href={`/${locale}/contact-booking`} className="btn">
            Enquire about Event Coverage
          </Link>
          <a href="/commission-portfolio-events.pdf" download className="btn-ghost">
            Download Events PDF Portfolio
          </a>
        </div>
      </section>

      <section className="section pt-0">
        <EditorialGallery items={corporateGallery} />
      </section>

      <section className="section grid gap-16 border-t border-black/[0.07] md:grid-cols-3">
        {[
          {
            title: "Event Types",
            items: [
              "Conferences & forums",
              "Internal team events",
              "Client activations",
              "Board meetings",
              "Product launches",
              "Annual general meetings",
            ],
          },
          {
            title: "Process",
            items: [
              "Pre-event briefing call",
              "Timeline and shot list",
              "On-site discreet coverage",
              "Same-day highlight option",
              "Post-event gallery delivery",
            ],
          },
          {
            title: "Delivery Sets",
            items: [
              "Internal online gallery",
              "Curated PR selection",
              "Social-media pack (cropped)",
              "High-resolution print files",
              "Captioned press set on request",
            ],
          },
        ].map(({ title, items }) => (
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
            {t.quote}
          </p>
          <footer className="mt-5">
            <span className="label">{t.by}</span>
          </footer>
        </blockquote>
      </section>

      <section className="section border-t border-black/[0.07]">
        <CurrencyOptions
          sectionLabel="Coverage Options"
          packagesJPY={[
            { label: "Half-day coverage (up to 4 hrs)", price: "from ¥155,000" },
            { label: "Full-day coverage (up to 8 hrs)", price: "from ¥255,000" },
            { label: "Multi-day rate (per day)", price: "from ¥222,000" },
          ]}
          packagesAUD={[
            { label: "Half-day coverage (up to 4 hrs)", price: "from A$1,720" },
            { label: "Full-day coverage (up to 8 hrs)", price: "from A$2,830" },
            { label: "Multi-day rate (per day)", price: "from A$2,470" },
          ]}
          footerNote="Includes pre-event briefing, on-site coverage and structured delivery sets."
        />
      </section>

      <section className="section border-t border-black/[0.07] py-6!">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <h2
            className="text-[clamp(2rem,4.5vw,4rem)] leading-[0.95]"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
          >
            Planning an event?
          </h2>
          <Link href={`/${locale}/contact-booking`} className="btn">
            Enquire about Event Coverage
          </Link>
        </div>
      </section>
    </>
  );
}

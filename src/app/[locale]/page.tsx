import Link from "next/link";

import { EditorialGallery } from "@/components/EditorialGallery";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { getFeaturedGallery } from "@/lib/gallery-data";

type PageProps = { params: Promise<{ locale: string }> };

const content = {
  en: {
    heroName: "Eva Gorobets",
    heroTitle: "Photographer",
    heroDescriptor: "Tokyo — Melbourne — Worldwide",
    eyebrow: "Tokyo · Melbourne · Worldwide",
    h1: ["Portrait &", "Corporate", "Photographer"],
    subhero: "Business portraits, corporate events and art world photography.\nAustralian photographer based in Tokyo.",
    cta1: "Business Portraits",
    cta2: "Art & Galleries",
    cta3: "Book a Session",
    servicesLabel: "Services",
    services: [
      {
        num: "01",
        title: "Business Portraits",
        text: "Executive headshots and brand portraits for leaders, founders and creatives working at international level.",
        link: "View works",
      },
      {
        num: "02",
        title: "Corporate Events",
        text: "Conference and event coverage with structured planning, discreet presence and fast delivery for PR and social.",
        link: "View works",
      },
      {
        num: "03",
        title: "Art & Galleries",
        text: "Vernissages, artist portraits and artwork documentation for galleries, museums and curators.",
        link: "View works",
      },
    ],
    selectedWork: "Selected Works",
    testimonial: '"Working with Eva is always highly collaborative. She makes people feel at ease on set, gives expert direction, and consistently delivers top-class photography for our publications and campaigns."',
    testimonialBy: "Danielle Chung, Senior Client Services Manager, ANZSAP Magazine",
    aboutLabel: "About",
    aboutH2: ["Australian photographer", "based in Tokyo"],
    aboutBody: "Melbourne background, deep connection to the art world. Communication in Russian, English and Japanese.",
    aboutLink: "About Eva",
    workingLabel: "Working with clients in",
    workingList: ["Japan — Tokyo, Osaka, Kyoto", "Australia — Melbourne, Sydney", "International clients worldwide"],
    ctaH2: "Ready to work together?",
    ctaBtn: "Contact / Book"
  },
  jp: {
    heroName: "Eva Gorobets",
    heroTitle: "Photographer",
    heroDescriptor: "東京 コーポレート & アートワールド フォトグラファー",
    eyebrow: "東京 · メルボルン · 世界各地",
    h1: ["ポートレート &", "コーポレート", "フォトグラファー"],
    subhero: "ビジネスポートレート、コーポレートイベント、アート写真。\n東京在住のオーストラリア人フォトグラファー。",
    cta1: "ビジネスポートレート",
    cta2: "アート＆ギャラリー",
    cta3: "撮影を予約する",
    servicesLabel: "サービス",
    services: [
      {
        num: "01",
        title: "ビジネスポートレート",
        text: "経営幹部・創業者・クリエイターのためのエグゼクティブヘッドショットおよびブランドポートレート。",
        link: "作品を見る",
      },
      {
        num: "02",
        title: "コーポレートイベント",
        text: "会議・イベントの撮影。事前の綿密な計画、控えめな存在感、PRおよびSNS用の迅速な納品。",
        link: "作品を見る",
      },
      {
        num: "03",
        title: "アート＆ギャラリー",
        text: "ヴェルニサージュ、アーティストポートレート、ギャラリー・美術館・キュレーター向けの作品ドキュメント。",
        link: "作品を見る",
      },
    ],
    selectedWork: "セレクテッドワーク",
    fullPortfolio: "全ポートフォリオ",
    testimonial: "「エヴァとの仕事は、いつも協働的でスムーズです。現場で人をリラックスさせる力があり、的確なディレクションで、私たちの出版物やキャンペーン向けに常に高品質な写真を提供してくれます。」",
    testimonialBy: "Danielle Chung（ANZSAP Magazine シニア・クライアントサービス・マネージャー）",
    aboutLabel: "プロフィール",
    aboutH2: ["東京を拠点とする", "オーストラリア人フォトグラファー"],
    aboutBody: "メルボルン出身。アートの世界に深い造詣を持つ。ロシア語・英語・日本語でのコミュニケーションが可能。",
    aboutLink: "エヴァについて",
    workingLabel: "活動地域",
    workingList: ["日本 — 東京・大阪・京都", "オーストラリア — メルボルン・シドニー", "世界各地のクライアント対応可"],
    ctaH2: "一緒に仕事をしませんか？",
    ctaBtn: "お問い合わせ・予約",
    ctaEmail: "メール",
  },
  ru: {
    heroName: "Eva Gorobets",
    heroTitle: "Photographer",
    heroDescriptor: "Корпоративный и арт-фотограф в Токио",
    eyebrow: "Токио · Мельбурн · Весь мир",
    h1: ["Портретный &", "корпоративный", "фотограф"],
    subhero: "Бизнес-портреты, корпоративные мероприятия и фотография арт-мира.\nАвстралийский фотограф, живущий в Токио.",
    cta1: "Бизнес-портреты",
    cta2: "Арт и галереи",
    cta3: "Забронировать съёмку",
    servicesLabel: "Услуги",
    services: [
      {
        num: "01",
        title: "Бизнес-портреты",
        text: "Официальные портреты и личный брендинг для руководителей, основателей и творческих профессионалов международного уровня.",
        link: "Смотреть работы",
      },
      {
        num: "02",
        title: "Корпоративные мероприятия",
        text: "Съёмка конференций и событий: чёткое планирование, ненавязчивое присутствие, быстрая доставка для PR и соцсетей.",
        link: "Смотреть работы",
      },
      {
        num: "03",
        title: "Арт и галереи",
        text: "Вернисажи, портреты художников и документация произведений для галерей, музеев и кураторов.",
        link: "Смотреть работы",
      },
    ],
    selectedWork: "Избранные работы",
    fullPortfolio: "Полное портфолио",
    testimonial: "«С Евой всегда очень комфортно и по-настоящему совместно работать. Она легко помогает людям расслабиться на съёмке, чётко направляет процесс и стабильно даёт фотографии высокого класса для наших публикаций и кампаний.»",
    testimonialBy: "Danielle Chung, Senior Client Services Manager, ANZSAP Magazine",
    aboutLabel: "О фотографе",
    aboutH2: ["Австралийский фотограф,", "живущий в Токио"],
    aboutBody: "Мельбурнские корни, глубокая связь с миром искусства. Общение на русском, английском и японском языках.",
    aboutLink: "Об Еве",
    workingLabel: "Работает с клиентами в",
    workingList: ["Япония — Токио, Осака, Киото", "Австралия — Мельбурн, Сидней", "Международные клиенты по всему миру"],
    ctaH2: "Готовы к сотрудничеству?",
    ctaBtn: "Связаться / Забронировать",
    ctaEmail: "Email",
  },
} as const;

type Locale = keyof typeof content;

export default async function LocaleHome({ params }: PageProps) {
  const { locale } = await params;
  const t = content[(locale as Locale) in content ? (locale as Locale) : "en"];
  const featuredGallery = await getFeaturedGallery();
  const anzsapUrl = "https://anzsapmagazine.com.au/";

  function linkifyAnzsap(text: string) {
    const parts = text.split(/(ANZSAP Magazine)/g);
    return parts.map((part, index) => {
      if (part === "ANZSAP Magazine") {
        return (
          <a
            key={`${part}-${index}`}
            href={anzsapUrl}
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
      {/* Hero slideshow */}
      <HeroSlideshow
        images={featuredGallery}
        name={t.heroName}
        title={t.heroTitle}
        descriptor={t.heroDescriptor}
        locale={locale}
      />

      {/* Services */}
      <section className="section border-t border-black/[0.07]">
        <p className="label mb-14">{t.servicesLabel}</p>
        <div className="grid md:grid-cols-3 md:divide-x md:divide-black/[0.07]">
          {[
            { num: t.services[0].num, title: t.services[0].title, text: t.services[0].text, link: t.services[0].link, href: `/${locale}/tokyo-business-portraits` },
            { num: t.services[1].num, title: t.services[1].title, text: t.services[1].text, link: t.services[1].link, href: `/${locale}/corporate-events-photography` },
            { num: t.services[2].num, title: t.services[2].title, text: t.services[2].text, link: t.services[2].link, href: `/${locale}/art-galleries-photography` },
          ].map((card) => (
            <article key={card.title} className="flex flex-col border-t border-black/[0.07] pt-8 pb-12 md:border-t-0 md:px-10 first:md:pl-0 last:md:pr-0">
              <span
                className="block text-[clamp(4rem,8vw,7rem)] leading-none text-black/10 mb-4 select-none"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
              >
                {card.num}
              </span>
              <h2
                className="text-[clamp(1.6rem,2.5vw,2.4rem)] leading-[1.05] mb-4"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
              >
                {card.title}
              </h2>
              <p className="text-sm text-black/55 leading-relaxed flex-1">{card.text}</p>
              <Link href={card.href} className="btn-ghost mt-8 self-start">
                {card.link}
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Selected work */}
      <section className="section border-t border-black/[0.07]">
        <div className="mb-10">
          <p className="label">{t.selectedWork}</p>
        </div>
        <EditorialGallery items={featuredGallery} compact />
      </section>

      {/* Testimonial */}
      <section className="section border-t border-black/[0.07]">
        <blockquote className="max-w-3xl">
          <p
            className="text-[clamp(1.5rem,3.5vw,2.8rem)] leading-[1.2] text-black/80"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400, fontStyle: "italic" }}
          >
            {t.testimonial}
          </p>
          <footer className="mt-6">
            <span className="label">{linkifyAnzsap(t.testimonialBy)}</span>
          </footer>
        </blockquote>
      </section>

      {/* About teaser + trust */}
      <section className="section grid gap-16 border-t border-black/[0.07] md:grid-cols-2">
        <div>
          <p className="label mb-6">{t.aboutLabel}</p>
          <h2
            className="text-[clamp(2rem,4vw,3.5rem)] leading-tight"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
          >
            {t.aboutH2[0]}<br />{t.aboutH2[1]}
          </h2>
          <p className="mt-6 max-w-sm text-sm text-black/60 leading-relaxed">
            {t.aboutBody}
          </p>
          <Link href={`/${locale}/about`} className="btn-ghost mt-8">
            {t.aboutLink}
          </Link>
        </div>
        <div className="flex flex-col justify-end">
          <p className="label mb-6">{t.workingLabel}</p>
          <ul>
            {t.workingList.map((item) => (
              <li key={item} className="border-b border-black/[0.07] py-3 text-sm text-black/70">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-black/[0.07] py-6!">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <h2
            className="text-[clamp(2rem,5vw,4.5rem)] leading-[0.95]"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
          >
            {t.ctaH2}
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={`/${locale}/contact-booking`} className="btn whitespace-nowrap">
              {t.ctaBtn}
            </Link>
            <a href="mailto:eva@artflaneur.com.au" className="btn-ghost whitespace-nowrap">
              {t.ctaEmail}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";

import { CurrencyOptions } from "@/components/CurrencyOptions";
import { EditorialGallery } from "@/components/EditorialGallery";
import { getPortraitsGallery } from "@/lib/gallery-data";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Executive Headshots & Business Portraits Tokyo | Eva Gorobets",
    description: "Professional executive headshots and leadership portraits in Tokyo. Studio and on-location. Used for company websites, LinkedIn, annual reports and press. Trilingual briefing.",
    openGraph: {
      title: "Executive Headshots & Business Portraits Tokyo",
      description: "Studio and on-location portrait sessions for executives, founders and leadership teams in Tokyo. Fast delivery, trilingual communication.",
    },
  };
}

const content = {
  en: {
    eyebrow: "Business Portraits",
    h1: "Tokyo Business Portraits & Executive Headshots",
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
      ["1", "Brief", "We discuss your goals, intended use and visual direction — in EN, JP or RU."],
      ["2", "Moodboard", "I share two or three reference images as a starting point before we meet."],
      ["3", "Session", "60\u201390 minutes. Guided, relaxed, efficient. You do not need to know how to pose."],
      ["4", "Selection", "You receive a proof gallery and choose your favourite frames."],
      ["5", "Delivery", "Retouched web and print-ready files. Delivered within 3\u20135 business days."],
    ],
    testimonial: "\u201cThe portraits Eva made for our Tokyo leadership team were used on the company website, in our annual report and across all press materials. The process was completely smooth.\u201d",
    testimonialBy: "Head of Communications, Global Consulting Firm \u2014 Tokyo",
    ctaH2: "Let\u2019s create your portrait.",
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
      ["1", "ブリーフ", "目的・用途・ビジュアル方向性について英語・日本語・ロシア語でお話しします。"],
      ["2", "ムードボード", "事前にリファレンス画像を2〜3点共有します。"],
      ["3", "撮影", "60〜90分。ガイド付きでリラックスした効率的な撮影。ポーズの知識は不要です。"],
      ["4", "セレクション", "プルーフギャラリーをお送りし、お好みのカットをお選びいただきます。"],
      ["5", "納品", "Web用・印刷用レタッチ済みファイル。3〜5営業日以内に納品。"],
    ],
    testimonial: "\u300cエヴァが撮影した東京リーダーシップチームのポートレートは、会社のウェブサイト、年次報告書、すべてのプレス素材に使用されました。プロセスは完全にスムーズでした。\u300d",
    testimonialBy: "グローバルコミュニケーション部長、国際コンサルティングファーム \u2014 東京",
    ctaH2: "あなたのポートレートを撮影しましょう。",
    ctaBtn: "ビジネスポートレートのお問い合わせ",
  },
  ru: {
    eyebrow: "Бизнес-портреты",
    h1: "Бизнес-портреты и корпоративные хэдшоты в Токио",
    p1: "Профессиональные портреты для руководителей, основателей, консультантов, художников и арт-менеджеров, которым нужна премиальная и убедительная визуальная идентичность. Съёмки выстраиваются вокруг позиционирования бренда, коммуникационных целей и практического использования на сайтах, в медиакитах и профилях выступающих.",
    p2: "Базируется в Токио, выезды в Мельбурн и за рубеж. Брифинг и общение на английском, японском и русском. Финальные ретушированные изображения — в течение трёх-пяти рабочих дней.",
    sessionTypesLabel: "Форматы съёмки",
    sessionTypes: [
      { title: "Студия", text: "Контролируемая среда с гладким или фактурным фоном. Чистый, вневременной результат для любого редакционного использования." },
      { title: "Локация", text: "Офис, коворкинг, отель или городская среда. Фон усиливает контекст вашей деятельности." },
      { title: "Творческий эдиториал", text: "Арт-направленные портреты для художников, кураторов и творческих профессионалов. Больше свободы, больше характера." },
    ],
    processLabel: "Процесс",
    process: [
      ["1", "Бриф", "Обсуждаем цели, способы использования и визуальное направление — на EN, JP или RU."],
      ["2", "Мудборд", "Делюсь двумя-тремя референсами для отправки точки отсчёта."],
      ["3", "Съёмка", "60–90 минут. С направлением, расслабленно, эффективно. Знание поз не требуется."],
      ["4", "Отбор", "Получаете превью-галерею и выбираете лучшие кадры."],
      ["5", "Доставка", "Ретушированные файлы для web и печати. В течение 3–5 рабочих дней."],
    ],
    testimonial: "\u00abПортреты, которые Ева сделала для нашей токийской команды руководства, использовались на корпоративном сайте, в годовом отчёте и во всех пресс-материалах. Процесс был полностью гладким.\u00bb",
    testimonialBy: "Директор по коммуникациям, международная консалтинговая компания \u2014 Токио",
    ctaH2: "Создадим ваш портрет.",
    ctaBtn: "Запрос на бизнес-портрет",
  },
} as const;

type Locale = keyof typeof content;

export default async function BusinessPortraitsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = content[(locale as Locale) in content ? (locale as Locale) : "en"];
  const portraitsGallery = await getPortraitsGallery();

  return (
    <>
      <section className="section pt-20 md:pt-32">
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
              <li key={step} className="flex gap-6 border-t border-black/[0.07] py-5">
                <span className="label w-4 pt-1">{n}</span>
                <div>
                  <span className="block text-xl mb-1" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>{step}</span>
                  <span className="text-xs text-black/50 leading-relaxed">{detail}</span>
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

      <section className="section border-t border-black/[0.07] py-20">
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


import type { Metadata } from "next";
import Link from "next/link";

import { EditorialGallery } from "@/components/EditorialGallery";
import { getArtGallery } from "@/lib/gallery-data";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Art Gallery & Exhibition Photography Tokyo | Eva Gorobets",
    description:
      "Photography for galleries, museums and artists in Tokyo and Melbourne. Vernissage coverage, artwork documentation, artist portraits. Catalogue and press-ready files.",
    openGraph: {
      title: "Art Gallery & Exhibition Photography Tokyo",
      description:
        "Gallery openings, artwork documentation and artist portraits in Tokyo and Melbourne. Press and catalogue-ready delivery.",
    },
  };
}

const artContent = {
  en: {
    eyebrow: "Art & Galleries",
    h1: "Art & Galleries Photography in Tokyo & Melbourne",
    p1: "For galleries, museums, artists, curators and art consultants who need visual material for catalogues, press and online viewing. I work with the pace and protocol of the art world — arriving early, moving carefully, delivering files that are usable for print.",
    p2: "As co-founder of Art Flaneur Global, I have spent years embedded in the art scenes of Tokyo and Melbourne, which means I understand the context I am entering and the relationships involved. I do not need to be managed on the day.",
    whatLabel: "What I cover",
    services: [
      { title: "Exhibitions & Vernissages", text: "Opening night coverage: the work, the guests, the artist, the atmosphere. Delivered in a set structured for press release and social use." },
      { title: "Artist & Curator Portraits", text: "Sessions in the studio, the gallery, or on location. Portraits that communicate practice and personality — not just presence." },
      { title: "Artwork Documentation", text: "Color-accurate, technically clean files for paintings, drawings, sculpture and installations. Suitable for catalogues, insurance, and digital archives." },
      { title: "Art Events & Talks", text: "Lectures, performances, artist talks and panel discussions. Discreet photography that records the event without disrupting it." },
    ],
    approach: "Approach: careful movement in live spaces, respect for viewers and artists, colour accuracy for print and screen, and deliverables that the gallery can use without further editing. All files are captioned and structured for easy integration into press materials and catalogues.",
    testimonial: "\u201cEva photographed three consecutive openings for us. Her images ended up in our annual catalogue, in Japanese press and on our international partner\u2019s website.\u201d",
    testimonialBy: "Gallery Director, Contemporary Art Gallery \u2014 Tokyo",
    ctaH2: "Working on an art project?",
    ctaBtn: "Art Project Enquiry",
  },
  jp: {
    eyebrow: "アート＆ギャラリー",
    h1: "東京＆メルボルンのアート・ギャラリー撮影",
    p1: "カタログ、プレス、オンライン展示用のビジュアル素材を必要とするギャラリー、美術館、アーティスト、キュレーター、アートコンサルタントのために。アートワールドのペースとプロトコルに合わせて動き、早めに到着し、慎重に移動し、印刷に使用できるファイルを届けます。",
    p2: "Art Flaneur Globalの共同創設者として、東京とメルボルンのアートシーンに長年関わってきたため、入る場の文脈と関係性を理解しています。当日の管理は不要です。",
    whatLabel: "撮影内容",
    services: [
      { title: "展覧会＆ヴェルニサージュ", text: "オープニングナイトの記録：作品、ゲスト、アーティスト、雰囲気。プレスリリースやソーシャル用に構造化されたセットで納品。" },
      { title: "アーティスト＆キュレーターポートレート", text: "スタジオ、ギャラリー、またはロケーションでのセッション。単なる存在感ではなく、実践とパーソナリティを伝えるポートレート。" },
      { title: "作品ドキュメンテーション", text: "絵画、素描、彫刻、インスタレーションのための色彩正確で技術的にクリーンなファイル。カタログ、保険、デジタルアーカイブに適しています。" },
      { title: "アートイベント＆トーク", text: "講演、パフォーマンス、アーティストトーク、パネルディスカッション。イベントを妨げない、目立たない撮影。" },
    ],
    approach: "アプローチ：ライブスペースでの慎重な動作、閲覧者とアーティストへの敬意、印刷・スクリーン用の色彩精度、そしてギャラリーがさらなる編集なしに使用できる成果物。すべてのファイルにキャプションが付けられ、プレス素材やカタログへの統合が容易な構造になっています。",
    testimonial: "\u300c3回連続のオープニングをエヴァに撮影していただきました。彼女の画像は年間カタログ、日本のプレス、国際パートナーのウェブサイトに掲載されました。\u300d",
    testimonialBy: "ギャラリーディレクター、現代アートギャラリー \u2014 東京",
    ctaH2: "アートプロジェクトに取り組んでいますか？",
    ctaBtn: "アートプロジェクトのお問い合わせ",
  },
  ru: {
    eyebrow: "Арт и галереи",
    h1: "Фотосъёмка для галерей и выставок в Токио и Мельбурне",
    p1: "Для галерей, музеев, художников, кураторов и арт-консультантов, которым нужны визуальные материалы для каталогов, прессы и онлайн-просмотра. Работаю в ритме и по протоколу арт-мира — прихожу заранее, двигаюсь осторожно, поставляю файлы, пригодные для печати.",
    p2: "Как сооснователь Art Flaneur Global я годами погружена в арт-сцены Токио и Мельбурна — понимаю контекст, в который вхожу, и задействованные отношения. Управлять мной на площадке не нужно.",
    whatLabel: "Что снимаю",
    services: [
      { title: "Выставки и вернисажи", text: "Съёмка вечера открытия: работы, гости, художник, атмосфера. Поставляется набором, структурированным под пресс-релиз и соцсети." },
      { title: "Портреты художников и кураторов", text: "Сессии в студии, галерее или на локации. Портреты, передающие практику и личность — не просто присутствие." },
      { title: "Документирование произведений", text: "Цветоточные, технически чистые файлы живописи, графики, скульптуры и инсталляций. Подходят для каталогов, страхования и цифровых архивов." },
      { title: "Арт-события и лекции", text: "Лекции, перформансы, разговоры с художниками, панельные дискуссии. Ненавязчивая съёмка, фиксирующая событие без вмешательства в него." },
    ],
    approach: "Подход: аккуратное движение в живых пространствах, уважение к зрителям и художникам, точность цветопередачи для печати и экрана, материалы, готовые к использованию без дополнительного монтажа. Все файлы подписаны и структурированы для лёгкой интеграции в пресс-материалы и каталоги.",
    testimonial: "\u00abЭва сняла три подряд открытия для нас. Её снимки попали в наш ежегодный каталог, в японскую прессу и на сайт международного партнёра.\u00bb",
    testimonialBy: "Директор галереи, галерея современного искусства \u2014 Токио",
    ctaH2: "Работаете над арт-проектом?",
    ctaBtn: "Запрос на арт-проект",
  },
} as const;

type Locale = keyof typeof artContent;

export default async function ArtGalleriesPage({ params }: PageProps) {
  const { locale } = await params;
  const t = artContent[(locale as Locale) in artContent ? (locale as Locale) : "en"];
  const artGallery = await getArtGallery();

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
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <p className="text-sm text-black/60 leading-relaxed">{t.p1}</p>
          <p className="text-sm text-black/60 leading-relaxed">{t.p2}</p>
        </div>
      </section>

      <section className="section pt-0">
        <EditorialGallery items={artGallery} />
      </section>

      <section className="section border-t border-black/[0.07]">
        <p className="label mb-10">{t.whatLabel}</p>
        <div className="grid gap-y-0 md:grid-cols-2">
          {t.services.map(({ title, text }) => (
            <article key={title} className="border-t border-black/[0.07] py-8 pr-0 md:pr-12">
              <h2
                className="text-2xl mb-3"
                style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
              >
                {title}
              </h2>
              <p className="text-sm text-black/55 leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Approach statement */}
      <section className="section border-t border-black/[0.07]">
        <p className="max-w-2xl text-sm text-black/50 leading-relaxed">{t.approach}</p>
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

      <section className="section border-t border-black/[0.07] py-20">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
          <h2
            className="text-[clamp(2rem,4.5vw,4rem)] leading-[0.95]"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
          >
            {t.ctaH2}
          </h2>
          <Link href={`/${locale}/contact-booking`} className="btn">{t.ctaBtn}</Link>
        </div>
      </section>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { getAboutPhotoSrc } from "@/lib/gallery-data";

type PageProps = { params: Promise<{ locale: string }> };

const content = {
  en: {
    eyebrow: "Photographer",
    heroAlt: "Eva Gorobets — photographer",
    bio: [
      "Eva Gorobets is a portrait and corporate photographer with over 15 years of international experience, based in Tokyo with a deep Melbourne background. Her practice spans executive portraiture, corporate event coverage and art-world photography across Japan, Australia and internationally.",
      "She holds a Master's degree in Visual Culture and is a PhD candidate in Fine and Applied Arts — an academic background that shapes a distinctive approach: image-led, concept-aware, and structurally precise.",
      "She works with multinational corporations, executives, independent professionals, galleries and artists. Her clients include KPMG, Google, McKinsey, SAP, General Electric and EY — alongside cultural institutions such as State Library Victoria and independent art spaces in Tokyo and Melbourne.",
      "Co-founder of Art Flaneur, a platform connecting art discourse between Australia and the international contemporary art community. Communication in English, Japanese and Russian.",
    ],
    facts: [
      ["Experience", "15+ years (since 2008)"],
      ["Education", "MA Visual Culture · PhD candidate, Fine & Applied Arts"],
      ["Languages", "English · Japanese · Russian"],
      ["Based in", "Tokyo, Japan"],
      ["Also working in", "Melbourne, Australia · Worldwide"],
      ["Co-founder", "Art Flaneur"],
    ],
    clientsLabel: "Clients",
    clientsBody: "Corporate, gallery, media and public-sector clients across Tokyo, Melbourne and internationally.",
    clientsLink: "View client list →",
    pressLabel: "Press & Features",
    pressBody: "Press clippings, publication credits and media appearances available on request.",
    ctaH2: "Let\u2019s work together.",
    ctaBtn: "Get in touch",
  },
  jp: {
    eyebrow: "フォトグラファー",
    heroAlt: "エヴァ・ゴロベッツ — フォトグラファー",
    bio: [
      "エヴァ・ゴロベッツは、東京を拠点に15年以上の国際的な経験を持つポートレート・コーポレートフォトグラファーです。メルボルンとの深いつながりを持ちながら、日本・オーストラリア・海外でエグゼクティブポートレート、コーポレートイベント撮影、アート写真を手がけています。",
      "ヴィジュアルカルチャー修士号取得者であり、美術・応用芸術の博士課程在籍中。この学術的背景が、イメージ主導で概念的意識を持ち、構造的に精緻なアプローチを形成しています。",
      "多国籍企業、経営幹部、独立系プロフェッショナル、ギャラリー、アーティストと幅広く協働。KPMG、Google、McKinsey、SAP、General Electric、EY、さらにState Library Victoria（ビクトリア州立図書館）、東京・メルボルンの独立系アートスペースなどの文化機関とも取り組んでいます。",
      "アート・フラヌールの共同創設者。オーストラリアと国際的な現代アートコミュニティの間でアートを巡る対話を繋ぐプラットフォームです。英語・日本語・ロシア語でのコミュニケーションが可能。",
    ],
    facts: [
      ["経験", "15年以上（2008年より）"],
      ["学歴", "ヴィジュアルカルチャー修士 · 美術・応用芸術 博士課程在籍"],
      ["言語", "英語 · 日本語 · ロシア語"],
      ["拠点", "東京、日本"],
      ["活動地域", "オーストラリア・メルボルン · 世界各地"],
      ["共同創設", "アート・フラヌール"],
    ],
    clientsLabel: "クライアント",
    clientsBody: "東京・メルボルン・世界各地の法人、ギャラリー、メディア、公共機関クライアント。",
    clientsLink: "クライアント一覧を見る →",
    pressLabel: "掲載・メディア実績",
    pressBody: "プレスクリッピング、掲載クレジット、メディア出演歴はご要望に応じてご提供します。",
    ctaH2: "一緒に仕事をしませんか。",
    ctaBtn: "お問い合わせ",
  },
  ru: {
    eyebrow: "Фотограф",
    heroAlt: "Ева Горобец — фотограф",
    bio: [
      "Ева Горобец — портретный и корпоративный фотограф с более чем 15-летним международным опытом, живущая в Токио с глубокими связями с Мельбурном. Её практика охватывает портреты руководителей, съёмку корпоративных мероприятий и фотографию арт-мира в Японии, Австралии и за рубежом.",
      "Имеет степень магистра в области визуальной культуры и является кандидатом PhD по изобразительному и прикладному искусству — академический бэкграунд, формирующий самобытный подход: образно-ориентированный, концептуально осознанный и структурно точный.",
      "Работает с транснациональными корпорациями, руководителями, независимыми профессионалами, галереями и художниками. Среди клиентов KPMG, Google, McKinsey, SAP, General Electric и EY, а также культурные институции — State Library Victoria и независимые арт-пространства Токио и Мельбурна.",
      "Сооснователь Art Flaneur — платформы, связывающей арт-дискурс между Австралией и международным сообществом современного искусства. Общение на английском, японском и русском языках.",
    ],
    facts: [
      ["Опыт", "15+ лет (с 2008 года)"],
      ["Образование", "MA Визуальная культура · Кандидат PhD, изобразительное и прикладное искусство"],
      ["Языки", "Английский · Японский · Русский"],
      ["Базируется", "Токио, Япония"],
      ["Также работает", "Австралия, Мельбурн · Весь мир"],
      ["Сооснователь", "Art Flaneur"],
    ],
    clientsLabel: "Клиенты",
    clientsBody: "Корпоративные, галерейные, медиа и государственные клиенты в Токио, Мельбурне и по всему миру.",
    clientsLink: "Список клиентов →",
    pressLabel: "Пресса и публикации",
    pressBody: "Вырезки из прессы, упоминания в изданиях и медиавыступления — по запросу.",
    ctaH2: "Готовы к сотрудничеству?",
    ctaBtn: "Написать",
  },
} as const;

type Locale = keyof typeof content;

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const t = content[(locale as Locale) in content ? (locale as Locale) : "en"];
  const aboutPhotoSrc = await getAboutPhotoSrc();
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
      {/* Bio + info */}
      <section className="section grid gap-16 pt-20 md:pt-32 md:grid-cols-2">
        <div>
          <div className="mb-8 overflow-hidden" style={{ width: "200px", aspectRatio: "3/4", position: "relative" }}>
            <Image
              src={aboutPhotoSrc}
              alt={t.heroAlt}
              fill
              className="object-cover object-top"
              sizes="200px"
            />
          </div>
          <div className="text-sm text-black/65 leading-relaxed space-y-5 max-w-md">
            {t.bio.map((p, i) => <p key={i}>{linkifyArtFlaneur(p)}</p>)}
          </div>
        </div>
        <div className="md:pt-[299px]">
          <ul>
            {t.facts.map(([label, value]) => (
              <li key={label} className="flex gap-8 border-t border-black/[0.07] py-4 text-sm">
                <span className="label w-36 shrink-0">{label}</span>
                <span className="text-black/70">{linkifyArtFlaneur(value)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Clients link */}
      <section className="section border-t border-black/[0.07]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label mb-3">{t.clientsLabel}</p>
            <p className="text-sm text-black/55 max-w-sm leading-relaxed">{t.clientsBody}</p>
          </div>
          <Link href={`/${locale}/clients`} className="btn-ghost shrink-0">{t.clientsLink}</Link>
        </div>
      </section>

      {/* Press / features */}
      <section className="section border-t border-black/[0.07]">
        <p className="label mb-10">{t.pressLabel}</p>
        <p className="text-sm text-black/40 max-w-sm">{t.pressBody}</p>
      </section>

      {/* Contact CTA */}
      <section className="section border-t border-black/[0.07] !py-6">
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



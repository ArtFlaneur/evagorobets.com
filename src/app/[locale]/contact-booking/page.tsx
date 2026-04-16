import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { formatEstimateRange } from "@/lib/pricing-calculator";

const BASE_URL = "https://evagorobets.com";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const path = "/contact-booking";
  const seo = {
    en: {
      title: "Contact & Booking — Executive Portrait & Corporate Event Photographer Tokyo & Melbourne | Eva Gorobets",
      description:
        "Book an executive portrait or corporate event session in Tokyo or Melbourne. Structured brief form, response within 24 hours. Communication in English, Japanese and Russian.",
      ogTitle: "Contact & Booking — Eva Gorobets",
      ogDescription:
        "Send a brief for executive portraits, corporate events or art projects in Tokyo or Melbourne. Response within 24 hours.",
    },
    jp: {
      title: "お問い合わせ・予約 — 東京・メルボルンのエグゼクティブポートレート/法人イベント撮影 | Eva Gorobets",
      description:
        "東京・メルボルンでのエグゼクティブポートレート・コーポレートイベント撮影のご予約。構造化フォームで3分以内、24時間以内に返信。英語・日本語・ロシア語対応。",
      ogTitle: "お問い合わせ・予約 — Eva Gorobets",
      ogDescription:
        "東京・メルボルンでのエグゼクティブポートレート、法人イベント、アート案件のご相談を受付。24時間以内に返信。",
    },
  } as const;
  const t = seo[(locale as keyof typeof seo) in seo ? (locale as keyof typeof seo) : "en"];

  return {
    title: t.title,
    description: t.description,
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
  };
}

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{
    sent?: string;
    error?: string;
    calc?: string;
    calcCountry?: string;
    calcService?: string;
    calcPreferredLanguage?: string;
    calcSecondaryLanguages?: string;
    calcEstimateLow?: string;
    calcEstimateHigh?: string;
    calcCurrency?: string;
    calcDetails?: string;
  }>;
};

const inputClass =
  "w-full border-t border-black/[0.07] bg-transparent py-5 text-sm placeholder:text-black/35 outline-none focus:border-black/30 transition-colors";
const selectClass =
  "w-full border-t border-black/[0.07] bg-transparent py-5 text-sm text-black/60 outline-none";

const content = {
  en: {
    eyebrow: "Contact",
    h1: "Send a brief or enquiry",
    sub: "Structured form — takes under three minutes. Response within 24 hours.",
    choiceLabel: "Choose your route",
    directBriefTitle: "Direct brief",
    directBriefBody: "Skip the calculator and send the full project brief now.",
    directBriefBtn: "Open Direct Brief",
    calculatorTitle: "Estimate calculator",
    calculatorBody: "Get a pricing range first, then send a shorter follow-up enquiry.",
    calculatorBtn: "Open Calculator",
    sectionContact: "Your details",
    namePh: "Name",
    companyPh: "Company / organisation",
    emailPh: "Email",
    preferredLanguageLabel: "Preferred communication language",
    preferredLanguageOptions: ["English", "Japanese", "Russian"],
    compactSectionLabel: "Final details",
    compactSectionBody: "Your estimate is attached. Add contact details, preferred date and any context that matters.",
    sectionProject: "Project",
    typeLabel: "Type of photography",
    typeOptions: ["Executive / leadership portraits", "Corporate event — one day", "Corporate event — multi-day", "Portraits + event (combined)", "On-retainer coverage", "Art gallery / cultural event", "Other"],
    peopleLabel: "Number of people (portraits)",
    peopleOptions: ["1 person", "2–5 people", "6–15 people", "16–30 people", "30+ people", "Not applicable — event only"],
    locationLabel: "Location",
    locationOptions: ["Tokyo — Marunouchi / Otemachi", "Tokyo — Shinjuku", "Tokyo — Shibuya / Roppongi", "Tokyo — other district", "Outside Tokyo (Japan)", "Melbourne", "Other / international"],
    datePh: "Date or preferred period",
    sectionDeliverables: "Deliverables needed",
    formatsLabel: "File formats required",
    formatsOptions: ["Web / digital only", "Print-ready files", "Web + social media pack", "Web + print + social (all formats)", "Not sure — advise me"],
    timelineLabel: "Delivery urgency",
    timelineOptions: ["Standard — 3–5 business days", "Within 48 hours (same-day highlights)", "Flexible — no deadline pressure"],
    sectionCorporate: "Corporate requirements",
    invoiceLabel: "Invoice currency",
    invoiceOptions: ["JPY (Japanese Yen)", "AUD (Australian Dollar)", "USD (US Dollar)", "Not sure yet"],
    ndaLabel: "NDA required?",
    ndaOptions: ["Yes — please send NDA before briefing", "No — happy to proceed without", "Not sure"],
    notesPh: "Anything else — optional",
    submitBtn: "Send brief",
    calculatorCta: "Use the estimate calculator first",
    calculatorSummaryLabel: "Calculator estimate attached",
    calculatorSummaryBody: "This brief includes your estimated range and communication preferences.",
    calculatorDetailsLabel: "Estimate details",
    calculatorRangeLabel: "Estimated range",
    calculatorLanguageLabel: "Preferred communication language",
    calculatorSecondaryLabel: "Secondary languages",
    switchToBriefBtn: "Use Full Brief Instead",
    directLabel: "Direct contact",
    corporateLabel: "Corporate clients",
    corporateItems: [["NDA", "Available before briefing"], ["Invoicing", "JPY · AUD · USD"], ["ABN / GST", "ABN listed on invoices · GST if applicable"], ["Payment", "Net-30 for corporate accounts"], ["Confidentiality", "Client names not published without consent"], ["Response", "Within 24 hours"]],
    langLabel: "Languages",
    langBody: "Briefing and communication in English, Japanese and Russian — your Tokyo office and your global HQ can both contact directly.",
    langLink: "For companies →",
    faqLabel: "FAQ",
    faq: [
      ["Delivery timeline", "Standard delivery in 3–5 business days. Same-day highlight sets available for events on request."],
      ["Corporate invoicing and PO", "Invoices issued in JPY, AUD or USD. Purchase order process supported. Net-30 payment terms for established accounts."],
      ["NDA and confidentiality", "An NDA can be signed before any brief is shared. Client names and project details are never published without explicit written consent."],
      ["Location and travel", "Based in Tokyo, available anywhere in Japan. Melbourne and international sessions by arrangement. Travel costs discussed at quote stage."],
    ],
    sentMsg: "Thank you — your brief has been sent. You will receive a reply within 24 hours.",
    errorMsg: "Something went wrong while sending. Please try again or email eva@artflaneur.com.au.",
  },
  jp: {
    eyebrow: "お問い合わせ",
    h1: "ブリーフまたはご相談を送る",
    sub: "フォームへの入力は3分以内。24時間以内にご返答します。",
    choiceLabel: "進め方を選ぶ",
    directBriefTitle: "直接ブリーフを送る",
    directBriefBody: "見積もり計算を使わず、そのまま詳細ブリーフを送ります。",
    directBriefBtn: "直接ブリーフを開く",
    calculatorTitle: "見積もり計算",
    calculatorBody: "先に価格レンジを確認し、その後に短い追加入力だけ送ります。",
    calculatorBtn: "見積もり計算を開く",
    sectionContact: "お客様の情報",
    namePh: "お名前",
    companyPh: "会社名 / 組織名",
    emailPh: "メールアドレス",
    preferredLanguageLabel: "希望する連絡言語",
    preferredLanguageOptions: ["英語", "日本語", "ロシア語"],
    compactSectionLabel: "最終確認事項",
    compactSectionBody: "見積もり内容は添付されています。連絡先、希望日程、補足事項のみ追加してください。",
    sectionProject: "撮影内容",
    typeLabel: "撮影の種類",
    typeOptions: ["エグゼクティブ / リーダーシップポートレート", "コーポレートイベント — 1日", "コーポレートイベント — 複数日", "ポートレート + イベント（複合）", "顧問契約カバレッジ", "アートギャラリー / 文化イベント", "その他"],
    peopleLabel: "人数（ポートレートの場合）",
    peopleOptions: ["1名", "2〜5名", "6〜15名", "16〜30名", "30名以上", "対象外 — イベントのみ"],
    locationLabel: "撮影場所",
    locationOptions: ["東京 — 丸の内 / 大手町", "東京 — 新宿", "東京 — 渋谷 / 六本木", "東京 — その他の地区", "東京以外（日本国内）", "メルボルン", "その他 / 海外"],
    datePh: "ご希望の日程または時期",
    sectionDeliverables: "納品物について",
    formatsLabel: "必要なファイル形式",
    formatsOptions: ["Web / デジタルのみ", "印刷用ファイル", "Web + SNS用パック", "Web + 印刷 + SNS（全形式）", "不明 — ご提案をお願いします"],
    timelineLabel: "納品の緊急度",
    timelineOptions: ["標準 — 3〜5営業日", "48時間以内（当日ハイライトセット）", "柔軟対応 — 締め切りなし"],
    sectionCorporate: "法人向け要件",
    invoiceLabel: "請求通貨",
    invoiceOptions: ["JPY（日本円）", "AUD（オーストラリアドル）", "USD（米ドル）", "未定"],
    ndaLabel: "NDAは必要ですか？",
    ndaOptions: ["はい — ブリーフ前にNDAをお送りください", "不要 — NDAなしで進めます", "未定"],
    notesPh: "その他 — 任意",
    submitBtn: "ブリーフを送る",
    calculatorCta: "先に見積もり計算を使う",
    calculatorSummaryLabel: "見積もり内容を添付済み",
    calculatorSummaryBody: "このブリーフには概算レンジと言語希望が付いた状態で送信されます。",
    calculatorDetailsLabel: "見積もり条件",
    calculatorRangeLabel: "概算レンジ",
    calculatorLanguageLabel: "希望する連絡言語",
    calculatorSecondaryLabel: "補助言語",
    switchToBriefBtn: "完全なブリーフに切り替える",
    directLabel: "直接連絡",
    corporateLabel: "法人クライアント",
    corporateItems: [["NDA", "ブリーフ前に対応可能"], ["請求通貨", "JPY · AUD · USD"], ["ABN / GST", "ABNは請求書に記載 · GSTは該当時のみ"], ["支払条件", "法人アカウントはNet-30"], ["守秘義務", "同意なくクライアント名を公開しません"], ["応答時間", "24時間以内"]],
    langLabel: "対応言語",
    langBody: "英語・日本語・ロシア語でのブリーフおよびコミュニケーションが可能。東京オフィスもグローバル本社も直接ご連絡いただけます。",
    langLink: "法人のお客様はこちら →",
    faqLabel: "よくある質問",
    faq: [
      ["納品スケジュール", "標準納品は3〜5営業日。イベントの当日ハイライトセットはご要望に応じて対応可能。"],
      ["法人請求・POについて", "JPY・AUD・USDでの請求書発行に対応。購買注文（PO）プロセスにも対応。既存アカウントはNet-30の支払い条件。"],
      ["NDAと守秘義務について", "ブリーフ共有前にNDA締結が可能。クライアント名およびプロジェクト詳細は書面による明示的な同意なしには公開しません。"],
      ["撮影場所と出張について", "東京を拠点とし、日本国内どこでも対応可能。メルボルンおよび海外での撮影はご相談ください。出張費は見積もり段階でご確認します。"],
    ],
    sentMsg: "ありがとうございます。ブリーフを受け付けました。24時間以内にご返信します。",
    errorMsg: "送信時に問題が発生しました。再度お試しいただくか、eva@artflaneur.com.au までご連絡ください。",
  },
} as const;

type Locale = keyof typeof content;

export default async function ContactPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const query = (await searchParams) ?? {};
  const t = content[(locale as Locale) in content ? (locale as Locale) : "en"];
  const showSent = query.sent === "1";
  const showError = query.error === "1";
  const calculatorAttached = query.calc === "1";
  const formTimestampInputId = "contact-started-at";
  const preferredLanguage =
    query.calcPreferredLanguage === "english" ||
    query.calcPreferredLanguage === "japanese" ||
    query.calcPreferredLanguage === "russian"
      ? query.calcPreferredLanguage
      : "";
  const preferredLanguageLabel =
    preferredLanguage === "english"
      ? t.preferredLanguageOptions[0]
      : preferredLanguage === "japanese"
        ? t.preferredLanguageOptions[1]
        : preferredLanguage === "russian"
          ? t.preferredLanguageOptions[2]
          : "";
  const estimateRange =
    query.calcEstimateLow && query.calcEstimateHigh && (query.calcCurrency === "JPY" || query.calcCurrency === "AUD")
      ? formatEstimateRange({
          currency: query.calcCurrency,
          low: Number(query.calcEstimateLow),
          high: Number(query.calcEstimateHigh),
        })
      : null;
  const secondaryLanguages =
    query.calcSecondaryLanguages
      ?.split(",")
      .filter(Boolean)
      .map((language) =>
        language === "english"
          ? t.preferredLanguageOptions[0]
          : language === "japanese"
            ? t.preferredLanguageOptions[1]
            : language === "russian"
              ? t.preferredLanguageOptions[2]
              : language,
      )
      .join(", ") ?? "";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return (
    <>
      <Script id="contact-faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>
      <Script id="contact-form-antispam" strategy="afterInteractive">
        {`
          (() => {
            const inputId = ${JSON.stringify(formTimestampInputId)};

            const setTimestamp = () => {
              const input = document.getElementById(inputId);
              if (!(input instanceof HTMLInputElement)) return;
              input.value = String(Date.now());
            };

            if (document.readyState === "loading") {
              document.addEventListener("DOMContentLoaded", setTimestamp, { once: true });
            } else {
              setTimestamp();
            }

            window.addEventListener("pageshow", setTimestamp);
          })();
        `}
      </Script>
      <section className="section pt-32">
        <p className="label mb-6">{t.eyebrow}</p>
        <h1
          className="max-w-xl text-[clamp(3rem,6vw,5.5rem)] leading-[0.95]"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
        >
          {t.h1}
        </h1>
        <p className="mt-5 text-sm text-black/50">{t.sub}</p>
        {calculatorAttached ? (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={`/${locale}/contact-booking`} className="btn-ghost">
              {t.switchToBriefBtn}
            </Link>
            <Link href={`/${locale}/pricing-calculator`} className="btn">
              {t.calculatorCta}
            </Link>
          </div>
        ) : (
          <>
            <p className="label mt-10 mb-5">{t.choiceLabel}</p>
            <div className="grid gap-4 md:max-w-3xl md:grid-cols-2">
              <div className="border border-black/8 bg-black/1.5 p-5 sm:p-6">
                <h2 className="text-2xl text-black/85" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>
                  {t.directBriefTitle}
                </h2>
                <p className="mt-3 text-sm text-black/55 leading-relaxed">{t.directBriefBody}</p>
                <a href="#brief-form" className="btn mt-5">
                  {t.directBriefBtn}
                </a>
              </div>
              <div className="border border-black/8 bg-black/1.5 p-5 sm:p-6">
                <h2 className="text-2xl text-black/85" style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}>
                  {t.calculatorTitle}
                </h2>
                <p className="mt-3 text-sm text-black/55 leading-relaxed">{t.calculatorBody}</p>
                <Link href={`/${locale}/pricing-calculator`} className="btn mt-5">
                  {t.calculatorBtn}
                </Link>
              </div>
            </div>
          </>
        )}
      </section>

      <section id="brief-form" className="section grid gap-12 border-t border-black/[0.07] md:gap-20 md:grid-cols-[3fr_2fr]">
        {/* Form */}
        <form className="space-y-0" method="POST" action="/api/contact">
          <input type="hidden" name="locale" value={locale} />
          <input type="hidden" id={formTimestampInputId} name="startedAt" defaultValue="" />
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <input type="hidden" name="calcCountry" value={query.calcCountry ?? ""} />
          <input type="hidden" name="calcService" value={query.calcService ?? ""} />
          <input type="hidden" name="calcEstimateLow" value={query.calcEstimateLow ?? ""} />
          <input type="hidden" name="calcEstimateHigh" value={query.calcEstimateHigh ?? ""} />
          <input type="hidden" name="calcCurrency" value={query.calcCurrency ?? ""} />
          <input type="hidden" name="calcDetails" value={query.calcDetails ?? ""} />
          <input type="hidden" name="calcSecondaryLanguages" value={query.calcSecondaryLanguages ?? ""} />

          {showSent && (
            <p className="mb-4 border border-black/15 bg-black/2 px-4 py-3 text-sm text-black/70">
              {t.sentMsg}
            </p>
          )}
          {showError && (
            <p className="mb-4 border border-black/15 bg-black/2 px-4 py-3 text-sm text-black/70">
              {t.errorMsg}
            </p>
          )}

          {calculatorAttached && (
            <div className="mb-6 border border-black/15 bg-black/2 px-4 py-4 text-sm text-black/70">
              <p className="label mb-3">{t.calculatorSummaryLabel}</p>
              <p className="mb-3 text-black/60">{t.calculatorSummaryBody}</p>
              {estimateRange && (
                <p className="mb-3 wrap-break-word">
                  <span className="label mb-1 block">{t.calculatorRangeLabel}</span>
                  {estimateRange}
                </p>
              )}
              {preferredLanguage && (
                <p className="mb-3 wrap-break-word">
                  <span className="label mb-1 block">{t.calculatorLanguageLabel}</span>
                  {preferredLanguageLabel}
                </p>
              )}
              {secondaryLanguages && (
                <p className="mb-3 wrap-break-word">
                  <span className="label mb-1 block">{t.calculatorSecondaryLabel}</span>
                  {secondaryLanguages}
                </p>
              )}
              {query.calcDetails && (
                <p className="wrap-break-word">
                  <span className="label mb-1 block">{t.calculatorDetailsLabel}</span>
                  {query.calcDetails}
                </p>
              )}
            </div>
          )}

          {/* Contact */}
          <div className="mt-8 border border-black/8 p-5 sm:p-6">
            <p className="label mb-4">{t.sectionContact}</p>
            <input type="text" name="name" required placeholder={t.namePh} className={inputClass} />
            <input type="text" name="company" placeholder={t.companyPh} className={inputClass} />
            <input type="email" name="email" required placeholder={t.emailPh} className={inputClass} />
            <select name="preferredLanguage" className={selectClass} defaultValue={preferredLanguage}>
              <option value="">{t.preferredLanguageLabel}</option>
              <option value="english">{t.preferredLanguageOptions[0]}</option>
              <option value="japanese">{t.preferredLanguageOptions[1]}</option>
              <option value="russian">{t.preferredLanguageOptions[2]}</option>
            </select>
          </div>

          {calculatorAttached ? (
            <>
              <div className="mt-4 border border-black/8 p-5 sm:p-6">
                <p className="label mb-4">{t.compactSectionLabel}</p>
                <p className="mb-4 text-sm text-black/50">{t.compactSectionBody}</p>
                <input type="text" name="date" placeholder={t.datePh} className={inputClass} />
                <input type="hidden" name="type" value={query.calcService ?? ""} />
                <input type="hidden" name="people" value="" />
                <input type="hidden" name="location" value={query.calcCountry ?? ""} />
                <input type="hidden" name="formats" value="" />
                <input type="hidden" name="timeline" value="" />
              </div>
            </>
          ) : (
            <>
              <div className="mt-4 border border-black/8 p-5 sm:p-6">
                <p className="label mb-4">{t.sectionProject}</p>
                <select name="type" className={selectClass}>
                  <option value="">{t.typeLabel}</option>
                  {t.typeOptions.map((o) => <option key={o}>{o}</option>)}
                </select>
                <select name="people" className={selectClass}>
                  <option value="">{t.peopleLabel}</option>
                  {t.peopleOptions.map((o) => <option key={o}>{o}</option>)}
                </select>
                <select name="location" className={selectClass}>
                  <option value="">{t.locationLabel}</option>
                  {t.locationOptions.map((o) => <option key={o}>{o}</option>)}
                </select>
                <input type="text" name="date" placeholder={t.datePh} className={inputClass} />
              </div>
              <div className="mt-4 border border-black/8 p-5 sm:p-6">
                <p className="label mb-4">{t.sectionDeliverables}</p>
                <select name="formats" className={selectClass}>
                  <option value="">{t.formatsLabel}</option>
                  {t.formatsOptions.map((o) => <option key={o}>{o}</option>)}
                </select>
                <select name="timeline" className={selectClass}>
                  <option value="">{t.timelineLabel}</option>
                  {t.timelineOptions.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            </>
          )}

          {/* Corporate needs */}
          <div className="mt-4 border border-black/8 p-5 sm:p-6">
            <p className="label mb-4">{t.sectionCorporate}</p>
            <select name="invoice" className={selectClass}>
              <option value="">{t.invoiceLabel}</option>
              {t.invoiceOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
            <select name="nda" className={selectClass}>
              <option value="">{t.ndaLabel}</option>
              {t.ndaOptions.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>

          {/* Extra */}
          <textarea
            name="notes"
            rows={3}
            placeholder={t.notesPh}
            className={`${inputClass} resize-none`}
          />

          <div className="border-t border-black/[0.07] pt-6">
            <button type="submit" className="btn">
              {t.submitBtn}
            </button>
          </div>
        </form>

        {/* Sidebar */}
        <div className="flex flex-col gap-10">
          <div>
            <p className="label mb-4">{t.directLabel}</p>
            <a
              href="mailto:eva@artflaneur.com.au"
              className="block text-sm text-black/70 hover:text-black transition-colors"
            >
              eva@artflaneur.com.au
            </a>
            <div className="mt-3 flex gap-5">
              <a href="https://www.instagram.com/evagorobets/" target="_blank" rel="noreferrer" className="label hover:opacity-100 transition-opacity">Instagram</a>
              <a href="https://www.linkedin.com/in/evgorobets/" target="_blank" rel="noreferrer" className="label hover:opacity-100 transition-opacity">LinkedIn</a>
            </div>
          </div>

          <div>
            <p className="label mb-4">{t.corporateLabel}</p>
            <ul>
              {t.corporateItems.map(([k, v]) => (
                <li key={k} className="flex gap-5 border-t border-black/[0.07] py-3 text-sm">
                  <span className="label w-28 shrink-0">{k}</span>
                  <span className="text-black/55">{v}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label mb-4">{t.langLabel}</p>
            <p className="text-sm text-black/55 leading-relaxed">{t.langBody}</p>
            <Link href={`/${locale}/corporate`} className="btn-ghost mt-5">
              {t.langLink}
            </Link>
          </div>

          <div>
            <p className="label mb-6">{t.faqLabel}</p>
            {t.faq.map(([question, answer]) => (
              <details key={question} className="border-t border-black/[0.07]">
                <summary className="cursor-pointer py-4 text-sm text-black/70 hover:text-black">{question}</summary>
                <p className="pb-4 text-sm text-black/50 leading-relaxed">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

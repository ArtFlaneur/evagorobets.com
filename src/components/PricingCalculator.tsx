"use client";

import Link from "next/link";
import { useState } from "react";

import {
  CalculatorService,
  clampPositiveInteger,
  CommunicationLanguage,
  estimateEvent,
  estimatePortrait,
  EventDuration,
  EventUrgency,
  formatEstimateRange,
  PortraitLocation,
  PortraitSessionLength,
  PortraitUrgency,
  PortraitUsage,
  PricingCountry,
} from "@/lib/pricing-calculator";

type Locale = "en" | "jp";

type PricingCalculatorProps = {
  locale: Locale;
  initialService?: CalculatorService;
  initialStatus?: "sent" | "error" | null;
};

type LocalizedOption<T extends string> = {
  value: T;
  label: string;
};

const content = {
  en: {
    eyebrow: "Estimate Calculator",
    h1: "Estimate Your Session Range",
    intro:
      "Choose the pricing policy first. Your site language stays the same; country only changes the pricing model.",
    countryLabel: "Country pricing policy",
    serviceLabel: "What do you need?",
    languageLabel: "Preferred communication language",
    secondaryLanguageLabel: "Also comfortable in",
    secondaryLanguageHint: "Optional. Useful when local staff and overseas HQ brief in different languages.",
    step1: "Where is your shoot?",
    step2: "What type of shoot?",
    portraitLabel: "Portrait session details",
    eventLabel: "Coverage details",
    sessionLengthLabel: "Session length",
    peopleCountLabel: "Number of people",
    locationLabel: "Studio or office",
    makeupCountLabel: "How many people need makeup?",
    hairCountLabel: "How many people need hairstyling?",
    urgencyLabel: "Delivery urgency",
    usageLabel: "Image usage",
    durationLabel: "Coverage duration",
    resultLabel: "Estimated range",
    resultNote:
      "Most projects land within this range for the configuration above. Travel outside the metropolitan area, same-day logistics, or multi-channel ad campaigns are quoted separately.",
    includedLabel: "Included by default",
    includedPortrait: "Briefing, guided shooting time, standard retouching, internal use, company website and organic social media.",
    includedEvent:
      "Pre-event briefing, on-site coverage, standard editing, and delivery structured for internal, PR and social use.",
    contactTitle: "Send this estimate",
    contactBody: "Add contact details and any timing notes. The estimate and your language preferences will be attached automatically.",
    namePh: "Name",
    companyPh: "Company / organisation",
    emailPh: "Email",
    datePh: "Date or preferred period",
    notesPh: "Anything else — optional",
    cta: "Send This Estimate as a Brief",
    helper: "Prefer a fuller project enquiry instead? Use the direct brief form.",
    directBriefBtn: "Open Full Brief",
    sentMsg: "Thank you — your estimate request has been sent. You will receive a reply within 24 hours.",
    errorMsg: "Something went wrong while sending. Please try again or email eva@artflaneur.com.au.",
    showFormCta: "Request this estimate",
    secondaryLanguageAdd: "+ Add another language",
  },
  jp: {
    eyebrow: "見積もり計算",
    h1: "撮影費の目安を計算する",
    intro:
      "最初に国を選ぶと、その国の価格ポリシーが適用されます。サイト表示言語は変わりません。",
    countryLabel: "国別の価格ポリシー",
    serviceLabel: "必要な撮影内容",
    languageLabel: "希望する連絡言語",
    secondaryLanguageLabel: "補助的に使える言語",
    secondaryLanguageHint: "任意。現地担当者と海外HQで使用言語が異なる場合に便利です。",    step1: "撒影場所はどちらですか？",
    step2: "撒影の種類は？",    portraitLabel: "ポートレート撮影の条件",
    eventLabel: "撮影条件",
    sessionLengthLabel: "撮影時間",
    peopleCountLabel: "人数",
    locationLabel: "スタジオまたはオフィス",
    makeupCountLabel: "メイクが必要な人数",
    hairCountLabel: "ヘアセットが必要な人数",
    urgencyLabel: "納品の緊急度",
    usageLabel: "画像の利用範囲",
    durationLabel: "撮影時間帯",
    resultLabel: "概算レンジ",
    resultNote:
      "上記の条件での目安です。都市圏外への移動、当日対応の納品、複数チャネル広告キャンペーンは別途お見積もりとなります。",
    includedLabel: "標準で含まれるもの",
    includedPortrait:
      "事前ブリーフ、ガイド付き撮影、標準レタッチ、社内利用、会社サイト、オーガニックSNS利用。",
    includedEvent:
      "事前ブリーフ、現地撮影、標準編集、社内・PR・SNS向けに整理した納品。",
    contactTitle: "この見積もりを送る",
    contactBody: "連絡先と希望時期、補足事項だけ追加してください。見積もり内容と言語希望は自動で添付されます。",
    namePh: "お名前",
    companyPh: "会社名 / 組織名",
    emailPh: "メールアドレス",
    datePh: "ご希望の日程または時期",
    notesPh: "その他 — 任意",
    cta: "この見積もりでブリーフを送る",
    helper: "より詳しく送りたい場合は、完全なブリーフフォームも使えます。",
    directBriefBtn: "完全なブリーフを開く",
    sentMsg: "ありがとうございます。見積もりリクエストを受け付けました。24時間以内にご返信します。",
    errorMsg: "送信時に問題が発生しました。再度お試しいただくか、eva@artflaneur.com.au までご連絡ください。",
    showFormCta: "見積もりを依頼する",
    secondaryLanguageAdd: "+ 別の言語を追加",
  },
} as const;

const countryOptions: Array<LocalizedOption<PricingCountry>> = [
  { value: "japan", label: "Japan" },
  { value: "australia", label: "Australia" },
];

const communicationOptions: Record<Locale, Array<LocalizedOption<CommunicationLanguage>>> = {
  en: [
    { value: "english", label: "English" },
    { value: "japanese", label: "Japanese" },
    { value: "russian", label: "Russian" },
  ],
  jp: [
    { value: "english", label: "英語" },
    { value: "japanese", label: "日本語" },
    { value: "russian", label: "ロシア語" },
  ],
};

const serviceOptions: Record<Locale, Array<LocalizedOption<CalculatorService>>> = {
  en: [
    { value: "portrait", label: "Portrait session" },
    { value: "corporate-event", label: "Corporate event" },
    { value: "gallery-event", label: "Gallery event" },
    { value: "artwork-documentation", label: "Artwork documentation" },
  ],
  jp: [
    { value: "portrait", label: "ポートレート撮影" },
    { value: "corporate-event", label: "コーポレートイベント" },
    { value: "gallery-event", label: "ギャラリーイベント" },
    { value: "artwork-documentation", label: "作品ドキュメンテーション" },
  ],
};

const portraitSessionOptions: Record<Locale, Array<LocalizedOption<PortraitSessionLength>>> = {
  en: [
    { value: "up-to-1-5-hours", label: "Up to 1.5 hours" },
    { value: "up-to-3-hours", label: "Up to 3 hours" },
    { value: "half-day", label: "Half day" },
    { value: "full-day", label: "Full day" },
  ],
  jp: [
    { value: "up-to-1-5-hours", label: "1.5時間まで" },
    { value: "up-to-3-hours", label: "3時間まで" },
    { value: "half-day", label: "半日" },
    { value: "full-day", label: "終日" },
  ],
};

const portraitLocationOptions: Record<Locale, Array<LocalizedOption<PortraitLocation>>> = {
  en: [
    { value: "studio", label: "Studio" },
    { value: "office", label: "Office" },
  ],
  jp: [
    { value: "studio", label: "スタジオ" },
    { value: "office", label: "オフィス" },
  ],
};

const portraitUrgencyOptions: Record<Locale, Array<LocalizedOption<PortraitUrgency>>> = {
  en: [
    { value: "standard", label: "Standard delivery" },
    { value: "within-48-hours", label: "Within 48 hours" },
    { value: "next-business-day", label: "Next business day" },
    { value: "same-day-selects", label: "Same-day selects" },
  ],
  jp: [
    { value: "standard", label: "標準納品" },
    { value: "within-48-hours", label: "48時間以内" },
    { value: "next-business-day", label: "翌営業日" },
    { value: "same-day-selects", label: "当日セレクト" },
  ],
};

const portraitUsageOptions: Record<Locale, Array<LocalizedOption<PortraitUsage>>> = {
  en: [
    { value: "owned-channels", label: "Internal use, company website and organic social" },
    { value: "paid-local-campaign", label: "Paid local campaign" },
    { value: "paid-expanded-campaign", label: "Paid multi-channel campaign" },
  ],
  jp: [
    { value: "owned-channels", label: "社内利用・会社サイト・オーガニックSNS" },
    { value: "paid-local-campaign", label: "有料のローカル広告キャンペーン" },
    { value: "paid-expanded-campaign", label: "有料の複数チャネル広告キャンペーン" },
  ],
};

const eventDurationOptions: Record<Locale, Array<LocalizedOption<EventDuration>>> = {
  en: [
    { value: "up-to-2-hours", label: "Up to 2 hours" },
    { value: "half-day", label: "Half day" },
    { value: "full-day", label: "Full day" },
  ],
  jp: [
    { value: "up-to-2-hours", label: "2時間まで" },
    { value: "half-day", label: "半日" },
    { value: "full-day", label: "終日" },
  ],
};

const eventUrgencyOptions: Record<Locale, Array<LocalizedOption<EventUrgency>>> = {
  en: [
    { value: "standard", label: "Standard delivery" },
    { value: "fast-turnaround", label: "Fast turnaround" },
    { value: "next-day-highlights", label: "Next-day highlights" },
    { value: "same-day-selects", label: "Same-day selects" },
  ],
  jp: [
    { value: "standard", label: "標準納品" },
    { value: "fast-turnaround", label: "短納期" },
    { value: "next-day-highlights", label: "翌日ハイライト納品" },
    { value: "same-day-selects", label: "当日セレクト" },
  ],
};

function StepBadge({ n }: { n: number }) {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center border border-black/25 text-[9px] font-medium text-black/40">
      {n}
    </span>
  );
}

function Stepper({
  value,
  min,
  max,
  onChange,
}: {
  value: number;
  min: number;
  max?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        className="flex h-7 w-7 items-center justify-center border border-black/15 text-xs text-black/40 transition-colors hover:border-black/40 hover:text-black/70 disabled:opacity-25"
      >
        −
      </button>
      <span className="w-6 text-center text-sm tabular-nums text-black/70">{value}</span>
      <button
        type="button"
        disabled={max !== undefined && value >= max}
        onClick={() => onChange(value + 1)}
        className="flex h-7 w-7 items-center justify-center border border-black/15 text-xs text-black/40 transition-colors hover:border-black/40 hover:text-black/70 disabled:opacity-25"
      >
        +
      </button>
    </div>
  );
}

function tileClass(active: boolean): string {
  return active
    ? "border border-black bg-black px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] text-white"
    : "border border-black/20 px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] text-black/50 transition-colors hover:border-black/50 hover:text-black/75";
}

function smallTileClass(active: boolean): string {
  return active
    ? "border border-black bg-black px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-white"
    : "border border-black/20 px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-black/50 transition-colors hover:border-black/50 hover:text-black/75";
}

const panelClass = "border border-black/8 bg-black/1.5 p-5 sm:p-6";
const fieldClass =
  "w-full border-t border-black/[0.07] bg-transparent py-4 text-sm text-black/70 outline-none transition-colors focus:border-black/30";

function safeInitialService(value?: CalculatorService): CalculatorService {
  if (
    value === "portrait" ||
    value === "corporate-event" ||
    value === "gallery-event" ||
    value === "artwork-documentation"
  ) {
    return value;
  }

  return "portrait";
}

export function PricingCalculator({ locale, initialService, initialStatus = null }: PricingCalculatorProps) {
  const t = content[locale];
  const [country, setCountry] = useState<PricingCountry>("australia");
  const [service, setService] = useState<CalculatorService>(safeInitialService(initialService));
  const [preferredLanguage, setPreferredLanguage] = useState<CommunicationLanguage>("english");
  const [secondaryLanguages, setSecondaryLanguages] = useState<CommunicationLanguage[]>([]);
  const [sessionLength, setSessionLength] = useState<PortraitSessionLength>("up-to-1-5-hours");
  const [peopleCount, setPeopleCount] = useState(1);
  const [location, setLocation] = useState<PortraitLocation>("studio");
  const [makeupCount, setMakeupCount] = useState(0);
  const [hairCount, setHairCount] = useState(0);
  const [portraitUrgency, setPortraitUrgency] = useState<PortraitUrgency>("standard");
  const [usage, setUsage] = useState<PortraitUsage>("owned-channels");
  const [eventDuration, setEventDuration] = useState<EventDuration>("up-to-2-hours");
  const [eventUrgency, setEventUrgency] = useState<EventUrgency>("standard");
  const [showForm, setShowForm] = useState(initialStatus !== null);
  const [showSecondary, setShowSecondary] = useState(false);

  const result =
    service === "portrait"
      ? estimatePortrait({
          country,
          sessionLength,
          peopleCount,
          location,
          makeupCount,
          hairCount,
          urgency: portraitUrgency,
          usage,
        })
      : estimateEvent({
          country,
          duration: eventDuration,
          urgency: eventUrgency,
          service,
        });

  const detailLines =
    service === "portrait"
      ? [
          countryOptions.find((option) => option.value === country)?.label,
          serviceOptions[locale].find((option) => option.value === service)?.label,
          portraitSessionOptions[locale].find((option) => option.value === sessionLength)?.label,
          `${peopleCount}`,
          portraitLocationOptions[locale].find((option) => option.value === location)?.label,
          `${t.makeupCountLabel}: ${makeupCount}`,
          `${t.hairCountLabel}: ${hairCount}`,
          portraitUrgencyOptions[locale].find((option) => option.value === portraitUrgency)?.label,
          portraitUsageOptions[locale].find((option) => option.value === usage)?.label,
        ]
      : [
          countryOptions.find((option) => option.value === country)?.label,
          serviceOptions[locale].find((option) => option.value === service)?.label,
          eventDurationOptions[locale].find((option) => option.value === eventDuration)?.label,
          eventUrgencyOptions[locale].find((option) => option.value === eventUrgency)?.label,
        ];

  const params = new URLSearchParams({
    calc: "1",
    calcCountry: country,
    calcService: service,
    calcPreferredLanguage: preferredLanguage,
    calcSecondaryLanguages: secondaryLanguages.join(","),
    calcEstimateLow: String(result.low),
    calcEstimateHigh: String(result.high),
    calcCurrency: result.currency,
    calcDetails: detailLines.filter(Boolean).join(" · "),
  });

  const serviceLabel = serviceOptions[locale].find((option) => option.value === service)?.label ?? service;
  const countryLabel = countryOptions.find((option) => option.value === country)?.label ?? country;
  const urgencyLabel =
    service === "portrait"
      ? portraitUrgencyOptions[locale].find((option) => option.value === portraitUrgency)?.label ?? portraitUrgency
      : eventUrgencyOptions[locale].find((option) => option.value === eventUrgency)?.label ?? eventUrgency;
  const redirectPath = `/${locale}/pricing-calculator?service=${service}`;

  function toggleSecondaryLanguage(language: CommunicationLanguage) {
    setSecondaryLanguages((current) =>
      current.includes(language)
        ? current.filter((entry) => entry !== language)
        : [...current, language],
    );
  }

  function handlePeopleChange(value: number) {
    const nextPeopleCount = Math.max(1, clampPositiveInteger(value, 1));
    setPeopleCount(nextPeopleCount);
    setMakeupCount((current) => Math.min(current, nextPeopleCount));
    setHairCount((current) => Math.min(current, nextPeopleCount));
  }

  return (
    <section className="section pt-24 md:pt-32">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(20rem,0.85fr)] lg:items-start">
        {/* ── Left column: numbered steps ── */}
        <div>
          <p className="label mb-6">{t.eyebrow}</p>
          <h1
            className="max-w-3xl text-[clamp(3rem,7vw,6rem)] leading-[0.95]"
            style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
          >
            {t.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-sm text-black/55 leading-relaxed">{t.intro}</p>

          {/* Step 1 — Country */}
          <div className="mt-12">
            <div className="mb-5 flex items-center gap-3">
              <StepBadge n={1} />
              <p className="label">{t.step1}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {countryOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={tileClass(country === option.value)}
                  onClick={() => setCountry(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 — Service */}
          <div className="mt-10">
            <div className="mb-5 flex items-center gap-3">
              <StepBadge n={2} />
              <p className="label">{t.step2}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {serviceOptions[locale].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={tileClass(service === option.value)}
                  onClick={() => setService(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3 — Details */}
          <div className="mt-10">
            <div className="mb-5 flex items-center gap-3">
              <StepBadge n={3} />
              <p className="label">{service === "portrait" ? t.portraitLabel : t.eventLabel}</p>
            </div>

{service === "portrait" ? (
              <div className="divide-y divide-black/[0.07] border-y border-black/[0.07]">
                <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-6">
                  <label htmlFor="sessionLength" className="text-sm text-black/55 sm:w-44 sm:shrink-0">
                    {t.sessionLengthLabel}
                  </label>
                  <select
                    id="sessionLength"
                    className="w-full cursor-pointer bg-transparent text-sm text-black/70 outline-none sm:min-w-0 sm:flex-1"
                    value={sessionLength}
                    onChange={(event) => setSessionLength(event.target.value as PortraitSessionLength)}
                  >
                    {portraitSessionOptions[locale].map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-6">
                  <p className="text-sm text-black/55 sm:w-44 sm:shrink-0">{t.peopleCountLabel}</p>
                  <Stepper value={peopleCount} min={1} onChange={handlePeopleChange} />
                </div>

                <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-6">
                  <p className="text-sm text-black/55 sm:w-44 sm:shrink-0">{t.locationLabel}</p>
                  <div className="flex flex-wrap gap-2">
                    {portraitLocationOptions[locale].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={smallTileClass(location === option.value)}
                        onClick={() => setLocation(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-6">
                  <p className="text-sm text-black/55 sm:w-44 sm:shrink-0">{t.makeupCountLabel}</p>
                  <Stepper
                    value={makeupCount}
                    min={0}
                    max={peopleCount}
                    onChange={(value) => setMakeupCount(Math.min(peopleCount, clampPositiveInteger(value, 0)))}
                  />
                </div>

                <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-6">
                  <p className="text-sm text-black/55 sm:w-44 sm:shrink-0">{t.hairCountLabel}</p>
                  <Stepper
                    value={hairCount}
                    min={0}
                    max={peopleCount}
                    onChange={(value) => setHairCount(Math.min(peopleCount, clampPositiveInteger(value, 0)))}
                  />
                </div>

                <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-6">
                  <label htmlFor="portraitUrgency" className="text-sm text-black/55 sm:w-44 sm:shrink-0">
                    {t.urgencyLabel}
                  </label>
                  <select
                    id="portraitUrgency"
                    className="w-full cursor-pointer bg-transparent text-sm text-black/70 outline-none sm:min-w-0 sm:flex-1"
                    value={portraitUrgency}
                    onChange={(event) => setPortraitUrgency(event.target.value as PortraitUrgency)}
                  >
                    {portraitUrgencyOptions[locale].map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-6">
                  <label htmlFor="usage" className="text-sm text-black/55 sm:w-44 sm:shrink-0">
                    {t.usageLabel}
                  </label>
                  <select
                    id="usage"
                    className="w-full cursor-pointer bg-transparent text-sm text-black/70 outline-none sm:min-w-0 sm:flex-1"
                    value={usage}
                    onChange={(event) => setUsage(event.target.value as PortraitUsage)}
                  >
                    {portraitUsageOptions[locale].map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-black/[0.07] border-y border-black/[0.07]">
                <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-6">
                  <p className="text-sm text-black/55 sm:w-44 sm:shrink-0">{t.durationLabel}</p>
                  <div className="flex flex-wrap gap-2">
                    {eventDurationOptions[locale].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={smallTileClass(eventDuration === option.value)}
                        onClick={() => setEventDuration(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-6">
                  <label htmlFor="eventUrgency" className="text-sm text-black/55 sm:w-44 sm:shrink-0">
                    {t.urgencyLabel}
                  </label>
                  <select
                    id="eventUrgency"
                    className="w-full cursor-pointer bg-transparent text-sm text-black/70 outline-none sm:min-w-0 sm:flex-1"
                    value={eventUrgency}
                    onChange={(event) => setEventUrgency(event.target.value as EventUrgency)}
                  >
                    {eventUrgencyOptions[locale].map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Right column: sticky estimate + contact form ── */}
        <aside className="lg:sticky lg:top-28">
          <div className="border border-black/12 p-6 sm:p-8">
            <p className="label mb-3">{t.resultLabel}</p>
            <p
              className="text-[clamp(2.5rem,5vw,4rem)] leading-[0.9] text-black/85"
              style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
            >
              {formatEstimateRange(result)}
            </p>
            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-1 border-t border-black/[0.07] pt-4 text-sm text-black/50">
              <span>{countryOptions.find((option) => option.value === country)?.label}</span>
              <span>{serviceOptions[locale].find((option) => option.value === service)?.label}</span>
            </div>

            <div className="mt-5 border-t border-black/[0.07] pt-5">
              <p className="label mb-2">{t.includedLabel}</p>
              <p className="text-sm text-black/50 leading-relaxed">
                {service === "portrait" ? t.includedPortrait : t.includedEvent}
              </p>
              <p className="mt-3 text-xs text-black/30 leading-relaxed">{t.resultNote}</p>
            </div>

            <div className="mt-6 border-t border-black/[0.07] pt-6">
              {!showForm ? (
                <>
                  <button
                    type="button"
                    className="btn w-full justify-center"
                    onClick={() => setShowForm(true)}
                  >
                    {t.showFormCta}
                  </button>
                  <p className="mt-4 text-xs text-black/35 leading-relaxed">{t.helper}</p>
                  <Link
                    href={`/${locale}/contact-booking?${params.toString()}`}
                    className="btn-ghost mt-3 block text-xs"
                  >
                    {t.directBriefBtn}
                  </Link>
                </>
              ) : (
                <>
                  {initialStatus === "sent" && (
                    <p className="mb-4 border border-black/12 bg-black/1.5 px-4 py-3 text-sm text-black/60">
                      {t.sentMsg}
                    </p>
                  )}
                  {initialStatus === "error" && (
                    <p className="mb-4 border border-black/12 bg-black/1.5 px-4 py-3 text-sm text-black/60">
                      {t.errorMsg}
                    </p>
                  )}
                  <form method="POST" action="/api/contact">
                    <input type="hidden" name="locale" value={locale} />
                    <input type="hidden" name="startedAt" value="" />
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                    <input type="hidden" name="redirectPath" value={redirectPath} />
                    <input type="hidden" name="type" value={serviceLabel} />
                    <input type="hidden" name="people" value={service === "portrait" ? String(peopleCount) : ""} />
                    <input type="hidden" name="location" value={countryLabel} />
                    <input type="hidden" name="formats" value={service === "portrait" ? (portraitUsageOptions[locale].find((option) => option.value === usage)?.label ?? "") : ""} />
                    <input type="hidden" name="timeline" value={urgencyLabel} />
                    <input type="hidden" name="invoice" value={result.currency} />
                    <input type="hidden" name="nda" value="" />
                    <input type="hidden" name="calcCountry" value={country} />
                    <input type="hidden" name="calcService" value={service} />
                    <input type="hidden" name="calcEstimateLow" value={String(result.low)} />
                    <input type="hidden" name="calcEstimateHigh" value={String(result.high)} />
                    <input type="hidden" name="calcCurrency" value={result.currency} />
                    <input type="hidden" name="calcDetails" value={detailLines.filter(Boolean).join(" · ")} />
                    <input type="hidden" name="calcSecondaryLanguages" value={secondaryLanguages.join(",")} />

                    <div className="divide-y divide-black/[0.07] border-t border-black/[0.07]">
                      <div className="py-4">
                        <label htmlFor="formPreferredLanguage" className="label mb-2 block">
                          {t.languageLabel}
                        </label>
                        <select
                          id="formPreferredLanguage"
                          name="preferredLanguage"
                          className="w-full cursor-pointer bg-transparent text-sm text-black/70 outline-none"
                          value={preferredLanguage}
                          onChange={(event) => setPreferredLanguage(event.target.value as CommunicationLanguage)}
                        >
                          {communicationOptions[locale].map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {!showSecondary ? (
                          <button
                            type="button"
                            className="mt-2 text-xs text-black/35 transition-colors hover:text-black/60"
                            onClick={() => setShowSecondary(true)}
                          >
                            {t.secondaryLanguageAdd}
                          </button>
                        ) : (
                          <div className="mt-3">
                            <p className="mb-2 text-xs text-black/40">{t.secondaryLanguageHint}</p>
                            <div className="flex flex-wrap gap-2">
                              {communicationOptions[locale].map((option) => (
                                <button
                                  key={option.value}
                                  type="button"
                                  className={`btn ${secondaryLanguages.includes(option.value) ? "" : "opacity-50 hover:opacity-80"}`}
                                  onClick={() => toggleSecondaryLanguage(option.value)}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder={t.namePh}
                        className="w-full bg-transparent py-4 text-sm placeholder:text-black/30 outline-none transition-colors"
                      />
                      <input
                        type="text"
                        name="company"
                        placeholder={t.companyPh}
                        className="w-full bg-transparent py-4 text-sm placeholder:text-black/30 outline-none transition-colors"
                      />
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder={t.emailPh}
                        className="w-full bg-transparent py-4 text-sm placeholder:text-black/30 outline-none transition-colors"
                      />
                      <input
                        type="text"
                        name="date"
                        placeholder={t.datePh}
                        className="w-full bg-transparent py-4 text-sm placeholder:text-black/30 outline-none transition-colors"
                      />
                      <textarea
                        name="notes"
                        rows={3}
                        placeholder={t.notesPh}
                        className="w-full bg-transparent py-4 text-sm placeholder:text-black/30 outline-none transition-colors resize-none"
                      />
                      <div className="pt-5">
                        <button type="submit" className="btn w-full justify-center">
                          {t.cta}
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="mt-5 text-xs text-black/35 leading-relaxed">{t.helper}</p>
                  <Link
                    href={`/${locale}/contact-booking?${params.toString()}`}
                    className="btn-ghost mt-3 block text-xs"
                  >
                    {t.directBriefBtn}
                  </Link>
                </>
              )}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

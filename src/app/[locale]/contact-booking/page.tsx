import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact & Booking — Executive Portrait & Corporate Event Photographer Tokyo | Eva Gorobets",
    description:
      "Book an executive portrait or corporate event session in Tokyo. Structured brief form, response within 24 hours. Communication in English, Japanese and Russian.",
  };
}

type PageProps = { params: Promise<{ locale: string }> };

const inputClass =
  "w-full border-t border-black/[0.07] bg-transparent py-5 text-sm placeholder:text-black/35 outline-none focus:border-black/30 transition-colors";
const selectClass =
  "w-full border-t border-black/[0.07] bg-transparent py-5 text-sm text-black/60 outline-none";

const content = {
  en: {
    eyebrow: "Contact",
    h1: "Send a brief or enquiry",
    sub: "Structured form — takes under three minutes. Response within 24 hours.",
    sectionContact: "Your details",
    namePh: "Name",
    companyPh: "Company / organisation",
    emailPh: "Email",
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
    directLabel: "Direct contact",
    corporateLabel: "Corporate clients",
    corporateItems: [["NDA", "Available before briefing"], ["Invoicing", "JPY · AUD · USD"], ["Payment", "Net-30 for corporate accounts"], ["Confidentiality", "Client names not published without consent"], ["Response", "Within 24 hours"]],
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
  },
  jp: {
    eyebrow: "お問い合わせ",
    h1: "ブリーフまたはご相談を送る",
    sub: "フォームへの入力は3分以内。24時間以内にご返答します。",
    sectionContact: "お客様の情報",
    namePh: "お名前",
    companyPh: "会社名 / 組織名",
    emailPh: "メールアドレス",
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
    directLabel: "直接連絡",
    corporateLabel: "法人クライアント",
    corporateItems: [["NDA", "ブリーフ前に対応可能"], ["請求通貨", "JPY · AUD · USD"], ["支払条件", "法人アカウントはNet-30"], ["守秘義務", "同意なくクライアント名を公開しません"], ["応答時間", "24時間以内"]],
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
  },
  ru: {
    eyebrow: "Контакт",
    h1: "Отправить бриф или запрос",
    sub: "Структурированная форма — занимает менее трёх минут. Ответ в течение 24 часов.",
    sectionContact: "Ваши данные",
    namePh: "Имя",
    companyPh: "Компания / организация",
    emailPh: "Email",
    sectionProject: "Проект",
    typeLabel: "Тип съёмки",
    typeOptions: ["Портреты руководителей / лидерства", "Корпоративное мероприятие — один день", "Корпоративное мероприятие — несколько дней", "Портреты + мероприятие (совмещено)", "Съёмка по подписке", "Арт-галерея / культурное мероприятие", "Другое"],
    peopleLabel: "Количество людей (портреты)",
    peopleOptions: ["1 человек", "2–5 человек", "6–15 человек", "16–30 человек", "30+ человек", "Не применимо — только мероприятие"],
    locationLabel: "Местоположение",
    locationOptions: ["Токио — Маруноути / Отэмати", "Токио — Синдзюку", "Токио — Сибуя / Роппонги", "Токио — другой район", "За пределами Токио (Япония)", "Мельбурн", "Другое / международное"],
    datePh: "Дата или предпочтительный период",
    sectionDeliverables: "Необходимые материалы",
    formatsLabel: "Требуемые форматы файлов",
    formatsOptions: ["Только web / цифровые", "Файлы для печати", "Web + пакет для соцсетей", "Web + печать + соцсети (все форматы)", "Не знаю — посоветуйте"],
    timelineLabel: "Срочность доставки",
    timelineOptions: ["Стандарт — 3–5 рабочих дней", "В течение 48 часов (хайлайты в день съёмки)", "Гибко — без срока"],
    sectionCorporate: "Корпоративные требования",
    invoiceLabel: "Валюта счёта",
    invoiceOptions: ["JPY (японская иена)", "AUD (австралийский доллар)", "USD (доллар США)", "Пока не знаю"],
    ndaLabel: "Нужно ли NDA?",
    ndaOptions: ["Да — пришлите NDA до передачи брифа", "Нет — готов(а) продолжать без NDA", "Не уверен(а)"],
    notesPh: "Дополнительно — по желанию",
    submitBtn: "Отправить бриф",
    directLabel: "Прямой контакт",
    corporateLabel: "Корпоративным клиентам",
    corporateItems: [["NDA", "По запросу до брифа"], ["Счета", "JPY · AUD · USD"], ["Оплата", "Net-30 для корпоративных аккаунтов"], ["Конфиденциальность", "Имена клиентов не публикуются без согласия"], ["Ответ", "В течение 24 часов"]],
    langLabel: "Языки",
    langBody: "Брифинг и коммуникация на английском, японском и русском — токийский офис и глобальный HQ могут обращаться напрямую.",
    langLink: "Для компаний →",
    faqLabel: "FAQ",
    faq: [
      ["Сроки доставки", "Стандартная доставка за 3–5 рабочих дней. Хайлайты в день съёмки — по запросу."],
      ["Корпоративные счета и PO", "Счета в JPY, AUD или USD. Поддержка процесса PO. Net-30 для постоянных аккаунтов."],
      ["NDA и конфиденциальность", "NDA может быть подписан до передачи брифа. Имена клиентов и детали проектов никогда не публикуются без явного письменного согласия."],
      ["Местоположение и выезд", "Базируется в Токио, работает по всей Японии. Мельбурн и международные съёмки — по договорённости. Транспортные расходы обсуждаются на этапе коммерческого предложения."],
    ],
  },
} as const;

type Locale = keyof typeof content;

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  const t = content[(locale as Locale) in content ? (locale as Locale) : "en"];

  return (
    <>
      <section className="section pt-32">
        <p className="label mb-6">{t.eyebrow}</p>
        <h1
          className="max-w-xl text-[clamp(3rem,6vw,5.5rem)] leading-[0.95]"
          style={{ fontFamily: "var(--font-cormorant)", fontWeight: 400 }}
        >
          {t.h1}
        </h1>
        <p className="mt-5 text-sm text-black/50">{t.sub}</p>
      </section>

      <section className="section grid gap-20 border-t border-black/[0.07] md:grid-cols-[3fr_2fr]">
        {/* Form */}
        <form className="space-y-0">

          {/* Contact */}
          <p className="label py-5 border-t border-black/[0.07]">{t.sectionContact}</p>
          <input type="text" name="name" placeholder={t.namePh} className={inputClass} />
          <input type="text" name="company" placeholder={t.companyPh} className={inputClass} />
          <input type="email" name="email" placeholder={t.emailPh} className={inputClass} />

          {/* Project */}
          <p className="label pt-8 pb-5 border-t border-black/[0.07] mt-4">{t.sectionProject}</p>
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

          {/* Deliverables */}
          <p className="label pt-8 pb-5 border-t border-black/[0.07] mt-4">{t.sectionDeliverables}</p>
          <select name="formats" className={selectClass}>
            <option value="">{t.formatsLabel}</option>
            {t.formatsOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
          <select name="timeline" className={selectClass}>
            <option value="">{t.timelineLabel}</option>
            {t.timelineOptions.map((o) => <option key={o}>{o}</option>)}
          </select>

          {/* Corporate needs */}
          <p className="label pt-8 pb-5 border-t border-black/[0.07] mt-4">{t.sectionCorporate}</p>
          <select name="invoice" className={selectClass}>
            <option value="">{t.invoiceLabel}</option>
            {t.invoiceOptions.map((o) => <option key={o}>{o}</option>)}
          </select>
          <select name="nda" className={selectClass}>
            <option value="">{t.ndaLabel}</option>
            {t.ndaOptions.map((o) => <option key={o}>{o}</option>)}
          </select>

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

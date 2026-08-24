import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { SiteFooter } from "@/components/SiteFooter";

type Language = "ru" | "en";
type Status = "sent" | "error" | undefined;

const modules = [
  ["Структура международного рынка", "Перестать искать абстрактных клиентов.", "Сегменты, типы заказчиков, роли внутри организации и каналы входа.", "Карта целевых сегментов на одном рынке и один приоритетный сегмент."],
  ["Фотография как продукт", "Перестать продавать часы съемки.", "Как клиент формулирует задачу: репутация, PR, документация, архив, отчетность или продажи.", "Один-два оффера и новое описание услуги."],
  ["B2B / B2G документооборот", "Убрать хаос из брифа, прав и оплаты.", "Путь проекта: inquiry > discovery > brief > proposal > contract > invoice > licensing > delivery > follow-up.", "Базовый комплект документов и понимание, где нужен локальный юрист или бухгалтер."],
  ["Коммуникация и ожидания", "Сделать клиентский опыт предсказуемым.", "Первый ответ, discovery call, бюджет, несколько стейкхолдеров, правки, отказ и follow-up.", "Библиотека писем и сценариев созвонов."],
  ["Выход на рынок", "Собрать план действий, а не ждать вдохновения.", "Список 20-30 целевых организаций, последовательность контактов и метрики на 90 дней.", "Персональный 90-дневный план с KPI."],
] as const;
const moduleTitles = ["International market structure", "Photography as a product", "B2B / B2G documentation", "Communication and expectations", "Go-to-market plan"];
const moduleGoals = ["Stop looking for abstract clients.", "Stop selling hours of shooting.", "Remove chaos from briefs, rights and payment.", "Make the client experience predictable.", "Leave with an action plan."];
const moduleBodies = ["Segments, buyer roles and entry channels.", "Client jobs, offer structure and usage rights.", "The project path from enquiry to follow-up.", "First replies, discovery calls, budget and revisions.", "Target organisations, contact sequence and 90-day metrics."];
const moduleResults = ["A market map and one priority segment.", "One or two offers and a rewritten service description.", "A core document kit and a clear legal review point.", "A library of emails and call scripts.", "A personal 90-day plan with KPIs."];
const faqRu = [["Нужен ли идеальный английский?", "Нет. Важнее ясность, правильные вопросы и управляемый процесс. С языком профессиональной коммуникации мы работаем."], ["Подойдет ли фотографу из любого жанра?", "Лучше всего портретным, корпоративным, событийным, архитектурным, культурным и коммерческим фотографам. Для чисто художественной практики без клиентских проектов программа менее релевантна."], ["Вы дадите шаблоны договоров?", "Да, структуру и рабочие шаблоны для адаптации. Финальную проверку делает локальный юрист."], ["Когда проходят встречи и как устроена оплата?", "Понедельники, 18:00 Мельбурн / 10:00 Москва / 09:00 Берлин до 25 октября; далее 08:00 Берлин. Полная предоплата через PayPal или Wise после отбора. Рассрочка 50/50 по запросу. Записи включены."], ["Гарантирует ли программа заказы?", "Нет. Программа повышает готовность к таким заказам, но не может гарантировать решения клиентов или результаты тендеров."]] as const;
const faqEn = [["Do I need perfect English?", "No. Clarity, good questions and a manageable process matter more. We work with the language of professional communication."], ["Is it suitable for every genre?", "It is most relevant to portrait, corporate, event, architectural, cultural and commercial photographers."], ["Will you provide contract templates?", "Yes, structures and working templates for adaptation. Final review is done by a local lawyer."], ["When are the sessions and how does payment work?", "Mondays, 18:00 Melbourne / 10:00 Moscow / 09:00 Berlin until 25 October; then 08:00 Berlin. Full prepayment via PayPal or Wise after selection. 50/50 instalments by request. Recordings included."], ["Does the programme guarantee work?", "No. It improves your readiness, but cannot guarantee client decisions or tender outcomes."]] as const;
const clientLogos = [
  ["KPMG", "/mentoring/KPMG_NoCP_RGB_280.png", "logo-wide"],
  ["Forbes", "/mentoring/Forbes.png", "logo-wide"],
  ["McKinsey & Company", "/mentoring/McKinsey_&_Company-Logo.wine.png", "logo-wide"],
  ["SAP", "/mentoring/SAP_2011_logo.svg.webp", "logo-wide"],
  ["General Electric", "/mentoring/General_Electric_logo.svg", "logo-square"],
  ["EY", "/mentoring/EY_logo_2019.svg.webp", "logo-square"],
  ["State Library Victoria", "/mentoring/state library victoria.jpg", "logo-wide"],
  ["The Ritz-Carlton", "/mentoring/the-ritz-carlton-logo-png-transparent.png", "logo-wide"],
  ["Cirque du Soleil", "/mentoring/Cirque-du-Soleil-Logo.png", "logo-wide"],
  ["DoorDash", "/mentoring/DoorDash-logo.png", "logo-wide"],
  ["Expo 2017", "/mentoring/Expo_2017_official_logo.png", "logo-wide"],
  ["Бронная", "/mentoring/bronnaya.png", "logo-wide"],
] as const;
const studentPhotos = [
  ["Students in a mentoring session", "/mentoring/IMG_3802.JPG"],
  ["Students working together", "/mentoring/13063324_889628181154745_6661618150573690818_O.JPG"],
] as const;
const workPhotos = [
  ["Working moment", "/mentoring/18558908_1615789021764778_7959615327926968139_O.JPG"],
  ["Working moment", "/mentoring/IMG_8257.jpeg"],
  ["Working moment", "/mentoring/11728856_1115889028424489_5838883013689263365_o.jpg"],
] as const;

const copy = {
  ru: {
    subtitle: "Менторская программа для фотографов, которые хотят работать с международными B2B и B2G клиентами",
    intro: "Перестройте практику из набора разовых съемок в профессиональную систему: понятный продукт, сильная клиентская коммуникация, документы и процессы для работы с компаниями, организациями и институциями.",
    about: "Я Ева Горобец, фотограф и культурный исследователь. Работаю между Токио, Мельбурном и международными рынками. За 15+ лет практики я работала с executive-портретами, корпоративной съемкой и арт-сектором, в том числе для KPMG, Google, McKinsey, SAP, General Electric, EY и State Library Victoria.",
    before: "Умею снимать, но не понимаю, как работать с компаниями. Не знаю, кто принимает решение. Каждый раз заново объясняю, что делаю и сколько стою. Документы, права и счета вызывают напряжение.",
    after: "Есть понятный сегмент и рабочий оффер. Вы объясняете ценность на языке задачи клиента, ведете проект от запроса до follow-up и знаете, что делать следующие 90 дней.",
    fit: "Для профессиональных фотографов, которые хотят перейти к структурированной международной практике, работают между странами и стремятся к брендам, корпорациям, фондам, университетам, галереям и институциям.",
    notFit: "Не для тех, кто ищет обучение свету и ретуши, не имеет практики и портфолио, ожидает гарантии заказов, трудоустройства, визы или доступа к клиентам.",
    boundaries: "Программа дает рабочую структуру и адаптируемые шаблоны. Она не заменяет юридическую, налоговую, страховую или миграционную консультацию. Правила B2G различаются по странам и организациям; участник отвечает за локальную проверку договоров и прав.",
    formTitle: "Анкета отбора", formNote: "Небольшая группа, отбор по анкете. Заполнение займет около 7 минут.", submit: "Отправить заявку", sent: "Спасибо. Заявка отправлена, я отвечу после просмотра анкеты.", error: "Не удалось отправить заявку. Заполните имя, email, согласие и хотя бы одну ссылку.", consent: "Даю согласие на обработку данных для рассмотрения заявки и связи по программе.",
    questions: ["Текущий основной тип клиентов и средний чек", "На каком рынке вы сейчас и на какой хотите выйти", "Как сейчас описываете услугу", "Самая главная проблема в работе с клиентами сейчас", "Что будет успешным результатом программы"],
    placeholders: ["Имя", "Email", "Instagram", "LinkedIn", "Сайт-портфолио", "Например: корпоративные портреты, 500 USD", "Например: Австралия -> Япония", "Скопируйте текст с сайта", "Опишите проблему", "Что изменится после программы?"],
  },
  en: {
    subtitle: "Mentoring for photographers working with international B2B and B2G clients", intro: "Turn a series of one-off shoots into a professional operating system: a clear product, stronger client communication, and the documents and processes needed to work with companies, organisations and institutions.", about: "I am Eva Gorobets, a photographer and cultural researcher working between Tokyo, Melbourne and international markets. Over 15+ years I have worked across executive portraits, corporate photography and the art sector, including KPMG, Google, McKinsey, SAP, General Electric, EY and State Library Victoria.", before: "I know how to shoot, but not how to work with companies. I do not know who makes the decision. I explain my work and pricing from scratch every time. Documents, rights and invoices create friction.", after: "You have a clear segment and a working offer. You can explain value in the client's language, run a project from enquiry to follow-up, and know what to do for the next 90 days.", fit: "For professional photographers moving towards a structured international practice, working across countries, and targeting brands, corporations, foundations, universities, galleries and institutions.", notFit: "Not for photographers looking for lighting or retouching training, without a portfolio, or expecting guaranteed work, employment, a visa or access to clients.", boundaries: "The programme provides a working structure and adaptable templates. It does not replace legal, tax, insurance or migration advice. B2G rules vary by country and organisation; participants are responsible for local review of contracts and rights.", formTitle: "Application form", formNote: "A small group selected by application. Allow around 7 minutes to complete.", submit: "Send application", sent: "Thank you. Your application has been sent and I will reply after reviewing it.", error: "The application could not be sent. Add your name, email, consent and at least one link.", consent: "I consent to my data being used to review this application and contact me about the programme.",
    questions: ["Your current main client type and average fee", "Where do you work now and which market do you want to enter", "How do you currently describe your service", "Your biggest current problem with clients", "What would make the programme successful for you"], placeholders: ["Name", "Email", "Instagram", "LinkedIn", "Portfolio website", "For example: corporate portraits, USD 500", "For example: Australia -> Japan", "Paste the text from your website", "Describe the problem", "What should change after the programme?"],
  },
} as const;

function Field({ name, placeholder, required = false, textarea = false }: { name: string; placeholder: string; required?: boolean; textarea?: boolean }) {
  const className = "mt-2 block w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none placeholder:text-black/35 transition-colors focus:border-black focus:bg-[#fffdf8] focus:ring-2 focus:ring-black/10";
  const questionField = ["currentClients", "targetMarket", "serviceDescription", "documents", "difficultSituation", "mainProblem", "successResult"].includes(name);
  const fieldName = name === "documents" ? "mainProblem" : name === "difficultSituation" ? "successResult" : name;
  return <div className="mentoring-field">
    {!questionField && <label htmlFor={fieldName} className="mentoring-field-label">{placeholder}{required && <span aria-hidden="true"> *</span>}</label>}
    {textarea ? <textarea id={fieldName} name={fieldName} placeholder={placeholder} required={required} rows={3} className={`${className} resize-y`} /> : <input id={fieldName} name={fieldName} placeholder={placeholder} required={required} className={className} />}
  </div>;
}

export function MentoringPage({ language, status, aboutPhotoSrc }: { language: Language; status: Status; aboutPhotoSrc?: string | null }) {
  const t = copy[language];
  const isRussian = language === "ru";
  const questions = t.questions;
  const faq = isRussian ? faqRu : faqEn;
  const href = isRussian ? "/mentoring" : "/en/mentoring";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "International Photography Practice",
    description: t.intro,
    url: `https://evagorobets.com${href}`,
    inLanguage: isRussian ? "ru" : "en",
    provider: { "@type": "Person", name: isRussian ? "Ева Горобец" : "Eva Gorobets", url: "https://evagorobets.com" },
    offers: { "@type": "Offer", price: "1450", priceCurrency: "USD", availability: "https://schema.org/LimitedAvailability", validThrough: "2026-10-05" },
    hasCourseInstance: { "@type": "CourseInstance", startDate: "2026-10-19", endDate: "2026-11-16", courseMode: "online", courseWorkload: "PT2H" },
  };
  return <div className={isRussian ? "mentoring-page mentoring-page-ru" : "mentoring-page"}>
    <Script id={`mentoring-schema-${language}`} type="application/ld+json">{JSON.stringify(schema)}</Script>
    <header className="mx-auto flex w-full max-w-340 items-center justify-between px-4 py-6 sm:px-6 md:px-10"><Link href={isRussian ? "/" : "/en"} className="label text-black/70">{isRussian ? "Ева Горобец" : "Eva Gorobets"}</Link><Link href={isRussian ? "/en/mentoring" : "/mentoring"} className="label hover:text-black">{isRussian ? "English version" : "Русская версия"}</Link></header>
    <main>
      <section className="section pt-18 md:pt-28"><p className="label mb-6">International Photography Practice · 2026</p><h1 className="max-w-5xl text-[clamp(3.4rem,8vw,8rem)] leading-[0.88]">International Photography Practice</h1><div className="mt-10 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end"><h2 className="max-w-2xl text-[clamp(1.8rem,3vw,3rem)] leading-tight">{t.subtitle}</h2><div><p className="text-sm leading-relaxed text-black/60">{t.intro}</p><a href="#application" className="btn mt-7">{isRussian ? "Подать заявку" : "Apply now"}</a></div></div><div className="mentoring-meta mt-20 grid border-t border-black/8 pt-6 text-sm md:grid-cols-3 md:gap-8"><p><span className="label block mb-2">Dates</span>19 October - 16 November 2026</p><p><span className="label block mb-2">Format</span>5 weeks · up to 6 participants · Russian</p><p><span className="label block mb-2">Investment</span>1,450 USD / 2,200 AUD</p></div></section>
      <section className="section border-t border-black/8"><p className="label mb-8">{isRussian ? "О программе" : "Why this programme"}</p><div className="mentoring-about-copy">{aboutPhotoSrc && <div className="mentoring-about-photo"><Image src={aboutPhotoSrc} alt={isRussian ? "Ева Горобец, фотограф" : "Eva Gorobets, photographer"} fill sizes="(max-width: 767px) 100vw, 360px" /></div>}<p className="max-w-xl text-lg leading-relaxed text-black/70">{t.about}</p></div></section>
      <section className="mentoring-client-proof border-t border-black/8"><div className="section py-14! md:py-18!"><p className="label">{isRussian ? "Мои клиенты" : "My clients"}</p><div className="mentoring-logo-grid mt-10">{clientLogos.map(([name, src, shape]) => <div key={name} className={`mentoring-logo ${shape}`}><Image src={src} alt={name} fill sizes="(max-width: 767px) 42vw, 180px" /></div>)}</div></div></section>
      <section className="section border-t border-black/8"><div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><p className="label">{isRussian ? "Работа в группе" : "Working with others"}</p><p className="max-w-sm text-sm leading-relaxed text-black/55">{isRussian ? "Менторинг строится вокруг реальной работы участников." : "The mentoring is built around the participants' real work."}</p></div><div className="mentoring-photo-grid mentoring-student-grid mt-10">{studentPhotos.map(([alt, src]) => <div key={src} className="mentoring-photo mentoring-photo-student"><Image src={src} alt={alt} fill sizes="(max-width: 767px) 100vw, 50vw" /></div>)}</div></section>
      <section className="section grid gap-4 border-t border-black/8 md:grid-cols-2"><div className="border-t border-black/8 pt-6"><p className="label mb-5">Before</p><p className="max-w-md text-lg leading-relaxed">{t.before}</p></div><div className="border-t border-black/8 pt-6"><p className="label mb-5">After</p><p className="max-w-md text-lg leading-relaxed">{t.after}</p></div></section>
      <section className="section border-t border-black/8"><p className="label mb-14">{isRussian ? "Программа" : "Programme"}</p><div className="divide-y divide-black/8">{modules.map((module, index) => <article key={module[0]} className="grid gap-5 py-8 md:grid-cols-[80px_1fr_1fr]"><span className="label">0{index + 1}</span><div><h3 className="text-3xl leading-tight">{isRussian ? module[0] : moduleTitles[index]}</h3><p className="mt-3 text-sm text-black/55">{isRussian ? module[1] : moduleGoals[index]}</p></div><p className="text-sm leading-relaxed text-black/60">{isRussian ? module[2] : moduleBodies[index]}<span className="mt-4 block text-black/85"><strong>{isRussian ? "Результат: " : "Outcome: "}</strong>{isRussian ? module[3] : moduleResults[index]}</span></p></article>)}</div></section>
      <section className="section border-t border-black/8"><p className="label mb-8">{isRussian ? "Как проходит работа" : "How it works"}</p><ol className="space-y-4 text-lg">{(isRussian ? ["Анкета и отбор", "Диагностическое задание и индивидуальная сессия 45 минут", "Пять групповых сессий по 90 минут", "Внедрение элементов системы между встречами", "Operating kit и план на 90 дней"] : ["Application and selection", "Diagnostic task and a 45-minute individual session", "Five 90-minute group sessions", "Build your system between sessions", "Operating kit and 90-day plan"]).map((item, index) => <li key={item} className="flex gap-5 border-t border-black/8 pt-3"><span className="label">0{index + 1}</span>{item}</li>)}</ol></section>
      <section className="section border-t border-black/8"><p className="label mb-8">{isRussian ? "Для кого" : "Who it is for"}</p><div className="grid gap-8 md:grid-cols-2"><p className="text-lg leading-relaxed">{t.fit}</p><p className="text-lg leading-relaxed text-black/55">{t.notFit}</p></div></section>
      <section className="section border-t border-black/8"><div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><p className="label">{isRussian ? "Внутри практики" : "Inside the practice"}</p><p className="max-w-sm text-sm leading-relaxed text-black/55">{isRussian ? "Реальные рабочие моменты, из которых собирается система." : "The working moments that become a system."}</p></div><div className="mentoring-photo-grid mentoring-work-grid mt-10">{workPhotos.map(([alt, src], index) => <div key={src} className={`mentoring-photo mentoring-photo-work-${index + 1}`}><Image src={src} alt={alt} fill sizes="(max-width: 767px) 100vw, 33vw" /></div>)}</div></section>
      <section className="section grid gap-12 border-t border-black/8 md:grid-cols-2"><p className="label">FAQ</p><div>{faq.map(([question, answer]) => <details key={question} className="border-t border-black/8"><summary className="cursor-pointer py-4 text-lg">{question}</summary><p className="pb-5 text-sm leading-relaxed text-black/60">{answer}</p></details>)}</div></section>
      <section id="application" className="section grid gap-12 border-t border-black/8 md:grid-cols-[1fr_1.25fr]"><div><p className="label mb-6">{t.formTitle}</p><h2 className="max-w-md text-5xl leading-none">{isRussian ? "Соберите практику, которой доверяют международные клиенты" : "Build a photography practice international clients can trust"}</h2><p className="mt-6 max-w-sm text-sm leading-relaxed text-black/55">{t.formNote}</p></div><form method="POST" action="/api/contact" className="space-y-4"><input type="hidden" name="redirectPath" value={href} /><input type="hidden" name="locale" value="en" /><input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />{status === "sent" && <p className="border border-black/15 bg-black/2 px-4 py-3 text-sm text-black/70">{t.sent}</p>}{status === "error" && <p className="border border-black/15 bg-black/2 px-4 py-3 text-sm text-black/70">{t.error}</p>}<div className="grid gap-4 sm:grid-cols-2"><Field name="name" placeholder={t.placeholders[0]} required /><Field name="email" placeholder={t.placeholders[1]} required /></div><p className="label pt-4">{isRussian ? "Ссылки (заполните хотя бы одну)" : "Links (add at least one)"}</p><div className="grid gap-4 sm:grid-cols-3"><Field name="instagram" placeholder={t.placeholders[2]} /><Field name="linkedin" placeholder={t.placeholders[3]} /><Field name="portfolio" placeholder={t.placeholders[4]} /></div><p className="text-xs text-black/45">{isRussian ? "Минимум одна строка должна быть заполнена." : "At least one link is required."}</p>{questions.map((question, index) => <div key={question}><label className="label mb-2 block">{index + 1}. {question}</label><Field name={["currentClients", "targetMarket", "serviceDescription", "mainProblem", "successResult"][index]} placeholder={t.placeholders[index + 5]} required={false} textarea={index > 1} /></div>)}<label className="flex gap-3 border-t border-black/8 pt-5 text-sm leading-relaxed"><input type="checkbox" name="consent" required value="on" className="mt-1 accent-black" />{t.consent}</label><button type="submit" className="btn mt-3">{t.submit}</button><p className="text-xs text-black/45">{isRussian ? "Дедлайн заявок: 5 октября 2026." : "Application deadline: 5 October 2026."}</p></form></section>
      <section className="section border-t border-black/8"><div className="grid gap-10 md:grid-cols-[1fr_0.8fr] md:items-center"><div><p className="max-w-xl text-[clamp(1.8rem,3vw,3rem)] leading-tight">{isRussian ? "Отношение к фотографии как к триатлону: выносливость, последовательность и движение к цели." : "Treating photography like a triathlon: endurance, consistency and forward motion."}</p></div><div className="mentoring-focus-photo"><Image src="/mentoring/IMG_8376.JPG" alt={isRussian ? "Целеустремленность и отношение к фотографии как к триатлону" : "Determination and a triathlon-like approach to photography"} fill sizes="(max-width: 767px) 100vw, 360px" /></div></div></section>
    </main>
    <SiteFooter locale="en" brandName={isRussian ? "Ева Горобец" : "Eva Gorobets"} />
  </div>;
}

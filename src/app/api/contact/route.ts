import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_LOCALES = new Set(["en", "jp"]);

type ContactPayload = {
  locale: string;
  name: string;
  company: string;
  email: string;
  preferredLanguage: string;
  type: string;
  people: string;
  location: string;
  date: string;
  formats: string;
  timeline: string;
  invoice: string;
  nda: string;
  notes: string;
  calcCountry: string;
  calcService: string;
  calcEstimateLow: string;
  calcEstimateHigh: string;
  calcCurrency: string;
  calcDetails: string;
  calcSecondaryLanguages: string;
  redirectPath: string;
  website: string;
  startedAt: string;
};

const MIN_FORM_FILL_MS = 4_000;
const MAX_LINKS = 2;
const SPAM_PHRASES = [
  "seo",
  "backlinks",
  "guest post",
  "guest posts",
  "domain authority",
  "marketing agency",
  "digital marketing",
  "cold outreach",
  "lead generation",
  "casino",
  "forex",
  "crypto",
  "telegram",
  "whatsapp",
  "click here",
  "do follow",
  "dofollow",
  "link exchange",
  "sponsored post",
];

function getString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function pickLocale(value: string): string {
  return SUPPORTED_LOCALES.has(value) ? value : "en";
}

function countLinks(text: string): number {
  const matches = text.match(/https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|io|co|ru|jp|au|info|biz)\b/gi);
  return matches?.length ?? 0;
}

function hasRepeatedCharacters(text: string): boolean {
  return /(.)\1{6,}/i.test(text);
}

function getContentForSpamCheck(payload: ContactPayload): string {
  return [
    payload.name,
    payload.company,
    payload.email,
    payload.type,
    payload.location,
    payload.notes,
  ]
    .join("\n")
    .toLowerCase();
}

function isSuspiciousPayload(payload: ContactPayload): boolean {
  const content = getContentForSpamCheck(payload);
  const matchedSpamPhrase = SPAM_PHRASES.some((phrase) => content.includes(phrase));
  const excessiveLinks = countLinks(content) > MAX_LINKS;
  const repeatedCharacters = hasRepeatedCharacters(content);
  const suspiciousEmail = /@(mailinator|guerrillamail|tempmail|10minutemail|sharklasers)\./i.test(payload.email);
  const oversizedNotes = payload.notes.length > 2_000;

  return matchedSpamPhrase || excessiveLinks || repeatedCharacters || suspiciousEmail || oversizedNotes;
}

function isTooFast(startedAt: string): boolean {
  if (!startedAt) return false;

  const timestamp = Number(startedAt);
  if (!Number.isFinite(timestamp) || timestamp <= 0) return false;

  return Date.now() - timestamp < MIN_FORM_FILL_MS;
}

function logBlockedSubmission(reason: string, payload: ContactPayload) {
  console.warn("Contact form blocked", {
    reason,
    locale: payload.locale,
    email: payload.email,
    name: payload.name,
  });
}

async function parsePayload(req: NextRequest): Promise<ContactPayload> {
  const contentType = req.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body = await req.json().catch(() => ({}));
    return {
      locale: pickLocale(getString(body.locale)),
      name: getString(body.name),
      company: getString(body.company),
      email: getString(body.email),
      preferredLanguage: getString(body.preferredLanguage),
      type: getString(body.type),
      people: getString(body.people),
      location: getString(body.location),
      date: getString(body.date),
      formats: getString(body.formats),
      timeline: getString(body.timeline),
      invoice: getString(body.invoice),
      nda: getString(body.nda),
      notes: getString(body.notes),
      calcCountry: getString(body.calcCountry),
      calcService: getString(body.calcService),
      calcEstimateLow: getString(body.calcEstimateLow),
      calcEstimateHigh: getString(body.calcEstimateHigh),
      calcCurrency: getString(body.calcCurrency),
      calcDetails: getString(body.calcDetails),
      calcSecondaryLanguages: getString(body.calcSecondaryLanguages),
      redirectPath: getString(body.redirectPath),
      website: getString(body.website),
      startedAt: getString(body.startedAt),
    };
  }

  const formData = await req.formData();
  return {
    locale: pickLocale(getString(formData.get("locale"))),
    name: getString(formData.get("name")),
    company: getString(formData.get("company")),
    email: getString(formData.get("email")),
    preferredLanguage: getString(formData.get("preferredLanguage")),
    type: getString(formData.get("type")),
    people: getString(formData.get("people")),
    location: getString(formData.get("location")),
    date: getString(formData.get("date")),
    formats: getString(formData.get("formats")),
    timeline: getString(formData.get("timeline")),
    invoice: getString(formData.get("invoice")),
    nda: getString(formData.get("nda")),
    notes: getString(formData.get("notes")),
    calcCountry: getString(formData.get("calcCountry")),
    calcService: getString(formData.get("calcService")),
    calcEstimateLow: getString(formData.get("calcEstimateLow")),
    calcEstimateHigh: getString(formData.get("calcEstimateHigh")),
    calcCurrency: getString(formData.get("calcCurrency")),
    calcDetails: getString(formData.get("calcDetails")),
    calcSecondaryLanguages: getString(formData.get("calcSecondaryLanguages")),
    redirectPath: getString(formData.get("redirectPath")),
    website: getString(formData.get("website")),
    startedAt: getString(formData.get("startedAt")),
  };
}

function toPlainText(payload: ContactPayload): string {
  return [
    "New contact brief",
    "",
    `Locale: ${payload.locale}`,
    `Name: ${payload.name}`,
    `Company: ${payload.company || "-"}`,
    `Email: ${payload.email}`,
    `Preferred language: ${payload.preferredLanguage || "-"}`,
    "",
    "Project",
    `Type: ${payload.type || "-"}`,
    `People: ${payload.people || "-"}`,
    `Location: ${payload.location || "-"}`,
    `Date: ${payload.date || "-"}`,
    "",
    "Deliverables",
    `Formats: ${payload.formats || "-"}`,
    `Timeline: ${payload.timeline || "-"}`,
    "",
    "Corporate",
    `Invoice: ${payload.invoice || "-"}`,
    `NDA: ${payload.nda || "-"}`,
    "",
    "Calculator estimate",
    `Country pricing: ${payload.calcCountry || "-"}`,
    `Service: ${payload.calcService || "-"}`,
    `Estimated range: ${payload.calcCurrency && payload.calcEstimateLow && payload.calcEstimateHigh ? `${payload.calcCurrency} ${payload.calcEstimateLow} - ${payload.calcEstimateHigh}` : "-"}`,
    `Details: ${payload.calcDetails || "-"}`,
    `Secondary languages: ${payload.calcSecondaryLanguages || "-"}`,
    "",
    "Notes",
    payload.notes || "-",
  ].join("\n");
}

async function sendViaWebhook(payload: ContactPayload): Promise<boolean> {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) return false;

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: "evagorobets.com",
      submittedAt: new Date().toISOString(),
      payload,
      text: toPlainText(payload),
    }),
  });

  if (!response.ok) {
    let body = "(could not read body)";
    try { body = await response.text(); } catch { /* ignore */ }
    console.error("Webhook delivery failed", { status: response.status, body });
  }

  return response.ok;
}

async function sendViaResend(payload: ContactPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Website <onboarding@resend.dev>";

  if (!apiKey || !to) return false;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `New brief — ${payload.name || "No name"} (${payload.locale.toUpperCase()})`,
      text: toPlainText(payload),
      reply_to: payload.email || undefined,
    }),
  });

  if (!response.ok) {
    let body = "(could not read body)";
    try { body = await response.text(); } catch { /* ignore */ }
    console.error("Resend delivery failed", {
      status: response.status,
      from,
      to,
      submitter: payload.email,
      body,
    });
  }

  return response.ok;
}

function redirectTo(locale: string, state: "sent" | "error", req: NextRequest): NextResponse {
  const target = new URL(`/${locale}/contact-booking`, req.url);
  target.searchParams.set(state, "1");
  return NextResponse.redirect(target, { status: 303 });
}

function redirectForPayload(payload: ContactPayload, state: "sent" | "error", req: NextRequest): NextResponse {
  if (payload.redirectPath.startsWith("/")) {
    const target = new URL(payload.redirectPath, req.url);
    target.searchParams.set(state, "1");
    return NextResponse.redirect(target, { status: 303 });
  }

  return redirectTo(payload.locale, state, req);
}

export async function POST(req: NextRequest) {
  const payload = await parsePayload(req);

  if (payload.website) {
    logBlockedSubmission("honeypot", payload);
    return redirectForPayload(payload, "sent", req);
  }

  if (isTooFast(payload.startedAt)) {
    logBlockedSubmission("submitted_too_fast", payload);
    return redirectForPayload(payload, "sent", req);
  }

  if (isSuspiciousPayload(payload)) {
    logBlockedSubmission("suspicious_content", payload);
    return redirectForPayload(payload, "sent", req);
  }

  if (!payload.name || !payload.email) {
    return redirectForPayload(payload, "error", req);
  }

  try {
    const sent = (await sendViaResend(payload)) || (await sendViaWebhook(payload));
    if (!sent) {
      console.error("Contact form: no delivery transport configured.");
      return redirectForPayload(payload, "error", req);
    }
    return redirectForPayload(payload, "sent", req);
  } catch (error) {
    console.error("Contact form send failed", error);
    return redirectForPayload(payload, "error", req);
  }
}

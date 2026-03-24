import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_LOCALES = new Set(["en", "jp"]);

type ContactPayload = {
  locale: string;
  name: string;
  company: string;
  email: string;
  type: string;
  people: string;
  location: string;
  date: string;
  formats: string;
  timeline: string;
  invoice: string;
  nda: string;
  notes: string;
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
      type: getString(body.type),
      people: getString(body.people),
      location: getString(body.location),
      date: getString(body.date),
      formats: getString(body.formats),
      timeline: getString(body.timeline),
      invoice: getString(body.invoice),
      nda: getString(body.nda),
      notes: getString(body.notes),
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
    type: getString(formData.get("type")),
    people: getString(formData.get("people")),
    location: getString(formData.get("location")),
    date: getString(formData.get("date")),
    formats: getString(formData.get("formats")),
    timeline: getString(formData.get("timeline")),
    invoice: getString(formData.get("invoice")),
    nda: getString(formData.get("nda")),
    notes: getString(formData.get("notes")),
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

  return response.ok;
}

function redirectTo(locale: string, state: "sent" | "error", req: NextRequest): NextResponse {
  const target = new URL(`/${locale}/contact-booking?${state}=1`, req.url);
  return NextResponse.redirect(target, { status: 303 });
}

export async function POST(req: NextRequest) {
  const payload = await parsePayload(req);

  if (payload.website) {
    logBlockedSubmission("honeypot", payload);
    return redirectTo(payload.locale, "sent", req);
  }

  if (isTooFast(payload.startedAt)) {
    logBlockedSubmission("submitted_too_fast", payload);
    return redirectTo(payload.locale, "sent", req);
  }

  if (isSuspiciousPayload(payload)) {
    logBlockedSubmission("suspicious_content", payload);
    return redirectTo(payload.locale, "sent", req);
  }

  if (!payload.name || !payload.email) {
    return redirectTo(payload.locale, "error", req);
  }

  try {
    const sent = (await sendViaResend(payload)) || (await sendViaWebhook(payload));
    if (!sent) {
      console.error("Contact form: no delivery transport configured.");
      return redirectTo(payload.locale, "error", req);
    }
    return redirectTo(payload.locale, "sent", req);
  } catch (error) {
    console.error("Contact form send failed", error);
    return redirectTo(payload.locale, "error", req);
  }
}

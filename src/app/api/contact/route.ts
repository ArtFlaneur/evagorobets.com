import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_LOCALES = new Set(["en", "jp", "ru"]);

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
};

function getString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function pickLocale(value: string): string {
  return SUPPORTED_LOCALES.has(value) ? value : "en";
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

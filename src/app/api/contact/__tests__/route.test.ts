/**
 * Tests for the /api/contact route.
 *
 * Strategy:
 *  - All internal helpers (parsePayload, isSuspiciousPayload, isTooFast,
 *    toPlainText, redirectForPayload) are exercised through the exported POST
 *    handler, which is the only public surface.
 *  - fetch is replaced with vi.fn() so no real HTTP calls are made.
 *  - env vars are set/unset per describe block.
 */

import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "@/app/api/contact/route";

// ─── helpers ──────────────────────────────────────────────────────────────────

/** Build a NextRequest with a JSON body */
function jsonRequest(body: Record<string, unknown>, url = "https://evagorobets.com/api/contact"): NextRequest {
  return new NextRequest(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

/** Build a NextRequest with a FormData body */
function formRequest(fields: Record<string, string>, url = "https://evagorobets.com/api/contact"): NextRequest {
  const form = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    form.append(key, value);
  }
  return new NextRequest(url, { method: "POST", body: form });
}

/** Minimal valid calculator payload — passes all spam/validation guards */
const validCalcPayload = {
  locale: "en",
  name: "Tanaka Hiroshi",
  company: "Acme Japan KK",
  email: "hiroshi@acme.jp",
  preferredLanguage: "japanese",
  calcCountry: "japan",
  calcService: "portrait",
  calcEstimateLow: "68000",
  calcEstimateHigh: "85000",
  calcCurrency: "JPY",
  calcDetails: "Japan · Portrait session · Up to 1.5 hours · 1 · Studio",
  calcSecondaryLanguages: "english",
  redirectPath: "/en/pricing-calculator?service=portrait",
  startedAt: "",    // empty → isTooFast returns false
  website: "",      // honeypot empty
  date: "May 2026",
  notes: "",
  type: "",
  people: "",
  location: "",
  formats: "",
  timeline: "",
  invoice: "",
  nda: "",
};

// ─── fetch mock setup ─────────────────────────────────────────────────────────

const mockFetch = vi.fn();

beforeEach(() => {
  vi.stubGlobal("fetch", mockFetch);
  mockFetch.mockReset();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

// ─── Spam / validation guards ─────────────────────────────────────────────────

describe("POST — honeypot rejection", () => {
  it("returns 303 to sent when website field is filled (honeypot)", async () => {
    const req = jsonRequest({ ...validCalcPayload, website: "http://spam.example" });
    const res = await POST(req);
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toContain("sent=1");
    // must NOT have called fetch (no email sent)
    expect(mockFetch).not.toHaveBeenCalled();
  });
});

describe("POST — too-fast submission rejection", () => {
  it("returns 303 to sent when startedAt is only 500ms ago", async () => {
    const req = jsonRequest({
      ...validCalcPayload,
      startedAt: String(Date.now() - 500),
    });
    const res = await POST(req);
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toContain("sent=1");
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("passes through when startedAt is old enough (6 seconds ago)", async () => {
    vi.stubEnv("RESEND_API_KEY", "test_key");
    vi.stubEnv("CONTACT_TO_EMAIL", "eva@evagorobets.com");
    mockFetch.mockResolvedValue({ ok: true });

    const req = jsonRequest({
      ...validCalcPayload,
      startedAt: String(Date.now() - 6_000),
    });
    const res = await POST(req);
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toContain("sent=1");
    expect(mockFetch).toHaveBeenCalledOnce();
  });

  it("passes through when startedAt is empty string", async () => {
    vi.stubEnv("RESEND_API_KEY", "test_key");
    vi.stubEnv("CONTACT_TO_EMAIL", "eva@evagorobets.com");
    mockFetch.mockResolvedValue({ ok: true });

    const req = jsonRequest({ ...validCalcPayload, startedAt: "" });
    const res = await POST(req);
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toContain("sent=1");
  });
});

describe("POST — spam content rejection", () => {
  it("blocks submission containing spam phrase 'seo'", async () => {
    const req = jsonRequest({ ...validCalcPayload, notes: "I can improve your SEO ranking" });
    const res = await POST(req);
    expect(res.headers.get("location")).toContain("sent=1");
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("blocks submission from a disposable email domain", async () => {
    const req = jsonRequest({ ...validCalcPayload, email: "test@mailinator.com" });
    const res = await POST(req);
    expect(res.headers.get("location")).toContain("sent=1");
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("blocks submission with excessive links in notes", async () => {
    const req = jsonRequest({
      ...validCalcPayload,
      notes: "see www.example.com and https://foo.net and http://bar.io also baz.org",
    });
    const res = await POST(req);
    expect(res.headers.get("location")).toContain("sent=1");
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("blocks submission with repeated character sequence", async () => {
    const req = jsonRequest({ ...validCalcPayload, notes: "aaaaaaaaaa" });
    const res = await POST(req);
    expect(res.headers.get("location")).toContain("sent=1");
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("blocks submission with notes exceeding 2000 characters", async () => {
    const req = jsonRequest({ ...validCalcPayload, notes: "a".repeat(2001) });
    const res = await POST(req);
    expect(res.headers.get("location")).toContain("sent=1");
    expect(mockFetch).not.toHaveBeenCalled();
  });
});

describe("POST — missing required fields", () => {
  it("returns error redirect when name is empty", async () => {
    const req = jsonRequest({ ...validCalcPayload, name: "" });
    const res = await POST(req);
    expect(res.headers.get("location")).toContain("error=1");
  });

  it("returns error redirect when email is empty", async () => {
    const req = jsonRequest({ ...validCalcPayload, email: "" });
    const res = await POST(req);
    expect(res.headers.get("location")).toContain("error=1");
  });
});

// ─── Delivery transport — Resend ──────────────────────────────────────────────

describe("POST — delivery via Resend", () => {
  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "re_test_123");
    vi.stubEnv("CONTACT_TO_EMAIL", "eva@evagorobets.com");
  });

  it("calls Resend API with correct headers and returns sent redirect", async () => {
    mockFetch.mockResolvedValue({ ok: true });

    const req = jsonRequest(validCalcPayload);
    const res = await POST(req);

    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toContain("sent=1");
    expect(mockFetch).toHaveBeenCalledOnce();

    const [url, init] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect((init.headers as Record<string, string>)["Authorization"]).toBe("Bearer re_test_123");
  });

  it("email subject includes sender name and locale", async () => {
    mockFetch.mockResolvedValue({ ok: true });

    const req = jsonRequest(validCalcPayload);
    await POST(req);

    const body = JSON.parse(mockFetch.mock.calls[0][1].body as string);
    expect(body.subject).toContain("Tanaka Hiroshi");
    expect(body.subject).toContain("EN");
  });

  it("email is sent to CONTACT_TO_EMAIL", async () => {
    mockFetch.mockResolvedValue({ ok: true });

    const req = jsonRequest(validCalcPayload);
    await POST(req);

    const body = JSON.parse(mockFetch.mock.calls[0][1].body as string);
    expect(body.to).toContain("eva@evagorobets.com");
  });

  it("reply_to is set to the submitter email", async () => {
    mockFetch.mockResolvedValue({ ok: true });

    const req = jsonRequest(validCalcPayload);
    await POST(req);

    const body = JSON.parse(mockFetch.mock.calls[0][1].body as string);
    expect(body.reply_to).toBe("hiroshi@acme.jp");
  });

  it("returns error redirect when Resend returns non-ok", async () => {
    mockFetch.mockResolvedValue({ ok: false });

    const req = jsonRequest(validCalcPayload);
    const res = await POST(req);

    expect(res.headers.get("location")).toContain("error=1");
  });
});

// ─── Delivery transport — Webhook ────────────────────────────────────────────

describe("POST — delivery via webhook (no Resend)", () => {
  beforeEach(() => {
    vi.stubEnv("CONTACT_WEBHOOK_URL", "https://hooks.example.com/contact");
    // no RESEND_API_KEY → sendViaResend returns false immediately
  });

  it("falls back to webhook and returns sent redirect", async () => {
    mockFetch.mockResolvedValue({ ok: true });

    const req = jsonRequest(validCalcPayload);
    const res = await POST(req);

    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toContain("sent=1");
    expect(mockFetch).toHaveBeenCalledOnce();

    const [url] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://hooks.example.com/contact");
  });

  it("webhook body contains calculator estimate fields", async () => {
    mockFetch.mockResolvedValue({ ok: true });

    const req = jsonRequest(validCalcPayload);
    await POST(req);

    const body = JSON.parse(mockFetch.mock.calls[0][1].body as string);
    expect(body.payload.calcCountry).toBe("japan");
    expect(body.payload.calcService).toBe("portrait");
    expect(body.payload.calcEstimateLow).toBe("68000");
    expect(body.payload.calcEstimateHigh).toBe("85000");
    expect(body.payload.calcCurrency).toBe("JPY");
    expect(body.payload.calcDetails).toContain("Portrait session");
    expect(body.payload.calcSecondaryLanguages).toBe("english");
    expect(body.payload.preferredLanguage).toBe("japanese");
  });

  it("webhook body text contains formatted estimate range", async () => {
    mockFetch.mockResolvedValue({ ok: true });

    const req = jsonRequest(validCalcPayload);
    await POST(req);

    const body = JSON.parse(mockFetch.mock.calls[0][1].body as string);
    expect(body.text).toContain("JPY 68000 - 85000");
    expect(body.text).toContain("Tanaka Hiroshi");
    expect(body.text).toContain("hiroshi@acme.jp");
  });

  it("webhook body text contains communication language fields", async () => {
    mockFetch.mockResolvedValue({ ok: true });

    const req = jsonRequest(validCalcPayload);
    await POST(req);

    const body = JSON.parse(mockFetch.mock.calls[0][1].body as string);
    expect(body.text).toContain("Preferred language: japanese");
    expect(body.text).toContain("Secondary languages: english");
  });

  it("returns error redirect when webhook returns non-ok", async () => {
    mockFetch.mockResolvedValue({ ok: false });

    const req = jsonRequest(validCalcPayload);
    const res = await POST(req);

    expect(res.headers.get("location")).toContain("error=1");
  });
});

describe("POST — no transport configured", () => {
  it("returns error redirect when neither Resend nor webhook env vars are set", async () => {
    // No env vars stubbed, no fetch calls expected
    const req = jsonRequest(validCalcPayload);
    const res = await POST(req);

    expect(res.headers.get("location")).toContain("error=1");
    expect(mockFetch).not.toHaveBeenCalled();
  });
});

// ─── Redirect path ────────────────────────────────────────────────────────────

describe("POST — redirectPath routing", () => {
  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "re_test_123");
    vi.stubEnv("CONTACT_TO_EMAIL", "eva@evagorobets.com");
    mockFetch.mockResolvedValue({ ok: true });
  });

  it("redirects back to calculator page when redirectPath is the calculator route", async () => {
    const req = jsonRequest({
      ...validCalcPayload,
      redirectPath: "/en/pricing-calculator?service=portrait",
    });
    const res = await POST(req);
    const location = res.headers.get("location") ?? "";
    expect(location).toContain("/en/pricing-calculator");
    expect(location).toContain("sent=1");
  });

  it("falls back to contact-booking when redirectPath is absent", async () => {
    const req = jsonRequest({ ...validCalcPayload, redirectPath: "" });
    const res = await POST(req);
    const location = res.headers.get("location") ?? "";
    expect(location).toContain("/en/contact-booking");
    expect(location).toContain("sent=1");
  });

  it("ignores redirectPath that does not start with /", async () => {
    const req = jsonRequest({
      ...validCalcPayload,
      redirectPath: "https://evil.example.com",
    });
    const res = await POST(req);
    const location = res.headers.get("location") ?? "";
    // must redirect to a path on the same origin, not the external URL
    expect(location).not.toContain("evil.example.com");
    expect(location).toContain("/en/contact-booking");
  });
});

// ─── Form-data parsing (calculator form uses native HTML form) ────────────────

describe("POST — FormData parsing with calculator fields", () => {
  beforeEach(() => {
    vi.stubEnv("CONTACT_WEBHOOK_URL", "https://hooks.example.com/contact");
    mockFetch.mockResolvedValue({ ok: true });
  });

  it("parses FormData submitted from the calculator form", async () => {
    const req = formRequest({
      locale: "jp",
      name: "山田太郎",
      email: "yamada@corp.jp",
      preferredLanguage: "japanese",
      calcCountry: "japan",
      calcService: "corporate-event",
      calcEstimateLow: "125000",
      calcEstimateHigh: "145000",
      calcCurrency: "JPY",
      calcDetails: "Japan · Corporate event · Half day · Standard delivery",
      calcSecondaryLanguages: "",
      redirectPath: "/jp/pricing-calculator?service=corporate-event",
      startedAt: "",
      website: "",
      date: "2026-06",
      notes: "",
      type: "",
      people: "",
      location: "",
      formats: "",
      timeline: "",
      invoice: "",
      nda: "",
      company: "",
    });

    const res = await POST(req);
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toContain("sent=1");

    const body = JSON.parse(mockFetch.mock.calls[0][1].body as string);
    expect(body.payload.calcService).toBe("corporate-event");
    expect(body.payload.calcCurrency).toBe("JPY");
    expect(body.payload.locale).toBe("jp");
  });

  it("sanitises locale: unknown locale falls back to en", async () => {
    const req = formRequest({
      ...Object.fromEntries(
        Object.entries({
          locale: "fr",
          name: "Test",
          email: "test@test.com",
          calcCountry: "australia",
          calcService: "gallery-event",
          calcEstimateLow: "800",
          calcEstimateHigh: "950",
          calcCurrency: "AUD",
          calcDetails: "",
          calcSecondaryLanguages: "",
          redirectPath: "",
          startedAt: "",
          website: "",
          date: "",
          notes: "",
          type: "",
          people: "",
          location: "",
          formats: "",
          timeline: "",
          invoice: "",
          nda: "",
          company: "",
          preferredLanguage: "",
        })
      ),
    });

    await POST(req);

    const body = JSON.parse(mockFetch.mock.calls[0][1].body as string);
    expect(body.payload.locale).toBe("en");
  });
});

// ─── Australian calculator submission ────────────────────────────────────────

describe("POST — Australia calculator submission end-to-end", () => {
  it("processes AUD portrait estimate via webhook with all fields intact", async () => {
    vi.stubEnv("CONTACT_WEBHOOK_URL", "https://hooks.example.com/contact");
    mockFetch.mockResolvedValue({ ok: true });

    const req = jsonRequest({
      locale: "en",
      name: "Sarah Chen",
      company: "Acme Australia Pty Ltd",
      email: "sarah@acme.com.au",
      preferredLanguage: "english",
      calcCountry: "australia",
      calcService: "portrait",
      calcEstimateLow: "780",
      calcEstimateHigh: "920",
      calcCurrency: "AUD",
      calcDetails: "Australia · Portrait session · Up to 1.5 hours · 1 · Studio · Standard delivery · Internal use",
      calcSecondaryLanguages: "",
      redirectPath: "/en/pricing-calculator?service=portrait",
      startedAt: "",
      website: "",
      date: "June 2026",
      notes: "Office is in CBD Melbourne",
      type: "",
      people: "",
      location: "",
      formats: "",
      timeline: "",
      invoice: "",
      nda: "",
    });

    const res = await POST(req);
    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toContain("sent=1");

    const body = JSON.parse(mockFetch.mock.calls[0][1].body as string);
    expect(body.payload.calcCurrency).toBe("AUD");
    expect(body.payload.calcEstimateLow).toBe("780");
    expect(body.text).toContain("AUD 780 - 920");
    expect(body.text).toContain("Sarah Chen");
    expect(body.text).toContain("Office is in CBD Melbourne");
  });
});

// ─── fetch throws (network error) ────────────────────────────────────────────

describe("POST — network error during send", () => {
  it("returns error redirect when fetch throws", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test_123");
    vi.stubEnv("CONTACT_TO_EMAIL", "eva@evagorobets.com");
    mockFetch.mockRejectedValue(new Error("network timeout"));

    const req = jsonRequest(validCalcPayload);
    const res = await POST(req);

    expect(res.status).toBe(303);
    expect(res.headers.get("location")).toContain("error=1");
  });
});

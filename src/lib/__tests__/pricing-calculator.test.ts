import { describe, expect, it } from "vitest";

import {
  clampPositiveInteger,
  currencyForCountry,
  estimateEvent,
  estimatePortrait,
  formatEstimateRange,
} from "@/lib/pricing-calculator";

// ─── currencyForCountry ───────────────────────────────────────────────────────

describe("currencyForCountry", () => {
  it("returns JPY for japan", () => {
    expect(currencyForCountry("japan")).toBe("JPY");
  });

  it("returns AUD for australia", () => {
    expect(currencyForCountry("australia")).toBe("AUD");
  });
});

// ─── clampPositiveInteger ─────────────────────────────────────────────────────

describe("clampPositiveInteger", () => {
  it("returns integer part of a positive float", () => {
    expect(clampPositiveInteger(2.9, 0)).toBe(2);
  });

  it("returns 0 for a negative number", () => {
    expect(clampPositiveInteger(-5, 0)).toBe(0);
  });

  it("returns fallback for NaN", () => {
    expect(clampPositiveInteger(NaN, 3)).toBe(3);
  });

  it("returns fallback for Infinity", () => {
    expect(clampPositiveInteger(Infinity, 7)).toBe(7);
  });

  it("returns 0 for zero", () => {
    expect(clampPositiveInteger(0, 5)).toBe(0);
  });
});

// ─── formatEstimateRange ──────────────────────────────────────────────────────

describe("formatEstimateRange", () => {
  it("formats JPY without decimals", () => {
    expect(formatEstimateRange({ currency: "JPY", low: 68000, high: 85000 })).toBe(
      "¥68,000 - ¥85,000",
    );
  });

  it("formats AUD without decimals", () => {
    expect(formatEstimateRange({ currency: "AUD", low: 780, high: 920 })).toBe(
      "A$780 - A$920",
    );
  });
});

// ─── estimatePortrait — base prices ──────────────────────────────────────────

describe("estimatePortrait — base prices", () => {
  it("Japan studio, 1 person, shortest session, no extras → base only", () => {
    const r = estimatePortrait({
      country: "japan",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 1,
      makeupCount: 0,
      hairCount: 0,
      urgency: "standard",
      usage: "owned-channels",
    });
    expect(r).toEqual({ currency: "JPY", low: 95000, high: 120000 });
  });

  it("Japan office, 1 person, shortest session → office base", () => {
    const r = estimatePortrait({
      country: "japan",
      location: "office",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 1,
      makeupCount: 0,
      hairCount: 0,
      urgency: "standard",
      usage: "owned-channels",
    });
    expect(r).toEqual({ currency: "JPY", low: 68000, high: 85000 });
  });

  it("Australia studio, 1 person, shortest session → AUD base", () => {
    const r = estimatePortrait({
      country: "australia",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 1,
      makeupCount: 0,
      hairCount: 0,
      urgency: "standard",
      usage: "owned-channels",
    });
    expect(r).toEqual({ currency: "AUD", low: 1100, high: 1350 });
  });
});

// ─── estimatePortrait — session add-ons ──────────────────────────────────────

describe("estimatePortrait — session length add-ons", () => {
  // Japan studio base: 95000/120000. Session up-to-3-hours adds 18000/25000 → 113000/145000
  it("Japan studio, up-to-3-hours adds session fee", () => {
    const r = estimatePortrait({
      country: "japan",
      location: "studio",
      sessionLength: "up-to-3-hours",
      peopleCount: 1,
      makeupCount: 0,
      hairCount: 0,
      urgency: "standard",
      usage: "owned-channels",
    });
    expect(r).toEqual({ currency: "JPY", low: 113000, high: 145000 });
  });

  // half-day adds 45000/60000 → 140000/180000
  it("Japan studio, half-day adds session fee", () => {
    const r = estimatePortrait({
      country: "japan",
      location: "studio",
      sessionLength: "half-day",
      peopleCount: 1,
      makeupCount: 0,
      hairCount: 0,
      urgency: "standard",
      usage: "owned-channels",
    });
    expect(r).toEqual({ currency: "JPY", low: 140000, high: 180000 });
  });

  // full-day adds 105000/130000 → 200000/250000
  it("Japan studio, full-day adds session fee", () => {
    const r = estimatePortrait({
      country: "japan",
      location: "studio",
      sessionLength: "full-day",
      peopleCount: 1,
      makeupCount: 0,
      hairCount: 0,
      urgency: "standard",
      usage: "owned-channels",
    });
    expect(r).toEqual({ currency: "JPY", low: 200000, high: 250000 });
  });

  // Australia up-to-3-hours: 1100+180=1280, 1350+260=1610
  it("Australia studio, up-to-3-hours", () => {
    const r = estimatePortrait({
      country: "australia",
      location: "studio",
      sessionLength: "up-to-3-hours",
      peopleCount: 1,
      makeupCount: 0,
      hairCount: 0,
      urgency: "standard",
      usage: "owned-channels",
    });
    expect(r).toEqual({ currency: "AUD", low: 1280, high: 1610 });
  });
});

// ─── estimatePortrait — people count tiers ───────────────────────────────────

describe("estimatePortrait — people count tiers", () => {
  // 2 people Japan studio: extras=1, index=1 ≤4 small (16000/20000) → 111000/140000
  it("Japan studio, 2 people — small tier per-person", () => {
    const r = estimatePortrait({
      country: "japan",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 2,
      makeupCount: 0,
      hairCount: 0,
      urgency: "standard",
      usage: "owned-channels",
    });
    expect(r).toEqual({ currency: "JPY", low: 111000, high: 140000 });
  });

  // 5 people Japan studio: extras=4, indexes 1-4 all small: 4×16000=64000, 4×20000=80000 → 159000/200000
  it("Japan studio, 5 people — all small tier", () => {
    const r = estimatePortrait({
      country: "japan",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 5,
      makeupCount: 0,
      hairCount: 0,
      urgency: "standard",
      usage: "owned-channels",
    });
    expect(r).toEqual({ currency: "JPY", low: 159000, high: 200000 });
  });

  // 6 people Japan studio: indexes 1-4 small (64000/80000) + index 5 medium (12000/16000)
  // → 95000+64000+12000=171000, 120000+80000+16000=216000
  it("Japan studio, 6 people — crosses into medium tier at index 5", () => {
    const r = estimatePortrait({
      country: "japan",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 6,
      makeupCount: 0,
      hairCount: 0,
      urgency: "standard",
      usage: "owned-channels",
    });
    expect(r).toEqual({ currency: "JPY", low: 171000, high: 216000 });
  });

  // 16 people Japan studio: indexes 1-4 small (64000/80000) + indexes 5-14 medium (10×12000=120000, 10×16000=160000)
  // + index 15 large (9000/12000) → 95000+64000+120000+9000=288000, 120000+80000+160000+12000=372000
  it("Japan studio, 16 people — crosses into large tier at index 15", () => {
    const r = estimatePortrait({
      country: "japan",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 16,
      makeupCount: 0,
      hairCount: 0,
      urgency: "standard",
      usage: "owned-channels",
    });
    expect(r).toEqual({ currency: "JPY", low: 288000, high: 372000 });
  });

  // Fractional peopleCount is floored: 2.9 → treated as 2
  it("fractional peopleCount is floored", () => {
    const fractional = estimatePortrait({
      country: "japan",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 2.9,
      makeupCount: 0,
      hairCount: 0,
      urgency: "standard",
      usage: "owned-channels",
    });
    const integer = estimatePortrait({
      country: "japan",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 2,
      makeupCount: 0,
      hairCount: 0,
      urgency: "standard",
      usage: "owned-channels",
    });
    expect(fractional).toEqual(integer);
  });
});

// ─── estimatePortrait — styling ──────────────────────────────────────────────

describe("estimatePortrait — styling", () => {
  // Japan studio 1p + 1 makeup: 95000+7000=102000, 120000+10000=130000
  it("Japan 1 person + 1 makeup", () => {
    const r = estimatePortrait({
      country: "japan",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 1,
      makeupCount: 1,
      hairCount: 0,
      urgency: "standard",
      usage: "owned-channels",
    });
    expect(r).toEqual({ currency: "JPY", low: 102000, high: 130000 });
  });

  // Japan studio 1p + 1 hair: 95000+5000=100000, 120000+8000=128000
  it("Japan 1 person + 1 hair", () => {
    const r = estimatePortrait({
      country: "japan",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 1,
      makeupCount: 0,
      hairCount: 1,
      urgency: "standard",
      usage: "owned-channels",
    });
    expect(r).toEqual({ currency: "JPY", low: 100000, high: 128000 });
  });

  // Japan studio 1p + 1 makeup + 1 hair: 95000+7000+5000=107000, 120000+10000+8000=138000
  it("Japan 1 person + makeup + hair", () => {
    const r = estimatePortrait({
      country: "japan",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 1,
      makeupCount: 1,
      hairCount: 1,
      urgency: "standard",
      usage: "owned-channels",
    });
    expect(r).toEqual({ currency: "JPY", low: 107000, high: 138000 });
  });

  // Styling clamped to peopleCount: 1 person but makeupCount=5 → treated as 1
  it("makeupCount exceeding peopleCount is clamped to peopleCount", () => {
    const clamped = estimatePortrait({
      country: "japan",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 1,
      makeupCount: 5,
      hairCount: 0,
      urgency: "standard",
      usage: "owned-channels",
    });
    const correct = estimatePortrait({
      country: "japan",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 1,
      makeupCount: 1,
      hairCount: 0,
      urgency: "standard",
      usage: "owned-channels",
    });
    expect(clamped).toEqual(correct);
  });

  // Negative makeupCount → treated as 0
  it("negative makeupCount treated as 0", () => {
    const negative = estimatePortrait({
      country: "japan",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 1,
      makeupCount: -3,
      hairCount: 0,
      urgency: "standard",
      usage: "owned-channels",
    });
    const zero = estimatePortrait({
      country: "japan",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 1,
      makeupCount: 0,
      hairCount: 0,
      urgency: "standard",
      usage: "owned-channels",
    });
    expect(negative).toEqual(zero);
  });
});

// ─── estimatePortrait — urgency multipliers ───────────────────────────────────

describe("estimatePortrait — urgency multipliers", () => {
  // Base subtotal (Japan studio 1p): low=95000, high=120000
  // within-48-hours: +round(95000*0.15)=14250, +round(120000*0.2)=24000 → 109250/144000
  it("within-48-hours adds 15%/20% urgency fee", () => {
    const r = estimatePortrait({
      country: "japan",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 1,
      makeupCount: 0,
      hairCount: 0,
      urgency: "within-48-hours",
      usage: "owned-channels",
    });
    expect(r).toEqual({ currency: "JPY", low: 109250, high: 144000 });
  });

  // next-business-day: +round(95000*0.25)=23750, +round(120000*0.3)=36000 → 118750/156000
  it("next-business-day adds 25%/30% urgency fee", () => {
    const r = estimatePortrait({
      country: "japan",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 1,
      makeupCount: 0,
      hairCount: 0,
      urgency: "next-business-day",
      usage: "owned-channels",
    });
    expect(r).toEqual({ currency: "JPY", low: 118750, high: 156000 });
  });

  // same-day-selects: +round(95000*0.35)=33250, +round(120000*0.5)=60000 → 128250/180000
  it("same-day-selects adds 35%/50% urgency fee", () => {
    const r = estimatePortrait({
      country: "japan",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 1,
      makeupCount: 0,
      hairCount: 0,
      urgency: "same-day-selects",
      usage: "owned-channels",
    });
    expect(r).toEqual({ currency: "JPY", low: 128250, high: 180000 });
  });
});

// ─── estimatePortrait — usage multipliers ────────────────────────────────────

describe("estimatePortrait — usage multipliers", () => {
  // paid-local-campaign: +round(95000*0.2)=19000, +round(120000*0.3)=36000 → 114000/156000
  it("paid-local-campaign adds 20%/30% usage fee", () => {
    const r = estimatePortrait({
      country: "japan",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 1,
      makeupCount: 0,
      hairCount: 0,
      urgency: "standard",
      usage: "paid-local-campaign",
    });
    expect(r).toEqual({ currency: "JPY", low: 114000, high: 156000 });
  });

  // paid-expanded-campaign: +round(95000*0.4)=38000, +round(120000*0.7)=84000 → 133000/204000
  it("paid-expanded-campaign adds 40%/70% usage fee", () => {
    const r = estimatePortrait({
      country: "japan",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 1,
      makeupCount: 0,
      hairCount: 0,
      urgency: "standard",
      usage: "paid-expanded-campaign",
    });
    expect(r).toEqual({ currency: "JPY", low: 133000, high: 204000 });
  });
});

// ─── estimatePortrait — combined multipliers ─────────────────────────────────

describe("estimatePortrait — combined urgency + usage multipliers", () => {
  // Both multipliers applied to the same subtotal (95000/120000):
  // urgency within-48-hours: +14250/+24000
  // usage paid-local-campaign: +19000/+36000
  // → 95000+14250+19000=128250, 120000+24000+36000=180000
  it("urgency and usage fees are both applied independently to the subtotal", () => {
    const r = estimatePortrait({
      country: "japan",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 1,
      makeupCount: 0,
      hairCount: 0,
      urgency: "within-48-hours",
      usage: "paid-local-campaign",
    });
    expect(r).toEqual({ currency: "JPY", low: 128250, high: 180000 });
  });
});

// ─── estimatePortrait — invariants ───────────────────────────────────────────

describe("estimatePortrait — invariants", () => {
  it("low is always ≤ high", () => {
    const combinations: Parameters<typeof estimatePortrait>[0][] = [
      {
        country: "japan",
        location: "studio",
        sessionLength: "full-day",
        peopleCount: 30,
        makeupCount: 10,
        hairCount: 10,
        urgency: "same-day-selects",
        usage: "paid-expanded-campaign",
      },
      {
        country: "australia",
        location: "office",
        sessionLength: "half-day",
        peopleCount: 15,
        makeupCount: 5,
        hairCount: 5,
        urgency: "next-business-day",
        usage: "paid-local-campaign",
      },
    ];
    for (const input of combinations) {
      const r = estimatePortrait(input);
      expect(r.low).toBeLessThanOrEqual(r.high);
    }
  });

  it("more people always costs more or equal — Japan studio", () => {
    const base = estimatePortrait({
      country: "japan",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 1,
      makeupCount: 0,
      hairCount: 0,
      urgency: "standard",
      usage: "owned-channels",
    });
    const larger = estimatePortrait({
      country: "japan",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 10,
      makeupCount: 0,
      hairCount: 0,
      urgency: "standard",
      usage: "owned-channels",
    });
    expect(larger.low).toBeGreaterThan(base.low);
    expect(larger.high).toBeGreaterThan(base.high);
  });

  it("urgency always increases cost over standard", () => {
    const standard = estimatePortrait({
      country: "japan",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 1,
      makeupCount: 0,
      hairCount: 0,
      urgency: "standard",
      usage: "owned-channels",
    });
    for (const urgency of ["within-48-hours", "next-business-day", "same-day-selects"] as const) {
      const r = estimatePortrait({
        country: "japan",
        location: "studio",
        sessionLength: "up-to-1-5-hours",
        peopleCount: 1,
        makeupCount: 0,
        hairCount: 0,
        urgency,
        usage: "owned-channels",
      });
      expect(r.low).toBeGreaterThan(standard.low);
      expect(r.high).toBeGreaterThan(standard.high);
    }
  });

  it("campaign usage always costs more than owned-channels", () => {
    const base = estimatePortrait({
      country: "australia",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 1,
      makeupCount: 0,
      hairCount: 0,
      urgency: "standard",
      usage: "owned-channels",
    });
    const local = estimatePortrait({
      country: "australia",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 1,
      makeupCount: 0,
      hairCount: 0,
      urgency: "standard",
      usage: "paid-local-campaign",
    });
    const expanded = estimatePortrait({
      country: "australia",
      location: "studio",
      sessionLength: "up-to-1-5-hours",
      peopleCount: 1,
      makeupCount: 0,
      hairCount: 0,
      urgency: "standard",
      usage: "paid-expanded-campaign",
    });
    expect(local.low).toBeGreaterThan(base.low);
    expect(expanded.low).toBeGreaterThan(local.low);
  });
});

// ─── estimateEvent — base prices ─────────────────────────────────────────────

describe("estimateEvent — base prices (standard urgency)", () => {
  it("Japan corporate-event up-to-2-hours", () => {
    const r = estimateEvent({
      country: "japan",
      service: "corporate-event",
      duration: "up-to-2-hours",
      urgency: "standard",
    });
    expect(r).toEqual({ currency: "JPY", low: 70000, high: 90000 });
  });

  it("Japan corporate-event half-day", () => {
    const r = estimateEvent({
      country: "japan",
      service: "corporate-event",
      duration: "half-day",
      urgency: "standard",
    });
    expect(r).toEqual({ currency: "JPY", low: 125000, high: 145000 });
  });

  it("Japan corporate-event full-day", () => {
    const r = estimateEvent({
      country: "japan",
      service: "corporate-event",
      duration: "full-day",
      urgency: "standard",
    });
    expect(r).toEqual({ currency: "JPY", low: 215000, high: 240000 });
  });

  it("Japan gallery-event up-to-2-hours", () => {
    const r = estimateEvent({
      country: "japan",
      service: "gallery-event",
      duration: "up-to-2-hours",
      urgency: "standard",
    });
    expect(r).toEqual({ currency: "JPY", low: 70000, high: 85000 });
  });

  it("Japan gallery-event full-day", () => {
    const r = estimateEvent({
      country: "japan",
      service: "gallery-event",
      duration: "full-day",
      urgency: "standard",
    });
    expect(r).toEqual({ currency: "JPY", low: 185000, high: 215000 });
  });

  it("Japan artwork-documentation half-day", () => {
    const r = estimateEvent({
      country: "japan",
      service: "artwork-documentation",
      duration: "half-day",
      urgency: "standard",
    });
    expect(r).toEqual({ currency: "JPY", low: 110000, high: 130000 });
  });

  it("Australia corporate-event up-to-2-hours", () => {
    const r = estimateEvent({
      country: "australia",
      service: "corporate-event",
      duration: "up-to-2-hours",
      urgency: "standard",
    });
    expect(r).toEqual({ currency: "AUD", low: 850, high: 1000 });
  });

  it("Australia gallery-event full-day", () => {
    const r = estimateEvent({
      country: "australia",
      service: "gallery-event",
      duration: "full-day",
      urgency: "standard",
    });
    expect(r).toEqual({ currency: "AUD", low: 2250, high: 2550 });
  });

  it("Australia artwork-documentation up-to-2-hours", () => {
    const r = estimateEvent({
      country: "australia",
      service: "artwork-documentation",
      duration: "up-to-2-hours",
      urgency: "standard",
    });
    expect(r).toEqual({ currency: "AUD", low: 800, high: 950 });
  });
});

// ─── estimateEvent — urgency multipliers ─────────────────────────────────────

describe("estimateEvent — urgency multipliers", () => {
  // Base: Japan corporate-event up-to-2-hours: 70000/90000
  // fast-turnaround: +round(70000*0.1)=7000, +round(90000*0.15)=13500 → 77000/103500
  it("fast-turnaround adds 10%/15% to event base", () => {
    const r = estimateEvent({
      country: "japan",
      service: "corporate-event",
      duration: "up-to-2-hours",
      urgency: "fast-turnaround",
    });
    expect(r).toEqual({ currency: "JPY", low: 77000, high: 103500 });
  });

  // next-day-highlights: +round(70000*0.2)=14000, +round(90000*0.25)=22500 → 84000/112500
  it("next-day-highlights adds 20%/25% to event base", () => {
    const r = estimateEvent({
      country: "japan",
      service: "corporate-event",
      duration: "up-to-2-hours",
      urgency: "next-day-highlights",
    });
    expect(r).toEqual({ currency: "JPY", low: 84000, high: 112500 });
  });

  // same-day-selects: +round(70000*0.3)=21000, +round(90000*0.4)=36000 → 91000/126000
  it("same-day-selects adds 30%/40% to event base", () => {
    const r = estimateEvent({
      country: "japan",
      service: "corporate-event",
      duration: "up-to-2-hours",
      urgency: "same-day-selects",
    });
    expect(r).toEqual({ currency: "JPY", low: 91000, high: 126000 });
  });

  // Australia corporate full-day + next-day-highlights:
  // base: 2630/2900, +round(2630*0.2)=526, +round(2900*0.25)=725 → 3156/3625
  it("Australia corporate full-day + next-day-highlights", () => {
    const r = estimateEvent({
      country: "australia",
      service: "corporate-event",
      duration: "full-day",
      urgency: "next-day-highlights",
    });
    expect(r).toEqual({ currency: "AUD", low: 3156, high: 3625 });
  });
});

// ─── estimateEvent — invariants ───────────────────────────────────────────────

describe("estimateEvent — invariants", () => {
  it("low is always ≤ high across all combinations", () => {
    const services = ["corporate-event", "gallery-event", "artwork-documentation"] as const;
    const durations = ["up-to-2-hours", "half-day", "full-day"] as const;
    const urgencies = ["standard", "fast-turnaround", "next-day-highlights", "same-day-selects"] as const;
    const countries = ["japan", "australia"] as const;

    for (const country of countries) {
      for (const service of services) {
        for (const duration of durations) {
          for (const urgency of urgencies) {
            const r = estimateEvent({ country, service, duration, urgency });
            expect(r.low).toBeLessThanOrEqual(r.high);
          }
        }
      }
    }
  });

  it("longer duration always costs more — Japan corporate", () => {
    const short = estimateEvent({ country: "japan", service: "corporate-event", duration: "up-to-2-hours", urgency: "standard" });
    const half  = estimateEvent({ country: "japan", service: "corporate-event", duration: "half-day",     urgency: "standard" });
    const full  = estimateEvent({ country: "japan", service: "corporate-event", duration: "full-day",     urgency: "standard" });
    expect(half.low).toBeGreaterThan(short.low);
    expect(full.low).toBeGreaterThan(half.low);
  });

  it("higher urgency always costs more — Australia gallery-event half-day", () => {
    const standard = estimateEvent({ country: "australia", service: "gallery-event", duration: "half-day", urgency: "standard" });
    const fast     = estimateEvent({ country: "australia", service: "gallery-event", duration: "half-day", urgency: "fast-turnaround" });
    const nextDay  = estimateEvent({ country: "australia", service: "gallery-event", duration: "half-day", urgency: "next-day-highlights" });
    const sameDay  = estimateEvent({ country: "australia", service: "gallery-event", duration: "half-day", urgency: "same-day-selects" });
    expect(fast.low).toBeGreaterThan(standard.low);
    expect(nextDay.low).toBeGreaterThan(fast.low);
    expect(sameDay.low).toBeGreaterThan(nextDay.low);
  });
});

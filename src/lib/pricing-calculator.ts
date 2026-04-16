export type PricingCountry = "japan" | "australia";

export type CalculatorService =
  | "portrait"
  | "corporate-event"
  | "gallery-event"
  | "artwork-documentation";

export type CommunicationLanguage = "english" | "japanese" | "russian";

export type PortraitSessionLength = "up-to-1-5-hours" | "up-to-3-hours" | "half-day" | "full-day";
export type PortraitLocation = "studio" | "office";
export type PortraitUrgency = "standard" | "within-48-hours" | "next-business-day" | "same-day-selects";
export type PortraitUsage = "owned-channels" | "paid-local-campaign" | "paid-expanded-campaign";

export type EventDuration = "up-to-2-hours" | "half-day" | "full-day";
export type EventUrgency = "standard" | "fast-turnaround" | "next-day-highlights" | "same-day-selects";

export type PortraitEstimateInput = {
  country: PricingCountry;
  sessionLength: PortraitSessionLength;
  peopleCount: number;
  location: PortraitLocation;
  makeupCount: number;
  hairCount: number;
  urgency: PortraitUrgency;
  usage: PortraitUsage;
};

export type EventEstimateInput = {
  country: PricingCountry;
  duration: EventDuration;
  urgency: EventUrgency;
  service: Exclude<CalculatorService, "portrait">;
};

export type EstimateResult = {
  currency: "JPY" | "AUD";
  low: number;
  high: number;
};

const portraitBase = {
  japan: {
    studio: { low: 95000, high: 120000 },
    office: { low: 68000, high: 85000 },
  },
  australia: {
    studio: { low: 1100, high: 1350 },
    office: { low: 780, high: 950 },
  },
} as const;

const portraitSessionAddOns = {
  japan: {
    "up-to-1-5-hours": { low: 0, high: 0 },
    "up-to-3-hours": { low: 18000, high: 25000 },
    "half-day": { low: 45000, high: 60000 },
    "full-day": { low: 105000, high: 130000 },
  },
  australia: {
    "up-to-1-5-hours": { low: 0, high: 0 },
    "up-to-3-hours": { low: 180, high: 260 },
    "half-day": { low: 440, high: 580 },
    "full-day": { low: 980, high: 1180 },
  },
} as const;

const portraitPerPerson = {
  japan: {
    small: { low: 16000, high: 20000 },
    medium: { low: 12000, high: 16000 },
    large: { low: 9000, high: 12000 },
  },
  australia: {
    small: { low: 160, high: 210 },
    medium: { low: 130, high: 170 },
    large: { low: 100, high: 135 },
  },
} as const;

const portraitStyling = {
  japan: {
    makeup: { low: 7000, high: 10000 },
    hair: { low: 5000, high: 8000 },
  },
  australia: {
    makeup: { low: 90, high: 140 },
    hair: { low: 70, high: 110 },
  },
} as const;

const portraitUrgencyMultipliers = {
  standard: { low: 0, high: 0 },
  "within-48-hours": { low: 0.15, high: 0.2 },
  "next-business-day": { low: 0.25, high: 0.3 },
  "same-day-selects": { low: 0.35, high: 0.5 },
} as const;

const portraitUsageMultipliers = {
  "owned-channels": { low: 0, high: 0 },
  "paid-local-campaign": { low: 0.2, high: 0.3 },
  "paid-expanded-campaign": { low: 0.4, high: 0.7 },
} as const;

const eventBase = {
  japan: {
    "corporate-event": {
      "up-to-2-hours": { low: 70000, high: 90000 },
      "half-day": { low: 125000, high: 145000 },
      "full-day": { low: 215000, high: 240000 },
    },
    "gallery-event": {
      "up-to-2-hours": { low: 70000, high: 85000 },
      "half-day": { low: 110000, high: 130000 },
      "full-day": { low: 185000, high: 215000 },
    },
    "artwork-documentation": {
      "up-to-2-hours": { low: 70000, high: 85000 },
      "half-day": { low: 110000, high: 130000 },
      "full-day": { low: 185000, high: 215000 },
    },
  },
  australia: {
    "corporate-event": {
      "up-to-2-hours": { low: 850, high: 1000 },
      "half-day": { low: 1520, high: 1750 },
      "full-day": { low: 2630, high: 2900 },
    },
    "gallery-event": {
      "up-to-2-hours": { low: 800, high: 950 },
      "half-day": { low: 1350, high: 1550 },
      "full-day": { low: 2250, high: 2550 },
    },
    "artwork-documentation": {
      "up-to-2-hours": { low: 800, high: 950 },
      "half-day": { low: 1350, high: 1550 },
      "full-day": { low: 2250, high: 2550 },
    },
  },
} as const;

const eventUrgencyMultipliers = {
  standard: { low: 0, high: 0 },
  "fast-turnaround": { low: 0.1, high: 0.15 },
  "next-day-highlights": { low: 0.2, high: 0.25 },
  "same-day-selects": { low: 0.3, high: 0.4 },
} as const;

export function currencyForCountry(country: PricingCountry): EstimateResult["currency"] {
  return country === "japan" ? "JPY" : "AUD";
}

function additionalPortraitPeople(country: PricingCountry, peopleCount: number) {
  const extras = Math.max(0, Math.floor(peopleCount) - 1);
  let low = 0;
  let high = 0;

  for (let index = 1; index <= extras; index += 1) {
    const bucket =
      index <= 4
        ? portraitPerPerson[country].small
        : index <= 14
          ? portraitPerPerson[country].medium
          : portraitPerPerson[country].large;

    low += bucket.low;
    high += bucket.high;
  }

  return { low, high };
}

function applyMultipliers(base: EstimateResult, ...multipliers: Array<{ low: number; high: number }>) {
  let low = base.low;
  let high = base.high;

  for (const multiplier of multipliers) {
    low += Math.round(base.low * multiplier.low);
    high += Math.round(base.high * multiplier.high);
  }

  return { ...base, low, high };
}

export function estimatePortrait(input: PortraitEstimateInput): EstimateResult {
  const currency = currencyForCountry(input.country);
  const base = portraitBase[input.country][input.location];
  const session = portraitSessionAddOns[input.country][input.sessionLength];
  const people = additionalPortraitPeople(input.country, input.peopleCount);
  const styling = portraitStyling[input.country];
  const makeupCount = Math.max(0, Math.min(Math.floor(input.makeupCount), Math.floor(input.peopleCount)));
  const hairCount = Math.max(0, Math.min(Math.floor(input.hairCount), Math.floor(input.peopleCount)));

  const subtotal = {
    currency,
    low:
      base.low +
      session.low +
      people.low +
      makeupCount * styling.makeup.low +
      hairCount * styling.hair.low,
    high:
      base.high +
      session.high +
      people.high +
      makeupCount * styling.makeup.high +
      hairCount * styling.hair.high,
  } satisfies EstimateResult;

  return applyMultipliers(
    subtotal,
    portraitUrgencyMultipliers[input.urgency],
    portraitUsageMultipliers[input.usage],
  );
}

export function estimateEvent(input: EventEstimateInput): EstimateResult {
  const currency = currencyForCountry(input.country);
  const base = eventBase[input.country][input.service][input.duration];

  return applyMultipliers(
    { currency, low: base.low, high: base.high },
    eventUrgencyMultipliers[input.urgency],
  );
}

export function formatEstimateRange(result: EstimateResult): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: result.currency,
    maximumFractionDigits: 0,
  });

  return `${formatter.format(result.low)} - ${formatter.format(result.high)}`;
}

export function clampPositiveInteger(value: number, fallback: number) {
  if (!Number.isFinite(value)) return fallback;
  return Math.max(0, Math.floor(value));
}
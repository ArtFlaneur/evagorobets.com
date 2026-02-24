"use client";

import { useState } from "react";

type Package = { label: string; price: string };

interface CurrencyOptionsProps {
  packagesJPY?: Package[];
  packagesAUD?: Package[];
  sectionLabel?: string;
  footerNote?: string;
}

const defaultJPY: Package[] = [
  { label: "Studio Session", price: "from ¥88,000" },
  { label: "On-location Session", price: "from ¥110,000" },
  { label: "Creative Editorial Portrait", price: "from ¥132,000" },
];

const defaultAUD: Package[] = [
  { label: "Studio Session", price: "from A$980" },
  { label: "On-location Session", price: "from A$1,220" },
  { label: "Creative Editorial Portrait", price: "from A$1,450" },
];

export function CurrencyOptions({
  packagesJPY = defaultJPY,
  packagesAUD = defaultAUD,
  sectionLabel = "Session Options",
  footerNote = "Includes brief, guided posing and final retouched delivery.",
}: CurrencyOptionsProps) {
  const [currency, setCurrency] = useState<"JPY" | "AUD">("JPY");

  const packages = { JPY: packagesJPY, AUD: packagesAUD };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <p className="label">{sectionLabel}</p>
        <div className="flex gap-5">
          {(["JPY", "AUD"] as const).map((c) => (
            <button
              key={c}
              type="button"
              className={`label transition-opacity ${
                currency === c ? "opacity-100" : "opacity-30 hover:opacity-60"
              }`}
              onClick={() => setCurrency(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <ul>
        {packages[currency].map(({ label, price }) => (
          <li key={label} className="flex justify-between border-t border-black/[0.07] py-4 text-sm">
            <span className="text-black/70">{label}</span>
            <span style={{ fontFamily: "var(--font-cormorant)", fontSize: "18px", fontWeight: 400 }}>{price}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 label">{footerNote}</p>
    </div>
  );
}

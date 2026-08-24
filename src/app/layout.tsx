import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Manrope, PT_Serif } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";

const GOOGLE_TAG_ID = "G-FLE2GW5QQ5";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://evagorobets.com"),
  title: "Eva Gorobets — Portrait & Corporate Photographer, Tokyo & Melbourne",
  description:
    "Portrait and corporate event photographer working between Tokyo and Melbourne. Executive headshots, corporate event coverage, art-world photography, visible starting prices and an instant pricing calculator. Communication in English, Japanese and Russian.",
  verification: {
    google: "naTVcEvP0Y1pUnEWD8fa-6Mn2dUWm0bw2pBj3tg7bDw",
  },
  openGraph: {
    type: "website",
    siteName: "Eva Gorobets Photography",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}>) {
  const { locale } = await params;
  const requestLocale = (await headers()).get("x-site-locale");
  const htmlLang = requestLocale ?? (locale === "jp" ? "ja" : locale === "ru" ? "ru" : "en");

  return (
    <html lang={htmlLang}>
        <body className={`${cormorant.variable} ${dmSans.variable} ${ptSerif.variable} ${manrope.variable} antialiased`}>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_TAG_ID}');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}

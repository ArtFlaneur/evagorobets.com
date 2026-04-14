import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://evagorobets.com"),
  title: "Eva Gorobets — Portrait & Corporate Photographer, Tokyo & Melbourne",
  description:
    "Portrait and corporate event photographer based in Tokyo, available in Melbourne. Executive headshots, corporate event coverage, art-world photography. Communication in English, Japanese and Russian.",
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
  const htmlLang = locale === "jp" ? "ja" : "en";

  return (
    <html lang={htmlLang}>
      <body className={`${cormorant.variable} ${dmSans.variable} antialiased`}>
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

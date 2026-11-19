import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { identity } from "@/lib/content";
import { AccessibilityProvider } from "@/components/accessibility";
import { accessibilityScript } from "@/lib/accessibility-script";
import { isSiteConfigured, siteOrigin, siteUrl } from "@/lib/site";
import "./globals.css";
import "./accessibility.css";
import "./themes.css";
import "./reading.css";

const sans = localFont({
  src: "../../public/fonts/dm-sans.woff2",
  variable: "--font-dm-sans",
  display: "swap",
  weight: "100 1000",
});
const serif = localFont({
  src: "../../public/fonts/instrument-serif-italic.woff2",
  variable: "--font-instrument-serif",
  display: "swap",
  style: "italic",
  weight: "400",
});

const portfolioTitle = `${identity.name} — ${identity.title}`;

export const metadata: Metadata = {
  metadataBase: siteOrigin ? new URL(siteOrigin) : undefined,
  alternates: siteOrigin ? { canonical: siteUrl("/") } : undefined,
  title: {
    default: portfolioTitle,
    template: "%s | Benjamin Agogo",
  },
  description: `${identity.title} building useful technology across healthcare, agriculture, and language preservation. Explore Nurse.ng, HMSI-API, Agro-Shield, and Igede Language SI.`,
  applicationName: "Benjamin Agogo Portfolio",
  authors: [{ name: identity.name, url: identity.github }],
  keywords: [
    identity.name,
    identity.title,
    "Healthcare Technology",
    "Nurse.ng",
    "HMSI-API",
    "Agro-Shield",
    "Igede Language SI",
    "Igede",
    "Language Preservation",
    "Natural Language Processing",
    "Agricultural Technology",
    "Backend Engineering",
    "AI",
    "IoT",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: portfolioTitle,
    description:
      "Useful technology. Human impact. Engineering, AI, healthcare, and connected systems.",
    url: siteUrl("/"),
    siteName: "Benjamin Agogo Portfolio",
    images: siteOrigin
      ? [
          {
            url: siteUrl("/images/social-preview.png")!,
            width: 1200,
            height: 630,
            alt: "Otete Benjamin Agogo — Engineering for a more connected world",
          },
        ]
      : [],
  },
  twitter: {
    card: "summary_large_image",
    title: portfolioTitle,
    description: "Engineering for a more connected world.",
    images: siteOrigin ? [siteUrl("/images/social-preview.png")!] : [],
  },
  robots: { index: isSiteConfigured, follow: isSiteConfigured },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9faf6" },
    { media: "(prefers-color-scheme: dark)", color: "#101b16" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <noscript>
          <style>{`.display-control,.mobile-menu{display:none!important}.site-header{position:relative}`}</style>
        </noscript>
        <script dangerouslySetInnerHTML={{ __html: accessibilityScript }} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <AccessibilityProvider>{children}</AccessibilityProvider>
      </body>
    </html>
  );
}

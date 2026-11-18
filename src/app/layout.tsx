import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { identity } from "@/lib/content";
import { AccessibilityProvider } from "@/components/accessibility";
import { accessibilityScript } from "@/lib/accessibility-script";
import "./globals.css";
import "./accessibility.css";
import "./themes.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Otete Benjamin Agogo — Software Engineer",
    template: "%s | Benjamin Agogo",
  },
  description:
    "Software engineer building useful technology at the intersection of engineering, AI, healthcare, and connected systems. Explore Nurse.ng, HMSI-API, and my engineering direction.",
  applicationName: "Benjamin Agogo Portfolio",
  authors: [{ name: identity.name, url: identity.github }],
  keywords: [
    identity.name,
    "Software Engineer",
    "Healthcare Technology",
    "Nurse.ng",
    "HMSI-API",
    "Backend Engineering",
    "AI",
    "IoT",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Otete Benjamin Agogo — Software Engineer",
    description:
      "Useful technology. Human impact. Engineering, AI, healthcare, and connected systems.",
    images: [
      {
        url: "/images/social-preview.png",
        width: 1200,
        height: 630,
        alt: "Otete Benjamin Agogo — Engineering for a more connected world",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Otete Benjamin Agogo — Software Engineer",
    description: "Engineering for a more connected world.",
    images: ["/images/social-preview.png"],
  },
  robots: { index: true, follow: true },
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

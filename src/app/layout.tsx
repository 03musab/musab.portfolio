import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Geist_Mono,
  Instrument_Serif,
  Inter,
} from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import ThemeChoreographer from "@/components/ThemeChoreographer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#05070b",
};

export const metadata: Metadata = {
  title: "Mohammed Musab — Software & AI App Developer",
  description:
    "Mohammed Musab — Software & AI App Developer in Mumbai. Building smart AI tools, modern websites, real-time collaboration apps, and private messaging.",
  keywords: [
    "Mohammed Musab",
    "Shaikh Mohammed Musab",
    "Software Developer",
    "Web Developer",
    "AI App Builder",
    "Next.js Developer",
    "React Developer",
    "AWS Certified",
    "Portfolio",
    "Mumbai",
  ],
  authors: [{ name: "Mohammed Musab" }],
  creator: "Mohammed Musab",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Mohammed Musab — Software & AI App Developer",
    description:
      "Mohammed Musab — Software & AI App Developer in Mumbai. Building smart AI tools, modern websites, live teamwork apps, and private chat.",
    type: "website",
    locale: "en_US",
    siteName: "Mohammed Musab",
  },
  twitter: {
    card: "summary",
    title: "Mohammed Musab — Software & AI App Developer",
    description:
      "Mohammed Musab — Software & AI App Developer in Mumbai. Building smart AI tools, modern websites, live teamwork apps, and private chat.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohammed Musab",
  alternateName: "Shaikh Mohammed Musab",
  jobTitle: "Software & AI App Developer",
  description:
    "Computer Engineering graduate in Mumbai building smart AI tools, modern websites, live collaboration apps, and private messaging.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/03musab",
    "https://www.linkedin.com/in/devmusab/",
  ],
  knowsAbout: [
    "Web Development",
    "AI Applications",
    "Next.js",
    "React",
    "Node.js",
    "AWS",
    "Oracle Cloud",
    "Privacy & Security",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mohammed Musab — Portfolio",
  description:
    "Portfolio of Mohammed Musab, Software & AI App Developer based in Mumbai, India.",
  inLanguage: "en",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="black"
      className={`${inter.variable} ${bricolage.variable} ${instrumentSerif.variable} ${geistMono.variable} h-full antialiased w-full overflow-x-clip`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col w-full overflow-x-clip">
        {/* Structured data (JSON-LD) for search engines & AI */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeChoreographer />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}

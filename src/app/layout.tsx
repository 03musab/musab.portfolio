import type { Metadata, Viewport } from "next";
import { Outfit, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f3f5" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
};

export const metadata: Metadata = {
  title: "Mohammed Musab — Full-Stack Engineer & AI Builder",
  description:
    "Mohammed Musab — Full-Stack Engineer & AI Builder in Mumbai. Building AI-powered products, full-stack apps, real-time tools, and secure E2E-encrypted systems.",
  keywords: [
    "Mohammed Musab",
    "Shaikh Mohammed Musab",
    "Full-Stack Developer",
    "AI Engineer",
    "AI Builder",
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
    title: "Mohammed Musab — Full-Stack Engineer & AI Builder",
    description:
      "Mohammed Musab — Full-Stack Engineer & AI Builder in Mumbai. I build AI-powered products, full-stack apps, real-time collaboration tools, and secure end-to-end encrypted systems.",
    type: "website",
    locale: "en_US",
    siteName: "Mohammed Musab",
  },
  twitter: {
    card: "summary",
    title: "Mohammed Musab — Full-Stack Engineer & AI Builder",
    description:
      "Mohammed Musab — Full-Stack Engineer & AI Builder in Mumbai. Building AI-powered products, full-stack apps, real-time tools, and secure E2E-encrypted systems.",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohammed Musab",
  alternateName: "Shaikh Mohammed Musab",
  jobTitle: "Software Engineer & Full-Stack Developer",
  description:
    "Computer Engineering graduate building AI-powered products, full-stack applications, real-time collaboration tools, and secure end-to-end encrypted systems.",
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
    "Full-Stack Development",
    "AI Engineering",
    "Next.js",
    "React",
    "Node.js",
    "AWS",
    "Oracle Cloud",
    "End-to-End Encryption",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mohammed Musab — Portfolio",
  description:
    "Portfolio of Mohammed Musab, Software Engineer & Full-Stack Developer based in Mumbai, India.",
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
      className={`${outfit.variable} ${instrument.variable} ${jetbrainsMono.variable} h-full antialiased w-full overflow-x-clip`}
      suppressHydrationWarning
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
      </head>
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
        {children}
      </body>
    </html>
  );
}

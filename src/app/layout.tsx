import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#030303",
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
  jobTitle: "Full-Stack Engineer & AI Builder",
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
    "Portfolio of Mohammed Musab, Full-Stack Engineer & AI Builder based in Mumbai, India.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased w-full overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col w-full overflow-x-hidden">
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

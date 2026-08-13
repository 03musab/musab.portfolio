import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SubPageShell from "@/components/SubPageShell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Mohammed Musab",
  description: "Privacy policy for the portfolio of Mohammed Musab — what data is collected and how it's used.",
};

const SECTIONS: { title: string; body: string }[] = [
  {
    title: "1. Information I Collect",
    body: "This portfolio is a static website. The only personal data processed is what you voluntarily submit through the contact form: your name, email address, and message content. No account registration or persistent user profiles exist.",
  },
  {
    title: "2. How Your Information Is Used",
    body: "Contact-form data is used solely to respond to your inquiry — to understand your project, estimate scope, and reply to your message. Your details are never sold, rented, or shared with third parties for marketing.",
  },
  {
    title: "3. Cookies & Tracking",
    body: "This site does not use cookies and runs no third-party analytics or advertising trackers. Some external links (GitHub, LinkedIn, resume hosting) operate under their own privacy policies when you leave this site.",
  },
  {
    title: "4. Data Retention & Security",
    body: "Emails you send are retained in my personal inbox for as long as needed to support our conversation. Messages are transmitted over standard TLS encryption, and I follow security best practices for any project data I handle.",
  },
  {
    title: "5. External Links",
    body: "This site links to external services including GitHub, LinkedIn, Google Drive, and deployed demo applications. This policy does not apply to those platforms — please review their respective privacy policies.",
  },
  {
    title: "6. Your Rights",
    body: "You may request access to, correction of, or deletion of any personal information you have shared with me at any time by emailing the address below. I'll honor removal requests promptly.",
  },
];

export default function PrivacyPage() {
  return (
    <SubPageShell>
      <div className="space-y-12">
        <div className="space-y-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
            Legal — Document 001
          </p>
          <h1 className="heading-glow font-display text-4xl tracking-tight lg:text-5xl">
            Privacy <em className="text-colorfull animate-gradient-x italic">policy</em>
          </h1>
          <p className="max-w-2xl leading-relaxed text-foreground/60">
            Last updated: August 2026. This policy explains what happens to the
            information you share with me through this portfolio.
          </p>
        </div>

        <div className="space-y-4">
          {SECTIONS.map((s) => (
            <section
              key={s.title}
              className="rounded-2xl border border-line bg-surface p-6"
            >
              <h2 className="mb-2 font-mono text-sm font-semibold tracking-wide">
                {s.title}
              </h2>
              <p className="text-sm leading-relaxed text-foreground/60">{s.body}</p>
            </section>
          ))}
        </div>

        <div className="rounded-2xl border border-foreground/20 bg-surface p-6">
          <h2 className="mb-2 font-mono text-sm font-semibold tracking-wide">
            7. Contact
          </h2>
          <p className="text-sm leading-relaxed text-foreground/60">
            Questions about this policy? Reach out at{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="font-mono text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
            >
              {SITE.email}
            </a>{" "}
            or via the{" "}
            <Link
              href="/#contact"
              className="inline-flex items-center gap-1 text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
            >
              contact section
              <ArrowRight size={12} />
            </Link>
            .
          </p>
        </div>
      </div>
    </SubPageShell>
  );
}

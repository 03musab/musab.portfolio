import type { Metadata } from "next";
import Link from "next/link";
import SubPageShell from "@/components/SubPageShell";
import Breadcrumbs from "@/components/Breadcrumbs";
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
      <div className="space-y-10">
        <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

        <div className="space-y-3">
          <p className="text-[10px] text-blue-400 font-mono font-bold tracking-widest uppercase">Legal — Document 001</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-sans">Privacy Policy</h1>
          <p className="text-gray-400 text-sm font-sans max-w-2xl leading-relaxed">
            Last updated: August 2026. This policy explains what happens to the information you share with me through
            this portfolio.
          </p>
        </div>

        <div className="space-y-4">
          {SECTIONS.map((s) => (
            <section key={s.title} className="bg-[#0a0a0c]/60 border border-white/5 rounded-xl p-5 sm:p-6">
              <h2 className="text-sm font-bold text-white font-mono mb-2">{s.title}</h2>
              <p className="text-sm text-gray-400 leading-relaxed font-sans">{s.body}</p>
            </section>
          ))}
        </div>

        <div className="bg-[#0a0a0c]/60 border border-blue-500/20 rounded-xl p-5 sm:p-6">
          <h2 className="text-sm font-bold text-white font-mono mb-2">7. Contact</h2>
          <p className="text-sm text-gray-400 leading-relaxed font-sans">
            Questions about this policy? Reach out at{" "}
            <a href={`mailto:${SITE.email}`} className="text-blue-400 hover:text-blue-300 transition-colors font-mono break-all">
              {SITE.email}
            </a>{" "}
            or via the <Link href="/#contact" className="text-blue-400 hover:text-blue-300 transition-colors">contact section</Link>.
          </p>
        </div>
      </div>
    </SubPageShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ChevronRight, Clock, Mail } from "lucide-react";
import SubPageShell from "@/components/SubPageShell";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank You | Mohammed Musab",
  description: "Your message was transmitted successfully. I'll get back to you within 24 hours.",
  robots: { index: false },
};

export default async function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>;
}) {
  const { name } = await searchParams;
  const firstName = name ? name.trim().split(" ")[0] : "there";

  return (
    <SubPageShell>
      <div className="space-y-10">
        <Breadcrumbs items={[{ label: "Thank You" }]} />

        <div className="bg-[#0a0a0c]/60 border border-white/10 rounded-2xl glow-border p-8 sm:p-12 text-center space-y-6 max-w-2xl mx-auto">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
            <CheckCircle className="text-green-400" size={28} />
          </div>

          <div className="space-y-2">
            <p className="text-[10px] text-blue-400 font-mono font-bold tracking-widest uppercase">Transmission Received</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white font-sans">
              Thank you{firstName !== "there" ? `, ${firstName}` : ""}!
            </h1>
            <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed font-sans">
              Your packet made it through the tunnel. I&apos;ll review your message and get back to you shortly.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-mono text-gray-400 bg-black border border-white/5 rounded-lg p-3 max-w-sm mx-auto">
            <Clock size={13} className="text-green-400" />
            <span>{SITE.responsePromise}</span>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="px-5 py-3 rounded-lg text-xs font-mono font-bold bg-white text-black hover:bg-gray-200 transition-colors flex items-center gap-1.5"
            >
              <span>Back to Command Center</span>
              <ChevronRight size={14} />
            </Link>
            <Link
              href="/#projects"
              className="px-5 py-3 rounded-lg text-xs font-mono font-bold bg-[#0e0e11] text-gray-300 hover:text-white border border-white/10 hover:border-white/20 transition-all flex items-center gap-1.5"
            >
              <span>View Projects</span>
            </Link>
            <a
              href={`mailto:${SITE.email}`}
              className="px-5 py-3 rounded-lg text-xs font-mono font-bold bg-[#0e0e11] text-gray-300 hover:text-white border border-white/10 hover:border-white/20 transition-all flex items-center gap-1.5"
            >
              <Mail size={14} />
              <span>Email Me Directly</span>
            </a>
          </div>
        </div>
      </div>
    </SubPageShell>
  );
}

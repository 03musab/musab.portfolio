import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Mail } from "lucide-react";
import SubPageShell from "@/components/SubPageShell";
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
      <div className="mx-auto max-w-xl space-y-8 text-center">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-500/10 text-emerald-500">
          <CheckCircle size={30} />
        </div>

        <div className="space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
            Message Received
          </p>
          <h1 className="heading-glow font-display text-4xl tracking-tight lg:text-5xl">
            Thank you{firstName !== "there" ? `, ${firstName}` : ""}!
          </h1>
          <p className="mx-auto max-w-md leading-relaxed text-foreground/60">
            Your message made it through. I&apos;ll review it and get back to
            you shortly — usually within 24 hours.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-background transition-opacity hover:opacity-85"
          >
            Back to homepage
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-foreground/80 transition-colors hover:text-foreground"
          >
            <Mail size={14} />
            Email me directly
          </a>
        </div>
      </div>
    </SubPageShell>
  );
}

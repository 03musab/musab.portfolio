import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import SubPageShell from "@/components/SubPageShell";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Mohammed Musab",
  description: "The page you're looking for doesn't exist. Head back home.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <SubPageShell>
      <div className="mx-auto max-w-xl space-y-8 text-center">
        <div className="space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
            Error 404 — Route Not Found
          </p>
          <h1 className="heading-glow font-display text-8xl tracking-tight">
            404
          </h1>
          <p className="mx-auto max-w-md leading-relaxed text-foreground/60">
            This endpoint doesn&apos;t exist in the system. The page you&apos;re
            looking for may have moved, or the link is broken.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-background transition-opacity hover:opacity-85"
          >
            <Compass size={14} className="transition-transform duration-300 group-hover:rotate-45" />
            Back to homepage
          </Link>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-foreground/80 transition-colors hover:text-foreground"
          >
            View projects
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </SubPageShell>
  );
}

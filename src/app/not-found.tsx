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
            404 · Page Not Found
          </p>
          <h1 className="font-display text-8xl font-semibold tracking-[-0.03em] text-foreground">
            404
          </h1>
          <p className="mx-auto max-w-md leading-relaxed text-foreground/60">
            Sorry, we couldn&apos;t find this page. It may have moved, or the link
            might be broken.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="btn-primary group px-5 py-3"
          >
            <Compass size={14} className="transition-transform duration-300 group-hover:rotate-45" />
            <span>Back to homepage</span>
          </Link>
          <Link
            href="/#projects"
            className="btn-secondary px-5 py-3"
          >
            <span>View projects</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </SubPageShell>
  );
}

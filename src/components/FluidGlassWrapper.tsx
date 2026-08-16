"use client";

import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import FluidGlass from "./FluidGlass";

import SendEmailButton from "./SendEmailButton";

export default function FluidGlassWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="lens" className="scroll-mt-24 space-y-10">
      {/* ── Section Header ── */}
      <Reveal>
        <div className="space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
            Engineering &amp; Innovation
          </p>
          <h2 className="heading-glow font-display text-4xl tracking-tight lg:text-5xl">
            Software engineering through{" "}
            <em className="text-colorfull animate-gradient-x italic">a new lens</em>
          </h2>

        </div>
      </Reveal>

      {/* ── 3D Glass Canvas ── */}
      <Reveal delay={0.1}>
        <div className="relative h-[220px] w-full overflow-hidden rounded-2xl border border-line shadow-2xl">
          {mounted ? (
            <FluidGlass
              mode="lens"
              lensProps={{
                scale: 0.25,
                ior: 1.15,
                thickness: 5,
                chromaticAberration: 0.1,
                anisotropy: 0.01,
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-surface p-8 text-center font-mono text-xs text-foreground/50">
              Loading Interactive 3D Glass Lens…
            </div>
          )}
        </div>
      </Reveal>

      {/* ── Recruiter CTA strip ── */}
      <Reveal delay={0.25}>
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">
              Open to full-time &amp; internship opportunities
            </p>
            <p className="text-xs text-foreground/55">
              Available for roles in Full-Stack, Backend Systems, or AI/Automation engineering.
              Based in Mumbai · Remote-friendly.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <SendEmailButton variant="button" />
            <a
              href="tel:+919152921715"
              className="rounded-full border border-line px-5 py-2.5 font-mono text-[11px] uppercase tracking-wider text-foreground/80 transition-all hover:border-foreground/40 hover:text-foreground"
            >
              +91 91529 21715
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

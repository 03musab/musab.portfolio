"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { animate, spring } from "animejs";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Lock, Sparkles } from "lucide-react";
import { EASING_EDITORIAL } from "@/lib/animations";

type PillarId = "live" | "ai" | "private";

const PRIVACY_PLAIN = "keep your data private";
const CIPHER_POOL = "x0#k9$v2%q7&m4*z";

const PILLAR_PROOFS: Record<
  PillarId,
  { tag: string; detail: string; dotClass: string }
> = {
  live: {
    tag: "Togcode",
    detail: "Shared coding rooms that sync live in under 50ms",
    dotClass: "bg-highlight",
  },
  ai: {
    tag: "JobSnap",
    detail: "Automatic job scanning, resume matching & daily shortlists",
    dotClass: "bg-accent",
  },
  private: {
    tag: "TalkSphere",
    detail: "Messages & files locked inside your browser before sending",
    dotClass: "bg-teal-400",
  },
};

export default function HeroCraftStatement() {
  const lenis = useLenis();
  const [activePillar, setActivePillar] = useState<PillarId | null>(null);
  const [privacyLabel, setPrivacyLabel] = useState(PRIVACY_PLAIN);
  const decodeRafRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      if (decodeRafRef.current) cancelAnimationFrame(decodeRafRef.current);
    };
  }, []);

  const triggerSpringLift = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    animate(el, {
      translateY: [-2.5, 0],
      ease: spring({ stiffness: 420, damping: 18 }),
    });
  }, []);

  const runPrivacyDecode = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (decodeRafRef.current) cancelAnimationFrame(decodeRafRef.current);

    const start = performance.now();
    const duration = 290;

    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const lockedCount = Math.floor(progress * PRIVACY_PLAIN.length);

      let output = "";
      for (let i = 0; i < PRIVACY_PLAIN.length; i++) {
        const ch = PRIVACY_PLAIN[i];
        if (ch === " " || i < lockedCount) {
          output += ch;
        } else {
          output += CIPHER_POOL[(i * 7 + Math.floor(now / 28)) % CIPHER_POOL.length];
        }
      }
      setPrivacyLabel(output);

      if (progress < 1) {
        decodeRafRef.current = requestAnimationFrame(step);
      } else {
        setPrivacyLabel(PRIVACY_PLAIN);
        decodeRafRef.current = 0;
      }
    };

    decodeRafRef.current = requestAnimationFrame(step);
  }, []);

  const jumpToProjects = useCallback(() => {
    const el = document.getElementById("projects");
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -24, duration: 1.0 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [lenis]);

  const activeProof = activePillar ? PILLAR_PROOFS[activePillar] : null;

  return (
    <div className="space-y-5">
      {/* 1. Living Editorial Statement: Geometric Sans + Instrument Serif Italic */}
      <div data-hero-reveal className="space-y-3">
        <p className="font-display text-[clamp(1.38rem,2.55vw,2.05rem)] font-normal leading-[1.32] tracking-[-0.02em] text-muted-foreground">
          I build apps that{" "}
          {/* Pillar 1: Live Sync */}
          <button
            type="button"
            onMouseEnter={(e) => {
              setActivePillar("live");
              triggerSpringLift(e.currentTarget);
            }}
            onMouseLeave={() => setActivePillar(null)}
            onFocus={() => setActivePillar("live")}
            onBlur={() => setActivePillar(null)}
            onClick={jumpToProjects}
            className="group relative inline-flex items-baseline gap-1.5 align-baseline font-editorial text-[1.18em] italic font-normal tracking-[0.005em] text-foreground transition-colors duration-200 hover:text-highlight cursor-pointer outline-none"
          >
            <span className="relative inline-flex size-[6px] -translate-y-[0.22em] shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-highlight opacity-65" />
              <span className="relative inline-flex size-[6px] rounded-full bg-highlight" />
            </span>
            <span className="border-b border-highlight/35 pb-[1px] transition-colors group-hover:border-highlight">
              update live
            </span>
          </button>
          ,{" "}
          {/* Pillar 2: AI Automation */}
          <button
            type="button"
            onMouseEnter={(e) => {
              setActivePillar("ai");
              triggerSpringLift(e.currentTarget);
            }}
            onMouseLeave={() => setActivePillar(null)}
            onFocus={() => setActivePillar("ai")}
            onBlur={() => setActivePillar(null)}
            onClick={jumpToProjects}
            className="group relative inline-flex items-baseline gap-1 align-baseline font-editorial text-[1.18em] italic font-normal tracking-[0.005em] cursor-pointer outline-none"
          >
            <Sparkles
              size={13}
              className="shrink-0 -translate-y-[0.14em] text-accent transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
            />
            <span className="editorial-ai-sheen border-b border-accent/35 pb-[1px] transition-colors group-hover:border-accent">
              save time with AI
            </span>
          </button>
          , and{" "}
          {/* Pillar 3: On-Device Privacy */}
          <button
            type="button"
            onMouseEnter={(e) => {
              setActivePillar("private");
              triggerSpringLift(e.currentTarget);
              runPrivacyDecode();
            }}
            onMouseLeave={() => setActivePillar(null)}
            onFocus={() => {
              setActivePillar("private");
              runPrivacyDecode();
            }}
            onBlur={() => setActivePillar(null)}
            onClick={jumpToProjects}
            className="group relative inline-flex items-baseline gap-1.5 align-baseline font-editorial text-[1.18em] italic font-normal tracking-[0.005em] text-teal-300 transition-colors duration-200 hover:text-teal-200 cursor-pointer outline-none"
          >
            <Lock
              size={12}
              className="shrink-0 -translate-y-[0.14em] text-teal-400 transition-transform duration-300 group-hover:-rotate-6"
            />
            <span className="border-b border-teal-400/35 pb-[1px] transition-colors group-hover:border-teal-300">
              {privacyLabel}
            </span>
          </button>
          .
        </p>

        {/* Whisper-quiet inline proof caption (fixed height -> zero layout shift) */}
        <div className="flex min-h-5 items-center font-mono text-[10.5px] tracking-[0.04em] text-muted-foreground/85">
          <AnimatePresence mode="wait">
            {activeProof ? (
              <motion.button
                key={activePillar}
                type="button"
                onClick={jumpToProjects}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.18, ease: EASING_EDITORIAL }}
                className="inline-flex items-center gap-2 text-left text-foreground/90 cursor-pointer"
              >
                <span className={`size-1.5 shrink-0 rounded-full ${activeProof.dotClass}`} />
                <span className="font-semibold text-foreground">{activeProof.tag}</span>
                <span className="text-muted-foreground">— {activeProof.detail}</span>
                <ArrowUpRight size={11} className="shrink-0 text-accent" />
              </motion.button>
            ) : (
              <motion.span
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.72 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground"
              >
                Hover any highlighted phrase to preview the build behind it
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 2. Architectural Editorial Bio Block (Left Cobalt->Cyan Hairline) */}
      <div
        data-hero-reveal
        className="relative max-w-xl pl-4 sm:pl-5"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-1 left-0 top-1 w-[1.5px] rounded-full bg-gradient-to-b from-accent via-highlight/70 to-transparent"
        />

        <div className="space-y-2">
          {/* Compact Technical Credential Bar */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
            <span className="text-foreground/85">Computer Engineering &apos;26</span>
            <span aria-hidden="true" className="text-line">·</span>
            <span>Mumbai</span>
            <span aria-hidden="true" className="text-line">·</span>
            <span className="inline-flex items-center gap-1.5 text-highlight">
              <span className="size-1.5 rounded-full bg-highlight" />
              <span>Building at Luxure</span>
            </span>
          </div>

          {/* Mixed Sans + Instrument Serif Italic Craft Sentence */}
          <p className="text-[15.5px] leading-[1.65] text-muted-foreground">
            Currently building online shopping software at{" "}
            <span className="font-medium text-foreground">Luxure</span> — handling both the{" "}
            <span className="font-editorial text-[1.22em] italic text-foreground">
              screens people use
            </span>{" "}
            and the behind-the-scenes{" "}
            <span className="font-editorial text-[1.22em] italic text-foreground">
              servers &amp; databases
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

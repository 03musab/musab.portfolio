"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import NumberFlow from "@number-flow/react";
import { useInView } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const THESIS_TEXT =
  "Most portfolios just list technical tools. I focus on solving three everyday problems: making shared screens update instantly, turning repetitive chores into automatic workflows, and locking private messages before they ever leave your device.";

const HIGHLIGHT_WORDS = new Set([
  "instantly,",
  "automatic",
  "workflows,",
  "locking",
  "private",
  "messages",
]);

const WORDS = THESIS_TEXT.split(" ");

export default function StoryThesisSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const metricsInView = useInView(metricsRef, { once: true, amount: 0.4 });

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const wordEls = gsap.utils.toArray<HTMLElement>("[data-thesis-word]");
      gsap.fromTo(
        wordEls,
        {
          opacity: 0.16,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          ease: "none",
          scrollTrigger: {
            trigger: textRef.current ?? sectionRef.current,
            start: "top 62%",
            end: "bottom 56%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );

      gsap.fromTo(
        "[data-thesis-beam]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: metricsRef.current,
            start: "top 88%",
            end: "top 58%",
            scrub: 0.4,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="thesis"
      className="scroll-mt-24 border-b border-line/70 pb-24 pt-12 lg:pb-36 lg:pt-16"
    >
      <div className="section-container space-y-16">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="space-y-2.5 lg:col-span-3">
            <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-accent" />
              <span>About Me</span>
            </p>
          </div>

          <div className="lg:col-span-9">
            <p
              ref={textRef}
              className="font-display text-[clamp(1.65rem,3.2vw,2.65rem)] font-medium leading-[1.24] tracking-[-0.025em] text-foreground"
            >
              {WORDS.map((word, idx) => {
                const isKey = HIGHLIGHT_WORDS.has(word);
                return (
                  <span
                    key={`${word}-${idx}`}
                    className="inline-block overflow-hidden pb-[0.08em] align-bottom"
                  >
                    <span
                      data-thesis-word
                      className={`inline-block origin-bottom ${
                        isKey ? "text-accent" : ""
                      }`}
                    >
                      {word}&nbsp;
                    </span>
                  </span>
                );
              })}
            </p>
          </div>
        </div>

        {/* Un-boxed horizontal metric index animated with NumberFlow & scrubbed filament */}
        <div ref={metricsRef} className="relative pt-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-line/70"
          />
          <div
            data-thesis-beam
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] origin-left bg-gradient-to-r from-accent via-highlight to-transparent"
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="space-y-1.5">
              <p className="font-display text-4xl font-semibold tracking-[-0.025em] text-foreground lg:text-5xl">
                &lt;
                <NumberFlow value={metricsInView ? 50 : 0} suffix="ms" />
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Live Screen Sync Speed
              </p>
            </div>

            <div className="space-y-1.5">
              <p className="font-display text-4xl font-semibold tracking-[-0.025em] text-foreground lg:text-5xl">
                <NumberFlow value={metricsInView ? 3 : 0} />
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Complete Products Built &amp; Live
              </p>
            </div>

            <div className="space-y-1.5">
              <p className="font-display text-4xl font-semibold tracking-[-0.025em] text-foreground lg:text-5xl">
                <NumberFlow
                  value={metricsInView ? 8.37 : 0}
                  format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                />
                <span className="text-2xl font-normal text-muted-foreground">
                  {" "}
                  / 10
                </span>
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                B.E. Computer Engineering Grade
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

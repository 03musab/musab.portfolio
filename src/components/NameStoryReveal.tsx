"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

type StoryPhase = "sketch" | "filling" | "ready";

const STORY_COPY: Record<StoryPhase, string> = {
  sketch: "Sketching an idea...",
  filling: "Bringing it to life...",
  ready: "Turning ideas into real apps",
};

const WORDS = ["Mohammed", "Musab"] as const;

export default function NameStoryReveal() {
  const rootRef = useRef<HTMLDivElement>(null);
  const tracerLineRef = useRef<HTMLDivElement>(null);
  const tracerDotRef = useRef<HTMLSpanElement>(null);
  const originTextRef = useRef<HTMLSpanElement>(null);
  const outlineRef = useRef<HTMLSpanElement>(null);
  const inkRef = useRef<HTMLSpanElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);

  const [revealed, setRevealed] = useState(false);
  const [storyPhase, setStoryPhase] = useState<StoryPhase>("sketch");

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const isDesktop = window.innerWidth >= 1024;
        const startDelay = isDesktop ? 2.1 : 0.45;

        const underlineEl = underlineRef.current;
        const pathLen = underlineEl ? underlineEl.getTotalLength() : 220;

        if (underlineEl) {
          gsap.set(underlineEl, {
            strokeDasharray: pathLen,
            strokeDashoffset: pathLen,
          });
        }

        gsap.set(tracerLineRef.current, {
          scaleX: 0,
          autoAlpha: 1,
          transformOrigin: "left center",
        });
        gsap.set(tracerDotRef.current, { autoAlpha: 0, scale: 0 });
        gsap.set(originTextRef.current, { autoAlpha: 0, x: -8 });
        gsap.set(outlineRef.current, { yPercent: 105, autoAlpha: 1 });
        gsap.set(inkRef.current, {
          yPercent: 105,
          autoAlpha: 1,
          clipPath: "inset(0 100% 0 0)",
        });

        const tl = gsap.timeline({
          delay: startDelay,
          onComplete: () => {
            setStoryPhase("ready");
            setRevealed(true);
          },
        });

        // 1) Blueprint origin line draws across
        tl.to(tracerDotRef.current, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.25,
          ease: "back.out(2)",
        })
          .to(
            tracerLineRef.current,
            {
              scaleX: 1,
              duration: 0.5,
              ease: "power3.out",
            },
            "<0.05",
          )
          .to(
            originTextRef.current,
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.35,
              ease: "power2.out",
            },
            "<0.15",
          )
          // 2) Hollow blueprint outline + ink mask rise out of baseline
          .to(
            [outlineRef.current, inkRef.current],
            {
              yPercent: 0,
              duration: 0.65,
              ease: "power3.out",
            },
            "-=0.25",
          )
          // 3) Ink fill wipes cleanly across the blueprint outline left-to-right
          .call(() => setStoryPhase("filling"), [], "-=0.25")
          .to(
            inkRef.current,
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 0.75,
              ease: "power3.inOut",
            },
            "<",
          )
          // 4) Fade outline quietly once ink finishes, and draw Cobalt accent stroke under "Musab"
          .to(
            outlineRef.current,
            {
              autoAlpha: 0,
              duration: 0.25,
              ease: "power1.out",
            },
            "-=0.1",
          )
          .to(
            underlineEl,
            {
              strokeDashoffset: 0,
              duration: 0.55,
              ease: "power2.out",
            },
            "-=0.3",
          );
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  // Living variable-font weight wave across characters on pointer hover
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLHeadingElement>) => {
      if (reducedMotion || !revealed) return;
      const mouseX = e.clientX;
      const sigma = 68;
      const chars = e.currentTarget.querySelectorAll<HTMLElement>("[data-name-char]");

      chars.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const dist = mouseX - centerX;
        const influence = Math.exp(-(dist * dist) / (2 * sigma * sigma));
        const weight = Math.round(580 + influence * 220);
        el.style.fontVariationSettings = `'wght' ${weight}, 'opsz' 72`;
      });
    },
    [reducedMotion, revealed],
  );

  const handlePointerLeave = useCallback(
    (e: React.PointerEvent<HTMLHeadingElement>) => {
      const chars = e.currentTarget.querySelectorAll<HTMLElement>("[data-name-char]");
      chars.forEach((el) => {
        el.style.fontVariationSettings = "'wght' 600, 'opsz' 72";
      });
    },
    [],
  );

  let globalCharIdx = 0;

  return (
    <div ref={rootRef} className="space-y-3">
      {/* Animated Story Tracer Line */}
      <div className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        <span
          ref={tracerDotRef}
          data-name-init-hidden
          className="size-1.5 shrink-0 rounded-full bg-highlight"
        />
        <span
          ref={originTextRef}
          data-name-init-hidden
          className="inline-block min-h-4 shrink-0 overflow-hidden"
        >
          <motion.span
            key={reducedMotion ? "ready" : storyPhase}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={`inline-block ${
              (reducedMotion || storyPhase === "ready") ? "text-foreground/80" : ""
            }`}
          >
            {reducedMotion ? STORY_COPY.ready : STORY_COPY[storyPhase]}
          </motion.span>
        </span>
        <div
          ref={tracerLineRef}
          data-name-init-hidden
          aria-hidden="true"
          className="h-px max-w-[140px] flex-1 bg-gradient-to-r from-accent/60 to-transparent"
        />
      </div>

      {/* Dual-Layer Blueprint Outline -> Solid Ink Fill + Variable Weight Wave */}
      <div className="relative overflow-hidden pb-3">
        <h1
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          aria-label="Mohammed Musab"
          className="relative font-display text-[clamp(2.9rem,6.8vw,5.1rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-foreground select-none"
          style={{ fontVariationSettings: "'wght' 600, 'opsz' 72" }}
        >
          {/* Layer 1: Blueprint Draft Outline (hidden in SSR HTML until GSAP animates) */}
          {!reducedMotion && (
            <span
              ref={outlineRef}
              data-name-init-hidden
              aria-hidden="true"
              className="pointer-events-none block"
              style={{
                color: "transparent",
                WebkitTextStroke: "1.2px var(--accent-border)",
              }}
            >
              {WORDS.map((word, wIdx) => (
                <span key={word}>
                  <span className="inline-block whitespace-nowrap">{word}</span>
                  {wIdx === 0 ? " " : ""}
                </span>
              ))}
            </span>
          )}

          {/* Layer 2: Compiled Ink Fill + Interactive Character Weight Wave */}
          <span
            ref={inkRef}
            data-name-init-hidden={!reducedMotion ? "" : undefined}
            className={reducedMotion ? "block" : "absolute inset-0 block"}
          >
            {WORDS.map((word, wIdx) => (
              <span key={word}>
                <span className="relative inline-block whitespace-nowrap">
                  {revealed && !reducedMotion
                    ? word.split("").map((char) => {
                        const idx = globalCharIdx++;
                        return (
                          <span
                            key={`${word}-${idx}`}
                            data-name-char
                            className="inline-block transition-[font-variation-settings] duration-200 ease-out"
                            style={{
                              fontVariationSettings: "'wght' 600, 'opsz' 72",
                            }}
                          >
                            {char}
                          </span>
                        );
                      })
                    : word}

                  {/* Animated Cobalt accent stroke beneath "Musab" */}
                  {wIdx === 1 && (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 220 12"
                      fill="none"
                      preserveAspectRatio="none"
                      className="pointer-events-none absolute -bottom-2 left-0 h-2.5 w-full"
                    >
                      <path
                        ref={underlineRef}
                        d="M 2 7 Q 110 2 218 6"
                        stroke="var(--accent)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </span>
                {wIdx === 0 ? " " : ""}
              </span>
            ))}
          </span>
        </h1>
      </div>
    </div>
  );
}

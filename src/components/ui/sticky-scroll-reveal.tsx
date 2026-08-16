"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, type MotionValue, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
  onProgress,
  onActiveCardChange,
  onBreakpointsChange,
}: {
  content: {
    title: string;
    subtitle?: string;
    tag?: string;
    description: string;
    content?: React.ReactNode | any;
    accentColor?: string;
  }[];
  contentClassName?: string;
  onProgress?: (progress: MotionValue<number>) => void;
  onActiveCardChange?: (index: number) => void;
  onBreakpointsChange?: (breakpoints: number[]) => void;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const [breakpoints, setBreakpoints] = useState<number[] | null>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const contentColRef = useRef<HTMLDivElement>(null);

  // The projects scroll with the page like every other section — no inner
  // scroll container. Progress runs from when the row's top reaches the
  // viewport top to when its bottom does.
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start start", "end end"],
  });

  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;
  useEffect(() => {
    onProgressRef.current?.(scrollYProgress);
  }, [scrollYProgress]);

  const onActiveCardChangeRef = useRef(onActiveCardChange);
  onActiveCardChangeRef.current = onActiveCardChange;
  const onBreakpointsChangeRef = useRef(onBreakpointsChange);
  onBreakpointsChangeRef.current = onBreakpointsChange;

  const cardLength = content.length;

  // Fallback breakpoints until the real card positions are measured.
  const fallbackBps = React.useMemo(
    () => Array.from({ length: cardLength }, (_, i) => (i + 0.5) / cardLength),
    [cardLength],
  );

  // Measure the scroll progress at which each project card's vertical center
  // crosses the middle of the viewport — that is the moment the card becomes
  // the dominant content, exactly when the preview and ambient colour switch.
  useLayoutEffect(() => {
    const measure = () => {
      const row = rowRef.current;
      const col = contentColRef.current;
      if (!row || !col) return;
      const cards = Array.from(col.querySelectorAll<HTMLElement>("[data-project-card]"));
      if (cards.length === 0) return;
      const travel = row.offsetHeight - window.innerHeight;
      if (travel <= 0) return;
      const viewportCenter = window.innerHeight / 2;
      const bps = cards.map((card) => {
        const center = card.offsetTop + card.offsetHeight / 2;
        return Math.min(1, Math.max(0, (center - viewportCenter) / travel));
      });
      setBreakpoints(bps);
      onBreakpointsChangeRef.current?.(bps);
    };

    measure();
    window.addEventListener("resize", measure);
    const settle = window.setTimeout(measure, 400);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      window.removeEventListener("resize", measure);
      window.clearTimeout(settle);
    };
  }, [cardLength]);

  const bps = breakpoints ?? fallbackBps;

  // The active card is the last one whose breakpoint has been passed — i.e.
  // the card currently centered in the viewport. Switching exactly at each
  // breakpoint keeps the preview in sync with the visible content in both
  // scroll directions.
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let index = 0;
    for (let i = 0; i < bps.length; i++) {
      if (latest >= bps[i]) index = i;
    }
    if (index !== activeCard) {
      setActiveCard(index);
      onActiveCardChangeRef.current?.(index);
    }
  });

  useEffect(() => {
    onActiveCardChangeRef.current?.(activeCard);
  }, [activeCard]);

  const currentItem = content[activeCard];
  const activeAccent = currentItem?.accentColor;

  return (
    <div ref={rowRef} className="relative flex items-start justify-center gap-10">
      {/* Content column — normal page flow. The generous vertical rhythm gives
          each project its own scroll moment, and the ambient colour morphs in
          the gaps between cards. */}
      <div ref={contentColRef} className="max-w-2xl space-y-[40vh] pb-[45vh] pt-10">
        {content.map((item, index) => {
          const isActive = activeCard === index;
          return (
            <div key={item.title + index} data-project-card className="group relative">
              {/* Visual active indicator pill */}
              {item.tag && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isActive ? 1 : 0.8, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-3 inline-flex items-center gap-2 rounded-full border border-line/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em]"
                  style={{
                    borderColor:
                      isActive && item.accentColor ? item.accentColor : "var(--border)",
                    color: isActive && item.accentColor ? item.accentColor : "var(--foreground)",
                    backgroundColor:
                      isActive && item.accentColor ? `${item.accentColor}18` : "transparent",
                  }}
                >
                  <span
                    className="size-1.5 rounded-full"
                    style={{
                      backgroundColor: item.accentColor || "#3b82f6",
                      boxShadow: isActive && item.accentColor ? `0 0 10px ${item.accentColor}` : "none",
                    }}
                  />
                  {item.tag}
                </motion.div>
              )}

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0.85 }}
                transition={{ duration: 0.3 }}
                className="font-display text-3xl font-bold tracking-tight text-foreground lg:text-4xl"
              >
                {item.title}
              </motion.h2>

              {item.subtitle && (
                <motion.p
                  animate={{ opacity: isActive ? 0.95 : 0.8 }}
                  className="mt-1 font-mono text-xs text-foreground/75"
                >
                  {item.subtitle}
                </motion.p>
              )}

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0.85 }}
                transition={{ duration: 0.3 }}
                className="mt-5 max-w-xl text-sm leading-relaxed text-foreground/80"
              >
                {item.description}
              </motion.p>

              {/* Inline project preview card on mobile viewports */}
              <div className="mt-6 block overflow-hidden rounded-xl border border-line/60 lg:hidden">
                <div className="h-64 w-full relative">{item.content}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky desktop preview panel — pinned to the viewport (below the
          fixed nav) while the page scrolls through the projects. It keeps its
          own subtle accent border/glow, the only frame in this section. */}
      <motion.div
        animate={{
          borderColor: activeAccent ? `${activeAccent}60` : "var(--border)",
          boxShadow: activeAccent
            ? `0 20px 60px -20px ${activeAccent}50`
            : "0 20px 60px -20px rgba(0,0,0,0.3)",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={cn(
          "project-theme-transition sticky top-24 z-20 hidden h-80 w-96 shrink-0 overflow-hidden rounded-2xl border border-line/60 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)] lg:block cursor-pointer",
          contentClassName,
        )}
        data-cursor-label="EXPLORE"
      >
        <div className="relative h-full w-full overflow-hidden bg-black/40">
          {content.map((item, index) => {
            const isActive = activeCard === index;
            return (
              <motion.div
                key={item.title + index}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1 : 1.08,
                  filter: isActive ? "blur(0px) brightness(1)" : "blur(14px) brightness(0.6)",
                  clipPath: isActive
                    ? "inset(0% 0% 0% 0% round 1rem)"
                    : "inset(4% 4% 4% 4% round 1.5rem)",
                  zIndex: isActive ? 10 : 0,
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-0 h-full w-full"
                style={{
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                {item.content}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

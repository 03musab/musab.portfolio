"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useMotionValue } from "motion/react";
import { RotateCcw } from "lucide-react";
import KineticHeading from "./KineticHeading";
import SkillsBlackHoleStage, {
  ToolIconGlyph,
  type BlackHolePhase,
} from "./SkillsBlackHoleStage";
import { EASING_EDITORIAL, SPRING_TACTILE } from "@/lib/animations";
import { SKILL_LAYERS, type ToolItem } from "@/lib/skills-data";

gsap.registerPlugin(ScrollTrigger);

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

const DESKTOP_SKILLS_QUERY = "(min-width: 1024px)";

function subscribeDesktop(callback: () => void) {
  const mq = window.matchMedia(DESKTOP_SKILLS_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getDesktopSnapshot(): boolean {
  return window.matchMedia(DESKTOP_SKILLS_QUERY).matches;
}

function getDesktopServerSnapshot(): boolean {
  return false;
}

function StaticSkillsFallback({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <section id="skills" className="scroll-mt-24 pb-pagebuilder">
      <div className="section-container space-y-10">
        <div className="space-y-2 border-b border-line pb-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
            Skills
          </p>
          <KineticHeading
            text="Tools & technologies I use"
            accentWords={["technologies"]}
            className="font-display text-3xl font-semibold tracking-[-0.025em] text-foreground sm:text-4xl"
          />
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            {reducedMotion
              ? "Six layers working together — from screens users tap down to cloud safety and core problem solving."
              : "How six layers work together behind every app — from screens users tap down to cloud safety and core problem solving."}
          </p>
        </div>

        <div className="space-y-10">
          {SKILL_LAYERS.map((layer) => (
            <div key={layer.id} className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  <span
                    className="size-1.5 rounded-full"
                    style={{ backgroundColor: layer.accentHex }}
                  />
                  <span>
                    {layer.step} · {layer.domain}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold tracking-[-0.015em] text-foreground">
                  {layer.storyTitle}
                </h3>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {layer.storyText}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                {layer.items.map((tool) => (
                  <div
                    key={tool.id}
                    className="liquid-glass flex items-start gap-3 rounded-2xl p-3.5"
                  >
                    <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl border border-line bg-background/60">
                      <ToolIconGlyph tool={tool} size={20} />
                    </span>
                    <div className="min-w-0 space-y-0.5">
                      <p className="font-mono text-xs font-semibold text-foreground">
                        {tool.name}
                      </p>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {tool.meaning}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DesktopBlackHoleSkills() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const scrollScaledRef = useRef(0);
  const lenis = useLenis();
  const scrollProgress = useMotionValue(0);

  const [activeLayerIdx, setActiveLayerIdx] = useState(0);
  const [phaseLabel, setPhaseLabel] = useState<BlackHolePhase>("Orbiting");
  const [inspectedTool, setInspectedTool] = useState<ToolItem | null>(null);

  useGSAP(
    () => {
      const pinEl = pinRef.current;
      if (!pinEl) return;

      let lastIdx = -1;
      let lastPhase: BlackHolePhase | "" = "";

      const applyScrollProgress = (p: number) => {
        const clamped = Math.min(1, Math.max(0, p));
        const scaled = clamped * (SKILL_LAYERS.length - 1);
        scrollScaledRef.current = scaled;
        scrollProgress.set(clamped);

        const k = Math.min(SKILL_LAYERS.length - 2, Math.floor(scaled));
        const frac = scaled - k;
        const nextIdx = frac < 0.5 ? k : k + 1;
        const nextPhase: BlackHolePhase =
          frac >= 0.14 && frac < 0.5
            ? "Gravity Pull"
            : frac >= 0.5 && frac <= 0.9
              ? "Supernova"
              : "Orbiting";

        if (nextIdx !== lastIdx) {
          lastIdx = nextIdx;
          setActiveLayerIdx(nextIdx);
          setInspectedTool(null);
        }
        if (nextPhase !== lastPhase) {
          lastPhase = nextPhase;
          setPhaseLabel(nextPhase);
        }
      };

      const st = ScrollTrigger.create({
        trigger: pinEl,
        start: "top 24px",
        end: "+=5200",
        pin: true,
        scrub: 1.35,
        invalidateOnRefresh: true,
        snap: {
          snapTo: [0, 0.2, 0.4, 0.6, 0.8, 1],
          duration: { min: 0.55, max: 1.05 },
          delay: 0.38,
          ease: "power3.out",
        },
        onUpdate: (self) => applyScrollProgress(self.progress),
        onLeave: () => applyScrollProgress(1),
        onLeaveBack: () => applyScrollProgress(0),
      });

      triggerRef.current = st;

      // Refresh cached pin start offset whenever upstream #github section height changes
      const upstreamEl = document.getElementById("github");
      let prevUpstreamH = upstreamEl?.getBoundingClientRect().height ?? 0;
      let refreshRaf = 0;
      const ro = upstreamEl
        ? new ResizeObserver((entries) => {
            const nextH = entries[0]?.contentRect.height ?? prevUpstreamH;
            if (Math.abs(nextH - prevUpstreamH) > 4) {
              prevUpstreamH = nextH;
              cancelAnimationFrame(refreshRaf);
              refreshRaf = requestAnimationFrame(() => ScrollTrigger.refresh());
            }
          })
        : null;
      if (upstreamEl && ro) ro.observe(upstreamEl);

      return () => {
        cancelAnimationFrame(refreshRaf);
        ro?.disconnect();
        triggerRef.current = null;
        st.kill();
      };
    },
    { scope: sectionRef },
  );

  const jumpToLayer = useCallback(
    (idx: number) => {
      const st = triggerRef.current;
      if (!st) {
        scrollScaledRef.current = idx;
        scrollProgress.set(idx / (SKILL_LAYERS.length - 1));
        setActiveLayerIdx(idx);
        return;
      }

      const targetProgress = idx / (SKILL_LAYERS.length - 1);
      const targetY = st.start + (st.end - st.start) * targetProgress;
      if (lenis) {
        lenis.scrollTo(targetY, { duration: 1.15 });
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    },
    [lenis, scrollProgress],
  );

  const activeLayer = SKILL_LAYERS[activeLayerIdx] ?? SKILL_LAYERS[0];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="scroll-mt-24 overflow-x-clip pb-6 pt-6"
    >
      <div
        ref={pinRef}
        className="section-container relative z-10 space-y-3.5 py-2"
      >
        {/* Compact Viewport-Safe Header + Scrubbed Scroll Progress Rail */}
        <div className="space-y-2.5">
          <div className="flex items-end justify-between gap-6">
            <div className="space-y-0.5">
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
                Skills
              </p>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <KineticHeading
                  text="Tools & technologies I use"
                  accentWords={["technologies"]}
                  className="font-display text-2xl font-semibold tracking-[-0.025em] text-foreground xl:text-3xl"
                />
                <p className="text-xs text-muted-foreground">
                  Scroll to pull each layer into the gravity well and burst into the next stage.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em]">
              <span className="liquid-glass inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-foreground">
                <span
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: activeLayer.accentHex }}
                />
                Layer {activeLayer.step} / {String(SKILL_LAYERS.length).padStart(2, "0")}
              </span>
              {activeLayerIdx > 0 && (
                <button
                  type="button"
                  onClick={() => jumpToLayer(0)}
                  aria-label="Back to layer 01"
                  className="btn-icon size-8"
                >
                  <RotateCcw size={12} />
                </button>
              )}
            </div>
          </div>

          <div className="h-[2px] w-full overflow-hidden rounded-full bg-line">
            <motion.div
              className="h-full origin-left rounded-full transition-colors duration-300"
              style={{
                scaleX: scrollProgress,
                backgroundColor: activeLayer.accentHex,
              }}
            />
          </div>
        </div>

        {/* 12-Col Pinned Stage: Left Side Layer Tabs + Narrative | Right Borderless Singularity */}
        <div className="grid grid-cols-12 items-start gap-7">
          {/* Left Side Clickable Layer Tabs & Compact Narrative */}
          <div className="col-span-4 space-y-3.5">
            <nav
              aria-label="Skill layers"
              className="divide-y divide-line border-y border-line"
            >
              {SKILL_LAYERS.map((layer, idx) => {
                const isActive = idx === activeLayerIdx;
                return (
                  <button
                    key={layer.id}
                    type="button"
                    onClick={() => jumpToLayer(idx)}
                    className={`group relative flex w-full items-center justify-between py-2 pl-3.5 pr-2 text-left transition-opacity cursor-pointer ${
                      isActive ? "opacity-100" : "opacity-55 hover:opacity-90"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="skills-side-tab"
                        transition={SPRING_TACTILE}
                        aria-hidden="true"
                        className="absolute bottom-1.5 left-0 top-1.5 w-0.5 rounded-full"
                        style={{ backgroundColor: activeLayer.accentHex }}
                      />
                    )}
                    <span className="flex items-center gap-2.5">
                      <span
                        className="font-mono text-[10px] font-semibold"
                        style={{
                          color: isActive
                            ? activeLayer.accentHex
                            : "var(--muted-foreground)",
                        }}
                      >
                        {layer.step}
                      </span>
                      <span className="text-[13px] font-medium text-foreground">
                        {layer.domain}
                      </span>
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {layer.items.length}
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className="min-h-[104px]">
              <motion.div
                key={activeLayer.id}
                initial={{ opacity: 0.35, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.16, ease: EASING_EDITORIAL }}
                className="space-y-1"
              >
                <div
                  className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em]"
                  style={{ color: activeLayer.accentHex }}
                >
                  <span
                    className="size-1.5 rounded-full"
                    style={{ backgroundColor: activeLayer.accentHex }}
                  />
                  <span>
                    Layer {activeLayer.step} · {activeLayer.shortLabel}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold tracking-[-0.015em] text-foreground">
                  {activeLayer.storyTitle}
                </h3>
                <p className="text-xs leading-relaxed text-foreground/80">
                  {activeLayer.storyText}
                </p>
                <p className="font-mono text-[10px] text-muted-foreground">
                  {activeLayer.realExample}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Borderless Black Hole Singularity + Hairline Tool Explainer */}
          <div className="col-span-8 space-y-2">
            <SkillsBlackHoleStage
              scrollScaledRef={scrollScaledRef}
              activeLayerIdx={activeLayerIdx}
              phaseLabel={phaseLabel}
              inspectedTool={inspectedTool}
              onInspectTool={setInspectedTool}
            />

            <div className="flex min-h-8 items-center border-t border-line/60 pt-2">
              <AnimatePresence mode="wait">
                {inspectedTool ? (
                  <motion.div
                    key={inspectedTool.id}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -3 }}
                    transition={{ duration: 0.15, ease: EASING_EDITORIAL }}
                    className="flex items-center gap-2.5 text-xs leading-relaxed text-foreground/85"
                  >
                    <ToolIconGlyph tool={inspectedTool} size={18} />
                    <span>
                      <strong className="font-mono text-foreground">
                        {inspectedTool.name}
                      </strong>{" "}
                      — {inspectedTool.meaning}
                    </span>
                  </motion.div>
                ) : (
                  <motion.p
                    key="hint"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="font-mono text-[11px] text-muted-foreground"
                  >
                    Hover or click any orbiting capsule to see what it does, or move your mouse across the gravity well.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SkillsSection() {
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    getDesktopSnapshot,
    getDesktopServerSnapshot,
  );
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  if (!isDesktop || reducedMotion) {
    return <StaticSkillsFallback reducedMotion={reducedMotion} />;
  }

  return <DesktopBlackHoleSkills />;
}

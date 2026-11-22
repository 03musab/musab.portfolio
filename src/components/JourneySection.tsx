"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import NumberFlow from "@number-flow/react";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Plus,
} from "lucide-react";
import KineticHeading from "./KineticHeading";
import Reveal from "./Reveal";
import { EASING_EDITORIAL, SPRING_TACTILE } from "@/lib/animations";
import { SITE } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

type MilestoneKind = "all" | "work" | "education" | "credential";

interface MilestoneItem {
  id: string;
  chapter: string;
  year: number;
  phase: string;
  period: string;
  title: string;
  org: string;
  kind: Exclude<MilestoneKind, "all">;
  kindLabel: string;
  current?: boolean;
  summary: string;
  bullets?: string[];
  tags?: string[];
  verifyUrl?: string;
}

/**
 * Chronologically ordered forward narrative (2022 -> 2026) so scrolling
 * literally advances time into present production work and Act IV commits.
 */
const MILESTONES: MilestoneItem[] = [
  {
    id: "a-to-z",
    chapter: "01",
    year: 2022,
    phase: "First Role",
    period: "Jul – Sep 2022",
    title: "IT Support & Technical Intern",
    org: "A TO Z COMPUTERS · Onsite",
    kind: "work",
    kindLabel: "Work",
    summary:
      "First leadership role guiding a 5-person support team and solving everyday tech issues faster.",
    bullets: [
      "Led a 5-person volunteer team and raised group productivity by 30%.",
      "Set up clear feedback checklists that cut repeat issues by 25% and sped up fixes by 20%.",
    ],
    tags: ["Team Leadership", "Tech Support", "Workflow Improvements"],
  },
  {
    id: "zscaler-flipkart",
    chapter: "02",
    year: 2024,
    phase: "Online Safety",
    period: "Aug 2024",
    title: "Cybersecurity Basics & Flipkart GRiD 6.0",
    org: "Zscaler · Flipkart / Unstop",
    kind: "credential",
    kindLabel: "Certificate",
    summary:
      "Completed Zscaler's online safety course (2024–2027) and cleared Level 1 of Flipkart's national tech challenge.",
    verifyUrl:
      "https://www.credly.com/badges/340bbf41-97ee-4ae2-89fa-05b641bd10b3/public_url",
  },
  {
    id: "aws-arch",
    chapter: "03",
    year: 2024,
    phase: "Cloud",
    period: "Dec 2024 – Apr 2025",
    title: "AWS Academy — Cloud Design & Basics",
    org: "Amazon Web Services",
    kind: "credential",
    kindLabel: "Certificate",
    summary:
      "Earned two Amazon Web Services certificates focused on hosting apps safely and reliably in the cloud.",
    verifyUrl:
      "https://www.credly.com/badges/438571e8-3806-43b9-b9f7-9fbf30c8679a/print",
  },
  {
    id: "fz-creation",
    chapter: "04",
    year: 2025,
    phase: "Client Website",
    period: "Jan – Feb 2025",
    title: "Freelance Website Developer",
    org: "FZ Creation Bags · Remote",
    kind: "work",
    kindLabel: "Work",
    summary:
      "Designed and launched a mobile-friendly product website where shoppers could browse bags and send enquiries.",
    bullets: [
      "Built clean product catalog pages and an easy customer enquiry form.",
      "Sped up photo loading and created smooth image sliders for phones and laptops.",
    ],
    tags: ["Website Design", "HTML & CSS", "JavaScript", "Bootstrap"],
  },
  {
    id: "wadhwani",
    chapter: "05",
    year: 2025,
    phase: "Teamwork",
    period: "Apr 2025",
    title: "Workplace Communication & Career Skills",
    org: "Wadhwani Foundation",
    kind: "credential",
    kindLabel: "Certificate",
    summary:
      "Completed training focused on clear team communication, collaboration, and workplace problem solving.",
    verifyUrl:
      "https://web.certificate.wfglobal.org/en/certificate?certificateId=6807ddcaeeacc2785e37ee9b",
  },
  {
    id: "oci-cert",
    chapter: "06",
    year: 2025,
    phase: "Cloud Hosting",
    period: "2025",
    title: "Oracle Cloud Certified Professional",
    org: "Oracle Cloud Infrastructure",
    kind: "credential",
    kindLabel: "Certificate",
    summary:
      "Certified in planning and running apps across Oracle Cloud and partner cloud providers.",
    verifyUrl:
      "https://catalog-education.oracle.com/ords/certview/sharebadge?id=7496B34650FE9CF00F5504986C047DB8C91ABE28B7E8699EC404E5A1318AF8FA",
  },
  {
    id: "be-comp",
    chapter: "07",
    year: 2026,
    phase: "College Degree",
    period: "May 2026",
    title: SITE.fullDegree,
    org: `${SITE.institution} · Grade ${SITE.cgpa}`,
    kind: "education",
    kindLabel: "Education",
    summary:
      "Graduating in Computer Engineering with a strong focus on software building, databases, networking, and security.",
    bullets: [
      "Key subjects: Problem Solving, Databases, Computer Networks, Software Design, and Digital Security.",
      "Earlier academics: Diploma in Computer Engineering (83.06%) · 10th Board (69.20%).",
    ],
  },
  {
    id: "luxure",
    chapter: "08",
    year: 2026,
    phase: "Current Role",
    period: "Jun 2026 – Present",
    title: "Full Stack Developer Intern",
    org: "Luxure · Remote",
    kind: "work",
    kindLabel: "Work",
    current: true,
    summary:
      "Building both the online store shoppers see and the behind-the-scenes order, product, and checkout tools.",
    bullets: [
      "Built the customer shopping site including product pages, shopping cart, and checkout.",
      "Created account sign-in, order tracking, and secure connections behind the scenes.",
      "Added an admin dashboard so the team can manage products, discount codes, and orders.",
    ],
    tags: ["React", "Vite", "Node.js", "Express", "Web Connections"],
  },
];

const FILTERS: { id: MilestoneKind; label: string }[] = [
  { id: "all", label: "All" },
  { id: "work", label: "Work" },
  { id: "education", label: "Education" },
  { id: "credential", label: "Certificates" },
];

const CURVE_PATH = "M 18 58 C 125 58, 235 18, 342 18";

function cubicPoint(t: number, p0: number, p1: number, p2: number, p3: number): number {
  const mt = 1 - t;
  return (
    mt * mt * mt * p0 +
    3 * mt * mt * t * p1 +
    3 * mt * t * t * p2 +
    t * t * t * p3
  );
}

function getCurvePointForIndex(index: number, count: number): { x: number; y: number } {
  const t = count <= 1 ? 0.5 : index / (count - 1);
  return {
    x: cubicPoint(t, 18, 125, 235, 342),
    y: cubicPoint(t, 58, 58, 18, 18),
  };
}

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

function MilestoneDossierDetails({
  item,
  compact = false,
}: {
  item: MilestoneItem;
  compact?: boolean;
}) {
  const cgpaValue = Number.parseFloat(SITE.cgpa) || 8.37;

  return (
    <div className={compact ? "space-y-3" : "space-y-4"}>
      <p className="text-sm leading-relaxed text-foreground/85">{item.summary}</p>

      {item.id === "be-comp" && (
        <div className="space-y-1.5 rounded-lg border border-line/80 bg-surface/60 px-3.5 py-2.5">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <span>College Grade</span>
            <span className="font-semibold text-foreground">{cgpaValue.toFixed(2)} / 10</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: cgpaValue / 10 }}
              transition={{ duration: 0.65, ease: EASING_EDITORIAL }}
              style={{ transformOrigin: "left" }}
              className="h-full rounded-full bg-accent"
            />
          </div>
        </div>
      )}

      {item.bullets && (
        <ul className="space-y-2 text-xs leading-relaxed text-muted-foreground sm:text-[13px]">
          {item.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {(item.tags || item.verifyUrl) && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
          {item.tags && (
            <span className="font-mono text-[11px] text-muted-foreground">
              {item.tags.join(" · ")}
            </span>
          )}

          {item.verifyUrl && (
            <a
              href={item.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-link text-xs text-accent"
            >
              <span>View Certificate</span>
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  const [filter, setFilter] = useState<MilestoneKind>("all");
  const [activeId, setActiveId] = useState<string>(MILESTONES[0].id);
  const [mobileOpenId, setMobileOpenId] = useState<string | null>(
    MILESTONES[MILESTONES.length - 1].id,
  );

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const visible =
    filter === "all"
      ? MILESTONES
      : MILESTONES.filter((item) => item.kind === filter);

  const resolvedActiveIndex = Math.max(
    0,
    visible.findIndex((item) => item.id === activeId),
  );
  const activeItem = visible[resolvedActiveIndex] ?? visible[0];

  const handleFilterChange = useCallback(
    (nextFilter: MilestoneKind) => {
      setFilter(nextFilter);
      const nextList =
        nextFilter === "all"
          ? MILESTONES
          : MILESTONES.filter((item) => item.kind === nextFilter);
      if (nextList[0]) {
        setActiveId(nextList[0].id);
        setMobileOpenId(nextList[0].id);
      }
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    },
    [],
  );

  const seekToMilestone = useCallback(
    (id: string, toggleMobile = false) => {
      setActiveId(id);
      setMobileOpenId((prev) => {
        if (toggleMobile && prev === id) return null;
        return id;
      });

      const isDesktop =
        typeof window !== "undefined" && window.innerWidth >= 1024;
      if (!isDesktop && toggleMobile) return;

      const rowEl = trackRef.current?.querySelector<HTMLElement>(
        `[data-milestone-id="${id}"]`,
      );
      if (!rowEl) return;

      if (lenis) {
        lenis.scrollTo(rowEl, { offset: -200, duration: 0.75 });
      } else {
        rowEl.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
          block: "center",
        });
      }
    },
    [lenis, reducedMotion],
  );

  const stepChapter = useCallback(
    (delta: -1 | 1) => {
      const nextIdx = Math.min(
        visible.length - 1,
        Math.max(0, resolvedActiveIndex + delta),
      );
      const target = visible[nextIdx];
      if (target) seekToMilestone(target.id);
    },
    [resolvedActiveIndex, seekToMilestone, visible],
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const elevationPath = section.querySelector<SVGPathElement>("[data-elevation-progress]");
      const elevationBead = section.querySelector<SVGCircleElement>("[data-elevation-bead]");
      const verticalSpine = section.querySelector<HTMLDivElement>("[data-vertical-spine]");
      const rows = gsap.utils.toArray<HTMLElement>("[data-milestone-row]", track);

      if (!elevationPath) return;
      const pathLen = elevationPath.getTotalLength();

      if (reducedMotion) {
        gsap.set(elevationPath, { strokeDasharray: pathLen, strokeDashoffset: 0 });
        if (verticalSpine) gsap.set(verticalSpine, { scaleY: 1 });
        return;
      }

      gsap.set(elevationPath, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
      if (verticalSpine) gsap.set(verticalSpine, { scaleY: 0, transformOrigin: "top" });

      let lastReportedId = "";
      const visibleIds = rows.map((r) => r.dataset.milestoneId ?? "");

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const updateFromProgress = (p: number) => {
          elevationPath.style.strokeDashoffset = String(pathLen * (1 - p));

          if (verticalSpine) {
            verticalSpine.style.transform = `scaleY(${p})`;
          }

          if (elevationBead) {
            const pt = elevationPath.getPointAtLength(pathLen * p);
            elevationBead.setAttribute("cx", String(pt.x));
            elevationBead.setAttribute("cy", String(pt.y));
          }

          let closestId = visibleIds[0] ?? "";
          if (p <= 0.02 && visibleIds[0]) {
            closestId = visibleIds[0];
          } else if (p >= 0.9 && visibleIds.length > 0) {
            closestId = visibleIds[visibleIds.length - 1];
          } else {
            // Shift focus line downward -> upward so early & final rows both center cleanly
            const focusY = window.innerHeight * (0.56 - 0.26 * p);
            let bestDist = Number.POSITIVE_INFINITY;

            for (const row of rows) {
              const rect = row.getBoundingClientRect();
              const center = rect.top + rect.height * 0.45;
              const dist = Math.abs(center - focusY);
              if (dist < bestDist) {
                bestDist = dist;
                closestId = row.dataset.milestoneId ?? closestId;
              }
            }
          }

          if (closestId && closestId !== lastReportedId) {
            lastReportedId = closestId;
            setActiveId(closestId);
          }
        };

        const trigger = ScrollTrigger.create({
          trigger: track,
          start: "top 66%",
          end: "bottom 54%",
          scrub: 0.3,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            updateFromProgress(Math.min(1, Math.max(0, self.progress)));
          },
          onLeave: () => updateFromProgress(1),
          onLeaveBack: () => updateFromProgress(0),
        });

        return () => {
          trigger.kill();
        };
      });

      mm.add("(max-width: 1023px)", () => {
        const trigger = ScrollTrigger.create({
          trigger: track,
          start: "top 75%",
          end: "bottom 55%",
          scrub: 0.35,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = Math.min(1, Math.max(0, self.progress));
            elevationPath.style.strokeDashoffset = String(pathLen * (1 - p));
            if (verticalSpine) {
              verticalSpine.style.transform = `scaleY(${p})`;
            }
          },
        });

        return () => {
          trigger.kill();
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef, dependencies: [filter, reducedMotion] },
  );

  const firstYear = visible[0]?.year ?? 2022;
  const lastYear = visible[visible.length - 1]?.year ?? 2026;

  return (
    <section ref={sectionRef} id="journey" className="scroll-mt-24 overflow-x-clip py-pagebuilder">
      <div className="mx-auto max-w-6xl space-y-12 px-6 lg:px-8">
        {/* Section Header + Category Filter */}
        <Reveal>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
                My Journey (2022 – 2026)
              </p>
              <KineticHeading
                text="Experience, studies & growth"
                accentWords={["growth"]}
                className="font-display text-4xl font-semibold tracking-[-0.025em] text-foreground lg:text-5xl"
              />
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                Follow my path from leading a 5-person support team in 2022 through college and cloud training to building live software today.
              </p>
            </div>

            <div
              role="tablist"
              aria-label="Filter timeline entries"
              className="liquid-glass inline-flex w-fit flex-wrap gap-1 rounded-full p-1"
            >
              {FILTERS.map((tab) => {
                const active = filter === tab.id;
                return (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={active}
                    type="button"
                    onClick={() => handleFilterChange(tab.id)}
                    className={`relative rounded-full px-3.5 py-1.5 font-display text-[12.5px] font-medium tracking-[-0.01em] transition-colors cursor-pointer ${
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="journey-filter-pill"
                        transition={SPRING_TACTILE}
                        className="liquid-glass-fast absolute inset-0 rounded-full"
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Two-Column Scroll-Synchronized Stage */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Sticky Narrative Rail: Year Odometer + Elevation Curve + Milestone Dossier */}
          <div className="lg:col-span-5">
            <div className="space-y-4 lg:sticky lg:top-24">
              {/* Top Telemetry Bar */}
              <div className="flex items-center justify-between border-b border-line pb-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-accent" />
                  Milestone {String(resolvedActiveIndex + 1).padStart(2, "0")} /{" "}
                  {String(visible.length).padStart(2, "0")}
                </span>
                <span className="text-foreground/85">{activeItem?.phase}</span>
              </div>

              {/* Rolling Year Odometer + Step Controls */}
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                    Year
                  </p>
                  <div className="font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-foreground tabular-nums sm:text-6xl">
                    <NumberFlow
                      value={activeItem?.year ?? 2022}
                      format={{ useGrouping: false }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-1.5 pb-1">
                  <button
                    type="button"
                    onClick={() => stepChapter(-1)}
                    disabled={resolvedActiveIndex <= 0}
                    aria-label="Previous timeline milestone"
                    className="btn-icon size-8"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => stepChapter(1)}
                    disabled={resolvedActiveIndex >= visible.length - 1}
                    aria-label="Next timeline milestone"
                    className="btn-icon size-8"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Scrubbed SVG Elevation Trajectory */}
              <div className="space-y-1.5">
                <svg
                  viewBox="0 0 360 76"
                  className="h-auto w-full select-none overflow-visible"
                  role="img"
                  aria-label="Chronological progression curve from 2022 to 2026"
                >
                  {/* Baseline Swiss grid tick */}
                  <line
                    x1={18}
                    y1={64}
                    x2={342}
                    y2={64}
                    stroke="var(--border)"
                    strokeWidth={1}
                    strokeDasharray="2 4"
                  />

                  {/* Muted curve track */}
                  <path
                    d={CURVE_PATH}
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                  />

                  {/* Scroll-scrubbed Cobalt elevation curve */}
                  <path
                    data-elevation-progress
                    d={CURVE_PATH}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth={2.25}
                    strokeLinecap="round"
                  />

                  {/* Clickable chapter nodes positioned mathematically on curve */}
                  {visible.map((item, idx) => {
                    const pt = getCurvePointForIndex(idx, visible.length);
                    const isActive = item.id === activeItem?.id;
                    const isPassed = idx <= resolvedActiveIndex;
                    return (
                      <g
                        key={item.id}
                        onClick={() => seekToMilestone(item.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            seekToMilestone(item.id);
                          }
                        }}
                        aria-label={`Jump to ${item.period}: ${item.title}`}
                        className="cursor-pointer outline-none"
                      >
                        <circle cx={pt.x} cy={pt.y} r={14} fill="transparent" />
                        {isActive && (
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r={8.5}
                            fill="none"
                            stroke="var(--accent)"
                            strokeOpacity={0.4}
                            strokeWidth={1.25}
                          />
                        )}
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isActive ? 4.25 : 3}
                          fill={
                            isActive
                              ? "var(--accent)"
                              : isPassed
                                ? "var(--accent)"
                                : "var(--background)"
                          }
                          stroke={isPassed ? "var(--accent)" : "var(--border)"}
                          strokeWidth={1.75}
                        />
                      </g>
                    );
                  })}

                  {/* Traveling scroll signal bead */}
                  {!reducedMotion && (
                    <circle
                      data-elevation-bead
                      cx={18}
                      cy={58}
                      r={3.5}
                      fill="var(--accent)"
                      className="pointer-events-none"
                    />
                  )}
                </svg>

                <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                  <span>{firstYear} · Start</span>
                  <span>{lastYear} · Present</span>
                </div>
              </div>

              {/* Sticky Active Milestone Dossier (no blocking exit queue during rapid scroll) */}
              {activeItem && (
                <div className="hidden min-h-[210px] border-t border-line pt-5 lg:block">
                  <motion.div
                    key={activeItem.id}
                    initial={reducedMotion ? false : { opacity: 0.35, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.16, ease: EASING_EDITORIAL }}
                    className="space-y-3.5"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em]">
                        <span className="text-accent">{activeItem.kindLabel}</span>
                        <span className="text-muted-foreground">· {activeItem.period}</span>
                        {activeItem.current && (
                          <span className="inline-flex items-center gap-1.5 text-accent">
                            <span className="relative flex size-1.5">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-65" />
                              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                            </span>
                            Current Role
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-foreground">
                        {activeItem.title}
                      </h3>
                      <p className="font-mono text-xs text-muted-foreground">
                        {activeItem.org}
                      </p>
                    </div>

                    <MilestoneDossierDetails item={activeItem} />
                  </motion.div>
                </div>
              )}
            </div>
          </div>

          {/* Right Scrolling Chronology Spine */}
          <div className="lg:col-span-7 lg:pb-14">
            <div ref={trackRef} className="relative">
              {/* Continuous vertical spine & animated Cobalt beam */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-3.5 left-[7px] top-7 w-px bg-line"
              />
              <div
                data-vertical-spine
                aria-hidden="true"
                className="pointer-events-none absolute bottom-3.5 left-[7px] top-7 w-px bg-accent"
              />

            <div className="divide-y divide-line border-t border-line">
              {visible.map((item, idx) => {
                const isActive = activeItem?.id === item.id;
                const isMobileOpen = mobileOpenId === item.id;

                return (
                  <div
                    key={item.id}
                    data-milestone-row
                    data-milestone-id={item.id}
                    className="relative pl-7 sm:pl-9"
                  >
                    {/* Spine node indicator */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-8 flex size-[15px] items-center justify-center rounded-full bg-background"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="journey-spine-beacon"
                          transition={SPRING_TACTILE}
                          className="absolute inset-0 rounded-full border border-accent bg-accent/15"
                        />
                      )}
                      <span
                        className={`relative size-2 rounded-full transition-colors ${
                          isActive
                            ? "bg-accent"
                            : idx < resolvedActiveIndex
                              ? "bg-accent/70"
                              : "bg-border"
                        }`}
                      />
                    </span>

                    <button
                      type="button"
                      onClick={() => seekToMilestone(item.id, true)}
                      className={`group w-full py-6 text-left transition-opacity duration-300 sm:py-8 cursor-pointer ${
                        isActive ? "opacity-100" : "opacity-50 hover:opacity-85"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1.5">
                          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                            <span className={isActive ? "text-accent font-semibold" : ""}>
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <span>· {item.period}</span>
                            <span>· {item.kindLabel}</span>
                            {item.current && (
                              <span className="inline-flex items-center gap-1 text-accent">
                                <span className="size-1.5 rounded-full bg-accent" />
                                Current
                              </span>
                            )}
                          </div>

                          <h3 className="font-display text-xl font-medium tracking-[-0.015em] text-foreground transition-colors group-hover:text-accent sm:text-2xl">
                            {item.title}
                          </h3>

                          <p className="font-mono text-xs text-muted-foreground">
                            {item.org}
                          </p>

                          <p className="max-w-xl pt-1 text-xs leading-relaxed text-foreground/75 sm:text-sm">
                            {item.summary}
                          </p>
                        </div>

                        <span className="mt-1 shrink-0 text-muted-foreground lg:hidden">
                          <motion.span
                            className="inline-block"
                            animate={{ rotate: isMobileOpen ? 45 : 0 }}
                            transition={{ duration: 0.2, ease: EASING_EDITORIAL }}
                          >
                            <Plus size={16} />
                          </motion.span>
                        </span>
                      </div>
                    </button>

                    {/* Mobile / Tablet Inline Disclosure (hidden >= lg where sticky dossier lives) */}
                    <div className="lg:hidden">
                      <AnimatePresence initial={false}>
                        {isMobileOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.26, ease: EASING_EDITORIAL }}
                            onAnimationComplete={() => ScrollTrigger.refresh()}
                            className="overflow-hidden pb-6"
                          >
                            <MilestoneDossierDetails item={item} compact />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Narrative Continuation Bridge into Ongoing Progress Section */}
            <div className="relative border-t border-line pl-7 pt-6 sm:pl-9">
              <span
                aria-hidden="true"
                className="absolute left-[4.5px] top-7 size-2 rounded-full bg-accent"
              />
              <a
                href="#github"
                onClick={(e) => {
                  const target = document.getElementById("github");
                  if (!target) return;
                  e.preventDefault();
                  if (lenis) {
                    lenis.scrollTo(target, { offset: -96 });
                  } else {
                    target.scrollIntoView({
                      behavior: reducedMotion ? "auto" : "smooth",
                    });
                  }
                }}
                className="group inline-flex flex-wrap items-center gap-2.5 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="rounded border border-accent-border bg-accent-soft px-2 py-0.5 text-[10px] font-medium text-accent">
                  Up Next
                </span>
                <span>See my recent project updates and daily progress below</span>
                <ArrowDown
                  size={12}
                  className="text-accent transition-transform group-hover:translate-y-0.5"
                />
              </a>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
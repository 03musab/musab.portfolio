"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  ExternalLink,
  GitBranch,
  Play,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { EASING_EDITORIAL, SPRING_TACTILE } from "@/lib/animations";
import type { GitCommitItem } from "@/lib/github";
import { SITE } from "@/lib/site";

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

function formatCommitDateUtc(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatProjectLabel(repo: string): string {
  const normalized = repo.toLowerCase();
  if (normalized === "ai_job_agent") return "JobSnap";
  if (normalized === "apsit-chat-app") return "TalkSphere";
  if (normalized === "togcode") return "Togcode";
  if (normalized === "resume-builder-main") return "Resume Builder";
  return repo
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
}

function humanizeUpdateText(raw: string): string {
  let cleaned = raw
    .replace(
      /^(?:feat|fix|refactor|chore|docs|style|test|build|ci|perf)(?:\([^)]+\))?:\s*/i,
      "",
    )
    .replace(/client components, server routes, and startup scripts/gi, "app screens, server setup, and startup performance")
    .replace(/full-stack application enhancement/gi, "overall app improvements")
    .replace(/case-insensitive usernames and robust database error handling in auth flow/gi, "username matching and sign-in reliability")
    .replace(/Google OAuth configuration and add comprehensive app tests/gi, "Google sign-in setup and automated quality checks")
    .replace(/navigation drawer/gi, "mobile menu")
    .replace(/responsive menu UI/gi, "mobile menu layout")
    .replace(/UI and functionality/gi, "design and core features")
    .replace(/real-time AI-powered collaboration/gi, "live AI teamwork tools")
    .replace(/real-time/gi, "live")
    .replace(/authentication/gi, "account sign-in")
    .replace(/Implement/g, "Added")
    .replace(/implement/g, "built")
    .trim();

  if (cleaned.endsWith(".")) {
    cleaned = cleaned.slice(0, -1);
  }
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

interface StoryNode {
  id: string;
  stepTag: string;
  projectTag: string;
  date: string;
  title: string;
  message: string;
  linkLabel?: string;
  repoUrl?: string;
  accent: string;
  cx: number;
  cy: number;
}

const STORY_NODES: StoryNode[] = [
  {
    id: "init",
    stepTag: "Step 01",
    projectTag: "First Steps",
    date: "2022",
    title: "Learning the basics & leading a team",
    message:
      "Started creating small websites, practicing problem solving, and guiding a 5-person support team.",
    accent: "var(--accent)",
    cx: 60,
    cy: 90,
  },
  {
    id: "talksphere",
    stepTag: "Step 02",
    projectTag: "TalkSphere",
    date: "2024",
    title: "Private encrypted messaging app",
    message:
      "Built TalkSphere so messages and shared files lock safely inside your browser before leaving your screen.",
    linkLabel: "TalkSphere on GitHub",
    repoUrl: "https://github.com/03musab/APSIT-Chat-app",
    accent: "#14b8a6",
    cx: 245,
    cy: 34,
  },
  {
    id: "togcode",
    stepTag: "Step 03",
    projectTag: "Togcode",
    date: "2025",
    title: "Live shared coding workspace",
    message:
      "Built Togcode so teammates can write code and draw ideas together live in under 50 milliseconds.",
    linkLabel: "Togcode on GitHub",
    repoUrl: "https://github.com/03musab/togcode",
    accent: "#6366f1",
    cx: 430,
    cy: 146,
  },
  {
    id: "jobsnap",
    stepTag: "Step 04",
    projectTag: "JobSnap",
    date: "2026",
    title: "Automatic AI job helper",
    message:
      "Built JobSnap to gather job openings automatically, match your resume, and email daily recommendations.",
    linkLabel: "JobSnap on GitHub",
    repoUrl: "https://github.com/03musab/ai_job_agent",
    accent: "#3b82f6",
    cx: 610,
    cy: 34,
  },
  {
    id: "latest",
    stepTag: "Today",
    projectTag: "Latest Work",
    date: "Now",
    title: "Active apps & online store builds",
    message:
      "Continuously improving Krishi-Sangam, smart AI tools, and full online shopping features at Luxure.",
    linkLabel: "View GitHub Profile",
    repoUrl: SITE.github,
    accent: "var(--accent)",
    cx: 765,
    cy: 90,
  },
];

const BRANCH_PATHS = [
  {
    id: "main-spine",
    d: "M 60 90 L 765 90",
    stroke: "var(--border)",
    width: 2,
  },
  {
    id: "branch-talksphere",
    d: "M 135 90 C 175 90, 195 34, 245 34 C 295 34, 315 90, 355 90",
    stroke: "#14b8a6",
    width: 1.75,
  },
  {
    id: "branch-togcode",
    d: "M 320 90 C 360 90, 380 146, 430 146 C 480 146, 500 90, 540 90",
    stroke: "#6366f1",
    width: 1.75,
  },
  {
    id: "branch-jobsnap",
    d: "M 505 90 C 545 90, 565 34, 610 34 C 655 34, 675 90, 715 90",
    stroke: "#3b82f6",
    width: 1.75,
  },
] as const;

export default function GitCommitStory({
  recentCommits,
}: {
  recentCommits: GitCommitItem[];
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const nodeRefs = useRef<(SVGGElement | null)[]>([]);
  const pulseRef = useRef<SVGCircleElement>(null);
  const manualPinRef = useRef(false);

  const [selectedId, setSelectedId] = useState<string>("latest");
  const [replayCount, setReplayCount] = useState(0);
  const [isReplaying, setIsReplaying] = useState(false);
  const [showAllUpdates, setShowAllUpdates] = useState(false);
  const [hoveredUpdate, setHoveredUpdate] = useState<string | null>(null);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  useGSAP(
    () => {
      if (reducedMotion) return;

      const paths = pathRefs.current.filter((p): p is SVGPathElement => Boolean(p));
      const nodes = nodeRefs.current.filter((n): n is SVGGElement => Boolean(n));
      if (paths.length === 0) return;

      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set(nodes, { scale: 0.45, opacity: 0.15, transformOrigin: "center" });
      if (pulseRef.current) {
        gsap.set(pulseRef.current, { attr: { cx: 60 }, opacity: 0 });
      }

      const isManualReplay = replayCount > 0;
      let lastAutoIdx = -1;

      const stepNodeFocus = (progress: number) => {
        if (manualPinRef.current) return;
        const idx = Math.min(
          STORY_NODES.length - 1,
          Math.max(0, Math.round(progress * (STORY_NODES.length - 1))),
        );
        if (idx !== lastAutoIdx) {
          lastAutoIdx = idx;
          setSelectedId(STORY_NODES[idx].id);
        }
      };

      const tl = gsap.timeline({
        scrollTrigger: !isManualReplay
          ? {
              trigger: wrapRef.current,
              start: "top 82%",
              end: "top 30%",
              scrub: 0.45,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                stepNodeFocus(self.progress);
              },
            }
          : undefined,
        onUpdate: isManualReplay
          ? () => {
              stepNodeFocus(tl.progress());
            }
          : undefined,
        onComplete: isManualReplay
          ? () => {
              setIsReplaying(false);
              setSelectedId("latest");
            }
          : undefined,
      });

      tl.to(paths[0], { strokeDashoffset: 0, duration: 1.25, ease: "none" })
        .to(
          nodes[0],
          { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(2)" },
          0.02,
        )
        .to(
          paths[1],
          { strokeDashoffset: 0, duration: 0.45, ease: "power1.out" },
          0.18,
        )
        .to(
          nodes[1],
          { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(2)" },
          0.35,
        )
        .to(
          paths[2],
          { strokeDashoffset: 0, duration: 0.45, ease: "power1.out" },
          0.46,
        )
        .to(
          nodes[2],
          { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(2)" },
          0.62,
        )
        .to(
          paths[3],
          { strokeDashoffset: 0, duration: 0.45, ease: "power1.out" },
          0.74,
        )
        .to(
          nodes[3],
          { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(2)" },
          0.92,
        )
        .to(
          nodes[4],
          { scale: 1, opacity: 1, duration: 0.28, ease: "back.out(2)" },
          1.12,
        );

      let pulseTween: gsap.core.Tween | null = null;
      if (pulseRef.current) {
        gsap.set(pulseRef.current, { opacity: 0.9 });
        pulseTween = gsap.fromTo(
          pulseRef.current,
          { attr: { cx: 60 } },
          {
            attr: { cx: 765 },
            duration: 3.1,
            repeat: -1,
            ease: "power1.inOut",
            repeatDelay: 0.7,
          },
        );
      }

      return () => {
        tl.kill();
        pulseTween?.kill();
      };
    },
    { scope: wrapRef, dependencies: [replayCount, reducedMotion] },
  );

  const handleSelectNode = useCallback((id: string) => {
    manualPinRef.current = true;
    setSelectedId(id);
  }, []);

  const handleReplay = useCallback(() => {
    manualPinRef.current = false;
    setIsReplaying(true);
    setReplayCount((c) => c + 1);
  }, []);

  const activeNode =
    STORY_NODES.find((n) => n.id === selectedId) ?? STORY_NODES[STORY_NODES.length - 1];

  const displayedUpdates = showAllUpdates
    ? recentCommits
    : recentCommits.slice(0, 5);

  return (
    <div ref={wrapRef} className="space-y-6">
      {/* Header Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <GitBranch size={13} className="text-accent" />
          <span>
            {isReplaying
              ? "Playing project timeline"
              : "How my projects grew · Click any milestone"}
          </span>
        </div>

        <div className="flex min-h-7 items-center">
          {!reducedMotion && (
            <button
              type="button"
              onClick={handleReplay}
              className="btn-secondary btn-compact"
            >
              {isReplaying ? <RotateCcw size={12} /> : <Play size={12} />}
              <span>{isReplaying ? "Replay again" : "Replay story"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Interactive Scrubbed SVG Growth Graph */}
      <div className="overflow-x-auto py-1">
        <svg
          viewBox="0 0 820 180"
          className="h-auto w-full min-w-[580px] select-none"
          role="img"
          aria-label="Interactive timeline showing how projects evolved from 2022 to today"
        >
          {/* Animated branch paths */}
          {BRANCH_PATHS.map((bp, idx) => (
            <path
              key={bp.id}
              ref={(el) => {
                pathRefs.current[idx] = el;
              }}
              d={bp.d}
              fill="none"
              stroke={bp.stroke}
              strokeWidth={bp.width}
              strokeLinecap="round"
            />
          ))}

          {/* Gliding signal pulse along main path */}
          {!reducedMotion && (
            <circle
              ref={pulseRef}
              cx={60}
              cy={90}
              r={3.5}
              fill="var(--accent)"
              style={{ opacity: 0 }}
            />
          )}

          {/* Clickable Project Milestone Nodes */}
          {STORY_NODES.map((node, idx) => {
            const isSelected = node.id === selectedId;
            const labelAbove = node.cy <= 90 && node.id !== "init" && node.id !== "latest";
            const labelY =
              node.id === "togcode"
                ? node.cy + 24
                : labelAbove
                  ? node.cy - 18
                  : node.cy - 20;

            return (
              <g
                key={node.id}
                ref={(el) => {
                  nodeRefs.current[idx] = el;
                }}
                onClick={() => handleSelectNode(node.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelectNode(node.id);
                  }
                }}
                aria-label={`${node.date}: ${node.title}`}
                className="cursor-pointer outline-none"
              >
                <circle cx={node.cx} cy={node.cy} r={22} fill="transparent" />

                {isSelected && (
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r={12}
                    fill="none"
                    stroke={node.accent}
                    strokeWidth={1.25}
                    strokeOpacity={0.55}
                  />
                )}

                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r={isSelected ? 6.5 : 5}
                  fill={isSelected ? node.accent : "var(--background)"}
                  stroke={node.accent}
                  strokeWidth={2.2}
                />

                <text
                  x={node.cx}
                  y={labelY}
                  textAnchor="middle"
                  className="fill-foreground font-mono"
                  style={{
                    fontSize: "9.5px",
                    fontWeight: isSelected ? 700 : 500,
                    opacity: isSelected ? 1 : 0.72,
                  }}
                >
                  {node.projectTag}
                </text>

                <text
                  x={node.cx}
                  y={node.id === "togcode" ? node.cy - 14 : node.cy + 22}
                  textAnchor="middle"
                  className="fill-muted-foreground font-mono"
                  style={{ fontSize: "8.5px" }}
                >
                  {node.date}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Inline Milestone Inspector Strip */}
      <div className="border-y border-line py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNode.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: EASING_EDITORIAL }}
            className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                <span
                  className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold text-white"
                  style={{ backgroundColor: activeNode.accent }}
                >
                  <Sparkles size={10} />
                  {activeNode.stepTag} · {activeNode.date}
                </span>
                <span className="font-medium text-foreground">{activeNode.title}</span>
              </div>
              <p className="max-w-2xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {activeNode.message}
              </p>
            </div>

            {activeNode.repoUrl && (
              <a
                href={activeNode.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-link shrink-0"
              >
                <span>{activeNode.linkLabel}</span>
                <ExternalLink size={12} />
              </a>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Live Project Improvements Feed (Plain-English Updates) */}
      {recentCommits.length > 0 && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>Recent Project Improvements</span>
            <span>{recentCommits.length} Latest Updates</span>
          </div>

          <div
            onMouseLeave={() => setHoveredUpdate(null)}
            className="divide-y divide-line border-y border-line"
          >
            {displayedUpdates.map((commit, idx) => {
              const rowKey = `${commit.repo}-${commit.sha}`;
              const isHovered = hoveredUpdate === rowKey;
              return (
                <a
                  key={rowKey}
                  href={commit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredUpdate(rowKey)}
                  className="group relative grid grid-cols-12 items-center gap-3 py-3 sm:px-3"
                >
                  {isHovered && (
                    <motion.span
                      layoutId="commit-row-glide"
                      transition={SPRING_TACTILE}
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-lg bg-surface/80"
                    />
                  )}

                  <span className="relative z-10 col-span-12 flex items-center gap-2.5 sm:col-span-9">
                    <span
                      className={`size-1.5 shrink-0 rounded-full ${
                        idx === 0 ? "bg-accent" : "bg-border group-hover:bg-accent"
                      }`}
                    />
                    <span className="shrink-0 rounded border border-line bg-surface px-2 py-0.5 font-mono text-[10px] text-accent">
                      {formatProjectLabel(commit.repo)}
                    </span>
                    <span className="truncate text-xs text-foreground/90 transition-colors group-hover:text-foreground sm:text-[13px]">
                      {humanizeUpdateText(commit.message)}
                    </span>
                  </span>

                  <span className="relative z-10 col-span-12 flex items-center justify-between gap-3 pl-4 font-mono text-[10px] text-muted-foreground sm:col-span-3 sm:justify-end sm:pl-0">
                    <span>{formatCommitDateUtc(commit.date)}</span>
                    <ArrowUpRight
                      size={12}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                    />
                  </span>
                </a>
              );
            })}
          </div>

          {recentCommits.length > 5 && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowAllUpdates((prev) => !prev);
                  requestAnimationFrame(() => ScrollTrigger.refresh());
                }}
                className="font-sans text-[12.5px] font-medium text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground cursor-pointer"
              >
                {showAllUpdates
                  ? "Show latest 5 updates"
                  : `View all ${recentCommits.length} updates`}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
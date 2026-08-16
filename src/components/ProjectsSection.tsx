"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { ExternalLink } from "lucide-react";
import AnimatedArrowBox from "./AnimatedArrowBox";
import Reveal from "./Reveal";
import { GithubIcon } from "./icons";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import { SITE } from "@/lib/site";

/** Screenshot for each project, keyed by project id (public/assets). */
const PROJECT_IMAGES: Record<string, string> = {
  jobsnap: "/assets/jobsnap.jpeg",
  togcode: "/assets/togcode.jpeg",
  talksphere: "/assets/talksphere.jpeg",
};

export interface ProjectTheme {
  primaryAccent: string;
  secondaryAccent: string;
  glowRgb: string;
  bgWashGradient: string;
  headingGradient: string;
  borderGlow: string;
  tagClass: string;
}

export interface Project {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  tech: string[];
  gradient: string;
  github: string;
  live: string;
  accent: string;
  glyph: string;
  highlights: string[];
  theme: ProjectTheme;
}

export const PROJECTS: Project[] = [
  {
    id: "jobsnap",
    name: "JobSnap",
    subtitle: "Job Search Automation Platform",
    tag: "AI & Automation Platform",
    tech: ["Python", "Flask", "Celery", "Redis", "Selenium", "SQLite"],
    gradient:
      "bg-[linear-gradient(145deg,#1e3a8a_0%,#3b82f6_45%,#93c5fd_78%,#dbeafe_100%)]",
    github: "https://github.com/03musab/ai_job_agent",
    live: "https://aijobsnap.vercel.app/",
    accent: "#3b82f6",
    glyph: "AI",
    highlights: [
      "Multi-platform job aggregation with AI-powered relevance scoring & background processing using Celery/Redis",
      "Complete application pipeline management with email reporting, Excel exports, & experimental ATS form auto-filling",
      "User authentication with saved search profiles, resume parsing, & personalized job matching algorithms"
    ],
    theme: {
      primaryAccent: "#3b82f6",
      secondaryAccent: "#38bdf8",
      glowRgb: "59, 130, 246",
      bgWashGradient:
        "radial-gradient(ellipse 140% 120% at 50% 50%, rgba(59, 130, 246, 0.30) 0%, rgba(14, 165, 233, 0.15) 55%, transparent 100%)",
      headingGradient: "linear-gradient(135deg, #60a5fa 0%, #38bdf8 50%, #93c5fd 100%)",
      borderGlow: "rgba(59, 130, 246, 0.45)",
      tagClass: "border-blue-500/30 text-blue-400 bg-blue-500/10",
    },
  },
  {
    id: "togcode",
    name: "Togcode",
    subtitle: "Real-Time Collaborative Coding Platform",
    tag: "Real-Time Collaboration",
    tech: ["React", "Firebase", "WebSocket", "Context API", "Monaco Editor"],
    gradient:
      "bg-[linear-gradient(145deg,#312e81_0%,#7c3aed_45%,#c4b5fd_78%,#ede9fe_100%)]",
    github: "https://github.com/03musab/togcode",
    live: "https://togcode.vercel.app",
    accent: "#8b5cf6",
    glyph: "</>",
    highlights: [
      "Live multi-user code collaboration with sub-50ms real-time sync via Firebase and WebSocket architecture",
      "Global dark/light theme system via React Context API; full Settings page with token-based CSS design system",
      "Bidirectional Living Blueprint canvas (visual project planner) with XSS sanitization, rate limiting, & WebP compression",
      "Comprehensive UI components: Chat Panel, Join Page, AUTH Page with session management"
    ],
    theme: {
      primaryAccent: "#8b5cf6",
      secondaryAccent: "#c084fc",
      glowRgb: "139, 92, 246",
      bgWashGradient:
        "radial-gradient(ellipse 140% 120% at 50% 50%, rgba(139, 92, 246, 0.30) 0%, rgba(192, 38, 211, 0.15) 55%, transparent 100%)",
      headingGradient: "linear-gradient(135deg, #a78bfa 0%, #c084fc 50%, #e879f9 100%)",
      borderGlow: "rgba(139, 92, 246, 0.45)",
      tagClass: "border-purple-500/30 text-purple-400 bg-purple-500/10",
    },
  },
  {
    id: "talksphere",
    name: "TalkSphere",
    subtitle: "Encrypted Chat Application",
    tag: "Security Engineering",
    tech: ["React", "Node.js", "Stream Chat", "CryptoJS"],
    gradient:
      "bg-[linear-gradient(145deg,#831843_0%,#DB2777_45%,#f472b6_78%,#fbcfe8_100%)]",
    github: "https://github.com/03musab/APSIT-Chat-app",
    live: "https://apsit-chat-frontend.onrender.com/",
    accent: "#db2777",
    glyph: "🔒",
    highlights: [
      "End-to-end encryption with dedicated 'encrypted Data' payload sealing",
      "File encryption/decryption + real-time tamper detection",
      "DM toggle, security console, & bug resolution in file decryption"
    ],
    theme: {
      primaryAccent: "#ec4899",
      secondaryAccent: "#10b981",
      glowRgb: "236, 72, 153",
      bgWashGradient:
        "radial-gradient(ellipse 140% 120% at 50% 50%, rgba(236, 72, 153, 0.30) 0%, rgba(16, 185, 129, 0.16) 55%, transparent 100%)",
      headingGradient: "linear-gradient(135deg, #f472b6 0%, #fb7185 50%, #34d399 100%)",
      borderGlow: "rgba(236, 72, 153, 0.45)",
      tagClass: "border-pink-500/30 text-pink-400 bg-pink-500/10",
    },
  },
];

/** Parse a #rrggbb hex color into an [r, g, b] tuple. */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

/** Clamped smoothstep easing for the colour morph windows. */
function smoothstep(t: number): number {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
}

/**
 * Build the section-wide ambient gradient for a given scroll progress.
 *
 * The colour follows the active project: each project's accent is dominant
 * while that project is the active one, and morphs to the next project's
 * accent only in a short window around the switch (the same measured
 * breakpoints that drive the preview). The atmosphere therefore never leads
 * or lags the content — it transitions gradually exactly when the projects do.
 */
function buildAmbientWash(p: number, bps: number[], projects: Project[]): string {
  const n = projects.length;
  const HALF_WINDOW = 0.1; // morph window half-width, in progress units

  // Each project's weight is a trapezoid: 0 until its own breakpoint, 1 while
  // it is the active project, 0 again once the next breakpoint passes. The
  // ramps are 2·HALF_WINDOW wide and clamped to [0, 1], so the environment
  // morphs gradually around the exact moment the preview switches — and always
  // completes by the end of the scroll, even when the last breakpoint is 1.
  const weights = new Array<number>(n);
  for (let i = 0; i < n; i++) {
    let up = 1;
    let down = 1;
    if (i > 0) {
      const a = Math.max(0, bps[i] - HALF_WINDOW);
      const b = Math.min(1, bps[i] + HALF_WINDOW);
      up = smoothstep((p - a) / Math.max(0.0001, b - a));
    }
    if (i < n - 1) {
      const a = Math.max(0, bps[i + 1] - HALF_WINDOW);
      const b = Math.min(1, bps[i + 1] + HALF_WINDOW);
      down = 1 - smoothstep((p - a) / Math.max(0.0001, b - a));
    }
    weights[i] = up * down;
  }

  // Guard against any overlapping windows leaving the sum off.
  const sum = weights.reduce((acc, w) => acc + w, 0) || 1;
  for (let i = 0; i < n; i++) weights[i] /= sum;

  const prim = [0, 0, 0];
  const sec = [0, 0, 0];
  projects.forEach((project, i) => {
    const p1 = hexToRgb(project.theme.primaryAccent);
    const p2 = hexToRgb(project.theme.secondaryAccent);
    for (let c = 0; c < 3; c++) {
      prim[c] += p1[c] * weights[i];
      sec[c] += p2[c] * weights[i];
    }
  });

  const P = prim.map((v) => Math.round(v)).join(", ");
  const S = sec.map((v) => Math.round(v)).join(", ");
  return `radial-gradient(ellipse 75% 55% at 50% 52%, rgba(${P}, 0.30) 0%, rgba(${S}, 0.13) 42%, transparent 78%)`;
}

/**
 * Large, heavily feathered atmospheric layer behind the whole Projects
 * section. It sits outside the scroll container (so it never scrolls or clips
 * against the content) and interpolates its colour from the active project.
 */
function ProjectAmbientWash({
  progress,
  breakpoints,
  projects,
}: {
  progress: MotionValue<number>;
  breakpoints: number[] | null;
  projects: Project[];
}) {
  // Keep the latest breakpoints visible to the scroll-driven transformer.
  const bpsRef = useRef<number[] | null>(breakpoints);
  bpsRef.current = breakpoints;

  const background = useTransform(progress, (p) => {
    const bps = bpsRef.current ?? projects.map((_, i) => (i + 0.5) / projects.length);
    return buildAmbientWash(p, bps, projects);
  });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-16 z-0"
      style={{ background, filter: "blur(32px)" }}
    />
  );
}

export default function ProjectsSection() {
  const [progress, setProgress] = useState<MotionValue<number> | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [breakpoints, setBreakpoints] = useState<number[] | null>(null);

  const content = PROJECTS.map((project) => ({
    title: project.name,
    subtitle: project.subtitle,
    tag: project.tag,
    description: `${project.subtitle}. ${project.highlights.join(" ")}`,
    accentColor: project.theme.primaryAccent,
    content: (
      <div className="relative h-full w-full">
        <Image
          src={PROJECT_IMAGES[project.id]}
          alt={`${project.name} screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, 384px"
          loading="eager"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Soft scrim so the labels stay readable over the screenshot */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        
        {/* GitHub & live links with dynamic project accent hover state */}
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            title={`${project.name} source on GitHub`}
            className="grid size-9 place-items-center rounded-full border border-white/25 bg-black/50 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
            style={{
              borderColor: `${project.theme.primaryAccent}80`,
              boxShadow: `0 0 15px ${project.theme.primaryAccent}35`,
            }}
          >
            <GithubIcon size={14} />
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            title={`Open ${project.name} live`}
            className="grid size-9 place-items-center rounded-full border border-white/25 bg-black/50 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20"
            style={{
              borderColor: `${project.theme.primaryAccent}80`,
              boxShadow: `0 0 15px ${project.theme.primaryAccent}35`,
            }}
          >
            <ExternalLink size={14} />
          </a>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/90">
              {project.name}
            </span>
            <span
              className="rounded-full px-2 py-0.5 font-mono text-[9px] font-semibold text-white"
              style={{ backgroundColor: `${project.theme.primaryAccent}90` }}
            >
              {project.glyph}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md bg-black/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-white/90 border border-white/10"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <section id="projects" className="relative scroll-mt-24">
      {/* Section-wide ambient atmosphere — morphs with the active project */}
      {progress ? (
        <ProjectAmbientWash progress={progress} breakpoints={breakpoints} projects={PROJECTS} />
      ) : null}

      <div className="relative z-10 mx-auto max-w-6xl space-y-10 px-6 py-pagebuilder lg:px-8">
        <Reveal>
          <div className="space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
              Featured Projects
            </p>
            <h2 className="heading-glow font-display text-4xl tracking-tight lg:text-6xl">
              Production-grade <em className="text-colorfull animate-gradient-x italic">applications</em>
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-foreground/60">
              Built from scratch with focus on real-time sync, AI automation, and cryptographic security.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <StickyScroll
            content={content}
            onProgress={setProgress}
            onActiveCardChange={setActiveCardIndex}
            onBreakpointsChange={setBreakpoints}
          />
        </Reveal>

        <Reveal>
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group mx-auto flex w-fit items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-foreground/70 transition-colors hover:text-foreground"
          >
            <span>Explore all repositories on GitHub</span>
            <AnimatedArrowBox direction="up-right" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}




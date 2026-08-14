import { ArrowUpRight, ExternalLink } from "lucide-react";
import AnimatedArrowBox from "./AnimatedArrowBox";
import Reveal from "./Reveal";
import { GithubIcon } from "./icons";
import { SITE } from "@/lib/site";

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
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-foreground/30 lg:rounded-3xl lg:p-8">
      {/* Top hairline gradient glow */}
      <div
        className="absolute inset-x-0 top-0 h-1 opacity-80"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
        }}
      />

      <div>
        {/* Header bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span
            className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] font-semibold"
            style={{
              color: project.accent,
              backgroundColor: `${project.accent}15`,
              border: `1px solid ${project.accent}30`,
            }}
          >
            {project.tag}
          </span>
          <div className="flex items-center gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-8 place-items-center rounded-full border border-line bg-background/50 text-foreground/70 transition-colors hover:border-foreground hover:text-foreground"
              title="View Source Code"
            >
              <GithubIcon size={14} />
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="grid size-8 place-items-center rounded-full border border-line bg-background/50 text-foreground/70 transition-colors hover:border-foreground hover:text-foreground"
              title="Visit Live Application"
            >
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Title */}
        <div className="mt-5 space-y-1">
          <h3 className="font-display text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
            {project.name}
          </h3>
          <p className="font-mono text-xs text-foreground/60">
            {project.subtitle}
          </p>
        </div>

        {/* Highlights List */}
        <ul className="mt-5 space-y-2 text-xs leading-relaxed text-foreground/75 lg:text-sm">
          {project.highlights.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-foreground/40" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Chips Footer */}
      <div className="mt-6 border-t border-line/60 pt-4">
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-line/50 bg-background/60 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wide text-foreground/70"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-24 space-y-10">
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.id} delay={i * 0.08}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

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
    </section>
  );
}

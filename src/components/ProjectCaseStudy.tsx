import React from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "./icons";

interface Project {
  id: string;
  tag: string;
  tagColor: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  outcomes: { value: string; label: string }[];
  accentColor: string;
  number: string;
  highlights: string[];
}

const PROJECTS: Project[] = [
  {
    id: "jobsnap",
    tag: "AI & Automation Platform",
    tagColor: "text-blue-400 bg-blue-500/8 border-blue-500/20",
    title: "JobSnap",
    subtitle: "Job Search Automation Platform",
    description:
      "Multi-platform job aggregation with AI-powered relevance scoring, automated background processing using Celery/Redis, complete pipeline management, and ATS form auto-filling.",
    tech: ["Python", "Flask", "Celery", "Redis", "Selenium", "SQLite"],
    github: "https://github.com/03musab/ai_job_agent",
    live: "https://aijobsnap.vercel.app/",
    outcomes: [
      { value: "AI Scoring", label: "Relevance algorithm" },
      { value: "Celery/Redis", label: "Background Queue" },
      { value: "ATS Parsing", label: "Auto-fill engine" },
    ],
    accentColor: "rgba(59,130,246,0.06)",
    number: "01",
    highlights: [
      "Multi-platform job aggregation with AI relevance scoring using Celery & Redis background workers",
      "Complete application pipeline management with email reporting, Excel exports, and experimental ATS form auto-filling",
      "User authentication with saved search profiles, resume parsing, and personalized job matching algorithms"
    ],
  },
  {
    id: "togcode",
    tag: "Real-Time Collaboration",
    tagColor: "text-purple-400 bg-purple-500/8 border-purple-500/20",
    title: "Togcode",
    subtitle: "Real-Time Collaborative Coding Platform",
    description:
      "Live multi-user code collaboration with real-time sync via Firebase and WebSocket architecture. Features a Living Blueprint canvas, token-based CSS design system, XSS sanitization, and WebP compression.",
    tech: ["React", "Firebase", "WebSocket", "Context API", "Monaco Editor"],
    github: "https://github.com/03musab/togcode",
    live: "https://togcode.vercel.app",
    outcomes: [
      { value: "<50ms", label: "Real-time sync" },
      { value: "WebSocket", label: "Bi-directional engine" },
      { value: "Living Blueprint", label: "Visual project planner" },
    ],
    accentColor: "rgba(168,85,247,0.06)",
    number: "02",
    highlights: [
      "Live multi-user code collaboration with real-time sync via Firebase & WebSocket architecture",
      "Global dark/light theme system via React Context API; full Settings page with token-based CSS design system",
      "Bidirectional Living Blueprint canvas (visual project planner) with XSS sanitization, rate limiting, and WebP image compression",
      "Comprehensive UI components: Chat Panel, Join Page, AUTH Page with session management"
    ],
  },
  {
    id: "talksphere",
    tag: "Security Engineering",
    tagColor: "text-emerald-400 bg-emerald-500/8 border-emerald-500/20",
    title: "TalkSphere",
    subtitle: "Encrypted Chat Application",
    description:
      "End-to-end encrypted messaging application with dedicated payload sealing, file encryption/decryption, tamper detection, security console, and DM toggling.",
    tech: ["React", "Node.js", "Stream Chat", "CryptoJS"],
    github: "https://github.com/03musab/APSIT-Chat-app",
    live: "https://apsit-chat-frontend.onrender.com/",
    outcomes: [
      { value: "E2E Encrypted", label: "Sealed payload data" },
      { value: "Tamper Alert", label: "Integrity check" },
      { value: "CryptoJS", label: "AES-GCM encryption" },
    ],
    accentColor: "rgba(16,185,129,0.06)",
    number: "03",
    highlights: [
      "End-to-end encryption with 'encrypted Data' field sealing",
      "File encryption/decryption + real-time tamper detection",
      "DM toggle, security console, and bug resolution in file decryption"
    ],
  },
];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`group grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[--border] rounded-2xl overflow-hidden hover:border-[--border-hover] transition-all duration-300`}
      style={{ background: `linear-gradient(135deg, ${project.accentColor} 0%, transparent 50%)` }}
    >
      {/* Content */}
      <div className={`lg:col-span-7 p-7 sm:p-10 flex flex-col gap-6 ${!isEven ? "lg:order-2" : ""}`}>
        {/* Tag + number */}
        <div className="flex items-center justify-between">
          <span className={`pill border ${project.tagColor}`}>
            {project.tag}
          </span>
          <span className="text-4xl font-serif text-[--text-3]/30 select-none leading-none">
            {project.number}
          </span>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h3 className="text-2xl sm:text-3xl font-serif text-[--text-1] leading-snug">
            {project.title} <span className="text-sm font-sans text-foreground/50">— {project.subtitle}</span>
          </h3>
          <p className="text-[--text-2] leading-relaxed text-sm pt-2">
            {project.description}
          </p>
        </div>

        {/* Highlights */}
        <ul className="space-y-1.5 text-xs text-foreground/75 font-sans">
          {project.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1 size-1 rounded-full bg-foreground/40 shrink-0" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs font-medium text-[--text-3] bg-[--surface] border border-[--border] px-2.5 py-1 rounded-md"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-1">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[--text-1] hover:text-white link-underline transition-colors"
          >
            View Live <ArrowUpRight size={14} />
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[--text-2] hover:text-[--text-1] transition-colors"
          >
            <GithubIcon size={15} />
            Source
          </a>
        </div>
      </div>

      {/* Highlights / Outcomes panel */}
      <div
        className={`lg:col-span-5 border-t lg:border-t-0 ${
          isEven ? "lg:border-l" : "lg:border-r lg:order-1"
        } border-[--border] p-7 sm:p-10 flex flex-col justify-center gap-6`}
      >
        <p className="text-xs uppercase tracking-widest text-[--text-3] font-medium">
          Key Architecture
        </p>
        <div className="space-y-6">
          {project.outcomes.map((o) => (
            <div key={o.label} className="space-y-1">
              <p className="text-2xl font-serif text-[--text-1]">{o.value}</p>
              <p className="text-xs text-[--text-3] font-medium">{o.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectCaseStudies() {
  return (
    <div className="space-y-6">
      {PROJECTS.map((project, index) => (
        <ProjectRow key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}

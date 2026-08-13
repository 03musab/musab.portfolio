import { ArrowUpRight } from "lucide-react";
import AnimatedArrowBox from "./AnimatedArrowBox";
import Reveal from "./Reveal";
import { SITE } from "@/lib/site";

interface Project {
  id: string;
  name: string;
  tag: string;
  date: string;
  description: string;
  tech: string[];
  gradient: string;
  github: string;
  live: string;
  accent: string;
  glyph: string;
}

const PROJECTS: Project[] = [
  {
    id: "jobsnap",
    name: "JobSnap",
    tag: "Flagship AI Product",
    date: "2024 — 2025",
    description:
      "AI job aggregator that parses CVs, extracts skill matrices, and semantically scores openings against developer roles.",
    tech: ["LlamaIndex", "Node.js", "Flask", "MongoDB"],
    gradient:
      "bg-[linear-gradient(145deg,#1e3a8a_0%,#3b82f6_45%,#93c5fd_78%,#dbeafe_100%)]",
    github: "https://github.com/03musab/ai_job_agent",
    live: "https://aijobsnap.vercel.app/",
    accent: "#3b82f6",
    glyph: "job",
  },
  {
    id: "togcode",
    name: "Togcode",
    tag: "Real-Time Collaboration",
    date: "2024 — 2025",
    description:
      "Real-time collaborative editor where remote users code together over encrypted WebSocket tunnels with sub-50ms sync.",
    tech: ["Socket.io", "Monaco", "React", "Node.js"],
    gradient:
      "bg-[linear-gradient(145deg,#312e81_0%,#7c3aed_45%,#c4b5fd_78%,#ede9fe_100%)]",
    github: "https://github.com/03musab/togcode",
    live: "https://togcode.vercel.app",
    accent: "#8b5cf6",
    glyph: "</>",
  },
  {
    id: "talksphere",
    name: "TalkSphere",
    tag: "Security Engineering",
    date: "2024 — 2025",
    description:
      "Chat gateway with strict end-to-end encryption — AES-GCM payload sealing, ephemeral ECDH keys, tamper detection on every packet.",
    tech: ["CryptoAPI", "AES-GCM", "ECDH", "React"],
    gradient:
      "bg-[linear-gradient(145deg,#831843_0%,#DB2777_45%,#f472b6_78%,#fbcfe8_100%)]",
    github: "https://github.com/03musab/APSIT-Chat-app",
    live: "https://apsit-chat-frontend.onrender.com/",
    accent: "#db2777",
    glyph: "🔒",
  },
];

function BrowserMock({ accent, glyph, className = "" }: { accent: string; glyph: string; className?: string }) {
  return (
    <div
      className={`pointer-events-none w-44 sm:w-52 overflow-hidden rounded-xl border-2 border-white/60 bg-white/95 shadow-[0_4px_20px_rgba(0,0,0,0.35),0_15px_50px_-5px_rgba(0,0,0,0.5)] backdrop-blur transition-[transform,filter] duration-500 ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-neutral-200 px-3 py-2">
        <span className="size-2 rounded-full bg-red-400" />
        <span className="size-2 rounded-full bg-amber-400" />
        <span className="size-2 rounded-full bg-green-400" />
        <span className="ml-2 h-3 flex-1 rounded-full bg-neutral-200" />
      </div>
      <div className="space-y-2 p-3">
        <div
          className="h-1.5 w-2/3 rounded-full"
          style={{ backgroundColor: accent }}
        />
        <div className="flex items-center gap-2">
          <div
            className="grid size-8 place-items-center rounded-lg text-white text-xs font-mono"
            style={{ backgroundColor: accent }}
          >
            {glyph}
          </div>
          <div className="space-y-1 flex-1">
            <div className="h-1.5 w-full rounded-full bg-neutral-300" />
            <div className="h-1.5 w-2/3 rounded-full bg-neutral-200" />
          </div>
        </div>
        <div className="h-1.5 w-full rounded-full bg-neutral-200" />
        <div className="h-1.5 w-5/6 rounded-full bg-neutral-200" />
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.live}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-2xl border border-line bg-surface p-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-transform duration-300 ease-in-out hover:-translate-y-2 lg:rounded-3xl lg:p-2 dark:bg-white/5"
    >
      {/* top hairline streak */}
      <div className="absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-foreground/70 to-transparent opacity-60" />

      {/* gradient art + mock screens */}
      <div className="relative aspect-[16/11] overflow-hidden rounded-[10px] lg:rounded-[16px]">
        <div className={`absolute inset-0 ${project.gradient} transition-[transform,filter] duration-500 group-hover:scale-105 lg:group-hover:brightness-110 lg:group-hover:saturate-125`} />
        {/* faint grid texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.25)_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />

        {/* description row */}
        <div className="relative z-10 flex items-start justify-between gap-3 p-4 text-white lg:p-6">
          <div className="space-y-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/80">
              {project.tag}
            </p>
            <h3 className="font-display text-2xl leading-none tracking-tight lg:text-3xl">
              {project.name}
            </h3>
          </div>
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
            <ArrowUpRight size={16} />
          </span>
        </div>

        <p className="relative z-10 hidden px-4 pb-2 text-xs leading-relaxed text-white/90 lg:block lg:px-6 lg:max-w-[26rem]">
          {project.description}
        </p>

        {/* overlapping screens, parallax on hover */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center lg:bottom-6">
          <div className="relative flex">
            <BrowserMock
              accent={project.accent}
              glyph={project.glyph}
              className="z-10 rotate-[-3deg] scale-[1.02] translate-x-4 translate-y-[2%] transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-[4%] group-hover:rotate-[-6deg]"
            />
            <BrowserMock
              accent={project.accent}
              glyph={project.glyph}
              className="-translate-x-4 rotate-[3deg] scale-95 translate-y-[4%] brightness-90 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-[2%] group-hover:rotate-[6deg]"
            />
          </div>
        </div>
      </div>

      {/* footer: date badge + tech chips */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-2 py-3 lg:px-3">
        <span className="rounded-full bg-muted px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/70">
          {project.date}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md bg-foreground/5 px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-wide text-foreground/70"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

export default function ProjectsSection() {
  return (
    <section id="work" className="scroll-mt-24 space-y-pagebuilder">
      <Reveal>
        <div className="space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
            Case Studies
          </p>
          <h2 className="heading-glow font-display text-4xl tracking-tight lg:text-6xl">
            Curated <em className="text-colorfull animate-gradient-x italic">work</em>
          </h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-pagebuilder">
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
          <span>See more projects</span>
          <AnimatedArrowBox direction="up-right" />
        </a>
      </Reveal>
    </section>
  );
}

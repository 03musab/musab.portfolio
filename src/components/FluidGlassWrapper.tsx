"use client";

import dynamic from "next/dynamic";
import Reveal from "./Reveal";

const FluidGlass = dynamic(() => import("./FluidGlass"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[500px] w-full items-center justify-center rounded-3xl border border-line bg-surface p-8 text-center font-mono text-xs text-foreground/50">
      Loading Interactive 3D Glass Lens…
    </div>
  ),
});

const STATS = [
  { value: "8.37", label: "CGPA / 10", suffix: "" },
  { value: "50", label: "ms Collab Latency", suffix: "<" },
  { value: "3+", label: "Cloud Certs", suffix: "" },
  { value: "3", label: "Live Projects", suffix: "" },
];

const PROJECTS = [
  {
    tag: "AI Automation",
    name: "JobSnap",
    desc: "Autonomous job-hunting pipeline. Scrapes 1,000s of listings via Selenium, scores them with AI, and fires Celery + Redis workers to auto-apply — while you sleep.",
    stack: ["Python", "Flask", "Celery", "Redis", "Selenium", "SQLite"],
    color: "#f59e0b",
  },
  {
    tag: "Real-time Systems",
    name: "Togcode",
    desc: "Sub-50 ms collaborative IDE in the browser. Operational-transform sync engine over WebSockets, Monaco Editor with multi-cursor, and instant Firebase auth.",
    stack: ["React", "Firebase", "WebSocket", "Context API", "Monaco Editor"],
    color: "#6366f1",
  },
  {
    tag: "Secure Comms",
    name: "TalkSphere",
    desc: "End-to-end encrypted group chat. Every message wrapped in AES-GCM before hitting the wire, Stream Chat for delivery, and a zero-knowledge key handshake.",
    stack: ["React", "Node.js", "Stream Chat", "CryptoJS", "AES-GCM"],
    color: "#10b981",
  },
];

const PILLARS = [
  { icon: "⚙️", label: "Backend Systems", detail: "Flask · Node.js · REST APIs · Celery task queues" },
  { icon: "🖥️", label: "Frontend Craft", detail: "React · Next.js · Monaco Editor · WebSockets" },
  { icon: "☁️", label: "Cloud & DevOps", detail: "AWS (Foundations + Architecting) · Oracle OCI · Zscaler ZTNA" },
  { icon: "🔒", label: "Security", detail: "AES-GCM encryption · Zero-knowledge key handshake · ZTNA" },
];

export default function FluidGlassWrapper() {
  return (
    <section id="lens" className="scroll-mt-24 space-y-10">
      {/* ── Section Header ── */}
      <Reveal>
        <div className="space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
            Engineering &amp; Innovation
          </p>
          <h2 className="heading-glow font-display text-4xl tracking-tight lg:text-5xl">
            Software engineering through{" "}
            <em className="text-colorfull animate-gradient-x italic">a new lens</em>
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-foreground/60">
            B.E. Computer Engineering &apos;26 · CGPA 8.37/10 · Mumbai, India.
            I build systems that{" "}
            <span className="font-semibold text-foreground">automate work</span>,{" "}
            <span className="font-semibold text-foreground">sync in real-time</span>, and{" "}
            <span className="font-semibold text-foreground">protect data at rest and in transit</span>.
          </p>
        </div>
      </Reveal>

      {/* ── Headline Stats ── */}
      <Reveal delay={0.05}>
        <div className="grid grid-cols-2 gap-px rounded-2xl overflow-hidden border border-line sm:grid-cols-4">
          {STATS.map(({ value, label, suffix }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center gap-1 bg-surface p-5 text-center"
            >
              <span className="font-display text-3xl font-bold tracking-tight text-foreground">
                {suffix && (
                  <span className="text-lg text-foreground/50 mr-0.5">{suffix}</span>
                )}
                {value}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-foreground/45">
                {label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── 3D Glass Canvas ── */}
      <Reveal delay={0.1}>
        <FluidGlass
          mode="lens"
          lensProps={{
            scale: 0.25,
            ior: 1.15,
            thickness: 5,
            chromaticAberration: 0.1,
            anisotropy: 0.01,
          }}
        />
      </Reveal>

      {/* ── Project Spotlights ── */}
      <Reveal delay={0.15}>
        <div className="space-y-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-foreground/40">
            Signature Work
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {PROJECTS.map(({ tag, name, desc, stack, color }) => (
              <div
                key={name}
                className="group relative flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-60 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: color }}
                />
                <div className="flex items-center gap-2 pt-1">
                  <span
                    className="rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider"
                    style={{ background: `${color}18`, color }}
                  >
                    {tag}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                  {name}
                </h3>
                <p className="text-xs leading-relaxed text-foreground/60">{desc}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                  {stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-line bg-muted px-2 py-0.5 font-mono text-[9px] text-foreground/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── Technical Pillars ── */}
      <Reveal delay={0.2}>
        <div className="space-y-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-foreground/40">
            Technical Pillars
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {PILLARS.map(({ icon, label, detail }) => (
              <div
                key={label}
                className="flex flex-col gap-2 rounded-xl border border-line bg-surface p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/20"
              >
                <span className="text-2xl">{icon}</span>
                <p className="text-xs font-semibold text-foreground">{label}</p>
                <p className="text-[10px] leading-relaxed text-foreground/50">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── Recruiter CTA strip ── */}
      <Reveal delay={0.25}>
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-surface p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">
              Open to full-time &amp; internship opportunities
            </p>
            <p className="text-xs text-foreground/55">
              Available for roles in Full-Stack, Backend Systems, or AI/Automation engineering.
              Based in Mumbai · Remote-friendly.
            </p>
          </div>
          <div className="flex shrink-0 gap-3">
            <a
              href="mailto:musabimp.0@gmail.com"
              className="rounded-full border border-foreground bg-foreground px-5 py-2.5 font-mono text-[11px] uppercase tracking-wider text-background transition-opacity hover:opacity-80"
            >
              Email Me
            </a>
            <a
              href="tel:+919152921715"
              className="rounded-full border border-line px-5 py-2.5 font-mono text-[11px] uppercase tracking-wider text-foreground/80 transition-all hover:border-foreground/40 hover:text-foreground"
            >
              +91 91529 21715
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

import React from "react";
import { ExternalLink, Shield, Terminal as TerminalIcon, Zap } from "lucide-react";
import { GithubIcon } from "./icons";
import ShareButtons from "./ShareButtons";

interface Outcome {
  value: string;
  label: string;
}

interface CaseStudy {
  id: string;
  tag: string;
  tagClass: string;
  title: string;
  description: string;
  highlights: string[];
  stackTitle: string;
  stack: string[];
  techChips: string[];
  github: string;
  live: string;
  linkClass: string;
  outcomes: Outcome[];
  role: string;
  timeline: string;
  icon: React.ReactNode;
  iconClass: string;
  telemetryLabel: string;
  telemetryText: string;
  glowClass: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "jobsnap",
    tag: "Flagship AI Product",
    tagClass: "border-blue-500/20 bg-blue-500/5 text-blue-400",
    title: "JobSnap — Automated Matching Engine",
    description:
      "An intelligent job aggregator that parses CVs, extracts skill matrices, and semantically scores openings against developer roles.",
    highlights: ["AI Job Matching", "ATS Parsing", "Automated Scoring"],
    stackTitle: "Backend Stack",
    stack: ["Node.js & Flask", "Redis Job Queue", "MongoDB Data Layer"],
    techChips: ["LlamaIndex", "Celery Workers"],
    github: "https://github.com/03musab/ai_job_agent",
    live: "https://aijobsnap.vercel.app/",
    linkClass: "text-blue-400 hover:text-blue-300",
    outcomes: [
      { value: "200+", label: "jobs ingested daily" },
      { value: "~60%", label: "faster candidate screening" },
      { value: "3×", label: "faster application cycle" },
    ],
    role: "Sole Developer",
    timeline: "2024 – 2025",
    icon: <Zap size={28} />,
    iconClass: "text-blue-500",
    telemetryLabel: "ATS Parsing Telemetry",
    telemetryText: "STATUS: PARSING QUEUE IDLE",
    glowClass: "bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]",
  },
  {
    id: "togcode",
    tag: "Real-Time Collaboration Platform",
    tagClass: "border-purple-500/20 bg-purple-500/5 text-purple-400",
    title: "Togcode — Real-Time Editor Sandbox",
    description:
      "A real-time collaborative editor where remote users code together over encrypted WebSocket tunnels with sub-50ms sync.",
    highlights: ["WebSocket Hub", "Code Synchronization", "Concurrent Sandboxing"],
    stackTitle: "Frontend Architecture",
    stack: ["React Code Editor", "Concurrent Lock Toggles", "Client Diff Compiler"],
    techChips: ["Socket.io", "Monaco Editor"],
    github: "https://github.com/03musab/togcode",
    live: "https://togcode.vercel.app",
    linkClass: "text-purple-400 hover:text-purple-300",
    outcomes: [
      { value: "<50ms", label: "sync latency" },
      { value: "4+", label: "concurrent users" },
      { value: "0", label: "lost edits" },
    ],
    role: "Sole Developer",
    timeline: "2024 – 2025",
    icon: <TerminalIcon size={28} />,
    iconClass: "text-purple-400",
    telemetryLabel: "Collaboration Gateway",
    telemetryText: "CONCURRENCY: 4 USERS CONNECTED",
    glowClass: "bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08)_0%,transparent_70%)]",
  },
  {
    id: "talksphere",
    tag: "Security Engineering Project",
    tagClass: "border-green-500/20 bg-green-500/5 text-green-400",
    title: "TalkSphere — Secure Messaging Gateway",
    description:
      "A chat gateway with strict end-to-end encryption — AES-GCM payload sealing, ephemeral ECDH keys, and tamper detection on every packet.",
    highlights: ["Ephemeral Key Negotiation", "Tamper Alerts", "Zero-Knowledge Storage"],
    stackTitle: "Cryptographic Layer",
    stack: ["AES-GCM Payload Packets", "SHA-256 Checksums", "ECDH Safe Exchanges"],
    techChips: ["CryptoAPI", "E2E Sealed"],
    github: "https://github.com/03musab/APSIT-Chat-app",
    live: "https://apsit-chat-frontend.onrender.com/",
    linkClass: "text-green-400 hover:text-green-300",
    outcomes: [
      { value: "0", label: "plaintext stored" },
      { value: "AES-GCM", label: "payload sealing" },
      { value: "Real-time", label: "tamper alerts" },
    ],
    role: "Sole Developer",
    timeline: "2024 – 2025",
    icon: <Shield size={28} />,
    iconClass: "text-green-400",
    telemetryLabel: "Crypto Module Status",
    telemetryText: "AES_KEY: ENGAGED [E2E SEALED]",
    glowClass: "bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)]",
  },
];

function CaseCard({ study }: { study: CaseStudy }) {
  return (
    <div className="bg-[#0a0a0c]/80 border border-white/10 rounded-2xl overflow-hidden glow-border grid grid-cols-1 lg:grid-cols-12">
      {/* Content */}
      <div className="lg:col-span-8 p-6 lg:p-8 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <span className={`px-2.5 py-1 rounded-full border text-[10px] font-mono font-bold uppercase tracking-wider ${study.tagClass}`}>
            {study.tag}
          </span>
          <ShareButtons title={study.title} />
        </div>

        <div className="space-y-3">
          <h4 className="text-2xl font-bold text-white font-sans">{study.title}</h4>
          <p className="text-sm text-gray-400 leading-relaxed font-sans">{study.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] text-gray-500 font-mono font-bold uppercase">Highlights</p>
            <ul className="text-xs text-gray-300 space-y-1 mt-1 font-mono">
              {study.highlights.map((h) => (
                <li key={h}>• {h}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 font-mono font-bold uppercase">{study.stackTitle}</p>
            <ul className="text-xs text-gray-300 space-y-1 mt-1 font-mono">
              {study.stack.map((s) => (
                <li key={s}>• {s}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Outcomes */}
        <div className="grid grid-cols-3 gap-3">
          {study.outcomes.map((o) => (
            <div key={o.label} className="bg-[#0e0e11]/80 border border-white/5 rounded-xl p-3 text-center">
              <p className="text-lg font-bold font-mono bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                {o.value}
              </p>
              <p className="text-[9px] text-gray-500 font-mono uppercase tracking-wide mt-1">{o.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {study.techChips.map((chip) => (
            <span key={chip} className="text-xs font-mono text-gray-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md">
              {chip}
            </span>
          ))}
          <span className="text-gray-600 text-xs">|</span>
          <a
            href={study.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xs font-mono transition-colors flex items-center gap-1 ${study.linkClass}`}
          >
            <GithubIcon size={12} />
            <span>GitHub</span>
          </a>
          <a
            href={study.live}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-xs font-mono transition-colors flex items-center gap-1 ${study.linkClass}`}
          >
            <ExternalLink size={12} />
            <span>Live</span>
          </a>
        </div>

        <p className="text-[10px] font-mono text-gray-500 border-t border-white/5 pt-4">
          {study.role} · {study.timeline}
        </p>
      </div>

      {/* Visual panel */}
      <div className="lg:col-span-4 bg-[#0e0e11] border-t lg:border-t-0 lg:border-l border-white/10 p-6 flex flex-col justify-center items-center relative overflow-hidden select-none min-h-[220px]">
        <div className={`absolute inset-0 ${study.glowClass}`} />
        <div className="border border-white/10 bg-[#070709] p-5 rounded-xl text-center space-y-3 relative z-10 w-full max-w-[280px]">
          <div className={study.iconClass + " mx-auto"}>{study.icon}</div>
          <p className="text-xs font-mono text-gray-400">{study.telemetryLabel}</p>
          <div className="bg-black border border-white/5 rounded-lg p-2 font-mono text-[10px] text-green-400">
            {study.telemetryText}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectCaseStudies() {
  return (
    <div className="space-y-8">
      {CASE_STUDIES.map((study) => (
        <CaseCard key={study.id} study={study} />
      ))}
    </div>
  );
}

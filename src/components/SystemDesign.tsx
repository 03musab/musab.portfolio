"use client";

import React, { useState } from "react";
import { Cpu, Zap, Lock, Mail, Users, Database, Globe, Shield, Key } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ProjectId = "jobsnap" | "togcode" | "talksphere";

interface DiagramNode {
  label: string;
  desc: string;
  icon: React.ReactNode;
  status: "idle" | "active" | "success";
  tooltipDesc: string;
  tech: string[];
}

interface ProjectConfig {
  title: string;
  colorClass: string;
  overviewTitle: string;
  overviewDesc: string;
  accentGlow: string;
  nodes: DiagramNode[];
}

const PROJECT_CONFIGS: Record<ProjectId, ProjectConfig> = {
  jobsnap: {
    title: "JobSnap (AI Engine)",
    colorClass: "text-blue-400",
    overviewTitle: "AI Pipeline Overview",
    overviewDesc: "JobSnap leverages background processes to fetch jobs from multiple endpoints and stores them. Once a user uploads a CV, our parsers extract keywords and feed them into the matching core, which compares structural alignment. High-score fits are queued and dispatched in daily automated summaries.",
    accentGlow: "rgba(59, 130, 246, 0.08)",
    nodes: [
      {
        label: "Job Ingestion",
        desc: "API Scrapers & Aggregators",
        icon: <Globe className="text-blue-400" size={22} />,
        status: "success",
        tooltipDesc: "Ingests raw job posting payloads from multiple API sources and endpoints synchronously.",
        tech: ["Python Scrapers", "Flask", "REST APIs"]
      },
      {
        label: "Resume Parser",
        desc: "PDF/DOCX ATS Extractors",
        icon: <Cpu className="text-purple-400" size={22} />,
        status: "active",
        tooltipDesc: "Performs layout analysis and tokenizes content from PDF & DOCX templates using LLM parsers.",
        tech: ["PyPDF", "LangChain", "Tokenizers"]
      },
      {
        label: "AI Match Core",
        desc: "Intelligent Scoring Engine",
        icon: <Zap className="text-yellow-400" size={22} />,
        status: "active",
        tooltipDesc: "Embeds resumes and job description tokens to calculate semantic similarity scores.",
        tech: ["LlamaIndex", "OpenAI", "Embeddings"]
      },
      {
        label: "Queue & Schedulers",
        desc: "Background Jobs & Redis",
        icon: <Database className="text-blue-500" size={22} />,
        status: "success",
        tooltipDesc: "Manages high-priority tasks and caches processed job listings using Redis and background workers.",
        tech: ["Redis", "Celery", "JSON Tasks"]
      },
      {
        label: "Email Dispatcher",
        desc: "Automated Reporting",
        icon: <Mail className="text-green-400" size={22} />,
        status: "success",
        tooltipDesc: "Sends consolidated daily job match reports and alerts straight to user inboxes.",
        tech: ["SMTP", "NodeMailer", "SES"]
      }
    ]
  },
  togcode: {
    title: "Togcode (WebSockets)",
    colorClass: "text-purple-400",
    overviewTitle: "Synchronization Model",
    overviewDesc: "Togcode is built on top of robust WebSocket state-sharing. When client changes occur, the delta changes are packaged and piped through an encrypted socket event. The Node server evaluates incoming transformations and broadcasts updates to peers in less than 50ms.",
    accentGlow: "rgba(168, 85, 247, 0.08)",
    nodes: [
      {
        label: "Collaborators",
        desc: "React Live Editor",
        icon: <Users className="text-blue-400" size={22} />,
        status: "success",
        tooltipDesc: "Interactive React code editor clients broadcasting live editor diffs and user activity.",
        tech: ["React", "Monaco Editor", "Client Diff"]
      },
      {
        label: "Real-Time Gateway",
        desc: "WebSocket Protocol",
        icon: <Globe className="text-green-400" size={22} />,
        status: "active",
        tooltipDesc: "Routes real-time message payloads and diff packets over low-latency WebSockets.",
        tech: ["Socket.io", "TCP", "Secure TLS"]
      },
      {
        label: "WebSocket Hub",
        desc: "Workspace Sync",
        icon: <Cpu className="text-purple-400" size={22} />,
        status: "success",
        tooltipDesc: "Synchronizes client work environments and resolves edit conflicts using operational transformation.",
        tech: ["Node.js", "OT Engine", "Redis Cache"]
      }
    ]
  },
  talksphere: {
    title: "TalkSphere (Security)",
    colorClass: "text-green-400",
    overviewTitle: "Security Architecture",
    overviewDesc: "TalkSphere routes zero raw text. All messaging and secure file transfers are sealed in cryptographic envelopes. Handshake operations negotiate unique ephemeral keys, protecting discussions against man-in-the-middle attacks.",
    accentGlow: "rgba(16, 185, 129, 0.08)",
    nodes: [
      {
        label: "Client Encryptor",
        desc: "AES-GCM Payload",
        icon: <Lock className="text-purple-400" size={22} />,
        status: "success",
        tooltipDesc: "Secures and seals raw communication packets client-side using strong AES-GCM encryption.",
        tech: ["WebCrypto API", "AES-GCM", "IV Tunnels"]
      },
      {
        label: "Secure Transport",
        desc: "ECDH Key Exchange",
        icon: <Key className="text-blue-400" size={22} />,
        status: "active",
        tooltipDesc: "Negotiates safe key agreements dynamically to prevent man-in-the-middle attacks.",
        tech: ["ECDH", "HKDF", "Ephemeral Keys"]
      },
      {
        label: "Tamper Guard",
        desc: "SHA-256 Checksums",
        icon: <Shield className="text-green-400" size={22} />,
        status: "success",
        tooltipDesc: "Guards message structures against transit alterations by verifying SHA-256 checksum hashes.",
        tech: ["SHA-256", "HMAC", "Integrity Checks"]
      }
    ]
  }
};

const statusColor = {
  success: "bg-green-500/40",
  active: "bg-blue-500/40",
  idle: "bg-gray-500/20"
};

const statusDot = {
  success: "bg-green-500",
  active: "bg-blue-500",
  idle: "bg-gray-600"
};

// SVG Connection line between nodes
function PipelineConnector() {
  return (
    <div className="flex-1 flex items-center justify-center min-w-[12px] max-w-[40px] md:max-w-none h-8 md:h-full">
      {/* Desktop Connector (Horizontal) */}
      <svg className="hidden md:block w-full h-4 overflow-visible" fill="none">
        <defs>
          <filter id="glow-line" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* Base connector line */}
        <line
          x1="0"
          y1="8"
          x2="100%"
          y2="8"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1.5"
        />
        {/* Animated Flow line */}
        <line
          x1="0"
          y1="8"
          x2="100%"
          y2="8"
          stroke="url(#gradient-blue)"
          strokeWidth="1.5"
          strokeDasharray="6 14"
          className="animate-flow-x"
          filter="url(#glow-line)"
        />
      </svg>

      {/* Mobile Connector (Vertical) */}
      <svg className="block md:hidden w-4 h-full overflow-visible" fill="none">
        <defs>
          <linearGradient id="gradient-blue-v" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* Base connector line */}
        <line
          x1="8"
          y1="0"
          x2="8"
          y2="100%"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1.5"
        />
        {/* Animated Flow line */}
        <line
          x1="8"
          y1="0"
          x2="8"
          y2="100%"
          stroke="url(#gradient-blue-v)"
          strokeWidth="1.5"
          strokeDasharray="6 14"
          className="animate-flow-y"
          filter="url(#glow-line)"
        />
      </svg>
    </div>
  );
}

// Interactive Node Card with Status and Tooltip
function NodeCard({ node, idx }: { node: DiagramNode; idx: number }) {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 12 },
    show: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.35, 
        ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo
        delay: idx * 0.08 
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      className="relative group flex flex-col items-center w-full md:w-[110px] lg:w-[130px] xl:w-[145px] bg-[#0c0c0e] border border-white/5 hover:border-blue-500/40 hover:bg-[#101014] rounded-xl py-3 px-2 text-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.12)] hover:-translate-y-0.5 select-none"
    >
      {/* Animated Pulse Status dot in the top-right corner */}
      <div className="absolute top-2.5 right-2.5 flex items-center justify-center w-2 h-2">
        {node.status === "active" && (
          <span className={`absolute inline-flex h-4 w-4 rounded-full ${statusColor.active} animate-pulse-ring opacity-60`}></span>
        )}
        {node.status === "success" && (
          <span className={`absolute inline-flex h-3 w-3 rounded-full ${statusColor.success} animate-pulse opacity-40`}></span>
        )}
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${statusDot[node.status]}`}></span>
      </div>

      {/* Larger Premium Icon Container */}
      <div className="p-2 bg-white/5 rounded-lg mb-2 text-gray-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors duration-300">
        {node.icon}
      </div>

      {/* Typography */}
      <span className="text-white text-[11px] font-bold font-sans tracking-tight truncate w-full px-0.5">
        {node.label}
      </span>
      <span className="text-[9px] text-gray-500 font-sans mt-0.5 truncate w-full px-0.5">
        {node.desc}
      </span>

      {/* Premium Floating Hover Tooltip — renders BELOW the card to avoid container clipping */}
      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-56 p-3 bg-[#0d0d11] border border-white/10 rounded-lg shadow-2xl backdrop-blur-md opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-50 text-left font-sans">
        {/* Tooltip Pointer Triangle — sits above tooltip, pointing up */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-[#0d0d11]" />
        <div className="flex items-center justify-between border-b border-white/5 pb-1.5 mb-1.5">
          <span className="text-[11px] font-bold text-white leading-none">{node.label}</span>
          <span className={`text-[8px] font-mono font-bold px-1.5 py-0.5 rounded leading-none ${
            node.status === "success" ? "bg-green-500/10 text-green-400" :
            node.status === "active" ? "bg-blue-500/10 text-blue-400" : "bg-gray-500/10 text-gray-400"
          }`}>
            {node.status === "active" ? "ACTIVE" : node.status.toUpperCase()}
          </span>
        </div>
        <p className="text-[10px] text-gray-400 leading-normal">{node.tooltipDesc}</p>
        <div className="mt-2 pt-1.5 border-t border-white/5 flex flex-wrap gap-1">
          {node.tech.map((t, sIdx) => (
            <span key={sIdx} className="text-[8px] font-mono text-blue-300 bg-blue-500/5 border border-blue-500/10 px-1.5 py-0.5 rounded">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function SystemDesign() {
  const [activeProject, setActiveProject] = useState<ProjectId>("jobsnap");
  const config = PROJECT_CONFIGS[activeProject];

  const parentVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <div className="w-full bg-[#0a0a0c]/60 border border-white/10 p-6 rounded-2xl glow-border">
      {/* Header and Project Selectors */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="text-blue-500 animate-pulse" size={20} />
            System Architecture Showcase
          </h3>
          <p className="text-gray-400 text-xs mt-1 font-sans">
            Interactive blueprints of how I build end-to-end software pipelines.
          </p>
        </div>
        
        {/* Sleek Vercel-style Tab Swapping Buttons */}
        <div className="flex items-center bg-[#0c0c0e] border border-white/5 p-1 rounded-xl gap-1">
          {(Object.keys(PROJECT_CONFIGS) as ProjectId[]).map((projId) => {
            const isActive = activeProject === projId;
            return (
              <button
                key={projId}
                type="button"
                onClick={() => setActiveProject(projId)}
                aria-pressed={isActive}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-white/10 text-white border border-white/5 shadow-[0_1px_3px_rgba(0,0,0,0.5)] font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {projId === "jobsnap" ? "JobSnap" : projId === "togcode" ? "Togcode" : "TalkSphere"}
              </button>
            );
          })}
        </div>
      </div>

      {/* Blueprint Visual Showcase Container — overflow-visible so tooltips escape the box */}
      <div className="relative border border-white/5 rounded-xl p-5 md:p-6 mb-6 overflow-visible min-h-[170px] flex items-center justify-center">
        {/* Inner background layer clips the grid/glow without clipping children tooltips */}
        <div className="absolute inset-0 rounded-xl bg-[#08080a] bg-grid-blueprint shadow-inner pointer-events-none" />
        {/* Subtle Radial Blue Accent Glow */}
        <div 
          className="absolute inset-0 transition-all duration-500 pointer-events-none"
          style={{ 
            background: `radial-gradient(circle at center, ${config.accentGlow}, transparent 70%)` 
          }} 
        />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject}
            variants={parentVariants}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.15 } }}
            className="w-full relative z-10"
          >
            {/* The Pipeline flow line grid */}
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-[900px] mx-auto gap-2 md:gap-0">
              {config.nodes.map((node, i) => (
                <React.Fragment key={i}>
                  <NodeCard node={node} idx={i} />
                  {i < config.nodes.length - 1 && <PipelineConnector />}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Details Description Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="bg-[#0c0c0e]/80 border border-white/5 rounded-xl p-4"
        >
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full bg-blue-400`} />
            <p className="text-xs text-blue-400 font-mono font-bold tracking-wide uppercase">
              {config.overviewTitle}
            </p>
          </div>
          <p className="text-sm text-gray-300 mt-2 leading-relaxed font-sans">
            {config.overviewDesc}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

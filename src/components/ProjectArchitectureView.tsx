"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Cpu, Database, Globe, Key, Lock, Mail, Shield, Users, Zap } from "lucide-react";
import { EASING_EDITORIAL } from "@/lib/animations";

export type ProjectId = "jobsnap" | "togcode" | "talksphere";

interface ArchNode {
  id: string;
  label: string;
  sublabel: string;
  detail: string;
  tech: string[];
  icon: React.ReactNode;
}

interface ArchBlueprint {
  summary: string;
  accent: string;
  nodes: ArchNode[];
}

const BLUEPRINTS: Record<ProjectId, ArchBlueprint> = {
  jobsnap: {
    summary: "Collects job openings automatically, scores matches against your resume, and emails your daily shortlist.",
    accent: "#3b82f6",
    nodes: [
      {
        id: "ingest",
        label: "Finds Openings",
        sublabel: "Multi-site collector",
        detail: "Automatically checks multiple job websites on a schedule and brings new openings into one clean list.",
        tech: ["Python", "Web Automation"],
        icon: <Globe size={14} />,
      },
      {
        id: "parse",
        label: "Reads Resume",
        sublabel: "Smart fit score",
        detail: "Reads your uploaded resume and scores how closely each job matches your skills and preferences.",
        tech: ["Smart Matching", "Flask", "SQLite"],
        icon: <Cpu size={14} />,
      },
      {
        id: "queue",
        label: "Background Work",
        sublabel: "Runs automatically",
        detail: "Handles filtering, removing duplicate listings, and form-fill steps quietly in the background.",
        tech: ["Celery", "Redis"],
        icon: <Database size={14} />,
      },
      {
        id: "dispatch",
        label: "Daily Results",
        sublabel: "Email & Excel tracker",
        detail: "Emails you a curated daily shortlist and lets you export an Excel sheet to track every application.",
        tech: ["Daily Email", "Excel Export"],
        icon: <Mail size={14} />,
      },
    ],
  },
  togcode: {
    summary: "Lets multiple people edit code and plan ideas together at the exact same moment.",
    accent: "#6366f1",
    nodes: [
      {
        id: "editor",
        label: "Shared Workspace",
        sublabel: "Editor & whiteboard",
        detail: "Lets collaborators edit code together alongside an interactive board for sketching plans and layouts.",
        tech: ["React", "Code Editor"],
        icon: <Users size={14} />,
      },
      {
        id: "ws",
        label: "Instant Sync",
        sublabel: "Under 50ms speed",
        detail: "Sends changes directly across active rooms in a fraction of a second with zero lag.",
        tech: ["Live Connection", "Fast Sync"],
        icon: <Zap size={14} />,
      },
      {
        id: "state",
        label: "Cloud Save",
        sublabel: "Always backed up",
        detail: "Saves room history, login access, group chat messages, and shared diagrams safely online.",
        tech: ["Firebase", "Account Login"],
        icon: <Database size={14} />,
      },
    ],
  },
  talksphere: {
    summary: "Locks messages and shared files directly on your device so nobody in between can read them.",
    accent: "#14b8a6",
    nodes: [
      {
        id: "seal",
        label: "Privacy Lock",
        sublabel: "Locked on your device",
        detail: "Scrambles every message and file right inside your browser before it ever leaves your screen.",
        tech: ["React", "Device Locking"],
        icon: <Lock size={14} />,
      },
      {
        id: "transport",
        label: "Safe Delivery",
        sublabel: "Private message delivery",
        detail: "Delivers your locked message and files between users while servers only see unreadable text.",
        tech: ["Node.js", "Live Chat"],
        icon: <Key size={14} />,
      },
      {
        id: "verify",
        label: "Tamper Check",
        sublabel: "Verified untouched",
        detail: "Confirms every message arrived safely without edits and unlocks it only for the intended person.",
        tech: ["Integrity Check", "File Unlock"],
        icon: <Shield size={14} />,
      },
    ],
  },
};

export default function ProjectArchitectureView({
  projectId,
}: {
  projectId: ProjectId;
}) {
  const blueprint = BLUEPRINTS[projectId];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeNode = blueprint.nodes[selectedIndex] ?? blueprint.nodes[0];

  return (
    <div className="bg-blueprint-grid relative flex h-full w-full flex-col justify-between bg-surface p-3.5 text-foreground sm:p-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-line/80 pb-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Step-by-Step Flow
        </span>
        <span
          className="rounded-full px-2 py-0.5 font-mono text-[9px] font-medium"
          style={{
            backgroundColor: `${blueprint.accent}18`,
            color: blueprint.accent,
          }}
        >
          {blueprint.nodes.length} Steps
        </span>
      </div>

      {/* Interactive Flow Nodes with Animated Signal Path */}
      <div className="relative py-2">
        {/* Animated horizontal SVG signal line */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 24"
          className="mb-1.5 h-3 w-full overflow-visible"
          preserveAspectRatio="none"
        >
          <line
            x1="12"
            y1="12"
            x2="388"
            y2="12"
            stroke="var(--border)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <motion.circle
            cy="12"
            r="3.5"
            fill={blueprint.accent}
            initial={{ cx: 12, opacity: 0.4 }}
            animate={{ cx: [12, 388], opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>

        <div
          className={`grid grid-cols-2 gap-2 ${
            blueprint.nodes.length === 4 ? "sm:grid-cols-4" : "sm:grid-cols-3"
          }`}
        >
          {blueprint.nodes.map((node, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`group flex flex-col items-start gap-1 rounded-xl border p-2 text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-background shadow-sm"
                    : "border-line/80 bg-background/50 hover:border-foreground/25"
                }`}
                style={{
                  borderColor: isSelected ? blueprint.accent : undefined,
                }}
              >
                <span
                  className="grid size-5 place-items-center rounded-md transition-colors"
                  style={{
                    backgroundColor: isSelected
                      ? `${blueprint.accent}22`
                      : "var(--surface-muted)",
                    color: isSelected ? blueprint.accent : "var(--muted-foreground)",
                  }}
                >
                  {node.icon}
                </span>
                <span className="line-clamp-1 font-mono text-[10px] font-semibold text-foreground">
                  {node.label}
                </span>
                <span className="line-clamp-1 font-mono text-[9px] text-muted-foreground">
                  {node.sublabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Node Inspector */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${projectId}-${activeNode.id}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2, ease: EASING_EDITORIAL }}
          className="rounded-xl border border-line/80 bg-background/85 p-2.5 backdrop-blur-xs"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-[11px] font-semibold text-foreground">
              {activeNode.label}
            </span>
            <div className="flex flex-wrap gap-1">
              {activeNode.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-line bg-surface px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            {activeNode.detail}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

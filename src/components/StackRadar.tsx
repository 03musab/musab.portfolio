"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

interface RadarNode {
  label: string;
  blurb: string;
  /** Which ring the node sits on: 0 = core, 1 = mid, 2 = outer */
  ring: 0 | 1 | 2;
  /** Degrees around the circle (0 = top, clockwise) */
  angle: number;
  color: string;
  dot: string;
}

/** Ring radii as % of the container width (half-width offsets). */
const RING_RADIUS = [9, 17, 24];

/** Sweep and node-ping share this cycle so pings fire as the beam passes. */
const SWEEP_SECONDS = 6;

const NODES: RadarNode[] = [
  { label: "AI Agents", blurb: "LLM pipelines · ATS matching · scrapers", ring: 0, angle: 135, color: "text-purple-400", dot: "#a78bfa" },
  { label: "E2E Encryption", blurb: "AES-GCM · ECDH keys · SHA-256 integrity", ring: 0, angle: 315, color: "text-green-400", dot: "#34d399" },
  { label: "React", blurb: "Component-driven UIs & state", ring: 1, angle: 0, color: "text-cyan-400", dot: "#22d3ee" },
  { label: "Next.js", blurb: "App Router · SSR · full-stack product", ring: 1, angle: 72, color: "text-white", dot: "#e5e7eb" },
  { label: "Node.js", blurb: "APIs, WebSockets & background jobs", ring: 1, angle: 144, color: "text-green-400", dot: "#4ade80" },
  { label: "AWS", blurb: "Certified Foundations → Architecting", ring: 1, angle: 216, color: "text-orange-400", dot: "#fb923c" },
  { label: "WebSockets", blurb: "Sub-50ms collaborative sync", ring: 1, angle: 288, color: "text-blue-400", dot: "#60a5fa" },
  { label: "MongoDB", blurb: "Flexible document data layer", ring: 2, angle: 36, color: "text-emerald-400", dot: "#34d399" },
  { label: "Redis", blurb: "Queues · caching · pub/sub", ring: 2, angle: 108, color: "text-red-400", dot: "#f87171" },
  { label: "Tailwind", blurb: "Rapid, consistent design systems", ring: 2, angle: 180, color: "text-sky-400", dot: "#38bdf8" },
  { label: "Flask", blurb: "Python services & scrapers", ring: 2, angle: 252, color: "text-gray-300", dot: "#d1d5db" },
  { label: "Oracle Cloud", blurb: "OCI Multicloud Architect", ring: 2, angle: 324, color: "text-red-400", dot: "#fb923c" },
];

function nodePosition(node: RadarNode) {
  const radius = RING_RADIUS[node.ring];
  const rad = ((node.angle - 90) * Math.PI) / 180; // angle 0 = top
  return {
    left: 50 + radius * Math.cos(rad),
    top: 50 + radius * Math.sin(rad),
  };
}

function RadarNode({ node }: { node: RadarNode }) {
  const pos = nodePosition(node);
  const pingDelay = `-${((node.angle / 360) * SWEEP_SECONDS).toFixed(3)}s`;

  return (
    <div
      className="absolute group"
      style={{ left: `${pos.left}%`, top: `${pos.top}%`, transform: "translate(-50%, -50%)" }}
    >
      {/* Radar ping — flashes when the sweep beam passes this node */}
      <span className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2">
        <span
          className="radar-node-ping block h-3 w-3 rounded-full"
          style={{ "--delay": pingDelay, backgroundColor: node.dot } as React.CSSProperties}
        />
      </span>

      {/* Persistent node dot */}
      <span
        className="relative block h-2 w-2 rounded-full"
        style={{ backgroundColor: node.dot, boxShadow: `0 0 10px ${node.dot}` }}
      />

      {/* Label chip — readable over the sweep beam */}
      <span
        className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#08080a]/80 border border-white/5 px-1.5 py-0.5 text-xs font-semibold tracking-wide ${node.color} opacity-80 transition-opacity duration-200 group-hover:opacity-100 select-none`}
      >
        {node.label}
      </span>

      {/* Hover tooltip */}
      <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-48 -translate-x-1/2 z-20 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <div className="bg-[#0d0d11]/95 border border-white/10 rounded-lg p-3 shadow-2xl backdrop-blur-sm">
          <p className={`text-sm font-bold font-sans ${node.color}`}>{node.label}</p>
          <p className="text-xs text-gray-400 font-sans mt-1 leading-snug">{node.blurb}</p>
        </div>
      </div>
    </div>
  );
}

export default function StackRadar() {
  const panelRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Subtle 3D tilt following the pointer — disabled for reduced-motion users.
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 140, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 140, damping: 18 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = panelRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.section
      id="skills"
      className="scroll-mt-24 space-y-8"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="text-center">
        <h3 className="text-3xl sm:text-4xl font-bold text-white font-sans tracking-tight">
          Engineering Command Center
        </h3>
        <p className="text-base sm:text-lg text-gray-400 mt-3">
          A live scan of my core stack — hover any node to inspect that layer.
        </p>
      </div>

      <motion.div
        ref={panelRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ rotateX, rotateY, transformPerspective: 1100 }}
        className="relative w-full sm:w-fit sm:mx-auto bg-[#0a0a0c]/60 border border-white/10 rounded-3xl glow-border p-6 sm:p-8 will-change-transform"
      >
        {/* Radar display */}
        <div className="relative aspect-square w-full max-w-[400px] mx-auto select-none">
          {/* Screen disc */}
          <div className="absolute inset-0 rounded-full bg-[#08080a] border border-white/10 shadow-[0_0_60px_-20px_rgba(59,130,246,0.35)]" />
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_62%)]" />

          {/* Sweep beam (clipped to the disc) */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="radar-sweep absolute inset-0" />
          </div>

          {/* Crosshair */}
          <div className="absolute inset-y-0 left-1/2 w-px bg-white/[0.04]" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/[0.04]" />

          {/* Orbit rings — outer two rotate slowly in opposite directions */}
          <div className="absolute left-1/2 top-1/2 h-[18%] w-[18%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
          <div className="absolute left-1/2 top-1/2 h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2">
            <div className="radar-ring-cw h-full w-full rounded-full border border-dashed border-blue-400/15" />
          </div>
          <div className="absolute left-1/2 top-1/2 h-[48%] w-[48%] -translate-x-1/2 -translate-y-1/2">
            <div className="radar-ring-ccw h-full w-full rounded-full border border-dashed border-purple-400/10" />
          </div>

          {/* Core monogram */}
          <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2">
            <span className="radar-core-ring absolute inset-0 rounded-full bg-blue-500/25" />
            <span className="radar-core-ring absolute inset-0 rounded-full bg-purple-500/25" style={{ animationDelay: "2s" }} />
            <div className="relative flex h-full w-full items-center justify-center rounded-full border border-white/10 bg-[#0c0c0e]">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-mono text-base font-bold text-transparent">
                M.M
              </span>
            </div>
          </div>

          {/* Stack nodes */}
          {NODES.map((node) => (
            <RadarNode key={node.label} node={node} />
          ))}
        </div>

        {/* Status line */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs font-mono text-gray-500 select-none">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          <span>SCAN ACTIVE</span>
          <span className="text-gray-700">·</span>
          <span>{NODES.length} CORES TRACKED</span>
          <span className="text-gray-700">·</span>
          <span className="hidden sm:inline">FULL-STACK + AI + SECURITY</span>
        </div>
      </motion.div>
    </motion.section>
  );
}

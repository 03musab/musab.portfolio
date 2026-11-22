"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Cpu, Lock, LockOpen, Zap } from "lucide-react";
import type { ProjectId } from "./ProjectArchitectureView";
import { EASING_EDITORIAL } from "@/lib/animations";

const JOBSNAP_STAGES = [
  { label: "Finding Job Openings", tag: "Job Boards", status: "Collected" },
  { label: "Checking Resume Match", tag: "Fit Score", status: "Top Picks" },
  { label: "Sending Shortlist", tag: "Daily Digest", status: "Email Sent" },
] as const;

function JobSnapOverlay() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % JOBSNAP_STAGES.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      data-theme="black"
      onClick={(e) => e.stopPropagation()}
      className="liquid-glass-strong w-full max-w-[300px] rounded-2xl p-3 text-white"
    >
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2 font-mono text-[10px] text-white/70">
        <span className="inline-flex items-center gap-1.5">
          <Cpu size={12} className="text-blue-400" />
          <span>Auto Job Helper</span>
        </span>
        <span className="text-blue-300">Active</span>
      </div>

      <div className="relative z-10 mt-2.5 space-y-1.5">
        {JOBSNAP_STAGES.map((item, idx) => {
          const active = idx === step;
          return (
            <button
              key={item.label}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setStep(idx);
              }}
              className={`flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-left transition-colors cursor-pointer ${
                active ? "bg-blue-500/25 text-white" : "text-white/60 hover:bg-white/8"
              }`}
            >
              <span className="flex items-center gap-2 font-mono text-[10px]">
                <span
                  className={`size-1.5 rounded-full transition-colors ${
                    active ? "bg-blue-400" : "bg-white/25"
                  }`}
                />
                <span>{item.label}</span>
              </span>
              <span className="font-mono text-[9px] text-blue-300/90">
                {active ? item.status : item.tag}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TogcodeOverlay() {
  const [cursorShift, setCursorShift] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCursorShift((v) => !v);
    }, 2000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      data-theme="black"
      onClick={(e) => e.stopPropagation()}
      className="liquid-glass-strong w-full max-w-[300px] rounded-2xl p-3 text-white"
    >
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2 font-mono text-[10px] text-white/70">
        <span className="inline-flex items-center gap-1.5">
          <Zap size={12} className="text-indigo-400" />
          <span>Shared Live Workspace</span>
        </span>
        <span className="inline-flex items-center gap-1.5 text-indigo-300">
          <span className="size-1.5 rounded-full bg-indigo-400" />
          <span>Instant Sync</span>
        </span>
      </div>

      <div className="relative z-10 mt-2.5 space-y-1.5 rounded-xl bg-black/45 p-2.5 font-mono text-[10px] leading-relaxed text-white/85">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-white/90">Editing shared screen live</span>
          <motion.span
            animate={{ x: cursorShift ? -16 : 0 }}
            transition={{ duration: 0.5, ease: EASING_EDITORIAL }}
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-indigo-500/85 px-2 py-0.5 text-[8px] font-semibold text-white"
          >
            Musab
          </motion.span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-white/65">Sketching plan on board</span>
          <motion.span
            animate={{ x: cursorShift ? 0 : -14 }}
            transition={{ duration: 0.5, ease: EASING_EDITORIAL }}
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-sky-500/85 px-2 py-0.5 text-[8px] font-semibold text-white"
          >
            Teammate
          </motion.span>
        </div>
      </div>
    </div>
  );
}

function TalkSphereOverlay() {
  const [sealed, setSealed] = useState(true);

  return (
    <div
      data-theme="black"
      onClick={(e) => e.stopPropagation()}
      className="liquid-glass-strong w-full max-w-[300px] rounded-2xl p-3 text-white"
    >
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2 font-mono text-[10px] text-white/70">
        <span className="inline-flex items-center gap-1.5">
          {sealed ? (
            <Lock size={12} className="text-teal-400" />
          ) : (
            <LockOpen size={12} className="text-emerald-400" />
          )}
          <span>{sealed ? "Locked Before Sending" : "Unlocked on Your Device"}</span>
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setSealed((v) => !v);
          }}
          className="liquid-glass rounded-full px-2.5 py-0.5 font-display text-[10.5px] font-medium text-white transition-transform hover:scale-105 cursor-pointer"
        >
          <span className="relative z-10">
            {sealed ? "Unlock preview" : "Lock again"}
          </span>
        </button>
      </div>

      <div className="relative z-10 mt-2.5 rounded-xl bg-black/45 p-2.5 font-mono text-[10px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={sealed ? "cipher" : "plain"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: EASING_EDITORIAL }}
            className="space-y-1"
          >
            <p className="truncate text-white/90">
              {sealed
                ? "Private message: ••••••••••••••••••••"
                : '"Hey! Your files arrived safely."'}
            </p>
            <p className="inline-flex items-center gap-1 text-[9px] text-emerald-400">
              <Check size={10} />
              <span>
                {sealed
                  ? "Hidden from outside servers · Safe"
                  : "Readable only on your screen"}
              </span>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ProjectMicroPreview({
  projectId,
}: {
  projectId: ProjectId;
}) {
  if (projectId === "jobsnap") return <JobSnapOverlay />;
  if (projectId === "togcode") return <TogcodeOverlay />;
  return <TalkSphereOverlay />;
}

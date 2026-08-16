"use client";

import React from "react";
import Reveal from "./Reveal";
import { motion } from "motion/react";
import { Cpu, Zap, ShieldCheck, Cloud, Sparkles, Layers } from "lucide-react";
import { TextShimmerWave } from "./ui/text-shimmer-wave";
import { cardHoverProps } from "@/lib/animations";

export default function BentoGridSection() {
  return (
    <section id="architecture" className="scroll-mt-24 space-y-8">
      <Reveal>
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
            Engineered Capabilities
          </p>
          <h2 className="heading-glow font-display text-4xl tracking-tight lg:text-6xl">
            System &amp; <em className="text-colorfull animate-gradient-x italic">architecture</em>
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-foreground/60">
            Production-focused engineering architecture spanning real-time sync, autonomous AI agents, and encrypted cloud backends.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {/* Item 1: Real-time WebSocket Sync */}
        <Reveal className="md:col-span-2">
          <motion.div
            {...cardHoverProps}
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-line bg-surface p-7"
          >
            <div className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-2xl border border-line bg-background/80 text-emerald-400">
                <Zap size={18} />
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[9px] font-semibold text-emerald-400">
                Sub-50ms Latency
              </span>
            </div>

            <div className="mt-8 space-y-2">
              <h3 className="font-display text-xl font-bold text-foreground">
                Real-Time Synchronization
              </h3>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Operational-transform sync engines built over WebSockets for collaborative real-time code execution and live state streaming.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-line/60 bg-background/50 p-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-foreground/70">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <TextShimmerWave duration={1.5}>
                  WebSocket Connected · Active Channels: 14
                </TextShimmerWave>
              </div>
            </div>
          </motion.div>
        </Reveal>

        {/* Item 2: AI Autonomous Agent Pipeline */}
        <Reveal className="md:col-span-1">
          <motion.div
            {...cardHoverProps}
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-line bg-surface p-7"
          >
            <div className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-2xl border border-line bg-background/80 text-purple-400">
                <Sparkles size={18} />
              </span>
              <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-1 font-mono text-[9px] font-semibold text-purple-400">
                Autonomous
              </span>
            </div>

            <div className="mt-8 space-y-2">
              <h3 className="font-display text-xl font-bold text-foreground">
                AI Pipelines
              </h3>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Automated job search, resume scoring, and NLP agent workflows.
              </p>
            </div>
          </motion.div>
        </Reveal>

        {/* Item 3: End-to-End Encryption */}
        <Reveal className="md:col-span-1">
          <motion.div
            {...cardHoverProps}
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-line bg-surface p-7"
          >
            <div className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-2xl border border-line bg-background/80 text-cyan-400">
                <ShieldCheck size={18} />
              </span>
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 font-mono text-[9px] font-semibold text-cyan-400">
                E2E Encrypted
              </span>
            </div>

            <div className="mt-8 space-y-2">
              <h3 className="font-display text-xl font-bold text-foreground">
                Zero-Trust Security
              </h3>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Cryptographic security protocols and AES-256 payload encryption.
              </p>
            </div>
          </motion.div>
        </Reveal>

        {/* Item 4: Scalable Cloud Architecture */}
        <Reveal className="md:col-span-2">
          <motion.div
            {...cardHoverProps}
            className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-line bg-surface p-7"
          >
            <div className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-2xl border border-line bg-background/80 text-amber-400">
                <Cloud size={18} />
              </span>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 font-mono text-[9px] font-semibold text-amber-400">
                AWS &amp; OCI
              </span>
            </div>

            <div className="mt-8 space-y-2">
              <h3 className="font-display text-xl font-bold text-foreground">
                Cloud &amp; Microservices
              </h3>
              <p className="text-xs text-foreground/60 leading-relaxed">
                Distributed serverless functions, S3 storage, Redis caching layer, and microservice container deployments.
              </p>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

import React from "react";
import Reveal from "./Reveal";
import { GraduationCap, CheckCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export default function EducationSection() {
  return (
    <section id="education" className="scroll-mt-24 space-y-8">
      <Reveal>
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
            Academic Background
          </p>
          <h2 className="heading-glow font-display text-4xl tracking-tight lg:text-6xl">
            Education & <em className="text-colorfull animate-gradient-x italic">academics</em>
          </h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Main Degree Card */}
        <Reveal className="lg:col-span-8">
          <div className="h-full rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-foreground/30 lg:rounded-3xl lg:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-background/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-foreground/70">
                  <GraduationCap size={13} /> Graduation: May 2026
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
                  A. P. Shah Institute of Technology
                </h3>
                <p className="font-mono text-xs text-foreground/60">Thane, Maharashtra</p>
              </div>
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center">
                <p className="font-display text-2xl font-bold text-emerald-400">8.37</p>
                <p className="font-mono text-[9px] uppercase tracking-wider text-emerald-300">CGPA / 10</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-line/60">
              <p className="text-sm font-semibold text-foreground">
                Bachelor of Technology, Computer Engineering
              </p>
              <p className="mt-2 text-xs leading-relaxed text-foreground/70">
                Core coursework in Data Structures & Algorithms, Distributed Systems, Software Engineering, Database Management Systems, Computer Networks, and Cryptography.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Secondary Education Grades */}
        <Reveal className="lg:col-span-4" delay={0.1}>
          <div className="flex h-full flex-col justify-between space-y-4 rounded-2xl border border-line bg-surface p-7 lg:rounded-3xl lg:p-8">
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] font-semibold text-foreground/80">
              Prior Academics
            </h4>

            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-line/60 bg-background/50 p-4">
                <div>
                  <p className="font-mono text-xs font-semibold text-foreground">Diploma</p>
                  <p className="text-[10px] text-foreground/60">Computer Engineering</p>
                </div>
                <span className="font-mono text-sm font-bold text-foreground">83.06%</span>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-line/60 bg-background/50 p-4">
                <div>
                  <p className="font-mono text-xs font-semibold text-foreground">10th Grade</p>
                  <p className="text-[10px] text-foreground/60">SSC Board</p>
                </div>
                <span className="font-mono text-sm font-bold text-foreground">69.20%</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-foreground/60">
              <CheckCircle size={13} className="text-emerald-400" />
              <span>Verified Academic Records</span>
            </div>
          </div>
        </Reveal>
      </div>

    </section>
  );
}

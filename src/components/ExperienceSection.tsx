"use client";

import React from "react";
import Reveal from "./Reveal";
import { motion } from "motion/react";
import { Briefcase, MapPin, Calendar, ExternalLink } from "lucide-react";
import { cardHoverProps } from "@/lib/animations";

export interface ExperienceItem {
  company: string;
  role: string;
  type: string;
  dates: string;
  link?: string;
  current?: boolean;
  bullets: string[];
  tags: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    company: "Luxure",
    role: "Full Stack Developer Intern",
    type: "Remote",
    dates: "June 2026 – Present",
    current: true,
    bullets: [
      "Built a React/Vite e-commerce frontend with shopping cart, product pages, and checkout.",
      "Developed a Node/Express backend with user auth, order history, and secure API routes.",
      "Added admin features for managing products, categories, coupons, and orders."
    ],
    tags: ["React", "Vite", "Node.js", "Express", "REST API", "E-Commerce"],
  },
  {
    company: "FZ Creation Bags",
    role: "Digital Experience Developer [Freelance]",
    type: "Remote",
    dates: "Jan 2025 – Feb 2025",
    bullets: [
      "Developed a fully responsive e-commerce site for a bag/accessory business using HTML, CSS, JS, Bootstrap.",
      "Built product listing pages, enquiry system, and responsive design with fast load times.",
      "Integrated contact forms and carousel slides aligned with the brand's modern aesthetic."
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "E-Commerce", "UI/UX"],
  },
  {
    company: "A TO Z COMPUTERS",
    role: "IT Support & Technical Intern",
    type: "Onsite",
    dates: "Jul 2022 – Sep 2022",
    bullets: [
      "Led a 5-member volunteer team, increasing productivity by 30%.",
      "Implemented structured feedback systems, reducing project issues by 25%.",
      "Delivered detailed reports and cut project turnaround time by 20%."
    ],
    tags: ["Technical Leadership", "IT Support", "Process Optimization", "Team Lead"],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24 space-y-10">
      <Reveal>
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
            Work History
          </p>
          <h2 className="heading-glow font-display text-4xl tracking-tight lg:text-6xl">
            Practical <em className="text-colorfull animate-gradient-x italic">experience</em>
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-foreground/60">
            Hands-on software engineering roles in full-stack web development, e-commerce platforms, and technical leadership.
          </p>
        </div>
      </Reveal>

      <div className="relative space-y-8 pl-4 border-l border-line/70 sm:pl-8">
        {EXPERIENCES.map((exp, idx) => (
          <Reveal key={exp.company + exp.role} delay={idx * 0.1}>
            <motion.div
              {...cardHoverProps}
              className="relative space-y-3 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-foreground/30 sm:p-8"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[25px] sm:-left-[41px] top-8 flex size-4 items-center justify-center rounded-full border border-line bg-background">
                <span className={`size-2 rounded-full ${exp.current ? "bg-emerald-500 animate-ping" : "bg-foreground/50"}`} />
              </div>

              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-xl font-bold tracking-tight text-foreground lg:text-2xl">
                      {exp.role}
                    </h3>
                    {exp.current && (
                      <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider font-semibold text-emerald-400">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 font-mono text-xs text-foreground/70">
                    <span className="font-semibold text-foreground">{exp.company}</span>
                    {exp.link && (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 text-foreground/60 hover:text-foreground underline underline-offset-2"
                      >
                        ({exp.link.replace("https://", "")})
                        <ExternalLink size={10} />
                      </a>
                    )}
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} /> {exp.type}
                    </span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 rounded-full border border-line/60 bg-background/60 px-3 py-1 font-mono text-xs font-medium text-foreground/70">
                  <Calendar size={12} />
                  {exp.dates}
                </span>
              </div>

              {/* Bullets */}
              <ul className="mt-4 space-y-2 text-xs leading-relaxed text-foreground/80 lg:text-sm">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-foreground/40" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="mt-5 flex flex-wrap gap-1.5 pt-2 border-t border-line/50">
                {exp.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-line/50 bg-background/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-foreground/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Reveal from "./Reveal";
import { ExternalLink, Star } from "lucide-react";
import DriftWall from "./DriftWall";
import { cardHoverProps, buttonHoverProps } from "@/lib/animations";

const GITHUB_USERNAME = "03musab";

const STATS = [
  { label: "Public Repos", value: 29 },
  { label: "Followers", value: 2 },
  { label: "Following", value: 6 },
];

const REPOS = [
  {
    name: "ai_job_agent",
    description: "AI Job Hunter — Flask-based autonomous job search pipeline that scrapes, scores, and auto-applies to listings.",
    language: "HTML",
    stars: 2,
    url: "https://github.com/03musab/ai_job_agent",
  },
  {
    name: "Resume-Builder-main",
    description: "AI Resume Builder — Modern React app to create, customize, and export professional resumes.",
    language: "JavaScript",
    stars: 1,
    url: "https://github.com/03musab/Resume-Builder-main",
  },
  {
    name: "APSIT-Chat-app",
    description: "Real-time encrypted group chat with React, Node.js, and E2E encryption.",
    language: "JavaScript",
    stars: 1,
    url: "https://github.com/03musab/APSIT-Chat-app",
  },
  {
    name: "togcode",
    description: "Sub-50ms collaborative IDE with operational-transform sync over WebSockets.",
    language: "JavaScript",
    stars: 0,
    url: "https://github.com/03musab/togcode",
  },
  {
    name: "chatbot-therapist",
    description: "Conversational AI with real-time emotion analysis and ML insights.",
    language: "Python",
    stars: 0,
    url: "https://github.com/03musab/chatbot-therapist",
  },
  {
    name: "NLP_based-Homework-Helper",
    description: "Streamlit-powered AI assistant for homework using agent-based NLP reasoning.",
    language: "Python",
    stars: 0,
    url: "https://github.com/03musab/NLP_based-Homework-Helper",
  },
];

const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  HTML: "#e34c26",
  PHP: "#4F5D95",
  R: "#198CE7",
};

const DRIFT_IMAGES = [
  "/assets/driftingwall/77bbf015-42cf-4e30-a471-e8aee07d7936.jpeg",
  "/assets/driftingwall/b8ecac00-4843-4213-9cd6-9f1eaa4eef3a.jpeg",
  "/assets/driftingwall/b9466a48-50f2-4ff0-8114-fd32c2aea47d.jpeg",
  "/assets/driftingwall/c8e728e2-06b8-481a-b963-58982a71c4e0.jpeg",
  "/assets/driftingwall/Gemini_Generated_Image_9z0ln59z0ln59z0l.png",
  "/assets/driftingwall/Gemini_Generated_Image_qslpfzqslpfzqslp.png",
];

const DRIFT_ITEMS = REPOS.map(({ name, url }, i) => ({
  image: DRIFT_IMAGES[i % DRIFT_IMAGES.length],
  title: name,
  href: url,
}));

function AnimatedCounter({ target, duration = 1200 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function GitHubSection() {
  return (
    <section id="github" className="scroll-mt-24 space-y-8">
      <Reveal>
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
            Open Source &amp; Code
          </p>
          <h2 className="heading-glow font-display text-4xl tracking-tight lg:text-6xl">
            GitHub{" "}
            <em className="text-colorfull animate-gradient-x italic">activity</em>
          </h2>
        </div>
      </Reveal>

      {/* ── Profile Stats ── */}
      <Reveal delay={0.05}>
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-line bg-surface p-8 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-4">
            <img
              src="https://avatars.githubusercontent.com/u/115150570?v=4"
              alt="GitHub Avatar"
              className="h-16 w-16 rounded-full border-2 border-line object-cover"
            />
            <div>
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 font-display text-xl font-bold text-foreground hover:text-colorfull transition-colors"
              >
                {GITHUB_USERNAME}
                <ExternalLink size={14} className="opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
              <p className="font-mono text-xs text-foreground/55">Code! Eat! Sleep! Repeat!</p>
            </div>
          </div>

          <div className="flex gap-8">
            {STATS.map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="font-display text-2xl font-bold text-foreground">
                  <AnimatedCounter target={value} />
                </p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-foreground/45">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── Repos Grid ── */}
      <Reveal delay={0.1}>
        <div className="space-y-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-foreground/40">
            Top Repositories
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REPOS.map(({ name, description, language, stars, url }) => (
              <motion.a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                {...cardHoverProps}
                className="group relative flex flex-col gap-2 rounded-2xl border border-line bg-surface p-5 transition-all duration-300 hover:shadow-lg hover:border-foreground/20"
              >
                <div
                  className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-60"
                  style={{ background: LANG_COLORS[language] || "#8b8b8b" }}
                />
                <div className="flex items-center justify-between pt-1">
                  <h3 className="font-mono text-sm font-semibold text-foreground truncate">
                    {name}
                  </h3>
                  {stars > 0 && (
                    <span className="flex items-center gap-1 font-mono text-[10px] text-foreground/60">
                      <Star size={11} /> {stars}
                    </span>
                  )}
                </div>
                <p className="text-xs leading-relaxed text-foreground/60 line-clamp-2">
                  {description}
                </p>
                <div className="mt-auto flex items-center gap-1.5 pt-1">
                  <span
                    className="size-2 rounded-full"
                    style={{ background: LANG_COLORS[language] || "#8b8b8b" }}
                  />
                  <span className="font-mono text-[9px] text-foreground/50">
                    {language}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── Drift Wall showcase ── */}
      <Reveal delay={0.12}>
        <div className="space-y-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-foreground/40">
            Drifting Wall
          </p>
          <div className="relative h-[560px] w-full overflow-hidden rounded-3xl border border-line bg-surface">
            <DriftWall
              items={DRIFT_ITEMS}
              columns={5}
              tileWidth={200}
              tileHeight={132}
              gap={18}
              tilt={16}
              turn={-14}
              perspective={1200}
              depth={120}
              speed={42}
              direction="up"
              variance={0.45}
              parallax={0.6}
              lift={64}
              fade={0.6}
              dim={0.55}
              overlayColor="#060010"
              radius={14}
              roll={0}
              pauseOnHover={false}
              grayscale={false}
            />
          </div>
        </div>
      </Reveal>

      {/* ── CTA ── */}
      <Reveal delay={0.15}>
        <div className="flex justify-center">
          <motion.a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            {...buttonHoverProps}
            className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-foreground/80 transition-all hover:border-foreground/40 hover:text-foreground"
          >
            View all repos on GitHub
            <ExternalLink size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>
      </Reveal>
    </section>
  );
}

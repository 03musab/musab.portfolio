import React from "react";
import Reveal from "./Reveal";

interface SkillCategory {
  title: string;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages & Programming",
    skills: ["Python", "JavaScript", "PHP", "SQL"],
  },
  {
    title: "Frontend",
    skills: ["React", "Tailwind CSS", "Bootstrap", "HTML5", "CSS3"],
  },
  {
    title: "Backend & Frameworks",
    skills: ["Node.js", "Express.js", "Flask", "REST APIs", "WebSocket"],
  },
  {
    title: "Databases",
    skills: ["MongoDB", "MySQL", "SQLite", "Redis", "Firebase"],
  },
  {
    title: "Tools & Libraries",
    skills: ["Git / GitHub", "Celery", "Selenium", "CryptoJS", "Chart.js", "Canva"],
  },
  {
    title: "Cloud & Security",
    skills: ["AWS (S3, Lambda, Polly)", "Oracle Cloud Infrastructure", "Cybersecurity", "Encrypted Communication"],
  },
  {
    title: "Problem Solving",
    skills: ["Data Structures & Algorithms", "Arrays", "Linked Lists", "Stacks & Queues", "Sliding Window"],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-24 space-y-8">
      <Reveal>
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
            Technical Stack
          </p>
          <h2 className="heading-glow font-display text-4xl tracking-tight lg:text-6xl">
            Skills & <em className="text-colorfull animate-gradient-x italic">technologies</em>
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-foreground/60">
            Comprehensive toolkit spanning full-stack engineering, AI automation, databases, and cloud infrastructure.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <Reveal key={cat.title} delay={idx * 0.05}>
            <div className="h-full rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-foreground/30">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] font-semibold text-foreground/80">
                {cat.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-line/60 bg-background/60 px-3 py-1 font-mono text-xs font-medium text-foreground/80"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

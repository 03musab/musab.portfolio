"use client";

import React, { useState } from "react";
import Reveal from "./Reveal";
import { motion, type Variants } from "motion/react";
import { cardHoverProps } from "@/lib/animations";
import {
  Code2,
  Database,
  ShieldCheck,
  Cpu,
  Layers,
  Lock,
  Server,
  Network,
  Binary,
  Workflow,
  Cloud,
  Globe,
  Terminal,
  Flame,
  FileCode,
  Braces,
  Boxes,
} from "lucide-react";

interface SkillItem {
  name: string;
  iconUrl?: string;
  lucideIcon: React.ReactNode;
}

interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages & Programming",
    skills: [
      { name: "Python", iconUrl: "https://cdn.simpleicons.org/python", lucideIcon: <Terminal size={14} className="text-amber-400" /> },
      { name: "JavaScript", iconUrl: "https://cdn.simpleicons.org/javascript", lucideIcon: <FileCode size={14} className="text-yellow-400" /> },
      { name: "PHP", iconUrl: "https://cdn.simpleicons.org/php", lucideIcon: <Braces size={14} className="text-indigo-400" /> },
      { name: "SQL", lucideIcon: <Database size={14} className="text-blue-400" /> },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "React", iconUrl: "https://cdn.simpleicons.org/react", lucideIcon: <Globe size={14} className="text-cyan-400" /> },
      { name: "Tailwind CSS", iconUrl: "https://cdn.simpleicons.org/tailwindcss", lucideIcon: <Globe size={14} className="text-teal-400" /> },
      { name: "Bootstrap", iconUrl: "https://cdn.simpleicons.org/bootstrap", lucideIcon: <Globe size={14} className="text-purple-400" /> },
      { name: "HTML5", iconUrl: "https://cdn.simpleicons.org/html5", lucideIcon: <Globe size={14} className="text-orange-400" /> },
      { name: "CSS3", iconUrl: "https://cdn.simpleicons.org/css3", lucideIcon: <Globe size={14} className="text-blue-400" /> },
    ],
  },
  {
    title: "Backend & Frameworks",
    skills: [
      { name: "Node.js", iconUrl: "https://cdn.simpleicons.org/nodedotjs", lucideIcon: <Server size={14} className="text-emerald-400" /> },
      { name: "Express.js", iconUrl: "https://cdn.simpleicons.org/express", lucideIcon: <Server size={14} className="text-gray-400" /> },
      { name: "Flask", iconUrl: "https://cdn.simpleicons.org/flask", lucideIcon: <Server size={14} className="text-red-400" /> },
      { name: "REST APIs", lucideIcon: <Network size={14} className="text-emerald-400" /> },
      { name: "WebSocket", lucideIcon: <Server size={14} className="text-purple-400" /> },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MongoDB", iconUrl: "https://cdn.simpleicons.org/mongodb", lucideIcon: <Database size={14} className="text-emerald-400" /> },
      { name: "MySQL", iconUrl: "https://cdn.simpleicons.org/mysql", lucideIcon: <Database size={14} className="text-blue-400" /> },
      { name: "SQLite", iconUrl: "https://cdn.simpleicons.org/sqlite", lucideIcon: <Database size={14} className="text-cyan-400" /> },
      { name: "Redis", iconUrl: "https://cdn.simpleicons.org/redis", lucideIcon: <Database size={14} className="text-red-400" /> },
      { name: "Firebase", iconUrl: "https://cdn.simpleicons.org/firebase", lucideIcon: <Flame size={14} className="text-amber-400" /> },
    ],
  },
  {
    title: "Tools & Libraries",
    skills: [
      { name: "Git / GitHub", iconUrl: "https://cdn.simpleicons.org/github", lucideIcon: <Boxes size={14} className="text-neutral-400" /> },
      { name: "Celery", lucideIcon: <Workflow size={14} className="text-green-400" /> },
      { name: "Selenium", iconUrl: "https://cdn.simpleicons.org/selenium", lucideIcon: <Cpu size={14} className="text-emerald-400" /> },
      { name: "CryptoJS", lucideIcon: <Lock size={14} className="text-amber-400" /> },
      { name: "Chart.js", iconUrl: "https://cdn.simpleicons.org/chartdotjs", lucideIcon: <Layers size={14} className="text-pink-400" /> },
      { name: "Canva", iconUrl: "https://cdn.simpleicons.org/canva", lucideIcon: <Globe size={14} className="text-cyan-400" /> },
    ],
  },
  {
    title: "Cloud & Security",
    skills: [
      { name: "AWS (S3, Lambda, Polly)", iconUrl: "https://cdn.simpleicons.org/amazonaws", lucideIcon: <Cloud size={14} className="text-amber-400" /> },
      { name: "Oracle Cloud", iconUrl: "https://cdn.simpleicons.org/oracle", lucideIcon: <Cloud size={14} className="text-red-400" /> },
      { name: "Cybersecurity", lucideIcon: <ShieldCheck size={14} className="text-emerald-400" /> },
      { name: "Encrypted Communication", lucideIcon: <Lock size={14} className="text-cyan-400" /> },
    ],
  },
  {
    title: "Problem Solving",
    skills: [
      { name: "Data Structures & Algorithms", lucideIcon: <Cpu size={14} className="text-violet-400" /> },
      { name: "Arrays", lucideIcon: <Binary size={14} className="text-sky-400" /> },
      { name: "Linked Lists", lucideIcon: <Workflow size={14} className="text-emerald-400" /> },
      { name: "Stacks & Queues", lucideIcon: <Layers size={14} className="text-amber-400" /> },
      { name: "Sliding Window", lucideIcon: <Code2 size={14} className="text-pink-400" /> },
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 150,
    },
  },
};

function SkillBadge({ skill }: { skill: SkillItem }) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.span
      variants={badgeVariants}
      whileHover={{
        scale: 1.08,
        y: -3,
        borderColor: "var(--foreground)",
      }}
      whileTap={{ scale: 0.95 }}
      className="group inline-flex items-center gap-2 rounded-xl border border-line/70 bg-background/70 px-3.5 py-1.5 font-mono text-xs font-medium text-foreground/85 shadow-sm transition-colors cursor-pointer"
    >
      {skill.iconUrl && !imgFailed ? (
        <motion.img
          whileHover={{ rotate: 15, scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
          src={skill.iconUrl}
          alt=""
          className="size-3.5 object-contain filter dark:invert-0 brightness-95 transition-transform group-hover:scale-110"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <motion.span
          whileHover={{ rotate: 15, scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="inline-block"
        >
          {skill.lucideIcon}
        </motion.span>
      )}
      <span>{skill.name}</span>
    </motion.span>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-24 space-y-8">
      <Reveal>
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
            Technical Stack
          </p>
          <h2 className="heading-glow font-display text-4xl tracking-tight lg:text-6xl">
            Skills &amp; <em className="text-colorfull animate-gradient-x italic">technologies</em>
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-foreground/60">
            Comprehensive toolkit spanning full-stack engineering, AI automation, databases, and cloud infrastructure.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <Reveal key={cat.title} delay={idx * 0.05}>
            <motion.div
              {...cardHoverProps}
              className="h-full rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-foreground/30"
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] font-semibold text-foreground/80">
                {cat.title}
              </h3>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="mt-4 flex flex-wrap gap-2"
              >
                {cat.skills.map((skill) => (
                  <SkillBadge key={skill.name} skill={skill} />
                ))}
              </motion.div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

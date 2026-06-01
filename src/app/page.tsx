"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Mail,
  Phone,
  Terminal as TerminalIcon,
  CheckCircle,
  Clock,
  Layers,
  Cpu,
  Shield,
  Zap,
  Globe,
  Database,
  Briefcase,
  Award,
  ChevronRight,
  Send,
  ExternalLink,
  Code
} from "lucide-react";

const GithubIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
import Terminal from "@/components/Terminal";
import SystemDesign from "@/components/SystemDesign";
import AIEngineeringLab from "@/components/AIEngineeringLab";

export default function Page() {
  const [time, setTime] = useState("");
  const [latency, setLatency] = useState(24);
  const [activePipelineStep, setActivePipelineStep] = useState(0);
  const [showEmailMenu, setShowEmailMenu] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("musabimp.0@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  useEffect(() => {
    if (!showEmailMenu) return;
    const handleOutsideClick = () => {
      setShowEmailMenu(false);
    };
    const timer = setTimeout(() => {
      window.addEventListener("click", handleOutsideClick);
    }, 100);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [showEmailMenu]);

  // Form State
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    // Dynamic Time Update
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Dynamic Latency jitter simulation
    const interval = setInterval(() => {
      setLatency((prev) => {
        const diff = Math.floor(Math.random() * 5) - 2;
        const next = prev + diff;
        return next < 15 ? 15 : next > 45 ? 45 : next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setFormStatus("error");
      return;
    }
    setFormStatus("submitting");
    setTimeout(() => {
      setFormStatus("success");
      setFormState({ name: "", email: "", message: "" });
    }, 1500);
  };

  const badges = [
    { text: "Open To Opportunities", color: "text-green-400 border-green-500/20 bg-green-500/5" },
    { text: "8.34 CGPA", color: "text-blue-400 border-blue-500/20 bg-blue-500/5" },
    { text: "AWS Certified Developer", color: "text-yellow-400 border-yellow-500/20 bg-yellow-500/5" },
    { text: "AI Builder", color: "text-purple-400 border-purple-500/20 bg-purple-500/5" },
    { text: "Full-Stack Developer", color: "text-pink-400 border-pink-500/20 bg-pink-500/5" }
  ];

  const stats = [
    { value: "12+", label: "Projects Completed" },
    { value: "8+", label: "Professional Credentials" },
    { value: "3", label: "Cloud Certifications" },
    { value: "20+", label: "Tech Stack Tools" },
    { value: "4+", label: "Years Programming" }
  ];

  const skillGroups = {
    Frontend: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "Bootstrap", level: 80 },
      { name: "HTML & CSS", level: 95 }
    ],
    Backend: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 85 },
      { name: "Flask", level: 75 },
      { name: "REST APIs", level: 90 },
      { name: "WebSockets", level: 80 }
    ],
    Databases: [
      { name: "MySQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "SQLite", level: 80 },
      { name: "Redis", level: 70 }
    ],
    "Cloud & Security": [
      { name: "AWS Services", level: 80 },
      { name: "Oracle Cloud (OCI)", level: 75 },
      { name: "End-to-End Encryption", level: 85 },
      { name: "Cybersecurity Basics", level: 80 }
    ],
    "AI & Automation": [
      { name: "AI Agent Integration", level: 80 },
      { name: "ATS Matching Engines", level: 85 },
      { name: "Background Schedulers", level: 80 },
      { name: "Python Scrapers", level: 90 }
    ]
  };

  const pipelineSteps = [
    {
      title: "Ideation & Specs",
      desc: "Analyze user pain points and draft functional technical blueprints before writing a single line of code.",
      icon: <Layers size={16} />
    },
    {
      title: "System Design",
      desc: "Architect the data pipelines, WebSocket channels, and security boundaries. Setup databases schemas.",
      icon: <Cpu size={16} />
    },
    {
      title: "Core Engineering",
      desc: "Develop full-stack routes, secure encryption protocols, and clean reusable frontend components.",
      icon: <Code size={16} />
    },
    {
      title: "AI Integration",
      desc: "Embed Large Language Models (LLMs), design resume parsers, and plug in automated scraping workers.",
      icon: <Zap size={16} />
    },
    {
      title: "Deployment & CI/CD",
      desc: "Deploy securely on AWS or Oracle Cloud with monitored container networks and custom pipelines.",
      icon: <Globe size={16} />
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#030303] text-[#f5f5f7] flex flex-col font-sans antialiasedSelection">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] pointer-events-none" />

      {/* Header Panel */}
      <header className="sticky top-0 z-50 w-full bg-[#030303]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10 bg-[#0e0e11]">
            <Image
              src="/avatar.png"
              alt="Mohammed Musab Avatar"
              fill
              className="object-cover"
              sizes="32px"
            />
          </div>
          <div>
            <h1 className="font-mono text-sm font-bold tracking-tight text-white">Mohammed Musab</h1>
            <p className="text-[10px] text-gray-500 font-mono">full-stack engineer // ai builder</p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-6 text-xs font-mono text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
            <span className="text-gray-300">ALL SYSTEMS OPERATIONAL</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-blue-500" />
            <span>MUMBAI TIME: {time || "00:00:00"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Layers size={12} className="text-purple-500" />
            <span>LATENCY: {latency}ms</span>
          </div>
        </div>

        <div className="flex items-center gap-3 relative">
          <a
            href="https://github.com/03musab"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            title="GitHub"
          >
            <GithubIcon size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/devmusab/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            title="LinkedIn"
          >
            <LinkedinIcon size={16} />
          </a>
          <button
            onClick={() => setShowEmailMenu(!showEmailMenu)}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors relative"
            title="Email Composer Gateway"
          >
            <Mail size={16} />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          </button>

          {showEmailMenu && (
            <div className="absolute right-0 top-11 bg-[#0c0c0e]/95 backdrop-blur-md border border-white/10 rounded-xl p-1.5 shadow-2xl z-50 text-xs w-48 font-mono space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
              <p className="text-[10px] text-gray-500 px-2.5 py-1 uppercase font-bold tracking-wider select-none">Send Email Via</p>
              
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=musabimp.0@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowEmailMenu(false)}
                className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-left w-full"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                <span>Gmail (Web)</span>
              </a>

              <hr className="border-white/5 my-1" />

              <button
                onClick={() => {
                  copyEmailToClipboard();
                }}
                className="flex items-center justify-between px-2.5 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-left w-full cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  <span>Copy Address</span>
                </span>
                {copiedEmail && <span className="text-[10px] text-green-400 font-bold">COPIED</span>}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Core View */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-10 lg:py-16 space-y-16 lg:space-y-24">
        {/* HERO DASHBOARD SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            {/* Badges container */}
            <div className="flex flex-wrap gap-2">
              {badges.map((badge, idx) => (
                <span
                  key={idx}
                  className={`px-2.5 py-1 rounded-full border text-[10px] font-mono font-bold tracking-wide uppercase select-none ${badge.color}`}
                >
                  {badge.text}
                </span>
              ))}
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-white leading-[1.1]">
              I Build <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 bg-clip-text text-transparent">AI-Powered</span> Products & Scalable Software.
            </h2>

            <p className="text-base sm:text-lg text-gray-400 font-sans max-w-xl leading-relaxed">
              Computer Engineering Graduate (2026) focused on Full-Stack Development, Automation Engineering, Cloud Infrastructure, and Secure Applications.
            </p>

            {/* Quick Actions Panel */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#projects"
                className="px-5 py-3 rounded-lg text-xs font-mono font-bold bg-white text-black hover:bg-gray-200 transition-colors flex items-center gap-1.5"
              >
                <span>Deploy Projects View</span>
                <ChevronRight size={14} />
              </a>
              <a
                href="https://drive.google.com/file/d/1ZvfUMpGDdJFGXA2mjfnwXyQcRbZ8HAoL/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-lg text-xs font-mono font-bold bg-[#0e0e11] text-gray-300 hover:text-white border border-white/10 hover:border-white/20 transition-all flex items-center gap-1.5"
              >
                <Award size={14} />
                <span>Fetch Resume (PDF)</span>
              </a>
            </div>
          </div>

          {/* Interactive CLI Console */}
          <div className="lg:col-span-5 w-full">
            <Terminal />
          </div>
        </section>

        {/* STATS ROW */}
        <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#0a0a0c]/60 border border-white/5 p-5 rounded-2xl glow-border flex flex-col justify-center items-center text-center select-none col-span-1 last:col-span-2 last:md:col-span-1"
            >
              <span className="text-3xl lg:text-4xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent font-mono">
                {stat.value}
              </span>
              <span className="text-[10px] text-gray-500 font-mono font-bold tracking-wider uppercase mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </section>

        <hr className="border-white/5" />

        {/* WORKFLOW & DEVELOPMENT PIPELINE */}
        <section className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-white font-sans">How I Build Products</h3>
            <p className="text-gray-400 text-sm mt-1">My core full-stack software development workflow lifecycle.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Steps Left List */}
            <div className="lg:col-span-5 space-y-3">
              {pipelineSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePipelineStep(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4 group ${
                    activePipelineStep === idx
                      ? "bg-blue-600/10 border-blue-500/30 text-white"
                      : "bg-[#0a0a0c]/30 border-white/5 text-gray-400 hover:bg-[#0a0a0c]/60 hover:text-white"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg transition-colors ${
                      activePipelineStep === idx ? "bg-blue-500 text-white" : "bg-white/5 text-gray-400 group-hover:bg-white/10"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold font-sans">{step.title}</h4>
                  </div>
                  <ChevronRight size={14} className={`text-gray-600 group-hover:text-gray-400 transition-transform ${activePipelineStep === idx ? "rotate-90 text-blue-400" : ""}`} />
                </button>
              ))}
            </div>

            {/* Steps Right Explanation Display */}
            <div className="lg:col-span-7 bg-[#0a0a0c]/60 border border-white/10 p-6 rounded-2xl glow-border min-h-[160px] flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-blue-400 font-mono font-bold tracking-widest uppercase">
                  STEP 0{activePipelineStep + 1} — {pipelineSteps[activePipelineStep].title}
                </span>
                <p className="text-base text-gray-300 mt-4 leading-relaxed font-sans">
                  {pipelineSteps[activePipelineStep].desc}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-mono text-gray-500 select-none">
                <CheckCircle size={12} className="text-green-500" />
                <span>Implemented in all major applications</span>
              </div>
            </div>
          </div>
        </section>

        {/* SYSTEM SCHEMAS & LAB COMPONENT ROW */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <SystemDesign />
          <AIEngineeringLab />
        </section>

        <hr className="border-white/5" />

        {/* ENGINEERING COMMAND CENTER (SKILLS GRID) */}
        <section className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-white font-sans">Engineering Command Center</h3>
            <p className="text-gray-400 text-sm mt-1">My technological stacks and toolsets sorted by architecture layers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skillGroups).map(([groupName, skills], idx) => (
              <div
                key={idx}
                className="bg-[#0a0a0c]/60 border border-white/5 p-6 rounded-2xl glow-border space-y-4 hover:border-white/10 transition-colors"
              >
                <h4 className="text-sm font-mono font-bold text-blue-400 uppercase tracking-wider">{groupName}</h4>
                <div className="space-y-3">
                  {skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-gray-300">
                        <span>{skill.name}</span>
                        <span className="text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED PROJECTS SECTION */}
        <section id="projects" className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-white font-sans">Production-Grade Applications</h3>
            <p className="text-gray-400 text-sm mt-1">A showcase of systems and solutions I built from scratch.</p>
          </div>

          <div className="space-y-8">
            {/* JobSnap */}
            <div className="bg-[#0a0a0c]/80 border border-white/10 rounded-2xl overflow-hidden glow-border grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 p-6 lg:p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="px-2.5 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                    Flagship AI Product
                  </span>
                  <h4 className="text-2xl font-bold text-white font-sans">JobSnap — Automated Matching Engine</h4>
                  <p className="text-sm text-gray-400 leading-relaxed font-sans">
                    An intelligent job aggregator and automated application pipeline. Parses uploaded CV templates, extracts skill matrices, and computes semantic scores matching available developer positions.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-gray-500 font-mono font-bold uppercase">Highlights</p>
                    <ul className="text-xs text-gray-300 space-y-1 mt-1 font-mono">
                      <li>• AI Job Matching</li>
                      <li>• ATS Parsing</li>
                      <li>• Automated Scoring</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-mono font-bold uppercase">Backend Stack</p>
                    <ul className="text-xs text-gray-300 space-y-1 mt-1 font-mono">
                      <li>• Node.js & Flask</li>
                      <li>• Redis Job Queue</li>
                      <li>• MongoDB Data Layer</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <span className="text-xs font-mono text-gray-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md">LlamaIndex</span>
                  <span className="text-xs font-mono text-gray-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md">Celery Workers</span>
                  <span className="text-gray-600 text-xs">|</span>
                  <a
                    href="https://github.com/03musab/ai_job_agent"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                  >
                    <GithubIcon size={12} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://aijobsnap.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                  >
                    <ExternalLink size={12} />
                    <span>Live</span>
                  </a>
                </div>
              </div>
              <div className="lg:col-span-5 bg-[#0e0e11] border-t lg:border-t-0 lg:border-l border-white/10 p-6 flex flex-col justify-center items-center relative overflow-hidden select-none min-h-[220px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]" />
                <div className="border border-white/10 bg-[#070709] p-5 rounded-xl text-center space-y-3 relative z-10 w-full max-w-[280px]">
                  <Zap className="text-blue-500 mx-auto" size={28} />
                  <p className="text-xs font-mono text-gray-400">ATS Parsing Telemetry</p>
                  <div className="bg-black border border-white/5 rounded-lg p-2 font-mono text-[10px] text-green-400">
                    STATUS: PARSING QUEUE IDLE
                  </div>
                </div>
              </div>
            </div>

            {/* Togcode */}
            <div className="bg-[#0a0a0c]/80 border border-white/10 rounded-2xl overflow-hidden glow-border grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 p-6 lg:p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="px-2.5 py-1 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                    Real-Time Collaboration Platform
                  </span>
                  <h4 className="text-2xl font-bold text-white font-sans">Togcode — Real-Time Editor Sandbox</h4>
                  <p className="text-sm text-gray-400 leading-relaxed font-sans">
                    Architected for real-time collaborative workspaces. Multiple remote users can enter sandbox environments, edit files concurrently, and review synchronized output panels over highly optimized socket tunnels.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-gray-500 font-mono font-bold uppercase">Highlights</p>
                    <ul className="text-xs text-gray-300 space-y-1 mt-1 font-mono">
                      <li>• WebSocket Hub</li>
                      <li>• Code Synchronization</li>
                      <li>• Concurrent Sandboxing</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-mono font-bold uppercase">Frontend Architecture</p>
                    <ul className="text-xs text-gray-300 space-y-1 mt-1 font-mono">
                      <li>• React Code Editor</li>
                      <li>• Concurrent Lock Toggles</li>
                      <li>• Client Diff Compiler</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3 items-center flex-wrap">
                  <span className="text-xs font-mono text-gray-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md">Socket.io</span>
                  <span className="text-xs font-mono text-gray-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md">Monaco Editor</span>
                  <span className="text-gray-600 text-xs">|</span>
                  <a
                    href="https://github.com/03musab/togcode"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
                  >
                    <GithubIcon size={12} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://togcode.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
                  >
                    <ExternalLink size={12} />
                    <span>Live</span>
                  </a>
                </div>
              </div>
              <div className="lg:col-span-5 bg-[#0e0e11] border-t lg:border-t-0 lg:border-l border-white/10 p-6 flex flex-col justify-center items-center relative overflow-hidden select-none min-h-[220px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08)_0%,transparent_70%)]" />
                <div className="border border-white/10 bg-[#070709] p-5 rounded-xl text-center space-y-3 relative z-10 w-full max-w-[280px]">
                  <TerminalIcon className="text-purple-400 mx-auto" size={28} />
                  <p className="text-xs font-mono text-gray-400">Collaboration Gateway</p>
                  <div className="bg-black border border-white/5 rounded-lg p-2 font-mono text-[10px] text-purple-400">
                    CONCURRENCY: 4 USERS CONNECTED
                  </div>
                </div>
              </div>
            </div>

            {/* TalkSphere */}
            <div className="bg-[#0a0a0c]/80 border border-white/10 rounded-2xl overflow-hidden glow-border grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 p-6 lg:p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="px-2.5 py-1 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                    Security Engineering Project
                  </span>
                  <h4 className="text-2xl font-bold text-white font-sans">TalkSphere — Secure Messaging Gateway</h4>
                  <p className="text-sm text-gray-400 leading-relaxed font-sans">
                    A secure communications application implementing strict end-to-end encryption. Built to prevent database inspection eavesdropping, it encrypts raw payloads, features secure binary file handshakes, and alerts users of integrity tampering.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-gray-500 font-mono font-bold uppercase">Highlights</p>
                    <ul className="text-xs text-gray-300 space-y-1 mt-1 font-mono">
                      <li>• Ephemeral Key Negotiation</li>
                      <li>• File Integrity Tamper Alerts</li>
                      <li>• Zero-Knowledge DB Storage</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-mono font-bold uppercase">Cryptographic Layer</p>
                    <ul className="text-xs text-gray-300 space-y-1 mt-1 font-mono">
                      <li>• AES-GCM Payload Packets</li>
                      <li>• SHA-256 Checksums</li>
                      <li>• ECDH Safe Exchanges</li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-3 items-center flex-wrap">
                  <span className="text-xs font-mono text-gray-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md">CryptoAPI</span>
                  <span className="text-xs font-mono text-gray-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md">E2E Sealed</span>
                  <span className="text-gray-600 text-xs">|</span>
                  <a
                    href="https://github.com/03musab/APSIT-Chat-app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-green-400 hover:text-green-300 transition-colors flex items-center gap-1"
                  >
                    <GithubIcon size={12} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://apsit-chat-frontend.onrender.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-green-400 hover:text-green-300 transition-colors flex items-center gap-1"
                  >
                    <ExternalLink size={12} />
                    <span>Live</span>
                  </a>
                </div>
              </div>
              <div className="lg:col-span-5 bg-[#0e0e11] border-t lg:border-t-0 lg:border-l border-white/10 p-6 flex flex-col justify-center items-center relative overflow-hidden select-none min-h-[220px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)]" />
                <div className="border border-white/10 bg-[#070709] p-5 rounded-xl text-center space-y-3 relative z-10 w-full max-w-[280px]">
                  <Shield className="text-green-400 mx-auto" size={28} />
                  <p className="text-xs font-mono text-gray-400">Crypto Module Status</p>
                  <div className="bg-black border border-white/5 rounded-lg p-2 font-mono text-[10px] text-green-400">
                    AES_KEY: ENGAGED [E2E SEALED]
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE TIMELINE & ACHIEVEMENT WALL */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Timeline */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white font-sans flex items-center gap-2">
                <Briefcase size={20} className="text-blue-500" />
                Professional Timeline
              </h3>
              <p className="text-gray-400 text-xs mt-1">My engineering work placements and interns.</p>
            </div>

            <div className="space-y-6 relative pl-4 border-l border-white/10 select-none">
              <div className="space-y-2 relative">
                <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-blue-500 border border-[#030303]" />
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-blue-400 font-bold">2024</span>
                  <span className="text-xs font-mono text-gray-500">|</span>
                  <span className="text-xs font-mono text-gray-400">Digital Experience Developer (Intern)</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed font-sans">
                  Crafted premium responsive digital flows, analyzed interface optimizations, and worked on codebase integrations, boosting visual responsiveness and SEO performance.
                </p>
              </div>

              <div className="space-y-2 relative">
                <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-gray-600 border border-[#030303]" />
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-blue-400 font-bold">2023</span>
                  <span className="text-xs font-mono text-gray-500">|</span>
                  <span className="text-xs font-mono text-gray-400">IT Support Intern</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed font-sans">
                  Supported core office networks, managed Linux server setups, handled data access rules, and diagnosed hardware issues across server networks.
                </p>
              </div>
            </div>
          </div>

          {/* Achievement Wall */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-white font-sans flex items-center gap-2">
                <Award size={20} className="text-purple-400" />
                Credentials Wall
              </h3>
              <p className="text-gray-400 text-xs mt-1">My engineering, cloud, and security certifications.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: "AWS Cloud Foundations", issuer: "Amazon Web Services", url: "https://www.credly.com/badges/06cb6f51-843b-48ee-8398-89ab1948a18f/linked_in_profile" },
                { name: "AWS Cloud Architecting", issuer: "Amazon Web Services", url: "https://www.credly.com/badges/438571e8-3806-43b9-b9f7-9fbf30c8679a/print" },
                { name: "Oracle Multicloud Architect", issuer: "Oracle Cloud", url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=7496B34650FE9CF00F5504986C047DB8C91ABE28B7E8699EC404E5A1318AF8FA" },
                { name: "Google Android Internship", issuer: "Google Developer", url: "https://www.linkedin.com/in/devmusab/details/certifications/1725127758257/single-media-viewer/?profileId=ACoAAD4aR64B95XJYaaCWByOSS3SCTXjMscxA0Y" },
                { name: "Palo Alto Cybersecurity", issuer: "Palo Alto Networks", url: "https://www.linkedin.com/in/devmusab/details/certifications/1725128897545/single-media-viewer/?profileId=ACoAAD4aR64B9" },
                { name: "Zscaler Networking", issuer: "Zscaler Cloud Security", url: "https://verify.skilljar.com/c/cnj7oj7i2xuu" },
                { name: "Zscaler Fundamentals", issuer: "Zscaler Cloud Security", url: "https://badgr.com/public/assertions/dRBudKiVQBmCiK8RM2jR-Q" },
                { name: "Zscaler ZTCA", issuer: "Zscaler Cloud Security", url: "https://www.credly.com/badges/340bbf41-97ee-4ae2-89fa-05b641bd10b3/public_url" },
                { name: "GenAI 101 Pieces", issuer: "DeepLearning.AI", url: "https://www.linkedin.com/in/devmusab/" },
                { name: "Flipkart E-commerce", issuer: "Flipkart", url: "https://www.linkedin.com/in/devmusab/" },
                { name: "Wadhwani Softskills", issuer: "Wadhwani Foundation", url: "https://web.certificate.wfglobal.org/en/certificate?certificateId=6807ddcaeeacc2785e37ee9b" }
              ].map((cert, idx) => (
                <a
                  key={idx}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0a0a0c]/60 border border-white/5 p-4 rounded-xl hover:border-purple-500/20 hover:bg-white/5 transition-all flex flex-col justify-between group"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <p className="text-xs font-bold text-white font-sans leading-snug group-hover:text-purple-400 transition-colors">{cert.name}</p>
                      <p className="text-[10px] text-gray-500 font-mono mt-1">{cert.issuer}</p>
                    </div>
                    <ExternalLink size={12} className="text-gray-600 group-hover:text-purple-400 transition-colors flex-shrink-0 mt-0.5" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* PREMIUM SAAS CONTACT CONSOLE */}
        <section className="bg-[#0a0a0c]/60 border border-white/10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl glow-border max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] text-blue-400 font-mono font-bold tracking-widest uppercase">TUNNEL GATEWAY</span>
            <h3 className="text-3xl font-bold text-white font-sans">Let's Build Something Meaningful.</h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
              Have an interesting product challenge or need a robust full-stack / AI system? Send me a encrypted secure packet.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4 max-w-lg mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 font-mono uppercase tracking-wide">Identifier Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-[#030303] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  disabled={formStatus === "submitting" || formStatus === "success"}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-gray-500 font-mono uppercase tracking-wide">Return Tunnel Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-[#030303] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  disabled={formStatus === "submitting" || formStatus === "success"}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-gray-500 font-mono uppercase tracking-wide">Payload Message</label>
              <textarea
                rows={4}
                placeholder="Let's build a new serverless app..."
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full bg-[#030303] border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                disabled={formStatus === "submitting" || formStatus === "success"}
              />
            </div>

            {formStatus === "error" && (
              <p className="text-xs font-mono text-red-400">Error: All payload fields must be populated before transmitting.</p>
            )}

            {formStatus === "success" && (
              <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl text-center space-y-2 animate-pulse">
                <CheckCircle className="text-green-400 mx-auto animate-bounce" size={20} />
                <p className="text-xs font-mono text-green-400 font-bold uppercase">Transmission Successful</p>
                <p className="text-[10px] text-gray-400">Message successfully logged into Musab's local tunnel cache.</p>
              </div>
            )}

            <button
              type="submit"
              disabled={formStatus === "submitting" || formStatus === "success"}
              className={`w-full py-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                formStatus === "success"
                  ? "bg-green-600 text-white cursor-not-allowed"
                  : formStatus === "submitting"
                  ? "bg-blue-600/50 text-white cursor-wait"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              <Send size={12} />
              <span>{formStatus === "submitting" ? "TRANSMITTING..." : formStatus === "success" ? "PACKET TRANSMITTED" : "TRANSMIT PACKET"}</span>
            </button>
          </form>
        </section>
      </main>

      {/* Footer console */}
      <footer className="w-full border-t border-white/5 py-8 text-center text-xs font-mono text-gray-500 space-y-2">
        <p>© 2026 Mohammed Musab. All systems online.</p>
        <p className="text-[10px] text-gray-600">Built with Next.js 15, TypeScript, Tailwind CSS, & Lucide Icons.</p>
      </footer>
    </div>
  );
}

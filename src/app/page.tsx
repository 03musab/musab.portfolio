"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Clock,
  Briefcase,
  Award,
  ChevronRight,
  Send,
  ExternalLink,
  MapPin,
} from "lucide-react";

import AuroraBackground from "@/components/AuroraBackground";
import Terminal from "@/components/Terminal";
import StackRadar from "@/components/StackRadar";
import SystemDesign from "@/components/SystemDesign";
import AIEngineeringLab from "@/components/AIEngineeringLab";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProjectCaseStudies from "@/components/ProjectCaseStudy";
import FAQSection from "@/components/FAQSection";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import { SITE } from "@/lib/site";

export default function Page() {
  const router = useRouter();

  // Form State
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "error">("idle");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setFormStatus("error");
      return;
    }
    setFormStatus("submitting");
    // No backend wired yet — simulate transmission, then route to the thank-you page.
    setTimeout(() => {
      router.push(`/thanks?name=${encodeURIComponent(formState.name)}`);
    }, 900);
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

  const experience = [
    {
      dates: "Jun 2026 – Present",
      role: "Full Stack Engineer",
      company: "Luxure",
      meta: "Internship · Mumbai, India · Remote",
      current: true,
      dotClass: "bg-blue-500 ring-blue-500/20",
      tagClass: "text-blue-300 bg-blue-500/5 border-blue-500/10",
      tags: ["Full-Stack Development", "MongoDB", "React", "Node.js", "Express"],
    },
    {
      dates: "Oct 2025 – Dec 2025",
      role: "Data Analyst",
      company: "All India Council for Technical Education (AICTE)",
      meta: "Internship · Remote",
      current: false,
      dotClass: "bg-purple-500 ring-purple-500/20",
      tagClass: "text-purple-300 bg-purple-500/5 border-purple-500/10",
      tags: ["Python", "Data Analysis", "Automation", "Reporting"],
    },
    {
      dates: "Jan 2025 – Feb 2025",
      role: "Full Stack Developer",
      company: "FZ Creation Bags",
      meta: "Freelance · Mumbai, India · Hybrid",
      current: false,
      dotClass: "bg-yellow-500 ring-yellow-500/20",
      tagClass: "text-yellow-300 bg-yellow-500/5 border-yellow-500/10",
      tags: ["Bootstrap", "E-commerce", "Web Design", "Business Research"],
    },
    {
      dates: "Jul 2022 – Sep 2022",
      role: "Information Technology Specialist",
      company: "A TO Z COMPUTERS",
      meta: "Part-time · Mumbai, India · On-site",
      current: false,
      dotClass: "bg-gray-600 ring-gray-500/20",
      tagClass: "text-gray-300 bg-white/5 border-white/5",
      tags: ["Technical Leadership", "Linux", "Networking", "IT Support"],
    },
  ];

  const certifications = [
    { name: "AWS Cloud Foundations", issuer: "Amazon Web Services", url: "https://www.credly.com/badges/06cb6f51-843b-48ee-8398-89ab1948a18f/linked_in_profile" },
    { name: "AWS Cloud Architecting", issuer: "Amazon Web Services", url: "https://www.credly.com/badges/438571e8-3806-43b9-b9f7-9fbf30c8679a/print" },
    { name: "Oracle Multicloud Architect", issuer: "Oracle Cloud", url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=7496B34650FE9CF00F5504986C047DB8C91ABE28B7E8699EC404E5A1318AF8FA" },
    { name: "Google Android Internship", issuer: "Google Developer", url: "https://www.linkedin.com/in/devmusab/details/certifications/1725127758257/single-media-viewer/?profileId=ACoAAD4aR64B95XJYaaCWByOSS3SCTXjMscxA0Y" },
    { name: "Palo Alto Cybersecurity", issuer: "Palo Alto Networks", url: "https://www.linkedin.com/in/devmusab/details/certifications/1725128897545/single-media-viewer/?profileId=ACoAAD4aR64B9" },
    { name: "Zscaler ZTCA", issuer: "Zscaler Cloud Security", url: "https://www.credly.com/badges/340bbf41-97ee-4ae2-89fa-05b641bd10b3/public_url" },
    { name: "GenAI 101 Pieces", issuer: "DeepLearning.AI", url: "https://www.linkedin.com/in/devmusab/" },
  ];

  return (
    <div className="relative z-[1] min-h-screen text-[#f5f5f7] flex flex-col font-sans antialiasedSelection">
      {/* Animated aurora backdrop — CSS only, compositor-friendly */}
      <AuroraBackground />

      {/* Header Panel */}
      <SiteHeader />

      {/* Main Core View */}
      <main className="relative z-[1] flex-1 w-full max-w-7xl mx-auto px-6 py-10 lg:py-16 space-y-16 lg:space-y-24">
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

            {/* Quick Actions Panel — CTAs above the fold */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="px-5 py-3 rounded-lg text-xs font-mono font-bold bg-blue-600 text-white hover:bg-blue-500 transition-colors flex items-center gap-1.5"
              >
                <span>Start a Project</span>
                <ChevronRight size={14} />
              </Link>
              <Link
                href="/#projects"
                className="px-5 py-3 rounded-lg text-xs font-mono font-bold bg-white text-black hover:bg-gray-200 transition-colors flex items-center gap-1.5"
              >
                <span>View Deployed Projects</span>
                <ChevronRight size={14} />
              </Link>
              <a
                href={SITE.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-lg text-xs font-mono font-bold bg-[#0e0e11] text-gray-300 hover:text-white border border-white/10 hover:border-white/20 transition-all flex items-center gap-1.5"
              >
                <Award size={14} />
                <span>Fetch Resume (PDF)</span>
              </a>
            </div>

            {/* Response-time promise */}
            <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono select-none">
              <span className="px-2.5 py-1 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 font-bold flex items-center gap-1.5">
                <Clock size={11} />
                {SITE.responsePromise}
              </span>
              <span className="px-2.5 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 font-bold flex items-center gap-1.5">
                <MapPin size={11} />
                Based in {SITE.location}
              </span>
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

        {/* TECH CONSTELLATION — animated stack radar */}
        <StackRadar />

        <hr className="border-white/5" />

        {/* SYSTEM SCHEMAS & LAB COMPONENT ROW */}
        <section className="space-y-8">
          <SystemDesign />
          <AIEngineeringLab />
        </section>

        <hr className="border-white/5" />

        {/* FEATURED PROJECTS / CASE STUDIES SECTION */}
        <section id="projects" className="scroll-mt-24 space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white font-sans">Production-Grade Applications</h3>
              <p className="text-gray-400 text-sm mt-1">Three systems built end-to-end — the problem, the build, the outcome.</p>
            </div>
          </div>

          <ProjectCaseStudies />
        </section>

        {/* EXPERIENCE TIMELINE & ACHIEVEMENT WALL */}
        <section id="experience" className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
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
              {experience.map((item) => (
                <div key={item.role} className="space-y-2 relative">
                  <div className={`absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border border-[#030303] ring-2 ${item.dotClass}`} />
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-blue-400 font-bold">{item.dates}</span>
                    <span className="text-xs font-mono text-gray-500">|</span>
                    <span className="text-xs font-mono text-gray-300 font-semibold">{item.role}</span>
                    {item.current && (
                      <span className="px-1.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-[9px] font-mono text-green-400 font-bold uppercase tracking-wide">Current</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-500">
                    <span className="font-semibold text-gray-400">{item.company}</span>
                    <span>·</span>
                    <span>{item.meta}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.tags.map((s) => (
                      <span key={s} className={`text-[9px] font-mono border px-1.5 py-0.5 rounded ${item.tagClass}`}>{s}</span>
                    ))}
                  </div>
                </div>
              ))}
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
              {certifications.map((cert, idx) => (
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

        {/* FAQ SECTION */}
        <section id="faq" className="scroll-mt-24 space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-white font-sans">Frequently Asked Questions</h3>
            <p className="text-gray-400 text-sm mt-1">Common questions about how I work, what I build, and how to get started.</p>
          </div>
          <FAQSection />
        </section>

        {/* PREMIUM SAAS CONTACT CONSOLE */}
        <section id="contact" className="scroll-mt-24 bg-[#0a0a0c]/60 border border-white/10 p-6 sm:p-8 rounded-2xl sm:rounded-3xl glow-border max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-[10px] text-blue-400 font-mono font-bold tracking-widest uppercase">TUNNEL GATEWAY</span>
            <h3 className="text-3xl font-bold text-white font-sans">Let&apos;s Build Something Meaningful.</h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
              Have an interesting product challenge or need a robust full-stack / AI system? Send me a encrypted secure packet.
            </p>
            <p className="text-[10px] font-mono text-green-400 bg-green-500/5 border border-green-500/15 rounded-lg px-3 py-2 w-fit mx-auto flex items-center gap-1.5">
              <Clock size={11} />
              {SITE.responsePromise}
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
                  disabled={formStatus === "submitting"}
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
                  disabled={formStatus === "submitting"}
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
                disabled={formStatus === "submitting"}
              />
            </div>

            {formStatus === "error" && (
              <p className="text-xs font-mono text-red-400">Error: All payload fields must be populated before transmitting.</p>
            )}

            <button
              type="submit"
              disabled={formStatus === "submitting"}
              className={`w-full py-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                formStatus === "submitting"
                  ? "bg-blue-600/50 text-white cursor-wait"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              <Send size={12} />
              <span>{formStatus === "submitting" ? "TRANSMITTING..." : "TRANSMIT PACKET"}</span>
            </button>
          </form>
        </section>
      </main>

      {/* Footer console + sticky mobile CTA */}
      <SiteFooter />
      <StickyMobileCTA />
    </div>
  );
}

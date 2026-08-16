"use client";

import Image from "next/image";
import { ArrowRight, Mail, Phone, MapPin, ExternalLink, FileText } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import BentoGridSection from "@/components/BentoGridSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import CertificationsSection from "@/components/CertificationsSection";
import FluidGlassWrapper from "@/components/FluidGlassWrapper";
import GitHubSection from "@/components/GitHubSection";
import Reveal from "@/components/Reveal";
import OpenToWorkBadge from "@/components/OpenToWorkBadge";
import SendEmailButton from "@/components/SendEmailButton";
import { motion } from "motion/react";
import { Highlighter } from "@/components/ui/highlighter";
import { KineticText } from "@/components/ui/kinetic-text";
import { TextScramble } from "@/components/ui/text-scramble";
import { WordRotate } from "@/components/ui/word-rotate";
import { Magnetic } from "@/components/ui/magnetic";
import { TiltCard } from "@/components/ui/tilt-card";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { buttonHoverProps } from "@/lib/animations";
import { SITE } from "@/lib/site";

export default function Page() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground font-sans">
      <ScrollProgress />
      <CustomCursor />
      <SiteHeader />

      <main className="flex-1">
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section id="hero" className="relative pt-12 lg:pt-16">
          {/* blurred background glow — clipped so they don't cause scroll */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="pointer-events-none absolute top-[10%] -left-[18%] h-[min(42vw,420px)] w-[min(42vw,420px)] rounded-full bg-neutral-400/25 blur-3xl dark:bg-neutral-200/5" />
            <div className="pointer-events-none absolute bottom-[4%] -right-[12%] h-[min(36vw,380px)] w-[min(36vw,380px)] rounded-full bg-neutral-400/20 blur-3xl dark:bg-neutral-200/4" />
          </div>

          <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8 lg:min-h-[calc(100svh-8rem)]">
              {/* Left — headline */}
              <div className="space-y-6 lg:col-span-7">
                <span
                  className="fade-rise inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/70"
                  style={{ animationDelay: "0.1s" }}
                >
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                  </span>
                  <TextScramble>Available for Full-Stack &amp; AI Roles</TextScramble>
                </span>

                <h1
                  className="fade-rise font-display text-[clamp(2.8rem,10vw,6.5rem)] leading-[1.18] tracking-tight pb-[0.06em]"
                  style={{ animationDelay: "0.2s" }}
                >
                  <span className="block">
                    <KineticText text="Software" />
                  </span>
                  <WordRotate
                    words={[
                      "Engineer",
                      "Full-Stack",
                      "AI Developer",
                      "Architect",
                    ]}
                  />
                </h1>

                <p
                  className="fade-rise font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/50"
                  style={{ animationDelay: "0.45s" }}
                >
                  {SITE.location} · Computer Engineering &apos;26 (CGPA: 8.37/10)
                </p>

                <h2
                  className="fade-rise text-name-gradient font-display text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight"
                  style={{ animationDelay: "0.55s" }}
                >
                  Mohammed Musab
                </h2>

                <p
                  className="fade-rise max-w-xl text-base leading-relaxed text-foreground/75"
                  style={{ animationDelay: "0.65s" }}
                >
                  Results-driven{" "}
                  <Highlighter action="underline" color="#FF9800">
                    Computer Engineering
                  </Highlighter>{" "}
                  graduate with proven experience in{" "}
                  <Highlighter action="highlight" color="#3b82f6">
                    full-stack development
                  </Highlighter>
                  ,{" "}
                  <Highlighter action="highlight" color="#8b5cf6">
                    AI integration
                  </Highlighter>
                  , and{" "}
                  <Highlighter action="highlight" color="#10b981">
                    process automation
                  </Highlighter>
                  . Comfortable owning the entire stack from UI to backend to cloud deployment.
                </p>

                {/* Quick Contact Chips */}
                <div
                  className="fade-rise flex flex-wrap items-center gap-3 font-mono text-xs text-foreground/60"
                  style={{ animationDelay: "0.7s" }}
                >
                  <SendEmailButton variant="chip" />
                  <a
                    href={`tel:${SITE.phone}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/60 px-3 py-1 hover:text-foreground transition-colors"
                  >
                    <Phone size={12} />
                    {SITE.phone}
                  </a>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/60 px-3 py-1">
                    <MapPin size={12} />
                    {SITE.location}
                  </span>
                </div>

                {/* Actions */}
                <div
                  className="fade-rise flex flex-wrap items-center gap-3 pt-2"
                  style={{ animationDelay: "0.75s" }}
                >
                  <Magnetic>
                    <motion.a
                      href="#projects"
                      {...buttonHoverProps}
                      className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-background transition-opacity hover:opacity-85"
                    >
                      View Projects
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </motion.a>
                  </Magnetic>
                  <Magnetic>
                    <motion.a
                      href={SITE.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      {...buttonHoverProps}
                      className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-foreground/80 transition-colors hover:text-foreground"
                    >
                      <FileText size={14} />
                      Resume (PDF)
                      <ExternalLink size={12} />
                    </motion.a>
                  </Magnetic>
                </div>
              </div>

              {/* Right — avatar photo */}
              <div className="fade-rise flex justify-center lg:col-span-5" style={{ animationDelay: "0.5s" }}>
                <TiltCard className="p-2 border-0 bg-transparent shadow-none" data-cursor-label="ME">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                  >
                    <div className="relative w-64 rotate-[3deg] overflow-hidden rounded-[32px] border-2 border-line bg-surface shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] sm:w-72">
                      <div className="relative aspect-[4/5] bg-muted">
                        <Image
                          src="/avatar.png"
                          alt="Mohammed Musab — Software Engineer"
                          fill
                          className="object-cover"
                          sizes="288px"
                          priority
                        />
                      </div>
                    </div>
                    {/* Floating badge */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="absolute -bottom-3 -right-3 rounded-full border border-line bg-surface px-3 py-1.5 shadow-md cursor-pointer"
                    >
                      <span className="font-mono text-[9px] font-semibold text-foreground">🚀 Open to work</span>
                    </motion.div>
                  </motion.div>
                </TiltCard>
              </div>

            </div>
          </div>
        </section>

        {/* ── ABOUT ────────────────────────────────────────────── */}
        <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-6 py-pagebuilder lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <div className="space-y-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
                  Profile Summary
                </p>
                <h2 className="heading-glow font-display text-4xl leading-tight tracking-tight lg:text-5xl">
                  Full-stack engineering & AI{" "}
                  <em className="text-colorfull animate-gradient-x italic">integration</em>
                </h2>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-7" delay={0.1}>
              <div className="space-y-5 text-base leading-relaxed text-foreground/70 lg:text-lg">
                <p>
                  Results-driven Computer Engineering graduate (B.E. (Computer Engineering, 2026)) with proven hands-on experience in full-stack development, AI integration, and process automation.
                </p>
                <p>
                  Built and deployed production-grade applications — including a real-time collaborative coding platform and an AI-powered job recommendation engine — using Python, JavaScript, React, Firebase, REST APIs, and Git-based workflows.
                </p>
                <p>
                  Comfortable owning the entire stack from UI design to backend services to cloud deployment. Seeking a full-stack engineering role where I can ship user-facing products at scale.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── BENTO GRID ARCHITECTURE ──────────────────────────── */}
        <div className="mx-auto max-w-6xl px-6 py-pagebuilder lg:px-8">
          <BentoGridSection />
        </div>

        {/* ── SKILLS ───────────────────────────────────────────── */}
        <div className="mx-auto max-w-6xl px-6 py-pagebuilder lg:px-8">
          <SkillsSection />
        </div>

        {/* ── 3D FLUID GLASS SHOWCASE ───────────────────────────── */}
        <div className="mx-auto max-w-6xl px-6 py-pagebuilder lg:px-8">
          <FluidGlassWrapper />
        </div>

        {/* ── EXPERIENCE ───────────────────────────────────────── */}
        <div className="mx-auto max-w-6xl px-6 py-pagebuilder lg:px-8">
          <ExperienceSection />
        </div>

        {/* ── PROJECTS ─────────────────────────────────────────── */}
        {/* Owns its own full-width container so the accent background wash
            can span the entire viewport width */}
        <ProjectsSection />

        {/* ── GITHUB ─────────────────────────────────────────── */}
        <div className="mx-auto max-w-6xl px-6 py-pagebuilder lg:px-8">
          <GitHubSection />
        </div>

        {/* ── EDUCATION ────────────────────────────────────────── */}
        <div className="mx-auto max-w-6xl px-6 py-pagebuilder lg:px-8">
          <EducationSection />
        </div>

        {/* ── CERTIFICATIONS ───────────────────────────────────── */}
        <div className="mx-auto max-w-6xl px-6 py-pagebuilder lg:px-8">
          <CertificationsSection />
        </div>

        {/* ── CONTACT ──────────────────────────────────────────── */}
        <section id="contact" className="relative overflow-hidden pt-pagebuilder">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid items-center gap-14 lg:grid-cols-12">
              <Reveal className="flex justify-center lg:col-span-5">
                <OpenToWorkBadge />
              </Reveal>
              <Reveal className="lg:col-span-7" delay={0.1}>
                <div className="space-y-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
                    Get In Touch
                  </p>
                  <h2 className="heading-glow font-display text-4xl leading-tight tracking-tight lg:text-6xl">
                    Let&apos;s build something{" "}
                    <em className="text-colorfull animate-gradient-x italic">
                      extraordinary
                    </em>{" "}
                    together
                  </h2>
                  <p className="max-w-md leading-relaxed text-foreground/60">
                    Open to full-time Software Engineer & Full-Stack Developer opportunities. Feel free to connect via email or phone!
                  </p>

                  <div className="space-y-3 font-mono text-xs text-foreground/75">
                    <div className="flex items-center gap-2">
                      <SendEmailButton variant="text-link" />
                    </div>
                    <p className="flex items-center gap-2">
                      <Phone size={14} className="text-foreground/50" />
                      <a href={`tel:${SITE.phone}`} className="hover:text-foreground underline underline-offset-4">
                        {SITE.phone}
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin size={14} className="text-foreground/50" />
                      <span>{SITE.location}</span>
                    </p>
                  </div>

                  <div className="pt-2">
                    <SendEmailButton variant="hero-cta" />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Marquee footer */}
          <div className="marquee mt-16 border-y border-line py-5" aria-hidden="true">
            <div className="marquee-track">
              {[0, 1].map((i) => (
                <span
                  key={i}
                  className="font-display text-2xl uppercase tracking-[0.06em] text-foreground/25"
                >
                  Full Stack Engineer &nbsp; · &nbsp; Python & React Specialist &nbsp; · &nbsp; Cloud & Security &nbsp; · &nbsp;
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

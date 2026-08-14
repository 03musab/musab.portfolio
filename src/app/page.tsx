import Image from "next/image";
import { ArrowRight, Mail, Phone, MapPin, ExternalLink, FileText } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import CertificationsSection from "@/components/CertificationsSection";
import FluidGlassWrapper from "@/components/FluidGlassWrapper";
import Reveal from "@/components/Reveal";
import OpenToWorkBadge from "@/components/OpenToWorkBadge";
import { SITE } from "@/lib/site";

export default function Page() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground font-sans">
      <SiteHeader />

      <main className="flex-1">
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section id="hero" className="relative overflow-hidden pt-12 lg:pt-16">
          {/* blurred background glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[10%] -left-[18%] h-[min(42vw,420px)] w-[min(42vw,420px)] rounded-full bg-neutral-400/25 blur-3xl dark:bg-neutral-200/5"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[4%] -right-[12%] h-[min(36vw,380px)] w-[min(36vw,380px)] rounded-full bg-neutral-400/20 blur-3xl dark:bg-neutral-200/4"
          />

          <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid items-center gap-12 xl:grid-cols-12 xl:gap-8 xl:min-h-[calc(100svh-8rem)]">
              {/* Left — headline */}
              <div className="space-y-6 xl:col-span-7">
                <span
                  className="fade-rise inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/70"
                  style={{ animationDelay: "0.1s" }}
                >
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Open for Software Engineer / Full-Stack Roles
                </span>

                <h1
                  className="fade-rise font-display text-[clamp(2.8rem,10vw,6.5rem)] leading-[1.02] tracking-tight"
                  style={{ animationDelay: "0.2s" }}
                >
                  <span className="block">Software</span>
                  <span className="text-colorfull animate-gradient-x mask-reveal block italic">
                    Engineer
                  </span>
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
                  className="fade-rise max-w-xl text-base leading-relaxed text-foreground/65"
                  style={{ animationDelay: "0.65s" }}
                >
                  Results-driven Computer Engineering graduate with proven experience in full-stack development, AI integration, and process automation. Comfortable owning the entire stack from UI to backend to cloud deployment.
                </p>

                {/* Quick Contact Chips */}
                <div
                  className="fade-rise flex flex-wrap items-center gap-3 font-mono text-xs text-foreground/60"
                  style={{ animationDelay: "0.7s" }}
                >
                  <a
                    href={`mailto:${SITE.email}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/60 px-3 py-1 hover:text-foreground transition-colors"
                  >
                    <Mail size={12} />
                    {SITE.email}
                  </a>
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
                  <a
                    href="#projects"
                    className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-background transition-opacity hover:opacity-85"
                  >
                    View Projects
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>
                  <a
                    href={SITE.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-foreground/80 transition-colors hover:text-foreground"
                  >
                    <FileText size={14} />
                    Resume (PDF)
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              {/* Right — avatar/photo card */}
              <div className="fade-rise flex justify-center xl:col-span-5" style={{ animationDelay: "0.5s" }}>
                <div className="relative w-fit pb-16">
                  {/* Photo frame */}
                  <div className="relative w-56 rotate-[-2deg] rounded-[24px] border border-line bg-surface p-2.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] sm:w-64">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[16px] bg-muted">
                      <Image
                        src="/avatar.png"
                        alt="Mohammed Musab — Software Engineer"
                        fill
                        className="object-cover"
                        sizes="256px"
                        priority
                      />
                    </div>
                  </div>
                  {/* Floating Academic Badge */}
                  <div className="absolute -top-6 -left-8 hidden w-36 rotate-[-6deg] rounded-xl border border-line bg-surface p-3 shadow-lg sm:block">
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/50">
                      Degree
                    </p>
                    <p className="mt-1 font-display text-sm font-bold text-foreground">
                      B.E. Computer Engineering
                    </p>
                    <p className="font-mono text-[10px] text-emerald-400 font-semibold mt-0.5">
                      CGPA: 8.37 / 10
                    </p>
                  </div>
                  {/* Status chip */}
                  <div className="absolute -bottom-4 right-0 flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 shadow-md">
                    <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-medium text-foreground/80">
                      Available for full-time roles
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="hatched-divider" />

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

        <div className="hatched-divider" />

        {/* ── SKILLS ───────────────────────────────────────────── */}
        <div className="mx-auto max-w-6xl px-6 py-pagebuilder lg:px-8">
          <SkillsSection />
        </div>

        <div className="hatched-divider" />

        {/* ── 3D FLUID GLASS SHOWCASE ───────────────────────────── */}
        <div className="mx-auto max-w-6xl px-6 py-pagebuilder lg:px-8">
          <FluidGlassWrapper />
        </div>

        <div className="hatched-divider" />

        {/* ── EXPERIENCE ───────────────────────────────────────── */}
        <div className="mx-auto max-w-6xl px-6 py-pagebuilder lg:px-8">
          <ExperienceSection />
        </div>

        <div className="hatched-divider" />

        {/* ── PROJECTS ─────────────────────────────────────────── */}
        <div className="mx-auto max-w-6xl px-6 py-pagebuilder lg:px-8">
          <ProjectsSection />
        </div>

        <div className="hatched-divider" />

        {/* ── EDUCATION ────────────────────────────────────────── */}
        <div className="mx-auto max-w-6xl px-6 py-pagebuilder lg:px-8">
          <EducationSection />
        </div>

        <div className="hatched-divider" />

        {/* ── CERTIFICATIONS ───────────────────────────────────── */}
        <div className="mx-auto max-w-6xl px-6 py-pagebuilder lg:px-8">
          <CertificationsSection />
        </div>

        <div className="hatched-divider" />

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
                    <p className="flex items-center gap-2">
                      <Mail size={14} className="text-foreground/50" />
                      <a href={`mailto:${SITE.email}`} className="hover:text-foreground underline underline-offset-4">
                        {SITE.email}
                      </a>
                    </p>
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
                    <a
                      href={`mailto:${SITE.email}`}
                      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-foreground/20 bg-surface px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-foreground"
                    >
                      <span className="absolute inset-0 z-0 rounded-full bg-foreground transition-[clip-path] duration-500 ease-out [clip-path:circle(0%_at_100%_50%)] group-hover:[clip-path:circle(150%_at_100%_50%)]" />
                      <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-background">
                        Send Direct Email
                      </span>
                      <ArrowRight size={14} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-background" />
                    </a>
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

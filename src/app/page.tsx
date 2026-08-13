import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProjectsSection from "@/components/ProjectsSection";
import Reveal from "@/components/Reveal";
import OpenToWorkBadge from "@/components/OpenToWorkBadge";
import { SITE } from "@/lib/site";

export default function Page() {
  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground font-sans">
      <SiteHeader />

      <main className="flex-1">
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section id="hero" className="relative overflow-hidden pt-14 lg:pt-20">
          {/* blurred orbs */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[10%] -left-[18%] h-[min(42vw,420px)] w-[min(42vw,420px)] rounded-full bg-neutral-400/25 blur-3xl dark:bg-neutral-200/5"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[4%] -right-[12%] h-[min(36vw,380px)] w-[min(36vw,380px)] rounded-full bg-neutral-400/20 blur-3xl dark:bg-neutral-200/4"
          />

          <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid items-center gap-14 xl:grid-cols-12 xl:gap-8 xl:min-h-[calc(100svh-9rem)]">
              {/* Left — headline */}
              <div className="space-y-7 xl:col-span-7">
                <span
                  className="fade-rise inline-flex w-fit items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/70"
                  style={{ animationDelay: "0.1s" }}
                >
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                  </span>
                  Available for new work
                </span>

                <h1
                  className="fade-rise font-display text-[clamp(3rem,12vw,7.5rem)] leading-[1.02] tracking-tight"
                  style={{ animationDelay: "0.2s" }}
                >
                  <span className="block">Full stack</span>
                  <span className="text-colorfull animate-gradient-x mask-reveal block italic">
                    engineer
                  </span>
                </h1>

                <p
                  className="fade-rise font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50"
                  style={{ animationDelay: "0.45s" }}
                >
                  Remote from {SITE.location} · 4+ years building
                </p>

                <h2
                  className="fade-rise text-name-gradient font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-[1.05] tracking-tight"
                  style={{ animationDelay: "0.55s" }}
                >
                  Mohammed
                  <br />
                  Musab
                </h2>

                <p
                  className="fade-rise max-w-xl text-base leading-relaxed text-foreground/60"
                  style={{ animationDelay: "0.65s" }}
                >
                  I design and build AI-powered products and scalable software
                  end-to-end — from pixel-perfect interfaces to cloud
                  infrastructure — with a focus on real-time systems and
                  security that doesn&apos;t get in the way.
                </p>

                <div
                  className="fade-rise flex flex-wrap items-center gap-3"
                  style={{ animationDelay: "0.75s" }}
                >
                  <a
                    href="#work"
                    className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-background transition-opacity hover:opacity-85"
                  >
                    View my work
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-foreground/80 transition-colors hover:text-foreground"
                  >
                    Get in touch
                  </a>
                </div>
              </div>

              {/* Right — photo collage */}
              <div className="fade-rise flex justify-center xl:col-span-5" style={{ animationDelay: "0.5s" }}>
                <div className="relative w-fit pb-16">
                  {/* phone frame */}
                  <div className="relative w-52 rotate-[-3deg] rounded-[22px] border border-line bg-surface p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)] sm:w-56">
                    <div className="relative aspect-[9/16] overflow-hidden rounded-[14px] bg-muted">
                      <Image
                        src="/avatar.png"
                        alt="Mohammed Musab — Full-Stack Engineer & AI Builder"
                        fill
                        className="object-cover"
                        sizes="224px"
                      />
                    </div>
                  </div>
                  {/* polaroid */}
                  <div className="absolute -top-10 -left-12 hidden w-32 rotate-[-7deg] rounded-md bg-white p-2 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.35)] sm:block">
                    <div className="relative aspect-square overflow-hidden rounded-[4px] bg-neutral-200">
                      <Image
                        src="/avatar.png"
                        alt=""
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    </div>
                    <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.2em] text-neutral-500">
                      Mumbai, India
                    </p>
                  </div>
                  {/* status chip */}
                  <div className="absolute -bottom-6 right-0 flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 shadow-sm">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/70">
                      Open to opportunities
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
                  Know About Me
                </p>
                <h2 className="heading-glow font-display text-4xl leading-tight tracking-tight lg:text-5xl">
                  Full-Stack Developer and a little bit of{" "}
                  <em className="text-colorfull animate-gradient-x italic">everything</em>
                </h2>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-7" delay={0.1}>
              <div className="space-y-5 text-base leading-relaxed text-foreground/65 lg:text-lg">
                <p>
                  I&apos;m a Computer Engineering graduate (2026) and
                  full-stack developer based in {SITE.location}. I ship
                  products end-to-end — from pixel-perfect interfaces to
                  cloud infrastructure.
                </p>
                <p>
                  I specialise in AI-powered applications, real-time
                  collaboration tools, and secure systems. Recent work spans
                  an AI job-matching engine, a real-time collaborative code
                  editor, and an end-to-end encrypted messaging gateway.
                </p>
                <p>
                  When I&apos;m not building, I&apos;m exploring new tools,
                  contributing to open source, or thinking about how to make
                  software feel a little more human.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="hatched-divider" />

        {/* ── WORKSHOP ─────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-pagebuilder lg:px-8">
          <Reveal>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
              The Workshop
            </p>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Reveal className="lg:row-span-2">
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-line bg-surface p-7">
                <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_80%_0%,rgba(255,128,0,0.10),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/50">
                  01
                </p>
                <div className="relative space-y-4">
                  <h3 className="font-display text-3xl tracking-tight">
                    Let&apos;s build{" "}
                    <em className="text-colorfull animate-gradient-x italic">
                      together
                    </em>
                  </h3>
                  <p className="max-w-sm text-sm leading-relaxed text-foreground/60">
                    Have an idea that needs a builder? I partner with founders
                    and teams to take products from concept to launch — design,
                    code, deploy, repeat.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="h-full rounded-3xl border border-line bg-surface p-7 transition-colors duration-300 hover:border-foreground/30">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/50">
                  Tech Stack
                </p>
                <p className="mt-4 font-display text-xl tracking-tight leading-snug">
                  Next.js · React · Node.js · TypeScript · MongoDB · AWS ·
                  Python
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="h-full rounded-3xl border border-line bg-surface p-7 transition-colors duration-300 hover:border-foreground/30">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/50">
                  What You Get
                </p>
                <p className="mt-4 font-display text-xl tracking-tight leading-snug">
                  Clean, tested code. Fast iterations. Honest communication.
                  A product that actually ships.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.24} className="lg:col-span-2">
              <div className="h-full rounded-3xl border border-line bg-surface p-7 transition-colors duration-300 hover:border-foreground/30">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/50">
                  Flexible With Timezones
                </p>
                <p className="mt-4 max-w-2xl font-display text-xl tracking-tight leading-snug">
                  Remote-first and async-friendly. I&apos;ve collaborated
                  across IST and US/EU timezones without missing a beat.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="hatched-divider" />

        {/* ── PROJECTS ─────────────────────────────────────────── */}
        <div className="mx-auto max-w-6xl px-6 py-pagebuilder lg:px-8">
          <ProjectsSection />
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
                    Contact
                  </p>
                  <h2 className="heading-glow font-display text-4xl leading-tight tracking-tight lg:text-6xl">
                    Let&apos;s build something{" "}
                    <em className="text-colorfull animate-gradient-x italic">
                      great
                    </em>{" "}
                    together
                  </h2>
                  <p className="max-w-md leading-relaxed text-foreground/60">
                    Have an interesting product challenge, a project that needs
                    a full-stack/AI builder, or just want to say hi? My inbox
                    is always open.
                  </p>

                  {/* magnetic clip-path CTA */}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-foreground/20 bg-surface px-7 py-3.5 font-mono text-xs uppercase tracking-[0.2em] text-foreground"
                  >
                    <span className="absolute inset-0 z-0 rounded-full bg-foreground transition-[clip-path] duration-500 ease-out [clip-path:circle(0%_at_100%_50%)] group-hover:[clip-path:circle(150%_at_100%_50%)]" />
                    <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-background">
                      Get In Touch
                    </span>
                    <span className="relative z-10 grid size-5 place-items-center overflow-hidden">
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-500 ease-out group-hover:-translate-x-6 group-hover:text-background"
                      />
                      <ArrowRight
                        size={14}
                        className="absolute translate-x-6 transition-transform duration-500 ease-out group-hover:translate-x-0 group-hover:text-background"
                      />
                    </span>
                  </a>

                  <p className="flex items-center gap-2 font-mono text-[11px] text-foreground/50">
                    <Mail size={12} />
                    <a
                      href={`mailto:${SITE.email}`}
                      className="transition-colors hover:text-foreground"
                    >
                      {SITE.email}
                    </a>
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* marquee */}
          <div className="marquee mt-16 border-y border-line py-5" aria-hidden="true">
            <div className="marquee-track">
              {[0, 1].map((i) => (
                <span
                  key={i}
                  className="font-display text-2xl uppercase tracking-[0.06em] text-foreground/25"
                >
                  From concept to creation&nbsp; · &nbsp;Let&apos;s make it happen&nbsp;
                  · &nbsp;
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

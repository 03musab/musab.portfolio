"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import useEmblaCarousel from "embla-carousel-react";
import { useLenis } from "lenis/react";
import { motion, useMotionValue } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Layers } from "lucide-react";
import KineticHeading from "./KineticHeading";
import ProjectCaseDrawer, { type ProjectChapter } from "./ProjectCaseDrawer";
import ProjectMicroPreview from "./ProjectMicroPreview";
import { type ProjectId } from "./ProjectArchitectureView";
import { GithubIcon } from "./icons";
import { EASING_EDITORIAL, SPRING_TACTILE } from "@/lib/animations";
import { SITE } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const CHAPTER_PROGRESS = [0, 0.48, 0.9] as const;

const PROJECT_IMAGES: Record<ProjectId, string> = {
  jobsnap: "/assets/jobsnap.png",
  togcode: "/assets/togcode.png",
  talksphere: "/assets/talksphere.png",
};

export const PROJECTS: ProjectChapter[] = [
  {
    id: "jobsnap",
    chapter: "01",
    name: "JobSnap",
    subtitle: "Smart Job Search Automation Assistant",
    tag: "AI Job Helper",
    storyTitle: "From 40 open browser tabs to one automatic daily shortlist.",
    beats: [
      {
        stage: "The Problem",
        text: "Checking dozens of job websites every morning wasted hours and made it easy to miss good roles.",
      },
      {
        stage: "What I Built",
        text: "Created an automatic assistant that collects openings, reads your resume, and ranks your top matches in the background.",
      },
      {
        stage: "The Result",
        text: "Emails you daily best-fit jobs, saves your custom search filters, and exports clean Excel tracking sheets.",
      },
    ],
    tradeoff:
      "Ran job scanning and scoring as quiet background tasks so pages always feel fast and responsive, even when checking hundreds of roles at once.",
    tech: ["Python", "Flask", "Celery", "Redis", "Selenium", "SQLite"],
    github: "https://github.com/03musab/ai_job_agent",
    live: "https://aijobsnap.vercel.app/",
    accent: "#3b82f6",
    highlights: [
      "Automatically collects openings from multiple job websites and scores how well they match your resume.",
      "Keeps track of where you applied with daily email summaries, Excel sheet downloads, and guided form filling.",
      "Lets each user sign in cleanly, save favorite search filters, and manage custom match settings.",
    ],
  },
  {
    id: "togcode",
    chapter: "02",
    name: "Togcode",
    subtitle: "Live Shared Coding & Brainstorming Room",
    tag: "Live Collaboration",
    storyTitle: "No more laggy screen shares — write and plan together live.",
    beats: [
      {
        stage: "The Problem",
        text: "Remote teamwork slows down when people talk over blurry screenshots instead of editing the same workspace.",
      },
      {
        stage: "What I Built",
        text: "Built a shared code workspace with an interactive planning board where every teammate's edits show up instantly.",
      },
      {
        stage: "The Result",
        text: "Shared coding rooms that update under 50 milliseconds with built-in chat, accounts, and light/dark themes.",
      },
    ],
    tradeoff:
      "Sent tiny instant updates directly between teammates so typing feels immediate, while saving room files and chat history safely in the cloud.",
    tech: ["React", "Firebase", "WebSocket", "Context API", "Monaco Editor"],
    github: "https://github.com/03musab/togcode",
    live: "https://togcode.vercel.app",
    accent: "#6366f1",
    highlights: [
      "Multiple teammates can edit code in the exact same room with instant live updates.",
      "Includes a visual planning canvas where teams can draw ideas alongside built-in safety checks and fast image loading.",
      "Clean light and dark themes paired with group chat and private room login.",
    ],
  },
  {
    id: "talksphere",
    chapter: "03",
    name: "TalkSphere",
    subtitle: "Private End-to-End Encrypted Messaging App",
    tag: "Privacy & Security",
    storyTitle: "Locking every message and file before it leaves your device.",
    beats: [
      {
        stage: "The Problem",
        text: "Many ordinary chat services can still read your messages while passing through their servers.",
      },
      {
        stage: "What I Built",
        text: "Added a private lock right inside the user's browser so messages and files are scrambled before sending.",
      },
      {
        stage: "The Result",
        text: "Private 1-on-1 chats and file transfers with live checks proving messages arrived untouched.",
      },
    ],
    tradeoff:
      "Scrambled text and attachments inside the browser before delivery so even server logs only ever see locked gibberish — only the sender and receiver can read it.",
    tech: ["React", "Node.js", "Stream Chat", "CryptoJS"],
    github: "https://github.com/03musab/APSIT-Chat-app",
    live: "https://apsit-chat-frontend.onrender.com/",
    accent: "#14b8a6",
    highlights: [
      "Locks messages privately on your device before they ever touch the internet.",
      "Secures file uploads and downloads while automatically warning if any message was changed in transit.",
      "Simple direct messaging paired with a clear security check view so privacy is visible, not hidden.",
    ],
  },
];

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

function ShowcaseFrame({
  project,
  onInspect,
}: {
  project: ProjectChapter;
  onInspect: (project: ProjectChapter) => void;
}) {
  return (
    <div
      onClick={() => onInspect(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onInspect(project);
        }
      }}
      aria-label={`Inspect how ${project.name} works`}
      className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-background shadow-[0_30px_80px_-28px_rgba(0,0,0,0.6)]"
    >
      {/* Clean Top Studio Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-line bg-surface/90 px-4 py-2.5 backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-foreground/20" />
          <span className="size-2 rounded-full bg-foreground/20" />
          <span className="size-2 rounded-full bg-foreground/20" />
        </div>
        <span className="font-mono text-[10px] text-muted-foreground">
          {project.live.replace("https://", "").replace(/\/$/, "")}
        </span>
        <span
          className="font-mono text-[10px] font-semibold"
          style={{ color: project.accent }}
        >
          {project.chapter} / 03
        </span>
      </div>

      {/* High-Res Bespoke 3D Studio Render + Interactive React Micro-UI */}
      <div className="relative flex-1 overflow-hidden">
        <Image
          src={PROJECT_IMAGES[project.id]}
          alt={`${project.name} preview artwork`}
          fill
          sizes="(max-width: 1024px) 100vw, 680px"
          priority={project.id === "jobsnap"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Subtle bottom vignette so interactive micro-UI reads effortlessly */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"
        />

        <div
          data-theme="black"
          className="relative z-10 flex h-full flex-col justify-end p-4 sm:p-5"
        >
          <div className="flex items-end justify-between gap-4">
            <ProjectMicroPreview projectId={project.id} />

            <span className="liquid-glass hidden items-center gap-1.5 rounded-full px-3.5 py-1.5 font-display text-[12px] font-medium tracking-[-0.01em] text-white/95 transition-colors group-hover:text-white sm:inline-flex">
              <Layers size={12} />
              <span>How it works</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  const lenis = useLenis();
  const spineProgress = useMotionValue(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [drawerProject, setDrawerProject] = useState<ProjectChapter | null>(null);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  // Mobile Embla carousel state
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [mobileIndex, setMobileIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setMobileIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const jumpToDesktopChapter = useCallback(
    (index: number) => {
      const st = triggerRef.current;
      const targetProgress = CHAPTER_PROGRESS[index] ?? 0;
      if (!st) {
        setActiveChapter(index);
        spineProgress.set(targetProgress);
        return;
      }
      const targetY = st.start + (st.end - st.start) * targetProgress;
      if (lenis) {
        lenis.scrollTo(targetY, { duration: 1.0 });
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    },
    [lenis, spineProgress],
  );

  // GSAP Pinned Story Spine + 3D Depth Curtain Stack
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const pinEl = pinRef.current;
          const cards = cardRefs.current;
          if (!pinEl || cards.some((c) => !c)) return;

          const [c0, c1, c2] = cards as HTMLDivElement[];

          gsap.set(c0, {
            clipPath: "inset(0% 0% 0% 0% round 1rem)",
            scale: 1,
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            filter: "brightness(1)",
          });
          gsap.set([c1, c2], {
            clipPath: "inset(100% 0% 0% 0% round 1rem)",
            scale: 1.05,
            yPercent: 4,
            rotateX: 0,
            opacity: 1,
            filter: "brightness(1)",
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pinEl,
              pin: true,
              pinSpacing: true,
              scrub: 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              start: "top 24px",
              end: () => `+=${Math.round(window.innerHeight * 2.5)}`,
              onRefresh: (self) => {
                triggerRef.current = self;
              },
              onUpdate: (self) => {
                triggerRef.current = self;
                spineProgress.set(self.progress);
                const idx = self.progress >= 0.66 ? 2 : self.progress >= 0.28 ? 1 : 0;
                setActiveChapter((prev) => (prev === idx ? prev : idx));
              },
            },
          });

          // Initial dwell on Chapter 01 (0.0 -> 0.45)
          tl.to({}, { duration: 0.45 })
            // Beat 1 -> Beat 2: Chapter 01 recedes, Chapter 02 wipes upward (0.45 -> 1.25)
            .to(
              c0,
              {
                scale: 0.91,
                yPercent: -5,
                rotateX: 4,
                opacity: 0.35,
                filter: "brightness(0.55)",
                duration: 0.8,
                ease: "power2.inOut",
              },
              0.45,
            )
            .to(
              c1,
              {
                clipPath: "inset(0% 0% 0% 0% round 1rem)",
                scale: 1,
                yPercent: 0,
                duration: 0.8,
                ease: "power2.inOut",
              },
              0.45,
            )
            // Dwell on Chapter 02 (1.25 -> 1.75), then Beat 2 -> Beat 3 (1.75 -> 2.55)
            .to(
              c0,
              {
                scale: 0.84,
                yPercent: -9,
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut",
              },
              1.75,
            )
            .to(
              c1,
              {
                scale: 0.91,
                yPercent: -5,
                rotateX: 4,
                opacity: 0.35,
                filter: "brightness(0.55)",
                duration: 0.8,
                ease: "power2.inOut",
              },
              1.75,
            )
            .to(
              c2,
              {
                clipPath: "inset(0% 0% 0% 0% round 1rem)",
                scale: 1,
                yPercent: 0,
                duration: 0.8,
                ease: "power2.inOut",
              },
              1.75,
            )
            // Final dwell on Chapter 03 TalkSphere (2.55 -> 3.25) so all buttons & stack are clearly visible
            .to({}, { duration: 0.7 }, 2.55);

          return () => {
            triggerRef.current = null;
          };
        },
      );

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  const activeProject = PROJECTS[activeChapter] ?? PROJECTS[0];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative scroll-mt-24 py-pagebuilder"
    >
      {/* Desktop Pinned Illuminated Story Spine + 3D Depth Curtain Stack */}
      <div className="hidden lg:block">
        <div ref={pinRef} className="relative overflow-x-clip py-4">
          {/* Dynamic Per-Chapter Ambient Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-all duration-700"
            style={{
              background: `radial-gradient(55% 60% at 70% 55%, ${activeProject.accent}1a 0%, transparent 72%)`,
            }}
          />

          <div className="relative z-10 mx-auto max-w-6xl space-y-5 px-8">
            {/* Section Header */}
            <div className="flex items-end justify-between gap-6 border-b border-line pb-3.5">
              <div className="space-y-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
                  Featured Projects
                </p>
                <KineticHeading
                  text="My strongest work so far"
                  accentWords={["strongest"]}
                  className="font-display text-3xl font-semibold tracking-[-0.025em] text-foreground xl:text-4xl"
                />
              </div>

              <div className="flex items-center gap-6">
                <span className="font-mono text-xs text-muted-foreground">
                  {activeProject.chapter} / 03
                </span>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link text-xs"
                >
                  <span>All projects on GitHub</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            {/* Dual-Track Stage: Left Chapter Story + Right 3D Curtain Deck */}
            <div className="grid items-start gap-8 lg:grid-cols-12">
              {/* Left (5 cols) — Compact Chapter Selector + Active Story Spine */}
              <div className="flex flex-col justify-between space-y-4 lg:col-span-5">
                {/* Chapter Rail Tabs + Scrubbed Progress Bar */}
                <div className="space-y-2">
                  <div className="liquid-glass inline-flex flex-wrap items-center gap-1 rounded-full p-1">
                    {PROJECTS.map((project, idx) => {
                      const isActive = activeChapter === idx;
                      return (
                        <button
                          key={project.id}
                          type="button"
                          onClick={() => jumpToDesktopChapter(idx)}
                          className={`relative rounded-full px-3.5 py-1.5 font-display text-[12px] font-medium tracking-[-0.01em] transition-colors cursor-pointer ${
                            isActive
                              ? "text-foreground"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="act2-spine-tab"
                              transition={SPRING_TACTILE}
                              className="liquid-glass-fast absolute inset-0 rounded-full"
                            />
                          )}
                          <span className="relative z-10">
                            {project.chapter} · {project.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Continuous Scrubbed Progress Track */}
                  <div className="h-[2px] w-full overflow-hidden rounded-full bg-line">
                    <motion.div
                      className="h-full origin-left rounded-full transition-colors duration-500"
                      style={{
                        scaleX: spineProgress,
                        backgroundColor: activeProject.accent,
                      }}
                    />
                  </div>
                </div>

                {/* Active Chapter Narrative & Always-Visible Actions */}
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: EASING_EDITORIAL }}
                  className="space-y-3.5"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      <span
                        className="size-1.5 rounded-full"
                        style={{ backgroundColor: activeProject.accent }}
                      />
                      <span>
                        Project {activeProject.chapter} · {activeProject.tag}
                      </span>
                    </div>
                    <h3 className="font-display text-3xl font-semibold tracking-[-0.025em] text-foreground xl:text-4xl">
                      {activeProject.name}
                    </h3>
                    <p className="font-display text-[15px] font-medium leading-snug text-foreground/85">
                      &ldquo;{activeProject.storyTitle}&rdquo;
                    </p>
                  </div>

                  {/* Vertical Story Beats Spine */}
                  <ol className="relative space-y-2 border-l border-line pl-3.5">
                    {activeProject.beats.map((beat) => (
                      <li key={beat.stage} className="relative space-y-0.5">
                        <span
                          aria-hidden="true"
                          className="absolute -left-[18.5px] top-1.5 size-2 rounded-full border border-background"
                          style={{ backgroundColor: activeProject.accent }}
                        />
                        <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                          {beat.stage}
                        </span>
                        <p className="text-xs leading-snug text-foreground/85">
                          {beat.text}
                        </p>
                      </li>
                    ))}
                  </ol>

                  <p className="font-mono text-[10px] text-muted-foreground">
                    {activeProject.tech.join(" · ")}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    <button
                      type="button"
                      onClick={() => setDrawerProject(activeProject)}
                      className="btn-primary btn-compact group"
                    >
                      <span>How it works</span>
                      <span className="btn-lens-orb !size-5">
                        <Layers size={11} />
                      </span>
                    </button>

                    <a
                      href={activeProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="editorial-link"
                    >
                      <span>Open app</span>
                      <ExternalLink size={12} />
                    </a>

                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${activeProject.name} GitHub`}
                      className="editorial-link"
                    >
                      <GithubIcon size={12} />
                      <span>Code</span>
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Right (7 cols) — 3D Depth Curtain Stack */}
              <div
                className="relative aspect-[16/10] w-full lg:col-span-7"
                style={{ perspective: "1200px" }}
              >
                {PROJECTS.map((project, idx) => {
                  const isActive = activeChapter === idx;
                  return (
                    <div
                      key={project.id}
                      ref={(el) => {
                        cardRefs.current[idx] = el;
                      }}
                      className="absolute inset-0 will-change-transform"
                      style={{
                        zIndex: idx + 1,
                        pointerEvents: isActive ? "auto" : "none",
                        ...(reducedMotion
                          ? {
                              opacity: isActive ? 1 : 0,
                              clipPath: "inset(0% 0% 0% 0% round 1rem)",
                              transition: "opacity 220ms ease",
                            }
                          : {}),
                      }}
                    >
                      <ShowcaseFrame
                        project={project}
                        onInspect={setDrawerProject}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Swipeable Embla Story Carousel */}
      <div className="mx-auto max-w-6xl space-y-8 px-6 lg:hidden">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-1.5">
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
              Featured Projects
            </p>
            <KineticHeading
              text="My strongest work so far"
              accentWords={["strongest"]}
              className="font-display text-4xl font-semibold tracking-[-0.025em] text-foreground"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={mobileIndex === 0}
              aria-label="Previous project chapter"
              className="btn-icon size-9"
            >
              <ArrowLeft size={14} />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={mobileIndex === PROJECTS.length - 1}
              aria-label="Next project chapter"
              className="btn-icon size-9"
            >
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div className="liquid-glass inline-flex flex-wrap gap-1 rounded-full p-1">
          {PROJECTS.map((proj, idx) => {
            const active = mobileIndex === idx;
            return (
              <button
                key={proj.id}
                type="button"
                onClick={() => emblaApi?.scrollTo(idx)}
                className={`rounded-full px-3.5 py-1.5 font-display text-[12px] font-medium tracking-[-0.01em] transition-colors cursor-pointer ${
                  active
                    ? "liquid-glass-fast text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {proj.chapter} · {proj.name}
              </button>
            );
          })}
        </div>

        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {PROJECTS.map((project) => (
              <article key={project.id} className="min-w-0 flex-[0_0_100%] space-y-5 pr-2">
                <div className="aspect-[16/10] w-full">
                  <ShowcaseFrame project={project} onInspect={setDrawerProject} />
                </div>

                <div className="space-y-4">
                  <div>
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.2em]"
                      style={{ color: project.accent }}
                    >
                      Project {project.chapter} · {project.tag}
                    </p>
                    <h3 className="mt-1 font-display text-3xl font-semibold tracking-[-0.02em] text-foreground">
                      {project.name}
                    </h3>
                    <p className="mt-1 font-display text-base font-medium text-foreground/80">
                      &ldquo;{project.storyTitle}&rdquo;
                    </p>
                  </div>

                  <ol className="space-y-2 border-l border-line pl-3.5">
                    {project.beats.map((beat) => (
                      <li key={beat.stage} className="space-y-0.5">
                        <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                          {beat.stage}
                        </span>
                        <p className="text-xs leading-relaxed text-foreground/80">
                          {beat.text}
                        </p>
                      </li>
                    ))}
                  </ol>

                  <p className="font-mono text-[10px] text-muted-foreground">
                    {project.tech.join(" · ")}
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setDrawerProject(project)}
                      className="btn-primary btn-compact group"
                    >
                      <span>How it works</span>
                      <span className="btn-lens-orb !size-5">
                        <Layers size={11} />
                      </span>
                    </button>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="editorial-link"
                    >
                      <span>Open app</span>
                      <ExternalLink size={12} />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="editorial-link"
                    >
                      <GithubIcon size={12} />
                      <span>Code</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Vaul Architecture & Case Study Drawer */}
      <ProjectCaseDrawer
        project={drawerProject}
        open={drawerProject !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) setDrawerProject(null);
        }}
      />
    </section>
  );
}

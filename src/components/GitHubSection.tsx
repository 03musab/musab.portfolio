"use client";

import {
  cloneElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentProps,
} from "react";
import { GitHubCalendar } from "react-github-calendar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import NumberFlow from "@number-flow/react";

gsap.registerPlugin(ScrollTrigger);
import { motion, useInView } from "motion/react";
import { ArrowUpRight, ExternalLink, GitFork, Star } from "lucide-react";
import GitCommitStory from "./GitCommitStory";
import KineticHeading from "./KineticHeading";
import Reveal from "./Reveal";
import { GithubIcon } from "./icons";
import { EASING_EDITORIAL, SPRING_TACTILE } from "@/lib/animations";
import { LANG_COLORS, type GitHubSummary } from "@/lib/github";
import { SITE } from "@/lib/site";

function emptySubscribe() {
  return () => {};
}

function getMountedSnapshot(): boolean {
  return true;
}

function getMountedServerSnapshot(): boolean {
  return false;
}

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

function formatMonthYear(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatCalendarDateUtc(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

type CalendarRenderBlock = NonNullable<
  ComponentProps<typeof GitHubCalendar>["renderBlock"]
>;

export default function GitHubSection({ summary }: { summary: GitHubSummary }) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getMountedSnapshot,
    getMountedServerSnapshot,
  );
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  const calendarWrapRef = useRef<HTMLDivElement>(null);
  const calendarVisibleRef = useRef(false);
  const wavePlayedRef = useRef(false);
  const calendarRefreshedRef = useRef(false);
  const repoListRef = useRef<HTMLDivElement>(null);

  const [repoTab, setRepoTab] = useState<"featured" | "recent">("featured");
  const [hoveredRepo, setHoveredRepo] = useState<string | null>(null);
  const [inspectedDay, setInspectedDay] = useState<{
    date: string;
    count: number;
  } | null>(null);

  const renderCalendarBlock = useCallback<CalendarRenderBlock>(
    (block, activity) =>
      cloneElement(block, {
        onMouseEnter: (e) => {
          block.props.onMouseEnter?.(e);
          setInspectedDay({ date: activity.date, count: activity.count });
        },
        onFocus: (e) => {
          block.props.onFocus?.(e);
          setInspectedDay({ date: activity.date, count: activity.count });
        },
        onClick: (e) => {
          block.props.onClick?.(e);
          setInspectedDay({ date: activity.date, count: activity.count });
        },
      }),
    [],
  );

  // Trigger GSAP diagonal wave and refresh ScrollTrigger once async GitHubCalendar renders
  useEffect(() => {
    const wrap = calendarWrapRef.current;
    if (!wrap || !mounted) return;

    const refreshOnCalendarMount = () => {
      if (calendarRefreshedRef.current) return;
      const rects = wrap.querySelectorAll<SVGRectElement>("rect[data-date]");
      if (rects.length === 0) return;
      calendarRefreshedRef.current = true;
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const triggerWave = () => {
      if (reducedMotion || wavePlayedRef.current || !calendarVisibleRef.current) {
        return;
      }
      const rects = wrap.querySelectorAll<SVGRectElement>("rect[data-date]");
      if (rects.length === 0) return;
      wavePlayedRef.current = true;

      gsap.fromTo(
        rects,
        { opacity: 0.1, scale: 0.3, transformOrigin: "center" },
        {
          opacity: 1,
          scale: 1,
          duration: 0.42,
          ease: "back.out(1.6)",
          stagger: { amount: 0.9, from: "start" },
          clearProps: "transform",
        },
      );
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          calendarVisibleRef.current = true;
          triggerWave();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(wrap);

    const mo = new MutationObserver(() => {
      refreshOnCalendarMount();
      triggerWave();
    });
    mo.observe(wrap, { childList: true, subtree: true });

    refreshOnCalendarMount();

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [mounted, reducedMotion]);

  useGSAP(
    () => {
      const container = repoListRef.current;
      if (!container || reducedMotion) return;

      const spine = container.querySelector<HTMLElement>("[data-repo-spine]");
      const rows = gsap.utils.toArray<HTMLElement>("[data-repo-row]", container);
      if (rows.length === 0) return;

      if (spine) {
        gsap.fromTo(
          spine,
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top 82%",
              end: "bottom 58%",
              scrub: 0.35,
            },
          },
        );
      }

      gsap.fromTo(
        rows,
        { opacity: 0.35, x: -8 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.14,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 84%",
            end: "bottom 60%",
            scrub: 0.35,
          },
        },
      );
    },
    { scope: repoListRef, dependencies: [repoTab, reducedMotion] },
  );

  const displayedRepos = repoTab === "featured" ? summary.repos : summary.recentRepos;

  return (
    <section id="github" className="scroll-mt-24 py-pagebuilder">
      <div className="mx-auto max-w-6xl space-y-14 px-6 lg:px-8">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-muted-foreground">
                Ongoing Work
              </p>
              <KineticHeading
                text="Projects & daily progress"
                accentWords={["progress"]}
                className="font-display text-4xl font-semibold tracking-[-0.025em] text-foreground lg:text-5xl"
              />
            </div>

            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-2 font-mono text-xs text-foreground/85 transition-colors hover:text-accent"
            >
              <GithubIcon size={14} />
              <span>@{summary.username}</span>
              <span className="liquid-glass rounded-full px-2.5 py-0.5 text-[9px] uppercase tracking-wider text-muted-foreground">
                {summary.source === "live" ? "Live Data" : "Saved View"}
              </span>
              <ExternalLink
                size={12}
                className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </Reveal>

        {/* Part 1: Scroll-Drawn Growth Timeline + Recent Project Updates */}
        <GitCommitStory recentCommits={summary.recentCommits} />

        {/* Part 2: Live Activity Counters + Languages + Daily Calendar */}
        <div ref={statsRef} className="space-y-8">
          <div className="grid grid-cols-2 gap-6 border-b border-line pb-8 sm:grid-cols-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Public Projects
              </p>
              <p className="mt-1 font-display text-3xl font-semibold tracking-[-0.02em] text-foreground lg:text-4xl">
                <NumberFlow value={statsInView ? summary.publicRepos : 0} />
              </p>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Updates (Past Year)
              </p>
              <p className="mt-1 font-display text-3xl font-semibold tracking-[-0.02em] text-foreground lg:text-4xl">
                <NumberFlow value={statsInView ? summary.lastYearContributions : 0} />
              </p>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Days Active
              </p>
              <p className="mt-1 font-display text-3xl font-semibold tracking-[-0.02em] text-foreground lg:text-4xl">
                <NumberFlow value={statsInView ? summary.activeDays : 0} />
              </p>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Busiest Day
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-3xl font-semibold tracking-[-0.02em] text-foreground lg:text-4xl">
                  <NumberFlow value={statsInView ? summary.peakDay.count : 0} />
                </span>
                {summary.peakDay.date && (
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {formatMonthYear(summary.peakDay.date)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Proportional Programming Languages Bar */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>Programming Languages Used</span>
              <span>{summary.totalStars} Project Stars</span>
            </div>

            <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted">
              {summary.languageShare.map((item, idx) => (
                <motion.div
                  key={item.language}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: statsInView ? 1 : 0 }}
                  transition={{
                    duration: 0.7,
                    delay: idx * 0.08,
                    ease: EASING_EDITORIAL,
                  }}
                  style={{
                    flexGrow: item.count,
                    backgroundColor: item.color,
                    transformOrigin: "left",
                  }}
                  title={`${item.language}: ${item.percent}%`}
                  className="h-full first:rounded-l-full last:rounded-r-full"
                />
              ))}
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-1.5 pt-0.5 font-mono text-[11px] text-muted-foreground">
              {summary.languageShare.map((item) => (
                <span key={item.language} className="inline-flex items-center gap-1.5">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-foreground/85">{item.language}</span>
                  <span>{item.percent}%</span>
                </span>
              ))}
            </div>
          </div>

          {/* Wave-Staggered Activity Calendar + Interactive Day Inspector */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              <span>Past Year Daily Activity</span>
              {inspectedDay ? (
                <span className="text-foreground">
                  {formatCalendarDateUtc(inspectedDay.date)} ·{" "}
                  <span className="font-semibold text-accent">
                    {inspectedDay.count} update{inspectedDay.count === 1 ? "" : "s"}
                  </span>
                </span>
              ) : (
                <span>
                  Busiest Day: {formatCalendarDateUtc(summary.peakDay.date)} ·{" "}
                  <span className="text-foreground">
                    {summary.peakDay.count} updates
                  </span>
                </span>
              )}
            </div>

            <div
              ref={calendarWrapRef}
              onMouseLeave={() => setInspectedDay(null)}
              className="overflow-x-auto py-1"
            >
              {mounted ? (
                <GitHubCalendar
                  username={summary.username}
                  colorScheme="dark"
                  blockSize={13}
                  blockMargin={4}
                  blockRadius={3}
                  fontSize={12}
                  renderBlock={renderCalendarBlock}
                  theme={{
                    dark: ["#0f1624", "#172b54", "#1e448c", "#3b82f6", "#7dd3fc"],
                  }}
                  tooltips={{
                    activity: {
                      text: (activity) =>
                        `${activity.count} update${activity.count === 1 ? "" : "s"} on ${activity.date}`,
                    },
                  }}
                />
              ) : (
                <div className="h-[144px] w-full animate-pulse rounded-xl bg-muted/60" />
              )}
            </div>
          </div>
        </div>

        {/* Part 3: Top Projects | Recently Updated Interactive Project List */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div
              role="tablist"
              aria-label="Filter projects"
              className="liquid-glass inline-flex gap-1 rounded-full p-1"
            >
              {(
                [
                  { id: "featured", label: "Top Projects" },
                  { id: "recent", label: "Recently Updated" },
                ] as const
              ).map((tab) => {
                const active = repoTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => {
                      setRepoTab(tab.id);
                      requestAnimationFrame(() => ScrollTrigger.refresh());
                    }}
                    className={`relative rounded-full px-3.5 py-1.5 font-display text-[12.5px] font-medium tracking-[-0.01em] transition-colors cursor-pointer ${
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="github-repo-tab"
                        transition={SPRING_TACTILE}
                        className="liquid-glass-fast absolute inset-0 rounded-full"
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {repoTab === "featured" ? "Highlighted Work" : "Newest Activity First"}
            </span>
          </div>

          <div
            ref={repoListRef}
            onMouseLeave={() => setHoveredRepo(null)}
            className="relative pl-5"
          >
            {/* Vertical scroll progress spine beside public projects */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 left-1 top-3 w-px bg-line"
            />
            <div
              data-repo-spine
              aria-hidden="true"
              className="pointer-events-none absolute bottom-3 left-1 top-3 w-px bg-accent"
            />

            <div className="divide-y divide-line border-y border-line">
              {displayedRepos.map((repo) => {
                const isHovered = hoveredRepo === repo.name;
                const pushedLabel = formatMonthYear(repo.updatedAt);
                return (
                  <a
                    key={`${repoTab}-${repo.name}`}
                    data-repo-row
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredRepo(repo.name)}
                    className="group relative grid grid-cols-12 items-center gap-3 py-4 sm:px-3"
                  >
                    {isHovered && (
                      <motion.span
                        layoutId="github-row-glide"
                        transition={SPRING_TACTILE}
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-xl bg-surface/80"
                      />
                    )}

                    <span className="relative z-10 col-span-8 flex items-center gap-2.5 text-sm font-medium text-foreground transition-colors group-hover:text-accent sm:col-span-3">
                      <span
                        className="size-2 shrink-0 rounded-full"
                        style={{ background: LANG_COLORS[repo.language] || "#5b8cff" }}
                      />
                      <span className="truncate">{repo.displayName || repo.name}</span>
                    </span>

                    <span className="relative z-10 order-last col-span-12 line-clamp-2 text-xs text-muted-foreground sm:order-none sm:col-span-5 sm:line-clamp-1">
                      {repo.description}
                    </span>

                    <span className="relative z-10 col-span-4 flex items-center justify-end gap-3.5 font-mono text-[11px] text-muted-foreground sm:col-span-4">
                      {pushedLabel && (
                        <span className="hidden lg:inline">{pushedLabel}</span>
                      )}
                      <span className="hidden md:inline">{repo.language}</span>
                      <span className="inline-flex items-center gap-1">
                        <Star size={11} />
                        {repo.stars}
                      </span>
                      {repo.forks > 0 && (
                        <span className="inline-flex items-center gap-1">
                          <GitFork size={11} />
                          {repo.forks}
                        </span>
                      )}
                      <ArrowUpRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                      />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

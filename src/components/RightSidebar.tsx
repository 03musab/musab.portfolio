"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { animate, createScope, spring, stagger } from "animejs";
import {
  FloatingDelayGroup,
  FloatingPortal,
  autoUpdate,
  offset,
  shift,
  useDelayGroup,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { useLenis } from "lenis/react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { SITE } from "@/lib/site";

/* ─── Clean Filled Solid SVG Icons (Matching Reference Visual Weight) ─────── */
function HomeSolidSvg({ className = "size-[19px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
      <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
    </svg>
  );
}

function AboutSolidSvg({ className = "size-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path
        fillRule="evenodd"
        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ProjectsSolidSvg({ className = "size-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M11.644 1.59a.75.75 0 0 1 .712 0l9.75 5.25a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.32l9.75-5.25Z" />
      <path d="m3.265 10.602 7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13 1.37.739a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.71 0l-9.75-5.25a.75.75 0 0 1 0-1.32l1.37-.738Z" />
      <path d="m10.933 19.231-7.668-4.13-1.37.739a.75.75 0 0 0 0 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 0 0 0-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 0 1-2.134-.001Z" />
    </svg>
  );
}

function JourneySolidSvg({ className = "size-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3.82 6.08a.75.75 0 0 0-.9-.15l-4.5 2.25a.75.75 0 0 0-.34.34l-2.25 4.5a.75.75 0 0 0 1.005 1.005l4.5-2.25a.75.75 0 0 0 .34-.34l2.25-4.5a.75.75 0 0 0-.105-.855ZM12 13.125a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ActivitySolidSvg({ className = "size-[17px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
    </svg>
  );
}

function SkillsSolidSvg({ className = "size-[17px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16.5 7.5h-9v9h9v-9Z" />
      <path
        fillRule="evenodd"
        d="M8.25 2.25A.75.75 0 0 1 9 3v.75h2.25V3a.75.75 0 0 1 1.5 0v.75H15V3a.75.75 0 0 1 1.5 0v.75h.75a3 3 0 0 1 3 3v.75H21A.75.75 0 0 1 21 9h-.75v2.25H21a.75.75 0 0 1 0 1.5h-.75V15H21a.75.75 0 0 1 0 1.5h-.75v.75a3 3 0 0 1-3 3h-.75V21a.75.75 0 0 1-1.5 0v-.75h-2.25V21a.75.75 0 0 1-1.5 0v-.75H9V21a.75.75 0 0 1-1.5 0v-.75h-.75a3 3 0 0 1-3-3v-.75H3A.75.75 0 0 1 3 15h.75v-2.25H3a.75.75 0 0 1 0-1.5h.75V9H3a.75.75 0 0 1 0-1.5h.75v-.75a3 3 0 0 1 3-3h.75V3a.75.75 0 0 1 .75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h10.5a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V6.75Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ContactSolidSvg({ className = "size-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
      <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
    </svg>
  );
}

function LinkedInCircleSvg({ className = "size-[20px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2ZM9.25 16.5H7.08V10h2.17v6.5ZM8.165 9.085a1.26 1.26 0 1 1 0-2.52 1.26 1.26 0 0 1 0 2.52ZM17.25 16.5h-2.165v-3.16c0-.755-.015-1.725-1.05-1.725-1.055 0-1.215.825-1.215 1.67v3.215H10.65V10h2.08v.89h.03c.29-.55 1-1.13 2.055-1.13 2.195 0 2.435 1.445 2.435 3.325V16.5Z" />
    </svg>
  );
}

function GitHubCircleSvg({ className = "size-[20px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10Z"
      />
    </svg>
  );
}

function ResumeSolidSvg({ className = "size-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path
        fillRule="evenodd"
        d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z"
        clipRule="evenodd"
      />
      <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
    </svg>
  );
}

interface NavChapter {
  id: string;
  label: string;
  href: string;
  icon: ReactNode;
}

interface SocialItem {
  id: string;
  label: string;
  href: string;
  icon: ReactNode;
}

const CHAPTERS: NavChapter[] = [
  { id: "hero", label: "Home", href: "/#hero", icon: <HomeSolidSvg className="size-[17px]" /> },
  { id: "thesis", label: "About", href: "/#thesis", icon: <AboutSolidSvg className="size-[16px]" /> },
  { id: "projects", label: "Projects", href: "/#projects", icon: <ProjectsSolidSvg className="size-[16px]" /> },
  { id: "journey", label: "Journey", href: "/#journey", icon: <JourneySolidSvg className="size-[17px]" /> },
  { id: "github", label: "Activity", href: "/#github", icon: <ActivitySolidSvg className="size-[16px]" /> },
  { id: "skills", label: "Skills", href: "/#skills", icon: <SkillsSolidSvg className="size-[16px]" /> },
  { id: "contact", label: "Contact", href: "/#contact", icon: <ContactSolidSvg className="size-[16px]" /> },
];

const SOCIALS: SocialItem[] = [
  { id: "github", label: "GitHub", href: SITE.github, icon: <GitHubCircleSvg className="size-[18px]" /> },
  { id: "linkedin", label: "LinkedIn", href: SITE.linkedin, icon: <LinkedInCircleSvg className="size-[18px]" /> },
  { id: "resume", label: "Resume", href: SITE.resume, icon: <ResumeSolidSvg className="size-[16px]" /> },
];

const ORB_SPRING = {
  type: "spring" as const,
  stiffness: 380,
  damping: 30,
  mass: 0.7,
};

function FloatingDockTooltip({
  label,
  children,
}: {
  label: string;
  children: (props: {
    setRef: (node: HTMLElement | null) => void;
    refProps: Record<string, unknown>;
  }) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [tooltipTheme, setTooltipTheme] = useState<"black" | "white">("black");

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    if (nextOpen) {
      const current = document.getElementById("right-sidebar")?.dataset.theme;
      setTooltipTheme(current === "white" ? "white" : "black");
    }
    setOpen(nextOpen);
  }, []);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: handleOpenChange,
    placement: "left",
    whileElementsMounted: autoUpdate,
    middleware: [offset(14), shift({ padding: 12 })],
  });

  const { delay } = useDelayGroup(context);
  const hover = useHover(context, { move: false, delay });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const setRef = useCallback(
    (node: HTMLElement | null) => {
      refs.setReference(node);
    },
    [refs],
  );

  const setFloatingRef = useCallback(
    (node: HTMLDivElement | null) => {
      refs.setFloating(node);
    },
    [refs],
  );

  return (
    <>
      {children({ setRef, refProps: getReferenceProps() })}

      {open && (
        <FloatingPortal>
          <div
            ref={setFloatingRef}
            data-theme={tooltipTheme}
            style={floatingStyles}
            {...getFloatingProps()}
            className="liquid-glass-strong pointer-events-none z-[65] rounded-full px-3 py-1.5 font-display text-[12px] font-medium tracking-[-0.01em] text-foreground"
          >
            <span className="relative z-10 whitespace-nowrap">{label}</span>
          </div>
        </FloatingPortal>
      )}
    </>
  );
}

export default function RightSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const lenis = useLenis();

  const railRef = useRef<HTMLElement>(null);
  const dockItemRefs = useRef<(HTMLElement | null)[]>([]);
  const mobileSheetRef = useRef<HTMLDivElement>(null);

  const [activeId, setActiveId] = useState<string>("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileTheme, setMobileTheme] = useState<"black" | "white">("black");

  const activeChapter =
    CHAPTERS.find((c) => c.id === activeId) ?? CHAPTERS[0];

  // 1) Anime.js v4 smooth staggered entrance on mount
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scope = createScope({ root: rail }).add(() => {
      animate(".dock-node", {
        translateX: [16, 0],
        scale: [0.82, 1],
        opacity: [0, 1],
        delay: stagger(42, { start: 160 }),
        ease: spring({ stiffness: 280, damping: 24 }),
      });
    });

    return () => scope.revert();
  }, []);

  // 2) Anime.js v4 mobile sheet stagger
  useEffect(() => {
    if (!mobileOpen) return;
    const sheet = mobileSheetRef.current;
    if (!sheet) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scope = createScope({ root: sheet }).add(() => {
      animate(".mobile-dock-row", {
        translateX: [18, 0],
        opacity: [0, 1],
        delay: stagger(32),
        ease: spring({ stiffness: 300, damping: 24 }),
      });
    });

    return () => scope.revert();
  }, [mobileOpen]);

  // 3) Track active chapter on scroll (maps #github seamlessly to Journey/Skills flow)
  useEffect(() => {
    if (pathname !== "/") return;

    let rafId = 0;
    let ticking = false;

    const syncActive = () => {
      ticking = false;
      const docEl = document.documentElement;
      const maxScroll = Math.max(1, docEl.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));

      if (progress >= 0.95) {
        setActiveId((prev) => (prev === "contact" ? prev : "contact"));
        return;
      }

      const triggerY = Math.min(240, window.innerHeight * 0.36);
      let current = CHAPTERS[0].id;
      for (const ch of CHAPTERS) {
        const el = document.getElementById(ch.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= triggerY) {
          current = ch.id;
        }
      }
      setActiveId((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(syncActive);
    };

    syncActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // 4) Anime.js v4 soft dock wave magnification on hover
  const handleItemHover = useCallback((hoveredIdx: number) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    dockItemRefs.current.forEach((el, idx) => {
      if (!el) return;
      const dist = Math.abs(idx - hoveredIdx);
      const scaleVal = dist === 0 ? 1.13 : dist === 1 ? 1.04 : 1;
      animate(el, {
        scale: scaleVal,
        ease: spring({ stiffness: 360, damping: 22 }),
      });
    });
  }, []);

  const handleDockLeave = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    dockItemRefs.current.forEach((el) => {
      if (!el) return;
      animate(el, {
        scale: 1,
        ease: spring({ stiffness: 300, damping: 24 }),
      });
    });
  }, []);

  const navigateToChapter = useCallback(
    (chapter: NavChapter, el: HTMLElement | null) => {
      setMobileOpen(false);

      if (el && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        animate(el, {
          scale: [0.92, 1.08, 1],
          duration: 380,
          ease: "out(3)",
        });
      }

      if (pathname !== "/") {
        router.push(chapter.href);
        return;
      }

      if (chapter.id === "hero") {
        if (lenis) {
          lenis.scrollTo(0, { duration: 1.05 });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      const targetEl = document.getElementById(chapter.id);
      if (!targetEl) return;

      if (lenis) {
        lenis.scrollTo(targetEl, { offset: -24, duration: 1.0 });
      } else {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    },
    [lenis, pathname, router],
  );

  const toggleMobileMenu = useCallback(() => {
    setMobileOpen((prev) => {
      const next = !prev;
      if (next) {
        const current = document.getElementById("right-sidebar-mobile")?.dataset.theme;
        setMobileTheme(current === "white" ? "white" : "black");
      }
      return next;
    });
  }, []);

  return (
    <>
      {/* ── DESKTOP LIQUID GLASS VERTICAL DOCK SIDEBAR (RIGHT) ─────────────── */}
      <aside
        id="right-sidebar"
        data-theme="black"
        ref={railRef}
        onMouseLeave={handleDockLeave}
        aria-label="Primary navigation"
        className="fixed right-2.5 top-1/2 z-50 hidden -translate-y-1/2 lg:right-3.5 md:block"
      >
        <FloatingDelayGroup delay={{ open: 100, close: 60 }}>
          <nav className="liquid-glass-dock no-scrollbar flex max-h-[94svh] flex-col items-center gap-0.5 overflow-y-auto rounded-full p-1">
            {/* Primary Section Icons */}
            {CHAPTERS.map((chapter, idx) => {
              const isActive = activeId === chapter.id;
              return (
                <FloatingDockTooltip key={chapter.id} label={chapter.label}>
                  {({ setRef, refProps }) => (
                    <button
                      ref={(node) => {
                        dockItemRefs.current[idx] = node;
                        setRef(node);
                      }}
                      type="button"
                      aria-label={chapter.label}
                      aria-current={isActive ? "location" : undefined}
                      onClick={(e) => navigateToChapter(chapter, e.currentTarget)}
                      onMouseEnter={() => handleItemHover(idx)}
                      {...refProps}
                      className={`dock-node relative grid size-9 place-items-center rounded-full transition-colors duration-200 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                        isActive
                          ? "text-foreground"
                          : "text-foreground/48 hover:text-foreground/90"
                      }`}
                    >
                      {/* Sliding Plush Circular Liquid Glass Active Orb */}
                      {isActive && (
                        <motion.span
                          layoutId="right-dock-active-orb"
                          transition={ORB_SPRING}
                          aria-hidden="true"
                          className="liquid-glass-orb pointer-events-none absolute inset-0 rounded-full"
                        />
                      )}

                      <span className="relative z-10 flex flex-col items-center justify-center">
                        <span
                          className={`transition-transform duration-200 ${
                            isActive ? "-translate-y-[2px]" : ""
                          }`}
                        >
                          {chapter.icon}
                        </span>

                        {/* Signature tiny glowing indicator dot tucked beneath active icon */}
                        <span
                          aria-hidden="true"
                          className={`mt-[2px] size-[3px] rounded-full transition-all duration-300 ${
                            isActive
                              ? "scale-100 bg-foreground/90 opacity-100"
                              : "scale-0 opacity-0"
                          }`}
                        />
                      </span>
                    </button>
                  )}
                </FloatingDockTooltip>
              );
            })}

            {/* Minimal Horizontal Glass Divider */}
            <span
              aria-hidden="true"
              className="my-1 h-px w-5 rounded-full bg-foreground/18"
            />

            {/* Social & Resume SVG Icons (GitHub · LinkedIn · Resume) */}
            {SOCIALS.map((social, sIdx) => {
              const globalIdx = CHAPTERS.length + sIdx;
              return (
                <FloatingDockTooltip key={social.id} label={social.label}>
                  {({ setRef, refProps }) => (
                    <a
                      ref={(node) => {
                        dockItemRefs.current[globalIdx] = node;
                        setRef(node);
                      }}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      onMouseEnter={() => handleItemHover(globalIdx)}
                      {...refProps}
                      className="dock-node relative grid size-9 place-items-center rounded-full text-foreground/52 transition-colors duration-200 hover:bg-foreground/8 hover:text-foreground outline-none focus-visible:ring-1 focus-visible:ring-accent"
                    >
                      <span className="relative z-10">{social.icon}</span>
                    </a>
                  )}
                </FloatingDockTooltip>
              );
            })}
          </nav>
        </FloatingDelayGroup>
      </aside>

      {/* ── MOBILE RIGHT-EDGE LIQUID GLASS TRIGGER & DRAWER (< md) ────────── */}
      <div
        id="right-sidebar-mobile"
        data-theme="black"
        className="fixed bottom-5 right-4 z-50 md:hidden"
      >
        <button
          type="button"
          onClick={toggleMobileMenu}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          className="liquid-glass-dock inline-flex items-center gap-2 rounded-full px-3.5 py-2.5 font-display text-[12.5px] font-medium text-foreground cursor-pointer"
        >
          <span className="relative z-10 size-1.5 rounded-full bg-accent" />
          <span className="relative z-10">{activeChapter.label}</span>
          <span className="relative z-10 text-muted-foreground">
            {mobileOpen ? <X size={14} /> : <Menu size={14} />}
          </span>
        </button>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/45 backdrop-blur-xs md:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <div
            ref={mobileSheetRef}
            data-theme={mobileTheme}
            onClick={(e) => e.stopPropagation()}
            className="liquid-glass-strong fixed bottom-20 right-4 w-56 overflow-hidden rounded-3xl p-2"
          >
            <nav aria-label="Mobile navigation" className="relative z-10 flex flex-col gap-0.5">
              {CHAPTERS.map((chapter) => {
                const isActive = activeId === chapter.id;
                return (
                  <button
                    key={chapter.id}
                    type="button"
                    onClick={() => navigateToChapter(chapter, null)}
                    className={`mobile-dock-row flex w-full items-center justify-between rounded-2xl px-3.5 py-2.5 text-left transition-colors cursor-pointer ${
                      isActive
                        ? "bg-foreground/10 text-foreground"
                        : "text-foreground/75 hover:bg-foreground/6 hover:text-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-2.5 font-display text-[13.5px] font-medium">
                      <span className="opacity-85">{chapter.icon}</span>
                      <span>{chapter.label}</span>
                    </span>
                    {isActive && (
                      <span className="size-1.5 rounded-full bg-accent" />
                    )}
                  </button>
                );
              })}

              <span className="my-1.5 h-px w-full bg-line" />

              <div className="mobile-dock-row flex items-center justify-around px-2 py-1">
                {SOCIALS.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid size-10 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

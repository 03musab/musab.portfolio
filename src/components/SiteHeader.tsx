"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Command, CornerDownLeft, Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { SITE, SECTION_LINKS } from "@/lib/site";

const COMMANDS = [
  { label: "Home", hint: "Go to top", href: "/" },
  { label: "About", hint: "Profile summary & bio", href: "/#about" },
  { label: "Technical Skills", hint: "Languages & Frameworks", href: "/#skills" },
  { label: "Experience", hint: "Work history", href: "/#experience" },
  { label: "Projects", hint: "Production-grade apps", href: "/#projects" },
  { label: "Education", hint: "Academic background", href: "/#education" },
  { label: "Certifications", hint: "AWS & Oracle credentials", href: "/#certifications" },
  { label: "Get in touch", hint: "Open contact", href: "/#contact" },
  { label: "GitHub", hint: "External link", href: SITE.github, external: true },
  { label: "LinkedIn", hint: "External link", href: SITE.linkedin, external: true },
  { label: "Send an email", hint: "Gmail web Compose", href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SITE.email)}`, external: true },
];

/** The pinned nav sits this many px below the very top (wrapper pt-3). */
const PIN_OFFSET = 12;

/* Corner radius morph: rectangular at rest -> pill once pinned. */
const RECT_RADIUS = 8;
const PILL_RADIUS = 32;

/* The morph completes when the Skills section comes into view — anchorTop -
   ANCHOR_OFFSET. ANCHOR_OFFSET matches the sections' scroll-mt-24 (96px), the
   scroll position where the anchor lands. MORPH_SCROLL is only a fallback if
   neither #skills nor #about can be measured. */
const ANCHOR_OFFSET = 96;
const MORPH_SCROLL = 160;

/* The rectangle spans 70% of the gap between monogram and icons — noticeably
   shorter than full width but still wider than the compact pill. */
const RECT_WIDTH_RATIO = 0.7;

/** Desktop pill nav — rendered both in the header row (placeholder) and in the fixed nav. */
function PillNav({
  activeSection,
  className = "",
}: {
  activeSection: string | null;
  className?: string;
}) {
  return (
    <nav
      aria-label="Primary"
      className={`hidden items-center justify-center gap-1 border border-line/70 bg-background/50 px-1.5 py-1 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.22)] backdrop-blur-xl backdrop-saturate-150 md:flex ${className}`}
    >
      {SECTION_LINKS.map((item) => {
        const isActive = activeSection === item.href.replace("/#", "");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
              isActive
                ? "bg-foreground text-background hover:opacity-85"
                : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

/** Mobile chip nav — same placeholder/fixed treatment as the desktop pill. */
function ChipNav({ className = "" }: { className?: string }) {
  return (
    <nav
      aria-label="Primary mobile"
      className={`flex flex-wrap items-center justify-center gap-1 md:hidden ${className}`}
    >
      {SECTION_LINKS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-full border border-line/70 bg-background/40 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-foreground/70 backdrop-blur-md"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // The fixed nav wrapper's transform is driven directly from scroll position
  // (via rAF), so the pill is glued to its spot in the header row while the row
  // is on screen, then glides up and pins at the top — no jumps, no fades.
  const navWrapRef = useRef<HTMLDivElement>(null);
  const desktopPhRef = useRef<HTMLDivElement>(null);
  const mobilePhRef = useRef<HTMLDivElement>(null);
  const homeTopRef = useRef(0);
  const navElRef = useRef<HTMLElement | null>(null);
  const gapWRef = useRef(0); // width of the space between monogram and icons
  const morphEndRef = useRef(MORPH_SCROLL); // scrollY at which the morph is complete

  useLayoutEffect(() => {
    const wrap = navWrapRef.current;
    if (!wrap) return;

    const pickPlaceholder = () => {
      const desktop = desktopPhRef.current;
      const mobile = mobilePhRef.current;
      if (desktop && desktop.getBoundingClientRect().height > 0) return desktop;
      if (mobile && mobile.getBoundingClientRect().height > 0) return mobile;
      return desktop;
    };

    // The visible nav inside the fixed wrapper (desktop pill or mobile chips).
    const pickVisibleNav = () => {
      const navs = wrap.querySelectorAll("nav");
      for (const n of navs) {
        if (n.getBoundingClientRect().height > 0) return n;
      }
      return navs[0] ?? null;
    };

    const apply = () => {
      // Translate the fixed pill so it matches the placeholder's screen
      // position; once it reaches the pinned top, keep it there.
      const y = Math.max(0, homeTopRef.current - window.scrollY - PIN_OFFSET);
      wrap.style.transform = `translateY(${y}px)`;

      // Morph the corners from rectangle to pill over a long scroll distance.
      // Only the transform + border-radius are updated per frame (the glass
      // blur and shadow stay static via classes) to keep frames cheap/smooth.
      const nav = navElRef.current;
      if (!nav) return;

      const end = Math.max(1, morphEndRef.current);
      const raw = Math.min(1, Math.max(0, window.scrollY / end));
      const eased = raw * raw * (3 - 2 * raw); // smoothstep
      const radius = RECT_RADIUS + (PILL_RADIUS - RECT_RADIUS) * eased;
      // Wide rectangle at rest, shrinking to a compact pill once pinned.
      nav.style.borderRadius = `${radius}px`;
      nav.style.minWidth = `${gapWRef.current * (1 - eased)}px`;
    };

    const measure = () => {
      navElRef.current = pickVisibleNav();
      const ph = pickPlaceholder();
      if (!ph) return;
      homeTopRef.current = ph.getBoundingClientRect().top + window.scrollY;
      gapWRef.current = ph.getBoundingClientRect().width * RECT_WIDTH_RATIO;

      // Morph completes when the Skills section lands at the anchor offset
      // (falling back to #about, then to the fixed distance).
      const anchor = document.getElementById("skills") ?? document.getElementById("about");
      const anchorTop = anchor ? anchor.getBoundingClientRect().top + window.scrollY : 0;
      morphEndRef.current =
        anchorTop > ANCHOR_OFFSET ? anchorTop - ANCHOR_OFFSET : MORPH_SCROLL;

      apply();
    };

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };

    measure(); // position before first paint
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Scroll-spy: highlight the nav item for the section currently in view.
  useEffect(() => {
    const ids = SECTION_LINKS.map((l) => l.href.replace("/#", ""));
    const onScroll = () => {
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 120) current = id;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        setQuery("");
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMenu = () => {
    setQuery("");
    setOpen(true);
  };

  return (
    <>
      {/* Fixed nav — glides from the header row to the pinned top, morphing
          from rectangular to pill as it pins. The wrapper is click-transparent
          so it never blocks the header's own controls (theme toggle, command
          menu, monogram) it glides over; only the navs themselves are
          interactive. */}
      <div
        ref={navWrapRef}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-3 will-change-transform lg:px-8"
      >
        <div className="pointer-events-none mx-auto flex max-w-6xl justify-center">
          <PillNav activeSection={activeSection} className="pointer-events-auto" />
          <ChipNav className="pointer-events-auto" />
        </div>
      </div>

      {/* Top bar — scrolls away with the page */}
      <header className="w-full px-4 pt-4 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          {/* Monogram */}
          <Link href="/" aria-label="Homepage" className="group flex shrink-0 items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full border border-line/70 bg-background/50 shadow-[0_2px_8px_rgba(0,0,0,0.06)] backdrop-blur-md transition-transform duration-300 group-hover:-rotate-12">
              <span className="text-colorfull animate-gradient-x font-display text-lg italic">M</span>
            </span>
            <span className="hidden font-mono text-xs uppercase tracking-[0.24em] text-foreground/60 sm:block">
              {SITE.name}
            </span>
          </Link>

          {/* Invisible placeholder fills the space between the monogram and
              the icons, so the wide rectangle keeps them aligned while the
              fixed pill tracks and shrinks over it */}
          <div ref={desktopPhRef} className="invisible hidden flex-1 min-w-0 md:block">
            <PillNav activeSection={activeSection} />
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={openMenu}
              className="grid size-9 place-items-center rounded-full border border-line/70 bg-background/50 text-foreground/70 shadow-sm backdrop-blur-md transition-colors hover:text-foreground"
              aria-label="Open command menu"
            >
              <Search size={15} />
            </button>
          </div>
        </div>

        {/* Mobile chips placeholder */}
        <div className="mx-auto mt-3 flex max-w-6xl justify-center md:hidden">
          <div ref={mobilePhRef} className="invisible">
            <ChipNav />
          </div>
        </div>
      </header>

      {/* Command menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 px-4 pt-24 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Command menu"
              className="w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2 border-b border-line px-4">
                <Command size={14} className="text-foreground/40" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search…"
                  className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-foreground/40"
                />
                <kbd className="rounded-md border border-line bg-muted px-1.5 py-0.5 font-mono text-[10px] text-foreground/50">
                  esc
                </kbd>
              </div>
              <div className="max-h-72 overflow-y-auto p-2">
                {filtered.length === 0 && (
                  <p className="px-3 py-6 text-center font-mono text-xs text-foreground/50">
                    No results for &ldquo;{query}&rdquo;
                  </p>
                )}
                {filtered.map((cmd) => (
                  <Link
                    key={cmd.label}
                    href={cmd.href}
                    onClick={() => setOpen(false)}
                    target={cmd.external ? "_blank" : undefined}
                    rel={cmd.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-foreground/5"
                  >
                    <span className="flex items-center gap-3">
                      {cmd.external && (
                        <ArrowUpRight size={13} className="text-foreground/40" />
                      )}
                      <span className="text-sm">{cmd.label}</span>
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[10px] text-foreground/40">
                      {cmd.hint}
                      {!cmd.external && <CornerDownLeft size={10} />}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

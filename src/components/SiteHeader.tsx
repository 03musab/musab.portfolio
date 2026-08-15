"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  { label: "Send an email", hint: `mailto ${SITE.email}`, href: `mailto:${SITE.email}`, external: true },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  // Glass bar: turn on the frosted background once the page is scrolled.
  // Also track overall page scroll progress for the header progress bar.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-line/60 bg-background/60 px-4 pb-3 pt-3 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.25)] backdrop-blur-xl backdrop-saturate-150 lg:px-8"
          : "bg-transparent px-4 pt-4 lg:px-8"
      }`}
    >
      {/* Scroll progress bar (bottom edge of the header) */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#ff8000] via-[#f0c] to-[#04f] transition-[width] duration-150 ease-out"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        {/* Monogram */}
        <Link href="/" aria-label="Homepage" className="group flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full border border-line/70 bg-background/50 shadow-[0_2px_8px_rgba(0,0,0,0.06)] backdrop-blur-md transition-transform duration-300 group-hover:-rotate-12">
            <span className="text-colorfull animate-gradient-x font-display text-lg italic">M</span>
          </span>
          <span className="hidden font-mono text-xs uppercase tracking-[0.24em] text-foreground/60 sm:block">
            {SITE.name}
          </span>
        </Link>

        {/* Centered pill nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 rounded-full border border-line/70 bg-background/50 px-1.5 py-1 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.22)] backdrop-blur-xl backdrop-saturate-150 md:flex"
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

        {/* Actions */}
        <div className="flex items-center gap-2">
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

      {/* Mobile nav */}
      <div className="mx-auto mt-3 flex max-w-6xl items-center justify-center gap-1.5 md:hidden">
        <nav aria-label="Primary mobile" className="flex flex-wrap items-center justify-center gap-1">
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
      </div>

      {/* Command menu */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-24 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
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
          </div>
        </div>
      )}
    </header>
  );
}

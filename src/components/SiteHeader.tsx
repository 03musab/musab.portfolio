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
    <header className="sticky top-0 z-50 w-full px-4 pt-4 lg:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        {/* Monogram */}
        <Link href="/" aria-label="Homepage" className="group flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full border border-line bg-surface shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-transform duration-300 group-hover:-rotate-12">
            <span className="text-colorfull animate-gradient-x font-display text-lg italic">M</span>
          </span>
          <span className="hidden font-mono text-xs uppercase tracking-[0.24em] text-foreground/60 sm:block">
            {SITE.name}
          </span>
        </Link>

        {/* Centered pill nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 rounded-full border border-line bg-surface px-1.5 py-1 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.22)] md:flex"
        >
          {SECTION_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${
                item.label === "Contact"
                  ? "bg-foreground text-background hover:opacity-85"
                  : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={openMenu}
            className="grid size-9 place-items-center rounded-full border border-line bg-surface text-foreground/70 shadow-sm transition-colors hover:text-foreground"
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
              className="rounded-full border border-line bg-surface px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-foreground/70"
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

import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { SITE } from "@/lib/site";
import SendEmailButton from "./SendEmailButton";
import { LikeButton } from "./ui/like-button";

const LINK_CARDS = [
  {
    label: "Case studies",
    note: "Three systems built end-to-end",
    href: "/#projects",
    external: false,
  },
  {
    label: "Resume",
    note: "Grab my latest CV as PDF",
    href: SITE.resume,
    external: true,
  },
  {
    label: "GitHub",
    note: "Explore my open-source code",
    href: SITE.github,
    external: true,
  },
  {
    label: "Get in touch",
    note: "Let me know you were here",
    href: "/#contact",
    external: false,
  },
];

const COLUMNS = [
  {
    title: "General",
    links: [
      { label: "/", href: "/" },
      { label: "/about", href: "/#about" },
      { label: "/projects", href: "/#projects" },
      { label: "/contact", href: "/#contact" },
    ],
  },
  {
    title: "Pages",
    links: [
      { label: "/privacy", href: "/privacy" },
      { label: "/thanks", href: "/thanks" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { label: SITE.github.replace("https://", "github/"), href: SITE.github, external: true },
      { label: SITE.linkedin.replace("https://", "linkedin/"), href: SITE.linkedin, external: true },
      { label: "email", href: `mailto:${SITE.email}` },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl space-y-pagebuilder px-6 pb-16 pt-pagebuilder lg:px-8">
        <div className="space-y-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/50">
            My Site
          </p>
          <h2 className="heading-glow font-display text-4xl leading-tight tracking-tight lg:text-6xl">
            Explore, experiment{" "}
            <em className="text-colorfull animate-gradient-x italic">
              {"&&"} say hello
            </em>
          </h2>
        </div>

        {/* Link-card grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LINK_CARDS.map((card) => (
            <a
              key={card.label}
              href={card.href}
              target={card.external ? "_blank" : undefined}
              rel={card.external ? "noopener noreferrer" : undefined}
              className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-5 transition-colors duration-300 hover:border-foreground/30"
            >
              <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_80%_10%,rgba(99,102,241,0.12),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-display text-lg tracking-tight">
                    {card.label}
                  </p>
                  <ArrowUpRight
                    size={14}
                    className="translate-x-1 -translate-y-1 text-foreground/40 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/50">
                  {card.note}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {COLUMNS.map((col) => (
            <div key={col.title} className="space-y-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-foreground/50">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="group relative font-mono text-xs text-foreground/60 transition-colors hover:text-foreground"
                    >
                      {link.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-foreground/50 transition-all duration-300 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/50 sm:flex-row">
          <p>© 2026 {SITE.fullName}</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/thanks" className="transition-colors hover:text-foreground">
              Sitemap
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <LikeButton initialCount={48} />
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-foreground/50 transition-colors hover:text-foreground">
              <GithubIcon size={14} />
            </a>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-foreground/50 transition-colors hover:text-foreground">
              <LinkedinIcon size={14} />
            </a>
            <SendEmailButton variant="text-link" className="p-0 border-none no-underline flex items-center">
              <span className="text-foreground/50 transition-colors hover:text-foreground">
                <Mail size={14} />
              </span>
            </SendEmailButton>
          </div>
        </div>
      </div>

    </footer>
  );
}

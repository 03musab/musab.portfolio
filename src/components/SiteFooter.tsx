import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import SendEmailButton from "./SendEmailButton";
import { SITE } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer
      data-theme="black"
      className="border-t border-indigo-300/12 bg-[#12102b]"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 font-mono text-[11px] text-muted-foreground sm:flex-row lg:px-8">
        <p>
          © {new Date().getFullYear()} {SITE.fullName} · {SITE.location}
        </p>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-5">
          <Link href="/#thesis" className="transition-colors hover:text-foreground">
            About
          </Link>
          <Link href="/#projects" className="transition-colors hover:text-foreground">
            Projects
          </Link>
          <Link href="/#journey" className="transition-colors hover:text-foreground">
            Journey
          </Link>
          <Link href="/#github" className="transition-colors hover:text-foreground">
            Activity
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-foreground">
            Privacy
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <GithubIcon size={15} />
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <LinkedinIcon size={15} />
          </a>
          <SendEmailButton
            variant="text-link"
            className="border-none p-0 no-underline text-muted-foreground hover:text-foreground"
          >
            <Mail size={15} />
          </SendEmailButton>
        </div>
      </div>
    </footer>
  );
}

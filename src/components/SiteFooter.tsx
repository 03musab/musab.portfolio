import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { SITE, SECTION_LINKS } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="relative z-[1] w-full border-t border-white/5 pb-28 md:pb-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="space-y-3">
          <p className="font-mono text-sm font-bold text-white">{SITE.name}</p>
          <p className="text-xs text-gray-500 font-mono leading-relaxed">
            {SITE.tagline} based in {SITE.location}. Building AI-powered products and scalable software.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              title="GitHub"
            >
              <GithubIcon size={15} />
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon size={15} />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              title="Email"
            >
              <Mail size={15} />
            </a>
          </div>
        </div>

        <div>
          <p className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-widest mb-3">Navigate</p>
          <ul className="space-y-2">
            {SECTION_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-xs font-mono text-gray-400 hover:text-blue-400 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-widest mb-3">Pages</p>
          <ul className="space-y-2">
            <li>
              <Link href="/privacy" className="text-xs font-mono text-gray-400 hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/thanks" className="text-xs font-mono text-gray-400 hover:text-blue-400 transition-colors">
                Thank You
              </Link>
            </li>
            <li>
              <a
                href={SITE.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-gray-400 hover:text-blue-400 transition-colors"
              >
                Resume (PDF)
              </a>
            </li>
            <li>
              <Link href="/" className="text-xs font-mono text-gray-400 hover:text-blue-400 transition-colors">
                Back to Top ↑
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-widest mb-3">Contact</p>
          <ul className="space-y-2">
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="text-xs font-mono text-gray-400 hover:text-blue-400 transition-colors break-all"
              >
                {SITE.email}
              </a>
            </li>
            <li>
              <Link href="/#contact" className="text-xs font-mono text-gray-400 hover:text-blue-400 transition-colors">
                Start a Project
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 py-6 text-center text-xs font-mono text-gray-500 space-y-2">
        <p>© 2026 {SITE.fullName}. All systems online.</p>
        <p className="text-[10px] text-gray-600">Built with Next.js 16, React 19, TypeScript, Tailwind CSS &amp; Lucide Icons.</p>
      </div>
    </footer>
  );
}

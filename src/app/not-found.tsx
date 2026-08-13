import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FileText, Home, Search } from "lucide-react";
import SubPageShell from "@/components/SubPageShell";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "404 — Signal Lost | Mohammed Musab",
  description: "The page you're looking for doesn't exist. Head back to the command center.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <SubPageShell>
      <div className="space-y-10">
        <Breadcrumbs items={[{ label: "404 — Signal Lost" }]} />

        <div className="bg-[#0a0a0c]/60 border border-white/10 rounded-2xl glow-border p-8 sm:p-12 text-center space-y-6 max-w-2xl mx-auto">
          <div className="space-y-3">
            <p className="text-[10px] text-red-400/90 font-mono font-bold tracking-widest uppercase">Error 404 — Route Not Found</p>
            <p className="text-7xl sm:text-8xl font-mono font-bold bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent leading-none">
              404
            </p>
            <p className="text-sm font-mono text-gray-400">
              <span className="text-green-400">$ </span>route lookup ... <span className="text-red-400">SIGNAL LOST</span> — this endpoint doesn&apos;t exist in the system.
            </p>
          </div>

          <div className="bg-black border border-white/5 rounded-lg p-3 font-mono text-[11px] text-gray-400 text-left max-w-sm mx-auto space-y-1">
            <p><span className="text-blue-400">[ERROR]</span> 404 Not Found</p>
            <p><span className="text-purple-400">[TRACE]</span> no matching route segment</p>
            <p><span className="text-green-400">[STATUS]</span> redirecting human back to safety...</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="px-5 py-3 rounded-lg text-xs font-mono font-bold bg-white text-black hover:bg-gray-200 transition-colors flex items-center gap-1.5"
            >
              <Home size={14} />
              <span>Return to Command Center</span>
            </Link>
            <Link
              href="/#projects"
              className="px-5 py-3 rounded-lg text-xs font-mono font-bold bg-[#0e0e11] text-gray-300 hover:text-white border border-white/10 hover:border-white/20 transition-all flex items-center gap-1.5"
            >
              <FileText size={14} />
              <span>View Projects</span>
            </Link>
            <Link
              href="/#contact"
              className="px-5 py-3 rounded-lg text-xs font-mono font-bold bg-[#0e0e11] text-gray-300 hover:text-white border border-white/10 hover:border-white/20 transition-all flex items-center gap-1.5"
            >
              <Search size={14} />
              <span>Report Issue</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </SubPageShell>
  );
}

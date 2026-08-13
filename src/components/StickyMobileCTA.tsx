"use client";

import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { SITE } from "@/lib/site";

/**
 * Sticky bottom CTA bar — mobile only. Anchors to the homepage contact
 * section from any page via "/#contact".
 */
export default function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-[#030303]/90 backdrop-blur-md border-t border-white/10 px-4 pt-3 pb-[calc(env(safe-area-inset-bottom)+12px)] flex items-center gap-3">
      <Link
        href="/#contact"
        className="flex-1 px-4 py-3 rounded-xl text-xs font-mono font-bold bg-white text-black hover:bg-gray-200 transition-colors flex items-center justify-center gap-1.5"
      >
        <span>Start a Project</span>
        <ArrowUpRight size={14} />
      </Link>
      <a
        href={SITE.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 px-4 py-3 rounded-xl text-xs font-mono font-bold bg-[#0e0e11] text-gray-300 border border-white/10 hover:border-white/20 hover:text-white transition-all flex items-center justify-center gap-1.5"
      >
        <FileText size={14} />
        <span>Resume</span>
      </a>
    </div>
  );
}

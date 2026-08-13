"use client";

import React from "react";
import AuroraBackground from "./AuroraBackground";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import StickyMobileCTA from "./StickyMobileCTA";

/**
 * Visual shell for non-home pages (404, thanks, privacy, ...):
 * animated aurora backdrop + shared header + footer + sticky mobile CTA.
 */
export default function SubPageShell({
  children,
  maxWidth = "max-w-4xl",
}: {
  children: React.ReactNode;
  maxWidth?: string;
}) {
  return (
    <div className="relative z-[1] min-h-screen text-[#f5f5f7] flex flex-col font-sans">
      {/* Animated aurora backdrop — CSS only, compositor-friendly */}
      <AuroraBackground />

      <SiteHeader />

      <main className={`relative z-[1] flex-1 w-full ${maxWidth} mx-auto px-6 py-10 lg:py-14`}>
        {children}
      </main>

      <SiteFooter />
      <StickyMobileCTA />
    </div>
  );
}

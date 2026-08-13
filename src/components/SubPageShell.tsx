import React from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

/**
 * Visual shell for non-home pages (404, thanks, privacy, ...):
 * shared header + footer on the new warm-neutral canvas.
 */
export default function SubPageShell({
  children,
  maxWidth = "max-w-4xl",
}: {
  children: React.ReactNode;
  maxWidth?: string;
}) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground font-sans">
      <SiteHeader />

      <main className={`relative flex-1 w-full ${maxWidth} mx-auto px-6 py-16 lg:py-20`}>
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}

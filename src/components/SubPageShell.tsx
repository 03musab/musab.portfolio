import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RightSidebar from "./RightSidebar";
import SiteFooter from "./SiteFooter";

/**
 * Visual shell for non-home pages (404, thanks, privacy, ...):
 * shared right sidebar + minimal back link + footer.
 */
export default function SubPageShell({
  children,
  maxWidth = "max-w-4xl",
}: {
  children: React.ReactNode;
  maxWidth?: string;
}) {
  return (
    <div
      data-theme="black"
      className="relative flex min-h-screen flex-col bg-background font-sans text-foreground"
    >
      <RightSidebar />

      <div className={`mx-auto w-full ${maxWidth} px-6 pt-10`}>
        <Link href="/" className="editorial-link text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft size={13} />
          <span>Back to Portfolio</span>
        </Link>
      </div>

      <main className={`relative mx-auto w-full flex-1 ${maxWidth} px-6 py-10 lg:py-14`}>
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}

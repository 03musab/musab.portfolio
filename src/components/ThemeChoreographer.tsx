"use client";

import { useEffect } from "react";

export type PortfolioTheme = "black" | "white";

/**
 * Zero-lag floating overlay theme sync:
 * - Each section band owns its own solid background + static `data-theme`, joined by
 *   seamless multi-stop vertical gradient bridges so foreground text ALWAYS has 100% contrast.
 * - Syncs `data-theme` strictly on the fixed `#right-sidebar`, `#right-sidebar-mobile`,
 *   and `#scroll-progress` overlays (~12 DOM nodes total, 0 React re-renders).
 */
export default function ThemeChoreographer() {
  useEffect(() => {
    let sidebarTheme: PortfolioTheme = "black";
    let mobileTheme: PortfolioTheme = "black";
    let barTheme: PortfolioTheme = "black";
    let rafId = 0;
    let ticking = false;

    const applyThemes = (
      nextSidebar: PortfolioTheme,
      nextMobile: PortfolioTheme,
      nextBar: PortfolioTheme,
    ) => {
      if (nextSidebar !== sidebarTheme) {
        sidebarTheme = nextSidebar;
        const sidebar = document.getElementById("right-sidebar");
        if (sidebar) sidebar.dataset.theme = sidebarTheme;
      }
      if (nextMobile !== mobileTheme) {
        mobileTheme = nextMobile;
        const mobile = document.getElementById("right-sidebar-mobile");
        if (mobile) mobile.dataset.theme = mobileTheme;
      }
      if (nextBar !== barTheme) {
        barTheme = nextBar;
        const bar = document.getElementById("scroll-progress");
        if (bar) bar.dataset.theme = barTheme;
      }
    };

    const update = () => {
      ticking = false;
      const whiteStage = document.getElementById("white-stage");
      if (!whiteStage) {
        applyThemes("black", "black", "black");
        return;
      }

      const rect = whiteStage.getBoundingClientRect();
      const vh = window.innerHeight || 800;

      // Desktop right sidebar is vertically centered at 50% viewport height
      const midY = vh * 0.5;
      const nextSidebar: PortfolioTheme =
        rect.top <= midY && rect.bottom > midY ? "white" : "black";

      // Mobile trigger sits near the bottom-right corner
      const bottomY = vh - 44;
      const nextMobile: PortfolioTheme =
        rect.top <= bottomY && rect.bottom > bottomY ? "white" : "black";

      // Top 2px scroll progress bar sits at top edge
      const nextBar: PortfolioTheme =
        rect.top <= 16 && rect.bottom > 16 ? "white" : "black";

      applyThemes(nextSidebar, nextMobile, nextBar);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}

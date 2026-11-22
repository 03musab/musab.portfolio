"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionConfig } from "motion/react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { Toaster } from "sonner";

gsap.registerPlugin(ScrollTrigger);

if (typeof window !== "undefined") {
  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
  });
}

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

/**
 * Keeps GSAP ScrollTrigger tightly synchronized in the exact same RAF tick as Lenis
 * and refreshes pin geometry whenever the browser zoom level (25%-200%) or viewport size changes.
 */
function LenisGsapBridge() {
  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    ScrollTrigger.refresh();

    let refreshTimer: ReturnType<typeof setTimeout> | null = null;
    let lastDpr = window.devicePixelRatio || 1;
    let lastW = window.innerWidth;
    let lastH = window.innerHeight;

    const scheduleRefresh = () => {
      const nextDpr = window.devicePixelRatio || 1;
      const nextW = window.innerWidth;
      const nextH = window.innerHeight;
      const zoomChanged = Math.abs(nextDpr - lastDpr) > 0.01;
      const sizeChanged =
        Math.abs(nextW - lastW) > 2 || Math.abs(nextH - lastH) > 40;

      if (!zoomChanged && !sizeChanged) return;
      lastDpr = nextDpr;
      lastW = nextW;
      lastH = nextH;

      if (refreshTimer) clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 120);
    };

    window.addEventListener("resize", scheduleRefresh, { passive: true });
    window.visualViewport?.addEventListener("resize", scheduleRefresh, {
      passive: true,
    });

    return () => {
      if (refreshTimer) clearTimeout(refreshTimer);
      window.removeEventListener("resize", scheduleRefresh);
      window.visualViewport?.removeEventListener("resize", scheduleRefresh);
    };
  }, []);

  return null;
}

/**
 * Global client provider wrapping:
 * - MotionConfig (honors OS reduced-motion preferences)
 * - Lenis 120fps smooth inertia scrolling driven directly by GSAP's ticker (zero frame desync)
 * - Sonner minimal toast notifications
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  useEffect(() => {
    if (reducedMotion) return;

    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, [reducedMotion]);

  const content = (
    <MotionConfig reducedMotion="user">
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--surface)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
          },
        }}
      />
    </MotionConfig>
  );

  if (reducedMotion) {
    return content;
  }

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        autoRaf: false,
        lerp: 0.115,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        anchors: { offset: -24 },
      }}
    >
      <LenisGsapBridge />
      {content}
    </ReactLenis>
  );
}

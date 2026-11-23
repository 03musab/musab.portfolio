"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import createGlobe from "cobe";
import { geoInterpolate, geoNaturalEarth1Raw } from "d3-geo";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CONTINENT_META, WORLD_DOTS } from "@/lib/world-dots";

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

// Initial orientation centering Mumbai (72.8777° E, 19.076° N)
const MUMBAI_LNG = 72.8777;
const MUMBAI_LAT = 19.076;
const MUMBAI_PHI = 1.5 * Math.PI - (MUMBAI_LNG * Math.PI) / 180;
const GLOBE_THETA = 0.26;
const GLOBE_TILT_RAD = GLOBE_THETA;
const ARC_HEIGHT = 0.22;
const MARKER_ELEV = 1.02;

const DESTINATIONS: [number, number][] = [
  [-122.4194, 37.7749], // San Francisco
  [-0.1276, 51.5072], // London
  [103.8198, 1.3521], // Singapore
];

// Precompute curved great-circle arc sample points (Mumbai -> hubs) matching Cobe arcHeight
const ARC_PATHS = DESTINATIONS.map((dest) => {
  const interp = geoInterpolate([MUMBAI_LNG, MUMBAI_LAT], dest);
  const pts: [number, number, number][] = [];
  const steps = 32;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const [lon, lat] = interp(t);
    const elev = 1 + ARC_HEIGHT * Math.sin(Math.PI * t);
    pts.push([lon, lat, elev]);
  }
  return pts;
});

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

const CONTINENT_RGB = CONTINENT_META.map((c) => hexToRgb(c.hue));

export default function GlobeVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const introStageRef = useRef<HTMLDivElement>(null);
  const introCanvasRef = useRef<HTMLCanvasElement>(null);
  const cobeWrapRef = useRef<HTMLDivElement>(null);
  const cobeCanvasRef = useRef<HTMLCanvasElement>(null);

  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiOffset = useRef(0);
  const settledRef = useRef(false);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  const [settled, setSettled] = useState(false);

  // Interactive Cobe WebGL Globe (Black space opening stage)
  useEffect(() => {
    const canvas = cobeCanvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let width = container.offsetWidth || 320;
    let lastUpdatedWidth = width;
    let currentPhi = MUMBAI_PHI;
    let rafId = 0;

    const onResize = () => {
      if (container) width = container.offsetWidth || 320;
    };
    window.addEventListener("resize", onResize, { passive: true });

    const cobePalette = {
      dark: 1,
      diffuse: 1.2,
      mapBrightness: 5.8,
      mapBaseBrightness: 0.06,
      baseColor: [0.22, 0.28, 0.44] as [number, number, number],
      markerColor: [0.22, 0.74, 0.97] as [number, number, number],
      glowColor: [0.1, 0.16, 0.29] as [number, number, number],
      arcColor: [0.31, 0.55, 1.0] as [number, number, number],
    };

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width,
      height: width,
      phi: currentPhi,
      theta: GLOBE_THETA,
      mapSamples: 13000,
      scale: 1.05,
      markerElevation: 0.02,
      arcWidth: 0.45,
      arcHeight: ARC_HEIGHT,
      ...cobePalette,
      markers: [
        { location: [MUMBAI_LAT, MUMBAI_LNG], size: 0.08 },
        { location: [37.7749, -122.4194], size: 0.038 },
        { location: [51.5072, -0.1276], size: 0.038 },
        { location: [1.3521, 103.8198], size: 0.038 },
      ],
      arcs: [
        { from: [MUMBAI_LAT, MUMBAI_LNG], to: [37.7749, -122.4194] },
        { from: [MUMBAI_LAT, MUMBAI_LNG], to: [51.5072, -0.1276] },
        { from: [MUMBAI_LAT, MUMBAI_LNG], to: [1.3521, 103.8198] },
      ],
    });

    let isVisible = true;
    let running = false;

    const animate = () => {
      if (!isVisible) {
        running = false;
        return;
      }
      // Keep Mumbai centered until intro & crossfade finish, then start gentle rotation
      if (settledRef.current && pointerInteracting.current === null && !reducedMotion) {
        currentPhi += 0.0012;
      }
      if (width !== lastUpdatedWidth) {
        lastUpdatedWidth = width;
        globe.update({
          phi: currentPhi + phiOffset.current,
          width,
          height: width,
        });
      } else {
        globe.update({
          phi: currentPhi + phiOffset.current,
        });
      }
      rafId = requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (!running && isVisible) {
        running = true;
        rafId = requestAnimationFrame(animate);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? true;
        if (isVisible) {
          startLoop();
        } else {
          running = false;
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0.18 },
    );
    io.observe(container);
    startLoop();

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      globe.destroy();
    };
  }, [reducedMotion]);

  // Unified Continuous Dot-Matrix Choreography (~4.3s total):
  // 1) Separated dot-matrix continents -> 2) Continuous fluid convergence + rotation onto sphere ->
  // 3) Identify India + Mumbai marker & arcs -> 4) Settle smoothly & crossfade dot-for-dot into Cobe
  useGSAP(
    () => {
      const introStage = introStageRef.current;
      const introCanvas = introCanvasRef.current;
      const cobeWrap = cobeWrapRef.current;
      const container = containerRef.current;
      if (!introStage || !introCanvas || !cobeWrap || !container) return;

      if (reducedMotion) {
        settledRef.current = true;
        gsap.set(introStage, { autoAlpha: 0 });
        gsap.set(cobeWrap, { autoAlpha: 1 });
        return;
      }

      settledRef.current = false;

      const heroEl = container.closest("#hero");
      const slotRect = container.getBoundingClientRect();
      const heroRect = heroEl?.getBoundingClientRect();
      const isDesktop = window.innerWidth >= 1024;
      const dx =
        isDesktop && heroRect
          ? heroRect.left + heroRect.width / 2 - (slotRect.left + slotRect.width / 2)
          : 0;

      const state = {
        scatter: 1, // 1 = apart, 0 = assembled
        sphere: 0, // 0 = flat world dots, 1 = 3D orthographic sphere
        rotLon: 0, // 0 -> -MUMBAI_LNG continuous rotation
        indiaTint: 0, // 0 -> 1 -> 0 smooth India highlight before Cobe handoff
        marker: 0, // 0 -> 1 Mumbai beacon + callout
        arcs: 0, // 0 -> 1 global arcs
        tagOpacity: 0, // 0 -> 1 -> 0 INDIA · MUMBAI tag
      };

      const drawDotFrame = () => {
        const size = container.offsetWidth || 320;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const pixelSize = Math.round(size * dpr);
        if (introCanvas.width !== pixelSize || introCanvas.height !== pixelSize) {
          introCanvas.width = pixelSize;
          introCanvas.height = pixelSize;
        }

        const ctx = introCanvas.getContext("2d");
        if (!ctx) return;

        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, size, size);

        const cx = size / 2;
        const cy = size / 2;
        const sphereR = size * 0.42;
        const natScale = size * 0.11;

        const u = state.sphere;
        const tilt = GLOBE_TILT_RAD * u;
        const cosTilt = Math.cos(tilt);
        const sinTilt = Math.sin(tilt);
        const scatterFactor = state.scatter * (size / 320);

        // Cobe-matched soft sphere body & rim halo
        if (u > 0.04) {
          const haloAlpha = Math.pow(u, 1.4);
          const halo = ctx.createRadialGradient(
            cx,
            cy,
            sphereR * 0.55,
            cx,
            cy,
            sphereR * 1.12,
          );
          halo.addColorStop(0, `rgba(15, 22, 41, ${(0.52 * haloAlpha).toFixed(3)})`);
          halo.addColorStop(0.84, `rgba(52, 78, 145, ${(0.36 * haloAlpha).toFixed(3)})`);
          halo.addColorStop(1, "rgba(52, 78, 145, 0)");
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(cx, cy, sphereR * 1.12, 0, Math.PI * 2);
          ctx.fill();
        }

        const baseDotR = Math.max(0.85, size * 0.0031);
        const unifiedRgb: [number, number, number] = [198, 214, 245];
        const accentRgb: [number, number, number] = [79, 140, 255];
        const highlightRgb: [number, number, number] = [56, 189, 248];

        const distinctBlend = Math.pow(state.scatter, 1.1);

        for (let i = 0; i < WORLD_DOTS.length; i++) {
          const [lon, lat, cIdx] = WORLD_DOTS[i];
          const meta = CONTINENT_META[cIdx];

          const lam = ((lon + state.rotLon) * Math.PI) / 180;
          const phi = (lat * Math.PI) / 180;
          const cosPhi = Math.cos(phi);

          const x0 = cosPhi * Math.sin(lam);
          const y0 = Math.sin(phi);
          const z0 = cosPhi * Math.cos(lam);

          const yOrtho = y0 * cosTilt - z0 * sinTilt;
          const zOrtho = y0 * sinTilt + z0 * cosTilt;

          const hemisphereVis =
            u < 0.12 ? 1 : 1 - u + u * smoothstep(-0.08, 0.14, zOrtho);
          if (hemisphereVis <= 0.02) continue;

          const nat = geoNaturalEarth1Raw(
            (lon * Math.PI) / 180,
            (lat * Math.PI) / 180,
          );

          const ox = meta.scatter[0] * scatterFactor;
          const oy = meta.scatter[1] * scatterFactor;

          const px = cx + (1 - u) * nat[0] * natScale + u * x0 * sphereR + ox;
          const py = cy - ((1 - u) * nat[1] * natScale + u * yOrtho * sphereR) + oy;

          const depthShade =
            u < 0.2 ? 0.92 : 0.34 + 0.66 * Math.pow(Math.max(0, zOrtho), 0.45);
          const alpha = hemisphereVis * depthShade;

          let r: number;
          let g: number;
          let b: number;
          let radius = baseDotR;

          if (cIdx === 0) {
            const highlight = Math.max(distinctBlend * 0.65, state.indiaTint);
            r = Math.round(unifiedRgb[0] * (1 - highlight) + accentRgb[0] * highlight);
            g = Math.round(unifiedRgb[1] * (1 - highlight) + accentRgb[1] * highlight);
            b = Math.round(unifiedRgb[2] * (1 - highlight) + accentRgb[2] * highlight);
            radius = baseDotR * (1 + state.indiaTint * 0.25);
          } else {
            const cRgb = CONTINENT_RGB[cIdx];
            r = Math.round(unifiedRgb[0] * (1 - distinctBlend) + cRgb[0] * distinctBlend);
            g = Math.round(unifiedRgb[1] * (1 - distinctBlend) + cRgb[1] * distinctBlend);
            b = Math.round(unifiedRgb[2] * (1 - distinctBlend) + cRgb[2] * distinctBlend);
          }

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fill();
        }

        const projectSpherePoint = (lon: number, lat: number, elev = 1) => {
          const lam = ((lon + state.rotLon) * Math.PI) / 180;
          const phi = (lat * Math.PI) / 180;
          const cosPhi = Math.cos(phi);
          const x0 = cosPhi * Math.sin(lam) * elev;
          const y0 = Math.sin(phi) * elev;
          const z0 = cosPhi * Math.cos(lam) * elev;
          const yOrtho = y0 * cosTilt - z0 * sinTilt;
          const zOrtho = y0 * sinTilt + z0 * cosTilt;
          return {
            x: cx + x0 * sphereR,
            y: cy - yOrtho * sphereR,
            z: zOrtho,
          };
        };

        // Curved Periwinkle arcs matching Cobe's arcWidth & arcHeight
        if (state.arcs > 0.01) {
          ctx.lineWidth = 1.4;
          ctx.strokeStyle = `rgba(${accentRgb[0]}, ${accentRgb[1]}, ${accentRgb[2]}, ${(0.88 * state.arcs).toFixed(3)})`;

          for (const arcPts of ARC_PATHS) {
            const maxIdx = Math.floor(arcPts.length * state.arcs);
            if (maxIdx < 2) continue;
            ctx.beginPath();
            let started = false;
            for (let i = 0; i < maxIdx; i++) {
              const [alon, alat, elev] = arcPts[i];
              const pt = projectSpherePoint(alon, alat, elev);
              if (pt.z < -0.12) {
                started = false;
                continue;
              }
              if (!started) {
                ctx.moveTo(pt.x, pt.y);
                started = true;
              } else {
                ctx.lineTo(pt.x, pt.y);
              }
            }
            ctx.stroke();
          }
        }

        // Champagne Mumbai beacon & destination markers aligned to Cobe elevation
        if (state.marker > 0.02) {
          const mumbai = projectSpherePoint(MUMBAI_LNG, MUMBAI_LAT, MARKER_ELEV);

          // Expanding pulse ring while tag is active
          if (state.tagOpacity > 0.02) {
            const ringR = 5 + (1 - state.tagOpacity * 0.25) * 11;
            ctx.strokeStyle = `rgba(${highlightRgb[0]}, ${highlightRgb[1]}, ${highlightRgb[2]}, ${(0.5 * state.tagOpacity).toFixed(3)})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.arc(mumbai.x, mumbai.y, ringR, 0, Math.PI * 2);
            ctx.stroke();
          }

          ctx.fillStyle = `rgba(${highlightRgb[0]}, ${highlightRgb[1]}, ${highlightRgb[2]}, ${state.marker.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(mumbai.x, mumbai.y, 4.4 * state.marker, 0, Math.PI * 2);
          ctx.fill();

          if (state.arcs > 0.25) {
            for (const [dlon, dlat] of DESTINATIONS) {
              const dp = projectSpherePoint(dlon, dlat, MARKER_ELEV);
              if (dp.z > -0.05) {
                ctx.fillStyle = `rgba(${accentRgb[0]}, ${accentRgb[1]}, ${accentRgb[2]}, ${state.arcs.toFixed(3)})`;
                ctx.beginPath();
                ctx.arc(dp.x, dp.y, 2.7, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }

          if (state.tagOpacity > 0.03) {
            ctx.font = "600 9px var(--font-mono), monospace";
            const label = "INDIA";
            const tw = ctx.measureText(label).width;
            const bx = mumbai.x + 12;
            const by = mumbai.y - 22;
            const a = state.tagOpacity;

            ctx.fillStyle = `rgba(15, 22, 41, ${(0.92 * a).toFixed(3)})`;
            ctx.strokeStyle = `rgba(${highlightRgb[0]}, ${highlightRgb[1]}, ${highlightRgb[2]}, ${(0.55 * a).toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(bx, by, tw + 14, 20, 6);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = `rgba(240, 243, 250, ${a.toFixed(3)})`;
            ctx.fillText(label, bx + 7, by + 13);
          }
        }

        ctx.restore();
      };

      drawDotFrame();

      gsap.set(cobeWrap, { autoAlpha: 0 });
      gsap.set(introStage, {
        autoAlpha: 1,
        x: dx,
        scale: isDesktop ? 1.06 : 1,
      });

      const tl = gsap.timeline({
        onUpdate: drawDotFrame,
        onComplete: () => {
          settledRef.current = true;
          setSettled(true);
        },
      });

      // Beat 1: Crisp fade in of separated dot-matrix continents (0.0s -> 0.55s)
      tl.fromTo(
        introStage,
        { opacity: 0.15 },
        { opacity: 1, duration: 0.55, ease: "power2.out" },
      )
        // Beat 2: Smooth overlapping convergence (scatter -> 0, sphere -> 1, rotLon -> Mumbai)
        .to(
          state,
          {
            scatter: 0,
            duration: 1.65,
            ease: "power3.inOut",
          },
          "+=0.25",
        )
        .to(
          state,
          {
            sphere: 1,
            duration: 1.75,
            ease: "power2.inOut",
          },
          "<0.05",
        )
        .to(
          state,
          {
            rotLon: -MUMBAI_LNG,
            duration: 1.9,
            ease: "power3.inOut",
          },
          "<0.3",
        )
        // Beat 3: Identify India, ignite Mumbai beacon + tag, and sweep global arcs
        .to(
          state,
          {
            indiaTint: 1,
            marker: 1,
            tagOpacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.35",
        )
        .to(
          state,
          {
            arcs: 1,
            duration: 0.7,
            ease: "power2.inOut",
          },
          "-=0.25",
        )
        // Beat 4: Glide smoothly into resting Hero slot & blend India highlight smoothly into Cobe
        .to(
          introStage,
          {
            x: 0,
            scale: 1,
            duration: 1.05,
            ease: "power3.inOut",
          },
          "+=0.35",
        )
        .to(
          state,
          {
            indiaTint: 0,
            tagOpacity: 0,
            duration: 0.65,
            ease: "power2.inOut",
          },
          "<0.2",
        )
        // Seamless dot-for-dot crossfade into live interactive Cobe globe
        .to(
          cobeWrap,
          {
            autoAlpha: 1,
            duration: 0.65,
            ease: "sine.inOut",
          },
          "-=0.45",
        )
        .to(
          introStage,
          {
            autoAlpha: 0,
            duration: 0.65,
            ease: "sine.inOut",
          },
          "<",
        );

      return () => {
        tl.kill();
      };
    },
    { scope: containerRef, dependencies: [reducedMotion] },
  );

  return (
    <div className="flex w-full flex-col items-center">
      <div
        ref={containerRef}
        className="relative aspect-square w-full max-w-[290px] select-none sm:max-w-[320px] lg:max-w-[340px]"
      >
        {/* Interactive Cobe WebGL Dot-Matrix Globe (resting state) */}
        <div ref={cobeWrapRef} className="absolute inset-0">
          <canvas
            ref={cobeCanvasRef}
            aria-label="Interactive 3D globe highlighting India"
            onPointerDown={(e) => {
              pointerInteracting.current =
                e.clientX - pointerInteractionMovement.current;
              if (cobeCanvasRef.current) cobeCanvasRef.current.style.cursor = "grabbing";
            }}
            onPointerUp={() => {
              pointerInteracting.current = null;
              if (cobeCanvasRef.current) cobeCanvasRef.current.style.cursor = "grab";
            }}
            onPointerOut={() => {
              pointerInteracting.current = null;
              if (cobeCanvasRef.current) cobeCanvasRef.current.style.cursor = "grab";
            }}
            onPointerMove={(e) => {
              if (pointerInteracting.current !== null) {
                const delta = e.clientX - pointerInteracting.current;
                pointerInteractionMovement.current = delta;
                phiOffset.current = delta * 0.0055;
              }
            }}
            className="h-full w-full cursor-grab touch-none"
          />
        </div>

        {/* Dot-Matrix Intro Assembly Canvas (zero texture change into Cobe) */}
        <div
          ref={introStageRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
        >
          <canvas ref={introCanvasRef} className="h-full w-full" />
        </div>
      </div>

      {/* India origin label + global world quote */}
      <div
        className={`mt-4 flex min-h-11 flex-col items-center gap-1.5 text-center transition-opacity duration-500 ${
          settled || reducedMotion ? "opacity-100" : "opacity-0"
        }`}
      >
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.26em] text-accent">
          <span className="size-1.5 rounded-full bg-accent" />
          <span>India</span>
        </span>
        <p className="max-w-[290px] font-display text-[13px] font-normal italic leading-snug text-muted-foreground">
          &ldquo;Rooted in India, building for the whole world.&rdquo;
        </p>
      </div>
    </div>
  );
}

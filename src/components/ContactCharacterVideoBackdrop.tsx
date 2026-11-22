"use client";

import { useEffect, useRef } from "react";

interface StarlightMote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  phase: number;
  color: string;
}

interface ShootingComet {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  period: number;
  offset: number;
  color: string;
}

const SECONDARY_COMETS: ShootingComet[] = [
  {
    startX: 0.72,
    startY: 0.04,
    endX: 0.24,
    endY: 0.36,
    period: 6.5,
    offset: 0.4,
    color: "#38bdf8",
  },
  {
    startX: 0.58,
    startY: 0.02,
    endX: 0.14,
    endY: 0.28,
    period: 8.2,
    offset: 3.7,
    color: "#c4b5fd",
  },
];

export default function ContactCharacterVideoBackdrop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let width = 1280;
    let height = 640;
    let dpr = 1;
    let rafId: number | null = null;
    let isInViewport = false;

    const heroImage = new Image();
    heroImage.decoding = "async";
    heroImage.src = "/images/contact-twilight-character.jpg";
    let imageLoaded = false;

    // Rising bioluminescent twilight bokeh motes matching the Shinkai artwork
    const motes: StarlightMote[] = Array.from({ length: 24 }, (_, i) => ({
      x: ((i * 67 + 13) % 100) / 100,
      y: ((i * 43 + 29) % 100) / 100,
      vx: (i % 2 === 0 ? 1 : -1) * (0.00008 + (i % 4) * 0.000025),
      vy: -0.00018 - (i % 5) * 0.000045,
      radius: 1.6 + (i % 4) * 1.35,
      alpha: 0.35 + (i % 3) * 0.2,
      phase: i * 0.85,
      color:
        i % 3 === 0 ? "#38bdf8" : i % 3 === 1 ? "#c4b5fd" : "#818cf8",
    }));

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(320, Math.floor(rect.width));
      height = Math.max(320, Math.floor(rect.height));
      // Cap internal backing buffer at 1920px wide & 1.5x DPR for locked 120fps across 25%-200% browser zoom
      const rawDpr = Math.min(window.devicePixelRatio || 1, 1.5);
      dpr = Math.min(rawDpr, 1920 / Math.max(width, 1));
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const renderFrame = (timestampMs: number) => {
      const t = timestampMs * 0.001;
      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Base Cosmic Twilight Indigo-Violet fill (#12102b)
      ctx.fillStyle = "#12102b";
      ctx.fillRect(0, 0, width, height);

      if (imageLoaded && heroImage.naturalWidth > 0) {
        const imgW = heroImage.naturalWidth;
        const imgH = heroImage.naturalHeight;

        // Cover math with subtle cinematic camera breathing & drift
        const breathScale = 1.05 + Math.sin(t * 0.45) * 0.016;
        const baseScale = Math.max(width / imgW, height / imgH) * breathScale;
        const drawW = imgW * baseScale;
        const drawH = imgH * baseScale;

        const driftX = Math.sin(t * 0.38) * 9;
        const driftY = Math.cos(t * 0.31) * 5.5;
        const offsetX = (width - drawW) * 0.58 + driftX;
        const offsetY = (height - drawH) * 0.44 + driftY;

        // 1. Paint base studio-illustrated anime twilight frame
        ctx.drawImage(heroImage, offsetX, offsetY, drawW, drawH);

        // 2. 120fps 8-slice 2.5D Living Wind Ripple on Character Hair, Billowing Jacket & Cloud Sea
        const sliceCount = 8;
        const bandTopFrac = 0.3;
        const bandBotFrac = 0.86;
        const sliceFracH = (bandBotFrac - bandTopFrac) / sliceCount;

        for (let i = 0; i < sliceCount; i++) {
          const v0 = bandTopFrac + i * sliceFracH;
          const sy = v0 * imgH;
          const sh = sliceFracH * imgH;
          const dy = offsetY + v0 * drawH;
          const dh = sliceFracH * drawH + 1;

          const windWave =
            Math.sin(t * 2.3 - i * 0.75) * 2.2 +
            Math.cos(t * 1.6 + i * 0.5) * 1.2;

          ctx.drawImage(
            heroImage,
            0,
            sy,
            imgW,
            sh,
            offsetX + windWave,
            dy,
            drawW,
            dh,
          );
        }

        // 3. Animated Anamorphic Comet Core & Travelling Starlight Shimmer
        ctx.save();
        ctx.globalCompositeOperation = "screen";

        const cometHeadX = offsetX + drawW * 0.314;
        const cometHeadY = offsetY + drawH * 0.348;
        const cometPulse = 0.78 + 0.22 * Math.sin(t * 3.4);

        const cometGlow = ctx.createRadialGradient(
          cometHeadX,
          cometHeadY,
          2,
          cometHeadX,
          cometHeadY,
          92 * cometPulse,
        );
        cometGlow.addColorStop(0, "rgba(255, 255, 255, 0.85)");
        cometGlow.addColorStop(0.22, "rgba(56, 189, 248, 0.52)");
        cometGlow.addColorStop(0.58, "rgba(196, 181, 253, 0.22)");
        cometGlow.addColorStop(1, "rgba(18, 16, 43, 0)");
        ctx.fillStyle = cometGlow;
        ctx.beginPath();
        ctx.arc(cometHeadX, cometHeadY, 92 * cometPulse, 0, Math.PI * 2);
        ctx.fill();

        // Horizontal anamorphic cinema lens streak across the comet head
        const streakW = 128 + Math.sin(t * 4.1) * 26;
        const streakGrad = ctx.createLinearGradient(
          cometHeadX - streakW,
          cometHeadY,
          cometHeadX + streakW,
          cometHeadY,
        );
        streakGrad.addColorStop(0, "rgba(56, 189, 248, 0)");
        streakGrad.addColorStop(0.5, "rgba(224, 242, 254, 0.72)");
        streakGrad.addColorStop(1, "rgba(56, 189, 248, 0)");
        ctx.strokeStyle = streakGrad;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(cometHeadX - streakW, cometHeadY);
        ctx.lineTo(cometHeadX + streakW, cometHeadY);
        ctx.stroke();

        // Travelling shimmer pulse gliding along the comet tail arc
        const tailProgress = (t * 0.45) % 1;
        const tailX = cometHeadX + tailProgress * (drawW * 0.28);
        const tailY =
          cometHeadY -
          tailProgress * (drawH * 0.31) -
          Math.sin(tailProgress * Math.PI) * 18;
        const tailShimmer = ctx.createRadialGradient(
          tailX,
          tailY,
          2,
          tailX,
          tailY,
          72,
        );
        tailShimmer.addColorStop(0, "rgba(125, 211, 252, 0.42)");
        tailShimmer.addColorStop(0.5, "rgba(196, 181, 253, 0.18)");
        tailShimmer.addColorStop(1, "rgba(18, 16, 43, 0)");
        ctx.fillStyle = tailShimmer;
        ctx.beginPath();
        ctx.arc(tailX, tailY, 72, 0, Math.PI * 2);
        ctx.fill();

        // 4. Secondary Soaring Shooting Stars across the Twilight Sky
        for (const sc of SECONDARY_COMETS) {
          const cycle = ((t + sc.offset) % sc.period) / sc.period;
          if (cycle < 0.24) {
            const p = cycle / 0.24;
            const curX = (sc.startX + (sc.endX - sc.startX) * p) * width;
            const curY = (sc.startY + (sc.endY - sc.startY) * p) * height;
            const tailDX = (sc.startX - sc.endX) * width * 0.18;
            const tailDY = (sc.startY - sc.endY) * height * 0.18;

            const sg = ctx.createLinearGradient(
              curX + tailDX,
              curY + tailDY,
              curX,
              curY,
            );
            sg.addColorStop(0, "rgba(56, 189, 248, 0)");
            sg.addColorStop(0.7, `${sc.color}88`);
            sg.addColorStop(1, "rgba(255, 255, 255, 0.95)");

            ctx.strokeStyle = sg;
            ctx.lineWidth = 2;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(curX + tailDX, curY + tailDY);
            ctx.lineTo(curX, curY);
            ctx.stroke();
          }
        }

        // 5. Rising Bioluminescent Twilight Bokeh Orbs & Starlight Sparks
        for (const m of motes) {
          m.x = (m.x + m.vx + 1) % 1;
          m.y = (m.y + m.vy + 1) % 1;
          const mx = m.x * width;
          const my = m.y * height;
          const twinkle = 0.5 + 0.5 * Math.sin(t * 2.3 + m.phase);

          const orbGrad = ctx.createRadialGradient(
            mx,
            my,
            0.5,
            mx,
            my,
            m.radius * 3.2,
          );
          orbGrad.addColorStop(0, "#ffffff");
          orbGrad.addColorStop(0.35, m.color);
          orbGrad.addColorStop(1, "rgba(18, 16, 43, 0)");

          ctx.globalAlpha = m.alpha * (0.55 + twinkle * 0.45);
          ctx.fillStyle = orbGrad;
          ctx.beginPath();
          ctx.arc(mx, my, m.radius * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      ctx.restore();
    };

    const loop = (now: number) => {
      if (!isInViewport) {
        rafId = null;
        return;
      }
      renderFrame(now);
      rafId = window.requestAnimationFrame(loop);
    };

    const startLoop = () => {
      if (reducedMotionQuery.matches) {
        renderFrame(2000);
        return;
      }
      if (rafId === null) {
        rafId = window.requestAnimationFrame(loop);
      }
    };

    const stopLoop = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    heroImage.onload = () => {
      imageLoaded = true;
      renderFrame(2000);
      if (isInViewport) {
        startLoop();
      }
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        isInViewport = entry.isIntersecting;
        if (isInViewport) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.02, rootMargin: "160px 0px" },
    );

    intersectionObserver.observe(container);

    return () => {
      stopLoop();
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* High-DPI 120fps 2.5D Living Makoto Shinkai Anime Twilight Cinema Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      {/* Seamless Top (#05070b from Skills) & Bottom (#1d2254 into luminous Twilight Footer) Edge Blending */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #05070b 0%, rgba(10, 10, 26, 0.5) 8%, rgba(18, 16, 43, 0) 22%, rgba(18, 16, 43, 0) 82%, rgba(29, 34, 84, 0.45) 93%, #1d2254 100%)",
        }}
      />

      {/* Localized Left-Column Readability Halo so "Let's build something together." pops cleanly while the character & comet stay 100% vibrant */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 38% 52% at 20% 58%, rgba(18, 16, 43, 0.42) 0%, rgba(24, 21, 56, 0.15) 58%, transparent 100%)",
        }}
      />
    </div>
  );
}

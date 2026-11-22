"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import Matter from "matter-js";
import { Magnet, Wind } from "lucide-react";
import BlackHoleShaderCanvas, {
  type BlackHoleShaderState,
} from "./BlackHoleShaderCanvas";
import {
  SKILL_LAYERS,
  type OrbitStyle,
  type ToolItem,
} from "@/lib/skills-data";

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/** Compute per-capsule staggered pull/burst progression across transition phases. */
function computeItemPhase(
  index: number,
  count: number,
  frac: number,
  tPull: number,
  tOut: number,
): { localPull: number; localOut: number } {
  const stagger = count > 1 ? (index / (count - 1)) * 0.14 : 0;
  return {
    localPull: frac < 0.5 ? smoothstep(stagger, 0.86 + stagger, tPull) : 0,
    localOut:
      frac >= 0.5
        ? smoothstep(stagger * 0.85, 0.88 + stagger * 0.85, tOut)
        : 1,
  };
}

export function ToolIconGlyph({
  tool,
  size = 20,
}: {
  tool: ToolItem;
  size?: number;
}) {
  const invertClass = tool.invertOnDark ? "invert brightness-110" : "";
  const ringClass = tool.lightRingOnDark
    ? "rounded-full ring-1 ring-white/25"
    : "";

  return (
    <Image
      src={tool.svgSrc}
      alt=""
      width={size}
      height={size}
      unoptimized
      draggable={false}
      aria-hidden="true"
      className={`shrink-0 object-contain select-none ${invertClass} ${ringClass}`}
      style={{ width: size, height: size }}
    />
  );
}

function computeOrbitalTarget(
  index: number,
  count: number,
  w: number,
  h: number,
  cx: number,
  cy: number,
  timeSec: number,
  style: OrbitStyle,
  scaleMult: number,
  twistRad: number,
): { x: number; y: number } {
  const safeCount = Math.max(1, count);
  const frac = index / safeCount;
  const maxRx = Math.min(w * 0.34, 220);
  const maxRy = Math.min(h * 0.33, 122);

  let angle = frac * Math.PI * 2 - Math.PI / 2;
  let rx = maxRx;
  let ry = maxRy;

  switch (style) {
    case "ring": {
      angle += timeSec * 0.1;
      break;
    }
    case "dual": {
      const inner = index % 2 === 1;
      angle += inner ? -timeSec * 0.12 : timeSec * 0.095;
      rx *= inner ? 0.68 : 1.02;
      ry *= inner ? 0.66 : 0.96;
      break;
    }
    case "hex": {
      angle += timeSec * 0.09 + (index % 2 === 0 ? 0.15 : -0.1);
      rx *= 1.02;
      ry *= 0.98;
      break;
    }
    case "halo": {
      const outer = index % 2 === 0;
      const pulse = 1 + 0.03 * Math.sin(timeSec * 0.7 + index);
      angle += timeSec * (outer ? 0.09 : -0.11);
      rx *= (outer ? 1.04 : 0.66) * pulse;
      ry *= (outer ? 0.96 : 0.64) * pulse;
      break;
    }
    case "ellipse": {
      angle += timeSec * 0.11;
      rx *= 1.06;
      ry *= 0.72;
      break;
    }
    case "triad": {
      angle += timeSec * 0.095 + 0.35;
      rx *= 0.84;
      ry *= 0.9;
      break;
    }
  }

  angle += twistRad;

  let localX = Math.cos(angle) * rx;
  let localY = Math.sin(angle) * ry;

  if (style === "ellipse") {
    const tilt = -0.26;
    const cosT = Math.cos(tilt);
    const sinT = Math.sin(tilt);
    const rotX = localX * cosT - localY * sinT;
    const rotY = localX * sinT + localY * cosT;
    localX = rotX;
    localY = rotY;
  }

  let tx = cx + localX * scaleMult;
  let ty = cy + localY * scaleMult;

  if (scaleMult > 0.3) {
    const padX = 78;
    const padY = 36;
    tx = clamp(tx, padX, Math.max(padX, w - padX));
    ty = clamp(ty, padY, Math.max(padY, h - padY));
  }

  return { x: tx, y: ty };
}

export type BlackHolePhase = "Orbiting" | "Gravity Pull" | "Supernova";

export default function SkillsBlackHoleStage({
  scrollScaledRef,
  activeLayerIdx,
  phaseLabel,
  inspectedTool,
  onInspectTool,
}: {
  scrollScaledRef: RefObject<number>;
  activeLayerIdx: number;
  phaseLabel: BlackHolePhase;
  inspectedTool: ToolItem | null;
  onInspectTool: (tool: ToolItem | null) => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const elRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dimsRef = useRef<{ hw: number; hh: number }[]>([]);

  const activeIdxRef = useRef(activeLayerIdx);
  const mouseModeRef = useRef<"repel" | "attract">("repel");
  const pointerRef = useRef<{
    x: number;
    y: number;
    nx: number;
    ny: number;
    active: boolean;
  }>({ x: 0, y: 0, nx: 0, ny: 0, active: false });

  const shaderStateRef = useRef<BlackHoleShaderState>({
    pull: 0,
    burst: 0,
    mouseX: 0,
    mouseY: 0,
    accent: SKILL_LAYERS[0].accentRgb,
  });

  const [mouseMode, setMouseMode] = useState<"repel" | "attract">("repel");

  useEffect(() => {
    activeIdxRef.current = activeLayerIdx;
  }, [activeLayerIdx]);

  useEffect(() => {
    mouseModeRef.current = mouseMode;
  }, [mouseMode]);

  // Spawn rigid bodies cleanly whenever displayed layer switches across a singularity crossing
  useEffect(() => {
    const engine = engineRef.current;
    const stage = stageRef.current;
    if (!engine || !stage) return;

    const layer = SKILL_LAYERS[activeLayerIdx] ?? SKILL_LAYERS[0];
    const w = stage.clientWidth || 640;
    const h = stage.clientHeight || 420;
    const cx = w * 0.5;
    const cy = h * 0.5;

    Matter.Composite.clear(engine.world, false);

    const scaled = scrollScaledRef.current;
    const k = Math.min(SKILL_LAYERS.length - 2, Math.floor(scaled));
    const frac = scaled - k;
    const nearSingularity =
      scaled > 0.1 &&
      scaled < SKILL_LAYERS.length - 1.1 &&
      frac > 0.32 &&
      frac < 0.68;
    const inBurst = frac >= 0.48 && nearSingularity;

    const newBodies = layer.items.map((_, idx) => {
      const count = layer.items.length;
      const baseAngle = (idx / Math.max(1, count)) * Math.PI * 2 - Math.PI / 2;
      const target = computeOrbitalTarget(
        idx,
        count,
        w,
        h,
        cx,
        cy,
        0,
        layer.orbitStyle,
        1,
        0,
      );

      const spawnR = 8;
      const spawnX = nearSingularity
        ? cx + Math.cos(baseAngle) * spawnR
        : target.x;
      const spawnY = nearSingularity
        ? cy + Math.sin(baseAngle) * spawnR
        : target.y;

      const body = Matter.Bodies.circle(spawnX, spawnY, 40, {
        frictionAir: 0.13,
        restitution: 0.42,
        mass: 1.5,
        collisionFilter: {
          mask: nearSingularity ? 0 : 0xffffffff,
        },
      });

      if (inBurst) {
        Matter.Body.setVelocity(body, {
          x: Math.cos(baseAngle) * 2.4,
          y: Math.sin(baseAngle) * 2.4,
        });
      }

      return body;
    });

    Matter.Composite.add(engine.world, newBodies);
    bodiesRef.current = newBodies;

    // Cache measured capsule half-dimensions once mounted to avoid layout reads inside RAF
    const measureId = requestAnimationFrame(() => {
      dimsRef.current = layer.items.map((_, idx) => {
        const el = elRefs.current[idx];
        return {
          hw: el ? el.offsetWidth * 0.5 : 58,
          hh: el ? el.offsetHeight * 0.5 : 19,
        };
      });
    });

    return () => cancelAnimationFrame(measureId);
  }, [activeLayerIdx, scrollScaledRef]);

  // Core 60fps Matter-JS simulation + orbital targeting + temporal-smoothed GPU loop
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0, scale: 0 },
    });
    engineRef.current = engine;

    const measureDims = () => {
      const layer = SKILL_LAYERS[activeIdxRef.current] ?? SKILL_LAYERS[0];
      dimsRef.current = layer.items.map((_, idx) => {
        const el = elRefs.current[idx];
        return {
          hw: el ? el.offsetWidth * 0.5 : 58,
          hh: el ? el.offsetHeight * 0.5 : 19,
        };
      });
    };

    const ro = new ResizeObserver(measureDims);
    ro.observe(stage);

    // Spawn initial layer 01 bodies immediately so mount starts populated
    const initialLayer = SKILL_LAYERS[activeIdxRef.current] ?? SKILL_LAYERS[0];
    const w0 = stage.clientWidth || 640;
    const h0 = stage.clientHeight || 360;
    const initialBodies = initialLayer.items.map((_, idx) => {
      const t = computeOrbitalTarget(
        idx,
        initialLayer.items.length,
        w0,
        h0,
        w0 * 0.5,
        h0 * 0.5,
        0,
        initialLayer.orbitStyle,
        1,
        0,
      );
      return Matter.Bodies.circle(t.x, t.y, 40, {
        frictionAir: 0.13,
        restitution: 0.42,
        mass: 1.5,
      });
    });
    Matter.Composite.add(engine.world, initialBodies);
    bodiesRef.current = initialBodies;
    measureDims();

    let rafId = 0;
    let lastNow = performance.now();
    const startNow = lastNow;
    let smoothScaled = clamp(scrollScaledRef.current, 0, SKILL_LAYERS.length - 1);
    let isVisible = true;
    let running = false;

    const tick = (now: number) => {
      if (!isVisible) {
        running = false;
        return;
      }
      const dt = Math.min(24, Math.max(8, now - lastNow));
      lastNow = now;
      const elapsedSec = (now - startNow) * 0.001;

      const w = stage.clientWidth || 640;
      const h = stage.clientHeight || 360;
      const cx = w * 0.5;
      const cy = h * 0.5;

      const targetScaled = clamp(scrollScaledRef.current, 0, SKILL_LAYERS.length - 1);
      const damp = 1 - Math.exp(-dt * 0.0065);
      smoothScaled += (targetScaled - smoothScaled) * damp;

      const k = Math.min(SKILL_LAYERS.length - 2, Math.floor(smoothScaled));
      const frac = smoothScaled - k;

      let tPull = 0;
      let tOut = 1;
      let shaderBurst = 0;
      let shaderPull = 0;

      if (frac < 0.5) {
        tPull = smoothstep(0.14, 0.495, frac);
        shaderPull = tPull;
        shaderBurst = 0;
      } else {
        tOut = smoothstep(0.505, 0.93, frac);
        shaderBurst = Math.sin(clamp((frac - 0.5) / 0.4, 0, 1) * Math.PI);
        shaderPull = Math.max(0, 1 - tOut * 2.4) * 0.55;
      }

      const displayedLayer = SKILL_LAYERS[activeIdxRef.current] ?? SKILL_LAYERS[0];

      // Exponentially damp WebGL uniforms so shader glow & lensing never step on wheel ticks
      const shaderDamp = 1 - Math.exp(-dt * 0.008);
      const ptr = pointerRef.current;
      shaderStateRef.current.pull +=
        (shaderPull - shaderStateRef.current.pull) * shaderDamp;
      shaderStateRef.current.burst +=
        (shaderBurst - shaderStateRef.current.burst) * shaderDamp;
      shaderStateRef.current.accent = displayedLayer.accentRgb;
      shaderStateRef.current.mouseX +=
        ((ptr.active ? ptr.nx : 0) - shaderStateRef.current.mouseX) * 0.07;
      shaderStateRef.current.mouseY +=
        ((ptr.active ? ptr.ny : 0) - shaderStateRef.current.mouseY) * 0.07;

      const bodies = bodiesRef.current;
      const count = bodies.length;
      const passThrough = tPull > 0.08 || tOut < 0.7;
      const targetMask = passThrough ? 0 : 0xffffffff;

      // Soft critically-damped orbital spring steering + fluid pointer forces
      for (let i = 0; i < count; i++) {
        const body = bodies[i];
        body.collisionFilter.mask = targetMask;

        const { localPull, localOut } = computeItemPhase(
          i,
          count,
          frac,
          tPull,
          tOut,
        );
        const itemScaleMult =
          frac < 0.5
            ? Math.pow(Math.max(0, 1 - localPull), 1.45)
            : 0.06 + 0.94 * localOut;
        const itemTwistRad =
          frac < 0.5 ? localPull * 1.65 : (1 - localOut) * -0.9;
        const itemStiffness =
          frac < 0.5
            ? 0.00045 + localPull * 0.0024
            : 0.00062 + (1 - localOut) * 0.00095;

        const target = computeOrbitalTarget(
          i,
          count,
          w,
          h,
          cx,
          cy,
          elapsedSec,
          displayedLayer.orbitStyle,
          itemScaleMult,
          itemTwistRad,
        );

        const fx = (target.x - body.position.x) * itemStiffness;
        const fy = (target.y - body.position.y) * itemStiffness;
        Matter.Body.applyForce(body, body.position, { x: fx, y: fy });

        if (ptr.active && tPull < 0.25 && tOut > 0.72) {
          const dxM = body.position.x - ptr.x;
          const dyM = body.position.y - ptr.y;
          const distM = Math.hypot(dxM, dyM);
          const radius = 195;
          if (distM > 4 && distM < radius) {
            const strength = (1 - distM / radius) * 0.0026;
            const nx = dxM / distM;
            const ny = dyM / distM;
            if (mouseModeRef.current === "repel") {
              Matter.Body.applyForce(body, body.position, {
                x: nx * strength,
                y: ny * strength,
              });
            } else {
              Matter.Body.applyForce(body, body.position, {
                x: (-nx * 0.9 - ny * 0.45) * strength,
                y: (-ny * 0.9 + nx * 0.45) * strength,
              });
            }
          }
        }
      }

      Matter.Engine.update(engine, dt);

      // Sync physics body positions with clean, upright uniform scale & smooth horizon dissolve
      for (let i = 0; i < count; i++) {
        const el = elRefs.current[i];
        const body = bodies[i];
        if (!el || !body) continue;

        const dim = dimsRef.current[i] ?? { hw: 58, hh: 19 };
        const dxC = cx - body.position.x;
        const dyC = cy - body.position.y;
        const distC = Math.hypot(dxC, dyC);

        const { localPull, localOut } = computeItemPhase(
          i,
          count,
          frac,
          tPull,
          tOut,
        );

        const uniformScale =
          frac < 0.5
            ? 1 - Math.pow(localPull, 1.25) * 0.58
            : 0.48 + 0.52 * smoothstep(0.0, 0.9, localOut);

        // Gentle velocity banking only — labels remain upright and legible throughout
        const tilt = clamp(body.velocity.x * 0.012, -0.055, 0.055);

        // Dissolve smoothly at the photon ring edge so pills never pile up over the dark core
        const horizonFade = smoothstep(32, 86, distC);
        const pullFade = frac < 0.5 ? 1 - smoothstep(0.45, 0.88, localPull) : 1;
        const burstFade = frac >= 0.5 ? smoothstep(0.06, 0.42, localOut) : 1;
        const alpha = clamp(horizonFade * pullFade * burstFade, 0, 1);

        el.style.transform = `translate3d(${(body.position.x - dim.hw).toFixed(2)}px, ${(body.position.y - dim.hh).toFixed(2)}px, 0) rotate(${tilt.toFixed(4)}rad) scale(${uniformScale.toFixed(4)})`;
        el.style.opacity = alpha.toFixed(3);
        el.style.pointerEvents = alpha > 0.35 ? "auto" : "none";
      }

      rafId = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (!running && isVisible) {
        running = true;
        lastNow = performance.now();
        rafId = requestAnimationFrame(tick);
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
      { rootMargin: "150px 0px", threshold: 0.01 },
    );
    io.observe(stage);
    startLoop();

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      io.disconnect();
      ro.disconnect();
      Matter.Composite.clear(engine.world, false);
      Matter.Engine.clear(engine);
      engineRef.current = null;
      bodiesRef.current = [];
    };
  }, [scrollScaledRef]);

  const currentLayer = SKILL_LAYERS[activeLayerIdx] ?? SKILL_LAYERS[0];

  return (
    <div
      ref={stageRef}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        pointerRef.current = {
          x,
          y,
          nx: (x / Math.max(1, rect.width)) * 2 - 1,
          ny: -((y / Math.max(1, rect.height)) * 2 - 1),
          active: true,
        };
      }}
      onPointerLeave={() => {
        pointerRef.current.active = false;
      }}
      className="relative h-[clamp(275px,46svh,385px)] w-full overflow-hidden rounded-3xl bg-[#05070b] select-none"
    >
      {/* WebGL Black Hole Singularity & Supernova Shockwave Backdrop */}
      <BlackHoleShaderCanvas shaderStateRef={shaderStateRef} />

      {/* Minimal Floating Top HUD: Gravity Phase Status + Mouse Repel/Attract Toggle */}
      <div className="pointer-events-none relative z-20 flex items-center justify-between gap-3 px-3 pt-3">
        <div className="liquid-glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-display text-[12px] font-medium text-white/90">
          <span
            className="relative z-10 size-1.5 rounded-full transition-colors"
            style={{ backgroundColor: currentLayer.accentHex }}
          />
          <span className="relative z-10">
            {currentLayer.shortLabel} · {phaseLabel}
          </span>
        </div>

        <button
          type="button"
          onClick={() =>
            setMouseMode((prev) => (prev === "repel" ? "attract" : "repel"))
          }
          className="liquid-glass pointer-events-auto inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-display text-[12px] font-medium text-white/90 transition-transform hover:scale-[1.03] hover:text-white cursor-pointer"
        >
          <span className="relative z-10 flex items-center gap-1.5">
            {mouseMode === "repel" ? <Wind size={12} /> : <Magnet size={12} />}
            <span>Mouse: {mouseMode === "repel" ? "Repel" : "Attract"}</span>
          </span>
        </button>
      </div>

      {/* Orbiting Brand Skill Capsules */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        {currentLayer.items.map((tool, idx) => {
          const isSelected = inspectedTool?.id === tool.id;
          return (
            <button
              key={`${currentLayer.id}-${tool.id}`}
              ref={(el) => {
                elRefs.current[idx] = el;
              }}
              type="button"
              onClick={() =>
                onInspectTool(inspectedTool?.id === tool.id ? null : tool)
              }
              onMouseEnter={() => onInspectTool(tool)}
              style={{
                opacity: 0,
                willChange: "transform, opacity",
                transformOrigin: "center center",
              }}
              className={`liquid-glass-fast absolute left-0 top-0 inline-flex items-center gap-2.5 whitespace-nowrap rounded-full px-4 py-2 font-display text-[13px] font-medium tracking-[-0.01em] transition-colors cursor-pointer ${
                isSelected
                  ? "bg-white/22 text-white ring-1 ring-white/55"
                  : "bg-black/62 text-white/95 hover:bg-white/14"
              }`}
            >
              <span className="relative z-10 flex items-center gap-2.5">
                <ToolIconGlyph tool={tool} size={20} />
                <span>{tool.name}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, type RefObject } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

export interface BlackHoleShaderState {
  pull: number;
  burst: number;
  mouseX: number;
  mouseY: number;
  accent: [number, number, number];
}

const VERTEX_SHADER = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

varying vec2 vUv;

uniform float uTime;
uniform vec2 uResolution;
uniform float uPull;
uniform float uBurst;
uniform vec2 uMouse;
uniform vec3 uAccent;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p = rot * p * 2.06 + vec2(17.1, 31.7);
    a *= 0.5;
  }
  return v;
}

float starLayer(vec2 uv, float scale) {
  vec2 scaled = uv * scale;
  vec2 baseId = floor(scaled);
  vec2 gv = fract(scaled) - 0.5;
  float total = 0.0;

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 neighbor = vec2(float(x), float(y));
      vec2 id = baseId + neighbor;
      float rnd = hash21(id);
      if (rnd >= 0.71) {
        vec2 offset = vec2(fract(rnd * 17.3) - 0.5, fract(rnd * 43.7) - 0.5) * 0.72;
        float d = length(gv - neighbor - offset);

        float core = exp(-d * 38.0) * 1.15;
        float halo = exp(-d * 12.0) * 0.22 * smoothstep(0.6, 0.0, d);
        float twinkle = 0.76 + 0.24 * sin(uTime * 0.95 + rnd * 28.0);
        total += (core + halo) * twinkle * smoothstep(0.71, 1.0, rnd);
      }
    }
  }
  return total;
}

void main() {
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 centered = (vUv - 0.5) * vec2(aspect, 1.0);
  vec2 p = centered - uMouse * 0.024;

  // Rotate into Gargantua diagonal frame: disk slashes from top-left (11 o'clock) to bottom-right (5 o'clock)
  float roll = -0.96 + uMouse.x * 0.04;
  float cR = cos(roll);
  float sR = sin(roll);
  // q.x runs along the diagonal accretion ribbon; q.y is perpendicular (+q.y toward upper-right halo)
  vec2 q = vec2(p.x * cR - p.y * sR, p.x * sR + p.y * cR);

  // Singularity sits slightly nestled into the upper-right of the foreground disk ribbon
  vec2 bhCenter = vec2(0.01, 0.018);
  vec2 bhP = q - bhCenter;
  float r = length(bhP);
  float phi = atan(bhP.y, bhP.x);

  // Event horizon radius responds to gravitational pull & supernova burst
  float horizonR = 0.118 + uPull * 0.02 - uBurst * 0.012;
  float dr = max(0.0, r - horizonR);

  // Relativistic Schwarzschild deflection warping background starfield & nebula
  float lensDeflect = (0.018 + uPull * 0.014) / (r * r + 0.018);
  vec2 lensedUv = p * (1.0 - min(0.58, lensDeflect));

  // 1) Deep Graphite-Obsidian Space (#05070b) + Platinum-Silver interstellar dust
  vec3 bg = vec3(0.0196, 0.0275, 0.0431);
  vec3 platinum = vec3(0.97, 0.98, 1.0);
  vec3 iceSilver = vec3(0.76, 0.85, 0.98);
  vec3 silverMist = mix(vec3(0.62, 0.72, 0.88), uAccent, 0.28);

  // Diagonal cosmic nebula haze surrounding the accretion plane
  float nebulaNoise = fbm(vec2(q.x * 3.1 - uTime * 0.03, q.y * 5.2 + 4.0));
  float nebulaMask = exp(-abs(q.y) * 3.2) * exp(-abs(q.x) * 1.45) * smoothstep(horizonR * 0.9, horizonR + 0.35, r);
  bg += mix(silverMist, iceSilver, 0.35) * pow(nebulaNoise, 1.8) * nebulaMask * (0.42 + 0.25 * uPull);

  // Pinpoint lensed starfield with cool platinum & ice hues
  float s1 = starLayer(lensedUv + vec2(uTime * 0.0018, 0.0), 10.5);
  vec3 starCol = mix(platinum, iceSilver, 0.3) * s1;
  bg += starCol * smoothstep(horizonR * 1.02, horizonR + 0.18, r);

  // 2) Gravitationally Lensed Relativistic Halo Arch (far side of disk bent OVER and UNDER the shadow)
  float archAsym = mix(1.45, 0.82, smoothstep(-0.14, 0.14, bhP.y));
  float lensedRadial = dr * archAsym;

  // Concentric relativistic plasma striations wrapped around the photon sphere
  float ringPhase = log(lensedRadial + 0.009) * 19.0 - uTime * (0.85 + uPull * 0.7);
  float ringSwirl = fbm(vec2(cos(phi) * 2.2 + lensedRadial * 16.0, sin(phi) * 2.2 - uTime * 0.38));
  float ringStriations = 0.52 + 0.48 * cos(ringPhase + ringSwirl * 4.2);
  ringStriations = pow(clamp(ringStriations, 0.0, 1.0), 1.45);

  // Halo envelope hugging the black hole shadow
  float archEnvelope = smoothstep(horizonR * 0.94, horizonR + 0.01, r)
    * (exp(-lensedRadial * (13.5 - uPull * 2.8)) * 0.95 + exp(-lensedRadial * 5.2) * 0.32 * ringSwirl);

  // Dark fibrous dust gaps inside the lensed arch
  float archDust = smoothstep(0.24, 0.68, fbm(vec2(phi * 3.0, lensedRadial * 26.0 - uTime * 0.25)));
  vec3 archColor = mix(silverMist * 0.68, iceSilver, 0.56);
  archColor = mix(archColor, platinum, exp(-lensedRadial * 28.0));
  vec3 lensedArch = archColor * archEnvelope * (0.45 + 0.85 * ringStriations) * (0.55 + 0.45 * archDust) * (1.35 + uPull * 0.85);

  // Razor-sharp incandescent inner Photon Ring + secondary Einstein Ring
  float photonRing1 = exp(-abs(r - (horizonR + 0.005)) * 115.0) * (1.85 + uPull * 1.1 + uBurst * 0.9);
  float photonRing2 = exp(-abs(r - (horizonR + 0.022)) * 68.0) * 0.72 * (0.65 + 0.35 * sin(phi * 2.0 - uTime));
  vec3 photonGlow = mix(iceSilver, platinum, 0.76) * (photonRing1 + photonRing2);

  // Combine background + lensed arch + photon ring, then carve out the pitch-black Event Horizon shadow
  vec3 color = bg + lensedArch + photonGlow;
  float shadowMask = smoothstep(horizonR - 0.004, horizonR + 0.006, r);
  color *= shadowMask;

  // 3) Foreground Inclined Equatorial Accretion Disk (slicing diagonally IN FRONT of the black hole)
  float gravBend = -0.015 * q.x / (q.x * q.x + 0.045);
  float diskY = q.y + 0.026 + gravBend;
  float tiltRatio = 0.095 + 0.045 * abs(q.x);
  float diskCross = diskY / max(0.018, tiltRatio);

  // Envelope of the diagonal foreground ribbon
  float ribbonCore = exp(-abs(diskCross) * 2.65) * exp(-abs(q.x) * 1.18);
  float ribbonWings = exp(-abs(diskCross) * 1.15) * exp(-abs(q.x) * 0.92) * 0.55;
  float ribbonMask = clamp(ribbonCore + ribbonWings, 0.0, 1.0);

  // Anisotropic Keplerian shear filaments streaming along the diagonal slash
  float streamFlow = uTime * (0.95 + uPull * 0.85);
  float filament1 = fbm(vec2(q.x * 6.5 - streamFlow * 0.45, diskCross * 7.5 + fbm(vec2(q.x * 12.0, diskCross * 4.0))));
  float filament2 = fbm(vec2(q.x * 16.0 - streamFlow * 0.8, diskCross * 14.0 - 9.2));
  float plasmaThreads = pow(clamp(filament1 * 0.62 + filament2 * 0.52, 0.0, 1.0), 1.55);

  // Relativistic Doppler beaming (GLSL ES 1.00 compatible sigmoid; central grazing rim is white-hot)
  float qxNorm = q.x * 2.2;
  float doppler = 1.08 - 0.24 * (qxNorm / sqrt(1.0 + qxNorm * qxNorm));
  float causticRim = exp(-abs(diskY + 0.016) * 78.0) * exp(-abs(q.x) * 2.35) * (1.85 + uPull * 0.95);

  // Dark absorbing obsidian dust lanes & rocky debris flecks running down the center of the foreground disk
  float dustVeinNoise = fbm(vec2(q.x * 8.5 - streamFlow * 0.35, diskCross * 11.5 + 3.7));
  float dustCenterBand = exp(-abs(diskCross + 0.12) * 3.8) * smoothstep(0.32, 0.68, dustVeinNoise);
  float debrisFlecks = smoothstep(0.76, 0.89, noise(vec2(q.x * 38.0 - streamFlow * 0.5, diskCross * 28.0)))
    * exp(-abs(diskCross) * 2.2);
  float darkDust = clamp(dustCenterBand * 0.82 + debrisFlecks * 0.65, 0.0, 0.92);

  // First: foreground disk physically OCCLUDES the black hole ring & background behind it
  float fgOcclusion = clamp(ribbonMask * (0.68 + 0.32 * darkDust) * smoothstep(0.78, 0.12, abs(q.x)), 0.0, 0.94);
  color *= (1.0 - fgOcclusion);

  // Second: composite the glowing foreground plasma & dark dust lanes over the occluded path
  vec3 diskBaseCol = mix(silverMist * 0.72, iceSilver, 0.56);
  vec3 diskHotCol = mix(iceSilver, platinum, 0.78);
  vec3 fgPlasma = mix(diskBaseCol, diskHotCol, smoothstep(0.35, 0.85, plasmaThreads))
    * ribbonMask * plasmaThreads * doppler * (1.65 + uPull * 0.9);
  fgPlasma += platinum * causticRim;

  // Attenuate foreground plasma along the dark absorbing dust vein so the dark lane reads clearly
  fgPlasma *= (1.0 - darkDust * 0.76);
  vec3 dustTint = vec3(0.025, 0.032, 0.048) * darkDust * ribbonMask;

  color += fgPlasma + dustTint;

  // 4) Supernova Relativistic Shockwave on Layer Crossing
  if (uBurst > 0.005) {
    float shockR = horizonR + uBurst * 0.78;
    float shockBand = exp(-abs(r - shockR) * 28.0) * sin(clamp(uBurst, 0.0, 1.0) * 3.14159);
    float diskFlash = exp(-abs(diskCross) * 3.2) * exp(-abs(q.x - (uBurst - 0.5) * 0.9) * 3.5) * uBurst;
    color += mix(iceSilver, platinum, 0.72) * (shockBand * 1.55 + diskFlash * 0.95);
  }

  // Smooth ACES-style highlight compression so incandescent cores stay detailed & silky
  color = color / (1.0 + color * 0.28);
  color = pow(max(color, vec3(0.0)), vec3(0.95));

  // Feathered elliptical alpha dissolve into #05070b obsidian black
  vec2 edgeVec = (vUv - 0.5) * vec2(2.02, 2.08);
  float edgeAlpha = smoothstep(1.0, 0.52, length(edgeVec));

  gl_FragColor = vec4(color * edgeAlpha, edgeAlpha);
}
`;

export default function BlackHoleShaderCanvas({
  shaderStateRef,
}: {
  shaderStateRef: RefObject<BlackHoleShaderState>;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    let renderer: Renderer | null = null;
    let rafId = 0;
    let ro: ResizeObserver | null = null;
    let disposed = false;

    try {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      renderer = new Renderer({
        canvas,
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        dpr,
      });
      const gl = renderer.gl;

      const uniforms = {
        uTime: { value: 0 },
        uResolution: { value: [host.clientWidth || 640, host.clientHeight || 420] },
        uPull: { value: 0 },
        uBurst: { value: 0 },
        uMouse: { value: [0, 0] },
        uAccent: { value: [0.31, 0.55, 1.0] },
      };

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: VERTEX_SHADER,
        fragment: FRAGMENT_SHADER,
        uniforms,
        transparent: true,
      });
      const mesh = new Mesh(gl, { geometry, program });

      const syncSize = () => {
        if (!renderer || disposed) return;
        const w = Math.max(1, host.clientWidth);
        const h = Math.max(1, host.clientHeight);
        renderer.setSize(w, h);
        uniforms.uResolution.value = [w, h];
      };

      syncSize();
      ro = new ResizeObserver(syncSize);
      ro.observe(host);

      const start = performance.now();
      let isVisible = true;
      let running = false;

      const renderLoop = (now: number) => {
        if (disposed || !renderer || !isVisible) {
          running = false;
          return;
        }
        const st = shaderStateRef.current;
        uniforms.uTime.value = (now - start) * 0.001;
        uniforms.uPull.value = st.pull;
        uniforms.uBurst.value = st.burst;
        uniforms.uMouse.value = [st.mouseX, st.mouseY];
        uniforms.uAccent.value = st.accent;

        renderer.render({ scene: mesh });
        rafId = requestAnimationFrame(renderLoop);
      };

      const startLoop = () => {
        if (!running && isVisible && !disposed) {
          running = true;
          rafId = requestAnimationFrame(renderLoop);
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
      io.observe(host);
      startLoop();

      return () => {
        disposed = true;
        running = false;
        cancelAnimationFrame(rafId);
        io.disconnect();
        ro?.disconnect();
        try {
          gl.getExtension("WEBGL_lose_context")?.loseContext();
        } catch {
          /* ignore */
        }
      };
    } catch {
      /* CSS radial singularity backdrop remains visible if WebGL is unavailable */
      return () => {
        disposed = true;
        cancelAnimationFrame(rafId);
        ro?.disconnect();
      };
    }
  }, [shaderStateRef]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(79,140,255,0.12)_0%,rgba(5,7,11,0.78)_48%,transparent_76%)]"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}

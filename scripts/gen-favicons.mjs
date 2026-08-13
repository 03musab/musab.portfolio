// Renders the favicon design (public/favicon.svg) into PNG files
// at 16/32/48/180px without any external dependencies.
// Run: node scripts/gen-favicons.mjs
import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";

const SIZES = [16, 32, 48, 180];
const SS = 3; // supersampling factor for anti-aliasing

// --- design constants (64x64 canvas, mirrors public/favicon.svg) ---
const BG = [10, 10, 12]; // #0a0a0c
const WHITE = [245, 245, 247]; // #f5f5f7
const C1 = [59, 130, 246]; // #3b82f6
const C2 = [168, 85, 247]; // #a855f7
const STROKE_HALF = 2.5; // M strokes: stroke-width 5

// Linked "MM" monogram polylines (shared center stem at x=33)
const MS = [
  [
    [15, 45],
    [15, 20],
    [24, 45],
    [33, 20],
    [33, 45],
  ],
  [
    [33, 45],
    [33, 20],
    [42, 45],
    [51, 20],
    [51, 45],
  ],
];

// --- geometry helpers ---
const lerp = (a, b, t) => a + (b - a) * t;
const lerpColor = (c1, c2, t) => c1.map((v, i) => lerp(v, c2[i], t));

// Signed distance to a rounded box (center cx,cy, half extents hx,hy, corner radius r)
function sdRoundBox(px, py, cx, cy, hx, hy, r) {
  const qx = Math.abs(px - cx) - (hx - r);
  const qy = Math.abs(py - cy) - (hy - r);
  return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r;
}

function distToSeg(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const l2 = dx * dx + dy * dy;
  let t = l2 === 0 ? 0 : ((px - x1) * dx + (py - y1) * dy) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
}

function strokeDist(px, py) {
  let d = Infinity;
  for (const poly of MS) {
    for (let i = 0; i < poly.length - 1; i++) {
      d = Math.min(d, distToSeg(px, py, poly[i][0], poly[i][1], poly[i + 1][0], poly[i + 1][1]));
    }
  }
  return d;
}

// --- PNG encoder (minimal, RGBA, no deps) ---
const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const t = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])));
  return Buffer.concat([len, t, data, crc]);
}

function encodePNG(size, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  const stride = size * 4;
  const raw = Buffer.alloc((stride + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (stride + 1)] = 0; // filter: none
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// --- render ---
function render(size) {
  const scale = size / 64;
  const rgba = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0,
        g = 0,
        b = 0,
        a = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const px = (x + (sx + 0.5) / SS) / scale;
          const py = (y + (sy + 0.5) / SS) / scale;

          if (strokeDist(px, py) <= STROKE_HALF) {
            r += WHITE[0];
            g += WHITE[1];
            b += WHITE[2];
            a += 255;
            continue;
          }

          const dOut = sdRoundBox(px, py, 32, 32, 28.5, 28.5, 12.5); // border rect 3.5..60.5
          const dIn = sdRoundBox(px, py, 32, 32, 25.5, 25.5, 11.5); // inner edge 6.5..57.5
          const dBg = sdRoundBox(px, py, 32, 32, 32, 32, 14); // background rect 0..64

          if (dOut <= 0) {
            if (dIn < 0) {
              r += BG[0];
              g += BG[1];
              b += BG[2];
              a += 255;
            } else {
              const t = Math.max(0, Math.min(1, (px + py) / 128));
              const c = lerpColor(C1, C2, t);
              r += c[0];
              g += c[1];
              b += c[2];
              a += 255;
            }
          } else if (dBg <= 0) {
            r += BG[0];
            g += BG[1];
            b += BG[2];
            a += 255;
          }
          // else: transparent
        }
      }
      const n = SS * SS;
      const i = (y * size + x) * 4;
      rgba[i] = Math.round(r / n);
      rgba[i + 1] = Math.round(g / n);
      rgba[i + 2] = Math.round(b / n);
      rgba[i + 3] = Math.round(a / n);
    }
  }
  return encodePNG(size, rgba);
}

for (const s of SIZES) {
  const png = render(s);
  writeFileSync(`public/favicon-${s}x${s}.png`, png);
  console.log(`wrote public/favicon-${s}x${s}.png (${png.length} bytes)`);
  if (s === 180) {
    writeFileSync("public/apple-touch-icon.png", png);
    console.log(`wrote public/apple-touch-icon.png (${png.length} bytes)`);
  }
}

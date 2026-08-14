// Generates the three example GLB models used by <FluidGlass />:
//   public/assets/3d/lens.glb
//   public/assets/3d/bar.glb
//   public/assets/3d/cube.glb
// Run with: node scripts/gen-3d-models.mjs
import { Scene, Mesh, MeshPhysicalMaterial, BoxGeometry, LatheGeometry, Vector2 } from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "assets", "3d");
mkdirSync(outDir, { recursive: true });

// Node doesn't ship FileReader — polyfill the tiny surface the exporter needs.
class FileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onloadend) this.onloadend();
    });
  }
}
globalThis.FileReader = FileReader;

function glassMaterial() {
  return new MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.05,
    transparent: true,
    opacity: 1,
    transmission: 0.9,
    thickness: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
  });
}

// Biconvex lens — an ellipse of revolution (radius > thickness).
function buildLens() {
  const radius = 1.0;
  const thickness = 0.5;
  const pts = [];
  const steps = 64;
  for (let i = 0; i <= steps; i++) {
    const a = Math.PI * (i / steps);
    pts.push(new Vector2(radius * Math.sin(a), thickness * Math.cos(a)));
  }
  const mesh = new Mesh(new LatheGeometry(pts, 96), glassMaterial());
  mesh.name = "lens";
  return mesh;
}

function buildBar() {
  const mesh = new Mesh(new BoxGeometry(1.8, 0.5, 0.5), glassMaterial());
  mesh.name = "bar";
  return mesh;
}

function buildCube() {
  const mesh = new Mesh(new BoxGeometry(1, 1, 1), glassMaterial());
  mesh.name = "cube";
  return mesh;
}

const exporter = new GLTFExporter();

function save(scene, filename) {
  exporter.parse(
    scene,
    (gltf) => {
      const out = Buffer.from(gltf);
      writeFileSync(join(outDir, filename), out);
      console.log("wrote", join(outDir, filename), out.byteLength, "bytes");
    },
    (err) => {
      console.error("export failed for", filename, err);
      process.exit(1);
    },
    { binary: true }
  );
}

save(new Scene().add(buildLens()), "lens.glb");
save(new Scene().add(buildBar()), "bar.glb");
save(new Scene().add(buildCube()), "cube.glb");

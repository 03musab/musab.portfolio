/**
 * Full-viewport animated aurora backdrop, shared across all pages.
 * Renders the static dark base (grid + vignette) with slow-drifting
 * colour blooms on top. Pure CSS — no canvas, no shaders.
 * Respects prefers-reduced-motion via .aurora-blob rules in globals.css.
 */
export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="bg-static-aurora fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: -1 }}
    >
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <div className="aurora-blob aurora-blob-4" />
      <div className="aurora-blob aurora-blob-5" />
    </div>
  );
}

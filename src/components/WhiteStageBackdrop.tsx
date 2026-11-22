/**
 * Airy Mint & Ice-Aqua Atmospheric Studio Backdrop for the middle White stage.
 * Strictly bounded (`absolute inset-0 overflow-hidden`) inside `#white-stage` so it
 * can never overflow or bleed into the Black stages above or below.
 */
export default function WhiteStageBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    >
      {/* Zone 1 (About / Top): Upper-Left Mint-Emerald Air Bloom + Lower-Right Ice-Aqua Bloom */}
      <div
        className="white-mesh-mint absolute -left-[12%] top-[2%] h-[680px] w-[68vw] min-w-[420px] max-w-[980px]"
        style={{
          background:
            "radial-gradient(ellipse 68% 64% at 32% 35%, rgba(167, 243, 208, 0.52) 0%, rgba(187, 247, 208, 0.3) 34%, rgba(209, 250, 229, 0.12) 58%, rgba(251, 253, 255, 0) 78%)",
        }}
      />
      <div
        className="white-mesh-aqua absolute -right-[12%] top-[8%] h-[740px] w-[72vw] min-w-[460px] max-w-[1060px]"
        style={{
          background:
            "radial-gradient(ellipse 70% 66% at 68% 62%, rgba(103, 232, 249, 0.48) 0%, rgba(125, 211, 252, 0.28) 36%, rgba(186, 230, 253, 0.12) 60%, rgba(251, 253, 255, 0) 80%)",
        }}
      />

      {/* Zone 2 (Featured Projects / Middle): Balanced Aqua-Left & Mint-Right Soft Blooms */}
      <div
        className="white-mesh-aqua absolute -left-[14%] top-[36%] h-[820px] w-[70vw] min-w-[440px] max-w-[1020px]"
        style={{
          background:
            "radial-gradient(ellipse 68% 64% at 34% 50%, rgba(125, 211, 252, 0.42) 0%, rgba(186, 230, 253, 0.24) 38%, rgba(251, 253, 255, 0) 76%)",
        }}
      />
      <div
        className="white-mesh-mint absolute -right-[14%] top-[44%] h-[820px] w-[70vw] min-w-[440px] max-w-[1020px]"
        style={{
          background:
            "radial-gradient(ellipse 68% 64% at 66% 50%, rgba(167, 243, 208, 0.44) 0%, rgba(209, 250, 229, 0.24) 38%, rgba(251, 253, 255, 0) 76%)",
        }}
      />

      {/* Zone 3 (My Journey / Lower): Upper-Left Mint & Lower-Right Ice-Aqua Blooms */}
      <div
        className="white-mesh-mint absolute -left-[12%] bottom-[4%] h-[820px] w-[68vw] min-w-[420px] max-w-[980px]"
        style={{
          background:
            "radial-gradient(ellipse 68% 64% at 34% 48%, rgba(167, 243, 208, 0.48) 0%, rgba(187, 247, 208, 0.26) 36%, rgba(251, 253, 255, 0) 76%)",
        }}
      />
      <div
        className="white-mesh-aqua absolute -right-[12%] -bottom-[2%] h-[860px] w-[74vw] min-w-[460px] max-w-[1080px]"
        style={{
          background:
            "radial-gradient(ellipse 70% 66% at 68% 56%, rgba(103, 232, 249, 0.48) 0%, rgba(125, 211, 252, 0.28) 38%, rgba(251, 253, 255, 0) 80%)",
        }}
      />

      {/* Delicate Editorial Orbital Ring & 4-Point Sparkles in About Zone */}
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-x-0 top-12 h-[760px] w-full opacity-[0.6]"
      >
        <defs>
          <linearGradient id="white-orbit-stroke" x1="25%" y1="15%" x2="80%" y2="85%">
            <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.28" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.16" />
          </linearGradient>
        </defs>

        <ellipse
          cx="720"
          cy="430"
          rx="360"
          ry="165"
          transform="rotate(-32 720 430)"
          stroke="url(#white-orbit-stroke)"
          strokeWidth="1.25"
        />

        <path
          d="M 468 344 L 473 357 L 486 362 L 473 367 L 468 380 L 463 367 L 450 362 L 463 357 Z"
          fill="#86efac"
          fillOpacity="0.45"
        />

        <path
          d="M 946 382 L 951 395 L 964 400 L 951 405 L 946 418 L 941 405 L 928 400 L 941 395 Z"
          fill="#38bdf8"
          fillOpacity="0.4"
        />
      </svg>

      {/* Top & bottom feather fades so blooms melt invisibly into #fbfdff before the bridges */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#fbfdff] via-[#fbfdff]/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#fbfdff] via-[#fbfdff]/65 to-transparent" />
    </div>
  );
}

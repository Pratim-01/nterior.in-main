/**
 * Soft, slow-moving gradient backdrop used behind the product listing
 * pages. Built from the same orange → red brand pair used across the
 * navbar (rgb(255,170,0) → rgb(207,0,6)), kept very low-opacity and
 * heavily blurred so it reads as ambient depth rather than decoration
 * competing with the product cards on top of it.
 *
 * Pure CSS/markup — no state or handlers — so this stays a server
 * component. `aria-hidden` + `pointer-events-none` keep it fully out of
 * the way of layout, scrolling, and assistive tech.
 */
export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-[#fff8f0] via-[#f8fafc] to-[#f8fafc]"
    >
      {/* top-left amber glow */}
      <div
        className="aurora-blob-1 absolute -left-32 -top-40 h-[520px] w-[520px] rounded-full opacity-[0.16] blur-[110px]"
        style={{ background: "rgb(255,170,0)" }}
      />

      {/* bottom-right red glow */}
      <div
        className="aurora-blob-2 absolute -bottom-48 -right-24 h-[560px] w-[560px] rounded-full opacity-[0.12] blur-[120px]"
        style={{ background: "rgb(207,0,6)" }}
      />

      {/* soft mid-page warmth for depth */}
      <div
        className="aurora-blob-3 absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-[0.10] blur-[100px]"
        style={{ background: "linear-gradient(135deg, rgb(255,170,0), rgb(207,0,6))" }}
      />

      {/* faint dot-grid texture, fading out toward the bottom */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(rgba(17,24,39,0.06) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(ellipse 70% 55% at 50% 0%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 55% at 50% 0%, black, transparent)",
        }}
      />
    </div>
  );
}

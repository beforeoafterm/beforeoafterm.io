// film grain as an inline SVG element: no CSS url() involved, because the
// Turbopack + Lightning CSS dev pipeline rewrites url() assets to chunk
// paths that 404. Procedural turbulence costs one rasterization, no fetch.
export function Grain() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full opacity-[0.035] dark:opacity-[0.05]"
    >
      <filter id="grain-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="2"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-noise)" />
    </svg>
  )
}

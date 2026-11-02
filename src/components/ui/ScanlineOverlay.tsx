/** Líneas de barrido de monitor CRT, muy sutiles, sobre todo el sitio. */
export function ScanlineOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.07] mix-blend-multiply"
      style={{
        backgroundImage: 'repeating-linear-gradient(to bottom, #000 0px, #000 1px, transparent 2px, transparent 4px)',
      }}
    />
  );
}

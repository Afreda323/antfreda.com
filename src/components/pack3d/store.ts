/**
 * The rip, shared between the DOM controls (drag, Rip here, keys) and the
 * WebGL pack. Mutable and read every frame, so the drag never re-renders React.
 */
export const packState = {
  /** 0..1 how far the tear has run along the crimp. */
  progress: 0,
  /** Which way the hand is tearing. */
  dir: 1 as 1 | -1,
  phase: "sealed" as "sealed" | "tearing" | "ripped" | "gone",
  /** Pointer over the pack, -1..1 each axis (y down), for the tilt. */
  tilt: { x: 0, y: 0, active: false },
  /** The DOM pack the 3D pack is fitted to (measured every frame). */
  el: null as HTMLElement | null,
  /** performance.now() / 1000 when the rip completed (drives the flap tumble and the cards). */
  rippedAt: 0,
  /** Bumped by "Rip another pack" so the scene rebuilds the flap. */
  generation: 0,
  /** Capture only: hold the post-rip moment at this many seconds (the rise is not catchable live in headless). */
  freezeSince: null as number | null,
};

declare global {
  interface Window {
    __pack?: typeof packState;
  }
}
// capture tooling reads and holds the scene through this; development only
if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") window.__pack = packState;

export function resetPackState() {
  packState.progress = 0;
  packState.dir = 1;
  packState.phase = "sealed";
  packState.rippedAt = 0;
  packState.generation++;
}

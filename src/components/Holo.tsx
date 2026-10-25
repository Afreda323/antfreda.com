import * as React from "react";
import dynamic from "next/dynamic";
import { CardFace } from "./Card";
import type { Card } from "@/content/cards";

const DogModel = dynamic(() => import("./DogModel"), { ssr: false });

/**
 * The secret rare. The card tilts toward the hand (or the phone's tilt), a
 * rainbow foil sheen and a glare ride the same angle, glints sparkle across
 * the frame, and the dog stands live in the art window, turning to look at you.
 * `live` mounts the 3D only when the card is actually on show.
 */
export function Holo({ card, index, live, headingLevel = 3, interactive = false }: { card: Card; index: number; live: boolean; headingLevel?: 2 | 3 | 4; interactive?: boolean }) {
  const root = React.useRef<HTMLDivElement>(null);
  const pointer = React.useRef({ x: 0, y: 0 });
  const [modelIn, setModelIn] = React.useState(false);

  const set = React.useCallback((x: number, y: number) => {
    // x, y in -1..1
    pointer.current = { x, y };
    const el = root.current;
    if (!el) return;
    el.style.setProperty("--rx", `${(-y * 12).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 16).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${((x + 1) * 50).toFixed(1)}%`);
    el.style.setProperty("--my", `${((y + 1) * 50).toFixed(1)}%`);
    el.style.setProperty("--hyp", Math.min(1, Math.hypot(x, y)).toFixed(3));
  }, []);

  const onMove = (e: React.PointerEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    set(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onLeave = () => set(0, 0);
  /** iOS only sends device tilt after the visitor grants it, from a gesture. */
  const askTilt = () => {
    const DOE = (window as unknown as { DeviceOrientationEvent?: { requestPermission?: () => Promise<string> } }).DeviceOrientationEvent;
    if (typeof DOE?.requestPermission === "function") DOE.requestPermission().catch(() => undefined);
  };

  // phones: the foil follows the device's tilt where the browser allows it without a prompt
  React.useEffect(() => {
    if (!live) return;
    const on = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      set(Math.max(-1, Math.min(1, e.gamma / 25)), Math.max(-1, Math.min(1, (e.beta - 45) / 25)));
    };
    window.addEventListener("deviceorientation", on);
    return () => window.removeEventListener("deviceorientation", on);
  }, [live, set]);

  // idle drift so the foil still moves when nobody is touching it
  React.useEffect(() => {
    if (!live) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let touched = false;
    const el = root.current;
    const mark = () => (touched = true);
    el?.addEventListener("pointermove", mark, { once: true });
    const t0 = performance.now();
    const tick = (t: number) => {
      if (!touched) {
        const s = (t - t0) / 1000;
        set(Math.sin(s * 0.7) * 0.55, Math.sin(s * 0.9 + 1) * 0.35);
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el?.removeEventListener("pointermove", mark);
    };
  }, [live, set]);

  return (
    <div ref={root} className="holo" data-model={modelIn || undefined} onPointerMove={onMove} onPointerLeave={onLeave} onPointerDown={askTilt}>
      <div className="holo-tilt">
        <CardFace
          card={card}
          index={index}
          headingLevel={headingLevel}
          eager
          interactive={interactive}
          artSlot={
            <>
              {live ? (
                <div className="holo-model" aria-hidden>
                  <DogModel pointer={pointer} onReady={() => setModelIn(true)} />
                </div>
              ) : null}
              <div className="holo-art-foil" aria-hidden />
            </>
          }
        />
        <div className="holo-glare" aria-hidden />
      </div>
    </div>
  );
}

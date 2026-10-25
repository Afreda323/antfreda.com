import * as React from "react";

/**
 * Any card under the hand: it tilts toward the pointer (or the phone's tilt
 * when `gyro`), and a glare rides the same angle. Writes --rx, --ry, --mx,
 * --my and --hyp on itself for any foil layered inside.
 */
export function Tilt({ children, className = "", gyro = false, strength = 1 }: { children: React.ReactNode; className?: string; gyro?: boolean; strength?: number }) {
  const root = React.useRef<HTMLDivElement>(null);
  const raf = React.useRef(0);
  const want = React.useRef({ x: 0, y: 0 });
  const cur = React.useRef({ x: 0, y: 0 });

  const apply = React.useCallback(() => {
    const el = root.current;
    if (!el) return;
    const c = cur.current;
    const w = want.current;
    c.x += (w.x - c.x) * 0.2;
    c.y += (w.y - c.y) * 0.2;
    el.style.setProperty("--rx", `${(-c.y * 11 * strength).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(c.x * 15 * strength).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${((c.x + 1) * 50).toFixed(1)}%`);
    el.style.setProperty("--my", `${((c.y + 1) * 50).toFixed(1)}%`);
    el.style.setProperty("--hyp", Math.min(1, Math.hypot(c.x, c.y)).toFixed(3));
    if (Math.abs(w.x - c.x) + Math.abs(w.y - c.y) > 0.002) raf.current = requestAnimationFrame(apply);
    else raf.current = 0;
  }, [strength]);

  const aim = React.useCallback(
    (x: number, y: number) => {
      want.current = { x, y };
      if (!raf.current) raf.current = requestAnimationFrame(apply);
    },
    [apply]
  );

  React.useEffect(() => () => cancelAnimationFrame(raf.current), []);

  React.useEffect(() => {
    if (!gyro) return;
    const on = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      aim(Math.max(-1, Math.min(1, e.gamma / 25)), Math.max(-1, Math.min(1, (e.beta - 45) / 25)));
    };
    window.addEventListener("deviceorientation", on);
    return () => window.removeEventListener("deviceorientation", on);
  }, [gyro, aim]);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" && !gyro) return;
    const r = e.currentTarget.getBoundingClientRect();
    aim(((e.clientX - r.left) / r.width) * 2 - 1, ((e.clientY - r.top) / r.height) * 2 - 1);
  };

  return (
    <div ref={root} className={`tilt ${className}`} onPointerMove={onMove} onPointerLeave={() => aim(0, 0)}>
      <div className="tilt-body">
        {children}
        <div className="tilt-glare" aria-hidden />
      </div>
    </div>
  );
}

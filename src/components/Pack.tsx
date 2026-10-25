import * as React from "react";
import { burst } from "@/lib/shards";
import { buzz, crinkle, rip } from "@/lib/sfx";
import { TOTAL } from "@/content/cards";
import { profile, START_YEAR } from "@/content/resume";
import { packState } from "@/components/pack3d/store";

/** The tear line across the crimp, as fractions of the pack box: a jagged run left to right. */
const TEAR_Y = 0.115;
const TEAR: [number, number][] = (() => {
  const pts: [number, number][] = [];
  const n = 28;
  for (let i = 0; i <= n; i++) {
    const x = i / n;
    // a deterministic zigzag with a little irregularity, so the rip looks torn, not cut
    const jag = (i % 2 ? 1 : -1) * (0.008 + 0.006 * Math.abs(Math.sin(i * 2.7)));
    pts.push([x, TEAR_Y + jag + 0.006 * Math.sin(i * 0.9)]);
  }
  return pts;
})();
const pct = (v: number) => `${(v * 100).toFixed(2)}%`;
const FLAP_CLIP = `polygon(0 0, 100% 0, ${[...TEAR].reverse().map(([x, y]) => `${pct(x)} ${pct(y)}`).join(", ")})`;
const BODY_CLIP = `polygon(${TEAR.map(([x, y]) => `${pct(x)} ${pct(y)}`).join(", ")}, 100% 100%, 0 100%)`;

type Props = {
  onOpened: () => void;
  /** Reduced motion: the rip is skipped and the pack simply opens. */
  calm: boolean;
  /** Already ripped: the torn wrapper stays on the table, its flap gone. */
  opened: boolean;
  onReset: () => void;
  /** The WebGL pack is drawing: the DOM print turns transparent but stays for the heading and controls. */
  gl?: boolean;
};

export function Pack({ onOpened, calm, opened, onReset, gl = false }: Props) {
  const root = React.useRef<HTMLDivElement | null>(null);
  const setRoot = React.useCallback((el: HTMLDivElement | null) => {
    root.current = el;
    if (el) packState.el = el;
  }, []);
  const [progress, setProgress] = React.useState(0);
  const [phase, setPhase] = React.useState<"sealed" | "tearing" | "ripped" | "gone">("sealed");
  const drag = React.useRef<{ x: number; y: number; t: number; lastX: number; lastT: number; moved: number; dir: 1 | -1 } | null>(null);
  const lastTick = React.useRef(0);
  const auto = React.useRef(0);

  // the foil follows the pointer: tilt and sheen
  const onHover = (e: React.PointerEvent) => {
    const el = root.current;
    if (!el || phase !== "sealed") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--px", px.toFixed(3));
    el.style.setProperty("--py", py.toFixed(3));
    packState.tilt.x = px * 2 - 1;
    packState.tilt.y = py * 2 - 1;
    packState.tilt.active = true;
  };
  const onLeave = () => {
    packState.tilt.active = false;
    const el = root.current;
    if (!el) return;
    el.style.setProperty("--px", "0.5");
    el.style.setProperty("--py", "0.4");
  };

  const complete = React.useCallback(() => {
    if (phase === "ripped" || phase === "gone") return;
    setProgress(1);
    setPhase("ripped");
    packState.rippedAt = performance.now() / 1000;
    const el = root.current;
    if (!calm && el) {
      const r = el.getBoundingClientRect();
      rip();
      buzz([18, 40, 70]);
      burst(r.left + r.width / 2, r.top + r.height * TEAR_Y, { count: 110, spread: Math.PI * 1.4, power: 1.5, up: 0.9 });
      burst(r.left + r.width * 0.1, r.top + r.height * TEAR_Y, { count: 28, spread: Math.PI * 0.9, power: 1.1, up: 0.8 });
      burst(r.left + r.width * 0.9, r.top + r.height * TEAR_Y, { count: 28, spread: Math.PI * 0.9, power: 1.1, up: 0.8 });
      document.documentElement.classList.remove("kick");
      void document.documentElement.offsetWidth;
      document.documentElement.classList.add("kick");
      // one white frame, then it falls away
      const flash = document.createElement("div");
      flash.className = "rip-flash";
      flash.setAttribute("aria-hidden", "true");
      document.body.appendChild(flash);
      flash.addEventListener("animationend", () => flash.remove());
    }
    window.setTimeout(() => {
      setPhase("gone");
      onOpened();
    }, calm ? 150 : gl ? 820 : 380);
  }, [calm, gl, onOpened, phase]);

  // the 3D pack reads the tear every frame
  React.useEffect(() => {
    packState.progress = progress;
    packState.phase = phase;
  }, [progress, phase]);

  /** Tap, Enter or Space: the same rip, played out on its own. */
  const autoRip = React.useCallback(() => {
    if (phase !== "sealed") return;
    if (calm) return complete();
    setPhase("tearing");
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / 260);
      setProgress(p);
      if (Math.floor(p * 12) !== lastTick.current) {
        lastTick.current = Math.floor(p * 12);
        crinkle(0.6 + p * 0.6);
      }
      if (p < 1) auto.current = requestAnimationFrame(step);
      else complete();
    };
    auto.current = requestAnimationFrame(step);
  }, [calm, complete, phase]);

  React.useEffect(() => () => cancelAnimationFrame(auto.current), []);

  const onDown = (e: React.PointerEvent) => {
    if (phase !== "sealed") return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, t: performance.now(), lastX: e.clientX, lastT: performance.now(), moved: 0, dir: 1 };
  };
  const onMove = (e: React.PointerEvent) => {
    onHover(e);
    const d = drag.current;
    const el = root.current;
    if (!d || !el) return;
    const dx = e.clientX - d.x;
    d.moved = Math.max(d.moved, Math.abs(dx));
    if (d.moved < 6) return;
    if (phase === "sealed") setPhase("tearing");
    d.dir = dx >= 0 ? 1 : -1;
    packState.dir = d.dir;
    const w = el.getBoundingClientRect().width;
    const p = Math.min(1, Math.abs(dx) / (w * 0.7));
    setProgress(p);
    el.dataset.dir = d.dir === 1 ? "ltr" : "rtl";
    const tick = Math.floor(p * 18);
    if (tick !== lastTick.current && !calm) {
      lastTick.current = tick;
      crinkle(0.5 + p);
      if (tick % 4 === 0) buzz(6);
    }
    d.lastX = e.clientX;
    d.lastT = performance.now();
    if (p >= 1) {
      drag.current = null;
      complete();
    }
  };
  const onUp = (e: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    if (!d || phase === "ripped" || phase === "gone") return;
    // the browser took the gesture (a vertical scroll): reset, never rip
    if (e.type === "pointercancel") {
      setProgress(0);
      setPhase("sealed");
      return;
    }
    // a tap rips; a vertical drag that never became a tear does nothing
    if (d.moved < 6) return Math.abs(e.clientY - d.y) < 10 ? autoRip() : undefined;
    const v = Math.abs(e.clientX - d.lastX) / Math.max(1, performance.now() - d.lastT);
    if (progress > 0.42 || v > 0.9) {
      // finish the tear from wherever the hand let go
      const from = progress;
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, from + (t - t0) / 120);
        setProgress(p);
        if (p < 1) auto.current = requestAnimationFrame(step);
        else complete();
      };
      auto.current = requestAnimationFrame(step);
    } else {
      setProgress(0);
      setPhase("sealed");
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      autoRip();
    }
  };

  const seen = TEAR.filter(([x]) => (root.current?.dataset.dir === "rtl" ? 1 - x : x) <= progress + 0.0001);

  if (opened) {
    return (
      <div ref={setRoot} className={`pack is-open${gl ? " is-gl" : ""}`}>
        <div className="pack-tilt">
          <div className="pack-half pack-body" style={{ clipPath: BODY_CLIP }}>
            <PackPrint semantic />
          </div>
        </div>
        <div className="pack-after">
          <p>All 12 cards are below.</p>
          <button type="button" className="btn btn-quiet" onClick={onReset}>
            Rip another pack
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={setRoot}
      className={`pack${gl ? " is-gl" : ""}`}
      data-phase={phase}
      style={{ "--tear": progress } as React.CSSProperties}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onPointerLeave={onLeave}
    >
      <div className="pack-tilt">
        <div className="pack-inside" aria-hidden />
        <div className="pack-half pack-body" style={{ clipPath: BODY_CLIP }}>
          <PackPrint semantic />
        </div>
        <div className="pack-half pack-flap" style={{ clipPath: FLAP_CLIP }} aria-hidden>
          <PackPrint />
        </div>
        <svg className="pack-gash" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          <polyline className="gash-glow" points={seen.map(([x, y]) => `${x * 100},${y * 100}`).join(" ")} />
          <polyline className="gash-core" points={seen.map(([x, y]) => `${x * 100},${y * 100}`).join(" ")} />
        </svg>
        <div className="pack-light" aria-hidden />
        <button type="button" className="pack-tab" onClick={autoRip} onKeyDown={onKey} aria-describedby="pack-hint" tabIndex={phase === "sealed" ? 0 : -1}>
          <svg className="pack-tab-notch" width="8" height="10" viewBox="0 0 8 10" aria-hidden>
            <path d="M0 0l8 5-8 5z" fill="currentColor" />
          </svg>
          Rip here
          <span className="sr-only">: open the pack of {TOTAL} cards</span>
        </button>
      </div>
      <p id="pack-hint" className="pack-hint">
        Drag across the top to rip it open
      </p>
    </div>
  );
}

/**
 * Both halves print the same wrapper; the clip decides which part each shows.
 * The body's copy carries the page's real heading; the flap's copy is decoration.
 */
function PackPrint({ semantic = false }: { semantic?: boolean }) {
  return (
    <div className="pack-print">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="pack-art" src="/art/pack.webp" alt="" width={1024} height={1536} draggable={false} />
      <div className="pack-sheen" />
      <div className="pack-crimp pack-crimp-top" />
      <div className="pack-crimp pack-crimp-bottom" />
      <div className="pack-label">
        {semantic ? (
          <>
            <h1 id="name" className="pack-brand">
              {profile.name}
            </h1>
            <p className="pack-sub">{profile.title}</p>
          </>
        ) : (
          <>
            <span className="pack-brand">{profile.name}</span>
            <span className="pack-sub">{profile.title}</span>
          </>
        )}
      </div>
      <div className="pack-foot">
        <span>{TOTAL}-card booster</span>
        <span>Series {START_YEAR} to now</span>
      </div>
    </div>
  );
}

import * as React from "react";
import { MAILTO } from "@/lib/contact";
import { cards, TOTAL } from "@/content/cards";
import { CardBack, CardFace, rarityName } from "./Card";
import { Holo } from "./Holo";
import { burst } from "@/lib/shards";
import { buzz, sparkle, thump, whoosh } from "@/lib/sfx";

type Props = { onDone: () => void; calm: boolean };

/**
 * After the rip: the cards stand in a stack and the visitor flicks through
 * them. Every card comes out face up except the secret rare, which arrives
 * face down: the stack shakes, light builds behind it, and it flips in with a
 * burst. The last card stays: it is the contact card.
 */
export function Reveal({ onDone, calm }: Props) {
  // the secret rare always arrives face down with the build-up. Browsers that render the 3D turn flip it in 3D;
  // phones and Safari (WebKit ignores backface-visibility on faces with their own layers, so the mirrored front
  // shows through the back) get a 2D turn: squeeze to the edge, swap faces at zero width, spring back out
  const flips = React.useMemo(() => {
    if (typeof window === "undefined") return true;
    const phone = window.matchMedia("(max-width: 860px), (hover: none)").matches;
    const webkit = /^((?!chrome|chromium|crios|fxios|edg|android).)*safari/i.test(navigator.userAgent);
    return !phone && !webkit;
  }, []);
  const turns = needsTurn;
  const [i, setI] = React.useState(0);
  const [face, setFace] = React.useState<"back" | "front">(() => (turns(0) ? "back" : "front"));
  /** A throw in flight: input waits until the card has left. */
  const flying = React.useRef(false);
  const stage = React.useRef<HTMLDivElement>(null);
  const top = React.useRef<HTMLDivElement>(null);
  const drag = React.useRef<{ x: number; y: number; dx: number; lastX: number; lastT: number; v: number } | null>(null);
  const last = i === TOTAL - 1;
  const card = cards[i];

  React.useEffect(() => {
    stage.current?.focus();
  }, []);

  // the secret rare's build-up: the room goes quiet and the face-down card beats like a heart, faster and
  // faster, then turns. Reduced motion keeps the hush and the turn, without the pulse.
  const [hush, setHush] = React.useState(false);
  const [shock, setShock] = React.useState(0);
  React.useEffect(() => {
    if (face === "front") return;
    const secret = card.rarity === "secret";
    if (!secret || calm) {
      const t = window.setTimeout(() => turn(), calm ? 600 : 520);
      return () => window.clearTimeout(t);
    }
    const beats = [250, 900, 1420, 1840, 2160, 2400, 2580];
    const timers = beats.map((at, k) =>
      window.setTimeout(() => {
        // pulse the card inside the face, never the face itself: its own transform carries the 3D turn
        const back = top.current?.querySelector<HTMLElement>(".flip-back .card-back");
        const s = 0.025 + k * 0.006;
        back?.animate(
          [{ transform: "scale(1)" }, { transform: `scale(${1 + s})`, offset: 0.18 }, { transform: "scale(1)", offset: 0.45 }, { transform: `scale(${1 + s * 0.6})`, offset: 0.62 }, { transform: "scale(1)" }],
          { duration: 420, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
        );
        stage.current?.style.setProperty("--beat", String(0.35 + k * 0.1));
        thump(0.6 + k * 0.07);
        buzz([16, 120, 12]);
      }, at)
    );
    const go = window.setTimeout(() => turn(), 2820);
    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(go);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, face]);

  const turning = React.useRef(false);
  function turn() {
    if (face === "front" || turning.current) return;
    const flip = top.current?.querySelector<HTMLElement>(".flip");
    if (flips || calm || !flip || !flip.animate) {
      setFace("front");
      celebrate(card.rarity);
      return;
    }
    // 2D: in to the edge, faces swap while the card has no width, then out with an overshoot
    turning.current = true;
    const squeeze = flip.animate([{ transform: "scaleX(1)" }, { transform: "scaleX(0.02) scaleY(1.04)" }], { duration: 220, easing: "cubic-bezier(0.55, 0, 1, 0.45)", fill: "forwards" });
    squeeze.onfinish = () => {
      setFace("front");
      celebrate(card.rarity);
      requestAnimationFrame(() => {
        const open = flip.animate(
          [{ transform: "scaleX(0.02) scaleY(1.04)" }, { transform: "scaleX(1.08) scaleY(1.02)", offset: 0.6 }, { transform: "scaleX(1)" }],
          { duration: 420, easing: "cubic-bezier(0.2, 0.9, 0.3, 1)" }
        );
        squeeze.cancel();
        open.onfinish = () => (turning.current = false);
      });
    };
  }

  /** The secret rare's arrival: sparkle, a buzz, and foil out of both sides of the card. */
  function celebrate(rarity: string) {
    // the room lights back up even with reduced motion: the hush is state, not decoration
    if (rarity === "secret") setHush(false);
    if (calm) return;
    const el = top.current;
    const r = el?.getBoundingClientRect();
    if (rarity === "secret") {
      // the room lights back up in one wave: a ring of light, rainbow rays, foil falling from the top
      setHush(false);
      setShock((n) => n + 1);
      stage.current?.style.setProperty("--beat", "0");
      for (let k = 0; k < 16; k++) {
        window.setTimeout(() => {
          const x = window.innerWidth * (0.08 + Math.random() * 0.84);
          burst(x, -10, { count: 7, spread: 0.7, power: 0.45, up: -0.4, dir: Math.PI / 2, hues: [268, 186, 44, 330] });
        }, 120 + k * 130);
      }
      sparkle("secret");
      buzz([30, 60, 30, 60, 120]);
      if (r) {
        // out of both sides, clear of the name block and the text
        const midY = r.top + r.height * 0.55;
        burst(r.left, midY, { count: 70, spread: Math.PI * 0.6, power: 1.5, up: 0.5, dir: -Math.PI * 0.85 });
        burst(r.right, midY, { count: 70, spread: Math.PI * 0.6, power: 1.5, up: 0.5, dir: -Math.PI * 0.15 });
        window.setTimeout(() => {
          burst(r.left, midY, { count: 25, spread: Math.PI * 0.5, power: 1.1, up: 0.5, dir: -Math.PI * 0.9, hues: [44, 50] });
          burst(r.right, midY, { count: 25, spread: Math.PI * 0.5, power: 1.1, up: 0.5, dir: -Math.PI * 0.1, hues: [44, 50] });
        }, 160);
      }
    }
  }

  /**
   * Throws the top card off from wherever it is (a drag leaves it mid-flight),
   * then promotes the card already waiting underneath. That card is the same
   * element under the same key, so nothing remounts and nothing flashes.
   */
  function next(dir: 1 | -1 = -1) {
    if (flying.current) return;
    if (face === "back") return turn();
    if (last) return;
    const n = i + 1;
    const advance = () => {
      flying.current = false;
      setI(n);
      setFace(turns(n) ? "back" : "front");
      if (cards[n].rarity === "secret") setHush(true);
    };
    const el = top.current;
    if (calm || !el) return advance();
    whoosh();
    flying.current = true;
    // the throw before the secret rare goes slow: time stretches as the room goes quiet
    const slow = cards[n].rarity === "secret";
    if (slow) setHush(true);
    const ms = slow ? 900 : 340;
    el.style.transition = `transform ${ms}ms cubic-bezier(0.2, 0.7, 0.4, 1), opacity ${ms}ms ease-in`;
    el.style.transform = `translate(${dir * 125}vw, -14vh) rotate(${dir * 36}deg)`;
    el.style.opacity = "0.9";
    window.setTimeout(advance, ms - 10);
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return onDone();
    // keep focus inside the dialog
    if (e.key === "Tab") {
      const f = [...(stage.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [])];
      if (f.length) {
        const first = f[0];
        const lastEl = f[f.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === stage.current)) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          first.focus();
        }
      }
      return;
    }
    // Enter and Space on a link or button do that control's job, never advance the stack
    if ((e.target as HTMLElement).closest("a, button")) return;
    if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      next(1);
    }
  };

  const onDown = (e: React.PointerEvent) => {
    if (flying.current) return;
    if ((e.target as HTMLElement).closest("a,button")) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, dx: 0, lastX: e.clientX, lastT: performance.now(), v: 0 };
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    const el = top.current;
    if (!d || !el || last) return;
    const now = performance.now();
    d.v = (e.clientX - d.lastX) / Math.max(1, now - d.lastT);
    d.lastX = e.clientX;
    d.lastT = now;
    d.dx = e.clientX - d.x;
    el.style.transition = "none";
    el.style.transform = `translateX(${d.dx}px) rotate(${d.dx * 0.06}deg)`;
  };
  // the browser took the gesture (a scroll): spring back, never advance
  const onCancel = () => {
    drag.current = null;
    const el = top.current;
    if (el) {
      el.style.transition = "transform 380ms var(--ease-spring)";
      el.style.transform = "";
    }
  };
  const onUp = (e?: React.PointerEvent) => {
    const d = drag.current;
    drag.current = null;
    const el = top.current;
    if (!d) return;
    if (Math.abs(d.dx) < 6) return e && Math.abs(e.clientY - d.y) > 10 ? onCancel() : next(-1);
    if (!last && face === "front" && (Math.abs(d.dx) > 110 || Math.abs(d.v) > 0.7)) return next(d.dx > 0 ? 1 : -1);
    // not far enough: spring back to the stack
    if (el) {
      el.style.transition = "transform 380ms var(--ease-spring)";
      el.style.transform = "";
    }
  };

  /** The top card, the one waiting under it, and one more for depth: deepest first. */
  const visible = cards.slice(i, i + 3).map((c, k) => ({ c, idx: i + k, pos: k === 0 ? "top" : k === 1 ? "next" : "deep" }));

  return (
    <div
      ref={stage}
      className="reveal"
      data-flip={flips ? "3d" : "2d"}
      data-hush={hush || undefined}
      role="dialog"
      aria-modal="true"
      aria-label="The cards"
      tabIndex={-1}
      onKeyDown={onKey}
      data-rarity={card.rarity}
      data-face={face}
    >
      {/* the backdrop lands first and covers the hero; the bar, stack and hint come in after it */}
      <div className="reveal-bg" aria-hidden />
      <div className="reveal-rays" aria-hidden />
      <div className="reveal-hush" aria-hidden />
      {shock ? <div key={shock} className="reveal-shock" aria-hidden /> : null}
      <div className="reveal-bar">
        <p className="reveal-count" aria-live="polite">
          Card {i + 1} of {TOTAL}
          {face === "front" && card.rarity !== "standard" ? <span className="reveal-rarity"> · {rarityName(card.rarity)}</span> : null}
        </p>
        {/* on the last card the actions below say it; one button, not two */}
        {last && face === "front" ? null : (
          <button type="button" className="text-btn" onClick={onDone}>
            See all cards
          </button>
        )}
      </div>

      <div className="reveal-stack" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onCancel}>
        {/* the pile shakes on its own layer, so the stack's entrance never replays */}
        <div className="reveal-pile">
        {visible
          .slice()
          .reverse()
          .map(({ c, idx, pos }) => {
            const isTop = pos === "top";
            const f = isTop ? face : turns(idx) ? "back" : "front";
            return (
              <div
                key={c.id}
                ref={isTop ? top : undefined}
                className="reveal-card"
                data-pos={pos}
                data-face={f}
                data-rarity={c.rarity}
                aria-hidden={isTop ? undefined : true}
                style={isTop ? undefined : { transform: "", transition: "", opacity: "" }}
              >
                <div className="flip">
                  <div className="flip-back">
                    <CardBack />
                  </div>
                  <div className="flip-front">
                    {c.rarity === "secret" ? (
                      // mounted live one card early, so the dog is already drawn when it flips
                      <Holo card={c} index={idx} live={(isTop && face === "front") || pos === "next"} headingLevel={2} interactive={isTop} />
                    ) : (
                      <CardFace card={c} index={idx} headingLevel={isTop ? 2 : 3} eager />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="reveal-actions">
        {last && face === "front" ? (
          <>
            <a className="btn" href={MAILTO}>
              Email me
            </a>
            <button type="button" className="btn btn-quiet" onClick={onDone}>
              See all cards
            </button>
          </>
        ) : (
          <>
            <p className="reveal-hint">
              {face === "back" ? (
                "Tap to turn it over"
              ) : (
                <>
                  Tap or flick the card away<span className="hint-keys">, or press the right arrow key</span>
                </>
              )}
            </p>
            {/* a real control for screen readers, switches and anyone who would rather press than flick */}
            <button type="button" className="btn btn-quiet reveal-next" onClick={() => next(1)}>
              {face === "back" ? "Turn it over" : "Next card"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/** Cards come out of the pack face up; only the secret rare arrives face down and turns. */
function needsTurn(n: number) {
  return cards[n]?.rarity === "secret";
}

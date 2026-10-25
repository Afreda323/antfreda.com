import * as React from "react";
import { MAILTO } from "@/lib/contact";
import { cards, TOTAL } from "@/content/cards";
import { CardBack, CardFace, rarityName } from "./Card";
import { Holo } from "./Holo";
import { burst } from "@/lib/shards";
import { buzz, sparkle, whoosh } from "@/lib/sfx";

type Props = { onDone: () => void; calm: boolean };

/**
 * After the rip: the cards stand in a stack and the visitor flicks through
 * them. Every card comes out face up except the secret rare, which arrives
 * face down: the stack shakes, light builds behind it, and it flips in with a
 * burst. The last card stays: it is the contact card.
 */
export function Reveal({ onDone, calm }: Props) {
  const [i, setI] = React.useState(0);
  const [face, setFace] = React.useState<"back" | "front">(() => (needsTurn(0) ? "back" : "front"));
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

  // rares turn over on their own after a beat; the secret rare gets the build-up
  React.useEffect(() => {
    if (face === "front") return;
    const secret = card.rarity === "secret";
    const t = window.setTimeout(() => turn(), calm ? 0 : secret ? 1100 : 520);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, face]);

  function turn() {
    if (face === "front") return;
    setFace("front");
    if (calm) return;
    const el = top.current;
    const r = el?.getBoundingClientRect();
    if (card.rarity === "secret") {
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
      setFace(needsTurn(n) ? "back" : "front");
    };
    const el = top.current;
    if (calm || !el) return advance();
    whoosh();
    flying.current = true;
    el.style.transition = "transform 340ms cubic-bezier(0.4, 0, 1, 1), opacity 340ms ease-in";
    el.style.transform = `translate(${dir * 125}vw, -14vh) rotate(${dir * 36}deg)`;
    el.style.opacity = "0.9";
    window.setTimeout(advance, 330);
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
  const onUp = () => {
    const d = drag.current;
    drag.current = null;
    const el = top.current;
    if (!d) return;
    if (Math.abs(d.dx) < 6) return next(-1);
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

      <div className="reveal-stack" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
        {/* the pile shakes on its own layer, so the stack's entrance never replays */}
        <div className="reveal-pile">
        {visible
          .slice()
          .reverse()
          .map(({ c, idx, pos }) => {
            const isTop = pos === "top";
            const f = isTop ? face : needsTurn(idx) ? "back" : "front";
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
          <p className="reveal-hint">
            {face === "back" ? (
              "Tap to turn it over"
            ) : (
              <>
                Tap or flick the card away<span className="hint-keys">, or press the right arrow key</span>
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

/** Cards come out of the pack face up; only the secret rare arrives face down and turns. */
function needsTurn(n: number) {
  return cards[n]?.rarity === "secret";
}

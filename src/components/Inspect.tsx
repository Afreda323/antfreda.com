import * as React from "react";
import { cards, TOTAL } from "@/content/cards";
import { CardFace } from "./Card";
import { CardText } from "./CardText";
import { Holo } from "./Holo";
import { Tilt } from "./Tilt";
import { MAILTO } from "@/lib/contact";

/**
 * A card picked out of the binder: big, tilting under the hand, with
 * everything it says beside it. Arrows step through the set; Escape or the
 * backdrop puts it back. Focus stays inside and returns to the pocket.
 */
export function Inspect({ index, onClose, onStep }: { index: number; onClose: () => void; onStep: (i: number) => void }) {
  const card = cards[index];
  const root = React.useRef<HTMLDivElement>(null);
  const closeBtn = React.useRef<HTMLButtonElement>(null);

  // focus Close for the keyboard without scrolling to it (on phones it sits at the bottom), and open every card at its top
  React.useEffect(() => {
    closeBtn.current?.focus({ preventScroll: true });
  }, []);
  React.useLayoutEffect(() => {
    const r = root.current;
    if (!r) return;
    r.scrollTop = 0;
    r.querySelectorAll<HTMLElement>(".inspect-panel, .inspect-text").forEach((el) => (el.scrollTop = 0));
  }, [index]);

  const step = (d: number) => onStep((index + d + TOTAL) % TOTAL);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") return onClose();
    if (e.key === "ArrowRight") return step(1);
    if (e.key === "ArrowLeft") return step(-1);
    if (e.key === "Tab") {
      const f = [...(root.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]):not([tabindex="-1"])') ?? [])];
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) {
        e.preventDefault();
        f[f.length - 1].focus();
      } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
        e.preventDefault();
        f[0].focus();
      }
    }
  };

  // keys are heard on the document while the modal is open, so a step (which swaps the card) never strands focus outside it
  const onKeyRef = React.useRef(onKey);
  onKeyRef.current = onKey;
  React.useEffect(() => {
    const h = (e: KeyboardEvent) => onKeyRef.current(e);
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, []);

  return (
    <div className="inspect" role="dialog" aria-modal="true" aria-labelledby="inspect-title" ref={root} tabIndex={-1}>
      <button type="button" className="inspect-backdrop" aria-label="Close" tabIndex={-1} onClick={onClose} />
      {/* Close sits where people look for it: the top-right corner, first in the focus order */}
      <button ref={closeBtn} type="button" className="inspect-close" onClick={onClose} aria-label="Close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      <div className="inspect-panel">
        <div className="inspect-card" key={card.id}>
          {card.rarity === "secret" ? (
            <Holo card={card} index={index} live headingLevel={3} interactive />
          ) : (
            <Tilt className={`tilt-card rarity-${card.rarity}`}>
              <CardFace card={card} index={index} headingLevel={3} eager />
            </Tilt>
          )}
        </div>
        <div className="inspect-text" id="inspect-title-wrap">
          <div className="inspect-copy" key={card.id}>
            <span id="inspect-title" className="sr-only">
              {card.name} card
            </span>
            <p className="inspect-count" aria-live="polite">
              Card {index + 1} of {TOTAL}
            </p>
            <CardText id={card.id} headingLevel={2} />
          </div>
          {/* one row, in the order it reads: back, the ask, forward */}
          <div className="inspect-foot">
            <button type="button" className="btn btn-quiet inspect-step" onClick={() => step(-1)} aria-label="Previous card">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <a className="btn inspect-email" href={MAILTO}>
              Email me
            </a>
            <button type="button" className="btn btn-quiet inspect-step" onClick={() => step(1)} aria-label="Next card">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

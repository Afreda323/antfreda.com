import * as React from "react";
import { TOTAL, typeLabel, type Card as CardData, type CardType, type Rarity } from "@/content/cards";

/** One stroke family for every mark on the cards: 24 grid, 2px round strokes. */
export function TypeMark({ type, title = true }: { type: CardType; title?: boolean }) {
  const label = typeLabel(type);
  const common = { width: "1em", height: "1em", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <span className={`type-mark type-${type}`} role={title ? "img" : undefined} aria-label={title ? `${label} type` : undefined} aria-hidden={title ? undefined : true}>
      <svg {...common}>
        {type === "ai" && <path d="M12 3l1.9 5.6L19.5 10.5l-5.6 1.9L12 18l-1.9-5.6L4.5 10.5l5.6-1.9z" />}
        {type === "platform" && (
          <>
            <path d="M12 3l8 4.5-8 4.5-8-4.5z" />
            <path d="M4 12l8 4.5 8-4.5" />
            <path d="M4 16.5L12 21l8-4.5" />
          </>
        )}
        {type === "web" && (
          <>
            <path d="M8.5 7L4 12l4.5 5" />
            <path d="M15.5 7L20 12l-4.5 5" />
            <path d="M13.5 5l-3 14" />
          </>
        )}
        {type === "finance" && (
          <>
            <circle cx="12" cy="12" r="8.5" />
            <circle cx="12" cy="12" r="4.5" />
          </>
        )}
        {type === "early" && (
          <>
            <path d="M12 21v-9" />
            <path d="M12 12c0-4 3-6.5 7-6.5 0 4-3 6.5-7 6.5z" />
            <path d="M12 14.5c0-3-2.3-5-5.5-5 0 3 2.3 5 5.5 5z" />
          </>
        )}
        {type === "partner" && (
          <>
            <ellipse cx="12" cy="16" rx="4.5" ry="3.8" />
            <circle cx="6" cy="10.5" r="1.8" />
            <circle cx="9.6" cy="6.6" r="1.8" />
            <circle cx="14.4" cy="6.6" r="1.8" />
            <circle cx="18" cy="10.5" r="1.8" />
          </>
        )}
      </svg>
    </span>
  );
}

const RARITY_NAME: Record<Rarity, string> = { standard: "", rare: "Rare", secret: "Secret rare" };

/** This set's own rarity ladder: one, two or three foil pips; the chase card's three are gold, ringed. */
export function RarityMark({ rarity }: { rarity: Rarity }) {
  if (rarity === "standard") return null;
  const n = rarity === "rare" ? 2 : 3;
  const w = 6 + (n - 1) * 9;
  return (
    <span className={`rarity rarity-${rarity}`} role="img" aria-label={RARITY_NAME[rarity]}>
      <svg height="1em" viewBox={`-3 -3 ${w + 6} 12`} aria-hidden>
        {rarity === "secret" ? <rect x={-2.5} y={-2.5} width={w + 5} height={11} rx={5.5} fill="none" stroke="currentColor" strokeWidth={1.2} /> : null}
        {Array.from({ length: n }, (_, i) => (
          <rect key={i} x={i * 9} y={0} width={6} height={6} rx={1.6} fill="currentColor" transform={`rotate(45 ${i * 9 + 3} 3)`} />
        ))}
      </svg>
    </span>
  );
}

export function rarityName(r: Rarity) {
  return RARITY_NAME[r];
}

/**
 * The card face. `compact` keeps it to what a printed card can hold (flavour
 * plus two moves); the binder prints every line beside it. `artSlot` lets the
 * holo put live 3D over the painted art.
 */
export function CardFace({
  card,
  index,
  compact = true,
  artSlot,
  headingLevel = 3,
  eager = false,
  interactive = false,
}: {
  eager?: boolean;
  /** Links on the card work (the live card in the reveal and inspect); off inside a binder pocket, which is itself a link. */
  interactive?: boolean;
  card: CardData;
  index: number;
  compact?: boolean;
  artSlot?: React.ReactNode;
  headingLevel?: 2 | 3 | 4;
}) {
  const H = `h${headingLevel}` as "h2" | "h3" | "h4";
  // the contact card's three short lines always fit; everything else shows two moves
  const moves = compact && card.rarity !== "secret" ? card.moves.slice(0, 2) : card.moves;
  const more = card.moves.length - moves.length;
  return (
    <div className={`card type-${card.type} rarity-${card.rarity}`} data-id={card.id}>
      <div className="card-inner">
        <div className="card-top">
          <H className="card-name">{card.name}</H>
          {/* where a game card prints HP: the years, or the dates */}
          {card.stat ? <span className="card-stat">{card.stat}</span> : null}
          <TypeMark type={card.type} />
        </div>
        <div className="card-art">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.art} alt={card.artAlt} width={1536} height={1024} loading={eager || index < 2 ? "eager" : "lazy"} decoding="async" draggable={false} />
          {artSlot}
        </div>
        <p className="card-role">{card.role}</p>
        <div className="card-body">
          {card.flavor ? <p className="card-flavor">{card.flavor}</p> : null}
          {moves.length > 0 ? (
            <ul className="card-moves">
              {moves.map((m) => (
                <li key={m.text}>
                  {m.name ? <b>{m.name}</b> : null}
                  {m.href && interactive ? (
                    <a href={m.href} target={m.href.startsWith("mailto:") ? undefined : "_blank"} rel={m.href.startsWith("mailto:") ? undefined : "me noopener"}>
                      {m.text}
                    </a>
                  ) : (
                    <span>{m.text}</span>
                  )}
                </li>
              ))}
            </ul>
          ) : null}
          {more > 0 ? <p className="card-more">+{more} more</p> : null}
        </div>
        <div className="card-foot">
          <span className="card-no">
            {String(index + 1).padStart(2, "0")}/{TOTAL}
          </span>
          <RarityMark rarity={card.rarity} />
          <span className="card-set" aria-label="AF set">
            AF
          </span>
        </div>
      </div>
    </div>
  );
}

/** The shared card back: the set's monogram on a woven foil field. */
export function CardBack() {
  return (
    <div className="card-back" aria-hidden>
      <div className="card-back-inner">
        <span className="card-back-mono">
          <span>AF</span>
        </span>
      </div>
    </div>
  );
}

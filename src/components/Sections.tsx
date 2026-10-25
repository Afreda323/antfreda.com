import * as React from "react";
import { cards } from "@/content/cards";
import { chapters, profile, skills } from "@/content/resume";

const indexOf = (id: string) => cards.findIndex((c) => c.id === id);
const job = (id: string) => chapters.find((c) => c.id === id)!;

/** Where Anthony has shipped, set as a wordmark row right under the pack. */
export function Proof() {
  const names = chapters.filter((c) => c.id !== "earlier").map((c) => c.company);
  return (
    <section className="proof" aria-label="Where I've worked">
      <p className="proof-label">Where I've worked</p>
      <ul className="proof-names">
        {names.map((n, i) => (
          <li key={n} data-now={i === 0 || undefined}>
            {n}
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Highlights: the outcomes worth a hiring manager's ten seconds, each on its
 * card's art, each opening that card. Every line is quoted from resume.ts.
 */
export function Highlights({ onOpen }: { onOpen: (i: number) => void }) {
  const yum = job("yum");
  const docn = job("digitalocean");

  // headlines lead with scope and leadership; a short line under the big two. The full bullets are one tap away in each card.
  // every tile has its own art
  const v1 = job("1v1me");
  const tiles = [
    {
      id: "digitalocean",
      size: "xl",
      art: "/art/digitalocean.webp",
      pos: "50% 40%",
      title: "Tech lead on the GenAI agent platform",
      sub: "The whole AI platform at DigitalOcean: agents, function calling, retrieval and evaluations.",
      line: docn.bullets[0],
      meta: `${docn.company} · ${docn.dates}`,
    },
    {
      id: "yum",
      size: "wide",
      art: "/art/yum.webp",
      pos: "50% 38%",
      title: "Leading a zero-to-one platform",
      sub: "Federated GraphQL inventory platform at Yum Brands, headed for stores in 2027.",
      line: yum.bullets[0],
      meta: `${yum.company} · ${yum.dates}`,
    },
    { id: "yum", size: "sq", art: "/art/yum-kitchen.webp", pos: "50% 50%", title: "Drove AI across the team", line: yum.bullets[1], meta: yum.company },
    { id: "1v1me", size: "sq", art: "/art/1v1me.webp", pos: "50% 45%", title: "Real-time match viewing", line: v1.bullets[0], meta: v1.company },
  ];
  return (
    <section id="highlights" className="highlights" aria-labelledby="highlights-title">
      <h2 id="highlights-title" className="section-title" tabIndex={-1}>
        Recent work
      </h2>
      <ul className="bento">
        {tiles.map((t) => (
          <li key={t.id + t.line} className={`tile tile-${t.size}`}>
            <button type="button" className="tile-btn" onClick={() => onOpen(indexOf(t.id))} aria-label={`${t.line}. Open the ${cards[indexOf(t.id)].name} card`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.art} alt="" loading="lazy" decoding="async" style={{ objectPosition: t.pos }} />
              <span className="tile-text">
                <span className="tile-line">{t.title}</span>
                {"sub" in t && t.sub ? <span className="tile-sub">{t.sub}</span> : null}
                <span className="tile-meta">
                  {t.meta.split(" · ").map((part, k) => (
                    <span key={part}>
                      {k > 0 ? " " : null}
                      <span className="nowrap">
                        {k > 0 ? "· " : null}
                        {part}
                      </span>
                    </span>
                  ))}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Skills that appear in a job's own words: the tags on its row. */
function tagsFor(text: string) {
  const all = skills.flatMap((g) => [...g.items]);
  // whole words only: "Gold" is not "Go"
  const has = (s: string) => new RegExp(`(?<![A-Za-z0-9])${s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![A-Za-z0-9])`, "i").test(text);
  return all.filter(has).slice(0, 6);
}

/** Experience: recent roles in full rows, 2021 and earlier compact; every bullet one tap away. */
export function Experience({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <section id="experience" className="experience" aria-labelledby="experience-title">
      <h2 id="experience-title" className="section-title">
        Experience
      </h2>
      <ol className="xp">
        {chapters.map((c) => {
          const i = indexOf(c.id);
          const card = cards[i];
          const [lead, ...rest] = c.bullets;
          const tags = tagsFor(`${c.role} ${c.bullets.join(" ")}`);
          // the trajectory reads at a glance: the last few years get the space
          const compact = Number((c.dates.match(/\d{4}/g) ?? ["9999"]).slice(-1)[0]) <= 2021;
          const hidden = compact ? c.bullets : rest;
          return (
            <li key={c.id} id={c.id} className={`xp-row type-${card.type}${compact ? " is-compact" : ""}`}>
              <p className="xp-dates">{c.dates}</p>
              <div className="xp-body">
                <h3>
                  <span className="xp-company">{c.company}</span>
                  {c.bullets.length ? (
                    <span className="xp-role">
                      <span className="sr-only">, </span>
                      {c.role}
                    </span>
                  ) : null}
                </h3>
                {!compact && lead ? <p className="xp-lead">{lead}</p> : null}
                {!c.bullets.length ? (
                  <ul className="xp-roles">
                    {c.role.split(" · ").map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                ) : null}
                {compact && hidden.length && hidden.length <= 2 ? (
                  <ul className="xp-bullets">
                    {hidden.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : hidden.length ? (
                  <details className="xp-more">
                    <summary>{compact ? `Show ${hidden.length}` : `Show ${hidden.length} more`}</summary>
                    <ul>
                      {hidden.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </details>
                ) : null}
                {!compact && tags.length ? (
                  <ul className="xp-tags" aria-label="Skills used">
                    {tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                ) : null}
                <button type="button" className="xp-card-link" onClick={() => onOpen(i)}>
                  View card
                </button>
              </div>
              {!compact ? (
                <button type="button" className="xp-card" onClick={() => onOpen(i)} aria-label={`Open the ${c.company} card`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.art} alt="" loading="lazy" decoding="async" />
                  <span className="xp-card-label" aria-hidden>
                    View card
                  </span>
                </button>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/** The full set: each card as you would spot it in a binder, art and name; any card opens in full. */
export function Collection({ onOpen }: { onOpen: (i: number) => void }) {
  const row = React.useRef<HTMLUListElement>(null);
  const page = (d: number) => row.current?.scrollBy({ left: d * row.current.clientWidth * 0.8, behavior: "smooth" });
  return (
    <section id="binder" className="collection" aria-labelledby="binder-title">
      <div className="collection-head">
        <div>
          <h2 id="binder-title" className="section-title" tabIndex={-1}>
            Cards
          </h2>
          <p>All {cards.length} cards from the pack. Open any one.</p>
        </div>
        <div className="set-nav">
          <button type="button" className="btn btn-quiet" onClick={() => page(-1)} aria-label="Scroll the cards back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button type="button" className="btn btn-quiet" onClick={() => page(1)} aria-label="Scroll the cards forward">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <ul className="set-row" ref={row}>
        {cards.map((c, i) => (
          <li key={c.id}>
            <button type="button" className={`set-card type-${c.type} rarity-${c.rarity}`} onClick={() => onOpen(i)} aria-label={`Open the ${c.name} card`}>
              <span className="set-face" aria-hidden>
                <span className="set-name">{c.name}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.art} alt="" loading="lazy" decoding="async" />
                <span className="set-meta">
                  {c.role}
                  {c.stat ? <span>{c.stat}</span> : null}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** About me: the work in a paragraph, then home. Skills live on their own card and on each role. */
export function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <h2 id="about-title" className="section-title">
        About me
      </h2>
      <div className="about-copy">
        {/* the third line ("half my week on product and design") is the ask's, just above */}
        {profile.about.slice(0, 2).map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p className="about-home">{profile.home}</p>
      </div>
    </section>
  );
}

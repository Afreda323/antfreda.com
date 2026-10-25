import * as React from "react";
import { MAILTO } from "@/lib/contact";
import { cards } from "@/content/cards";
import { chapters, profile, skills } from "@/content/resume";
import { rarityName, TypeMark } from "./Card";

/** Everything a card says, as readable text: the binder's fine print and the inspect view share it. */
export function CardText({ id, headingLevel = 3 }: { id: string; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  const card = cards.find((c) => c.id === id)!;
  // the icon always leads a line of text; the sub line only renders when it has something to say
  const meta = (role: string | null, dates?: string) => (
    <>
      <p className={`text-meta type-${card.type}`}>
        <TypeMark type={card.type} title={false} />
        {role ? <span className="text-role">{role}</span> : <span className="text-dates">{dates}</span>}
      </p>
      {(role && dates) || card.rarity !== "standard" ? (
        <p className="text-sub">
          {role && dates ? <span className="text-dates">{dates}</span> : null}
          {card.rarity !== "standard" ? <span>{rarityName(card.rarity)}</span> : null}
        </p>
      ) : null}
    </>
  );
  if (id === "trainer") {
    return (
      <>
        <div className="text-head">
          <H>{profile.name}</H>
          {meta(profile.title)}
        </div>
        <div className="text-body">
          <p className="text-lead">{profile.line}</p>
        </div>
      </>
    );
  }
  if (id === "about") {
    return (
      <>
        <div className="text-head">
          <H>About</H>
          {meta("Charlotte, NC")}
        </div>
        <div className="text-body">
          {profile.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </>
    );
  }
  if (id === "skills") {
    return (
      <>
        <div className="text-head">
          <H>Skills</H>
          {meta(card.role)}
        </div>
        <dl className="text-body text-skills">
          {skills.map((g) => (
            <div key={g.group}>
              <dt>{g.group}</dt>
              <dd>{g.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </>
    );
  }
  if (id === "contact") {
    return (
      <>
        <div className="text-head">
          <H>Contact</H>
          {meta(profile.name)}
        </div>
        <div className="text-body">
        <p>
          <a className="text-email" href={MAILTO}>
            {profile.email}
          </a>
        </p>
        <p className="text-links">
          <a href={profile.linkedin} rel="me noopener" target="_blank">
            LinkedIn
          </a>
          <a href={profile.github} rel="me noopener" target="_blank">
            GitHub
          </a>
        </p>
        </div>
      </>
    );
  }
  const c = chapters.find((x) => x.id === id)!;
  const [lead, ...rest] = c.bullets;
  return (
    <>
      <div className="text-head">
        <H>{c.company}</H>
        {/* a chapter with no bullets lists its roles below; the head would only say them twice */}
        {meta(c.bullets.length ? c.role : null, c.dates)}
      </div>
      <div className="text-body">
        {lead ? <p className="text-lead">{lead}</p> : null}
        {rest.length ? (
          <ul>
            {rest.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        ) : null}
        {c.bullets.length === 0 ? (
          // no bullets on the resume for this one: its roles, as resume.ts names them
          <ul>
            {c.role.split(" · ").map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );
}

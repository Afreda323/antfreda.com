"use client";
import * as React from "react";
import Chip from "./Chip";
import { Geist_Mono } from "next/font/google";

const mono = Geist_Mono({ subsets: ["latin"] });

export default function Role({
  id,
  company,
  title,
  from,
  to,
  summary1,
  summary2,
  tags = [],
  href, // optional: company link
  meta = [], // optional: ["Remote","Charlotte, NC"] etc.
}: {
  id: string;
  company: string;
  title: string;
  from: string; // "YYYY-MM"
  to: string; // "YYYY-MM" | "present"
  summary1: React.ReactNode;
  summary2: React.ReactNode;
  tags?: string[];
  href?: string;
  meta?: string[];
}) {
  const fmt = (v: string) => {
    if (v.toLowerCase() === "present") return "Present";
    const [y, m] = v.split("-");
    const date = new Date(Number(y), Number(m) - 1, 1);
    return date.toLocaleString(undefined, { month: "short", year: "numeric" });
  };

  return (
    <article
      id={id}
      className="group relative border-l-2  border-cyan-500 pl-4"
    >
      <header className="flex items-start justify-between gap-3">
        <h3 className="sm:text-lg font-medium tracking-[-0.01em] text-zinc-100">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-transparent hover:decoration-cyan-400/50 underline-offset-4"
            >
              {company}
            </a>
          ) : (
            company
          )}{" "}
          — <strong className="font-semibold italic">{title}</strong>
        </h3>
      </header>

      {/* terminal-style meta line */}
      <p className={`${mono.className} text-xs text-zinc-500`}>
        // <time dateTime={from}>{fmt(from)}</time> –{" "}
        <span aria-label={to}>
          {to.toLowerCase() === "present" ? "Present" : fmt(to)}
        </span>
        {meta.length > 0 && <> • {meta.join(" • ")}</>}
      </p>

      {/* summaries */}
      <div className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-200/95">
        <p className="mb-2">{summary1}</p>
        <p>{summary2}</p>
      </div>

      {/* tags */}
      {tags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {tags.map((t) => (
            <li key={t}>
              <Chip>{t}</Chip>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

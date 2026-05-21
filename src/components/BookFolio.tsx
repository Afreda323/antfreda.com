"use client";

import { useScrollSpy } from "@/hooks/use-scroll-spy";

const folios = [
  { id: "title", chapter: "Front matter", page: 1 },
  { id: "summary", chapter: "Summary", page: 2 },
  { id: "skills", chapter: "Skills", page: 3 },
  { id: "chapter-yum", chapter: "Chapter I", page: 4 },
  { id: "chapter-do", chapter: "Chapter II", page: 5 },
  { id: "chapter-1v1me", chapter: "Chapter III", page: 6 },
  { id: "chapter-pools", chapter: "Chapter IV", page: 7 },
  { id: "chapter-movement", chapter: "Chapter V", page: 8 },
  { id: "chapter-diligent", chapter: "Chapter VI", page: 9 },
  { id: "chapter-bofa", chapter: "Chapter VII", page: 10 },
  { id: "chapter-earlier", chapter: "Colophon", page: 11 },
] as const;

const folioIds = folios.map((f) => f.id);

export default function BookFolio() {
  const activeId = useScrollSpy(folioIds);
  const active = folios.find((f) => f.id === activeId) ?? folios[0];

  return (
    <aside
      className="no-print pointer-events-none fixed bottom-6 right-6 z-30 hidden font-sans text-[0.65rem] uppercase tracking-[0.22em] text-[var(--book-muted)] sm:block"
      aria-live="polite"
      aria-label="Current page"
    >
      <span className="tabular-nums">{active.chapter}</span>
      <span className="mx-2 text-[var(--book-rule)]" aria-hidden>
        ·
      </span>
      <span className="tabular-nums">p. {active.page}</span>
    </aside>
  );
}

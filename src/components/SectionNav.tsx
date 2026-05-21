"use client";

import { useScrollSpy } from "@/hooks/use-scroll-spy";

const sections = [
  { id: "summary", label: "Summary" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "chapter-yum", label: "Ch. I" },
  { id: "chapter-do", label: "Ch. II" },
  { id: "chapter-1v1me", label: "Ch. III" },
  { id: "chapter-pools", label: "Ch. IV" },
  { id: "chapter-movement", label: "Ch. V" },
  { id: "chapter-diligent", label: "Ch. VI" },
  { id: "chapter-bofa", label: "Ch. VII" },
] as const;

const sectionIds = sections.map((s) => s.id);

export default function SectionNav() {
  const active = useScrollSpy(sectionIds);

  return (
    <nav
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
      aria-label="On this page"
    >
      <ul className="space-y-3 border-l border-[var(--book-rule)] pl-4 font-sans text-[0.65rem] uppercase tracking-[0.18em]">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`book-link block transition-colors duration-200 ${
                active === id
                  ? "text-[var(--book-ink)]"
                  : "text-[var(--book-muted)] hover:text-[var(--book-ink)]"
              }`}
              aria-current={active === id ? "true" : undefined}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

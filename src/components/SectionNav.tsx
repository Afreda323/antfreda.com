"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "summary", label: "Summary" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
] as const;

export default function SectionNav() {
  const [active, setActive] = useState<string>("summary");

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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

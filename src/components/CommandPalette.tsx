"use client";

import * as React from "react";
import { useTheme } from "next-themes";

type Command = {
  id: string;
  label: string;
  hint?: string;
  run: () => void;
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const { setTheme } = useTheme();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const commands = React.useMemo<Command[]>(
    () => [
      { id: "summary", label: "Summary", run: () => scrollTo("summary") },
      { id: "skills", label: "Skills", run: () => scrollTo("skills") },
      { id: "experience", label: "Experience", run: () => scrollTo("experience") },
      {
        id: "chapter-yum",
        label: "Chapter I — Yum Brands",
        run: () => scrollTo("chapter-yum"),
      },
      {
        id: "chapter-do",
        label: "Chapter II — DigitalOcean",
        run: () => scrollTo("chapter-do"),
      },
      {
        id: "chapter-1v1me",
        label: "Chapter III — 1V1ME",
        run: () => scrollTo("chapter-1v1me"),
      },
      {
        id: "chapter-pools",
        label: "Chapter IV — P00LS",
        run: () => scrollTo("chapter-pools"),
      },
      {
        id: "chapter-movement",
        label: "Chapter V — Movement Mortgage",
        run: () => scrollTo("chapter-movement"),
      },
      {
        id: "chapter-diligent",
        label: "Chapter VI — Diligent Corporation",
        run: () => scrollTo("chapter-diligent"),
      },
      {
        id: "chapter-bofa",
        label: "Chapter VII — Bank of America",
        run: () => scrollTo("chapter-bofa"),
      },
      {
        id: "chapter-earlier",
        label: "Earlier experience",
        run: () => scrollTo("chapter-earlier"),
      },
      {
        id: "copy",
        label: "Copy email",
        hint: "anthonyfreda323@gmail.com",
        run: () => navigator.clipboard.writeText("anthonyfreda323@gmail.com"),
      },
      {
        id: "email",
        label: "Email me",
        run: () => window.open("mailto:anthonyfreda323@gmail.com", "_blank"),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        run: () => window.open("https://www.linkedin.com/in/antfreda323", "_blank"),
      },
      {
        id: "github",
        label: "Open GitHub",
        run: () => window.open("https://github.com/Afreda323", "_blank"),
      },
      { id: "print", label: "Print this page", run: () => window.print() },
      { id: "light", label: "Appearance — Light", run: () => setTheme("light") },
      { id: "dark", label: "Appearance — Dark", run: () => setTheme("dark") },
      { id: "system", label: "Appearance — System", run: () => setTheme("system") },
    ],
    [setTheme]
  );

  const filtered = commands.filter((c) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      c.label.toLowerCase().includes(q) ||
      c.hint?.toLowerCase().includes(q) ||
      c.id.includes(q)
    );
  });

  const runCommand = (command: Command) => {
    command.run();
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  };

  React.useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("open-cmdk", onOpen);
    return () => window.removeEventListener("open-cmdk", onOpen);
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }

      if (!open) return;

      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
        setActiveIndex(0);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % Math.max(filtered.length, 1));
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) =>
          i === 0 ? Math.max(filtered.length - 1, 0) : i - 1
        );
        return;
      }

      if (e.key === "Enter" && filtered[activeIndex]) {
        e.preventDefault();
        runCommand(filtered[activeIndex]);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, activeIndex]);

  React.useEffect(() => {
    if (open) {
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  React.useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal
      aria-label="Table of contents"
      className="no-print fixed inset-0 z-[100] grid place-items-start bg-black/25 px-4 pt-[12vh] backdrop-blur-[2px] sm:place-items-center sm:px-0 sm:pt-0"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-md border border-[var(--book-rule)] bg-[var(--book-paper)] shadow-[0_8px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.45)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-[var(--book-rule)] px-4 py-3">
          <p className="font-sans text-[0.65rem] uppercase tracking-[0.28em] text-[var(--book-muted)]">
            Table of contents
          </p>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find in book…"
            aria-label="Filter table of contents"
            className="mt-2 w-full border-0 bg-transparent font-serif text-[1.05rem] text-[var(--book-ink)] outline-none placeholder:text-[var(--book-muted)]"
          />
        </div>
        <ul className="max-h-[min(50vh,360px)] overflow-y-auto py-1" role="listbox">
          {filtered.length === 0 ? (
            <li className="px-4 py-6 text-center font-serif text-sm italic text-[var(--book-muted)]">
              No matches in this volume.
            </li>
          ) : (
            filtered.map((command, index) => (
              <li key={command.id} role="option" aria-selected={index === activeIndex}>
                <button
                  type="button"
                  onClick={() => runCommand(command)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`book-link flex w-full items-center justify-between px-4 py-2.5 text-left font-serif text-[1rem] transition-colors ${
                    index === activeIndex
                      ? "bg-[color-mix(in_srgb,var(--book-ink)_6%,transparent)] text-[var(--book-ink)]"
                      : "text-[var(--book-ink)] hover:bg-[color-mix(in_srgb,var(--book-ink)_4%,transparent)]"
                  }`}
                >
                  <span>{command.label}</span>
                  {command.hint ? (
                    <span className="ml-3 truncate font-sans text-[0.6rem] text-[var(--book-muted)]">
                      {command.hint}
                    </span>
                  ) : null}
                </button>
              </li>
            ))
          )}
        </ul>
        <p className="border-t border-[var(--book-rule)] px-4 py-2 font-sans text-[0.6rem] tracking-wide text-[var(--book-muted)]">
          ↑↓ navigate · enter select · esc close
        </p>
      </div>
    </div>
  );
}

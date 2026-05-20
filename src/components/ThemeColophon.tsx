"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeColophon() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const label =
    theme === "system"
      ? `System (${resolvedTheme === "dark" ? "Dark" : "Light"})`
      : theme === "dark"
        ? "Dark"
        : theme === "light"
          ? "Light"
          : "System";

  return (
    <nav
      className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-[11px] tracking-wide text-zinc-500 dark:text-zinc-500"
      aria-label="Appearance"
    >
      <span className="uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
        Appearance
      </span>
      {(
        [
          ["system", "System"],
          ["light", "Light"],
          ["dark", "Dark"],
        ] as const
      ).map(([value, name]) => (
        <button
          key={value}
          type="button"
          onClick={() => setTheme(value)}
          className={`book-link rounded-sm ${
            theme === value
              ? "text-[var(--book-ink)] underline decoration-[var(--book-rule)] underline-offset-2"
              : "text-zinc-500 hover:text-[var(--book-ink)] dark:hover:text-zinc-300"
          }`}
        >
          {name}
        </button>
      ))}
      <span className="text-zinc-400">·</span>
      <span>{label}</span>
    </nav>
  );
}

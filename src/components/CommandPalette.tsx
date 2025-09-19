"use client";
import * as React from "react";
import { Geist_Mono } from "next/font/google";
const mono = Geist_Mono({ subsets: ["latin"] });

const CMDS = [
  {
    key: "c",
    label: "Copy email",
    run: () => navigator.clipboard.writeText("anthonyfreda323@gmail.com"),
  },
  {
    key: "e",
    label: "Email me",
    run: () => window.open("mailto:anthonyfreda323@gmail.com", "_blank"),
  },
  {
    key: "l",
    label: "Open LinkedIn",
    run: () => window.open("https://www.linkedin.com/in/antfreda323", "_blank"),
  },
  {
    key: "g",
    label: "Open GitHub",
    run: () => window.open("https://github.com/Afreda323", "_blank"),
  },
];

export default function CommandPalette() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open) {
        const c = CMDS.find((x) => x.key === e.key.toLowerCase());
        if (c) c.run();
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-cmdk", onOpen as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-cmdk", onOpen as EventListener);
    };
  }, [open]);

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal
      className="fixed inset-0 z-[100] grid place-items-center bg-black/60 backdrop-blur"
    >
      <div
        className={`${mono.className} w-[min(560px,92vw)] rounded-lg bg-zinc-950 ring-1 ring-white/10 p-3`}
      >
        <div className="mb-2 text-[12px] text-zinc-400">
          // commands (esc to close)
        </div>
        <ul className="divide-y divide-white/10">
          {CMDS.map((c) => (
            <li key={c.key}>
              <button
                onClick={() => {
                  c.run();
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left hover:bg-white/5"
              >
                <span className="text-zinc-200">{c.label}</span>
                <kbd className="text-[11px] text-cyan-300">
                  {c.key.toUpperCase()}
                </kbd>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

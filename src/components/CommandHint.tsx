"use client";
import * as React from "react";
import { Geist_Mono } from "next/font/google";
import { Effect } from "./animate-ui/primitives/effects/effect";
const mono = Geist_Mono({ subsets: ["latin"] });

const KEY = "af_cmd_hint_dismiss";

export default function CommandHint() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const dismissed = localStorage.getItem(KEY) === "1";
    if (!dismissed) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <div
      className={`${mono.className} fixed hidden md:flex right-3 top-3 z-50  items-center gap-2 rounded-md bg-zinc-950/85 px-3 py-1.5 text-[11px] text-zinc-300 ring-1 ring-white/10`}
    >
      <Effect inViewOnce fade delay={200}>
        <span className="text-zinc-400">// tip:</span>
        <button
          className="underline decoration-dotted underline-offset-2 hover:text-cyan-200 focus:outline-none"
          onClick={() => window.dispatchEvent(new Event("open-cmdk"))}
        >
          Press ⌘K for commands
        </button>
        <button
          aria-label="Dismiss"
          className="ml-1 text-zinc-500 hover:text-zinc-300"
          onClick={() => {
            localStorage.setItem(KEY, "1");
            setShow(false);
          }}
        >
          ✕
        </button>
      </Effect>
    </div>
  );
}

import * as React from "react";
import { Geist_Mono } from "next/font/google";
const mono = Geist_Mono({ subsets: ["latin"] });

export default function SectionDivider({ label }: { label: string }) {
  const slug = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div role="separator" aria-label={label} className="mt-12 mb-8">
      <div
        className={`${mono.className} text-[11px] text-zinc-500 select-none max-w-5xl px-6 mx-auto`}
      >
        <span className="text-cyan-400">~/antfreda.com</span>{" "}
        <span className="text-zinc-500">❯</span>{" "}
        <span className="text-zinc-300">{slug}</span>
      </div>
      <div className="mt-2 h-px w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_10px,transparent_10px)] bg-[length:20px_1px]" />
    </div>
  );
}

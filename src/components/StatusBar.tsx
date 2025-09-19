"use client";
import * as React from "react";
import { Geist_Mono } from "next/font/google";
const mono = Geist_Mono({ subsets: ["latin"] });

export default function StatusBar() {
  const [t, setT] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setT(new Date()), 60000);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      className={`${mono.className} fixed bottom-3 whitespace-nowrap left-1/2 z-[60] -translate-x-1/2 rounded-md bg-black/60 px-3 py-1.5 text-[8px] sm:text-xs text-zinc-400 ring-1 ring-white/10 backdrop-blur`}
    >
      <span className="text-cyan-400">~/antfreda.com</span> · main@HEAD ·{" "}
      {t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} ·{" "}
      <span className="text-emerald-400">available</span>
    </div>
  );
}

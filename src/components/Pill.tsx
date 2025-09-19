// Pill.tsx
export default function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-black/50 px-3 py-1 sm:text-sm text-[10px] text-zinc-300 ring-1 ring-white/20">
      {children}
    </span>
  );
}

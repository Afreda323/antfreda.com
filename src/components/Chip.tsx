// Chip.tsx
export default function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md bg-white/5 px-2 py-[3px] text-[11px] text-zinc-300 ring-1 ring-white/10">
      {children}
    </span>
  );
}

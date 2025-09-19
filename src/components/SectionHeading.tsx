import * as React from "react";

export default function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <header className="mb-4">
      <h2
        id={id}
        className="font-semibold text-3xl sm:text-4xl tracking-tight text-zinc-100"
      >
        {children}
      </h2>
    </header>
  );
}

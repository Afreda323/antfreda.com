"use client";
import React, { JSX } from "react";

type Ctx = { inView: boolean; stagger: number };
const RevealCtx = React.createContext<Ctx>({ inView: false, stagger: 70 });

export function RevealContainer({
  children,
  as: Tag = "div",
  stagger = 70, // ms between items
  once = true, // animate only first time in view
  rootMargin = "0px 0px -10% 0px", // start a bit before fully in view
  className,
}: {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  stagger?: number;
  once?: boolean;
  rootMargin?: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, rootMargin]);

  return (
    <div ref={ref} className={className}>
      <RevealCtx.Provider value={{ inView, stagger }}>
        {children}
      </RevealCtx.Provider>
    </div>
  );
}

export function Reveal({
  i = 0,
  className = "",
  children,
  delay,
}: {
  i?: number;
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  const { inView, stagger } = React.useContext(RevealCtx);
  const [reducedMotion, setReducedMotion] = React.useState(true);
  const computedDelay = (delay ?? 0) + i * stagger;

  React.useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  const visible = reducedMotion || inView;

  return (
    <div
      className={`${
        reducedMotion
          ? ""
          : "will-change-transform transition duration-500 ease-out motion-reduce:transition-none"
      } ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      } ${className}`}
      style={reducedMotion ? undefined : { transitionDelay: `${computedDelay}ms` }}
    >
      {children}
    </div>
  );
}

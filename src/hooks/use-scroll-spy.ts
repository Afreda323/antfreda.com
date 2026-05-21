"use client";

import { useEffect, useState } from "react";

export function useScrollSpy<T extends string>(
  ids: readonly T[],
  options?: { offsetRatio?: number }
) {
  const [active, setActive] = useState<T>(ids[0]);
  const offsetRatio = options?.offsetRatio ?? 0.33;

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const marker = window.scrollY + window.innerHeight * offsetRatio;
      const docBottom = document.documentElement.scrollHeight;
      const viewportBottom = window.scrollY + window.innerHeight;

      if (viewportBottom >= docBottom - 48 && ids.length > 0) {
        setActive(ids[ids.length - 1]);
        return;
      }

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) current = id;
      }
      setActive(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, offsetRatio]);

  return active;
}

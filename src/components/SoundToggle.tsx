import * as React from "react";
import { isMuted, setMuted } from "@/lib/sfx";

/** Sound plays only after a gesture; this mutes it for good. */
export function SoundToggle() {
  const [muted, set] = React.useState(false);
  React.useEffect(() => set(isMuted()), []);
  const toggle = () => {
    setMuted(!muted);
    set(!muted);
  };
  return (
    <button type="button" className="sound" aria-pressed={!muted} onClick={toggle}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
        {muted ? (
          <path d="M16 9.5l5 5M21 9.5l-5 5" />
        ) : (
          <>
            <path d="M16 9a4 4 0 010 6" />
            <path d="M18.5 6.5a7.5 7.5 0 010 11" />
          </>
        )}
      </svg>
      <span className="sr-only">{muted ? "Sound off" : "Sound on"}</span>
    </button>
  );
}

/**
 * Pack sounds, synthesised with WebAudio so nothing loads up front. The
 * context is created on the visitor's first gesture (the rip), never before,
 * so nothing ever autoplays. Muting is remembered per visitor.
 */
let ctx: AudioContext | null = null;
let muted = false;
const KEY = "pack-muted";

try {
  muted = typeof window !== "undefined" && window.localStorage.getItem(KEY) === "1";
} catch {
  muted = false;
}

export function isMuted() {
  return muted;
}
export function setMuted(v: boolean) {
  muted = v;
  try {
    window.localStorage.setItem(KEY, v ? "1" : "0");
  } catch {
    /* storage can be unavailable; the toggle still works for this visit */
  }
}

function audio() {
  if (muted || typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function noise(a: AudioContext, seconds: number) {
  const buf = a.createBuffer(1, Math.ceil(a.sampleRate * seconds), a.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const src = a.createBufferSource();
  src.buffer = buf;
  return src;
}

/** Foil crinkle while dragging along the crimp: short filtered ticks. */
export function crinkle(intensity = 1) {
  const a = audio();
  if (!a) return;
  const t = a.currentTime;
  const src = noise(a, 0.05);
  const bp = a.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 3500 + Math.random() * 3500;
  bp.Q.value = 1.2;
  const g = a.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.18 * intensity, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);
  src.connect(bp).connect(g).connect(a.destination);
  src.start(t);
  src.stop(t + 0.05);
}

/** The rip: a long bright tear that drops in pitch, plus a low thump. */
export function rip() {
  const a = audio();
  if (!a) return;
  const t = a.currentTime;
  const src = noise(a, 0.5);
  const hp = a.createBiquadFilter();
  hp.type = "bandpass";
  hp.Q.value = 0.8;
  hp.frequency.setValueAtTime(7000, t);
  hp.frequency.exponentialRampToValueAtTime(1400, t + 0.35);
  const g = a.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.55, t + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);
  src.connect(hp).connect(g).connect(a.destination);
  src.start(t);
  src.stop(t + 0.5);

  const o = a.createOscillator();
  o.type = "sine";
  o.frequency.setValueAtTime(140, t);
  o.frequency.exponentialRampToValueAtTime(45, t + 0.25);
  const og = a.createGain();
  og.gain.setValueAtTime(0.0001, t);
  og.gain.exponentialRampToValueAtTime(0.5, t + 0.01);
  og.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
  o.connect(og).connect(a.destination);
  o.start(t);
  o.stop(t + 0.32);
}

/** A card flicked off the stack. */
export function whoosh() {
  const a = audio();
  if (!a) return;
  const t = a.currentTime;
  const src = noise(a, 0.3);
  const bp = a.createBiquadFilter();
  bp.type = "bandpass";
  bp.Q.value = 2;
  bp.frequency.setValueAtTime(900, t);
  bp.frequency.exponentialRampToValueAtTime(2600, t + 0.18);
  const g = a.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.16, t + 0.05);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
  src.connect(bp).connect(g).connect(a.destination);
  src.start(t);
  src.stop(t + 0.3);
}

/** A rare: two bright notes. The secret rare: a rising arpeggio with shimmer. */
export function sparkle(level: "rare" | "secret") {
  const a = audio();
  if (!a) return;
  const t = a.currentTime;
  const notes = level === "secret" ? [659.25, 783.99, 987.77, 1318.5, 1567.98] : [987.77, 1318.5];
  notes.forEach((f, i) => {
    const o = a.createOscillator();
    o.type = "triangle";
    o.frequency.value = f;
    const g = a.createGain();
    const s = t + i * (level === "secret" ? 0.07 : 0.09);
    g.gain.setValueAtTime(0.0001, s);
    g.gain.exponentialRampToValueAtTime(level === "secret" ? 0.14 : 0.1, s + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, s + (level === "secret" ? 1.4 : 0.6));
    o.connect(g).connect(a.destination);
    o.start(s);
    o.stop(s + 1.5);
  });
}

/** Phones that support it get a kick on the rip and a buzz on the secret rare. */
export function buzz(pattern: number | number[]) {
  try {
    navigator.vibrate?.(pattern);
  } catch {
    /* not supported */
  }
}

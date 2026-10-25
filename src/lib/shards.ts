/**
 * Foil shards and glints burst from the tear: iridescent triangles that spin,
 * catch the light as they turn, and fall under gravity. Drawn on one
 * full-screen canvas that exists only while particles are alive.
 */
type Shard = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  va: number;
  flip: number;
  vflip: number;
  hue: number;
  life: number;
  max: number;
  kind: "shard" | "glint";
  /** foil tones, precomputed: dark, mid, and the near-white it flashes when it faces the light */
  tones: [string, string, string];
};

let canvas: HTMLCanvasElement | null = null;
let raf = 0;
let lastT = 0;
const shards: Shard[] = [];

function ensureCanvas() {
  if (canvas) return canvas;
  canvas = document.createElement("canvas");
  canvas.className = "shards";
  canvas.setAttribute("aria-hidden", "true");
  document.body.appendChild(canvas);
  return canvas;
}

export function burst(x: number, y: number, opts: { count?: number; spread?: number; power?: number; up?: number; hues?: number[]; dir?: number } = {}) {
  // the wrapper's own foil: violet, teal and gold
  const { count = 90, spread = Math.PI * 2, power = 1, up = 0.6, hues = [268, 186, 44], dir = -Math.PI / 2 } = opts;
  for (let i = 0; i < count; i++) {
    const ang = dir + (Math.random() - 0.5) * spread;
    const sp = (4 + Math.random() * 11) * power;
    const glint = Math.random() < 0.28;
    shards.push({
      x: x + (Math.random() - 0.5) * 60,
      y: y + (Math.random() - 0.5) * 10,
      vx: Math.cos(ang) * sp,
      vy: Math.sin(ang) * sp - up * 6,
      r: glint ? 2 + Math.random() * 2.5 : 5 + Math.random() * 11,
      a: Math.random() * Math.PI * 2,
      va: (Math.random() - 0.5) * 0.5,
      flip: Math.random() * Math.PI * 2,
      vflip: 0.1 + Math.random() * 0.3,
      hue: hues[i % hues.length] + (Math.random() - 0.5) * 14,
      life: 0,
      max: 0.55 + Math.random() * 0.6,
      kind: glint ? "glint" : "shard",
      tones: (() => {
        const hue = hues[i % hues.length] + (Math.random() - 0.5) * 14;
        return [`hsl(${hue - 15} 70% 30%)`, `hsl(${hue} 65% 52%)`, `hsl(${hue + 20} 80% 88%)`] as [string, string, string];
      })(),
    });
  }
  if (!raf) {
    lastT = performance.now();
    raf = requestAnimationFrame(loop);
  }
}

function loop(now: number) {
  // physics in seconds, scaled to a 60fps step, so a slow device shows the same burst, not a longer one
  const dt = Math.min(0.05, (now - lastT) / 1000);
  lastT = now;
  const k = dt * 60;
  const c = ensureCanvas();
  const dpr = Math.min(1.5, window.devicePixelRatio || 1);
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) {
    c.width = Math.round(w * dpr);
    c.height = Math.round(h * dpr);
  }
  const g = c.getContext("2d")!;
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  g.clearRect(0, 0, w, h);
  for (let i = shards.length - 1; i >= 0; i--) {
    const s = shards[i];
    s.life += dt;
    s.vy += 0.7 * k;
    const drag = Math.pow(0.975, k);
    s.vx *= drag;
    s.vy *= drag;
    s.x += s.vx * k;
    s.y += s.vy * k;
    s.a += s.va * k;
    s.flip += s.vflip * k;
    const fade = 1 - Math.max(0, (s.life - s.max * 0.6) / (s.max * 0.4));
    if (s.life > s.max || s.y > h + 40) {
      shards.splice(i, 1);
      continue;
    }
    g.save();
    g.translate(s.x, s.y);
    g.rotate(s.a);
    if (s.kind === "glint") {
      const tw = 0.5 + 0.5 * Math.sin(s.flip * 2);
      g.globalAlpha = fade * tw;
      g.fillStyle = `hsl(${s.hue} 100% 88%)`;
      g.beginPath();
      const r = s.r * (1 + tw);
      g.moveTo(0, -r * 2.2);
      g.lineTo(r * 0.35, 0);
      g.lineTo(0, r * 2.2);
      g.lineTo(-r * 0.35, 0);
      g.closePath();
      g.moveTo(-r * 2.2, 0);
      g.lineTo(0, r * 0.35);
      g.lineTo(r * 2.2, 0);
      g.lineTo(0, -r * 0.35);
      g.closePath();
      g.fill();
    } else {
      // a foil sliver flutters edge-on and back; it flashes near-white when it faces the light
      const turn = Math.cos(s.flip);
      g.scale(Math.max(0.12, Math.abs(turn)), 1);
      const face = Math.abs(Math.sin(s.flip * 1.3));
      g.globalAlpha = fade;
      g.fillStyle = face > 0.92 ? s.tones[2] : Math.abs(turn) > 0.5 ? s.tones[1] : s.tones[0];
      g.beginPath();
      g.moveTo(-s.r * 0.35, -s.r * 1.3);
      g.lineTo(s.r * 0.45, -s.r * 1.0);
      g.lineTo(s.r * 0.3, s.r * 1.3);
      g.lineTo(-s.r * 0.4, s.r * 1.1);
      g.closePath();
      g.fill();
    }
    g.restore();
  }
  if (shards.length) raf = requestAnimationFrame(loop);
  else {
    raf = 0;
    canvas?.remove();
    canvas = null;
  }
}

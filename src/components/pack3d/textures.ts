import * as THREE from "three";

/** Loads an image element (same-origin, so canvases stay readable). */
export function loadImage(src: string) {
  return new Promise<HTMLImageElement>((res, rej) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
}

/** The font stack next/font registered for a CSS variable (its hashed family name). */
function family(varName: string, fallback: string) {
  const app = document.querySelector(".app") ?? document.documentElement;
  const v = getComputedStyle(app).getPropertyValue(varName).trim();
  return v || fallback;
}

/**
 * The wrapper's print: the painted the dog art, crimped seals top and bottom,
 * and the name, title and foot lettering set in the site's own faces, the
 * way the DOM pack prints them. 1024 x 1600 (the pack's 0.64 aspect).
 */
export async function printTexture(opts: { art: string; name: string; title: string; footLeft: string; footRight: string }) {
  await document.fonts?.ready;
  // drawn at 1.5x (1536 x 2400) so the lettering is as crisp as the DOM print
  const SC = 1.5;
  const W = 1024;
  const H = 1600;
  const c = document.createElement("canvas");
  c.width = W * SC;
  c.height = H * SC;
  const g = c.getContext("2d")!;
  g.scale(SC, SC);
  const img = await loadImage(opts.art);
  // cover, anchored 50% 40% like the DOM print
  const s = Math.max(W / img.width, H / img.height);
  const dw = img.width * s;
  const dh = img.height * s;
  g.drawImage(img, (W - dw) * 0.5, (H - dh) * 0.4, dw, dh);

  // crimped seals: silver bands with pressed ridges
  const band = Math.round(H * 0.07);
  for (const top of [0, H - band]) {
    const grd = g.createLinearGradient(0, top, 0, top + band);
    grd.addColorStop(0, "#d9d3e6");
    grd.addColorStop(1, "#8e86a3");
    g.fillStyle = grd;
    g.globalAlpha = 0.86;
    g.fillRect(0, top, W, band);
    g.globalAlpha = 0.5;
    for (let x = 0; x < W; x += 14) {
      g.fillStyle = "rgba(255,255,255,0.55)";
      g.fillRect(x, top, 5, band);
      g.fillStyle = "rgba(0,0,0,0.18)";
      g.fillRect(x + 6, top, 6, band);
    }
    g.globalAlpha = 1;
  }

  const display = family("--font-display", "system-ui");
  const text = family("--font-text", "system-ui");
  const cx = W / 2;

  // name: heavy display, white with a plum stroke, as on the DOM wrapper
  g.textAlign = "center";
  g.textBaseline = "alphabetic";
  let size = 150;
  g.font = `800 ${size}px ${display}`;
  while (g.measureText(opts.name).width > W * 0.86 && size > 60) {
    size -= 4;
    g.font = `800 ${size}px ${display}`;
  }
  const nameY = H * 0.145 + size * 0.85;
  g.lineJoin = "round";
  g.lineWidth = size * 0.09;
  g.strokeStyle = "#2a1240";
  g.shadowColor = "rgba(20,6,40,0.55)";
  g.shadowBlur = 24;
  g.shadowOffsetY = 8;
  g.strokeText(opts.name, cx, nameY);
  g.shadowColor = "transparent";
  g.fillStyle = "#fff";
  g.fillText(opts.name, cx, nameY);

  // title pill
  const sub = opts.title.toUpperCase();
  g.font = `700 34px ${text}`;
  // the pill wraps the tracked text, with room either side
  const tw = trackedWidth(g, sub, 3) + 64;
  const pillY = nameY + 30;
  g.fillStyle = "rgba(36,16,56,0.78)";
  roundRect(g, cx - tw / 2, pillY, tw, 58, 29);
  g.fill();
  g.fillStyle = "#fff";
  g.textBaseline = "middle";
  drawTracked(g, sub, cx, pillY + 30, 3);

  // foot
  g.font = `700 30px ${text}`;
  g.shadowColor = "rgba(20,6,40,0.85)";
  g.shadowBlur = 14;
  g.textAlign = "left";
  drawTracked(g, opts.footLeft.toUpperCase(), W * 0.07, H * 0.89, 2.4, "left");
  g.textAlign = "right";
  drawTracked(g, opts.footRight.toUpperCase(), W * 0.93, H * 0.89, 2.4, "right");
  g.shadowColor = "transparent";

  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function roundRect(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

function trackedWidth(g: CanvasRenderingContext2D, s: string, track: number) {
  return [...s].reduce((a, ch) => a + g.measureText(ch).width + track, 0) - track;
}

/** Letter-spaced text (canvas letterSpacing is not everywhere yet). */
function drawTracked(g: CanvasRenderingContext2D, s: string, x: number, y: number, track: number, align: "center" | "left" | "right" = "center") {
  const widths = [...s].map((ch) => g.measureText(ch).width + track);
  const total = widths.reduce((a, b) => a + b, 0) - track;
  let start = align === "center" ? x - total / 2 : align === "left" ? x : x - total;
  const prev = g.textAlign;
  g.textAlign = "left";
  [...s].forEach((ch, i) => {
    g.fillText(ch, start, y);
    start += widths[i];
  });
  g.textAlign = prev;
}

/**
 * Foil crinkle: a height field of random creases (each a soft ridge or
 * valley along a short line) plus fine grain, turned into a tangent-space
 * normal map so the wrapper's wrinkles catch the lamp as it tilts.
 */
export function crinkleNormalMap(size = 512, seed = 3) {
  let s = seed;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const h = new Float32Array(size * size);
  for (let k = 0; k < 260; k++) {
    const x0 = rnd() * size, y0 = rnd() * size;
    const ang = (rnd() - 0.5) * 1.2 + (rnd() < 0.5 ? 0 : Math.PI / 2);
    const len = 40 + rnd() * 180;
    const amp = (rnd() - 0.5) * 0.9;
    const wdt = 1.5 + rnd() * 4;
    const dx = Math.cos(ang), dy = Math.sin(ang);
    const minX = Math.floor(Math.min(x0, x0 + dx * len) - 12), maxX = Math.ceil(Math.max(x0, x0 + dx * len) + 12);
    const minY = Math.floor(Math.min(y0, y0 + dy * len) - 12), maxY = Math.ceil(Math.max(y0, y0 + dy * len) + 12);
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const px = x - x0, py = y - y0;
        const along = px * dx + py * dy;
        if (along < 0 || along > len) continue;
        const across = Math.abs(-px * dy + py * dx);
        if (across > wdt * 3) continue;
        const fall = Math.exp(-(across * across) / (2 * wdt * wdt)) * Math.sin((Math.PI * along) / len);
        const xi = ((x % size) + size) % size, yi = ((y % size) + size) % size;
        h[yi * size + xi] += amp * fall;
      }
    }
  }
  for (let i = 0; i < h.length; i++) h[i] += (rnd() - 0.5) * 0.06;
  const data = new Uint8Array(size * size * 4);
  const at = (x: number, y: number) => h[((y + size) % size) * size + ((x + size) % size)];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const nx = (at(x - 1, y) - at(x + 1, y)) * 1.6;
      const ny = (at(x, y - 1) - at(x, y + 1)) * 1.6;
      const l = Math.hypot(nx, ny, 1);
      const i = (y * size + x) * 4;
      data[i] = ((nx / l) * 0.5 + 0.5) * 255;
      data[i + 1] = ((ny / l) * 0.5 + 0.5) * 255;
      data[i + 2] = ((1 / l) * 0.5 + 0.5) * 255;
      data[i + 3] = 255;
    }
  }
  const t = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.needsUpdate = true;
  return t;
}

/** The inside of the pack: hot light at the mouth, falling off downward. */
export function mouthTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 64;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(128, 18, 4, 128, 30, 150);
  grd.addColorStop(0, "#fffbe8");
  grd.addColorStop(0.35, "#ffd88a");
  grd.addColorStop(0.75, "rgba(255,150,70,0.4)");
  grd.addColorStop(1, "rgba(255,120,60,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 256, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** The set's card back, matching the DOM CardBack: plum field, rings, the AF coin. */
export async function cardBackTexture() {
  await document.fonts?.ready;
  const W = 504, H = 704;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d")!;
  // a cream edge so each back reads as its own card in the fan
  g.fillStyle = "#efe6d6";
  roundRect(g, 0, 0, W, H, 28);
  g.fill();
  const border = g.createLinearGradient(0, 0, W, H);
  border.addColorStop(0, "#4d3a6e");
  border.addColorStop(0.6, "#2a1d40");
  border.addColorStop(1, "#3b2a57");
  g.fillStyle = border;
  roundRect(g, 6, 6, W - 12, H - 12, 24);
  g.fill();
  const m = 22;
  g.save();
  roundRect(g, m, m, W - 2 * m, H - 2 * m, 14);
  g.clip();
  try {
    const img = await loadImage("/art/back.webp");
    const s = Math.max((W - 2 * m) / img.width, (H - 2 * m) / img.height);
    g.drawImage(img, W / 2 - (img.width * s) / 2, H / 2 - (img.height * s) / 2, img.width * s, img.height * s);
  } catch {
    g.fillStyle = "#2b1d45";
    g.fillRect(0, 0, W, H);
  }
  g.restore();
  g.strokeStyle = "#e9c983";
  g.lineWidth = 3;
  roundRect(g, m, m, W - 2 * m, H - 2 * m, 14);
  g.stroke();
  // the medallion
  const R = 76;
  g.fillStyle = "#e9c983";
  g.beginPath();
  g.arc(W / 2, H / 2, R + 8, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "#2b1d45";
  g.beginPath();
  g.arc(W / 2, H / 2, R + 4.5, 0, Math.PI * 2);
  g.fill();
  const coin = g.createRadialGradient(W / 2 - 20, H / 2 - 25, 6, W / 2, H / 2, R);
  coin.addColorStop(0, "#fff1cf");
  coin.addColorStop(0.55, "#f6c574");
  coin.addColorStop(1, "#d99a45");
  g.fillStyle = coin;
  g.beginPath();
  g.arc(W / 2, H / 2, R, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "#2b1d45";
  g.font = `800 62px ${family("--font-display", "system-ui")}`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText("AF", W / 2, H / 2 + 3);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

const TYPE_COLOR: Record<string, string> = {
  ai: "#7d5cff",
  platform: "#17a898",
  web: "#ff6a55",
  finance: "#e2ad3c",
  early: "#7f8ca6",
  partner: "#ef7fb0",
};

/** Wraps text into lines that fit `max` px; returns at most `lines` lines, the last ellipsised. */
function wrap(g: CanvasRenderingContext2D, text: string, max: number, lines: number) {
  const words = text.split(" ");
  const out: string[] = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (g.measureText(next).width > max && cur) {
      out.push(cur);
      cur = w;
      if (out.length === lines) break;
    } else cur = next;
  }
  if (out.length < lines && cur) out.push(cur);
  if (out.length === lines && words.join(" ") !== out.join(" ")) {
    let last = out[lines - 1];
    while (g.measureText(`${last}…`).width > max && last.length) last = last.slice(0, -1);
    out[lines - 1] = `${last.trimEnd()}…`;
  }
  return out;
}

/**
 * A card's face for the cards sliding out of the pack: the same frame colour,
 * art, name, role strip and lead line as the DOM card it hands off to.
 */
export async function cardFrontTexture(card: { name: string; role: string; stat: string; type: string; art: string; flavor?: string; moves: { name: string; text: string }[] }) {
  await document.fonts?.ready;
  const W = 504, H = 704;
  const u = W / 100; // 1cqw
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const g = c.getContext("2d")!;
  const frame = TYPE_COLOR[card.type] ?? TYPE_COLOR.partner;
  const display = family("--font-display", "system-ui");
  const text = family("--font-text", "system-ui");

  // frame
  g.fillStyle = frame;
  roundRect(g, 0, 0, W, H, 4.6 * u);
  g.fill();
  const sheen = g.createLinearGradient(0, 0, W, H);
  sheen.addColorStop(0, "rgba(255,255,255,0.32)");
  sheen.addColorStop(0.35, "rgba(255,255,255,0)");
  sheen.addColorStop(0.75, "rgba(0,0,0,0.12)");
  g.fillStyle = sheen;
  roundRect(g, 0, 0, W, H, 4.6 * u);
  g.fill();
  // cream panel
  const px = 3.4 * u;
  const panel = g.createLinearGradient(0, px, 0, H - px);
  panel.addColorStop(0, "#fff9ee");
  panel.addColorStop(0.4, "#fbf3e3");
  panel.addColorStop(1, "#f4e8d2");
  g.fillStyle = panel;
  roundRect(g, px, px, W - 2 * px, H - 2 * px, 2.6 * u);
  g.fill();
  g.strokeStyle = "#ecd39a";
  g.lineWidth = 0.9 * u;
  roundRect(g, px, px, W - 2 * px, H - 2 * px, 2.6 * u);
  g.stroke();

  const ix = px + 3.2 * u;
  const iw = W - 2 * ix;
  let y = px + 2.6 * u;
  // name + type disc
  g.fillStyle = "#20182a";
  g.font = `800 ${7.4 * u}px ${display}`;
  g.textBaseline = "top";
  g.fillText(card.name, ix, y + 0.4 * u, iw - 30 * u);
  if (card.stat) {
    g.font = `800 ${3.4 * u}px ${display}`;
    g.textAlign = "right";
    g.fillStyle = shade(frame, -0.5);
    g.fillText(card.stat, ix + iw - 9.4 * u, y + 2.6 * u);
    g.textAlign = "left";
  }
  g.fillStyle = frame;
  g.beginPath();
  g.arc(ix + iw - 3.8 * u, y + 3.8 * u, 3.8 * u, 0, Math.PI * 2);
  g.fill();
  y += 9 * u;
  // art window
  const ah = (iw * 3) / 4;
  g.save();
  roundRect(g, ix, y, iw, ah, 1.4 * u);
  g.clip();
  try {
    const img = await loadImage(card.art);
    const s = Math.max(iw / img.width, ah / img.height);
    g.drawImage(img, ix + (iw - img.width * s) / 2, y + (ah - img.height * s) / 2, img.width * s, img.height * s);
  } catch {
    g.fillStyle = "#2a2036";
    g.fillRect(ix, y, iw, ah);
  }
  g.restore();
  g.strokeStyle = "rgba(255,255,255,0.85)";
  g.lineWidth = 0.7 * u;
  roundRect(g, ix, y, iw, ah, 1.4 * u);
  g.stroke();
  y += ah + 2.6 * u;
  // role strip
  g.fillStyle = "rgba(255,255,255,0.75)";
  roundRect(g, ix, y, iw, 5.4 * u, 1.6 * u);
  g.fill();
  g.fillStyle = frame;
  g.globalAlpha = 0.22;
  roundRect(g, ix, y, iw, 5.4 * u, 1.6 * u);
  g.fill();
  g.globalAlpha = 1;
  g.fillStyle = shade(frame, -0.55);
  g.font = `italic 700 ${2.7 * u}px ${text}`;
  g.textBaseline = "middle";
  g.textAlign = "center";
  g.fillText(card.role, ix + iw / 2, y + 2.7 * u, iw - 4 * u);
  g.textAlign = "left";
  y += 7.6 * u;
  // lead line and first move
  g.textBaseline = "top";
  if (card.flavor) {
    g.font = `italic 400 ${3.15 * u}px ${text}`;
    g.fillStyle = "#5b4d63";
    for (const line of wrap(g, card.flavor, iw, 2)) {
      g.fillText(line, ix, y);
      y += 4.15 * u;
    }
    y += 1.8 * u;
  }
  for (const m of card.moves.slice(0, 2)) {
    if (y > H - px - 14 * u) break;
    g.fillStyle = "rgba(32,24,42,0.12)";
    g.fillRect(ix, y, iw, 0.25 * u);
    y += 1.6 * u;
    if (m.name) {
      g.font = `800 ${3.6 * u}px ${display}`;
      g.fillStyle = "#20182a";
      g.fillText(m.name, ix, y);
      y += 4.6 * u;
    }
    g.font = `400 ${3.15 * u}px ${text}`;
    g.fillStyle = "#20182a";
    for (const line of wrap(g, m.text, iw, 2)) {
      g.fillText(line, ix, y);
      y += 4.15 * u;
    }
    y += 1.6 * u;
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

/** A hex colour mixed toward black (amount < 0) or white (amount > 0). */
function shade(hex: string, amount: number) {
  const n = parseInt(hex.slice(1), 16);
  const to = amount < 0 ? 0 : 255;
  const k = Math.abs(amount);
  const ch = (v: number) => Math.round(v + (to - v) * k);
  return `rgb(${ch(n >> 16)}, ${ch((n >> 8) & 255)}, ${ch(n & 255)})`;
}

/** The tear-line glint: a bright core with a long soft streak, for additive blending. */
export function glintTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 80;
  const g = c.getContext("2d")!;
  const streak = g.createLinearGradient(0, 0, 256, 0);
  streak.addColorStop(0, "rgba(255,200,120,0)");
  streak.addColorStop(0.5, "rgba(255,236,190,0.75)");
  streak.addColorStop(1, "rgba(255,200,120,0)");
  g.fillStyle = streak;
  g.fillRect(0, 37, 256, 6);
  const core = g.createRadialGradient(128, 40, 1, 128, 40, 40);
  core.addColorStop(0, "#ffffff");
  core.addColorStop(0.3, "rgba(255,230,170,0.85)");
  core.addColorStop(1, "rgba(255,180,90,0)");
  g.fillStyle = core;
  g.fillRect(0, 0, 256, 80);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

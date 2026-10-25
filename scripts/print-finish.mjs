// The finishing pass that makes generated art read as printed card art, not as a
// fresh render: it calms the glow and saturation, softens the over-crisp micro
// detail, then prints it: a fine halftone screen, paper grain, and a hair of
// ink misregistration. Usage: node scripts/print-finish.mjs [ids...] (default: all cards)
import sharp from "sharp";
import { readdir, copyFile, access } from "node:fs/promises";
import path from "node:path";

const src = "assets-src/cards", out = process.env.OUT ?? "public/art";
const SKIP = new Set(["pack", "pack-landscape", "back"]);
const ids = process.argv.slice(2).length
  ? process.argv.slice(2)
  : (await readdir(src)).filter((f) => f.endsWith(".png") && !SKIP.has(f.slice(0, -4)) && !f.includes("-")).map((f) => f.slice(0, -4));

// a seeded noise tile, so every run prints the same grain
function grain(w, h, seed = 7) {
  const buf = Buffer.alloc(w * h);
  let x = seed;
  for (let i = 0; i < buf.length; i++) {
    x = (x * 1103515245 + 12345) & 0x7fffffff;
    buf[i] = 128 + (((x >> 8) & 255) - 128) * 0.22;
  }
  return sharp(buf, { raw: { width: w, height: h, channels: 1 } }).png().toBuffer();
}
// a 45-degree halftone screen: soft dots on mid grey, applied in soft-light so it only textures
function screen(w, h, pitch = 5) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><pattern id="d" width="${pitch}" height="${pitch}" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="${pitch}" height="${pitch}" fill="#808080"/><circle cx="${pitch / 2}" cy="${pitch / 2}" r="${pitch * 0.3}" fill="#727272"/></pattern></defs><rect width="100%" height="100%" fill="url(#d)"/></svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

for (const id of ids) {
  const input = path.join(src, `${id}.png`);
  const meta = await sharp(input).metadata();
  const portrait = (meta.height ?? 0) > (meta.width ?? 0);
  const W = portrait ? Math.round((1400 * meta.width) / meta.height) : 960;
  const H = portrait ? 1400 : Math.round((960 * meta.height) / meta.width);

  // 1. calm it: less saturation, lower contrast, blacks lifted, highlights pulled down (the "everything glows" tell)
  // 2. soften: down to 55% and back up, so micro detail stops looking hyper-sharp
  const base = await sharp(input)
    .resize(Math.round(W * 0.7), Math.round(H * 0.7), { kernel: "lanczos3" })
    .resize(W, H, { kernel: "cubic" })
    .modulate({ saturation: 0.9 })
    .linear(0.94, 6)
    .gamma(1.03)
    .toBuffer();

  // 3. misregistration: the red plate sits a pixel off
  const { data, info } = await sharp(base).raw().toBuffer({ resolveWithObject: true });
  const shifted = Buffer.from(data);
  const c = info.channels;
  for (let y = 0; y < info.height; y++)
    for (let x = info.width - 1; x >= 1; x--) shifted[(y * info.width + x) * c] = data[(y * info.width + x - 1) * c];

  // 4. print it: halftone screen and paper grain, both in soft-light; a warm paper multiply underneath
  const dest = path.join(out, `${id}.webp`);
  await sharp(shifted, { raw: info })
    .composite([
      { input: { create: { width: W, height: H, channels: 4, background: { r: 246, g: 236, b: 214, alpha: 0.06 } } }, blend: "multiply" },
      { input: await screen(W, H), blend: "soft-light" },
      { input: await grain(W, H), blend: "soft-light" },
    ])
    .webp({ quality: 82, effort: 6 })
    .toFile(dest);
  try {
    await access(`${input}.json`);
    await copyFile(`${input}.json`, `${dest}.json`);
  } catch {}
  console.log(id);
}

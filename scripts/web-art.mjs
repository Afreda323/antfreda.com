// Converts assets-src/cards/*.png to public/art/*.webp at web size, carrying each
// image's provenance sidecar alongside. Usage: node scripts/web-art.mjs [ids...]
import sharp from "sharp";
import { readdir, copyFile, access } from "node:fs/promises";
import path from "node:path";
const src = "assets-src/cards", out = "public/art";
const ids = process.argv.slice(2).length ? process.argv.slice(2) : (await readdir(src)).filter((f) => f.endsWith(".png") && !f.includes("landscape")).map((f) => f.slice(0, -4));
for (const id of ids) {
  const input = path.join(src, `${id}.png`);
  const meta = await sharp(input).metadata();
  const portrait = (meta.height ?? 0) > (meta.width ?? 0);
  const dest = path.join(out, `${id}.webp`);
  await sharp(input).resize(portrait ? { height: 1400 } : { width: 1200 }).webp({ quality: 80, effort: 6 }).toFile(dest);
  try {
    await access(`${input}.json`);
    await copyFile(`${input}.json`, `${dest}.json`);
  } catch {}
  console.log(id, portrait ? "portrait" : "landscape");
}

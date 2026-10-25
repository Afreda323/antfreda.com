// Renders the favicon set from public/icon.svg.
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
const svg = "public/icon.svg";
for (const [file, size] of [["public/icon-192.png", 192], ["public/icon-512.png", 512], ["public/apple-touch-icon.png", 180], ["public/favicon-48.png", 48]]) {
  await sharp(svg, { density: 512 }).resize(size, size).png().toFile(file);
}
// favicon.ico holding one 48px PNG (ICO allows embedded PNG)
const png = await sharp(svg, { density: 512 }).resize(48, 48).png().toBuffer();
const head = Buffer.alloc(22);
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(1, 4);
head.writeUInt8(48, 6); head.writeUInt8(48, 7); head.writeUInt8(0, 8); head.writeUInt8(0, 9);
head.writeUInt16LE(1, 10); head.writeUInt16LE(32, 12); head.writeUInt32LE(png.length, 14); head.writeUInt32LE(22, 18);
await writeFile("public/favicon.ico", Buffer.concat([head, png]));
console.log("icons ok");

// Generates public/holo-foil.png: a tileable greyscale holo-foil texture
// (crossed diffraction waves plus sparkle points), multiplied with the
// rainbow on the secret rare's frame so the prism reads even at rest.
import sharp from "sharp";
const N = 512;
const px = Buffer.alloc(N * N);
const TAU = Math.PI * 2;
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
for (let y = 0; y < N; y++) {
  for (let x = 0; x < N; x++) {
    const u = x / N, v = y / N;
    // integer frequencies keep it tileable
    const a = Math.sin(TAU * (6 * u + 2 * v) + 2 * Math.sin(TAU * 2 * v));
    const b = Math.sin(TAU * (-3 * u + 7 * v) + 1.5 * Math.sin(TAU * 3 * u));
    const c = Math.sin(TAU * (11 * u + 11 * v));
    const val = 0.5 + 0.22 * a + 0.18 * b + 0.08 * c;
    px[y * N + x] = Math.max(0, Math.min(255, Math.round(val * 200)));
  }
}
// sparkles: tiny four-point stars
for (let i = 0; i < 260; i++) {
  const cx = Math.floor(rnd() * N), cy = Math.floor(rnd() * N);
  const r = 2 + Math.floor(rnd() * 4);
  for (let d = -r; d <= r; d++) {
    const k = 255 - Math.abs(d) * (200 / r);
    for (const [dx, dy] of [[d, 0], [0, d]]) {
      const xx = (cx + dx + N) % N, yy = (cy + dy + N) % N;
      px[yy * N + xx] = Math.max(px[yy * N + xx], Math.round(k));
    }
  }
}
await sharp(px, { raw: { width: N, height: N, channels: 1 } }).png().toFile("public/holo-foil.png");
console.log("holo-foil.png");

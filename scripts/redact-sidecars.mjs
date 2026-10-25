// The served art sidecars keep the prompt for provenance but never the dog's name
// (she is named only in About me). Run after scripts/web-art.mjs.
import { readdir, readFile, writeFile } from "node:fs/promises";
const dir = "public/art";
for (const f of (await readdir(dir)).filter((f) => f.endsWith(".json"))) {
  const p = `${dir}/${f}`;
  const d = JSON.parse(await readFile(p, "utf8"));
  const before = JSON.stringify(d);
  d.prompt = d.prompt.replace(/The dog is Ellie,/g, "The dog is").replace(/\bof Ellie\b/g, "of the dog").replace(/\bEllie\b/g, "the dog");
  d.note = "Exact generation prompt kept in assets-src/cards (not served).";
  if (JSON.stringify(d) !== before) await writeFile(p, JSON.stringify(d, null, 2) + "\n");
}

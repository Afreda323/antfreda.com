// Full-page captures from the document top for review: desktop 1440 and phone 390.
// Usage: node scripts/full-capture.mjs <url> <outDir>
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const url = process.argv[2] ?? "http://localhost:3106/";
const outDir = process.argv[3] ?? ".impeccable/review";
const CH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9361;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await mkdir(outDir, { recursive: true });
const chrome = spawn(CH, ["--headless=new", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--hide-scrollbars", `--remote-debugging-port=${PORT}`, `--user-data-dir=${path.resolve(outDir, ".profile-full")}`, "about:blank"], { stdio: "ignore" });
const kill = setTimeout(() => {
  chrome.kill("SIGKILL");
  process.exit(2);
}, 180000);
async function json(p, method = "GET") {
  for (let i = 0; i < 60; i++) {
    try {
      return await (await fetch(`http://127.0.0.1:${PORT}${p}`, { method })).json();
    } catch {
      await sleep(250);
    }
  }
  throw new Error("chrome did not answer");
}
try {
  for (const [name, view] of [
    ["desktop", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false }],
    ["mobile", { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }],
    ["tablet", { width: 1024, height: 768, deviceScaleFactor: 1, mobile: false }],
  ]) {
    const tab = await json("/json/new?about:blank", "PUT");
    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    let id = 0;
    const waits = new Map();
    ws.onmessage = (e) => {
      const m = JSON.parse(e.data);
      if (m.id && waits.has(m.id)) {
        waits.get(m.id)(m);
        waits.delete(m.id);
      }
    };
    await new Promise((r) => (ws.onopen = r));
    const send = (method, params = {}) =>
      new Promise((res, rej) => {
        const n = ++id;
        waits.set(n, (m) => (m.error ? rej(new Error(m.error.message)) : res(m.result)));
        ws.send(JSON.stringify({ id: n, method, params }));
      });
    await send("Page.enable");
    await send("Emulation.setDeviceMetricsOverride", view);
    // THEME=light|dark emulates the system preference (the site's Auto follows it)
    if (process.env.THEME) await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: process.env.THEME }] });
    await send("Page.navigate", { url });
    await sleep(5000);
    await send("Runtime.evaluate", { expression: "document.documentElement.style.scrollBehavior = 'auto'" });
    // walk the page once so lazy art loads, then return to the top
    const h = (await send("Runtime.evaluate", { expression: "document.documentElement.scrollHeight", returnByValue: true })).result.value;
    for (let y = 0; y < h; y += view.height) {
      await send("Runtime.evaluate", { expression: `window.scrollTo(0, ${y})` });
      await sleep(700);
    }
    await send("Runtime.evaluate", { expression: "window.scrollTo(0, 0)" });
    await sleep(1500);
    const file = path.join(outDir, `${name}.png`);
    if (!view.mobile) {
      const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y: 0, width: view.width, height: h, scale: 1 } });
      await writeFile(file, Buffer.from(shot.data, "base64"));
    } else {
      // mobile emulation tiles the viewport when capturing beyond it: scroll and stitch real viewport slices.
      // The fixed dock shows in the first slice only, so it is not repeated down the stitched page.
      const { default: sharp } = await import("sharp");
      const parts = [];
      for (let y = 0, k = 0; y < h; y += view.height, k++) {
        const top = Math.min(y, h - view.height);
        await send("Runtime.evaluate", { expression: `window.scrollTo(0, ${top}); document.querySelectorAll('.dock, .top').forEach((el) => (el.style.visibility = ${k === 0 ? "'visible'" : "'hidden'"}));` });
        await sleep(450);
        const s = await send("Page.captureScreenshot", { format: "png" });
        parts.push({ top, buf: Buffer.from(s.data, "base64") });
      }
      const dpr = view.deviceScaleFactor;
      await sharp({ create: { width: view.width * dpr, height: h * dpr, channels: 3, background: "#16111d" } })
        .composite(parts.map((p) => ({ input: p.buf, left: 0, top: p.top * dpr })))
        .png()
        .toFile(file);
    }
    console.log(file, view.width, "x", h);
    ws.close();
  }
} finally {
  clearTimeout(kill);
  chrome.kill("SIGKILL");
}

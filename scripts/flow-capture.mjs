// Drives the whole pack flow in headless Chrome over the DevTools protocol and
// captures each moment: sealed, mid-tear, the rip, every card, the holo, the
// binder. Usage: node scripts/flow-capture.mjs <url> <outDir> [desktop|phone]
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const url = process.argv[2] ?? "http://localhost:3100/";
const outDir = process.argv[3] ?? ".impeccable/review/flow";
const device = process.argv[4] ?? "desktop";
const CH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = device === "phone" ? 9352 : 9351;
const VIEW = device === "phone" ? { width: 390, height: 844, deviceScaleFactor: 2, mobile: true } : { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
await mkdir(outDir, { recursive: true });

const chrome = spawn(CH, ["--headless=new", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--hide-scrollbars", "--autoplay-policy=no-user-gesture-required", `--remote-debugging-port=${PORT}`, `--user-data-dir=${path.resolve(outDir, ".profile-" + device)}`, "about:blank"], { stdio: "ignore" });
const kill = setTimeout(() => {
  chrome.kill("SIGKILL");
  process.exit(2);
}, 240000);

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
    waits.set(n, (m) => (m.error ? rej(new Error(`${method}: ${m.error.message}`)) : res(m.result)));
    ws.send(JSON.stringify({ id: n, method, params }));
  });
const ev = async (expression) => (await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true })).result.value;
let shotN = 0;
const shot = async (name) => {
  const s = await send("Page.captureScreenshot", { format: "png" });
  const file = path.join(outDir, `${device}-${String(++shotN).padStart(2, "0")}-${name}.png`);
  await writeFile(file, Buffer.from(s.data, "base64"));
  console.log(file);
};

try {
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", VIEW);
  if (VIEW.mobile) await send("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
  await send("Page.navigate", { url });
  await sleep(4500);
  await shot("sealed");

  // the cards' rise lasts ~0.5s, too quick for a headless screenshot: hold the scene at 0.75s past the rip, shoot, reset
  let gl = false;
  for (let k = 0; k < 30 && !gl; k++) {
    gl = await ev(`!!document.querySelector('.pack.is-gl')`);
    if (!gl) await sleep(500);
  }
  if (gl) {
    await ev(`(() => { const p = window.__pack; p.phase = 'ripped'; p.freezeSince = 0.75; })()`);
    await sleep(1800);
    await shot("rise-held");
    await ev(`(() => { const p = window.__pack; p.phase = 'sealed'; p.freezeSince = null; p.progress = 0; p.generation++; })()`);
    await sleep(1200);
  }

  // a real drag along the crimp, left to right
  const box = await ev(`(() => { const r = document.querySelector('.pack').getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; })()`);
  const y = box.y + box.h * 0.16;
  const x0 = box.x + box.w * 0.08;
  await send("Input.dispatchMouseEvent", { type: "mouseMoved", x: x0, y });
  await send("Input.dispatchMouseEvent", { type: "mousePressed", x: x0, y, button: "left", clickCount: 1 });
  const steps = 14;
  for (let i = 1; i <= steps; i++) {
    const x = x0 + (box.w * 0.55 * i) / steps;
    await send("Input.dispatchMouseEvent", { type: "mouseMoved", x, y, button: "left", buttons: 1 });
    await sleep(30);
    if (i === 8) await shot("mid-tear");
  }
  await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: x0 + box.w * 0.55, y, button: "left", clickCount: 1 });
  await sleep(60);
  await shot("rip-burst");
  await sleep(1800);
  await shot("card-01");

  for (let n = 2; n <= 12; n++) {
    await send("Input.dispatchKeyEvent", { type: "keyDown", key: "ArrowRight", code: "ArrowRight", windowsVirtualKeyCode: 39 });
    await send("Input.dispatchKeyEvent", { type: "keyUp", key: "ArrowRight", code: "ArrowRight", windowsVirtualKeyCode: 39 });
    // a throw takes ~330ms before the next card is promoted; read the new card's rarity after it
    await sleep(450);
    const rare = await ev(`document.querySelector('.reveal')?.dataset.rarity`);
    await sleep(rare === "secret" ? 6000 : rare === "rare" ? 1900 : 1100);
    const count = await ev(`document.querySelector('.reveal-count')?.textContent`);
    await shot(`card-${String(n).padStart(2, "0")}`);
    console.log(" ", count);
  }

  // into the binder
  await ev(`(() => { [...document.querySelectorAll('.reveal button')].find((b) => /see all cards/i.test(b.textContent))?.click(); })()`);
  await sleep(1800);
  await shot("binder-top");
  await ev(`document.documentElement.style.scrollBehavior = 'auto'`);
  await ev(`document.querySelector('.bento')?.scrollIntoView({ block: 'start' })`);
  await sleep(1500);
  await shot("highlights");
  await ev(`document.querySelector('.experience')?.scrollIntoView({ block: 'start' })`);
  await sleep(1200);
  await shot("experience");
  await ev(`document.querySelectorAll('.tile-btn')[1]?.click()`);
  await sleep(1600);
  await shot("inspect");
  await send("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
  await sleep(600);
  await ev(`document.querySelector('.collection')?.scrollIntoView({ block: 'start' })`);
  await sleep(1200);
  await shot("set-row");
  await ev(`window.scrollTo(0, document.body.scrollHeight)`);
  await sleep(5000);
  await shot("close");
} finally {
  clearTimeout(kill);
  ws.close();
  chrome.kill("SIGKILL");
}

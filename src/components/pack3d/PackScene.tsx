"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { packState } from "./store";
import { cardBackTexture, cardFrontTexture, crinkleNormalMap, glintTexture, mouthTexture, printTexture } from "./textures";
import { cards as deck } from "@/content/cards";
import { START_YEAR } from "@/content/resume";

/** Pack size in world units: the DOM pack's 0.64 aspect. */
const H = 3.2;
const W = H * 0.64;
/** Where the tear runs, as a fraction of the height from the top (matches the DOM pack). */
const TEAR_FROM_TOP = 0.115;
const Y_TEAR = H / 2 - TEAR_FROM_TOP * H;
const CRIMP = 0.07;
const BULGE = 0.16;

/** The jagged tear: the same small zigzag the DOM pack draws, as a y offset along the width. */
function jag(u: number) {
  const i = u * 28;
  const k = Math.round(i);
  const zig = (k % 2 ? 1 : -1) * (0.008 + 0.006 * Math.abs(Math.sin(k * 2.7)));
  const tri = 1 - Math.abs(i - k) * 2;
  return (zig * Math.max(0, tri) + 0.006 * Math.sin(i * 0.9)) * H;
}

/** The pillow: flat in the crimped seals, swelling to the middle. */
function bulge(u: number, v: number) {
  const vv = THREE.MathUtils.clamp((v - CRIMP) / (1 - 2 * CRIMP), 0, 1);
  return BULGE * Math.pow(Math.sin(Math.PI * u), 0.55) * Math.pow(Math.sin(Math.PI * vv), 0.45);
}

/** A grid patch of the pack between two heights; the tear edge row follows the zigzag. */
function patch(y0: number, y1: number, segX: number, segY: number, side: 1 | -1, tearEdge: "top" | "bottom" | null) {
  const geo = new THREE.BufferGeometry();
  const pos: number[] = [];
  const uv: number[] = [];
  const idx: number[] = [];
  for (let j = 0; j <= segY; j++) {
    for (let i = 0; i <= segX; i++) {
      const u = i / segX;
      let y = y0 + ((y1 - y0) * j) / segY;
      if ((tearEdge === "top" && j === segY) || (tearEdge === "bottom" && j === 0)) y += jag(u);
      const v = (y + H / 2) / H;
      const x = (u - 0.5) * W;
      pos.push(x, y, side * bulge(u, v));
      uv.push(side === 1 ? u : 1 - u, v);
    }
  }
  for (let j = 0; j < segY; j++) {
    for (let i = 0; i < segX; i++) {
      const a = j * (segX + 1) + i;
      const b = a + 1;
      const c = a + segX + 1;
      const d = c + 1;
      if (side === 1) idx.push(a, b, d, a, d, c);
      else idx.push(a, d, b, a, c, d);
    }
  }
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return geo;
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function Pack({ onReady, name, title }: { onReady: () => void; name: string; title: string }) {
  const { viewport, size, gl } = useThree();
  const root = React.useRef<THREE.Group>(null);
  const flap = React.useRef<THREE.Group>(null);
  const mouth = React.useRef<THREE.Mesh>(null);
  // the "tear here" cue: a glint that runs along the tear line while the pack is sealed and untouched
  const glint = React.useRef<THREE.Mesh>(null);
  const glintMat = React.useMemo(
    () => new THREE.MeshBasicMaterial({ map: glintTexture(), transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false, toneMapped: false }),
    []
  );
  // its trace: a thin ribbon laid on the jagged tear line that lights up behind the head and fades, like a heart monitor
  const trace = React.useMemo(() => {
    const n = 112;
    const pos: number[] = [];
    const us: number[] = [];
    const idx: number[] = [];
    const x0 = -W / 2 + 0.06, x1 = W / 2 - 0.06, h = 0.012;
    for (let i = 0; i <= n; i++) {
      const u = i / n;
      const y = Y_TEAR + jag(u);
      const x = x0 + u * (x1 - x0);
      pos.push(x, y - h, 0.05, x, y + h, 0.05);
      us.push(u, u);
      if (i < n) idx.push(i * 2, i * 2 + 2, i * 2 + 1, i * 2 + 1, i * 2 + 2, i * 2 + 3);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute("u", new THREE.Float32BufferAttribute(us, 1));
    geo.setIndex(idx);
    const mat = new THREE.ShaderMaterial({
      uniforms: { uHead: { value: 0 }, uAlpha: { value: 0 } },
      vertexShader: "attribute float u; varying float vU; void main(){ vU = u; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
      fragmentShader:
        "uniform float uHead; uniform float uAlpha; varying float vU; void main(){ float d = uHead - vU; float a = d >= 0.0 ? exp(-d * 7.0) : 0.0; gl_FragColor = vec4(vec3(1.0, 0.86, 0.6) * a * uAlpha, 1.0); }",
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
    });
    return { geo, mat };
  }, []);
  const spill = React.useRef<THREE.PointLight>(null);
  const cards = React.useRef<THREE.Group>(null);
  const [mats, setMats] = React.useState<{ front: THREE.Material; back: THREE.Material; mouth: THREE.Material; card: THREE.Material; cardEdge: THREE.Material; faces: THREE.Material[] } | null>(null);
  const gen = React.useRef(packState.generation);

  const geos = React.useMemo(() => {
    const flapFront = patch(Y_TEAR, H / 2, 32, 8, 1, "bottom");
    return {
      bodyFront: patch(-H / 2, Y_TEAR, 32, 44, 1, "top"),
      bodyBack: patch(-H / 2, Y_TEAR, 32, 44, -1, "top"),
      flapFront,
      flapBack: patch(Y_TEAR, H / 2, 32, 8, -1, "bottom"),
      flapBase: Float32Array.from(flapFront.getAttribute("position").array as Float32Array),
    };
  }, []);

  React.useEffect(() => {
    let alive = true;
    (async () => {
      // the card faces are only seen after the rip: start them now, but draw the pack as soon as its own print is ready
      const facesP = Promise.all(deck.slice(0, 5).map((c) => cardFrontTexture(c)));
      const [print, back] = await Promise.all([
        printTexture({ art: "/art/pack.webp", name, title, footLeft: "12-card booster", footRight: `Series ${START_YEAR} to now` }),
        cardBackTexture(),
      ]);
      if (!alive) return;
      const crinkle = crinkleNormalMap();
      crinkle.repeat.set(1.4, 2.2);
      const foil = (map: THREE.Texture | null, color: string) =>
        new THREE.MeshPhysicalMaterial({
          map,
          color,
          // the print glows a little on its own, so the art stays as bright as the flat version under the foil
          emissiveMap: map,
          emissive: map ? new THREE.Color("#ffffff") : new THREE.Color("#000000"),
          emissiveIntensity: map ? 0.32 : 0,
          normalMap: crinkle,
          normalScale: new THREE.Vector2(0.16, 0.16),
          roughness: 0.34,
          metalness: 0.12,
          iridescence: 0.65,
          iridescenceIOR: 1.55,
          iridescenceThicknessRange: [220, 680],
          clearcoat: 0.7,
          clearcoatRoughness: 0.22,
          envMapIntensity: 1.25,
        });
      setMats({
        front: foil(print, "#ffffff"),
        back: foil(null, "#4b3572"),
        mouth: new THREE.MeshBasicMaterial({ map: mouthTexture(), transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }),
        card: new THREE.MeshStandardMaterial({ map: back, roughness: 0.55 }),
        cardEdge: new THREE.MeshStandardMaterial({ color: "#efe6d6", roughness: 0.8 }),
        faces: [],
      });
      onReady();
      // the first five cards of the pull, face up toward the viewer: the first card in front
      const fronts = await facesP;
      if (!alive) return;
      setMats((m) => (m ? { ...m, faces: fronts.map((t) => new THREE.MeshStandardMaterial({ map: t, roughness: 0.5 })) } : m));
    })().catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [name, title, onReady]);

  const lastTear = React.useRef(-1);
  const flapFly = React.useRef({ x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, vx: 0, vy: 0, vz: 0, wx: 0, wy: 0, wz: 0 });

  useFrame((state, dt) => {
    const g = root.current;
    if (!g || !mats) return;
    const d = Math.min(dt, 0.05);
    const t = state.clock.elapsedTime;

    // a new pack after "Rip another"
    if (gen.current !== packState.generation) {
      gen.current = packState.generation;
      flapFly.current = { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, vx: 0, vy: 0, vz: 0, wx: 0, wy: 0, wz: 0 };
      if (flap.current) {
        flap.current.visible = true;
        flap.current.position.set(0, 0, 0);
        flap.current.rotation.set(0, 0, 0);
      }
      if (cards.current) cards.current.visible = false;
    }

    // fit the pack to the DOM pack's box
    const rect = packState.el?.getBoundingClientRect();
    if (rect && rect.height > 0) {
      const c = gl.domElement.getBoundingClientRect();
      const upp = viewport.height / Math.max(1, size.height);
      const cx = rect.left + rect.width / 2 - c.left;
      const cy = rect.top + rect.height / 2 - c.top;
      g.position.x = (cx - size.width / 2) * upp;
      g.position.y = -(cy - size.height / 2) * upp + Math.sin(t * 1.1) * 0.035;
      g.scale.setScalar((rect.height * upp) / H);
    }

    // tilt toward the hand, with a slow idle sway: the foil's highlights travel across it
    const tl = packState.tilt;
    const wantY = (tl.active ? tl.x * 0.32 : Math.sin(t * 0.45) * 0.12) + 0;
    const wantX = tl.active ? tl.y * 0.16 : Math.sin(t * 0.6) * 0.04;
    g.rotation.y += (wantY - g.rotation.y) * Math.min(1, d * 4);
    g.rotation.x += (wantX - g.rotation.x) * Math.min(1, d * 4);
    g.rotation.z = -0.05 + Math.sin(t * 0.7) * 0.012;

    const p = packState.progress;
    const ripped = packState.phase === "ripped" || packState.phase === "gone";
    const gm = glint.current;
    if (gm) {
      // a pulse runs the tear line left to right in 1.1s, its trace fades, then a beat of rest; gone the moment a hand is on it
      const idle = packState.phase === "sealed" && p === 0;
      const cyc = (t % 2.6) / 1.1;
      const u = Math.min(1, cyc);
      gm.position.set(-W / 2 + 0.06 + u * (W - 0.12), Y_TEAR + jag(u), 0.05);
      const head = cyc < 1 ? Math.min(1, u * 4, (1 - u) * 6) : 0;
      const want = idle ? 1 : 0;
      const k = Math.min(1, d * 12);
      glintMat.opacity += (want * head * 0.95 - glintMat.opacity) * k;
      trace.mat.uniforms.uHead.value = cyc;
      trace.mat.uniforms.uAlpha.value += (want * 0.9 - trace.mat.uniforms.uAlpha.value) * k;
    }

    // the tear: torn columns of the front flap peel up toward the viewer, curling at the top edge
    const tearKey = ripped ? 2 : p + packState.dir * 10;
    const f = geos.flapFront.getAttribute("position") as THREE.BufferAttribute;
    const base = geos.flapBase;
    const moved = tearKey !== lastTear.current;
    lastTear.current = tearKey;
    const flapH = H / 2 - Y_TEAR;
    for (let i = 0; moved && i < f.count; i++) {
      const x = base[i * 3], y = base[i * 3 + 1], z = base[i * 3 + 2];
      const u = x / W + 0.5;
      const s = packState.dir === 1 ? u : 1 - u;
      const yT = Y_TEAR + jag(u);
      const h = Math.max(0, y - yT);
      const torn = THREE.MathUtils.smoothstep((ripped ? 1.3 : p * 1.15) - s, 0, 0.24);
      const th = torn * (0.9 + 0.9 * (h / flapH));
      f.setXYZ(i, x, yT + h * Math.cos(th), z * Math.cos(th) + h * Math.sin(th) + torn * 0.04);
    }
    if (moved) {
      f.needsUpdate = true;
      geos.flapFront.computeVertexNormals();
    }

    // light spills out of the opening
    const open = ripped ? 1 : Math.min(1, p * 1.6);
    (mats.mouth as THREE.MeshBasicMaterial).opacity = open;
    if (spill.current) spill.current.intensity = open * 7;

    // the rip: the flap tears free and tumbles away; cards slide out of the mouth
    const since = ripped ? (packState.freezeSince ?? performance.now() / 1000 - packState.rippedAt) : 0;
    const fl = flap.current;
    if (fl) {
      if (ripped) {
        const k = flapFly.current;
        if (k.vx === 0 && k.vy === 0) {
          k.vx = 2.6 * packState.dir;
          k.vy = 7.5;
          k.vz = 3.2;
          k.wx = -7;
          k.wy = 4 * packState.dir;
          k.wz = -9 * packState.dir;
        }
        k.vy -= 18 * d;
        k.x += k.vx * d;
        k.y += k.vy * d;
        k.z += k.vz * d;
        k.rx += k.wx * d;
        k.ry += k.wy * d;
        k.rz += k.wz * d;
        fl.position.set(k.x, k.y, k.z);
        fl.rotation.set(k.rx, k.ry, k.rz);
        fl.visible = since < 1.2;
      }
    }
    const cg = cards.current;
    if (cg) {
      cg.visible = ripped && since > 0.08;
      cg.children.forEach((card, i) => {
        // each card rises out of the mouth on its own beat and fans out, so five read as five
        const local = THREE.MathUtils.clamp((since - 0.08 - i * 0.07) / 0.5, 0, 1);
        const e = easeOut(local);
        // they clear the mouth by about a fifth of a card, never up into the header
        card.position.y = 0.1 + e * (0.7 + i * 0.02);
        // they stay inside the pack and stick up out of the torn top; the first card stands dead centre and the rest fan out behind it, alternating sides
        const k = 4 - i;
        const side = k % 2 ? -1 : 1;
        const step = Math.ceil(k / 2) * side;
        card.position.x = step * 0.075 * e;
        card.position.z = 0.002 * i;
        card.rotation.z = -step * 0.06 * e;
        card.rotation.x = 0;
      });
    }
  });

  if (!mats) return null;
  return (
    <group ref={root}>
      <mesh geometry={geos.bodyFront} material={mats.front} castShadow />
      <mesh geometry={geos.bodyBack} material={mats.back} />
      <mesh renderOrder={5} geometry={trace.geo} material={trace.mat} />
      <mesh ref={glint} renderOrder={6} material={glintMat}>
        <planeGeometry args={[0.5, 0.16]} />
      </mesh>
      <mesh ref={mouth} position={[0, Y_TEAR - 0.16, 0]} renderOrder={2} material={mats.mouth}>
        <planeGeometry args={[W * 0.94, 0.42]} />
      </mesh>
      <pointLight ref={spill} position={[0, Y_TEAR + 0.05, 0.35]} color="#ffc37a" distance={3.2} decay={2} intensity={0} />
      <group ref={flap}>
        <mesh geometry={geos.flapFront} material={mats.front} />
        <mesh geometry={geos.flapBack} material={mats.back} />
      </group>
      <group ref={cards} visible={false}>
        {Array.from({ length: 5 }, (_, i) => (
          // the front-most card (i = 4) is card 1 of the pull
          <mesh key={i} position={[0, 0.1, 0]} material={[mats.cardEdge, mats.cardEdge, mats.cardEdge, mats.cardEdge, mats.faces[4 - i] ?? mats.card, mats.card]}>
            {/* smaller than the pack, so the fan stays inside it and inside the screen */}
            <boxGeometry args={[W * 0.72, W * 0.72 * (88 / 63), 0.012]} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/**
 * The live pack. It is fitted every frame to the DOM pack's box (which keeps
 * the heading, the Rip here button, the drag handling and the fallback), so
 * layout stays in CSS and the 3D only draws.
 */
export default function PackScene({ onReady, name, title, active = true }: { onReady: () => void; name: string; title: string; active?: boolean }) {
  return (
    <Canvas
      className="pack-scene"
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 28, position: [0, 0, 14], near: 0.5, far: 60 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.15;
      }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <ambientLight intensity={0.35} color="#f1e6ff" />
      {/* the lamp: warm, high and to the left */}
      <spotLight position={[-5, 7, 8]} angle={0.5} penumbra={0.9} intensity={230} color="#fff1e0" decay={2} />
      <directionalLight position={[5, 2, -3]} intensity={1.4} color="#b8a6ff" />
      <Environment frames={1} resolution={256} environmentIntensity={0.9}>
        <Lightformer form="rect" intensity={4} color="#ffd9a8" position={[-4, 5, 5]} scale={[5, 5, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={2.5} color="#c9b8ff" position={[6, 0, 3]} scale={[1.5, 8, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={2} color="#8fe3ff" position={[-6, -2, 3]} scale={[1.5, 6, 1]} target={[0, 0, 0]} />
        <Lightformer form="ring" intensity={1.5} color="#ffffff" position={[0, 0, -8]} scale={[5, 5, 1]} target={[0, 0, 0]} />
      </Environment>
      <Pack onReady={onReady} name={name} title={title} />
    </Canvas>
  );
}

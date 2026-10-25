"use client";

import * as React from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";

/**
 * the dog, live: dog.glb (a single unrigged Tripo mesh; feet at y = -1, ear
 * tips at +1, head toward +Z in mesh space) with an idle written as a vertex
 * shader. Her tail wags, her head drifts and an ear twitches now and then.
 * She turns to follow the pointer over the card and breathes.
 */
const uTime = { value: 0 };

function idle(shader: { vertexShader: string; uniforms: Record<string, THREE.IUniform> }) {
  shader.uniforms.uTime = uTime;
  shader.vertexShader = shader.vertexShader
    .replace("#include <common>", "#include <common>\nuniform float uTime;")
    .replace(
      "#include <begin_vertex>",
      `#include <begin_vertex>
       {
         vec3 p = transformed;
         float tailW = smoothstep(-0.78, -0.95, p.z) * step(-0.45, p.y);
         float wag = sin(uTime * 10.0) * 0.6 + sin(uTime * 2.3) * 0.2;
         p.x += wag * 0.2 * tailW;
         float headW = smoothstep(0.15, 0.4, p.z) * step(0.15, p.y);
         p.y += sin(uTime * 1.3) * 0.015 * headW;
         float earW = smoothstep(0.55, 0.8, p.y) * step(0.0, p.z);
         float tw1 = pow(max(0.0, sin(uTime * 0.9 + 1.0)), 24.0);
         float tw2 = pow(max(0.0, sin(uTime * 0.63 + 4.0)), 24.0);
         float side = p.x < 0.0 ? tw1 : tw2;
         p.x += side * 0.07 * earW * sign(p.x);
         p.y -= side * 0.05 * earW;
         transformed = p;
       }`
    );
}

/** dog.glb's colour map is a warm mid grey; a cool tint makes it her blue-grey. */
const TINT = "#cdd7f2";

function Dog({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const { scene } = useGLTF("/models/dog.glb");
  const group = React.useRef<THREE.Group>(null);
  const local = React.useRef(new THREE.Box3());
  const object = React.useMemo(() => {
    const root = scene.clone(true);
    root.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      const src = (Array.isArray(mesh.material) ? mesh.material[0] : mesh.material) as THREE.MeshStandardMaterial;
      if (src.map) {
        src.map.colorSpace = THREE.SRGBColorSpace;
        src.map.anisotropy = 8;
      }
      const m = new THREE.MeshStandardMaterial({ map: src.map ?? null, color: TINT, roughness: 0.58, metalness: 0 });
      m.onBeforeCompile = idle as unknown as THREE.Material["onBeforeCompile"];
      mesh.material = m;
    });
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const c = box.getCenter(new THREE.Vector3());
    const s = 2 / (size.y || 1);
    root.scale.setScalar(s);
    root.position.set(-c.x * s, -box.min.y * s, -c.z * s);
    const wrap = new THREE.Group();
    wrap.add(root);
    local.current = new THREE.Box3().setFromObject(wrap);
    return wrap;
  }, [scene]);

  const still = React.useMemo(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);
  useFrame((state, dt) => {
    // reduced motion: she holds one natural pose
    const t = still ? 1.2 : state.clock.elapsedTime;
    uTime.value = t;
    const g = group.current;
    if (!g) return;
    const d = Math.min(dt, 0.05);
    const p = pointer.current ?? { x: 0, y: 0 };
    const yaw = -0.22 + p.x * 0.3 + (still ? 0 : Math.sin(t * 0.4) * 0.04);
    g.rotation.y += (yaw - g.rotation.y) * Math.min(1, d * 3);
    // keep her centred: the turned footprint's x-extent, from the 8 corners of her box
    const b = local.current;
    const cy = Math.cos(g.rotation.y), sy = Math.sin(g.rotation.y);
    let lo = Infinity, hi = -Infinity;
    for (const x of [b.min.x, b.max.x]) for (const z of [b.min.z, b.max.z]) {
      const wx = x * cy + z * sy;
      lo = Math.min(lo, wx);
      hi = Math.max(hi, wx);
    }
    g.position.x = -(lo + hi) / 2;
    g.rotation.x += (p.y * 0.08 - g.rotation.x) * Math.min(1, d * 3);
    g.position.y = Math.sin(t * 2.1) * 0.012;
  });

  return (
    <group ref={group}>
      <primitive object={object} />
    </group>
  );
}

useGLTF.preload("/models/dog.glb");

export default function DogModel({ pointer, onReady }: { pointer: React.RefObject<{ x: number; y: number }>; onReady?: () => void }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      // measure layout size, not the transformed box: the card mounts mid-flip, when its on-screen box is squashed
      resize={{ offsetSize: true }}
      gl={{ antialias: true, alpha: true }}
      camera={{ fov: 24, position: [0, 1.25, 6.4], near: 0.1, far: 50 }}
      onCreated={({ gl, camera }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.35;
        camera.lookAt(0, 0.95, 0);
      }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.7} color="#dfe4ff" />
      <directionalLight position={[-2.5, 4, 3]} intensity={2.1} color="#f4f1ff" />
      <directionalLight position={[3, 2, -2.5]} intensity={1.8} color="#c9bcff" />
      <Environment frames={1} resolution={128} environmentIntensity={0.6}>
        <Lightformer form="rect" intensity={2.6} color="#eef0ff" position={[0, 5, 2]} scale={[6, 6, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={2.5} color="#9fd8ff" position={[5, 1.5, -1]} scale={[2, 5, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={2} color="#ffb3d9" position={[-5, 1.5, -1]} scale={[2, 5, 1]} target={[0, 0, 0]} />
      </Environment>
      <React.Suspense fallback={null}>
        <Dog pointer={pointer} />
        <Ready onReady={onReady} />
      </React.Suspense>
    </Canvas>
  );
}

function Ready({ onReady }: { onReady?: () => void }) {
  React.useEffect(() => {
    onReady?.();
  }, [onReady]);
  return null;
}

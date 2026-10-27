'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { engineeringProjects, featuredWebProject, webProjects } from './Projects';
import { skillCategories } from './Tape';
import { experiences, credentials } from './TimeLineComponent';
import ContactForm from './ContactForm';
import { Globe } from './ui/globe';
import HeroMarkers from './HeroMarkers';
import { Starfield } from './Starfield';

// ============================================================================
// HUD primitives
// ============================================================================

function HudPanel({ children, className = '', frame = 'bg-bat-400/30' }) {
  return (
    <div className={`hud-chamfer p-px ${frame} ${className}`}>
      <div className="hud-chamfer h-full w-full bg-cyber-surface/95 backdrop-blur-md">
        {children}
      </div>
    </div>
  );
}

function HudButton({ children, onClick, active = false, accText = 'text-bat-300' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`hud-chamfer-sm px-3 py-1.5 font-mono text-[10px] sm:text-[11px] tracking-wider uppercase transition-colors duration-200 ${
        active
          ? `bg-bat-400/15 ${accText} border border-bat-400/50`
          : 'bg-white/[0.03] text-gray-300 border border-white/10 hover:border-bat-400/50 hover:text-bat-300'
      }`}
    >
      {children}
    </button>
  );
}

// ============================================================================
// Sector map — camera anchors keyed to station parts
// anchor = local Vector3 on watchtowerGroup · lookAt/cam = world space
// yaw = presentation angle the station turns to when the sector is selected
// ============================================================================

const SECTORS = [
  { id: 'command', num: '01', dock: 'COMMAND', label: 'COMMAND', anchor: [0, 0.5, 0], lookAt: [-1.0, 0.5, 0], cam: [0.0, 0.4, 12.6], yaw: 0.0, desc: 'Identification & sector overview' },
  { id: 'about', num: '02', dock: 'UPPER RING // ABOUT', label: 'UPPER RING', anchor: [-1.8, 4.6, 0.5], lookAt: [-2.2, 4.2, 0], cam: [-2.6, 4.4, 8.8], yaw: 0.32, desc: 'Bio, role & orbital diagnostics' },
  { id: 'rnd', num: '03', dock: 'CORE SPIRE // R&D', label: 'CORE SPIRE', anchor: [0.0, 2.1, 0.9], lookAt: [-1.5, 2.0, 0], cam: [-1.0, 2.6, 6.4], yaw: 0.14, desc: 'Warmo build ops & core systems' },
  { id: 'missions', num: '04', dock: 'SATELLITES // LOGS', label: 'SATELLITES', anchor: [2.6, 0.3, -0.5], lookAt: [1.8, 0.2, -0.5], cam: [2.9, 0.9, 6.4], yaw: -0.5, desc: 'Career timeline · 4 roles' },
  { id: 'tech', num: '05', dock: 'REACTOR // TECH', label: 'REACTOR', anchor: [0.0, -1.6, 0.8], lookAt: [-0.8, -1.5, 0], cam: [-0.2, -1.2, 5.2], yaw: -0.14, desc: 'Full-stack tech matrix' },
  { id: 'projects', num: '06', dock: 'JAVELIN // PROJECTS', label: 'JAVELIN', anchor: [0.2, -3.5, 0.7], lookAt: [-0.4, -3.2, 0], cam: [0.2, -2.8, 4.8], yaw: -0.3, desc: '8 builds · mobile / server / web' },
  { id: 'contact', num: '07', dock: 'COMMS // CONTACT', label: 'COMMS ARRAY', anchor: [0.0, 4.4, 0.6], lookAt: [-1.8, 4.1, 0], cam: [-1.6, 3.4, 7.2], yaw: 0.22, desc: 'Open a secure channel' },
];

// ============================================================================
// Procedural canvas textures
// ============================================================================

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Golden multi-deck window strips over a gunmetal hull — returns { map, emissiveMap }
function createWatchtowerWindowTexture(repeatX = 6, repeatY = 3) {
  const W = 512;
  const H = 256;
  const rand = mulberry32(1337);
  const rowH = 14;

  const make = (emissiveOnly) => {
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    const g = c.getContext('2d');
    g.fillStyle = emissiveOnly ? '#000000' : '#2a303c';
    g.fillRect(0, 0, W, H);
    if (!emissiveOnly) {
      for (let i = 0; i < 30; i++) {
        g.fillStyle = rand() > 0.5 ? '#303949' : '#242b38';
        g.globalAlpha = 0.5;
        g.fillRect(Math.floor(rand() * W), Math.floor(rand() * H), 10 + rand() * 50, 6 + rand() * 18);
      }
      g.globalAlpha = 1;
    }
    for (let row = 0; row < H / rowH; row++) {
      const y = row * rowH + Math.floor((rowH - 3) / 2);
      let x = Math.floor(rand() * 30) - 30;
      while (x < W + 10) {
        const w = 4 + Math.floor(rand() * 25); // 4-28px dashes
        if (x + w > 0) {
          g.fillStyle = rand() > 0.35 ? '#ffd84d' : '#ffae00';
          g.fillRect(x, y, w, 3);
        }
        x += w + 5 + Math.floor(rand() * 26);
      }
      if (!emissiveOnly) {
        g.fillStyle = '#141820';
        g.fillRect(0, row * rowH, W, 2);
      }
    }
    if (!emissiveOnly) {
      for (let x = 0; x < W; x += 64) {
        g.fillStyle = '#141820';
        g.fillRect(x, 0, 2, H);
      }
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeatX, repeatY);
    tex.anisotropy = 4;
    if (!emissiveOnly) tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  };

  return { map: make(false), emissiveMap: make(true) };
}


// ============================================================================
// 3D — camera rig, reticle projection store, station
// ============================================================================

function CameraRig({ sector, controlsRef, groupRef, reticleStore, distScale }) {
  const trans = useRef(0);
  const { camera } = useThree();
  const camV = useMemo(
    () =>
      new THREE.Vector3(...sector.lookAt).add(
        new THREE.Vector3(...sector.cam).multiplyScalar(distScale)
      ),
    [sector, distScale]
  );
  const lookV = useMemo(() => new THREE.Vector3(...sector.lookAt), [sector]);

  useEffect(() => {
    trans.current = 1.4;
    if (controlsRef.current) controlsRef.current.enabled = false;
  }, [sector, controlsRef]);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.1);
    // presentation yaw — station turns toward the user for the active sector
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        sector.yaw ?? 0,
        4.5,
        d
      );
      groupRef.current.updateMatrixWorld();
    }
    const controls = controlsRef.current;
    if (controls) {
      if (trans.current > 0) {
        trans.current -= d;
        camera.position.x = THREE.MathUtils.damp(camera.position.x, camV.x, 4.5, d);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, camV.y, 4.5, d);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, camV.z, 4.5, d);
        controls.target.x = THREE.MathUtils.damp(controls.target.x, lookV.x, 4.5, d);
        controls.target.y = THREE.MathUtils.damp(controls.target.y, lookV.y, 4.5, d);
        controls.target.z = THREE.MathUtils.damp(controls.target.z, lookV.z, 4.5, d);
        camera.lookAt(controls.target);
        if (trans.current <= 0) controls.enabled = true;
      }
      controls.update();
    }
    // write projected reticle screen positions for the DOM overlay
    const store = reticleStore.current;
    if (store && groupRef.current) {
      const v = store.tmp;
      const w = store.size.width;
      const h = store.size.height;
      for (const s of SECTORS) {
        v.set(s.anchor[0], s.anchor[1], s.anchor[2]);
        groupRef.current.localToWorld(v);
        v.project(camera);
        const p = store.points[s.id];
        p.x = (v.x + 1) * 0.5 * w;
        p.y = (1 - v.y) * 0.5 * h;
        p.visible = v.z < 1 && v.z > -1 && v.x > -1.3 && v.x < 1.3 && v.y > -1.3 && v.y < 1.3;
      }
    }
  });
  return null;
}

function ViewportSizeTracker({ reticleStore }) {
  const { size } = useThree();
  useEffect(() => {
    if (reticleStore.current) {
      reticleStore.current.size = { width: size.width, height: size.height };
    }
  }, [size, reticleStore]);
  return null;
}

// DOM overlay for the 3D sector labels — positions are written into the store
// by CameraRig each frame; this rAF loop only moves existing elements.
function ReticleOverlay({ store, activeId, gold, onSelect }) {
  const refs = useRef({});

  useEffect(() => {
    let raf;
    const tick = () => {
      const st = store.current;
      if (st) {
        for (const s of SECTORS) {
          const el = refs.current[s.id];
          const p = st.points[s.id];
          if (!el || !p) continue;
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
          el.style.display = p.visible ? 'flex' : 'none';
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [store]);

  return (
    <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
      {SECTORS.map((s) => (
        <div
          key={s.id}
          ref={(el) => {
            if (el) refs.current[s.id] = el;
          }}
          className="absolute left-0 top-0"
          style={{ display: 'none' }}
        >
          <button
            type="button"
            onClick={() => onSelect(s.id)}
            aria-label={`Sector ${s.num} ${s.label}`}
            className="group flex items-center gap-1.5 pointer-events-auto"
          >
            <span
              className={`block size-4 rounded-full border-2 transition-colors duration-200 ${
                activeId === s.id
                  ? 'border-bat-300 bg-bat-400/60'
                  : `${gold ? 'border-bat-400/80 bg-bat-400/10 group-hover:bg-bat-400/40' : 'border-white/50 bg-white/10 group-hover:bg-white/30'} animate-pulse`
              }`}
            />
            <span className={`hidden md:block font-mono text-[10px] tracking-wider px-1.5 py-0.5 bg-black/70 ${gold ? 'text-bat-300' : 'text-gray-200'}`}>
              {s.num} {"//"} {s.label}
            </span>
          </button>
        </div>
      ))}
    </div>
  );
}

const ESCORT_SATELLITES = [
  { pos: [-4.2, -3.1, 3.2], scale: 0.85, spin: 0.3, bob: 0.22, phase: 0.0 },
  { pos: [-3.8, 0.4, -0.5], scale: 0.6, spin: -0.42, bob: 0.16, phase: 1.7 },
  { pos: [-1.9, -1.6, 0.8], scale: 0.5, spin: 0.5, bob: 0.18, phase: 3.1 },
  { pos: [1.4, 1.9, -1.2], scale: 0.55, spin: -0.36, bob: 0.2, phase: 4.4 },
  { pos: [3.5, 1.8, -2.2], scale: 0.45, spin: 0.44, bob: 0.14, phase: 5.6 },
];

// SECTOR 04 — small escort defense satellite
function DefenseSatellite({ mats, scale = 1 }) {
  return (
    <group scale={scale}>
      <mesh position={[0, 0.42, 0]}><coneGeometry args={[0.3, 0.4, 16]} /><primitive object={mats.mid} attach="material" /></mesh>
      <mesh position={[0, 0.62, 0]}><sphereGeometry args={[0.08, 8, 8]} /><primitive object={mats.blueGlow} attach="material" /></mesh>
      <mesh position={[0, 0.16, 0]}><cylinderGeometry args={[0.42, 0.42, 0.26, 20]} /><primitive object={mats.dark} attach="material" /></mesh>
      <mesh position={[0, 0.3, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.45, 0.05, 10, 28]} /><primitive object={mats.gold} attach="material" /></mesh>
      <mesh position={[0, -0.14, 0]}><cylinderGeometry args={[0.56, 0.44, 0.34, 20]} /><primitive object={mats.mid} attach="material" /></mesh>
      <mesh position={[0, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.55, 0.045, 10, 28]} /><primitive object={mats.gold} attach="material" /></mesh>
      <mesh position={[0, -0.52, 0]}><cylinderGeometry args={[0.3, 0.18, 0.32, 16]} /><primitive object={mats.dark} attach="material" /></mesh>
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2 + Math.PI / 6;
        return (
          <mesh
            key={`visor-${i}`}
            position={[Math.sin(a) * 0.43, 0.18, Math.cos(a) * 0.43]}
            rotation={[0, a, 0]}
          >
            <boxGeometry args={[0.14, 0.05, 0.05]} />
            <primitive object={mats.redGlow} attach="material" />
          </mesh>
        );
      })}
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2;
        return (
          <mesh
            key={`vent-${i}`}
            position={[Math.cos(a) * 0.18, -0.7, Math.sin(a) * 0.18]}
            rotation={[Math.PI, 0, 0]}
          >
            <coneGeometry args={[0.05, 0.16, 8]} />
            <primitive object={mats.winGlow} attach="material" />
          </mesh>
        );
      })}
    </group>
  );
}

// SECTOR 04 — large secondary orbital comms hub
function OrbitalHub({ mats }) {
  return (
    <group scale={1.15}>
      <mesh><cylinderGeometry args={[0.34, 0.34, 1.15, 14]} /><primitive object={mats.dark} attach="material" /></mesh>
      <mesh><cylinderGeometry args={[0.44, 0.44, 0.18, 14]} /><primitive object={mats.mid} attach="material" /></mesh>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <mesh key={`led-${i}`} position={[Math.cos(a) * 0.36, 0.28 - (i % 3) * 0.28, Math.sin(a) * 0.36]}>
            <sphereGeometry args={[0.035, 6, 6]} />
            <primitive object={mats.winGlow} attach="material" />
          </mesh>
        );
      })}
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2;
        return (
          <mesh
            key={`shield-${i}`}
            position={[Math.cos(a) * 0.78, 0, Math.sin(a) * 0.78]}
            rotation={[0, -a, 0]}
          >
            <cylinderGeometry args={[0.95, 0.95, 1.7, 10, 1, true, -0.55, 1.1]} />
            <primitive object={mats.midDS} attach="material" />
          </mesh>
        );
      })}
      <mesh position={[0, -0.72, 0]}><cylinderGeometry args={[0.98, 0.82, 0.22, 24]} /><primitive object={mats.hull} attach="material" /></mesh>
      <mesh position={[0, -0.6, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.95, 0.05, 10, 36]} /><primitive object={mats.winGlow} attach="material" /></mesh>
      <mesh position={[0, 0.98, 0]}><cylinderGeometry args={[0.025, 0.045, 0.8, 6]} /><primitive object={mats.dark} attach="material" /></mesh>
      <mesh position={[0, 1.42, 0]}><sphereGeometry args={[0.07, 8, 8]} /><primitive object={mats.redGlow} attach="material" /></mesh>
      <mesh position={[0, -1.0, 0]}><cylinderGeometry args={[0.03, 0.05, 0.55, 6]} /><primitive object={mats.dark} attach="material" /></mesh>
      <mesh position={[0, -1.3, 0]}><sphereGeometry args={[0.055, 8, 8]} /><primitive object={mats.blueGlow} attach="material" /></mesh>
    </group>
  );
}

// Sector 02 — upper crescent command ring with open front-right gap
function CrescentRing({ mats, ringMap, ringEmissiveMap }) {
  const arc = Math.PI * 1.62;
  const start = Math.PI * 0.44;
  const end = Math.PI * 0.44 + arc;
  const mid = Math.PI * 1.25;
  return (
    <group position={[0, 4.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
      {/* outer window band */}
      <mesh scale={[1, 1, 0.73]}>
        <torusGeometry args={[3.4, 0.65, 18, 96, arc]} />
        <meshStandardMaterial
          map={ringMap}
          color="#8a93a5"
          emissive="#ffd03b"
          emissiveMap={ringEmissiveMap}
          emissiveIntensity={1.8}
          metalness={0.5}
          roughness={0.42}
        />
      </mesh>
      {/* inner warm-white reflection band */}
      <mesh scale={[1, 1, 0.68]}>
        <torusGeometry args={[2.82, 0.3, 10, 72, arc]} />
        <primitive object={mats.innerBand} attach="material" />
      </mesh>
      {/* beveled terminal blocks + antenna spires at both prong tips */}
      {[start, end].map((a) => (
        <group key={`tip-${a}`} position={[Math.cos(a) * 3.4, Math.sin(a) * 3.4, 0]} rotation={[0, 0, a]}>
          <mesh rotation={[0, 0, 0.5]}>
            <boxGeometry args={[1.35, 0.85, 1.05]} />
            <primitive object={mats.mid} attach="material" />
          </mesh>
          <mesh position={[0.05, 0, 0.75]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.022, 0.04, 0.95, 6]} />
            <primitive object={mats.dark} attach="material" />
          </mesh>
          <mesh position={[0.05, 0, 1.25]} rotation={[Math.PI / 2, 0, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <primitive object={mats.winGlow} attach="material" />
          </mesh>
        </group>
      ))}
      {/* 3 heavy girders to the central neck (local z = station down) */}
      {[start + 0.35, mid, end - 0.35].map((a) => (
        <group key={`girder-${a}`} position={[Math.cos(a) * 1.62, Math.sin(a) * 1.62, -0.65]}>
          <mesh rotation={[0, Math.PI / 2 - Math.atan2(-Math.cos(a), Math.sin(a)), Math.atan2(-0.65, 2.75)]}>
            <boxGeometry args={[2.9, 0.3, 0.42]} />
            <primitive object={mats.dark} attach="material" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Sector 07 — dorsal comms dome + plasma neck ring
function CommsDome({ mats }) {
  return (
    <group>
      <mesh position={[0, 3.75, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.92, 0.12, 16, 48]} />
        <primitive object={mats.blueGlow} attach="material" />
      </mesh>
      <mesh position={[0, 4.05, 0]}><cylinderGeometry args={[1.05, 1.25, 0.35, 32]} /><primitive object={mats.hull} attach="material" /></mesh>
      <mesh position={[0, 4.22, 0]} scale={[1, 0.55, 1]}>
        <sphereGeometry args={[1.02, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <primitive object={mats.mid} attach="material" />
      </mesh>
      <mesh position={[0, 5.15, 0]}><cylinderGeometry args={[0.03, 0.06, 1.4, 8]} /><primitive object={mats.dark} attach="material" /></mesh>
      <mesh position={[0, 5.9, 0]}><sphereGeometry args={[0.07, 10, 10]} /><primitive object={mats.winGlow} attach="material" /></mesh>
    </group>
  );
}

// Sector 03 — tiered conical core spire, truss neck, reactor collar
function CoreSpire({ mats }) {
  const tiers = [
    { y: 3.25, rt: 1.25, rb: 1.02, h: 0.95 },
    { y: 2.42, rt: 0.98, rb: 0.82, h: 0.75 },
    { y: 1.72, rt: 0.78, rb: 0.65, h: 0.7 },
  ];
  return (
    <group>
      {tiers.map((t, i) => (
        <mesh key={`tier-${i}`} position={[0, t.y, 0]}>
          <cylinderGeometry args={[t.rt, t.rb, t.h, 24]} />
          <primitive object={mats.hull} attach="material" />
        </mesh>
      ))}
      <mesh position={[0, 2.82, 0]}><cylinderGeometry args={[1.1, 1.1, 0.16, 24]} /><primitive object={mats.dark} attach="material" /></mesh>
      <mesh position={[0, 2.05, 0]}><cylinderGeometry args={[0.9, 0.9, 0.16, 24]} /><primitive object={mats.dark} attach="material" /></mesh>
      <mesh position={[0, 3.82, 0]}><cylinderGeometry args={[1.3, 1.3, 0.18, 24]} /><primitive object={mats.dark} attach="material" /></mesh>
      {[1, -1].map((s) => (
        <mesh key={`pod-${s}`} position={[s * 1.28, 2.55, 0]}>
          <boxGeometry args={[0.45, 1.1, 0.7]} />
          <primitive object={mats.mid} attach="material" />
        </mesh>
      ))}
      {/* exposed truss neck */}
      <mesh position={[0, 1.05, 0]}><cylinderGeometry args={[0.42, 0.42, 0.62, 12]} /><primitive object={mats.dark} attach="material" /></mesh>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <mesh key={`strut-${i}`} position={[Math.cos(a) * 0.52, 1.05, Math.sin(a) * 0.52]}>
            <cylinderGeometry args={[0.045, 0.045, 0.62, 6]} />
            <primitive object={mats.mid} attach="material" />
          </mesh>
        );
      })}
      {/* octagonal reactor collar + thruster nozzles */}
      <mesh position={[0, 0.3, 0]}><cylinderGeometry args={[0.95, 0.85, 1.0, 8]} /><primitive object={mats.hull} attach="material" /></mesh>
      <mesh position={[0, 0.62, 0]}><cylinderGeometry args={[0.98, 0.98, 0.14, 8]} /><primitive object={mats.dark} attach="material" /></mesh>
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
        return (
          <group key={`nozzle-${i}`} position={[Math.cos(a) * 0.8, -0.28, Math.sin(a) * 0.8]} rotation={[Math.atan2(Math.sin(a), Math.cos(a)), 0, 0]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.11, 0.16, 0.34, 8]} />
              <primitive object={mats.dark} attach="material" />
            </mesh>
            <mesh position={[0, 0, 0.24]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.09, 0.11, 0.1, 8]} />
              <primitive object={mats.blueGlow} attach="material" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Sector 05/06 — fusion reactor shaft, radiator shields, tail fins, ventral spikes
function ReactorAssembly({ mats }) {
  return (
    <group>
      <mesh position={[0, -2.2, 0]}>
        <cylinderGeometry args={[0.55, 0.38, 3.8, 24]} />
        <primitive object={mats.dark} attach="material" />
      </mesh>
      <mesh position={[0, -2.1, 0]}>
        <cylinderGeometry args={[0.5, 0.42, 3.3, 24]} />
        <primitive object={mats.coreGlow} attach="material" />
      </mesh>
      {[-0.45, 0, 0.45].map((a) => (
        <mesh key={`slit-${a}`} position={[Math.sin(a) * 0.56, -0.65, Math.cos(a) * 0.56]} rotation={[0, a, 0]}>
          <boxGeometry args={[0.07, 0.5, 0.03]} />
          <primitive object={mats.winGlow} attach="material" />
        </mesh>
      ))}
      {/* 4 vertical radiator shields with gaps to the glowing core */}
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
        return (
          <mesh key={`shield-${i}`} position={[Math.cos(a) * 0.85, -1.85, Math.sin(a) * 0.85]} rotation={[0, -a, 0]}>
            <boxGeometry args={[0.14, 2.6, 0.65]} />
            <primitive object={mats.mid} attach="material" />
          </mesh>
        );
      })}
      <mesh position={[0, -4.02, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.42, 0.45, 16]} />
        <primitive object={mats.dark} attach="material" />
      </mesh>
      {/* swept tail fins with inset radiator panels */}
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2;
        return (
          <group key={`fin-${i}`} position={[Math.cos(a) * 0.4, -3.15, Math.sin(a) * 0.4]} rotation={[0, -a, 0]}>
            <mesh>
              <extrudeGeometry
                args={[
                  (() => {
                    const s = new THREE.Shape();
                    s.moveTo(0, 0.65);
                    s.lineTo(0.12, 0.15);
                    s.lineTo(0.95, -1.55);
                    s.lineTo(0.3, -1.35);
                    s.lineTo(-0.15, 0.1);
                    s.closePath();
                    return s;
                  })(),
                  { depth: 0.06, bevelEnabled: false },
                ]}
              />
              <primitive object={mats.dark} attach="material" />
            </mesh>
            <mesh position={[0.42, -0.78, 0.065]}>
              <boxGeometry args={[0.5, 1.1, 0.015]} />
              <primitive object={mats.solarPanel} attach="material" />
            </mesh>
            <mesh position={[0.42, -0.78, -0.005]} rotation={[0, Math.PI, 0]}>
              <boxGeometry args={[0.5, 1.1, 0.015]} />
              <primitive object={mats.solarPanel} attach="material" />
            </mesh>
          </group>
        );
      })}
      {/* ventral emitter spikes */}
      {[-0.14, 0, 0.14].map((x, i) => (
        <group key={`spike-${i}`} position={[x, 0, i === 1 ? 0.1 : -0.05]}>
          <mesh position={[0, -4.8, 0]}>
            <cylinderGeometry args={[0.008, 0.025, 1.1, 6]} />
            <primitive object={mats.dark} attach="material" />
          </mesh>
          <mesh position={[0, -5.35, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <primitive object={mats.blueGlow} attach="material" />
          </mesh>
        </group>
      ))}
      <pointLight position={[0, -5.1, 0]} color="#9fdcff" intensity={1.6} distance={6} decay={2} />
    </group>
  );
}

function WatchtowerStation({ groupRef }) {
  const satsRef = useRef([]);
  const { map, emissiveMap } = useMemo(() => createWatchtowerWindowTexture(6, 3), []);
  const ringMap = useMemo(() => {
    const t = map.clone();
    t.repeat.set(30, 4);
    t.needsUpdate = true;
    return t;
  }, [map]);
  const ringEmissiveMap = useMemo(() => {
    const t = emissiveMap.clone();
    t.repeat.set(30, 4);
    t.needsUpdate = true;
    return t;
  }, [emissiveMap]);

  const mats = useMemo(
    () => ({
      hull: new THREE.MeshStandardMaterial({ map, emissiveMap, emissive: '#ffd03b', emissiveIntensity: 1.2, metalness: 0.55, roughness: 0.42 }),
      mid: new THREE.MeshStandardMaterial({ color: '#3a4356', metalness: 0.6, roughness: 0.4 }),
      midDS: new THREE.MeshStandardMaterial({ color: '#3a4356', metalness: 0.6, roughness: 0.4, side: THREE.DoubleSide }),
      dark: new THREE.MeshStandardMaterial({ color: '#232b3a', metalness: 0.65, roughness: 0.45 }),
      gold: new THREE.MeshStandardMaterial({ color: '#c9a227', metalness: 0.7, roughness: 0.35, emissive: '#5a4a00', emissiveIntensity: 0.4 }),
      winGlow: new THREE.MeshStandardMaterial({ color: '#ffe680', emissive: '#ffd84d', emissiveIntensity: 2.2 }),
      blueGlow: new THREE.MeshStandardMaterial({ color: '#9fd0ff', emissive: '#1e6bff', emissiveIntensity: 2.5 }),
      redGlow: new THREE.MeshStandardMaterial({ color: '#ff6b6b', emissive: '#ff1e1e', emissiveIntensity: 3.0 }),
      innerBand: new THREE.MeshStandardMaterial({ color: '#fff2c8', emissive: '#ffe9a8', emissiveIntensity: 1.4 }),
      solarPanel: new THREE.MeshStandardMaterial({ color: '#10315e', metalness: 0.8, roughness: 0.25, emissive: '#0a2a5e', emissiveIntensity: 0.45 }),
      coreGlow: new THREE.MeshStandardMaterial({ color: '#241a06', emissive: '#ffb020', emissiveIntensity: 0.9 }),
    }),
    [map, emissiveMap]
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    ESCORT_SATELLITES.forEach((cfg, i) => {
      const g = satsRef.current[i];
      if (!g) return;
      g.position.set(cfg.pos[0], cfg.pos[1] + Math.sin(t * 0.6 + cfg.phase) * cfg.bob, cfg.pos[2]);
      g.rotation.y = t * cfg.spin + cfg.phase;
    });
    const hub = satsRef.current[ESCORT_SATELLITES.length];
    if (hub) {
      hub.position.set(2.6, 0.1 + Math.sin(t * 0.45 + 2.0) * 0.15, -0.5);
      hub.rotation.y = t * -0.18;
    }
  });

  const setSat = (i) => (el) => {
    satsRef.current[i] = el;
  };

  return (
    <group
      ref={(el) => {
        if (el) el.rotation.set(0.14, 0, 0.38);
        groupRef.current = el;
      }}
      position={[-1.8, 0.5, 0]}
      scale={0.82}
    >
      <CrescentRing mats={mats} ringMap={ringMap} ringEmissiveMap={ringEmissiveMap} />
      <CommsDome mats={mats} />
      <CoreSpire mats={mats} />
      <ReactorAssembly mats={mats} />
      {ESCORT_SATELLITES.map((cfg, i) => (
        <group key={`escort-${i}`} ref={setSat(i)} position={cfg.pos}>
          <DefenseSatellite mats={mats} scale={cfg.scale} />
        </group>
      ))}
      <group ref={setSat(ESCORT_SATELLITES.length)} position={[2.6, 0.1, -0.5]}>
        <OrbitalHub mats={mats} />
      </group>
    </group>
  );
}

// Aceternity three-globe Earth — hex-country landmasses, arcs & atmosphere.
// three-globe globe radius is 100 world units; scaled to fit the scene.
const GLOBE_SCALE = 0.1;

const WATCHTOWER_GLOBE_CONFIG = {
  pointSize: 2.2,
  globeColor: '#082a66',
  showAtmosphere: true,
  atmosphereColor: '#38b6ff',
  atmosphereAltitude: 0.18,
  emissive: '#082a66',
  emissiveIntensity: 0.15,
  shininess: 0.9,
  polygonColor: 'rgba(255,216,77,0.6)',
  ambientLight: '#3a5a9a',
  directionalLeftLight: '#ffffff',
  directionalTopLight: '#ffffff',
  pointLight: '#9fd0ff',
  arcTime: 1600,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 22.3193, lng: 114.1694 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

const ARC_COLORS = ['#ffd84d', '#38b6ff', '#7cc4ff'];
const WATCHTOWER_ARCS = [
  { order: 1, startLat: 28.6139, startLng: 77.209, endLat: 3.139, endLng: 101.6869, arcAlt: 0.2 },
  { order: 1, startLat: -19.885592, startLng: -43.951191, endLat: -1.303396, endLng: 36.852443, arcAlt: 0.5 },
  { order: 2, startLat: 51.5072, startLng: -0.1276, endLat: 3.139, endLng: 101.6869, arcAlt: 0.3 },
  { order: 2, startLat: -15.785493, startLng: -47.909029, endLat: 36.162809, endLng: -115.119411, arcAlt: 0.3 },
  { order: 3, startLat: -33.8688, startLng: 151.2093, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.3 },
  { order: 3, startLat: 21.3099, startLng: -157.8581, endLat: 40.7128, endLng: -74.006, arcAlt: 0.3 },
  { order: 4, startLat: -34.6037, startLng: -58.3816, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.7 },
  { order: 5, startLat: 14.5995, startLng: 120.9842, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3 },
  { order: 6, startLat: 22.3193, startLng: 114.1694, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3 },
  { order: 7, startLat: 52.52, startLng: 13.405, endLat: 34.0522, endLng: -118.2437, arcAlt: 0.2 },
  { order: 8, startLat: 1.3521, startLng: 103.8198, endLat: 40.7128, endLng: -74.006, arcAlt: 0.5 },
  { order: 9, startLat: 22.3193, startLng: 114.1694, endLat: -22.9068, endLng: -43.1729, arcAlt: 0.7 },
].map((a, i) => ({ ...a, color: ARC_COLORS[i % ARC_COLORS.length] }));

function WatchtowerGlobe() {
  const ref = useRef(null);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.02;
  });
  return (
    <group position={[4.5, -16.0, -7.0]}>
      <group ref={ref} scale={GLOBE_SCALE} rotation={[0.1, 2.4, 0]}>
        <Globe globeConfig={WATCHTOWER_GLOBE_CONFIG} data={WATCHTOWER_ARCS} />
        <HeroMarkers />
      </group>
    </group>
  );
}

// ============================================================================
// Sector panel content
// ============================================================================

function PanelHeader({ num, title, sub, accText }) {
  return (
    <div className="mb-4">
      <div className={`font-mono text-[10px] tracking-widest ${accText}`}>
        {num} {"//"} {sub}
      </div>
      <h3 className="font-orbitron text-lg sm:text-xl font-bold text-white tracking-wider mt-1">
        {title}
      </h3>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-gray-300">
      {children}
    </span>
  );
}

function CommandPanel({ accText, onSelect }) {
  return (
    <div>
      <div className={`font-mono text-[10px] tracking-widest ${accText}`}>
        IDENTIFICATION VERIFIED // WATCHTOWER ARCHIVE
      </div>
      <h3 className="font-orbitron text-2xl font-bold text-white tracking-wider mt-2">
        PRANAV MEHROTRA
      </h3>
      <div className="font-mono text-xs text-bat-300 mt-1">
        Software Engineer &amp; Full-Stack Architect
      </div>
      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mt-3 font-sans">
        Welcome to the orbital command center. Select a glowing reticle on the
        station — or use the sector dock — to fly the camera across each
        operational deck.
      </p>

      <div className="grid grid-cols-3 gap-2 mt-4">
        {[
          [String(experiences.length), 'COMPANIES'],
          [String(engineeringProjects.length + 1 + webProjects.length), 'PROJECTS'],
          [(credentials[0]?.badge ?? '').replace('CGPA: ', ''), 'CGPA'],
        ].map(([v, l]) => (
          <div key={l} className="border border-white/10 bg-white/[0.03] p-2.5 text-center">
            <div className="font-orbitron text-lg font-bold text-bat-300">{v}</div>
            <div className="font-mono text-[9px] tracking-wider text-gray-400 mt-0.5">{l}</div>
          </div>
        ))}
      </div>

      <div className="font-mono text-[10px] tracking-widest text-gray-400 mt-5 mb-2">
        QUICK SECTOR NAVIGATION // CLICK TO LOCK CAMERA
      </div>
      <div className="space-y-1.5">
        {SECTORS.filter((s) => s.id !== 'command').map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect(s.id)}
            className="w-full flex items-center justify-between gap-3 px-3 py-2 border border-white/10 bg-white/[0.02] hover:border-bat-400/50 hover:bg-bat-400/5 transition-colors text-left group"
          >
            <span>
              <span className={`font-mono text-xs font-bold ${accText}`}>
                {s.num} · {s.label}
              </span>
              <span className="block font-mono text-[10px] text-gray-400 mt-0.5">
                {s.desc}
              </span>
            </span>
            <span className="font-mono text-bat-400 group-hover:translate-x-0.5 transition-transform">→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function AboutPanel({ accText }) {
  return (
    <div>
      <PanelHeader num="02" sub="UPPER RING // ABOUT" title="Commander Profile" accText={accText} />
      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
        Results-driven engineer combining full-stack architecture with generative
        AI pipelines, self-hosted DevOps, and enterprise cybersecurity. Proven
        ability to architect scalable databases, low-latency microservices, and
        high-performance web and mobile applications from the ground up.
      </p>
      <div className="font-mono text-[10px] tracking-widest text-gray-400 mt-4 mb-2">
        FIELDS OF OPERATION
      </div>
      <div className="flex flex-wrap gap-1.5">
        {['Full-Stack Architecture', 'Generative AI & LLM Pipelines', 'Self-Hosted Infra & DevOps', 'Mobile Applications'].map((i) => (
          <Tag key={i}>{i}</Tag>
        ))}
      </div>
      <div className="font-mono text-[10px] tracking-widest text-gray-400 mt-4 mb-2">
        EDUCATION & CERTIFICATIONS
      </div>
      <div className="space-y-2">
        {credentials.map((c) => (
          <div key={c.title} className="border border-white/10 bg-white/[0.02] p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-white">{c.title}</span>
              <span className={`font-mono text-[10px] ${accText}`}>{c.badge}</span>
            </div>
            <div className="font-mono text-[10px] text-gray-400 mt-1">
              {c.institution} · {c.period}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// experiences entries carry `description`/`skills` — derive bullets for ▸ lists
function descBullets(text) {
  if (!text) return [];
  return text
    .split('. ')
    .filter(Boolean)
    .map((s) => (s.endsWith('.') ? s : `${s}.`));
}

function RndPanel({ accText }) {
  const warmo = experiences[0];
  const warmoBullets = warmo.highlights ?? descBullets(warmo.description);
  return (
    <div>
      <PanelHeader num="03" sub="CORE SPIRE // R&D LABS" title="Active Operations" accText={accText} />
      <div className="border border-bat-400/30 bg-bat-400/[0.04] p-3 mb-4">
        <div className="flex items-center justify-between gap-2">
          <span className={`font-mono text-xs font-bold ${accText}`}>{warmo.company}</span>
          <span className="font-mono text-[10px] text-gray-400 tabular-nums">{warmo.period}</span>
        </div>
        <div className="text-xs text-white font-semibold mt-0.5">{warmo.role}</div>
        <ul className="mt-2 space-y-1">
          {warmoBullets.map((h, i) => (
            <li key={i} className="text-[11px] text-gray-300 leading-relaxed">
              <span className="text-bat-400 mr-1.5">▸</span>{h}
            </li>
          ))}
        </ul>
      </div>
      <div className="font-mono text-[10px] tracking-widest text-gray-400 mb-2">
        CORE SYSTEMS IN BUILD
      </div>
      <div className="space-y-2">
        {engineeringProjects.map((p) => (
          <div key={p.title} className="border border-white/10 bg-white/[0.02] p-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-white">{p.title}</span>
              <span className="font-mono text-[9px] text-gray-400 whitespace-nowrap">{p.status}</span>
            </div>
            <div className="font-mono text-[10px] text-bat-300/90">{p.subtitle}</div>
            <p className="text-[11px] text-gray-300 leading-relaxed mt-1.5">{p.description}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {p.tags.map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
            {p.link && (
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 font-mono text-[10px] text-bat-300 underline hover:text-white">
                {p.link} ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MissionsPanel({ accText }) {
  return (
    <div>
      <PanelHeader num="04" sub="SATELLITES // MISSION LOGS" title="Service Record" accText={accText} />
      <div className="space-y-3">
        {experiences.map((e) => (
          <div key={e.company} className="border-l-2 border-bat-400/50 pl-3">
            <div className="flex flex-wrap items-center justify-between gap-1">
              <span className={`font-mono text-xs font-bold ${accText}`}>{e.company}</span>
              <span className="font-mono text-[10px] text-gray-400 tabular-nums">{e.period}</span>
            </div>
            <div className="text-xs text-white font-semibold">{e.role}</div>
            <ul className="mt-1.5 space-y-1">
              {(e.highlights ?? descBullets(e.description)).map((h, i) => (
                <li key={i} className="text-[11px] text-gray-300 leading-relaxed">
                  <span className="text-bat-400 mr-1.5">▸</span>{h}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-1 mt-1.5">
              {(e.tags ?? e.skills).map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TechPanel({ accText }) {
  return (
    <div>
      <PanelHeader num="05" sub="REACTOR // TECH MATRIX" title="Systems Arsenal" accText={accText} />
      <div className="space-y-3">
        {skillCategories.map((g) => (
          <div key={g.category} className="border border-white/10 bg-white/[0.02] p-3">
            <div className={`font-mono text-[10px] tracking-widest uppercase ${accText} mb-2`}>
              {g.category}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {g.skills.map((s) => <Tag key={s}>{s}</Tag>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsPanel({ accText }) {
  const rows = [
    { ...featuredWebProject, status: 'FEATURED' },
    ...engineeringProjects,
    ...webProjects,
  ];
  return (
    <div>
      <PanelHeader num="06" sub="JAVELIN // PROJECTS" title="Deployed Builds" accText={accText} />
      <div className="space-y-2">
        {rows.map((p) => (
          <div key={p.title} className="border border-white/10 bg-white/[0.02] p-3">
            <div className="flex flex-wrap items-center justify-between gap-1">
              <span className="text-xs font-bold text-white">{p.title}</span>
              <span className="font-mono text-[9px] text-gray-400">
                {p.status || p.category}
              </span>
            </div>
            <p className="text-[11px] text-gray-300 leading-relaxed mt-1">
              {p.description}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-bat-300 hover:text-white underline underline-offset-2">
                  LIVE ↗
                </a>
              )}
              {p.repo && (
                <a href={p.repo} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-gray-300 hover:text-white underline underline-offset-2">
                  SOURCE ↗
                </a>
              )}
              {p.link && !p.repo && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-gray-300 hover:text-white underline underline-offset-2">
                  SOURCE ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactPanel({ accText }) {
  return (
    <div>
      <PanelHeader num="07" sub="COMMS // CONTACT" title="Secure Channel" accText={accText} />
      <div className="space-y-1.5 mb-4 font-mono text-[11px]">
        <div><span className={accText}>EMAIL&nbsp;&nbsp;&nbsp;</span><a href="mailto:mehrotrapranav240@gmail.com" className="text-white hover:underline">mehrotrapranav240@gmail.com</a></div>
        <div><span className={accText}>PHONE&nbsp;&nbsp;&nbsp;</span><span className="text-white">+91 8076734237</span></div>
        <div><span className={accText}>LINKEDIN&nbsp;</span><a href="https://www.linkedin.com/in/pranav-mehrotra-879025194/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">in/pranav-mehrotra ↗</a></div>
        <div><span className={accText}>GITHUB&nbsp;&nbsp;</span><a href="https://github.com/kamikaazeyy" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">@kamikaazeyy ↗</a></div>
        <div><span className={accText}>X&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><a href="https://twitter.com/mehrotrapranav1" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">@mehrotrapranav1 ↗</a></div>
      </div>
      <ContactForm />
    </div>
  );
}

// ============================================================================
// Watchtower — canvas + HUD shell
// ============================================================================

export default function Watchtower({ onOpenTerminal, onOpenArchive }) {
  const [sectorId, setSectorId] = useState('command');
  const [autoOrbit, setAutoOrbit] = useState(true);
  const [deepSpace, setDeepSpace] = useState(true);
  const [goldHud, setGoldHud] = useState(true);
  const [hudHidden, setHudHidden] = useState(false);
  const controlsRef = useRef(null);
  const groupRef = useRef(null);
  const reticleStore = useRef(null);
  const historyRef = useRef([]);

  const selectSector = (id) => {
    setSectorId((cur) => {
      if (id !== cur) historyRef.current.push(cur);
      return id;
    });
  };
  const goBack = () => {
    setSectorId(historyRef.current.pop() ?? 'command');
  };
  const resetView = () => {
    historyRef.current = [];
    setSectorId('command');
  };
  const [isMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );
  if (!reticleStore.current) {
    const points = {};
    for (const s of SECTORS) points[s.id] = { x: 0, y: 0, visible: false };
    reticleStore.current = { points, tmp: new THREE.Vector3(), size: { width: 1, height: 1 } };
  }

  const sector = SECTORS.find((s) => s.id === sectorId);
  const accText = goldHud ? 'text-bat-300' : 'text-slate-300';
  const accFrame = goldHud ? 'bg-bat-400/30' : 'bg-white/15';

  return (
    <div className="fixed inset-0 z-40 bg-[#050608] text-gray-100 overflow-hidden font-mono">
      <Canvas
        className="absolute inset-0"
        camera={{ position: [-1.0, 0.9, 12.6], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
        onCreated={({ size }) => {
          reticleStore.current.size = { width: size.width, height: size.height };
        }}
      >
        <ViewportSizeTracker reticleStore={reticleStore} />
        <color attach="background" args={['#030508']} />
        <ambientLight color="#1a2436" intensity={1.25} />
        <directionalLight position={[-12, 10, 10]} intensity={3.2} color="#fff8e7" />
        <directionalLight position={[8, -12, 4]} intensity={1.8} color="#2b7fff" />
        <hemisphereLight args={['#2b4a8a', '#050a14', 0.65]} />
        {deepSpace && <Starfield />}
        <WatchtowerGlobe />
        <WatchtowerStation groupRef={groupRef} />
        <CameraRig
          sector={sector}
          controlsRef={controlsRef}
          groupRef={groupRef}
          reticleStore={reticleStore}
          distScale={isMobile ? 1.55 : 1}
        />
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.55}
          autoRotate={autoOrbit && sectorId === 'command'}
          autoRotateSpeed={0.3}
          minDistance={3.5}
          maxDistance={30}
        />
      </Canvas>

      {/* 3D reticle labels — DOM overlay synced to station anchors each frame */}
      {!isMobile && (
        <ReticleOverlay
          store={reticleStore}
          activeId={sectorId}
          gold={goldHud}
          onSelect={selectSector}
        />
      )}

      {!hudHidden && (
        <>
          {/* Top-left telemetry stack */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-30 space-y-2 max-w-[calc(100vw-1.5rem)]">
            <HudPanel frame={accFrame} className="w-fit max-w-full">
              <div className="px-4 py-2.5 flex items-center gap-3">
                <span className="relative flex size-8 items-center justify-center rounded-full border border-bat-400/40 bg-bat-400/10 shrink-0">
                  <span className="font-orbitron text-[10px] font-bold text-bat-300">JL</span>
                  <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-emerald-400" />
                </span>
                <div className="min-w-0">
                  <div className="font-orbitron text-[10px] sm:text-xs font-bold tracking-wider text-white flex flex-wrap items-center gap-2">
                    JL-WATCHTOWER // ORBITAL TELEMETRY ONLINE
                    <span className="px-1.5 py-0.5 text-[9px] font-mono border border-bat-400/50 text-bat-300 bg-bat-400/10 whitespace-nowrap">
                      SEC-LEVEL: OMEGA
                    </span>
                  </div>
                  <div className="hidden sm:block font-mono text-[10px] text-gray-400 tracking-wide mt-0.5">
                    CMDR: PRANAV MEHROTRA &nbsp;·&nbsp; ALT: 35,786 KM // GEO-SYNC ORBIT
                  </div>
                </div>
              </div>
            </HudPanel>

            <div className="flex flex-wrap gap-1.5">
              <HudButton active={autoOrbit} accText={accText} onClick={() => setAutoOrbit((v) => !v)}>
                {autoOrbit ? '● AUTO-ORBIT: ON' : '○ AUTO-ORBIT: OFF'}
              </HudButton>
              <HudButton active={goldHud} accText={accText} onClick={() => setGoldHud((v) => !v)}>
                ◆ GOLD HUD
              </HudButton>
              <HudButton active={deepSpace} accText={accText} onClick={() => setDeepSpace((v) => !v)}>
                ✦ DEEP SPACE
              </HudButton>
            </div>
          </div>

          {/* Top-right mode controls */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 flex flex-col items-end gap-1.5">
            <HudButton onClick={resetView} accText={accText}>↺ RESET VIEW</HudButton>
            {/* <HudButton onClick={onOpenArchive} accText={accText}>▤ ARCHIVE</HudButton> */}
            <HudButton onClick={onOpenTerminal} accText={accText}>&gt;_ TERMINAL</HudButton>
          </div>

          {/* Right readout panel */}
          <HudPanel
            frame={accFrame}
            className="absolute z-30 inset-x-3 bottom-20 max-h-[46vh] lg:inset-x-auto lg:right-5 lg:top-32 lg:bottom-24 lg:w-[520px] lg:max-h-none"
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-white/10">
                <div className="flex items-center gap-2.5 min-w-0">
                  <button
                    type="button"
                    onClick={goBack}
                    disabled={historyRef.current.length === 0}
                    aria-label="Back to previous sector"
                    className="font-mono text-[10px] tracking-wider px-1.5 py-0.5 border border-white/10 bg-white/[0.03] text-gray-400 hover:text-bat-300 hover:border-bat-400/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-gray-400 disabled:hover:border-white/10 shrink-0"
                  >
                    ◀ BACK
                  </button>
                  <span key={sector.id} className={`hud-title-glitch font-orbitron text-xs sm:text-sm font-bold tracking-wider ${accText} truncate`}>
                    WATCHTOWER // {sector.label}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setHudHidden(true)}
                  className="font-mono text-[10px] tracking-wider text-gray-400 hover:text-bat-300 transition-colors shrink-0"
                >
                  HIDE HUD
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <div key={sector.id} className="hud-sector-enter relative">
                  <div className="hud-scanline" />
                  {sector.id === 'command' && <CommandPanel accText={accText} onSelect={selectSector} />}
                  {sector.id === 'about' && <AboutPanel accText={accText} />}
                  {sector.id === 'rnd' && <RndPanel accText={accText} />}
                  {sector.id === 'missions' && <MissionsPanel accText={accText} />}
                  {sector.id === 'tech' && <TechPanel accText={accText} />}
                  {sector.id === 'projects' && <ProjectsPanel accText={accText} />}
                  {sector.id === 'contact' && <ContactPanel accText={accText} />}
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 px-4 py-2 border-t border-white/10 font-mono text-[9px] tracking-wider text-gray-500">
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  LINK ESTABLISHED // ENCRYPTED
                </span>
                <span className="hidden sm:inline">DRAG 3D SPACE TO ROTATE</span>
              </div>
            </div>
          </HudPanel>

          {/* Bottom sector dock */}
          <div className="absolute z-30 bottom-3 inset-x-0 flex justify-center px-2">
            <HudPanel frame={accFrame}>
              <div className="flex overflow-x-auto max-w-[96vw]">
                {SECTORS.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => selectSector(s.id)}
                    className={`shrink-0 px-3.5 py-2.5 font-mono text-[10px] sm:text-[11px] tracking-wider uppercase whitespace-nowrap border-r border-white/10 last:border-r-0 transition-colors ${
                      sectorId === s.id
                        ? 'bg-bat-400/15 text-bat-300'
                        : 'text-gray-300 hover:text-bat-300 hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className={sectorId === s.id ? 'text-bat-400 font-bold' : 'text-gray-500'}>
                      {s.num}
                    </span>{' '}
                    {s.dock}
                  </button>
                ))}
              </div>
            </HudPanel>
          </div>
        </>
      )}

      {hudHidden && (
        <button
          type="button"
          onClick={() => setHudHidden(false)}
          className="absolute top-4 right-4 z-30 hud-chamfer-sm px-3 py-1.5 font-mono text-[10px] tracking-wider uppercase bg-bat-400/15 text-bat-300 border border-bat-400/50 hover:bg-bat-400/25 transition-colors"
        >
          Show HUD
        </button>
      )}
    </div>
  );
}

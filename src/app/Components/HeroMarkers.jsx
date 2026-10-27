'use client';

import React, { useMemo, useState } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

// three-globe GLOBE_RADIUS — markers live inside the same scaled globe group
const GLOBE_RADIUS = 100;

function latLngToVec(lat, lng, alt = 0.018) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((90 - lng) * Math.PI) / 180;
  const r = GLOBE_RADIUS * (1 + alt);
  const s = Math.sin(phi);
  return new THREE.Vector3(r * s * Math.cos(theta), r * Math.cos(phi), r * s * Math.sin(theta));
}

// ---------------------------------------------------------------------------
// logo painters — each draws inside a 24x24 space centred on (12,12)
// ---------------------------------------------------------------------------

function circle(g, x, y, r, fill, stroke, lw) {
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  if (fill) { g.fillStyle = fill; g.fill(); }
  if (stroke) { g.strokeStyle = stroke; g.lineWidth = lw; g.stroke(); }
}

function path(g, d, fill, stroke, lw, cap = 'round') {
  const p = new Path2D(d);
  if (fill) { g.fillStyle = fill; g.fill(p); }
  if (stroke) { g.strokeStyle = stroke; g.lineWidth = lw; g.lineCap = cap; g.stroke(p); }
}

const LOGO_PAINTERS = {
  superman(g) {
    path(g, 'M3.4 6.6 H20.6 L18.9 12.2 L12 20.8 L5.1 12.2 Z', '#d21f26');
    path(g, 'M6.1 8.6 H17.9 L16.9 12 L12 18.4 L7.1 12 Z', '#ffd23e');
    path(
      g,
      'M15 10.2 C15 9.1 13.6 8.5 12 8.5 C10.3 8.5 9 9.4 9 10.6 C9 13.2 15 12.4 15 14.8 C15 16.1 13.7 16.9 12 16.9 C10.4 16.9 9.1 16.1 8.7 14.9',
      null, '#d21f26', 1.5
    );
  },
  batman(g) {
    g.beginPath();
    g.ellipse(12, 12, 10.2, 6.6, 0, 0, Math.PI * 2);
    g.fillStyle = '#ffdf00';
    g.fill();
    path(
      g,
      'M12 6.6 L13.2 5.2 L13.8 7.4 C15.9 6.8 18 6.7 20 7.3 C19 8.7 18.6 10.2 18.8 11.6 C17.3 10.6 15.6 10.4 14.1 10.9 C13.4 13.1 12.8 14.4 12 15.9 C11.2 14.4 10.6 13.1 9.9 10.9 C8.4 10.4 6.7 10.6 5.2 11.6 C5.4 10.2 5 8.7 4 7.3 C6 6.7 8.1 6.8 10.2 7.4 L10.8 5.2 Z',
      '#0a0a0a'
    );
  },
  wonderwoman(g) {
    path(g, 'M2.6 5.6 H21.4 L20 7.4 H4 Z', '#ffcf3f');
    path(g, 'M5.2 8.2 H18.8 L17.7 9.6 H6.3 Z', '#ffcf3f');
    path(
      g,
      'M6.4 10.4 L9 17.8 L12 12.6 L15 17.8 L17.6 10.4 H15.2 L14 14.4 L12 11.6 L10 14.4 L8.8 10.4 Z',
      '#ffcf3f'
    );
    path(g, 'M12 3.4 L12.6 4.6 L13.9 4.7 L12.9 5.6 L13.1 6.9 L12 6.3 L10.9 6.9 L11.1 5.6 L10.1 4.7 L11.4 4.6 Z', '#ffcf3f');
  },
  aquaman(g) {
    path(g, 'M12 3 L13.6 5.8 L12.6 5.8 L12.6 20.5 L11.4 20.5 L11.4 5.8 L10.4 5.8 Z', '#ff9f2c');
    path(g, 'M7 5.6 C7 10 8.2 12.6 10.4 14', null, '#ff9f2c', 1.5);
    path(g, 'M17 5.6 C17 10 15.8 12.6 13.6 14', null, '#ff9f2c', 1.5);
    path(g, 'M7 3.4 L8.5 6.2 L5.6 6.4 Z', '#ff9f2c');
    path(g, 'M17 3.4 L18.4 6.4 L15.5 6.2 Z', '#ff9f2c');
    path(g, 'M9.7 15.2 H14.3', null, '#ff9f2c', 1.4);
  },
  greenlantern(g) {
    circle(g, 12, 12, 4.4, null, '#35e36d', 2);
    path(g, 'M5.6 7.6 H18.4', null, '#35e36d', 2, 'square');
    path(g, 'M5.6 16.4 H18.4', null, '#35e36d', 2, 'square');
    circle(g, 12, 12, 1.1, '#35e36d');
  },
  martian(g) {
    circle(g, 12, 12, 8.4, '#1a6b45');
    path(g, 'M6.2 6 L17.8 17.6 M17.8 6 L6.2 17.6', null, '#c62828', 2.6, 'square');
    circle(g, 12, 12, 1.7, '#ffd34d');
  },
  flash(g) {
    circle(g, 12, 12, 8.2, '#d32f2f');
    circle(g, 12, 12, 5.6, '#ffffff');
    path(g, 'M13.4 5.8 L8.2 13.2 L11.3 13.2 L10.2 18.2 L15.8 10.6 L12.7 10.6 Z', '#ffc400');
  },
};

// ---------------------------------------------------------------------------
// League deployment — reshuffled on every page load
// ---------------------------------------------------------------------------

const HEROES = [
  {
    id: 'superman', name: 'SUPERMAN', logo: 'superman', color: '#5aa0ff',
    missions: ['ROUTINE PATROL', 'SOLAR CHARGE', 'SEISMIC RESPONSE', 'LOIS LANE RESCUE'],
  },
  {
    id: 'batman', name: 'BATMAN', logo: 'batman', color: '#ffdf00',
    missions: ['OFF-GRID OP', 'STAKEOUT', 'LEAGUE OF SHADOWS LEAD', 'STREET SWEEP'],
  },
  {
    id: 'wonderwoman', name: 'WONDER WOMAN', logo: 'wonderwoman', color: '#ffcf3f',
    missions: ['ARTIFACT RECOVERY', 'AMBASSADOR DUTY', 'ARES SIGHTING', 'MYTHIC THREAT'],
  },
  {
    id: 'aquaman', name: 'AQUAMAN', logo: 'aquaman', color: '#ff9f2c',
    tags: ['sea', 'coast'],
    missions: ['DEEP-SEA RECON', 'TRENCH PATROL', 'TIDAL ANOMALY', 'POACHER INTERDICTION'],
  },
  {
    id: 'flash', name: 'THE FLASH', logo: 'flash', color: '#ffc400',
    missions: ['SPEEDFORCE ANOMALY', 'TIME REMNANT CHASE', 'ROGUES ACTIVITY', 'EVERYWHERE AT ONCE'],
  },
  {
    id: 'greenlantern', name: 'GREEN LANTERN', logo: 'greenlantern', color: '#35e36d',
    missions: ['SECTOR 2814 SWEEP', 'LANTERN CORPS SUMMONS', 'RED LANTERN INCURSION', 'ASTEROID INTERCEPT'],
  },
  {
    id: 'martian', name: 'MARTIAN MANHUNTER', logo: 'martian', color: '#4ddb8a',
    missions: ['TELEPATHIC SWEEP', 'DEEP COVER', 'WHITE MARTIAN TRACE', 'SHAPE-SHIFTER HUNT'],
  },
];

// possible theatre of operations — tags let water-bound heroes stay wet
const DEPLOYMENT_ZONES = [
  { loc: 'METROPOLIS · USA', lat: 40.71, lng: -74.01, tags: ['coast'] },
  { loc: 'GOTHAM DOCKS · USA', lat: 40.6, lng: -74.2, tags: ['coast'] },
  { loc: 'CENTRAL CITY · USA', lat: 39.1, lng: -94.58, tags: [] },
  { loc: 'COAST CITY · USA', lat: 34.05, lng: -118.24, tags: ['coast'] },
  { loc: 'STAR CITY · USA', lat: 47.61, lng: -122.33, tags: ['coast'] },
  { loc: 'LONDON · UK', lat: 51.51, lng: -0.13, tags: ['coast'] },
  { loc: 'PARIS · FRANCE', lat: 48.86, lng: 2.35, tags: [] },
  { loc: 'CAIRO · EGYPT', lat: 30.04, lng: 31.24, tags: [] },
  { loc: 'NAIROBI · KENYA', lat: -1.29, lng: 36.82, tags: [] },
  { loc: 'RIO · BRAZIL', lat: -22.91, lng: -43.17, tags: ['coast'] },
  { loc: 'BUENOS AIRES · ARG', lat: -34.6, lng: -58.38, tags: ['coast'] },
  { loc: 'TOKYO · JAPAN', lat: 35.68, lng: 139.69, tags: ['coast'] },
  { loc: 'HONG KONG', lat: 22.32, lng: 114.17, tags: ['coast'] },
  { loc: 'MUMBAI · INDIA', lat: 19.08, lng: 72.88, tags: ['coast'] },
  { loc: 'SYDNEY · AUS', lat: -33.87, lng: 151.21, tags: ['coast'] },
  { loc: 'REYKJAVIK · ICELAND', lat: 64.15, lng: -21.94, tags: ['coast'] },
  { loc: 'MOSCOW · RUSSIA', lat: 55.75, lng: 37.62, tags: [] },
  { loc: 'SAHARA · ALGERIA', lat: 23.4, lng: 8.6, tags: [] },
  { loc: 'SIBERIA · RUSSIA', lat: 62.0, lng: 100.0, tags: [] },
  { loc: 'ATLANTIS · MID-ATLANTIC', lat: 28.0, lng: -42.0, tags: ['sea'] },
  { loc: 'MARIANA TRENCH · PACIFIC', lat: 11.3, lng: 142.2, tags: ['sea'] },
  { loc: 'INDIAN OCEAN', lat: -20.0, lng: 80.0, tags: ['sea'] },
  { loc: 'AEGEAN SEA', lat: 38.0, lng: 25.0, tags: ['sea'] },
  { loc: 'RAPA NUI · S. PACIFIC', lat: -27.11, lng: -109.35, tags: ['sea', 'coast'] },
  { loc: 'ANTARCTIC WATCH', lat: -75.0, lng: 10.0, tags: [] },
];

const MIN_SEPARATION_DEG = 15;

const rad = (d) => (d * Math.PI) / 180;
function sepDeg(a, b) {
  const s =
    Math.sin(rad(a.lat)) * Math.sin(rad(b.lat)) +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.cos(rad(b.lng - a.lng));
  return (Math.acos(Math.min(1, Math.max(-1, s))) * 180) / Math.PI;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Assign each leaguer a fresh theatre of operations — spread out, no repeats
function buildDeployment() {
  const zones = shuffle(DEPLOYMENT_ZONES);
  const taken = [];
  const terrainOk = (hero, z) => !hero.tags || hero.tags.some((t) => z.tags.includes(t));
  const takeZone = (hero) => {
    const free = zones.filter((z) => !taken.includes(z) && terrainOk(hero, z));
    const zone =
      free.find((z) => taken.every((p) => sepDeg(p, z) >= MIN_SEPARATION_DEG)) ||
      free[0] ||
      zones.find((z) => !taken.includes(z));
    taken.push(zone);
    return zone;
  };
  const deployed = {};
  [...HEROES]
    .sort((a, b) => (b.tags ? 1 : 0) - (a.tags ? 1 : 0))
    .forEach((h) => {
      const z = takeZone(h);
      deployed[h.id] = { ...h, loc: z.loc, lat: z.lat, lng: z.lng, mission: pick(h.missions) };
    });
  return HEROES.map((h) => deployed[h.id]);
}

// ---------------------------------------------------------------------------
// badge texture — halo + dark disc + hero insignia, drawn once per hero
// ---------------------------------------------------------------------------

function hexToRgba(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

function makeHeroTexture(hero) {
  const S = 128;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const g = c.getContext('2d');

  const halo = g.createRadialGradient(S / 2, S / 2, 10, S / 2, S / 2, S / 2 - 2);
  halo.addColorStop(0, hexToRgba(hero.color, 0.35));
  halo.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = halo;
  g.fillRect(0, 0, S, S);

  g.save();
  const k = (S / 24) * 0.86;
  g.translate(S / 2, S / 2);
  g.scale(k, k);
  g.translate(-12, -12);
  g.lineJoin = 'round';
  g.lineCap = 'round';

  // ragged disc edge — stencil-bombed, not a clean sticker
  g.beginPath();
  for (let i = 0; i <= 40; i++) {
    const a = (i / 40) * Math.PI * 2;
    const r = 11.3 + (Math.random() - 0.5) * 0.7;
    i === 0 ? g.moveTo(12 + Math.cos(a) * r, 12 + Math.sin(a) * r)
            : g.lineTo(12 + Math.cos(a) * r, 12 + Math.sin(a) * r);
  }
  g.closePath();
  g.fillStyle = 'rgba(8,12,24,0.8)';
  g.fill();
  g.strokeStyle = hero.color;
  g.lineWidth = 0.55;
  g.stroke();

  LOGO_PAINTERS[hero.logo](g);

  // weathering pass — chipped paint, scratches, grime streaks
  g.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 300; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * 11.5;
    g.globalAlpha = 0.25 + Math.random() * 0.55;
    g.beginPath();
    g.arc(12 + Math.cos(a) * r, 12 + Math.sin(a) * r, 0.1 + Math.random() * 0.65, 0, Math.PI * 2);
    g.fill();
  }
  for (let i = 0; i < 14; i++) {
    const x = 12 + (Math.random() - 0.5) * 22;
    const y = 12 + (Math.random() - 0.5) * 22;
    const a = Math.random() * Math.PI;
    const len = 3 + Math.random() * 8;
    g.globalAlpha = 0.2 + Math.random() * 0.4;
    g.beginPath();
    g.moveTo(x - Math.cos(a) * len, y - Math.sin(a) * len);
    g.lineTo(x + Math.cos(a) * len, y + Math.sin(a) * len);
    g.lineWidth = 0.15 + Math.random() * 0.35;
    g.strokeStyle = '#000';
    g.stroke();
  }
  g.globalAlpha = 1;
  // dirt streak dragged across the insignia
  g.globalCompositeOperation = 'source-atop';
  const streak = g.createLinearGradient(0, 0, 24, 24);
  streak.addColorStop(0, 'rgba(20,16,8,0)');
  streak.addColorStop(0.45, `rgba(20,16,8,${0.12 + Math.random() * 0.12})`);
  streak.addColorStop(0.55, `rgba(20,16,8,${0.12 + Math.random() * 0.12})`);
  streak.addColorStop(1, 'rgba(20,16,8,0)');
  g.fillStyle = streak;
  g.fillRect(0, 0, 24, 24);
  g.globalCompositeOperation = 'source-over';
  g.restore();

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

// ---------------------------------------------------------------------------
// marker — weathered insignia decal lying flat on the surface + hover readout
// ---------------------------------------------------------------------------

const DECAL_SIZE = 17;

function HeroMarker({ hero }) {
  const [hovered, setHovered] = useState(false);
  const pos = useMemo(() => latLngToVec(hero.lat, hero.lng), [hero]);
  const labelPos = useMemo(() => pos.clone().multiplyScalar(1.16), [pos]);
  const texture = useMemo(() => makeHeroTexture(hero), [hero]);

  // orient the plane's +Z along the surface normal, then give it a random
  // crooked roll — like a stencil slapped on in a hurry
  const quat = useMemo(() => {
    const normal = pos.clone().normalize();
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    const roll = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.random() * Math.PI * 2);
    return q.multiply(roll);
  }, [pos]);

  const size = useMemo(() => DECAL_SIZE * (0.85 + Math.random() * 0.4), []);

  return (
    <group>
      <mesh
        position={pos}
        quaternion={quat}
        scale={hovered ? size * 1.15 : size}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={texture} transparent depthWrite={false} />
      </mesh>
      {hovered && (
        <Html
          position={labelPos}
          center
          zIndexRange={[25, 0]}
          style={{ pointerEvents: 'none' }}
        >
          <div
            className="hud-chamfer-sm font-mono whitespace-nowrap px-2.5 py-1.5 text-left"
            style={{
              background: 'rgba(10,14,24,0.92)',
              border: `1px solid ${hero.color}66`,
              boxShadow: `0 0 18px ${hero.color}44`,
            }}
          >
            <div className="text-[10px] tracking-widest" style={{ color: hero.color }}>
              {hero.name}
            </div>
            <div className="text-[9px] tracking-wider text-gray-300 mt-0.5">
              {hero.loc}
            </div>
            <div className="text-[8px] tracking-wider text-gray-500">
              STATUS: <span style={{ color: hero.color }}>{hero.mission}</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

export default function HeroMarkers() {
  const deployment = useMemo(() => buildDeployment(), []);
  return (
    <group>
      {deployment.map((h) => (
        <HeroMarker key={h.id} hero={h} />
      ))}
    </group>
  );
}

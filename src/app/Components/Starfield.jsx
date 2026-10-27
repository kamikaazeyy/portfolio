'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

export function Starfield() {
  const geometry = useMemo(() => {
    const count = 3500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const palette = [new THREE.Color('#ffffff'), new THREE.Color('#cce6ff'), new THREE.Color('#fff4cc')];
    const weights = [0.55, 0.3, 0.15];
    const v = new THREE.Vector3();
    for (let i = 0; i < count; i++) {
      v.setFromSphericalCoords(70 + Math.random() * 90, Math.acos(1 - Math.random() * 2), Math.random() * Math.PI * 2);
      positions[i * 3] = v.x;
      positions[i * 3 + 1] = v.y;
      positions[i * 3 + 2] = v.z;
      const r = Math.random();
      const c = palette[r < weights[0] ? 0 : r < weights[0] + weights[1] ? 1 : 2];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      sizes[i] = 0.6 + Math.random() * 1.6;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        vertexShader: /* glsl */ `
          attribute float aSize;
          attribute vec3 aColor;
          varying vec3 vColor;
          void main() {
            vColor = aColor;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = aSize * (160.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: /* glsl */ `
          varying vec3 vColor;
          void main() {
            float d = distance(gl_PointCoord, vec2(0.5));
            if (d > 0.5) discard;
            float a = smoothstep(0.5, 0.08, d);
            gl_FragColor = vec4(vColor, a);
          }
        `,
      }),
    []
  );

  return <points geometry={geometry} material={material} />;
}

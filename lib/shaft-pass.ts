import * as THREE from 'three';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { ROOM } from './desk-scene';

/**
 * Depth-clipped volumetric light shafts, adapted from Meng To's MIT
 * "light-a-threejs-workspace" skill. Each pixel marches from the eye to the
 * first opaque surface (from the scene depth), and every sample is traced
 * back along the sun to the window plane: it only scatters light when that
 * point falls inside the glass, outside the mullion, through the open part of
 * the blind and not under the desk. The pass runs in linear HDR before tone
 * mapping, so presets and exposure act on it like on the rest of the room.
 */
export function createShaftPass(depthTexture: THREE.Texture) {
  const { x0, x1, y0, y1, mullion } = ROOM.window;
  const f = (value: number) => value.toFixed(3);
  const pass = new ShaderPass({
    name: 'StudioShafts',
    uniforms: {
      tDiffuse: { value: null },
      tDepth: { value: null },
      invProjection: { value: new THREE.Matrix4() },
      cameraWorld: { value: new THREE.Matrix4() },
      travel: { value: new THREE.Vector3(0.5, -0.5, 0.7) },
      shaftColor: { value: new THREE.Color('#fff2dc') },
      density: { value: 0 },
      opening: { value: 0.5 },
      time: { value: 0 },
    },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `
      varying vec2 vUv;
      uniform sampler2D tDiffuse, tDepth;
      uniform mat4 invProjection, cameraWorld;
      uniform vec3 travel, shaftColor;
      uniform float density, opening, time;
      const int STEPS = 36;
      // Integral of the clear part of a repeated slat cell, so a sample that
      // covers several slats averages them instead of aliasing.
      float clearIntegral(float y, float spacing, float clearHalf) {
        float q = y / spacing, fq = fract(q);
        return spacing * (floor(q) * 2.0 * clearHalf + min(fq, clearHalf) + max(0.0, fq - (1.0 - clearHalf)));
      }
      void main() {
        vec4 base = texture2D(tDiffuse, vUv);
        if (density <= 0.0001) { gl_FragColor = base; return; }
        float depth = texture2D(tDepth, vUv).r;
        vec4 view = invProjection * vec4(vUv * 2.0 - 1.0, depth * 2.0 - 1.0, 1.0);
        view /= view.w;
        vec3 eye = cameraWorld[3].xyz;
        vec3 toPixel = (cameraWorld * vec4(view.xyz, 1.0)).xyz - eye;
        float total = min(length(toPixel), 180.0);
        vec3 dir = normalize(toPixel);
        float ds = total / float(STEPS);
        float jitter = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
        float spacing = ${f(ROOM.slatSpacing)};
        float clearHalf = 0.5 * opening;
        float light = 0.0;
        for (int i = 0; i < STEPS; i++) {
          vec3 p = eye + dir * (float(i) + jitter) * ds;
          if (p.z < ${f(ROOM.backWall)} || p.y < ${f(ROOM.floor)} || p.y > ${f(ROOM.ceiling)}) continue;
          float t = (p.z - (${f(ROOM.backWall)})) / travel.z;
          vec3 pane = p - travel * t;
          // smoothstep needs edge0 < edge1; reversed edges are undefined in GLSL.
          float window = smoothstep(${f(x0)}, ${f(x0 + 1.5)}, pane.x) * (1.0 - smoothstep(${f(x1 - 1.5)}, ${f(x1)}, pane.x))
            * smoothstep(${f(y0)}, ${f(y0 + 1.0)}, pane.y) * (1.0 - smoothstep(${f(y1 - 1.0)}, ${f(y1)}, pane.y))
            * smoothstep(0.45, 0.9, abs(pane.x - (${f(mullion)})));
          if (window <= 0.0) continue;
          // The open lower panes scatter less than the slatted blind, which
          // keeps the beams readable as beams rather than one bright slab.
          float blind = 0.4;
          if (pane.y > ${f(ROOM.blindBottom)}) {
            float footprint = max(0.02, 0.5 * ds * abs(dir.y - dir.z * travel.y / travel.z));
            float y = ${f(y1)} - pane.y;
            blind = clamp((clearIntegral(y + footprint, spacing, clearHalf) - clearIntegral(y - footprint, spacing, clearHalf)) / (2.0 * footprint), 0.0, 1.0);
          }
          // The desk top shades everything beneath it.
          float under = 1.0;
          if (p.y < ${f(ROOM.deskTop - 1.9)}) {
            vec3 q = p - travel * ((p.y - (${f(ROOM.deskTop - 1.9)})) / travel.y);
            under = 1.0 - step(${f(ROOM.desk.x0)}, q.x) * step(q.x, ${f(ROOM.desk.x1)}) * step(${f(ROOM.desk.z0)}, q.z) * step(q.z, ${f(ROOM.desk.z1)});
          }
          // Gaps in the canopy outside break the aperture into a few distinct
          // beams instead of one even slab of haze.
          float u = pane.x + pane.y * 0.45;
          float gaps = pow(max(0.0, sin(u * 0.42 + 0.9) * 0.62 + sin(u * 0.93 + 2.1) * 0.38), 2.6);
          float dust = 0.78 + 0.22 * sin(p.x * 0.31 + time * 0.21) * sin(p.y * 0.23 - time * 0.17) * sin(p.z * 0.27 + 1.7);
          float fade = smoothstep(0.0, 5.0, t) * exp(-t / 70.0);
          light += window * blind * under * fade * dust * (0.04 + gaps) * ds;
        }
        gl_FragColor = vec4(base.rgb + shaftColor * light * density * 0.055, base.a);
      }`,
  });
  // ShaderPass clones its uniforms, which would copy the depth texture rather
  // than share the one GTAO renders into each frame.
  pass.uniforms.tDepth.value = depthTexture;
  return pass;
}

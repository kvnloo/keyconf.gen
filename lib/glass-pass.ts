import * as THREE from 'three';
import { WAVE_SECONDS, type GlassEntry } from './glass-registry';

/**
 * Liquid glass drawn by the keyboard renderer itself, adapted from Meng To's
 * MIT "refract-liquid-glass" and "shade-glass-button-press" skills.
 *
 * After the room is rendered, the frame is copied into a texture. Each
 * registered DOM element then gets a quad over its own rectangle whose
 * shader treats the element as a rounded-box lens: an analytic edge normal
 * from the SDF bends the copied frame through refract() with IOR 1.46 at the
 * shoulder, the rim borrows nearby colour, and a press indents the lens at the
 * contact point; release sends an elliptic crest with a brief RGB split.
 * Text stays DOM above the canvas, so it is never resampled.
 */
export function createGlassPass(renderer: THREE.WebGLRenderer) {
  let frame: THREE.FramebufferTexture | null = null;
  const size = new THREE.Vector2();
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const uniforms = {
    frame: { value: null as THREE.Texture | null },
    viewport: { value: new THREE.Vector2(1, 1) },
    rect: { value: new THREE.Vector4() },
    center: { value: new THREE.Vector2() },
    halfExtent: { value: new THREE.Vector2(1, 1) },
    radius: { value: 20 },
    contact: { value: new THREE.Vector2() },
    hold: { value: 0 },
    age: { value: -1 },
    selected: { value: 0 },
    dpr: { value: 1 },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    depthTest: false,
    depthWrite: false,
    transparent: false,
    vertexShader: `
      uniform vec4 rect; uniform vec2 viewport;
      void main() {
        // Flip v so the quad keeps its winding after the y-down mapping.
        vec2 p = mix(rect.xy, rect.zw, vec2(position.x * 0.5 + 0.5, 0.5 - position.y * 0.5));
        gl_Position = vec4(p.x / viewport.x * 2.0 - 1.0, 1.0 - p.y / viewport.y * 2.0, 0.0, 1.0);
      }`,
    fragmentShader: `
      uniform sampler2D frame;
      uniform vec2 viewport, center, halfExtent, contact;
      uniform vec4 rect;
      uniform float radius, hold, age, selected, dpr;
      float sd(vec2 p, float r) { vec2 q = abs(p) - halfExtent + r; return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r; }
      vec3 room(vec2 px) { return texture2D(frame, clamp(vec2(px.x / viewport.x, 1.0 - px.y / viewport.y), 0.001, 0.999)).rgb; }
      void main() {
        vec2 px = vec2(gl_FragCoord.x, viewport.y * dpr - gl_FragCoord.y) / dpr;
        vec2 p = px - center;
        float r = min(radius, min(halfExtent.x, halfExtent.y));
        float d = sd(p, r);
        float aa = max(fwidth(d), 0.5);
        float mask = 1.0 - smoothstep(-aa, aa, d);
        if (mask <= 0.0) discard;
        vec2 normal = normalize(vec2(sd(p + vec2(0.5, 0.0), r) - sd(p - vec2(0.5, 0.0), r), sd(p + vec2(0.0, 0.5), r) - sd(p - vec2(0.0, 0.5), r)) + vec2(0.00001));
        float depth = max(0.0, -d);
        float lip = 1.0 - smoothstep(0.0, r * 0.68, depth);
        float tilt = 0.91 * lip - 0.13 * exp(-pow((depth / r - 0.56) / 0.19, 2.0));
        vec3 N = vec3(normal * tilt, sqrt(max(0.0, 1.0 - tilt * tilt)));
        vec3 ray = refract(vec3(0.0, 0.0, -1.0), N, 1.0 / 1.46);
        vec2 delta = px - contact;
        vec2 dir = delta / max(length(delta), 0.01);
        float reach = length((halfExtent + abs(contact - center)) * vec2(1.0, 1.22));
        float t = clamp(age / ${WAVE_SECONDS.toFixed(2)}, 0.0, 1.0);
        float toWave = length(delta * vec2(1.0, 1.22)) - (1.0 - pow(1.0 - t, 1.65)) * (reach + 42.0);
        float crest = age < 0.0 ? 0.0 : exp(-pow(toWave / 16.0, 2.0)) * (1.0 - smoothstep(0.7, 1.0, t));
        float wake = age < 0.0 ? 0.0 : exp(-pow((toWave + 22.0) / 28.0, 2.0)) * (1.0 - t);
        vec2 bent = px + ray.xy / max(0.15, -ray.z) * r * 1.1
          - delta * 0.19 * hold * exp(-dot(delta, delta) / 3400.0)
          + dir * (crest * 16.0 - wake * 7.0);
        vec2 split = dir * crest * 4.0;
        vec3 glass = vec3(room(bent + split).r, room(bent).g, room(bent - split).b);
        // Smoke the body so white type keeps its contrast over bright rooms.
        // Matches GLASS.lensBody / lensLift in lib/theme.ts, which the contrast test checks.
        float body = 0.34 - 0.03 * selected;
        glass = glass * body + vec3(0.035, 0.043, 0.043);
        glass += room(px + normal * r * 2.0) * (lip * 0.2 + crest * 0.13);
        glass += vec3(1.0, 0.97, 0.9) * (0.5 * exp(-depth / 1.1) + 0.12 * pow(lip, 3.0)) * (0.6 + 0.4 * dot(normal, normalize(vec2(-0.6, -1.0))));
        // Selected tiles carry a pearl sheen that drifts across the lens.
        vec3 pearl = 0.55 + 0.45 * cos(6.2831 * (vec3(0.0, 0.33, 0.67) + (p.x - p.y) / (halfExtent.x * 3.2) + lip * 0.35));
        glass = mix(glass, glass * 0.75 + pearl * 0.22, selected * (0.18 + 0.5 * lip));
        gl_FragColor = vec4(mix(room(px), glass, mask), 1.0);
      }`,
  });
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
  quad.frustumCulled = false;
  scene.add(quad);
  return {
    /**
     * Draw every entry that overlaps the canvas. Returns true while any lens
     * is still animating (press easing or a travelling wave).
     */
    draw(
      canvas: HTMLCanvasElement,
      entries: Iterable<GlassEntry>,
      delta: number,
      reduced: boolean,
    ) {
      const bounds = canvas.getBoundingClientRect();
      const visible: Array<[GlassEntry, DOMRect]> = [];
      for (const entry of entries) {
        const box = entry.element.getBoundingClientRect();
        if (
          box.width < 2 ||
          box.right < bounds.left ||
          box.left > bounds.right ||
          box.bottom < bounds.top ||
          box.top > bounds.bottom ||
          entry.element.closest('[hidden]')
        )
          continue;
        visible.push([entry, box]);
      }
      let animating = false;
      if (!visible.length) return { animating: false, count: 0 };
      renderer.getDrawingBufferSize(size);
      if (
        !frame ||
        frame.image.width !== size.x ||
        frame.image.height !== size.y
      ) {
        frame?.dispose();
        frame = new THREE.FramebufferTexture(size.x, size.y);
        frame.minFilter = frame.magFilter = THREE.LinearFilter;
      }
      renderer.setRenderTarget(null);
      renderer.copyFramebufferToTexture(frame);
      uniforms.dpr.value = size.x / Math.max(1, bounds.width);
      uniforms.frame.value = frame;
      uniforms.viewport.value.set(bounds.width, bounds.height);
      const autoClear = renderer.autoClear;
      renderer.autoClear = false;
      const now = performance.now();
      for (const [entry, box] of visible) {
        const left = box.left - bounds.left,
          top = box.top - bounds.top;
        entry.hold = reduced
          ? entry.holdTarget
          : THREE.MathUtils.damp(entry.hold, entry.holdTarget, 23, delta);
        if (Math.abs(entry.hold - entry.holdTarget) > 0.002) animating = true;
        const age = (now - entry.releasedAt) / 1000;
        const wave = !reduced && age >= 0 && age < 1;
        if (wave) animating = true;
        uniforms.rect.value.set(
          left - 2,
          top - 2,
          left + box.width + 2,
          top + box.height + 2,
        );
        uniforms.center.value.set(left + box.width / 2, top + box.height / 2);
        uniforms.halfExtent.value.set(box.width / 2, box.height / 2);
        uniforms.radius.value = entry.radius;
        uniforms.contact.value.set(
          left + box.width * entry.contact[0],
          top + box.height * entry.contact[1],
        );
        uniforms.hold.value = entry.hold;
        uniforms.age.value = wave ? age : -1;
        uniforms.selected.value = entry.selected;
        renderer.render(scene, camera);
      }
      renderer.autoClear = autoClear;
      return { animating, count: visible.length };
    },
    dispose() {
      frame?.dispose();
      quad.geometry.dispose();
      material.dispose();
    },
  };
}

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import {
  assemblyGrade,
  assertCadDerived,
  cadDisplayForKeyboard,
  cadDisplayRequests,
  cadRevisionById,
  canDisplayCadPart,
  canHostScene,
  canPromote,
  geometryGrade,
  isCadTwin,
  requiredEnvelope,
  sceneLabel,
  sceneUnitsFromMm,
  UNIT_MM,
} from '../lib/cad-twin.ts';
import { featuredBuilds } from '../lib/featured-builds.ts';

const revisions = JSON.parse(
  readFileSync(
    new URL('../docs/reference-assets/cad-revisions.json', import.meta.url),
  ),
);
const premium = JSON.parse(
  readFileSync(new URL('../data/premium-keyboards.json', import.meta.url)),
);
const byId = Object.fromEntries(
  revisions.revisions.map((revision) => [revision.id, revision]),
);
const listedScene = {
  glb: 'public/models/cad/keychron-aluminum-knob.glb',
  sha256: 'a'.repeat(64),
};
const emptyPlan = { revisionId: null, requests: [], twin: false };
const knobPart = (overrides) => ({
  role: 'control_dial',
  grade: 'cad-derived',
  source: 'https://example.test/knob.step',
  license: 'Manufacturer file licence',
  sha256: 'b'.repeat(64),
  scene: listedScene,
  ...overrides,
});

test('a CAD twin requires CAD or measured case, plate, and PCB', () => {
  assert.equal(assemblyGrade(byId['am-hatsu'].parts), 'illustrative');
  assert.equal(assemblyGrade(byId['cyberboard-r2'].parts), 'illustrative');
  assert.equal(
    assemblyGrade(byId['q1-max-ansi-encoder'].parts),
    'illustrative',
  );
  assert.equal(isCadTwin(assemblyGrade(byId['am-hatsu'].parts)), false);
  assert.equal(
    isCadTwin(assemblyGrade(byId['q1-max-ansi-encoder'].parts)),
    false,
  );
  assert.equal(
    isCadTwin(
      assemblyGrade([
        { role: 'case_bottom', grade: 'cad-derived', source: 's' },
        { role: 'plate', grade: 'cad-derived', source: 's' },
        { role: 'pcb', grade: 'measured', source: 's' },
      ]),
    ),
    true,
  );
});

test('photos cannot promote geometry, and unmodeled boards cannot host 3D', () => {
  assert.equal(canPromote('unmodeled', 'illustrative', 'photo'), false);
  assert.equal(canPromote('unmodeled', 'cad-derived', 'photo'), false);
  assert.equal(canPromote('unmodeled', 'layout-verified', 'layout'), true);
  assert.equal(canPromote('layout-verified', 'cad-derived', 'cad'), true);
  assert.equal(canHostScene('unmodeled'), false);
  assert.equal(canHostScene('illustrative'), true);
  assert.equal(sceneLabel('cad-derived'), 'CAD twin');
  assert.match(sceneLabel('illustrative'), /not CAD/);
});

test('cad-derived catalog rows require a licensed file hash', () => {
  for (const board of premium.boards) {
    assertCadDerived(board.geometry);
    assert.equal(isCadTwin(geometryGrade(board.geometry)), false);
  }
  assert.throws(() =>
    assertCadDerived({
      status: 'modeled',
      modelId: 'keyboard-fake',
      fidelity: 'cad-derived',
      evidence: [],
    }),
  );
});

test('featured Angry Miao and Q1 boards are not labeled as CAD twins', () => {
  const featured = Object.fromEntries(
    featuredBuilds.map((item) => [item.id, item]),
  );
  assert.match(featured['am-hatsu'].subtitle, /not CAD/i);
  assert.match(featured['cyberboard-r2'].subtitle, /not CAD/i);
  assert.equal(isCadTwin(assemblyGrade(byId['am-hatsu'].parts)), false);
  const knob = requiredEnvelope(byId['q1-max-ansi-encoder'], 'control_dial');
  assert.deepEqual(knob.size, [16, 16, 14]);
  assert.equal(sceneUnitsFromMm(knob.size[0]) * UNIT_MM, 16);
});

test('no revision displays a mesh yet', () => {
  for (const revision of revisions.revisions)
    assert.deepEqual(
      cadDisplayRequests(revision.parts),
      [],
      `${revision.id} would overlay CAD before a part earns it`,
    );
});

test('every listed mesh exists and matches its listed hash', () => {
  for (const revision of revisions.revisions) {
    for (const part of revision.parts) {
      if (!part.scene) continue;
      const file = new URL(`../${part.scene.glb}`, import.meta.url);
      assert.ok(existsSync(file), `${part.scene.glb} is listed but absent`);
      assert.equal(
        createHash('sha256').update(readFileSync(file)).digest('hex'),
        part.scene.sha256,
        `${part.scene.glb} does not match its listed hash`,
      );
    }
  }
});

test('a listed mesh displays only with a display grade and its evidence', () => {
  assert.equal(canDisplayCadPart(knobPart()), true);
  assert.equal(canDisplayCadPart(knobPart({ grade: 'measured' })), true);
  assert.equal(
    canDisplayCadPart({
      role: 'control_dial',
      grade: 'dimension-verified',
      source: 'published millimetres',
      scene: listedScene,
    }),
    true,
  );
  assert.equal(canDisplayCadPart(knobPart({ grade: 'illustrative' })), false);
  assert.equal(
    canDisplayCadPart(knobPart({ grade: 'layout-verified' })),
    false,
  );
  assert.equal(canDisplayCadPart(knobPart({ license: undefined })), false);
  assert.equal(canDisplayCadPart(knobPart({ sha256: undefined })), false);
  assert.equal(canDisplayCadPart(knobPart({ scene: undefined })), false);
  assert.equal(
    canDisplayCadPart(
      knobPart({
        scene: { glb: 'public/models/keyboard-75.glb', sha256: 'a'.repeat(64) },
      }),
    ),
    false,
  );
  assert.equal(
    canDisplayCadPart(
      knobPart({
        scene: {
          glb: 'public/models/cad/../keyboard-75.glb',
          sha256: 'a'.repeat(64),
        },
      }),
    ),
    false,
  );
  assert.equal(
    canDisplayCadPart(
      knobPart({ scene: { glb: listedScene.glb, sha256: 'A'.repeat(64) } }),
    ),
    false,
  );
  assert.deepEqual(
    cadDisplayRequests([knobPart(), knobPart({ grade: 'illustrative' })]),
    [
      {
        role: 'control_dial',
        glb: 'public/models/cad/keychron-aluminum-knob.glb',
        assetPath: 'models/cad/keychron-aluminum-knob.glb',
        sha256: 'a'.repeat(64),
      },
    ],
  );
});

test('keyboard flags select their revision, and none is a twin yet', () => {
  const q1 = cadDisplayForKeyboard({ kind: 'keyboard', q1Max: true });
  const hatsu = cadDisplayForKeyboard({ kind: 'keyboard', hatsu: true });
  const cyberboard = cadDisplayForKeyboard({
    kind: 'keyboard',
    cyberboard: true,
  });
  assert.equal(q1.revisionId, 'q1-max-ansi-encoder');
  assert.equal(hatsu.revisionId, 'am-hatsu');
  assert.equal(cyberboard.revisionId, 'cyberboard-r2');
  for (const plan of [q1, hatsu, cyberboard]) {
    assert.deepEqual(plan.requests, []);
    assert.equal(plan.twin, false);
  }
  assert.deepEqual(
    cadDisplayForKeyboard({ kind: 'keyboard', layout: '75' }),
    emptyPlan,
  );
  assert.deepEqual(cadDisplayForKeyboard({ kind: 'control-deck' }), emptyPlan);
  assert.equal(
    cadRevisionById('q1-max-ansi-encoder').parts.length,
    byId['q1-max-ansi-encoder'].parts.length,
  );
  assert.throws(
    () => cadRevisionById('keyboard-75'),
    /Missing CAD revision: keyboard-75/,
  );
});

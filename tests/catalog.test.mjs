import test from 'node:test';
import assert from 'node:assert/strict';
import { catalog, categories, checkBuild } from '../lib/catalog.ts';
import { assemblies, pcbInterfaces } from '../lib/component-data.ts';
import {
  defaultBuild,
  encodeBuild,
  decodeBuild,
  buildReducer,
  initialHistory,
} from '../lib/build.ts';

test('every starting assembly resolves six distinct-category products with documented core fit', () => {
  assert.equal(new Set(catalog.map((part) => part.id)).size, catalog.length);
  assert.deepEqual(
    [...new Set(assemblies.map((assembly) => assembly.layout))].sort(),
    ['60', '65', '75'],
  );
  for (const assembly of assemblies) {
    for (const category of categories) {
      const part = catalog.find(
        (part) => part.id === assembly.selection[category],
      );
      assert.equal(part?.category, category, `${assembly.name}: ${category}`);
      assert.equal(new URL(part.source).protocol, 'https:');
    }
    const checks = checkBuild(assembly.selection, catalog, assembly.layout);
    assert.equal(checks[0].status, 'documented', assembly.name);
    assert.ok(
      !checks.some((check) => check.status === 'incompatible'),
      assembly.name,
    );
    assert.equal(
      checks.find((check) => check.title === 'Keycap kit & row coverage')
        ?.status,
      assembly.suppliedKeycaps ? 'documented' : 'unknown',
    );
  }
});

test('magnetic compatibility distinguishes the specified double-rail family from excluded and unknown magnets', () => {
  const he = assemblies.find((a) => a.id === 'q1-he');
  for (const id of [
    'double-rail-dawn',
    'double-rail-nebula',
    'double-rail-aurora',
  ]) {
    assert.equal(
      checkBuild({ ...he.selection, switch: id }, catalog, '75')[1].status,
      'documented',
    );
  }
  for (const id of ['oil-king', 'magnetic-jade', 'magnetic-ks-20']) {
    assert.equal(
      checkBuild({ ...he.selection, switch: id }, catalog, '75')[1].status,
      'incompatible',
    );
  }
  assert.equal(
    checkBuild({ ...he.selection, switch: 'he-switch' }, catalog, '75')[1]
      .status,
    'unknown',
  );
  for (const assembly of assemblies.filter(
    (a) => pcbInterfaces[a.selection.pcb] === 'mx-contact',
  )) {
    assert.equal(
      checkBuild(
        { ...assembly.selection, switch: 'double-rail-nebula' },
        catalog,
        assembly.layout,
      )[1].status,
      'incompatible',
    );
  }
});

test('Q1 HE 8K uses its own assembly and Lime reference without resolving conflicting Jade guidance', () => {
  const kit = assemblies.find((a) => a.id === 'q1-he-8k');
  assert.ok(kit);
  const checks = checkBuild(kit.selection, catalog, '75');
  assert.equal(checks[0].status, 'documented');
  assert.equal(checks[1].status, 'documented');
  assert.equal(checks[2].status, 'documented');
  assert.match(kit.note, /not measured latency/);
  assert.match(kit.note, /unresolved/);
  for (const id of ['magnetic-jade', 'double-rail-nebula'])
    assert.equal(
      checkBuild({ ...kit.selection, switch: id }, catalog, '75')[1].status,
      'unknown',
    );
  assert.equal(
    checkBuild({ ...kit.selection, switch: 'oil-king' }, catalog, '75')[1]
      .status,
    'incompatible',
  );
  assert.equal(
    checkBuild({ ...kit.selection, plate: 'q1-he-plate' }, catalog, '75')[0]
      .status,
    'unknown',
  );
});

test('mixed or unverified core parts cannot inherit an assembly check', () => {
  const he = assemblies.find((a) => a.id === 'q1-he');
  const max = assemblies.find((a) => a.id === 'q1-max');
  assert.equal(
    checkBuild(
      { ...he.selection, plate: max.selection.plate },
      catalog,
      '75',
    )[0].status,
    'unknown',
  );
  assert.equal(checkBuild(he.selection, catalog, '65')[0].status, 'unknown');
  const unverified = catalog.map((part) =>
    part.id === he.selection.pcb ? { ...part, evidence: 'unknown' } : part,
  );
  assert.equal(checkBuild(he.selection, unverified, '75')[0].status, 'unknown');
  assert.equal(checkBuild(he.selection, unverified, '75')[1].status, 'unknown');
});

test('stabilizer rules retain the specific Redux exception and distinguish plate mounting', () => {
  const redux = assemblies.find((a) => a.id === 'tofu60');
  const nk = assemblies.find((a) => a.id === 'nk65-entry');
  const bakeneko = assemblies.find((a) => a.id === 'bakeneko60');
  assert.equal(
    checkBuild(
      { ...redux.selection, stabilizers: 'q1-max-stabs' },
      catalog,
      '60',
    )[2].status,
    'unknown',
  );
  assert.equal(
    checkBuild(
      { ...redux.selection, stabilizers: 'durock-stabs' },
      catalog,
      '60',
    )[2].status,
    'incompatible',
  );
  assert.equal(
    checkBuild({ ...nk.selection, stabilizers: 'clip-stabs' }, catalog, '65')[2]
      .status,
    'incompatible',
  );
  assert.equal(
    checkBuild(
      { ...bakeneko.selection, stabilizers: 'q1-max-stabs' },
      catalog,
      '60',
    )[2].status,
    'incompatible',
  );
});

test('an entire starting assembly survives portable sharing and a single undo', () => {
  const he = assemblies.find((a) => a.id === 'q1-he');
  const after = {
    ...defaultBuild,
    selection: he.selection,
    layout: he.layout,
    finish: he.finish,
  };
  assert.deepEqual(decodeBuild(encodeBuild(after)), after);
  const history = buildReducer(initialHistory, { kind: 'edit', patch: after });
  assert.deepEqual(
    buildReducer(history, { kind: 'undo' }).present,
    defaultBuild,
  );
});

test('supplied keycap coverage is documented only for the unchanged factory combination', () => {
  const kit = assemblies.find((a) => a.id === 'q1-he-8k');
  const coverage = (selection, parts = catalog, layout = '75') =>
    checkBuild(selection, parts, layout).find(
      (c) => c.title === 'Keycap kit & row coverage',
    );
  assert.equal(coverage(kit.selection).status, 'documented');
  for (const patch of [
    { keycaps: 'keychron-bow' },
    { switch: 'oil-king' },
    { plate: 'q1-he-plate' },
  ])
    assert.equal(coverage({ ...kit.selection, ...patch }).status, 'unknown');
  assert.equal(coverage(kit.selection, catalog, '65').status, 'unknown');
  const unverified = catalog.map((p) =>
    p.id === kit.selection.keycaps ? { ...p, evidence: 'unknown' } : p,
  );
  assert.equal(coverage(kit.selection, unverified).status, 'unknown');
});

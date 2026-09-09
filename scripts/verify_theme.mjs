import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Theme mechanism regression: confirm theme wiring and palette variables unchanged
const page = readFileSync('app/page.tsx', 'utf8');
assert.ok(page.includes('useEffect'), 'Theme useEffect missing');
assert.ok(page.includes('build.palette'), 'Theme depends on build.palette');
assert.ok(page.includes('applyPaletteTheme'), 'Theme applies palette');

const globalsCss = readFileSync('app/globals.css', 'utf8');
assert.ok(!globalsCss.includes('background: #222c26'), 'Hardcoded #222c26 background must be removed');
assert.ok(globalsCss.includes('--surface'), 'CSS variable --surface must exist');

const data = JSON.parse(readFileSync('data/premium-keyboards.json', 'utf8'));
assert.ok(data.boards && data.boards.length >= 9, 'Premium keyboards data must have 9+ boards');

console.log('PASS: theme mechanism regression confirmed');

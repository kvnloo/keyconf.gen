import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { deflateSync } from 'node:zlib';
import { pixelVariation } from '../scripts/png_variation.mjs';

const table = Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit++)
    value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  return value >>> 0;
});

function crc32(bytes) {
  let value = 0xffffffff;
  for (const byte of bytes)
    value = table[(value ^ byte) & 0xff] ^ (value >>> 8);
  return (value ^ 0xffffffff) >>> 0;
}

function chunk(type, body) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(body.length);
  const tagged = Buffer.concat([Buffer.from(type, 'ascii'), body]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(tagged));
  return Buffer.concat([length, tagged, crc]);
}

// Writes an 8-bit greyscale PNG so the reader is exercised on real chunks,
// real zlib framing and real per-scanline filters.
function greyscalePng(width, height, scanlines) {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8;
  header[9] = 0;
  const file = join(mkdtempSync(join(tmpdir(), 'keyconf-png-')), 'sample.png');
  writeFileSync(
    file,
    Buffer.concat([
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
      chunk('IHDR', header),
      chunk(
        'IDAT',
        deflateSync(
          Buffer.concat(
            scanlines.map(([filter, row]) =>
              Buffer.concat([Buffer.from([filter]), Buffer.from(row)]),
            ),
          ),
        ),
      ),
      chunk('IEND', Buffer.alloc(0)),
    ]),
  );
  return file;
}

// The deviation the reader should report for a known set of grey levels.
function deviationOf(levels) {
  const mean =
    levels.reduce((total, level) => total + level / 255, 0) / levels.length;
  return Math.sqrt(
    levels.reduce((total, level) => total + (level / 255 - mean) ** 2, 0) /
      levels.length,
  );
}

const close = (actual, expected) => Math.abs(actual - expected) < 1e-9;

test('one flat colour reports no variation, whatever the colour', () => {
  for (const level of [0, 128, 255]) {
    const file = greyscalePng(2, 2, [
      [0, [level, level]],
      [0, [level, level]],
    ]);
    assert.equal(pixelVariation(file), 0, `level ${level}`);
  }
});

test('black beside white reports the full half-scale deviation', () => {
  const file = greyscalePng(2, 1, [[0, [0, 255]]]);
  assert.ok(close(pixelVariation(file), 0.5));
});

test('the up filter repeats the previous row', () => {
  const file = greyscalePng(2, 2, [
    [0, [0, 255]],
    [2, [0, 0]],
  ]);
  assert.ok(close(pixelVariation(file), deviationOf([0, 255, 0, 255])));
});

test('the sub filter adds the pixel to the left, with wraparound', () => {
  // 10 then 251 decodes to 10 then 5, because 10 + 251 wraps past 255.
  const file = greyscalePng(2, 1, [[1, [10, 251]]]);
  assert.ok(close(pixelVariation(file), deviationOf([10, 5])));
});

test('the average filter adds the mean of the left and upper pixels', () => {
  // Over a row of 64s: 0 + (0 + 64) / 2 = 32, then 0 + (32 + 64) / 2 = 48.
  const file = greyscalePng(2, 2, [
    [0, [64, 64]],
    [3, [0, 0]],
  ]);
  assert.ok(close(pixelVariation(file), deviationOf([64, 64, 32, 48])));
});

test('the paeth filter picks the nearest neighbour', () => {
  const file = greyscalePng(2, 2, [
    [0, [64, 64]],
    [4, [0, 0]],
  ]);
  assert.ok(close(pixelVariation(file), deviationOf([64, 64, 64, 64])));
  assert.equal(pixelVariation(file), 0);
});

test('a file that is not a PNG is rejected rather than measured', () => {
  const file = join(mkdtempSync(join(tmpdir(), 'keyconf-png-')), 'not.png');
  writeFileSync(file, Buffer.from('this is not a png'));
  assert.throws(() => pixelVariation(file), /not a PNG/);
});

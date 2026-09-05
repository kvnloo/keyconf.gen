import test from 'node:test';
import assert from 'node:assert/strict';
import { samplePreview } from '../lib/audio-preview.ts';

test('recording previews preserve transient peaks, duration and playback format without mutating PCM', () => {
  const pcm = new Float32Array(384);
  pcm[0] = 0.75;
  pcm[7] = -0.5;
  pcm[383] = 0.25;
  const original = pcm.slice();
  const preview = samplePreview({
    length: pcm.length,
    duration: 0.008,
    sampleRate: 48000,
    numberOfChannels: 1,
    getChannelData: () => pcm,
  });
  assert.equal(preview.waveform.length, 96);
  assert.equal(preview.waveform[0], 0.75);
  assert.equal(preview.waveform[1], 0.5);
  assert.equal(preview.waveform[95], 0.25);
  assert.equal(preview.duration, 0.008);
  assert.equal(preview.sampleRate, 48000);
  assert.equal(preview.channels, 1);
  assert.deepEqual(pcm, original);
});

test('short and silent audio produces a finite bounded waveform', () => {
  for (const pcm of [
    new Float32Array(2),
    new Float32Array(512),
    Float32Array.of(-0.5, 0.2),
  ]) {
    const preview = samplePreview({
      length: pcm.length,
      duration: pcm.length / 44100,
      sampleRate: 44100,
      numberOfChannels: 1,
      getChannelData: () => pcm,
    });
    assert.ok(
      preview.waveform.every(
        (value) => Number.isFinite(value) && value >= 0 && value <= 0.5,
      ),
    );
  }
});

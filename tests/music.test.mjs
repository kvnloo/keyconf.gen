import test from 'node:test';
import assert from 'node:assert/strict';
import { setTimeout as delay } from 'node:timers/promises';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { StudioMusic } from '../lib/music.ts';

function fixture(t) {
  const media = [];
  const contexts = [];
  let resume = async () => {};
  let play = async () => {};
  const originals = Object.fromEntries(
    ['Audio', 'AudioContext', 'document'].map((key) => [
      key,
      Object.getOwnPropertyDescriptor(globalThis, key),
    ]),
  );
  globalThis.document = { baseURI: 'https://example.com/keyconf.gen/nightly/' };
  globalThis.Audio = class {
    paused = true;
    src = '';
    constructor() {
      media.push(this);
    }
    getAttribute() {
      return this.src;
    }
    canPlayType() {
      return 'probably';
    }
    removeAttribute() {
      this.src = '';
    }
    load() {
      this.error = null;
    }
    async play() {
      await play();
      this.paused = false;
    }
    pause() {
      this.paused = true;
    }
  };
  globalThis.AudioContext = class {
    currentTime = 0;
    destination = {};
    closed = false;
    constructor() {
      contexts.push(this);
    }
    resume() {
      return resume();
    }
    async close() {
      this.closed = true;
    }
    createMediaElementSource() {
      return { connect: (gain) => gain, disconnect() {} };
    }
    createGain() {
      this.gain = {
        gain: {
          value: 0,
          cancelScheduledValues() {},
          cancelAndHoldAtTime() {},
          setValueAtTime(value) {
            this.value = value;
          },
          linearRampToValueAtTime(value) {
            this.value = value;
          },
        },
        connect() {},
        disconnect() {},
      };
      return this.gain;
    }
  };
  const music = new StudioMusic();
  t.after(() => {
    music.close();
    for (const [key, descriptor] of Object.entries(originals)) {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else delete globalThis[key];
    }
  });
  return {
    music,
    media,
    contexts,
    resume: (next) => {
      resume = next;
    },
    play: (next) => {
      play = next;
    },
  };
}

test('music is opt-in and waits for every blocker to clear before loading its source', async (t) => {
  const { music, media, contexts } = fixture(t);
  assert.equal(contexts.length, 0);
  music.setBlocked('keyboard', true);
  music.setBlocked('reference', true);
  await music.play();
  assert.equal(media[0].src, '');
  assert.deepEqual(music.getSnapshot().state, {
    kind: 'paused',
    reason: 'reference',
  });
  music.setBlocked('reference', false);
  await delay(300);
  assert.equal(media[0].src, '');
  music.setBlocked('keyboard', false);
  await delay(300);
  assert.equal(music.getSnapshot().state.kind, 'playing');
  assert.equal(
    media[0].src,
    'https://example.com/keyconf.gen/nightly/music/lofi-again.ogg',
  );
  music.setBlocked('reference', true);
  assert.equal(media[0].paused, true);
  assert.equal(contexts[0].gain.gain.value, 0);
});

test('Pause during suppression cancels recovery and user volume survives suppression', async (t) => {
  const { music, media, contexts } = fixture(t);
  await music.play();
  music.setVolume(0.31);
  music.setBlocked('keyboard', true);
  music.pause();
  music.setBlocked('keyboard', false);
  await delay(300);
  assert.equal(music.getSnapshot().state.kind, 'off');
  assert.equal(media[0].paused, true);
  await music.play();
  assert.equal(contexts[0].gain.gain.value, 0.31);
  music.setBlocked('keyboard', true);
  music.setBlocked('keyboard', false);
  music.setBlocked('reference', true);
  await delay(300);
  assert.equal(contexts[0].gain.gain.value, 0);
  assert.deepEqual(music.getSnapshot().state, {
    kind: 'paused',
    reason: 'reference',
  });
});

test('late play resolution cannot restart music after Pause or close', async (t) => {
  const f = fixture(t);
  let finish;
  f.play(
    () =>
      new Promise((resolve) => {
        finish = resolve;
      }),
  );
  const pending = f.music.play();
  await delay(0);
  f.music.pause();
  finish();
  await pending;
  assert.equal(f.media[0].paused, true);
  assert.equal(f.music.getSnapshot().state.kind, 'off');
  const second = f.music.play();
  await delay(0);
  f.music.close();
  finish();
  await second;
  assert.equal(f.media[0].paused, true);
  assert.equal(f.contexts[0].closed, true);
  assert.equal(f.media[0].src, '');
});

test('late audio unlock cannot load music after close and errors permit explicit retry', async (t) => {
  const f = fixture(t);
  let finish;
  f.resume(
    () =>
      new Promise((resolve) => {
        finish = resolve;
      }),
  );
  const pending = f.music.play();
  f.music.close();
  finish();
  await pending;
  assert.equal(f.media[0].src, '');
  f.resume(async () => {
    throw new Error('autoplay denied');
  });
  await f.music.play();
  assert.equal(f.music.getSnapshot().state.kind, 'error');
  assert.equal(f.music.getSnapshot().requested, false);
  f.resume(async () => {});
  await f.music.play();
  assert.equal(f.music.getSnapshot().state.kind, 'playing');
});

test('music assets retain original bytes and an explicit source/license record', () => {
  for (const [file, hash] of [
    [
      'lofi-again.ogg',
      'd3b3410a186d45dadbcf87a8072b5a7f3b3f5a11fe38d9a7e9bdb3f66d5d86fa',
    ],
    [
      'lofi-again.mp3',
      '5aaddde19071776a82e0abf886e787180bb49d1246511284de5f7d7aac9518be',
    ],
  ]) {
    assert.equal(
      createHash('sha256')
        .update(
          readFileSync(new URL(`../public/music/${file}`, import.meta.url)),
        )
        .digest('hex'),
      hash,
    );
  }
  assert.match(
    readFileSync(
      new URL('../public/music/LICENSE.txt', import.meta.url),
      'utf8',
    ),
    /CC0 1.0 Universal/,
  );
});

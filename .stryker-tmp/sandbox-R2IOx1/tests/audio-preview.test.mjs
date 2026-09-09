// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import test from 'node:test';
import assert from 'node:assert/strict';
import { samplePreview } from '../lib/audio-preview.ts';
test(stryMutAct_9fa48("15187") ? "" : (stryCov_9fa48("15187"), 'recording previews preserve transient peaks, duration and playback format without mutating PCM'), () => {
  if (stryMutAct_9fa48("15188")) {
    {}
  } else {
    stryCov_9fa48("15188");
    const pcm = new Float32Array(384);
    pcm[0] = 0.75;
    pcm[7] = stryMutAct_9fa48("15189") ? +0.5 : (stryCov_9fa48("15189"), -0.5);
    pcm[383] = 0.25;
    const original = stryMutAct_9fa48("15190") ? pcm : (stryCov_9fa48("15190"), pcm.slice());
    const preview = samplePreview(stryMutAct_9fa48("15191") ? {} : (stryCov_9fa48("15191"), {
      length: pcm.length,
      duration: 0.008,
      sampleRate: 48000,
      numberOfChannels: 1,
      getChannelData: stryMutAct_9fa48("15192") ? () => undefined : (stryCov_9fa48("15192"), () => pcm)
    }));
    if (stryMutAct_9fa48("15193")) {
      ;
    } else {
      stryCov_9fa48("15193");
      assert.equal(preview.waveform.length, 96);
    }
    if (stryMutAct_9fa48("15194")) {
      ;
    } else {
      stryCov_9fa48("15194");
      assert.equal(preview.waveform[0], 0.75);
    }
    if (stryMutAct_9fa48("15195")) {
      ;
    } else {
      stryCov_9fa48("15195");
      assert.equal(preview.waveform[1], 0.5);
    }
    if (stryMutAct_9fa48("15196")) {
      ;
    } else {
      stryCov_9fa48("15196");
      assert.equal(preview.waveform[95], 0.25);
    }
    if (stryMutAct_9fa48("15197")) {
      ;
    } else {
      stryCov_9fa48("15197");
      assert.equal(preview.duration, 0.008);
    }
    if (stryMutAct_9fa48("15198")) {
      ;
    } else {
      stryCov_9fa48("15198");
      assert.equal(preview.sampleRate, 48000);
    }
    if (stryMutAct_9fa48("15199")) {
      ;
    } else {
      stryCov_9fa48("15199");
      assert.equal(preview.channels, 1);
    }
    if (stryMutAct_9fa48("15200")) {
      ;
    } else {
      stryCov_9fa48("15200");
      assert.deepEqual(pcm, original);
    }
  }
});
test(stryMutAct_9fa48("15202") ? "" : (stryCov_9fa48("15202"), 'short and silent audio produces a finite bounded waveform'), () => {
  if (stryMutAct_9fa48("15203")) {
    {}
  } else {
    stryCov_9fa48("15203");
    for (const pcm of stryMutAct_9fa48("15204") ? [] : (stryCov_9fa48("15204"), [new Float32Array(2), new Float32Array(512), Float32Array.of(stryMutAct_9fa48("15205") ? +0.5 : (stryCov_9fa48("15205"), -0.5), 0.2)])) {
      if (stryMutAct_9fa48("15206")) {
        {}
      } else {
        stryCov_9fa48("15206");
        const preview = samplePreview(stryMutAct_9fa48("15207") ? {} : (stryCov_9fa48("15207"), {
          length: pcm.length,
          duration: stryMutAct_9fa48("15208") ? pcm.length * 44100 : (stryCov_9fa48("15208"), pcm.length / 44100),
          sampleRate: 44100,
          numberOfChannels: 1,
          getChannelData: stryMutAct_9fa48("15209") ? () => undefined : (stryCov_9fa48("15209"), () => pcm)
        }));
        assert.ok(stryMutAct_9fa48("15211") ? preview.waveform.some(value => Number.isFinite(value) && value >= 0 && value <= 0.5) : (stryCov_9fa48("15211"), preview.waveform.every(stryMutAct_9fa48("15212") ? () => undefined : (stryCov_9fa48("15212"), value => stryMutAct_9fa48("15215") ? Number.isFinite(value) && value >= 0 || value <= 0.5 : stryMutAct_9fa48("15214") ? false : stryMutAct_9fa48("15213") ? true : (stryCov_9fa48("15213", "15214", "15215"), (stryMutAct_9fa48("15217") ? Number.isFinite(value) || value >= 0 : stryMutAct_9fa48("15216") ? true : (stryCov_9fa48("15216", "15217"), Number.isFinite(value) && (stryMutAct_9fa48("15220") ? value < 0 : stryMutAct_9fa48("15219") ? value > 0 : stryMutAct_9fa48("15218") ? true : (stryCov_9fa48("15218", "15219", "15220"), value >= 0)))) && (stryMutAct_9fa48("15223") ? value > 0.5 : stryMutAct_9fa48("15222") ? value < 0.5 : stryMutAct_9fa48("15221") ? true : (stryCov_9fa48("15221", "15222", "15223"), value <= 0.5)))))));
      }
    }
  }
});
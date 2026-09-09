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
export type SamplePreview = {
  waveform: number[];
  duration: number;
  sampleRate: number;
  channels: number;
};
export function samplePreview(buffer: Pick<AudioBuffer, 'length' | 'duration' | 'sampleRate' | 'numberOfChannels' | 'getChannelData'>): SamplePreview {
  if (stryMutAct_9fa48("5620")) {
    {}
  } else {
    stryCov_9fa48("5620");
    const samples = buffer.getChannelData(0);
    const bins = 96;
    const waveform = Array.from(stryMutAct_9fa48("5621") ? {} : (stryCov_9fa48("5621"), {
      length: bins
    }), (_, index) => {
      if (stryMutAct_9fa48("5622")) {
        {}
      } else {
        stryCov_9fa48("5622");
        const start = Math.floor(stryMutAct_9fa48("5623") ? index * samples.length * bins : (stryCov_9fa48("5623"), (stryMutAct_9fa48("5624") ? index / samples.length : (stryCov_9fa48("5624"), index * samples.length)) / bins));
        const end = stryMutAct_9fa48("5625") ? Math.min(start + 1, Math.floor((index + 1) * samples.length / bins)) : (stryCov_9fa48("5625"), Math.max(stryMutAct_9fa48("5626") ? start - 1 : (stryCov_9fa48("5626"), start + 1), Math.floor(stryMutAct_9fa48("5627") ? (index + 1) * samples.length * bins : (stryCov_9fa48("5627"), (stryMutAct_9fa48("5628") ? (index + 1) / samples.length : (stryCov_9fa48("5628"), (stryMutAct_9fa48("5629") ? index - 1 : (stryCov_9fa48("5629"), index + 1)) * samples.length)) / bins))));
        let peak = 0;
        for (let i = start; stryMutAct_9fa48("5631") ? i < end || i < samples.length : stryMutAct_9fa48("5630") ? false : (stryCov_9fa48("5630", "5631"), (stryMutAct_9fa48("5634") ? i >= end : stryMutAct_9fa48("5633") ? i <= end : stryMutAct_9fa48("5632") ? true : (stryCov_9fa48("5632", "5633", "5634"), i < end)) && (stryMutAct_9fa48("5637") ? i >= samples.length : stryMutAct_9fa48("5636") ? i <= samples.length : stryMutAct_9fa48("5635") ? true : (stryCov_9fa48("5635", "5636", "5637"), i < samples.length))); stryMutAct_9fa48("5638") ? i-- : (stryCov_9fa48("5638"), i++)) peak = stryMutAct_9fa48("5639") ? Math.min(peak, Math.abs(samples[i])) : (stryCov_9fa48("5639"), Math.max(peak, Math.abs(samples[i])));
        return peak;
      }
    });
    return stryMutAct_9fa48("5640") ? {} : (stryCov_9fa48("5640"), {
      waveform,
      duration: buffer.duration,
      sampleRate: buffer.sampleRate,
      channels: buffer.numberOfChannels
    });
  }
}
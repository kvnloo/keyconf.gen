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
import type { SamplePreview } from '../lib/audio-preview';
export default function SampleWaveform({
  preview,
  synthesized,
  playing
}: {
  preview: SamplePreview | null;
  synthesized: boolean;
  playing: boolean;
}) {
  if (stryMutAct_9fa48("3908")) {
    {}
  } else {
    stryCov_9fa48("3908");
    const peak = preview ? stryMutAct_9fa48("3909") ? Math.min(...preview.waveform, 0.001) : (stryCov_9fa48("3909"), Math.max(...preview.waveform, 0.001)) : 1;
    return <figure className={(stryMutAct_9fa48("3910") ? "" : (stryCov_9fa48("3910"), 'sample-waveform')) + (playing ? stryMutAct_9fa48("3911") ? "" : (stryCov_9fa48("3911"), ' playing') : stryMutAct_9fa48("3912") ? "Stryker was here!" : (stryCov_9fa48("3912"), ''))}>
      <svg viewBox="0 0 300 78" aria-hidden="true">
        <path d="M0 39H300" className="waveform-axis" />
        {stryMutAct_9fa48("3913") ? preview.waveform.map((value, index) => <line key={index} x1={index * 300 / preview.waveform.length + 1} x2={index * 300 / preview.waveform.length + 1} y1={39 - value / peak * 32} y2={39 + value / peak * 32} />) : (stryCov_9fa48("3913"), preview?.waveform.map(stryMutAct_9fa48("3914") ? () => undefined : (stryCov_9fa48("3914"), (value, index) => <line key={index} x1={stryMutAct_9fa48("3915") ? index * 300 / preview.waveform.length - 1 : (stryCov_9fa48("3915"), (stryMutAct_9fa48("3916") ? index * 300 * preview.waveform.length : (stryCov_9fa48("3916"), (stryMutAct_9fa48("3917") ? index / 300 : (stryCov_9fa48("3917"), index * 300)) / preview.waveform.length)) + 1)} x2={stryMutAct_9fa48("3918") ? index * 300 / preview.waveform.length - 1 : (stryCov_9fa48("3918"), (stryMutAct_9fa48("3919") ? index * 300 * preview.waveform.length : (stryCov_9fa48("3919"), (stryMutAct_9fa48("3920") ? index / 300 : (stryCov_9fa48("3920"), index * 300)) / preview.waveform.length)) + 1)} y1={stryMutAct_9fa48("3921") ? 39 + value / peak * 32 : (stryCov_9fa48("3921"), 39 - (stryMutAct_9fa48("3922") ? value / peak / 32 : (stryCov_9fa48("3922"), (stryMutAct_9fa48("3923") ? value * peak : (stryCov_9fa48("3923"), value / peak)) * 32)))} y2={stryMutAct_9fa48("3924") ? 39 - value / peak * 32 : (stryCov_9fa48("3924"), 39 + (stryMutAct_9fa48("3925") ? value / peak / 32 : (stryCov_9fa48("3925"), (stryMutAct_9fa48("3926") ? value * peak : (stryCov_9fa48("3926"), value / peak)) * 32)))} />)))}
      </svg>
      <figcaption>
        <span>
          {synthesized ? stryMutAct_9fa48("3927") ? "" : (stryCov_9fa48("3927"), 'Synthesized sound study') : stryMutAct_9fa48("3928") ? "" : (stryCov_9fa48("3928"), 'Recorded press · waveform shape')}
        </span>
        {stryMutAct_9fa48("3931") ? preview || <span>{Math.round(preview.duration * 1000)} ms</span> : stryMutAct_9fa48("3930") ? false : stryMutAct_9fa48("3929") ? true : (stryCov_9fa48("3929", "3930", "3931"), preview && <span>{Math.round(stryMutAct_9fa48("3932") ? preview.duration / 1000 : (stryCov_9fa48("3932"), preview.duration * 1000))} ms</span>)}
      </figcaption>
    </figure>;
  }
}
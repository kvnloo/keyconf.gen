// @ts-nocheck
'use client';

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
import { useSyncExternalStore } from 'react';
import { previewChannel } from '../lib/preview-storage';
import './preview-label.css';
const subscribe = stryMutAct_9fa48("3801") ? () => undefined : (stryCov_9fa48("3801"), (() => {
  const subscribe = () => () => {};
  return subscribe;
})());
const serverChannel = stryMutAct_9fa48("3802") ? () => undefined : (stryCov_9fa48("3802"), (() => {
  const serverChannel = () => null;
  return serverChannel;
})());
export default function PreviewLabel({
  fallback
}: {
  fallback?: 'beta';
}) {
  if (stryMutAct_9fa48("3803")) {
    {}
  } else {
    stryCov_9fa48("3803");
    const channel = useSyncExternalStore(subscribe, previewChannel, serverChannel);
    if (stryMutAct_9fa48("3806") ? false : stryMutAct_9fa48("3805") ? true : stryMutAct_9fa48("3804") ? channel : (stryCov_9fa48("3804", "3805", "3806"), !channel)) return fallback ? <span>{fallback}</span> : null;
    const name = (stryMutAct_9fa48("3809") ? channel !== 'nightly' : stryMutAct_9fa48("3808") ? false : stryMutAct_9fa48("3807") ? true : (stryCov_9fa48("3807", "3808", "3809"), channel === (stryMutAct_9fa48("3810") ? "" : (stryCov_9fa48("3810"), 'nightly')))) ? stryMutAct_9fa48("3811") ? "" : (stryCov_9fa48("3811"), 'Nightly') : stryMutAct_9fa48("3812") ? "" : (stryCov_9fa48("3812"), 'Dev');
    return <span className="preview-label" title={stryMutAct_9fa48("3813") ? `` : (stryCov_9fa48("3813"), `${name} preview. Builds saved here stay separate from the stable site.`)}>
      {name}
    </span>;
  }
}
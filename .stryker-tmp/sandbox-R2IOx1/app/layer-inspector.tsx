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
import { useId, useRef } from 'react';
import type { Part } from '../lib/catalog';
import './layer-inspector.css';
export default function LayerInspector({
  label,
  part
}: {
  label: string;
  part: Part | undefined;
}) {
  if (stryMutAct_9fa48("1854")) {
    {}
  } else {
    stryCov_9fa48("1854");
    const dialog = useRef<HTMLDialogElement>(null);
    const titleId = useId();
    return <>
      <button type="button" aria-haspopup="dialog" onClick={stryMutAct_9fa48("1855") ? () => undefined : (stryCov_9fa48("1855"), () => stryMutAct_9fa48("1856") ? dialog.current.showModal() : (stryCov_9fa48("1856"), dialog.current?.showModal()))}>
        {label}
      </button>
      <dialog ref={dialog} className="layer-inspector" aria-labelledby={titleId}>
        <form method="dialog">
          <button className="button secondary" autoFocus>
            Back to exploded view
          </button>
        </form>
        <p className="eyebrow">YOUR BUILD / {stryMutAct_9fa48("1857") ? label.toLowerCase() : (stryCov_9fa48("1857"), label.toUpperCase())}</p>
        <h2 id={titleId}>
          {part ? stryMutAct_9fa48("1858") ? `` : (stryCov_9fa48("1858"), `${part.brand} ${part.name}`) : stryMutAct_9fa48("1859") ? `` : (stryCov_9fa48("1859"), `${label} reference unavailable`)}
        </h2>
        {part ? <>
            <p>{part.detail}</p>
            <dl>
              <dt>Evidence</dt>
              <dd>
                {(stryMutAct_9fa48("1862") ? part.evidence !== 'documented' : stryMutAct_9fa48("1861") ? false : stryMutAct_9fa48("1860") ? true : (stryCov_9fa48("1860", "1861", "1862"), part.evidence === (stryMutAct_9fa48("1863") ? "" : (stryCov_9fa48("1863"), 'documented')))) ? stryMutAct_9fa48("1864") ? "" : (stryCov_9fa48("1864"), 'Catalog documentation reference (fit not guaranteed)') : stryMutAct_9fa48("1865") ? "" : (stryCov_9fa48("1865"), 'Catalog reference; compatibility and fit not verified')}
              </dd>
              <dt>Assembly family</dt>
              <dd>{part.family}</dd>
            </dl>
            <a className="button secondary" href={part.source} target="_blank" rel="noopener noreferrer">
              View source evidence ↗
            </a>
            <p>
              The studio geometry is illustrative. Check the maker’s dimensions,
              layout and mounting requirements before choosing physical parts.
            </p>
          </> : <p>
            This saved selection has no catalog reference available on this
            device. Your build has not been changed.
          </p>}
      </dialog>
    </>;
  }
}
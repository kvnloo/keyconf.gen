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
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Build } from '../lib/build';
import type { PublicBuildEvidence } from '../lib/build-evidence';
import AccessoryFitNotes from './accessory-fit-notes';
import BuildFeedback from './build-feedback';
import BuildComparison from './build-comparison';
import './shared-build-preview.css';
export default function ArchivedBuild({
  snapshot,
  details,
  kind
}: {
  snapshot: {
    title: string;
    build: Build;
    evidence: PublicBuildEvidence;
  };
  details: ReactNode;
  kind: 'publication' | 'proposal';
}) {
  if (stryMutAct_9fa48("13")) {
    {}
  } else {
    stryCov_9fa48("13");
    const {
      evidence
    } = snapshot;
    return <main className="shared-preview publication-archive">
      {details}
      <Link href="/#studio">Open your studio →</Link>
      <h1>{snapshot.title}</h1>
      <p>
        Some parts or recordings are no longer supported in the studio. The
        original parts and sources are preserved below.
      </p>
      <BuildFeedback build={snapshot.build} linkMode={(stryMutAct_9fa48("16") ? kind !== 'publication' : stryMutAct_9fa48("15") ? false : stryMutAct_9fa48("14") ? true : (stryCov_9fa48("14", "15", "16"), kind === (stryMutAct_9fa48("17") ? "" : (stryCov_9fa48("17"), 'publication')))) ? stryMutAct_9fa48("18") ? "" : (stryCov_9fa48("18"), 'publication') : stryMutAct_9fa48("19") ? "" : (stryCov_9fa48("19"), 'file')} />
      <BuildComparison build={snapshot.build} />
      <h2>Original parts</h2>
      <ul className="preview-parts">
        {(stryMutAct_9fa48("20") ? [] : (stryCov_9fa48("20"), [...evidence.components, ...evidence.accessoryReferences])).map(stryMutAct_9fa48("21") ? () => undefined : (stryCov_9fa48("21"), part => <li key={part.id}>
              <a href={part.source} target="_blank" rel="noreferrer">
                {part.brand} {part.name} ↗
              </a>
              <p>{part.detail}</p>
            </li>))}
      </ul>
      <h2>Original compatibility</h2>
      {evidence.compatibility.map(stryMutAct_9fa48("22") ? () => undefined : (stryCov_9fa48("22"), (check, index) => <section key={index}>
          <h3>
            {check.title} · {check.status}
          </h3>
          <p>{check.detail}</p>
          {stryMutAct_9fa48("25") ? check.source || <a href={check.source} target="_blank" rel="noreferrer">
              Original source ↗
            </a> : stryMutAct_9fa48("24") ? false : stryMutAct_9fa48("23") ? true : (stryCov_9fa48("23", "24", "25"), check.source && <a href={check.source} target="_blank" rel="noreferrer">
              Original source ↗
            </a>)}
        </section>))}
      <AccessoryFitNotes selections={snapshot.build.accessories} products={evidence.accessoryReferences} checks={evidence.accessoryCompatibility} />
      <h2>Sound reference</h2>
      <p>{evidence.sound.accuracy}</p>
      {stryMutAct_9fa48("28") ? evidence.sound.recording || <a href={evidence.sound.recording.source} target="_blank" rel="noreferrer">
          {evidence.sound.recording.name} · {evidence.sound.recording.creator} ↗
        </a> : stryMutAct_9fa48("27") ? false : stryMutAct_9fa48("26") ? true : (stryCov_9fa48("26", "27", "28"), evidence.sound.recording && <a href={evidence.sound.recording.source} target="_blank" rel="noreferrer">
          {evidence.sound.recording.name} · {evidence.sound.recording.creator} ↗
        </a>)}
    </main>;
  }
}
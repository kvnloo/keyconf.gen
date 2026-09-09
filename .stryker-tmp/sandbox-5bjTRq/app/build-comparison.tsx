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
import { useRef, useState } from 'react';
import BuildChangeList from './build-change-list';
import { readBuildFile, type Build } from '../lib/build';
import type { PublicBuildEvidence } from '../lib/build-evidence';
import { compareBuilds } from '../lib/build-comparison';
export default function BuildComparison({
  build,
  evidence
}: {
  build: Build;
  evidence?: PublicBuildEvidence;
}) {
  if (stryMutAct_9fa48("297")) {
    {}
  } else {
    stryCov_9fa48("297");
    const [candidate, setCandidate] = useState<Build | null>(null);
    const [message, setMessage] = useState(stryMutAct_9fa48("298") ? "Stryker was here!" : (stryCov_9fa48("298"), ''));
    const generation = useRef(0);
    const changes = candidate ? compareBuilds(build, candidate, evidence) : stryMutAct_9fa48("299") ? ["Stryker was here"] : (stryCov_9fa48("299"), []);
    async function open(file: File | undefined) {
      if (stryMutAct_9fa48("300")) {
        {}
      } else {
        stryCov_9fa48("300");
        const current = stryMutAct_9fa48("301") ? --generation.current : (stryCov_9fa48("301"), ++generation.current);
        if (stryMutAct_9fa48("304") ? false : stryMutAct_9fa48("303") ? true : stryMutAct_9fa48("302") ? file : (stryCov_9fa48("302", "303", "304"), !file)) return;
        setMessage(stryMutAct_9fa48("306") ? "" : (stryCov_9fa48("306"), 'Reading build…'));
        try {
          if (stryMutAct_9fa48("307")) {
            {}
          } else {
            stryCov_9fa48("307");
            if (stryMutAct_9fa48("311") ? file.size <= 1_000_000 : stryMutAct_9fa48("310") ? file.size >= 1_000_000 : stryMutAct_9fa48("309") ? false : stryMutAct_9fa48("308") ? true : (stryCov_9fa48("308", "309", "310", "311"), file.size > 1_000_000)) throw new Error(stryMutAct_9fa48("313") ? "" : (stryCov_9fa48("313"), 'Choose a Keyconf build file under 1 MB.'));
            const next = readBuildFile(await file.text());
            if (stryMutAct_9fa48("316") ? current === generation.current : stryMutAct_9fa48("315") ? false : stryMutAct_9fa48("314") ? true : (stryCov_9fa48("314", "315", "316"), current !== generation.current)) return;
            if (stryMutAct_9fa48("317")) {
              ;
            } else {
              stryCov_9fa48("317");
              setCandidate(next);
            }
            setMessage(stryMutAct_9fa48("319") ? "" : (stryCov_9fa48("319"), 'Comparison ready. Neither build has been changed.'));
          }
        } catch (error) {
          if (stryMutAct_9fa48("320")) {
            {}
          } else {
            stryCov_9fa48("320");
            if (stryMutAct_9fa48("323") ? current === generation.current : stryMutAct_9fa48("322") ? false : stryMutAct_9fa48("321") ? true : (stryCov_9fa48("321", "322", "323"), current !== generation.current)) return;
            setMessage(error instanceof Error ? error.message : stryMutAct_9fa48("325") ? "" : (stryCov_9fa48("325"), 'This build could not be read.'));
          }
        }
      }
    }
    return <details className="preview-feedback preview-comparison">
      <summary>Compare another build</summary>
      <p>
        Choose an exported Keyconf build to compare with this preview. Files are
        read on this device.
        {stryMutAct_9fa48("328") ? evidence || ' This preview uses the creator’s saved product details; the compared file uses current catalog details.' : stryMutAct_9fa48("327") ? false : stryMutAct_9fa48("326") ? true : (stryCov_9fa48("326", "327", "328"), evidence && (stryMutAct_9fa48("329") ? "" : (stryCov_9fa48("329"), ' This preview uses the creator’s saved product details; the compared file uses current catalog details.')))}
      </p>
      <label htmlFor="comparison-file">Build file to compare</label>
      <input id="comparison-file" type="file" accept=".json,application/json" onChange={event => {
        if (stryMutAct_9fa48("330")) {
          {}
        } else {
          stryCov_9fa48("330");
          void open(stryMutAct_9fa48("331") ? event.target.files[0] : (stryCov_9fa48("331"), event.target.files?.[0]));
          event.target.value = stryMutAct_9fa48("332") ? "Stryker was here!" : (stryCov_9fa48("332"), '');
        }
      }} />
      <output aria-live="polite">{message}</output>
      {stryMutAct_9fa48("335") ? candidate || <>
          <h3>This preview → {candidate.name}</h3>
          <p>
            {changes.length ? `${changes.length} ${changes.length === 1 ? 'setting differs' : 'settings differ'}.` : 'The compared parts and settings match.'}{' '}
            Names and unused imported parts are excluded. Visual and audio
            settings do not establish physical fit or exact sound.
          </p>
          <BuildChangeList changes={changes} beforeLabel="Preview" afterLabel="Compared build" />
          <button className="preview-customize" onClick={() => {
          generation.current++;
          setCandidate(null);
          setMessage('Comparison cleared.');
        }}>
            Clear comparison
          </button>
        </> : stryMutAct_9fa48("334") ? false : stryMutAct_9fa48("333") ? true : (stryCov_9fa48("333", "334", "335"), candidate && <>
          <h3>This preview → {candidate.name}</h3>
          <p>
            {changes.length ? stryMutAct_9fa48("336") ? `` : (stryCov_9fa48("336"), `${changes.length} ${(stryMutAct_9fa48("339") ? changes.length !== 1 : stryMutAct_9fa48("338") ? false : stryMutAct_9fa48("337") ? true : (stryCov_9fa48("337", "338", "339"), changes.length === 1)) ? stryMutAct_9fa48("340") ? "" : (stryCov_9fa48("340"), 'setting differs') : stryMutAct_9fa48("341") ? "" : (stryCov_9fa48("341"), 'settings differ')}.`) : stryMutAct_9fa48("342") ? "" : (stryCov_9fa48("342"), 'The compared parts and settings match.')}{stryMutAct_9fa48("343") ? "" : (stryCov_9fa48("343"), ' ')}
            Names and unused imported parts are excluded. Visual and audio
            settings do not establish physical fit or exact sound.
          </p>
          <BuildChangeList changes={changes} beforeLabel="Preview" afterLabel="Compared build" />
          <button className="preview-customize" onClick={() => {
          if (stryMutAct_9fa48("344")) {
            {}
          } else {
            stryCov_9fa48("344");
            stryMutAct_9fa48("345") ? generation.current-- : (stryCov_9fa48("345"), generation.current++);
            if (stryMutAct_9fa48("346")) {
              ;
            } else {
              stryCov_9fa48("346");
              setCandidate(null);
            }
            setMessage(stryMutAct_9fa48("348") ? "" : (stryCov_9fa48("348"), 'Comparison cleared.'));
          }
        }}>
            Clear comparison
          </button>
        </>)}
    </details>;
  }
}
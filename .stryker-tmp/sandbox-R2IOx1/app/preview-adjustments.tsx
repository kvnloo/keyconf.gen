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
import { palettes, caseColors, type Build } from '../lib/build';
import { catalog, type FitCheck } from '../lib/catalog';
import { soundPacks } from '../lib/sound-packs';
import { compareBuilds } from '../lib/build-comparison';
import BuildChangeList from './build-change-list';
import type { PublicBuildEvidence } from '../lib/build-evidence';
import StudioSelect from './studio-select';
export default function PreviewAdjustments({
  original,
  build,
  onChange,
  checks,
  evidence
}: {
  evidence?: PublicBuildEvidence;
  checks: FitCheck[];
  original: Build;
  build: Build;
  onChange: (build: Build) => void;
}) {
  if (stryMutAct_9fa48("3699")) {
    {}
  } else {
    stryCov_9fa48("3699");
    const changedLabels = new Set(compareBuilds(original, build).map(stryMutAct_9fa48("3700") ? () => undefined : (stryCov_9fa48("3700"), change => change.label)));
    const changes = stryMutAct_9fa48("3701") ? compareBuilds(original, build, evidence) : (stryCov_9fa48("3701"), compareBuilds(original, build, evidence).filter(stryMutAct_9fa48("3702") ? () => undefined : (stryCov_9fa48("3702"), change => changedLabels.has(change.label))));
    const conflicts = stryMutAct_9fa48("3703") ? checks : (stryCov_9fa48("3703"), checks.filter(stryMutAct_9fa48("3704") ? () => undefined : (stryCov_9fa48("3704"), check => stryMutAct_9fa48("3707") ? check.status !== 'incompatible' : stryMutAct_9fa48("3706") ? false : stryMutAct_9fa48("3705") ? true : (stryCov_9fa48("3705", "3706", "3707"), check.status === (stryMutAct_9fa48("3708") ? "" : (stryCov_9fa48("3708"), 'incompatible'))))));
    const unknown = stryMutAct_9fa48("3709") ? checks.length : (stryCov_9fa48("3709"), checks.filter(stryMutAct_9fa48("3710") ? () => undefined : (stryCov_9fa48("3710"), check => stryMutAct_9fa48("3713") ? check.status !== 'unknown' : stryMutAct_9fa48("3712") ? false : stryMutAct_9fa48("3711") ? true : (stryCov_9fa48("3711", "3712", "3713"), check.status === (stryMutAct_9fa48("3714") ? "" : (stryCov_9fa48("3714"), 'unknown'))))).length);
    const switches = stryMutAct_9fa48("3715") ? [...catalog, ...build.customParts] : (stryCov_9fa48("3715"), (stryMutAct_9fa48("3716") ? [] : (stryCov_9fa48("3716"), [...catalog, ...build.customParts])).filter(stryMutAct_9fa48("3717") ? () => undefined : (stryCov_9fa48("3717"), part => stryMutAct_9fa48("3720") ? part.category !== 'switch' : stryMutAct_9fa48("3719") ? false : stryMutAct_9fa48("3718") ? true : (stryCov_9fa48("3718", "3719", "3720"), part.category === (stryMutAct_9fa48("3721") ? "" : (stryCov_9fa48("3721"), 'switch'))))));
    return <details className="preview-feedback preview-adjustments">
      <summary>Try changes</summary>
      <p>
        Experiment here before opening the full studio. The original and your
        saved studio stay untouched.
      </p>
      <label htmlFor="preview-switch">Switches</label>
      <StudioSelect id="preview-switch" value={build.selection.switch} options={switches.map(stryMutAct_9fa48("3722") ? () => undefined : (stryCov_9fa48("3722"), part => stryMutAct_9fa48("3723") ? {} : (stryCov_9fa48("3723"), {
        value: part.id,
        label: stryMutAct_9fa48("3724") ? `` : (stryCov_9fa48("3724"), `${part.brand} ${part.name}`)
      })))} onValueChange={stryMutAct_9fa48("3725") ? () => undefined : (stryCov_9fa48("3725"), id => onChange(stryMutAct_9fa48("3726") ? {} : (stryCov_9fa48("3726"), {
        ...build,
        selection: stryMutAct_9fa48("3727") ? {} : (stryCov_9fa48("3727"), {
          ...build.selection,
          switch: id
        })
      })))} />
      <p className="preview-tip">
        Changing switches does not select a recording automatically.
      </p>
      <div className="preview-change-fit" aria-live="polite">
        {conflicts.map(stryMutAct_9fa48("3728") ? () => undefined : (stryCov_9fa48("3728"), check => <p key={check.title}>
            <strong>Incompatible: {check.title}</strong>
            <br />
            {check.detail}{stryMutAct_9fa48("3729") ? "" : (stryCov_9fa48("3729"), ' ')}
            {stryMutAct_9fa48("3732") ? check.source || <a href={check.source} target="_blank" rel="noreferrer">
                Maker documentation ↗
              </a> : stryMutAct_9fa48("3731") ? false : stryMutAct_9fa48("3730") ? true : (stryCov_9fa48("3730", "3731", "3732"), check.source && <a href={check.source} target="_blank" rel="noreferrer">
                Maker documentation ↗
              </a>)}
          </p>))}
        {stryMutAct_9fa48("3735") ? unknown > 0 || <p>
            {unknown} compatibility{' '}
            {unknown === 1 ? 'check needs' : 'checks need'} confirmation. Review
            the compatibility notes before ordering.
          </p> : stryMutAct_9fa48("3734") ? false : stryMutAct_9fa48("3733") ? true : (stryCov_9fa48("3733", "3734", "3735"), (stryMutAct_9fa48("3738") ? unknown <= 0 : stryMutAct_9fa48("3737") ? unknown >= 0 : stryMutAct_9fa48("3736") ? true : (stryCov_9fa48("3736", "3737", "3738"), unknown > 0)) && <p>
            {unknown} compatibility{stryMutAct_9fa48("3739") ? "" : (stryCov_9fa48("3739"), ' ')}
            {(stryMutAct_9fa48("3742") ? unknown !== 1 : stryMutAct_9fa48("3741") ? false : stryMutAct_9fa48("3740") ? true : (stryCov_9fa48("3740", "3741", "3742"), unknown === 1)) ? stryMutAct_9fa48("3743") ? "" : (stryCov_9fa48("3743"), 'check needs') : stryMutAct_9fa48("3744") ? "" : (stryCov_9fa48("3744"), 'checks need')} confirmation. Review
            the compatibility notes before ordering.
          </p>)}
        {stryMutAct_9fa48("3747") ? conflicts.length === 0 && unknown === 0 || <p>
            Selected interfaces are documented. Check exact product variants
            before ordering.
          </p> : stryMutAct_9fa48("3746") ? false : stryMutAct_9fa48("3745") ? true : (stryCov_9fa48("3745", "3746", "3747"), (stryMutAct_9fa48("3749") ? conflicts.length === 0 || unknown === 0 : stryMutAct_9fa48("3748") ? true : (stryCov_9fa48("3748", "3749"), (stryMutAct_9fa48("3751") ? conflicts.length !== 0 : stryMutAct_9fa48("3750") ? true : (stryCov_9fa48("3750", "3751"), conflicts.length === 0)) && (stryMutAct_9fa48("3753") ? unknown !== 0 : stryMutAct_9fa48("3752") ? true : (stryCov_9fa48("3752", "3753"), unknown === 0)))) && <p>
            Selected interfaces are documented. Check exact product variants
            before ordering.
          </p>)}
      </div>
      <label htmlFor="preview-recording">Sound reference</label>
      <StudioSelect id="preview-recording" value={build.audio.source} options={stryMutAct_9fa48("3754") ? [] : (stryCov_9fa48("3754"), [stryMutAct_9fa48("3755") ? {} : (stryCov_9fa48("3755"), {
        value: stryMutAct_9fa48("3756") ? "" : (stryCov_9fa48("3756"), 'synthesized'),
        label: stryMutAct_9fa48("3757") ? "" : (stryCov_9fa48("3757"), 'Synthesized study')
      }), ...soundPacks.map(stryMutAct_9fa48("3758") ? () => undefined : (stryCov_9fa48("3758"), pack => stryMutAct_9fa48("3759") ? {} : (stryCov_9fa48("3759"), {
        value: pack.id,
        label: pack.name
      })))])} onValueChange={stryMutAct_9fa48("3760") ? () => undefined : (stryCov_9fa48("3760"), source => onChange(stryMutAct_9fa48("3761") ? {} : (stryCov_9fa48("3761"), {
        ...build,
        audio: stryMutAct_9fa48("3762") ? {} : (stryCov_9fa48("3762"), {
          ...build.audio,
          source
        })
      })))} />
      <fieldset>
        <legend>Keycap colors</legend>
        <div className="preview-options">
          {palettes.map(stryMutAct_9fa48("3763") ? () => undefined : (stryCov_9fa48("3763"), palette => <button key={palette.name} aria-pressed={stryMutAct_9fa48("3766") ? JSON.stringify(palette) !== JSON.stringify(build.palette) : stryMutAct_9fa48("3765") ? false : stryMutAct_9fa48("3764") ? true : (stryCov_9fa48("3764", "3765", "3766"), JSON.stringify(palette) === JSON.stringify(build.palette))} onClick={stryMutAct_9fa48("3767") ? () => undefined : (stryCov_9fa48("3767"), () => onChange(stryMutAct_9fa48("3768") ? {} : (stryCov_9fa48("3768"), {
            ...build,
            palette
          })))}>
              <span aria-hidden="true" style={stryMutAct_9fa48("3769") ? {} : (stryCov_9fa48("3769"), {
              background: stryMutAct_9fa48("3770") ? `` : (stryCov_9fa48("3770"), `linear-gradient(90deg, ${palette.alpha} 50%, ${palette.accent} 50%)`)
            })} />
              {palette.name}
            </button>))}
        </div>
      </fieldset>
      <fieldset>
        <legend>Case color</legend>
        <div className="preview-options">
          {caseColors.map(stryMutAct_9fa48("3771") ? () => undefined : (stryCov_9fa48("3771"), item => <button key={item.name} aria-pressed={stryMutAct_9fa48("3774") ? build.caseColor !== item.color : stryMutAct_9fa48("3773") ? false : stryMutAct_9fa48("3772") ? true : (stryCov_9fa48("3772", "3773", "3774"), build.caseColor === item.color)} onClick={stryMutAct_9fa48("3775") ? () => undefined : (stryCov_9fa48("3775"), () => onChange(stryMutAct_9fa48("3776") ? {} : (stryCov_9fa48("3776"), {
            ...build,
            caseColor: item.color
          })))}>
              <span aria-hidden="true" style={stryMutAct_9fa48("3777") ? {} : (stryCov_9fa48("3777"), {
              background: item.color
            })} />
              {item.name}
            </button>))}
        </div>
      </fieldset>
      <p className="preview-tip">
        Colors are visual studies, not confirmed finishes sold by the maker.
      </p>
      <output aria-live="polite">
        {changes.length ? stryMutAct_9fa48("3778") ? `` : (stryCov_9fa48("3778"), `${changes.length} ${(stryMutAct_9fa48("3781") ? changes.length !== 1 : stryMutAct_9fa48("3780") ? false : stryMutAct_9fa48("3779") ? true : (stryCov_9fa48("3779", "3780", "3781"), changes.length === 1)) ? stryMutAct_9fa48("3782") ? "" : (stryCov_9fa48("3782"), 'setting') : stryMutAct_9fa48("3783") ? "" : (stryCov_9fa48("3783"), 'settings')} changed from the original.`) : stryMutAct_9fa48("3784") ? "" : (stryCov_9fa48("3784"), 'Viewing the original build.')}
      </output>
      <button className="preview-customize" onClick={() => {
        if (stryMutAct_9fa48("3785")) {
          {}
        } else {
          stryCov_9fa48("3785");
          const url = URL.createObjectURL(new Blob(stryMutAct_9fa48("3786") ? [] : (stryCov_9fa48("3786"), [JSON.stringify(build, null, 2)]), stryMutAct_9fa48("3787") ? {} : (stryCov_9fa48("3787"), {
            type: stryMutAct_9fa48("3788") ? "" : (stryCov_9fa48("3788"), 'application/json')
          })));
          const link = document.createElement(stryMutAct_9fa48("3789") ? "" : (stryCov_9fa48("3789"), 'a'));
          link.href = url;
          link.download = stryMutAct_9fa48("3790") ? "" : (stryCov_9fa48("3790"), 'keyconf-variation.json');
          if (stryMutAct_9fa48("3791")) {
            ;
          } else {
            stryCov_9fa48("3791");
            link.click();
          }
          setTimeout(stryMutAct_9fa48("3793") ? () => undefined : (stryCov_9fa48("3793"), () => URL.revokeObjectURL(url)), 1000);
        }
      }}>
        Download this variation
      </button>
      {stryMutAct_9fa48("3796") ? changes.length > 0 || <>
          <details className="preview-change-review">
            <summary>Review your changes</summary>
            <BuildChangeList changes={changes} beforeLabel="Original" afterLabel="Your variation" />
          </details>
          <button className="preview-customize" onClick={() => onChange(original)}>
            Reset to original
          </button>
        </> : stryMutAct_9fa48("3795") ? false : stryMutAct_9fa48("3794") ? true : (stryCov_9fa48("3794", "3795", "3796"), (stryMutAct_9fa48("3799") ? changes.length <= 0 : stryMutAct_9fa48("3798") ? changes.length >= 0 : stryMutAct_9fa48("3797") ? true : (stryCov_9fa48("3797", "3798", "3799"), changes.length > 0)) && <>
          <details className="preview-change-review">
            <summary>Review your changes</summary>
            <BuildChangeList changes={changes} beforeLabel="Original" afterLabel="Your variation" />
          </details>
          <button className="preview-customize" onClick={stryMutAct_9fa48("3800") ? () => undefined : (stryCov_9fa48("3800"), () => onChange(original))}>
            Reset to original
          </button>
        </>)}
    </details>;
  }
}
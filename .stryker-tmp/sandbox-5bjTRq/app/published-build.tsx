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
import ArchivedBuild from './archived-build';
import type { PublicPublication } from '../db/publications';
import { encodeBuild } from '../lib/build';
import SharedBuildPreview from './shared-build-preview';
import './shared-build-preview.css';
export default function PublishedBuild({
  publication
}: {
  publication: PublicPublication;
}) {
  if (stryMutAct_9fa48("3814")) {
    {}
  } else {
    stryCov_9fa48("3814");
    const {
      author,
      release
    } = publication;
    const creatorDetails = <section className="publication-author" aria-label="Creator and release">
      <div>
        <span className="preview-eyebrow">
          {(stryMutAct_9fa48("3817") ? release.kind !== 'drop' : stryMutAct_9fa48("3816") ? false : stryMutAct_9fa48("3815") ? true : (stryCov_9fa48("3815", "3816", "3817"), release.kind === (stryMutAct_9fa48("3818") ? "" : (stryCov_9fa48("3818"), 'drop')))) ? stryMutAct_9fa48("3819") ? "" : (stryCov_9fa48("3819"), 'CREATOR DROP') : stryMutAct_9fa48("3820") ? "" : (stryCov_9fa48("3820"), 'PUBLISHED BUILD')}
        </span>
        <h2>
          {author.displayName} <small>@{author.handle}</small>
        </h2>
        <p>{publication.note}</p>
      </div>
      <div className="publication-links">
        {author.links.map(stryMutAct_9fa48("3821") ? () => undefined : (stryCov_9fa48("3821"), link => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
            {link.label} ↗
          </a>))}
      </div>
      {stryMutAct_9fa48("3824") ? release.kind === 'drop' || <div>
          <p>{release.availability}</p>
          {release.externalUrl && <a href={release.externalUrl} target="_blank" rel="noreferrer">
              Visit the creator ↗
            </a>}
        </div> : stryMutAct_9fa48("3823") ? false : stryMutAct_9fa48("3822") ? true : (stryCov_9fa48("3822", "3823", "3824"), (stryMutAct_9fa48("3826") ? release.kind !== 'drop' : stryMutAct_9fa48("3825") ? true : (stryCov_9fa48("3825", "3826"), release.kind === (stryMutAct_9fa48("3827") ? "" : (stryCov_9fa48("3827"), 'drop')))) && <div>
          <p>{release.availability}</p>
          {stryMutAct_9fa48("3830") ? release.externalUrl || <a href={release.externalUrl} target="_blank" rel="noreferrer">
              Visit the creator ↗
            </a> : stryMutAct_9fa48("3829") ? false : stryMutAct_9fa48("3828") ? true : (stryCov_9fa48("3828", "3829", "3830"), release.externalUrl && <a href={release.externalUrl} target="_blank" rel="noreferrer">
              Visit the creator ↗
            </a>)}
        </div>)}
      <button onClick={() => {
        if (stryMutAct_9fa48("3831")) {
          {}
        } else {
          stryCov_9fa48("3831");
          const url = URL.createObjectURL(new Blob(stryMutAct_9fa48("3832") ? [] : (stryCov_9fa48("3832"), [JSON.stringify(publication.build, null, 2)]), stryMutAct_9fa48("3833") ? {} : (stryCov_9fa48("3833"), {
            type: stryMutAct_9fa48("3834") ? "" : (stryCov_9fa48("3834"), 'application/json')
          })));
          const link = document.createElement(stryMutAct_9fa48("3835") ? "" : (stryCov_9fa48("3835"), 'a'));
          link.href = url;
          link.download = stryMutAct_9fa48("3836") ? "" : (stryCov_9fa48("3836"), 'keyconf-build.json');
          if (stryMutAct_9fa48("3837")) {
            ;
          } else {
            stryCov_9fa48("3837");
            link.click();
          }
          setTimeout(stryMutAct_9fa48("3839") ? () => undefined : (stryCov_9fa48("3839"), () => URL.revokeObjectURL(url)), 1000);
        }
      }}>
        Download build file
      </button>
    </section>;
    return <>
      {(stryMutAct_9fa48("3842") ? publication.customization !== 'available' : stryMutAct_9fa48("3841") ? false : stryMutAct_9fa48("3840") ? true : (stryCov_9fa48("3840", "3841", "3842"), publication.customization === (stryMutAct_9fa48("3843") ? "" : (stryCov_9fa48("3843"), 'available')))) ? <SharedBuildPreview build={publication.build} record={stryMutAct_9fa48("3844") ? {} : (stryCov_9fa48("3844"), {
        kind: stryMutAct_9fa48("3845") ? "" : (stryCov_9fa48("3845"), 'publication'),
        value: publication
      })} creatorDetails={creatorDetails} onCustomize={draft => {
        if (stryMutAct_9fa48("3846")) {
          {}
        } else {
          stryCov_9fa48("3846");
          window.location.href = stryMutAct_9fa48("3847") ? `` : (stryCov_9fa48("3847"), `/#build=${encodeBuild(draft)}`);
        }
      }} /> : <ArchivedBuild snapshot={publication} details={creatorDetails} kind="publication" />}
    </>;
  }
}
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
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Search } from 'lucide-react';
import type { Part } from '../lib/catalog';
import type { AccessoryProduct } from '../lib/build-accessories';
import { searchStudio, type StudioDestination, type StudioSearchResult } from '../lib/studio-search';
import './studio-search.css';
type ProductResult = Exclude<StudioSearchResult, {
  kind: 'destination';
}>;
export default function StudioSearch({
  parts,
  accessories,
  canAddAccessory,
  onNavigate,
  onPart,
  onAccessory
}: {
  parts: Part[];
  accessories: readonly AccessoryProduct[];
  canAddAccessory: boolean;
  onNavigate: (destination: StudioDestination) => void;
  onPart: (part: Part) => void;
  onAccessory: (part: AccessoryProduct) => void;
}) {
  if (stryMutAct_9fa48("4454")) {
    {}
  } else {
    stryCov_9fa48("4454");
    const [query, setQuery] = useState(stryMutAct_9fa48("4455") ? "Stryker was here!" : (stryCov_9fa48("4455"), ''));
    const [selected, setSelected] = useState<ProductResult | null>(null);
    const input = useRef<HTMLInputElement>(null);
    const title = useRef<HTMLHeadingElement>(null);
    const results = useRef<HTMLUListElement>(null);
    const matches = searchStudio(query, parts, accessories);
    useEffect(() => {
      if (stryMutAct_9fa48("4457")) {
        {}
      } else {
        stryCov_9fa48("4457");
        if (stryMutAct_9fa48("4459") ? false : stryMutAct_9fa48("4458") ? true : (stryCov_9fa48("4458", "4459"), selected)) stryMutAct_9fa48("4460") ? title.current.focus() : (stryCov_9fa48("4460"), title.current?.focus());else stryMutAct_9fa48("4461") ? input.current.focus() : (stryCov_9fa48("4461"), input.current?.focus());
      }
    }, stryMutAct_9fa48("4462") ? [] : (stryCov_9fa48("4462"), [selected]));
    if (stryMutAct_9fa48("4464") ? false : stryMutAct_9fa48("4463") ? true : (stryCov_9fa48("4463", "4464"), selected)) return <section className="studio-search search-detail">
        <button className="text-button" onClick={stryMutAct_9fa48("4465") ? () => undefined : (stryCov_9fa48("4465"), () => setSelected(null))}>
          <ArrowLeft size={16} /> Back to results
        </button>
        <p className="search-kind">
          {(stryMutAct_9fa48("4468") ? selected.kind !== 'part' : stryMutAct_9fa48("4467") ? false : stryMutAct_9fa48("4466") ? true : (stryCov_9fa48("4466", "4467", "4468"), selected.kind === (stryMutAct_9fa48("4469") ? "" : (stryCov_9fa48("4469"), 'part')))) ? selected.item.category : selected.item.kind}{stryMutAct_9fa48("4470") ? "" : (stryCov_9fa48("4470"), ' ')}
          · {selected.item.brand}
        </p>
        <h2 tabIndex={stryMutAct_9fa48("4471") ? +1 : (stryCov_9fa48("4471"), -1)} ref={title}>
          {selected.item.name}
        </h2>
        <p>{selected.item.detail}</p>
        <a className="search-source" href={selected.item.source} target="_blank" rel="noreferrer">
          Visit original source <ArrowUpRight size={16} />
        </a>
        <p className="search-scope">
          {(stryMutAct_9fa48("4474") ? selected.kind !== 'part' : stryMutAct_9fa48("4473") ? false : stryMutAct_9fa48("4472") ? true : (stryCov_9fa48("4472", "4473", "4474"), selected.kind === (stryMutAct_9fa48("4475") ? "" : (stryCov_9fa48("4475"), 'part')))) ? stryMutAct_9fa48("4476") ? "" : (stryCov_9fa48("4476"), 'Selecting a part updates your parts list. Check compatibility in the builder. Appearance and sound remain separate choices.') : stryMutAct_9fa48("4477") ? "" : (stryCov_9fa48("4477"), 'Adds a product reference to your plan. Choose its placement in Parts & accessories. Physical fit and exact geometry may be unverified.')}
        </p>
        <button className="button" disabled={stryMutAct_9fa48("4480") ? selected.kind === 'accessory' || !canAddAccessory : stryMutAct_9fa48("4479") ? false : stryMutAct_9fa48("4478") ? true : (stryCov_9fa48("4478", "4479", "4480"), (stryMutAct_9fa48("4482") ? selected.kind !== 'accessory' : stryMutAct_9fa48("4481") ? true : (stryCov_9fa48("4481", "4482"), selected.kind === (stryMutAct_9fa48("4483") ? "" : (stryCov_9fa48("4483"), 'accessory')))) && (stryMutAct_9fa48("4484") ? canAddAccessory : (stryCov_9fa48("4484"), !canAddAccessory)))} onClick={stryMutAct_9fa48("4485") ? () => undefined : (stryCov_9fa48("4485"), () => (stryMutAct_9fa48("4488") ? selected.kind !== 'part' : stryMutAct_9fa48("4487") ? false : stryMutAct_9fa48("4486") ? true : (stryCov_9fa48("4486", "4487", "4488"), selected.kind === (stryMutAct_9fa48("4489") ? "" : (stryCov_9fa48("4489"), 'part')))) ? onPart(selected.item) : onAccessory(selected.item))}>
          {(stryMutAct_9fa48("4492") ? selected.kind !== 'part' : stryMutAct_9fa48("4491") ? false : stryMutAct_9fa48("4490") ? true : (stryCov_9fa48("4490", "4491", "4492"), selected.kind === (stryMutAct_9fa48("4493") ? "" : (stryCov_9fa48("4493"), 'part')))) ? stryMutAct_9fa48("4494") ? "" : (stryCov_9fa48("4494"), 'Use in build') : stryMutAct_9fa48("4495") ? "" : (stryCov_9fa48("4495"), 'Add to plan')}{stryMutAct_9fa48("4496") ? "" : (stryCov_9fa48("4496"), ' ')}
          <ArrowRight size={16} />
        </button>
        {stryMutAct_9fa48("4499") ? selected.kind === 'accessory' && !canAddAccessory || <p>
            There are already 100 accessory selections. Remove one from your
            plan before adding another.
          </p> : stryMutAct_9fa48("4498") ? false : stryMutAct_9fa48("4497") ? true : (stryCov_9fa48("4497", "4498", "4499"), (stryMutAct_9fa48("4501") ? selected.kind === 'accessory' || !canAddAccessory : stryMutAct_9fa48("4500") ? true : (stryCov_9fa48("4500", "4501"), (stryMutAct_9fa48("4503") ? selected.kind !== 'accessory' : stryMutAct_9fa48("4502") ? true : (stryCov_9fa48("4502", "4503"), selected.kind === (stryMutAct_9fa48("4504") ? "" : (stryCov_9fa48("4504"), 'accessory')))) && (stryMutAct_9fa48("4505") ? canAddAccessory : (stryCov_9fa48("4505"), !canAddAccessory)))) && <p>
            There are already 100 accessory selections. Remove one from your
            plan before adding another.
          </p>)}
      </section>;
    return <section className="studio-search">
      <h2>Find your next detail.</h2>
      <label className="search-entry">
        <Search size={20} />
        <input ref={input} type="search" name="studio-search" aria-label="Search parts and studio" placeholder="Parts, makers, or a place to go…" maxLength={120} value={query} onChange={stryMutAct_9fa48("4506") ? () => undefined : (stryCov_9fa48("4506"), event => setQuery(event.target.value))} onKeyDown={event => {
          if (stryMutAct_9fa48("4507")) {
            {}
          } else {
            stryCov_9fa48("4507");
            if (stryMutAct_9fa48("4510") ? event.key !== 'ArrowDown' : stryMutAct_9fa48("4509") ? false : stryMutAct_9fa48("4508") ? true : (stryCov_9fa48("4508", "4509", "4510"), event.key === (stryMutAct_9fa48("4511") ? "" : (stryCov_9fa48("4511"), 'ArrowDown')))) {
              if (stryMutAct_9fa48("4512")) {
                {}
              } else {
                stryCov_9fa48("4512");
                if (stryMutAct_9fa48("4513")) {
                  ;
                } else {
                  stryCov_9fa48("4513");
                  event.preventDefault();
                }
                stryMutAct_9fa48("4515") ? results.current.querySelector('button')?.focus() : stryMutAct_9fa48("4514") ? results.current?.querySelector('button').focus() : (stryCov_9fa48("4514", "4515"), results.current?.querySelector(stryMutAct_9fa48("4516") ? "" : (stryCov_9fa48("4516"), 'button'))?.focus());
              }
            }
          }
        }} />
      </label>
      <output className="search-count">
        {(stryMutAct_9fa48("4517") ? query : (stryCov_9fa48("4517"), query.trim())) ? stryMutAct_9fa48("4518") ? `` : (stryCov_9fa48("4518"), `${matches.length} ${(stryMutAct_9fa48("4521") ? matches.length !== 1 : stryMutAct_9fa48("4520") ? false : stryMutAct_9fa48("4519") ? true : (stryCov_9fa48("4519", "4520", "4521"), matches.length === 1)) ? stryMutAct_9fa48("4522") ? "" : (stryCov_9fa48("4522"), 'result') : stryMutAct_9fa48("4523") ? "" : (stryCov_9fa48("4523"), 'results')} in your catalog`) : stryMutAct_9fa48("4524") ? "" : (stryCov_9fa48("4524"), 'Jump to a workspace, or search parts and makers.')}
      </output>
      {(stryMutAct_9fa48("4527") ? matches.length !== 0 : stryMutAct_9fa48("4526") ? false : stryMutAct_9fa48("4525") ? true : (stryCov_9fa48("4525", "4526", "4527"), matches.length === 0)) ? <p className="search-empty">
          No matches yet. Try a maker, switch name, or “artisan”. This catalog
          is curated, not exhaustive. You can also import a website from the
          studio.
        </p> : <ul ref={results} className="search-results">
          {matches.map(stryMutAct_9fa48("4528") ? () => undefined : (stryCov_9fa48("4528"), result => <li key={stryMutAct_9fa48("4529") ? `` : (stryCov_9fa48("4529"), `${result.kind}:${result.item.id}`)}>
              <button onKeyDown={event => {
            if (stryMutAct_9fa48("4530")) {
              {}
            } else {
              stryCov_9fa48("4530");
              if (stryMutAct_9fa48("4533") ? false : stryMutAct_9fa48("4532") ? true : stryMutAct_9fa48("4531") ? ['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key) : (stryCov_9fa48("4531", "4532", "4533"), !(stryMutAct_9fa48("4534") ? [] : (stryCov_9fa48("4534"), [stryMutAct_9fa48("4535") ? "" : (stryCov_9fa48("4535"), 'ArrowDown'), stryMutAct_9fa48("4536") ? "" : (stryCov_9fa48("4536"), 'ArrowUp'), stryMutAct_9fa48("4537") ? "" : (stryCov_9fa48("4537"), 'Home'), stryMutAct_9fa48("4538") ? "" : (stryCov_9fa48("4538"), 'End')])).includes(event.key))) return;
              const buttons = Array.from(stryMutAct_9fa48("4539") ? results.current?.querySelectorAll('button') && [] : (stryCov_9fa48("4539"), (stryMutAct_9fa48("4540") ? results.current.querySelectorAll('button') : (stryCov_9fa48("4540"), results.current?.querySelectorAll(stryMutAct_9fa48("4541") ? "" : (stryCov_9fa48("4541"), 'button')))) ?? (stryMutAct_9fa48("4542") ? ["Stryker was here"] : (stryCov_9fa48("4542"), []))));
              const current = buttons.findIndex(stryMutAct_9fa48("4543") ? () => undefined : (stryCov_9fa48("4543"), button => stryMutAct_9fa48("4546") ? button !== event.target : stryMutAct_9fa48("4545") ? false : stryMutAct_9fa48("4544") ? true : (stryCov_9fa48("4544", "4545", "4546"), button === event.target)));
              if (stryMutAct_9fa48("4550") ? current >= 0 : stryMutAct_9fa48("4549") ? current <= 0 : stryMutAct_9fa48("4548") ? false : stryMutAct_9fa48("4547") ? true : (stryCov_9fa48("4547", "4548", "4549", "4550"), current < 0)) return;
              if (stryMutAct_9fa48("4551")) {
                ;
              } else {
                stryCov_9fa48("4551");
                event.preventDefault();
              }
              const index = (stryMutAct_9fa48("4554") ? event.key !== 'Home' : stryMutAct_9fa48("4553") ? false : stryMutAct_9fa48("4552") ? true : (stryCov_9fa48("4552", "4553", "4554"), event.key === (stryMutAct_9fa48("4555") ? "" : (stryCov_9fa48("4555"), 'Home')))) ? 0 : (stryMutAct_9fa48("4558") ? event.key !== 'End' : stryMutAct_9fa48("4557") ? false : stryMutAct_9fa48("4556") ? true : (stryCov_9fa48("4556", "4557", "4558"), event.key === (stryMutAct_9fa48("4559") ? "" : (stryCov_9fa48("4559"), 'End')))) ? stryMutAct_9fa48("4560") ? buttons.length + 1 : (stryCov_9fa48("4560"), buttons.length - 1) : stryMutAct_9fa48("4561") ? (current + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) * buttons.length : (stryCov_9fa48("4561"), (stryMutAct_9fa48("4562") ? current + (event.key === 'ArrowDown' ? 1 : -1) - buttons.length : (stryCov_9fa48("4562"), (stryMutAct_9fa48("4563") ? current - (event.key === 'ArrowDown' ? 1 : -1) : (stryCov_9fa48("4563"), current + ((stryMutAct_9fa48("4566") ? event.key !== 'ArrowDown' : stryMutAct_9fa48("4565") ? false : stryMutAct_9fa48("4564") ? true : (stryCov_9fa48("4564", "4565", "4566"), event.key === (stryMutAct_9fa48("4567") ? "" : (stryCov_9fa48("4567"), 'ArrowDown')))) ? 1 : stryMutAct_9fa48("4568") ? +1 : (stryCov_9fa48("4568"), -1)))) + buttons.length)) % buttons.length);
              stryMutAct_9fa48("4569") ? buttons[index].focus() : (stryCov_9fa48("4569"), buttons[index]?.focus());
            }
          }} onClick={stryMutAct_9fa48("4570") ? () => undefined : (stryCov_9fa48("4570"), () => (stryMutAct_9fa48("4573") ? result.kind !== 'destination' : stryMutAct_9fa48("4572") ? false : stryMutAct_9fa48("4571") ? true : (stryCov_9fa48("4571", "4572", "4573"), result.kind === (stryMutAct_9fa48("4574") ? "" : (stryCov_9fa48("4574"), 'destination')))) ? onNavigate(result.item.id) : setSelected(result))}>
                <span>
                  <strong>{result.item.name}</strong>
                  <small>
                    {(stryMutAct_9fa48("4577") ? result.kind !== 'destination' : stryMutAct_9fa48("4576") ? false : stryMutAct_9fa48("4575") ? true : (stryCov_9fa48("4575", "4576", "4577"), result.kind === (stryMutAct_9fa48("4578") ? "" : (stryCov_9fa48("4578"), 'destination')))) ? result.item.detail : stryMutAct_9fa48("4579") ? `` : (stryCov_9fa48("4579"), `${result.item.brand} · ${(stryMutAct_9fa48("4582") ? result.kind !== 'part' : stryMutAct_9fa48("4581") ? false : stryMutAct_9fa48("4580") ? true : (stryCov_9fa48("4580", "4581", "4582"), result.kind === (stryMutAct_9fa48("4583") ? "" : (stryCov_9fa48("4583"), 'part')))) ? result.item.category : result.item.kind}`)}
                  </small>
                </span>
                <ArrowRight size={16} />
              </button>
            </li>))}
        </ul>}
      <p className="search-hint">
        Arrow keys to browse · Enter to open · Esc to close
      </p>
    </section>;
  }
}
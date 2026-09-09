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
import { useState, useMemo } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import data from '../data/premium-keyboards.json';
export default function PremiumKeyboards() {
  if (stryMutAct_9fa48("3607")) {
    {}
  } else {
    stryCov_9fa48("3607");
    const [query, setQuery] = useState(stryMutAct_9fa48("3608") ? "Stryker was here!" : (stryCov_9fa48("3608"), ''));
    const [kindFilter, setKindFilter] = useState<'all' | 'complete' | 'kit'>(stryMutAct_9fa48("3609") ? "" : (stryCov_9fa48("3609"), 'all'));
    const boards = data.boards;
    const filtered = useMemo(() => {
      if (stryMutAct_9fa48("3610")) {
        {}
      } else {
        stryCov_9fa48("3610");
        const q = stryMutAct_9fa48("3612") ? query.toUpperCase().trim() : stryMutAct_9fa48("3611") ? query.toLowerCase() : (stryCov_9fa48("3611", "3612"), query.toLowerCase().trim());
        return stryMutAct_9fa48("3613") ? boards : (stryCov_9fa48("3613"), boards.filter(b => {
          if (stryMutAct_9fa48("3614")) {
            {}
          } else {
            stryCov_9fa48("3614");
            const match = stryMutAct_9fa48("3617") ? (!q || b.brand.toLowerCase().includes(q) || b.name.toLowerCase().includes(q)) && b.description.toLowerCase().includes(q) : stryMutAct_9fa48("3616") ? false : stryMutAct_9fa48("3615") ? true : (stryCov_9fa48("3615", "3616", "3617"), (stryMutAct_9fa48("3619") ? (!q || b.brand.toLowerCase().includes(q)) && b.name.toLowerCase().includes(q) : stryMutAct_9fa48("3618") ? false : (stryCov_9fa48("3618", "3619"), (stryMutAct_9fa48("3621") ? !q && b.brand.toLowerCase().includes(q) : stryMutAct_9fa48("3620") ? false : (stryCov_9fa48("3620", "3621"), (stryMutAct_9fa48("3622") ? q : (stryCov_9fa48("3622"), !q)) || (stryMutAct_9fa48("3623") ? b.brand.toUpperCase().includes(q) : (stryCov_9fa48("3623"), b.brand.toLowerCase().includes(q))))) || (stryMutAct_9fa48("3624") ? b.name.toUpperCase().includes(q) : (stryCov_9fa48("3624"), b.name.toLowerCase().includes(q))))) || (stryMutAct_9fa48("3625") ? b.description.toUpperCase().includes(q) : (stryCov_9fa48("3625"), b.description.toLowerCase().includes(q))));
            if (stryMutAct_9fa48("3628") ? false : stryMutAct_9fa48("3627") ? true : stryMutAct_9fa48("3626") ? match : (stryCov_9fa48("3626", "3627", "3628"), !match)) return stryMutAct_9fa48("3629") ? true : (stryCov_9fa48("3629"), false);
            if (stryMutAct_9fa48("3632") ? kindFilter !== 'all' : stryMutAct_9fa48("3631") ? false : stryMutAct_9fa48("3630") ? true : (stryCov_9fa48("3630", "3631", "3632"), kindFilter === (stryMutAct_9fa48("3633") ? "" : (stryCov_9fa48("3633"), 'all')))) return stryMutAct_9fa48("3634") ? false : (stryCov_9fa48("3634"), true);
            return stryMutAct_9fa48("3635") ? b.offers.every(o => o.kind === kindFilter) : (stryCov_9fa48("3635"), b.offers.some(stryMutAct_9fa48("3636") ? () => undefined : (stryCov_9fa48("3636"), o => stryMutAct_9fa48("3639") ? o.kind !== kindFilter : stryMutAct_9fa48("3638") ? false : stryMutAct_9fa48("3637") ? true : (stryCov_9fa48("3637", "3638", "3639"), o.kind === kindFilter))));
          }
        }));
      }
    }, stryMutAct_9fa48("3640") ? [] : (stryCov_9fa48("3640"), [boards, query, kindFilter]));
    return <section className="research-products" aria-label="Premium keyboard catalog">
      <h3>Premium keyboard discovery</h3>
      <p className="muted">
        Source-backed product references for high-price keyboard boards, kits,
        and charging ecosystems. Geometry is unmodeled until verified CAD is
        released. Prices are from official listings (2026-09-08) and may vary.
      </p>
      <label className="catalog-search">
        <Search size={17} aria-hidden="true" />
        <input type="search" aria-label="Search premium keyboards" placeholder="Search Angry Miao, CYBERBOARD, HATSU..." value={query} onChange={stryMutAct_9fa48("3641") ? () => undefined : (stryCov_9fa48("3641"), e => setQuery(e.target.value))} />
      </label>
      <fieldset className="catalog-filters" aria-label="Premium type filter">
        {(stryMutAct_9fa48("3642") ? [] : (stryCov_9fa48("3642"), [stryMutAct_9fa48("3643") ? [] : (stryCov_9fa48("3643"), [stryMutAct_9fa48("3644") ? "" : (stryCov_9fa48("3644"), 'all'), stryMutAct_9fa48("3645") ? "" : (stryCov_9fa48("3645"), 'All')]), stryMutAct_9fa48("3646") ? [] : (stryCov_9fa48("3646"), [stryMutAct_9fa48("3647") ? "" : (stryCov_9fa48("3647"), 'complete'), stryMutAct_9fa48("3648") ? "" : (stryCov_9fa48("3648"), 'Full')]), stryMutAct_9fa48("3649") ? [] : (stryCov_9fa48("3649"), [stryMutAct_9fa48("3650") ? "" : (stryCov_9fa48("3650"), 'kit'), stryMutAct_9fa48("3651") ? "" : (stryCov_9fa48("3651"), 'Kit')])])).map(stryMutAct_9fa48("3652") ? () => undefined : (stryCov_9fa48("3652"), ([value, name]) => <button key={value} aria-pressed={stryMutAct_9fa48("3655") ? kindFilter !== value : stryMutAct_9fa48("3654") ? false : stryMutAct_9fa48("3653") ? true : (stryCov_9fa48("3653", "3654", "3655"), kindFilter === value)} onClick={stryMutAct_9fa48("3656") ? () => undefined : (stryCov_9fa48("3656"), () => setKindFilter(value as typeof kindFilter))}>
            {name}
          </button>))}
      </fieldset>
      <div className="research-product-list">
        {filtered.map(board => {
          if (stryMutAct_9fa48("3657")) {
            {}
          } else {
            stryCov_9fa48("3657");
            const best = board.offers.reduce(stryMutAct_9fa48("3658") ? () => undefined : (stryCov_9fa48("3658"), (a, b) => (stryMutAct_9fa48("3662") ? b.amount <= a.amount : stryMutAct_9fa48("3661") ? b.amount >= a.amount : stryMutAct_9fa48("3660") ? false : stryMutAct_9fa48("3659") ? true : (stryCov_9fa48("3659", "3660", "3661", "3662"), b.amount > a.amount)) ? b : a));
            return <a key={board.id} href={board.source} target="_blank" rel="noreferrer" className="research-product" aria-label={stryMutAct_9fa48("3663") ? `` : (stryCov_9fa48("3663"), `${board.brand} ${board.name}: ${best.amount} USD, ${best.availability}`)}>
              <span className="catalog-brand">
                {board.brand} ·{stryMutAct_9fa48("3664") ? "" : (stryCov_9fa48("3664"), ' ')}
                {(stryMutAct_9fa48("3667") ? best.kind !== 'complete' : stryMutAct_9fa48("3666") ? false : stryMutAct_9fa48("3665") ? true : (stryCov_9fa48("3665", "3666", "3667"), best.kind === (stryMutAct_9fa48("3668") ? "" : (stryCov_9fa48("3668"), 'complete')))) ? stryMutAct_9fa48("3669") ? "" : (stryCov_9fa48("3669"), 'Full') : stryMutAct_9fa48("3670") ? "" : (stryCov_9fa48("3670"), 'Kit')}
              </span>
              <strong>
                {board.name} <ArrowUpRight size={14} />
              </strong>
              <span>
                {(stryMutAct_9fa48("3674") ? best.amount <= 0 : stryMutAct_9fa48("3673") ? best.amount >= 0 : stryMutAct_9fa48("3672") ? false : stryMutAct_9fa48("3671") ? true : (stryCov_9fa48("3671", "3672", "3673", "3674"), best.amount > 0)) ? stryMutAct_9fa48("3675") ? `` : (stryCov_9fa48("3675"), `$${best.amount}`) : stryMutAct_9fa48("3676") ? "" : (stryCov_9fa48("3676"), 'Price unverified')} ·{stryMutAct_9fa48("3677") ? "" : (stryCov_9fa48("3677"), ' ')}
                {(stryMutAct_9fa48("3680") ? best.availability !== 'available' : stryMutAct_9fa48("3679") ? false : stryMutAct_9fa48("3678") ? true : (stryCov_9fa48("3678", "3679", "3680"), best.availability === (stryMutAct_9fa48("3681") ? "" : (stryCov_9fa48("3681"), 'available')))) ? stryMutAct_9fa48("3682") ? "" : (stryCov_9fa48("3682"), 'Available') : (stryMutAct_9fa48("3685") ? best.availability !== 'sold-out' : stryMutAct_9fa48("3684") ? false : stryMutAct_9fa48("3683") ? true : (stryCov_9fa48("3683", "3684", "3685"), best.availability === (stryMutAct_9fa48("3686") ? "" : (stryCov_9fa48("3686"), 'sold-out')))) ? stryMutAct_9fa48("3687") ? "" : (stryCov_9fa48("3687"), 'Sold out') : stryMutAct_9fa48("3688") ? "" : (stryCov_9fa48("3688"), 'Unknown')}
                {(stryMutAct_9fa48("3691") ? board.geometry.status !== 'unmodeled' : stryMutAct_9fa48("3690") ? false : stryMutAct_9fa48("3689") ? true : (stryCov_9fa48("3689", "3690", "3691"), board.geometry.status === (stryMutAct_9fa48("3692") ? "" : (stryCov_9fa48("3692"), 'unmodeled')))) ? stryMutAct_9fa48("3693") ? "" : (stryCov_9fa48("3693"), ' · Unmodeled') : stryMutAct_9fa48("3694") ? "Stryker was here!" : (stryCov_9fa48("3694"), '')}
              </span>
            </a>;
          }
        })}
        {stryMutAct_9fa48("3697") ? !filtered.length || <p>No premium keyboards match. Try a different search.</p> : stryMutAct_9fa48("3696") ? false : stryMutAct_9fa48("3695") ? true : (stryCov_9fa48("3695", "3696", "3697"), (stryMutAct_9fa48("3698") ? filtered.length : (stryCov_9fa48("3698"), !filtered.length)) && <p>No premium keyboards match. Try a different search.</p>)}
      </div>
      <p className="catalog-provenance">
        Source-backed 2026-09-08. All geometry remains unmodeled until a
        licensed dimensioned source is published; previews are visual studies,
        not manufacturer CAD.
      </p>
    </section>;
  }
}
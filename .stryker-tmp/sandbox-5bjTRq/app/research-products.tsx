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
import { useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import data from '../data/research-seed.json';
import StoreObservations from './store-observations';
export default function ResearchProducts({
  onReviewSwitch
}: {
  onReviewSwitch: (source: string) => void;
}) {
  if (stryMutAct_9fa48("3848")) {
    {}
  } else {
    stryCov_9fa48("3848");
    const [query, setQuery] = useState(stryMutAct_9fa48("3849") ? "Stryker was here!" : (stryCov_9fa48("3849"), ''));
    const [category, setCategory] = useState(stryMutAct_9fa48("3850") ? "" : (stryCov_9fa48("3850"), 'all'));
    const products = stryMutAct_9fa48("3851") ? data.products : (stryCov_9fa48("3851"), data.products.filter(stryMutAct_9fa48("3852") ? () => undefined : (stryCov_9fa48("3852"), product => stryMutAct_9fa48("3855") ? category === 'all' || product.category === category || `${product.brand} ${product.name}`.toLowerCase().includes(query.toLowerCase().trim()) : stryMutAct_9fa48("3854") ? false : stryMutAct_9fa48("3853") ? true : (stryCov_9fa48("3853", "3854", "3855"), (stryMutAct_9fa48("3857") ? category === 'all' && product.category === category : stryMutAct_9fa48("3856") ? true : (stryCov_9fa48("3856", "3857"), (stryMutAct_9fa48("3859") ? category !== 'all' : stryMutAct_9fa48("3858") ? false : (stryCov_9fa48("3858", "3859"), category === (stryMutAct_9fa48("3860") ? "" : (stryCov_9fa48("3860"), 'all')))) || (stryMutAct_9fa48("3862") ? product.category !== category : stryMutAct_9fa48("3861") ? false : (stryCov_9fa48("3861", "3862"), product.category === category)))) && (stryMutAct_9fa48("3863") ? `${product.brand} ${product.name}`.toUpperCase().includes(query.toLowerCase().trim()) : (stryCov_9fa48("3863"), (stryMutAct_9fa48("3864") ? `` : (stryCov_9fa48("3864"), `${product.brand} ${product.name}`)).toLowerCase().includes(stryMutAct_9fa48("3866") ? query.toUpperCase().trim() : stryMutAct_9fa48("3865") ? query.toLowerCase() : (stryCov_9fa48("3865", "3866"), query.toLowerCase().trim()))))))));
    return <section className="research-products">
      <h3>Explore the product references</h3>
      <p className="muted">
        Keyboard, case and switch observations from the research dataset. These
        references expand the reading list; they do not establish a compatible
        assembly.
      </p>
      <label className="catalog-search">
        <Search size={17} aria-hidden="true" />
        <input type="search" aria-label="Search research products" placeholder="Search keyboards, cases and switches" value={query} onChange={stryMutAct_9fa48("3867") ? () => undefined : (stryCov_9fa48("3867"), event => setQuery(event.target.value))} />
      </label>
      <fieldset className="catalog-filters" aria-label="Research product category">
        {(stryMutAct_9fa48("3868") ? [] : (stryCov_9fa48("3868"), [stryMutAct_9fa48("3869") ? [] : (stryCov_9fa48("3869"), [stryMutAct_9fa48("3870") ? "" : (stryCov_9fa48("3870"), 'all'), stryMutAct_9fa48("3871") ? "" : (stryCov_9fa48("3871"), 'All')]), stryMutAct_9fa48("3872") ? [] : (stryCov_9fa48("3872"), [stryMutAct_9fa48("3873") ? "" : (stryCov_9fa48("3873"), 'keyboard'), stryMutAct_9fa48("3874") ? "" : (stryCov_9fa48("3874"), 'Keyboards')]), stryMutAct_9fa48("3875") ? [] : (stryCov_9fa48("3875"), [stryMutAct_9fa48("3876") ? "" : (stryCov_9fa48("3876"), 'case'), stryMutAct_9fa48("3877") ? "" : (stryCov_9fa48("3877"), 'Cases')]), stryMutAct_9fa48("3878") ? [] : (stryCov_9fa48("3878"), [stryMutAct_9fa48("3879") ? "" : (stryCov_9fa48("3879"), 'switch'), stryMutAct_9fa48("3880") ? "" : (stryCov_9fa48("3880"), 'Switches')])])).map(stryMutAct_9fa48("3881") ? () => undefined : (stryCov_9fa48("3881"), ([value, name]) => <button key={value} aria-pressed={stryMutAct_9fa48("3884") ? category !== value : stryMutAct_9fa48("3883") ? false : stryMutAct_9fa48("3882") ? true : (stryCov_9fa48("3882", "3883", "3884"), category === value)} onClick={stryMutAct_9fa48("3885") ? () => undefined : (stryCov_9fa48("3885"), () => setCategory(value))}>
            {name}
          </button>))}
      </fieldset>
      <p className="catalog-provenance">
        Observed {data.accessed_at}. July switch ranks come from kbd.news
        contributor lists, not global sales. ProSettings observations describe
        its tracked VALORANT players. Neither ranks every keyboard or case.
      </p>
      <div className="research-product-list">
        {products.map(product => {
          if (stryMutAct_9fa48("3886")) {
            {}
          } else {
            stryCov_9fa48("3886");
            const source = data.sources.find(stryMutAct_9fa48("3887") ? () => undefined : (stryCov_9fa48("3887"), source => stryMutAct_9fa48("3890") ? source.id !== product.source_id : stryMutAct_9fa48("3889") ? false : stryMutAct_9fa48("3888") ? true : (stryCov_9fa48("3888", "3889", "3890"), source.id === product.source_id)));
            const rank = data.popularity.find(stryMutAct_9fa48("3891") ? () => undefined : (stryCov_9fa48("3891"), item => stryMutAct_9fa48("3894") ? item.product_id === product.id || item.metric === 'aggregated_vendor_rank' : stryMutAct_9fa48("3893") ? false : stryMutAct_9fa48("3892") ? true : (stryCov_9fa48("3892", "3893", "3894"), (stryMutAct_9fa48("3896") ? item.product_id !== product.id : stryMutAct_9fa48("3895") ? true : (stryCov_9fa48("3895", "3896"), item.product_id === product.id)) && (stryMutAct_9fa48("3898") ? item.metric !== 'aggregated_vendor_rank' : stryMutAct_9fa48("3897") ? true : (stryCov_9fa48("3897", "3898"), item.metric === (stryMutAct_9fa48("3899") ? "" : (stryCov_9fa48("3899"), 'aggregated_vendor_rank')))))));
            return <a key={product.id} href={stryMutAct_9fa48("3900") ? source.url : (stryCov_9fa48("3900"), source?.url)} target="_blank" rel="noreferrer" className="research-product">
              <span className="catalog-brand">
                {product.brand} · {product.category}
              </span>
              <strong>
                {product.name} <ArrowUpRight size={14} />
              </strong>
              <span>
                {stryMutAct_9fa48("3901") ? source.publisher : (stryCov_9fa48("3901"), source?.publisher)}
                {rank ? stryMutAct_9fa48("3902") ? `` : (stryCov_9fa48("3902"), ` · July 2026 contributor rank ${rank.value}`) : stryMutAct_9fa48("3903") ? "Stryker was here!" : (stryCov_9fa48("3903"), '')}
              </span>
            </a>;
          }
        })}
        {stryMutAct_9fa48("3906") ? !products.length || <p>No references match. Try a different name or category.</p> : stryMutAct_9fa48("3905") ? false : stryMutAct_9fa48("3904") ? true : (stryCov_9fa48("3904", "3905", "3906"), (stryMutAct_9fa48("3907") ? products.length : (stryCov_9fa48("3907"), !products.length)) && <p>No references match. Try a different name or category.</p>)}
      </div>
      <StoreObservations onReview={onReviewSwitch} />
    </section>;
  }
}
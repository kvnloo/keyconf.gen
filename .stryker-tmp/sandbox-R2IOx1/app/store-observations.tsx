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
import { ArrowUpRight, Search } from 'lucide-react';
import { formatProductPrice } from '../lib/product-pricing';
type StoreData = Awaited<ReturnType<typeof import('../lib/store-observations').loadStoreObservations>>;
type LoadState = {
  kind: 'idle' | 'loading' | 'error';
} | {
  kind: 'ready';
  data: StoreData;
  refreshing: boolean;
};
export default function StoreObservations({
  onReview
}: {
  onReview: (source: string) => void;
}) {
  if (stryMutAct_9fa48("4334")) {
    {}
  } else {
    stryCov_9fa48("4334");
    const [state, setState] = useState<LoadState>(stryMutAct_9fa48("4335") ? {} : (stryCov_9fa48("4335"), {
      kind: stryMutAct_9fa48("4336") ? "" : (stryCov_9fa48("4336"), 'idle')
    }));
    const request = useRef<AbortController | null>(null);
    useEffect(stryMutAct_9fa48("4338") ? () => undefined : (stryCov_9fa48("4338"), () => stryMutAct_9fa48("4339") ? () => undefined : (stryCov_9fa48("4339"), () => stryMutAct_9fa48("4340") ? request.current.abort() : (stryCov_9fa48("4340"), request.current?.abort()))), stryMutAct_9fa48("4341") ? ["Stryker was here"] : (stryCov_9fa48("4341"), []));
    async function load() {
      if (stryMutAct_9fa48("4342")) {
        {}
      } else {
        stryCov_9fa48("4342");
        stryMutAct_9fa48("4343") ? request.current.abort() : (stryCov_9fa48("4343"), request.current?.abort());
        const controller = new AbortController();
        request.current = controller;
        setState(stryMutAct_9fa48("4345") ? () => undefined : (stryCov_9fa48("4345"), current => (stryMutAct_9fa48("4348") ? current.kind !== 'ready' : stryMutAct_9fa48("4347") ? false : stryMutAct_9fa48("4346") ? true : (stryCov_9fa48("4346", "4347", "4348"), current.kind === (stryMutAct_9fa48("4349") ? "" : (stryCov_9fa48("4349"), 'ready')))) ? stryMutAct_9fa48("4350") ? {} : (stryCov_9fa48("4350"), {
          ...current,
          refreshing: stryMutAct_9fa48("4351") ? false : (stryCov_9fa48("4351"), true)
        }) : stryMutAct_9fa48("4352") ? {} : (stryCov_9fa48("4352"), {
          kind: stryMutAct_9fa48("4353") ? "" : (stryCov_9fa48("4353"), 'loading')
        })));
        try {
          if (stryMutAct_9fa48("4354")) {
            {}
          } else {
            stryCov_9fa48("4354");
            const catalogModule = await import('../lib/store-observations');
            const data = await catalogModule.loadStoreObservations(new URL(window.location.href), controller.signal);
            if (stryMutAct_9fa48("4357") ? false : stryMutAct_9fa48("4356") ? true : stryMutAct_9fa48("4355") ? controller.signal.aborted : (stryCov_9fa48("4355", "4356", "4357"), !controller.signal.aborted)) setState(stryMutAct_9fa48("4359") ? {} : (stryCov_9fa48("4359"), {
              kind: stryMutAct_9fa48("4360") ? "" : (stryCov_9fa48("4360"), 'ready'),
              data,
              refreshing: stryMutAct_9fa48("4361") ? true : (stryCov_9fa48("4361"), false)
            }));
          }
        } catch {
          if (stryMutAct_9fa48("4362")) {
            {}
          } else {
            stryCov_9fa48("4362");
            if (stryMutAct_9fa48("4365") ? false : stryMutAct_9fa48("4364") ? true : stryMutAct_9fa48("4363") ? controller.signal.aborted : (stryCov_9fa48("4363", "4364", "4365"), !controller.signal.aborted)) setState(stryMutAct_9fa48("4367") ? {} : (stryCov_9fa48("4367"), {
              kind: stryMutAct_9fa48("4368") ? "" : (stryCov_9fa48("4368"), 'error')
            }));
          }
        }
      }
    }
    return <details className="research-products store-observations" onToggle={event => {
      if (stryMutAct_9fa48("4369")) {
        {}
      } else {
        stryCov_9fa48("4369");
        if (stryMutAct_9fa48("4372") ? !event.currentTarget.open && state.kind !== 'idle' : stryMutAct_9fa48("4371") ? false : stryMutAct_9fa48("4370") ? true : (stryCov_9fa48("4370", "4371", "4372"), (stryMutAct_9fa48("4373") ? event.currentTarget.open : (stryCov_9fa48("4373"), !event.currentTarget.open)) || (stryMutAct_9fa48("4375") ? state.kind === 'idle' : stryMutAct_9fa48("4374") ? false : (stryCov_9fa48("4374", "4375"), state.kind !== (stryMutAct_9fa48("4376") ? "" : (stryCov_9fa48("4376"), 'idle')))))) return;
        void load();
      }
    }}>
      <summary>
        Browse{stryMutAct_9fa48("4377") ? "" : (stryCov_9fa48("4377"), ' ')}
        {(stryMutAct_9fa48("4380") ? state.kind !== 'ready' : stryMutAct_9fa48("4379") ? false : stryMutAct_9fa48("4378") ? true : (stryCov_9fa48("4378", "4379", "4380"), state.kind === (stryMutAct_9fa48("4381") ? "" : (stryCov_9fa48("4381"), 'ready')))) ? state.data.storeListings.length + (stryMutAct_9fa48("4382") ? "" : (stryCov_9fa48("4382"), ' ')) : stryMutAct_9fa48("4383") ? "Stryker was here!" : (stryCov_9fa48("4383"), '')}
        observed switch options
      </summary>
      {stryMutAct_9fa48("4386") ? state.kind === 'loading' || <output>Loading store observations…</output> : stryMutAct_9fa48("4385") ? false : stryMutAct_9fa48("4384") ? true : (stryCov_9fa48("4384", "4385", "4386"), (stryMutAct_9fa48("4388") ? state.kind !== 'loading' : stryMutAct_9fa48("4387") ? true : (stryCov_9fa48("4387", "4388"), state.kind === (stryMutAct_9fa48("4389") ? "" : (stryCov_9fa48("4389"), 'loading')))) && <output>Loading store observations…</output>)}
      {stryMutAct_9fa48("4392") ? state.kind === 'error' || <div>
          <p>
            The store observations could not be loaded. Your build is unchanged.
          </p>
          <button className="button secondary" onClick={() => window.location.reload()}>
            Reload page
          </button>
        </div> : stryMutAct_9fa48("4391") ? false : stryMutAct_9fa48("4390") ? true : (stryCov_9fa48("4390", "4391", "4392"), (stryMutAct_9fa48("4394") ? state.kind !== 'error' : stryMutAct_9fa48("4393") ? true : (stryCov_9fa48("4393", "4394"), state.kind === (stryMutAct_9fa48("4395") ? "" : (stryCov_9fa48("4395"), 'error')))) && <div>
          <p>
            The store observations could not be loaded. Your build is unchanged.
          </p>
          <button className="button secondary" onClick={stryMutAct_9fa48("4396") ? () => undefined : (stryCov_9fa48("4396"), () => window.location.reload())}>
            Reload page
          </button>
        </div>)}
      {stryMutAct_9fa48("4399") ? state.kind === 'ready' || <>
          <output className="catalog-provenance">
            {state.refreshing ? 'Checking the hosted catalog…' : state.data.origin === 'hosted' ? 'Published catalog loaded. Observation dates are shown below.' : 'Hosted catalog unavailable. Showing the bundled snapshot.'}
          </output>
          {state.data.origin === 'bundled' && <button className="button secondary" disabled={state.refreshing} onClick={() => void load()}>
              Retry hosted catalog
            </button>}
          <ObservedOptions data={state.data} onReview={onReview} />
        </> : stryMutAct_9fa48("4398") ? false : stryMutAct_9fa48("4397") ? true : (stryCov_9fa48("4397", "4398", "4399"), (stryMutAct_9fa48("4401") ? state.kind !== 'ready' : stryMutAct_9fa48("4400") ? true : (stryCov_9fa48("4400", "4401"), state.kind === (stryMutAct_9fa48("4402") ? "" : (stryCov_9fa48("4402"), 'ready')))) && <>
          <output className="catalog-provenance">
            {state.refreshing ? stryMutAct_9fa48("4403") ? "" : (stryCov_9fa48("4403"), 'Checking the hosted catalog…') : (stryMutAct_9fa48("4406") ? state.data.origin !== 'hosted' : stryMutAct_9fa48("4405") ? false : stryMutAct_9fa48("4404") ? true : (stryCov_9fa48("4404", "4405", "4406"), state.data.origin === (stryMutAct_9fa48("4407") ? "" : (stryCov_9fa48("4407"), 'hosted')))) ? stryMutAct_9fa48("4408") ? "" : (stryCov_9fa48("4408"), 'Published catalog loaded. Observation dates are shown below.') : stryMutAct_9fa48("4409") ? "" : (stryCov_9fa48("4409"), 'Hosted catalog unavailable. Showing the bundled snapshot.')}
          </output>
          {stryMutAct_9fa48("4412") ? state.data.origin === 'bundled' || <button className="button secondary" disabled={state.refreshing} onClick={() => void load()}>
              Retry hosted catalog
            </button> : stryMutAct_9fa48("4411") ? false : stryMutAct_9fa48("4410") ? true : (stryCov_9fa48("4410", "4411", "4412"), (stryMutAct_9fa48("4414") ? state.data.origin !== 'bundled' : stryMutAct_9fa48("4413") ? true : (stryCov_9fa48("4413", "4414"), state.data.origin === (stryMutAct_9fa48("4415") ? "" : (stryCov_9fa48("4415"), 'bundled')))) && <button className="button secondary" disabled={state.refreshing} onClick={stryMutAct_9fa48("4416") ? () => undefined : (stryCov_9fa48("4416"), () => void load())}>
              Retry hosted catalog
            </button>)}
          <ObservedOptions data={state.data} onReview={onReview} />
        </>)}
    </details>;
  }
}
function ObservedOptions({
  data: {
    storeListings,
    storeSource
  },
  onReview
}: {
  data: StoreData;
  onReview: (source: string) => void;
}) {
  if (stryMutAct_9fa48("4417")) {
    {}
  } else {
    stryCov_9fa48("4417");
    const [query, setQuery] = useState(stryMutAct_9fa48("4418") ? "Stryker was here!" : (stryCov_9fa48("4418"), ''));
    const [limit, setLimit] = useState(12);
    const words = stryMutAct_9fa48("4420") ? query.toUpperCase().trim().split(/\s+/) : stryMutAct_9fa48("4419") ? query.toLowerCase().split(/\s+/) : (stryCov_9fa48("4419", "4420"), query.toLowerCase().trim().split(stryMutAct_9fa48("4422") ? /\S+/ : stryMutAct_9fa48("4421") ? /\s/ : (stryCov_9fa48("4421", "4422"), /\s+/)));
    const matches = stryMutAct_9fa48("4423") ? storeListings : (stryCov_9fa48("4423"), storeListings.filter(product => {
      if (stryMutAct_9fa48("4424")) {
        {}
      } else {
        stryCov_9fa48("4424");
        const text = stryMutAct_9fa48("4425") ? `${product.brand} ${product.name} ${product.sku}`.toUpperCase() : (stryCov_9fa48("4425"), (stryMutAct_9fa48("4426") ? `` : (stryCov_9fa48("4426"), `${product.brand} ${product.name} ${product.sku}`)).toLowerCase());
        return stryMutAct_9fa48("4427") ? words.some(word => text.includes(word)) : (stryCov_9fa48("4427"), words.every(stryMutAct_9fa48("4428") ? () => undefined : (stryCov_9fa48("4428"), word => text.includes(word))));
      }
    }));
    return <>
      <p className="muted">
        A partial snapshot of Divinikey&apos;s switch collection. Each row is a
        store variant, which may be a pack. Prices are for the named option, not
        per switch. Stock and prices may have changed. Fit has not been
        verified.
      </p>
      <a href={storeSource} target="_blank" rel="noreferrer">
        Check the current collection <ArrowUpRight size={14} />
      </a>
      <label className="catalog-search">
        <Search size={17} aria-hidden="true" />
        <input type="search" aria-label="Search observed switch options" placeholder="Search brand, switch or variant" value={query} onChange={event => {
          if (stryMutAct_9fa48("4429")) {
            {}
          } else {
            stryCov_9fa48("4429");
            if (stryMutAct_9fa48("4430")) {
              ;
            } else {
              stryCov_9fa48("4430");
              setQuery(event.target.value);
            }
            if (stryMutAct_9fa48("4431")) {
              ;
            } else {
              stryCov_9fa48("4431");
              setLimit(12);
            }
          }
        }} />
      </label>
      <output className="catalog-provenance">
        Showing {stryMutAct_9fa48("4432") ? Math.max(limit, matches.length) : (stryCov_9fa48("4432"), Math.min(limit, matches.length))} of {matches.length} matching
        options.
      </output>
      <div className="research-product-list">
        {stryMutAct_9fa48("4433") ? matches.map((product, index) => <article className="research-product" key={`${product.url}|${product.sku}|${product.observedAt}|${index}`}>
            <span className="catalog-brand">
              {product.brand} · Store observation
            </span>
            <a href={product.url} target="_blank" rel="noreferrer">
              <strong>
                {product.name} <ArrowUpRight size={14} />
              </strong>
            </a>
            <span>{formatProductPrice(product.pricing)} · Named option</span>
            <span>
              Observed{' '}
              <time dateTime={product.observedAt}>
                {product.observedAt.slice(0, 10)}
              </time>
              {product.availability ? ` · ${product.availability} then` : ''}
            </span>
            <button className="text-button" onClick={() => onReview(product.url)} aria-label={`Review import of ${product.name}`}>
              Review import
            </button>
          </article>) : (stryCov_9fa48("4433"), matches.slice(0, limit).map(stryMutAct_9fa48("4434") ? () => undefined : (stryCov_9fa48("4434"), (product, index) => <article className="research-product" key={stryMutAct_9fa48("4435") ? `` : (stryCov_9fa48("4435"), `${product.url}|${product.sku}|${product.observedAt}|${index}`)}>
            <span className="catalog-brand">
              {product.brand} · Store observation
            </span>
            <a href={product.url} target="_blank" rel="noreferrer">
              <strong>
                {product.name} <ArrowUpRight size={14} />
              </strong>
            </a>
            <span>{formatProductPrice(product.pricing)} · Named option</span>
            <span>
              Observed{stryMutAct_9fa48("4436") ? "" : (stryCov_9fa48("4436"), ' ')}
              <time dateTime={product.observedAt}>
                {stryMutAct_9fa48("4437") ? product.observedAt : (stryCov_9fa48("4437"), product.observedAt.slice(0, 10))}
              </time>
              {product.availability ? stryMutAct_9fa48("4438") ? `` : (stryCov_9fa48("4438"), ` · ${product.availability} then`) : stryMutAct_9fa48("4439") ? "Stryker was here!" : (stryCov_9fa48("4439"), '')}
            </span>
            <button className="text-button" onClick={stryMutAct_9fa48("4440") ? () => undefined : (stryCov_9fa48("4440"), () => onReview(product.url))} aria-label={stryMutAct_9fa48("4441") ? `` : (stryCov_9fa48("4441"), `Review import of ${product.name}`)}>
              Review import
            </button>
          </article>)))}
      </div>
      {stryMutAct_9fa48("4444") ? !matches.length || <p>No observed options match. Try a brand or switch name.</p> : stryMutAct_9fa48("4443") ? false : stryMutAct_9fa48("4442") ? true : (stryCov_9fa48("4442", "4443", "4444"), (stryMutAct_9fa48("4445") ? matches.length : (stryCov_9fa48("4445"), !matches.length)) && <p>No observed options match. Try a brand or switch name.</p>)}
      {stryMutAct_9fa48("4448") ? matches.length > limit || <button className="button secondary" onClick={() => setLimit(limit + 12)}>
          Show more options
        </button> : stryMutAct_9fa48("4447") ? false : stryMutAct_9fa48("4446") ? true : (stryCov_9fa48("4446", "4447", "4448"), (stryMutAct_9fa48("4451") ? matches.length <= limit : stryMutAct_9fa48("4450") ? matches.length >= limit : stryMutAct_9fa48("4449") ? true : (stryCov_9fa48("4449", "4450", "4451"), matches.length > limit)) && <button className="button secondary" onClick={stryMutAct_9fa48("4452") ? () => undefined : (stryCov_9fa48("4452"), () => setLimit(stryMutAct_9fa48("4453") ? limit - 12 : (stryCov_9fa48("4453"), limit + 12)))}>
          Show more options
        </button>)}
    </>;
  }
}
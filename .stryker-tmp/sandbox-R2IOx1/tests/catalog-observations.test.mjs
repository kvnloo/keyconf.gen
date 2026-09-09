// @ts-nocheck
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
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { ObservationCatalog, collectCatalog } from '../scripts/catalog/observations.ts';
const source = stryMutAct_9fa48("15910") ? "" : (stryCov_9fa48("15910"), 'https://switch-shop.example/collections/switches');
const next = stryMutAct_9fa48("15911") ? () => undefined : (stryCov_9fa48("15911"), (() => {
  const next = after => stryMutAct_9fa48("15912") ? {} : (stryCov_9fa48("15912"), {
    kind: stryMutAct_9fa48("15913") ? "" : (stryCov_9fa48("15913"), 'shopify'),
    source,
    catalog: stryMutAct_9fa48("15914") ? {} : (stryCov_9fa48("15914"), {
      kind: stryMutAct_9fa48("15915") ? "" : (stryCov_9fa48("15915"), 'more'),
      after
    }),
    variants: stryMutAct_9fa48("15916") ? ["Stryker was here"] : (stryCov_9fa48("15916"), [])
  });
  return next;
})());
const product = stryMutAct_9fa48("15917") ? () => undefined : (stryCov_9fa48("15917"), (() => {
  const product = (sku, price = stryMutAct_9fa48("15918") ? {} : (stryCov_9fa48("15918"), {
    kind: stryMutAct_9fa48("15919") ? "" : (stryCov_9fa48("15919"), 'exact'),
    amount: stryMutAct_9fa48("15920") ? "" : (stryCov_9fa48("15920"), '12.00'),
    currency: stryMutAct_9fa48("15921") ? "" : (stryCov_9fa48("15921"), 'USD')
  })) => stryMutAct_9fa48("15922") ? {} : (stryCov_9fa48("15922"), {
    name: (stryMutAct_9fa48("15923") ? "" : (stryCov_9fa48("15923"), 'Switch ')) + sku,
    brand: stryMutAct_9fa48("15924") ? "" : (stryCov_9fa48("15924"), 'Maker'),
    url: (stryMutAct_9fa48("15925") ? "" : (stryCov_9fa48("15925"), 'https://switch-shop.example/products/switch?variant=')) + sku,
    sku,
    pricing: price,
    availability: stryMutAct_9fa48("15926") ? "" : (stryCov_9fa48("15926"), 'In stock')
  });
  return product;
})());
const page = stryMutAct_9fa48("15927") ? () => undefined : (stryCov_9fa48("15927"), (() => {
  const page = (products, continuation, day = 6) => stryMutAct_9fa48("15928") ? {} : (stryCov_9fa48("15928"), {
    source,
    method: stryMutAct_9fa48("15929") ? "" : (stryCov_9fa48("15929"), 'Shopify Storefront'),
    observedAt: stryMutAct_9fa48("15930") ? `` : (stryCov_9fa48("15930"), `2026-09-${String(day).padStart(2, stryMutAct_9fa48("15931") ? "" : (stryCov_9fa48("15931"), '0'))}T09:00:00.000Z`),
    coverage: stryMutAct_9fa48("15932") ? "" : (stryCov_9fa48("15932"), 'Observed collection options; storefront filters are not applied.'),
    products,
    ...((stryMutAct_9fa48("15935") ? continuation !== undefined : stryMutAct_9fa48("15934") ? false : stryMutAct_9fa48("15933") ? true : (stryCov_9fa48("15933", "15934", "15935"), continuation === undefined)) ? {} : stryMutAct_9fa48("15936") ? {} : (stryCov_9fa48("15936"), {
      next: continuation
    }))
  });
  return page;
})());
function fixture(t) {
  if (stryMutAct_9fa48("15937")) {
    {}
  } else {
    stryCov_9fa48("15937");
    const directory = mkdtempSync(join(tmpdir(), stryMutAct_9fa48("15938") ? "" : (stryCov_9fa48("15938"), 'keyconf-catalog-')));
    const path = join(directory, stryMutAct_9fa48("15939") ? "" : (stryCov_9fa48("15939"), 'observations.sqlite'));
    const connections = stryMutAct_9fa48("15940") ? ["Stryker was here"] : (stryCov_9fa48("15940"), []);
    t.after(() => {
      if (stryMutAct_9fa48("15942")) {
        {}
      } else {
        stryCov_9fa48("15942");
        for (const connection of connections) {
          if (stryMutAct_9fa48("15943")) {
            {}
          } else {
            stryCov_9fa48("15943");
            try {
              if (stryMutAct_9fa48("15944")) {
                {}
              } else {
                stryCov_9fa48("15944");
                if (stryMutAct_9fa48("15945")) {
                  ;
                } else {
                  stryCov_9fa48("15945");
                  connection.close();
                }
              }
            } catch {}
          }
        }
        rmSync(directory, stryMutAct_9fa48("15947") ? {} : (stryCov_9fa48("15947"), {
          recursive: stryMutAct_9fa48("15948") ? false : (stryCov_9fa48("15948"), true),
          force: stryMutAct_9fa48("15949") ? false : (stryCov_9fa48("15949"), true)
        }));
      }
    });
    return stryMutAct_9fa48("15950") ? {} : (stryCov_9fa48("15950"), {
      path,
      open: () => {
        if (stryMutAct_9fa48("15951")) {
          {}
        } else {
          stryCov_9fa48("15951");
          const db = new ObservationCatalog(path);
          if (stryMutAct_9fa48("15952")) {
            ;
          } else {
            stryCov_9fa48("15952");
            connections.push(db);
          }
          return db;
        }
      },
      raw: () => {
        if (stryMutAct_9fa48("15953")) {
          {}
        } else {
          stryCov_9fa48("15953");
          const db = new DatabaseSync(path);
          if (stryMutAct_9fa48("15954")) {
            ;
          } else {
            stryCov_9fa48("15954");
            connections.push(db);
          }
          return db;
        }
      }
    });
  }
}
test(stryMutAct_9fa48("15956") ? "" : (stryCov_9fa48("15956"), 'SQLite retains original prices, variant identity and observation dates across reopen and later snapshots'), t => {
  if (stryMutAct_9fa48("15957")) {
    {}
  } else {
    stryCov_9fa48("15957");
    const f = fixture(t),
      db = f.open();
    db.start(stryMutAct_9fa48("15959") ? "" : (stryCov_9fa48("15959"), 'first'), source);
    const a = page(stryMutAct_9fa48("15960") ? [] : (stryCov_9fa48("15960"), [product(stryMutAct_9fa48("15961") ? "" : (stryCov_9fa48("15961"), '101')), product(stryMutAct_9fa48("15962") ? "" : (stryCov_9fa48("15962"), '102'), stryMutAct_9fa48("15963") ? {} : (stryCov_9fa48("15963"), {
      kind: stryMutAct_9fa48("15964") ? "" : (stryCov_9fa48("15964"), 'unknown')
    })), product(stryMutAct_9fa48("15965") ? "" : (stryCov_9fa48("15965"), '103'), stryMutAct_9fa48("15966") ? {} : (stryCov_9fa48("15966"), {
      kind: stryMutAct_9fa48("15967") ? "" : (stryCov_9fa48("15967"), 'from'),
      amount: stryMutAct_9fa48("15968") ? "" : (stryCov_9fa48("15968"), '20.00'),
      currency: stryMutAct_9fa48("15969") ? "" : (stryCov_9fa48("15969"), 'EUR')
    }))]), next(stryMutAct_9fa48("15970") ? "" : (stryCov_9fa48("15970"), 'a')));
    const b = page(stryMutAct_9fa48("15971") ? [] : (stryCov_9fa48("15971"), [product(stryMutAct_9fa48("15972") ? "" : (stryCov_9fa48("15972"), '104'), stryMutAct_9fa48("15973") ? {} : (stryCov_9fa48("15973"), {
      kind: stryMutAct_9fa48("15974") ? "" : (stryCov_9fa48("15974"), 'range'),
      min: stryMutAct_9fa48("15975") ? "" : (stryCov_9fa48("15975"), '25.00'),
      max: stryMutAct_9fa48("15976") ? "" : (stryCov_9fa48("15976"), '30.00'),
      currency: stryMutAct_9fa48("15977") ? "" : (stryCov_9fa48("15977"), 'JPY')
    }))]), null, 7);
    db.append(stryMutAct_9fa48("15979") ? "" : (stryCov_9fa48("15979"), 'first'), 0, a);
    db.append(stryMutAct_9fa48("15981") ? "" : (stryCov_9fa48("15981"), 'first'), 1, b);
    const original = db.export(stryMutAct_9fa48("15982") ? "" : (stryCov_9fa48("15982"), 'first'));
    if (stryMutAct_9fa48("15983")) {
      ;
    } else {
      stryCov_9fa48("15983");
      db.close();
    }
    const reopened = f.open();
    assert.deepEqual(reopened.export(stryMutAct_9fa48("15985") ? "" : (stryCov_9fa48("15985"), 'first')), original);
    assert.equal(original.progress.kind, stryMutAct_9fa48("15987") ? "" : (stryCov_9fa48("15987"), 'pagination-ended'));
    if (stryMutAct_9fa48("15988")) {
      ;
    } else {
      stryCov_9fa48("15988");
      assert.equal(original.observations, 4);
    }
    assert.deepEqual(original.evidence.map(stryMutAct_9fa48("15990") ? () => undefined : (stryCov_9fa48("15990"), e => e.result)), stryMutAct_9fa48("15991") ? [] : (stryCov_9fa48("15991"), [a, b]));
    reopened.start(stryMutAct_9fa48("15993") ? "" : (stryCov_9fa48("15993"), 'later'), source);
    reopened.append(stryMutAct_9fa48("15995") ? "" : (stryCov_9fa48("15995"), 'later'), 0, page(stryMutAct_9fa48("15996") ? [] : (stryCov_9fa48("15996"), [product(stryMutAct_9fa48("15997") ? "" : (stryCov_9fa48("15997"), '101'), stryMutAct_9fa48("15998") ? {} : (stryCov_9fa48("15998"), {
      kind: stryMutAct_9fa48("15999") ? "" : (stryCov_9fa48("15999"), 'exact'),
      amount: stryMutAct_9fa48("16000") ? "" : (stryCov_9fa48("16000"), '14.50'),
      currency: stryMutAct_9fa48("16001") ? "" : (stryCov_9fa48("16001"), 'USD')
    }))]), null, 8));
    assert.deepEqual(reopened.export(stryMutAct_9fa48("16003") ? "" : (stryCov_9fa48("16003"), 'first')), original);
    const rows = f.raw().prepare(stryMutAct_9fa48("16004") ? `` : (stryCov_9fa48("16004"), `SELECT o.sku,o.pricing_json,p.observed_at FROM catalog_product_observation o JOIN catalog_page p USING(run_id,page_number) WHERE o.sku='101' ORDER BY p.observed_at`)).all();
    assert.deepEqual(rows.map(stryMutAct_9fa48("16006") ? () => undefined : (stryCov_9fa48("16006"), r => stryMutAct_9fa48("16007") ? [] : (stryCov_9fa48("16007"), [JSON.parse(r.pricing_json).amount, r.observed_at]))), stryMutAct_9fa48("16008") ? [] : (stryCov_9fa48("16008"), [stryMutAct_9fa48("16009") ? [] : (stryCov_9fa48("16009"), [stryMutAct_9fa48("16010") ? "" : (stryCov_9fa48("16010"), '12.00'), a.observedAt]), stryMutAct_9fa48("16011") ? [] : (stryCov_9fa48("16011"), [stryMutAct_9fa48("16012") ? "" : (stryCov_9fa48("16012"), '14.50'), stryMutAct_9fa48("16013") ? "" : (stryCov_9fa48("16013"), '2026-09-08T09:00:00.000Z')])]));
  }
});
test(stryMutAct_9fa48("16015") ? "" : (stryCov_9fa48("16015"), 'replays are idempotent while source reuse and conflicting evidence cannot overwrite a page'), t => {
  if (stryMutAct_9fa48("16016")) {
    {}
  } else {
    stryCov_9fa48("16016");
    const db = fixture(t).open();
    db.start(stryMutAct_9fa48("16018") ? "" : (stryCov_9fa48("16018"), 'run'), source, stryMutAct_9fa48("16019") ? "" : (stryCov_9fa48("16019"), '2026-09-06T08:00:00.000Z'));
    const a = page(stryMutAct_9fa48("16020") ? [] : (stryCov_9fa48("16020"), [product(stryMutAct_9fa48("16021") ? "" : (stryCov_9fa48("16021"), '101'))]), next(stryMutAct_9fa48("16022") ? "" : (stryCov_9fa48("16022"), 'a')));
    assert.equal(db.append(stryMutAct_9fa48("16024") ? "" : (stryCov_9fa48("16024"), 'run'), 0, a), stryMutAct_9fa48("16025") ? false : (stryCov_9fa48("16025"), true));
    const reorder = stryMutAct_9fa48("16026") ? () => undefined : (stryCov_9fa48("16026"), (() => {
      const reorder = value => Array.isArray(value) ? value.map(reorder) : (stryMutAct_9fa48("16029") ? value || typeof value === 'object' : stryMutAct_9fa48("16028") ? false : stryMutAct_9fa48("16027") ? true : (stryCov_9fa48("16027", "16028", "16029"), value && (stryMutAct_9fa48("16031") ? typeof value !== 'object' : stryMutAct_9fa48("16030") ? true : (stryCov_9fa48("16030", "16031"), typeof value === (stryMutAct_9fa48("16032") ? "" : (stryCov_9fa48("16032"), 'object')))))) ? Object.fromEntries(stryMutAct_9fa48("16033") ? Object.entries(value).map(([key, item]) => [key, reorder(item)]) : (stryCov_9fa48("16033"), Object.entries(value).reverse().map(stryMutAct_9fa48("16034") ? () => undefined : (stryCov_9fa48("16034"), ([key, item]) => stryMutAct_9fa48("16035") ? [] : (stryCov_9fa48("16035"), [key, reorder(item)]))))) : value;
      return reorder;
    })());
    assert.equal(db.append(stryMutAct_9fa48("16037") ? "" : (stryCov_9fa48("16037"), 'run'), 0, reorder(a)), stryMutAct_9fa48("16038") ? true : (stryCov_9fa48("16038"), false));
    db.start(stryMutAct_9fa48("16040") ? "" : (stryCov_9fa48("16040"), 'run'), source + (stryMutAct_9fa48("16041") ? "" : (stryCov_9fa48("16041"), '#anchor')), stryMutAct_9fa48("16042") ? "" : (stryCov_9fa48("16042"), '2026-09-08T08:00:00.000Z'));
    assert.equal(db.checkpoint(stryMutAct_9fa48("16044") ? "" : (stryCov_9fa48("16044"), 'run')).startedAt, stryMutAct_9fa48("16045") ? "" : (stryCov_9fa48("16045"), '2026-09-06T08:00:00.000Z'));
    assert.throws(stryMutAct_9fa48("16047") ? () => undefined : (stryCov_9fa48("16047"), () => db.start(stryMutAct_9fa48("16048") ? "" : (stryCov_9fa48("16048"), 'run'), stryMutAct_9fa48("16049") ? "" : (stryCov_9fa48("16049"), 'https://another.example/products/switch'))), /different source/);
    assert.throws(stryMutAct_9fa48("16051") ? () => undefined : (stryCov_9fa48("16051"), () => db.append(stryMutAct_9fa48("16052") ? "" : (stryCov_9fa48("16052"), 'run'), 0, page(stryMutAct_9fa48("16053") ? [] : (stryCov_9fa48("16053"), [product(stryMutAct_9fa48("16054") ? "" : (stryCov_9fa48("16054"), '101'))]), next(stryMutAct_9fa48("16055") ? "" : (stryCov_9fa48("16055"), 'a')), 7))), /different committed evidence/);
    assert.equal(db.checkpoint(stryMutAct_9fa48("16057") ? "" : (stryCov_9fa48("16057"), 'run')).observations, 1);
    assert.deepEqual(db.export(stryMutAct_9fa48("16059") ? "" : (stryCov_9fa48("16059"), 'run')).evidence[0].result, a);
  }
});
test(stryMutAct_9fa48("16061") ? "" : (stryCov_9fa48("16061"), 'two connections cannot replace one another’s committed observations'), t => {
  if (stryMutAct_9fa48("16062")) {
    {}
  } else {
    stryCov_9fa48("16062");
    const f = fixture(t),
      first = f.open(),
      second = f.open();
    first.start(stryMutAct_9fa48("16064") ? "" : (stryCov_9fa48("16064"), 'race'), source);
    second.start(stryMutAct_9fa48("16066") ? "" : (stryCov_9fa48("16066"), 'race'), source);
    const before = second.checkpoint(stryMutAct_9fa48("16067") ? "" : (stryCov_9fa48("16067"), 'race'));
    const a = page(stryMutAct_9fa48("16068") ? [] : (stryCov_9fa48("16068"), [product(stryMutAct_9fa48("16069") ? "" : (stryCov_9fa48("16069"), '101'))]), next(stryMutAct_9fa48("16070") ? "" : (stryCov_9fa48("16070"), 'a')));
    first.append(stryMutAct_9fa48("16072") ? "" : (stryCov_9fa48("16072"), 'race'), 0, a);
    assert.equal(second.append(stryMutAct_9fa48("16074") ? "" : (stryCov_9fa48("16074"), 'race'), before.pages, a), stryMutAct_9fa48("16075") ? true : (stryCov_9fa48("16075"), false));
    assert.throws(stryMutAct_9fa48("16077") ? () => undefined : (stryCov_9fa48("16077"), () => second.append(stryMutAct_9fa48("16078") ? "" : (stryCov_9fa48("16078"), 'race'), before.pages, page(stryMutAct_9fa48("16079") ? [] : (stryCov_9fa48("16079"), [product(stryMutAct_9fa48("16080") ? "" : (stryCov_9fa48("16080"), '102'))]), next(stryMutAct_9fa48("16081") ? "" : (stryCov_9fa48("16081"), 'a'))))), /different committed evidence/);
    second.append(stryMutAct_9fa48("16083") ? "" : (stryCov_9fa48("16083"), 'race'), 1, page(stryMutAct_9fa48("16084") ? [] : (stryCov_9fa48("16084"), [product(stryMutAct_9fa48("16085") ? "" : (stryCov_9fa48("16085"), '102'))]), null));
    assert.equal(first.checkpoint(stryMutAct_9fa48("16087") ? "" : (stryCov_9fa48("16087"), 'race')).observations, 2);
  }
});
test(stryMutAct_9fa48("16089") ? "" : (stryCov_9fa48("16089"), 'a failed product insert rolls back its entire page and preserves the prior checkpoint'), t => {
  if (stryMutAct_9fa48("16090")) {
    {}
  } else {
    stryCov_9fa48("16090");
    const f = fixture(t),
      db = f.open(),
      raw = f.raw();
    db.start(stryMutAct_9fa48("16092") ? "" : (stryCov_9fa48("16092"), 'atomic'), source);
    db.append(stryMutAct_9fa48("16094") ? "" : (stryCov_9fa48("16094"), 'atomic'), 0, page(stryMutAct_9fa48("16095") ? [] : (stryCov_9fa48("16095"), [product(stryMutAct_9fa48("16096") ? "" : (stryCov_9fa48("16096"), '101'))]), next(stryMutAct_9fa48("16097") ? "" : (stryCov_9fa48("16097"), 'a'))));
    const before = db.export(stryMutAct_9fa48("16098") ? "" : (stryCov_9fa48("16098"), 'atomic'));
    raw.exec(stryMutAct_9fa48("16100") ? "" : (stryCov_9fa48("16100"), "CREATE TRIGGER reject_second BEFORE INSERT ON catalog_product_observation WHEN NEW.sku='reject' BEGIN SELECT RAISE(ABORT,'injected insert failure'); END;"));
    const b = page(stryMutAct_9fa48("16101") ? [] : (stryCov_9fa48("16101"), [product(stryMutAct_9fa48("16102") ? "" : (stryCov_9fa48("16102"), '102')), product(stryMutAct_9fa48("16103") ? "" : (stryCov_9fa48("16103"), 'reject'))]), null);
    assert.throws(stryMutAct_9fa48("16105") ? () => undefined : (stryCov_9fa48("16105"), () => db.append(stryMutAct_9fa48("16106") ? "" : (stryCov_9fa48("16106"), 'atomic'), 1, b)), /injected insert failure/);
    assert.deepEqual(db.export(stryMutAct_9fa48("16108") ? "" : (stryCov_9fa48("16108"), 'atomic')), before);
    assert.equal(raw.prepare(stryMutAct_9fa48("16110") ? "" : (stryCov_9fa48("16110"), 'SELECT COUNT(*) AS n FROM catalog_page')).get().n, 1);
    assert.equal(raw.prepare(stryMutAct_9fa48("16112") ? "" : (stryCov_9fa48("16112"), 'SELECT COUNT(*) AS n FROM catalog_product_observation')).get().n, 1);
    raw.exec(stryMutAct_9fa48("16114") ? "" : (stryCov_9fa48("16114"), 'DROP TRIGGER reject_second'));
    db.append(stryMutAct_9fa48("16116") ? "" : (stryCov_9fa48("16116"), 'atomic'), 1, b);
    assert.equal(db.checkpoint(stryMutAct_9fa48("16118") ? "" : (stryCov_9fa48("16118"), 'atomic')).observations, 3);
  }
});
test(stryMutAct_9fa48("16120") ? "" : (stryCov_9fa48("16120"), 'an interrupted collection resumes its saved cursor and a repeated page limit makes no new requests'), async t => {
  if (stryMutAct_9fa48("16121")) {
    {}
  } else {
    stryCov_9fa48("16121");
    const f = fixture(t),
      first = f.open();
    const options = stryMutAct_9fa48("16122") ? {} : (stryCov_9fa48("16122"), {
      runId: stryMutAct_9fa48("16123") ? "" : (stryCov_9fa48("16123"), 'resume'),
      source,
      targetPages: 3,
      delayMs: 0
    });
    let calls = 0;
    await assert.rejects(collectCatalog(first, options, async (_, cursor) => {
      if (stryMutAct_9fa48("16124")) {
        {}
      } else {
        stryCov_9fa48("16124");
        stryMutAct_9fa48("16125") ? calls-- : (stryCov_9fa48("16125"), calls++);
        if (stryMutAct_9fa48("16127") ? false : stryMutAct_9fa48("16126") ? true : (stryCov_9fa48("16126", "16127"), cursor)) throw new Error(stryMutAct_9fa48("16129") ? "" : (stryCov_9fa48("16129"), 'Store temporarily unavailable'));
        return page(stryMutAct_9fa48("16130") ? [] : (stryCov_9fa48("16130"), [product(stryMutAct_9fa48("16131") ? "" : (stryCov_9fa48("16131"), '101'))]), next(stryMutAct_9fa48("16132") ? "" : (stryCov_9fa48("16132"), 'a')));
      }
    }), /temporarily unavailable/);
    if (stryMutAct_9fa48("16133")) {
      ;
    } else {
      stryCov_9fa48("16133");
      assert.equal(calls, 2);
    }
    assert.equal(first.checkpoint(stryMutAct_9fa48("16135") ? "" : (stryCov_9fa48("16135"), 'resume')).pages, 1);
    if (stryMutAct_9fa48("16136")) {
      ;
    } else {
      stryCov_9fa48("16136");
      first.close();
    }
    const reopened = f.open(),
      cursors = stryMutAct_9fa48("16137") ? ["Stryker was here"] : (stryCov_9fa48("16137"), []);
    const done = await collectCatalog(reopened, options, async (url, cursor) => {
      if (stryMutAct_9fa48("16138")) {
        {}
      } else {
        stryCov_9fa48("16138");
        if (stryMutAct_9fa48("16139")) {
          ;
        } else {
          stryCov_9fa48("16139");
          assert.equal(url, source);
        }
        if (stryMutAct_9fa48("16140")) {
          ;
        } else {
          stryCov_9fa48("16140");
          cursors.push(cursor);
        }
        return (stryMutAct_9fa48("16143") ? cursor.catalog.after !== 'a' : stryMutAct_9fa48("16142") ? false : stryMutAct_9fa48("16141") ? true : (stryCov_9fa48("16141", "16142", "16143"), cursor.catalog.after === (stryMutAct_9fa48("16144") ? "" : (stryCov_9fa48("16144"), 'a')))) ? page(stryMutAct_9fa48("16145") ? [] : (stryCov_9fa48("16145"), [product(stryMutAct_9fa48("16146") ? "" : (stryCov_9fa48("16146"), '102'))]), next(stryMutAct_9fa48("16147") ? "" : (stryCov_9fa48("16147"), 'b')), 7) : page(stryMutAct_9fa48("16148") ? [] : (stryCov_9fa48("16148"), [product(stryMutAct_9fa48("16149") ? "" : (stryCov_9fa48("16149"), '103'))]), null, 8);
      }
    });
    assert.deepEqual(cursors, stryMutAct_9fa48("16151") ? [] : (stryCov_9fa48("16151"), [next(stryMutAct_9fa48("16152") ? "" : (stryCov_9fa48("16152"), 'a')), next(stryMutAct_9fa48("16153") ? "" : (stryCov_9fa48("16153"), 'b'))]));
    if (stryMutAct_9fa48("16154")) {
      ;
    } else {
      stryCov_9fa48("16154");
      assert.equal(done.pages, 3);
    }
    await collectCatalog(reopened, options, async () => {
      if (stryMutAct_9fa48("16155")) {
        {}
      } else {
        stryCov_9fa48("16155");
        throw new Error(stryMutAct_9fa48("16157") ? "" : (stryCov_9fa48("16157"), 'Must not fetch committed pages'));
      }
    });
    await collectCatalog(reopened, stryMutAct_9fa48("16158") ? {} : (stryCov_9fa48("16158"), {
      ...options,
      targetPages: 100
    }), async () => {
      if (stryMutAct_9fa48("16159")) {
        {}
      } else {
        stryCov_9fa48("16159");
        throw new Error(stryMutAct_9fa48("16161") ? "" : (stryCov_9fa48("16161"), 'Must not fetch an ended preview'));
      }
    });
    assert.equal(reopened.export(stryMutAct_9fa48("16163") ? "" : (stryCov_9fa48("16163"), 'resume')).evidence[0].result.observedAt, stryMutAct_9fa48("16164") ? "" : (stryCov_9fa48("16164"), '2026-09-06T09:00:00.000Z'));
  }
});
test(stryMutAct_9fa48("16166") ? "" : (stryCov_9fa48("16166"), 'page limits preserve continuation and a preview without pagination never claims catalog exhaustion'), async t => {
  if (stryMutAct_9fa48("16167")) {
    {}
  } else {
    stryCov_9fa48("16167");
    const db = fixture(t).open();
    const options = stryMutAct_9fa48("16168") ? {} : (stryCov_9fa48("16168"), {
      runId: stryMutAct_9fa48("16169") ? "" : (stryCov_9fa48("16169"), 'limited'),
      source,
      targetPages: 1,
      delayMs: 0
    });
    const first = await collectCatalog(db, options, stryMutAct_9fa48("16170") ? () => undefined : (stryCov_9fa48("16170"), async () => page(stryMutAct_9fa48("16171") ? [] : (stryCov_9fa48("16171"), [product(stryMutAct_9fa48("16172") ? "" : (stryCov_9fa48("16172"), '101'))]), next(stryMutAct_9fa48("16173") ? "" : (stryCov_9fa48("16173"), 'a')))));
    assert.equal(first.progress.kind, stryMutAct_9fa48("16175") ? "" : (stryCov_9fa48("16175"), 'more'));
    await collectCatalog(db, options, async () => {
      if (stryMutAct_9fa48("16176")) {
        {}
      } else {
        stryCov_9fa48("16176");
        throw new Error(stryMutAct_9fa48("16178") ? "" : (stryCov_9fa48("16178"), 'Page limit must be respected'));
      }
    });
    const extended = await collectCatalog(db, stryMutAct_9fa48("16179") ? {} : (stryCov_9fa48("16179"), {
      ...options,
      targetPages: 2
    }), async (_, cursor) => {
      if (stryMutAct_9fa48("16180")) {
        {}
      } else {
        stryCov_9fa48("16180");
        assert.deepEqual(cursor, next(stryMutAct_9fa48("16182") ? "" : (stryCov_9fa48("16182"), 'a')));
        return page(stryMutAct_9fa48("16183") ? [] : (stryCov_9fa48("16183"), [product(stryMutAct_9fa48("16184") ? "" : (stryCov_9fa48("16184"), '102'))]), null);
      }
    });
    if (stryMutAct_9fa48("16185")) {
      ;
    } else {
      stryCov_9fa48("16185");
      assert.equal(extended.pages, 2);
    }
    const preview = await collectCatalog(db, stryMutAct_9fa48("16186") ? {} : (stryCov_9fa48("16186"), {
      ...options,
      runId: stryMutAct_9fa48("16187") ? "" : (stryCov_9fa48("16187"), 'product-preview'),
      targetPages: 100
    }), stryMutAct_9fa48("16188") ? () => undefined : (stryCov_9fa48("16188"), async () => page(stryMutAct_9fa48("16189") ? [] : (stryCov_9fa48("16189"), [product(stryMutAct_9fa48("16190") ? "" : (stryCov_9fa48("16190"), '101'))]), undefined)));
    assert.equal(preview.progress.kind, stryMutAct_9fa48("16192") ? "" : (stryCov_9fa48("16192"), 'preview-only'));
    if (stryMutAct_9fa48("16193")) {
      ;
    } else {
      stryCov_9fa48("16193");
      assert.equal(preview.pages, 1);
    }
  }
});
test(stryMutAct_9fa48("16195") ? "" : (stryCov_9fa48("16195"), 'cursor cycles and malformed observations leave the saved checkpoint unchanged'), t => {
  if (stryMutAct_9fa48("16196")) {
    {}
  } else {
    stryCov_9fa48("16196");
    const db = fixture(t).open();
    db.start(stryMutAct_9fa48("16198") ? "" : (stryCov_9fa48("16198"), 'cycle'), source);
    db.append(stryMutAct_9fa48("16200") ? "" : (stryCov_9fa48("16200"), 'cycle'), 0, page(stryMutAct_9fa48("16201") ? [] : (stryCov_9fa48("16201"), [product(stryMutAct_9fa48("16202") ? "" : (stryCov_9fa48("16202"), '101'))]), next(stryMutAct_9fa48("16203") ? "" : (stryCov_9fa48("16203"), 'a'))));
    db.append(stryMutAct_9fa48("16205") ? "" : (stryCov_9fa48("16205"), 'cycle'), 1, page(stryMutAct_9fa48("16206") ? [] : (stryCov_9fa48("16206"), [product(stryMutAct_9fa48("16207") ? "" : (stryCov_9fa48("16207"), '102'))]), next(stryMutAct_9fa48("16208") ? "" : (stryCov_9fa48("16208"), 'b'))));
    const before = db.export(stryMutAct_9fa48("16209") ? "" : (stryCov_9fa48("16209"), 'cycle'));
    assert.throws(stryMutAct_9fa48("16211") ? () => undefined : (stryCov_9fa48("16211"), () => db.append(stryMutAct_9fa48("16212") ? "" : (stryCov_9fa48("16212"), 'cycle'), 2, page(stryMutAct_9fa48("16213") ? [] : (stryCov_9fa48("16213"), [product(stryMutAct_9fa48("16214") ? "" : (stryCov_9fa48("16214"), '103'))]), next(stryMutAct_9fa48("16215") ? "" : (stryCov_9fa48("16215"), 'a'))))), /earlier pagination cursor/);
    assert.throws(stryMutAct_9fa48("16217") ? () => undefined : (stryCov_9fa48("16217"), () => db.append(stryMutAct_9fa48("16218") ? "" : (stryCov_9fa48("16218"), 'cycle'), 2, page(stryMutAct_9fa48("16219") ? [] : (stryCov_9fa48("16219"), [product(stryMutAct_9fa48("16220") ? "" : (stryCov_9fa48("16220"), '103'))]), next(stryMutAct_9fa48("16221") ? "" : (stryCov_9fa48("16221"), 'b'))))), /earlier pagination cursor/);
    assert.throws(stryMutAct_9fa48("16223") ? () => undefined : (stryCov_9fa48("16223"), () => db.append(stryMutAct_9fa48("16224") ? "" : (stryCov_9fa48("16224"), 'cycle'), 2, stryMutAct_9fa48("16225") ? {} : (stryCov_9fa48("16225"), {
      ...page(stryMutAct_9fa48("16226") ? [] : (stryCov_9fa48("16226"), [product(stryMutAct_9fa48("16227") ? "" : (stryCov_9fa48("16227"), '103'))]), null),
      observedAt: stryMutAct_9fa48("16228") ? "" : (stryCov_9fa48("16228"), 'yesterday')
    }))), /ISO timestamp/);
    assert.throws(stryMutAct_9fa48("16230") ? () => undefined : (stryCov_9fa48("16230"), () => db.append(stryMutAct_9fa48("16231") ? "" : (stryCov_9fa48("16231"), 'cycle'), 2, page(stryMutAct_9fa48("16232") ? [] : (stryCov_9fa48("16232"), [product(stryMutAct_9fa48("16233") ? "" : (stryCov_9fa48("16233"), '103'), stryMutAct_9fa48("16234") ? {} : (stryCov_9fa48("16234"), {
      kind: stryMutAct_9fa48("16235") ? "" : (stryCov_9fa48("16235"), 'exact'),
      amount: stryMutAct_9fa48("16236") ? "" : (stryCov_9fa48("16236"), '-1'),
      currency: stryMutAct_9fa48("16237") ? "" : (stryCov_9fa48("16237"), 'USD')
    }))]), null))), /Invalid catalog observation/);
    assert.throws(stryMutAct_9fa48("16239") ? () => undefined : (stryCov_9fa48("16239"), () => db.append(stryMutAct_9fa48("16240") ? "" : (stryCov_9fa48("16240"), 'cycle'), 10, page(stryMutAct_9fa48("16241") ? [] : (stryCov_9fa48("16241"), [product(stryMutAct_9fa48("16242") ? "" : (stryCov_9fa48("16242"), '103'))]), null))), /advanced/);
    assert.deepEqual(db.export(stryMutAct_9fa48("16244") ? "" : (stryCov_9fa48("16244"), 'cycle')), before);
  }
});
test(stryMutAct_9fa48("16246") ? "" : (stryCov_9fa48("16246"), 'changed stored payloads fail integrity verification instead of exporting altered evidence'), t => {
  if (stryMutAct_9fa48("16247")) {
    {}
  } else {
    stryCov_9fa48("16247");
    const f = fixture(t),
      db = f.open();
    db.start(stryMutAct_9fa48("16249") ? "" : (stryCov_9fa48("16249"), 'integrity'), source);
    const a = page(stryMutAct_9fa48("16250") ? [] : (stryCov_9fa48("16250"), [product(stryMutAct_9fa48("16251") ? "" : (stryCov_9fa48("16251"), '101'))]), null);
    db.append(stryMutAct_9fa48("16253") ? "" : (stryCov_9fa48("16253"), 'integrity'), 0, a);
    f.raw().prepare(stryMutAct_9fa48("16255") ? "" : (stryCov_9fa48("16255"), 'UPDATE catalog_page SET payload_json=? WHERE run_id=?')).run(JSON.stringify(stryMutAct_9fa48("16256") ? {} : (stryCov_9fa48("16256"), {
      ...a,
      coverage: stryMutAct_9fa48("16257") ? "" : (stryCov_9fa48("16257"), 'Changed')
    })), stryMutAct_9fa48("16258") ? "" : (stryCov_9fa48("16258"), 'integrity'));
    assert.throws(stryMutAct_9fa48("16260") ? () => undefined : (stryCov_9fa48("16260"), () => db.checkpoint(stryMutAct_9fa48("16261") ? "" : (stryCov_9fa48("16261"), 'integrity'))), /integrity check/);
    assert.throws(stryMutAct_9fa48("16263") ? () => undefined : (stryCov_9fa48("16263"), () => db.export(stryMutAct_9fa48("16264") ? "" : (stryCov_9fa48("16264"), 'integrity'))), /integrity check/);
  }
});
test(stryMutAct_9fa48("16266") ? "" : (stryCov_9fa48("16266"), 'extractor archives survive reopen without relabeling historical pages'), async t => {
  if (stryMutAct_9fa48("16267")) {
    {}
  } else {
    stryCov_9fa48("16267");
    const {
      archiveExtractor
    } = await import('../scripts/catalog/extractor.ts');
    const {
      createHash
    } = await import('node:crypto');
    const files = fixture(t);
    const db = files.open();
    db.start(stryMutAct_9fa48("16269") ? "" : (stryCov_9fa48("16269"), 'provenance'), source);
    const first = page(stryMutAct_9fa48("16270") ? [] : (stryCov_9fa48("16270"), [product(stryMutAct_9fa48("16271") ? "" : (stryCov_9fa48("16271"), 'old'))]), next(stryMutAct_9fa48("16272") ? "" : (stryCov_9fa48("16272"), 'second')));
    db.append(stryMutAct_9fa48("16274") ? "" : (stryCov_9fa48("16274"), 'provenance'), 0, first);
    const extractor = archiveExtractor();
    const second = page(stryMutAct_9fa48("16275") ? [] : (stryCov_9fa48("16275"), [product(stryMutAct_9fa48("16276") ? "" : (stryCov_9fa48("16276"), 'new'))]), null);
    db.append(stryMutAct_9fa48("16278") ? "" : (stryCov_9fa48("16278"), 'provenance'), 1, second, extractor);
    assert.equal(db.append(stryMutAct_9fa48("16280") ? "" : (stryCov_9fa48("16280"), 'provenance'), 0, first, extractor), stryMutAct_9fa48("16281") ? true : (stryCov_9fa48("16281"), false));
    const saved = files.open().export(stryMutAct_9fa48("16282") ? "" : (stryCov_9fa48("16282"), 'provenance'));
    if (stryMutAct_9fa48("16283")) {
      ;
    } else {
      stryCov_9fa48("16283");
      assert.equal(saved.evidence[0].extractorSha256, null);
    }
    if (stryMutAct_9fa48("16284")) {
      ;
    } else {
      stryCov_9fa48("16284");
      assert.equal(saved.evidence[1].extractorSha256, extractor.sha256);
    }
    if (stryMutAct_9fa48("16285")) {
      ;
    } else {
      stryCov_9fa48("16285");
      assert.equal(saved.extractors.length, 1);
    }
    assert.equal(createHash(stryMutAct_9fa48("16287") ? "" : (stryCov_9fa48("16287"), 'sha256')).update(saved.extractors[0].archive).digest(stryMutAct_9fa48("16288") ? "" : (stryCov_9fa48("16288"), 'hex')), extractor.sha256);
    const archive = JSON.parse(saved.extractors[0].archive);
    assert.ok(archive.files[stryMutAct_9fa48("16290") ? "" : (stryCov_9fa48("16290"), 'lib/import-products.ts')].includes(stryMutAct_9fa48("16291") ? "" : (stryCov_9fa48("16291"), 'importWebsite')));
    assert.ok(archive.files[stryMutAct_9fa48("16293") ? "" : (stryCov_9fa48("16293"), 'lib/product-pricing.ts')].includes(stryMutAct_9fa48("16294") ? "" : (stryCov_9fa48("16294"), 'offerPricing')));
    if (stryMutAct_9fa48("16295")) {
      ;
    } else {
      stryCov_9fa48("16295");
      assert.equal(archive.runtime, process.version);
    }
    files.raw().prepare(stryMutAct_9fa48("16297") ? "" : (stryCov_9fa48("16297"), 'UPDATE catalog_extractor SET archive_json=?')).run(stryMutAct_9fa48("16298") ? "" : (stryCov_9fa48("16298"), '{}'));
    assert.throws(stryMutAct_9fa48("16300") ? () => undefined : (stryCov_9fa48("16300"), () => db.export(stryMutAct_9fa48("16301") ? "" : (stryCov_9fa48("16301"), 'provenance'))), /extractor archive failed/);
  }
});
test(stryMutAct_9fa48("16303") ? "" : (stryCov_9fa48("16303"), 'invalid extractor evidence rolls back without retaining a page or archive'), async t => {
  if (stryMutAct_9fa48("16304")) {
    {}
  } else {
    stryCov_9fa48("16304");
    const files = fixture(t);
    const db = files.open();
    db.start(stryMutAct_9fa48("16306") ? "" : (stryCov_9fa48("16306"), 'invalid-extractor'), source);
    assert.throws(stryMutAct_9fa48("16308") ? () => undefined : (stryCov_9fa48("16308"), () => db.append(stryMutAct_9fa48("16309") ? "" : (stryCov_9fa48("16309"), 'invalid-extractor'), 0, page(stryMutAct_9fa48("16310") ? [] : (stryCov_9fa48("16310"), [product(stryMutAct_9fa48("16311") ? "" : (stryCov_9fa48("16311"), 'a'))]), null), stryMutAct_9fa48("16312") ? {} : (stryCov_9fa48("16312"), {
      sha256: (stryMutAct_9fa48("16313") ? "" : (stryCov_9fa48("16313"), '0')).repeat(64),
      payload: stryMutAct_9fa48("16314") ? "" : (stryCov_9fa48("16314"), '{}')
    }))), /integrity/);
    assert.equal(db.checkpoint(stryMutAct_9fa48("16316") ? "" : (stryCov_9fa48("16316"), 'invalid-extractor')).pages, 0);
    assert.equal(db.export(stryMutAct_9fa48("16318") ? "" : (stryCov_9fa48("16318"), 'invalid-extractor')).extractors.length, 0);
  }
});
test(stryMutAct_9fa48("16320") ? "" : (stryCov_9fa48("16320"), 'the extractor archive includes every relative source dependency'), async () => {
  if (stryMutAct_9fa48("16321")) {
    {}
  } else {
    stryCov_9fa48("16321");
    const {
      archiveExtractor
    } = await import('../scripts/catalog/extractor.ts');
    const {
      posix
    } = await import('node:path');
    const {
      files
    } = JSON.parse(archiveExtractor().payload);
    for (const [path, source] of Object.entries(files)) {
      if (stryMutAct_9fa48("16322")) {
        {}
      } else {
        stryCov_9fa48("16322");
        for (const match of source.matchAll(stryMutAct_9fa48("16328") ? /from\s+['"](\.[^'"]+)[^'"]/g : stryMutAct_9fa48("16327") ? /from\s+['"](\.['"]+)['"]/g : stryMutAct_9fa48("16326") ? /from\s+['"](\.[^'"])['"]/g : stryMutAct_9fa48("16325") ? /from\s+[^'"](\.[^'"]+)['"]/g : stryMutAct_9fa48("16324") ? /from\S+['"](\.[^'"]+)['"]/g : stryMutAct_9fa48("16323") ? /from\s['"](\.[^'"]+)['"]/g : (stryCov_9fa48("16323", "16324", "16325", "16326", "16327", "16328"), /from\s+['"](\.[^'"]+)['"]/g))) {
          if (stryMutAct_9fa48("16329")) {
            {}
          } else {
            stryCov_9fa48("16329");
            const dependency = posix.normalize(posix.join(posix.dirname(path), match[1]));
            assert.ok(Object.hasOwn(files, dependency), stryMutAct_9fa48("16331") ? `` : (stryCov_9fa48("16331"), `Missing extractor dependency: ${dependency}`));
          }
        }
      }
    }
  }
});
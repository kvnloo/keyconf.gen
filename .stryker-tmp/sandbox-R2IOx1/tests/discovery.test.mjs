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
import { parseDiscoveryPage } from '../lib/discovery.ts';
const item = stryMutAct_9fa48("20116") ? {} : (stryCov_9fa48("20116"), {
  id: stryMutAct_9fa48("20117") ? "" : (stryCov_9fa48("20117"), 'published-build-0001'),
  title: stryMutAct_9fa48("20118") ? "" : (stryCov_9fa48("20118"), 'Forest'),
  kind: stryMutAct_9fa48("20119") ? "" : (stryCov_9fa48("20119"), 'build'),
  author: stryMutAct_9fa48("20120") ? {} : (stryCov_9fa48("20120"), {
    handle: stryMutAct_9fa48("20121") ? "" : (stryCov_9fa48("20121"), 'maker'),
    displayName: stryMutAct_9fa48("20122") ? "" : (stryCov_9fa48("20122"), 'Maker'),
    privateField: stryMutAct_9fa48("20123") ? "" : (stryCov_9fa48("20123"), 'hidden')
  }),
  publishedAt: stryMutAct_9fa48("20124") ? "" : (stryCov_9fa48("20124"), '2026-09-06T00:00:00.000Z'),
  accountId: stryMutAct_9fa48("20125") ? "" : (stryCov_9fa48("20125"), 'private')
});
test(stryMutAct_9fa48("20127") ? "" : (stryCov_9fa48("20127"), 'discovery response parsing strips private fields and rejects malformed pagination'), () => {
  if (stryMutAct_9fa48("20128")) {
    {}
  } else {
    stryCov_9fa48("20128");
    const page = parseDiscoveryPage(stryMutAct_9fa48("20129") ? {} : (stryCov_9fa48("20129"), {
      items: stryMutAct_9fa48("20130") ? [] : (stryCov_9fa48("20130"), [item]),
      next: null
    }));
    assert.equal((stryMutAct_9fa48("20132") ? "" : (stryCov_9fa48("20132"), 'accountId')) in page.items[0], stryMutAct_9fa48("20133") ? true : (stryCov_9fa48("20133"), false));
    if (stryMutAct_9fa48("20134")) {
      ;
    } else {
      stryCov_9fa48("20134");
      assert.equal(page.items[0].thumbnail, null);
    }
    assert.deepEqual(page.items[0].author, stryMutAct_9fa48("20136") ? {} : (stryCov_9fa48("20136"), {
      handle: stryMutAct_9fa48("20137") ? "" : (stryCov_9fa48("20137"), 'maker'),
      displayName: stryMutAct_9fa48("20138") ? "" : (stryCov_9fa48("20138"), 'Maker')
    }));
    for (const payload of stryMutAct_9fa48("20139") ? [] : (stryCov_9fa48("20139"), [stryMutAct_9fa48("20140") ? {} : (stryCov_9fa48("20140"), {
      items: stryMutAct_9fa48("20141") ? [] : (stryCov_9fa48("20141"), [item, item]),
      next: null
    }), stryMutAct_9fa48("20142") ? {} : (stryCov_9fa48("20142"), {
      items: stryMutAct_9fa48("20143") ? [] : (stryCov_9fa48("20143"), [stryMutAct_9fa48("20144") ? {} : (stryCov_9fa48("20144"), {
        ...item,
        id: stryMutAct_9fa48("20145") ? "" : (stryCov_9fa48("20145"), '../private')
      })]),
      next: null
    }), stryMutAct_9fa48("20146") ? {} : (stryCov_9fa48("20146"), {
      items: stryMutAct_9fa48("20147") ? [] : (stryCov_9fa48("20147"), [stryMutAct_9fa48("20148") ? {} : (stryCov_9fa48("20148"), {
        ...item,
        kind: stryMutAct_9fa48("20149") ? "" : (stryCov_9fa48("20149"), 'draft')
      })]),
      next: null
    }), stryMutAct_9fa48("20150") ? {} : (stryCov_9fa48("20150"), {
      items: stryMutAct_9fa48("20151") ? [] : (stryCov_9fa48("20151"), [item]),
      next: stryMutAct_9fa48("20152") ? {} : (stryCov_9fa48("20152"), {
        publishedAt: item.publishedAt,
        id: stryMutAct_9fa48("20153") ? "" : (stryCov_9fa48("20153"), 'different-release-1')
      })
    }), stryMutAct_9fa48("20154") ? {} : (stryCov_9fa48("20154"), {
      items: stryMutAct_9fa48("20155") ? ["Stryker was here"] : (stryCov_9fa48("20155"), []),
      next: stryMutAct_9fa48("20156") ? {} : (stryCov_9fa48("20156"), {
        publishedAt: item.publishedAt,
        id: item.id
      })
    }), stryMutAct_9fa48("20157") ? {} : (stryCov_9fa48("20157"), {
      items: stryMutAct_9fa48("20158") ? [] : (stryCov_9fa48("20158"), [item])
    })])) assert.throws(stryMutAct_9fa48("20160") ? () => undefined : (stryCov_9fa48("20160"), () => parseDiscoveryPage(payload)));
    assert.deepEqual(parseDiscoveryPage(stryMutAct_9fa48("20162") ? {} : (stryCov_9fa48("20162"), {
      items: stryMutAct_9fa48("20163") ? [] : (stryCov_9fa48("20163"), [item]),
      next: stryMutAct_9fa48("20164") ? {} : (stryCov_9fa48("20164"), {
        publishedAt: item.publishedAt,
        id: item.id
      })
    })).next, stryMutAct_9fa48("20165") ? {} : (stryCov_9fa48("20165"), {
      publishedAt: item.publishedAt,
      id: item.id
    }));
  }
});
test(stryMutAct_9fa48("20167") ? "" : (stryCov_9fa48("20167"), 'discovery responses accept bounded thumbnail recipes and reject malformed supplied previews'), () => {
  if (stryMutAct_9fa48("20168")) {
    {}
  } else {
    stryCov_9fa48("20168");
    const thumbnail = stryMutAct_9fa48("20169") ? {} : (stryCov_9fa48("20169"), {
      geometry: stryMutAct_9fa48("20170") ? "" : (stryCov_9fa48("20170"), 'generic-65'),
      caseColor: stryMutAct_9fa48("20171") ? "" : (stryCov_9fa48("20171"), '#123456'),
      colors: stryMutAct_9fa48("20172") ? {} : (stryCov_9fa48("20172"), {
        alpha: stryMutAct_9fa48("20173") ? "" : (stryCov_9fa48("20173"), '#abcdef'),
        mod: stryMutAct_9fa48("20174") ? "" : (stryCov_9fa48("20174"), '#654321'),
        accent: stryMutAct_9fa48("20175") ? "" : (stryCov_9fa48("20175"), '#fedcba'),
        space: stryMutAct_9fa48("20176") ? "" : (stryCov_9fa48("20176"), '#000000')
      })
    });
    assert.deepEqual(parseDiscoveryPage(stryMutAct_9fa48("20178") ? {} : (stryCov_9fa48("20178"), {
      items: stryMutAct_9fa48("20179") ? [] : (stryCov_9fa48("20179"), [stryMutAct_9fa48("20180") ? {} : (stryCov_9fa48("20180"), {
        ...item,
        thumbnail
      })]),
      next: null
    })).items[0].thumbnail, thumbnail);
    assert.equal(parseDiscoveryPage(stryMutAct_9fa48("20182") ? {} : (stryCov_9fa48("20182"), {
      items: stryMutAct_9fa48("20183") ? [] : (stryCov_9fa48("20183"), [stryMutAct_9fa48("20184") ? {} : (stryCov_9fa48("20184"), {
        ...item,
        thumbnail: null
      })]),
      next: null
    })).items[0].thumbnail, null);
    for (const preview of stryMutAct_9fa48("20185") ? [] : (stryCov_9fa48("20185"), [{}, stryMutAct_9fa48("20186") ? {} : (stryCov_9fa48("20186"), {
      ...thumbnail,
      geometry: stryMutAct_9fa48("20187") ? "" : (stryCov_9fa48("20187"), 'unsupported')
    }), stryMutAct_9fa48("20188") ? {} : (stryCov_9fa48("20188"), {
      ...thumbnail,
      caseColor: stryMutAct_9fa48("20189") ? "" : (stryCov_9fa48("20189"), 'red')
    })])) assert.throws(stryMutAct_9fa48("20191") ? () => undefined : (stryCov_9fa48("20191"), () => parseDiscoveryPage(stryMutAct_9fa48("20192") ? {} : (stryCov_9fa48("20192"), {
      items: stryMutAct_9fa48("20193") ? [] : (stryCov_9fa48("20193"), [stryMutAct_9fa48("20194") ? {} : (stryCov_9fa48("20194"), {
        ...item,
        thumbnail: preview
      })]),
      next: null
    }))));
  }
});
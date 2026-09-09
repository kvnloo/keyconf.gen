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
import { createServer } from 'node:http';
import { once } from 'node:events';
import { readFile } from 'node:fs/promises';
import { loadStoreObservations, storeListings } from '../lib/store-observations.ts';
async function server(t, handler) {
  if (stryMutAct_9fa48("22109")) {
    {}
  } else {
    stryCov_9fa48("22109");
    const http = createServer(handler);
    http.listen(0, stryMutAct_9fa48("22111") ? "" : (stryCov_9fa48("22111"), '127.0.0.1'));
    await once(http, stryMutAct_9fa48("22112") ? "" : (stryCov_9fa48("22112"), 'listening'));
    t.after(() => {
      if (stryMutAct_9fa48("22114")) {
        {}
      } else {
        stryCov_9fa48("22114");
        if (stryMutAct_9fa48("22115")) {
          ;
        } else {
          stryCov_9fa48("22115");
          http.closeAllConnections();
        }
        if (stryMutAct_9fa48("22116")) {
          ;
        } else {
          stryCov_9fa48("22116");
          http.close();
        }
      }
    });
    const address = http.address();
    assert.ok(stryMutAct_9fa48("22120") ? address || typeof address === 'object' : stryMutAct_9fa48("22119") ? false : stryMutAct_9fa48("22118") ? true : (stryCov_9fa48("22118", "22119", "22120"), address && (stryMutAct_9fa48("22122") ? typeof address !== 'object' : stryMutAct_9fa48("22121") ? true : (stryCov_9fa48("22121", "22122"), typeof address === (stryMutAct_9fa48("22123") ? "" : (stryCov_9fa48("22123"), 'object'))))));
    return new URL(stryMutAct_9fa48("22124") ? `` : (stryCov_9fa48("22124"), `http://127.0.0.1:${address.port}/#discover`));
  }
}
test(stryMutAct_9fa48("22126") ? "" : (stryCov_9fa48("22126"), 'catalog reader uses real HTTP data and rejects damaged or oversized responses'), async t => {
  if (stryMutAct_9fa48("22127")) {
    {}
  } else {
    stryCov_9fa48("22127");
    const snapshot = await readFile(new URL(stryMutAct_9fa48("22128") ? "" : (stryCov_9fa48("22128"), '../data/store-observations.json'), import.meta.url), stryMutAct_9fa48("22129") ? "" : (stryCov_9fa48("22129"), 'utf8'));
    let body = snapshot;
    const location = await server(t, (request, response) => {
      if (stryMutAct_9fa48("22130")) {
        {}
      } else {
        stryCov_9fa48("22130");
        assert.equal(new URL(request.url, stryMutAct_9fa48("22132") ? "" : (stryCov_9fa48("22132"), 'http://local')).pathname, stryMutAct_9fa48("22133") ? "" : (stryCov_9fa48("22133"), '/api/catalog'));
        response.writeHead(200, stryMutAct_9fa48("22135") ? {} : (stryCov_9fa48("22135"), {
          'Content-Type': stryMutAct_9fa48("22136") ? "" : (stryCov_9fa48("22136"), 'application/json'),
          'Content-Length': Buffer.byteLength(body)
        }));
        if (stryMutAct_9fa48("22137")) {
          ;
        } else {
          stryCov_9fa48("22137");
          response.end(body);
        }
      }
    });
    const signal = new AbortController().signal;
    const hosted = await loadStoreObservations(location, signal);
    assert.equal(hosted.origin, stryMutAct_9fa48("22139") ? "" : (stryCov_9fa48("22139"), 'hosted'));
    if (stryMutAct_9fa48("22140")) {
      ;
    } else {
      stryCov_9fa48("22140");
      assert.deepEqual(hosted.storeListings, storeListings);
    }
    const changed = JSON.parse(snapshot);
    changed.evidence[0].result.products[0].name = stryMutAct_9fa48("22141") ? "" : (stryCov_9fa48("22141"), 'Altered without matching evidence');
    for (const invalid of stryMutAct_9fa48("22142") ? [] : (stryCov_9fa48("22142"), [JSON.stringify(changed), (stryMutAct_9fa48("22143") ? "" : (stryCov_9fa48("22143"), ' ')).repeat(500001), stryMutAct_9fa48("22144") ? "" : (stryCov_9fa48("22144"), '<html>Server error</html>')])) {
      if (stryMutAct_9fa48("22145")) {
        {}
      } else {
        stryCov_9fa48("22145");
        body = invalid;
        const fallback = await loadStoreObservations(location, signal);
        assert.equal(fallback.origin, stryMutAct_9fa48("22147") ? "" : (stryCov_9fa48("22147"), 'bundled'));
        if (stryMutAct_9fa48("22148")) {
          ;
        } else {
          stryCov_9fa48("22148");
          assert.deepEqual(fallback.storeListings, storeListings);
        }
      }
    }
  }
});
test(stryMutAct_9fa48("22150") ? "" : (stryCov_9fa48("22150"), 'an interrupted catalog read aborts the real connection instead of returning fallback data'), async t => {
  if (stryMutAct_9fa48("22151")) {
    {}
  } else {
    stryCov_9fa48("22151");
    const controller = new AbortController();
    let requestArrived;
    const arrived = new Promise(resolve => {
      if (stryMutAct_9fa48("22152")) {
        {}
      } else {
        stryCov_9fa48("22152");
        requestArrived = resolve;
      }
    });
    const location = await server(t, (_request, response) => {
      if (stryMutAct_9fa48("22153")) {
        {}
      } else {
        stryCov_9fa48("22153");
        response.writeHead(200, stryMutAct_9fa48("22155") ? {} : (stryCov_9fa48("22155"), {
          'Content-Type': stryMutAct_9fa48("22156") ? "" : (stryCov_9fa48("22156"), 'application/json')
        }));
        response.write(stryMutAct_9fa48("22158") ? "" : (stryCov_9fa48("22158"), '{'));
        requestArrived(stryMutAct_9fa48("22160") ? {} : (stryCov_9fa48("22160"), {
          closed: once(response, stryMutAct_9fa48("22161") ? "" : (stryCov_9fa48("22161"), 'close'))
        }));
      }
    });
    const loading = loadStoreObservations(location, controller.signal);
    const {
      closed
    } = await arrived;
    if (stryMutAct_9fa48("22162")) {
      ;
    } else {
      stryCov_9fa48("22162");
      controller.abort();
    }
    await assert.rejects(loading, stryMutAct_9fa48("22163") ? {} : (stryCov_9fa48("22163"), {
      name: stryMutAct_9fa48("22164") ? "" : (stryCov_9fa48("22164"), 'AbortError')
    }));
    await closed;
  }
});
test(stryMutAct_9fa48("22166") ? "" : (stryCov_9fa48("22166"), 'a stalled catalog body times out to the included snapshot and closes its connection'), stryMutAct_9fa48("22167") ? {} : (stryCov_9fa48("22167"), {
  timeout: 12000
}), async t => {
  if (stryMutAct_9fa48("22168")) {
    {}
  } else {
    stryCov_9fa48("22168");
    let connectionClosed;
    const closed = new Promise(resolve => {
      if (stryMutAct_9fa48("22169")) {
        {}
      } else {
        stryCov_9fa48("22169");
        connectionClosed = resolve;
      }
    });
    const location = await server(t, (request, response) => {
      if (stryMutAct_9fa48("22170")) {
        {}
      } else {
        stryCov_9fa48("22170");
        response.on(stryMutAct_9fa48("22172") ? "" : (stryCov_9fa48("22172"), 'close'), connectionClosed);
        response.writeHead(200, stryMutAct_9fa48("22174") ? {} : (stryCov_9fa48("22174"), {
          'Content-Type': stryMutAct_9fa48("22175") ? "" : (stryCov_9fa48("22175"), 'application/json')
        }));
        response.write(stryMutAct_9fa48("22177") ? "" : (stryCov_9fa48("22177"), '{'));
      }
    });
    const result = await loadStoreObservations(location, new AbortController().signal);
    assert.equal(result.origin, stryMutAct_9fa48("22179") ? "" : (stryCov_9fa48("22179"), 'bundled'));
    if (stryMutAct_9fa48("22180")) {
      ;
    } else {
      stryCov_9fa48("22180");
      assert.deepEqual(result.storeListings, storeListings);
    }
    await closed;
  }
});
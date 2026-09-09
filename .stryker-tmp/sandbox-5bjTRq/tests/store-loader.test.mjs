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
  if (stryMutAct_9fa48("22040")) {
    {}
  } else {
    stryCov_9fa48("22040");
    const http = createServer(handler);
    http.listen(0, stryMutAct_9fa48("22042") ? "" : (stryCov_9fa48("22042"), '127.0.0.1'));
    await once(http, stryMutAct_9fa48("22043") ? "" : (stryCov_9fa48("22043"), 'listening'));
    t.after(() => {
      if (stryMutAct_9fa48("22045")) {
        {}
      } else {
        stryCov_9fa48("22045");
        if (stryMutAct_9fa48("22046")) {
          ;
        } else {
          stryCov_9fa48("22046");
          http.closeAllConnections();
        }
        if (stryMutAct_9fa48("22047")) {
          ;
        } else {
          stryCov_9fa48("22047");
          http.close();
        }
      }
    });
    const address = http.address();
    assert.ok(stryMutAct_9fa48("22051") ? address || typeof address === 'object' : stryMutAct_9fa48("22050") ? false : stryMutAct_9fa48("22049") ? true : (stryCov_9fa48("22049", "22050", "22051"), address && (stryMutAct_9fa48("22053") ? typeof address !== 'object' : stryMutAct_9fa48("22052") ? true : (stryCov_9fa48("22052", "22053"), typeof address === (stryMutAct_9fa48("22054") ? "" : (stryCov_9fa48("22054"), 'object'))))));
    return new URL(stryMutAct_9fa48("22055") ? `` : (stryCov_9fa48("22055"), `http://127.0.0.1:${address.port}/#discover`));
  }
}
test(stryMutAct_9fa48("22057") ? "" : (stryCov_9fa48("22057"), 'catalog reader uses real HTTP data and rejects damaged or oversized responses'), async t => {
  if (stryMutAct_9fa48("22058")) {
    {}
  } else {
    stryCov_9fa48("22058");
    const snapshot = await readFile(new URL(stryMutAct_9fa48("22059") ? "" : (stryCov_9fa48("22059"), '../data/store-observations.json'), import.meta.url), stryMutAct_9fa48("22060") ? "" : (stryCov_9fa48("22060"), 'utf8'));
    let body = snapshot;
    const location = await server(t, (request, response) => {
      if (stryMutAct_9fa48("22061")) {
        {}
      } else {
        stryCov_9fa48("22061");
        assert.equal(new URL(request.url, stryMutAct_9fa48("22063") ? "" : (stryCov_9fa48("22063"), 'http://local')).pathname, stryMutAct_9fa48("22064") ? "" : (stryCov_9fa48("22064"), '/api/catalog'));
        response.writeHead(200, stryMutAct_9fa48("22066") ? {} : (stryCov_9fa48("22066"), {
          'Content-Type': stryMutAct_9fa48("22067") ? "" : (stryCov_9fa48("22067"), 'application/json'),
          'Content-Length': Buffer.byteLength(body)
        }));
        if (stryMutAct_9fa48("22068")) {
          ;
        } else {
          stryCov_9fa48("22068");
          response.end(body);
        }
      }
    });
    const signal = new AbortController().signal;
    const hosted = await loadStoreObservations(location, signal);
    assert.equal(hosted.origin, stryMutAct_9fa48("22070") ? "" : (stryCov_9fa48("22070"), 'hosted'));
    if (stryMutAct_9fa48("22071")) {
      ;
    } else {
      stryCov_9fa48("22071");
      assert.deepEqual(hosted.storeListings, storeListings);
    }
    const changed = JSON.parse(snapshot);
    changed.evidence[0].result.products[0].name = stryMutAct_9fa48("22072") ? "" : (stryCov_9fa48("22072"), 'Altered without matching evidence');
    for (const invalid of stryMutAct_9fa48("22073") ? [] : (stryCov_9fa48("22073"), [JSON.stringify(changed), (stryMutAct_9fa48("22074") ? "" : (stryCov_9fa48("22074"), ' ')).repeat(500001), stryMutAct_9fa48("22075") ? "" : (stryCov_9fa48("22075"), '<html>Server error</html>')])) {
      if (stryMutAct_9fa48("22076")) {
        {}
      } else {
        stryCov_9fa48("22076");
        body = invalid;
        const fallback = await loadStoreObservations(location, signal);
        assert.equal(fallback.origin, stryMutAct_9fa48("22078") ? "" : (stryCov_9fa48("22078"), 'bundled'));
        if (stryMutAct_9fa48("22079")) {
          ;
        } else {
          stryCov_9fa48("22079");
          assert.deepEqual(fallback.storeListings, storeListings);
        }
      }
    }
  }
});
test(stryMutAct_9fa48("22081") ? "" : (stryCov_9fa48("22081"), 'an interrupted catalog read aborts the real connection instead of returning fallback data'), async t => {
  if (stryMutAct_9fa48("22082")) {
    {}
  } else {
    stryCov_9fa48("22082");
    const controller = new AbortController();
    let requestArrived;
    const arrived = new Promise(resolve => {
      if (stryMutAct_9fa48("22083")) {
        {}
      } else {
        stryCov_9fa48("22083");
        requestArrived = resolve;
      }
    });
    const location = await server(t, (_request, response) => {
      if (stryMutAct_9fa48("22084")) {
        {}
      } else {
        stryCov_9fa48("22084");
        response.writeHead(200, stryMutAct_9fa48("22086") ? {} : (stryCov_9fa48("22086"), {
          'Content-Type': stryMutAct_9fa48("22087") ? "" : (stryCov_9fa48("22087"), 'application/json')
        }));
        response.write(stryMutAct_9fa48("22089") ? "" : (stryCov_9fa48("22089"), '{'));
        requestArrived(stryMutAct_9fa48("22091") ? {} : (stryCov_9fa48("22091"), {
          closed: once(response, stryMutAct_9fa48("22092") ? "" : (stryCov_9fa48("22092"), 'close'))
        }));
      }
    });
    const loading = loadStoreObservations(location, controller.signal);
    const {
      closed
    } = await arrived;
    if (stryMutAct_9fa48("22093")) {
      ;
    } else {
      stryCov_9fa48("22093");
      controller.abort();
    }
    await assert.rejects(loading, stryMutAct_9fa48("22094") ? {} : (stryCov_9fa48("22094"), {
      name: stryMutAct_9fa48("22095") ? "" : (stryCov_9fa48("22095"), 'AbortError')
    }));
    await closed;
  }
});
test(stryMutAct_9fa48("22097") ? "" : (stryCov_9fa48("22097"), 'a stalled catalog body times out to the included snapshot and closes its connection'), stryMutAct_9fa48("22098") ? {} : (stryCov_9fa48("22098"), {
  timeout: 12000
}), async t => {
  if (stryMutAct_9fa48("22099")) {
    {}
  } else {
    stryCov_9fa48("22099");
    let connectionClosed;
    const closed = new Promise(resolve => {
      if (stryMutAct_9fa48("22100")) {
        {}
      } else {
        stryCov_9fa48("22100");
        connectionClosed = resolve;
      }
    });
    const location = await server(t, (request, response) => {
      if (stryMutAct_9fa48("22101")) {
        {}
      } else {
        stryCov_9fa48("22101");
        response.on(stryMutAct_9fa48("22103") ? "" : (stryCov_9fa48("22103"), 'close'), connectionClosed);
        response.writeHead(200, stryMutAct_9fa48("22105") ? {} : (stryCov_9fa48("22105"), {
          'Content-Type': stryMutAct_9fa48("22106") ? "" : (stryCov_9fa48("22106"), 'application/json')
        }));
        response.write(stryMutAct_9fa48("22108") ? "" : (stryCov_9fa48("22108"), '{'));
      }
    });
    const result = await loadStoreObservations(location, new AbortController().signal);
    assert.equal(result.origin, stryMutAct_9fa48("22110") ? "" : (stryCov_9fa48("22110"), 'bundled'));
    if (stryMutAct_9fa48("22111")) {
      ;
    } else {
      stryCov_9fa48("22111");
      assert.deepEqual(result.storeListings, storeListings);
    }
    await closed;
  }
});
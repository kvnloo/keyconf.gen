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
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { POST } from '../app/api/import/route.ts';
const endpoint = stryMutAct_9fa48("20819") ? "" : (stryCov_9fa48("20819"), 'https://keyconf.example/api/import');
const headers = stryMutAct_9fa48("20820") ? {} : (stryCov_9fa48("20820"), {
  origin: stryMutAct_9fa48("20821") ? "" : (stryCov_9fa48("20821"), 'https://keyconf.example'),
  'content-type': stryMutAct_9fa48("20822") ? "" : (stryCov_9fa48("20822"), 'application/json')
});
test(stryMutAct_9fa48("20824") ? "" : (stryCov_9fa48("20824"), 'An oversized streamed import stops before reading its remaining body'), async () => {
  if (stryMutAct_9fa48("20825")) {
    {}
  } else {
    stryCov_9fa48("20825");
    let pulls = 0;
    let canceled = stryMutAct_9fa48("20826") ? true : (stryCov_9fa48("20826"), false);
    const body = new ReadableStream(stryMutAct_9fa48("20827") ? {} : (stryCov_9fa48("20827"), {
      pull(controller) {
        if (stryMutAct_9fa48("20828")) {
          {}
        } else {
          stryCov_9fa48("20828");
          stryMutAct_9fa48("20829") ? pulls-- : (stryCov_9fa48("20829"), pulls++);
          if (stryMutAct_9fa48("20832") ? pulls !== 1 : stryMutAct_9fa48("20831") ? false : stryMutAct_9fa48("20830") ? true : (stryCov_9fa48("20830", "20831", "20832"), pulls === 1)) {
            if (stryMutAct_9fa48("20833")) {
              ;
            } else {
              stryCov_9fa48("20833");
              controller.enqueue(new Uint8Array(12_289));
            }
          } else controller.error(new Error(stryMutAct_9fa48("20835") ? "" : (stryCov_9fa48("20835"), 'The remainder must not be read')));
        }
      },
      cancel() {
        if (stryMutAct_9fa48("20836")) {
          {}
        } else {
          stryCov_9fa48("20836");
          canceled = stryMutAct_9fa48("20837") ? false : (stryCov_9fa48("20837"), true);
        }
      }
    }), stryMutAct_9fa48("20838") ? {} : (stryCov_9fa48("20838"), {
      highWaterMark: 0
    }));
    const response = await POST(new Request(endpoint, stryMutAct_9fa48("20839") ? {} : (stryCov_9fa48("20839"), {
      method: stryMutAct_9fa48("20840") ? "" : (stryCov_9fa48("20840"), 'POST'),
      headers,
      body,
      duplex: stryMutAct_9fa48("20841") ? "" : (stryCov_9fa48("20841"), 'half')
    })));
    if (stryMutAct_9fa48("20842")) {
      ;
    } else {
      stryCov_9fa48("20842");
      assert.equal(response.status, 413);
    }
    if (stryMutAct_9fa48("20843")) {
      ;
    } else {
      stryCov_9fa48("20843");
      assert.equal(pulls, 1);
    }
    assert.equal(canceled, stryMutAct_9fa48("20845") ? false : (stryCov_9fa48("20845"), true));
    assert.equal(response.headers.get(stryMutAct_9fa48("20847") ? "" : (stryCov_9fa48("20847"), 'Access-Control-Allow-Origin')), headers.origin);
  }
});
test(stryMutAct_9fa48("20849") ? "" : (stryCov_9fa48("20849"), 'The import request limit counts UTF-8 bytes, not JavaScript characters'), async () => {
  if (stryMutAct_9fa48("20850")) {
    {}
  } else {
    stryCov_9fa48("20850");
    const body = JSON.stringify(stryMutAct_9fa48("20851") ? {} : (stryCov_9fa48("20851"), {
      url: stryMutAct_9fa48("20852") ? "" : (stryCov_9fa48("20852"), 'https://localhost/'),
      note: (stryMutAct_9fa48("20853") ? "" : (stryCov_9fa48("20853"), 'é')).repeat(6500)
    }));
    assert.ok(stryMutAct_9fa48("20858") ? body.length >= 12_288 : stryMutAct_9fa48("20857") ? body.length <= 12_288 : stryMutAct_9fa48("20856") ? false : stryMutAct_9fa48("20855") ? true : (stryCov_9fa48("20855", "20856", "20857", "20858"), body.length < 12_288));
    const response = await POST(new Request(endpoint, stryMutAct_9fa48("20859") ? {} : (stryCov_9fa48("20859"), {
      method: stryMutAct_9fa48("20860") ? "" : (stryCov_9fa48("20860"), 'POST'),
      headers,
      body
    })));
    if (stryMutAct_9fa48("20861")) {
      ;
    } else {
      stryCov_9fa48("20861");
      assert.equal(response.status, 413);
    }
  }
});
test(stryMutAct_9fa48("20863") ? "" : (stryCov_9fa48("20863"), 'An oversized declared body is canceled without consuming chunks'), async () => {
  if (stryMutAct_9fa48("20864")) {
    {}
  } else {
    stryCov_9fa48("20864");
    let canceled = stryMutAct_9fa48("20865") ? true : (stryCov_9fa48("20865"), false);
    const body = new ReadableStream(stryMutAct_9fa48("20866") ? {} : (stryCov_9fa48("20866"), {
      pull() {
        if (stryMutAct_9fa48("20867")) {
          {}
        } else {
          stryCov_9fa48("20867");
          assert.fail(stryMutAct_9fa48("20869") ? "" : (stryCov_9fa48("20869"), 'The declared oversized body must not be read'));
        }
      },
      cancel() {
        if (stryMutAct_9fa48("20870")) {
          {}
        } else {
          stryCov_9fa48("20870");
          canceled = stryMutAct_9fa48("20871") ? false : (stryCov_9fa48("20871"), true);
        }
      }
    }), stryMutAct_9fa48("20872") ? {} : (stryCov_9fa48("20872"), {
      highWaterMark: 0
    }));
    const response = await POST(new Request(endpoint, stryMutAct_9fa48("20873") ? {} : (stryCov_9fa48("20873"), {
      method: stryMutAct_9fa48("20874") ? "" : (stryCov_9fa48("20874"), 'POST'),
      headers: stryMutAct_9fa48("20875") ? {} : (stryCov_9fa48("20875"), {
        ...headers,
        'content-length': stryMutAct_9fa48("20876") ? "" : (stryCov_9fa48("20876"), '12289')
      }),
      body,
      duplex: stryMutAct_9fa48("20877") ? "" : (stryCov_9fa48("20877"), 'half')
    })));
    if (stryMutAct_9fa48("20878")) {
      ;
    } else {
      stryCov_9fa48("20878");
      assert.equal(response.status, 413);
    }
    assert.equal(canceled, stryMutAct_9fa48("20880") ? false : (stryCov_9fa48("20880"), true));
  }
});
test(stryMutAct_9fa48("20882") ? "" : (stryCov_9fa48("20882"), 'A split UTF-8 sequence reaches normal request validation below the limit'), async () => {
  if (stryMutAct_9fa48("20883")) {
    {}
  } else {
    stryCov_9fa48("20883");
    const bytes = new TextEncoder().encode(JSON.stringify(stryMutAct_9fa48("20884") ? {} : (stryCov_9fa48("20884"), {
      url: stryMutAct_9fa48("20885") ? "" : (stryCov_9fa48("20885"), 'https://localhost/'),
      note: stryMutAct_9fa48("20886") ? "" : (stryCov_9fa48("20886"), 'é')
    })));
    const split = stryMutAct_9fa48("20887") ? bytes.indexOf(0xc3) - 1 : (stryCov_9fa48("20887"), bytes.indexOf(0xc3) + 1);
    const body = new ReadableStream(stryMutAct_9fa48("20888") ? {} : (stryCov_9fa48("20888"), {
      start(controller) {
        if (stryMutAct_9fa48("20889")) {
          {}
        } else {
          stryCov_9fa48("20889");
          controller.enqueue(stryMutAct_9fa48("20891") ? bytes : (stryCov_9fa48("20891"), bytes.slice(0, split)));
          controller.enqueue(stryMutAct_9fa48("20893") ? bytes : (stryCov_9fa48("20893"), bytes.slice(split)));
          if (stryMutAct_9fa48("20894")) {
            ;
          } else {
            stryCov_9fa48("20894");
            controller.close();
          }
        }
      }
    }));
    const response = await POST(new Request(endpoint, stryMutAct_9fa48("20895") ? {} : (stryCov_9fa48("20895"), {
      method: stryMutAct_9fa48("20896") ? "" : (stryCov_9fa48("20896"), 'POST'),
      headers,
      body,
      duplex: stryMutAct_9fa48("20897") ? "" : (stryCov_9fa48("20897"), 'half')
    })));
    if (stryMutAct_9fa48("20898")) {
      ;
    } else {
      stryCov_9fa48("20898");
      assert.equal(response.status, 422);
    }
    if (stryMutAct_9fa48("20899")) {
      ;
    } else {
      stryCov_9fa48("20899");
      assert.match((await response.json()).error, /public|local/i);
    }
  }
});
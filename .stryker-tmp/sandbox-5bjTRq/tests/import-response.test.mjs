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
import { importWebsite } from '../lib/import-products.ts';
function trackedResponse(init) {
  if (stryMutAct_9fa48("20900")) {
    {}
  } else {
    stryCov_9fa48("20900");
    const state = stryMutAct_9fa48("20901") ? {} : (stryCov_9fa48("20901"), {
      canceled: stryMutAct_9fa48("20902") ? true : (stryCov_9fa48("20902"), false),
      pulls: 0
    });
    const body = new ReadableStream(stryMutAct_9fa48("20903") ? {} : (stryCov_9fa48("20903"), {
      pull() {
        if (stryMutAct_9fa48("20904")) {
          {}
        } else {
          stryCov_9fa48("20904");
          stryMutAct_9fa48("20905") ? state.pulls-- : (stryCov_9fa48("20905"), state.pulls++);
        }
      },
      cancel() {
        if (stryMutAct_9fa48("20906")) {
          {}
        } else {
          stryCov_9fa48("20906");
          state.canceled = stryMutAct_9fa48("20907") ? false : (stryCov_9fa48("20907"), true);
        }
      }
    }), stryMutAct_9fa48("20908") ? {} : (stryCov_9fa48("20908"), {
      highWaterMark: 0
    }));
    return stryMutAct_9fa48("20909") ? {} : (stryCov_9fa48("20909"), {
      response: new Response(body, init),
      state
    });
  }
}
function serve(t, respond) {
  if (stryMutAct_9fa48("20910")) {
    {}
  } else {
    stryCov_9fa48("20910");
    t.mock.method(globalThis, stryMutAct_9fa48("20912") ? "" : (stryCov_9fa48("20912"), 'fetch'), stryMutAct_9fa48("20913") ? () => undefined : (stryCov_9fa48("20913"), async input => (stryMutAct_9fa48("20914") ? String(input).endsWith('https://cloudflare-dns.com/') : (stryCov_9fa48("20914"), String(input).startsWith(stryMutAct_9fa48("20915") ? "" : (stryCov_9fa48("20915"), 'https://cloudflare-dns.com/')))) ? Response.json(stryMutAct_9fa48("20916") ? {} : (stryCov_9fa48("20916"), {
      Answer: stryMutAct_9fa48("20917") ? [] : (stryCov_9fa48("20917"), [stryMutAct_9fa48("20918") ? {} : (stryCov_9fa48("20918"), {
        type: 1,
        data: stryMutAct_9fa48("20919") ? "" : (stryCov_9fa48("20919"), '1.1.1.1')
      })])
    })) : respond(String(input))));
  }
}
for (const {
  name,
  init,
  message
} of stryMutAct_9fa48("20920") ? [] : (stryCov_9fa48("20920"), [stryMutAct_9fa48("20921") ? {} : (stryCov_9fa48("20921"), {
  name: stryMutAct_9fa48("20922") ? "" : (stryCov_9fa48("20922"), 'HTTP error'),
  init: stryMutAct_9fa48("20923") ? {} : (stryCov_9fa48("20923"), {
    status: 503
  }),
  message: /HTTP 503/
}), stryMutAct_9fa48("20924") ? {} : (stryCov_9fa48("20924"), {
  name: stryMutAct_9fa48("20925") ? "" : (stryCov_9fa48("20925"), 'declared oversize'),
  init: stryMutAct_9fa48("20926") ? {} : (stryCov_9fa48("20926"), {
    headers: stryMutAct_9fa48("20927") ? {} : (stryCov_9fa48("20927"), {
      'content-length': stryMutAct_9fa48("20928") ? "" : (stryCov_9fa48("20928"), '2000001')
    })
  }),
  message: /too large/
}), stryMutAct_9fa48("20929") ? {} : (stryCov_9fa48("20929"), {
  name: stryMutAct_9fa48("20930") ? "" : (stryCov_9fa48("20930"), 'redirect without a destination'),
  init: stryMutAct_9fa48("20931") ? {} : (stryCov_9fa48("20931"), {
    status: 302
  }),
  message: /redirected/
})])) {
  if (stryMutAct_9fa48("20932")) {
    {}
  } else {
    stryCov_9fa48("20932");
    test(stryMutAct_9fa48("20934") ? `` : (stryCov_9fa48("20934"), `import cancels ${name} without reading its body`), async t => {
      if (stryMutAct_9fa48("20935")) {
        {}
      } else {
        stryCov_9fa48("20935");
        const {
          response,
          state
        } = trackedResponse(init);
        serve(t, stryMutAct_9fa48("20937") ? () => undefined : (stryCov_9fa48("20937"), () => response));
        await assert.rejects(importWebsite(stryMutAct_9fa48("20938") ? "" : (stryCov_9fa48("20938"), 'https://switch-shop.example/catalog')), message);
        assert.equal(state.canceled, stryMutAct_9fa48("20940") ? false : (stryCov_9fa48("20940"), true));
        if (stryMutAct_9fa48("20941")) {
          ;
        } else {
          stryCov_9fa48("20941");
          assert.equal(state.pulls, 0);
        }
      }
    });
  }
}
test(stryMutAct_9fa48("20943") ? "" : (stryCov_9fa48("20943"), 'redirect response is canceled before requesting its destination'), async t => {
  if (stryMutAct_9fa48("20944")) {
    {}
  } else {
    stryCov_9fa48("20944");
    const {
      response,
      state
    } = trackedResponse(stryMutAct_9fa48("20945") ? {} : (stryCov_9fa48("20945"), {
      status: 302,
      headers: stryMutAct_9fa48("20946") ? {} : (stryCov_9fa48("20946"), {
        location: stryMutAct_9fa48("20947") ? "" : (stryCov_9fa48("20947"), '/destination')
      })
    }));
    let canceledAtDestination = stryMutAct_9fa48("20948") ? true : (stryCov_9fa48("20948"), false);
    serve(t, url => {
      if (stryMutAct_9fa48("20950")) {
        {}
      } else {
        stryCov_9fa48("20950");
        if (stryMutAct_9fa48("20953") ? url.startsWith('/catalog') : stryMutAct_9fa48("20952") ? false : stryMutAct_9fa48("20951") ? true : (stryCov_9fa48("20951", "20952", "20953"), url.endsWith(stryMutAct_9fa48("20954") ? "" : (stryCov_9fa48("20954"), '/catalog')))) return response;
        canceledAtDestination = state.canceled;
        return new Response(stryMutAct_9fa48("20955") ? "" : (stryCov_9fa48("20955"), '<script type="application/ld+json">{"@type":"Product","name":"Switch"}</script>'));
      }
    });
    const result = await importWebsite(stryMutAct_9fa48("20956") ? "" : (stryCov_9fa48("20956"), 'https://switch-shop.example/catalog'));
    assert.equal(result.products[0].name, stryMutAct_9fa48("20958") ? "" : (stryCov_9fa48("20958"), 'Switch'));
    assert.equal(canceledAtDestination, stryMutAct_9fa48("20960") ? false : (stryCov_9fa48("20960"), true));
    if (stryMutAct_9fa48("20961")) {
      ;
    } else {
      stryCov_9fa48("20961");
      assert.equal(state.pulls, 0);
    }
  }
});
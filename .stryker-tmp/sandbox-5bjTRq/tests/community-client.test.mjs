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
import { defaultBuild } from '../lib/build.ts';
import { snapshotEvidence } from '../db/build-snapshot.ts';
import { CommunityClientError, createCommunityClient, parseOwnedPublicationPage, parseSavedBuildPage } from '../lib/community-client.ts';
const profile = stryMutAct_9fa48("17132") ? {} : (stryCov_9fa48("17132"), {
  handle: stryMutAct_9fa48("17133") ? "" : (stryCov_9fa48("17133"), 'alice_keys'),
  displayName: stryMutAct_9fa48("17134") ? "" : (stryCov_9fa48("17134"), 'Alice'),
  bio: stryMutAct_9fa48("17135") ? "Stryker was here!" : (stryCov_9fa48("17135"), ''),
  links: stryMutAct_9fa48("17136") ? ["Stryker was here"] : (stryCov_9fa48("17136"), [])
});
const saved = stryMutAct_9fa48("17137") ? {} : (stryCov_9fa48("17137"), {
  id: stryMutAct_9fa48("17138") ? "" : (stryCov_9fa48("17138"), 'saved-build-00000001'),
  name: stryMutAct_9fa48("17139") ? "" : (stryCov_9fa48("17139"), 'Private keyboard'),
  createdAt: stryMutAct_9fa48("17140") ? "" : (stryCov_9fa48("17140"), '2026-09-06T00:00:00.000Z'),
  build: stryMutAct_9fa48("17141") ? {} : (stryCov_9fa48("17141"), {
    ...defaultBuild,
    name: stryMutAct_9fa48("17142") ? "" : (stryCov_9fa48("17142"), 'Private keyboard')
  })
});
const summary = stryMutAct_9fa48("17143") ? () => undefined : (stryCov_9fa48("17143"), (() => {
  const summary = (id = saved.id) => stryMutAct_9fa48("17144") ? {} : (stryCov_9fa48("17144"), {
    id,
    name: saved.name,
    createdAt: saved.createdAt
  });
  return summary;
})());
const publicationRequest = stryMutAct_9fa48("17145") ? {} : (stryCov_9fa48("17145"), {
  operationId: stryMutAct_9fa48("17146") ? "" : (stryCov_9fa48("17146"), 'creator-OPERATION_00001'),
  buildId: saved.id,
  title: stryMutAct_9fa48("17147") ? "" : (stryCov_9fa48("17147"), 'Forest keyboard'),
  note: stryMutAct_9fa48("17148") ? "" : (stryCov_9fa48("17148"), 'My saved revision.'),
  kind: stryMutAct_9fa48("17149") ? "" : (stryCov_9fa48("17149"), 'build')
});
const published = stryMutAct_9fa48("17150") ? {} : (stryCov_9fa48("17150"), {
  operationId: publicationRequest.operationId,
  buildId: publicationRequest.buildId,
  id: stryMutAct_9fa48("17151") ? "" : (stryCov_9fa48("17151"), 'publication-000001'),
  title: publicationRequest.title,
  note: publicationRequest.note,
  release: stryMutAct_9fa48("17152") ? {} : (stryCov_9fa48("17152"), {
    kind: stryMutAct_9fa48("17153") ? "" : (stryCov_9fa48("17153"), 'build')
  }),
  author: profile,
  build: stryMutAct_9fa48("17154") ? {} : (stryCov_9fa48("17154"), {
    ...saved.build,
    name: publicationRequest.title
  }),
  evidence: JSON.parse(await snapshotEvidence(saved.build)),
  customization: stryMutAct_9fa48("17155") ? "" : (stryCov_9fa48("17155"), 'available'),
  publishedAt: saved.createdAt,
  withdrawnAt: null
});
const publicationSummary = stryMutAct_9fa48("17156") ? () => undefined : (stryCov_9fa48("17156"), (() => {
  const publicationSummary = (id = published.id) => stryMutAct_9fa48("17157") ? {} : (stryCov_9fa48("17157"), {
    id,
    title: published.title,
    kind: published.release.kind,
    publishedAt: published.publishedAt,
    withdrawnAt: null
  });
  return publicationSummary;
})());
const publishedReceipt = stryMutAct_9fa48("17158") ? {} : (stryCov_9fa48("17158"), {
  status: stryMutAct_9fa48("17159") ? "" : (stryCov_9fa48("17159"), 'published'),
  id: published.id,
  title: published.title,
  note: published.note,
  release: published.release,
  author: published.author,
  publishedAt: published.publishedAt
});
function queued(...responses) {
  if (stryMutAct_9fa48("17160")) {
    {}
  } else {
    stryCov_9fa48("17160");
    const calls = stryMutAct_9fa48("17161") ? ["Stryker was here"] : (stryCov_9fa48("17161"), []);
    const client = createCommunityClient(stryMutAct_9fa48("17162") ? {} : (stryCov_9fa48("17162"), {
      fetch: async (url, init) => {
        if (stryMutAct_9fa48("17163")) {
          {}
        } else {
          stryCov_9fa48("17163");
          calls.push(stryMutAct_9fa48("17165") ? {} : (stryCov_9fa48("17165"), {
            url,
            ...init
          }));
          const next = responses.shift();
          assert.ok(next, stryMutAct_9fa48("17167") ? "" : (stryCov_9fa48("17167"), 'Unexpected account request'));
          return next;
        }
      }
    }));
    return stryMutAct_9fa48("17168") ? {} : (stryCov_9fa48("17168"), {
      client,
      calls
    });
  }
}
function errorCode(code) {
  if (stryMutAct_9fa48("17169")) {
    {}
  } else {
    stryCov_9fa48("17169");
    return stryMutAct_9fa48("17170") ? () => undefined : (stryCov_9fa48("17170"), error => stryMutAct_9fa48("17173") ? error instanceof CommunityClientError || error.code === code : stryMutAct_9fa48("17172") ? false : stryMutAct_9fa48("17171") ? true : (stryCov_9fa48("17171", "17172", "17173"), error instanceof CommunityClientError && (stryMutAct_9fa48("17175") ? error.code !== code : stryMutAct_9fa48("17174") ? true : (stryCov_9fa48("17174", "17175"), error.code === code))));
  }
}
test(stryMutAct_9fa48("17177") ? "" : (stryCov_9fa48("17177"), 'account operations use fixed paths, private requests and parsed response shapes'), async () => {
  if (stryMutAct_9fa48("17178")) {
    {}
  } else {
    stryCov_9fa48("17178");
    const page = stryMutAct_9fa48("17179") ? {} : (stryCov_9fa48("17179"), {
      items: stryMutAct_9fa48("17180") ? [] : (stryCov_9fa48("17180"), [summary()]),
      next: null
    });
    const {
      client,
      calls
    } = queued(Response.json(stryMutAct_9fa48("17181") ? {} : (stryCov_9fa48("17181"), {
      profile: null
    })), Response.json(stryMutAct_9fa48("17182") ? {} : (stryCov_9fa48("17182"), {
      profile: stryMutAct_9fa48("17183") ? {} : (stryCov_9fa48("17183"), {
        ...profile,
        privateField: stryMutAct_9fa48("17184") ? "" : (stryCov_9fa48("17184"), 'hidden')
      })
    })), Response.json(stryMutAct_9fa48("17185") ? {} : (stryCov_9fa48("17185"), {
      profile
    })), Response.json(page), Response.json(saved), Response.json(saved));
    if (stryMutAct_9fa48("17186")) {
      ;
    } else {
      stryCov_9fa48("17186");
      assert.equal(await client.readProfile(), null);
    }
    if (stryMutAct_9fa48("17187")) {
      ;
    } else {
      stryCov_9fa48("17187");
      assert.deepEqual(await client.readProfile(), profile);
    }
    assert.deepEqual(await client.saveProfile(stryMutAct_9fa48("17189") ? {} : (stryCov_9fa48("17189"), {
      ...profile,
      handle: stryMutAct_9fa48("17190") ? "" : (stryCov_9fa48("17190"), ' ALICE_KEYS ')
    })), profile);
    if (stryMutAct_9fa48("17191")) {
      ;
    } else {
      stryCov_9fa48("17191");
      assert.deepEqual(await client.listBuilds(), page);
    }
    const input = stryMutAct_9fa48("17192") ? {} : (stryCov_9fa48("17192"), {
      operationId: stryMutAct_9fa48("17193") ? "" : (stryCov_9fa48("17193"), 'client-save-operation-001'),
      build: saved.build
    });
    if (stryMutAct_9fa48("17194")) {
      ;
    } else {
      stryCov_9fa48("17194");
      assert.deepEqual(await client.saveBuild(input), saved);
    }
    if (stryMutAct_9fa48("17195")) {
      ;
    } else {
      stryCov_9fa48("17195");
      assert.deepEqual(await client.readBuild(saved.id), saved);
    }
    assert.deepEqual(calls.map(stryMutAct_9fa48("17197") ? () => undefined : (stryCov_9fa48("17197"), ({
      url,
      method
    }) => stryMutAct_9fa48("17198") ? [] : (stryCov_9fa48("17198"), [url, method]))), stryMutAct_9fa48("17199") ? [] : (stryCov_9fa48("17199"), [stryMutAct_9fa48("17200") ? [] : (stryCov_9fa48("17200"), [stryMutAct_9fa48("17201") ? "" : (stryCov_9fa48("17201"), '/api/community/profile'), stryMutAct_9fa48("17202") ? "" : (stryCov_9fa48("17202"), 'GET')]), stryMutAct_9fa48("17203") ? [] : (stryCov_9fa48("17203"), [stryMutAct_9fa48("17204") ? "" : (stryCov_9fa48("17204"), '/api/community/profile'), stryMutAct_9fa48("17205") ? "" : (stryCov_9fa48("17205"), 'GET')]), stryMutAct_9fa48("17206") ? [] : (stryCov_9fa48("17206"), [stryMutAct_9fa48("17207") ? "" : (stryCov_9fa48("17207"), '/api/community/profile'), stryMutAct_9fa48("17208") ? "" : (stryCov_9fa48("17208"), 'PATCH')]), stryMutAct_9fa48("17209") ? [] : (stryCov_9fa48("17209"), [stryMutAct_9fa48("17210") ? "" : (stryCov_9fa48("17210"), '/api/community/builds'), stryMutAct_9fa48("17211") ? "" : (stryCov_9fa48("17211"), 'GET')]), stryMutAct_9fa48("17212") ? [] : (stryCov_9fa48("17212"), [stryMutAct_9fa48("17213") ? "" : (stryCov_9fa48("17213"), '/api/community/builds'), stryMutAct_9fa48("17214") ? "" : (stryCov_9fa48("17214"), 'POST')]), stryMutAct_9fa48("17215") ? [] : (stryCov_9fa48("17215"), [stryMutAct_9fa48("17216") ? `` : (stryCov_9fa48("17216"), `/api/community/builds/${saved.id}`), stryMutAct_9fa48("17217") ? "" : (stryCov_9fa48("17217"), 'GET')])]));
    for (const call of calls) {
      if (stryMutAct_9fa48("17218")) {
        {}
      } else {
        stryCov_9fa48("17218");
        assert.equal(call.credentials, stryMutAct_9fa48("17220") ? "" : (stryCov_9fa48("17220"), 'same-origin'));
        assert.equal(call.cache, stryMutAct_9fa48("17222") ? "" : (stryCov_9fa48("17222"), 'no-store'));
        assert.equal(call.redirect, stryMutAct_9fa48("17224") ? "" : (stryCov_9fa48("17224"), 'error'));
        assert.equal(call.headers.Accept, stryMutAct_9fa48("17226") ? "" : (stryCov_9fa48("17226"), 'application/json'));
        if (stryMutAct_9fa48("17227")) {
          ;
        } else {
          stryCov_9fa48("17227");
          assert.ok(call.signal instanceof AbortSignal);
        }
        if (stryMutAct_9fa48("17230") ? call.method !== 'GET' : stryMutAct_9fa48("17229") ? false : stryMutAct_9fa48("17228") ? true : (stryCov_9fa48("17228", "17229", "17230"), call.method === (stryMutAct_9fa48("17231") ? "" : (stryCov_9fa48("17231"), 'GET')))) {
          if (stryMutAct_9fa48("17232")) {
            ;
          } else {
            stryCov_9fa48("17232");
            assert.equal(call.body, undefined);
          }
        } else assert.equal(call.headers[stryMutAct_9fa48("17234") ? "" : (stryCov_9fa48("17234"), 'Content-Type')], stryMutAct_9fa48("17235") ? "" : (stryCov_9fa48("17235"), 'application/json'));
      }
    }
    if (stryMutAct_9fa48("17236")) {
      ;
    } else {
      stryCov_9fa48("17236");
      assert.deepEqual(JSON.parse(calls[2].body), profile);
    }
    if (stryMutAct_9fa48("17237")) {
      ;
    } else {
      stryCov_9fa48("17237");
      assert.deepEqual(JSON.parse(calls[4].body), input);
    }
  }
});
test(stryMutAct_9fa48("17239") ? "" : (stryCov_9fa48("17239"), 'saved-build page parsing strips extra fields and enforces cursor correctness'), () => {
  if (stryMutAct_9fa48("17240")) {
    {}
  } else {
    stryCov_9fa48("17240");
    const first = stryMutAct_9fa48("17241") ? {} : (stryCov_9fa48("17241"), {
      ...summary(stryMutAct_9fa48("17242") ? "" : (stryCov_9fa48("17242"), 'saved-build-00000003')),
      privateField: stryMutAct_9fa48("17243") ? "" : (stryCov_9fa48("17243"), 'hidden')
    });
    const second = summary(stryMutAct_9fa48("17244") ? "" : (stryCov_9fa48("17244"), 'saved-build-00000002'));
    assert.deepEqual(parseSavedBuildPage(stryMutAct_9fa48("17246") ? {} : (stryCov_9fa48("17246"), {
      items: stryMutAct_9fa48("17247") ? [] : (stryCov_9fa48("17247"), [first, second]),
      next: stryMutAct_9fa48("17248") ? {} : (stryCov_9fa48("17248"), {
        id: second.id,
        createdAt: second.createdAt
      }),
      owner: stryMutAct_9fa48("17249") ? "" : (stryCov_9fa48("17249"), 'hidden')
    })), stryMutAct_9fa48("17250") ? {} : (stryCov_9fa48("17250"), {
      items: stryMutAct_9fa48("17251") ? [] : (stryCov_9fa48("17251"), [summary(first.id), second]),
      next: stryMutAct_9fa48("17252") ? {} : (stryCov_9fa48("17252"), {
        id: second.id,
        createdAt: second.createdAt
      })
    }));
    for (const value of stryMutAct_9fa48("17253") ? [] : (stryCov_9fa48("17253"), [null, stryMutAct_9fa48("17254") ? ["Stryker was here"] : (stryCov_9fa48("17254"), []), stryMutAct_9fa48("17255") ? {} : (stryCov_9fa48("17255"), {
      items: stryMutAct_9fa48("17256") ? ["Stryker was here"] : (stryCov_9fa48("17256"), [])
    }), stryMutAct_9fa48("17257") ? {} : (stryCov_9fa48("17257"), {
      items: {},
      next: null
    }), stryMutAct_9fa48("17258") ? {} : (stryCov_9fa48("17258"), {
      items: Array.from(stryMutAct_9fa48("17259") ? {} : (stryCov_9fa48("17259"), {
        length: 26
      }), stryMutAct_9fa48("17260") ? () => undefined : (stryCov_9fa48("17260"), () => first)),
      next: null
    }), stryMutAct_9fa48("17261") ? {} : (stryCov_9fa48("17261"), {
      items: stryMutAct_9fa48("17262") ? [] : (stryCov_9fa48("17262"), [first, first]),
      next: null
    }), stryMutAct_9fa48("17263") ? {} : (stryCov_9fa48("17263"), {
      items: stryMutAct_9fa48("17264") ? [] : (stryCov_9fa48("17264"), [first, stryMutAct_9fa48("17265") ? {} : (stryCov_9fa48("17265"), {
        ...first,
        createdAt: stryMutAct_9fa48("17266") ? "" : (stryCov_9fa48("17266"), '2026-09-05T00:00:00.000Z')
      })]),
      next: null
    }), stryMutAct_9fa48("17267") ? {} : (stryCov_9fa48("17267"), {
      items: stryMutAct_9fa48("17268") ? [] : (stryCov_9fa48("17268"), [second, first]),
      next: null
    }), stryMutAct_9fa48("17269") ? {} : (stryCov_9fa48("17269"), {
      items: stryMutAct_9fa48("17270") ? [] : (stryCov_9fa48("17270"), [stryMutAct_9fa48("17271") ? {} : (stryCov_9fa48("17271"), {
        ...first,
        createdAt: stryMutAct_9fa48("17272") ? "" : (stryCov_9fa48("17272"), '2026-09-06T00:00:00Z')
      })]),
      next: null
    }), stryMutAct_9fa48("17273") ? {} : (stryCov_9fa48("17273"), {
      items: stryMutAct_9fa48("17274") ? [] : (stryCov_9fa48("17274"), [stryMutAct_9fa48("17275") ? {} : (stryCov_9fa48("17275"), {
        ...first,
        createdAt: stryMutAct_9fa48("17276") ? "" : (stryCov_9fa48("17276"), '2026-02-30T00:00:00.000Z')
      })]),
      next: null
    }), stryMutAct_9fa48("17277") ? {} : (stryCov_9fa48("17277"), {
      items: stryMutAct_9fa48("17278") ? [] : (stryCov_9fa48("17278"), [stryMutAct_9fa48("17279") ? {} : (stryCov_9fa48("17279"), {
        ...first,
        createdAt: stryMutAct_9fa48("17280") ? "" : (stryCov_9fa48("17280"), '2026-09-06T01:00:00.000+01:00')
      })]),
      next: null
    }), stryMutAct_9fa48("17281") ? {} : (stryCov_9fa48("17281"), {
      items: stryMutAct_9fa48("17282") ? [] : (stryCov_9fa48("17282"), [stryMutAct_9fa48("17283") ? {} : (stryCov_9fa48("17283"), {
        ...first,
        id: stryMutAct_9fa48("17284") ? "" : (stryCov_9fa48("17284"), '../private')
      })]),
      next: null
    }), stryMutAct_9fa48("17285") ? {} : (stryCov_9fa48("17285"), {
      items: stryMutAct_9fa48("17286") ? ["Stryker was here"] : (stryCov_9fa48("17286"), []),
      next: stryMutAct_9fa48("17287") ? {} : (stryCov_9fa48("17287"), {
        id: first.id,
        createdAt: first.createdAt
      })
    }), stryMutAct_9fa48("17288") ? {} : (stryCov_9fa48("17288"), {
      items: stryMutAct_9fa48("17289") ? [] : (stryCov_9fa48("17289"), [first]),
      next: stryMutAct_9fa48("17290") ? {} : (stryCov_9fa48("17290"), {
        id: second.id,
        createdAt: first.createdAt
      })
    }), stryMutAct_9fa48("17291") ? {} : (stryCov_9fa48("17291"), {
      items: stryMutAct_9fa48("17292") ? [] : (stryCov_9fa48("17292"), [first]),
      next: stryMutAct_9fa48("17293") ? {} : (stryCov_9fa48("17293"), {
        id: first.id,
        createdAt: stryMutAct_9fa48("17294") ? "" : (stryCov_9fa48("17294"), '2026-09-05T00:00:00.000Z')
      })
    })])) assert.throws(stryMutAct_9fa48("17296") ? () => undefined : (stryCov_9fa48("17296"), () => parseSavedBuildPage(value)), errorCode(stryMutAct_9fa48("17297") ? "" : (stryCov_9fa48("17297"), 'invalid_response')));
  }
});
test(stryMutAct_9fa48("17299") ? "" : (stryCov_9fa48("17299"), 'list requests encode the cursor and reject pages that repeat or precede its boundary'), async () => {
  if (stryMutAct_9fa48("17300")) {
    {}
  } else {
    stryCov_9fa48("17300");
    const cursor = stryMutAct_9fa48("17301") ? {} : (stryCov_9fa48("17301"), {
      createdAt: saved.createdAt,
      id: stryMutAct_9fa48("17302") ? "" : (stryCov_9fa48("17302"), 'saved-build-00000003')
    });
    const page = stryMutAct_9fa48("17303") ? {} : (stryCov_9fa48("17303"), {
      items: stryMutAct_9fa48("17304") ? [] : (stryCov_9fa48("17304"), [summary(stryMutAct_9fa48("17305") ? "" : (stryCov_9fa48("17305"), 'saved-build-00000002'))]),
      next: null
    });
    const {
      client,
      calls
    } = queued(Response.json(page), Response.json(stryMutAct_9fa48("17306") ? {} : (stryCov_9fa48("17306"), {
      items: stryMutAct_9fa48("17307") ? [] : (stryCov_9fa48("17307"), [summary(cursor.id)]),
      next: null
    })));
    if (stryMutAct_9fa48("17308")) {
      ;
    } else {
      stryCov_9fa48("17308");
      assert.deepEqual(await client.listBuilds(cursor), page);
    }
    const url = new URL(calls[0].url, stryMutAct_9fa48("17309") ? "" : (stryCov_9fa48("17309"), 'https://keyconf.example'));
    assert.equal(url.searchParams.get(stryMutAct_9fa48("17311") ? "" : (stryCov_9fa48("17311"), 'before')), cursor.createdAt);
    assert.equal(url.searchParams.get(stryMutAct_9fa48("17313") ? "" : (stryCov_9fa48("17313"), 'id')), cursor.id);
    await assert.rejects(client.listBuilds(cursor), errorCode(stryMutAct_9fa48("17314") ? "" : (stryCov_9fa48("17314"), 'invalid_response')));
  }
});
test(stryMutAct_9fa48("17316") ? "" : (stryCov_9fa48("17316"), 'safe server error codes remain recognisable without displaying backend messages'), async () => {
  if (stryMutAct_9fa48("17317")) {
    {}
  } else {
    stryCov_9fa48("17317");
    const secret = stryMutAct_9fa48("17318") ? "" : (stryCov_9fa48("17318"), 'SQL private-token <script>alert(1)</script>');
    for (const [status, payload, expected] of stryMutAct_9fa48("17319") ? [] : (stryCov_9fa48("17319"), [stryMutAct_9fa48("17320") ? [] : (stryCov_9fa48("17320"), [401, stryMutAct_9fa48("17321") ? {} : (stryCov_9fa48("17321"), {
      error: stryMutAct_9fa48("17322") ? {} : (stryCov_9fa48("17322"), {
        code: stryMutAct_9fa48("17323") ? "" : (stryCov_9fa48("17323"), 'authentication_required'),
        message: secret
      })
    }), stryMutAct_9fa48("17324") ? "" : (stryCov_9fa48("17324"), 'authentication_required')]), stryMutAct_9fa48("17325") ? [] : (stryCov_9fa48("17325"), [409, stryMutAct_9fa48("17326") ? {} : (stryCov_9fa48("17326"), {
      error: stryMutAct_9fa48("17327") ? {} : (stryCov_9fa48("17327"), {
        code: stryMutAct_9fa48("17328") ? "" : (stryCov_9fa48("17328"), 'operation_conflict'),
        message: secret
      })
    }), stryMutAct_9fa48("17329") ? "" : (stryCov_9fa48("17329"), 'operation_conflict')]), stryMutAct_9fa48("17330") ? [] : (stryCov_9fa48("17330"), [409, stryMutAct_9fa48("17331") ? {} : (stryCov_9fa48("17331"), {
      error: stryMutAct_9fa48("17332") ? {} : (stryCov_9fa48("17332"), {
        code: stryMutAct_9fa48("17333") ? "" : (stryCov_9fa48("17333"), 'handle_taken'),
        message: secret
      })
    }), stryMutAct_9fa48("17334") ? "" : (stryCov_9fa48("17334"), 'handle_taken')]), stryMutAct_9fa48("17335") ? [] : (stryCov_9fa48("17335"), [500, stryMutAct_9fa48("17336") ? {} : (stryCov_9fa48("17336"), {
      error: stryMutAct_9fa48("17337") ? {} : (stryCov_9fa48("17337"), {
        code: stryMutAct_9fa48("17338") ? "" : (stryCov_9fa48("17338"), 'internal_sql_error'),
        message: secret
      })
    }), stryMutAct_9fa48("17339") ? "" : (stryCov_9fa48("17339"), 'storage_unavailable')])])) {
      if (stryMutAct_9fa48("17340")) {
        {}
      } else {
        stryCov_9fa48("17340");
        const {
          client
        } = queued(Response.json(payload, stryMutAct_9fa48("17341") ? {} : (stryCov_9fa48("17341"), {
          status
        })));
        await assert.rejects(client.readProfile(), error => {
          if (stryMutAct_9fa48("17342")) {
            {}
          } else {
            stryCov_9fa48("17342");
            if (stryMutAct_9fa48("17343")) {
              ;
            } else {
              stryCov_9fa48("17343");
              assert.ok(errorCode(expected)(error));
            }
            if (stryMutAct_9fa48("17344")) {
              ;
            } else {
              stryCov_9fa48("17344");
              assert.equal(error.status, status);
            }
            assert.equal(error.message.includes(secret), stryMutAct_9fa48("17346") ? true : (stryCov_9fa48("17346"), false));
            assert.ok(stryMutAct_9fa48("17351") ? error.message.length >= 250 : stryMutAct_9fa48("17350") ? error.message.length <= 250 : stryMutAct_9fa48("17349") ? false : stryMutAct_9fa48("17348") ? true : (stryCov_9fa48("17348", "17349", "17350", "17351"), error.message.length < 250));
            return stryMutAct_9fa48("17352") ? false : (stryCov_9fa48("17352"), true);
          }
        });
      }
    }
    const {
      client
    } = queued(new Response(stryMutAct_9fa48("17353") ? "" : (stryCov_9fa48("17353"), '<html>Sign in</html>'), stryMutAct_9fa48("17354") ? {} : (stryCov_9fa48("17354"), {
      status: 401,
      headers: stryMutAct_9fa48("17355") ? {} : (stryCov_9fa48("17355"), {
        'Content-Type': stryMutAct_9fa48("17356") ? "" : (stryCov_9fa48("17356"), 'text/html')
      })
    })));
    await assert.rejects(client.readProfile(), errorCode(stryMutAct_9fa48("17357") ? "" : (stryCov_9fa48("17357"), 'authentication_required')));
  }
});
test(stryMutAct_9fa48("17359") ? "" : (stryCov_9fa48("17359"), 'malformed success responses and error pages never reach the account panel'), async () => {
  if (stryMutAct_9fa48("17360")) {
    {}
  } else {
    stryCov_9fa48("17360");
    for (const response of stryMutAct_9fa48("17361") ? [] : (stryCov_9fa48("17361"), [new Response(stryMutAct_9fa48("17362") ? "" : (stryCov_9fa48("17362"), '<html>Service unavailable</html>'), stryMutAct_9fa48("17363") ? {} : (stryCov_9fa48("17363"), {
      headers: stryMutAct_9fa48("17364") ? {} : (stryCov_9fa48("17364"), {
        'Content-Type': stryMutAct_9fa48("17365") ? "" : (stryCov_9fa48("17365"), 'text/html')
      })
    })), new Response(stryMutAct_9fa48("17366") ? "" : (stryCov_9fa48("17366"), '{broken'), stryMutAct_9fa48("17367") ? {} : (stryCov_9fa48("17367"), {
      headers: stryMutAct_9fa48("17368") ? {} : (stryCov_9fa48("17368"), {
        'Content-Type': stryMutAct_9fa48("17369") ? "" : (stryCov_9fa48("17369"), 'application/json')
      })
    })), Response.json({}), Response.json(stryMutAct_9fa48("17370") ? {} : (stryCov_9fa48("17370"), {
      profile: stryMutAct_9fa48("17371") ? {} : (stryCov_9fa48("17371"), {
        ...profile,
        handle: stryMutAct_9fa48("17372") ? "" : (stryCov_9fa48("17372"), 'admin')
      })
    }))])) {
      if (stryMutAct_9fa48("17373")) {
        {}
      } else {
        stryCov_9fa48("17373");
        const {
          client
        } = queued(response);
        await assert.rejects(client.readProfile(), errorCode(stryMutAct_9fa48("17374") ? "" : (stryCov_9fa48("17374"), 'invalid_response')));
      }
    }
    const nullSave = queued(Response.json(stryMutAct_9fa48("17375") ? {} : (stryCov_9fa48("17375"), {
      profile: null
    }))).client;
    await assert.rejects(nullSave.saveProfile(profile), errorCode(stryMutAct_9fa48("17376") ? "" : (stryCov_9fa48("17376"), 'invalid_response')));
    const wrongBuild = queued(Response.json(stryMutAct_9fa48("17377") ? {} : (stryCov_9fa48("17377"), {
      ...saved,
      id: stryMutAct_9fa48("17378") ? "" : (stryCov_9fa48("17378"), 'different-build-0001')
    }))).client;
    await assert.rejects(wrongBuild.readBuild(saved.id), errorCode(stryMutAct_9fa48("17379") ? "" : (stryCov_9fa48("17379"), 'invalid_response')));
    const malformedBuild = queued(Response.json(stryMutAct_9fa48("17380") ? {} : (stryCov_9fa48("17380"), {
      ...saved,
      build: null
    }))).client;
    await assert.rejects(malformedBuild.saveBuild(stryMutAct_9fa48("17381") ? {} : (stryCov_9fa48("17381"), {
      operationId: stryMutAct_9fa48("17382") ? "" : (stryCov_9fa48("17382"), 'client-save-operation-001'),
      build: saved.build
    })), errorCode(stryMutAct_9fa48("17383") ? "" : (stryCov_9fa48("17383"), 'invalid_response')));
  }
});
test(stryMutAct_9fa48("17385") ? "" : (stryCov_9fa48("17385"), 'account responses are bounded by bytes for declared and streamed bodies'), async () => {
  if (stryMutAct_9fa48("17386")) {
    {}
  } else {
    stryCov_9fa48("17386");
    let cancelled = stryMutAct_9fa48("17387") ? true : (stryCov_9fa48("17387"), false);
    const body = new ReadableStream(stryMutAct_9fa48("17388") ? {} : (stryCov_9fa48("17388"), {
      cancel() {
        if (stryMutAct_9fa48("17389")) {
          {}
        } else {
          stryCov_9fa48("17389");
          cancelled = stryMutAct_9fa48("17390") ? false : (stryCov_9fa48("17390"), true);
        }
      }
    }));
    const declared = queued(new Response(body, stryMutAct_9fa48("17391") ? {} : (stryCov_9fa48("17391"), {
      headers: stryMutAct_9fa48("17392") ? {} : (stryCov_9fa48("17392"), {
        'Content-Length': String(stryMutAct_9fa48("17393") ? 256 * 1024 - 1 : (stryCov_9fa48("17393"), (stryMutAct_9fa48("17394") ? 256 / 1024 : (stryCov_9fa48("17394"), 256 * 1024)) + 1)),
        'Content-Type': stryMutAct_9fa48("17395") ? "" : (stryCov_9fa48("17395"), 'application/json')
      })
    }))).client;
    await assert.rejects(declared.readProfile(), errorCode(stryMutAct_9fa48("17396") ? "" : (stryCov_9fa48("17396"), 'invalid_response')));
    assert.equal(cancelled, stryMutAct_9fa48("17398") ? false : (stryCov_9fa48("17398"), true));
    const streamed = queued(Response.json(stryMutAct_9fa48("17399") ? {} : (stryCov_9fa48("17399"), {
      profile,
      extra: (stryMutAct_9fa48("17400") ? "" : (stryCov_9fa48("17400"), 'é')).repeat(140000)
    }))).client;
    await assert.rejects(streamed.readProfile(), errorCode(stryMutAct_9fa48("17401") ? "" : (stryCov_9fa48("17401"), 'invalid_response')));
    const oversizedError = queued(Response.json(stryMutAct_9fa48("17402") ? {} : (stryCov_9fa48("17402"), {
      error: stryMutAct_9fa48("17403") ? {} : (stryCov_9fa48("17403"), {
        code: stryMutAct_9fa48("17404") ? "" : (stryCov_9fa48("17404"), 'handle_taken'),
        message: (stryMutAct_9fa48("17405") ? "" : (stryCov_9fa48("17405"), 'private')).repeat(1000)
      })
    }), stryMutAct_9fa48("17406") ? {} : (stryCov_9fa48("17406"), {
      status: 409
    }))).client;
    await assert.rejects(oversizedError.readProfile(), errorCode(stryMutAct_9fa48("17407") ? "" : (stryCov_9fa48("17407"), 'storage_unavailable')));
  }
});
test(stryMutAct_9fa48("17409") ? "" : (stryCov_9fa48("17409"), 'save retries send the original operation ID and never retry automatically'), async () => {
  if (stryMutAct_9fa48("17410")) {
    {}
  } else {
    stryCov_9fa48("17410");
    const calls = stryMutAct_9fa48("17411") ? ["Stryker was here"] : (stryCov_9fa48("17411"), []);
    const client = createCommunityClient(stryMutAct_9fa48("17412") ? {} : (stryCov_9fa48("17412"), {
      fetch: async (_url, init) => {
        if (stryMutAct_9fa48("17413")) {
          {}
        } else {
          stryCov_9fa48("17413");
          if (stryMutAct_9fa48("17414")) {
            ;
          } else {
            stryCov_9fa48("17414");
            calls.push(JSON.parse(init.body));
          }
          if (stryMutAct_9fa48("17417") ? calls.length !== 1 : stryMutAct_9fa48("17416") ? false : stryMutAct_9fa48("17415") ? true : (stryCov_9fa48("17415", "17416", "17417"), calls.length === 1)) throw new Error(stryMutAct_9fa48("17419") ? "" : (stryCov_9fa48("17419"), 'private network details'));
          return Response.json(saved);
        }
      }
    }));
    const input = stryMutAct_9fa48("17420") ? {} : (stryCov_9fa48("17420"), {
      operationId: stryMutAct_9fa48("17421") ? "" : (stryCov_9fa48("17421"), 'client-retry-operation-001'),
      build: saved.build
    });
    await assert.rejects(client.saveBuild(input), errorCode(stryMutAct_9fa48("17422") ? "" : (stryCov_9fa48("17422"), 'network_error')));
    if (stryMutAct_9fa48("17423")) {
      ;
    } else {
      stryCov_9fa48("17423");
      assert.equal(calls.length, 1);
    }
    if (stryMutAct_9fa48("17424")) {
      ;
    } else {
      stryCov_9fa48("17424");
      assert.deepEqual(await client.saveBuild(input), saved);
    }
    assert.deepEqual(calls, stryMutAct_9fa48("17426") ? [] : (stryCov_9fa48("17426"), [input, input]));
  }
});
test(stryMutAct_9fa48("17428") ? "" : (stryCov_9fa48("17428"), 'invalid IDs, cursors and save inputs cannot cause outgoing requests'), async () => {
  if (stryMutAct_9fa48("17429")) {
    {}
  } else {
    stryCov_9fa48("17429");
    const {
      client,
      calls
    } = queued();
    for (const action of stryMutAct_9fa48("17430") ? [] : (stryCov_9fa48("17430"), [stryMutAct_9fa48("17431") ? () => undefined : (stryCov_9fa48("17431"), () => client.readBuild(stryMutAct_9fa48("17432") ? "" : (stryCov_9fa48("17432"), 'https://evil.example/steal'))), stryMutAct_9fa48("17433") ? () => undefined : (stryCov_9fa48("17433"), () => client.readBuild(stryMutAct_9fa48("17434") ? "" : (stryCov_9fa48("17434"), '../profile'))), stryMutAct_9fa48("17435") ? () => undefined : (stryCov_9fa48("17435"), () => client.listBuilds(stryMutAct_9fa48("17436") ? {} : (stryCov_9fa48("17436"), {
      id: saved.id,
      createdAt: stryMutAct_9fa48("17437") ? "" : (stryCov_9fa48("17437"), 'yesterday')
    }))), stryMutAct_9fa48("17438") ? () => undefined : (stryCov_9fa48("17438"), () => client.saveBuild(stryMutAct_9fa48("17439") ? {} : (stryCov_9fa48("17439"), {
      build: saved.build
    }))), stryMutAct_9fa48("17440") ? () => undefined : (stryCov_9fa48("17440"), () => client.saveProfile(stryMutAct_9fa48("17441") ? {} : (stryCov_9fa48("17441"), {
      ...profile,
      handle: stryMutAct_9fa48("17442") ? "" : (stryCov_9fa48("17442"), 'admin')
    })))])) await assert.rejects(stryMutAct_9fa48("17443") ? () => undefined : (stryCov_9fa48("17443"), async () => action()), errorCode(stryMutAct_9fa48("17444") ? "" : (stryCov_9fa48("17444"), 'invalid_request')));
    if (stryMutAct_9fa48("17445")) {
      ;
    } else {
      stryCov_9fa48("17445");
      assert.equal(calls.length, 0);
    }
  }
});
test(stryMutAct_9fa48("17447") ? "" : (stryCov_9fa48("17447"), 'cancellation is preserved before fetch and during an active account request'), async () => {
  if (stryMutAct_9fa48("17448")) {
    {}
  } else {
    stryCov_9fa48("17448");
    const preAborted = new AbortController();
    if (stryMutAct_9fa48("17449")) {
      ;
    } else {
      stryCov_9fa48("17449");
      preAborted.abort();
    }
    const {
      client,
      calls
    } = queued();
    await assert.rejects(client.readProfile(stryMutAct_9fa48("17450") ? {} : (stryCov_9fa48("17450"), {
      signal: preAborted.signal
    })), stryMutAct_9fa48("17451") ? {} : (stryCov_9fa48("17451"), {
      name: stryMutAct_9fa48("17452") ? "" : (stryCov_9fa48("17452"), 'AbortError')
    }));
    if (stryMutAct_9fa48("17453")) {
      ;
    } else {
      stryCov_9fa48("17453");
      assert.equal(calls.length, 0);
    }
    const controller = new AbortController();
    let started;
    const ready = new Promise(resolve => {
      if (stryMutAct_9fa48("17454")) {
        {}
      } else {
        stryCov_9fa48("17454");
        started = resolve;
      }
    });
    const pendingClient = createCommunityClient(stryMutAct_9fa48("17455") ? {} : (stryCov_9fa48("17455"), {
      fetch: async (_url, {
        signal
      }) => {
        if (stryMutAct_9fa48("17456")) {
          {}
        } else {
          stryCov_9fa48("17456");
          if (stryMutAct_9fa48("17457")) {
            ;
          } else {
            stryCov_9fa48("17457");
            started();
          }
          return new Promise(stryMutAct_9fa48("17458") ? () => undefined : (stryCov_9fa48("17458"), (_resolve, reject) => signal.addEventListener(stryMutAct_9fa48("17459") ? "" : (stryCov_9fa48("17459"), 'abort'), stryMutAct_9fa48("17460") ? () => undefined : (stryCov_9fa48("17460"), () => reject(signal.reason)), stryMutAct_9fa48("17461") ? {} : (stryCov_9fa48("17461"), {
            once: stryMutAct_9fa48("17462") ? false : (stryCov_9fa48("17462"), true)
          }))));
        }
      }
    }));
    const result = pendingClient.readProfile(stryMutAct_9fa48("17463") ? {} : (stryCov_9fa48("17463"), {
      signal: controller.signal
    }));
    await ready;
    if (stryMutAct_9fa48("17464")) {
      ;
    } else {
      stryCov_9fa48("17464");
      controller.abort();
    }
    await assert.rejects(result, stryMutAct_9fa48("17465") ? {} : (stryCov_9fa48("17465"), {
      name: stryMutAct_9fa48("17466") ? "" : (stryCov_9fa48("17466"), 'AbortError')
    }));
  }
});
test(stryMutAct_9fa48("17468") ? "" : (stryCov_9fa48("17468"), 'request timeouts abort fetch and return a typed retryable error'), async () => {
  if (stryMutAct_9fa48("17469")) {
    {}
  } else {
    stryCov_9fa48("17469");
    let aborted = stryMutAct_9fa48("17470") ? true : (stryCov_9fa48("17470"), false);
    const client = createCommunityClient(stryMutAct_9fa48("17471") ? {} : (stryCov_9fa48("17471"), {
      timeoutMs: 5,
      fetch: stryMutAct_9fa48("17472") ? () => undefined : (stryCov_9fa48("17472"), async (_url, {
        signal
      }) => new Promise(stryMutAct_9fa48("17473") ? () => undefined : (stryCov_9fa48("17473"), (_resolve, reject) => signal.addEventListener(stryMutAct_9fa48("17474") ? "" : (stryCov_9fa48("17474"), 'abort'), () => {
        if (stryMutAct_9fa48("17475")) {
          {}
        } else {
          stryCov_9fa48("17475");
          aborted = stryMutAct_9fa48("17476") ? false : (stryCov_9fa48("17476"), true);
          if (stryMutAct_9fa48("17477")) {
            ;
          } else {
            stryCov_9fa48("17477");
            reject(signal.reason);
          }
        }
      }, stryMutAct_9fa48("17478") ? {} : (stryCov_9fa48("17478"), {
        once: stryMutAct_9fa48("17479") ? false : (stryCov_9fa48("17479"), true)
      })))))
    }));
    await assert.rejects(client.listBuilds(), errorCode(stryMutAct_9fa48("17480") ? "" : (stryCov_9fa48("17480"), 'timeout')));
    assert.equal(aborted, stryMutAct_9fa48("17482") ? false : (stryCov_9fa48("17482"), true));
  }
});
test(stryMutAct_9fa48("17484") ? "" : (stryCov_9fa48("17484"), 'favorite pages validate ordering and discard withdrawn and private fields'), async () => {
  if (stryMutAct_9fa48("17485")) {
    {}
  } else {
    stryCov_9fa48("17485");
    const {
      parseFavoritePage
    } = await import('../lib/community-client.ts');
    const first = stryMutAct_9fa48("17486") ? {} : (stryCov_9fa48("17486"), {
      publicationId: stryMutAct_9fa48("17487") ? "" : (stryCov_9fa48("17487"), 'publication-000002'),
      createdAt: saved.createdAt,
      status: stryMutAct_9fa48("17488") ? "" : (stryCov_9fa48("17488"), 'available'),
      title: stryMutAct_9fa48("17489") ? "" : (stryCov_9fa48("17489"), 'Forest'),
      kind: stryMutAct_9fa48("17490") ? "" : (stryCov_9fa48("17490"), 'build'),
      secret: stryMutAct_9fa48("17491") ? "" : (stryCov_9fa48("17491"), 'private')
    });
    const last = stryMutAct_9fa48("17492") ? {} : (stryCov_9fa48("17492"), {
      publicationId: stryMutAct_9fa48("17493") ? "" : (stryCov_9fa48("17493"), 'publication-000001'),
      createdAt: saved.createdAt,
      status: stryMutAct_9fa48("17494") ? "" : (stryCov_9fa48("17494"), 'unavailable'),
      title: stryMutAct_9fa48("17495") ? "" : (stryCov_9fa48("17495"), 'Withdrawn secret')
    });
    const page = parseFavoritePage(stryMutAct_9fa48("17496") ? {} : (stryCov_9fa48("17496"), {
      items: stryMutAct_9fa48("17497") ? [] : (stryCov_9fa48("17497"), [first, last]),
      next: null
    }));
    assert.equal(JSON.stringify(page).includes(stryMutAct_9fa48("17499") ? "" : (stryCov_9fa48("17499"), 'secret')), stryMutAct_9fa48("17500") ? true : (stryCov_9fa48("17500"), false));
    assert.deepEqual(page.items[1], stryMutAct_9fa48("17502") ? {} : (stryCov_9fa48("17502"), {
      publicationId: last.publicationId,
      createdAt: last.createdAt,
      status: stryMutAct_9fa48("17503") ? "" : (stryCov_9fa48("17503"), 'unavailable')
    }));
    for (const value of stryMutAct_9fa48("17504") ? [] : (stryCov_9fa48("17504"), [stryMutAct_9fa48("17505") ? {} : (stryCov_9fa48("17505"), {
      items: stryMutAct_9fa48("17506") ? [] : (stryCov_9fa48("17506"), [last, first]),
      next: null
    }), stryMutAct_9fa48("17507") ? {} : (stryCov_9fa48("17507"), {
      items: stryMutAct_9fa48("17508") ? [] : (stryCov_9fa48("17508"), [first, first]),
      next: null
    }), stryMutAct_9fa48("17509") ? {} : (stryCov_9fa48("17509"), {
      items: stryMutAct_9fa48("17510") ? [] : (stryCov_9fa48("17510"), [first]),
      next: last
    }), stryMutAct_9fa48("17511") ? {} : (stryCov_9fa48("17511"), {
      items: stryMutAct_9fa48("17512") ? [] : (stryCov_9fa48("17512"), [stryMutAct_9fa48("17513") ? {} : (stryCov_9fa48("17513"), {
        ...first,
        kind: stryMutAct_9fa48("17514") ? "" : (stryCov_9fa48("17514"), 'unknown')
      })]),
      next: null
    }), stryMutAct_9fa48("17515") ? {} : (stryCov_9fa48("17515"), {
      items: stryMutAct_9fa48("17516") ? [] : (stryCov_9fa48("17516"), [stryMutAct_9fa48("17517") ? {} : (stryCov_9fa48("17517"), {
        ...first,
        createdAt: stryMutAct_9fa48("17518") ? "" : (stryCov_9fa48("17518"), 'yesterday')
      })]),
      next: null
    }), stryMutAct_9fa48("17519") ? {} : (stryCov_9fa48("17519"), {
      items: stryMutAct_9fa48("17520") ? ["Stryker was here"] : (stryCov_9fa48("17520"), []),
      next: first
    })])) assert.throws(stryMutAct_9fa48("17522") ? () => undefined : (stryCov_9fa48("17522"), () => parseFavoritePage(value)), stryMutAct_9fa48("17523") ? {} : (stryCov_9fa48("17523"), {
      code: stryMutAct_9fa48("17524") ? "" : (stryCov_9fa48("17524"), 'invalid_response')
    }));
  }
});
test(stryMutAct_9fa48("17526") ? "" : (stryCov_9fa48("17526"), 'favorite client uses explicit repeatable state and checks acknowledgement identity'), async () => {
  if (stryMutAct_9fa48("17527")) {
    {}
  } else {
    stryCov_9fa48("17527");
    const publicationId = stryMutAct_9fa48("17528") ? "" : (stryCov_9fa48("17528"), 'publication-000001');
    const responses = stryMutAct_9fa48("17529") ? [] : (stryCov_9fa48("17529"), [stryMutAct_9fa48("17530") ? {} : (stryCov_9fa48("17530"), {
      publicationId,
      createdAt: saved.createdAt
    }), stryMutAct_9fa48("17531") ? {} : (stryCov_9fa48("17531"), {
      publicationId,
      createdAt: saved.createdAt
    }), stryMutAct_9fa48("17532") ? {} : (stryCov_9fa48("17532"), {
      publicationId,
      removed: stryMutAct_9fa48("17533") ? false : (stryCov_9fa48("17533"), true)
    }), stryMutAct_9fa48("17534") ? {} : (stryCov_9fa48("17534"), {
      publicationId: stryMutAct_9fa48("17535") ? "" : (stryCov_9fa48("17535"), 'publication-000002'),
      removed: stryMutAct_9fa48("17536") ? false : (stryCov_9fa48("17536"), true)
    })]);
    const calls = stryMutAct_9fa48("17537") ? ["Stryker was here"] : (stryCov_9fa48("17537"), []);
    const client = createCommunityClient(stryMutAct_9fa48("17538") ? {} : (stryCov_9fa48("17538"), {
      fetch: async (url, init) => {
        if (stryMutAct_9fa48("17539")) {
          {}
        } else {
          stryCov_9fa48("17539");
          calls.push(stryMutAct_9fa48("17541") ? {} : (stryCov_9fa48("17541"), {
            url,
            ...init
          }));
          return Response.json(responses.shift());
        }
      }
    }));
    assert.deepEqual(await client.setFavorite(publicationId, stryMutAct_9fa48("17543") ? false : (stryCov_9fa48("17543"), true)), stryMutAct_9fa48("17544") ? {} : (stryCov_9fa48("17544"), {
      publicationId,
      favorite: stryMutAct_9fa48("17545") ? false : (stryCov_9fa48("17545"), true)
    }));
    await client.setFavorite(publicationId, stryMutAct_9fa48("17546") ? false : (stryCov_9fa48("17546"), true));
    assert.deepEqual(await client.setFavorite(publicationId, stryMutAct_9fa48("17548") ? true : (stryCov_9fa48("17548"), false)), stryMutAct_9fa48("17549") ? {} : (stryCov_9fa48("17549"), {
      publicationId,
      favorite: stryMutAct_9fa48("17550") ? true : (stryCov_9fa48("17550"), false)
    }));
    await assert.rejects(client.setFavorite(publicationId, stryMutAct_9fa48("17551") ? true : (stryCov_9fa48("17551"), false)), stryMutAct_9fa48("17552") ? {} : (stryCov_9fa48("17552"), {
      code: stryMutAct_9fa48("17553") ? "" : (stryCov_9fa48("17553"), 'invalid_response')
    }));
    assert.deepEqual(calls.map(stryMutAct_9fa48("17555") ? () => undefined : (stryCov_9fa48("17555"), call => call.method)), stryMutAct_9fa48("17556") ? [] : (stryCov_9fa48("17556"), [stryMutAct_9fa48("17557") ? "" : (stryCov_9fa48("17557"), 'PUT'), stryMutAct_9fa48("17558") ? "" : (stryCov_9fa48("17558"), 'PUT'), stryMutAct_9fa48("17559") ? "" : (stryCov_9fa48("17559"), 'DELETE'), stryMutAct_9fa48("17560") ? "" : (stryCov_9fa48("17560"), 'DELETE')]));
    for (const call of calls) {
      if (stryMutAct_9fa48("17561")) {
        {}
      } else {
        stryCov_9fa48("17561");
        assert.equal(call.url, (stryMutAct_9fa48("17563") ? "" : (stryCov_9fa48("17563"), '/api/community/favorites/')) + publicationId);
        assert.equal(call.credentials, stryMutAct_9fa48("17565") ? "" : (stryCov_9fa48("17565"), 'same-origin'));
        assert.equal(call.body, stryMutAct_9fa48("17567") ? "" : (stryCov_9fa48("17567"), '{}'));
      }
    }
    assert.throws(stryMutAct_9fa48("17569") ? () => undefined : (stryCov_9fa48("17569"), () => client.setFavorite(stryMutAct_9fa48("17570") ? "" : (stryCov_9fa48("17570"), '../bad'), stryMutAct_9fa48("17571") ? false : (stryCov_9fa48("17571"), true))), stryMutAct_9fa48("17572") ? {} : (stryCov_9fa48("17572"), {
      code: stryMutAct_9fa48("17573") ? "" : (stryCov_9fa48("17573"), 'invalid_request')
    }));
  }
});
test(stryMutAct_9fa48("17575") ? "" : (stryCov_9fa48("17575"), 'favorites pagination rejects a repeated page and sends the validated cursor'), async () => {
  if (stryMutAct_9fa48("17576")) {
    {}
  } else {
    stryCov_9fa48("17576");
    const item = stryMutAct_9fa48("17577") ? {} : (stryCov_9fa48("17577"), {
      publicationId: stryMutAct_9fa48("17578") ? "" : (stryCov_9fa48("17578"), 'publication-000001'),
      createdAt: saved.createdAt,
      status: stryMutAct_9fa48("17579") ? "" : (stryCov_9fa48("17579"), 'unavailable')
    });
    let requested;
    const client = createCommunityClient(stryMutAct_9fa48("17580") ? {} : (stryCov_9fa48("17580"), {
      fetch: async url => {
        if (stryMutAct_9fa48("17581")) {
          {}
        } else {
          stryCov_9fa48("17581");
          requested = url;
          return Response.json(stryMutAct_9fa48("17582") ? {} : (stryCov_9fa48("17582"), {
            items: stryMutAct_9fa48("17583") ? [] : (stryCov_9fa48("17583"), [item]),
            next: null
          }));
        }
      }
    }));
    await assert.rejects(client.listFavorites(item), stryMutAct_9fa48("17584") ? {} : (stryCov_9fa48("17584"), {
      code: stryMutAct_9fa48("17585") ? "" : (stryCov_9fa48("17585"), 'invalid_response')
    }));
    assert.equal(new URL(requested, stryMutAct_9fa48("17587") ? "" : (stryCov_9fa48("17587"), 'https://keyconf.example')).searchParams.get(stryMutAct_9fa48("17588") ? "" : (stryCov_9fa48("17588"), 'id')), item.publicationId);
  }
});
test(stryMutAct_9fa48("17590") ? "" : (stryCov_9fa48("17590"), 'creator operations validate public receipts and discard snapshots and private fields'), async () => {
  if (stryMutAct_9fa48("17591")) {
    {}
  } else {
    stryCov_9fa48("17591");
    const page = stryMutAct_9fa48("17592") ? {} : (stryCov_9fa48("17592"), {
      items: stryMutAct_9fa48("17593") ? [] : (stryCov_9fa48("17593"), [publicationSummary()]),
      next: null
    });
    const withdrawal = stryMutAct_9fa48("17594") ? {} : (stryCov_9fa48("17594"), {
      id: published.id,
      withdrawnAt: stryMutAct_9fa48("17595") ? "" : (stryCov_9fa48("17595"), '2026-09-06T01:00:00.000Z')
    });
    const {
      client,
      calls
    } = queued(Response.json(page), Response.json(stryMutAct_9fa48("17596") ? {} : (stryCov_9fa48("17596"), {
      ...published,
      accountId: stryMutAct_9fa48("17597") ? "" : (stryCov_9fa48("17597"), 'private-account'),
      author: stryMutAct_9fa48("17598") ? {} : (stryCov_9fa48("17598"), {
        ...profile,
        email: stryMutAct_9fa48("17599") ? "" : (stryCov_9fa48("17599"), 'private@example.com')
      })
    })), Response.json(stryMutAct_9fa48("17600") ? {} : (stryCov_9fa48("17600"), {
      ...withdrawal,
      build: saved.build
    })), Response.json(withdrawal), Response.json(stryMutAct_9fa48("17601") ? {} : (stryCov_9fa48("17601"), {
      ...withdrawal,
      operationId: publicationRequest.operationId,
      buildId: publicationRequest.buildId
    })));
    if (stryMutAct_9fa48("17602")) {
      ;
    } else {
      stryCov_9fa48("17602");
      assert.deepEqual(await client.listOwnedPublications(), page);
    }
    if (stryMutAct_9fa48("17603")) {
      ;
    } else {
      stryCov_9fa48("17603");
      assert.deepEqual(await client.publishBuild(publicationRequest), publishedReceipt);
    }
    if (stryMutAct_9fa48("17604")) {
      ;
    } else {
      stryCov_9fa48("17604");
      assert.deepEqual(await client.withdrawPublication(published.id), withdrawal);
    }
    if (stryMutAct_9fa48("17605")) {
      ;
    } else {
      stryCov_9fa48("17605");
      assert.deepEqual(await client.withdrawPublication(published.id), withdrawal);
    }
    assert.deepEqual(await client.publishBuild(publicationRequest), stryMutAct_9fa48("17607") ? {} : (stryCov_9fa48("17607"), {
      status: stryMutAct_9fa48("17608") ? "" : (stryCov_9fa48("17608"), 'withdrawn'),
      ...withdrawal
    }));
    assert.deepEqual(calls.map(stryMutAct_9fa48("17610") ? () => undefined : (stryCov_9fa48("17610"), ({
      url,
      method
    }) => stryMutAct_9fa48("17611") ? [] : (stryCov_9fa48("17611"), [url, method]))), stryMutAct_9fa48("17612") ? [] : (stryCov_9fa48("17612"), [stryMutAct_9fa48("17613") ? [] : (stryCov_9fa48("17613"), [stryMutAct_9fa48("17614") ? "" : (stryCov_9fa48("17614"), '/api/community/publications'), stryMutAct_9fa48("17615") ? "" : (stryCov_9fa48("17615"), 'GET')]), stryMutAct_9fa48("17616") ? [] : (stryCov_9fa48("17616"), [stryMutAct_9fa48("17617") ? "" : (stryCov_9fa48("17617"), '/api/community/publications'), stryMutAct_9fa48("17618") ? "" : (stryCov_9fa48("17618"), 'POST')]), stryMutAct_9fa48("17619") ? [] : (stryCov_9fa48("17619"), [(stryMutAct_9fa48("17620") ? "" : (stryCov_9fa48("17620"), '/api/community/publications/')) + published.id, stryMutAct_9fa48("17621") ? "" : (stryCov_9fa48("17621"), 'DELETE')]), stryMutAct_9fa48("17622") ? [] : (stryCov_9fa48("17622"), [(stryMutAct_9fa48("17623") ? "" : (stryCov_9fa48("17623"), '/api/community/publications/')) + published.id, stryMutAct_9fa48("17624") ? "" : (stryCov_9fa48("17624"), 'DELETE')]), stryMutAct_9fa48("17625") ? [] : (stryCov_9fa48("17625"), [stryMutAct_9fa48("17626") ? "" : (stryCov_9fa48("17626"), '/api/community/publications'), stryMutAct_9fa48("17627") ? "" : (stryCov_9fa48("17627"), 'POST')])]));
    if (stryMutAct_9fa48("17628")) {
      ;
    } else {
      stryCov_9fa48("17628");
      assert.deepEqual(JSON.parse(calls[1].body), publicationRequest);
    }
    for (const call of calls) {
      if (stryMutAct_9fa48("17629")) {
        {}
      } else {
        stryCov_9fa48("17629");
        assert.equal(call.credentials, stryMutAct_9fa48("17631") ? "" : (stryCov_9fa48("17631"), 'same-origin'));
        assert.equal(call.cache, stryMutAct_9fa48("17633") ? "" : (stryCov_9fa48("17633"), 'no-store'));
        assert.equal(call.redirect, stryMutAct_9fa48("17635") ? "" : (stryCov_9fa48("17635"), 'error'));
        if (stryMutAct_9fa48("17636")) {
          ;
        } else {
          stryCov_9fa48("17636");
          assert.ok(call.signal instanceof AbortSignal);
        }
        if (stryMutAct_9fa48("17639") ? call.method !== 'DELETE' : stryMutAct_9fa48("17638") ? false : stryMutAct_9fa48("17637") ? true : (stryCov_9fa48("17637", "17638", "17639"), call.method === (stryMutAct_9fa48("17640") ? "" : (stryCov_9fa48("17640"), 'DELETE')))) assert.equal(call.body, stryMutAct_9fa48("17642") ? "" : (stryCov_9fa48("17642"), '{}'));
      }
    }
  }
});
test(stryMutAct_9fa48("17644") ? "" : (stryCov_9fa48("17644"), 'creator drops match the acknowledged release metadata and validate request links'), async () => {
  if (stryMutAct_9fa48("17645")) {
    {}
  } else {
    stryCov_9fa48("17645");
    const request = stryMutAct_9fa48("17646") ? {} : (stryCov_9fa48("17646"), {
      ...publicationRequest,
      kind: stryMutAct_9fa48("17647") ? "" : (stryCov_9fa48("17647"), 'drop'),
      availability: stryMutAct_9fa48("17648") ? "" : (stryCov_9fa48("17648"), 'Enquire with the maker'),
      externalUrl: stryMutAct_9fa48("17649") ? "" : (stryCov_9fa48("17649"), 'https://maker.example/enquire')
    });
    const release = stryMutAct_9fa48("17650") ? {} : (stryCov_9fa48("17650"), {
      kind: request.kind,
      availability: request.availability,
      externalUrl: request.externalUrl
    });
    const {
      client,
      calls
    } = queued(Response.json(stryMutAct_9fa48("17651") ? {} : (stryCov_9fa48("17651"), {
      ...published,
      release
    })));
    assert.deepEqual(await client.publishBuild(request), stryMutAct_9fa48("17653") ? {} : (stryCov_9fa48("17653"), {
      ...publishedReceipt,
      release
    }));
    if (stryMutAct_9fa48("17654")) {
      ;
    } else {
      stryCov_9fa48("17654");
      assert.deepEqual(JSON.parse(calls[0].body), request);
    }
    for (const changed of stryMutAct_9fa48("17655") ? [] : (stryCov_9fa48("17655"), [stryMutAct_9fa48("17656") ? {} : (stryCov_9fa48("17656"), {
      ...release,
      kind: stryMutAct_9fa48("17657") ? "" : (stryCov_9fa48("17657"), 'build')
    }), stryMutAct_9fa48("17658") ? {} : (stryCov_9fa48("17658"), {
      ...release,
      availability: stryMutAct_9fa48("17659") ? "" : (stryCov_9fa48("17659"), 'In stock')
    }), stryMutAct_9fa48("17660") ? {} : (stryCov_9fa48("17660"), {
      ...release,
      externalUrl: stryMutAct_9fa48("17661") ? "" : (stryCov_9fa48("17661"), 'https://other.example/')
    })])) {
      if (stryMutAct_9fa48("17662")) {
        {}
      } else {
        stryCov_9fa48("17662");
        const mismatch = queued(Response.json(stryMutAct_9fa48("17663") ? {} : (stryCov_9fa48("17663"), {
          ...published,
          release: changed
        }))).client;
        await assert.rejects(mismatch.publishBuild(request), errorCode(stryMutAct_9fa48("17664") ? "" : (stryCov_9fa48("17664"), 'invalid_response')));
      }
    }
    assert.throws(stryMutAct_9fa48("17666") ? () => undefined : (stryCov_9fa48("17666"), () => client.publishBuild(stryMutAct_9fa48("17667") ? {} : (stryCov_9fa48("17667"), {
      ...request,
      externalUrl: stryMutAct_9fa48("17668") ? "" : (stryCov_9fa48("17668"), 'javascript:alert(1)')
    }))), errorCode(stryMutAct_9fa48("17669") ? "" : (stryCov_9fa48("17669"), 'invalid_request')));
    if (stryMutAct_9fa48("17670")) {
      ;
    } else {
      stryCov_9fa48("17670");
      assert.equal(calls.length, 1);
    }
  }
});
test(stryMutAct_9fa48("17672") ? "" : (stryCov_9fa48("17672"), 'creator receipts reject wrong withdrawal IDs, mismatched metadata and malformed snapshots'), async () => {
  if (stryMutAct_9fa48("17673")) {
    {}
  } else {
    stryCov_9fa48("17673");
    for (const value of stryMutAct_9fa48("17674") ? [] : (stryCov_9fa48("17674"), [null, {}, stryMutAct_9fa48("17675") ? {} : (stryCov_9fa48("17675"), {
      ...published,
      id: stryMutAct_9fa48("17676") ? "" : (stryCov_9fa48("17676"), '../private')
    }), stryMutAct_9fa48("17677") ? {} : (stryCov_9fa48("17677"), {
      ...published,
      title: stryMutAct_9fa48("17678") ? "" : (stryCov_9fa48("17678"), 'Another publication')
    }), stryMutAct_9fa48("17679") ? {} : (stryCov_9fa48("17679"), {
      ...published,
      note: stryMutAct_9fa48("17680") ? "" : (stryCov_9fa48("17680"), 'Another revision')
    }), stryMutAct_9fa48("17681") ? {} : (stryCov_9fa48("17681"), {
      ...published,
      release: stryMutAct_9fa48("17682") ? {} : (stryCov_9fa48("17682"), {
        kind: stryMutAct_9fa48("17683") ? "" : (stryCov_9fa48("17683"), 'drop')
      })
    }), stryMutAct_9fa48("17684") ? {} : (stryCov_9fa48("17684"), {
      ...published,
      author: stryMutAct_9fa48("17685") ? {} : (stryCov_9fa48("17685"), {
        ...profile,
        handle: stryMutAct_9fa48("17686") ? "" : (stryCov_9fa48("17686"), 'admin')
      })
    }), stryMutAct_9fa48("17687") ? {} : (stryCov_9fa48("17687"), {
      ...published,
      publishedAt: stryMutAct_9fa48("17688") ? "" : (stryCov_9fa48("17688"), '2026-02-30T00:00:00.000Z')
    }), stryMutAct_9fa48("17689") ? {} : (stryCov_9fa48("17689"), {
      ...published,
      withdrawnAt: stryMutAct_9fa48("17690") ? "" : (stryCov_9fa48("17690"), 'yesterday')
    }), stryMutAct_9fa48("17691") ? {} : (stryCov_9fa48("17691"), {
      ...published,
      customization: stryMutAct_9fa48("17692") ? "" : (stryCov_9fa48("17692"), 'unknown')
    }), stryMutAct_9fa48("17693") ? {} : (stryCov_9fa48("17693"), {
      ...published,
      build: {}
    }), stryMutAct_9fa48("17694") ? {} : (stryCov_9fa48("17694"), {
      ...published,
      build: saved.build
    }), stryMutAct_9fa48("17695") ? {} : (stryCov_9fa48("17695"), {
      ...published,
      evidence: {}
    }), stryMutAct_9fa48("17696") ? {} : (stryCov_9fa48("17696"), {
      id: published.id,
      withdrawnAt: null
    })])) {
      if (stryMutAct_9fa48("17697")) {
        {}
      } else {
        stryCov_9fa48("17697");
        const {
          client
        } = queued(Response.json(value));
        await assert.rejects(client.publishBuild(publicationRequest), errorCode(stryMutAct_9fa48("17698") ? "" : (stryCov_9fa48("17698"), 'invalid_response')));
      }
    }
    for (const value of stryMutAct_9fa48("17699") ? [] : (stryCov_9fa48("17699"), [stryMutAct_9fa48("17700") ? {} : (stryCov_9fa48("17700"), {
      id: stryMutAct_9fa48("17701") ? "" : (stryCov_9fa48("17701"), 'publication-000002'),
      withdrawnAt: published.publishedAt
    }), stryMutAct_9fa48("17702") ? {} : (stryCov_9fa48("17702"), {
      id: published.id,
      withdrawnAt: null
    }), stryMutAct_9fa48("17703") ? {} : (stryCov_9fa48("17703"), {
      id: published.id,
      withdrawnAt: stryMutAct_9fa48("17704") ? "" : (stryCov_9fa48("17704"), '2026-02-30T00:00:00.000Z')
    }), stryMutAct_9fa48("17705") ? {} : (stryCov_9fa48("17705"), {
      id: published.id,
      removed: stryMutAct_9fa48("17706") ? false : (stryCov_9fa48("17706"), true)
    })])) {
      if (stryMutAct_9fa48("17707")) {
        {}
      } else {
        stryCov_9fa48("17707");
        const {
          client
        } = queued(Response.json(value));
        await assert.rejects(client.withdrawPublication(published.id), errorCode(stryMutAct_9fa48("17708") ? "" : (stryCov_9fa48("17708"), 'invalid_response')));
      }
    }
  }
});
test(stryMutAct_9fa48("17710") ? "" : (stryCov_9fa48("17710"), 'publication retries preserve the entire validated operation without automatic retries'), async () => {
  if (stryMutAct_9fa48("17711")) {
    {}
  } else {
    stryCov_9fa48("17711");
    const calls = stryMutAct_9fa48("17712") ? ["Stryker was here"] : (stryCov_9fa48("17712"), []);
    const client = createCommunityClient(stryMutAct_9fa48("17713") ? {} : (stryCov_9fa48("17713"), {
      fetch: async (_url, init) => {
        if (stryMutAct_9fa48("17714")) {
          {}
        } else {
          stryCov_9fa48("17714");
          if (stryMutAct_9fa48("17715")) {
            ;
          } else {
            stryCov_9fa48("17715");
            calls.push(init.body);
          }
          if (stryMutAct_9fa48("17718") ? calls.length !== 1 : stryMutAct_9fa48("17717") ? false : stryMutAct_9fa48("17716") ? true : (stryCov_9fa48("17716", "17717", "17718"), calls.length === 1)) throw new Error(stryMutAct_9fa48("17720") ? "" : (stryCov_9fa48("17720"), 'Lost successful publication response'));
          return Response.json(published);
        }
      }
    }));
    const request = structuredClone(publicationRequest);
    await assert.rejects(client.publishBuild(request), errorCode(stryMutAct_9fa48("17721") ? "" : (stryCov_9fa48("17721"), 'network_error')));
    if (stryMutAct_9fa48("17722")) {
      ;
    } else {
      stryCov_9fa48("17722");
      assert.equal(calls.length, 1);
    }
    if (stryMutAct_9fa48("17723")) {
      ;
    } else {
      stryCov_9fa48("17723");
      assert.deepEqual(await client.publishBuild(request), publishedReceipt);
    }
    if (stryMutAct_9fa48("17724")) {
      ;
    } else {
      stryCov_9fa48("17724");
      assert.equal(calls[0], calls[1]);
    }
    if (stryMutAct_9fa48("17725")) {
      ;
    } else {
      stryCov_9fa48("17725");
      assert.deepEqual(JSON.parse(calls[0]), publicationRequest);
    }
    if (stryMutAct_9fa48("17726")) {
      ;
    } else {
      stryCov_9fa48("17726");
      assert.deepEqual(request, publicationRequest);
    }
  }
});
test(stryMutAct_9fa48("17728") ? "" : (stryCov_9fa48("17728"), 'owned publication pages validate descending dates and IDs including withdrawn entries'), () => {
  if (stryMutAct_9fa48("17729")) {
    {}
  } else {
    stryCov_9fa48("17729");
    const first = publicationSummary(stryMutAct_9fa48("17730") ? "" : (stryCov_9fa48("17730"), 'publication-000003'));
    const second = stryMutAct_9fa48("17731") ? {} : (stryCov_9fa48("17731"), {
      ...publicationSummary(stryMutAct_9fa48("17732") ? "" : (stryCov_9fa48("17732"), 'publication-000002')),
      withdrawnAt: stryMutAct_9fa48("17733") ? "" : (stryCov_9fa48("17733"), '2026-09-06T01:00:00.000Z')
    });
    const third = stryMutAct_9fa48("17734") ? {} : (stryCov_9fa48("17734"), {
      ...publicationSummary(stryMutAct_9fa48("17735") ? "" : (stryCov_9fa48("17735"), 'publication-000004')),
      publishedAt: stryMutAct_9fa48("17736") ? "" : (stryCov_9fa48("17736"), '2026-09-05T00:00:00.000Z')
    });
    const next = stryMutAct_9fa48("17737") ? {} : (stryCov_9fa48("17737"), {
      id: third.id,
      publishedAt: third.publishedAt
    });
    assert.deepEqual(parseOwnedPublicationPage(stryMutAct_9fa48("17739") ? {} : (stryCov_9fa48("17739"), {
      items: stryMutAct_9fa48("17740") ? [] : (stryCov_9fa48("17740"), [stryMutAct_9fa48("17741") ? {} : (stryCov_9fa48("17741"), {
        ...first,
        accountId: stryMutAct_9fa48("17742") ? "" : (stryCov_9fa48("17742"), 'private'),
        build: saved.build
      }), second, third]),
      next
    })), stryMutAct_9fa48("17743") ? {} : (stryCov_9fa48("17743"), {
      items: stryMutAct_9fa48("17744") ? [] : (stryCov_9fa48("17744"), [first, second, third]),
      next
    }));
    for (const value of stryMutAct_9fa48("17745") ? [] : (stryCov_9fa48("17745"), [stryMutAct_9fa48("17746") ? {} : (stryCov_9fa48("17746"), {
      items: stryMutAct_9fa48("17747") ? ["Stryker was here"] : (stryCov_9fa48("17747"), []),
      next
    }), stryMutAct_9fa48("17748") ? {} : (stryCov_9fa48("17748"), {
      items: stryMutAct_9fa48("17749") ? [] : (stryCov_9fa48("17749"), [first])
    }), stryMutAct_9fa48("17750") ? {} : (stryCov_9fa48("17750"), {
      items: stryMutAct_9fa48("17751") ? [] : (stryCov_9fa48("17751"), [first, first]),
      next: null
    }), stryMutAct_9fa48("17752") ? {} : (stryCov_9fa48("17752"), {
      items: stryMutAct_9fa48("17753") ? [] : (stryCov_9fa48("17753"), [second, first]),
      next: null
    }), stryMutAct_9fa48("17754") ? {} : (stryCov_9fa48("17754"), {
      items: stryMutAct_9fa48("17755") ? [] : (stryCov_9fa48("17755"), [third, first]),
      next: null
    }), stryMutAct_9fa48("17756") ? {} : (stryCov_9fa48("17756"), {
      items: stryMutAct_9fa48("17757") ? [] : (stryCov_9fa48("17757"), [first, stryMutAct_9fa48("17758") ? {} : (stryCov_9fa48("17758"), {
        ...third,
        id: first.id
      })]),
      next: null
    }), stryMutAct_9fa48("17759") ? {} : (stryCov_9fa48("17759"), {
      items: stryMutAct_9fa48("17760") ? [] : (stryCov_9fa48("17760"), [first]),
      next
    }), stryMutAct_9fa48("17761") ? {} : (stryCov_9fa48("17761"), {
      items: stryMutAct_9fa48("17762") ? [] : (stryCov_9fa48("17762"), [first]),
      next: stryMutAct_9fa48("17763") ? {} : (stryCov_9fa48("17763"), {
        id: first.id,
        publishedAt: third.publishedAt
      })
    }), stryMutAct_9fa48("17764") ? {} : (stryCov_9fa48("17764"), {
      items: Array.from(stryMutAct_9fa48("17765") ? {} : (stryCov_9fa48("17765"), {
        length: 26
      }), stryMutAct_9fa48("17766") ? () => undefined : (stryCov_9fa48("17766"), () => first)),
      next: null
    }), ...(stryMutAct_9fa48("17767") ? [] : (stryCov_9fa48("17767"), [stryMutAct_9fa48("17768") ? {} : (stryCov_9fa48("17768"), {
      title: stryMutAct_9fa48("17769") ? "Stryker was here!" : (stryCov_9fa48("17769"), '')
    }), stryMutAct_9fa48("17770") ? {} : (stryCov_9fa48("17770"), {
      title: stryMutAct_9fa48("17771") ? "" : (stryCov_9fa48("17771"), 'hidden\nline')
    }), stryMutAct_9fa48("17772") ? {} : (stryCov_9fa48("17772"), {
      kind: stryMutAct_9fa48("17773") ? "" : (stryCov_9fa48("17773"), 'unknown')
    }), stryMutAct_9fa48("17774") ? {} : (stryCov_9fa48("17774"), {
      publishedAt: stryMutAct_9fa48("17775") ? "" : (stryCov_9fa48("17775"), '2026-02-30T00:00:00.000Z')
    }), stryMutAct_9fa48("17776") ? {} : (stryCov_9fa48("17776"), {
      id: stryMutAct_9fa48("17777") ? "" : (stryCov_9fa48("17777"), '../private')
    }), stryMutAct_9fa48("17778") ? {} : (stryCov_9fa48("17778"), {
      withdrawnAt: undefined
    }), stryMutAct_9fa48("17779") ? {} : (stryCov_9fa48("17779"), {
      withdrawnAt: stryMutAct_9fa48("17780") ? "" : (stryCov_9fa48("17780"), 'yesterday')
    })])).map(stryMutAct_9fa48("17781") ? () => undefined : (stryCov_9fa48("17781"), change => stryMutAct_9fa48("17782") ? {} : (stryCov_9fa48("17782"), {
      items: stryMutAct_9fa48("17783") ? [] : (stryCov_9fa48("17783"), [stryMutAct_9fa48("17784") ? {} : (stryCov_9fa48("17784"), {
        ...first,
        ...change
      })]),
      next: null
    })))])) assert.throws(stryMutAct_9fa48("17786") ? () => undefined : (stryCov_9fa48("17786"), () => parseOwnedPublicationPage(value)), errorCode(stryMutAct_9fa48("17787") ? "" : (stryCov_9fa48("17787"), 'invalid_response')));
  }
});
test(stryMutAct_9fa48("17789") ? "" : (stryCov_9fa48("17789"), 'owned publication pagination rejects repeated or newer page boundaries'), async () => {
  if (stryMutAct_9fa48("17790")) {
    {}
  } else {
    stryCov_9fa48("17790");
    const before = stryMutAct_9fa48("17791") ? {} : (stryCov_9fa48("17791"), {
      id: stryMutAct_9fa48("17792") ? "" : (stryCov_9fa48("17792"), 'publication-000003'),
      publishedAt: published.publishedAt
    });
    const page = stryMutAct_9fa48("17793") ? {} : (stryCov_9fa48("17793"), {
      items: stryMutAct_9fa48("17794") ? [] : (stryCov_9fa48("17794"), [publicationSummary(stryMutAct_9fa48("17795") ? "" : (stryCov_9fa48("17795"), 'publication-000002'))]),
      next: null
    });
    const {
      client,
      calls
    } = queued(Response.json(page), Response.json(stryMutAct_9fa48("17796") ? {} : (stryCov_9fa48("17796"), {
      items: stryMutAct_9fa48("17797") ? [] : (stryCov_9fa48("17797"), [publicationSummary(before.id)]),
      next: null
    })), Response.json(stryMutAct_9fa48("17798") ? {} : (stryCov_9fa48("17798"), {
      items: stryMutAct_9fa48("17799") ? [] : (stryCov_9fa48("17799"), [publicationSummary(stryMutAct_9fa48("17800") ? "" : (stryCov_9fa48("17800"), 'publication-000004'))]),
      next: null
    })), Response.json(stryMutAct_9fa48("17801") ? {} : (stryCov_9fa48("17801"), {
      items: stryMutAct_9fa48("17802") ? [] : (stryCov_9fa48("17802"), [stryMutAct_9fa48("17803") ? {} : (stryCov_9fa48("17803"), {
        ...publicationSummary(),
        publishedAt: stryMutAct_9fa48("17804") ? "" : (stryCov_9fa48("17804"), '2026-09-07T00:00:00.000Z')
      })]),
      next: null
    })));
    if (stryMutAct_9fa48("17805")) {
      ;
    } else {
      stryCov_9fa48("17805");
      assert.deepEqual(await client.listOwnedPublications(before), page);
    }
    const url = new URL(calls[0].url, stryMutAct_9fa48("17806") ? "" : (stryCov_9fa48("17806"), 'https://keyconf.example'));
    assert.equal(url.searchParams.get(stryMutAct_9fa48("17808") ? "" : (stryCov_9fa48("17808"), 'before')), before.publishedAt);
    assert.equal(url.searchParams.get(stryMutAct_9fa48("17810") ? "" : (stryCov_9fa48("17810"), 'id')), before.id);
    for (let index = 0; stryMutAct_9fa48("17813") ? index >= 3 : stryMutAct_9fa48("17812") ? index <= 3 : stryMutAct_9fa48("17811") ? false : (stryCov_9fa48("17811", "17812", "17813"), index < 3); stryMutAct_9fa48("17814") ? index-- : (stryCov_9fa48("17814"), index++)) await assert.rejects(client.listOwnedPublications(before), errorCode(stryMutAct_9fa48("17815") ? "" : (stryCov_9fa48("17815"), 'invalid_response')));
  }
});
test(stryMutAct_9fa48("17817") ? "" : (stryCov_9fa48("17817"), 'invalid creator requests do not reach the transport'), () => {
  if (stryMutAct_9fa48("17818")) {
    {}
  } else {
    stryCov_9fa48("17818");
    const {
      client,
      calls
    } = queued();
    for (const action of stryMutAct_9fa48("17819") ? [] : (stryCov_9fa48("17819"), [stryMutAct_9fa48("17820") ? () => undefined : (stryCov_9fa48("17820"), () => client.publishBuild(stryMutAct_9fa48("17821") ? {} : (stryCov_9fa48("17821"), {
      ...publicationRequest,
      operationId: undefined
    }))), stryMutAct_9fa48("17822") ? () => undefined : (stryCov_9fa48("17822"), () => client.publishBuild(stryMutAct_9fa48("17823") ? {} : (stryCov_9fa48("17823"), {
      ...publicationRequest,
      operationId: stryMutAct_9fa48("17824") ? "" : (stryCov_9fa48("17824"), ' trimmed-operation-id ')
    }))), stryMutAct_9fa48("17825") ? () => undefined : (stryCov_9fa48("17825"), () => client.publishBuild(stryMutAct_9fa48("17826") ? {} : (stryCov_9fa48("17826"), {
      ...publicationRequest,
      buildId: stryMutAct_9fa48("17827") ? "" : (stryCov_9fa48("17827"), '../private')
    }))), stryMutAct_9fa48("17828") ? () => undefined : (stryCov_9fa48("17828"), () => client.publishBuild(stryMutAct_9fa48("17829") ? {} : (stryCov_9fa48("17829"), {
      ...publicationRequest,
      title: stryMutAct_9fa48("17830") ? "Stryker was here!" : (stryCov_9fa48("17830"), '')
    }))), stryMutAct_9fa48("17831") ? () => undefined : (stryCov_9fa48("17831"), () => client.withdrawPublication(stryMutAct_9fa48("17832") ? "" : (stryCov_9fa48("17832"), '../profile'))), stryMutAct_9fa48("17833") ? () => undefined : (stryCov_9fa48("17833"), () => client.withdrawPublication(1234567890123456)), stryMutAct_9fa48("17834") ? () => undefined : (stryCov_9fa48("17834"), () => client.listOwnedPublications(stryMutAct_9fa48("17835") ? {} : (stryCov_9fa48("17835"), {
      id: published.id,
      publishedAt: stryMutAct_9fa48("17836") ? "" : (stryCov_9fa48("17836"), 'yesterday')
    })))])) assert.throws(action, errorCode(stryMutAct_9fa48("17838") ? "" : (stryCov_9fa48("17838"), 'invalid_request')));
    if (stryMutAct_9fa48("17839")) {
      ;
    } else {
      stryCov_9fa48("17839");
      assert.equal(calls.length, 0);
    }
  }
});
test(stryMutAct_9fa48("17841") ? "" : (stryCov_9fa48("17841"), 'publish receipts must match the exact operation and saved revision'), async () => {
  if (stryMutAct_9fa48("17842")) {
    {}
  } else {
    stryCov_9fa48("17842");
    for (const change of stryMutAct_9fa48("17843") ? [] : (stryCov_9fa48("17843"), [stryMutAct_9fa48("17844") ? {} : (stryCov_9fa48("17844"), {
      operationId: stryMutAct_9fa48("17845") ? "" : (stryCov_9fa48("17845"), 'different-operation-001')
    }), stryMutAct_9fa48("17846") ? {} : (stryCov_9fa48("17846"), {
      buildId: stryMutAct_9fa48("17847") ? "" : (stryCov_9fa48("17847"), 'different-saved-build-001')
    }), stryMutAct_9fa48("17848") ? {} : (stryCov_9fa48("17848"), {
      operationId: undefined
    }), stryMutAct_9fa48("17849") ? {} : (stryCov_9fa48("17849"), {
      buildId: undefined
    })])) {
      if (stryMutAct_9fa48("17850")) {
        {}
      } else {
        stryCov_9fa48("17850");
        const {
          client
        } = queued(Response.json(stryMutAct_9fa48("17851") ? {} : (stryCov_9fa48("17851"), {
          ...published,
          ...change
        })));
        await assert.rejects(client.publishBuild(publicationRequest), stryMutAct_9fa48("17852") ? {} : (stryCov_9fa48("17852"), {
          code: stryMutAct_9fa48("17853") ? "" : (stryCov_9fa48("17853"), 'invalid_response')
        }));
      }
    }
  }
});
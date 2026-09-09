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
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, readdirSync } from 'node:fs';
import { createCommunityApi } from '../lib/community-api.ts';
import { defaultBuild } from '../lib/build.ts';
import { parseSavedBuild, parseSavedBuildSummaries } from '../lib/community.ts';
const origin = stryMutAct_9fa48("16640") ? "" : (stryCov_9fa48("16640"), 'https://keyconf.example');
const alice = stryMutAct_9fa48("16641") ? "" : (stryCov_9fa48("16641"), 'google:verified-alice');
const bob = stryMutAct_9fa48("16642") ? "" : (stryCov_9fa48("16642"), 'google:verified-bob');
const profile = stryMutAct_9fa48("16643") ? {} : (stryCov_9fa48("16643"), {
  handle: stryMutAct_9fa48("16644") ? "" : (stryCov_9fa48("16644"), 'alice_keys'),
  displayName: stryMutAct_9fa48("16645") ? "" : (stryCov_9fa48("16645"), 'Alice'),
  bio: stryMutAct_9fa48("16646") ? "Stryker was here!" : (stryCov_9fa48("16646"), ''),
  links: stryMutAct_9fa48("16647") ? ["Stryker was here"] : (stryCov_9fa48("16647"), [])
});
function database(t) {
  if (stryMutAct_9fa48("16648")) {
    {}
  } else {
    stryCov_9fa48("16648");
    const sqlite = new DatabaseSync(stryMutAct_9fa48("16649") ? "" : (stryCov_9fa48("16649"), ':memory:'));
    sqlite.exec(stryMutAct_9fa48("16651") ? "" : (stryCov_9fa48("16651"), 'PRAGMA foreign_keys=ON'));
    for (const file of stryMutAct_9fa48("16653") ? readdirSync(new URL('../drizzle/', import.meta.url)).sort() : stryMutAct_9fa48("16652") ? readdirSync(new URL('../drizzle/', import.meta.url)).filter(file => file.endsWith('.sql')) : (stryCov_9fa48("16652", "16653"), readdirSync(new URL(stryMutAct_9fa48("16654") ? "" : (stryCov_9fa48("16654"), '../drizzle/'), import.meta.url)).filter(stryMutAct_9fa48("16655") ? () => undefined : (stryCov_9fa48("16655"), file => stryMutAct_9fa48("16656") ? file.startsWith('.sql') : (stryCov_9fa48("16656"), file.endsWith(stryMutAct_9fa48("16657") ? "" : (stryCov_9fa48("16657"), '.sql'))))).sort())) sqlite.exec(readFileSync(new URL(stryMutAct_9fa48("16659") ? `` : (stryCov_9fa48("16659"), `../drizzle/${file}`), import.meta.url), stryMutAct_9fa48("16660") ? "" : (stryCov_9fa48("16660"), 'utf8')));
    t.after(stryMutAct_9fa48("16662") ? () => undefined : (stryCov_9fa48("16662"), () => sqlite.close()));
    const queries = stryMutAct_9fa48("16663") ? ["Stryker was here"] : (stryCov_9fa48("16663"), []);
    return stryMutAct_9fa48("16664") ? {} : (stryCov_9fa48("16664"), {
      sqlite,
      queries,
      prepare(sql) {
        if (stryMutAct_9fa48("16665")) {
          {}
        } else {
          stryCov_9fa48("16665");
          if (stryMutAct_9fa48("16666")) {
            ;
          } else {
            stryCov_9fa48("16666");
            queries.push(sql);
          }
          const statement = sqlite.prepare(sql);
          return stryMutAct_9fa48("16667") ? {} : (stryCov_9fa48("16667"), {
            bind(...parameters) {
              if (stryMutAct_9fa48("16668")) {
                {}
              } else {
                stryCov_9fa48("16668");
                return stryMutAct_9fa48("16669") ? {} : (stryCov_9fa48("16669"), {
                  run: stryMutAct_9fa48("16670") ? () => undefined : (stryCov_9fa48("16670"), () => statement.run(...parameters)),
                  async first(column) {
                    if (stryMutAct_9fa48("16671")) {
                      {}
                    } else {
                      stryCov_9fa48("16671");
                      const row = statement.get(...parameters);
                      return row ? column ? row[column] : stryMutAct_9fa48("16672") ? {} : (stryCov_9fa48("16672"), {
                        ...row
                      }) : null;
                    }
                  },
                  async all() {
                    if (stryMutAct_9fa48("16673")) {
                      {}
                    } else {
                      stryCov_9fa48("16673");
                      return stryMutAct_9fa48("16674") ? {} : (stryCov_9fa48("16674"), {
                        results: statement.all(...parameters).map(stryMutAct_9fa48("16675") ? () => undefined : (stryCov_9fa48("16675"), row => stryMutAct_9fa48("16676") ? {} : (stryCov_9fa48("16676"), {
                          ...row
                        })))
                      });
                    }
                  }
                });
              }
            }
          });
        }
      }
    });
  }
}
const apiFor = stryMutAct_9fa48("16677") ? () => undefined : (stryCov_9fa48("16677"), (() => {
  const apiFor = (db, subject) => createCommunityApi(stryMutAct_9fa48("16678") ? {} : (stryCov_9fa48("16678"), {
    db,
    resolveIdentity: stryMutAct_9fa48("16679") ? () => undefined : (stryCov_9fa48("16679"), async () => subject ? stryMutAct_9fa48("16680") ? {} : (stryCov_9fa48("16680"), {
      subject
    }) : null)
  }));
  return apiFor;
})());
function request(path, method = stryMutAct_9fa48("16681") ? "" : (stryCov_9fa48("16681"), 'GET'), body, headers = {}) {
  if (stryMutAct_9fa48("16682")) {
    {}
  } else {
    stryCov_9fa48("16682");
    return new Request(new URL(path, origin), stryMutAct_9fa48("16683") ? {} : (stryCov_9fa48("16683"), {
      method,
      ...((stryMutAct_9fa48("16686") ? body !== undefined : stryMutAct_9fa48("16685") ? false : stryMutAct_9fa48("16684") ? true : (stryCov_9fa48("16684", "16685", "16686"), body === undefined)) ? {} : stryMutAct_9fa48("16687") ? {} : (stryCov_9fa48("16687"), {
        body: JSON.stringify(body)
      })),
      headers: stryMutAct_9fa48("16688") ? {} : (stryCov_9fa48("16688"), {
        Origin: origin,
        'Content-Type': stryMutAct_9fa48("16689") ? "" : (stryCov_9fa48("16689"), 'application/json'),
        ...headers
      })
    }));
  }
}
function privateResponse(response, status = 200) {
  if (stryMutAct_9fa48("16690")) {
    {}
  } else {
    stryCov_9fa48("16690");
    if (stryMutAct_9fa48("16691")) {
      ;
    } else {
      stryCov_9fa48("16691");
      assert.equal(response.status, status);
    }
    assert.equal(response.headers.get(stryMutAct_9fa48("16693") ? "" : (stryCov_9fa48("16693"), 'Cache-Control')), stryMutAct_9fa48("16694") ? "" : (stryCov_9fa48("16694"), 'private, no-store'));
    assert.equal(response.headers.get(stryMutAct_9fa48("16696") ? "" : (stryCov_9fa48("16696"), 'Vary')), stryMutAct_9fa48("16697") ? "" : (stryCov_9fa48("16697"), 'Cookie'));
    assert.equal(response.headers.get(stryMutAct_9fa48("16699") ? "" : (stryCov_9fa48("16699"), 'Access-Control-Allow-Origin')), null);
  }
}
async function save(api, operationId, name = stryMutAct_9fa48("16700") ? "" : (stryCov_9fa48("16700"), 'Private keyboard')) {
  if (stryMutAct_9fa48("16701")) {
    {}
  } else {
    stryCov_9fa48("16701");
    const response = await api.builds(request(stryMutAct_9fa48("16702") ? "" : (stryCov_9fa48("16702"), '/api/community/builds'), stryMutAct_9fa48("16703") ? "" : (stryCov_9fa48("16703"), 'POST'), stryMutAct_9fa48("16704") ? {} : (stryCov_9fa48("16704"), {
      operationId,
      build: stryMutAct_9fa48("16705") ? {} : (stryCov_9fa48("16705"), {
        ...defaultBuild,
        name
      }),
      subject: bob,
      accountId: stryMutAct_9fa48("16706") ? "" : (stryCov_9fa48("16706"), 'forged-owner')
    })));
    if (stryMutAct_9fa48("16707")) {
      ;
    } else {
      stryCov_9fa48("16707");
      privateResponse(response);
    }
    return parseSavedBuild(await response.json());
  }
}
test(stryMutAct_9fa48("16709") ? "" : (stryCov_9fa48("16709"), 'every account handler authenticates before database access, even with forged identity fields'), async t => {
  if (stryMutAct_9fa48("16710")) {
    {}
  } else {
    stryCov_9fa48("16710");
    const db = database(t);
    const api = apiFor(db, null);
    const forged = stryMutAct_9fa48("16711") ? {} : (stryCov_9fa48("16711"), {
      'oai-authenticated-user-id': alice,
      Authorization: stryMutAct_9fa48("16712") ? "" : (stryCov_9fa48("16712"), 'Bearer forged'),
      Cookie: stryMutAct_9fa48("16713") ? "" : (stryCov_9fa48("16713"), 'subject=alice')
    });
    const responses = await Promise.all(stryMutAct_9fa48("16714") ? [] : (stryCov_9fa48("16714"), [api.profile(request(stryMutAct_9fa48("16715") ? "" : (stryCov_9fa48("16715"), '/api/community/profile?subject=alice'), stryMutAct_9fa48("16716") ? "" : (stryCov_9fa48("16716"), 'GET'), undefined, forged)), api.profile(request(stryMutAct_9fa48("16717") ? "" : (stryCov_9fa48("16717"), '/api/community/profile'), stryMutAct_9fa48("16718") ? "" : (stryCov_9fa48("16718"), 'PATCH'), stryMutAct_9fa48("16719") ? {} : (stryCov_9fa48("16719"), {
      ...profile,
      subject: alice
    }), forged)), api.builds(request(stryMutAct_9fa48("16720") ? "" : (stryCov_9fa48("16720"), '/api/community/builds'), stryMutAct_9fa48("16721") ? "" : (stryCov_9fa48("16721"), 'GET'), undefined, forged)), api.builds(request(stryMutAct_9fa48("16722") ? "" : (stryCov_9fa48("16722"), '/api/community/builds'), stryMutAct_9fa48("16723") ? "" : (stryCov_9fa48("16723"), 'POST'), stryMutAct_9fa48("16724") ? {} : (stryCov_9fa48("16724"), {
      subject: alice
    }), forged)), api.build(request(stryMutAct_9fa48("16725") ? "" : (stryCov_9fa48("16725"), '/api/community/builds/invalid'), stryMutAct_9fa48("16726") ? "" : (stryCov_9fa48("16726"), 'GET'), undefined, forged), stryMutAct_9fa48("16727") ? "" : (stryCov_9fa48("16727"), 'invalid'))]));
    for (const response of responses) {
      if (stryMutAct_9fa48("16728")) {
        {}
      } else {
        stryCov_9fa48("16728");
        if (stryMutAct_9fa48("16729")) {
          ;
        } else {
          stryCov_9fa48("16729");
          privateResponse(response, 401);
        }
        assert.equal((await response.json()).error.code, stryMutAct_9fa48("16731") ? "" : (stryCov_9fa48("16731"), 'authentication_required'));
      }
    }
    if (stryMutAct_9fa48("16732")) {
      ;
    } else {
      stryCov_9fa48("16732");
      assert.equal(db.queries.length, 0);
    }
  }
});
test(stryMutAct_9fa48("16734") ? "" : (stryCov_9fa48("16734"), 'profiles use the verified owner, normalize chosen fields and do not create public records'), async t => {
  if (stryMutAct_9fa48("16735")) {
    {}
  } else {
    stryCov_9fa48("16735");
    const db = database(t);
    const api = apiFor(db, alice);
    const empty = await api.profile(request(stryMutAct_9fa48("16736") ? "" : (stryCov_9fa48("16736"), '/api/community/profile')));
    if (stryMutAct_9fa48("16737")) {
      ;
    } else {
      stryCov_9fa48("16737");
      privateResponse(empty);
    }
    assert.deepEqual(await empty.json(), stryMutAct_9fa48("16739") ? {} : (stryCov_9fa48("16739"), {
      profile: null
    }));
    const updated = await api.profile(request(stryMutAct_9fa48("16740") ? "" : (stryCov_9fa48("16740"), '/api/community/profile'), stryMutAct_9fa48("16741") ? "" : (stryCov_9fa48("16741"), 'PATCH'), stryMutAct_9fa48("16742") ? {} : (stryCov_9fa48("16742"), {
      ...profile,
      handle: stryMutAct_9fa48("16743") ? "" : (stryCov_9fa48("16743"), ' ALICE_KEYS '),
      subject: bob,
      email: stryMutAct_9fa48("16744") ? "" : (stryCov_9fa48("16744"), 'private@example.com')
    })));
    if (stryMutAct_9fa48("16745")) {
      ;
    } else {
      stryCov_9fa48("16745");
      privateResponse(updated);
    }
    assert.deepEqual(await updated.json(), stryMutAct_9fa48("16747") ? {} : (stryCov_9fa48("16747"), {
      profile
    }));
    assert.deepEqual(await (await api.profile(request(stryMutAct_9fa48("16749") ? "" : (stryCov_9fa48("16749"), '/api/community/profile')))).json(), stryMutAct_9fa48("16750") ? {} : (stryCov_9fa48("16750"), {
      profile
    }));
    assert.deepEqual(await (await apiFor(db, bob).profile(request(stryMutAct_9fa48("16752") ? "" : (stryCov_9fa48("16752"), '/api/community/profile')))).json(), stryMutAct_9fa48("16753") ? {} : (stryCov_9fa48("16753"), {
      profile: null
    }));
    const duplicate = await apiFor(db, bob).profile(request(stryMutAct_9fa48("16754") ? "" : (stryCov_9fa48("16754"), '/api/community/profile'), stryMutAct_9fa48("16755") ? "" : (stryCov_9fa48("16755"), 'PATCH'), profile));
    if (stryMutAct_9fa48("16756")) {
      ;
    } else {
      stryCov_9fa48("16756");
      privateResponse(duplicate, 409);
    }
    assert.equal((await duplicate.json()).error.code, stryMutAct_9fa48("16758") ? "" : (stryCov_9fa48("16758"), 'handle_taken'));
    assert.equal(db.sqlite.prepare(stryMutAct_9fa48("16760") ? "" : (stryCov_9fa48("16760"), 'SELECT count(*) AS n FROM community_publication')).get().n, 0);
  }
});
test(stryMutAct_9fa48("16762") ? "" : (stryCov_9fa48("16762"), 'profile and build mutations reject absent or cross-origin requests before storage'), async t => {
  if (stryMutAct_9fa48("16763")) {
    {}
  } else {
    stryCov_9fa48("16763");
    const db = database(t);
    const api = apiFor(db, alice);
    for (const suppliedOrigin of stryMutAct_9fa48("16764") ? [] : (stryCov_9fa48("16764"), [null, stryMutAct_9fa48("16765") ? "" : (stryCov_9fa48("16765"), 'https://other.example'), stryMutAct_9fa48("16766") ? "" : (stryCov_9fa48("16766"), 'null')])) {
      if (stryMutAct_9fa48("16767")) {
        {}
      } else {
        stryCov_9fa48("16767");
        for (const [handler, method, body] of stryMutAct_9fa48("16768") ? [] : (stryCov_9fa48("16768"), [stryMutAct_9fa48("16769") ? [] : (stryCov_9fa48("16769"), [stryMutAct_9fa48("16770") ? () => undefined : (stryCov_9fa48("16770"), input => api.profile(input)), stryMutAct_9fa48("16771") ? "" : (stryCov_9fa48("16771"), 'PATCH'), profile]), stryMutAct_9fa48("16772") ? [] : (stryCov_9fa48("16772"), [stryMutAct_9fa48("16773") ? () => undefined : (stryCov_9fa48("16773"), input => api.builds(input)), stryMutAct_9fa48("16774") ? "" : (stryCov_9fa48("16774"), 'POST'), stryMutAct_9fa48("16775") ? {} : (stryCov_9fa48("16775"), {
          operationId: stryMutAct_9fa48("16776") ? "" : (stryCov_9fa48("16776"), 'origin-rejected-save'),
          build: defaultBuild
        })])])) {
          if (stryMutAct_9fa48("16777")) {
            {}
          } else {
            stryCov_9fa48("16777");
            const input = request(stryMutAct_9fa48("16778") ? "" : (stryCov_9fa48("16778"), '/api/community/action'), method, body);
            if (stryMutAct_9fa48("16781") ? suppliedOrigin !== null : stryMutAct_9fa48("16780") ? false : stryMutAct_9fa48("16779") ? true : (stryCov_9fa48("16779", "16780", "16781"), suppliedOrigin === null)) input.headers.delete(stryMutAct_9fa48("16783") ? "" : (stryCov_9fa48("16783"), 'Origin'));else input.headers.set(stryMutAct_9fa48("16785") ? "" : (stryCov_9fa48("16785"), 'Origin'), suppliedOrigin);
            const response = await handler(input);
            if (stryMutAct_9fa48("16786")) {
              ;
            } else {
              stryCov_9fa48("16786");
              privateResponse(response, 403);
            }
            assert.equal((await response.json()).error.code, stryMutAct_9fa48("16788") ? "" : (stryCov_9fa48("16788"), 'invalid_origin'));
          }
        }
      }
    }
    if (stryMutAct_9fa48("16789")) {
      ;
    } else {
      stryCov_9fa48("16789");
      assert.equal(db.queries.length, 0);
    }
  }
});
test(stryMutAct_9fa48("16791") ? "" : (stryCov_9fa48("16791"), 'immutable saves retry once, reject conflicting retries and isolate owner reads'), async t => {
  if (stryMutAct_9fa48("16792")) {
    {}
  } else {
    stryCov_9fa48("16792");
    const db = database(t);
    const api = apiFor(db, alice);
    const saved = await save(api, stryMutAct_9fa48("16793") ? "" : (stryCov_9fa48("16793"), 'account-save-operation-001'));
    assert.deepEqual(await save(api, stryMutAct_9fa48("16795") ? "" : (stryCov_9fa48("16795"), 'account-save-operation-001')), saved);
    const conflict = await api.builds(request(stryMutAct_9fa48("16796") ? "" : (stryCov_9fa48("16796"), '/api/community/builds'), stryMutAct_9fa48("16797") ? "" : (stryCov_9fa48("16797"), 'POST'), stryMutAct_9fa48("16798") ? {} : (stryCov_9fa48("16798"), {
      operationId: stryMutAct_9fa48("16799") ? "" : (stryCov_9fa48("16799"), 'account-save-operation-001'),
      build: stryMutAct_9fa48("16800") ? {} : (stryCov_9fa48("16800"), {
        ...defaultBuild,
        name: stryMutAct_9fa48("16801") ? "" : (stryCov_9fa48("16801"), 'Different keyboard')
      })
    })));
    if (stryMutAct_9fa48("16802")) {
      ;
    } else {
      stryCov_9fa48("16802");
      privateResponse(conflict, 409);
    }
    assert.equal((await conflict.json()).error.code, stryMutAct_9fa48("16804") ? "" : (stryCov_9fa48("16804"), 'operation_conflict'));
    const read = await api.build(request(stryMutAct_9fa48("16805") ? `` : (stryCov_9fa48("16805"), `/api/community/builds/${saved.id}`)), saved.id);
    if (stryMutAct_9fa48("16806")) {
      ;
    } else {
      stryCov_9fa48("16806");
      privateResponse(read);
    }
    if (stryMutAct_9fa48("16807")) {
      ;
    } else {
      stryCov_9fa48("16807");
      assert.deepEqual(parseSavedBuild(await read.json()), saved);
    }
    const forbidden = await apiFor(db, bob).build(request(stryMutAct_9fa48("16808") ? `` : (stryCov_9fa48("16808"), `/api/community/builds/${saved.id}`)), saved.id);
    if (stryMutAct_9fa48("16809")) {
      ;
    } else {
      stryCov_9fa48("16809");
      privateResponse(forbidden, 404);
    }
    assert.equal((await forbidden.json()).error.code, stryMutAct_9fa48("16811") ? "" : (stryCov_9fa48("16811"), 'build_not_found'));
    const bobPage = await apiFor(db, bob).builds(request(stryMutAct_9fa48("16812") ? "" : (stryCov_9fa48("16812"), '/api/community/builds')));
    assert.deepEqual(await bobPage.json(), stryMutAct_9fa48("16814") ? {} : (stryCov_9fa48("16814"), {
      items: stryMutAct_9fa48("16815") ? ["Stryker was here"] : (stryCov_9fa48("16815"), []),
      next: null
    }));
    assert.equal(db.sqlite.prepare(stryMutAct_9fa48("16817") ? "" : (stryCov_9fa48("16817"), 'SELECT count(*) AS n FROM community_build')).get().n, 1);
    assert.equal(db.sqlite.prepare(stryMutAct_9fa48("16819") ? "" : (stryCov_9fa48("16819"), 'SELECT count(*) AS n FROM community_publication')).get().n, 0);
    assert.equal(JSON.stringify(saved).includes(alice), stryMutAct_9fa48("16821") ? true : (stryCov_9fa48("16821"), false));
    assert.equal(JSON.stringify(saved).includes(stryMutAct_9fa48("16823") ? "" : (stryCov_9fa48("16823"), 'operationId')), stryMutAct_9fa48("16824") ? true : (stryCov_9fa48("16824"), false));
  }
});
test(stryMutAct_9fa48("16826") ? "" : (stryCov_9fa48("16826"), 'saved-build pages expose only owner summaries and preserve tied cursor boundaries'), async t => {
  if (stryMutAct_9fa48("16827")) {
    {}
  } else {
    stryCov_9fa48("16827");
    const db = database(t);
    const api = apiFor(db, alice);
    const expected = stryMutAct_9fa48("16828") ? ["Stryker was here"] : (stryCov_9fa48("16828"), []);
    for (let index = 0; stryMutAct_9fa48("16831") ? index >= 27 : stryMutAct_9fa48("16830") ? index <= 27 : stryMutAct_9fa48("16829") ? false : (stryCov_9fa48("16829", "16830", "16831"), index < 27); stryMutAct_9fa48("16832") ? index-- : (stryCov_9fa48("16832"), index++)) expected.push((await save(api, stryMutAct_9fa48("16834") ? `` : (stryCov_9fa48("16834"), `account-page-operation-${index}`), stryMutAct_9fa48("16835") ? `` : (stryCov_9fa48("16835"), `Keyboard ${index}`))).id);
    await save(apiFor(db, bob), stryMutAct_9fa48("16836") ? "" : (stryCov_9fa48("16836"), 'account-other-owner-001'), stryMutAct_9fa48("16837") ? "" : (stryCov_9fa48("16837"), 'Other owner private keyboard'));
    db.sqlite.exec(stryMutAct_9fa48("16839") ? "" : (stryCov_9fa48("16839"), "UPDATE community_build SET created_at='2026-09-06T00:00:00.000Z'"));
    const response = await api.builds(request(stryMutAct_9fa48("16840") ? "" : (stryCov_9fa48("16840"), '/api/community/builds')));
    if (stryMutAct_9fa48("16841")) {
      ;
    } else {
      stryCov_9fa48("16841");
      privateResponse(response);
    }
    const first = await response.json();
    assert.deepEqual(stryMutAct_9fa48("16843") ? Object.keys(first) : (stryCov_9fa48("16843"), Object.keys(first).sort()), stryMutAct_9fa48("16844") ? [] : (stryCov_9fa48("16844"), [stryMutAct_9fa48("16845") ? "" : (stryCov_9fa48("16845"), 'items'), stryMutAct_9fa48("16846") ? "" : (stryCov_9fa48("16846"), 'next')]));
    if (stryMutAct_9fa48("16847")) {
      ;
    } else {
      stryCov_9fa48("16847");
      assert.equal(parseSavedBuildSummaries(first.items).length, 25);
    }
    assert.deepEqual(first.next, stryMutAct_9fa48("16849") ? {} : (stryCov_9fa48("16849"), {
      createdAt: first.items.at(stryMutAct_9fa48("16850") ? +1 : (stryCov_9fa48("16850"), -1)).createdAt,
      id: first.items.at(stryMutAct_9fa48("16851") ? +1 : (stryCov_9fa48("16851"), -1)).id
    }));
    const params = new URLSearchParams(stryMutAct_9fa48("16852") ? {} : (stryCov_9fa48("16852"), {
      before: first.next.createdAt,
      id: first.next.id
    }));
    const nextResponse = await api.builds(request(stryMutAct_9fa48("16853") ? `` : (stryCov_9fa48("16853"), `/api/community/builds?${params}`)));
    if (stryMutAct_9fa48("16854")) {
      ;
    } else {
      stryCov_9fa48("16854");
      privateResponse(nextResponse);
    }
    const last = await nextResponse.json();
    if (stryMutAct_9fa48("16855")) {
      ;
    } else {
      stryCov_9fa48("16855");
      assert.equal(parseSavedBuildSummaries(last.items).length, 2);
    }
    if (stryMutAct_9fa48("16856")) {
      ;
    } else {
      stryCov_9fa48("16856");
      assert.equal(last.next, null);
    }
    const items = stryMutAct_9fa48("16857") ? [] : (stryCov_9fa48("16857"), [...first.items, ...last.items]);
    assert.deepEqual(items.map(stryMutAct_9fa48("16859") ? () => undefined : (stryCov_9fa48("16859"), item => item.id)), stryMutAct_9fa48("16861") ? expected.reverse() : stryMutAct_9fa48("16860") ? expected.sort() : (stryCov_9fa48("16860", "16861"), expected.sort().reverse()));
    for (const item of items) assert.deepEqual(stryMutAct_9fa48("16863") ? Object.keys(item) : (stryCov_9fa48("16863"), Object.keys(item).sort()), stryMutAct_9fa48("16864") ? [] : (stryCov_9fa48("16864"), [stryMutAct_9fa48("16865") ? "" : (stryCov_9fa48("16865"), 'createdAt'), stryMutAct_9fa48("16866") ? "" : (stryCov_9fa48("16866"), 'id'), stryMutAct_9fa48("16867") ? "" : (stryCov_9fa48("16867"), 'name')]));
  }
});
test(stryMutAct_9fa48("16869") ? "" : (stryCov_9fa48("16869"), 'invalid cursors, identifiers, bodies and unsupported methods fail before storage'), async t => {
  if (stryMutAct_9fa48("16870")) {
    {}
  } else {
    stryCov_9fa48("16870");
    const db = database(t);
    const api = apiFor(db, alice);
    for (const query of stryMutAct_9fa48("16871") ? [] : (stryCov_9fa48("16871"), [stryMutAct_9fa48("16872") ? "" : (stryCov_9fa48("16872"), 'id=valid-build-identifier'), stryMutAct_9fa48("16873") ? "" : (stryCov_9fa48("16873"), 'before=2026-09-06T00%3A00%3A00.000Z'), stryMutAct_9fa48("16874") ? "" : (stryCov_9fa48("16874"), 'before=bad&id=valid-build-identifier')])) {
      if (stryMutAct_9fa48("16875")) {
        {}
      } else {
        stryCov_9fa48("16875");
        const response = await api.builds(request(stryMutAct_9fa48("16876") ? `` : (stryCov_9fa48("16876"), `/api/community/builds?${query}`)));
        if (stryMutAct_9fa48("16877")) {
          ;
        } else {
          stryCov_9fa48("16877");
          privateResponse(response, 400);
        }
        assert.equal((await response.json()).error.code, stryMutAct_9fa48("16879") ? "" : (stryCov_9fa48("16879"), 'invalid_request'));
      }
    }
    privateResponse(await api.build(request(stryMutAct_9fa48("16881") ? "" : (stryCov_9fa48("16881"), '/api/community/builds/x')), stryMutAct_9fa48("16882") ? "" : (stryCov_9fa48("16882"), '../private')), 400);
    privateResponse(await api.profile(request(stryMutAct_9fa48("16884") ? "" : (stryCov_9fa48("16884"), '/api/community/profile'), stryMutAct_9fa48("16885") ? "" : (stryCov_9fa48("16885"), 'PATCH'), stryMutAct_9fa48("16886") ? {} : (stryCov_9fa48("16886"), {
      ...profile,
      handle: stryMutAct_9fa48("16887") ? "" : (stryCov_9fa48("16887"), 'admin')
    }))), 400);
    privateResponse(await api.builds(request(stryMutAct_9fa48("16889") ? "" : (stryCov_9fa48("16889"), '/api/community/builds'), stryMutAct_9fa48("16890") ? "" : (stryCov_9fa48("16890"), 'POST'), stryMutAct_9fa48("16891") ? {} : (stryCov_9fa48("16891"), {
      operationId: stryMutAct_9fa48("16892") ? "" : (stryCov_9fa48("16892"), 'bad'),
      build: defaultBuild
    }))), 400);
    for (const input of stryMutAct_9fa48("16893") ? [] : (stryCov_9fa48("16893"), [new Request(stryMutAct_9fa48("16894") ? `` : (stryCov_9fa48("16894"), `${origin}/api/community/builds`), stryMutAct_9fa48("16895") ? {} : (stryCov_9fa48("16895"), {
      method: stryMutAct_9fa48("16896") ? "" : (stryCov_9fa48("16896"), 'POST'),
      headers: stryMutAct_9fa48("16897") ? {} : (stryCov_9fa48("16897"), {
        Origin: origin,
        'Content-Type': stryMutAct_9fa48("16898") ? "" : (stryCov_9fa48("16898"), 'application/json')
      }),
      body: stryMutAct_9fa48("16899") ? "" : (stryCov_9fa48("16899"), '{broken')
    })), request(stryMutAct_9fa48("16900") ? "" : (stryCov_9fa48("16900"), '/api/community/builds'), stryMutAct_9fa48("16901") ? "" : (stryCov_9fa48("16901"), 'POST'), {}, stryMutAct_9fa48("16902") ? {} : (stryCov_9fa48("16902"), {
      'Content-Type': stryMutAct_9fa48("16903") ? "" : (stryCov_9fa48("16903"), 'text/plain')
    }))])) if (stryMutAct_9fa48("16904")) {
      ;
    } else {
      stryCov_9fa48("16904");
      privateResponse(await api.builds(input), 400);
    }
    privateResponse(await api.builds(request(stryMutAct_9fa48("16906") ? "" : (stryCov_9fa48("16906"), '/api/community/builds'), stryMutAct_9fa48("16907") ? "" : (stryCov_9fa48("16907"), 'POST'), stryMutAct_9fa48("16908") ? {} : (stryCov_9fa48("16908"), {
      data: (stryMutAct_9fa48("16909") ? "" : (stryCov_9fa48("16909"), 'x')).repeat(stryMutAct_9fa48("16910") ? 128 / 1024 : (stryCov_9fa48("16910"), 128 * 1024))
    }))), 413);
    for (const [response, allow] of stryMutAct_9fa48("16911") ? [] : (stryCov_9fa48("16911"), [stryMutAct_9fa48("16912") ? [] : (stryCov_9fa48("16912"), [await api.profile(request(stryMutAct_9fa48("16913") ? "" : (stryCov_9fa48("16913"), '/api/community/profile'), stryMutAct_9fa48("16914") ? "" : (stryCov_9fa48("16914"), 'POST'), {})), stryMutAct_9fa48("16915") ? "" : (stryCov_9fa48("16915"), 'GET, PATCH')]), stryMutAct_9fa48("16916") ? [] : (stryCov_9fa48("16916"), [await api.builds(request(stryMutAct_9fa48("16917") ? "" : (stryCov_9fa48("16917"), '/api/community/builds'), stryMutAct_9fa48("16918") ? "" : (stryCov_9fa48("16918"), 'PUT'), {})), stryMutAct_9fa48("16919") ? "" : (stryCov_9fa48("16919"), 'GET, POST')]), stryMutAct_9fa48("16920") ? [] : (stryCov_9fa48("16920"), [await api.build(request(stryMutAct_9fa48("16921") ? "" : (stryCov_9fa48("16921"), '/api/community/builds/x'), stryMutAct_9fa48("16922") ? "" : (stryCov_9fa48("16922"), 'DELETE')), stryMutAct_9fa48("16923") ? "" : (stryCov_9fa48("16923"), 'valid-build-identifier')), stryMutAct_9fa48("16924") ? "" : (stryCov_9fa48("16924"), 'GET')])])) {
      if (stryMutAct_9fa48("16925")) {
        {}
      } else {
        stryCov_9fa48("16925");
        if (stryMutAct_9fa48("16926")) {
          ;
        } else {
          stryCov_9fa48("16926");
          privateResponse(response, 405);
        }
        assert.equal(response.headers.get(stryMutAct_9fa48("16928") ? "" : (stryCov_9fa48("16928"), 'Allow')), allow);
      }
    }
    if (stryMutAct_9fa48("16929")) {
      ;
    } else {
      stryCov_9fa48("16929");
      assert.equal(db.queries.length, 0);
    }
  }
});
test(stryMutAct_9fa48("16931") ? "" : (stryCov_9fa48("16931"), 'identity and database failures return private safe errors without internal details'), async t => {
  if (stryMutAct_9fa48("16932")) {
    {}
  } else {
    stryCov_9fa48("16932");
    const db = database(t);
    const identityFailure = createCommunityApi(stryMutAct_9fa48("16933") ? {} : (stryCov_9fa48("16933"), {
      db,
      resolveIdentity: async () => {
        if (stryMutAct_9fa48("16934")) {
          {}
        } else {
          stryCov_9fa48("16934");
          throw new Error(stryMutAct_9fa48("16936") ? "" : (stryCov_9fa48("16936"), 'private-provider-secret'));
        }
      }
    }));
    const identityResponse = await identityFailure.profile(request(stryMutAct_9fa48("16937") ? "" : (stryCov_9fa48("16937"), '/api/community/profile')));
    if (stryMutAct_9fa48("16938")) {
      ;
    } else {
      stryCov_9fa48("16938");
      privateResponse(identityResponse, 503);
    }
    assert.equal((await identityResponse.text()).includes(stryMutAct_9fa48("16940") ? "" : (stryCov_9fa48("16940"), 'private-provider-secret')), stryMutAct_9fa48("16941") ? true : (stryCov_9fa48("16941"), false));
    if (stryMutAct_9fa48("16942")) {
      ;
    } else {
      stryCov_9fa48("16942");
      assert.equal(db.queries.length, 0);
    }
    db.sqlite.exec(stryMutAct_9fa48("16944") ? "" : (stryCov_9fa48("16944"), 'DROP TABLE community_profile'));
    const storageResponse = await apiFor(db, alice).profile(request(stryMutAct_9fa48("16945") ? "" : (stryCov_9fa48("16945"), '/api/community/profile')));
    if (stryMutAct_9fa48("16946")) {
      ;
    } else {
      stryCov_9fa48("16946");
      privateResponse(storageResponse, 503);
    }
    const failure = await storageResponse.json();
    assert.equal(failure.error.code, stryMutAct_9fa48("16948") ? "" : (stryCov_9fa48("16948"), 'storage_unavailable'));
    assert.equal(JSON.stringify(failure).includes(stryMutAct_9fa48("16950") ? "" : (stryCov_9fa48("16950"), 'community_profile')), stryMutAct_9fa48("16951") ? true : (stryCov_9fa48("16951"), false));
  }
});
test(stryMutAct_9fa48("16953") ? "" : (stryCov_9fa48("16953"), 'favorite requests use verified ownership and redact withdrawn publication details'), async t => {
  if (stryMutAct_9fa48("16954")) {
    {}
  } else {
    stryCov_9fa48("16954");
    const {
      publishBuild,
      withdrawPublication
    } = await import('../db/publications.ts');
    const db = database(t);
    const owner = apiFor(db, alice);
    const reader = apiFor(db, bob);
    await owner.profile(request(stryMutAct_9fa48("16955") ? "" : (stryCov_9fa48("16955"), '/api/community/profile'), stryMutAct_9fa48("16956") ? "" : (stryCov_9fa48("16956"), 'PATCH'), profile));
    const saved = await save(owner, stryMutAct_9fa48("16957") ? "" : (stryCov_9fa48("16957"), 'favorite-api-save-001'));
    const publication = await publishBuild(db, alice, stryMutAct_9fa48("16958") ? {} : (stryCov_9fa48("16958"), {
      operationId: stryMutAct_9fa48("16959") ? "" : (stryCov_9fa48("16959"), 'favorite-api-publication-001'),
      buildId: saved.id,
      title: stryMutAct_9fa48("16960") ? "" : (stryCov_9fa48("16960"), 'Published favorite'),
      note: stryMutAct_9fa48("16961") ? "Stryker was here!" : (stryCov_9fa48("16961"), ''),
      kind: stryMutAct_9fa48("16962") ? "" : (stryCov_9fa48("16962"), 'build')
    }));
    const path = stryMutAct_9fa48("16963") ? `` : (stryCov_9fa48("16963"), `/api/community/favorites/${publication.id}`);
    const add = stryMutAct_9fa48("16964") ? () => undefined : (stryCov_9fa48("16964"), (() => {
      const add = () => reader.favorite(request(path, stryMutAct_9fa48("16965") ? "" : (stryCov_9fa48("16965"), 'PUT'), stryMutAct_9fa48("16966") ? {} : (stryCov_9fa48("16966"), {
        subject: alice
      })), publication.id);
      return add;
    })());
    const first = await add();
    if (stryMutAct_9fa48("16967")) {
      ;
    } else {
      stryCov_9fa48("16967");
      privateResponse(first);
    }
    const receipt = await first.json();
    if (stryMutAct_9fa48("16968")) {
      ;
    } else {
      stryCov_9fa48("16968");
      assert.deepEqual(await (await add()).json(), receipt);
    }
    assert.deepEqual(await (await owner.favorites(request(stryMutAct_9fa48("16970") ? "" : (stryCov_9fa48("16970"), '/api/community/favorites')))).json(), stryMutAct_9fa48("16971") ? {} : (stryCov_9fa48("16971"), {
      items: stryMutAct_9fa48("16972") ? ["Stryker was here"] : (stryCov_9fa48("16972"), []),
      next: null
    }));
    await owner.favorite(request(path, stryMutAct_9fa48("16973") ? "" : (stryCov_9fa48("16973"), 'DELETE'), {}), publication.id);
    let page = await (await reader.favorites(request(stryMutAct_9fa48("16974") ? "" : (stryCov_9fa48("16974"), '/api/community/favorites')))).json();
    if (stryMutAct_9fa48("16975")) {
      ;
    } else {
      stryCov_9fa48("16975");
      assert.equal(page.items.length, 1);
    }
    assert.equal(page.items[0].title, stryMutAct_9fa48("16977") ? "" : (stryCov_9fa48("16977"), 'Published favorite'));
    await withdrawPublication(db, alice, publication.id);
    page = await (await reader.favorites(request(stryMutAct_9fa48("16978") ? "" : (stryCov_9fa48("16978"), '/api/community/favorites')))).json();
    assert.deepEqual(page.items, stryMutAct_9fa48("16980") ? [] : (stryCov_9fa48("16980"), [stryMutAct_9fa48("16981") ? {} : (stryCov_9fa48("16981"), {
      publicationId: publication.id,
      createdAt: receipt.createdAt,
      status: stryMutAct_9fa48("16982") ? "" : (stryCov_9fa48("16982"), 'unavailable')
    })]));
    if (stryMutAct_9fa48("16983")) {
      ;
    } else {
      stryCov_9fa48("16983");
      privateResponse(await add(), 404);
    }
    for (let i = 0; stryMutAct_9fa48("16986") ? i >= 2 : stryMutAct_9fa48("16985") ? i <= 2 : stryMutAct_9fa48("16984") ? false : (stryCov_9fa48("16984", "16985", "16986"), i < 2); stryMutAct_9fa48("16987") ? i-- : (stryCov_9fa48("16987"), i++)) privateResponse(await reader.favorite(request(path, stryMutAct_9fa48("16989") ? "" : (stryCov_9fa48("16989"), 'DELETE'), {}), publication.id));
    assert.deepEqual(await (await reader.favorites(request(stryMutAct_9fa48("16991") ? "" : (stryCov_9fa48("16991"), '/api/community/favorites')))).json(), stryMutAct_9fa48("16992") ? {} : (stryCov_9fa48("16992"), {
      items: stryMutAct_9fa48("16993") ? ["Stryker was here"] : (stryCov_9fa48("16993"), []),
      next: null
    }));
  }
});
test(stryMutAct_9fa48("16995") ? "" : (stryCov_9fa48("16995"), 'favorite request boundaries reject anonymous, cross-origin and malformed requests'), async t => {
  if (stryMutAct_9fa48("16996")) {
    {}
  } else {
    stryCov_9fa48("16996");
    const db = database(t);
    const anonymous = apiFor(db, null);
    const id = stryMutAct_9fa48("16997") ? "" : (stryCov_9fa48("16997"), 'publication-test-001');
    privateResponse(await anonymous.favorites(request(stryMutAct_9fa48("16999") ? "" : (stryCov_9fa48("16999"), '/api/community/favorites'))), 401);
    privateResponse(await anonymous.favorite(request(stryMutAct_9fa48("17001") ? "" : (stryCov_9fa48("17001"), '/api/community/favorites/x'), stryMutAct_9fa48("17002") ? "" : (stryCov_9fa48("17002"), 'PUT'), stryMutAct_9fa48("17003") ? {} : (stryCov_9fa48("17003"), {
      subject: alice
    })), id), 401);
    if (stryMutAct_9fa48("17004")) {
      ;
    } else {
      stryCov_9fa48("17004");
      assert.equal(db.queries.length, 0);
    }
    const api = apiFor(db, alice);
    for (const method of stryMutAct_9fa48("17005") ? [] : (stryCov_9fa48("17005"), [stryMutAct_9fa48("17006") ? "" : (stryCov_9fa48("17006"), 'PUT'), stryMutAct_9fa48("17007") ? "" : (stryCov_9fa48("17007"), 'DELETE')])) {
      if (stryMutAct_9fa48("17008")) {
        {}
      } else {
        stryCov_9fa48("17008");
        privateResponse(await api.favorite(request(stryMutAct_9fa48("17010") ? "" : (stryCov_9fa48("17010"), '/api/community/favorites/x'), method, {}, stryMutAct_9fa48("17011") ? {} : (stryCov_9fa48("17011"), {
          Origin: stryMutAct_9fa48("17012") ? "" : (stryCov_9fa48("17012"), 'https://attacker.example')
        })), id), 403);
        privateResponse(await api.favorite(request(stryMutAct_9fa48("17014") ? "" : (stryCov_9fa48("17014"), '/api/community/favorites/x'), method, {}), stryMutAct_9fa48("17015") ? "" : (stryCov_9fa48("17015"), '../invalid')), 400);
      }
    }
    for (const suffix of stryMutAct_9fa48("17016") ? [] : (stryCov_9fa48("17016"), [stryMutAct_9fa48("17017") ? "" : (stryCov_9fa48("17017"), '?before=2026-09-06T00:00:00.000Z'), stryMutAct_9fa48("17018") ? "" : (stryCov_9fa48("17018"), '?id=publication-test-001'), stryMutAct_9fa48("17019") ? "" : (stryCov_9fa48("17019"), '?before=bad&id=publication-test-001')])) privateResponse(await api.favorites(request(stryMutAct_9fa48("17021") ? `` : (stryCov_9fa48("17021"), `/api/community/favorites${suffix}`))), 400);
    const unsupported = await api.favorite(request(stryMutAct_9fa48("17022") ? "" : (stryCov_9fa48("17022"), '/api/community/favorites/x')), id);
    if (stryMutAct_9fa48("17023")) {
      ;
    } else {
      stryCov_9fa48("17023");
      privateResponse(unsupported, 405);
    }
    assert.equal(unsupported.headers.get(stryMutAct_9fa48("17025") ? "" : (stryCov_9fa48("17025"), 'Allow')), stryMutAct_9fa48("17026") ? "" : (stryCov_9fa48("17026"), 'PUT, DELETE'));
    if (stryMutAct_9fa48("17027")) {
      ;
    } else {
      stryCov_9fa48("17027");
      assert.equal(db.queries.length, 0);
    }
  }
});
test(stryMutAct_9fa48("17029") ? "" : (stryCov_9fa48("17029"), 'creator publication requests require deliberate owned snapshots and isolate withdrawal'), async t => {
  if (stryMutAct_9fa48("17030")) {
    {}
  } else {
    stryCov_9fa48("17030");
    const db = database(t);
    const owner = apiFor(db, alice);
    const other = apiFor(db, bob);
    const saved = await save(owner, stryMutAct_9fa48("17031") ? "" : (stryCov_9fa48("17031"), 'creator-api-save-001'));
    const input = stryMutAct_9fa48("17032") ? {} : (stryCov_9fa48("17032"), {
      operationId: stryMutAct_9fa48("17033") ? "" : (stryCov_9fa48("17033"), 'creator-api-publish-001'),
      buildId: saved.id,
      title: stryMutAct_9fa48("17034") ? "" : (stryCov_9fa48("17034"), 'Creator release'),
      note: stryMutAct_9fa48("17035") ? "Stryker was here!" : (stryCov_9fa48("17035"), ''),
      kind: stryMutAct_9fa48("17036") ? "" : (stryCov_9fa48("17036"), 'build'),
      subject: bob
    });
    const publish = stryMutAct_9fa48("17037") ? () => undefined : (stryCov_9fa48("17037"), (() => {
      const publish = () => owner.publications(request(stryMutAct_9fa48("17038") ? "" : (stryCov_9fa48("17038"), '/api/community/publications'), stryMutAct_9fa48("17039") ? "" : (stryCov_9fa48("17039"), 'POST'), input));
      return publish;
    })());
    if (stryMutAct_9fa48("17040")) {
      ;
    } else {
      stryCov_9fa48("17040");
      privateResponse(await publish(), 409);
    }
    await owner.profile(request(stryMutAct_9fa48("17041") ? "" : (stryCov_9fa48("17041"), '/api/community/profile'), stryMutAct_9fa48("17042") ? "" : (stryCov_9fa48("17042"), 'PATCH'), profile));
    privateResponse(await other.publications(request(stryMutAct_9fa48("17044") ? "" : (stryCov_9fa48("17044"), '/api/community/publications'), stryMutAct_9fa48("17045") ? "" : (stryCov_9fa48("17045"), 'POST'), input)), 404);
    const response = await publish();
    if (stryMutAct_9fa48("17046")) {
      ;
    } else {
      stryCov_9fa48("17046");
      privateResponse(response);
    }
    const released = await response.json();
    if (stryMutAct_9fa48("17047")) {
      ;
    } else {
      stryCov_9fa48("17047");
      assert.equal(released.operationId, input.operationId);
    }
    if (stryMutAct_9fa48("17048")) {
      ;
    } else {
      stryCov_9fa48("17048");
      assert.equal(released.buildId, saved.id);
    }
    if (stryMutAct_9fa48("17049")) {
      ;
    } else {
      stryCov_9fa48("17049");
      assert.deepEqual(await (await publish()).json(), released);
    }
    privateResponse(await owner.publications(request(stryMutAct_9fa48("17051") ? "" : (stryCov_9fa48("17051"), '/api/community/publications'), stryMutAct_9fa48("17052") ? "" : (stryCov_9fa48("17052"), 'POST'), stryMutAct_9fa48("17053") ? {} : (stryCov_9fa48("17053"), {
      ...input,
      title: stryMutAct_9fa48("17054") ? "" : (stryCov_9fa48("17054"), 'Different')
    }))), 409);
    const path = stryMutAct_9fa48("17055") ? `` : (stryCov_9fa48("17055"), `/api/community/publications/${released.id}`);
    privateResponse(await other.publication(request(path, stryMutAct_9fa48("17057") ? "" : (stryCov_9fa48("17057"), 'DELETE'), {}), released.id), 404);
    assert.deepEqual(await (await other.publications(request(stryMutAct_9fa48("17059") ? "" : (stryCov_9fa48("17059"), '/api/community/publications')))).json(), stryMutAct_9fa48("17060") ? {} : (stryCov_9fa48("17060"), {
      items: stryMutAct_9fa48("17061") ? ["Stryker was here"] : (stryCov_9fa48("17061"), []),
      next: null
    }));
    const withdrawn = await owner.publication(request(path, stryMutAct_9fa48("17062") ? "" : (stryCov_9fa48("17062"), 'DELETE'), {}), released.id);
    if (stryMutAct_9fa48("17063")) {
      ;
    } else {
      stryCov_9fa48("17063");
      privateResponse(withdrawn);
    }
    assert.deepEqual(await (await owner.publication(request(path, stryMutAct_9fa48("17065") ? "" : (stryCov_9fa48("17065"), 'DELETE'), {}), released.id)).json(), await withdrawn.json());
    const listed = await (await owner.publications(request(stryMutAct_9fa48("17066") ? "" : (stryCov_9fa48("17066"), '/api/community/publications')))).json();
    if (stryMutAct_9fa48("17067")) {
      ;
    } else {
      stryCov_9fa48("17067");
      assert.equal(listed.items.length, 1);
    }
    if (stryMutAct_9fa48("17068")) {
      ;
    } else {
      stryCov_9fa48("17068");
      assert.ok(listed.items[0].withdrawnAt);
    }
  }
});
test(stryMutAct_9fa48("17070") ? "" : (stryCov_9fa48("17070"), 'creator publication boundaries reject anonymous and cross-origin mutations before storage'), async t => {
  if (stryMutAct_9fa48("17071")) {
    {}
  } else {
    stryCov_9fa48("17071");
    const db = database(t);
    const anonymous = apiFor(db, null);
    const id = stryMutAct_9fa48("17072") ? "" : (stryCov_9fa48("17072"), 'publication-test-001');
    privateResponse(await anonymous.publications(request(stryMutAct_9fa48("17074") ? "" : (stryCov_9fa48("17074"), '/api/community/publications'))), 401);
    privateResponse(await anonymous.publication(request(stryMutAct_9fa48("17076") ? "" : (stryCov_9fa48("17076"), '/api/community/publications/x'), stryMutAct_9fa48("17077") ? "" : (stryCov_9fa48("17077"), 'DELETE'), {}), id), 401);
    const owner = apiFor(db, alice);
    privateResponse(await owner.publications(request(stryMutAct_9fa48("17079") ? "" : (stryCov_9fa48("17079"), '/api/community/publications'), stryMutAct_9fa48("17080") ? "" : (stryCov_9fa48("17080"), 'POST'), {}, stryMutAct_9fa48("17081") ? {} : (stryCov_9fa48("17081"), {
      Origin: stryMutAct_9fa48("17082") ? "" : (stryCov_9fa48("17082"), 'https://attacker.example')
    }))), 403);
    privateResponse(await owner.publication(request(stryMutAct_9fa48("17084") ? "" : (stryCov_9fa48("17084"), '/api/community/publications/x'), stryMutAct_9fa48("17085") ? "" : (stryCov_9fa48("17085"), 'DELETE'), {}, stryMutAct_9fa48("17086") ? {} : (stryCov_9fa48("17086"), {
      Origin: stryMutAct_9fa48("17087") ? "" : (stryCov_9fa48("17087"), 'https://attacker.example')
    })), id), 403);
    privateResponse(await owner.publications(request(stryMutAct_9fa48("17089") ? "" : (stryCov_9fa48("17089"), '/api/community/publications?before=bad'))), 400);
    if (stryMutAct_9fa48("17090")) {
      ;
    } else {
      stryCov_9fa48("17090");
      assert.equal(db.queries.length, 0);
    }
  }
});
test(stryMutAct_9fa48("17092") ? "" : (stryCov_9fa48("17092"), 'publication pagination rejects impossible calendar dates before querying storage'), async t => {
  if (stryMutAct_9fa48("17093")) {
    {}
  } else {
    stryCov_9fa48("17093");
    const db = database(t);
    const api = apiFor(db, alice);
    const response = await api.publications(request(stryMutAct_9fa48("17094") ? "" : (stryCov_9fa48("17094"), '/api/community/publications?before=2026-02-30T00%3A00%3A00.000Z&id=publication-test-001')));
    if (stryMutAct_9fa48("17095")) {
      ;
    } else {
      stryCov_9fa48("17095");
      privateResponse(response, 400);
    }
    if (stryMutAct_9fa48("17096")) {
      ;
    } else {
      stryCov_9fa48("17096");
      assert.equal(db.queries.length, 0);
    }
  }
});
test(stryMutAct_9fa48("17098") ? "" : (stryCov_9fa48("17098"), 'publishing binds the reviewed profile and retry preserves acknowledged attribution'), async t => {
  if (stryMutAct_9fa48("17099")) {
    {}
  } else {
    stryCov_9fa48("17099");
    const db = database(t);
    const api = apiFor(db, alice);
    await api.profile(request(stryMutAct_9fa48("17100") ? "" : (stryCov_9fa48("17100"), '/api/community/profile'), stryMutAct_9fa48("17101") ? "" : (stryCov_9fa48("17101"), 'PATCH'), profile));
    const saved = await save(api, stryMutAct_9fa48("17102") ? "" : (stryCov_9fa48("17102"), 'profile-binding-save-001'));
    const input = stryMutAct_9fa48("17103") ? {} : (stryCov_9fa48("17103"), {
      operationId: stryMutAct_9fa48("17104") ? "" : (stryCov_9fa48("17104"), 'profile-binding-publish-001'),
      buildId: saved.id,
      title: stryMutAct_9fa48("17105") ? "" : (stryCov_9fa48("17105"), 'Reviewed identity'),
      note: stryMutAct_9fa48("17106") ? "Stryker was here!" : (stryCov_9fa48("17106"), ''),
      kind: stryMutAct_9fa48("17107") ? "" : (stryCov_9fa48("17107"), 'build'),
      reviewedProfile: profile
    });
    await api.profile(request(stryMutAct_9fa48("17108") ? "" : (stryCov_9fa48("17108"), '/api/community/profile'), stryMutAct_9fa48("17109") ? "" : (stryCov_9fa48("17109"), 'PATCH'), stryMutAct_9fa48("17110") ? {} : (stryCov_9fa48("17110"), {
      ...profile,
      displayName: stryMutAct_9fa48("17111") ? "" : (stryCov_9fa48("17111"), 'Changed elsewhere')
    })));
    const stale = await api.publications(request(stryMutAct_9fa48("17112") ? "" : (stryCov_9fa48("17112"), '/api/community/publications'), stryMutAct_9fa48("17113") ? "" : (stryCov_9fa48("17113"), 'POST'), input));
    if (stryMutAct_9fa48("17114")) {
      ;
    } else {
      stryCov_9fa48("17114");
      privateResponse(stale, 409);
    }
    assert.equal((await stale.json()).error.code, stryMutAct_9fa48("17116") ? "" : (stryCov_9fa48("17116"), 'profile_changed'));
    assert.equal(db.sqlite.prepare(stryMutAct_9fa48("17118") ? "" : (stryCov_9fa48("17118"), 'SELECT count(*) AS n FROM community_publication')).get().n, 0);
    await api.profile(request(stryMutAct_9fa48("17119") ? "" : (stryCov_9fa48("17119"), '/api/community/profile'), stryMutAct_9fa48("17120") ? "" : (stryCov_9fa48("17120"), 'PATCH'), profile));
    const published = await api.publications(request(stryMutAct_9fa48("17121") ? "" : (stryCov_9fa48("17121"), '/api/community/publications'), stryMutAct_9fa48("17122") ? "" : (stryCov_9fa48("17122"), 'POST'), input));
    if (stryMutAct_9fa48("17123")) {
      ;
    } else {
      stryCov_9fa48("17123");
      privateResponse(published);
    }
    const receipt = await published.json();
    await api.profile(request(stryMutAct_9fa48("17124") ? "" : (stryCov_9fa48("17124"), '/api/community/profile'), stryMutAct_9fa48("17125") ? "" : (stryCov_9fa48("17125"), 'PATCH'), stryMutAct_9fa48("17126") ? {} : (stryCov_9fa48("17126"), {
      ...profile,
      displayName: stryMutAct_9fa48("17127") ? "" : (stryCov_9fa48("17127"), 'Later name')
    })));
    assert.deepEqual(await (await api.publications(request(stryMutAct_9fa48("17129") ? "" : (stryCov_9fa48("17129"), '/api/community/publications'), stryMutAct_9fa48("17130") ? "" : (stryCov_9fa48("17130"), 'POST'), input))).json(), receipt);
    if (stryMutAct_9fa48("17131")) {
      ;
    } else {
      stryCov_9fa48("17131");
      assert.equal(receipt.author.displayName, profile.displayName);
    }
  }
});
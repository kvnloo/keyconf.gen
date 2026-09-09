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
import { submitProposalResponse, readProposalResponse, listProposalResponses } from '../db/proposal-responses.ts';
import { createProposal, listOwnedProposals, rotateProposalLink, readProposalPreview, closeProposal } from '../db/proposals.ts';
import { parseProposalRequest, parseProposalRotation, parseProposalResponse, parseProposalPreview } from '../lib/proposal.ts';
import { listOwnedPublications, listPublicPublications, publishBuild, readPublicPublication, withdrawPublication } from '../db/publications.ts';
import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, readdirSync } from 'node:fs';
import { defaultBuild } from '../lib/build.ts';
import { accessoryCatalog } from '../lib/build-accessories.ts';
import { CommunityError, communityRequest, communityErrorResponse, communityResponse, parseCommunityProfile, parseSaveBuildRequest, parseSavedBuild, parseSavedBuildSummaries } from '../lib/community.ts';
import { readProfile, saveProfile, listBuilds, readBuild, saveBuild } from '../db/community.ts';
function database(t, migrationCount = Infinity) {
  if (stryMutAct_9fa48("17854")) {
    {}
  } else {
    stryCov_9fa48("17854");
    const sqlite = new DatabaseSync(stryMutAct_9fa48("17855") ? "" : (stryCov_9fa48("17855"), ':memory:'));
    sqlite.exec(stryMutAct_9fa48("17857") ? "" : (stryCov_9fa48("17857"), 'PRAGMA foreign_keys=ON'));
    for (const migration of stryMutAct_9fa48("17860") ? readdirSync(new URL('../drizzle/', import.meta.url)).sort().slice(0, migrationCount) : stryMutAct_9fa48("17859") ? readdirSync(new URL('../drizzle/', import.meta.url)).filter(file => file.endsWith('.sql')).slice(0, migrationCount) : stryMutAct_9fa48("17858") ? readdirSync(new URL('../drizzle/', import.meta.url)).filter(file => file.endsWith('.sql')).sort() : (stryCov_9fa48("17858", "17859", "17860"), readdirSync(new URL(stryMutAct_9fa48("17861") ? "" : (stryCov_9fa48("17861"), '../drizzle/'), import.meta.url)).filter(stryMutAct_9fa48("17862") ? () => undefined : (stryCov_9fa48("17862"), file => stryMutAct_9fa48("17863") ? file.startsWith('.sql') : (stryCov_9fa48("17863"), file.endsWith(stryMutAct_9fa48("17864") ? "" : (stryCov_9fa48("17864"), '.sql'))))).sort().slice(0, migrationCount))) {
      if (stryMutAct_9fa48("17865")) {
        {}
      } else {
        stryCov_9fa48("17865");
        sqlite.exec(readFileSync(new URL(stryMutAct_9fa48("17867") ? `` : (stryCov_9fa48("17867"), `../drizzle/${migration}`), import.meta.url), stryMutAct_9fa48("17868") ? "" : (stryCov_9fa48("17868"), 'utf8')));
      }
    }
    t.after(stryMutAct_9fa48("17870") ? () => undefined : (stryCov_9fa48("17870"), () => sqlite.close()));
    /** @type {string[]} */
    const queries = stryMutAct_9fa48("17871") ? ["Stryker was here"] : (stryCov_9fa48("17871"), []);
    return stryMutAct_9fa48("17872") ? {} : (stryCov_9fa48("17872"), {
      sqlite,
      queries,
      batch(statements) {
        if (stryMutAct_9fa48("17873")) {
          {}
        } else {
          stryCov_9fa48("17873");
          sqlite.exec(stryMutAct_9fa48("17875") ? "" : (stryCov_9fa48("17875"), 'BEGIN'));
          try {
            if (stryMutAct_9fa48("17876")) {
              {}
            } else {
              stryCov_9fa48("17876");
              const results = statements.map(stryMutAct_9fa48("17877") ? () => undefined : (stryCov_9fa48("17877"), statement => statement.run()));
              sqlite.exec(stryMutAct_9fa48("17879") ? "" : (stryCov_9fa48("17879"), 'COMMIT'));
              return results;
            }
          } catch (error) {
            if (stryMutAct_9fa48("17880")) {
              {}
            } else {
              stryCov_9fa48("17880");
              sqlite.exec(stryMutAct_9fa48("17882") ? "" : (stryCov_9fa48("17882"), 'ROLLBACK'));
              throw error;
            }
          }
        }
      },
      prepare(sql) {
        if (stryMutAct_9fa48("17883")) {
          {}
        } else {
          stryCov_9fa48("17883");
          if (stryMutAct_9fa48("17884")) {
            ;
          } else {
            stryCov_9fa48("17884");
            queries.push(sql);
          }
          const statement = sqlite.prepare(sql);
          return stryMutAct_9fa48("17885") ? {} : (stryCov_9fa48("17885"), {
            bind(...parameters) {
              if (stryMutAct_9fa48("17886")) {
                {}
              } else {
                stryCov_9fa48("17886");
                return stryMutAct_9fa48("17887") ? {} : (stryCov_9fa48("17887"), {
                  run() {
                    if (stryMutAct_9fa48("17888")) {
                      {}
                    } else {
                      stryCov_9fa48("17888");
                      return statement.run(...parameters);
                    }
                  },
                  async first(column) {
                    if (stryMutAct_9fa48("17889")) {
                      {}
                    } else {
                      stryCov_9fa48("17889");
                      const row = statement.get(...parameters);
                      return row ? column ? row[column] : stryMutAct_9fa48("17890") ? {} : (stryCov_9fa48("17890"), {
                        ...row
                      }) : null;
                    }
                  },
                  async all() {
                    if (stryMutAct_9fa48("17891")) {
                      {}
                    } else {
                      stryCov_9fa48("17891");
                      return stryMutAct_9fa48("17892") ? {} : (stryCov_9fa48("17892"), {
                        results: statement.all(...parameters).map(stryMutAct_9fa48("17893") ? () => undefined : (stryCov_9fa48("17893"), row => stryMutAct_9fa48("17894") ? {} : (stryCov_9fa48("17894"), {
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
const alice = stryMutAct_9fa48("17895") ? "" : (stryCov_9fa48("17895"), 'private-platform-subject-alice');
const bob = stryMutAct_9fa48("17896") ? "" : (stryCov_9fa48("17896"), 'private-platform-subject-bob');
const operationId = stryMutAct_9fa48("17897") ? "" : (stryCov_9fa48("17897"), 'operation-id-00000001');
const profile = stryMutAct_9fa48("17898") ? {} : (stryCov_9fa48("17898"), {
  links: stryMutAct_9fa48("17899") ? ["Stryker was here"] : (stryCov_9fa48("17899"), []),
  handle: stryMutAct_9fa48("17900") ? "" : (stryCov_9fa48("17900"), 'alice_keys'),
  displayName: stryMutAct_9fa48("17901") ? "" : (stryCov_9fa48("17901"), 'Alice'),
  bio: stryMutAct_9fa48("17902") ? "" : (stryCov_9fa48("17902"), 'Small keyboards.')
});
const save = stryMutAct_9fa48("17903") ? () => undefined : (stryCov_9fa48("17903"), (() => {
  const save = (build = defaultBuild, operation = operationId) => parseSaveBuildRequest(stryMutAct_9fa48("17904") ? {} : (stryCov_9fa48("17904"), {
    operationId: operation,
    build
  }));
  return save;
})());
test(stryMutAct_9fa48("17906") ? "" : (stryCov_9fa48("17906"), 'profiles require chosen identity and enforce normalized unique handles in SQLite'), async t => {
  if (stryMutAct_9fa48("17907")) {
    {}
  } else {
    stryCov_9fa48("17907");
    const db = database(t);
    if (stryMutAct_9fa48("17908")) {
      ;
    } else {
      stryCov_9fa48("17908");
      assert.equal(await readProfile(db, alice), null);
    }
    assert.deepEqual(await listBuilds(db, alice), stryMutAct_9fa48("17910") ? {} : (stryCov_9fa48("17910"), {
      items: stryMutAct_9fa48("17911") ? ["Stryker was here"] : (stryCov_9fa48("17911"), []),
      next: null
    }));
    assert.deepEqual(await saveProfile(db, alice, parseCommunityProfile(stryMutAct_9fa48("17913") ? {} : (stryCov_9fa48("17913"), {
      ...profile,
      handle: stryMutAct_9fa48("17914") ? "" : (stryCov_9fa48("17914"), ' ALICE_keys ')
    }))), profile);
    await assert.rejects(saveProfile(db, bob, profile), stryMutAct_9fa48("17915") ? {} : (stryCov_9fa48("17915"), {
      code: stryMutAct_9fa48("17916") ? "" : (stryCov_9fa48("17916"), 'handle_taken'),
      status: 409
    }));
    if (stryMutAct_9fa48("17917")) {
      ;
    } else {
      stryCov_9fa48("17917");
      assert.equal(await readProfile(db, bob), null);
    }
    if (stryMutAct_9fa48("17918")) {
      ;
    } else {
      stryCov_9fa48("17918");
      assert.deepEqual(await readProfile(db, alice), profile);
    }
    const changed = stryMutAct_9fa48("17919") ? {} : (stryCov_9fa48("17919"), {
      ...profile,
      handle: stryMutAct_9fa48("17920") ? "" : (stryCov_9fa48("17920"), 'alice_boards'),
      bio: stryMutAct_9fa48("17921") ? "Stryker was here!" : (stryCov_9fa48("17921"), '')
    });
    if (stryMutAct_9fa48("17922")) {
      ;
    } else {
      stryCov_9fa48("17922");
      assert.deepEqual(await saveProfile(db, alice, changed), changed);
    }
    assert.deepEqual(await saveProfile(db, bob, stryMutAct_9fa48("17924") ? {} : (stryCov_9fa48("17924"), {
      ...profile,
      displayName: stryMutAct_9fa48("17925") ? "" : (stryCov_9fa48("17925"), 'Bob')
    })), stryMutAct_9fa48("17926") ? {} : (stryCov_9fa48("17926"), {
      ...profile,
      displayName: stryMutAct_9fa48("17927") ? "" : (stryCov_9fa48("17927"), 'Bob')
    }));
    assert.equal(db.sqlite.prepare(stryMutAct_9fa48("17929") ? "" : (stryCov_9fa48("17929"), 'SELECT count(*) AS count FROM community_account')).get().count, 2);
    assert.deepEqual(db.sqlite.prepare(stryMutAct_9fa48("17931") ? "" : (stryCov_9fa48("17931"), 'PRAGMA foreign_key_check')).all(), stryMutAct_9fa48("17932") ? ["Stryker was here"] : (stryCov_9fa48("17932"), []));
    assert.equal(JSON.stringify(await readProfile(db, alice)).includes(alice), stryMutAct_9fa48("17934") ? true : (stryCov_9fa48("17934"), false));
  }
});
test(stryMutAct_9fa48("17936") ? "" : (stryCov_9fa48("17936"), 'account list traverses all snapshots across timestamp ties using the owner index'), async t => {
  if (stryMutAct_9fa48("17937")) {
    {}
  } else {
    stryCov_9fa48("17937");
    const db = database(t);
    const first = await saveBuild(db, alice, save());
    const seed = db.sqlite.prepare(stryMutAct_9fa48("17938") ? "" : (stryCov_9fa48("17938"), 'SELECT * FROM community_build WHERE id=?')).get(first.id);
    const insert = db.sqlite.prepare(stryMutAct_9fa48("17939") ? "" : (stryCov_9fa48("17939"), 'INSERT INTO community_build(id, account_id, operation_id, request_digest, name, payload, evidence, created_at) VALUES(?,?,?,?,?,?,?,?)'));
    for (let index = 0; stryMutAct_9fa48("17942") ? index >= 105 : stryMutAct_9fa48("17941") ? index <= 105 : stryMutAct_9fa48("17940") ? false : (stryCov_9fa48("17940", "17941", "17942"), index < 105); stryMutAct_9fa48("17943") ? index-- : (stryCov_9fa48("17943"), index++)) {
      if (stryMutAct_9fa48("17944")) {
        {}
      } else {
        stryCov_9fa48("17944");
        insert.run(stryMutAct_9fa48("17946") ? `` : (stryCov_9fa48("17946"), `fixture-build-${String(index).padStart(4, stryMutAct_9fa48("17947") ? "" : (stryCov_9fa48("17947"), '0'))}`), seed.account_id, stryMutAct_9fa48("17948") ? `` : (stryCov_9fa48("17948"), `fixture-operation-${index}`), seed.request_digest, stryMutAct_9fa48("17949") ? `` : (stryCov_9fa48("17949"), `Copy ${index}`), seed.payload, seed.evidence, stryMutAct_9fa48("17950") ? `` : (stryCov_9fa48("17950"), `2026-01-01T00:00:${String(stryMutAct_9fa48("17951") ? index * 60 : (stryCov_9fa48("17951"), index % 60)).padStart(2, stryMutAct_9fa48("17952") ? "" : (stryCov_9fa48("17952"), '0'))}.000Z`));
      }
    }
    db.sqlite.exec(stryMutAct_9fa48("17954") ? "" : (stryCov_9fa48("17954"), 'PRAGMA optimize'));
    const builds = await listBuilds(db, alice);
    if (stryMutAct_9fa48("17955")) {
      ;
    } else {
      stryCov_9fa48("17955");
      assert.equal(builds.items.length, 25);
    }
    const all = stryMutAct_9fa48("17956") ? [] : (stryCov_9fa48("17956"), [...builds.items]);
    let cursor = builds.next;
    while (stryMutAct_9fa48("17957") ? false : (stryCov_9fa48("17957"), cursor)) {
      if (stryMutAct_9fa48("17958")) {
        {}
      } else {
        stryCov_9fa48("17958");
        const page = await listBuilds(db, alice, cursor);
        assert.ok(stryMutAct_9fa48("17963") ? page.items.length > 25 : stryMutAct_9fa48("17962") ? page.items.length < 25 : stryMutAct_9fa48("17961") ? false : stryMutAct_9fa48("17960") ? true : (stryCov_9fa48("17960", "17961", "17962", "17963"), page.items.length <= 25));
        if (stryMutAct_9fa48("17964")) {
          ;
        } else {
          stryCov_9fa48("17964");
          all.push(...page.items);
        }
        cursor = page.next;
      }
    }
    if (stryMutAct_9fa48("17965")) {
      ;
    } else {
      stryCov_9fa48("17965");
      assert.equal(all.length, 106);
    }
    assert.equal(new Set(all.map(stryMutAct_9fa48("17967") ? () => undefined : (stryCov_9fa48("17967"), build => build.id))).size, 106);
    assert.deepEqual(all.map(stryMutAct_9fa48("17969") ? () => undefined : (stryCov_9fa48("17969"), build => build.id)), db.sqlite.prepare(stryMutAct_9fa48("17970") ? "" : (stryCov_9fa48("17970"), 'SELECT id FROM community_build WHERE account_id=? ORDER BY created_at DESC,id DESC')).all(seed.account_id).map(stryMutAct_9fa48("17971") ? () => undefined : (stryCov_9fa48("17971"), row => row.id)));
    assert.deepEqual(await listBuilds(db, bob, builds.next), stryMutAct_9fa48("17973") ? {} : (stryCov_9fa48("17973"), {
      items: stryMutAct_9fa48("17974") ? ["Stryker was here"] : (stryCov_9fa48("17974"), []),
      next: null
    }));
    for (const cursor of stryMutAct_9fa48("17975") ? [] : (stryCov_9fa48("17975"), [stryMutAct_9fa48("17976") ? {} : (stryCov_9fa48("17976"), {
      id: first.id,
      createdAt: stryMutAct_9fa48("17977") ? "" : (stryCov_9fa48("17977"), 'invalid')
    }), stryMutAct_9fa48("17978") ? {} : (stryCov_9fa48("17978"), {
      id: first.id,
      createdAt: stryMutAct_9fa48("17979") ? "" : (stryCov_9fa48("17979"), '2026-01-01')
    }), stryMutAct_9fa48("17980") ? {} : (stryCov_9fa48("17980"), {
      id: stryMutAct_9fa48("17981") ? "" : (stryCov_9fa48("17981"), 'invalid'),
      createdAt: first.createdAt
    })])) await assert.rejects(listBuilds(db, alice, cursor), stryMutAct_9fa48("17982") ? {} : (stryCov_9fa48("17982"), {
      code: stryMutAct_9fa48("17983") ? "" : (stryCov_9fa48("17983"), 'invalid_request'),
      status: 400
    }));
    assert.deepEqual(stryMutAct_9fa48("17985") ? Object.keys(all[0]) : (stryCov_9fa48("17985"), Object.keys(all[0]).sort()), stryMutAct_9fa48("17986") ? [] : (stryCov_9fa48("17986"), [stryMutAct_9fa48("17987") ? "" : (stryCov_9fa48("17987"), 'createdAt'), stryMutAct_9fa48("17988") ? "" : (stryCov_9fa48("17988"), 'id'), stryMutAct_9fa48("17989") ? "" : (stryCov_9fa48("17989"), 'name')]));
    assert.deepEqual(await listBuilds(db, bob), stryMutAct_9fa48("17991") ? {} : (stryCov_9fa48("17991"), {
      items: stryMutAct_9fa48("17992") ? ["Stryker was here"] : (stryCov_9fa48("17992"), []),
      next: null
    }));
    const query = db.queries.find(stryMutAct_9fa48("17993") ? () => undefined : (stryCov_9fa48("17993"), sql => sql.includes(stryMutAct_9fa48("17994") ? "" : (stryCov_9fa48("17994"), 'LIMIT 26'))));
    if (stryMutAct_9fa48("17997") ? typeof query === 'string' : stryMutAct_9fa48("17996") ? false : stryMutAct_9fa48("17995") ? true : (stryCov_9fa48("17995", "17996", "17997"), typeof query !== (stryMutAct_9fa48("17998") ? "" : (stryCov_9fa48("17998"), 'string')))) throw new Error(stryMutAct_9fa48("18000") ? "" : (stryCov_9fa48("18000"), 'Expected the indexed list query.'));
    const plan = db.sqlite.prepare(stryMutAct_9fa48("18001") ? `` : (stryCov_9fa48("18001"), `EXPLAIN QUERY PLAN ${query}`)).all(alice);
    assert.ok(stryMutAct_9fa48("18003") ? plan.every(row => row.detail.includes('community_build_account_created')) : (stryCov_9fa48("18003"), plan.some(stryMutAct_9fa48("18004") ? () => undefined : (stryCov_9fa48("18004"), row => row.detail.includes(stryMutAct_9fa48("18005") ? "" : (stryCov_9fa48("18005"), 'community_build_account_created'))))), JSON.stringify(plan));
  }
});
test(stryMutAct_9fa48("18007") ? "" : (stryCov_9fa48("18007"), 'private builds are owner-only immutable snapshots with idempotent retries'), async t => {
  if (stryMutAct_9fa48("18008")) {
    {}
  } else {
    stryCov_9fa48("18008");
    const db = database(t);
    const [first, repeated] = await Promise.all(stryMutAct_9fa48("18009") ? [] : (stryCov_9fa48("18009"), [saveBuild(db, alice, save()), saveBuild(db, alice, save())]));
    if (stryMutAct_9fa48("18010")) {
      ;
    } else {
      stryCov_9fa48("18010");
      assert.deepEqual(first, repeated);
    }
    if (stryMutAct_9fa48("18011")) {
      ;
    } else {
      stryCov_9fa48("18011");
      assert.deepEqual(await readBuild(db, alice, first.id), first);
    }
    if (stryMutAct_9fa48("18012")) {
      ;
    } else {
      stryCov_9fa48("18012");
      assert.deepEqual(parseSavedBuild(first), first);
    }
    await assert.rejects(readBuild(db, bob, first.id), stryMutAct_9fa48("18013") ? {} : (stryCov_9fa48("18013"), {
      code: stryMutAct_9fa48("18014") ? "" : (stryCov_9fa48("18014"), 'build_not_found'),
      status: 404
    }));
    await assert.rejects(readBuild(db, bob, stryMutAct_9fa48("18015") ? "" : (stryCov_9fa48("18015"), "' OR 1=1 --")), stryMutAct_9fa48("18016") ? {} : (stryCov_9fa48("18016"), {
      code: stryMutAct_9fa48("18017") ? "" : (stryCov_9fa48("18017"), 'build_not_found')
    }));
    assert.deepEqual(await listBuilds(db, bob), stryMutAct_9fa48("18019") ? {} : (stryCov_9fa48("18019"), {
      items: stryMutAct_9fa48("18020") ? ["Stryker was here"] : (stryCov_9fa48("18020"), []),
      next: null
    }));
    await assert.rejects(saveBuild(db, alice, save(stryMutAct_9fa48("18021") ? {} : (stryCov_9fa48("18021"), {
      ...defaultBuild,
      name: stryMutAct_9fa48("18022") ? "" : (stryCov_9fa48("18022"), 'Different draft')
    }))), stryMutAct_9fa48("18023") ? {} : (stryCov_9fa48("18023"), {
      code: stryMutAct_9fa48("18024") ? "" : (stryCov_9fa48("18024"), 'operation_conflict'),
      status: 409
    }));
    if (stryMutAct_9fa48("18025")) {
      ;
    } else {
      stryCov_9fa48("18025");
      assert.equal((await readBuild(db, alice, first.id)).build.name, defaultBuild.name);
    }
    const otherOwner = await saveBuild(db, bob, save());
    if (stryMutAct_9fa48("18026")) {
      ;
    } else {
      stryCov_9fa48("18026");
      assert.notEqual(otherOwner.id, first.id);
    }
    const copy = await saveBuild(db, alice, save(stryMutAct_9fa48("18027") ? {} : (stryCov_9fa48("18027"), {
      ...defaultBuild,
      name: stryMutAct_9fa48("18028") ? "" : (stryCov_9fa48("18028"), 'New copy')
    }), stryMutAct_9fa48("18029") ? "" : (stryCov_9fa48("18029"), 'operation-id-00000002')));
    if (stryMutAct_9fa48("18030")) {
      ;
    } else {
      stryCov_9fa48("18030");
      assert.notEqual(copy.id, first.id);
    }
    const {
      items: summaries
    } = await listBuilds(db, alice);
    if (stryMutAct_9fa48("18031")) {
      ;
    } else {
      stryCov_9fa48("18031");
      assert.equal(summaries.length, 2);
    }
    if (stryMutAct_9fa48("18032")) {
      ;
    } else {
      stryCov_9fa48("18032");
      assert.deepEqual(parseSavedBuildSummaries(summaries), summaries);
    }
    assert.equal(JSON.stringify(first).includes(alice), stryMutAct_9fa48("18034") ? true : (stryCov_9fa48("18034"), false));
    assert.deepEqual(stryMutAct_9fa48("18036") ? Object.keys(first) : (stryCov_9fa48("18036"), Object.keys(first).sort()), stryMutAct_9fa48("18037") ? [] : (stryCov_9fa48("18037"), [stryMutAct_9fa48("18038") ? "" : (stryCov_9fa48("18038"), 'build'), stryMutAct_9fa48("18039") ? "" : (stryCov_9fa48("18039"), 'createdAt'), stryMutAct_9fa48("18040") ? "" : (stryCov_9fa48("18040"), 'evidence'), stryMutAct_9fa48("18041") ? "" : (stryCov_9fa48("18041"), 'id'), stryMutAct_9fa48("18042") ? "" : (stryCov_9fa48("18042"), 'name')]));
    assert.equal(db.sqlite.prepare(stryMutAct_9fa48("18044") ? "" : (stryCov_9fa48("18044"), 'SELECT count(*) AS count FROM community_build')).get().count, 3);
  }
});
test(stryMutAct_9fa48("18046") ? "" : (stryCov_9fa48("18046"), 'owned saved-build evidence preserves retired source metadata across reads and retries'), async t => {
  if (stryMutAct_9fa48("18047")) {
    {}
  } else {
    stryCov_9fa48("18047");
    const {
      catalog
    } = await import('../lib/catalog.ts');
    const {
      soundPacks
    } = await import('../lib/sound-packs.ts');
    const db = database(t);
    const accessory = accessoryCatalog.find(stryMutAct_9fa48("18048") ? () => undefined : (stryCov_9fa48("18048"), item => stryMutAct_9fa48("18051") ? item.kind !== 'macropad' : stryMutAct_9fa48("18050") ? false : stryMutAct_9fa48("18049") ? true : (stryCov_9fa48("18049", "18050", "18051"), item.kind === (stryMutAct_9fa48("18052") ? "" : (stryCov_9fa48("18052"), 'macropad')))));
    if (stryMutAct_9fa48("18053")) {
      ;
    } else {
      stryCov_9fa48("18053");
      assert.ok(accessory);
    }
    const request = save(stryMutAct_9fa48("18054") ? {} : (stryCov_9fa48("18054"), {
      ...defaultBuild,
      accessories: stryMutAct_9fa48("18055") ? [] : (stryCov_9fa48("18055"), [stryMutAct_9fa48("18056") ? {} : (stryCov_9fa48("18056"), {
        id: stryMutAct_9fa48("18057") ? "" : (stryCov_9fa48("18057"), 'saved-evidence-accessory'),
        productId: accessory.id,
        quantity: 1,
        location: stryMutAct_9fa48("18058") ? {} : (stryCov_9fa48("18058"), {
          kind: stryMutAct_9fa48("18059") ? "" : (stryCov_9fa48("18059"), 'external'),
          position: stryMutAct_9fa48("18060") ? "" : (stryCov_9fa48("18060"), 'right')
        })
      })])
    }));
    const saved = await saveBuild(db, alice, request);
    if (stryMutAct_9fa48("18061")) {
      ;
    } else {
      stryCov_9fa48("18061");
      assert.ok(saved.evidence);
    }
    if (stryMutAct_9fa48("18062")) {
      ;
    } else {
      stryCov_9fa48("18062");
      assert.equal(saved.evidence.sound.recording.groups, undefined);
    }
    const metadata = stryMutAct_9fa48("18063") ? [] : (stryCov_9fa48("18063"), [catalog.find(stryMutAct_9fa48("18064") ? () => undefined : (stryCov_9fa48("18064"), part => stryMutAct_9fa48("18067") ? part.id !== saved.build.selection.case : stryMutAct_9fa48("18066") ? false : stryMutAct_9fa48("18065") ? true : (stryCov_9fa48("18065", "18066", "18067"), part.id === saved.build.selection.case))), accessory, soundPacks.find(stryMutAct_9fa48("18068") ? () => undefined : (stryCov_9fa48("18068"), pack => stryMutAct_9fa48("18071") ? pack.id !== saved.build.audio.source : stryMutAct_9fa48("18070") ? false : stryMutAct_9fa48("18069") ? true : (stryCov_9fa48("18069", "18070", "18071"), pack.id === saved.build.audio.source)))]);
    for (const reference of metadata) {
      if (stryMutAct_9fa48("18072")) {
        {}
      } else {
        stryCov_9fa48("18072");
        if (stryMutAct_9fa48("18073")) {
          ;
        } else {
          stryCov_9fa48("18073");
          assert.ok(reference);
        }
        const original = stryMutAct_9fa48("18074") ? {} : (stryCov_9fa48("18074"), {
          name: reference.name,
          source: reference.source
        });
        reference.name = stryMutAct_9fa48("18075") ? "" : (stryCov_9fa48("18075"), 'Replacement catalog metadata');
        reference.source = stryMutAct_9fa48("18076") ? "" : (stryCov_9fa48("18076"), 'https://example.com/replacement-source');
        t.after(stryMutAct_9fa48("18078") ? () => undefined : (stryCov_9fa48("18078"), () => Object.assign(reference, original)));
      }
    }
    if (stryMutAct_9fa48("18079")) {
      ;
    } else {
      stryCov_9fa48("18079");
      assert.deepEqual(await readBuild(db, alice, saved.id), saved);
    }
    if (stryMutAct_9fa48("18080")) {
      ;
    } else {
      stryCov_9fa48("18080");
      assert.deepEqual(await saveBuild(db, alice, request), saved);
    }
    if (stryMutAct_9fa48("18081")) {
      ;
    } else {
      stryCov_9fa48("18081");
      assert.deepEqual(parseSavedBuild(saved), saved);
    }
    assert.equal(JSON.stringify(saved.evidence).includes(stryMutAct_9fa48("18083") ? "" : (stryCov_9fa48("18083"), 'replacement-source')), stryMutAct_9fa48("18084") ? true : (stryCov_9fa48("18084"), false));
    await assert.rejects(readBuild(db, bob, saved.id), stryMutAct_9fa48("18085") ? {} : (stryCov_9fa48("18085"), {
      code: stryMutAct_9fa48("18086") ? "" : (stryCov_9fa48("18086"), 'build_not_found'),
      status: 404
    }));
  }
});
test(stryMutAct_9fa48("18088") ? "" : (stryCov_9fa48("18088"), 'owned saved-build evidence rejects corruption and strips private fields at both boundaries'), async t => {
  if (stryMutAct_9fa48("18089")) {
    {}
  } else {
    stryCov_9fa48("18089");
    const db = database(t);
    const saved = await saveBuild(db, alice, save());
    const evidence = JSON.parse(db.sqlite.prepare(stryMutAct_9fa48("18090") ? "" : (stryCov_9fa48("18090"), 'SELECT evidence FROM community_build WHERE id=?')).get(saved.id).evidence);
    const invalid = stryMutAct_9fa48("18091") ? [] : (stryCov_9fa48("18091"), [null, {}, stryMutAct_9fa48("18092") ? {} : (stryCov_9fa48("18092"), {
      ...evidence,
      components: stryMutAct_9fa48("18093") ? ["Stryker was here"] : (stryCov_9fa48("18093"), [])
    })]);
    const unsafe = structuredClone(evidence);
    unsafe.sound.recording.source = stryMutAct_9fa48("18094") ? "" : (stryCov_9fa48("18094"), 'javascript:alert(1)');
    if (stryMutAct_9fa48("18095")) {
      ;
    } else {
      stryCov_9fa48("18095");
      invalid.push(unsafe);
    }
    const mismatch = structuredClone(evidence);
    mismatch.components[0].id = stryMutAct_9fa48("18096") ? "" : (stryCov_9fa48("18096"), 'wrong-component');
    if (stryMutAct_9fa48("18097")) {
      ;
    } else {
      stryCov_9fa48("18097");
      invalid.push(mismatch);
    }
    for (const value of invalid) {
      if (stryMutAct_9fa48("18098")) {
        {}
      } else {
        stryCov_9fa48("18098");
        assert.throws(stryMutAct_9fa48("18100") ? () => undefined : (stryCov_9fa48("18100"), () => parseSavedBuild(stryMutAct_9fa48("18101") ? {} : (stryCov_9fa48("18101"), {
          ...saved,
          evidence: value
        }))));
        db.sqlite.prepare(stryMutAct_9fa48("18103") ? "" : (stryCov_9fa48("18103"), 'UPDATE community_build SET evidence=? WHERE id=?')).run(JSON.stringify(value), saved.id);
        await assert.rejects(readBuild(db, alice, saved.id), stryMutAct_9fa48("18104") ? {} : (stryCov_9fa48("18104"), {
          code: stryMutAct_9fa48("18105") ? "" : (stryCov_9fa48("18105"), 'saved_build_unavailable'),
          status: 422
        }));
        await assert.rejects(readBuild(db, bob, saved.id), stryMutAct_9fa48("18106") ? {} : (stryCov_9fa48("18106"), {
          code: stryMutAct_9fa48("18107") ? "" : (stryCov_9fa48("18107"), 'build_not_found'),
          status: 404
        }));
      }
    }
    db.sqlite.prepare(stryMutAct_9fa48("18109") ? "" : (stryCov_9fa48("18109"), 'UPDATE community_build SET evidence=? WHERE id=?')).run(stryMutAct_9fa48("18110") ? "" : (stryCov_9fa48("18110"), '{broken'), saved.id);
    await assert.rejects(readBuild(db, alice, saved.id), stryMutAct_9fa48("18111") ? {} : (stryCov_9fa48("18111"), {
      code: stryMutAct_9fa48("18112") ? "" : (stryCov_9fa48("18112"), 'saved_build_unavailable')
    }));
    evidence.privateNote = alice;
    evidence.components[0].internal = alice;
    evidence.sound.recording.internal = alice;
    db.sqlite.prepare(stryMutAct_9fa48("18114") ? "" : (stryCov_9fa48("18114"), 'UPDATE community_build SET evidence=? WHERE id=?')).run(JSON.stringify(evidence), saved.id);
    if (stryMutAct_9fa48("18115")) {
      ;
    } else {
      stryCov_9fa48("18115");
      assert.deepEqual(await readBuild(db, alice, saved.id), saved);
    }
    assert.deepEqual(parseSavedBuild(stryMutAct_9fa48("18117") ? {} : (stryCov_9fa48("18117"), {
      ...saved,
      evidence
    })), saved);
    const {
      evidence: omitted,
      ...legacy
    } = saved;
    if (stryMutAct_9fa48("18118")) {
      ;
    } else {
      stryCov_9fa48("18118");
      assert.ok(omitted);
    }
    if (stryMutAct_9fa48("18119")) {
      ;
    } else {
      stryCov_9fa48("18119");
      assert.deepEqual(parseSavedBuild(legacy), legacy);
    }
  }
});
test(stryMutAct_9fa48("18121") ? "" : (stryCov_9fa48("18121"), 'account saves strip unselected imports and retain selected sources and accessory evidence'), async t => {
  if (stryMutAct_9fa48("18122")) {
    {}
  } else {
    stryCov_9fa48("18122");
    const db = database(t);
    const selected = stryMutAct_9fa48("18123") ? {} : (stryCov_9fa48("18123"), {
      id: stryMutAct_9fa48("18124") ? "" : (stryCov_9fa48("18124"), 'import:selected'),
      category: stryMutAct_9fa48("18125") ? "" : (stryCov_9fa48("18125"), 'switch'),
      name: stryMutAct_9fa48("18126") ? "" : (stryCov_9fa48("18126"), 'Imported switch'),
      brand: stryMutAct_9fa48("18127") ? "" : (stryCov_9fa48("18127"), 'Maker'),
      detail: stryMutAct_9fa48("18128") ? "" : (stryCov_9fa48("18128"), 'Unverified reference'),
      source: stryMutAct_9fa48("18129") ? "" : (stryCov_9fa48("18129"), 'https://example.com/switch?variant=1'),
      evidence: stryMutAct_9fa48("18130") ? "" : (stryCov_9fa48("18130"), 'unknown'),
      family: stryMutAct_9fa48("18131") ? "" : (stryCov_9fa48("18131"), 'unverified')
    });
    const unused = stryMutAct_9fa48("18132") ? {} : (stryCov_9fa48("18132"), {
      ...selected,
      id: stryMutAct_9fa48("18133") ? "" : (stryCov_9fa48("18133"), 'import:unused'),
      source: stryMutAct_9fa48("18134") ? "" : (stryCov_9fa48("18134"), 'https://example.com/private-library-reference')
    });
    const accessory = accessoryCatalog.find(stryMutAct_9fa48("18135") ? () => undefined : (stryCov_9fa48("18135"), product => stryMutAct_9fa48("18138") ? product.kind !== 'macropad' : stryMutAct_9fa48("18137") ? false : stryMutAct_9fa48("18136") ? true : (stryCov_9fa48("18136", "18137", "18138"), product.kind === (stryMutAct_9fa48("18139") ? "" : (stryCov_9fa48("18139"), 'macropad')))));
    if (stryMutAct_9fa48("18140")) {
      ;
    } else {
      stryCov_9fa48("18140");
      assert.ok(accessory);
    }
    const request = save(stryMutAct_9fa48("18141") ? {} : (stryCov_9fa48("18141"), {
      ...defaultBuild,
      selection: stryMutAct_9fa48("18142") ? {} : (stryCov_9fa48("18142"), {
        ...defaultBuild.selection,
        switch: selected.id
      }),
      customParts: stryMutAct_9fa48("18143") ? [] : (stryCov_9fa48("18143"), [unused, selected]),
      accessories: stryMutAct_9fa48("18144") ? [] : (stryCov_9fa48("18144"), [stryMutAct_9fa48("18145") ? {} : (stryCov_9fa48("18145"), {
        id: stryMutAct_9fa48("18146") ? "" : (stryCov_9fa48("18146"), 'accessory-selection'),
        productId: accessory.id,
        quantity: 1,
        location: stryMutAct_9fa48("18147") ? {} : (stryCov_9fa48("18147"), {
          kind: stryMutAct_9fa48("18148") ? "" : (stryCov_9fa48("18148"), 'external'),
          position: stryMutAct_9fa48("18149") ? "" : (stryCov_9fa48("18149"), 'right')
        })
      })])
    }));
    assert.deepEqual(request.build.customParts, stryMutAct_9fa48("18151") ? [] : (stryCov_9fa48("18151"), [selected]));
    const result = await saveBuild(db, alice, request);
    const raw = db.sqlite.prepare(stryMutAct_9fa48("18152") ? "" : (stryCov_9fa48("18152"), 'SELECT payload, evidence FROM community_build WHERE id=?')).get(result.id);
    assert.equal(raw.payload.includes(unused.source), stryMutAct_9fa48("18154") ? true : (stryCov_9fa48("18154"), false));
    assert.equal(raw.evidence.includes(unused.source), stryMutAct_9fa48("18156") ? true : (stryCov_9fa48("18156"), false));
    const evidence = JSON.parse(raw.evidence);
    assert.equal(evidence.components.find(stryMutAct_9fa48("18158") ? () => undefined : (stryCov_9fa48("18158"), part => stryMutAct_9fa48("18161") ? part.id !== selected.id : stryMutAct_9fa48("18160") ? false : stryMutAct_9fa48("18159") ? true : (stryCov_9fa48("18159", "18160", "18161"), part.id === selected.id))).evidence, stryMutAct_9fa48("18162") ? "" : (stryCov_9fa48("18162"), 'unknown'));
    if (stryMutAct_9fa48("18163")) {
      ;
    } else {
      stryCov_9fa48("18163");
      assert.equal(evidence.accessoryReferences[0].source, accessory.source);
    }
    assert.equal(evidence.accessoryCompatibility[stryMutAct_9fa48("18165") ? "" : (stryCov_9fa48("18165"), 'accessory-selection')].status, stryMutAct_9fa48("18166") ? "" : (stryCov_9fa48("18166"), 'unknown'));
    assert.match(evidence.catalogDigest, stryMutAct_9fa48("18171") ? /^[^a-f0-9]{64}$/ : stryMutAct_9fa48("18170") ? /^[a-f0-9]$/ : stryMutAct_9fa48("18169") ? /^[a-f0-9]{64}/ : stryMutAct_9fa48("18168") ? /[a-f0-9]{64}$/ : (stryCov_9fa48("18168", "18169", "18170", "18171"), /^[a-f0-9]{64}$/));
    if (stryMutAct_9fa48("18172")) {
      ;
    } else {
      stryCov_9fa48("18172");
      assert.match(evidence.sound.accuracy, /full build match unverified/);
    }
    await saveProfile(db, alice, profile);
    const legacyPayload = JSON.stringify(stryMutAct_9fa48("18173") ? {} : (stryCov_9fa48("18173"), {
      ...request.build,
      customParts: stryMutAct_9fa48("18174") ? [] : (stryCov_9fa48("18174"), [unused, selected])
    }));
    db.sqlite.prepare(stryMutAct_9fa48("18176") ? "" : (stryCov_9fa48("18176"), 'UPDATE community_build SET payload=? WHERE id=?')).run(legacyPayload, result.id);
    const publication = await publishBuild(db, alice, stryMutAct_9fa48("18177") ? {} : (stryCov_9fa48("18177"), {
      operationId: stryMutAct_9fa48("18178") ? "" : (stryCov_9fa48("18178"), 'import-evidence-publication'),
      buildId: result.id,
      title: stryMutAct_9fa48("18179") ? "" : (stryCov_9fa48("18179"), 'Imported switch study'),
      note: stryMutAct_9fa48("18180") ? "Stryker was here!" : (stryCov_9fa48("18180"), ''),
      kind: stryMutAct_9fa48("18181") ? "" : (stryCov_9fa48("18181"), 'build')
    }));
    const damagedEvidence = structuredClone(evidence);
    Object.assign(damagedEvidence.accessoryReferences[0], stryMutAct_9fa48("18183") ? {} : (stryCov_9fa48("18183"), {
      kind: stryMutAct_9fa48("18184") ? "" : (stryCov_9fa48("18184"), 'artisan'),
      placement: stryMutAct_9fa48("18185") ? "" : (stryCov_9fa48("18185"), 'key'),
      sizeU: 1,
      stem: stryMutAct_9fa48("18186") ? "" : (stryCov_9fa48("18186"), 'mx')
    }));
    db.sqlite.prepare(stryMutAct_9fa48("18188") ? "" : (stryCov_9fa48("18188"), 'UPDATE community_build SET evidence=? WHERE id=?')).run(JSON.stringify(damagedEvidence), result.id);
    await assert.rejects(readPublicPublication(db, publication.id), stryMutAct_9fa48("18189") ? {} : (stryCov_9fa48("18189"), {
      code: stryMutAct_9fa48("18190") ? "" : (stryCov_9fa48("18190"), 'saved_build_unavailable')
    }));
    db.sqlite.prepare(stryMutAct_9fa48("18192") ? "" : (stryCov_9fa48("18192"), 'UPDATE community_build SET evidence=? WHERE id=?')).run(JSON.stringify(evidence), result.id);
    const publicRead = await readPublicPublication(db, publication.id);
    assert.deepEqual(publicRead.build.customParts, stryMutAct_9fa48("18194") ? [] : (stryCov_9fa48("18194"), [selected]));
    assert.equal(JSON.stringify(publicRead).includes(unused.source), stryMutAct_9fa48("18196") ? true : (stryCov_9fa48("18196"), false));
    assert.equal(publicRead.evidence.components.find(stryMutAct_9fa48("18198") ? () => undefined : (stryCov_9fa48("18198"), part => stryMutAct_9fa48("18201") ? part.id !== selected.id : stryMutAct_9fa48("18200") ? false : stryMutAct_9fa48("18199") ? true : (stryCov_9fa48("18199", "18200", "18201"), part.id === selected.id))).evidence, stryMutAct_9fa48("18202") ? "" : (stryCov_9fa48("18202"), 'unknown'));
    if (stryMutAct_9fa48("18203")) {
      ;
    } else {
      stryCov_9fa48("18203");
      assert.equal(publicRead.evidence.accessoryReferences[0].source, accessory.source);
    }
    if (stryMutAct_9fa48("18204")) {
      ;
    } else {
      stryCov_9fa48("18204");
      assert.deepEqual(publicRead.evidence.components, evidence.components);
    }
    if (stryMutAct_9fa48("18205")) {
      ;
    } else {
      stryCov_9fa48("18205");
      assert.deepEqual(publicRead.evidence.compatibility, evidence.compatibility);
    }
    if (stryMutAct_9fa48("18206")) {
      ;
    } else {
      stryCov_9fa48("18206");
      assert.equal(publicRead.evidence.sound.recording.groups, undefined);
    }
    assert.equal(db.sqlite.prepare(stryMutAct_9fa48("18208") ? "" : (stryCov_9fa48("18208"), 'SELECT payload FROM community_build WHERE id=?')).get(result.id).payload, legacyPayload);
    if (stryMutAct_9fa48("18209")) {
      ;
    } else {
      stryCov_9fa48("18209");
      assert.deepEqual((await readBuild(db, alice, result.id)).build.accessories, request.build.accessories);
    }
  }
});
test(stryMutAct_9fa48("18211") ? "" : (stryCov_9fa48("18211"), 'invalid profiles, documents and response shapes are rejected'), () => {
  if (stryMutAct_9fa48("18212")) {
    {}
  } else {
    stryCov_9fa48("18212");
    for (const handle of stryMutAct_9fa48("18213") ? [] : (stryCov_9fa48("18213"), [stryMutAct_9fa48("18214") ? "" : (stryCov_9fa48("18214"), 'admin'), stryMutAct_9fa48("18215") ? "" : (stryCov_9fa48("18215"), 'OpenAI'), stryMutAct_9fa48("18216") ? "" : (stryCov_9fa48("18216"), 'a'), stryMutAct_9fa48("18217") ? "" : (stryCov_9fa48("18217"), 'has spaces'), stryMutAct_9fa48("18218") ? "" : (stryCov_9fa48("18218"), '_starts_bad'), (stryMutAct_9fa48("18219") ? "" : (stryCov_9fa48("18219"), 'x')).repeat(25)])) {
      if (stryMutAct_9fa48("18220")) {
        {}
      } else {
        stryCov_9fa48("18220");
        assert.throws(stryMutAct_9fa48("18222") ? () => undefined : (stryCov_9fa48("18222"), () => parseCommunityProfile(stryMutAct_9fa48("18223") ? {} : (stryCov_9fa48("18223"), {
          ...profile,
          handle
        }))), stryMutAct_9fa48("18224") ? {} : (stryCov_9fa48("18224"), {
          code: stryMutAct_9fa48("18225") ? "" : (stryCov_9fa48("18225"), 'invalid_request')
        }));
      }
    }
    for (const value of stryMutAct_9fa48("18226") ? [] : (stryCov_9fa48("18226"), [stryMutAct_9fa48("18227") ? {} : (stryCov_9fa48("18227"), {
      ...profile,
      displayName: stryMutAct_9fa48("18228") ? "Stryker was here!" : (stryCov_9fa48("18228"), '')
    }), stryMutAct_9fa48("18229") ? {} : (stryCov_9fa48("18229"), {
      ...profile,
      bio: (stryMutAct_9fa48("18230") ? "" : (stryCov_9fa48("18230"), 'x')).repeat(161)
    }), stryMutAct_9fa48("18231") ? {} : (stryCov_9fa48("18231"), {
      ...profile,
      displayName: stryMutAct_9fa48("18232") ? "" : (stryCov_9fa48("18232"), 'bad\nname')
    }), stryMutAct_9fa48("18233") ? {} : (stryCov_9fa48("18233"), {
      email: stryMutAct_9fa48("18234") ? "" : (stryCov_9fa48("18234"), 'alice@example.com')
    })])) {
      if (stryMutAct_9fa48("18235")) {
        {}
      } else {
        stryCov_9fa48("18235");
        assert.throws(stryMutAct_9fa48("18237") ? () => undefined : (stryCov_9fa48("18237"), () => parseCommunityProfile(value)), stryMutAct_9fa48("18238") ? {} : (stryCov_9fa48("18238"), {
          code: stryMutAct_9fa48("18239") ? "" : (stryCov_9fa48("18239"), 'invalid_request')
        }));
      }
    }
    assert.throws(stryMutAct_9fa48("18241") ? () => undefined : (stryCov_9fa48("18241"), () => save(stryMutAct_9fa48("18242") ? {} : (stryCov_9fa48("18242"), {
      ...defaultBuild,
      version: 2
    }))), stryMutAct_9fa48("18243") ? {} : (stryCov_9fa48("18243"), {
      code: stryMutAct_9fa48("18244") ? "" : (stryCov_9fa48("18244"), 'invalid_request')
    }));
    assert.throws(stryMutAct_9fa48("18246") ? () => undefined : (stryCov_9fa48("18246"), () => save(stryMutAct_9fa48("18247") ? {} : (stryCov_9fa48("18247"), {
      ...defaultBuild,
      name: (stryMutAct_9fa48("18248") ? "" : (stryCov_9fa48("18248"), 'x')).repeat(81)
    }))), stryMutAct_9fa48("18249") ? {} : (stryCov_9fa48("18249"), {
      code: stryMutAct_9fa48("18250") ? "" : (stryCov_9fa48("18250"), 'invalid_request')
    }));
    assert.throws(stryMutAct_9fa48("18252") ? () => undefined : (stryCov_9fa48("18252"), () => save(defaultBuild, stryMutAct_9fa48("18253") ? "" : (stryCov_9fa48("18253"), 'short'))), stryMutAct_9fa48("18254") ? {} : (stryCov_9fa48("18254"), {
      code: stryMutAct_9fa48("18255") ? "" : (stryCov_9fa48("18255"), 'invalid_request')
    }));
    assert.throws(stryMutAct_9fa48("18257") ? () => undefined : (stryCov_9fa48("18257"), () => parseSavedBuildSummaries(stryMutAct_9fa48("18258") ? {} : (stryCov_9fa48("18258"), {
      builds: stryMutAct_9fa48("18259") ? ["Stryker was here"] : (stryCov_9fa48("18259"), [])
    }))));
    assert.throws(stryMutAct_9fa48("18261") ? () => undefined : (stryCov_9fa48("18261"), () => parseSavedBuild(stryMutAct_9fa48("18262") ? {} : (stryCov_9fa48("18262"), {
      id: (stryMutAct_9fa48("18263") ? "" : (stryCov_9fa48("18263"), 'x')).repeat(16),
      name: stryMutAct_9fa48("18264") ? "" : (stryCov_9fa48("18264"), 'Build'),
      createdAt: stryMutAct_9fa48("18265") ? "" : (stryCov_9fa48("18265"), 'not-a-date'),
      build: defaultBuild
    }))));
  }
});
test(stryMutAct_9fa48("18267") ? "" : (stryCov_9fa48("18267"), 'same-origin JSON mutation boundary rejects missing and foreign origins and bounds streamed bytes'), async () => {
  if (stryMutAct_9fa48("18268")) {
    {}
  } else {
    stryCov_9fa48("18268");
    const url = stryMutAct_9fa48("18269") ? "" : (stryCov_9fa48("18269"), 'https://keyconf.example/api/community/builds');
    const request = stryMutAct_9fa48("18270") ? () => undefined : (stryCov_9fa48("18270"), (() => {
      const request = (headers = {}, body = stryMutAct_9fa48("18271") ? "" : (stryCov_9fa48("18271"), '{}')) => new Request(url, stryMutAct_9fa48("18272") ? {} : (stryCov_9fa48("18272"), {
        method: stryMutAct_9fa48("18273") ? "" : (stryCov_9fa48("18273"), 'POST'),
        headers: stryMutAct_9fa48("18274") ? {} : (stryCov_9fa48("18274"), {
          'Content-Type': stryMutAct_9fa48("18275") ? "" : (stryCov_9fa48("18275"), 'application/json'),
          ...headers
        }),
        body
      }));
      return request;
    })());
    await assert.rejects(communityRequest(request()), stryMutAct_9fa48("18276") ? {} : (stryCov_9fa48("18276"), {
      code: stryMutAct_9fa48("18277") ? "" : (stryCov_9fa48("18277"), 'invalid_origin'),
      status: 403
    }));
    await assert.rejects(communityRequest(request(stryMutAct_9fa48("18278") ? {} : (stryCov_9fa48("18278"), {
      origin: stryMutAct_9fa48("18279") ? "" : (stryCov_9fa48("18279"), 'https://evil.example')
    }))), stryMutAct_9fa48("18280") ? {} : (stryCov_9fa48("18280"), {
      code: stryMutAct_9fa48("18281") ? "" : (stryCov_9fa48("18281"), 'invalid_origin')
    }));
    await assert.rejects(communityRequest(request(stryMutAct_9fa48("18282") ? {} : (stryCov_9fa48("18282"), {
      origin: stryMutAct_9fa48("18283") ? "" : (stryCov_9fa48("18283"), 'null')
    }))), stryMutAct_9fa48("18284") ? {} : (stryCov_9fa48("18284"), {
      code: stryMutAct_9fa48("18285") ? "" : (stryCov_9fa48("18285"), 'invalid_origin')
    }));
    await assert.rejects(communityRequest(request(stryMutAct_9fa48("18286") ? {} : (stryCov_9fa48("18286"), {
      origin: stryMutAct_9fa48("18287") ? "" : (stryCov_9fa48("18287"), 'https://keyconf.example'),
      'Content-Type': stryMutAct_9fa48("18288") ? "" : (stryCov_9fa48("18288"), 'text/plain')
    }))), stryMutAct_9fa48("18289") ? {} : (stryCov_9fa48("18289"), {
      code: stryMutAct_9fa48("18290") ? "" : (stryCov_9fa48("18290"), 'invalid_request')
    }));
    await assert.rejects(communityRequest(request(stryMutAct_9fa48("18291") ? {} : (stryCov_9fa48("18291"), {
      origin: stryMutAct_9fa48("18292") ? "" : (stryCov_9fa48("18292"), 'https://keyconf.example')
    }), stryMutAct_9fa48("18293") ? "" : (stryCov_9fa48("18293"), '{broken'))), stryMutAct_9fa48("18294") ? {} : (stryCov_9fa48("18294"), {
      code: stryMutAct_9fa48("18295") ? "" : (stryCov_9fa48("18295"), 'invalid_request')
    }));
    await assert.rejects(communityRequest(request(stryMutAct_9fa48("18296") ? {} : (stryCov_9fa48("18296"), {
      origin: stryMutAct_9fa48("18297") ? "" : (stryCov_9fa48("18297"), 'https://keyconf.example')
    }), (stryMutAct_9fa48("18298") ? "" : (stryCov_9fa48("18298"), 'é')).repeat(100)), 150), stryMutAct_9fa48("18299") ? {} : (stryCov_9fa48("18299"), {
      code: stryMutAct_9fa48("18300") ? "" : (stryCov_9fa48("18300"), 'request_too_large'),
      status: 413
    }));
    assert.deepEqual(await communityRequest(request(stryMutAct_9fa48("18302") ? {} : (stryCov_9fa48("18302"), {
      origin: stryMutAct_9fa48("18303") ? "" : (stryCov_9fa48("18303"), 'https://keyconf.example')
    }))), {});
  }
});
test(stryMutAct_9fa48("18305") ? "" : (stryCov_9fa48("18305"), 'private responses and all application errors prevent caching and omit internal errors'), async () => {
  if (stryMutAct_9fa48("18306")) {
    {}
  } else {
    stryCov_9fa48("18306");
    const success = communityResponse(stryMutAct_9fa48("18307") ? {} : (stryCov_9fa48("18307"), {
      profile: null
    }));
    assert.equal(success.headers.get(stryMutAct_9fa48("18309") ? "" : (stryCov_9fa48("18309"), 'Cache-Control')), stryMutAct_9fa48("18310") ? "" : (stryCov_9fa48("18310"), 'private, no-store'));
    for (const error of stryMutAct_9fa48("18311") ? [] : (stryCov_9fa48("18311"), [new CommunityError(stryMutAct_9fa48("18312") ? "" : (stryCov_9fa48("18312"), 'authentication_required'), stryMutAct_9fa48("18313") ? "" : (stryCov_9fa48("18313"), 'Sign in.'), 401), new Error(stryMutAct_9fa48("18314") ? "" : (stryCov_9fa48("18314"), 'SQL secret private_subject'))])) {
      if (stryMutAct_9fa48("18315")) {
        {}
      } else {
        stryCov_9fa48("18315");
        const response = communityErrorResponse(error);
        assert.equal(response.headers.get(stryMutAct_9fa48("18317") ? "" : (stryCov_9fa48("18317"), 'Cache-Control')), stryMutAct_9fa48("18318") ? "" : (stryCov_9fa48("18318"), 'private, no-store'));
        assert.equal(response.headers.get(stryMutAct_9fa48("18320") ? "" : (stryCov_9fa48("18320"), 'Access-Control-Allow-Origin')), null);
        const data = await response.json();
        assert.equal(JSON.stringify(data).includes(stryMutAct_9fa48("18322") ? "" : (stryCov_9fa48("18322"), 'private_subject')), stryMutAct_9fa48("18323") ? true : (stryCov_9fa48("18323"), false));
        assert.equal(typeof data.error.message, stryMutAct_9fa48("18325") ? "" : (stryCov_9fa48("18325"), 'string'));
      }
    }
  }
});
test(stryMutAct_9fa48("18327") ? "" : (stryCov_9fa48("18327"), 'removed catalog IDs retain the stored snapshot and never silently substitute parts'), async t => {
  if (stryMutAct_9fa48("18328")) {
    {}
  } else {
    stryCov_9fa48("18328");
    const db = database(t);
    const result = await saveBuild(db, alice, save());
    const unsupported = stryMutAct_9fa48("18329") ? {} : (stryCov_9fa48("18329"), {
      ...defaultBuild,
      selection: stryMutAct_9fa48("18330") ? {} : (stryCov_9fa48("18330"), {
        ...defaultBuild.selection,
        switch: stryMutAct_9fa48("18331") ? "" : (stryCov_9fa48("18331"), 'removed-catalog-part')
      })
    });
    db.sqlite.prepare(stryMutAct_9fa48("18333") ? "" : (stryCov_9fa48("18333"), 'UPDATE community_build SET payload=? WHERE id=?')).run(JSON.stringify(unsupported), result.id);
    await assert.rejects(readBuild(db, alice, result.id), stryMutAct_9fa48("18334") ? {} : (stryCov_9fa48("18334"), {
      code: stryMutAct_9fa48("18335") ? "" : (stryCov_9fa48("18335"), 'saved_build_unavailable'),
      status: 422
    }));
    assert.deepEqual(JSON.parse(db.sqlite.prepare(stryMutAct_9fa48("18337") ? "" : (stryCov_9fa48("18337"), 'SELECT payload FROM community_build WHERE id=?')).get(result.id).payload), unsupported);
  }
});
test(stryMutAct_9fa48("18339") ? "" : (stryCov_9fa48("18339"), 'creator links normalize and persist without exposing another account'), async t => {
  if (stryMutAct_9fa48("18340")) {
    {}
  } else {
    stryCov_9fa48("18340");
    const db = database(t);
    const linked = parseCommunityProfile(stryMutAct_9fa48("18341") ? {} : (stryCov_9fa48("18341"), {
      ...profile,
      links: stryMutAct_9fa48("18342") ? [] : (stryCov_9fa48("18342"), [stryMutAct_9fa48("18343") ? {} : (stryCov_9fa48("18343"), {
        label: stryMutAct_9fa48("18344") ? "" : (stryCov_9fa48("18344"), ' Channel '),
        url: stryMutAct_9fa48("18345") ? "" : (stryCov_9fa48("18345"), 'https://example.com')
      }), stryMutAct_9fa48("18346") ? {} : (stryCov_9fa48("18346"), {
        label: stryMutAct_9fa48("18347") ? "" : (stryCov_9fa48("18347"), 'Commissions'),
        url: stryMutAct_9fa48("18348") ? "" : (stryCov_9fa48("18348"), 'https://example.com/builds')
      })])
    }));
    assert.deepEqual(linked.links[0], stryMutAct_9fa48("18350") ? {} : (stryCov_9fa48("18350"), {
      label: stryMutAct_9fa48("18351") ? "" : (stryCov_9fa48("18351"), 'Channel'),
      url: stryMutAct_9fa48("18352") ? "" : (stryCov_9fa48("18352"), 'https://example.com/')
    }));
    await saveProfile(db, alice, linked);
    if (stryMutAct_9fa48("18353")) {
      ;
    } else {
      stryCov_9fa48("18353");
      assert.deepEqual(await readProfile(db, alice), linked);
    }
    if (stryMutAct_9fa48("18354")) {
      ;
    } else {
      stryCov_9fa48("18354");
      assert.equal(await readProfile(db, bob), null);
    }
    await saveProfile(db, alice, stryMutAct_9fa48("18355") ? {} : (stryCov_9fa48("18355"), {
      ...linked,
      links: stryMutAct_9fa48("18356") ? ["Stryker was here"] : (stryCov_9fa48("18356"), [])
    }));
    assert.deepEqual((await readProfile(db, alice)).links, stryMutAct_9fa48("18358") ? ["Stryker was here"] : (stryCov_9fa48("18358"), []));
    assert.deepEqual(parseCommunityProfile(stryMutAct_9fa48("18360") ? {} : (stryCov_9fa48("18360"), {
      handle: stryMutAct_9fa48("18361") ? "" : (stryCov_9fa48("18361"), 'old_profile'),
      displayName: stryMutAct_9fa48("18362") ? "" : (stryCov_9fa48("18362"), 'Old profile'),
      bio: stryMutAct_9fa48("18363") ? "Stryker was here!" : (stryCov_9fa48("18363"), '')
    })).links, stryMutAct_9fa48("18364") ? ["Stryker was here"] : (stryCov_9fa48("18364"), []));
  }
});
test(stryMutAct_9fa48("18366") ? "" : (stryCov_9fa48("18366"), 'creator links reject unsafe, duplicate and oversized values'), () => {
  if (stryMutAct_9fa48("18367")) {
    {}
  } else {
    stryCov_9fa48("18367");
    for (const links of stryMutAct_9fa48("18368") ? [] : (stryCov_9fa48("18368"), [stryMutAct_9fa48("18369") ? [] : (stryCov_9fa48("18369"), [stryMutAct_9fa48("18370") ? {} : (stryCov_9fa48("18370"), {
      label: stryMutAct_9fa48("18371") ? "" : (stryCov_9fa48("18371"), 'Bad'),
      url: stryMutAct_9fa48("18372") ? "" : (stryCov_9fa48("18372"), 'javascript:alert(1)')
    })]), stryMutAct_9fa48("18373") ? [] : (stryCov_9fa48("18373"), [stryMutAct_9fa48("18374") ? {} : (stryCov_9fa48("18374"), {
      label: stryMutAct_9fa48("18375") ? "" : (stryCov_9fa48("18375"), 'Bad'),
      url: stryMutAct_9fa48("18376") ? "" : (stryCov_9fa48("18376"), 'https://user:password@example.com/')
    })]), stryMutAct_9fa48("18377") ? [] : (stryCov_9fa48("18377"), [stryMutAct_9fa48("18378") ? {} : (stryCov_9fa48("18378"), {
      label: stryMutAct_9fa48("18379") ? "" : (stryCov_9fa48("18379"), 'Bad'),
      url: stryMutAct_9fa48("18380") ? "" : (stryCov_9fa48("18380"), '/relative')
    })]), stryMutAct_9fa48("18381") ? [] : (stryCov_9fa48("18381"), [stryMutAct_9fa48("18382") ? {} : (stryCov_9fa48("18382"), {
      label: stryMutAct_9fa48("18383") ? "Stryker was here!" : (stryCov_9fa48("18383"), ''),
      url: stryMutAct_9fa48("18384") ? "" : (stryCov_9fa48("18384"), 'https://example.com')
    })]), stryMutAct_9fa48("18385") ? [] : (stryCov_9fa48("18385"), [stryMutAct_9fa48("18386") ? {} : (stryCov_9fa48("18386"), {
      label: stryMutAct_9fa48("18387") ? "" : (stryCov_9fa48("18387"), 'bad\nlabel'),
      url: stryMutAct_9fa48("18388") ? "" : (stryCov_9fa48("18388"), 'https://example.com')
    })]), stryMutAct_9fa48("18389") ? [] : (stryCov_9fa48("18389"), [stryMutAct_9fa48("18390") ? {} : (stryCov_9fa48("18390"), {
      label: stryMutAct_9fa48("18391") ? "" : (stryCov_9fa48("18391"), 'A'),
      url: stryMutAct_9fa48("18392") ? "" : (stryCov_9fa48("18392"), 'https://example.com')
    }), stryMutAct_9fa48("18393") ? {} : (stryCov_9fa48("18393"), {
      label: stryMutAct_9fa48("18394") ? "" : (stryCov_9fa48("18394"), 'B'),
      url: stryMutAct_9fa48("18395") ? "" : (stryCov_9fa48("18395"), 'https://example.com/')
    })]), Array.from(stryMutAct_9fa48("18396") ? {} : (stryCov_9fa48("18396"), {
      length: 6
    }), stryMutAct_9fa48("18397") ? () => undefined : (stryCov_9fa48("18397"), (_, i) => stryMutAct_9fa48("18398") ? {} : (stryCov_9fa48("18398"), {
      label: stryMutAct_9fa48("18399") ? `` : (stryCov_9fa48("18399"), `Link ${i}`),
      url: stryMutAct_9fa48("18400") ? `` : (stryCov_9fa48("18400"), `https://example.com/${i}`)
    })))])) assert.throws(stryMutAct_9fa48("18402") ? () => undefined : (stryCov_9fa48("18402"), () => parseCommunityProfile(stryMutAct_9fa48("18403") ? {} : (stryCov_9fa48("18403"), {
      ...profile,
      links
    }))), stryMutAct_9fa48("18404") ? {} : (stryCov_9fa48("18404"), {
      code: stryMutAct_9fa48("18405") ? "" : (stryCov_9fa48("18405"), 'invalid_request')
    }));
  }
});
test(stryMutAct_9fa48("18407") ? "" : (stryCov_9fa48("18407"), 'creator-link migration preserves existing profiles and gives them an empty list'), t => {
  if (stryMutAct_9fa48("18408")) {
    {}
  } else {
    stryCov_9fa48("18408");
    const sqlite = new DatabaseSync(stryMutAct_9fa48("18409") ? "" : (stryCov_9fa48("18409"), ':memory:'));
    t.after(stryMutAct_9fa48("18411") ? () => undefined : (stryCov_9fa48("18411"), () => sqlite.close()));
    sqlite.exec(stryMutAct_9fa48("18413") ? "" : (stryCov_9fa48("18413"), 'PRAGMA foreign_keys=ON'));
    for (const file of stryMutAct_9fa48("18414") ? [] : (stryCov_9fa48("18414"), [stryMutAct_9fa48("18415") ? "" : (stryCov_9fa48("18415"), '0000_supreme_tiger_shark.sql'), stryMutAct_9fa48("18416") ? "" : (stryCov_9fa48("18416"), '0001_panoramic_ken_ellis.sql')])) sqlite.exec(readFileSync(new URL(stryMutAct_9fa48("18418") ? `` : (stryCov_9fa48("18418"), `../drizzle/${file}`), import.meta.url), stryMutAct_9fa48("18419") ? "" : (stryCov_9fa48("18419"), 'utf8')));
    sqlite.prepare(stryMutAct_9fa48("18421") ? "" : (stryCov_9fa48("18421"), 'INSERT INTO community_account(id,subject,created_at) VALUES(?,?,?)')).run(stryMutAct_9fa48("18422") ? "" : (stryCov_9fa48("18422"), 'legacy-owner'), stryMutAct_9fa48("18423") ? "" : (stryCov_9fa48("18423"), 'google:legacy-subject'), stryMutAct_9fa48("18424") ? "" : (stryCov_9fa48("18424"), '2026-09-06T00:00:00Z'));
    sqlite.prepare(stryMutAct_9fa48("18426") ? "" : (stryCov_9fa48("18426"), 'INSERT INTO community_profile(account_id,handle,display_name,bio) VALUES(?,?,?,?)')).run(stryMutAct_9fa48("18427") ? "" : (stryCov_9fa48("18427"), 'legacy-owner'), stryMutAct_9fa48("18428") ? "" : (stryCov_9fa48("18428"), 'legacy_builder'), stryMutAct_9fa48("18429") ? "" : (stryCov_9fa48("18429"), 'Legacy Builder'), stryMutAct_9fa48("18430") ? "" : (stryCov_9fa48("18430"), 'Custom commissions'));
    sqlite.exec(readFileSync(new URL(stryMutAct_9fa48("18432") ? "" : (stryCov_9fa48("18432"), '../drizzle/0002_far_famine.sql'), import.meta.url), stryMutAct_9fa48("18433") ? "" : (stryCov_9fa48("18433"), 'utf8')));
    assert.deepEqual(stryMutAct_9fa48("18435") ? {} : (stryCov_9fa48("18435"), {
      ...sqlite.prepare(stryMutAct_9fa48("18436") ? "" : (stryCov_9fa48("18436"), 'SELECT handle,display_name,bio,links FROM community_profile')).get()
    }), stryMutAct_9fa48("18437") ? {} : (stryCov_9fa48("18437"), {
      handle: stryMutAct_9fa48("18438") ? "" : (stryCov_9fa48("18438"), 'legacy_builder'),
      display_name: stryMutAct_9fa48("18439") ? "" : (stryCov_9fa48("18439"), 'Legacy Builder'),
      bio: stryMutAct_9fa48("18440") ? "" : (stryCov_9fa48("18440"), 'Custom commissions'),
      links: stryMutAct_9fa48("18441") ? "" : (stryCov_9fa48("18441"), '[]')
    }));
  }
});
test(stryMutAct_9fa48("18443") ? "" : (stryCov_9fa48("18443"), 'publications freeze a saved revision and chosen author, with private fields excluded'), async t => {
  if (stryMutAct_9fa48("18444")) {
    {}
  } else {
    stryCov_9fa48("18444");
    const db = database(t);
    const saved = await saveBuild(db, alice, save(stryMutAct_9fa48("18445") ? {} : (stryCov_9fa48("18445"), {
      ...defaultBuild,
      name: stryMutAct_9fa48("18446") ? "" : (stryCov_9fa48("18446"), 'Private client draft')
    })));
    const request = stryMutAct_9fa48("18447") ? {} : (stryCov_9fa48("18447"), {
      operationId: stryMutAct_9fa48("18448") ? "" : (stryCov_9fa48("18448"), 'publication-operation-001'),
      buildId: saved.id,
      title: stryMutAct_9fa48("18449") ? "" : (stryCov_9fa48("18449"), 'Public release'),
      note: stryMutAct_9fa48("18450") ? "" : (stryCov_9fa48("18450"), 'Built for quiet typing.'),
      kind: stryMutAct_9fa48("18451") ? "" : (stryCov_9fa48("18451"), 'build')
    });
    await assert.rejects(publishBuild(db, alice, request), stryMutAct_9fa48("18452") ? {} : (stryCov_9fa48("18452"), {
      code: stryMutAct_9fa48("18453") ? "" : (stryCov_9fa48("18453"), 'profile_required')
    }));
    await saveProfile(db, alice, profile);
    await assert.rejects(publishBuild(db, bob, request), stryMutAct_9fa48("18454") ? {} : (stryCov_9fa48("18454"), {
      code: stryMutAct_9fa48("18455") ? "" : (stryCov_9fa48("18455"), 'build_not_found')
    }));
    const released = await publishBuild(db, alice, request);
    await saveProfile(db, alice, stryMutAct_9fa48("18456") ? {} : (stryCov_9fa48("18456"), {
      ...profile,
      displayName: stryMutAct_9fa48("18457") ? "" : (stryCov_9fa48("18457"), 'New name'),
      bio: stryMutAct_9fa48("18458") ? "" : (stryCov_9fa48("18458"), 'Changed')
    }));
    await saveBuild(db, alice, save(stryMutAct_9fa48("18459") ? {} : (stryCov_9fa48("18459"), {
      ...defaultBuild,
      caseColor: stryMutAct_9fa48("18460") ? "" : (stryCov_9fa48("18460"), '#000000')
    }), stryMutAct_9fa48("18461") ? "" : (stryCov_9fa48("18461"), 'another-save-operation')));
    if (stryMutAct_9fa48("18462")) {
      ;
    } else {
      stryCov_9fa48("18462");
      assert.deepEqual(await publishBuild(db, alice, request), released);
    }
    const visible = await readPublicPublication(db, released.id);
    assert.equal(visible.author.displayName, stryMutAct_9fa48("18464") ? "" : (stryCov_9fa48("18464"), 'Alice'));
    assert.equal(visible.build.name, stryMutAct_9fa48("18466") ? "" : (stryCov_9fa48("18466"), 'Public release'));
    if (stryMutAct_9fa48("18467")) {
      ;
    } else {
      stryCov_9fa48("18467");
      assert.equal(visible.build.caseColor, defaultBuild.caseColor);
    }
    const serialized = JSON.stringify(visible);
    for (const privateValue of stryMutAct_9fa48("18468") ? [] : (stryCov_9fa48("18468"), [alice, saved.id, request.operationId, stryMutAct_9fa48("18469") ? "" : (stryCov_9fa48("18469"), 'Private client draft')])) assert.equal(serialized.includes(privateValue), stryMutAct_9fa48("18471") ? true : (stryCov_9fa48("18471"), false));
    await assert.rejects(publishBuild(db, alice, stryMutAct_9fa48("18472") ? {} : (stryCov_9fa48("18472"), {
      ...request,
      title: stryMutAct_9fa48("18473") ? "" : (stryCov_9fa48("18473"), 'Different release')
    })), stryMutAct_9fa48("18474") ? {} : (stryCov_9fa48("18474"), {
      code: stryMutAct_9fa48("18475") ? "" : (stryCov_9fa48("18475"), 'operation_conflict')
    }));
  }
});
test(stryMutAct_9fa48("18477") ? "" : (stryCov_9fa48("18477"), 'publication withdrawal is owner-only, repeatable, and cannot be undone by retrying publish'), async t => {
  if (stryMutAct_9fa48("18478")) {
    {}
  } else {
    stryCov_9fa48("18478");
    const db = database(t);
    await saveProfile(db, alice, profile);
    const saved = await saveBuild(db, alice, save());
    const request = stryMutAct_9fa48("18479") ? {} : (stryCov_9fa48("18479"), {
      operationId: stryMutAct_9fa48("18480") ? "" : (stryCov_9fa48("18480"), 'publication-operation-002'),
      buildId: saved.id,
      title: stryMutAct_9fa48("18481") ? "" : (stryCov_9fa48("18481"), 'Drop'),
      note: stryMutAct_9fa48("18482") ? "Stryker was here!" : (stryCov_9fa48("18482"), ''),
      kind: stryMutAct_9fa48("18483") ? "" : (stryCov_9fa48("18483"), 'drop'),
      availability: stryMutAct_9fa48("18484") ? "" : (stryCov_9fa48("18484"), 'Ask the maker'),
      externalUrl: stryMutAct_9fa48("18485") ? "" : (stryCov_9fa48("18485"), 'https://example.com/commissions')
    });
    const released = await publishBuild(db, alice, request);
    await assert.rejects(withdrawPublication(db, bob, released.id), stryMutAct_9fa48("18486") ? {} : (stryCov_9fa48("18486"), {
      code: stryMutAct_9fa48("18487") ? "" : (stryCov_9fa48("18487"), 'publication_not_found')
    }));
    if (stryMutAct_9fa48("18488")) {
      ;
    } else {
      stryCov_9fa48("18488");
      assert.equal((await readPublicPublication(db, released.id)).withdrawnAt, null);
    }
    const withdrawn = await withdrawPublication(db, alice, released.id);
    if (stryMutAct_9fa48("18489")) {
      ;
    } else {
      stryCov_9fa48("18489");
      assert.ok(withdrawn.withdrawnAt);
    }
    if (stryMutAct_9fa48("18490")) {
      ;
    } else {
      stryCov_9fa48("18490");
      assert.deepEqual(await withdrawPublication(db, alice, released.id), withdrawn);
    }
    await assert.rejects(readPublicPublication(db, released.id), stryMutAct_9fa48("18491") ? {} : (stryCov_9fa48("18491"), {
      code: stryMutAct_9fa48("18492") ? "" : (stryCov_9fa48("18492"), 'publication_not_found')
    }));
    if (stryMutAct_9fa48("18493")) {
      ;
    } else {
      stryCov_9fa48("18493");
      assert.deepEqual(await publishBuild(db, alice, request), withdrawn);
    }
  }
});
test(stryMutAct_9fa48("18495") ? "" : (stryCov_9fa48("18495"), 'retired build parts cannot prevent withdrawal or silently change a published snapshot'), async t => {
  if (stryMutAct_9fa48("18496")) {
    {}
  } else {
    stryCov_9fa48("18496");
    const db = database(t);
    await saveProfile(db, alice, profile);
    const saved = await saveBuild(db, alice, save());
    const request = stryMutAct_9fa48("18497") ? {} : (stryCov_9fa48("18497"), {
      operationId: stryMutAct_9fa48("18498") ? "" : (stryCov_9fa48("18498"), 'retired-publication-001'),
      buildId: saved.id,
      title: stryMutAct_9fa48("18499") ? "" : (stryCov_9fa48("18499"), 'Historical build'),
      note: stryMutAct_9fa48("18500") ? "Stryker was here!" : (stryCov_9fa48("18500"), ''),
      kind: stryMutAct_9fa48("18501") ? "" : (stryCov_9fa48("18501"), 'build')
    });
    const released = await publishBuild(db, alice, request);
    const retired = JSON.stringify(stryMutAct_9fa48("18502") ? {} : (stryCov_9fa48("18502"), {
      ...saved.build,
      selection: stryMutAct_9fa48("18503") ? {} : (stryCov_9fa48("18503"), {
        ...saved.build.selection,
        case: stryMutAct_9fa48("18504") ? "" : (stryCov_9fa48("18504"), 'retired-case')
      })
    }));
    db.sqlite.prepare(stryMutAct_9fa48("18506") ? "" : (stryCov_9fa48("18506"), 'UPDATE community_build SET payload=? WHERE id=?')).run(retired, saved.id);
    await assert.rejects(readPublicPublication(db, released.id), stryMutAct_9fa48("18507") ? {} : (stryCov_9fa48("18507"), {
      code: stryMutAct_9fa48("18508") ? "" : (stryCov_9fa48("18508"), 'saved_build_unavailable')
    }));
    const receipt = await withdrawPublication(db, alice, released.id);
    if (stryMutAct_9fa48("18509")) {
      ;
    } else {
      stryCov_9fa48("18509");
      assert.ok(receipt.withdrawnAt);
    }
    if (stryMutAct_9fa48("18510")) {
      ;
    } else {
      stryCov_9fa48("18510");
      assert.deepEqual(await publishBuild(db, alice, request), receipt);
    }
    if (stryMutAct_9fa48("18511")) {
      ;
    } else {
      stryCov_9fa48("18511");
      assert.deepEqual(await withdrawPublication(db, alice, released.id), receipt);
    }
    assert.equal(db.sqlite.prepare(stryMutAct_9fa48("18513") ? "" : (stryCov_9fa48("18513"), 'SELECT payload FROM community_build WHERE id=?')).get(saved.id).payload, retired);
    await assert.rejects(readPublicPublication(db, released.id), stryMutAct_9fa48("18514") ? {} : (stryCov_9fa48("18514"), {
      code: stryMutAct_9fa48("18515") ? "" : (stryCov_9fa48("18515"), 'publication_not_found')
    }));
  }
});
test(stryMutAct_9fa48("18517") ? "" : (stryCov_9fa48("18517"), 'invalid saved snapshots cannot create a publication or consume its operation key'), async t => {
  if (stryMutAct_9fa48("18518")) {
    {}
  } else {
    stryCov_9fa48("18518");
    const db = database(t);
    await saveProfile(db, alice, profile);
    const saved = await saveBuild(db, alice, save());
    const request = stryMutAct_9fa48("18519") ? {} : (stryCov_9fa48("18519"), {
      operationId: stryMutAct_9fa48("18520") ? "" : (stryCov_9fa48("18520"), 'invalid-publication-001'),
      buildId: saved.id,
      title: stryMutAct_9fa48("18521") ? "" : (stryCov_9fa48("18521"), 'Reviewed build'),
      note: stryMutAct_9fa48("18522") ? "Stryker was here!" : (stryCov_9fa48("18522"), ''),
      kind: stryMutAct_9fa48("18523") ? "" : (stryCov_9fa48("18523"), 'build')
    });
    const original = db.sqlite.prepare(stryMutAct_9fa48("18524") ? "" : (stryCov_9fa48("18524"), 'SELECT payload,evidence FROM community_build WHERE id=?')).get(saved.id);
    for (const [field, damaged] of stryMutAct_9fa48("18525") ? [] : (stryCov_9fa48("18525"), [stryMutAct_9fa48("18526") ? [] : (stryCov_9fa48("18526"), [stryMutAct_9fa48("18527") ? "" : (stryCov_9fa48("18527"), 'payload'), stryMutAct_9fa48("18528") ? "" : (stryCov_9fa48("18528"), '{broken')]), stryMutAct_9fa48("18529") ? [] : (stryCov_9fa48("18529"), [stryMutAct_9fa48("18530") ? "" : (stryCov_9fa48("18530"), 'evidence'), stryMutAct_9fa48("18531") ? "" : (stryCov_9fa48("18531"), '{broken')]), stryMutAct_9fa48("18532") ? [] : (stryCov_9fa48("18532"), [stryMutAct_9fa48("18533") ? "" : (stryCov_9fa48("18533"), 'payload'), JSON.stringify(stryMutAct_9fa48("18534") ? {} : (stryCov_9fa48("18534"), {
      ...saved.build,
      selection: stryMutAct_9fa48("18535") ? {} : (stryCov_9fa48("18535"), {
        ...saved.build.selection,
        case: stryMutAct_9fa48("18536") ? "" : (stryCov_9fa48("18536"), 'retired-case')
      })
    }))])])) {
      if (stryMutAct_9fa48("18537")) {
        {}
      } else {
        stryCov_9fa48("18537");
        db.sqlite.prepare(stryMutAct_9fa48("18539") ? `` : (stryCov_9fa48("18539"), `UPDATE community_build SET ${field}=? WHERE id=?`)).run(damaged, saved.id);
        await assert.rejects(publishBuild(db, alice, request), stryMutAct_9fa48("18540") ? {} : (stryCov_9fa48("18540"), {
          code: stryMutAct_9fa48("18541") ? "" : (stryCov_9fa48("18541"), 'saved_build_unavailable')
        }));
        assert.equal(db.sqlite.prepare(stryMutAct_9fa48("18543") ? "" : (stryCov_9fa48("18543"), 'SELECT COUNT(*) AS n FROM community_publication')).get().n, 0);
        db.sqlite.prepare(stryMutAct_9fa48("18545") ? `` : (stryCov_9fa48("18545"), `UPDATE community_build SET ${field}=? WHERE id=?`)).run(original[field], saved.id);
      }
    }
    const released = await publishBuild(db, alice, request);
    db.sqlite.prepare(stryMutAct_9fa48("18547") ? "" : (stryCov_9fa48("18547"), 'UPDATE community_profile SET links=?')).run(stryMutAct_9fa48("18548") ? "" : (stryCov_9fa48("18548"), '{broken'));
    if (stryMutAct_9fa48("18549")) {
      ;
    } else {
      stryCov_9fa48("18549");
      assert.deepEqual(await publishBuild(db, alice, request), released);
    }
  }
});
test(stryMutAct_9fa48("18551") ? "" : (stryCov_9fa48("18551"), 'concurrent publication retries converge and conflicting requests cannot overwrite the winner'), async t => {
  if (stryMutAct_9fa48("18552")) {
    {}
  } else {
    stryCov_9fa48("18552");
    const db = database(t);
    await saveProfile(db, alice, profile);
    const saved = await saveBuild(db, alice, save());
    const request = stryMutAct_9fa48("18553") ? {} : (stryCov_9fa48("18553"), {
      operationId: stryMutAct_9fa48("18554") ? "" : (stryCov_9fa48("18554"), 'concurrent-publication-001'),
      buildId: saved.id,
      title: stryMutAct_9fa48("18555") ? "" : (stryCov_9fa48("18555"), 'Release'),
      note: stryMutAct_9fa48("18556") ? "Stryker was here!" : (stryCov_9fa48("18556"), ''),
      kind: stryMutAct_9fa48("18557") ? "" : (stryCov_9fa48("18557"), 'build')
    });
    const copies = await Promise.all(stryMutAct_9fa48("18558") ? [] : (stryCov_9fa48("18558"), [publishBuild(db, alice, request), publishBuild(db, alice, request)]));
    if (stryMutAct_9fa48("18559")) {
      ;
    } else {
      stryCov_9fa48("18559");
      assert.deepEqual(copies[0], copies[1]);
    }
    const contested = stryMutAct_9fa48("18560") ? {} : (stryCov_9fa48("18560"), {
      ...request,
      operationId: stryMutAct_9fa48("18561") ? "" : (stryCov_9fa48("18561"), 'concurrent-publication-002')
    });
    const results = await Promise.allSettled(stryMutAct_9fa48("18562") ? [] : (stryCov_9fa48("18562"), [publishBuild(db, alice, contested), publishBuild(db, alice, stryMutAct_9fa48("18563") ? {} : (stryCov_9fa48("18563"), {
      ...contested,
      title: stryMutAct_9fa48("18564") ? "" : (stryCov_9fa48("18564"), 'Different')
    }))]));
    assert.equal(stryMutAct_9fa48("18566") ? results.length : (stryCov_9fa48("18566"), results.filter(stryMutAct_9fa48("18567") ? () => undefined : (stryCov_9fa48("18567"), result => stryMutAct_9fa48("18570") ? result.status !== 'fulfilled' : stryMutAct_9fa48("18569") ? false : stryMutAct_9fa48("18568") ? true : (stryCov_9fa48("18568", "18569", "18570"), result.status === (stryMutAct_9fa48("18571") ? "" : (stryCov_9fa48("18571"), 'fulfilled'))))).length), 1);
    const failure = results.find(stryMutAct_9fa48("18572") ? () => undefined : (stryCov_9fa48("18572"), result => stryMutAct_9fa48("18575") ? result.status !== 'rejected' : stryMutAct_9fa48("18574") ? false : stryMutAct_9fa48("18573") ? true : (stryCov_9fa48("18573", "18574", "18575"), result.status === (stryMutAct_9fa48("18576") ? "" : (stryCov_9fa48("18576"), 'rejected')))));
    assert.equal(failure.reason.code, stryMutAct_9fa48("18578") ? "" : (stryCov_9fa48("18578"), 'operation_conflict'));
    assert.equal(db.sqlite.prepare(stryMutAct_9fa48("18580") ? "" : (stryCov_9fa48("18580"), 'SELECT COUNT(*) AS n FROM community_publication')).get().n, 2);
  }
});
test(stryMutAct_9fa48("18582") ? "" : (stryCov_9fa48("18582"), 'owner publication pages have stable boundaries, retain withdrawn entries and exclude other accounts'), async t => {
  if (stryMutAct_9fa48("18583")) {
    {}
  } else {
    stryCov_9fa48("18583");
    const db = database(t);
    await saveProfile(db, alice, profile);
    await saveProfile(db, bob, stryMutAct_9fa48("18584") ? {} : (stryCov_9fa48("18584"), {
      ...profile,
      handle: stryMutAct_9fa48("18585") ? "" : (stryCov_9fa48("18585"), 'bob_keys')
    }));
    const saved = await saveBuild(db, alice, save());
    const other = await saveBuild(db, bob, save());
    for (let i = 0; stryMutAct_9fa48("18588") ? i >= 28 : stryMutAct_9fa48("18587") ? i <= 28 : stryMutAct_9fa48("18586") ? false : (stryCov_9fa48("18586", "18587", "18588"), i < 28); stryMutAct_9fa48("18589") ? i-- : (stryCov_9fa48("18589"), i++)) await publishBuild(db, alice, stryMutAct_9fa48("18590") ? {} : (stryCov_9fa48("18590"), {
      operationId: stryMutAct_9fa48("18591") ? `` : (stryCov_9fa48("18591"), `publication-page-${String(i).padStart(3, stryMutAct_9fa48("18592") ? "" : (stryCov_9fa48("18592"), '0'))}`),
      buildId: saved.id,
      title: stryMutAct_9fa48("18593") ? `` : (stryCov_9fa48("18593"), `Build ${i}`),
      note: stryMutAct_9fa48("18594") ? "Stryker was here!" : (stryCov_9fa48("18594"), ''),
      kind: stryMutAct_9fa48("18595") ? "" : (stryCov_9fa48("18595"), 'build')
    }));
    const foreign = await publishBuild(db, bob, stryMutAct_9fa48("18596") ? {} : (stryCov_9fa48("18596"), {
      operationId: stryMutAct_9fa48("18597") ? "" : (stryCov_9fa48("18597"), 'publication-page-other'),
      buildId: other.id,
      title: stryMutAct_9fa48("18598") ? "" : (stryCov_9fa48("18598"), 'Bob private management'),
      note: stryMutAct_9fa48("18599") ? "Stryker was here!" : (stryCov_9fa48("18599"), ''),
      kind: stryMutAct_9fa48("18600") ? "" : (stryCov_9fa48("18600"), 'build')
    }));
    db.sqlite.prepare(stryMutAct_9fa48("18602") ? "" : (stryCov_9fa48("18602"), 'UPDATE community_publication SET published_at=?')).run(stryMutAct_9fa48("18603") ? "" : (stryCov_9fa48("18603"), '2026-09-06T00:00:00.000Z'));
    const first = await listOwnedPublications(db, alice);
    if (stryMutAct_9fa48("18604")) {
      ;
    } else {
      stryCov_9fa48("18604");
      assert.equal(first.items.length, 25);
    }
    if (stryMutAct_9fa48("18605")) {
      ;
    } else {
      stryCov_9fa48("18605");
      assert.ok(first.next);
    }
    await withdrawPublication(db, alice, first.items[0].id);
    const second = await listOwnedPublications(db, alice, first.next);
    if (stryMutAct_9fa48("18606")) {
      ;
    } else {
      stryCov_9fa48("18606");
      assert.equal(second.items.length, 3);
    }
    if (stryMutAct_9fa48("18607")) {
      ;
    } else {
      stryCov_9fa48("18607");
      assert.equal(second.next, null);
    }
    const ids = (stryMutAct_9fa48("18608") ? [] : (stryCov_9fa48("18608"), [...first.items, ...second.items])).map(stryMutAct_9fa48("18609") ? () => undefined : (stryCov_9fa48("18609"), item => item.id));
    if (stryMutAct_9fa48("18610")) {
      ;
    } else {
      stryCov_9fa48("18610");
      assert.equal(new Set(ids).size, 28);
    }
    assert.equal(ids.includes(foreign.id), stryMutAct_9fa48("18612") ? true : (stryCov_9fa48("18612"), false));
    if (stryMutAct_9fa48("18613")) {
      ;
    } else {
      stryCov_9fa48("18613");
      assert.ok((await listOwnedPublications(db, alice)).items[0].withdrawnAt);
    }
    assert.equal(JSON.stringify(first).includes(stryMutAct_9fa48("18615") ? "" : (stryCov_9fa48("18615"), 'payload')), stryMutAct_9fa48("18616") ? true : (stryCov_9fa48("18616"), false));
    assert.deepEqual(await listOwnedPublications(db, stryMutAct_9fa48("18618") ? "" : (stryCov_9fa48("18618"), 'unknown-subject')), stryMutAct_9fa48("18619") ? {} : (stryCov_9fa48("18619"), {
      items: stryMutAct_9fa48("18620") ? ["Stryker was here"] : (stryCov_9fa48("18620"), []),
      next: null
    }));
    await assert.rejects(listOwnedPublications(db, alice, stryMutAct_9fa48("18621") ? {} : (stryCov_9fa48("18621"), {
      id: stryMutAct_9fa48("18622") ? "" : (stryCov_9fa48("18622"), 'bad'),
      publishedAt: stryMutAct_9fa48("18623") ? "" : (stryCov_9fa48("18623"), 'yesterday')
    })), stryMutAct_9fa48("18624") ? {} : (stryCov_9fa48("18624"), {
      code: stryMutAct_9fa48("18625") ? "" : (stryCov_9fa48("18625"), 'invalid_request')
    }));
    const query = db.queries.find(stryMutAct_9fa48("18626") ? () => undefined : (stryCov_9fa48("18626"), sql => stryMutAct_9fa48("18629") ? sql.includes('FROM community_publication WHERE account_id=') || sql.includes('ORDER BY') : stryMutAct_9fa48("18628") ? false : stryMutAct_9fa48("18627") ? true : (stryCov_9fa48("18627", "18628", "18629"), sql.includes(stryMutAct_9fa48("18630") ? "" : (stryCov_9fa48("18630"), 'FROM community_publication WHERE account_id=')) && sql.includes(stryMutAct_9fa48("18631") ? "" : (stryCov_9fa48("18631"), 'ORDER BY')))));
    const plan = db.sqlite.prepare(stryMutAct_9fa48("18632") ? `` : (stryCov_9fa48("18632"), `EXPLAIN QUERY PLAN ${query}`)).all(alice);
    assert.ok(stryMutAct_9fa48("18634") ? plan.every(row => row.detail.includes('community_publication_account_published')) : (stryCov_9fa48("18634"), plan.some(stryMutAct_9fa48("18635") ? () => undefined : (stryCov_9fa48("18635"), row => row.detail.includes(stryMutAct_9fa48("18636") ? "" : (stryCov_9fa48("18636"), 'community_publication_account_published'))))));
  }
});
test(stryMutAct_9fa48("18638") ? "" : (stryCov_9fa48("18638"), 'favorites are private, repeatable, paginated and redact withdrawn releases'), async t => {
  if (stryMutAct_9fa48("18639")) {
    {}
  } else {
    stryCov_9fa48("18639");
    const {
      addFavorite,
      removeFavorite,
      listFavorites
    } = await import('../db/favorites.ts');
    const db = database(t);
    await saveProfile(db, alice, profile);
    const saved = await saveBuild(db, alice, save());
    const releases = stryMutAct_9fa48("18640") ? ["Stryker was here"] : (stryCov_9fa48("18640"), []);
    for (let i = 0; stryMutAct_9fa48("18643") ? i >= 27 : stryMutAct_9fa48("18642") ? i <= 27 : stryMutAct_9fa48("18641") ? false : (stryCov_9fa48("18641", "18642", "18643"), i < 27); stryMutAct_9fa48("18644") ? i-- : (stryCov_9fa48("18644"), i++)) {
      if (stryMutAct_9fa48("18645")) {
        {}
      } else {
        stryCov_9fa48("18645");
        const release = await publishBuild(db, alice, stryMutAct_9fa48("18646") ? {} : (stryCov_9fa48("18646"), {
          operationId: stryMutAct_9fa48("18647") ? `` : (stryCov_9fa48("18647"), `favorite-release-${String(i).padStart(3, stryMutAct_9fa48("18648") ? "" : (stryCov_9fa48("18648"), '0'))}`),
          buildId: saved.id,
          title: stryMutAct_9fa48("18649") ? `` : (stryCov_9fa48("18649"), `Public title ${i}`),
          note: stryMutAct_9fa48("18650") ? "Stryker was here!" : (stryCov_9fa48("18650"), ''),
          kind: stryMutAct_9fa48("18651") ? "" : (stryCov_9fa48("18651"), 'build')
        }));
        if (stryMutAct_9fa48("18652")) {
          ;
        } else {
          stryCov_9fa48("18652");
          releases.push(release);
        }
        const first = await addFavorite(db, bob, release.id);
        if (stryMutAct_9fa48("18653")) {
          ;
        } else {
          stryCov_9fa48("18653");
          assert.deepEqual(await addFavorite(db, bob, release.id), first);
        }
      }
    }
    db.sqlite.prepare(stryMutAct_9fa48("18655") ? "" : (stryCov_9fa48("18655"), 'UPDATE community_favorite SET created_at=?')).run(stryMutAct_9fa48("18656") ? "" : (stryCov_9fa48("18656"), '2026-09-06T00:00:00.000Z'));
    const page = await listFavorites(db, bob);
    if (stryMutAct_9fa48("18657")) {
      ;
    } else {
      stryCov_9fa48("18657");
      assert.equal(page.items.length, 25);
    }
    const next = await listFavorites(db, bob, page.next);
    if (stryMutAct_9fa48("18658")) {
      ;
    } else {
      stryCov_9fa48("18658");
      assert.equal(next.items.length, 2);
    }
    if (stryMutAct_9fa48("18659")) {
      ;
    } else {
      stryCov_9fa48("18659");
      assert.equal(next.next, null);
    }
    assert.equal(new Set((stryMutAct_9fa48("18661") ? [] : (stryCov_9fa48("18661"), [...page.items, ...next.items])).map(stryMutAct_9fa48("18662") ? () => undefined : (stryCov_9fa48("18662"), item => item.publicationId))).size, 27);
    assert.deepEqual(await listFavorites(db, alice), stryMutAct_9fa48("18664") ? {} : (stryCov_9fa48("18664"), {
      items: stryMutAct_9fa48("18665") ? ["Stryker was here"] : (stryCov_9fa48("18665"), []),
      next: null
    }));
    const target = page.items[0].publicationId;
    await removeFavorite(db, alice, target);
    if (stryMutAct_9fa48("18666")) {
      ;
    } else {
      stryCov_9fa48("18666");
      assert.equal((await listFavorites(db, bob)).items.length, 25);
    }
    await withdrawPublication(db, alice, target);
    const unavailable = (await listFavorites(db, bob)).items[0];
    assert.deepEqual(unavailable, stryMutAct_9fa48("18668") ? {} : (stryCov_9fa48("18668"), {
      publicationId: target,
      createdAt: stryMutAct_9fa48("18669") ? "" : (stryCov_9fa48("18669"), '2026-09-06T00:00:00.000Z'),
      status: stryMutAct_9fa48("18670") ? "" : (stryCov_9fa48("18670"), 'unavailable')
    }));
    await assert.rejects(addFavorite(db, bob, target), stryMutAct_9fa48("18671") ? {} : (stryCov_9fa48("18671"), {
      code: stryMutAct_9fa48("18672") ? "" : (stryCov_9fa48("18672"), 'publication_not_found')
    }));
    await removeFavorite(db, bob, target);
    await removeFavorite(db, bob, target);
    assert.equal(db.sqlite.prepare(stryMutAct_9fa48("18674") ? "" : (stryCov_9fa48("18674"), 'SELECT COUNT(*) AS n FROM community_favorite')).get().n, 26);
    await assert.rejects(addFavorite(db, bob, saved.id), stryMutAct_9fa48("18675") ? {} : (stryCov_9fa48("18675"), {
      code: stryMutAct_9fa48("18676") ? "" : (stryCov_9fa48("18676"), 'publication_not_found')
    }));
    await assert.rejects(addFavorite(db, bob, stryMutAct_9fa48("18677") ? "" : (stryCov_9fa48("18677"), 'missing')), stryMutAct_9fa48("18678") ? {} : (stryCov_9fa48("18678"), {
      code: stryMutAct_9fa48("18679") ? "" : (stryCov_9fa48("18679"), 'publication_not_found')
    }));
    const result = JSON.stringify(await listFavorites(db, bob));
    for (const secret of stryMutAct_9fa48("18680") ? [] : (stryCov_9fa48("18680"), [stryMutAct_9fa48("18681") ? "" : (stryCov_9fa48("18681"), 'payload'), stryMutAct_9fa48("18682") ? "" : (stryCov_9fa48("18682"), 'subject'), stryMutAct_9fa48("18683") ? "" : (stryCov_9fa48("18683"), 'operationId'), stryMutAct_9fa48("18684") ? "" : (stryCov_9fa48("18684"), 'accountId'), saved.id])) assert.equal(result.includes(secret), stryMutAct_9fa48("18686") ? true : (stryCov_9fa48("18686"), false));
    await assert.rejects(listFavorites(db, bob, stryMutAct_9fa48("18687") ? {} : (stryCov_9fa48("18687"), {
      publicationId: target,
      createdAt: stryMutAct_9fa48("18688") ? "" : (stryCov_9fa48("18688"), '2026-02-30T00:00:00.000Z')
    })), stryMutAct_9fa48("18689") ? {} : (stryCov_9fa48("18689"), {
      code: stryMutAct_9fa48("18690") ? "" : (stryCov_9fa48("18690"), 'invalid_request')
    }));
    const sql = db.queries.find(stryMutAct_9fa48("18691") ? () => undefined : (stryCov_9fa48("18691"), sql => stryMutAct_9fa48("18694") ? sql.includes('CASE WHEN p.withdrawn_at') || !sql.includes('f.created_at<?') : stryMutAct_9fa48("18693") ? false : stryMutAct_9fa48("18692") ? true : (stryCov_9fa48("18692", "18693", "18694"), sql.includes(stryMutAct_9fa48("18695") ? "" : (stryCov_9fa48("18695"), 'CASE WHEN p.withdrawn_at')) && (stryMutAct_9fa48("18696") ? sql.includes('f.created_at<?') : (stryCov_9fa48("18696"), !sql.includes(stryMutAct_9fa48("18697") ? "" : (stryCov_9fa48("18697"), 'f.created_at<?')))))));
    assert.ok(stryMutAct_9fa48("18699") ? db.sqlite.prepare(`EXPLAIN QUERY PLAN ${sql}`).all(bob).every(row => row.detail.includes('community_favorite_account_created')) : (stryCov_9fa48("18699"), db.sqlite.prepare(stryMutAct_9fa48("18700") ? `` : (stryCov_9fa48("18700"), `EXPLAIN QUERY PLAN ${sql}`)).all(bob).some(stryMutAct_9fa48("18701") ? () => undefined : (stryCov_9fa48("18701"), row => row.detail.includes(stryMutAct_9fa48("18702") ? "" : (stryCov_9fa48("18702"), 'community_favorite_account_created'))))));
  }
});
test(stryMutAct_9fa48("18704") ? "" : (stryCov_9fa48("18704"), 'publication evidence rejects malformed JSON values before writing and strips internal fields'), async t => {
  if (stryMutAct_9fa48("18705")) {
    {}
  } else {
    stryCov_9fa48("18705");
    const db = database(t);
    await saveProfile(db, alice, profile);
    const saved = await saveBuild(db, alice, save());
    const evidence = JSON.parse(db.sqlite.prepare(stryMutAct_9fa48("18706") ? "" : (stryCov_9fa48("18706"), 'SELECT evidence FROM community_build WHERE id=?')).get(saved.id).evidence);
    const request = stryMutAct_9fa48("18707") ? {} : (stryCov_9fa48("18707"), {
      operationId: stryMutAct_9fa48("18708") ? "" : (stryCov_9fa48("18708"), 'validated-evidence-release'),
      buildId: saved.id,
      title: stryMutAct_9fa48("18709") ? "" : (stryCov_9fa48("18709"), 'Frozen evidence'),
      note: stryMutAct_9fa48("18710") ? "Stryker was here!" : (stryCov_9fa48("18710"), ''),
      kind: stryMutAct_9fa48("18711") ? "" : (stryCov_9fa48("18711"), 'build')
    });
    const invalid = stryMutAct_9fa48("18712") ? [] : (stryCov_9fa48("18712"), [null, {}, stryMutAct_9fa48("18713") ? {} : (stryCov_9fa48("18713"), {
      ...evidence,
      version: 2
    }), stryMutAct_9fa48("18714") ? {} : (stryCov_9fa48("18714"), {
      ...evidence,
      components: stryMutAct_9fa48("18715") ? ["Stryker was here"] : (stryCov_9fa48("18715"), [])
    }), stryMutAct_9fa48("18716") ? {} : (stryCov_9fa48("18716"), {
      ...evidence,
      accessoryCompatibility: stryMutAct_9fa48("18717") ? {} : (stryCov_9fa48("18717"), {
        extra: stryMutAct_9fa48("18718") ? {} : (stryCov_9fa48("18718"), {
          status: stryMutAct_9fa48("18719") ? "" : (stryCov_9fa48("18719"), 'confirmed'),
          reasons: stryMutAct_9fa48("18720") ? ["Stryker was here"] : (stryCov_9fa48("18720"), []),
          sources: stryMutAct_9fa48("18721") ? ["Stryker was here"] : (stryCov_9fa48("18721"), [])
        })
      })
    }), stryMutAct_9fa48("18722") ? {} : (stryCov_9fa48("18722"), {
      ...evidence,
      sound: stryMutAct_9fa48("18723") ? {} : (stryCov_9fa48("18723"), {
        ...evidence.sound,
        volume: 99
      })
    })]);
    const unsafe = structuredClone(evidence);
    unsafe.sound.recording.source = stryMutAct_9fa48("18724") ? "" : (stryCov_9fa48("18724"), 'javascript:alert(1)');
    if (stryMutAct_9fa48("18725")) {
      ;
    } else {
      stryCov_9fa48("18725");
      invalid.push(unsafe);
    }
    const mismatch = structuredClone(evidence);
    mismatch.components[0].id = stryMutAct_9fa48("18726") ? "" : (stryCov_9fa48("18726"), 'wrong-component');
    if (stryMutAct_9fa48("18727")) {
      ;
    } else {
      stryCov_9fa48("18727");
      invalid.push(mismatch);
    }
    for (const value of invalid) {
      if (stryMutAct_9fa48("18728")) {
        {}
      } else {
        stryCov_9fa48("18728");
        db.sqlite.prepare(stryMutAct_9fa48("18730") ? "" : (stryCov_9fa48("18730"), 'UPDATE community_build SET evidence=? WHERE id=?')).run(JSON.stringify(value), saved.id);
        await assert.rejects(publishBuild(db, alice, request), stryMutAct_9fa48("18731") ? {} : (stryCov_9fa48("18731"), {
          code: stryMutAct_9fa48("18732") ? "" : (stryCov_9fa48("18732"), 'saved_build_unavailable')
        }));
        assert.equal(db.sqlite.prepare(stryMutAct_9fa48("18734") ? "" : (stryCov_9fa48("18734"), 'SELECT COUNT(*) AS n FROM community_publication')).get().n, 0);
      }
    }
    evidence.privateNote = stryMutAct_9fa48("18735") ? "" : (stryCov_9fa48("18735"), 'private-sentinel');
    evidence.components[0].internal = stryMutAct_9fa48("18736") ? "" : (stryCov_9fa48("18736"), 'private-sentinel');
    evidence.compatibility[0].internal = stryMutAct_9fa48("18737") ? "" : (stryCov_9fa48("18737"), 'private-sentinel');
    evidence.sound.internal = stryMutAct_9fa48("18738") ? "" : (stryCov_9fa48("18738"), 'private-sentinel');
    evidence.sound.recording.internal = stryMutAct_9fa48("18739") ? "" : (stryCov_9fa48("18739"), 'private-sentinel');
    db.sqlite.prepare(stryMutAct_9fa48("18741") ? "" : (stryCov_9fa48("18741"), 'UPDATE community_build SET evidence=? WHERE id=?')).run(JSON.stringify(evidence), saved.id);
    const published = await publishBuild(db, alice, request);
    assert.equal(JSON.stringify(published).includes(stryMutAct_9fa48("18743") ? "" : (stryCov_9fa48("18743"), 'private-sentinel')), stryMutAct_9fa48("18744") ? true : (stryCov_9fa48("18744"), false));
    if (stryMutAct_9fa48("18745")) {
      ;
    } else {
      stryCov_9fa48("18745");
      assert.equal(published.evidence.sound.recording.groups, undefined);
    }
    assert.equal(published.evidence.sound.kind, stryMutAct_9fa48("18747") ? "" : (stryCov_9fa48("18747"), 'recorded'));
    if (stryMutAct_9fa48("18748")) {
      ;
    } else {
      stryCov_9fa48("18748");
      assert.equal(published.evidence.compatibility[0].detail, evidence.compatibility[0].detail);
    }
    db.sqlite.prepare(stryMutAct_9fa48("18750") ? "" : (stryCov_9fa48("18750"), 'UPDATE community_build SET evidence=? WHERE id=?')).run(stryMutAct_9fa48("18751") ? "" : (stryCov_9fa48("18751"), 'null'), saved.id);
    await assert.rejects(readPublicPublication(db, published.id), stryMutAct_9fa48("18752") ? {} : (stryCov_9fa48("18752"), {
      code: stryMutAct_9fa48("18753") ? "" : (stryCov_9fa48("18753"), 'saved_build_unavailable')
    }));
    if (stryMutAct_9fa48("18754")) {
      ;
    } else {
      stryCov_9fa48("18754");
      assert.ok((await withdrawPublication(db, alice, published.id)).withdrawnAt);
    }
  }
});
test(stryMutAct_9fa48("18756") ? "" : (stryCov_9fa48("18756"), 'published snapshots preserve retired component, accessory and recording evidence without enabling editor restoration'), async t => {
  if (stryMutAct_9fa48("18757")) {
    {}
  } else {
    stryCov_9fa48("18757");
    const {
      catalog
    } = await import('../lib/catalog.ts');
    const {
      soundPacks
    } = await import('../lib/sound-packs.ts');
    const {
      parseBuild
    } = await import('../lib/build.ts');
    const db = database(t);
    await saveProfile(db, alice, profile);
    const accessory = accessoryCatalog.find(stryMutAct_9fa48("18758") ? () => undefined : (stryCov_9fa48("18758"), item => stryMutAct_9fa48("18761") ? item.kind !== 'macropad' : stryMutAct_9fa48("18760") ? false : stryMutAct_9fa48("18759") ? true : (stryCov_9fa48("18759", "18760", "18761"), item.kind === (stryMutAct_9fa48("18762") ? "" : (stryCov_9fa48("18762"), 'macropad')))));
    const saved = await saveBuild(db, alice, save(stryMutAct_9fa48("18763") ? {} : (stryCov_9fa48("18763"), {
      ...defaultBuild,
      accessories: stryMutAct_9fa48("18764") ? [] : (stryCov_9fa48("18764"), [stryMutAct_9fa48("18765") ? {} : (stryCov_9fa48("18765"), {
        id: stryMutAct_9fa48("18766") ? "" : (stryCov_9fa48("18766"), 'historical-accessory'),
        productId: accessory.id,
        quantity: 1,
        location: stryMutAct_9fa48("18767") ? {} : (stryCov_9fa48("18767"), {
          kind: stryMutAct_9fa48("18768") ? "" : (stryCov_9fa48("18768"), 'external'),
          position: stryMutAct_9fa48("18769") ? "" : (stryCov_9fa48("18769"), 'right')
        })
      })])
    })));
    const request = stryMutAct_9fa48("18770") ? {} : (stryCov_9fa48("18770"), {
      operationId: stryMutAct_9fa48("18771") ? "" : (stryCov_9fa48("18771"), 'historical-evidence-release'),
      buildId: saved.id,
      title: stryMutAct_9fa48("18772") ? "" : (stryCov_9fa48("18772"), 'Historical build'),
      note: stryMutAct_9fa48("18773") ? "Stryker was here!" : (stryCov_9fa48("18773"), ''),
      kind: stryMutAct_9fa48("18774") ? "" : (stryCov_9fa48("18774"), 'build')
    });
    const release = await publishBuild(db, alice, request);
    assert.equal(release.customization, stryMutAct_9fa48("18776") ? "" : (stryCov_9fa48("18776"), 'available'));
    const {
      parseBuildSnapshot
    } = await import('../lib/build.ts');
    assert.throws(stryMutAct_9fa48("18778") ? () => undefined : (stryCov_9fa48("18778"), () => parseBuildSnapshot(stryMutAct_9fa48("18779") ? {} : (stryCov_9fa48("18779"), {
      ...saved.build,
      customParts: stryMutAct_9fa48("18780") ? ["Stryker was here"] : (stryCov_9fa48("18780"), []),
      selection: stryMutAct_9fa48("18781") ? {} : (stryCov_9fa48("18781"), {
        ...saved.build.selection,
        switch: stryMutAct_9fa48("18782") ? "" : (stryCov_9fa48("18782"), 'import:missing')
      })
    }))));
    const removals = stryMutAct_9fa48("18783") ? [] : (stryCov_9fa48("18783"), [stryMutAct_9fa48("18784") ? [] : (stryCov_9fa48("18784"), [catalog, saved.build.selection.case]), stryMutAct_9fa48("18785") ? [] : (stryCov_9fa48("18785"), [accessoryCatalog, accessory.id]), stryMutAct_9fa48("18786") ? [] : (stryCov_9fa48("18786"), [soundPacks, saved.build.audio.source])]);
    for (const [list, id] of removals) {
      if (stryMutAct_9fa48("18787")) {
        {}
      } else {
        stryCov_9fa48("18787");
        const index = list.findIndex(stryMutAct_9fa48("18788") ? () => undefined : (stryCov_9fa48("18788"), item => stryMutAct_9fa48("18791") ? item.id !== id : stryMutAct_9fa48("18790") ? false : stryMutAct_9fa48("18789") ? true : (stryCov_9fa48("18789", "18790", "18791"), item.id === id)));
        assert.ok(stryMutAct_9fa48("18796") ? index < 0 : stryMutAct_9fa48("18795") ? index > 0 : stryMutAct_9fa48("18794") ? false : stryMutAct_9fa48("18793") ? true : (stryCov_9fa48("18793", "18794", "18795", "18796"), index >= 0));
        const [removed] = list.splice(index, 1);
        try {
          if (stryMutAct_9fa48("18797")) {
            {}
          } else {
            stryCov_9fa48("18797");
            const singleRetirement = await readPublicPublication(db, release.id);
            assert.equal(singleRetirement.customization, stryMutAct_9fa48("18799") ? "" : (stryCov_9fa48("18799"), 'unavailable'));
            if (stryMutAct_9fa48("18800")) {
              ;
            } else {
              stryCov_9fa48("18800");
              assert.deepEqual(singleRetirement.evidence, release.evidence);
            }
            assert.throws(stryMutAct_9fa48("18802") ? () => undefined : (stryCov_9fa48("18802"), () => parseBuild(singleRetirement.build)));
          }
        } finally {
          if (stryMutAct_9fa48("18803")) {
            {}
          } else {
            stryCov_9fa48("18803");
            if (stryMutAct_9fa48("18804")) {
              ;
            } else {
              stryCov_9fa48("18804");
              list.splice(index, 0, removed);
            }
          }
        }
      }
    }
    for (const [list, id] of removals) {
      if (stryMutAct_9fa48("18805")) {
        {}
      } else {
        stryCov_9fa48("18805");
        const index = list.findIndex(stryMutAct_9fa48("18806") ? () => undefined : (stryCov_9fa48("18806"), item => stryMutAct_9fa48("18809") ? item.id !== id : stryMutAct_9fa48("18808") ? false : stryMutAct_9fa48("18807") ? true : (stryCov_9fa48("18807", "18808", "18809"), item.id === id)));
        const [removed] = list.splice(index, 1);
        t.after(stryMutAct_9fa48("18811") ? () => undefined : (stryCov_9fa48("18811"), () => list.splice(index, 0, removed)));
      }
    }
    const historical = await readPublicPublication(db, release.id);
    assert.equal(historical.customization, stryMutAct_9fa48("18813") ? "" : (stryCov_9fa48("18813"), 'unavailable'));
    if (stryMutAct_9fa48("18814")) {
      ;
    } else {
      stryCov_9fa48("18814");
      assert.deepEqual(historical.build, release.build);
    }
    if (stryMutAct_9fa48("18815")) {
      ;
    } else {
      stryCov_9fa48("18815");
      assert.deepEqual(historical.evidence, release.evidence);
    }
    const discovery = await listPublicPublications(db, stryMutAct_9fa48("18816") ? {} : (stryCov_9fa48("18816"), {
      query: stryMutAct_9fa48("18817") ? "Stryker was here!" : (stryCov_9fa48("18817"), ''),
      kind: stryMutAct_9fa48("18818") ? "" : (stryCov_9fa48("18818"), 'all'),
      cursor: null
    }));
    assert.deepEqual(discovery.items[0].thumbnail, stryMutAct_9fa48("18820") ? {} : (stryCov_9fa48("18820"), {
      geometry: stryMutAct_9fa48("18821") ? "" : (stryCov_9fa48("18821"), 'generic-60'),
      caseColor: saved.build.caseColor,
      colors: stryMutAct_9fa48("18822") ? {} : (stryCov_9fa48("18822"), {
        alpha: saved.build.palette.alpha,
        mod: saved.build.palette.mod,
        accent: saved.build.palette.accent,
        space: saved.build.palette.space
      })
    }));
    assert.throws(stryMutAct_9fa48("18824") ? () => undefined : (stryCov_9fa48("18824"), () => parseBuild(historical.build)));
    if (stryMutAct_9fa48("18825")) {
      ;
    } else {
      stryCov_9fa48("18825");
      assert.deepEqual(await publishBuild(db, alice, request), historical);
    }
    await assert.rejects(publishBuild(db, alice, stryMutAct_9fa48("18826") ? {} : (stryCov_9fa48("18826"), {
      ...request,
      operationId: stryMutAct_9fa48("18827") ? "" : (stryCov_9fa48("18827"), 'new-retired-evidence-release')
    })), stryMutAct_9fa48("18828") ? {} : (stryCov_9fa48("18828"), {
      code: stryMutAct_9fa48("18829") ? "" : (stryCov_9fa48("18829"), 'saved_build_unavailable')
    }));
    if (stryMutAct_9fa48("18830")) {
      ;
    } else {
      stryCov_9fa48("18830");
      assert.ok((await withdrawPublication(db, alice, release.id)).withdrawnAt);
    }
  }
});
test(stryMutAct_9fa48("18832") ? "" : (stryCov_9fa48("18832"), 'proposal links freeze chosen identity and snapshots, store only token hashes, and close without leaking private fields'), async t => {
  if (stryMutAct_9fa48("18833")) {
    {}
  } else {
    stryCov_9fa48("18833");
    const db = database(t);
    await saveProfile(db, alice, profile);
    const saved = await saveBuild(db, alice, save(stryMutAct_9fa48("18834") ? {} : (stryCov_9fa48("18834"), {
      ...defaultBuild,
      name: stryMutAct_9fa48("18835") ? "" : (stryCov_9fa48("18835"), 'Private commission notes')
    })));
    const request = stryMutAct_9fa48("18836") ? {} : (stryCov_9fa48("18836"), {
      operationId: stryMutAct_9fa48("18837") ? "" : (stryCov_9fa48("18837"), 'proposal-operation-0001'),
      buildId: saved.id,
      title: stryMutAct_9fa48("18838") ? "" : (stryCov_9fa48("18838"), 'Client preview'),
      brief: stryMutAct_9fa48("18839") ? "" : (stryCov_9fa48("18839"), 'Review the colors.')
    });
    const created = await createProposal(db, alice, request);
    assert.match(created.token, stryMutAct_9fa48("18844") ? /^[^a-f0-9]{64}$/ : stryMutAct_9fa48("18843") ? /^[a-f0-9]$/ : stryMutAct_9fa48("18842") ? /^[a-f0-9]{64}/ : stryMutAct_9fa48("18841") ? /[a-f0-9]{64}$/ : (stryCov_9fa48("18841", "18842", "18843", "18844"), /^[a-f0-9]{64}$/));
    const stored = db.sqlite.prepare(stryMutAct_9fa48("18845") ? "" : (stryCov_9fa48("18845"), 'SELECT * FROM community_proposal')).get();
    assert.equal(JSON.stringify(stored).includes(created.token), stryMutAct_9fa48("18847") ? true : (stryCov_9fa48("18847"), false));
    const preview = await readProposalPreview(db, created.token);
    if (stryMutAct_9fa48("18848")) {
      ;
    } else {
      stryCov_9fa48("18848");
      assert.equal(preview.build.name, request.title);
    }
    if (stryMutAct_9fa48("18849")) {
      ;
    } else {
      stryCov_9fa48("18849");
      assert.equal(preview.author.displayName, profile.displayName);
    }
    assert.equal(preview.customization, stryMutAct_9fa48("18851") ? "" : (stryCov_9fa48("18851"), 'available'));
    assert.deepEqual(parseProposalPreview(stryMutAct_9fa48("18853") ? {} : (stryCov_9fa48("18853"), {
      ...preview,
      token: created.token,
      subject: alice,
      customization: stryMutAct_9fa48("18854") ? "" : (stryCov_9fa48("18854"), 'forged')
    })), preview);
    for (const corrupt of stryMutAct_9fa48("18855") ? [] : (stryCov_9fa48("18855"), [stryMutAct_9fa48("18856") ? {} : (stryCov_9fa48("18856"), {
      ...preview,
      createdAt: stryMutAct_9fa48("18857") ? "" : (stryCov_9fa48("18857"), 'yesterday')
    }), stryMutAct_9fa48("18858") ? {} : (stryCov_9fa48("18858"), {
      ...preview,
      title: stryMutAct_9fa48("18859") ? "" : (stryCov_9fa48("18859"), 'Hidden\nline')
    }), stryMutAct_9fa48("18860") ? {} : (stryCov_9fa48("18860"), {
      ...preview,
      brief: (stryMutAct_9fa48("18861") ? "" : (stryCov_9fa48("18861"), 'x')).repeat(2001)
    }), stryMutAct_9fa48("18862") ? {} : (stryCov_9fa48("18862"), {
      ...preview,
      build: {}
    }), stryMutAct_9fa48("18863") ? {} : (stryCov_9fa48("18863"), {
      ...preview,
      evidence: {}
    }), stryMutAct_9fa48("18864") ? {} : (stryCov_9fa48("18864"), {
      ...preview,
      author: stryMutAct_9fa48("18865") ? {} : (stryCov_9fa48("18865"), {
        ...preview.author,
        links: stryMutAct_9fa48("18866") ? [] : (stryCov_9fa48("18866"), [stryMutAct_9fa48("18867") ? {} : (stryCov_9fa48("18867"), {
          label: stryMutAct_9fa48("18868") ? "" : (stryCov_9fa48("18868"), 'Bad'),
          url: stryMutAct_9fa48("18869") ? "" : (stryCov_9fa48("18869"), 'javascript:alert(1)')
        })])
      })
    })])) assert.throws(stryMutAct_9fa48("18871") ? () => undefined : (stryCov_9fa48("18871"), () => parseProposalPreview(corrupt)));
    assert.equal(JSON.stringify(preview).includes(stryMutAct_9fa48("18873") ? "" : (stryCov_9fa48("18873"), 'Private commission notes')), stryMutAct_9fa48("18874") ? true : (stryCov_9fa48("18874"), false));
    assert.equal(JSON.stringify(preview).includes(alice), stryMutAct_9fa48("18876") ? true : (stryCov_9fa48("18876"), false));
    assert.equal(JSON.stringify(preview).includes(stored.token_digest), stryMutAct_9fa48("18878") ? true : (stryCov_9fa48("18878"), false));
    await saveProfile(db, alice, stryMutAct_9fa48("18879") ? {} : (stryCov_9fa48("18879"), {
      ...profile,
      displayName: stryMutAct_9fa48("18880") ? "" : (stryCov_9fa48("18880"), 'Later name')
    }));
    await saveBuild(db, alice, save(stryMutAct_9fa48("18881") ? {} : (stryCov_9fa48("18881"), {
      ...defaultBuild,
      layout: stryMutAct_9fa48("18882") ? "" : (stryCov_9fa48("18882"), '75')
    }), stryMutAct_9fa48("18883") ? "" : (stryCov_9fa48("18883"), 'operation-new-private-copy')));
    if (stryMutAct_9fa48("18884")) {
      ;
    } else {
      stryCov_9fa48("18884");
      assert.deepEqual(await readProposalPreview(db, created.token), preview);
    }
    assert.deepEqual(await createProposal(db, alice, request), stryMutAct_9fa48("18886") ? {} : (stryCov_9fa48("18886"), {
      id: created.id,
      closedAt: null,
      token: null
    }));
    await assert.rejects(createProposal(db, alice, stryMutAct_9fa48("18887") ? {} : (stryCov_9fa48("18887"), {
      ...request,
      brief: stryMutAct_9fa48("18888") ? "" : (stryCov_9fa48("18888"), 'Changed request')
    })), stryMutAct_9fa48("18889") ? {} : (stryCov_9fa48("18889"), {
      code: stryMutAct_9fa48("18890") ? "" : (stryCov_9fa48("18890"), 'operation_conflict')
    }));
    await assert.rejects(createProposal(db, bob, request), stryMutAct_9fa48("18891") ? {} : (stryCov_9fa48("18891"), {
      code: stryMutAct_9fa48("18892") ? "" : (stryCov_9fa48("18892"), 'build_not_found')
    }));
    await assert.rejects(closeProposal(db, bob, created.id), stryMutAct_9fa48("18893") ? {} : (stryCov_9fa48("18893"), {
      code: stryMutAct_9fa48("18894") ? "" : (stryCov_9fa48("18894"), 'proposal_not_found')
    }));
    for (const token of stryMutAct_9fa48("18895") ? [] : (stryCov_9fa48("18895"), [stryMutAct_9fa48("18896") ? "" : (stryCov_9fa48("18896"), 'bad'), (stryMutAct_9fa48("18897") ? "" : (stryCov_9fa48("18897"), '0')).repeat(64), stryMutAct_9fa48("18898") ? created.token.toLowerCase() : (stryCov_9fa48("18898"), created.token.toUpperCase()), stryMutAct_9fa48("18899") ? `` : (stryCov_9fa48("18899"), ` ${created.token}`)])) await assert.rejects(readProposalPreview(db, token), stryMutAct_9fa48("18900") ? {} : (stryCov_9fa48("18900"), {
      code: stryMutAct_9fa48("18901") ? "" : (stryCov_9fa48("18901"), 'proposal_not_found')
    }));
    const closed = await closeProposal(db, alice, created.id);
    if (stryMutAct_9fa48("18902")) {
      ;
    } else {
      stryCov_9fa48("18902");
      assert.ok(closed.closedAt);
    }
    if (stryMutAct_9fa48("18903")) {
      ;
    } else {
      stryCov_9fa48("18903");
      assert.deepEqual(await closeProposal(db, alice, created.id), closed);
    }
    await assert.rejects(readProposalPreview(db, created.token), stryMutAct_9fa48("18904") ? {} : (stryCov_9fa48("18904"), {
      code: stryMutAct_9fa48("18905") ? "" : (stryCov_9fa48("18905"), 'proposal_not_found')
    }));
    assert.deepEqual(await createProposal(db, alice, request), stryMutAct_9fa48("18907") ? {} : (stryCov_9fa48("18907"), {
      ...closed,
      token: null
    }));
  }
});
test(stryMutAct_9fa48("18909") ? "" : (stryCov_9fa48("18909"), 'concurrent proposal creation returns only the winning token and one row'), async t => {
  if (stryMutAct_9fa48("18910")) {
    {}
  } else {
    stryCov_9fa48("18910");
    const db = database(t);
    await saveProfile(db, alice, profile);
    const saved = await saveBuild(db, alice, save());
    const request = stryMutAct_9fa48("18911") ? {} : (stryCov_9fa48("18911"), {
      operationId: stryMutAct_9fa48("18912") ? "" : (stryCov_9fa48("18912"), 'proposal-concurrent-0001'),
      buildId: saved.id,
      title: stryMutAct_9fa48("18913") ? "" : (stryCov_9fa48("18913"), 'Client preview'),
      brief: stryMutAct_9fa48("18914") ? "Stryker was here!" : (stryCov_9fa48("18914"), '')
    });
    const results = await Promise.all(stryMutAct_9fa48("18915") ? [] : (stryCov_9fa48("18915"), [createProposal(db, alice, request), createProposal(db, alice, request)]));
    assert.equal(new Set(results.map(stryMutAct_9fa48("18917") ? () => undefined : (stryCov_9fa48("18917"), result => result.id))).size, 1);
    assert.equal(stryMutAct_9fa48("18919") ? results.length : (stryCov_9fa48("18919"), results.filter(stryMutAct_9fa48("18920") ? () => undefined : (stryCov_9fa48("18920"), result => stryMutAct_9fa48("18923") ? result.token === null : stryMutAct_9fa48("18922") ? false : stryMutAct_9fa48("18921") ? true : (stryCov_9fa48("18921", "18922", "18923"), result.token !== null))).length), 1);
    const winner = results.find(stryMutAct_9fa48("18924") ? () => undefined : (stryCov_9fa48("18924"), result => stryMutAct_9fa48("18927") ? result.token === null : stryMutAct_9fa48("18926") ? false : stryMutAct_9fa48("18925") ? true : (stryCov_9fa48("18925", "18926", "18927"), result.token !== null)));
    if (stryMutAct_9fa48("18928")) {
      ;
    } else {
      stryCov_9fa48("18928");
      assert.equal((await readProposalPreview(db, winner.token)).id, winner.id);
    }
    assert.equal(db.sqlite.prepare(stryMutAct_9fa48("18930") ? "" : (stryCov_9fa48("18930"), 'SELECT COUNT(*) AS count FROM community_proposal')).get().count, 1);
  }
});
test(stryMutAct_9fa48("18932") ? "" : (stryCov_9fa48("18932"), 'proposal creation rejects damaged snapshots and closure survives later damage'), async t => {
  if (stryMutAct_9fa48("18933")) {
    {}
  } else {
    stryCov_9fa48("18933");
    const db = database(t);
    await saveProfile(db, alice, profile);
    const saved = await saveBuild(db, alice, save());
    const request = stryMutAct_9fa48("18934") ? {} : (stryCov_9fa48("18934"), {
      operationId: stryMutAct_9fa48("18935") ? "" : (stryCov_9fa48("18935"), 'proposal-damage-0001'),
      buildId: saved.id,
      title: stryMutAct_9fa48("18936") ? "" : (stryCov_9fa48("18936"), 'Client preview'),
      brief: stryMutAct_9fa48("18937") ? "Stryker was here!" : (stryCov_9fa48("18937"), '')
    });
    const original = db.sqlite.prepare(stryMutAct_9fa48("18938") ? "" : (stryCov_9fa48("18938"), 'SELECT evidence FROM community_build WHERE id=?')).get(saved.id).evidence;
    db.sqlite.prepare(stryMutAct_9fa48("18940") ? "" : (stryCov_9fa48("18940"), 'UPDATE community_build SET evidence=? WHERE id=?')).run(stryMutAct_9fa48("18941") ? "" : (stryCov_9fa48("18941"), 'null'), saved.id);
    await assert.rejects(createProposal(db, alice, request), stryMutAct_9fa48("18942") ? {} : (stryCov_9fa48("18942"), {
      code: stryMutAct_9fa48("18943") ? "" : (stryCov_9fa48("18943"), 'saved_build_unavailable')
    }));
    assert.equal(db.sqlite.prepare(stryMutAct_9fa48("18945") ? "" : (stryCov_9fa48("18945"), 'SELECT COUNT(*) AS count FROM community_proposal')).get().count, 0);
    db.sqlite.prepare(stryMutAct_9fa48("18947") ? "" : (stryCov_9fa48("18947"), 'UPDATE community_build SET evidence=? WHERE id=?')).run(original, saved.id);
    const created = await createProposal(db, alice, request);
    db.sqlite.prepare(stryMutAct_9fa48("18949") ? "" : (stryCov_9fa48("18949"), 'UPDATE community_build SET payload=? WHERE id=?')).run(stryMutAct_9fa48("18950") ? "" : (stryCov_9fa48("18950"), '{}'), saved.id);
    await assert.rejects(readProposalPreview(db, created.token), stryMutAct_9fa48("18951") ? {} : (stryCov_9fa48("18951"), {
      code: stryMutAct_9fa48("18952") ? "" : (stryCov_9fa48("18952"), 'saved_build_unavailable')
    }));
    const closed = await closeProposal(db, alice, created.id);
    if (stryMutAct_9fa48("18953")) {
      ;
    } else {
      stryCov_9fa48("18953");
      assert.ok(closed.closedAt);
    }
    assert.deepEqual(await createProposal(db, alice, request), stryMutAct_9fa48("18955") ? {} : (stryCov_9fa48("18955"), {
      ...closed,
      token: null
    }));
  }
});
test(stryMutAct_9fa48("18957") ? "" : (stryCov_9fa48("18957"), 'proposal boundary requires chosen creator identity and bounded plain text'), async t => {
  if (stryMutAct_9fa48("18958")) {
    {}
  } else {
    stryCov_9fa48("18958");
    const db = database(t);
    const saved = await saveBuild(db, alice, save());
    const request = stryMutAct_9fa48("18959") ? {} : (stryCov_9fa48("18959"), {
      operationId: stryMutAct_9fa48("18960") ? "" : (stryCov_9fa48("18960"), 'proposal-profile-0001'),
      buildId: saved.id,
      title: stryMutAct_9fa48("18961") ? "" : (stryCov_9fa48("18961"), 'Client preview'),
      brief: stryMutAct_9fa48("18962") ? "Stryker was here!" : (stryCov_9fa48("18962"), '')
    });
    await assert.rejects(createProposal(db, alice, request), stryMutAct_9fa48("18963") ? {} : (stryCov_9fa48("18963"), {
      code: stryMutAct_9fa48("18964") ? "" : (stryCov_9fa48("18964"), 'profile_required')
    }));
    for (const value of stryMutAct_9fa48("18965") ? [] : (stryCov_9fa48("18965"), [null, stryMutAct_9fa48("18966") ? {} : (stryCov_9fa48("18966"), {
      ...request,
      title: stryMutAct_9fa48("18967") ? "Stryker was here!" : (stryCov_9fa48("18967"), '')
    }), stryMutAct_9fa48("18968") ? {} : (stryCov_9fa48("18968"), {
      ...request,
      title: (stryMutAct_9fa48("18969") ? "" : (stryCov_9fa48("18969"), 'x')).repeat(81)
    }), stryMutAct_9fa48("18970") ? {} : (stryCov_9fa48("18970"), {
      ...request,
      brief: (stryMutAct_9fa48("18971") ? "" : (stryCov_9fa48("18971"), 'x')).repeat(2001)
    }), stryMutAct_9fa48("18972") ? {} : (stryCov_9fa48("18972"), {
      ...request,
      brief: stryMutAct_9fa48("18973") ? "" : (stryCov_9fa48("18973"), 'bad\u0000')
    }), stryMutAct_9fa48("18974") ? {} : (stryCov_9fa48("18974"), {
      ...request,
      operationId: stryMutAct_9fa48("18975") ? "" : (stryCov_9fa48("18975"), 'bad')
    })])) assert.throws(stryMutAct_9fa48("18977") ? () => undefined : (stryCov_9fa48("18977"), () => parseProposalRequest(value)), stryMutAct_9fa48("18978") ? {} : (stryCov_9fa48("18978"), {
      code: stryMutAct_9fa48("18979") ? "" : (stryCov_9fa48("18979"), 'invalid_request')
    }));
    assert.equal(parseProposalRequest(stryMutAct_9fa48("18981") ? {} : (stryCov_9fa48("18981"), {
      ...request,
      brief: stryMutAct_9fa48("18982") ? "" : (stryCov_9fa48("18982"), ' line 1\r\nline 2 ')
    })).brief, stryMutAct_9fa48("18983") ? "" : (stryCov_9fa48("18983"), 'line 1\nline 2'));
    assert.equal(db.sqlite.prepare(stryMutAct_9fa48("18985") ? "" : (stryCov_9fa48("18985"), 'SELECT COUNT(*) AS count FROM community_proposal')).get().count, 0);
  }
});
test(stryMutAct_9fa48("18987") ? "" : (stryCov_9fa48("18987"), 'conflicting concurrent proposals preserve one winner and retired catalog parts preserve its preview'), async t => {
  if (stryMutAct_9fa48("18988")) {
    {}
  } else {
    stryCov_9fa48("18988");
    const db = database(t);
    await saveProfile(db, alice, profile);
    const saved = await saveBuild(db, alice, save());
    const request = stryMutAct_9fa48("18989") ? {} : (stryCov_9fa48("18989"), {
      operationId: stryMutAct_9fa48("18990") ? "" : (stryCov_9fa48("18990"), 'proposal-conflict-0001'),
      buildId: saved.id,
      title: stryMutAct_9fa48("18991") ? "" : (stryCov_9fa48("18991"), 'First title'),
      brief: stryMutAct_9fa48("18992") ? "Stryker was here!" : (stryCov_9fa48("18992"), '')
    });
    const results = await Promise.allSettled(stryMutAct_9fa48("18993") ? [] : (stryCov_9fa48("18993"), [createProposal(db, alice, request), createProposal(db, alice, stryMutAct_9fa48("18994") ? {} : (stryCov_9fa48("18994"), {
      ...request,
      title: stryMutAct_9fa48("18995") ? "" : (stryCov_9fa48("18995"), 'Second title')
    }))]));
    const success = results.find(stryMutAct_9fa48("18996") ? () => undefined : (stryCov_9fa48("18996"), item => stryMutAct_9fa48("18999") ? item.status !== 'fulfilled' : stryMutAct_9fa48("18998") ? false : stryMutAct_9fa48("18997") ? true : (stryCov_9fa48("18997", "18998", "18999"), item.status === (stryMutAct_9fa48("19000") ? "" : (stryCov_9fa48("19000"), 'fulfilled')))));
    const failure = results.find(stryMutAct_9fa48("19001") ? () => undefined : (stryCov_9fa48("19001"), item => stryMutAct_9fa48("19004") ? item.status !== 'rejected' : stryMutAct_9fa48("19003") ? false : stryMutAct_9fa48("19002") ? true : (stryCov_9fa48("19002", "19003", "19004"), item.status === (stryMutAct_9fa48("19005") ? "" : (stryCov_9fa48("19005"), 'rejected')))));
    assert.equal(failure.reason.code, stryMutAct_9fa48("19007") ? "" : (stryCov_9fa48("19007"), 'operation_conflict'));
    const created = success.value;
    const preview = await readProposalPreview(db, created.token);
    const winningRequest = stryMutAct_9fa48("19008") ? {} : (stryCov_9fa48("19008"), {
      ...request,
      title: preview.title
    });
    const {
      catalog
    } = await import('../lib/catalog.ts');
    const index = catalog.findIndex(stryMutAct_9fa48("19009") ? () => undefined : (stryCov_9fa48("19009"), part => stryMutAct_9fa48("19012") ? part.id !== saved.build.selection.case : stryMutAct_9fa48("19011") ? false : stryMutAct_9fa48("19010") ? true : (stryCov_9fa48("19010", "19011", "19012"), part.id === saved.build.selection.case)));
    assert.ok(stryMutAct_9fa48("19017") ? index < 0 : stryMutAct_9fa48("19016") ? index > 0 : stryMutAct_9fa48("19015") ? false : stryMutAct_9fa48("19014") ? true : (stryCov_9fa48("19014", "19015", "19016", "19017"), index >= 0));
    const [removed] = catalog.splice(index, 1);
    try {
      if (stryMutAct_9fa48("19018")) {
        {}
      } else {
        stryCov_9fa48("19018");
        assert.deepEqual(await readProposalPreview(db, created.token), stryMutAct_9fa48("19020") ? {} : (stryCov_9fa48("19020"), {
          ...preview,
          customization: stryMutAct_9fa48("19021") ? "" : (stryCov_9fa48("19021"), 'unavailable')
        }));
        assert.deepEqual(await createProposal(db, alice, winningRequest), stryMutAct_9fa48("19023") ? {} : (stryCov_9fa48("19023"), {
          id: created.id,
          closedAt: null,
          token: null
        }));
        await assert.rejects(createProposal(db, alice, stryMutAct_9fa48("19024") ? {} : (stryCov_9fa48("19024"), {
          ...winningRequest,
          operationId: stryMutAct_9fa48("19025") ? "" : (stryCov_9fa48("19025"), 'proposal-retired-new-0001')
        })), stryMutAct_9fa48("19026") ? {} : (stryCov_9fa48("19026"), {
          code: stryMutAct_9fa48("19027") ? "" : (stryCov_9fa48("19027"), 'saved_build_unavailable')
        }));
      }
    } finally {
      if (stryMutAct_9fa48("19028")) {
        {}
      } else {
        stryCov_9fa48("19028");
        if (stryMutAct_9fa48("19029")) {
          ;
        } else {
          stryCov_9fa48("19029");
          catalog.splice(index, 0, removed);
        }
      }
    }
    assert.equal(db.sqlite.prepare(stryMutAct_9fa48("19031") ? "" : (stryCov_9fa48("19031"), 'SELECT COUNT(*) AS count FROM community_proposal')).get().count, 1);
    const tokenQuery = db.queries.find(stryMutAct_9fa48("19032") ? () => undefined : (stryCov_9fa48("19032"), query => query.includes(stryMutAct_9fa48("19033") ? "" : (stryCov_9fa48("19033"), 'WHERE p.token_digest=?'))));
    const plan = db.sqlite.prepare(stryMutAct_9fa48("19034") ? `` : (stryCov_9fa48("19034"), `EXPLAIN QUERY PLAN ${tokenQuery}`)).all((stryMutAct_9fa48("19035") ? "" : (stryCov_9fa48("19035"), '0')).repeat(64));
    assert.ok(stryMutAct_9fa48("19037") ? plan.every(row => row.detail.includes('community_proposal_token_digest_unique')) : (stryCov_9fa48("19037"), plan.some(stryMutAct_9fa48("19038") ? () => undefined : (stryCov_9fa48("19038"), row => row.detail.includes(stryMutAct_9fa48("19039") ? "" : (stryCov_9fa48("19039"), 'community_proposal_token_digest_unique'))))));
  }
});
test(stryMutAct_9fa48("19041") ? "" : (stryCov_9fa48("19041"), 'owner proposal pages retain closed items and traverse timestamp ties without reading private payloads or tokens'), async t => {
  if (stryMutAct_9fa48("19042")) {
    {}
  } else {
    stryCov_9fa48("19042");
    const db = database(t);
    await saveProfile(db, alice, profile);
    const saved = await saveBuild(db, alice, save());
    const created = stryMutAct_9fa48("19043") ? ["Stryker was here"] : (stryCov_9fa48("19043"), []);
    for (let i = 0; stryMutAct_9fa48("19046") ? i >= 28 : stryMutAct_9fa48("19045") ? i <= 28 : stryMutAct_9fa48("19044") ? false : (stryCov_9fa48("19044", "19045", "19046"), i < 28); stryMutAct_9fa48("19047") ? i-- : (stryCov_9fa48("19047"), i++)) created.push(await createProposal(db, alice, stryMutAct_9fa48("19049") ? {} : (stryCov_9fa48("19049"), {
      operationId: stryMutAct_9fa48("19050") ? `` : (stryCov_9fa48("19050"), `proposal-list-operation-${i}`),
      buildId: saved.id,
      title: stryMutAct_9fa48("19051") ? `` : (stryCov_9fa48("19051"), `Proposal ${i}`),
      brief: stryMutAct_9fa48("19052") ? "" : (stryCov_9fa48("19052"), 'Client-only brief.')
    })));
    db.sqlite.prepare(stryMutAct_9fa48("19054") ? "" : (stryCov_9fa48("19054"), 'UPDATE community_proposal SET created_at=?')).run(stryMutAct_9fa48("19055") ? "" : (stryCov_9fa48("19055"), '2026-09-01T00:00:00.000Z'));
    const closed = await closeProposal(db, alice, created[0].id);
    db.sqlite.prepare(stryMutAct_9fa48("19057") ? "" : (stryCov_9fa48("19057"), 'UPDATE community_build SET payload=? WHERE id=?')).run(stryMutAct_9fa48("19058") ? "" : (stryCov_9fa48("19058"), '{}'), saved.id);
    const first = await listOwnedProposals(db, alice);
    if (stryMutAct_9fa48("19059")) {
      ;
    } else {
      stryCov_9fa48("19059");
      assert.equal(first.items.length, 25);
    }
    if (stryMutAct_9fa48("19060")) {
      ;
    } else {
      stryCov_9fa48("19060");
      assert.ok(first.next);
    }
    const second = await listOwnedProposals(db, alice, first.next);
    if (stryMutAct_9fa48("19061")) {
      ;
    } else {
      stryCov_9fa48("19061");
      assert.equal(second.items.length, 3);
    }
    if (stryMutAct_9fa48("19062")) {
      ;
    } else {
      stryCov_9fa48("19062");
      assert.equal(second.next, null);
    }
    const all = stryMutAct_9fa48("19063") ? [] : (stryCov_9fa48("19063"), [...first.items, ...second.items]);
    assert.deepEqual(all.map(stryMutAct_9fa48("19065") ? () => undefined : (stryCov_9fa48("19065"), item => item.id)), stryMutAct_9fa48("19067") ? created.map(item => item.id).reverse() : stryMutAct_9fa48("19066") ? created.map(item => item.id).sort() : (stryCov_9fa48("19066", "19067"), created.map(stryMutAct_9fa48("19068") ? () => undefined : (stryCov_9fa48("19068"), item => item.id)).sort().reverse()));
    assert.equal(all.find(stryMutAct_9fa48("19070") ? () => undefined : (stryCov_9fa48("19070"), item => stryMutAct_9fa48("19073") ? item.id !== closed.id : stryMutAct_9fa48("19072") ? false : stryMutAct_9fa48("19071") ? true : (stryCov_9fa48("19071", "19072", "19073"), item.id === closed.id))).closedAt, closed.closedAt);
    assert.deepEqual(await listOwnedProposals(db, bob, first.next), stryMutAct_9fa48("19075") ? {} : (stryCov_9fa48("19075"), {
      items: stryMutAct_9fa48("19076") ? ["Stryker was here"] : (stryCov_9fa48("19076"), []),
      next: null
    }));
    assert.deepEqual(stryMutAct_9fa48("19078") ? Object.keys(all[0]) : (stryCov_9fa48("19078"), Object.keys(all[0]).sort()), stryMutAct_9fa48("19079") ? [] : (stryCov_9fa48("19079"), [stryMutAct_9fa48("19080") ? "" : (stryCov_9fa48("19080"), 'closedAt'), stryMutAct_9fa48("19081") ? "" : (stryCov_9fa48("19081"), 'createdAt'), stryMutAct_9fa48("19082") ? "" : (stryCov_9fa48("19082"), 'id'), stryMutAct_9fa48("19083") ? "" : (stryCov_9fa48("19083"), 'title'), stryMutAct_9fa48("19084") ? "" : (stryCov_9fa48("19084"), 'tokenVersion')]));
    for (const cursor of stryMutAct_9fa48("19085") ? [] : (stryCov_9fa48("19085"), [stryMutAct_9fa48("19086") ? {} : (stryCov_9fa48("19086"), {
      id: stryMutAct_9fa48("19087") ? "" : (stryCov_9fa48("19087"), 'invalid'),
      createdAt: first.next.createdAt
    }), stryMutAct_9fa48("19088") ? {} : (stryCov_9fa48("19088"), {
      id: first.next.id,
      createdAt: stryMutAct_9fa48("19089") ? "" : (stryCov_9fa48("19089"), 'invalid')
    }), stryMutAct_9fa48("19090") ? {} : (stryCov_9fa48("19090"), {
      id: first.next.id,
      createdAt: stryMutAct_9fa48("19091") ? "" : (stryCov_9fa48("19091"), '2026-09-01')
    })])) await assert.rejects(listOwnedProposals(db, alice, cursor), stryMutAct_9fa48("19092") ? {} : (stryCov_9fa48("19092"), {
      code: stryMutAct_9fa48("19093") ? "" : (stryCov_9fa48("19093"), 'invalid_request')
    }));
    const query = db.queries.find(stryMutAct_9fa48("19094") ? () => undefined : (stryCov_9fa48("19094"), sql => stryMutAct_9fa48("19097") ? sql.includes('FROM community_proposal WHERE account_id=') || sql.includes('LIMIT 26') : stryMutAct_9fa48("19096") ? false : stryMutAct_9fa48("19095") ? true : (stryCov_9fa48("19095", "19096", "19097"), sql.includes(stryMutAct_9fa48("19098") ? "" : (stryCov_9fa48("19098"), 'FROM community_proposal WHERE account_id=')) && sql.includes(stryMutAct_9fa48("19099") ? "" : (stryCov_9fa48("19099"), 'LIMIT 26')))));
    if (stryMutAct_9fa48("19102") ? typeof query === 'string' : stryMutAct_9fa48("19101") ? false : stryMutAct_9fa48("19100") ? true : (stryCov_9fa48("19100", "19101", "19102"), typeof query !== (stryMutAct_9fa48("19103") ? "" : (stryCov_9fa48("19103"), 'string')))) throw new Error(stryMutAct_9fa48("19105") ? "" : (stryCov_9fa48("19105"), 'Expected the indexed list query.'));
    const plan = db.sqlite.prepare(stryMutAct_9fa48("19106") ? `` : (stryCov_9fa48("19106"), `EXPLAIN QUERY PLAN ${query}`)).all(alice);
    assert.ok(stryMutAct_9fa48("19108") ? plan.every(row => row.detail.includes('community_proposal_account_created')) : (stryCov_9fa48("19108"), plan.some(stryMutAct_9fa48("19109") ? () => undefined : (stryCov_9fa48("19109"), row => row.detail.includes(stryMutAct_9fa48("19110") ? "" : (stryCov_9fa48("19110"), 'community_proposal_account_created'))))));
    if (stryMutAct_9fa48("19111")) {
      ;
    } else {
      stryCov_9fa48("19111");
      assert.doesNotMatch(query, /token_digest|payload|evidence|brief/);
    }
  }
});
test(stryMutAct_9fa48("19113") ? "" : (stryCov_9fa48("19113"), 'proposal rotation invalidates old links, preserves the snapshot and replays without reissuing tokens'), async t => {
  if (stryMutAct_9fa48("19114")) {
    {}
  } else {
    stryCov_9fa48("19114");
    const db = database(t);
    await saveProfile(db, alice, profile);
    const saved = await saveBuild(db, alice, save());
    const created = await createProposal(db, alice, stryMutAct_9fa48("19115") ? {} : (stryCov_9fa48("19115"), {
      operationId: stryMutAct_9fa48("19116") ? "" : (stryCov_9fa48("19116"), 'proposal-to-rotate-0001'),
      buildId: saved.id,
      title: stryMutAct_9fa48("19117") ? "" : (stryCov_9fa48("19117"), 'Client study'),
      brief: stryMutAct_9fa48("19118") ? "Stryker was here!" : (stryCov_9fa48("19118"), '')
    }));
    const original = await readProposalPreview(db, created.token);
    const request = stryMutAct_9fa48("19119") ? {} : (stryCov_9fa48("19119"), {
      proposalId: created.id,
      operationId: stryMutAct_9fa48("19120") ? "" : (stryCov_9fa48("19120"), 'rotate-operation-0001'),
      expectedVersion: 0
    });
    const rotated = await rotateProposalLink(db, alice, request);
    if (stryMutAct_9fa48("19121")) {
      ;
    } else {
      stryCov_9fa48("19121");
      assert.equal(rotated.tokenVersion, 1);
    }
    assert.match(rotated.token, stryMutAct_9fa48("19126") ? /^[^a-f0-9]{64}$/ : stryMutAct_9fa48("19125") ? /^[a-f0-9]$/ : stryMutAct_9fa48("19124") ? /^[a-f0-9]{64}/ : stryMutAct_9fa48("19123") ? /[a-f0-9]{64}$/ : (stryCov_9fa48("19123", "19124", "19125", "19126"), /^[a-f0-9]{64}$/));
    await assert.rejects(readProposalPreview(db, created.token), stryMutAct_9fa48("19127") ? {} : (stryCov_9fa48("19127"), {
      code: stryMutAct_9fa48("19128") ? "" : (stryCov_9fa48("19128"), 'proposal_not_found')
    }));
    if (stryMutAct_9fa48("19129")) {
      ;
    } else {
      stryCov_9fa48("19129");
      assert.deepEqual(await readProposalPreview(db, rotated.token), original);
    }
    assert.deepEqual(await rotateProposalLink(db, alice, request), stryMutAct_9fa48("19131") ? {} : (stryCov_9fa48("19131"), {
      ...rotated,
      token: null
    }));
    const latest = await rotateProposalLink(db, alice, stryMutAct_9fa48("19132") ? {} : (stryCov_9fa48("19132"), {
      ...request,
      operationId: stryMutAct_9fa48("19133") ? "" : (stryCov_9fa48("19133"), 'rotate-operation-0002'),
      expectedVersion: 1
    }));
    if (stryMutAct_9fa48("19134")) {
      ;
    } else {
      stryCov_9fa48("19134");
      assert.equal(latest.tokenVersion, 2);
    }
    assert.deepEqual(await rotateProposalLink(db, alice, request), stryMutAct_9fa48("19136") ? {} : (stryCov_9fa48("19136"), {
      ...latest,
      token: null
    }));
    await assert.rejects(readProposalPreview(db, rotated.token), stryMutAct_9fa48("19137") ? {} : (stryCov_9fa48("19137"), {
      code: stryMutAct_9fa48("19138") ? "" : (stryCov_9fa48("19138"), 'proposal_not_found')
    }));
    await assert.rejects(rotateProposalLink(db, alice, stryMutAct_9fa48("19139") ? {} : (stryCov_9fa48("19139"), {
      ...request,
      expectedVersion: 2
    })), stryMutAct_9fa48("19140") ? {} : (stryCov_9fa48("19140"), {
      code: stryMutAct_9fa48("19141") ? "" : (stryCov_9fa48("19141"), 'operation_conflict')
    }));
    await assert.rejects(rotateProposalLink(db, bob, request), stryMutAct_9fa48("19142") ? {} : (stryCov_9fa48("19142"), {
      code: stryMutAct_9fa48("19143") ? "" : (stryCov_9fa48("19143"), 'proposal_not_found')
    }));
    if (stryMutAct_9fa48("19144")) {
      ;
    } else {
      stryCov_9fa48("19144");
      assert.equal((await listOwnedProposals(db, alice)).items[0].tokenVersion, 2);
    }
    const storage = JSON.stringify(db.sqlite.prepare(stryMutAct_9fa48("19145") ? "" : (stryCov_9fa48("19145"), 'SELECT * FROM community_proposal_rotation')).all());
    assert.equal(storage.includes(rotated.token), stryMutAct_9fa48("19147") ? true : (stryCov_9fa48("19147"), false));
    assert.equal(storage.includes(latest.token), stryMutAct_9fa48("19149") ? true : (stryCov_9fa48("19149"), false));
    const closed = await closeProposal(db, alice, created.id);
    assert.deepEqual(await rotateProposalLink(db, alice, request), stryMutAct_9fa48("19151") ? {} : (stryCov_9fa48("19151"), {
      id: created.id,
      tokenVersion: 2,
      closedAt: closed.closedAt,
      token: null
    }));
    await assert.rejects(rotateProposalLink(db, alice, stryMutAct_9fa48("19152") ? {} : (stryCov_9fa48("19152"), {
      ...request,
      operationId: stryMutAct_9fa48("19153") ? "" : (stryCov_9fa48("19153"), 'rotate-after-close-0001'),
      expectedVersion: 2
    })), stryMutAct_9fa48("19154") ? {} : (stryCov_9fa48("19154"), {
      code: stryMutAct_9fa48("19155") ? "" : (stryCov_9fa48("19155"), 'proposal_not_found')
    }));
    await assert.rejects(readProposalPreview(db, latest.token), stryMutAct_9fa48("19156") ? {} : (stryCov_9fa48("19156"), {
      code: stryMutAct_9fa48("19157") ? "" : (stryCov_9fa48("19157"), 'proposal_not_found')
    }));
  }
});
test(stryMutAct_9fa48("19159") ? "" : (stryCov_9fa48("19159"), 'concurrent rotations issue one winning token and reject competing operations at a stale version'), async t => {
  if (stryMutAct_9fa48("19160")) {
    {}
  } else {
    stryCov_9fa48("19160");
    const db = database(t);
    await saveProfile(db, alice, profile);
    const saved = await saveBuild(db, alice, save());
    const created = await createProposal(db, alice, stryMutAct_9fa48("19161") ? {} : (stryCov_9fa48("19161"), {
      operationId: stryMutAct_9fa48("19162") ? "" : (stryCov_9fa48("19162"), 'proposal-rotate-race-0001'),
      buildId: saved.id,
      title: stryMutAct_9fa48("19163") ? "" : (stryCov_9fa48("19163"), 'Client study'),
      brief: stryMutAct_9fa48("19164") ? "Stryker was here!" : (stryCov_9fa48("19164"), '')
    }));
    const request = stryMutAct_9fa48("19165") ? {} : (stryCov_9fa48("19165"), {
      proposalId: created.id,
      operationId: stryMutAct_9fa48("19166") ? "" : (stryCov_9fa48("19166"), 'rotate-race-operation-0001'),
      expectedVersion: 0
    });
    const identical = await Promise.all(stryMutAct_9fa48("19167") ? [] : (stryCov_9fa48("19167"), [rotateProposalLink(db, alice, request), rotateProposalLink(db, alice, request)]));
    assert.equal(stryMutAct_9fa48("19169") ? identical.length : (stryCov_9fa48("19169"), identical.filter(stryMutAct_9fa48("19170") ? () => undefined : (stryCov_9fa48("19170"), row => stryMutAct_9fa48("19173") ? row.token === null : stryMutAct_9fa48("19172") ? false : stryMutAct_9fa48("19171") ? true : (stryCov_9fa48("19171", "19172", "19173"), row.token !== null))).length), 1);
    const winner = identical.find(stryMutAct_9fa48("19174") ? () => undefined : (stryCov_9fa48("19174"), row => stryMutAct_9fa48("19177") ? row.token === null : stryMutAct_9fa48("19176") ? false : stryMutAct_9fa48("19175") ? true : (stryCov_9fa48("19175", "19176", "19177"), row.token !== null)));
    if (stryMutAct_9fa48("19178")) {
      ;
    } else {
      stryCov_9fa48("19178");
      assert.equal((await readProposalPreview(db, winner.token)).id, created.id);
    }
    const competing = await Promise.allSettled(stryMutAct_9fa48("19179") ? [] : (stryCov_9fa48("19179"), [rotateProposalLink(db, alice, stryMutAct_9fa48("19180") ? {} : (stryCov_9fa48("19180"), {
      ...request,
      operationId: stryMutAct_9fa48("19181") ? "" : (stryCov_9fa48("19181"), 'rotate-competitor-one'),
      expectedVersion: 1
    })), rotateProposalLink(db, alice, stryMutAct_9fa48("19182") ? {} : (stryCov_9fa48("19182"), {
      ...request,
      operationId: stryMutAct_9fa48("19183") ? "" : (stryCov_9fa48("19183"), 'rotate-competitor-two'),
      expectedVersion: 1
    }))]));
    assert.equal(stryMutAct_9fa48("19185") ? competing.length : (stryCov_9fa48("19185"), competing.filter(stryMutAct_9fa48("19186") ? () => undefined : (stryCov_9fa48("19186"), row => stryMutAct_9fa48("19189") ? row.status !== 'fulfilled' : stryMutAct_9fa48("19188") ? false : stryMutAct_9fa48("19187") ? true : (stryCov_9fa48("19187", "19188", "19189"), row.status === (stryMutAct_9fa48("19190") ? "" : (stryCov_9fa48("19190"), 'fulfilled'))))).length), 1);
    assert.equal(competing.find(stryMutAct_9fa48("19192") ? () => undefined : (stryCov_9fa48("19192"), row => stryMutAct_9fa48("19195") ? row.status !== 'rejected' : stryMutAct_9fa48("19194") ? false : stryMutAct_9fa48("19193") ? true : (stryCov_9fa48("19193", "19194", "19195"), row.status === (stryMutAct_9fa48("19196") ? "" : (stryCov_9fa48("19196"), 'rejected'))))).reason.code, stryMutAct_9fa48("19197") ? "" : (stryCov_9fa48("19197"), 'operation_conflict'));
    assert.equal(db.sqlite.prepare(stryMutAct_9fa48("19199") ? "" : (stryCov_9fa48("19199"), 'SELECT COUNT(*) AS count FROM community_proposal_rotation')).get().count, 2);
    const mixed = await Promise.allSettled(stryMutAct_9fa48("19200") ? [] : (stryCov_9fa48("19200"), [rotateProposalLink(db, alice, stryMutAct_9fa48("19201") ? {} : (stryCov_9fa48("19201"), {
      ...request,
      operationId: stryMutAct_9fa48("19202") ? "" : (stryCov_9fa48("19202"), 'rotate-same-id-conflict'),
      expectedVersion: 2
    })), rotateProposalLink(db, alice, stryMutAct_9fa48("19203") ? {} : (stryCov_9fa48("19203"), {
      ...request,
      operationId: stryMutAct_9fa48("19204") ? "" : (stryCov_9fa48("19204"), 'rotate-same-id-conflict'),
      expectedVersion: 3
    }))]));
    assert.equal(stryMutAct_9fa48("19206") ? mixed.length : (stryCov_9fa48("19206"), mixed.filter(stryMutAct_9fa48("19207") ? () => undefined : (stryCov_9fa48("19207"), row => stryMutAct_9fa48("19210") ? row.status !== 'fulfilled' : stryMutAct_9fa48("19209") ? false : stryMutAct_9fa48("19208") ? true : (stryCov_9fa48("19208", "19209", "19210"), row.status === (stryMutAct_9fa48("19211") ? "" : (stryCov_9fa48("19211"), 'fulfilled'))))).length), 1);
    assert.equal(mixed.find(stryMutAct_9fa48("19213") ? () => undefined : (stryCov_9fa48("19213"), row => stryMutAct_9fa48("19216") ? row.status !== 'rejected' : stryMutAct_9fa48("19215") ? false : stryMutAct_9fa48("19214") ? true : (stryCov_9fa48("19214", "19215", "19216"), row.status === (stryMutAct_9fa48("19217") ? "" : (stryCov_9fa48("19217"), 'rejected'))))).reason.code, stryMutAct_9fa48("19218") ? "" : (stryCov_9fa48("19218"), 'operation_conflict'));
    assert.equal(db.sqlite.prepare(stryMutAct_9fa48("19220") ? "" : (stryCov_9fa48("19220"), 'SELECT token_version FROM community_proposal')).get().token_version, 3);
  }
});
test(stryMutAct_9fa48("19222") ? "" : (stryCov_9fa48("19222"), 'failed rotation update rolls back issuance and closure wins a pending rotation'), async t => {
  if (stryMutAct_9fa48("19223")) {
    {}
  } else {
    stryCov_9fa48("19223");
    const db = database(t);
    await saveProfile(db, alice, profile);
    const saved = await saveBuild(db, alice, save());
    const created = await createProposal(db, alice, stryMutAct_9fa48("19224") ? {} : (stryCov_9fa48("19224"), {
      operationId: stryMutAct_9fa48("19225") ? "" : (stryCov_9fa48("19225"), 'proposal-rotate-abort-0001'),
      buildId: saved.id,
      title: stryMutAct_9fa48("19226") ? "" : (stryCov_9fa48("19226"), 'Client study'),
      brief: stryMutAct_9fa48("19227") ? "Stryker was here!" : (stryCov_9fa48("19227"), '')
    }));
    const request = stryMutAct_9fa48("19228") ? {} : (stryCov_9fa48("19228"), {
      proposalId: created.id,
      operationId: stryMutAct_9fa48("19229") ? "" : (stryCov_9fa48("19229"), 'rotate-abort-operation-0001'),
      expectedVersion: 0
    });
    db.sqlite.exec(stryMutAct_9fa48("19231") ? "" : (stryCov_9fa48("19231"), "CREATE TRIGGER fail_rotation BEFORE UPDATE OF token_digest ON community_proposal BEGIN SELECT RAISE(ABORT, 'rotation failed'); END"));
    await assert.rejects(rotateProposalLink(db, alice, request), /rotation failed/);
    assert.equal(db.sqlite.prepare(stryMutAct_9fa48("19233") ? "" : (stryCov_9fa48("19233"), 'SELECT COUNT(*) AS count FROM community_proposal_rotation')).get().count, 0);
    if (stryMutAct_9fa48("19234")) {
      ;
    } else {
      stryCov_9fa48("19234");
      assert.equal((await readProposalPreview(db, created.token)).id, created.id);
    }
    db.sqlite.exec(stryMutAct_9fa48("19236") ? "" : (stryCov_9fa48("19236"), 'DROP TRIGGER fail_rotation'));
    const batch = db.batch.bind(db);
    db.batch = statements => {
      if (stryMutAct_9fa48("19237")) {
        {}
      } else {
        stryCov_9fa48("19237");
        db.sqlite.prepare(stryMutAct_9fa48("19239") ? "" : (stryCov_9fa48("19239"), 'UPDATE community_proposal SET closed_at=? WHERE id=?')).run(stryMutAct_9fa48("19240") ? "" : (stryCov_9fa48("19240"), '2026-09-01T00:00:00.000Z'), created.id);
        return batch(statements);
      }
    };
    await assert.rejects(rotateProposalLink(db, alice, request), stryMutAct_9fa48("19241") ? {} : (stryCov_9fa48("19241"), {
      code: stryMutAct_9fa48("19242") ? "" : (stryCov_9fa48("19242"), 'proposal_not_found')
    }));
    assert.equal(db.sqlite.prepare(stryMutAct_9fa48("19244") ? "" : (stryCov_9fa48("19244"), 'SELECT COUNT(*) AS count FROM community_proposal_rotation')).get().count, 0);
    await assert.rejects(readProposalPreview(db, created.token), stryMutAct_9fa48("19245") ? {} : (stryCov_9fa48("19245"), {
      code: stryMutAct_9fa48("19246") ? "" : (stryCov_9fa48("19246"), 'proposal_not_found')
    }));
    for (const expectedVersion of stryMutAct_9fa48("19247") ? [] : (stryCov_9fa48("19247"), [stryMutAct_9fa48("19248") ? +1 : (stryCov_9fa48("19248"), -1), 0.5, Infinity, Number.MAX_SAFE_INTEGER, stryMutAct_9fa48("19249") ? "" : (stryCov_9fa48("19249"), '0')])) assert.throws(stryMutAct_9fa48("19251") ? () => undefined : (stryCov_9fa48("19251"), () => parseProposalRotation(stryMutAct_9fa48("19252") ? {} : (stryCov_9fa48("19252"), {
      ...request,
      expectedVersion
    }))), stryMutAct_9fa48("19253") ? {} : (stryCov_9fa48("19253"), {
      code: stryMutAct_9fa48("19254") ? "" : (stryCov_9fa48("19254"), 'invalid_request')
    }));
  }
});
test(stryMutAct_9fa48("19256") ? "" : (stryCov_9fa48("19256"), 'rotation migration preserves existing proposals and their original links'), async t => {
  if (stryMutAct_9fa48("19257")) {
    {}
  } else {
    stryCov_9fa48("19257");
    const db = database(t, 7);
    await saveProfile(db, alice, profile);
    const saved = await saveBuild(db, alice, save());
    const created = await createProposal(db, alice, stryMutAct_9fa48("19258") ? {} : (stryCov_9fa48("19258"), {
      operationId: stryMutAct_9fa48("19259") ? "" : (stryCov_9fa48("19259"), 'proposal-before-rotation-migration'),
      buildId: saved.id,
      title: stryMutAct_9fa48("19260") ? "" : (stryCov_9fa48("19260"), 'Existing preview'),
      brief: stryMutAct_9fa48("19261") ? "Stryker was here!" : (stryCov_9fa48("19261"), '')
    }));
    const before = stryMutAct_9fa48("19262") ? {} : (stryCov_9fa48("19262"), {
      ...db.sqlite.prepare(stryMutAct_9fa48("19263") ? "" : (stryCov_9fa48("19263"), 'SELECT * FROM community_proposal')).get()
    });
    const preview = await readProposalPreview(db, created.token);
    db.sqlite.exec(readFileSync(new URL(stryMutAct_9fa48("19265") ? "" : (stryCov_9fa48("19265"), '../drizzle/0007_proposal_link_rotation.sql'), import.meta.url), stryMutAct_9fa48("19266") ? "" : (stryCov_9fa48("19266"), 'utf8')));
    assert.deepEqual(stryMutAct_9fa48("19268") ? {} : (stryCov_9fa48("19268"), {
      ...db.sqlite.prepare(stryMutAct_9fa48("19269") ? "" : (stryCov_9fa48("19269"), 'SELECT * FROM community_proposal')).get()
    }), stryMutAct_9fa48("19270") ? {} : (stryCov_9fa48("19270"), {
      ...before,
      token_version: 0
    }));
    if (stryMutAct_9fa48("19271")) {
      ;
    } else {
      stryCov_9fa48("19271");
      assert.deepEqual(await readProposalPreview(db, created.token), preview);
    }
    const rotated = await rotateProposalLink(db, alice, stryMutAct_9fa48("19272") ? {} : (stryCov_9fa48("19272"), {
      proposalId: created.id,
      operationId: stryMutAct_9fa48("19273") ? "" : (stryCov_9fa48("19273"), 'rotate-migrated-proposal'),
      expectedVersion: 0
    }));
    if (stryMutAct_9fa48("19274")) {
      ;
    } else {
      stryCov_9fa48("19274");
      assert.deepEqual(await readProposalPreview(db, rotated.token), preview);
    }
  }
});
test(stryMutAct_9fa48("19276") ? "" : (stryCov_9fa48("19276"), 'client responses freeze normalized builds and chosen authors without changing the proposal'), async t => {
  if (stryMutAct_9fa48("19277")) {
    {}
  } else {
    stryCov_9fa48("19277");
    const db = database(t);
    await saveProfile(db, alice, profile);
    await saveProfile(db, bob, stryMutAct_9fa48("19278") ? {} : (stryCov_9fa48("19278"), {
      ...profile,
      handle: stryMutAct_9fa48("19279") ? "" : (stryCov_9fa48("19279"), 'bob_keys'),
      displayName: stryMutAct_9fa48("19280") ? "" : (stryCov_9fa48("19280"), 'Bob')
    }));
    const saved = await saveBuild(db, alice, save());
    const proposal = await createProposal(db, alice, stryMutAct_9fa48("19281") ? {} : (stryCov_9fa48("19281"), {
      operationId: stryMutAct_9fa48("19282") ? "" : (stryCov_9fa48("19282"), 'proposal-client-reply-0001'),
      buildId: saved.id,
      title: stryMutAct_9fa48("19283") ? "" : (stryCov_9fa48("19283"), 'Client preview'),
      brief: stryMutAct_9fa48("19284") ? "" : (stryCov_9fa48("19284"), 'Try the colors.')
    }));
    const original = await readProposalPreview(db, proposal.token);
    const request = stryMutAct_9fa48("19285") ? {} : (stryCov_9fa48("19285"), {
      operationId: stryMutAct_9fa48("19286") ? "" : (stryCov_9fa48("19286"), 'client-response-0001'),
      note: stryMutAct_9fa48("19287") ? "" : (stryCov_9fa48("19287"), '  Cream accents please.  '),
      build: stryMutAct_9fa48("19288") ? {} : (stryCov_9fa48("19288"), {
        ...defaultBuild,
        layout: stryMutAct_9fa48("19289") ? "" : (stryCov_9fa48("19289"), '75'),
        customParts: stryMutAct_9fa48("19290") ? [] : (stryCov_9fa48("19290"), [stryMutAct_9fa48("19291") ? {} : (stryCov_9fa48("19291"), {
          id: stryMutAct_9fa48("19292") ? "" : (stryCov_9fa48("19292"), 'import:unused-secret'),
          category: stryMutAct_9fa48("19293") ? "" : (stryCov_9fa48("19293"), 'case'),
          name: stryMutAct_9fa48("19294") ? "" : (stryCov_9fa48("19294"), 'Unused private listing'),
          brand: stryMutAct_9fa48("19295") ? "" : (stryCov_9fa48("19295"), 'Maker'),
          detail: stryMutAct_9fa48("19296") ? "" : (stryCov_9fa48("19296"), 'Private library item'),
          source: stryMutAct_9fa48("19297") ? "" : (stryCov_9fa48("19297"), 'https://example.com/private-listing'),
          family: stryMutAct_9fa48("19298") ? "" : (stryCov_9fa48("19298"), 'unknown'),
          evidence: stryMutAct_9fa48("19299") ? "" : (stryCov_9fa48("19299"), 'unknown')
        })])
      })
    });
    const accepted = await submitProposalResponse(db, bob, proposal.token, request);
    const response = await readProposalResponse(db, alice, accepted.id);
    assert.equal(response.build.layout, stryMutAct_9fa48("19301") ? "" : (stryCov_9fa48("19301"), '75'));
    assert.equal(response.note, stryMutAct_9fa48("19303") ? "" : (stryCov_9fa48("19303"), 'Cream accents please.'));
    assert.equal(response.author.displayName, stryMutAct_9fa48("19305") ? "" : (stryCov_9fa48("19305"), 'Bob'));
    if (stryMutAct_9fa48("19306")) {
      ;
    } else {
      stryCov_9fa48("19306");
      assert.equal(response.linkVersion, 0);
    }
    assert.deepEqual(response.build.customParts, stryMutAct_9fa48("19308") ? ["Stryker was here"] : (stryCov_9fa48("19308"), []));
    assert.equal(JSON.stringify(response).includes(stryMutAct_9fa48("19310") ? "" : (stryCov_9fa48("19310"), 'private-listing')), stryMutAct_9fa48("19311") ? true : (stryCov_9fa48("19311"), false));
    assert.equal(JSON.stringify(response).includes(bob), stryMutAct_9fa48("19313") ? true : (stryCov_9fa48("19313"), false));
    assert.equal(JSON.stringify(response).includes(proposal.token), stryMutAct_9fa48("19315") ? true : (stryCov_9fa48("19315"), false));
    if (stryMutAct_9fa48("19316")) {
      ;
    } else {
      stryCov_9fa48("19316");
      assert.deepEqual(await readProposalPreview(db, proposal.token), original);
    }
    assert.equal(db.sqlite.prepare(stryMutAct_9fa48("19318") ? "" : (stryCov_9fa48("19318"), 'SELECT COUNT(*) AS count FROM community_build')).get().count, 1);
    await saveProfile(db, bob, stryMutAct_9fa48("19319") ? {} : (stryCov_9fa48("19319"), {
      ...profile,
      handle: stryMutAct_9fa48("19320") ? "" : (stryCov_9fa48("19320"), 'bob_keys'),
      displayName: stryMutAct_9fa48("19321") ? "" : (stryCov_9fa48("19321"), 'Later Bob')
    }));
    if (stryMutAct_9fa48("19322")) {
      ;
    } else {
      stryCov_9fa48("19322");
      assert.deepEqual(await readProposalResponse(db, bob, accepted.id), response);
    }
    if (stryMutAct_9fa48("19323")) {
      ;
    } else {
      stryCov_9fa48("19323");
      assert.deepEqual(await submitProposalResponse(db, bob, proposal.token, request), accepted);
    }
    await assert.rejects(submitProposalResponse(db, bob, proposal.token, stryMutAct_9fa48("19324") ? {} : (stryCov_9fa48("19324"), {
      ...request,
      note: stryMutAct_9fa48("19325") ? "" : (stryCov_9fa48("19325"), 'Other content')
    })), stryMutAct_9fa48("19326") ? {} : (stryCov_9fa48("19326"), {
      code: stryMutAct_9fa48("19327") ? "" : (stryCov_9fa48("19327"), 'operation_conflict')
    }));
    const charlie = stryMutAct_9fa48("19328") ? "" : (stryCov_9fa48("19328"), 'trusted-google-charlie');
    await saveProfile(db, charlie, stryMutAct_9fa48("19329") ? {} : (stryCov_9fa48("19329"), {
      ...profile,
      handle: stryMutAct_9fa48("19330") ? "" : (stryCov_9fa48("19330"), 'charlie_keys'),
      displayName: stryMutAct_9fa48("19331") ? "" : (stryCov_9fa48("19331"), 'Charlie')
    }));
    await readProposalPreview(db, proposal.token);
    await assert.rejects(readProposalResponse(db, charlie, accepted.id), stryMutAct_9fa48("19332") ? {} : (stryCov_9fa48("19332"), {
      code: stryMutAct_9fa48("19333") ? "" : (stryCov_9fa48("19333"), 'response_not_found')
    }));
    assert.deepEqual(await listProposalResponses(db, charlie, proposal.id), stryMutAct_9fa48("19335") ? {} : (stryCov_9fa48("19335"), {
      items: stryMutAct_9fa48("19336") ? ["Stryker was here"] : (stryCov_9fa48("19336"), []),
      next: null
    }));
    await closeProposal(db, alice, proposal.id);
    if (stryMutAct_9fa48("19337")) {
      ;
    } else {
      stryCov_9fa48("19337");
      assert.deepEqual(await readProposalResponse(db, alice, accepted.id), response);
    }
    if (stryMutAct_9fa48("19338")) {
      ;
    } else {
      stryCov_9fa48("19338");
      assert.deepEqual(await readProposalResponse(db, bob, accepted.id), response);
    }
    if (stryMutAct_9fa48("19339")) {
      ;
    } else {
      stryCov_9fa48("19339");
      assert.equal((await listProposalResponses(db, bob, proposal.id)).items[0].id, accepted.id);
    }
    await assert.rejects(submitProposalResponse(db, bob, proposal.token, request), stryMutAct_9fa48("19340") ? {} : (stryCov_9fa48("19340"), {
      code: stryMutAct_9fa48("19341") ? "" : (stryCov_9fa48("19341"), 'proposal_not_found')
    }));
  }
});
test(stryMutAct_9fa48("19343") ? "" : (stryCov_9fa48("19343"), 'concurrent response retries converge, conflicting content cannot replace them, and retired builds remain reviewable'), async t => {
  if (stryMutAct_9fa48("19344")) {
    {}
  } else {
    stryCov_9fa48("19344");
    const db = database(t);
    await saveProfile(db, alice, profile);
    await saveProfile(db, bob, stryMutAct_9fa48("19345") ? {} : (stryCov_9fa48("19345"), {
      ...profile,
      handle: stryMutAct_9fa48("19346") ? "" : (stryCov_9fa48("19346"), 'bob_keys')
    }));
    const saved = await saveBuild(db, alice, save());
    const proposal = await createProposal(db, alice, stryMutAct_9fa48("19347") ? {} : (stryCov_9fa48("19347"), {
      operationId: stryMutAct_9fa48("19348") ? "" : (stryCov_9fa48("19348"), 'proposal-reply-race-0001'),
      buildId: saved.id,
      title: stryMutAct_9fa48("19349") ? "" : (stryCov_9fa48("19349"), 'Client preview'),
      brief: stryMutAct_9fa48("19350") ? "Stryker was here!" : (stryCov_9fa48("19350"), '')
    }));
    const request = stryMutAct_9fa48("19351") ? {} : (stryCov_9fa48("19351"), {
      operationId: stryMutAct_9fa48("19352") ? "" : (stryCov_9fa48("19352"), 'reply-race-operation-0001'),
      build: defaultBuild,
      note: stryMutAct_9fa48("19353") ? "" : (stryCov_9fa48("19353"), 'Keep these parts.')
    });
    const results = await Promise.all(stryMutAct_9fa48("19354") ? [] : (stryCov_9fa48("19354"), [submitProposalResponse(db, bob, proposal.token, request), submitProposalResponse(db, bob, proposal.token, request)]));
    if (stryMutAct_9fa48("19355")) {
      ;
    } else {
      stryCov_9fa48("19355");
      assert.deepEqual(results[0], results[1]);
    }
    assert.equal(db.sqlite.prepare(stryMutAct_9fa48("19357") ? "" : (stryCov_9fa48("19357"), 'SELECT COUNT(*) AS count FROM community_proposal_response')).get().count, 1);
    const conflicts = await Promise.allSettled(stryMutAct_9fa48("19358") ? [] : (stryCov_9fa48("19358"), [submitProposalResponse(db, bob, proposal.token, stryMutAct_9fa48("19359") ? {} : (stryCov_9fa48("19359"), {
      ...request,
      operationId: stryMutAct_9fa48("19360") ? "" : (stryCov_9fa48("19360"), 'reply-conflicting-operation'),
      note: stryMutAct_9fa48("19361") ? "" : (stryCov_9fa48("19361"), 'One')
    })), submitProposalResponse(db, bob, proposal.token, stryMutAct_9fa48("19362") ? {} : (stryCov_9fa48("19362"), {
      ...request,
      operationId: stryMutAct_9fa48("19363") ? "" : (stryCov_9fa48("19363"), 'reply-conflicting-operation'),
      note: stryMutAct_9fa48("19364") ? "" : (stryCov_9fa48("19364"), 'Two')
    }))]));
    assert.equal(stryMutAct_9fa48("19366") ? conflicts.length : (stryCov_9fa48("19366"), conflicts.filter(stryMutAct_9fa48("19367") ? () => undefined : (stryCov_9fa48("19367"), row => stryMutAct_9fa48("19370") ? row.status !== 'fulfilled' : stryMutAct_9fa48("19369") ? false : stryMutAct_9fa48("19368") ? true : (stryCov_9fa48("19368", "19369", "19370"), row.status === (stryMutAct_9fa48("19371") ? "" : (stryCov_9fa48("19371"), 'fulfilled'))))).length), 1);
    assert.equal(conflicts.find(stryMutAct_9fa48("19373") ? () => undefined : (stryCov_9fa48("19373"), row => stryMutAct_9fa48("19376") ? row.status !== 'rejected' : stryMutAct_9fa48("19375") ? false : stryMutAct_9fa48("19374") ? true : (stryCov_9fa48("19374", "19375", "19376"), row.status === (stryMutAct_9fa48("19377") ? "" : (stryCov_9fa48("19377"), 'rejected'))))).reason.code, stryMutAct_9fa48("19378") ? "" : (stryCov_9fa48("19378"), 'operation_conflict'));
    const response = await readProposalResponse(db, bob, results[0].id);
    const {
      catalog
    } = await import('../lib/catalog.ts');
    const index = catalog.findIndex(stryMutAct_9fa48("19379") ? () => undefined : (stryCov_9fa48("19379"), part => stryMutAct_9fa48("19382") ? part.id !== defaultBuild.selection.case : stryMutAct_9fa48("19381") ? false : stryMutAct_9fa48("19380") ? true : (stryCov_9fa48("19380", "19381", "19382"), part.id === defaultBuild.selection.case)));
    const [removed] = catalog.splice(index, 1);
    try {
      if (stryMutAct_9fa48("19383")) {
        {}
      } else {
        stryCov_9fa48("19383");
        if (stryMutAct_9fa48("19384")) {
          ;
        } else {
          stryCov_9fa48("19384");
          assert.deepEqual(await readProposalResponse(db, alice, response.id), response);
        }
        if (stryMutAct_9fa48("19385")) {
          ;
        } else {
          stryCov_9fa48("19385");
          assert.deepEqual(await submitProposalResponse(db, bob, proposal.token, request), results[0]);
        }
        await assert.rejects(submitProposalResponse(db, bob, proposal.token, stryMutAct_9fa48("19386") ? {} : (stryCov_9fa48("19386"), {
          ...request,
          operationId: stryMutAct_9fa48("19387") ? "" : (stryCov_9fa48("19387"), 'new-unsupported-response')
        })), stryMutAct_9fa48("19388") ? {} : (stryCov_9fa48("19388"), {
          code: stryMutAct_9fa48("19389") ? "" : (stryCov_9fa48("19389"), 'invalid_request')
        }));
      }
    } finally {
      if (stryMutAct_9fa48("19390")) {
        {}
      } else {
        stryCov_9fa48("19390");
        if (stryMutAct_9fa48("19391")) {
          ;
        } else {
          stryCov_9fa48("19391");
          catalog.splice(index, 0, removed);
        }
      }
    }
    assert.equal(db.sqlite.prepare(stryMutAct_9fa48("19393") ? "" : (stryCov_9fa48("19393"), 'SELECT COUNT(*) AS count FROM community_proposal_response')).get().count, 2);
  }
});
test(stryMutAct_9fa48("19395") ? "" : (stryCov_9fa48("19395"), 'closing or rotating during submission blocks the guarded response insert'), async t => {
  if (stryMutAct_9fa48("19396")) {
    {}
  } else {
    stryCov_9fa48("19396");
    for (const action of stryMutAct_9fa48("19397") ? [] : (stryCov_9fa48("19397"), [stryMutAct_9fa48("19398") ? "" : (stryCov_9fa48("19398"), 'close'), stryMutAct_9fa48("19399") ? "" : (stryCov_9fa48("19399"), 'rotate')])) {
      if (stryMutAct_9fa48("19400")) {
        {}
      } else {
        stryCov_9fa48("19400");
        const db = database(t);
        await saveProfile(db, alice, profile);
        await saveProfile(db, bob, stryMutAct_9fa48("19401") ? {} : (stryCov_9fa48("19401"), {
          ...profile,
          handle: stryMutAct_9fa48("19402") ? "" : (stryCov_9fa48("19402"), 'bob_keys')
        }));
        const saved = await saveBuild(db, alice, save());
        const proposal = await createProposal(db, alice, stryMutAct_9fa48("19403") ? {} : (stryCov_9fa48("19403"), {
          operationId: stryMutAct_9fa48("19404") ? `` : (stryCov_9fa48("19404"), `proposal-reply-${action}-0001`),
          buildId: saved.id,
          title: stryMutAct_9fa48("19405") ? "" : (stryCov_9fa48("19405"), 'Client preview'),
          brief: stryMutAct_9fa48("19406") ? "Stryker was here!" : (stryCov_9fa48("19406"), '')
        }));
        const prepare = db.prepare.bind(db);
        db.prepare = sql => {
          if (stryMutAct_9fa48("19407")) {
            {}
          } else {
            stryCov_9fa48("19407");
            const statement = prepare(sql);
            if (stryMutAct_9fa48("19410") ? false : stryMutAct_9fa48("19409") ? true : stryMutAct_9fa48("19408") ? sql.includes('INSERT INTO community_proposal_response') : (stryCov_9fa48("19408", "19409", "19410"), !sql.includes(stryMutAct_9fa48("19411") ? "" : (stryCov_9fa48("19411"), 'INSERT INTO community_proposal_response')))) return statement;
            return stryMutAct_9fa48("19412") ? {} : (stryCov_9fa48("19412"), {
              bind(...args) {
                if (stryMutAct_9fa48("19413")) {
                  {}
                } else {
                  stryCov_9fa48("19413");
                  const bound = statement.bind(...args);
                  return stryMutAct_9fa48("19414") ? {} : (stryCov_9fa48("19414"), {
                    ...bound,
                    async run() {
                      if (stryMutAct_9fa48("19415")) {
                        {}
                      } else {
                        stryCov_9fa48("19415");
                        if (stryMutAct_9fa48("19418") ? action !== 'close' : stryMutAct_9fa48("19417") ? false : stryMutAct_9fa48("19416") ? true : (stryCov_9fa48("19416", "19417", "19418"), action === (stryMutAct_9fa48("19419") ? "" : (stryCov_9fa48("19419"), 'close')))) await closeProposal(db, alice, proposal.id);else await rotateProposalLink(db, alice, stryMutAct_9fa48("19420") ? {} : (stryCov_9fa48("19420"), {
                          proposalId: proposal.id,
                          operationId: stryMutAct_9fa48("19421") ? "" : (stryCov_9fa48("19421"), 'rotate-during-response-0001'),
                          expectedVersion: 0
                        }));
                        return bound.run();
                      }
                    }
                  });
                }
              }
            });
          }
        };
        await assert.rejects(submitProposalResponse(db, bob, proposal.token, stryMutAct_9fa48("19422") ? {} : (stryCov_9fa48("19422"), {
          operationId: stryMutAct_9fa48("19423") ? "" : (stryCov_9fa48("19423"), 'response-after-invalidated-link'),
          build: defaultBuild,
          note: stryMutAct_9fa48("19424") ? "Stryker was here!" : (stryCov_9fa48("19424"), '')
        })), stryMutAct_9fa48("19425") ? {} : (stryCov_9fa48("19425"), {
          code: stryMutAct_9fa48("19426") ? "" : (stryCov_9fa48("19426"), 'proposal_not_found')
        }));
        assert.equal(db.sqlite.prepare(stryMutAct_9fa48("19428") ? "" : (stryCov_9fa48("19428"), 'SELECT COUNT(*) AS count FROM community_proposal_response')).get().count, 0);
        assert.equal(db.sqlite.prepare(stryMutAct_9fa48("19430") ? "" : (stryCov_9fa48("19430"), 'SELECT COUNT(*) AS count FROM community_build')).get().count, 1);
      }
    }
  }
});
test(stryMutAct_9fa48("19432") ? "" : (stryCov_9fa48("19432"), 'response validation rejects invalid builds, notes, tokens and missing identities without creating records'), async t => {
  if (stryMutAct_9fa48("19433")) {
    {}
  } else {
    stryCov_9fa48("19433");
    const db = database(t);
    await saveProfile(db, alice, profile);
    const saved = await saveBuild(db, alice, save());
    const proposal = await createProposal(db, alice, stryMutAct_9fa48("19434") ? {} : (stryCov_9fa48("19434"), {
      operationId: stryMutAct_9fa48("19435") ? "" : (stryCov_9fa48("19435"), 'proposal-response-validation'),
      buildId: saved.id,
      title: stryMutAct_9fa48("19436") ? "" : (stryCov_9fa48("19436"), 'Client preview'),
      brief: stryMutAct_9fa48("19437") ? "Stryker was here!" : (stryCov_9fa48("19437"), '')
    }));
    const request = stryMutAct_9fa48("19438") ? {} : (stryCov_9fa48("19438"), {
      operationId: stryMutAct_9fa48("19439") ? "" : (stryCov_9fa48("19439"), 'response-validation-0001'),
      build: defaultBuild,
      note: stryMutAct_9fa48("19440") ? "Stryker was here!" : (stryCov_9fa48("19440"), '')
    });
    await assert.rejects(submitProposalResponse(db, bob, proposal.token, request), stryMutAct_9fa48("19441") ? {} : (stryCov_9fa48("19441"), {
      code: stryMutAct_9fa48("19442") ? "" : (stryCov_9fa48("19442"), 'profile_required')
    }));
    await assert.rejects(submitProposalResponse(db, alice, (stryMutAct_9fa48("19443") ? "" : (stryCov_9fa48("19443"), '0')).repeat(64), request), stryMutAct_9fa48("19444") ? {} : (stryCov_9fa48("19444"), {
      code: stryMutAct_9fa48("19445") ? "" : (stryCov_9fa48("19445"), 'proposal_not_found')
    }));
    for (const value of stryMutAct_9fa48("19446") ? [] : (stryCov_9fa48("19446"), [null, stryMutAct_9fa48("19447") ? {} : (stryCov_9fa48("19447"), {
      ...request,
      build: {}
    }), stryMutAct_9fa48("19448") ? {} : (stryCov_9fa48("19448"), {
      ...request,
      note: (stryMutAct_9fa48("19449") ? "" : (stryCov_9fa48("19449"), 'x')).repeat(2001)
    }), stryMutAct_9fa48("19450") ? {} : (stryCov_9fa48("19450"), {
      ...request,
      note: stryMutAct_9fa48("19451") ? "" : (stryCov_9fa48("19451"), 'bad\u0000note')
    }), stryMutAct_9fa48("19452") ? {} : (stryCov_9fa48("19452"), {
      ...request,
      operationId: stryMutAct_9fa48("19453") ? "" : (stryCov_9fa48("19453"), 'bad')
    })])) assert.throws(stryMutAct_9fa48("19455") ? () => undefined : (stryCov_9fa48("19455"), () => parseProposalResponse(value)), stryMutAct_9fa48("19456") ? {} : (stryCov_9fa48("19456"), {
      code: stryMutAct_9fa48("19457") ? "" : (stryCov_9fa48("19457"), 'invalid_request')
    }));
    await assert.rejects(submitProposalResponse(db, alice, proposal.token, stryMutAct_9fa48("19458") ? {} : (stryCov_9fa48("19458"), {
      ...request,
      build: stryMutAct_9fa48("19459") ? {} : (stryCov_9fa48("19459"), {
        ...defaultBuild,
        selection: stryMutAct_9fa48("19460") ? {} : (stryCov_9fa48("19460"), {
          ...defaultBuild.selection,
          case: stryMutAct_9fa48("19461") ? "" : (stryCov_9fa48("19461"), 'unsupported-case')
        })
      })
    })), stryMutAct_9fa48("19462") ? {} : (stryCov_9fa48("19462"), {
      code: stryMutAct_9fa48("19463") ? "" : (stryCov_9fa48("19463"), 'invalid_request')
    }));
    assert.equal(db.sqlite.prepare(stryMutAct_9fa48("19465") ? "" : (stryCov_9fa48("19465"), 'SELECT COUNT(*) AS count FROM community_account')).get().count, 1);
    assert.equal(db.sqlite.prepare(stryMutAct_9fa48("19467") ? "" : (stryCov_9fa48("19467"), 'SELECT COUNT(*) AS count FROM community_build')).get().count, 1);
    assert.equal(db.sqlite.prepare(stryMutAct_9fa48("19469") ? "" : (stryCov_9fa48("19469"), 'SELECT COUNT(*) AS count FROM community_proposal_response')).get().count, 0);
  }
});
test(stryMutAct_9fa48("19471") ? "" : (stryCov_9fa48("19471"), 'response lists paginate by owner or author and record the server-selected link version'), async t => {
  if (stryMutAct_9fa48("19472")) {
    {}
  } else {
    stryCov_9fa48("19472");
    const db = database(t);
    await saveProfile(db, alice, profile);
    await saveProfile(db, bob, stryMutAct_9fa48("19473") ? {} : (stryCov_9fa48("19473"), {
      ...profile,
      handle: stryMutAct_9fa48("19474") ? "" : (stryCov_9fa48("19474"), 'bob_keys'),
      displayName: stryMutAct_9fa48("19475") ? "" : (stryCov_9fa48("19475"), 'Bob')
    }));
    const charlie = stryMutAct_9fa48("19476") ? "" : (stryCov_9fa48("19476"), 'trusted-google-charlie');
    await saveProfile(db, charlie, stryMutAct_9fa48("19477") ? {} : (stryCov_9fa48("19477"), {
      ...profile,
      handle: stryMutAct_9fa48("19478") ? "" : (stryCov_9fa48("19478"), 'charlie_keys'),
      displayName: stryMutAct_9fa48("19479") ? "" : (stryCov_9fa48("19479"), 'Charlie')
    }));
    const saved = await saveBuild(db, alice, save());
    const proposal = await createProposal(db, alice, stryMutAct_9fa48("19480") ? {} : (stryCov_9fa48("19480"), {
      operationId: stryMutAct_9fa48("19481") ? "" : (stryCov_9fa48("19481"), 'proposal-paged-responses'),
      buildId: saved.id,
      title: stryMutAct_9fa48("19482") ? "" : (stryCov_9fa48("19482"), 'Client preview'),
      brief: stryMutAct_9fa48("19483") ? "Stryker was here!" : (stryCov_9fa48("19483"), '')
    }));
    const rotated = await rotateProposalLink(db, alice, stryMutAct_9fa48("19484") ? {} : (stryCov_9fa48("19484"), {
      proposalId: proposal.id,
      operationId: stryMutAct_9fa48("19485") ? "" : (stryCov_9fa48("19485"), 'rotate-before-paged-responses'),
      expectedVersion: 0
    }));
    const own = stryMutAct_9fa48("19486") ? ["Stryker was here"] : (stryCov_9fa48("19486"), []);
    for (let i = 0; stryMutAct_9fa48("19489") ? i >= 28 : stryMutAct_9fa48("19488") ? i <= 28 : stryMutAct_9fa48("19487") ? false : (stryCov_9fa48("19487", "19488", "19489"), i < 28); stryMutAct_9fa48("19490") ? i-- : (stryCov_9fa48("19490"), i++)) own.push(await submitProposalResponse(db, bob, rotated.token, stryMutAct_9fa48("19492") ? {} : (stryCov_9fa48("19492"), {
      operationId: stryMutAct_9fa48("19493") ? `` : (stryCov_9fa48("19493"), `paged-client-response-${i}`),
      build: defaultBuild,
      note: stryMutAct_9fa48("19494") ? "" : (stryCov_9fa48("19494"), 'Private response note.'),
      linkVersion: 99,
      author: stryMutAct_9fa48("19495") ? {} : (stryCov_9fa48("19495"), {
        displayName: stryMutAct_9fa48("19496") ? "" : (stryCov_9fa48("19496"), 'Forged')
      }),
      evidence: stryMutAct_9fa48("19497") ? {} : (stryCov_9fa48("19497"), {
        approved: stryMutAct_9fa48("19498") ? false : (stryCov_9fa48("19498"), true)
      })
    })));
    const other = await submitProposalResponse(db, charlie, rotated.token, stryMutAct_9fa48("19499") ? {} : (stryCov_9fa48("19499"), {
      operationId: stryMutAct_9fa48("19500") ? "" : (stryCov_9fa48("19500"), 'paged-client-response-0'),
      build: defaultBuild,
      note: stryMutAct_9fa48("19501") ? "" : (stryCov_9fa48("19501"), 'Another client.')
    }));
    if (stryMutAct_9fa48("19502")) {
      ;
    } else {
      stryCov_9fa48("19502");
      assert.equal((await readProposalResponse(db, bob, own[0].id)).linkVersion, 1);
    }
    assert.equal((await readProposalResponse(db, bob, own[0].id)).author.displayName, stryMutAct_9fa48("19504") ? "" : (stryCov_9fa48("19504"), 'Bob'));
    await assert.rejects(submitProposalResponse(db, bob, proposal.token, stryMutAct_9fa48("19505") ? {} : (stryCov_9fa48("19505"), {
      operationId: stryMutAct_9fa48("19506") ? "" : (stryCov_9fa48("19506"), 'paged-client-response-0'),
      build: defaultBuild,
      note: stryMutAct_9fa48("19507") ? "" : (stryCov_9fa48("19507"), 'Private response note.')
    })), stryMutAct_9fa48("19508") ? {} : (stryCov_9fa48("19508"), {
      code: stryMutAct_9fa48("19509") ? "" : (stryCov_9fa48("19509"), 'proposal_not_found')
    }));
    db.sqlite.prepare(stryMutAct_9fa48("19511") ? "" : (stryCov_9fa48("19511"), 'UPDATE community_proposal_response SET created_at=?')).run(stryMutAct_9fa48("19512") ? "" : (stryCov_9fa48("19512"), '2026-09-01T00:00:00.000Z'));
    const first = await listProposalResponses(db, alice, proposal.id);
    const second = await listProposalResponses(db, alice, proposal.id, first.next);
    if (stryMutAct_9fa48("19513")) {
      ;
    } else {
      stryCov_9fa48("19513");
      assert.equal(first.items.length, 25);
    }
    if (stryMutAct_9fa48("19514")) {
      ;
    } else {
      stryCov_9fa48("19514");
      assert.equal(second.items.length, 4);
    }
    if (stryMutAct_9fa48("19515")) {
      ;
    } else {
      stryCov_9fa48("19515");
      assert.equal(second.next, null);
    }
    assert.deepEqual((stryMutAct_9fa48("19517") ? [] : (stryCov_9fa48("19517"), [...first.items, ...second.items])).map(stryMutAct_9fa48("19518") ? () => undefined : (stryCov_9fa48("19518"), item => item.id)), stryMutAct_9fa48("19520") ? [...own, other].map(item => item.id).reverse() : stryMutAct_9fa48("19519") ? [...own, other].map(item => item.id).sort() : (stryCov_9fa48("19519", "19520"), (stryMutAct_9fa48("19521") ? [] : (stryCov_9fa48("19521"), [...own, other])).map(stryMutAct_9fa48("19522") ? () => undefined : (stryCov_9fa48("19522"), item => item.id)).sort().reverse()));
    const clientFirst = await listProposalResponses(db, bob, proposal.id);
    const clientLast = await listProposalResponses(db, bob, proposal.id, clientFirst.next);
    assert.equal(stryMutAct_9fa48("19524") ? clientFirst.items.length - clientLast.items.length : (stryCov_9fa48("19524"), clientFirst.items.length + clientLast.items.length), 28);
    if (stryMutAct_9fa48("19525")) {
      ;
    } else {
      stryCov_9fa48("19525");
      assert.equal((await listProposalResponses(db, charlie, proposal.id)).items[0].id, other.id);
    }
    assert.deepEqual(await listProposalResponses(db, stryMutAct_9fa48("19527") ? "" : (stryCov_9fa48("19527"), 'unrelated-subject'), proposal.id), stryMutAct_9fa48("19528") ? {} : (stryCov_9fa48("19528"), {
      items: stryMutAct_9fa48("19529") ? ["Stryker was here"] : (stryCov_9fa48("19529"), []),
      next: null
    }));
    assert.deepEqual(stryMutAct_9fa48("19531") ? Object.keys(first.items[0]) : (stryCov_9fa48("19531"), Object.keys(first.items[0]).sort()), stryMutAct_9fa48("19532") ? [] : (stryCov_9fa48("19532"), [stryMutAct_9fa48("19533") ? "" : (stryCov_9fa48("19533"), 'author'), stryMutAct_9fa48("19534") ? "" : (stryCov_9fa48("19534"), 'createdAt'), stryMutAct_9fa48("19535") ? "" : (stryCov_9fa48("19535"), 'id'), stryMutAct_9fa48("19536") ? "" : (stryCov_9fa48("19536"), 'linkVersion')]));
    for (const cursor of stryMutAct_9fa48("19537") ? [] : (stryCov_9fa48("19537"), [stryMutAct_9fa48("19538") ? {} : (stryCov_9fa48("19538"), {
      id: stryMutAct_9fa48("19539") ? "" : (stryCov_9fa48("19539"), 'bad'),
      createdAt: first.next.createdAt
    }), stryMutAct_9fa48("19540") ? {} : (stryCov_9fa48("19540"), {
      id: first.next.id,
      createdAt: stryMutAct_9fa48("19541") ? "" : (stryCov_9fa48("19541"), '2026-09-01')
    })])) await assert.rejects(listProposalResponses(db, alice, proposal.id, cursor), stryMutAct_9fa48("19542") ? {} : (stryCov_9fa48("19542"), {
      code: stryMutAct_9fa48("19543") ? "" : (stryCov_9fa48("19543"), 'invalid_request')
    }));
    const query = db.queries.find(stryMutAct_9fa48("19544") ? () => undefined : (stryCov_9fa48("19544"), sql => stryMutAct_9fa48("19547") ? sql.includes('SELECT r.id,r.author,r.link_version') || sql.includes('LIMIT 26') : stryMutAct_9fa48("19546") ? false : stryMutAct_9fa48("19545") ? true : (stryCov_9fa48("19545", "19546", "19547"), sql.includes(stryMutAct_9fa48("19548") ? "" : (stryCov_9fa48("19548"), 'SELECT r.id,r.author,r.link_version')) && sql.includes(stryMutAct_9fa48("19549") ? "" : (stryCov_9fa48("19549"), 'LIMIT 26')))));
    const plan = db.sqlite.prepare(stryMutAct_9fa48("19550") ? `` : (stryCov_9fa48("19550"), `EXPLAIN QUERY PLAN ${query}`)).all(alice, proposal.id);
    assert.ok(stryMutAct_9fa48("19552") ? plan.every(row => row.detail.includes('community_proposal_response_created')) : (stryCov_9fa48("19552"), plan.some(stryMutAct_9fa48("19553") ? () => undefined : (stryCov_9fa48("19553"), row => row.detail.includes(stryMutAct_9fa48("19554") ? "" : (stryCov_9fa48("19554"), 'community_proposal_response_created'))))));
    assert.equal(db.sqlite.prepare(stryMutAct_9fa48("19556") ? "" : (stryCov_9fa48("19556"), 'SELECT COUNT(*) AS count FROM community_build')).get().count, 1);
  }
});
test(stryMutAct_9fa48("19558") ? "" : (stryCov_9fa48("19558"), 'imported accessory snapshots preserve variant evidence through retries and publication'), async t => {
  if (stryMutAct_9fa48("19559")) {
    {}
  } else {
    stryCov_9fa48("19559");
    const {
      createImportedAccessory
    } = await import('../lib/imported-accessories.ts');
    const {
      newAccessorySelection
    } = await import('../lib/build-accessories.ts');
    const db = database(t);
    const legacy = await saveBuild(db, alice, save());
    assert.deepEqual(await saveBuild(db, alice, save(stryMutAct_9fa48("19561") ? {} : (stryCov_9fa48("19561"), {
      ...defaultBuild,
      customAccessories: stryMutAct_9fa48("19562") ? ["Stryker was here"] : (stryCov_9fa48("19562"), [])
    }))), legacy);
    const product = await createImportedAccessory(stryMutAct_9fa48("19563") ? {} : (stryCov_9fa48("19563"), {
      origin: stryMutAct_9fa48("19564") ? "" : (stryCov_9fa48("19564"), 'import'),
      name: stryMutAct_9fa48("19565") ? "" : (stryCov_9fa48("19565"), 'Client display'),
      brand: stryMutAct_9fa48("19566") ? "" : (stryCov_9fa48("19566"), 'Maker'),
      detail: stryMutAct_9fa48("19567") ? "" : (stryCov_9fa48("19567"), 'Unverified reference'),
      source: stryMutAct_9fa48("19568") ? "" : (stryCov_9fa48("19568"), 'https://example.com/display?variant=amber'),
      sku: stryMutAct_9fa48("19569") ? "" : (stryCov_9fa48("19569"), 'AMBER-42'),
      observedAt: stryMutAct_9fa48("19570") ? "" : (stryCov_9fa48("19570"), '2026-09-06T00:00:00.000Z'),
      method: stryMutAct_9fa48("19571") ? "" : (stryCov_9fa48("19571"), 'Pasted JSON-LD'),
      fit: stryMutAct_9fa48("19572") ? "" : (stryCov_9fa48("19572"), 'unknown'),
      geometry: stryMutAct_9fa48("19573") ? "" : (stryCov_9fa48("19573"), 'unavailable'),
      kind: stryMutAct_9fa48("19574") ? "" : (stryCov_9fa48("19574"), 'screen'),
      placement: stryMutAct_9fa48("19575") ? "" : (stryCov_9fa48("19575"), 'external'),
      sizeU: null,
      stem: null
    }));
    const selected = newAccessorySelection(product.id, stryMutAct_9fa48("19576") ? [] : (stryCov_9fa48("19576"), [product]));
    const request = save(stryMutAct_9fa48("19577") ? {} : (stryCov_9fa48("19577"), {
      ...defaultBuild,
      customAccessories: stryMutAct_9fa48("19578") ? [] : (stryCov_9fa48("19578"), [product]),
      accessories: stryMutAct_9fa48("19579") ? [] : (stryCov_9fa48("19579"), [selected])
    }), stryMutAct_9fa48("19580") ? "" : (stryCov_9fa48("19580"), 'imported-accessory-operation'));
    const saved = await saveBuild(db, alice, request);
    if (stryMutAct_9fa48("19581")) {
      ;
    } else {
      stryCov_9fa48("19581");
      assert.deepEqual(await saveBuild(db, alice, request), saved);
    }
    assert.deepEqual((await readBuild(db, alice, saved.id)).build.customAccessories, stryMutAct_9fa48("19583") ? [] : (stryCov_9fa48("19583"), [product]));
    await saveProfile(db, alice, profile);
    const receipt = await publishBuild(db, alice, stryMutAct_9fa48("19584") ? {} : (stryCov_9fa48("19584"), {
      operationId: stryMutAct_9fa48("19585") ? "" : (stryCov_9fa48("19585"), 'imported-accessory-publication'),
      buildId: saved.id,
      title: stryMutAct_9fa48("19586") ? "" : (stryCov_9fa48("19586"), 'Display study'),
      note: stryMutAct_9fa48("19587") ? "Stryker was here!" : (stryCov_9fa48("19587"), ''),
      kind: stryMutAct_9fa48("19588") ? "" : (stryCov_9fa48("19588"), 'build')
    }));
    const publication = await readPublicPublication(db, receipt.id);
    assert.deepEqual(publication.evidence.accessoryReferences, stryMutAct_9fa48("19590") ? [] : (stryCov_9fa48("19590"), [product]));
    assert.equal(publication.evidence.accessoryCompatibility[selected.id].status, stryMutAct_9fa48("19592") ? "" : (stryCov_9fa48("19592"), 'unknown'));
    const forged = structuredClone(publication.evidence);
    forged.accessoryReferences[0].source = stryMutAct_9fa48("19593") ? "" : (stryCov_9fa48("19593"), 'https://example.com/substitution');
    db.sqlite.prepare(stryMutAct_9fa48("19595") ? "" : (stryCov_9fa48("19595"), 'UPDATE community_build SET evidence=? WHERE id=?')).run(JSON.stringify(forged), saved.id);
    await assert.rejects(readPublicPublication(db, receipt.id), stryMutAct_9fa48("19596") ? {} : (stryCov_9fa48("19596"), {
      code: stryMutAct_9fa48("19597") ? "" : (stryCov_9fa48("19597"), 'saved_build_unavailable')
    }));
  }
});
test(stryMutAct_9fa48("19599") ? "" : (stryCov_9fa48("19599"), 'public discovery excludes private work and withdrawals, paginates ties and freezes attribution'), async t => {
  if (stryMutAct_9fa48("19600")) {
    {}
  } else {
    stryCov_9fa48("19600");
    const {
      listPublicPublications
    } = await import('../db/publications.ts');
    const {
      parseDiscoveryQuery
    } = await import('../lib/discovery.ts');
    const db = database(t);
    const query = parseDiscoveryQuery(new URLSearchParams());
    await saveBuild(db, bob, save(stryMutAct_9fa48("19601") ? {} : (stryCov_9fa48("19601"), {
      ...defaultBuild,
      name: stryMutAct_9fa48("19602") ? "" : (stryCov_9fa48("19602"), 'Secret client draft')
    })));
    assert.deepEqual(await listPublicPublications(db, query), stryMutAct_9fa48("19604") ? {} : (stryCov_9fa48("19604"), {
      items: stryMutAct_9fa48("19605") ? ["Stryker was here"] : (stryCov_9fa48("19605"), []),
      next: null
    }));
    await saveProfile(db, alice, profile);
    const saved = await saveBuild(db, alice, save());
    const ids = stryMutAct_9fa48("19606") ? ["Stryker was here"] : (stryCov_9fa48("19606"), []);
    for (let index = 0; stryMutAct_9fa48("19609") ? index >= 27 : stryMutAct_9fa48("19608") ? index <= 27 : stryMutAct_9fa48("19607") ? false : (stryCov_9fa48("19607", "19608", "19609"), index < 27); stryMutAct_9fa48("19610") ? index-- : (stryCov_9fa48("19610"), index++)) {
      if (stryMutAct_9fa48("19611")) {
        {}
      } else {
        stryCov_9fa48("19611");
        const released = await publishBuild(db, alice, stryMutAct_9fa48("19612") ? {} : (stryCov_9fa48("19612"), {
          operationId: stryMutAct_9fa48("19613") ? `` : (stryCov_9fa48("19613"), `public-discovery-${index.toString().padStart(3, stryMutAct_9fa48("19614") ? "" : (stryCov_9fa48("19614"), '0'))}`),
          buildId: saved.id,
          title: stryMutAct_9fa48("19615") ? `` : (stryCov_9fa48("19615"), `Keyboard ${index}`),
          note: stryMutAct_9fa48("19616") ? "" : (stryCov_9fa48("19616"), 'Public note'),
          kind: stryMutAct_9fa48("19617") ? "" : (stryCov_9fa48("19617"), 'build')
        }));
        if (stryMutAct_9fa48("19618")) {
          ;
        } else {
          stryCov_9fa48("19618");
          ids.push(released.id);
        }
      }
    }
    db.sqlite.exec(stryMutAct_9fa48("19620") ? "" : (stryCov_9fa48("19620"), "UPDATE community_publication SET published_at='2026-09-06T00:00:00.000Z'"));
    await saveProfile(db, alice, stryMutAct_9fa48("19621") ? {} : (stryCov_9fa48("19621"), {
      ...profile,
      handle: stryMutAct_9fa48("19622") ? "" : (stryCov_9fa48("19622"), 'new_alice'),
      displayName: stryMutAct_9fa48("19623") ? "" : (stryCov_9fa48("19623"), 'New name')
    }));
    await saveProfile(db, bob, stryMutAct_9fa48("19624") ? {} : (stryCov_9fa48("19624"), {
      ...profile,
      displayName: stryMutAct_9fa48("19625") ? "" : (stryCov_9fa48("19625"), 'Other account')
    }));
    await withdrawPublication(db, alice, ids[0]);
    const first = await listPublicPublications(db, query);
    if (stryMutAct_9fa48("19626")) {
      ;
    } else {
      stryCov_9fa48("19626");
      assert.equal(first.items.length, 25);
    }
    if (stryMutAct_9fa48("19627")) {
      ;
    } else {
      stryCov_9fa48("19627");
      assert.ok(first.next);
    }
    const second = await listPublicPublications(db, stryMutAct_9fa48("19628") ? {} : (stryCov_9fa48("19628"), {
      ...query,
      cursor: first.next
    }));
    if (stryMutAct_9fa48("19629")) {
      ;
    } else {
      stryCov_9fa48("19629");
      assert.equal(second.items.length, 1);
    }
    if (stryMutAct_9fa48("19630")) {
      ;
    } else {
      stryCov_9fa48("19630");
      assert.equal(second.next, null);
    }
    const items = stryMutAct_9fa48("19631") ? [] : (stryCov_9fa48("19631"), [...first.items, ...second.items]);
    assert.equal(new Set(items.map(stryMutAct_9fa48("19633") ? () => undefined : (stryCov_9fa48("19633"), item => item.id))).size, 26);
    assert.ok(stryMutAct_9fa48("19635") ? items.some(item => item.id === ids[0]) : (stryCov_9fa48("19635"), !(stryMutAct_9fa48("19636") ? items.every(item => item.id === ids[0]) : (stryCov_9fa48("19636"), items.some(stryMutAct_9fa48("19637") ? () => undefined : (stryCov_9fa48("19637"), item => stryMutAct_9fa48("19640") ? item.id !== ids[0] : stryMutAct_9fa48("19639") ? false : stryMutAct_9fa48("19638") ? true : (stryCov_9fa48("19638", "19639", "19640"), item.id === ids[0])))))));
    for (const item of items) {
      if (stryMutAct_9fa48("19641")) {
        {}
      } else {
        stryCov_9fa48("19641");
        assert.deepEqual(stryMutAct_9fa48("19643") ? Object.keys(item) : (stryCov_9fa48("19643"), Object.keys(item).sort()), stryMutAct_9fa48("19644") ? [] : (stryCov_9fa48("19644"), [stryMutAct_9fa48("19645") ? "" : (stryCov_9fa48("19645"), 'author'), stryMutAct_9fa48("19646") ? "" : (stryCov_9fa48("19646"), 'id'), stryMutAct_9fa48("19647") ? "" : (stryCov_9fa48("19647"), 'kind'), stryMutAct_9fa48("19648") ? "" : (stryCov_9fa48("19648"), 'publishedAt'), stryMutAct_9fa48("19649") ? "" : (stryCov_9fa48("19649"), 'thumbnail'), stryMutAct_9fa48("19650") ? "" : (stryCov_9fa48("19650"), 'title')]));
        assert.deepEqual(item.author, stryMutAct_9fa48("19652") ? {} : (stryCov_9fa48("19652"), {
          handle: profile.handle,
          displayName: profile.displayName
        }));
      }
    }
    for (const secret of stryMutAct_9fa48("19653") ? [] : (stryCov_9fa48("19653"), [alice, bob, saved.id, stryMutAct_9fa48("19654") ? "" : (stryCov_9fa48("19654"), 'Secret client draft'), stryMutAct_9fa48("19655") ? "" : (stryCov_9fa48("19655"), 'operationId'), stryMutAct_9fa48("19656") ? "" : (stryCov_9fa48("19656"), 'Public note'), stryMutAct_9fa48("19657") ? "" : (stryCov_9fa48("19657"), 'Other account')])) assert.equal(JSON.stringify(items).includes(secret), stryMutAct_9fa48("19659") ? true : (stryCov_9fa48("19659"), false));
    assert.equal((await listPublicPublications(db, stryMutAct_9fa48("19661") ? {} : (stryCov_9fa48("19661"), {
      ...query,
      query: stryMutAct_9fa48("19662") ? "" : (stryCov_9fa48("19662"), 'new_alice')
    }))).items.length, 0);
    assert.equal((await listPublicPublications(db, stryMutAct_9fa48("19664") ? {} : (stryCov_9fa48("19664"), {
      ...query,
      query: stryMutAct_9fa48("19665") ? "" : (stryCov_9fa48("19665"), 'alice_keys')
    }))).items.length, 25);
    assert.equal((await listPublicPublications(db, stryMutAct_9fa48("19667") ? {} : (stryCov_9fa48("19667"), {
      ...query,
      query: stryMutAct_9fa48("19668") ? "" : (stryCov_9fa48("19668"), '%')
    }))).items.length, 0);
    assert.equal((await listPublicPublications(db, stryMutAct_9fa48("19670") ? {} : (stryCov_9fa48("19670"), {
      ...query,
      kind: stryMutAct_9fa48("19671") ? "" : (stryCov_9fa48("19671"), 'drop')
    }))).items.length, 0);
    for (const value of stryMutAct_9fa48("19672") ? [] : (stryCov_9fa48("19672"), [stryMutAct_9fa48("19673") ? "" : (stryCov_9fa48("19673"), 'kind=private'), (stryMutAct_9fa48("19674") ? "" : (stryCov_9fa48("19674"), 'q=')) + (stryMutAct_9fa48("19675") ? "" : (stryCov_9fa48("19675"), 'a')).repeat(101), stryMutAct_9fa48("19676") ? "" : (stryCov_9fa48("19676"), 'before=bad&id=valid-publication-id'), stryMutAct_9fa48("19677") ? "" : (stryCov_9fa48("19677"), 'id=valid-publication-id')])) assert.throws(stryMutAct_9fa48("19679") ? () => undefined : (stryCov_9fa48("19679"), () => parseDiscoveryQuery(new URLSearchParams(value))), stryMutAct_9fa48("19680") ? {} : (stryCov_9fa48("19680"), {
      code: stryMutAct_9fa48("19681") ? "" : (stryCov_9fa48("19681"), 'invalid_request')
    }));
  }
});
test(stryMutAct_9fa48("19683") ? "" : (stryCov_9fa48("19683"), 'discovery thumbnail recipes retain published colors and select Q1 geometry without private fields'), async t => {
  if (stryMutAct_9fa48("19684")) {
    {}
  } else {
    stryCov_9fa48("19684");
    const db = database(t);
    await saveProfile(db, alice, profile);
    const snapshot = stryMutAct_9fa48("19685") ? {} : (stryCov_9fa48("19685"), {
      ...defaultBuild,
      name: stryMutAct_9fa48("19686") ? "" : (stryCov_9fa48("19686"), 'private-thumbnail-build-name'),
      caseColor: stryMutAct_9fa48("19687") ? "" : (stryCov_9fa48("19687"), '#123456'),
      palette: stryMutAct_9fa48("19688") ? {} : (stryCov_9fa48("19688"), {
        name: stryMutAct_9fa48("19689") ? "" : (stryCov_9fa48("19689"), 'private-thumbnail-palette-name'),
        alpha: stryMutAct_9fa48("19690") ? "" : (stryCov_9fa48("19690"), '#654321'),
        mod: stryMutAct_9fa48("19691") ? "" : (stryCov_9fa48("19691"), '#abcdef'),
        accent: stryMutAct_9fa48("19692") ? "" : (stryCov_9fa48("19692"), '#fedcba'),
        space: stryMutAct_9fa48("19693") ? "" : (stryCov_9fa48("19693"), '#102030')
      })
    });
    const saved = await saveBuild(db, alice, save(snapshot, stryMutAct_9fa48("19694") ? "" : (stryCov_9fa48("19694"), 'thumbnail-initial-save')));
    const release = await publishBuild(db, alice, stryMutAct_9fa48("19695") ? {} : (stryCov_9fa48("19695"), {
      operationId: stryMutAct_9fa48("19696") ? "" : (stryCov_9fa48("19696"), 'thumbnail-first-release'),
      buildId: saved.id,
      title: stryMutAct_9fa48("19697") ? "" : (stryCov_9fa48("19697"), 'Shared colors'),
      note: stryMutAct_9fa48("19698") ? "Stryker was here!" : (stryCov_9fa48("19698"), ''),
      kind: stryMutAct_9fa48("19699") ? "" : (stryCov_9fa48("19699"), 'build')
    }));
    await saveBuild(db, alice, save(stryMutAct_9fa48("19700") ? {} : (stryCov_9fa48("19700"), {
      ...snapshot,
      caseColor: stryMutAct_9fa48("19701") ? "" : (stryCov_9fa48("19701"), '#ffffff'),
      palette: stryMutAct_9fa48("19702") ? {} : (stryCov_9fa48("19702"), {
        ...snapshot.palette,
        alpha: stryMutAct_9fa48("19703") ? "" : (stryCov_9fa48("19703"), '#000000')
      })
    }), stryMutAct_9fa48("19704") ? "" : (stryCov_9fa48("19704"), 'thumbnail-later-save')));
    const q1 = await saveBuild(db, alice, save(stryMutAct_9fa48("19705") ? {} : (stryCov_9fa48("19705"), {
      ...snapshot,
      layout: stryMutAct_9fa48("19706") ? "" : (stryCov_9fa48("19706"), '75'),
      selection: stryMutAct_9fa48("19707") ? {} : (stryCov_9fa48("19707"), {
        ...snapshot.selection,
        case: stryMutAct_9fa48("19708") ? "" : (stryCov_9fa48("19708"), 'q1-max-case'),
        pcb: stryMutAct_9fa48("19709") ? "" : (stryCov_9fa48("19709"), 'q1-max-pcb'),
        plate: stryMutAct_9fa48("19710") ? "" : (stryCov_9fa48("19710"), 'q1-max-plate')
      })
    }), stryMutAct_9fa48("19711") ? "" : (stryCov_9fa48("19711"), 'thumbnail-q1-save')));
    const q1Release = await publishBuild(db, alice, stryMutAct_9fa48("19712") ? {} : (stryCov_9fa48("19712"), {
      operationId: stryMutAct_9fa48("19713") ? "" : (stryCov_9fa48("19713"), 'thumbnail-q1-release'),
      buildId: q1.id,
      title: stryMutAct_9fa48("19714") ? "" : (stryCov_9fa48("19714"), 'Q1 shared colors'),
      note: stryMutAct_9fa48("19715") ? "Stryker was here!" : (stryCov_9fa48("19715"), ''),
      kind: stryMutAct_9fa48("19716") ? "" : (stryCov_9fa48("19716"), 'build')
    }));
    const result = await listPublicPublications(db, stryMutAct_9fa48("19717") ? {} : (stryCov_9fa48("19717"), {
      query: stryMutAct_9fa48("19718") ? "Stryker was here!" : (stryCov_9fa48("19718"), ''),
      kind: stryMutAct_9fa48("19719") ? "" : (stryCov_9fa48("19719"), 'all'),
      cursor: null
    }));
    assert.deepEqual(result.items.find(stryMutAct_9fa48("19721") ? () => undefined : (stryCov_9fa48("19721"), item => stryMutAct_9fa48("19724") ? item.id !== release.id : stryMutAct_9fa48("19723") ? false : stryMutAct_9fa48("19722") ? true : (stryCov_9fa48("19722", "19723", "19724"), item.id === release.id))).thumbnail, stryMutAct_9fa48("19725") ? {} : (stryCov_9fa48("19725"), {
      geometry: stryMutAct_9fa48("19726") ? "" : (stryCov_9fa48("19726"), 'generic-60'),
      caseColor: stryMutAct_9fa48("19727") ? "" : (stryCov_9fa48("19727"), '#123456'),
      colors: stryMutAct_9fa48("19728") ? {} : (stryCov_9fa48("19728"), {
        alpha: stryMutAct_9fa48("19729") ? "" : (stryCov_9fa48("19729"), '#654321'),
        mod: stryMutAct_9fa48("19730") ? "" : (stryCov_9fa48("19730"), '#abcdef'),
        accent: stryMutAct_9fa48("19731") ? "" : (stryCov_9fa48("19731"), '#fedcba'),
        space: stryMutAct_9fa48("19732") ? "" : (stryCov_9fa48("19732"), '#102030')
      })
    }));
    assert.equal(result.items.find(stryMutAct_9fa48("19734") ? () => undefined : (stryCov_9fa48("19734"), item => stryMutAct_9fa48("19737") ? item.id !== q1Release.id : stryMutAct_9fa48("19736") ? false : stryMutAct_9fa48("19735") ? true : (stryCov_9fa48("19735", "19736", "19737"), item.id === q1Release.id))).thumbnail.geometry, stryMutAct_9fa48("19738") ? "" : (stryCov_9fa48("19738"), 'q1-max-ansi'));
    for (const privateValue of stryMutAct_9fa48("19739") ? [] : (stryCov_9fa48("19739"), [snapshot.name, snapshot.palette.name, saved.id, q1.id, alice, stryMutAct_9fa48("19740") ? "" : (stryCov_9fa48("19740"), 'selection'), stryMutAct_9fa48("19741") ? "" : (stryCov_9fa48("19741"), 'customParts'), stryMutAct_9fa48("19742") ? "" : (stryCov_9fa48("19742"), 'audio')])) assert.equal(JSON.stringify(result).includes(privateValue), stryMutAct_9fa48("19744") ? true : (stryCov_9fa48("19744"), false));
  }
});
test(stryMutAct_9fa48("19746") ? "" : (stryCov_9fa48("19746"), 'publication search backfills Unicode names and maintains the derived index on withdrawal'), async t => {
  if (stryMutAct_9fa48("19747")) {
    {}
  } else {
    stryCov_9fa48("19747");
    const {
      listPublicPublications
    } = await import('../db/publications.ts');
    const db = database(t, 10);
    await saveProfile(db, alice, stryMutAct_9fa48("19748") ? {} : (stryCov_9fa48("19748"), {
      ...profile,
      displayName: stryMutAct_9fa48("19749") ? "" : (stryCov_9fa48("19749"), 'Élodie')
    }));
    const saved = await saveBuild(db, alice, save());
    const receipt = await publishBuild(db, alice, stryMutAct_9fa48("19750") ? {} : (stryCov_9fa48("19750"), {
      operationId: stryMutAct_9fa48("19751") ? "" : (stryCov_9fa48("19751"), 'unicode-search-publish'),
      buildId: saved.id,
      title: stryMutAct_9fa48("19752") ? "" : (stryCov_9fa48("19752"), 'Émeraude keyboard'),
      note: stryMutAct_9fa48("19753") ? "Stryker was here!" : (stryCov_9fa48("19753"), ''),
      kind: stryMutAct_9fa48("19754") ? "" : (stryCov_9fa48("19754"), 'build')
    }));
    db.sqlite.exec(readFileSync(new URL(stryMutAct_9fa48("19756") ? "" : (stryCov_9fa48("19756"), '../drizzle/0010_publication_search.sql'), import.meta.url), stryMutAct_9fa48("19757") ? "" : (stryCov_9fa48("19757"), 'utf8')));
    for (const query of stryMutAct_9fa48("19758") ? [] : (stryCov_9fa48("19758"), [stryMutAct_9fa48("19759") ? "" : (stryCov_9fa48("19759"), 'élodie'), stryMutAct_9fa48("19760") ? "" : (stryCov_9fa48("19760"), 'ELODIE'), stryMutAct_9fa48("19761") ? "" : (stryCov_9fa48("19761"), 'élo'), stryMutAct_9fa48("19762") ? "" : (stryCov_9fa48("19762"), 'élodie'), stryMutAct_9fa48("19763") ? "" : (stryCov_9fa48("19763"), 'émeraude'), stryMutAct_9fa48("19764") ? "" : (stryCov_9fa48("19764"), 'émer')])) {
      if (stryMutAct_9fa48("19765")) {
        {}
      } else {
        stryCov_9fa48("19765");
        const result = await listPublicPublications(db, stryMutAct_9fa48("19766") ? {} : (stryCov_9fa48("19766"), {
          query,
          kind: stryMutAct_9fa48("19767") ? "" : (stryCov_9fa48("19767"), 'all'),
          cursor: null
        }));
        assert.deepEqual(result.items.map(stryMutAct_9fa48("19769") ? () => undefined : (stryCov_9fa48("19769"), item => item.id)), stryMutAct_9fa48("19770") ? [] : (stryCov_9fa48("19770"), [receipt.id]));
      }
    }
    for (const query of stryMutAct_9fa48("19771") ? [] : (stryCov_9fa48("19771"), [stryMutAct_9fa48("19772") ? "" : (stryCov_9fa48("19772"), '%'), stryMutAct_9fa48("19773") ? "" : (stryCov_9fa48("19773"), '" OR "'), stryMutAct_9fa48("19774") ? "" : (stryCov_9fa48("19774"), 'élodie OR private')])) assert.equal((await listPublicPublications(db, stryMutAct_9fa48("19776") ? {} : (stryCov_9fa48("19776"), {
      query,
      kind: stryMutAct_9fa48("19777") ? "" : (stryCov_9fa48("19777"), 'all'),
      cursor: null
    }))).items.length, 0);
    await withdrawPublication(db, alice, receipt.id);
    assert.equal(db.sqlite.prepare(stryMutAct_9fa48("19779") ? "" : (stryCov_9fa48("19779"), 'SELECT count(*) AS count FROM community_publication_search')).get().count, 0);
  }
});
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
import { featuredBuilds, customizeFeatured } from '../lib/featured-builds.ts';
import { defaultBuild, parseBuild, encodeBuild, decodeBuild, buildReducer } from '../lib/build.ts';
import { parseDeck } from '../lib/control-deck.ts';
test(stryMutAct_9fa48("20196") ? "" : (stryCov_9fa48("20196"), 'every featured preset resolves to a valid, portable device-specific build'), () => {
  if (stryMutAct_9fa48("20197")) {
    {}
  } else {
    stryCov_9fa48("20197");
    assert.equal(new Set(featuredBuilds.map(stryMutAct_9fa48("20199") ? () => undefined : (stryCov_9fa48("20199"), item => item.id))).size, featuredBuilds.length);
    for (const item of featuredBuilds) {
      if (stryMutAct_9fa48("20200")) {
        {}
      } else {
        stryCov_9fa48("20200");
        if (stryMutAct_9fa48("20203") ? item.kind !== 'keyboard' : stryMutAct_9fa48("20202") ? false : stryMutAct_9fa48("20201") ? true : (stryCov_9fa48("20201", "20202", "20203"), item.kind === (stryMutAct_9fa48("20204") ? "" : (stryCov_9fa48("20204"), 'keyboard')))) {
          if (stryMutAct_9fa48("20205")) {
            {}
          } else {
            stryCov_9fa48("20205");
            if (stryMutAct_9fa48("20206")) {
              ;
            } else {
              stryCov_9fa48("20206");
              assert.deepEqual(parseBuild(item.build), item.build);
            }
            if (stryMutAct_9fa48("20207")) {
              ;
            } else {
              stryCov_9fa48("20207");
              assert.deepEqual(decodeBuild(encodeBuild(item.build)), item.build);
            }
          }
        } else if (stryMutAct_9fa48("20208")) {
          ;
        } else {
          stryCov_9fa48("20208");
          assert.deepEqual(parseDeck(item.build), item.build);
        }
      }
    }
  }
});
test(stryMutAct_9fa48("20210") ? "" : (stryCov_9fa48("20210"), 'customizing a featured keyboard retains imports and sound preferences and is undone as one edit'), () => {
  if (stryMutAct_9fa48("20211")) {
    {}
  } else {
    stryCov_9fa48("20211");
    const current = stryMutAct_9fa48("20212") ? {} : (stryCov_9fa48("20212"), {
      ...defaultBuild,
      name: stryMutAct_9fa48("20213") ? "" : (stryCov_9fa48("20213"), 'My saved keyboard'),
      audio: stryMutAct_9fa48("20214") ? {} : (stryCov_9fa48("20214"), {
        ...defaultBuild.audio,
        source: stryMutAct_9fa48("20215") ? "" : (stryCov_9fa48("20215"), 'mx-blue'),
        volume: 1.8
      }),
      customParts: stryMutAct_9fa48("20216") ? [] : (stryCov_9fa48("20216"), [stryMutAct_9fa48("20217") ? {} : (stryCov_9fa48("20217"), {
        id: stryMutAct_9fa48("20218") ? "" : (stryCov_9fa48("20218"), 'import:switch:test'),
        name: stryMutAct_9fa48("20219") ? "" : (stryCov_9fa48("20219"), 'Test'),
        brand: stryMutAct_9fa48("20220") ? "" : (stryCov_9fa48("20220"), 'Maker'),
        category: stryMutAct_9fa48("20221") ? "" : (stryCov_9fa48("20221"), 'switch'),
        detail: stryMutAct_9fa48("20222") ? "" : (stryCov_9fa48("20222"), 'Imported'),
        source: stryMutAct_9fa48("20223") ? "" : (stryCov_9fa48("20223"), 'https://example.com/switch'),
        family: stryMutAct_9fa48("20224") ? "" : (stryCov_9fa48("20224"), 'unverified'),
        evidence: stryMutAct_9fa48("20225") ? "" : (stryCov_9fa48("20225"), 'unknown')
      })])
    });
    const before = structuredClone(current);
    const history = stryMutAct_9fa48("20226") ? {} : (stryCov_9fa48("20226"), {
      past: stryMutAct_9fa48("20227") ? ["Stryker was here"] : (stryCov_9fa48("20227"), []),
      present: current,
      future: stryMutAct_9fa48("20228") ? ["Stryker was here"] : (stryCov_9fa48("20228"), []),
      group: null
    });
    for (const item of stryMutAct_9fa48("20229") ? featuredBuilds : (stryCov_9fa48("20229"), featuredBuilds.filter(stryMutAct_9fa48("20230") ? () => undefined : (stryCov_9fa48("20230"), item => stryMutAct_9fa48("20233") ? item.kind !== 'keyboard' : stryMutAct_9fa48("20232") ? false : stryMutAct_9fa48("20231") ? true : (stryCov_9fa48("20231", "20232", "20233"), item.kind === (stryMutAct_9fa48("20234") ? "" : (stryCov_9fa48("20234"), 'keyboard'))))))) {
      if (stryMutAct_9fa48("20235")) {
        {}
      } else {
        stryCov_9fa48("20235");
        const candidate = customizeFeatured(item, current);
        assert.deepEqual(current, before, stryMutAct_9fa48("20237") ? "" : (stryCov_9fa48("20237"), 'Preview and customization must not mutate the saved value'));
        if (stryMutAct_9fa48("20238")) {
          ;
        } else {
          stryCov_9fa48("20238");
          assert.deepEqual(candidate.audio, current.audio);
        }
        if (stryMutAct_9fa48("20239")) {
          ;
        } else {
          stryCov_9fa48("20239");
          assert.deepEqual(candidate.customParts, current.customParts);
        }
        const applied = buildReducer(history, stryMutAct_9fa48("20240") ? {} : (stryCov_9fa48("20240"), {
          kind: stryMutAct_9fa48("20241") ? "" : (stryCov_9fa48("20241"), 'edit'),
          patch: candidate
        }));
        if (stryMutAct_9fa48("20242")) {
          ;
        } else {
          stryCov_9fa48("20242");
          assert.deepEqual(applied.present.selection, item.build.selection);
        }
        assert.deepEqual(buildReducer(applied, stryMutAct_9fa48("20244") ? {} : (stryCov_9fa48("20244"), {
          kind: stryMutAct_9fa48("20245") ? "" : (stryCov_9fa48("20245"), 'undo')
        })).present, before);
      }
    }
  }
});
test(stryMutAct_9fa48("20247") ? "" : (stryCov_9fa48("20247"), 'volume accepts existing preferences and bounded gain through file and link parsing'), () => {
  if (stryMutAct_9fa48("20248")) {
    {}
  } else {
    stryCov_9fa48("20248");
    for (const volume of stryMutAct_9fa48("20249") ? [] : (stryCov_9fa48("20249"), [0, 0.12, 0.45, 1, 1.5, 2])) {
      if (stryMutAct_9fa48("20250")) {
        {}
      } else {
        stryCov_9fa48("20250");
        const build = stryMutAct_9fa48("20251") ? {} : (stryCov_9fa48("20251"), {
          ...defaultBuild,
          audio: stryMutAct_9fa48("20252") ? {} : (stryCov_9fa48("20252"), {
            ...defaultBuild.audio,
            volume
          })
        });
        if (stryMutAct_9fa48("20253")) {
          ;
        } else {
          stryCov_9fa48("20253");
          assert.equal(parseBuild(build).audio.volume, volume);
        }
        if (stryMutAct_9fa48("20254")) {
          ;
        } else {
          stryCov_9fa48("20254");
          assert.equal(decodeBuild(encodeBuild(build)).audio.volume, volume);
        }
      }
    }
    for (const volume of stryMutAct_9fa48("20255") ? [] : (stryCov_9fa48("20255"), [stryMutAct_9fa48("20256") ? +0.01 : (stryCov_9fa48("20256"), -0.01), 2.001, Infinity, NaN, stryMutAct_9fa48("20257") ? "" : (stryCov_9fa48("20257"), '2'), null])) assert.throws(stryMutAct_9fa48("20259") ? () => undefined : (stryCov_9fa48("20259"), () => parseBuild(stryMutAct_9fa48("20260") ? {} : (stryCov_9fa48("20260"), {
      ...defaultBuild,
      audio: stryMutAct_9fa48("20261") ? {} : (stryCov_9fa48("20261"), {
        ...defaultBuild.audio,
        volume
      })
    }))));
    assert.throws(stryMutAct_9fa48("20263") ? () => undefined : (stryCov_9fa48("20263"), () => parseBuild(stryMutAct_9fa48("20264") ? {} : (stryCov_9fa48("20264"), {
      ...defaultBuild,
      audio: stryMutAct_9fa48("20265") ? {} : (stryCov_9fa48("20265"), {
        ...defaultBuild.audio,
        damping: 1.5
      })
    }))));
  }
});
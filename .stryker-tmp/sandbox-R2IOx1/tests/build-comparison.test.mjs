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
import { compareBuilds } from '../lib/build-comparison.ts';
test(stryMutAct_9fa48("15477") ? "" : (stryCov_9fa48("15477"), 'comparison ignores names and unused imports but reports chosen visual and audio changes'), () => {
  if (stryMutAct_9fa48("15478")) {
    {}
  } else {
    stryCov_9fa48("15478");
    const before = structuredClone(defaultBuild);
    const after = structuredClone(defaultBuild);
    after.name = stryMutAct_9fa48("15479") ? "" : (stryCov_9fa48("15479"), 'Client revision');
    after.palette.name = stryMutAct_9fa48("15480") ? "" : (stryCov_9fa48("15480"), 'Renamed palette');
    assert.deepEqual(compareBuilds(before, after), stryMutAct_9fa48("15482") ? ["Stryker was here"] : (stryCov_9fa48("15482"), []));
    after.layout = stryMutAct_9fa48("15483") ? "" : (stryCov_9fa48("15483"), '75');
    after.palette.accent = stryMutAct_9fa48("15484") ? "" : (stryCov_9fa48("15484"), '#123456');
    after.audio.volume = 1.75;
    after.audio.damping = 0.9;
    assert.deepEqual(compareBuilds(before, after).map(stryMutAct_9fa48("15486") ? () => undefined : (stryCov_9fa48("15486"), row => row.label)), stryMutAct_9fa48("15487") ? [] : (stryCov_9fa48("15487"), [stryMutAct_9fa48("15488") ? "" : (stryCov_9fa48("15488"), 'Layout'), stryMutAct_9fa48("15489") ? "" : (stryCov_9fa48("15489"), 'accent key color'), stryMutAct_9fa48("15490") ? "" : (stryCov_9fa48("15490"), 'Playback volume'), stryMutAct_9fa48("15491") ? "" : (stryCov_9fa48("15491"), 'Sound damping')]));
    if (stryMutAct_9fa48("15492")) {
      ;
    } else {
      stryCov_9fa48("15492");
      assert.deepEqual(before, defaultBuild);
    }
  }
});
test(stryMutAct_9fa48("15494") ? "" : (stryCov_9fa48("15494"), 'accessory placement and quantity matter but selection identifiers and array order do not'), () => {
  if (stryMutAct_9fa48("15495")) {
    {}
  } else {
    stryCov_9fa48("15495");
    const original = stryMutAct_9fa48("15496") ? {} : (stryCov_9fa48("15496"), {
      ...defaultBuild,
      accessories: stryMutAct_9fa48("15497") ? [] : (stryCov_9fa48("15497"), [stryMutAct_9fa48("15498") ? {} : (stryCov_9fa48("15498"), {
        id: stryMutAct_9fa48("15499") ? "" : (stryCov_9fa48("15499"), 'one'),
        productId: stryMutAct_9fa48("15500") ? "" : (stryCov_9fa48("15500"), 'adafruit-377-encoder'),
        quantity: 1,
        location: stryMutAct_9fa48("15501") ? {} : (stryCov_9fa48("15501"), {
          kind: stryMutAct_9fa48("15502") ? "" : (stryCov_9fa48("15502"), 'embedded'),
          slotId: stryMutAct_9fa48("15503") ? "" : (stryCov_9fa48("15503"), 'unassigned')
        })
      }), stryMutAct_9fa48("15504") ? {} : (stryCov_9fa48("15504"), {
        id: stryMutAct_9fa48("15505") ? "" : (stryCov_9fa48("15505"), 'two'),
        productId: stryMutAct_9fa48("15506") ? "" : (stryCov_9fa48("15506"), 'adafruit-4980-neokey'),
        quantity: 1,
        location: stryMutAct_9fa48("15507") ? {} : (stryCov_9fa48("15507"), {
          kind: stryMutAct_9fa48("15508") ? "" : (stryCov_9fa48("15508"), 'external'),
          position: stryMutAct_9fa48("15509") ? "" : (stryCov_9fa48("15509"), 'left')
        })
      })])
    });
    const candidate = structuredClone(original);
    stryMutAct_9fa48("15511") ? candidate.accessories : (stryCov_9fa48("15511"), candidate.accessories.reverse());
    candidate.accessories[0].id = stryMutAct_9fa48("15512") ? "" : (stryCov_9fa48("15512"), 'new-id');
    assert.deepEqual(compareBuilds(original, candidate), stryMutAct_9fa48("15514") ? ["Stryker was here"] : (stryCov_9fa48("15514"), []));
    candidate.accessories[0].location.position = stryMutAct_9fa48("15515") ? "" : (stryCov_9fa48("15515"), 'right');
    candidate.accessories[0].quantity = 2;
    const changes = compareBuilds(original, candidate);
    if (stryMutAct_9fa48("15516")) {
      ;
    } else {
      stryCov_9fa48("15516");
      assert.equal(changes.length, 1);
    }
    assert.equal(changes[0].label, stryMutAct_9fa48("15518") ? "" : (stryCov_9fa48("15518"), 'Accessories'));
    assert.match(changes[0].after, stryMutAct_9fa48("15520") ? /× 2.external: right/ : (stryCov_9fa48("15520"), /× 2.*external: right/));
  }
});
test(stryMutAct_9fa48("15522") ? "" : (stryCov_9fa48("15522"), 'selected imported part details are compared while unused parts are ignored'), () => {
  if (stryMutAct_9fa48("15523")) {
    {}
  } else {
    stryCov_9fa48("15523");
    const part = stryMutAct_9fa48("15524") ? {} : (stryCov_9fa48("15524"), {
      id: stryMutAct_9fa48("15525") ? "" : (stryCov_9fa48("15525"), 'import:client-case'),
      category: stryMutAct_9fa48("15526") ? "" : (stryCov_9fa48("15526"), 'case'),
      name: stryMutAct_9fa48("15527") ? "" : (stryCov_9fa48("15527"), 'Custom case'),
      brand: stryMutAct_9fa48("15528") ? "" : (stryCov_9fa48("15528"), 'Maker'),
      detail: stryMutAct_9fa48("15529") ? "" : (stryCov_9fa48("15529"), 'Original dimensions'),
      source: stryMutAct_9fa48("15530") ? "" : (stryCov_9fa48("15530"), 'https://example.com/case'),
      family: stryMutAct_9fa48("15531") ? "" : (stryCov_9fa48("15531"), 'unknown'),
      evidence: stryMutAct_9fa48("15532") ? "" : (stryCov_9fa48("15532"), 'unknown')
    });
    const original = stryMutAct_9fa48("15533") ? {} : (stryCov_9fa48("15533"), {
      ...defaultBuild,
      selection: stryMutAct_9fa48("15534") ? {} : (stryCov_9fa48("15534"), {
        ...defaultBuild.selection,
        case: part.id
      }),
      customParts: stryMutAct_9fa48("15535") ? [] : (stryCov_9fa48("15535"), [part])
    });
    const candidate = structuredClone(original);
    candidate.customParts.push(stryMutAct_9fa48("15537") ? {} : (stryCov_9fa48("15537"), {
      ...part,
      id: stryMutAct_9fa48("15538") ? "" : (stryCov_9fa48("15538"), 'import:unused'),
      name: stryMutAct_9fa48("15539") ? "" : (stryCov_9fa48("15539"), 'Unused part')
    }));
    assert.deepEqual(compareBuilds(original, candidate), stryMutAct_9fa48("15541") ? ["Stryker was here"] : (stryCov_9fa48("15541"), []));
    candidate.customParts[0].detail = stryMutAct_9fa48("15542") ? "" : (stryCov_9fa48("15542"), 'Revised dimensions');
    assert.equal(compareBuilds(original, candidate)[0].label, stryMutAct_9fa48("15544") ? "" : (stryCov_9fa48("15544"), 'case'));
    if (stryMutAct_9fa48("15545")) {
      ;
    } else {
      stryCov_9fa48("15545");
      assert.match(compareBuilds(original, candidate)[0].after, /Revised dimensions/);
    }
  }
});
test(stryMutAct_9fa48("15547") ? "" : (stryCov_9fa48("15547"), 'distinct imported part identities and precise volume changes are not hidden by display labels'), () => {
  if (stryMutAct_9fa48("15548")) {
    {}
  } else {
    stryCov_9fa48("15548");
    const part = stryMutAct_9fa48("15549") ? {} : (stryCov_9fa48("15549"), {
      id: stryMutAct_9fa48("15550") ? "" : (stryCov_9fa48("15550"), 'import:first'),
      category: stryMutAct_9fa48("15551") ? "" : (stryCov_9fa48("15551"), 'case'),
      name: stryMutAct_9fa48("15552") ? "" : (stryCov_9fa48("15552"), 'Custom case'),
      brand: stryMutAct_9fa48("15553") ? "" : (stryCov_9fa48("15553"), 'Maker'),
      detail: stryMutAct_9fa48("15554") ? "" : (stryCov_9fa48("15554"), 'Case'),
      source: stryMutAct_9fa48("15555") ? "" : (stryCov_9fa48("15555"), 'https://example.com/case'),
      family: stryMutAct_9fa48("15556") ? "" : (stryCov_9fa48("15556"), 'unknown'),
      evidence: stryMutAct_9fa48("15557") ? "" : (stryCov_9fa48("15557"), 'unknown')
    });
    const original = stryMutAct_9fa48("15558") ? {} : (stryCov_9fa48("15558"), {
      ...defaultBuild,
      selection: stryMutAct_9fa48("15559") ? {} : (stryCov_9fa48("15559"), {
        ...defaultBuild.selection,
        case: part.id
      }),
      customParts: stryMutAct_9fa48("15560") ? [] : (stryCov_9fa48("15560"), [part])
    });
    const candidate = structuredClone(original);
    candidate.customParts[0].id = stryMutAct_9fa48("15561") ? "" : (stryCov_9fa48("15561"), 'import:second');
    candidate.selection.case = stryMutAct_9fa48("15562") ? "" : (stryCov_9fa48("15562"), 'import:second');
    assert.equal(stryMutAct_9fa48("15564") ? compareBuilds(original, candidate)[0].label : (stryCov_9fa48("15564"), compareBuilds(original, candidate)[0]?.label), stryMutAct_9fa48("15565") ? "" : (stryCov_9fa48("15565"), 'case'));
    const quiet = stryMutAct_9fa48("15566") ? {} : (stryCov_9fa48("15566"), {
      ...defaultBuild,
      audio: stryMutAct_9fa48("15567") ? {} : (stryCov_9fa48("15567"), {
        ...defaultBuild.audio,
        volume: 0.701
      })
    });
    const louder = stryMutAct_9fa48("15568") ? {} : (stryCov_9fa48("15568"), {
      ...quiet,
      audio: stryMutAct_9fa48("15569") ? {} : (stryCov_9fa48("15569"), {
        ...quiet.audio,
        volume: 0.702
      })
    });
    assert.equal(stryMutAct_9fa48("15571") ? compareBuilds(quiet, louder)[0].label : (stryCov_9fa48("15571"), compareBuilds(quiet, louder)[0]?.label), stryMutAct_9fa48("15572") ? "" : (stryCov_9fa48("15572"), 'Playback volume'));
  }
});
test(stryMutAct_9fa48("15574") ? "" : (stryCov_9fa48("15574"), 'comparison preserves saved maker evidence and exposes original and current source links'), async () => {
  if (stryMutAct_9fa48("15575")) {
    {}
  } else {
    stryCov_9fa48("15575");
    const {
      snapshotEvidence
    } = await import('../db/build-snapshot.ts');
    const {
      parsePublicBuildEvidence
    } = await import('../lib/build-evidence.ts');
    const evidence = parsePublicBuildEvidence(JSON.parse(await snapshotEvidence(defaultBuild)), defaultBuild);
    const part = evidence.components.find(stryMutAct_9fa48("15576") ? () => undefined : (stryCov_9fa48("15576"), item => stryMutAct_9fa48("15579") ? item.category !== 'case' : stryMutAct_9fa48("15578") ? false : stryMutAct_9fa48("15577") ? true : (stryCov_9fa48("15577", "15578", "15579"), item.category === (stryMutAct_9fa48("15580") ? "" : (stryCov_9fa48("15580"), 'case')))));
    part.name = stryMutAct_9fa48("15581") ? "" : (stryCov_9fa48("15581"), 'Original creator case');
    part.source = stryMutAct_9fa48("15582") ? "" : (stryCov_9fa48("15582"), 'https://example.com/original-case');
    const change = compareBuilds(defaultBuild, defaultBuild, evidence).find(stryMutAct_9fa48("15583") ? () => undefined : (stryCov_9fa48("15583"), item => stryMutAct_9fa48("15586") ? item.label !== 'case' : stryMutAct_9fa48("15585") ? false : stryMutAct_9fa48("15584") ? true : (stryCov_9fa48("15584", "15585", "15586"), item.label === (stryMutAct_9fa48("15587") ? "" : (stryCov_9fa48("15587"), 'case')))));
    if (stryMutAct_9fa48("15588")) {
      ;
    } else {
      stryCov_9fa48("15588");
      assert.match(change.before, /Original creator case/);
    }
    assert.equal(change.beforeSources[0].url, stryMutAct_9fa48("15590") ? "" : (stryCov_9fa48("15590"), 'https://example.com/original-case'));
    if (stryMutAct_9fa48("15591")) {
      ;
    } else {
      stryCov_9fa48("15591");
      assert.notEqual(change.afterSources[0].url, change.beforeSources[0].url);
    }
    if (stryMutAct_9fa48("15592")) {
      ;
    } else {
      stryCov_9fa48("15592");
      assert.equal(compareBuilds(defaultBuild, defaultBuild).length, 0);
    }
  }
});
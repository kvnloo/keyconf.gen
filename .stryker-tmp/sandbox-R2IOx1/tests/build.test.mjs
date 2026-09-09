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
import { buildReducer, defaultBuild, initialHistory, parseBuild, parseCustomParts, encodeBuild, decodeBuild, readBuildFile } from '../lib/build.ts';
const imported = stryMutAct_9fa48("15700") ? {} : (stryCov_9fa48("15700"), {
  id: stryMutAct_9fa48("15701") ? "" : (stryCov_9fa48("15701"), 'import:case:my-case'),
  name: stryMutAct_9fa48("15702") ? "" : (stryCov_9fa48("15702"), 'My case'),
  brand: stryMutAct_9fa48("15703") ? "" : (stryCov_9fa48("15703"), 'Maker'),
  category: stryMutAct_9fa48("15704") ? "" : (stryCov_9fa48("15704"), 'case'),
  detail: stryMutAct_9fa48("15705") ? "" : (stryCov_9fa48("15705"), 'Maker description'),
  source: stryMutAct_9fa48("15706") ? "" : (stryCov_9fa48("15706"), 'https://example.com/case'),
  family: stryMutAct_9fa48("15707") ? "" : (stryCov_9fa48("15707"), 'unverified'),
  evidence: stryMutAct_9fa48("15708") ? "" : (stryCov_9fa48("15708"), 'unknown')
});
test(stryMutAct_9fa48("15710") ? "" : (stryCov_9fa48("15710"), 'portable links restore a Unicode design and its selected custom parts on a clean catalog'), () => {
  if (stryMutAct_9fa48("15711")) {
    {}
  } else {
    stryCov_9fa48("15711");
    const original = stryMutAct_9fa48("15712") ? {} : (stryCov_9fa48("15712"), {
      ...defaultBuild,
      name: stryMutAct_9fa48("15713") ? "" : (stryCov_9fa48("15713"), '秋の keyboard 🎹'),
      caseColor: stryMutAct_9fa48("15714") ? "" : (stryCov_9fa48("15714"), '#aBc123'),
      layout: stryMutAct_9fa48("15715") ? "" : (stryCov_9fa48("15715"), '75'),
      customParts: stryMutAct_9fa48("15716") ? [] : (stryCov_9fa48("15716"), [imported, stryMutAct_9fa48("15717") ? {} : (stryCov_9fa48("15717"), {
        ...imported,
        id: stryMutAct_9fa48("15718") ? "" : (stryCov_9fa48("15718"), 'import:case:other')
      })]),
      selection: stryMutAct_9fa48("15719") ? {} : (stryCov_9fa48("15719"), {
        ...defaultBuild.selection,
        case: imported.id
      }),
      audio: stryMutAct_9fa48("15720") ? {} : (stryCov_9fa48("15720"), {
        ...defaultBuild.audio,
        source: stryMutAct_9fa48("15721") ? "" : (stryCov_9fa48("15721"), 'mx-blue'),
        volume: 0.12
      })
    });
    const decoded = decodeBuild(encodeBuild(original));
    assert.deepEqual(decoded, stryMutAct_9fa48("15723") ? {} : (stryCov_9fa48("15723"), {
      ...original,
      customParts: stryMutAct_9fa48("15724") ? [] : (stryCov_9fa48("15724"), [imported])
    }));
    assert.equal((stryMutAct_9fa48("15726") ? "" : (stryCov_9fa48("15726"), 'enabled')) in decoded.audio, stryMutAct_9fa48("15727") ? true : (stryCov_9fa48("15727"), false), stryMutAct_9fa48("15728") ? "" : (stryCov_9fa48("15728"), 'opening a link cannot enable audio'));
    assert.deepEqual(readBuildFile(JSON.stringify(stryMutAct_9fa48("15730") ? {} : (stryCov_9fa48("15730"), {
      version: 1,
      build: decoded,
      compatibility: stryMutAct_9fa48("15731") ? ["Stryker was here"] : (stryCov_9fa48("15731"), [])
    }))), decoded);
  }
});
test(stryMutAct_9fa48("15733") ? "" : (stryCov_9fa48("15733"), 'untrusted links cannot forge fit evidence, unsafe source links, missing parts or unsupported settings'), () => {
  if (stryMutAct_9fa48("15734")) {
    {}
  } else {
    stryCov_9fa48("15734");
    for (const change of stryMutAct_9fa48("15735") ? [] : (stryCov_9fa48("15735"), [stryMutAct_9fa48("15736") ? {} : (stryCov_9fa48("15736"), {
      version: 2
    }), stryMutAct_9fa48("15737") ? {} : (stryCov_9fa48("15737"), {
      layout: stryMutAct_9fa48("15738") ? "" : (stryCov_9fa48("15738"), '100')
    }), stryMutAct_9fa48("15739") ? {} : (stryCov_9fa48("15739"), {
      caseColor: stryMutAct_9fa48("15740") ? "" : (stryCov_9fa48("15740"), 'url(x)')
    }), stryMutAct_9fa48("15741") ? {} : (stryCov_9fa48("15741"), {
      palette: stryMutAct_9fa48("15742") ? {} : (stryCov_9fa48("15742"), {
        ...defaultBuild.palette,
        accent: stryMutAct_9fa48("15743") ? "" : (stryCov_9fa48("15743"), 'red')
      })
    }), stryMutAct_9fa48("15744") ? {} : (stryCov_9fa48("15744"), {
      audio: stryMutAct_9fa48("15745") ? {} : (stryCov_9fa48("15745"), {
        ...defaultBuild.audio,
        source: stryMutAct_9fa48("15746") ? "" : (stryCov_9fa48("15746"), 'does-not-exist')
      })
    }), stryMutAct_9fa48("15747") ? {} : (stryCov_9fa48("15747"), {
      audio: stryMutAct_9fa48("15748") ? {} : (stryCov_9fa48("15748"), {
        ...defaultBuild.audio,
        volume: Infinity
      })
    }), stryMutAct_9fa48("15749") ? {} : (stryCov_9fa48("15749"), {
      selection: stryMutAct_9fa48("15750") ? {} : (stryCov_9fa48("15750"), {
        ...defaultBuild.selection,
        case: stryMutAct_9fa48("15751") ? "" : (stryCov_9fa48("15751"), 'redux-pcb')
      })
    }), stryMutAct_9fa48("15752") ? {} : (stryCov_9fa48("15752"), {
      customParts: stryMutAct_9fa48("15753") ? [] : (stryCov_9fa48("15753"), [stryMutAct_9fa48("15754") ? {} : (stryCov_9fa48("15754"), {
        ...imported,
        source: stryMutAct_9fa48("15755") ? "" : (stryCov_9fa48("15755"), 'javascript:alert(1)')
      })])
    }), stryMutAct_9fa48("15756") ? {} : (stryCov_9fa48("15756"), {
      customParts: stryMutAct_9fa48("15757") ? [] : (stryCov_9fa48("15757"), [stryMutAct_9fa48("15758") ? {} : (stryCov_9fa48("15758"), {
        ...imported,
        source: stryMutAct_9fa48("15759") ? "" : (stryCov_9fa48("15759"), 'https://localhost')
      })])
    }), stryMutAct_9fa48("15760") ? {} : (stryCov_9fa48("15760"), {
      customParts: stryMutAct_9fa48("15761") ? [] : (stryCov_9fa48("15761"), [stryMutAct_9fa48("15762") ? {} : (stryCov_9fa48("15762"), {
        ...imported,
        evidence: stryMutAct_9fa48("15763") ? "" : (stryCov_9fa48("15763"), 'documented')
      })])
    }), stryMutAct_9fa48("15764") ? {} : (stryCov_9fa48("15764"), {
      customParts: stryMutAct_9fa48("15765") ? [] : (stryCov_9fa48("15765"), [stryMutAct_9fa48("15766") ? {} : (stryCov_9fa48("15766"), {
        ...imported,
        id: stryMutAct_9fa48("15767") ? "" : (stryCov_9fa48("15767"), 'tofu-case')
      })])
    }), stryMutAct_9fa48("15768") ? {} : (stryCov_9fa48("15768"), {
      customParts: stryMutAct_9fa48("15769") ? [] : (stryCov_9fa48("15769"), [imported, imported])
    })])) assert.throws(stryMutAct_9fa48("15771") ? () => undefined : (stryCov_9fa48("15771"), () => parseBuild(stryMutAct_9fa48("15772") ? {} : (stryCov_9fa48("15772"), {
      ...defaultBuild,
      ...change
    }))));
    assert.equal(parseCustomParts(stryMutAct_9fa48("15774") ? [] : (stryCov_9fa48("15774"), [stryMutAct_9fa48("15775") ? {} : (stryCov_9fa48("15775"), {
      ...imported,
      family: stryMutAct_9fa48("15776") ? "" : (stryCov_9fa48("15776"), 'tofu60')
    })]))[0].family, stryMutAct_9fa48("15777") ? "" : (stryCov_9fa48("15777"), 'unverified'));
    for (const link of stryMutAct_9fa48("15778") ? [] : (stryCov_9fa48("15778"), [stryMutAct_9fa48("15779") ? "" : (stryCov_9fa48("15779"), 'broken'), stryMutAct_9fa48("15780") ? "" : (stryCov_9fa48("15780"), 'abc%'), (stryMutAct_9fa48("15781") ? "" : (stryCov_9fa48("15781"), 'a')).repeat(24_001), btoa(stryMutAct_9fa48("15782") ? "" : (stryCov_9fa48("15782"), '{"version":2}'))])) assert.throws(stryMutAct_9fa48("15784") ? () => undefined : (stryCov_9fa48("15784"), () => decodeBuild(link)));
    assert.throws(stryMutAct_9fa48("15786") ? () => undefined : (stryCov_9fa48("15786"), () => readBuildFile(stryMutAct_9fa48("15787") ? "" : (stryCov_9fa48("15787"), '{bad json'))));
    assert.throws(stryMutAct_9fa48("15789") ? () => undefined : (stryCov_9fa48("15789"), () => readBuildFile((stryMutAct_9fa48("15790") ? "" : (stryCov_9fa48("15790"), ' ')).repeat(1_000_001))));
  }
});
test(stryMutAct_9fa48("15792") ? "" : (stryCov_9fa48("15792"), 'undo and redo preserve full component/audio changes and discard an abandoned redo branch'), () => {
  if (stryMutAct_9fa48("15793")) {
    {}
  } else {
    stryCov_9fa48("15793");
    const first = buildReducer(initialHistory, stryMutAct_9fa48("15794") ? {} : (stryCov_9fa48("15794"), {
      kind: stryMutAct_9fa48("15795") ? "" : (stryCov_9fa48("15795"), 'edit'),
      patch: stryMutAct_9fa48("15796") ? {} : (stryCov_9fa48("15796"), {
        layout: stryMutAct_9fa48("15797") ? "" : (stryCov_9fa48("15797"), '65')
      })
    }));
    const second = buildReducer(first, stryMutAct_9fa48("15798") ? {} : (stryCov_9fa48("15798"), {
      kind: stryMutAct_9fa48("15799") ? "" : (stryCov_9fa48("15799"), 'edit'),
      patch: stryMutAct_9fa48("15800") ? {} : (stryCov_9fa48("15800"), {
        audio: stryMutAct_9fa48("15801") ? {} : (stryCov_9fa48("15801"), {
          ...defaultBuild.audio,
          source: stryMutAct_9fa48("15802") ? "" : (stryCov_9fa48("15802"), 'mx-blue')
        })
      })
    }));
    const undone = buildReducer(second, stryMutAct_9fa48("15803") ? {} : (stryCov_9fa48("15803"), {
      kind: stryMutAct_9fa48("15804") ? "" : (stryCov_9fa48("15804"), 'undo')
    }));
    if (stryMutAct_9fa48("15805")) {
      ;
    } else {
      stryCov_9fa48("15805");
      assert.deepEqual(undone.present, first.present);
    }
    assert.deepEqual(buildReducer(undone, stryMutAct_9fa48("15807") ? {} : (stryCov_9fa48("15807"), {
      kind: stryMutAct_9fa48("15808") ? "" : (stryCov_9fa48("15808"), 'redo')
    })).present, second.present);
    const newBranch = buildReducer(undone, stryMutAct_9fa48("15809") ? {} : (stryCov_9fa48("15809"), {
      kind: stryMutAct_9fa48("15810") ? "" : (stryCov_9fa48("15810"), 'edit'),
      patch: stryMutAct_9fa48("15811") ? {} : (stryCov_9fa48("15811"), {
        layout: stryMutAct_9fa48("15812") ? "" : (stryCov_9fa48("15812"), '75')
      })
    }));
    if (stryMutAct_9fa48("15813")) {
      ;
    } else {
      stryCov_9fa48("15813");
      assert.equal(newBranch.future.length, 0);
    }
    assert.equal(buildReducer(newBranch, stryMutAct_9fa48("15815") ? {} : (stryCov_9fa48("15815"), {
      kind: stryMutAct_9fa48("15816") ? "" : (stryCov_9fa48("15816"), 'redo')
    })), newBranch);
  }
});
test(stryMutAct_9fa48("15818") ? "" : (stryCov_9fa48("15818"), 'continuous gestures undo as one change and history has a bounded size'), () => {
  if (stryMutAct_9fa48("15819")) {
    {}
  } else {
    stryCov_9fa48("15819");
    let state = initialHistory;
    for (let i = 1; stryMutAct_9fa48("15822") ? i >= 20 : stryMutAct_9fa48("15821") ? i <= 20 : stryMutAct_9fa48("15820") ? false : (stryCov_9fa48("15820", "15821", "15822"), i < 20); stryMutAct_9fa48("15823") ? i-- : (stryCov_9fa48("15823"), i++)) state = buildReducer(state, stryMutAct_9fa48("15824") ? {} : (stryCov_9fa48("15824"), {
      kind: stryMutAct_9fa48("15825") ? "" : (stryCov_9fa48("15825"), 'edit'),
      patch: stryMutAct_9fa48("15826") ? {} : (stryCov_9fa48("15826"), {
        name: (stryMutAct_9fa48("15827") ? "" : (stryCov_9fa48("15827"), 'Build ')) + i
      }),
      group: stryMutAct_9fa48("15828") ? "" : (stryCov_9fa48("15828"), 'name')
    }));
    if (stryMutAct_9fa48("15829")) {
      ;
    } else {
      stryCov_9fa48("15829");
      assert.equal(state.past.length, 1);
    }
    assert.deepEqual(buildReducer(state, stryMutAct_9fa48("15831") ? {} : (stryCov_9fa48("15831"), {
      kind: stryMutAct_9fa48("15832") ? "" : (stryCov_9fa48("15832"), 'undo')
    })).present, defaultBuild);
    state = buildReducer(state, stryMutAct_9fa48("15833") ? {} : (stryCov_9fa48("15833"), {
      kind: stryMutAct_9fa48("15834") ? "" : (stryCov_9fa48("15834"), 'commit')
    }));
    state = buildReducer(state, stryMutAct_9fa48("15835") ? {} : (stryCov_9fa48("15835"), {
      kind: stryMutAct_9fa48("15836") ? "" : (stryCov_9fa48("15836"), 'edit'),
      patch: stryMutAct_9fa48("15837") ? {} : (stryCov_9fa48("15837"), {
        name: stryMutAct_9fa48("15838") ? "" : (stryCov_9fa48("15838"), 'Next')
      }),
      group: stryMutAct_9fa48("15839") ? "" : (stryCov_9fa48("15839"), 'name')
    }));
    if (stryMutAct_9fa48("15840")) {
      ;
    } else {
      stryCov_9fa48("15840");
      assert.equal(state.past.length, 2);
    }
    for (let i = 0; stryMutAct_9fa48("15843") ? i >= 100 : stryMutAct_9fa48("15842") ? i <= 100 : stryMutAct_9fa48("15841") ? false : (stryCov_9fa48("15841", "15842", "15843"), i < 100); stryMutAct_9fa48("15844") ? i-- : (stryCov_9fa48("15844"), i++)) state = buildReducer(state, stryMutAct_9fa48("15845") ? {} : (stryCov_9fa48("15845"), {
      kind: stryMutAct_9fa48("15846") ? "" : (stryCov_9fa48("15846"), 'edit'),
      patch: stryMutAct_9fa48("15847") ? {} : (stryCov_9fa48("15847"), {
        name: (stryMutAct_9fa48("15848") ? "" : (stryCov_9fa48("15848"), 'Different ')) + i
      })
    }));
    if (stryMutAct_9fa48("15849")) {
      ;
    } else {
      stryCov_9fa48("15849");
      assert.equal(state.past.length, 60);
    }
    const noChange = buildReducer(state, stryMutAct_9fa48("15850") ? {} : (stryCov_9fa48("15850"), {
      kind: stryMutAct_9fa48("15851") ? "" : (stryCov_9fa48("15851"), 'edit'),
      patch: stryMutAct_9fa48("15852") ? {} : (stryCov_9fa48("15852"), {
        name: state.present.name
      })
    }));
    if (stryMutAct_9fa48("15853")) {
      ;
    } else {
      stryCov_9fa48("15853");
      assert.equal(noChange, state);
    }
  }
});
test(stryMutAct_9fa48("15855") ? "" : (stryCov_9fa48("15855"), 'older exports restore their design, components and recording without trusting exported fit claims'), () => {
  if (stryMutAct_9fa48("15856")) {
    {}
  } else {
    stryCov_9fa48("15856");
    const legacy = stryMutAct_9fa48("15857") ? {} : (stryCov_9fa48("15857"), {
      version: 1,
      visualStudy: stryMutAct_9fa48("15858") ? {} : (stryCov_9fa48("15858"), {
        ...defaultBuild.palette,
        layout: stryMutAct_9fa48("15859") ? "" : (stryCov_9fa48("15859"), '65'),
        caseColor: stryMutAct_9fa48("15860") ? "" : (stryCov_9fa48("15860"), '#112233'),
        finish: stryMutAct_9fa48("15861") ? "" : (stryCov_9fa48("15861"), 'Brass'),
        profile: stryMutAct_9fa48("15862") ? "" : (stryCov_9fa48("15862"), 'Sculpted'),
        exploded: stryMutAct_9fa48("15863") ? false : (stryCov_9fa48("15863"), true)
      }),
      components: Object.entries(defaultBuild.selection).map(stryMutAct_9fa48("15864") ? () => undefined : (stryCov_9fa48("15864"), ([category, id]) => stryMutAct_9fa48("15865") ? {} : (stryCov_9fa48("15865"), {
        category,
        id
      }))),
      sound: stryMutAct_9fa48("15866") ? {} : (stryCov_9fa48("15866"), {
        enabled: stryMutAct_9fa48("15867") ? false : (stryCov_9fa48("15867"), true),
        character: stryMutAct_9fa48("15868") ? "" : (stryCov_9fa48("15868"), 'linear'),
        volume: 0.7,
        damping: 0.2,
        source: stryMutAct_9fa48("15869") ? {} : (stryCov_9fa48("15869"), {
          kind: stryMutAct_9fa48("15870") ? "" : (stryCov_9fa48("15870"), 'recorded'),
          id: stryMutAct_9fa48("15871") ? "" : (stryCov_9fa48("15871"), 'mx-blue')
        })
      }),
      compatibility: stryMutAct_9fa48("15872") ? [] : (stryCov_9fa48("15872"), [stryMutAct_9fa48("15873") ? {} : (stryCov_9fa48("15873"), {
        status: stryMutAct_9fa48("15874") ? "" : (stryCov_9fa48("15874"), 'documented'),
        title: stryMutAct_9fa48("15875") ? "" : (stryCov_9fa48("15875"), 'Fabricated full compatibility')
      })])
    });
    const restored = readBuildFile(JSON.stringify(legacy));
    assert.equal(restored.layout, stryMutAct_9fa48("15877") ? "" : (stryCov_9fa48("15877"), '65'));
    assert.equal(restored.caseColor, stryMutAct_9fa48("15879") ? "" : (stryCov_9fa48("15879"), '#112233'));
    assert.equal(restored.finish, stryMutAct_9fa48("15881") ? "" : (stryCov_9fa48("15881"), 'Brass'));
    assert.equal(restored.audio.source, stryMutAct_9fa48("15883") ? "" : (stryCov_9fa48("15883"), 'mx-blue'));
    if (stryMutAct_9fa48("15884")) {
      ;
    } else {
      stryCov_9fa48("15884");
      assert.equal(restored.audio.volume, 0.7);
    }
    assert.equal((stryMutAct_9fa48("15886") ? "" : (stryCov_9fa48("15886"), 'compatibility')) in restored, stryMutAct_9fa48("15887") ? true : (stryCov_9fa48("15887"), false));
    assert.equal((stryMutAct_9fa48("15889") ? "" : (stryCov_9fa48("15889"), 'enabled')) in restored.audio, stryMutAct_9fa48("15890") ? true : (stryCov_9fa48("15890"), false));
    if (stryMutAct_9fa48("15891")) {
      ;
    } else {
      stryCov_9fa48("15891");
      assert.deepEqual(restored.selection, defaultBuild.selection);
    }
    assert.equal(readBuildFile(JSON.stringify(stryMutAct_9fa48("15893") ? {} : (stryCov_9fa48("15893"), {
      ...legacy,
      sound: stryMutAct_9fa48("15894") ? {} : (stryCov_9fa48("15894"), {
        character: stryMutAct_9fa48("15895") ? "" : (stryCov_9fa48("15895"), 'linear'),
        volume: 0.5,
        damping: 0.5
      })
    }))).audio.source, stryMutAct_9fa48("15896") ? "" : (stryCov_9fa48("15896"), 'synthesized'));
    assert.throws(stryMutAct_9fa48("15898") ? () => undefined : (stryCov_9fa48("15898"), () => readBuildFile(JSON.stringify(stryMutAct_9fa48("15899") ? {} : (stryCov_9fa48("15899"), {
      ...legacy,
      components: stryMutAct_9fa48("15900") ? [] : (stryCov_9fa48("15900"), [legacy.components[0], ...(stryMutAct_9fa48("15901") ? legacy.components : (stryCov_9fa48("15901"), legacy.components.slice(0, stryMutAct_9fa48("15902") ? +1 : (stryCov_9fa48("15902"), -1))))])
    })))));
    assert.throws(stryMutAct_9fa48("15904") ? () => undefined : (stryCov_9fa48("15904"), () => readBuildFile(JSON.stringify(stryMutAct_9fa48("15905") ? {} : (stryCov_9fa48("15905"), {
      ...legacy,
      sound: stryMutAct_9fa48("15906") ? {} : (stryCov_9fa48("15906"), {
        ...legacy.sound,
        source: stryMutAct_9fa48("15907") ? {} : (stryCov_9fa48("15907"), {
          kind: stryMutAct_9fa48("15908") ? "" : (stryCov_9fa48("15908"), 'recorded'),
          id: stryMutAct_9fa48("15909") ? "" : (stryCov_9fa48("15909"), 'unknown-pack')
        })
      })
    })))));
  }
});
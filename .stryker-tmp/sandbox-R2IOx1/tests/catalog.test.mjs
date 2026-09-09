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
import { catalog, categories, checkBuild } from '../lib/catalog.ts';
import { assemblies, pcbInterfaces } from '../lib/component-data.ts';
import { defaultBuild, encodeBuild, decodeBuild, buildReducer, initialHistory } from '../lib/build.ts';
test(stryMutAct_9fa48("16398") ? "" : (stryCov_9fa48("16398"), 'every starting assembly resolves six distinct-category products with documented core fit'), () => {
  if (stryMutAct_9fa48("16399")) {
    {}
  } else {
    stryCov_9fa48("16399");
    assert.equal(new Set(catalog.map(stryMutAct_9fa48("16401") ? () => undefined : (stryCov_9fa48("16401"), part => part.id))).size, catalog.length);
    assert.deepEqual(stryMutAct_9fa48("16403") ? [...new Set(assemblies.map(assembly => assembly.layout))] : (stryCov_9fa48("16403"), (stryMutAct_9fa48("16404") ? [] : (stryCov_9fa48("16404"), [...new Set(assemblies.map(stryMutAct_9fa48("16405") ? () => undefined : (stryCov_9fa48("16405"), assembly => assembly.layout)))])).sort()), stryMutAct_9fa48("16406") ? [] : (stryCov_9fa48("16406"), [stryMutAct_9fa48("16407") ? "" : (stryCov_9fa48("16407"), '60'), stryMutAct_9fa48("16408") ? "" : (stryCov_9fa48("16408"), '65'), stryMutAct_9fa48("16409") ? "" : (stryCov_9fa48("16409"), '75')]));
    for (const assembly of assemblies) {
      if (stryMutAct_9fa48("16410")) {
        {}
      } else {
        stryCov_9fa48("16410");
        for (const category of categories) {
          if (stryMutAct_9fa48("16411")) {
            {}
          } else {
            stryCov_9fa48("16411");
            const part = catalog.find(stryMutAct_9fa48("16412") ? () => undefined : (stryCov_9fa48("16412"), part => stryMutAct_9fa48("16415") ? part.id !== assembly.selection[category] : stryMutAct_9fa48("16414") ? false : stryMutAct_9fa48("16413") ? true : (stryCov_9fa48("16413", "16414", "16415"), part.id === assembly.selection[category])));
            assert.equal(stryMutAct_9fa48("16417") ? part.category : (stryCov_9fa48("16417"), part?.category), category, stryMutAct_9fa48("16418") ? `` : (stryCov_9fa48("16418"), `${assembly.name}: ${category}`));
            assert.equal(new URL(part.source).protocol, stryMutAct_9fa48("16420") ? "" : (stryCov_9fa48("16420"), 'https:'));
          }
        }
        const checks = checkBuild(assembly.selection, catalog, assembly.layout);
        assert.equal(checks[0].status, stryMutAct_9fa48("16422") ? "" : (stryCov_9fa48("16422"), 'documented'), assembly.name);
        assert.ok(stryMutAct_9fa48("16424") ? checks.some(check => check.status === 'incompatible') : (stryCov_9fa48("16424"), !(stryMutAct_9fa48("16425") ? checks.every(check => check.status === 'incompatible') : (stryCov_9fa48("16425"), checks.some(stryMutAct_9fa48("16426") ? () => undefined : (stryCov_9fa48("16426"), check => stryMutAct_9fa48("16429") ? check.status !== 'incompatible' : stryMutAct_9fa48("16428") ? false : stryMutAct_9fa48("16427") ? true : (stryCov_9fa48("16427", "16428", "16429"), check.status === (stryMutAct_9fa48("16430") ? "" : (stryCov_9fa48("16430"), 'incompatible')))))))), assembly.name);
        assert.equal(stryMutAct_9fa48("16432") ? checks.find(check => check.title === 'Keycap kit & row coverage').status : (stryCov_9fa48("16432"), checks.find(stryMutAct_9fa48("16433") ? () => undefined : (stryCov_9fa48("16433"), check => stryMutAct_9fa48("16436") ? check.title !== 'Keycap kit & row coverage' : stryMutAct_9fa48("16435") ? false : stryMutAct_9fa48("16434") ? true : (stryCov_9fa48("16434", "16435", "16436"), check.title === (stryMutAct_9fa48("16437") ? "" : (stryCov_9fa48("16437"), 'Keycap kit & row coverage')))))?.status), assembly.suppliedKeycaps ? stryMutAct_9fa48("16438") ? "" : (stryCov_9fa48("16438"), 'documented') : stryMutAct_9fa48("16439") ? "" : (stryCov_9fa48("16439"), 'unknown'));
      }
    }
  }
});
test(stryMutAct_9fa48("16441") ? "" : (stryCov_9fa48("16441"), 'magnetic compatibility distinguishes the specified double-rail family from excluded and unknown magnets'), () => {
  if (stryMutAct_9fa48("16442")) {
    {}
  } else {
    stryCov_9fa48("16442");
    const he = assemblies.find(stryMutAct_9fa48("16443") ? () => undefined : (stryCov_9fa48("16443"), a => stryMutAct_9fa48("16446") ? a.id !== 'q1-he' : stryMutAct_9fa48("16445") ? false : stryMutAct_9fa48("16444") ? true : (stryCov_9fa48("16444", "16445", "16446"), a.id === (stryMutAct_9fa48("16447") ? "" : (stryCov_9fa48("16447"), 'q1-he')))));
    for (const id of stryMutAct_9fa48("16448") ? [] : (stryCov_9fa48("16448"), [stryMutAct_9fa48("16449") ? "" : (stryCov_9fa48("16449"), 'double-rail-dawn'), stryMutAct_9fa48("16450") ? "" : (stryCov_9fa48("16450"), 'double-rail-nebula'), stryMutAct_9fa48("16451") ? "" : (stryCov_9fa48("16451"), 'double-rail-aurora')])) {
      if (stryMutAct_9fa48("16452")) {
        {}
      } else {
        stryCov_9fa48("16452");
        assert.equal(checkBuild(stryMutAct_9fa48("16454") ? {} : (stryCov_9fa48("16454"), {
          ...he.selection,
          switch: id
        }), catalog, stryMutAct_9fa48("16455") ? "" : (stryCov_9fa48("16455"), '75'))[1].status, stryMutAct_9fa48("16456") ? "" : (stryCov_9fa48("16456"), 'documented'));
      }
    }
    for (const id of stryMutAct_9fa48("16457") ? [] : (stryCov_9fa48("16457"), [stryMutAct_9fa48("16458") ? "" : (stryCov_9fa48("16458"), 'oil-king'), stryMutAct_9fa48("16459") ? "" : (stryCov_9fa48("16459"), 'magnetic-jade'), stryMutAct_9fa48("16460") ? "" : (stryCov_9fa48("16460"), 'magnetic-ks-20')])) {
      if (stryMutAct_9fa48("16461")) {
        {}
      } else {
        stryCov_9fa48("16461");
        assert.equal(checkBuild(stryMutAct_9fa48("16463") ? {} : (stryCov_9fa48("16463"), {
          ...he.selection,
          switch: id
        }), catalog, stryMutAct_9fa48("16464") ? "" : (stryCov_9fa48("16464"), '75'))[1].status, stryMutAct_9fa48("16465") ? "" : (stryCov_9fa48("16465"), 'incompatible'));
      }
    }
    assert.equal(checkBuild(stryMutAct_9fa48("16467") ? {} : (stryCov_9fa48("16467"), {
      ...he.selection,
      switch: stryMutAct_9fa48("16468") ? "" : (stryCov_9fa48("16468"), 'he-switch')
    }), catalog, stryMutAct_9fa48("16469") ? "" : (stryCov_9fa48("16469"), '75'))[1].status, stryMutAct_9fa48("16470") ? "" : (stryCov_9fa48("16470"), 'unknown'));
    for (const assembly of stryMutAct_9fa48("16471") ? assemblies : (stryCov_9fa48("16471"), assemblies.filter(stryMutAct_9fa48("16472") ? () => undefined : (stryCov_9fa48("16472"), a => stryMutAct_9fa48("16475") ? pcbInterfaces[a.selection.pcb] !== 'mx-contact' : stryMutAct_9fa48("16474") ? false : stryMutAct_9fa48("16473") ? true : (stryCov_9fa48("16473", "16474", "16475"), pcbInterfaces[a.selection.pcb] === (stryMutAct_9fa48("16476") ? "" : (stryCov_9fa48("16476"), 'mx-contact'))))))) {
      if (stryMutAct_9fa48("16477")) {
        {}
      } else {
        stryCov_9fa48("16477");
        assert.equal(checkBuild(stryMutAct_9fa48("16479") ? {} : (stryCov_9fa48("16479"), {
          ...assembly.selection,
          switch: stryMutAct_9fa48("16480") ? "" : (stryCov_9fa48("16480"), 'double-rail-nebula')
        }), catalog, assembly.layout)[1].status, stryMutAct_9fa48("16481") ? "" : (stryCov_9fa48("16481"), 'incompatible'));
      }
    }
  }
});
test(stryMutAct_9fa48("16483") ? "" : (stryCov_9fa48("16483"), 'Q1 HE 8K uses its own assembly and Lime reference without resolving conflicting Jade guidance'), () => {
  if (stryMutAct_9fa48("16484")) {
    {}
  } else {
    stryCov_9fa48("16484");
    const kit = assemblies.find(stryMutAct_9fa48("16485") ? () => undefined : (stryCov_9fa48("16485"), a => stryMutAct_9fa48("16488") ? a.id !== 'q1-he-8k' : stryMutAct_9fa48("16487") ? false : stryMutAct_9fa48("16486") ? true : (stryCov_9fa48("16486", "16487", "16488"), a.id === (stryMutAct_9fa48("16489") ? "" : (stryCov_9fa48("16489"), 'q1-he-8k')))));
    if (stryMutAct_9fa48("16490")) {
      ;
    } else {
      stryCov_9fa48("16490");
      assert.ok(kit);
    }
    const checks = checkBuild(kit.selection, catalog, stryMutAct_9fa48("16491") ? "" : (stryCov_9fa48("16491"), '75'));
    assert.equal(checks[0].status, stryMutAct_9fa48("16493") ? "" : (stryCov_9fa48("16493"), 'documented'));
    assert.equal(checks[1].status, stryMutAct_9fa48("16495") ? "" : (stryCov_9fa48("16495"), 'documented'));
    assert.equal(checks[2].status, stryMutAct_9fa48("16497") ? "" : (stryCov_9fa48("16497"), 'documented'));
    if (stryMutAct_9fa48("16498")) {
      ;
    } else {
      stryCov_9fa48("16498");
      assert.match(kit.note, /not measured latency/);
    }
    if (stryMutAct_9fa48("16499")) {
      ;
    } else {
      stryCov_9fa48("16499");
      assert.match(kit.note, /unresolved/);
    }
    for (const id of stryMutAct_9fa48("16500") ? [] : (stryCov_9fa48("16500"), [stryMutAct_9fa48("16501") ? "" : (stryCov_9fa48("16501"), 'magnetic-jade'), stryMutAct_9fa48("16502") ? "" : (stryCov_9fa48("16502"), 'double-rail-nebula')])) assert.equal(checkBuild(stryMutAct_9fa48("16504") ? {} : (stryCov_9fa48("16504"), {
      ...kit.selection,
      switch: id
    }), catalog, stryMutAct_9fa48("16505") ? "" : (stryCov_9fa48("16505"), '75'))[1].status, stryMutAct_9fa48("16506") ? "" : (stryCov_9fa48("16506"), 'unknown'));
    assert.equal(checkBuild(stryMutAct_9fa48("16508") ? {} : (stryCov_9fa48("16508"), {
      ...kit.selection,
      switch: stryMutAct_9fa48("16509") ? "" : (stryCov_9fa48("16509"), 'oil-king')
    }), catalog, stryMutAct_9fa48("16510") ? "" : (stryCov_9fa48("16510"), '75'))[1].status, stryMutAct_9fa48("16511") ? "" : (stryCov_9fa48("16511"), 'incompatible'));
    assert.equal(checkBuild(stryMutAct_9fa48("16513") ? {} : (stryCov_9fa48("16513"), {
      ...kit.selection,
      plate: stryMutAct_9fa48("16514") ? "" : (stryCov_9fa48("16514"), 'q1-he-plate')
    }), catalog, stryMutAct_9fa48("16515") ? "" : (stryCov_9fa48("16515"), '75'))[0].status, stryMutAct_9fa48("16516") ? "" : (stryCov_9fa48("16516"), 'unknown'));
  }
});
test(stryMutAct_9fa48("16518") ? "" : (stryCov_9fa48("16518"), 'mixed or unverified core parts cannot inherit an assembly check'), () => {
  if (stryMutAct_9fa48("16519")) {
    {}
  } else {
    stryCov_9fa48("16519");
    const he = assemblies.find(stryMutAct_9fa48("16520") ? () => undefined : (stryCov_9fa48("16520"), a => stryMutAct_9fa48("16523") ? a.id !== 'q1-he' : stryMutAct_9fa48("16522") ? false : stryMutAct_9fa48("16521") ? true : (stryCov_9fa48("16521", "16522", "16523"), a.id === (stryMutAct_9fa48("16524") ? "" : (stryCov_9fa48("16524"), 'q1-he')))));
    const max = assemblies.find(stryMutAct_9fa48("16525") ? () => undefined : (stryCov_9fa48("16525"), a => stryMutAct_9fa48("16528") ? a.id !== 'q1-max' : stryMutAct_9fa48("16527") ? false : stryMutAct_9fa48("16526") ? true : (stryCov_9fa48("16526", "16527", "16528"), a.id === (stryMutAct_9fa48("16529") ? "" : (stryCov_9fa48("16529"), 'q1-max')))));
    assert.equal(checkBuild(stryMutAct_9fa48("16531") ? {} : (stryCov_9fa48("16531"), {
      ...he.selection,
      plate: max.selection.plate
    }), catalog, stryMutAct_9fa48("16532") ? "" : (stryCov_9fa48("16532"), '75'))[0].status, stryMutAct_9fa48("16533") ? "" : (stryCov_9fa48("16533"), 'unknown'));
    assert.equal(checkBuild(he.selection, catalog, stryMutAct_9fa48("16535") ? "" : (stryCov_9fa48("16535"), '65'))[0].status, stryMutAct_9fa48("16536") ? "" : (stryCov_9fa48("16536"), 'unknown'));
    const unverified = catalog.map(stryMutAct_9fa48("16537") ? () => undefined : (stryCov_9fa48("16537"), part => (stryMutAct_9fa48("16540") ? part.id !== he.selection.pcb : stryMutAct_9fa48("16539") ? false : stryMutAct_9fa48("16538") ? true : (stryCov_9fa48("16538", "16539", "16540"), part.id === he.selection.pcb)) ? stryMutAct_9fa48("16541") ? {} : (stryCov_9fa48("16541"), {
      ...part,
      evidence: stryMutAct_9fa48("16542") ? "" : (stryCov_9fa48("16542"), 'unknown')
    }) : part));
    assert.equal(checkBuild(he.selection, unverified, stryMutAct_9fa48("16544") ? "" : (stryCov_9fa48("16544"), '75'))[0].status, stryMutAct_9fa48("16545") ? "" : (stryCov_9fa48("16545"), 'unknown'));
    assert.equal(checkBuild(he.selection, unverified, stryMutAct_9fa48("16547") ? "" : (stryCov_9fa48("16547"), '75'))[1].status, stryMutAct_9fa48("16548") ? "" : (stryCov_9fa48("16548"), 'unknown'));
  }
});
test(stryMutAct_9fa48("16550") ? "" : (stryCov_9fa48("16550"), 'stabilizer rules retain the specific Redux exception and distinguish plate mounting'), () => {
  if (stryMutAct_9fa48("16551")) {
    {}
  } else {
    stryCov_9fa48("16551");
    const redux = assemblies.find(stryMutAct_9fa48("16552") ? () => undefined : (stryCov_9fa48("16552"), a => stryMutAct_9fa48("16555") ? a.id !== 'tofu60' : stryMutAct_9fa48("16554") ? false : stryMutAct_9fa48("16553") ? true : (stryCov_9fa48("16553", "16554", "16555"), a.id === (stryMutAct_9fa48("16556") ? "" : (stryCov_9fa48("16556"), 'tofu60')))));
    const nk = assemblies.find(stryMutAct_9fa48("16557") ? () => undefined : (stryCov_9fa48("16557"), a => stryMutAct_9fa48("16560") ? a.id !== 'nk65-entry' : stryMutAct_9fa48("16559") ? false : stryMutAct_9fa48("16558") ? true : (stryCov_9fa48("16558", "16559", "16560"), a.id === (stryMutAct_9fa48("16561") ? "" : (stryCov_9fa48("16561"), 'nk65-entry')))));
    const bakeneko = assemblies.find(stryMutAct_9fa48("16562") ? () => undefined : (stryCov_9fa48("16562"), a => stryMutAct_9fa48("16565") ? a.id !== 'bakeneko60' : stryMutAct_9fa48("16564") ? false : stryMutAct_9fa48("16563") ? true : (stryCov_9fa48("16563", "16564", "16565"), a.id === (stryMutAct_9fa48("16566") ? "" : (stryCov_9fa48("16566"), 'bakeneko60')))));
    assert.equal(checkBuild(stryMutAct_9fa48("16568") ? {} : (stryCov_9fa48("16568"), {
      ...redux.selection,
      stabilizers: stryMutAct_9fa48("16569") ? "" : (stryCov_9fa48("16569"), 'q1-max-stabs')
    }), catalog, stryMutAct_9fa48("16570") ? "" : (stryCov_9fa48("16570"), '60'))[2].status, stryMutAct_9fa48("16571") ? "" : (stryCov_9fa48("16571"), 'unknown'));
    assert.equal(checkBuild(stryMutAct_9fa48("16573") ? {} : (stryCov_9fa48("16573"), {
      ...redux.selection,
      stabilizers: stryMutAct_9fa48("16574") ? "" : (stryCov_9fa48("16574"), 'durock-stabs')
    }), catalog, stryMutAct_9fa48("16575") ? "" : (stryCov_9fa48("16575"), '60'))[2].status, stryMutAct_9fa48("16576") ? "" : (stryCov_9fa48("16576"), 'incompatible'));
    assert.equal(checkBuild(stryMutAct_9fa48("16578") ? {} : (stryCov_9fa48("16578"), {
      ...nk.selection,
      stabilizers: stryMutAct_9fa48("16579") ? "" : (stryCov_9fa48("16579"), 'clip-stabs')
    }), catalog, stryMutAct_9fa48("16580") ? "" : (stryCov_9fa48("16580"), '65'))[2].status, stryMutAct_9fa48("16581") ? "" : (stryCov_9fa48("16581"), 'incompatible'));
    assert.equal(checkBuild(stryMutAct_9fa48("16583") ? {} : (stryCov_9fa48("16583"), {
      ...bakeneko.selection,
      stabilizers: stryMutAct_9fa48("16584") ? "" : (stryCov_9fa48("16584"), 'q1-max-stabs')
    }), catalog, stryMutAct_9fa48("16585") ? "" : (stryCov_9fa48("16585"), '60'))[2].status, stryMutAct_9fa48("16586") ? "" : (stryCov_9fa48("16586"), 'incompatible'));
  }
});
test(stryMutAct_9fa48("16588") ? "" : (stryCov_9fa48("16588"), 'an entire starting assembly survives portable sharing and a single undo'), () => {
  if (stryMutAct_9fa48("16589")) {
    {}
  } else {
    stryCov_9fa48("16589");
    const he = assemblies.find(stryMutAct_9fa48("16590") ? () => undefined : (stryCov_9fa48("16590"), a => stryMutAct_9fa48("16593") ? a.id !== 'q1-he' : stryMutAct_9fa48("16592") ? false : stryMutAct_9fa48("16591") ? true : (stryCov_9fa48("16591", "16592", "16593"), a.id === (stryMutAct_9fa48("16594") ? "" : (stryCov_9fa48("16594"), 'q1-he')))));
    const after = stryMutAct_9fa48("16595") ? {} : (stryCov_9fa48("16595"), {
      ...defaultBuild,
      selection: he.selection,
      layout: he.layout,
      finish: he.finish
    });
    if (stryMutAct_9fa48("16596")) {
      ;
    } else {
      stryCov_9fa48("16596");
      assert.deepEqual(decodeBuild(encodeBuild(after)), after);
    }
    const history = buildReducer(initialHistory, stryMutAct_9fa48("16597") ? {} : (stryCov_9fa48("16597"), {
      kind: stryMutAct_9fa48("16598") ? "" : (stryCov_9fa48("16598"), 'edit'),
      patch: after
    }));
    assert.deepEqual(buildReducer(history, stryMutAct_9fa48("16600") ? {} : (stryCov_9fa48("16600"), {
      kind: stryMutAct_9fa48("16601") ? "" : (stryCov_9fa48("16601"), 'undo')
    })).present, defaultBuild);
  }
});
test(stryMutAct_9fa48("16603") ? "" : (stryCov_9fa48("16603"), 'supplied keycap coverage is documented only for the unchanged factory combination'), () => {
  if (stryMutAct_9fa48("16604")) {
    {}
  } else {
    stryCov_9fa48("16604");
    const kit = assemblies.find(stryMutAct_9fa48("16605") ? () => undefined : (stryCov_9fa48("16605"), a => stryMutAct_9fa48("16608") ? a.id !== 'q1-he-8k' : stryMutAct_9fa48("16607") ? false : stryMutAct_9fa48("16606") ? true : (stryCov_9fa48("16606", "16607", "16608"), a.id === (stryMutAct_9fa48("16609") ? "" : (stryCov_9fa48("16609"), 'q1-he-8k')))));
    const coverage = stryMutAct_9fa48("16610") ? () => undefined : (stryCov_9fa48("16610"), (() => {
      const coverage = (selection, parts = catalog, layout = stryMutAct_9fa48("16611") ? "" : (stryCov_9fa48("16611"), '75')) => checkBuild(selection, parts, layout).find(stryMutAct_9fa48("16612") ? () => undefined : (stryCov_9fa48("16612"), c => stryMutAct_9fa48("16615") ? c.title !== 'Keycap kit & row coverage' : stryMutAct_9fa48("16614") ? false : stryMutAct_9fa48("16613") ? true : (stryCov_9fa48("16613", "16614", "16615"), c.title === (stryMutAct_9fa48("16616") ? "" : (stryCov_9fa48("16616"), 'Keycap kit & row coverage')))));
      return coverage;
    })());
    assert.equal(coverage(kit.selection).status, stryMutAct_9fa48("16618") ? "" : (stryCov_9fa48("16618"), 'documented'));
    for (const patch of stryMutAct_9fa48("16619") ? [] : (stryCov_9fa48("16619"), [stryMutAct_9fa48("16620") ? {} : (stryCov_9fa48("16620"), {
      keycaps: stryMutAct_9fa48("16621") ? "" : (stryCov_9fa48("16621"), 'keychron-bow')
    }), stryMutAct_9fa48("16622") ? {} : (stryCov_9fa48("16622"), {
      switch: stryMutAct_9fa48("16623") ? "" : (stryCov_9fa48("16623"), 'oil-king')
    }), stryMutAct_9fa48("16624") ? {} : (stryCov_9fa48("16624"), {
      plate: stryMutAct_9fa48("16625") ? "" : (stryCov_9fa48("16625"), 'q1-he-plate')
    })])) assert.equal(coverage(stryMutAct_9fa48("16627") ? {} : (stryCov_9fa48("16627"), {
      ...kit.selection,
      ...patch
    })).status, stryMutAct_9fa48("16628") ? "" : (stryCov_9fa48("16628"), 'unknown'));
    assert.equal(coverage(kit.selection, catalog, stryMutAct_9fa48("16630") ? "" : (stryCov_9fa48("16630"), '65')).status, stryMutAct_9fa48("16631") ? "" : (stryCov_9fa48("16631"), 'unknown'));
    const unverified = catalog.map(stryMutAct_9fa48("16632") ? () => undefined : (stryCov_9fa48("16632"), p => (stryMutAct_9fa48("16635") ? p.id !== kit.selection.keycaps : stryMutAct_9fa48("16634") ? false : stryMutAct_9fa48("16633") ? true : (stryCov_9fa48("16633", "16634", "16635"), p.id === kit.selection.keycaps)) ? stryMutAct_9fa48("16636") ? {} : (stryCov_9fa48("16636"), {
      ...p,
      evidence: stryMutAct_9fa48("16637") ? "" : (stryCov_9fa48("16637"), 'unknown')
    }) : p));
    assert.equal(coverage(kit.selection, unverified).status, stryMutAct_9fa48("16639") ? "" : (stryCov_9fa48("16639"), 'unknown'));
  }
});
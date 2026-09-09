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
import { searchStudio, studioDestinations } from '../lib/studio-search.ts';
import { catalog } from '../lib/catalog.ts';
test(stryMutAct_9fa48("22140") ? "" : (stryCov_9fa48("22140"), 'blank search offers real studio destinations without changing catalog data'), () => {
  if (stryMutAct_9fa48("22141")) {
    {}
  } else {
    stryCov_9fa48("22141");
    const before = JSON.stringify(catalog);
    assert.deepEqual(searchStudio(stryMutAct_9fa48("22143") ? "" : (stryCov_9fa48("22143"), '  '), catalog).map(stryMutAct_9fa48("22144") ? () => undefined : (stryCov_9fa48("22144"), result => result.item.id)), studioDestinations.map(stryMutAct_9fa48("22145") ? () => undefined : (stryCov_9fa48("22145"), item => item.id)));
    if (stryMutAct_9fa48("22146")) {
      ;
    } else {
      stryCov_9fa48("22146");
      assert.equal(JSON.stringify(catalog), before);
    }
  }
});
test(stryMutAct_9fa48("22148") ? "" : (stryCov_9fa48("22148"), 'search matches every word across maker, product and category and retains source'), () => {
  if (stryMutAct_9fa48("22149")) {
    {}
  } else {
    stryCov_9fa48("22149");
    const results = searchStudio(stryMutAct_9fa48("22150") ? "" : (stryCov_9fa48("22150"), 'GATERON oil'), catalog);
    assert.ok(stryMutAct_9fa48("22155") ? results.length <= 0 : stryMutAct_9fa48("22154") ? results.length >= 0 : stryMutAct_9fa48("22153") ? false : stryMutAct_9fa48("22152") ? true : (stryCov_9fa48("22152", "22153", "22154", "22155"), results.length > 0));
    assert.ok(stryMutAct_9fa48("22157") ? results.some(result => result.kind === 'part' && result.item.brand === 'Gateron') : (stryCov_9fa48("22157"), results.every(stryMutAct_9fa48("22158") ? () => undefined : (stryCov_9fa48("22158"), result => stryMutAct_9fa48("22161") ? result.kind === 'part' || result.item.brand === 'Gateron' : stryMutAct_9fa48("22160") ? false : stryMutAct_9fa48("22159") ? true : (stryCov_9fa48("22159", "22160", "22161"), (stryMutAct_9fa48("22163") ? result.kind !== 'part' : stryMutAct_9fa48("22162") ? true : (stryCov_9fa48("22162", "22163"), result.kind === (stryMutAct_9fa48("22164") ? "" : (stryCov_9fa48("22164"), 'part')))) && (stryMutAct_9fa48("22166") ? result.item.brand !== 'Gateron' : stryMutAct_9fa48("22165") ? true : (stryCov_9fa48("22165", "22166"), result.item.brand === (stryMutAct_9fa48("22167") ? "" : (stryCov_9fa48("22167"), 'Gateron')))))))));
    assert.equal(searchStudio(stryMutAct_9fa48("22169") ? "" : (stryCov_9fa48("22169"), 'nonsense-928734'), catalog).length, 0);
    const artisans = searchStudio(stryMutAct_9fa48("22170") ? "" : (stryCov_9fa48("22170"), 'jelly artisan'), catalog);
    if (stryMutAct_9fa48("22171")) {
      ;
    } else {
      stryCov_9fa48("22171");
      assert.equal(artisans.length, 3);
    }
    assert.ok(stryMutAct_9fa48("22173") ? artisans.some(result => result.kind === 'accessory' && result.item.source.startsWith('https://www.jellykey.com/')) : (stryCov_9fa48("22173"), artisans.every(stryMutAct_9fa48("22174") ? () => undefined : (stryCov_9fa48("22174"), result => stryMutAct_9fa48("22177") ? result.kind === 'accessory' || result.item.source.startsWith('https://www.jellykey.com/') : stryMutAct_9fa48("22176") ? false : stryMutAct_9fa48("22175") ? true : (stryCov_9fa48("22175", "22176", "22177"), (stryMutAct_9fa48("22179") ? result.kind !== 'accessory' : stryMutAct_9fa48("22178") ? true : (stryCov_9fa48("22178", "22179"), result.kind === (stryMutAct_9fa48("22180") ? "" : (stryCov_9fa48("22180"), 'accessory')))) && (stryMutAct_9fa48("22181") ? result.item.source.endsWith('https://www.jellykey.com/') : (stryCov_9fa48("22181"), result.item.source.startsWith(stryMutAct_9fa48("22182") ? "" : (stryCov_9fa48("22182"), 'https://www.jellykey.com/')))))))));
  }
});
test(stryMutAct_9fa48("22184") ? "" : (stryCov_9fa48("22184"), 'imported products are searchable, preserve identity and tolerate accents'), () => {
  if (stryMutAct_9fa48("22185")) {
    {}
  } else {
    stryCov_9fa48("22185");
    const part = stryMutAct_9fa48("22186") ? {} : (stryCov_9fa48("22186"), {
      id: stryMutAct_9fa48("22187") ? "" : (stryCov_9fa48("22187"), 'imported'),
      name: stryMutAct_9fa48("22188") ? "" : (stryCov_9fa48("22188"), 'Étude caps'),
      brand: stryMutAct_9fa48("22189") ? "" : (stryCov_9fa48("22189"), 'Café'),
      category: stryMutAct_9fa48("22190") ? "" : (stryCov_9fa48("22190"), 'keycaps'),
      detail: stryMutAct_9fa48("22191") ? "" : (stryCov_9fa48("22191"), 'PBT reference'),
      family: stryMutAct_9fa48("22192") ? "" : (stryCov_9fa48("22192"), 'unknown'),
      evidence: stryMutAct_9fa48("22193") ? "" : (stryCov_9fa48("22193"), 'unknown'),
      source: stryMutAct_9fa48("22194") ? "" : (stryCov_9fa48("22194"), 'https://example.com/caps')
    });
    const result = searchStudio(stryMutAct_9fa48("22195") ? "" : (stryCov_9fa48("22195"), 'etude cafe'), stryMutAct_9fa48("22196") ? [] : (stryCov_9fa48("22196"), [...catalog, part]));
    if (stryMutAct_9fa48("22197")) {
      ;
    } else {
      stryCov_9fa48("22197");
      assert.equal(result.length, 1);
    }
    if (stryMutAct_9fa48("22198")) {
      ;
    } else {
      stryCov_9fa48("22198");
      assert.equal(result[0].item, part);
    }
    assert.equal(result[0].item.evidence, stryMutAct_9fa48("22200") ? "" : (stryCov_9fa48("22200"), 'unknown'));
  }
});
test(stryMutAct_9fa48("22202") ? "" : (stryCov_9fa48("22202"), 'category plurals and everyday accessory terms find product references'), () => {
  if (stryMutAct_9fa48("22203")) {
    {}
  } else {
    stryCov_9fa48("22203");
    assert.equal(stryMutAct_9fa48("22205") ? searchStudio('switches', catalog).length : (stryCov_9fa48("22205"), searchStudio(stryMutAct_9fa48("22206") ? "" : (stryCov_9fa48("22206"), 'switches'), catalog).filter(stryMutAct_9fa48("22207") ? () => undefined : (stryCov_9fa48("22207"), result => stryMutAct_9fa48("22210") ? result.kind !== 'part' : stryMutAct_9fa48("22209") ? false : stryMutAct_9fa48("22208") ? true : (stryCov_9fa48("22208", "22209", "22210"), result.kind === (stryMutAct_9fa48("22211") ? "" : (stryCov_9fa48("22211"), 'part'))))).length), stryMutAct_9fa48("22212") ? catalog.length : (stryCov_9fa48("22212"), catalog.filter(stryMutAct_9fa48("22213") ? () => undefined : (stryCov_9fa48("22213"), part => stryMutAct_9fa48("22216") ? part.category !== 'switch' : stryMutAct_9fa48("22215") ? false : stryMutAct_9fa48("22214") ? true : (stryCov_9fa48("22214", "22215", "22216"), part.category === (stryMutAct_9fa48("22217") ? "" : (stryCov_9fa48("22217"), 'switch'))))).length));
    assert.ok(stryMutAct_9fa48("22219") ? searchStudio('dials', catalog).every(result => result.kind === 'accessory' && result.item.kind === 'encoder') : (stryCov_9fa48("22219"), searchStudio(stryMutAct_9fa48("22220") ? "" : (stryCov_9fa48("22220"), 'dials'), catalog).some(stryMutAct_9fa48("22221") ? () => undefined : (stryCov_9fa48("22221"), result => stryMutAct_9fa48("22224") ? result.kind === 'accessory' || result.item.kind === 'encoder' : stryMutAct_9fa48("22223") ? false : stryMutAct_9fa48("22222") ? true : (stryCov_9fa48("22222", "22223", "22224"), (stryMutAct_9fa48("22226") ? result.kind !== 'accessory' : stryMutAct_9fa48("22225") ? true : (stryCov_9fa48("22225", "22226"), result.kind === (stryMutAct_9fa48("22227") ? "" : (stryCov_9fa48("22227"), 'accessory')))) && (stryMutAct_9fa48("22229") ? result.item.kind !== 'encoder' : stryMutAct_9fa48("22228") ? true : (stryCov_9fa48("22228", "22229"), result.item.kind === (stryMutAct_9fa48("22230") ? "" : (stryCov_9fa48("22230"), 'encoder')))))))));
    assert.ok(stryMutAct_9fa48("22232") ? searchStudio('displays', catalog).every(result => result.kind === 'accessory' && result.item.kind === 'screen') : (stryCov_9fa48("22232"), searchStudio(stryMutAct_9fa48("22233") ? "" : (stryCov_9fa48("22233"), 'displays'), catalog).some(stryMutAct_9fa48("22234") ? () => undefined : (stryCov_9fa48("22234"), result => stryMutAct_9fa48("22237") ? result.kind === 'accessory' || result.item.kind === 'screen' : stryMutAct_9fa48("22236") ? false : stryMutAct_9fa48("22235") ? true : (stryCov_9fa48("22235", "22236", "22237"), (stryMutAct_9fa48("22239") ? result.kind !== 'accessory' : stryMutAct_9fa48("22238") ? true : (stryCov_9fa48("22238", "22239"), result.kind === (stryMutAct_9fa48("22240") ? "" : (stryCov_9fa48("22240"), 'accessory')))) && (stryMutAct_9fa48("22242") ? result.item.kind !== 'screen' : stryMutAct_9fa48("22241") ? true : (stryCov_9fa48("22241", "22242"), result.item.kind === (stryMutAct_9fa48("22243") ? "" : (stryCov_9fa48("22243"), 'screen')))))))));
  }
});
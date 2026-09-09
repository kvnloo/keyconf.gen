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
test(stryMutAct_9fa48("22209") ? "" : (stryCov_9fa48("22209"), 'blank search offers real studio destinations without changing catalog data'), () => {
  if (stryMutAct_9fa48("22210")) {
    {}
  } else {
    stryCov_9fa48("22210");
    const before = JSON.stringify(catalog);
    assert.deepEqual(searchStudio(stryMutAct_9fa48("22212") ? "" : (stryCov_9fa48("22212"), '  '), catalog).map(stryMutAct_9fa48("22213") ? () => undefined : (stryCov_9fa48("22213"), result => result.item.id)), studioDestinations.map(stryMutAct_9fa48("22214") ? () => undefined : (stryCov_9fa48("22214"), item => item.id)));
    if (stryMutAct_9fa48("22215")) {
      ;
    } else {
      stryCov_9fa48("22215");
      assert.equal(JSON.stringify(catalog), before);
    }
  }
});
test(stryMutAct_9fa48("22217") ? "" : (stryCov_9fa48("22217"), 'search matches every word across maker, product and category and retains source'), () => {
  if (stryMutAct_9fa48("22218")) {
    {}
  } else {
    stryCov_9fa48("22218");
    const results = searchStudio(stryMutAct_9fa48("22219") ? "" : (stryCov_9fa48("22219"), 'GATERON oil'), catalog);
    assert.ok(stryMutAct_9fa48("22224") ? results.length <= 0 : stryMutAct_9fa48("22223") ? results.length >= 0 : stryMutAct_9fa48("22222") ? false : stryMutAct_9fa48("22221") ? true : (stryCov_9fa48("22221", "22222", "22223", "22224"), results.length > 0));
    assert.ok(stryMutAct_9fa48("22226") ? results.some(result => result.kind === 'part' && result.item.brand === 'Gateron') : (stryCov_9fa48("22226"), results.every(stryMutAct_9fa48("22227") ? () => undefined : (stryCov_9fa48("22227"), result => stryMutAct_9fa48("22230") ? result.kind === 'part' || result.item.brand === 'Gateron' : stryMutAct_9fa48("22229") ? false : stryMutAct_9fa48("22228") ? true : (stryCov_9fa48("22228", "22229", "22230"), (stryMutAct_9fa48("22232") ? result.kind !== 'part' : stryMutAct_9fa48("22231") ? true : (stryCov_9fa48("22231", "22232"), result.kind === (stryMutAct_9fa48("22233") ? "" : (stryCov_9fa48("22233"), 'part')))) && (stryMutAct_9fa48("22235") ? result.item.brand !== 'Gateron' : stryMutAct_9fa48("22234") ? true : (stryCov_9fa48("22234", "22235"), result.item.brand === (stryMutAct_9fa48("22236") ? "" : (stryCov_9fa48("22236"), 'Gateron')))))))));
    assert.equal(searchStudio(stryMutAct_9fa48("22238") ? "" : (stryCov_9fa48("22238"), 'nonsense-928734'), catalog).length, 0);
    const artisans = searchStudio(stryMutAct_9fa48("22239") ? "" : (stryCov_9fa48("22239"), 'jelly artisan'), catalog);
    if (stryMutAct_9fa48("22240")) {
      ;
    } else {
      stryCov_9fa48("22240");
      assert.equal(artisans.length, 3);
    }
    assert.ok(stryMutAct_9fa48("22242") ? artisans.some(result => result.kind === 'accessory' && result.item.source.startsWith('https://www.jellykey.com/')) : (stryCov_9fa48("22242"), artisans.every(stryMutAct_9fa48("22243") ? () => undefined : (stryCov_9fa48("22243"), result => stryMutAct_9fa48("22246") ? result.kind === 'accessory' || result.item.source.startsWith('https://www.jellykey.com/') : stryMutAct_9fa48("22245") ? false : stryMutAct_9fa48("22244") ? true : (stryCov_9fa48("22244", "22245", "22246"), (stryMutAct_9fa48("22248") ? result.kind !== 'accessory' : stryMutAct_9fa48("22247") ? true : (stryCov_9fa48("22247", "22248"), result.kind === (stryMutAct_9fa48("22249") ? "" : (stryCov_9fa48("22249"), 'accessory')))) && (stryMutAct_9fa48("22250") ? result.item.source.endsWith('https://www.jellykey.com/') : (stryCov_9fa48("22250"), result.item.source.startsWith(stryMutAct_9fa48("22251") ? "" : (stryCov_9fa48("22251"), 'https://www.jellykey.com/')))))))));
  }
});
test(stryMutAct_9fa48("22253") ? "" : (stryCov_9fa48("22253"), 'imported products are searchable, preserve identity and tolerate accents'), () => {
  if (stryMutAct_9fa48("22254")) {
    {}
  } else {
    stryCov_9fa48("22254");
    const part = stryMutAct_9fa48("22255") ? {} : (stryCov_9fa48("22255"), {
      id: stryMutAct_9fa48("22256") ? "" : (stryCov_9fa48("22256"), 'imported'),
      name: stryMutAct_9fa48("22257") ? "" : (stryCov_9fa48("22257"), 'Étude caps'),
      brand: stryMutAct_9fa48("22258") ? "" : (stryCov_9fa48("22258"), 'Café'),
      category: stryMutAct_9fa48("22259") ? "" : (stryCov_9fa48("22259"), 'keycaps'),
      detail: stryMutAct_9fa48("22260") ? "" : (stryCov_9fa48("22260"), 'PBT reference'),
      family: stryMutAct_9fa48("22261") ? "" : (stryCov_9fa48("22261"), 'unknown'),
      evidence: stryMutAct_9fa48("22262") ? "" : (stryCov_9fa48("22262"), 'unknown'),
      source: stryMutAct_9fa48("22263") ? "" : (stryCov_9fa48("22263"), 'https://example.com/caps')
    });
    const result = searchStudio(stryMutAct_9fa48("22264") ? "" : (stryCov_9fa48("22264"), 'etude cafe'), stryMutAct_9fa48("22265") ? [] : (stryCov_9fa48("22265"), [...catalog, part]));
    if (stryMutAct_9fa48("22266")) {
      ;
    } else {
      stryCov_9fa48("22266");
      assert.equal(result.length, 1);
    }
    if (stryMutAct_9fa48("22267")) {
      ;
    } else {
      stryCov_9fa48("22267");
      assert.equal(result[0].item, part);
    }
    assert.equal(result[0].item.evidence, stryMutAct_9fa48("22269") ? "" : (stryCov_9fa48("22269"), 'unknown'));
  }
});
test(stryMutAct_9fa48("22271") ? "" : (stryCov_9fa48("22271"), 'category plurals and everyday accessory terms find product references'), () => {
  if (stryMutAct_9fa48("22272")) {
    {}
  } else {
    stryCov_9fa48("22272");
    assert.equal(stryMutAct_9fa48("22274") ? searchStudio('switches', catalog).length : (stryCov_9fa48("22274"), searchStudio(stryMutAct_9fa48("22275") ? "" : (stryCov_9fa48("22275"), 'switches'), catalog).filter(stryMutAct_9fa48("22276") ? () => undefined : (stryCov_9fa48("22276"), result => stryMutAct_9fa48("22279") ? result.kind !== 'part' : stryMutAct_9fa48("22278") ? false : stryMutAct_9fa48("22277") ? true : (stryCov_9fa48("22277", "22278", "22279"), result.kind === (stryMutAct_9fa48("22280") ? "" : (stryCov_9fa48("22280"), 'part'))))).length), stryMutAct_9fa48("22281") ? catalog.length : (stryCov_9fa48("22281"), catalog.filter(stryMutAct_9fa48("22282") ? () => undefined : (stryCov_9fa48("22282"), part => stryMutAct_9fa48("22285") ? part.category !== 'switch' : stryMutAct_9fa48("22284") ? false : stryMutAct_9fa48("22283") ? true : (stryCov_9fa48("22283", "22284", "22285"), part.category === (stryMutAct_9fa48("22286") ? "" : (stryCov_9fa48("22286"), 'switch'))))).length));
    assert.ok(stryMutAct_9fa48("22288") ? searchStudio('dials', catalog).every(result => result.kind === 'accessory' && result.item.kind === 'encoder') : (stryCov_9fa48("22288"), searchStudio(stryMutAct_9fa48("22289") ? "" : (stryCov_9fa48("22289"), 'dials'), catalog).some(stryMutAct_9fa48("22290") ? () => undefined : (stryCov_9fa48("22290"), result => stryMutAct_9fa48("22293") ? result.kind === 'accessory' || result.item.kind === 'encoder' : stryMutAct_9fa48("22292") ? false : stryMutAct_9fa48("22291") ? true : (stryCov_9fa48("22291", "22292", "22293"), (stryMutAct_9fa48("22295") ? result.kind !== 'accessory' : stryMutAct_9fa48("22294") ? true : (stryCov_9fa48("22294", "22295"), result.kind === (stryMutAct_9fa48("22296") ? "" : (stryCov_9fa48("22296"), 'accessory')))) && (stryMutAct_9fa48("22298") ? result.item.kind !== 'encoder' : stryMutAct_9fa48("22297") ? true : (stryCov_9fa48("22297", "22298"), result.item.kind === (stryMutAct_9fa48("22299") ? "" : (stryCov_9fa48("22299"), 'encoder')))))))));
    assert.ok(stryMutAct_9fa48("22301") ? searchStudio('displays', catalog).every(result => result.kind === 'accessory' && result.item.kind === 'screen') : (stryCov_9fa48("22301"), searchStudio(stryMutAct_9fa48("22302") ? "" : (stryCov_9fa48("22302"), 'displays'), catalog).some(stryMutAct_9fa48("22303") ? () => undefined : (stryCov_9fa48("22303"), result => stryMutAct_9fa48("22306") ? result.kind === 'accessory' || result.item.kind === 'screen' : stryMutAct_9fa48("22305") ? false : stryMutAct_9fa48("22304") ? true : (stryCov_9fa48("22304", "22305", "22306"), (stryMutAct_9fa48("22308") ? result.kind !== 'accessory' : stryMutAct_9fa48("22307") ? true : (stryCov_9fa48("22307", "22308"), result.kind === (stryMutAct_9fa48("22309") ? "" : (stryCov_9fa48("22309"), 'accessory')))) && (stryMutAct_9fa48("22311") ? result.item.kind !== 'screen' : stryMutAct_9fa48("22310") ? true : (stryCov_9fa48("22310", "22311"), result.item.kind === (stryMutAct_9fa48("22312") ? "" : (stryCov_9fa48("22312"), 'screen')))))))));
  }
});
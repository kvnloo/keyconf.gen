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
import { readFileSync } from 'node:fs';
import { catalog, initialSelection, checkBuild } from '../lib/catalog.ts';
import { parseStructuredProducts, publicUrl, isPublicAddress } from '../lib/import-products.ts';
test(stryMutAct_9fa48("19885") ? "" : (stryCov_9fa48("19885"), 'Redux rejects the documented Durock stabilizer exception'), () => {
  if (stryMutAct_9fa48("19886")) {
    {}
  } else {
    stryCov_9fa48("19886");
    assert.ok(stryMutAct_9fa48("19888") ? checkBuild({
      ...initialSelection,
      stabilizers: 'durock-stabs'
    }, catalog, '60').every(x => x.status === 'incompatible' && x.title === 'Stabilizer interference') : (stryCov_9fa48("19888"), checkBuild(stryMutAct_9fa48("19889") ? {} : (stryCov_9fa48("19889"), {
      ...initialSelection,
      stabilizers: stryMutAct_9fa48("19890") ? "" : (stryCov_9fa48("19890"), 'durock-stabs')
    }), catalog, stryMutAct_9fa48("19891") ? "" : (stryCov_9fa48("19891"), '60')).some(stryMutAct_9fa48("19892") ? () => undefined : (stryCov_9fa48("19892"), x => stryMutAct_9fa48("19895") ? x.status === 'incompatible' || x.title === 'Stabilizer interference' : stryMutAct_9fa48("19894") ? false : stryMutAct_9fa48("19893") ? true : (stryCov_9fa48("19893", "19894", "19895"), (stryMutAct_9fa48("19897") ? x.status !== 'incompatible' : stryMutAct_9fa48("19896") ? true : (stryCov_9fa48("19896", "19897"), x.status === (stryMutAct_9fa48("19898") ? "" : (stryCov_9fa48("19898"), 'incompatible')))) && (stryMutAct_9fa48("19900") ? x.title !== 'Stabilizer interference' : stryMutAct_9fa48("19899") ? true : (stryCov_9fa48("19899", "19900"), x.title === (stryMutAct_9fa48("19901") ? "" : (stryCov_9fa48("19901"), 'Stabilizer interference')))))))));
  }
});
test(stryMutAct_9fa48("19903") ? "" : (stryCov_9fa48("19903"), 'Hall effect switch is incompatible with mechanical PCB'), () => {
  if (stryMutAct_9fa48("19904")) {
    {}
  } else {
    stryCov_9fa48("19904");
    assert.ok(stryMutAct_9fa48("19906") ? checkBuild({
      ...initialSelection,
      switch: 'he-switch'
    }, catalog, '60').every(x => x.status === 'incompatible') : (stryCov_9fa48("19906"), checkBuild(stryMutAct_9fa48("19907") ? {} : (stryCov_9fa48("19907"), {
      ...initialSelection,
      switch: stryMutAct_9fa48("19908") ? "" : (stryCov_9fa48("19908"), 'he-switch')
    }), catalog, stryMutAct_9fa48("19909") ? "" : (stryCov_9fa48("19909"), '60')).some(stryMutAct_9fa48("19910") ? () => undefined : (stryCov_9fa48("19910"), x => stryMutAct_9fa48("19913") ? x.status !== 'incompatible' : stryMutAct_9fa48("19912") ? false : stryMutAct_9fa48("19911") ? true : (stryCov_9fa48("19911", "19912", "19913"), x.status === (stryMutAct_9fa48("19914") ? "" : (stryCov_9fa48("19914"), 'incompatible')))))));
  }
});
test(stryMutAct_9fa48("19916") ? "" : (stryCov_9fa48("19916"), 'Matching family never claims whole build is verified'), () => {
  if (stryMutAct_9fa48("19917")) {
    {}
  } else {
    stryCov_9fa48("19917");
    const checks = checkBuild(initialSelection, catalog, stryMutAct_9fa48("19918") ? "" : (stryCov_9fa48("19918"), '60'));
    assert.ok(stryMutAct_9fa48("19920") ? checks.every(x => x.status === 'documented') : (stryCov_9fa48("19920"), checks.some(stryMutAct_9fa48("19921") ? () => undefined : (stryCov_9fa48("19921"), x => stryMutAct_9fa48("19924") ? x.status !== 'documented' : stryMutAct_9fa48("19923") ? false : stryMutAct_9fa48("19922") ? true : (stryCov_9fa48("19922", "19923", "19924"), x.status === (stryMutAct_9fa48("19925") ? "" : (stryCov_9fa48("19925"), 'documented')))))));
    assert.ok(stryMutAct_9fa48("19927") ? checks.every(x => x.status === 'unknown') : (stryCov_9fa48("19927"), checks.some(stryMutAct_9fa48("19928") ? () => undefined : (stryCov_9fa48("19928"), x => stryMutAct_9fa48("19931") ? x.status !== 'unknown' : stryMutAct_9fa48("19930") ? false : stryMutAct_9fa48("19929") ? true : (stryCov_9fa48("19929", "19930", "19931"), x.status === (stryMutAct_9fa48("19932") ? "" : (stryCov_9fa48("19932"), 'unknown')))))));
  }
});
test(stryMutAct_9fa48("19934") ? "" : (stryCov_9fa48("19934"), 'Unknown imported parts and changed layouts cannot inherit verified fit'), () => {
  if (stryMutAct_9fa48("19935")) {
    {}
  } else {
    stryCov_9fa48("19935");
    assert.equal(checkBuild(stryMutAct_9fa48("19937") ? {} : (stryCov_9fa48("19937"), {
      ...initialSelection,
      pcb: stryMutAct_9fa48("19938") ? "" : (stryCov_9fa48("19938"), 'missing')
    }), catalog, stryMutAct_9fa48("19939") ? "" : (stryCov_9fa48("19939"), '60'))[0].status, stryMutAct_9fa48("19940") ? "" : (stryCov_9fa48("19940"), 'unknown'));
    assert.equal(checkBuild(initialSelection, catalog, stryMutAct_9fa48("19942") ? "" : (stryCov_9fa48("19942"), '75'))[0].status, stryMutAct_9fa48("19943") ? "" : (stryCov_9fa48("19943"), 'unknown'));
  }
});
test(stryMutAct_9fa48("19945") ? "" : (stryCov_9fa48("19945"), 'ProductGroup variant data retains identifiers and offer currencies'), () => {
  if (stryMutAct_9fa48("19946")) {
    {}
  } else {
    stryCov_9fa48("19946");
    const data = stryMutAct_9fa48("19947") ? {} : (stryCov_9fa48("19947"), {
      '@type': stryMutAct_9fa48("19948") ? "" : (stryCov_9fa48("19948"), 'ProductGroup'),
      hasVariant: stryMutAct_9fa48("19949") ? [] : (stryCov_9fa48("19949"), [stryMutAct_9fa48("19950") ? {} : (stryCov_9fa48("19950"), {
        '@type': stryMutAct_9fa48("19951") ? "" : (stryCov_9fa48("19951"), 'Product'),
        name: stryMutAct_9fa48("19952") ? "" : (stryCov_9fa48("19952"), 'Case green'),
        sku: stryMutAct_9fa48("19953") ? "" : (stryCov_9fa48("19953"), 'K1'),
        brand: stryMutAct_9fa48("19954") ? {} : (stryCov_9fa48("19954"), {
          name: stryMutAct_9fa48("19955") ? "" : (stryCov_9fa48("19955"), 'Maker')
        }),
        offers: stryMutAct_9fa48("19956") ? {} : (stryCov_9fa48("19956"), {
          price: stryMutAct_9fa48("19957") ? "" : (stryCov_9fa48("19957"), '99'),
          priceCurrency: stryMutAct_9fa48("19958") ? "" : (stryCov_9fa48("19958"), 'USD'),
          availability: stryMutAct_9fa48("19959") ? "" : (stryCov_9fa48("19959"), 'https://schema.org/InStock'),
          url: stryMutAct_9fa48("19960") ? "" : (stryCov_9fa48("19960"), '/products/green')
        })
      }), stryMutAct_9fa48("19961") ? {} : (stryCov_9fa48("19961"), {
        '@type': stryMutAct_9fa48("19962") ? "" : (stryCov_9fa48("19962"), 'Product'),
        name: stryMutAct_9fa48("19963") ? "" : (stryCov_9fa48("19963"), 'Case blue'),
        sku: stryMutAct_9fa48("19964") ? "" : (stryCov_9fa48("19964"), 'K2'),
        offers: stryMutAct_9fa48("19965") ? {} : (stryCov_9fa48("19965"), {
          price: stryMutAct_9fa48("19966") ? "" : (stryCov_9fa48("19966"), '109'),
          priceCurrency: stryMutAct_9fa48("19967") ? "" : (stryCov_9fa48("19967"), 'EUR')
        })
      })])
    });
    const html = (stryMutAct_9fa48("19968") ? "" : (stryCov_9fa48("19968"), '<script type="application/ld+json">')) + JSON.stringify(data) + (stryMutAct_9fa48("19969") ? "" : (stryCov_9fa48("19969"), '</script>'));
    const result = parseStructuredProducts(html, stryMutAct_9fa48("19970") ? "" : (stryCov_9fa48("19970"), 'https://example.com/shop'));
    if (stryMutAct_9fa48("19971")) {
      ;
    } else {
      stryCov_9fa48("19971");
      assert.equal(result.length, 2);
    }
    assert.deepEqual(result[0].pricing, stryMutAct_9fa48("19973") ? {} : (stryCov_9fa48("19973"), {
      kind: stryMutAct_9fa48("19974") ? "" : (stryCov_9fa48("19974"), 'exact'),
      amount: stryMutAct_9fa48("19975") ? "" : (stryCov_9fa48("19975"), '99'),
      currency: stryMutAct_9fa48("19976") ? "" : (stryCov_9fa48("19976"), 'USD')
    }));
    assert.equal(result[0].url, stryMutAct_9fa48("19978") ? "" : (stryCov_9fa48("19978"), 'https://example.com/products/green'));
    assert.equal(result[1].sku, stryMutAct_9fa48("19980") ? "" : (stryCov_9fa48("19980"), 'K2'));
  }
});
test(stryMutAct_9fa48("19982") ? "" : (stryCov_9fa48("19982"), 'Malformed JSON-LD does not hide later valid data or allow javascript links'), () => {
  if (stryMutAct_9fa48("19983")) {
    {}
  } else {
    stryCov_9fa48("19983");
    const r = parseStructuredProducts(stryMutAct_9fa48("19984") ? "" : (stryCov_9fa48("19984"), '<script type="application/ld+json">broken</script><script type="application/ld+json">{"@type":"Product","name":"A","url":"javascript:alert(1)"}</script>'), stryMutAct_9fa48("19985") ? "" : (stryCov_9fa48("19985"), 'https://example.com/'));
    if (stryMutAct_9fa48("19986")) {
      ;
    } else {
      stryCov_9fa48("19986");
      assert.equal(r.length, 1);
    }
    assert.equal(r[0].url, stryMutAct_9fa48("19988") ? "" : (stryCov_9fa48("19988"), 'https://example.com/'));
  }
});
test(stryMutAct_9fa48("19990") ? "" : (stryCov_9fa48("19990"), 'Importer rejects local, credentialed and non-HTTPS targets'), () => {
  if (stryMutAct_9fa48("19991")) {
    {}
  } else {
    stryCov_9fa48("19991");
    for (const url of stryMutAct_9fa48("19992") ? [] : (stryCov_9fa48("19992"), [stryMutAct_9fa48("19993") ? "" : (stryCov_9fa48("19993"), 'http://example.com'), stryMutAct_9fa48("19994") ? "" : (stryCov_9fa48("19994"), 'https://localhost'), stryMutAct_9fa48("19995") ? "" : (stryCov_9fa48("19995"), 'https://127.0.0.1'), stryMutAct_9fa48("19996") ? "" : (stryCov_9fa48("19996"), 'https://0x7f000001'), stryMutAct_9fa48("19997") ? "" : (stryCov_9fa48("19997"), 'https://[::1]'), stryMutAct_9fa48("19998") ? "" : (stryCov_9fa48("19998"), 'https://user:pass@example.com'), stryMutAct_9fa48("19999") ? "" : (stryCov_9fa48("19999"), 'https://example.com:8443')])) assert.throws(stryMutAct_9fa48("20001") ? () => undefined : (stryCov_9fa48("20001"), () => publicUrl(url)));
    for (const ip of stryMutAct_9fa48("20002") ? [] : (stryCov_9fa48("20002"), [stryMutAct_9fa48("20003") ? "" : (stryCov_9fa48("20003"), '127.0.0.1'), stryMutAct_9fa48("20004") ? "" : (stryCov_9fa48("20004"), '10.0.0.1'), stryMutAct_9fa48("20005") ? "" : (stryCov_9fa48("20005"), '192.168.1.1'), stryMutAct_9fa48("20006") ? "" : (stryCov_9fa48("20006"), '172.16.0.1'), stryMutAct_9fa48("20007") ? "" : (stryCov_9fa48("20007"), '169.254.169.254'), stryMutAct_9fa48("20008") ? "" : (stryCov_9fa48("20008"), '100.64.0.1'), stryMutAct_9fa48("20009") ? "" : (stryCov_9fa48("20009"), '::ffff:127.0.0.1'), stryMutAct_9fa48("20010") ? "" : (stryCov_9fa48("20010"), 'fc00::1')])) assert.equal(isPublicAddress(ip), stryMutAct_9fa48("20012") ? true : (stryCov_9fa48("20012"), false), ip);
    assert.equal(isPublicAddress(stryMutAct_9fa48("20014") ? "" : (stryCov_9fa48("20014"), '1.1.1.1')), stryMutAct_9fa48("20015") ? false : (stryCov_9fa48("20015"), true));
  }
});
test(stryMutAct_9fa48("20017") ? "" : (stryCov_9fa48("20017"), 'Blender exports contain separate key groups and all configurable materials'), () => {
  if (stryMutAct_9fa48("20018")) {
    {}
  } else {
    stryCov_9fa48("20018");
    for (const layout of stryMutAct_9fa48("20019") ? [] : (stryCov_9fa48("20019"), [stryMutAct_9fa48("20020") ? "" : (stryCov_9fa48("20020"), '60'), stryMutAct_9fa48("20021") ? "" : (stryCov_9fa48("20021"), '65'), stryMutAct_9fa48("20022") ? "" : (stryCov_9fa48("20022"), '75')])) {
      if (stryMutAct_9fa48("20023")) {
        {}
      } else {
        stryCov_9fa48("20023");
        const b = readFileSync(new URL((stryMutAct_9fa48("20024") ? "" : (stryCov_9fa48("20024"), '../public/models/keyboard-')) + layout + (stryMutAct_9fa48("20025") ? "" : (stryCov_9fa48("20025"), '.glb')), import.meta.url));
        assert.equal(b.toString(stryMutAct_9fa48("20027") ? "" : (stryCov_9fa48("20027"), 'ascii'), 0, 4), stryMutAct_9fa48("20028") ? "" : (stryCov_9fa48("20028"), 'glTF'));
        const length = b.readUInt32LE(12);
        const json = JSON.parse(b.toString(stryMutAct_9fa48("20029") ? "" : (stryCov_9fa48("20029"), 'utf8'), 20, stryMutAct_9fa48("20030") ? 20 - length : (stryCov_9fa48("20030"), 20 + length)));
        assert.ok(stryMutAct_9fa48("20035") ? json.nodes.filter(n => n.name?.startsWith('key_')).length < 61 : stryMutAct_9fa48("20034") ? json.nodes.filter(n => n.name?.startsWith('key_')).length > 61 : stryMutAct_9fa48("20033") ? false : stryMutAct_9fa48("20032") ? true : (stryCov_9fa48("20032", "20033", "20034", "20035"), (stryMutAct_9fa48("20036") ? json.nodes.length : (stryCov_9fa48("20036"), json.nodes.filter(stryMutAct_9fa48("20037") ? () => undefined : (stryCov_9fa48("20037"), n => stryMutAct_9fa48("20039") ? n.name.startsWith('key_') : stryMutAct_9fa48("20038") ? n.name?.endsWith('key_') : (stryCov_9fa48("20038", "20039"), n.name?.startsWith(stryMutAct_9fa48("20040") ? "" : (stryCov_9fa48("20040"), 'key_'))))).length)) >= 61));
        for (const name of stryMutAct_9fa48("20041") ? [] : (stryCov_9fa48("20041"), [stryMutAct_9fa48("20042") ? "" : (stryCov_9fa48("20042"), 'case'), stryMutAct_9fa48("20043") ? "" : (stryCov_9fa48("20043"), 'alpha'), stryMutAct_9fa48("20044") ? "" : (stryCov_9fa48("20044"), 'mod'), stryMutAct_9fa48("20045") ? "" : (stryCov_9fa48("20045"), 'accent'), stryMutAct_9fa48("20046") ? "" : (stryCov_9fa48("20046"), 'space')])) assert.ok(stryMutAct_9fa48("20048") ? json.materials.every(m => m.name.split('.')[0] === name) : (stryCov_9fa48("20048"), json.materials.some(stryMutAct_9fa48("20049") ? () => undefined : (stryCov_9fa48("20049"), m => stryMutAct_9fa48("20052") ? m.name.split('.')[0] !== name : stryMutAct_9fa48("20051") ? false : stryMutAct_9fa48("20050") ? true : (stryCov_9fa48("20050", "20051", "20052"), m.name.split(stryMutAct_9fa48("20053") ? "" : (stryCov_9fa48("20053"), '.'))[0] === name)))));
        for (const node of stryMutAct_9fa48("20054") ? json.nodes : (stryCov_9fa48("20054"), json.nodes.filter(stryMutAct_9fa48("20055") ? () => undefined : (stryCov_9fa48("20055"), node => stryMutAct_9fa48("20057") ? node.name.startsWith('key_') : stryMutAct_9fa48("20056") ? node.name?.endsWith('key_') : (stryCov_9fa48("20056", "20057"), node.name?.startsWith(stryMutAct_9fa48("20058") ? "" : (stryCov_9fa48("20058"), 'key_'))))))) {
          if (stryMutAct_9fa48("20059")) {
            {}
          } else {
            stryCov_9fa48("20059");
            const meshes = stryMutAct_9fa48("20060") ? node.children.map(index => json.nodes[index]) : (stryCov_9fa48("20060"), node.children.map(stryMutAct_9fa48("20061") ? () => undefined : (stryCov_9fa48("20061"), index => json.nodes[index])).filter(stryMutAct_9fa48("20062") ? () => undefined : (stryCov_9fa48("20062"), child => stryMutAct_9fa48("20065") ? child.mesh === undefined : stryMutAct_9fa48("20064") ? false : stryMutAct_9fa48("20063") ? true : (stryCov_9fa48("20063", "20064", "20065"), child.mesh !== undefined))));
            const names = meshes.flatMap(stryMutAct_9fa48("20066") ? () => undefined : (stryCov_9fa48("20066"), mesh => json.meshes[mesh.mesh].primitives.map(stryMutAct_9fa48("20067") ? () => undefined : (stryCov_9fa48("20067"), primitive => json.materials[primitive.material].name.split(stryMutAct_9fa48("20068") ? "" : (stryCov_9fa48("20068"), '.'))[0]))));
            const surface = names.find(stryMutAct_9fa48("20069") ? () => undefined : (stryCov_9fa48("20069"), name => (stryMutAct_9fa48("20070") ? [] : (stryCov_9fa48("20070"), [stryMutAct_9fa48("20071") ? "" : (stryCov_9fa48("20071"), 'alpha'), stryMutAct_9fa48("20072") ? "" : (stryCov_9fa48("20072"), 'mod'), stryMutAct_9fa48("20073") ? "" : (stryCov_9fa48("20073"), 'accent'), stryMutAct_9fa48("20074") ? "" : (stryCov_9fa48("20074"), 'space')])).includes(name)));
            const legend = names.find(stryMutAct_9fa48("20075") ? () => undefined : (stryCov_9fa48("20075"), name => stryMutAct_9fa48("20076") ? name.endsWith('legend_') : (stryCov_9fa48("20076"), name.startsWith(stryMutAct_9fa48("20077") ? "" : (stryCov_9fa48("20077"), 'legend_')))));
            if (stryMutAct_9fa48("20079") ? false : stryMutAct_9fa48("20078") ? true : (stryCov_9fa48("20078", "20079"), legend)) assert.equal(legend, (stryMutAct_9fa48("20081") ? "" : (stryCov_9fa48("20081"), 'legend_')) + surface, node.name);
            if (stryMutAct_9fa48("20084") ? node.name === 'key_Space' : stryMutAct_9fa48("20083") ? false : stryMutAct_9fa48("20082") ? true : (stryCov_9fa48("20082", "20083", "20084"), node.name !== (stryMutAct_9fa48("20085") ? "" : (stryCov_9fa48("20085"), 'key_Space')))) assert.ok(legend, node.name + (stryMutAct_9fa48("20087") ? "" : (stryCov_9fa48("20087"), ' has an independent legend material')));
          }
        }
      }
    }
  }
});
import { parseStudy } from '../lib/webmcp.ts';
test(stryMutAct_9fa48("20089") ? "" : (stryCov_9fa48("20089"), 'Study tool validates layout and palette before mutating state'), () => {
  if (stryMutAct_9fa48("20090")) {
    {}
  } else {
    stryCov_9fa48("20090");
    assert.deepEqual(parseStudy(stryMutAct_9fa48("20092") ? {} : (stryCov_9fa48("20092"), {
      layout: stryMutAct_9fa48("20093") ? "" : (stryCov_9fa48("20093"), '65'),
      palette: stryMutAct_9fa48("20094") ? "" : (stryCov_9fa48("20094"), 'Porcelain')
    })), stryMutAct_9fa48("20095") ? {} : (stryCov_9fa48("20095"), {
      layout: stryMutAct_9fa48("20096") ? "" : (stryCov_9fa48("20096"), '65'),
      palette: stryMutAct_9fa48("20097") ? "" : (stryCov_9fa48("20097"), 'Porcelain')
    }));
    assert.throws(stryMutAct_9fa48("20099") ? () => undefined : (stryCov_9fa48("20099"), () => parseStudy(stryMutAct_9fa48("20100") ? {} : (stryCov_9fa48("20100"), {
      layout: stryMutAct_9fa48("20101") ? "" : (stryCov_9fa48("20101"), '99'),
      palette: stryMutAct_9fa48("20102") ? "" : (stryCov_9fa48("20102"), 'Porcelain')
    }))));
    assert.throws(stryMutAct_9fa48("20104") ? () => undefined : (stryCov_9fa48("20104"), () => parseStudy(stryMutAct_9fa48("20105") ? {} : (stryCov_9fa48("20105"), {
      layout: stryMutAct_9fa48("20106") ? "" : (stryCov_9fa48("20106"), '60'),
      palette: stryMutAct_9fa48("20107") ? "" : (stryCov_9fa48("20107"), 'not a palette')
    }))));
    for (const input of stryMutAct_9fa48("20108") ? [] : (stryCov_9fa48("20108"), [null, stryMutAct_9fa48("20109") ? ["Stryker was here"] : (stryCov_9fa48("20109"), []), {}, stryMutAct_9fa48("20110") ? {} : (stryCov_9fa48("20110"), {
      layout: 60,
      palette: stryMutAct_9fa48("20111") ? "" : (stryCov_9fa48("20111"), 'Porcelain')
    }), stryMutAct_9fa48("20112") ? {} : (stryCov_9fa48("20112"), {
      layout: stryMutAct_9fa48("20113") ? "" : (stryCov_9fa48("20113"), '60'),
      palette: null
    })])) assert.throws(stryMutAct_9fa48("20115") ? () => undefined : (stryCov_9fa48("20115"), () => parseStudy(input)));
  }
});
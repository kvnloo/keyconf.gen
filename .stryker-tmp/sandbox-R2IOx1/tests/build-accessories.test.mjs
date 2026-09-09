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
import { accessoryCatalog, newAccessorySelection, parseAccessories, assessAccessoryCompatibility, assessAccessories } from '../lib/build-accessories.ts';
const artisan = stryMutAct_9fa48("15224") ? () => undefined : (stryCov_9fa48("15224"), (() => {
  const artisan = () => stryMutAct_9fa48("15225") ? {} : (stryCov_9fa48("15225"), {
    ...newAccessorySelection(stryMutAct_9fa48("15226") ? "" : (stryCov_9fa48("15226"), 'jelly-key-zen-pond-v-1u')),
    location: stryMutAct_9fa48("15227") ? {} : (stryCov_9fa48("15227"), {
      kind: stryMutAct_9fa48("15228") ? "" : (stryCov_9fa48("15228"), 'key'),
      keyId: stryMutAct_9fa48("15229") ? "" : (stryCov_9fa48("15229"), 'Escape')
    })
  });
  return artisan;
})());
const host = stryMutAct_9fa48("15230") ? () => undefined : (stryCov_9fa48("15230"), (() => {
  const host = () => stryMutAct_9fa48("15231") ? {} : (stryCov_9fa48("15231"), {
    id: stryMutAct_9fa48("15232") ? "" : (stryCov_9fa48("15232"), 'test-fixture-only'),
    source: stryMutAct_9fa48("15233") ? "" : (stryCov_9fa48("15233"), 'https://example.com/test-fixture'),
    slots: null,
    keys: stryMutAct_9fa48("15234") ? [] : (stryCov_9fa48("15234"), [stryMutAct_9fa48("15235") ? {} : (stryCov_9fa48("15235"), {
      id: stryMutAct_9fa48("15236") ? "" : (stryCov_9fa48("15236"), 'Escape'),
      sizeU: 1,
      stem: stryMutAct_9fa48("15237") ? "" : (stryCov_9fa48("15237"), 'mx')
    })]),
    claims: stryMutAct_9fa48("15238") ? ["Stryker was here"] : (stryCov_9fa48("15238"), [])
  });
  return host;
})());

// These host facts are test fixtures, not manufacturer compatibility claims.
const claim = stryMutAct_9fa48("15239") ? () => undefined : (stryCov_9fa48("15239"), (() => {
  const claim = (aspect, patch = {}) => stryMutAct_9fa48("15240") ? {} : (stryCov_9fa48("15240"), {
    productId: stryMutAct_9fa48("15241") ? "" : (stryCov_9fa48("15241"), 'jelly-key-zen-pond-v-1u'),
    locationId: stryMutAct_9fa48("15242") ? "" : (stryCov_9fa48("15242"), 'Escape'),
    aspect,
    status: stryMutAct_9fa48("15243") ? "" : (stryCov_9fa48("15243"), 'confirmed'),
    source: stryMutAct_9fa48("15244") ? "" : (stryCov_9fa48("15244"), 'https://example.com/test-fixture'),
    reason: stryMutAct_9fa48("15245") ? `` : (stryCov_9fa48("15245"), `Fixture verifies ${aspect}.`),
    ...patch
  });
  return claim;
})());
test(stryMutAct_9fa48("15247") ? "" : (stryCov_9fa48("15247"), 'all accessory families survive a JSON round trip with distinct placements'), () => {
  if (stryMutAct_9fa48("15248")) {
    {}
  } else {
    stryCov_9fa48("15248");
    const selections = accessoryCatalog.map(stryMutAct_9fa48("15249") ? () => undefined : (stryCov_9fa48("15249"), product => newAccessorySelection(product.id)));
    if (stryMutAct_9fa48("15250")) {
      ;
    } else {
      stryCov_9fa48("15250");
      assert.deepEqual(parseAccessories(JSON.parse(JSON.stringify(selections))), selections);
    }
    assert.equal(new Set(selections.map(stryMutAct_9fa48("15252") ? () => undefined : (stryCov_9fa48("15252"), item => item.id))).size, selections.length);
    assert.deepEqual(new Set(accessoryCatalog.map(stryMutAct_9fa48("15254") ? () => undefined : (stryCov_9fa48("15254"), item => item.kind))), new Set(stryMutAct_9fa48("15255") ? [] : (stryCov_9fa48("15255"), [stryMutAct_9fa48("15256") ? "" : (stryCov_9fa48("15256"), 'knob'), stryMutAct_9fa48("15257") ? "" : (stryCov_9fa48("15257"), 'encoder'), stryMutAct_9fa48("15258") ? "" : (stryCov_9fa48("15258"), 'screen'), stryMutAct_9fa48("15259") ? "" : (stryCov_9fa48("15259"), 'buttons'), stryMutAct_9fa48("15260") ? "" : (stryCov_9fa48("15260"), 'macropad'), stryMutAct_9fa48("15261") ? "" : (stryCov_9fa48("15261"), 'artisan')])));
    assert.deepEqual(parseAccessories(undefined), stryMutAct_9fa48("15263") ? ["Stryker was here"] : (stryCov_9fa48("15263"), []));
    assert.equal(selections.find(stryMutAct_9fa48("15265") ? () => undefined : (stryCov_9fa48("15265"), item => item.productId.includes(stryMutAct_9fa48("15266") ? "" : (stryCov_9fa48("15266"), 'macropad')))).location.kind, stryMutAct_9fa48("15267") ? "" : (stryCov_9fa48("15267"), 'external'));
    assert.equal(selections.find(stryMutAct_9fa48("15269") ? () => undefined : (stryCov_9fa48("15269"), item => item.productId.includes(stryMutAct_9fa48("15270") ? "" : (stryCov_9fa48("15270"), 'oled')))).location.kind, stryMutAct_9fa48("15271") ? "" : (stryCov_9fa48("15271"), 'embedded'));
  }
});
test(stryMutAct_9fa48("15273") ? "" : (stryCov_9fa48("15273"), 'imports reject damaged quantities, locations and product references'), () => {
  if (stryMutAct_9fa48("15274")) {
    {}
  } else {
    stryCov_9fa48("15274");
    const original = artisan();
    for (const patch of stryMutAct_9fa48("15275") ? [] : (stryCov_9fa48("15275"), [stryMutAct_9fa48("15276") ? {} : (stryCov_9fa48("15276"), {
      id: stryMutAct_9fa48("15277") ? "Stryker was here!" : (stryCov_9fa48("15277"), '')
    }), stryMutAct_9fa48("15278") ? {} : (stryCov_9fa48("15278"), {
      id: stryMutAct_9fa48("15279") ? "" : (stryCov_9fa48("15279"), '__proto__')
    }), stryMutAct_9fa48("15280") ? {} : (stryCov_9fa48("15280"), {
      productId: stryMutAct_9fa48("15281") ? "" : (stryCov_9fa48("15281"), 'not-a-product')
    }), stryMutAct_9fa48("15282") ? {} : (stryCov_9fa48("15282"), {
      quantity: 0
    }), stryMutAct_9fa48("15283") ? {} : (stryCov_9fa48("15283"), {
      quantity: 101
    }), stryMutAct_9fa48("15284") ? {} : (stryCov_9fa48("15284"), {
      quantity: 1.5
    }), stryMutAct_9fa48("15285") ? {} : (stryCov_9fa48("15285"), {
      quantity: NaN
    }), stryMutAct_9fa48("15286") ? {} : (stryCov_9fa48("15286"), {
      quantity: Infinity
    }), stryMutAct_9fa48("15287") ? {} : (stryCov_9fa48("15287"), {
      quantity: 2
    }), stryMutAct_9fa48("15288") ? {} : (stryCov_9fa48("15288"), {
      location: stryMutAct_9fa48("15289") ? {} : (stryCov_9fa48("15289"), {
        kind: stryMutAct_9fa48("15290") ? "" : (stryCov_9fa48("15290"), 'external'),
        position: stryMutAct_9fa48("15291") ? "" : (stryCov_9fa48("15291"), 'right')
      })
    }), stryMutAct_9fa48("15292") ? {} : (stryCov_9fa48("15292"), {
      location: stryMutAct_9fa48("15293") ? {} : (stryCov_9fa48("15293"), {
        kind: stryMutAct_9fa48("15294") ? "" : (stryCov_9fa48("15294"), 'key'),
        keyId: stryMutAct_9fa48("15295") ? "Stryker was here!" : (stryCov_9fa48("15295"), '')
      })
    }), stryMutAct_9fa48("15296") ? {} : (stryCov_9fa48("15296"), {
      location: stryMutAct_9fa48("15297") ? {} : (stryCov_9fa48("15297"), {
        kind: stryMutAct_9fa48("15298") ? "" : (stryCov_9fa48("15298"), 'key'),
        keyId: (stryMutAct_9fa48("15299") ? "" : (stryCov_9fa48("15299"), 'a')).repeat(121)
      })
    }), stryMutAct_9fa48("15300") ? {} : (stryCov_9fa48("15300"), {
      location: stryMutAct_9fa48("15301") ? {} : (stryCov_9fa48("15301"), {
        kind: stryMutAct_9fa48("15302") ? "" : (stryCov_9fa48("15302"), 'key'),
        keyId: stryMutAct_9fa48("15303") ? "" : (stryCov_9fa48("15303"), '<script>')
      })
    })])) assert.throws(stryMutAct_9fa48("15305") ? () => undefined : (stryCov_9fa48("15305"), () => parseAccessories(stryMutAct_9fa48("15306") ? [] : (stryCov_9fa48("15306"), [stryMutAct_9fa48("15307") ? {} : (stryCov_9fa48("15307"), {
      ...original,
      ...patch
    })]))));
    for (const input of stryMutAct_9fa48("15308") ? [] : (stryCov_9fa48("15308"), [null, {}, stryMutAct_9fa48("15309") ? [] : (stryCov_9fa48("15309"), [null]), stryMutAct_9fa48("15310") ? [] : (stryCov_9fa48("15310"), [original, original]), stryMutAct_9fa48("15311") ? Array().fill(original) : (stryCov_9fa48("15311"), Array(101).fill(original))])) assert.throws(stryMutAct_9fa48("15313") ? () => undefined : (stryCov_9fa48("15313"), () => parseAccessories(input)));
    assert.throws(stryMutAct_9fa48("15315") ? () => undefined : (stryCov_9fa48("15315"), () => newAccessorySelection(stryMutAct_9fa48("15316") ? "" : (stryCov_9fa48("15316"), 'missing'))));
  }
});
test(stryMutAct_9fa48("15318") ? "" : (stryCov_9fa48("15318"), 'imports retain only selections and never trust claimed compatibility'), () => {
  if (stryMutAct_9fa48("15319")) {
    {}
  } else {
    stryCov_9fa48("15319");
    const original = artisan();
    const [parsed] = parseAccessories(stryMutAct_9fa48("15320") ? [] : (stryCov_9fa48("15320"), [stryMutAct_9fa48("15321") ? {} : (stryCov_9fa48("15321"), {
      ...original,
      status: stryMutAct_9fa48("15322") ? "" : (stryCov_9fa48("15322"), 'confirmed'),
      claims: stryMutAct_9fa48("15323") ? [] : (stryCov_9fa48("15323"), [claim(stryMutAct_9fa48("15324") ? "" : (stryCov_9fa48("15324"), 'clearance'))]),
      source: stryMutAct_9fa48("15325") ? "" : (stryCov_9fa48("15325"), 'https://example.com/forged')
    })]));
    if (stryMutAct_9fa48("15326")) {
      ;
    } else {
      stryCov_9fa48("15326");
      assert.deepEqual(parsed, original);
    }
    assert.equal(assessAccessoryCompatibility(parsed).status, stryMutAct_9fa48("15328") ? "" : (stryCov_9fa48("15328"), 'unknown'));
  }
});
test(stryMutAct_9fa48("15330") ? "" : (stryCov_9fa48("15330"), 'MX stem and matching width alone do not establish artisan clearance'), () => {
  if (stryMutAct_9fa48("15331")) {
    {}
  } else {
    stryCov_9fa48("15331");
    const result = assessAccessoryCompatibility(artisan(), host());
    assert.equal(result.status, stryMutAct_9fa48("15333") ? "" : (stryCov_9fa48("15333"), 'unknown'));
    assert.ok(stryMutAct_9fa48("15335") ? result.reasons.every(reason => reason.startsWith('Clearance')) : (stryCov_9fa48("15335"), result.reasons.some(stryMutAct_9fa48("15336") ? () => undefined : (stryCov_9fa48("15336"), reason => stryMutAct_9fa48("15337") ? reason.endsWith('Clearance') : (stryCov_9fa48("15337"), reason.startsWith(stryMutAct_9fa48("15338") ? "" : (stryCov_9fa48("15338"), 'Clearance')))))));
    const clear = stryMutAct_9fa48("15339") ? {} : (stryCov_9fa48("15339"), {
      ...host(),
      claims: stryMutAct_9fa48("15340") ? [] : (stryCov_9fa48("15340"), [claim(stryMutAct_9fa48("15341") ? "" : (stryCov_9fa48("15341"), 'clearance'))])
    });
    assert.equal(assessAccessoryCompatibility(artisan(), clear).status, stryMutAct_9fa48("15343") ? "" : (stryCov_9fa48("15343"), 'confirmed'));
    for (const patch of stryMutAct_9fa48("15344") ? [] : (stryCov_9fa48("15344"), [stryMutAct_9fa48("15345") ? {} : (stryCov_9fa48("15345"), {
      sizeU: 1.25
    }), stryMutAct_9fa48("15346") ? {} : (stryCov_9fa48("15346"), {
      stem: stryMutAct_9fa48("15347") ? "" : (stryCov_9fa48("15347"), 'choc')
    })])) {
      if (stryMutAct_9fa48("15348")) {
        {}
      } else {
        stryCov_9fa48("15348");
        const mismatch = stryMutAct_9fa48("15349") ? {} : (stryCov_9fa48("15349"), {
          ...clear,
          keys: stryMutAct_9fa48("15350") ? [] : (stryCov_9fa48("15350"), [stryMutAct_9fa48("15351") ? {} : (stryCov_9fa48("15351"), {
            ...clear.keys[0],
            ...patch
          })])
        });
        assert.equal(assessAccessoryCompatibility(artisan(), mismatch).status, stryMutAct_9fa48("15353") ? "" : (stryCov_9fa48("15353"), 'conflict'));
      }
    }
    assert.equal(assessAccessoryCompatibility(artisan(), stryMutAct_9fa48("15355") ? {} : (stryCov_9fa48("15355"), {
      ...clear,
      keys: stryMutAct_9fa48("15356") ? ["Stryker was here"] : (stryCov_9fa48("15356"), [])
    })).status, stryMutAct_9fa48("15357") ? "" : (stryCov_9fa48("15357"), 'conflict'));
  }
});
test(stryMutAct_9fa48("15359") ? "" : (stryCov_9fa48("15359"), 'evidence is scoped to the selected product and location; conflicts win'), () => {
  if (stryMutAct_9fa48("15360")) {
    {}
  } else {
    stryCov_9fa48("15360");
    for (const patch of stryMutAct_9fa48("15361") ? [] : (stryCov_9fa48("15361"), [stryMutAct_9fa48("15362") ? {} : (stryCov_9fa48("15362"), {
      productId: stryMutAct_9fa48("15363") ? "" : (stryCov_9fa48("15363"), 'other-product')
    }), stryMutAct_9fa48("15364") ? {} : (stryCov_9fa48("15364"), {
      locationId: stryMutAct_9fa48("15365") ? "" : (stryCov_9fa48("15365"), 'Space')
    }), stryMutAct_9fa48("15366") ? {} : (stryCov_9fa48("15366"), {
      source: stryMutAct_9fa48("15367") ? "Stryker was here!" : (stryCov_9fa48("15367"), '')
    }), stryMutAct_9fa48("15368") ? {} : (stryCov_9fa48("15368"), {
      reason: stryMutAct_9fa48("15369") ? "Stryker was here!" : (stryCov_9fa48("15369"), '')
    })])) {
      if (stryMutAct_9fa48("15370")) {
        {}
      } else {
        stryCov_9fa48("15370");
        assert.equal(assessAccessoryCompatibility(artisan(), stryMutAct_9fa48("15372") ? {} : (stryCov_9fa48("15372"), {
          ...host(),
          claims: stryMutAct_9fa48("15373") ? [] : (stryCov_9fa48("15373"), [claim(stryMutAct_9fa48("15374") ? "" : (stryCov_9fa48("15374"), 'clearance'), patch)])
        })).status, stryMutAct_9fa48("15375") ? "" : (stryCov_9fa48("15375"), 'unknown'));
      }
    }
    const claims = stryMutAct_9fa48("15376") ? [] : (stryCov_9fa48("15376"), [claim(stryMutAct_9fa48("15377") ? "" : (stryCov_9fa48("15377"), 'clearance')), claim(stryMutAct_9fa48("15378") ? "" : (stryCov_9fa48("15378"), 'clearance'), stryMutAct_9fa48("15379") ? {} : (stryCov_9fa48("15379"), {
      status: stryMutAct_9fa48("15380") ? "" : (stryCov_9fa48("15380"), 'conflict'),
      reason: stryMutAct_9fa48("15381") ? "" : (stryCov_9fa48("15381"), 'Fixture detects neighboring cap collision.')
    }))]);
    assert.equal(assessAccessoryCompatibility(artisan(), stryMutAct_9fa48("15383") ? {} : (stryCov_9fa48("15383"), {
      ...host(),
      claims
    })).status, stryMutAct_9fa48("15384") ? "" : (stryCov_9fa48("15384"), 'conflict'));
  }
});
test(stryMutAct_9fa48("15386") ? "" : (stryCov_9fa48("15386"), 'multiple artisans cannot occupy one key, but may occupy separate keys'), () => {
  if (stryMutAct_9fa48("15387")) {
    {}
  } else {
    stryCov_9fa48("15387");
    const first = artisan();
    const second = artisan();
    const results = assessAccessories(stryMutAct_9fa48("15388") ? [] : (stryCov_9fa48("15388"), [first, second]));
    assert.equal(results[first.id].status, stryMutAct_9fa48("15390") ? "" : (stryCov_9fa48("15390"), 'conflict'));
    assert.equal(results[second.id].status, stryMutAct_9fa48("15392") ? "" : (stryCov_9fa48("15392"), 'conflict'));
    second.location.keyId = stryMutAct_9fa48("15393") ? "" : (stryCov_9fa48("15393"), 'F1');
    assert.equal(assessAccessories(stryMutAct_9fa48("15395") ? [] : (stryCov_9fa48("15395"), [first, second]))[second.id].status, stryMutAct_9fa48("15396") ? "" : (stryCov_9fa48("15396"), 'unknown'));
  }
});
test(stryMutAct_9fa48("15398") ? "" : (stryCov_9fa48("15398"), 'embedded modules require a matching host slot and respect total capacity'), () => {
  if (stryMutAct_9fa48("15399")) {
    {}
  } else {
    stryCov_9fa48("15399");
    const encoder = stryMutAct_9fa48("15400") ? {} : (stryCov_9fa48("15400"), {
      ...newAccessorySelection(stryMutAct_9fa48("15401") ? "" : (stryCov_9fa48("15401"), 'adafruit-377-encoder')),
      location: stryMutAct_9fa48("15402") ? {} : (stryCov_9fa48("15402"), {
        kind: stryMutAct_9fa48("15403") ? "" : (stryCov_9fa48("15403"), 'embedded'),
        slotId: stryMutAct_9fa48("15404") ? "" : (stryCov_9fa48("15404"), 'top-right')
      })
    });
    const knob = stryMutAct_9fa48("15405") ? {} : (stryCov_9fa48("15405"), {
      ...newAccessorySelection(stryMutAct_9fa48("15406") ? "" : (stryCov_9fa48("15406"), 'keychron-aluminum-knob')),
      location: encoder.location
    });
    const fittedHost = stryMutAct_9fa48("15407") ? {} : (stryCov_9fa48("15407"), {
      ...host(),
      slots: stryMutAct_9fa48("15408") ? [] : (stryCov_9fa48("15408"), [stryMutAct_9fa48("15409") ? {} : (stryCov_9fa48("15409"), {
        id: stryMutAct_9fa48("15410") ? "" : (stryCov_9fa48("15410"), 'top-right'),
        kinds: stryMutAct_9fa48("15411") ? [] : (stryCov_9fa48("15411"), [stryMutAct_9fa48("15412") ? "" : (stryCov_9fa48("15412"), 'encoder'), stryMutAct_9fa48("15413") ? "" : (stryCov_9fa48("15413"), 'knob')]),
        capacity: 1
      })])
    });
    assert.equal(assessAccessoryCompatibility(encoder, stryMutAct_9fa48("15415") ? {} : (stryCov_9fa48("15415"), {
      ...fittedHost,
      slots: stryMutAct_9fa48("15416") ? ["Stryker was here"] : (stryCov_9fa48("15416"), [])
    })).status, stryMutAct_9fa48("15417") ? "" : (stryCov_9fa48("15417"), 'conflict'));
    assert.equal(assessAccessoryCompatibility(stryMutAct_9fa48("15419") ? {} : (stryCov_9fa48("15419"), {
      ...encoder,
      quantity: 2
    }), fittedHost).status, stryMutAct_9fa48("15420") ? "" : (stryCov_9fa48("15420"), 'conflict'));
    assert.equal(assessAccessoryCompatibility(encoder, stryMutAct_9fa48("15422") ? {} : (stryCov_9fa48("15422"), {
      ...fittedHost,
      slots: stryMutAct_9fa48("15423") ? [] : (stryCov_9fa48("15423"), [stryMutAct_9fa48("15424") ? {} : (stryCov_9fa48("15424"), {
        id: stryMutAct_9fa48("15425") ? "" : (stryCov_9fa48("15425"), 'top-right'),
        kinds: stryMutAct_9fa48("15426") ? [] : (stryCov_9fa48("15426"), [stryMutAct_9fa48("15427") ? "" : (stryCov_9fa48("15427"), 'screen')]),
        capacity: 1
      })])
    })).status, stryMutAct_9fa48("15428") ? "" : (stryCov_9fa48("15428"), 'conflict'));
    const combined = assessAccessories(stryMutAct_9fa48("15429") ? [] : (stryCov_9fa48("15429"), [encoder, knob]), fittedHost);
    assert.equal(combined[encoder.id].status, stryMutAct_9fa48("15431") ? "" : (stryCov_9fa48("15431"), 'unknown'));
    assert.equal(combined[knob.id].status, stryMutAct_9fa48("15433") ? "" : (stryCov_9fa48("15433"), 'unknown'));
    const otherEncoder = stryMutAct_9fa48("15434") ? {} : (stryCov_9fa48("15434"), {
      ...encoder,
      id: stryMutAct_9fa48("15435") ? "" : (stryCov_9fa48("15435"), 'another-encoder')
    });
    assert.equal(assessAccessories(stryMutAct_9fa48("15437") ? [] : (stryCov_9fa48("15437"), [encoder, otherEncoder]), fittedHost)[encoder.id].status, stryMutAct_9fa48("15438") ? "" : (stryCov_9fa48("15438"), 'conflict'));
  }
});
test(stryMutAct_9fa48("15440") ? "" : (stryCov_9fa48("15440"), 'a documented knob cap never establishes encoder electrical or firmware support'), () => {
  if (stryMutAct_9fa48("15441")) {
    {}
  } else {
    stryCov_9fa48("15441");
    const knob = stryMutAct_9fa48("15442") ? {} : (stryCov_9fa48("15442"), {
      ...newAccessorySelection(stryMutAct_9fa48("15443") ? "" : (stryCov_9fa48("15443"), 'keychron-aluminum-knob')),
      location: stryMutAct_9fa48("15444") ? {} : (stryCov_9fa48("15444"), {
        kind: stryMutAct_9fa48("15445") ? "" : (stryCov_9fa48("15445"), 'embedded'),
        slotId: stryMutAct_9fa48("15446") ? "" : (stryCov_9fa48("15446"), 'top-right')
      })
    });
    const configuredHost = stryMutAct_9fa48("15447") ? {} : (stryCov_9fa48("15447"), {
      ...host(),
      slots: stryMutAct_9fa48("15448") ? [] : (stryCov_9fa48("15448"), [stryMutAct_9fa48("15449") ? {} : (stryCov_9fa48("15449"), {
        id: stryMutAct_9fa48("15450") ? "" : (stryCov_9fa48("15450"), 'top-right'),
        kinds: stryMutAct_9fa48("15451") ? [] : (stryCov_9fa48("15451"), [stryMutAct_9fa48("15452") ? "" : (stryCov_9fa48("15452"), 'knob'), stryMutAct_9fa48("15453") ? "" : (stryCov_9fa48("15453"), 'encoder')]),
        capacity: 1
      })]),
      claims: (stryMutAct_9fa48("15454") ? [] : (stryCov_9fa48("15454"), [stryMutAct_9fa48("15455") ? "" : (stryCov_9fa48("15455"), 'mount'), stryMutAct_9fa48("15456") ? "" : (stryCov_9fa48("15456"), 'clearance')])).map(stryMutAct_9fa48("15457") ? () => undefined : (stryCov_9fa48("15457"), aspect => claim(aspect, stryMutAct_9fa48("15458") ? {} : (stryCov_9fa48("15458"), {
        productId: knob.productId,
        locationId: stryMutAct_9fa48("15459") ? "" : (stryCov_9fa48("15459"), 'top-right')
      }))))
    });
    assert.equal(assessAccessoryCompatibility(knob, configuredHost).status, stryMutAct_9fa48("15461") ? "" : (stryCov_9fa48("15461"), 'confirmed'));
    const encoder = stryMutAct_9fa48("15462") ? {} : (stryCov_9fa48("15462"), {
      ...newAccessorySelection(stryMutAct_9fa48("15463") ? "" : (stryCov_9fa48("15463"), 'adafruit-377-encoder')),
      location: knob.location
    });
    const result = assessAccessoryCompatibility(encoder, configuredHost);
    assert.equal(result.status, stryMutAct_9fa48("15465") ? "" : (stryCov_9fa48("15465"), 'unknown'));
    assert.ok(stryMutAct_9fa48("15467") ? result.reasons.every(reason => reason.startsWith('Electrical')) : (stryCov_9fa48("15467"), result.reasons.some(stryMutAct_9fa48("15468") ? () => undefined : (stryCov_9fa48("15468"), reason => stryMutAct_9fa48("15469") ? reason.endsWith('Electrical') : (stryCov_9fa48("15469"), reason.startsWith(stryMutAct_9fa48("15470") ? "" : (stryCov_9fa48("15470"), 'Electrical')))))));
    assert.ok(stryMutAct_9fa48("15472") ? result.reasons.every(reason => reason.startsWith('Firmware')) : (stryCov_9fa48("15472"), result.reasons.some(stryMutAct_9fa48("15473") ? () => undefined : (stryCov_9fa48("15473"), reason => stryMutAct_9fa48("15474") ? reason.endsWith('Firmware') : (stryCov_9fa48("15474"), reason.startsWith(stryMutAct_9fa48("15475") ? "" : (stryCov_9fa48("15475"), 'Firmware')))))));
  }
});
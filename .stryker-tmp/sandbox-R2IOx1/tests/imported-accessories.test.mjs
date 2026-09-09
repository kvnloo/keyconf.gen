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
import { createImportedAccessory, parseImportedAccessory, parseCustomAccessories, resolveAccessoryProducts } from '../lib/imported-accessories.ts';
const reference = stryMutAct_9fa48("20962") ? {} : (stryCov_9fa48("20962"), {
  origin: stryMutAct_9fa48("20963") ? "" : (stryCov_9fa48("20963"), 'import'),
  name: stryMutAct_9fa48("20964") ? "" : (stryCov_9fa48("20964"), 'Maker OLED variant'),
  brand: stryMutAct_9fa48("20965") ? "" : (stryCov_9fa48("20965"), 'Maker'),
  detail: stryMutAct_9fa48("20966") ? "" : (stryCov_9fa48("20966"), 'Unverified module reference'),
  source: stryMutAct_9fa48("20967") ? "" : (stryCov_9fa48("20967"), 'https://example.com/products/oled?variant=42'),
  sku: stryMutAct_9fa48("20968") ? "" : (stryCov_9fa48("20968"), '42'),
  observedAt: stryMutAct_9fa48("20969") ? "" : (stryCov_9fa48("20969"), '2026-09-06T00:00:00.000Z'),
  method: stryMutAct_9fa48("20970") ? "" : (stryCov_9fa48("20970"), 'Product structured data'),
  fit: stryMutAct_9fa48("20971") ? "" : (stryCov_9fa48("20971"), 'unknown'),
  geometry: stryMutAct_9fa48("20972") ? "" : (stryCov_9fa48("20972"), 'unavailable'),
  kind: stryMutAct_9fa48("20973") ? "" : (stryCov_9fa48("20973"), 'screen'),
  placement: stryMutAct_9fa48("20974") ? "" : (stryCov_9fa48("20974"), 'embedded'),
  sizeU: null,
  stem: null
});
test(stryMutAct_9fa48("20976") ? "" : (stryCov_9fa48("20976"), 'imported accessory identity preserves variant sources without catalog shadowing'), async () => {
  if (stryMutAct_9fa48("20977")) {
    {}
  } else {
    stryCov_9fa48("20977");
    const first = await createImportedAccessory(reference);
    const retry = await createImportedAccessory(stryMutAct_9fa48("20978") ? {} : (stryCov_9fa48("20978"), {
      ...reference,
      observedAt: stryMutAct_9fa48("20979") ? "" : (stryCov_9fa48("20979"), '2026-09-07T00:00:00.000Z')
    }));
    if (stryMutAct_9fa48("20980")) {
      ;
    } else {
      stryCov_9fa48("20980");
      assert.equal(first.id, retry.id);
    }
    assert.ok(stryMutAct_9fa48("20985") ? first.id.length > 120 : stryMutAct_9fa48("20984") ? first.id.length < 120 : stryMutAct_9fa48("20983") ? false : stryMutAct_9fa48("20982") ? true : (stryCov_9fa48("20982", "20983", "20984", "20985"), first.id.length <= 120));
    const variant = await createImportedAccessory(stryMutAct_9fa48("20986") ? {} : (stryCov_9fa48("20986"), {
      ...reference,
      sku: stryMutAct_9fa48("20987") ? "" : (stryCov_9fa48("20987"), '43')
    }));
    if (stryMutAct_9fa48("20988")) {
      ;
    } else {
      stryCov_9fa48("20988");
      assert.notEqual(first.id, variant.id);
    }
    if (stryMutAct_9fa48("20989")) {
      ;
    } else {
      stryCov_9fa48("20989");
      assert.equal(parseImportedAccessory(first).source, reference.source);
    }
    assert.equal(resolveAccessoryProducts(stryMutAct_9fa48("20991") ? [] : (stryCov_9fa48("20991"), [first])).at(stryMutAct_9fa48("20992") ? +1 : (stryCov_9fa48("20992"), -1)), first);
    assert.throws(stryMutAct_9fa48("20994") ? () => undefined : (stryCov_9fa48("20994"), () => parseImportedAccessory(stryMutAct_9fa48("20995") ? {} : (stryCov_9fa48("20995"), {
      ...first,
      id: stryMutAct_9fa48("20996") ? "" : (stryCov_9fa48("20996"), 'adafruit-326-oled')
    }))));
    assert.throws(stryMutAct_9fa48("20998") ? () => undefined : (stryCov_9fa48("20998"), () => parseCustomAccessories(stryMutAct_9fa48("20999") ? [] : (stryCov_9fa48("20999"), [first, first]))), /Duplicate/);
  }
});
test(stryMutAct_9fa48("21001") ? "" : (stryCov_9fa48("21001"), 'import boundaries reject fake fit, unsafe sources, invalid dates and fabricated artisan dimensions'), async () => {
  if (stryMutAct_9fa48("21002")) {
    {}
  } else {
    stryCov_9fa48("21002");
    const first = await createImportedAccessory(reference);
    for (const patch of stryMutAct_9fa48("21003") ? [] : (stryCov_9fa48("21003"), [stryMutAct_9fa48("21004") ? {} : (stryCov_9fa48("21004"), {
      fit: stryMutAct_9fa48("21005") ? "" : (stryCov_9fa48("21005"), 'confirmed')
    }), stryMutAct_9fa48("21006") ? {} : (stryCov_9fa48("21006"), {
      geometry: stryMutAct_9fa48("21007") ? "" : (stryCov_9fa48("21007"), 'manufacturer-cad')
    }), stryMutAct_9fa48("21008") ? {} : (stryCov_9fa48("21008"), {
      source: stryMutAct_9fa48("21009") ? "" : (stryCov_9fa48("21009"), 'javascript:alert(1)')
    }), stryMutAct_9fa48("21010") ? {} : (stryCov_9fa48("21010"), {
      source: stryMutAct_9fa48("21011") ? "" : (stryCov_9fa48("21011"), 'http://127.0.0.1/private')
    }), stryMutAct_9fa48("21012") ? {} : (stryCov_9fa48("21012"), {
      observedAt: stryMutAct_9fa48("21013") ? "" : (stryCov_9fa48("21013"), 'yesterday')
    }), stryMutAct_9fa48("21014") ? {} : (stryCov_9fa48("21014"), {
      placement: stryMutAct_9fa48("21015") ? "" : (stryCov_9fa48("21015"), 'key')
    }), stryMutAct_9fa48("21016") ? {} : (stryCov_9fa48("21016"), {
      sizeU: 1
    }), stryMutAct_9fa48("21017") ? {} : (stryCov_9fa48("21017"), {
      origin: stryMutAct_9fa48("21018") ? "" : (stryCov_9fa48("21018"), 'catalog')
    })])) assert.throws(stryMutAct_9fa48("21020") ? () => undefined : (stryCov_9fa48("21020"), () => parseImportedAccessory(stryMutAct_9fa48("21021") ? {} : (stryCov_9fa48("21021"), {
      ...first,
      ...patch
    }))));
    const artisan = await createImportedAccessory(stryMutAct_9fa48("21022") ? {} : (stryCov_9fa48("21022"), {
      ...reference,
      kind: stryMutAct_9fa48("21023") ? "" : (stryCov_9fa48("21023"), 'artisan'),
      placement: stryMutAct_9fa48("21024") ? "" : (stryCov_9fa48("21024"), 'key'),
      sizeU: null,
      stem: null
    }));
    if (stryMutAct_9fa48("21025")) {
      ;
    } else {
      stryCov_9fa48("21025");
      assert.equal(artisan.sizeU, null);
    }
    if (stryMutAct_9fa48("21026")) {
      ;
    } else {
      stryCov_9fa48("21026");
      assert.equal(artisan.stem, null);
    }
    assert.throws(stryMutAct_9fa48("21028") ? () => undefined : (stryCov_9fa48("21028"), () => parseImportedAccessory(stryMutAct_9fa48("21029") ? {} : (stryCov_9fa48("21029"), {
      ...artisan,
      sizeU: 0
    }))));
    assert.throws(stryMutAct_9fa48("21031") ? () => undefined : (stryCov_9fa48("21031"), () => parseImportedAccessory(stryMutAct_9fa48("21032") ? {} : (stryCov_9fa48("21032"), {
      ...artisan,
      sizeU: NaN
    }))));
    assert.throws(stryMutAct_9fa48("21034") ? () => undefined : (stryCov_9fa48("21034"), () => parseImportedAccessory(stryMutAct_9fa48("21035") ? {} : (stryCov_9fa48("21035"), {
      ...artisan,
      stem: stryMutAct_9fa48("21036") ? "" : (stryCov_9fa48("21036"), 'topre')
    }))));
    assert.equal((stryMutAct_9fa48("21038") ? "" : (stryCov_9fa48("21038"), 'claims')) in parseImportedAccessory(stryMutAct_9fa48("21039") ? {} : (stryCov_9fa48("21039"), {
      ...artisan,
      claims: stryMutAct_9fa48("21040") ? [] : (stryCov_9fa48("21040"), [stryMutAct_9fa48("21041") ? {} : (stryCov_9fa48("21041"), {
        status: stryMutAct_9fa48("21042") ? "" : (stryCov_9fa48("21042"), 'confirmed')
      })])
    })), stryMutAct_9fa48("21043") ? true : (stryCov_9fa48("21043"), false));
    assert.deepEqual(parseCustomAccessories(undefined), stryMutAct_9fa48("21045") ? ["Stryker was here"] : (stryCov_9fa48("21045"), []));
  }
});
test(stryMutAct_9fa48("21047") ? "" : (stryCov_9fa48("21047"), 'build files and links preserve selected imports while old build serialization stays unchanged'), async () => {
  if (stryMutAct_9fa48("21048")) {
    {}
  } else {
    stryCov_9fa48("21048");
    const {
      defaultBuild,
      parseBuild,
      parseBuildSnapshot,
      encodeBuild,
      decodeBuild,
      pruneBuildImports,
      readBuildFile
    } = await import('../lib/build.ts');
    const {
      newAccessorySelection
    } = await import('../lib/build-accessories.ts');
    const {
      parseSaveBuildRequest
    } = await import('../lib/community.ts');
    const product = await createImportedAccessory(reference);
    const unused = await createImportedAccessory(stryMutAct_9fa48("21049") ? {} : (stryCov_9fa48("21049"), {
      ...reference,
      sku: stryMutAct_9fa48("21050") ? "" : (stryCov_9fa48("21050"), 'unused')
    }));
    const selected = newAccessorySelection(product.id, resolveAccessoryProducts(stryMutAct_9fa48("21051") ? [] : (stryCov_9fa48("21051"), [product])));
    const build = stryMutAct_9fa48("21052") ? {} : (stryCov_9fa48("21052"), {
      ...defaultBuild,
      customAccessories: stryMutAct_9fa48("21053") ? [] : (stryCov_9fa48("21053"), [product, unused]),
      accessories: stryMutAct_9fa48("21054") ? [] : (stryCov_9fa48("21054"), [selected])
    });
    if (stryMutAct_9fa48("21055")) {
      ;
    } else {
      stryCov_9fa48("21055");
      assert.deepEqual(readBuildFile(JSON.stringify(build)), build);
    }
    const portable = decodeBuild(encodeBuild(build));
    assert.deepEqual(portable.customAccessories, stryMutAct_9fa48("21057") ? [] : (stryCov_9fa48("21057"), [product]));
    assert.deepEqual(portable.accessories, stryMutAct_9fa48("21059") ? [] : (stryCov_9fa48("21059"), [selected]));
    if (stryMutAct_9fa48("21060")) {
      ;
    } else {
      stryCov_9fa48("21060");
      assert.equal(portable.customAccessories[0].source, reference.source);
    }
    assert.throws(stryMutAct_9fa48("21062") ? () => undefined : (stryCov_9fa48("21062"), () => parseBuild(stryMutAct_9fa48("21063") ? {} : (stryCov_9fa48("21063"), {
      ...build,
      customAccessories: stryMutAct_9fa48("21064") ? ["Stryker was here"] : (stryCov_9fa48("21064"), [])
    }))), /reference is missing/);
    assert.throws(stryMutAct_9fa48("21066") ? () => undefined : (stryCov_9fa48("21066"), () => parseBuildSnapshot(stryMutAct_9fa48("21067") ? {} : (stryCov_9fa48("21067"), {
      ...build,
      accessories: stryMutAct_9fa48("21068") ? [] : (stryCov_9fa48("21068"), [stryMutAct_9fa48("21069") ? {} : (stryCov_9fa48("21069"), {
        ...selected,
        location: stryMutAct_9fa48("21070") ? {} : (stryCov_9fa48("21070"), {
          kind: stryMutAct_9fa48("21071") ? "" : (stryCov_9fa48("21071"), 'external'),
          position: stryMutAct_9fa48("21072") ? "" : (stryCov_9fa48("21072"), 'right')
        })
      })])
    }))), /different placement/);
    if (stryMutAct_9fa48("21073")) {
      ;
    } else {
      stryCov_9fa48("21073");
      assert.equal(JSON.stringify(pruneBuildImports(defaultBuild)), JSON.stringify(defaultBuild));
    }
    assert.equal(JSON.stringify(parseBuild(stryMutAct_9fa48("21075") ? {} : (stryCov_9fa48("21075"), {
      ...defaultBuild,
      customAccessories: stryMutAct_9fa48("21076") ? ["Stryker was here"] : (stryCov_9fa48("21076"), [])
    }))), JSON.stringify(defaultBuild));
    assert.equal(JSON.stringify(parseSaveBuildRequest(stryMutAct_9fa48("21078") ? {} : (stryCov_9fa48("21078"), {
      operationId: stryMutAct_9fa48("21079") ? "" : (stryCov_9fa48("21079"), 'legacy-operation-1'),
      build: stryMutAct_9fa48("21080") ? {} : (stryCov_9fa48("21080"), {
        ...defaultBuild,
        customAccessories: stryMutAct_9fa48("21081") ? ["Stryker was here"] : (stryCov_9fa48("21081"), [])
      })
    })).build), JSON.stringify(defaultBuild));
    assert.deepEqual(parseSaveBuildRequest(stryMutAct_9fa48("21083") ? {} : (stryCov_9fa48("21083"), {
      operationId: stryMutAct_9fa48("21084") ? "" : (stryCov_9fa48("21084"), 'new-operation-123'),
      build
    })).build.customAccessories, stryMutAct_9fa48("21085") ? [] : (stryCov_9fa48("21085"), [product]));
  }
});
test(stryMutAct_9fa48("21087") ? "" : (stryCov_9fa48("21087"), 'server snapshots freeze imported provenance and reject substituted sources or confirmed fit'), async () => {
  if (stryMutAct_9fa48("21088")) {
    {}
  } else {
    stryCov_9fa48("21088");
    const {
      defaultBuild
    } = await import('../lib/build.ts');
    const {
      newAccessorySelection,
      assessAccessories
    } = await import('../lib/build-accessories.ts');
    const {
      snapshotEvidence
    } = await import('../db/build-snapshot.ts');
    const {
      parsePublicBuildEvidence
    } = await import('../lib/build-evidence.ts');
    const product = await createImportedAccessory(reference);
    const products = resolveAccessoryProducts(stryMutAct_9fa48("21089") ? [] : (stryCov_9fa48("21089"), [product]));
    const selected = newAccessorySelection(product.id, products);
    const build = stryMutAct_9fa48("21090") ? {} : (stryCov_9fa48("21090"), {
      ...defaultBuild,
      customAccessories: stryMutAct_9fa48("21091") ? [] : (stryCov_9fa48("21091"), [product]),
      accessories: stryMutAct_9fa48("21092") ? [] : (stryCov_9fa48("21092"), [selected])
    });
    const saved = JSON.parse(await snapshotEvidence(build));
    const evidence = parsePublicBuildEvidence(saved, build);
    assert.deepEqual(evidence.accessoryReferences, stryMutAct_9fa48("21094") ? [] : (stryCov_9fa48("21094"), [product]));
    assert.equal(evidence.accessoryCompatibility[selected.id].status, stryMutAct_9fa48("21096") ? "" : (stryCov_9fa48("21096"), 'unknown'));
    const altered = structuredClone(saved);
    altered.accessoryReferences[0].source = stryMutAct_9fa48("21097") ? "" : (stryCov_9fa48("21097"), 'https://example.com/different-product');
    assert.throws(stryMutAct_9fa48("21099") ? () => undefined : (stryCov_9fa48("21099"), () => parsePublicBuildEvidence(altered, build)), /evidence mismatch/);
    const forged = structuredClone(saved);
    forged.accessoryCompatibility[selected.id].status = stryMutAct_9fa48("21100") ? "" : (stryCov_9fa48("21100"), 'confirmed');
    assert.throws(stryMutAct_9fa48("21102") ? () => undefined : (stryCov_9fa48("21102"), () => parsePublicBuildEvidence(forged, build)), /cannot be confirmed/);
    const host = stryMutAct_9fa48("21103") ? {} : (stryCov_9fa48("21103"), {
      id: stryMutAct_9fa48("21104") ? "" : (stryCov_9fa48("21104"), 'fictional-host'),
      source: stryMutAct_9fa48("21105") ? "" : (stryCov_9fa48("21105"), 'https://example.com/host'),
      slots: stryMutAct_9fa48("21106") ? [] : (stryCov_9fa48("21106"), [stryMutAct_9fa48("21107") ? {} : (stryCov_9fa48("21107"), {
        id: stryMutAct_9fa48("21108") ? "" : (stryCov_9fa48("21108"), 'slot'),
        kinds: stryMutAct_9fa48("21109") ? [] : (stryCov_9fa48("21109"), [stryMutAct_9fa48("21110") ? "" : (stryCov_9fa48("21110"), 'screen')]),
        capacity: 1
      })]),
      keys: null,
      claims: (stryMutAct_9fa48("21111") ? [] : (stryCov_9fa48("21111"), [stryMutAct_9fa48("21112") ? "" : (stryCov_9fa48("21112"), 'mount'), stryMutAct_9fa48("21113") ? "" : (stryCov_9fa48("21113"), 'electrical'), stryMutAct_9fa48("21114") ? "" : (stryCov_9fa48("21114"), 'firmware'), stryMutAct_9fa48("21115") ? "" : (stryCov_9fa48("21115"), 'clearance')])).map(stryMutAct_9fa48("21116") ? () => undefined : (stryCov_9fa48("21116"), aspect => stryMutAct_9fa48("21117") ? {} : (stryCov_9fa48("21117"), {
        productId: product.id,
        locationId: stryMutAct_9fa48("21118") ? "" : (stryCov_9fa48("21118"), 'slot'),
        aspect,
        status: stryMutAct_9fa48("21119") ? "" : (stryCov_9fa48("21119"), 'confirmed'),
        reason: stryMutAct_9fa48("21120") ? "" : (stryCov_9fa48("21120"), 'Claimed fit'),
        source: stryMutAct_9fa48("21121") ? "" : (stryCov_9fa48("21121"), 'https://example.com/claim')
      })))
    });
    assert.equal(assessAccessories(stryMutAct_9fa48("21123") ? [] : (stryCov_9fa48("21123"), [stryMutAct_9fa48("21124") ? {} : (stryCov_9fa48("21124"), {
      ...selected,
      location: stryMutAct_9fa48("21125") ? {} : (stryCov_9fa48("21125"), {
        kind: stryMutAct_9fa48("21126") ? "" : (stryCov_9fa48("21126"), 'embedded'),
        slotId: stryMutAct_9fa48("21127") ? "" : (stryCov_9fa48("21127"), 'slot')
      })
    })]), host, products)[selected.id].status, stryMutAct_9fa48("21128") ? "" : (stryCov_9fa48("21128"), 'unknown'));
  }
});
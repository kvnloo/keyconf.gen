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
import { createBuildThumbnail, parseBuildThumbnail } from '../lib/build-thumbnail.ts';
const palette = stryMutAct_9fa48("15593") ? {} : (stryCov_9fa48("15593"), {
  name: stryMutAct_9fa48("15594") ? "" : (stryCov_9fa48("15594"), 'Private palette label'),
  alpha: stryMutAct_9fa48("15595") ? "" : (stryCov_9fa48("15595"), '#123456'),
  mod: stryMutAct_9fa48("15596") ? "" : (stryCov_9fa48("15596"), '#abcdef'),
  accent: stryMutAct_9fa48("15597") ? "" : (stryCov_9fa48("15597"), '#FEDCBA'),
  space: stryMutAct_9fa48("15598") ? "" : (stryCov_9fa48("15598"), '#654321')
});
const build = stryMutAct_9fa48("15599") ? {} : (stryCov_9fa48("15599"), {
  ...defaultBuild,
  name: stryMutAct_9fa48("15600") ? "" : (stryCov_9fa48("15600"), 'Private snapshot name'),
  caseColor: stryMutAct_9fa48("15601") ? "" : (stryCov_9fa48("15601"), '#A1B2C3'),
  palette
});
const colors = stryMutAct_9fa48("15602") ? {} : (stryCov_9fa48("15602"), {
  alpha: palette.alpha,
  mod: palette.mod,
  accent: palette.accent,
  space: palette.space
});
test(stryMutAct_9fa48("15604") ? "" : (stryCov_9fa48("15604"), 'thumbnail recipes preserve saved colors and expose only supported visual fields'), () => {
  if (stryMutAct_9fa48("15605")) {
    {}
  } else {
    stryCov_9fa48("15605");
    for (const layout of stryMutAct_9fa48("15606") ? [] : (stryCov_9fa48("15606"), [stryMutAct_9fa48("15607") ? "" : (stryCov_9fa48("15607"), '60'), stryMutAct_9fa48("15608") ? "" : (stryCov_9fa48("15608"), '65'), stryMutAct_9fa48("15609") ? "" : (stryCov_9fa48("15609"), '75')])) {
      if (stryMutAct_9fa48("15610")) {
        {}
      } else {
        stryCov_9fa48("15610");
        const thumbnail = createBuildThumbnail(stryMutAct_9fa48("15611") ? {} : (stryCov_9fa48("15611"), {
          ...build,
          layout
        }));
        assert.deepEqual(thumbnail, stryMutAct_9fa48("15613") ? {} : (stryCov_9fa48("15613"), {
          geometry: stryMutAct_9fa48("15614") ? `` : (stryCov_9fa48("15614"), `generic-${layout}`),
          caseColor: build.caseColor,
          colors
        }));
        if (stryMutAct_9fa48("15615")) {
          ;
        } else {
          stryCov_9fa48("15615");
          assert.deepEqual(parseBuildThumbnail(thumbnail), thumbnail);
        }
        for (const privateValue of stryMutAct_9fa48("15616") ? [] : (stryCov_9fa48("15616"), [stryMutAct_9fa48("15617") ? "" : (stryCov_9fa48("15617"), 'Private'), stryMutAct_9fa48("15618") ? "" : (stryCov_9fa48("15618"), 'selection'), stryMutAct_9fa48("15619") ? "" : (stryCov_9fa48("15619"), 'customParts'), stryMutAct_9fa48("15620") ? "" : (stryCov_9fa48("15620"), 'audio'), stryMutAct_9fa48("15621") ? "" : (stryCov_9fa48("15621"), 'name')])) assert.equal(JSON.stringify(thumbnail).includes(privateValue), stryMutAct_9fa48("15623") ? true : (stryCov_9fa48("15623"), false));
      }
    }
    const thumbnail = createBuildThumbnail(build);
    thumbnail.colors.alpha = stryMutAct_9fa48("15624") ? "" : (stryCov_9fa48("15624"), '#000000');
    assert.equal(build.palette.alpha, stryMutAct_9fa48("15626") ? "" : (stryCov_9fa48("15626"), '#123456'));
  }
});
test(stryMutAct_9fa48("15628") ? "" : (stryCov_9fa48("15628"), 'only the complete Q1 Max 75 percent assembly selects documented ANSI geometry'), () => {
  if (stryMutAct_9fa48("15629")) {
    {}
  } else {
    stryCov_9fa48("15629");
    const q1 = stryMutAct_9fa48("15630") ? {} : (stryCov_9fa48("15630"), {
      ...build,
      layout: stryMutAct_9fa48("15631") ? "" : (stryCov_9fa48("15631"), '75'),
      selection: stryMutAct_9fa48("15632") ? {} : (stryCov_9fa48("15632"), {
        ...build.selection,
        case: stryMutAct_9fa48("15633") ? "" : (stryCov_9fa48("15633"), 'q1-max-case'),
        pcb: stryMutAct_9fa48("15634") ? "" : (stryCov_9fa48("15634"), 'q1-max-pcb'),
        plate: stryMutAct_9fa48("15635") ? "" : (stryCov_9fa48("15635"), 'q1-max-plate')
      })
    });
    assert.equal(createBuildThumbnail(q1).geometry, stryMutAct_9fa48("15637") ? "" : (stryCov_9fa48("15637"), 'q1-max-ansi'));
    for (const category of stryMutAct_9fa48("15638") ? [] : (stryCov_9fa48("15638"), [stryMutAct_9fa48("15639") ? "" : (stryCov_9fa48("15639"), 'case'), stryMutAct_9fa48("15640") ? "" : (stryCov_9fa48("15640"), 'pcb'), stryMutAct_9fa48("15641") ? "" : (stryCov_9fa48("15641"), 'plate')])) assert.equal(createBuildThumbnail(stryMutAct_9fa48("15643") ? {} : (stryCov_9fa48("15643"), {
      ...q1,
      selection: stryMutAct_9fa48("15644") ? {} : (stryCov_9fa48("15644"), {
        ...q1.selection,
        [category]: stryMutAct_9fa48("15645") ? "" : (stryCov_9fa48("15645"), 'another-part')
      })
    })).geometry, stryMutAct_9fa48("15646") ? "" : (stryCov_9fa48("15646"), 'generic-75'));
    assert.equal(createBuildThumbnail(stryMutAct_9fa48("15648") ? {} : (stryCov_9fa48("15648"), {
      ...q1,
      layout: stryMutAct_9fa48("15649") ? "" : (stryCov_9fa48("15649"), '65')
    })).geometry, stryMutAct_9fa48("15650") ? "" : (stryCov_9fa48("15650"), 'generic-65'));
    assert.equal(createBuildThumbnail(stryMutAct_9fa48("15652") ? {} : (stryCov_9fa48("15652"), {
      ...build,
      layout: stryMutAct_9fa48("15653") ? "" : (stryCov_9fa48("15653"), '100')
    })), null);
    assert.equal(createBuildThumbnail(stryMutAct_9fa48("15655") ? {} : (stryCov_9fa48("15655"), {
      ...build,
      layout: stryMutAct_9fa48("15656") ? "" : (stryCov_9fa48("15656"), 'split')
    })), null);
  }
});
test(stryMutAct_9fa48("15658") ? "" : (stryCov_9fa48("15658"), 'retired component IDs preserve the saved layout study instead of substituting a product'), () => {
  if (stryMutAct_9fa48("15659")) {
    {}
  } else {
    stryCov_9fa48("15659");
    const thumbnail = createBuildThumbnail(stryMutAct_9fa48("15660") ? {} : (stryCov_9fa48("15660"), {
      ...build,
      layout: stryMutAct_9fa48("15661") ? "" : (stryCov_9fa48("15661"), '65'),
      selection: stryMutAct_9fa48("15662") ? {} : (stryCov_9fa48("15662"), {
        ...build.selection,
        case: stryMutAct_9fa48("15663") ? "" : (stryCov_9fa48("15663"), 'retired-case'),
        pcb: stryMutAct_9fa48("15664") ? "" : (stryCov_9fa48("15664"), 'retired-pcb'),
        plate: stryMutAct_9fa48("15665") ? "" : (stryCov_9fa48("15665"), 'retired-plate')
      })
    }));
    assert.deepEqual(thumbnail, stryMutAct_9fa48("15667") ? {} : (stryCov_9fa48("15667"), {
      geometry: stryMutAct_9fa48("15668") ? "" : (stryCov_9fa48("15668"), 'generic-65'),
      caseColor: build.caseColor,
      colors
    }));
  }
});
test(stryMutAct_9fa48("15670") ? "" : (stryCov_9fa48("15670"), 'thumbnail parsing supports older responses and rejects malformed supplied recipes'), () => {
  if (stryMutAct_9fa48("15671")) {
    {}
  } else {
    stryCov_9fa48("15671");
    if (stryMutAct_9fa48("15672")) {
      ;
    } else {
      stryCov_9fa48("15672");
      assert.equal(parseBuildThumbnail(undefined), null);
    }
    if (stryMutAct_9fa48("15673")) {
      ;
    } else {
      stryCov_9fa48("15673");
      assert.equal(parseBuildThumbnail(null), null);
    }
    const valid = createBuildThumbnail(build);
    assert.deepEqual(parseBuildThumbnail(stryMutAct_9fa48("15675") ? {} : (stryCov_9fa48("15675"), {
      ...valid,
      owner: stryMutAct_9fa48("15676") ? "" : (stryCov_9fa48("15676"), 'private'),
      colors: stryMutAct_9fa48("15677") ? {} : (stryCov_9fa48("15677"), {
        ...colors,
        name: stryMutAct_9fa48("15678") ? "" : (stryCov_9fa48("15678"), 'private')
      })
    })), valid);
    for (const value of stryMutAct_9fa48("15679") ? [] : (stryCov_9fa48("15679"), [stryMutAct_9fa48("15680") ? true : (stryCov_9fa48("15680"), false), stryMutAct_9fa48("15681") ? "Stryker was here!" : (stryCov_9fa48("15681"), ''), stryMutAct_9fa48("15682") ? ["Stryker was here"] : (stryCov_9fa48("15682"), []), {}, stryMutAct_9fa48("15683") ? {} : (stryCov_9fa48("15683"), {
      ...valid,
      geometry: stryMutAct_9fa48("15684") ? "" : (stryCov_9fa48("15684"), 'manufacturer-cad')
    }), stryMutAct_9fa48("15685") ? {} : (stryCov_9fa48("15685"), {
      ...valid,
      geometry: stryMutAct_9fa48("15686") ? "" : (stryCov_9fa48("15686"), 'generic-100')
    }), stryMutAct_9fa48("15687") ? {} : (stryCov_9fa48("15687"), {
      ...valid,
      colors: null
    }), stryMutAct_9fa48("15688") ? {} : (stryCov_9fa48("15688"), {
      ...valid,
      colors: stryMutAct_9fa48("15689") ? {} : (stryCov_9fa48("15689"), {
        alpha: stryMutAct_9fa48("15690") ? "" : (stryCov_9fa48("15690"), '#123456')
      })
    }), stryMutAct_9fa48("15691") ? {} : (stryCov_9fa48("15691"), {
      ...valid,
      caseColor: stryMutAct_9fa48("15692") ? "" : (stryCov_9fa48("15692"), '#fff')
    }), stryMutAct_9fa48("15693") ? {} : (stryCov_9fa48("15693"), {
      ...valid,
      caseColor: stryMutAct_9fa48("15694") ? "" : (stryCov_9fa48("15694"), 'url(https://example.com/private)')
    }), stryMutAct_9fa48("15695") ? {} : (stryCov_9fa48("15695"), {
      ...valid,
      colors: stryMutAct_9fa48("15696") ? {} : (stryCov_9fa48("15696"), {
        ...colors,
        space: stryMutAct_9fa48("15697") ? "" : (stryCov_9fa48("15697"), '#12345z')
      })
    })])) assert.throws(stryMutAct_9fa48("15699") ? () => undefined : (stryCov_9fa48("15699"), () => parseBuildThumbnail(value)));
  }
});
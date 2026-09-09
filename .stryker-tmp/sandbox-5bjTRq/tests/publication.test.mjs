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
import { parsePublicationRequest } from '../lib/publication.ts';
const request = stryMutAct_9fa48("21751") ? {} : (stryCov_9fa48("21751"), {
  operationId: stryMutAct_9fa48("21752") ? "" : (stryCov_9fa48("21752"), 'publication-operation-01'),
  buildId: stryMutAct_9fa48("21753") ? "" : (stryCov_9fa48("21753"), 'saved-build-reference-01'),
  title: stryMutAct_9fa48("21754") ? "" : (stryCov_9fa48("21754"), ' Client build '),
  note: stryMutAct_9fa48("21755") ? "" : (stryCov_9fa48("21755"), 'First paragraph.\r\n\r\nSecond paragraph.'),
  kind: stryMutAct_9fa48("21756") ? "" : (stryCov_9fa48("21756"), 'build')
});
test(stryMutAct_9fa48("21758") ? "" : (stryCov_9fa48("21758"), 'publication request normalizes release text and excludes client ownership and evidence claims'), () => {
  if (stryMutAct_9fa48("21759")) {
    {}
  } else {
    stryCov_9fa48("21759");
    assert.deepEqual(parsePublicationRequest(stryMutAct_9fa48("21761") ? {} : (stryCov_9fa48("21761"), {
      ...request,
      accountId: stryMutAct_9fa48("21762") ? "" : (stryCov_9fa48("21762"), 'forged'),
      evidence: stryMutAct_9fa48("21763") ? {} : (stryCov_9fa48("21763"), {
        status: stryMutAct_9fa48("21764") ? "" : (stryCov_9fa48("21764"), 'confirmed')
      })
    })), stryMutAct_9fa48("21765") ? {} : (stryCov_9fa48("21765"), {
      operationId: request.operationId,
      buildId: request.buildId,
      title: stryMutAct_9fa48("21766") ? "" : (stryCov_9fa48("21766"), 'Client build'),
      note: stryMutAct_9fa48("21767") ? "" : (stryCov_9fa48("21767"), 'First paragraph.\n\nSecond paragraph.'),
      kind: stryMutAct_9fa48("21768") ? "" : (stryCov_9fa48("21768"), 'build')
    }));
    const drop = parsePublicationRequest(stryMutAct_9fa48("21769") ? {} : (stryCov_9fa48("21769"), {
      ...request,
      kind: stryMutAct_9fa48("21770") ? "" : (stryCov_9fa48("21770"), 'drop'),
      availability: stryMutAct_9fa48("21771") ? "" : (stryCov_9fa48("21771"), 'Ask the creator'),
      externalUrl: stryMutAct_9fa48("21772") ? "" : (stryCov_9fa48("21772"), 'https://example.com')
    }));
    assert.equal(drop.externalUrl, stryMutAct_9fa48("21774") ? "" : (stryCov_9fa48("21774"), 'https://example.com/'));
  }
});
test(stryMutAct_9fa48("21776") ? "" : (stryCov_9fa48("21776"), 'publication boundary rejects invalid revision references and unsafe drop links'), () => {
  if (stryMutAct_9fa48("21777")) {
    {}
  } else {
    stryCov_9fa48("21777");
    for (const value of stryMutAct_9fa48("21778") ? [] : (stryCov_9fa48("21778"), [stryMutAct_9fa48("21779") ? {} : (stryCov_9fa48("21779"), {
      ...request,
      buildId: stryMutAct_9fa48("21780") ? "" : (stryCov_9fa48("21780"), 'missing')
    }), stryMutAct_9fa48("21781") ? {} : (stryCov_9fa48("21781"), {
      ...request,
      title: stryMutAct_9fa48("21782") ? "Stryker was here!" : (stryCov_9fa48("21782"), '')
    }), stryMutAct_9fa48("21783") ? {} : (stryCov_9fa48("21783"), {
      ...request,
      title: stryMutAct_9fa48("21784") ? "" : (stryCov_9fa48("21784"), 'two\nlines')
    }), stryMutAct_9fa48("21785") ? {} : (stryCov_9fa48("21785"), {
      ...request,
      note: (stryMutAct_9fa48("21786") ? "" : (stryCov_9fa48("21786"), 'x')).repeat(1201)
    }), stryMutAct_9fa48("21787") ? {} : (stryCov_9fa48("21787"), {
      ...request,
      kind: stryMutAct_9fa48("21788") ? "" : (stryCov_9fa48("21788"), 'unknown')
    }), stryMutAct_9fa48("21789") ? {} : (stryCov_9fa48("21789"), {
      ...request,
      kind: stryMutAct_9fa48("21790") ? "" : (stryCov_9fa48("21790"), 'drop'),
      availability: stryMutAct_9fa48("21791") ? "Stryker was here!" : (stryCov_9fa48("21791"), ''),
      externalUrl: stryMutAct_9fa48("21792") ? "" : (stryCov_9fa48("21792"), 'javascript:alert(1)')
    }), stryMutAct_9fa48("21793") ? {} : (stryCov_9fa48("21793"), {
      ...request,
      kind: stryMutAct_9fa48("21794") ? "" : (stryCov_9fa48("21794"), 'drop'),
      availability: stryMutAct_9fa48("21795") ? "Stryker was here!" : (stryCov_9fa48("21795"), ''),
      externalUrl: stryMutAct_9fa48("21796") ? "" : (stryCov_9fa48("21796"), 'https://user:secret@example.com')
    })])) assert.throws(stryMutAct_9fa48("21798") ? () => undefined : (stryCov_9fa48("21798"), () => parsePublicationRequest(value)), stryMutAct_9fa48("21799") ? {} : (stryCov_9fa48("21799"), {
      code: stryMutAct_9fa48("21800") ? "" : (stryCov_9fa48("21800"), 'invalid_request')
    }));
  }
});
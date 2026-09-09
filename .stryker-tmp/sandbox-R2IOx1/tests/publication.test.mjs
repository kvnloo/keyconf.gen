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
const request = stryMutAct_9fa48("21820") ? {} : (stryCov_9fa48("21820"), {
  operationId: stryMutAct_9fa48("21821") ? "" : (stryCov_9fa48("21821"), 'publication-operation-01'),
  buildId: stryMutAct_9fa48("21822") ? "" : (stryCov_9fa48("21822"), 'saved-build-reference-01'),
  title: stryMutAct_9fa48("21823") ? "" : (stryCov_9fa48("21823"), ' Client build '),
  note: stryMutAct_9fa48("21824") ? "" : (stryCov_9fa48("21824"), 'First paragraph.\r\n\r\nSecond paragraph.'),
  kind: stryMutAct_9fa48("21825") ? "" : (stryCov_9fa48("21825"), 'build')
});
test(stryMutAct_9fa48("21827") ? "" : (stryCov_9fa48("21827"), 'publication request normalizes release text and excludes client ownership and evidence claims'), () => {
  if (stryMutAct_9fa48("21828")) {
    {}
  } else {
    stryCov_9fa48("21828");
    assert.deepEqual(parsePublicationRequest(stryMutAct_9fa48("21830") ? {} : (stryCov_9fa48("21830"), {
      ...request,
      accountId: stryMutAct_9fa48("21831") ? "" : (stryCov_9fa48("21831"), 'forged'),
      evidence: stryMutAct_9fa48("21832") ? {} : (stryCov_9fa48("21832"), {
        status: stryMutAct_9fa48("21833") ? "" : (stryCov_9fa48("21833"), 'confirmed')
      })
    })), stryMutAct_9fa48("21834") ? {} : (stryCov_9fa48("21834"), {
      operationId: request.operationId,
      buildId: request.buildId,
      title: stryMutAct_9fa48("21835") ? "" : (stryCov_9fa48("21835"), 'Client build'),
      note: stryMutAct_9fa48("21836") ? "" : (stryCov_9fa48("21836"), 'First paragraph.\n\nSecond paragraph.'),
      kind: stryMutAct_9fa48("21837") ? "" : (stryCov_9fa48("21837"), 'build')
    }));
    const drop = parsePublicationRequest(stryMutAct_9fa48("21838") ? {} : (stryCov_9fa48("21838"), {
      ...request,
      kind: stryMutAct_9fa48("21839") ? "" : (stryCov_9fa48("21839"), 'drop'),
      availability: stryMutAct_9fa48("21840") ? "" : (stryCov_9fa48("21840"), 'Ask the creator'),
      externalUrl: stryMutAct_9fa48("21841") ? "" : (stryCov_9fa48("21841"), 'https://example.com')
    }));
    assert.equal(drop.externalUrl, stryMutAct_9fa48("21843") ? "" : (stryCov_9fa48("21843"), 'https://example.com/'));
  }
});
test(stryMutAct_9fa48("21845") ? "" : (stryCov_9fa48("21845"), 'publication boundary rejects invalid revision references and unsafe drop links'), () => {
  if (stryMutAct_9fa48("21846")) {
    {}
  } else {
    stryCov_9fa48("21846");
    for (const value of stryMutAct_9fa48("21847") ? [] : (stryCov_9fa48("21847"), [stryMutAct_9fa48("21848") ? {} : (stryCov_9fa48("21848"), {
      ...request,
      buildId: stryMutAct_9fa48("21849") ? "" : (stryCov_9fa48("21849"), 'missing')
    }), stryMutAct_9fa48("21850") ? {} : (stryCov_9fa48("21850"), {
      ...request,
      title: stryMutAct_9fa48("21851") ? "Stryker was here!" : (stryCov_9fa48("21851"), '')
    }), stryMutAct_9fa48("21852") ? {} : (stryCov_9fa48("21852"), {
      ...request,
      title: stryMutAct_9fa48("21853") ? "" : (stryCov_9fa48("21853"), 'two\nlines')
    }), stryMutAct_9fa48("21854") ? {} : (stryCov_9fa48("21854"), {
      ...request,
      note: (stryMutAct_9fa48("21855") ? "" : (stryCov_9fa48("21855"), 'x')).repeat(1201)
    }), stryMutAct_9fa48("21856") ? {} : (stryCov_9fa48("21856"), {
      ...request,
      kind: stryMutAct_9fa48("21857") ? "" : (stryCov_9fa48("21857"), 'unknown')
    }), stryMutAct_9fa48("21858") ? {} : (stryCov_9fa48("21858"), {
      ...request,
      kind: stryMutAct_9fa48("21859") ? "" : (stryCov_9fa48("21859"), 'drop'),
      availability: stryMutAct_9fa48("21860") ? "Stryker was here!" : (stryCov_9fa48("21860"), ''),
      externalUrl: stryMutAct_9fa48("21861") ? "" : (stryCov_9fa48("21861"), 'javascript:alert(1)')
    }), stryMutAct_9fa48("21862") ? {} : (stryCov_9fa48("21862"), {
      ...request,
      kind: stryMutAct_9fa48("21863") ? "" : (stryCov_9fa48("21863"), 'drop'),
      availability: stryMutAct_9fa48("21864") ? "Stryker was here!" : (stryCov_9fa48("21864"), ''),
      externalUrl: stryMutAct_9fa48("21865") ? "" : (stryCov_9fa48("21865"), 'https://user:secret@example.com')
    })])) assert.throws(stryMutAct_9fa48("21867") ? () => undefined : (stryCov_9fa48("21867"), () => parsePublicationRequest(value)), stryMutAct_9fa48("21868") ? {} : (stryCov_9fa48("21868"), {
      code: stryMutAct_9fa48("21869") ? "" : (stryCov_9fa48("21869"), 'invalid_request')
    }));
  }
});
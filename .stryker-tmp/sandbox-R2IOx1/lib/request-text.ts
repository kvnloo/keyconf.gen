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
export async function requestText(request: Pick<Request, 'headers' | 'body'>, maxRequestBytes: number): Promise<string | null> {
  if (stryMutAct_9fa48("14083")) {
    {}
  } else {
    stryCov_9fa48("14083");
    if (stryMutAct_9fa48("14087") ? Number(request.headers.get('content-length')) <= maxRequestBytes : stryMutAct_9fa48("14086") ? Number(request.headers.get('content-length')) >= maxRequestBytes : stryMutAct_9fa48("14085") ? false : stryMutAct_9fa48("14084") ? true : (stryCov_9fa48("14084", "14085", "14086", "14087"), Number(request.headers.get(stryMutAct_9fa48("14088") ? "" : (stryCov_9fa48("14088"), 'content-length'))) > maxRequestBytes)) {
      if (stryMutAct_9fa48("14089")) {
        {}
      } else {
        stryCov_9fa48("14089");
        await (stryMutAct_9fa48("14090") ? request.body.cancel() : (stryCov_9fa48("14090"), request.body?.cancel()));
        return null;
      }
    }
    if (stryMutAct_9fa48("14093") ? false : stryMutAct_9fa48("14092") ? true : stryMutAct_9fa48("14091") ? request.body : (stryCov_9fa48("14091", "14092", "14093"), !request.body)) return stryMutAct_9fa48("14094") ? "Stryker was here!" : (stryCov_9fa48("14094"), '');
    const reader = request.body.getReader();
    const decoder = new TextDecoder();
    let bytes = 0;
    let text = stryMutAct_9fa48("14095") ? "Stryker was here!" : (stryCov_9fa48("14095"), '');
    try {
      if (stryMutAct_9fa48("14096")) {
        {}
      } else {
        stryCov_9fa48("14096");
        while (stryMutAct_9fa48("14098") ? false : stryMutAct_9fa48("14097") ? false : (stryCov_9fa48("14097", "14098"), true)) {
          if (stryMutAct_9fa48("14099")) {
            {}
          } else {
            stryCov_9fa48("14099");
            const chunk = await reader.read();
            if (stryMutAct_9fa48("14101") ? false : stryMutAct_9fa48("14100") ? true : (stryCov_9fa48("14100", "14101"), chunk.done)) return stryMutAct_9fa48("14102") ? text - decoder.decode() : (stryCov_9fa48("14102"), text + decoder.decode());
            stryMutAct_9fa48("14103") ? bytes -= chunk.value.byteLength : (stryCov_9fa48("14103"), bytes += chunk.value.byteLength);
            if (stryMutAct_9fa48("14107") ? bytes <= maxRequestBytes : stryMutAct_9fa48("14106") ? bytes >= maxRequestBytes : stryMutAct_9fa48("14105") ? false : stryMutAct_9fa48("14104") ? true : (stryCov_9fa48("14104", "14105", "14106", "14107"), bytes > maxRequestBytes)) {
              if (stryMutAct_9fa48("14108")) {
                {}
              } else {
                stryCov_9fa48("14108");
                await reader.cancel();
                return null;
              }
            }
            stryMutAct_9fa48("14109") ? text -= decoder.decode(chunk.value, {
              stream: true
            }) : (stryCov_9fa48("14109"), text += decoder.decode(chunk.value, stryMutAct_9fa48("14110") ? {} : (stryCov_9fa48("14110"), {
              stream: stryMutAct_9fa48("14111") ? false : (stryCov_9fa48("14111"), true)
            })));
          }
        }
      }
    } finally {
      if (stryMutAct_9fa48("14112")) {
        {}
      } else {
        stryCov_9fa48("14112");
        if (stryMutAct_9fa48("14113")) {
          ;
        } else {
          stryCov_9fa48("14113");
          reader.releaseLock();
        }
      }
    }
  }
}
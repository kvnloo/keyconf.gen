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
export type TypingMessage = {
  event: 'ready' | 'clear';
} | {
  event: 'height';
  height: number;
} | {
  event: 'key';
  code: string;
  down: boolean;
};
export function parseTypingMessage(value: unknown): TypingMessage | null {
  if (stryMutAct_9fa48("14576")) {
    {}
  } else {
    stryCov_9fa48("14576");
    if (stryMutAct_9fa48("14579") ? (!value || typeof value !== 'object' || !('type' in value) || value.type !== 'keyconf:monkeytype') && !('event' in value) : stryMutAct_9fa48("14578") ? false : stryMutAct_9fa48("14577") ? true : (stryCov_9fa48("14577", "14578", "14579"), (stryMutAct_9fa48("14581") ? (!value || typeof value !== 'object' || !('type' in value)) && value.type !== 'keyconf:monkeytype' : stryMutAct_9fa48("14580") ? false : (stryCov_9fa48("14580", "14581"), (stryMutAct_9fa48("14583") ? (!value || typeof value !== 'object') && !('type' in value) : stryMutAct_9fa48("14582") ? false : (stryCov_9fa48("14582", "14583"), (stryMutAct_9fa48("14585") ? !value && typeof value !== 'object' : stryMutAct_9fa48("14584") ? false : (stryCov_9fa48("14584", "14585"), (stryMutAct_9fa48("14586") ? value : (stryCov_9fa48("14586"), !value)) || (stryMutAct_9fa48("14588") ? typeof value === 'object' : stryMutAct_9fa48("14587") ? false : (stryCov_9fa48("14587", "14588"), typeof value !== (stryMutAct_9fa48("14589") ? "" : (stryCov_9fa48("14589"), 'object')))))) || (stryMutAct_9fa48("14590") ? 'type' in value : (stryCov_9fa48("14590"), !((stryMutAct_9fa48("14591") ? "" : (stryCov_9fa48("14591"), 'type')) in value))))) || (stryMutAct_9fa48("14593") ? value.type === 'keyconf:monkeytype' : stryMutAct_9fa48("14592") ? false : (stryCov_9fa48("14592", "14593"), value.type !== (stryMutAct_9fa48("14594") ? "" : (stryCov_9fa48("14594"), 'keyconf:monkeytype')))))) || (stryMutAct_9fa48("14595") ? 'event' in value : (stryCov_9fa48("14595"), !((stryMutAct_9fa48("14596") ? "" : (stryCov_9fa48("14596"), 'event')) in value))))) return null;
    if (stryMutAct_9fa48("14599") ? value.event === 'ready' && value.event === 'clear' : stryMutAct_9fa48("14598") ? false : stryMutAct_9fa48("14597") ? true : (stryCov_9fa48("14597", "14598", "14599"), (stryMutAct_9fa48("14601") ? value.event !== 'ready' : stryMutAct_9fa48("14600") ? false : (stryCov_9fa48("14600", "14601"), value.event === (stryMutAct_9fa48("14602") ? "" : (stryCov_9fa48("14602"), 'ready')))) || (stryMutAct_9fa48("14604") ? value.event !== 'clear' : stryMutAct_9fa48("14603") ? false : (stryCov_9fa48("14603", "14604"), value.event === (stryMutAct_9fa48("14605") ? "" : (stryCov_9fa48("14605"), 'clear')))))) return stryMutAct_9fa48("14606") ? {} : (stryCov_9fa48("14606"), {
      event: value.event
    });
    if (stryMutAct_9fa48("14609") ? value.event === 'height' && 'height' in value && typeof value.height === 'number' || Number.isFinite(value.height) : stryMutAct_9fa48("14608") ? false : stryMutAct_9fa48("14607") ? true : (stryCov_9fa48("14607", "14608", "14609"), (stryMutAct_9fa48("14611") ? value.event === 'height' && 'height' in value || typeof value.height === 'number' : stryMutAct_9fa48("14610") ? true : (stryCov_9fa48("14610", "14611"), (stryMutAct_9fa48("14613") ? value.event === 'height' || 'height' in value : stryMutAct_9fa48("14612") ? true : (stryCov_9fa48("14612", "14613"), (stryMutAct_9fa48("14615") ? value.event !== 'height' : stryMutAct_9fa48("14614") ? true : (stryCov_9fa48("14614", "14615"), value.event === (stryMutAct_9fa48("14616") ? "" : (stryCov_9fa48("14616"), 'height')))) && (stryMutAct_9fa48("14617") ? "" : (stryCov_9fa48("14617"), 'height')) in value)) && (stryMutAct_9fa48("14619") ? typeof value.height !== 'number' : stryMutAct_9fa48("14618") ? true : (stryCov_9fa48("14618", "14619"), typeof value.height === (stryMutAct_9fa48("14620") ? "" : (stryCov_9fa48("14620"), 'number')))))) && Number.isFinite(value.height))) return stryMutAct_9fa48("14621") ? {} : (stryCov_9fa48("14621"), {
      event: stryMutAct_9fa48("14622") ? "" : (stryCov_9fa48("14622"), 'height'),
      height: stryMutAct_9fa48("14623") ? Math.max(720, Math.max(260, value.height)) : (stryCov_9fa48("14623"), Math.min(720, stryMutAct_9fa48("14624") ? Math.min(260, value.height) : (stryCov_9fa48("14624"), Math.max(260, value.height))))
    });
    if (stryMutAct_9fa48("14627") ? value.event === 'key' && 'code' in value && typeof value.code === 'string' && /^(Key[A-Z]|Digit[0-9]|Space|Backspace|Enter|ShiftLeft|ShiftRight|Comma|Period|Slash|Semicolon|Quote|BracketLeft|BracketRight|Backslash|Minus|Equal|Backquote)$/.test(value.code) && 'down' in value || typeof value.down === 'boolean' : stryMutAct_9fa48("14626") ? false : stryMutAct_9fa48("14625") ? true : (stryCov_9fa48("14625", "14626", "14627"), (stryMutAct_9fa48("14629") ? value.event === 'key' && 'code' in value && typeof value.code === 'string' && /^(Key[A-Z]|Digit[0-9]|Space|Backspace|Enter|ShiftLeft|ShiftRight|Comma|Period|Slash|Semicolon|Quote|BracketLeft|BracketRight|Backslash|Minus|Equal|Backquote)$/.test(value.code) || 'down' in value : stryMutAct_9fa48("14628") ? true : (stryCov_9fa48("14628", "14629"), (stryMutAct_9fa48("14631") ? value.event === 'key' && 'code' in value && typeof value.code === 'string' || /^(Key[A-Z]|Digit[0-9]|Space|Backspace|Enter|ShiftLeft|ShiftRight|Comma|Period|Slash|Semicolon|Quote|BracketLeft|BracketRight|Backslash|Minus|Equal|Backquote)$/.test(value.code) : stryMutAct_9fa48("14630") ? true : (stryCov_9fa48("14630", "14631"), (stryMutAct_9fa48("14633") ? value.event === 'key' && 'code' in value || typeof value.code === 'string' : stryMutAct_9fa48("14632") ? true : (stryCov_9fa48("14632", "14633"), (stryMutAct_9fa48("14635") ? value.event === 'key' || 'code' in value : stryMutAct_9fa48("14634") ? true : (stryCov_9fa48("14634", "14635"), (stryMutAct_9fa48("14637") ? value.event !== 'key' : stryMutAct_9fa48("14636") ? true : (stryCov_9fa48("14636", "14637"), value.event === (stryMutAct_9fa48("14638") ? "" : (stryCov_9fa48("14638"), 'key')))) && (stryMutAct_9fa48("14639") ? "" : (stryCov_9fa48("14639"), 'code')) in value)) && (stryMutAct_9fa48("14641") ? typeof value.code !== 'string' : stryMutAct_9fa48("14640") ? true : (stryCov_9fa48("14640", "14641"), typeof value.code === (stryMutAct_9fa48("14642") ? "" : (stryCov_9fa48("14642"), 'string')))))) && (stryMutAct_9fa48("14646") ? /^(Key[A-Z]|Digit[^0-9]|Space|Backspace|Enter|ShiftLeft|ShiftRight|Comma|Period|Slash|Semicolon|Quote|BracketLeft|BracketRight|Backslash|Minus|Equal|Backquote)$/ : stryMutAct_9fa48("14645") ? /^(Key[^A-Z]|Digit[0-9]|Space|Backspace|Enter|ShiftLeft|ShiftRight|Comma|Period|Slash|Semicolon|Quote|BracketLeft|BracketRight|Backslash|Minus|Equal|Backquote)$/ : stryMutAct_9fa48("14644") ? /^(Key[A-Z]|Digit[0-9]|Space|Backspace|Enter|ShiftLeft|ShiftRight|Comma|Period|Slash|Semicolon|Quote|BracketLeft|BracketRight|Backslash|Minus|Equal|Backquote)/ : stryMutAct_9fa48("14643") ? /(Key[A-Z]|Digit[0-9]|Space|Backspace|Enter|ShiftLeft|ShiftRight|Comma|Period|Slash|Semicolon|Quote|BracketLeft|BracketRight|Backslash|Minus|Equal|Backquote)$/ : (stryCov_9fa48("14643", "14644", "14645", "14646"), /^(Key[A-Z]|Digit[0-9]|Space|Backspace|Enter|ShiftLeft|ShiftRight|Comma|Period|Slash|Semicolon|Quote|BracketLeft|BracketRight|Backslash|Minus|Equal|Backquote)$/)).test(value.code))) && (stryMutAct_9fa48("14647") ? "" : (stryCov_9fa48("14647"), 'down')) in value)) && (stryMutAct_9fa48("14649") ? typeof value.down !== 'boolean' : stryMutAct_9fa48("14648") ? true : (stryCov_9fa48("14648", "14649"), typeof value.down === (stryMutAct_9fa48("14650") ? "" : (stryCov_9fa48("14650"), 'boolean')))))) return stryMutAct_9fa48("14651") ? {} : (stryCov_9fa48("14651"), {
      event: stryMutAct_9fa48("14652") ? "" : (stryCov_9fa48("14652"), 'key'),
      code: value.code,
      down: value.down
    });
    return null;
  }
}
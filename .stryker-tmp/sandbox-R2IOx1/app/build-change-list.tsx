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
import type { compareBuilds } from '../lib/build-comparison';
export default function BuildChangeList({
  changes,
  beforeLabel,
  afterLabel
}: {
  changes: ReturnType<typeof compareBuilds>;
  beforeLabel: string;
  afterLabel: string;
}) {
  if (stryMutAct_9fa48("277")) {
    {}
  } else {
    stryCov_9fa48("277");
    return <dl className="build-change-list">
      {changes.map(stryMutAct_9fa48("278") ? () => undefined : (stryCov_9fa48("278"), change => <div key={change.label}>
          <dt>{change.label}</dt>
          <dd>
            <span>{beforeLabel}</span>
            {stryMutAct_9fa48("281") ? /^#[0-9a-f]{6}$/i.test(change.before) || <i aria-hidden="true" style={{
            backgroundColor: change.before
          }} /> : stryMutAct_9fa48("280") ? false : stryMutAct_9fa48("279") ? true : (stryCov_9fa48("279", "280", "281"), (stryMutAct_9fa48("285") ? /^#[^0-9a-f]{6}$/i : stryMutAct_9fa48("284") ? /^#[0-9a-f]$/i : stryMutAct_9fa48("283") ? /^#[0-9a-f]{6}/i : stryMutAct_9fa48("282") ? /#[0-9a-f]{6}$/i : (stryCov_9fa48("282", "283", "284", "285"), /^#[0-9a-f]{6}$/i)).test(change.before) && <i aria-hidden="true" style={stryMutAct_9fa48("286") ? {} : (stryCov_9fa48("286"), {
            backgroundColor: change.before
          })} />)}
            {change.before}
            {change.beforeSources.map(stryMutAct_9fa48("287") ? () => undefined : (stryCov_9fa48("287"), source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">
                Visit {source.name} ↗
              </a>))}
          </dd>
          <dd>
            <span>{afterLabel}</span>
            {stryMutAct_9fa48("290") ? /^#[0-9a-f]{6}$/i.test(change.after) || <i aria-hidden="true" style={{
            backgroundColor: change.after
          }} /> : stryMutAct_9fa48("289") ? false : stryMutAct_9fa48("288") ? true : (stryCov_9fa48("288", "289", "290"), (stryMutAct_9fa48("294") ? /^#[^0-9a-f]{6}$/i : stryMutAct_9fa48("293") ? /^#[0-9a-f]$/i : stryMutAct_9fa48("292") ? /^#[0-9a-f]{6}/i : stryMutAct_9fa48("291") ? /#[0-9a-f]{6}$/i : (stryCov_9fa48("291", "292", "293", "294"), /^#[0-9a-f]{6}$/i)).test(change.after) && <i aria-hidden="true" style={stryMutAct_9fa48("295") ? {} : (stryCov_9fa48("295"), {
            backgroundColor: change.after
          })} />)}
            {change.after}
            {change.afterSources.map(stryMutAct_9fa48("296") ? () => undefined : (stryCov_9fa48("296"), source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer">
                Visit {source.name} ↗
              </a>))}
          </dd>
        </div>))}
    </dl>;
  }
}
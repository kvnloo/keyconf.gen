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
import { isImportResult, publicUrl, type ImportedProduct } from './import-products.ts';
export async function snapshotDigest(payload: string) {
  if (stryMutAct_9fa48("7425")) {
    {}
  } else {
    stryCov_9fa48("7425");
    const digest = await crypto.subtle.digest(stryMutAct_9fa48("7426") ? "" : (stryCov_9fa48("7426"), 'SHA-256'), new TextEncoder().encode(payload));
    return Array.from(new Uint8Array(digest), stryMutAct_9fa48("7427") ? () => undefined : (stryCov_9fa48("7427"), byte => byte.toString(16).padStart(2, stryMutAct_9fa48("7428") ? "" : (stryCov_9fa48("7428"), '0')))).join(stryMutAct_9fa48("7429") ? "Stryker was here!" : (stryCov_9fa48("7429"), ''));
  }
}
export async function parseCatalogSnapshot(payload: string) {
  if (stryMutAct_9fa48("7430")) {
    {}
  } else {
    stryCov_9fa48("7430");
    if (stryMutAct_9fa48("7434") ? new TextEncoder().encode(payload).byteLength <= 500_000 : stryMutAct_9fa48("7433") ? new TextEncoder().encode(payload).byteLength >= 500_000 : stryMutAct_9fa48("7432") ? false : stryMutAct_9fa48("7431") ? true : (stryCov_9fa48("7431", "7432", "7433", "7434"), new TextEncoder().encode(payload).byteLength > 500_000)) throw new Error(stryMutAct_9fa48("7436") ? "" : (stryCov_9fa48("7436"), 'Catalog snapshot exceeds 500 KB.'));
    const value: unknown = JSON.parse(payload);
    if (stryMutAct_9fa48("7439") ? (!value || typeof value !== 'object' || !('schemaVersion' in value) || value.schemaVersion !== 1 || !('source' in value) || typeof value.source !== 'string' || publicUrl(value.source).href !== value.source || !('evidence' in value) || !Array.isArray(value.evidence) || value.evidence.length < 1 || value.evidence.length > 100 || !('pages' in value) || value.pages !== value.evidence.length) && !('observations' in value) : stryMutAct_9fa48("7438") ? false : stryMutAct_9fa48("7437") ? true : (stryCov_9fa48("7437", "7438", "7439"), (stryMutAct_9fa48("7441") ? (!value || typeof value !== 'object' || !('schemaVersion' in value) || value.schemaVersion !== 1 || !('source' in value) || typeof value.source !== 'string' || publicUrl(value.source).href !== value.source || !('evidence' in value) || !Array.isArray(value.evidence) || value.evidence.length < 1 || value.evidence.length > 100 || !('pages' in value)) && value.pages !== value.evidence.length : stryMutAct_9fa48("7440") ? false : (stryCov_9fa48("7440", "7441"), (stryMutAct_9fa48("7443") ? (!value || typeof value !== 'object' || !('schemaVersion' in value) || value.schemaVersion !== 1 || !('source' in value) || typeof value.source !== 'string' || publicUrl(value.source).href !== value.source || !('evidence' in value) || !Array.isArray(value.evidence) || value.evidence.length < 1 || value.evidence.length > 100) && !('pages' in value) : stryMutAct_9fa48("7442") ? false : (stryCov_9fa48("7442", "7443"), (stryMutAct_9fa48("7445") ? (!value || typeof value !== 'object' || !('schemaVersion' in value) || value.schemaVersion !== 1 || !('source' in value) || typeof value.source !== 'string' || publicUrl(value.source).href !== value.source || !('evidence' in value) || !Array.isArray(value.evidence) || value.evidence.length < 1) && value.evidence.length > 100 : stryMutAct_9fa48("7444") ? false : (stryCov_9fa48("7444", "7445"), (stryMutAct_9fa48("7447") ? (!value || typeof value !== 'object' || !('schemaVersion' in value) || value.schemaVersion !== 1 || !('source' in value) || typeof value.source !== 'string' || publicUrl(value.source).href !== value.source || !('evidence' in value) || !Array.isArray(value.evidence)) && value.evidence.length < 1 : stryMutAct_9fa48("7446") ? false : (stryCov_9fa48("7446", "7447"), (stryMutAct_9fa48("7449") ? (!value || typeof value !== 'object' || !('schemaVersion' in value) || value.schemaVersion !== 1 || !('source' in value) || typeof value.source !== 'string' || publicUrl(value.source).href !== value.source || !('evidence' in value)) && !Array.isArray(value.evidence) : stryMutAct_9fa48("7448") ? false : (stryCov_9fa48("7448", "7449"), (stryMutAct_9fa48("7451") ? (!value || typeof value !== 'object' || !('schemaVersion' in value) || value.schemaVersion !== 1 || !('source' in value) || typeof value.source !== 'string' || publicUrl(value.source).href !== value.source) && !('evidence' in value) : stryMutAct_9fa48("7450") ? false : (stryCov_9fa48("7450", "7451"), (stryMutAct_9fa48("7453") ? (!value || typeof value !== 'object' || !('schemaVersion' in value) || value.schemaVersion !== 1 || !('source' in value) || typeof value.source !== 'string') && publicUrl(value.source).href !== value.source : stryMutAct_9fa48("7452") ? false : (stryCov_9fa48("7452", "7453"), (stryMutAct_9fa48("7455") ? (!value || typeof value !== 'object' || !('schemaVersion' in value) || value.schemaVersion !== 1 || !('source' in value)) && typeof value.source !== 'string' : stryMutAct_9fa48("7454") ? false : (stryCov_9fa48("7454", "7455"), (stryMutAct_9fa48("7457") ? (!value || typeof value !== 'object' || !('schemaVersion' in value) || value.schemaVersion !== 1) && !('source' in value) : stryMutAct_9fa48("7456") ? false : (stryCov_9fa48("7456", "7457"), (stryMutAct_9fa48("7459") ? (!value || typeof value !== 'object' || !('schemaVersion' in value)) && value.schemaVersion !== 1 : stryMutAct_9fa48("7458") ? false : (stryCov_9fa48("7458", "7459"), (stryMutAct_9fa48("7461") ? (!value || typeof value !== 'object') && !('schemaVersion' in value) : stryMutAct_9fa48("7460") ? false : (stryCov_9fa48("7460", "7461"), (stryMutAct_9fa48("7463") ? !value && typeof value !== 'object' : stryMutAct_9fa48("7462") ? false : (stryCov_9fa48("7462", "7463"), (stryMutAct_9fa48("7464") ? value : (stryCov_9fa48("7464"), !value)) || (stryMutAct_9fa48("7466") ? typeof value === 'object' : stryMutAct_9fa48("7465") ? false : (stryCov_9fa48("7465", "7466"), typeof value !== (stryMutAct_9fa48("7467") ? "" : (stryCov_9fa48("7467"), 'object')))))) || (stryMutAct_9fa48("7468") ? 'schemaVersion' in value : (stryCov_9fa48("7468"), !((stryMutAct_9fa48("7469") ? "" : (stryCov_9fa48("7469"), 'schemaVersion')) in value))))) || (stryMutAct_9fa48("7471") ? value.schemaVersion === 1 : stryMutAct_9fa48("7470") ? false : (stryCov_9fa48("7470", "7471"), value.schemaVersion !== 1)))) || (stryMutAct_9fa48("7472") ? 'source' in value : (stryCov_9fa48("7472"), !((stryMutAct_9fa48("7473") ? "" : (stryCov_9fa48("7473"), 'source')) in value))))) || (stryMutAct_9fa48("7475") ? typeof value.source === 'string' : stryMutAct_9fa48("7474") ? false : (stryCov_9fa48("7474", "7475"), typeof value.source !== (stryMutAct_9fa48("7476") ? "" : (stryCov_9fa48("7476"), 'string')))))) || (stryMutAct_9fa48("7478") ? publicUrl(value.source).href === value.source : stryMutAct_9fa48("7477") ? false : (stryCov_9fa48("7477", "7478"), publicUrl(value.source).href !== value.source)))) || (stryMutAct_9fa48("7479") ? 'evidence' in value : (stryCov_9fa48("7479"), !((stryMutAct_9fa48("7480") ? "" : (stryCov_9fa48("7480"), 'evidence')) in value))))) || (stryMutAct_9fa48("7481") ? Array.isArray(value.evidence) : (stryCov_9fa48("7481"), !Array.isArray(value.evidence))))) || (stryMutAct_9fa48("7484") ? value.evidence.length >= 1 : stryMutAct_9fa48("7483") ? value.evidence.length <= 1 : stryMutAct_9fa48("7482") ? false : (stryCov_9fa48("7482", "7483", "7484"), value.evidence.length < 1)))) || (stryMutAct_9fa48("7487") ? value.evidence.length <= 100 : stryMutAct_9fa48("7486") ? value.evidence.length >= 100 : stryMutAct_9fa48("7485") ? false : (stryCov_9fa48("7485", "7486", "7487"), value.evidence.length > 100)))) || (stryMutAct_9fa48("7488") ? 'pages' in value : (stryCov_9fa48("7488"), !((stryMutAct_9fa48("7489") ? "" : (stryCov_9fa48("7489"), 'pages')) in value))))) || (stryMutAct_9fa48("7491") ? value.pages === value.evidence.length : stryMutAct_9fa48("7490") ? false : (stryCov_9fa48("7490", "7491"), value.pages !== value.evidence.length)))) || (stryMutAct_9fa48("7492") ? 'observations' in value : (stryCov_9fa48("7492"), !((stryMutAct_9fa48("7493") ? "" : (stryCov_9fa48("7493"), 'observations')) in value))))) throw new Error(stryMutAct_9fa48("7495") ? "" : (stryCov_9fa48("7495"), 'Invalid catalog snapshot.'));
    const listings: (ImportedProduct & {
      observedAt: string;
    })[] = stryMutAct_9fa48("7496") ? ["Stryker was here"] : (stryCov_9fa48("7496"), []);
    let observations = 0;
    const evidence: unknown[] = value.evidence;
    for (const [index, page] of evidence.entries()) {
      if (stryMutAct_9fa48("7497")) {
        {}
      } else {
        stryCov_9fa48("7497");
        if (stryMutAct_9fa48("7500") ? (!page || typeof page !== 'object' || !('page' in page) || !('result' in page) || !('sha256' in page) || page.page !== index + 1 || !isImportResult(page.result) || page.result.source !== value.source || !Number.isFinite(Date.parse(page.result.observedAt))) && page.sha256 !== (await snapshotDigest(JSON.stringify(page.result))) : stryMutAct_9fa48("7499") ? false : stryMutAct_9fa48("7498") ? true : (stryCov_9fa48("7498", "7499", "7500"), (stryMutAct_9fa48("7502") ? (!page || typeof page !== 'object' || !('page' in page) || !('result' in page) || !('sha256' in page) || page.page !== index + 1 || !isImportResult(page.result) || page.result.source !== value.source) && !Number.isFinite(Date.parse(page.result.observedAt)) : stryMutAct_9fa48("7501") ? false : (stryCov_9fa48("7501", "7502"), (stryMutAct_9fa48("7504") ? (!page || typeof page !== 'object' || !('page' in page) || !('result' in page) || !('sha256' in page) || page.page !== index + 1 || !isImportResult(page.result)) && page.result.source !== value.source : stryMutAct_9fa48("7503") ? false : (stryCov_9fa48("7503", "7504"), (stryMutAct_9fa48("7506") ? (!page || typeof page !== 'object' || !('page' in page) || !('result' in page) || !('sha256' in page) || page.page !== index + 1) && !isImportResult(page.result) : stryMutAct_9fa48("7505") ? false : (stryCov_9fa48("7505", "7506"), (stryMutAct_9fa48("7508") ? (!page || typeof page !== 'object' || !('page' in page) || !('result' in page) || !('sha256' in page)) && page.page !== index + 1 : stryMutAct_9fa48("7507") ? false : (stryCov_9fa48("7507", "7508"), (stryMutAct_9fa48("7510") ? (!page || typeof page !== 'object' || !('page' in page) || !('result' in page)) && !('sha256' in page) : stryMutAct_9fa48("7509") ? false : (stryCov_9fa48("7509", "7510"), (stryMutAct_9fa48("7512") ? (!page || typeof page !== 'object' || !('page' in page)) && !('result' in page) : stryMutAct_9fa48("7511") ? false : (stryCov_9fa48("7511", "7512"), (stryMutAct_9fa48("7514") ? (!page || typeof page !== 'object') && !('page' in page) : stryMutAct_9fa48("7513") ? false : (stryCov_9fa48("7513", "7514"), (stryMutAct_9fa48("7516") ? !page && typeof page !== 'object' : stryMutAct_9fa48("7515") ? false : (stryCov_9fa48("7515", "7516"), (stryMutAct_9fa48("7517") ? page : (stryCov_9fa48("7517"), !page)) || (stryMutAct_9fa48("7519") ? typeof page === 'object' : stryMutAct_9fa48("7518") ? false : (stryCov_9fa48("7518", "7519"), typeof page !== (stryMutAct_9fa48("7520") ? "" : (stryCov_9fa48("7520"), 'object')))))) || (stryMutAct_9fa48("7521") ? 'page' in page : (stryCov_9fa48("7521"), !((stryMutAct_9fa48("7522") ? "" : (stryCov_9fa48("7522"), 'page')) in page))))) || (stryMutAct_9fa48("7523") ? 'result' in page : (stryCov_9fa48("7523"), !((stryMutAct_9fa48("7524") ? "" : (stryCov_9fa48("7524"), 'result')) in page))))) || (stryMutAct_9fa48("7525") ? 'sha256' in page : (stryCov_9fa48("7525"), !((stryMutAct_9fa48("7526") ? "" : (stryCov_9fa48("7526"), 'sha256')) in page))))) || (stryMutAct_9fa48("7528") ? page.page === index + 1 : stryMutAct_9fa48("7527") ? false : (stryCov_9fa48("7527", "7528"), page.page !== (stryMutAct_9fa48("7529") ? index - 1 : (stryCov_9fa48("7529"), index + 1)))))) || (stryMutAct_9fa48("7530") ? isImportResult(page.result) : (stryCov_9fa48("7530"), !isImportResult(page.result))))) || (stryMutAct_9fa48("7532") ? page.result.source === value.source : stryMutAct_9fa48("7531") ? false : (stryCov_9fa48("7531", "7532"), page.result.source !== value.source)))) || (stryMutAct_9fa48("7533") ? Number.isFinite(Date.parse(page.result.observedAt)) : (stryCov_9fa48("7533"), !Number.isFinite(Date.parse(page.result.observedAt)))))) || (stryMutAct_9fa48("7535") ? page.sha256 === (await snapshotDigest(JSON.stringify(page.result))) : stryMutAct_9fa48("7534") ? false : (stryCov_9fa48("7534", "7535"), page.sha256 !== (await snapshotDigest(JSON.stringify(page.result))))))) throw new Error(stryMutAct_9fa48("7537") ? "" : (stryCov_9fa48("7537"), 'Catalog page evidence failed verification.'));
        for (const product of page.result.products) {
          if (stryMutAct_9fa48("7538")) {
            {}
          } else {
            stryCov_9fa48("7538");
            if (stryMutAct_9fa48("7539")) {
              ;
            } else {
              stryCov_9fa48("7539");
              publicUrl(product.url);
            }
            listings.push(stryMutAct_9fa48("7541") ? {} : (stryCov_9fa48("7541"), {
              ...product,
              observedAt: page.result.observedAt
            }));
          }
        }
        stryMutAct_9fa48("7542") ? observations -= page.result.products.length : (stryCov_9fa48("7542"), observations += page.result.products.length);
      }
    }
    if (stryMutAct_9fa48("7545") ? observations === value.observations : stryMutAct_9fa48("7544") ? false : stryMutAct_9fa48("7543") ? true : (stryCov_9fa48("7543", "7544", "7545"), observations !== value.observations)) throw new Error(stryMutAct_9fa48("7547") ? "" : (stryCov_9fa48("7547"), 'Catalog observation count does not match its evidence.'));
    return stryMutAct_9fa48("7548") ? {} : (stryCov_9fa48("7548"), {
      id: await snapshotDigest(payload),
      source: value.source,
      payload,
      observations,
      pages: value.pages,
      listings
    });
  }
}
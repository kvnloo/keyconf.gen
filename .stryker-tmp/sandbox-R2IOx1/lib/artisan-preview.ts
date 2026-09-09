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
import type { Build } from './build.ts';
import { resolveAccessoryProducts } from './imported-accessories.ts';
import { documentedKeys } from './accessory-hosts.ts';
import layouts from '../public/models/layouts.json' with { type: 'json' };
export function artisanPreviewNote(build: Pick<Build, 'layout' | 'selection' | 'accessories' | 'customAccessories'>, id: string): string | null {
  if (stryMutAct_9fa48("5552")) {
    {}
  } else {
    stryCov_9fa48("5552");
    const item = build.accessories.find(stryMutAct_9fa48("5553") ? () => undefined : (stryCov_9fa48("5553"), entry => stryMutAct_9fa48("5556") ? entry.id !== id : stryMutAct_9fa48("5555") ? false : stryMutAct_9fa48("5554") ? true : (stryCov_9fa48("5554", "5555", "5556"), entry.id === id)));
    const product = resolveAccessoryProducts(build.customAccessories).find(stryMutAct_9fa48("5557") ? () => undefined : (stryCov_9fa48("5557"), entry => stryMutAct_9fa48("5560") ? entry.id !== item?.productId : stryMutAct_9fa48("5559") ? false : stryMutAct_9fa48("5558") ? true : (stryCov_9fa48("5558", "5559", "5560"), entry.id === (stryMutAct_9fa48("5561") ? item.productId : (stryCov_9fa48("5561"), item?.productId)))));
    if (stryMutAct_9fa48("5564") ? (!item || item.location.kind !== 'key') && product?.kind !== 'artisan' : stryMutAct_9fa48("5563") ? false : stryMutAct_9fa48("5562") ? true : (stryCov_9fa48("5562", "5563", "5564"), (stryMutAct_9fa48("5566") ? !item && item.location.kind !== 'key' : stryMutAct_9fa48("5565") ? false : (stryCov_9fa48("5565", "5566"), (stryMutAct_9fa48("5567") ? item : (stryCov_9fa48("5567"), !item)) || (stryMutAct_9fa48("5569") ? item.location.kind === 'key' : stryMutAct_9fa48("5568") ? false : (stryCov_9fa48("5568", "5569"), item.location.kind !== (stryMutAct_9fa48("5570") ? "" : (stryCov_9fa48("5570"), 'key')))))) || (stryMutAct_9fa48("5572") ? product?.kind === 'artisan' : stryMutAct_9fa48("5571") ? false : (stryCov_9fa48("5571", "5572"), (stryMutAct_9fa48("5573") ? product.kind : (stryCov_9fa48("5573"), product?.kind)) !== (stryMutAct_9fa48("5574") ? "" : (stryCov_9fa48("5574"), 'artisan')))))) return null;
    if (stryMutAct_9fa48("5577") ? product.sizeU !== null : stryMutAct_9fa48("5576") ? false : stryMutAct_9fa48("5575") ? true : (stryCov_9fa48("5575", "5576", "5577"), product.sizeU === null)) return stryMutAct_9fa48("5578") ? "" : (stryCov_9fa48("5578"), 'Not shown: the artisan width is unknown. Confirm its size with the maker before choosing a target key.');
    const keyId = item.location.keyId;
    if (stryMutAct_9fa48("5581") ? keyId !== 'unassigned' : stryMutAct_9fa48("5580") ? false : stryMutAct_9fa48("5579") ? true : (stryCov_9fa48("5579", "5580", "5581"), keyId === (stryMutAct_9fa48("5582") ? "" : (stryCov_9fa48("5582"), 'unassigned')))) return stryMutAct_9fa48("5583") ? "" : (stryCov_9fa48("5583"), 'Not shown yet: choose a target key for this artisan.');
    const key = (stryMutAct_9fa48("5584") ? documentedKeys(build) && layouts[build.layout] : (stryCov_9fa48("5584"), documentedKeys(build) ?? layouts[build.layout])).find(stryMutAct_9fa48("5585") ? () => undefined : (stryCov_9fa48("5585"), entry => stryMutAct_9fa48("5588") ? entry.code !== keyId : stryMutAct_9fa48("5587") ? false : stryMutAct_9fa48("5586") ? true : (stryCov_9fa48("5586", "5587", "5588"), entry.code === keyId)));
    if (stryMutAct_9fa48("5591") ? false : stryMutAct_9fa48("5590") ? true : stryMutAct_9fa48("5589") ? key : (stryCov_9fa48("5589", "5590", "5591"), !key)) return stryMutAct_9fa48("5592") ? "" : (stryCov_9fa48("5592"), 'Not shown: the target key is absent from this layout. Choose another key.');
    if (stryMutAct_9fa48("5595") ? key.width === product.sizeU : stryMutAct_9fa48("5594") ? false : stryMutAct_9fa48("5593") ? true : (stryCov_9fa48("5593", "5594", "5595"), key.width !== product.sizeU)) return stryMutAct_9fa48("5596") ? `` : (stryCov_9fa48("5596"), `Not shown: this ${product.sizeU}u cap is assigned to a ${key.width}u key. Choose a matching-width key.`);
    if (stryMutAct_9fa48("5599") ? build.accessories.every(other => other.id !== id && other.location.kind === 'key' && other.location.keyId === keyId) : stryMutAct_9fa48("5598") ? false : stryMutAct_9fa48("5597") ? true : (stryCov_9fa48("5597", "5598", "5599"), build.accessories.some(stryMutAct_9fa48("5600") ? () => undefined : (stryCov_9fa48("5600"), other => stryMutAct_9fa48("5603") ? other.id !== id && other.location.kind === 'key' || other.location.keyId === keyId : stryMutAct_9fa48("5602") ? false : stryMutAct_9fa48("5601") ? true : (stryCov_9fa48("5601", "5602", "5603"), (stryMutAct_9fa48("5605") ? other.id !== id || other.location.kind === 'key' : stryMutAct_9fa48("5604") ? true : (stryCov_9fa48("5604", "5605"), (stryMutAct_9fa48("5607") ? other.id === id : stryMutAct_9fa48("5606") ? true : (stryCov_9fa48("5606", "5607"), other.id !== id)) && (stryMutAct_9fa48("5609") ? other.location.kind !== 'key' : stryMutAct_9fa48("5608") ? true : (stryCov_9fa48("5608", "5609"), other.location.kind === (stryMutAct_9fa48("5610") ? "" : (stryCov_9fa48("5610"), 'key')))))) && (stryMutAct_9fa48("5612") ? other.location.keyId !== keyId : stryMutAct_9fa48("5611") ? true : (stryCov_9fa48("5611", "5612"), other.location.keyId === keyId))))))) return stryMutAct_9fa48("5613") ? "" : (stryCov_9fa48("5613"), 'Not shown: multiple artisan selections target this key. Move or remove one selection.');
    if (stryMutAct_9fa48("5616") ? product.id.endsWith('import-accessory:') : stryMutAct_9fa48("5615") ? false : stryMutAct_9fa48("5614") ? true : (stryCov_9fa48("5614", "5615", "5616"), product.id.startsWith(stryMutAct_9fa48("5617") ? "" : (stryCov_9fa48("5617"), 'import-accessory:')))) return stryMutAct_9fa48("5618") ? "" : (stryCov_9fa48("5618"), 'Assigned to the visual key. Product geometry is unavailable; the flat marker only indicates placement. Physical fit still needs verification.');
    return stryMutAct_9fa48("5619") ? "" : (stryCov_9fa48("5619"), 'Assigned to the visual key. The preview is an illustrative sculpt; stem, profile and physical clearance still need verification.');
  }
}
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
import { pruneBuildImports, parseBuild, type Build } from './build.ts';
import { parsePublicBuildEvidence, type PublicBuildEvidence } from './build-evidence.ts';
import { requestText } from './request-text.ts';
export type CommunityProfile = {
  handle: string;
  displayName: string;
  bio: string;
  links: {
    label: string;
    url: string;
  }[];
};
export type SavedBuildSummary = {
  id: string;
  name: string;
  createdAt: string;
};
export type SavedBuild = SavedBuildSummary & {
  build: Build;
  evidence?: PublicBuildEvidence;
};
export type SaveBuildRequest = {
  operationId: string;
  build: Build;
};
export type CommunityErrorCode = 'authentication_required' | 'invalid_origin' | 'invalid_request' | 'request_too_large' | 'handle_taken' | 'operation_conflict' | 'build_not_found' | 'publication_not_found' | 'proposal_not_found' | 'response_not_found' | 'profile_required' | 'profile_changed' | 'saved_build_unavailable' | 'storage_unavailable';
export class CommunityError extends Error {
  readonly code: CommunityErrorCode;
  readonly status: number;
  constructor(code: CommunityErrorCode, message: string, status: number) {
    if (stryMutAct_9fa48("8815")) {
      {}
    } else {
      stryCov_9fa48("8815");
      super(message);
      this.name = stryMutAct_9fa48("8816") ? "" : (stryCov_9fa48("8816"), 'CommunityError');
      this.code = code;
      this.status = status;
    }
  }
}
function object(value: unknown): value is Record<string, unknown> {
  if (stryMutAct_9fa48("8817")) {
    {}
  } else {
    stryCov_9fa48("8817");
    return stryMutAct_9fa48("8820") ? typeof value === 'object' && value !== null || !Array.isArray(value) : stryMutAct_9fa48("8819") ? false : stryMutAct_9fa48("8818") ? true : (stryCov_9fa48("8818", "8819", "8820"), (stryMutAct_9fa48("8822") ? typeof value === 'object' || value !== null : stryMutAct_9fa48("8821") ? true : (stryCov_9fa48("8821", "8822"), (stryMutAct_9fa48("8824") ? typeof value !== 'object' : stryMutAct_9fa48("8823") ? true : (stryCov_9fa48("8823", "8824"), typeof value === (stryMutAct_9fa48("8825") ? "" : (stryCov_9fa48("8825"), 'object')))) && (stryMutAct_9fa48("8827") ? value === null : stryMutAct_9fa48("8826") ? true : (stryCov_9fa48("8826", "8827"), value !== null)))) && (stryMutAct_9fa48("8828") ? Array.isArray(value) : (stryCov_9fa48("8828"), !Array.isArray(value))));
  }
}
const reservedHandles = new Set(stryMutAct_9fa48("8829") ? [] : (stryCov_9fa48("8829"), [stryMutAct_9fa48("8830") ? "" : (stryCov_9fa48("8830"), 'account'), stryMutAct_9fa48("8831") ? "" : (stryCov_9fa48("8831"), 'admin'), stryMutAct_9fa48("8832") ? "" : (stryCov_9fa48("8832"), 'administrator'), stryMutAct_9fa48("8833") ? "" : (stryCov_9fa48("8833"), 'api'), stryMutAct_9fa48("8834") ? "" : (stryCov_9fa48("8834"), 'auth'), stryMutAct_9fa48("8835") ? "" : (stryCov_9fa48("8835"), 'build'), stryMutAct_9fa48("8836") ? "" : (stryCov_9fa48("8836"), 'builds'), stryMutAct_9fa48("8837") ? "" : (stryCov_9fa48("8837"), 'callback'), stryMutAct_9fa48("8838") ? "" : (stryCov_9fa48("8838"), 'community'), stryMutAct_9fa48("8839") ? "" : (stryCov_9fa48("8839"), 'discover'), stryMutAct_9fa48("8840") ? "" : (stryCov_9fa48("8840"), 'help'), stryMutAct_9fa48("8841") ? "" : (stryCov_9fa48("8841"), 'keyconf'), stryMutAct_9fa48("8842") ? "" : (stryCov_9fa48("8842"), 'login'), stryMutAct_9fa48("8843") ? "" : (stryCov_9fa48("8843"), 'logout'), stryMutAct_9fa48("8844") ? "" : (stryCov_9fa48("8844"), 'moderator'), stryMutAct_9fa48("8845") ? "" : (stryCov_9fa48("8845"), 'official'), stryMutAct_9fa48("8846") ? "" : (stryCov_9fa48("8846"), 'openai'), stryMutAct_9fa48("8847") ? "" : (stryCov_9fa48("8847"), 'profile'), stryMutAct_9fa48("8848") ? "" : (stryCov_9fa48("8848"), 'settings'), stryMutAct_9fa48("8849") ? "" : (stryCov_9fa48("8849"), 'signin'), stryMutAct_9fa48("8850") ? "" : (stryCov_9fa48("8850"), 'signout'), stryMutAct_9fa48("8851") ? "" : (stryCov_9fa48("8851"), 'staff'), stryMutAct_9fa48("8852") ? "" : (stryCov_9fa48("8852"), 'support'), stryMutAct_9fa48("8853") ? "" : (stryCov_9fa48("8853"), 'system'), stryMutAct_9fa48("8854") ? "" : (stryCov_9fa48("8854"), 'www')]));
export function parseCommunityProfile(value: unknown): CommunityProfile {
  if (stryMutAct_9fa48("8855")) {
    {}
  } else {
    stryCov_9fa48("8855");
    if (stryMutAct_9fa48("8858") ? (!object(value) || typeof value.handle !== 'string' || typeof value.displayName !== 'string') && typeof value.bio !== 'string' : stryMutAct_9fa48("8857") ? false : stryMutAct_9fa48("8856") ? true : (stryCov_9fa48("8856", "8857", "8858"), (stryMutAct_9fa48("8860") ? (!object(value) || typeof value.handle !== 'string') && typeof value.displayName !== 'string' : stryMutAct_9fa48("8859") ? false : (stryCov_9fa48("8859", "8860"), (stryMutAct_9fa48("8862") ? !object(value) && typeof value.handle !== 'string' : stryMutAct_9fa48("8861") ? false : (stryCov_9fa48("8861", "8862"), (stryMutAct_9fa48("8863") ? object(value) : (stryCov_9fa48("8863"), !object(value))) || (stryMutAct_9fa48("8865") ? typeof value.handle === 'string' : stryMutAct_9fa48("8864") ? false : (stryCov_9fa48("8864", "8865"), typeof value.handle !== (stryMutAct_9fa48("8866") ? "" : (stryCov_9fa48("8866"), 'string')))))) || (stryMutAct_9fa48("8868") ? typeof value.displayName === 'string' : stryMutAct_9fa48("8867") ? false : (stryCov_9fa48("8867", "8868"), typeof value.displayName !== (stryMutAct_9fa48("8869") ? "" : (stryCov_9fa48("8869"), 'string')))))) || (stryMutAct_9fa48("8871") ? typeof value.bio === 'string' : stryMutAct_9fa48("8870") ? false : (stryCov_9fa48("8870", "8871"), typeof value.bio !== (stryMutAct_9fa48("8872") ? "" : (stryCov_9fa48("8872"), 'string')))))) {
      if (stryMutAct_9fa48("8873")) {
        {}
      } else {
        stryCov_9fa48("8873");
        throw new CommunityError(stryMutAct_9fa48("8875") ? "" : (stryCov_9fa48("8875"), 'invalid_request'), stryMutAct_9fa48("8876") ? "" : (stryCov_9fa48("8876"), 'Choose a handle, display name and bio.'), 400);
      }
    }
    const handle = stryMutAct_9fa48("8878") ? value.handle.toLowerCase() : stryMutAct_9fa48("8877") ? value.handle.trim().toUpperCase() : (stryCov_9fa48("8877", "8878"), value.handle.trim().toLowerCase());
    const displayName = stryMutAct_9fa48("8879") ? value.displayName : (stryCov_9fa48("8879"), value.displayName.trim());
    const bio = stryMutAct_9fa48("8880") ? value.bio : (stryCov_9fa48("8880"), value.bio.trim());
    if (stryMutAct_9fa48("8883") ? !/^[a-z0-9][a-z0-9_]{2,23}$/.test(handle) && reservedHandles.has(handle) : stryMutAct_9fa48("8882") ? false : stryMutAct_9fa48("8881") ? true : (stryCov_9fa48("8881", "8882", "8883"), (stryMutAct_9fa48("8884") ? /^[a-z0-9][a-z0-9_]{2,23}$/.test(handle) : (stryCov_9fa48("8884"), !(stryMutAct_9fa48("8889") ? /^[a-z0-9][^a-z0-9_]{2,23}$/ : stryMutAct_9fa48("8888") ? /^[a-z0-9][a-z0-9_]$/ : stryMutAct_9fa48("8887") ? /^[^a-z0-9][a-z0-9_]{2,23}$/ : stryMutAct_9fa48("8886") ? /^[a-z0-9][a-z0-9_]{2,23}/ : stryMutAct_9fa48("8885") ? /[a-z0-9][a-z0-9_]{2,23}$/ : (stryCov_9fa48("8885", "8886", "8887", "8888", "8889"), /^[a-z0-9][a-z0-9_]{2,23}$/)).test(handle))) || reservedHandles.has(handle))) {
      if (stryMutAct_9fa48("8890")) {
        {}
      } else {
        stryCov_9fa48("8890");
        throw new CommunityError(stryMutAct_9fa48("8892") ? "" : (stryCov_9fa48("8892"), 'invalid_request'), stryMutAct_9fa48("8893") ? "" : (stryCov_9fa48("8893"), 'Choose an available handle of 3–24 letters, numbers or underscores, starting with a letter or number. Staff and service names are reserved.'), 400);
      }
    }
    if (stryMutAct_9fa48("8896") ? (!displayName || displayName.length > 60 || bio.length > 160) && hasControlCharacters(displayName + bio) : stryMutAct_9fa48("8895") ? false : stryMutAct_9fa48("8894") ? true : (stryCov_9fa48("8894", "8895", "8896"), (stryMutAct_9fa48("8898") ? (!displayName || displayName.length > 60) && bio.length > 160 : stryMutAct_9fa48("8897") ? false : (stryCov_9fa48("8897", "8898"), (stryMutAct_9fa48("8900") ? !displayName && displayName.length > 60 : stryMutAct_9fa48("8899") ? false : (stryCov_9fa48("8899", "8900"), (stryMutAct_9fa48("8901") ? displayName : (stryCov_9fa48("8901"), !displayName)) || (stryMutAct_9fa48("8904") ? displayName.length <= 60 : stryMutAct_9fa48("8903") ? displayName.length >= 60 : stryMutAct_9fa48("8902") ? false : (stryCov_9fa48("8902", "8903", "8904"), displayName.length > 60)))) || (stryMutAct_9fa48("8907") ? bio.length <= 160 : stryMutAct_9fa48("8906") ? bio.length >= 160 : stryMutAct_9fa48("8905") ? false : (stryCov_9fa48("8905", "8906", "8907"), bio.length > 160)))) || hasControlCharacters(stryMutAct_9fa48("8908") ? displayName - bio : (stryCov_9fa48("8908"), displayName + bio)))) {
      if (stryMutAct_9fa48("8909")) {
        {}
      } else {
        stryCov_9fa48("8909");
        throw new CommunityError(stryMutAct_9fa48("8911") ? "" : (stryCov_9fa48("8911"), 'invalid_request'), stryMutAct_9fa48("8912") ? "" : (stryCov_9fa48("8912"), 'Use a display name of 1–60 characters and a bio of at most 160 characters, without line breaks or control characters.'), 400);
      }
    }
    const links = parseProfileLinks(value.links);
    return stryMutAct_9fa48("8913") ? {} : (stryCov_9fa48("8913"), {
      handle,
      displayName,
      bio,
      links
    });
  }
}
function hasControlCharacters(value: string): boolean {
  if (stryMutAct_9fa48("8914")) {
    {}
  } else {
    stryCov_9fa48("8914");
    return stryMutAct_9fa48("8915") ? value.split('').every(character => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127) : (stryCov_9fa48("8915"), value.split(stryMutAct_9fa48("8916") ? "Stryker was here!" : (stryCov_9fa48("8916"), '')).some(stryMutAct_9fa48("8917") ? () => undefined : (stryCov_9fa48("8917"), character => stryMutAct_9fa48("8920") ? character.charCodeAt(0) < 32 && character.charCodeAt(0) === 127 : stryMutAct_9fa48("8919") ? false : stryMutAct_9fa48("8918") ? true : (stryCov_9fa48("8918", "8919", "8920"), (stryMutAct_9fa48("8923") ? character.charCodeAt(0) >= 32 : stryMutAct_9fa48("8922") ? character.charCodeAt(0) <= 32 : stryMutAct_9fa48("8921") ? false : (stryCov_9fa48("8921", "8922", "8923"), character.charCodeAt(0) < 32)) || (stryMutAct_9fa48("8925") ? character.charCodeAt(0) !== 127 : stryMutAct_9fa48("8924") ? false : (stryCov_9fa48("8924", "8925"), character.charCodeAt(0) === 127))))));
  }
}
function parseProfileLinks(value: unknown): CommunityProfile['links'] {
  if (stryMutAct_9fa48("8926")) {
    {}
  } else {
    stryCov_9fa48("8926");
    if (stryMutAct_9fa48("8929") ? value !== undefined : stryMutAct_9fa48("8928") ? false : stryMutAct_9fa48("8927") ? true : (stryCov_9fa48("8927", "8928", "8929"), value === undefined)) return stryMutAct_9fa48("8930") ? ["Stryker was here"] : (stryCov_9fa48("8930"), []);
    if (stryMutAct_9fa48("8933") ? !Array.isArray(value) && value.length > 5 : stryMutAct_9fa48("8932") ? false : stryMutAct_9fa48("8931") ? true : (stryCov_9fa48("8931", "8932", "8933"), (stryMutAct_9fa48("8934") ? Array.isArray(value) : (stryCov_9fa48("8934"), !Array.isArray(value))) || (stryMutAct_9fa48("8937") ? value.length <= 5 : stryMutAct_9fa48("8936") ? value.length >= 5 : stryMutAct_9fa48("8935") ? false : (stryCov_9fa48("8935", "8936", "8937"), value.length > 5)))) throw new CommunityError(stryMutAct_9fa48("8939") ? "" : (stryCov_9fa48("8939"), 'invalid_request'), stryMutAct_9fa48("8940") ? "" : (stryCov_9fa48("8940"), 'Add at most five creator links.'), 400);
    const urls = new Set<string>();
    return value.map((entry: unknown) => {
      if (stryMutAct_9fa48("8941")) {
        {}
      } else {
        stryCov_9fa48("8941");
        if (stryMutAct_9fa48("8944") ? (!object(entry) || typeof entry.label !== 'string') && typeof entry.url !== 'string' : stryMutAct_9fa48("8943") ? false : stryMutAct_9fa48("8942") ? true : (stryCov_9fa48("8942", "8943", "8944"), (stryMutAct_9fa48("8946") ? !object(entry) && typeof entry.label !== 'string' : stryMutAct_9fa48("8945") ? false : (stryCov_9fa48("8945", "8946"), (stryMutAct_9fa48("8947") ? object(entry) : (stryCov_9fa48("8947"), !object(entry))) || (stryMutAct_9fa48("8949") ? typeof entry.label === 'string' : stryMutAct_9fa48("8948") ? false : (stryCov_9fa48("8948", "8949"), typeof entry.label !== (stryMutAct_9fa48("8950") ? "" : (stryCov_9fa48("8950"), 'string')))))) || (stryMutAct_9fa48("8952") ? typeof entry.url === 'string' : stryMutAct_9fa48("8951") ? false : (stryCov_9fa48("8951", "8952"), typeof entry.url !== (stryMutAct_9fa48("8953") ? "" : (stryCov_9fa48("8953"), 'string')))))) throw new CommunityError(stryMutAct_9fa48("8955") ? "" : (stryCov_9fa48("8955"), 'invalid_request'), stryMutAct_9fa48("8956") ? "" : (stryCov_9fa48("8956"), 'Each creator link needs a label and an HTTPS URL.'), 400);
        const label = stryMutAct_9fa48("8957") ? entry.label : (stryCov_9fa48("8957"), entry.label.trim());
        if (stryMutAct_9fa48("8960") ? (!label || label.length > 40 || hasControlCharacters(label)) && entry.url.length > 2048 : stryMutAct_9fa48("8959") ? false : stryMutAct_9fa48("8958") ? true : (stryCov_9fa48("8958", "8959", "8960"), (stryMutAct_9fa48("8962") ? (!label || label.length > 40) && hasControlCharacters(label) : stryMutAct_9fa48("8961") ? false : (stryCov_9fa48("8961", "8962"), (stryMutAct_9fa48("8964") ? !label && label.length > 40 : stryMutAct_9fa48("8963") ? false : (stryCov_9fa48("8963", "8964"), (stryMutAct_9fa48("8965") ? label : (stryCov_9fa48("8965"), !label)) || (stryMutAct_9fa48("8968") ? label.length <= 40 : stryMutAct_9fa48("8967") ? label.length >= 40 : stryMutAct_9fa48("8966") ? false : (stryCov_9fa48("8966", "8967", "8968"), label.length > 40)))) || hasControlCharacters(label))) || (stryMutAct_9fa48("8971") ? entry.url.length <= 2048 : stryMutAct_9fa48("8970") ? entry.url.length >= 2048 : stryMutAct_9fa48("8969") ? false : (stryCov_9fa48("8969", "8970", "8971"), entry.url.length > 2048)))) throw new CommunityError(stryMutAct_9fa48("8973") ? "" : (stryCov_9fa48("8973"), 'invalid_request'), stryMutAct_9fa48("8974") ? "" : (stryCov_9fa48("8974"), 'Use a short, single-line label and a URL of at most 2048 characters.'), 400);
        let url: URL;
        try {
          if (stryMutAct_9fa48("8975")) {
            {}
          } else {
            stryCov_9fa48("8975");
            url = new URL(entry.url);
          }
        } catch {
          if (stryMutAct_9fa48("8976")) {
            {}
          } else {
            stryCov_9fa48("8976");
            throw new CommunityError(stryMutAct_9fa48("8978") ? "" : (stryCov_9fa48("8978"), 'invalid_request'), stryMutAct_9fa48("8979") ? "" : (stryCov_9fa48("8979"), 'Enter a complete HTTPS creator link.'), 400);
          }
        }
        if (stryMutAct_9fa48("8982") ? (url.href.length > 2048 || url.protocol !== 'https:' || url.username || url.password) && urls.has(url.href) : stryMutAct_9fa48("8981") ? false : stryMutAct_9fa48("8980") ? true : (stryCov_9fa48("8980", "8981", "8982"), (stryMutAct_9fa48("8984") ? (url.href.length > 2048 || url.protocol !== 'https:' || url.username) && url.password : stryMutAct_9fa48("8983") ? false : (stryCov_9fa48("8983", "8984"), (stryMutAct_9fa48("8986") ? (url.href.length > 2048 || url.protocol !== 'https:') && url.username : stryMutAct_9fa48("8985") ? false : (stryCov_9fa48("8985", "8986"), (stryMutAct_9fa48("8988") ? url.href.length > 2048 && url.protocol !== 'https:' : stryMutAct_9fa48("8987") ? false : (stryCov_9fa48("8987", "8988"), (stryMutAct_9fa48("8991") ? url.href.length <= 2048 : stryMutAct_9fa48("8990") ? url.href.length >= 2048 : stryMutAct_9fa48("8989") ? false : (stryCov_9fa48("8989", "8990", "8991"), url.href.length > 2048)) || (stryMutAct_9fa48("8993") ? url.protocol === 'https:' : stryMutAct_9fa48("8992") ? false : (stryCov_9fa48("8992", "8993"), url.protocol !== (stryMutAct_9fa48("8994") ? "" : (stryCov_9fa48("8994"), 'https:')))))) || url.username)) || url.password)) || urls.has(url.href))) throw new CommunityError(stryMutAct_9fa48("8996") ? "" : (stryCov_9fa48("8996"), 'invalid_request'), stryMutAct_9fa48("8997") ? "" : (stryCov_9fa48("8997"), 'Creator links must be unique HTTPS URLs without embedded credentials.'), 400);
        if (stryMutAct_9fa48("8998")) {
          ;
        } else {
          stryCov_9fa48("8998");
          urls.add(url.href);
        }
        return stryMutAct_9fa48("8999") ? {} : (stryCov_9fa48("8999"), {
          label,
          url: url.href
        });
      }
    });
  }
}
export function parseSaveBuildRequest(value: unknown): SaveBuildRequest {
  if (stryMutAct_9fa48("9000")) {
    {}
  } else {
    stryCov_9fa48("9000");
    if (stryMutAct_9fa48("9003") ? (!object(value) || typeof value.operationId !== 'string') && !/^[a-zA-Z0-9_-]{16,100}$/.test(value.operationId) : stryMutAct_9fa48("9002") ? false : stryMutAct_9fa48("9001") ? true : (stryCov_9fa48("9001", "9002", "9003"), (stryMutAct_9fa48("9005") ? !object(value) && typeof value.operationId !== 'string' : stryMutAct_9fa48("9004") ? false : (stryCov_9fa48("9004", "9005"), (stryMutAct_9fa48("9006") ? object(value) : (stryCov_9fa48("9006"), !object(value))) || (stryMutAct_9fa48("9008") ? typeof value.operationId === 'string' : stryMutAct_9fa48("9007") ? false : (stryCov_9fa48("9007", "9008"), typeof value.operationId !== (stryMutAct_9fa48("9009") ? "" : (stryCov_9fa48("9009"), 'string')))))) || (stryMutAct_9fa48("9010") ? /^[a-zA-Z0-9_-]{16,100}$/.test(value.operationId) : (stryCov_9fa48("9010"), !(stryMutAct_9fa48("9014") ? /^[^a-zA-Z0-9_-]{16,100}$/ : stryMutAct_9fa48("9013") ? /^[a-zA-Z0-9_-]$/ : stryMutAct_9fa48("9012") ? /^[a-zA-Z0-9_-]{16,100}/ : stryMutAct_9fa48("9011") ? /[a-zA-Z0-9_-]{16,100}$/ : (stryCov_9fa48("9011", "9012", "9013", "9014"), /^[a-zA-Z0-9_-]{16,100}$/)).test(value.operationId))))) {
      if (stryMutAct_9fa48("9015")) {
        {}
      } else {
        stryCov_9fa48("9015");
        throw new CommunityError(stryMutAct_9fa48("9017") ? "" : (stryCov_9fa48("9017"), 'invalid_request'), stryMutAct_9fa48("9018") ? "" : (stryCov_9fa48("9018"), 'This save needs a valid operation ID. Start a new account save.'), 400);
      }
    }
    try {
      if (stryMutAct_9fa48("9019")) {
        {}
      } else {
        stryCov_9fa48("9019");
        const build = parseBuild(value.build);
        return stryMutAct_9fa48("9020") ? {} : (stryCov_9fa48("9020"), {
          operationId: value.operationId,
          build: parseBuild(pruneBuildImports(build))
        });
      }
    } catch (error) {
      if (stryMutAct_9fa48("9021")) {
        {}
      } else {
        stryCov_9fa48("9021");
        throw new CommunityError(stryMutAct_9fa48("9023") ? "" : (stryCov_9fa48("9023"), 'invalid_request'), error instanceof Error ? error.message : stryMutAct_9fa48("9024") ? "" : (stryCov_9fa48("9024"), 'This build could not be read.'), 400);
      }
    }
  }
}
function parseSavedBuildSummary(value: unknown): SavedBuildSummary {
  if (stryMutAct_9fa48("9025")) {
    {}
  } else {
    stryCov_9fa48("9025");
    if (stryMutAct_9fa48("9028") ? (!object(value) || typeof value.id !== 'string' || !/^[a-zA-Z0-9_-]{16,100}$/.test(value.id) || typeof value.name !== 'string' || !value.name || value.name.length > 80 || typeof value.createdAt !== 'string') && !Number.isFinite(Date.parse(value.createdAt)) : stryMutAct_9fa48("9027") ? false : stryMutAct_9fa48("9026") ? true : (stryCov_9fa48("9026", "9027", "9028"), (stryMutAct_9fa48("9030") ? (!object(value) || typeof value.id !== 'string' || !/^[a-zA-Z0-9_-]{16,100}$/.test(value.id) || typeof value.name !== 'string' || !value.name || value.name.length > 80) && typeof value.createdAt !== 'string' : stryMutAct_9fa48("9029") ? false : (stryCov_9fa48("9029", "9030"), (stryMutAct_9fa48("9032") ? (!object(value) || typeof value.id !== 'string' || !/^[a-zA-Z0-9_-]{16,100}$/.test(value.id) || typeof value.name !== 'string' || !value.name) && value.name.length > 80 : stryMutAct_9fa48("9031") ? false : (stryCov_9fa48("9031", "9032"), (stryMutAct_9fa48("9034") ? (!object(value) || typeof value.id !== 'string' || !/^[a-zA-Z0-9_-]{16,100}$/.test(value.id) || typeof value.name !== 'string') && !value.name : stryMutAct_9fa48("9033") ? false : (stryCov_9fa48("9033", "9034"), (stryMutAct_9fa48("9036") ? (!object(value) || typeof value.id !== 'string' || !/^[a-zA-Z0-9_-]{16,100}$/.test(value.id)) && typeof value.name !== 'string' : stryMutAct_9fa48("9035") ? false : (stryCov_9fa48("9035", "9036"), (stryMutAct_9fa48("9038") ? (!object(value) || typeof value.id !== 'string') && !/^[a-zA-Z0-9_-]{16,100}$/.test(value.id) : stryMutAct_9fa48("9037") ? false : (stryCov_9fa48("9037", "9038"), (stryMutAct_9fa48("9040") ? !object(value) && typeof value.id !== 'string' : stryMutAct_9fa48("9039") ? false : (stryCov_9fa48("9039", "9040"), (stryMutAct_9fa48("9041") ? object(value) : (stryCov_9fa48("9041"), !object(value))) || (stryMutAct_9fa48("9043") ? typeof value.id === 'string' : stryMutAct_9fa48("9042") ? false : (stryCov_9fa48("9042", "9043"), typeof value.id !== (stryMutAct_9fa48("9044") ? "" : (stryCov_9fa48("9044"), 'string')))))) || (stryMutAct_9fa48("9045") ? /^[a-zA-Z0-9_-]{16,100}$/.test(value.id) : (stryCov_9fa48("9045"), !(stryMutAct_9fa48("9049") ? /^[^a-zA-Z0-9_-]{16,100}$/ : stryMutAct_9fa48("9048") ? /^[a-zA-Z0-9_-]$/ : stryMutAct_9fa48("9047") ? /^[a-zA-Z0-9_-]{16,100}/ : stryMutAct_9fa48("9046") ? /[a-zA-Z0-9_-]{16,100}$/ : (stryCov_9fa48("9046", "9047", "9048", "9049"), /^[a-zA-Z0-9_-]{16,100}$/)).test(value.id))))) || (stryMutAct_9fa48("9051") ? typeof value.name === 'string' : stryMutAct_9fa48("9050") ? false : (stryCov_9fa48("9050", "9051"), typeof value.name !== (stryMutAct_9fa48("9052") ? "" : (stryCov_9fa48("9052"), 'string')))))) || (stryMutAct_9fa48("9053") ? value.name : (stryCov_9fa48("9053"), !value.name)))) || (stryMutAct_9fa48("9056") ? value.name.length <= 80 : stryMutAct_9fa48("9055") ? value.name.length >= 80 : stryMutAct_9fa48("9054") ? false : (stryCov_9fa48("9054", "9055", "9056"), value.name.length > 80)))) || (stryMutAct_9fa48("9058") ? typeof value.createdAt === 'string' : stryMutAct_9fa48("9057") ? false : (stryCov_9fa48("9057", "9058"), typeof value.createdAt !== (stryMutAct_9fa48("9059") ? "" : (stryCov_9fa48("9059"), 'string')))))) || (stryMutAct_9fa48("9060") ? Number.isFinite(Date.parse(value.createdAt)) : (stryCov_9fa48("9060"), !Number.isFinite(Date.parse(value.createdAt)))))) {
      if (stryMutAct_9fa48("9061")) {
        {}
      } else {
        stryCov_9fa48("9061");
        throw new Error(stryMutAct_9fa48("9063") ? "" : (stryCov_9fa48("9063"), 'The saved build response could not be read. Try loading your account again.'));
      }
    }
    return stryMutAct_9fa48("9064") ? {} : (stryCov_9fa48("9064"), {
      id: value.id,
      name: value.name,
      createdAt: value.createdAt
    });
  }
}
export function parseSavedBuild(value: unknown): SavedBuild {
  if (stryMutAct_9fa48("9065")) {
    {}
  } else {
    stryCov_9fa48("9065");
    const summary = parseSavedBuildSummary(value);
    if (stryMutAct_9fa48("9068") ? false : stryMutAct_9fa48("9067") ? true : stryMutAct_9fa48("9066") ? object(value) : (stryCov_9fa48("9066", "9067", "9068"), !object(value))) throw new Error(stryMutAct_9fa48("9070") ? "" : (stryCov_9fa48("9070"), 'The saved build response could not be read.'));
    const build = parseBuild(value.build);
    return stryMutAct_9fa48("9071") ? {} : (stryCov_9fa48("9071"), {
      ...summary,
      build,
      ...((stryMutAct_9fa48("9074") ? value.evidence !== undefined : stryMutAct_9fa48("9073") ? false : stryMutAct_9fa48("9072") ? true : (stryCov_9fa48("9072", "9073", "9074"), value.evidence === undefined)) ? {} : stryMutAct_9fa48("9075") ? {} : (stryCov_9fa48("9075"), {
        evidence: parsePublicBuildEvidence(value.evidence, build)
      }))
    });
  }
}
export function parseSavedBuildSummaries(value: unknown): SavedBuildSummary[] {
  if (stryMutAct_9fa48("9076")) {
    {}
  } else {
    stryCov_9fa48("9076");
    if (stryMutAct_9fa48("9079") ? !Array.isArray(value) && value.length > 100 : stryMutAct_9fa48("9078") ? false : stryMutAct_9fa48("9077") ? true : (stryCov_9fa48("9077", "9078", "9079"), (stryMutAct_9fa48("9080") ? Array.isArray(value) : (stryCov_9fa48("9080"), !Array.isArray(value))) || (stryMutAct_9fa48("9083") ? value.length <= 100 : stryMutAct_9fa48("9082") ? value.length >= 100 : stryMutAct_9fa48("9081") ? false : (stryCov_9fa48("9081", "9082", "9083"), value.length > 100)))) throw new Error(stryMutAct_9fa48("9085") ? "" : (stryCov_9fa48("9085"), 'The saved build list could not be read.'));
    return value.map(parseSavedBuildSummary);
  }
}
export function communityResponse(value: unknown, status = 200): Response {
  if (stryMutAct_9fa48("9086")) {
    {}
  } else {
    stryCov_9fa48("9086");
    return Response.json(value, stryMutAct_9fa48("9087") ? {} : (stryCov_9fa48("9087"), {
      status,
      headers: stryMutAct_9fa48("9088") ? {} : (stryCov_9fa48("9088"), {
        'Cache-Control': stryMutAct_9fa48("9089") ? "" : (stryCov_9fa48("9089"), 'private, no-store'),
        Vary: stryMutAct_9fa48("9090") ? "" : (stryCov_9fa48("9090"), 'Cookie')
      })
    }));
  }
}
export function communityErrorResponse(error: unknown): Response {
  if (stryMutAct_9fa48("9091")) {
    {}
  } else {
    stryCov_9fa48("9091");
    const failure = error instanceof CommunityError ? error : new CommunityError(stryMutAct_9fa48("9092") ? "" : (stryCov_9fa48("9092"), 'storage_unavailable'), stryMutAct_9fa48("9093") ? "" : (stryCov_9fa48("9093"), 'Your account could not be reached. Your device draft is safe. Try again.'), 503);
    return communityResponse(stryMutAct_9fa48("9094") ? {} : (stryCov_9fa48("9094"), {
      error: stryMutAct_9fa48("9095") ? {} : (stryCov_9fa48("9095"), {
        code: failure.code,
        message: failure.message
      })
    }), failure.status);
  }
}
export async function communityRequest(request: Request, maxBytes = stryMutAct_9fa48("9096") ? 128 / 1024 : (stryCov_9fa48("9096"), 128 * 1024)): Promise<unknown> {
  if (stryMutAct_9fa48("9097")) {
    {}
  } else {
    stryCov_9fa48("9097");
    if (stryMutAct_9fa48("9100") ? request.headers.get('origin') === new URL(request.url).origin : stryMutAct_9fa48("9099") ? false : stryMutAct_9fa48("9098") ? true : (stryCov_9fa48("9098", "9099", "9100"), request.headers.get(stryMutAct_9fa48("9101") ? "" : (stryCov_9fa48("9101"), 'origin')) !== new URL(request.url).origin)) {
      if (stryMutAct_9fa48("9102")) {
        {}
      } else {
        stryCov_9fa48("9102");
        throw new CommunityError(stryMutAct_9fa48("9104") ? "" : (stryCov_9fa48("9104"), 'invalid_origin'), stryMutAct_9fa48("9105") ? "" : (stryCov_9fa48("9105"), 'Save from this Keyconf site. Refresh the page and try again.'), 403);
      }
    }
    if (stryMutAct_9fa48("9108") ? request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() === 'application/json' : stryMutAct_9fa48("9107") ? false : stryMutAct_9fa48("9106") ? true : (stryCov_9fa48("9106", "9107", "9108"), (stryMutAct_9fa48("9111") ? request.headers.get('content-type').split(';')[0].trim().toLowerCase() : stryMutAct_9fa48("9110") ? request.headers.get('content-type')?.split(';')[0].toLowerCase() : stryMutAct_9fa48("9109") ? request.headers.get('content-type')?.split(';')[0].trim().toUpperCase() : (stryCov_9fa48("9109", "9110", "9111"), request.headers.get(stryMutAct_9fa48("9112") ? "" : (stryCov_9fa48("9112"), 'content-type'))?.split(stryMutAct_9fa48("9113") ? "" : (stryCov_9fa48("9113"), ';'))[0].trim().toLowerCase())) !== (stryMutAct_9fa48("9114") ? "" : (stryCov_9fa48("9114"), 'application/json')))) {
      if (stryMutAct_9fa48("9115")) {
        {}
      } else {
        stryCov_9fa48("9115");
        throw new CommunityError(stryMutAct_9fa48("9117") ? "" : (stryCov_9fa48("9117"), 'invalid_request'), stryMutAct_9fa48("9118") ? "" : (stryCov_9fa48("9118"), 'Send a JSON account request.'), 400);
      }
    }
    const content = await requestText(request, maxBytes);
    if (stryMutAct_9fa48("9121") ? content !== null : stryMutAct_9fa48("9120") ? false : stryMutAct_9fa48("9119") ? true : (stryCov_9fa48("9119", "9120", "9121"), content === null)) throw new CommunityError(stryMutAct_9fa48("9123") ? "" : (stryCov_9fa48("9123"), 'request_too_large'), stryMutAct_9fa48("9124") ? "" : (stryCov_9fa48("9124"), 'This account save is too large. Export the build file to keep a copy.'), 413);
    try {
      if (stryMutAct_9fa48("9125")) {
        {}
      } else {
        stryCov_9fa48("9125");
        return JSON.parse(content);
      }
    } catch {
      if (stryMutAct_9fa48("9126")) {
        {}
      } else {
        stryCov_9fa48("9126");
        throw new CommunityError(stryMutAct_9fa48("9128") ? "" : (stryCov_9fa48("9128"), 'invalid_request'), stryMutAct_9fa48("9129") ? "" : (stryCov_9fa48("9129"), 'This request is not readable JSON. Try again.'), 400);
      }
    }
  }
}
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
import { CommunityError, parseCommunityProfile, type CommunityProfile } from './community.ts';
export type PublicationRequest = {
  reviewedProfile?: CommunityProfile;
  operationId: string;
  buildId: string;
  title: string;
  note: string;
} & ({
  kind: 'build';
} | {
  kind: 'drop';
  availability: string;
  externalUrl: string | null;
});
export function parsePublicationRequest(value: unknown): PublicationRequest {
  if (stryMutAct_9fa48("13846")) {
    {}
  } else {
    stryCov_9fa48("13846");
    if (stryMutAct_9fa48("13849") ? (typeof value !== 'object' || value === null) && Array.isArray(value) : stryMutAct_9fa48("13848") ? false : stryMutAct_9fa48("13847") ? true : (stryCov_9fa48("13847", "13848", "13849"), (stryMutAct_9fa48("13851") ? typeof value !== 'object' && value === null : stryMutAct_9fa48("13850") ? false : (stryCov_9fa48("13850", "13851"), (stryMutAct_9fa48("13853") ? typeof value === 'object' : stryMutAct_9fa48("13852") ? false : (stryCov_9fa48("13852", "13853"), typeof value !== (stryMutAct_9fa48("13854") ? "" : (stryCov_9fa48("13854"), 'object')))) || (stryMutAct_9fa48("13856") ? value !== null : stryMutAct_9fa48("13855") ? false : (stryCov_9fa48("13855", "13856"), value === null)))) || Array.isArray(value))) throw invalid(stryMutAct_9fa48("13857") ? "" : (stryCov_9fa48("13857"), 'Review a saved build before publishing.'));
    if (stryMutAct_9fa48("13860") ? (!('operationId' in value) || !identifier(value.operationId) || !('buildId' in value)) && !identifier(value.buildId) : stryMutAct_9fa48("13859") ? false : stryMutAct_9fa48("13858") ? true : (stryCov_9fa48("13858", "13859", "13860"), (stryMutAct_9fa48("13862") ? (!('operationId' in value) || !identifier(value.operationId)) && !('buildId' in value) : stryMutAct_9fa48("13861") ? false : (stryCov_9fa48("13861", "13862"), (stryMutAct_9fa48("13864") ? !('operationId' in value) && !identifier(value.operationId) : stryMutAct_9fa48("13863") ? false : (stryCov_9fa48("13863", "13864"), (stryMutAct_9fa48("13865") ? 'operationId' in value : (stryCov_9fa48("13865"), !((stryMutAct_9fa48("13866") ? "" : (stryCov_9fa48("13866"), 'operationId')) in value))) || (stryMutAct_9fa48("13867") ? identifier(value.operationId) : (stryCov_9fa48("13867"), !identifier(value.operationId))))) || (stryMutAct_9fa48("13868") ? 'buildId' in value : (stryCov_9fa48("13868"), !((stryMutAct_9fa48("13869") ? "" : (stryCov_9fa48("13869"), 'buildId')) in value))))) || (stryMutAct_9fa48("13870") ? identifier(value.buildId) : (stryCov_9fa48("13870"), !identifier(value.buildId))))) throw invalid(stryMutAct_9fa48("13871") ? "" : (stryCov_9fa48("13871"), 'Publishing needs a saved build and a valid operation ID.'));
    if (stryMutAct_9fa48("13874") ? !('title' in value) && !('note' in value) : stryMutAct_9fa48("13873") ? false : stryMutAct_9fa48("13872") ? true : (stryCov_9fa48("13872", "13873", "13874"), (stryMutAct_9fa48("13875") ? 'title' in value : (stryCov_9fa48("13875"), !((stryMutAct_9fa48("13876") ? "" : (stryCov_9fa48("13876"), 'title')) in value))) || (stryMutAct_9fa48("13877") ? 'note' in value : (stryCov_9fa48("13877"), !((stryMutAct_9fa48("13878") ? "" : (stryCov_9fa48("13878"), 'note')) in value))))) throw invalid(stryMutAct_9fa48("13879") ? "" : (stryCov_9fa48("13879"), 'Add a title and note for the publication.'));
    const common = stryMutAct_9fa48("13880") ? {} : (stryCov_9fa48("13880"), {
      ...((stryMutAct_9fa48("13881") ? "" : (stryCov_9fa48("13881"), 'reviewedProfile')) in value ? stryMutAct_9fa48("13882") ? {} : (stryCov_9fa48("13882"), {
        reviewedProfile: parseCommunityProfile(value.reviewedProfile)
      }) : {}),
      operationId: value.operationId,
      buildId: value.buildId,
      title: text(value.title, 80, stryMutAct_9fa48("13883") ? true : (stryCov_9fa48("13883"), false)),
      note: text(value.note, 1200, stryMutAct_9fa48("13884") ? false : (stryCov_9fa48("13884"), true), stryMutAct_9fa48("13885") ? false : (stryCov_9fa48("13885"), true))
    });
    if (stryMutAct_9fa48("13888") ? 'kind' in value || value.kind === 'build' : stryMutAct_9fa48("13887") ? false : stryMutAct_9fa48("13886") ? true : (stryCov_9fa48("13886", "13887", "13888"), (stryMutAct_9fa48("13889") ? "" : (stryCov_9fa48("13889"), 'kind')) in value && (stryMutAct_9fa48("13891") ? value.kind !== 'build' : stryMutAct_9fa48("13890") ? true : (stryCov_9fa48("13890", "13891"), value.kind === (stryMutAct_9fa48("13892") ? "" : (stryCov_9fa48("13892"), 'build')))))) return stryMutAct_9fa48("13893") ? {} : (stryCov_9fa48("13893"), {
      ...common,
      kind: stryMutAct_9fa48("13894") ? "" : (stryCov_9fa48("13894"), 'build')
    });
    if (stryMutAct_9fa48("13897") ? 'kind' in value && value.kind === 'drop' && 'availability' in value || 'externalUrl' in value : stryMutAct_9fa48("13896") ? false : stryMutAct_9fa48("13895") ? true : (stryCov_9fa48("13895", "13896", "13897"), (stryMutAct_9fa48("13899") ? 'kind' in value && value.kind === 'drop' || 'availability' in value : stryMutAct_9fa48("13898") ? true : (stryCov_9fa48("13898", "13899"), (stryMutAct_9fa48("13901") ? 'kind' in value || value.kind === 'drop' : stryMutAct_9fa48("13900") ? true : (stryCov_9fa48("13900", "13901"), (stryMutAct_9fa48("13902") ? "" : (stryCov_9fa48("13902"), 'kind')) in value && (stryMutAct_9fa48("13904") ? value.kind !== 'drop' : stryMutAct_9fa48("13903") ? true : (stryCov_9fa48("13903", "13904"), value.kind === (stryMutAct_9fa48("13905") ? "" : (stryCov_9fa48("13905"), 'drop')))))) && (stryMutAct_9fa48("13906") ? "" : (stryCov_9fa48("13906"), 'availability')) in value)) && (stryMutAct_9fa48("13907") ? "" : (stryCov_9fa48("13907"), 'externalUrl')) in value)) {
      if (stryMutAct_9fa48("13908")) {
        {}
      } else {
        stryCov_9fa48("13908");
        const availability = text(value.availability, 240, stryMutAct_9fa48("13909") ? false : (stryCov_9fa48("13909"), true));
        let externalUrl: string | null = null;
        if (stryMutAct_9fa48("13912") ? value.externalUrl === null : stryMutAct_9fa48("13911") ? false : stryMutAct_9fa48("13910") ? true : (stryCov_9fa48("13910", "13911", "13912"), value.externalUrl !== null)) {
          if (stryMutAct_9fa48("13913")) {
            {}
          } else {
            stryCov_9fa48("13913");
            if (stryMutAct_9fa48("13916") ? typeof value.externalUrl !== 'string' && value.externalUrl.length > 2048 : stryMutAct_9fa48("13915") ? false : stryMutAct_9fa48("13914") ? true : (stryCov_9fa48("13914", "13915", "13916"), (stryMutAct_9fa48("13918") ? typeof value.externalUrl === 'string' : stryMutAct_9fa48("13917") ? false : (stryCov_9fa48("13917", "13918"), typeof value.externalUrl !== (stryMutAct_9fa48("13919") ? "" : (stryCov_9fa48("13919"), 'string')))) || (stryMutAct_9fa48("13922") ? value.externalUrl.length <= 2048 : stryMutAct_9fa48("13921") ? value.externalUrl.length >= 2048 : stryMutAct_9fa48("13920") ? false : (stryCov_9fa48("13920", "13921", "13922"), value.externalUrl.length > 2048)))) throw invalid(stryMutAct_9fa48("13923") ? "" : (stryCov_9fa48("13923"), 'Use a complete HTTPS enquiry or purchase link.'));
            let url: URL;
            try {
              if (stryMutAct_9fa48("13924")) {
                {}
              } else {
                stryCov_9fa48("13924");
                url = new URL(value.externalUrl);
              }
            } catch {
              if (stryMutAct_9fa48("13925")) {
                {}
              } else {
                stryCov_9fa48("13925");
                throw invalid(stryMutAct_9fa48("13926") ? "" : (stryCov_9fa48("13926"), 'Use a complete HTTPS enquiry or purchase link.'));
              }
            }
            if (stryMutAct_9fa48("13929") ? (url.protocol !== 'https:' || url.username || url.password) && url.href.length > 2048 : stryMutAct_9fa48("13928") ? false : stryMutAct_9fa48("13927") ? true : (stryCov_9fa48("13927", "13928", "13929"), (stryMutAct_9fa48("13931") ? (url.protocol !== 'https:' || url.username) && url.password : stryMutAct_9fa48("13930") ? false : (stryCov_9fa48("13930", "13931"), (stryMutAct_9fa48("13933") ? url.protocol !== 'https:' && url.username : stryMutAct_9fa48("13932") ? false : (stryCov_9fa48("13932", "13933"), (stryMutAct_9fa48("13935") ? url.protocol === 'https:' : stryMutAct_9fa48("13934") ? false : (stryCov_9fa48("13934", "13935"), url.protocol !== (stryMutAct_9fa48("13936") ? "" : (stryCov_9fa48("13936"), 'https:')))) || url.username)) || url.password)) || (stryMutAct_9fa48("13939") ? url.href.length <= 2048 : stryMutAct_9fa48("13938") ? url.href.length >= 2048 : stryMutAct_9fa48("13937") ? false : (stryCov_9fa48("13937", "13938", "13939"), url.href.length > 2048)))) throw invalid(stryMutAct_9fa48("13940") ? "" : (stryCov_9fa48("13940"), 'Use an HTTPS link without embedded credentials.'));
            externalUrl = url.href;
          }
        }
        return stryMutAct_9fa48("13941") ? {} : (stryCov_9fa48("13941"), {
          ...common,
          kind: stryMutAct_9fa48("13942") ? "" : (stryCov_9fa48("13942"), 'drop'),
          availability,
          externalUrl
        });
      }
    }
    throw invalid(stryMutAct_9fa48("13943") ? "" : (stryCov_9fa48("13943"), 'Choose a build publication or creator drop.'));
  }
}
function identifier(value: unknown): value is string {
  if (stryMutAct_9fa48("13944")) {
    {}
  } else {
    stryCov_9fa48("13944");
    return stryMutAct_9fa48("13947") ? typeof value === 'string' || /^[a-zA-Z0-9_-]{16,100}$/.test(value) : stryMutAct_9fa48("13946") ? false : stryMutAct_9fa48("13945") ? true : (stryCov_9fa48("13945", "13946", "13947"), (stryMutAct_9fa48("13949") ? typeof value !== 'string' : stryMutAct_9fa48("13948") ? true : (stryCov_9fa48("13948", "13949"), typeof value === (stryMutAct_9fa48("13950") ? "" : (stryCov_9fa48("13950"), 'string')))) && (stryMutAct_9fa48("13954") ? /^[^a-zA-Z0-9_-]{16,100}$/ : stryMutAct_9fa48("13953") ? /^[a-zA-Z0-9_-]$/ : stryMutAct_9fa48("13952") ? /^[a-zA-Z0-9_-]{16,100}/ : stryMutAct_9fa48("13951") ? /[a-zA-Z0-9_-]{16,100}$/ : (stryCov_9fa48("13951", "13952", "13953", "13954"), /^[a-zA-Z0-9_-]{16,100}$/)).test(value));
  }
}
function text(value: unknown, limit: number, allowEmpty: boolean, multiline = stryMutAct_9fa48("13955") ? true : (stryCov_9fa48("13955"), false)): string {
  if (stryMutAct_9fa48("13956")) {
    {}
  } else {
    stryCov_9fa48("13956");
    if (stryMutAct_9fa48("13959") ? typeof value === 'string' : stryMutAct_9fa48("13958") ? false : stryMutAct_9fa48("13957") ? true : (stryCov_9fa48("13957", "13958", "13959"), typeof value !== (stryMutAct_9fa48("13960") ? "" : (stryCov_9fa48("13960"), 'string')))) throw invalid(stryMutAct_9fa48("13961") ? "" : (stryCov_9fa48("13961"), 'Publication text must be plain text.'));
    const result = stryMutAct_9fa48("13962") ? value.replaceAll('\r\n', '\n') : (stryCov_9fa48("13962"), value.replaceAll(stryMutAct_9fa48("13963") ? "" : (stryCov_9fa48("13963"), '\r\n'), stryMutAct_9fa48("13964") ? "" : (stryCov_9fa48("13964"), '\n')).trim());
    if (stryMutAct_9fa48("13967") ? (!allowEmpty && !result || result.length > limit) && result.split('').some(character => character.charCodeAt(0) < 32 && !(multiline && character === '\n') || character.charCodeAt(0) === 127) : stryMutAct_9fa48("13966") ? false : stryMutAct_9fa48("13965") ? true : (stryCov_9fa48("13965", "13966", "13967"), (stryMutAct_9fa48("13969") ? !allowEmpty && !result && result.length > limit : stryMutAct_9fa48("13968") ? false : (stryCov_9fa48("13968", "13969"), (stryMutAct_9fa48("13971") ? !allowEmpty || !result : stryMutAct_9fa48("13970") ? false : (stryCov_9fa48("13970", "13971"), (stryMutAct_9fa48("13972") ? allowEmpty : (stryCov_9fa48("13972"), !allowEmpty)) && (stryMutAct_9fa48("13973") ? result : (stryCov_9fa48("13973"), !result)))) || (stryMutAct_9fa48("13976") ? result.length <= limit : stryMutAct_9fa48("13975") ? result.length >= limit : stryMutAct_9fa48("13974") ? false : (stryCov_9fa48("13974", "13975", "13976"), result.length > limit)))) || (stryMutAct_9fa48("13977") ? result.split('').every(character => character.charCodeAt(0) < 32 && !(multiline && character === '\n') || character.charCodeAt(0) === 127) : (stryCov_9fa48("13977"), result.split(stryMutAct_9fa48("13978") ? "Stryker was here!" : (stryCov_9fa48("13978"), '')).some(stryMutAct_9fa48("13979") ? () => undefined : (stryCov_9fa48("13979"), character => stryMutAct_9fa48("13982") ? character.charCodeAt(0) < 32 && !(multiline && character === '\n') && character.charCodeAt(0) === 127 : stryMutAct_9fa48("13981") ? false : stryMutAct_9fa48("13980") ? true : (stryCov_9fa48("13980", "13981", "13982"), (stryMutAct_9fa48("13984") ? character.charCodeAt(0) < 32 || !(multiline && character === '\n') : stryMutAct_9fa48("13983") ? false : (stryCov_9fa48("13983", "13984"), (stryMutAct_9fa48("13987") ? character.charCodeAt(0) >= 32 : stryMutAct_9fa48("13986") ? character.charCodeAt(0) <= 32 : stryMutAct_9fa48("13985") ? true : (stryCov_9fa48("13985", "13986", "13987"), character.charCodeAt(0) < 32)) && (stryMutAct_9fa48("13988") ? multiline && character === '\n' : (stryCov_9fa48("13988"), !(stryMutAct_9fa48("13991") ? multiline || character === '\n' : stryMutAct_9fa48("13990") ? false : stryMutAct_9fa48("13989") ? true : (stryCov_9fa48("13989", "13990", "13991"), multiline && (stryMutAct_9fa48("13993") ? character !== '\n' : stryMutAct_9fa48("13992") ? true : (stryCov_9fa48("13992", "13993"), character === (stryMutAct_9fa48("13994") ? "" : (stryCov_9fa48("13994"), '\n')))))))))) || (stryMutAct_9fa48("13996") ? character.charCodeAt(0) !== 127 : stryMutAct_9fa48("13995") ? false : (stryCov_9fa48("13995", "13996"), character.charCodeAt(0) === 127))))))))) throw invalid(stryMutAct_9fa48("13997") ? `` : (stryCov_9fa48("13997"), `Use ${multiline ? stryMutAct_9fa48("13998") ? "" : (stryCov_9fa48("13998"), 'plain text') : stryMutAct_9fa48("13999") ? "" : (stryCov_9fa48("13999"), 'single-line text')} of at most ${limit} characters.`));
    return result;
  }
}
function invalid(message: string) {
  if (stryMutAct_9fa48("14000")) {
    {}
  } else {
    stryCov_9fa48("14000");
    return new CommunityError(stryMutAct_9fa48("14001") ? "" : (stryCov_9fa48("14001"), 'invalid_request'), message, 400);
  }
}
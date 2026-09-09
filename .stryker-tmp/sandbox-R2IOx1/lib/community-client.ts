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
import { CommunityError, parseCommunityProfile, parseSaveBuildRequest, parseSavedBuild, parseSavedBuildSummaries, type CommunityErrorCode, type CommunityProfile, type SaveBuildRequest, type SavedBuildSummary } from './community.ts';
import { requestText } from './request-text.ts';
import { parseBuildSnapshot } from './build.ts';
import { parsePublicBuildEvidence } from './build-evidence.ts';
import { parsePublicationRequest, type PublicationRequest } from './publication.ts';
import type { PublicPublication } from '../db/publications.ts';
export type SavedBuildCursor = Pick<SavedBuildSummary, 'createdAt' | 'id'>;
export type SavedBuildPage = {
  items: SavedBuildSummary[];
  next: SavedBuildCursor | null;
};
export type CommunityRequestOptions = {
  signal?: AbortSignal;
};
type ClientErrorCode = CommunityErrorCode | 'invalid_response' | 'network_error' | 'timeout';
export class CommunityClientError extends Error {
  readonly code: ClientErrorCode;
  readonly status: number;
  constructor(code: ClientErrorCode, message: string, status = 0) {
    if (stryMutAct_9fa48("8152")) {
      {}
    } else {
      stryCov_9fa48("8152");
      super(message);
      this.name = stryMutAct_9fa48("8153") ? "" : (stryCov_9fa48("8153"), 'CommunityClientError');
      this.code = code;
      this.status = status;
    }
  }
}
const serverErrors = (stryMutAct_9fa48("8154") ? [] : (stryCov_9fa48("8154"), [stryMutAct_9fa48("8155") ? [] : (stryCov_9fa48("8155"), [stryMutAct_9fa48("8156") ? "" : (stryCov_9fa48("8156"), 'authentication_required'), stryMutAct_9fa48("8157") ? "" : (stryCov_9fa48("8157"), 'Sign in to use your account. Your device draft is safe.')]), stryMutAct_9fa48("8158") ? [] : (stryCov_9fa48("8158"), [stryMutAct_9fa48("8159") ? "" : (stryCov_9fa48("8159"), 'invalid_origin'), stryMutAct_9fa48("8160") ? "" : (stryCov_9fa48("8160"), 'Open your account on this Keyconf site and try again.')]), stryMutAct_9fa48("8161") ? [] : (stryCov_9fa48("8161"), [stryMutAct_9fa48("8162") ? "" : (stryCov_9fa48("8162"), 'invalid_request'), stryMutAct_9fa48("8163") ? "" : (stryCov_9fa48("8163"), 'Review the account details and try again.')]), stryMutAct_9fa48("8164") ? [] : (stryCov_9fa48("8164"), [stryMutAct_9fa48("8165") ? "" : (stryCov_9fa48("8165"), 'request_too_large'), stryMutAct_9fa48("8166") ? "" : (stryCov_9fa48("8166"), 'This save is too large. Export your build to keep a copy.')]), stryMutAct_9fa48("8167") ? [] : (stryCov_9fa48("8167"), [stryMutAct_9fa48("8168") ? "" : (stryCov_9fa48("8168"), 'handle_taken'), stryMutAct_9fa48("8169") ? "" : (stryCov_9fa48("8169"), 'That handle is already taken. Choose another.')]), stryMutAct_9fa48("8170") ? [] : (stryCov_9fa48("8170"), [stryMutAct_9fa48("8171") ? "" : (stryCov_9fa48("8171"), 'operation_conflict'), stryMutAct_9fa48("8172") ? "" : (stryCov_9fa48("8172"), 'This save ID was already used for different content. Save the current draft as a new copy.')]), stryMutAct_9fa48("8173") ? [] : (stryCov_9fa48("8173"), [stryMutAct_9fa48("8174") ? "" : (stryCov_9fa48("8174"), 'build_not_found'), stryMutAct_9fa48("8175") ? "" : (stryCov_9fa48("8175"), 'This build is not available in your account.')]), stryMutAct_9fa48("8176") ? [] : (stryCov_9fa48("8176"), [stryMutAct_9fa48("8177") ? "" : (stryCov_9fa48("8177"), 'publication_not_found'), stryMutAct_9fa48("8178") ? "" : (stryCov_9fa48("8178"), 'This publication is not available.')]), stryMutAct_9fa48("8179") ? [] : (stryCov_9fa48("8179"), [stryMutAct_9fa48("8180") ? "" : (stryCov_9fa48("8180"), 'proposal_not_found'), stryMutAct_9fa48("8181") ? "" : (stryCov_9fa48("8181"), 'This proposal is not available.')]), stryMutAct_9fa48("8182") ? [] : (stryCov_9fa48("8182"), [stryMutAct_9fa48("8183") ? "" : (stryCov_9fa48("8183"), 'response_not_found'), stryMutAct_9fa48("8184") ? "" : (stryCov_9fa48("8184"), 'This response is not available.')]), stryMutAct_9fa48("8185") ? [] : (stryCov_9fa48("8185"), [stryMutAct_9fa48("8186") ? "" : (stryCov_9fa48("8186"), 'profile_changed'), stryMutAct_9fa48("8187") ? "" : (stryCov_9fa48("8187"), 'Your creator profile changed. Return to editing and review it again before publishing.')]), stryMutAct_9fa48("8188") ? [] : (stryCov_9fa48("8188"), [stryMutAct_9fa48("8189") ? "" : (stryCov_9fa48("8189"), 'profile_required'), stryMutAct_9fa48("8190") ? "" : (stryCov_9fa48("8190"), 'Choose your profile before continuing.')]), stryMutAct_9fa48("8191") ? [] : (stryCov_9fa48("8191"), [stryMutAct_9fa48("8192") ? "" : (stryCov_9fa48("8192"), 'saved_build_unavailable'), stryMutAct_9fa48("8193") ? "" : (stryCov_9fa48("8193"), 'This saved build uses unsupported parts or settings. Its snapshot is still saved.')]), stryMutAct_9fa48("8194") ? [] : (stryCov_9fa48("8194"), [stryMutAct_9fa48("8195") ? "" : (stryCov_9fa48("8195"), 'storage_unavailable'), stryMutAct_9fa48("8196") ? "" : (stryCov_9fa48("8196"), 'Your account could not be reached. Your device draft is safe. Try again.')])])) satisfies [CommunityErrorCode, string][];
function object(value: unknown): value is Record<string, unknown> {
  if (stryMutAct_9fa48("8197")) {
    {}
  } else {
    stryCov_9fa48("8197");
    return stryMutAct_9fa48("8200") ? !!value && typeof value === 'object' || !Array.isArray(value) : stryMutAct_9fa48("8199") ? false : stryMutAct_9fa48("8198") ? true : (stryCov_9fa48("8198", "8199", "8200"), (stryMutAct_9fa48("8202") ? !!value || typeof value === 'object' : stryMutAct_9fa48("8201") ? true : (stryCov_9fa48("8201", "8202"), (stryMutAct_9fa48("8203") ? !value : (stryCov_9fa48("8203"), !(stryMutAct_9fa48("8204") ? value : (stryCov_9fa48("8204"), !value)))) && (stryMutAct_9fa48("8206") ? typeof value !== 'object' : stryMutAct_9fa48("8205") ? true : (stryCov_9fa48("8205", "8206"), typeof value === (stryMutAct_9fa48("8207") ? "" : (stryCov_9fa48("8207"), 'object')))))) && (stryMutAct_9fa48("8208") ? Array.isArray(value) : (stryCov_9fa48("8208"), !Array.isArray(value))));
  }
}
function unreadable() {
  if (stryMutAct_9fa48("8209")) {
    {}
  } else {
    stryCov_9fa48("8209");
    return new CommunityClientError(stryMutAct_9fa48("8210") ? "" : (stryCov_9fa48("8210"), 'invalid_response'), stryMutAct_9fa48("8211") ? "" : (stryCov_9fa48("8211"), 'The account response could not be read. Try again.'));
  }
}
function cursor(value: unknown): SavedBuildCursor {
  if (stryMutAct_9fa48("8212")) {
    {}
  } else {
    stryCov_9fa48("8212");
    if (stryMutAct_9fa48("8215") ? (!object(value) || typeof value.id !== 'string' || !/^[a-zA-Z0-9_-]{16,100}$/.test(value.id) || typeof value.createdAt !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value.createdAt) || !Number.isFinite(Date.parse(value.createdAt))) && new Date(value.createdAt).toISOString() !== value.createdAt : stryMutAct_9fa48("8214") ? false : stryMutAct_9fa48("8213") ? true : (stryCov_9fa48("8213", "8214", "8215"), (stryMutAct_9fa48("8217") ? (!object(value) || typeof value.id !== 'string' || !/^[a-zA-Z0-9_-]{16,100}$/.test(value.id) || typeof value.createdAt !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value.createdAt)) && !Number.isFinite(Date.parse(value.createdAt)) : stryMutAct_9fa48("8216") ? false : (stryCov_9fa48("8216", "8217"), (stryMutAct_9fa48("8219") ? (!object(value) || typeof value.id !== 'string' || !/^[a-zA-Z0-9_-]{16,100}$/.test(value.id) || typeof value.createdAt !== 'string') && !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value.createdAt) : stryMutAct_9fa48("8218") ? false : (stryCov_9fa48("8218", "8219"), (stryMutAct_9fa48("8221") ? (!object(value) || typeof value.id !== 'string' || !/^[a-zA-Z0-9_-]{16,100}$/.test(value.id)) && typeof value.createdAt !== 'string' : stryMutAct_9fa48("8220") ? false : (stryCov_9fa48("8220", "8221"), (stryMutAct_9fa48("8223") ? (!object(value) || typeof value.id !== 'string') && !/^[a-zA-Z0-9_-]{16,100}$/.test(value.id) : stryMutAct_9fa48("8222") ? false : (stryCov_9fa48("8222", "8223"), (stryMutAct_9fa48("8225") ? !object(value) && typeof value.id !== 'string' : stryMutAct_9fa48("8224") ? false : (stryCov_9fa48("8224", "8225"), (stryMutAct_9fa48("8226") ? object(value) : (stryCov_9fa48("8226"), !object(value))) || (stryMutAct_9fa48("8228") ? typeof value.id === 'string' : stryMutAct_9fa48("8227") ? false : (stryCov_9fa48("8227", "8228"), typeof value.id !== (stryMutAct_9fa48("8229") ? "" : (stryCov_9fa48("8229"), 'string')))))) || (stryMutAct_9fa48("8230") ? /^[a-zA-Z0-9_-]{16,100}$/.test(value.id) : (stryCov_9fa48("8230"), !(stryMutAct_9fa48("8234") ? /^[^a-zA-Z0-9_-]{16,100}$/ : stryMutAct_9fa48("8233") ? /^[a-zA-Z0-9_-]$/ : stryMutAct_9fa48("8232") ? /^[a-zA-Z0-9_-]{16,100}/ : stryMutAct_9fa48("8231") ? /[a-zA-Z0-9_-]{16,100}$/ : (stryCov_9fa48("8231", "8232", "8233", "8234"), /^[a-zA-Z0-9_-]{16,100}$/)).test(value.id))))) || (stryMutAct_9fa48("8236") ? typeof value.createdAt === 'string' : stryMutAct_9fa48("8235") ? false : (stryCov_9fa48("8235", "8236"), typeof value.createdAt !== (stryMutAct_9fa48("8237") ? "" : (stryCov_9fa48("8237"), 'string')))))) || (stryMutAct_9fa48("8238") ? /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value.createdAt) : (stryCov_9fa48("8238"), !(stryMutAct_9fa48("8254") ? /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\D{3}Z$/ : stryMutAct_9fa48("8253") ? /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\dZ$/ : stryMutAct_9fa48("8252") ? /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\D{2}\.\d{3}Z$/ : stryMutAct_9fa48("8251") ? /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d\.\d{3}Z$/ : stryMutAct_9fa48("8250") ? /^\d{4}-\d{2}-\d{2}T\d{2}:\D{2}:\d{2}\.\d{3}Z$/ : stryMutAct_9fa48("8249") ? /^\d{4}-\d{2}-\d{2}T\d{2}:\d:\d{2}\.\d{3}Z$/ : stryMutAct_9fa48("8248") ? /^\d{4}-\d{2}-\d{2}T\D{2}:\d{2}:\d{2}\.\d{3}Z$/ : stryMutAct_9fa48("8247") ? /^\d{4}-\d{2}-\d{2}T\d:\d{2}:\d{2}\.\d{3}Z$/ : stryMutAct_9fa48("8246") ? /^\d{4}-\d{2}-\D{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/ : stryMutAct_9fa48("8245") ? /^\d{4}-\d{2}-\dT\d{2}:\d{2}:\d{2}\.\d{3}Z$/ : stryMutAct_9fa48("8244") ? /^\d{4}-\D{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/ : stryMutAct_9fa48("8243") ? /^\d{4}-\d-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/ : stryMutAct_9fa48("8242") ? /^\D{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/ : stryMutAct_9fa48("8241") ? /^\d-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/ : stryMutAct_9fa48("8240") ? /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/ : stryMutAct_9fa48("8239") ? /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/ : (stryCov_9fa48("8239", "8240", "8241", "8242", "8243", "8244", "8245", "8246", "8247", "8248", "8249", "8250", "8251", "8252", "8253", "8254"), /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)).test(value.createdAt))))) || (stryMutAct_9fa48("8255") ? Number.isFinite(Date.parse(value.createdAt)) : (stryCov_9fa48("8255"), !Number.isFinite(Date.parse(value.createdAt)))))) || (stryMutAct_9fa48("8257") ? new Date(value.createdAt).toISOString() === value.createdAt : stryMutAct_9fa48("8256") ? false : (stryCov_9fa48("8256", "8257"), new Date(value.createdAt).toISOString() !== value.createdAt)))) throw unreadable();
    return stryMutAct_9fa48("8258") ? {} : (stryCov_9fa48("8258"), {
      id: value.id,
      createdAt: value.createdAt
    });
  }
}
function older(left: SavedBuildCursor, right: SavedBuildCursor) {
  if (stryMutAct_9fa48("8259")) {
    {}
  } else {
    stryCov_9fa48("8259");
    return stryMutAct_9fa48("8262") ? left.createdAt < right.createdAt && left.createdAt === right.createdAt && left.id < right.id : stryMutAct_9fa48("8261") ? false : stryMutAct_9fa48("8260") ? true : (stryCov_9fa48("8260", "8261", "8262"), (stryMutAct_9fa48("8265") ? left.createdAt >= right.createdAt : stryMutAct_9fa48("8264") ? left.createdAt <= right.createdAt : stryMutAct_9fa48("8263") ? false : (stryCov_9fa48("8263", "8264", "8265"), left.createdAt < right.createdAt)) || (stryMutAct_9fa48("8267") ? left.createdAt === right.createdAt || left.id < right.id : stryMutAct_9fa48("8266") ? false : (stryCov_9fa48("8266", "8267"), (stryMutAct_9fa48("8269") ? left.createdAt !== right.createdAt : stryMutAct_9fa48("8268") ? true : (stryCov_9fa48("8268", "8269"), left.createdAt === right.createdAt)) && (stryMutAct_9fa48("8272") ? left.id >= right.id : stryMutAct_9fa48("8271") ? left.id <= right.id : stryMutAct_9fa48("8270") ? true : (stryCov_9fa48("8270", "8271", "8272"), left.id < right.id)))));
  }
}
export function parseSavedBuildPage(value: unknown): SavedBuildPage {
  if (stryMutAct_9fa48("8273")) {
    {}
  } else {
    stryCov_9fa48("8273");
    try {
      if (stryMutAct_9fa48("8274")) {
        {}
      } else {
        stryCov_9fa48("8274");
        if (stryMutAct_9fa48("8277") ? (!object(value) || !Array.isArray(value.items)) && value.items.length > 25 : stryMutAct_9fa48("8276") ? false : stryMutAct_9fa48("8275") ? true : (stryCov_9fa48("8275", "8276", "8277"), (stryMutAct_9fa48("8279") ? !object(value) && !Array.isArray(value.items) : stryMutAct_9fa48("8278") ? false : (stryCov_9fa48("8278", "8279"), (stryMutAct_9fa48("8280") ? object(value) : (stryCov_9fa48("8280"), !object(value))) || (stryMutAct_9fa48("8281") ? Array.isArray(value.items) : (stryCov_9fa48("8281"), !Array.isArray(value.items))))) || (stryMutAct_9fa48("8284") ? value.items.length <= 25 : stryMutAct_9fa48("8283") ? value.items.length >= 25 : stryMutAct_9fa48("8282") ? false : (stryCov_9fa48("8282", "8283", "8284"), value.items.length > 25)))) throw unreadable();
        const items = parseSavedBuildSummaries(value.items);
        for (const [index, item] of items.entries()) {
          if (stryMutAct_9fa48("8285")) {
            {}
          } else {
            stryCov_9fa48("8285");
            if (stryMutAct_9fa48("8286")) {
              ;
            } else {
              stryCov_9fa48("8286");
              cursor(item);
            }
            if (stryMutAct_9fa48("8289") ? index > 0 || !older(item, items[index - 1]) : stryMutAct_9fa48("8288") ? false : stryMutAct_9fa48("8287") ? true : (stryCov_9fa48("8287", "8288", "8289"), (stryMutAct_9fa48("8292") ? index <= 0 : stryMutAct_9fa48("8291") ? index >= 0 : stryMutAct_9fa48("8290") ? true : (stryCov_9fa48("8290", "8291", "8292"), index > 0)) && (stryMutAct_9fa48("8293") ? older(item, items[index - 1]) : (stryCov_9fa48("8293"), !older(item, items[stryMutAct_9fa48("8294") ? index + 1 : (stryCov_9fa48("8294"), index - 1)]))))) throw unreadable();
          }
        }
        if (stryMutAct_9fa48("8297") ? new Set(items.map(item => item.id)).size === items.length : stryMutAct_9fa48("8296") ? false : stryMutAct_9fa48("8295") ? true : (stryCov_9fa48("8295", "8296", "8297"), new Set(items.map(stryMutAct_9fa48("8298") ? () => undefined : (stryCov_9fa48("8298"), item => item.id))).size !== items.length)) throw unreadable();
        const next = (stryMutAct_9fa48("8301") ? value.next !== null : stryMutAct_9fa48("8300") ? false : stryMutAct_9fa48("8299") ? true : (stryCov_9fa48("8299", "8300", "8301"), value.next === null)) ? null : cursor(value.next);
        const last = items.at(stryMutAct_9fa48("8302") ? +1 : (stryCov_9fa48("8302"), -1));
        if (stryMutAct_9fa48("8305") ? next || !last || next.id !== last.id || next.createdAt !== last.createdAt : stryMutAct_9fa48("8304") ? false : stryMutAct_9fa48("8303") ? true : (stryCov_9fa48("8303", "8304", "8305"), next && (stryMutAct_9fa48("8307") ? (!last || next.id !== last.id) && next.createdAt !== last.createdAt : stryMutAct_9fa48("8306") ? true : (stryCov_9fa48("8306", "8307"), (stryMutAct_9fa48("8309") ? !last && next.id !== last.id : stryMutAct_9fa48("8308") ? false : (stryCov_9fa48("8308", "8309"), (stryMutAct_9fa48("8310") ? last : (stryCov_9fa48("8310"), !last)) || (stryMutAct_9fa48("8312") ? next.id === last.id : stryMutAct_9fa48("8311") ? false : (stryCov_9fa48("8311", "8312"), next.id !== last.id)))) || (stryMutAct_9fa48("8314") ? next.createdAt === last.createdAt : stryMutAct_9fa48("8313") ? false : (stryCov_9fa48("8313", "8314"), next.createdAt !== last.createdAt)))))) throw unreadable();
        return stryMutAct_9fa48("8315") ? {} : (stryCov_9fa48("8315"), {
          items,
          next
        });
      }
    } catch {
      if (stryMutAct_9fa48("8316")) {
        {}
      } else {
        stryCov_9fa48("8316");
        throw unreadable();
      }
    }
  }
}
export type FavoriteCursor = {
  publicationId: string;
  createdAt: string;
};
export type FavoriteItem = FavoriteCursor & ({
  status: 'unavailable';
} | {
  status: 'available';
  title: string;
  kind: 'build' | 'drop';
});
export type FavoritePage = {
  items: FavoriteItem[];
  next: FavoriteCursor | null;
};
function favoriteCursor(value: unknown): FavoriteCursor {
  if (stryMutAct_9fa48("8317")) {
    {}
  } else {
    stryCov_9fa48("8317");
    if (stryMutAct_9fa48("8320") ? false : stryMutAct_9fa48("8319") ? true : stryMutAct_9fa48("8318") ? object(value) : (stryCov_9fa48("8318", "8319", "8320"), !object(value))) throw unreadable();
    const parsed = cursor(stryMutAct_9fa48("8321") ? {} : (stryCov_9fa48("8321"), {
      id: value.publicationId,
      createdAt: value.createdAt
    }));
    return stryMutAct_9fa48("8322") ? {} : (stryCov_9fa48("8322"), {
      publicationId: parsed.id,
      createdAt: parsed.createdAt
    });
  }
}
function olderFavorite(left: FavoriteCursor, right: FavoriteCursor) {
  if (stryMutAct_9fa48("8323")) {
    {}
  } else {
    stryCov_9fa48("8323");
    return older(stryMutAct_9fa48("8324") ? {} : (stryCov_9fa48("8324"), {
      id: left.publicationId,
      createdAt: left.createdAt
    }), stryMutAct_9fa48("8325") ? {} : (stryCov_9fa48("8325"), {
      id: right.publicationId,
      createdAt: right.createdAt
    }));
  }
}
export function parseFavoritePage(value: unknown): FavoritePage {
  if (stryMutAct_9fa48("8326")) {
    {}
  } else {
    stryCov_9fa48("8326");
    if (stryMutAct_9fa48("8329") ? (!object(value) || !Array.isArray(value.items)) && value.items.length > 25 : stryMutAct_9fa48("8328") ? false : stryMutAct_9fa48("8327") ? true : (stryCov_9fa48("8327", "8328", "8329"), (stryMutAct_9fa48("8331") ? !object(value) && !Array.isArray(value.items) : stryMutAct_9fa48("8330") ? false : (stryCov_9fa48("8330", "8331"), (stryMutAct_9fa48("8332") ? object(value) : (stryCov_9fa48("8332"), !object(value))) || (stryMutAct_9fa48("8333") ? Array.isArray(value.items) : (stryCov_9fa48("8333"), !Array.isArray(value.items))))) || (stryMutAct_9fa48("8336") ? value.items.length <= 25 : stryMutAct_9fa48("8335") ? value.items.length >= 25 : stryMutAct_9fa48("8334") ? false : (stryCov_9fa48("8334", "8335", "8336"), value.items.length > 25)))) throw unreadable();
    const items = value.items.map((item): FavoriteItem => {
      if (stryMutAct_9fa48("8337")) {
        {}
      } else {
        stryCov_9fa48("8337");
        const key = favoriteCursor(item);
        if (stryMutAct_9fa48("8340") ? false : stryMutAct_9fa48("8339") ? true : stryMutAct_9fa48("8338") ? object(item) : (stryCov_9fa48("8338", "8339", "8340"), !object(item))) throw unreadable();
        if (stryMutAct_9fa48("8343") ? item.status !== 'unavailable' : stryMutAct_9fa48("8342") ? false : stryMutAct_9fa48("8341") ? true : (stryCov_9fa48("8341", "8342", "8343"), item.status === (stryMutAct_9fa48("8344") ? "" : (stryCov_9fa48("8344"), 'unavailable')))) return stryMutAct_9fa48("8345") ? {} : (stryCov_9fa48("8345"), {
          ...key,
          status: stryMutAct_9fa48("8346") ? "" : (stryCov_9fa48("8346"), 'unavailable')
        });
        if (stryMutAct_9fa48("8349") ? (item.status !== 'available' || typeof item.title !== 'string' || !item.title.trim() || item.title.length > 80) && item.kind !== 'build' && item.kind !== 'drop' : stryMutAct_9fa48("8348") ? false : stryMutAct_9fa48("8347") ? true : (stryCov_9fa48("8347", "8348", "8349"), (stryMutAct_9fa48("8351") ? (item.status !== 'available' || typeof item.title !== 'string' || !item.title.trim()) && item.title.length > 80 : stryMutAct_9fa48("8350") ? false : (stryCov_9fa48("8350", "8351"), (stryMutAct_9fa48("8353") ? (item.status !== 'available' || typeof item.title !== 'string') && !item.title.trim() : stryMutAct_9fa48("8352") ? false : (stryCov_9fa48("8352", "8353"), (stryMutAct_9fa48("8355") ? item.status !== 'available' && typeof item.title !== 'string' : stryMutAct_9fa48("8354") ? false : (stryCov_9fa48("8354", "8355"), (stryMutAct_9fa48("8357") ? item.status === 'available' : stryMutAct_9fa48("8356") ? false : (stryCov_9fa48("8356", "8357"), item.status !== (stryMutAct_9fa48("8358") ? "" : (stryCov_9fa48("8358"), 'available')))) || (stryMutAct_9fa48("8360") ? typeof item.title === 'string' : stryMutAct_9fa48("8359") ? false : (stryCov_9fa48("8359", "8360"), typeof item.title !== (stryMutAct_9fa48("8361") ? "" : (stryCov_9fa48("8361"), 'string')))))) || (stryMutAct_9fa48("8362") ? item.title.trim() : (stryCov_9fa48("8362"), !(stryMutAct_9fa48("8363") ? item.title : (stryCov_9fa48("8363"), item.title.trim())))))) || (stryMutAct_9fa48("8366") ? item.title.length <= 80 : stryMutAct_9fa48("8365") ? item.title.length >= 80 : stryMutAct_9fa48("8364") ? false : (stryCov_9fa48("8364", "8365", "8366"), item.title.length > 80)))) || (stryMutAct_9fa48("8368") ? item.kind !== 'build' || item.kind !== 'drop' : stryMutAct_9fa48("8367") ? false : (stryCov_9fa48("8367", "8368"), (stryMutAct_9fa48("8370") ? item.kind === 'build' : stryMutAct_9fa48("8369") ? true : (stryCov_9fa48("8369", "8370"), item.kind !== (stryMutAct_9fa48("8371") ? "" : (stryCov_9fa48("8371"), 'build')))) && (stryMutAct_9fa48("8373") ? item.kind === 'drop' : stryMutAct_9fa48("8372") ? true : (stryCov_9fa48("8372", "8373"), item.kind !== (stryMutAct_9fa48("8374") ? "" : (stryCov_9fa48("8374"), 'drop')))))))) throw unreadable();
        return stryMutAct_9fa48("8375") ? {} : (stryCov_9fa48("8375"), {
          ...key,
          status: stryMutAct_9fa48("8376") ? "" : (stryCov_9fa48("8376"), 'available'),
          title: item.title,
          kind: item.kind
        });
      }
    });
    for (const [index, item] of items.entries()) if (stryMutAct_9fa48("8379") ? index > 0 || !olderFavorite(item, items[index - 1]) : stryMutAct_9fa48("8378") ? false : stryMutAct_9fa48("8377") ? true : (stryCov_9fa48("8377", "8378", "8379"), (stryMutAct_9fa48("8382") ? index <= 0 : stryMutAct_9fa48("8381") ? index >= 0 : stryMutAct_9fa48("8380") ? true : (stryCov_9fa48("8380", "8381", "8382"), index > 0)) && (stryMutAct_9fa48("8383") ? olderFavorite(item, items[index - 1]) : (stryCov_9fa48("8383"), !olderFavorite(item, items[stryMutAct_9fa48("8384") ? index + 1 : (stryCov_9fa48("8384"), index - 1)]))))) throw unreadable();
    if (stryMutAct_9fa48("8387") ? new Set(items.map(item => item.publicationId)).size === items.length : stryMutAct_9fa48("8386") ? false : stryMutAct_9fa48("8385") ? true : (stryCov_9fa48("8385", "8386", "8387"), new Set(items.map(stryMutAct_9fa48("8388") ? () => undefined : (stryCov_9fa48("8388"), item => item.publicationId))).size !== items.length)) throw unreadable();
    const next = (stryMutAct_9fa48("8391") ? value.next !== null : stryMutAct_9fa48("8390") ? false : stryMutAct_9fa48("8389") ? true : (stryCov_9fa48("8389", "8390", "8391"), value.next === null)) ? null : favoriteCursor(value.next);
    const last = items.at(stryMutAct_9fa48("8392") ? +1 : (stryCov_9fa48("8392"), -1));
    if (stryMutAct_9fa48("8395") ? next || !last || next.publicationId !== last.publicationId || next.createdAt !== last.createdAt : stryMutAct_9fa48("8394") ? false : stryMutAct_9fa48("8393") ? true : (stryCov_9fa48("8393", "8394", "8395"), next && (stryMutAct_9fa48("8397") ? (!last || next.publicationId !== last.publicationId) && next.createdAt !== last.createdAt : stryMutAct_9fa48("8396") ? true : (stryCov_9fa48("8396", "8397"), (stryMutAct_9fa48("8399") ? !last && next.publicationId !== last.publicationId : stryMutAct_9fa48("8398") ? false : (stryCov_9fa48("8398", "8399"), (stryMutAct_9fa48("8400") ? last : (stryCov_9fa48("8400"), !last)) || (stryMutAct_9fa48("8402") ? next.publicationId === last.publicationId : stryMutAct_9fa48("8401") ? false : (stryCov_9fa48("8401", "8402"), next.publicationId !== last.publicationId)))) || (stryMutAct_9fa48("8404") ? next.createdAt === last.createdAt : stryMutAct_9fa48("8403") ? false : (stryCov_9fa48("8403", "8404"), next.createdAt !== last.createdAt)))))) throw unreadable();
    return stryMutAct_9fa48("8405") ? {} : (stryCov_9fa48("8405"), {
      items,
      next
    });
  }
}
export type PublicationCursor = Pick<PublicPublication, 'id' | 'publishedAt'>;
export type OwnedPublicationSummary = PublicationCursor & Pick<PublicPublication, 'title' | 'withdrawnAt'> & {
  kind: PublicationRequest['kind'];
};
export type OwnedPublicationPage = {
  items: OwnedPublicationSummary[];
  next: PublicationCursor | null;
};
export type PublicationWithdrawal = {
  id: string;
  withdrawnAt: string;
};
export type PublicationReceipt = {
  status: 'published';
} & Pick<PublicPublication, 'id' | 'publishedAt' | 'title' | 'note' | 'release' | 'author'> | {
  status: 'withdrawn';
} & PublicationWithdrawal;
function publicationCursor(value: unknown): PublicationCursor {
  if (stryMutAct_9fa48("8406")) {
    {}
  } else {
    stryCov_9fa48("8406");
    if (stryMutAct_9fa48("8409") ? false : stryMutAct_9fa48("8408") ? true : stryMutAct_9fa48("8407") ? object(value) : (stryCov_9fa48("8407", "8408", "8409"), !object(value))) throw unreadable();
    const parsed = cursor(stryMutAct_9fa48("8410") ? {} : (stryCov_9fa48("8410"), {
      id: value.id,
      createdAt: value.publishedAt
    }));
    return stryMutAct_9fa48("8411") ? {} : (stryCov_9fa48("8411"), {
      id: parsed.id,
      publishedAt: parsed.createdAt
    });
  }
}
function olderPublication(left: PublicationCursor, right: PublicationCursor) {
  if (stryMutAct_9fa48("8412")) {
    {}
  } else {
    stryCov_9fa48("8412");
    return older(stryMutAct_9fa48("8413") ? {} : (stryCov_9fa48("8413"), {
      id: left.id,
      createdAt: left.publishedAt
    }), stryMutAct_9fa48("8414") ? {} : (stryCov_9fa48("8414"), {
      id: right.id,
      createdAt: right.publishedAt
    }));
  }
}
function publicationWithdrawal(value: unknown): PublicationWithdrawal {
  if (stryMutAct_9fa48("8415")) {
    {}
  } else {
    stryCov_9fa48("8415");
    if (stryMutAct_9fa48("8418") ? false : stryMutAct_9fa48("8417") ? true : stryMutAct_9fa48("8416") ? object(value) : (stryCov_9fa48("8416", "8417", "8418"), !object(value))) throw unreadable();
    const parsed = cursor(stryMutAct_9fa48("8419") ? {} : (stryCov_9fa48("8419"), {
      id: value.id,
      createdAt: value.withdrawnAt
    }));
    return stryMutAct_9fa48("8420") ? {} : (stryCov_9fa48("8420"), {
      id: parsed.id,
      withdrawnAt: parsed.createdAt
    });
  }
}
export function parseOwnedPublicationPage(value: unknown): OwnedPublicationPage {
  if (stryMutAct_9fa48("8421")) {
    {}
  } else {
    stryCov_9fa48("8421");
    if (stryMutAct_9fa48("8424") ? (!object(value) || !Array.isArray(value.items)) && value.items.length > 25 : stryMutAct_9fa48("8423") ? false : stryMutAct_9fa48("8422") ? true : (stryCov_9fa48("8422", "8423", "8424"), (stryMutAct_9fa48("8426") ? !object(value) && !Array.isArray(value.items) : stryMutAct_9fa48("8425") ? false : (stryCov_9fa48("8425", "8426"), (stryMutAct_9fa48("8427") ? object(value) : (stryCov_9fa48("8427"), !object(value))) || (stryMutAct_9fa48("8428") ? Array.isArray(value.items) : (stryCov_9fa48("8428"), !Array.isArray(value.items))))) || (stryMutAct_9fa48("8431") ? value.items.length <= 25 : stryMutAct_9fa48("8430") ? value.items.length >= 25 : stryMutAct_9fa48("8429") ? false : (stryCov_9fa48("8429", "8430", "8431"), value.items.length > 25)))) throw unreadable();
    const items = value.items.map((item): OwnedPublicationSummary => {
      if (stryMutAct_9fa48("8432")) {
        {}
      } else {
        stryCov_9fa48("8432");
        const key = publicationCursor(item);
        if (stryMutAct_9fa48("8435") ? (!object(item) || typeof item.title !== 'string' || !item.title.trim() || item.title.length > 80 || /\p{Cc}/u.test(item.title)) && item.kind !== 'build' && item.kind !== 'drop' : stryMutAct_9fa48("8434") ? false : stryMutAct_9fa48("8433") ? true : (stryCov_9fa48("8433", "8434", "8435"), (stryMutAct_9fa48("8437") ? (!object(item) || typeof item.title !== 'string' || !item.title.trim() || item.title.length > 80) && /\p{Cc}/u.test(item.title) : stryMutAct_9fa48("8436") ? false : (stryCov_9fa48("8436", "8437"), (stryMutAct_9fa48("8439") ? (!object(item) || typeof item.title !== 'string' || !item.title.trim()) && item.title.length > 80 : stryMutAct_9fa48("8438") ? false : (stryCov_9fa48("8438", "8439"), (stryMutAct_9fa48("8441") ? (!object(item) || typeof item.title !== 'string') && !item.title.trim() : stryMutAct_9fa48("8440") ? false : (stryCov_9fa48("8440", "8441"), (stryMutAct_9fa48("8443") ? !object(item) && typeof item.title !== 'string' : stryMutAct_9fa48("8442") ? false : (stryCov_9fa48("8442", "8443"), (stryMutAct_9fa48("8444") ? object(item) : (stryCov_9fa48("8444"), !object(item))) || (stryMutAct_9fa48("8446") ? typeof item.title === 'string' : stryMutAct_9fa48("8445") ? false : (stryCov_9fa48("8445", "8446"), typeof item.title !== (stryMutAct_9fa48("8447") ? "" : (stryCov_9fa48("8447"), 'string')))))) || (stryMutAct_9fa48("8448") ? item.title.trim() : (stryCov_9fa48("8448"), !(stryMutAct_9fa48("8449") ? item.title : (stryCov_9fa48("8449"), item.title.trim())))))) || (stryMutAct_9fa48("8452") ? item.title.length <= 80 : stryMutAct_9fa48("8451") ? item.title.length >= 80 : stryMutAct_9fa48("8450") ? false : (stryCov_9fa48("8450", "8451", "8452"), item.title.length > 80)))) || (stryMutAct_9fa48("8453") ? /\P{Cc}/u : (stryCov_9fa48("8453"), /\p{Cc}/u)).test(item.title))) || (stryMutAct_9fa48("8455") ? item.kind !== 'build' || item.kind !== 'drop' : stryMutAct_9fa48("8454") ? false : (stryCov_9fa48("8454", "8455"), (stryMutAct_9fa48("8457") ? item.kind === 'build' : stryMutAct_9fa48("8456") ? true : (stryCov_9fa48("8456", "8457"), item.kind !== (stryMutAct_9fa48("8458") ? "" : (stryCov_9fa48("8458"), 'build')))) && (stryMutAct_9fa48("8460") ? item.kind === 'drop' : stryMutAct_9fa48("8459") ? true : (stryCov_9fa48("8459", "8460"), item.kind !== (stryMutAct_9fa48("8461") ? "" : (stryCov_9fa48("8461"), 'drop')))))))) throw unreadable();
        const withdrawnAt = (stryMutAct_9fa48("8464") ? item.withdrawnAt !== null : stryMutAct_9fa48("8463") ? false : stryMutAct_9fa48("8462") ? true : (stryCov_9fa48("8462", "8463", "8464"), item.withdrawnAt === null)) ? null : publicationWithdrawal(item).withdrawnAt;
        return stryMutAct_9fa48("8465") ? {} : (stryCov_9fa48("8465"), {
          ...key,
          title: item.title,
          kind: item.kind,
          withdrawnAt
        });
      }
    });
    for (const [index, item] of items.entries()) if (stryMutAct_9fa48("8468") ? index > 0 || !olderPublication(item, items[index - 1]) : stryMutAct_9fa48("8467") ? false : stryMutAct_9fa48("8466") ? true : (stryCov_9fa48("8466", "8467", "8468"), (stryMutAct_9fa48("8471") ? index <= 0 : stryMutAct_9fa48("8470") ? index >= 0 : stryMutAct_9fa48("8469") ? true : (stryCov_9fa48("8469", "8470", "8471"), index > 0)) && (stryMutAct_9fa48("8472") ? olderPublication(item, items[index - 1]) : (stryCov_9fa48("8472"), !olderPublication(item, items[stryMutAct_9fa48("8473") ? index + 1 : (stryCov_9fa48("8473"), index - 1)]))))) throw unreadable();
    if (stryMutAct_9fa48("8476") ? new Set(items.map(item => item.id)).size === items.length : stryMutAct_9fa48("8475") ? false : stryMutAct_9fa48("8474") ? true : (stryCov_9fa48("8474", "8475", "8476"), new Set(items.map(stryMutAct_9fa48("8477") ? () => undefined : (stryCov_9fa48("8477"), item => item.id))).size !== items.length)) throw unreadable();
    const next = (stryMutAct_9fa48("8480") ? value.next !== null : stryMutAct_9fa48("8479") ? false : stryMutAct_9fa48("8478") ? true : (stryCov_9fa48("8478", "8479", "8480"), value.next === null)) ? null : publicationCursor(value.next);
    const last = items.at(stryMutAct_9fa48("8481") ? +1 : (stryCov_9fa48("8481"), -1));
    if (stryMutAct_9fa48("8484") ? next || !last || next.id !== last.id || next.publishedAt !== last.publishedAt : stryMutAct_9fa48("8483") ? false : stryMutAct_9fa48("8482") ? true : (stryCov_9fa48("8482", "8483", "8484"), next && (stryMutAct_9fa48("8486") ? (!last || next.id !== last.id) && next.publishedAt !== last.publishedAt : stryMutAct_9fa48("8485") ? true : (stryCov_9fa48("8485", "8486"), (stryMutAct_9fa48("8488") ? !last && next.id !== last.id : stryMutAct_9fa48("8487") ? false : (stryCov_9fa48("8487", "8488"), (stryMutAct_9fa48("8489") ? last : (stryCov_9fa48("8489"), !last)) || (stryMutAct_9fa48("8491") ? next.id === last.id : stryMutAct_9fa48("8490") ? false : (stryCov_9fa48("8490", "8491"), next.id !== last.id)))) || (stryMutAct_9fa48("8493") ? next.publishedAt === last.publishedAt : stryMutAct_9fa48("8492") ? false : (stryCov_9fa48("8492", "8493"), next.publishedAt !== last.publishedAt)))))) throw unreadable();
    return stryMutAct_9fa48("8494") ? {} : (stryCov_9fa48("8494"), {
      items,
      next
    });
  }
}
function publicationReceipt(value: unknown, request: PublicationRequest): PublicationReceipt {
  if (stryMutAct_9fa48("8495")) {
    {}
  } else {
    stryCov_9fa48("8495");
    if (stryMutAct_9fa48("8498") ? (!object(value) || value.operationId !== request.operationId) && value.buildId !== request.buildId : stryMutAct_9fa48("8497") ? false : stryMutAct_9fa48("8496") ? true : (stryCov_9fa48("8496", "8497", "8498"), (stryMutAct_9fa48("8500") ? !object(value) && value.operationId !== request.operationId : stryMutAct_9fa48("8499") ? false : (stryCov_9fa48("8499", "8500"), (stryMutAct_9fa48("8501") ? object(value) : (stryCov_9fa48("8501"), !object(value))) || (stryMutAct_9fa48("8503") ? value.operationId === request.operationId : stryMutAct_9fa48("8502") ? false : (stryCov_9fa48("8502", "8503"), value.operationId !== request.operationId)))) || (stryMutAct_9fa48("8505") ? value.buildId === request.buildId : stryMutAct_9fa48("8504") ? false : (stryCov_9fa48("8504", "8505"), value.buildId !== request.buildId)))) throw unreadable();
    if (stryMutAct_9fa48("8508") ? value.withdrawnAt === null : stryMutAct_9fa48("8507") ? false : stryMutAct_9fa48("8506") ? true : (stryCov_9fa48("8506", "8507", "8508"), value.withdrawnAt !== null)) return stryMutAct_9fa48("8509") ? {} : (stryCov_9fa48("8509"), {
      status: stryMutAct_9fa48("8510") ? "" : (stryCov_9fa48("8510"), 'withdrawn'),
      ...publicationWithdrawal(value)
    });
    const key = publicationCursor(value);
    if (stryMutAct_9fa48("8513") ? (value.title !== request.title || value.note !== request.note || !object(value.release) || value.release.kind !== request.kind || request.kind === 'drop' && (value.release.availability !== request.availability || value.release.externalUrl !== request.externalUrl)) && value.customization !== 'available' && value.customization !== 'unavailable' : stryMutAct_9fa48("8512") ? false : stryMutAct_9fa48("8511") ? true : (stryCov_9fa48("8511", "8512", "8513"), (stryMutAct_9fa48("8515") ? (value.title !== request.title || value.note !== request.note || !object(value.release) || value.release.kind !== request.kind) && request.kind === 'drop' && (value.release.availability !== request.availability || value.release.externalUrl !== request.externalUrl) : stryMutAct_9fa48("8514") ? false : (stryCov_9fa48("8514", "8515"), (stryMutAct_9fa48("8517") ? (value.title !== request.title || value.note !== request.note || !object(value.release)) && value.release.kind !== request.kind : stryMutAct_9fa48("8516") ? false : (stryCov_9fa48("8516", "8517"), (stryMutAct_9fa48("8519") ? (value.title !== request.title || value.note !== request.note) && !object(value.release) : stryMutAct_9fa48("8518") ? false : (stryCov_9fa48("8518", "8519"), (stryMutAct_9fa48("8521") ? value.title !== request.title && value.note !== request.note : stryMutAct_9fa48("8520") ? false : (stryCov_9fa48("8520", "8521"), (stryMutAct_9fa48("8523") ? value.title === request.title : stryMutAct_9fa48("8522") ? false : (stryCov_9fa48("8522", "8523"), value.title !== request.title)) || (stryMutAct_9fa48("8525") ? value.note === request.note : stryMutAct_9fa48("8524") ? false : (stryCov_9fa48("8524", "8525"), value.note !== request.note)))) || (stryMutAct_9fa48("8526") ? object(value.release) : (stryCov_9fa48("8526"), !object(value.release))))) || (stryMutAct_9fa48("8528") ? value.release.kind === request.kind : stryMutAct_9fa48("8527") ? false : (stryCov_9fa48("8527", "8528"), value.release.kind !== request.kind)))) || (stryMutAct_9fa48("8530") ? request.kind === 'drop' || value.release.availability !== request.availability || value.release.externalUrl !== request.externalUrl : stryMutAct_9fa48("8529") ? false : (stryCov_9fa48("8529", "8530"), (stryMutAct_9fa48("8532") ? request.kind !== 'drop' : stryMutAct_9fa48("8531") ? true : (stryCov_9fa48("8531", "8532"), request.kind === (stryMutAct_9fa48("8533") ? "" : (stryCov_9fa48("8533"), 'drop')))) && (stryMutAct_9fa48("8535") ? value.release.availability !== request.availability && value.release.externalUrl !== request.externalUrl : stryMutAct_9fa48("8534") ? true : (stryCov_9fa48("8534", "8535"), (stryMutAct_9fa48("8537") ? value.release.availability === request.availability : stryMutAct_9fa48("8536") ? false : (stryCov_9fa48("8536", "8537"), value.release.availability !== request.availability)) || (stryMutAct_9fa48("8539") ? value.release.externalUrl === request.externalUrl : stryMutAct_9fa48("8538") ? false : (stryCov_9fa48("8538", "8539"), value.release.externalUrl !== request.externalUrl)))))))) || (stryMutAct_9fa48("8541") ? value.customization !== 'available' || value.customization !== 'unavailable' : stryMutAct_9fa48("8540") ? false : (stryCov_9fa48("8540", "8541"), (stryMutAct_9fa48("8543") ? value.customization === 'available' : stryMutAct_9fa48("8542") ? true : (stryCov_9fa48("8542", "8543"), value.customization !== (stryMutAct_9fa48("8544") ? "" : (stryCov_9fa48("8544"), 'available')))) && (stryMutAct_9fa48("8546") ? value.customization === 'unavailable' : stryMutAct_9fa48("8545") ? true : (stryCov_9fa48("8545", "8546"), value.customization !== (stryMutAct_9fa48("8547") ? "" : (stryCov_9fa48("8547"), 'unavailable')))))))) throw unreadable();
    const build = parseBuildSnapshot(value.build);
    if (stryMutAct_9fa48("8550") ? build.name === request.title : stryMutAct_9fa48("8549") ? false : stryMutAct_9fa48("8548") ? true : (stryCov_9fa48("8548", "8549", "8550"), build.name !== request.title)) throw unreadable();
    if (stryMutAct_9fa48("8551")) {
      ;
    } else {
      stryCov_9fa48("8551");
      parsePublicBuildEvidence(value.evidence, build);
    }
    return stryMutAct_9fa48("8552") ? {} : (stryCov_9fa48("8552"), {
      status: stryMutAct_9fa48("8553") ? "" : (stryCov_9fa48("8553"), 'published'),
      ...key,
      title: request.title,
      note: request.note,
      release: (stryMutAct_9fa48("8556") ? request.kind !== 'build' : stryMutAct_9fa48("8555") ? false : stryMutAct_9fa48("8554") ? true : (stryCov_9fa48("8554", "8555", "8556"), request.kind === (stryMutAct_9fa48("8557") ? "" : (stryCov_9fa48("8557"), 'build')))) ? stryMutAct_9fa48("8558") ? {} : (stryCov_9fa48("8558"), {
        kind: stryMutAct_9fa48("8559") ? "" : (stryCov_9fa48("8559"), 'build')
      }) : stryMutAct_9fa48("8560") ? {} : (stryCov_9fa48("8560"), {
        kind: stryMutAct_9fa48("8561") ? "" : (stryCov_9fa48("8561"), 'drop'),
        availability: request.availability,
        externalUrl: request.externalUrl
      }),
      author: parseCommunityProfile(value.author)
    });
  }
}
function profileResponse(value: unknown) {
  if (stryMutAct_9fa48("8562")) {
    {}
  } else {
    stryCov_9fa48("8562");
    if (stryMutAct_9fa48("8565") ? !object(value) && !('profile' in value) : stryMutAct_9fa48("8564") ? false : stryMutAct_9fa48("8563") ? true : (stryCov_9fa48("8563", "8564", "8565"), (stryMutAct_9fa48("8566") ? object(value) : (stryCov_9fa48("8566"), !object(value))) || (stryMutAct_9fa48("8567") ? 'profile' in value : (stryCov_9fa48("8567"), !((stryMutAct_9fa48("8568") ? "" : (stryCov_9fa48("8568"), 'profile')) in value))))) throw unreadable();
    return (stryMutAct_9fa48("8571") ? value.profile !== null : stryMutAct_9fa48("8570") ? false : stryMutAct_9fa48("8569") ? true : (stryCov_9fa48("8569", "8570", "8571"), value.profile === null)) ? null : parseCommunityProfile(value.profile);
  }
}
function input<T>(parse: () => T): T {
  if (stryMutAct_9fa48("8572")) {
    {}
  } else {
    stryCov_9fa48("8572");
    try {
      if (stryMutAct_9fa48("8573")) {
        {}
      } else {
        stryCov_9fa48("8573");
        return parse();
      }
    } catch (error) {
      if (stryMutAct_9fa48("8574")) {
        {}
      } else {
        stryCov_9fa48("8574");
        if (stryMutAct_9fa48("8576") ? false : stryMutAct_9fa48("8575") ? true : (stryCov_9fa48("8575", "8576"), error instanceof CommunityError)) if (stryMutAct_9fa48("8577")) {
          ;
        } else {
          stryCov_9fa48("8577");
          throw new CommunityClientError(error.code, error.message, error.status);
        }
        throw new CommunityClientError(stryMutAct_9fa48("8579") ? "" : (stryCov_9fa48("8579"), 'invalid_request'), stryMutAct_9fa48("8580") ? "" : (stryCov_9fa48("8580"), 'Review the account request and try again.'), 400);
      }
    }
  }
}
export function createCommunityClient({
  fetch: fetcher = globalThis.fetch,
  timeoutMs = 15000
}: {
  fetch?: typeof globalThis.fetch;
  timeoutMs?: number;
} = {}) {
  if (stryMutAct_9fa48("8581")) {
    {}
  } else {
    stryCov_9fa48("8581");
    if (stryMutAct_9fa48("8584") ? (!Number.isSafeInteger(timeoutMs) || timeoutMs < 1) && timeoutMs > 60000 : stryMutAct_9fa48("8583") ? false : stryMutAct_9fa48("8582") ? true : (stryCov_9fa48("8582", "8583", "8584"), (stryMutAct_9fa48("8586") ? !Number.isSafeInteger(timeoutMs) && timeoutMs < 1 : stryMutAct_9fa48("8585") ? false : (stryCov_9fa48("8585", "8586"), (stryMutAct_9fa48("8587") ? Number.isSafeInteger(timeoutMs) : (stryCov_9fa48("8587"), !Number.isSafeInteger(timeoutMs))) || (stryMutAct_9fa48("8590") ? timeoutMs >= 1 : stryMutAct_9fa48("8589") ? timeoutMs <= 1 : stryMutAct_9fa48("8588") ? false : (stryCov_9fa48("8588", "8589", "8590"), timeoutMs < 1)))) || (stryMutAct_9fa48("8593") ? timeoutMs <= 60000 : stryMutAct_9fa48("8592") ? timeoutMs >= 60000 : stryMutAct_9fa48("8591") ? false : (stryCov_9fa48("8591", "8592", "8593"), timeoutMs > 60000)))) throw new Error(stryMutAct_9fa48("8595") ? "" : (stryCov_9fa48("8595"), 'Use an account request timeout between 1 and 60000 milliseconds.'));
    async function send<T>(path: string, method: 'GET' | 'PATCH' | 'POST' | 'PUT' | 'DELETE', parse: (value: unknown) => T, options: CommunityRequestOptions, body?: unknown): Promise<T> {
      if (stryMutAct_9fa48("8596")) {
        {}
      } else {
        stryCov_9fa48("8596");
        stryMutAct_9fa48("8597") ? options.signal.throwIfAborted() : (stryCov_9fa48("8597"), options.signal?.throwIfAborted());
        const timeout = new AbortController();
        const timer = setTimeout(stryMutAct_9fa48("8598") ? () => undefined : (stryCov_9fa48("8598"), () => timeout.abort()), timeoutMs);
        const signal = options.signal ? AbortSignal.any(stryMutAct_9fa48("8599") ? [] : (stryCov_9fa48("8599"), [options.signal, timeout.signal])) : timeout.signal;
        try {
          if (stryMutAct_9fa48("8600")) {
            {}
          } else {
            stryCov_9fa48("8600");
            const response = await fetcher(path, stryMutAct_9fa48("8601") ? {} : (stryCov_9fa48("8601"), {
              method,
              credentials: stryMutAct_9fa48("8602") ? "" : (stryCov_9fa48("8602"), 'same-origin'),
              cache: stryMutAct_9fa48("8603") ? "" : (stryCov_9fa48("8603"), 'no-store'),
              redirect: stryMutAct_9fa48("8604") ? "" : (stryCov_9fa48("8604"), 'error'),
              signal,
              headers: stryMutAct_9fa48("8605") ? {} : (stryCov_9fa48("8605"), {
                Accept: stryMutAct_9fa48("8606") ? "" : (stryCov_9fa48("8606"), 'application/json'),
                ...((stryMutAct_9fa48("8609") ? body !== undefined : stryMutAct_9fa48("8608") ? false : stryMutAct_9fa48("8607") ? true : (stryCov_9fa48("8607", "8608", "8609"), body === undefined)) ? {} : stryMutAct_9fa48("8610") ? {} : (stryCov_9fa48("8610"), {
                  'Content-Type': stryMutAct_9fa48("8611") ? "" : (stryCov_9fa48("8611"), 'application/json')
                }))
              }),
              ...((stryMutAct_9fa48("8614") ? body !== undefined : stryMutAct_9fa48("8613") ? false : stryMutAct_9fa48("8612") ? true : (stryCov_9fa48("8612", "8613", "8614"), body === undefined)) ? {} : stryMutAct_9fa48("8615") ? {} : (stryCov_9fa48("8615"), {
                body: JSON.stringify(body)
              }))
            }));
            const text = await requestText(response, response.ok ? stryMutAct_9fa48("8616") ? 256 / 1024 : (stryCov_9fa48("8616"), 256 * 1024) : 4096);
            if (stryMutAct_9fa48("8617")) {
              ;
            } else {
              stryCov_9fa48("8617");
              signal.throwIfAborted();
            }
            let value: unknown;
            if (stryMutAct_9fa48("8620") ? text !== null || response.headers.get('content-type')?.split(';')[0].trim().toLowerCase() === 'application/json' : stryMutAct_9fa48("8619") ? false : stryMutAct_9fa48("8618") ? true : (stryCov_9fa48("8618", "8619", "8620"), (stryMutAct_9fa48("8622") ? text === null : stryMutAct_9fa48("8621") ? true : (stryCov_9fa48("8621", "8622"), text !== null)) && (stryMutAct_9fa48("8624") ? response.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json' : stryMutAct_9fa48("8623") ? true : (stryCov_9fa48("8623", "8624"), (stryMutAct_9fa48("8627") ? response.headers.get('content-type').split(';')[0].trim().toLowerCase() : stryMutAct_9fa48("8626") ? response.headers.get('content-type')?.split(';')[0].toLowerCase() : stryMutAct_9fa48("8625") ? response.headers.get('content-type')?.split(';')[0].trim().toUpperCase() : (stryCov_9fa48("8625", "8626", "8627"), response.headers.get(stryMutAct_9fa48("8628") ? "" : (stryCov_9fa48("8628"), 'content-type'))?.split(stryMutAct_9fa48("8629") ? "" : (stryCov_9fa48("8629"), ';'))[0].trim().toLowerCase())) === (stryMutAct_9fa48("8630") ? "" : (stryCov_9fa48("8630"), 'application/json')))))) {
              if (stryMutAct_9fa48("8631")) {
                {}
              } else {
                stryCov_9fa48("8631");
                try {
                  if (stryMutAct_9fa48("8632")) {
                    {}
                  } else {
                    stryCov_9fa48("8632");
                    value = JSON.parse(text);
                  }
                } catch {
                  if (stryMutAct_9fa48("8633")) {
                    {}
                  } else {
                    stryCov_9fa48("8633");
                    value = undefined;
                  }
                }
              }
            }
            if (stryMutAct_9fa48("8636") ? false : stryMutAct_9fa48("8635") ? true : stryMutAct_9fa48("8634") ? response.ok : (stryCov_9fa48("8634", "8635", "8636"), !response.ok)) {
              if (stryMutAct_9fa48("8637")) {
                {}
              } else {
                stryCov_9fa48("8637");
                const code = (stryMutAct_9fa48("8640") ? response.status !== 401 : stryMutAct_9fa48("8639") ? false : stryMutAct_9fa48("8638") ? true : (stryCov_9fa48("8638", "8639", "8640"), response.status === 401)) ? stryMutAct_9fa48("8641") ? "" : (stryCov_9fa48("8641"), 'authentication_required') : (stryMutAct_9fa48("8644") ? object(value) || object(value.error) : stryMutAct_9fa48("8643") ? false : stryMutAct_9fa48("8642") ? true : (stryCov_9fa48("8642", "8643", "8644"), object(value) && object(value.error))) ? value.error.code : undefined;
                const known = serverErrors.find(stryMutAct_9fa48("8645") ? () => undefined : (stryCov_9fa48("8645"), ([candidate]) => stryMutAct_9fa48("8648") ? candidate !== code : stryMutAct_9fa48("8647") ? false : stryMutAct_9fa48("8646") ? true : (stryCov_9fa48("8646", "8647", "8648"), candidate === code)));
                throw new CommunityClientError(stryMutAct_9fa48("8650") ? known?.[0] && 'storage_unavailable' : (stryCov_9fa48("8650"), (stryMutAct_9fa48("8651") ? known[0] : (stryCov_9fa48("8651"), known?.[0])) ?? (stryMutAct_9fa48("8652") ? "" : (stryCov_9fa48("8652"), 'storage_unavailable'))), stryMutAct_9fa48("8653") ? known?.[1] && 'Your account could not be reached. Your device draft is safe. Try again.' : (stryCov_9fa48("8653"), (stryMutAct_9fa48("8654") ? known[1] : (stryCov_9fa48("8654"), known?.[1])) ?? (stryMutAct_9fa48("8655") ? "" : (stryCov_9fa48("8655"), 'Your account could not be reached. Your device draft is safe. Try again.'))), response.status);
              }
            }
            try {
              if (stryMutAct_9fa48("8656")) {
                {}
              } else {
                stryCov_9fa48("8656");
                return parse(value);
              }
            } catch {
              if (stryMutAct_9fa48("8657")) {
                {}
              } else {
                stryCov_9fa48("8657");
                throw unreadable();
              }
            }
          }
        } catch (error) {
          if (stryMutAct_9fa48("8658")) {
            {}
          } else {
            stryCov_9fa48("8658");
            stryMutAct_9fa48("8659") ? options.signal.throwIfAborted() : (stryCov_9fa48("8659"), options.signal?.throwIfAborted());
            if (stryMutAct_9fa48("8661") ? false : stryMutAct_9fa48("8660") ? true : (stryCov_9fa48("8660", "8661"), timeout.signal.aborted)) throw new CommunityClientError(stryMutAct_9fa48("8663") ? "" : (stryCov_9fa48("8663"), 'timeout'), stryMutAct_9fa48("8664") ? "" : (stryCov_9fa48("8664"), 'Your account took too long to respond. Your device draft is safe. Try again.'));
            if (stryMutAct_9fa48("8666") ? false : stryMutAct_9fa48("8665") ? true : (stryCov_9fa48("8665", "8666"), error instanceof CommunityClientError)) throw error;
            throw new CommunityClientError(stryMutAct_9fa48("8668") ? "" : (stryCov_9fa48("8668"), 'network_error'), stryMutAct_9fa48("8669") ? "" : (stryCov_9fa48("8669"), 'Your account could not be reached. Your device draft is safe. Try again.'));
          }
        } finally {
          if (stryMutAct_9fa48("8670")) {
            {}
          } else {
            stryCov_9fa48("8670");
            if (stryMutAct_9fa48("8671")) {
              ;
            } else {
              stryCov_9fa48("8671");
              clearTimeout(timer);
            }
          }
        }
      }
    }
    return stryMutAct_9fa48("8672") ? {} : (stryCov_9fa48("8672"), {
      listOwnedPublications(before: PublicationCursor | null = null, options: CommunityRequestOptions = {}) {
        if (stryMutAct_9fa48("8673")) {
          {}
        } else {
          stryCov_9fa48("8673");
          const validated = (stryMutAct_9fa48("8676") ? before !== null : stryMutAct_9fa48("8675") ? false : stryMutAct_9fa48("8674") ? true : (stryCov_9fa48("8674", "8675", "8676"), before === null)) ? null : input(stryMutAct_9fa48("8677") ? () => undefined : (stryCov_9fa48("8677"), () => publicationCursor(before)));
          const query = validated ? (stryMutAct_9fa48("8678") ? "" : (stryCov_9fa48("8678"), '?')) + new URLSearchParams(stryMutAct_9fa48("8679") ? {} : (stryCov_9fa48("8679"), {
            before: validated.publishedAt,
            id: validated.id
          })) : stryMutAct_9fa48("8680") ? "Stryker was here!" : (stryCov_9fa48("8680"), '');
          return send((stryMutAct_9fa48("8681") ? "" : (stryCov_9fa48("8681"), '/api/community/publications')) + query, stryMutAct_9fa48("8682") ? "" : (stryCov_9fa48("8682"), 'GET'), value => {
            if (stryMutAct_9fa48("8683")) {
              {}
            } else {
              stryCov_9fa48("8683");
              const page = parseOwnedPublicationPage(value);
              if (stryMutAct_9fa48("8686") ? validated && page.items[0] || !olderPublication(page.items[0], validated) : stryMutAct_9fa48("8685") ? false : stryMutAct_9fa48("8684") ? true : (stryCov_9fa48("8684", "8685", "8686"), (stryMutAct_9fa48("8688") ? validated || page.items[0] : stryMutAct_9fa48("8687") ? true : (stryCov_9fa48("8687", "8688"), validated && page.items[0])) && (stryMutAct_9fa48("8689") ? olderPublication(page.items[0], validated) : (stryCov_9fa48("8689"), !olderPublication(page.items[0], validated))))) throw unreadable();
              return page;
            }
          }, options);
        }
      },
      publishBuild(request: PublicationRequest, options: CommunityRequestOptions = {}) {
        if (stryMutAct_9fa48("8690")) {
          {}
        } else {
          stryCov_9fa48("8690");
          const validated = input(stryMutAct_9fa48("8691") ? () => undefined : (stryCov_9fa48("8691"), () => parsePublicationRequest(request)));
          return send(stryMutAct_9fa48("8692") ? "" : (stryCov_9fa48("8692"), '/api/community/publications'), stryMutAct_9fa48("8693") ? "" : (stryCov_9fa48("8693"), 'POST'), stryMutAct_9fa48("8694") ? () => undefined : (stryCov_9fa48("8694"), value => publicationReceipt(value, validated)), options, validated);
        }
      },
      withdrawPublication(id: string, options: CommunityRequestOptions = {}) {
        if (stryMutAct_9fa48("8695")) {
          {}
        } else {
          stryCov_9fa48("8695");
          if (stryMutAct_9fa48("8698") ? typeof id !== 'string' && !/^[a-zA-Z0-9_-]{16,100}$/.test(id) : stryMutAct_9fa48("8697") ? false : stryMutAct_9fa48("8696") ? true : (stryCov_9fa48("8696", "8697", "8698"), (stryMutAct_9fa48("8700") ? typeof id === 'string' : stryMutAct_9fa48("8699") ? false : (stryCov_9fa48("8699", "8700"), typeof id !== (stryMutAct_9fa48("8701") ? "" : (stryCov_9fa48("8701"), 'string')))) || (stryMutAct_9fa48("8702") ? /^[a-zA-Z0-9_-]{16,100}$/.test(id) : (stryCov_9fa48("8702"), !(stryMutAct_9fa48("8706") ? /^[^a-zA-Z0-9_-]{16,100}$/ : stryMutAct_9fa48("8705") ? /^[a-zA-Z0-9_-]$/ : stryMutAct_9fa48("8704") ? /^[a-zA-Z0-9_-]{16,100}/ : stryMutAct_9fa48("8703") ? /[a-zA-Z0-9_-]{16,100}$/ : (stryCov_9fa48("8703", "8704", "8705", "8706"), /^[a-zA-Z0-9_-]{16,100}$/)).test(id))))) throw new CommunityClientError(stryMutAct_9fa48("8708") ? "" : (stryCov_9fa48("8708"), 'invalid_request'), stryMutAct_9fa48("8709") ? "" : (stryCov_9fa48("8709"), 'This publication identifier is invalid.'), 400);
          return send((stryMutAct_9fa48("8710") ? "" : (stryCov_9fa48("8710"), '/api/community/publications/')) + encodeURIComponent(id), stryMutAct_9fa48("8711") ? "" : (stryCov_9fa48("8711"), 'DELETE'), value => {
            if (stryMutAct_9fa48("8712")) {
              {}
            } else {
              stryCov_9fa48("8712");
              const receipt = publicationWithdrawal(value);
              if (stryMutAct_9fa48("8715") ? receipt.id === id : stryMutAct_9fa48("8714") ? false : stryMutAct_9fa48("8713") ? true : (stryCov_9fa48("8713", "8714", "8715"), receipt.id !== id)) throw unreadable();
              return receipt;
            }
          }, options, {});
        }
      },
      listFavorites(before: FavoriteCursor | null = null, options: CommunityRequestOptions = {}) {
        if (stryMutAct_9fa48("8716")) {
          {}
        } else {
          stryCov_9fa48("8716");
          const validated = (stryMutAct_9fa48("8719") ? before !== null : stryMutAct_9fa48("8718") ? false : stryMutAct_9fa48("8717") ? true : (stryCov_9fa48("8717", "8718", "8719"), before === null)) ? null : input(stryMutAct_9fa48("8720") ? () => undefined : (stryCov_9fa48("8720"), () => favoriteCursor(before)));
          const query = validated ? (stryMutAct_9fa48("8721") ? "" : (stryCov_9fa48("8721"), '?')) + new URLSearchParams(stryMutAct_9fa48("8722") ? {} : (stryCov_9fa48("8722"), {
            before: validated.createdAt,
            id: validated.publicationId
          })) : stryMutAct_9fa48("8723") ? "Stryker was here!" : (stryCov_9fa48("8723"), '');
          return send((stryMutAct_9fa48("8724") ? "" : (stryCov_9fa48("8724"), '/api/community/favorites')) + query, stryMutAct_9fa48("8725") ? "" : (stryCov_9fa48("8725"), 'GET'), value => {
            if (stryMutAct_9fa48("8726")) {
              {}
            } else {
              stryCov_9fa48("8726");
              const page = parseFavoritePage(value);
              if (stryMutAct_9fa48("8729") ? validated && page.items[0] || !olderFavorite(page.items[0], validated) : stryMutAct_9fa48("8728") ? false : stryMutAct_9fa48("8727") ? true : (stryCov_9fa48("8727", "8728", "8729"), (stryMutAct_9fa48("8731") ? validated || page.items[0] : stryMutAct_9fa48("8730") ? true : (stryCov_9fa48("8730", "8731"), validated && page.items[0])) && (stryMutAct_9fa48("8732") ? olderFavorite(page.items[0], validated) : (stryCov_9fa48("8732"), !olderFavorite(page.items[0], validated))))) throw unreadable();
              return page;
            }
          }, options);
        }
      },
      setFavorite(publicationId: string, favorite: boolean, options: CommunityRequestOptions = {}) {
        if (stryMutAct_9fa48("8733")) {
          {}
        } else {
          stryCov_9fa48("8733");
          if (stryMutAct_9fa48("8736") ? false : stryMutAct_9fa48("8735") ? true : stryMutAct_9fa48("8734") ? /^[a-zA-Z0-9_-]{16,100}$/.test(publicationId) : (stryCov_9fa48("8734", "8735", "8736"), !(stryMutAct_9fa48("8740") ? /^[^a-zA-Z0-9_-]{16,100}$/ : stryMutAct_9fa48("8739") ? /^[a-zA-Z0-9_-]$/ : stryMutAct_9fa48("8738") ? /^[a-zA-Z0-9_-]{16,100}/ : stryMutAct_9fa48("8737") ? /[a-zA-Z0-9_-]{16,100}$/ : (stryCov_9fa48("8737", "8738", "8739", "8740"), /^[a-zA-Z0-9_-]{16,100}$/)).test(publicationId))) throw new CommunityClientError(stryMutAct_9fa48("8742") ? "" : (stryCov_9fa48("8742"), 'invalid_request'), stryMutAct_9fa48("8743") ? "" : (stryCov_9fa48("8743"), 'This published-build identifier is invalid.'), 400);
          return send((stryMutAct_9fa48("8744") ? "" : (stryCov_9fa48("8744"), '/api/community/favorites/')) + encodeURIComponent(publicationId), favorite ? stryMutAct_9fa48("8745") ? "" : (stryCov_9fa48("8745"), 'PUT') : stryMutAct_9fa48("8746") ? "" : (stryCov_9fa48("8746"), 'DELETE'), value => {
            if (stryMutAct_9fa48("8747")) {
              {}
            } else {
              stryCov_9fa48("8747");
              if (stryMutAct_9fa48("8749") ? false : stryMutAct_9fa48("8748") ? true : (stryCov_9fa48("8748", "8749"), favorite)) {
                if (stryMutAct_9fa48("8750")) {
                  {}
                } else {
                  stryCov_9fa48("8750");
                  const receipt = favoriteCursor(value);
                  if (stryMutAct_9fa48("8753") ? receipt.publicationId === publicationId : stryMutAct_9fa48("8752") ? false : stryMutAct_9fa48("8751") ? true : (stryCov_9fa48("8751", "8752", "8753"), receipt.publicationId !== publicationId)) throw unreadable();
                }
              } else if (stryMutAct_9fa48("8756") ? (!object(value) || value.publicationId !== publicationId) && value.removed !== true : stryMutAct_9fa48("8755") ? false : stryMutAct_9fa48("8754") ? true : (stryCov_9fa48("8754", "8755", "8756"), (stryMutAct_9fa48("8758") ? !object(value) && value.publicationId !== publicationId : stryMutAct_9fa48("8757") ? false : (stryCov_9fa48("8757", "8758"), (stryMutAct_9fa48("8759") ? object(value) : (stryCov_9fa48("8759"), !object(value))) || (stryMutAct_9fa48("8761") ? value.publicationId === publicationId : stryMutAct_9fa48("8760") ? false : (stryCov_9fa48("8760", "8761"), value.publicationId !== publicationId)))) || (stryMutAct_9fa48("8763") ? value.removed === true : stryMutAct_9fa48("8762") ? false : (stryCov_9fa48("8762", "8763"), value.removed !== (stryMutAct_9fa48("8764") ? false : (stryCov_9fa48("8764"), true)))))) throw unreadable();
              return stryMutAct_9fa48("8765") ? {} : (stryCov_9fa48("8765"), {
                publicationId,
                favorite
              });
            }
          }, options, {});
        }
      },
      readProfile(options: CommunityRequestOptions = {}) {
        if (stryMutAct_9fa48("8766")) {
          {}
        } else {
          stryCov_9fa48("8766");
          return send(stryMutAct_9fa48("8767") ? "" : (stryCov_9fa48("8767"), '/api/community/profile'), stryMutAct_9fa48("8768") ? "" : (stryCov_9fa48("8768"), 'GET'), profileResponse, options);
        }
      },
      saveProfile(profile: CommunityProfile, options: CommunityRequestOptions = {}) {
        if (stryMutAct_9fa48("8769")) {
          {}
        } else {
          stryCov_9fa48("8769");
          return send(stryMutAct_9fa48("8770") ? "" : (stryCov_9fa48("8770"), '/api/community/profile'), stryMutAct_9fa48("8771") ? "" : (stryCov_9fa48("8771"), 'PATCH'), value => {
            if (stryMutAct_9fa48("8772")) {
              {}
            } else {
              stryCov_9fa48("8772");
              const saved = profileResponse(value);
              if (stryMutAct_9fa48("8775") ? false : stryMutAct_9fa48("8774") ? true : stryMutAct_9fa48("8773") ? saved : (stryCov_9fa48("8773", "8774", "8775"), !saved)) throw unreadable();
              return saved;
            }
          }, options, input(stryMutAct_9fa48("8776") ? () => undefined : (stryCov_9fa48("8776"), () => parseCommunityProfile(profile))));
        }
      },
      listBuilds(before: SavedBuildCursor | null = null, options: CommunityRequestOptions = {}) {
        if (stryMutAct_9fa48("8777")) {
          {}
        } else {
          stryCov_9fa48("8777");
          const validated = (stryMutAct_9fa48("8780") ? before !== null : stryMutAct_9fa48("8779") ? false : stryMutAct_9fa48("8778") ? true : (stryCov_9fa48("8778", "8779", "8780"), before === null)) ? null : input(stryMutAct_9fa48("8781") ? () => undefined : (stryCov_9fa48("8781"), () => cursor(before)));
          const query = validated ? (stryMutAct_9fa48("8782") ? "" : (stryCov_9fa48("8782"), '?')) + new URLSearchParams(stryMutAct_9fa48("8783") ? {} : (stryCov_9fa48("8783"), {
            before: validated.createdAt,
            id: validated.id
          })) : stryMutAct_9fa48("8784") ? "Stryker was here!" : (stryCov_9fa48("8784"), '');
          return send((stryMutAct_9fa48("8785") ? "" : (stryCov_9fa48("8785"), '/api/community/builds')) + query, stryMutAct_9fa48("8786") ? "" : (stryCov_9fa48("8786"), 'GET'), value => {
            if (stryMutAct_9fa48("8787")) {
              {}
            } else {
              stryCov_9fa48("8787");
              const page = parseSavedBuildPage(value);
              if (stryMutAct_9fa48("8790") ? validated && page.items[0] || !older(page.items[0], validated) : stryMutAct_9fa48("8789") ? false : stryMutAct_9fa48("8788") ? true : (stryCov_9fa48("8788", "8789", "8790"), (stryMutAct_9fa48("8792") ? validated || page.items[0] : stryMutAct_9fa48("8791") ? true : (stryCov_9fa48("8791", "8792"), validated && page.items[0])) && (stryMutAct_9fa48("8793") ? older(page.items[0], validated) : (stryCov_9fa48("8793"), !older(page.items[0], validated))))) throw unreadable();
              return page;
            }
          }, options);
        }
      },
      saveBuild(request: SaveBuildRequest, options: CommunityRequestOptions = {}) {
        if (stryMutAct_9fa48("8794")) {
          {}
        } else {
          stryCov_9fa48("8794");
          return send(stryMutAct_9fa48("8795") ? "" : (stryCov_9fa48("8795"), '/api/community/builds'), stryMutAct_9fa48("8796") ? "" : (stryCov_9fa48("8796"), 'POST'), parseSavedBuild, options, input(stryMutAct_9fa48("8797") ? () => undefined : (stryCov_9fa48("8797"), () => parseSaveBuildRequest(request))));
        }
      },
      readBuild(id: string, options: CommunityRequestOptions = {}) {
        if (stryMutAct_9fa48("8798")) {
          {}
        } else {
          stryCov_9fa48("8798");
          if (stryMutAct_9fa48("8801") ? false : stryMutAct_9fa48("8800") ? true : stryMutAct_9fa48("8799") ? /^[a-zA-Z0-9_-]{16,100}$/.test(id) : (stryCov_9fa48("8799", "8800", "8801"), !(stryMutAct_9fa48("8805") ? /^[^a-zA-Z0-9_-]{16,100}$/ : stryMutAct_9fa48("8804") ? /^[a-zA-Z0-9_-]$/ : stryMutAct_9fa48("8803") ? /^[a-zA-Z0-9_-]{16,100}/ : stryMutAct_9fa48("8802") ? /[a-zA-Z0-9_-]{16,100}$/ : (stryCov_9fa48("8802", "8803", "8804", "8805"), /^[a-zA-Z0-9_-]{16,100}$/)).test(id))) throw new CommunityClientError(stryMutAct_9fa48("8807") ? "" : (stryCov_9fa48("8807"), 'invalid_request'), stryMutAct_9fa48("8808") ? "" : (stryCov_9fa48("8808"), 'This saved-build identifier is invalid.'), 400);
          return send((stryMutAct_9fa48("8809") ? "" : (stryCov_9fa48("8809"), '/api/community/builds/')) + encodeURIComponent(id), stryMutAct_9fa48("8810") ? "" : (stryCov_9fa48("8810"), 'GET'), value => {
            if (stryMutAct_9fa48("8811")) {
              {}
            } else {
              stryCov_9fa48("8811");
              const saved = parseSavedBuild(value);
              if (stryMutAct_9fa48("8814") ? saved.id === id : stryMutAct_9fa48("8813") ? false : stryMutAct_9fa48("8812") ? true : (stryCov_9fa48("8812", "8813", "8814"), saved.id !== id)) throw unreadable();
              return saved;
            }
          }, options);
        }
      }
    });
  }
}
export type CommunityClient = ReturnType<typeof createCommunityClient>;
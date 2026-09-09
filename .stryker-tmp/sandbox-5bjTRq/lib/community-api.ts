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
import { listOwnedPublications, publishBuild, withdrawPublication } from '../db/publications.ts';
import { parsePublicationRequest } from './publication.ts';
import { addFavorite, listFavorites, removeFavorite } from '../db/favorites.ts';
import { listBuilds, readBuild, readProfile, saveBuild, saveProfile } from '../db/community.ts';
import { CommunityError, communityErrorResponse, communityRequest, communityResponse, parseCommunityProfile, parseSaveBuildRequest } from './community.ts';
export type CommunityIdentityResolver = (request: Request) => Promise<{
  subject: string;
} | null>;
export function createCommunityApi({
  db,
  resolveIdentity
}: {
  db: Parameters<typeof readProfile>[0];
  // The caller verifies identity; request fields are never an identity source here.
  resolveIdentity: CommunityIdentityResolver;
}) {
  if (stryMutAct_9fa48("7959")) {
    {}
  } else {
    stryCov_9fa48("7959");
    async function authenticated(request: Request, action: (subject: string) => Promise<Response>) {
      if (stryMutAct_9fa48("7960")) {
        {}
      } else {
        stryCov_9fa48("7960");
        try {
          if (stryMutAct_9fa48("7961")) {
            {}
          } else {
            stryCov_9fa48("7961");
            const identity = await resolveIdentity(request);
            if (stryMutAct_9fa48("7964") ? false : stryMutAct_9fa48("7963") ? true : stryMutAct_9fa48("7962") ? identity : (stryCov_9fa48("7962", "7963", "7964"), !identity)) throw new CommunityError(stryMutAct_9fa48("7966") ? "" : (stryCov_9fa48("7966"), 'authentication_required'), stryMutAct_9fa48("7967") ? "" : (stryCov_9fa48("7967"), 'Sign in to use your account. Your device draft is safe.'), 401);
            return await action(identity.subject);
          }
        } catch (error) {
          if (stryMutAct_9fa48("7968")) {
            {}
          } else {
            stryCov_9fa48("7968");
            return communityErrorResponse(error);
          }
        }
      }
    }
    return stryMutAct_9fa48("7969") ? {} : (stryCov_9fa48("7969"), {
      profile(request: Request) {
        if (stryMutAct_9fa48("7970")) {
          {}
        } else {
          stryCov_9fa48("7970");
          return authenticated(request, async subject => {
            if (stryMutAct_9fa48("7971")) {
              {}
            } else {
              stryCov_9fa48("7971");
              if (stryMutAct_9fa48("7974") ? request.method !== 'GET' : stryMutAct_9fa48("7973") ? false : stryMutAct_9fa48("7972") ? true : (stryCov_9fa48("7972", "7973", "7974"), request.method === (stryMutAct_9fa48("7975") ? "" : (stryCov_9fa48("7975"), 'GET')))) return communityResponse(stryMutAct_9fa48("7976") ? {} : (stryCov_9fa48("7976"), {
                profile: await readProfile(db, subject)
              }));
              if (stryMutAct_9fa48("7979") ? request.method !== 'PATCH' : stryMutAct_9fa48("7978") ? false : stryMutAct_9fa48("7977") ? true : (stryCov_9fa48("7977", "7978", "7979"), request.method === (stryMutAct_9fa48("7980") ? "" : (stryCov_9fa48("7980"), 'PATCH')))) {
                if (stryMutAct_9fa48("7981")) {
                  {}
                } else {
                  stryCov_9fa48("7981");
                  const profile = parseCommunityProfile(await communityRequest(request));
                  return communityResponse(stryMutAct_9fa48("7982") ? {} : (stryCov_9fa48("7982"), {
                    profile: await saveProfile(db, subject, profile)
                  }));
                }
              }
              return methodNotAllowed(stryMutAct_9fa48("7983") ? "" : (stryCov_9fa48("7983"), 'GET, PATCH'));
            }
          });
        }
      },
      builds(request: Request) {
        if (stryMutAct_9fa48("7984")) {
          {}
        } else {
          stryCov_9fa48("7984");
          return authenticated(request, async subject => {
            if (stryMutAct_9fa48("7985")) {
              {}
            } else {
              stryCov_9fa48("7985");
              if (stryMutAct_9fa48("7988") ? request.method !== 'GET' : stryMutAct_9fa48("7987") ? false : stryMutAct_9fa48("7986") ? true : (stryCov_9fa48("7986", "7987", "7988"), request.method === (stryMutAct_9fa48("7989") ? "" : (stryCov_9fa48("7989"), 'GET')))) {
                if (stryMutAct_9fa48("7990")) {
                  {}
                } else {
                  stryCov_9fa48("7990");
                  const params = new URL(request.url).searchParams;
                  const createdAt = params.get(stryMutAct_9fa48("7991") ? "" : (stryCov_9fa48("7991"), 'before'));
                  const id = params.get(stryMutAct_9fa48("7992") ? "" : (stryCov_9fa48("7992"), 'id'));
                  if (stryMutAct_9fa48("7995") ? createdAt === null === (id === null) : stryMutAct_9fa48("7994") ? false : stryMutAct_9fa48("7993") ? true : (stryCov_9fa48("7993", "7994", "7995"), (stryMutAct_9fa48("7998") ? createdAt !== null : stryMutAct_9fa48("7997") ? false : stryMutAct_9fa48("7996") ? true : (stryCov_9fa48("7996", "7997", "7998"), createdAt === null)) !== (stryMutAct_9fa48("8001") ? id !== null : stryMutAct_9fa48("8000") ? false : stryMutAct_9fa48("7999") ? true : (stryCov_9fa48("7999", "8000", "8001"), id === null)))) throw new CommunityError(stryMutAct_9fa48("8003") ? "" : (stryCov_9fa48("8003"), 'invalid_request'), stryMutAct_9fa48("8004") ? "" : (stryCov_9fa48("8004"), 'This saved-build page cursor is invalid.'), 400);
                  return communityResponse(await listBuilds(db, subject, (stryMutAct_9fa48("8007") ? createdAt !== null || id !== null : stryMutAct_9fa48("8006") ? false : stryMutAct_9fa48("8005") ? true : (stryCov_9fa48("8005", "8006", "8007"), (stryMutAct_9fa48("8009") ? createdAt === null : stryMutAct_9fa48("8008") ? true : (stryCov_9fa48("8008", "8009"), createdAt !== null)) && (stryMutAct_9fa48("8011") ? id === null : stryMutAct_9fa48("8010") ? true : (stryCov_9fa48("8010", "8011"), id !== null)))) ? stryMutAct_9fa48("8012") ? {} : (stryCov_9fa48("8012"), {
                    createdAt,
                    id
                  }) : undefined));
                }
              }
              if (stryMutAct_9fa48("8015") ? request.method !== 'POST' : stryMutAct_9fa48("8014") ? false : stryMutAct_9fa48("8013") ? true : (stryCov_9fa48("8013", "8014", "8015"), request.method === (stryMutAct_9fa48("8016") ? "" : (stryCov_9fa48("8016"), 'POST')))) {
                if (stryMutAct_9fa48("8017")) {
                  {}
                } else {
                  stryCov_9fa48("8017");
                  const input = parseSaveBuildRequest(await communityRequest(request));
                  return communityResponse(await saveBuild(db, subject, input));
                }
              }
              return methodNotAllowed(stryMutAct_9fa48("8018") ? "" : (stryCov_9fa48("8018"), 'GET, POST'));
            }
          });
        }
      },
      publications(request: Request) {
        if (stryMutAct_9fa48("8019")) {
          {}
        } else {
          stryCov_9fa48("8019");
          return authenticated(request, async subject => {
            if (stryMutAct_9fa48("8020")) {
              {}
            } else {
              stryCov_9fa48("8020");
              if (stryMutAct_9fa48("8023") ? request.method !== 'POST' : stryMutAct_9fa48("8022") ? false : stryMutAct_9fa48("8021") ? true : (stryCov_9fa48("8021", "8022", "8023"), request.method === (stryMutAct_9fa48("8024") ? "" : (stryCov_9fa48("8024"), 'POST')))) {
                if (stryMutAct_9fa48("8025")) {
                  {}
                } else {
                  stryCov_9fa48("8025");
                  const input = parsePublicationRequest(await communityRequest(request));
                  const publication = await publishBuild(db, subject, input);
                  return communityResponse(stryMutAct_9fa48("8026") ? {} : (stryCov_9fa48("8026"), {
                    ...publication,
                    operationId: input.operationId,
                    buildId: input.buildId
                  }));
                }
              }
              if (stryMutAct_9fa48("8029") ? request.method === 'GET' : stryMutAct_9fa48("8028") ? false : stryMutAct_9fa48("8027") ? true : (stryCov_9fa48("8027", "8028", "8029"), request.method !== (stryMutAct_9fa48("8030") ? "" : (stryCov_9fa48("8030"), 'GET')))) return methodNotAllowed(stryMutAct_9fa48("8031") ? "" : (stryCov_9fa48("8031"), 'GET, POST'));
              const params = new URL(request.url).searchParams;
              const publishedAt = params.get(stryMutAct_9fa48("8032") ? "" : (stryCov_9fa48("8032"), 'before'));
              const id = params.get(stryMutAct_9fa48("8033") ? "" : (stryCov_9fa48("8033"), 'id'));
              if (stryMutAct_9fa48("8036") ? publishedAt === null === (id === null) : stryMutAct_9fa48("8035") ? false : stryMutAct_9fa48("8034") ? true : (stryCov_9fa48("8034", "8035", "8036"), (stryMutAct_9fa48("8039") ? publishedAt !== null : stryMutAct_9fa48("8038") ? false : stryMutAct_9fa48("8037") ? true : (stryCov_9fa48("8037", "8038", "8039"), publishedAt === null)) !== (stryMutAct_9fa48("8042") ? id !== null : stryMutAct_9fa48("8041") ? false : stryMutAct_9fa48("8040") ? true : (stryCov_9fa48("8040", "8041", "8042"), id === null)))) throw new CommunityError(stryMutAct_9fa48("8044") ? "" : (stryCov_9fa48("8044"), 'invalid_request'), stryMutAct_9fa48("8045") ? "" : (stryCov_9fa48("8045"), 'This publication page cursor is invalid.'), 400);
              return communityResponse(await listOwnedPublications(db, subject, (stryMutAct_9fa48("8048") ? publishedAt !== null || id !== null : stryMutAct_9fa48("8047") ? false : stryMutAct_9fa48("8046") ? true : (stryCov_9fa48("8046", "8047", "8048"), (stryMutAct_9fa48("8050") ? publishedAt === null : stryMutAct_9fa48("8049") ? true : (stryCov_9fa48("8049", "8050"), publishedAt !== null)) && (stryMutAct_9fa48("8052") ? id === null : stryMutAct_9fa48("8051") ? true : (stryCov_9fa48("8051", "8052"), id !== null)))) ? stryMutAct_9fa48("8053") ? {} : (stryCov_9fa48("8053"), {
                publishedAt,
                id
              }) : undefined));
            }
          });
        }
      },
      publication(request: Request, id: string) {
        if (stryMutAct_9fa48("8054")) {
          {}
        } else {
          stryCov_9fa48("8054");
          return authenticated(request, async subject => {
            if (stryMutAct_9fa48("8055")) {
              {}
            } else {
              stryCov_9fa48("8055");
              if (stryMutAct_9fa48("8058") ? request.method === 'DELETE' : stryMutAct_9fa48("8057") ? false : stryMutAct_9fa48("8056") ? true : (stryCov_9fa48("8056", "8057", "8058"), request.method !== (stryMutAct_9fa48("8059") ? "" : (stryCov_9fa48("8059"), 'DELETE')))) return methodNotAllowed(stryMutAct_9fa48("8060") ? "" : (stryCov_9fa48("8060"), 'DELETE'));
              if (stryMutAct_9fa48("8063") ? false : stryMutAct_9fa48("8062") ? true : stryMutAct_9fa48("8061") ? /^[a-zA-Z0-9_-]{16,100}$/.test(id) : (stryCov_9fa48("8061", "8062", "8063"), !(stryMutAct_9fa48("8067") ? /^[^a-zA-Z0-9_-]{16,100}$/ : stryMutAct_9fa48("8066") ? /^[a-zA-Z0-9_-]$/ : stryMutAct_9fa48("8065") ? /^[a-zA-Z0-9_-]{16,100}/ : stryMutAct_9fa48("8064") ? /[a-zA-Z0-9_-]{16,100}$/ : (stryCov_9fa48("8064", "8065", "8066", "8067"), /^[a-zA-Z0-9_-]{16,100}$/)).test(id))) throw new CommunityError(stryMutAct_9fa48("8069") ? "" : (stryCov_9fa48("8069"), 'invalid_request'), stryMutAct_9fa48("8070") ? "" : (stryCov_9fa48("8070"), 'This publication identifier is invalid.'), 400);
              await communityRequest(request);
              return communityResponse(await withdrawPublication(db, subject, id));
            }
          });
        }
      },
      favorites(request: Request) {
        if (stryMutAct_9fa48("8071")) {
          {}
        } else {
          stryCov_9fa48("8071");
          return authenticated(request, async subject => {
            if (stryMutAct_9fa48("8072")) {
              {}
            } else {
              stryCov_9fa48("8072");
              if (stryMutAct_9fa48("8075") ? request.method === 'GET' : stryMutAct_9fa48("8074") ? false : stryMutAct_9fa48("8073") ? true : (stryCov_9fa48("8073", "8074", "8075"), request.method !== (stryMutAct_9fa48("8076") ? "" : (stryCov_9fa48("8076"), 'GET')))) return methodNotAllowed(stryMutAct_9fa48("8077") ? "" : (stryCov_9fa48("8077"), 'GET'));
              const params = new URL(request.url).searchParams;
              const createdAt = params.get(stryMutAct_9fa48("8078") ? "" : (stryCov_9fa48("8078"), 'before'));
              const publicationId = params.get(stryMutAct_9fa48("8079") ? "" : (stryCov_9fa48("8079"), 'id'));
              if (stryMutAct_9fa48("8082") ? createdAt === null === (publicationId === null) : stryMutAct_9fa48("8081") ? false : stryMutAct_9fa48("8080") ? true : (stryCov_9fa48("8080", "8081", "8082"), (stryMutAct_9fa48("8085") ? createdAt !== null : stryMutAct_9fa48("8084") ? false : stryMutAct_9fa48("8083") ? true : (stryCov_9fa48("8083", "8084", "8085"), createdAt === null)) !== (stryMutAct_9fa48("8088") ? publicationId !== null : stryMutAct_9fa48("8087") ? false : stryMutAct_9fa48("8086") ? true : (stryCov_9fa48("8086", "8087", "8088"), publicationId === null)))) throw new CommunityError(stryMutAct_9fa48("8090") ? "" : (stryCov_9fa48("8090"), 'invalid_request'), stryMutAct_9fa48("8091") ? "" : (stryCov_9fa48("8091"), 'This favorites page cursor is invalid.'), 400);
              return communityResponse(await listFavorites(db, subject, (stryMutAct_9fa48("8094") ? createdAt !== null || publicationId !== null : stryMutAct_9fa48("8093") ? false : stryMutAct_9fa48("8092") ? true : (stryCov_9fa48("8092", "8093", "8094"), (stryMutAct_9fa48("8096") ? createdAt === null : stryMutAct_9fa48("8095") ? true : (stryCov_9fa48("8095", "8096"), createdAt !== null)) && (stryMutAct_9fa48("8098") ? publicationId === null : stryMutAct_9fa48("8097") ? true : (stryCov_9fa48("8097", "8098"), publicationId !== null)))) ? stryMutAct_9fa48("8099") ? {} : (stryCov_9fa48("8099"), {
                createdAt,
                publicationId
              }) : undefined));
            }
          });
        }
      },
      favorite(request: Request, publicationId: string) {
        if (stryMutAct_9fa48("8100")) {
          {}
        } else {
          stryCov_9fa48("8100");
          return authenticated(request, async subject => {
            if (stryMutAct_9fa48("8101")) {
              {}
            } else {
              stryCov_9fa48("8101");
              if (stryMutAct_9fa48("8104") ? request.method !== 'PUT' || request.method !== 'DELETE' : stryMutAct_9fa48("8103") ? false : stryMutAct_9fa48("8102") ? true : (stryCov_9fa48("8102", "8103", "8104"), (stryMutAct_9fa48("8106") ? request.method === 'PUT' : stryMutAct_9fa48("8105") ? true : (stryCov_9fa48("8105", "8106"), request.method !== (stryMutAct_9fa48("8107") ? "" : (stryCov_9fa48("8107"), 'PUT')))) && (stryMutAct_9fa48("8109") ? request.method === 'DELETE' : stryMutAct_9fa48("8108") ? true : (stryCov_9fa48("8108", "8109"), request.method !== (stryMutAct_9fa48("8110") ? "" : (stryCov_9fa48("8110"), 'DELETE')))))) return methodNotAllowed(stryMutAct_9fa48("8111") ? "" : (stryCov_9fa48("8111"), 'PUT, DELETE'));
              if (stryMutAct_9fa48("8114") ? false : stryMutAct_9fa48("8113") ? true : stryMutAct_9fa48("8112") ? /^[a-zA-Z0-9_-]{16,100}$/.test(publicationId) : (stryCov_9fa48("8112", "8113", "8114"), !(stryMutAct_9fa48("8118") ? /^[^a-zA-Z0-9_-]{16,100}$/ : stryMutAct_9fa48("8117") ? /^[a-zA-Z0-9_-]$/ : stryMutAct_9fa48("8116") ? /^[a-zA-Z0-9_-]{16,100}/ : stryMutAct_9fa48("8115") ? /[a-zA-Z0-9_-]{16,100}$/ : (stryCov_9fa48("8115", "8116", "8117", "8118"), /^[a-zA-Z0-9_-]{16,100}$/)).test(publicationId))) throw new CommunityError(stryMutAct_9fa48("8120") ? "" : (stryCov_9fa48("8120"), 'invalid_request'), stryMutAct_9fa48("8121") ? "" : (stryCov_9fa48("8121"), 'This published-build identifier is invalid.'), 400);
              await communityRequest(request);
              if (stryMutAct_9fa48("8124") ? request.method !== 'PUT' : stryMutAct_9fa48("8123") ? false : stryMutAct_9fa48("8122") ? true : (stryCov_9fa48("8122", "8123", "8124"), request.method === (stryMutAct_9fa48("8125") ? "" : (stryCov_9fa48("8125"), 'PUT')))) return communityResponse(await addFavorite(db, subject, publicationId));
              await removeFavorite(db, subject, publicationId);
              return communityResponse(stryMutAct_9fa48("8126") ? {} : (stryCov_9fa48("8126"), {
                publicationId,
                removed: stryMutAct_9fa48("8127") ? false : (stryCov_9fa48("8127"), true)
              }));
            }
          });
        }
      },
      build(request: Request, id: string) {
        if (stryMutAct_9fa48("8128")) {
          {}
        } else {
          stryCov_9fa48("8128");
          return authenticated(request, async subject => {
            if (stryMutAct_9fa48("8129")) {
              {}
            } else {
              stryCov_9fa48("8129");
              if (stryMutAct_9fa48("8132") ? request.method === 'GET' : stryMutAct_9fa48("8131") ? false : stryMutAct_9fa48("8130") ? true : (stryCov_9fa48("8130", "8131", "8132"), request.method !== (stryMutAct_9fa48("8133") ? "" : (stryCov_9fa48("8133"), 'GET')))) return methodNotAllowed(stryMutAct_9fa48("8134") ? "" : (stryCov_9fa48("8134"), 'GET'));
              if (stryMutAct_9fa48("8137") ? false : stryMutAct_9fa48("8136") ? true : stryMutAct_9fa48("8135") ? /^[a-zA-Z0-9_-]{16,100}$/.test(id) : (stryCov_9fa48("8135", "8136", "8137"), !(stryMutAct_9fa48("8141") ? /^[^a-zA-Z0-9_-]{16,100}$/ : stryMutAct_9fa48("8140") ? /^[a-zA-Z0-9_-]$/ : stryMutAct_9fa48("8139") ? /^[a-zA-Z0-9_-]{16,100}/ : stryMutAct_9fa48("8138") ? /[a-zA-Z0-9_-]{16,100}$/ : (stryCov_9fa48("8138", "8139", "8140", "8141"), /^[a-zA-Z0-9_-]{16,100}$/)).test(id))) throw new CommunityError(stryMutAct_9fa48("8143") ? "" : (stryCov_9fa48("8143"), 'invalid_request'), stryMutAct_9fa48("8144") ? "" : (stryCov_9fa48("8144"), 'This saved-build identifier is invalid.'), 400);
              return communityResponse(await readBuild(db, subject, id));
            }
          });
        }
      }
    });
  }
}
function methodNotAllowed(allow: string) {
  if (stryMutAct_9fa48("8145")) {
    {}
  } else {
    stryCov_9fa48("8145");
    const response = communityResponse(stryMutAct_9fa48("8146") ? {} : (stryCov_9fa48("8146"), {
      error: stryMutAct_9fa48("8147") ? {} : (stryCov_9fa48("8147"), {
        code: stryMutAct_9fa48("8148") ? "" : (stryCov_9fa48("8148"), 'invalid_request'),
        message: stryMutAct_9fa48("8149") ? "" : (stryCov_9fa48("8149"), 'This account action is not supported.')
      })
    }), 405);
    response.headers.set(stryMutAct_9fa48("8151") ? "" : (stryCov_9fa48("8151"), 'Allow'), allow);
    return response;
  }
}
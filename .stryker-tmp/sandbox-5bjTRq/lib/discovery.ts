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
import { CommunityError } from './community.ts';
import { parseBuildThumbnail, type BuildThumbnail } from './build-thumbnail.ts';
export type DiscoveryQuery = {
  query: string;
  kind: 'all' | 'build' | 'drop';
  cursor: {
    publishedAt: string;
    id: string;
  } | null;
};
export function parseDiscoveryQuery(params: URLSearchParams): DiscoveryQuery {
  if (stryMutAct_9fa48("10267")) {
    {}
  } else {
    stryCov_9fa48("10267");
    const query = stryMutAct_9fa48("10268") ? params.get('q') ?? '' : (stryCov_9fa48("10268"), (stryMutAct_9fa48("10269") ? params.get('q') && '' : (stryCov_9fa48("10269"), params.get(stryMutAct_9fa48("10270") ? "" : (stryCov_9fa48("10270"), 'q')) ?? (stryMutAct_9fa48("10271") ? "Stryker was here!" : (stryCov_9fa48("10271"), '')))).trim());
    const kind = stryMutAct_9fa48("10272") ? params.get('kind') && 'all' : (stryCov_9fa48("10272"), params.get(stryMutAct_9fa48("10273") ? "" : (stryCov_9fa48("10273"), 'kind')) ?? (stryMutAct_9fa48("10274") ? "" : (stryCov_9fa48("10274"), 'all')));
    const publishedAt = params.get(stryMutAct_9fa48("10275") ? "" : (stryCov_9fa48("10275"), 'before'));
    const id = params.get(stryMutAct_9fa48("10276") ? "" : (stryCov_9fa48("10276"), 'id'));
    if (stryMutAct_9fa48("10279") ? (query.length > 100 || /\p{Cc}/u.test(query)) && !['all', 'build', 'drop'].includes(kind) : stryMutAct_9fa48("10278") ? false : stryMutAct_9fa48("10277") ? true : (stryCov_9fa48("10277", "10278", "10279"), (stryMutAct_9fa48("10281") ? query.length > 100 && /\p{Cc}/u.test(query) : stryMutAct_9fa48("10280") ? false : (stryCov_9fa48("10280", "10281"), (stryMutAct_9fa48("10284") ? query.length <= 100 : stryMutAct_9fa48("10283") ? query.length >= 100 : stryMutAct_9fa48("10282") ? false : (stryCov_9fa48("10282", "10283", "10284"), query.length > 100)) || (stryMutAct_9fa48("10285") ? /\P{Cc}/u : (stryCov_9fa48("10285"), /\p{Cc}/u)).test(query))) || (stryMutAct_9fa48("10286") ? ['all', 'build', 'drop'].includes(kind) : (stryCov_9fa48("10286"), !(stryMutAct_9fa48("10287") ? [] : (stryCov_9fa48("10287"), [stryMutAct_9fa48("10288") ? "" : (stryCov_9fa48("10288"), 'all'), stryMutAct_9fa48("10289") ? "" : (stryCov_9fa48("10289"), 'build'), stryMutAct_9fa48("10290") ? "" : (stryCov_9fa48("10290"), 'drop')])).includes(kind))))) throw new CommunityError(stryMutAct_9fa48("10292") ? "" : (stryCov_9fa48("10292"), 'invalid_request'), stryMutAct_9fa48("10293") ? "" : (stryCov_9fa48("10293"), 'Use a search under 100 characters and a valid release type.'), 400);
    if (stryMutAct_9fa48("10296") ? (publishedAt === null !== (id === null) || publishedAt !== null && (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(publishedAt) || !Number.isFinite(Date.parse(publishedAt)))) && id !== null && !/^[a-zA-Z0-9_-]{16,100}$/.test(id) : stryMutAct_9fa48("10295") ? false : stryMutAct_9fa48("10294") ? true : (stryCov_9fa48("10294", "10295", "10296"), (stryMutAct_9fa48("10298") ? publishedAt === null !== (id === null) && publishedAt !== null && (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(publishedAt) || !Number.isFinite(Date.parse(publishedAt))) : stryMutAct_9fa48("10297") ? false : (stryCov_9fa48("10297", "10298"), (stryMutAct_9fa48("10300") ? publishedAt === null === (id === null) : stryMutAct_9fa48("10299") ? false : (stryCov_9fa48("10299", "10300"), (stryMutAct_9fa48("10303") ? publishedAt !== null : stryMutAct_9fa48("10302") ? false : stryMutAct_9fa48("10301") ? true : (stryCov_9fa48("10301", "10302", "10303"), publishedAt === null)) !== (stryMutAct_9fa48("10306") ? id !== null : stryMutAct_9fa48("10305") ? false : stryMutAct_9fa48("10304") ? true : (stryCov_9fa48("10304", "10305", "10306"), id === null)))) || (stryMutAct_9fa48("10308") ? publishedAt !== null || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(publishedAt) || !Number.isFinite(Date.parse(publishedAt)) : stryMutAct_9fa48("10307") ? false : (stryCov_9fa48("10307", "10308"), (stryMutAct_9fa48("10310") ? publishedAt === null : stryMutAct_9fa48("10309") ? true : (stryCov_9fa48("10309", "10310"), publishedAt !== null)) && (stryMutAct_9fa48("10312") ? !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(publishedAt) && !Number.isFinite(Date.parse(publishedAt)) : stryMutAct_9fa48("10311") ? true : (stryCov_9fa48("10311", "10312"), (stryMutAct_9fa48("10313") ? /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(publishedAt) : (stryCov_9fa48("10313"), !(stryMutAct_9fa48("10329") ? /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\D{3}Z$/ : stryMutAct_9fa48("10328") ? /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\dZ$/ : stryMutAct_9fa48("10327") ? /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\D{2}\.\d{3}Z$/ : stryMutAct_9fa48("10326") ? /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d\.\d{3}Z$/ : stryMutAct_9fa48("10325") ? /^\d{4}-\d{2}-\d{2}T\d{2}:\D{2}:\d{2}\.\d{3}Z$/ : stryMutAct_9fa48("10324") ? /^\d{4}-\d{2}-\d{2}T\d{2}:\d:\d{2}\.\d{3}Z$/ : stryMutAct_9fa48("10323") ? /^\d{4}-\d{2}-\d{2}T\D{2}:\d{2}:\d{2}\.\d{3}Z$/ : stryMutAct_9fa48("10322") ? /^\d{4}-\d{2}-\d{2}T\d:\d{2}:\d{2}\.\d{3}Z$/ : stryMutAct_9fa48("10321") ? /^\d{4}-\d{2}-\D{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/ : stryMutAct_9fa48("10320") ? /^\d{4}-\d{2}-\dT\d{2}:\d{2}:\d{2}\.\d{3}Z$/ : stryMutAct_9fa48("10319") ? /^\d{4}-\D{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/ : stryMutAct_9fa48("10318") ? /^\d{4}-\d-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/ : stryMutAct_9fa48("10317") ? /^\D{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/ : stryMutAct_9fa48("10316") ? /^\d-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/ : stryMutAct_9fa48("10315") ? /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/ : stryMutAct_9fa48("10314") ? /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/ : (stryCov_9fa48("10314", "10315", "10316", "10317", "10318", "10319", "10320", "10321", "10322", "10323", "10324", "10325", "10326", "10327", "10328", "10329"), /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)).test(publishedAt))) || (stryMutAct_9fa48("10330") ? Number.isFinite(Date.parse(publishedAt)) : (stryCov_9fa48("10330"), !Number.isFinite(Date.parse(publishedAt)))))))))) || (stryMutAct_9fa48("10332") ? id !== null || !/^[a-zA-Z0-9_-]{16,100}$/.test(id) : stryMutAct_9fa48("10331") ? false : (stryCov_9fa48("10331", "10332"), (stryMutAct_9fa48("10334") ? id === null : stryMutAct_9fa48("10333") ? true : (stryCov_9fa48("10333", "10334"), id !== null)) && (stryMutAct_9fa48("10335") ? /^[a-zA-Z0-9_-]{16,100}$/.test(id) : (stryCov_9fa48("10335"), !(stryMutAct_9fa48("10339") ? /^[^a-zA-Z0-9_-]{16,100}$/ : stryMutAct_9fa48("10338") ? /^[a-zA-Z0-9_-]$/ : stryMutAct_9fa48("10337") ? /^[a-zA-Z0-9_-]{16,100}/ : stryMutAct_9fa48("10336") ? /[a-zA-Z0-9_-]{16,100}$/ : (stryCov_9fa48("10336", "10337", "10338", "10339"), /^[a-zA-Z0-9_-]{16,100}$/)).test(id))))))) throw new CommunityError(stryMutAct_9fa48("10341") ? "" : (stryCov_9fa48("10341"), 'invalid_request'), stryMutAct_9fa48("10342") ? "" : (stryCov_9fa48("10342"), 'This discovery page cursor is invalid.'), 400);
    return stryMutAct_9fa48("10343") ? {} : (stryCov_9fa48("10343"), {
      query,
      kind: (stryMutAct_9fa48("10346") ? kind === 'build' && kind === 'drop' : stryMutAct_9fa48("10345") ? false : stryMutAct_9fa48("10344") ? true : (stryCov_9fa48("10344", "10345", "10346"), (stryMutAct_9fa48("10348") ? kind !== 'build' : stryMutAct_9fa48("10347") ? false : (stryCov_9fa48("10347", "10348"), kind === (stryMutAct_9fa48("10349") ? "" : (stryCov_9fa48("10349"), 'build')))) || (stryMutAct_9fa48("10351") ? kind !== 'drop' : stryMutAct_9fa48("10350") ? false : (stryCov_9fa48("10350", "10351"), kind === (stryMutAct_9fa48("10352") ? "" : (stryCov_9fa48("10352"), 'drop')))))) ? kind : stryMutAct_9fa48("10353") ? "" : (stryCov_9fa48("10353"), 'all'),
      cursor: (stryMutAct_9fa48("10356") ? publishedAt !== null || id !== null : stryMutAct_9fa48("10355") ? false : stryMutAct_9fa48("10354") ? true : (stryCov_9fa48("10354", "10355", "10356"), (stryMutAct_9fa48("10358") ? publishedAt === null : stryMutAct_9fa48("10357") ? true : (stryCov_9fa48("10357", "10358"), publishedAt !== null)) && (stryMutAct_9fa48("10360") ? id === null : stryMutAct_9fa48("10359") ? true : (stryCov_9fa48("10359", "10360"), id !== null)))) ? stryMutAct_9fa48("10361") ? {} : (stryCov_9fa48("10361"), {
        publishedAt,
        id
      }) : null
    });
  }
}
export type DiscoveryPage = {
  items: {
    id: string;
    title: string;
    kind: 'build' | 'drop';
    author: {
      handle: string;
      displayName: string;
    };
    publishedAt: string;
    thumbnail: BuildThumbnail | null;
  }[];
  next: DiscoveryQuery['cursor'];
};
export function parseDiscoveryPage(value: unknown): DiscoveryPage {
  if (stryMutAct_9fa48("10362")) {
    {}
  } else {
    stryCov_9fa48("10362");
    const object = (entry: unknown) => {
      if (stryMutAct_9fa48("10363")) {
        {}
      } else {
        stryCov_9fa48("10363");
        if (stryMutAct_9fa48("10366") ? (!entry || typeof entry !== 'object') && Array.isArray(entry) : stryMutAct_9fa48("10365") ? false : stryMutAct_9fa48("10364") ? true : (stryCov_9fa48("10364", "10365", "10366"), (stryMutAct_9fa48("10368") ? !entry && typeof entry !== 'object' : stryMutAct_9fa48("10367") ? false : (stryCov_9fa48("10367", "10368"), (stryMutAct_9fa48("10369") ? entry : (stryCov_9fa48("10369"), !entry)) || (stryMutAct_9fa48("10371") ? typeof entry === 'object' : stryMutAct_9fa48("10370") ? false : (stryCov_9fa48("10370", "10371"), typeof entry !== (stryMutAct_9fa48("10372") ? "" : (stryCov_9fa48("10372"), 'object')))))) || Array.isArray(entry))) throw new Error(stryMutAct_9fa48("10374") ? "" : (stryCov_9fa48("10374"), 'Published builds could not be read.'));
        const fields: Record<string, unknown> = Object.fromEntries(Object.entries(entry));
        return fields;
      }
    };
    const text = (entry: unknown, limit: number) => {
      if (stryMutAct_9fa48("10375")) {
        {}
      } else {
        stryCov_9fa48("10375");
        if (stryMutAct_9fa48("10378") ? (typeof entry !== 'string' || !entry.trim()) && entry.length > limit : stryMutAct_9fa48("10377") ? false : stryMutAct_9fa48("10376") ? true : (stryCov_9fa48("10376", "10377", "10378"), (stryMutAct_9fa48("10380") ? typeof entry !== 'string' && !entry.trim() : stryMutAct_9fa48("10379") ? false : (stryCov_9fa48("10379", "10380"), (stryMutAct_9fa48("10382") ? typeof entry === 'string' : stryMutAct_9fa48("10381") ? false : (stryCov_9fa48("10381", "10382"), typeof entry !== (stryMutAct_9fa48("10383") ? "" : (stryCov_9fa48("10383"), 'string')))) || (stryMutAct_9fa48("10384") ? entry.trim() : (stryCov_9fa48("10384"), !(stryMutAct_9fa48("10385") ? entry : (stryCov_9fa48("10385"), entry.trim())))))) || (stryMutAct_9fa48("10388") ? entry.length <= limit : stryMutAct_9fa48("10387") ? entry.length >= limit : stryMutAct_9fa48("10386") ? false : (stryCov_9fa48("10386", "10387", "10388"), entry.length > limit)))) throw new Error(stryMutAct_9fa48("10390") ? "" : (stryCov_9fa48("10390"), 'Published build details could not be read.'));
        return entry;
      }
    };
    const data = object(value);
    if (stryMutAct_9fa48("10393") ? !Array.isArray(data.items) && data.items.length > 25 : stryMutAct_9fa48("10392") ? false : stryMutAct_9fa48("10391") ? true : (stryCov_9fa48("10391", "10392", "10393"), (stryMutAct_9fa48("10394") ? Array.isArray(data.items) : (stryCov_9fa48("10394"), !Array.isArray(data.items))) || (stryMutAct_9fa48("10397") ? data.items.length <= 25 : stryMutAct_9fa48("10396") ? data.items.length >= 25 : stryMutAct_9fa48("10395") ? false : (stryCov_9fa48("10395", "10396", "10397"), data.items.length > 25)))) throw new Error(stryMutAct_9fa48("10399") ? "" : (stryCov_9fa48("10399"), 'Published builds could not be read.'));
    const items = data.items.map((entry): DiscoveryPage['items'][number] => {
      if (stryMutAct_9fa48("10400")) {
        {}
      } else {
        stryCov_9fa48("10400");
        const item = object(entry);
        const author = object(item.author);
        const id = text(item.id, 100);
        const publishedAt = text(item.publishedAt, 30);
        parseDiscoveryQuery(new URLSearchParams(stryMutAct_9fa48("10402") ? {} : (stryCov_9fa48("10402"), {
          id,
          before: publishedAt
        })));
        if (stryMutAct_9fa48("10405") ? item.kind !== 'build' || item.kind !== 'drop' : stryMutAct_9fa48("10404") ? false : stryMutAct_9fa48("10403") ? true : (stryCov_9fa48("10403", "10404", "10405"), (stryMutAct_9fa48("10407") ? item.kind === 'build' : stryMutAct_9fa48("10406") ? true : (stryCov_9fa48("10406", "10407"), item.kind !== (stryMutAct_9fa48("10408") ? "" : (stryCov_9fa48("10408"), 'build')))) && (stryMutAct_9fa48("10410") ? item.kind === 'drop' : stryMutAct_9fa48("10409") ? true : (stryCov_9fa48("10409", "10410"), item.kind !== (stryMutAct_9fa48("10411") ? "" : (stryCov_9fa48("10411"), 'drop')))))) throw new Error(stryMutAct_9fa48("10413") ? "" : (stryCov_9fa48("10413"), 'Unknown publication type.'));
        return stryMutAct_9fa48("10414") ? {} : (stryCov_9fa48("10414"), {
          id,
          publishedAt,
          thumbnail: parseBuildThumbnail(item.thumbnail),
          kind: item.kind,
          title: text(item.title, 80),
          author: stryMutAct_9fa48("10415") ? {} : (stryCov_9fa48("10415"), {
            handle: text(author.handle, 30),
            displayName: text(author.displayName, 60)
          })
        });
      }
    });
    if (stryMutAct_9fa48("10418") ? new Set(items.map(item => item.id)).size === items.length : stryMutAct_9fa48("10417") ? false : stryMutAct_9fa48("10416") ? true : (stryCov_9fa48("10416", "10417", "10418"), new Set(items.map(stryMutAct_9fa48("10419") ? () => undefined : (stryCov_9fa48("10419"), item => item.id))).size !== items.length)) throw new Error(stryMutAct_9fa48("10421") ? "" : (stryCov_9fa48("10421"), 'Repeated publication in this page.'));
    let next: DiscoveryQuery['cursor'] = null;
    if (stryMutAct_9fa48("10424") ? data.next === null : stryMutAct_9fa48("10423") ? false : stryMutAct_9fa48("10422") ? true : (stryCov_9fa48("10422", "10423", "10424"), data.next !== null)) {
      if (stryMutAct_9fa48("10425")) {
        {}
      } else {
        stryCov_9fa48("10425");
        const cursor = object(data.next);
        next = parseDiscoveryQuery(new URLSearchParams(stryMutAct_9fa48("10426") ? {} : (stryCov_9fa48("10426"), {
          id: text(cursor.id, 100),
          before: text(cursor.publishedAt, 30)
        }))).cursor;
        const last = items.at(stryMutAct_9fa48("10427") ? +1 : (stryCov_9fa48("10427"), -1));
        if (stryMutAct_9fa48("10430") ? (!last || next?.id !== last.id) && next.publishedAt !== last.publishedAt : stryMutAct_9fa48("10429") ? false : stryMutAct_9fa48("10428") ? true : (stryCov_9fa48("10428", "10429", "10430"), (stryMutAct_9fa48("10432") ? !last && next?.id !== last.id : stryMutAct_9fa48("10431") ? false : (stryCov_9fa48("10431", "10432"), (stryMutAct_9fa48("10433") ? last : (stryCov_9fa48("10433"), !last)) || (stryMutAct_9fa48("10435") ? next?.id === last.id : stryMutAct_9fa48("10434") ? false : (stryCov_9fa48("10434", "10435"), (stryMutAct_9fa48("10436") ? next.id : (stryCov_9fa48("10436"), next?.id)) !== last.id)))) || (stryMutAct_9fa48("10438") ? next.publishedAt === last.publishedAt : stryMutAct_9fa48("10437") ? false : (stryCov_9fa48("10437", "10438"), next.publishedAt !== last.publishedAt)))) throw new Error(stryMutAct_9fa48("10440") ? "" : (stryCov_9fa48("10440"), 'This publication page is incomplete.'));
      }
    }
    return stryMutAct_9fa48("10441") ? {} : (stryCov_9fa48("10441"), {
      items,
      next
    });
  }
}
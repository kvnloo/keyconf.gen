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
import type { PublicBuildEvidence } from './build-evidence.ts';
import { catalog, categories } from './catalog.ts';
import { resolveAccessoryProducts } from './imported-accessories.ts';
import { soundPacks } from './sound-packs.ts';
function values(build: Build, evidence?: PublicBuildEvidence) {
  if (stryMutAct_9fa48("6372")) {
    {}
  } else {
    stryCov_9fa48("6372");
    const parts = stryMutAct_9fa48("6373") ? evidence?.components && [...build.customParts, ...catalog] : (stryCov_9fa48("6373"), (stryMutAct_9fa48("6374") ? evidence.components : (stryCov_9fa48("6374"), evidence?.components)) ?? (stryMutAct_9fa48("6375") ? [] : (stryCov_9fa48("6375"), [...build.customParts, ...catalog])));
    const accessories = stryMutAct_9fa48("6376") ? build.accessories.map(item => {
      const product = (evidence?.accessoryReferences ?? resolveAccessoryProducts(build.customAccessories)).find(entry => entry.id === item.productId);
      const location = item.location;
      const placement = location.kind === 'key' ? location.keyId : location.kind === 'embedded' ? location.slotId : location.position;
      return `${product?.name ?? item.productId} × ${item.quantity} · ${location.kind}: ${placement}`;
    }) : (stryCov_9fa48("6376"), build.accessories.map(item => {
      if (stryMutAct_9fa48("6377")) {
        {}
      } else {
        stryCov_9fa48("6377");
        const product = (stryMutAct_9fa48("6378") ? evidence?.accessoryReferences && resolveAccessoryProducts(build.customAccessories) : (stryCov_9fa48("6378"), (stryMutAct_9fa48("6379") ? evidence.accessoryReferences : (stryCov_9fa48("6379"), evidence?.accessoryReferences)) ?? resolveAccessoryProducts(build.customAccessories))).find(stryMutAct_9fa48("6380") ? () => undefined : (stryCov_9fa48("6380"), entry => stryMutAct_9fa48("6383") ? entry.id !== item.productId : stryMutAct_9fa48("6382") ? false : stryMutAct_9fa48("6381") ? true : (stryCov_9fa48("6381", "6382", "6383"), entry.id === item.productId)));
        const location = item.location;
        const placement = (stryMutAct_9fa48("6386") ? location.kind !== 'key' : stryMutAct_9fa48("6385") ? false : stryMutAct_9fa48("6384") ? true : (stryCov_9fa48("6384", "6385", "6386"), location.kind === (stryMutAct_9fa48("6387") ? "" : (stryCov_9fa48("6387"), 'key')))) ? location.keyId : (stryMutAct_9fa48("6390") ? location.kind !== 'embedded' : stryMutAct_9fa48("6389") ? false : stryMutAct_9fa48("6388") ? true : (stryCov_9fa48("6388", "6389", "6390"), location.kind === (stryMutAct_9fa48("6391") ? "" : (stryCov_9fa48("6391"), 'embedded')))) ? location.slotId : location.position;
        return stryMutAct_9fa48("6392") ? `` : (stryCov_9fa48("6392"), `${stryMutAct_9fa48("6393") ? product?.name && item.productId : (stryCov_9fa48("6393"), (stryMutAct_9fa48("6394") ? product.name : (stryCov_9fa48("6394"), product?.name)) ?? item.productId)} × ${item.quantity} · ${location.kind}: ${placement}`);
      }
    }).sort());
    return stryMutAct_9fa48("6395") ? [] : (stryCov_9fa48("6395"), [...categories.map(category => {
      if (stryMutAct_9fa48("6396")) {
        {}
      } else {
        stryCov_9fa48("6396");
        const part = parts.find(stryMutAct_9fa48("6397") ? () => undefined : (stryCov_9fa48("6397"), entry => stryMutAct_9fa48("6400") ? entry.id !== build.selection[category] : stryMutAct_9fa48("6399") ? false : stryMutAct_9fa48("6398") ? true : (stryCov_9fa48("6398", "6399", "6400"), entry.id === build.selection[category])));
        return stryMutAct_9fa48("6401") ? {} : (stryCov_9fa48("6401"), {
          label: category,
          identity: build.selection[category],
          sources: part ? stryMutAct_9fa48("6402") ? [] : (stryCov_9fa48("6402"), [stryMutAct_9fa48("6403") ? {} : (stryCov_9fa48("6403"), {
            name: stryMutAct_9fa48("6404") ? `` : (stryCov_9fa48("6404"), `${part.brand} ${part.name}`),
            url: part.source
          })]) : stryMutAct_9fa48("6405") ? ["Stryker was here"] : (stryCov_9fa48("6405"), []),
          value: part ? stryMutAct_9fa48("6406") ? `` : (stryCov_9fa48("6406"), `${part.brand} ${part.name} · ${part.detail}`) : build.selection[category]
        });
      }
    }), stryMutAct_9fa48("6407") ? {} : (stryCov_9fa48("6407"), {
      label: stryMutAct_9fa48("6408") ? "" : (stryCov_9fa48("6408"), 'Layout'),
      value: stryMutAct_9fa48("6409") ? `` : (stryCov_9fa48("6409"), `${build.layout}%`)
    }), stryMutAct_9fa48("6410") ? {} : (stryCov_9fa48("6410"), {
      label: stryMutAct_9fa48("6411") ? "" : (stryCov_9fa48("6411"), 'Case finish study'),
      value: build.finish
    }), stryMutAct_9fa48("6412") ? {} : (stryCov_9fa48("6412"), {
      label: stryMutAct_9fa48("6413") ? "" : (stryCov_9fa48("6413"), 'Keycap profile study'),
      value: build.profile
    }), stryMutAct_9fa48("6414") ? {} : (stryCov_9fa48("6414"), {
      label: stryMutAct_9fa48("6415") ? "" : (stryCov_9fa48("6415"), 'Case color'),
      value: stryMutAct_9fa48("6416") ? build.caseColor.toUpperCase() : (stryCov_9fa48("6416"), build.caseColor.toLowerCase())
    }), ...(['alpha', 'mod', 'accent', 'space'] as const).map(stryMutAct_9fa48("6417") ? () => undefined : (stryCov_9fa48("6417"), key => stryMutAct_9fa48("6418") ? {} : (stryCov_9fa48("6418"), {
      label: stryMutAct_9fa48("6419") ? `` : (stryCov_9fa48("6419"), `${key} key color`),
      value: stryMutAct_9fa48("6420") ? build.palette[key].toUpperCase() : (stryCov_9fa48("6420"), build.palette[key].toLowerCase())
    }))), stryMutAct_9fa48("6421") ? {} : (stryCov_9fa48("6421"), {
      label: stryMutAct_9fa48("6422") ? "" : (stryCov_9fa48("6422"), 'Accessories'),
      sources: stryMutAct_9fa48("6424") ? (evidence?.accessoryReferences ?? resolveAccessoryProducts(build.customAccessories)).map(product => ({
        name: product.name,
        url: product.source
      })).sort((a, b) => a.url.localeCompare(b.url)) : stryMutAct_9fa48("6423") ? (evidence?.accessoryReferences ?? resolveAccessoryProducts(build.customAccessories)).filter(product => build.accessories.some(item => item.productId === product.id)).map(product => ({
        name: product.name,
        url: product.source
      })) : (stryCov_9fa48("6423", "6424"), (stryMutAct_9fa48("6425") ? evidence?.accessoryReferences && resolveAccessoryProducts(build.customAccessories) : (stryCov_9fa48("6425"), (stryMutAct_9fa48("6426") ? evidence.accessoryReferences : (stryCov_9fa48("6426"), evidence?.accessoryReferences)) ?? resolveAccessoryProducts(build.customAccessories))).filter(stryMutAct_9fa48("6427") ? () => undefined : (stryCov_9fa48("6427"), product => stryMutAct_9fa48("6428") ? build.accessories.every(item => item.productId === product.id) : (stryCov_9fa48("6428"), build.accessories.some(stryMutAct_9fa48("6429") ? () => undefined : (stryCov_9fa48("6429"), item => stryMutAct_9fa48("6432") ? item.productId !== product.id : stryMutAct_9fa48("6431") ? false : stryMutAct_9fa48("6430") ? true : (stryCov_9fa48("6430", "6431", "6432"), item.productId === product.id)))))).map(stryMutAct_9fa48("6433") ? () => undefined : (stryCov_9fa48("6433"), product => stryMutAct_9fa48("6434") ? {} : (stryCov_9fa48("6434"), {
        name: product.name,
        url: product.source
      }))).sort(stryMutAct_9fa48("6435") ? () => undefined : (stryCov_9fa48("6435"), (a, b) => a.url.localeCompare(b.url)))),
      value: stryMutAct_9fa48("6438") ? accessories.join('\n') && 'None' : stryMutAct_9fa48("6437") ? false : stryMutAct_9fa48("6436") ? true : (stryCov_9fa48("6436", "6437", "6438"), accessories.join(stryMutAct_9fa48("6439") ? "" : (stryCov_9fa48("6439"), '\n')) || (stryMutAct_9fa48("6440") ? "" : (stryCov_9fa48("6440"), 'None'))),
      identity: JSON.stringify(stryMutAct_9fa48("6441") ? build.accessories.map(item => [item.productId, item.quantity, item.location.kind, item.location.kind === 'key' ? item.location.keyId : item.location.kind === 'embedded' ? item.location.slotId : item.location.position]) : (stryCov_9fa48("6441"), build.accessories.map(stryMutAct_9fa48("6442") ? () => undefined : (stryCov_9fa48("6442"), item => stryMutAct_9fa48("6443") ? [] : (stryCov_9fa48("6443"), [item.productId, item.quantity, item.location.kind, (stryMutAct_9fa48("6446") ? item.location.kind !== 'key' : stryMutAct_9fa48("6445") ? false : stryMutAct_9fa48("6444") ? true : (stryCov_9fa48("6444", "6445", "6446"), item.location.kind === (stryMutAct_9fa48("6447") ? "" : (stryCov_9fa48("6447"), 'key')))) ? item.location.keyId : (stryMutAct_9fa48("6450") ? item.location.kind !== 'embedded' : stryMutAct_9fa48("6449") ? false : stryMutAct_9fa48("6448") ? true : (stryCov_9fa48("6448", "6449", "6450"), item.location.kind === (stryMutAct_9fa48("6451") ? "" : (stryCov_9fa48("6451"), 'embedded')))) ? item.location.slotId : item.location.position]))).sort(stryMutAct_9fa48("6452") ? () => undefined : (stryCov_9fa48("6452"), (a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b))))))
    }), stryMutAct_9fa48("6453") ? {} : (stryCov_9fa48("6453"), {
      label: stryMutAct_9fa48("6454") ? "" : (stryCov_9fa48("6454"), 'Sound reference'),
      identity: build.audio.source,
      value: stryMutAct_9fa48("6455") ? (evidence?.sound.recording?.name ?? soundPacks.find(pack => pack.id === build.audio.source)?.name) && build.audio.source : (stryCov_9fa48("6455"), (stryMutAct_9fa48("6456") ? evidence?.sound.recording?.name && soundPacks.find(pack => pack.id === build.audio.source)?.name : (stryCov_9fa48("6456"), (stryMutAct_9fa48("6458") ? evidence.sound.recording?.name : stryMutAct_9fa48("6457") ? evidence?.sound.recording.name : (stryCov_9fa48("6457", "6458"), evidence?.sound.recording?.name)) ?? (stryMutAct_9fa48("6459") ? soundPacks.find(pack => pack.id === build.audio.source).name : (stryCov_9fa48("6459"), soundPacks.find(stryMutAct_9fa48("6460") ? () => undefined : (stryCov_9fa48("6460"), pack => stryMutAct_9fa48("6463") ? pack.id !== build.audio.source : stryMutAct_9fa48("6462") ? false : stryMutAct_9fa48("6461") ? true : (stryCov_9fa48("6461", "6462", "6463"), pack.id === build.audio.source)))?.name)))) ?? build.audio.source)
    }), stryMutAct_9fa48("6464") ? {} : (stryCov_9fa48("6464"), {
      label: stryMutAct_9fa48("6465") ? "" : (stryCov_9fa48("6465"), 'Synthesized switch character'),
      value: build.audio.character
    }), stryMutAct_9fa48("6466") ? {} : (stryCov_9fa48("6466"), {
      label: stryMutAct_9fa48("6467") ? "" : (stryCov_9fa48("6467"), 'Playback volume'),
      value: stryMutAct_9fa48("6468") ? `` : (stryCov_9fa48("6468"), `${(stryMutAct_9fa48("6469") ? build.audio.volume / 100 : (stryCov_9fa48("6469"), build.audio.volume * 100)).toLocaleString(stryMutAct_9fa48("6470") ? "" : (stryCov_9fa48("6470"), 'en-US'), stryMutAct_9fa48("6471") ? {} : (stryCov_9fa48("6471"), {
        maximumSignificantDigits: 15
      }))}%`),
      identity: String(build.audio.volume)
    }), stryMutAct_9fa48("6472") ? {} : (stryCov_9fa48("6472"), {
      label: stryMutAct_9fa48("6473") ? "" : (stryCov_9fa48("6473"), 'Sound damping'),
      value: String(build.audio.damping)
    })]);
  }
}
export function compareBuilds(original: Build, candidate: Build, evidence?: PublicBuildEvidence) {
  if (stryMutAct_9fa48("6474")) {
    {}
  } else {
    stryCov_9fa48("6474");
    const before = new Map(values(original, evidence).map(stryMutAct_9fa48("6475") ? () => undefined : (stryCov_9fa48("6475"), item => stryMutAct_9fa48("6476") ? [] : (stryCov_9fa48("6476"), [item.label, item]))));
    return values(candidate).flatMap(item => {
      if (stryMutAct_9fa48("6477")) {
        {}
      } else {
        stryCov_9fa48("6477");
        const previous = before.get(item.label);
        if (stryMutAct_9fa48("6480") ? !previous && previous.value === item.value && previous.identity === item.identity && JSON.stringify(previous.sources) === JSON.stringify(item.sources) : stryMutAct_9fa48("6479") ? false : stryMutAct_9fa48("6478") ? true : (stryCov_9fa48("6478", "6479", "6480"), (stryMutAct_9fa48("6481") ? previous : (stryCov_9fa48("6481"), !previous)) || (stryMutAct_9fa48("6483") ? previous.value === item.value && previous.identity === item.identity || JSON.stringify(previous.sources) === JSON.stringify(item.sources) : stryMutAct_9fa48("6482") ? false : (stryCov_9fa48("6482", "6483"), (stryMutAct_9fa48("6485") ? previous.value === item.value || previous.identity === item.identity : stryMutAct_9fa48("6484") ? true : (stryCov_9fa48("6484", "6485"), (stryMutAct_9fa48("6487") ? previous.value !== item.value : stryMutAct_9fa48("6486") ? true : (stryCov_9fa48("6486", "6487"), previous.value === item.value)) && (stryMutAct_9fa48("6489") ? previous.identity !== item.identity : stryMutAct_9fa48("6488") ? true : (stryCov_9fa48("6488", "6489"), previous.identity === item.identity)))) && (stryMutAct_9fa48("6491") ? JSON.stringify(previous.sources) !== JSON.stringify(item.sources) : stryMutAct_9fa48("6490") ? true : (stryCov_9fa48("6490", "6491"), JSON.stringify(previous.sources) === JSON.stringify(item.sources))))))) return stryMutAct_9fa48("6492") ? ["Stryker was here"] : (stryCov_9fa48("6492"), []);
        const sameLabel = stryMutAct_9fa48("6495") ? previous.value === item.value || previous.identity !== item.identity : stryMutAct_9fa48("6494") ? false : stryMutAct_9fa48("6493") ? true : (stryCov_9fa48("6493", "6494", "6495"), (stryMutAct_9fa48("6497") ? previous.value !== item.value : stryMutAct_9fa48("6496") ? true : (stryCov_9fa48("6496", "6497"), previous.value === item.value)) && (stryMutAct_9fa48("6499") ? previous.identity === item.identity : stryMutAct_9fa48("6498") ? true : (stryCov_9fa48("6498", "6499"), previous.identity !== item.identity)));
        return stryMutAct_9fa48("6500") ? [] : (stryCov_9fa48("6500"), [stryMutAct_9fa48("6501") ? {} : (stryCov_9fa48("6501"), {
          label: item.label,
          beforeSources: stryMutAct_9fa48("6502") ? previous.sources && [] : (stryCov_9fa48("6502"), previous.sources ?? (stryMutAct_9fa48("6503") ? ["Stryker was here"] : (stryCov_9fa48("6503"), []))),
          afterSources: stryMutAct_9fa48("6504") ? item.sources && [] : (stryCov_9fa48("6504"), item.sources ?? (stryMutAct_9fa48("6505") ? ["Stryker was here"] : (stryCov_9fa48("6505"), []))),
          before: sameLabel ? stryMutAct_9fa48("6506") ? `` : (stryCov_9fa48("6506"), `${previous.value} (${previous.identity})`) : previous.value,
          after: sameLabel ? stryMutAct_9fa48("6507") ? `` : (stryCov_9fa48("6507"), `${item.value} (${item.identity})`) : item.value
        })]);
      }
    });
  }
}
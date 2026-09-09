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
export type ProductPrice = {
  kind: 'unknown';
} | {
  kind: 'exact';
  amount: string;
  currency: string;
} | {
  kind: 'from';
  amount: string;
  currency: string;
} | {
  kind: 'range';
  min: string;
  max: string;
  currency: string;
};
function record(value: unknown): value is Record<string, unknown> {
  if (stryMutAct_9fa48("13254")) {
    {}
  } else {
    stryCov_9fa48("13254");
    return stryMutAct_9fa48("13257") ? typeof value === 'object' && value !== null || !Array.isArray(value) : stryMutAct_9fa48("13256") ? false : stryMutAct_9fa48("13255") ? true : (stryCov_9fa48("13255", "13256", "13257"), (stryMutAct_9fa48("13259") ? typeof value === 'object' || value !== null : stryMutAct_9fa48("13258") ? true : (stryCov_9fa48("13258", "13259"), (stryMutAct_9fa48("13261") ? typeof value !== 'object' : stryMutAct_9fa48("13260") ? true : (stryCov_9fa48("13260", "13261"), typeof value === (stryMutAct_9fa48("13262") ? "" : (stryCov_9fa48("13262"), 'object')))) && (stryMutAct_9fa48("13264") ? value === null : stryMutAct_9fa48("13263") ? true : (stryCov_9fa48("13263", "13264"), value !== null)))) && (stryMutAct_9fa48("13265") ? Array.isArray(value) : (stryCov_9fa48("13265"), !Array.isArray(value))));
  }
}
function amount(value: unknown): string | null {
  if (stryMutAct_9fa48("13266")) {
    {}
  } else {
    stryCov_9fa48("13266");
    const text = (stryMutAct_9fa48("13269") ? typeof value !== 'number' : stryMutAct_9fa48("13268") ? false : stryMutAct_9fa48("13267") ? true : (stryCov_9fa48("13267", "13268", "13269"), typeof value === (stryMutAct_9fa48("13270") ? "" : (stryCov_9fa48("13270"), 'number')))) ? String(value) : value;
    return (stryMutAct_9fa48("13273") ? typeof text === 'string' || /^\d{1,12}(?:\.\d{1,6})?$/.test(text) : stryMutAct_9fa48("13272") ? false : stryMutAct_9fa48("13271") ? true : (stryCov_9fa48("13271", "13272", "13273"), (stryMutAct_9fa48("13275") ? typeof text !== 'string' : stryMutAct_9fa48("13274") ? true : (stryCov_9fa48("13274", "13275"), typeof text === (stryMutAct_9fa48("13276") ? "" : (stryCov_9fa48("13276"), 'string')))) && (stryMutAct_9fa48("13283") ? /^\d{1,12}(?:\.\D{1,6})?$/ : stryMutAct_9fa48("13282") ? /^\d{1,12}(?:\.\d)?$/ : stryMutAct_9fa48("13281") ? /^\d{1,12}(?:\.\d{1,6})$/ : stryMutAct_9fa48("13280") ? /^\D{1,12}(?:\.\d{1,6})?$/ : stryMutAct_9fa48("13279") ? /^\d(?:\.\d{1,6})?$/ : stryMutAct_9fa48("13278") ? /^\d{1,12}(?:\.\d{1,6})?/ : stryMutAct_9fa48("13277") ? /\d{1,12}(?:\.\d{1,6})?$/ : (stryCov_9fa48("13277", "13278", "13279", "13280", "13281", "13282", "13283"), /^\d{1,12}(?:\.\d{1,6})?$/)).test(text))) ? text : null;
  }
}
function currency(value: unknown): string | null {
  if (stryMutAct_9fa48("13284")) {
    {}
  } else {
    stryCov_9fa48("13284");
    return (stryMutAct_9fa48("13287") ? typeof value === 'string' || /^[A-Za-z]{3}$/.test(value) : stryMutAct_9fa48("13286") ? false : stryMutAct_9fa48("13285") ? true : (stryCov_9fa48("13285", "13286", "13287"), (stryMutAct_9fa48("13289") ? typeof value !== 'string' : stryMutAct_9fa48("13288") ? true : (stryCov_9fa48("13288", "13289"), typeof value === (stryMutAct_9fa48("13290") ? "" : (stryCov_9fa48("13290"), 'string')))) && (stryMutAct_9fa48("13294") ? /^[^A-Za-z]{3}$/ : stryMutAct_9fa48("13293") ? /^[A-Za-z]$/ : stryMutAct_9fa48("13292") ? /^[A-Za-z]{3}/ : stryMutAct_9fa48("13291") ? /[A-Za-z]{3}$/ : (stryCov_9fa48("13291", "13292", "13293", "13294"), /^[A-Za-z]{3}$/)).test(value))) ? stryMutAct_9fa48("13295") ? value.toLowerCase() : (stryCov_9fa48("13295"), value.toUpperCase()) : null;
  }
}
export function exactPrice(value: unknown, code: unknown): ProductPrice {
  if (stryMutAct_9fa48("13296")) {
    {}
  } else {
    stryCov_9fa48("13296");
    const money = amount(value),
      unit = currency(code);
    return (stryMutAct_9fa48("13299") ? money !== null || unit : stryMutAct_9fa48("13298") ? false : stryMutAct_9fa48("13297") ? true : (stryCov_9fa48("13297", "13298", "13299"), (stryMutAct_9fa48("13301") ? money === null : stryMutAct_9fa48("13300") ? true : (stryCov_9fa48("13300", "13301"), money !== null)) && unit)) ? stryMutAct_9fa48("13302") ? {} : (stryCov_9fa48("13302"), {
      kind: stryMutAct_9fa48("13303") ? "" : (stryCov_9fa48("13303"), 'exact'),
      amount: money,
      currency: unit
    }) : stryMutAct_9fa48("13304") ? {} : (stryCov_9fa48("13304"), {
      kind: stryMutAct_9fa48("13305") ? "" : (stryCov_9fa48("13305"), 'unknown')
    });
  }
}
function offerPrice(value: unknown): ProductPrice {
  if (stryMutAct_9fa48("13306")) {
    {}
  } else {
    stryCov_9fa48("13306");
    if (stryMutAct_9fa48("13309") ? false : stryMutAct_9fa48("13308") ? true : stryMutAct_9fa48("13307") ? record(value) : (stryCov_9fa48("13307", "13308", "13309"), !record(value))) return stryMutAct_9fa48("13310") ? {} : (stryCov_9fa48("13310"), {
      kind: stryMutAct_9fa48("13311") ? "" : (stryCov_9fa48("13311"), 'unknown')
    });
    const unit = currency(value.priceCurrency);
    if (stryMutAct_9fa48("13314") ? false : stryMutAct_9fa48("13313") ? true : stryMutAct_9fa48("13312") ? unit : (stryCov_9fa48("13312", "13313", "13314"), !unit)) return stryMutAct_9fa48("13315") ? {} : (stryCov_9fa48("13315"), {
      kind: stryMutAct_9fa48("13316") ? "" : (stryCov_9fa48("13316"), 'unknown')
    });
    if (stryMutAct_9fa48("13319") ? value.lowPrice !== undefined && value.highPrice !== undefined : stryMutAct_9fa48("13318") ? false : stryMutAct_9fa48("13317") ? true : (stryCov_9fa48("13317", "13318", "13319"), (stryMutAct_9fa48("13321") ? value.lowPrice === undefined : stryMutAct_9fa48("13320") ? false : (stryCov_9fa48("13320", "13321"), value.lowPrice !== undefined)) || (stryMutAct_9fa48("13323") ? value.highPrice === undefined : stryMutAct_9fa48("13322") ? false : (stryCov_9fa48("13322", "13323"), value.highPrice !== undefined)))) {
      if (stryMutAct_9fa48("13324")) {
        {}
      } else {
        stryCov_9fa48("13324");
        const min = amount(value.lowPrice),
          max = amount(value.highPrice);
        if (stryMutAct_9fa48("13327") ? min === null && value.highPrice !== undefined && max === null : stryMutAct_9fa48("13326") ? false : stryMutAct_9fa48("13325") ? true : (stryCov_9fa48("13325", "13326", "13327"), (stryMutAct_9fa48("13329") ? min !== null : stryMutAct_9fa48("13328") ? false : (stryCov_9fa48("13328", "13329"), min === null)) || (stryMutAct_9fa48("13331") ? value.highPrice !== undefined || max === null : stryMutAct_9fa48("13330") ? false : (stryCov_9fa48("13330", "13331"), (stryMutAct_9fa48("13333") ? value.highPrice === undefined : stryMutAct_9fa48("13332") ? true : (stryCov_9fa48("13332", "13333"), value.highPrice !== undefined)) && (stryMutAct_9fa48("13335") ? max !== null : stryMutAct_9fa48("13334") ? true : (stryCov_9fa48("13334", "13335"), max === null)))))) return stryMutAct_9fa48("13336") ? {} : (stryCov_9fa48("13336"), {
          kind: stryMutAct_9fa48("13337") ? "" : (stryCov_9fa48("13337"), 'unknown')
        });
        if (stryMutAct_9fa48("13340") ? max !== null : stryMutAct_9fa48("13339") ? false : stryMutAct_9fa48("13338") ? true : (stryCov_9fa48("13338", "13339", "13340"), max === null)) return stryMutAct_9fa48("13341") ? {} : (stryCov_9fa48("13341"), {
          kind: stryMutAct_9fa48("13342") ? "" : (stryCov_9fa48("13342"), 'from'),
          amount: min,
          currency: unit
        });
        if (stryMutAct_9fa48("13346") ? Number(min) <= Number(max) : stryMutAct_9fa48("13345") ? Number(min) >= Number(max) : stryMutAct_9fa48("13344") ? false : stryMutAct_9fa48("13343") ? true : (stryCov_9fa48("13343", "13344", "13345", "13346"), Number(min) > Number(max))) return stryMutAct_9fa48("13347") ? {} : (stryCov_9fa48("13347"), {
          kind: stryMutAct_9fa48("13348") ? "" : (stryCov_9fa48("13348"), 'unknown')
        });
        return stryMutAct_9fa48("13349") ? {} : (stryCov_9fa48("13349"), {
          kind: stryMutAct_9fa48("13350") ? "" : (stryCov_9fa48("13350"), 'range'),
          min,
          max,
          currency: unit
        });
      }
    }
    return exactPrice(value.price, unit);
  }
}
export function offerPricing(offers: unknown[]): ProductPrice {
  if (stryMutAct_9fa48("13351")) {
    {}
  } else {
    stryCov_9fa48("13351");
    const prices = offers.map(offerPrice);
    const first = prices[0];
    if (stryMutAct_9fa48("13354") ? !first && first.kind === 'unknown' : stryMutAct_9fa48("13353") ? false : stryMutAct_9fa48("13352") ? true : (stryCov_9fa48("13352", "13353", "13354"), (stryMutAct_9fa48("13355") ? first : (stryCov_9fa48("13355"), !first)) || (stryMutAct_9fa48("13357") ? first.kind !== 'unknown' : stryMutAct_9fa48("13356") ? false : (stryCov_9fa48("13356", "13357"), first.kind === (stryMutAct_9fa48("13358") ? "" : (stryCov_9fa48("13358"), 'unknown')))))) return stryMutAct_9fa48("13359") ? {} : (stryCov_9fa48("13359"), {
      kind: stryMutAct_9fa48("13360") ? "" : (stryCov_9fa48("13360"), 'unknown')
    });
    let min = (stryMutAct_9fa48("13363") ? first.kind !== 'range' : stryMutAct_9fa48("13362") ? false : stryMutAct_9fa48("13361") ? true : (stryCov_9fa48("13361", "13362", "13363"), first.kind === (stryMutAct_9fa48("13364") ? "" : (stryCov_9fa48("13364"), 'range')))) ? first.min : first.amount;
    let max = (stryMutAct_9fa48("13367") ? first.kind !== 'range' : stryMutAct_9fa48("13366") ? false : stryMutAct_9fa48("13365") ? true : (stryCov_9fa48("13365", "13366", "13367"), first.kind === (stryMutAct_9fa48("13368") ? "" : (stryCov_9fa48("13368"), 'range')))) ? first.max : first.amount;
    let open = stryMutAct_9fa48("13371") ? first.kind !== 'from' : stryMutAct_9fa48("13370") ? false : stryMutAct_9fa48("13369") ? true : (stryCov_9fa48("13369", "13370", "13371"), first.kind === (stryMutAct_9fa48("13372") ? "" : (stryCov_9fa48("13372"), 'from')));
    for (const price of prices) {
      if (stryMutAct_9fa48("13373")) {
        {}
      } else {
        stryCov_9fa48("13373");
        if (stryMutAct_9fa48("13376") ? price.kind === 'unknown' && price.currency !== first.currency : stryMutAct_9fa48("13375") ? false : stryMutAct_9fa48("13374") ? true : (stryCov_9fa48("13374", "13375", "13376"), (stryMutAct_9fa48("13378") ? price.kind !== 'unknown' : stryMutAct_9fa48("13377") ? false : (stryCov_9fa48("13377", "13378"), price.kind === (stryMutAct_9fa48("13379") ? "" : (stryCov_9fa48("13379"), 'unknown')))) || (stryMutAct_9fa48("13381") ? price.currency === first.currency : stryMutAct_9fa48("13380") ? false : (stryCov_9fa48("13380", "13381"), price.currency !== first.currency)))) return stryMutAct_9fa48("13382") ? {} : (stryCov_9fa48("13382"), {
          kind: stryMutAct_9fa48("13383") ? "" : (stryCov_9fa48("13383"), 'unknown')
        });
        const low = (stryMutAct_9fa48("13386") ? price.kind !== 'range' : stryMutAct_9fa48("13385") ? false : stryMutAct_9fa48("13384") ? true : (stryCov_9fa48("13384", "13385", "13386"), price.kind === (stryMutAct_9fa48("13387") ? "" : (stryCov_9fa48("13387"), 'range')))) ? price.min : price.amount;
        const high = (stryMutAct_9fa48("13390") ? price.kind !== 'range' : stryMutAct_9fa48("13389") ? false : stryMutAct_9fa48("13388") ? true : (stryCov_9fa48("13388", "13389", "13390"), price.kind === (stryMutAct_9fa48("13391") ? "" : (stryCov_9fa48("13391"), 'range')))) ? price.max : price.amount;
        if (stryMutAct_9fa48("13395") ? Number(low) >= Number(min) : stryMutAct_9fa48("13394") ? Number(low) <= Number(min) : stryMutAct_9fa48("13393") ? false : stryMutAct_9fa48("13392") ? true : (stryCov_9fa48("13392", "13393", "13394", "13395"), Number(low) < Number(min))) min = low;
        if (stryMutAct_9fa48("13399") ? Number(high) <= Number(max) : stryMutAct_9fa48("13398") ? Number(high) >= Number(max) : stryMutAct_9fa48("13397") ? false : stryMutAct_9fa48("13396") ? true : (stryCov_9fa48("13396", "13397", "13398", "13399"), Number(high) > Number(max))) max = high;
        stryMutAct_9fa48("13400") ? open &&= price.kind === 'from' : (stryCov_9fa48("13400"), open ||= stryMutAct_9fa48("13403") ? price.kind !== 'from' : stryMutAct_9fa48("13402") ? false : stryMutAct_9fa48("13401") ? true : (stryCov_9fa48("13401", "13402", "13403"), price.kind === (stryMutAct_9fa48("13404") ? "" : (stryCov_9fa48("13404"), 'from'))));
      }
    }
    if (stryMutAct_9fa48("13406") ? false : stryMutAct_9fa48("13405") ? true : (stryCov_9fa48("13405", "13406"), open)) return stryMutAct_9fa48("13407") ? {} : (stryCov_9fa48("13407"), {
      kind: stryMutAct_9fa48("13408") ? "" : (stryCov_9fa48("13408"), 'from'),
      amount: min,
      currency: first.currency
    });
    if (stryMutAct_9fa48("13411") ? prices.length !== 1 : stryMutAct_9fa48("13410") ? false : stryMutAct_9fa48("13409") ? true : (stryCov_9fa48("13409", "13410", "13411"), prices.length === 1)) return first;
    return (stryMutAct_9fa48("13414") ? Number(min) !== Number(max) : stryMutAct_9fa48("13413") ? false : stryMutAct_9fa48("13412") ? true : (stryCov_9fa48("13412", "13413", "13414"), Number(min) === Number(max))) ? stryMutAct_9fa48("13415") ? {} : (stryCov_9fa48("13415"), {
      kind: stryMutAct_9fa48("13416") ? "" : (stryCov_9fa48("13416"), 'exact'),
      amount: min,
      currency: first.currency
    }) : stryMutAct_9fa48("13417") ? {} : (stryCov_9fa48("13417"), {
      kind: stryMutAct_9fa48("13418") ? "" : (stryCov_9fa48("13418"), 'range'),
      min,
      max,
      currency: first.currency
    });
  }
}
export function isProductPrice(value: unknown): value is ProductPrice {
  if (stryMutAct_9fa48("13419")) {
    {}
  } else {
    stryCov_9fa48("13419");
    if (stryMutAct_9fa48("13422") ? false : stryMutAct_9fa48("13421") ? true : stryMutAct_9fa48("13420") ? record(value) : (stryCov_9fa48("13420", "13421", "13422"), !record(value))) return stryMutAct_9fa48("13423") ? true : (stryCov_9fa48("13423"), false);
    if (stryMutAct_9fa48("13426") ? value.kind !== 'unknown' : stryMutAct_9fa48("13425") ? false : stryMutAct_9fa48("13424") ? true : (stryCov_9fa48("13424", "13425", "13426"), value.kind === (stryMutAct_9fa48("13427") ? "" : (stryCov_9fa48("13427"), 'unknown')))) return stryMutAct_9fa48("13428") ? false : (stryCov_9fa48("13428"), true);
    if (stryMutAct_9fa48("13431") ? typeof value.currency !== 'string' && currency(value.currency) !== value.currency : stryMutAct_9fa48("13430") ? false : stryMutAct_9fa48("13429") ? true : (stryCov_9fa48("13429", "13430", "13431"), (stryMutAct_9fa48("13433") ? typeof value.currency === 'string' : stryMutAct_9fa48("13432") ? false : (stryCov_9fa48("13432", "13433"), typeof value.currency !== (stryMutAct_9fa48("13434") ? "" : (stryCov_9fa48("13434"), 'string')))) || (stryMutAct_9fa48("13436") ? currency(value.currency) === value.currency : stryMutAct_9fa48("13435") ? false : (stryCov_9fa48("13435", "13436"), currency(value.currency) !== value.currency)))) return stryMutAct_9fa48("13437") ? true : (stryCov_9fa48("13437"), false);
    if (stryMutAct_9fa48("13440") ? value.kind === 'exact' && value.kind === 'from' : stryMutAct_9fa48("13439") ? false : stryMutAct_9fa48("13438") ? true : (stryCov_9fa48("13438", "13439", "13440"), (stryMutAct_9fa48("13442") ? value.kind !== 'exact' : stryMutAct_9fa48("13441") ? false : (stryCov_9fa48("13441", "13442"), value.kind === (stryMutAct_9fa48("13443") ? "" : (stryCov_9fa48("13443"), 'exact')))) || (stryMutAct_9fa48("13445") ? value.kind !== 'from' : stryMutAct_9fa48("13444") ? false : (stryCov_9fa48("13444", "13445"), value.kind === (stryMutAct_9fa48("13446") ? "" : (stryCov_9fa48("13446"), 'from')))))) return stryMutAct_9fa48("13449") ? typeof value.amount === 'string' || amount(value.amount) !== null : stryMutAct_9fa48("13448") ? false : stryMutAct_9fa48("13447") ? true : (stryCov_9fa48("13447", "13448", "13449"), (stryMutAct_9fa48("13451") ? typeof value.amount !== 'string' : stryMutAct_9fa48("13450") ? true : (stryCov_9fa48("13450", "13451"), typeof value.amount === (stryMutAct_9fa48("13452") ? "" : (stryCov_9fa48("13452"), 'string')))) && (stryMutAct_9fa48("13454") ? amount(value.amount) === null : stryMutAct_9fa48("13453") ? true : (stryCov_9fa48("13453", "13454"), amount(value.amount) !== null)));
    return stryMutAct_9fa48("13457") ? value.kind === 'range' && typeof value.min === 'string' && typeof value.max === 'string' && amount(value.min) !== null && amount(value.max) !== null || Number(value.min) <= Number(value.max) : stryMutAct_9fa48("13456") ? false : stryMutAct_9fa48("13455") ? true : (stryCov_9fa48("13455", "13456", "13457"), (stryMutAct_9fa48("13459") ? value.kind === 'range' && typeof value.min === 'string' && typeof value.max === 'string' && amount(value.min) !== null || amount(value.max) !== null : stryMutAct_9fa48("13458") ? true : (stryCov_9fa48("13458", "13459"), (stryMutAct_9fa48("13461") ? value.kind === 'range' && typeof value.min === 'string' && typeof value.max === 'string' || amount(value.min) !== null : stryMutAct_9fa48("13460") ? true : (stryCov_9fa48("13460", "13461"), (stryMutAct_9fa48("13463") ? value.kind === 'range' && typeof value.min === 'string' || typeof value.max === 'string' : stryMutAct_9fa48("13462") ? true : (stryCov_9fa48("13462", "13463"), (stryMutAct_9fa48("13465") ? value.kind === 'range' || typeof value.min === 'string' : stryMutAct_9fa48("13464") ? true : (stryCov_9fa48("13464", "13465"), (stryMutAct_9fa48("13467") ? value.kind !== 'range' : stryMutAct_9fa48("13466") ? true : (stryCov_9fa48("13466", "13467"), value.kind === (stryMutAct_9fa48("13468") ? "" : (stryCov_9fa48("13468"), 'range')))) && (stryMutAct_9fa48("13470") ? typeof value.min !== 'string' : stryMutAct_9fa48("13469") ? true : (stryCov_9fa48("13469", "13470"), typeof value.min === (stryMutAct_9fa48("13471") ? "" : (stryCov_9fa48("13471"), 'string')))))) && (stryMutAct_9fa48("13473") ? typeof value.max !== 'string' : stryMutAct_9fa48("13472") ? true : (stryCov_9fa48("13472", "13473"), typeof value.max === (stryMutAct_9fa48("13474") ? "" : (stryCov_9fa48("13474"), 'string')))))) && (stryMutAct_9fa48("13476") ? amount(value.min) === null : stryMutAct_9fa48("13475") ? true : (stryCov_9fa48("13475", "13476"), amount(value.min) !== null)))) && (stryMutAct_9fa48("13478") ? amount(value.max) === null : stryMutAct_9fa48("13477") ? true : (stryCov_9fa48("13477", "13478"), amount(value.max) !== null)))) && (stryMutAct_9fa48("13481") ? Number(value.min) > Number(value.max) : stryMutAct_9fa48("13480") ? Number(value.min) < Number(value.max) : stryMutAct_9fa48("13479") ? true : (stryCov_9fa48("13479", "13480", "13481"), Number(value.min) <= Number(value.max))));
  }
}
export function formatProductPrice(price: ProductPrice): string {
  if (stryMutAct_9fa48("13482")) {
    {}
  } else {
    stryCov_9fa48("13482");
    switch (price.kind) {
      case stryMutAct_9fa48("13484") ? "" : (stryCov_9fa48("13484"), 'unknown'):
        if (stryMutAct_9fa48("13483")) {} else {
          stryCov_9fa48("13483");
          return stryMutAct_9fa48("13485") ? "" : (stryCov_9fa48("13485"), 'Price unverified');
        }
      case stryMutAct_9fa48("13487") ? "" : (stryCov_9fa48("13487"), 'exact'):
        if (stryMutAct_9fa48("13486")) {} else {
          stryCov_9fa48("13486");
          return price.currency + (stryMutAct_9fa48("13488") ? "" : (stryCov_9fa48("13488"), ' ')) + price.amount;
        }
      case stryMutAct_9fa48("13490") ? "" : (stryCov_9fa48("13490"), 'from'):
        if (stryMutAct_9fa48("13489")) {} else {
          stryCov_9fa48("13489");
          return (stryMutAct_9fa48("13491") ? "" : (stryCov_9fa48("13491"), 'From ')) + price.currency + (stryMutAct_9fa48("13492") ? "" : (stryCov_9fa48("13492"), ' ')) + price.amount;
        }
      case stryMutAct_9fa48("13494") ? "" : (stryCov_9fa48("13494"), 'range'):
        if (stryMutAct_9fa48("13493")) {} else {
          stryCov_9fa48("13493");
          return price.currency + (stryMutAct_9fa48("13495") ? "" : (stryCov_9fa48("13495"), ' ')) + price.min + (stryMutAct_9fa48("13496") ? "" : (stryCov_9fa48("13496"), ' to ')) + price.max;
        }
      default:
        if (stryMutAct_9fa48("13497")) {} else {
          stryCov_9fa48("13497");
          {
            if (stryMutAct_9fa48("13498")) {
              {}
            } else {
              stryCov_9fa48("13498");
              const exhaustive: never = price;
              return exhaustive;
            }
          }
        }
    }
  }
}
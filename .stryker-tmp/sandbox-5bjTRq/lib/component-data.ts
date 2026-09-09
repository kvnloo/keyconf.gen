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
import type { Part, Selection } from './catalog';
import type { Build } from './build';
export const catalogObservedAt = stryMutAct_9fa48("9130") ? "" : (stryCov_9fa48("9130"), 'September 5–6, 2026');
const q1Max = stryMutAct_9fa48("9131") ? "" : (stryCov_9fa48("9131"), 'https://www.keychron.com/products/keychron-q1-max-qmk-via-wireless-custom-mechanical-keyboard');
const q1He = stryMutAct_9fa48("9132") ? "" : (stryCov_9fa48("9132"), 'https://www.keychron.com/products/keychron-q1-he-qmk-wireless-custom-keyboard');
const q1He8k = stryMutAct_9fa48("9133") ? "" : (stryCov_9fa48("9133"), 'https://www.keychron.com/products/keychron-q1-he-8k-magnetic-switch-keyboard');
const lime = stryMutAct_9fa48("9134") ? "" : (stryCov_9fa48("9134"), 'https://www.keychron.com/products/keychron-ultra-fast-lime-magnetic-switch');
const nk65 = stryMutAct_9fa48("9135") ? "" : (stryCov_9fa48("9135"), 'https://novelkeys.com/products/nk65-entry-edition');
const doubleRail = stryMutAct_9fa48("9136") ? "" : (stryCov_9fa48("9136"), 'https://www.keychron.com/products/gateron-double-rail-magnetic-switch');
const gPro = stryMutAct_9fa48("9137") ? "" : (stryCov_9fa48("9137"), 'https://www.gateron.com/products/gateron-g-pro-30-switch-set');
export type Assembly = Pick<Build, 'layout' | 'finish'> & {
  id: string;
  name: string;
  brand: string;
  mount: string;
  source: string;
  note: string;
  availability: 'reference' | 'retired';
  suppliedKeycaps?: true;
  selection: Selection;
};
const contactChoices = stryMutAct_9fa48("9138") ? {} : (stryCov_9fa48("9138"), {
  switch: stryMutAct_9fa48("9139") ? "" : (stryCov_9fa48("9139"), 'oil-king'),
  keycaps: stryMutAct_9fa48("9140") ? "" : (stryCov_9fa48("9140"), 'keychron-bow')
});
export const assemblies: Assembly[] = stryMutAct_9fa48("9141") ? [] : (stryCov_9fa48("9141"), [stryMutAct_9fa48("9142") ? {} : (stryCov_9fa48("9142"), {
  id: stryMutAct_9fa48("9143") ? "" : (stryCov_9fa48("9143"), 'q1-he-8k'),
  suppliedKeycaps: stryMutAct_9fa48("9144") ? false : (stryCov_9fa48("9144"), true),
  name: stryMutAct_9fa48("9145") ? "" : (stryCov_9fa48("9145"), 'Q1 HE 8K'),
  brand: stryMutAct_9fa48("9146") ? "" : (stryCov_9fa48("9146"), 'Keychron'),
  layout: stryMutAct_9fa48("9147") ? "" : (stryCov_9fa48("9147"), '75'),
  finish: stryMutAct_9fa48("9148") ? "" : (stryCov_9fa48("9148"), 'Aluminum'),
  mount: stryMutAct_9fa48("9149") ? "" : (stryCov_9fa48("9149"), 'Factory assembly'),
  availability: stryMutAct_9fa48("9150") ? "" : (stryCov_9fa48("9150"), 'reference'),
  source: q1He8k,
  note: stryMutAct_9fa48("9151") ? "" : (stryCov_9fa48("9151"), 'Wired 75% · up to 8,000 Hz polling, not measured latency. September 6, 2026: Keychron lists Jade support in one section and Lime-only in another; Jade fit remains unresolved here.'),
  selection: stryMutAct_9fa48("9152") ? {} : (stryCov_9fa48("9152"), {
    case: stryMutAct_9fa48("9153") ? "" : (stryCov_9fa48("9153"), 'q1-he-8k-case'),
    pcb: stryMutAct_9fa48("9154") ? "" : (stryCov_9fa48("9154"), 'q1-he-8k-pcb'),
    plate: stryMutAct_9fa48("9155") ? "" : (stryCov_9fa48("9155"), 'q1-he-8k-plate'),
    stabilizers: stryMutAct_9fa48("9156") ? "" : (stryCov_9fa48("9156"), 'q1-he-8k-stabs'),
    switch: stryMutAct_9fa48("9157") ? "" : (stryCov_9fa48("9157"), 'ultrafast-lime'),
    keycaps: stryMutAct_9fa48("9158") ? "" : (stryCov_9fa48("9158"), 'q1-he-8k-caps')
  })
}), stryMutAct_9fa48("9159") ? {} : (stryCov_9fa48("9159"), {
  id: stryMutAct_9fa48("9160") ? "" : (stryCov_9fa48("9160"), 'tofu60'),
  name: stryMutAct_9fa48("9161") ? "" : (stryCov_9fa48("9161"), 'Tofu60 Redux'),
  brand: stryMutAct_9fa48("9162") ? "" : (stryCov_9fa48("9162"), 'KBDfans'),
  layout: stryMutAct_9fa48("9163") ? "" : (stryCov_9fa48("9163"), '60'),
  finish: stryMutAct_9fa48("9164") ? "" : (stryCov_9fa48("9164"), 'Aluminum'),
  mount: stryMutAct_9fa48("9165") ? "" : (stryCov_9fa48("9165"), 'Tray mount'),
  availability: stryMutAct_9fa48("9166") ? "" : (stryCov_9fa48("9166"), 'reference'),
  source: stryMutAct_9fa48("9167") ? "" : (stryCov_9fa48("9167"), 'https://kbdfans.com/products/tofu60-redux-plate'),
  note: stryMutAct_9fa48("9168") ? "" : (stryCov_9fa48("9168"), 'Redux PCB and plate references. Check revisions and the documented stabilizer exclusions.'),
  selection: stryMutAct_9fa48("9169") ? {} : (stryCov_9fa48("9169"), {
    ...contactChoices,
    case: stryMutAct_9fa48("9170") ? "" : (stryCov_9fa48("9170"), 'tofu-case'),
    pcb: stryMutAct_9fa48("9171") ? "" : (stryCov_9fa48("9171"), 'redux-pcb'),
    plate: stryMutAct_9fa48("9172") ? "" : (stryCov_9fa48("9172"), 'redux-plate'),
    stabilizers: stryMutAct_9fa48("9173") ? "" : (stryCov_9fa48("9173"), 'clip-stabs')
  })
}), stryMutAct_9fa48("9174") ? {} : (stryCov_9fa48("9174"), {
  id: stryMutAct_9fa48("9175") ? "" : (stryCov_9fa48("9175"), 'bakeneko60'),
  name: stryMutAct_9fa48("9176") ? "" : (stryCov_9fa48("9176"), 'Bakeneko60'),
  brand: stryMutAct_9fa48("9177") ? "" : (stryCov_9fa48("9177"), 'CannonKeys'),
  layout: stryMutAct_9fa48("9178") ? "" : (stryCov_9fa48("9178"), '60'),
  finish: stryMutAct_9fa48("9179") ? "" : (stryCov_9fa48("9179"), 'Aluminum'),
  mount: stryMutAct_9fa48("9180") ? "" : (stryCov_9fa48("9180"), 'O-ring mount'),
  availability: stryMutAct_9fa48("9181") ? "" : (stryCov_9fa48("9181"), 'reference'),
  source: stryMutAct_9fa48("9182") ? "" : (stryCov_9fa48("9182"), 'https://docs.cannonkeys.com/bakeneko/'),
  note: stryMutAct_9fa48("9183") ? "" : (stryCov_9fa48("9183"), 'AN-C V2 solder build from the guide. Clip-in stabilizers leave room for the O-ring.'),
  selection: stryMutAct_9fa48("9184") ? {} : (stryCov_9fa48("9184"), {
    ...contactChoices,
    case: stryMutAct_9fa48("9185") ? "" : (stryCov_9fa48("9185"), 'bakeneko-case'),
    pcb: stryMutAct_9fa48("9186") ? "" : (stryCov_9fa48("9186"), 'anc-pcb'),
    plate: stryMutAct_9fa48("9187") ? "" : (stryCov_9fa48("9187"), 'bakeneko-plate'),
    stabilizers: stryMutAct_9fa48("9188") ? "" : (stryCov_9fa48("9188"), 'clip-stabs')
  })
}), stryMutAct_9fa48("9189") ? {} : (stryCov_9fa48("9189"), {
  id: stryMutAct_9fa48("9190") ? "" : (stryCov_9fa48("9190"), 'nk65-entry'),
  name: stryMutAct_9fa48("9191") ? "" : (stryCov_9fa48("9191"), 'NK65 Entry Edition'),
  brand: stryMutAct_9fa48("9192") ? "" : (stryCov_9fa48("9192"), 'NovelKeys'),
  layout: stryMutAct_9fa48("9193") ? "" : (stryCov_9fa48("9193"), '65'),
  finish: stryMutAct_9fa48("9194") ? "" : (stryCov_9fa48("9194"), 'Polycarbonate'),
  mount: stryMutAct_9fa48("9195") ? "" : (stryCov_9fa48("9195"), 'Kit assembly'),
  availability: stryMutAct_9fa48("9196") ? "" : (stryCov_9fa48("9196"), 'retired'),
  source: nk65,
  note: stryMutAct_9fa48("9197") ? "" : (stryCov_9fa48("9197"), 'Retired product reference. The current archive describes a polycarbonate case and plate, MX hot-swap PCB and plate-mounted stabilizers.'),
  selection: stryMutAct_9fa48("9198") ? {} : (stryCov_9fa48("9198"), {
    ...contactChoices,
    case: stryMutAct_9fa48("9199") ? "" : (stryCov_9fa48("9199"), 'nk65-case'),
    pcb: stryMutAct_9fa48("9200") ? "" : (stryCov_9fa48("9200"), 'nk65-pcb'),
    plate: stryMutAct_9fa48("9201") ? "" : (stryCov_9fa48("9201"), 'nk65-plate'),
    stabilizers: stryMutAct_9fa48("9202") ? "" : (stryCov_9fa48("9202"), 'nk65-stabs')
  })
}), stryMutAct_9fa48("9203") ? {} : (stryCov_9fa48("9203"), {
  id: stryMutAct_9fa48("9204") ? "" : (stryCov_9fa48("9204"), 'q1-max'),
  name: stryMutAct_9fa48("9205") ? "" : (stryCov_9fa48("9205"), 'Q1 Max'),
  brand: stryMutAct_9fa48("9206") ? "" : (stryCov_9fa48("9206"), 'Keychron'),
  layout: stryMutAct_9fa48("9207") ? "" : (stryCov_9fa48("9207"), '75'),
  finish: stryMutAct_9fa48("9208") ? "" : (stryCov_9fa48("9208"), 'Aluminum'),
  mount: stryMutAct_9fa48("9209") ? "" : (stryCov_9fa48("9209"), 'Double gasket'),
  availability: stryMutAct_9fa48("9210") ? "" : (stryCov_9fa48("9210"), 'reference'),
  source: q1Max,
  note: stryMutAct_9fa48("9211") ? "" : (stryCov_9fa48("9211"), 'Mechanical Q1 Max assembly. 1,000 Hz wired and 2.4 GHz; 90 Hz Bluetooth, per Keychron. Bundled parts are references, not separate offers.'),
  selection: stryMutAct_9fa48("9212") ? {} : (stryCov_9fa48("9212"), {
    ...contactChoices,
    case: stryMutAct_9fa48("9213") ? "" : (stryCov_9fa48("9213"), 'q1-max-case'),
    pcb: stryMutAct_9fa48("9214") ? "" : (stryCov_9fa48("9214"), 'q1-max-pcb'),
    plate: stryMutAct_9fa48("9215") ? "" : (stryCov_9fa48("9215"), 'q1-max-plate'),
    stabilizers: stryMutAct_9fa48("9216") ? "" : (stryCov_9fa48("9216"), 'q1-max-stabs')
  })
}), stryMutAct_9fa48("9217") ? {} : (stryCov_9fa48("9217"), {
  id: stryMutAct_9fa48("9218") ? "" : (stryCov_9fa48("9218"), 'q1-he'),
  name: stryMutAct_9fa48("9219") ? "" : (stryCov_9fa48("9219"), 'Q1 HE'),
  brand: stryMutAct_9fa48("9220") ? "" : (stryCov_9fa48("9220"), 'Keychron'),
  layout: stryMutAct_9fa48("9221") ? "" : (stryCov_9fa48("9221"), '75'),
  finish: stryMutAct_9fa48("9222") ? "" : (stryCov_9fa48("9222"), 'Aluminum'),
  mount: stryMutAct_9fa48("9223") ? "" : (stryCov_9fa48("9223"), 'Double gasket'),
  availability: stryMutAct_9fa48("9224") ? "" : (stryCov_9fa48("9224"), 'reference'),
  source: q1He,
  note: stryMutAct_9fa48("9225") ? "" : (stryCov_9fa48("9225"), 'Original Q1 HE, separate from the HE 8K model. Keychron currently describes TMR sensing and a specific Gateron Double-Rail switch family.'),
  selection: stryMutAct_9fa48("9226") ? {} : (stryCov_9fa48("9226"), {
    case: stryMutAct_9fa48("9227") ? "" : (stryCov_9fa48("9227"), 'q1-he-case'),
    pcb: stryMutAct_9fa48("9228") ? "" : (stryCov_9fa48("9228"), 'q1-he-pcb'),
    plate: stryMutAct_9fa48("9229") ? "" : (stryCov_9fa48("9229"), 'q1-he-plate'),
    stabilizers: stryMutAct_9fa48("9230") ? "" : (stryCov_9fa48("9230"), 'q1-he-stabs'),
    switch: stryMutAct_9fa48("9231") ? "" : (stryCov_9fa48("9231"), 'double-rail-nebula'),
    keycaps: stryMutAct_9fa48("9232") ? "" : (stryCov_9fa48("9232"), 'keychron-bow')
  })
})]);
const kitParts: {
  id: string;
  name: string;
  brand: string;
  source: string;
  family: string;
  category: Part['category'];
  detail: string;
}[] = stryMutAct_9fa48("9233") ? [] : (stryCov_9fa48("9233"), [stryMutAct_9fa48("9234") ? {} : (stryCov_9fa48("9234"), {
  id: stryMutAct_9fa48("9235") ? "" : (stryCov_9fa48("9235"), 'q1-he-8k-case'),
  name: stryMutAct_9fa48("9236") ? "" : (stryCov_9fa48("9236"), 'Q1 HE 8K case'),
  brand: stryMutAct_9fa48("9237") ? "" : (stryCov_9fa48("9237"), 'Keychron'),
  source: q1He8k,
  family: stryMutAct_9fa48("9238") ? "" : (stryCov_9fa48("9238"), 'q1-he-8k'),
  category: stryMutAct_9fa48("9239") ? "" : (stryCov_9fa48("9239"), 'case'),
  detail: stryMutAct_9fa48("9240") ? "" : (stryCov_9fa48("9240"), 'Factory component · aluminum · 75%')
}), stryMutAct_9fa48("9241") ? {} : (stryCov_9fa48("9241"), {
  id: stryMutAct_9fa48("9242") ? "" : (stryCov_9fa48("9242"), 'q1-he-8k-pcb'),
  name: stryMutAct_9fa48("9243") ? "" : (stryCov_9fa48("9243"), 'Q1 HE 8K PCB'),
  brand: stryMutAct_9fa48("9244") ? "" : (stryCov_9fa48("9244"), 'Keychron'),
  source: q1He8k,
  family: stryMutAct_9fa48("9245") ? "" : (stryCov_9fa48("9245"), 'q1-he-8k'),
  category: stryMutAct_9fa48("9246") ? "" : (stryCov_9fa48("9246"), 'pcb'),
  detail: stryMutAct_9fa48("9247") ? "" : (stryCov_9fa48("9247"), 'Factory component · wired magnetic · 1,000/2,000/8,000 Hz polling')
}), stryMutAct_9fa48("9248") ? {} : (stryCov_9fa48("9248"), {
  id: stryMutAct_9fa48("9249") ? "" : (stryCov_9fa48("9249"), 'q1-he-8k-plate'),
  name: stryMutAct_9fa48("9250") ? "" : (stryCov_9fa48("9250"), 'Q1 HE 8K plate'),
  brand: stryMutAct_9fa48("9251") ? "" : (stryCov_9fa48("9251"), 'Keychron'),
  source: q1He8k,
  family: stryMutAct_9fa48("9252") ? "" : (stryCov_9fa48("9252"), 'q1-he-8k'),
  category: stryMutAct_9fa48("9253") ? "" : (stryCov_9fa48("9253"), 'plate'),
  detail: stryMutAct_9fa48("9254") ? "" : (stryCov_9fa48("9254"), 'Factory component · aluminum plate')
}), stryMutAct_9fa48("9255") ? {} : (stryCov_9fa48("9255"), {
  id: stryMutAct_9fa48("9256") ? "" : (stryCov_9fa48("9256"), 'q1-he-8k-stabs'),
  name: stryMutAct_9fa48("9257") ? "" : (stryCov_9fa48("9257"), 'Q1 HE 8K factory stabilizers'),
  brand: stryMutAct_9fa48("9258") ? "" : (stryCov_9fa48("9258"), 'Keychron'),
  source: q1He8k,
  family: stryMutAct_9fa48("9259") ? "" : (stryCov_9fa48("9259"), 'screw'),
  category: stryMutAct_9fa48("9260") ? "" : (stryCov_9fa48("9260"), 'stabilizers'),
  detail: stryMutAct_9fa48("9261") ? "" : (stryCov_9fa48("9261"), 'Factory component · PCB screw-in')
}), stryMutAct_9fa48("9262") ? {} : (stryCov_9fa48("9262"), {
  id: stryMutAct_9fa48("9263") ? "" : (stryCov_9fa48("9263"), 'q1-he-8k-caps'),
  name: stryMutAct_9fa48("9264") ? "" : (stryCov_9fa48("9264"), 'Q1 HE 8K factory keycaps'),
  brand: stryMutAct_9fa48("9265") ? "" : (stryCov_9fa48("9265"), 'Keychron'),
  source: q1He8k,
  family: stryMutAct_9fa48("9266") ? "" : (stryCov_9fa48("9266"), 'mx'),
  category: stryMutAct_9fa48("9267") ? "" : (stryCov_9fa48("9267"), 'keycaps'),
  detail: stryMutAct_9fa48("9268") ? "" : (stryCov_9fa48("9268"), 'Factory component · OSA profile · double-shot PBT; verify exact layout variant')
}), stryMutAct_9fa48("9269") ? {} : (stryCov_9fa48("9269"), {
  id: stryMutAct_9fa48("9270") ? "" : (stryCov_9fa48("9270"), 'ultrafast-lime'),
  name: stryMutAct_9fa48("9271") ? "" : (stryCov_9fa48("9271"), 'Ultra-Fast Lime Magnetic'),
  brand: stryMutAct_9fa48("9272") ? "" : (stryCov_9fa48("9272"), 'Keychron'),
  source: lime,
  family: stryMutAct_9fa48("9273") ? "" : (stryCov_9fa48("9273"), 'keychron-ultrafast'),
  category: stryMutAct_9fa48("9274") ? "" : (stryCov_9fa48("9274"), 'switch'),
  detail: stryMutAct_9fa48("9275") ? "" : (stryCov_9fa48("9275"), 'Magnetic · manufacturer-listed for Q HE 8K; not a mechanical contact switch')
}), stryMutAct_9fa48("9276") ? {} : (stryCov_9fa48("9276"), {
  id: stryMutAct_9fa48("9277") ? "" : (stryCov_9fa48("9277"), 'nk65-case'),
  name: stryMutAct_9fa48("9278") ? "" : (stryCov_9fa48("9278"), 'NK65 Entry case'),
  brand: stryMutAct_9fa48("9279") ? "" : (stryCov_9fa48("9279"), 'NovelKeys'),
  source: nk65,
  family: stryMutAct_9fa48("9280") ? "" : (stryCov_9fa48("9280"), 'nk65-entry'),
  category: stryMutAct_9fa48("9281") ? "" : (stryCov_9fa48("9281"), 'case'),
  detail: stryMutAct_9fa48("9282") ? "" : (stryCov_9fa48("9282"), '65% · injection-molded polycarbonate · retired kit')
}), stryMutAct_9fa48("9283") ? {} : (stryCov_9fa48("9283"), {
  id: stryMutAct_9fa48("9284") ? "" : (stryCov_9fa48("9284"), 'nk65-pcb'),
  name: stryMutAct_9fa48("9285") ? "" : (stryCov_9fa48("9285"), 'NK65 Entry PCB'),
  brand: stryMutAct_9fa48("9286") ? "" : (stryCov_9fa48("9286"), 'NovelKeys'),
  source: nk65,
  family: stryMutAct_9fa48("9287") ? "" : (stryCov_9fa48("9287"), 'nk65-entry'),
  category: stryMutAct_9fa48("9288") ? "" : (stryCov_9fa48("9288"), 'pcb'),
  detail: stryMutAct_9fa48("9289") ? "" : (stryCov_9fa48("9289"), 'Kit component · fixed 65% · 3/5-pin MX hot-swap · VIA')
}), stryMutAct_9fa48("9290") ? {} : (stryCov_9fa48("9290"), {
  id: stryMutAct_9fa48("9291") ? "" : (stryCov_9fa48("9291"), 'nk65-plate'),
  name: stryMutAct_9fa48("9292") ? "" : (stryCov_9fa48("9292"), 'NK65 Entry plate'),
  brand: stryMutAct_9fa48("9293") ? "" : (stryCov_9fa48("9293"), 'NovelKeys'),
  source: nk65,
  family: stryMutAct_9fa48("9294") ? "" : (stryCov_9fa48("9294"), 'nk65-entry'),
  category: stryMutAct_9fa48("9295") ? "" : (stryCov_9fa48("9295"), 'plate'),
  detail: stryMutAct_9fa48("9296") ? "" : (stryCov_9fa48("9296"), 'Kit component · polycarbonate in the archived listing')
}), stryMutAct_9fa48("9297") ? {} : (stryCov_9fa48("9297"), {
  id: stryMutAct_9fa48("9298") ? "" : (stryCov_9fa48("9298"), 'nk65-stabs'),
  name: stryMutAct_9fa48("9299") ? "" : (stryCov_9fa48("9299"), 'NK65 kit stabilizers'),
  brand: stryMutAct_9fa48("9300") ? "" : (stryCov_9fa48("9300"), 'NovelKeys'),
  source: nk65,
  family: stryMutAct_9fa48("9301") ? "" : (stryCov_9fa48("9301"), 'plate-mount'),
  category: stryMutAct_9fa48("9302") ? "" : (stryCov_9fa48("9302"), 'stabilizers'),
  detail: stryMutAct_9fa48("9303") ? "" : (stryCov_9fa48("9303"), 'Included NK plate-mounted stabilizers · NK65 Entry')
}), stryMutAct_9fa48("9304") ? {} : (stryCov_9fa48("9304"), {
  id: stryMutAct_9fa48("9305") ? "" : (stryCov_9fa48("9305"), 'q1-max-case'),
  name: stryMutAct_9fa48("9306") ? "" : (stryCov_9fa48("9306"), 'Q1 Max case'),
  brand: stryMutAct_9fa48("9307") ? "" : (stryCov_9fa48("9307"), 'Keychron'),
  source: q1Max,
  family: stryMutAct_9fa48("9308") ? "" : (stryCov_9fa48("9308"), 'q1-max'),
  category: stryMutAct_9fa48("9309") ? "" : (stryCov_9fa48("9309"), 'case'),
  detail: stryMutAct_9fa48("9310") ? "" : (stryCov_9fa48("9310"), 'Assembly component · 75% · CNC 6063 aluminum')
}), stryMutAct_9fa48("9311") ? {} : (stryCov_9fa48("9311"), {
  id: stryMutAct_9fa48("9312") ? "" : (stryCov_9fa48("9312"), 'q1-max-pcb'),
  name: stryMutAct_9fa48("9313") ? "" : (stryCov_9fa48("9313"), 'Q1 Max PCB'),
  brand: stryMutAct_9fa48("9314") ? "" : (stryCov_9fa48("9314"), 'Keychron'),
  source: q1Max,
  family: stryMutAct_9fa48("9315") ? "" : (stryCov_9fa48("9315"), 'q1-max'),
  category: stryMutAct_9fa48("9316") ? "" : (stryCov_9fa48("9316"), 'pcb'),
  detail: stryMutAct_9fa48("9317") ? "" : (stryCov_9fa48("9317"), 'Assembly component · 3/5-pin MX contact hot-swap · QMK')
}), stryMutAct_9fa48("9318") ? {} : (stryCov_9fa48("9318"), {
  id: stryMutAct_9fa48("9319") ? "" : (stryCov_9fa48("9319"), 'q1-max-plate'),
  name: stryMutAct_9fa48("9320") ? "" : (stryCov_9fa48("9320"), 'Q1 Max PC plate'),
  brand: stryMutAct_9fa48("9321") ? "" : (stryCov_9fa48("9321"), 'Keychron'),
  source: q1Max,
  family: stryMutAct_9fa48("9322") ? "" : (stryCov_9fa48("9322"), 'q1-max'),
  category: stryMutAct_9fa48("9323") ? "" : (stryCov_9fa48("9323"), 'plate'),
  detail: stryMutAct_9fa48("9324") ? "" : (stryCov_9fa48("9324"), 'Assembly component · polycarbonate · double gasket')
}), stryMutAct_9fa48("9325") ? {} : (stryCov_9fa48("9325"), {
  id: stryMutAct_9fa48("9326") ? "" : (stryCov_9fa48("9326"), 'q1-max-stabs'),
  name: stryMutAct_9fa48("9327") ? "" : (stryCov_9fa48("9327"), 'Q1 Max factory stabilizers'),
  brand: stryMutAct_9fa48("9328") ? "" : (stryCov_9fa48("9328"), 'Keychron'),
  source: q1Max,
  family: stryMutAct_9fa48("9329") ? "" : (stryCov_9fa48("9329"), 'screw'),
  category: stryMutAct_9fa48("9330") ? "" : (stryCov_9fa48("9330"), 'stabilizers'),
  detail: stryMutAct_9fa48("9331") ? "" : (stryCov_9fa48("9331"), 'Assembly component · PCB-mounted screw-in stabilizers')
}), stryMutAct_9fa48("9332") ? {} : (stryCov_9fa48("9332"), {
  id: stryMutAct_9fa48("9333") ? "" : (stryCov_9fa48("9333"), 'q1-he-case'),
  name: stryMutAct_9fa48("9334") ? "" : (stryCov_9fa48("9334"), 'Q1 HE case'),
  brand: stryMutAct_9fa48("9335") ? "" : (stryCov_9fa48("9335"), 'Keychron'),
  source: q1He,
  family: stryMutAct_9fa48("9336") ? "" : (stryCov_9fa48("9336"), 'q1-he'),
  category: stryMutAct_9fa48("9337") ? "" : (stryCov_9fa48("9337"), 'case'),
  detail: stryMutAct_9fa48("9338") ? "" : (stryCov_9fa48("9338"), 'Original Q1 HE assembly · 75% · aluminum')
}), stryMutAct_9fa48("9339") ? {} : (stryCov_9fa48("9339"), {
  id: stryMutAct_9fa48("9340") ? "" : (stryCov_9fa48("9340"), 'q1-he-pcb'),
  name: stryMutAct_9fa48("9341") ? "" : (stryCov_9fa48("9341"), 'Q1 HE sensor PCB'),
  brand: stryMutAct_9fa48("9342") ? "" : (stryCov_9fa48("9342"), 'Keychron'),
  source: q1He,
  family: stryMutAct_9fa48("9343") ? "" : (stryCov_9fa48("9343"), 'q1-he'),
  category: stryMutAct_9fa48("9344") ? "" : (stryCov_9fa48("9344"), 'pcb'),
  detail: stryMutAct_9fa48("9345") ? "" : (stryCov_9fa48("9345"), 'Original Q1 HE assembly · Gateron Double-Rail compatibility only')
}), stryMutAct_9fa48("9346") ? {} : (stryCov_9fa48("9346"), {
  id: stryMutAct_9fa48("9347") ? "" : (stryCov_9fa48("9347"), 'q1-he-plate'),
  name: stryMutAct_9fa48("9348") ? "" : (stryCov_9fa48("9348"), 'Q1 HE aluminum plate'),
  brand: stryMutAct_9fa48("9349") ? "" : (stryCov_9fa48("9349"), 'Keychron'),
  source: q1He,
  family: stryMutAct_9fa48("9350") ? "" : (stryCov_9fa48("9350"), 'q1-he'),
  category: stryMutAct_9fa48("9351") ? "" : (stryCov_9fa48("9351"), 'plate'),
  detail: stryMutAct_9fa48("9352") ? "" : (stryCov_9fa48("9352"), 'Included in the original Q1 HE fully assembled keyboard')
}), stryMutAct_9fa48("9353") ? {} : (stryCov_9fa48("9353"), {
  id: stryMutAct_9fa48("9354") ? "" : (stryCov_9fa48("9354"), 'q1-he-stabs'),
  name: stryMutAct_9fa48("9355") ? "" : (stryCov_9fa48("9355"), 'Q1 HE factory stabilizers'),
  brand: stryMutAct_9fa48("9356") ? "" : (stryCov_9fa48("9356"), 'Keychron'),
  source: q1He,
  family: stryMutAct_9fa48("9357") ? "" : (stryCov_9fa48("9357"), 'screw'),
  category: stryMutAct_9fa48("9358") ? "" : (stryCov_9fa48("9358"), 'stabilizers'),
  detail: stryMutAct_9fa48("9359") ? "" : (stryCov_9fa48("9359"), 'Original Q1 HE assembly · screw-in PCB stabilizers')
})]);
export const extraParts: Part[] = stryMutAct_9fa48("9360") ? [] : (stryCov_9fa48("9360"), [...kitParts.map(stryMutAct_9fa48("9361") ? () => undefined : (stryCov_9fa48("9361"), (part): Part => stryMutAct_9fa48("9362") ? {} : (stryCov_9fa48("9362"), {
  ...part,
  evidence: stryMutAct_9fa48("9363") ? "" : (stryCov_9fa48("9363"), 'documented')
}))), stryMutAct_9fa48("9364") ? {} : (stryCov_9fa48("9364"), {
  id: stryMutAct_9fa48("9365") ? "" : (stryCov_9fa48("9365"), 'oil-king'),
  name: stryMutAct_9fa48("9366") ? "" : (stryCov_9fa48("9366"), 'Oil King'),
  brand: stryMutAct_9fa48("9367") ? "" : (stryCov_9fa48("9367"), 'Gateron'),
  category: stryMutAct_9fa48("9368") ? "" : (stryCov_9fa48("9368"), 'switch'),
  family: stryMutAct_9fa48("9369") ? "" : (stryCov_9fa48("9369"), 'mx'),
  evidence: stryMutAct_9fa48("9370") ? "" : (stryCov_9fa48("9370"), 'documented'),
  detail: stryMutAct_9fa48("9371") ? "" : (stryCov_9fa48("9371"), 'Linear · 55 ± 5 gf operating · 4 mm travel · 5-pin · factory lubed'),
  source: stryMutAct_9fa48("9372") ? "" : (stryCov_9fa48("9372"), 'https://www.gateron.com/products/gateron-oil-king-pre-lubed-switches-linear')
}), ...(stryMutAct_9fa48("9373") ? [] : (stryCov_9fa48("9373"), [stryMutAct_9fa48("9374") ? [] : (stryCov_9fa48("9374"), [stryMutAct_9fa48("9375") ? "" : (stryCov_9fa48("9375"), 'white'), stryMutAct_9fa48("9376") ? "" : (stryCov_9fa48("9376"), 'White'), stryMutAct_9fa48("9377") ? "" : (stryCov_9fa48("9377"), 'Linear · 38 ± 15 gf')]), stryMutAct_9fa48("9378") ? [] : (stryCov_9fa48("9378"), [stryMutAct_9fa48("9379") ? "" : (stryCov_9fa48("9379"), 'silver'), stryMutAct_9fa48("9380") ? "" : (stryCov_9fa48("9380"), 'Silver'), stryMutAct_9fa48("9381") ? "" : (stryCov_9fa48("9381"), 'Linear · 45 ± 15 gf · 1.2 mm nominal pre-travel')]), stryMutAct_9fa48("9382") ? [] : (stryCov_9fa48("9382"), [stryMutAct_9fa48("9383") ? "" : (stryCov_9fa48("9383"), 'red'), stryMutAct_9fa48("9384") ? "" : (stryCov_9fa48("9384"), 'Red'), stryMutAct_9fa48("9385") ? "" : (stryCov_9fa48("9385"), 'Linear · 45 ± 15 gf')]), stryMutAct_9fa48("9386") ? [] : (stryCov_9fa48("9386"), [stryMutAct_9fa48("9387") ? "" : (stryCov_9fa48("9387"), 'yellow'), stryMutAct_9fa48("9388") ? "" : (stryCov_9fa48("9388"), 'Yellow'), stryMutAct_9fa48("9389") ? "" : (stryCov_9fa48("9389"), 'Linear · 50 ± 15 gf')]), stryMutAct_9fa48("9390") ? [] : (stryCov_9fa48("9390"), [stryMutAct_9fa48("9391") ? "" : (stryCov_9fa48("9391"), 'black'), stryMutAct_9fa48("9392") ? "" : (stryCov_9fa48("9392"), 'Black'), stryMutAct_9fa48("9393") ? "" : (stryCov_9fa48("9393"), 'Linear · 60 ± 15 gf')]), stryMutAct_9fa48("9394") ? [] : (stryCov_9fa48("9394"), [stryMutAct_9fa48("9395") ? "" : (stryCov_9fa48("9395"), 'brown'), stryMutAct_9fa48("9396") ? "" : (stryCov_9fa48("9396"), 'Brown'), stryMutAct_9fa48("9397") ? "" : (stryCov_9fa48("9397"), 'Tactile · 55 ± 15 gf')]), stryMutAct_9fa48("9398") ? [] : (stryCov_9fa48("9398"), [stryMutAct_9fa48("9399") ? "" : (stryCov_9fa48("9399"), 'blue'), stryMutAct_9fa48("9400") ? "" : (stryCov_9fa48("9400"), 'Blue'), stryMutAct_9fa48("9401") ? "" : (stryCov_9fa48("9401"), 'Clicky · 60 ± 15 gf')])])).map(stryMutAct_9fa48("9402") ? () => undefined : (stryCov_9fa48("9402"), ([id, name, detail]): Part => stryMutAct_9fa48("9403") ? {} : (stryCov_9fa48("9403"), {
  id: (stryMutAct_9fa48("9404") ? "" : (stryCov_9fa48("9404"), 'g-pro-3-')) + id,
  name: (stryMutAct_9fa48("9405") ? "" : (stryCov_9fa48("9405"), 'G Pro 3.0 ')) + name,
  brand: stryMutAct_9fa48("9406") ? "" : (stryCov_9fa48("9406"), 'Gateron'),
  category: stryMutAct_9fa48("9407") ? "" : (stryCov_9fa48("9407"), 'switch'),
  family: stryMutAct_9fa48("9408") ? "" : (stryCov_9fa48("9408"), 'mx'),
  evidence: stryMutAct_9fa48("9409") ? "" : (stryCov_9fa48("9409"), 'documented'),
  source: gPro,
  detail: detail + (stryMutAct_9fa48("9410") ? "" : (stryCov_9fa48("9410"), ' · 3/5-pin variants; select the exact pack before buying'))
}))), ...(stryMutAct_9fa48("9411") ? [] : (stryCov_9fa48("9411"), [stryMutAct_9fa48("9412") ? "" : (stryCov_9fa48("9412"), 'Dawn'), stryMutAct_9fa48("9413") ? "" : (stryCov_9fa48("9413"), 'Nebula'), stryMutAct_9fa48("9414") ? "" : (stryCov_9fa48("9414"), 'Aurora')])).map(stryMutAct_9fa48("9415") ? () => undefined : (stryCov_9fa48("9415"), (name): Part => stryMutAct_9fa48("9416") ? {} : (stryCov_9fa48("9416"), {
  id: (stryMutAct_9fa48("9417") ? "" : (stryCov_9fa48("9417"), 'double-rail-')) + (stryMutAct_9fa48("9418") ? name.toUpperCase() : (stryCov_9fa48("9418"), name.toLowerCase())),
  name: (stryMutAct_9fa48("9419") ? "" : (stryCov_9fa48("9419"), 'Double-Rail Magnetic ')) + name,
  brand: stryMutAct_9fa48("9420") ? "" : (stryCov_9fa48("9420"), 'Gateron'),
  category: stryMutAct_9fa48("9421") ? "" : (stryCov_9fa48("9421"), 'switch'),
  family: stryMutAct_9fa48("9422") ? "" : (stryCov_9fa48("9422"), 'keychron-double-rail'),
  evidence: stryMutAct_9fa48("9423") ? "" : (stryCov_9fa48("9423"), 'documented'),
  source: doubleRail,
  detail: stryMutAct_9fa48("9424") ? "" : (stryCov_9fa48("9424"), 'Linear magnetic · Keychron-listed family for original Q HE; excludes Q HE 8K')
}))), ...(stryMutAct_9fa48("9425") ? [] : (stryCov_9fa48("9425"), [stryMutAct_9fa48("9426") ? "" : (stryCov_9fa48("9426"), 'Jade'), stryMutAct_9fa48("9427") ? "" : (stryCov_9fa48("9427"), 'KS-20')])).map(stryMutAct_9fa48("9428") ? () => undefined : (stryCov_9fa48("9428"), (name): Part => stryMutAct_9fa48("9429") ? {} : (stryCov_9fa48("9429"), {
  id: (stryMutAct_9fa48("9430") ? "" : (stryCov_9fa48("9430"), 'magnetic-')) + (stryMutAct_9fa48("9431") ? name.toUpperCase() : (stryCov_9fa48("9431"), name.toLowerCase())),
  name: (stryMutAct_9fa48("9432") ? "" : (stryCov_9fa48("9432"), 'Magnetic ')) + name,
  brand: stryMutAct_9fa48("9433") ? "" : (stryCov_9fa48("9433"), 'Gateron'),
  category: stryMutAct_9fa48("9434") ? "" : (stryCov_9fa48("9434"), 'switch'),
  family: stryMutAct_9fa48("9435") ? "" : (stryCov_9fa48("9435"), 'he'),
  evidence: stryMutAct_9fa48("9436") ? "" : (stryCov_9fa48("9436"), 'documented'),
  source: q1He,
  detail: stryMutAct_9fa48("9437") ? "" : (stryCov_9fa48("9437"), 'Magnetic switch reference · explicitly excluded from original Q1 HE compatibility')
}))), stryMutAct_9fa48("9438") ? {} : (stryCov_9fa48("9438"), {
  id: stryMutAct_9fa48("9439") ? "" : (stryCov_9fa48("9439"), 'keychron-bow'),
  name: stryMutAct_9fa48("9440") ? "" : (stryCov_9fa48("9440"), 'Cherry PBT Black on White'),
  brand: stryMutAct_9fa48("9441") ? "" : (stryCov_9fa48("9441"), 'Keychron'),
  category: stryMutAct_9fa48("9442") ? "" : (stryCov_9fa48("9442"), 'keycaps'),
  family: stryMutAct_9fa48("9443") ? "" : (stryCov_9fa48("9443"), 'mx'),
  evidence: stryMutAct_9fa48("9444") ? "" : (stryCov_9fa48("9444"), 'documented'),
  source: stryMutAct_9fa48("9445") ? "" : (stryCov_9fa48("9445"), 'https://www.keychron.com/collections/cherry-profile-double-shot-pbt-keycaps/products/cherry-profile-double-shot-pbt-full-set-keycaps-black-on-white-bow'),
  detail: stryMutAct_9fa48("9446") ? "" : (stryCov_9fa48("9446"), '218 keys · double-shot PBT · 1.5 mm · Cherry profile · MX stems · ANSI / ISO-UK')
}), stryMutAct_9fa48("9447") ? {} : (stryCov_9fa48("9447"), {
  id: stryMutAct_9fa48("9448") ? "" : (stryCov_9fa48("9448"), 'keychron-hacker'),
  name: stryMutAct_9fa48("9449") ? "" : (stryCov_9fa48("9449"), 'Cherry PBT Hacker Mint'),
  brand: stryMutAct_9fa48("9450") ? "" : (stryCov_9fa48("9450"), 'Keychron'),
  category: stryMutAct_9fa48("9451") ? "" : (stryCov_9fa48("9451"), 'keycaps'),
  family: stryMutAct_9fa48("9452") ? "" : (stryCov_9fa48("9452"), 'mx'),
  evidence: stryMutAct_9fa48("9453") ? "" : (stryCov_9fa48("9453"), 'documented'),
  source: stryMutAct_9fa48("9454") ? "" : (stryCov_9fa48("9454"), 'https://www.keychron.com/collections/cherry-profile-double-shot-pbt-keycaps/products/double-shot-pbt-cherry-full-set-keycap-set-hacker'),
  detail: stryMutAct_9fa48("9455") ? "" : (stryCov_9fa48("9455"), '218 keys · double-shot PBT · 1.5 mm · Cherry profile · MX stems · ANSI / ISO-UK')
}), stryMutAct_9fa48("9456") ? {} : (stryCov_9fa48("9456"), {
  id: stryMutAct_9fa48("9457") ? "" : (stryCov_9fa48("9457"), 'keychron-shine'),
  name: stryMutAct_9fa48("9458") ? "" : (stryCov_9fa48("9458"), 'Cherry PBT Shine-Through'),
  brand: stryMutAct_9fa48("9459") ? "" : (stryCov_9fa48("9459"), 'Keychron'),
  category: stryMutAct_9fa48("9460") ? "" : (stryCov_9fa48("9460"), 'keycaps'),
  family: stryMutAct_9fa48("9461") ? "" : (stryCov_9fa48("9461"), 'mx'),
  evidence: stryMutAct_9fa48("9462") ? "" : (stryCov_9fa48("9462"), 'documented'),
  source: stryMutAct_9fa48("9463") ? "" : (stryCov_9fa48("9463"), 'https://www.keychron.com/products/cherry-profile-double-shot-pbt-shine-through-keycap-set'),
  detail: stryMutAct_9fa48("9464") ? "" : (stryCov_9fa48("9464"), '121 keys · PBT · Cherry profile · MX stems · ANSI · no Scroll Lock or Pause Break keys')
})]);
export type SwitchInterface = 'mx-contact' | 'keychron-double-rail' | 'keychron-ultrafast' | 'other-magnetic';
export const pcbInterfaces: Record<string, SwitchInterface> = stryMutAct_9fa48("9465") ? {} : (stryCov_9fa48("9465"), {
  'redux-pcb': stryMutAct_9fa48("9466") ? "" : (stryCov_9fa48("9466"), 'mx-contact'),
  'anc-pcb': stryMutAct_9fa48("9467") ? "" : (stryCov_9fa48("9467"), 'mx-contact'),
  'nk65-pcb': stryMutAct_9fa48("9468") ? "" : (stryCov_9fa48("9468"), 'mx-contact'),
  'q1-max-pcb': stryMutAct_9fa48("9469") ? "" : (stryCov_9fa48("9469"), 'mx-contact'),
  'q1-he-pcb': stryMutAct_9fa48("9470") ? "" : (stryCov_9fa48("9470"), 'keychron-double-rail'),
  'q1-he-8k-pcb': stryMutAct_9fa48("9471") ? "" : (stryCov_9fa48("9471"), 'keychron-ultrafast')
});
export function switchInterface(part: Part): SwitchInterface | undefined {
  if (stryMutAct_9fa48("9472")) {
    {}
  } else {
    stryCov_9fa48("9472");
    if (stryMutAct_9fa48("9475") ? part.category !== 'switch' && part.evidence !== 'documented' : stryMutAct_9fa48("9474") ? false : stryMutAct_9fa48("9473") ? true : (stryCov_9fa48("9473", "9474", "9475"), (stryMutAct_9fa48("9477") ? part.category === 'switch' : stryMutAct_9fa48("9476") ? false : (stryCov_9fa48("9476", "9477"), part.category !== (stryMutAct_9fa48("9478") ? "" : (stryCov_9fa48("9478"), 'switch')))) || (stryMutAct_9fa48("9480") ? part.evidence === 'documented' : stryMutAct_9fa48("9479") ? false : (stryCov_9fa48("9479", "9480"), part.evidence !== (stryMutAct_9fa48("9481") ? "" : (stryCov_9fa48("9481"), 'documented')))))) return;
    if (stryMutAct_9fa48("9484") ? part.family !== 'mx' : stryMutAct_9fa48("9483") ? false : stryMutAct_9fa48("9482") ? true : (stryCov_9fa48("9482", "9483", "9484"), part.family === (stryMutAct_9fa48("9485") ? "" : (stryCov_9fa48("9485"), 'mx')))) return stryMutAct_9fa48("9486") ? "" : (stryCov_9fa48("9486"), 'mx-contact');
    if (stryMutAct_9fa48("9489") ? part.family !== 'keychron-double-rail' : stryMutAct_9fa48("9488") ? false : stryMutAct_9fa48("9487") ? true : (stryCov_9fa48("9487", "9488", "9489"), part.family === (stryMutAct_9fa48("9490") ? "" : (stryCov_9fa48("9490"), 'keychron-double-rail')))) return stryMutAct_9fa48("9491") ? "" : (stryCov_9fa48("9491"), 'keychron-double-rail');
    if (stryMutAct_9fa48("9494") ? part.family !== 'keychron-ultrafast' : stryMutAct_9fa48("9493") ? false : stryMutAct_9fa48("9492") ? true : (stryCov_9fa48("9492", "9493", "9494"), part.family === (stryMutAct_9fa48("9495") ? "" : (stryCov_9fa48("9495"), 'keychron-ultrafast')))) return stryMutAct_9fa48("9496") ? "" : (stryCov_9fa48("9496"), 'keychron-ultrafast');
    if (stryMutAct_9fa48("9499") ? part.family !== 'he' : stryMutAct_9fa48("9498") ? false : stryMutAct_9fa48("9497") ? true : (stryCov_9fa48("9497", "9498", "9499"), part.family === (stryMutAct_9fa48("9500") ? "" : (stryCov_9fa48("9500"), 'he')))) return stryMutAct_9fa48("9501") ? "" : (stryCov_9fa48("9501"), 'other-magnetic');
  }
}
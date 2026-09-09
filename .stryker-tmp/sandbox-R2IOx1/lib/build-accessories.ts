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
export type AccessoryKind = 'knob' | 'encoder' | 'screen' | 'buttons' | 'macropad' | 'artisan';
export type AccessoryLocation = {
  kind: 'embedded';
  slotId: string;
} | {
  kind: 'external';
  position: 'left' | 'right' | 'above';
} | {
  kind: 'key';
  keyId: string;
};
type ProductInfo = {
  id: string;
  name: string;
  brand: string;
  detail: string;
  source: string;
};
export type AccessoryProduct = ProductInfo & ({
  kind: 'artisan';
  placement: 'key';
  sizeU: number | null;
  stem: 'mx' | 'choc' | null;
} | {
  kind: 'knob' | 'encoder';
  placement: 'embedded';
  sizeU: null;
  stem: null;
} | {
  kind: 'screen' | 'buttons';
  placement: 'embedded' | 'external';
  sizeU: null;
  stem: null;
} | {
  kind: 'macropad';
  placement: 'external';
  sizeU: null;
  stem: null;
});
export const accessoryCatalog: readonly AccessoryProduct[] = stryMutAct_9fa48("5812") ? [] : (stryCov_9fa48("5812"), [stryMutAct_9fa48("5813") ? {} : (stryCov_9fa48("5813"), {
  id: stryMutAct_9fa48("5814") ? "" : (stryCov_9fa48("5814"), 'keychron-aluminum-knob'),
  name: stryMutAct_9fa48("5815") ? "" : (stryCov_9fa48("5815"), 'Aluminum knob'),
  brand: stryMutAct_9fa48("5816") ? "" : (stryCov_9fa48("5816"), 'Keychron'),
  kind: stryMutAct_9fa48("5817") ? "" : (stryCov_9fa48("5817"), 'knob'),
  placement: stryMutAct_9fa48("5818") ? "" : (stryCov_9fa48("5818"), 'embedded'),
  sizeU: null,
  stem: null,
  detail: stryMutAct_9fa48("5819") ? "" : (stryCov_9fa48("5819"), 'Replacement cap for supported Keychron knob versions. Does not add an encoder to a PCB.'),
  source: stryMutAct_9fa48("5820") ? "" : (stryCov_9fa48("5820"), 'https://www.keychron.com/products/keychron-aluminum-knob')
}), stryMutAct_9fa48("5821") ? {} : (stryCov_9fa48("5821"), {
  id: stryMutAct_9fa48("5822") ? "" : (stryCov_9fa48("5822"), 'adafruit-377-encoder'),
  name: stryMutAct_9fa48("5823") ? "" : (stryCov_9fa48("5823"), 'Rotary Encoder + Extras'),
  brand: stryMutAct_9fa48("5824") ? "" : (stryCov_9fa48("5824"), 'Adafruit'),
  kind: stryMutAct_9fa48("5825") ? "" : (stryCov_9fa48("5825"), 'encoder'),
  placement: stryMutAct_9fa48("5826") ? "" : (stryCov_9fa48("5826"), 'embedded'),
  sizeU: null,
  stem: null,
  detail: stryMutAct_9fa48("5827") ? "" : (stryCov_9fa48("5827"), '24-pulse encoder with push switch and included knob. Requires wiring, mounting and firmware support.'),
  source: stryMutAct_9fa48("5828") ? "" : (stryCov_9fa48("5828"), 'https://www.adafruit.com/product/377')
}), stryMutAct_9fa48("5829") ? {} : (stryCov_9fa48("5829"), {
  id: stryMutAct_9fa48("5830") ? "" : (stryCov_9fa48("5830"), 'adafruit-326-oled'),
  name: stryMutAct_9fa48("5831") ? "" : (stryCov_9fa48("5831"), '0.96 inch 128×64 OLED module'),
  brand: stryMutAct_9fa48("5832") ? "" : (stryCov_9fa48("5832"), 'Adafruit'),
  kind: stryMutAct_9fa48("5833") ? "" : (stryCov_9fa48("5833"), 'screen'),
  placement: stryMutAct_9fa48("5834") ? "" : (stryCov_9fa48("5834"), 'embedded'),
  sizeU: null,
  stem: null,
  detail: stryMutAct_9fa48("5835") ? "" : (stryCov_9fa48("5835"), 'Display module for a controller project. Requires enclosure clearance, wiring and a display driver.'),
  source: stryMutAct_9fa48("5836") ? "" : (stryCov_9fa48("5836"), 'https://www.adafruit.com/product/326')
}), stryMutAct_9fa48("5837") ? {} : (stryCov_9fa48("5837"), {
  id: stryMutAct_9fa48("5838") ? "" : (stryCov_9fa48("5838"), 'adafruit-4980-neokey'),
  name: stryMutAct_9fa48("5839") ? "" : (stryCov_9fa48("5839"), 'NeoKey 1×4 QT button module'),
  brand: stryMutAct_9fa48("5840") ? "" : (stryCov_9fa48("5840"), 'Adafruit'),
  kind: stryMutAct_9fa48("5841") ? "" : (stryCov_9fa48("5841"), 'buttons'),
  placement: stryMutAct_9fa48("5842") ? "" : (stryCov_9fa48("5842"), 'embedded'),
  sizeU: null,
  stem: null,
  detail: stryMutAct_9fa48("5843") ? "" : (stryCov_9fa48("5843"), 'Four-key I2C PCB. Switches, keycaps and microcontroller are separate; requires a mounting design.'),
  source: stryMutAct_9fa48("5844") ? "" : (stryCov_9fa48("5844"), 'https://www.adafruit.com/product/4980')
}), stryMutAct_9fa48("5845") ? {} : (stryCov_9fa48("5845"), {
  id: stryMutAct_9fa48("5846") ? "" : (stryCov_9fa48("5846"), 'adafruit-5128-macropad'),
  name: stryMutAct_9fa48("5847") ? "" : (stryCov_9fa48("5847"), 'MacroPad RP2040 starter kit'),
  brand: stryMutAct_9fa48("5848") ? "" : (stryCov_9fa48("5848"), 'Adafruit'),
  kind: stryMutAct_9fa48("5849") ? "" : (stryCov_9fa48("5849"), 'macropad'),
  placement: stryMutAct_9fa48("5850") ? "" : (stryCov_9fa48("5850"), 'external'),
  sizeU: null,
  stem: null,
  detail: stryMutAct_9fa48("5851") ? "" : (stryCov_9fa48("5851"), 'Separate USB controller kit with 12 keys, encoder and OLED. Assembly and programming required.'),
  source: stryMutAct_9fa48("5852") ? "" : (stryCov_9fa48("5852"), 'https://www.adafruit.com/product/5128')
}), ...(stryMutAct_9fa48("5853") ? [] : (stryCov_9fa48("5853"), [1, 2.25, 6.25])).map(stryMutAct_9fa48("5854") ? () => undefined : (stryCov_9fa48("5854"), (sizeU): AccessoryProduct => stryMutAct_9fa48("5855") ? {} : (stryCov_9fa48("5855"), {
  id: stryMutAct_9fa48("5856") ? `` : (stryCov_9fa48("5856"), `jelly-key-zen-pond-v-${sizeU}u`),
  name: stryMutAct_9fa48("5857") ? `` : (stryCov_9fa48("5857"), `Zen Pond V · ${sizeU}u`),
  brand: stryMutAct_9fa48("5858") ? "" : (stryCov_9fa48("5858"), 'Jelly Key'),
  kind: stryMutAct_9fa48("5859") ? "" : (stryCov_9fa48("5859"), 'artisan'),
  placement: stryMutAct_9fa48("5860") ? "" : (stryCov_9fa48("5860"), 'key'),
  sizeU,
  stem: stryMutAct_9fa48("5861") ? "" : (stryCov_9fa48("5861"), 'mx'),
  detail: stryMutAct_9fa48("5862") ? "" : (stryCov_9fa48("5862"), 'MX-stem artisan reference. Choose the exact profile and variant with the maker; clearance remains unverified. Historical group buy.'),
  source: stryMutAct_9fa48("5863") ? "" : (stryCov_9fa48("5863"), 'https://www.jellykey.com/artisan-keycaps/zen-pond-v')
})))]);
export type AccessorySelection = {
  id: string;
  productId: string;
  quantity: number;
  location: AccessoryLocation;
};
function object(value: unknown): value is Record<string, unknown> {
  if (stryMutAct_9fa48("5864")) {
    {}
  } else {
    stryCov_9fa48("5864");
    return stryMutAct_9fa48("5867") ? typeof value === 'object' && value !== null || !Array.isArray(value) : stryMutAct_9fa48("5866") ? false : stryMutAct_9fa48("5865") ? true : (stryCov_9fa48("5865", "5866", "5867"), (stryMutAct_9fa48("5869") ? typeof value === 'object' || value !== null : stryMutAct_9fa48("5868") ? true : (stryCov_9fa48("5868", "5869"), (stryMutAct_9fa48("5871") ? typeof value !== 'object' : stryMutAct_9fa48("5870") ? true : (stryCov_9fa48("5870", "5871"), typeof value === (stryMutAct_9fa48("5872") ? "" : (stryCov_9fa48("5872"), 'object')))) && (stryMutAct_9fa48("5874") ? value === null : stryMutAct_9fa48("5873") ? true : (stryCov_9fa48("5873", "5874"), value !== null)))) && (stryMutAct_9fa48("5875") ? Array.isArray(value) : (stryCov_9fa48("5875"), !Array.isArray(value))));
  }
}
function identifier(value: unknown): value is string {
  if (stryMutAct_9fa48("5876")) {
    {}
  } else {
    stryCov_9fa48("5876");
    return stryMutAct_9fa48("5879") ? typeof value === 'string' || /^[a-zA-Z0-9][a-zA-Z0-9_.:-]{0,119}$/.test(value) : stryMutAct_9fa48("5878") ? false : stryMutAct_9fa48("5877") ? true : (stryCov_9fa48("5877", "5878", "5879"), (stryMutAct_9fa48("5881") ? typeof value !== 'string' : stryMutAct_9fa48("5880") ? true : (stryCov_9fa48("5880", "5881"), typeof value === (stryMutAct_9fa48("5882") ? "" : (stryCov_9fa48("5882"), 'string')))) && (stryMutAct_9fa48("5887") ? /^[a-zA-Z0-9][^a-zA-Z0-9_.:-]{0,119}$/ : stryMutAct_9fa48("5886") ? /^[a-zA-Z0-9][a-zA-Z0-9_.:-]$/ : stryMutAct_9fa48("5885") ? /^[^a-zA-Z0-9][a-zA-Z0-9_.:-]{0,119}$/ : stryMutAct_9fa48("5884") ? /^[a-zA-Z0-9][a-zA-Z0-9_.:-]{0,119}/ : stryMutAct_9fa48("5883") ? /[a-zA-Z0-9][a-zA-Z0-9_.:-]{0,119}$/ : (stryCov_9fa48("5883", "5884", "5885", "5886", "5887"), /^[a-zA-Z0-9][a-zA-Z0-9_.:-]{0,119}$/)).test(value));
  }
}
function parseLocation(value: unknown): AccessoryLocation {
  if (stryMutAct_9fa48("5888")) {
    {}
  } else {
    stryCov_9fa48("5888");
    if (stryMutAct_9fa48("5890") ? false : stryMutAct_9fa48("5889") ? true : (stryCov_9fa48("5889", "5890"), object(value))) {
      if (stryMutAct_9fa48("5891")) {
        {}
      } else {
        stryCov_9fa48("5891");
        if (stryMutAct_9fa48("5894") ? value.kind === 'embedded' || identifier(value.slotId) : stryMutAct_9fa48("5893") ? false : stryMutAct_9fa48("5892") ? true : (stryCov_9fa48("5892", "5893", "5894"), (stryMutAct_9fa48("5896") ? value.kind !== 'embedded' : stryMutAct_9fa48("5895") ? true : (stryCov_9fa48("5895", "5896"), value.kind === (stryMutAct_9fa48("5897") ? "" : (stryCov_9fa48("5897"), 'embedded')))) && identifier(value.slotId))) return stryMutAct_9fa48("5898") ? {} : (stryCov_9fa48("5898"), {
          kind: stryMutAct_9fa48("5899") ? "" : (stryCov_9fa48("5899"), 'embedded'),
          slotId: value.slotId
        });
        if (stryMutAct_9fa48("5902") ? value.kind === 'key' || identifier(value.keyId) : stryMutAct_9fa48("5901") ? false : stryMutAct_9fa48("5900") ? true : (stryCov_9fa48("5900", "5901", "5902"), (stryMutAct_9fa48("5904") ? value.kind !== 'key' : stryMutAct_9fa48("5903") ? true : (stryCov_9fa48("5903", "5904"), value.kind === (stryMutAct_9fa48("5905") ? "" : (stryCov_9fa48("5905"), 'key')))) && identifier(value.keyId))) return stryMutAct_9fa48("5906") ? {} : (stryCov_9fa48("5906"), {
          kind: stryMutAct_9fa48("5907") ? "" : (stryCov_9fa48("5907"), 'key'),
          keyId: value.keyId
        });
        if (stryMutAct_9fa48("5910") ? value.kind === 'external' || value.position === 'left' || value.position === 'right' || value.position === 'above' : stryMutAct_9fa48("5909") ? false : stryMutAct_9fa48("5908") ? true : (stryCov_9fa48("5908", "5909", "5910"), (stryMutAct_9fa48("5912") ? value.kind !== 'external' : stryMutAct_9fa48("5911") ? true : (stryCov_9fa48("5911", "5912"), value.kind === (stryMutAct_9fa48("5913") ? "" : (stryCov_9fa48("5913"), 'external')))) && (stryMutAct_9fa48("5915") ? (value.position === 'left' || value.position === 'right') && value.position === 'above' : stryMutAct_9fa48("5914") ? true : (stryCov_9fa48("5914", "5915"), (stryMutAct_9fa48("5917") ? value.position === 'left' && value.position === 'right' : stryMutAct_9fa48("5916") ? false : (stryCov_9fa48("5916", "5917"), (stryMutAct_9fa48("5919") ? value.position !== 'left' : stryMutAct_9fa48("5918") ? false : (stryCov_9fa48("5918", "5919"), value.position === (stryMutAct_9fa48("5920") ? "" : (stryCov_9fa48("5920"), 'left')))) || (stryMutAct_9fa48("5922") ? value.position !== 'right' : stryMutAct_9fa48("5921") ? false : (stryCov_9fa48("5921", "5922"), value.position === (stryMutAct_9fa48("5923") ? "" : (stryCov_9fa48("5923"), 'right')))))) || (stryMutAct_9fa48("5925") ? value.position !== 'above' : stryMutAct_9fa48("5924") ? false : (stryCov_9fa48("5924", "5925"), value.position === (stryMutAct_9fa48("5926") ? "" : (stryCov_9fa48("5926"), 'above')))))))) return stryMutAct_9fa48("5927") ? {} : (stryCov_9fa48("5927"), {
          kind: stryMutAct_9fa48("5928") ? "" : (stryCov_9fa48("5928"), 'external'),
          position: value.position
        });
      }
    }
    throw new Error(stryMutAct_9fa48("5930") ? "" : (stryCov_9fa48("5930"), 'Choose a valid accessory slot, key or desk position.'));
  }
}
export function newAccessorySelection(productId: string, products: readonly AccessoryProduct[] = accessoryCatalog): AccessorySelection {
  if (stryMutAct_9fa48("5931")) {
    {}
  } else {
    stryCov_9fa48("5931");
    const product = products.find(stryMutAct_9fa48("5932") ? () => undefined : (stryCov_9fa48("5932"), item => stryMutAct_9fa48("5935") ? item.id !== productId : stryMutAct_9fa48("5934") ? false : stryMutAct_9fa48("5933") ? true : (stryCov_9fa48("5933", "5934", "5935"), item.id === productId)));
    if (stryMutAct_9fa48("5938") ? false : stryMutAct_9fa48("5937") ? true : stryMutAct_9fa48("5936") ? product : (stryCov_9fa48("5936", "5937", "5938"), !product)) throw new Error(stryMutAct_9fa48("5940") ? "" : (stryCov_9fa48("5940"), 'This accessory is not in the product library.'));
    const location: AccessoryLocation = (stryMutAct_9fa48("5943") ? product.placement !== 'key' : stryMutAct_9fa48("5942") ? false : stryMutAct_9fa48("5941") ? true : (stryCov_9fa48("5941", "5942", "5943"), product.placement === (stryMutAct_9fa48("5944") ? "" : (stryCov_9fa48("5944"), 'key')))) ? stryMutAct_9fa48("5945") ? {} : (stryCov_9fa48("5945"), {
      kind: stryMutAct_9fa48("5946") ? "" : (stryCov_9fa48("5946"), 'key'),
      keyId: stryMutAct_9fa48("5947") ? "" : (stryCov_9fa48("5947"), 'unassigned')
    }) : (stryMutAct_9fa48("5950") ? product.placement !== 'embedded' : stryMutAct_9fa48("5949") ? false : stryMutAct_9fa48("5948") ? true : (stryCov_9fa48("5948", "5949", "5950"), product.placement === (stryMutAct_9fa48("5951") ? "" : (stryCov_9fa48("5951"), 'embedded')))) ? stryMutAct_9fa48("5952") ? {} : (stryCov_9fa48("5952"), {
      kind: stryMutAct_9fa48("5953") ? "" : (stryCov_9fa48("5953"), 'embedded'),
      slotId: stryMutAct_9fa48("5954") ? "" : (stryCov_9fa48("5954"), 'unassigned')
    }) : stryMutAct_9fa48("5955") ? {} : (stryCov_9fa48("5955"), {
      kind: stryMutAct_9fa48("5956") ? "" : (stryCov_9fa48("5956"), 'external'),
      position: stryMutAct_9fa48("5957") ? "" : (stryCov_9fa48("5957"), 'right')
    });
    return stryMutAct_9fa48("5958") ? {} : (stryCov_9fa48("5958"), {
      id: crypto.randomUUID(),
      productId,
      quantity: 1,
      location
    });
  }
}
export function parseAccessorySnapshot(value: unknown): AccessorySelection[] {
  if (stryMutAct_9fa48("5959")) {
    {}
  } else {
    stryCov_9fa48("5959");
    if (stryMutAct_9fa48("5962") ? value !== undefined : stryMutAct_9fa48("5961") ? false : stryMutAct_9fa48("5960") ? true : (stryCov_9fa48("5960", "5961", "5962"), value === undefined)) return stryMutAct_9fa48("5963") ? ["Stryker was here"] : (stryCov_9fa48("5963"), []);
    if (stryMutAct_9fa48("5966") ? !Array.isArray(value) && value.length > 100 : stryMutAct_9fa48("5965") ? false : stryMutAct_9fa48("5964") ? true : (stryCov_9fa48("5964", "5965", "5966"), (stryMutAct_9fa48("5967") ? Array.isArray(value) : (stryCov_9fa48("5967"), !Array.isArray(value))) || (stryMutAct_9fa48("5970") ? value.length <= 100 : stryMutAct_9fa48("5969") ? value.length >= 100 : stryMutAct_9fa48("5968") ? false : (stryCov_9fa48("5968", "5969", "5970"), value.length > 100)))) throw new Error(stryMutAct_9fa48("5972") ? "" : (stryCov_9fa48("5972"), 'The accessory list is damaged or exceeds 100 selections.'));
    const ids = new Set<string>();
    return value.map((item: unknown) => {
      if (stryMutAct_9fa48("5973")) {
        {}
      } else {
        stryCov_9fa48("5973");
        if (stryMutAct_9fa48("5976") ? (!object(item) || !identifier(item.id) || ids.has(item.id) || typeof item.quantity !== 'number' || !Number.isInteger(item.quantity) || item.quantity < 1) && item.quantity > 100 : stryMutAct_9fa48("5975") ? false : stryMutAct_9fa48("5974") ? true : (stryCov_9fa48("5974", "5975", "5976"), (stryMutAct_9fa48("5978") ? (!object(item) || !identifier(item.id) || ids.has(item.id) || typeof item.quantity !== 'number' || !Number.isInteger(item.quantity)) && item.quantity < 1 : stryMutAct_9fa48("5977") ? false : (stryCov_9fa48("5977", "5978"), (stryMutAct_9fa48("5980") ? (!object(item) || !identifier(item.id) || ids.has(item.id) || typeof item.quantity !== 'number') && !Number.isInteger(item.quantity) : stryMutAct_9fa48("5979") ? false : (stryCov_9fa48("5979", "5980"), (stryMutAct_9fa48("5982") ? (!object(item) || !identifier(item.id) || ids.has(item.id)) && typeof item.quantity !== 'number' : stryMutAct_9fa48("5981") ? false : (stryCov_9fa48("5981", "5982"), (stryMutAct_9fa48("5984") ? (!object(item) || !identifier(item.id)) && ids.has(item.id) : stryMutAct_9fa48("5983") ? false : (stryCov_9fa48("5983", "5984"), (stryMutAct_9fa48("5986") ? !object(item) && !identifier(item.id) : stryMutAct_9fa48("5985") ? false : (stryCov_9fa48("5985", "5986"), (stryMutAct_9fa48("5987") ? object(item) : (stryCov_9fa48("5987"), !object(item))) || (stryMutAct_9fa48("5988") ? identifier(item.id) : (stryCov_9fa48("5988"), !identifier(item.id))))) || ids.has(item.id))) || (stryMutAct_9fa48("5990") ? typeof item.quantity === 'number' : stryMutAct_9fa48("5989") ? false : (stryCov_9fa48("5989", "5990"), typeof item.quantity !== (stryMutAct_9fa48("5991") ? "" : (stryCov_9fa48("5991"), 'number')))))) || (stryMutAct_9fa48("5992") ? Number.isInteger(item.quantity) : (stryCov_9fa48("5992"), !Number.isInteger(item.quantity))))) || (stryMutAct_9fa48("5995") ? item.quantity >= 1 : stryMutAct_9fa48("5994") ? item.quantity <= 1 : stryMutAct_9fa48("5993") ? false : (stryCov_9fa48("5993", "5994", "5995"), item.quantity < 1)))) || (stryMutAct_9fa48("5998") ? item.quantity <= 100 : stryMutAct_9fa48("5997") ? item.quantity >= 100 : stryMutAct_9fa48("5996") ? false : (stryCov_9fa48("5996", "5997", "5998"), item.quantity > 100)))) throw new Error(stryMutAct_9fa48("6000") ? "" : (stryCov_9fa48("6000"), 'Each accessory needs a unique ID and a quantity from 1 to 100.'));
        if (stryMutAct_9fa48("6003") ? false : stryMutAct_9fa48("6002") ? true : stryMutAct_9fa48("6001") ? identifier(item.productId) : (stryCov_9fa48("6001", "6002", "6003"), !identifier(item.productId))) throw new Error(stryMutAct_9fa48("6005") ? "" : (stryCov_9fa48("6005"), 'Invalid saved accessory ID.'));
        const location = parseLocation(item.location);
        if (stryMutAct_9fa48("6008") ? location.kind === 'key' || item.quantity !== 1 : stryMutAct_9fa48("6007") ? false : stryMutAct_9fa48("6006") ? true : (stryCov_9fa48("6006", "6007", "6008"), (stryMutAct_9fa48("6010") ? location.kind !== 'key' : stryMutAct_9fa48("6009") ? true : (stryCov_9fa48("6009", "6010"), location.kind === (stryMutAct_9fa48("6011") ? "" : (stryCov_9fa48("6011"), 'key')))) && (stryMutAct_9fa48("6013") ? item.quantity === 1 : stryMutAct_9fa48("6012") ? true : (stryCov_9fa48("6012", "6013"), item.quantity !== 1)))) throw new Error(stryMutAct_9fa48("6015") ? "" : (stryCov_9fa48("6015"), 'Assign each artisan keycap to its own key.'));
        if (stryMutAct_9fa48("6016")) {
          ;
        } else {
          stryCov_9fa48("6016");
          ids.add(item.id);
        }
        return stryMutAct_9fa48("6017") ? {} : (stryCov_9fa48("6017"), {
          id: item.id,
          productId: item.productId,
          quantity: item.quantity,
          location
        });
      }
    });
  }
}
export function parseAccessories(value: unknown, products: readonly AccessoryProduct[] = accessoryCatalog): AccessorySelection[] {
  if (stryMutAct_9fa48("6018")) {
    {}
  } else {
    stryCov_9fa48("6018");
    const selections = parseAccessorySnapshot(value);
    for (const selection of selections) {
      if (stryMutAct_9fa48("6019")) {
        {}
      } else {
        stryCov_9fa48("6019");
        const product = products.find(stryMutAct_9fa48("6020") ? () => undefined : (stryCov_9fa48("6020"), item => stryMutAct_9fa48("6023") ? item.id !== selection.productId : stryMutAct_9fa48("6022") ? false : stryMutAct_9fa48("6021") ? true : (stryCov_9fa48("6021", "6022", "6023"), item.id === selection.productId)));
        if (stryMutAct_9fa48("6026") ? false : stryMutAct_9fa48("6025") ? true : stryMutAct_9fa48("6024") ? product : (stryCov_9fa48("6024", "6025", "6026"), !product)) throw new Error(stryMutAct_9fa48("6028") ? "" : (stryCov_9fa48("6028"), 'This accessory is not in the product library.'));
        if (stryMutAct_9fa48("6031") ? selection.location.kind === product.placement : stryMutAct_9fa48("6030") ? false : stryMutAct_9fa48("6029") ? true : (stryCov_9fa48("6029", "6030", "6031"), selection.location.kind !== product.placement)) throw new Error(stryMutAct_9fa48("6033") ? "" : (stryCov_9fa48("6033"), 'This accessory cannot use that type of placement.'));
      }
    }
    return selections;
  }
}
export type AccessoryAspect = 'mount' | 'electrical' | 'firmware' | 'size' | 'stem' | 'clearance' | 'connection';
export type AccessoryClaim = {
  productId: string;
  locationId: string;
  aspect: AccessoryAspect;
  status: 'confirmed' | 'conflict';
  reason: string;
  source: string;
};
export type AccessoryHost = {
  id: string;
  source: string;
  slots: readonly {
    id: string;
    kinds: readonly AccessoryKind[];
    capacity: number;
  }[] | null;
  keys: readonly {
    id: string;
    sizeU: number | null;
    stem: 'mx' | 'choc' | null;
  }[] | null;
  claims: readonly AccessoryClaim[];
};
export type AccessoryCompatibility = {
  status: 'confirmed' | 'unknown' | 'conflict';
  reasons: string[];
  sources: string[];
};
export function accessoryLocationId(location: AccessoryLocation): string {
  if (stryMutAct_9fa48("6034")) {
    {}
  } else {
    stryCov_9fa48("6034");
    switch (location.kind) {
      case stryMutAct_9fa48("6036") ? "" : (stryCov_9fa48("6036"), 'embedded'):
        if (stryMutAct_9fa48("6035")) {} else {
          stryCov_9fa48("6035");
          return location.slotId;
        }
      case stryMutAct_9fa48("6038") ? "" : (stryCov_9fa48("6038"), 'external'):
        if (stryMutAct_9fa48("6037")) {} else {
          stryCov_9fa48("6037");
          return location.position;
        }
      case stryMutAct_9fa48("6040") ? "" : (stryCov_9fa48("6040"), 'key'):
        if (stryMutAct_9fa48("6039")) {} else {
          stryCov_9fa48("6039");
          return location.keyId;
        }
      default:
        if (stryMutAct_9fa48("6041")) {} else {
          stryCov_9fa48("6041");
          {
            if (stryMutAct_9fa48("6042")) {
              {}
            } else {
              stryCov_9fa48("6042");
              const unreachable: never = location;
              return unreachable;
            }
          }
        }
    }
  }
}
const requirements: Record<AccessoryKind, readonly AccessoryAspect[]> = stryMutAct_9fa48("6043") ? {} : (stryCov_9fa48("6043"), {
  knob: stryMutAct_9fa48("6044") ? [] : (stryCov_9fa48("6044"), [stryMutAct_9fa48("6045") ? "" : (stryCov_9fa48("6045"), 'mount'), stryMutAct_9fa48("6046") ? "" : (stryCov_9fa48("6046"), 'clearance')]),
  encoder: stryMutAct_9fa48("6047") ? [] : (stryCov_9fa48("6047"), [stryMutAct_9fa48("6048") ? "" : (stryCov_9fa48("6048"), 'mount'), stryMutAct_9fa48("6049") ? "" : (stryCov_9fa48("6049"), 'electrical'), stryMutAct_9fa48("6050") ? "" : (stryCov_9fa48("6050"), 'firmware'), stryMutAct_9fa48("6051") ? "" : (stryCov_9fa48("6051"), 'clearance')]),
  screen: stryMutAct_9fa48("6052") ? [] : (stryCov_9fa48("6052"), [stryMutAct_9fa48("6053") ? "" : (stryCov_9fa48("6053"), 'mount'), stryMutAct_9fa48("6054") ? "" : (stryCov_9fa48("6054"), 'electrical'), stryMutAct_9fa48("6055") ? "" : (stryCov_9fa48("6055"), 'firmware'), stryMutAct_9fa48("6056") ? "" : (stryCov_9fa48("6056"), 'clearance')]),
  buttons: stryMutAct_9fa48("6057") ? [] : (stryCov_9fa48("6057"), [stryMutAct_9fa48("6058") ? "" : (stryCov_9fa48("6058"), 'mount'), stryMutAct_9fa48("6059") ? "" : (stryCov_9fa48("6059"), 'electrical'), stryMutAct_9fa48("6060") ? "" : (stryCov_9fa48("6060"), 'firmware'), stryMutAct_9fa48("6061") ? "" : (stryCov_9fa48("6061"), 'clearance')]),
  macropad: stryMutAct_9fa48("6062") ? [] : (stryCov_9fa48("6062"), [stryMutAct_9fa48("6063") ? "" : (stryCov_9fa48("6063"), 'connection'), stryMutAct_9fa48("6064") ? "" : (stryCov_9fa48("6064"), 'firmware')]),
  artisan: stryMutAct_9fa48("6065") ? [] : (stryCov_9fa48("6065"), [stryMutAct_9fa48("6066") ? "" : (stryCov_9fa48("6066"), 'size'), stryMutAct_9fa48("6067") ? "" : (stryCov_9fa48("6067"), 'stem'), stryMutAct_9fa48("6068") ? "" : (stryCov_9fa48("6068"), 'clearance')])
});
export function assessAccessoryCompatibility(selection: AccessorySelection, host?: AccessoryHost, products: readonly AccessoryProduct[] = accessoryCatalog): AccessoryCompatibility {
  if (stryMutAct_9fa48("6069")) {
    {}
  } else {
    stryCov_9fa48("6069");
    const product = products.find(stryMutAct_9fa48("6070") ? () => undefined : (stryCov_9fa48("6070"), item => stryMutAct_9fa48("6073") ? item.id !== selection.productId : stryMutAct_9fa48("6072") ? false : stryMutAct_9fa48("6071") ? true : (stryCov_9fa48("6071", "6072", "6073"), item.id === selection.productId)));
    if (stryMutAct_9fa48("6076") ? false : stryMutAct_9fa48("6075") ? true : stryMutAct_9fa48("6074") ? product : (stryCov_9fa48("6074", "6075", "6076"), !product)) return stryMutAct_9fa48("6077") ? {} : (stryCov_9fa48("6077"), {
      status: stryMutAct_9fa48("6078") ? "" : (stryCov_9fa48("6078"), 'unknown'),
      reasons: stryMutAct_9fa48("6079") ? [] : (stryCov_9fa48("6079"), [stryMutAct_9fa48("6080") ? "" : (stryCov_9fa48("6080"), 'The product specification is missing.')]),
      sources: stryMutAct_9fa48("6081") ? ["Stryker was here"] : (stryCov_9fa48("6081"), [])
    });
    const locationId = accessoryLocationId(selection.location);
    const conflicts: string[] = stryMutAct_9fa48("6082") ? ["Stryker was here"] : (stryCov_9fa48("6082"), []);
    const unknown: string[] = (stryMutAct_9fa48("6083") ? product.id.endsWith('import-accessory:') : (stryCov_9fa48("6083"), product.id.startsWith(stryMutAct_9fa48("6084") ? "" : (stryCov_9fa48("6084"), 'import-accessory:')))) ? stryMutAct_9fa48("6085") ? [] : (stryCov_9fa48("6085"), [stryMutAct_9fa48("6086") ? "" : (stryCov_9fa48("6086"), 'Imported product specifications and fit have not been independently verified.')]) : stryMutAct_9fa48("6087") ? ["Stryker was here"] : (stryCov_9fa48("6087"), []);
    const confirmed: string[] = stryMutAct_9fa48("6088") ? ["Stryker was here"] : (stryCov_9fa48("6088"), []);
    const sources = new Set(stryMutAct_9fa48("6089") ? [] : (stryCov_9fa48("6089"), [product.source]));
    const covered = new Set<AccessoryAspect>();
    if (stryMutAct_9fa48("6092") ? selection.location.kind === product.placement : stryMutAct_9fa48("6091") ? false : stryMutAct_9fa48("6090") ? true : (stryCov_9fa48("6090", "6091", "6092"), selection.location.kind !== product.placement)) conflicts.push(stryMutAct_9fa48("6094") ? "" : (stryCov_9fa48("6094"), 'The placement type does not match this accessory.'));
    if (stryMutAct_9fa48("6097") ? locationId !== 'unassigned' : stryMutAct_9fa48("6096") ? false : stryMutAct_9fa48("6095") ? true : (stryCov_9fa48("6095", "6096", "6097"), locationId === (stryMutAct_9fa48("6098") ? "" : (stryCov_9fa48("6098"), 'unassigned')))) unknown.push(stryMutAct_9fa48("6100") ? "" : (stryCov_9fa48("6100"), 'Choose a specific slot or key.'));
    if (stryMutAct_9fa48("6102") ? false : stryMutAct_9fa48("6101") ? true : (stryCov_9fa48("6101", "6102"), host)) {
      if (stryMutAct_9fa48("6103")) {
        {}
      } else {
        stryCov_9fa48("6103");
        if (stryMutAct_9fa48("6104")) {
          ;
        } else {
          stryCov_9fa48("6104");
          sources.add(host.source);
        }
        if (stryMutAct_9fa48("6107") ? selection.location.kind === 'embedded' && host.slots !== null || locationId !== 'unassigned' : stryMutAct_9fa48("6106") ? false : stryMutAct_9fa48("6105") ? true : (stryCov_9fa48("6105", "6106", "6107"), (stryMutAct_9fa48("6109") ? selection.location.kind === 'embedded' || host.slots !== null : stryMutAct_9fa48("6108") ? true : (stryCov_9fa48("6108", "6109"), (stryMutAct_9fa48("6111") ? selection.location.kind !== 'embedded' : stryMutAct_9fa48("6110") ? true : (stryCov_9fa48("6110", "6111"), selection.location.kind === (stryMutAct_9fa48("6112") ? "" : (stryCov_9fa48("6112"), 'embedded')))) && (stryMutAct_9fa48("6114") ? host.slots === null : stryMutAct_9fa48("6113") ? true : (stryCov_9fa48("6113", "6114"), host.slots !== null)))) && (stryMutAct_9fa48("6116") ? locationId === 'unassigned' : stryMutAct_9fa48("6115") ? true : (stryCov_9fa48("6115", "6116"), locationId !== (stryMutAct_9fa48("6117") ? "" : (stryCov_9fa48("6117"), 'unassigned')))))) {
          if (stryMutAct_9fa48("6118")) {
            {}
          } else {
            stryCov_9fa48("6118");
            const slot = host.slots.find(stryMutAct_9fa48("6119") ? () => undefined : (stryCov_9fa48("6119"), entry => stryMutAct_9fa48("6122") ? entry.id !== locationId : stryMutAct_9fa48("6121") ? false : stryMutAct_9fa48("6120") ? true : (stryCov_9fa48("6120", "6121", "6122"), entry.id === locationId)));
            if (stryMutAct_9fa48("6125") ? false : stryMutAct_9fa48("6124") ? true : stryMutAct_9fa48("6123") ? slot : (stryCov_9fa48("6123", "6124", "6125"), !slot)) conflicts.push(stryMutAct_9fa48("6127") ? "" : (stryCov_9fa48("6127"), 'This host has no documented slot at that location.'));else {
              if (stryMutAct_9fa48("6128")) {
                {}
              } else {
                stryCov_9fa48("6128");
                if (stryMutAct_9fa48("6131") ? false : stryMutAct_9fa48("6130") ? true : stryMutAct_9fa48("6129") ? slot.kinds.includes(product.kind) : (stryCov_9fa48("6129", "6130", "6131"), !slot.kinds.includes(product.kind))) conflicts.push(stryMutAct_9fa48("6133") ? "" : (stryCov_9fa48("6133"), 'This slot does not accept this accessory type.'));
                if (stryMutAct_9fa48("6137") ? selection.quantity <= slot.capacity : stryMutAct_9fa48("6136") ? selection.quantity >= slot.capacity : stryMutAct_9fa48("6135") ? false : stryMutAct_9fa48("6134") ? true : (stryCov_9fa48("6134", "6135", "6136", "6137"), selection.quantity > slot.capacity)) conflicts.push(stryMutAct_9fa48("6139") ? "" : (stryCov_9fa48("6139"), 'The selected quantity exceeds this slot capacity.'));
              }
            }
          }
        }
        if (stryMutAct_9fa48("6142") ? selection.location.kind === 'key' && host.keys !== null || locationId !== 'unassigned' : stryMutAct_9fa48("6141") ? false : stryMutAct_9fa48("6140") ? true : (stryCov_9fa48("6140", "6141", "6142"), (stryMutAct_9fa48("6144") ? selection.location.kind === 'key' || host.keys !== null : stryMutAct_9fa48("6143") ? true : (stryCov_9fa48("6143", "6144"), (stryMutAct_9fa48("6146") ? selection.location.kind !== 'key' : stryMutAct_9fa48("6145") ? true : (stryCov_9fa48("6145", "6146"), selection.location.kind === (stryMutAct_9fa48("6147") ? "" : (stryCov_9fa48("6147"), 'key')))) && (stryMutAct_9fa48("6149") ? host.keys === null : stryMutAct_9fa48("6148") ? true : (stryCov_9fa48("6148", "6149"), host.keys !== null)))) && (stryMutAct_9fa48("6151") ? locationId === 'unassigned' : stryMutAct_9fa48("6150") ? true : (stryCov_9fa48("6150", "6151"), locationId !== (stryMutAct_9fa48("6152") ? "" : (stryCov_9fa48("6152"), 'unassigned')))))) {
          if (stryMutAct_9fa48("6153")) {
            {}
          } else {
            stryCov_9fa48("6153");
            const key = host.keys.find(stryMutAct_9fa48("6154") ? () => undefined : (stryCov_9fa48("6154"), entry => stryMutAct_9fa48("6157") ? entry.id !== locationId : stryMutAct_9fa48("6156") ? false : stryMutAct_9fa48("6155") ? true : (stryCov_9fa48("6155", "6156", "6157"), entry.id === locationId)));
            if (stryMutAct_9fa48("6160") ? false : stryMutAct_9fa48("6159") ? true : stryMutAct_9fa48("6158") ? key : (stryCov_9fa48("6158", "6159", "6160"), !key)) conflicts.push(stryMutAct_9fa48("6162") ? "" : (stryCov_9fa48("6162"), 'This key is absent from the documented layout.'));else if (stryMutAct_9fa48("6165") ? product.kind !== 'artisan' : stryMutAct_9fa48("6164") ? false : stryMutAct_9fa48("6163") ? true : (stryCov_9fa48("6163", "6164", "6165"), product.kind === (stryMutAct_9fa48("6166") ? "" : (stryCov_9fa48("6166"), 'artisan')))) {
              if (stryMutAct_9fa48("6167")) {
                {}
              } else {
                stryCov_9fa48("6167");
                if (stryMutAct_9fa48("6170") ? key.sizeU !== null || product.sizeU !== null : stryMutAct_9fa48("6169") ? false : stryMutAct_9fa48("6168") ? true : (stryCov_9fa48("6168", "6169", "6170"), (stryMutAct_9fa48("6172") ? key.sizeU === null : stryMutAct_9fa48("6171") ? true : (stryCov_9fa48("6171", "6172"), key.sizeU !== null)) && (stryMutAct_9fa48("6174") ? product.sizeU === null : stryMutAct_9fa48("6173") ? true : (stryCov_9fa48("6173", "6174"), product.sizeU !== null)))) {
                  if (stryMutAct_9fa48("6175")) {
                    {}
                  } else {
                    stryCov_9fa48("6175");
                    covered.add(stryMutAct_9fa48("6177") ? "" : (stryCov_9fa48("6177"), 'size'));
                    if (stryMutAct_9fa48("6180") ? key.sizeU === product.sizeU : stryMutAct_9fa48("6179") ? false : stryMutAct_9fa48("6178") ? true : (stryCov_9fa48("6178", "6179", "6180"), key.sizeU !== product.sizeU)) conflicts.push(stryMutAct_9fa48("6182") ? `` : (stryCov_9fa48("6182"), `The ${product.sizeU}u artisan does not fit this ${key.sizeU}u key.`));else confirmed.push(stryMutAct_9fa48("6184") ? "" : (stryCov_9fa48("6184"), 'The key width matches the listed artisan size.'));
                  }
                }
                if (stryMutAct_9fa48("6187") ? key.stem !== null || product.stem !== null : stryMutAct_9fa48("6186") ? false : stryMutAct_9fa48("6185") ? true : (stryCov_9fa48("6185", "6186", "6187"), (stryMutAct_9fa48("6189") ? key.stem === null : stryMutAct_9fa48("6188") ? true : (stryCov_9fa48("6188", "6189"), key.stem !== null)) && (stryMutAct_9fa48("6191") ? product.stem === null : stryMutAct_9fa48("6190") ? true : (stryCov_9fa48("6190", "6191"), product.stem !== null)))) {
                  if (stryMutAct_9fa48("6192")) {
                    {}
                  } else {
                    stryCov_9fa48("6192");
                    covered.add(stryMutAct_9fa48("6194") ? "" : (stryCov_9fa48("6194"), 'stem'));
                    if (stryMutAct_9fa48("6197") ? key.stem === product.stem : stryMutAct_9fa48("6196") ? false : stryMutAct_9fa48("6195") ? true : (stryCov_9fa48("6195", "6196", "6197"), key.stem !== product.stem)) conflicts.push(stryMutAct_9fa48("6199") ? "" : (stryCov_9fa48("6199"), 'The artisan and switch stems differ.'));else confirmed.push(stryMutAct_9fa48("6201") ? "" : (stryCov_9fa48("6201"), 'The documented stem types match.'));
                  }
                }
              }
            }
          }
        }
        for (const claim of host.claims) {
          if (stryMutAct_9fa48("6202")) {
            {}
          } else {
            stryCov_9fa48("6202");
            if (stryMutAct_9fa48("6205") ? (product.id.startsWith('import-accessory:') || claim.productId !== product.id || claim.locationId !== locationId) && locationId === 'unassigned' : stryMutAct_9fa48("6204") ? false : stryMutAct_9fa48("6203") ? true : (stryCov_9fa48("6203", "6204", "6205"), (stryMutAct_9fa48("6207") ? (product.id.startsWith('import-accessory:') || claim.productId !== product.id) && claim.locationId !== locationId : stryMutAct_9fa48("6206") ? false : (stryCov_9fa48("6206", "6207"), (stryMutAct_9fa48("6209") ? product.id.startsWith('import-accessory:') && claim.productId !== product.id : stryMutAct_9fa48("6208") ? false : (stryCov_9fa48("6208", "6209"), (stryMutAct_9fa48("6210") ? product.id.endsWith('import-accessory:') : (stryCov_9fa48("6210"), product.id.startsWith(stryMutAct_9fa48("6211") ? "" : (stryCov_9fa48("6211"), 'import-accessory:')))) || (stryMutAct_9fa48("6213") ? claim.productId === product.id : stryMutAct_9fa48("6212") ? false : (stryCov_9fa48("6212", "6213"), claim.productId !== product.id)))) || (stryMutAct_9fa48("6215") ? claim.locationId === locationId : stryMutAct_9fa48("6214") ? false : (stryCov_9fa48("6214", "6215"), claim.locationId !== locationId)))) || (stryMutAct_9fa48("6217") ? locationId !== 'unassigned' : stryMutAct_9fa48("6216") ? false : (stryCov_9fa48("6216", "6217"), locationId === (stryMutAct_9fa48("6218") ? "" : (stryCov_9fa48("6218"), 'unassigned')))))) continue;
            if (stryMutAct_9fa48("6221") ? !claim.source.startsWith('https://') && !claim.reason.trim() : stryMutAct_9fa48("6220") ? false : stryMutAct_9fa48("6219") ? true : (stryCov_9fa48("6219", "6220", "6221"), (stryMutAct_9fa48("6222") ? claim.source.startsWith('https://') : (stryCov_9fa48("6222"), !(stryMutAct_9fa48("6223") ? claim.source.endsWith('https://') : (stryCov_9fa48("6223"), claim.source.startsWith(stryMutAct_9fa48("6224") ? "" : (stryCov_9fa48("6224"), 'https://')))))) || (stryMutAct_9fa48("6225") ? claim.reason.trim() : (stryCov_9fa48("6225"), !(stryMutAct_9fa48("6226") ? claim.reason : (stryCov_9fa48("6226"), claim.reason.trim())))))) continue;
            if (stryMutAct_9fa48("6227")) {
              ;
            } else {
              stryCov_9fa48("6227");
              covered.add(claim.aspect);
            }
            if (stryMutAct_9fa48("6228")) {
              ;
            } else {
              stryCov_9fa48("6228");
              sources.add(claim.source);
            }
            ((stryMutAct_9fa48("6232") ? claim.status !== 'conflict' : stryMutAct_9fa48("6231") ? false : stryMutAct_9fa48("6230") ? true : (stryCov_9fa48("6230", "6231", "6232"), claim.status === (stryMutAct_9fa48("6233") ? "" : (stryCov_9fa48("6233"), 'conflict')))) ? conflicts : confirmed).push(claim.reason);
          }
        }
      }
    }
    for (const aspect of requirements[product.kind]) {
      if (stryMutAct_9fa48("6234")) {
        {}
      } else {
        stryCov_9fa48("6234");
        if (stryMutAct_9fa48("6237") ? false : stryMutAct_9fa48("6236") ? true : stryMutAct_9fa48("6235") ? covered.has(aspect) : (stryCov_9fa48("6235", "6236", "6237"), !covered.has(aspect))) unknown.push(stryMutAct_9fa48("6239") ? `` : (stryCov_9fa48("6239"), `${stryMutAct_9fa48("6240") ? aspect[0].toLowerCase() : (stryCov_9fa48("6240"), aspect[0].toUpperCase())}${stryMutAct_9fa48("6241") ? aspect : (stryCov_9fa48("6241"), aspect.slice(1))} compatibility has not been verified for this location.`));
      }
    }
    return stryMutAct_9fa48("6242") ? {} : (stryCov_9fa48("6242"), {
      status: conflicts.length ? stryMutAct_9fa48("6243") ? "" : (stryCov_9fa48("6243"), 'conflict') : unknown.length ? stryMutAct_9fa48("6244") ? "" : (stryCov_9fa48("6244"), 'unknown') : stryMutAct_9fa48("6245") ? "" : (stryCov_9fa48("6245"), 'confirmed'),
      reasons: stryMutAct_9fa48("6246") ? [] : (stryCov_9fa48("6246"), [...conflicts, ...unknown, ...confirmed]),
      sources: stryMutAct_9fa48("6247") ? [] : (stryCov_9fa48("6247"), [...sources])
    });
  }
}
export function assessAccessories(selections: readonly AccessorySelection[], host?: AccessoryHost, products: readonly AccessoryProduct[] = accessoryCatalog): Record<string, AccessoryCompatibility> {
  if (stryMutAct_9fa48("6248")) {
    {}
  } else {
    stryCov_9fa48("6248");
    const results: Record<string, AccessoryCompatibility> = {};
    for (const selection of selections) {
      if (stryMutAct_9fa48("6249")) {
        {}
      } else {
        stryCov_9fa48("6249");
        const result = assessAccessoryCompatibility(selection, host, products);
        const location = selection.location;
        const locationId = accessoryLocationId(location);
        if (stryMutAct_9fa48("6252") ? location.kind !== 'external' || locationId !== 'unassigned' : stryMutAct_9fa48("6251") ? false : stryMutAct_9fa48("6250") ? true : (stryCov_9fa48("6250", "6251", "6252"), (stryMutAct_9fa48("6254") ? location.kind === 'external' : stryMutAct_9fa48("6253") ? true : (stryCov_9fa48("6253", "6254"), location.kind !== (stryMutAct_9fa48("6255") ? "" : (stryCov_9fa48("6255"), 'external')))) && (stryMutAct_9fa48("6257") ? locationId === 'unassigned' : stryMutAct_9fa48("6256") ? true : (stryCov_9fa48("6256", "6257"), locationId !== (stryMutAct_9fa48("6258") ? "" : (stryCov_9fa48("6258"), 'unassigned')))))) {
          if (stryMutAct_9fa48("6259")) {
            {}
          } else {
            stryCov_9fa48("6259");
            const product = products.find(stryMutAct_9fa48("6260") ? () => undefined : (stryCov_9fa48("6260"), entry => stryMutAct_9fa48("6263") ? entry.id !== selection.productId : stryMutAct_9fa48("6262") ? false : stryMutAct_9fa48("6261") ? true : (stryCov_9fa48("6261", "6262", "6263"), entry.id === selection.productId)));
            const used = stryMutAct_9fa48("6264") ? selections.reduce((total, other) => total + other.quantity, 0) : (stryCov_9fa48("6264"), selections.filter(other => {
              if (stryMutAct_9fa48("6265")) {
                {}
              } else {
                stryCov_9fa48("6265");
                const otherProduct = products.find(stryMutAct_9fa48("6266") ? () => undefined : (stryCov_9fa48("6266"), entry => stryMutAct_9fa48("6269") ? entry.id !== other.productId : stryMutAct_9fa48("6268") ? false : stryMutAct_9fa48("6267") ? true : (stryCov_9fa48("6267", "6268", "6269"), entry.id === other.productId)));
                return stryMutAct_9fa48("6272") ? other.location.kind === location.kind && accessoryLocationId(other.location) === locationId || otherProduct?.kind === 'knob' === (product?.kind === 'knob') : stryMutAct_9fa48("6271") ? false : stryMutAct_9fa48("6270") ? true : (stryCov_9fa48("6270", "6271", "6272"), (stryMutAct_9fa48("6274") ? other.location.kind === location.kind || accessoryLocationId(other.location) === locationId : stryMutAct_9fa48("6273") ? true : (stryCov_9fa48("6273", "6274"), (stryMutAct_9fa48("6276") ? other.location.kind !== location.kind : stryMutAct_9fa48("6275") ? true : (stryCov_9fa48("6275", "6276"), other.location.kind === location.kind)) && (stryMutAct_9fa48("6278") ? accessoryLocationId(other.location) !== locationId : stryMutAct_9fa48("6277") ? true : (stryCov_9fa48("6277", "6278"), accessoryLocationId(other.location) === locationId)))) && (stryMutAct_9fa48("6280") ? otherProduct?.kind === 'knob' !== (product?.kind === 'knob') : stryMutAct_9fa48("6279") ? true : (stryCov_9fa48("6279", "6280"), (stryMutAct_9fa48("6283") ? otherProduct?.kind !== 'knob' : stryMutAct_9fa48("6282") ? false : stryMutAct_9fa48("6281") ? true : (stryCov_9fa48("6281", "6282", "6283"), (stryMutAct_9fa48("6284") ? otherProduct.kind : (stryCov_9fa48("6284"), otherProduct?.kind)) === (stryMutAct_9fa48("6285") ? "" : (stryCov_9fa48("6285"), 'knob')))) === (stryMutAct_9fa48("6288") ? product?.kind !== 'knob' : stryMutAct_9fa48("6287") ? false : stryMutAct_9fa48("6286") ? true : (stryCov_9fa48("6286", "6287", "6288"), (stryMutAct_9fa48("6289") ? product.kind : (stryCov_9fa48("6289"), product?.kind)) === (stryMutAct_9fa48("6290") ? "" : (stryCov_9fa48("6290"), 'knob')))))));
              }
            }).reduce(stryMutAct_9fa48("6291") ? () => undefined : (stryCov_9fa48("6291"), (total, other) => stryMutAct_9fa48("6292") ? total - other.quantity : (stryCov_9fa48("6292"), total + other.quantity)), 0));
            const capacity = (stryMutAct_9fa48("6295") ? location.kind !== 'key' : stryMutAct_9fa48("6294") ? false : stryMutAct_9fa48("6293") ? true : (stryCov_9fa48("6293", "6294", "6295"), location.kind === (stryMutAct_9fa48("6296") ? "" : (stryCov_9fa48("6296"), 'key')))) ? 1 : stryMutAct_9fa48("6299") ? host.slots?.find(slot => slot.id === locationId)?.capacity : stryMutAct_9fa48("6298") ? host?.slots.find(slot => slot.id === locationId)?.capacity : stryMutAct_9fa48("6297") ? host?.slots?.find(slot => slot.id === locationId).capacity : (stryCov_9fa48("6297", "6298", "6299"), host?.slots?.find(stryMutAct_9fa48("6300") ? () => undefined : (stryCov_9fa48("6300"), slot => stryMutAct_9fa48("6303") ? slot.id !== locationId : stryMutAct_9fa48("6302") ? false : stryMutAct_9fa48("6301") ? true : (stryCov_9fa48("6301", "6302", "6303"), slot.id === locationId)))?.capacity);
            if (stryMutAct_9fa48("6306") ? capacity !== undefined || used > capacity : stryMutAct_9fa48("6305") ? false : stryMutAct_9fa48("6304") ? true : (stryCov_9fa48("6304", "6305", "6306"), (stryMutAct_9fa48("6308") ? capacity === undefined : stryMutAct_9fa48("6307") ? true : (stryCov_9fa48("6307", "6308"), capacity !== undefined)) && (stryMutAct_9fa48("6311") ? used <= capacity : stryMutAct_9fa48("6310") ? used >= capacity : stryMutAct_9fa48("6309") ? true : (stryCov_9fa48("6309", "6310", "6311"), used > capacity)))) {
              if (stryMutAct_9fa48("6312")) {
                {}
              } else {
                stryCov_9fa48("6312");
                result.status = stryMutAct_9fa48("6313") ? "" : (stryCov_9fa48("6313"), 'conflict');
                result.reasons.unshift(stryMutAct_9fa48("6315") ? "" : (stryCov_9fa48("6315"), 'Multiple selections exceed the capacity of this location.'));
              }
            }
          }
        }
        results[selection.id] = result;
      }
    }
    return results;
  }
}
export const MAX_UNMOUNTED_PREVIEWS = 6;
export function unmountedPreviewNote(selections: readonly AccessorySelection[], id: string, products: readonly AccessoryProduct[] = accessoryCatalog): string | null {
  if (stryMutAct_9fa48("6316")) {
    {}
  } else {
    stryCov_9fa48("6316");
    const planned = stryMutAct_9fa48("6317") ? selections : (stryCov_9fa48("6317"), selections.filter(stryMutAct_9fa48("6318") ? () => undefined : (stryCov_9fa48("6318"), selection => stryMutAct_9fa48("6321") ? selection.location.kind === 'embedded' || products.some(product => product.id === selection.productId && (product.id.startsWith('import-accessory:') || product.kind === 'screen' || product.kind === 'buttons' || product.kind === 'encoder')) : stryMutAct_9fa48("6320") ? false : stryMutAct_9fa48("6319") ? true : (stryCov_9fa48("6319", "6320", "6321"), (stryMutAct_9fa48("6323") ? selection.location.kind !== 'embedded' : stryMutAct_9fa48("6322") ? true : (stryCov_9fa48("6322", "6323"), selection.location.kind === (stryMutAct_9fa48("6324") ? "" : (stryCov_9fa48("6324"), 'embedded')))) && (stryMutAct_9fa48("6325") ? products.every(product => product.id === selection.productId && (product.id.startsWith('import-accessory:') || product.kind === 'screen' || product.kind === 'buttons' || product.kind === 'encoder')) : (stryCov_9fa48("6325"), products.some(stryMutAct_9fa48("6326") ? () => undefined : (stryCov_9fa48("6326"), product => stryMutAct_9fa48("6329") ? product.id === selection.productId || product.id.startsWith('import-accessory:') || product.kind === 'screen' || product.kind === 'buttons' || product.kind === 'encoder' : stryMutAct_9fa48("6328") ? false : stryMutAct_9fa48("6327") ? true : (stryCov_9fa48("6327", "6328", "6329"), (stryMutAct_9fa48("6331") ? product.id !== selection.productId : stryMutAct_9fa48("6330") ? true : (stryCov_9fa48("6330", "6331"), product.id === selection.productId)) && (stryMutAct_9fa48("6333") ? (product.id.startsWith('import-accessory:') || product.kind === 'screen' || product.kind === 'buttons') && product.kind === 'encoder' : stryMutAct_9fa48("6332") ? true : (stryCov_9fa48("6332", "6333"), (stryMutAct_9fa48("6335") ? (product.id.startsWith('import-accessory:') || product.kind === 'screen') && product.kind === 'buttons' : stryMutAct_9fa48("6334") ? false : (stryCov_9fa48("6334", "6335"), (stryMutAct_9fa48("6337") ? product.id.startsWith('import-accessory:') && product.kind === 'screen' : stryMutAct_9fa48("6336") ? false : (stryCov_9fa48("6336", "6337"), (stryMutAct_9fa48("6338") ? product.id.endsWith('import-accessory:') : (stryCov_9fa48("6338"), product.id.startsWith(stryMutAct_9fa48("6339") ? "" : (stryCov_9fa48("6339"), 'import-accessory:')))) || (stryMutAct_9fa48("6341") ? product.kind !== 'screen' : stryMutAct_9fa48("6340") ? false : (stryCov_9fa48("6340", "6341"), product.kind === (stryMutAct_9fa48("6342") ? "" : (stryCov_9fa48("6342"), 'screen')))))) || (stryMutAct_9fa48("6344") ? product.kind !== 'buttons' : stryMutAct_9fa48("6343") ? false : (stryCov_9fa48("6343", "6344"), product.kind === (stryMutAct_9fa48("6345") ? "" : (stryCov_9fa48("6345"), 'buttons')))))) || (stryMutAct_9fa48("6347") ? product.kind !== 'encoder' : stryMutAct_9fa48("6346") ? false : (stryCov_9fa48("6346", "6347"), product.kind === (stryMutAct_9fa48("6348") ? "" : (stryCov_9fa48("6348"), 'encoder')))))))))))))));
    const index = planned.findIndex(stryMutAct_9fa48("6349") ? () => undefined : (stryCov_9fa48("6349"), selection => stryMutAct_9fa48("6352") ? selection.id !== id : stryMutAct_9fa48("6351") ? false : stryMutAct_9fa48("6350") ? true : (stryCov_9fa48("6350", "6351", "6352"), selection.id === id)));
    if (stryMutAct_9fa48("6356") ? index >= 0 : stryMutAct_9fa48("6355") ? index <= 0 : stryMutAct_9fa48("6354") ? false : stryMutAct_9fa48("6353") ? true : (stryCov_9fa48("6353", "6354", "6355", "6356"), index < 0)) return null;
    if (stryMutAct_9fa48("6359") ? index < MAX_UNMOUNTED_PREVIEWS || planned[index].productId.startsWith('import-accessory:') : stryMutAct_9fa48("6358") ? false : stryMutAct_9fa48("6357") ? true : (stryCov_9fa48("6357", "6358", "6359"), (stryMutAct_9fa48("6362") ? index >= MAX_UNMOUNTED_PREVIEWS : stryMutAct_9fa48("6361") ? index <= MAX_UNMOUNTED_PREVIEWS : stryMutAct_9fa48("6360") ? true : (stryCov_9fa48("6360", "6361", "6362"), index < MAX_UNMOUNTED_PREVIEWS)) && (stryMutAct_9fa48("6363") ? planned[index].productId.endsWith('import-accessory:') : (stryCov_9fa48("6363"), planned[index].productId.startsWith(stryMutAct_9fa48("6364") ? "" : (stryCov_9fa48("6364"), 'import-accessory:')))))) return stryMutAct_9fa48("6365") ? "" : (stryCov_9fa48("6365"), 'Unmounted reference marker: product geometry is unavailable. Not installed or powered; wiring and firmware are not configured.');
    return (stryMutAct_9fa48("6369") ? index >= MAX_UNMOUNTED_PREVIEWS : stryMutAct_9fa48("6368") ? index <= MAX_UNMOUNTED_PREVIEWS : stryMutAct_9fa48("6367") ? false : stryMutAct_9fa48("6366") ? true : (stryCov_9fa48("6366", "6367", "6368", "6369"), index < MAX_UNMOUNTED_PREVIEWS)) ? stryMutAct_9fa48("6370") ? "" : (stryCov_9fa48("6370"), 'Unmounted parts tray: one illustrative module per selection. Not installed or powered; wiring and firmware are not configured.') : stryMutAct_9fa48("6371") ? "" : (stryCov_9fa48("6371"), 'Not shown: the unmounted parts tray displays the first six module selections. This part remains in your build plan.');
  }
}
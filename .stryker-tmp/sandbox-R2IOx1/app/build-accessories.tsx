// @ts-nocheck
'use client';

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
import { resolveAccessoryProducts } from '../lib/imported-accessories';
import { artisanPreviewNote } from '../lib/artisan-preview';
import { accessoryHost, documentedKeys } from '../lib/accessory-hosts';
import { useState } from 'react';
import { unmountedPreviewNote, assessAccessories, parseAccessories, newAccessorySelection, type AccessorySelection } from '../lib/build-accessories';
import StudioSelect from './studio-select';
import layouts from '../public/models/layouts.json';
import type { Build } from '../lib/build';
import './build-accessories.css';
export default function BuildAccessories({
  selections,
  customAccessories,
  layout,
  selection,
  onChange
}: {
  selections: AccessorySelection[];
  customAccessories?: Build['customAccessories'];
  layout: Build['layout'];
  selection: Build['selection'];
  onChange: (selections: AccessorySelection[]) => void;
}) {
  if (stryMutAct_9fa48("29")) {
    {}
  } else {
    stryCov_9fa48("29");
    const products = resolveAccessoryProducts(customAccessories);
    const [notice, setNotice] = useState(stryMutAct_9fa48("30") ? "Stryker was here!" : (stryCov_9fa48("30"), ''));
    const host = accessoryHost(stryMutAct_9fa48("31") ? {} : (stryCov_9fa48("31"), {
      layout,
      selection
    }));
    const keys = stryMutAct_9fa48("32") ? documentedKeys({
      layout,
      selection
    }) && layouts[layout] : (stryCov_9fa48("32"), documentedKeys(stryMutAct_9fa48("33") ? {} : (stryCov_9fa48("33"), {
      layout,
      selection
    })) ?? layouts[layout]);
    const assessments = assessAccessories(selections, host, products);
    function update(next: AccessorySelection) {
      if (stryMutAct_9fa48("34")) {
        {}
      } else {
        stryCov_9fa48("34");
        onChange(selections.map(stryMutAct_9fa48("36") ? () => undefined : (stryCov_9fa48("36"), item => (stryMutAct_9fa48("39") ? item.id !== next.id : stryMutAct_9fa48("38") ? false : stryMutAct_9fa48("37") ? true : (stryCov_9fa48("37", "38", "39"), item.id === next.id)) ? next : item)));
      }
    }
    return <details className="build-accessories">
      <summary>
        Accessories & artisan caps <span>{stryMutAct_9fa48("42") ? selections.length && 'Explore' : stryMutAct_9fa48("41") ? false : stryMutAct_9fa48("40") ? true : (stryCov_9fa48("40", "41", "42"), selections.length || (stryMutAct_9fa48("43") ? "" : (stryCov_9fa48("43"), 'Explore')))}</span>
      </summary>
      <p>
        Assign artisan caps to keys or place a macropad beside your keyboard.
        Previews use original illustrative geometry, not the maker&apos;s sculpt
        or exact product dimensions.
      </p>
      <p>
        Up to six external module previews are shown, one per selection. Up to
        six unmounted electronics selections appear on parts trays. These
        modules are not installed or powered; wiring and firmware are not
        configured. Fit needs checking against your exact board. A replacement
        knob does not add an encoder or firmware support.
      </p>
      <div className="accessory-selections">
        {selections.map(item => {
          if (stryMutAct_9fa48("44")) {
            {}
          } else {
            stryCov_9fa48("44");
            const product = products.find(stryMutAct_9fa48("45") ? () => undefined : (stryCov_9fa48("45"), part => stryMutAct_9fa48("48") ? part.id !== item.productId : stryMutAct_9fa48("47") ? false : stryMutAct_9fa48("46") ? true : (stryCov_9fa48("46", "47", "48"), part.id === item.productId)));
            if (stryMutAct_9fa48("51") ? false : stryMutAct_9fa48("50") ? true : stryMutAct_9fa48("49") ? product : (stryCov_9fa48("49", "50", "51"), !product)) return null;
            const fit = assessments[item.id];
            const location = item.location;
            return <article key={item.id}>
              <div className="accessory-heading">
                <h4>{product.name}</h4>
                <button type="button" className="text-button" aria-label={stryMutAct_9fa48("52") ? `` : (stryCov_9fa48("52"), `Remove ${product.name}`)} onClick={() => {
                  if (stryMutAct_9fa48("53")) {
                    {}
                  } else {
                    stryCov_9fa48("53");
                    onChange(stryMutAct_9fa48("55") ? selections : (stryCov_9fa48("55"), selections.filter(stryMutAct_9fa48("56") ? () => undefined : (stryCov_9fa48("56"), part => stryMutAct_9fa48("59") ? part.id === item.id : stryMutAct_9fa48("58") ? false : stryMutAct_9fa48("57") ? true : (stryCov_9fa48("57", "58", "59"), part.id !== item.id)))));
                    setNotice(stryMutAct_9fa48("61") ? `` : (stryCov_9fa48("61"), `${product.name} removed.`));
                  }
                }}>
                  Remove
                </button>
              </div>
              <p>
                {product.brand} · {product.kind} · Quantity {item.quantity}
              </p>
              {stryMutAct_9fa48("64") ? product.id.startsWith('import-accessory:') || <p>
                  Imported reference. Product geometry is unavailable; neutral
                  markers indicate placement only, not dimensions or physical
                  fit.
                </p> : stryMutAct_9fa48("63") ? false : stryMutAct_9fa48("62") ? true : (stryCov_9fa48("62", "63", "64"), (stryMutAct_9fa48("65") ? product.id.endsWith('import-accessory:') : (stryCov_9fa48("65"), product.id.startsWith(stryMutAct_9fa48("66") ? "" : (stryCov_9fa48("66"), 'import-accessory:')))) && <p>
                  Imported reference. Product geometry is unavailable; neutral
                  markers indicate placement only, not dimensions or physical
                  fit.
                </p>)}
              {stryMutAct_9fa48("69") ? product.kind === 'artisan' || <>
                  <p>
                    {artisanPreviewNote({
                    layout,
                    selection,
                    accessories: selections,
                    customAccessories
                  }, item.id)}
                  </p>
                </> : stryMutAct_9fa48("68") ? false : stryMutAct_9fa48("67") ? true : (stryCov_9fa48("67", "68", "69"), (stryMutAct_9fa48("71") ? product.kind !== 'artisan' : stryMutAct_9fa48("70") ? true : (stryCov_9fa48("70", "71"), product.kind === (stryMutAct_9fa48("72") ? "" : (stryCov_9fa48("72"), 'artisan')))) && <>
                  <p>
                    {artisanPreviewNote(stryMutAct_9fa48("73") ? {} : (stryCov_9fa48("73"), {
                    layout,
                    selection,
                    accessories: selections,
                    customAccessories
                  }), item.id)}
                  </p>
                </>)}
              {stryMutAct_9fa48("76") ? product.kind !== 'artisan' || <label>
                  Quantity
                  <input key={item.quantity} aria-label={`Quantity for ${product.name}`} type="number" inputMode="numeric" min={1} max={100} step={1} defaultValue={item.quantity} onBlur={event => {
                  const quantity = event.currentTarget.valueAsNumber;
                  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) {
                    event.currentTarget.value = String(item.quantity);
                    setNotice('Enter a whole-number quantity from 1 to 100. Your previous quantity was kept.');
                  } else if (quantity !== item.quantity) {
                    update({
                      ...item,
                      quantity
                    });
                    setNotice(`${product.name} quantity updated to ${quantity}. The scene shows one illustration per selection.`);
                  }
                }} onKeyDown={event => {
                  if (event.key === 'Escape') {
                    event.currentTarget.value = String(item.quantity);
                    event.currentTarget.blur();
                  } else if (event.key === 'Enter') event.currentTarget.blur();
                }} />
                </label> : stryMutAct_9fa48("75") ? false : stryMutAct_9fa48("74") ? true : (stryCov_9fa48("74", "75", "76"), (stryMutAct_9fa48("78") ? product.kind === 'artisan' : stryMutAct_9fa48("77") ? true : (stryCov_9fa48("77", "78"), product.kind !== (stryMutAct_9fa48("79") ? "" : (stryCov_9fa48("79"), 'artisan')))) && <label>
                  Quantity
                  <input key={item.quantity} aria-label={stryMutAct_9fa48("80") ? `` : (stryCov_9fa48("80"), `Quantity for ${product.name}`)} type="number" inputMode="numeric" min={1} max={100} step={1} defaultValue={item.quantity} onBlur={event => {
                  if (stryMutAct_9fa48("81")) {
                    {}
                  } else {
                    stryCov_9fa48("81");
                    const quantity = event.currentTarget.valueAsNumber;
                    if (stryMutAct_9fa48("84") ? (!Number.isInteger(quantity) || quantity < 1) && quantity > 100 : stryMutAct_9fa48("83") ? false : stryMutAct_9fa48("82") ? true : (stryCov_9fa48("82", "83", "84"), (stryMutAct_9fa48("86") ? !Number.isInteger(quantity) && quantity < 1 : stryMutAct_9fa48("85") ? false : (stryCov_9fa48("85", "86"), (stryMutAct_9fa48("87") ? Number.isInteger(quantity) : (stryCov_9fa48("87"), !Number.isInteger(quantity))) || (stryMutAct_9fa48("90") ? quantity >= 1 : stryMutAct_9fa48("89") ? quantity <= 1 : stryMutAct_9fa48("88") ? false : (stryCov_9fa48("88", "89", "90"), quantity < 1)))) || (stryMutAct_9fa48("93") ? quantity <= 100 : stryMutAct_9fa48("92") ? quantity >= 100 : stryMutAct_9fa48("91") ? false : (stryCov_9fa48("91", "92", "93"), quantity > 100)))) {
                      if (stryMutAct_9fa48("94")) {
                        {}
                      } else {
                        stryCov_9fa48("94");
                        event.currentTarget.value = String(item.quantity);
                        setNotice(stryMutAct_9fa48("96") ? "" : (stryCov_9fa48("96"), 'Enter a whole-number quantity from 1 to 100. Your previous quantity was kept.'));
                      }
                    } else if (stryMutAct_9fa48("99") ? quantity === item.quantity : stryMutAct_9fa48("98") ? false : stryMutAct_9fa48("97") ? true : (stryCov_9fa48("97", "98", "99"), quantity !== item.quantity)) {
                      if (stryMutAct_9fa48("100")) {
                        {}
                      } else {
                        stryCov_9fa48("100");
                        update(stryMutAct_9fa48("102") ? {} : (stryCov_9fa48("102"), {
                          ...item,
                          quantity
                        }));
                        setNotice(stryMutAct_9fa48("104") ? `` : (stryCov_9fa48("104"), `${product.name} quantity updated to ${quantity}. The scene shows one illustration per selection.`));
                      }
                    }
                  }
                }} onKeyDown={event => {
                  if (stryMutAct_9fa48("105")) {
                    {}
                  } else {
                    stryCov_9fa48("105");
                    if (stryMutAct_9fa48("108") ? event.key !== 'Escape' : stryMutAct_9fa48("107") ? false : stryMutAct_9fa48("106") ? true : (stryCov_9fa48("106", "107", "108"), event.key === (stryMutAct_9fa48("109") ? "" : (stryCov_9fa48("109"), 'Escape')))) {
                      if (stryMutAct_9fa48("110")) {
                        {}
                      } else {
                        stryCov_9fa48("110");
                        event.currentTarget.value = String(item.quantity);
                        if (stryMutAct_9fa48("111")) {
                          ;
                        } else {
                          stryCov_9fa48("111");
                          event.currentTarget.blur();
                        }
                      }
                    } else if (stryMutAct_9fa48("114") ? event.key !== 'Enter' : stryMutAct_9fa48("113") ? false : stryMutAct_9fa48("112") ? true : (stryCov_9fa48("112", "113", "114"), event.key === (stryMutAct_9fa48("115") ? "" : (stryCov_9fa48("115"), 'Enter')))) if (stryMutAct_9fa48("116")) {
                      ;
                    } else {
                      stryCov_9fa48("116");
                      event.currentTarget.blur();
                    }
                  }
                }} />
                </label>)}
              {stryMutAct_9fa48("119") ? unmountedPreviewNote(selections, item.id, products) || <p>{unmountedPreviewNote(selections, item.id, products)}</p> : stryMutAct_9fa48("118") ? false : stryMutAct_9fa48("117") ? true : (stryCov_9fa48("117", "118", "119"), unmountedPreviewNote(selections, item.id, products) && <p>{unmountedPreviewNote(selections, item.id, products)}</p>)}
              {(stryMutAct_9fa48("122") ? location.kind !== 'external' : stryMutAct_9fa48("121") ? false : stryMutAct_9fa48("120") ? true : (stryCov_9fa48("120", "121", "122"), location.kind === (stryMutAct_9fa48("123") ? "" : (stryCov_9fa48("123"), 'external')))) ? <StudioSelect aria-label={stryMutAct_9fa48("124") ? `` : (stryCov_9fa48("124"), `Position for ${product.name}`)} value={location.position} options={stryMutAct_9fa48("125") ? [] : (stryCov_9fa48("125"), [stryMutAct_9fa48("126") ? {} : (stryCov_9fa48("126"), {
                value: stryMutAct_9fa48("127") ? "" : (stryCov_9fa48("127"), 'left'),
                label: stryMutAct_9fa48("128") ? "" : (stryCov_9fa48("128"), 'Left of keyboard')
              }), stryMutAct_9fa48("129") ? {} : (stryCov_9fa48("129"), {
                value: stryMutAct_9fa48("130") ? "" : (stryCov_9fa48("130"), 'right'),
                label: stryMutAct_9fa48("131") ? "" : (stryCov_9fa48("131"), 'Right of keyboard')
              }), stryMutAct_9fa48("132") ? {} : (stryCov_9fa48("132"), {
                value: stryMutAct_9fa48("133") ? "" : (stryCov_9fa48("133"), 'above'),
                label: stryMutAct_9fa48("134") ? "" : (stryCov_9fa48("134"), 'Above keyboard')
              })])} onValueChange={position => {
                if (stryMutAct_9fa48("135")) {
                  {}
                } else {
                  stryCov_9fa48("135");
                  if (stryMutAct_9fa48("138") ? (position === 'left' || position === 'right') && position === 'above' : stryMutAct_9fa48("137") ? false : stryMutAct_9fa48("136") ? true : (stryCov_9fa48("136", "137", "138"), (stryMutAct_9fa48("140") ? position === 'left' && position === 'right' : stryMutAct_9fa48("139") ? false : (stryCov_9fa48("139", "140"), (stryMutAct_9fa48("142") ? position !== 'left' : stryMutAct_9fa48("141") ? false : (stryCov_9fa48("141", "142"), position === (stryMutAct_9fa48("143") ? "" : (stryCov_9fa48("143"), 'left')))) || (stryMutAct_9fa48("145") ? position !== 'right' : stryMutAct_9fa48("144") ? false : (stryCov_9fa48("144", "145"), position === (stryMutAct_9fa48("146") ? "" : (stryCov_9fa48("146"), 'right')))))) || (stryMutAct_9fa48("148") ? position !== 'above' : stryMutAct_9fa48("147") ? false : (stryCov_9fa48("147", "148"), position === (stryMutAct_9fa48("149") ? "" : (stryCov_9fa48("149"), 'above')))))) update(stryMutAct_9fa48("151") ? {} : (stryCov_9fa48("151"), {
                    ...item,
                    location: stryMutAct_9fa48("152") ? {} : (stryCov_9fa48("152"), {
                      kind: stryMutAct_9fa48("153") ? "" : (stryCov_9fa48("153"), 'external'),
                      position
                    })
                  }));
                }
              }} /> : (stryMutAct_9fa48("156") ? location.kind !== 'key' : stryMutAct_9fa48("155") ? false : stryMutAct_9fa48("154") ? true : (stryCov_9fa48("154", "155", "156"), location.kind === (stryMutAct_9fa48("157") ? "" : (stryCov_9fa48("157"), 'key')))) ? <>
                  <StudioSelect aria-label={stryMutAct_9fa48("158") ? `` : (stryCov_9fa48("158"), `Target key for ${product.name}`)} value={location.keyId} options={stryMutAct_9fa48("159") ? [] : (stryCov_9fa48("159"), [stryMutAct_9fa48("160") ? {} : (stryCov_9fa48("160"), {
                  value: stryMutAct_9fa48("161") ? "" : (stryCov_9fa48("161"), 'unassigned'),
                  label: stryMutAct_9fa48("162") ? "" : (stryCov_9fa48("162"), 'Choose a key')
                }), ...((stryMutAct_9fa48("165") ? !keys.some(key => key.code === location.keyId) || location.keyId !== 'unassigned' : stryMutAct_9fa48("164") ? false : stryMutAct_9fa48("163") ? true : (stryCov_9fa48("163", "164", "165"), (stryMutAct_9fa48("166") ? keys.some(key => key.code === location.keyId) : (stryCov_9fa48("166"), !(stryMutAct_9fa48("167") ? keys.every(key => key.code === location.keyId) : (stryCov_9fa48("167"), keys.some(stryMutAct_9fa48("168") ? () => undefined : (stryCov_9fa48("168"), key => stryMutAct_9fa48("171") ? key.code !== location.keyId : stryMutAct_9fa48("170") ? false : stryMutAct_9fa48("169") ? true : (stryCov_9fa48("169", "170", "171"), key.code === location.keyId))))))) && (stryMutAct_9fa48("173") ? location.keyId === 'unassigned' : stryMutAct_9fa48("172") ? true : (stryCov_9fa48("172", "173"), location.keyId !== (stryMutAct_9fa48("174") ? "" : (stryCov_9fa48("174"), 'unassigned')))))) ? stryMutAct_9fa48("175") ? [] : (stryCov_9fa48("175"), [stryMutAct_9fa48("176") ? {} : (stryCov_9fa48("176"), {
                  value: location.keyId,
                  label: stryMutAct_9fa48("177") ? `` : (stryCov_9fa48("177"), `${location.keyId} · absent from this layout`),
                  disabled: stryMutAct_9fa48("178") ? false : (stryCov_9fa48("178"), true)
                })]) : stryMutAct_9fa48("179") ? ["Stryker was here"] : (stryCov_9fa48("179"), [])), ...keys.map(stryMutAct_9fa48("180") ? () => undefined : (stryCov_9fa48("180"), key => stryMutAct_9fa48("181") ? {} : (stryCov_9fa48("181"), {
                  value: key.code,
                  label: stryMutAct_9fa48("182") ? `` : (stryCov_9fa48("182"), `${stryMutAct_9fa48("185") ? key.label && key.code : stryMutAct_9fa48("184") ? false : stryMutAct_9fa48("183") ? true : (stryCov_9fa48("183", "184", "185"), key.label || key.code)} · ${key.code} · ${key.width}u${(stryMutAct_9fa48("188") ? key.width === product.sizeU : stryMutAct_9fa48("187") ? false : stryMutAct_9fa48("186") ? true : (stryCov_9fa48("186", "187", "188"), key.width !== product.sizeU)) ? stryMutAct_9fa48("189") ? "" : (stryCov_9fa48("189"), ' · different width') : stryMutAct_9fa48("190") ? "Stryker was here!" : (stryCov_9fa48("190"), '')}`),
                  disabled: stryMutAct_9fa48("193") ? key.width !== product.sizeU && selections.some(other => other.id !== item.id && other.location.kind === 'key' && other.location.keyId === key.code) : stryMutAct_9fa48("192") ? false : stryMutAct_9fa48("191") ? true : (stryCov_9fa48("191", "192", "193"), (stryMutAct_9fa48("195") ? key.width === product.sizeU : stryMutAct_9fa48("194") ? false : (stryCov_9fa48("194", "195"), key.width !== product.sizeU)) || (stryMutAct_9fa48("196") ? selections.every(other => other.id !== item.id && other.location.kind === 'key' && other.location.keyId === key.code) : (stryCov_9fa48("196"), selections.some(stryMutAct_9fa48("197") ? () => undefined : (stryCov_9fa48("197"), other => stryMutAct_9fa48("200") ? other.id !== item.id && other.location.kind === 'key' || other.location.keyId === key.code : stryMutAct_9fa48("199") ? false : stryMutAct_9fa48("198") ? true : (stryCov_9fa48("198", "199", "200"), (stryMutAct_9fa48("202") ? other.id !== item.id || other.location.kind === 'key' : stryMutAct_9fa48("201") ? true : (stryCov_9fa48("201", "202"), (stryMutAct_9fa48("204") ? other.id === item.id : stryMutAct_9fa48("203") ? true : (stryCov_9fa48("203", "204"), other.id !== item.id)) && (stryMutAct_9fa48("206") ? other.location.kind !== 'key' : stryMutAct_9fa48("205") ? true : (stryCov_9fa48("205", "206"), other.location.kind === (stryMutAct_9fa48("207") ? "" : (stryCov_9fa48("207"), 'key')))))) && (stryMutAct_9fa48("209") ? other.location.keyId !== key.code : stryMutAct_9fa48("208") ? true : (stryCov_9fa48("208", "209"), other.location.keyId === key.code))))))))
                })))])} onValueChange={stryMutAct_9fa48("210") ? () => undefined : (stryCov_9fa48("210"), keyId => update(stryMutAct_9fa48("211") ? {} : (stryCov_9fa48("211"), {
                  ...item,
                  location: stryMutAct_9fa48("212") ? {} : (stryCov_9fa48("212"), {
                    kind: stryMutAct_9fa48("213") ? "" : (stryCov_9fa48("213"), 'key'),
                    keyId
                  })
                })))} />
                  <p>
                    Key choices follow{stryMutAct_9fa48("214") ? "" : (stryCov_9fa48("214"), ' ')}
                    {host ? stryMutAct_9fa48("215") ? "" : (stryCov_9fa48("215"), 'the documented Q1 Max ANSI layout') : stryMutAct_9fa48("216") ? `` : (stryCov_9fa48("216"), `the ${layout}% visual study`)}
                    . Matching width does not verify stem, profile or clearance.
                  </p>
                </> : (stryMutAct_9fa48("217") ? host.slots : (stryCov_9fa48("217"), host?.slots)) ? <StudioSelect aria-label={stryMutAct_9fa48("218") ? `` : (stryCov_9fa48("218"), `Board slot for ${product.name}`)} value={location.slotId} options={stryMutAct_9fa48("219") ? [] : (stryCov_9fa48("219"), [stryMutAct_9fa48("220") ? {} : (stryCov_9fa48("220"), {
                value: stryMutAct_9fa48("221") ? "" : (stryCov_9fa48("221"), 'unassigned'),
                label: stryMutAct_9fa48("222") ? "" : (stryCov_9fa48("222"), 'Choose a slot')
              }), ...host.slots.map(stryMutAct_9fa48("223") ? () => undefined : (stryCov_9fa48("223"), slot => stryMutAct_9fa48("224") ? {} : (stryCov_9fa48("224"), {
                value: slot.id,
                label: stryMutAct_9fa48("225") ? "" : (stryCov_9fa48("225"), 'Stock knob cap'),
                disabled: stryMutAct_9fa48("226") ? slot.kinds.includes(product.kind) : (stryCov_9fa48("226"), !slot.kinds.includes(product.kind))
              }))), ...((stryMutAct_9fa48("229") ? location.slotId !== 'unassigned' || !host.slots.some(slot => slot.id === location.slotId) : stryMutAct_9fa48("228") ? false : stryMutAct_9fa48("227") ? true : (stryCov_9fa48("227", "228", "229"), (stryMutAct_9fa48("231") ? location.slotId === 'unassigned' : stryMutAct_9fa48("230") ? true : (stryCov_9fa48("230", "231"), location.slotId !== (stryMutAct_9fa48("232") ? "" : (stryCov_9fa48("232"), 'unassigned')))) && (stryMutAct_9fa48("233") ? host.slots.some(slot => slot.id === location.slotId) : (stryCov_9fa48("233"), !(stryMutAct_9fa48("234") ? host.slots.every(slot => slot.id === location.slotId) : (stryCov_9fa48("234"), host.slots.some(stryMutAct_9fa48("235") ? () => undefined : (stryCov_9fa48("235"), slot => stryMutAct_9fa48("238") ? slot.id !== location.slotId : stryMutAct_9fa48("237") ? false : stryMutAct_9fa48("236") ? true : (stryCov_9fa48("236", "237", "238"), slot.id === location.slotId))))))))) ? stryMutAct_9fa48("239") ? [] : (stryCov_9fa48("239"), [stryMutAct_9fa48("240") ? {} : (stryCov_9fa48("240"), {
                value: location.slotId,
                label: stryMutAct_9fa48("241") ? `` : (stryCov_9fa48("241"), `${location.slotId} · undocumented slot`),
                disabled: stryMutAct_9fa48("242") ? false : (stryCov_9fa48("242"), true)
              })]) : stryMutAct_9fa48("243") ? ["Stryker was here"] : (stryCov_9fa48("243"), []))])} onValueChange={stryMutAct_9fa48("244") ? () => undefined : (stryCov_9fa48("244"), slotId => update(stryMutAct_9fa48("245") ? {} : (stryCov_9fa48("245"), {
                ...item,
                location: stryMutAct_9fa48("246") ? {} : (stryCov_9fa48("246"), {
                  kind: stryMutAct_9fa48("247") ? "" : (stryCov_9fa48("247"), 'embedded'),
                  slotId
                })
              })))} /> : <label className="accessory-placement">
                  Board slot
                  <input aria-label={stryMutAct_9fa48("248") ? `` : (stryCov_9fa48("248"), `Board slot for ${product.name}`)} key={location.slotId} defaultValue={location.slotId} maxLength={80} onBlur={event => {
                  if (stryMutAct_9fa48("249")) {
                    {}
                  } else {
                    stryCov_9fa48("249");
                    const value = event.target.value;
                    if (stryMutAct_9fa48("252") ? false : stryMutAct_9fa48("251") ? true : stryMutAct_9fa48("250") ? value.trim() : (stryCov_9fa48("250", "251", "252"), !(stryMutAct_9fa48("253") ? value : (stryCov_9fa48("253"), value.trim())))) event.target.value = location.slotId;else {
                      if (stryMutAct_9fa48("254")) {
                        {}
                      } else {
                        stryCov_9fa48("254");
                        try {
                          if (stryMutAct_9fa48("255")) {
                            {}
                          } else {
                            stryCov_9fa48("255");
                            const next = parseAccessories(stryMutAct_9fa48("256") ? [] : (stryCov_9fa48("256"), [stryMutAct_9fa48("257") ? {} : (stryCov_9fa48("257"), {
                              ...item,
                              location: stryMutAct_9fa48("258") ? {} : (stryCov_9fa48("258"), {
                                kind: stryMutAct_9fa48("259") ? "" : (stryCov_9fa48("259"), 'embedded'),
                                slotId: value
                              })
                            })]), products)[0];
                            if (stryMutAct_9fa48("260")) {
                              ;
                            } else {
                              stryCov_9fa48("260");
                              update(next);
                            }
                            setNotice(stryMutAct_9fa48("262") ? "" : (stryCov_9fa48("262"), 'Placement saved. Physical fit still needs checking.'));
                          }
                        } catch {
                          if (stryMutAct_9fa48("263")) {
                            {}
                          } else {
                            stryCov_9fa48("263");
                            event.target.value = location.slotId;
                            setNotice(stryMutAct_9fa48("265") ? "" : (stryCov_9fa48("265"), 'Use letters, numbers, dots, dashes, underscores or colons for a key or slot identifier.'));
                          }
                        }
                      }
                    }
                  }
                }} />
                </label>}
              <p className="accessory-fit">
                Fit {fit.status}: {fit.reasons.join(stryMutAct_9fa48("266") ? "" : (stryCov_9fa48("266"), ' '))}
              </p>
              <a href={product.source} target="_blank" rel="noreferrer">
                Maker specifications ↗
              </a>
            </article>;
          }
        })}
      </div>
      <details className="accessory-picker">
        <summary>Add an accessory</summary>
        <div className="accessory-options">
          {products.map(stryMutAct_9fa48("267") ? () => undefined : (stryCov_9fa48("267"), product => <article key={product.id}>
              <h4>{product.name}</h4>
              <p>{product.detail}</p>
              <div className="accessory-heading">
                <a href={product.source} target="_blank" rel="noreferrer">
                  {product.brand} ↗
                </a>
                <button type="button" className="text-button" disabled={stryMutAct_9fa48("271") ? selections.length < 100 : stryMutAct_9fa48("270") ? selections.length > 100 : stryMutAct_9fa48("269") ? false : stryMutAct_9fa48("268") ? true : (stryCov_9fa48("268", "269", "270", "271"), selections.length >= 100)} onClick={() => {
                if (stryMutAct_9fa48("272")) {
                  {}
                } else {
                  stryCov_9fa48("272");
                  onChange(stryMutAct_9fa48("274") ? [] : (stryCov_9fa48("274"), [...selections, newAccessorySelection(product.id, products)]));
                  setNotice(stryMutAct_9fa48("276") ? `` : (stryCov_9fa48("276"), `${product.name} added to your build plan. Fit is not verified.`));
                }
              }}>
                  Add <span className="sr-only">{product.name}</span>
                </button>
              </div>
            </article>))}
        </div>
      </details>
      <output>{notice}</output>
    </details>;
  }
}
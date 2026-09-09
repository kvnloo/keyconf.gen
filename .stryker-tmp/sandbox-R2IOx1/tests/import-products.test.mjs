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
import test from 'node:test';
import assert from 'node:assert/strict';
import { parseStructuredProducts, importWebsite, isImportResult } from '../lib/import-products.ts';
const source = stryMutAct_9fa48("20571") ? "" : (stryCov_9fa48("20571"), 'https://switch-shop.example/collections/switches');
const parse = stryMutAct_9fa48("20572") ? () => undefined : (stryCov_9fa48("20572"), (() => {
  const parse = data => parseStructuredProducts(stryMutAct_9fa48("20573") ? `` : (stryCov_9fa48("20573"), `<script type="application/ld+json">${JSON.stringify(data)}</script>`), source);
  return parse;
})());
test(stryMutAct_9fa48("20575") ? "" : (stryCov_9fa48("20575"), 'aggregate offer keeps its range instead of pretending the lowest price is exact'), () => {
  if (stryMutAct_9fa48("20576")) {
    {}
  } else {
    stryCov_9fa48("20576");
    const [product] = parse(stryMutAct_9fa48("20577") ? {} : (stryCov_9fa48("20577"), {
      '@type': stryMutAct_9fa48("20578") ? "" : (stryCov_9fa48("20578"), 'Product'),
      name: stryMutAct_9fa48("20579") ? "" : (stryCov_9fa48("20579"), 'Switch sampler'),
      offers: stryMutAct_9fa48("20580") ? {} : (stryCov_9fa48("20580"), {
        '@type': stryMutAct_9fa48("20581") ? "" : (stryCov_9fa48("20581"), 'AggregateOffer'),
        lowPrice: stryMutAct_9fa48("20582") ? "" : (stryCov_9fa48("20582"), '12.50'),
        highPrice: stryMutAct_9fa48("20583") ? "" : (stryCov_9fa48("20583"), '35'),
        priceCurrency: stryMutAct_9fa48("20584") ? "" : (stryCov_9fa48("20584"), 'USD')
      })
    }));
    assert.deepEqual(product.pricing, stryMutAct_9fa48("20586") ? {} : (stryCov_9fa48("20586"), {
      kind: stryMutAct_9fa48("20587") ? "" : (stryCov_9fa48("20587"), 'range'),
      min: stryMutAct_9fa48("20588") ? "" : (stryCov_9fa48("20588"), '12.50'),
      max: stryMutAct_9fa48("20589") ? "" : (stryCov_9fa48("20589"), '35'),
      currency: stryMutAct_9fa48("20590") ? "" : (stryCov_9fa48("20590"), 'USD')
    }));
    const [from] = parse(stryMutAct_9fa48("20591") ? {} : (stryCov_9fa48("20591"), {
      '@type': stryMutAct_9fa48("20592") ? "" : (stryCov_9fa48("20592"), 'Product'),
      name: stryMutAct_9fa48("20593") ? "" : (stryCov_9fa48("20593"), 'Switch sampler'),
      offers: stryMutAct_9fa48("20594") ? {} : (stryCov_9fa48("20594"), {
        '@type': stryMutAct_9fa48("20595") ? "" : (stryCov_9fa48("20595"), 'AggregateOffer'),
        lowPrice: stryMutAct_9fa48("20596") ? "" : (stryCov_9fa48("20596"), '12.50'),
        priceCurrency: stryMutAct_9fa48("20597") ? "" : (stryCov_9fa48("20597"), 'USD')
      })
    }));
    assert.deepEqual(from.pricing, stryMutAct_9fa48("20599") ? {} : (stryCov_9fa48("20599"), {
      kind: stryMutAct_9fa48("20600") ? "" : (stryCov_9fa48("20600"), 'from'),
      amount: stryMutAct_9fa48("20601") ? "" : (stryCov_9fa48("20601"), '12.50'),
      currency: stryMutAct_9fa48("20602") ? "" : (stryCov_9fa48("20602"), 'USD')
    }));
  }
});
test(stryMutAct_9fa48("20604") ? "" : (stryCov_9fa48("20604"), 'conflicting currencies and mixed stock do not become one invented offer'), () => {
  if (stryMutAct_9fa48("20605")) {
    {}
  } else {
    stryCov_9fa48("20605");
    const [product] = parse(stryMutAct_9fa48("20606") ? {} : (stryCov_9fa48("20606"), {
      '@type': stryMutAct_9fa48("20607") ? "" : (stryCov_9fa48("20607"), 'Product'),
      name: stryMutAct_9fa48("20608") ? "" : (stryCov_9fa48("20608"), 'Switch sampler'),
      offers: stryMutAct_9fa48("20609") ? [] : (stryCov_9fa48("20609"), [stryMutAct_9fa48("20610") ? {} : (stryCov_9fa48("20610"), {
        price: stryMutAct_9fa48("20611") ? "" : (stryCov_9fa48("20611"), '12'),
        priceCurrency: stryMutAct_9fa48("20612") ? "" : (stryCov_9fa48("20612"), 'USD'),
        availability: stryMutAct_9fa48("20613") ? "" : (stryCov_9fa48("20613"), 'https://schema.org/InStock')
      }), stryMutAct_9fa48("20614") ? {} : (stryCov_9fa48("20614"), {
        price: stryMutAct_9fa48("20615") ? "" : (stryCov_9fa48("20615"), '10'),
        priceCurrency: stryMutAct_9fa48("20616") ? "" : (stryCov_9fa48("20616"), 'EUR'),
        availability: stryMutAct_9fa48("20617") ? "" : (stryCov_9fa48("20617"), 'https://schema.org/OutOfStock')
      })])
    }));
    assert.deepEqual(product.pricing, stryMutAct_9fa48("20619") ? {} : (stryCov_9fa48("20619"), {
      kind: stryMutAct_9fa48("20620") ? "" : (stryCov_9fa48("20620"), 'unknown')
    }));
    assert.equal(product.availability, stryMutAct_9fa48("20622") ? "" : (stryCov_9fa48("20622"), 'Varies by offer'));
  }
});
test(stryMutAct_9fa48("20624") ? "" : (stryCov_9fa48("20624"), 'referenced variants inherit group identity but keep their own SKU, URL and price'), () => {
  if (stryMutAct_9fa48("20625")) {
    {}
  } else {
    stryCov_9fa48("20625");
    const products = parse(stryMutAct_9fa48("20626") ? {} : (stryCov_9fa48("20626"), {
      '@graph': stryMutAct_9fa48("20627") ? [] : (stryCov_9fa48("20627"), [stryMutAct_9fa48("20628") ? {} : (stryCov_9fa48("20628"), {
        '@id': stryMutAct_9fa48("20629") ? "" : (stryCov_9fa48("20629"), '#ivory'),
        '@type': stryMutAct_9fa48("20630") ? "" : (stryCov_9fa48("20630"), 'Product'),
        name: stryMutAct_9fa48("20631") ? "" : (stryCov_9fa48("20631"), 'Desk keycaps · Ivory'),
        sku: stryMutAct_9fa48("20632") ? "" : (stryCov_9fa48("20632"), 'CAP-I'),
        offers: stryMutAct_9fa48("20633") ? {} : (stryCov_9fa48("20633"), {
          price: stryMutAct_9fa48("20634") ? "" : (stryCov_9fa48("20634"), '45'),
          priceCurrency: stryMutAct_9fa48("20635") ? "" : (stryCov_9fa48("20635"), 'USD'),
          url: stryMutAct_9fa48("20636") ? "" : (stryCov_9fa48("20636"), '/products/caps?variant=ivory')
        })
      }), stryMutAct_9fa48("20637") ? {} : (stryCov_9fa48("20637"), {
        '@id': stryMutAct_9fa48("20638") ? "" : (stryCov_9fa48("20638"), '#caps'),
        '@type': stryMutAct_9fa48("20639") ? "" : (stryCov_9fa48("20639"), 'ProductGroup'),
        name: stryMutAct_9fa48("20640") ? "" : (stryCov_9fa48("20640"), 'Desk keycaps'),
        brand: stryMutAct_9fa48("20641") ? {} : (stryCov_9fa48("20641"), {
          name: stryMutAct_9fa48("20642") ? "" : (stryCov_9fa48("20642"), 'Key Maker')
        }),
        hasVariant: stryMutAct_9fa48("20643") ? [] : (stryCov_9fa48("20643"), [stryMutAct_9fa48("20644") ? {} : (stryCov_9fa48("20644"), {
          '@id': stryMutAct_9fa48("20645") ? "" : (stryCov_9fa48("20645"), '#ivory')
        }), stryMutAct_9fa48("20646") ? {} : (stryCov_9fa48("20646"), {
          '@type': stryMutAct_9fa48("20647") ? "" : (stryCov_9fa48("20647"), 'Product'),
          color: stryMutAct_9fa48("20648") ? "" : (stryCov_9fa48("20648"), 'Sage'),
          sku: stryMutAct_9fa48("20649") ? "" : (stryCov_9fa48("20649"), 'CAP-S'),
          url: stryMutAct_9fa48("20650") ? "" : (stryCov_9fa48("20650"), '/products/caps?variant=sage')
        })])
      })])
    }));
    if (stryMutAct_9fa48("20651")) {
      ;
    } else {
      stryCov_9fa48("20651");
      assert.equal(products.length, 2);
    }
    assert.deepEqual(products.map(stryMutAct_9fa48("20653") ? () => undefined : (stryCov_9fa48("20653"), p => p.brand)), stryMutAct_9fa48("20654") ? [] : (stryCov_9fa48("20654"), [stryMutAct_9fa48("20655") ? "" : (stryCov_9fa48("20655"), 'Key Maker'), stryMutAct_9fa48("20656") ? "" : (stryCov_9fa48("20656"), 'Key Maker')]));
    assert.equal(products[0].url, stryMutAct_9fa48("20658") ? "" : (stryCov_9fa48("20658"), 'https://switch-shop.example/products/caps?variant=ivory'));
    assert.deepEqual(products[0].pricing, stryMutAct_9fa48("20660") ? {} : (stryCov_9fa48("20660"), {
      kind: stryMutAct_9fa48("20661") ? "" : (stryCov_9fa48("20661"), 'exact'),
      amount: stryMutAct_9fa48("20662") ? "" : (stryCov_9fa48("20662"), '45'),
      currency: stryMutAct_9fa48("20663") ? "" : (stryCov_9fa48("20663"), 'USD')
    }));
    assert.equal(products[1].name, stryMutAct_9fa48("20665") ? "" : (stryCov_9fa48("20665"), 'Desk keycaps · Sage'));
    assert.deepEqual(products[1].pricing, stryMutAct_9fa48("20667") ? {} : (stryCov_9fa48("20667"), {
      kind: stryMutAct_9fa48("20668") ? "" : (stryCov_9fa48("20668"), 'unknown')
    }));
    assert.deepEqual(products.map(stryMutAct_9fa48("20670") ? () => undefined : (stryCov_9fa48("20670"), p => p.sku)), stryMutAct_9fa48("20671") ? [] : (stryCov_9fa48("20671"), [stryMutAct_9fa48("20672") ? "" : (stryCov_9fa48("20672"), 'CAP-I'), stryMutAct_9fa48("20673") ? "" : (stryCov_9fa48("20673"), 'CAP-S')]));
  }
});
test(stryMutAct_9fa48("20675") ? "" : (stryCov_9fa48("20675"), 'Shopify catalog previews keep both switch variants and their variant-specific links'), async t => {
  if (stryMutAct_9fa48("20676")) {
    {}
  } else {
    stryCov_9fa48("20676");
    t.mock.method(globalThis, stryMutAct_9fa48("20678") ? "" : (stryCov_9fa48("20678"), 'fetch'), async input => {
      if (stryMutAct_9fa48("20679")) {
        {}
      } else {
        stryCov_9fa48("20679");
        const url = String(input);
        if (stryMutAct_9fa48("20682") ? url.endsWith('https://cloudflare-dns.com/') : stryMutAct_9fa48("20681") ? false : stryMutAct_9fa48("20680") ? true : (stryCov_9fa48("20680", "20681", "20682"), url.startsWith(stryMutAct_9fa48("20683") ? "" : (stryCov_9fa48("20683"), 'https://cloudflare-dns.com/')))) return Response.json(stryMutAct_9fa48("20684") ? {} : (stryCov_9fa48("20684"), {
          Answer: stryMutAct_9fa48("20685") ? [] : (stryCov_9fa48("20685"), [stryMutAct_9fa48("20686") ? {} : (stryCov_9fa48("20686"), {
            type: 1,
            data: stryMutAct_9fa48("20687") ? "" : (stryCov_9fa48("20687"), '1.1.1.1')
          })])
        }));
        if (stryMutAct_9fa48("20689") ? false : stryMutAct_9fa48("20688") ? true : (stryCov_9fa48("20688", "20689"), url.includes(stryMutAct_9fa48("20690") ? "" : (stryCov_9fa48("20690"), '/graphql.json')))) return Response.json(stryMutAct_9fa48("20691") ? {} : (stryCov_9fa48("20691"), {
          data: stryMutAct_9fa48("20692") ? {} : (stryCov_9fa48("20692"), {
            products: stryMutAct_9fa48("20693") ? {} : (stryCov_9fa48("20693"), {
              nodes: stryMutAct_9fa48("20694") ? [] : (stryCov_9fa48("20694"), [stryMutAct_9fa48("20695") ? {} : (stryCov_9fa48("20695"), {
                title: stryMutAct_9fa48("20696") ? "" : (stryCov_9fa48("20696"), 'Linear switches'),
                vendor: stryMutAct_9fa48("20697") ? "" : (stryCov_9fa48("20697"), 'Switch Maker'),
                onlineStoreUrl: stryMutAct_9fa48("20698") ? "" : (stryCov_9fa48("20698"), 'https://switch-shop.example/products/linear'),
                variants: stryMutAct_9fa48("20699") ? {} : (stryCov_9fa48("20699"), {
                  nodes: stryMutAct_9fa48("20700") ? [] : (stryCov_9fa48("20700"), [stryMutAct_9fa48("20701") ? {} : (stryCov_9fa48("20701"), {
                    id: stryMutAct_9fa48("20702") ? "" : (stryCov_9fa48("20702"), 'gid://shopify/ProductVariant/101'),
                    title: stryMutAct_9fa48("20703") ? "" : (stryCov_9fa48("20703"), '45 g / 70 switches'),
                    sku: stryMutAct_9fa48("20704") ? "" : (stryCov_9fa48("20704"), '45-70'),
                    price: stryMutAct_9fa48("20705") ? {} : (stryCov_9fa48("20705"), {
                      amount: stryMutAct_9fa48("20706") ? "" : (stryCov_9fa48("20706"), '42.00'),
                      currencyCode: stryMutAct_9fa48("20707") ? "" : (stryCov_9fa48("20707"), 'USD')
                    }),
                    availableForSale: stryMutAct_9fa48("20708") ? false : (stryCov_9fa48("20708"), true)
                  }), stryMutAct_9fa48("20709") ? {} : (stryCov_9fa48("20709"), {
                    id: stryMutAct_9fa48("20710") ? "" : (stryCov_9fa48("20710"), 'gid://shopify/ProductVariant/102'),
                    title: stryMutAct_9fa48("20711") ? "" : (stryCov_9fa48("20711"), '55 g / 90 switches'),
                    sku: stryMutAct_9fa48("20712") ? "" : (stryCov_9fa48("20712"), '55-90'),
                    price: stryMutAct_9fa48("20713") ? {} : (stryCov_9fa48("20713"), {
                      amount: stryMutAct_9fa48("20714") ? "" : (stryCov_9fa48("20714"), '54.00'),
                      currencyCode: stryMutAct_9fa48("20715") ? "" : (stryCov_9fa48("20715"), 'USD')
                    }),
                    availableForSale: stryMutAct_9fa48("20716") ? true : (stryCov_9fa48("20716"), false)
                  })]),
                  pageInfo: stryMutAct_9fa48("20717") ? {} : (stryCov_9fa48("20717"), {
                    hasNextPage: stryMutAct_9fa48("20718") ? true : (stryCov_9fa48("20718"), false)
                  })
                })
              })]),
              pageInfo: stryMutAct_9fa48("20719") ? {} : (stryCov_9fa48("20719"), {
                hasNextPage: stryMutAct_9fa48("20720") ? false : (stryCov_9fa48("20720"), true),
                endCursor: stryMutAct_9fa48("20721") ? "" : (stryCov_9fa48("20721"), 'next-products')
              })
            })
          })
        }));
        return new Response(stryMutAct_9fa48("20722") ? "" : (stryCov_9fa48("20722"), '<html><script>Shopify.shop="switch-shop.example"</script></html>'));
      }
    });
    const result = await importWebsite(new URL(stryMutAct_9fa48("20723") ? "" : (stryCov_9fa48("20723"), '/'), source).href);
    if (stryMutAct_9fa48("20724")) {
      ;
    } else {
      stryCov_9fa48("20724");
      assert.equal(result.products.length, 2);
    }
    assert.deepEqual(result.products.map(stryMutAct_9fa48("20726") ? () => undefined : (stryCov_9fa48("20726"), p => p.name)), stryMutAct_9fa48("20727") ? [] : (stryCov_9fa48("20727"), [stryMutAct_9fa48("20728") ? "" : (stryCov_9fa48("20728"), 'Linear switches · 45 g / 70 switches'), stryMutAct_9fa48("20729") ? "" : (stryCov_9fa48("20729"), 'Linear switches · 55 g / 90 switches')]));
    assert.deepEqual(result.products.map(stryMutAct_9fa48("20731") ? () => undefined : (stryCov_9fa48("20731"), p => new URL(p.url).searchParams.get(stryMutAct_9fa48("20732") ? "" : (stryCov_9fa48("20732"), 'variant')))), stryMutAct_9fa48("20733") ? [] : (stryCov_9fa48("20733"), [stryMutAct_9fa48("20734") ? "" : (stryCov_9fa48("20734"), '101'), stryMutAct_9fa48("20735") ? "" : (stryCov_9fa48("20735"), '102')]));
    assert.deepEqual(result.products[1].pricing, stryMutAct_9fa48("20737") ? {} : (stryCov_9fa48("20737"), {
      kind: stryMutAct_9fa48("20738") ? "" : (stryCov_9fa48("20738"), 'exact'),
      amount: stryMutAct_9fa48("20739") ? "" : (stryCov_9fa48("20739"), '54.00'),
      currency: stryMutAct_9fa48("20740") ? "" : (stryCov_9fa48("20740"), 'USD')
    }));
    assert.equal(result.products[1].availability, stryMutAct_9fa48("20742") ? "" : (stryCov_9fa48("20742"), 'Unavailable'));
    if (stryMutAct_9fa48("20743")) {
      ;
    } else {
      stryCov_9fa48("20743");
      assert.match(result.coverage, /more products/i);
    }
  }
});
test(stryMutAct_9fa48("20745") ? "" : (stryCov_9fa48("20745"), 'equivalent relative and absolute node identifiers resolve the same group, brand and offer'), () => {
  if (stryMutAct_9fa48("20746")) {
    {}
  } else {
    stryCov_9fa48("20746");
    const [product] = parse(stryMutAct_9fa48("20747") ? {} : (stryCov_9fa48("20747"), {
      '@graph': stryMutAct_9fa48("20748") ? [] : (stryCov_9fa48("20748"), [stryMutAct_9fa48("20749") ? {} : (stryCov_9fa48("20749"), {
        '@type': stryMutAct_9fa48("20750") ? "" : (stryCov_9fa48("20750"), 'Product'),
        '@id': stryMutAct_9fa48("20751") ? "" : (stryCov_9fa48("20751"), '#sage'),
        color: stryMutAct_9fa48("20752") ? "" : (stryCov_9fa48("20752"), 'Sage'),
        sku: stryMutAct_9fa48("20753") ? "" : (stryCov_9fa48("20753"), 'SAGE'),
        offers: stryMutAct_9fa48("20754") ? {} : (stryCov_9fa48("20754"), {
          '@id': source + (stryMutAct_9fa48("20755") ? "" : (stryCov_9fa48("20755"), '#offer'))
        })
      }), stryMutAct_9fa48("20756") ? {} : (stryCov_9fa48("20756"), {
        '@type': stryMutAct_9fa48("20757") ? "" : (stryCov_9fa48("20757"), 'ProductGroup'),
        name: stryMutAct_9fa48("20758") ? "" : (stryCov_9fa48("20758"), 'Desk keycaps'),
        brand: stryMutAct_9fa48("20759") ? {} : (stryCov_9fa48("20759"), {
          '@id': source + (stryMutAct_9fa48("20760") ? "" : (stryCov_9fa48("20760"), '#maker'))
        }),
        hasVariant: stryMutAct_9fa48("20761") ? {} : (stryCov_9fa48("20761"), {
          '@id': source + (stryMutAct_9fa48("20762") ? "" : (stryCov_9fa48("20762"), '#sage'))
        })
      }), stryMutAct_9fa48("20763") ? {} : (stryCov_9fa48("20763"), {
        '@id': stryMutAct_9fa48("20764") ? "" : (stryCov_9fa48("20764"), '#maker'),
        name: stryMutAct_9fa48("20765") ? "" : (stryCov_9fa48("20765"), 'Key Maker')
      }), stryMutAct_9fa48("20766") ? {} : (stryCov_9fa48("20766"), {
        '@id': stryMutAct_9fa48("20767") ? "" : (stryCov_9fa48("20767"), '#offer'),
        price: stryMutAct_9fa48("20768") ? "" : (stryCov_9fa48("20768"), '45'),
        priceCurrency: stryMutAct_9fa48("20769") ? "" : (stryCov_9fa48("20769"), 'USD')
      })])
    }));
    assert.equal(product.name, stryMutAct_9fa48("20771") ? "" : (stryCov_9fa48("20771"), 'Desk keycaps · Sage'));
    assert.equal(product.brand, stryMutAct_9fa48("20773") ? "" : (stryCov_9fa48("20773"), 'Key Maker'));
    assert.deepEqual(product.pricing, stryMutAct_9fa48("20775") ? {} : (stryCov_9fa48("20775"), {
      kind: stryMutAct_9fa48("20776") ? "" : (stryCov_9fa48("20776"), 'exact'),
      amount: stryMutAct_9fa48("20777") ? "" : (stryCov_9fa48("20777"), '45'),
      currency: stryMutAct_9fa48("20778") ? "" : (stryCov_9fa48("20778"), 'USD')
    }));
  }
});
test(stryMutAct_9fa48("20780") ? "" : (stryCov_9fa48("20780"), 'malformed prices stay unverified and malformed API results are rejected'), () => {
  if (stryMutAct_9fa48("20781")) {
    {}
  } else {
    stryCov_9fa48("20781");
    for (const offers of stryMutAct_9fa48("20782") ? [] : (stryCov_9fa48("20782"), [stryMutAct_9fa48("20783") ? {} : (stryCov_9fa48("20783"), {
      price: stryMutAct_9fa48("20784") ? "" : (stryCov_9fa48("20784"), '-12'),
      priceCurrency: stryMutAct_9fa48("20785") ? "" : (stryCov_9fa48("20785"), 'USD')
    }), stryMutAct_9fa48("20786") ? {} : (stryCov_9fa48("20786"), {
      price: stryMutAct_9fa48("20787") ? "" : (stryCov_9fa48("20787"), '12')
    }), stryMutAct_9fa48("20788") ? {} : (stryCov_9fa48("20788"), {
      lowPrice: stryMutAct_9fa48("20789") ? "" : (stryCov_9fa48("20789"), '25'),
      highPrice: stryMutAct_9fa48("20790") ? "" : (stryCov_9fa48("20790"), '12'),
      priceCurrency: stryMutAct_9fa48("20791") ? "" : (stryCov_9fa48("20791"), 'USD')
    }), stryMutAct_9fa48("20792") ? [] : (stryCov_9fa48("20792"), [stryMutAct_9fa48("20793") ? {} : (stryCov_9fa48("20793"), {
      price: stryMutAct_9fa48("20794") ? "" : (stryCov_9fa48("20794"), '12'),
      priceCurrency: stryMutAct_9fa48("20795") ? "" : (stryCov_9fa48("20795"), 'USD')
    }), stryMutAct_9fa48("20796") ? {} : (stryCov_9fa48("20796"), {
      price: stryMutAct_9fa48("20797") ? "" : (stryCov_9fa48("20797"), 'unknown'),
      priceCurrency: stryMutAct_9fa48("20798") ? "" : (stryCov_9fa48("20798"), 'USD')
    })])])) {
      if (stryMutAct_9fa48("20799")) {
        {}
      } else {
        stryCov_9fa48("20799");
        const products = parse(stryMutAct_9fa48("20800") ? {} : (stryCov_9fa48("20800"), {
          '@type': stryMutAct_9fa48("20801") ? "" : (stryCov_9fa48("20801"), 'Product'),
          name: stryMutAct_9fa48("20802") ? "" : (stryCov_9fa48("20802"), 'Switches'),
          offers
        }));
        assert.deepEqual(products[0].pricing, stryMutAct_9fa48("20804") ? {} : (stryCov_9fa48("20804"), {
          kind: stryMutAct_9fa48("20805") ? "" : (stryCov_9fa48("20805"), 'unknown')
        }));
        const result = stryMutAct_9fa48("20806") ? {} : (stryCov_9fa48("20806"), {
          products,
          method: stryMutAct_9fa48("20807") ? "" : (stryCov_9fa48("20807"), 'Structured data'),
          source,
          observedAt: stryMutAct_9fa48("20808") ? "" : (stryCov_9fa48("20808"), '2026-09-05'),
          coverage: stryMutAct_9fa48("20809") ? "" : (stryCov_9fa48("20809"), 'One page')
        });
        assert.equal(isImportResult(result), stryMutAct_9fa48("20811") ? false : (stryCov_9fa48("20811"), true));
        products[0].pricing = stryMutAct_9fa48("20812") ? {} : (stryCov_9fa48("20812"), {
          kind: stryMutAct_9fa48("20813") ? "" : (stryCov_9fa48("20813"), 'range'),
          min: stryMutAct_9fa48("20814") ? "" : (stryCov_9fa48("20814"), '25'),
          max: stryMutAct_9fa48("20815") ? "" : (stryCov_9fa48("20815"), '12'),
          currency: stryMutAct_9fa48("20816") ? "" : (stryCov_9fa48("20816"), 'USD')
        });
        assert.equal(isImportResult(result), stryMutAct_9fa48("20818") ? true : (stryCov_9fa48("20818"), false));
      }
    }
  }
});
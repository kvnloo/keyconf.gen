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
import { importWebsite } from '../lib/import-products.ts';
const source = stryMutAct_9fa48("20308") ? "" : (stryCov_9fa48("20308"), 'https://switch-shop.example/collections/switches');
const variant = stryMutAct_9fa48("20309") ? () => undefined : (stryCov_9fa48("20309"), (() => {
  const variant = id => stryMutAct_9fa48("20310") ? {} : (stryCov_9fa48("20310"), {
    id: (stryMutAct_9fa48("20311") ? "" : (stryCov_9fa48("20311"), 'gid://shopify/ProductVariant/')) + id,
    title: (stryMutAct_9fa48("20312") ? "" : (stryCov_9fa48("20312"), 'Option ')) + id,
    sku: String(id),
    price: stryMutAct_9fa48("20313") ? {} : (stryCov_9fa48("20313"), {
      amount: stryMutAct_9fa48("20314") ? "" : (stryCov_9fa48("20314"), '12.00'),
      currencyCode: stryMutAct_9fa48("20315") ? "" : (stryCov_9fa48("20315"), 'USD')
    }),
    availableForSale: stryMutAct_9fa48("20316") ? false : (stryCov_9fa48("20316"), true)
  });
  return variant;
})());
const product = stryMutAct_9fa48("20317") ? () => undefined : (stryCov_9fa48("20317"), (() => {
  const product = (id, ids, more = stryMutAct_9fa48("20318") ? true : (stryCov_9fa48("20318"), false)) => stryMutAct_9fa48("20319") ? {} : (stryCov_9fa48("20319"), {
    id: (stryMutAct_9fa48("20320") ? "" : (stryCov_9fa48("20320"), 'gid://shopify/Product/')) + id,
    title: (stryMutAct_9fa48("20321") ? "" : (stryCov_9fa48("20321"), 'Switch ')) + id,
    vendor: stryMutAct_9fa48("20322") ? "" : (stryCov_9fa48("20322"), 'Maker'),
    onlineStoreUrl: (stryMutAct_9fa48("20323") ? "" : (stryCov_9fa48("20323"), 'https://switch-shop.example/products/switch-')) + id,
    variants: stryMutAct_9fa48("20324") ? {} : (stryCov_9fa48("20324"), {
      nodes: ids.map(variant),
      pageInfo: stryMutAct_9fa48("20325") ? {} : (stryCov_9fa48("20325"), {
        hasNextPage: more,
        endCursor: more ? (stryMutAct_9fa48("20326") ? "" : (stryCov_9fa48("20326"), 'variants-')) + id : null
      })
    })
  });
  return product;
})());
function serve(t, graphql) {
  if (stryMutAct_9fa48("20327")) {
    {}
  } else {
    stryCov_9fa48("20327");
    t.mock.method(globalThis, stryMutAct_9fa48("20329") ? "" : (stryCov_9fa48("20329"), 'fetch'), async (input, init) => {
      if (stryMutAct_9fa48("20330")) {
        {}
      } else {
        stryCov_9fa48("20330");
        const url = String(input);
        if (stryMutAct_9fa48("20333") ? url.endsWith('https://cloudflare-dns.com/') : stryMutAct_9fa48("20332") ? false : stryMutAct_9fa48("20331") ? true : (stryCov_9fa48("20331", "20332", "20333"), url.startsWith(stryMutAct_9fa48("20334") ? "" : (stryCov_9fa48("20334"), 'https://cloudflare-dns.com/')))) return Response.json(stryMutAct_9fa48("20335") ? {} : (stryCov_9fa48("20335"), {
          Answer: stryMutAct_9fa48("20336") ? [] : (stryCov_9fa48("20336"), [stryMutAct_9fa48("20337") ? {} : (stryCov_9fa48("20337"), {
            type: 1,
            data: stryMutAct_9fa48("20338") ? "" : (stryCov_9fa48("20338"), '1.1.1.1')
          })])
        }));
        if (stryMutAct_9fa48("20340") ? false : stryMutAct_9fa48("20339") ? true : (stryCov_9fa48("20339", "20340"), url.includes(stryMutAct_9fa48("20341") ? "" : (stryCov_9fa48("20341"), '/graphql.json')))) return Response.json(graphql(JSON.parse(init.body)));
        return new Response(stryMutAct_9fa48("20342") ? "" : (stryCov_9fa48("20342"), '<script>Shopify.shop="switch-shop.example"</script>'));
      }
    });
  }
}
test(stryMutAct_9fa48("20344") ? "" : (stryCov_9fa48("20344"), 'a collection URL queries its own products, without importing storewide accessories'), async t => {
  if (stryMutAct_9fa48("20345")) {
    {}
  } else {
    stryCov_9fa48("20345");
    serve(t, stryMutAct_9fa48("20347") ? () => undefined : (stryCov_9fa48("20347"), ({
      query,
      variables
    }) => (stryMutAct_9fa48("20350") ? query.includes('collection(') || variables.handle === 'switches' : stryMutAct_9fa48("20349") ? false : stryMutAct_9fa48("20348") ? true : (stryCov_9fa48("20348", "20349", "20350"), query.includes(stryMutAct_9fa48("20351") ? "" : (stryCov_9fa48("20351"), 'collection(')) && (stryMutAct_9fa48("20353") ? variables.handle !== 'switches' : stryMutAct_9fa48("20352") ? true : (stryCov_9fa48("20352", "20353"), variables.handle === (stryMutAct_9fa48("20354") ? "" : (stryCov_9fa48("20354"), 'switches')))))) ? stryMutAct_9fa48("20355") ? {} : (stryCov_9fa48("20355"), {
      data: stryMutAct_9fa48("20356") ? {} : (stryCov_9fa48("20356"), {
        collection: stryMutAct_9fa48("20357") ? {} : (stryCov_9fa48("20357"), {
          title: stryMutAct_9fa48("20358") ? "" : (stryCov_9fa48("20358"), 'Keyboard switches'),
          products: stryMutAct_9fa48("20359") ? {} : (stryCov_9fa48("20359"), {
            nodes: stryMutAct_9fa48("20360") ? [] : (stryCov_9fa48("20360"), [product(1, stryMutAct_9fa48("20361") ? [] : (stryCov_9fa48("20361"), [101]))]),
            pageInfo: stryMutAct_9fa48("20362") ? {} : (stryCov_9fa48("20362"), {
              hasNextPage: stryMutAct_9fa48("20363") ? true : (stryCov_9fa48("20363"), false),
              endCursor: null
            })
          })
        })
      })
    }) : stryMutAct_9fa48("20364") ? {} : (stryCov_9fa48("20364"), {
      data: stryMutAct_9fa48("20365") ? {} : (stryCov_9fa48("20365"), {
        products: stryMutAct_9fa48("20366") ? {} : (stryCov_9fa48("20366"), {
          nodes: stryMutAct_9fa48("20367") ? [] : (stryCov_9fa48("20367"), [stryMutAct_9fa48("20368") ? {} : (stryCov_9fa48("20368"), {
            ...product(2, stryMutAct_9fa48("20369") ? [] : (stryCov_9fa48("20369"), [201])),
            title: stryMutAct_9fa48("20370") ? "" : (stryCov_9fa48("20370"), 'Switch lube')
          })]),
          pageInfo: stryMutAct_9fa48("20371") ? {} : (stryCov_9fa48("20371"), {
            hasNextPage: stryMutAct_9fa48("20372") ? true : (stryCov_9fa48("20372"), false)
          })
        })
      })
    })));
    const page = await importWebsite(source);
    assert.equal(page.products[0].name, stryMutAct_9fa48("20374") ? "" : (stryCov_9fa48("20374"), 'Switch 1 · Option 101'));
    if (stryMutAct_9fa48("20375")) {
      ;
    } else {
      stryCov_9fa48("20375");
      assert.match(page.coverage, /collection/i);
    }
    if (stryMutAct_9fa48("20376")) {
      ;
    } else {
      stryCov_9fa48("20376");
      assert.equal(page.next, null);
    }
  }
});
test(stryMutAct_9fa48("20378") ? "" : (stryCov_9fa48("20378"), 'pagination finishes outstanding variants before advancing the catalog, without loss or duplicates'), async t => {
  if (stryMutAct_9fa48("20379")) {
    {}
  } else {
    stryCov_9fa48("20379");
    const first = stryMutAct_9fa48("20380") ? [] : (stryCov_9fa48("20380"), [product(1, Array.from(stryMutAct_9fa48("20381") ? {} : (stryCov_9fa48("20381"), {
      length: 10
    }), stryMutAct_9fa48("20382") ? () => undefined : (stryCov_9fa48("20382"), (_, i) => stryMutAct_9fa48("20383") ? 100 - i : (stryCov_9fa48("20383"), 100 + i))), stryMutAct_9fa48("20384") ? false : (stryCov_9fa48("20384"), true)), product(2, Array.from(stryMutAct_9fa48("20385") ? {} : (stryCov_9fa48("20385"), {
      length: 10
    }), stryMutAct_9fa48("20386") ? () => undefined : (stryCov_9fa48("20386"), (_, i) => stryMutAct_9fa48("20387") ? 200 - i : (stryCov_9fa48("20387"), 200 + i))), stryMutAct_9fa48("20388") ? false : (stryCov_9fa48("20388"), true)), ...Array.from(stryMutAct_9fa48("20389") ? {} : (stryCov_9fa48("20389"), {
      length: 6
    }), stryMutAct_9fa48("20390") ? () => undefined : (stryCov_9fa48("20390"), (_, i) => product(stryMutAct_9fa48("20391") ? i - 3 : (stryCov_9fa48("20391"), i + 3), stryMutAct_9fa48("20392") ? [] : (stryCov_9fa48("20392"), [stryMutAct_9fa48("20393") ? (i + 3) / 100 : (stryCov_9fa48("20393"), (stryMutAct_9fa48("20394") ? i - 3 : (stryCov_9fa48("20394"), i + 3)) * 100)]))))]);
    serve(t, ({
      query,
      variables = {}
    }) => {
      if (stryMutAct_9fa48("20396")) {
        {}
      } else {
        stryCov_9fa48("20396");
        if (stryMutAct_9fa48("20398") ? false : stryMutAct_9fa48("20397") ? true : (stryCov_9fa48("20397", "20398"), query.includes(stryMutAct_9fa48("20399") ? "" : (stryCov_9fa48("20399"), 'product0:')))) return stryMutAct_9fa48("20400") ? {} : (stryCov_9fa48("20400"), {
          data: Object.fromEntries((stryMutAct_9fa48("20401") ? [] : (stryCov_9fa48("20401"), [0, 1])).map(stryMutAct_9fa48("20402") ? () => undefined : (stryCov_9fa48("20402"), i => stryMutAct_9fa48("20403") ? [] : (stryCov_9fa48("20403"), [(stryMutAct_9fa48("20404") ? "" : (stryCov_9fa48("20404"), 'product')) + i, product(stryMutAct_9fa48("20405") ? i - 1 : (stryCov_9fa48("20405"), i + 1), stryMutAct_9fa48("20406") ? [] : (stryCov_9fa48("20406"), [stryMutAct_9fa48("20407") ? (i + 1) * 100 - 10 : (stryCov_9fa48("20407"), (stryMutAct_9fa48("20408") ? (i + 1) / 100 : (stryCov_9fa48("20408"), (stryMutAct_9fa48("20409") ? i - 1 : (stryCov_9fa48("20409"), i + 1)) * 100)) + 10), stryMutAct_9fa48("20410") ? (i + 1) * 100 - 11 : (stryCov_9fa48("20410"), (stryMutAct_9fa48("20411") ? (i + 1) / 100 : (stryCov_9fa48("20411"), (stryMutAct_9fa48("20412") ? i - 1 : (stryCov_9fa48("20412"), i + 1)) * 100)) + 11)]))]))))
        });
        const connection = (stryMutAct_9fa48("20415") ? variables.after !== 'products-8' : stryMutAct_9fa48("20414") ? false : stryMutAct_9fa48("20413") ? true : (stryCov_9fa48("20413", "20414", "20415"), variables.after === (stryMutAct_9fa48("20416") ? "" : (stryCov_9fa48("20416"), 'products-8')))) ? stryMutAct_9fa48("20417") ? {} : (stryCov_9fa48("20417"), {
          nodes: stryMutAct_9fa48("20418") ? [] : (stryCov_9fa48("20418"), [product(9, stryMutAct_9fa48("20419") ? [] : (stryCov_9fa48("20419"), [900]))]),
          pageInfo: stryMutAct_9fa48("20420") ? {} : (stryCov_9fa48("20420"), {
            hasNextPage: stryMutAct_9fa48("20421") ? true : (stryCov_9fa48("20421"), false),
            endCursor: null
          })
        }) : stryMutAct_9fa48("20422") ? {} : (stryCov_9fa48("20422"), {
          nodes: first,
          pageInfo: stryMutAct_9fa48("20423") ? {} : (stryCov_9fa48("20423"), {
            hasNextPage: stryMutAct_9fa48("20424") ? false : (stryCov_9fa48("20424"), true),
            endCursor: stryMutAct_9fa48("20425") ? "" : (stryCov_9fa48("20425"), 'products-8')
          })
        });
        return query.includes(stryMutAct_9fa48("20426") ? "" : (stryCov_9fa48("20426"), 'collection(')) ? stryMutAct_9fa48("20427") ? {} : (stryCov_9fa48("20427"), {
          data: stryMutAct_9fa48("20428") ? {} : (stryCov_9fa48("20428"), {
            collection: stryMutAct_9fa48("20429") ? {} : (stryCov_9fa48("20429"), {
              title: stryMutAct_9fa48("20430") ? "" : (stryCov_9fa48("20430"), 'Keyboard switches'),
              products: connection
            })
          })
        }) : stryMutAct_9fa48("20431") ? {} : (stryCov_9fa48("20431"), {
          data: stryMutAct_9fa48("20432") ? {} : (stryCov_9fa48("20432"), {
            products: connection
          })
        });
      }
    });
    const a = await importWebsite(source);
    assert.ok(a.next, stryMutAct_9fa48("20434") ? "" : (stryCov_9fa48("20434"), 'The first preview must expose continuation'));
    const b = await importWebsite(source, a.next);
    assert.deepEqual(b.products.map(stryMutAct_9fa48("20436") ? () => undefined : (stryCov_9fa48("20436"), p => p.sku)), stryMutAct_9fa48("20437") ? [] : (stryCov_9fa48("20437"), [stryMutAct_9fa48("20438") ? "" : (stryCov_9fa48("20438"), '110'), stryMutAct_9fa48("20439") ? "" : (stryCov_9fa48("20439"), '111'), stryMutAct_9fa48("20440") ? "" : (stryCov_9fa48("20440"), '210'), stryMutAct_9fa48("20441") ? "" : (stryCov_9fa48("20441"), '211')]));
    assert.ok(b.next, stryMutAct_9fa48("20443") ? "" : (stryCov_9fa48("20443"), 'The catalog still has another product page'));
    const c = await importWebsite(source, b.next);
    assert.deepEqual(c.products.map(stryMutAct_9fa48("20445") ? () => undefined : (stryCov_9fa48("20445"), p => p.sku)), stryMutAct_9fa48("20446") ? [] : (stryCov_9fa48("20446"), [stryMutAct_9fa48("20447") ? "" : (stryCov_9fa48("20447"), '900')]));
    if (stryMutAct_9fa48("20448")) {
      ;
    } else {
      stryCov_9fa48("20448");
      assert.equal(c.next, null);
    }
    const all = (stryMutAct_9fa48("20449") ? [] : (stryCov_9fa48("20449"), [a, b, c])).flatMap(stryMutAct_9fa48("20450") ? () => undefined : (stryCov_9fa48("20450"), page => page.products));
    if (stryMutAct_9fa48("20451")) {
      ;
    } else {
      stryCov_9fa48("20451");
      assert.equal(all.length, 31);
    }
    assert.equal(new Set(all.map(stryMutAct_9fa48("20453") ? () => undefined : (stryCov_9fa48("20453"), p => p.sku))).size, 31);
    assert.ok(stryMutAct_9fa48("20455") ? [a, b, c].some(page => page.products.length <= 80) : (stryCov_9fa48("20455"), (stryMutAct_9fa48("20456") ? [] : (stryCov_9fa48("20456"), [a, b, c])).every(stryMutAct_9fa48("20457") ? () => undefined : (stryCov_9fa48("20457"), page => stryMutAct_9fa48("20461") ? page.products.length > 80 : stryMutAct_9fa48("20460") ? page.products.length < 80 : stryMutAct_9fa48("20459") ? false : stryMutAct_9fa48("20458") ? true : (stryCov_9fa48("20458", "20459", "20460", "20461"), page.products.length <= 80)))));
  }
});
test(stryMutAct_9fa48("20463") ? "" : (stryCov_9fa48("20463"), 'a missing collection does not silently become the whole store'), async t => {
  if (stryMutAct_9fa48("20464")) {
    {}
  } else {
    stryCov_9fa48("20464");
    serve(t, stryMutAct_9fa48("20466") ? () => undefined : (stryCov_9fa48("20466"), () => stryMutAct_9fa48("20467") ? {} : (stryCov_9fa48("20467"), {
      data: stryMutAct_9fa48("20468") ? {} : (stryCov_9fa48("20468"), {
        collection: null,
        products: stryMutAct_9fa48("20469") ? {} : (stryCov_9fa48("20469"), {
          nodes: stryMutAct_9fa48("20470") ? [] : (stryCov_9fa48("20470"), [product(1, stryMutAct_9fa48("20471") ? [] : (stryCov_9fa48("20471"), [101]))]),
          pageInfo: stryMutAct_9fa48("20472") ? {} : (stryCov_9fa48("20472"), {
            hasNextPage: stryMutAct_9fa48("20473") ? true : (stryCov_9fa48("20473"), false)
          })
        })
      })
    })));
    await assert.rejects(importWebsite(source), stryMutAct_9fa48("20474") ? /collection.not found/i : (stryCov_9fa48("20474"), /collection.*not found/i));
  }
});
test(stryMutAct_9fa48("20476") ? "" : (stryCov_9fa48("20476"), 'continuations are bound to their source and reject malformed product IDs before network access'), async t => {
  if (stryMutAct_9fa48("20477")) {
    {}
  } else {
    stryCov_9fa48("20477");
    let calls = 0;
    t.mock.method(globalThis, stryMutAct_9fa48("20479") ? "" : (stryCov_9fa48("20479"), 'fetch'), async () => {
      if (stryMutAct_9fa48("20480")) {
        {}
      } else {
        stryCov_9fa48("20480");
        stryMutAct_9fa48("20481") ? calls-- : (stryCov_9fa48("20481"), calls++);
        throw new Error(stryMutAct_9fa48("20483") ? "" : (stryCov_9fa48("20483"), 'Network must not run'));
      }
    });
    const cursor = stryMutAct_9fa48("20484") ? {} : (stryCov_9fa48("20484"), {
      kind: stryMutAct_9fa48("20485") ? "" : (stryCov_9fa48("20485"), 'shopify'),
      source,
      catalog: stryMutAct_9fa48("20486") ? {} : (stryCov_9fa48("20486"), {
        kind: stryMutAct_9fa48("20487") ? "" : (stryCov_9fa48("20487"), 'more'),
        after: stryMutAct_9fa48("20488") ? "" : (stryCov_9fa48("20488"), 'products-8')
      }),
      variants: stryMutAct_9fa48("20489") ? ["Stryker was here"] : (stryCov_9fa48("20489"), [])
    });
    await assert.rejects(importWebsite(stryMutAct_9fa48("20490") ? "" : (stryCov_9fa48("20490"), 'https://other-shop.example/'), cursor), /continuation/i);
    await assert.rejects(importWebsite(source, stryMutAct_9fa48("20491") ? {} : (stryCov_9fa48("20491"), {
      ...cursor,
      variants: stryMutAct_9fa48("20492") ? [] : (stryCov_9fa48("20492"), [stryMutAct_9fa48("20493") ? {} : (stryCov_9fa48("20493"), {
        id: stryMutAct_9fa48("20494") ? "" : (stryCov_9fa48("20494"), 'https://internal.example/'),
        after: stryMutAct_9fa48("20495") ? "" : (stryCov_9fa48("20495"), 'variant-1')
      })])
    })), /continuation/i);
    if (stryMutAct_9fa48("20496")) {
      ;
    } else {
      stryCov_9fa48("20496");
      assert.equal(calls, 0);
    }
  }
});
test(stryMutAct_9fa48("20498") ? "" : (stryCov_9fa48("20498"), 'partial GraphQL errors and repeated page cursors fail instead of claiming a complete catalog'), async t => {
  if (stryMutAct_9fa48("20499")) {
    {}
  } else {
    stryCov_9fa48("20499");
    serve(t, stryMutAct_9fa48("20501") ? () => undefined : (stryCov_9fa48("20501"), () => stryMutAct_9fa48("20502") ? {} : (stryCov_9fa48("20502"), {
      errors: stryMutAct_9fa48("20503") ? [] : (stryCov_9fa48("20503"), [stryMutAct_9fa48("20504") ? {} : (stryCov_9fa48("20504"), {
        message: stryMutAct_9fa48("20505") ? "" : (stryCov_9fa48("20505"), 'Temporary failure')
      })]),
      data: stryMutAct_9fa48("20506") ? {} : (stryCov_9fa48("20506"), {
        collection: stryMutAct_9fa48("20507") ? {} : (stryCov_9fa48("20507"), {
          products: stryMutAct_9fa48("20508") ? {} : (stryCov_9fa48("20508"), {
            nodes: stryMutAct_9fa48("20509") ? [] : (stryCov_9fa48("20509"), [product(1, stryMutAct_9fa48("20510") ? [] : (stryCov_9fa48("20510"), [101]))]),
            pageInfo: stryMutAct_9fa48("20511") ? {} : (stryCov_9fa48("20511"), {
              hasNextPage: stryMutAct_9fa48("20512") ? true : (stryCov_9fa48("20512"), false)
            })
          })
        })
      })
    })));
    await assert.rejects(importWebsite(source), /could not provide/i);
    if (stryMutAct_9fa48("20513")) {
      ;
    } else {
      stryCov_9fa48("20513");
      t.mock.restoreAll();
    }
    serve(t, stryMutAct_9fa48("20515") ? () => undefined : (stryCov_9fa48("20515"), () => stryMutAct_9fa48("20516") ? {} : (stryCov_9fa48("20516"), {
      data: stryMutAct_9fa48("20517") ? {} : (stryCov_9fa48("20517"), {
        collection: stryMutAct_9fa48("20518") ? {} : (stryCov_9fa48("20518"), {
          products: stryMutAct_9fa48("20519") ? {} : (stryCov_9fa48("20519"), {
            nodes: stryMutAct_9fa48("20520") ? [] : (stryCov_9fa48("20520"), [product(1, stryMutAct_9fa48("20521") ? [] : (stryCov_9fa48("20521"), [101]))]),
            pageInfo: stryMutAct_9fa48("20522") ? {} : (stryCov_9fa48("20522"), {
              hasNextPage: stryMutAct_9fa48("20523") ? false : (stryCov_9fa48("20523"), true),
              endCursor: stryMutAct_9fa48("20524") ? "" : (stryCov_9fa48("20524"), 'same-cursor')
            })
          })
        })
      })
    })));
    await assert.rejects(importWebsite(source, stryMutAct_9fa48("20525") ? {} : (stryCov_9fa48("20525"), {
      kind: stryMutAct_9fa48("20526") ? "" : (stryCov_9fa48("20526"), 'shopify'),
      source,
      catalog: stryMutAct_9fa48("20527") ? {} : (stryCov_9fa48("20527"), {
        kind: stryMutAct_9fa48("20528") ? "" : (stryCov_9fa48("20528"), 'more'),
        after: stryMutAct_9fa48("20529") ? "" : (stryCov_9fa48("20529"), 'same-cursor')
      }),
      variants: stryMutAct_9fa48("20530") ? ["Stryker was here"] : (stryCov_9fa48("20530"), [])
    })), /repeated/i);
  }
});
test(stryMutAct_9fa48("20532") ? "" : (stryCov_9fa48("20532"), 'the HTTP import endpoint forwards a valid continuation and rejects a mismatched source'), async t => {
  if (stryMutAct_9fa48("20533")) {
    {}
  } else {
    stryCov_9fa48("20533");
    const {
      POST
    } = await import('../app/api/import/route.ts');
    let queryCount = 0;
    serve(t, ({
      variables
    }) => {
      if (stryMutAct_9fa48("20535")) {
        {}
      } else {
        stryCov_9fa48("20535");
        stryMutAct_9fa48("20536") ? queryCount-- : (stryCov_9fa48("20536"), queryCount++);
        assert.equal(variables.after, stryMutAct_9fa48("20538") ? "" : (stryCov_9fa48("20538"), 'products-8'));
        return stryMutAct_9fa48("20539") ? {} : (stryCov_9fa48("20539"), {
          data: stryMutAct_9fa48("20540") ? {} : (stryCov_9fa48("20540"), {
            collection: stryMutAct_9fa48("20541") ? {} : (stryCov_9fa48("20541"), {
              title: stryMutAct_9fa48("20542") ? "" : (stryCov_9fa48("20542"), 'Switches'),
              products: stryMutAct_9fa48("20543") ? {} : (stryCov_9fa48("20543"), {
                nodes: stryMutAct_9fa48("20544") ? [] : (stryCov_9fa48("20544"), [product(9, stryMutAct_9fa48("20545") ? [] : (stryCov_9fa48("20545"), [900]))]),
                pageInfo: stryMutAct_9fa48("20546") ? {} : (stryCov_9fa48("20546"), {
                  hasNextPage: stryMutAct_9fa48("20547") ? true : (stryCov_9fa48("20547"), false)
                })
              })
            })
          })
        });
      }
    });
    const next = stryMutAct_9fa48("20548") ? {} : (stryCov_9fa48("20548"), {
      kind: stryMutAct_9fa48("20549") ? "" : (stryCov_9fa48("20549"), 'shopify'),
      source,
      catalog: stryMutAct_9fa48("20550") ? {} : (stryCov_9fa48("20550"), {
        kind: stryMutAct_9fa48("20551") ? "" : (stryCov_9fa48("20551"), 'more'),
        after: stryMutAct_9fa48("20552") ? "" : (stryCov_9fa48("20552"), 'products-8')
      }),
      variants: stryMutAct_9fa48("20553") ? ["Stryker was here"] : (stryCov_9fa48("20553"), [])
    });
    const request = stryMutAct_9fa48("20554") ? () => undefined : (stryCov_9fa48("20554"), (() => {
      const request = body => new Request(stryMutAct_9fa48("20555") ? "" : (stryCov_9fa48("20555"), 'http://localhost:3000/api/import'), stryMutAct_9fa48("20556") ? {} : (stryCov_9fa48("20556"), {
        method: stryMutAct_9fa48("20557") ? "" : (stryCov_9fa48("20557"), 'POST'),
        headers: stryMutAct_9fa48("20558") ? {} : (stryCov_9fa48("20558"), {
          origin: stryMutAct_9fa48("20559") ? "" : (stryCov_9fa48("20559"), 'http://localhost:3000'),
          'Content-Type': stryMutAct_9fa48("20560") ? "" : (stryCov_9fa48("20560"), 'application/json')
        }),
        body: JSON.stringify(body)
      }));
      return request;
    })());
    const response = await POST(request(stryMutAct_9fa48("20561") ? {} : (stryCov_9fa48("20561"), {
      url: source,
      next
    })));
    if (stryMutAct_9fa48("20562")) {
      ;
    } else {
      stryCov_9fa48("20562");
      assert.equal(response.status, 200);
    }
    const data = await response.json();
    assert.equal(data.products[0].sku, stryMutAct_9fa48("20564") ? "" : (stryCov_9fa48("20564"), '900'));
    if (stryMutAct_9fa48("20565")) {
      ;
    } else {
      stryCov_9fa48("20565");
      assert.equal(data.next, null);
    }
    const rejected = await POST(request(stryMutAct_9fa48("20566") ? {} : (stryCov_9fa48("20566"), {
      url: stryMutAct_9fa48("20567") ? "" : (stryCov_9fa48("20567"), 'https://other.example/'),
      next
    })));
    if (stryMutAct_9fa48("20568")) {
      ;
    } else {
      stryCov_9fa48("20568");
      assert.equal(rejected.status, 422);
    }
    if (stryMutAct_9fa48("20569")) {
      ;
    } else {
      stryCov_9fa48("20569");
      assert.match((await rejected.json()).error, /continuation/i);
    }
    if (stryMutAct_9fa48("20570")) {
      ;
    } else {
      stryCov_9fa48("20570");
      assert.equal(queryCount, 1);
    }
  }
});
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
import { readFileSync } from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { parseCatalogSnapshot, snapshotDigest } from '../lib/catalog-snapshot.ts';
const payload = readFileSync(new URL(stryMutAct_9fa48("16332") ? "" : (stryCov_9fa48("16332"), '../data/store-observations.json'), import.meta.url), stryMutAct_9fa48("16333") ? "" : (stryCov_9fa48("16333"), 'utf8'));
test(stryMutAct_9fa48("16335") ? "" : (stryCov_9fa48("16335"), 'publication accepts the complete existing evidence snapshot and preserves exact bytes'), async () => {
  if (stryMutAct_9fa48("16336")) {
    {}
  } else {
    stryCov_9fa48("16336");
    const parsed = await parseCatalogSnapshot(payload);
    if (stryMutAct_9fa48("16337")) {
      ;
    } else {
      stryCov_9fa48("16337");
      assert.equal(parsed.pages, 12);
    }
    if (stryMutAct_9fa48("16338")) {
      ;
    } else {
      stryCov_9fa48("16338");
      assert.equal(parsed.observations, 128);
    }
    if (stryMutAct_9fa48("16339")) {
      ;
    } else {
      stryCov_9fa48("16339");
      assert.equal(parsed.payload, payload);
    }
    if (stryMutAct_9fa48("16340")) {
      ;
    } else {
      stryCov_9fa48("16340");
      assert.equal(parsed.id, (await parseCatalogSnapshot(payload)).id);
    }
  }
});
test(stryMutAct_9fa48("16342") ? "" : (stryCov_9fa48("16342"), 'publication rejects altered prices, source, counts, ordering and oversized input'), async () => {
  if (stryMutAct_9fa48("16343")) {
    {}
  } else {
    stryCov_9fa48("16343");
    for (const mutate of stryMutAct_9fa48("16344") ? [] : (stryCov_9fa48("16344"), [s => {
      if (stryMutAct_9fa48("16345")) {
        {}
      } else {
        stryCov_9fa48("16345");
        s.evidence[0].result.products[0].name = stryMutAct_9fa48("16346") ? "" : (stryCov_9fa48("16346"), 'Altered');
      }
    }, s => {
      if (stryMutAct_9fa48("16347")) {
        {}
      } else {
        stryCov_9fa48("16347");
        s.source = stryMutAct_9fa48("16348") ? "" : (stryCov_9fa48("16348"), 'https://different.example/');
      }
    }, s => {
      if (stryMutAct_9fa48("16349")) {
        {}
      } else {
        stryCov_9fa48("16349");
        stryMutAct_9fa48("16350") ? s.observations-- : (stryCov_9fa48("16350"), s.observations++);
      }
    }, s => {
      if (stryMutAct_9fa48("16351")) {
        {}
      } else {
        stryCov_9fa48("16351");
        stryMutAct_9fa48("16353") ? s.evidence : (stryCov_9fa48("16353"), s.evidence.reverse());
      }
    }, s => {
      if (stryMutAct_9fa48("16354")) {
        {}
      } else {
        stryCov_9fa48("16354");
        stryMutAct_9fa48("16355") ? s.pages++ : (stryCov_9fa48("16355"), s.pages--);
      }
    }])) {
      if (stryMutAct_9fa48("16356")) {
        {}
      } else {
        stryCov_9fa48("16356");
        const snapshot = JSON.parse(payload);
        if (stryMutAct_9fa48("16357")) {
          ;
        } else {
          stryCov_9fa48("16357");
          mutate(snapshot);
        }
        await assert.rejects(parseCatalogSnapshot(JSON.stringify(snapshot)));
      }
    }
    await assert.rejects(parseCatalogSnapshot((stryMutAct_9fa48("16358") ? "" : (stryCov_9fa48("16358"), ' ')).repeat(500001)), /exceeds/);
  }
});
test(stryMutAct_9fa48("16360") ? "" : (stryCov_9fa48("16360"), 'generated hosted schema enforces publication identity and uses its source index'), () => {
  if (stryMutAct_9fa48("16361")) {
    {}
  } else {
    stryCov_9fa48("16361");
    const db = new DatabaseSync(stryMutAct_9fa48("16362") ? "" : (stryCov_9fa48("16362"), ':memory:'));
    try {
      if (stryMutAct_9fa48("16363")) {
        {}
      } else {
        stryCov_9fa48("16363");
        db.exec(stryMutAct_9fa48("16365") ? "" : (stryCov_9fa48("16365"), 'PRAGMA foreign_keys=ON'));
        db.exec(readFileSync(new URL(stryMutAct_9fa48("16367") ? "" : (stryCov_9fa48("16367"), '../drizzle/0000_supreme_tiger_shark.sql'), import.meta.url), stryMutAct_9fa48("16368") ? "" : (stryCov_9fa48("16368"), 'utf8')));
        assert.throws(stryMutAct_9fa48("16370") ? () => undefined : (stryCov_9fa48("16370"), () => db.prepare(stryMutAct_9fa48("16371") ? "" : (stryCov_9fa48("16371"), 'INSERT INTO catalog_publication VALUES(?,?)')).run(stryMutAct_9fa48("16372") ? "" : (stryCov_9fa48("16372"), 'https://shop.example/'), stryMutAct_9fa48("16373") ? "" : (stryCov_9fa48("16373"), 'missing'))), /FOREIGN KEY/);
        db.prepare(stryMutAct_9fa48("16375") ? "" : (stryCov_9fa48("16375"), 'INSERT INTO catalog_snapshot VALUES(?,?,?,?)')).run(stryMutAct_9fa48("16376") ? "" : (stryCov_9fa48("16376"), 'one'), stryMutAct_9fa48("16377") ? "" : (stryCov_9fa48("16377"), 'https://shop.example/'), payload, stryMutAct_9fa48("16378") ? "" : (stryCov_9fa48("16378"), '2026-09-06T00:00:00.000Z'));
        db.prepare(stryMutAct_9fa48("16380") ? "" : (stryCov_9fa48("16380"), 'INSERT INTO catalog_publication VALUES(?,?)')).run(stryMutAct_9fa48("16381") ? "" : (stryCov_9fa48("16381"), 'https://shop.example/'), stryMutAct_9fa48("16382") ? "" : (stryCov_9fa48("16382"), 'one'));
        const rows = db.prepare(stryMutAct_9fa48("16383") ? "" : (stryCov_9fa48("16383"), 'EXPLAIN QUERY PLAN SELECT s.payload FROM catalog_publication p JOIN catalog_snapshot s ON s.id=p.snapshot_id WHERE p.source=?')).all(stryMutAct_9fa48("16384") ? "" : (stryCov_9fa48("16384"), 'https://shop.example/'));
        assert.ok(stryMutAct_9fa48("16386") ? rows.some(row => row.detail.includes('USING INDEX')) : (stryCov_9fa48("16386"), rows.every(stryMutAct_9fa48("16387") ? () => undefined : (stryCov_9fa48("16387"), row => row.detail.includes(stryMutAct_9fa48("16388") ? "" : (stryCov_9fa48("16388"), 'USING INDEX'))))), JSON.stringify(rows));
      }
    } finally {
      if (stryMutAct_9fa48("16389")) {
        {}
      } else {
        stryCov_9fa48("16389");
        if (stryMutAct_9fa48("16390")) {
          ;
        } else {
          stryCov_9fa48("16390");
          db.close();
        }
      }
    }
  }
});
test(stryMutAct_9fa48("16392") ? "" : (stryCov_9fa48("16392"), 'hosted listings retain timestamps and reject unsafe links even with matching page hashes'), async () => {
  if (stryMutAct_9fa48("16393")) {
    {}
  } else {
    stryCov_9fa48("16393");
    const snapshot = JSON.parse(payload);
    const parsed = await parseCatalogSnapshot(payload);
    if (stryMutAct_9fa48("16394")) {
      ;
    } else {
      stryCov_9fa48("16394");
      assert.equal(parsed.listings.length, 128);
    }
    if (stryMutAct_9fa48("16395")) {
      ;
    } else {
      stryCov_9fa48("16395");
      assert.equal(parsed.listings[0].observedAt, snapshot.evidence[0].result.observedAt);
    }
    snapshot.evidence[0].result.products[0].url = stryMutAct_9fa48("16396") ? "" : (stryCov_9fa48("16396"), 'javascript:alert(1)');
    snapshot.evidence[0].sha256 = await snapshotDigest(JSON.stringify(snapshot.evidence[0].result));
    await assert.rejects(parseCatalogSnapshot(JSON.stringify(snapshot)));
  }
});
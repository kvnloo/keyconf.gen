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
import { createHash } from 'node:crypto';
import { samplesFor, soundPacks } from '../lib/sound-packs.ts';
const manifest = JSON.parse(readFileSync(new URL(stryMutAct_9fa48("21934") ? "" : (stryCov_9fa48("21934"), '../data/sound-packs.json'), import.meta.url)));
test(stryMutAct_9fa48("21936") ? "" : (stryCov_9fa48("21936"), 'recorded packs retain license notices and the pinned original audio bytes'), () => {
  if (stryMutAct_9fa48("21937")) {
    {}
  } else {
    stryCov_9fa48("21937");
    assert.ok(stryMutAct_9fa48("21942") ? soundPacks.length < 7 : stryMutAct_9fa48("21941") ? soundPacks.length > 7 : stryMutAct_9fa48("21940") ? false : stryMutAct_9fa48("21939") ? true : (stryCov_9fa48("21939", "21940", "21941", "21942"), soundPacks.length >= 7));
    for (const pack of manifest.packs) {
      if (stryMutAct_9fa48("21943")) {
        {}
      } else {
        stryCov_9fa48("21943");
        const directory = new URL(stryMutAct_9fa48("21944") ? `` : (stryCov_9fa48("21944"), `../public/sounds/${pack.id}/`), import.meta.url);
        const license = readFileSync(new URL(stryMutAct_9fa48("21945") ? "" : (stryCov_9fa48("21945"), 'LICENSE.txt'), directory), stryMutAct_9fa48("21946") ? "" : (stryCov_9fa48("21946"), 'utf8'));
        if (stryMutAct_9fa48("21947")) {
          ;
        } else {
          stryCov_9fa48("21947");
          assert.match(license, /Audio samples from https:\/\/github.com\/tplai\/kbsim/);
        }
        if (stryMutAct_9fa48("21948")) {
          ;
        } else {
          stryCov_9fa48("21948");
          assert.match(license, /Permission is hereby granted/);
        }
        const files = new Set(Object.values(pack.groups).flatMap(stryMutAct_9fa48("21949") ? () => undefined : (stryCov_9fa48("21949"), groups => Object.values(groups).flat())));
        assert.deepEqual(stryMutAct_9fa48("21951") ? [...files] : (stryCov_9fa48("21951"), (stryMutAct_9fa48("21952") ? [] : (stryCov_9fa48("21952"), [...files])).sort(stryMutAct_9fa48("21953") ? () => undefined : (stryCov_9fa48("21953"), (a, b) => a.localeCompare(b)))), stryMutAct_9fa48("21954") ? Object.keys(pack.sha256) : (stryCov_9fa48("21954"), Object.keys(pack.sha256).sort(stryMutAct_9fa48("21955") ? () => undefined : (stryCov_9fa48("21955"), (a, b) => a.localeCompare(b)))));
        for (const file of files) {
          if (stryMutAct_9fa48("21956")) {
            {}
          } else {
            stryCov_9fa48("21956");
            assert.match(file, stryMutAct_9fa48("21961") ? /^[^a-z0-9_]+\.mp3$/ : stryMutAct_9fa48("21960") ? /^[a-z0-9_]\.mp3$/ : stryMutAct_9fa48("21959") ? /^[a-z0-9_]+\.mp3/ : stryMutAct_9fa48("21958") ? /[a-z0-9_]+\.mp3$/ : (stryCov_9fa48("21958", "21959", "21960", "21961"), /^[a-z0-9_]+\.mp3$/));
            const bytes = readFileSync(new URL(file, directory));
            assert.equal(createHash(stryMutAct_9fa48("21963") ? "" : (stryCov_9fa48("21963"), 'sha256')).update(bytes).digest(stryMutAct_9fa48("21964") ? "" : (stryCov_9fa48("21964"), 'hex')), pack.sha256[file]);
          }
        }
        assert.ok(stryMutAct_9fa48("21969") ? pack.groups.down.default.length <= 1 : stryMutAct_9fa48("21968") ? pack.groups.down.default.length >= 1 : stryMutAct_9fa48("21967") ? false : stryMutAct_9fa48("21966") ? true : (stryCov_9fa48("21966", "21967", "21968", "21969"), pack.groups.down.default.length > 1));
        assert.ok(stryMutAct_9fa48("21974") ? pack.groups.up.default.length <= 0 : stryMutAct_9fa48("21973") ? pack.groups.up.default.length >= 0 : stryMutAct_9fa48("21972") ? false : stryMutAct_9fa48("21971") ? true : (stryCov_9fa48("21971", "21972", "21973", "21974"), pack.groups.up.default.length > 0));
      }
    }
  }
});
test(stryMutAct_9fa48("21976") ? "" : (stryCov_9fa48("21976"), 'modifier keys use their recordings while packs with limited coverage fall back'), () => {
  if (stryMutAct_9fa48("21977")) {
    {}
  } else {
    stryCov_9fa48("21977");
    const ink = soundPacks.find(stryMutAct_9fa48("21978") ? () => undefined : (stryCov_9fa48("21978"), pack => stryMutAct_9fa48("21981") ? pack.id !== 'gateron-black-ink' : stryMutAct_9fa48("21980") ? false : stryMutAct_9fa48("21979") ? true : (stryCov_9fa48("21979", "21980", "21981"), pack.id === (stryMutAct_9fa48("21982") ? "" : (stryCov_9fa48("21982"), 'gateron-black-ink')))));
    const blue = soundPacks.find(stryMutAct_9fa48("21983") ? () => undefined : (stryCov_9fa48("21983"), pack => stryMutAct_9fa48("21986") ? pack.id !== 'mx-blue' : stryMutAct_9fa48("21985") ? false : stryMutAct_9fa48("21984") ? true : (stryCov_9fa48("21984", "21985", "21986"), pack.id === (stryMutAct_9fa48("21987") ? "" : (stryCov_9fa48("21987"), 'mx-blue')))));
    assert.ok(stryMutAct_9fa48("21991") ? ink || blue : stryMutAct_9fa48("21990") ? false : stryMutAct_9fa48("21989") ? true : (stryCov_9fa48("21989", "21990", "21991"), ink && blue));
    assert.deepEqual(samplesFor(ink, stryMutAct_9fa48("21993") ? "" : (stryCov_9fa48("21993"), 'Space'), stryMutAct_9fa48("21994") ? "" : (stryCov_9fa48("21994"), 'down')), stryMutAct_9fa48("21995") ? [] : (stryCov_9fa48("21995"), [stryMutAct_9fa48("21996") ? "" : (stryCov_9fa48("21996"), 'press_space.mp3')]));
    assert.deepEqual(samplesFor(ink, stryMutAct_9fa48("21998") ? "" : (stryCov_9fa48("21998"), 'NumpadEnter'), stryMutAct_9fa48("21999") ? "" : (stryCov_9fa48("21999"), 'up')), stryMutAct_9fa48("22000") ? [] : (stryCov_9fa48("22000"), [stryMutAct_9fa48("22001") ? "" : (stryCov_9fa48("22001"), 'release_enter.mp3')]));
    assert.deepEqual(samplesFor(ink, stryMutAct_9fa48("22003") ? "" : (stryCov_9fa48("22003"), 'Delete'), stryMutAct_9fa48("22004") ? "" : (stryCov_9fa48("22004"), 'up')), stryMutAct_9fa48("22005") ? [] : (stryCov_9fa48("22005"), [stryMutAct_9fa48("22006") ? "" : (stryCov_9fa48("22006"), 'release_back.mp3')]));
    assert.deepEqual(samplesFor(blue, stryMutAct_9fa48("22008") ? "" : (stryCov_9fa48("22008"), 'Space'), stryMutAct_9fa48("22009") ? "" : (stryCov_9fa48("22009"), 'up')), stryMutAct_9fa48("22010") ? [] : (stryCov_9fa48("22010"), [stryMutAct_9fa48("22011") ? "" : (stryCov_9fa48("22011"), 'release.mp3')]));
    assert.equal(samplesFor(ink, stryMutAct_9fa48("22013") ? "" : (stryCov_9fa48("22013"), 'KeyQ'), stryMutAct_9fa48("22014") ? "" : (stryCov_9fa48("22014"), 'down')).length, 5);
  }
});
test(stryMutAct_9fa48("22016") ? "" : (stryCov_9fa48("22016"), 'recording references are unique attributed videos with valid creator URLs'), () => {
  if (stryMutAct_9fa48("22017")) {
    {}
  } else {
    stryCov_9fa48("22017");
    const data = JSON.parse(readFileSync(new URL(stryMutAct_9fa48("22018") ? "" : (stryCov_9fa48("22018"), '../data/sound-references.json'), import.meta.url)));
    assert.ok(stryMutAct_9fa48("22023") ? data.records.length < 200 : stryMutAct_9fa48("22022") ? data.records.length > 200 : stryMutAct_9fa48("22021") ? false : stryMutAct_9fa48("22020") ? true : (stryCov_9fa48("22020", "22021", "22022", "22023"), data.records.length >= 200));
    assert.equal(new Set(data.records.map(stryMutAct_9fa48("22025") ? () => undefined : (stryCov_9fa48("22025"), record => record.id))).size, data.records.length);
    assert.equal(new Set(data.records.map(stryMutAct_9fa48("22027") ? () => undefined : (stryCov_9fa48("22027"), record => record.videoId))).size, data.records.length);
    for (const record of data.records) {
      if (stryMutAct_9fa48("22028")) {
        {}
      } else {
        stryCov_9fa48("22028");
        assert.match(record.videoId, stryMutAct_9fa48("22033") ? /^[^A-Za-z0-9_-]{11}$/ : stryMutAct_9fa48("22032") ? /^[A-Za-z0-9_-]$/ : stryMutAct_9fa48("22031") ? /^[A-Za-z0-9_-]{11}/ : stryMutAct_9fa48("22030") ? /[A-Za-z0-9_-]{11}$/ : (stryCov_9fa48("22030", "22031", "22032", "22033"), /^[A-Za-z0-9_-]{11}$/));
        assert.equal(new URL(record.source).origin, stryMutAct_9fa48("22035") ? "" : (stryCov_9fa48("22035"), 'https://www.clickandthock.com'));
        assert.equal(record.creator, stryMutAct_9fa48("22037") ? "" : (stryCov_9fa48("22037"), 'Click and Thock'));
        assert.ok(stryMutAct_9fa48("22039") ? record.name : (stryCov_9fa48("22039"), record.name.trim()));
      }
    }
  }
});
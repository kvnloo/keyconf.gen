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
const manifest = JSON.parse(readFileSync(new URL(stryMutAct_9fa48("22003") ? "" : (stryCov_9fa48("22003"), '../data/sound-packs.json'), import.meta.url)));
test(stryMutAct_9fa48("22005") ? "" : (stryCov_9fa48("22005"), 'recorded packs retain license notices and the pinned original audio bytes'), () => {
  if (stryMutAct_9fa48("22006")) {
    {}
  } else {
    stryCov_9fa48("22006");
    assert.ok(stryMutAct_9fa48("22011") ? soundPacks.length < 7 : stryMutAct_9fa48("22010") ? soundPacks.length > 7 : stryMutAct_9fa48("22009") ? false : stryMutAct_9fa48("22008") ? true : (stryCov_9fa48("22008", "22009", "22010", "22011"), soundPacks.length >= 7));
    for (const pack of manifest.packs) {
      if (stryMutAct_9fa48("22012")) {
        {}
      } else {
        stryCov_9fa48("22012");
        const directory = new URL(stryMutAct_9fa48("22013") ? `` : (stryCov_9fa48("22013"), `../public/sounds/${pack.id}/`), import.meta.url);
        const license = readFileSync(new URL(stryMutAct_9fa48("22014") ? "" : (stryCov_9fa48("22014"), 'LICENSE.txt'), directory), stryMutAct_9fa48("22015") ? "" : (stryCov_9fa48("22015"), 'utf8'));
        if (stryMutAct_9fa48("22016")) {
          ;
        } else {
          stryCov_9fa48("22016");
          assert.match(license, /Audio samples from https:\/\/github.com\/tplai\/kbsim/);
        }
        if (stryMutAct_9fa48("22017")) {
          ;
        } else {
          stryCov_9fa48("22017");
          assert.match(license, /Permission is hereby granted/);
        }
        const files = new Set(Object.values(pack.groups).flatMap(stryMutAct_9fa48("22018") ? () => undefined : (stryCov_9fa48("22018"), groups => Object.values(groups).flat())));
        assert.deepEqual(stryMutAct_9fa48("22020") ? [...files] : (stryCov_9fa48("22020"), (stryMutAct_9fa48("22021") ? [] : (stryCov_9fa48("22021"), [...files])).sort(stryMutAct_9fa48("22022") ? () => undefined : (stryCov_9fa48("22022"), (a, b) => a.localeCompare(b)))), stryMutAct_9fa48("22023") ? Object.keys(pack.sha256) : (stryCov_9fa48("22023"), Object.keys(pack.sha256).sort(stryMutAct_9fa48("22024") ? () => undefined : (stryCov_9fa48("22024"), (a, b) => a.localeCompare(b)))));
        for (const file of files) {
          if (stryMutAct_9fa48("22025")) {
            {}
          } else {
            stryCov_9fa48("22025");
            assert.match(file, stryMutAct_9fa48("22030") ? /^[^a-z0-9_]+\.mp3$/ : stryMutAct_9fa48("22029") ? /^[a-z0-9_]\.mp3$/ : stryMutAct_9fa48("22028") ? /^[a-z0-9_]+\.mp3/ : stryMutAct_9fa48("22027") ? /[a-z0-9_]+\.mp3$/ : (stryCov_9fa48("22027", "22028", "22029", "22030"), /^[a-z0-9_]+\.mp3$/));
            const bytes = readFileSync(new URL(file, directory));
            assert.equal(createHash(stryMutAct_9fa48("22032") ? "" : (stryCov_9fa48("22032"), 'sha256')).update(bytes).digest(stryMutAct_9fa48("22033") ? "" : (stryCov_9fa48("22033"), 'hex')), pack.sha256[file]);
          }
        }
        assert.ok(stryMutAct_9fa48("22038") ? pack.groups.down.default.length <= 1 : stryMutAct_9fa48("22037") ? pack.groups.down.default.length >= 1 : stryMutAct_9fa48("22036") ? false : stryMutAct_9fa48("22035") ? true : (stryCov_9fa48("22035", "22036", "22037", "22038"), pack.groups.down.default.length > 1));
        assert.ok(stryMutAct_9fa48("22043") ? pack.groups.up.default.length <= 0 : stryMutAct_9fa48("22042") ? pack.groups.up.default.length >= 0 : stryMutAct_9fa48("22041") ? false : stryMutAct_9fa48("22040") ? true : (stryCov_9fa48("22040", "22041", "22042", "22043"), pack.groups.up.default.length > 0));
      }
    }
  }
});
test(stryMutAct_9fa48("22045") ? "" : (stryCov_9fa48("22045"), 'modifier keys use their recordings while packs with limited coverage fall back'), () => {
  if (stryMutAct_9fa48("22046")) {
    {}
  } else {
    stryCov_9fa48("22046");
    const ink = soundPacks.find(stryMutAct_9fa48("22047") ? () => undefined : (stryCov_9fa48("22047"), pack => stryMutAct_9fa48("22050") ? pack.id !== 'gateron-black-ink' : stryMutAct_9fa48("22049") ? false : stryMutAct_9fa48("22048") ? true : (stryCov_9fa48("22048", "22049", "22050"), pack.id === (stryMutAct_9fa48("22051") ? "" : (stryCov_9fa48("22051"), 'gateron-black-ink')))));
    const blue = soundPacks.find(stryMutAct_9fa48("22052") ? () => undefined : (stryCov_9fa48("22052"), pack => stryMutAct_9fa48("22055") ? pack.id !== 'mx-blue' : stryMutAct_9fa48("22054") ? false : stryMutAct_9fa48("22053") ? true : (stryCov_9fa48("22053", "22054", "22055"), pack.id === (stryMutAct_9fa48("22056") ? "" : (stryCov_9fa48("22056"), 'mx-blue')))));
    assert.ok(stryMutAct_9fa48("22060") ? ink || blue : stryMutAct_9fa48("22059") ? false : stryMutAct_9fa48("22058") ? true : (stryCov_9fa48("22058", "22059", "22060"), ink && blue));
    assert.deepEqual(samplesFor(ink, stryMutAct_9fa48("22062") ? "" : (stryCov_9fa48("22062"), 'Space'), stryMutAct_9fa48("22063") ? "" : (stryCov_9fa48("22063"), 'down')), stryMutAct_9fa48("22064") ? [] : (stryCov_9fa48("22064"), [stryMutAct_9fa48("22065") ? "" : (stryCov_9fa48("22065"), 'press_space.mp3')]));
    assert.deepEqual(samplesFor(ink, stryMutAct_9fa48("22067") ? "" : (stryCov_9fa48("22067"), 'NumpadEnter'), stryMutAct_9fa48("22068") ? "" : (stryCov_9fa48("22068"), 'up')), stryMutAct_9fa48("22069") ? [] : (stryCov_9fa48("22069"), [stryMutAct_9fa48("22070") ? "" : (stryCov_9fa48("22070"), 'release_enter.mp3')]));
    assert.deepEqual(samplesFor(ink, stryMutAct_9fa48("22072") ? "" : (stryCov_9fa48("22072"), 'Delete'), stryMutAct_9fa48("22073") ? "" : (stryCov_9fa48("22073"), 'up')), stryMutAct_9fa48("22074") ? [] : (stryCov_9fa48("22074"), [stryMutAct_9fa48("22075") ? "" : (stryCov_9fa48("22075"), 'release_back.mp3')]));
    assert.deepEqual(samplesFor(blue, stryMutAct_9fa48("22077") ? "" : (stryCov_9fa48("22077"), 'Space'), stryMutAct_9fa48("22078") ? "" : (stryCov_9fa48("22078"), 'up')), stryMutAct_9fa48("22079") ? [] : (stryCov_9fa48("22079"), [stryMutAct_9fa48("22080") ? "" : (stryCov_9fa48("22080"), 'release.mp3')]));
    assert.equal(samplesFor(ink, stryMutAct_9fa48("22082") ? "" : (stryCov_9fa48("22082"), 'KeyQ'), stryMutAct_9fa48("22083") ? "" : (stryCov_9fa48("22083"), 'down')).length, 5);
  }
});
test(stryMutAct_9fa48("22085") ? "" : (stryCov_9fa48("22085"), 'recording references are unique attributed videos with valid creator URLs'), () => {
  if (stryMutAct_9fa48("22086")) {
    {}
  } else {
    stryCov_9fa48("22086");
    const data = JSON.parse(readFileSync(new URL(stryMutAct_9fa48("22087") ? "" : (stryCov_9fa48("22087"), '../data/sound-references.json'), import.meta.url)));
    assert.ok(stryMutAct_9fa48("22092") ? data.records.length < 200 : stryMutAct_9fa48("22091") ? data.records.length > 200 : stryMutAct_9fa48("22090") ? false : stryMutAct_9fa48("22089") ? true : (stryCov_9fa48("22089", "22090", "22091", "22092"), data.records.length >= 200));
    assert.equal(new Set(data.records.map(stryMutAct_9fa48("22094") ? () => undefined : (stryCov_9fa48("22094"), record => record.id))).size, data.records.length);
    assert.equal(new Set(data.records.map(stryMutAct_9fa48("22096") ? () => undefined : (stryCov_9fa48("22096"), record => record.videoId))).size, data.records.length);
    for (const record of data.records) {
      if (stryMutAct_9fa48("22097")) {
        {}
      } else {
        stryCov_9fa48("22097");
        assert.match(record.videoId, stryMutAct_9fa48("22102") ? /^[^A-Za-z0-9_-]{11}$/ : stryMutAct_9fa48("22101") ? /^[A-Za-z0-9_-]$/ : stryMutAct_9fa48("22100") ? /^[A-Za-z0-9_-]{11}/ : stryMutAct_9fa48("22099") ? /[A-Za-z0-9_-]{11}$/ : (stryCov_9fa48("22099", "22100", "22101", "22102"), /^[A-Za-z0-9_-]{11}$/));
        assert.equal(new URL(record.source).origin, stryMutAct_9fa48("22104") ? "" : (stryCov_9fa48("22104"), 'https://www.clickandthock.com'));
        assert.equal(record.creator, stryMutAct_9fa48("22106") ? "" : (stryCov_9fa48("22106"), 'Click and Thock'));
        assert.ok(stryMutAct_9fa48("22108") ? record.name : (stryCov_9fa48("22108"), record.name.trim()));
      }
    }
  }
});
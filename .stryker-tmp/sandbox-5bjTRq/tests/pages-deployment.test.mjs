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
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { assemblePages, assembleCandidates } from '../scripts/assemble-pages.mjs';
test(stryMutAct_9fa48("21558") ? "" : (stryCov_9fa48("21558"), 'Publishing one channel preserves the other builds and refuses out-of-order releases'), async () => {
  if (stryMutAct_9fa48("21559")) {
    {}
  } else {
    stryCov_9fa48("21559");
    const root = await mkdtemp(path.join(tmpdir(), stryMutAct_9fa48("21560") ? "" : (stryCov_9fa48("21560"), 'keyconf-pages-')));
    try {
      if (stryMutAct_9fa48("21561")) {
        {}
      } else {
        stryCov_9fa48("21561");
        const destination = path.join(root, stryMutAct_9fa48("21562") ? "" : (stryCov_9fa48("21562"), 'site'));
        const options = stryMutAct_9fa48("21563") ? {} : (stryCov_9fa48("21563"), {
          destination,
          repository: stryMutAct_9fa48("21564") ? "" : (stryCov_9fa48("21564"), 'kvnloo/keyconf.gen'),
          sha: (stryMutAct_9fa48("21565") ? "" : (stryCov_9fa48("21565"), 'a')).repeat(40)
        });
        for (const channel of stryMutAct_9fa48("21566") ? [] : (stryCov_9fa48("21566"), [stryMutAct_9fa48("21567") ? "" : (stryCov_9fa48("21567"), 'main'), stryMutAct_9fa48("21568") ? "" : (stryCov_9fa48("21568"), 'dev'), stryMutAct_9fa48("21569") ? "" : (stryCov_9fa48("21569"), 'nightly')])) {
          if (stryMutAct_9fa48("21570")) {
            {}
          } else {
            stryCov_9fa48("21570");
            const artifact = path.join(root, channel);
            await mkdir(artifact);
            await writeFile(path.join(artifact, stryMutAct_9fa48("21571") ? "" : (stryCov_9fa48("21571"), 'index.html')), stryMutAct_9fa48("21572") ? `` : (stryCov_9fa48("21572"), `<base href="/keyconf.gen/${channel}/"><p>${channel}</p>`));
            await writeFile(path.join(artifact, stryMutAct_9fa48("21573") ? "" : (stryCov_9fa48("21573"), 'old.js')), channel);
            await assemblePages(stryMutAct_9fa48("21574") ? {} : (stryCov_9fa48("21574"), {
              ...options,
              artifact,
              channel,
              runNumber: 1
            }));
          }
        }
        const mainBefore = await readFile(path.join(destination, stryMutAct_9fa48("21575") ? "" : (stryCov_9fa48("21575"), 'main/index.html')));
        const devBefore = await readFile(path.join(destination, stryMutAct_9fa48("21576") ? "" : (stryCov_9fa48("21576"), 'dev/index.html')));
        const artifact = path.join(root, stryMutAct_9fa48("21577") ? "" : (stryCov_9fa48("21577"), 'nightly'));
        await rm(path.join(artifact, stryMutAct_9fa48("21578") ? "" : (stryCov_9fa48("21578"), 'old.js')));
        await writeFile(path.join(artifact, stryMutAct_9fa48("21579") ? "" : (stryCov_9fa48("21579"), 'new.js')), stryMutAct_9fa48("21580") ? "" : (stryCov_9fa48("21580"), 'new nightly'));
        await assemblePages(stryMutAct_9fa48("21581") ? {} : (stryCov_9fa48("21581"), {
          ...options,
          artifact,
          channel: stryMutAct_9fa48("21582") ? "" : (stryCov_9fa48("21582"), 'nightly'),
          sha: (stryMutAct_9fa48("21583") ? "" : (stryCov_9fa48("21583"), 'b')).repeat(40),
          runNumber: 3
        }));
        assert.deepEqual(await readFile(path.join(destination, stryMutAct_9fa48("21585") ? "" : (stryCov_9fa48("21585"), 'main/index.html'))), mainBefore);
        assert.deepEqual(await readFile(path.join(destination, stryMutAct_9fa48("21587") ? "" : (stryCov_9fa48("21587"), 'dev/index.html'))), devBefore);
        await assert.rejects(readFile(path.join(destination, stryMutAct_9fa48("21588") ? "" : (stryCov_9fa48("21588"), 'nightly/old.js'))), stryMutAct_9fa48("21589") ? {} : (stryCov_9fa48("21589"), {
          code: stryMutAct_9fa48("21590") ? "" : (stryCov_9fa48("21590"), 'ENOENT')
        }));
        assert.equal(await readFile(path.join(destination, stryMutAct_9fa48("21592") ? "" : (stryCov_9fa48("21592"), 'nightly/new.js')), stryMutAct_9fa48("21593") ? "" : (stryCov_9fa48("21593"), 'utf8')), stryMutAct_9fa48("21594") ? "" : (stryCov_9fa48("21594"), 'new nightly'));
        const stale = await assemblePages(stryMutAct_9fa48("21595") ? {} : (stryCov_9fa48("21595"), {
          ...options,
          artifact,
          channel: stryMutAct_9fa48("21596") ? "" : (stryCov_9fa48("21596"), 'nightly'),
          runNumber: 2
        }));
        assert.equal(stale.published, stryMutAct_9fa48("21598") ? true : (stryCov_9fa48("21598"), false));
        assert.equal(stale.release.sha, (stryMutAct_9fa48("21600") ? "" : (stryCov_9fa48("21600"), 'b')).repeat(40));
        const duplicate = await assemblePages(stryMutAct_9fa48("21601") ? {} : (stryCov_9fa48("21601"), {
          ...options,
          artifact,
          channel: stryMutAct_9fa48("21602") ? "" : (stryCov_9fa48("21602"), 'nightly'),
          runNumber: 3
        }));
        assert.equal(duplicate.published, stryMutAct_9fa48("21604") ? true : (stryCov_9fa48("21604"), false));
        const releases = JSON.parse(await readFile(path.join(destination, stryMutAct_9fa48("21605") ? "" : (stryCov_9fa48("21605"), 'environments.json')), stryMutAct_9fa48("21606") ? "" : (stryCov_9fa48("21606"), 'utf8')));
        assert.deepEqual(Object.keys(releases), stryMutAct_9fa48("21608") ? [] : (stryCov_9fa48("21608"), [stryMutAct_9fa48("21609") ? "" : (stryCov_9fa48("21609"), 'main'), stryMutAct_9fa48("21610") ? "" : (stryCov_9fa48("21610"), 'dev'), stryMutAct_9fa48("21611") ? "" : (stryCov_9fa48("21611"), 'nightly')]));
        assert.equal(releases.nightly.sha, (stryMutAct_9fa48("21613") ? "" : (stryCov_9fa48("21613"), 'b')).repeat(40));
        assert.match(await readFile(path.join(destination, stryMutAct_9fa48("21615") ? "" : (stryCov_9fa48("21615"), 'index.html')), stryMutAct_9fa48("21616") ? "" : (stryCov_9fa48("21616"), 'utf8')), /location.search \+ location.hash/);
        await assert.rejects(assemblePages(stryMutAct_9fa48("21617") ? {} : (stryCov_9fa48("21617"), {
          ...options,
          artifact,
          channel: stryMutAct_9fa48("21618") ? "" : (stryCov_9fa48("21618"), '../main'),
          runNumber: 4
        })), /Unknown release channel/);
        await assert.rejects(assemblePages(stryMutAct_9fa48("21619") ? {} : (stryCov_9fa48("21619"), {
          ...options,
          artifact,
          channel: stryMutAct_9fa48("21620") ? "" : (stryCov_9fa48("21620"), 'main'),
          runNumber: 4
        })), /built for/);
        assert.deepEqual(await readFile(path.join(destination, stryMutAct_9fa48("21622") ? "" : (stryCov_9fa48("21622"), 'main/index.html'))), mainBefore);
      }
    } finally {
      if (stryMutAct_9fa48("21623")) {
        {}
      } else {
        stryCov_9fa48("21623");
        await rm(root, stryMutAct_9fa48("21624") ? {} : (stryCov_9fa48("21624"), {
          recursive: stryMutAct_9fa48("21625") ? false : (stryCov_9fa48("21625"), true),
          force: stryMutAct_9fa48("21626") ? false : (stryCov_9fa48("21626"), true)
        }));
      }
    }
  }
});
test(stryMutAct_9fa48("21628") ? "" : (stryCov_9fa48("21628"), 'The next publisher recovers a canceled dev deployment while preserving newer main files'), async () => {
  if (stryMutAct_9fa48("21629")) {
    {}
  } else {
    stryCov_9fa48("21629");
    const root = await mkdtemp(path.join(tmpdir(), stryMutAct_9fa48("21630") ? "" : (stryCov_9fa48("21630"), 'keyconf-pages-recovery-')));
    try {
      if (stryMutAct_9fa48("21631")) {
        {}
      } else {
        stryCov_9fa48("21631");
        const destination = path.join(root, stryMutAct_9fa48("21632") ? "" : (stryCov_9fa48("21632"), 'site'));
        const artifacts = path.join(root, stryMutAct_9fa48("21633") ? "" : (stryCov_9fa48("21633"), 'artifacts'));
        const repository = stryMutAct_9fa48("21634") ? "" : (stryCov_9fa48("21634"), 'kvnloo/keyconf.gen');
        for (const channel of stryMutAct_9fa48("21635") ? [] : (stryCov_9fa48("21635"), [stryMutAct_9fa48("21636") ? "" : (stryCov_9fa48("21636"), 'main'), stryMutAct_9fa48("21637") ? "" : (stryCov_9fa48("21637"), 'dev'), stryMutAct_9fa48("21638") ? "" : (stryCov_9fa48("21638"), 'nightly')])) {
          if (stryMutAct_9fa48("21639")) {
            {}
          } else {
            stryCov_9fa48("21639");
            await mkdir(path.join(artifacts, channel), stryMutAct_9fa48("21640") ? {} : (stryCov_9fa48("21640"), {
              recursive: stryMutAct_9fa48("21641") ? false : (stryCov_9fa48("21641"), true)
            }));
            await writeFile(path.join(artifacts, channel, stryMutAct_9fa48("21642") ? "" : (stryCov_9fa48("21642"), 'index.html')), stryMutAct_9fa48("21643") ? `` : (stryCov_9fa48("21643"), `<base href="/keyconf.gen/${channel}/"><p>${channel}</p>`));
          }
        }
        await assemblePages(stryMutAct_9fa48("21644") ? {} : (stryCov_9fa48("21644"), {
          artifact: path.join(artifacts, stryMutAct_9fa48("21645") ? "" : (stryCov_9fa48("21645"), 'main')),
          destination,
          repository,
          channel: stryMutAct_9fa48("21646") ? "" : (stryCov_9fa48("21646"), 'main'),
          sha: (stryMutAct_9fa48("21647") ? "" : (stryCov_9fa48("21647"), 'f')).repeat(40),
          runNumber: 20
        }));
        await writeFile(path.join(destination, stryMutAct_9fa48("21648") ? "" : (stryCov_9fa48("21648"), 'main'), stryMutAct_9fa48("21649") ? "" : (stryCov_9fa48("21649"), 'keep.js')), stryMutAct_9fa48("21650") ? "" : (stryCov_9fa48("21650"), 'previous main asset'));
        const candidates = stryMutAct_9fa48("21651") ? {} : (stryCov_9fa48("21651"), {
          main: stryMutAct_9fa48("21652") ? {} : (stryCov_9fa48("21652"), {
            sha: (stryMutAct_9fa48("21653") ? "" : (stryCov_9fa48("21653"), 'a')).repeat(40),
            runNumber: 10
          }),
          dev: stryMutAct_9fa48("21654") ? {} : (stryCov_9fa48("21654"), {
            sha: (stryMutAct_9fa48("21655") ? "" : (stryCov_9fa48("21655"), 'b')).repeat(40),
            runNumber: 11
          }),
          nightly: stryMutAct_9fa48("21656") ? {} : (stryCov_9fa48("21656"), {
            sha: (stryMutAct_9fa48("21657") ? "" : (stryCov_9fa48("21657"), 'c')).repeat(40),
            runNumber: 12
          })
        });
        const result = await assembleCandidates(stryMutAct_9fa48("21658") ? {} : (stryCov_9fa48("21658"), {
          candidates,
          artifacts,
          destination,
          repository
        }));
        assert.equal(result.main.published, stryMutAct_9fa48("21660") ? true : (stryCov_9fa48("21660"), false));
        assert.equal(result.dev.published, stryMutAct_9fa48("21662") ? false : (stryCov_9fa48("21662"), true));
        assert.equal(result.nightly.published, stryMutAct_9fa48("21664") ? false : (stryCov_9fa48("21664"), true));
        assert.equal(await readFile(path.join(destination, stryMutAct_9fa48("21666") ? "" : (stryCov_9fa48("21666"), 'main/keep.js')), stryMutAct_9fa48("21667") ? "" : (stryCov_9fa48("21667"), 'utf8')), stryMutAct_9fa48("21668") ? "" : (stryCov_9fa48("21668"), 'previous main asset'));
        const releases = JSON.parse(await readFile(path.join(destination, stryMutAct_9fa48("21669") ? "" : (stryCov_9fa48("21669"), 'environments.json')), stryMutAct_9fa48("21670") ? "" : (stryCov_9fa48("21670"), 'utf8')));
        assert.equal(releases.main.sha, (stryMutAct_9fa48("21672") ? "" : (stryCov_9fa48("21672"), 'f')).repeat(40));
        if (stryMutAct_9fa48("21673")) {
          ;
        } else {
          stryCov_9fa48("21673");
          assert.equal(releases.dev.sha, candidates.dev.sha);
        }
        if (stryMutAct_9fa48("21674")) {
          ;
        } else {
          stryCov_9fa48("21674");
          assert.equal(releases.nightly.sha, candidates.nightly.sha);
        }
        const repeat = await assembleCandidates(stryMutAct_9fa48("21675") ? {} : (stryCov_9fa48("21675"), {
          candidates,
          artifacts,
          destination,
          repository
        }));
        assert.ok(stryMutAct_9fa48("21677") ? Object.values(repeat).some(entry => !entry.published) : (stryCov_9fa48("21677"), Object.values(repeat).every(stryMutAct_9fa48("21678") ? () => undefined : (stryCov_9fa48("21678"), entry => stryMutAct_9fa48("21679") ? entry.published : (stryCov_9fa48("21679"), !entry.published)))));
        assert.deepEqual(await assembleCandidates(stryMutAct_9fa48("21681") ? {} : (stryCov_9fa48("21681"), {
          candidates: {},
          artifacts,
          destination,
          repository
        })), {});
        assert.deepEqual(JSON.parse(await readFile(path.join(destination, stryMutAct_9fa48("21683") ? "" : (stryCov_9fa48("21683"), 'environments.json')), stryMutAct_9fa48("21684") ? "" : (stryCov_9fa48("21684"), 'utf8'))), releases);
      }
    } finally {
      if (stryMutAct_9fa48("21685")) {
        {}
      } else {
        stryCov_9fa48("21685");
        await rm(root, stryMutAct_9fa48("21686") ? {} : (stryCov_9fa48("21686"), {
          recursive: stryMutAct_9fa48("21687") ? false : (stryCov_9fa48("21687"), true),
          force: stryMutAct_9fa48("21688") ? false : (stryCov_9fa48("21688"), true)
        }));
      }
    }
  }
});
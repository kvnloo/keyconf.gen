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
import { selectPagesCandidates } from '../scripts/select-pages-candidates.mjs';
const repository = stryMutAct_9fa48("21384") ? "" : (stryCov_9fa48("21384"), 'kvnloo/keyconf.gen');
const repo = stryMutAct_9fa48("21385") ? {} : (stryCov_9fa48("21385"), {
  id: 123,
  full_name: repository
});
const run = stryMutAct_9fa48("21386") ? () => undefined : (stryCov_9fa48("21386"), (() => {
  const run = (id, branch = stryMutAct_9fa48("21387") ? "" : (stryCov_9fa48("21387"), 'nightly'), overrides = {}) => stryMutAct_9fa48("21388") ? {} : (stryCov_9fa48("21388"), {
    id,
    run_number: id,
    head_branch: branch,
    head_sha: String(stryMutAct_9fa48("21389") ? id * 10 : (stryCov_9fa48("21389"), id % 10)).repeat(40),
    path: stryMutAct_9fa48("21390") ? "" : (stryCov_9fa48("21390"), '.github/workflows/publish.yml'),
    event: stryMutAct_9fa48("21391") ? "" : (stryCov_9fa48("21391"), 'push'),
    repository: repo,
    head_repository: repo,
    ...overrides
  });
  return run;
})());
const artifact = stryMutAct_9fa48("21392") ? () => undefined : (stryCov_9fa48("21392"), (() => {
  const artifact = (source, overrides = {}) => stryMutAct_9fa48("21393") ? {} : (stryCov_9fa48("21393"), {
    id: stryMutAct_9fa48("21394") ? source.id - 1000 : (stryCov_9fa48("21394"), source.id + 1000),
    name: stryMutAct_9fa48("21395") ? "" : (stryCov_9fa48("21395"), 'pages-candidate'),
    expired: stryMutAct_9fa48("21396") ? true : (stryCov_9fa48("21396"), false),
    created_at: stryMutAct_9fa48("21397") ? "" : (stryCov_9fa48("21397"), '2026-09-06T09:00:00Z'),
    workflow_run: stryMutAct_9fa48("21398") ? {} : (stryCov_9fa48("21398"), {
      id: source.id,
      head_sha: source.head_sha,
      head_branch: source.head_branch,
      repository_id: repo.id,
      head_repository_id: repo.id
    }),
    ...overrides
  });
  return artifact;
})());
function fixture(runs, {
  checks = {},
  artifacts = {}
} = {}) {
  if (stryMutAct_9fa48("21399")) {
    {}
  } else {
    stryCov_9fa48("21399");
    const requests = stryMutAct_9fa48("21400") ? ["Stryker was here"] : (stryCov_9fa48("21400"), []);
    return stryMutAct_9fa48("21401") ? {} : (stryCov_9fa48("21401"), {
      requests,
      readApi: async endpoint => {
        if (stryMutAct_9fa48("21402")) {
          {}
        } else {
          stryCov_9fa48("21402");
          if (stryMutAct_9fa48("21403")) {
            ;
          } else {
            stryCov_9fa48("21403");
            requests.push(endpoint);
          }
          const url = new URL(endpoint, stryMutAct_9fa48("21404") ? "" : (stryCov_9fa48("21404"), 'https://api.github.com/'));
          const list = stryMutAct_9fa48("21405") ? `` : (stryCov_9fa48("21405"), `/repos/${repository}/actions/workflows/publish.yml/runs`);
          if (stryMutAct_9fa48("21408") ? url.pathname !== list : stryMutAct_9fa48("21407") ? false : stryMutAct_9fa48("21406") ? true : (stryCov_9fa48("21406", "21407", "21408"), url.pathname === list)) return stryMutAct_9fa48("21409") ? {} : (stryCov_9fa48("21409"), {
            workflow_runs: stryMutAct_9fa48("21410") ? runs : (stryCov_9fa48("21410"), runs.filter(stryMutAct_9fa48("21411") ? () => undefined : (stryCov_9fa48("21411"), item => stryMutAct_9fa48("21414") ? item.head_branch !== url.searchParams.get('branch') : stryMutAct_9fa48("21413") ? false : stryMutAct_9fa48("21412") ? true : (stryCov_9fa48("21412", "21413", "21414"), item.head_branch === url.searchParams.get(stryMutAct_9fa48("21415") ? "" : (stryCov_9fa48("21415"), 'branch'))))))
          });
          const match = url.pathname.match(stryMutAct_9fa48("21418") ? /\/runs\/(\D+)\/(jobs|artifacts)$/ : stryMutAct_9fa48("21417") ? /\/runs\/(\d)\/(jobs|artifacts)$/ : stryMutAct_9fa48("21416") ? /\/runs\/(\d+)\/(jobs|artifacts)/ : (stryCov_9fa48("21416", "21417", "21418"), /\/runs\/(\d+)\/(jobs|artifacts)$/));
          assert.ok(match, stryMutAct_9fa48("21420") ? `` : (stryCov_9fa48("21420"), `Unexpected request: ${endpoint}`));
          const source = runs.find(stryMutAct_9fa48("21421") ? () => undefined : (stryCov_9fa48("21421"), item => stryMutAct_9fa48("21424") ? item.id !== Number(match[1]) : stryMutAct_9fa48("21423") ? false : stryMutAct_9fa48("21422") ? true : (stryCov_9fa48("21422", "21423", "21424"), item.id === Number(match[1]))));
          if (stryMutAct_9fa48("21425")) {
            ;
          } else {
            stryCov_9fa48("21425");
            assert.ok(source);
          }
          if (stryMutAct_9fa48("21428") ? match[2] !== 'jobs' : stryMutAct_9fa48("21427") ? false : stryMutAct_9fa48("21426") ? true : (stryCov_9fa48("21426", "21427", "21428"), match[2] === (stryMutAct_9fa48("21429") ? "" : (stryCov_9fa48("21429"), 'jobs')))) return stryMutAct_9fa48("21430") ? {} : (stryCov_9fa48("21430"), {
            jobs: stryMutAct_9fa48("21431") ? [] : (stryCov_9fa48("21431"), [stryMutAct_9fa48("21432") ? {} : (stryCov_9fa48("21432"), {
              name: stryMutAct_9fa48("21433") ? "" : (stryCov_9fa48("21433"), 'check'),
              run_id: source.id,
              conclusion: stryMutAct_9fa48("21434") ? checks[source.id] && 'success' : (stryCov_9fa48("21434"), checks[source.id] ?? (stryMutAct_9fa48("21435") ? "" : (stryCov_9fa48("21435"), 'success')))
            })])
          });
          return stryMutAct_9fa48("21436") ? {} : (stryCov_9fa48("21436"), {
            artifacts: stryMutAct_9fa48("21437") ? artifacts[source.id] && [artifact(source)] : (stryCov_9fa48("21437"), artifacts[source.id] ?? (stryMutAct_9fa48("21438") ? [] : (stryCov_9fa48("21438"), [artifact(source)])))
          });
        }
      }
    });
  }
}
test(stryMutAct_9fa48("21440") ? "" : (stryCov_9fa48("21440"), 'A canceled deployment still contributes its checked branch artifact'), async () => {
  if (stryMutAct_9fa48("21441")) {
    {}
  } else {
    stryCov_9fa48("21441");
    const runs = stryMutAct_9fa48("21442") ? [] : (stryCov_9fa48("21442"), [run(10, stryMutAct_9fa48("21443") ? "" : (stryCov_9fa48("21443"), 'main')), run(11, stryMutAct_9fa48("21444") ? "" : (stryCov_9fa48("21444"), 'dev'), stryMutAct_9fa48("21445") ? {} : (stryCov_9fa48("21445"), {
      conclusion: stryMutAct_9fa48("21446") ? "" : (stryCov_9fa48("21446"), 'cancelled')
    })), run(12)]);
    const candidates = await selectPagesCandidates(stryMutAct_9fa48("21447") ? {} : (stryCov_9fa48("21447"), {
      repository,
      ...fixture(runs)
    }));
    assert.deepEqual(Object.keys(candidates), stryMutAct_9fa48("21449") ? [] : (stryCov_9fa48("21449"), [stryMutAct_9fa48("21450") ? "" : (stryCov_9fa48("21450"), 'main'), stryMutAct_9fa48("21451") ? "" : (stryCov_9fa48("21451"), 'dev'), stryMutAct_9fa48("21452") ? "" : (stryCov_9fa48("21452"), 'nightly')]));
    assert.deepEqual(candidates.dev, stryMutAct_9fa48("21454") ? {} : (stryCov_9fa48("21454"), {
      runId: 11,
      runNumber: 11,
      sha: (stryMutAct_9fa48("21455") ? "" : (stryCov_9fa48("21455"), '1')).repeat(40),
      artifactId: 1011
    }));
  }
});
test(stryMutAct_9fa48("21457") ? "" : (stryCov_9fa48("21457"), 'Pending and failed checks do not displace an older successful build'), async () => {
  if (stryMutAct_9fa48("21458")) {
    {}
  } else {
    stryCov_9fa48("21458");
    const runs = stryMutAct_9fa48("21459") ? [] : (stryCov_9fa48("21459"), [run(5), run(4), run(3), run(2), run(1)]);
    const data = fixture(runs, stryMutAct_9fa48("21460") ? {} : (stryCov_9fa48("21460"), {
      checks: stryMutAct_9fa48("21461") ? {} : (stryCov_9fa48("21461"), {
        5: stryMutAct_9fa48("21462") ? "" : (stryCov_9fa48("21462"), 'failure'),
        4: stryMutAct_9fa48("21463") ? "" : (stryCov_9fa48("21463"), 'cancelled'),
        3: stryMutAct_9fa48("21464") ? "" : (stryCov_9fa48("21464"), 'in_progress')
      }),
      artifacts: stryMutAct_9fa48("21465") ? {} : (stryCov_9fa48("21465"), {
        2: stryMutAct_9fa48("21466") ? ["Stryker was here"] : (stryCov_9fa48("21466"), [])
      })
    }));
    const candidates = await selectPagesCandidates(stryMutAct_9fa48("21467") ? {} : (stryCov_9fa48("21467"), {
      repository,
      ...data
    }));
    if (stryMutAct_9fa48("21468")) {
      ;
    } else {
      stryCov_9fa48("21468");
      assert.equal(candidates.nightly.runId, 1);
    }
    if (stryMutAct_9fa48("21469")) {
      ;
    } else {
      stryCov_9fa48("21469");
      assert.equal(candidates.main, undefined);
    }
    assert.ok(stryMutAct_9fa48("21471") ? data.requests.some(endpoint => /runs\/[345]\/artifacts/.test(endpoint)) : (stryCov_9fa48("21471"), !(stryMutAct_9fa48("21472") ? data.requests.every(endpoint => /runs\/[345]\/artifacts/.test(endpoint)) : (stryCov_9fa48("21472"), data.requests.some(stryMutAct_9fa48("21473") ? () => undefined : (stryCov_9fa48("21473"), endpoint => (stryMutAct_9fa48("21474") ? /runs\/[^345]\/artifacts/ : (stryCov_9fa48("21474"), /runs\/[345]\/artifacts/)).test(endpoint)))))));
  }
});
test(stryMutAct_9fa48("21476") ? "" : (stryCov_9fa48("21476"), 'Run number wins over API ordering or a later artifact from an old rerun'), async () => {
  if (stryMutAct_9fa48("21477")) {
    {}
  } else {
    stryCov_9fa48("21477");
    const older = run(10, stryMutAct_9fa48("21478") ? "" : (stryCov_9fa48("21478"), 'nightly'), stryMutAct_9fa48("21479") ? {} : (stryCov_9fa48("21479"), {
      run_number: 1
    }));
    const newer = run(11, stryMutAct_9fa48("21480") ? "" : (stryCov_9fa48("21480"), 'nightly'), stryMutAct_9fa48("21481") ? {} : (stryCov_9fa48("21481"), {
      run_number: 2
    }));
    const data = fixture(stryMutAct_9fa48("21482") ? [] : (stryCov_9fa48("21482"), [older, newer]), stryMutAct_9fa48("21483") ? {} : (stryCov_9fa48("21483"), {
      artifacts: stryMutAct_9fa48("21484") ? {} : (stryCov_9fa48("21484"), {
        10: stryMutAct_9fa48("21485") ? [] : (stryCov_9fa48("21485"), [artifact(older, stryMutAct_9fa48("21486") ? {} : (stryCov_9fa48("21486"), {
          created_at: stryMutAct_9fa48("21487") ? "" : (stryCov_9fa48("21487"), '2026-09-07T00:00:00Z')
        }))])
      })
    }));
    const candidates = await selectPagesCandidates(stryMutAct_9fa48("21488") ? {} : (stryCov_9fa48("21488"), {
      repository,
      ...data
    }));
    if (stryMutAct_9fa48("21489")) {
      ;
    } else {
      stryCov_9fa48("21489");
      assert.equal(candidates.nightly.runId, 11);
    }
  }
});
test(stryMutAct_9fa48("21491") ? "" : (stryCov_9fa48("21491"), 'Only this repository and workflow on authorized branch events are eligible'), async () => {
  if (stryMutAct_9fa48("21492")) {
    {}
  } else {
    stryCov_9fa48("21492");
    const runs = stryMutAct_9fa48("21493") ? [] : (stryCov_9fa48("21493"), [run(8, stryMutAct_9fa48("21494") ? "" : (stryCov_9fa48("21494"), 'nightly'), stryMutAct_9fa48("21495") ? {} : (stryCov_9fa48("21495"), {
      event: stryMutAct_9fa48("21496") ? "" : (stryCov_9fa48("21496"), 'pull_request')
    })), run(7, stryMutAct_9fa48("21497") ? "" : (stryCov_9fa48("21497"), 'nightly'), stryMutAct_9fa48("21498") ? {} : (stryCov_9fa48("21498"), {
      repository: stryMutAct_9fa48("21499") ? {} : (stryCov_9fa48("21499"), {
        ...repo,
        full_name: stryMutAct_9fa48("21500") ? "" : (stryCov_9fa48("21500"), 'someone/else')
      })
    })), run(6, stryMutAct_9fa48("21501") ? "" : (stryCov_9fa48("21501"), 'nightly'), stryMutAct_9fa48("21502") ? {} : (stryCov_9fa48("21502"), {
      head_repository: stryMutAct_9fa48("21503") ? {} : (stryCov_9fa48("21503"), {
        id: 456,
        full_name: stryMutAct_9fa48("21504") ? "" : (stryCov_9fa48("21504"), 'fork/keyconf.gen')
      })
    })), run(5, stryMutAct_9fa48("21505") ? "" : (stryCov_9fa48("21505"), 'nightly'), stryMutAct_9fa48("21506") ? {} : (stryCov_9fa48("21506"), {
      path: stryMutAct_9fa48("21507") ? "" : (stryCov_9fa48("21507"), '.github/workflows/unrelated.yml')
    })), run(4, stryMutAct_9fa48("21508") ? "" : (stryCov_9fa48("21508"), 'nightly'), stryMutAct_9fa48("21509") ? {} : (stryCov_9fa48("21509"), {
      head_sha: stryMutAct_9fa48("21510") ? "" : (stryCov_9fa48("21510"), 'invalid')
    })), run(3, stryMutAct_9fa48("21511") ? "" : (stryCov_9fa48("21511"), 'nightly'), stryMutAct_9fa48("21512") ? {} : (stryCov_9fa48("21512"), {
      run_number: stryMutAct_9fa48("21513") ? +1 : (stryCov_9fa48("21513"), -1)
    })), run(2, stryMutAct_9fa48("21514") ? "" : (stryCov_9fa48("21514"), 'feature')), run(1, stryMutAct_9fa48("21515") ? "" : (stryCov_9fa48("21515"), 'nightly'), stryMutAct_9fa48("21516") ? {} : (stryCov_9fa48("21516"), {
      event: stryMutAct_9fa48("21517") ? "" : (stryCov_9fa48("21517"), 'workflow_dispatch')
    }))]);
    const data = fixture(runs);
    const candidates = await selectPagesCandidates(stryMutAct_9fa48("21518") ? {} : (stryCov_9fa48("21518"), {
      repository,
      ...data
    }));
    if (stryMutAct_9fa48("21519")) {
      ;
    } else {
      stryCov_9fa48("21519");
      assert.equal(candidates.nightly.runId, 1);
    }
    assert.equal(stryMutAct_9fa48("21521") ? data.requests.length : (stryCov_9fa48("21521"), data.requests.filter(stryMutAct_9fa48("21522") ? () => undefined : (stryCov_9fa48("21522"), endpoint => endpoint.includes(stryMutAct_9fa48("21523") ? "" : (stryCov_9fa48("21523"), '/jobs')))).length), 1);
    await assert.rejects(selectPagesCandidates(stryMutAct_9fa48("21524") ? {} : (stryCov_9fa48("21524"), {
      repository: stryMutAct_9fa48("21525") ? "" : (stryCov_9fa48("21525"), '../bad'),
      ...data
    })), /repository/i);
  }
});
test(stryMutAct_9fa48("21527") ? "" : (stryCov_9fa48("21527"), 'Expired, mismatched and missing artifacts cannot be published'), async () => {
  if (stryMutAct_9fa48("21528")) {
    {}
  } else {
    stryCov_9fa48("21528");
    const runs = stryMutAct_9fa48("21529") ? [] : (stryCov_9fa48("21529"), [run(6), run(5), run(4), run(3), run(2), run(1)]);
    const artifacts = stryMutAct_9fa48("21530") ? {} : (stryCov_9fa48("21530"), {
      6: stryMutAct_9fa48("21531") ? [] : (stryCov_9fa48("21531"), [artifact(runs[0], stryMutAct_9fa48("21532") ? {} : (stryCov_9fa48("21532"), {
        expired: stryMutAct_9fa48("21533") ? false : (stryCov_9fa48("21533"), true)
      }))]),
      5: stryMutAct_9fa48("21534") ? [] : (stryCov_9fa48("21534"), [artifact(runs[1], stryMutAct_9fa48("21535") ? {} : (stryCov_9fa48("21535"), {
        name: stryMutAct_9fa48("21536") ? "" : (stryCov_9fa48("21536"), 'verification-failure')
      }))]),
      4: stryMutAct_9fa48("21537") ? [] : (stryCov_9fa48("21537"), [artifact(runs[2], stryMutAct_9fa48("21538") ? {} : (stryCov_9fa48("21538"), {
        workflow_run: stryMutAct_9fa48("21539") ? {} : (stryCov_9fa48("21539"), {
          ...artifact(runs[2]).workflow_run,
          head_sha: (stryMutAct_9fa48("21540") ? "" : (stryCov_9fa48("21540"), 'a')).repeat(40)
        })
      }))]),
      3: stryMutAct_9fa48("21541") ? [] : (stryCov_9fa48("21541"), [artifact(runs[3], stryMutAct_9fa48("21542") ? {} : (stryCov_9fa48("21542"), {
        workflow_run: stryMutAct_9fa48("21543") ? {} : (stryCov_9fa48("21543"), {
          ...artifact(runs[3]).workflow_run,
          head_repository_id: 456
        })
      }))]),
      2: stryMutAct_9fa48("21544") ? [] : (stryCov_9fa48("21544"), [artifact(runs[4], stryMutAct_9fa48("21545") ? {} : (stryCov_9fa48("21545"), {
        workflow_run: stryMutAct_9fa48("21546") ? {} : (stryCov_9fa48("21546"), {
          ...artifact(runs[4]).workflow_run,
          id: 999
        })
      }))])
    });
    const candidates = await selectPagesCandidates(stryMutAct_9fa48("21547") ? {} : (stryCov_9fa48("21547"), {
      repository,
      ...fixture(runs, stryMutAct_9fa48("21548") ? {} : (stryCov_9fa48("21548"), {
        artifacts
      }))
    }));
    if (stryMutAct_9fa48("21549")) {
      ;
    } else {
      stryCov_9fa48("21549");
      assert.equal(candidates.nightly.runId, 1);
    }
  }
});
test(stryMutAct_9fa48("21551") ? "" : (stryCov_9fa48("21551"), 'API failures stop publication instead of silently omitting a branch'), async () => {
  if (stryMutAct_9fa48("21552")) {
    {}
  } else {
    stryCov_9fa48("21552");
    await assert.rejects(selectPagesCandidates(stryMutAct_9fa48("21553") ? {} : (stryCov_9fa48("21553"), {
      repository,
      readApi: async () => {
        if (stryMutAct_9fa48("21554")) {
          {}
        } else {
          stryCov_9fa48("21554");
          throw new Error(stryMutAct_9fa48("21556") ? "" : (stryCov_9fa48("21556"), 'API unavailable'));
        }
      }
    })), /API unavailable/);
  }
});
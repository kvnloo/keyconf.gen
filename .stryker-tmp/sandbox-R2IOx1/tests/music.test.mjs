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
import { setTimeout as delay } from 'node:timers/promises';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { StudioMusic } from '../lib/music.ts';
function fixture(t) {
  if (stryMutAct_9fa48("21188")) {
    {}
  } else {
    stryCov_9fa48("21188");
    const media = stryMutAct_9fa48("21189") ? ["Stryker was here"] : (stryCov_9fa48("21189"), []);
    const contexts = stryMutAct_9fa48("21190") ? ["Stryker was here"] : (stryCov_9fa48("21190"), []);
    let resume = async () => {};
    let play = async () => {};
    const originals = Object.fromEntries((stryMutAct_9fa48("21191") ? [] : (stryCov_9fa48("21191"), [stryMutAct_9fa48("21192") ? "" : (stryCov_9fa48("21192"), 'Audio'), stryMutAct_9fa48("21193") ? "" : (stryCov_9fa48("21193"), 'AudioContext'), stryMutAct_9fa48("21194") ? "" : (stryCov_9fa48("21194"), 'document')])).map(stryMutAct_9fa48("21195") ? () => undefined : (stryCov_9fa48("21195"), key => stryMutAct_9fa48("21196") ? [] : (stryCov_9fa48("21196"), [key, Object.getOwnPropertyDescriptor(globalThis, key)]))));
    globalThis.document = stryMutAct_9fa48("21197") ? {} : (stryCov_9fa48("21197"), {
      baseURI: stryMutAct_9fa48("21198") ? "" : (stryCov_9fa48("21198"), 'https://example.com/keyconf.gen/nightly/')
    });
    globalThis.Audio = class {
      paused = stryMutAct_9fa48("21199") ? false : (stryCov_9fa48("21199"), true);
      src = stryMutAct_9fa48("21200") ? "Stryker was here!" : (stryCov_9fa48("21200"), '');
      constructor() {
        if (stryMutAct_9fa48("21201")) {
          {}
        } else {
          stryCov_9fa48("21201");
          if (stryMutAct_9fa48("21202")) {
            ;
          } else {
            stryCov_9fa48("21202");
            media.push(this);
          }
        }
      }
      getAttribute() {
        if (stryMutAct_9fa48("21203")) {
          {}
        } else {
          stryCov_9fa48("21203");
          return this.src;
        }
      }
      canPlayType() {
        if (stryMutAct_9fa48("21204")) {
          {}
        } else {
          stryCov_9fa48("21204");
          return stryMutAct_9fa48("21205") ? "" : (stryCov_9fa48("21205"), 'probably');
        }
      }
      removeAttribute() {
        if (stryMutAct_9fa48("21206")) {
          {}
        } else {
          stryCov_9fa48("21206");
          this.src = stryMutAct_9fa48("21207") ? "Stryker was here!" : (stryCov_9fa48("21207"), '');
        }
      }
      load() {
        if (stryMutAct_9fa48("21208")) {
          {}
        } else {
          stryCov_9fa48("21208");
          this.error = null;
        }
      }
      async play() {
        if (stryMutAct_9fa48("21209")) {
          {}
        } else {
          stryCov_9fa48("21209");
          await play();
          this.paused = stryMutAct_9fa48("21210") ? true : (stryCov_9fa48("21210"), false);
        }
      }
      pause() {
        if (stryMutAct_9fa48("21211")) {
          {}
        } else {
          stryCov_9fa48("21211");
          this.paused = stryMutAct_9fa48("21212") ? false : (stryCov_9fa48("21212"), true);
        }
      }
    };
    globalThis.AudioContext = class {
      currentTime = 0;
      destination = {};
      closed = stryMutAct_9fa48("21213") ? true : (stryCov_9fa48("21213"), false);
      constructor() {
        if (stryMutAct_9fa48("21214")) {
          {}
        } else {
          stryCov_9fa48("21214");
          if (stryMutAct_9fa48("21215")) {
            ;
          } else {
            stryCov_9fa48("21215");
            contexts.push(this);
          }
        }
      }
      resume() {
        if (stryMutAct_9fa48("21216")) {
          {}
        } else {
          stryCov_9fa48("21216");
          return resume();
        }
      }
      async close() {
        if (stryMutAct_9fa48("21217")) {
          {}
        } else {
          stryCov_9fa48("21217");
          this.closed = stryMutAct_9fa48("21218") ? false : (stryCov_9fa48("21218"), true);
        }
      }
      createMediaElementSource() {
        if (stryMutAct_9fa48("21219")) {
          {}
        } else {
          stryCov_9fa48("21219");
          return stryMutAct_9fa48("21220") ? {} : (stryCov_9fa48("21220"), {
            connect: stryMutAct_9fa48("21221") ? () => undefined : (stryCov_9fa48("21221"), gain => gain),
            disconnect() {}
          });
        }
      }
      createGain() {
        if (stryMutAct_9fa48("21222")) {
          {}
        } else {
          stryCov_9fa48("21222");
          this.gain = stryMutAct_9fa48("21223") ? {} : (stryCov_9fa48("21223"), {
            gain: stryMutAct_9fa48("21224") ? {} : (stryCov_9fa48("21224"), {
              value: 0,
              ramps: stryMutAct_9fa48("21225") ? ["Stryker was here"] : (stryCov_9fa48("21225"), []),
              cancelScheduledValues() {},
              cancelAndHoldAtTime() {},
              setValueAtTime(value) {
                if (stryMutAct_9fa48("21226")) {
                  {}
                } else {
                  stryCov_9fa48("21226");
                  this.value = value;
                }
              },
              linearRampToValueAtTime(value, at) {
                if (stryMutAct_9fa48("21227")) {
                  {}
                } else {
                  stryCov_9fa48("21227");
                  this.value = value;
                  this.ramps.push(stryMutAct_9fa48("21229") ? {} : (stryCov_9fa48("21229"), {
                    value,
                    at
                  }));
                }
              }
            }),
            connect() {},
            disconnect() {}
          });
          return this.gain;
        }
      }
    };
    const music = new StudioMusic();
    t.after(() => {
      if (stryMutAct_9fa48("21231")) {
        {}
      } else {
        stryCov_9fa48("21231");
        if (stryMutAct_9fa48("21232")) {
          ;
        } else {
          stryCov_9fa48("21232");
          music.close();
        }
        for (const [key, descriptor] of Object.entries(originals)) {
          if (stryMutAct_9fa48("21233")) {
            {}
          } else {
            stryCov_9fa48("21233");
            if (stryMutAct_9fa48("21235") ? false : stryMutAct_9fa48("21234") ? true : (stryCov_9fa48("21234", "21235"), descriptor)) {
              if (stryMutAct_9fa48("21236")) {
                ;
              } else {
                stryCov_9fa48("21236");
                Object.defineProperty(globalThis, key, descriptor);
              }
            } else delete globalThis[key];
          }
        }
      }
    });
    return stryMutAct_9fa48("21237") ? {} : (stryCov_9fa48("21237"), {
      music,
      media,
      contexts,
      resume: next => {
        if (stryMutAct_9fa48("21238")) {
          {}
        } else {
          stryCov_9fa48("21238");
          resume = next;
        }
      },
      play: next => {
        if (stryMutAct_9fa48("21239")) {
          {}
        } else {
          stryCov_9fa48("21239");
          play = next;
        }
      }
    });
  }
}
test(stryMutAct_9fa48("21241") ? "" : (stryCov_9fa48("21241"), 'requested music waits for every blocker to clear before loading its source'), async t => {
  if (stryMutAct_9fa48("21242")) {
    {}
  } else {
    stryCov_9fa48("21242");
    const {
      music,
      media,
      contexts
    } = fixture(t);
    if (stryMutAct_9fa48("21243")) {
      ;
    } else {
      stryCov_9fa48("21243");
      assert.equal(contexts.length, 0);
    }
    music.setBlocked(stryMutAct_9fa48("21245") ? "" : (stryCov_9fa48("21245"), 'keyboard'), stryMutAct_9fa48("21246") ? false : (stryCov_9fa48("21246"), true));
    music.setBlocked(stryMutAct_9fa48("21248") ? "" : (stryCov_9fa48("21248"), 'reference'), stryMutAct_9fa48("21249") ? false : (stryCov_9fa48("21249"), true));
    await music.play();
    assert.equal(media[0].src, stryMutAct_9fa48("21251") ? "Stryker was here!" : (stryCov_9fa48("21251"), ''));
    assert.deepEqual(music.getSnapshot().state, stryMutAct_9fa48("21253") ? {} : (stryCov_9fa48("21253"), {
      kind: stryMutAct_9fa48("21254") ? "" : (stryCov_9fa48("21254"), 'paused'),
      reason: stryMutAct_9fa48("21255") ? "" : (stryCov_9fa48("21255"), 'reference')
    }));
    music.setBlocked(stryMutAct_9fa48("21257") ? "" : (stryCov_9fa48("21257"), 'reference'), stryMutAct_9fa48("21258") ? true : (stryCov_9fa48("21258"), false));
    await delay(300);
    assert.equal(media[0].src, stryMutAct_9fa48("21260") ? "Stryker was here!" : (stryCov_9fa48("21260"), ''));
    music.setBlocked(stryMutAct_9fa48("21262") ? "" : (stryCov_9fa48("21262"), 'keyboard'), stryMutAct_9fa48("21263") ? true : (stryCov_9fa48("21263"), false));
    await delay(300);
    assert.equal(music.getSnapshot().state.kind, stryMutAct_9fa48("21265") ? "" : (stryCov_9fa48("21265"), 'playing'));
    assert.equal(media[0].src, stryMutAct_9fa48("21267") ? "" : (stryCov_9fa48("21267"), 'https://example.com/keyconf.gen/nightly/music/lofi-again.ogg'));
    music.setBlocked(stryMutAct_9fa48("21269") ? "" : (stryCov_9fa48("21269"), 'reference'), stryMutAct_9fa48("21270") ? false : (stryCov_9fa48("21270"), true));
    assert.equal(media[0].paused, stryMutAct_9fa48("21272") ? false : (stryCov_9fa48("21272"), true));
    if (stryMutAct_9fa48("21273")) {
      ;
    } else {
      stryCov_9fa48("21273");
      assert.equal(contexts[0].gain.gain.value, 0);
    }
  }
});
test(stryMutAct_9fa48("21275") ? "" : (stryCov_9fa48("21275"), 'Pause during suppression cancels recovery and user volume survives suppression'), async t => {
  if (stryMutAct_9fa48("21276")) {
    {}
  } else {
    stryCov_9fa48("21276");
    const {
      music,
      media,
      contexts
    } = fixture(t);
    await music.play();
    if (stryMutAct_9fa48("21277")) {
      ;
    } else {
      stryCov_9fa48("21277");
      music.setVolume(0.31);
    }
    music.setBlocked(stryMutAct_9fa48("21279") ? "" : (stryCov_9fa48("21279"), 'keyboard'), stryMutAct_9fa48("21280") ? false : (stryCov_9fa48("21280"), true));
    if (stryMutAct_9fa48("21281")) {
      ;
    } else {
      stryCov_9fa48("21281");
      music.pause();
    }
    music.setBlocked(stryMutAct_9fa48("21283") ? "" : (stryCov_9fa48("21283"), 'keyboard'), stryMutAct_9fa48("21284") ? true : (stryCov_9fa48("21284"), false));
    await delay(300);
    assert.equal(music.getSnapshot().state.kind, stryMutAct_9fa48("21286") ? "" : (stryCov_9fa48("21286"), 'off'));
    assert.equal(media[0].paused, stryMutAct_9fa48("21288") ? false : (stryCov_9fa48("21288"), true));
    await music.play();
    if (stryMutAct_9fa48("21289")) {
      ;
    } else {
      stryCov_9fa48("21289");
      assert.equal(contexts[0].gain.gain.value, 0.31);
    }
    music.setBlocked(stryMutAct_9fa48("21291") ? "" : (stryCov_9fa48("21291"), 'keyboard'), stryMutAct_9fa48("21292") ? false : (stryCov_9fa48("21292"), true));
    music.setBlocked(stryMutAct_9fa48("21294") ? "" : (stryCov_9fa48("21294"), 'keyboard'), stryMutAct_9fa48("21295") ? true : (stryCov_9fa48("21295"), false));
    music.setBlocked(stryMutAct_9fa48("21297") ? "" : (stryCov_9fa48("21297"), 'reference'), stryMutAct_9fa48("21298") ? false : (stryCov_9fa48("21298"), true));
    await delay(300);
    if (stryMutAct_9fa48("21299")) {
      ;
    } else {
      stryCov_9fa48("21299");
      assert.equal(contexts[0].gain.gain.value, 0);
    }
    assert.deepEqual(music.getSnapshot().state, stryMutAct_9fa48("21301") ? {} : (stryCov_9fa48("21301"), {
      kind: stryMutAct_9fa48("21302") ? "" : (stryCov_9fa48("21302"), 'paused'),
      reason: stryMutAct_9fa48("21303") ? "" : (stryCov_9fa48("21303"), 'reference')
    }));
  }
});
test(stryMutAct_9fa48("21305") ? "" : (stryCov_9fa48("21305"), 'late play resolution cannot restart music after Pause or close'), async t => {
  if (stryMutAct_9fa48("21306")) {
    {}
  } else {
    stryCov_9fa48("21306");
    const f = fixture(t);
    let finish;
    f.play(stryMutAct_9fa48("21308") ? () => undefined : (stryCov_9fa48("21308"), () => new Promise(resolve => {
      if (stryMutAct_9fa48("21309")) {
        {}
      } else {
        stryCov_9fa48("21309");
        finish = resolve;
      }
    })));
    const pending = f.music.play();
    await delay(0);
    if (stryMutAct_9fa48("21310")) {
      ;
    } else {
      stryCov_9fa48("21310");
      f.music.pause();
    }
    if (stryMutAct_9fa48("21311")) {
      ;
    } else {
      stryCov_9fa48("21311");
      finish();
    }
    await pending;
    assert.equal(f.media[0].paused, stryMutAct_9fa48("21313") ? false : (stryCov_9fa48("21313"), true));
    assert.equal(f.music.getSnapshot().state.kind, stryMutAct_9fa48("21315") ? "" : (stryCov_9fa48("21315"), 'off'));
    const second = f.music.play();
    await delay(0);
    if (stryMutAct_9fa48("21316")) {
      ;
    } else {
      stryCov_9fa48("21316");
      f.music.close();
    }
    if (stryMutAct_9fa48("21317")) {
      ;
    } else {
      stryCov_9fa48("21317");
      finish();
    }
    await second;
    assert.equal(f.media[0].paused, stryMutAct_9fa48("21319") ? false : (stryCov_9fa48("21319"), true));
    assert.equal(f.contexts[0].closed, stryMutAct_9fa48("21321") ? false : (stryCov_9fa48("21321"), true));
    assert.equal(f.media[0].src, stryMutAct_9fa48("21323") ? "Stryker was here!" : (stryCov_9fa48("21323"), ''));
  }
});
test(stryMutAct_9fa48("21325") ? "" : (stryCov_9fa48("21325"), 'late audio unlock cannot load music after close and errors permit explicit retry'), async t => {
  if (stryMutAct_9fa48("21326")) {
    {}
  } else {
    stryCov_9fa48("21326");
    const f = fixture(t);
    let finish;
    f.resume(stryMutAct_9fa48("21328") ? () => undefined : (stryCov_9fa48("21328"), () => new Promise(resolve => {
      if (stryMutAct_9fa48("21329")) {
        {}
      } else {
        stryCov_9fa48("21329");
        finish = resolve;
      }
    })));
    const pending = f.music.play();
    if (stryMutAct_9fa48("21330")) {
      ;
    } else {
      stryCov_9fa48("21330");
      f.music.close();
    }
    if (stryMutAct_9fa48("21331")) {
      ;
    } else {
      stryCov_9fa48("21331");
      finish();
    }
    await pending;
    assert.equal(f.media[0].src, stryMutAct_9fa48("21333") ? "Stryker was here!" : (stryCov_9fa48("21333"), ''));
    f.resume(async () => {
      if (stryMutAct_9fa48("21335")) {
        {}
      } else {
        stryCov_9fa48("21335");
        throw new Error(stryMutAct_9fa48("21337") ? "" : (stryCov_9fa48("21337"), 'autoplay denied'));
      }
    });
    await f.music.play();
    assert.equal(f.music.getSnapshot().state.kind, stryMutAct_9fa48("21339") ? "" : (stryCov_9fa48("21339"), 'error'));
    assert.equal(f.music.getSnapshot().requested, stryMutAct_9fa48("21341") ? true : (stryCov_9fa48("21341"), false));
    if (stryMutAct_9fa48("21342")) {
      ;
    } else {
      stryCov_9fa48("21342");
      f.resume(async () => {});
    }
    await f.music.play();
    assert.equal(f.music.getSnapshot().state.kind, stryMutAct_9fa48("21344") ? "" : (stryCov_9fa48("21344"), 'playing'));
  }
});
test(stryMutAct_9fa48("21346") ? "" : (stryCov_9fa48("21346"), 'music defaults to 3% and fades in over three seconds'), async t => {
  if (stryMutAct_9fa48("21347")) {
    {}
  } else {
    stryCov_9fa48("21347");
    const {
      music,
      contexts
    } = fixture(t);
    await music.play();
    if (stryMutAct_9fa48("21348")) {
      ;
    } else {
      stryCov_9fa48("21348");
      assert.equal(music.getSnapshot().volume, 0.03);
    }
    if (stryMutAct_9fa48("21349")) {
      ;
    } else {
      stryCov_9fa48("21349");
      assert.equal(contexts[0].gain.gain.value, 0.03);
    }
    assert.deepEqual(contexts[0].gain.gain.ramps.at(stryMutAct_9fa48("21351") ? +1 : (stryCov_9fa48("21351"), -1)), stryMutAct_9fa48("21352") ? {} : (stryCov_9fa48("21352"), {
      value: 0.03,
      at: 3
    }));
  }
});
test(stryMutAct_9fa48("21354") ? "" : (stryCov_9fa48("21354"), 'repeated starts while music is requested do not interrupt the active fade'), async t => {
  if (stryMutAct_9fa48("21355")) {
    {}
  } else {
    stryCov_9fa48("21355");
    const {
      music,
      contexts
    } = fixture(t);
    await music.play();
    const rampCount = contexts[0].gain.gain.ramps.length;
    await music.play();
    assert.equal(music.getSnapshot().state.kind, stryMutAct_9fa48("21357") ? "" : (stryCov_9fa48("21357"), 'playing'));
    if (stryMutAct_9fa48("21358")) {
      ;
    } else {
      stryCov_9fa48("21358");
      assert.equal(contexts[0].gain.gain.ramps.length, rampCount);
    }
  }
});
test(stryMutAct_9fa48("21360") ? "" : (stryCov_9fa48("21360"), 'an explicit Pause prevents a later default gesture start'), async t => {
  if (stryMutAct_9fa48("21361")) {
    {}
  } else {
    stryCov_9fa48("21361");
    const {
      music,
      contexts
    } = fixture(t);
    if (stryMutAct_9fa48("21362")) {
      ;
    } else {
      stryCov_9fa48("21362");
      music.pause();
    }
    await music.startOnFirstGesture();
    assert.equal(music.getSnapshot().state.kind, stryMutAct_9fa48("21364") ? "" : (stryCov_9fa48("21364"), 'off'));
    if (stryMutAct_9fa48("21365")) {
      ;
    } else {
      stryCov_9fa48("21365");
      assert.equal(contexts.length, 0);
    }
  }
});
test(stryMutAct_9fa48("21367") ? "" : (stryCov_9fa48("21367"), 'music assets retain original bytes and an explicit source/license record'), () => {
  if (stryMutAct_9fa48("21368")) {
    {}
  } else {
    stryCov_9fa48("21368");
    for (const [file, hash] of stryMutAct_9fa48("21369") ? [] : (stryCov_9fa48("21369"), [stryMutAct_9fa48("21370") ? [] : (stryCov_9fa48("21370"), [stryMutAct_9fa48("21371") ? "" : (stryCov_9fa48("21371"), 'lofi-again.ogg'), stryMutAct_9fa48("21372") ? "" : (stryCov_9fa48("21372"), 'd3b3410a186d45dadbcf87a8072b5a7f3b3f5a11fe38d9a7e9bdb3f66d5d86fa')]), stryMutAct_9fa48("21373") ? [] : (stryCov_9fa48("21373"), [stryMutAct_9fa48("21374") ? "" : (stryCov_9fa48("21374"), 'lofi-again.mp3'), stryMutAct_9fa48("21375") ? "" : (stryCov_9fa48("21375"), '5aaddde19071776a82e0abf886e787180bb49d1246511284de5f7d7aac9518be')])])) {
      if (stryMutAct_9fa48("21376")) {
        {}
      } else {
        stryCov_9fa48("21376");
        assert.equal(createHash(stryMutAct_9fa48("21378") ? "" : (stryCov_9fa48("21378"), 'sha256')).update(readFileSync(new URL(stryMutAct_9fa48("21379") ? `` : (stryCov_9fa48("21379"), `../public/music/${file}`), import.meta.url))).digest(stryMutAct_9fa48("21380") ? "" : (stryCov_9fa48("21380"), 'hex')), hash);
      }
    }
    assert.match(readFileSync(new URL(stryMutAct_9fa48("21382") ? "" : (stryCov_9fa48("21382"), '../public/music/LICENSE.txt'), import.meta.url), stryMutAct_9fa48("21383") ? "" : (stryCov_9fa48("21383"), 'utf8')), /CC0 1.0 Universal/);
  }
});
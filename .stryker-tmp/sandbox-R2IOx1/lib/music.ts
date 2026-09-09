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
export type MusicBlocker = 'keyboard' | 'reference';
export type MusicState = {
  kind: 'off';
} | {
  kind: 'loading';
} | {
  kind: 'playing';
} | {
  kind: 'paused';
  reason: MusicBlocker;
} | {
  kind: 'error';
  message: string;
};
export type MusicSnapshot = {
  state: MusicState;
  requested: boolean;
  volume: number;
};
export class StudioMusic {
  private snapshot: MusicSnapshot = stryMutAct_9fa48("12998") ? {} : (stryCov_9fa48("12998"), {
    state: stryMutAct_9fa48("12999") ? {} : (stryCov_9fa48("12999"), {
      kind: stryMutAct_9fa48("13000") ? "" : (stryCov_9fa48("13000"), 'off')
    }),
    requested: stryMutAct_9fa48("13001") ? true : (stryCov_9fa48("13001"), false),
    volume: 0.03
  });
  private listeners = new Set<() => void>();
  private blockers = new Set<MusicBlocker>();
  private context: AudioContext | null = null;
  private media: HTMLAudioElement | null = null;
  private source: MediaElementAudioSourceNode | null = null;
  private gain: GainNode | null = null;
  private revision = 0;
  private defaultStartAvailable = stryMutAct_9fa48("13002") ? false : (stryCov_9fa48("13002"), true);
  private recovery: ReturnType<typeof setTimeout> | null = null;
  getSnapshot = stryMutAct_9fa48("13003") ? () => undefined : (stryCov_9fa48("13003"), () => this.snapshot);
  subscribe = (listener: () => void) => {
    if (stryMutAct_9fa48("13004")) {
      {}
    } else {
      stryCov_9fa48("13004");
      if (stryMutAct_9fa48("13005")) {
        ;
      } else {
        stryCov_9fa48("13005");
        this.listeners.add(listener);
      }
      return () => {
        if (stryMutAct_9fa48("13006")) {
          {}
        } else {
          stryCov_9fa48("13006");
          if (stryMutAct_9fa48("13007")) {
            ;
          } else {
            stryCov_9fa48("13007");
            this.listeners.delete(listener);
          }
        }
      };
    }
  };
  private publish(state: MusicState, requested = this.snapshot.requested) {
    if (stryMutAct_9fa48("13008")) {
      {}
    } else {
      stryCov_9fa48("13008");
      this.snapshot = stryMutAct_9fa48("13009") ? {} : (stryCov_9fa48("13009"), {
        ...this.snapshot,
        state,
        requested
      });
      for (const listener of this.listeners) if (stryMutAct_9fa48("13010")) {
        ;
      } else {
        stryCov_9fa48("13010");
        listener();
      }
    }
  }
  private reason(): MusicBlocker | null {
    if (stryMutAct_9fa48("13011")) {
      {}
    } else {
      stryCov_9fa48("13011");
      return this.blockers.has(stryMutAct_9fa48("13012") ? "" : (stryCov_9fa48("13012"), 'reference')) ? stryMutAct_9fa48("13013") ? "" : (stryCov_9fa48("13013"), 'reference') : this.blockers.has(stryMutAct_9fa48("13014") ? "" : (stryCov_9fa48("13014"), 'keyboard')) ? stryMutAct_9fa48("13015") ? "" : (stryCov_9fa48("13015"), 'keyboard') : null;
    }
  }
  private silence() {
    if (stryMutAct_9fa48("13016")) {
      {}
    } else {
      stryCov_9fa48("13016");
      stryMutAct_9fa48("13017") ? this.revision-- : (stryCov_9fa48("13017"), this.revision++);
      if (stryMutAct_9fa48("13020") ? this.recovery === null : stryMutAct_9fa48("13019") ? false : stryMutAct_9fa48("13018") ? true : (stryCov_9fa48("13018", "13019", "13020"), this.recovery !== null)) if (stryMutAct_9fa48("13021")) {
        ;
      } else {
        stryCov_9fa48("13021");
        clearTimeout(this.recovery);
      }
      this.recovery = null;
      if (stryMutAct_9fa48("13024") ? this.context || this.gain : stryMutAct_9fa48("13023") ? false : stryMutAct_9fa48("13022") ? true : (stryCov_9fa48("13022", "13023", "13024"), this.context && this.gain)) {
        if (stryMutAct_9fa48("13025")) {
          {}
        } else {
          stryCov_9fa48("13025");
          if (stryMutAct_9fa48("13026")) {
            ;
          } else {
            stryCov_9fa48("13026");
            this.gain.gain.cancelScheduledValues(this.context.currentTime);
          }
          if (stryMutAct_9fa48("13027")) {
            ;
          } else {
            stryCov_9fa48("13027");
            this.gain.gain.setValueAtTime(0, this.context.currentTime);
          }
        }
      }
      stryMutAct_9fa48("13028") ? this.media.pause() : (stryCov_9fa48("13028"), this.media?.pause());
    }
  }
  setBlocked(reason: MusicBlocker, blocked: boolean) {
    if (stryMutAct_9fa48("13029")) {
      {}
    } else {
      stryCov_9fa48("13029");
      if (stryMutAct_9fa48("13032") ? this.blockers.has(reason) !== blocked : stryMutAct_9fa48("13031") ? false : stryMutAct_9fa48("13030") ? true : (stryCov_9fa48("13030", "13031", "13032"), this.blockers.has(reason) === blocked)) return;
      if (stryMutAct_9fa48("13034") ? false : stryMutAct_9fa48("13033") ? true : (stryCov_9fa48("13033", "13034"), blocked)) {
        if (stryMutAct_9fa48("13035")) {
          ;
        } else {
          stryCov_9fa48("13035");
          this.blockers.add(reason);
        }
      } else if (stryMutAct_9fa48("13036")) {
        ;
      } else {
        stryCov_9fa48("13036");
        this.blockers.delete(reason);
      }
      if (stryMutAct_9fa48("13037")) {
        ;
      } else {
        stryCov_9fa48("13037");
        this.silence();
      }
      if (stryMutAct_9fa48("13040") ? false : stryMutAct_9fa48("13039") ? true : stryMutAct_9fa48("13038") ? this.snapshot.requested : (stryCov_9fa48("13038", "13039", "13040"), !this.snapshot.requested)) return;
      const remaining = this.reason();
      if (stryMutAct_9fa48("13042") ? false : stryMutAct_9fa48("13041") ? true : (stryCov_9fa48("13041", "13042"), remaining)) this.publish(stryMutAct_9fa48("13044") ? {} : (stryCov_9fa48("13044"), {
        kind: stryMutAct_9fa48("13045") ? "" : (stryCov_9fa48("13045"), 'paused'),
        reason: remaining
      }));else {
        if (stryMutAct_9fa48("13046")) {
          {}
        } else {
          stryCov_9fa48("13046");
          this.publish(stryMutAct_9fa48("13048") ? {} : (stryCov_9fa48("13048"), {
            kind: stryMutAct_9fa48("13049") ? "" : (stryCov_9fa48("13049"), 'loading')
          }));
          this.recovery = setTimeout(() => {
            if (stryMutAct_9fa48("13050")) {
              {}
            } else {
              stryCov_9fa48("13050");
              this.recovery = null;
              void this.start();
            }
          }, 250);
        }
      }
    }
  }
  setVolume(value: number) {
    if (stryMutAct_9fa48("13051")) {
      {}
    } else {
      stryCov_9fa48("13051");
      if (stryMutAct_9fa48("13054") ? false : stryMutAct_9fa48("13053") ? true : stryMutAct_9fa48("13052") ? Number.isFinite(value) : (stryCov_9fa48("13052", "13053", "13054"), !Number.isFinite(value))) return;
      const volume = stryMutAct_9fa48("13055") ? Math.min(0, Math.min(1, value)) : (stryCov_9fa48("13055"), Math.max(0, stryMutAct_9fa48("13056") ? Math.max(1, value) : (stryCov_9fa48("13056"), Math.min(1, value))));
      this.snapshot = stryMutAct_9fa48("13057") ? {} : (stryCov_9fa48("13057"), {
        ...this.snapshot,
        volume
      });
      if (stryMutAct_9fa48("13060") ? this.snapshot.state.kind === 'playing' && this.context || this.gain : stryMutAct_9fa48("13059") ? false : stryMutAct_9fa48("13058") ? true : (stryCov_9fa48("13058", "13059", "13060"), (stryMutAct_9fa48("13062") ? this.snapshot.state.kind === 'playing' || this.context : stryMutAct_9fa48("13061") ? true : (stryCov_9fa48("13061", "13062"), (stryMutAct_9fa48("13064") ? this.snapshot.state.kind !== 'playing' : stryMutAct_9fa48("13063") ? true : (stryCov_9fa48("13063", "13064"), this.snapshot.state.kind === (stryMutAct_9fa48("13065") ? "" : (stryCov_9fa48("13065"), 'playing')))) && this.context)) && this.gain)) {
        if (stryMutAct_9fa48("13066")) {
          {}
        } else {
          stryCov_9fa48("13066");
          const time = this.context.currentTime;
          if (stryMutAct_9fa48("13067")) {
            ;
          } else {
            stryCov_9fa48("13067");
            this.gain.gain.cancelAndHoldAtTime(time);
          }
          this.gain.gain.linearRampToValueAtTime(volume, stryMutAct_9fa48("13069") ? time - 0.02 : (stryCov_9fa48("13069"), time + 0.02));
        }
      }
      for (const listener of this.listeners) if (stryMutAct_9fa48("13070")) {
        ;
      } else {
        stryCov_9fa48("13070");
        listener();
      }
    }
  }
  play() {
    if (stryMutAct_9fa48("13071")) {
      {}
    } else {
      stryCov_9fa48("13071");
      if (stryMutAct_9fa48("13073") ? false : stryMutAct_9fa48("13072") ? true : (stryCov_9fa48("13072", "13073"), this.snapshot.requested)) return Promise.resolve();
      if (stryMutAct_9fa48("13074")) {
        ;
      } else {
        stryCov_9fa48("13074");
        this.silence();
      }
      this.publish(stryMutAct_9fa48("13076") ? {} : (stryCov_9fa48("13076"), {
        kind: stryMutAct_9fa48("13077") ? "" : (stryCov_9fa48("13077"), 'loading')
      }), stryMutAct_9fa48("13078") ? false : (stryCov_9fa48("13078"), true));
      return this.start();
    }
  }
  startOnFirstGesture() {
    if (stryMutAct_9fa48("13079")) {
      {}
    } else {
      stryCov_9fa48("13079");
      if (stryMutAct_9fa48("13082") ? false : stryMutAct_9fa48("13081") ? true : stryMutAct_9fa48("13080") ? this.defaultStartAvailable : (stryCov_9fa48("13080", "13081", "13082"), !this.defaultStartAvailable)) return Promise.resolve();
      this.defaultStartAvailable = stryMutAct_9fa48("13083") ? true : (stryCov_9fa48("13083"), false);
      return this.play();
    }
  }
  pause() {
    if (stryMutAct_9fa48("13084")) {
      {}
    } else {
      stryCov_9fa48("13084");
      this.defaultStartAvailable = stryMutAct_9fa48("13085") ? true : (stryCov_9fa48("13085"), false);
      if (stryMutAct_9fa48("13086")) {
        ;
      } else {
        stryCov_9fa48("13086");
        this.silence();
      }
      this.publish(stryMutAct_9fa48("13088") ? {} : (stryCov_9fa48("13088"), {
        kind: stryMutAct_9fa48("13089") ? "" : (stryCov_9fa48("13089"), 'off')
      }), stryMutAct_9fa48("13090") ? true : (stryCov_9fa48("13090"), false));
    }
  }
  private async start() {
    if (stryMutAct_9fa48("13091")) {
      {}
    } else {
      stryCov_9fa48("13091");
      const revision = this.revision;
      try {
        if (stryMutAct_9fa48("13092")) {
          {}
        } else {
          stryCov_9fa48("13092");
          if (stryMutAct_9fa48("13095") ? false : stryMutAct_9fa48("13094") ? true : stryMutAct_9fa48("13093") ? this.context : (stryCov_9fa48("13093", "13094", "13095"), !this.context)) {
            if (stryMutAct_9fa48("13096")) {
              {}
            } else {
              stryCov_9fa48("13096");
              this.context = new AudioContext();
              this.media = new Audio();
              this.media.preload = stryMutAct_9fa48("13097") ? "" : (stryCov_9fa48("13097"), 'none');
              this.media.loop = stryMutAct_9fa48("13098") ? false : (stryCov_9fa48("13098"), true);
              this.source = this.context.createMediaElementSource(this.media);
              this.gain = this.context.createGain();
              this.gain.gain.value = 0;
              if (stryMutAct_9fa48("13099")) {
                ;
              } else {
                stryCov_9fa48("13099");
                this.source.connect(this.gain).connect(this.context.destination);
              }
              const media = this.media;
              media.onerror = () => {
                if (stryMutAct_9fa48("13100")) {
                  {}
                } else {
                  stryCov_9fa48("13100");
                  if (stryMutAct_9fa48("13103") ? this.media === media : stryMutAct_9fa48("13102") ? false : stryMutAct_9fa48("13101") ? true : (stryCov_9fa48("13101", "13102", "13103"), this.media !== media)) return;
                  if (stryMutAct_9fa48("13104")) {
                    ;
                  } else {
                    stryCov_9fa48("13104");
                    this.silence();
                  }
                  this.publish(stryMutAct_9fa48("13106") ? {} : (stryCov_9fa48("13106"), {
                    kind: stryMutAct_9fa48("13107") ? "" : (stryCov_9fa48("13107"), 'error'),
                    message: stryMutAct_9fa48("13108") ? "" : (stryCov_9fa48("13108"), 'Music could not load. Try playing it again.')
                  }), stryMutAct_9fa48("13109") ? true : (stryCov_9fa48("13109"), false));
                }
              };
            }
          }
          const context = this.context;
          const media = this.media;
          const gain = this.gain;
          if (stryMutAct_9fa48("13112") ? !media && !gain : stryMutAct_9fa48("13111") ? false : stryMutAct_9fa48("13110") ? true : (stryCov_9fa48("13110", "13111", "13112"), (stryMutAct_9fa48("13113") ? media : (stryCov_9fa48("13113"), !media)) || (stryMutAct_9fa48("13114") ? gain : (stryCov_9fa48("13114"), !gain)))) return;
          await context.resume();
          if (stryMutAct_9fa48("13117") ? revision !== this.revision && !this.snapshot.requested : stryMutAct_9fa48("13116") ? false : stryMutAct_9fa48("13115") ? true : (stryCov_9fa48("13115", "13116", "13117"), (stryMutAct_9fa48("13119") ? revision === this.revision : stryMutAct_9fa48("13118") ? false : (stryCov_9fa48("13118", "13119"), revision !== this.revision)) || (stryMutAct_9fa48("13120") ? this.snapshot.requested : (stryCov_9fa48("13120"), !this.snapshot.requested)))) return;
          const reason = this.reason();
          if (stryMutAct_9fa48("13122") ? false : stryMutAct_9fa48("13121") ? true : (stryCov_9fa48("13121", "13122"), reason)) {
            if (stryMutAct_9fa48("13123")) {
              {}
            } else {
              stryCov_9fa48("13123");
              this.publish(stryMutAct_9fa48("13125") ? {} : (stryCov_9fa48("13125"), {
                kind: stryMutAct_9fa48("13126") ? "" : (stryCov_9fa48("13126"), 'paused'),
                reason
              }));
              return;
            }
          }
          if (stryMutAct_9fa48("13129") ? false : stryMutAct_9fa48("13128") ? true : stryMutAct_9fa48("13127") ? media.getAttribute('src') : (stryCov_9fa48("13127", "13128", "13129"), !media.getAttribute(stryMutAct_9fa48("13130") ? "" : (stryCov_9fa48("13130"), 'src')))) {
            if (stryMutAct_9fa48("13131")) {
              {}
            } else {
              stryCov_9fa48("13131");
              const extension = media.canPlayType(stryMutAct_9fa48("13132") ? "" : (stryCov_9fa48("13132"), 'audio/ogg; codecs="vorbis"')) ? stryMutAct_9fa48("13133") ? "" : (stryCov_9fa48("13133"), 'ogg') : stryMutAct_9fa48("13134") ? "" : (stryCov_9fa48("13134"), 'mp3');
              media.src = new URL(stryMutAct_9fa48("13135") ? `` : (stryCov_9fa48("13135"), `music/lofi-again.${extension}`), document.baseURI).href;
            }
          }
          if (stryMutAct_9fa48("13137") ? false : stryMutAct_9fa48("13136") ? true : (stryCov_9fa48("13136", "13137"), media.error)) if (stryMutAct_9fa48("13138")) {
            ;
          } else {
            stryCov_9fa48("13138");
            media.load();
          }
          await media.play();
          if (stryMutAct_9fa48("13141") ? (revision !== this.revision || !this.snapshot.requested) && this.reason() : stryMutAct_9fa48("13140") ? false : stryMutAct_9fa48("13139") ? true : (stryCov_9fa48("13139", "13140", "13141"), (stryMutAct_9fa48("13143") ? revision !== this.revision && !this.snapshot.requested : stryMutAct_9fa48("13142") ? false : (stryCov_9fa48("13142", "13143"), (stryMutAct_9fa48("13145") ? revision === this.revision : stryMutAct_9fa48("13144") ? false : (stryCov_9fa48("13144", "13145"), revision !== this.revision)) || (stryMutAct_9fa48("13146") ? this.snapshot.requested : (stryCov_9fa48("13146"), !this.snapshot.requested)))) || this.reason())) {
            if (stryMutAct_9fa48("13147")) {
              {}
            } else {
              stryCov_9fa48("13147");
              if (stryMutAct_9fa48("13150") ? (this.media !== media || !this.snapshot.requested) && this.reason() : stryMutAct_9fa48("13149") ? false : stryMutAct_9fa48("13148") ? true : (stryCov_9fa48("13148", "13149", "13150"), (stryMutAct_9fa48("13152") ? this.media !== media && !this.snapshot.requested : stryMutAct_9fa48("13151") ? false : (stryCov_9fa48("13151", "13152"), (stryMutAct_9fa48("13154") ? this.media === media : stryMutAct_9fa48("13153") ? false : (stryCov_9fa48("13153", "13154"), this.media !== media)) || (stryMutAct_9fa48("13155") ? this.snapshot.requested : (stryCov_9fa48("13155"), !this.snapshot.requested)))) || this.reason())) if (stryMutAct_9fa48("13156")) {
                ;
              } else {
                stryCov_9fa48("13156");
                media.pause();
              }
              return;
            }
          }
          if (stryMutAct_9fa48("13157")) {
            ;
          } else {
            stryCov_9fa48("13157");
            gain.gain.cancelScheduledValues(context.currentTime);
          }
          if (stryMutAct_9fa48("13158")) {
            ;
          } else {
            stryCov_9fa48("13158");
            gain.gain.setValueAtTime(0, context.currentTime);
          }
          gain.gain.linearRampToValueAtTime(this.snapshot.volume, stryMutAct_9fa48("13160") ? context.currentTime - 3 : (stryCov_9fa48("13160"), context.currentTime + 3));
          this.publish(stryMutAct_9fa48("13162") ? {} : (stryCov_9fa48("13162"), {
            kind: stryMutAct_9fa48("13163") ? "" : (stryCov_9fa48("13163"), 'playing')
          }));
        }
      } catch {
        if (stryMutAct_9fa48("13164")) {
          {}
        } else {
          stryCov_9fa48("13164");
          if (stryMutAct_9fa48("13167") ? revision === this.revision : stryMutAct_9fa48("13166") ? false : stryMutAct_9fa48("13165") ? true : (stryCov_9fa48("13165", "13166", "13167"), revision !== this.revision)) return;
          if (stryMutAct_9fa48("13168")) {
            ;
          } else {
            stryCov_9fa48("13168");
            this.silence();
          }
          this.publish(stryMutAct_9fa48("13170") ? {} : (stryCov_9fa48("13170"), {
            kind: stryMutAct_9fa48("13171") ? "" : (stryCov_9fa48("13171"), 'error'),
            message: stryMutAct_9fa48("13172") ? "" : (stryCov_9fa48("13172"), 'Music could not start. Press Play to try again.')
          }), stryMutAct_9fa48("13173") ? true : (stryCov_9fa48("13173"), false));
        }
      }
    }
  }
  close() {
    if (stryMutAct_9fa48("13174")) {
      {}
    } else {
      stryCov_9fa48("13174");
      if (stryMutAct_9fa48("13175")) {
        ;
      } else {
        stryCov_9fa48("13175");
        this.pause();
      }
      if (stryMutAct_9fa48("13177") ? false : stryMutAct_9fa48("13176") ? true : (stryCov_9fa48("13176", "13177"), this.media)) {
        if (stryMutAct_9fa48("13178")) {
          {}
        } else {
          stryCov_9fa48("13178");
          this.media.onerror = null;
          this.media.removeAttribute(stryMutAct_9fa48("13180") ? "" : (stryCov_9fa48("13180"), 'src'));
          if (stryMutAct_9fa48("13181")) {
            ;
          } else {
            stryCov_9fa48("13181");
            this.media.load();
          }
        }
      }
      stryMutAct_9fa48("13182") ? this.source.disconnect() : (stryCov_9fa48("13182"), this.source?.disconnect());
      stryMutAct_9fa48("13183") ? this.gain.disconnect() : (stryCov_9fa48("13183"), this.gain?.disconnect());
      void (stryMutAct_9fa48("13184") ? this.context.close() : (stryCov_9fa48("13184"), this.context?.close()));
      this.context = null;
      this.media = null;
      this.source = null;
      this.gain = null;
    }
  }
}
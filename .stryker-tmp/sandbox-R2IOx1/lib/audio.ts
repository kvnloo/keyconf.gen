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
import { samplePreview } from './audio-preview';
import { samplesFor, soundPacks, type KeyPhase, type SoundPack } from './sound-packs';
export type SoundSettings = {
  enabled: boolean;
  character: 'linear' | 'tactile' | 'clicky';
  volume: number;
  damping: number;
  material: string;
  source: {
    kind: 'recorded';
    id: string;
  } | {
    kind: 'synthesized';
  };
};
export class KeyboardAudio {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private buffers = new Map<string, Map<string, AudioBuffer>>();
  private pending = new Map<string, Promise<void>>();
  private cursor = new Map<string, number>();
  private voices = new Set<AudioScheduledSourceNode>();
  private abort = new AbortController();
  private getContext() {
    if (stryMutAct_9fa48("5641")) {
      {}
    } else {
      stryCov_9fa48("5641");
      if (stryMutAct_9fa48("5644") ? false : stryMutAct_9fa48("5643") ? true : stryMutAct_9fa48("5642") ? this.context : (stryCov_9fa48("5642", "5643", "5644"), !this.context)) {
        if (stryMutAct_9fa48("5645")) {
          {}
        } else {
          stryCov_9fa48("5645");
          this.context = new AudioContext(stryMutAct_9fa48("5646") ? {} : (stryCov_9fa48("5646"), {
            latencyHint: stryMutAct_9fa48("5647") ? "" : (stryCov_9fa48("5647"), 'interactive')
          }));
          this.master = this.context.createGain();
          this.master.gain.value = 0;
          if (stryMutAct_9fa48("5648")) {
            ;
          } else {
            stryCov_9fa48("5648");
            this.master.connect(this.context.destination);
          }
        }
      }
      return this.context;
    }
  }
  async unlock() {
    if (stryMutAct_9fa48("5649")) {
      {}
    } else {
      stryCov_9fa48("5649");
      const ctx = this.getContext();
      if (stryMutAct_9fa48("5652") ? ctx.state !== 'suspended' : stryMutAct_9fa48("5651") ? false : stryMutAct_9fa48("5650") ? true : (stryCov_9fa48("5650", "5651", "5652"), ctx.state === (stryMutAct_9fa48("5653") ? "" : (stryCov_9fa48("5653"), 'suspended')))) await ctx.resume();
    }
  }
  setLevel(enabled: boolean, volume: number) {
    if (stryMutAct_9fa48("5654")) {
      {}
    } else {
      stryCov_9fa48("5654");
      if (stryMutAct_9fa48("5657") ? !this.context && !this.master : stryMutAct_9fa48("5656") ? false : stryMutAct_9fa48("5655") ? true : (stryCov_9fa48("5655", "5656", "5657"), (stryMutAct_9fa48("5658") ? this.context : (stryCov_9fa48("5658"), !this.context)) || (stryMutAct_9fa48("5659") ? this.master : (stryCov_9fa48("5659"), !this.master)))) return;
      const time = this.context.currentTime;
      const gain = this.master.gain;
      const current = gain.value;
      if (stryMutAct_9fa48("5660")) {
        ;
      } else {
        stryCov_9fa48("5660");
        gain.cancelScheduledValues(time);
      }
      if (stryMutAct_9fa48("5661")) {
        ;
      } else {
        stryCov_9fa48("5661");
        gain.setValueAtTime(current, time);
      }
      gain.linearRampToValueAtTime(enabled ? volume : 0, stryMutAct_9fa48("5663") ? time - 0.016 : (stryCov_9fa48("5663"), time + 0.016));
    }
  }
  preview(pack: SoundPack) {
    if (stryMutAct_9fa48("5664")) {
      {}
    } else {
      stryCov_9fa48("5664");
      const file = pack.groups.down.default[0];
      const buffer = stryMutAct_9fa48("5665") ? this.buffers.get(pack.id).get(file) : (stryCov_9fa48("5665"), this.buffers.get(pack.id)?.get(file));
      return buffer ? samplePreview(buffer) : null;
    }
  }
  prepare(pack: SoundPack) {
    if (stryMutAct_9fa48("5666")) {
      {}
    } else {
      stryCov_9fa48("5666");
      if (stryMutAct_9fa48("5668") ? false : stryMutAct_9fa48("5667") ? true : (stryCov_9fa48("5667", "5668"), this.buffers.has(pack.id))) return Promise.resolve();
      const pending = this.pending.get(pack.id);
      if (stryMutAct_9fa48("5670") ? false : stryMutAct_9fa48("5669") ? true : (stryCov_9fa48("5669", "5670"), pending)) return pending;
      const ctx = this.getContext();
      const files = new Set((stryMutAct_9fa48("5671") ? [] : (stryCov_9fa48("5671"), [...Object.values(pack.groups.down), ...Object.values(pack.groups.up)])).flatMap(stryMutAct_9fa48("5672") ? () => undefined : (stryCov_9fa48("5672"), group => stryMutAct_9fa48("5673") ? group && [] : (stryCov_9fa48("5673"), group ?? (stryMutAct_9fa48("5674") ? ["Stryker was here"] : (stryCov_9fa48("5674"), []))))));
      const loading = Promise.all(Array.from(files, async file => {
        if (stryMutAct_9fa48("5675")) {
          {}
        } else {
          stryCov_9fa48("5675");
          const url = new URL(stryMutAct_9fa48("5676") ? `` : (stryCov_9fa48("5676"), `sounds/${pack.id}/${file}`), document.baseURI);
          const response = await fetch(url, stryMutAct_9fa48("5677") ? {} : (stryCov_9fa48("5677"), {
            signal: this.abort.signal
          }));
          if (stryMutAct_9fa48("5680") ? false : stryMutAct_9fa48("5679") ? true : stryMutAct_9fa48("5678") ? response.ok : (stryCov_9fa48("5678", "5679", "5680"), !response.ok)) throw new Error(stryMutAct_9fa48("5682") ? "" : (stryCov_9fa48("5682"), 'Recording could not load. Try again.'));
          const buffer = await ctx.decodeAudioData(await response.arrayBuffer());
          const entry: [string, AudioBuffer] = stryMutAct_9fa48("5683") ? [] : (stryCov_9fa48("5683"), [file, buffer]);
          return entry;
        }
      })).then(entries => {
        if (stryMutAct_9fa48("5684")) {
          {}
        } else {
          stryCov_9fa48("5684");
          if (stryMutAct_9fa48("5687") ? this.context === ctx || ctx.state !== 'closed' : stryMutAct_9fa48("5686") ? false : stryMutAct_9fa48("5685") ? true : (stryCov_9fa48("5685", "5686", "5687"), (stryMutAct_9fa48("5689") ? this.context !== ctx : stryMutAct_9fa48("5688") ? true : (stryCov_9fa48("5688", "5689"), this.context === ctx)) && (stryMutAct_9fa48("5691") ? ctx.state === 'closed' : stryMutAct_9fa48("5690") ? true : (stryCov_9fa48("5690", "5691"), ctx.state !== (stryMutAct_9fa48("5692") ? "" : (stryCov_9fa48("5692"), 'closed')))))) if (stryMutAct_9fa48("5693")) {
            ;
          } else {
            stryCov_9fa48("5693");
            this.buffers.set(pack.id, new Map(entries));
          }
        }
      }).finally(stryMutAct_9fa48("5694") ? () => undefined : (stryCov_9fa48("5694"), () => this.pending.delete(pack.id)));
      if (stryMutAct_9fa48("5695")) {
        ;
      } else {
        stryCov_9fa48("5695");
        this.pending.set(pack.id, loading);
      }
      return loading;
    }
  }
  private track(source: AudioScheduledSourceNode, dispose: () => void) {
    if (stryMutAct_9fa48("5696")) {
      {}
    } else {
      stryCov_9fa48("5696");
      if (stryMutAct_9fa48("5697")) {
        ;
      } else {
        stryCov_9fa48("5697");
        this.voices.add(source);
      }
      source.onended = () => {
        if (stryMutAct_9fa48("5698")) {
          {}
        } else {
          stryCov_9fa48("5698");
          if (stryMutAct_9fa48("5699")) {
            ;
          } else {
            stryCov_9fa48("5699");
            this.voices.delete(source);
          }
          if (stryMutAct_9fa48("5700")) {
            ;
          } else {
            stryCov_9fa48("5700");
            dispose();
          }
        }
      };
    }
  }
  stop() {
    if (stryMutAct_9fa48("5701")) {
      {}
    } else {
      stryCov_9fa48("5701");
      for (const voice of this.voices) if (stryMutAct_9fa48("5702")) {
        ;
      } else {
        stryCov_9fa48("5702");
        voice.stop();
      }
      if (stryMutAct_9fa48("5703")) {
        ;
      } else {
        stryCov_9fa48("5703");
        this.voices.clear();
      }
    }
  }
  play(code: string, s: SoundSettings, phase: KeyPhase = stryMutAct_9fa48("5704") ? "" : (stryCov_9fa48("5704"), 'down'), at?: number) {
    if (stryMutAct_9fa48("5705")) {
      {}
    } else {
      stryCov_9fa48("5705");
      if (stryMutAct_9fa48("5708") ? false : stryMutAct_9fa48("5707") ? true : stryMutAct_9fa48("5706") ? s.enabled : (stryCov_9fa48("5706", "5707", "5708"), !s.enabled)) return;
      const ctx = this.getContext();
      if (stryMutAct_9fa48("5711") ? ctx.state === 'running' : stryMutAct_9fa48("5710") ? false : stryMutAct_9fa48("5709") ? true : (stryCov_9fa48("5709", "5710", "5711"), ctx.state !== (stryMutAct_9fa48("5712") ? "" : (stryCov_9fa48("5712"), 'running')))) return;
      const t = stryMutAct_9fa48("5713") ? Math.min(ctx.currentTime, at ?? ctx.currentTime) : (stryCov_9fa48("5713"), Math.max(ctx.currentTime, stryMutAct_9fa48("5714") ? at && ctx.currentTime : (stryCov_9fa48("5714"), at ?? ctx.currentTime)));
      const output = stryMutAct_9fa48("5715") ? this.master && ctx.destination : (stryCov_9fa48("5715"), this.master ?? ctx.destination);
      if (stryMutAct_9fa48("5718") ? s.source.kind !== 'recorded' : stryMutAct_9fa48("5717") ? false : stryMutAct_9fa48("5716") ? true : (stryCov_9fa48("5716", "5717", "5718"), s.source.kind === (stryMutAct_9fa48("5719") ? "" : (stryCov_9fa48("5719"), 'recorded')))) {
        if (stryMutAct_9fa48("5720")) {
          {}
        } else {
          stryCov_9fa48("5720");
          const id = s.source.id;
          const pack = soundPacks.find(stryMutAct_9fa48("5721") ? () => undefined : (stryCov_9fa48("5721"), pack => stryMutAct_9fa48("5724") ? pack.id !== id : stryMutAct_9fa48("5723") ? false : stryMutAct_9fa48("5722") ? true : (stryCov_9fa48("5722", "5723", "5724"), pack.id === id)));
          if (stryMutAct_9fa48("5727") ? false : stryMutAct_9fa48("5726") ? true : stryMutAct_9fa48("5725") ? pack : (stryCov_9fa48("5725", "5726", "5727"), !pack)) return;
          const files = samplesFor(pack, code, phase);
          const group = stryMutAct_9fa48("5728") ? `` : (stryCov_9fa48("5728"), `${pack.id}/${phase}/${files.join(stryMutAct_9fa48("5729") ? "" : (stryCov_9fa48("5729"), ','))}`);
          const cursor = stryMutAct_9fa48("5730") ? this.cursor.get(group) && 0 : (stryCov_9fa48("5730"), this.cursor.get(group) ?? 0);
          const file = files[stryMutAct_9fa48("5731") ? cursor * files.length : (stryCov_9fa48("5731"), cursor % files.length)];
          const buffer = stryMutAct_9fa48("5732") ? this.buffers.get(pack.id).get(file) : (stryCov_9fa48("5732"), this.buffers.get(pack.id)?.get(file));
          if (stryMutAct_9fa48("5735") ? false : stryMutAct_9fa48("5734") ? true : stryMutAct_9fa48("5733") ? buffer : (stryCov_9fa48("5733", "5734", "5735"), !buffer)) return;
          this.cursor.set(group, stryMutAct_9fa48("5737") ? cursor - 1 : (stryCov_9fa48("5737"), cursor + 1));
          const source = ctx.createBufferSource();
          source.buffer = buffer;
          if (stryMutAct_9fa48("5738")) {
            ;
          } else {
            stryCov_9fa48("5738");
            source.connect(output);
          }
          this.track(source, () => {
            if (stryMutAct_9fa48("5740")) {
              {}
            } else {
              stryCov_9fa48("5740");
              if (stryMutAct_9fa48("5741")) {
                ;
              } else {
                stryCov_9fa48("5741");
                source.disconnect();
              }
            }
          });
          if (stryMutAct_9fa48("5742")) {
            ;
          } else {
            stryCov_9fa48("5742");
            source.start(t);
          }
          return;
        }
      }
      if (stryMutAct_9fa48("5745") ? phase !== 'up' : stryMutAct_9fa48("5744") ? false : stryMutAct_9fa48("5743") ? true : (stryCov_9fa48("5743", "5744", "5745"), phase === (stryMutAct_9fa48("5746") ? "" : (stryCov_9fa48("5746"), 'up')))) return;
      const space = stryMutAct_9fa48("5749") ? code !== 'Space' : stryMutAct_9fa48("5748") ? false : stryMutAct_9fa48("5747") ? true : (stryCov_9fa48("5747", "5748", "5749"), code === (stryMutAct_9fa48("5750") ? "" : (stryCov_9fa48("5750"), 'Space')));
      const duration = space ? 0.19 : 0.1;
      const buffer = ctx.createBuffer(1, Math.ceil(stryMutAct_9fa48("5751") ? ctx.sampleRate / duration : (stryCov_9fa48("5751"), ctx.sampleRate * duration)), ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; stryMutAct_9fa48("5754") ? i >= data.length : stryMutAct_9fa48("5753") ? i <= data.length : stryMutAct_9fa48("5752") ? false : (stryCov_9fa48("5752", "5753", "5754"), i < data.length); stryMutAct_9fa48("5755") ? i-- : (stryCov_9fa48("5755"), i++)) data[i] = stryMutAct_9fa48("5756") ? (Math.random() * 2 - 1) / Math.exp(-i / (ctx.sampleRate * (0.007 + (1 - s.damping) * 0.012))) : (stryCov_9fa48("5756"), (stryMutAct_9fa48("5757") ? Math.random() * 2 + 1 : (stryCov_9fa48("5757"), (stryMutAct_9fa48("5758") ? Math.random() / 2 : (stryCov_9fa48("5758"), Math.random() * 2)) - 1)) * Math.exp(stryMutAct_9fa48("5759") ? -i * (ctx.sampleRate * (0.007 + (1 - s.damping) * 0.012)) : (stryCov_9fa48("5759"), (stryMutAct_9fa48("5760") ? +i : (stryCov_9fa48("5760"), -i)) / (stryMutAct_9fa48("5761") ? ctx.sampleRate / (0.007 + (1 - s.damping) * 0.012) : (stryCov_9fa48("5761"), ctx.sampleRate * (stryMutAct_9fa48("5762") ? 0.007 - (1 - s.damping) * 0.012 : (stryCov_9fa48("5762"), 0.007 + (stryMutAct_9fa48("5763") ? (1 - s.damping) / 0.012 : (stryCov_9fa48("5763"), (stryMutAct_9fa48("5764") ? 1 + s.damping : (stryCov_9fa48("5764"), 1 - s.damping)) * 0.012)))))))));
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = stryMutAct_9fa48("5765") ? "" : (stryCov_9fa48("5765"), 'bandpass');
      filter.frequency.value = space ? 450 : (stryMutAct_9fa48("5768") ? s.character !== 'clicky' : stryMutAct_9fa48("5767") ? false : stryMutAct_9fa48("5766") ? true : (stryCov_9fa48("5766", "5767", "5768"), s.character === (stryMutAct_9fa48("5769") ? "" : (stryCov_9fa48("5769"), 'clicky')))) ? 2600 : (stryMutAct_9fa48("5772") ? s.character !== 'tactile' : stryMutAct_9fa48("5771") ? false : stryMutAct_9fa48("5770") ? true : (stryCov_9fa48("5770", "5771", "5772"), s.character === (stryMutAct_9fa48("5773") ? "" : (stryCov_9fa48("5773"), 'tactile')))) ? 1300 : 750;
      filter.Q.value = 0.6;
      const gain = ctx.createGain();
      if (stryMutAct_9fa48("5774")) {
        ;
      } else {
        stryCov_9fa48("5774");
        gain.gain.setValueAtTime(0.38, t);
      }
      gain.gain.exponentialRampToValueAtTime(0.001, stryMutAct_9fa48("5776") ? t - duration : (stryCov_9fa48("5776"), t + duration));
      if (stryMutAct_9fa48("5777")) {
        ;
      } else {
        stryCov_9fa48("5777");
        noise.connect(filter).connect(gain).connect(output);
      }
      if (stryMutAct_9fa48("5778")) {
        ;
      } else {
        stryCov_9fa48("5778");
        noise.start(t);
      }
      noise.stop(stryMutAct_9fa48("5780") ? t - duration : (stryCov_9fa48("5780"), t + duration));
      const body = ctx.createOscillator();
      body.type = stryMutAct_9fa48("5781") ? "" : (stryCov_9fa48("5781"), 'sine');
      body.frequency.setValueAtTime(stryMutAct_9fa48("5783") ? (space ? 180 : 320) / (s.material === 'Brass' ? 1.3 : 1) : (stryCov_9fa48("5783"), (space ? 180 : 320) * ((stryMutAct_9fa48("5786") ? s.material !== 'Brass' : stryMutAct_9fa48("5785") ? false : stryMutAct_9fa48("5784") ? true : (stryCov_9fa48("5784", "5785", "5786"), s.material === (stryMutAct_9fa48("5787") ? "" : (stryCov_9fa48("5787"), 'Brass')))) ? 1.3 : 1)), t);
      body.frequency.exponentialRampToValueAtTime(space ? 65 : 115, stryMutAct_9fa48("5789") ? t - 0.04 : (stryCov_9fa48("5789"), t + 0.04));
      const bg = ctx.createGain();
      if (stryMutAct_9fa48("5790")) {
        ;
      } else {
        stryCov_9fa48("5790");
        bg.gain.setValueAtTime(0.12, t);
      }
      bg.gain.exponentialRampToValueAtTime(0.001, stryMutAct_9fa48("5792") ? t - 0.08 : (stryCov_9fa48("5792"), t + 0.08));
      if (stryMutAct_9fa48("5793")) {
        ;
      } else {
        stryCov_9fa48("5793");
        body.connect(bg).connect(output);
      }
      if (stryMutAct_9fa48("5794")) {
        ;
      } else {
        stryCov_9fa48("5794");
        body.start(t);
      }
      body.stop(stryMutAct_9fa48("5796") ? t - 0.09 : (stryCov_9fa48("5796"), t + 0.09));
      this.track(noise, () => {
        if (stryMutAct_9fa48("5798")) {
          {}
        } else {
          stryCov_9fa48("5798");
          if (stryMutAct_9fa48("5799")) {
            ;
          } else {
            stryCov_9fa48("5799");
            noise.disconnect();
          }
          if (stryMutAct_9fa48("5800")) {
            ;
          } else {
            stryCov_9fa48("5800");
            filter.disconnect();
          }
          if (stryMutAct_9fa48("5801")) {
            ;
          } else {
            stryCov_9fa48("5801");
            gain.disconnect();
          }
        }
      });
      this.track(body, () => {
        if (stryMutAct_9fa48("5803")) {
          {}
        } else {
          stryCov_9fa48("5803");
          if (stryMutAct_9fa48("5804")) {
            ;
          } else {
            stryCov_9fa48("5804");
            body.disconnect();
          }
          if (stryMutAct_9fa48("5805")) {
            ;
          } else {
            stryCov_9fa48("5805");
            bg.disconnect();
          }
        }
      });
    }
  }
  now() {
    if (stryMutAct_9fa48("5806")) {
      {}
    } else {
      stryCov_9fa48("5806");
      return this.getContext().currentTime;
    }
  }
  close() {
    if (stryMutAct_9fa48("5807")) {
      {}
    } else {
      stryCov_9fa48("5807");
      if (stryMutAct_9fa48("5808")) {
        ;
      } else {
        stryCov_9fa48("5808");
        this.abort.abort();
      }
      if (stryMutAct_9fa48("5809")) {
        ;
      } else {
        stryCov_9fa48("5809");
        this.stop();
      }
      void (stryMutAct_9fa48("5810") ? this.context.close() : (stryCov_9fa48("5810"), this.context?.close()));
      this.context = null;
      this.master = null;
      if (stryMutAct_9fa48("5811")) {
        ;
      } else {
        stryCov_9fa48("5811");
        this.buffers.clear();
      }
    }
  }
}
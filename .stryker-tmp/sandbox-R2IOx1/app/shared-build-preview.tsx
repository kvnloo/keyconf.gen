// @ts-nocheck
'use client';

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
import { artisanPreviewNote } from '../lib/artisan-preview';
import { unmountedPreviewNote } from '../lib/build-accessories';
import AccessoryFitNotes from './accessory-fit-notes';
import { accessoryHost } from '../lib/accessory-hosts.ts';
import { isQ1MaxAssembly } from '../lib/keyboard-variant';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Layers, Play, RotateCcw } from 'lucide-react';
import type { PublicPublication } from '../db/publications';
import type { ProposalPreview } from '../lib/proposal';
import type { Build } from '../lib/build';
import PreviewAdjustments from './preview-adjustments';
import { compareBuilds } from '../lib/build-comparison';
import { catalog, categories, checkBuild } from '../lib/catalog';
import { resolveAccessoryProducts } from '../lib/imported-accessories';
import { assessAccessories } from '../lib/build-accessories';
import { KeyboardAudio, type SoundSettings } from '../lib/audio';
import { soundPacks } from '../lib/sound-packs';
import KeyboardScene, { type SceneOptions } from './keyboard-scene';
import VolumeDial from './volume-dial';
import BuildFeedback from './build-feedback';
import BuildComparison from './build-comparison';
import './shared-build-preview.css';
export default function SharedBuildPreview({
  build: original,
  onCustomize,
  record,
  creatorDetails
}: {
  build: Build;
  onCustomize: (build: Build) => void;
  record?: {
    kind: 'publication';
    value: PublicPublication;
  } | {
    kind: 'proposal';
    value: ProposalPreview;
  };
  creatorDetails?: ReactNode;
}) {
  if (stryMutAct_9fa48("3933")) {
    {}
  } else {
    stryCov_9fa48("3933");
    const frozen = stryMutAct_9fa48("3934") ? record.value : (stryCov_9fa48("3934"), record?.value);
    const [build, setBuild] = useState(original);
    const changed = stryMutAct_9fa48("3938") ? compareBuilds(original, build).length <= 0 : stryMutAct_9fa48("3937") ? compareBuilds(original, build).length >= 0 : stryMutAct_9fa48("3936") ? false : stryMutAct_9fa48("3935") ? true : (stryCov_9fa48("3935", "3936", "3937", "3938"), compareBuilds(original, build).length > 0);
    const snapshot = changed ? undefined : frozen;
    const [exploded, setExploded] = useState(stryMutAct_9fa48("3939") ? true : (stryCov_9fa48("3939"), false));
    const [view, setView] = useState(stryMutAct_9fa48("3940") ? "" : (stryCov_9fa48("3940"), 'perspective'));
    const [enabled, setEnabled] = useState(stryMutAct_9fa48("3941") ? true : (stryCov_9fa48("3941"), false));
    const [volume, setVolume] = useState(build.audio.volume);
    const [loaded, setLoaded] = useState<{
      attempt: number;
      source: string;
      state: 'ready' | 'error';
    } | null>(null);
    const [attempt, setAttempt] = useState(0);
    const source = build.audio.source;
    const load = (stryMutAct_9fa48("3944") ? loaded?.attempt === attempt || loaded.source === source : stryMutAct_9fa48("3943") ? false : stryMutAct_9fa48("3942") ? true : (stryCov_9fa48("3942", "3943", "3944"), (stryMutAct_9fa48("3946") ? loaded?.attempt !== attempt : stryMutAct_9fa48("3945") ? true : (stryCov_9fa48("3945", "3946"), (stryMutAct_9fa48("3947") ? loaded.attempt : (stryCov_9fa48("3947"), loaded?.attempt)) === attempt)) && (stryMutAct_9fa48("3949") ? loaded.source !== source : stryMutAct_9fa48("3948") ? true : (stryCov_9fa48("3948", "3949"), loaded.source === source)))) ? loaded.state : stryMutAct_9fa48("3950") ? "" : (stryCov_9fa48("3950"), 'loading');
    const [notice, setNotice] = useState(stryMutAct_9fa48("3951") ? "Stryker was here!" : (stryCov_9fa48("3951"), ''));
    const audio = useRef<KeyboardAudio | null>(null);
    const revision = useRef(stryMutAct_9fa48("3952") ? {} : (stryCov_9fa48("3952"), {
      value: 0
    }));
    const currentVolume = useRef(volume);
    const pack = soundPacks.find(stryMutAct_9fa48("3953") ? () => undefined : (stryCov_9fa48("3953"), item => stryMutAct_9fa48("3956") ? item.id !== build.audio.source : stryMutAct_9fa48("3955") ? false : stryMutAct_9fa48("3954") ? true : (stryCov_9fa48("3954", "3955", "3956"), item.id === build.audio.source)));
    const parts = useMemo(stryMutAct_9fa48("3957") ? () => undefined : (stryCov_9fa48("3957"), () => stryMutAct_9fa48("3958") ? snapshot?.evidence.components && [...catalog, ...build.customParts] : (stryCov_9fa48("3958"), (stryMutAct_9fa48("3959") ? snapshot.evidence.components : (stryCov_9fa48("3959"), snapshot?.evidence.components)) ?? (stryMutAct_9fa48("3960") ? [] : (stryCov_9fa48("3960"), [...catalog, ...build.customParts])))), stryMutAct_9fa48("3961") ? [] : (stryCov_9fa48("3961"), [build.customParts, snapshot]));
    const checks = useMemo(stryMutAct_9fa48("3962") ? () => undefined : (stryCov_9fa48("3962"), () => stryMutAct_9fa48("3963") ? snapshot?.evidence.compatibility && checkBuild(build.selection, parts, build.layout) : (stryCov_9fa48("3963"), (stryMutAct_9fa48("3964") ? snapshot.evidence.compatibility : (stryCov_9fa48("3964"), snapshot?.evidence.compatibility)) ?? checkBuild(build.selection, parts, build.layout))), stryMutAct_9fa48("3965") ? [] : (stryCov_9fa48("3965"), [build, parts, snapshot]));
    const accessoryProducts = stryMutAct_9fa48("3966") ? snapshot?.evidence.accessoryReferences && resolveAccessoryProducts(build.customAccessories) : (stryCov_9fa48("3966"), (stryMutAct_9fa48("3967") ? snapshot.evidence.accessoryReferences : (stryCov_9fa48("3967"), snapshot?.evidence.accessoryReferences)) ?? resolveAccessoryProducts(build.customAccessories));
    const accessoryChecks = stryMutAct_9fa48("3968") ? snapshot?.evidence.accessoryCompatibility && assessAccessories(build.accessories, accessoryHost(build), accessoryProducts) : (stryCov_9fa48("3968"), (stryMutAct_9fa48("3969") ? snapshot.evidence.accessoryCompatibility : (stryCov_9fa48("3969"), snapshot?.evidence.accessoryCompatibility)) ?? assessAccessories(build.accessories, accessoryHost(build), accessoryProducts));
    const sound: SoundSettings = stryMutAct_9fa48("3970") ? {} : (stryCov_9fa48("3970"), {
      ...build.audio,
      enabled,
      volume,
      material: build.finish,
      source: pack ? stryMutAct_9fa48("3971") ? {} : (stryCov_9fa48("3971"), {
        kind: stryMutAct_9fa48("3972") ? "" : (stryCov_9fa48("3972"), 'recorded'),
        id: pack.id
      }) : stryMutAct_9fa48("3973") ? {} : (stryCov_9fa48("3973"), {
        kind: stryMutAct_9fa48("3974") ? "" : (stryCov_9fa48("3974"), 'synthesized')
      })
    });
    const options = useMemo<SceneOptions>(stryMutAct_9fa48("3975") ? () => undefined : (stryCov_9fa48("3975"), () => stryMutAct_9fa48("3976") ? {} : (stryCov_9fa48("3976"), {
      ...build.palette,
      caseColor: build.caseColor,
      finish: build.finish,
      profile: build.profile,
      device: stryMutAct_9fa48("3977") ? {} : (stryCov_9fa48("3977"), {
        kind: stryMutAct_9fa48("3978") ? "" : (stryCov_9fa48("3978"), 'keyboard'),
        layout: build.layout,
        q1Max: isQ1MaxAssembly(build)
      }),
      switchId: build.selection.switch,
      accessories: build.accessories,
      customAccessories: build.customAccessories,
      exploded,
      view,
      environment: stryMutAct_9fa48("3979") ? "" : (stryCov_9fa48("3979"), 'studio'),
      roomMotion: stryMutAct_9fa48("3980") ? true : (stryCov_9fa48("3980"), false)
    })), stryMutAct_9fa48("3981") ? [] : (stryCov_9fa48("3981"), [build, exploded, view]));
    useEffect(() => {
      if (stryMutAct_9fa48("3983")) {
        {}
      } else {
        stryCov_9fa48("3983");
        const engine = new KeyboardAudio();
        audio.current = engine;
        const actionClock = revision.current;
        void (pack ? engine.prepare(pack) : Promise.resolve()).then(() => {
          if (stryMutAct_9fa48("3984")) {
            {}
          } else {
            stryCov_9fa48("3984");
            if (stryMutAct_9fa48("3987") ? audio.current !== engine : stryMutAct_9fa48("3986") ? false : stryMutAct_9fa48("3985") ? true : (stryCov_9fa48("3985", "3986", "3987"), audio.current === engine)) setLoaded(stryMutAct_9fa48("3989") ? {} : (stryCov_9fa48("3989"), {
              attempt,
              source,
              state: stryMutAct_9fa48("3990") ? "" : (stryCov_9fa48("3990"), 'ready')
            }));
          }
        }).catch(() => {
          if (stryMutAct_9fa48("3991")) {
            {}
          } else {
            stryCov_9fa48("3991");
            if (stryMutAct_9fa48("3994") ? audio.current !== engine : stryMutAct_9fa48("3993") ? false : stryMutAct_9fa48("3992") ? true : (stryCov_9fa48("3992", "3993", "3994"), audio.current === engine)) setLoaded(stryMutAct_9fa48("3996") ? {} : (stryCov_9fa48("3996"), {
              attempt,
              source,
              state: stryMutAct_9fa48("3997") ? "" : (stryCov_9fa48("3997"), 'error')
            }));
          }
        });
        return () => {
          if (stryMutAct_9fa48("3998")) {
            {}
          } else {
            stryCov_9fa48("3998");
            stryMutAct_9fa48("3999") ? actionClock.value-- : (stryCov_9fa48("3999"), actionClock.value++);
            audio.current = null;
            if (stryMutAct_9fa48("4000")) {
              ;
            } else {
              stryCov_9fa48("4000");
              engine.close();
            }
          }
        };
      }
    }, stryMutAct_9fa48("4001") ? [] : (stryCov_9fa48("4001"), [pack, attempt, source]));
    useEffect(() => {
      if (stryMutAct_9fa48("4003")) {
        {}
      } else {
        stryCov_9fa48("4003");
        currentVolume.current = volume;
        stryMutAct_9fa48("4004") ? audio.current.setLevel(enabled, volume) : (stryCov_9fa48("4004"), audio.current?.setLevel(enabled, volume));
      }
    }, stryMutAct_9fa48("4005") ? [] : (stryCov_9fa48("4005"), [enabled, volume]));
    useEffect(() => {
      if (stryMutAct_9fa48("4007")) {
        {}
      } else {
        stryCov_9fa48("4007");
        const hide = () => {
          if (stryMutAct_9fa48("4008")) {
            {}
          } else {
            stryCov_9fa48("4008");
            if (stryMutAct_9fa48("4011") ? false : stryMutAct_9fa48("4010") ? true : stryMutAct_9fa48("4009") ? document.hidden : (stryCov_9fa48("4009", "4010", "4011"), !document.hidden)) return;
            stryMutAct_9fa48("4012") ? revision.current.value-- : (stryCov_9fa48("4012"), revision.current.value++);
            stryMutAct_9fa48("4013") ? audio.current.stop() : (stryCov_9fa48("4013"), audio.current?.stop());
            stryMutAct_9fa48("4014") ? audio.current.setLevel(false, 0) : (stryCov_9fa48("4014"), audio.current?.setLevel(stryMutAct_9fa48("4015") ? true : (stryCov_9fa48("4015"), false), 0));
            setEnabled(stryMutAct_9fa48("4017") ? true : (stryCov_9fa48("4017"), false));
          }
        };
        document.addEventListener(stryMutAct_9fa48("4019") ? "" : (stryCov_9fa48("4019"), 'visibilitychange'), hide);
        return stryMutAct_9fa48("4020") ? () => undefined : (stryCov_9fa48("4020"), () => document.removeEventListener(stryMutAct_9fa48("4021") ? "" : (stryCov_9fa48("4021"), 'visibilitychange'), hide));
      }
    }, stryMutAct_9fa48("4022") ? ["Stryker was here"] : (stryCov_9fa48("4022"), []));
    async function enable() {
      if (stryMutAct_9fa48("4023")) {
        {}
      } else {
        stryCov_9fa48("4023");
        const action = stryMutAct_9fa48("4024") ? --revision.current.value : (stryCov_9fa48("4024"), ++revision.current.value);
        const engine = audio.current;
        if (stryMutAct_9fa48("4027") ? !engine && load !== 'ready' : stryMutAct_9fa48("4026") ? false : stryMutAct_9fa48("4025") ? true : (stryCov_9fa48("4025", "4026", "4027"), (stryMutAct_9fa48("4028") ? engine : (stryCov_9fa48("4028"), !engine)) || (stryMutAct_9fa48("4030") ? load === 'ready' : stryMutAct_9fa48("4029") ? false : (stryCov_9fa48("4029", "4030"), load !== (stryMutAct_9fa48("4031") ? "" : (stryCov_9fa48("4031"), 'ready')))))) return stryMutAct_9fa48("4032") ? true : (stryCov_9fa48("4032"), false);
        setEnabled(stryMutAct_9fa48("4034") ? false : (stryCov_9fa48("4034"), true));
        setNotice(stryMutAct_9fa48("4036") ? "Stryker was here!" : (stryCov_9fa48("4036"), ''));
        try {
          if (stryMutAct_9fa48("4037")) {
            {}
          } else {
            stryCov_9fa48("4037");
            await engine.unlock();
            if (stryMutAct_9fa48("4040") ? action !== revision.current.value && engine !== audio.current : stryMutAct_9fa48("4039") ? false : stryMutAct_9fa48("4038") ? true : (stryCov_9fa48("4038", "4039", "4040"), (stryMutAct_9fa48("4042") ? action === revision.current.value : stryMutAct_9fa48("4041") ? false : (stryCov_9fa48("4041", "4042"), action !== revision.current.value)) || (stryMutAct_9fa48("4044") ? engine === audio.current : stryMutAct_9fa48("4043") ? false : (stryCov_9fa48("4043", "4044"), engine !== audio.current)))) return stryMutAct_9fa48("4045") ? true : (stryCov_9fa48("4045"), false);
            engine.setLevel(stryMutAct_9fa48("4047") ? false : (stryCov_9fa48("4047"), true), currentVolume.current);
            return stryMutAct_9fa48("4048") ? false : (stryCov_9fa48("4048"), true);
          }
        } catch {
          if (stryMutAct_9fa48("4049")) {
            {}
          } else {
            stryCov_9fa48("4049");
            if (stryMutAct_9fa48("4052") ? action !== revision.current.value : stryMutAct_9fa48("4051") ? false : stryMutAct_9fa48("4050") ? true : (stryCov_9fa48("4050", "4051", "4052"), action === revision.current.value)) {
              if (stryMutAct_9fa48("4053")) {
                {}
              } else {
                stryCov_9fa48("4053");
                setEnabled(stryMutAct_9fa48("4055") ? true : (stryCov_9fa48("4055"), false));
                setNotice(stryMutAct_9fa48("4057") ? "" : (stryCov_9fa48("4057"), 'Sound could not start. Try again.'));
              }
            }
            return stryMutAct_9fa48("4058") ? true : (stryCov_9fa48("4058"), false);
          }
        }
      }
    }
    return <main className="shared-preview">
      <header>
        <a className="brand" href={frozen ? stryMutAct_9fa48("4059") ? "" : (stryCov_9fa48("4059"), '/#home') : stryMutAct_9fa48("4060") ? "" : (stryCov_9fa48("4060"), '#home')}>
          keyconf
        </a>
        <a className="preview-back" href={frozen ? stryMutAct_9fa48("4061") ? "" : (stryCov_9fa48("4061"), '/#studio') : stryMutAct_9fa48("4062") ? "" : (stryCov_9fa48("4062"), '#studio')}>
          <ArrowLeft size={16} /> My studio
        </a>
      </header>
      <div className="preview-heading">
        <div>
          <span className="preview-eyebrow">
            {(stryMutAct_9fa48("4065") ? record?.kind !== 'proposal' : stryMutAct_9fa48("4064") ? false : stryMutAct_9fa48("4063") ? true : (stryCov_9fa48("4063", "4064", "4065"), (stryMutAct_9fa48("4066") ? record.kind : (stryCov_9fa48("4066"), record?.kind)) === (stryMutAct_9fa48("4067") ? "" : (stryCov_9fa48("4067"), 'proposal')))) ? stryMutAct_9fa48("4068") ? "" : (stryCov_9fa48("4068"), 'PROPOSED KEYBOARD') : stryMutAct_9fa48("4069") ? "" : (stryCov_9fa48("4069"), 'SHARED KEYBOARD')}
          </span>
          <h1>{build.name}</h1>
          <p>
            {frozen ? stryMutAct_9fa48("4070") ? `` : (stryCov_9fa48("4070"), `${changed ? stryMutAct_9fa48("4071") ? "" : (stryCov_9fa48("4071"), 'Your variation · Original by') : stryMutAct_9fa48("4072") ? "" : (stryCov_9fa48("4072"), 'By')} ${frozen.author.displayName} · @${frozen.author.handle}`) : stryMutAct_9fa48("4073") ? "" : (stryCov_9fa48("4073"), 'A snapshot to explore. Your saved build stays untouched.')}
          </p>
        </div>
        <button className="preview-customize" onClick={() => {
          if (stryMutAct_9fa48("4074")) {
            {}
          } else {
            stryCov_9fa48("4074");
            try {
              if (stryMutAct_9fa48("4075")) {
                {}
              } else {
                stryCov_9fa48("4075");
                if (stryMutAct_9fa48("4076")) {
                  ;
                } else {
                  stryCov_9fa48("4076");
                  onCustomize(build);
                }
              }
            } catch {
              if (stryMutAct_9fa48("4077")) {
                {}
              } else {
                stryCov_9fa48("4077");
                setNotice(stryMutAct_9fa48("4079") ? "" : (stryCov_9fa48("4079"), 'This build is too large for a link. Use Download this variation under Try changes, then open the file in your studio.'));
              }
            }
          }
        }}>
          Customize a copy <ArrowRight size={17} />
        </button>
      </div>
      <div className="preview-layout">
        <section className="preview-scene" aria-label="Shared keyboard experience">
          <KeyboardScene options={options} onPress={stryMutAct_9fa48("4080") ? () => undefined : (stryCov_9fa48("4080"), code => stryMutAct_9fa48("4081") ? audio.current.play(code, sound) : (stryCov_9fa48("4081"), audio.current?.play(code, sound)))} onRelease={stryMutAct_9fa48("4082") ? () => undefined : (stryCov_9fa48("4082"), code => stryMutAct_9fa48("4083") ? audio.current.play(code, sound, 'up') : (stryCov_9fa48("4083"), audio.current?.play(code, sound, stryMutAct_9fa48("4084") ? "" : (stryCov_9fa48("4084"), 'up'))))} />
          <div className="preview-scene-controls">
            <button aria-pressed={exploded} onClick={stryMutAct_9fa48("4085") ? () => undefined : (stryCov_9fa48("4085"), () => setExploded(stryMutAct_9fa48("4086") ? exploded : (stryCov_9fa48("4086"), !exploded)))}>
              <Layers size={16} /> Explode
            </button>
            <button onClick={stryMutAct_9fa48("4087") ? () => undefined : (stryCov_9fa48("4087"), () => setView((stryMutAct_9fa48("4090") ? view !== 'top' : stryMutAct_9fa48("4089") ? false : stryMutAct_9fa48("4088") ? true : (stryCov_9fa48("4088", "4089", "4090"), view === (stryMutAct_9fa48("4091") ? "" : (stryCov_9fa48("4091"), 'top')))) ? stryMutAct_9fa48("4092") ? "" : (stryCov_9fa48("4092"), 'perspective') : stryMutAct_9fa48("4093") ? "" : (stryCov_9fa48("4093"), 'top')))}>
              {(stryMutAct_9fa48("4096") ? view !== 'top' : stryMutAct_9fa48("4095") ? false : stryMutAct_9fa48("4094") ? true : (stryCov_9fa48("4094", "4095", "4096"), view === (stryMutAct_9fa48("4097") ? "" : (stryCov_9fa48("4097"), 'top')))) ? stryMutAct_9fa48("4098") ? "" : (stryCov_9fa48("4098"), 'Perspective') : stryMutAct_9fa48("4099") ? "" : (stryCov_9fa48("4099"), 'Top view')}
            </button>
            <button aria-label="Reset preview view" onClick={() => {
              if (stryMutAct_9fa48("4100")) {
                {}
              } else {
                stryCov_9fa48("4100");
                setExploded(stryMutAct_9fa48("4102") ? true : (stryCov_9fa48("4102"), false));
                setView((stryMutAct_9fa48("4106") ? view !== 'reset' : stryMutAct_9fa48("4105") ? false : stryMutAct_9fa48("4104") ? true : (stryCov_9fa48("4104", "4105", "4106"), view === (stryMutAct_9fa48("4107") ? "" : (stryCov_9fa48("4107"), 'reset')))) ? stryMutAct_9fa48("4108") ? "" : (stryCov_9fa48("4108"), 'perspective') : stryMutAct_9fa48("4109") ? "" : (stryCov_9fa48("4109"), 'reset'));
              }
            }}>
              <RotateCcw size={16} />
            </button>
          </div>
          <span className="preview-scope">
            Illustrative geometry · Product dimensions unverified
          </span>
        </section>
        <aside className="preview-details" aria-label="Shared build details">
          {creatorDetails}
          <PreviewAdjustments evidence={stryMutAct_9fa48("4110") ? frozen.evidence : (stryCov_9fa48("4110"), frozen?.evidence)} checks={checks} original={original} build={build} onChange={next => {
            if (stryMutAct_9fa48("4111")) {
              {}
            } else {
              stryCov_9fa48("4111");
              if (stryMutAct_9fa48("4114") ? next.audio.source === build.audio.source : stryMutAct_9fa48("4113") ? false : stryMutAct_9fa48("4112") ? true : (stryCov_9fa48("4112", "4113", "4114"), next.audio.source !== build.audio.source)) {
                if (stryMutAct_9fa48("4115")) {
                  {}
                } else {
                  stryCov_9fa48("4115");
                  stryMutAct_9fa48("4116") ? revision.current.value-- : (stryCov_9fa48("4116"), revision.current.value++);
                  stryMutAct_9fa48("4117") ? audio.current.stop() : (stryCov_9fa48("4117"), audio.current?.stop());
                  setEnabled(stryMutAct_9fa48("4119") ? true : (stryCov_9fa48("4119"), false));
                  setAttempt(stryMutAct_9fa48("4121") ? () => undefined : (stryCov_9fa48("4121"), value => stryMutAct_9fa48("4122") ? value - 1 : (stryCov_9fa48("4122"), value + 1)));
                }
              }
              if (stryMutAct_9fa48("4123")) {
                ;
              } else {
                stryCov_9fa48("4123");
                setBuild(next);
              }
            }
          }} />
          <BuildFeedback build={build} linkMode={(stryMutAct_9fa48("4126") ? record?.kind === 'publication' || !changed : stryMutAct_9fa48("4125") ? false : stryMutAct_9fa48("4124") ? true : (stryCov_9fa48("4124", "4125", "4126"), (stryMutAct_9fa48("4128") ? record?.kind !== 'publication' : stryMutAct_9fa48("4127") ? true : (stryCov_9fa48("4127", "4128"), (stryMutAct_9fa48("4129") ? record.kind : (stryCov_9fa48("4129"), record?.kind)) === (stryMutAct_9fa48("4130") ? "" : (stryCov_9fa48("4130"), 'publication')))) && (stryMutAct_9fa48("4131") ? changed : (stryCov_9fa48("4131"), !changed)))) ? stryMutAct_9fa48("4132") ? "" : (stryCov_9fa48("4132"), 'publication') : record ? stryMutAct_9fa48("4133") ? "" : (stryCov_9fa48("4133"), 'root-preview') : stryMutAct_9fa48("4134") ? "" : (stryCov_9fa48("4134"), 'preview')} />
          <BuildComparison build={build} evidence={stryMutAct_9fa48("4135") ? snapshot.evidence : (stryCov_9fa48("4135"), snapshot?.evidence)} />
          <section className="preview-sound">
            <span className="preview-eyebrow">LISTEN</span>
            <h2>
              {stryMutAct_9fa48("4136") ? (snapshot?.evidence.sound.recording?.name ?? pack?.name) && 'Synthesized study' : (stryCov_9fa48("4136"), (stryMutAct_9fa48("4137") ? snapshot?.evidence.sound.recording?.name && pack?.name : (stryCov_9fa48("4137"), (stryMutAct_9fa48("4139") ? snapshot.evidence.sound.recording?.name : stryMutAct_9fa48("4138") ? snapshot?.evidence.sound.recording.name : (stryCov_9fa48("4138", "4139"), snapshot?.evidence.sound.recording?.name)) ?? (stryMutAct_9fa48("4140") ? pack.name : (stryCov_9fa48("4140"), pack?.name)))) ?? (stryMutAct_9fa48("4141") ? "" : (stryCov_9fa48("4141"), 'Synthesized study')))}
            </h2>
            <p>
              {pack ? stryMutAct_9fa48("4142") ? "" : (stryCov_9fa48("4142"), 'Recorded switch reference. Not a recording of this complete build.') : stryMutAct_9fa48("4143") ? "" : (stryCov_9fa48("4143"), 'An approximation, not a measured keyboard sound.')}
            </p>
            <VolumeDial value={volume} enabled={enabled} canEnable={stryMutAct_9fa48("4146") ? load !== 'ready' : stryMutAct_9fa48("4145") ? false : stryMutAct_9fa48("4144") ? true : (stryCov_9fa48("4144", "4145", "4146"), load === (stryMutAct_9fa48("4147") ? "" : (stryCov_9fa48("4147"), 'ready')))} onChange={setVolume} onCommit={() => {}} onToggle={() => {
              if (stryMutAct_9fa48("4148")) {
                {}
              } else {
                stryCov_9fa48("4148");
                if (stryMutAct_9fa48("4150") ? false : stryMutAct_9fa48("4149") ? true : (stryCov_9fa48("4149", "4150"), enabled)) {
                  if (stryMutAct_9fa48("4151")) {
                    {}
                  } else {
                    stryCov_9fa48("4151");
                    stryMutAct_9fa48("4152") ? revision.current.value-- : (stryCov_9fa48("4152"), revision.current.value++);
                    stryMutAct_9fa48("4153") ? audio.current.stop() : (stryCov_9fa48("4153"), audio.current?.stop());
                    stryMutAct_9fa48("4154") ? audio.current.setLevel(false, 0) : (stryCov_9fa48("4154"), audio.current?.setLevel(stryMutAct_9fa48("4155") ? true : (stryCov_9fa48("4155"), false), 0));
                    setEnabled(stryMutAct_9fa48("4157") ? true : (stryCov_9fa48("4157"), false));
                  }
                } else void enable();
              }
            }} />
            <button className="preview-hear" disabled={stryMutAct_9fa48("4160") ? load === 'ready' : stryMutAct_9fa48("4159") ? false : stryMutAct_9fa48("4158") ? true : (stryCov_9fa48("4158", "4159", "4160"), load !== (stryMutAct_9fa48("4161") ? "" : (stryCov_9fa48("4161"), 'ready')))} onClick={async () => {
              if (stryMutAct_9fa48("4162")) {
                {}
              } else {
                stryCov_9fa48("4162");
                if (stryMutAct_9fa48("4165") ? false : stryMutAct_9fa48("4164") ? true : stryMutAct_9fa48("4163") ? await enable() : (stryCov_9fa48("4163", "4164", "4165"), !(await enable()))) return;
                const engine = audio.current;
                if (stryMutAct_9fa48("4168") ? false : stryMutAct_9fa48("4167") ? true : stryMutAct_9fa48("4166") ? engine : (stryCov_9fa48("4166", "4167", "4168"), !engine)) return;
                const time = stryMutAct_9fa48("4169") ? engine.now() - 0.025 : (stryCov_9fa48("4169"), engine.now() + 0.025);
                engine.play(stryMutAct_9fa48("4171") ? "" : (stryCov_9fa48("4171"), 'KeyA'), stryMutAct_9fa48("4172") ? {} : (stryCov_9fa48("4172"), {
                  ...sound,
                  enabled: stryMutAct_9fa48("4173") ? false : (stryCov_9fa48("4173"), true)
                }), stryMutAct_9fa48("4174") ? "" : (stryCov_9fa48("4174"), 'down'), time);
                engine.play(stryMutAct_9fa48("4176") ? "" : (stryCov_9fa48("4176"), 'KeyA'), stryMutAct_9fa48("4177") ? {} : (stryCov_9fa48("4177"), {
                  ...sound,
                  enabled: stryMutAct_9fa48("4178") ? false : (stryCov_9fa48("4178"), true)
                }), stryMutAct_9fa48("4179") ? "" : (stryCov_9fa48("4179"), 'up'), stryMutAct_9fa48("4180") ? time - 0.08 : (stryCov_9fa48("4180"), time + 0.08));
              }
            }}>
              <Play size={16} /> Hear a key
            </button>
            {stryMutAct_9fa48("4183") ? load === 'loading' || <output>Loading switch recordings…</output> : stryMutAct_9fa48("4182") ? false : stryMutAct_9fa48("4181") ? true : (stryCov_9fa48("4181", "4182", "4183"), (stryMutAct_9fa48("4185") ? load !== 'loading' : stryMutAct_9fa48("4184") ? true : (stryCov_9fa48("4184", "4185"), load === (stryMutAct_9fa48("4186") ? "" : (stryCov_9fa48("4186"), 'loading')))) && <output>Loading switch recordings…</output>)}
            {stryMutAct_9fa48("4189") ? load === 'error' || <div role="alert">
                <p>The recording could not load.</p>
                <button onClick={() => setAttempt(attempt + 1)}>
                  Retry recording
                </button>
              </div> : stryMutAct_9fa48("4188") ? false : stryMutAct_9fa48("4187") ? true : (stryCov_9fa48("4187", "4188", "4189"), (stryMutAct_9fa48("4191") ? load !== 'error' : stryMutAct_9fa48("4190") ? true : (stryCov_9fa48("4190", "4191"), load === (stryMutAct_9fa48("4192") ? "" : (stryCov_9fa48("4192"), 'error')))) && <div role="alert">
                <p>The recording could not load.</p>
                <button onClick={stryMutAct_9fa48("4193") ? () => undefined : (stryCov_9fa48("4193"), () => setAttempt(stryMutAct_9fa48("4194") ? attempt - 1 : (stryCov_9fa48("4194"), attempt + 1)))}>
                  Retry recording
                </button>
              </div>)}
            <output>{notice}</output>
            <p className="preview-tip">
              Enable sound, then type or tap the 3D keys. Listening changes stay
              in this preview.
            </p>
            {stryMutAct_9fa48("4197") ? pack || <a href={snapshot?.evidence.sound.recording?.source ?? pack.source} target="_blank" rel="noreferrer">
                Recording source & license <ArrowUpRight size={14} />
              </a> : stryMutAct_9fa48("4196") ? false : stryMutAct_9fa48("4195") ? true : (stryCov_9fa48("4195", "4196", "4197"), pack && <a href={stryMutAct_9fa48("4198") ? snapshot?.evidence.sound.recording?.source && pack.source : (stryCov_9fa48("4198"), (stryMutAct_9fa48("4200") ? snapshot.evidence.sound.recording?.source : stryMutAct_9fa48("4199") ? snapshot?.evidence.sound.recording.source : (stryCov_9fa48("4199", "4200"), snapshot?.evidence.sound.recording?.source)) ?? pack.source)} target="_blank" rel="noreferrer">
                Recording source & license <ArrowUpRight size={14} />
              </a>)}
          </section>
          <section>
            <span className="preview-eyebrow">
              {changed ? stryMutAct_9fa48("4201") ? "" : (stryCov_9fa48("4201"), 'YOUR VARIATION') : stryMutAct_9fa48("4202") ? "" : (stryCov_9fa48("4202"), 'THE PARTS')}
            </span>
            <h2>Explore the originals</h2>
            <ul className="preview-parts">
              {categories.map(category => {
                if (stryMutAct_9fa48("4203")) {
                  {}
                } else {
                  stryCov_9fa48("4203");
                  const part = parts.find(stryMutAct_9fa48("4204") ? () => undefined : (stryCov_9fa48("4204"), item => stryMutAct_9fa48("4207") ? item.id !== build.selection[category] : stryMutAct_9fa48("4206") ? false : stryMutAct_9fa48("4205") ? true : (stryCov_9fa48("4205", "4206", "4207"), item.id === build.selection[category])));
                  return stryMutAct_9fa48("4210") ? part || <li key={category}>
                      <span>{category}</span>
                      <a href={part.source} target="_blank" rel="noreferrer">
                        <span>
                          {part.brand} {part.name}
                        </span>
                        <ArrowUpRight size={15} />
                      </a>
                    </li> : stryMutAct_9fa48("4209") ? false : stryMutAct_9fa48("4208") ? true : (stryCov_9fa48("4208", "4209", "4210"), part && <li key={category}>
                      <span>{category}</span>
                      <a href={part.source} target="_blank" rel="noreferrer">
                        <span>
                          {part.brand} {part.name}
                        </span>
                        <ArrowUpRight size={15} />
                      </a>
                    </li>);
                }
              })}
              {build.accessories.map(selection => {
                if (stryMutAct_9fa48("4211")) {
                  {}
                } else {
                  stryCov_9fa48("4211");
                  const part = accessoryProducts.find(stryMutAct_9fa48("4212") ? () => undefined : (stryCov_9fa48("4212"), item => stryMutAct_9fa48("4215") ? item.id !== selection.productId : stryMutAct_9fa48("4214") ? false : stryMutAct_9fa48("4213") ? true : (stryCov_9fa48("4213", "4214", "4215"), item.id === selection.productId)));
                  return stryMutAct_9fa48("4218") ? part || <li key={selection.id}>
                      <span>
                        {part.kind} · {selection.quantity}×
                      </span>
                      <a href={part.source} target="_blank" rel="noreferrer">
                        <span>{part.name}</span>
                        <ArrowUpRight size={15} />
                      </a>
                      {part.id.startsWith('import-accessory:') && <small>
                          Imported reference. Product geometry is unavailable;
                          neutral markers indicate placement only, not
                          dimensions or physical fit.
                        </small>}
                      {artisanPreviewNote(build, selection.id) && <small>{artisanPreviewNote(build, selection.id)}</small>}
                      {unmountedPreviewNote(build.accessories, selection.id, accessoryProducts) && <small>
                          {unmountedPreviewNote(build.accessories, selection.id, accessoryProducts)}
                        </small>}
                      <small>
                        Placement:{' '}
                        {selection.location.kind === 'key' ? selection.location.keyId : selection.location.kind === 'embedded' ? selection.location.slotId : selection.location.position}
                        . Fit: {accessoryChecks[selection.id].status}.
                      </small>
                    </li> : stryMutAct_9fa48("4217") ? false : stryMutAct_9fa48("4216") ? true : (stryCov_9fa48("4216", "4217", "4218"), part && <li key={selection.id}>
                      <span>
                        {part.kind} · {selection.quantity}×
                      </span>
                      <a href={part.source} target="_blank" rel="noreferrer">
                        <span>{part.name}</span>
                        <ArrowUpRight size={15} />
                      </a>
                      {stryMutAct_9fa48("4221") ? part.id.startsWith('import-accessory:') || <small>
                          Imported reference. Product geometry is unavailable;
                          neutral markers indicate placement only, not
                          dimensions or physical fit.
                        </small> : stryMutAct_9fa48("4220") ? false : stryMutAct_9fa48("4219") ? true : (stryCov_9fa48("4219", "4220", "4221"), (stryMutAct_9fa48("4222") ? part.id.endsWith('import-accessory:') : (stryCov_9fa48("4222"), part.id.startsWith(stryMutAct_9fa48("4223") ? "" : (stryCov_9fa48("4223"), 'import-accessory:')))) && <small>
                          Imported reference. Product geometry is unavailable;
                          neutral markers indicate placement only, not
                          dimensions or physical fit.
                        </small>)}
                      {stryMutAct_9fa48("4226") ? artisanPreviewNote(build, selection.id) || <small>{artisanPreviewNote(build, selection.id)}</small> : stryMutAct_9fa48("4225") ? false : stryMutAct_9fa48("4224") ? true : (stryCov_9fa48("4224", "4225", "4226"), artisanPreviewNote(build, selection.id) && <small>{artisanPreviewNote(build, selection.id)}</small>)}
                      {stryMutAct_9fa48("4229") ? unmountedPreviewNote(build.accessories, selection.id, accessoryProducts) || <small>
                          {unmountedPreviewNote(build.accessories, selection.id, accessoryProducts)}
                        </small> : stryMutAct_9fa48("4228") ? false : stryMutAct_9fa48("4227") ? true : (stryCov_9fa48("4227", "4228", "4229"), unmountedPreviewNote(build.accessories, selection.id, accessoryProducts) && <small>
                          {unmountedPreviewNote(build.accessories, selection.id, accessoryProducts)}
                        </small>)}
                      <small>
                        Placement:{stryMutAct_9fa48("4230") ? "" : (stryCov_9fa48("4230"), ' ')}
                        {(stryMutAct_9fa48("4233") ? selection.location.kind !== 'key' : stryMutAct_9fa48("4232") ? false : stryMutAct_9fa48("4231") ? true : (stryCov_9fa48("4231", "4232", "4233"), selection.location.kind === (stryMutAct_9fa48("4234") ? "" : (stryCov_9fa48("4234"), 'key')))) ? selection.location.keyId : (stryMutAct_9fa48("4237") ? selection.location.kind !== 'embedded' : stryMutAct_9fa48("4236") ? false : stryMutAct_9fa48("4235") ? true : (stryCov_9fa48("4235", "4236", "4237"), selection.location.kind === (stryMutAct_9fa48("4238") ? "" : (stryCov_9fa48("4238"), 'embedded')))) ? selection.location.slotId : selection.location.position}
                        . Fit: {accessoryChecks[selection.id].status}.
                      </small>
                    </li>);
                }
              })}
            </ul>
          </section>
          <details className="preview-fit">
            <summary>
              {changed ? stryMutAct_9fa48("4239") ? "" : (stryCov_9fa48("4239"), 'Compatibility for your changes') : stryMutAct_9fa48("4240") ? "" : (stryCov_9fa48("4240"), 'Compatibility notes')}
            </summary>
            {stryMutAct_9fa48("4243") ? changed || <p>
                These checks use the current catalog. Reset to see the original
                build’s saved evidence.
              </p> : stryMutAct_9fa48("4242") ? false : stryMutAct_9fa48("4241") ? true : (stryCov_9fa48("4241", "4242", "4243"), changed && <p>
                These checks use the current catalog. Reset to see the original
                build’s saved evidence.
              </p>)}
            <ul>
              {checks.map(stryMutAct_9fa48("4244") ? () => undefined : (stryCov_9fa48("4244"), (check, index) => <li key={index}>
                  <strong>
                    {check.title} · {check.status}
                  </strong>
                  <p>{check.detail}</p>
                  <a href={check.source} target="_blank" rel="noreferrer">
                    Compatibility source <ArrowUpRight size={14} />
                  </a>
                </li>))}
            </ul>
            <AccessoryFitNotes selections={build.accessories} products={accessoryProducts} checks={accessoryChecks} />
            <p>
              Accessory fit and illustrated dimensions still need verification
              with the maker.
            </p>
          </details>
          <p className="preview-tip">
            Visit the makers for current prices and availability.
          </p>
          <p className="preview-tip">
            Customize opens a copy in your studio. Undo returns to your previous
            build.
          </p>
        </aside>
      </div>
    </main>;
  }
}
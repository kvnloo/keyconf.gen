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
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Check, Layers, Plus, RotateCcw } from 'lucide-react';
import type { Part, FitCheck } from '../lib/catalog';
import { catalogObservedAt, switchInterface } from '../lib/component-data';
import recordings from '../data/sound-references.json';
import './switch-detail.css';
function SwitchPreview({
  id
}: {
  id: string;
}) {
  if (stryMutAct_9fa48("4615")) {
    {}
  } else {
    stryCov_9fa48("4615");
    const host = useRef<HTMLDivElement>(null);
    const controller = useRef<Awaited<ReturnType<typeof import('../lib/switch-scene').createSwitchScene>> | null>(null);
    const [status, setStatus] = useState(stryMutAct_9fa48("4616") ? "" : (stryCov_9fa48("4616"), 'loading'));
    const [exploded, setExploded] = useState(stryMutAct_9fa48("4617") ? true : (stryCov_9fa48("4617"), false));
    const [attempt, setAttempt] = useState(0);
    useEffect(() => {
      if (stryMutAct_9fa48("4619")) {
        {}
      } else {
        stryCov_9fa48("4619");
        const element = host.current;
        if (stryMutAct_9fa48("4622") ? false : stryMutAct_9fa48("4621") ? true : stryMutAct_9fa48("4620") ? element : (stryCov_9fa48("4620", "4621", "4622"), !element)) return;
        let cancelled = stryMutAct_9fa48("4623") ? true : (stryCov_9fa48("4623"), false);
        void import('../lib/switch-scene').then(({
          createSwitchScene
        }) => {
          if (stryMutAct_9fa48("4624")) {
            {}
          } else {
            stryCov_9fa48("4624");
            if (stryMutAct_9fa48("4626") ? false : stryMutAct_9fa48("4625") ? true : (stryCov_9fa48("4625", "4626"), cancelled)) return;
            controller.current = createSwitchScene(element, id, stryMutAct_9fa48("4627") ? () => undefined : (stryCov_9fa48("4627"), () => setStatus(stryMutAct_9fa48("4628") ? "" : (stryCov_9fa48("4628"), 'error'))));
            setStatus(stryMutAct_9fa48("4630") ? "" : (stryCov_9fa48("4630"), 'ready'));
          }
        }).catch(() => {
          if (stryMutAct_9fa48("4631")) {
            {}
          } else {
            stryCov_9fa48("4631");
            if (stryMutAct_9fa48("4634") ? false : stryMutAct_9fa48("4633") ? true : stryMutAct_9fa48("4632") ? cancelled : (stryCov_9fa48("4632", "4633", "4634"), !cancelled)) setStatus(stryMutAct_9fa48("4636") ? "" : (stryCov_9fa48("4636"), 'error'));
          }
        });
        return () => {
          if (stryMutAct_9fa48("4637")) {
            {}
          } else {
            stryCov_9fa48("4637");
            cancelled = stryMutAct_9fa48("4638") ? false : (stryCov_9fa48("4638"), true);
            stryMutAct_9fa48("4639") ? controller.current.dispose() : (stryCov_9fa48("4639"), controller.current?.dispose());
            controller.current = null;
          }
        };
      }
    }, stryMutAct_9fa48("4640") ? [] : (stryCov_9fa48("4640"), [id, attempt]));
    return <div className="switch-preview">
      <div className="switch-preview-heading">
        <span>COMPONENT STUDY</span>
        <span>01 / SWITCH</span>
      </div>
      <div ref={host} className="switch-canvas" data-switch-status={status} />
      {stryMutAct_9fa48("4643") ? status === 'loading' || <output className="switch-preview-status">Preparing switch…</output> : stryMutAct_9fa48("4642") ? false : stryMutAct_9fa48("4641") ? true : (stryCov_9fa48("4641", "4642", "4643"), (stryMutAct_9fa48("4645") ? status !== 'loading' : stryMutAct_9fa48("4644") ? true : (stryCov_9fa48("4644", "4645"), status === (stryMutAct_9fa48("4646") ? "" : (stryCov_9fa48("4646"), 'loading')))) && <output className="switch-preview-status">Preparing switch…</output>)}
      {stryMutAct_9fa48("4649") ? status === 'error' || <div className="switch-preview-status" role="alert">
          <p>
            The 3D preview is unavailable. Specs and build actions are still
            available.
          </p>
          <button className="button secondary" onClick={() => {
          setStatus('loading');
          setAttempt(attempt + 1);
          setExploded(false);
        }}>
            Try 3D again
          </button>
        </div> : stryMutAct_9fa48("4648") ? false : stryMutAct_9fa48("4647") ? true : (stryCov_9fa48("4647", "4648", "4649"), (stryMutAct_9fa48("4651") ? status !== 'error' : stryMutAct_9fa48("4650") ? true : (stryCov_9fa48("4650", "4651"), status === (stryMutAct_9fa48("4652") ? "" : (stryCov_9fa48("4652"), 'error')))) && <div className="switch-preview-status" role="alert">
          <p>
            The 3D preview is unavailable. Specs and build actions are still
            available.
          </p>
          <button className="button secondary" onClick={() => {
          if (stryMutAct_9fa48("4653")) {
            {}
          } else {
            stryCov_9fa48("4653");
            setStatus(stryMutAct_9fa48("4655") ? "" : (stryCov_9fa48("4655"), 'loading'));
            setAttempt(stryMutAct_9fa48("4657") ? attempt - 1 : (stryCov_9fa48("4657"), attempt + 1));
            setExploded(stryMutAct_9fa48("4659") ? true : (stryCov_9fa48("4659"), false));
          }
        }}>
            Try 3D again
          </button>
        </div>)}
      <div className="switch-preview-controls">
        <button className="button secondary" disabled={stryMutAct_9fa48("4662") ? status === 'ready' : stryMutAct_9fa48("4661") ? false : stryMutAct_9fa48("4660") ? true : (stryCov_9fa48("4660", "4661", "4662"), status !== (stryMutAct_9fa48("4663") ? "" : (stryCov_9fa48("4663"), 'ready')))} aria-pressed={exploded} onClick={() => {
          if (stryMutAct_9fa48("4664")) {
            {}
          } else {
            stryCov_9fa48("4664");
            stryMutAct_9fa48("4665") ? controller.current.separate(!exploded) : (stryCov_9fa48("4665"), controller.current?.separate(stryMutAct_9fa48("4666") ? exploded : (stryCov_9fa48("4666"), !exploded)));
            setExploded(stryMutAct_9fa48("4668") ? exploded : (stryCov_9fa48("4668"), !exploded));
          }
        }}>
          <Layers size={16} />
          {exploded ? stryMutAct_9fa48("4669") ? "" : (stryCov_9fa48("4669"), 'Assemble switch') : stryMutAct_9fa48("4670") ? "" : (stryCov_9fa48("4670"), 'Separate housing')}
        </button>
        <button className="button secondary" disabled={stryMutAct_9fa48("4673") ? status === 'ready' : stryMutAct_9fa48("4672") ? false : stryMutAct_9fa48("4671") ? true : (stryCov_9fa48("4671", "4672", "4673"), status !== (stryMutAct_9fa48("4674") ? "" : (stryCov_9fa48("4674"), 'ready')))} onClick={stryMutAct_9fa48("4675") ? () => undefined : (stryCov_9fa48("4675"), () => stryMutAct_9fa48("4676") ? controller.current.reset() : (stryCov_9fa48("4676"), controller.current?.reset()))}>
          <RotateCcw size={16} />
          Reset view
        </button>
      </div>
      <p className="switch-model-note">
        Original switch study. Shape, color and separation are illustrative, not
        manufacturer CAD.
      </p>
      <p className="switch-gesture-note">
        Drag to orbit · Arrow keys rotate · + / − zoom
      </p>
    </div>;
  }
}
const interfaceNames = stryMutAct_9fa48("4677") ? {} : (stryCov_9fa48("4677"), {
  'mx-contact': stryMutAct_9fa48("4678") ? "" : (stryCov_9fa48("4678"), 'MX mechanical contact'),
  'keychron-ultrafast': stryMutAct_9fa48("4679") ? "" : (stryCov_9fa48("4679"), 'Keychron Ultra-Fast magnetic'),
  'keychron-double-rail': stryMutAct_9fa48("4680") ? "" : (stryCov_9fa48("4680"), 'Gateron Double-Rail magnetic'),
  'other-magnetic': stryMutAct_9fa48("4681") ? "" : (stryCov_9fa48("4681"), 'Magnetic, exact PCB support needs review')
});
export default function SwitchDetail({
  part,
  parts,
  selected,
  checks,
  onSelect
}: {
  part: Part | undefined;
  parts: Part[];
  selected: string;
  checks: FitCheck[];
  onSelect: (part: Part) => void;
}) {
  if (stryMutAct_9fa48("4682")) {
    {}
  } else {
    stryCov_9fa48("4682");
    const title = useRef<HTMLHeadingElement>(null);
    useEffect(() => {
      if (stryMutAct_9fa48("4684")) {
        {}
      } else {
        stryCov_9fa48("4684");
        stryMutAct_9fa48("4685") ? title.current.focus() : (stryCov_9fa48("4685"), title.current?.focus());
        window.scrollTo(stryMutAct_9fa48("4687") ? {} : (stryCov_9fa48("4687"), {
          top: 0,
          behavior: stryMutAct_9fa48("4688") ? "" : (stryCov_9fa48("4688"), 'instant')
        }));
      }
    }, stryMutAct_9fa48("4689") ? [] : (stryCov_9fa48("4689"), [stryMutAct_9fa48("4690") ? part.id : (stryCov_9fa48("4690"), part?.id)]));
    if (stryMutAct_9fa48("4693") ? false : stryMutAct_9fa48("4692") ? true : stryMutAct_9fa48("4691") ? part : (stryCov_9fa48("4691", "4692", "4693"), !part)) return <section className="switch-detail">
        <a className="switch-back" href="#studio">
          <ArrowLeft size={16} />
          Back to build
        </a>
        <h1 ref={title} tabIndex={stryMutAct_9fa48("4694") ? +1 : (stryCov_9fa48("4694"), -1)}>
          Switch not found.
        </h1>
        <p>
          This reference is unavailable on this device. Open the build that
          contains it or choose another switch in Parts.
        </p>
      </section>;
    const electrical = switchInterface(part);
    const matches = stryMutAct_9fa48("4695") ? recordings.records : (stryCov_9fa48("4695"), recordings.records.filter(stryMutAct_9fa48("4696") ? () => undefined : (stryCov_9fa48("4696"), record => stryMutAct_9fa48("4699") ? record.name.toLowerCase() !== `${part.brand} ${part.name}`.toLowerCase() : stryMutAct_9fa48("4698") ? false : stryMutAct_9fa48("4697") ? true : (stryCov_9fa48("4697", "4698", "4699"), (stryMutAct_9fa48("4700") ? record.name.toUpperCase() : (stryCov_9fa48("4700"), record.name.toLowerCase())) === (stryMutAct_9fa48("4701") ? `${part.brand} ${part.name}`.toUpperCase() : (stryCov_9fa48("4701"), (stryMutAct_9fa48("4702") ? `` : (stryCov_9fa48("4702"), `${part.brand} ${part.name}`)).toLowerCase()))))));
    const facts = part.detail.split(stryMutAct_9fa48("4703") ? "" : (stryCov_9fa48("4703"), ' · '));
    const inBuild = stryMutAct_9fa48("4706") ? selected !== part.id : stryMutAct_9fa48("4705") ? false : stryMutAct_9fa48("4704") ? true : (stryCov_9fa48("4704", "4705", "4706"), selected === part.id);
    const compatibility = checks.find(stryMutAct_9fa48("4707") ? () => undefined : (stryCov_9fa48("4707"), check => /switch|interface/i.test(check.title)));
    const otherSwitches = stryMutAct_9fa48("4708") ? parts : (stryCov_9fa48("4708"), parts.filter(stryMutAct_9fa48("4709") ? () => undefined : (stryCov_9fa48("4709"), item => stryMutAct_9fa48("4712") ? item.category === 'switch' || item.id !== part.id : stryMutAct_9fa48("4711") ? false : stryMutAct_9fa48("4710") ? true : (stryCov_9fa48("4710", "4711", "4712"), (stryMutAct_9fa48("4714") ? item.category !== 'switch' : stryMutAct_9fa48("4713") ? true : (stryCov_9fa48("4713", "4714"), item.category === (stryMutAct_9fa48("4715") ? "" : (stryCov_9fa48("4715"), 'switch')))) && (stryMutAct_9fa48("4717") ? item.id === part.id : stryMutAct_9fa48("4716") ? true : (stryCov_9fa48("4716", "4717"), item.id !== part.id))))));
    return <section className="switch-detail" aria-label="Switch detail">
      <a className="switch-back" href="#studio">
        <ArrowLeft size={16} />
        Back to build
      </a>
      <div className="switch-detail-grid">
        <SwitchPreview key={part.id} id={part.id} />
        <div className="switch-inspector" id="switch-information" tabIndex={stryMutAct_9fa48("4718") ? +1 : (stryCov_9fa48("4718"), -1)}>
          <span className="eyebrow">{part.brand} / SWITCHES</span>
          <h1 ref={title} tabIndex={stryMutAct_9fa48("4719") ? +1 : (stryCov_9fa48("4719"), -1)}>
            {part.name}
          </h1>
          <p className="switch-summary">{part.detail}</p>
          <div className="switch-detail-actions">
            <button className="button" disabled={inBuild} onClick={stryMutAct_9fa48("4720") ? () => undefined : (stryCov_9fa48("4720"), () => onSelect(part))}>
              {inBuild ? <Check size={17} /> : <Plus size={17} />}
              {inBuild ? stryMutAct_9fa48("4721") ? "" : (stryCov_9fa48("4721"), 'In your build') : stryMutAct_9fa48("4722") ? "" : (stryCov_9fa48("4722"), 'Add to build')}
            </button>
            <a className="button secondary" href={part.source} target="_blank" rel="noreferrer">
              {(stryMutAct_9fa48("4725") ? part.evidence !== 'documented' : stryMutAct_9fa48("4724") ? false : stryMutAct_9fa48("4723") ? true : (stryCov_9fa48("4723", "4724", "4725"), part.evidence === (stryMutAct_9fa48("4726") ? "" : (stryCov_9fa48("4726"), 'documented')))) ? stryMutAct_9fa48("4727") ? "" : (stryCov_9fa48("4727"), 'Product source') : stryMutAct_9fa48("4728") ? "" : (stryCov_9fa48("4728"), 'Unverified source')}
              <ArrowUpRight size={16} />
            </a>
          </div>
          <nav className="switch-section-links" aria-label="Switch sections">
            {(stryMutAct_9fa48("4729") ? [] : (stryCov_9fa48("4729"), [stryMutAct_9fa48("4730") ? [] : (stryCov_9fa48("4730"), [stryMutAct_9fa48("4731") ? "" : (stryCov_9fa48("4731"), 'switch-specifications'), stryMutAct_9fa48("4732") ? "" : (stryCov_9fa48("4732"), 'Specs')]), stryMutAct_9fa48("4733") ? [] : (stryCov_9fa48("4733"), [stryMutAct_9fa48("4734") ? "" : (stryCov_9fa48("4734"), 'switch-recordings'), stryMutAct_9fa48("4735") ? "" : (stryCov_9fa48("4735"), 'Sound')]), stryMutAct_9fa48("4736") ? [] : (stryCov_9fa48("4736"), [stryMutAct_9fa48("4737") ? "" : (stryCov_9fa48("4737"), 'switch-fit'), stryMutAct_9fa48("4738") ? "" : (stryCov_9fa48("4738"), 'Fit')])])).map(stryMutAct_9fa48("4739") ? () => undefined : (stryCov_9fa48("4739"), ([id, label]) => <button key={id} onClick={() => {
              if (stryMutAct_9fa48("4740")) {
                {}
              } else {
                stryCov_9fa48("4740");
                const section = document.getElementById(id);
                stryMutAct_9fa48("4741") ? section.scrollIntoView({
                  behavior: 'instant',
                  block: 'start'
                }) : (stryCov_9fa48("4741"), section?.scrollIntoView(stryMutAct_9fa48("4742") ? {} : (stryCov_9fa48("4742"), {
                  behavior: stryMutAct_9fa48("4743") ? "" : (stryCov_9fa48("4743"), 'instant'),
                  block: stryMutAct_9fa48("4744") ? "" : (stryCov_9fa48("4744"), 'start')
                })));
                stryMutAct_9fa48("4745") ? section.focus({
                  preventScroll: true
                }) : (stryCov_9fa48("4745"), section?.focus(stryMutAct_9fa48("4746") ? {} : (stryCov_9fa48("4746"), {
                  preventScroll: stryMutAct_9fa48("4747") ? false : (stryCov_9fa48("4747"), true)
                })));
              }
            }}>
                {label}
              </button>))}
          </nav>
          <section id="switch-specifications" tabIndex={stryMutAct_9fa48("4748") ? +1 : (stryCov_9fa48("4748"), -1)}>
            <h2>Specifications</h2>
            <p className="muted">
              {(stryMutAct_9fa48("4751") ? part.evidence !== 'documented' : stryMutAct_9fa48("4750") ? false : stryMutAct_9fa48("4749") ? true : (stryCov_9fa48("4749", "4750", "4751"), part.evidence === (stryMutAct_9fa48("4752") ? "" : (stryCov_9fa48("4752"), 'documented')))) ? stryMutAct_9fa48("4753") ? `` : (stryCov_9fa48("4753"), `Catalog facts reviewed ${catalogObservedAt}. Check the linked source for the exact variant.`) : stryMutAct_9fa48("4754") ? "" : (stryCov_9fa48("4754"), 'Imported reference. These details have not been verified against manufacturer documentation.')}
            </p>
            <dl className="switch-specs">
              {facts.map(stryMutAct_9fa48("4755") ? () => undefined : (stryCov_9fa48("4755"), (fact, index) => <div key={stryMutAct_9fa48("4756") ? `` : (stryCov_9fa48("4756"), `${index}-${fact}`)}>
                  <dt>
                    {(stryMutAct_9fa48("4759") ? index !== 0 : stryMutAct_9fa48("4758") ? false : stryMutAct_9fa48("4757") ? true : (stryCov_9fa48("4757", "4758", "4759"), index === 0)) ? stryMutAct_9fa48("4760") ? "" : (stryCov_9fa48("4760"), 'Type / description') : (stryMutAct_9fa48("4761") ? /bottom.out/i : (stryCov_9fa48("4761"), /bottom.?out/i)).test(fact) ? stryMutAct_9fa48("4762") ? "" : (stryCov_9fa48("4762"), 'Bottom-out force') : (stryMutAct_9fa48("4765") ? /operating/i.test(fact) && part.id.startsWith('g-pro-3-') && /gf/.test(fact) : stryMutAct_9fa48("4764") ? false : stryMutAct_9fa48("4763") ? true : (stryCov_9fa48("4763", "4764", "4765"), /operating/i.test(fact) || (stryMutAct_9fa48("4767") ? part.id.startsWith('g-pro-3-') || /gf/.test(fact) : stryMutAct_9fa48("4766") ? false : (stryCov_9fa48("4766", "4767"), (stryMutAct_9fa48("4768") ? part.id.endsWith('g-pro-3-') : (stryCov_9fa48("4768"), part.id.startsWith(stryMutAct_9fa48("4769") ? "" : (stryCov_9fa48("4769"), 'g-pro-3-')))) && /gf/.test(fact))))) ? stryMutAct_9fa48("4770") ? "" : (stryCov_9fa48("4770"), 'Operating force') : /pre-travel/.test(fact) ? stryMutAct_9fa48("4771") ? "" : (stryCov_9fa48("4771"), 'Pre-travel') : /travel/.test(fact) ? stryMutAct_9fa48("4772") ? "" : (stryCov_9fa48("4772"), 'Total travel') : /pin/.test(fact) ? stryMutAct_9fa48("4773") ? "" : (stryCov_9fa48("4773"), 'Mount') : /lub/.test(fact) ? stryMutAct_9fa48("4774") ? "" : (stryCov_9fa48("4774"), 'Lubrication') : stryMutAct_9fa48("4775") ? "" : (stryCov_9fa48("4775"), 'Catalog note')}
                  </dt>
                  <dd>{fact}</dd>
                </div>))}
              <div>
                <dt>Electrical interface</dt>
                <dd>
                  {electrical ? interfaceNames[electrical] : stryMutAct_9fa48("4776") ? "" : (stryCov_9fa48("4776"), 'Not verified')}
                </dd>
              </div>
            </dl>
          </section>
          <section id="switch-recordings" tabIndex={stryMutAct_9fa48("4777") ? +1 : (stryCov_9fa48("4777"), -1)}>
            <h2>Hear this switch</h2>
            {matches.length ? <>
                <p className="muted">
                  Original recordings of this named switch. The recorded
                  keyboard and microphone affect the sound.
                </p>
                {matches.map(stryMutAct_9fa48("4778") ? () => undefined : (stryCov_9fa48("4778"), record => <div className="switch-recording" key={record.id}>
                    <strong>{record.name}</strong>
                    <span>
                      {record.creator} · {record.published} · Lubed:{stryMutAct_9fa48("4779") ? "" : (stryCov_9fa48("4779"), ' ')}
                      {record.lubed}
                    </span>
                    <a href={stryMutAct_9fa48("4780") ? `` : (stryCov_9fa48("4780"), `https://www.youtube.com/watch?v=${record.videoId}`)} target="_blank" rel="noreferrer">
                      Watch sound test
                      <ArrowUpRight size={15} />
                    </a>
                    <a href={record.source} target="_blank" rel="noreferrer">
                      Recording setup & source
                      <ArrowUpRight size={15} />
                    </a>
                  </div>))}
              </> : <p className="muted">
                No exact recording is indexed for this switch.{stryMutAct_9fa48("4781") ? "" : (stryCov_9fa48("4781"), ' ')}
                <a href="#sound">Explore the sound library</a> for other
                recorded references.
              </p>}
          </section>
          <section id="switch-fit" tabIndex={stryMutAct_9fa48("4782") ? +1 : (stryCov_9fa48("4782"), -1)}>
            <h2>Fit with your build</h2>
            <p className={(stryMutAct_9fa48("4783") ? "" : (stryCov_9fa48("4783"), 'switch-fit-status ')) + (stryMutAct_9fa48("4784") ? compatibility?.status && 'unknown' : (stryCov_9fa48("4784"), (stryMutAct_9fa48("4785") ? compatibility.status : (stryCov_9fa48("4785"), compatibility?.status)) ?? (stryMutAct_9fa48("4786") ? "" : (stryCov_9fa48("4786"), 'unknown'))))}>
              {(stryMutAct_9fa48("4789") ? compatibility?.status !== 'documented' : stryMutAct_9fa48("4788") ? false : stryMutAct_9fa48("4787") ? true : (stryCov_9fa48("4787", "4788", "4789"), (stryMutAct_9fa48("4790") ? compatibility.status : (stryCov_9fa48("4790"), compatibility?.status)) === (stryMutAct_9fa48("4791") ? "" : (stryCov_9fa48("4791"), 'documented')))) ? stryMutAct_9fa48("4792") ? "" : (stryCov_9fa48("4792"), 'Documented interface relationship') : (stryMutAct_9fa48("4795") ? compatibility?.status !== 'incompatible' : stryMutAct_9fa48("4794") ? false : stryMutAct_9fa48("4793") ? true : (stryCov_9fa48("4793", "4794", "4795"), (stryMutAct_9fa48("4796") ? compatibility.status : (stryCov_9fa48("4796"), compatibility?.status)) === (stryMutAct_9fa48("4797") ? "" : (stryCov_9fa48("4797"), 'incompatible')))) ? stryMutAct_9fa48("4798") ? "" : (stryCov_9fa48("4798"), 'Incompatible interface') : stryMutAct_9fa48("4799") ? "" : (stryCov_9fa48("4799"), 'Compatibility needs review')}
            </p>
            <p className="muted">
              {stryMutAct_9fa48("4800") ? compatibility?.detail && 'Review the exact switch family, PCB support, pin count and housing clearances before buying.' : (stryCov_9fa48("4800"), (stryMutAct_9fa48("4801") ? compatibility.detail : (stryCov_9fa48("4801"), compatibility?.detail)) ?? (stryMutAct_9fa48("4802") ? "" : (stryCov_9fa48("4802"), 'Review the exact switch family, PCB support, pin count and housing clearances before buying.')))}
            </p>
          </section>
        </div>
      </div>
      <section className="switch-alternatives">
        <h2>Keep exploring</h2>
        <p className="muted">
          Inspect another switch before adding it to your build.
        </p>
        <div>
          {otherSwitches.map(stryMutAct_9fa48("4803") ? () => undefined : (stryCov_9fa48("4803"), item => <a key={item.id} href={stryMutAct_9fa48("4804") ? `` : (stryCov_9fa48("4804"), `#switch=${encodeURIComponent(item.id)}`)}>
              <span>{item.brand}</span>
              <strong>{item.name}</strong>
              <small>{item.detail.split(stryMutAct_9fa48("4805") ? "" : (stryCov_9fa48("4805"), ' · '))[0]}</small>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>))}
        </div>
      </section>
    </section>;
  }
}
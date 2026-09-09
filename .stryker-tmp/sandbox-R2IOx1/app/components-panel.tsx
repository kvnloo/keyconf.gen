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
import { useState } from 'react';
import { ArrowUpRight, Check, CircleAlert, Plus, Search } from 'lucide-react';
import { categories, type Category, type FitCheck, type Part, type Selection } from '../lib/catalog';
import { assemblies, catalogObservedAt, switchInterface, type Assembly } from '../lib/component-data';
import TechnologyGuide from './technology-guide';
import StudioSelect from './studio-select';
const labels: Record<Category, string> = stryMutAct_9fa48("760") ? {} : (stryCov_9fa48("760"), {
  case: stryMutAct_9fa48("761") ? "" : (stryCov_9fa48("761"), 'Case'),
  pcb: stryMutAct_9fa48("762") ? "" : (stryCov_9fa48("762"), 'PCB'),
  plate: stryMutAct_9fa48("763") ? "" : (stryCov_9fa48("763"), 'Plate'),
  switch: stryMutAct_9fa48("764") ? "" : (stryCov_9fa48("764"), 'Switches'),
  keycaps: stryMutAct_9fa48("765") ? "" : (stryCov_9fa48("765"), 'Keycaps'),
  stabilizers: stryMutAct_9fa48("766") ? "" : (stryCov_9fa48("766"), 'Stabilizers')
});
export default function ComponentsPanel({
  parts,
  selection,
  checks,
  onSelect,
  onAssembly,
  onImport,
  onResearch
}: {
  parts: Part[];
  selection: Selection;
  checks: FitCheck[];
  onSelect: (part: Part) => void;
  onAssembly: (assembly: Assembly) => void;
  onImport: () => void;
  onResearch: () => void;
}) {
  if (stryMutAct_9fa48("767")) {
    {}
  } else {
    stryCov_9fa48("767");
    const [category, setCategory] = useState<Category>(stryMutAct_9fa48("768") ? "" : (stryCov_9fa48("768"), 'switch'));
    const [query, setQuery] = useState(stryMutAct_9fa48("769") ? "Stryker was here!" : (stryCov_9fa48("769"), ''));
    const [technology, setTechnology] = useState(stryMutAct_9fa48("770") ? "" : (stryCov_9fa48("770"), 'all'));
    const assembly = assemblies.find(stryMutAct_9fa48("771") ? () => undefined : (stryCov_9fa48("771"), a => stryMutAct_9fa48("774") ? a.selection.case === selection.case && a.selection.pcb === selection.pcb || a.selection.plate === selection.plate : stryMutAct_9fa48("773") ? false : stryMutAct_9fa48("772") ? true : (stryCov_9fa48("772", "773", "774"), (stryMutAct_9fa48("776") ? a.selection.case === selection.case || a.selection.pcb === selection.pcb : stryMutAct_9fa48("775") ? true : (stryCov_9fa48("775", "776"), (stryMutAct_9fa48("778") ? a.selection.case !== selection.case : stryMutAct_9fa48("777") ? true : (stryCov_9fa48("777", "778"), a.selection.case === selection.case)) && (stryMutAct_9fa48("780") ? a.selection.pcb !== selection.pcb : stryMutAct_9fa48("779") ? true : (stryCov_9fa48("779", "780"), a.selection.pcb === selection.pcb)))) && (stryMutAct_9fa48("782") ? a.selection.plate !== selection.plate : stryMutAct_9fa48("781") ? true : (stryCov_9fa48("781", "782"), a.selection.plate === selection.plate)))));
    const matches = stryMutAct_9fa48("783") ? parts : (stryCov_9fa48("783"), parts.filter(part => {
      if (stryMutAct_9fa48("784")) {
        {}
      } else {
        stryCov_9fa48("784");
        const electrical = switchInterface(part);
        return stryMutAct_9fa48("787") ? part.category === category && (technology === 'all' || category !== 'switch' || (technology === 'contact' ? electrical === 'mx-contact' : electrical !== undefined && electrical !== 'mx-contact')) || `${part.name} ${part.brand} ${part.detail}`.toLowerCase().includes(query.trim().toLowerCase()) : stryMutAct_9fa48("786") ? false : stryMutAct_9fa48("785") ? true : (stryCov_9fa48("785", "786", "787"), (stryMutAct_9fa48("789") ? part.category === category || technology === 'all' || category !== 'switch' || (technology === 'contact' ? electrical === 'mx-contact' : electrical !== undefined && electrical !== 'mx-contact') : stryMutAct_9fa48("788") ? true : (stryCov_9fa48("788", "789"), (stryMutAct_9fa48("791") ? part.category !== category : stryMutAct_9fa48("790") ? true : (stryCov_9fa48("790", "791"), part.category === category)) && (stryMutAct_9fa48("793") ? (technology === 'all' || category !== 'switch') && (technology === 'contact' ? electrical === 'mx-contact' : electrical !== undefined && electrical !== 'mx-contact') : stryMutAct_9fa48("792") ? true : (stryCov_9fa48("792", "793"), (stryMutAct_9fa48("795") ? technology === 'all' && category !== 'switch' : stryMutAct_9fa48("794") ? false : (stryCov_9fa48("794", "795"), (stryMutAct_9fa48("797") ? technology !== 'all' : stryMutAct_9fa48("796") ? false : (stryCov_9fa48("796", "797"), technology === (stryMutAct_9fa48("798") ? "" : (stryCov_9fa48("798"), 'all')))) || (stryMutAct_9fa48("800") ? category === 'switch' : stryMutAct_9fa48("799") ? false : (stryCov_9fa48("799", "800"), category !== (stryMutAct_9fa48("801") ? "" : (stryCov_9fa48("801"), 'switch')))))) || ((stryMutAct_9fa48("804") ? technology !== 'contact' : stryMutAct_9fa48("803") ? false : stryMutAct_9fa48("802") ? true : (stryCov_9fa48("802", "803", "804"), technology === (stryMutAct_9fa48("805") ? "" : (stryCov_9fa48("805"), 'contact')))) ? stryMutAct_9fa48("808") ? electrical !== 'mx-contact' : stryMutAct_9fa48("807") ? false : stryMutAct_9fa48("806") ? true : (stryCov_9fa48("806", "807", "808"), electrical === (stryMutAct_9fa48("809") ? "" : (stryCov_9fa48("809"), 'mx-contact'))) : stryMutAct_9fa48("812") ? electrical !== undefined || electrical !== 'mx-contact' : stryMutAct_9fa48("811") ? false : stryMutAct_9fa48("810") ? true : (stryCov_9fa48("810", "811", "812"), (stryMutAct_9fa48("814") ? electrical === undefined : stryMutAct_9fa48("813") ? true : (stryCov_9fa48("813", "814"), electrical !== undefined)) && (stryMutAct_9fa48("816") ? electrical === 'mx-contact' : stryMutAct_9fa48("815") ? true : (stryCov_9fa48("815", "816"), electrical !== (stryMutAct_9fa48("817") ? "" : (stryCov_9fa48("817"), 'mx-contact')))))))))) && (stryMutAct_9fa48("818") ? `${part.name} ${part.brand} ${part.detail}`.toUpperCase().includes(query.trim().toLowerCase()) : (stryCov_9fa48("818"), (stryMutAct_9fa48("819") ? `` : (stryCov_9fa48("819"), `${part.name} ${part.brand} ${part.detail}`)).toLowerCase().includes(stryMutAct_9fa48("821") ? query.toLowerCase() : stryMutAct_9fa48("820") ? query.trim().toUpperCase() : (stryCov_9fa48("820", "821"), query.trim().toLowerCase())))));
      }
    }));
    const conflicts = stryMutAct_9fa48("822") ? checks.length : (stryCov_9fa48("822"), checks.filter(stryMutAct_9fa48("823") ? () => undefined : (stryCov_9fa48("823"), check => stryMutAct_9fa48("826") ? check.status !== 'incompatible' : stryMutAct_9fa48("825") ? false : stryMutAct_9fa48("824") ? true : (stryCov_9fa48("824", "825", "826"), check.status === (stryMutAct_9fa48("827") ? "" : (stryCov_9fa48("827"), 'incompatible'))))).length);
    return <>
      <div className="part-intro">
        <h3>Find your combination.</h3>
        <p className="muted">
          Start with a related set of parts, then make it yours. The 3D model
          shows a design study, not a scan of the selected product.
        </p>
      </div>
      <label htmlFor="starting-assembly">Starting assembly</label>
      <StudioSelect id="starting-assembly" value={stryMutAct_9fa48("828") ? assembly?.id && '' : (stryCov_9fa48("828"), (stryMutAct_9fa48("829") ? assembly.id : (stryCov_9fa48("829"), assembly?.id)) ?? (stryMutAct_9fa48("830") ? "Stryker was here!" : (stryCov_9fa48("830"), '')))} onValueChange={value => {
        if (stryMutAct_9fa48("831")) {
          {}
        } else {
          stryCov_9fa48("831");
          const selected = assemblies.find(stryMutAct_9fa48("832") ? () => undefined : (stryCov_9fa48("832"), a => stryMutAct_9fa48("835") ? a.id !== value : stryMutAct_9fa48("834") ? false : stryMutAct_9fa48("833") ? true : (stryCov_9fa48("833", "834", "835"), a.id === value)));
          if (stryMutAct_9fa48("837") ? false : stryMutAct_9fa48("836") ? true : (stryCov_9fa48("836", "837"), selected)) if (stryMutAct_9fa48("838")) {
            ;
          } else {
            stryCov_9fa48("838");
            onAssembly(selected);
          }
        }
      }} options={stryMutAct_9fa48("839") ? [] : (stryCov_9fa48("839"), [stryMutAct_9fa48("840") ? {} : (stryCov_9fa48("840"), {
        value: stryMutAct_9fa48("841") ? "Stryker was here!" : (stryCov_9fa48("841"), ''),
        label: stryMutAct_9fa48("842") ? "" : (stryCov_9fa48("842"), 'Mixed parts · choose an assembly'),
        disabled: stryMutAct_9fa48("843") ? false : (stryCov_9fa48("843"), true)
      }), ...assemblies.map(stryMutAct_9fa48("844") ? () => undefined : (stryCov_9fa48("844"), item => stryMutAct_9fa48("845") ? {} : (stryCov_9fa48("845"), {
        value: item.id,
        label: stryMutAct_9fa48("846") ? `` : (stryCov_9fa48("846"), `${item.layout}% · ${item.brand} ${item.name}${(stryMutAct_9fa48("849") ? item.availability !== 'retired' : stryMutAct_9fa48("848") ? false : stryMutAct_9fa48("847") ? true : (stryCov_9fa48("847", "848", "849"), item.availability === (stryMutAct_9fa48("850") ? "" : (stryCov_9fa48("850"), 'retired')))) ? stryMutAct_9fa48("851") ? "" : (stryCov_9fa48("851"), ' · retired') : stryMutAct_9fa48("852") ? "Stryker was here!" : (stryCov_9fa48("852"), '')}`)
      })))])} />
      {stryMutAct_9fa48("855") ? assembly || <div className="assembly-note">
          <span className="pill">
            {assembly.layout}% · {assembly.mount}
          </span>
          <p>{assembly.note}</p>
          <a href={assembly.source} target="_blank" rel="noreferrer">
            Assembly documentation <ArrowUpRight size={14} />
          </a>
        </div> : stryMutAct_9fa48("854") ? false : stryMutAct_9fa48("853") ? true : (stryCov_9fa48("853", "854", "855"), assembly && <div className="assembly-note">
          <span className="pill">
            {assembly.layout}% · {assembly.mount}
          </span>
          <p>{assembly.note}</p>
          <a href={assembly.source} target="_blank" rel="noreferrer">
            Assembly documentation <ArrowUpRight size={14} />
          </a>
        </div>)}
      <div className="parts-heading">
        <h4>Your parts</h4>
        <a className={conflicts ? stryMutAct_9fa48("856") ? "" : (stryCov_9fa48("856"), 'conflict-link') : stryMutAct_9fa48("857") ? "Stryker was here!" : (stryCov_9fa48("857"), '')} href="#fit-checks">
          {conflicts ? stryMutAct_9fa48("858") ? `` : (stryCov_9fa48("858"), `${conflicts} ${(stryMutAct_9fa48("861") ? conflicts !== 1 : stryMutAct_9fa48("860") ? false : stryMutAct_9fa48("859") ? true : (stryCov_9fa48("859", "860", "861"), conflicts === 1)) ? stryMutAct_9fa48("862") ? "" : (stryCov_9fa48("862"), 'conflict') : stryMutAct_9fa48("863") ? "" : (stryCov_9fa48("863"), 'conflicts')}`) : stryMutAct_9fa48("864") ? "" : (stryCov_9fa48("864"), 'Review fit')}{stryMutAct_9fa48("865") ? "" : (stryCov_9fa48("865"), ' ')}
          <CircleAlert size={14} />
        </a>
      </div>
      <fieldset className="component-slots" aria-label="Component categories">
        {categories.map(stryMutAct_9fa48("866") ? () => undefined : (stryCov_9fa48("866"), item => <button key={item} aria-pressed={stryMutAct_9fa48("869") ? category !== item : stryMutAct_9fa48("868") ? false : stryMutAct_9fa48("867") ? true : (stryCov_9fa48("867", "868", "869"), category === item)} onClick={() => {
          if (stryMutAct_9fa48("870")) {
            {}
          } else {
            stryCov_9fa48("870");
            if (stryMutAct_9fa48("871")) {
              ;
            } else {
              stryCov_9fa48("871");
              setCategory(item);
            }
            setQuery(stryMutAct_9fa48("873") ? "Stryker was here!" : (stryCov_9fa48("873"), ''));
            setTechnology(stryMutAct_9fa48("875") ? "" : (stryCov_9fa48("875"), 'all'));
          }
        }}>
            <span>{labels[item]}</span>
            <strong>
              {stryMutAct_9fa48("876") ? parts.find(part => part.id === selection[item])?.name && 'Choose a part' : (stryCov_9fa48("876"), (stryMutAct_9fa48("877") ? parts.find(part => part.id === selection[item]).name : (stryCov_9fa48("877"), parts.find(stryMutAct_9fa48("878") ? () => undefined : (stryCov_9fa48("878"), part => stryMutAct_9fa48("881") ? part.id !== selection[item] : stryMutAct_9fa48("880") ? false : stryMutAct_9fa48("879") ? true : (stryCov_9fa48("879", "880", "881"), part.id === selection[item])))?.name)) ?? (stryMutAct_9fa48("882") ? "" : (stryCov_9fa48("882"), 'Choose a part')))}
            </strong>
          </button>))}
      </fieldset>
      {stryMutAct_9fa48("885") ? category === 'switch' && parts.some(part => part.id === selection.switch) || <a className="button secondary" href={`#switch=${encodeURIComponent(selection.switch)}`}>
            Inspect selected switch <ArrowUpRight size={15} />
          </a> : stryMutAct_9fa48("884") ? false : stryMutAct_9fa48("883") ? true : (stryCov_9fa48("883", "884", "885"), (stryMutAct_9fa48("887") ? category === 'switch' || parts.some(part => part.id === selection.switch) : stryMutAct_9fa48("886") ? true : (stryCov_9fa48("886", "887"), (stryMutAct_9fa48("889") ? category !== 'switch' : stryMutAct_9fa48("888") ? true : (stryCov_9fa48("888", "889"), category === (stryMutAct_9fa48("890") ? "" : (stryCov_9fa48("890"), 'switch')))) && (stryMutAct_9fa48("891") ? parts.every(part => part.id === selection.switch) : (stryCov_9fa48("891"), parts.some(stryMutAct_9fa48("892") ? () => undefined : (stryCov_9fa48("892"), part => stryMutAct_9fa48("895") ? part.id !== selection.switch : stryMutAct_9fa48("894") ? false : stryMutAct_9fa48("893") ? true : (stryCov_9fa48("893", "894", "895"), part.id === selection.switch))))))) && <a className="button secondary" href={stryMutAct_9fa48("896") ? `` : (stryCov_9fa48("896"), `#switch=${encodeURIComponent(selection.switch)}`)}>
            Inspect selected switch <ArrowUpRight size={15} />
          </a>)}
      <div className="parts-heading">
        <h4>Browse {stryMutAct_9fa48("897") ? labels[category].toUpperCase() : (stryCov_9fa48("897"), labels[category].toLowerCase())}</h4>
        <span>
          {matches.length} {(stryMutAct_9fa48("900") ? matches.length !== 1 : stryMutAct_9fa48("899") ? false : stryMutAct_9fa48("898") ? true : (stryCov_9fa48("898", "899", "900"), matches.length === 1)) ? stryMutAct_9fa48("901") ? "" : (stryCov_9fa48("901"), 'reference') : stryMutAct_9fa48("902") ? "" : (stryCov_9fa48("902"), 'references')}
        </span>
      </div>
      <label className="catalog-search">
        <Search size={17} aria-hidden="true" />
        <input type="search" aria-label="Search components" placeholder="Search name, brand or specification" value={query} onChange={stryMutAct_9fa48("903") ? () => undefined : (stryCov_9fa48("903"), event => setQuery(event.target.value))} />
      </label>
      {stryMutAct_9fa48("906") ? category === 'switch' || <fieldset className="catalog-filters" aria-label="Switch technology filter">
          {[['all', 'All'], ['contact', 'Contact'], ['magnetic', 'Magnetic']].map(([value, label]) => <button key={value} aria-pressed={technology === value} onClick={() => setTechnology(value)}>
              {label}
            </button>)}
        </fieldset> : stryMutAct_9fa48("905") ? false : stryMutAct_9fa48("904") ? true : (stryCov_9fa48("904", "905", "906"), (stryMutAct_9fa48("908") ? category !== 'switch' : stryMutAct_9fa48("907") ? true : (stryCov_9fa48("907", "908"), category === (stryMutAct_9fa48("909") ? "" : (stryCov_9fa48("909"), 'switch')))) && <fieldset className="catalog-filters" aria-label="Switch technology filter">
          {(stryMutAct_9fa48("910") ? [] : (stryCov_9fa48("910"), [stryMutAct_9fa48("911") ? [] : (stryCov_9fa48("911"), [stryMutAct_9fa48("912") ? "" : (stryCov_9fa48("912"), 'all'), stryMutAct_9fa48("913") ? "" : (stryCov_9fa48("913"), 'All')]), stryMutAct_9fa48("914") ? [] : (stryCov_9fa48("914"), [stryMutAct_9fa48("915") ? "" : (stryCov_9fa48("915"), 'contact'), stryMutAct_9fa48("916") ? "" : (stryCov_9fa48("916"), 'Contact')]), stryMutAct_9fa48("917") ? [] : (stryCov_9fa48("917"), [stryMutAct_9fa48("918") ? "" : (stryCov_9fa48("918"), 'magnetic'), stryMutAct_9fa48("919") ? "" : (stryCov_9fa48("919"), 'Magnetic')])])).map(stryMutAct_9fa48("920") ? () => undefined : (stryCov_9fa48("920"), ([value, label]) => <button key={value} aria-pressed={stryMutAct_9fa48("923") ? technology !== value : stryMutAct_9fa48("922") ? false : stryMutAct_9fa48("921") ? true : (stryCov_9fa48("921", "922", "923"), technology === value)} onClick={stryMutAct_9fa48("924") ? () => undefined : (stryCov_9fa48("924"), () => setTechnology(value))}>
              {label}
            </button>))}
        </fieldset>)}
      <div className="catalog-results">
        {matches.map(stryMutAct_9fa48("925") ? () => undefined : (stryCov_9fa48("925"), part => <article className={(stryMutAct_9fa48("926") ? "" : (stryCov_9fa48("926"), 'catalog-card')) + ((stryMutAct_9fa48("929") ? selection[category] !== part.id : stryMutAct_9fa48("928") ? false : stryMutAct_9fa48("927") ? true : (stryCov_9fa48("927", "928", "929"), selection[category] === part.id)) ? stryMutAct_9fa48("930") ? "" : (stryCov_9fa48("930"), ' selected') : stryMutAct_9fa48("931") ? "Stryker was here!" : (stryCov_9fa48("931"), ''))} key={part.id}>
            <button className="catalog-choice" aria-label={stryMutAct_9fa48("932") ? `` : (stryCov_9fa48("932"), `Use ${part.brand} ${part.name}`)} aria-pressed={stryMutAct_9fa48("935") ? selection[category] !== part.id : stryMutAct_9fa48("934") ? false : stryMutAct_9fa48("933") ? true : (stryCov_9fa48("933", "934", "935"), selection[category] === part.id)} onClick={() => {
            if (stryMutAct_9fa48("936")) {
              {}
            } else {
              stryCov_9fa48("936");
              if (stryMutAct_9fa48("939") ? selection[part.category] === part.id : stryMutAct_9fa48("938") ? false : stryMutAct_9fa48("937") ? true : (stryCov_9fa48("937", "938", "939"), selection[part.category] !== part.id)) if (stryMutAct_9fa48("940")) {
                ;
              } else {
                stryCov_9fa48("940");
                onSelect(part);
              }
            }
          }}>
              <span className="catalog-brand">{part.brand}</span>
              <strong>{part.name}</strong>
              <span>{part.detail}</span>
              <span className="catalog-pick">
                {(stryMutAct_9fa48("943") ? selection[category] !== part.id : stryMutAct_9fa48("942") ? false : stryMutAct_9fa48("941") ? true : (stryCov_9fa48("941", "942", "943"), selection[category] === part.id)) ? <>
                    <Check size={14} /> In your build
                  </> : <>
                    <Plus size={14} /> Use this part
                  </>}
              </span>
            </button>
            {stryMutAct_9fa48("946") ? part.category === 'switch' || <a className="switch-detail-link" href={`#switch=${encodeURIComponent(part.id)}`}>
                Inspect {part.name}
                <ArrowUpRight size={14} />
              </a> : stryMutAct_9fa48("945") ? false : stryMutAct_9fa48("944") ? true : (stryCov_9fa48("944", "945", "946"), (stryMutAct_9fa48("948") ? part.category !== 'switch' : stryMutAct_9fa48("947") ? true : (stryCov_9fa48("947", "948"), part.category === (stryMutAct_9fa48("949") ? "" : (stryCov_9fa48("949"), 'switch')))) && <a className="switch-detail-link" href={stryMutAct_9fa48("950") ? `` : (stryCov_9fa48("950"), `#switch=${encodeURIComponent(part.id)}`)}>
                Inspect {part.name}
                <ArrowUpRight size={14} />
              </a>)}
            <a href={part.source} target="_blank" rel="noreferrer">
              {(stryMutAct_9fa48("953") ? part.evidence !== 'documented' : stryMutAct_9fa48("952") ? false : stryMutAct_9fa48("951") ? true : (stryCov_9fa48("951", "952", "953"), part.evidence === (stryMutAct_9fa48("954") ? "" : (stryCov_9fa48("954"), 'documented')))) ? stryMutAct_9fa48("955") ? "" : (stryCov_9fa48("955"), 'Product documentation') : stryMutAct_9fa48("956") ? "" : (stryCov_9fa48("956"), 'Unverified reference')}{stryMutAct_9fa48("957") ? "" : (stryCov_9fa48("957"), ' ')}
              <ArrowUpRight size={14} />
            </a>
          </article>))}
        {stryMutAct_9fa48("960") ? !matches.length || <div className="catalog-empty">
            <h4>No matching parts yet.</h4>
            <p>
              Try a shorter search, change the filter, or add a product from its
              store.
            </p>
            <button className="text-button" onClick={() => {
            setQuery('');
            setTechnology('all');
          }}>
              Clear search and filters
            </button>
          </div> : stryMutAct_9fa48("959") ? false : stryMutAct_9fa48("958") ? true : (stryCov_9fa48("958", "959", "960"), (stryMutAct_9fa48("961") ? matches.length : (stryCov_9fa48("961"), !matches.length)) && <div className="catalog-empty">
            <h4>No matching parts yet.</h4>
            <p>
              Try a shorter search, change the filter, or add a product from its
              store.
            </p>
            <button className="text-button" onClick={() => {
            if (stryMutAct_9fa48("962")) {
              {}
            } else {
              stryCov_9fa48("962");
              setQuery(stryMutAct_9fa48("964") ? "Stryker was here!" : (stryCov_9fa48("964"), ''));
              setTechnology(stryMutAct_9fa48("966") ? "" : (stryCov_9fa48("966"), 'all'));
            }
          }}>
              Clear search and filters
            </button>
          </div>)}
      </div>
      <button className="text-button" onClick={onImport}>
        <Plus size={15} /> Add products from a website
      </button>
      <div className="fit-panel" id="fit-checks" tabIndex={stryMutAct_9fa48("967") ? +1 : (stryCov_9fa48("967"), -1)}>
        <h3>
          {conflicts ? stryMutAct_9fa48("968") ? `` : (stryCov_9fa48("968"), `${conflicts} fit ${(stryMutAct_9fa48("971") ? conflicts !== 1 : stryMutAct_9fa48("970") ? false : stryMutAct_9fa48("969") ? true : (stryCov_9fa48("969", "970", "971"), conflicts === 1)) ? stryMutAct_9fa48("972") ? "" : (stryCov_9fa48("972"), 'conflict') : stryMutAct_9fa48("973") ? "" : (stryCov_9fa48("973"), 'conflicts')}`) : stryMutAct_9fa48("974") ? "" : (stryCov_9fa48("974"), 'Compatibility review')}
        </h3>
        {checks.map(stryMutAct_9fa48("975") ? () => undefined : (stryCov_9fa48("975"), check => <a key={check.title} className={(stryMutAct_9fa48("976") ? "" : (stryCov_9fa48("976"), 'fit-check ')) + check.status} href={stryMutAct_9fa48("979") ? check.source && undefined : stryMutAct_9fa48("978") ? false : stryMutAct_9fa48("977") ? true : (stryCov_9fa48("977", "978", "979"), check.source || undefined)} target="_blank" rel="noreferrer">
            {(stryMutAct_9fa48("982") ? check.status !== 'documented' : stryMutAct_9fa48("981") ? false : stryMutAct_9fa48("980") ? true : (stryCov_9fa48("980", "981", "982"), check.status === (stryMutAct_9fa48("983") ? "" : (stryCov_9fa48("983"), 'documented')))) ? <Check size={16} /> : <CircleAlert size={16} />}
            <span>
              <strong>{check.title}</strong>
              <small>{check.detail}</small>
              <em>
                {(stryMutAct_9fa48("986") ? check.status !== 'documented' : stryMutAct_9fa48("985") ? false : stryMutAct_9fa48("984") ? true : (stryCov_9fa48("984", "985", "986"), check.status === (stryMutAct_9fa48("987") ? "" : (stryCov_9fa48("987"), 'documented')))) ? stryMutAct_9fa48("988") ? "" : (stryCov_9fa48("988"), 'Documented relationship') : (stryMutAct_9fa48("991") ? check.status !== 'incompatible' : stryMutAct_9fa48("990") ? false : stryMutAct_9fa48("989") ? true : (stryCov_9fa48("989", "990", "991"), check.status === (stryMutAct_9fa48("992") ? "" : (stryCov_9fa48("992"), 'incompatible')))) ? stryMutAct_9fa48("993") ? "" : (stryCov_9fa48("993"), 'Incompatible') : stryMutAct_9fa48("994") ? "" : (stryCov_9fa48("994"), 'Needs review')}
              </em>
            </span>
          </a>))}
      </div>
      <TechnologyGuide />
      <button className="text-button" onClick={onResearch}>
        Browse keyboard research <ArrowUpRight size={15} />
      </button>
      <p className="catalog-provenance">
        Catalog reviewed {catalogObservedAt}. Product references are not live
        stock or price checks. Parts supplied in a kit may not be sold
        separately.
      </p>
    </>;
  }
}
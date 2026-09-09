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
import { ArrowUpRight, Play, X } from 'lucide-react';
import catalog from '../data/sound-references.json';
import StudioSelect from './studio-select';
export type SoundReference = typeof catalog.records[number];
export default function SoundReferences({
  onSelect,
  selected,
  switchName
}: {
  onSelect: (record: SoundReference | null) => void;
  selected: SoundReference | null;
  switchName?: string;
}) {
  if (stryMutAct_9fa48("4245")) {
    {}
  } else {
    stryCov_9fa48("4245");
    const [query, setQuery] = useState(stryMutAct_9fa48("4246") ? "Stryker was here!" : (stryCov_9fa48("4246"), ''));
    const [family, setFamily] = useState(stryMutAct_9fa48("4247") ? "" : (stryCov_9fa48("4247"), 'all'));
    const results = stryMutAct_9fa48("4248") ? catalog.records : (stryCov_9fa48("4248"), catalog.records.filter(stryMutAct_9fa48("4249") ? () => undefined : (stryCov_9fa48("4249"), record => stryMutAct_9fa48("4252") ? family === 'all' || record.family === family || `${record.name} ${record.family}`.toLowerCase().includes(query.toLowerCase().trim()) : stryMutAct_9fa48("4251") ? false : stryMutAct_9fa48("4250") ? true : (stryCov_9fa48("4250", "4251", "4252"), (stryMutAct_9fa48("4254") ? family === 'all' && record.family === family : stryMutAct_9fa48("4253") ? true : (stryCov_9fa48("4253", "4254"), (stryMutAct_9fa48("4256") ? family !== 'all' : stryMutAct_9fa48("4255") ? false : (stryCov_9fa48("4255", "4256"), family === (stryMutAct_9fa48("4257") ? "" : (stryCov_9fa48("4257"), 'all')))) || (stryMutAct_9fa48("4259") ? record.family !== family : stryMutAct_9fa48("4258") ? false : (stryCov_9fa48("4258", "4259"), record.family === family)))) && (stryMutAct_9fa48("4260") ? `${record.name} ${record.family}`.toUpperCase().includes(query.toLowerCase().trim()) : (stryCov_9fa48("4260"), (stryMutAct_9fa48("4261") ? `` : (stryCov_9fa48("4261"), `${record.name} ${record.family}`)).toLowerCase().includes(stryMutAct_9fa48("4263") ? query.toUpperCase().trim() : stryMutAct_9fa48("4262") ? query.toLowerCase() : (stryCov_9fa48("4262", "4263"), query.toLowerCase().trim()))))))));
    return <section className="sound-library" aria-label="Switch recording library">
      <h3>Explore more switches</h3>
      <p className="muted">
        {catalog.records.length} original sound tests by Click and Thock. Listen
        to the recorded build and compare switches.
      </p>
      {stryMutAct_9fa48("4266") ? switchName || <button className="button secondary selected-switch-search" onClick={() => {
        setQuery(switchName);
        setFamily('all');
      }}>
          Search selected switch: {switchName}
        </button> : stryMutAct_9fa48("4265") ? false : stryMutAct_9fa48("4264") ? true : (stryCov_9fa48("4264", "4265", "4266"), switchName && <button className="button secondary selected-switch-search" onClick={() => {
        if (stryMutAct_9fa48("4267")) {
          {}
        } else {
          stryCov_9fa48("4267");
          if (stryMutAct_9fa48("4268")) {
            ;
          } else {
            stryCov_9fa48("4268");
            setQuery(switchName);
          }
          setFamily(stryMutAct_9fa48("4270") ? "" : (stryCov_9fa48("4270"), 'all'));
        }
      }}>
          Search selected switch: {switchName}
        </button>)}
      <label htmlFor="sound-search">Find a switch</label>
      <input id="sound-search" type="search" placeholder="Oil King, Alps, silent…" value={query} onChange={stryMutAct_9fa48("4271") ? () => undefined : (stryCov_9fa48("4271"), event => setQuery(event.target.value))} />
      <label htmlFor="sound-family">Switch family</label>
      <StudioSelect id="sound-family" value={family} onValueChange={setFamily} options={stryMutAct_9fa48("4272") ? [] : (stryCov_9fa48("4272"), [stryMutAct_9fa48("4273") ? {} : (stryCov_9fa48("4273"), {
        value: stryMutAct_9fa48("4274") ? "" : (stryCov_9fa48("4274"), 'all'),
        label: stryMutAct_9fa48("4275") ? "" : (stryCov_9fa48("4275"), 'All families')
      }), ...(stryMutAct_9fa48("4276") ? Array.from(new Set(catalog.records.map(record => record.family))).map(name => ({
        value: name,
        label: name === '---' ? 'Comparisons / unspecified' : name
      })) : (stryCov_9fa48("4276"), Array.from(new Set(catalog.records.map(stryMutAct_9fa48("4277") ? () => undefined : (stryCov_9fa48("4277"), record => record.family)))).sort(stryMutAct_9fa48("4278") ? () => undefined : (stryCov_9fa48("4278"), (a, b) => a.localeCompare(b))).map(stryMutAct_9fa48("4279") ? () => undefined : (stryCov_9fa48("4279"), name => stryMutAct_9fa48("4280") ? {} : (stryCov_9fa48("4280"), {
        value: name,
        label: (stryMutAct_9fa48("4283") ? name !== '---' : stryMutAct_9fa48("4282") ? false : stryMutAct_9fa48("4281") ? true : (stryCov_9fa48("4281", "4282", "4283"), name === (stryMutAct_9fa48("4284") ? "" : (stryCov_9fa48("4284"), '---')))) ? stryMutAct_9fa48("4285") ? "" : (stryCov_9fa48("4285"), 'Comparisons / unspecified') : name
      })))))])} />
      {stryMutAct_9fa48("4288") ? selected || <div className="reference-player">
          <div className="reference-heading">
            <strong>{selected.name}</strong>
            <button className="icon-button" aria-label="Close recording" onClick={() => onSelect(null)}>
              <X size={16} />
            </button>
          </div>
          <iframe key={selected.videoId} title={`${selected.name} sound test by Click and Thock`} src={`https://www.youtube-nocookie.com/embed/${selected.videoId}?autoplay=1&playsinline=1&rel=0`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
          <small>
            Original video · Lubed:{' '}
            {selected.lubed === '---' ? 'Not specified' : selected.lubed}
          </small>
          <a href={selected.source} target="_blank" rel="noreferrer">
            Build details & creator <ArrowUpRight size={13} />
          </a>
          <a href={`https://www.youtube.com/watch?v=${selected.videoId}`} target="_blank" rel="noreferrer">
            Open on YouTube <ArrowUpRight size={13} />
          </a>
        </div> : stryMutAct_9fa48("4287") ? false : stryMutAct_9fa48("4286") ? true : (stryCov_9fa48("4286", "4287", "4288"), selected && <div className="reference-player">
          <div className="reference-heading">
            <strong>{selected.name}</strong>
            <button className="icon-button" aria-label="Close recording" onClick={stryMutAct_9fa48("4289") ? () => undefined : (stryCov_9fa48("4289"), () => onSelect(null))}>
              <X size={16} />
            </button>
          </div>
          <iframe key={selected.videoId} title={stryMutAct_9fa48("4290") ? `` : (stryCov_9fa48("4290"), `${selected.name} sound test by Click and Thock`)} src={stryMutAct_9fa48("4291") ? `` : (stryCov_9fa48("4291"), `https://www.youtube-nocookie.com/embed/${selected.videoId}?autoplay=1&playsinline=1&rel=0`)} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
          <small>
            Original video · Lubed:{stryMutAct_9fa48("4292") ? "" : (stryCov_9fa48("4292"), ' ')}
            {(stryMutAct_9fa48("4295") ? selected.lubed !== '---' : stryMutAct_9fa48("4294") ? false : stryMutAct_9fa48("4293") ? true : (stryCov_9fa48("4293", "4294", "4295"), selected.lubed === (stryMutAct_9fa48("4296") ? "" : (stryCov_9fa48("4296"), '---')))) ? stryMutAct_9fa48("4297") ? "" : (stryCov_9fa48("4297"), 'Not specified') : selected.lubed}
          </small>
          <a href={selected.source} target="_blank" rel="noreferrer">
            Build details & creator <ArrowUpRight size={13} />
          </a>
          <a href={stryMutAct_9fa48("4298") ? `` : (stryCov_9fa48("4298"), `https://www.youtube.com/watch?v=${selected.videoId}`)} target="_blank" rel="noreferrer">
            Open on YouTube <ArrowUpRight size={13} />
          </a>
        </div>)}
      <output className="recording-count">
        {results.length} {(stryMutAct_9fa48("4301") ? results.length !== 1 : stryMutAct_9fa48("4300") ? false : stryMutAct_9fa48("4299") ? true : (stryCov_9fa48("4299", "4300", "4301"), results.length === 1)) ? stryMutAct_9fa48("4302") ? "" : (stryCov_9fa48("4302"), 'recording') : stryMutAct_9fa48("4303") ? "" : (stryCov_9fa48("4303"), 'recordings')}
        {(stryMutAct_9fa48("4306") ? query && family !== 'all' : stryMutAct_9fa48("4305") ? false : stryMutAct_9fa48("4304") ? true : (stryCov_9fa48("4304", "4305", "4306"), query || (stryMutAct_9fa48("4308") ? family === 'all' : stryMutAct_9fa48("4307") ? false : (stryCov_9fa48("4307", "4308"), family !== (stryMutAct_9fa48("4309") ? "" : (stryCov_9fa48("4309"), 'all')))))) ? stryMutAct_9fa48("4310") ? "" : (stryCov_9fa48("4310"), ' found') : stryMutAct_9fa48("4311") ? "" : (stryCov_9fa48("4311"), ' available')}
      </output>
      <div className="sound-results">
        {results.map(stryMutAct_9fa48("4312") ? () => undefined : (stryCov_9fa48("4312"), record => <button key={record.id} onClick={() => {
          if (stryMutAct_9fa48("4313")) {
            {}
          } else {
            stryCov_9fa48("4313");
            if (stryMutAct_9fa48("4314")) {
              ;
            } else {
              stryCov_9fa48("4314");
              onSelect(record);
            }
          }
        }} aria-pressed={stryMutAct_9fa48("4317") ? selected?.id !== record.id : stryMutAct_9fa48("4316") ? false : stryMutAct_9fa48("4315") ? true : (stryCov_9fa48("4315", "4316", "4317"), (stryMutAct_9fa48("4318") ? selected.id : (stryCov_9fa48("4318"), selected?.id)) === record.id)}>
            <span>
              <strong>{record.name}</strong>
              <small>
                {(stryMutAct_9fa48("4321") ? record.family !== '---' : stryMutAct_9fa48("4320") ? false : stryMutAct_9fa48("4319") ? true : (stryCov_9fa48("4319", "4320", "4321"), record.family === (stryMutAct_9fa48("4322") ? "" : (stryCov_9fa48("4322"), '---')))) ? stryMutAct_9fa48("4323") ? "" : (stryCov_9fa48("4323"), 'Comparison / unspecified') : record.family}
              </small>
            </span>
            <Play size={15} aria-hidden="true" />
          </button>))}
        {stryMutAct_9fa48("4326") ? results.length === 0 || <div className="catalog-empty">
            <p className="muted">No recording indexed for that search yet.</p>
            <button className="text-button" onClick={() => {
            setQuery('');
            setFamily('all');
          }}>
              Clear recording filters
            </button>
          </div> : stryMutAct_9fa48("4325") ? false : stryMutAct_9fa48("4324") ? true : (stryCov_9fa48("4324", "4325", "4326"), (stryMutAct_9fa48("4328") ? results.length !== 0 : stryMutAct_9fa48("4327") ? true : (stryCov_9fa48("4327", "4328"), results.length === 0)) && <div className="catalog-empty">
            <p className="muted">No recording indexed for that search yet.</p>
            <button className="text-button" onClick={() => {
            if (stryMutAct_9fa48("4329")) {
              {}
            } else {
              stryCov_9fa48("4329");
              setQuery(stryMutAct_9fa48("4331") ? "Stryker was here!" : (stryCov_9fa48("4331"), ''));
              setFamily(stryMutAct_9fa48("4333") ? "" : (stryCov_9fa48("4333"), 'all'));
            }
          }}>
              Clear recording filters
            </button>
          </div>)}
      </div>
      <small>
        Videos play through YouTube. Coverage grows as we index more sources.
      </small>
    </section>;
  }
}
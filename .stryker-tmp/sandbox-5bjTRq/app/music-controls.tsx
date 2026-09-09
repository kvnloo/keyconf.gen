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
import { useId, useSyncExternalStore } from 'react';
import { Popover } from '@base-ui/react/popover';
import { Music2, Pause, Play } from 'lucide-react';
import type { StudioMusic } from '../lib/music';
import './music-controls.css';
export default function MusicControls({
  music
}: {
  music: StudioMusic;
}) {
  if (stryMutAct_9fa48("1961")) {
    {}
  } else {
    stryCov_9fa48("1961");
    const {
      state,
      requested,
      volume
    } = useSyncExternalStore(music.subscribe, music.getSnapshot, music.getSnapshot);
    const volumeId = useId();
    const status = (stryMutAct_9fa48("1964") ? state.kind !== 'paused' : stryMutAct_9fa48("1963") ? false : stryMutAct_9fa48("1962") ? true : (stryCov_9fa48("1962", "1963", "1964"), state.kind === (stryMutAct_9fa48("1965") ? "" : (stryCov_9fa48("1965"), 'paused')))) ? (stryMutAct_9fa48("1968") ? state.reason !== 'reference' : stryMutAct_9fa48("1967") ? false : stryMutAct_9fa48("1966") ? true : (stryCov_9fa48("1966", "1967", "1968"), state.reason === (stryMutAct_9fa48("1969") ? "" : (stryCov_9fa48("1969"), 'reference')))) ? stryMutAct_9fa48("1970") ? "" : (stryCov_9fa48("1970"), 'Paused for sound reference') : stryMutAct_9fa48("1971") ? "" : (stryCov_9fa48("1971"), 'Paused for keyboard sound') : (stryMutAct_9fa48("1974") ? state.kind !== 'error' : stryMutAct_9fa48("1973") ? false : stryMutAct_9fa48("1972") ? true : (stryCov_9fa48("1972", "1973", "1974"), state.kind === (stryMutAct_9fa48("1975") ? "" : (stryCov_9fa48("1975"), 'error')))) ? state.message : (stryMutAct_9fa48("1978") ? state.kind !== 'loading' : stryMutAct_9fa48("1977") ? false : stryMutAct_9fa48("1976") ? true : (stryCov_9fa48("1976", "1977", "1978"), state.kind === (stryMutAct_9fa48("1979") ? "" : (stryCov_9fa48("1979"), 'loading')))) ? stryMutAct_9fa48("1980") ? "" : (stryCov_9fa48("1980"), 'Starting music…') : (stryMutAct_9fa48("1983") ? state.kind !== 'playing' : stryMutAct_9fa48("1982") ? false : stryMutAct_9fa48("1981") ? true : (stryCov_9fa48("1981", "1982", "1983"), state.kind === (stryMutAct_9fa48("1984") ? "" : (stryCov_9fa48("1984"), 'playing')))) ? stryMutAct_9fa48("1985") ? "" : (stryCov_9fa48("1985"), 'Playing') : stryMutAct_9fa48("1986") ? "" : (stryCov_9fa48("1986"), 'Music off');
    return <Popover.Root>
      <Popover.Trigger className="music-trigger" aria-label="Music controls" data-playing={stryMutAct_9fa48("1989") ? state.kind !== 'playing' : stryMutAct_9fa48("1988") ? false : stryMutAct_9fa48("1987") ? true : (stryCov_9fa48("1987", "1988", "1989"), state.kind === (stryMutAct_9fa48("1990") ? "" : (stryCov_9fa48("1990"), 'playing')))}>
        <Music2 size={16} />
        <span>Music</span>
        <span className="music-status-dot" aria-hidden="true" />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner side="bottom" align="end" sideOffset={8} collisionPadding={12} positionMethod="fixed" className="music-positioner">
          <Popover.Popup className="music-popup" aria-label="Studio music">
            <Popover.Title>Studio music</Popover.Title>
            <Popover.Description>
              Lofi again <span>by OMF-Games</span>
            </Popover.Description>
            <button className="music-play" onClick={stryMutAct_9fa48("1991") ? () => undefined : (stryCov_9fa48("1991"), () => requested ? music.pause() : void music.play())}>
              {requested ? <Pause size={17} /> : <Play size={17} />}
              {requested ? stryMutAct_9fa48("1992") ? "" : (stryCov_9fa48("1992"), 'Pause music') : stryMutAct_9fa48("1993") ? "" : (stryCov_9fa48("1993"), 'Play music')}
            </button>
            <output data-music-state={state.kind}>{status}</output>
            <label htmlFor={volumeId}>
              Music volume <span>{Math.round(stryMutAct_9fa48("1994") ? volume / 100 : (stryCov_9fa48("1994"), volume * 100))}%</span>
            </label>
            <input id={volumeId} aria-label="Music volume" type="range" min={0} max={100} value={Math.round(stryMutAct_9fa48("1995") ? volume / 100 : (stryCov_9fa48("1995"), volume * 100))} onChange={stryMutAct_9fa48("1996") ? () => undefined : (stryCov_9fa48("1996"), event => music.setVolume(stryMutAct_9fa48("1997") ? Number(event.target.value) * 100 : (stryCov_9fa48("1997"), Number(event.target.value) / 100)))} />
            <p className="music-hint">
              Keyboard sound takes priority. Mute the keyboard to hear music
              while typing.
            </p>
            <a href="https://opengameart.org/content/lofi-again" target="_blank" rel="noreferrer">
              Original track & CC0 license ↗
            </a>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>;
  }
}
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
import { useId, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { maxVolume } from '../lib/build';
import './volume-dial.css';
export default function VolumeDial({
  value,
  enabled,
  canEnable,
  onChange,
  onCommit,
  onToggle
}: {
  value: number;
  enabled: boolean;
  canEnable: boolean;
  onChange: (value: number) => void;
  onCommit: () => void;
  onToggle: () => void;
}) {
  if (stryMutAct_9fa48("4985")) {
    {}
  } else {
    stryCov_9fa48("4985");
    const hint = useId();
    const drag = useRef<{
      id: number;
      y: number;
      value: number;
    } | null>(null);
    const change = stryMutAct_9fa48("4986") ? () => undefined : (stryCov_9fa48("4986"), (() => {
      const change = (next: number) => onChange(stryMutAct_9fa48("4987") ? Math.round(Math.min(maxVolume, Math.max(0, next)) * 100) * 100 : (stryCov_9fa48("4987"), Math.round(stryMutAct_9fa48("4988") ? Math.min(maxVolume, Math.max(0, next)) / 100 : (stryCov_9fa48("4988"), (stryMutAct_9fa48("4989") ? Math.max(maxVolume, Math.max(0, next)) : (stryCov_9fa48("4989"), Math.min(maxVolume, stryMutAct_9fa48("4990") ? Math.min(0, next) : (stryCov_9fa48("4990"), Math.max(0, next))))) * 100)) / 100));
      return change;
    })());
    const percent = Math.round(stryMutAct_9fa48("4991") ? value / 100 : (stryCov_9fa48("4991"), value * 100));
    return <div className="volume-dial">
      <button className="volume-mute" aria-label={enabled ? stryMutAct_9fa48("4992") ? "" : (stryCov_9fa48("4992"), 'Mute keyboard') : stryMutAct_9fa48("4993") ? "" : (stryCov_9fa48("4993"), 'Enable keyboard sound')} aria-pressed={enabled} disabled={stryMutAct_9fa48("4996") ? !enabled || !canEnable : stryMutAct_9fa48("4995") ? false : stryMutAct_9fa48("4994") ? true : (stryCov_9fa48("4994", "4995", "4996"), (stryMutAct_9fa48("4997") ? enabled : (stryCov_9fa48("4997"), !enabled)) && (stryMutAct_9fa48("4998") ? canEnable : (stryCov_9fa48("4998"), !canEnable)))} onClick={onToggle}>
        {(stryMutAct_9fa48("5001") ? enabled || value > 0 : stryMutAct_9fa48("5000") ? false : stryMutAct_9fa48("4999") ? true : (stryCov_9fa48("4999", "5000", "5001"), enabled && (stryMutAct_9fa48("5004") ? value <= 0 : stryMutAct_9fa48("5003") ? value >= 0 : stryMutAct_9fa48("5002") ? true : (stryCov_9fa48("5002", "5003", "5004"), value > 0)))) ? <Volume2 size={19} /> : <VolumeX size={19} />}
      </button>
      <div className="volume-knob">
        <input className="volume-knob-input" type="range" min={0} max={stryMutAct_9fa48("5005") ? maxVolume / 100 : (stryCov_9fa48("5005"), maxVolume * 100)} value={percent} step={1} onChange={stryMutAct_9fa48("5006") ? () => undefined : (stryCov_9fa48("5006"), event => change(stryMutAct_9fa48("5007") ? Number(event.target.value) * 100 : (stryCov_9fa48("5007"), Number(event.target.value) / 100)))} aria-label="Keyboard volume" aria-describedby={hint} aria-valuemin={0} aria-valuemax={stryMutAct_9fa48("5008") ? maxVolume / 100 : (stryCov_9fa48("5008"), maxVolume * 100)} aria-valuenow={percent} aria-valuetext={stryMutAct_9fa48("5009") ? `` : (stryCov_9fa48("5009"), `${percent} percent${enabled ? stryMutAct_9fa48("5010") ? "Stryker was here!" : (stryCov_9fa48("5010"), '') : stryMutAct_9fa48("5011") ? "" : (stryCov_9fa48("5011"), ', sound off')}`)} aria-orientation="vertical" onKeyDown={event => {
          if (stryMutAct_9fa48("5012")) {
            {}
          } else {
            stryCov_9fa48("5012");
            const step = event.shiftKey ? 0.1 : 0.02;
            const next = (stryMutAct_9fa48("5015") ? event.key !== 'Home' : stryMutAct_9fa48("5014") ? false : stryMutAct_9fa48("5013") ? true : (stryCov_9fa48("5013", "5014", "5015"), event.key === (stryMutAct_9fa48("5016") ? "" : (stryCov_9fa48("5016"), 'Home')))) ? 0 : (stryMutAct_9fa48("5019") ? event.key !== 'End' : stryMutAct_9fa48("5018") ? false : stryMutAct_9fa48("5017") ? true : (stryCov_9fa48("5017", "5018", "5019"), event.key === (stryMutAct_9fa48("5020") ? "" : (stryCov_9fa48("5020"), 'End')))) ? maxVolume : (stryMutAct_9fa48("5023") ? event.key !== 'PageUp' : stryMutAct_9fa48("5022") ? false : stryMutAct_9fa48("5021") ? true : (stryCov_9fa48("5021", "5022", "5023"), event.key === (stryMutAct_9fa48("5024") ? "" : (stryCov_9fa48("5024"), 'PageUp')))) ? stryMutAct_9fa48("5025") ? value - 0.2 : (stryCov_9fa48("5025"), value + 0.2) : (stryMutAct_9fa48("5028") ? event.key !== 'PageDown' : stryMutAct_9fa48("5027") ? false : stryMutAct_9fa48("5026") ? true : (stryCov_9fa48("5026", "5027", "5028"), event.key === (stryMutAct_9fa48("5029") ? "" : (stryCov_9fa48("5029"), 'PageDown')))) ? stryMutAct_9fa48("5030") ? value + 0.2 : (stryCov_9fa48("5030"), value - 0.2) : (stryMutAct_9fa48("5033") ? event.key === 'ArrowUp' && event.key === 'ArrowRight' : stryMutAct_9fa48("5032") ? false : stryMutAct_9fa48("5031") ? true : (stryCov_9fa48("5031", "5032", "5033"), (stryMutAct_9fa48("5035") ? event.key !== 'ArrowUp' : stryMutAct_9fa48("5034") ? false : (stryCov_9fa48("5034", "5035"), event.key === (stryMutAct_9fa48("5036") ? "" : (stryCov_9fa48("5036"), 'ArrowUp')))) || (stryMutAct_9fa48("5038") ? event.key !== 'ArrowRight' : stryMutAct_9fa48("5037") ? false : (stryCov_9fa48("5037", "5038"), event.key === (stryMutAct_9fa48("5039") ? "" : (stryCov_9fa48("5039"), 'ArrowRight')))))) ? stryMutAct_9fa48("5040") ? value - step : (stryCov_9fa48("5040"), value + step) : (stryMutAct_9fa48("5043") ? event.key === 'ArrowDown' && event.key === 'ArrowLeft' : stryMutAct_9fa48("5042") ? false : stryMutAct_9fa48("5041") ? true : (stryCov_9fa48("5041", "5042", "5043"), (stryMutAct_9fa48("5045") ? event.key !== 'ArrowDown' : stryMutAct_9fa48("5044") ? false : (stryCov_9fa48("5044", "5045"), event.key === (stryMutAct_9fa48("5046") ? "" : (stryCov_9fa48("5046"), 'ArrowDown')))) || (stryMutAct_9fa48("5048") ? event.key !== 'ArrowLeft' : stryMutAct_9fa48("5047") ? false : (stryCov_9fa48("5047", "5048"), event.key === (stryMutAct_9fa48("5049") ? "" : (stryCov_9fa48("5049"), 'ArrowLeft')))))) ? stryMutAct_9fa48("5050") ? value + step : (stryCov_9fa48("5050"), value - step) : null;
            if (stryMutAct_9fa48("5053") ? next !== null : stryMutAct_9fa48("5052") ? false : stryMutAct_9fa48("5051") ? true : (stryCov_9fa48("5051", "5052", "5053"), next === null)) return;
            if (stryMutAct_9fa48("5054")) {
              ;
            } else {
              stryCov_9fa48("5054");
              event.preventDefault();
            }
            if (stryMutAct_9fa48("5055")) {
              ;
            } else {
              stryCov_9fa48("5055");
              event.stopPropagation();
            }
            if (stryMutAct_9fa48("5056")) {
              ;
            } else {
              stryCov_9fa48("5056");
              change(next);
            }
          }
        }} onKeyUp={onCommit} onBlur={onCommit} onPointerDown={event => {
          if (stryMutAct_9fa48("5057")) {
            {}
          } else {
            stryCov_9fa48("5057");
            if (stryMutAct_9fa48("5060") ? event.button === 0 : stryMutAct_9fa48("5059") ? false : stryMutAct_9fa48("5058") ? true : (stryCov_9fa48("5058", "5059", "5060"), event.button !== 0)) return;
            if (stryMutAct_9fa48("5061")) {
              ;
            } else {
              stryCov_9fa48("5061");
              event.preventDefault();
            }
            if (stryMutAct_9fa48("5062")) {
              ;
            } else {
              stryCov_9fa48("5062");
              event.currentTarget.focus();
            }
            if (stryMutAct_9fa48("5063")) {
              ;
            } else {
              stryCov_9fa48("5063");
              event.currentTarget.setPointerCapture(event.pointerId);
            }
            drag.current = stryMutAct_9fa48("5064") ? {} : (stryCov_9fa48("5064"), {
              id: event.pointerId,
              y: event.clientY,
              value
            });
          }
        }} onPointerMove={event => {
          if (stryMutAct_9fa48("5065")) {
            {}
          } else {
            stryCov_9fa48("5065");
            const active = drag.current;
            if (stryMutAct_9fa48("5068") ? active?.id !== event.pointerId : stryMutAct_9fa48("5067") ? false : stryMutAct_9fa48("5066") ? true : (stryCov_9fa48("5066", "5067", "5068"), (stryMutAct_9fa48("5069") ? active.id : (stryCov_9fa48("5069"), active?.id)) === event.pointerId)) change(stryMutAct_9fa48("5071") ? active.value - (active.y - event.clientY) / 75 : (stryCov_9fa48("5071"), active.value + (stryMutAct_9fa48("5072") ? (active.y - event.clientY) * 75 : (stryCov_9fa48("5072"), (stryMutAct_9fa48("5073") ? active.y + event.clientY : (stryCov_9fa48("5073"), active.y - event.clientY)) / 75))));
          }
        }} onLostPointerCapture={() => {
          if (stryMutAct_9fa48("5074")) {
            {}
          } else {
            stryCov_9fa48("5074");
            drag.current = null;
            if (stryMutAct_9fa48("5075")) {
              ;
            } else {
              stryCov_9fa48("5075");
              onCommit();
            }
          }
        }} onPointerUp={event => {
          if (stryMutAct_9fa48("5076")) {
            {}
          } else {
            stryCov_9fa48("5076");
            if (stryMutAct_9fa48("5078") ? false : stryMutAct_9fa48("5077") ? true : (stryCov_9fa48("5077", "5078"), event.currentTarget.hasPointerCapture(event.pointerId))) if (stryMutAct_9fa48("5079")) {
              ;
            } else {
              stryCov_9fa48("5079");
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
          }
        }} />
        <span aria-hidden="true" className="volume-knob-face" style={stryMutAct_9fa48("5080") ? {} : (stryCov_9fa48("5080"), {
          transform: stryMutAct_9fa48("5081") ? `` : (stryCov_9fa48("5081"), `rotate(${stryMutAct_9fa48("5082") ? -135 - value / maxVolume * 270 : (stryCov_9fa48("5082"), (stryMutAct_9fa48("5083") ? +135 : (stryCov_9fa48("5083"), -135)) + (stryMutAct_9fa48("5084") ? value / maxVolume / 270 : (stryCov_9fa48("5084"), (stryMutAct_9fa48("5085") ? value * maxVolume : (stryCov_9fa48("5085"), value / maxVolume)) * 270)))}deg)`)
        })}>
          <span />
        </span>
      </div>
      <div className="volume-reading">
        <span>{enabled ? stryMutAct_9fa48("5086") ? "" : (stryCov_9fa48("5086"), 'Volume') : stryMutAct_9fa48("5087") ? "" : (stryCov_9fa48("5087"), 'Sound off')}</span>
        <output>
          {percent}
          <small>%</small>
        </output>
      </div>
      <span className="sr-only" id={hint}>
        Drag up to turn up, or use arrow keys. Home is zero; End is 200 percent.
        Above 100 percent adds gain.
      </span>
    </div>;
  }
}
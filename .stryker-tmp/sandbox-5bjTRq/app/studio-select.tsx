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
import { Select } from '@base-ui/react/select';
import { Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import './studio-select.css';
export type StudioSelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};
export type StudioSelectProps = {
  id?: string;
  'aria-label'?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: readonly StudioSelectOption[];
  placeholder?: string;
  disabled?: boolean;
};
export default function StudioSelect({
  id,
  'aria-label': ariaLabel,
  value,
  onValueChange,
  options,
  placeholder = stryMutAct_9fa48("4584") ? "" : (stryCov_9fa48("4584"), 'Choose an option'),
  disabled = stryMutAct_9fa48("4585") ? true : (stryCov_9fa48("4585"), false)
}: StudioSelectProps) {
  if (stryMutAct_9fa48("4586")) {
    {}
  } else {
    stryCov_9fa48("4586");
    const [trigger, setTrigger] = useState<HTMLButtonElement | null>(null);
    return <Select.Root id={id} items={options} value={(stryMutAct_9fa48("4589") ? value === '' || !options.some(option => option.value === '') : stryMutAct_9fa48("4588") ? false : stryMutAct_9fa48("4587") ? true : (stryCov_9fa48("4587", "4588", "4589"), (stryMutAct_9fa48("4591") ? value !== '' : stryMutAct_9fa48("4590") ? true : (stryCov_9fa48("4590", "4591"), value === (stryMutAct_9fa48("4592") ? "Stryker was here!" : (stryCov_9fa48("4592"), '')))) && (stryMutAct_9fa48("4593") ? options.some(option => option.value === '') : (stryCov_9fa48("4593"), !(stryMutAct_9fa48("4594") ? options.every(option => option.value === '') : (stryCov_9fa48("4594"), options.some(stryMutAct_9fa48("4595") ? () => undefined : (stryCov_9fa48("4595"), option => stryMutAct_9fa48("4598") ? option.value !== '' : stryMutAct_9fa48("4597") ? false : stryMutAct_9fa48("4596") ? true : (stryCov_9fa48("4596", "4597", "4598"), option.value === (stryMutAct_9fa48("4599") ? "Stryker was here!" : (stryCov_9fa48("4599"), ''))))))))))) ? null : value} onValueChange={nextValue => {
      if (stryMutAct_9fa48("4600")) {
        {}
      } else {
        stryCov_9fa48("4600");
        if (stryMutAct_9fa48("4603") ? nextValue === null : stryMutAct_9fa48("4602") ? false : stryMutAct_9fa48("4601") ? true : (stryCov_9fa48("4601", "4602", "4603"), nextValue !== null)) if (stryMutAct_9fa48("4604")) {
          ;
        } else {
          stryCov_9fa48("4604");
          onValueChange(nextValue);
        }
      }
    }} disabled={disabled} modal={stryMutAct_9fa48("4605") ? true : (stryCov_9fa48("4605"), false)}>
      <Select.Trigger ref={setTrigger} aria-label={ariaLabel} className="studio-select-trigger">
        <Select.Value className="studio-select-value" placeholder={placeholder} />
        <Select.Icon className="studio-select-chevron">
          <ChevronDown size={16} aria-hidden="true" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal container={stryMutAct_9fa48("4606") ? trigger?.closest('dialog') && undefined : (stryCov_9fa48("4606"), (stryMutAct_9fa48("4607") ? trigger.closest('dialog') : (stryCov_9fa48("4607"), trigger?.closest(stryMutAct_9fa48("4608") ? "" : (stryCov_9fa48("4608"), 'dialog')))) ?? undefined)}>
        <Select.Positioner className="studio-select-positioner" positionMethod="fixed" side="bottom" align="start" sideOffset={6} alignItemWithTrigger={stryMutAct_9fa48("4609") ? true : (stryCov_9fa48("4609"), false)} collisionPadding={8} collisionAvoidance={stryMutAct_9fa48("4610") ? {} : (stryCov_9fa48("4610"), {
          side: stryMutAct_9fa48("4611") ? "" : (stryCov_9fa48("4611"), 'flip'),
          align: stryMutAct_9fa48("4612") ? "" : (stryCov_9fa48("4612"), 'shift'),
          fallbackAxisSide: stryMutAct_9fa48("4613") ? "" : (stryCov_9fa48("4613"), 'none')
        })}>
          <Select.Popup className="studio-select-popup">
            <Select.List className="studio-select-list" aria-label={ariaLabel}>
              {options.map(stryMutAct_9fa48("4614") ? () => undefined : (stryCov_9fa48("4614"), option => <Select.Item className="studio-select-option" key={option.value} value={option.value} label={option.label} disabled={option.disabled}>
                  <Select.ItemText className="studio-select-option-label">
                    {option.label}
                  </Select.ItemText>
                  <Select.ItemIndicator className="studio-select-indicator">
                    <Check size={16} aria-hidden="true" />
                  </Select.ItemIndicator>
                </Select.Item>))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>;
  }
}
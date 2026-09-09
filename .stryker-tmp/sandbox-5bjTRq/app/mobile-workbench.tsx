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
import { useState, type KeyboardEvent, type ReactNode } from 'react';
import { ChevronDown, ChevronUp, Expand, PencilLine } from 'lucide-react';
import './mobile-workbench.css';
export type WorkbenchTab = 'design' | 'parts' | 'sound';
type InspectorState = 'collapsed' | 'editing' | 'expanded';
const tabs = (stryMutAct_9fa48("1881") ? [] : (stryCov_9fa48("1881"), [stryMutAct_9fa48("1882") ? "" : (stryCov_9fa48("1882"), 'design'), stryMutAct_9fa48("1883") ? "" : (stryCov_9fa48("1883"), 'parts'), stryMutAct_9fa48("1884") ? "" : (stryCov_9fa48("1884"), 'sound')])) satisfies WorkbenchTab[];
const tabLabels: Record<WorkbenchTab, string> = stryMutAct_9fa48("1885") ? {} : (stryCov_9fa48("1885"), {
  design: stryMutAct_9fa48("1886") ? "" : (stryCov_9fa48("1886"), 'Design'),
  parts: stryMutAct_9fa48("1887") ? "" : (stryCov_9fa48("1887"), 'Components'),
  sound: stryMutAct_9fa48("1888") ? "" : (stryCov_9fa48("1888"), 'Sound')
});
function adjacentTab({
  tab,
  direction
}: {
  tab: WorkbenchTab;
  direction: -1 | 1;
}): WorkbenchTab {
  if (stryMutAct_9fa48("1889")) {
    {}
  } else {
    stryCov_9fa48("1889");
    const index = tabs.indexOf(tab);
    return tabs[stryMutAct_9fa48("1890") ? (index + direction + tabs.length) * tabs.length : (stryCov_9fa48("1890"), (stryMutAct_9fa48("1891") ? index + direction - tabs.length : (stryCov_9fa48("1891"), (stryMutAct_9fa48("1892") ? index - direction : (stryCov_9fa48("1892"), index + direction)) + tabs.length)) % tabs.length)];
  }
}
export default function MobileWorkbench({
  activeTab,
  children,
  footer,
  onTabChange
}: {
  activeTab: WorkbenchTab;
  children: ReactNode;
  footer: ReactNode;
  onTabChange: (tab: WorkbenchTab) => void;
}) {
  if (stryMutAct_9fa48("1893")) {
    {}
  } else {
    stryCov_9fa48("1893");
    const [inspectorState, setInspectorState] = useState<InspectorState>(stryMutAct_9fa48("1894") ? "" : (stryCov_9fa48("1894"), 'editing'));
    function selectTab(next: WorkbenchTab) {
      if (stryMutAct_9fa48("1895")) {
        {}
      } else {
        stryCov_9fa48("1895");
        if (stryMutAct_9fa48("1896")) {
          ;
        } else {
          stryCov_9fa48("1896");
          onTabChange(next);
        }
        setInspectorState(stryMutAct_9fa48("1898") ? "" : (stryCov_9fa48("1898"), 'editing'));
      }
    }
    function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, tab: WorkbenchTab) {
      if (stryMutAct_9fa48("1899")) {
        {}
      } else {
        stryCov_9fa48("1899");
        const next = (stryMutAct_9fa48("1902") ? event.key !== 'ArrowRight' : stryMutAct_9fa48("1901") ? false : stryMutAct_9fa48("1900") ? true : (stryCov_9fa48("1900", "1901", "1902"), event.key === (stryMutAct_9fa48("1903") ? "" : (stryCov_9fa48("1903"), 'ArrowRight')))) ? adjacentTab(stryMutAct_9fa48("1904") ? {} : (stryCov_9fa48("1904"), {
          tab,
          direction: 1
        })) : (stryMutAct_9fa48("1907") ? event.key !== 'ArrowLeft' : stryMutAct_9fa48("1906") ? false : stryMutAct_9fa48("1905") ? true : (stryCov_9fa48("1905", "1906", "1907"), event.key === (stryMutAct_9fa48("1908") ? "" : (stryCov_9fa48("1908"), 'ArrowLeft')))) ? adjacentTab(stryMutAct_9fa48("1909") ? {} : (stryCov_9fa48("1909"), {
          tab,
          direction: stryMutAct_9fa48("1910") ? +1 : (stryCov_9fa48("1910"), -1)
        })) : (stryMutAct_9fa48("1913") ? event.key !== 'Home' : stryMutAct_9fa48("1912") ? false : stryMutAct_9fa48("1911") ? true : (stryCov_9fa48("1911", "1912", "1913"), event.key === (stryMutAct_9fa48("1914") ? "" : (stryCov_9fa48("1914"), 'Home')))) ? tabs[0] : (stryMutAct_9fa48("1917") ? event.key !== 'End' : stryMutAct_9fa48("1916") ? false : stryMutAct_9fa48("1915") ? true : (stryCov_9fa48("1915", "1916", "1917"), event.key === (stryMutAct_9fa48("1918") ? "" : (stryCov_9fa48("1918"), 'End')))) ? tabs[stryMutAct_9fa48("1919") ? tabs.length + 1 : (stryCov_9fa48("1919"), tabs.length - 1)] : undefined;
        if (stryMutAct_9fa48("1922") ? false : stryMutAct_9fa48("1921") ? true : stryMutAct_9fa48("1920") ? next : (stryCov_9fa48("1920", "1921", "1922"), !next)) return;
        if (stryMutAct_9fa48("1923")) {
          ;
        } else {
          stryCov_9fa48("1923");
          event.preventDefault();
        }
        if (stryMutAct_9fa48("1924")) {
          ;
        } else {
          stryCov_9fa48("1924");
          selectTab(next);
        }
        stryMutAct_9fa48("1925") ? document.getElementById('tab-' + next).focus() : (stryCov_9fa48("1925"), document.getElementById((stryMutAct_9fa48("1926") ? "" : (stryCov_9fa48("1926"), 'tab-')) + next)?.focus());
      }
    }
    const inspectorOpen = stryMutAct_9fa48("1929") ? inspectorState === 'collapsed' : stryMutAct_9fa48("1928") ? false : stryMutAct_9fa48("1927") ? true : (stryCov_9fa48("1927", "1928", "1929"), inspectorState !== (stryMutAct_9fa48("1930") ? "" : (stryCov_9fa48("1930"), 'collapsed')));
    const catalogExpanded = stryMutAct_9fa48("1933") ? inspectorState !== 'expanded' : stryMutAct_9fa48("1932") ? false : stryMutAct_9fa48("1931") ? true : (stryCov_9fa48("1931", "1932", "1933"), inspectorState === (stryMutAct_9fa48("1934") ? "" : (stryCov_9fa48("1934"), 'expanded')));
    return <aside className="config mobile-workbench-inspector" data-inspector-state={inspectorState} id="build-settings" aria-label="Keyboard configuration">
      <div className="mobile-workbench-handle" aria-hidden="true" />
      <div className="config-title">
        <div>
          <h2>Your build</h2>
          <span className="pill">Live preview</span>
        </div>
        <div className="mobile-workbench-actions">
          <button aria-controls={(stryMutAct_9fa48("1935") ? "" : (stryCov_9fa48("1935"), 'panel-')) + activeTab} aria-expanded={inspectorOpen} className="mobile-workbench-action" onClick={stryMutAct_9fa48("1936") ? () => undefined : (stryCov_9fa48("1936"), () => setInspectorState(inspectorOpen ? stryMutAct_9fa48("1937") ? "" : (stryCov_9fa48("1937"), 'collapsed') : stryMutAct_9fa48("1938") ? "" : (stryCov_9fa48("1938"), 'editing')))}>
            {inspectorOpen ? <ChevronDown size={16} /> : <PencilLine size={16} />}
            {inspectorOpen ? stryMutAct_9fa48("1939") ? "" : (stryCov_9fa48("1939"), 'Collapse') : stryMutAct_9fa48("1940") ? "" : (stryCov_9fa48("1940"), 'Edit')}
          </button>
          <button aria-controls={(stryMutAct_9fa48("1941") ? "" : (stryCov_9fa48("1941"), 'panel-')) + activeTab} aria-expanded={catalogExpanded} className="mobile-workbench-action" onClick={stryMutAct_9fa48("1942") ? () => undefined : (stryCov_9fa48("1942"), () => setInspectorState(catalogExpanded ? stryMutAct_9fa48("1943") ? "" : (stryCov_9fa48("1943"), 'editing') : stryMutAct_9fa48("1944") ? "" : (stryCov_9fa48("1944"), 'expanded')))}>
            {catalogExpanded ? <ChevronUp size={16} /> : <Expand size={16} />}
            {catalogExpanded ? stryMutAct_9fa48("1945") ? "" : (stryCov_9fa48("1945"), 'Compact') : stryMutAct_9fa48("1946") ? "" : (stryCov_9fa48("1946"), 'Catalog')}
          </button>
        </div>
      </div>
      <div className="config-tabs" role="tablist" aria-label="Build settings">
        {tabs.map(stryMutAct_9fa48("1947") ? () => undefined : (stryCov_9fa48("1947"), tab => <button key={tab} role="tab" id={(stryMutAct_9fa48("1948") ? "" : (stryCov_9fa48("1948"), 'tab-')) + tab} aria-controls={(stryMutAct_9fa48("1949") ? "" : (stryCov_9fa48("1949"), 'panel-')) + tab} tabIndex={(stryMutAct_9fa48("1952") ? activeTab !== tab : stryMutAct_9fa48("1951") ? false : stryMutAct_9fa48("1950") ? true : (stryCov_9fa48("1950", "1951", "1952"), activeTab === tab)) ? 0 : stryMutAct_9fa48("1953") ? +1 : (stryCov_9fa48("1953"), -1)} onKeyDown={stryMutAct_9fa48("1954") ? () => undefined : (stryCov_9fa48("1954"), event => handleTabKeyDown(event, tab))} aria-selected={stryMutAct_9fa48("1957") ? activeTab !== tab : stryMutAct_9fa48("1956") ? false : stryMutAct_9fa48("1955") ? true : (stryCov_9fa48("1955", "1956", "1957"), activeTab === tab)} onClick={stryMutAct_9fa48("1958") ? () => undefined : (stryCov_9fa48("1958"), () => selectTab(tab))}>
            {tabLabels[tab]}
          </button>))}
      </div>
      <div className="config-scroll" role="tabpanel" id={(stryMutAct_9fa48("1959") ? "" : (stryCov_9fa48("1959"), 'panel-')) + activeTab} aria-labelledby={(stryMutAct_9fa48("1960") ? "" : (stryCov_9fa48("1960"), 'tab-')) + activeTab} tabIndex={0}>
        {children}
      </div>
      <div className="config-footer">{footer}</div>
    </aside>;
  }
}
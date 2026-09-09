'use client';

import { useState, type KeyboardEvent, type ReactNode } from 'react';
import { ChevronDown, ChevronUp, Expand, PencilLine } from 'lucide-react';
import './mobile-workbench.css';

export type WorkbenchTab = 'design' | 'parts' | 'sound';

type InspectorState = 'collapsed' | 'editing' | 'expanded';

const tabs = ['design', 'parts', 'sound'] satisfies WorkbenchTab[];

const tabLabels: Record<WorkbenchTab, string> = {
  design: 'Design',
  parts: 'Components',
  sound: 'Sound',
};

function adjacentTab({
  tab,
  direction,
}: {
  tab: WorkbenchTab;
  direction: -1 | 1;
}): WorkbenchTab {
  const index = tabs.indexOf(tab);
  return tabs[(index + direction + tabs.length) % tabs.length];
}

export default function MobileWorkbench({
  activeTab,
  children,
  footer,
  onTabChange,
}: {
  activeTab: WorkbenchTab;
  children: ReactNode;
  footer: ReactNode;
  onTabChange: (tab: WorkbenchTab) => void;
}) {
  const [inspectorState, setInspectorState] =
    useState<InspectorState>('editing');

  function selectTab(next: WorkbenchTab) {
    onTabChange(next);
    setInspectorState('editing');
  }

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    tab: WorkbenchTab,
  ) {
    const next =
      event.key === 'ArrowRight'
        ? adjacentTab({ tab, direction: 1 })
        : event.key === 'ArrowLeft'
          ? adjacentTab({ tab, direction: -1 })
          : event.key === 'Home'
            ? tabs[0]
            : event.key === 'End'
              ? tabs[tabs.length - 1]
              : undefined;
    if (!next) return;
    event.preventDefault();
    selectTab(next);
    document.getElementById('tab-' + next)?.focus();
  }

  const inspectorOpen = inspectorState !== 'collapsed';
  const catalogExpanded = inspectorState === 'expanded';

  return (
    <aside
      className="config mobile-workbench-inspector"
      data-inspector-state={inspectorState}
      id="build-settings"
      aria-label="Keyboard configuration"
    >
      <div className="mobile-workbench-handle" aria-hidden="true" />
      <div className="config-title">
        <div>
          <h2>Your build</h2>
          <span className="pill">Live preview</span>
        </div>
        <div className="mobile-workbench-actions">
          <button
            aria-controls={'panel-' + activeTab}
            aria-expanded={inspectorOpen}
            className="mobile-workbench-action"
            onClick={() =>
              setInspectorState(inspectorOpen ? 'collapsed' : 'editing')
            }
          >
            {inspectorOpen ? (
              <ChevronDown size={16} />
            ) : (
              <PencilLine size={16} />
            )}
            {inspectorOpen ? 'Collapse' : 'Edit'}
          </button>
          <button
            aria-controls={'panel-' + activeTab}
            aria-expanded={catalogExpanded}
            className="mobile-workbench-action"
            onClick={() =>
              setInspectorState(catalogExpanded ? 'editing' : 'expanded')
            }
          >
            {catalogExpanded ? <ChevronUp size={16} /> : <Expand size={16} />}
            {catalogExpanded ? 'Compact' : 'Catalog'}
          </button>
        </div>
      </div>
      <div className="config-tabs" role="tablist" aria-label="Build settings">
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            id={'tab-' + tab}
            aria-controls={'panel-' + tab}
            tabIndex={activeTab === tab ? 0 : -1}
            onKeyDown={(event) => handleTabKeyDown(event, tab)}
            aria-selected={activeTab === tab}
            onClick={() => selectTab(tab)}
          >
            {tabLabels[tab]}
          </button>
        ))}
      </div>
      <div
        className="config-scroll"
        role="tabpanel"
        id={'panel-' + activeTab}
        aria-labelledby={'tab-' + activeTab}
        tabIndex={0}
      >
        {children}
      </div>
      <div className="config-footer">{footer}</div>
    </aside>
  );
}

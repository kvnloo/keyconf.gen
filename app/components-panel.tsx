'use client';
import { useState } from 'react';
import { ArrowUpRight, Check, CircleAlert, Plus, Search } from 'lucide-react';
import {
  categories,
  type Category,
  type FitCheck,
  type Part,
  type Selection,
} from '../lib/catalog';
import {
  assemblies,
  catalogObservedAt,
  type Assembly,
} from '../lib/component-data';
import TechnologyGuide from './technology-guide';
import StudioSelect from './studio-select';

const labels: Record<Category, string> = {
  case: 'Case',
  pcb: 'PCB',
  plate: 'Plate',
  switch: 'Switches',
  keycaps: 'Keycaps',
  stabilizers: 'Stabilizers',
};
export default function ComponentsPanel({
  parts,
  selection,
  checks,
  onSelect,
  onAssembly,
  onImport,
  onResearch,
}: {
  parts: Part[];
  selection: Selection;
  checks: FitCheck[];
  onSelect: (part: Part) => void;
  onAssembly: (assembly: Assembly) => void;
  onImport: () => void;
  onResearch: () => void;
}) {
  const [category, setCategory] = useState<Category>('switch');
  const [query, setQuery] = useState('');
  const [technology, setTechnology] = useState('all');
  const assembly = assemblies.find(
    (a) =>
      a.selection.case === selection.case &&
      a.selection.pcb === selection.pcb &&
      a.selection.plate === selection.plate,
  );
  const matches = parts.filter(
    (part) =>
      part.category === category &&
      (technology === 'all' ||
        category !== 'switch' ||
        (technology === 'contact'
          ? part.family === 'mx'
          : ['he', 'keychron-double-rail'].includes(part.family))) &&
      `${part.name} ${part.brand} ${part.detail}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const conflicts = checks.filter(
    (check) => check.status === 'incompatible',
  ).length;
  return (
    <>
      <div className="part-intro">
        <h3>Find your combination.</h3>
        <p className="muted">
          Start with a related set of parts, then make it yours. The 3D model
          shows a design study, not a scan of the selected product.
        </p>
      </div>
      <label htmlFor="starting-assembly">Starting assembly</label>
      <StudioSelect
        id="starting-assembly"
        value={assembly?.id ?? ''}
        onValueChange={(value) => {
          const selected = assemblies.find((a) => a.id === value);
          if (selected) onAssembly(selected);
        }}
        options={[
          {
            value: '',
            label: 'Mixed parts · choose an assembly',
            disabled: true,
          },
          ...assemblies.map((item) => ({
            value: item.id,
            label: `${item.layout}% · ${item.brand} ${item.name}${item.availability === 'retired' ? ' · retired' : ''}`,
          })),
        ]}
      />
      {assembly && (
        <div className="assembly-note">
          <span className="pill">
            {assembly.layout}% · {assembly.mount}
          </span>
          <p>{assembly.note}</p>
          <a href={assembly.source} target="_blank" rel="noreferrer">
            Assembly documentation <ArrowUpRight size={14} />
          </a>
        </div>
      )}
      <div className="parts-heading">
        <h4>Your parts</h4>
        <a className={conflicts ? 'conflict-link' : ''} href="#fit-checks">
          {conflicts
            ? `${conflicts} ${conflicts === 1 ? 'conflict' : 'conflicts'}`
            : 'Review fit'}{' '}
          <CircleAlert size={14} />
        </a>
      </div>
      <fieldset className="component-slots" aria-label="Component categories">
        {categories.map((item) => (
          <button
            key={item}
            aria-pressed={category === item}
            onClick={() => {
              setCategory(item);
              setQuery('');
              setTechnology('all');
            }}
          >
            <span>{labels[item]}</span>
            <strong>
              {parts.find((part) => part.id === selection[item])?.name ??
                'Choose a part'}
            </strong>
          </button>
        ))}
      </fieldset>
      <div className="parts-heading">
        <h4>Browse {labels[category].toLowerCase()}</h4>
        <span>
          {matches.length} {matches.length === 1 ? 'reference' : 'references'}
        </span>
      </div>
      <label className="catalog-search">
        <Search size={17} aria-hidden="true" />
        <input
          type="search"
          aria-label="Search components"
          placeholder="Search name, brand or specification"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      {category === 'switch' && (
        <fieldset
          className="catalog-filters"
          aria-label="Switch technology filter"
        >
          {[
            ['all', 'All'],
            ['contact', 'Contact'],
            ['magnetic', 'Magnetic'],
          ].map(([value, label]) => (
            <button
              key={value}
              aria-pressed={technology === value}
              onClick={() => setTechnology(value)}
            >
              {label}
            </button>
          ))}
        </fieldset>
      )}
      <div className="catalog-results">
        {matches.map((part) => (
          <article
            className={
              'catalog-card' +
              (selection[category] === part.id ? ' selected' : '')
            }
            key={part.id}
          >
            <button
              className="catalog-choice"
              aria-label={`Use ${part.brand} ${part.name}`}
              aria-pressed={selection[category] === part.id}
              onClick={() => {
                if (selection[part.category] !== part.id) onSelect(part);
              }}
            >
              <span className="catalog-brand">{part.brand}</span>
              <strong>{part.name}</strong>
              <span>{part.detail}</span>
              <span className="catalog-pick">
                {selection[category] === part.id ? (
                  <>
                    <Check size={14} /> In your build
                  </>
                ) : (
                  <>
                    <Plus size={14} /> Use this part
                  </>
                )}
              </span>
            </button>
            <a href={part.source} target="_blank" rel="noreferrer">
              {part.evidence === 'documented'
                ? 'Product documentation'
                : 'Unverified reference'}{' '}
              <ArrowUpRight size={14} />
            </a>
          </article>
        ))}
        {!matches.length && (
          <div className="catalog-empty">
            <h4>No matching parts yet.</h4>
            <p>
              Try a shorter search, change the filter, or add a product from its
              store.
            </p>
            <button
              className="text-button"
              onClick={() => {
                setQuery('');
                setTechnology('all');
              }}
            >
              Clear search and filters
            </button>
          </div>
        )}
      </div>
      <button className="text-button" onClick={onImport}>
        <Plus size={15} /> Add products from a website
      </button>
      <div className="fit-panel" id="fit-checks" tabIndex={-1}>
        <h3>
          {conflicts
            ? `${conflicts} fit ${conflicts === 1 ? 'conflict' : 'conflicts'}`
            : 'Compatibility review'}
        </h3>
        {checks.map((check) => (
          <a
            key={check.title}
            className={'fit-check ' + check.status}
            href={check.source || undefined}
            target="_blank"
            rel="noreferrer"
          >
            {check.status === 'documented' ? (
              <Check size={16} />
            ) : (
              <CircleAlert size={16} />
            )}
            <span>
              <strong>{check.title}</strong>
              <small>{check.detail}</small>
              <em>
                {check.status === 'documented'
                  ? 'Documented relationship'
                  : check.status === 'incompatible'
                    ? 'Incompatible'
                    : 'Needs review'}
              </em>
            </span>
          </a>
        ))}
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
    </>
  );
}

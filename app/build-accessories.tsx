'use client';

import { useState } from 'react';
import {
  accessoryCatalog,
  assessAccessories,
  parseAccessories,
  newAccessorySelection,
  type AccessorySelection,
} from '../lib/build-accessories';
import StudioSelect from './studio-select';
import './build-accessories.css';

export default function BuildAccessories({
  selections,
  onChange,
}: {
  selections: AccessorySelection[];
  onChange: (selections: AccessorySelection[]) => void;
}) {
  const [notice, setNotice] = useState('');
  const assessments = assessAccessories(selections);
  function update(next: AccessorySelection) {
    onChange(selections.map((item) => (item.id === next.id ? next : item)));
  }
  return (
    <details className="build-accessories">
      <summary>
        Accessories & artisan caps <span>{selections.length || 'Explore'}</span>
      </summary>
      <p>
        Plan the finishing touches. These selections save with your build;
        accessory geometry is not yet shown in the studio.
      </p>
      <p>
        Fit needs checking against your exact board. A replacement knob does not
        add an encoder or firmware support.
      </p>
      <div className="accessory-selections">
        {selections.map((item) => {
          const product = accessoryCatalog.find(
            (part) => part.id === item.productId,
          );
          if (!product) return null;
          const fit = assessments[item.id];
          const location = item.location;
          return (
            <article key={item.id}>
              <div className="accessory-heading">
                <h4>{product.name}</h4>
                <button
                  type="button"
                  className="text-button"
                  aria-label={`Remove ${product.name}`}
                  onClick={() => {
                    onChange(selections.filter((part) => part.id !== item.id));
                    setNotice(`${product.name} removed.`);
                  }}
                >
                  Remove
                </button>
              </div>
              <p>
                {product.brand} · {product.kind}
              </p>
              {location.kind === 'external' ? (
                <StudioSelect
                  aria-label={`Position for ${product.name}`}
                  value={location.position}
                  options={[
                    { value: 'left', label: 'Left of keyboard' },
                    { value: 'right', label: 'Right of keyboard' },
                    { value: 'above', label: 'Above keyboard' },
                  ]}
                  onValueChange={(position) => {
                    if (
                      position === 'left' ||
                      position === 'right' ||
                      position === 'above'
                    )
                      update({
                        ...item,
                        location: { kind: 'external', position },
                      });
                  }}
                />
              ) : (
                <label className="accessory-placement">
                  {location.kind === 'key' ? 'Target key' : 'Board slot'}
                  <input
                    aria-label={`${location.kind === 'key' ? 'Target key' : 'Board slot'} for ${product.name}`}
                    key={
                      location.kind === 'key' ? location.keyId : location.slotId
                    }
                    defaultValue={
                      location.kind === 'key' ? location.keyId : location.slotId
                    }
                    maxLength={80}
                    onBlur={(event) => {
                      const value = event.target.value;
                      if (!value.trim())
                        event.target.value =
                          location.kind === 'key'
                            ? location.keyId
                            : location.slotId;
                      else {
                        try {
                          const next = parseAccessories([
                            {
                              ...item,
                              location:
                                location.kind === 'key'
                                  ? { kind: 'key', keyId: value }
                                  : { kind: 'embedded', slotId: value },
                            },
                          ])[0];
                          update(next);
                          setNotice(
                            'Placement saved. Physical fit still needs checking.',
                          );
                        } catch {
                          event.target.value =
                            location.kind === 'key'
                              ? location.keyId
                              : location.slotId;
                          setNotice(
                            'Use letters, numbers, dots, dashes, underscores or colons for a key or slot identifier.',
                          );
                        }
                      }
                    }}
                  />
                </label>
              )}
              <p className="accessory-fit">
                Fit {fit.status}: {fit.reasons.join(' ')}
              </p>
              <a href={product.source} target="_blank" rel="noreferrer">
                Maker specifications ↗
              </a>
            </article>
          );
        })}
      </div>
      <details className="accessory-picker">
        <summary>Add an accessory</summary>
        <div className="accessory-options">
          {accessoryCatalog.map((product) => (
            <article key={product.id}>
              <h4>{product.name}</h4>
              <p>{product.detail}</p>
              <div className="accessory-heading">
                <a href={product.source} target="_blank" rel="noreferrer">
                  {product.brand} ↗
                </a>
                <button
                  type="button"
                  className="text-button"
                  disabled={selections.length >= 32}
                  onClick={() => {
                    onChange([
                      ...selections,
                      newAccessorySelection(product.id),
                    ]);
                    setNotice(
                      `${product.name} added to your build plan. Fit is not verified.`,
                    );
                  }}
                >
                  Add <span className="sr-only">{product.name}</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </details>
      <output>{notice}</output>
    </details>
  );
}

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
import layouts from '../public/models/layouts.json';
import type { Build } from '../lib/build';
import './build-accessories.css';

export default function BuildAccessories({
  selections,
  layout,
  onChange,
}: {
  selections: AccessorySelection[];
  layout: Build['layout'];
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
        Assign artisan caps to keys or place a macropad beside your keyboard.
        Previews use original illustrative geometry, not the maker&apos;s sculpt
        or exact product dimensions.
      </p>
      <p>
        Up to six external module previews are shown, one per selection.
        Embedded electronics remain a build plan until board support is
        documented. Fit needs checking against your exact board. A replacement
        knob does not add an encoder or firmware support.
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
              ) : location.kind === 'key' ? (
                <>
                  <StudioSelect
                    aria-label={`Target key for ${product.name}`}
                    value={location.keyId}
                    options={[
                      { value: 'unassigned', label: 'Choose a key' },
                      ...(!layouts[layout].some(
                        (key) => key.code === location.keyId,
                      ) && location.keyId !== 'unassigned'
                        ? [
                            {
                              value: location.keyId,
                              label: `${location.keyId} · absent from this layout`,
                              disabled: true,
                            },
                          ]
                        : []),
                      ...layouts[layout].map((key) => ({
                        value: key.code,
                        label: `${key.label || key.code} · ${key.code} · ${key.width}u${key.width !== product.sizeU ? ' · different width' : ''}`,
                        disabled:
                          key.width !== product.sizeU ||
                          selections.some(
                            (other) =>
                              other.id !== item.id &&
                              other.location.kind === 'key' &&
                              other.location.keyId === key.code,
                          ),
                      })),
                    ]}
                    onValueChange={(keyId) =>
                      update({ ...item, location: { kind: 'key', keyId } })
                    }
                  />
                  <p>
                    Key choices follow the {layout}% visual study. Matching
                    width does not verify stem, profile or clearance.
                  </p>
                </>
              ) : (
                <label className="accessory-placement">
                  Board slot
                  <input
                    aria-label={`Board slot for ${product.name}`}
                    key={location.slotId}
                    defaultValue={location.slotId}
                    maxLength={80}
                    onBlur={(event) => {
                      const value = event.target.value;
                      if (!value.trim()) event.target.value = location.slotId;
                      else {
                        try {
                          const next = parseAccessories([
                            {
                              ...item,
                              location: { kind: 'embedded', slotId: value },
                            },
                          ])[0];
                          update(next);
                          setNotice(
                            'Placement saved. Physical fit still needs checking.',
                          );
                        } catch {
                          event.target.value = location.slotId;
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

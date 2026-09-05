'use client';

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
  placeholder = 'Choose an option',
  disabled = false,
}: StudioSelectProps) {
  const [trigger, setTrigger] = useState<HTMLButtonElement | null>(null);

  return (
    <Select.Root
      id={id}
      items={options}
      value={
        value === '' && !options.some((option) => option.value === '')
          ? null
          : value
      }
      onValueChange={(nextValue) => {
        if (nextValue !== null) onValueChange(nextValue);
      }}
      disabled={disabled}
      modal={false}
    >
      <Select.Trigger
        ref={setTrigger}
        aria-label={ariaLabel}
        className="studio-select-trigger"
      >
        <Select.Value
          className="studio-select-value"
          placeholder={placeholder}
        />
        <Select.Icon className="studio-select-chevron">
          <ChevronDown size={16} aria-hidden="true" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal container={trigger?.closest('dialog') ?? undefined}>
        <Select.Positioner
          className="studio-select-positioner"
          positionMethod="fixed"
          side="bottom"
          align="start"
          sideOffset={6}
          alignItemWithTrigger={false}
          collisionPadding={8}
          collisionAvoidance={{
            side: 'flip',
            align: 'shift',
            fallbackAxisSide: 'none',
          }}
        >
          <Select.Popup className="studio-select-popup">
            <Select.List className="studio-select-list" aria-label={ariaLabel}>
              {options.map((option) => (
                <Select.Item
                  className="studio-select-option"
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  disabled={option.disabled}
                >
                  <Select.ItemText className="studio-select-option-label">
                    {option.label}
                  </Select.ItemText>
                  <Select.ItemIndicator className="studio-select-indicator">
                    <Check size={16} aria-hidden="true" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

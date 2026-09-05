'use client';
import { useEffect } from 'react';

export function useHistoryShortcuts(
  enabled: boolean,
  dispatch: (action: { kind: 'undo' | 'redo' }) => void,
) {
  useEffect(() => {
    if (!enabled) return;
    const shortcut = (event: KeyboardEvent) => {
      if (
        !(event.ctrlKey || event.metaKey) ||
        event.altKey ||
        document.querySelector('dialog[open]')
      )
        return;
      if (
        event.target instanceof HTMLElement &&
        event.target.closest(
          'input,textarea,select,[contenteditable],[role="combobox"],[role="listbox"],[role="option"]',
        )
      )
        return;
      if (event.key.toLowerCase() === 'z') {
        event.preventDefault();
        dispatch({ kind: event.shiftKey ? 'redo' : 'undo' });
      } else if (event.key.toLowerCase() === 'y') {
        event.preventDefault();
        dispatch({ kind: 'redo' });
      }
    };
    window.addEventListener('keydown', shortcut);
    return () => window.removeEventListener('keydown', shortcut);
  }, [enabled, dispatch]);
}

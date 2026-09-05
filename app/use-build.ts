'use client';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import {
  buildReducer,
  decodeBuild,
  defaultBuild,
  initialHistory,
  parseCustomParts,
  readBuildFile,
  type Build,
} from '../lib/build';

const storageKey = 'keyconf-build-v1';
export function useBuild(notify: (message: string) => void) {
  const [history, dispatch] = useReducer(buildReducer, initialHistory);
  const [ready, setReady] = useState(false);
  const [saveState, setSaveState] = useState<
    'loading' | 'saving' | 'saved' | 'unavailable'
  >('loading');
  const current = useRef(history.present);
  const canPersist = useRef(true);
  current.current = history.present;

  useEffect(() => {
    let saved = defaultBuild;
    let raw: string | null = null;
    try {
      raw = localStorage.getItem(storageKey);
      saved = raw
        ? readBuildFile(raw)
        : {
            ...defaultBuild,
            customParts: parseCustomParts(
              JSON.parse(localStorage.getItem('keyconf-parts') || '[]'),
            ),
          };
    } catch {
      if (raw) {
        try {
          localStorage.setItem('keyconf-build-recovery', raw);
        } catch {
          canPersist.current = false;
        }
      }
      notify(
        'The saved build could not be restored. Open a build file to recover your design, or continue with a new one.',
      );
    }
    dispatch({ kind: 'restore', build: saved });
    const restoreLink = () => {
      if (!location.hash.startsWith('#build=')) return;
      try {
        dispatch({ kind: 'edit', patch: decodeBuild(location.hash.slice(7)) });
        window.history.replaceState(
          null,
          '',
          location.pathname + location.search,
        );
        notify('Shared build opened. Changes save on this device.');
      } catch (error) {
        notify(
          error instanceof Error
            ? error.message
            : 'The build link could not be opened.',
        );
      }
    };
    restoreLink();
    setReady(true);
    window.addEventListener('hashchange', restoreLink);
    return () => window.removeEventListener('hashchange', restoreLink);
  }, [notify]);

  useEffect(() => {
    if (!ready) return;
    setSaveState('saving');
    const save = () => {
      if (!canPersist.current) {
        setSaveState('unavailable');
        return;
      }
      try {
        localStorage.setItem(storageKey, JSON.stringify(current.current));
        setSaveState('saved');
      } catch {
        setSaveState('unavailable');
      }
    };
    const timer = setTimeout(save, 250);
    window.addEventListener('pagehide', save);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('pagehide', save);
    };
  }, [history.present, ready]);

  const edit = useCallback(
    (patch: Partial<Build>, group?: string) =>
      dispatch({ kind: 'edit', patch, group }),
    [],
  );
  const commit = useCallback(() => dispatch({ kind: 'commit' }), []);
  const undo = useCallback(() => dispatch({ kind: 'undo' }), []);
  const redo = useCallback(() => dispatch({ kind: 'redo' }), []);

  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if (
        !(event.ctrlKey || event.metaKey) ||
        event.altKey ||
        document.querySelector('dialog[open]')
      )
        return;
      if (
        event.target instanceof HTMLElement &&
        event.target.closest('input,textarea,select,[contenteditable]')
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
  }, []);

  return {
    build: history.present,
    ready,
    saveState,
    edit,
    commit,
    undo,
    redo,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
  };
}

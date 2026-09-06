'use client';
import { useCallback, useEffect, useReducer, useRef } from 'react';
import { useHistoryShortcuts } from './use-history-shortcuts';
import { previewStorageKey } from '../lib/preview-storage';
import {
  buildReducer,
  decodeBuild,
  defaultBuild,
  initialHistory,
  parseCustomParts,
  readBuildFile,
  type Build,
  type BuildAction,
  type BuildHistory,
} from '../lib/build';

export function useBuild(
  notify: (message: string) => void,
  { shortcutsEnabled = true }: { shortcutsEnabled?: boolean } = {},
) {
  const storageKey = previewStorageKey('keyconf-build-v1');
  const [{ history, ready, persisted }, dispatch] = useReducer(
    (
      state: {
        history: BuildHistory;
        ready: boolean;
        persisted: { build: Build; status: 'saved' | 'unavailable' } | null;
      },
      action:
        | BuildAction
        | { kind: 'loaded'; build: Build; fromStorage: boolean }
        | { kind: 'persisted'; build: Build; status: 'saved' | 'unavailable' },
    ) => {
      if (action.kind === 'persisted')
        return {
          ...state,
          persisted: { build: action.build, status: action.status },
        };
      if (action.kind === 'loaded')
        return {
          history: buildReducer(state.history, {
            kind: 'restore',
            build: action.build,
          }),
          ready: true,
          persisted: action.fromStorage
            ? { build: action.build, status: 'saved' as const }
            : null,
        };
      return {
        ...state,
        history: buildReducer(state.history, action),
        ready: state.ready || action.kind === 'restore',
      };
    },
    { history: initialHistory, ready: false, persisted: null },
  );
  const saveState = !ready
    ? 'loading'
    : persisted?.status === 'unavailable'
      ? 'unavailable'
      : persisted?.build === history.present
        ? 'saved'
        : 'saving';
  const savedBuild = persisted?.status === 'saved' ? persisted.build : null;
  const canPersist = useRef(true);
  const latestBuild = useRef<Build | null>(null);
  useEffect(
    () => () => {
      if (canPersist.current && latestBuild.current) {
        try {
          localStorage.setItem(storageKey, JSON.stringify(latestBuild.current));
        } catch {
          /* Storage recovery stays available through exported builds. */
        }
      }
    },
    [storageKey],
  );

  useEffect(() => {
    if (location.hash.startsWith('#preview=')) return;
    let saved = defaultBuild;
    let raw: string | null = null;
    let fromStorage = false;
    try {
      raw = localStorage.getItem(storageKey);
      saved = raw
        ? readBuildFile(raw)
        : {
            ...defaultBuild,
            customParts: parseCustomParts(
              JSON.parse(
                localStorage.getItem(previewStorageKey('keyconf-parts')) ||
                  '[]',
              ),
            ),
          };
      fromStorage = !!raw;
    } catch {
      if (raw) {
        try {
          localStorage.setItem(
            previewStorageKey('keyconf-build-recovery'),
            raw,
          );
        } catch {
          canPersist.current = false;
        }
      }
      notify(
        'The saved build could not be restored. Open a build file to recover your design, or continue with a new one.',
      );
    }
    dispatch({ kind: 'loaded', build: saved, fromStorage });
    const restoreLink = () => {
      if (!location.hash.startsWith('#build=')) return;
      try {
        dispatch({ kind: 'edit', patch: decodeBuild(location.hash.slice(7)) });
        window.history.replaceState(
          null,
          '',
          location.pathname + location.search + '#studio',
        );
        notify(
          'Shared build opened in your studio. Undo returns to your previous build.',
        );
      } catch (error) {
        notify(
          error instanceof Error
            ? error.message
            : 'The build link could not be opened.',
        );
      }
    };
    restoreLink();
    window.addEventListener('hashchange', restoreLink);
    return () => window.removeEventListener('hashchange', restoreLink);
  }, [notify, storageKey]);

  useEffect(() => {
    if (!ready) return;
    if (savedBuild === history.present) {
      latestBuild.current = null;
      return;
    }
    latestBuild.current = history.present;
    const save = () => {
      if (latestBuild.current !== history.present) return;
      if (!canPersist.current) {
        dispatch({
          kind: 'persisted',
          build: history.present,
          status: 'unavailable',
        });
        return;
      }
      try {
        localStorage.setItem(storageKey, JSON.stringify(history.present));
        latestBuild.current = null;
        dispatch({
          kind: 'persisted',
          build: history.present,
          status: 'saved',
        });
      } catch {
        dispatch({
          kind: 'persisted',
          build: history.present,
          status: 'unavailable',
        });
      }
    };
    const timer = setTimeout(save, 250);
    window.addEventListener('pagehide', save);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('pagehide', save);
    };
  }, [history.present, ready, storageKey, savedBuild]);

  const edit = useCallback(
    (patch: Partial<Build>, group?: string) =>
      dispatch({ kind: 'edit', patch, group }),
    [],
  );
  const commit = useCallback(() => dispatch({ kind: 'commit' }), []);
  const undo = useCallback(() => dispatch({ kind: 'undo' }), []);
  const redo = useCallback(() => dispatch({ kind: 'redo' }), []);

  useHistoryShortcuts(shortcutsEnabled, dispatch);

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

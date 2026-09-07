'use client';
import { useSyncExternalStore } from 'react';

export function createLastKey() {
  let key = '';
  const listeners = new Set<() => void>();
  return {
    press(code: string) {
      const next = code.replace('Key', '').replace('Digit', '');
      if (key === next) return;
      key = next;
      for (const listener of listeners) listener();
    },
    getSnapshot: () => key,
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

export default function LastKey({
  source,
}: {
  source: ReturnType<typeof createLastKey>;
}) {
  const key = useSyncExternalStore(
    source.subscribe,
    source.getSnapshot,
    source.getSnapshot,
  );
  return (
    <div className="last-key">
      Last key <kbd>{key || '—'}</kbd>
    </div>
  );
}

'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import type {
  SceneOptions,
  SceneStatus,
  createKeyboardScene,
} from '../lib/keyboard-scene';
export type { SceneOptions } from '../lib/keyboard-scene';

export default function KeyboardScene({
  options,
  onPress,
  onRelease,
  children,
}: {
  children?: ReactNode;
  options: SceneOptions;
  onPress: (code: string) => void;
  onRelease: (code: string) => void;
}) {
  const host = useRef<HTMLFieldSetElement>(null);
  const controller = useRef<ReturnType<typeof createKeyboardScene> | null>(
    null,
  );
  const latest = useRef({ options, onPress, onRelease });
  const [status, setStatus] = useState<SceneStatus>({ kind: 'loading' });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    latest.current = { options, onPress, onRelease };
    controller.current?.update(options, {
      press: onPress,
      release: onRelease,
      status: setStatus,
    });
  }, [options, onPress, onRelease]);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let cancelled = false;
    void import('../lib/keyboard-scene')
      .then(({ createKeyboardScene }) => {
        if (cancelled) return;
        const { options, onPress, onRelease } = latest.current;
        controller.current = createKeyboardScene(element, options, {
          press: onPress,
          release: onRelease,
          status: setStatus,
        });
      })
      .catch(() => {
        if (!cancelled)
          setStatus({
            kind: 'error',
            message:
              '3D needs a browser with hardware acceleration. Check your connection and try again.',
          });
      });
    return () => {
      cancelled = true;
      controller.current?.dispose();
      controller.current = null;
    };
  }, [attempt]);
  return (
    <fieldset
      className="scene-host"
      ref={host}
      data-scene-status={status.kind}
      aria-label="Interactive keyboard preview"
    >
      {children}
      {status.kind === 'loading' && (
        <output className="model-status">Preparing your keyboard…</output>
      )}
      {status.kind === 'error' && (
        <div className="model-status" role="alert">
          <p>{status.message}</p>
          <button
            className="button secondary"
            onClick={() => {
              setStatus({ kind: 'loading' });
              setAttempt((n) => n + 1);
            }}
          >
            Try 3D again
          </button>
        </div>
      )}
    </fieldset>
  );
}

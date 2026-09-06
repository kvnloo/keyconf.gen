'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowLeft, RotateCcw } from 'lucide-react';
import { parseTypingMessage } from '../lib/typing-test';

export default function TypingTest({
  onPress,
  onRelease,
  onExit,
}: {
  onPress: (code: string) => void;
  onRelease: (code: string) => void;
  onExit: () => void;
}) {
  const frame = useRef<HTMLIFrameElement>(null);
  const callbacks = useRef({ onPress, onRelease });
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    'loading',
  );
  const [attempt, setAttempt] = useState(0);
  const [height, setHeight] = useState(320);
  useEffect(() => {
    callbacks.current = { onPress, onRelease };
  }, [onPress, onRelease]);
  useEffect(() => {
    const held = new Set<string>();
    const clear = () => {
      for (const code of held) callbacks.current.onRelease(code);
      held.clear();
      window.dispatchEvent(
        new CustomEvent('keyconf-demo', { detail: { reset: true } }),
      );
    };
    const timeout = window.setTimeout(() => setStatus('error'), 30000);
    const receive = (event: MessageEvent<unknown>) => {
      if (
        event.source !== frame.current?.contentWindow ||
        event.origin !== window.location.origin
      )
        return;
      const message = parseTypingMessage(event.data);
      if (!message) return;
      if (message.event === 'ready') {
        clearTimeout(timeout);
        setStatus('ready');
      } else if (message.event === 'height') setHeight(message.height);
      else if (message.event === 'clear') clear();
      else if (message.event === 'key') {
        if (message.down) {
          if (held.has(message.code)) return;
          held.add(message.code);
          callbacks.current.onPress(message.code);
        } else {
          if (!held.delete(message.code)) return;
          callbacks.current.onRelease(message.code);
        }
        window.dispatchEvent(
          new CustomEvent('keyconf-demo', { detail: message }),
        );
      }
    };
    window.addEventListener('message', receive);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('message', receive);
      clear();
    };
  }, [attempt]);
  return (
    <section className="typing-widget" aria-label="Monkeytype typing test">
      <div className="typing-heading">
        <button className="button secondary compact" onClick={onExit}>
          <ArrowLeft size={16} /> Back to builder
        </button>
        <div className="typing-title">
          <strong>Monkeytype</strong>
          <span>Guest test</span>
        </div>
        <a href="https://monkeytype.com/" target="_blank" rel="noreferrer">
          Open Monkeytype <ArrowUpRight size={14} />
        </a>
      </div>
      {/* oxlint-disable jsx-a11y/no-noninteractive-tabindex -- Keyboard users need to scroll this monitor viewport to reach results. */}
      <section
        className="monitor-display"
        tabIndex={0}
        aria-label="Monitor screen. Scroll for test results and settings."
      >
        {status !== 'ready' && (
          <div
            className="typing-load"
            role={status === 'error' ? 'alert' : 'status'}
          >
            {status === 'loading' ? (
              'Preparing your typing test…'
            ) : (
              <>
                <p>The typing test could not load.</p>
                <button
                  className="button secondary"
                  onClick={() => {
                    setStatus('loading');
                    setAttempt((n) => n + 1);
                  }}
                >
                  <RotateCcw size={16} /> Retry typing test
                </button>
              </>
            )}
          </div>
        )}
        <iframe
          key={attempt}
          ref={frame}
          src="monkeytype/index.html"
          title="Monkeytype guest typing test"
          className="typing-frame"
          style={{ height }}
          onLoad={() => {
            const document = frame.current?.contentDocument;
            if (!document?.head) return;
            const theme = document.createElement('style');
            theme.textContent = `:root { --bg-color: #18221c !important; --main-color: #d7dfbb !important; --caret-color: #e5c788 !important; --sub-color: #a0b29e !important; --sub-alt-color: #223229 !important; --text-color: #f1eedf !important; --error-color: #f29581 !important; --error-extra-color: #c95d4b !important; }`;
            document.head.appendChild(theme);
          }}
          onError={() => setStatus('error')}
        />
      </section>
      {/* oxlint-enable jsx-a11y/no-noninteractive-tabindex */}
      <div className="typing-footer">
        <span>Type to begin. Your keyboard responds below.</span>
        <a href="monkeytype/source.html" target="_blank" rel="noreferrer">
          Monkeytype source · GPLv3
        </a>
      </div>
    </section>
  );
}

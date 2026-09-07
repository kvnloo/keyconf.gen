'use client';
import { useRef, useState } from 'react';
import { Copy } from 'lucide-react';
import type { Build } from '../lib/build';
import { previewLink } from '../lib/shared-preview';

export default function BuildFeedback({
  build,
  linkMode = 'preview',
}: {
  build: Build;
  linkMode?: 'preview' | 'publication' | 'root-preview' | 'file';
}) {
  const [note, setNote] = useState('');
  const [receipt, setReceipt] = useState('');
  const [manualCopy, setManualCopy] = useState('');
  const fallback = useRef<HTMLTextAreaElement | null>(null);
  async function copy() {
    let link: string;
    try {
      link =
        linkMode === 'file'
          ? ''
          : linkMode === 'publication'
            ? window.location.href
            : previewLink(
                build,
                linkMode === 'root-preview'
                  ? new URL('/', window.location.href).href
                  : window.location.href,
              );
    } catch {
      setReceipt(
        'This build is too large for a link. Download your variation and share the file with your notes.',
      );
      setManualCopy(note.trim());
      return;
    }
    const message = `Feedback on ${build.name}\n\n${note.trim()}\n\n${linkMode === 'file' ? 'Attach the downloaded build file to this message.' : `Build preview: ${link}`}`;
    setManualCopy('');
    try {
      await navigator.clipboard.writeText(message);
      setReceipt('Copied. Paste it into your conversation with the builder.');
    } catch {
      setManualCopy(message);
      setReceipt('Select and copy the message below with your browser menu.');
    }
  }
  return (
    <details className="preview-feedback">
      <summary>Feedback for the builder</summary>
      <p>
        What would you keep or change?{' '}
        {linkMode === 'file'
          ? 'Copy your notes and attach the downloaded build file in your conversation.'
          : 'Copy your notes with this build link and share them in your conversation.'}
      </p>
      <label htmlFor="build-feedback-note">Your notes</label>
      <textarea
        id="build-feedback-note"
        rows={4}
        maxLength={2000}
        value={note}
        placeholder="I love the green accents. Could we try a quieter switch?"
        onChange={(event) => {
          setNote(event.target.value);
          setReceipt('');
          setManualCopy('');
        }}
      />
      <p className="preview-tip">
        Notes stay here until you leave this preview. Nothing is sent
        automatically.
      </p>
      <button
        className="preview-customize"
        disabled={!note.trim()}
        onClick={copy}
      >
        <Copy size={16} />{' '}
        {linkMode === 'file' ? 'Copy notes' : 'Copy notes & build link'}
      </button>
      <output aria-live="polite">{receipt}</output>
      {manualCopy && (
        <>
          <label htmlFor="build-feedback-copy">Message to copy</label>
          <textarea
            id="build-feedback-copy"
            ref={fallback}
            rows={5}
            readOnly
            value={manualCopy}
            onFocus={() => fallback.current?.select()}
          />
        </>
      )}
    </details>
  );
}

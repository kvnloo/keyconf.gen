'use client';
import { useSyncExternalStore } from 'react';
import { previewChannel } from '../lib/preview-storage';
import './preview-label.css';

const subscribe = () => () => {};
const serverChannel = () => null;

export default function PreviewLabel({ fallback }: { fallback?: 'beta' }) {
  const channel = useSyncExternalStore(
    subscribe,
    previewChannel,
    serverChannel,
  );
  if (!channel) return fallback ? <span>{fallback}</span> : null;
  const name = channel === 'nightly' ? 'Nightly' : 'Dev';
  return (
    <span
      className="preview-label"
      title={`${name} preview. Builds saved here stay separate from the stable site.`}
    >
      {name}
    </span>
  );
}

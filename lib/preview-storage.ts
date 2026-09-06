export function previewChannel(): 'dev' | 'nightly' | null {
  if (typeof document === 'undefined') return null;
  const channel = new URL(document.baseURI).pathname.match(
    /^\/keyconf\.gen\/(dev|nightly)\/$/,
  )?.[1];
  return channel === 'dev' || channel === 'nightly' ? channel : null;
}

export function previewStorageKey(key: string): string {
  const channel = previewChannel();
  return channel ? `${key}:${channel}` : key;
}

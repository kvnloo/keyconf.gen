export function previewStorageKey(key: string): string {
  if (typeof document === 'undefined') return key;
  const channel = new URL(document.baseURI).pathname.match(
    /^\/keyconf\.gen\/(dev|nightly)\/$/,
  )?.[1];
  return channel ? `${key}:${channel}` : key;
}

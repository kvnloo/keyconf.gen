export function importEndpoint(location: URL): string {
  if (location.hostname !== 'kvnloo.github.io') return '/api/import';
  return location.pathname.startsWith('/keyconf.gen/nightly/')
    ? 'https://keyconf-nightly.kvnloo.chatgpt.site/api/import'
    : 'https://keyconf-studio.kvnloo.chatgpt.site/api/import';
}

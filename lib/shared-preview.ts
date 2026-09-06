import { decodeBuild, encodeBuild, type Build } from './build.ts';

const prefix = '#preview=';
export type SharedPreview =
  | { kind: 'none' }
  | { kind: 'ready'; build: Build }
  | { kind: 'error'; message: string };

export function sharedPreview(hash: string): SharedPreview {
  if (!hash.startsWith(prefix)) return { kind: 'none' };
  try {
    return { kind: 'ready', build: decodeBuild(hash.slice(prefix.length)) };
  } catch (error) {
    return {
      kind: 'error',
      message:
        error instanceof Error
          ? error.message
          : 'This preview could not be read.',
    };
  }
}

export function previewLink(build: Build, base: string): string {
  const url = new URL(base);
  url.hash = prefix + encodeBuild(build);
  return url.href;
}

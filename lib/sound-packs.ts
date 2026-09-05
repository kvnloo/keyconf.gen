import data from '../data/sound-packs.json' with { type: 'json' };

export type KeyPhase = 'down' | 'up';
type Groups = {
  default: string[];
  Space?: string[];
  Enter?: string[];
  Backspace?: string[];
};
export type SoundPack = {
  id: string;
  name: string;
  creator: string;
  license: string;
  source: string;
  capture: string;
  groups: Record<KeyPhase, Groups>;
};
export const soundPacks: SoundPack[] = data.packs;

export function samplesFor(pack: SoundPack, code: string, phase: KeyPhase) {
  const groups = pack.groups[phase];
  if (code === 'Space') return groups.Space ?? groups.default;
  if (code === 'Enter' || code === 'NumpadEnter')
    return groups.Enter ?? groups.default;
  if (code === 'Backspace' || code === 'Delete')
    return groups.Backspace ?? groups.default;
  return groups.default;
}

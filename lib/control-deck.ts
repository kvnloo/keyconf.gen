export const controlDecks = {
  'grok-bot': {
    name: 'Grok Bot / 01',
    provenance: 'Independent concept',
    source: 'https://x.com/omarsar0/status/2096321091148947887',
    description:
      'A compact home for a hypothetical team of bots. Screen, dial, eleven keycaps and four colored role keys.',
    colors: {
      case: '#495354',
      keys: '#4b575b',
      commands: '#30383b',
      wide: '#e8e9df',
    },
    keys: [
      '1 · Chief',
      '2 · Research',
      '3 · Build',
      '4 · Comms',
      'Q · Focus',
      'W · Routine',
      'E · Approve',
      'R · Pause',
      'A · Voice',
      'Space · Delegate',
      'F · Next task',
    ],
  },
  'codex-micro': {
    name: 'Codex Micro',
    provenance: 'OpenAI × Work Louder · product study',
    source: 'https://openai.com/supply/co-lab/work-louder/',
    description:
      'A study of the compact Codex controller. Six translucent agent caps, command keys, a dial, joystick and touch sensor.',
    colors: {
      case: '#e2e7e4',
      keys: '#c8d1cd',
      commands: '#e9efea',
      wide: '#edf1ea',
    },
    keys: [
      '1–6 · Agent keys',
      'Q · Fast',
      'W · Accept',
      'E · Decline',
      'R · Fork',
      'Space · Voice',
      'Enter · Send',
    ],
  },
};
export type DeckId = keyof typeof controlDecks;
export const deckLighting = ['Studio', 'Daylight', 'After hours'] as const;
export type DeckBuild = {
  version: 1;
  kind: 'control-deck';
  device: DeckId;
  name: string;
  colors: { case: string; keys: string; commands: string; wide: string };
  lighting: (typeof deckLighting)[number];
  dial: number;
};
export function newDeck(device: DeckId): DeckBuild {
  return {
    version: 1,
    kind: 'control-deck',
    device,
    name: controlDecks[device].name,
    colors: { ...controlDecks[device].colors },
    lighting: 'Studio',
    dial: 0.5,
  };
}
function object(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function color(value: unknown): value is string {
  return typeof value === 'string' && /^#[\da-f]{6}$/i.test(value);
}
export function parseDeck(value: unknown): DeckBuild {
  if (
    !object(value) ||
    value.kind !== 'control-deck' ||
    value.version !== 1 ||
    (value.device !== 'grok-bot' && value.device !== 'codex-micro') ||
    typeof value.name !== 'string' ||
    value.name.length > 80 ||
    !object(value.colors) ||
    !color(value.colors.case) ||
    !color(value.colors.keys) ||
    !color(value.colors.commands) ||
    !color(value.colors.wide) ||
    typeof value.dial !== 'number' ||
    !Number.isFinite(value.dial) ||
    value.dial < 0 ||
    value.dial > 1
  )
    throw new Error(
      'This control deck could not be read. Open a complete studio link or choose a preset.',
    );
  const lighting = deckLighting.find((light) => light === value.lighting);
  if (!lighting)
    throw new Error('This control deck has an unsupported lighting setting.');
  return {
    version: 1,
    kind: 'control-deck',
    device: value.device,
    name: value.name.trim() || controlDecks[value.device].name,
    colors: {
      case: value.colors.case,
      keys: value.colors.keys,
      commands: value.colors.commands,
      wide: value.colors.wide,
    },
    lighting,
    dial: value.dial,
  };
}
export function encodeDeck(deck: DeckBuild) {
  return btoa(
    Array.from(new TextEncoder().encode(JSON.stringify(deck)), (byte) =>
      String.fromCharCode(byte),
    ).join(''),
  )
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replace(/=+$/, '');
}
export function decodeDeck(encoded: string): DeckBuild {
  if (!/^[\w-]{1,4000}$/.test(encoded))
    throw new Error('This control deck link is incomplete.');
  try {
    const bytes = Uint8Array.from(
      atob(encoded.replaceAll('-', '+').replaceAll('_', '/')),
      (c) => c.charCodeAt(0),
    );
    return parseDeck(
      JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes)),
    );
  } catch {
    throw new Error(
      'This control deck link could not be read. Open another link or choose a preset.',
    );
  }
}

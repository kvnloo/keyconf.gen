export type TypingMessage =
  | { event: 'ready' | 'clear' }
  | { event: 'height'; height: number }
  | { event: 'key'; code: string; down: boolean };

export function parseTypingMessage(value: unknown): TypingMessage | null {
  if (
    !value ||
    typeof value !== 'object' ||
    !('type' in value) ||
    value.type !== 'keyconf:monkeytype' ||
    !('event' in value)
  )
    return null;
  if (value.event === 'ready' || value.event === 'clear')
    return { event: value.event };
  if (
    value.event === 'height' &&
    'height' in value &&
    typeof value.height === 'number' &&
    Number.isFinite(value.height)
  )
    return {
      event: 'height',
      height: Math.min(720, Math.max(260, value.height)),
    };
  if (
    value.event === 'key' &&
    'code' in value &&
    typeof value.code === 'string' &&
    /^(Key[A-Z]|Digit[0-9]|Space|Backspace|Enter|ShiftLeft|ShiftRight|Comma|Period|Slash|Semicolon|Quote|BracketLeft|BracketRight|Backslash|Minus|Equal|Backquote)$/.test(
      value.code,
    ) &&
    'down' in value &&
    typeof value.down === 'boolean'
  )
    return { event: 'key', code: value.code, down: value.down };
  return null;
}

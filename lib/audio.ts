import { samplePreview } from './audio-preview';
import {
  samplesFor,
  soundPacks,
  type KeyPhase,
  type SoundPack,
} from './sound-packs';

export type SoundSettings = {
  enabled: boolean;
  character: 'linear' | 'tactile' | 'clicky';
  volume: number;
  damping: number;
  material: string;
  source: { kind: 'recorded'; id: string } | { kind: 'synthesized' };
};
export class KeyboardAudio {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private buffers = new Map<string, Map<string, AudioBuffer>>();
  private pending = new Map<string, Promise<void>>();
  private cursor = new Map<string, number>();
  private voices = new Set<AudioScheduledSourceNode>();
  private abort = new AbortController();

  private getContext() {
    if (!this.context) {
      this.context = new AudioContext({ latencyHint: 'interactive' });
      this.master = this.context.createGain();
      this.master.gain.value = 0;
      this.master.connect(this.context.destination);
    }
    return this.context;
  }

  async unlock() {
    const ctx = this.getContext();
    if (ctx.state === 'suspended') await ctx.resume();
  }

  setLevel(enabled: boolean, volume: number) {
    if (!this.context || !this.master) return;
    const time = this.context.currentTime;
    const gain = this.master.gain;
    const current = gain.value;
    gain.cancelScheduledValues(time);
    gain.setValueAtTime(current, time);
    gain.linearRampToValueAtTime(enabled ? volume : 0, time + 0.016);
  }

  preview(pack: SoundPack) {
    const file = pack.groups.down.default[0];
    const buffer = this.buffers.get(pack.id)?.get(file);
    return buffer ? samplePreview(buffer) : null;
  }

  prepare(pack: SoundPack) {
    if (this.buffers.has(pack.id)) return Promise.resolve();
    const pending = this.pending.get(pack.id);
    if (pending) return pending;
    const ctx = this.getContext();
    const files = new Set(
      [
        ...Object.values(pack.groups.down),
        ...Object.values(pack.groups.up),
      ].flatMap((group) => group ?? []),
    );
    const loading = Promise.all(
      Array.from(files, async (file) => {
        const url = new URL(`sounds/${pack.id}/${file}`, document.baseURI);
        const response = await fetch(url, { signal: this.abort.signal });
        if (!response.ok)
          throw new Error('Recording could not load. Try again.');
        const buffer = await ctx.decodeAudioData(await response.arrayBuffer());
        const entry: [string, AudioBuffer] = [file, buffer];
        return entry;
      }),
    )
      .then((entries) => {
        if (this.context === ctx && ctx.state !== 'closed')
          this.buffers.set(pack.id, new Map(entries));
      })
      .finally(() => this.pending.delete(pack.id));
    this.pending.set(pack.id, loading);
    return loading;
  }

  private track(source: AudioScheduledSourceNode, dispose: () => void) {
    this.voices.add(source);
    source.onended = () => {
      this.voices.delete(source);
      dispose();
    };
  }

  stop() {
    for (const voice of this.voices) voice.stop();
    this.voices.clear();
  }

  play(code: string, s: SoundSettings, phase: KeyPhase = 'down', at?: number) {
    if (!s.enabled) return;
    const ctx = this.getContext();
    if (ctx.state !== 'running') return;
    const t = Math.max(ctx.currentTime, at ?? ctx.currentTime);
    const output = this.master ?? ctx.destination;
    if (s.source.kind === 'recorded') {
      const id = s.source.id;
      const pack = soundPacks.find((pack) => pack.id === id);
      if (!pack) return;
      const files = samplesFor(pack, code, phase);
      const group = `${pack.id}/${phase}/${files.join(',')}`;
      const cursor = this.cursor.get(group) ?? 0;
      const file = files[cursor % files.length];
      const buffer = this.buffers.get(pack.id)?.get(file);
      if (!buffer) return;
      this.cursor.set(group, cursor + 1);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(output);
      this.track(source, () => {
        source.disconnect();
      });
      source.start(t);
      return;
    }
    if (phase === 'up') return;
    const space = code === 'Space';
    const duration = space ? 0.19 : 0.1;
    const buffer = ctx.createBuffer(
      1,
      Math.ceil(ctx.sampleRate * duration),
      ctx.sampleRate,
    );
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++)
      data[i] =
        (Math.random() * 2 - 1) *
        Math.exp(-i / (ctx.sampleRate * (0.007 + (1 - s.damping) * 0.012)));
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = space
      ? 450
      : s.character === 'clicky'
        ? 2600
        : s.character === 'tactile'
          ? 1300
          : 750;
    filter.Q.value = 0.6;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.38, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    noise.connect(filter).connect(gain).connect(output);
    noise.start(t);
    noise.stop(t + duration);
    const body = ctx.createOscillator();
    body.type = 'sine';
    body.frequency.setValueAtTime(
      (space ? 180 : 320) * (s.material === 'Brass' ? 1.3 : 1),
      t,
    );
    body.frequency.exponentialRampToValueAtTime(space ? 65 : 115, t + 0.04);
    const bg = ctx.createGain();
    bg.gain.setValueAtTime(0.12, t);
    bg.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    body.connect(bg).connect(output);
    body.start(t);
    body.stop(t + 0.09);
    this.track(noise, () => {
      noise.disconnect();
      filter.disconnect();
      gain.disconnect();
    });
    this.track(body, () => {
      body.disconnect();
      bg.disconnect();
    });
  }

  now() {
    return this.getContext().currentTime;
  }

  close() {
    this.abort.abort();
    this.stop();
    void this.context?.close();
    this.context = null;
    this.master = null;
    this.buffers.clear();
  }
}

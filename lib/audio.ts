export type SoundSettings = {
  enabled: boolean;
  character: 'linear' | 'tactile' | 'clicky';
  volume: number;
  damping: number;
  material: string;
};
export class KeyboardAudio {
  private context: AudioContext | null = null;
  play(code: string, s: SoundSettings) {
    if (!s.enabled) return;
    const ctx = (this.context ??= new AudioContext());
    if (ctx.state === 'suspended') void ctx.resume();
    const t = ctx.currentTime;
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
    gain.gain.setValueAtTime(s.volume * 0.38, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
    noise.connect(filter).connect(gain).connect(ctx.destination);
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
    bg.gain.setValueAtTime(s.volume * 0.12, t);
    bg.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    body.connect(bg).connect(ctx.destination);
    body.start(t);
    body.stop(t + 0.09);
    noise.onended = () => {
      noise.disconnect();
      filter.disconnect();
      gain.disconnect();
    };
    body.onended = () => {
      body.disconnect();
      bg.disconnect();
    };
  }
  close() {
    void this.context?.close();
    this.context = null;
  }
}

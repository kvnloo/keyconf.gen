export type MusicBlocker = 'keyboard' | 'reference';
export type MusicState =
  | { kind: 'off' }
  | { kind: 'loading' }
  | { kind: 'playing' }
  | { kind: 'paused'; reason: MusicBlocker }
  | { kind: 'error'; message: string };
export type MusicSnapshot = {
  state: MusicState;
  requested: boolean;
  volume: number;
};

export class StudioMusic {
  private snapshot: MusicSnapshot = {
    state: { kind: 'off' },
    requested: false,
    volume: 0.12,
  };
  private listeners = new Set<() => void>();
  private blockers = new Set<MusicBlocker>();
  private context: AudioContext | null = null;
  private media: HTMLAudioElement | null = null;
  private source: MediaElementAudioSourceNode | null = null;
  private gain: GainNode | null = null;
  private revision = 0;
  private recovery: ReturnType<typeof setTimeout> | null = null;
  getSnapshot = () => this.snapshot;
  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };
  private publish(state: MusicState, requested = this.snapshot.requested) {
    this.snapshot = { ...this.snapshot, state, requested };
    for (const listener of this.listeners) listener();
  }
  private reason(): MusicBlocker | null {
    return this.blockers.has('reference')
      ? 'reference'
      : this.blockers.has('keyboard')
        ? 'keyboard'
        : null;
  }
  private silence() {
    this.revision++;
    if (this.recovery !== null) clearTimeout(this.recovery);
    this.recovery = null;
    if (this.context && this.gain) {
      this.gain.gain.cancelScheduledValues(this.context.currentTime);
      this.gain.gain.setValueAtTime(0, this.context.currentTime);
    }
    this.media?.pause();
  }
  setBlocked(reason: MusicBlocker, blocked: boolean) {
    if (this.blockers.has(reason) === blocked) return;
    if (blocked) this.blockers.add(reason);
    else this.blockers.delete(reason);
    this.silence();
    if (!this.snapshot.requested) return;
    const remaining = this.reason();
    if (remaining) this.publish({ kind: 'paused', reason: remaining });
    else {
      this.publish({ kind: 'loading' });
      this.recovery = setTimeout(() => {
        this.recovery = null;
        void this.start();
      }, 250);
    }
  }
  setVolume(value: number) {
    if (!Number.isFinite(value)) return;
    const volume = Math.max(0, Math.min(1, value));
    this.snapshot = { ...this.snapshot, volume };
    if (this.snapshot.state.kind === 'playing' && this.context && this.gain) {
      const time = this.context.currentTime;
      this.gain.gain.cancelAndHoldAtTime(time);
      this.gain.gain.linearRampToValueAtTime(volume, time + 0.02);
    }
    for (const listener of this.listeners) listener();
  }
  play() {
    this.silence();
    this.publish({ kind: 'loading' }, true);
    return this.start();
  }
  pause() {
    this.silence();
    this.publish({ kind: 'off' }, false);
  }
  private async start() {
    const revision = this.revision;
    try {
      if (!this.context) {
        this.context = new AudioContext();
        this.media = new Audio();
        this.media.preload = 'none';
        this.media.loop = true;
        this.source = this.context.createMediaElementSource(this.media);
        this.gain = this.context.createGain();
        this.gain.gain.value = 0;
        this.source.connect(this.gain).connect(this.context.destination);
        const media = this.media;
        media.onerror = () => {
          if (this.media !== media) return;
          this.silence();
          this.publish(
            {
              kind: 'error',
              message: 'Music could not load. Try playing it again.',
            },
            false,
          );
        };
      }
      const context = this.context;
      const media = this.media;
      const gain = this.gain;
      if (!media || !gain) return;
      await context.resume();
      if (revision !== this.revision || !this.snapshot.requested) return;
      const reason = this.reason();
      if (reason) {
        this.publish({ kind: 'paused', reason });
        return;
      }
      if (!media.getAttribute('src')) {
        const extension = media.canPlayType('audio/ogg; codecs="vorbis"')
          ? 'ogg'
          : 'mp3';
        media.src = new URL(
          `music/lofi-again.${extension}`,
          document.baseURI,
        ).href;
      }
      if (media.error) media.load();
      await media.play();
      if (
        revision !== this.revision ||
        !this.snapshot.requested ||
        this.reason()
      ) {
        if (this.media !== media || !this.snapshot.requested || this.reason())
          media.pause();
        return;
      }
      gain.gain.cancelScheduledValues(context.currentTime);
      gain.gain.setValueAtTime(0, context.currentTime);
      gain.gain.linearRampToValueAtTime(
        this.snapshot.volume,
        context.currentTime + 0.4,
      );
      this.publish({ kind: 'playing' });
    } catch {
      if (revision !== this.revision) return;
      this.silence();
      this.publish(
        {
          kind: 'error',
          message: 'Music could not start. Press Play to try again.',
        },
        false,
      );
    }
  }
  close() {
    this.pause();
    if (this.media) {
      this.media.onerror = null;
      this.media.removeAttribute('src');
      this.media.load();
    }
    this.source?.disconnect();
    this.gain?.disconnect();
    void this.context?.close();
    this.context = null;
    this.media = null;
    this.source = null;
    this.gain = null;
  }
}

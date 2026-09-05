export type SamplePreview = {
  waveform: number[];
  duration: number;
  sampleRate: number;
  channels: number;
};

export function samplePreview(
  buffer: Pick<
    AudioBuffer,
    'length' | 'duration' | 'sampleRate' | 'numberOfChannels' | 'getChannelData'
  >,
): SamplePreview {
  const samples = buffer.getChannelData(0);
  const bins = 96;
  const waveform = Array.from({ length: bins }, (_, index) => {
    const start = Math.floor((index * samples.length) / bins);
    const end = Math.max(
      start + 1,
      Math.floor(((index + 1) * samples.length) / bins),
    );
    let peak = 0;
    for (let i = start; i < end && i < samples.length; i++)
      peak = Math.max(peak, Math.abs(samples[i]));
    return peak;
  });
  return {
    waveform,
    duration: buffer.duration,
    sampleRate: buffer.sampleRate,
    channels: buffer.numberOfChannels,
  };
}

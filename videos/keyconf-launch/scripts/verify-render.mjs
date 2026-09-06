import { spawnSync } from 'node:child_process';
import { openSync, readSync, closeSync, readdirSync, writeFileSync, statSync } from 'node:fs';

function command(name, args) {
  const result = spawnSync(name, args, { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${name} failed: ${result.stderr}`);
  return result;
}
const file = process.argv[2] ?? 'renders/keyconf-launch.mp4';
const frames = readdirSync('renders/frames').filter(name => /^frame_\d{6}\.png$/.test(name)).sort();
if (frames.length !== 1080) throw new Error(`Expected 1080 frames, received ${frames.length}`);
for (const [i, name] of frames.entries()) {
  if (name !== `frame_${String(i + 1).padStart(6, '0')}.png`) throw new Error(`Missing frame before ${name}`);
  const header = Buffer.alloc(24);
  const fd = openSync(`renders/frames/${name}`, 'r');
  try { readSync(fd, header, 0, 24, 0); } finally { closeSync(fd); }
  if (header.subarray(1, 4).toString() !== 'PNG' || header.readUInt32BE(16) !== 1920 || header.readUInt32BE(20) !== 1080) {
    throw new Error(`Unexpected frame format: ${name}`);
  }
}
const probe = JSON.parse(command('ffprobe', ['-v', 'error', '-count_frames', '-show_streams', '-show_format', '-of', 'json', file]).stdout);
const video = probe.streams.find(s => s.codec_type === 'video');
const audio = probe.streams.find(s => s.codec_type === 'audio');
if (video?.width !== 1920 || video?.height !== 1080 || video?.r_frame_rate !== '30/1' || Number(video?.nb_read_frames) !== 1080) {
  throw new Error('Encoded video dimensions, frame rate or frame count differ from the composition');
}
if (Math.abs(Number(video.duration) - 36) > .001 || Math.abs(Number(audio?.duration) - 36) > .025) throw new Error('Encoded streams have incomplete duration');
if (video.color_space !== 'bt709' || video.color_primaries !== 'bt709' || video.color_transfer !== 'bt709' || video.color_range !== 'tv') throw new Error('Missing Rec.709 video color metadata');
if (audio?.sample_rate !== '48000' || audio?.channels !== 2) throw new Error('Expected 48 kHz stereo audio');
const audit = command('ffmpeg', ['-hide_banner', '-nostats', '-i', file, '-vf', 'blackdetect=d=0.08:pic_th=0.99:pix_th=0.02', '-af', 'loudnorm=I=-18:TP=-1.2:LRA=11:print_format=json', '-f', 'null', '-']).stderr;
if (/black_start:/.test(audit)) throw new Error('A nearly black interval appeared in the encoded film');
const measurements = JSON.parse(audit.slice(audit.lastIndexOf('{'), audit.lastIndexOf('}') + 1));
if (Number(measurements.input_tp) >= 0) throw new Error('Encoded audio exceeds 0 dB true peak');
const report = { ok: true, file, bytes: statSync(file).size, frameCount: 1080, width: 1920, height: 1080, fps: 30, videoDuration: video.duration, audioDuration: audio.duration, audioSampleRate: audio.sample_rate, audioChannels: audio.channels, integratedLUFS: Number(measurements.input_i), truePeakDbTP: Number(measurements.input_tp), blackIntervals: 0 };
writeFileSync('docs/video-probe.json', JSON.stringify(probe, null, 2) + '\n');
writeFileSync('docs/frame-export.json', JSON.stringify(report, null, 2) + '\n');
writeFileSync('renders/encoded-audit.log', audit);
console.log(JSON.stringify(report, null, 2));

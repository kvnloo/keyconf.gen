import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

function run(command, args) {
  const result = spawnSync(command, args, { stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

if (!process.argv.includes('--encode-only')) {
  run(process.execPath, [resolve('node_modules/hyperframes/bin/hyperframes.mjs'),
    'render', '--format', 'png-sequence', '--quality', 'high', '--fps', '30',
    '--workers', '2', '--video-frame-format', 'png', '--frames-cache-dir',
    '.hyperframes/frame-cache', '--output', 'renders/frames']);
}
const frames = readdirSync('renders/frames').filter(name => /^frame_\d{6}\.png$/.test(name)).sort();
if (frames.length !== 1080 || frames[0] !== 'frame_000000.png' || frames.at(-1) !== 'frame_001079.png') {
  throw new Error('Expected the complete 1080-frame sequence before encoding');
}
run('ffmpeg', ['-y', '-framerate', '30', '-start_number', '0', '-i',
  'renders/frames/frame_%06d.png', '-i', 'assets/audio/master.wav',
  '-map', '0:v:0', '-map', '1:a:0', '-c:v', 'libx264', '-preset', 'slow',
  '-crf', '16', '-pix_fmt', 'yuv420p', '-vf', 'scale=in_range=pc:out_range=tv',
  '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709',
  '-c:a', 'aac', '-b:a', '320k', '-ar', '48000', '-ac', '2',
  '-frames:v', '1080', '-t', '36', '-movflags', '+faststart',
  'renders/keyconf-launch.mp4']);

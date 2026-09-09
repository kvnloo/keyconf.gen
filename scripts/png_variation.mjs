import { readFileSync } from 'node:fs';
import { inflateSync } from 'node:zlib';

const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const channelsFor = { 0: 1, 2: 3, 4: 2, 6: 4 };

function decode(file) {
  const bytes = readFileSync(file);
  if (!bytes.subarray(0, 8).equals(signature))
    throw new Error(`${file} is not a PNG`);
  let header;
  const parts = [];
  let offset = 8;
  while (offset + 12 <= bytes.length) {
    const length = bytes.readUInt32BE(offset);
    const type = bytes.subarray(offset + 4, offset + 8).toString('ascii');
    const body = bytes.subarray(offset + 8, offset + 8 + length);
    if (type === 'IHDR')
      header = {
        width: body.readUInt32BE(0),
        height: body.readUInt32BE(4),
        depth: body[8],
        colour: body[9],
        interlace: body[12],
      };
    else if (type === 'IDAT') parts.push(Buffer.from(body));
    else if (type === 'IEND') break;
    offset += 12 + length;
  }
  if (!header) throw new Error(`${file} has no header`);
  if (header.depth !== 8) throw new Error(`${file} is not 8 bits per channel`);
  if (header.interlace) throw new Error(`${file} is interlaced`);
  const channels = channelsFor[header.colour];
  if (!channels)
    throw new Error(`${file} uses unsupported colour type ${header.colour}`);
  const raw = inflateSync(Buffer.concat(parts));
  const { width, height } = header;
  const stride = width * channels;
  const image = Buffer.alloc(height * stride);
  let position = 0;
  for (let row = 0; row < height; row++) {
    const filter = raw[position++];
    const line = raw.subarray(position, position + stride);
    position += stride;
    const out = image.subarray(row * stride, (row + 1) * stride);
    const prior = row ? image.subarray((row - 1) * stride, row * stride) : null;
    for (let index = 0; index < stride; index++) {
      const left = index >= channels ? out[index - channels] : 0;
      const above = prior ? prior[index] : 0;
      const corner = prior && index >= channels ? prior[index - channels] : 0;
      let value = line[index];
      if (filter === 1) value += left;
      else if (filter === 2) value += above;
      else if (filter === 3) value += (left + above) >> 1;
      else if (filter === 4) {
        const estimate = left + above - corner;
        const toLeft = Math.abs(estimate - left);
        const toAbove = Math.abs(estimate - above);
        const toCorner = Math.abs(estimate - corner);
        value +=
          toLeft <= toAbove && toLeft <= toCorner
            ? left
            : toAbove <= toCorner
              ? above
              : corner;
      }
      out[index] = value & 255;
    }
  }
  return { image, channels };
}

// Luminance standard deviation on a 0 to 1 scale. A canvas that drew nothing
// is one flat colour and reports zero, whatever that colour happens to be.
export function pixelVariation(file) {
  const { image, channels } = decode(file);
  let total = 0;
  let squares = 0;
  let count = 0;
  for (let index = 0; index + channels <= image.length; index += channels) {
    const luma =
      channels >= 3
        ? (image[index] * 0.2126 +
            image[index + 1] * 0.7152 +
            image[index + 2] * 0.0722) /
          255
        : image[index] / 255;
    total += luma;
    squares += luma * luma;
    count++;
  }
  if (!count) throw new Error(`${file} has no pixels`);
  const mean = total / count;
  return Math.sqrt(Math.max(0, squares / count - mean * mean));
}

import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

// Source-specific chroma key: keep the original avatar and confetti pixels.
// The detached blue UI button occupies only the upper-right corner.
// Keep the original source photo outside the public website assets.
// Usage: node scripts/prepare-kesi-avatar.mjs <path-to-kesi1.jpg>
const inputPath = process.argv[2];
if (!inputPath) {
  console.error('Usage: node scripts/prepare-kesi-avatar.mjs <path-to-kesi1.jpg>');
  process.exit(1);
}
const source = resolve(inputPath);
const target = fileURLToPath(new URL('../public/assets/kesi-avatar.png', import.meta.url));
const { data, info } = await sharp(source).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const rgba = Buffer.alloc(width * height * 4);
const mask = Buffer.alloc(width * height);

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const p = (y * width + x) * channels;
    const [r, g, b] = data.subarray(p, p + 3);
    const greenScreen = g - r > 9 && b - r > 9 && Math.abs(g - b) < 33;
    const uiButton = x > width * 0.88 && y < height * 0.245;
    mask[y * width + x] = greenScreen || uiButton ? 0 : 255;
  }
}

// A sub-pixel feather avoids JPEG stair-stepping without eroding the artwork.
const alpha = await sharp(mask, { raw: { width, height, channels: 1 } })
  .blur(0.45).greyscale().raw().toBuffer();
let transparentPixels = 0;
for (let i = 0; i < width * height; i++) {
  const src = i * channels;
  let a = alpha[i];
  if (a < 8) a = 0;
  if (a > 247) a = 255;
  for (let c = 0; c < 3; c++) rgba[i * 4 + c] = a ? data[src + c] : 0;
  rgba[i * 4 + 3] = a;
  if (!a) transparentPixels++;
}
await sharp(rgba, { raw: { width, height, channels: 4 } }).png().toFile(target);
console.log(JSON.stringify({ target, width, height, transparentPixels, totalPixels: width * height }));

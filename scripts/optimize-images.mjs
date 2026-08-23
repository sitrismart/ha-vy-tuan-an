// One-off/reusable pass to shrink raw camera photos in public/images down to
// web-appropriate sizes. The site renders inside a single ~480px-wide mobile
// card, so even accounting for 3x-DPI phones there's no reason to ship
// 4600x7000px, 15-30MB originals straight from the camera.
import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs';
import path from 'path';
import sharp from 'sharp';

const IMAGES_DIR = path.resolve('public/images');

// Mini polaroids render at ~80-110px on screen (grid-cols-4 inside a 320px
// row); everything else fills the full ~480px-wide card at up to ~520px tall.
const MINI_POLAROID_FILES = new Set([
  'polaroidmini-4-1.jpg',
  'polaroimini-4-2.jpg',
  'polaroidmini-4-3.jpg',
  'polaroimini-4-4.jpg',
]);

const LARGE = { longEdge: 1600, quality: 80 };
const MINI = { longEdge: 500, quality: 75 };

const files = readdirSync(IMAGES_DIR).filter((f) => /\.(jpe?g)$/i.test(f));

for (const file of files) {
  const filePath = path.join(IMAGES_DIR, file);
  const before = statSync(filePath).size;
  const { longEdge, quality } = MINI_POLAROID_FILES.has(file) ? MINI : LARGE;

  // Read into memory first: passing filePath straight to sharp() has it
  // memory-map the file on Windows, which then blocks writeFileSync from
  // overwriting that same path (sharing violation) later in this process.
  const input = readFileSync(filePath);
  const buffer = await sharp(input)
    .rotate() // bake in EXIF orientation before resizing
    .resize({ width: longEdge, height: longEdge, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toBuffer();

  writeFileSync(filePath, buffer);
  const after = buffer.length;
  console.log(`${file}: ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024).toFixed(0)}KB`);
}

/**
 * Builds the web (WOFF2) version of the Urdu Nastaliq font used on the Galiyat
 * advisory page.
 *
 * The font file itself is not stored in this repository: it is converted from a
 * local installation, so whoever holds the font licence stays in control of the
 * source file. Re-run this after replacing the font.
 *
 * The font is subsetted to the characters the website can actually show (Urdu /
 * Arabic plus the Latin characters used in the same cards). HarfBuzz keeps every
 * glyph reachable from those characters, so Nastaliq ligatures still render
 * correctly — the file is simply much smaller.
 *
 * Usage:
 *   npm run fonts:urdu
 *   npm run fonts:urdu -- "C:\path\to\Your Nastaleeq.ttf"
 *
 * Output: public/fonts/Jameel-Noori-Nastaleeq.woff2
 */
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import subsetFont from 'subset-font';
import wawoff2 from 'wawoff2';

const DEFAULT_SOURCES = [
  'C:\\Windows\\Fonts\\Jameel Noori Nastaleeq.ttf',
  path.join(
    process.env.LOCALAPPDATA ?? '',
    'Microsoft',
    'Windows',
    'Fonts',
    'Jameel Noori Nastaleeq.ttf'
  ),
];

/** Character ranges the advisory pages can render. */
const UNICODE_RANGES = [
  [0x0020, 0x007e], // basic Latin (dates, reference numbers, "km/h")
  [0x00a0, 0x00ff], // Latin-1 punctuation
  [0x0600, 0x06ff], // Arabic / Urdu letters, marks, Urdu digits, ۔ ؟
  [0x0750, 0x077f], // Arabic Supplement
  [0x08a0, 0x08ff], // Arabic Extended-A
  [0x200c, 0x200f], // ZWNJ / ZWJ and directional marks
  [0x2010, 0x2019], // dashes and quotes
  [0x201c, 0x201e],
  [0x2026, 0x2026], // ellipsis
  [0x2039, 0x203a],
  [0xfb50, 0xfdff], // Arabic Presentation Forms-A
  [0xfe70, 0xfeff], // Arabic Presentation Forms-B
];

const charactersToKeep = UNICODE_RANGES.flatMap(([start, end]) => {
  const characters = [];
  for (let code = start; code <= end; code += 1) characters.push(String.fromCodePoint(code));
  return characters;
}).join('');

const source = process.argv[2] ?? DEFAULT_SOURCES.find((candidate) => existsSync(candidate));

if (!source || !existsSync(source)) {
  console.error(
    'Source font not found. Pass its path explicitly, for example:\n' +
      '  npm run fonts:urdu -- "C:\\Windows\\Fonts\\Jameel Noori Nastaleeq.ttf"'
  );
  process.exit(1);
}

const output = path.join('public', 'fonts', 'Jameel-Noori-Nastaleeq.woff2');
const megabytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

const ttf = await readFile(source);

let woff2;
try {
  woff2 = await subsetFont(ttf, charactersToKeep, { targetFormat: 'woff2' });
  console.log('subset : yes (Urdu + Latin ranges kept)');
} catch (error) {
  console.warn(`subset : no — ${error instanceof Error ? error.message : error}`);
  woff2 = await wawoff2.compress(ttf);
}

await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, woff2);

console.log(`source : ${source} (${megabytes(ttf.length)})`);
console.log(`output : ${output} (${megabytes(woff2.length)})`);

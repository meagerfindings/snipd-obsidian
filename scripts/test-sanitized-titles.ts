import { readFileSync } from 'fs';
import * as path from 'path';
import { sanitizeFileName } from '../src/sanitize_file_name';

const dataPath = path.resolve('scripts/data/funky_episode_titles.json');

const payload = JSON.parse(readFileSync(dataPath, 'utf8')) as {
  samples: Array<{ symbol: string; title: string }>;
};

const groupedBySymbol = payload.samples.reduce(
  (acc, sample) => {
    if (!acc[sample.symbol]) {
      acc[sample.symbol] = [];
    }
    acc[sample.symbol].push(sample.title);
    return acc;
  },
  {} as Record<string, string[]>,
);

const sortedSymbols = Object.keys(groupedBySymbol).sort();

for (const symbol of sortedSymbols) {
  console.log(`\n=== Symbol: "${symbol}" ===\n`);

  const titles = Array.from(new Set(groupedBySymbol[symbol]));

  titles.forEach((title, index) => {
    console.log(`${index + 1}. "${title}"`);
    const sanitized = sanitizeFileName(title);
    console.log(`   -> sanitized: "${sanitized}"`);
    if (index < titles.length - 1) {
      console.log('');
    }
  });
}
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryPath = path.dirname(currentFilePath);

export function resolveUnitPath(...paths) {
  // Node.js の ES Modules では CommonJS の __dirname をそのまま使えない。
  // import.meta.url を file path に変換し、そこから現在ディレクトリを組み立てる。
  return path.join(currentDirectoryPath, ...paths);
}

export function runPathAndUrlBasicsExamples() {
  // path.join は OS ごとの区切り文字を意識して path を組み立てる。
  // 文字列連結で "/" を直接書くより、Windows / macOS / Linux の差に強い。
  const fixturePath = resolveUnitPath('fixtures', 'tasks.json');
  const outputPath = resolveUnitPath('.generated', 'summary.json');

  console.log('fixture path:', fixturePath);
  console.log('output path:', outputPath);

  const pathParts = {
    basename: path.basename(fixturePath),
    dirnameEndsWithUnitName: path.dirname(fixturePath).endsWith('fixtures'),
    extension: path.extname(fixturePath),
  };

  console.log('pathの分解結果:', pathParts);

  // URL は Web API でも Node.js でも使える標準的な表現。
  // file URL と path 文字列は別物のため、Node.js では必要に応じて変換する。
  const currentFileUrl = import.meta.url;
  const convertedPath = fileURLToPath(currentFileUrl);

  console.log('import.meta.url:', currentFileUrl);
  console.log('fileURLToPathした結果:', convertedPath);

  assert.equal(path.basename(fixturePath), 'tasks.json');
  assert.equal(path.basename(outputPath), 'summary.json');
  assert.deepEqual(pathParts, {
    basename: 'tasks.json',
    dirnameEndsWithUnitName: true,
    extension: '.json',
  });
  assert.equal(convertedPath, currentFilePath);
}

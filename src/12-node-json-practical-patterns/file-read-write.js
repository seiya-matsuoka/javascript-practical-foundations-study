import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

import { resolveUnitPath } from './path-and-url-basics.js';

export async function runFileReadWriteExamples() {
  const outputDirectoryPath = resolveUnitPath('.generated');
  const outputFilePath = resolveUnitPath('.generated', 'runtime-summary.json');

  // node:fs/promises は Promise ベースでファイル操作を行う API。
  // await と組み合わせると、非同期のファイル読み書きを同期処理に近い見た目で読める。
  await fs.mkdir(outputDirectoryPath, { recursive: true });

  const summary = {
    generatedAt: '2026-05-31T00:00:00.000Z',
    unit: '12-node-json-practical-patterns',
    topics: ['process', 'fs/promises', 'path', 'json'],
  };

  // JavaScript object をそのままファイルへ書けるわけではない。
  // JSON ファイルとして保存する場合は、JSON.stringify で文字列に変換する。
  const jsonText = JSON.stringify(summary, null, 2);

  await fs.writeFile(outputFilePath, jsonText, 'utf8');

  const readText = await fs.readFile(outputFilePath, 'utf8');
  const readSummary = JSON.parse(readText);

  console.log('書き込んだJSONファイル:', outputFilePath);
  console.log('読み戻したJSON:', readSummary);

  // ファイル操作は副作用を伴うため、実務では処理の中心から切り離しておくとテストしやすい。
  // このサンプルでも、読み書きする場所をこの関数に閉じ込めている。
  assert.deepEqual(readSummary, summary);
}

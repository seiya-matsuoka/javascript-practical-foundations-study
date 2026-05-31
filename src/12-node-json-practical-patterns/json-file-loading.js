import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

import { resolveUnitPath } from './path-and-url-basics.js';

async function readJsonFile(filePath) {
  const text = await fs.readFile(filePath, 'utf8');

  return JSON.parse(text);
}

export async function runJsonFileLoadingExamples() {
  const configPath = resolveUnitPath('fixtures', 'app-config.json');
  const tasksPath = resolveUnitPath('fixtures', 'tasks.json');

  // JSON ファイルは設定値や小さな固定データの表現に使われる。
  // 読み込んだ直後は外部入力と同じなので、本来は形の検証も考える必要がある。
  const config = await readJsonFile(configPath);
  const tasks = await readJsonFile(tasksPath);

  const enabledFeatureNames = Object.entries(config.features)
    .filter(([, enabled]) => enabled)
    .map(([featureName]) => featureName);

  console.log('JSONファイルから読み込んだconfig:', config);
  console.log('有効なfeature:', enabledFeatureNames);
  console.log('JSONファイルから読み込んだtask数:', tasks.length);

  assert.equal(config.appName, 'JavaScript Practical Foundations');
  assert.deepEqual(enabledFeatureNames, ['fileOutput', 'apiPreview']);
  assert.equal(tasks.length, 6);
  assert.equal(tasks[0].title, 'Node.jsのprocessを確認する');
}

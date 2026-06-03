import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

import { resolveUnitPath } from './path-and-url-basics.js';

function createSummary(tasks) {
  // この関数はデータを受け取って結果を返すだけにする。
  // ファイル読み書きや console.log のような副作用を持たないため、単体で確認しやすい。
  return {
    total: tasks.length,
    completed: tasks.filter((task) => task.status === 'done').length,
    active: tasks.filter((task) => task.status !== 'done').length,
  };
}

async function readTasks() {
  // 副作用であるファイル読み込みを端の関数へ寄せる。
  // 中心のデータ変換処理と分けることで、変更の影響範囲を小さくできる。
  const tasksText = await fs.readFile(resolveUnitPath('fixtures', 'tasks.json'), 'utf8');

  return JSON.parse(tasksText);
}

async function writeSummary(summary) {
  const outputDirectoryPath = resolveUnitPath('.generated');
  const outputFilePath = resolveUnitPath('.generated', 'task-summary.json');

  await fs.mkdir(outputDirectoryPath, { recursive: true });
  await fs.writeFile(outputFilePath, JSON.stringify(summary, null, 2), 'utf8');

  return outputFilePath;
}

export async function runSideEffectBoundaryExamples() {
  const tasks = await readTasks();
  const summary = createSummary(tasks);
  const outputFilePath = await writeSummary(summary);

  console.log('副作用を端に寄せて作ったsummary:', summary);
  console.log('summaryを書き込んだpath:', outputFilePath);

  assert.deepEqual(summary, {
    total: 6,
    completed: 2,
    active: 4,
  });
  assert.equal(outputFilePath.endsWith('task-summary.json'), true);
}

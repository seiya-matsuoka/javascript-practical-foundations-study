import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

import { resolveUnitPath } from './path-and-url-basics.js';

function createTaskDisplayItem(task) {
  const statusLabelMap = {
    todo: '未着手',
    doing: '進行中',
    done: '完了',
  };

  // API や JSON ファイルの生データを、そのまま UI 表示に使うとは限らない。
  // 表示用の label、fallback、日付文字列などを作る mapper 関数を分けておくと読みやすい。
  return {
    id: task.id,
    title: task.title,
    statusLabel: statusLabelMap[task.status] ?? '不明',
    assigneeName: task.assignee?.name ?? '未担当',
    dueDateLabel: task.dueDate ?? '期限なし',
  };
}

export async function runDisplayDataTransformExamples() {
  const tasksText = await fs.readFile(resolveUnitPath('fixtures', 'tasks.json'), 'utf8');
  const tasks = JSON.parse(tasksText);

  const displayItems = tasks.map((task) => createTaskDisplayItem(task));

  console.log('表示用データ:', displayItems);

  const compactDisplayItems = displayItems.map((item) => `${item.statusLabel}: ${item.title}`);

  console.log('表示用文字列:', compactDisplayItems);

  assert.deepEqual(displayItems[0], {
    id: 1,
    title: 'Node.jsのprocessを確認する',
    statusLabel: '未着手',
    assigneeName: 'Alice',
    dueDateLabel: '2026-06-03',
  });
  assert.equal(displayItems[1].assigneeName, '未担当');
  assert.equal(displayItems[2].dueDateLabel, '期限なし');
  assert.deepEqual(compactDisplayItems.slice(0, 3), [
    '未着手: Node.jsのprocessを確認する',
    '進行中: JSONファイルを読み込む',
    '完了: APIレスポンス風データを整形する',
  ]);
}

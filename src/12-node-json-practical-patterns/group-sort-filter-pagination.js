import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

import { resolveUnitPath } from './path-and-url-basics.js';

function groupByStatus(tasks) {
  return tasks.reduce((groupedTasks, task) => {
    const currentTasks = groupedTasks[task.status] ?? [];

    return {
      ...groupedTasks,
      [task.status]: [...currentTasks, task],
    };
  }, {});
}

function paginate(items, { page, perPage }) {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;

  return items.slice(startIndex, endIndex);
}

export async function runGroupSortFilterPaginationExamples() {
  const tasksText = await fs.readFile(resolveUnitPath('fixtures', 'tasks.json'), 'utf8');
  const tasks = JSON.parse(tasksText);

  // filter は条件に合う要素だけを残す。
  // 元の array は変更されないため、検索条件や絞り込み処理に使いやすい。
  const activeTasks = tasks.filter((task) => task.status !== 'done');

  // sort は破壊的なので、先に spread で shallow copy を作る。
  // Unit 12 の落とし穴まとめでも、sort の破壊性は改めて扱う。
  const sortedActiveTasks = [...activeTasks].sort((taskA, taskB) => {
    return taskA.priority - taskB.priority;
  });

  const groupedTasks = groupByStatus(tasks);
  const firstPageTasks = paginate(sortedActiveTasks, { page: 1, perPage: 2 });
  const secondPageTasks = paginate(sortedActiveTasks, { page: 2, perPage: 2 });

  console.log('未完了task:', activeTasks);
  console.log('priorityでsortした未完了task:', sortedActiveTasks);
  console.log('statusごとにgroup byしたtask:', groupedTasks);
  console.log('1ページ目:', firstPageTasks);
  console.log('2ページ目:', secondPageTasks);

  assert.deepEqual(
    activeTasks.map((task) => task.id),
    [1, 2, 4, 5],
  );
  assert.deepEqual(
    sortedActiveTasks.map((task) => task.id),
    [2, 4, 1, 5],
  );
  assert.deepEqual(Object.keys(groupedTasks).sort(), ['doing', 'done', 'todo']);
  assert.deepEqual(
    firstPageTasks.map((task) => task.id),
    [2, 4],
  );
  assert.deepEqual(
    secondPageTasks.map((task) => task.id),
    [1, 5],
  );
}

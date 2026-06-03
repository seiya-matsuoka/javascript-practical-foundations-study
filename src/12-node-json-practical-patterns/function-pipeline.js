import assert from 'node:assert/strict';

function normalizeTask(task) {
  return {
    ...task,
    title: task.title.trim(),
    status: task.status.toLowerCase(),
  };
}

function isVisibleTask(task) {
  return task.status !== 'done';
}

function mapToDisplayItem(task) {
  return {
    id: task.id,
    text: `${task.id}. ${task.title}`,
    priority: task.priority,
  };
}

function sortByPriority(taskA, taskB) {
  return taskA.priority - taskB.priority;
}

function createTaskDisplayList(tasks) {
  // データ変換パイプラインでは、1 つの大きな関数に詰め込まず、処理を小さい関数に分ける。
  // normalize -> filter -> sort -> map のように並べると、データがどう変わるかを追いやすい。
  return tasks
    .map((task) => normalizeTask(task))
    .filter((task) => isVisibleTask(task))
    .sort((taskA, taskB) => sortByPriority(taskA, taskB))
    .map((task) => mapToDisplayItem(task));
}

export function runFunctionPipelineExamples() {
  const rawTasks = [
    { id: 1, title: '  表示データへ変換する  ', status: 'TODO', priority: 2 },
    { id: 2, title: '完了済みは除外する', status: 'DONE', priority: 1 },
    { id: 3, title: '  優先度で並べる', status: 'DOING', priority: 1 },
  ];

  const displayList = createTaskDisplayList(rawTasks);

  console.log('データ変換パイプラインの結果:', displayList);

  assert.deepEqual(displayList, [
    { id: 3, text: '3. 優先度で並べる', priority: 1 },
    { id: 1, text: '1. 表示データへ変換する', priority: 2 },
  ]);
}

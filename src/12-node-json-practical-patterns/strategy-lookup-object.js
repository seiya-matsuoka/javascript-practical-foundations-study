import assert from 'node:assert/strict';

const statusLabelLookup = {
  todo: '未着手',
  doing: '進行中',
  done: '完了',
};

const sortStrategies = {
  priorityAsc: (taskA, taskB) => taskA.priority - taskB.priority,
  titleAsc: (taskA, taskB) => taskA.title.localeCompare(taskB.title, 'ja-JP'),
};

function getStatusLabel(status) {
  // lookup object は、値に応じた label や設定を取り出すために使う。
  // if / switch が増えすぎる前に、単純な対応表として切り出せる。
  return statusLabelLookup[status] ?? '不明';
}

function sortTasks(tasks, strategyName) {
  // strategy object 的な分岐では、処理そのものを object に登録しておく。
  // 分岐ごとの処理が関数として独立するため、追加や差し替えがしやすい。
  const compare = sortStrategies[strategyName] ?? sortStrategies.priorityAsc;

  return [...tasks].sort(compare);
}

export function runStrategyLookupExamples() {
  const tasks = [
    { id: 1, title: 'Bタスク', status: 'todo', priority: 2 },
    { id: 2, title: 'Aタスク', status: 'doing', priority: 1 },
    { id: 3, title: 'Cタスク', status: 'unknown', priority: 3 },
  ];

  const labels = tasks.map((task) => getStatusLabel(task.status));
  const sortedByPriority = sortTasks(tasks, 'priorityAsc');
  const sortedByTitle = sortTasks(tasks, 'titleAsc');

  console.log('lookup objectで取得したlabel:', labels);
  console.log('priority strategyでsortしたtask:', sortedByPriority);
  console.log('title strategyでsortしたtask:', sortedByTitle);

  assert.deepEqual(labels, ['未着手', '進行中', '不明']);
  assert.deepEqual(
    sortedByPriority.map((task) => task.id),
    [2, 1, 3],
  );
  assert.deepEqual(
    sortedByTitle.map((task) => task.id),
    [2, 1, 3],
  );
}

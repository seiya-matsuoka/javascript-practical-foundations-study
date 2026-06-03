import assert from 'node:assert/strict';

const tasks = [
  { id: 1, title: 'Node.jsのprocessを確認する', status: 'todo', priority: 3 },
  { id: 2, title: 'JSONファイルを読み込む', status: 'doing', priority: 1 },
  { id: 3, title: 'APIレスポンス風データを整形する', status: 'done', priority: 2 },
];

function mapTaskToSummary(task) {
  // mapper 関数は、入力データを別の形へ変換する関数。
  // 実務では API レスポンス、DB から取得したデータ、画面表示用データの形を分けるためによく使う。
  return {
    id: task.id,
    label: `${task.id}: ${task.title}`,
    active: task.status !== 'done',
  };
}

function isActiveTask(task) {
  // predicate 関数は、条件に合うかどうかを boolean で返す関数。
  // filter、some、every などに渡すと、条件の意図を名前で表現できる。
  return task.status !== 'done';
}

function validateTaskInput(input) {
  const errors = [];

  // validator 関数は、外部から受け取った値をそのまま信頼しないために使う。
  // throw する設計もあるが、ここでは画面表示や API response に使いやすい result object で返す。
  if (typeof input.title !== 'string' || input.title.trim() === '') {
    errors.push('titleは1文字以上で指定する。');
  }

  if (!['todo', 'doing', 'done'].includes(input.status)) {
    errors.push('statusはtodo/doing/doneのいずれかで指定する。');
  }

  return {
    ok: errors.length === 0,
    errors,
  };
}

export function runMapperPredicateValidatorExamples() {
  const summaries = tasks.map((task) => mapTaskToSummary(task));
  const activeTasks = tasks.filter((task) => isActiveTask(task));
  const validResult = validateTaskInput({ title: '新しいタスク', status: 'todo' });
  const invalidResult = validateTaskInput({ title: ' ', status: 'archived' });

  console.log('mapper関数で変換したsummary:', summaries);
  console.log('predicate関数で抽出したactive task:', activeTasks);
  console.log('validator関数の成功結果:', validResult);
  console.log('validator関数の失敗結果:', invalidResult);

  assert.deepEqual(summaries, [
    { id: 1, label: '1: Node.jsのprocessを確認する', active: true },
    { id: 2, label: '2: JSONファイルを読み込む', active: true },
    { id: 3, label: '3: APIレスポンス風データを整形する', active: false },
  ]);
  assert.deepEqual(
    activeTasks.map((task) => task.id),
    [1, 2],
  );
  assert.deepEqual(validResult, { ok: true, errors: [] });
  assert.deepEqual(invalidResult, {
    ok: false,
    errors: ['titleは1文字以上で指定する。', 'statusはtodo/doing/doneのいずれかで指定する。'],
  });
}

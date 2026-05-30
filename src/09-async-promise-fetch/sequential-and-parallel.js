import assert from 'node:assert/strict';
import { createDelayedValue } from './async-helpers.js';

async function runSequentialTasks(taskIds) {
  const results = [];

  // for...of の中で await すると、前の処理が終わってから次の処理へ進む。
  // API を順番に呼ぶ必要がある場合や、前の結果を次の入力に使う場合に向いている。
  for (const taskId of taskIds) {
    const result = await createDelayedValue(`task-${taskId}`, 1);

    results.push(result);
  }

  return results;
}

async function runParallelTasks(taskIds) {
  // map で Promise の配列を作り、Promise.all でまとめて待つと並列実行になる。
  // 互いに依存しない API 通信や、独立したデータ取得をまとめるときによく使う。
  const promises = taskIds.map((taskId) => createDelayedValue(`task-${taskId}`, 1));

  return Promise.all(promises);
}

async function runDependentTasks(userId) {
  // 後続処理が前段の結果に依存する場合は、無理に Promise.all にしない。
  // 逐次実行は遅く見える場合もあるが、依存関係を表す意味がある。
  const user = await createDelayedValue({ id: userId, name: 'Alice' }, 1);
  const orders = await createDelayedValue(
    [
      { id: 101, userId: user.id, totalPrice: 1200 },
      { id: 102, userId: user.id, totalPrice: 800 },
    ],
    1,
  );

  return {
    user,
    orders,
  };
}

export async function runSequentialAndParallelExamples() {
  // 同じ結果配列に見えても、逐次実行と並列実行では開始タイミングが異なる。
  // API 通信では、依存関係がない処理を並列化すると待ち時間を短くできる。
  const taskIds = [1, 2, 3];

  const sequentialResults = await runSequentialTasks(taskIds);
  const parallelResults = await runParallelTasks(taskIds);
  // 依存関係がある処理は、Promise.all で並列化するとかえって意味が崩れる。
  // 先に user を取得して、その id を使って orders を取得するような流れは逐次実行が自然。
  const dependentResults = await runDependentTasks(1);

  console.log('逐次実行の結果:', sequentialResults);
  console.log('並列実行の結果:', parallelResults);
  console.log('依存関係がある逐次実行の結果:', dependentResults);

  assert.deepEqual(sequentialResults, ['task-1', 'task-2', 'task-3']);
  assert.deepEqual(parallelResults, ['task-1', 'task-2', 'task-3']);
  assert.deepEqual(dependentResults, {
    user: { id: 1, name: 'Alice' },
    orders: [
      { id: 101, userId: 1, totalPrice: 1200 },
      { id: 102, userId: 1, totalPrice: 800 },
    ],
  });
}

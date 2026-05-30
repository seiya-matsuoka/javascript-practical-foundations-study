import assert from 'node:assert/strict';
import { createDelayedError, createDelayedValue } from './async-helpers.js';

// Promise combinator の失敗を観察するため、エラーメッセージだけを取り出す補助関数。
// サンプル全体を止めずに、どの combinator がどう失敗するかを確認する。
async function captureErrorMessage(asyncTask) {
  try {
    await asyncTask();
  } catch (error) {
    return error.message;
  }

  return null;
}

export async function runPromiseCombinatorsExamples() {
  // Promise.all は、すべて fulfilled になったら結果配列を返す。
  // ただし、1 つでも rejected になると全体が rejected になる。
  const allResults = await Promise.all([
    createDelayedValue('user', 1),
    createDelayedValue('orders', 1),
    createDelayedValue('notifications', 1),
  ]);

  const allErrorMessage = await captureErrorMessage(async () => {
    await Promise.all([
      createDelayedValue('success', 1),
      createDelayedError('Promise.all内の失敗', 1),
    ]);
  });

  console.log('Promise.allの成功結果:', allResults);
  console.log('Promise.allの失敗結果:', allErrorMessage);

  // Promise.allSettled は、成功と失敗の両方を結果として受け取る。
  // 一部だけ失敗しても、全体の結果を見て画面表示やログに分けたい場合に使いやすい。
  const allSettledResults = await Promise.allSettled([
    createDelayedValue('success', 1),
    createDelayedError('allSettled内の失敗', 1),
  ]);

  console.log('Promise.allSettledの結果:', allSettledResults);

  // Promise.race は、最初に settle した Promise の結果を採用する。
  // timeout と組み合わせる考え方にもつながる。
  const raceResult = await Promise.race([
    createDelayedValue('slow', 5),
    createDelayedValue('fast', 1),
  ]);

  console.log('Promise.raceの結果:', raceResult);

  // Promise.any は、最初に fulfilled になった結果を採用する。
  // 失敗が先に来ても、後続で成功すれば成功として扱える。
  const anyResult = await Promise.any([
    createDelayedError('first failed', 1),
    createDelayedValue('first success', 2),
    createDelayedValue('second success', 3),
  ]);

  console.log('Promise.anyの結果:', anyResult);

  // all / allSettled / race / any は、どれも複数 Promise を扱うが、成功・失敗の採用条件が異なる。
  // assert では、それぞれの違いが結果に表れていることを確認する。
  assert.deepEqual(allResults, ['user', 'orders', 'notifications']);
  assert.equal(allErrorMessage, 'Promise.all内の失敗');
  assert.equal(allSettledResults[0].status, 'fulfilled');
  assert.equal(allSettledResults[0].value, 'success');
  assert.equal(allSettledResults[1].status, 'rejected');
  assert.equal(allSettledResults[1].reason.message, 'allSettled内の失敗');
  assert.equal(raceResult, 'fast');
  assert.equal(anyResult, 'first success');
}

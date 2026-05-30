import assert from 'node:assert/strict';
import { createDelayedError, createDelayedValue } from './async-helpers.js';

// Promise.resolve は、すでに fulfilled になった Promise を作る。
// API 通信の代わりに固定値を返すサンプルや、値を Promise として扱いたい場面で使う。
function createImmediateResolvedPromise() {
  return Promise.resolve({ id: 1, title: 'Promise Basics' });
}

// new Promise は、resolve / reject を自分で呼ぶ形。
// 実務では既存 API が Promise を返すことが多いが、callback API を包むときにこの形を使う。
function createManualPromise({ shouldFail }) {
  return new Promise((resolve, reject) => {
    if (shouldFail) {
      reject(new Error('手動でrejectした。'));
      return;
    }

    resolve('手動でresolveした。');
  });
}

export async function runPromiseBasicsExamples() {
  // Promise は pending / fulfilled / rejected の状態を持つ。
  // await を使うと、fulfilled の値を同期処理に近い見た目で受け取れる。
  const resolvedValue = await createImmediateResolvedPromise();
  const delayedValue = await createDelayedValue('delayed value', 1);
  const manualResolvedValue = await createManualPromise({ shouldFail: false });

  // rejected になった Promise は await すると throw と同じように catch へ流れる。
  // 同期例外と非同期失敗を同じ try-catch で扱える点が async / await の利点。
  let manualRejectedMessage = null;
  let delayedRejectedMessage = null;

  try {
    await createManualPromise({ shouldFail: true });
  } catch (error) {
    manualRejectedMessage = error.message;
  }

  try {
    await createDelayedError('遅延してrejectした。', 1);
  } catch (error) {
    delayedRejectedMessage = error.message;
  }

  console.log('Promise.resolveの値:', resolvedValue);
  console.log('遅延resolveの値:', delayedValue);
  console.log('手動resolveの値:', manualResolvedValue);
  console.log('手動rejectのmessage:', manualRejectedMessage);
  console.log('遅延rejectのmessage:', delayedRejectedMessage);

  assert.deepEqual(resolvedValue, { id: 1, title: 'Promise Basics' });
  assert.equal(delayedValue, 'delayed value');
  assert.equal(manualResolvedValue, '手動でresolveした。');
  assert.equal(manualRejectedMessage, '手動でrejectした。');
  assert.equal(delayedRejectedMessage, '遅延してrejectした。');
}

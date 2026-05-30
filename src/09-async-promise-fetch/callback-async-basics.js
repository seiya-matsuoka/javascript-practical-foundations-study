import assert from 'node:assert/strict';
import { wait } from './async-helpers.js';

function loadUserByCallback(userId, onSuccess, onFailure) {
  // Promise が広く使われる前は、非同期処理の完了後に callback を呼ぶ書き方がよく使われた。
  // callback は「後で実行してほしい処理」を関数として渡す仕組み。
  setTimeout(() => {
    if (userId === 1) {
      onSuccess({ id: 1, name: 'Alice' });
      return;
    }

    onFailure(new Error('ユーザーが見つからない。'));
  }, 0);
}

function loadUserAsPromise(userId) {
  // callback style の処理は、Promise で包むことで await しやすい形に変換できる。
  // Node.js API や古いライブラリを扱うときに、この発想が役立つ。
  return new Promise((resolve, reject) => {
    loadUserByCallback(userId, resolve, reject);
  });
}

export async function runCallbackAsyncBasicsExamples() {
  const callbackEvents = [];

  loadUserByCallback(
    1,
    (user) => {
      callbackEvents.push(`success:${user.name}`);
    },
    (error) => {
      callbackEvents.push(`failure:${error.message}`);
    },
  );

  // loadUserByCallback を呼んだ直後に、success / failure callback はまだ実行されていない。
  // そのため、先に同期処理の 'after-call' が配列へ追加される。
  callbackEvents.push('after-call');

  await wait(5);

  console.log('callbackを使った非同期処理:', callbackEvents);

  const promiseUser = await loadUserAsPromise(1);
  let failureMessage = null;

  // callback style を Promise に変換しておくと、失敗も try-catch で扱える。
  // callback のままだと、成功用と失敗用の関数を渡して処理を分岐する必要がある。
  try {
    await loadUserAsPromise(999);
  } catch (error) {
    failureMessage = error.message;
  }

  console.log('callbackをPromiseで包んだ成功結果:', promiseUser);
  console.log('callbackをPromiseで包んだ失敗結果:', failureMessage);

  assert.deepEqual(callbackEvents, ['after-call', 'success:Alice']);
  assert.deepEqual(promiseUser, { id: 1, name: 'Alice' });
  assert.equal(failureMessage, 'ユーザーが見つからない。');
}

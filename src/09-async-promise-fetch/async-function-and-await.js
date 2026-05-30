import assert from 'node:assert/strict';
import { createDelayedValue } from './async-helpers.js';

async function createMessage(name) {
  // async function は、return した値を Promise で包んで返す。
  // 呼び出し側は await することで、fulfilled の値を受け取れる。
  return `Hello, ${name}`;
}

// async function の中では await を使える。
// Promise を返す処理を、上から順に値を受け取るような見た目で書ける。
async function loadUser(userId) {
  const user = await createDelayedValue(
    {
      id: userId,
      name: 'Alice',
    },
    1,
  );

  return user;
}

async function loadUserLabel(userId) {
  // await は Promise の完了を待つ。
  // この関数の中では同期処理に近い見た目で書けるが、関数全体は非同期処理として Promise を返す。
  const user = await loadUser(userId);

  return `${user.id}: ${user.name}`;
}

export async function runAsyncFunctionAndAwaitExamples() {
  // async function は必ず Promise を返すため、戻り値をそのまま見ると Promise object になる。
  // 実際の値が必要な場合は await して fulfilled の値を取り出す。
  const messagePromise = createMessage('JavaScript');
  const message = await messagePromise;
  const user = await loadUser(1);
  const userLabel = await loadUserLabel(1);

  console.log('async functionが返したPromiseか:', messagePromise instanceof Promise);
  console.log('awaitで受け取ったmessage:', message);
  console.log('awaitで受け取ったuser:', user);
  console.log('awaitを複数段階で使ったlabel:', userLabel);

  assert.equal(messagePromise instanceof Promise, true);
  assert.equal(message, 'Hello, JavaScript');
  assert.deepEqual(user, { id: 1, name: 'Alice' });
  assert.equal(userLabel, '1: Alice');
}

import assert from 'node:assert/strict';
import { wait } from './async-helpers.js';

export async function runSyncVsAsyncExamples() {
  const events = [];

  // 同期処理は、上から順番に call stack 上で実行される。
  // 途中の処理が終わるまで、次の行には進まない。
  events.push('sync:start');
  events.push('sync:middle');
  events.push('sync:end');

  console.log('同期処理だけの実行順:', events);

  // 同期処理と非同期処理を同じ配列に記録すると、実行順の違いを目で確認しやすい。
  // 非同期 API を呼んだ瞬間に callback が実行されるわけではない点が重要になる。
  const asyncEvents = [];

  asyncEvents.push('sync:before-timeout');

  // setTimeout の callback は、今すぐ実行されるわけではない。
  // タイマーの条件を満たした後、task queue を経由して call stack が空いたタイミングで実行される。
  setTimeout(() => {
    asyncEvents.push('task:setTimeout');
  }, 0);

  asyncEvents.push('sync:after-timeout');

  // ここで少し待つことで、setTimeout の callback が実行される時間を作る。
  await wait(5);

  console.log('非同期処理を含む実行順:', asyncEvents);

  // 非同期処理を呼び出した直後に結果が入っているとは限らない。
  // 「後で実行される処理」と「今すぐ実行される処理」を分けて読むことが重要になる。
  // assert では、意図した順番を固定して確認する。
  // 非同期処理の学習では、値だけでなく「いつ実行されたか」も確認対象になる。
  assert.deepEqual(events, ['sync:start', 'sync:middle', 'sync:end']);
  assert.deepEqual(asyncEvents, ['sync:before-timeout', 'sync:after-timeout', 'task:setTimeout']);
}

import assert from 'node:assert/strict';
import { wait } from './async-helpers.js';

export async function runEventLoopOverviewExamples() {
  const events = [];

  events.push('sync:start');

  // setTimeout の callback は task queue 側の処理として後で実行される。
  // 0ms を指定しても「即座に割り込んで実行される」という意味ではない。
  setTimeout(() => {
    events.push('task:setTimeout');
  }, 0);

  // Promise の then は microtask queue に積まれる。
  // microtask は、現在の同期処理が終わった後、task より先に処理される。
  Promise.resolve().then(() => {
    events.push('microtask:promise.then');
  });

  // queueMicrotask は、microtask を明示的に積む API。
  // Promise.then と同じく、現在の同期処理が終わった後に実行される。
  queueMicrotask(() => {
    events.push('microtask:queueMicrotask');
  });

  events.push('sync:end');

  // ここで await して call stack を空けることで、microtask と task が処理される時間を作る。
  // 待機は実務ロジックではなく、実行順を観察するための補助処理。
  await wait(5);

  console.log('event loopの実行順:', events);

  // このサンプルでは、同期処理、microtask、task の順番を確認する。
  // 実行環境や細かい API によって詳細は変わるが、Promise の then が setTimeout より先に動く点は重要。
  assert.deepEqual(events, [
    'sync:start',
    'sync:end',
    'microtask:promise.then',
    'microtask:queueMicrotask',
    'task:setTimeout',
  ]);
}

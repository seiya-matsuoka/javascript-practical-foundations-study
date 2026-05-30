import { runAsyncFunctionAndAwaitExamples } from './async-function-and-await.js';
import { runAsyncLoopsExamples } from './async-loops.js';
import { runAsyncTryCatchExamples } from './async-try-catch.js';
import { runCallbackAsyncBasicsExamples } from './callback-async-basics.js';
import { runEventLoopOverviewExamples } from './event-loop-overview.js';
import { runFetchResponseHandlingExamples } from './fetch-response-handling.js';
import { runFetchTimeoutAbortExamples } from './fetch-timeout-abort.js';
import { runNodeAndBrowserFetchExamples } from './node-and-browser-fetch.js';
import { runPromiseBasicsExamples } from './promise-basics.js';
import { runPromiseChainExamples } from './promise-chain.js';
import { runPromiseCombinatorsExamples } from './promise-combinators.js';
import { runPromiseRejectionHandlingExamples } from './promise-rejection-handling.js';
import { runSequentialAndParallelExamples } from './sequential-and-parallel.js';
import { runSyncVsAsyncExamples } from './sync-vs-async.js';
import { runThenCatchFinallyExamples } from './then-catch-finally.js';

const unitTitle = 'Unit 09. Promise・async/await・イベントループ・fetch';

// Unit 09 では、JavaScript の非同期処理を体系的に扱う。
// 前半では Promise / async / await の基本と event loop の入口を確認し、
// 後半では逐次実行、並列実行、Promise combinator、非同期 loop、fetch、timeout、AbortController を扱う。
// 非同期処理は個別の構文だけでなく、実行順、失敗処理、並列化、通信処理がつながるため、
// 基礎から fetch までを段階的に呼び出す構成にする。
const runners = [
  { title: '同期処理と非同期処理', run: runSyncVsAsyncExamples },
  { title: 'event loop・task queue・microtask queue の入口', run: runEventLoopOverviewExamples },
  { title: 'callback を使った非同期処理', run: runCallbackAsyncBasicsExamples },
  { title: 'Promise の基本', run: runPromiseBasicsExamples },
  { title: 'then / catch / finally', run: runThenCatchFinallyExamples },
  { title: 'Promise chain', run: runPromiseChainExamples },
  { title: 'async function と await', run: runAsyncFunctionAndAwaitExamples },
  { title: 'async / await での try-catch', run: runAsyncTryCatchExamples },
  { title: 'Promise rejection の扱い', run: runPromiseRejectionHandlingExamples },
  { title: '逐次実行と並列実行', run: runSequentialAndParallelExamples },
  { title: 'Promise.all / allSettled / race / any', run: runPromiseCombinatorsExamples },
  { title: '非同期処理と loop', run: runAsyncLoopsExamples },
  { title: 'fetch と response handling', run: runFetchResponseHandlingExamples },
  { title: 'timeout と AbortController', run: runFetchTimeoutAbortExamples },
  { title: 'Node.js とブラウザの fetch', run: runNodeAndBrowserFetchExamples },
];

function printUnitHeader() {
  const line = '='.repeat(80);

  console.log(line);
  console.log(unitTitle);
  console.log(line);
}

function printSectionHeader(sectionNumber, title) {
  const line = '-'.repeat(80);

  console.log('');
  console.log(line);
  console.log(`${sectionNumber}. ${title}`);
  console.log(line);
}

printUnitHeader();

for (const [index, runner] of runners.entries()) {
  printSectionHeader(index + 1, runner.title);
  await runner.run();
}

console.log('');
console.log('Unit 09 のサンプルをすべて実行した。');

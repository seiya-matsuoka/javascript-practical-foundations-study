import { runApiResponseFailureExamples } from './api-response-failure.js';
import { runAsyncTryCatchExamples } from './async-try-catch.js';
import { runCustomErrorExamples } from './custom-errors.js';
import { runFailFastAndErrorBoundaryExamples } from './fail-fast-and-error-boundaries.js';
import { runFormValidationExamples } from './form-validation.js';
import { runPromiseRejectionExamples } from './promise-rejection.js';
import { runThrowErrorBasicsExamples } from './throw-error-basics.js';
import { runTryCatchFinallyExamples } from './try-catch-finally.js';
import { runUserMessageAndLoggingExamples } from './user-message-and-logging.js';
import { runValidationResultObjectExamples } from './validation-result-object.js';

const unitTitle = 'Unit 08. エラー処理・バリデーション・失敗の扱い';

// Unit 08 では、同期処理と非同期処理の両方に共通する失敗の扱いを確認する。
// throw / try-catch だけでなく、validation、result object、API レスポンス、
// form 入力値の検証まで、実務でよく出る失敗パターンを小さく分けて扱う。
// エラー処理は、単体の構文だけではなく、どの層で失敗を扱うかも重要になる。
// そのため、throw / catch から API レスポンス処理、form validation まで順に読む構成にする。
const runners = [
  { title: 'throw と Error の基本', run: runThrowErrorBasicsExamples },
  { title: 'try / catch / finally', run: runTryCatchFinallyExamples },
  { title: 'custom error', run: runCustomErrorExamples },
  { title: 'validation と result object', run: runValidationResultObjectExamples },
  { title: 'fail fast とエラーの処理場所', run: runFailFastAndErrorBoundaryExamples },
  { title: 'ユーザー向けメッセージとログ情報', run: runUserMessageAndLoggingExamples },
  { title: 'async / await での try-catch', run: runAsyncTryCatchExamples },
  { title: 'Promise rejection の扱い', run: runPromiseRejectionExamples },
  { title: 'API レスポンス処理での失敗', run: runApiResponseFailureExamples },
  { title: 'form 入力値の検証', run: runFormValidationExamples },
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
console.log('Unit 08 のサンプルをすべて実行した。');

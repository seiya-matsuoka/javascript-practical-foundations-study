import { runArrowFunctionExamples } from './arrow-functions.js';
import { runAsyncClosureEntryExamples } from './async-closure-entry.js';
import { runCallbackAndClosureExamples } from './callback-and-closure.js';
import { runCallbackBasicsExamples } from './callback-basics.js';
import { runClosureBasicsExamples } from './closure-basics.js';
import { runEncapsulatedStateExamples } from './encapsulated-state.js';
import { runFactoryFunctionExamples } from './factory-functions.js';
import { runFunctionDeclarationAndExpressionExamples } from './function-declarations-and-expressions.js';
import { runFunctionsAsValuesExamples } from './functions-as-values.js';
import { runHigherOrderFunctionExamples } from './higher-order-functions.js';
import { runImmediatelyInvokedFunctionExamples } from './immediately-invoked-functions.js';
import { runLexicalScopeExamples } from './lexical-scope.js';
import { runParametersAndRestExamples } from './parameters-defaults-rest.js';
import { runPureFunctionAndSideEffectExamples } from './pure-functions-and-side-effects.js';
import { runReturnAndEarlyReturnExamples } from './return-and-early-return.js';

const unitTitle = 'Unit 04. 関数・コールバック・高階関数・クロージャ';

// Unit 04 では、JavaScript で関数を値として扱う感覚を固める。
// 関数を値として扱えることは、callback、higher-order function、closure の前提になる。
// 前半では関数の書き方と callback / higher-order function を確認し、
// 後半では lexical scope と closure を重点的に扱う。
// React Hooks の callback や state 更新を読むためにも、closure の見方が重要になる。
const runners = [
  { title: '関数宣言と関数式', run: runFunctionDeclarationAndExpressionExamples },
  { title: 'アロー関数', run: runArrowFunctionExamples },
  { title: '引数・デフォルト引数・rest parameter', run: runParametersAndRestExamples },
  { title: 'return と early return', run: runReturnAndEarlyReturnExamples },
  { title: '関数を値として扱う', run: runFunctionsAsValuesExamples },
  { title: 'callback の基本', run: runCallbackBasicsExamples },
  { title: 'higher-order function の基本', run: runHigherOrderFunctionExamples },
  { title: '純粋関数と副作用', run: runPureFunctionAndSideEffectExamples },
  { title: 'レキシカルスコープ', run: runLexicalScopeExamples },
  { title: 'クロージャの基本', run: runClosureBasicsExamples },
  { title: 'factory function', run: runFactoryFunctionExamples },
  { title: '状態を閉じ込める関数', run: runEncapsulatedStateExamples },
  { title: 'callback とクロージャ', run: runCallbackAndClosureExamples },
  { title: '非同期処理とクロージャの入口', run: runAsyncClosureEntryExamples },
  { title: '即時実行関数', run: runImmediatelyInvokedFunctionExamples },
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
console.log('Unit 04 のサンプルをすべて実行した。');

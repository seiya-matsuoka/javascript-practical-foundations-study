import { runArrayReferenceSharingExamples } from './array-reference-sharing.js';
import { runConstObjectChangeExamples } from './const-object-change.js';
import { runFunctionArgumentsReferenceExamples } from './function-arguments-reference.js';
import { runHoistingAndTdzExamples } from './hoisting-and-tdz.js';
import { runObjectFreezeExamples } from './object-freeze.js';
import { runObjectReferenceSharingExamples } from './object-reference-sharing.js';
import { runPrimitiveVsObjectValuesExamples } from './primitive-vs-object-values.js';
import { runReassignmentAndMutationIntroExamples } from './reassignment-and-mutation-intro.js';
import { runScopeRulesExamples } from './scope-rules.js';
import { runShallowCopyExamples } from './shallow-copy.js';
import { runVariableDeclarationsExamples } from './variable-declarations.js';

const unitTitle = 'Unit 03. 変数宣言・スコープ・巻き上げ・参照';

// Unit 03 では、変数宣言だけでなく、値がどのように共有されるかまで扱う。
// React の state 更新や、API レスポンス加工で「元データを変更していないか」を考える土台になる。
const runners = [
  { title: 'let / const / var と再代入', run: runVariableDeclarationsExamples },
  { title: '再代入とミューテーションの違い', run: runReassignmentAndMutationIntroExamples },
  { title: 'ブロックスコープ・関数スコープ・グローバルスコープ', run: runScopeRulesExamples },
  { title: 'hoisting と temporal dead zone', run: runHoistingAndTdzExamples },
  { title: 'primitive と object の値の扱い', run: runPrimitiveVsObjectValuesExamples },
  { title: 'object の参照共有', run: runObjectReferenceSharingExamples },
  { title: 'array の参照共有', run: runArrayReferenceSharingExamples },
  { title: '関数に渡した値と参照', run: runFunctionArgumentsReferenceExamples },
  { title: 'const と object 変更', run: runConstObjectChangeExamples },
  { title: 'shallow copy の入口', run: runShallowCopyExamples },
  { title: 'Object.freeze の概要', run: runObjectFreezeExamples },
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
console.log('Unit 03 のサンプルをすべて実行した。');

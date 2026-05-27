import { runConfigAndOptionsObjectExamples } from './config-and-options-objects.js';
import { runDestructuringBasicsExamples } from './destructuring-basics.js';
import { runDynamicPropertyExamples } from './dynamic-properties.js';
import { runFunctionParameterDestructuringExamples } from './function-parameters-destructuring.js';
import { runImmutableUpdateExamples } from './immutable-update.js';
import { runJsonDifferenceExamples } from './json-difference.js';
import { runNestedDestructuringAndDefaultsExamples } from './nested-destructuring-defaults.js';
import { runNestedObjectUpdateExamples } from './nested-object-update.js';
import { runObjectHasOwnExamples } from './object-has-own.js';
import { runObjectLiteralAndAccessExamples } from './object-literals-and-access.js';
import { runObjectStaticMethodsExamples } from './object-static-methods.js';
import { runOptionalChainingForObjectsExamples } from './optional-chaining-for-objects.js';
import { runRestPropertyExamples } from './rest-property.js';
import { runShallowCopyAndDeepCopyExamples } from './shallow-copy-and-deep-copy.js';
import { runShorthandAndComputedPropertyExamples } from './shorthand-and-computed-properties.js';
import { runSpreadCopyAndMergeExamples } from './spread-copy-and-merge.js';
import { runStructuredCloneExamples } from './structured-clone.js';

const unitTitle = 'Unit 05. オブジェクト・分割代入・スプレッド・非破壊更新';

// Unit 05 では、実務で頻出する object 操作をまとめて扱う。
// 前半では object の作成・読み取り・分割代入を確認し、後半では spread、copy、merge、
// shallow copy、structuredClone、Object.*、JSON、非破壊更新を確認する。
// TypeScript / React でも同じ考え方を使うため、参照共有と更新方法を意識して読む。
const runners = [
  { title: 'object literal とプロパティアクセス', run: runObjectLiteralAndAccessExamples },
  { title: 'bracket 記法と動的プロパティ名', run: runDynamicPropertyExamples },
  {
    title: 'shorthand property と computed property name',
    run: runShorthandAndComputedPropertyExamples,
  },
  { title: 'object の分割代入', run: runDestructuringBasicsExamples },
  { title: 'ネストした分割代入とデフォルト値', run: runNestedDestructuringAndDefaultsExamples },
  { title: '関数引数での分割代入', run: runFunctionParameterDestructuringExamples },
  { title: 'rest property', run: runRestPropertyExamples },
  { title: 'optional chaining と object 読み取り', run: runOptionalChainingForObjectsExamples },
  { title: 'config object と options object', run: runConfigAndOptionsObjectExamples },
  { title: 'spread syntax による copy と merge', run: runSpreadCopyAndMergeExamples },
  { title: 'shallow copy と deep copy の注意点', run: runShallowCopyAndDeepCopyExamples },
  { title: 'structuredClone の概要', run: runStructuredCloneExamples },
  { title: 'Object.keys / values / entries / fromEntries', run: runObjectStaticMethodsExamples },
  { title: 'Object.hasOwn による own property 判定', run: runObjectHasOwnExamples },
  { title: 'JSON との違い', run: runJsonDifferenceExamples },
  { title: '非破壊更新', run: runImmutableUpdateExamples },
  { title: 'nested object update', run: runNestedObjectUpdateExamples },
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
console.log('Unit 05 のサンプルをすべて実行した。');

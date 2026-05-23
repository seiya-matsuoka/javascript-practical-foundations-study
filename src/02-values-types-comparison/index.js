import { runExplicitConversionExamples } from './explicit-conversion.js';
import { runLogicalOperatorsExamples } from './logical-operators.js';
import { runLooseEqualityAndCoercionExamples } from './loose-equality-and-coercion.js';
import { runNullAndUndefinedExamples } from './null-and-undefined.js';
import { runNumberSpecialValuesExamples } from './number-special-values.js';
import { runObjectAndFunctionValuesExamples } from './object-and-function-values.js';
import { runObjectIsExamples } from './object-is.js';
import { runOptionalChainingExamples } from './optional-chaining.js';
import { runPrimitiveValuesExamples } from './primitive-values.js';
import { runStrictEqualityExamples } from './strict-equality.js';
import { runTruthyFalsyExamples } from './truthy-falsy.js';
import { runTypeInspectionExamples } from './type-inspection.js';

const unitTitle = 'Unit 02. 値・型・比較・型変換';

// Unit 02 では、JavaScript で不安になりやすい値、型、比較、型変換を扱う。
// 前半では値の種類と型確認、後半では比較、暗黙の型変換、truthy / falsy、
// default 値の扱い、optional chaining を確認する。
const runners = [
  { title: 'primitive 値', run: runPrimitiveValuesExamples },
  { title: 'object と function の値', run: runObjectAndFunctionValuesExamples },
  { title: 'typeof と Array.isArray', run: runTypeInspectionExamples },
  { title: 'null と undefined', run: runNullAndUndefinedExamples },
  { title: 'NaN と Infinity', run: runNumberSpecialValuesExamples },
  { title: 'Object.is による同一性確認', run: runObjectIsExamples },
  { title: '=== / !== による厳密比較', run: runStrictEqualityExamples },
  { title: '== / != と暗黙の型変換', run: runLooseEqualityAndCoercionExamples },
  { title: '明示的な型変換', run: runExplicitConversionExamples },
  { title: 'truthy / falsy', run: runTruthyFalsyExamples },
  { title: '|| / && / ?? による値の選択', run: runLogicalOperatorsExamples },
  { title: 'optional chaining と nullish coalescing', run: runOptionalChainingExamples },
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
console.log('Unit 02 のサンプルをすべて実行した。');

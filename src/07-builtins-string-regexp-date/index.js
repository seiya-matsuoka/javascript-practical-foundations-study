import { runDateAndIntlExamples } from './date-and-intl.js';
import { runMapExamples } from './map-basics.js';
import { runNumberAndMathExamples } from './number-and-math.js';
import { runRegExpExamples } from './regexp-basics.js';
import { runSetExamples } from './set-deduplication.js';
import { runStringOperationExamples } from './string-operations.js';
import { runWeakMapAndWeakSetExamples } from './weak-map-and-weakset.js';

const unitTitle = 'Unit 07. Map・Set・文字列・正規表現・数値・Date・Intl';

// Unit 07 では、JavaScript 標準組み込みオブジェクトのうち、
// 実務でも頻出する Map / Set、文字列、正規表現、数値、Date / Intl を扱う。
// 単なる API 一覧ではなく、重複除去、検索、表示用整形、入力値検証、日付表示などの用途で確認する。
const runners = [
  { title: 'Set と重複除去', run: runSetExamples },
  { title: 'Map と object の違い', run: runMapExamples },
  { title: 'WeakMap と WeakSet の概要', run: runWeakMapAndWeakSetExamples },
  { title: '文字列処理', run: runStringOperationExamples },
  { title: '正規表現', run: runRegExpExamples },
  { title: 'Number と Math', run: runNumberAndMathExamples },
  { title: 'Date と Intl', run: runDateAndIntlExamples },
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
console.log('Unit 07 のサンプルをすべて実行した。');

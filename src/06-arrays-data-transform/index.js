import { runArrayBasicsExamples } from './array-basics.js';
import { runArrayObjectConversionExamples } from './array-object-conversion.js';
import { runDeduplicationExamples } from './deduplication.js';
import { runDestructiveMethodsExamples } from './destructive-methods.js';
import { runDisplayDataTransformExamples } from './display-data-transform.js';
import { runFilterPredicateExamples } from './filter-predicate.js';
import { runFindSomeEveryIncludesExamples } from './find-some-every-includes.js';
import { runFlatAndFlatMapExamples } from './flat-and-flatmap.js';
import { runForOfAndForEachExamples } from './for-of-and-foreach.js';
import { runGroupByAggregationExamples } from './group-by-aggregation.js';
import { runImmutableArrayUpdateExamples } from './immutable-array-update.js';
import { runMapTransformExamples } from './map-transform.js';
import { runMethodChainIntroExamples } from './method-chain-intro.js';
import { runNonDestructiveMethodsExamples } from './non-destructive-methods.js';
import { runReduceBasicsExamples } from './reduce-basics.js';
import { runSortAndReverseExamples } from './sort-and-reverse.js';

const unitTitle = 'Unit 06. 配列操作・データ変換・実務的なコレクション処理';

// Unit 06 では、配列の基本操作から実務的なデータ変換までを扱う。
// 前半で扱う基本メソッドと map / filter / reduce の入口を土台にし、
// 後半では、並び替え、平坦化、配列と object の変換、集計、重複除去、非破壊更新、表示用データ変換を確認する。
const runners = [
  { title: '配列リテラル・index アクセス・length', run: runArrayBasicsExamples },
  { title: 'push / pop / shift / unshift / splice', run: runDestructiveMethodsExamples },
  { title: 'slice / toSpliced による非破壊操作', run: runNonDestructiveMethodsExamples },
  { title: 'for...of と forEach', run: runForOfAndForEachExamples },
  { title: 'map と mapper 関数', run: runMapTransformExamples },
  { title: 'filter と predicate 関数', run: runFilterPredicateExamples },
  { title: 'find / findIndex / some / every / includes', run: runFindSomeEveryIncludesExamples },
  { title: 'reduce による集計の入口', run: runReduceBasicsExamples },
  { title: 'method chain の入口', run: runMethodChainIntroExamples },
  { title: 'sort / toSorted / reverse / toReversed', run: runSortAndReverseExamples },
  { title: 'flat / flatMap による平坦化', run: runFlatAndFlatMapExamples },
  { title: '配列と object の相互変換', run: runArrayObjectConversionExamples },
  { title: 'group by 風処理と集計', run: runGroupByAggregationExamples },
  { title: '重複除去', run: runDeduplicationExamples },
  { title: '配列内要素の非破壊更新・追加・削除', run: runImmutableArrayUpdateExamples },
  { title: '表示用データへの変換', run: runDisplayDataTransformExamples },
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
console.log('Unit 06 のサンプルをすべて実行した。');

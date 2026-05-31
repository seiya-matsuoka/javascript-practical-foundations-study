import { runApiResponseShapeExamples } from './api-response-shape.js';
import { runConfigOptionsExamples } from './config-options-object.js';
import { runDisplayDataTransformExamples } from './display-data-transform.js';
import { runEarlyReturnGuardClauseExamples } from './early-return-guard-clause.js';
import { runFileReadWriteExamples } from './file-read-write.js';
import { runFormatterNormalizerExamples } from './formatter-normalizer.js';
import { runFunctionPipelineExamples } from './function-pipeline.js';
import { runGroupSortFilterPaginationExamples } from './group-sort-filter-pagination.js';
import { runJsonFileLoadingExamples } from './json-file-loading.js';
import { runJsonStringifyParseExamples } from './json-stringify-parse.js';
import { runMapperPredicateValidatorExamples } from './mapper-predicate-validator.js';
import { runNestedNullishDataExamples } from './nested-nullish-data.js';
import { runNodeFetchBasicsExamples } from './node-fetch-basics.js';
import { runOptionalDefaultValuesExamples } from './optional-default-values.js';
import { runPathAndUrlBasicsExamples } from './path-and-url-basics.js';
import { runPitfallsAsyncThisVarDateImportExamples } from './pitfalls-async-this-var-date-import.js';
import { runPitfallsEqualityNullishExamples } from './pitfalls-equality-nullish.js';
import { runPitfallsNumberCopySortExamples } from './pitfalls-number-copy-sort.js';
import { runQueryParamsObjectExamples } from './query-params-object.js';
import { runRuntimeContextExamples } from './runtime-context.js';
import { runSideEffectBoundaryExamples } from './side-effect-boundary.js';
import { runStrategyLookupExamples } from './strategy-lookup-object.js';

const unitTitle = 'Unit 12. Node.js基本API・JSON・実務的な小さな設計パターン・落とし穴まとめ';

// Unit 12 では、Node.js 側の基本 API、JSON / API レスポンス処理、
// 実務寄りの小さな設計パターン、JavaScript の落とし穴をまとめて扱う。
const runners = [
  { title: 'process / 環境変数 / コマンドライン引数', run: runRuntimeContextExamples },
  { title: 'node:path と file URL', run: runPathAndUrlBasicsExamples },
  { title: 'node:fs/promises によるファイル読み書き', run: runFileReadWriteExamples },
  { title: 'JSON ファイル読み込み', run: runJsonFileLoadingExamples },
  { title: 'Node.js での fetch', run: runNodeFetchBasicsExamples },
  { title: 'JSON.stringify / JSON.parse', run: runJsonStringifyParseExamples },
  { title: 'API レスポンス風データ', run: runApiResponseShapeExamples },
  { title: 'ネストしたデータと null 混じりデータ', run: runNestedNullishDataExamples },
  { title: 'optional chaining と default value', run: runOptionalDefaultValuesExamples },
  { title: '表示用データへの変換', run: runDisplayDataTransformExamples },
  { title: 'filter / sort / group by / ページング', run: runGroupSortFilterPaginationExamples },
  { title: 'query parameter 風オブジェクト作成', run: runQueryParamsObjectExamples },
  { title: 'mapper / predicate / validator 関数', run: runMapperPredicateValidatorExamples },
  { title: 'formatter / normalizer 関数', run: runFormatterNormalizerExamples },
  { title: 'config object / options object', run: runConfigOptionsExamples },
  { title: 'early return / guard clause', run: runEarlyReturnGuardClauseExamples },
  { title: 'lookup object / strategy object 的な分岐', run: runStrategyLookupExamples },
  { title: '関数分割とデータ変換パイプライン', run: runFunctionPipelineExamples },
  { title: '副作用を端に寄せる', run: runSideEffectBoundaryExamples },
  { title: '落とし穴: == / truthy / nullish / NaN', run: runPitfallsEqualityNullishExamples },
  { title: '落とし穴: 浮動小数点 / shallow copy / sort', run: runPitfallsNumberCopySortExamples },
  {
    title: '落とし穴: async / this / var / Date / import-export',
    run: runPitfallsAsyncThisVarDateImportExamples,
  },
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
console.log('Unit 12 のサンプルをすべて実行した。');

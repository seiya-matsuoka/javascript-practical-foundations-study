import assert from 'node:assert/strict';
import createUnitSummary from './default-export.js';
import {
  createRuntimeLabel,
  formatFeatureOwner,
  learningKeywords,
  moduleStyle,
} from './named-exports.js';

export async function runModuleBasicsExamples() {
  console.log('現在のモジュール方式:', moduleStyle);

  // named export で公開された関数を使う。
  // import 元のファイル名だけでなく、どの関数がどの責務を持つかを意識して読む。
  const nodeLabel = createRuntimeLabel('Node.js');
  const browserLabel = createRuntimeLabel('ブラウザ');

  console.log(nodeLabel);
  console.log(browserLabel);

  const featureOwners = [
    { featureName: 'Array', owner: 'JavaScript標準' },
    { featureName: 'document', owner: 'Web API' },
    { featureName: 'process', owner: 'Node.js API' },
  ];

  // map は配列の各要素を変換して新しい配列を作る。
  // Unit 06 で詳しく扱うが、ここでは「関数を渡して変換する」例として読む。
  const formattedOwners = featureOwners.map(formatFeatureOwner);

  console.log('機能の提供元:', formattedOwners);

  // default export で公開された関数は、import 側で名前を付けて使える。
  const unitSummary = createUnitSummary({
    title: 'Unit 01',
    focus: 'JavaScriptの実行環境とモジュール',
    keywords: learningKeywords,
  });

  console.log('default exportから作ったUnit概要:', unitSummary);

  // dynamic import は、実行時にモジュールを読み込む方法。
  // ここでは入口だけ確認し、詳しい使いどころは非同期処理や分割読み込みの文脈で扱う。
  const dynamicallyImportedModule = await import('./named-exports.js');

  console.log('dynamic importで取得した値:', dynamicallyImportedModule.moduleStyle);

  assert.equal(nodeLabel, 'Node.jsで動くJavaScript');
  assert.equal(browserLabel, 'ブラウザで動くJavaScript');
  assert.deepEqual(formattedOwners, [
    'Array は JavaScript標準 に属する機能',
    'document は Web API に属する機能',
    'process は Node.js API に属する機能',
  ]);
  assert.equal(unitSummary.keywordCount, 5);
  assert.equal(dynamicallyImportedModule.moduleStyle, moduleStyle);
}

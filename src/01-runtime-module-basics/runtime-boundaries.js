import assert from 'node:assert/strict';

export function runRuntimeBoundaryExamples() {
  // ECMAScript は JavaScript 言語仕様の標準名として使われる。
  // 日常的には JavaScript と呼ぶことが多いが、言語仕様としては ECMAScript を土台にしている。
  const languageOverview = {
    languageName: 'JavaScript',
    standardName: 'ECMAScript',
    description: 'JavaScriptは、ECMAScriptの仕様を土台に、各実行環境のAPIと組み合わせて使われる。',
  };

  console.log('JavaScriptとECMAScriptの関係:', languageOverview);

  // Array、Object、Promise、Map は JavaScript 標準の機能。
  // Node.js でもブラウザでも、JavaScript を実行する環境であれば基本的に利用できる。
  const standardFeatures = [
    {
      name: 'Array',
      available: typeof Array === 'function',
      owner: 'JavaScript標準',
    },
    {
      name: 'Object',
      available: typeof Object === 'function',
      owner: 'JavaScript標準',
    },
    {
      name: 'Promise',
      available: typeof Promise === 'function',
      owner: 'JavaScript標準',
    },
    {
      name: 'Map',
      available: typeof Map === 'function',
      owner: 'JavaScript標準',
    },
  ];

  // process は Node.js が提供する API。
  // document や window はブラウザが提供する Web API。
  // fetch はもともと Web API として使われてきたが、現在の Node.js でも利用できる。
  // つまり「JavaScript 標準かどうか」と「Node.js でも使えるか」は別の観点になる。
  const runtimeFeatures = [
    {
      name: 'process',
      available: typeof process === 'object',
      owner: 'Node.js API',
      note: 'Node.jsの実行情報や環境変数にアクセスするためのAPI',
    },
    {
      name: 'document',
      available: typeof document !== 'undefined',
      owner: 'Web API',
      note: 'ブラウザのDOMを操作するためのAPI。Node.js実行時には通常存在しない',
    },
    {
      name: 'window',
      available: typeof window !== 'undefined',
      owner: 'Web API',
      note: 'ブラウザのグローバルオブジェクト。Node.js実行時には通常存在しない',
    },
    {
      name: 'fetch',
      available: typeof fetch === 'function',
      owner: 'ランタイムが提供するWeb互換API',
      note: 'ブラウザだけでなく、近年のNode.jsでもグローバルに利用できる',
    },
  ];

  for (const feature of standardFeatures) {
    console.log(`${feature.name}: ${feature.owner} / available=${feature.available}`);
  }

  for (const feature of runtimeFeatures) {
    console.log(`${feature.name}: ${feature.owner} / available=${feature.available}`);
    console.log(`  ${feature.note}`);
  }

  // Array.prototype.map は JavaScript 標準の配列メソッド。
  // 実行環境に依存しないため、Node.js でもブラウザでも同じ考え方で使える。
  const sampleValues = ['JavaScript', 'Node.js', 'Browser'];
  const upperValues = sampleValues.map((value) => value.toUpperCase());

  console.log('Array.prototype.mapの結果:', upperValues);

  assert.equal(languageOverview.languageName, 'JavaScript');
  assert.equal(languageOverview.standardName, 'ECMAScript');
  assert.deepEqual(
    standardFeatures.map((feature) => feature.available),
    [true, true, true, true],
  );
  assert.equal(typeof process, 'object');
  assert.equal(typeof document, 'undefined');
  assert.equal(typeof window, 'undefined');
  assert.deepEqual(upperValues, ['JAVASCRIPT', 'NODE.JS', 'BROWSER']);
}

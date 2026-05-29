import assert from 'node:assert/strict';

export function runArrayBasicsExamples() {
  // 配列は、順序を持った値のまとまり。
  // JavaScript では、数値だけでなく、文字列、object、function なども要素として持てる。
  const languages = ['JavaScript', 'TypeScript', 'React'];
  const mixedValues = [1, 'text', true, { id: 1 }];

  console.log('配列リテラル:', languages);
  console.log('複数種類の値を持つ配列:', mixedValues);

  // index は 0 から始まる。
  // Java と同じように、先頭要素は index 0 で参照する。
  const firstLanguage = languages[0];
  const secondLanguage = languages[1];
  const missingLanguage = languages[99];

  console.log('index 0 の要素:', firstLanguage);
  console.log('index 1 の要素:', secondLanguage);
  console.log('存在しない index の要素:', missingLanguage);

  // length は配列の要素数を返す。
  // 最後の index は length - 1 になる。
  const languageCount = languages.length;
  const lastLanguage = languages[languages.length - 1];

  console.log('配列の length:', languageCount);
  console.log('最後の要素:', lastLanguage);

  // 配列は object の一種だが、配列判定には Array.isArray を使う。
  // typeof だけでは通常の object と配列を区別できない。
  const typeInspection = {
    typeofArray: typeof languages,
    isArray: Array.isArray(languages),
  };

  console.log('配列の型確認:', typeInspection);

  assert.deepEqual(languages, ['JavaScript', 'TypeScript', 'React']);
  assert.deepEqual(mixedValues, [1, 'text', true, { id: 1 }]);
  assert.equal(firstLanguage, 'JavaScript');
  assert.equal(secondLanguage, 'TypeScript');
  assert.equal(missingLanguage, undefined);
  assert.equal(languageCount, 3);
  assert.equal(lastLanguage, 'React');
  assert.deepEqual(typeInspection, {
    typeofArray: 'object',
    isArray: true,
  });
}

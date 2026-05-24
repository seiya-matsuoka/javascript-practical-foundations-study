import assert from 'node:assert/strict';

function sampleFunction() {
  return 'function value';
}

export function runTypeInspectionExamples() {
  // typeof は、値の大まかな分類を文字列で返す。
  // JavaScript の型確認でよく使うが、null や array など注意点もある。
  const values = [
    { label: 'number', value: 100 },
    { label: 'string', value: 'text' },
    { label: 'boolean', value: false },
    { label: 'undefined', value: undefined },
    { label: 'bigint', value: 100n },
    { label: 'symbol', value: Symbol('sample') },
    { label: 'function', value: sampleFunction },
    { label: 'object', value: { id: 1 } },
    { label: 'array', value: ['a', 'b'] },
    { label: 'null', value: null },
  ];

  const inspectionResults = values.map(({ label, value }) => ({
    label,
    typeofResult: typeof value,
    isArray: Array.isArray(value),
  }));

  console.log('typeofとArray.isArrayの結果:', inspectionResults);

  // typeof null は "object" になる。
  // これは JavaScript の歴史的な仕様として残っている挙動。
  // null 判定は typeof ではなく value === null のように明示的に行う。
  const nullValue = null;
  const arrayValue = ['JavaScript', 'TypeScript'];

  console.log('typeof null:', typeof nullValue);
  console.log('null === null:', nullValue === null);
  console.log('typeof array:', typeof arrayValue);
  console.log('Array.isArray(array):', Array.isArray(arrayValue));

  assert.deepEqual(inspectionResults, [
    { label: 'number', typeofResult: 'number', isArray: false },
    { label: 'string', typeofResult: 'string', isArray: false },
    { label: 'boolean', typeofResult: 'boolean', isArray: false },
    { label: 'undefined', typeofResult: 'undefined', isArray: false },
    { label: 'bigint', typeofResult: 'bigint', isArray: false },
    { label: 'symbol', typeofResult: 'symbol', isArray: false },
    { label: 'function', typeofResult: 'function', isArray: false },
    { label: 'object', typeofResult: 'object', isArray: false },
    { label: 'array', typeofResult: 'object', isArray: true },
    { label: 'null', typeofResult: 'object', isArray: false },
  ]);
  assert.equal(typeof nullValue, 'object');
  assert.equal(nullValue === null, true);
  assert.equal(typeof arrayValue, 'object');
  assert.equal(Array.isArray(arrayValue), true);
}

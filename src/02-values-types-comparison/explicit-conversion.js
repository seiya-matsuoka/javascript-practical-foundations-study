import assert from 'node:assert/strict';

export function runExplicitConversionExamples() {
  // 明示的な型変換は、変換している意図がコード上に残る。
  // フォーム入力や URL query、API レスポンスなど、文字列として入ってくる値を扱うときに重要になる。
  const booleanConversions = [
    { label: 'empty string', converted: Boolean('') },
    { label: 'text', converted: Boolean('text') },
    { label: '0', converted: Boolean(0) },
    { label: '1', converted: Boolean(1) },
    { label: 'null', converted: Boolean(null) },
    { label: 'undefined', converted: Boolean(undefined) },
  ];

  console.log('Boolean(value)の結果:', booleanConversions);

  const numberConversions = [
    { label: '"100"', converted: Number('100') },
    { label: '"10.5"', converted: Number('10.5') },
    { label: 'empty string', converted: Number('') },
    { label: '"text"', converted: Number('text') },
    { label: 'true', converted: Number(true) },
    { label: 'false', converted: Number(false) },
    { label: 'null', converted: Number(null) },
    { label: 'undefined', converted: Number(undefined) },
  ];

  console.log('Number(value)の結果:', numberConversions);

  const stringConversions = [
    { label: '100', converted: String(100) },
    { label: 'true', converted: String(true) },
    { label: 'null', converted: String(null) },
    { label: 'undefined', converted: String(undefined) },
  ];

  console.log('String(value)の結果:', stringConversions);

  // parseInt / parseFloat は、文字列の先頭から数値として読める部分を変換する。
  // Number(value) とは挙動が異なるため、使い分けを意識する。
  const parseResults = {
    parseIntWithUnit: Number.parseInt('120px', 10),
    parseFloatWithUnit: Number.parseFloat('10.5rem'),
    numberWithUnit: Number('120px'),
    parseIntDecimal: Number.parseInt('10.9', 10),
  };

  console.log('parseInt / parseFloatの結果:', parseResults);

  assert.deepEqual(booleanConversions, [
    { label: 'empty string', converted: false },
    { label: 'text', converted: true },
    { label: '0', converted: false },
    { label: '1', converted: true },
    { label: 'null', converted: false },
    { label: 'undefined', converted: false },
  ]);
  assert.equal(numberConversions[0].converted, 100);
  assert.equal(numberConversions[1].converted, 10.5);
  assert.equal(numberConversions[2].converted, 0);
  assert.equal(Number.isNaN(numberConversions[3].converted), true);
  assert.equal(numberConversions[4].converted, 1);
  assert.equal(numberConversions[5].converted, 0);
  assert.equal(numberConversions[6].converted, 0);
  assert.equal(Number.isNaN(numberConversions[7].converted), true);
  assert.deepEqual(stringConversions, [
    { label: '100', converted: '100' },
    { label: 'true', converted: 'true' },
    { label: 'null', converted: 'null' },
    { label: 'undefined', converted: 'undefined' },
  ]);
  assert.equal(parseResults.parseIntWithUnit, 120);
  assert.equal(parseResults.parseFloatWithUnit, 10.5);
  assert.equal(Number.isNaN(parseResults.numberWithUnit), true);
  assert.equal(parseResults.parseIntDecimal, 10);
}

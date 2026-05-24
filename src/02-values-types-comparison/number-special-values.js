import assert from 'node:assert/strict';

export function runNumberSpecialValuesExamples() {
  // NaN は Not-a-Number を表す number 型の特殊な値。
  // 「数値に変換できなかった結果」や「不正な数値計算」の結果として現れる。
  const invalidNumber = Number('not-a-number');
  const invalidCalculation = Math.sqrt(-1);

  console.log('Numberで変換できない値:', invalidNumber);
  console.log('不正な数値計算の結果:', invalidCalculation);
  console.log('typeof NaN:', typeof invalidNumber);

  // Infinity と -Infinity も number 型の特殊な値。
  // 0 除算や、数値の範囲を超える計算結果として現れる。
  const positiveInfinity = 1 / 0;
  const negativeInfinity = -1 / 0;
  const hugeNumber = Number.MAX_VALUE * 2;

  console.log('正のInfinity:', positiveInfinity);
  console.log('負のInfinity:', negativeInfinity);
  console.log('大きすぎる数値:', hugeNumber);

  // Number.isNaN は、値が本当に NaN かどうかを判定する。
  // Number.isFinite は、有限の number かどうかを判定する。
  const numberChecks = [
    {
      label: 'invalidNumber',
      isNaN: Number.isNaN(invalidNumber),
      isFinite: Number.isFinite(invalidNumber),
    },
    {
      label: 'positiveInfinity',
      isNaN: Number.isNaN(positiveInfinity),
      isFinite: Number.isFinite(positiveInfinity),
    },
    {
      label: 'normalNumber',
      isNaN: Number.isNaN(100),
      isFinite: Number.isFinite(100),
    },
    {
      label: 'numericString',
      isNaN: Number.isNaN('100'),
      isFinite: Number.isFinite('100'),
    },
  ];

  console.log('Number.isNaNとNumber.isFiniteの結果:', numberChecks);

  assert.equal(Number.isNaN(invalidNumber), true);
  assert.equal(Number.isNaN(invalidCalculation), true);
  assert.equal(typeof invalidNumber, 'number');
  assert.equal(positiveInfinity, Infinity);
  assert.equal(negativeInfinity, -Infinity);
  assert.equal(hugeNumber, Infinity);
  assert.deepEqual(numberChecks, [
    { label: 'invalidNumber', isNaN: true, isFinite: false },
    { label: 'positiveInfinity', isNaN: false, isFinite: false },
    { label: 'normalNumber', isNaN: false, isFinite: true },
    { label: 'numericString', isNaN: false, isFinite: false },
  ]);
}

import assert from 'node:assert/strict';

export function runTruthyFalsyExamples() {
  // JavaScript では、if 文などの条件式に渡された値が boolean でなくても評価される。
  // false 相当として扱われる値を falsy、それ以外を truthy と呼ぶ。
  const falsyValues = [
    { label: 'false', value: false },
    { label: '0', value: 0 },
    { label: '-0', value: -0 },
    { label: '0n', value: 0n },
    { label: 'empty string', value: '' },
    { label: 'null', value: null },
    { label: 'undefined', value: undefined },
    { label: 'NaN', value: NaN },
  ];

  const falsyResults = falsyValues.map(({ label, value }) => ({
    label,
    booleanValue: Boolean(value),
  }));

  console.log('falsy値:', falsyResults);

  // 空の配列や空の object は truthy。
  // 「中身が空かどうか」と「条件式で true 扱いされるか」は別の話になる。
  const truthyValues = [
    { label: 'non-empty string', value: 'JavaScript' },
    { label: '1', value: 1 },
    { label: 'empty array', value: [] },
    { label: 'empty object', value: {} },
    { label: 'function', value: () => 'value' },
  ];

  const truthyResults = truthyValues.map(({ label, value }) => ({
    label,
    booleanValue: Boolean(value),
  }));

  console.log('truthy値:', truthyResults);

  // if (value) のような短い条件はよく使われる。
  // ただし、0 や空文字を有効な値として扱う場合は、truthy / falsy 判定が適切かを考える必要がある。
  function formatInputValue(value) {
    if (!value) {
      return '未入力';
    }

    return `入力値: ${value}`;
  }

  const formattedValues = [formatInputValue('Alice'), formatInputValue(''), formatInputValue(0)];

  console.log('truthy / falsyを使った入力値表示:', formattedValues);

  assert.deepEqual(falsyResults, [
    { label: 'false', booleanValue: false },
    { label: '0', booleanValue: false },
    { label: '-0', booleanValue: false },
    { label: '0n', booleanValue: false },
    { label: 'empty string', booleanValue: false },
    { label: 'null', booleanValue: false },
    { label: 'undefined', booleanValue: false },
    { label: 'NaN', booleanValue: false },
  ]);
  assert.deepEqual(truthyResults, [
    { label: 'non-empty string', booleanValue: true },
    { label: '1', booleanValue: true },
    { label: 'empty array', booleanValue: true },
    { label: 'empty object', booleanValue: true },
    { label: 'function', booleanValue: true },
  ]);
  assert.deepEqual(formattedValues, ['入力値: Alice', '未入力', '未入力']);
}

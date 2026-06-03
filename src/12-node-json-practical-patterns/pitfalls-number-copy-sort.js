import assert from 'node:assert/strict';

export function runPitfallsNumberCopySortExamples() {
  // JavaScript の number は浮動小数点数として扱われる。
  // 10進小数を正確に表現できない場合があるため、金額計算などでは扱いに注意する。
  const floatingPointResult = 0.1 + 0.2;
  const roundedFloatingPointResult = Math.round(floatingPointResult * 100) / 100;

  console.log('浮動小数点誤差:', floatingPointResult);
  console.log('丸めた結果:', roundedFloatingPointResult);

  const originalTask = {
    id: 1,
    title: 'shallow copyを確認する',
    assignee: {
      name: 'Alice',
    },
  };

  // spread による object copy は shallow copy。
  // ネストした object は共有されるため、内側を変更すると元 object にも影響する。
  const copiedTask = { ...originalTask };
  copiedTask.assignee.name = 'Updated Alice';

  console.log('shallow copy後の元object:', originalTask);
  console.log('shallow copy後のcopy object:', copiedTask);

  const numbers = [10, 2, 1];
  const lexicographicalSortedNumbers = [...numbers].sort();
  const numericSortedNumbers = [...numbers].sort((numberA, numberB) => numberA - numberB);

  // sort は元 array を変更する破壊的 method。
  // 破壊したくない場合は、先に [...array] で shallow copy を作ってから sort する。
  const mutableNumbers = [3, 1, 2];
  const sortedSameReference = mutableNumbers.sort((numberA, numberB) => numberA - numberB);

  console.log('sortの文字列比較結果:', lexicographicalSortedNumbers);
  console.log('sortの数値比較結果:', numericSortedNumbers);
  console.log('sort後の元array:', mutableNumbers);

  assert.equal(floatingPointResult === 0.3, false);
  assert.equal(roundedFloatingPointResult, 0.3);
  assert.equal(originalTask.assignee.name, 'Updated Alice');
  assert.deepEqual(lexicographicalSortedNumbers, [1, 10, 2]);
  assert.deepEqual(numericSortedNumbers, [1, 2, 10]);
  assert.deepEqual(mutableNumbers, [1, 2, 3]);
  assert.equal(sortedSameReference, mutableNumbers);
}

import assert from 'node:assert/strict';

export function runIterableIteratorBasicsExamples() {
  // iterable は、Symbol.iterator method を持つ object。
  // Array、String、Map、Set などは iterable なので、for...of や spread で扱える。
  const values = ['JavaScript', 'TypeScript', 'React'];

  const forOfResults = [];

  for (const value of values) {
    forOfResults.push(value.toUpperCase());
  }

  console.log('for...ofでiterableを処理した結果:', forOfResults);

  const spreadResults = [...values];

  console.log('spreadでiterableをarray化した結果:', spreadResults);

  const text = 'JS';
  const textCharacters = [...text];

  console.log('文字列をspreadした結果:', textCharacters);

  // iterator は next() method を持ち、value と done を返す object。
  // iterable の Symbol.iterator を呼ぶと iterator を取得できる。
  const iterator = values[Symbol.iterator]();

  const firstNext = iterator.next();
  const secondNext = iterator.next();
  const thirdNext = iterator.next();
  const fourthNext = iterator.next();

  console.log('iterator.nextの結果:', {
    firstNext,
    secondNext,
    thirdNext,
    fourthNext,
  });

  // Map も iterable。
  // for...of すると [key, value] の組を順番に取り出せる。
  const userRoleMap = new Map([
    [1, 'admin'],
    [2, 'reader'],
  ]);

  const mapEntries = [];

  for (const [userId, role] of userRoleMap) {
    mapEntries.push(`${userId}:${role}`);
  }

  console.log('Mapをfor...ofで処理した結果:', mapEntries);

  assert.deepEqual(forOfResults, ['JAVASCRIPT', 'TYPESCRIPT', 'REACT']);
  assert.deepEqual(spreadResults, ['JavaScript', 'TypeScript', 'React']);
  assert.deepEqual(textCharacters, ['J', 'S']);
  assert.deepEqual(firstNext, { value: 'JavaScript', done: false });
  assert.deepEqual(secondNext, { value: 'TypeScript', done: false });
  assert.deepEqual(thirdNext, { value: 'React', done: false });
  assert.deepEqual(fourthNext, { value: undefined, done: true });
  assert.deepEqual(mapEntries, ['1:admin', '2:reader']);
}

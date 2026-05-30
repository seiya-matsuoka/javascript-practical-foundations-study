import assert from 'node:assert/strict';

function* createNumberSequence() {
  // generator function は function* で定義する。
  // yield すると、その時点で一度処理を止め、次の next() で続きから再開する。
  yield 1;
  yield 2;
  yield 3;
}

function* createPagedItems(items, pageSize) {
  for (let index = 0; index < items.length; index += pageSize) {
    yield items.slice(index, index + pageSize);
  }
}

function* createLimitedIds(startId, count) {
  let currentId = startId;

  for (let index = 0; index < count; index += 1) {
    yield currentId;
    currentId += 1;
  }
}

export function runGeneratorBasicsExamples() {
  const numberSequence = createNumberSequence();

  const firstNext = numberSequence.next();
  const secondNext = numberSequence.next();
  const thirdNext = numberSequence.next();
  const fourthNext = numberSequence.next();

  console.log('generatorのnext結果:', {
    firstNext,
    secondNext,
    thirdNext,
    fourthNext,
  });

  // generator は iterable でもあるため、for...of や spread で扱える。
  // 必要になったタイミングで順番に値を取り出す、という遅延評価の入口になる。
  const spreadNumbers = [...createNumberSequence()];

  console.log('generatorをspreadした結果:', spreadNumbers);

  const pages = [...createPagedItems(['a', 'b', 'c', 'd', 'e'], 2)];

  console.log('generatorで分割したページ:', pages);

  const generatedIds = [];

  for (const id of createLimitedIds(100, 3)) {
    generatedIds.push(id);
  }

  console.log('generatorで作ったID:', generatedIds);

  assert.deepEqual(firstNext, { value: 1, done: false });
  assert.deepEqual(secondNext, { value: 2, done: false });
  assert.deepEqual(thirdNext, { value: 3, done: false });
  assert.deepEqual(fourthNext, { value: undefined, done: true });
  assert.deepEqual(spreadNumbers, [1, 2, 3]);
  assert.deepEqual(pages, [['a', 'b'], ['c', 'd'], ['e']]);
  assert.deepEqual(generatedIds, [100, 101, 102]);
}

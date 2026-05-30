import assert from 'node:assert/strict';

function createRange(start, end) {
  // 自作 iterable を作るには、Symbol.iterator method を持つ object を返す。
  // for...of は、この method から iterator を取得して next() を繰り返し呼ぶ。
  return {
    start,
    end,
    [Symbol.iterator]() {
      let current = start;

      return {
        next() {
          if (current > end) {
            return {
              value: undefined,
              done: true,
            };
          }

          const value = current;

          current += 1;

          return {
            value,
            done: false,
          };
        },
      };
    },
  };
}

function createTodoCollection(todos) {
  return {
    todos,
    // 実務では、独自 collection object を for...of で回せるようにしたい場面は多くない。
    // ただし iterable の仕組みを知っておくと、Array、Map、Set、generator の共通点を理解しやすい。
    [Symbol.iterator]: function* () {
      for (const todo of todos) {
        yield `${todo.id}: ${todo.title}`;
      }
    },
  };
}

export function runCustomIterableExamples() {
  const range = createRange(3, 5);
  const rangeValues = [...range];

  console.log('自作range iterable:', rangeValues);

  const todoCollection = createTodoCollection([
    { id: 1, title: 'classを確認する' },
    { id: 2, title: 'iterableを確認する' },
  ]);

  const todoLabels = [];

  for (const label of todoCollection) {
    todoLabels.push(label);
  }

  console.log('自作collection iterable:', todoLabels);

  const manualIterator = range[Symbol.iterator]();
  const manualNextResults = [
    manualIterator.next(),
    manualIterator.next(),
    manualIterator.next(),
    manualIterator.next(),
  ];

  console.log('自作iteratorを手動でnextした結果:', manualNextResults);

  assert.deepEqual(rangeValues, [3, 4, 5]);
  assert.deepEqual(todoLabels, ['1: classを確認する', '2: iterableを確認する']);
  assert.deepEqual(manualNextResults, [
    { value: 3, done: false },
    { value: 4, done: false },
    { value: 5, done: false },
    { value: undefined, done: true },
  ]);
}

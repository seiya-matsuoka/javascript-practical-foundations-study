import assert from 'node:assert/strict';

function createFilterByRole(role) {
  // callback として渡す関数が、外側の role を参照している。
  // filter が実行されるタイミングでも、callback は role を覚えている。
  return (user) => user.role === role;
}

// prefix を閉じ込めた map 用 callback を作る。
// callback が実行される時点でも、作成時に渡した prefix を参照できる。
function createMapperWithPrefix(prefix) {
  return (value) => `${prefix}${value}`;
}

function createLoggerCollector() {
  // logs を外側へ直接公開せず、log / getLogs 経由で扱う。
  // closure を使って状態を閉じ込める小さな collector。
  const logs = [];

  return {
    log(message) {
      logs.push(message);
    },
    getLogs() {
      return [...logs];
    },
  };
}

export function runCallbackAndClosureExamples() {
  const users = [
    { id: 1, name: 'Alice', role: 'admin' },
    { id: 2, name: 'Bob', role: 'reader' },
    { id: 3, name: 'Carol', role: 'admin' },
  ];

  // createFilterByRole は、role を閉じ込めた callback を返す。
  // filter 側から見ると通常の predicate 関数だが、内部では closure を使っている。
  const adminUsers = users.filter(createFilterByRole('admin'));
  const readerUsers = users.filter(createFilterByRole('reader'));

  console.log('closureを使ったfilter callback:', {
    adminUsers,
    readerUsers,
  });

  const addUserPrefix = createMapperWithPrefix('user:');
  const prefixedNames = users.map((user) => user.name).map(addUserPrefix);

  console.log('closureを使ったmap callback:', prefixedNames);

  const loggerCollector = createLoggerCollector();

  users.forEach((user) => {
    // forEach の callback から、外側にある loggerCollector を使う。
    // callback は呼び出し元の lexical scope を参照できる。
    loggerCollector.log(`read user ${user.id}`);
  });

  const logs = loggerCollector.getLogs();

  console.log('callback内からclosure stateへ書き込んだ結果:', logs);

  assert.deepEqual(adminUsers, [
    { id: 1, name: 'Alice', role: 'admin' },
    { id: 3, name: 'Carol', role: 'admin' },
  ]);
  assert.deepEqual(readerUsers, [{ id: 2, name: 'Bob', role: 'reader' }]);
  assert.deepEqual(prefixedNames, ['user:Alice', 'user:Bob', 'user:Carol']);
  assert.deepEqual(logs, ['read user 1', 'read user 2', 'read user 3']);
}

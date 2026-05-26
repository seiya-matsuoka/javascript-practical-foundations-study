import assert from 'node:assert/strict';

function createUser({ id, name, role = 'reader' }) {
  // default parameter は、値が undefined の場合に既定値を使う。
  // object 引数と組み合わせると、引数の意味が呼び出し側にも残りやすい。
  return { id, name, role };
}

// 引数全体にも default 値を置くと、引数そのものが省略された場合にも分割代入できる。
// オプション object を受け取る関数では、実務でもよく使う形。
function createSearchCondition({ keyword = '', page = 1, pageSize = 20 } = {}) {
  return { keyword, page, pageSize };
}

function sum(...values) {
  // rest parameter は、残りの引数を配列として受け取る。
  // 可変長の引数を扱いたい場合に使う。
  return values.reduce((total, value) => total + value, 0);
}

// rest parameter は、通常の引数と組み合わせられる。
// 先頭の level は個別に受け取り、残りの message 群だけを array として扱う。
function createLogMessage(level, ...messages) {
  return `[${level}] ${messages.join(' ')}`;
}

export function runParametersAndRestExamples() {
  // object 引数は、呼び出し側でどの値を渡しているかが読みやすい。
  // 引数が増える関数では、位置引数だけで並べるより意図を残しやすい。
  const adminUser = createUser({ id: 1, name: 'Alice', role: 'admin' });
  const defaultRoleUser = createUser({ id: 2, name: 'Bob' });

  console.log('role指定ありのuser:', adminUser);
  console.log('role指定なしのuser:', defaultRoleUser);

  // 引数全体に default 値を指定しておくと、引数省略時にも安全に処理できる。
  const defaultSearchCondition = createSearchCondition();
  const customSearchCondition = createSearchCondition({ keyword: 'javascript', page: 2 });

  console.log('defaultの検索条件:', defaultSearchCondition);
  console.log('一部指定した検索条件:', customSearchCondition);

  // rest parameter は array として扱えるため、reduce などの array method と相性がよい。
  const total = sum(10, 20, 30);
  const emptyTotal = sum();
  const logMessage = createLogMessage('INFO', 'user', 'created', 'successfully');

  console.log('rest parameterで合計した結果:', total);
  console.log('引数なしで合計した結果:', emptyTotal);
  console.log('rest parameterで作ったログ:', logMessage);

  assert.deepEqual(adminUser, { id: 1, name: 'Alice', role: 'admin' });
  assert.deepEqual(defaultRoleUser, { id: 2, name: 'Bob', role: 'reader' });
  assert.deepEqual(defaultSearchCondition, { keyword: '', page: 1, pageSize: 20 });
  assert.deepEqual(customSearchCondition, { keyword: 'javascript', page: 2, pageSize: 20 });
  assert.equal(total, 60);
  assert.equal(emptyTotal, 0);
  assert.equal(logMessage, '[INFO] user created successfully');
}

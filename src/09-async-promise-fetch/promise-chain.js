import assert from 'node:assert/strict';

function fetchRawUser(userId) {
  return Promise.resolve({
    id: userId,
    name: ' Alice ',
    role: 'admin',
  });
}

// Promise chain では、各 then に渡す関数を小さくしておくと流れを追いやすい。
// ここでは取得、整形、検証、表示用文字列生成を別関数に分ける。
function normalizeUser(rawUser) {
  return {
    id: rawUser.id,
    name: rawUser.name.trim(),
    role: rawUser.role,
  };
}

function createUserLabel(user) {
  return `${user.id}: ${user.name} (${user.role})`;
}

function validateUser(user) {
  if (user.name === '') {
    throw new Error('user.nameは必須。');
  }

  return user;
}

export async function runPromiseChainExamples() {
  // Promise chain では、then ごとに小さな処理へ分けて値を変換できる。
  // ただし chain が長すぎると読みづらくなるため、async / await と使い分ける。
  const userLabel = await fetchRawUser(1)
    .then((rawUser) => normalizeUser(rawUser))
    .then((user) => validateUser(user))
    .then((user) => createUserLabel(user));

  // chain の途中で throw された例外は、後続の catch で扱える。
  // validation 失敗を fallback 表示に変換する流れとして読む。
  const recoveredLabel = await Promise.resolve({ id: 2, name: '   ', role: 'reader' })
    .then((rawUser) => normalizeUser(rawUser))
    .then((user) => validateUser(user))
    .then((user) => createUserLabel(user))
    .catch((error) => `fallback: ${error.message}`);

  // then の中で Promise を return すると、その Promise の完了を待って次の then に進む。
  // 非同期処理を段階的につなぐときによく使う挙動。
  const delayedChainResult = await Promise.resolve('start')
    .then((value) => Promise.resolve(`${value}:step1`))
    .then((value) => `${value}:step2`);

  console.log('Promise chainで作ったuser label:', userLabel);
  console.log('Promise chainのcatchで復旧したlabel:', recoveredLabel);
  console.log('thenの中でPromiseを返した結果:', delayedChainResult);

  assert.equal(userLabel, '1: Alice (admin)');
  assert.equal(recoveredLabel, 'fallback: user.nameは必須。');
  assert.equal(delayedChainResult, 'start:step1:step2');
}

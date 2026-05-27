import assert from 'node:assert/strict';

export function runDestructuringBasicsExamples() {
  const user = {
    id: 1,
    name: 'Alice',
    role: 'admin',
    active: true,
  };

  // object の分割代入は、プロパティを変数として取り出す構文。
  // user.name を何度も書くより、必要な値を先に取り出すと読みやすい場面がある。
  const { id, name, role } = user;

  console.log('分割代入で取り出した値:', {
    id,
    name,
    role,
  });

  // 変数名を変えたい場合は、プロパティ名: 変数名 の形で書く。
  // API レスポンスのキー名と、コード内で使いたい名前を分けたいときに使う。
  const { name: displayName, active: isActive } = user;

  console.log('別名を付けて取り出した値:', {
    displayName,
    isActive,
  });

  // 分割代入では、存在しないプロパティは undefined になる。
  // default 値を指定すると、undefined の場合だけ既定値が使われる。
  const { email = '未設定' } = user;

  console.log('default値付きの分割代入:', email);

  // const で分割代入した変数は、通常の const 変数と同じ。
  // 元 object と特別に同期されるわけではない。
  const mutableUser = {
    name: 'Bob',
  };

  const { name: beforeMutationName } = mutableUser;

  mutableUser.name = 'Carol';

  console.log('分割代入後に元objectを変更した結果:', {
    beforeMutationName,
    currentName: mutableUser.name,
  });

  assert.equal(id, 1);
  assert.equal(name, 'Alice');
  assert.equal(role, 'admin');
  assert.equal(displayName, 'Alice');
  assert.equal(isActive, true);
  assert.equal(email, '未設定');
  assert.equal(beforeMutationName, 'Bob');
  assert.equal(mutableUser.name, 'Carol');
}

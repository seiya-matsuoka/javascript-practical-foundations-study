import assert from 'node:assert/strict';

export function runObjectLiteralAndAccessExamples() {
  // object literal は、JavaScript で object を直接作る基本的な書き方。
  // API レスポンス、設定値、フォームデータ、React の props / state など、実務で最もよく見る形の 1 つ。
  const user = {
    id: 1,
    name: 'Alice',
    active: true,
    profile: {
      role: 'admin',
      location: 'Tokyo',
    },
  };

  console.log('object literalで作ったuser:', user);

  // dot 記法は、プロパティ名がコード上で固定されている場合に読みやすい。
  // Java のフィールドアクセスに近い見た目だが、JavaScript では object のプロパティを読んでいる。
  const userName = user.name;
  const userRole = user.profile.role;

  console.log('dot記法で読んだname:', userName);
  console.log('dot記法で読んだrole:', userRole);

  // bracket 記法は、プロパティ名を文字列として指定する。
  // プロパティ名を変数で持つ場合や、ハイフンを含むキーなど dot 記法で書けない場合に使う。
  const propertyName = 'active';
  const isActive = user[propertyName];

  console.log('bracket記法で読んだactive:', isActive);

  const responseHeader = {
    'content-type': 'application/json',
    'x-request-id': 'req-001',
  };

  const contentType = responseHeader['content-type'];
  const requestId = responseHeader['x-request-id'];

  console.log('bracket記法で読んだcontent-type:', contentType);
  console.log('bracket記法で読んだx-request-id:', requestId);

  // 存在しないプロパティを読むと undefined になる。
  // この挙動は便利だが、タイポに気づきにくい原因にもなる。
  const missingValue = user.email;

  console.log('存在しないプロパティ:', missingValue);

  assert.deepEqual(user, {
    id: 1,
    name: 'Alice',
    active: true,
    profile: {
      role: 'admin',
      location: 'Tokyo',
    },
  });
  assert.equal(userName, 'Alice');
  assert.equal(userRole, 'admin');
  assert.equal(isActive, true);
  assert.equal(contentType, 'application/json');
  assert.equal(requestId, 'req-001');
  assert.equal(missingValue, undefined);
}

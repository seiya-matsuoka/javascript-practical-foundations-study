import assert from 'node:assert/strict';

function formatUserSummary({ id, name, role = 'reader' }) {
  // 関数引数で分割代入すると、呼び出し側から渡された object の必要なプロパティだけを受け取れる。
  // options object や API レスポンスの整形処理でよく使う。
  return `${id}: ${name} (${role})`;
}

function createPagination({ page = 1, pageSize = 20 } = {}) {
  // 引数全体に default 値を置くと、関数呼び出し時に引数を省略できる。
  // { page = 1 } だけでは、引数そのものが undefined の場合に分割代入できない点に注意する。
  return {
    page,
    pageSize,
    offset: (page - 1) * pageSize,
  };
}

function createApiUrl({ baseUrl, path, query = {} }) {
  const queryText = Object.entries(query)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  return queryText === '' ? `${baseUrl}${path}` : `${baseUrl}${path}?${queryText}`;
}

export function runFunctionParameterDestructuringExamples() {
  const summary = formatUserSummary({
    id: 1,
    name: 'Alice',
    role: 'admin',
  });

  const defaultRoleSummary = formatUserSummary({
    id: 2,
    name: 'Bob',
  });

  console.log('関数引数で分割代入したsummary:', summary);
  console.log('default値を使ったsummary:', defaultRoleSummary);

  const defaultPagination = createPagination();
  const customPagination = createPagination({ page: 3, pageSize: 10 });

  console.log('defaultのpagination:', defaultPagination);
  console.log('指定ありのpagination:', customPagination);

  const usersUrl = createApiUrl({
    baseUrl: 'https://example.com',
    path: '/api/users',
    query: {
      keyword: 'JavaScript basics',
      page: 2,
    },
  });

  console.log('options objectから作ったURL:', usersUrl);

  // 関数引数の分割代入は便利だが、引数 object の構造が複雑すぎると読みづらくなる。
  // その場合は、関数内で段階的に取り出す方が追いやすい。
  assert.equal(summary, '1: Alice (admin)');
  assert.equal(defaultRoleSummary, '2: Bob (reader)');
  assert.deepEqual(defaultPagination, {
    page: 1,
    pageSize: 20,
    offset: 0,
  });
  assert.deepEqual(customPagination, {
    page: 3,
    pageSize: 10,
    offset: 20,
  });
  assert.equal(usersUrl, 'https://example.com/api/users?keyword=JavaScript%20basics&page=2');
}

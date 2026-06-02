import assert from 'node:assert/strict';

function buildQueryObject({ page, perPage, keyword, status, sort }) {
  // query parameter に変換する前の object を作る段階では、
  // undefined や空文字を含めるかどうかを先に整理しておくと扱いやすい。
  const query = {
    page,
    perPage,
    keyword,
    status,
    sort,
  };

  return Object.fromEntries(
    Object.entries(query).filter(([, value]) => {
      return value !== undefined && value !== '';
    }),
  );
}

function buildQueryString(queryObject) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(queryObject)) {
    searchParams.set(key, String(value));
  }

  return searchParams.toString();
}

export function runQueryParamsObjectExamples() {
  const queryObject = buildQueryObject({
    page: 2,
    perPage: 20,
    keyword: 'node',
    status: 'doing',
    sort: undefined,
  });

  const queryString = buildQueryString(queryObject);

  console.log('query parameter風object:', queryObject);
  console.log('query string:', queryString);

  const emptyKeywordQueryObject = buildQueryObject({
    page: 1,
    perPage: 10,
    keyword: '',
    status: undefined,
    sort: 'createdAt',
  });

  const emptyKeywordQueryString = buildQueryString(emptyKeywordQueryObject);

  console.log('空文字を除外したquery object:', emptyKeywordQueryObject);
  console.log('空文字を除外したquery string:', emptyKeywordQueryString);

  assert.deepEqual(queryObject, {
    page: 2,
    perPage: 20,
    keyword: 'node',
    status: 'doing',
  });
  assert.equal(queryString, 'page=2&perPage=20&keyword=node&status=doing');
  assert.deepEqual(emptyKeywordQueryObject, {
    page: 1,
    perPage: 10,
    sort: 'createdAt',
  });
  assert.equal(emptyKeywordQueryString, 'page=1&perPage=10&sort=createdAt');
}

import assert from 'node:assert/strict';

function normalizeSearchParams(rawParams) {
  // default value は「値がない場合に何を採用するか」を明示するために使う。
  // || を使うと 0 や空文字も default に置き換わるため、null / undefined だけを扱うなら ?? を使う。
  const page = rawParams.page ?? 1;
  const perPage = rawParams.perPage ?? 20;
  const keyword = rawParams.keyword ?? '';
  const sort = rawParams.sort ?? 'createdAt';

  return {
    page,
    perPage,
    keyword,
    sort,
  };
}

export function runOptionalDefaultValuesExamples() {
  const rawParamsList = [
    {},
    { page: 2, perPage: 10, keyword: 'node' },
    { page: 0, perPage: 0, keyword: '', sort: null },
  ];

  const normalizedParamsList = rawParamsList.map((rawParams) => normalizeSearchParams(rawParams));

  console.log('default valueを適用した検索条件:', normalizedParamsList);

  // optional chaining は便利だが、どこでも付ければよいわけではない。
  // 必須の値まで ?. で読み飛ばすと、本来早く気づくべきデータ不備を見逃しやすい。
  const response = {
    data: {
      items: [{ id: 1, title: 'Node.js' }],
    },
  };

  const firstTitle = response.data?.items?.[0]?.title ?? '未設定';

  console.log('optional chainingで取り出したtitle:', firstTitle);

  assert.deepEqual(normalizedParamsList, [
    {
      page: 1,
      perPage: 20,
      keyword: '',
      sort: 'createdAt',
    },
    {
      page: 2,
      perPage: 10,
      keyword: 'node',
      sort: 'createdAt',
    },
    {
      page: 0,
      perPage: 0,
      keyword: '',
      sort: 'createdAt',
    },
  ]);
  assert.equal(firstTitle, 'Node.js');
}

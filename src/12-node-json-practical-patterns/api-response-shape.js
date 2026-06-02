import assert from 'node:assert/strict';

const apiResponse = {
  status: 'success',
  meta: {
    requestId: 'req-001',
    page: 1,
    perPage: 3,
    total: 6,
  },
  data: [
    {
      id: 1,
      title: 'Node.jsのprocessを確認する',
      status: 'todo',
      assignee: {
        id: 10,
        name: 'Alice',
      },
    },
    {
      id: 2,
      title: 'JSONファイルを読み込む',
      status: 'doing',
      assignee: null,
    },
    {
      id: 3,
      title: 'APIレスポンス風データを整形する',
      status: 'done',
      assignee: {
        id: 11,
        name: 'Bob',
      },
    },
  ],
};

export function runApiResponseShapeExamples() {
  // API レスポンスは data だけでなく、status や meta を含む形になることが多い。
  // まず response 全体の形を見てから、表示や処理に必要な data を取り出す。
  const responseStatus = apiResponse.status;
  const requestId = apiResponse.meta.requestId;
  const tasks = apiResponse.data;

  const taskTitles = tasks.map((task) => task.title);

  console.log('APIレスポンスのstatus:', responseStatus);
  console.log('APIレスポンスのrequestId:', requestId);
  console.log('APIレスポンスから取り出したtitle:', taskTitles);

  const pageInfo = {
    currentPage: apiResponse.meta.page,
    perPage: apiResponse.meta.perPage,
    total: apiResponse.meta.total,
    totalPages: Math.ceil(apiResponse.meta.total / apiResponse.meta.perPage),
  };

  console.log('metaから作ったページ情報:', pageInfo);

  assert.equal(responseStatus, 'success');
  assert.equal(requestId, 'req-001');
  assert.deepEqual(taskTitles, [
    'Node.jsのprocessを確認する',
    'JSONファイルを読み込む',
    'APIレスポンス風データを整形する',
  ]);
  assert.deepEqual(pageInfo, {
    currentPage: 1,
    perPage: 3,
    total: 6,
    totalPages: 2,
  });
}

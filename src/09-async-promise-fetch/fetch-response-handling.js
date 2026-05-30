import assert from 'node:assert/strict';

// Response object を手元で作ることで、外部 API に依存せず fetch 後の処理を確認する。
// 実務では fetch が返す Response に対して、同じように ok / status / json() を扱う。
// eslint-disable-next-line no-unused-vars
function createJsonResponse({ ok, status, body }) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

async function parseUserResponse(response) {
  // fetch の Response は、HTTP status が 404 や 500 でも、それだけで必ず例外になるわけではない。
  // response.ok を見て、アプリ側の失敗として扱うかを判断する。
  const body = await response.json();

  if (!response.ok) {
    return {
      ok: false,
      value: null,
      error: {
        status: response.status,
        message: body.message ?? 'APIエラーが発生した。',
      },
    };
  }

  // API 通信に成功しても、body の形が期待通りとは限らない。
  // TypeScript に進む前の JavaScript 段階でも、最低限の実行時チェックは重要になる。
  if (typeof body.id !== 'number' || typeof body.name !== 'string') {
    return {
      ok: false,
      value: null,
      error: {
        status: response.status,
        message: 'ユーザー情報の形式が不正。',
      },
    };
  }

  return {
    ok: true,
    value: {
      id: body.id,
      name: body.name,
    },
    error: null,
  };
}

async function fetchJsonFromDataUrl() {
  // Node.js の fetch でも、data URL を使えば外部ネットワークに依存せず response handling を確認できる。
  // 実務では URL、method、headers、body、credentials などを用途に応じて指定する。
  const response = await fetch('data:application/json,{"message":"hello from data url"}');
  const body = await response.json();

  return {
    ok: response.ok,
    status: response.status,
    body,
  };
}

export async function runFetchResponseHandlingExamples() {
  // 成功、HTTP 失敗、body 形式不正を分けて用意する。
  // API 通信では、通信できたことと、アプリが期待するデータを得られたことは別の確認になる。
  const successResponse = createJsonResponse({
    ok: true,
    status: 200,
    body: { id: 1, name: 'Alice' },
  });

  const errorResponse = createJsonResponse({
    ok: false,
    status: 404,
    body: { message: 'ユーザーが見つからない。' },
  });

  const invalidResponse = createJsonResponse({
    ok: true,
    status: 200,
    body: { id: '1', displayName: 'Alice' },
  });

  const successResult = await parseUserResponse(successResponse);
  const errorResult = await parseUserResponse(errorResponse);
  const invalidResult = await parseUserResponse(invalidResponse);
  const dataUrlResult = await fetchJsonFromDataUrl();

  console.log('fetch成功responseの処理結果:', successResult);
  console.log('fetch失敗responseの処理結果:', errorResult);
  console.log('fetch形式不正responseの処理結果:', invalidResult);
  console.log('Node.js fetchでdata URLを取得した結果:', dataUrlResult);

  assert.deepEqual(successResult, {
    ok: true,
    value: { id: 1, name: 'Alice' },
    error: null,
  });
  assert.deepEqual(errorResult, {
    ok: false,
    value: null,
    error: { status: 404, message: 'ユーザーが見つからない。' },
  });
  assert.deepEqual(invalidResult, {
    ok: false,
    value: null,
    error: { status: 200, message: 'ユーザー情報の形式が不正。' },
  });
  assert.deepEqual(dataUrlResult, {
    ok: true,
    status: 200,
    body: { message: 'hello from data url' },
  });
}

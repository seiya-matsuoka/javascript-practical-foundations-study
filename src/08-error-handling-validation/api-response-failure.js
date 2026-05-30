import assert from 'node:assert/strict';

// fetch の Response を単純化した object を作る。
// 本物の fetch を使わず、ok / status / json() の扱いだけに集中するためのサンプル。
function createApiResponse({ ok, status, body }) {
  return {
    ok,
    status,
    async json() {
      return body;
    },
  };
}

// API response は、HTTP 的に成功かどうかと、body が期待形式かどうかを分けて確認する。
// response.ok が true でも、アプリが必要とする field が揃っているとは限らない。
async function parseUserApiResponse(response) {
  const body = await response.json();

  // HTTP status が失敗の場合は、body の message を使ってアプリ側の失敗に変換する。
  // fetch は 404 / 500 を自動で throw しないため、この確認が必要になる。
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

  // 成功 response でも body の形式が崩れている場合は、別の失敗として扱う。
  // TypeScript に進むと、この確認は型や schema validation の話につながる。
  if (typeof body.id !== 'number' || typeof body.name !== 'string') {
    return {
      ok: false,
      value: null,
      error: {
        status: response.status,
        message: 'APIレスポンスの形式が不正。',
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

export async function runApiResponseFailureExamples() {
  // fetch の response は、HTTP status が 404 や 500 でも、それだけで必ず例外になるわけではない。
  // 実務では response.ok や status を見て、アプリ側の失敗として扱うことが多い。
  const successResponse = createApiResponse({
    ok: true,
    status: 200,
    body: {
      id: 1,
      name: 'Alice',
    },
  });

  const notFoundResponse = createApiResponse({
    ok: false,
    status: 404,
    body: {
      message: 'ユーザーが見つからない。',
    },
  });

  const invalidBodyResponse = createApiResponse({
    ok: true,
    status: 200,
    body: {
      id: '1',
      displayName: 'Alice',
    },
  });

  const successResult = await parseUserApiResponse(successResponse);
  const notFoundResult = await parseUserApiResponse(notFoundResponse);
  const invalidBodyResult = await parseUserApiResponse(invalidBodyResponse);

  console.log('API成功レスポンスの処理結果:', successResult);
  console.log('API失敗レスポンスの処理結果:', notFoundResult);
  console.log('API形式不正レスポンスの処理結果:', invalidBodyResult);

  assert.deepEqual(successResult, {
    ok: true,
    value: {
      id: 1,
      name: 'Alice',
    },
    error: null,
  });
  assert.deepEqual(notFoundResult, {
    ok: false,
    value: null,
    error: {
      status: 404,
      message: 'ユーザーが見つからない。',
    },
  });
  assert.deepEqual(invalidBodyResult, {
    ok: false,
    value: null,
    error: {
      status: 200,
      message: 'APIレスポンスの形式が不正。',
    },
  });
}

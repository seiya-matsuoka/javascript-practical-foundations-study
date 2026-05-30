import assert from 'node:assert/strict';

function getFetchEnvironmentSummary() {
  // fetch はもともとブラウザの Web API として使われてきたが、現在の Node.js でもグローバルに利用できる。
  // ただし、ブラウザでは CORS、credentials、cookie、画面状態との連携など、ブラウザ側の制約も関係する。
  return {
    hasFetch: typeof fetch === 'function',
    hasRequest: typeof Request === 'function',
    hasResponse: typeof Response === 'function',
    hasAbortController: typeof AbortController === 'function',
    hasDocument: typeof document !== 'undefined',
    runtime: typeof document === 'undefined' ? 'Node.js' : 'Browser',
  };
}

function createBrowserFetchExample() {
  // ブラウザ側では、click event や form submit などの UI 操作をきっかけに fetch することが多い。
  // この文字列は実行用ではなく、Node.js とブラウザで fetch の使いどころが違うことを確認するための最小例。
  return `async function loadUser() {
  const response = await fetch('/api/user');
  const user = await response.json();

  return user;
}`;
}

// Node.js でも fetch は使えるが、document や browser event があるわけではない。
// ここでは data URL を使い、Node.js 上で fetch の戻り値を安全に確認する。
async function createNodeFetchResult() {
  const response = await fetch('data:application/json,{"runtime":"Node.js"}');
  const body = await response.json();

  return {
    ok: response.ok,
    status: response.status,
    body,
  };
}

export async function runNodeAndBrowserFetchExamples() {
  const environmentSummary = getFetchEnvironmentSummary();
  const browserFetchExample = createBrowserFetchExample();
  const nodeFetchResult = await createNodeFetchResult();

  console.log('fetch関連APIの存在確認:', environmentSummary);
  console.log('ブラウザfetchの最小例:', browserFetchExample);
  console.log('Node.js fetchの実行結果:', nodeFetchResult);

  // 実行環境によって利用できる API は異なる。
  // 同じ fetch でも、Node.js とブラウザでは周辺にある API や制約が違う点を確認する。
  assert.deepEqual(environmentSummary, {
    hasFetch: true,
    hasRequest: true,
    hasResponse: true,
    hasAbortController: true,
    hasDocument: false,
    runtime: 'Node.js',
  });
  assert.equal(browserFetchExample.includes("fetch('/api/user')"), true);
  assert.deepEqual(nodeFetchResult, {
    ok: true,
    status: 200,
    body: { runtime: 'Node.js' },
  });
}

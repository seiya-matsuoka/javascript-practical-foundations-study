import assert from 'node:assert/strict';

function createJsonDataUrl(value) {
  const jsonText = JSON.stringify(value);
  const encodedJson = encodeURIComponent(jsonText);

  // data URL を使うことで、外部ネットワークに依存せず fetch の流れを確認できる。
  // 実務では https://... の API endpoint に対して同じ fetch の流れを使う。
  return `data:application/json,${encodedJson}`;
}

export async function runNodeFetchBasicsExamples() {
  const responseBody = {
    status: 'ok',
    data: {
      id: 1,
      name: 'local data url',
    },
  };

  const url = createJsonDataUrl(responseBody);

  // Node.js でも fetch を使える。
  // ブラウザの fetch と似た API だが、実行環境は Node.js のため、CORS や cookie の扱いなどは同じではない。
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`fetchに失敗した。status=${response.status}`);
  }

  const json = await response.json();

  console.log('Node.js fetchで取得したJSON:', json);

  // response.json() も非同期処理。
  // fetch が成功しても、JSON として parse できない response ならここで失敗する可能性がある。
  assert.deepEqual(json, responseBody);
}

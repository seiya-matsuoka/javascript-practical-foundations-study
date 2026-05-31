// fetch のサンプルをローカルサーバーなしで動かすため、取得先 URL を関数で組み立てる。
// 実務では外部 API の URL やアプリ内 API の endpoint を指定するが、ここでは data URL を使う。
function createSampleApiUrl() {
  // fetch 後に response.json() で復元される想定の object。
  // 通信結果として受け取る JSON の形を先に明示している。
  const sampleResponse = {
    source: 'data-url',
    tasks: [
      { id: 101, title: 'fetchでJSONを取得する', completed: false },
      { id: 102, title: 'Responseのokを確認する', completed: true },
    ],
  };

  // data URL は文字列として JSON を埋め込むため、まず object を JSON 文字列に変換する。
  const jsonText = JSON.stringify(sampleResponse);

  // file:// で HTML を直接開いた場合、ローカル JSON ファイルへの fetch は制限されることがある。
  // このサンプルでは data URL を使い、ローカルサーバーなしで fetch / Response / JSON 取得を確認する。
  return `data:application/json;charset=utf-8,${encodeURIComponent(jsonText)}`;
}

export async function fetchSampleTasks() {
  // fetch は Promise を返すため、await で Response object の取得を待つ。
  // Unit 09 で扱った非同期処理が、ブラウザ API ではこのような形で現れる。
  const response = await fetch(createSampleApiUrl());

  // fetch は HTTP error status でも Promise 自体は reject しない。
  // response.ok を確認し、アプリ側で失敗として扱うか判断する。
  if (!response.ok) {
    throw new Error(`取得に失敗した。status=${response.status}`);
  }

  // response.json() も Promise を返す。
  // Response の body 読み取りも非同期処理になる点に注意する。
  const data = await response.json();

  return data;
}

export function setupFetchResult() {
  // DOM の表示先を取得し、fetch の実行結果を画面へ反映する処理をまとめる。
  // React では state 更新で画面を変えるが、ここでは textContent を直接更新する。
  const fetchResult = document.querySelector('[data-fetch-result]');

  async function load() {
    // click event から呼ばれる処理。
    // 取得中、成功、失敗の状態を textContent で表示する。
    fetchResult.textContent = '取得中...';

    // fetch はネットワーク失敗や JSON 変換失敗で reject される可能性があるため、try-catch で囲む。
    try {
      const data = await fetchSampleTasks();

      fetchResult.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
      fetchResult.textContent = `エラー: ${error.message}`;
    }
  }

  return {
    load,
  };
}

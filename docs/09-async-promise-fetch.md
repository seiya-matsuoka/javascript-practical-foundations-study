# 09. Promise・async/await・イベントループ・fetch

## 1. 学習対象

この単位では、JavaScript の非同期処理を体系的に扱う。  
同期処理と非同期処理の違い、event loop、task queue、microtask queue、callback、Promise、`then` / `catch` / `finally`、Promise chain、async function、`await`、逐次実行、並列実行、fetch、timeout、`AbortController` を確認する。

非同期処理は、Node.js、ブラウザ JavaScript、React、API 通信、TypeScript のすべてにつながる。  
単に `await` を書けるようになるだけでなく、実行順、失敗時の扱い、逐次実行と並列実行の使い分けまで含めて理解する。

## 2. この単位で扱う主な内容

この単位で扱う内容は次の通り。

- 同期処理と非同期処理
- call stack
- event loop の概要
- task queue の概要
- microtask queue の概要
- callback
- Promise
- `then`
- `catch`
- `finally`
- Promise chain
- async function
- `await`
- async / await での try-catch
- 逐次実行
- 並列実行
- `Promise.all`
- `Promise.allSettled`
- `Promise.race`
- `Promise.any`
- Promise rejection
- 非同期処理とループ
- `for...of` と `await`
- `map` + async
- `forEach` + async の注意
- `fetch`
- response handling
- JSON 取得
- timeout
- `AbortController`
- Node.js での fetch
- ブラウザでの fetch

## 3. ファイル構成

この単位のファイル構成は次の通り。

```text
src/
  09-async-promise-fetch/
    index.js
    async-helpers.js
    sync-vs-async.js
    event-loop-overview.js
    callback-async-basics.js
    promise-basics.js
    then-catch-finally.js
    promise-chain.js
    async-function-and-await.js
    async-try-catch.js
    promise-rejection-handling.js
    sequential-and-parallel.js
    promise-combinators.js
    async-loops.js
    fetch-response-handling.js
    fetch-timeout-abort.js
    node-and-browser-fetch.js

docs/
  09-async-promise-fetch.md
```

各ファイルの役割は次の通り。

- `index.js`
  - Unit 09 のサンプルを順番に実行する入口。
- `async-helpers.js`
  - 非同期サンプルで共通利用する待機処理、遅延成功、遅延失敗、result 変換を定義する。
- `sync-vs-async.js`
  - 同期処理と非同期処理の実行順の違いを確認する。
- `event-loop-overview.js`
  - call stack、task queue、microtask queue の入口を確認する。
- `callback-async-basics.js`
  - callback を使った非同期処理の基本を確認する。
- `promise-basics.js`
  - Promise の fulfilled / rejected と `await` の基本を確認する。
- `then-catch-finally.js`
  - `then` / `catch` / `finally` の役割を確認する。
- `promise-chain.js`
  - Promise chain で値をつなげて変換する流れを確認する。
- `async-function-and-await.js`
  - async function と `await` の戻り値の扱いを確認する。
- `async-try-catch.js`
  - async / await での try-catch を確認する。
- `promise-rejection-handling.js`
  - Promise rejection を呼び出し元で扱う流れを確認する。
- `sequential-and-parallel.js`
  - 逐次実行と並列実行の違いを確認する。
- `promise-combinators.js`
  - `Promise.all`、`Promise.allSettled`、`Promise.race`、`Promise.any` を確認する。
- `async-loops.js`
  - `for...of` と `await`、`map` + async、`forEach` + async の注意を確認する。
- `fetch-response-handling.js`
  - fetch の response handling と JSON 取得を確認する。
- `fetch-timeout-abort.js`
  - timeout と `AbortController` の考え方を確認する。
- `node-and-browser-fetch.js`
  - Node.js とブラウザでの fetch の位置づけを確認する。
- `09-async-promise-fetch.md`
  - この単位の内容、実行方法、注目ポイント、確認観点をまとめたドキュメント。

## 4. 実行方法

Node.js 側のサンプルは、リポジトリ直下で次のコマンドを実行する。

```bash
npm run unit:09
```

ESLint を確認する場合は次を実行する。

```bash
npm run lint
```

Prettier の整形チェックを行う場合は次を実行する。

```bash
npm run format:check
```

整形が必要な場合は次を実行する。

```bash
npm run format
```

## 5. コードを読む順番

コードは次の順番で読むと理解しやすい。

1. `src/09-async-promise-fetch/index.js`
2. `src/09-async-promise-fetch/async-helpers.js`
3. `src/09-async-promise-fetch/sync-vs-async.js`
4. `src/09-async-promise-fetch/event-loop-overview.js`
5. `src/09-async-promise-fetch/callback-async-basics.js`
6. `src/09-async-promise-fetch/promise-basics.js`
7. `src/09-async-promise-fetch/then-catch-finally.js`
8. `src/09-async-promise-fetch/promise-chain.js`
9. `src/09-async-promise-fetch/async-function-and-await.js`
10. `src/09-async-promise-fetch/async-try-catch.js`
11. `src/09-async-promise-fetch/promise-rejection-handling.js`
12. `src/09-async-promise-fetch/sequential-and-parallel.js`
13. `src/09-async-promise-fetch/promise-combinators.js`
14. `src/09-async-promise-fetch/async-loops.js`
15. `src/09-async-promise-fetch/fetch-response-handling.js`
16. `src/09-async-promise-fetch/fetch-timeout-abort.js`
17. `src/09-async-promise-fetch/node-and-browser-fetch.js`

前半で Promise / async / await の基本と実行順を確認し、後半で複数 Promise の扱い、非同期 loop、fetch、timeout、Node.js とブラウザでの fetch を確認する。  
`index.js` から読むと、Unit 全体の実行順を把握しやすい。

## 6. 注目ポイント

### 6-1. 非同期処理は「後で完了する処理」を表す

`async-helpers.js` では、`setTimeout` を Promise で包んでいる。

```js
export function createDelayedValue(value, ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}
```

Promise は、今すぐ結果を返せない処理の完了を表す object。  
API 通信、timer、ファイル読み込みなど、後で完了する処理を扱うための土台になる。

### 6-2. microtask は task より先に処理される

`event-loop-overview.js` では、同期処理、Promise microtask、`setTimeout` task の実行順を確認する。

```js
Promise.resolve().then(() => {
  executionOrder.push('microtask: Promise.then');
});

setTimeout(() => {
  executionOrder.push('task: setTimeout');
}, 0);
```

Promise の `.then` は microtask queue に入り、`setTimeout` は task queue に入る。  
そのため、同期処理が終わった後、基本的に microtask の方が task より先に処理される。

### 6-3. `await` は Promise の完了を待って値を取り出す

`async-function-and-await.js` では、`await` で Promise の結果を受け取っている。

```js
const user = await fetchUser(1);
```

`await` を使うと、非同期処理を上から順に読む形で書ける。  
ただし、処理が同期化されるわけではなく、Promise の完了を待つ構文である点は意識する。

### 6-4. 逐次実行と並列実行は使い分ける

`sequential-and-parallel.js` では、`for...of` と `Promise.all` の違いを確認している。

```js
for (const taskId of taskIds) {
  const result = await createDelayedValue(`task-${taskId}`, 1);

  results.push(result);
}
```

```js
const promises = taskIds.map((taskId) => createDelayedValue(`task-${taskId}`, 1));

return Promise.all(promises);
```

前の結果が次に必要な場合は逐次実行が自然。  
互いに独立した処理なら、Promise の配列を作って `Promise.all` でまとめて待つ方が向いている。

### 6-5. `Promise.allSettled` は一部失敗しても全体の結果を見られる

`promise-combinators.js` では、成功と失敗が混ざった Promise を `Promise.allSettled` で扱っている。

```js
const allSettledResults = await Promise.allSettled([
  createDelayedValue('success', 1),
  createDelayedError('allSettled内の失敗', 1),
]);
```

`Promise.all` は 1 つでも失敗すると全体が rejected になる。  
一方、`Promise.allSettled` は成功・失敗をそれぞれ結果として受け取れるため、複数 API の一部失敗を画面に出し分けたい場合に使いやすい。

### 6-6. `forEach` は async callback の完了を待たない

`async-loops.js` では、`forEach` に async callback を渡す注意点を扱っている。

```js
ids.forEach(async (id) => {
  const label = await fetchLabel(id);

  results.push(label);
});
```

`forEach` は callback の戻り値を待たない。  
非同期処理を順番に待ちたい場合は `for...of`、並列に待ちたい場合は `map` + `Promise.all` を使う方が意図が明確になる。

### 6-7. fetch は response handling まで含めて考える

`fetch-response-handling.js` では、`response.ok` と body の形式確認を行っている。

```js
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
```

fetch では、HTTP status が 404 や 500 でも、それだけで必ず例外になるわけではない。  
`response.ok`、`status`、JSON body の形式確認まで含めて、アプリ側の失敗として扱う。

### 6-8. timeout は `AbortController` と組み合わせて扱う

`fetch-timeout-abort.js` では、`AbortController` と timer を組み合わせている。

```js
const controller = new AbortController();
const timeoutId = setTimeout(() => {
  controller.abort();
}, timeoutMs);
```

fetch には単純な `timeoutMs` 引数がない。  
timeout を扱う場合は、`AbortController` の `signal` を渡し、一定時間後に `abort()` する考え方が基本になる。

## 7. 引っかかりやすい点

### 7-1. `await` を書くと常に並列になるわけではない

`for...of` の中で `await` すると、処理は 1 件ずつ進む。

```js
for (const taskId of taskIds) {
  const result = await createDelayedValue(`task-${taskId}`, 1);

  results.push(result);
}
```

並列実行したい場合は、先に Promise の配列を作り、`Promise.all` でまとめて待つ。

### 7-2. `map` + async は Promise の配列を返す

`async-loops.js` では、`map` に async callback を渡している。

```js
const promises = ids.map(async (id) => {
  const label = await fetchLabel(id);

  return label.toUpperCase();
});
```

この時点の `promises` は文字列の配列ではなく、Promise の配列。  
値の配列として使いたい場合は、`await Promise.all(promises)` が必要になる。

### 7-3. `Promise.all` は一部失敗すると全体が失敗する

`promise-combinators.js` では、1 つの Promise が rejected になる例を扱っている。

```js
await Promise.all([createDelayedValue('success', 1), createDelayedError('Promise.all内の失敗', 1)]);
```

すべての成功が必要な場合は `Promise.all` が向いている。  
一部失敗しても結果を見たい場合は `Promise.allSettled` を検討する。

### 7-4. fetch の成功と API としての成功は同じではない

fetch が完了したことと、アプリケーションとして成功したことは別。  
`response.ok` が `false` の場合は、アプリ側で失敗として扱う必要がある。

```js
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
```

### 7-5. timeout 用 timer は後片付けが必要になる

`fetch-timeout-abort.js` では、`finally` で timeout 用 timer を片付けている。

```js
try {
  return await task({ signal: controller.signal });
} finally {
  clearTimeout(timeoutId);
}
```

成功時も失敗時も不要になった timer は片付ける。  
この考え方は、loading 状態の解除やリソース解放にもつながる。

## 8. 実務でよく使う場面

### 8-1. 複数 API をまとめて取得する

互いに独立した API であれば、Promise の配列を作って `Promise.all` で待つことがある。

```js
const promises = taskIds.map((taskId) => createDelayedValue(`task-${taskId}`, 1));

return Promise.all(promises);
```

一覧画面の初期表示で、ユーザー情報、通知、設定をまとめて取得するような場面につながる。

### 8-2. 一部失敗を許容する一覧表示を作る

`Promise.allSettled` を使うと、成功したものと失敗したものを分けて扱える。

```js
const allSettledResults = await Promise.allSettled([
  createDelayedValue('success', 1),
  createDelayedError('allSettled内の失敗', 1),
]);
```

一部の widget だけ取得に失敗しても、他の表示は続けたい場合に向いている。

### 8-3. React の effect 内で API 通信を扱う

React では、API 通信時に loading / data / error を state として持つことが多い。  
Unit 09 の try-catch / finally、fetch response handling、AbortController の考え方がそのまま関係する。

```js
try {
  const response = await fetch('/api/user');
  const body = await response.json();
} catch (error) {
  // error stateへ反映する
} finally {
  // loadingをfalseに戻す
}
```

### 8-4. 入力変更や画面遷移で通信を中断する

`AbortController` は、不要になった非同期処理を中断する考え方につながる。

```js
const controller = new AbortController();

controller.abort();
```

検索条件の変更、画面遷移、コンポーネントの unmount などで、古い通信結果を使いたくない場面がある。

## 9. TS / Reactにつながるポイント

### 9-1. Promise の戻り値は TypeScript の型注釈に直結する

JavaScript では Promise の中身を実行時に確認する。  
TypeScript では、async function の戻り値は `Promise<T>` として表現する。

```ts
async function fetchUser(): Promise<User> {
  const response = await fetch('/api/user');

  return response.json();
}
```

JavaScript の段階で Promise が「将来の値」を表すことを理解しておくと、`Promise<T>` も読みやすくなる。

### 9-2. React では非同期処理の結果を state に反映する

非同期処理は、React では `loading`、`data`、`error` の state 更新と組み合わせることが多い。

```jsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState(null);
```

`try` / `catch` / `finally` の分け方を理解しておくと、state 更新の責務を整理しやすい。

### 9-3. `map` + async の理解は API レスポンス加工でも重要になる

複数 ID から詳細情報を取得するような処理では、`map` + async + `Promise.all` がよく出る。

```js
const promises = ids.map(async (id) => {
  const label = await fetchLabel(id);

  return label.toUpperCase();
});

return Promise.all(promises);
```

TypeScript では、このときの型が `Promise<string>[]` から `string[]` へ変わることも重要になる。

### 9-4. fetch の response handling は型安全な API クライアント設計につながる

`fetch-response-handling.js` では、body の形を確認してから値として返している。

```js
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
```

TypeScript では型注釈を付けられるが、外部 API のレスポンスは実行時には未知の値。  
そのため、必要に応じて runtime validation を行う考え方も重要になる。

## 10. 確認観点

この単位を読み終えたら、次を確認する。

- 同期処理と非同期処理の違いを説明できるか
- call stack、task queue、microtask queue の概要を説明できるか
- Promise が fulfilled / rejected になる流れを説明できるか
- `then` / `catch` / `finally` の役割を説明できるか
- Promise chain で値を変換する流れを説明できるか
- async function の戻り値が Promise になることを説明できるか
- `await` が Promise の完了を待って値を取り出す構文であることを説明できるか
- async / await で try-catch を使う理由を説明できるか
- 逐次実行と並列実行の違いを説明できるか
- `Promise.all` と `Promise.allSettled` の違いを説明できるか
- `Promise.race` と `Promise.any` の概要を説明できるか
- `for...of` と `await` の組み合わせを説明できるか
- `map` + async が Promise の配列を返すことを説明できるか
- `forEach` + async の注意点を説明できるか
- fetch の response handling で `response.ok` を見る理由を説明できるか
- JSON 取得時に body の形式確認が必要になる理由を説明できるか
- timeout と `AbortController` の考え方を説明できるか
- Node.js とブラウザの fetch の共通点と違いを概要レベルで説明できるか

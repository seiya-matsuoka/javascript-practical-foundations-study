# 08. エラー処理・バリデーション・失敗の扱い

## 1. 学習対象

この単位では、同期処理と非同期処理の両方に通じるエラー処理の基本を扱う。  
`throw`、`Error`、`try` / `catch` / `finally`、custom error、validation、result object、Promise rejection、API レスポンス処理、form 入力値の検証を確認する。

エラー処理では、単に例外を捕まえるだけではなく、次の判断が重要になる。

- その場で処理する失敗か
- 呼び出し元へ返す失敗か
- ユーザーに見せるメッセージか
- ログに残す情報か
- 想定内の失敗か
- 想定外の例外か

## 2. この単位で扱う主な内容

この単位で扱う内容は次の通り。

- `throw`
- `Error`
- custom error
- `try`
- `catch`
- `finally`
- エラーを握りつぶさないこと
- validation
- result object 的な返し方
- fail fast
- 呼び出し元で処理すべきエラー
- その場で処理すべきエラー
- 想定内の失敗
- 想定外の例外
- ユーザーに見せるメッセージ
- ログに残す情報
- async / await での try-catch
- Promise rejection
- エラーメッセージ設計
- API レスポンス処理での失敗
- form 入力値の検証

## 3. ファイル構成

この単位のファイル構成は次の通り。

```text
src/
  08-error-handling-validation/
    index.js
    throw-error-basics.js
    try-catch-finally.js
    custom-errors.js
    validation-result-object.js
    fail-fast-and-error-boundaries.js
    user-message-and-logging.js
    async-try-catch.js
    promise-rejection.js
    api-response-failure.js
    form-validation.js

docs/
  08-error-handling-validation.md
```

各ファイルの役割は次の通り。

- `index.js`
  - Unit 08 のサンプルを順番に実行する入口。
- `throw-error-basics.js`
  - `throw`、`Error`、例外として失敗を呼び出し元へ知らせる方法を確認する。
- `try-catch-finally.js`
  - `try` / `catch` / `finally` と、エラーを握りつぶさない考え方を確認する。
- `custom-errors.js`
  - custom error を使い、エラーの種類ごとに処理を分ける例を確認する。
- `validation-result-object.js`
  - form validation のような想定内の失敗を result object として返す例を確認する。
- `fail-fast-and-error-boundaries.js`
  - fail fast と、失敗をどこで処理するかの境界を確認する。
- `user-message-and-logging.js`
  - ユーザー向けメッセージとログ用情報の違いを確認する。
- `async-try-catch.js`
  - async / await と try-catch の組み合わせを確認する。
- `promise-rejection.js`
  - Promise rejection と `.catch`、`Promise.all` の失敗を確認する。
- `api-response-failure.js`
  - API レスポンスの `ok` / `status` / body validation を確認する。
- `form-validation.js`
  - form 入力値の検証と、文字列から数値への変換を確認する。
- `08-error-handling-validation.md`
  - この単位の内容、実行方法、注目ポイント、確認観点をまとめたドキュメント。

## 4. 実行方法

Node.js 側のサンプルは、リポジトリ直下で次のコマンドを実行する。

```bash
npm run unit:08
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

1. `src/08-error-handling-validation/index.js`
2. `src/08-error-handling-validation/throw-error-basics.js`
3. `src/08-error-handling-validation/try-catch-finally.js`
4. `src/08-error-handling-validation/custom-errors.js`
5. `src/08-error-handling-validation/validation-result-object.js`
6. `src/08-error-handling-validation/fail-fast-and-error-boundaries.js`
7. `src/08-error-handling-validation/user-message-and-logging.js`
8. `src/08-error-handling-validation/async-try-catch.js`
9. `src/08-error-handling-validation/promise-rejection.js`
10. `src/08-error-handling-validation/api-response-failure.js`
11. `src/08-error-handling-validation/form-validation.js`

前半で同期的なエラー処理と validation を確認し、後半で非同期処理、API レスポンス、form 入力値の検証を確認する。  
`index.js` から読むと、Unit 全体の実行順を把握しやすい。

## 6. 注目ポイント

### 6-1. `throw` は処理を続けられない失敗を呼び出し元へ知らせる

`throw-error-basics.js` では、正の整数が必要な関数で、不正な値が来たときに `throw` している。

```js
function parsePositiveInteger(value) {
  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue)) {
    throw new Error('整数を指定する必要がある。');
  }

  if (parsedValue <= 0) {
    throw new Error('0より大きい整数を指定する必要がある。');
  }

  return parsedValue;
}
```

関数が前提を満たさない値を受け取った場合、処理を続けるより早く失敗させた方が原因を追いやすい。  
これが fail fast の考え方にもつながる。

### 6-2. `finally` は成功しても失敗しても実行される

`try-catch-finally.js` では、成功時も失敗時も `close()` が呼ばれることを確認している。

```js
try {
  const openedConnection = connection.open();

  readResult = `${openedConnection}: read success`;
} catch (error) {
  errorMessage = error.message;
} finally {
  connection.close();
}
```

`finally` は、接続の後片付け、ロック解除、ローディング状態の解除などに使える。  
成功時だけでなく、失敗時にも必ず行いたい処理を置く場所になる。

### 6-3. custom error は失敗の種類を分けて扱いやすくする

`custom-errors.js` では、`ValidationError` と `NotFoundError` を定義している。

```js
class ValidationError extends Error {
  constructor(message, details) {
    super(message);

    this.name = 'ValidationError';
    this.details = details;
  }
}
```

エラーの種類が分かれていると、catch 側で処理を分けやすい。

```js
if (error instanceof ValidationError) {
  return {
    kind: 'validation',
    message: error.message,
    details: error.details,
  };
}
```

入力値の不備、存在しないデータ、想定外の例外などは、同じ失敗でも扱い方が異なる。  
custom error は、その違いをコード上に表す方法の 1 つ。

### 6-4. 想定内の validation 失敗は result object で返すと扱いやすい

`validation-result-object.js` では、form validation の結果を result object として返している。

```js
return {
  ok: false,
  value: null,
  errors,
};
```

form 入力エラーのように、ユーザーに修正してもらう前提の失敗は、例外よりも戻り値として扱う方が自然な場合がある。  
`ok`、`value`、`errors` の形にすると、呼び出し元で成功時と失敗時を分岐しやすい。

### 6-5. ユーザー向けメッセージとログ用情報は分ける

`user-message-and-logging.js` では、内部エラーからユーザー向けメッセージとログ用情報を分けて作っている。

```js
function toUserMessage(error) {
  if (error.code === 'DB_TIMEOUT') {
    return '一時的に処理に時間がかかっています。時間をおいて再度お試しください。';
  }

  return 'エラーが発生しました。';
}
```

```js
function toLogEntry(error, context) {
  return {
    level: 'error',
    message: error.message,
    code: error.code ?? 'UNKNOWN',
    requestId: error.requestId ?? context.requestId,
    operation: context.operation,
  };
}
```

ユーザーには分かりやすく、安全なメッセージを出す。  
ログには調査に必要な情報を残す。  
この 2 つを同じ文言にしないことが重要になる。

### 6-6. async / await の失敗は try-catch で扱える

`async-try-catch.js` では、`await` した処理の失敗を try-catch で扱っている。

```js
try {
  const profile = await fetchUserProfile(userId);

  return {
    ok: true,
    message: `${profile.name}さんのプロフィールを読み込みました。`,
  };
} catch (error) {
  return {
    ok: false,
    message: error.message,
  };
}
```

`async function` 内で `await` している Promise が reject された場合、try-catch で捕まえられる。  
UI では、この catch の中で画面表示用の失敗状態に変換することが多い。

### 6-7. API レスポンスの失敗は例外だけでなく `ok` / `status` / body を見る

`api-response-failure.js` では、API レスポンス風 object を処理している。

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
`response.ok`、`response.status`、body の形式を見て、アプリ側の失敗として扱う必要がある。

## 7. 引っかかりやすい点

### 7-1. エラーを握りつぶすと原因が分からなくなる

`try-catch-finally.js` には、悪い例としてエラーを握りつぶす関数を置いている。

```js
function ignoreErrorBadExample() {
  try {
    throw new Error('握りつぶされるエラー');
  } catch {
    return '失敗したが理由は失われた';
  }
}
```

catch しただけで何もしない、または理由を失った値だけ返すと、後から原因を調べるのが難しくなる。  
失敗を扱う場合は、ログに残す、result object として返す、別のエラーとして投げ直すなど、意図が分かる形にする。

### 7-2. すべての失敗を `throw` すればよいわけではない

form validation のような想定内の失敗は、例外ではなく戻り値として扱う方が自然な場合がある。

```js
const invalidResult = validateSignupForm({
  email: 'alice.example.com',
  password: 'short',
});
```

ユーザー入力の不備は、ユーザーが直せる情報として画面に返したい。  
その場合、`throw` よりも result object の方が扱いやすい。

### 7-3. `catch` で内部エラーをそのままユーザーに見せない

内部エラーには、実装の詳細や調査用の情報が含まれることがある。

```js
const error = new Error('database connection timeout');

error.code = 'DB_TIMEOUT';
error.requestId = 'req-001';
```

この情報をそのまま画面に出すのではなく、ユーザー向けメッセージに変換する。

```js
return '一時的に処理に時間がかかっています。時間をおいて再度お試しください。';
```

### 7-4. Promise rejection を処理しないと未処理の失敗になる

`promise-rejection.js` では、reject された Promise を `capturePromiseResult` で扱っている。

```js
async function capturePromiseResult(promise) {
  try {
    return await promise;
  } catch (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
}
```

Promise rejection は、try-catch または `.catch` で扱う必要がある。  
非同期処理では、失敗が同期処理より見えにくくなるため、どこで catch するかを意識する。

### 7-5. API の成功 response でも body の形式が正しいとは限らない

`api-response-failure.js` では、HTTP 的には成功でも body の形式が不正な例を扱っている。

```js
const invalidBodyResponse = createApiResponse({
  ok: true,
  status: 200,
  body: {
    id: '1',
    displayName: 'Alice',
  },
});
```

`response.ok === true` でも、アプリが期待する形式とは限らない。  
API レスポンスを使う前に、最低限の形式確認を行うと安全になる。

## 8. 実務でよく使う場面

### 8-1. 入力値を validation して画面にエラーを返す

`form-validation.js` では、form 入力値の検証結果を field ごとに返している。

```js
const errors = {
  name: nameErrors,
  age: ageErrors,
};
```

実務の form では、どの項目にどのエラーがあるかを表示する必要がある。  
そのため、例外として落とすよりも、field ごとの errors を持つ result object にする方が扱いやすい。

### 8-2. 境界でエラーを response や画面状態に変換する

`fail-fast-and-error-boundaries.js` では、`createOrder` が投げたエラーを `handleRequest` で response 風 object に変換している。

```js
try {
  const order = createOrder(input);

  return {
    status: 200,
    body: order,
  };
} catch (error) {
  return {
    status: 400,
    body: {
      message: error.message,
    },
  };
}
```

内部処理では `throw` し、外側の境界で response や画面表示用の状態に変換する。  
この分け方をすると、処理の責務が分かりやすくなる。

### 8-3. 非同期処理の loading / success / error 状態を扱う

`async-try-catch.js` の `finally` コメントでも触れている通り、実務では非同期処理の最後に loading 状態を戻すことが多い。

```js
try {
  const profile = await fetchUserProfile(userId);

  return {
    ok: true,
    message: `${profile.name}さんのプロフィールを読み込みました。`,
  };
} catch (error) {
  return {
    ok: false,
    message: error.message,
  };
} finally {
  // loading状態の解除など
}
```

React では、`loading`、`data`、`error` のような state と組み合わせて扱うことが多い。

### 8-4. API レスポンスの `ok` / `status` / body を見て失敗を扱う

`api-response-failure.js` では、HTTP status と body の両方を見て result object に変換している。

```js
return {
  ok: false,
  value: null,
  error: {
    status: response.status,
    message: body.message ?? 'APIエラーが発生した。',
  },
};
```

API 通信では、通信自体の失敗、HTTP status の失敗、body 形式の失敗が分かれる。  
それぞれを同じ扱いにすると原因が分かりにくくなるため、どこで失敗したかを分けて考える。

## 9. TS / Reactにつながるポイント

### 9-1. TypeScript では result object を union 型で表しやすい

JavaScript では `ok: true` / `ok: false` の形で result object を返している。

```js
return {
  ok: false,
  value: null,
  errors,
};
```

TypeScript では、この形を union 型として表現しやすい。

```ts
type Result<T> = { ok: true; value: T; errors: [] } | { ok: false; value: null; errors: string[] };
```

`ok` で分岐すると、成功時と失敗時の値を安全に扱える。

### 9-2. React では validation error を state として扱うことが多い

form validation の結果は、React では state に入れて表示することが多い。

```jsx
const [errors, setErrors] = useState({
  name: [],
  age: [],
});
```

Unit 08 の `form-validation.js` のように field ごとの errors を作っておくと、UI 表示に接続しやすい。

### 9-3. async / await の try-catch は data fetching に直結する

React で API 取得を行う場合、次のような状態を持つことが多い。

```jsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState(null);
```

`try` / `catch` / `finally` の考え方は、この `loading`、`error`、`data` の更新に直結する。

### 9-4. ユーザー向けメッセージとログ情報の分離は運用でも重要になる

フロントエンドでもバックエンドでも、ユーザー向けメッセージとログ情報は分けて扱う。

```js
const userMessage = toUserMessage(error);
const logEntry = toLogEntry(error, context);
```

ユーザーには分かりやすく安全な文言を出し、ログには調査に必要な情報を残す。  
この分離は、運用時の障害調査やユーザー体験に関係する。

## 10. 確認観点

この単位を読み終えたら、次を確認する。

- `throw` と `Error` の基本を説明できるか
- `try` / `catch` / `finally` の役割を説明できるか
- `finally` が成功時も失敗時も実行されることを説明できるか
- エラーを握りつぶすことの問題点を説明できるか
- custom error を使う理由を説明できるか
- validation 失敗を result object として返す場面を説明できるか
- fail fast の考え方を説明できるか
- 呼び出し元で処理すべきエラーと、その場で処理すべきエラーの違いを説明できるか
- 想定内の失敗と想定外の例外の違いを説明できるか
- ユーザーに見せるメッセージとログに残す情報を分ける理由を説明できるか
- async / await での try-catch を説明できるか
- Promise rejection を `.catch` または try-catch で扱う必要性を説明できるか
- API レスポンス処理で `ok` / `status` / body を確認する理由を説明できるか
- form 入力値を validation して result object にする流れを説明できるか

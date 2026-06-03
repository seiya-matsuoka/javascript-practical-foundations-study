# 12. Node.js 基本 API・JSON・実務的な小さな設計パターン・落とし穴まとめ

## 1. 学習対象

この単位では、Node.js 側の JavaScript、JSON 処理、実務寄りの小さな設計パターン、JavaScript の落とし穴をまとめて扱う。  
Unit 01〜11 で扱った内容を、Node.js 実行、ファイル操作、API レスポンス風データ、データ変換、関数分割、注意点の整理としてつなげる。

最後の総合整理に近い位置づけとして、個別の構文だけではなく、実務で読みやすく保つための小さな関数設計も確認する。  
一方で、大きなアーキテクチャやフレームワーク設計までは扱わず、JavaScript の基礎から TypeScript / React へ進む前の土台を整理する。

## 2. この単位で扱う主な内容

この単位で扱う内容は次の通り。

- `process`
- 環境変数
- コマンドライン引数
- `node:fs/promises`
- `node:path`
- ファイル読み書き
- JSON ファイル読み込み
- Node.js での `fetch`
- npm scripts
- devDependencies の概要
- JSON とは何か
- JavaScript object との違い
- `JSON.stringify`
- `JSON.parse`
- API レスポンス風データ
- ネストしたデータの取り出し
- null 混じりデータ
- optional chaining
- default value
- 表示用データへの変換
- 集計
- group by
- sort
- filter
- ページング風処理
- query parameter 風 object 作成
- mapper 関数
- predicate 関数
- validator 関数
- formatter 関数
- normalizer 関数
- config object
- options object
- early return
- guard clause
- lookup object
- strategy object 的な分岐
- 関数分割
- 副作用を端に寄せる
- データ変換パイプライン
- UI 表示用データへの変換
- `==` の罠
- truthy / falsy
- `null` / `undefined`
- `NaN`
- 浮動小数点誤差
- shallow copy
- `sort` の破壊性
- `sort` の比較関数
- `forEach` と async
- object の参照共有
- `this`
- `var`
- hoisting
- Date
- timezone
- optional chaining の使いすぎ
- default 値の扱い
- Promise のエラー漏れ
- import / export の混乱

## 3. ファイル構成

この単位のファイル構成は次の通り。

```text
src/
  12-node-json-practical-patterns/
    index.js
    runtime-context.js
    path-and-url-basics.js
    file-read-write.js
    json-file-loading.js
    node-fetch-basics.js
    json-stringify-parse.js
    api-response-shape.js
    nested-nullish-data.js
    optional-default-values.js
    display-data-transform.js
    group-sort-filter-pagination.js
    query-params-object.js
    mapper-predicate-validator.js
    formatter-normalizer.js
    config-options-object.js
    early-return-guard-clause.js
    strategy-lookup-object.js
    function-pipeline.js
    side-effect-boundary.js
    pitfalls-equality-nullish.js
    pitfalls-number-copy-sort.js
    pitfalls-async-this-var-date-import.js
    fixtures/
      app-config.json
      tasks.json
      users-response.json

docs/
  12-node-json-practical-patterns.md
```

各ファイルの役割は次の通り。

- `index.js`
  - Unit 12 のサンプルを順番に実行する入口。
- `runtime-context.js`
  - `process`、環境変数、コマンドライン引数、npm scripts の入口を確認する。
- `path-and-url-basics.js`
  - `node:path`、`import.meta.url`、file URL と path の変換を確認する。
- `file-read-write.js`
  - `node:fs/promises` によるファイル読み書きを確認する。
- `json-file-loading.js`
  - JSON ファイルを読み込み、設定値や固定データとして扱う流れを確認する。
- `node-fetch-basics.js`
  - Node.js での `fetch`、response handling、JSON 取得を確認する。
- `json-stringify-parse.js`
  - JSON と JavaScript object の違い、`JSON.stringify`、`JSON.parse` を確認する。
- `api-response-shape.js`
  - API レスポンス風データから `status`、`meta`、`data` を取り出す。
- `nested-nullish-data.js`
  - ネストしたデータ、null 混じりデータ、optional chaining を確認する。
- `optional-default-values.js`
  - default value、`??`、optional chaining の扱いを確認する。
- `display-data-transform.js`
  - API / JSON の生データを表示用データへ変換する。
- `group-sort-filter-pagination.js`
  - `filter`、`sort`、group by、ページング風処理を確認する。
- `query-params-object.js`
  - query parameter 風 object と query string を作る。
- `mapper-predicate-validator.js`
  - mapper 関数、predicate 関数、validator 関数を確認する。
- `formatter-normalizer.js`
  - formatter 関数、normalizer 関数を確認する。
- `config-options-object.js`
  - config object、options object、nested object の merge を確認する。
- `early-return-guard-clause.js`
  - early return と guard clause を確認する。
- `strategy-lookup-object.js`
  - lookup object、strategy object 的な分岐を確認する。
- `function-pipeline.js`
  - 関数分割とデータ変換パイプラインを確認する。
- `side-effect-boundary.js`
  - ファイル読み書きの副作用を端に寄せる構成を確認する。
- `pitfalls-equality-nullish.js`
  - `==`、truthy / falsy、`NaN`、default 値の扱いを確認する。
- `pitfalls-number-copy-sort.js`
  - 浮動小数点誤差、shallow copy、`sort` の破壊性と比較関数を確認する。
- `pitfalls-async-this-var-date-import.js`
  - `forEach` と async、`this`、`var`、Date / timezone、Promise のエラー、import / export 方針を確認する。
- `fixtures/app-config.json`
  - 設定ファイルとして読み込む JSON。
- `fixtures/tasks.json`
  - 一覧処理、表示用変換、集計に使う task データ。
- `fixtures/users-response.json`
  - API レスポンス風の user データ。
- `12-node-json-practical-patterns.md`
  - この単位の内容、実行方法、注目ポイント、確認観点をまとめたドキュメント。

## 4. 実行方法

Node.js 側のサンプルは、リポジトリ直下で次のコマンドを実行する。

```bash
npm run unit:12
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

1. `src/12-node-json-practical-patterns/index.js`
2. `src/12-node-json-practical-patterns/runtime-context.js`
3. `src/12-node-json-practical-patterns/path-and-url-basics.js`
4. `src/12-node-json-practical-patterns/file-read-write.js`
5. `src/12-node-json-practical-patterns/json-file-loading.js`
6. `src/12-node-json-practical-patterns/node-fetch-basics.js`
7. `src/12-node-json-practical-patterns/json-stringify-parse.js`
8. `src/12-node-json-practical-patterns/api-response-shape.js`
9. `src/12-node-json-practical-patterns/nested-nullish-data.js`
10. `src/12-node-json-practical-patterns/optional-default-values.js`
11. `src/12-node-json-practical-patterns/display-data-transform.js`
12. `src/12-node-json-practical-patterns/group-sort-filter-pagination.js`
13. `src/12-node-json-practical-patterns/query-params-object.js`
14. `src/12-node-json-practical-patterns/mapper-predicate-validator.js`
15. `src/12-node-json-practical-patterns/formatter-normalizer.js`
16. `src/12-node-json-practical-patterns/config-options-object.js`
17. `src/12-node-json-practical-patterns/early-return-guard-clause.js`
18. `src/12-node-json-practical-patterns/strategy-lookup-object.js`
19. `src/12-node-json-practical-patterns/function-pipeline.js`
20. `src/12-node-json-practical-patterns/side-effect-boundary.js`
21. `src/12-node-json-practical-patterns/pitfalls-equality-nullish.js`
22. `src/12-node-json-practical-patterns/pitfalls-number-copy-sort.js`
23. `src/12-node-json-practical-patterns/pitfalls-async-this-var-date-import.js`

前半で Node.js API と JSON 処理を確認し、後半で実務寄りの小さな関数設計と落とし穴を整理する。  
最後の Unit のため、これまでの Unit で扱った値、比較、配列、object、非同期、`this`、Date、import / export を振り返る構成にしている。

## 6. 注目ポイント

### 6-1. Node.js の実行環境は `process` から確認する

`runtime-context.js` では、Node.js の実行環境に関する情報を `process` から取得している。

```js
const runtimeInfo = {
  nodeVersion: process.version,
  platform: process.platform,
  currentWorkingDirectory: process.cwd(),
};
```

`process` は Node.js 側の代表的な global object。  
ブラウザの `window` とは別物であり、環境変数、コマンドライン引数、実行ディレクトリなどを扱う入口になる。

### 6-2. ES Modules では `import.meta.url` から path を組み立てる

`path-and-url-basics.js` では、現在ファイルの URL を path に変換している。

```js
const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectoryPath = path.dirname(currentFilePath);

export function resolveUnitPath(...paths) {
  return path.join(currentDirectoryPath, ...paths);
}
```

Node.js の ES Modules では、CommonJS の `__dirname` をそのまま使えない。  
`import.meta.url`、`fileURLToPath`、`path.dirname` を組み合わせることで、現在ファイルからの相対 path を安全に組み立てられる。

### 6-3. JSON ファイルは文字列として読み、parse して object に戻す

`json-file-loading.js` では、JSON ファイルを読み込む処理を小さな関数にしている。

```js
async function readJsonFile(filePath) {
  const text = await fs.readFile(filePath, 'utf8');

  return JSON.parse(text);
}
```

ファイルから読み込んだ時点では文字列。  
JavaScript object として扱うには `JSON.parse` が必要になる。  
外部ファイルや API response は自分のコード外から来る値のため、本来は parse 後の形も検証対象になる。

### 6-4. API response は `status` / `meta` / `data` を分けて読む

`api-response-shape.js` では、API レスポンス風データから必要な値を取り出している。

```js
const responseStatus = apiResponse.status;
const requestId = apiResponse.meta.requestId;
const tasks = apiResponse.data;
```

API response は配列だけではなく、通信結果、ページ情報、request id などを一緒に持つことが多い。  
先に response 全体の形を把握してから、画面表示や処理に必要な `data` を取り出すと読みやすい。

### 6-5. 表示用データへの変換は mapper 関数に切り出す

`display-data-transform.js` では、生の task data を表示用 item に変換している。

```js
function createTaskDisplayItem(task) {
  const statusLabelMap = {
    todo: '未着手',
    doing: '進行中',
    done: '完了',
  };

  return {
    id: task.id,
    title: task.title,
    statusLabel: statusLabelMap[task.status] ?? '不明',
    assigneeName: task.assignee?.name ?? '未担当',
    dueDateLabel: task.dueDate ?? '期限なし',
  };
}
```

API や JSON のデータを、そのまま UI に出すとは限らない。  
表示用 label、fallback、日付表示などを mapper 関数にまとめると、UI 側の責務を軽くできる。

### 6-6. 実務寄りの小さな関数は役割名で読む

`mapper-predicate-validator.js` では、mapper、predicate、validator を分けている。

```js
function mapTaskToSummary(task) {
  return {
    id: task.id,
    label: `${task.id}: ${task.title}`,
    active: task.status !== 'done',
  };
}

function isActiveTask(task) {
  return task.status !== 'done';
}

function validateTaskInput(input) {
  const errors = [];
```

関数名が役割を表していると、処理を読む前に意図を推測できる。  
特に `map`、`filter`、validation、format、normalize のような処理は、実務で何度も出てくる。

### 6-7. 副作用を端に寄せると中心の処理が読みやすい

`side-effect-boundary.js` では、ファイル読み込み、データ変換、ファイル書き込みを分けている。

```js
function createSummary(tasks) {
  return {
    total: tasks.length,
    completed: tasks.filter((task) => task.status === 'done').length,
    active: tasks.filter((task) => task.status !== 'done').length,
  };
}
```

`createSummary` は入力を受け取り、結果を返すだけの関数。  
ファイル読み書きは別関数に寄せているため、中心のデータ変換を単独で理解しやすい。

## 7. 引っかかりやすい点

### 7-1. JSON と JavaScript object は同じではない

`json-stringify-parse.js` では、JavaScript object を JSON 文字列へ変換している。

```js
const compactJsonText = JSON.stringify(user);
const prettyJsonText = JSON.stringify(user, null, 2);

const parsedUser = JSON.parse(compactJsonText);
```

JSON は文字列表現。  
JavaScript object そのものではない。  
ファイル保存や API 通信では JSON 文字列として扱い、コード内で object として処理するときに parse する。

また、JSON として表現できない値もある。

```js
const valueWithUnsupportedTypes = {
  id: 1,
  name: undefined,
  callback: () => 'ignored',
  active: true,
};

const unsupportedTypesJsonText = JSON.stringify(valueWithUnsupportedTypes);
```

`undefined` や function は通常のデータとして JSON に残らない。  
保存や通信に使う値は、JSON として表現できる形に揃える必要がある。

### 7-2. optional chaining を使いすぎると必須値の欠落に気づきにくい

`optional-default-values.js` では、optional chaining と default value を使っている。

```js
const firstTitle = response.data?.items?.[0]?.title ?? '未設定';
```

optional chaining は null 混じりデータを読むときに便利。  
ただし、本来必ず存在すべき値まで `?.` で読み飛ばすと、データ不備に気づくのが遅くなる。

必須値は guard clause や validator で確認し、任意値だけ optional chaining で扱う方が意図が明確になる。

### 7-3. `??` と `||` は default 値の扱いが違う

`pitfalls-equality-nullish.js` では、`||` と `??` の違いを確認している。

```js
const defaultValueResults = {
  zeroByOr: 0 || 10,
  zeroByNullish: 0 ?? 10,
  emptyStringByOr: '' || 'default',
  emptyStringByNullish: '' ?? 'default',
};
```

`||` は falsy 全般を default に置き換える。  
`??` は `null` / `undefined` のときだけ default を使う。  
`0` や空文字を有効な値として扱うなら、`??` の方が意図に合う場合が多い。

### 7-4. `sort` は元 array を変更する

`group-sort-filter-pagination.js` では、`sort` の前に shallow copy を作っている。

```js
const sortedActiveTasks = [...activeTasks].sort((taskA, taskB) => {
  return taskA.priority - taskB.priority;
});
```

`sort` は破壊的 method。  
元 array を変えたくない場合は、`[...array]` で copy してから並べ替える。  
React の state や再利用する配列では特に重要になる。

### 7-5. `forEach` は async callback を待たない

`pitfalls-async-this-var-date-import.js` では、`forEach` に async callback を渡している。

```js
[1, 2, 3].forEach(async (value) => {
  const result = await waitAndReturn(value * 2);

  results.push(result);
});

return results;
```

`forEach` は callback の Promise を待たない。  
逐次実行したい場合は `for...of` と `await`、並列実行したい場合は `map` と `Promise.all` を検討する。

### 7-6. Date は timezone を意識して扱う

`pitfalls-async-this-var-date-import.js` では、UTC 表現と Tokyo 表示を分けている。

```js
const date = new Date('2026-05-31T00:00:00.000Z');
const isoText = date.toISOString();
const tokyoText = date.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
```

`toISOString` は UTC 表現。  
画面表示では locale や timezone を指定することがある。  
日付だけを扱っているつもりでも、timezone によって表示日がずれることがある。

## 8. 実務でよく使う場面

### 8-1. CLI や npm scripts から引数を受け取る

`runtime-context.js` では、`process.argv` からアプリ側の引数を取り出している。

```js
const userArgs = process.argv.slice(2);
const limitText = readOptionValue(userArgs, '--limit', '3');
const parsedLimit = Number.parseInt(limitText, 10);
const limit = Number.isNaN(parsedLimit) ? 3 : parsedLimit;
```

Node.js の小さな CLI、build script、変換 script では、コマンドライン引数を読む場面がある。  
引数は文字列で渡るため、数値として使うなら parse と fallback を明示する。

### 8-2. ファイル読み書きの副作用を閉じ込める

`file-read-write.js` では、JSON の書き込みと読み戻しを 1 つの関数に閉じ込めている。

```js
await fs.writeFile(outputFilePath, jsonText, 'utf8');

const readText = await fs.readFile(outputFilePath, 'utf8');
const readSummary = JSON.parse(readText);
```

ファイル操作は副作用。  
実務では、データ変換処理とファイル操作を分けると、テストしやすく、変更にも強くなる。

### 8-3. query parameter を object から組み立てる

`query-params-object.js` では、検索条件 object から query string を作っている。

```js
const queryObject = buildQueryObject({
  page: 2,
  perPage: 20,
  keyword: 'node',
  status: 'doing',
  sort: undefined,
});

const queryString = buildQueryString(queryObject);
```

画面の検索条件、API の一覧取得、URL の query parameter では、条件 object から文字列を作ることが多い。  
先に object として整理し、不要な値を除外してから `URLSearchParams` に渡すと扱いやすい。

### 8-4. lookup object で表示 label を管理する

`strategy-lookup-object.js` では、status に対応する label を object にまとめている。

```js
const statusLabelLookup = {
  todo: '未着手',
  doing: '進行中',
  done: '完了',
};

function getStatusLabel(status) {
  return statusLabelLookup[status] ?? '不明';
}
```

条件分岐が単純な対応表なら、lookup object にすると読みやすい。  
UI 表示 label、権限名、ステータス名、CSS class 名などでよく使う。

### 8-5. strategy object 的な分岐で処理を差し替える

`strategy-lookup-object.js` では、sort 処理を object に登録している。

```js
const sortStrategies = {
  priorityAsc: (taskA, taskB) => taskA.priority - taskB.priority,
  titleAsc: (taskA, taskB) => taskA.title.localeCompare(taskB.title, 'ja-JP'),
};

function sortTasks(tasks, strategyName) {
  const compare = sortStrategies[strategyName] ?? sortStrategies.priorityAsc;

  return [...tasks].sort(compare);
}
```

`if` / `switch` が増えすぎる前に、分岐ごとの処理を関数として分けられる。  
一覧の sort、format、権限別処理、出力形式の切り替えなどに使いやすい。

### 8-6. UI 表示用データへの変換を中心に置く

`function-pipeline.js` では、normalize、filter、sort、map を順番に適用している。

```js
return tasks
  .map((task) => normalizeTask(task))
  .filter((task) => isVisibleTask(task))
  .sort((taskA, taskB) => sortByPriority(taskA, taskB))
  .map((task) => mapToDisplayItem(task));
```

React に進むと、API response をそのまま JSX に出すのではなく、表示用の props や view model に変換することが多い。  
小さい関数を組み合わせると、どの段階で何をしているかが見えやすい。

## 9. TS / React につながるポイント

### 9-1. TypeScript では JSON の形を型で表したくなる

`json-file-loading.js` では、JSON を parse してそのまま使っている。

```js
const config = await readJsonFile(configPath);
const tasks = await readJsonFile(tasksPath);
```

JavaScript では parse 後の値がどの形かを実行時に確認する必要がある。  
TypeScript に進むと、`Task` 型や `AppConfig` 型を定義して、読み込んだ後の値をどう扱うかを型でも表現したくなる。

ただし、TypeScript の型は実行時の JSON を自動検証しない。  
外部入力に対しては、validator 関数や schema validation の考え方が必要になる。

### 9-2. mapper / predicate / validator は TypeScript の型設計と相性がよい

`mapper-predicate-validator.js` では、役割ごとに関数を分けている。

```js
function mapTaskToSummary(task) {
  return {
    id: task.id,
    label: `${task.id}: ${task.title}`,
    active: task.status !== 'done',
  };
}

function isActiveTask(task) {
  return task.status !== 'done';
}
```

TypeScript では、mapper の入力型と出力型、predicate の条件、validator の result 型を明示できる。  
関数の役割が分かれているほど、型の境界も分けやすくなる。

### 9-3. React では表示用データへの変換が component の読みやすさにつながる

`display-data-transform.js` では、task を表示用 item に変換している。

```js
return {
  id: task.id,
  title: task.title,
  statusLabel: statusLabelMap[task.status] ?? '不明',
  assigneeName: task.assignee?.name ?? '未担当',
  dueDateLabel: task.dueDate ?? '期限なし',
};
```

React では、JSX の中に status label、fallback、日付表示、null 判定を直接書きすぎると読みにくくなる。  
表示用データを作ってから component に渡すと、JSX は表示に集中しやすい。

### 9-4. React state では shallow copy と破壊的 method に注意する

`pitfalls-number-copy-sort.js` では、spread による copy が shallow copy であることを確認している。

```js
const copiedTask = { ...originalTask };
copiedTask.assignee.name = 'Updated Alice';
```

また、`sort` が破壊的であることも確認している。

```js
const mutableNumbers = [3, 1, 2];
const sortedSameReference = mutableNumbers.sort((numberA, numberB) => numberA - numberB);
```

React の state では、元 object や元 array を直接変更しないことが重要になる。  
shallow copy の限界と破壊的 method を理解しておくと、意図しない再描画漏れや状態破壊を避けやすい。

### 9-5. async の落とし穴は React のイベント処理や API 通信にもつながる

`pitfalls-async-this-var-date-import.js` では、`forEach` と async の注意点を扱っている。

```js
[1, 2, 3].forEach(async (value) => {
  const result = await waitAndReturn(value * 2);

  results.push(result);
});
```

React の event handler や `useEffect` 内で API 通信を扱う場合も、Promise の待ち方や error handling が重要になる。  
逐次実行、並列実行、エラーをどこで catch するかを JavaScript の段階で理解しておく必要がある。

### 9-6. config / options object は props や hook の引数設計につながる

`config-options-object.js` では、任意設定を options object として受け取っている。

```js
function createListOptions(options = {}) {
  const { page = 1, pageSize = 10, sort = 'createdAt' } = options;

  return {
    page,
    pageSize,
    sort,
  };
}
```

React の component props や custom hook の引数でも、複数の設定値を object で渡す場面が多い。  
default value、任意項目、設定の merge を JavaScript で理解しておくと、TypeScript の optional property や default props 的な設計にもつながる。

## 10. 確認観点

この単位を読み終えたら、次を確認する。

- `process` から Node.js の実行環境を取得できるか
- 環境変数とコマンドライン引数の違いを説明できるか
- npm scripts と devDependencies の関係を概要レベルで説明できるか
- `node:path` を使って path を組み立てる理由を説明できるか
- ES Modules で `import.meta.url` を使う理由を説明できるか
- `node:fs/promises` でファイル読み書きを行う流れを説明できるか
- JSON と JavaScript object の違いを説明できるか
- `JSON.stringify` と `JSON.parse` の役割を説明できるか
- API response の `status` / `meta` / `data` を分けて読めるか
- null 混じりデータで optional chaining を使う場面を説明できるか
- `??` と `||` の default 値の違いを説明できるか
- API / JSON の生データを表示用データへ変換できるか
- `filter`、`sort`、group by、ページング風処理を説明できるか
- query parameter 風 object から query string を作る流れを説明できるか
- mapper / predicate / validator / formatter / normalizer の役割を説明できるか
- config object と options object の違いを説明できるか
- early return と guard clause の利点を説明できるか
- lookup object と strategy object 的な分岐を説明できるか
- 関数分割とデータ変換パイプラインの利点を説明できるか
- 副作用を端に寄せる理由を説明できるか
- `==`、truthy / falsy、`NaN` の落とし穴を説明できるか
- shallow copy と object の参照共有を説明できるか
- `sort` の破壊性と比較関数の必要性を説明できるか
- `forEach` と async の注意点を説明できるか
- `this`、`var`、hoisting の注意点を概要レベルで説明できるか
- Date と timezone の注意点を説明できるか
- Promise の error handling が漏れる問題を説明できるか
- import / export の混乱を避けるための方針を説明できるか

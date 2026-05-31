# 11. ブラウザ JavaScript・DOM・イベント・フォーム・ストレージ

## 1. 学習対象

この単位では、React に進む前に、ブラウザ環境で JavaScript が扱う基本 API を確認する。  
`window`、`document`、DOM tree、要素取得、表示更新、要素作成、イベント、フォーム、ストレージ、`fetch`、`URL`、`URLSearchParams` を扱う。

React では DOM を直接操作する機会は減る。  
ただし React も最終的にはブラウザ上で DOM を更新し、イベントを受け取り、フォーム入力を扱う。  
そのため、ブラウザ JavaScript の基本を知っておくと、React の裏側で何が起きているかを理解しやすくなる。

## 2. この単位で扱う主な内容

この単位で扱う内容は次の通り。

- `window`
- `document`
- DOM tree
- `querySelector`
- `querySelectorAll`
- 要素の取得
- `textContent`
- `classList`
- `dataset`
- `style` 操作
- 要素作成
- `document.createElement`
- `append`
- `remove`
- イベント
- `addEventListener`
- event object
- event bubbling
- event delegation
- form input
- submit
- `preventDefault`
- `DOMContentLoaded`
- `localStorage`
- `sessionStorage`
- ブラウザでの `fetch`
- `URL`
- `URLSearchParams`

## 3. ファイル構成

この単位のファイル構成は次の通り。

```text
src/
  11-browser-dom-events-form/
    index.html
    styles.css
    main.js
    dom-query-and-content.js
    element-creation.js
    event-basics.js
    event-delegation.js
    form-handling.js
    storage.js
    browser-fetch.js
    url-search-params.js

docs/
  11-browser-dom-events-form.md
```

各ファイルの役割は次の通り。

- `index.html`
  - Unit 11 のブラウザ確認用 HTML。
- `styles.css`
  - 画面表示用の CSS。
- `main.js`
  - `DOMContentLoaded` 後に各機能を初期化する入口。
- `dom-query-and-content.js`
  - `querySelector`、`querySelectorAll`、`textContent`、`classList`、`dataset`、`style` 操作を確認する。
- `element-creation.js`
  - `document.createElement`、`append`、`replaceChildren` による一覧描画を確認する。
- `event-basics.js`
  - `addEventListener`、event object、button click の基本を確認する。
- `event-delegation.js`
  - event bubbling と event delegation を確認する。
- `form-handling.js`
  - form input、submit、`preventDefault`、`FormData`、validation を確認する。
- `storage.js`
  - `localStorage` と `sessionStorage` を確認する。
- `browser-fetch.js`
  - ブラウザでの `fetch`、Response handling、JSON 取得を確認する。
- `url-search-params.js`
  - `URL` と `URLSearchParams` を確認する。
- `11-browser-dom-events-form.md`
  - この単位の内容、実行方法、注目ポイント、確認観点をまとめたドキュメント。

## 4. 実行方法

ブラウザ側のサンプルは、次の HTML をブラウザで開いて確認する。

```text
src/11-browser-dom-events-form/index.html
```

画面を開いたら、次の操作を行う。

```text
1. filter button をクリックして、一覧の表示条件が変わることを確認する。
2. form にタスク名を入力し、submit で一覧へ追加されることを確認する。
3. タスクの完了切り替えと削除を行い、event delegation の動きを確認する。
4. localStorage / sessionStorage の button を押し、値の保持範囲を確認する。
5. fetch button を押し、JSON 取得結果が表示されることを確認する。
6. URL / URLSearchParams の表示を確認する。
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

1. `src/11-browser-dom-events-form/index.html`
2. `src/11-browser-dom-events-form/main.js`
3. `src/11-browser-dom-events-form/dom-query-and-content.js`
4. `src/11-browser-dom-events-form/element-creation.js`
5. `src/11-browser-dom-events-form/event-basics.js`
6. `src/11-browser-dom-events-form/event-delegation.js`
7. `src/11-browser-dom-events-form/form-handling.js`
8. `src/11-browser-dom-events-form/storage.js`
9. `src/11-browser-dom-events-form/browser-fetch.js`
10. `src/11-browser-dom-events-form/url-search-params.js`
11. `src/11-browser-dom-events-form/styles.css`

先に HTML で DOM tree の構造を確認し、その後に `main.js` で初期化の流れを確認する。  
各 module は、DOM の取得、要素作成、イベント、フォーム、ストレージ、fetch、URL の順に読むと理解しやすい。

## 6. 注目ポイント

### 6-1. `DOMContentLoaded` 後に DOM 操作を始める

`main.js` では、`DOMContentLoaded` 後に各機能を初期化している。

```js
document.addEventListener('DOMContentLoaded', () => {
  console.log('window object:', window);
  console.log('document object:', document);
  console.log('現在のURL:', window.location.href);

  const domQueryAndContent = setupDomQueryAndContent({
    tasks,
    getCurrentFilter: () => currentFilter,
  });
```

`document` は HTML から作られた DOM tree への入口。  
`script` を `head` で読み込む場合、DOM の構築前に `querySelector` を実行すると対象要素を取得できないことがある。  
`DOMContentLoaded` 後に初期化すると、HTML の要素が存在する前提で処理を書ける。

### 6-2. `querySelector` と `querySelectorAll` で要素を取得する

`dom-query-and-content.js` では、表示更新に必要な DOM 要素を取得している。

```js
const statusPanel = document.querySelector('[data-status-panel]');
const statusText = document.querySelector('[data-status-text]');
const summary = document.querySelector('[data-task-summary]');

const filterButtons = document.querySelectorAll('[data-filter]');
```

`querySelector` は最初に一致した 1 要素を取得する。  
`querySelectorAll` は複数要素を取得する。  
CSS selector を使えるため、class、id、`data-*` attribute などで対象を指定できる。

### 6-3. `textContent` / `classList` / `dataset` / `style` で表示を更新する

`dom-query-and-content.js` では、状態に応じて DOM の表示を更新している。

```js
statusPanel.dataset.state = state;

statusText.textContent = `${activeCount}件の未完了 / ${completedCount}件の完了`;

statusPanel.style.border = activeCount === 0 ? '1px solid #8dd7a8' : '1px solid #f1d48a';

summary.textContent = `現在の表示対象は ${visibleTasks.length} 件。filter=${getCurrentFilter()}。`;
```

`textContent` は文字列を安全に表示する。  
`dataset` は `data-*` attribute と JavaScript をつなぐ。  
`style` は直接 style を変更する。  
複雑な見た目の切り替えは、`classList` や `data-*` attribute を使って CSS 側で管理すると読みやすい。

### 6-4. `document.createElement` と `append` で DOM 要素を作る

`element-creation.js` では、task object から `li` 要素を作っている。

```js
export function createTaskElement(task) {
  const item = document.createElement('li');

  item.classList.add('task-item');
  item.classList.toggle('completed', task.completed);
  item.dataset.taskId = String(task.id);
```

作成した要素には、class、dataset、textContent を設定できる。

```js
item.append(title, meta, actions);

return item;
```

`append` は複数の node をまとめて追加できる。  
React の JSX は直接 `document.createElement` を書かないが、最終的にはこのような DOM node の作成・更新につながる。

### 6-5. event object から click された要素を判断する

`event-basics.js` では、filter button の click を処理している。

```js
filterButtonContainer.addEventListener('click', (event) => {
  const clickedElement = event.target;

  if (!(clickedElement instanceof HTMLButtonElement)) {
    return;
  }

  const filter = clickedElement.dataset.filter;
```

event object の `target` は、実際に event が発生した要素。  
button 以外を click した場合もあるため、`instanceof HTMLButtonElement` で対象を絞っている。

### 6-6. form submit では `preventDefault` で既定動作を止める

`form-handling.js` では、form の submit event を処理している。

```js
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const input = readTaskForm(form);
  const validationMessage = validateTaskInput(input);
```

HTML form の submit は、既定ではページ遷移を伴う。  
JavaScript 側で入力値を検証し、画面を動的に更新したい場合は `preventDefault()` で既定動作を止める。

## 7. 引っかかりやすい点

### 7-1. `innerHTML` ではなく `textContent` を使う場面を判断する

`dom-query-and-content.js` では、表示文字列を `textContent` で設定している。

```js
statusText.textContent = `${activeCount}件の未完了 / ${completedCount}件の完了`;
summary.textContent = `現在の表示対象は ${visibleTasks.length} 件。filter=${getCurrentFilter()}。`;
```

ユーザー入力や外部 API から取得した文字列を HTML として解釈する必要がない場合、`textContent` を使う。  
`innerHTML` は HTML として解釈されるため、使いどころを誤ると意図しない markup や XSS の入口になる。

### 7-2. event delegation では `target` の型と dataset を確認する

`event-delegation.js` では、親の `ul` に listener を 1 つ登録している。

```js
taskList.addEventListener('click', (event) => {
  const clickedElement = event.target;

  if (!(clickedElement instanceof HTMLButtonElement)) {
    return;
  }

  const { action, taskId } = clickedElement.dataset;
```

event bubbling により、子要素の click event は親要素にも伝わる。  
ただし `event.target` が常に button とは限らないため、型と `dataset` の値を確認してから処理する。

### 7-3. 個別 listener を増やすより、親でまとめる方が向く場面がある

`event-delegation.js` では、一覧内の button すべてに listener を登録していない。

```js
taskList.addEventListener('click', (event) => {
  const clickedElement = event.target;
```

一覧要素を後から追加・削除する場合、各 button に個別で listener を付け直すと管理が複雑になる。  
親要素に listener を置く event delegation なら、後から作られた button も同じ仕組みで処理できる。

### 7-4. form input は文字列として扱われる

`form-handling.js` では、`FormData` から値を取り出した後に文字列化している。

```js
return {
  title: String(formData.get('title') ?? '').trim(),
  category: String(formData.get('category') ?? 'study'),
};
```

form から取得した値は、基本的に文字列として扱う。  
数値や boolean として使う場合は、明示的な変換と validation が必要になる。

### 7-5. `localStorage` と `sessionStorage` は失敗する可能性もある

`storage.js` では、storage access を `try...catch` で包んでいる。

```js
function readNumberFromStorage(storage, key) {
  try {
    const value = storage.getItem(key);

    return Number(value ?? 0);
  } catch {
    return 0;
  }
}
```

ブラウザ設定、private mode、埋め込み環境などによっては、storage にアクセスできない場合がある。  
小さなサンプルでは見落としやすいが、実務では失敗時の扱いも考える。

### 7-6. `fetch` は HTTP error status だけでは reject しない

`browser-fetch.js` では、`response.ok` を明示的に確認している。

```js
const response = await fetch(createSampleApiUrl());

if (!response.ok) {
  throw new Error(`取得に失敗した。status=${response.status}`);
}
```

`fetch` は network error では reject するが、404 や 500 のような HTTP status だけでは自動的に reject しない。  
API 通信では `response.ok` や `response.status` を確認して、アプリ側で失敗として扱う。

## 8. 実務でよく使う場面

### 8-1. DOM の状態表示を小さな関数に分ける

`dom-query-and-content.js` では、filter button と status panel の更新を関数に分けている。

```js
function updateActiveFilterButton() {
  const currentFilter = getCurrentFilter();

  for (const button of filterButtons) {
    const isActive = button.dataset.filter === currentFilter;

    button.classList.toggle('primary', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  }
}
```

DOM 操作は、画面のあちこちに直接書くと追いにくくなる。  
表示更新の単位ごとに関数を分けると、どの状態がどの DOM に反映されるかを追いやすい。

### 8-2. 状態から一覧 DOM を再描画する

`element-creation.js` では、現在の task 配列を元に一覧を描画している。

```js
export function renderTaskList({ taskList, tasks }) {
  taskList.replaceChildren();

  if (tasks.length === 0) {
    const emptyItem = document.createElement('li');

    emptyItem.classList.add('task-item');
    emptyItem.textContent = '表示するタスクはない。';

    taskList.append(emptyItem);

    return;
  }

  const taskElements = tasks.map((task) => createTaskElement(task));

  taskList.append(...taskElements);
}
```

小さな画面では、状態から DOM を作り直す方が分かりやすい。  
React の「state から UI を作る」という考え方にも近い。

### 8-3. submit 処理で入力値の読み取りと validation を分ける

`form-handling.js` では、入力値の読み取りと validation を別関数にしている。

```js
const input = readTaskForm(form);
const validationMessage = validateTaskInput(input);

if (validationMessage) {
  message.textContent = validationMessage;
  titleInput.focus();

  return;
}
```

実務では、submit handler にすべての処理を書くと肥大化しやすい。  
入力値の読み取り、validation、成功時の処理を分けると、処理の責務が見えやすくなる。

### 8-4. storage に UI の小さな設定や状態を保存する

`storage.js` では、count を `localStorage` と `sessionStorage` に保存している。

```js
writeNumberToStorage(localStorage, LOCAL_STORAGE_KEY, nextValue);
writeNumberToStorage(sessionStorage, SESSION_STORAGE_KEY, nextValue);
```

`localStorage` はブラウザに残る小さな設定値に使われる。  
`sessionStorage` はタブ単位で一時的に残したい値に使われる。  
大量データや機密情報の保存先として安易に使わない。

### 8-5. URL query parameter を API 条件や画面状態に使う

`url-search-params.js` では、`URLSearchParams` で query parameter を組み立てている。

```js
currentUrl.searchParams.set('filter', 'active');
currentUrl.searchParams.set('page', '1');

const params = new URLSearchParams(currentUrl.search);
```

検索条件、pagination、filter 状態などは URL に載せることがある。  
文字列結合で URL を作るより、`URL` と `URLSearchParams` を使う方が安全に扱いやすい。

## 9. TS / React につながるポイント

### 9-1. React の JSX は DOM 要素作成の宣言的な書き方につながる

`element-creation.js` では、JavaScript から DOM 要素を手続き的に作っている。

```js
const item = document.createElement('li');

item.classList.add('task-item');
item.classList.toggle('completed', task.completed);
item.dataset.taskId = String(task.id);
```

React では、同じような UI を JSX で宣言的に書く。

```jsx
<li className={task.completed ? 'task-item completed' : 'task-item'} data-task-id={task.id}>
  {task.title}
</li>
```

DOM を直接作る処理を知っておくと、React が JSX からどのような UI 更新へつなげているかを理解しやすい。

### 9-2. React でも event object と `preventDefault` の考え方は残る

`form-handling.js` では、submit event で `preventDefault()` を呼んでいる。

```js
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const input = readTaskForm(form);
```

React でも form submit の既定動作を止める場面は多い。  
書き方は `onSubmit` になるが、event を受け取り、`preventDefault()` してから入力値を処理する考え方は同じ。

### 9-3. TypeScript では DOM API の型を意識する

`event-basics.js` では、`event.target` が button であることを確認している。

```js
const clickedElement = event.target;

if (!(clickedElement instanceof HTMLButtonElement)) {
  return;
}
```

TypeScript では、`event.target` はそのままだと広い型として扱われる。  
`instanceof HTMLButtonElement` のような絞り込みを行うことで、`dataset` や button 固有 property を安全に扱いやすくなる。

### 9-4. React では直接 DOM を更新する代わりに state を更新する

`main.js` では、配列を変更した後に `renderApp()` を呼んで DOM を再描画している。

```js
function toggleTask(taskId) {
  const task = tasks.find((taskItem) => taskItem.id === taskId);

  if (!task) {
    return;
  }

  task.completed = !task.completed;
}
```

```js
renderApp({ domQueryAndContent });
```

React では、DOM を直接更新するのではなく state を更新する。  
state が変わると React が再レンダリングし、DOM 更新を引き受ける。  
Unit 11 の直接 DOM 操作は、React が隠してくれる部分の基礎として理解する。

### 9-5. storage と URL は React app でも状態の保存・共有に使う

`storage.js` では、`localStorage` と `sessionStorage` に値を保存している。

```js
writeNumberToStorage(localStorage, LOCAL_STORAGE_KEY, nextValue);
writeNumberToStorage(sessionStorage, SESSION_STORAGE_KEY, nextValue);
```

`url-search-params.js` では、query parameter を組み立てている。

```js
currentUrl.searchParams.set('filter', 'active');
currentUrl.searchParams.set('page', '1');
```

React app でも、theme、表示設定、一時的な入力状態、検索条件、pagination などを storage や URL に保存することがある。  
ただし、React の state、URL、storage のどこを正とするかを決めないと、状態管理が複雑になる。

### 9-6. `fetch` の response handling は TypeScript の型付けと API 設計につながる

`browser-fetch.js` では、`fetch` 後に `response.ok` を確認し、JSON を取得している。

```js
const response = await fetch(createSampleApiUrl());

if (!response.ok) {
  throw new Error(`取得に失敗した。status=${response.status}`);
}

const data = await response.json();
```

TypeScript では、取得した JSON の形を型で表すことが多い。  
ただし、`response.json()` の結果は実行時には外部入力であり、型だけで正しさが保証されるわけではない。  
Unit 08 の validation や Unit 09 の async / await と組み合わせて考えると、API 通信処理を安全に組み立てやすい。

## 10. 確認観点

この単位を読み終えたら、次を確認する。

- `window` と `document` の役割を説明できるか
- DOM tree が HTML から作られることを説明できるか
- `querySelector` と `querySelectorAll` の違いを説明できるか
- `textContent`、`classList`、`dataset`、`style` 操作の使いどころを説明できるか
- `document.createElement` と `append` で要素を作る流れを説明できるか
- `addEventListener` と event object の基本を説明できるか
- event bubbling と event delegation を説明できるか
- form submit と `preventDefault()` の関係を説明できるか
- `FormData` で input 値を読む流れを説明できるか
- `DOMContentLoaded` の役割を説明できるか
- `localStorage` と `sessionStorage` の違いを説明できるか
- ブラウザでの `fetch` と response handling の基本を説明できるか
- `URL` と `URLSearchParams` の役割を説明できるか
- React では直接 DOM 操作ではなく state 更新が中心になることを説明できるか

# 01. JavaScript の実行環境・リポジトリ基礎・モジュール入門

## 1. 学習対象

この単位では、JavaScript がどこで動くのか、何が JavaScript 標準の機能で、何がブラウザや Node.js などの実行環境が提供する機能なのかを整理する。  
また、このリポジトリで使用する `package.json`、`npm scripts`、ES Modules、ESLint、Prettier の位置づけも確認する。

この単位は、以降の Unit で JavaScript の文法や機能を読んでいくための前提を作る位置づけとなる。  
特定の文法を深く扱うというより、JavaScript を動かす環境とファイル分割の基本を確認する。

## 2. この単位で扱う主な内容

この単位で扱う内容は次の通り。

- JavaScript と ECMAScript の関係
- Node.js で動く JavaScript
- ブラウザで動く JavaScript
- JavaScript 標準機能と Web API と Node.js API の違い
- `console.log`
- script 実行
- `package.json` の役割
- `npm scripts`
- ES Modules の基本
- `import`
- `export`
- named export
- default export
- dynamic import の入口
- モジュールスコープ
- strict mode
- 拡張子 `.js`
- Node.js で ES Modules を使う前提
- ブラウザで `<script type="module">` を使う前提
- ESLint / Prettier の位置づけ
- リポジトリの読み方・実行方法
- CommonJS の概要

CommonJS は概要のみ扱う。  
このリポジトリでは、実装サンプルの中心は ES Modules とする。

## 3. ファイル構成

この単位のファイル構成は次の通り。

```text
src/
  01-runtime-module-basics/
    index.js
    runtime-boundaries.js
    script-execution.js
    package-and-scripts.js
    named-exports.js
    default-export.js
    module-basics.js
    module-scope-and-strict-mode.js
    commonjs-overview.js
    browser-module-demo.html
    browser-module-main.js
    browser-module-message.js

docs/
  01-runtime-module-basics.md
```

各ファイルの役割は次の通り。

- `index.js`
  - Unit 01 の Node.js 側サンプルを順番に実行する入口。
- `runtime-boundaries.js`
  - JavaScript 標準機能、Web API、Node.js API の違いを確認する。
- `script-execution.js`
  - `console.log`、script 実行、`import.meta.url`、`process.argv` を確認する。
- `package-and-scripts.js`
  - `package.json`、`type="module"`、`engines`、`npm scripts` を確認する。
- `named-exports.js`
  - named export で複数の値・関数を公開する例。
- `default-export.js`
  - default export で 1 つの代表的な関数を公開する例。
- `module-basics.js`
  - `import` / `export`、named export、default export、dynamic import を確認する。
- `module-scope-and-strict-mode.js`
  - ES Modules のモジュールスコープと strict mode を確認する。
- `commonjs-overview.js`
  - CommonJS と ES Modules の違いを概要として確認する。
- `browser-module-demo.html`
  - ブラウザで `<script type="module">` を使う例。
- `browser-module-main.js`
  - ブラウザ側の module script の入口。
- `browser-module-message.js`
  - ブラウザ側の module script から import されるファイル。
- `01-runtime-module-basics.md`
  - この単位の内容、実行方法、注目ポイント、確認観点をまとめたドキュメント。

## 4. 実行方法

Node.js 側のサンプルは、リポジトリ直下で次のコマンドを実行する。

```bash
npm run unit:01
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

ブラウザ側のサンプルは、次の HTML をブラウザで開く。

```text
src/01-runtime-module-basics/browser-module-demo.html
```

この HTML では次の指定を使う。

```html
<script type="module" src="./browser-module-main.js"></script>
```

`type="module"` を指定すると、ブラウザでも ES Modules として JavaScript ファイルを読み込める。  
ブラウザのセキュリティ設定によって `file://` での module 読み込みが制限される場合は、VS Code Live Server などのローカルサーバー経由で確認する。

## 5. コードを読む順番

コードは次の順番で読むと理解しやすい。

1. `src/01-runtime-module-basics/index.js`
2. `src/01-runtime-module-basics/runtime-boundaries.js`
3. `src/01-runtime-module-basics/script-execution.js`
4. `src/01-runtime-module-basics/package-and-scripts.js`
5. `src/01-runtime-module-basics/named-exports.js`
6. `src/01-runtime-module-basics/default-export.js`
7. `src/01-runtime-module-basics/module-basics.js`
8. `src/01-runtime-module-basics/module-scope-and-strict-mode.js`
9. `src/01-runtime-module-basics/commonjs-overview.js`
10. `src/01-runtime-module-basics/browser-module-demo.html`
11. `src/01-runtime-module-basics/browser-module-message.js`
12. `src/01-runtime-module-basics/browser-module-main.js`

最初に `index.js` を読むことで、Unit 全体でどのサンプルがどの順番で実行されるかを確認できる。  
その後、各テーマのファイルを順番に読む。

## 6. 注目ポイント

### 6-1. JavaScript 標準機能と実行環境の機能を分けて見る

`runtime-boundaries.js` では、JavaScript 標準機能と実行環境が提供する機能を分けている。

```js
const standardFeatures = [
  {
    name: 'Array',
    available: typeof Array === 'function',
    owner: 'JavaScript標準',
  },
  {
    name: 'Object',
    available: typeof Object === 'function',
    owner: 'JavaScript標準',
  },
  {
    name: 'Promise',
    available: typeof Promise === 'function',
    owner: 'JavaScript標準',
  },
  {
    name: 'Map',
    available: typeof Map === 'function',
    owner: 'JavaScript標準',
  },
];
```

`Array`、`Object`、`Promise`、`Map` は JavaScript 標準の機能として扱える。  
一方、`document` や `window` はブラウザ環境が提供する Web API であり、Node.js で実行すると通常は存在しない。

```js
const runtimeFeatures = [
  {
    name: 'process',
    available: typeof process === 'object',
    owner: 'Node.js API',
    note: 'Node.jsの実行情報や環境変数にアクセスするためのAPI',
  },
  {
    name: 'document',
    available: typeof document !== 'undefined',
    owner: 'Web API',
    note: 'ブラウザのDOMを操作するためのAPI。Node.js実行時には通常存在しない',
  },
];
```

同じ JavaScript ファイルでも、どの実行環境で動かすかによって使える API が変わる。  
この違いを意識しておくと、Node.js 側のコードとブラウザ側のコードを読み分けやすくなる。

### 6-2. `npm scripts` は実行コマンドに名前を付ける仕組み

`package-and-scripts.js` では、`package.json` を読み取り、今回のリポジトリで使う設定を確認している。

```js
const packageJsonText = await readFile(packageJsonUrl, 'utf8');
const packageJson = JSON.parse(packageJsonText);

console.log('package.jsonのname:', packageJson.name);
console.log('package.jsonのtype:', packageJson.type);
console.log('Node.js engines:', packageJson.engines);
console.log('Unit 01実行用script:', packageJson.scripts['unit:01']);
```

`npm run unit:01` は、内部的には次のコマンドに対応している。

```json
{
  "scripts": {
    "unit:01": "node src/01-runtime-module-basics/index.js"
  }
}
```

長い実行コマンドを毎回直接入力するのではなく、`npm scripts` として名前を付けておくことで、Unit ごとに同じ形式で実行できる。

### 6-3. named export と default export を分けて見る

`named-exports.js` では、複数の値や関数を名前付きで export している。

```js
export const moduleStyle = 'ES Modules';

export function createRuntimeLabel(runtimeName) {
  return `${runtimeName}で動くJavaScript`;
}

export function formatFeatureOwner({ featureName, owner }) {
  return `${featureName} は ${owner} に属する機能`;
}
```

`default-export.js` では、そのモジュールの代表となる関数を 1 つ default export している。

```js
export default function createUnitSummary({ title, focus, keywords }) {
  return {
    title,
    focus,
    keywordCount: keywords.length,
    summary: `${title}では、${focus}を中心に確認する。`,
  };
}
```

読み込む側では、named export は `{}` 付きで import し、default export は任意の名前で import できる。

```js
import createUnitSummary from './default-export.js';
import {
  createRuntimeLabel,
  formatFeatureOwner,
  learningKeywords,
  moduleStyle,
} from './named-exports.js';
```

### 6-4. ES Modules はモジュールスコープを持つ

`module-scope-and-strict-mode.js` では、モジュール内の値が自動的にグローバルへ出ないことを確認している。

```js
const modulePrivateValue = 'この値はmodule-scope-and-strict-mode.jsの中だけで直接参照できる';
```

この値はファイル内では参照できるが、`globalThis` からは参照できない。

```js
const globalLookupResult = globalThis.modulePrivateValue;

console.log('globalThis.modulePrivateValue:', globalLookupResult);
```

複数ファイルに分割しても、export しない限り外側から直接参照できない。  
この性質により、ファイル単位で責務を分けやすくなる。

### 6-5. ブラウザでも `type="module"` で ES Modules を使える

`browser-module-demo.html` では、ブラウザで ES Modules を読み込む。

```html
<script type="module" src="./browser-module-main.js"></script>
```

`browser-module-main.js` は別ファイルから import している。

```js
import { browserRuntimeName, createBrowserMessage } from './browser-module-message.js';
```

React や Vite を使わない静的 HTML でも、ブラウザは `type="module"` を指定した script を ES Modules として扱う。  
ただし、ブラウザでは `document` や `window` を使える一方で、Node.js の `process` や `fs` などはそのまま使えない。

## 7. 引っかかりやすい点

### 7-1. JavaScript 標準と実行環境の API を混同しやすい

`runtime-boundaries.js` では、`Array` と `document` を同じように存在確認しているが、提供元は異なる。

```js
{
  name: 'Array',
  available: typeof Array === 'function',
  owner: 'JavaScript標準',
}
```

```js
{
  name: 'document',
  available: typeof document !== 'undefined',
  owner: 'Web API',
  note: 'ブラウザのDOMを操作するためのAPI。Node.js実行時には通常存在しない',
}
```

`Array` は JavaScript 標準機能であり、Node.js でもブラウザでも利用できる。  
`document` はブラウザ環境の Web API であり、Node.js では通常利用できない。

「JavaScript で書かれているコード」だからといって、すべての JavaScript 実行環境で同じ API が使えるわけではない。

### 7-2. Node.js で ES Modules を使うには `package.json` の設定が重要

このリポジトリでは、`.js` ファイルを ES Modules として扱うために、`package.json` で次の設定をしている。

```json
{
  "type": "module"
}
```

この設定がない場合、Node.js では `.js` を CommonJS として扱うプロジェクトもある。  
その状態で `import` / `export` を使うと、設定や拡張子によっては意図通りに動かない。

今回のリポジトリでは、今後の TypeScript / React 学習につなげるため、ES Modules を基本とする。

### 7-3. default export は便利だが、名前が読み手に伝わりにくくなる場合がある

`default-export.js` は次のように default export している。

```js
export default function createUnitSummary({ title, focus, keywords }) {
  return {
    title,
    focus,
    keywordCount: keywords.length,
    summary: `${title}では、${focus}を中心に確認する。`,
  };
}
```

default export は読み込む側で任意の名前を付けられる。

```js
import createUnitSummary from './default-export.js';
```

便利な一方、読み込む側で別名にしすぎると、元の役割が分かりにくくなる。  
チームやプロジェクトによって、named export を中心にするか default export を許容するかの方針が分かれることもある。

### 7-4. ES Modules は自動的に strict mode になる

`module-scope-and-strict-mode.js` では、未宣言変数への代入が `ReferenceError` になることを確認している。

```js
try {
  // ES Modules は自動的に strict mode で実行される。
  // strict mode では、宣言していない変数へ代入すると ReferenceError になる。
  // これは「うっかりグローバル変数を作ってしまう」事故を防ぐ動きでもある。
  // eslint-disable-next-line no-undef
  undeclaredValueForStrictModeDemo = 'strict modeでは代入できない';
} catch (error) {
  return error;
}
```

通常の script と module では、スコープや strict mode の扱いが異なる。  
今回のリポジトリでは ES Modules 前提のため、各 `.js` ファイルは基本的に strict mode として実行される。

### 7-5. CommonJS と ES Modules は同じ「モジュール」でも書き方が違う

`commonjs-overview.js` では、CommonJS と ES Modules の書き方を文字列として比較している。

```js
const commonJsExample = `const { readFileSync } = require('node:fs');

function readTextFile(path) {
  return readFileSync(path, 'utf8');
}

module.exports = {
  readTextFile,
};`;
```

```js
const esmExample = `import { readFile } from 'node:fs/promises';

export async function readTextFile(path) {
  return readFile(path, 'utf8');
}`;
```

CommonJS では `require` と `module.exports` を使う。  
ES Modules では `import` と `export` を使う。

今回の単位では CommonJS を深追いしないが、既存の Node.js コードや古い記事を読むと出てくるため、概要は知っておくとよい。

### 7-6. ブラウザで `type="module"` を使うと、直接 HTML を開く場合に制限されることがある

`browser-module-demo.html` は、次のように外部 JavaScript ファイルを module script として読み込む。

```html
<script type="module" src="./browser-module-main.js"></script>
```

ブラウザやセキュリティ設定によっては、`file://` で直接開いた HTML から外部 module を読み込むことが制限される場合がある。  
この場合は、VS Code Live Server などでローカルサーバーを立てて確認する。

今回のリポジトリでは Vite を使わない。  
ただし、ブラウザ側の ES Modules 確認では、ブラウザの制約によりローカルサーバーが必要になる場合がある。

## 8. 実務でよく使う場面

### 8-1. Node.js のスクリプトを `npm scripts` で実行する

今回の `package.json` では、Unit ごとに実行コマンドを `npm scripts` として定義している。

```json
{
  "scripts": {
    "unit:01": "node src/01-runtime-module-basics/index.js",
    "lint": "eslint .",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

実務でも、開発用のコマンドは `package.json` にまとめることが多い。

```bash
npm run dev
npm run build
npm run lint
npm run test
npm run format
```

今回の単位では `unit:01` のように Unit 番号で実行できるようにしているが、考え方は実務の `npm scripts` と同じ。

### 8-2. 設定ファイルや `package.json` を Node.js で読み込む

`package-and-scripts.js` では、Node.js 標準 API を使って `package.json` を読み込んでいる。

```js
import { readFile } from 'node:fs/promises';

const packageJsonUrl = new URL('../../package.json', import.meta.url);

const packageJsonText = await readFile(packageJsonUrl, 'utf8');
const packageJson = JSON.parse(packageJsonText);
```

実務でも、設定ファイルや JSON ファイルを読み込んで、ビルド、変換、検証、コード生成などに使う場面がある。  
Node.js 側の JavaScript では、`node:fs/promises` や `node:path` のような Node.js API を使うことがある。

### 8-3. 機能ごとにファイルを分けて `import` / `export` する

`module-basics.js` は、複数ファイルから値や関数を import している。

```js
import createUnitSummary from './default-export.js';
import {
  createRuntimeLabel,
  formatFeatureOwner,
  learningKeywords,
  moduleStyle,
} from './named-exports.js';
```

実務の JavaScript / TypeScript / React では、1 ファイルにすべてを書くのではなく、役割ごとに分割する。

例として、React に近い構成では次のように分けることがある。

```js
import { fetchUsers } from './api/users.js';
import { formatUserName } from './formatters/user-formatters.js';
import UserList from './components/UserList.jsx';
```

この単位では小さい関数だけを扱うが、ファイルを分けて `import` / `export` する感覚は実務コードの読み書きに直結する。

### 8-4. ブラウザでは Web API を使う

`browser-module-main.js` では、ブラウザで提供される `document` を使って画面を書き換えている。

```js
const resultElement = document.querySelector('[data-result]');

if (resultElement === null) {
  throw new Error('data-result属性を持つ表示先要素が見つからない。');
}

resultElement.textContent = message;
```

React では DOM を直接操作する場面は少なくなるが、ブラウザで JavaScript が動く以上、DOM、イベント、URL、ストレージ、fetch などの Web API は前提知識として重要になる。

## 9. TS / Reactにつながるポイント

### 9-1. ES Modules は TypeScript / React でも基本になる

今回の Unit では、次のような ES Modules の基本を扱った。

```js
export function createRuntimeLabel(runtimeName) {
  return `${runtimeName}で動くJavaScript`;
}
```

```js
import { createRuntimeLabel } from './named-exports.js';
```

TypeScript でも React でも、基本的にはこの `import` / `export` の考え方を使う。  
拡張子やコンパイルの扱いは変わるが、モジュールとしてファイルを分ける考え方は同じ。

TypeScript では、値だけでなく型も export / import する。

```ts
export type User = {
  id: number;
  name: string;
};

export function formatUser(user: User): string {
  return `${user.id}: ${user.name}`;
}
```

React では、コンポーネントや hooks、ユーティリティ関数を export / import する。

```jsx
import UserList from './components/UserList.jsx';
import { useUsers } from './hooks/useUsers.js';
```

### 9-2. Node.js 側とブラウザ側の違いはフルスタック開発で重要になる

`runtime-boundaries.js` では、Node.js API と Web API の違いを確認した。

```js
{
  name: 'process',
  available: typeof process === 'object',
  owner: 'Node.js API',
}
```

```js
{
  name: 'document',
  available: typeof document !== 'undefined',
  owner: 'Web API',
}
```

フルスタック開発では、同じ JavaScript / TypeScript でも、サーバー側とブラウザ側で使える API が異なる。  
React アプリでも、クライアント側でのみ使える API と、サーバー側でのみ使える API を区別する必要がある。

### 9-3. `package.json` は今後のフロントエンド開発でも中心になる

この Unit では、`package.json` の `type`、`engines`、`scripts` を確認した。

```js
console.log('package.jsonのtype:', packageJson.type);
console.log('Node.js engines:', packageJson.engines);
console.log('Unit 01実行用script:', packageJson.scripts['unit:01']);
```

TypeScript や React に進むと、`package.json` にはさらに多くの設定や依存関係が入る。

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint ."
  },
  "dependencies": {
    "react": "...",
    "react-dom": "..."
  },
  "devDependencies": {
    "typescript": "...",
    "vite": "..."
  }
}
```

今回のリポジトリでは最小限の構成にしているが、`package.json` を読む習慣は今後も重要になる。

### 9-4. ESLint / Prettier は実務の開発体験に直結する

この Unit のコード自体では、ESLint / Prettier の内部設定を深く扱わない。  
ただし、リポジトリでは次のコマンドを使う。

```bash
npm run lint
npm run format:check
npm run format
```

実務でも、PR 前に lint や format を確認することが多い。  
JavaScript / TypeScript / React のコードはファイル数が多くなりやすいため、手作業で整えるのではなく、ツールで整える前提にする。

## 10. 確認観点

この単位を読み終えたら、次を確認する。

- JavaScript 標準機能、Web API、Node.js API の違いを説明できるか
- Node.js で `document` や `window` が通常使えない理由を説明できるか
- ブラウザで `process` や `node:fs/promises` がそのまま使えない理由を説明できるか
- JavaScript と ECMAScript の関係を概要レベルで説明できるか
- `console.log` を使って実行結果を確認できるか
- `npm run unit:01` が実際にどのコマンドを実行しているか説明できるか
- `package.json` の `"type": "module"` の意味を説明できるか
- named export と default export の違いを説明できるか
- `import` / `export` を使ってファイルを分割する意味を説明できるか
- ES Modules がモジュールスコープを持つことを説明できるか
- ES Modules が strict mode として実行されることを説明できるか
- CommonJS の `require` / `module.exports` と ES Modules の `import` / `export` の違いを概要レベルで説明できるか
- ブラウザで `<script type="module">` を使う意味を説明できるか
- `file://` で module script を読み込む場合にブラウザ側の制約が出ることを理解できるか
- ESLint と Prettier の役割の違いを説明できるか
